---
layout  : wiki
title   : macOS의 기본 스크린샷 기능
summary : 
date    : 2020-06-01 21:49:38 +0900
updated : 2023-09-06 20:51:28 +0900
tag     : mac
resource: AF/775D83-E350-4540-B27A-FFE12B134AD4
toc     : true
public  : true
parent  : [[/mac]]
latex   : false
---
* TOC
{:toc}

## 스크린샷 파일 확장자를 png에서 jpg로 바꾸는 방법

터미널에서 다음 명령을 입력하면 된다.

```sh
defaults write com.apple.screencapture type jpg
killall SystemUIServer
```

만약 다른 포맷으로 설정하고 싶다면 마지막의 `jpg`만 바꿔주면 된다.

```sh
 # gif 로 설정
defaults write com.apple.screencapture type gif
killall SystemUIServer

 # pdf 로 설정
defaults write com.apple.screencapture type PDF
killall SystemUIServer
```

## 스크린샷 파일 이름 포맷을 변경하는 방법

한국어를 시스템 언어로 사용하고 있을 때 기본 스크린샷 파일 이름 포맷은 `스크린샷 2023-04-02 오후 11.07.22.png`과 같은 형식이다.

그런데 이름이 `스크린샷`으로 시작하면 터미널에서 다루기 짜증난다.

그래서 나는 다음과 같이 영어로 바꿔주었다.

```bash
defaults write com.apple.screencapture name "screenshot"
killall SystemUIServer
```

그러면 그 이후부터 생성하는 스크린샷 파일은 앞부분이 영어로 바뀐다(뒤의 `오후`는 그대로).

> `screenshot 2023-09-06 오후 11.07.22.png`

파일 이름의 시간 포맷의 `오전`, `오후`를 제거하고 싶다면 다음과 같이 한다.

`System Preferences` - `일반` - `날짜 및 시간` - `24시간제`를 `On` 으로 설정한다.

이후에 생성하는 스크린샷 파일부터는 다음과 같이 `오후`가 사라진다.

> `screenshot 2023-09-06 23.07.22.png`

만약 파일 이름에 시간 정보를 넣고 싶지 않다면 다음과 같이 한다.

```bash
defaults write com.apple.screencapture include-date -bool false
killall SystemUIServer
```

이후부터 생성하는 스크린샷 파일 이름은 다음과 같이 된다.

> `screenshot.png`  
`screenshot 1.png`  
`screenshot 2.png`

파일 이름에 다시 시간 정보를 넣고 싶다면 `include-date`를 `true`로 바꿔주면 된다.

```bash
defaults write com.apple.screencapture include-date -bool true
killall SystemUIServer
```

## Links

- [How to Change the Screenshot File Format on Your Mac]( https://www.maketecheasier.com/change-screenshot-file-format-mac/ )

