---
layout  : wiki
title   : Ultisnips와 vim-go를 같이 사용할 때 발생하는 E734 에러 해결
summary : += 는 list 타입에만 쓰자
date    : 2018-08-23 23:14:09 +0900
updated : 2018-09-21 08:36:26 +0900
tag     : ultisnips golang vim
toc     : true
public  : true
parent  : Golang
latex   : false
---
* TOC
{:toc}

# 발단

[Ultisnips](https://github.com/SirVer/ultisnips )는 최강의 Vim 플러그인 중 하나이지만,
이상하게 다른 플러그인과 충돌하는 경우가 많은데...

오늘 하나 더 발견했다.

[vim-go](https://github.com/fatih/vim-go )를 설치한 다음 `*.go` 파일을 열면, `+=` 연산자에 대해 `E734` 에러가 발생한다.

```
E734: Wrong variable type for +=
```

# 문제 발생 지점

문제 발생 지점은 vim-go의 `s:GoUltisnips` 함수였다.

```viml
function! s:GoUltiSnips() abort
  if get(g:, 'did_plugin_ultisnips') isnot 1
    return
  endif

  if !exists("g:UltiSnipsSnippetDirectories")
    let g:UltiSnipsSnippetDirectories = ["gosnippets/UltiSnips"]
  else
    let g:UltiSnipsSnippetDirectories += ["gosnippets/UltiSnips"]   " 오잉?
  endif
endfunction
```

주석으로 **오잉?** 이라 쓴 곳을 보면

* `g:UltiSnipsSnippetDirectories`에 `+=` 연산자를 써서 `["gosnippets/UltiSnips"]`를 이어 붙이고 있다.
* 이어 붙이는 것이 list 이므로, `g:UltiSnipsSnippetDirectories`는 list여야 한다.
* `g:UltiSnipsSnippetDirectories`가 list가 아니라면? E734 에러가 난다.

어이없는 건 나는 `g:UltiSnipsSnippetDirectories`를 따로 설정해준 적이 없다는 것이다.

default 값으로 돌아가는데도 에러가 난다는 것. 설마 나만 그런건 아니겠지?

아무튼 해결책은 두 가지다.

* `.vimrc`에서 `let g:UltiSnipsSnippetDirectories = []` 와 같이 정의해준다.
* `s:GoUltiSnips`에서 `g:UltiSnipsSnippetDirectories`가 list 타입이 아니라면 `+=`을 못 쓰게 한다.

그냥 두 번째 방법을 쓰기로 했다.

따라서 다음과 같이 수정하였다.

```viml
function! s:GoUltiSnips() abort
  if get(g:, 'did_plugin_ultisnips') isnot 1
    return
  endif

  if !exists("g:UltiSnipsSnippetDirectories")
    let g:UltiSnipsSnippetDirectories = ["gosnippets/UltiSnips"]
  elseif type("g:UltiSnipsSnippetDirectories") == 3
    let g:UltiSnipsSnippetDirectories += ["gosnippets/UltiSnips"]
  endif
endfunction
```

이렇게 수정하니 에러가 싹 사라졌다. 쉽게 해결해서 다행이다.

그러나 역시 가장 쉬운 해결 방법은 `g:UltiSnipsSnippetDirectories`를 `.vimrc`에서 직접 정의해 주는 것일듯.

```viml
let g:UltiSnipsSnippetDirectories = []
```

이거 하나면 위의 삽질이 다 필요없다.


# Links

* [Ultisnips](https://github.com/SirVer/ultisnips )
* [vim-go](https://github.com/fatih/vim-go )
