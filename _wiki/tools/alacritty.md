---
layout  : wiki
title   : alacritty
summary : rust로 개발된 단순하고 빠른 터미널 에뮬레이터
date    : 2023-09-02 19:26:31 +0900
updated : 2023-09-04 22:52:53 +0900
tag     : 
resource: 6B/2F3606-DFE4-4DD2-A078-42F134CB7EA7
toc     : true
public  : true
parent  : [[/tools]]
latex   : false
---
* TOC
{:toc}

## Install

macOS에서는 [[/cmd/brew]]로 간단하게 설치할 수 있다.

```bash
brew install --cask alacritty
```

## man

```bash
man 5 alacritty
```

[alacritty/extra/man/alacritty.5.scd]( https://github.com/alacritty/alacritty/blob/master/extra/man/alacritty.5.scd )

## 특징

- 매우 빠르고 쾌적하다.
- 탭 기능을 제공하지 않는다.

### key_bindings 설정과 tmux 조합이 꽤 괜찮다

- 탭 기능을 제공하지 않으므로 탭이나 화면 분할을 원한다면 tmux 등을 사용해야 한다.
- 그러나 `key_bindings` 설정이 강력해서 command 키 조합 등으로 복잡한 tmux 키 입력을 쉽게 할 수 있다.
    - [Alacritty integration with Tmux]( https://arslan.io/2018/02/05/gpu-accelerated-terminal-alacritty/ )라는 글의 도움을 많이 받았다.

나는 다음과 같이 설정했다.

```yaml
key_bindings:
  #   cmd + shift + d                      C-q "
  - { key: D, mods: Command|Shift, chars: "\x11\x22" } # tmux 윈도우 좌우 split
  # command + shift + d              C-q %
  - { key: D, mods: Command, chars: "\x11\x25" } # tmux 윈도우 상하 split
  # command + t                      C-q c
  - { key: T, mods: Command, chars: "\x11\x63" } # tmux 새로운 window 생성
  # command + w                      C-q x
  - { key: W, mods: Command, chars: "\x11\x78" } # tmux 현재 pane 닫기
  # command + o                      C-q o
  - { key: O, mods: Command, chars: "\x11\x6f" } # tmux pane 순차 이동
  # command + O                      C-q C-o
  - { key: O, mods: Command|Shift, chars: "\x11\x0f" } # tmux pane 서로 바꾸기

  # tmux 1 ~ 9번 윈도우로 이동
  # command + 1                         C-q 1
  - { key: Key1, mods: Command, chars: "\x11\x31" }
  - { key: Key2, mods: Command, chars: "\x11\x32" }
  - { key: Key3, mods: Command, chars: "\x11\x33" }
  - { key: Key4, mods: Command, chars: "\x11\x34" }
  - { key: Key5, mods: Command, chars: "\x11\x35" }
  - { key: Key6, mods: Command, chars: "\x11\x36" }
  - { key: Key7, mods: Command, chars: "\x11\x36" }
  - { key: Key8, mods: Command, chars: "\x11\x37" }
  - { key: Key9, mods: Command, chars: "\x11\x39" }

  # tmux 옆 윈도우로 이동
  # control + pgdn, control + pgup        C-q p , C-q n
  - { key: PageUp, mods: Control, chars: "\x11p" }
  - { key: PageDown, mods: Control, chars: "\x11n" }
  # tmux 윈도우 목록 보기(선택)
  # command + e                      C-q w
  - { key: E, mods: Command, chars: "\x11w" }

  # tmux 윈도우 사이즈 조정
  # cmd + 화살표,                        C-q H, C-q J, C-q K, C-q L
  - { key: Left,  mods: Command, chars: "\x11H" }
  - { key: Down,  mods: Command, chars: "\x11J" }
  - { key: Up,    mods: Command, chars: "\x11K" }
  - { key: Right, mods: Command, chars: "\x11L" }

  # command + [                             C-q [
  - { key: LBracket, mods: Command, chars: "\x11[" } # tmux 스크롤/복사 모드 전환
```

내 최근 설정은 [github.com/johngrib/dotfiles]( https://github.com/johngrib/dotfiles/blob/master/alacritty/alacritty.yml ) 에서 볼 수 있다.

## 나의 설정: macOS + alacritty + tmux {#macos-alacritty-tmux}

작성중

## Links

- [alacritty/alacritty (github.com)]( https://github.com/alacritty/alacritty )


