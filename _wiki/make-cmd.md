---
layout  : wiki
title   : make 명령어
summary : GNU make utility to maintain groups of programs
date    : 2020-03-29 23:15:11 +0900
updated : 2020-07-30 23:10:42 +0900
tag     : bash command c
toc     : true
public  : true
parent  : [[command-line]]
latex   : false
---
* TOC
{:toc}

스튜어트 펠드먼(Stuart Feldman)이 1976년에 만든 명세 언어.

## 역사

> 스튜어트는 우아한 아이디어를 생각해냈다.
프로그램의 조각들이 서로 어떻게 의존하는지 기술하는 명세 언어였다.
그가 `Make`(메이크)라고 부른 이 프로그램은 명세, 즉 `makefile`(메이크파일)을 분석하고
파일들이 변경된 시간 정보를 이용해서 모든 것을 최신으로 유지하는 데 필요한 최소한의 재컴파일을 수행했다.
Make가 처음으로 구현된 것은 1976년이었다.
>
> "저는 주말에 Make를 작성하고 그 다음 주말에 매크로를 이용해서 재작성했어요(내장된 코드의 목록이 너무 길어지고 있었거든요).
'행 시작에 탭 문자 넣기'는 고치지 않았는데, 금세 십여 명의 열렬한 사용자가 생겼고 그들을 당황하게 만들고 싶지 않았기 때문입니다."
>
> `Make`는 순식간에 성공을 거뒀다.
컴파일을 최대한 효율적으로 만들면서도 오만가지 어리석은 오류를 예방해주었기 때문이다.
[^KER-5]


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

## 참고문헌

- [KER] 유닉스의 탄생 / 브라이언 커니핸 저/하성창 역 / 한빛미디어 / 2020년 08월 03일 / 원서 : UNIX: A History and a Memoir

## 주석

[^KER-5]: [KER] 5장.

