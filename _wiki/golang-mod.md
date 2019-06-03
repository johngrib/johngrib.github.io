---
layout  : wiki
title   : (번역) Go Modules 사용하기
summary : 
date    : 2019-06-02 23:23:24 +0900
updated : 2019-06-03 23:56:40 +0900
tags    : golang
toc     : true
public  : true
parent  : Golang
latex   : false
---
* TOC
{:toc}

* [The Go Blog](https://blog.golang.org/ )의 [Using Go Modules](https://blog.golang.org/using-go-modules )를 번역한 글입니다.
* 의역이 많으며 오역이 있을 수 있습니다.
* (역: ...) 은 원문에 없는 말을 이해를 돕기 위해 제가 추가한 것입니다.

# Introduction

> Go 1.11 and 1.12 include preliminary [support for modules](https://golang.org/doc/go1.11#modules ),
Go's [new dependency management system](https://blog.golang.org/versioning-proposal ) that makes dependency version information explicit and easier to manage. This blog post is an introduction to the basic operations needed to get started using modules. A followup post will cover releasing modules for others to use.

Go 1.11과 1.12에는 새로운 디펜던시 관리 시스템인 모듈(modules)의 예비 지원이 추가됩니다.
모듈은 Go의 새로운 디펜던시 관리 시스템이고, 디펜던시 버전 명시와 관리를 쉽게 할 수 있도록 도와줍니다.
이 블로그 포스트는 모듈 기능을 처음으로 사용하는 데에 필요한 기본적인 작업들을 소개합니다.
그리고 이어지는 포스트는 모듈을 배포하는 방법을 다루게 될 것입니다.

> A module is a collection of [Go packages](https://golang.org/ref/spec#Packages ) stored in a file tree with a go.mod file at its root. The go.mod file defines the module’s module path, which is also the import path used for the root directory, and its dependency requirements, which are the other modules needed for a successful build. Each dependency requirement is written as a module path and a specific [semantic version](http://semver.org/ ).

모듈은 go.mod 파일이 루트 디렉토리에 있는 파일 트리에 저장된 Go 패키지의 모음입니다.
go.mod 파일은 모듈의 모듈 경로(module path)를 정의하며, 여기에서 모듈 경로는 모듈의 루트 디렉토리이기도 한 import path 입니다.
한편, go.mod 파일은 빌드에 필요한 각각의 디펜던시도 정의하며, 각각의 디펜던시는 모듈 경로와 semantic version으로 명시됩니다.

> As of Go 1.11, the go command enables the use of modules when the current directory or any parent directory has a go.mod, provided the directory is outside $GOPATH/src.
(Inside $GOPATH/src, for compatibility, the go command still runs in the old GOPATH mode, even if a go.mod is found. See the go command documentation for details.)
Starting in Go 1.13, module mode will be the default for all development.

Go 1.11 에서 작업 경로가 `$GOPATH/src`의 바깥이며, 작업 경로나 그 부모 경로에 `go.mod` 파일이 있다면 go 커맨드는 모듈 기능을 활성화합니다. (호환성을 위해 `go.mod` 파일이 있더라도 작업 경로가 `$GOPATH/src` 하위의 경로라면 old GOPATH mode 로 돌아갑니다.)
Go 1.13 부터는 모듈 모드가 디폴트 설정이 될 예정입니다.

> This post walks through a sequence of common operations that arise when developing Go code with modules:  
* Creating a new module.
* Adding a dependency.
* Upgrading dependencies.
* Adding a dependency on a new major version.
* Upgrading a dependency to a new major version.
* Removing unused dependencies.

이 포스트에서 소개할 module 작업은 다음과 같습니다.

* 새로운 모듈 만들기
* 디펜던시 추가
* 디펜던시 업그레이드
* 새로운 메이저 버전에 디펜던시 추가
* 디펜던시를 새로운 메이저 버전으로 업그레이드
* 사용하지 않는 디펜던시 제거

# Creating a new module

> Let's create a new module.  
Create a new, empty directory somewhere outside $GOPATH/src, cd into that directory, and then create a new source file, hello.go:

새로운 모듈을 만들어 봅시다.

`$GOPATH/src` 바깥의 경로에 새로운 디렉토리를 하나 만들고 다음과 같은 `hello.go`파일을 하나 만들어 봅시다.

```go
package hello

func Hello() string {
    return "Hello, world."
}
```

> Let's write a test, too, in hello_test.go:

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

> At this point, the directory contains a package, but not a module, because there is no go.mod file. If we were working in /home/gopher/hello and ran go test now, we'd see:

이 시점에서 이 디렉토리에는 패키지는 있지만 모듈은 없습니다.
왜냐하면 여기엔 go.mod 파일이 없기 때문입니다.

만약 현재 디렉토리가 `/home/gopher/hello`이고, `go test`를 실행한다면 다음과 같은 결과가 나올 것입니다.

```
$ go test
PASS
ok  	_/home/hopher/hello	0.020s
```

> The last line summarizes the overall package test. Because we are working outside $GOPATH and also outside any module, the go command knows no import path for the current directory and makes up a fake one based on the directory name: _/home/gopher/hello.  
Let's make the current directory the root of a module by using go mod init and then try go test again:

마지막 라인은 전체 패키지 테스트의 요약입니다. (역: `_`로 시작하는 이상한 경로에 주목.)
우리는 `$GOPATH` 외부에서 작업하고 있는데다가, 이 디렉토리는 모듈도 아닙니다.
그래서 go 커맨드는 import path를 알 수 없으므로 현재 디렉토리 이름을 사용해 `_/home/gopher/hello`라는 이름의 가짜 경로를 만든 것입니다.

`go mod init` 명령을 써서 현재 디렉토리를 모듈 루트로 만들고, `go test`를 다시 실행해 봅시다.

```
$ go mod init example.com/hello
go: creating new go.mod: module example.com/hello

$ go test
PASS
ok  	example.com/hello	0.020s
```

(역:  마지막 줄을 살펴보면 `_`로 시작하는 경로가 아니라 go mod init 으로 지정한 경로로 바뀌어 나옵니다)

> Congratulations! You’ve written and tested your first module.  
The go mod init command wrote a go.mod file:

처음으로 모듈을 만들고 테스트한 것을 축하합니다!

`go mod init` 명령은 `go.mod` 파일을 생성했으며, 그 내용은 다음과 같습니다.

```
$ cat go.mod
module example.com/hello

go 1.12
```

> The go.mod file only appears in the root of the module.
Packages in subdirectories have import paths consisting of the module path plus the path to the subdirectory.
For example, if we created a subdirectory world, we would not need to (nor want to) run go mod init there.
The package would automatically be recognized as part of the example.com/hello module,
with import path example.com/hello/world.

`go.mod` 파일은 모듈의 루트에만 만들어집니다.
그리고 하위 디렉토리의 패키지들은 각자 '모듈 패스 + 상대 경로'로 이루어진 import path를 자동으로 갖게 됩니다.
예를 들어, world 라는 이름의 하위 디렉토리를 만들었다면 world 로 들어가서 `go mod init`명령을 실행할 할 필요가 없는 것입니다(하고 싶지도 않습니다).
각 패키지는 자동으로 `example.com/hello` 모듈의 부분으로 인식므로, 결과적으로 world의 import path 는 `example.com/hello/world` 가 됩니다.

# Adding a dependency

> The primary motivation for Go modules was to improve the experience of using (that is, adding a dependency on) code written by other developers.  
Let's update our hello.go to import rsc.io/quote and use it to implement Hello:

Go 모듈을 만든 주된 이유는 다른 개발자들이 작성한 코드를 사용하는 경험(즉, 디펜던시를 추가하는 작업)을 더 좋게 향상시키기 위함이었습니다.  
이제 우리의 `hello.go`를 업데이트 해봅시다. 이번에 할 작업은 `rsc.io/quote`를 import 하고 그것을 사용해 Hello를 구현하는 것입니다.

```go
package hello

import "rsc.io/quote"

func Hello() string {
    return quote.Hello()
}
```

> Now let’s run the test again:

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

> The go command resolves imports by using the specific dependency module versions listed in go.mod. When it encounters an import of a package not provided by any module in go.mod, the go command automatically looks up the module containing that package and adds it to go.mod, using the latest version. ("Latest" is defined as the latest tagged stable (non-[prerelease](https://semver.org/#spec-item-9 )) version, or else the latest tagged prerelease version, or else the latest untagged version.) In our example, go test resolved the new import rsc.io/quote to the module rsc.io/quote v1.5.2. It also downloaded two dependencies used by rsc.io/quote, namely rsc.io/sampler and golang.org/x/text. Only direct dependencies are recorded in the go.mod file:

go 커맨드는 go.mod 파일에 나열된 디펜던시 모듈들의 버전을 참고해 각 모듈들을 가져옵니다.
만약 어떤 패키지를 가져올 때 go.mod에 명시한 버전이 없다면 go 커맨드는 자동으로 해당 패키지가 포함된 모듈의 가장 최신 버전을 찾은 다음, go.mod 에 추가합니다. ("Latest"는 latest 태그가 붙은 stable(non-prerelease) 버전, 또는 latest 태그가 붙은 prerelease 버전입니다.)
우리의 예제에서, `go test` 명령을 실행하자 `rsc.io/quote`의 v1.5.2를 새롭게 다운받았습니다.
그리고 `rsc.io/quote`가 사용하는 `rsc.io/sampler`와 `golang.org/x/text`라는 두 개의 디펜던시도 함께 다운로드 받았습니다.
go.mod 파일에는 직접적인 디펜던시들(direct dependencies)만 기록됩니다.

(역: go.mod 파일을 보면 `rsc.io/sampler`와 `golang.org/x/text`는 없고 `rsc.io/quote`만 있습니다.)

```
$ cat go.mod
module example.com/hello

go 1.12

require rsc.io/quote v1.5.2
$
```

> A second go test command will not repeat this work, since the go.mod is now up-to-date and the downloaded modules are cached locally (in $GOPATH/pkg/mod):

이제 `go test` 명령을 또 실행해 보아도, 이런 작업을 반복하지 않습니다.
go.mod 파일이 최신판으로 갱신되었고, 다운로드된 모듈들이 로컬($GOPATH/pkg/mod)에 캐시되었기 때문입니다.

```
$ go test
PASS
ok      example.com/hello    0.020s
$
```

>
Note that while the go command makes adding a new dependency quick and easy, it is not without cost. Your module now literally depends on the new dependency in critical areas such as correctness, security, and proper licensing, just to name a few. For more considerations, see Russ Cox's blog post, "Our Software Dependency Problem."

go 커맨드를 사용하면 새로운 디펜던시를 쉽고 빠르게 추가할 수 있습니다.
그러나 고려해야 할 사항은 아직 있습니다.
당신의 모듈은 이제 정확성, 보안 및 적절한 라이센싱과 같은 중요한 영역의 새로운 의존성을 고려해야 합니다.
자세한 내용은 Russ Cox의 블로그 포스트 "[Our Software Dependency Problem](https://research.swtch.com/deps )"을 읽어보세요.

> As we saw above, adding one direct dependency often brings in other indirect dependencies too. The command go list -m all lists the current module and all its dependencies:

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

> In the go list output, the current module, also known as the main module, is always the first line, followed by dependencies sorted by module path.  
The golang.org/x/text version v0.0.0-20170915032832-14c0d48ead0c is an example of a pseudo-version, which is the go command's version syntax for a specific untagged commit.  
In addition to go.mod, the go command maintains a file named go.sum containing the expected cryptographic hashes of the content of specific module versions:

`go list`의 출력에서 첫번째 줄은 현재 모듈을 의미합니다.
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

go 커맨드는 `go.sum` 파일을 참고하여 처음 다운로드 받은 모듈과 나중에 다운로드 받는 모듈이
같은 비트를 갖는지를 검사합니다.
그를 통해 악의/우연적인 이유 또는 기타 등등의 복잡한 이유로
프로젝트가 의존하는 모듈이 예상치 못하게 변형되는 일을 방지합니다.
즉, go.mod 와 go.sum 모두 버전 관리 도구에 체크되어야 합니다.


**현재 작업중입니다.**


# Links

* [Using Go Modules](https://blog.golang.org/using-go-modules )
* [Go & Versioning](https://research.swtch.com/vgo )
* [Defining Go Modules(Go & Versioning, Part 6)](https://research.swtch.com/vgo-module )
* [Should I add the go.sum file to the repo of a library? (reddit)](https://www.reddit.com/r/golang/comments/97dxj1/should_i_add_the_gosum_file_to_the_repo_of_a/ )
