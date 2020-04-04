---
layout  : wiki
title   : IdeaVim 설정하기
summary : 이거라도 쓰는 수 밖에 없다
date    : 2019-11-11 13:36:26 +0900
updated : 2020-03-28 23:50:00 +0900
tag     : vim
toc     : true
public  : true
parent  : [[Vim]]
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

## action 호출 설정

```viml
" tabbar와 비슷한 느낌으로 사용할 수 있다
nnoremap \t :action ActivateStructureToolWindow<CR>

" startify와 비슷한 느낌으로 최근 프로젝트 이동을 할 수 있다
nnoremap \s :action ManageRecentProjects<CR>
```

## 플러그인

ideavim은 유명한 vim 플러그인의 에뮬레이션을 제공한다.

물론 vim 플러그인을 그대로 쓸 수 있는 것은 아니고, ideavim에서 사용할 수 있도록 만들어진 것이다.

2020년 3월 28일 기준으로 [ideavim]( https://github.com/JetBrains/ideavim )에서 지원되는 유명 플러그인은 다음과 같다.
>
Emulated Vim plugins:
- vim-easymotion
- vim-surround
- vim-multiple-cursors
- vim-commentary

### vim-surround

vim-surround 는 vim의 vim-surround와 똑같은 느낌으로 사용할 수 있었다.

vim-surround를 사용하려면 `.ideavimrc`에 다음과 같이 추가해주면 된다.

```viml
set surround
```

### vim-easymotion

이제 ideavim에도 easymotion이 들어와서 easymotion 스타일로 커서를 이동시킬 수 있게 되었다.

그런데 ideavim 만으로는 작동이 안 된다는 문제가 있다. easymotion을 사용하려면 다음 절차를 거쳐야 한다.

- IntelliJ에서 AceJump 플러그인을 설치한다.
- IntelliJ에서 IdeaVim-EasyMotion 플러그인을 설치한다.
- `.ideavimrc`에 다음 내용을 추가한다.

```viml
set easymotion
```

키 매핑은 다음과 같이 할 수 있다. 나는 `space`를 `mapleader`로 쓰기 때문에 다음과 같이 설정했다.

```viml
let mapleader=" "
nmap <Leader>l <Plug>(easymotion-lineforward)
nmap <Leader>j <Plug>(easymotion-j)
nmap <Leader>k <Plug>(easymotion-k)
nmap <Leader>h <Plug>(easymotion-linebackward)
nmap <Leader>a <Plug>(easymotion-jumptoanywhere)
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
