---
layout  : wiki
title   : vidir 명령어
summary : 파일/디렉토리 이름을 vi에서 편집하자
date    : 2024-08-31 14:21:00 +0900
updated : 2024-08-31 15:37:06 +0900
tag     : 
resource: 2D/B54779-A000-4A19-88AD-E98A0E601009
toc     : true
public  : true
parent  : [[/cmd]]
latex   : false
---
* TOC
{:toc}

## 개요

`vidir`은 [[/cmd/moreutils]] 패키지에 포함된 명령이다.

## Examples

```
vidir *.jpeg
find -type f | vidir -
```

위의 예제와 같이 파일명을 args로 제공해도 되고, stdin으로 받아도 된다.

다음과 같은 디렉토리가 있다고 가정하자.

```
$ tree .
.
├── directory
│   └── file.txt
└── file0.txt

2 directories, 2 files
```

이 때 다음과 같이 명령을 입력하면

```
find . | vidir -
```

vim이 실행되고 다음과 같은 화면이 나타난다.

```
0001	./file0.txt
0002	./directory
0003	./directory/file.txt
```

왼쪽은 파일의 순서를 나타내고, 오른쪽은 파일명을 나타낸다.

파일명을 수정하고 저장하면 파일명이 변경된다.

`dd`를 사용해서 행을 삭제하면 파일도 삭제된다.

