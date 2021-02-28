---
layout  : wiki
title   : ioreg 명령어
summary : show I/O Kit registry (BSD)
date    : 2021-02-28 11:17:46 +0900
updated : 2021-02-28 11:19:29 +0900
tag     : command bsd mac
toc     : true
public  : true
parent  : [[command-line]]
latex   : false
---
* TOC
{:toc}

## Examples

```sh
 # MacOS에 연결한 트랙패드, 매직 마우스 등의 배터리 잔량을 볼 수 있다.
ioreg -r -d 1 -k BatteryPercent | grep BatteryPercent | tr -d ' '
```
