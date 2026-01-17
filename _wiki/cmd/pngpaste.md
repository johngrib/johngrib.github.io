---
layout  : wiki
title   : pngpaste
summary : 클립보드의 이미지를 파일로 출력할 수 있다
date    : 2026-01-17 19:53:45 +0900
updated : 2026-01-17 19:58:06 +0900
tag     : 
resource: A5/B08BF7-4835-49B9-B13B-CD9969FD0C5F
toc     : true
public  : true
parent  : [[/cmd]]
latex   : false
---
* TOC
{:toc}

- <https://github.com/jcsalterego/pngpaste >
- <https://formulae.brew.sh/formula/pngpaste >

MacOS 에서 `command + shift + control + 4`로 스크린샷을 찍으면 클립보드로 들어가는데, 파일로 저장하려면 좀 귀찮은 면이 있다.

이 명령을 사용하면 클립보드의 이미지를 파일로 저장할 수 있다.

## 사용법

```bash
 # 클립보드 이미지를 image.png 파일로 저장한다
pngpaste image.png

 # 클립보드 이미지 데이터를 터미널에 출력한다. binary가 출력되므로 주의.
pngpaste -

 # - 출력 형식을 base64로 한다
pngpaste -b
```

