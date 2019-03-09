---
layout  : wiki
title   : 나의 bash cheatsheet
summary : bash tip 모음
date    : 2018-09-24 13:06:49 +0900
updated : 2018-10-17 13:11:53 +0900
tag     : bash
toc     : true
public  : true
parent  : command-line
latex   : false
---
* TOC
{:toc}

# 긴 명령어 편집

* `set -o vi` 모드에서 `Esc v`를 입력하면 vim이 열린다. 명령어 편집을 끝내고 저장/종료하면 명령어가 실행된다.
* `set -o emacs` 모드에서는 `<C-x><C-e>`를 입력하면 emacs가 열린다.

emacs 모드를 사용하고 있지만 vim으로 편집하고 싶다면?

* .bashrc에 `EDITOR` 변수를 vim으로 지정해준다.

```sh
export EDITOR=$(which vim)
```

# 입력중인 명령어를 주석처리

* 명령어를 입력하다가
    * 입력하고 있던 명령어를 바로 실행하긴 곤란하고, 다 지우기도 애매한 경우가 있다.

`<M-#>`을 입력하면 입력하고 있던 명령어 제일 앞에 `#`이 추가되고, 새로운 명령어를 입력하는 프롬프트가 나온다.

* `Meta` 키 입력을 어떻게 해야 할 지 모르겠다면 `option + #`, `Alt + #`, `Esc #`을 시도해보자.
* 위의 방법이 다 안 된다면 `<C-a>#`을 입력하는 정도로 타협할 수 있겠다.

# vim session 디렉토리로 cd

* vim 세션으로 정해 둔 디렉토리로 쉽게 이동할 수 있다.
* fzf에 의존성이 있다.

```sh
function session_directory {
    cd $HOME$(grep -e 'cd\s' ~/.vim/session/* | sed 's/^.*:cd//' | sort | fzf | sed 's/ ~//')
}
```


