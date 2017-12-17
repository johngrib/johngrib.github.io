---
layout  : wiki
title   : URI
summary : Uniform Resource Identifier
updated : 2017-12-17 23:25:01 +0900
tags    : http
toc     : true
public  : true
parent  : index
latex   : false
---
* TOC
{:toc}

# 개요

* URI : **U**niform **R**esource **I**dentifier
    * URL : **U**niform **R**esource **L**ocator
    * URN : **U**niform **R**esource **N**ame

# URI

* URI: 통합 자원 '식별자'
* 인터넷 상의 정보 리소스를 고유하게 식별할 수 있다.
* URI는 URL과 URN이라는 두 가지 형태가 존재한다.

다음은 [RFC 3986의 3. Syntax Components]에서 발췌한 URI의 syntax example이다.

```
The following are two example URIs and their component parts:

     foo://example.com:8042/over/there?name=ferret#nose
     \_/   \______________/\_________/ \_________/ \__/
      |           |            |            |        |
   scheme     authority       path        query   fragment
      |   _____________________|__
     / \ /                        \
     urn:example:animal:ferret:nose
```

위가 URL이고, 아래가 URN이다.

## URL

* 통합 자원 '지시자'
* 누구나 흔하게 접하는 그 URL이 맞다.

URL 포맷은 크게 세 부분으로 이루어져 있다.

* scheme: 리소스에 접근할 때 사용하는 프로토콜을 명시한다. `http:`, `ftp:`, `mailto:` 등이 이에 해당한다.
* 호스트: 서버의 인터넷 주소
* 리소스

예를 들어 `http://johngrib.github.io/wiki/URI/index.html`라는 URL이 있다면 다음과 같이 파악할 수 있다.

* scheme: `http://`
* 서버의 인터넷 주소: `johngrib.github.io`
* 리소스: `/wiki/URI/index.html`

### fragment

프래그먼트는 다음 예제와 같이 URL 마지막에 `#`과 함께 붙는다.

```
http://johngrib.github.io/wiki/URI.md#fragment
```

위의 예제에서 `#fragment`는 서버에 전달되지 않는다.

프래그먼트 처리는 브라우저가 서버로부터 리소스를 다운받은 다음에 이루어진다.

## URN

* 통합 자원 '이름'
* 리소스의 위치에 영향을 받지 않는 고유한 이름이다.
* 위치 독립적이기 때문에 리소스가 다른 곳으로 옮겨져도 작동해야 한다.

# Links

* [RFC 3986](https://www.ietf.org/rfc/rfc3986.txt)

