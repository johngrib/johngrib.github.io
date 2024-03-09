---
layout  : wiki
title   : say 명령어
summary : macOS에서 음성으로 문자열을 읽게 한다
date    : 2019-11-13 21:57:34 +0900
updated : 2024-03-09 22:38:36 +0900
tag     : command
resource: BA/AE113B-02A3-465E-B6C9-CC407B634DFE
toc     : true
public  : true
parent  : [[/cmd]]
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

## 응용

### 명령 종료 알림 {#command-end-notification}

오래 걸리는 명령을 실행시켜 놓고 끝나면 알림을 받고 싶을 때 사용할 수 있다. 다음과 같이 실행해 놓고 다른 일을 하면 된다.

```sh
$ sleep 3 ; say "오래 걸리는 명령이 끝났습니다."
```

`say`를 사용하는 방법은 아니지만 소리가 아니라 시각적인 알림이 필요하다면 `osascript`를 쓰는 방법도 고려할 수 있다. 모니터 오른쪽 위에 알림이 뜬다.

```sh
$ sleep 3 && osascript -e 'display notification "오래 걸리는 명령이 끝났습니다."'
```

굳이 알림에 타이틀을 붙이고 싶다면 다음과 같이 한다.

```sh
$ sleep 3 && osascript -e 'display notification "오래 걸리는 명령이 끝났습니다." with title "터미널 알림"'
```

