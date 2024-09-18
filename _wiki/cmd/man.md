---
layout  : wiki
title   : man 명령어
summary : 유닉스 메뉴얼 페이지를 찾아보는 명령
date    : 2020-09-30 09:38:35 +0900
updated : 2024-09-18 18:14:25 +0900
tag     : bash command c
resource: 3B/C635C4-EF04-473E-BB03-A4BDD7D9BDAA
toc     : true
public  : true
parent  : [[/cmd]]
latex   : false
---
* TOC
{:toc}

## Sections

`man`은 사용법에 앞서 섹션에 대해 알아야 한다.

여러 섹션이 있으며, 명령에 섹션을 옵션으로 줄 수 있다.

다음은 MacOS 터미널에서 `man man`을 입력하면 볼 수 있는 목록이다.

>
1. General Commands Manual
2. System Calls Manual
3. Library Functions Manual
4. Kernel Interfaces Manual
5. File Formats Manual
6. Games Manual
7. Miscellaneous Information Manual
8. System Manager's Manual
9. Kernel Developer's Manual

각 섹션에 대해서는 `man 섹션넘버 intro`를 입력하면 설명서를 볼 수 있다.

```
man 1 intro
man 2 intro
man 3 intro
```

- `man 4 intro`, `man 6 intro`는 설명서가 없을 수도 있다.

## 기본 사용법

```bash
man sed
```

- sed 명령 설명서를 본다

### 섹션 지정

```sh
man 1 sed
```

- 1 섹션의 [[/cmd/sed]] 설명서를 본다
    - `sed`는 1 섹션에 있으므로 위의 `man sed` 명령과 같다

각 설명서는 섹션이 나뉘어 있다. `sed` 설명서를 보면 최상단에 `SED(1)`이라고 되어 있는데 이는 1번 섹션 설명서를 의미한다.

![]( /resource/3B/C635C4-EF04-473E-BB03-A4BDD7D9BDAA/man-sed.jpg )

```sh
 # 1 섹션의 printf 설명서를 본다
man printf
 # 1 섹션의 printf 설명서를 본다
man 1 printf
```

1번 섹션이 기본값이므로 `man printf`와 같이 입력하면 사용자 명령의 `printf` 설명서를 보게 된다.

![]( /resource/3B/C635C4-EF04-473E-BB03-A4BDD7D9BDAA/printf-1.jpg )

그러나 C 언어의 `printf` 설명을 보고 싶다면 3번 섹션을 지정해서 조회해야 한다.

```sh
 # 3 섹션의 printf 설명서를 본다
man 3 printf
```

![]( /resource/3B/C635C4-EF04-473E-BB03-A4BDD7D9BDAA/printf-3.jpg )

## 옵션

### -k : whatis 데이터베이스에서 검색

```sh
 # perl-compatible 문자열을 apropos로 보여준다
man -k perl-compatible
```

`apropos`는 `whatis` 데이터베이스를 사용하므로 차이점을 알아두도록 한다.

`-` 왼쪽이 설명서 이름과 섹션, `-` 오른쪽이 검색된 라인이다.

![]( /resource/3B/C635C4-EF04-473E-BB03-A4BDD7D9BDAA/find-apropos.jpg )

### -K : 모든 설명서에서 검색

모든 설명서를 대상으로 검색하고 싶다면 `-K` 옵션을 쓴다.

```sh
 # 모든 설명서에서 string 문자열을 찾는다
man -K string
```

이 명령은 매우 느리며, 다음과 같이 검색 결과에 대해 `[ynq]`를 물어본다.

![]( /resource/3B/C635C4-EF04-473E-BB03-A4BDD7D9BDAA/find-all.jpg )

- `y`: 문서 열기
- `n`: 다음 문서
- `q`: 검색 종료

## 함께 알아둘 명령
### manpath

`manpath` 명령을 사용해 `man` 명령이 검색하는 경로를 출력할 수 있다.

### less

`man`은 뷰어를 따로 설정하지 않으면 [[/cmd/less]]를 사용해 설명서를 보여준다.
따라서 [[/cmd/less]] 사용법과 설정 등을 알아 두도록 한다.


## man 이것저것
### 한번쯤 읽어두면 좋은 man 들

- `man ascii`
    - ASCII 문자표를 볼 수 있다. octal, hexademical, decimal 테이블 등이 있다.
- `man hier`
    - layout of filesystems
    - 시스템 디렉토리 구조에 대한 설명서.
- `man bash`
    - bash 설명서.
- `man ip`
    - Internet Protocol
- `man 4 null`
    - null device(`/dev/null`)에 대한 설명서.
- `man 4 random`
    - random device(`/dev/random`, `/dev/urandom`)에 대한 설명서.

### man 페이지 파일이 저장된 위치

기본적으로 man 페이지 파일은 `/usr/share/man` 디렉토리에 있다.

예를 들어 `man grep`을 실행하면 `/usr/share/man/man1/grep.1` 파일의 내용을 보게 된다.

### BUILTIN 명령에 대한 설명을 찾는 요령 {#find-builtin-man}

빌트인 명령은 `man` 명령을 사용하면 직접적인 설명을 볼 수 없다.

다음은 `man cd` 를 입력해 `cd` 명령의 설명을 보려 시도한 결과이다.

![image]( /resource/3B/C635C4-EF04-473E-BB03-A4BDD7D9BDAA/231448919-41b5c919-d457-4126-a19a-6c3e3034c2a3.png )

개요를 읽어보면 셸 매뉴얼 페이지를 읽어보라고 되어 있다.

>
**SYNOPSIS**
>
See the built-in command description in the appropriate shell manual page.
>
해당 셸 매뉴얼 페이지에서 빌트인 명령 설명을 볼 수 있습니다.

빌트인 명령에 대한 설명은 이 안내대로 보면 된다.

즉 다음과 같이 `bash`의 man 페이지로 들어가서 `cd`를 찾아 읽으면 된다.

```
man bash
```

`/cd`로 검색을 한 다음 `n`을 반복해 누르다 보면 `cd`에 대한 설명을 볼 수 있다.

그런데 `cd`나 `fg` 같은 명령은 두 글자 알파벳이기 때문에 찾기까지 오래 걸리는 편인데, 이게 요령이 있다.

이 명령들이 뒤에 argument가 붙는다는 점에 착안해서 다음과 같이 `[`를 함께 검색하면 된다.

- `/cd \[`
- `/fg \[`
- `/fc -`

다음은 `man bash`에서 `/cd \[`로 검색해서 한 번에 `cd`의 설명을 찾은 결과이다.

![image]( /resource/3B/C635C4-EF04-473E-BB03-A4BDD7D9BDAA/231450452-957c90cb-a406-4fb0-b657-3aa7b6e8ca78.png )

### 내가 사용하는 mann 스크립트

나는 `mann` 이라는 이름의 스크립트 파일을 만들어 사용하고 있다.

[github.com/johngrib/dotfiles/mann](https://github.com/johngrib/dotfiles/blob/80c2e4e94527915545e39be9c75387d58734cca4/bin/mann )

```bash
#!/usr/bin/env bash

export LESS='-MIR'; man $1 $2;
```

현재 페이지가 전체의 몇 %인지를 표시해주는 `-M` 옵션은, 막상 [[/cmd/less]]{less}가 열리면 작동하지 않는 것처럼 보이는데,
`G`를 입력해서 마지막 페이지로 한번 이동한 다음부터는 잘 작동한다.


![]( /resource/3B/C635C4-EF04-473E-BB03-A4BDD7D9BDAA/mann-less-open.jpg )

- [[/cmd/less]]{less}가 열린 직후. 왼쪽 아래를 보면 몇 %인지 표시가 없다.

![]( /resource/3B/C635C4-EF04-473E-BB03-A4BDD7D9BDAA/mann-less-g.jpg )

- `G`를 눌러서 마지막 페이지로 이동한 이후부터는 몇 %인지가 표시된다. 위의 스크린샷은 `G`를 입력한 다음 다시 `g`를 입력해 처음 페이지로 돌아온 직후의 모습이다.

## 함께 읽기

### From: 운영체제 아주 쉬운 세 가지 이야기

>
**여담: RTFM - man 페이지를 읽어라**
>
특정 시스템 콜이나 라이브러리 콜을 언급할 때 **매뉴얼 페이지** 또는 간략하게 **man** 페이지를 읽으라는 말을 여러 번 들었을 것이다.
man 페이지는 UNIX 시스템에 존재하는 문서의 원형이다.
이른바 web이라고 불리는 것이 존재하기 전에 만들어졌다는 것을 기억하라.
>
man 페이지를 읽는 것은 시스템 프로그래머로서 성장하는 데 매우 중요한 단계이다.
이 페이지들 속에는 매우 유용한 정보가 셀 수 없이 숨어 있다.
특히, 유용한 페이지는 사용 중인 쉘(예, tesh 또는 bash)의 페이지와 프로그램에서 사용한 시스템 콜에 반환 값이 무엇이고 어떤 에러 조건이 존재하는지 보기 위하여) 관한 페이지다.
>
마지막으로 man 페이지를 읽으면 당황하는 경우를 줄일 수 있다.
`fork()`의 복잡함에 대하여 동료에게 물어보면 "RTFM"이라는 아주 간단한 대답이 돌아올 것이다.
man 페이지를 읽어야 한다는 것을 강조하는 동료들의 점잖은 표현이다.
RTFM의 F는 표현을 더 맛깔나게 한다.
[^three-47]


## 참고문헌

- 운영체제 아주 쉬운 세 가지 이야기 [제2판] / Remzi H. Arpaci-Dusseau, Andrea C. Arpaci-dusseau 공저 / 원유집, 박민규, 이성진 공역 / 홍릉 / 제2판 발행: 2020년 09월 10일 / 원제: Operating Systems: Three Easy Pieces

## 주석

[^three-47]: 운영체제 아주 쉬운 세 가지 이야기. 5.5장. 47쪽.

