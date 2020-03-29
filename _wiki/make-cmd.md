---
layout  : wiki
title   : make 명령어
summary : GNU make utility to maintain groups of programs
date    : 2020-03-29 23:15:11 +0900
updated : 2020-03-29 23:29:58 +0900
tag     : bash command c
toc     : true
public  : true
parent  : [[command-line]]
latex   : false
---
* TOC
{:toc}

## Examples
### 배치 명령 실행
```make
TESM=12000
CFLAGS=-Wall -g

test1:
	echo test 1?
test2:
	echo "${TESM}"
```

위와 같이 작성했다면 다음과 같이 실행할 수 있다.

```sh
make test1  # test 1? 이 출력된다
make test2  12000 이 출력된다
```

### C 언어 컴파일

다음과 같은 내용의 `hello.c` 파일을 작성했다고 하자.

```c
#include <stdio.h>

int main(int argc, char *argv[])
{
    printf("Hello, World\n");
    return 0;
}
```

다음과 같이 쉽게 컴파일 할 수 있다.

```sh
make hello
```

컴파일된 실행 파일을 지우기 쉽도록 `clean`을 등록하는 것도 방법이다.

```make
CFLAGS=-Wall -g

clean:
	rm -f hello
```
