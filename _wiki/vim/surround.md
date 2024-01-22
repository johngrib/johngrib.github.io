---
layout  : wiki
title   : vim-surround
summary : 
date    : 2024-01-22 22:36:04 +0900
updated : 2024-01-22 22:47:47 +0900
tag     : 
resource: 3C/042FD2-6EC5-4C47-8DE8-B106CC915C03
toc     : true
public  : true
parent  : [[/vim]]
latex   : false
---
* TOC
{:toc}

## vim-surround

<https://github.com/tpope/vim-surround >

## 응용

### visual mode Si, Sa

surround에는 `t`를 제외하고 여러 문자를 한꺼번에 감싸는 기능이 없다.

그래서 나는 다음과 같이 만들어 사용하고 있다.

```vimscript
" Surround 확장.
vmap Si :call <SID>surround_with_text()<CR>
function! s:surround_with_text()
    let l:text = input(">> ")
    execute "normal! `>a" . l:text
    execute "normal! `<i" . l:text
endfunction

vmap Sa :call <SID>surround_with_symmetry_text()<CR>
function! s:surround_with_symmetry_text()
    let l:text = input("<> ")
    let l:reverse_text = join(reverse(split(l:text, '.\zs')), '')
    execute "normal! `>a" . l:reverse_text
    execute "normal! `<i" . l:text
endfunction
```

vim-surround는 visual mode에서 `S`를 입력하고 아무 글자나 하나 입력하면 그 글자를 선택한 텍스트의 앞뒤로 감싼다.

`Si`와 `Sa`는 이를 응용한 것이다.
vim-surround의 기능이나 코드를 활용하는 방법은 아니지만 마치 vim-surround에 원래 포함되어 있는 기능인 것처럼 사용할 수 있다.

- Visual mode 에서 `Si` 입력
    - 입력한 문자열을 선택한 텍스트의 앞뒤로 감싼다.
    - 예: `dolor`를 선택하고 `Si` 한 다음, `123`을 입력하면 `123dolor123`이 된다.
- Visual mode 에서 `Sa` 입력
    - 입력한 문자열을 좌우 대칭이 되도록 선택한 텍스트의 앞뒤로 감싼다.
    - 예: `dolor`를 선택하고 `Sa` 한 다음, `123`을 입력하면 `123dolor321`이 된다.

<video controls autoplay loop><source src=" /resource/3C/042FD2-6EC5-4C47-8DE8-B106CC915C03/sisa.mp4 " type="video/mp4"></video>

