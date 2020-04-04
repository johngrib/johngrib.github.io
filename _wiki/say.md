---
layout  : wiki
title   : say 명령어
summary : macOS에서 음성으로 문자열을 읽게 한다
date    : 2019-11-13 21:57:34 +0900
updated : 2019-11-13 22:36:32 +0900
tag     : command
toc     : true
public  : true
parent  : [[command-line]]
latex   : false
---
* TOC
{:toc}

## Examples - macOS

### 말하기 명령
```sh
$ say 'Hello'
```

### 목소리 선택
```sh
$ say -v Alex 'Hello'
$ say -v Yuna '안녕하세요'
```

### 선택 가능한 목소리 목록 보기
```sh
$ say -v '?'
```

### 강조
```sh
$ say -v Yuna '노래방 기계처럼 말하는 단어가 강조된다' --interactive
```

### 대본 파일 지정
```sh
$ say -v Yuna -f test.txt
```

### 사운드 파일로 저장하기

* aac 형식은 data format을 지정하지 않아도 잘 저장된다.
* m4a, caf는 data-format을 지정하지 않으면 실패하는 것 같다.

```sh
$ say -o who.aac 'Hello, World'
$ say -o who.m4a --data-format=alac Hello, World.
$ say -o who.caf --data-format=LEF32@8000 Hello, World
$ say -o who.aac '누가 기침소리를 내었는가?' -v Yuna
```

## Ubuntu

[Ubuntu에는 espeak 라는 명령이 있다고 한다.](https://superuser.com/questions/93691/mac-os-x-say-command-in-ubuntu )

