---
layout  : wiki
title   : sdk 명령어 (sdkman)
summary : 다양한 소프트웨어 개발 도구의 버전을 관리한다
date    : 2019-09-11 22:44:15 +0900
updated : 2021-10-05 14:33:32 +0900
tag     : bash command
resource: 41/A74DA3-2CC1-4F03-8B1E-CB251C3C8527
toc     : true
public  : true
parent  : [[cmd]]
latex   : false
---
* TOC
{:toc}

## Examples

### sdkman 관리

```sh
$ curl -s "https://get.sdkman.io" | bash    # sdkman 설치
$ sdk selfupdate                            # sdkman 업데이트
$ sdk version                               # sdkman 버전 확인
```

### 현재 사용중인 개발 도구의 버전 확인

```sh
$ sdk current       # sdkman으로 관리하는 모든 도구 버전 확인
$ sdk current java  # java 버전 확인
```

### 설치 가능한 버전 목록 보기

```sh
$ sdk list java
$ sdk list scala
```

### 개발 도구 설치

```sh
$ sdk install java                  # latest stable 버전의 Java 설치
$ sdk install java 11.0.4.hs-adpt   # list 확인 후 identifier를 선택할 것
$ sdk install scala 2.12.1          # Scala 2.12.1 설치
```

참고로 이렇게 설치하면 `~/.sdk/candidates`에 다운로드된다.

```
$ tree ./.sdkman/candidates/ -L 2
./.sdkman/candidates/
├── gradle
│   ├── 6.1.1
│   ├── 6.8
│   └── current -> 6.1.1
└── java
    ├── 11.0.11.hs-adpt
    ├── 11.0.7.hs-adpt
    ├── 15.0.2.hs-adpt
    ├── 16.0.1.hs-adpt
    └── current -> 11.0.11.hs-adpt

10 directories, 0 files
```

### 개발 도구 삭제

```sh
$ sdk uninstall java 11.0.4.hs-adpt
```

### 현재 터미널에서 사용할 버전 지정

```sh
$ sdk use scala 2.12.1
```

### default 버전 지정

```sh
$ sdk default scala 2.11.6
```

### 버전 업그레이드

```sh
$ sdk upgrade springboot
```

## Links

* <https://sdkman.io >
* <https://sdkman.io/usage >
