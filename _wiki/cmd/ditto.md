---
layout  : wiki
title   : ditto 명령어
summary : copy directory hierarchies, create and extract archives
date    : 2020-03-08 19:19:29 +0900
updated : 2022-02-14 22:34:01 +0900
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
