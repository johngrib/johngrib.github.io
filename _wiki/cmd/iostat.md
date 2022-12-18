---
layout  : wiki
title   : iostat
summary : 
date    : 2022-12-18 09:46:13 +0900
updated : 2022-12-18 11:34:07 +0900
tag     : bash command
resource: D2/216900-1427-40AB-B56A-5BFEC1F56CB9
toc     : true
public  : true
parent  : [[/cmd]]
latex   : false
---
* TOC
{:toc}

## ubuntu

>
iostat - Report Central Processing Unit (CPU) statistics and input/output statistics for devices and partitions.

CPU 통계와 장치 및 파티션의 i/o 통계를 보여준다.

`iostat`은 sysstat 패키지에 포함되어 있다. `iostat` 명령이 설치되어 있지 않다면 sysstat 패키지를 설치하면 된다.

```bash
 # 설치 가능한 패키지 목록 업데이트
apt-get update
 # sysstat 패키지 설치
apt-get install sysstat
```

다음과 같이 사용한다.

```bash
 # CPU 통계 보기
iostat -c

 # Device 통계 보기
iostat -d
```

## macOS

>
iostat – report I/O statistics

`iostat`은 macOS에 기본으로 설치되어 있다.

```bash
 # CPU, disk 통계 보기
iostat
 # 이렇게 해도 똑같다
iostat -C

 # 1초 주기로 3회 출력. 즉 3초 후 종료된다.
iostat -c 3

 # 통계를 3초 주기로 계속해서 본다
iostat -w 3

 # 0번 disk, 2번 dist 통계를 1초 주기로 계속해서 본다
iostat -w 1 disk0 disk2
```

## 참고문헌

- [iostat(1) — Linux manual page (man7.org)]( https://man7.org/linux/man-pages/man1/iostat.1.html )

