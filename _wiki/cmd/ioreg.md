---
layout  : wiki
title   : ioreg 명령어
summary : show I/O Kit registry (BSD)
date    : 2021-02-28 11:17:46 +0900
updated : 2024-02-18 23:14:15 +0900
tag     : command bsd mac
resource: C0/608FA2-EA76-4F9B-B351-A42CD4926B81
toc     : true
public  : true
parent  : [[/cmd]]
latex   : false
---
* TOC
{:toc}

## ioreg?

macOS에서 IO Kit registry 상태를 보여준다.

## Examples

```sh
 # MacOS에 연결한 트랙패드, 매직 마우스 등의 배터리 잔량을 볼 수 있다.
ioreg -r -d 1 -k BatteryPercent | grep BatteryPercent | tr -d ' '
```

## 함께 읽기

- [[/cmd/grep]]
- [The I/O Registry (developer.apple.com)](https://developer.apple.com/library/archive/documentation/DeviceDrivers/Conceptual/IOKitFundamentals/TheRegistry/TheRegistry.html )

