---
layout  : wiki
title   : luarocks로 Hammerspoon 패키지 관리하기
summary : 유한락스가 아니라 루아락스로 깨끗하게
date    : 2017-07-30 16:32:25 +0900
updated : 2018-04-21 11:48:11 +0900
tag     : hammerspoon lua
resource: 39/B5404C-9ED3-46F9-9E07-1BE9D6857172
toc     : true
comment : true
public  : true
parent  : [[hammerspoon]]
---
* TOC
{:toc}

## Hammerspoon?

* [Hammerspoon](http://www.hammerspoon.org/)은 맥에서 돌아가는 매크로 툴이다.
* Windows의 [Autohotkey](https://autohotkey.com/)와 비슷한 느낌으로 사용할 수 있다.
* 맥 API나 Swift, Objective-C 같은 걸 몰라도 그럭저럭 쓸만한 도구를 만들 수 있다는 장점이 있다.

대충 다음과 같은 일을 할 수 있다고 보면 된다.

* `Esc` 키를 누를 때마다 input source를 영문으로 전환하게 한다. Vim 사용자에게 너무 좋은 기능.
* 현재 실행 중인 애플리케이션의 윈도우를 특정 위치로 움직이게 하거나 사이즈를 조절한다.
* 특정 단축키를 입력하면 내가 자주 사용하는 애플리케이션을 실행하거나 활성화해준다.
* 간단한 GUI 메뉴를 만들고 내게 필요한 기능들을 등록해 쓴다.
* 특정 애플리케이션(파인더라던가)이 실행될 때마다 무언가 다른 작업을 수행하게 한다.
* 맥북이 회사 와이파이에 연결되면(출근하면) 맥북의 사운드 볼륨을 0으로 조정한다.
* 애플스크립트를 실행한다.
* iMessage를 전송한다.
* 터미널 명령어를 실행한다.
* 그 외 자세한 내용은 [Getting Started with Hammerspoon](http://www.hammerspoon.org/go/)을 참고.

## 발단: 설정 파일이 점점 비대해져 간다

나는 Hammerspoon 설정 파일을 다음과 같은 구조로 관리했다.

```
/.hammerspoon
    │
    ├ init.lua
    │
    └ /modules
        ├ appman.lua
        ├ clipboard.lua
        ├ caffein.lua
        ├ inputSourceChange.lua
        ├ mouse.lua
        └ vim.lua
```

파일명                | 설명
:--                   | ----
init.lua              | Hammerspoon 설정 main 파일.
appman.lua            | 자주 쓰는 앱 실행. 예) `F15+s`를 누르면 Slack 실행
clipboard.lua         | 클립보드 관리
caffein.lua           | 맥북을 가만히 놔둬도 슬립모드로 들어가지 않도록 한다
inputSourceChange.lua | 한영전환 관련 기능
mouse.lua             | 키보드로 마우스를 제어
vim.lua               | 어디에서건 vim 비슷한 키맵을 사용

### 고민
* 처음엔 init.lua 파일 하나였지만 1년 만에 7개로 파일이 불어났다. 앞으로 더 늘어나겠지.
* 분리 가능한 여러 모듈이 하나의 레파지토리에 들어가 있어 커밋 로그 관리가 짜증 난다.
* 모듈마다 Github repo를 각각 따고, init.lua에 repo 주소만 넣으면 편리하지 않을까?

### 대안: 패키지 관리자를 만들자?
* vim 플러그인 관리자들처럼 github 주소를 넣어두면 알아서 다운로드 하고 링크도 시켜주는 걸 만들어 볼까?
* 만들 필요 있나? 내가 lua 뉴비라 모르는 거지, 패키지 관리자 같은 건 당연히 세계인들이 사용하는 게 있을 거다.
* 찾아보니 [luarocks](https://luarocks.org/)라는 것이 있다. 이걸 쓰자.

## luarocks를 사용해 보자

목표는 다음과 같다.
* 내가 만든 모듈을 init.lua와 확실하게 분리한다.
* 분리한 모듈을 luarocks 저장소에 업데이트한다.
* 해당 모듈에 대해, 내 설정 파일에는 `require` 문 한 줄만 남긴다.
* Hammerspoon을 재실행하여, 해당 모듈의 기능이 제대로 실행되면 성공.

### 실행: 내가 만든 모듈을 분리하자

일단 테스트로 분리할 모듈은 간단한 게 좋을 것 같아서 caffein.lua를 선택했다.

최종적으로 init.lua와 분리가 완료된 caffein.lua의 코드는 다음과 같다.

```lua
local caffeine = hs.menubar.new()

local obj = {}

local on_message = 'caffeinated'
local off_message = 'wait sleep'

local on_icon = "☕️🙄"
local off_icon = "😴"

function obj:init(mod, key)

    function setCaffeineDisplay(state)
        if state then
            hs.alert.show(on_message)
            caffeine:setTitle(on_icon)
        else
            hs.alert.show(off_message)
            caffeine:setTitle(off_icon)
        end
    end

    function caffeineClicked()
        setCaffeineDisplay(hs.caffeinate.toggle("displayIdle"))
    end

    if caffeine then
        caffeine:setClickCallback(caffeineClicked)
        setCaffeineDisplay(hs.caffeinate.get("displayIdle"))
    end

    hs.hotkey.bind(mod, key, caffeineClicked)
end

return obj
```

그리고 [Github repo](https://github.com/johngrib/hammerspoon_caffein/tree/0.1.0)에 업로드했다.

### 실행: 분리한 모듈을 luarocks 저장소에 업로드하자

업로드 조건은 다음과 같다.

* 먼저 [luarocks.org](https://luarocks.org/)에 회원 가입을 해야 한다.
* 가입을 마치면 [https://luarocks.org/settings/api-keys](https://luarocks.org/settings/api-keys)에서 api-key를 복사해 둔다. 이게 있어야 내가 만든 모듈을 업로드할 수 있다.
* [Creating-a-rock](https://github.com/luarocks/luarocks/wiki/Creating-a-rock)을 읽고 rockspec 파일을 작성한다.

내가 작성한 rockspec 파일의 내용은 다음과 같다.

```lua
-- 모듈 파일명은 hammerspoon_caffein.lua
-- rockspec 파일명은 johngrib.hammerspoon.caffein-0.1-1.rockspec
package = "johngrib.hammerspoon.caffein"
version = "0.1-1"

local url = "github.com/johngrib/hammerspoon_caffein"
local desc = "hammerspoon caffein"

source = {url = "git://" .. url}
description = {
  summary = desc,
  detailed = desc,
  homepage = "https://" .. url,
  license = "MIT",
}

-- Dependencies:
supported_platforms = {"macosx"}
dependencies = {
  "lua >= 5.2",
}

-- Build rules:
build = {
  type = "builtin",
  modules = {
    ["johngrib.hammerspoon.caffein"] = "hammerspoon_caffein.lua",
  },
}
```

만약 새로운 모듈을 작성한다면, 위의 파일에서 `package`, `version`, `url`, `license`, `build.modules` 만 수정하고 나머지는 다 복붙하면 된다.

아무튼, rockspec 파일을 다 작성하면 다음과 같이 업로드 해주면 된다.

```sh
$ luarocks upload johngrib.hammerspoon.caffein-0.1.rockspec --api-key=복사해둔api키
```

#### 업로드 중 JSON 라이브러리 문제 해결

위의 명령어를 실행하는 도중 다음과 같은 에러가 발생했다.
```sh
$ luarocks-5.3 upload johngrib.hammerspoon.caffein-0.1-1.rockspec --api-key=복사해둔api키
Sending johngrib.hammerspoon.caffein-0.1-1.rockspec ...

Error: A JSON library is required for this command.
```

다행히 검색해보고 한 번에 해결. 다음과 같이 `dkjson` 라이브러리를 설치해주면 된다.

```sh
$ luarocks install dkjson --local
```

다시 업로드하니 성공한다.
```sh
$ luarocks-5.3 upload johngrib.hammerspoon.caffein-0.1-1.rockspec --api-key=복사해둔api키
Sending johngrib.hammerspoon.caffein-0.1-1.rockspec ...
Will create new module (johngrib.hammerspoon.caffein)
Packing johngrib.hammerspoon.caffein
Cloning into 'hammerspoon_caffein'...
remote: Counting objects: 5, done.
remote: Compressing objects: 100% (5/5), done.
remote: Total 5 (delta 0), reused 3 (delta 0), pack-reused 0
Receiving objects: 100% (5/5), done.
  adding: johngrib.hammerspoon.caffein-0.1-1.rockspec (deflated 52%)
  adding: hammerspoon_caffein/ (stored 0%)
  adding: hammerspoon_caffein/hammerspoon_caffein.lua (deflated 58%)
  adding: hammerspoon_caffein/LICENSE (deflated 39%)
Sending /Users/johngrib/git/hammerspoon_caffein/johngrib.hammerspoon.caffein-0.1-1.src.rock ...

Done: http://luarocks.org/modules/johngrib/johngrib.hammerspoon.caffein
```

### 설정 파일에 `require` 문 한 줄만 남기자

이제 업로드된 모듈을 다시 다운로드 한 다음, 설정 파일에서 모듈을 `require` 해주기만 하면 된다.

```sh
$ luarocks install johngrib.hammerspoon.caffein --local
```

설정 파일을 다음과 같이 수정하였다.

```lua
-- ./modules/caffein.lua를 참조. 이젠 주석처리
-- require('modules.caffein'):init({'shift'}, 'f15')

-- luarocks 관리자의 johngrib.hammerspoon.caffein을 참조
require('luarocks.loader')
require('johngrib.hammerspoon.caffein'):init({'shift'}, 'f15')
```

* Hammerspoon을 재시동하니 이상 없이 잘 된다.
* 기존 파일이었던 ./modules/caffein.lua를 삭제해도 잘 된다.
* 다른 모듈들도 이렇게 분리해야겠다.

## Links

* [Hammerspoon](http://www.hammerspoon.org/)
* [Autohotkey](https://autohotkey.com/)
* [Getting Started with Hammerspoon](http://www.hammerspoon.org/go/)
* [luarocks](https://luarocks.org/)
* [Creating-a-rock](https://github.com/luarocks/luarocks/wiki/Creating-a-rock)
* [github: johngrib/hammerspoon_caffein](https://github.com/johngrib/hammerspoon_caffein)
* [luarocks: johngrib.hammerspoon.caffein](https://luarocks.org/modules/johngrib/johngrib.hammerspoon.caffein)

EOB
