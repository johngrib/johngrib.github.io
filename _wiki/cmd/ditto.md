---
layout  : wiki
title   : ditto 명령어
summary : BSD의 디렉토리 병합 복사, 압축/압축해제 명령
date    : 2020-03-08 19:19:29 +0900
updated : 2022-02-14 22:32:45 +0900
tag     : bash command
toc     : true
public  : true
parent  : [[/cmd]]
latex   : false
---
* TOC
{:toc}

## Examples

```bash
 # 압축 해제
ditto -V -x -k --sequesterRsrc --rsrc test.zip ./unzip-directory
```
