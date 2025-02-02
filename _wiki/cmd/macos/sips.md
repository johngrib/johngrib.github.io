---
layout  : wiki
title   : sips 명령어
summary : macOS 전용 이미지 처리 명령어
date    : 2025-02-01 23:11:46 +0900
updated : 2025-02-02 22:07:26 +0900
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

```bash
sips -r 180 *.png
```

- 현재 디렉토리의 모든 `png` 이미지를 180도 회전시킨다.
- 이와 같이 `sips` 명령은 대상 파일을 여러개 지정할 수 있으므로 잘 써먹을 것.

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
```

- `-g all`: 모든 속성 출력
    - `pixelWidth`: 이미지의 가로 크기
    - `pixelHeight`: 이미지의 세로 크기
    - `dpi`: 해상도

```
$ sips -g pixelWidth IMG_3464.heic
/Users/johngrib/Desktop/IMG_3464.heic
  pixelWidth: 2701

$ sips -g creation IMG_3464.heic
/Users/johngrib/Desktop/IMG_3464.heic
  creation: 2024:11:28 22:51:20

$ sips -g pixelWidth -g hasAlpha IMG_3464.heic
/Users/johngrib/Desktop/IMG_3464.heic
  pixelWidth: 2701
  hasAlpha: no
```

- `-g 속성이름`: 속성 하나 출력
- `-g 속성이름1 -g 속성이름2 ...`: 속성 여러개 출력

### 이미지 크기 조절

```bash
sips -z 2000 3000 img3464.heic --out result.heic
```

- `-z 2000 3000`: 이미지 크기를 height 2000 픽셀, width 3000 픽셀로 조절한다.
    - 이미지가 찌그러질 수 있으므로 주의.
    - (이미지가 잘리거나 여백이 추가되는 방식이 아님)
- `--out result.heic`: 결과를 `result.heic` 파일로 저장한다.

```bash
sips -z 2000 3000 img3464.heic
```

- `--out`을 지정하지 않았으므로 원본 파일을 덮어쓴다. 주의할 것.

```bash
sips -Z 1000 img3464.heic --out result.heic
```

- `-Z 1000`: 이미지의 가로, 세로 중 큰 쪽을 1000 픽셀로 조절한다.
    - 비율이 유지되므로 이미지가 찌그러지지 않는다.
    - 즉, 숫자를 크게 주면 이미지가 확대되고, 작게 주면 이미지가 축소된다.

