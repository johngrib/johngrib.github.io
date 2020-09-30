---
layout  : wiki
title   : man 명령어
summary : 유닉스 메뉴얼 페이지를 찾아보는 명령
date    : 2020-09-30 09:38:35 +0900
updated : 2020-09-30 10:25:48 +0900
tag     : bash command c
toc     : true
public  : true
parent  : [[command-line]]
latex   : false
---
* TOC
{:toc}

## Sections

8개의 섹션이 있으며, 명령에 섹션을 옵션으로 줄 수 있다.

1. User Commands
2. System Calls
3. C Library Functions
4. Devices and Special Files
5. File Formats and Conventions
6. Games et. Al.
7. Miscellanea(기타)
8. System Administration tools and Deamons

## Examples
### 기본적인 사용법

```sh
 # sed 명령 설명서를 본다
man sed
 # 1 섹션의 sed 명령 설명서를 본다
 # (sed는 1 섹션에 있으므로 위의 명령과 같다)
man 1 sed
```

`man`은 뷰어를 따로 설정하지 않으면 [[less-cmd]]를 사용해 설명서를 보여준다. 따라서 [[less-cmd]] 사용법과 설정 등을 알아 두도록 한다.

각 설명서는 섹션이 나뉘어 있다. `sed` 설명서를 보면 최상단에 `SED(1)`이라고 되어 있는데 이는 1번 섹션 설명서를 의미한다.

![]( /post-img/man-cmd/man-sed.jpg )

```sh
 # 1 섹션의 printf 설명서를 본다
man printf
 # 1 섹션의 printf 설명서를 본다
man 1 printf
```

1번 섹션이 기본값이므로 `man printf`와 같이 입력하면 사용자 명령의 `printf` 설명서를 보게 된다.

![]( /post-img/man-cmd/printf-1.jpg )

그러나 C 언어의 `printf` 설명을 보고 싶다면 3번 섹션을 지정해서 조회해야 한다.

```sh
 # 3 섹션의 printf 설명서를 본다
man 3 printf
```

![]( /post-img/man-cmd/printf-3.jpg )

### 검색

```sh
 # perl-compatible 문자열을 apropos로 보여준다
man -k perl-compatible
```

`apropos`는 `whatis` 데이터베이스를 사용하므로 차이점을 알아두도록 한다.

`-` 왼쪽이 설명서 이름과 섹션, `-` 오른쪽이 검색된 라인이다.

![]( /post-img/man-cmd/find-apropos.jpg )

모든 설명서를 대상으로 검색하고 싶다면 `-K` 옵션을 쓴다.

```sh
 # 모든 설명서에서 string 문자열을 찾는다
man -K string
```

이 명령은 매우 느리며, 다음과 같이 검색 결과에 대해 `[ynq]`를 물어본다.

![]( /post-img/man-cmd/find-all.jpg )

- `y`: 문서 열기
- `n`: 다음 문서
- `q`: 검색 종료

