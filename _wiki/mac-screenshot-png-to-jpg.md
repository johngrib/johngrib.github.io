---
layout  : wiki
title   : macOS의 기본 스크린샷 저장 포맷을 png에서 jpg로 바꾸는 방법
summary : 
date    : 2020-06-01 21:49:38 +0900
updated : 2020-06-01 21:54:35 +0900
tag     : macos
toc     : true
public  : true
parent  : [[macos]]
latex   : false
---
* TOC
{:toc}

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

## Links

- [How to Change the Screenshot File Format on Your Mac]( https://www.maketecheasier.com/change-screenshot-file-format-mac/ )
