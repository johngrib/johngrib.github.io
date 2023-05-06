---
layout  : wiki
title   : kill
summary : terminate or signal a process
date    : 2023-05-07 00:00:38 +0900
updated : 2023-05-07 00:20:47 +0900
tag     : 
resource: 90/72958A-66BE-4D3B-87B5-27B03E66207F
toc     : true
public  : true
parent  : [[/cmd]]
latex   : false
---
* TOC
{:toc}

## man

### SYNOPSIS

```
kill [-s signal_name] pid ...
kill -l [exit_status]
kill -signal_name pid ...
kill -signal_number pid ...
```

## Examples

### 기본

- `-s` 옵션을 생략하면 시그널 기본값으로 `SIGTERM`(15)을 보낸다.
- `SIGTERM`(15)은 프로세스에게 종료 요청을 보내는 시그널이며, 프로세스가 이를 받아들이면 정상 종료를 한다.

```bash
 # PID가 142, 157인 프로세스에 SIGTERM 시그널을 보낸다(종료 요청)
kill 142 157

 # PID가 142인 프로세스에 SIGTERM 시그널을 보낸다(종료 요청)
kill 142
```

위의 명령은 다음과 똑같다.

```bash
kill -s TERM 142 157
```

### signal 숫자 값 사용

```
1   HUP (hang up)
2   INT (interrupt)
3   QUIT (quit)
6   ABRT (abort)
9   KILL (non-catchable, non-ignorable kill)
14  ALRM (alarm clock)
15  TERM (software termination signal)
```

`SIGTERM`(15)을 보냈는데도 프로세스가 반응을 하지 않는다면, `SIGKILL`(9)을 보내서 강제 종료를 시도할 수 있다.

```bash
 # PID가 142인 프로세스에 SIGKILL 시그널을 보낸다(강제 종료)
kill -9 142
kill -s KILL 142
```

`-s signal_name` 옵션을 사용하면 시그널 이름을 지정할 수 있다.

```bash
 # PID가 142, 157인 프로세스에 hangup signal(SIGHUP)을 보낸다
kill -s HUP 142 157
```

### 프로세스 그룹 종료

```bash
 # PID가 117인 프로세스 그룹을 종료
kill -- -117
```

### 응용: pgrep

다음은 `pgrep`으로 firefox 프로세스를 찾아서 종료하는 예제이다.

```bash
$ pgrep firefox
70341

$ kill -s TERM 70341
```

### 응용: [[/lsof]]

```bash
 # 3000번 포트를 사용하는 프로세스를 찾아서 종료
lsof -i tcp:3000 | xargs kill
```

