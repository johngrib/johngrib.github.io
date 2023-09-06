---
layout  : wiki
title   : ffmpeg 명령어
summary : 동영상 파일 변환기
date    : 2023-09-06 19:58:07 +0900
updated : 2023-09-06 20:21:43 +0900
tag     : 
resource: D3/6D44C5-07AB-4AFD-A854-57F87EC733A8
toc     : true
public  : true
parent  : [[/cmd]]
latex   : false
---
* TOC
{:toc}

## Installation

```bash
brew install ffmpeg
```

## Examples

```bash
 # mov 파일을 mp4로 변환한다
ffmpeg -i input.mov output.mp4

 # mov 파일을 gif로 변환한다
ffmpeg -i test.mov -pix_fmt rgb24 output.gif
```

```bash
 # mov 파일을 gif로 변환한다.
ffmpeg -ss 00:00:05.000 -i test.mov -pix_fmt rgb24 -r 10 -s 320x240 -t 00:00:08.000 output.gif
```

- `-ss 00:00:05.000`: 시작 시간을 `00:00:05.000` 부터로 설정한다.
- `-r 10` : 초당 프레임 수를 10으로 설정한다.
- `-s 320x240` : 프레임 사이즈 해상도를 320x240으로 설정한다.
    - 이 값을 지정하지 않으면 자동으로 원본의 해상도로 설정된다.
- `-t 00:00:08.000` : time duration. 8초까지만 변환한다.
    - `-ss 00:00:05.000`와 함께 사용하면 5초부터 13초까지 변환한다.
    - 절대지점을 지정하려면 `-to`를 써서 `-to 00:00:13.000` 처럼 설정.

## Links

- [ffmpeg.org]( https://www.ffmpeg.org/ )

