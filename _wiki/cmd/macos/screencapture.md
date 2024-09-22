---
layout  : wiki
title   : screencapture 명령어
summary : 
date    : 2024-09-22 12:12:11 +0900
updated : 2024-09-22 12:42:22 +0900
tag     : 
resource: 0C/4BF978-C01C-4600-A4CE-6A89451169DA
toc     : true
public  : true
parent  : [[/cmd/macos]]
latex   : false
---
* TOC
{:toc}

## 기본 사용법 {#basic}

```bash
screencapture test.png
```

- 스크린샷을 찍고, `test.png` 파일로 저장한다.
- 파일의 확장자로 이미지 포맷을 지정할 수 있다.

## 옵션 {#options}

여기에서 소개하는 것 외에 매우 다양한 옵션이 있으니, 자신의 필요에 맞는 옵션이 필요하다면 설명서를 참고할 것.

```bash
man screencapture
```

### -c : 클립보드에 복사 {#option-c}

```bash
screencapture -c
```

- `-c` : 스크린샷을 찍고, 클립보드에 복사한다.
    - 주의: `-c` 옵션을 사용하면 파일명을 지정해도 무시한다.

### 캡처영역 선택 옵션
#### -i : 영역 선택 {#option-i}

```bash
screencapture -i test.jpg
```

- `-i` : 명령 실행 후, 마우스로 스크린샷 영역을 선택할 수 있다.
- 결과는 `test.jpg` 파일로 저장된다.

#### -w : 윈도우 선택 {#option-w}

```bash
screencapture -w time.jpeg
```

- `-w` : 명령 실행 후, 스크린샷을 찍을 윈도우를 1개 선택할 수 있다.

### -C : 마우스 포인터 포함 {#option-C}

```bash
screencapture -C test.jpg
```

- `-C` : 마우스 포인터도 함께 캡쳐한다.

### -T : 타이머 {#option-T}

```bash
screencapture -T 5 time.jpeg
```

- `-T 5` : 5초 후에 스크린샷을 찍는다.

만약 `-T` 옵션이 생각이 안 난다면 다음과 같이 해도 된다.

```bash
sleep 5; screencapture time5.tiff
```

## 응용

### 2초 간격으로 스크린샷 찍기

다음 스크립트를 사용하면 60장의 스크린샷을 2초 간격으로 찍을 수 있다.

60장을 찍으므로 120초가 지나면 종료된다.

```bash
screen_capture_max_count=60
count=0

while [ $count -lt $screen_capture_max_count ]; do
    screencapture -T 2 screenshot_${count}.png
    count=$(( count + 1 ))
done
```

위의 스크립트는 Dave Taylor의 Wicked Cool Shell Scripts에 수록된 예제를 참고해 조금 수정한 것이다.[^wicked-298]
(원본 예제는 1시간 동안 60초마다 스크린샷을 찍게 하는 내용이며, `-T 2` 옵션을 사용하지 않고 `sleep` 명령어를 사용해 딜레이를 준다.)

Dave Taylor는 이 예제의 원본 예제를 소개하면서 다음과 같은 재미있는 아이디어를 제안한다.

>
위의 스크립트는 1시간 동안 60초마다 화면을 캡처한 후,
60개의 약간 크기가 큰(각각이 1.5MB가 넘는) TIFF 파일들(capture1.tiff, capture2.tiff, ... capture60.tiff)을 생성할 것이다.
이러한 기능은 컴퓨터를 사용해 다른 사람을 교육시킬 때 매우 유용할 것이다.
또 점심시간에 자리를 비운 사이 다른 누군가 컴퓨터를 사용하고 있다는 의심이 들 때에도 사용할 수 있다.
이 기능을 설치해두면, 나중에 자리에 돌아와서 본인이 없는 동안에 무슨 일이 있었는지 아무도 모르게 살펴볼 수 있다.[^wicked-299]


## 참고문헌

- 셸 스크립트 - 101가지 예제로 정복하는 / Dave Taylor 저 / 여인춘 역 / 에이콘출판사 / 발행: 2005년 09월 26일 / 원제: Wicked Cool Shell Scripts

## 주석

[^wicked-298]: 셸 스크립트 - 101가지 예제로 정복하는. 11장. 298쪽.
[^wicked-299]: 셸 스크립트 - 101가지 예제로 정복하는. 11장. 299쪽.

