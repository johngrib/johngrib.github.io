---
layout  : wiki
title   : lldb 명령어
summary : command line interface to the LLDB debugger library
date    : 2020-09-28 15:48:54 +0900
updated : 2020-09-28 16:08:52 +0900
tag     : bash command c
toc     : true
public  : true
parent  : [[command-line]]
latex   : false
---
* TOC
{:toc}

## Examples

다음과 같은 `hello.c`라는 c 소스코드 파일이 있다고 하자.

```c
#include <stdio.h>

int main()
{
    int age = 10;
    int height = 72;
    printf("My age: %d.\n", age);
    printf("My height: %d.\n", height);
    return 0;
}
```

다음과 같이 빌드한 다음...

```sh
cc -Wall -g    hello.c   -o hello
```

실행 파일 `hello`가 빌드되면 디버거를 돌릴 수 있다.

```sh
$ lldb hello
(lldb) break set -n main    # main 함수에 breakpoint 설정
(lldb) run  # 실행
(lldb) n    # next : 다음 라인
(lldb) c    # continue : 계속 실행
(lldb) fr v # frame variable : 변수, 변수 값 출력
(lldb) quit # 종료
```

![]( /post-img/lldb-cmd/break.jpg )


