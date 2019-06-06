---
layout  : wiki
title   : (번역) Go Modules 사용하기
summary : Using Go Modules
date    : 2019-06-02 23:23:24 +0900
updated : 2019-06-06 18:47:44 +0900
tag     : golang 번역 the-go-blog
toc     : true
public  : true
parent  : Go-Blog-translation
latex   : false
---
* TOC
{:toc}

* 원문: [Using Go Modules By Tyler Bui-Palsulich and Eno Compton](https://blog.golang.org/using-go-modules ) (2019-03-19)
* 의역이 많으며 오역이 있을 수 있습니다.
* (역: ...) 은 원문에 없는 말을 이해를 돕기 위해 제가 추가한 것입니다.

# Introduction

**서문**

_Go 1.11 and 1.12 include preliminary [support for modules](https://golang.org/doc/go1.11#modules ),
Go's [new dependency management system](https://blog.golang.org/versioning-proposal ) that makes dependency version information explicit and easier to manage. This blog post is an introduction to the basic operations needed to get started using modules. A followup post will cover releasing modules for others to use._

_A module is a collection of [Go packages](https://golang.org/ref/spec#Packages ) stored in a file tree with a go.mod file at its root. The go.mod file defines the module’s module path, which is also the import path used for the root directory, and its dependency requirements, which are the other modules needed for a successful build. Each dependency requirement is written as a module path and a specific [semantic version](http://semver.org/ )._

_As of Go 1.11, the go command enables the use of modules when the current directory or any parent directory has a go.mod, provided the directory is outside $GOPATH/src.
(Inside $GOPATH/src, for compatibility, the go command still runs in the old GOPATH mode, even if a go.mod is found. See the go command documentation for details.)
Starting in Go 1.13, module mode will be the default for all development._

_This post walks through a sequence of common operations that arise when developing Go code with modules:_

* _Creating a new module._
* _Adding a dependency._
* _Upgrading dependencies._
* _Adding a dependency on a new major version._
* _Upgrading a dependency to a new major version._
* _Removing unused dependencies._

Go 1.11과 1.12에는 새로운 디펜던시 관리 시스템인 모듈(modules)의 예비 지원이 추가됩니다.
모듈은 Go의 새로운 디펜던시 관리 시스템이고, 디펜던시 버전 명시와 관리를 쉽게 할 수 있도록 도와줍니다.
이 블로그 포스트는 모듈 기능을 처음으로 사용하는 데에 필요한 기본적인 작업들을 소개합니다.
그리고 이어지는 포스트는 모듈을 배포하는 방법을 다루게 될 것입니다.

모듈은 `go.mod` 파일이 루트 디렉터리에 있는 파일 트리에 저장된 Go 패키지의 모음입니다.
`go.mod` 파일은 모듈의 모듈 경로(module path)를 정의하며, 여기에서 모듈 경로는 모듈의 루트 디렉터리이기도 한 import path 입니다.
한편, `go.mod` 파일은 빌드에 필요한 각각의 디펜던시도 정의하며 각각의 디펜던시는 모듈 경로와 semantic version으로 명시됩니다.

Go 1.11 에서 작업 경로가 `$GOPATH/src`의 바깥이며, 작업 경로나 그 부모 경로에 `go.mod` 파일이 있다면 go 커맨드는 모듈 기능을 활성화합니다. (호환성을 위해 `go.mod` 파일이 있더라도 작업 경로가 `$GOPATH/src` 하위의 경로라면 기존의 GOPATH 모드로 작동합니다.)
Go 1.13부터는 모듈 모드가 디폴트 설정이 될 예정입니다.

이 포스트에서 소개할 module 작업은 다음과 같습니다.

* 새로운 모듈 만들기
* 디펜던시 추가
* 디펜던시 업그레이드
* 새로운 메이저 버전에 디펜던시 추가
* 디펜던시를 새로운 메이저 버전으로 업그레이드
* 사용하지 않는 디펜던시 제거

# Creating a new module

**새로운 모듈 만들기**

_Let's create a new module._

_Create a new, empty directory somewhere outside $GOPATH/src, cd into that directory, and then create a new source file, hello.go:_

새로운 모듈을 만들어 봅시다.

`$GOPATH/src` 바깥의 경로에 새로운 디렉터리를 하나 만들고 다음과 같은 `hello.go`파일을 하나 만들어 봅시다.

```go
package hello

func Hello() string {
    return "Hello, world."
}
```

_Let's write a test, too, in hello_test.go:_

`hello_test.go`라는 이름으로 테스트 코드도 작성해줍시다.

```go
package hello

import (
    "testing"
)

func TestHello(t *testing.T) {
    want := "Hello, world."
    if got := Hello(); got != want {
        t.Errorf("Hello() = %q, want %q", got, want)
    }
}
```

_At this point, the directory contains a package, but not a module, because there is no go.mod file. If we were working in /home/gopher/hello and ran go test now, we'd see:_

이 시점에서 이 디렉터리에는 패키지는 있지만, 모듈은 없습니다.
왜냐하면 여기엔 `go.mod` 파일이 없기 때문입니다.

만약 현재 디렉터리가 `/home/gopher/hello`이고, `go test`를 실행한다면 다음과 같은 결과가 나올 것입니다.

```
$ go test
PASS
ok      _/home/gopher/hello    0.020s
$
```

<em>
The last line summarizes the overall package test. Because we are working outside $GOPATH and also outside any module, the go command knows no import path for the current directory and makes up a fake one based on the directory name: _/home/gopher/hello.
</em>

_Let's make the current directory the root of a module by using go mod init and then try go test again:_

마지막 라인은 전체 패키지 테스트의 요약입니다. (역: `_`로 시작하는 이상한 경로에 주목.)
우리는 `$GOPATH` 외부에서 작업하고 있는 데다가, 이 디렉터리는 모듈도 아닙니다.
그래서 go 커맨드는 import path를 알 수 없으므로 현재 디렉터리 이름을 사용해 `_/home/gopher/hello`라는 이름의 가짜 경로를 만든 것입니다.

`go mod init` 명령을 써서 현재 디렉터리를 모듈 루트로 만들고, `go test`를 다시 실행해 봅시다.

```
$ go mod init example.com/hello
go: creating new go.mod: module example.com/hello
$ go test
PASS
ok      example.com/hello    0.020s
$
```

(역:  마지막 줄을 살펴보면 `_`로 시작하는 경로가 아니라 `go mod init`으로 지정한 경로로 바뀌어 나옵니다)

_Congratulations! You’ve written and tested your first module._

_The go mod init command wrote a go.mod file:_

처음으로 모듈을 만들고 테스트한 것을 축하합니다!

`go mod init` 명령은 `go.mod` 파일을 생성했으며, 그 내용은 다음과 같습니다.

```
$ cat go.mod
module example.com/hello

go 1.12
$
```

_The go.mod file only appears in the root of the module.
Packages in subdirectories have import paths consisting of the module path plus the path to the subdirectory.
For example, if we created a subdirectory world, we would not need to (nor want to) run go mod init there.
The package would automatically be recognized as part of the example.com/hello module,
with import path example.com/hello/world._

`go.mod` 파일은 모듈의 루트에만 만들어집니다.
그리고 하위 디렉터리의 패키지들은 각자 '모듈 패스 + 상대 경로'로 이루어진 import path를 자동으로 갖게 됩니다.
예를 들어, `world`라는 이름의 하위 디렉터리를 만들었다면 `world`로 들어가서 `go mod init` 명령을 실행할 할 필요가 없는 것입니다(하고 싶지도 않습니다).
각 패키지는 자동으로 `example.com/hello` 모듈의 부분으로 인식되므로, 결과적으로 `world`의 import path는 `example.com/hello/world`가 됩니다.

# Adding a dependency

**디펜던시 추가하기**

_The primary motivation for Go modules was to improve the experience of using (that is, adding a dependency on) code written by other developers._

_Let's update our hello.go to import rsc.io/quote and use it to implement Hello:_

Go 모듈을 만든 주된 이유는 다른 개발자들이 작성한 코드를 사용하는 경험(즉, 디펜던시를 추가하는 작업)을 더 좋게 향상시키기 위함이었습니다.

이제 우리의 `hello.go`를 업데이트해 봅시다. 이번에 할 작업은 `rsc.io/quote`를 import하고 그것을 사용해 Hello를 구현하는 것입니다.

```go
package hello

import "rsc.io/quote"

func Hello() string {
    return quote.Hello()
}
```

_Now let’s run the test again:_

테스트를 다시 돌려 봅시다.

```
$ go test
go: finding rsc.io/quote v1.5.2
go: downloading rsc.io/quote v1.5.2
go: extracting rsc.io/quote v1.5.2
go: finding rsc.io/sampler v1.3.0
go: finding golang.org/x/text v0.0.0-20170915032832-14c0d48ead0c
go: downloading rsc.io/sampler v1.3.0
go: extracting rsc.io/sampler v1.3.0
go: downloading golang.org/x/text v0.0.0-20170915032832-14c0d48ead0c
go: extracting golang.org/x/text v0.0.0-20170915032832-14c0d48ead0c
PASS
ok      example.com/hello    0.023s
$
```

_The go command resolves imports by using the specific dependency module versions listed in go.mod. When it encounters an import of a package not provided by any module in go.mod, the go command automatically looks up the module containing that package and adds it to go.mod, using the latest version. ("Latest" is defined as the latest tagged stable (non-[prerelease](https://semver.org/#spec-item-9 )) version, or else the latest tagged prerelease version, or else the latest untagged version.) In our example, go test resolved the new import rsc.io/quote to the module rsc.io/quote v1.5.2. It also downloaded two dependencies used by rsc.io/quote, namely rsc.io/sampler and golang.org/x/text. Only direct dependencies are recorded in the go.mod file:_

go 커맨드는 `go.mod` 파일에 나열된 디펜던시 모듈들의 버전을 참고해 각 모듈을 가져옵니다.

만약 어떤 패키지를 가져올 때 `go.mod`에 명시한 버전이 없다면 go 커맨드는 자동으로 해당 패키지가 포함된 모듈의 가장 최신 버전을 찾은 다음, `go.mod`에 추가합니다. ("Latest"는 `latest` 태그가 붙은 stable(non-prerelease) 버전, 또는 `latest` 태그가 붙은 prerelease 버전입니다.)

우리의 예제에서, `go test` 명령을 실행하자 `rsc.io/quote`의 `v1.5.2`를 새롭게 다운받았습니다.
그리고 `rsc.io/quote`가 사용하는 `rsc.io/sampler`와 `golang.org/x/text`라는 두 개의 디펜던시도 함께 다운로드받았습니다.
`go.mod` 파일에는 직접적인 디펜던시들(direct dependencies)만 기록됩니다.

(역: `go.mod` 파일을 보면 `rsc.io/sampler`와 `golang.org/x/text`는 없고 `rsc.io/quote`만 있습니다.)

```
$ cat go.mod
module example.com/hello

go 1.12

require rsc.io/quote v1.5.2
$
```

_A second go test command will not repeat this work, since the go.mod is now up-to-date and the downloaded modules are cached locally (in $GOPATH/pkg/mod):_

이제 `go test` 명령을 또 실행해 보아도, 이런 작업을 반복하지 않습니다.
`go.mod` 파일이 최신판으로 갱신되었고, 다운로드된 모듈들이 로컬(`$GOPATH/pkg/mod`)에 캐시 되었기 때문입니다.

```
$ go test
PASS
ok      example.com/hello    0.020s
$
```

_Note that while the go command makes adding a new dependency quick and easy, it is not without cost. Your module now literally depends on the new dependency in critical areas such as correctness, security, and proper licensing, just to name a few. For more considerations, see Russ Cox's blog post, "Our Software Dependency Problem."_

_As we saw above, adding one direct dependency often brings in other indirect dependencies too. The command go list -m all lists the current module and all its dependencies:_

go 커맨드를 사용하면 새로운 디펜던시를 쉽고 빠르게 추가할 수 있습니다.
그러나 고려해야 할 사항은 아직 있습니다.
당신의 모듈은 이제 정확성, 보안 및 적절한 라이센싱과 같은 중요한 영역의 새로운 의존성을 고려해야 합니다.
자세한 내용은 Russ Cox의 블로그 포스트 "[Our Software Dependency Problem](https://research.swtch.com/deps )"을 읽어보세요.

위에서 본 것처럼, 하나의 직접적인 디펜던시를 추가하면 간접적인 디펜던시들이 여럿 추가될 수 있습니다.
`go list -m all` 명령을 쓰면 현재 모듈과 모든 디펜던시의 목록을 보여줍니다.

```
$ go list -m all
example.com/hello
golang.org/x/text v0.0.0-20170915032832-14c0d48ead0c
rsc.io/quote v1.5.2
rsc.io/sampler v1.3.0
$
```

_In the go list output, the current module, also known as the main module, is always the first line, followed by dependencies sorted by module path._

_The golang.org/x/text version v0.0.0-20170915032832-14c0d48ead0c is an example of a [pseudo-version](https://golang.org/cmd/go/#hdr-Pseudo_versions ), which is the go command's version syntax for a specific untagged commit._

_In addition to go.mod, the go command maintains a file named go.sum containing the expected [cryptographic hashes](https://golang.org/cmd/go/#hdr-Module_downloading_and_verification ) of the content of specific module versions:_

`go list`의 출력에서 첫 번째 줄은 현재 모듈을 의미합니다.
그 아랫줄부터는 모듈 경로 기준으로 정렬된 디펜던시 목록입니다.

`golang.org/x/text` 오른쪽의 버전 `v0.0.0-20170915032832-14c0d48ead0c`는 의사 버전(pseudo-version)의 한 예라 할 수 있습니다. 이런 의사 버전은 버전 태그가 없는 커밋에 대해 go가 붙여주는 버전 형식입니다.

go 커맨드는 `go.mod`외에도 `go.sum`이라는 파일을 만들고 관리합니다.
`go.sum`은 특정 버전의 모듈들의 내용으로 만든 암호화 해시값을 갖고 있습니다.

```
$ cat go.sum
golang.org/x/text v0.0.0-20170915032832-14c0d48ead0c h1:qgOY6WgZO...
golang.org/x/text v0.0.0-20170915032832-14c0d48ead0c/go.mod h1:Nq...
rsc.io/quote v1.5.2 h1:w5fcysjrx7yqtD/aO+QwRjYZOKnaM9Uh2b40tElTs3...
rsc.io/quote v1.5.2/go.mod h1:LzX7hefJvL54yjefDEDHNONDjII0t9xZLPX...
rsc.io/sampler v1.3.0 h1:7uVkIFmeBqHfdjD+gZwtXXI+RODJ2Wc4O7MPEh/Q...
rsc.io/sampler v1.3.0/go.mod h1:T1hPZKmBbMNahiBKFy5HrXp6adAjACjK9...
$
```

_The go command uses the go.sum file to ensure that future downloads of these modules retrieve the same bits as the first download, to ensure the modules your project depends on do not change unexpectedly, whether for malicious, accidental, or other reasons. Both go.mod and go.sum should be checked into version control._

go 커맨드는 `go.sum` 파일을 참고하여 처음 다운로드받은 모듈과 나중에 다운로드받는 모듈이
같은 비트를 갖는지를 검사합니다.
그를 통해 악의/우연적인 이유 또는 기타 등등의 복잡한 이유로
프로젝트가 의존하는 모듈이 예상치 못하게 변형되는 일을 방지합니다.
즉, `go.mod`와 `go.sum` 모두 버전 관리 도구에 체크되어야 합니다.


# Upgrading dependencies

**디펜던시 업그레이드하기**

_With Go modules, versions are referenced with semantic version tags.
A semantic version has three parts: major, minor, and patch.
For example, for v0.1.2, the major version is 0, the minor version is 1, and the patch version is 2.
Let's walk through a couple minor version upgrades.
In the next section, we’ll consider a major version upgrade._

_From the output of go list -m all, we can see we're using an untagged version of golang.org/x/text. Let's upgrade to the latest tagged version and test that everything still works:_

Go 모듈은 semantic version 태그 형식의 버전을 참조합니다.
semantic version은 메이저, 마이너, 패치의 세 부분으로 구성됩니다.
가령, v0.1.2의 경우 메이저 버전은 **0**이고 마이너 버전은 **1**이며 패치 버전은 **2**입니다.

이제 마이너 버전 업그레이드 작업을 직접 해봅시다.
그리고 다음 섹션에서는 메이저 버전 업그레이드를 수행할 것입니다.

`go list -m all` 명령을 실행했을 때 화면에 출력된 결과를 보면 `golang.org/x/text`의 untagged version을 사용하고 있음을 알 수 있습니다. 이제 이것을 latest tagged version으로 업그레이드하고 잘 돌아가는지 테스트해 봅시다.

```
$ go get golang.org/x/text
go: finding golang.org/x/text v0.3.0
go: downloading golang.org/x/text v0.3.0
go: extracting golang.org/x/text v0.3.0
$ go test
PASS
ok      example.com/hello    0.013s
$
```

_Woohoo! Everything passes. Let's take another look at go list -m all and the go.mod file:_

잘 돌아가네요. `go list -m all`과 `go.mod` 파일을 다시 살펴봅시다.

```
$ go list -m all
example.com/hello
golang.org/x/text v0.3.0
rsc.io/quote v1.5.2
rsc.io/sampler v1.3.0
$ cat go.mod
module example.com/hello

go 1.12

require (
    golang.org/x/text v0.3.0 // indirect
    rsc.io/quote v1.5.2
)
$
```

_The golang.org/x/text package has been upgraded to the latest tagged version (v0.3.0).
The go.mod file has been updated to specify v0.3.0 too.
The indirect comment indicates a dependency is not used directly by this module,
only indirectly by other module dependencies. See go help modules for details._

_Now let's try upgrading the rsc.io/sampler minor version.
Start the same way, by running go get and running tests:_

`golang.org/x/text` 패키지가 latest tagged version(v0.3.0)으로 업그레이드되었습니다.
`go.mod` 파일에도 `v0.3.0`으로 업데이트되었네요.
`// indirect` 주석은 모듈이 해당 디펜던시를 직접적으로 사용하지 않으며,
다른 모듈 디펜던시들에 의해 간접적으로 사용되고 있음을 의미합니다.
자세한 내용은 `go help modules` 명령으로 확인해보세요.

이제 `rsc.io/sampler`의 마이너 버전을 업그레이드해 봅시다.
앞에서와 똑같은 방법으로 `go get` 명령을 실행하고 테스트를 돌려 봅시다.

```
$ go get rsc.io/sampler
go: finding rsc.io/sampler v1.99.99
go: downloading rsc.io/sampler v1.99.99
go: extracting rsc.io/sampler v1.99.99
$ go test
--- FAIL: TestHello (0.00s)
    hello_test.go:8: Hello() = "99 bottles of beer on the wall, 99 bottles of beer, ...", want "Hello, world."
FAIL
exit status 1
FAIL    example.com/hello    0.014s
$
```

_Uh, oh! The test failure shows that the latest version of rsc.io/sampler is incompatible with our usage.
Let's list the available tagged versions of that module:_

앗! 테스트가 실패한 것을 보니 `rsc.io/sampler`의 최신 버전이 우리의 코드 사용과 호환되지 않는 모양입니다.
문제가 된 모듈의 사용 가능한 tagged version 목록을 봐봅시다.

```
$ go list -m -versions rsc.io/sampler
rsc.io/sampler v1.0.0 v1.2.0 v1.2.1 v1.3.0 v1.3.1 v1.99.99
$
```

_We had been using v1.3.0; v1.99.99 is clearly no good.  Maybe we can try using v1.3.1 instead:_

우리는 `v1.3.0`을 쓰고 있을 때 잘 돌아가는 걸 확인했었습니다.
`v1.99.99`는 테스트가 실패한 버전입니다. `v1.3.1`을 한번 사용해 보기로 하겠습니다.

```
$ go get rsc.io/sampler@v1.3.1
go: finding rsc.io/sampler v1.3.1
go: downloading rsc.io/sampler v1.3.1
go: extracting rsc.io/sampler v1.3.1
$ go test
PASS
ok      example.com/hello    0.022s
$
```

_Note the explicit @v1.3.1 in the go get argument. In general each argument passed to go get can take an explicit version; the default is @latest, which resolves to the latest version as defined earlier._

`go get` 명령어를 사용할 때 `@v1.3.1`을 명시한 것에 주목하세요.
일반적으로 `go get` 명령어 인자에 버전을 명시할 수 있습니다.
기본값은 `@latest`이며 이 값은 최신 버전을 뜻합니다.

# Adding a dependency on a new major version

**새로운 메이저 버전을 가진 디펜던시 추가하기**

_Let's add a new function to our package:
func Proverb returns a Go concurrency proverb, by calling quote.Concurrency,
which is provided by the module rsc.io/quote/v3.
First we update hello.go to add the new function:_

우리의 패키지에 새로운 함수를 추가해 봅시다.
`func Proverb`는 `rsc.io/quote/v3`모듈의 `quote.Concurrency`가 호출하게 되며, Go의 concurrency 격언 문구를 리턴합니다.
일단 `hello.go`에 새로운 함수를 추가하여 업데이트해 봅시다.

```go
package hello

import (
    "rsc.io/quote"
    quoteV3 "rsc.io/quote/v3"
)

func Hello() string {
    return quote.Hello()
}

func Proverb() string {
    return quoteV3.Concurrency()
}
```

_Then we add a test to hello_test.go:_

그리고 `hello_test.go`에 테스트 코드도 추가해 줍시다.

```go
func TestProverb(t *testing.T) {
    want := "Concurrency is not parallelism."
    if got := Proverb(); got != want {
        t.Errorf("Proverb() = %q, want %q", got, want)
    }
}
```

_Then we can test our code:_

테스트를 돌려 봅시다.

```
$ go test
go: finding rsc.io/quote/v3 v3.1.0
go: downloading rsc.io/quote/v3 v3.1.0
go: extracting rsc.io/quote/v3 v3.1.0
PASS
ok      example.com/hello    0.024s
$
```

_Note that our module now depends on both rsc.io/quote and rsc.io/quote/v3:_

우리 모듈이 이제 `rsc.io/quote`와 `rsc.io/quote/v3`를 디펜던시로 갖고 있습니다.

```
$ go list -m rsc.io/q...
rsc.io/quote v1.5.2
rsc.io/quote/v3 v3.1.0
$
```

_Each different major version (v1, v2, and so on) of a Go module uses a different module path:
starting at v2, the path must end in the major version.
In the example, v3 of rsc.io/quote is no longer rsc.io/quote: instead,
it is identified by the module path rsc.io/quote/v3.
This convention is called [semantic import versioning](https://research.swtch.com/vgo-import ),
and it gives incompatible packages (those with different major versions) different names.
In contrast, v1.6.0 of rsc.io/quote should be backwards-compatible with v1.5.2,
so it reuses the name rsc.io/quote.
(In the previous section, rsc.io/sampler v1.99.99 should have been backwards-compatible with rsc.io/sampler v1.3.0, but bugs or incorrect client assumptions about module behavior can both happen.)_

_The go command allows a build to include at most one version of any particular module path,
meaning at most one of each major version:
one rsc.io/quote, one rsc.io/quote/v2, one rsc.io/quote/v3, and so on.
This gives module authors a clear rule about possible duplication of a single module path:
it is impossible for a program to build with both rsc.io/quote v1.5.2 and rsc.io/quote v1.6.0.
At the same time, allowing different major versions of a module (because they have different paths) gives module consumers the ability to upgrade to a new major version incrementally.
In this example, we wanted to use quote.Concurrency from rsc/quote/v3 v3.1.0 but are not yet ready to migrate our uses of rsc.io/quote v1.5.2.
The ability to migrate incrementally is especially important in a large program or codebase._

Go 모듈의 주요 버전(v1, v2 등)들은 각자 다른 모듈 경로를 사용합니다.
v2부터 살펴보면, 경로는 메이저 버전으로 끝나야 합니다.
이 예시에서 `rsc.io/quote`의 v3은 더 이상 `rsc.io/quote`가 아니라,
`rsc.io/quote/v3`이라는 모듈 경로로 식별됩니다.

이러한 규칙은 semantic import versioning이라 하는데, 호환되지 않는 패키지들(메이저 버전이 다르다던가)이 각기 다른 이름을 갖도록 하는 방법입니다.

한편, `rsc.io/quote`의 `v1.6.0`은 `v1.5.2`와 역 호환되므로 `rsc.io/quote`라는 이름을 사용합니다.
(이전 섹션에서 `rsc.io/sampler` `v1.99.99`는 `v1.3.0`과 역 호환이 가능해야 했을 것입니다. 그러나 버그라던가 모듈의 동작을 착각하고 잘못 구현하는 등의 일이 일어날 수 있습니다.)

go 커맨드는 빌드에 있어 특정 모듈 경로별로 최대 하나씩의 버전을 포함하는 것을 허용합니다.
이는 각 메이저 버전당 최대 하나의 버전을 가질 수 있음을 의미합니다. (역: 메이저 버전별로 모듈 경로의 postfix가 달라지기 때문에, path 하나에 version 하나를 매핑하는 심플한 key value 규칙인 셈입니다.)

예를 들면 `rsc.io/quote`과 `rsc.io/quote/v2`, `rsc.io/quote/v3`에 대해 각자 하나씩의 버전만 허용되는 식입니다.

이 방식은 하나의 모듈 경로를 두고 일어날 수 있는 버전 중복 문제에 대한 명확한 규칙을 제공합니다.
가령, `rsc.io/quote`를 사용하는 프로그램을 빌드할 때 `rsc.io/quote` `v1.5.2`도 쓰고 `rsc.io/quote` `v1.6.0`도 쓰는 것은 불가능합니다.
그러면서도 다른 메이저 버전을 허용하기 때문에(모듈 경로가 다르므로) 점진적으로 새로운 메이저 버전으로 업그레이드하는 것도 가능합니다.

이 예제에서 우리는 `rsc/quote/v3`의 `quote.Concurrency`를 `v1.5.2`에서 `v3.1.0`으로
마이그레이션 하고 싶었지만 아직 준비되지 않은 상태입니다.
점진적인 마이그레이션이 가능한 것은 특히 대규모의 코드 베이스를 가진 프로그램에 있어 매우 중요합니다.


# Upgrading a dependency to a new major version

**디펜던시를 새로운 메이저 버전으로 업그레이드하기**

_Let's complete our conversion from using rsc.io/quote to using only rsc.io/quote/v3.
Because of the major version change,
we should expect that some APIs may have been removed, renamed, or otherwise changed in incompatible ways.
Reading the docs, we can see that Hello has become HelloV3:_

이제 `rsc.io/quote`를 `rsc.io/quote/v3`으로 컨버전하는 작업을 해 봅시다.
메이저 버전을 변경으로 인해 일부 API가 사라지거나 이름이 바뀌거나, 그 외의 다른 변경이 일어나는 등의 호환성 문제가 발생할 수 있음을 예상해야 합니다.
문서를 읽어보면, `Hello`가 `HelloV3`으로 변경된 것을 알 수 있습니다.

```text
$ go doc rsc.io/quote/v3
package quote // import "rsc.io/quote"

Package quote collects pithy sayings.

func Concurrency() string
func GlassV3() string
func GoV3() string
func HelloV3() string
func OptV3() string
$
```

_(There is also a [known bug](https://golang.org/issue/30778 ) in the output; the displayed import path has incorrectly dropped the /v3.)_

_We can update our use of quote.Hello() in hello.go to use quoteV3.HelloV3():_

출력 결과를 보면 import path에서 `/v3`가 빠져 있는 버그가 있는데, 이미 알려진 버그입니다.)

이제 우리는 `hello.go`의 `quote.Hello()`를 `quoteV3.HelloV3()`으로 업데이트할 수 있습니다.

```go
package hello

import quoteV3 "rsc.io/quote/v3"

func Hello() string {
    return quoteV3.HelloV3()
}

func Proverb() string {
    return quoteV3.Concurrency()
}
```

_And then at this point, there's no need for the renamed import anymore, so we can undo that:_

그리고 이제부터는 이름을 수정한 import를 쓸 필요가 없으므로 제거해 주도록 합시다.

```go
package hello

import "rsc.io/quote/v3"

func Hello() string {
    return quote.HelloV3()
}

func Proverb() string {
    return quote.Concurrency()
}
```

_Let's re-run the tests to make sure everything is working:_

테스트를 다시 돌려 보면 잘 돌아갑니다.

```
$ go test
PASS
ok      example.com/hello       0.014s
```

# Removing unused dependencies

**사용하지 않는 디펜던시 제거하기**

_We've removed all our uses of rsc.io/quote, but it still shows up in go list -m all and in our go.mod file:_

우리는 `rsc.io/quote`를 사용하는 코드를 모두 제거했습니다.
그러나 `go list -m all` 명령을 입력해보거나 `go.mod` 파일을 확인해 보면 아직 사라지지 않고 남아 있다는 것을 알 수 있습니다.

```
$ go list -m all
example.com/hello
golang.org/x/text v0.3.0
rsc.io/quote v1.5.2
rsc.io/quote/v3 v3.1.0
rsc.io/sampler v1.3.1
$ cat go.mod
module example.com/hello

go 1.12

require (
    golang.org/x/text v0.3.0 // indirect
    rsc.io/quote v1.5.2
    rsc.io/quote/v3 v3.0.0
    rsc.io/sampler v1.3.1 // indirect
)
$
```

_Why? Because building a single package, like with go build or go test, can easily tell when something is missing and needs to be added, but not when something can safely be removed.
Removing a dependency can only be done after checking all packages in a module, and all possible build tag combinations for those packages.
An ordinary build command does not load this information, and so it cannot safely remove dependencies._

_The go mod tidy command cleans up these unused dependencies:_

왜 그럴까요? `go build`나 `go test`와 같은 명령으로 싱글 패키지를 빌드해보면, 뭔가 빠졌다던가 뭔가 추가해야 한다든가 하는 것들은 쉽게 알아낼 수 있습니다. 그러나 무언가가 없어도 된다고 말하는 것은 어려운 일입니다.
디펜던시 제거는 모듈의 모든 패키지를 체크하고, 해당 패키지의 가능한 모든 빌드 태그 조합을 확인한 후에나 할 수 있는 일입니다.
일반적인 빌드 명령은 이러한 정보를 로드하지 않으므로 디펜던시를 안전하게 제거할 수 없습니다.

`go mod tidy` 명령은 다음과 같이 사용하지 않는 디펜던시를 제거합니다.

```
$ go mod tidy
$ go list -m all
example.com/hello
golang.org/x/text v0.3.0
rsc.io/quote/v3 v3.1.0
rsc.io/sampler v1.3.1
$ cat go.mod
module example.com/hello

go 1.12

require (
    golang.org/x/text v0.3.0 // indirect
    rsc.io/quote/v3 v3.1.0
    rsc.io/sampler v1.3.1 // indirect
)

$ go test
PASS
ok      example.com/hello    0.020s
$
```

# Conclusion

**결론**

_Go modules are the future of dependency management in Go.
Module functionality is now available in all supported Go versions (that is, in Go 1.11 and Go 1.12)._

_This post introduced these workflows using Go modules:_

* _go mod init creates a new module, initializing the go.mod file that describes it._
* _go build, go test, and other package-building commands add new dependencies to go.mod as needed._
* _go list -m all prints the current module’s dependencies._
* _go get changes the required version of a dependency (or adds a new dependency)._
* _go mod tidy removes unused dependencies._

_We encourage you to start using modules in your local development and to add go.mod and go.sum files to your projects.
To provide feedback and help shape the future of dependency management in Go, please send us [bug reports](https://golang.org/issue/new ) or [experience reports](https://golang.org/wiki/ExperienceReports )._

_Thanks for all your feedback and help improving modules._

_By Tyler Bui-Palsulich and Eno Compton_

Go 모듈은 Go의 디펜던시 관리의 미래입니다.
모듈 기능은 현재 지원되는 모든 Go 버전(Go 1.11, 1.12)에서 사용할 수 있습니다.

이 포스트는 Go 모듈을 사용하는 작업 흐름을 소개하였습니다.

* `go mod init`은 새로운 모듈을 생성하고, 모듈을 설명하는 `go.mod` 파일을 초기화합니다.
* `go build`와 `go test`, 그 외의 패키지 빌드 커맨드들은 필요에 따라 `go.mod`에 새로운 디펜던시를 추가합니다.
* `go list -m all`은 현재 모듈의 디펜던시 목록을 보여줍니다.
* `go get`은 필요한 버전의 디펜던시를 변경하거나 새로운 디펜던시를 추가합니다.
* `go mod tidy`는 사용하지 않는 디펜던시를 제거합니다.

당신의 로컬 개발 환경에서 모듈 사용을 시작한다면 `go.mod`와 `go.sum`를 당신의 프로젝트에 추가하세요.
피드백을 제공하고 싶거나 Go의 디펜던시 관리의 미래에 도움이 되고 싶다면 버그 리포트나 경험 보고서를 보내주세요.

여러분의 모든 피드백과 모듈을 향상하는 데 주신 도움에 감사드립니다.

_By Tyler Bui-Palsulich and Eno Compton_

# License 관련 사항

* 이 번역문의 원문은 [Creative Commons Attribution 3.0 라이센스](https://creativecommons.org/licenses/by/3.0/deed.ko )를 따릅니다.
* 이 번역문의 원문에 첨부된 코드는 [BSD license](https://golang.org/LICENSE )를 따릅니다.
* 이 번역문의 원문 주소는 <https://blog.golang.org/using-go-modules > 입니다.
* 번역하는 과정에서 상당한 의역과 임의의 내용 추가가 있었습니다.

# Links

* [Using Go Modules](https://blog.golang.org/using-go-modules )
* [Go & Versioning](https://research.swtch.com/vgo )
* [Defining Go Modules(Go & Versioning, Part 6)](https://research.swtch.com/vgo-module )
* [Should I add the go.sum file to the repo of a library? (reddit)](https://www.reddit.com/r/golang/comments/97dxj1/should_i_add_the_gosum_file_to_the_repo_of_a/ )
