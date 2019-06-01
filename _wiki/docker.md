---
layout  : wiki
title   : Docker
summary : 
date    : 2019-06-01 07:55:33 +0900
updated : 2019-06-01 23:07:09 +0900
tag     : bash command container
toc     : true
public  : true
parent  : how-to
latex   : false
---
* TOC
{:toc}

# Dockerfile instructions

* `FROM`: 도커 이미지의 베이스가 될 이미지. 이미지는 Docker Hub에서 받아온다.
    * `FROM imageName:tag` 형식.
    * 예: `FROM ubuntu:14.04`, `FROM ubuntu:latest`
* `LABEL`: 이미지 정보. 만든 이의 이름 등을 작성한다.
    * `MAINTAINER`는 이제 deprecated 되었으므로 `LABEL`을 사용한다.
* `ENV`: 환경 변수 정의.
    * 예: `ENV foo bar`
* `EXPOSE`: 컨테이너 외부로 노출할 포트를 지정한다.
* `COPY`: 호스트 머신의 파일/디렉토리를 컨테이너 내부로 복사한다.
* `RUN`: 컨테이너에서 실행할 명령.
* `WORKDIR`: `cd`처럼 작업 디렉토리를 변경한다.
* `CMD`: 컨테이너에서 실행할 프로세스를 지정.
    * `["명령", "옵션1", "옵션2"]`와 같은 형식으로 작성하자.
    * `RUN`은 컨테이너를 빌드할 때 실행, `CMD`는 컨테이너를 시작할 때 실행.


# Examples
## Install
```sh
$ # on Mac
$ brew cask install docker
$ open /Applications/Docker.app
```

## help
```sh
$ docker image --help
$ docker container --help
```

## search
```sh
$ docker search nginx
$ docker search nginx --limit 10
```

## image
```sh
$ # 이미지 빌드
$ docker image build -t IMAGE     Dockerfile경로
$ docker image build -t IMAGE:TAG Dockerfile경로

$ # 이미지 목록 보기
$ docker image ls

$ # 이미지 다운로드
$ docker image pull IMAGE:TAG

$ # 이미지 태그 설정
$ docker image tag TARGET_IMAGE:TAG  NEW_IMAGE:TAG

$ # 이미지 삭제
$ docker image rm IMAGE:TAG
$ docker image prune        # 실행중이 아닌 모든 컨테이너 삭제
```

## container
```sh
$ # 컨테이너 목록 보기
$ docker container ls
$ docker container ls -q    # 컨테이너 ID만 출력
$ docker container ls -a    # 종료된 컨테이너 목록

$ # 컨테이너를 실행하는 여러 방법들
$ docker container run -it IMAGE:TAG
$ docker container run -d -t IMAGE:TAG
$ docker container run -it -p HOST_PORT:CONTAINER_PORT  IMAGE:TAG
$ docker container run -it --name my_container  IMAGE:TAG
$ docker container run --rm IMAGE
```

* `-d`: 백그라운드로(데몬) 실행.
* `-i`: Interactive.
* `-t`: TTY 모드 사용.
    * `-it`: `-i`와 `-t`를 합친 옵션.
* `-p`: 호스트 포트와 연결할 컨테이너 포트 지정.
* `--name`: 구동하는 컨테이너에 내가 지정한 이름을 붙인다.
* `--rm`: 구동이 끝난 후 컨테이너를 삭제한다.

```sh
$ # 컨테이너 정지
$ docker container stop CONTAINER_ID
$ docker container stop CONTAINER_NAME

$ # 컨테이너 재시작
$ docker container restart CONTAINER_ID
$ docker container restart CONTAINER_NAME

$ # 컨테이너 삭제
$ docker container rm CONTAINER_ID
$ docker container rm CONTAINER_NAME
$ docker container rm -f CONTAINER_NAME
$ docker container prune                # 실행중이 아닌 모든 컨테이너 삭제

$ # 컨테이너 표준 출력 보기
$ docker container logs CONTAINER_ID
$ docker container logs -f CONTAINER_ID  # tail -f 처럼 보여준다

$ # 실행중인 컨테이너에서 명령 실행
$ docker container exec CONTAINER_ID  COMMAND

$ # 시스템 리소스 사용 상태 보기
$ docker container stats
```


# Tutorial

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

```sh
$ # 이미지 빌드
$ docker build -t hello:latest .
$ # 컨테이너 실행
$ docker container run -t -p 8080:3000 hello:latest
```

* `-p`: 포트 지정. 포트는 `호스트:컨테이너` 형식으로 지정한다.
    * 예: `-p 8080:3000`은 컨테이너의 3000 포트를 호스트의 8080 포트로 연결하는 것.

실행되면 다음과 같이 요청을 보낼 수 있다.

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

다음과 같이 해도 된다.

```sh
$ docker container stop f6cb8fe1673a
```

만약 실행할 때 도커 컨테이너가 포어그라운드를 차지하는 것이 싫다면 `-d` 옵션을 주면 된다. 데몬으로 실행한다.

```sh
$ docker run -d -t -p 8080:3000 hello
```

# docker-compose

* docker-compose를 사용하면
    * docker 명령에 옵션을 주렁주렁 붙이는 일을 `yml`로 편하게 할 수 있다.
    * 여러 컨테이너의 실행을 `yml` 파일로 정의할 수 있어 편리하다.

위에서 만든 go 웹 서버 디렉토리로 가서 다음과 같은 `docker-compose.yml` 파일을 작성하자.

```yml
version: "3.7"
services:
  go-helloworld:
    image: helloworld:latest
    ports:
      - 8080:3000
```

그 다음 다음과 같이 `up`을 실행하면 컨테이너가 뜬다.
```sh
$ docker-compose up
$ docker-compose up -d
$ docker-compose up --build
```

* `-d`: 데몬으로 실행
* `--build`: 빌드한 다음 실행

컨테이너를 정지하려면 `down` 옵션을 주면 된다.
```sh
$ docker-compose down
```


# Links

* <https://docs.docker.com/engine/reference/commandline/cli/ >
* <https://docs.docker.com/compose/reference/up/ >
