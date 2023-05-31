---
layout  : wiki
title   : /dev/fd
summary : file descriptor file들이 있는 디렉토리
date    : 2023-05-31 21:30:30 +0900
updated : 2023-05-31 22:01:22 +0900
tag     : 
resource: 98/FB8CCC-3FFD-481E-8BF9-AC07A50CB93B
toc     : true
public  : true
parent  : [[/jargon]]
latex   : false
---
* TOC
{:toc}

## 0, 1, 2

- `/dev/fd/0` : stdin
- `/dev/fd/1` : stdout
- `/dev/fd/2` : stderr

`/dev/fd/0`은 표준 입력이므로, 다음과 같이 `cat`을 실행해 놓고, 키보드로 입력을 해보면 입력한 내용이 그대로 출력되는 것을 볼 수 있다.

```sh
cat /dev/fd/0
```

`/dev/fd/1`은 표준 출력이므로, 다음과 같이 출력을 관찰할 수 있다.

```sh
echo "hello" > /dev/fd/1
```


## man

`/dev/fd`는 special file에 해당하므로 [[/cmd/man]]로는 `4`를 지정해야 볼 수 있다.

```sh
man 4 fd
```

## From: UNIX 고급 프로그래밍

>
최근 시스템들은 `/dev/fd`라는 이름의 디렉터리를 제공한다.
이 디렉터리에는 이름이 `0`, `1`, `2` 등인 파일들이 있다.
파일 서술자 n이 이미 열려 있다고 가정할 때, `/dev/fd/n` 이라는 파일을 여는 것은 서술자 n을 복제하는 것과 동등한 일이다.
> >
`/dev/fd` 기능은 [[/duff-s-device]]{톰 더프<sup>Tom Duff</sup>}가 개발했으며 Research UNIX System 제8판에 등장했다.
이 책에서 설명하는 모든 시스템(FreeBSD 8.0, Linux 3.2.0, Max OS X 10.6.8, Solaris 10)이 이 기능을 지원한다.
이 기능이 POSIX.1의 일부는 아니다.
>
(중략)
>
`/dev/stdin`이나 `/dev/stdout`, `/dev/stderr` 같은 경로이름들을 제공하는 시스템들도 있다.
이들은 각각 `/dev/fd/0`, `/dev/fd/1`, `/dev/fd/2`와 동등하다.
>
`/dev/fd` 파일들은 주로 셸에 쓰인다.
이들을 이용하면 경로이름 인수들을 사용하는 프로그램들이 표준 입력과 표준 출력을 다른 경로이름들과 동일한 방식으로 취급할 수 있다.
예를 들어 `cat`(1) 프로그램은 일부러 `-` 이라는 입력 파일이름을 찾아보고, 만일 그런 이름이 있으면 그것을 표준 입력으로 간주한다.
다음이 그러한 예이다.
>
> ```sh
> filter file2 | cat file1 - file3 | lpr
> ```
>
이 경우 `cat`은 먼저 `file1`을 읽고,
그 다음 표준 입력(`file2`에 대한 `filter` 프로그램의 출력)을 읽고, 그런 다음 `file3`을 읽는다.
`/dev/fd`가 지원되는 경우에는 cat에서 `-`에 대한 특별한 처리를 제거할 수 있다.
대신 다음과 같은 명령을 사용하면 된다.
>
> ```sh
> filter file2 | cat filel /dev/fd/O files | lpr
> ```
>
명령줄 인수에서 `-`가 표준 입력이나 표준 출력을 뜻하도록 특별하게 취급하는 방식을 따르는 프로그램들이 많이 생겼는데,
사실 그러한 처리는 바람직하지 않은 군더더기이다.
또한 `-`를 첫 번째 파일로 지정하는 경우에는 그것이 다른 명령줄 옵션의 시작으로 보인다는 문제도 있다.
`/dev/fd`를 사용하는 것은 균일함과 깔끔함으로 나아가는 한 걸음이다.
>
[^richard-110]

## 참고문헌

- UNIX 고급 프로그래밍 [제3판] / 리처드 스티븐스, 스티븐 레이고 공저 / 류광 역 / 퍼스트북 / 인쇄일: 2014년 08월 28일 / 원제: Advanced Programming in the UNIX Environment

## 주석

[^richard-110]: UNIX 고급 프로그래밍. 3.16장. 110쪽.

