---
layout  : wiki
title   : Neovim에서 Go 코드를 작성하자
summary : 
date    : 2022-05-21 13:48:52 +0900
updated : 2023-01-21 23:19:51 +0900
tag     :
resource: 9F/E6B38E-AD23-4179-AB4C-477BE1E973CA
toc     : true
public  : true
parent  : [[/go]]
latex   : false
---
* TOC
{:toc}

## 환경 설정

### gvm

[[/go/gvm]]을 사용하면 Go 버전별로 설치해 관리하는 것이 가능하다.

### gopls

[gopls]( https://github.com/golang/tools/tree/master/gopls )는 Go language server 이다.

```bash
go install golang.org/x/tools/gopls@latest
```

### vim-go 설치

[vim-go](https://github.com/fatih/vim-go )는 Vim에서 Go 언어를 사용해 코딩하기 위한 통합적 환경을 제공해 준다.

```viml
Plug 'fatih/vim-go', { 'do': ':GoUpdateBinaries' }
```

### coc.nvim 설정

[coc-go]( https://github.com/josa42/coc-go )를 설치해 준다.

```viml
:CocInstall coc-go
```

## 문제 해결

### vim-go가 개인 Ultisnips snippet을 override하는 문제

vim-go의 snippet이 개인 [[/vim/ultisnips]] snippet을 override하는 문제가 있다.

나는 다음과 같이 설정해서 사용하고 있는데...

```viml
let g:UltiSnipsSnippetDirectories = ['~/dotfiles/UltiSnips']
```

vim-go를 사용하게 되면 이 설정을 다음과 같이 바꿔놓는다.

```viml
let g:UltiSnipsSnippetDirectories = ['~/dotfiles/UltiSnips', "gosnippets/UltiSnips"]
```

보기에는 두 개의 디렉토리를 설정해서 쓰는 것 같아서 별다른 문제가 없다.
그런데 실제로 사용해보면 내 개인 설정은 작동하지 않고 vim-go의 snippet만 작동한다.
뭔가 내가 잘못한 게 있겠지만 이걸 일일이 추적해서 고치기는 귀찮다.

따라서 다음과 같이 설정해서 vim-go의 snippet 기능이 작동하지 않게 했다.
이렇게 하면 ultisnips가 내 snippet을 토대로 잘 작동한다.

```viml
let g:go_loaded_gosnippets = 1
```

여기에서 `1`로 설정한 `g:go_loaded_gosnippets`는 vim-go의 help 문서에는 없는 값이다.
하지만 [vim-go/plugin/gosnippet.vim]( https://github.com/fatih/vim-go/blob/25a717db34e24accf3a0eb0d2547e3d554a5c26c/plugin/gosnippet.vim#L1 ) 파일을 읽어보면 이 값을 `1`로 설정해서 이미 `gosnippet.vim` 파일이 로딩된 것처럼 꾸밀 수 있다는 것을 알 수 있다.

## 함께 읽기

- [[/clojure/vim-setting]]
- [[/vim/ultisnips]]

