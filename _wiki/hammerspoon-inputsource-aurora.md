---
layout  : wiki
title   : 해머스푼으로 한/영 전환 오로라를 만들자
summary : 지금 선택된 입력기가 한글인지 영어인지 쉽게 알아보자
date    : 2019-12-18 21:25:35 +0900
updated : 2019-12-18 22:37:51 +0900
tag     : hammerspoon
toc     : true
public  : true
parent  : hammerspoon
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

## 코드

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

* `inputsource_aurora.lua`

```lua
local boxes = {}
local inputEnglish = "com.apple.keylayout.ABC"
local box_height = 23
local box_alpha = 0.5

-- 입력소스 변경 이벤트에 이벤트 리스너를 달아준다
hs.keycodes.inputSourceChanged(function()
    local input_source = hs.keycodes.currentSourceID()
    show_status_bar(not (input_source == inputEnglish))
end)

-- 오로라를 보여준다
function show_aurora(scr)
    local box = hs.drawing.rectangle(hs.geometry.rect(0,0,0,0))
    draw_rectangle(box, scr, 0, scr:fullFrame().w, hs.drawing.color.osx_green)
    table.insert(boxes, box)
end

function show_status_bar(stat)
    if stat then
        enable_show()
    else
        disable_show()
    end
end

function enable_show()
    show_status_bar(false)
    reset_boxes()
    -- 여러 개의 모니터를 사용한다면, 모든 모니터에 다 적용해준다
    hs.fnutils.each(hs.screen.allScreens(), function(scr)
        show_aurora(scr)
    end)
end

function disable_show()
    hs.fnutils.each(boxes, function(box)
        if not (box == nil) then
            box:delete()
        end
    end)
    reset_boxes()
end

function reset_boxes()
    boxes = {}
end

-- 화면에 사각형을 그려준다
function draw_rectangle(target_draw, screen, offset, width, fill_color)
  local screeng                  = screen:fullFrame()
  local screen_frame_height      = screen:frame().y
  local screen_full_frame_height = screeng.y
  local height_delta             = screen_frame_height - screen_full_frame_height
  local height                   = box_height

  target_draw:setSize(hs.geometry.rect(screeng.x + offset, screen_full_frame_height, width, height))
  target_draw:setTopLeft(hs.geometry.point(screeng.x + offset, screen_full_frame_height))
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

