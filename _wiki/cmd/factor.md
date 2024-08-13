---
layout  : wiki
title   : factor 명령어
summary : 소인수 분해 결과를 출력한다
date    : 2023-08-14 21:57:02 +0900
updated : 2024-08-13 22:54:44 +0900
tag     : 
resource: EB/16CBA4-23B0-4E83-94D7-69F237C7A4A2
toc     : true
public  : true
parent  : [[/cmd]]
latex   : false
---
* TOC
{:toc}

## 설치

`factor`는 [[/cmd/gnu-coreutils]]의 일부이다. 사용하려면 다음과 같이 설치해 주도록 한다.

```bash
brew install coreutils
```

## Examples

```bash
$ # 12050의 소인수 분해 결과를 출력한다
$ factor 12050
12050: 2 5 5 241

$ # 12, 34, 62의 소인수 분해 결과를 출력한다
$ factor 12 34 62
12: 2 2 3
34: 2 17
62: 2 31
```

## -h : 거듭제곱 표현

`-h` 옵션을 사용하면 거듭제곱 표현으로 출력한다.

```
$ factor 1024
1024: 2 2 2 2 2 2 2 2 2 2

$ factor -h 1024
1024: 2^10
```

