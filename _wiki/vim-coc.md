---
layout  : wiki
title   : coc.nvim을 사용해보자
summary : 
date    : 2019-05-16 22:19:50 +0900
updated : 2019-06-04 21:19:17 +0900
tag     : vim
toc     : true
public  : true
parent  : Vim
latex   : false
---
* TOC
{:toc}

# coc.nvim 설치

coc.nvim이 좋다는 소문이 돌길래 나도 사용해보기로 했다.

익숙한 youcompleteme는 잠시 주석을 쳐 두고 다음과 같이 플러그인을 추가했다.

```viml
Plug 'neoclide/coc.nvim', {'tag': '*', 'do': './install.sh'}
```

# Language Server 설치

coc의 랭귀지 서버 설치는 쉽다.

<https://github.com/neoclide/coc.nvim/wiki/Language-servers >를 참고하여 원하는 랭귀지 서버를 설치하면 된다.

예를 들어 php 랭귀지 서버의 경우 다음 명령어를 입력하면 자동으로 알아서 설치된다.

```viml
:CocInstall coc-phpls
```

vimrc에서 정의하는 방식이면 더 좋았겠지만 이런 방법도 나쁘지 않은 것 같다.

# Ultisnips 와의 연동

나는 나만의 snippet이 많은 편이라 Ultisnips와의 연동은 중요하다.

만약 Ultisnips와의 연동이 안 된다면 youcompleteme로 돌아갈 생각을 했는데...

다음을 참고하니 쉽게 끝났다.

<https://github.com/neoclide/coc.nvim/wiki/Using-snippets >

다음과 같이 coc의 ultisnips 플러그인을 설치하는 것으로 연동이 끝난다.

```viml
:CocInstall coc-ultisnips
```

공들여 여기저기 설정해놓은 ultisnips 미리보기가 안 되는 건 아쉽지만 랭귀지 서버 기능이 youcompleteme보다 괜찮은 느낌이라 한동안 사용해보기로 했다.

# Links

* <https://github.com/neoclide/coc.nvim >
* <https://github.com/neoclide/coc.nvim/wiki/Language-servers >
* <https://github.com/neoclide/coc.nvim/wiki/Using-snippets >
