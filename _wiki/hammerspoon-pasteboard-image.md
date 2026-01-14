---
layout  : wiki
title   : 해머스푼으로 클립보드 이미지 저장하기
summary : 
date    : 2026-01-14 21:06:23 +0900
updated : 2026-01-14 21:29:44 +0900
tag     : mac
resource: AC/558911-2D97-4109-A8AE-B587B53E7F61
toc     : true
public  : true
parent  : [[/hammerspoon]]
latex   : false
---
* TOC
{:toc}

## 스크린샷 클립보드 이미지를 파일로 저장하는 과정이 귀찮다?

MacOS 에서는 스크린샷을 찍는 단축키가 다양하게 존재한다.

- 화면 스크린샷을 파일로 저장: `command + shift + 3`
- 화면 스크린샷을 클립보드로 복사: `command + control + shift + 3`
- 선택 영역 스크린샷을 파일로 저장: `command + shift + 4`
- 선택 영역 스크린샷을 클립보드로 복사: `command + control + shift + 4`
- 스크린샷 및 기록 옵션(동영상 포함): `command + shift + 5`

나는 이들 중에서 `선택 영역` 기능이 있는 2가지를 주로 사용한다.

- 파일로 저장할 일이 있으면 `⌘⇧4`를 입력하고,
- 파일로 저장할 필요가 없고 단순히 붙여넣기가 필요하면 `^⌘⇧4`를 입력한다.

그런데 가끔씩 클립보드에 복사한 내용을 파일로 저장할 필요가 생기는 경우가 있다.

그런 경우엔 터미널을 열고 `pngpaste` 명령을 사용하면 되긴 하는데...

저장한 다음에 편집이 필요하면 미리보기 앱으로 또 열어줘야 하는 귀찮음이 있다.

## hammerspoon으로 해결하자

### 스크린샷을 찍을 때마다 자동으로 파일로 저장한다

그래서 스크린샷을 찍어서 클립보드로 복사하는 이벤트가 일어날 때마다 파일로 저장되면 좋겠다고 생각했고 다음과 같이 작업하였다.

```lua
local saveDir = os.getenv("HOME") .. "/Desktop"
os.execute("mkdir -p " .. saveDir)

clipboardWatcher = hs.pasteboard.watcher.new(function(v)
    local img = hs.pasteboard.readImage()
    if img then
        local filename = os.date("screenshot-%Y%m%d-%H%M%S.png")
        local filepath = saveDir .. "/" .. filename
        img:saveToFile(filepath)
        os.execute("open " .. filepath)
    end
end)

clipboardWatcher:start()
```

이렇게 작업했더니 `^⌘⇧4`를 입력할 때마다 파일이 자동으로 저장되어 편리했다.

하지만 해놓고 보니 `⌘⇧4`와 다를 것이 별로 없었고, 파일로 저장하는 필요가 없는 경우에도 저장이 되어서 불필요한 작업이 되었다.

그리고 편집을 하려면 미리보기 앱을 열어야 하므로 오히려 더 귀찮았다.

### 스크린샷을 찍은 다음 단축키를 입력하면 파일로 저장한다

따라서 `^⌘⇧4`를 입력해서 스크린샷을 찍은 다음, 추가로 편집이 필요한 경우에만 단축키를 입력하는 방향으로 수정하였다.

위의 코드에서 `watcher`를 제거하고, 아래와 같이 함수로 변환하여 단축키 설정 코드에서 사용하였다.

```lua
local function saveImageFromPasteboard()
    local saveDir = os.getenv("HOME") .. "/Desktop"
    local img = hs.pasteboard.readImage()
    if img then
        local filename = os.date("screenshot-%Y%m%d-%H%M%S.png")
        local filepath = saveDir .. "/" .. filename
        img:saveToFile(filepath)
        os.execute("open " .. filepath)
    end
end
```

단축키를 입력하면, 클립보드의 이미지를 파일로 저장하고, `open` 명령을 통해 `Preview` 앱으로 해당 파일을 열어준다.

딱 마음에 든다. 이틀째 사용하고 있다. 해결 완료.

