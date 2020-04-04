---
layout  : wiki
title   : vim 설정 파일을 주제별로 여러 파일로 분리하자
summary : 새해니까 vimrc를 대청소하자
date    : 2020-01-26 13:46:19 +0900
updated : 2020-01-26 14:33:05 +0900
tag     : vim
toc     : true
public  : true
parent  : [[Vim]]
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

> 내가 현재 사용하고 있는 방법이다.

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

