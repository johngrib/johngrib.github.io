---
layout  : wiki
title   : Docker
summary : 
date    : 2019-06-01 07:55:33 +0900
updated : 2019-06-01 16:09:15 +0900
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

