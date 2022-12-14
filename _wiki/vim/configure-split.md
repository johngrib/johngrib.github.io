---
layout  : wiki
title   : vim 설정 파일을 주제별로 여러 파일로 분리하자
summary : vimrc를 대청소하자
date    : 2020-01-26 13:46:19 +0900
updated : 2022-12-14 21:35:36 +0900
tag     : vim
resource: 47/C5736C-AF57-49E2-811F-13768565D6CC
toc     : true
public  : true
parent  : [[/vim]]
latex   : false
---
* TOC
{:toc}

## 발단: 점점 방대해지는 .vimrc 파일

vim을 오래 사용하다 보면 자연스럽게 `.vimrc` 파일도 길어지기 마련이다.

처음에 100줄도 안 되었던 `.vimrc` 파일이 어느새 몇 천 줄을 넘어가게 되면 관리가 힘들다.

따라서 주제별로 여러 개의 파일로 분리하여 관리해야겠다는 생각을 하게 되었다.

## 방법 1: vim plugin으로 설정 파일을 분리한다

> 이 방법은 2017년 무렵에 사용했던 방법이다. 이상적인 방법이지만 관리가 귀찮아 사용하지 않게 되었다.

내가 가장 먼저 선택했던 방법은 주제별로 플러그인을 만들어 분리하는 것이다.

이 방법은 다음과 같은 장점이 있다.

* 확실한 주제를 갖는 설정으로 모듈화를 꾀할 수 있다.
* github에 올려두면 플러그인 매니저를 사용해 쉽게 설치/제거를 할 수 있다.
* 다른 사람에게 설정을 전달해 줄 때 간편하다.

그러나 한동안 사용해보니 단점도 확실했다.

* 관심사가 겹치는 설정이 있어 확실한 주제 하나로 분리하기 애매한 경우가 있다.
* 의외로 자주 변경하는 설정도 있는데, 그 때마다 github에 올려둔 플러그인을 매번 수정해 주기가 귀찮다.
* 다른 사람에게 설정을 전달해 줄 일이 거의 발생하지 않는다.

그래서 이 방법은 오래 사용하지 않게 되었다.

## 방법 2: runtime 명령을 사용한다

> 이 방법은 2018년부터 사용한 방법이다. 거의 완벽한 방법이었지만 작은 문제가 있다.

다음 코드를 `.vimrc` 파일에 추가한다.

```viml
runtime! vim-include/*.vim
```

그리고 `~/.vim/` 의 하위 디렉토리로 `~/.vim/vim-include/` 를 만들고 다음과 같이 여러 설정을 분리해 넣었다.

```text
~/.vim
├── UltiSnips
├── autoload
├── plugged
├── plugin
├── session
├── startup
├── undodir
└── vim-include     <- 이 디렉토리에 분리한 설정 파일을 넣는다
    ├── bookProgressUpdate.sh
    ├── ft-fortune.vim
    ├── ft-gitcommit.vim
    ├── ft-perl6.vim
    ├── set-airline.vim
    ├── set-autoformat.vim
    ├── set-coc.vim
    ├── set-easymotion.vim
    ├── set-fzf.vim
    ├── set-gutentags.vim
    ├── set-nerdtree.vim
    ├── set-php.vim
    ├── set-rust.vim
    ├── set-startify.vim
    ├── set-tagbar.vim
    ├── set-typescript.vim
    ├── set-ultisnips.vim
    ├── set-vim-go.vim
    ├── set-vim-rest-console.vim
    ├── set-vimpager.vim
    ├── set-vimwiki.vim
    └── set-youcompleteme.vim
```

다만 이렇게 하면 `~/.vim`의 하위 경로에 있는 파일을 `!runtime`으로 읽어주기 때문에 분리한 파일 하나하나를 두 번 읽는다는 문제가 생긴다.

따라서 설정 파일 하나하나를 다음과 같이 두 번 읽지 않도록 작업해줬다.

다음은 분리한 설정 파일 중 하나인 `set-airline.vim` 파일의 내용이다.

```viml
if !exists('g:include_set_airline_loaded')
    let g:include_set_airline_loaded = 1

    let g:airline#extensions#tabline#enabled = 1
    let g:airline#extensions#tabline#fnamemod = ':t'
    let g:airline#extensions#tabline#buffer_nr_show = 1
    let g:airline#extensions#tabline#buffer_nr_format = '%s:'
    let g:airline_powerline_fonts = 1
endif
```

이 방법은 아주 잘 작동했다.

굳이 변수 하나를 더 설정하는 게 마음에 들지 않긴 했지만 시간날 때 고쳐야지... 하고 지냈는데 정신차리고 보니 2년이 지나 2020년이 되었다.

## 방법 3: for loop를 돌며 source 해준다

> 내가 2020년부터 사용하고 있는 방법이다.

2020년이 되었다. 새해를 맞아 나는 2년이나 묵혀둔 이 문제를 풀어야겠다는 생각을 하게 되었다.

그런데 코드를 보고 있으니 이 문제를 이렇게 복잡하게 풀 필요가 없다는 생각이 들었다. 그냥 한 번씩만 읽어주면 되는 거 아닌가.

```viml
source vim-include/ft-fortune.vim
source vim-include/ft-gitcommit.vim
source vim-include/ft-perl6.vim
...
```

실험해보니 (당연히) 잘 돌아갔다.

그래서 `!runtime`은 주석처리하고 다음과 같이 간단한 for loop를 사용해 `source`하기로 했다.

```viml
" runtime! vim-include/*.vim
for include_file in uniq(sort(globpath(&rtp, 'vim-include/*.vim', 0, 1)))
    execute "source " . include_file
endfor
```

이제 각 설정 파일에서 불필요한 부분만 제거해주면 된다.

다음은 위에서 예로 들었던 `set-airline.vim` 파일에서 두 번 읽기 방지 코드를 제거한 것이다.

```viml
let g:airline#extensions#tabline#enabled = 1
let g:airline#extensions#tabline#fnamemod = ':t'
let g:airline#extensions#tabline#buffer_nr_show = 1
let g:airline#extensions#tabline#buffer_nr_format = '%s:'
let g:airline_powerline_fonts = 1
```

## 방법 4: PlugFile 명령으로 include 파일을 명시해준다

> 내가 2022년부터 사용하고 있는 방법이다.

파일을 분리해서 사용하다 보니 각각의 파일 하나하나가 개념상 플러그인의 역할을 하게 되거나,
다른 플러그인의 보조 플러그인으로 사용하게 되는 경우가 많다는 것을 깨달았다.
그러다보니 의존성 관리의 필요성을 느끼게 되었다.

예를 들어 `set-vim-textobj-user.vim` 파일은 `kana/vim-textobj-user` 플러그인에서 정의한 함수를 사용한다.
때문에 `kana/vim-textobj-user` 플러그인을 끌 경우 `set-vim-textobj-user.vim` 파일을 읽어들일 때 로딩되지 않은 함수를 호출하여 에러가 발생하게 된다.

그래서 플러그인을 끌 경우에 의존하는 파일도 쉽게 끌 수 있도록 명시하는 문법이 필요하다는 생각을 하게 되었다.

따라서 다음과 같이 `PlugFile` 명령을 정의해 사용하기로 했다.

```viml
let g:config_dir = expand('~/dotfiles/nvim/config/')
let s:file_plug_candidate = []

command! -nargs=1 PlugFile call <SID>plug_file(<args>)
function! s:plug_file( ... )
    call add(s:file_plug_candidate, g:config_dir . a:1)
endfunction
```

실제로는 이렇게 사용하면 된다.

```viml
let g:config_dir = expand('~/dotfiles/nvim/config/')
let s:file_plug_candidate = []

command! -nargs=1 PlugFile call <SID>plug_file(<args>)
function! s:plug_file( ... )
    call add(s:file_plug_candidate, g:config_dir . a:1)
endfunction

call plug#begin('~/.vim/plugged')

    Plug 'rcarriga/nvim-notify'
    PlugFile 'set-notify.vim'
    Plug 'simeji/winresizer'
    PlugFile 'set-winresizer.vim'   " 여기

    PlugFile 'vim-gx-on-regex.vim'  " 여기

    Plug 'kana/vim-textobj-user'
    PlugFile 'set-vim-textobj-user.vim'     " 여기

    " 이후 생략
call plug#end()

syntax enable
filetype plugin indent on

for include_file in s:file_plug_candidate
    execute "source " . include_file
endfor
let s:file_plug_candidate = v:null
```

`PlugFile` 명령을 사용하게 되면 주어진 파일을 `s:file_plug_candidate` 배열에 집어넣게 된다.
그리고 `call plug#end()`를 호출한 이후(즉 플러그인을 모두 로드한 이후), 배열을 순회하며 `source` 명령을 실행한다.

따라서 의존관계에 대한 순서를 신경쓰지 않아도 되며, 플러그인을 끌 경우에도 이렇게 주석 처리하기만 하면 된다.

```
    " Plug 'kana/vim-textobj-user'
    " PlugFile 'set-vim-textobj-user.vim'
```

그리고 `PlugFile`은 `Plug`와 비슷한 이름을 갖고 있기 때문에 같이 사용해도 별로 위화감이 없어 보이며,
vim-plug는 파일 하나로 이루어진 vim 플러그인을 처리하는 기능은 없(는 것 같)으므로 이렇게 사용하는 것도 나름 괜찮은 방법인 것 같다.

실제 내가 작업한 코드는 여기에서 볼 수 있다.

- [PlugFile 기능 추가]( https://github.com/johngrib/dotfiles/commit/9689020a97249d98be0a42fae5593c7832cc8de7 )
- [Vim 플러그인 설정 방식에 PlugFile 추가]( https://github.com/johngrib/dotfiles/commit/ecf130149d81a3e7e0f784adbb74abb7f2f01d99 )

