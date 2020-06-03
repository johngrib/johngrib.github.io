---
layout  : wiki
title   : 내가 개조한 해피해킹JP를 사용하는 방법
summary : HHKB-JP + Hammerspoon으로 행복한 컴퓨터 생활
date    : 2020-06-03 23:01:19 +0900
updated : 2020-06-04 00:32:09 +0900
tag     : keyboard hhkb hammerspoon
toc     : true
public  : true
parent  : [[my-lifehack]]
latex   : false
---
* TOC
{:toc}

## 나의 키보드 레이아웃

나는 주로 다음과 같이 2개의 레이아웃을 사용한다. 내가 사용하는 키보드는 개조한 HHKB-JP.

![]( /post-img/my-keyboard-use/layer0.jpg )
![]( /post-img/my-keyboard-use/layer1.jpg )

## F13의 사용

나는 이 키를 왼손 손날로 누른다.

| ![]( /post-img/my-keyboard-use/f13-push.JPG ) | ![]( /post-img/my-keyboard-use/f13.jpg ) |

`F13`을 누르면 다음과 같은 일이 일어난다.

- 입력기를 무조건 영문(`com.apple.keylayout.ABC`)으로 전환하고, `ESC`키 입력을 보낸다.

`F13`은 vim을 자주 사용하는 나에게 매우 중요한 키이다.

터미널 vim은 물론이고, IDE vim 플러그인에서도 똑같은 방법으로 `ESC`를 입력할 수 있기 때문이다.

## L1(FN)의 사용

| ![]( /post-img/my-keyboard-use/fn-hjkl.JPG ) | ![]( /post-img/my-keyboard-use/fn-hjkl-layer.jpg ) |

- `L1`을 누른 상태에서
    - `h`, `j`, `k`, `l`을 방향키로 사용할 수 있다.
    - `u`, `i`, `o`, `p`를 각각 `home`, `page down`, `page up`, `end`키로 사용할 수 있다.
    - `m`을 `enter`로 사용할 수 있다.
    - `,`을 `backspace`로 사용할 수 있다.
    - `.`을 `delete`로 사용할 수 있다.
    - 왼손이 닿는 `1`, ~ `b`를 `F1` ~ `F20`으로 사용할 수 있다.

## 짧은 스페이스의 활용

| ![]( /post-img/my-keyboard-use/copy-paste.JPG ) | ![]( /post-img/my-keyboard-use/short-space-layout.jpg ) |

**부담없는 복사 - 붙여넣기**

- 스페이스 키가 짧기 때문에 `command`키가 평범한 키보드보다 많이 오른쪽에 있다.
- 따라서 `command` + `c`, `command` + `v` 붙여넣기를 할 때 손가락 위치가 매우 자연스럽다.

**엄지손가락으로 누르는 오른쪽 쉬프트 키**

- 오른손 엄지손가락으로 오른쪽 `shift`키를 누를 수 있으므로 새끼손가락 관절염을 걱정하지 않아도 된다.

## F16의 활용

나는 이 키를 오른손 손날로 누른다.

| ![]( /post-img/my-keyboard-use/inputsource.JPG ) | ![]( /post-img/my-keyboard-use/f16.jpg ) |

이 키는 hammerspoon을 사용해 두 가지 기능을 붙여 쓰고 있다.

- `f16` 키를 눌렀다 떼면 한/영 전환이 된다.
- `f16` 키를 누른 상태에서 `q`,`w`,`e`,`r`,`a`,`s`,`d`,`f`로 마우스를 조작할 수 있다.
    - `q`, `a`는 마우스 휠 위/아래 이다.
    - `e`,`s`,`d`,`f`는 마우스 포인터를 위,왼쪽,아래,오른쪽으로 이동시킨다. 쉬프트를 누르고 있으면 느리게 이동시킨다.
    - `w`,`r`은 클릭, 우클릭이다.

## F17의 활용

이 키도 오른손 손날로 누른다.

![]( /post-img/my-keyboard-use/f17.jpg )

이 키는 hammerspoon을 사용해 두 가지 기능을 붙여 쓰고 있다.

이 키를 누른 상태에서 다음과 같은 기능을 사용할 수 있다.

**등록해둔 앱 실행**
- `space`: 터미널 활성화(또는 실행)/숨기기
- `c`: 구글 크롬 활성화(또는 실행)/숨기기
- `n`: 메모장
- `f`: 파이어폭스
- ...

**윈도우 이동**
- `1`: 현재 실행중인 윈도우를 화면의 1/4 사이즈로 조절하고 왼쪽 아래로 이동.
- `2`: 현재 실행중인 윈도우를 화면의 1/2 사이즈로 조절하고 아래로 이동.
- `3`: 현재 실행중인 윈도우를 화면의 1/4 사이즈로 조절하고 오른쪽 아래로 이동.
- `4`: 현재 실행중인 윈도우를 화면의 1/2 사이즈로 조절하고 왼쪽으로 이동.
- `5`: 현재 실행중인 윈도우를 화면의 100% 사이즈로 조절.
- ...
- `9`: 현재 실행중인 윈도우를 화면의 1/4 사이즈로 조절하고 오른쪽 위로 이동.
- `-`: 현재 실행중인 윈도우를 왼쪽 모니터로 보낸다.
- `+`: 현재 실행중인 윈도우를 오른쪽 모니터로 보낸다.
