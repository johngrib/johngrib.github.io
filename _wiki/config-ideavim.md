---
layout  : wiki
title   : IdeaVim 설정하기
summary : 이거라도 쓰는 수 밖에 없다
date    : 2019-11-11 13:36:26 +0900
updated : 2019-11-18 22:09:13 +0900
tag     : vim
toc     : true
public  : true
parent  : Vim
latex   : false
---
* TOC
{:toc}

## set options

모든 set 옵션은 [set-commands][set-commands]에서 볼 수 있다.

ideavimdm은 vim 플러그인을 그대로 사용할 수 없으므로, 유명한 플러그인의 에뮬레이션을 제공하기도 한다.

```viml
set ideamarks   " global 마크를 IntelliJ의 북마크 기능으로 사용한다.
set surround    " tim pope의 vim-surround 에뮬레이션 기능 사용.
set commentary  " tim pope의 commentary.vim 에뮬레이션 기능 사용.
```


## Link

* [JetBrains/ideavim][repo]
* [List of Supported Set Commands][commands]
* [나의 .ideavimrc][my]

## 주석

[repo]: https://github.com/JetBrains/ideavim
[commands]: https://github.com/JetBrains/ideavim/blob/master/doc/set-commands.md

[my]: https://github.com/johngrib/dotfiles/blob/master/.ideavimrc
[set-commands]: https://github.com/JetBrains/ideavim/blob/master/doc/set-commands.md
