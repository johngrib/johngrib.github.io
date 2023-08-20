---
layout  : wiki
title   : bind 명령어
summary : 
date    : 2022-01-29 12:36:51 +0900
updated : 2023-08-20 19:20:01 +0900
tag     : bash command
resource: A5/DC6546-73C7-41A3-B083-096AD890BF84
toc     : true
public  : true
parent  : [[/cmd]]
latex   : false
---
* TOC
{:toc}

- `bind`는 [[/cmd/bash]]의 빌트인 명령 중 하나이며, 키의 조합에 대해 bash가 응답하는 방법을 지정할 수 있다.
- 쉽게 표현하자면 bash에서 사용할 단축키를 만들 수 있다.

## bind 목록 보기

`-P` 또는 `-p` 옵션을 사용하면 목록을 볼 수 있다.

```sh
$ bind -P | head -30

abort can be found on "\C-g", "\C-x\C-g", "\e\C-g".
accept-line can be found on "\C-j", "\C-m".
alias-expand-line is not bound to any keys
arrow-key-prefix is not bound to any keys
backward-byte is not bound to any keys
backward-char can be found on "\C-b", "\eOD", "\e[D".
backward-delete-char can be found on "\C-h", "\C-?".
backward-kill-line can be found on "\C-x\C-?".
backward-kill-word can be found on "\e\C-h", "\e\C-?".
backward-word can be found on "\eb".
```

기호의 의미는 다음과 같다.

- `\C-키`: `control + 키`
    - `\C-g`: `control + g`
    - `\C-m`: `control + m`
- `\e키`: `meta + 키` 또는 `Esc` 키를 누른 다음, `키`
    - `\eb`: `meta + b` 또는 `Esc` 누르고 나서 `b`
    - `\e\C-g`: `meta + control + g` 또는 `Esc` 누르고 나서 `control + g`

혼란스럽다면 grep을 사용해 필터링해서 보도록 하자.

```sh
$ bind -P | grep 'C-[ahlu]'
backward-delete-char can be found on "\C-h", "\C-?".
backward-kill-word can be found on "\e\C-h", "\e\C-?".
beginning-of-line can be found on "\C-a", "\eOH", "\e[H".
clear-screen can be found on "\C-l".
undo can be found on "\C-x\C-u", "\C-_".
unix-line-discard can be found on "\C-u".
```

- `\C-h`: `control + h`. 커서 왼쪽의 한 글자 지우기.
- `\e\C-h`: `meta + control + h`. 커서 왼쪽의 단어 하나 지우기.

## Examples

다음과 같이 입력한 다음, `control + t`를 누르면 터미널에서 `pwd` 명령이 실행된다.

```sh
bind '"\C-t": "pwd\C-m"'
```

오른쪽의 `\C-m`은 CR이며, `\r`로 평가된다. 그냥 엔터라고 생각해도 된다.

아래와 같이 하면 `meta + v`로 `fav`를 입력하고 엔터 키를 입력한 것처럼 할 수 있다.

```sh
bind '"\ev": "fav\C-m"'
```


## 부록: Option과 Meta

- `meta`는 Mac에서는 `option`, 그 외의 운영체제에는 보통 `alt`키에 바인딩된다.
- Mac의 터미널에서는 `option`이 `meta`에 기본적으로 바인딩이 되어 있지 않으므로, `설정 - 프로파일 - 키보드 - Option을 Meta 키로 사용`을 체크해 주도록 한다.

![]( ./mac-terminal-meta.jpg ){:style="max-width:550px"}

- [[/mac/iterm]]은 Option과 Meta 연결을 설정해주어도 잘 안 되어서 엄청 짜증나는데(그래서 나는 [[/mac/iterm]] 안 쓴다), 그래서 보통은 그냥 `Esc` 누르고 이후의 조합을 누른다.

