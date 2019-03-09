---
layout  : wiki
title   : vim-go auto import 설정하기
summary : 그래 안 될 리가 없지
date    : 2018-09-18 17:18:21 +0900
updated : 2018-09-21 08:36:09 +0900
tag     : golang vim
toc     : true
public  : true
parent  : Golang
latex   : false
---
* TOC
{:toc}


# 준비물

* [vim-go](https://github.com/fatih/vim-go )가 설치되어 있어야 한다.
* golang.org/x/tools/cmd/ 명령 도구 설치(`goimports`가 함께 설치된다).
```sh
$ go get golang.org/x/tools/cmd/...
```

# 설정

`.vimrc`에 다음 라인을 추가해주면 된다.

```viml
let g:go_fmt_command = "goimports"
```

# 사용

```go
package main

func main() {
	fmt.Println("Hello World")
}
```

위와 같이 코드를 작성하고 **저장하면** 아래와 같이 자동으로 `import "fmt"`가 추가된다.

```go
package main

import "fmt"

func main() {
	fmt.Println("Hello World")
}
```


# Links

* <https://github.com/fatih/vim-go >
* <https://github.com/fatih/vim-go-tutorial/blob/master/vimrc#L109 >
* <https://github.com/golang/tools >
* [goimports vs gofmt](http://goinbigdata.com/goimports-vs-gofmt/ )
    * `goimports`가 `gofmt`가 할 수 있는 모든 것을 할 수 있으면서 기능도 더 많다는 결론.
