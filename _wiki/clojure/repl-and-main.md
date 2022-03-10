---
layout  : wiki
title   : The REPL and main entry points
summary : 번역 중인 문서
date    : 2022-03-10 22:18:00 +0900
updated : 2022-03-10 23:08:32 +0900
tag     : clojure
toc     : true
public  : true
parent  : [[/clojure/reference]]
latex   : false
---
* TOC
{:toc}

## The REPL and main entry points

[원문]( https://clojure.org/reference/repl_and_main )

### The clojure.main namespace

>
The `clojure.main` namespace provides functions that allow Clojure programs and interactive sessions to be launched via Java’s application launcher tool `java`.

`clojure.main` 네임스페이스는 Java 프로그래밍 언어의 애플리케이션 런처 툴을 통해 Clojure 프로그램과 대화형 세션을 시작할 수 있게 해주는 함수들을 제공합니다.

### clojure.main --help

>
The `clojure.main/main` entry point accepts a variety of arguments and flags.

`clojure.main/main` 엔트리 포인트는 다양한 인자와 플래그를 받을 수 있습니다.

>
- With no options or args, runs an interactive Read-Eval-Print Loop
- init options:
    - \-i, \--init path Load a file or resource
    - \-e, \--eval string Evaluate expressions in string; print non-nil values
    - \--report target Report uncaught exception to "file" (default), "stderr", or "none", overrides System property clojure.main.report (added in 1.10.1)
- main options:
    - \-r, \--repl Run a repl
    - path Run a script from a file or resource
    - \- Run a script from standard input
    - \-m, \--main A namespace to find a -main function for execution
    - \-h, -?, \--help Print this help message and exit
- operation:
    - Establishes thread-local bindings for commonly set!-able vars
    - Enters the user namespace
    - Binds `*command-line-args*` to a seq of strings containing command line args that appear after any main option
    - Runs all init options in order
    - Runs a repl or script if requested

- option이나 args가 없다면 대화형 Read-Eval-Print Loop(REPL)을 실행합니다.
- 초기화 옵션:
    - -i, \--init path
        - 파일이나 리소스를 로드합니다.
    - -e, \--eval string
        - 문자열 속의 표현식을 평가하고, nil 이 아닌 값들을 출력합니다.
    - \--report target
        - 캐치하지 못한 예외 보고서를 "file"로 저장할 것인지(기본값), "stderr"로 전송할 것인지, "none"으로 전송할 것인지를 설정합니다.
        - 이 옵션을 설정하면 System 속성 `clojure.main.report`를 오버라이드합니다.
- 메인 옵션:
    - -r, \--repl
        - REPL을 실행합니다.
    - path
        - 파일이나 리소스로부터 스크립트를 실행합니다.
    - \-
        - 표준 입력으로 받은 스크립트를 실행합니다.
    - \-m, \--main
        - 실행할 `-main`함수를 찾을 네임스페이스를 지정합니다.
    - \-h, -?, \--help
        - 도움말 메시지(지금 여기에서 읽고 있는 내용)를 출력하고 종료합니다.
- 실행 과정:
    - 일반적으로 `set!`으로 설정 가능한 var 에 대한 스레드 로컬 바인딩을 설정합니다.
    - 사용자 네임스페이스로 진입합니다.
    - main 옵션 뒤에 있는 커맨드 라인 args를 포함하는 문자열들의 시퀀스를 만들어 `*command-line-args*`에 바인딩합니다.
    - 모든 초기화 옵션을 순서대로 실행합니다.
    - repl을 실행합니다. 만약 스크립트가 요청됐다면 스크립트를 실행합니다.

>
The init options may be repeated and mixed freely, but must appear before any main option.
The appearance of any eval option before running a repl suppresses the usual repl greeting message: "Clojure ~(clojure-version)".
>
Paths may be absolute or relative in the filesystem or relative to classpath.
Classpath-relative paths have prefix of @ or @/

init 옵션은 반복해서 쓰거나 자유롭게 섞어서 쓸 수 있지만, 메인 옵션보다 앞에 와야 합니다.
repl을 실행하기 전에 eval 옵션이 있다면 "Clojure ~(clojure-version)" 같은 기본 환영 메시지를 보여주지 않습니다: 

경로는 파일 시스템 기준의 절대 경로나, classpath 기준의 상대 경로를 사용할 수 있습니다.
classpath 기준의 상대 경로는 `@` 또는 `@/` 접두사를 사용합니다.

### Launching a REPL
### Launching a Script
### Passing arguments to a Script
### Error printing
#### At REPL
#### As launcher
### tap
### Launching a Socket Server
### Related functions

