---
layout  : wiki
title   : kill
summary : terminate or signal a process
date    : 2023-05-07 00:00:38 +0900
updated : 2024-03-03 13:07:05 +0900
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

## 시그널

### signal 목록 확인 {#signal-list}

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

### 주요 시그널에 대해 {#signal-table}

> <div id="signal_table"></div>
[^command-line-book-117]

- th
    - 번호
    - 이름
    - 의미
- td
    - `1`
    - `HUP`
    - Hang up. 이는 전화선과 모뎀으로 원격 컴퓨터에 연결하는 터미널을 사용하던 그리운 옛날의 흔적이다. 이 시그널은 제어 터미널과 "연결이 끊어진" 프로그램을 가리키는 데 사용된다. 이 시그널은 터미널 세션 종료에 의해 나타난다. 터미널에서 실행 중인 포그라운드 프로그램은 이 시그널을 받으면 종료될 것이다.<br/> 또한 재초기화를 위해 많은 데몬 프로그램에서 사용된다. 이는 데몬이 이 시그널을 받으면 재시작하고 환경설정 파일을 다시 읽어 들이게 된다는 것을 의미한다. Apache 웹 서버가 HUP 시그널을 이 방식으로 사용하는 데몬의 한 예다.
- td
    - `2`
    - `INT`
    - Interrupt. 터미널에서 CTRL-C 키를 보낸 것과 동일한 기능을 한다. 프로그램을 항상 종료할 것이다.
- td
    - `9`
    - `KILL`
    - Kill. 이 시그널은 조금 특별하다. 프로그램은 자신에게 보내진 시그널들을 모두 무시하거나 다른 방식으로 조작하는 것을 선택할지 모른다. KILL  시그널은 실제로 해당 프로그램에 보내지지 않는다. 오히려 커널이 즉시 프로세스를 종료한다. 이런 식으로 프로세스가 강제 종료되면 스스로 정리하거나 진행 중인 작업을 저장할 기회가 없다. 이런 이유로 KILL 시그널은 다른 종료 시그널이 실패한 경우에 마지막 수단으로 사용되어야 한다.
- td
    - `15`
    - `TERM`
    - Terminate. 이것은 kill 명령어가 보내는 기본 신호다. 이 신호를 보냈을 때 만약 프로그램이 여전히 시그널을 받을 수 있을 정도로 "살아있다면" 프로그램은 종료될 것이다.
- td
    - `18`
    - `CONT`
    - Continue. STOP 시그널로 정지된 프로세스를 복원한다.
- td
    - `19`
    - `STOP`
    - Stop. 이 시그널은 프로세스를 종료 없이 일시 정지시킨다. KILL 시그널과 같이 해당 프로세스에 직접 보내지 않는다. 따라서 이 시그널을 무시할 수는 없다.
{:class="table-generate" data-target-id="signal_table"}

> <div id="signal_table2"></div>
[^command-line-book-118]

- th
    - 번호
    - 이름
    - 의미
- td
    - `3`
    - `QUIT`
    - Quit. (*역자주: 사용자가 종료 키(CTRL+\\)를 입력하면 커널이 프로세스에 SIGQUIT 시그널을 보낸다.)
- td
    - `11`
    - `SEGV`
    - Segmentation violation. 이 시그널은 프로그램이 잘못된 메모리 사용이 이뤄질 때 보내진다. 즉 허용하지 않은 영역에 쓰기를 시도했다는 것이다.
- td
    - `20`
    - `TSTP`
    - Terminal Stop. 이 시그널은 CTRL-Z 를 눌렀을 때 터미널에 의해 보내진다. STOP 시그널과 달리, TSTP 시그널은 프로그램에 의해 받게 된다. 하지만 프로그램은 이를 무시하도록 지정되어 있을 수도 있다.
- td
    - `28`
    - `WINCH`
    - Window change. 이 시그널은 윈도우 크기가 변경된 경우에 시스템에 의해 보내진다. [[/cmd/top]]{top}과 [[/cmd/less]]{less}와 같은 프로그램들은 이 시그널을 받으면 새로운 윈도우 크기에 맞게 다시 그려질 것이다.
{:class="table-generate" data-target-id="signal_table2"}

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

### 응용: [[/cmd/lsof]]

```bash
 # 3000번 포트를 사용하는 프로세스를 찾아서 종료
lsof -i tcp:3000 | xargs kill
```

### kill -9 에 대하여 {#kill-9}

>
시그널 번호가 생략되면 `TERM` 시그널은 캐치, 차단, 무시될 수 있기 때문에 타깃 프로세스가 죽는 것이 보장되지 않는다.
다음 명령을 사용하면 시그널 9(`KILL`)는 캐치할 수 없기 때문에 프로세스의 죽음이 보장된다.
>
> ```bash
> $ kill -9 pid
> ```
>
정중한 요청이 실패할 경우에만 `kill -9`를 사용하는 게 좋다.
가끔 프로세스가 꼼짝하지 않는 상태가 돼 `KILL` 조차도 영향력을 행사할 수 없는 경우가 생기기 때문에 '보장'이라는 말에 인용부호를 썼다.
보통 이런 상황은 사라진 볼륨을 기다리는 것과 같은 일종의 퇴행적인 I/O 베이퍼록<sup>vaporlock</sup> 때문에 발생한다.
보통 이런 경우 프로세스들을 제거하는 유일한 방법은 재부팅뿐이다.
[^handbook-191]

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
- [[/cmd/killall]]

## 참고문헌

- UNIX 고급 프로그래밍 [제3판] / 리처드 스티븐스, 스티븐 레이고 공저 / 류광 역 / 퍼스트북 / 인쇄일: 2014년 08월 28일 / 원제: Advanced Programming in the UNIX Environment
- 리눅스 커맨드라인 완벽 입문서 / 윌리엄 E. 샤츠 주니어 저 / 이종우, 정영신 공역 / 비제이퍼블릭(BJ퍼블릭) / 초판 1쇄 발행: 2013년 01월 11일 / 원제: The Linux Command Line
- 유닉스·리눅스 시스템 관리 핸드북 5/e / 에비 네메스, 가스 스나이더, 트렌트 헤인, 벤 웨일리, 댄 맥킨 저 외 2명 / 에이콘출판사 / 발행: 2022년 01월 03일 / 원제: UNIX and Linux System Administration Handbook, 5th Edition

## 주석

[^richard-282]: UNIX 고급 프로그래밍. 8.2장. 282쪽.
[^handbook-191]: 유닉스·리눅스 시스템 관리 핸드북 5/e. 4장. 191쪽.
[^command-line-book-117]: 리눅스 커맨드라인 완벽 입문서. 10장. 117쪽.
[^command-line-book-118]: 리눅스 커맨드라인 완벽 입문서. 10장. 118쪽.
