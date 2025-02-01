---
layout  : wiki
title   : sips 명령어
summary : macOS 전용 이미지 처리 명령어
date    : 2025-02-01 23:11:46 +0900
updated : 2025-02-01 23:25:48 +0900
tag     : 
resource: DB/E72988-BD0D-4C08-92C5-E5F8287131C7
toc     : true
public  : true
parent  : [[/cmd/macos]]
latex   : false
---
* TOC
{:toc}

## Examples

### 포맷 변경

```bash
sips -s format jpeg ./image.heic --out ./image.jpg
```

- `image.heic` 이미지를 `image.jpg`로 변환한다.
- 아이폰에서 사진을 찍으면 `heic` 형식으로 저장되는데, 이를 `jpeg`로 변환하는 간단한 방법이라 할 수 있다.

```bash
sips -s format png ./image.heic --out ./image.png
```

- `image.heic` 이미지를 `image.png`로 변환한다.


### 이미지 회전

```bash
sips -r 90 aa.png
```

- `aa.png` 이미지를 90도 회전시킨다.

```bash
sips -r -90 aa.png
```

- `aa.png` 이미지를 -90도 회전시킨다.

### 이미지 속성 보기

```
$ sips -g all IMG_3464.heic
/Users/johngrib/Desktop/IMG_3464.heic
  pixelWidth: 2701
  pixelHeight: 3850
  typeIdentifier: public.heic
  format: heic
  formatOptions: default
  dpiWidth: 72.000
  dpiHeight: 72.000
  samplesPerPixel: 3
  bitsPerSample: 8
  hasAlpha: no
  space: RGB
  profile: Display P3
  creation: 2024:11:28 22:51:20
  make: Apple
  model: iPhone 13 mini
  software: 18.1.1

$ sips -g pixelWidth IMG_3464.heic
/Users/johngrib/Desktop/IMG_3464.heic
  pixelWidth: 2701

$ sips -g creation IMG_3464.heic
/Users/johngrib/Desktop/IMG_3464.heic
  creation: 2024:11:28 22:51:20
```

