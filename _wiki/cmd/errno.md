---
layout  : wiki
title   : errno 명령어
summary : UNIX 시스템의 error 번호와 설명을 출력한다
date    : 2024-08-31 16:45:06 +0900
updated : 2024-08-31 16:46:43 +0900
tag     : 
resource: 65/70F2E6-40CF-4198-AA65-77F5DA0D85DE
toc     : true
public  : true
parent  : [[/cmd]]
latex   : false
---
* TOC
{:toc}

## 개요

`errno`는 [[/cmd/moreutils]] 패키지에 포함된 명령이다.

## Examples

```
 # 전체 목록을 본다
errno -l

 # 1번 에러에 대한 설명을 본다
errno 1
```

