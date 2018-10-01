---
layout  : wiki
title   : Go cheatsheet
summary : golang을 배우면서 까먹기 쉬운 것들을 적어두자
date    : 2018-10-01 10:30:40 +0900
updated : 2018-10-01 10:39:22 +0900
tags    : golang cheatsheet
toc     : true
public  : true
parent  : Golang
latex   : false
---
* TOC
{:toc}

# getter와 setter

[Effective Go - Getters](https://golang.org/doc/effective_go.html?#Getters )

* golang은 자동 getter/setter를 지원하지 않는다.
* getter
    * getter를 만들 때에는 `get`을 쓰지 않는다.
    * 그냥 해당 변수명을 메소드 이름으로 쓰면 된다.
    * 예) `foo`에 대한 getter는 `Foo()`.
        * `getFoo()`가 아니다.
* setter
    * setter는 `SetFoo()`와 같이 만들면 된다.

# Links

* [Effective Go](https://golang.org/doc/effective_go.html )

