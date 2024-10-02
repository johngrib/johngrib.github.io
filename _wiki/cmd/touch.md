---
layout  : wiki
title   : touch
summary : change file access and modification times
date    : 2019-01-13 18:10:46 +0900
updated : 2024-10-02 22:28:22 +0900
tag     : bash command
resource: F0/546F35-303B-466A-83CF-9FB012A9EE68
toc     : true
public  : true
parent  : [[/cmd]]
latex   : false
---
* TOC
{:toc}

## Examples

### 파일 생성/타임스탬프 업데이트

파일이 존재하지 않는다면 생성하고, 이미 존재한다면 마지막 수정 시간을 변경한다.

```sh
touch test.txt
```

### 파일이 존재하는 경우에만 touch 명령어 실행

test.txt 파일이 존재하는 경우 마지막 수정 시간을 변경한다.

```sh
touch -c test.txt
```

### 타임스탬프 업데이트

test.txt 파일 생성시간을 1970년 12월 31일 9시 30분 12초로 지정한다.
(당연히 파일이 없다면 생성한다.)

```sh
touch -t 197012310930.12 test.txt
```


