---
layout  : wiki
title   : 해머스푼으로 한/영 전환 오로라를 만들자
summary : 지금 선택된 입력기가 한글인지 영어인지 쉽게 알아보자
date    : 2019-12-18 21:25:35 +0900
updated : 2020-01-25 00:30:38 +0900
tag     : hammerspoon
toc     : true
public  : true
parent  : [[hammerspoon]]
latex   : false
---
* TOC
{:toc}

## 인풋소스 오로라: 한글 입력인지 영문 입력인지 잘 모르겠다면

회사 동료인 황건구님과 한글 입력기 상태를 파악하는 것이 얼마나 짜증나는지에 대해 이야기하다 해머스푼으로 이 문제를 어느 정도 보조할 수 있다는 것을 깨닫게 되었다.

목표는 "한글" 입력 모드로 전환을 하면 화면 위쪽에 표시를 해 주는 것이다. 예전에 만들어 두었던 함수가 있어 작업은 어렵지 않았고 약 20분 내에 코딩을 끝냈다.

![]( /post-img/hammerspoon-inputsource-aurora/input-aurora.gif )

위의 gif는 황건구님이 완성된 코드를 돌려보며 기뻐하며 찍은 것이다.

잘 살펴보면 "한글" 입력 모드일 때에는 상태 바가 반투명한 녹색으로 바뀌고, "영문" 입력 모드로 돌아오면 사라진다.

위쪽에 녹색 불빛이 들어오는 것을 보고 있으니 아름다운 오로라가 생각나서 파일 이름을 오로라라고 짓기로 했다.

인풋소스 오로라를 쓰니 화면을 대충 보는 것만으로도 현재 한글인지 영문인지 알 수 있어, 좀 더 쾌적하게 글을 쓸 수 있게 되었다.

## 감사

멋진 아이디어를 제공해 주신 동료 황건구 님께 감사를 드립니다.

## 프로젝트 파일 시스템 구조

다음은 `~/.hammerspoon`의 하위 경로를 `tree` 명령으로 조사한 것이다.

이 글의 주인공이 되는 파일은 `init.lua`와 `inputsource_aurora.lua` 두 파일이다. 나머지 파일은 관계 없다.

```ascii-art
$ tree .
.
├── Spoons
├── init.lua            < 이 파일
├── install-modules.sh
└── modules
    ├── appman.lua
    ├── clipboard.lua
    ├── hammerspoon_winmove
    ├── inputsource_aurora.lua  < 이 파일
    ├── mouse.lua
    └── vim.lua
```

## 준비물: 영문 입력 소스의 이름을 확인하자

화면 상단 상태 막대에서 해머스푼 아이콘을 클릭한 다음, `Console`을 선택한다.

![]( /post-img/hammerspoon-inputsource-aurora/hammer-menu.png )

콘솔이 나타나면, 영문 입력기로 전환한 다음 콘솔에 다음과 같이 입력한다.

```lua
hs.keycodes.currentSourceID()
```

그러면 자신이 사용하고 있는 인풋소스의 이름을 알 수 있다.

내 경우엔 `com.apple.keylayout.ABC`이 나오는데, 내가 `ABC`를 쓰고 있기 때문이다.

![]( /post-img/hammerspoon-inputsource-aurora/keyboard-preferences.png )

만약 `US`를 사용하고 있다면 `com.apple.keylayout.US`가 나올 것이다.

## 코드

* [inputsource_aurora.lua]( https://github.com/johngrib/hammerspoon-config/blob/master/modules/inputsource_aurora.lua ) - 내 최신 파일은 이 링크에서 볼 수 있다.

```lua
local boxes = {}
-- 자신이 사용하고 있는 English 인풋 소스 이름을 넣어준다
local inputEnglish = "com.apple.keylayout.ABC"
local box_height = 23
local box_alpha = 0.35
local GREEN = hs.drawing.color.osx_green

-- 입력소스 변경 이벤트에 이벤트 리스너를 달아준다
hs.keycodes.inputSourceChanged(function()
    disable_show()
    if hs.keycodes.currentSourceID() ~= inputEnglish then
        enable_show()
    end
end)

function enable_show()
    reset_boxes()
    hs.fnutils.each(hs.screen.allScreens(), function(scr)
        local frame = scr:fullFrame()

        local box = newBox()
        draw_rectangle(box, frame.x, frame.y, frame.w, box_height, GREEN)
        table.insert(boxes, box)

        -- 이 부분의 주석을 풀면 화면 아래쪽에도 보여준다
        -- local box2 = newBox()
        -- draw_rectangle(box2, frame.x, frame.y + frame.h - 10, frame.w, box_height, GREEN)
        -- table.insert(boxes, box2)
    end)
end

function disable_show()
    hs.fnutils.each(boxes, function(box)
        if box ~= nil then
            box:delete()
        end
    end)
    reset_boxes()
end

function newBox()
    return hs.drawing.rectangle(hs.geometry.rect(0,0,0,0))
end

function reset_boxes()
    boxes = {}
end

function draw_rectangle(target_draw, x, y, width, height, fill_color)
  target_draw:setSize(hs.geometry.rect(x, y, width, height))
  target_draw:setTopLeft(hs.geometry.point(x, y))

  target_draw:setFillColor(fill_color)
  target_draw:setFill(true)
  target_draw:setAlpha(box_alpha)
  target_draw:setLevel(hs.drawing.windowLevels.overlay)
  target_draw:setStroke(false)
  target_draw:setBehavior(hs.drawing.windowBehaviors.canJoinAllSpaces)
  target_draw:show()
end
```

* `init.lua`에서는 하위 경로의 `inputsource_aurora.lua` 파일을 다음과 같이 `require` 해 주었다.

```lua
require('modules.inputsource_aurora')
```

