---
layout  : wiki
title   : Docker
summary : 
date    : 2019-06-01 07:55:33 +0900
updated : 2019-06-01 17:38:17 +0900
tag     : bash command container
toc     : true
public  : true
parent  : how-to
latex   : false
---
* TOC
{:toc}

# Examples
## Install
```sh
$ # on Mac
$ brew cask install docker
$ open /Applications/Docker.app
```

## helloworld 출력해 보기

`helloworld`라는 이름의 간단한 셸 스크립트를 작성한다.

```sh
#! /bin/sh

echo Hello, World!
```

이제 `helloworld`를 실행할 환경을 정의하자. `Dockerfile`을 작성한다.

```dockerfile
FROM ubuntu:latest

COPY helloworld /usr/local/bin
RUN chmod +x /usr/local/bin/helloworld

CMD ["helloworld"]
```

이미지를 빌드한다.

```sh
$ docker image build -t helloworld:latest .
```

컨테이너를 실행해 보자. `Hello, World!` 문자열이 출력되면 성공이다.

```sh
$ docker container run helloworld
Hello, World!
```

이미지 목록을 확인해 보자.

```sh
$ docker image ls
REPOSITORY              TAG                 IMAGE ID            CREATED             SIZE
helloworld              latest              584cf23a6604        8 minutes ago       69.9MB
```

그냥 문자열 출력만 하는데 SIZE가 `69.9MB`나 된다.

그렇다면 `Dockerfile`을 수정하여 `FROM` 값을 용량이 작은 alpine으로 바꿔보자.

```dockerfile
# ubuntu => alpine
FROM alpine:latest

COPY helloworld /usr/local/bin
RUN chmod +x /usr/local/bin/helloworld

CMD ["helloworld"]
```

이미지 목록을 확인해 보면 용량이 `5.53MB`로 줄어 있다.

```sh
$ docker image ls
REPOSITORY              TAG                 IMAGE ID            CREATED             SIZE
helloworld              latest              a9a80e4487ea        6 minutes ago       5.53MB
```

## 간단한 go 웹 서버 띄워보기

다음과 같은 `main.go`파일을 작성하자.

```go
package main // import "github.com/johngrib/go-http-helloworld"

import (
    "fmt"
    "log"
    "net/http"
)

func main() {

    http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
        log.Println("/ request")
        fmt.Fprintf(w, "Hello World\n")
    })

    http.HandleFunc("/ping", func(w http.ResponseWriter, r *http.Request) {
        log.Println("/ping request")
        fmt.Fprintf(w, "pong\n")
    })

    server := &http.Server{
        Addr: ":3000",
    }

    if err := server.ListenAndServe(); err != nil {
        log.Println(err)
    }
}
```

그리고 다음과 같이 `Dockerfile`도 작성해 준다.

```dockerfile
FROM golang:1.12

RUN mkdir /hello
COPY main.go /hello
CMD ["go", "run", "/hello/main.go"]
```

그리고 다음 명령어를 실행해주면 컨테이너 환경에서 서버가 실행된다.

```
$ # 이미지 빌드
$ docker build -t hello:latest .
$ # 컨테이너 실행
$ docker container run -t -p 8080:3000 hello:latest
```

* `curl http://localhost:8080`을 입력하면 `Hello World`가 출력된다.
* `curl http://localhost:8080/ping`을 입력하면 `pong`이 출력된다.

한편 `docker container ls` 명령으로 실행중인 컨테이너 목록을 확인할 수 있다.

```sh
$ docker container ls
CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS              PORTS                      NAMES
f6cb8fe1673a        hello:latest        "go run /hello/main.…"   6 minutes ago       Up 6 minutes        0.0.0.0:8080->3000/tcp     keen_driscoll
```

다음 명령으로 실행중인 컨테이너를 종료할 수 있다.

```sh
$ docker container stop f6cb8fe1673a
```
