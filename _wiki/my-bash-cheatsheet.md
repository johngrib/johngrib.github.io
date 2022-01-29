---
layout  : wiki
title   : 나의 bash cheatsheet
summary : bash tip 모음
date    : 2018-09-24 13:06:49 +0900
updated : 2022-01-29 16:14:06 +0900
tag     : bash
toc     : true
public  : true
parent  : [[cmd]]
latex   : false
---
* TOC
{:toc}

## 긴 명령어 편집

보통은 그냥 [[/cmd/fc]]를 사용하면 충분하다.

하지만 굳이 `fc`를 쓰지 않겠다면 다음을 고려해 보자.

* `set -o vi` 모드에서 `Esc v`를 입력하면 vim이 열린다. 명령어 편집을 끝내고 저장/종료하면 명령어가 실행된다.
* `set -o emacs` 모드에서는 `<C-x><C-e>`를 입력하면 emacs가 열린다.

emacs 모드를 사용하고 있지만 vim으로 편집하고 싶다면?

* .bashrc에 `EDITOR` 변수를 vim으로 지정해준다.

```sh
export EDITOR=$(which vim)
```

## 입력중인 명령어를 주석처리

* 명령어를 입력하다가
    * 입력하고 있던 명령어를 바로 실행하긴 곤란하고, 다 지우기도 애매한 경우가 있다.

`<M-#>`을 입력하면 입력하고 있던 명령어 제일 앞에 `#`이 추가되고, 새로운 명령어를 입력하는 프롬프트가 나온다.

* `Meta` 키 입력을 어떻게 해야 할 지 모르겠다면 `option + #`, `Alt + #`, `Esc #`을 시도해보자.
* 위의 방법이 다 안 된다면 `<C-a>#`을 입력하는 정도로 타협할 수 있겠다.

## 이전 명령 재실행

`!!`로 이전 명령을 재실행할 수 있다.

## 이전 명령의 arguments 재사용

`!$` `!!:1`

`!!:숫자`는 이전 명령의 arguments로 expand 된다.

다음과 같이 `echo` 명령을 실행했다고 하자.

```sh
$ echo a b c
a b c
```

이후 아래와 같이 하면 `echo a b c`로 확장된다. 즉 똑같은 명령을 재실행하는 것과 같다.

```sh
$ !!:0 !!:1 !!:2 !!:3
echo a b c
a b c
```

`!!:2`는 두 번째 argument로 expand 된다.

```sh
$ echo !!:2
echo b
b
```

`!$`는 마지막 argument로 expand 된다.

```sh
$ echo !$
echo c
b
```

## vim session 디렉토리로 cd

* vim 세션으로 정해 둔 디렉토리로 쉽게 이동할 수 있다.
* fzf에 의존성이 있다.

```sh
function session_directory {
    cd $HOME$(grep -e 'cd\s' ~/.vim/session/* | sed 's/^.*:cd//' | sort | fzf | sed 's/ ~//')
}
```


