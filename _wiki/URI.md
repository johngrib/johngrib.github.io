---
layout  : wiki
title   : URI
summary : Uniform Resource Identifier
updated : 2017-12-12 22:05:28 +0900
tags    : http
toc     : true
public  : true
parent  : index
latex   : false
---
* TOC
{:toc}

## 개요

* URI : **U**niform **R**esource **I**dentifier
    * URL : **U**niform **R**esource **L**ocator
    * URN : **U**niform **R**esource **N**ame

## URI

* URI: 통합 자원 '식별자'
* 인터넷 상의 정보 리소스를 고유하게 식별할 수 있다.
* URI는 URL과 URN이라는 두 가지 형태가 존재한다.

### URL

* 통합 자원 '지시자'
* 누구나 흔하게 접하는 그 URL이 맞다.

URL 포맷은 세 부분으로 이루어져 있다.

* scheme: 리소스에 접근할 때 사용하는 프로토콜을 명시한다. `http://`, `ftp://` 등이 이에 해당한다.
* 서버의 인터넷 주소
* 리소스

예를 들어 `http://johngrib.github.io/wiki/URI/index.html`라는 URL이 있다면 다음과 같이 파악할 수 있다.

* scheme: `http://`
* 서버의 인터넷 주소: `johngrib.github.io`
* 리소스: `/wiki/URI/index.html`

### URN

* 통합 자원 '이름'
* 리소스의 위치에 영향을 받지 않는 고유한 이름이다.
* 위치 독립적이기 때문에 리소스가 다른 곳으로 옮겨져도 작동해야 한다.
* [RFC 2141](../RFC/#rfc-2141)에 syntax가 정의되어 있다.

RFC 2141이 보기 어렵다면, 다음의 예제를 참고하자.

* [[https://en.wikipedia.org/wiki/Uniform_Resource_Name#Syntax]]
* [[https://en.wikipedia.org/wiki/Uniform_Resource_Name#Examples]]
