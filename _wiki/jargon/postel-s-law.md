---
layout  : wiki
title   : 포스텔의 법칙(Postel's law)
summary : 받을 때는 관대하게, 보낼 때는 엄격하게.
date    : 2018-01-07 17:51:33 +0900
updated : 2022-08-22 23:39:23 +0900
tag     : proverb law
toc     : true
public  : true
parent  : [[/jargon]]
latex   : false
---
* TOC
{:toc}

## 개요

> Be liberal in what you accept, and conservative in what you send.

**받을 때는 관대하게, 보낼 때는 엄격하게.**

* Robustness Principle. 견고함의 원칙이라고도 한다.
* 무언가 전송하는 기능을 구현할 때에는 매우 엄격하고 정확한 값을 보내도록 하자.
* 무언가 받는 기능은 상상 가능한 최악의 쓰레기가 올 수도 있다고 생각하고 방어적으로 구현하자.


## 출처

* 컴퓨터 과학자 [존 포스텔](https://en.wikipedia.org/wiki/Jon_Postel).
* 1979년 [IEN: 111 INTERNET PROTOCOL Specification](http://www.postel.org/ien/txt/ien111.txt#line=1520)
* 1980년 [RFC 760 - 3.2 Discussion]( https://datatracker.ietf.org/doc/html/rfc760#section-3.2 )

>
The implementation of a protocol must be robust.
Each implementation must expect to interoperate with others created by different individuals.
While the goal of this specification is to be explicit about the protocol there is the possibility of differing interpretations.
In general, an implementation should be conservative in its sending behavior, and liberal in its receiving behavior.
That is, it should be careful to send well-formed datagrams, but should accept any datagram that it can interpret (e.g., not object to technical errors where the meaning is still clear).
>
-- [RFC 760 - 3.2 Discussion]( https://datatracker.ietf.org/doc/html/rfc760#section-3.2 )

프로토콜의 구현은 반드시 견고해야 한다.
각각의 프로토콜 구현들은 서로 다른 사람들이 만든 구현들과 상호작용할 것이라고 예상해 둬야 한다.
이 명세서의 목표는 프로토콜을 명확히 서술하는 것이다.
그러나 프로토콜의 구현에 대한 해석은 서로 달라질 수 있다.
일반적으로 구현체는 보낼 때에는 보수적으로, 받을 때에는 관대하게 동작해야 한다.
즉 데이터 그램을 보낼 때에는 형식을 잘 지키도록 주의해야 하지만, 받을 때에는 해석 가능한 범위에서 어떤 데이터그램도 받아들일 수 있어야 한다는 것입니다. (예: 의미가 명확하다면 기술적 예외로 취급하지 않기)

## 인용

### From: 클라우드 네이티브 자바

> '견고함 원칙'이라고 불리기도 하는 포스텔의 법칙이란
서비스는 자기가 만들어내는 것에는 보수적이어야 하지만
다른 서비스로부터 받는 것에는 관대해야 함을 의미한다.
어떤 서비스가 외부에서 받은 데이터의 일부만 사용한다고 하더라도,
나머지 데이터를 지금 사용할 필요가 없다고 해서 거부하거나 배제해서는 안된다.
[^JOS-236]

## 존 포스텔

* 인터넷의 아버지, 인터넷의 신 등으로 불린 인물이다.
* Internet Society의 [Postel Award](https://www.internetsociety.org/grants-and-awards/postel-service-award/ )가 존 포스텔의 이름에서 따 온 것이다.

## 참고문헌

* [RFC 1122 - Requirements for Internet Hosts -- Communication Layers](https://tools.ietf.org/html/rfc1122#page-12): 1.2.2  Robustness Principle 참고
* [IEN: 111 INTERNET PROTOCOL Specification](http://www.postel.org/ien/txt/ien111.txt#line=1520): 3.2.  Discussion 참고
* [Robustness principle(wikipedia)](https://en.wikipedia.org/wiki/Robustness_principle)
* [견고함의 원칙(wikipedia)](https://ko.wikipedia.org/wiki/%EA%B2%AC%EA%B3%A0%ED%95%A8%EC%9D%98_%EC%9B%90%EC%B9%99)
* [Internet Hall of Fame(wikipedia)](https://en.wikipedia.org/wiki/Internet_Hall_of_Fame)
* [JOS] 클라우드 네이티브 자바 / 조쉬 롱, 케니 바스타니 저/정윤진, 오명운, 장현희 역 / 책만 / 초판 1쇄 2018년 06월 29일


## 주석

[^JOS-236]: [JOS] 2.6장. 236쪽.

