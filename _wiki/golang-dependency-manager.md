---
layout  : wiki
title   : Go dependency manager
summary : 사람들이 많이 쓰는 걸 쓰자
date    : 2018-10-21 10:19:44 +0900
updated : 2019-06-04 21:53:56 +0900
tag     : golang
toc     : true
public  : true
parent  : Golang
latex   : false
---
* TOC
{:toc}

# 주의사항

> Go의 공식 디펜던시 관리자인 Go Modules 기능이 Go 1.11 (2018-08-24)부터 추가되면서 다른 디펜던시 매니저를 쓸 이유가 희박해졌다.

* Go의 공식 디펜던시 매니징 기능인 Go Modules 사용법을 찾는다면 [[golang-mod]]{(번역) Go Modules 사용하기}를 읽을 것.
* 이 문서는 필요에 따라 Go Modules 외의 다른 디펜던시 관리자를 찾아 조사한 것이다.

# Github status comparison

* 다음 목록의 선정 기준은 <https://github.com/golang/go/wiki/PackageManagementTools#go15vendorexperiment >.
* 각종 수치는 `2018-10-21`을 기준으로 한다.
* Star 기준 내림차순으로 정렬.
* Column에 대해
    * Last ver : Release의 latest 항목 참고.
    * Last commit : master branch의 latest commit 날짜.
    * Cont : Contributors
    * Rel : Releases

|                       | Last ver               | Last commit     | Star     | Fork   | Issue<br>open/close    | PR<br>open/close    | Cont   | Rel   | License                     |
| ----------            | ---------------------- | --------------: | -------: | -----: | :--------------------: | :-----------------: | -----: | ----: | ---------                   |
| [dep][_dep]           | v0.5.0<br>2018-07-26   | 2018-10-04      | 10,719   | 819    | 371 / 839              | 48 / 780            | 172    | 9     | [link][_dep_L]              |
| [Glide][_glide]       | 0.13.2<br>2018-09-27   | 2018-09-27      | 7,185    | 466    | 364 / 404              | 34 / 226            | 76     | 38    | [link][_glide_L]            |
| [Godep][_godep]       | v80<br>2018-01-27      | 2018-01-27      | 5,502    | 481    | 80 / 303               | 1 / 177             | 40     | 68    | [link][_godep_L]            |
| [Govendor][_Govendor] | v1.0.9<br>2017-10-28   | 2018-10-12      | 3,945    | 304    | 116 / 216              | 3 / 77              | 44     | 11    | [BSD 3-Clause][_govendor_L] |
| [gb][_gb]             | 0.4.4<br>2017-02-22    | 2017-05-11      | 2,155    | 155    | 76 / 307               | 12 / 345            | 50     | 17    | [MIT][_gb_L]                |
| [gopm][_gopm]         | 0.7.2<br>2014-09-12    | 2017-07-28      | 1,979    | 166    | 43 / 52                | 0 / 32              | 18     | 3     | [Apache-2.0][_gopm_L]       |
| [gom][_gom]           |                        | 2018-05-21      | 1,335    | 94     | 11 / 23                | 3 / 52              | 28     | 0     |                             |
| [gvt][_gvt]           | archived               | 2018-08-25      | 752      | 80     | 35 / 41                | 9 / 20              | 13     | 0     | [MIT][_gvt_L]               |
| [manul][_manul]       |                        | 2018-04-12      | 672      | 32     | 3 / 22                 | 2 / 22              | 12     | 0     | [MIT][_manul_L]             |
| [Gogradle][_gradle]   | 0.10.2<br>2018-09-04   | 2018-09-04      | 527      | 48     | 55 / 147               | 1 / 50              | 10     | 32    | [Apache-2.0][_gradle_L]     |
| [trash][_trash]       | v0.2.6                 | 2018-08-22      | 270      | 47     | 19 / 12                | 5 / 50              | 11     | 7     | [MIT][_trash_L]             |
| [Vendetta][_Vendetta] |                        | 2017-02-26      | 245      | 11     | 5 / 7                  | 0 / 6               | 6      | 0     | [BSD 2-Clause][_Vendetta_L] |
| [govend][_govend]     |                        | 2016-10-31      | 230      | 30     | 15 / 18                | 2 / 40              | 12     | 0     | [BSD 3-Clause][_govend_L]   |
| [Rubigo][_Rubigo]     | v1.0.3<br>2017-11-03   | 2018-08-27      | 43       | 2      | 0 / 1                  | 0 / 1               | 2      | 4     | [MIT][_Rubigo_L]            |
| [vexp][_vexp]         | archived               | 2015-09-04      | 28       | 2      | 2 / 2                  | 0 / 4               | 2      | 0     | [BSD 3-Clause][_vexp_L]     |
| [godm][_godm]         | archived               | 2015-10-18      | 11       | 0      | 8 / 4                  | 0 / 9               | 1      | 0     | [MIT][_godm_L]              |
| [gv][_gv]             |                        | 2015-12-24      | 5        | 0      | 1 / 0                  | 0 / 0               | 2      | 0     | [MIT][_gv_L]                |
| [gsv][_gsv]           |                        | 2016-03-12      | 3        | 0      | 0 / 0                  | 0 / 0               | 1      | 0     | [MIT][_gsv_L]               |

* dep, Glide 정도를 비교해보고 쓸 수 있겠다.
* gopm은 <https://gopm.io/ >라는 패키지 다운로드 서비스를 운영중.
    * branch, commit, tag 지원.
* Gogradle은 gradle plugin이다. [메인 개발자](https://github.com/blindpirate )는 [gradle 개발팀 소속인 것 같다.](https://github.com/gradle/gradle/commits?author=blindpirate )
* Rubigo는 특이하게도 Go가 아니라 Rust로 작성되었다.
    * Rubigo는 README에 다음과 같이 DEPRECATED 되었다고 밝힌다.
        * **Rubigo is a DEPRECATED dependency tool and package manager for Golang, written in Rust.**

## Why dep?

일단 공식인 것 같다. 저장소 주소를 보자. <https://github.com/golang/dep >

그리고 **다른 도구들이 dep을 쓰라고 한다.**

* [Glide의 README](https://github.com/Masterminds/glide#golang-dep )에 **dep**을 쓰라는 이야기가 있다.

>
The Go community now has the dep project to manage dependencies. Please consider trying to migrate from Glide to dep. If there is an issue preventing you from migrating please file an issue with dep so the problem can be corrected. Glide will continue to be supported for some time but is considered to be in a state of support rather than active feature development.

>
이제(now) Go 커뮤니티에는 종속성을 관리하는 dep 프로젝트가 있습니다.
Glide에서 Dep로의 마이그레이션을 고려하세요.
마이그레이션 도중에 문제가 발생하면 dep 쪽에 이슈를 남겨서 해결하세요.
Glide는 얼마간(some time) 계속 지원되긴 하겠지만, 기능 개발보다는 지원 상태에 머무를 것입니다.

* [Godep](https://github.com/tools/godep#godep---archived )에서도 비슷한 이야기가 있다.

> Please use dep or another tool instead.  
The rest of this readme is preserved for those that may still need its contents.

> dep 이나 다른 도구를 사용하세요.  
이하 이 README 문서의 나머지 부분은 필요할 수 있는 분들을 위해 남겨둡니다.

이쯤되면 좋든 싫든 dep을 써야할 것 같다.

# dep

## installation

* Mac

```sh
$ brew install dep
$ brew upgrade dep
```

* Other platforms

```sh
$ curl https://raw.githubusercontent.com/golang/dep/master/install.sh | sh
```

* with source code

```sh
$ go get -u github.com/golang/dep/cmd/dep
```

## help

`dep help`를 치면 다음과 같은 도움말이 나온다.

```
$ dep help
Dep is a tool for managing dependencies for Go projects

Usage: "dep [command]"

Commands:

  init     Set up a new Go project, or migrate an existing one
  status   Report the status of the project's dependencies
  ensure   Ensure a dependency is safely vendored in the project
  version  Show the dep version information
  check    Check if imports, Gopkg.toml, and Gopkg.lock are in sync

Examples:
  dep init                               set up a new project
  dep ensure                             install the project's dependencies
  dep ensure -update                     update the locked versions of all dependencies
  dep ensure -add github.com/pkg/errors  add a dependency to the project

Use "dep help [command]" for more information about a command.
2018-10-21 일 15:39:53 johngrib atHome ~/Dropbox/johngrib.github.io  ᚴ [master] 4
```

## dep 명령어 모음

* <https://golang.github.io/dep/docs/daily-dep.html >

### dep init

프로젝트를 셋팅하거나, 기존 프로젝트를 마이그레이션 한다.

`dep`을 설치한 후 가장 먼저 실행해야 할 명령어라 할 수 있다.

* 실행 후 다음 파일과 디렉토리가 생성된다.
    * `Gopkg.lock`
    * `Gopkg.toml`
    * `vendor/`

### dep ensure

dep의 기본이 되는 명령어. 디스크에 파일을 쓰는 명령어는 이것 뿐이다.

다음의 상황에 쓰면 된다.

* 새로운 디펜던시 추가
* 기존의 디펜던시 업데이트
* Gopkg.toml에서 지정한 버전으로 패키지 업데이트

다음과 같이 사용한다.

```sh
$ # 추가
$ dep ensure -add github.com/pkg/errors

$ # 업데이트
$ dep ensure
$ dep ensure -update
$ dep ensure -update github.com/foo/bar

$ # -v 옵션을 주면 진행상황을 출력한다
$ dep ensure -v
```

### dep check

* 다운받은 디펜던시와 원격 저장소 사이의 해시값 일치/불일치를 검사해 결과를 보여준다.

### dep status

현재 프로젝트가 의존하고 있는 디펜던시 목록을 출력한다.

예를 들어 ginkgo와 gomega를 쓰고 있다면 다음과 같이 나온다.

```
$ dep status
PROJECT                        CONSTRAINT     VERSION        REVISION  LATEST   PKGS USED
github.com/onsi/ginkgo         ^1.6.0         v1.6.0         3774a09   v1.6.0   18  
github.com/onsi/gomega         ^1.4.2         v1.4.2         7615b94   v1.4.2   12  
```

## Gopkg.lock

<https://golang.github.io/dep/docs/Gopkg.lock.html >

* `dep ensure` 또는 `dep init`을 실행했을 때 자동으로 생성되는 파일이다.

## Gopkg.toml

* `dep init`을 실행하면 자동으로 생성되는 파일.
* 이후는 개발자가 직접 편집하며 관리하도록 한다.

<https://golang.github.io/dep/docs/Gopkg.toml.html#example >

다음은 위의 링크에서 복사해 온 예제이다.

```toml
required = ["github.com/user/thing/cmd/thing"]

ignored = [
  "github.com/user/project/pkgX",
  "bitbucket.org/user/project/pkgA/pkgY"
]

noverify = ["github.com/something/odd"]

[metadata]
codename = "foo"

[prune]
  non-go = true

  [[prune.project]]
    name = "github.com/project/name"
    go-tests = true
    non-go = false

[[constraint]]
  name = "github.com/user/project"
  version = "1.0.0"

  [metadata]
  property1 = "value1"
  property2 = 10

[[constraint]]
  name = "github.com/user/project2"
  branch = "dev"
  source = "github.com/myfork/project2"

[[override]]
  name = "github.com/x/y"
  version = "2.4.0"

  [metadata]
  propertyX = "valueX"
```

### required 와 ignored

`required` 와 `ignored`으로 패키지 그래프 규칙을 지정할 수 있다.

* `required`
    * `Gopkg.lock`에 추가해야 하는 패키지 목록을 명시한다.
    * [예제 Gopkg.toml 파일](https://golang.github.io/dep/docs/Gopkg.toml.html#example )에서는 제일 윗 줄에 있었다.
        * 보통 제일 위쪽 즈음에 선언하는 듯?

```toml
required = ["github.com/user/thing/cmd/thing"]
```

* `ignored`
    * dep이 소스코드를 정적분석할 때 무시할 패키지 목록을 명시한다.

```toml
ignored = [
  "github.com/user/project/pkgX",
  "bitbucket.org/user/project/pkgA/pkgY"
]
```

### noverify

* [vendor verification](https://golang.github.io/dep/docs/glossary.html#vendor-verification )을 하지 않을 패키지를 명시한다.
* dep은 `dep ensure`, `dep check`등의 명령을 수행할 때 다운받은 디펜던시와 원격 저장소 사이의 해시값 일치/불일치를 검사하는데, `noverify`로 지정한 것은 해시값을 검사하지 않는다.

```toml
noverify = ["github.com/something/odd"]
```

만약 `noverify`를 지정하지 않는다면?

* `dep ensure`: 해시 불일치가 일어난 디펜던시를 다운받아 재생성한다.
* `dep check`: 해시 불일치가 일어난 디펜던시를 보고하고 exit 1 로 종료한다.

만약 `noverify`를 지정하면?

* `dep ensure`: 해시 불일치를 무시한다.
    * 필요한 경우에만 `vendor`경로 아래에 해당 디펜던시를 다운받아 재생성한다.
    * **필요한 경우**란 다음과 같다.
        * `prune` 옵션이 변경된다.
        * `package` 목록이 변경된다.
        * `version` 값이 변경된다.
* `dep check`: 결과를 출력할 때 해시 불일치가 빠지지는 않지만, 종료할 때 exit 1 로 끝나지 않게 된다.

### metadata

* 사용자가 지정하는 key - value 값.

### prune: 필요없는 경로를 지정한다

prune에 필요없는 경로/파일을 지정하면 `vendor` 트리 구조를 만들때 추가하지 않는다.

* `unused-packages` : 필요없는 패키지를 쳐낸다.
* `non-go` : (Go가 사용하지 않는) 파일들을 쳐낸다.
* `go-tests` : 테스트 파일들을 쳐낸다.

`vendor`에 들어갈 의존성 파일들 중 필요없다고 생각하는 리소스를 `true`로 지정해 주자.

```toml
[prune]
  go-tests = true
  non-go = false
  unused-packages = true
```

### 의존성 규칙 - constraint와 override

<https://golang.github.io/dep/docs/Gopkg.toml.html >

* `\[[constraint]]` : dependency 그래프에 추가할 dependency를 정의한다.
    * `name`: import path를 지정한다.
    * 다음 셋 중 적어도 하나는 있어야 한다.
        * `version`
        * `branch`
        * `revision`
* `\[[override]]`
    * 조심스럽게 사용하라는 것을 보니 가급적이면 `\[[constraint]]`만 쓰는 것이 좋을듯.

### version 표기에 대하여

```
=   : equal
!=  : not equal
>   : greater than
<   : less than
>=  : greater than or equal to
<=  : less than or equal to
-   : literal range. E.g., 1.2 - 1.4.5 is equivalent to >= 1.2, <= 1.4.5
~   : minor range. E.g., ~1.2.3 is equivalent to >= 1.2.3, < 1.3.0
^   : major range. E.g., ^1.2.3 is equivalent to >= 1.2.3, < 2.0.0
[xX*]: wildcard. E.g., 1.2.x is equivalent to >= 1.2.0, < 1.3.0
```

* `2.3.1` 버전을 고정하고 싶다면 `=`. 예) `=2.3.1`
* `2.3.1` 이하의 버전을 사용한다면 `~`. 예) `~2.3.1`
* `2.1.1`과 `2.3.1` 사이의 버전을 사용한다면 `-`. 예) `2.1.1 - 2.3.1`

version 표기 중 major range `^`는 다음과 같이 사용한다.

* `^` : 0을 제외한 가장 왼쪽의 메이저 숫자를 넘어서지 않도록 한다.

```
^1.2.3 means 1.2.3 <= X < 2.0.0
^0.2.3 means 0.2.3 <= X < 0.3.0
^0.0.3 means 0.0.3 <= X < 0.1.0
```


### source

* name의 프로젝트가 사라졌거나 뭔가 문제가 있을 경우의 Plan B.
* 프로젝트를 가져올 대체 위치를 지정할 수 있다.
* 주로 fork 해둔 경로를 지정한다.

```toml
[[constraint]]
  name = "github.com/user/project"
  branch = "dev"
  source = "github.com/user2/project"
```


# Links

* [PackageManagementTools](https://github.com/golang/go/wiki/PackageManagementTools )
* <https://golang.github.io/dep/ >
* [dep FAQ](https://github.com/golang/dep/blob/master/docs/FAQ.md )
* [dep Roadmap](https://github.com/golang/dep/wiki/Roadmap )
* [Go에서 dep으로 의존성 관리하기(Outsider님 블로그)](https://blog.outsider.ne.kr/1354 )
* [Go modules 살펴보기(KimMachineGun님 블로그)](https://kimmachinegun.github.io/2018-08-25/go-modules-%EC%82%B4%ED%8E%B4%EB%B3%B4%EA%B8%B0/ )

[_dep]: https://github.com/golang/dep
[_dep_L]: https://github.com/golang/dep/blob/master/LICENSE
[_glide]: https://github.com/Masterminds/glide
[_glide_L]: https://github.com/Masterminds/glide/blob/master/LICENSE
[_godep]: https://github.com/tools/godep
[_godep_L]: https://github.com/tools/godep/blob/master/License
[_govendor]: https://github.com/kardianos/govendor
[_govendor_L]: https://github.com/kardianos/govendor/blob/master/LICENSE
[_manul]: https://github.com/kovetskiy/manul
[_manul_L]: https://github.com/kovetskiy/manul/blob/master/LICENSE
[_godm]: https://github.com/hectorj/godm
[_godm_L]: https://github.com/hectorj/godm/blob/master/LICENSE
[_vexp]: https://github.com/kr/vexp
[_vexp_L]: https://github.com/kr/vexp/blob/master/LICENSE
[_gv]: https://github.com/forestgiant/gv
[_gv_L]: https://github.com/forestgiant/gv/blob/master/LICENSE
[_gvt]: https://github.com/FiloSottile/gvt
[_gvt_L]: https://github.com/FiloSottile/gvt/blob/master/LICENSE
[_govend]: https://github.com/govend/govend
[_govend_L]: https://github.com/govend/govend/blob/master/LICENSE
[_Vendetta]: https://github.com/dpw/vendetta
[_Vendetta_L]: https://github.com/dpw/vendetta/blob/master/LICENSE
[_trash]: https://github.com/rancher/trash
[_trash_L]: https://github.com/rancher/trash/blob/master/LICENSE
[_gsv]: https://github.com/toxeus/gsv
[_gsv_L]: https://github.com/toxeus/gsv/blob/master/LICENSE
[_gom]: https://github.com/mattn/gom
[_gom_L]: https://github.com/mattn/gom/blob/master/LICENSE
[_Rubigo]: https://github.com/yaa110/rubigo
[_Rubigo_L]: https://github.com/yaa110/rubigo/blob/master/LICENSE
[_gradle]: https://github.com/gogradle/gogradle
[_gradle_L]: https://github.com/gogradle/gogradle/blob/master/LICENSE
[_gopm]: https://github.com/gpmgo/gopm
[_gopm_L]: https://github.com/gpmgo/gopm/blob/master/LICENSE
[_gb]: https://github.com/constabulary/gb
[_gb_L]: https://github.com/constabulary/gb/blob/master/LICENSE
