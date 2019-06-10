---
layout  : wiki
title   : (번역) Go 1.12에서 배포한 것을 디버깅하기
summary : Debugging what you deploy in Go 1.12
date    : 2019-06-09 23:13:28 +0900
updated : 2019-06-10 20:57:11 +0900
tag     : golang 번역 the-go-blog
toc     : true
public  : true
parent  : Go-Blog-translation
latex   : false
---
* TOC
{:toc}

* 원문: [Debugging what you deploy in Go 1.12 By David Chase](https://blog.golang.org/debugging-what-you-deploy ) (2019-03-21)
* 의역이 많으며 오역이 있을 수 있습니다.
* (역: ...) 은 원문에 없는 말을 이해를 돕기 위해 제가 추가한 것입니다.

# Introduction

**서문**

_Go 1.11 and Go 1.12 make significant progress toward allowing developers to debug the same optimized binaries that they deploy to production._

_As the Go compiler has become increasingly aggressive in producing faster binaries, we've lost ground in debuggability. In Go 1.10, users needed to disable optimizations entirely in order to have a good debugging experience from interactive tools like Delve. But users shouldn’t have to trade performance for debuggability, especially when running production services. If your problem is occurring in production, you need to debug it in production, and that shouldn’t require deploying unoptimized binaries._

_For Go 1.11 and 1.12, we focused on improving the debugging experience on optimized binaries (the default setting of the Go compiler). Improvements include_

* _More accurate value inspection, in particular for arguments at function entry;_
* _More precisely identifying statement boundaries so that stepping is less jumpy and breakpoints more often land where the programmer expects;_
* _And preliminary support for Delve to call Go functions (goroutines and garbage collection make this trickier than it is in C and C++)._

Go 1.11과 Go 1.12에는 디버깅과 관련된 중요한 진보가 있었습니다.
이제부터는 프로덕션 환경에 배포하는 것과 동일한 수준의 최적화된 바이너리도 디버깅할 수 있게 됩니다.

우리는 여태까지 Go 컴파일러의 바이너리 파일 생산 성능을 매우 적극적으로 끌어올렸습니다만, 그로 인해 디버깅 측면의 근간(ground in debuggability)을 확보하지 못하고 있었습니다. 가령 Go 1.10에서 Delve 같은 대화형 디버깅 도구를 제대로 사용하려면 최적화 옵션을 완전히 꺼놓아야 했습니다.

하지만 사용자가 디버깅 편의 때문에 성능을 포기할 수는 없는 일입니다. 특히 프로덕션 서비스 환경이라면 더더욱 그렇겠죠. 이제는 프로덕션 환경을 디버깅해야 하는 상황이 발생해도, 최적화되지 않은 바이너리를 배포하는 방식을 쓰지 않아도 됩니다.

우리는 Go 1.11과 1.12에서 최적화된 바이너리 옵션(Go 컴파일러의 기본값)을 쓸 때의 디버깅 경험을 개선하는 데에 주력했습니다. 개선 사항은 다음과 같습니다.

* (특히 함수의 인자에 대한) 더 정확한 값 검사(value inspection).
* 구문의 경계(statement boundaries)를 더 정확하게 식별하여, 단계별 이동(stepping)을 줄이고 각 브레이크 포인트가 프로그래머가 예상한 곳에 더 잘 도달할 수 있도록 향상.
* Delve의 Go 함수 호출에 대한 예비 지원을 추가(고루틴과 가비지 컬렉션이 있기 때문에 C/C++보다 더 교묘하게 작동합니다).

# Debugging optimized code with Delve

**Delve를 사용해 최적화된 코드를 디버깅하기**

_[Delve](https://github.com/go-delve/delve ) is a debugger for Go on x86 supporting both Linux and macOS. Delve is aware of goroutines and other Go features and provides one of the best Go debugging experiences. Delve is also the debugging engine behind [GoLand](https://www.jetbrains.com/go/ ), [VS Code](https://code.visualstudio.com/ ), and [Vim](https://github.com/fatih/vim-go )._

<em>
Delve normally rebuilds the code it is debugging with -gcflags "all=-N -l", which disables inlining and most optimizations. To debug optimized code with delve, first build the optimized binary, then use dlv exec your_program to debug it. Or, if you have a core file from a crash, you can examine it with dlv core your_program your_core. With 1.12 and the latest Delve releases, you should be able to examine many variables, even in optimized binaries.
</em>

Delve는 Linux와 macOS를 모두 지원하는 x86 기반의 Go 디버거입니다.
Delve는 고루틴을 포함한 Go 언어의 다른 기능들을 인식하고 있어, 최고의 디버깅 경험을 제공합니다.
Delve는 GoLand, VS Code, Vim의 디버깅 엔진이기도 합니다.

보통 Delve에 옵션으로 `-gcflag`에 `"all=-N -l"`을 주면 디버깅 중인 코드를 다시 빌드합니다. 이 옵션은 인라이닝(inlining) 기능을 포함한 대부분의 최적화를 비활성화합니다.

(역: inlining은 Go 컴파일러가 간단한 함수를 한 줄짜리 코드로 최적화하는 작업입니다. [CompilerOptimizations](https://github.com/golang/go/wiki/CompilerOptimizations#function-inlining ), [test/inline.go](https://golang.org/test/inline.go ))

최적화된 코드를 Delve로 디버깅하고 싶다면, 먼저 최적화된 바이너리를 빌드하고 `dlv exec your_program` 명령을 실행해서 디버깅하면 됩니다.
크래시가 발생한 코어 파일이 있다면, `dlv core your_program your_core` 명령으로 조사하는 것도 가능합니다.
Delve 1.12 및 최신 버전 릴리즈를 사용하면 최적화된 바이너리에서도 여러 변수를 조사하는 것이 가능합니다.

# Improved value inspection

**값 검사 기능 향상**

_When debugging optimized binaries produced by Go 1.10, variable values were usually completely unavailable. In contrast, starting with Go 1.11, variables can usually be examined even in optimized binaries, unless they’ve been optimized away completely. In Go 1.11 the compiler began emitting DWARF location lists so debuggers can track variables as they move in and out of registers and reconstruct complex objects that are split across different registers and stack slots._

Go 1.10에서 빌드한 최적화된 바이너리를 디버깅하는 경우, 변수의 값들을 사용하는 것은 대체로 불가능했습니다.
반면, Go 1.11부터는 심하게 최적화되지 않은 변수라면 최적화된 바이너리에서도 변수를 검사할 수 있습니다.
Go 1.11부터는 컴파일러가 DWARF 위치 목록을 내보내기 시작했으므로, 디버거는 레지스터로 들어가고 나가는 변수들을 추적할 수 있고 여러 레지스터와 스택 슬롯들로 분리된 복잡한 객체를 재구성할 수 있게 되었습니다.

(역: [DWARF](https://en.wikipedia.org/wiki/DWARF )는 표준화된 디버깅 데이터 포맷. )

# Improved stepping

**향상된 단계별 실행**

_This shows an example of stepping through a simple function in a debugger in 1.10, with flaws (skipped and repeated lines) highlighted by red arrows._

다음 그림은 1.10의 디버거로 간단한 함수를 단계별로 돌려볼 때 발생할 수 있는 건너뜀과 반복 문제를 보여줍니다.
그림 속의 빨간 화살표는 디버거가 건너뛰고(skipped) 반복하는(repeated) 문제를 표시한 것입니다.

(역: 개발자가 디버거로 한 줄 한 줄 실행하고 싶어도 최적화된 코드 때문에 디버거가 건너뛸 수밖에 없거나, 지나갔다가 바로 윗줄로 돌아가서 다시 실행하는 라인이 있다는 의미)

![flow](/post-img/golang-debugging-what-you-deploy/debugging-what-you-deploy.svg)

_Flaws like this make it easy to lose track of where you are when stepping through a program and interfere with hitting breakpoints._

_Go 1.11 and 1.12 record statement boundary information and do a better job of tracking source line numbers through optimizations and inlining. As a result, in Go 1.12, stepping through this code stops on every line and does so in the order you would expect._

이런 문제로 인해 프로그램을 단계별로 실행하고 브레이크 포인트를 잡을 때 흐름을 놓칠 수 있었습니다.

그러나 Go 1.11과 1.12에서는 구문의 경계(statement boundary) 정보를 기록해 두기 때문에, 최적화되었거나 인라이닝된 소스 코드의 라인 넘버를 예전보다 더 잘 추적합니다. 따라서, Go 1.12에서 위의 코드를 디버거로 단계별로 실행하면 모든 라인에서 멈추고 개발자가 기대하는 순서대로 진행됩니다.

# Function calls

**함수 호출**

_Function call support in Delve is still under development, but simple cases work. For example:_

Delve에서의 함수 호출은 아직 개발 중입니다. 하지만 다음 예와 같이 간단한 경우는 지원합니다.

(역: `fib(6)`를 호출하여 여섯 번째 피보나치 수를 얻은 것으로 보입니다.)

```text
(dlv) call fib(6)
> main.main() ./hello.go:15 (PC: 0x49d648)
Values returned:
    ~r1: 8
```

# The path forward

**앞으로의 발전 방향**

_Go 1.12 is a step toward a better debugging experience for optimized binaries and we have plans to improve it even further._

_There are fundamental tradeoffs between debuggability and performance, so we’re focusing on the highest-priority debugging defects, and working to collect automated metrics to monitor our progress and catch regressions._

_We’re focusing on generating correct information for debuggers about variable locations, so if a variable can be printed, it is printed correctly. We’re also looking at making variable values available more of the time, particularly at key points like call sites, though in many cases improving this would require slowing down program execution. Finally, we’re working on improving stepping: we’re focusing on the order of stepping with panics, the order of stepping around loops, and generally trying to follow source order where possible._

Go 1.12는 더욱 최적화된 바이너리의 빌드를 목표로 하는 더 나은 디버깅 경험을 위한 한 걸음입니다. 그리고 우리는 다양한 개선 계획도 갖고 있습니다.

디버깅 편의(debuggability)와 성능(performance) 사이에는 근본적인 트레이드 오프가 존재합니다. 따라서 우리는 디버깅할 때의 문제점 중 우선순위가 가장 높은 것들부터 초점을 맞추고 있습니다. 그리고 작업 진행 상태의 확인과 퇴행(regressions) 방지를 위해 자동화된 분석 결과를 수집하는 작업을 하고 있습니다.

한편 우리는 디버거에 제공할 변수의 위치 정보를 정확히 생성하는 작업에도 집중하고 있습니다.
그로 인해 변수를 정확히 출력할 수 있게 됩니다.

또한 프로그램의 실행이 좀 느려지더라도 변숫값들을 더 다양한 경우에 사용할 수 있는 방법도 찾고 있습니다.
특히 호출 지점과 같은 키 포인트가 되는 곳에서 유용할 것입니다.

마지막으로, 우리는 단계별 실행(stepping)을 개선하기 위해 노력하고 있습니다. Panic 이 일어나는 경우의 순서라던가 루프 중일 때의 순서 등을 개선하여, 일반적으로 가능한 한 소스 코드의 순서를 따르게 하려 합니다.

# A note on macOS support

**macOS 지원에 대한 참고 사항**

_Go 1.11 started compressing debug information to reduce binary sizes. This is natively supported by Delve, but neither LLDB nor GDB support compressed debug info on macOS. If you are using LLDB or GDB, there are two workarounds: build binaries with -ldflags=-compressdwarf=false, or use [splitdwarf](https://godoc.org/golang.org/x/tools/cmd/splitdwarf ) (go get golang.org/x/tools/cmd/splitdwarf) to decompress the debug information in an existing binary._

_By David Chase_

Go 1.11은 바이너리의 크기를 줄이기 위해 디버그 정보를 압축하기 시작했습니다.
이 기능은 Delve에서는 기본적으로 지원되지만, LLDB나 GDB의 경우 macOS에서는 압축된 디버그 정보를 지원하지 않습니다.
만약 LLDB나 GDB를 사용하고 있다면 두 가지 해결 방법이 있습니다.
`-ldflags=-compressdwarf=false` 옵션을 써서 바이너리를 빌드하거나,
splitdwarf를 사용하여 바이너리에 들어 있는 디버그 정보의 압축을 풀면 됩니다.
splitdwarf는 `go get golang.org/x/tools/cmd/splitdwarf` 명령으로 얻을 수 있습니다.

_By David Chase_

# License 관련 사항

* 이 번역문의 원문은 [Creative Commons Attribution 3.0 라이센스](https://creativecommons.org/licenses/by/3.0/deed.ko )를 따릅니다.
* 이 번역문의 원문에 첨부된 코드는 [BSD license](https://golang.org/LICENSE )를 따릅니다.
* 이 번역문의 원문 주소는 <https://blog.golang.org/debugging-what-you-deploy > 입니다.
* 번역하는 과정에서 상당한 의역과 임의의 내용 추가가 있었습니다.
