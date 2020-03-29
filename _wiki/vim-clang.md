---
layout  : wiki
title   : c 언어 개발을 위한 vim 환경 설정
summary : 
date    : 2020-03-29 19:51:36 +0900
updated : 2020-03-29 20:53:29 +0900
tag     : 
toc     : true
public  : true
parent  : [[Vim]]
latex   : false
---
* TOC
{:toc}

## MacOS

먼저 llvm을 설치한다.

```sh
brew install llvm
```

llvm이 설치되면서 랭귀지 서버인 [clangd]( https://clangd.llvm.org/installation.html )도 함께 설치되었을 것이다.

`.bashrc` 나 `.bash_profile`에 다음과 같이 추가한다.

```sh
export PATH="/usr/local/opt/llvm/bin:$PATH"
```

나는 coc.nvim 을 사용하고 있으므로 [coc-clangd]( https://github.com/clangd/coc-clangd )를 설치한다.

```viml
:CocInstall coc-clangd
```

이제 간단한 c 코드를 작성해 보자.

- `hello.c`

```c
#include <stdio.h>

int main(int argc, char *argv[])
{
    printf("Hello, World\n");
    return 0;
}
```

자동완성도 잘 되나 확인해 보자.

![]( /post-img/vim-clang/completion.png )


컴파일한 다음, 실행해보자.

![]( /post-img/vim-clang/hello.png )

