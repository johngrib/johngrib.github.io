---
layout  : wiki
title   : The REPL and main entry points
summary : 번역 중인 문서
date    : 2022-03-10 22:18:00 +0900
updated : 2022-03-12 12:18:08 +0900
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

>
The simplest way to launch a Clojure _repl_ is to use the [clj](https://clojure.org/guides/getting_started ) command tool, which invokes clojure.main:

Clojure repl을 시작하는 가장 간단한 방법은 `clojure.main`을 실행하는 clj 명령 툴을 사용하는 것입니다.

```bash
$ clj
Clojure 1.10.0
user=>
```

>
The REPL prompt shows the name of the current namespace (\*ns\*), which defaults to _user_.
>
Several special vars are available when using the REPL:
>
- \*1, \*2, \*3 - hold the result of the last three expressions that were evaluated
- \*e - holds the result of the last exception.

REPL 프롬프트는 현재 네임스페이스(`*ns*`)의 이름을 보여줍니다. 디폴트 네임스페이스는 `user` 입니다.

REPL을 사용할 때에는 다음과 같은 몇 가지 특수한 변수를 사용할 수 있습니다.

- `*1`, `*2`, `*3` - 가장 최근에 평가한 표현식의 결과들을 순서대로 갖고 있습니다.
- `*e` - 가장 최근 발생한 예외의 결과를 갖고 있습니다.

>
The [clojure.repl](https://clojure.github.io/clojure/clojure.repl-api.html ) namespace has a number of useful functions for inspecting the source and documentation of available functions:
>
- [doc](https://clojure.github.io/clojure/clojure.repl-api.html#clojure.repl/doc ) - prints the docstring for a var given its name
- [find-doc](https://clojure.github.io/clojure/clojure.repl-api.html#clojure.repl/find-doc ) - prints the docstring for any var whose doc or name matches the pattern
- [apropos](https://clojure.github.io/clojure/clojure.repl-api.html#clojure.repl/apropos ) - returns a seq of definitions matching a regex
- [source](https://clojure.github.io/clojure/clojure.repl-api.html#clojure.repl/source ) - prints the source for a symbol
- [pst](https://clojure.github.io/clojure/clojure.repl-api.html#clojure.repl/pst ) - **p**rint **s**tack **t**race for a given exception or \*e by default

`clojure.repl` 네임스페이스에는 소스코드를 검사하는 데에 도움이 되는 다양하고 유용한 함수들과 그런 함수들을 설명하는 문서들도 포함되어 있습니다.

- doc - name이 있는 var에 대한 docstring을 출력합니다.
- find-doc - 주어진 패턴과 일치하는 doc이나 name에 대한 docstring을 출력합니다.
- apropos - 정규식과 일치하는 정의들 시퀀스를 리턴합니다.
- source - symbol의 소스를 출력합니다.
- pst - **p**rint **s**tack **t**race. 주어진 예외에 대한 스택 트레이스를 출력합니다. 예외 기본값은 `*e` 입니다.


### Launching a Script

>
To run a file full of Clojure code as a script, pass the path to the script to `clojure.main` as an argument:

Clojure 코드로 이루어진 스크립트 파일을 실행하려면, 해당 스크립트의 경로를 `clojure.main`의 인수로 전달합니다.

```bash
clj -M /path/to/myscript.clj
```

### Passing arguments to a Script

>
To pass in arguments to a script, pass them in as further arguments when launching `clojure.main`:

스크립트를 실행할 때 인자를 주고 싶다면, `clojure.main`을 실행할 때 함께 전달합니다.

```bash
clj -M /path/to/myscript.clj arg1 arg2 arg3
```

>
The arguments will be provided to your program as a seq of strings bound to the var `*command-line-args*`:

인자들은 여러분의 프로그램에 `*command-line-args*` 변수에 담긴 문자열 시퀀스로 전달됩니다.

```clojure
*command-line-args* => ("arg1" "arg2" "arg3")
```

### Error printing
#### At REPL

>
As of Clojure 1.10, Clojure errors categorized into one of several phases:
>
- `:read-source` - an error thrown while reading characters at the REPL or from a source file.
- `:macro-syntax-check` - a syntax error found in the syntax of a macro call, either from spec or from a macro throwing IllegalArgumentException, IllegalStateException, or ExceptionInfo.
- `:macroexpansion` - all other errors thrown during macro evaluation are categorized as macroexpansion errors.
- `:compile-syntax-check` - a syntax error caught during compilation.
- `:compilation` - non-syntax errors caught during compilation.
- `:execution` - any errors thrown at execution time.
- `:read-eval-result` - any error thrown while reading the result of execution (only applicable for REPLs that read the result).
- `:print-eval-result` - any error thrown while printing the result of execution.

Clojure 1.10 부터, Clojure error는 단계별로 분류되었습니다.

- `:read-source` - 소스 파일에서 문자를 읽는 동안 던져진 에러.
- `:macro-syntax-check` - 매크로 호출시 발견된 문법 에러.
    - spec에서 던진 에러이거나, `IllegalArgumentException`, `IllegalStateException`, `ExceptionInfo`를 던지는 매크로인 경우에 해당합니다.
- `:macroexpansion` - 매크로 평가 중에 던져지는 그 외의 에러는 매크로 확장 에러(macroexpansion error)로 분류됩니다.
- `:compile-syntax-check` - 컴파일 중에 캐치된 문법 에러.
- `:compilation` - 컴파일 중에 캐치된 non-syntax 에러.
- `:execution` - 실행 중에 던져지는 모든 에러.
- `:read-eval-result` - 실행 결과를 읽는 동안 던져진 에러. (결과를 읽는 REPL에서만 적용되는 에러)
- `:print-eval-result` - 실행 결과를 출력하는 동안 던져진 에러.

>
Exceptions thrown during all phases (exception `:execution`) will have ex-data attached with one or more of the following keys:
>
- `:clojure.error/phase` - phase indicator
- `:clojure.error/source` - file name (no path)
- `:clojure.error/line` - integer line number
- `:clojure.error/column` - integer column number
- `:clojure.error/symbol` - symbol being expanded/compiled/invoked
- `:clojure.error/class` - cause exception class symbol
- `:clojure.error/cause` - cause exception message
- `:clojure.error/spec` - explain-data for a spec error

모든 단계에서 던져진 예외(`:execution` 예외)에는 추가 데이터가 덧붙여지며, 추가 데이터는 다음과 같은 키 집합을 갖습니다.

- `:clojure.error/phase` - 단계
- `:clojure.error/source` - 파일 이름(파일 경로는 없음)
- `:clojure.error/line` - 행 번호
- `:clojure.error/column` - 열 번호
- `:clojure.error/symbol` - 확장/컴파일/실행되는 심볼
- `:clojure.error/class` - 예외 클래스 심볼
- `:clojure.error/cause` - 예외 메시지
- `:clojure.error/spec` - spec 에러의 설명 데이터

>
The clojure.main REPL includes the categorization and printing of errors by default, but the individual steps of this process are exposed as well for other REPLs to use, specifically the functions:
>
- [Throwable-\>map](https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/Throwable-%3Emap ) - converts an Exception chain into Clojure data
- [ex-triage](https://clojure.github.io/clojure/clojure.main-api.html#clojure.main/ex-triage ) - analyzes Clojure exception data to pull relevant information from the top and bottom of the exception chain into a map describing just the set of data needed to format an exception string
- [ex-str](https://clojure.github.io/clojure/clojure.main-api.html#clojure.main/ex-str ) - produces a phase-appropriate message given a set of exception data

`clojure.main` REPL는 에러의 분류와 출력 기능을 기본적으로 포함하고 있습니다.
그러나 이러한 프로세스의 각 단계별로 다음의 함수들을 사용해 다른 REPL에서 활용할 수 있습니다.

- `Throwable->map` - 예외 체인을 Clojure 데이터로 변환
- `ex-triage` - Clojure 예외 데이터를 탑다운으로 분석하여 맵으로 변환하며, 이 맵은 exception string 포맷에 필요한 데이터의 집합입니다.
- `ex-str` - 주어진 예외 데이터 집합을 참고해 단계에 따른 적절한 메시지를 생성합니다.

>
The clojure.main REPL combines these functions in a pipeline to produce the printed exception message: `(-> ex Throwable->map clojure.main/ex-triage clojure.main/ex-str)`.
Other REPLs can use one or more pieces of this pipeline as necessary when building or customizing their exception printing.

`clojure.main` REPL은 이러한 함수들을 하나의 파이프라인으로 구성하여 예외 메시지를 출력합니다. `(-> ex Throwable->map clojure.main/ex-triage clojure.main/ex-str)`
다른 REPL들을 사용할 때 예외 출력을 구성하거나 커스터마이징이 필요하다면 이 파이프라인의 일부를 가져다 쓰면 됩니다.

#### As launcher
### tap
### Launching a Socket Server
### Related functions

