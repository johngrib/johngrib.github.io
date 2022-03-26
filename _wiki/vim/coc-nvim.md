---
layout  : wiki
title   : coc.nvim
summary : vim을 vscode처럼 사용할 수 있게 도와주는 자동완성 플러그인
date    : 2019-05-16 22:19:50 +0900
updated : 2022-03-26 12:41:52 +0900
tag     : vim
toc     : true
public  : true
parent  : [[/vim]]
latex   : false
---
* TOC
{:toc}

## coc.nvim 설치

```viml
Plug 'neoclide/coc.nvim', {'tag': '*', 'do': './install.sh'}
```

## Language Server 설치

coc의 랭귀지 서버 설치는 쉽다.

<https://github.com/neoclide/coc.nvim/wiki/Language-servers >를 참고하여 원하는 랭귀지 서버를 설치하면 된다.

예를 들어 clojure 랭귀지 서버의 경우 다음 명령어를 입력하면 자동으로 알아서 설치된다.

```viml
:CocInstall coc-clojure
```

## Ultisnips 와의 연동

나는 나만의 snippet이 많은 편이라 [[/vim/ultisnips]]와의 연동이 중요하다.

<https://github.com/neoclide/coc.nvim/wiki/Using-snippets >

다음과 같이 coc의 ultisnips 플러그인을 설치하는 것으로 연동이 끝난다.

```viml
:CocInstall coc-ultisnips
```

## 함께 읽기

- [[/vim/ultisnips]]

## Links

* <https://github.com/neoclide/coc.nvim >
* <https://github.com/neoclide/coc.nvim/wiki/Language-servers >
* <https://github.com/neoclide/coc.nvim/wiki/Using-snippets >
