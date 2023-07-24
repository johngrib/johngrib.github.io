---
layout  : wiki
title   : kill
summary : terminate or signal a process
date    : 2023-05-07 00:00:38 +0900
updated : 2023-07-24 22:44:46 +0900
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

### signal 목록 확인

kill을 섬세하게 사용하려면 [[/study/os/signal]]에 대해 잘 알아둬야 한다.

```bash
man signal
```

또는 다음과 같이 `kill` 명령에 `-l` 옵션을 사용하면 된다.

```bash
$ kill -l
 1) SIGHUP	 2) SIGINT	 3) SIGQUIT	 4) SIGILL
 5) SIGTRAP	 6) SIGABRT	 7) SIGEMT	 8) SIGFPE
 9) SIGKILL	10) SIGBUS	11) SIGSEGV	12) SIGSYS
13) SIGPIPE	14) SIGALRM	15) SIGTERM	16) SIGURG
17) SIGSTOP	18) SIGTSTP	19) SIGCONT	20) SIGCHLD
21) SIGTTIN	22) SIGTTOU	23) SIGIO	24) SIGXCPU
25) SIGXFSZ	26) SIGVTALRM	27) SIGPROF	28) SIGWINCH
29) SIGINFO	30) SIGUSR1	31) SIGUSR2
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

### 응용: [[/cmd/lsof]]

```bash
 # 3000번 포트를 사용하는 프로세스를 찾아서 종료
lsof -i tcp:3000 | xargs kill
```

## PID 0, 1

>
시스템에는 특별한 프로세스들이 존재하나, 그 세부사항은 구현마다 다르다.
일반적으로 프로세스 ID `0`은 흔히 스와퍼(swapper)라고 부르는 스케줄러 프로세스에 배정된다.
이 프로세스는 디스크상의 구체적인 프로그램 파일과는 대응되지 않는다.
이 프로세스는 커널의 일부인 시스템 프로세스이다.
프로세스 ID `1`은 일반적으로 init 프로세스인데, 이 프로세스는 시스템 시동 과정의 끝에서 커널이 실행한다.
이 프로세스에 해당하는 프로그램은 예전 버전의 UNIX 시스템에서는 `/etc/init`이었으나 더 최신 버전에서는 `/sbin/init`이다.
이 프로세스는 커널이 시동된 후 유닉스 시스템을 띄우는 임무를 맡는다.
보통의 경우 `init`은 시스템 의존적 초기화 파일들, 즉 `/etc/rc*` 파일들과 `/etc/inittab` 파일, 그리고 `/etc/init.d`에 있는 파일들을 읽어 들이고 시스템을 특정 상태, 이를테면 다중 사용자 상태로 만든다.
`init` 프로세스는 결코 죽지 않는다.
비록 슈퍼사용자 특권으로 실행되긴 하지만, 스와퍼 프로세스와는 달리 이 프로세스는 커널 안의 시스템 프로세스가 아니라 보통의 사용자 프로세스이다.
이번 장에서 이 init 프로세스가 임의의 고아 프로 세스의 부모 프로세스가 되는 방식을 살펴볼 것이다.
>
(중략)
>
각각의 UNIX 시스템 구현에는 운영체제 서비스들을 제공하는 고유한 커널 프로세스들이 있다.
예를 들어 UNIX 시스템의 일부 가상 메모리 구현들에서 프로세스 ID `2`는 `pagedaemon`이다.
이 프로세스는 가상 메모리 시스템의 페이징을 지원하는 역할을 담당한다.
[^richard-282]

## 함께 읽기

- [[/study/os/signal]]

## 참고문헌

- UNIX 고급 프로그래밍 [제3판] / 리처드 스티븐스, 스티븐 레이고 공저 / 류광 역 / 퍼스트북 / 인쇄일: 2014년 08월 28일 / 원제: Advanced Programming in the UNIX Environment

## 주석

[^richard-282]: UNIX 고급 프로그래밍. 8.2장. 282쪽.

