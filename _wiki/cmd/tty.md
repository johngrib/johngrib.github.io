---
layout  : wiki
title   : tty
summary : return user's terminal name
date    : 2023-06-10 14:41:50 +0900
updated : 2023-07-30 23:30:30 +0900
tag     : 
resource: E4/878436-9ABD-43C8-A536-16BA769E3972
toc     : true
public  : true
parent  : [[/cmd]]
latex   : false
---
* TOC
{:toc}

## man description

### macOS

>
The tty utility writes the name of the terminal attached to standard input to standard output.
The name that is written is the string returned by ttyname(3).
If the standard input is not a terminal, the message “not a tty” is written.
The options are as follows:
>
`-s` Do not write the terminal name;
only the exit status is affected when this option is specified.
The `-s` option is deprecated in favor of the “test -t 0” command.

tty 유틸리티는 표준 입력에 연결된 터미널의 이름을 표준 출력에 씁니다.
기록되는 이름은 ttyname(3)이 반환한 문자열입니다.
표준 입력이 터미널이 아닌 경우 "not a tty"라는 메시지가 기록됩니다.
옵션은 다음과 같습니다:

`-s` 터미널 이름을 출력하지 않습니다;
이 옵션을 지정하면 종료 상태만 영향을 받습니다.
`-s` 옵션은 "test -t 0" 명령에 대해서는 더 이상 사용되지 않습니다.

## Example

macOS에서 `ps` 명령을 실행해보면 다음과 같이 `TTY`가 표시된다.

```bash
$ ps
  PID TTY           TIME CMD
  304 ttys001    0:00.14 -bash
10515 ttys001    0:01.28 docker compose exec nvim bash
10516 ttys001    0:01.58 /Applications/Docker.app/Contents/Resources/bin/com.docker.cli compose exec nvim bash
10518 ttys001    0:00.76 /usr/local/lib/docker/cli-plugins/docker-compose compose exec nvim bash
 1509 ttys002    0:00.03 -bash
 1681 ttys002    0:00.01 bash ./start.sh inc
 1711 ttys002   66:14.43 /Users/johngrib/.rbenv/versions/3.2.1/bin/jekyll server --incremental --trace
 1732 ttys002    0:09.34 /Users/johngrib/.rbenv/versions/3.2.1/lib/ruby/gems/3.2.0/gems/rb-fsevent-0.11.2/bin/fsevent_watch --format=otnetstring --latency 0.1 /Users/johngrib/johngrib.github.io
10577 ttys003    0:00.21 -bash
13979 ttys004    0:00.32 -bash
86438 ttys004    1:57.79 nvim
```

ubuntu라면 다음과 같이 `TTY`가 표시된다.

```bash
$ ps
  PID TTY          TIME CMD
  189 pts/0    00:00:00 bash
  307 pts/0    00:00:00 ps
```

`TTY`는 `ps`로 출력된 각 프로세스가 연결된 터미널을 나타낸다.
예를 들어 `docker compose exec nvim bash`를 실행하는 `10515` 프로세스와 연결된 터미널은 `ttys001` 이다.

열어둔 터미널의 이름을 조사하고 싶다면 `tty` 명령을 사용해 터미널의 이름을 출력하면 된다.

```
$ # macOS
$ tty
/dev/ttys003

$ # ubuntu
$ tty
/dev/pts/0
```

