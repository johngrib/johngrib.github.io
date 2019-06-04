---
layout  : wiki
title   : go.mod와 go.sum 도 커밋해야 할까?
summary : 커밋하자
date    : 2019-06-02 23:23:24 +0900
updated : 2019-06-04 21:17:56 +0900
tag     : golang git
toc     : true
public  : true
parent  : Golang
latex   : false
---
* TOC
{:toc}


# 저장소에 go.mod, go.sum 파일을 포함시켜야 할까?

즉, **"git commit에 `go.mod`와 `go.sum`을 포함시켜야 할까?"**

이 문제로 고민하다가 다음 글을 읽게 됐다.

[Should I add the go.sum file to the repo of a library? (reddit)](https://www.reddit.com/r/golang/comments/97dxj1/should_i_add_the_gosum_file_to_the_repo_of_a/e47m38p/ )

* 이 글의 결론은 "Yes".
    * "go.sum 파일을 체크인하면 다른 사람들이 당신과 같은 모듈을 사용하고 있는지 확인하는 데 도움이됩니다."

## go help modules 인용

참고로 위의 글에서 인용하고 있는 go module에 대한 글은 다음 명령어로 볼 수 있다.

```go
$ go help modules
```

중요한 문서이므로 이 문제의 관점에서 추가로 읽을만한 부분을 몇 개 더 뽑아보았다. 번역은 구글 번역기로 했고, 어색한 몇몇 표현을 내가 약간 고쳤다.

> Module support is enabled only when the current directory is outside GOPATH/src and itself contains a go.mod file or is below a directory containing a go.mod file.

* 모듈 지원은 현재 디렉토리가 GOPATH/src 바깥에 있고, `go.mod` 파일을 포함하고 있거나 `go.mod` 파일이 있는 디렉토리의 하위 경로일 때에만 가능합니다.

> A module is defined by a tree of Go source files with a go.mod file in the tree's root directory. The directory containing the go.mod file is called the module root.

* 모듈은 트리의 루트 디렉토리에 `go.mod` 파일이있는 Go 소스 파일 트리로 정의됩니다. `go.mod` 파일이 들어있는 디렉토리를 모듈 루트라고합니다.

> The go.mod file defines the module path and lists the specific versions of other modules that should be used when resolving imports during a build, by giving their module paths and versions.

* `go.mod` 파일은 module path를 정의하고 모듈 경로 및 버전을 제공하여 빌드 중에 가져 오기를 해결할 때 사용해야하는 다른 모듈의 특정 버전을 나열합니다.

> The go command maintains, in the main module's root directory alongside go.mod, a file named go.sum containing the expected cryptographic checksums of the content of specific module versions. Each time a dependency is used, its checksum is added to go.sum if missing or else required to match the existing entry in go.sum.

* go 명령은 `go.mod`와 함께 주 모듈의 루트 디렉토리에 특정 모듈 버전의 내용에 대한 예상 암호화 체크섬을 포함하는 `go.sum` 파일을 유지 관리합니다.
* 디펜던시가 사용될 때마다 `go.sum`의 기존 항목과 비교하여, `go.sum` 에 체크섬이 추가된다.

> The go command maintains a cache of downloaded packages and computes and records the cryptographic checksum of each package at download time.

* go 명령은 다운로드한 패키지의 캐시를 유지 관리하고 다운로드 할 때 각 패키지의 암호화 체크섬을 계산하고 기록합니다.

> In normal operation, the go command checks these pre-computed checksums against the main module's go.sum file, instead of recomputing them on each command invocation. The 'go mod verify' command checks that the cached copies of module downloads still match both their recorded checksums and the entries in go.sum.

* go 명령은 각 명령을 호출할 때마다 미리 계산해 놓은 체크섬을 주 모듈의 `go.sum` 파일과 비교하여 검사합니다.
* 'go mod verify'명령은 모듈 다운로드의 캐시 된 사본이 기록 된 체크섬과 `go.sum`의 항목과 일치하는지 확인합니다.


종합해 정리하자면 다음과 같다.

* `go.mod` 파일이 있는 곳이 모듈 루트가 된다.
* `go.mod` 파일을 저장소에 포함시키지 않으면, 다른 사람 모듈 지원을 사용하기 위해 `go.mod`파일을 만들어야 한다.
* `go.sum` 파일은 디펜던시 별 체크섬을 기록해 두고, 변조 여부를 검사하는 데에 사용된다.

결론: `go.mod`, `go.sum` 파일도 커밋하자.


## The Go Blog의 Using Go Modules 인용

<https://blog.golang.org/using-go-modules >

>
The go command uses the go.sum file to ensure that future downloads of these modules retrieve the same bits as the first download, to ensure the modules your project depends on do not change unexpectedly, whether for malicious, accidental, or other reasons. Both go.mod and go.sum should be checked into version control.

go 커맨드는 `go.sum` 파일을 참고하여 처음 다운로드 받은 모듈과 나중에 다운로드 받는 모듈이
같은 비트를 갖는지를 검사합니다.
그를 통해 악의/우연적인 이유 또는 기타 등등의 복잡한 이유로
프로젝트가 의존하는 모듈이 예상치 못하게 변형되는 일을 방지합니다.
즉, go.mod 와 go.sum 모두 버전 관리 도구에 체크되어야 합니다.

# Links

* [Using Go Modules](https://blog.golang.org/using-go-modules )
* [Go & Versioning](https://research.swtch.com/vgo )
* [Defining Go Modules(Go & Versioning, Part 6)](https://research.swtch.com/vgo-module )
* [Should I add the go.sum file to the repo of a library? (reddit)](https://www.reddit.com/r/golang/comments/97dxj1/should_i_add_the_gosum_file_to_the_repo_of_a/ )
