---
layout  : wiki
title   : lsof 명령어
summary : list open files
date    : 2019-09-10 21:52:01 +0900
updated : 2019-09-10 21:53:57 +0900
tag     : bash command
resource: BB/1BB21D-F984-4C9C-A7B8-53F804ED06C4
toc     : true
public  : true
parent  : [[cmd]]
latex   : false
---
* TOC
{:toc}

## Examples
### 특정 포트에서 실행중인 pid 알아내기

```sh
$ lsof -i tcp:8080  # 8080 포트를 사용하고 있는 프로세스 검색
```
