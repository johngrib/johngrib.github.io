---
layout  : wiki
title   : tty
summary : return user's terminal name
date    : 2023-06-10 14:41:50 +0900
updated : 2023-08-12 19:10:22 +0900
tag     : 
resource: E4/878436-9ABD-43C8-A536-16BA769E3972
toc     : true
public  : true
parent  : [[/cmd]]
latex   : false
---
* TOC
{:toc}

## tty 명령 {#cmd}
### man description

```bash
man tty
```

#### macOS

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

### Example

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

```bash
$ # macOS
$ tty
/dev/ttys003

$ # ubuntu
$ tty
/dev/pts/0
```

`/dev/ttys003`은 장치 파일이므로 `ls -l` 명령으로 자세한 정보를 확인할 수 있다.

```bash
$ ls -l /dev/ttys003
crw--w---- 1 johngrib tty 16, 3 2023-08-03 Thu 23:01:57 /dev/ttys003
```

file type(퍼미션의 첫 글자)이 `c`라는 점에 주목.
`c`에 대해서는 [[/cmd/ls#option-l]] 문서 참고.

## /dev/tty {#dev-tty}

- `/dev/tty`는 터미널 장치 파일이다.
    - 즉, `/dev/tty`는 현재 프로세스가 연결된 터미널을 나타낸다.
    - `/dev/tty`는 `tty` 명령으로 출력된 터미널의 이름과 같다.

### man

```bash
man 4 tty
```

>
Terminal Special Files
>
Each hardware terminal port on the system usually has a terminal special device file associated with it in the directory \`\`/dev/'' (for example, \`\`/dev/tty03'').
When a user logs into the system on one of these hardware terminal ports, the system has already opened the associated device and prepared the line for normal interactive use (see getty(8) .)
There is also a special case of a terminal file that connects not to a hardware terminal port, but to another program on the other side.
These special terminal devices are called ptys and provide the mechanism necessary to give users the same interface to the system when logging in over a network (using rlogin(1), or telnet(1) for example).
Even in these cases the details of how the terminal file was opened and set up is already handled by special software in the system.
Thus, users do not normally need to worry about the details of how these lines are opened or used.
Also, these lines are often used for dialing out of a system (through an out-calling modem), but again the system provides programs that hide the details of accessing these terminal special files (see tip(1) ).

터미널 특수 파일

보통은 시스템의 각 하드웨어 터미널 포트마다 연결되는 터미널 특수 장치 파일들이 있으며, 그것들은 `/dev/` 디렉토리에 있습니다(예: `/dev/tty03`).
사용자가 하드웨어 터미널 포트들 중 하나를 통해 시스템에 로그인한다면, 시스템은 이미 관련된 장치를 활성화하고 정상적인 대화형 사용을 위한 준비를 마친 상태입니다(getty(8) 참조).
또한, 하드웨어 터미널 포트가 아니라 다른 프로그램과 연결되는 특별한 터미널 파일이 있는 경우도 있습니다.
이러한 특수 터미널 장치는 `pty`라고 불리며, 사용자가 네트워크를 통해 로그인할 때 시스템에 동일한 인터페이스를 제공하기 위한 메커니즘을 제공합니다(예: rlogin(1) 또는 telnet(1)).
이런 경우에도 터미널 파일의 초기 설정과 활성화 방법은 시스템 내의 특수한 소프트웨어에 의해 처리된 상태입니다.
그래서 사용자는 이런 연결이 어떻게 열리거나 사용되는지에 대한 자세한 내용에 대해 신경쓰지 않아도 됩니다.
이런 연결들은 종종 시스템에서 외부로 전화를 걸 때(아웃콜 모뎀을 통해) 주로 사용되지만, 시스템은 이러한 터미널 특수 파일 접근의 세부사항을 숨겨주는 프로그램들을 제공합니다(tip(1) 참조).

>
When an interactive user logs in, the system prepares the line to behave in a certain way (called a line discipline), the particular details of which is described in stty(1) at the command level, and in termios(4) at the programming level.  A user may be concerned with changing settings associated with his particular login terminal and should refer to the preceding man pages for the common cases.  The remainder of this man page is concerned with describing details of using and controlling terminal devices at a low level, such as that possibly required by a program wishing to provide features similar to those provided by the system.

대화형 사용자가 로그인하면, 시스템은 회선이 특정한 방식으로 작동하도록 설정합니다(이것을 회선 규율<sub>line discipline</sub> 이라고 함).
이에 대한 자세한 내용은 명령어 수준에서는 stty(1), 프로그래밍 수준에서는 termios(4)에서 확인할 수 있습니다.
사용자는 로그인 터미널과 관련된 설정을 변경하고 싶어할 수 있고, 이에 대한 일반적인 상황에 대해서는 앞에서 언급한 매뉴얼 페이지를 참고하면 됩니다.
이 매뉴얼 페이지의 나머지 부분은 시스템이 제공하는 것과 유사한 기능을 구현해 제공하려 하는 프로그램이 저수준의 터미널 장치를 어떻게 사용하고 제어해야 하는지에 대한 세부사항을 다룹니다.


### 응용
#### tee 명령과 함께 사용

`/dev/tty`는 현재 터미널 장치의 파일 디스크립터를 가리킨다.

따라서 `tee`와 함께 사용하면 파이프 흐름에서 벗어난 출력을 현재 터미널로 보낼 수 있다.

[[/cmd/find]]{find}와 `wc`를 조합해 사용하는 상황을 생각해보자.

```bash
$ find . -name '*cmd*' | wc -l
      21
```

`tee` 명령을 통해 출력을 `/dev/tty`와 `wc`로 동시에 보내면 다음과 같은 결과가 나온다.

```bash
$ find . -name '*cmd*' | tee /dev/tty | wc -l
./_wiki/cmd
./_wiki/dc-cmd.md
./_wiki/glow-cmd.md
./_wiki/cmd.md
./_wiki/ioreg-cmd.md
./_site/wiki/dc-cmd
./_site/wiki/cmd
./_site/wiki/ioreg-cmd
./_site/wiki/glow-cmd
./_site/data/tag/cmd.json
./_site/data/metadata/cmd
./_site/data/metadata/cmd.json
./_site/data/metadata/glow-cmd.json
./_site/data/metadata/dc-cmd.json
./_site/data/metadata/ioreg-cmd.json
./data/tag/cmd.json
./data/metadata/cmd
./data/metadata/cmd.json
./data/metadata/glow-cmd.json
./data/metadata/dc-cmd.json
./data/metadata/ioreg-cmd.json
      21
```

때문에 [[/cmd/find]]의 결과가 터미널에 출력됐고, 그 이후에 `wc` 결과도 출력되었다.

`/dev/tty`로 보낸 내용은 1 로 보낸 출력이 아니기 때문에 `>`로 리다이렉트할 수 없다는 점에 주의하도록 한다.

```bash
$ # result.txt 로 출력해보지만...
$ find . -name '*cmd*' | tee /dev/tty | wc -l > result.txt
./_wiki/cmd
./_wiki/dc-cmd.md
./_wiki/glow-cmd.md
./_wiki/cmd.md
./_wiki/ioreg-cmd.md
./_site/wiki/dc-cmd
./_site/wiki/cmd
./_site/wiki/ioreg-cmd
./_site/wiki/glow-cmd
./_site/data/tag/cmd.json
./_site/data/metadata/cmd
./_site/data/metadata/cmd.json
./_site/data/metadata/glow-cmd.json
./_site/data/metadata/dc-cmd.json
./_site/data/metadata/ioreg-cmd.json
./data/tag/cmd.json
./data/metadata/cmd
./data/metadata/cmd.json
./data/metadata/glow-cmd.json
./data/metadata/dc-cmd.json
./data/metadata/ioreg-cmd.json

$ # result.txt 에는 wc 결과만 들어있다.
$ cat result.txt
      21
```

#### 비표준 출력 트릭 {#non-standard-output-trick}

`/dev/tty`로 출력을 틀어주면 파이프라인에서 벗어난 내용을 터미널로 보낼 수 있다는 특징을 활용한 꼼수.

표준 출력, 표준 에러와 다른 별도의 출력이 필요하다면 이런 꼼수를 쓰는 것도 생각할 수 있다.
(하지만 어지간해선 표준 에러를 쓰는 것이 더 좋다.)

다음과 같은 셸 스크립트를 만들고 `tt`라는 이름으로 저장한다.

```bash
#!/usr/bin/env bash

echo "Hello"
echo "Send to dev tty" > /dev/tty
echo "World"
echo "Send to 2 (STDERR)" >&2
```

이 `tt` 파일을 실행하면 `echo` 출력문이 모두 잘 출력된 것처럼 보인다.

```bash
$ ./tt
Hello
Send to dev tty
World
Send to 2 (STDERR)
```

하지만 `>`로 리다이렉트하면 `Send ...`는 `/dev/tty`와 2로 출력되어 `result.txt`에는 `Hello World`만 있다.

```bash
$ ./tt > result.txt
Send to dev tty
Send to 2 (STDERR)

$ cat result.txt
Hello
World
```

당연히 `2>`에 대해서도 똑같이 작동한다.

```bash
$ ./tt 2> error.txt
Hello
Send to dev tty
World

$ cat error.txt
Send to 2 (STDERR)
```

1, 2를 모두 파일로 리다이렉트하면 `/dev/tty`로 출력된 `Send to dev tty`만 `result.txt`에 없다.

```bash
$ ./tt > result.txt 2>&1
Send to dev tty

$ cat result.txt
Hello
World
Send to 2 (STDERR)
```

#### 사용자의 터미널 입력을 강제하는 트릭 {#forcing-user-input-trick}

`/dev/tty`를 사용해 사용자의 터미널 입력을 강제하는 꼼수.

보통 `read` 명령으로 사용자 입력을 받을 때에는 다음과 같이 셸 스크립트를 작성한다.

```bash
#!/usr/bin/env bash

read -p "Enter your name: " name
echo "Hello, $name!"
```

이렇게 작성한 파일을 실행하면 다음과 같이 사용자가 입력을 해줘야 한다.

다음은 내가 `John Grib` 이라고 입력을 해 준 것이다.

```bash
$ ./name.sh
Enter your name: John Grib
Hello, John Grib!
```

이렇게 입력하는 것이 귀찮다면 파이핑을 하면 된다.
파일이나 `echo` 같은 출력 명령을 통해 미리 입력을 넣어줄 수 있다.

```bash
$ echo "Mike" | ./name.sh
Hello, Mike!
```

만약 이렇게 파이핑을 통해 `read`에 연결하는 것을 방지하고 사용자 입력을 강제하고 싶다면 `/dev/tty`를 사용할 수 있다.

```bash
#!/usr/bin/env bash

read -p "Enter your name: " name < /dev/tty
echo "Hello, $name!"
```

이렇게 하면 출력문을 연결해도 사용자 입력을 받는 프롬프트가 뜬다.

다음은 내가 `John` 이라고 입력을 해 준 것이다.

```bash
$ echo "Mike" | ./name2.sh
Enter your name: John
Hello, John!
```

`Hello, Mike!`가 아니라 `Hello, John!`이 출력되었다.

