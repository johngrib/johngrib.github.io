---
layout  : wiki
title   : 나의 bash cheatsheet
summary : 
date    : 2018-09-24 13:06:49 +0900
updated : 2018-09-24 13:08:33 +0900
tags    : bash
toc     : true
public  : true
parent  : command-line
latex   : false
---
* TOC
{:toc}

# vim session 디렉토리로 cd

* vim 세션으로 정해 둔 디렉토리로 쉽게 이동할 수 있다.
* fzf에 의존성이 있다.

```sh
function session_directory {
    cd $HOME$(grep -e 'cd\s' ~/.vim/session/* | sed 's/^.*:cd//' | sort | fzf | sed 's/ ~//')
}
```


