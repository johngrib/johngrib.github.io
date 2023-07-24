---
layout  : wiki
title   : killall
summary : kill processes by name
date    : 2023-07-24 23:09:06 +0900
updated : 2023-07-24 23:14:50 +0900
tag     : 
resource: 8A/7A7F4E-AD11-47DE-A3D7-714A5157E3EF
toc     : true
public  : true
parent  : [[/cmd]]
latex   : false
---
* TOC
{:toc}

## Examples

```bash
 # 모든 firefox 프로세스들에 SIGTERM을 보낸다.
killall firefox

 # USER에게 속한 모든 firefox 프로세스들에 SIGTERM을 보낸다.
killall -u ${USER} firefox


 # 모든 firefox 프로세스들을 중지한다.
killall -SIGSTOP firefox

 # 모든 firefox 프로세스들을 재개한다.
killall -SIGCONT firefox

 # 패턴에 일치하는 모든 프로세스들에게 SIGTERM을 보낸다.
killall -m 'vim*'
```

시그널을 생략했을 때 실제로 어떤 시그널을 보내는지가 궁금하다면 `-s` 옵션으로 dry run을 해볼 수 있다.

```bash
 # firefox 프로세스들에게 무엇을 할 것인지 보여주지만, 실제로는 시그널을 보내지 않는다.
killall -s firefox
```

예를 들어 MacOS에서 `-s Finder`를 실행하면 다음과 같은 출력을 볼 수 있다.

```bash
$ killall -s Finder
kill -term 498
```

## 함께 읽기

- [[/cmd/kill]]
- [[/study/os/signal]]

