---
layout  : wiki
title   : alacritty
summary : rust로 개발된 단순하고 빠른 터미널 에뮬레이터
date    : 2023-09-02 19:26:31 +0900
updated : 2023-09-05 22:15:26 +0900
tag     : 
resource: 6B/2F3606-DFE4-4DD2-A078-42F134CB7EA7
toc     : true
public  : true
parent  : [[/tool]]
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

## 나의 설정: macOS + alacritty + tmux {#macos-alacritty-tmux}

내 최근 설정은 [github.com/johngrib/dotfiles]( https://github.com/johngrib/dotfiles/blob/master/alacritty/alacritty.yml ) 에서 볼 수 있다.

### 요약: 탭 기능이 없는 문제는 key_bindings와 tmux로 해결 {#summary-key-bindings-tmux}

- 나는 alacritty의 퍼포먼스가 몹시 마음에 들었기 때문에 alacritty를 사용하기로 했다.
- 하지만 alacritty에는 탭 기능이 없다는 문제가 있다.
    - 그러나 alacritty는 [탭 기능을 제공하지 않으며 앞으로도 그럴 것 같다]( https://github.com/alacritty/alacritty/issues/3129#issuecomment-572704682 ).
- 나는 터미널을 사용할 때 탭 기능을 즐겨 쓰는 편이다.
    - [[/mac/iterm]]이나 macOS의 빌트인 터미널에서는 `command + T`로 새로운 탭을 생성할 수 있었고, 나는 이 기능을 자주 사용했다.
    - alacritty에서도 탭 기능을 쓸 수 있으면 좋겠다고 생각.
        - 따라서 [[/cmd/tmux]]를 사용해 유사 탭을 쓰면 된다고 생각했다.
- [alacritty의 key_bindings 설정](https://github.com/alacritty/alacritty/wiki/Keyboard-mappings )은 지정한 단축키를 입력했을 때 특정한 키 시퀀스를 전달하도록 할 수 있다.
    - `key_bindings` 설정이 강력해서 command 키 조합 등으로 복잡한 tmux 키 입력을 쉽게 할 수 있다.
        - [Alacritty integration with Tmux]( https://arslan.io/2018/02/05/gpu-accelerated-terminal-alacritty/ )라는 글의 도움을 많이 받았다.
    - 예를 들어 `command + T`를 눌렀을 때 `C-q c`를 전달하도록 설정할 수 있다.
        - 이렇게 하면 `iTerm`의 탭 기능과 동작이 다를 뿐, 사용하는 사람 입장에선 똑같은 탭 기능이 된다.
    - 다음과 같은 기능들을 모두 가능할 것으로 생각했고 설정해보니 잘 돌아갔다. (tmux의 윈도우를 탭으로 생각하고 사용)
        - `command + T`: 새로운 탭 생성
        - `command + W`: 현재 탭 닫기
        - `command + D`: 현재 윈도우 좌우로 분할
        - `command + shift + D`: 현재 윈도우 상하로 분할
        - `command + O`: 분할된 윈도우들 순서대로 이동
        - `command + shift + O`: 분할된 윈도우들 서로 바꾸기
        - `command + 화살표`: 분할된 윈도우 크기 조정
        - `command + 1 ~ 9`: 1 ~ 9번 탭으로 이동
        - `command + E`: 탭 목록 전체 보기/선택
        - `command + shift + ,`: 탭 위치를 왼쪽으로 이동
        - `command + shift + .`: 탭 위치를 오른쪽으로 이동
        - `command + :`: tmux 명령 모드

실제로 이틀 사용해보니 macOS 빌트인 터미널이나 [[/mac/iterm]]의 탭을 쓰는 것과 별로 차이점을 느끼지 못했다.

퍼포먼스가 훌륭한데 탭 기능까지 생긴 셈이다.

이것으로 충분하다고 느꼈고 앞으로도 오래 alacritty를 사용할 것으로 예상한다.

### prefix key

나는 Vim을 사용하고 있기 때문에 tmux의 prefix key를 `C-b`로 사용하지 않는다.

`C-q`를 tmux prefix key로 사용한다.

```conf
 # C-b 대신 C-q 사용
unbind C-b
set -g prefix C-q
```

### 새로운 탭 생성

**`command + T`를 입력하면 새로운 탭을 생성한다.**

alacritty에서 `command + T`를 누르면 터미널로 `C-q c`를 전달하도록 설정했다.

```yml
key_bindings:
  # command + t                      C-q c
  - { key: T, mods: Command, chars: "\x11c" } # tmux 새로운 window 생성
```

그리고 tmux에서는 `C-q c`입력을 받으면 새로운 윈도우를 생성하도록 설정했다.

```conf
bind c new-window -c "#{pane_current_path}"
```

새로 생성되는 탭의 작업 디렉토리를 현재 탭과 맞추기 위해 `#{pane_current_path}`를 추가로 지정해 줬다.

(만약 `#{pane_current_path}`를 지정하지 않으면 새로운 탭의 작업 디렉토리는 `~`가 된다.)

### 탭 닫기

**`command + W`를 입력하면 현재 탭이나 분할 윈도우를 닫는다.**

다양한 애플리케이션들이 탭을 닫을 때 `command + W`를 사용한다.

나는 alacritty에서도 `command + W`를 눌렀을 때 탭이 닫히길 바란다.

따라서 `command + W` 입력이 `C-q X`를 전달하도록 설정했다.

```yml
key_bindings:
  # command + w                      C-q X
  - { key: W, mods: Command, chars: "\x11X" } # tmux 현재 pane 닫기
```

tmux에서는 다음과 같이 설정했다.

```conf
set-option -g renumber-windows on

bind-key X kill-pane
```

- `renumber-windows`를 `on`으로 설정하지 않으면 탭을 닫아도 탭 번호가 그냥 남아있어서, 탭 번호 사이에 빈 공간이 생길 수 있게 된다.
    - `renumber-windows`를 `on`으로 설정하면 탭을 닫을 때마다 모든 탭의 번호가 1번부터 순서대로 매겨진다.
- `C-q X`입력을 받으면 `kill-pane`을 실행한다.
    - `kill-pane`은 pane을 닫기 전에 `y/n`을 물어보지 않고 그냥 닫아버린다.



다음은 `command + T`로 새로운 탭을 생성하고 `command + W`로 탭을 닫는 모습이다. (탭 목록이 화면 아래쪽에 표시되므로 아래쪽을 잘 봐야 한다)

<video controls muted autoplay loop><source src=" /resource/6B/2F3606-DFE4-4DD2-A078-42F134CB7EA7/command-w.mp4 " type="video/mp4"></video>

### 화면 분할

**`command + D`는 현재 윈도우를 좌우분할, `command + shift + D`는 현재 윈도우를 상하분할한다.**

- `command + D`를 누르면 터미널로 `C-q "`를 전달 설정.
- `command + shift + D`를 누르면 터미널로 `C-q %`를 전달 설정.

```yml
key_bindings:
  # command + shift + d                    C-q "
  - { key: D, mods: Command|Shift, chars: "\x11\x22" } # tmux 윈도우 좌우 split
  # command + d                      C-q %
  - { key: D, mods: Command, chars: "\x11\x25" } # tmux 윈도우 상하 split
```

tmux에서는 `C-q "`입력을 받으면 현재 윈도우를 좌우로 분할하고, `C-q %`입력을 받으면 상하로 분할하도록 설정했다.

```conf
bind '"' split-window -v -c "#{pane_current_path}"
bind % split-window -h -c "#{pane_current_path}"
```

새로 분할되는 윈도우도 작업 경로는 현재 탭과 맞추기 위해 `#{pane_current_path}`를 지정해 줬다.

### 분할된 윈도우 활성화

**`command + O`는 분할된 윈도우를 순서대로 활성화하고, `command + shift + O`는 선택된 분할 윈도우를 다른 윈도우와 교체한다..**

- `command + O`를 누르면 터미널로 `C-q o`를 전달 설정.
- `command + shift + O`를 누르면 터미널로 `C-q C-o`를 전달 설정.

```yml
key_bindings:
  # command + o                      C-q o
  - { key: O, mods: Command, chars: "\x11\x6f" } # tmux pane 순차 이동
  # command + O                      C-q C-o
  - { key: O, mods: Command|Shift, chars: "\x11\x0f" } # tmux pane 서로 바꾸기
```

`o`와 `O`는 디폴트 동작이기 때문에 이와 관련된 tmux 설정은 해준 것이 없다.

다음은 화면을 `command + D`와 `command + shift + D`로 분할하고 `command + O`로 분할된 윈도우를 순차적으로 활성화하는 모습이다.
(`command + O`를 사용하지 않아도 마우스 클릭으로도 활성화할 수 있다.)

<video controls muted autoplay loop><source src=" /resource/6B/2F3606-DFE4-4DD2-A078-42F134CB7EA7/command-o.mp4 " type="video/mp4"></video>

### 분할된 윈도우 크기 조정

**`command + 화살표`로 분할된 윈도우의 크기를 조정한다.**

(물론 마우스로도 조정할 수 있다.)

```yml
key_bindings:
  # cmd + 화살표,                        C-q H, C-q J, C-q K, C-q L
  - { key: Left,  mods: Command, chars: "\x11H" }
  - { key: Down,  mods: Command, chars: "\x11J" }
  - { key: Up,    mods: Command, chars: "\x11K" }
  - { key: Right, mods: Command, chars: "\x11L" }
```

tmux 설정은 다음과 같다.

```conf
 # 윈도우 경계선을 아래로 이동
bind-key J resize-pane -D
 # 윈도우 경계선을 위로 이동
bind-key K resize-pane -U
 # 윈도우 경계선을 왼쪽으로 이동
bind-key H resize-pane -L
 # 윈도우 경계선을 오른쪽으로 이동
bind-key L resize-pane -R
```

<video controls muted autoplay loop><source src=" /resource/6B/2F3606-DFE4-4DD2-A078-42F134CB7EA7/command-arrow.mp4 " type="video/mp4"></video>

### 숫자로 탭 선택

**`command + 숫자`로 숫자에 해당하는 탭으로 이동한다.**

```yml
key_bindings:
  # tmux 1 ~ 9번 윈도우로 이동
  # command + 1 ~ 9                     C-q 1
  - { key: Key1, mods: Command, chars: "\x11\x31" }
  - { key: Key2, mods: Command, chars: "\x11\x32" }
  - { key: Key3, mods: Command, chars: "\x11\x33" }
  - { key: Key4, mods: Command, chars: "\x11\x34" }
  - { key: Key5, mods: Command, chars: "\x11\x35" }
  - { key: Key6, mods: Command, chars: "\x11\x36" }
  - { key: Key7, mods: Command, chars: "\x11\x36" }
  - { key: Key8, mods: Command, chars: "\x11\x37" }
  - { key: Key9, mods: Command, chars: "\x11\x39" }
```

tmux 설정은 딱히 해줄 것이 없었고, 다만 가장 왼쪽 탭의 숫자를 1로 조정했다.

tmux는 기본적으로 가장 왼쪽 탭을 0으로 매기는데,
alacritty는 `command + +`와 `command + -`로 화면의 폰트 크기를 조정할 수 있고 `command + 0`은 확대 축소를 초기화하는 단축키로 설정되어 있기 때문에 탭 넘버로 지정하고 싶지 않았다.

```conf
set -g base-index 1
    # 첫번째 윈도우 번호를 0 이 아니라 1로 시작하게 한다
    # (Alacritty와의 조합을 위해 1부터 시작하게 설정했다)
```

### 탭 목록 전체 보기/선택

**`command + E`로 탭 목록을 보여주고, 선택한 다음 엔터를 누르면 선택한 탭으로 이동한다.**

```yml
key_bindings:
  # command + e                      C-q w
  - { key: E, mods: Command, chars: "\x11w" }
```

tmux에서는 딱히 설정할 것이 없다.

다음은 탭 목록을 보여주는 화면의 스크린샷이다.
위에서는 탭 목록을 선택할 수 있고, 아래에서는 탭의 미리보기를 볼 수 있다.

미리보기에 화면이 분할된 것도 표현되기 때문에 굉장히 편리하다.

<video controls muted autoplay loop><source src=" /resource/6B/2F3606-DFE4-4DD2-A078-42F134CB7EA7/command-e.mp4 " type="video/mp4"></video>


### 탭의 좌우 이동

**`command + shift + ,`, `command + shift + .`으로 탭을 좌우의 다른 탭과 바꾼다.**

```yml
key_bindings:
  # tmux 윈도우(탭) 좌우 이동                   C-q C-h, C-q C-l
  - { key: Comma,  mods: Command|Shift, chars: "\x11\x08" }
  - { key: Period, mods: Command|Shift, chars: "\x11\x0c" }
```

```conf
bind-key C-h swap-window -t -1\; select-window -t -1
bind-key C-l swap-window -t +1\; select-window -t +1
```

화면 아랫부분에 주목.

<video controls muted autoplay loop><source src=" /resource/6B/2F3606-DFE4-4DD2-A078-42F134CB7EA7/command-shift-comma.mp4 " type="video/mp4"></video>


## Links

- [alacritty/alacritty (github.com)]( https://github.com/alacritty/alacritty )


