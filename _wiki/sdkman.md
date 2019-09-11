---
layout  : wiki
title   : sdk 명령어 (sdkman)
summary : 다양한 소프트웨어 개발 도구의 버전을 관리한다
date    : 2019-09-11 22:44:15 +0900
updated : 2019-09-11 23:13:40 +0900
tag     : bash command
toc     : true
public  : true
parent  : command-line
latex   : false
---
* TOC
{:toc}

# Examples

## sdkman 관리

```sh
$ curl -s "https://get.sdkman.io" | bash    # sdkman 설치
$ sdk selfupdate                            # sdkman 업데이트
$ sdk version                               # sdkman 버전 확인
```

## 현재 사용중인 개발 도구의 버전 확인

```sh
$ sdk current       # sdkman으로 관리하는 모든 도구 버전 확인
$ sdk current java  # java 버전 확인
```

## 설치 가능한 버전 목록 보기

```sh
$ sdk list java
$ sdk list scala
```

## 개발 도구 설치

```sh
$ sdk install java                  # latest stable 버전의 Java 설치
$ sdk install java 11.0.4.hs-adpt   # list 확인 후 identifier를 선택할 것
$ sdk install scala 2.12.1          # Scala 2.12.1 설치
```

## 개발 도구 삭제

```sh
$ sdk uninstall java 11.0.4.hs-adpt
```

## 현재 터미널에서 사용할 버전 지정

```sh
$ sdk use scala 2.12.1
```

## default 버전 지정

```sh
$ sdk default scala 2.11.6
```

## 버전 업그레이드

```sh
$ sdk upgrade springboot
```

# Links

* <https://sdkman.io >
* <https://sdkman.io/usage >
