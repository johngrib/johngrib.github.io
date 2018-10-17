---
layout  : wiki
title   : 나의 bash cheatsheet
summary : bash tip 모음
date    : 2018-09-24 13:06:49 +0900
updated : 2018-10-17 13:06:50 +0900
tags    : bash
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

# vim session 디렉토리로 cd

* vim 세션으로 정해 둔 디렉토리로 쉽게 이동할 수 있다.
* fzf에 의존성이 있다.

```sh
function session_directory {
    cd $HOME$(grep -e 'cd\s' ~/.vim/session/* | sed 's/^.*:cd//' | sort | fzf | sed 's/ ~//')
}
```


