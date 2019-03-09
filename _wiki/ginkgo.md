---
layout  : wiki
title   : Ginkgo 사용하기
summary : BDD Testing Framework for Go
date    : 2018-10-02 10:55:21 +0900
updated : 2018-10-04 16:44:56 +0900
tag     : golang test
toc     : true
public  : true
parent  : Golang
latex   : false
---
* TOC
{:toc}

# Ginkgo

"깅코"라고 읽으면 된다.

# 설치

`ginkgo` 설치

```sh
$ go get github.com/onsi/ginkgo/ginkgo
```

matcher 라이브러리 `gomega` 설치.

```sh
$ go get github.com/onsi/gomega
```

# 실행

* `ginkgo -r` : 하위 디렉토리의 테스트 코드를 모두 탐색하며 테스트를 수행한다.
* `ginkgo watch -r` : 실행을 종료하지 않고, 변경 사항이 생길 때마다 테스트를 수행한다.

# vim에서 사용하기

[[vim-go-env]]{vim-go}를 사용하고 있다면 `:help vim-go`에서 다음과 같은 질문/답변을 찾아볼 수 있다.

```
How do I run focused ginkgo tests?

You must set this environment variable in your '.vimrc':

    let $GINKGO_EDITOR_INTEGRATION = "true"
```

# ginkgo 테스트 코드 예제

테스트를 돌려보기 위해 두 파일을 작성해 보았다.

* `main.go`

```go
package main

func one() int {
    return 1
}
func two() int {
    return 2
}
func name() string {
    return "name"
}
```

* `main_test.go`

```go
package main

import (
    "testing"

    . "github.com/onsi/ginkgo"
    . "github.com/onsi/gomega"
)

func TestGinkgo(t *testing.T) {
    RegisterFailHandler(Fail)
    RunSpecs(t, "Test functions Suite")
}

var _ = Describe("Test functions",
    func() {
        Context("sample", func() {
            It("one should return 1", func() {
                Expect(1).To(Equal(one()))
            })
            It("name should return name", func() {
                Expect("name").To(Equal(name()))
            })
        })
    },
)
```

* `go test` 또는 `ginkgo -r`을 실행해보면 테스트를 수행한다.

![image](https://user-images.githubusercontent.com/1855714/46329142-908d7480-c646-11e8-8bcd-41b6e09f2d0c.png )

* vim-go의 `:GoTest`로도 잘 돌아간다.
* vim-go의 `:GoCoverageToggle`를 통해 coverage를 검사해 보면 `two` 함수를 테스트하는 케이스가 없으므로 `two` 함수에 빨간색을 칠해준다.

![coverage](https://user-images.githubusercontent.com/1855714/46329021-dc8be980-c645-11e8-8442-e45a70e7e9b0.png )


# Links

* <https://github.com/onsi/ginkgo >
* [Getting Started with BDD in Go Using Ginkgo](https://semaphoreci.com/community/tutorials/getting-started-with-bdd-in-go-using-ginkgo )
* [[vim-go-env]]

