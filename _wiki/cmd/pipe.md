---
layout  : wiki
title   : pipe
summary : "|"
date    : 2023-06-01 21:38:20 +0900
updated : 2023-06-01 22:41:28 +0900
tag     : 
resource: EA/2B5097-C073-4307-BB60-255F5A34BC01
toc     : true
public  : true
parent  : [[/cmd]]
latex   : false
---
* TOC
{:toc}

## man

```sh
man 2 pipe
```

```sh
 # bash 설명서에서 Pipelines 를 검색해서 읽어보자. (대소문자 주의)
man bash
```

### Pipelines {#pipelines}

다음은 GNU Bash 5.2의 설명이다.

>
A pipeline is a sequence of one or more commands separated by one of the control operators `|` or `|&`.
The format for a pipeline is:

파이프라인은 `|` 또는 `|&` 연산자로 구분된 하나 이상의 명령어들의 연속입니다.
파이프라인의 형식은 다음과 같습니다.

>
> ```
> [time [-p]] [ ! ] command1 [ [|⎪|&] command2 ... ]
> ```
>
The standard output of `command1` is connected via a pipe to the standard input of `command2`.
This connection is performed before any redirections specified by the `command1`(see REDIRECTION below).
If `|&` is used, `command1`'s standard error, in addition to its standard output, is connected to `command2`'s standard input through the pipe; it is shorthand for `2>&1 |`.
This implicit redirection of the standard error to the standard output is performed after any redirections specified by `command1`.

`command1`의 표준 출력은 파이프를 통해 `command2`의 표준 입력에 연결됩니다.
이 연결은 `command1`에 의해 지정된 어떤 리디렉션보다 먼저 수행됩니다.
만약 `|&`를 사용하면, `command1`의 표준 에러도 표준 출력과 함께 파이프를 통해 `command2`의 표준 입력에 연결됩니다.
사실 `|&`는 `2>&1 |`의 축약 표현입니다.
표준 에러를 표준 출력으로 리디렉션하는 것은 `command1`에 의해 지정된 어떤 리디렉션보다 나중에 수행됩니다.

>
주의: `|&`는 bash 4 이상에서만 사용할 수 있다.
{:style="background-color: #fff9e4;"}

<span/>

>
The return status of a pipeline is the exit status of the last command, unless the `pipefail` option is enabled.
If `pipefail` is enabled, the pipeline's return status is the value of the last (rightmost) command to exit with a non-zero status, or zero if all commands exit successfully.
If the reserved word `!`  precedes a pipeline, the exit status of that pipeline is the logical negation of the exit status as described above.
The shell waits for all commands in the pipeline to terminate before returning a value.

파이프라인의 반환 상태는 마지막 명령의 종료 상태이지만, pipefail 옵션이 활성화된 경우에는 그렇지 않습니다.
pipefail이 활성화되면 파이프라인의 반환 상태는, 마지막(가장 오른쪽) 명령의 (`0`이 아닌 상태로) 종료 값이 되거나, 모든 명령이 성공적으로 종료한 경우에는 `0`이 됩니다.
예약어 `!`가 파이프라인 앞에 있으면, 그 파이프라인의 종료 상태는 위에서 설명한 종료 상태의 논리 부정입니다.
셸은 파이프라인의 모든 명령이 종료되기를 기다린 후에 값을 반환합니다.

>
If the `time` reserved word precedes a pipeline, the elapsed as well as user and system time consumed by its execution are reported when the pipeline terminates.
The `-p` option changes the output format to that specified by POSIX.
When the shell is in `posix mode`, it does not recognize `time` as a reserved word if the next token begins with a `-`.
The `TIMEFORMAT` variable may be set to a format string that specifies how the timing information should be displayed; see the description of `TIMEFORMAT` under `Shell Variables` below.

만약 `time` 예약어가 파이프라인 앞에 있으면, 파이프라인이 종료될 때 실행에 소요된 경과 시간, 사용자 시간, 시스템 시간이 보고됩니다.
`-p` 옵션은 출력 형식을 POSIX에서 지정한 형식으로 변경합니다.
셸이 `posix 모드`인 경우, 다음 토큰이 `-`로 시작하면 `time`을 예약어로 인식하지 않습니다.
`TIMEFORMAT` 변수는 타이밍 정보를 어떻게 표시할지 지정하는 형식 문자열로 설정할 수 있습니다.
아래의 `Shell Variables` 항목에서 `TIMEFORMAT` 설명을 참고하세요.

>
When the shell is in `posix mode`, `time` may be followed by a newline.
In this case, the shell displays the total user and system time consumed by the shell and its children.
The `TIMEFORMAT` variable may be used to specify the format of the time information.

셸이 `posix 모드`인 경우, `time` 다음에는 개행 문자가 올 수 있습니다.
이 경우, 셸은 셸과 그 자식이 소비한 총 사용자 시간과 시스템 시간을 표시합니다.
`TIMEFORMAT` 변수는 시간 정보의 형식을 지정하는 데 사용할 수 있습니다.

>
Each command in a multi-command pipeline, where pipes are created, is executed in a `subshell`, which is a separate process.
See `COMMAND EXECUTION ENVIRONMENT` for a description of subshells and a subshell environment.
If the `lastpipe` option is enabled using the `shopt` builtin (see the description of `shopt` below), the last element of a pipeline may be run by the shell process when job control is not active.

파이프가 생성되는 <mark>다중 명령 파이프라인의 각 명령은 subshell에서 실행되며, 이는 별도의 프로세스입니다</mark>.
subshell과 subshell 환경에 대한 설명은 `COMMAND EXECUTION ENVIRONMENT`를 참고하세요.
`shopt` 내장 명령어를 사용하여 `lastpipe` 옵션을 활성화하면(아래의 `shopt` 설명을 참고하세요), 작업 제어가 활성화되지 않은 경우에도 파이프라인의 마지막 요소를 셸 프로세스가 실행할 수 있습니다.

## 인용

### From: 운영체제 아주 쉬운 세 가지 이야기

"운영체제 아주 쉬운 세 가지이야기"에서는 유한 버퍼 문제를 설명할 때 UNIX 파이프(`|`)를 사례로 들어 이야기한다.

>
`grep foo file.txt | wc -l`과 같은 문장처럼 파이프(pipe) 명령으로 한 프로그램의 결과를 다른 프로그램에게 전달할 때도 유한 버퍼를 사용한다.
이 예제에서 두 개의 프로세스가 동시에 실행된다.
`grep` 명령어는 `file.txt`에서 `foo`라는 문자열이 포함된 줄을 찾아 표준 출력(standard ouput, STDOUT)에 쓴다.
UNIX 쉘은 출력 결과를 표준출력 디바이스로 전송하지 않고 UNIX 운영체제가 정의한 파이프(pipe 시스템 콜에 의해 생성)라는 곳으로 전송(redirect)한다.
파이프는 다시 `wc` 프로세스의 표준 입력(standard input, STDIN)과 연결되어 있다.
`grep` 프로세스가 생산자가 되고 `wc` 프로세스가 소비자가 된다.
그 둘 사이에는 커널 내부에 있는 유한 버퍼가 있다.
이 예제에서 당신은 내부 메커니즘에는 별 관심이 없는 사용자일 뿐이다.
[^easy-380]

### From: 리눅스 커맨드라인 쉘 스크립트 바이블

>
명령 사이에 파이프를 놓으면 한 명령의 출력이 다른 명령으로 간다.
>
> ```sh
> comman1 | command2
> ```
>
파이프를 두 개의 명령을 연속으로 실행하는 것이라고 생각하지는 말라.
리눅스 시스템은 실제로는 시스템에서 내부적으로 이 두 명령을 결합하고 동시에 실행시킨다.
첫 번째 명령은 출력을 생성하고 두 번째 명령에 즉시 전송된다.
데이터를 전송하는데 어떠한 중간파일 또는 버퍼 영역도 사용되지 않는다.
[^richard-315]

## 팁

### `|&` 는 `2>&1 |` 의 축약 표현

위의 [Pipelines]( #pipelines ) 섹션에서도 설명하듯, `|&`은 `2>&1 |`의 축약 표현이다.
다만 bash 4 이후부터 사용할 수 있으므로 주의할 것.


## 참고문헌

- 운영체제 아주 쉬운 세 가지 이야기 [제2판] / Remzi H. Arpaci-Dusseau, Andrea C. Arpaci-dusseau 공저 / 원유집, 박민규, 이성진 공역 / 홍릉 / 제2판 발행: 2020년 09월 10일 / 원제: Operating Systems: Three Easy Pieces
- 리눅스 커맨드라인 쉘 스크립트 바이블 [3판] / 리처드 블룸, 크리스틴 브레스 공저 / 트랜지스터팩토리 역 / 스포트라잇북 / 초판 1쇄 발행: 2016년 09월 26일

## 주석

[^easy-380]: 운영체제 아주 쉬운 세 가지 이야기. 30.2장. 380쪽
[^richard-315]: 리눅스 커맨드라인 쉘 스크립트 바이블. 11장. 315쪽

