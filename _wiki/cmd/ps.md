---
layout  : wiki
title   : ps 명령어
summary : process status를 보여준다
date    : 2024-10-03 22:48:44 +0900
updated : 2024-10-03 22:52:24 +0900
tag     : 
resource: 08/7FF296-DEF9-4185-80AC-990A1952205F
toc     : true
public  : true
parent  : [[/cmd]]
latex   : false
---
* TOC
{:toc}

## macOS

```bash
ps
```

- 현재 셸의 프로세스 목록 출력

### options

```bash
ps -e
```

- `-e` : 모든 프로세스 목록 출력


```bash
ps -ef
```

- `-e` : 모든 프로세스 목록 출력
- `-f` : 자세한 내용 추가로 출력
    - uid, pid, parent pid, recent CPU usage, process start time, controlling tty, elapsed CPU usage, associated command.
