---
layout  : wiki
title   : 리처드슨의 REST 성숙도 모델 (Richardson Maturity Model)
summary : REST 성숙도를 4단계로 표현한다
date    : 2020-07-12 20:24:29 +0900
updated : 2023-03-12 21:20:12 +0900
tag     : rest
resource: 78/4BA724-E55B-406A-8BAD-388FD368E5C5
toc     : true
public  : true
parent  : [[/architecture/rest]]
latex   : false
---
* TOC
{:toc}

## 개요

- 레벨 0. 단일 URI, 단일 메소드(POST만 사용)
- 레벨 1. 다중 URI 기반의 리소스, 단일 메소드(POST만 사용)
- 레벨 2. 다중 URI 기반의 리소스 및 메소드(POST, GET, HEAD, DELETE, PUT)
- 레벨 3. 애플리케이션 상태 엔진으로서의 하이퍼미디어(HATEOAS)
    - HATEOAS: Hypermedia as the Engine of Application State

## From: 마이크로서비스 패턴

> 레너드 리처드슨(Leonard Richardson)은 REST가 얼마나 성숙했는지 알 수 있는 아주 유용한 모델을 제시했습니다. 이 모델에 따르면 REST의 성숙도는 다음 4단계로 구분됩니다.
>
> - 레벨 0: 클라이언트는 서비스별로 유일한 URL 끝점에 HTTP POST 요청을 하여 서비스를 호출합니다. 요청을 할 때마다 어떤 액션을 수행할지, 그 대상(예: 비즈니스 객체)은 무엇인지 지정합니다. 필요한 매개변수도 함께 전달합니다.
> - 레벨 1: 서비스는 리소스 개념을 지원합니다. 클라이언트는 수행할 액션과 매개변수가 지정된 POST 요청을 합니다.
> - 레벨 2: 서비스는 HTTP 동사를 이용해서 액션을 수행하고(예: GET은 조회, POST는 생성, PUT은 수정), 요청 쿼리 매개변수 및 본문, 필요 시 매개변수를 지정합니다. 덕분에 서비스는 GET 요청을 캐싱하는 등 웹 인프라를 활용할 수 있습니다.
> - 레벨 3: 서비스를 HATEOAS(Hypertext As The Engine Of Application State, 애플리케이션 상태 엔진으로서의 하이퍼미디어) 원칙에 기반하여 설계합니다. HATEOAS는 GET 요청으로 반환된 리소스 표현형에 그 리소스에 대한 액션의 링크도 함께 태워 보내자는 생각입니다. 가령 클라이언트는 GET 요청으로 주문 데이터를 조회하고 이때 반환된 표현형 내부 링크를 이용해서 해당 주문을 취소할 수도 있습니다. HATEOAS를 사용하면 하드 코딩한 URL을 클라이언트 코드에 욱여넣지 않아도 됩니다.[^ric-114]

## From: RESTful 자바 패턴과 실전 응용

>
레벨 0: 원격 프로시저 호출
>
일반 XML 데이터를 SOAP이나 XML-RPC 등으로 전송한다.
POST 메소드만 사용하며, 서비스 간에 단일 POST 메소드로 XML 데이터를 교환한다.
초창기 SOA 애플리케이션 제작 시 흔히 사용된 방식이다.
>
레벨 1: REST 리소스
>
함수에 파라미터를 넘기는 대신 REST URI를 이용한다.
레벨 0처럼 POST 메소드 하나밖에 사용하지 않지만, POST 메소드로 서비스 간 통신을 하면서 복잡한 기능을 여러 리소스로 분산시킨다는 점에서 한 단계 발전된 형태라고 볼 수 있다.
>
레벨 2: 추가 HTTP 메소드
>
레벨 2는 POST 이외에 GET, HEAD, DELETE, PUT 메소드를 추가적으로 사용한다.
HTTP 요청 시 여러 메소드를 사용하여 다양한 리소스를 제공할 수 있다는 점에서 REST의 진정한 유스 케이스라 할 수 있다.
>
레벨 3: HATEOAS
>
애플리케이션 상태 엔진으로서의 하이퍼미디어<sup>HATEOAS</sup>는 리차드슨 성숙도 모델의 가장 성숙한 단계로서,
요청에 대한 하이퍼미디어 응답 속에 클라이언트가 다음에 취해야 할 액션에 관한 상태 정보가 담겨 있다.
레벨 3는 발견 가능성<sup>discoverability</sup>이 높고, 응답 자체에 필요한 내용이 고스란히 담겨 있다.
리소스뿐만 아니라 그 이상의 부가적인 정보까지 나타낸다는 점에서 HATEOAS가 진정한 REST냐 하는 문제는 아직도 논란의 여지가 있다.
[^bhakti-28]

## 함께 읽기

- [Richardson Maturity Model (Martin Fowler)][fowler-model]
- [[/clipping/roy-fielding/rest-paper]] - 로이 필딩의 REST 논문 요약

## 참고문헌

- RESTful 자바 패턴과 실전 응용 / 바크티 메타 저 / 이일웅 역 / 에이콘출판사 / 발행: 2014년 12월 19일 / 원제: RESTful Java Patterns and Best Practices
- 마이크로서비스 패턴 / 크리스 리처드슨 저/이일웅 역 / 길벗 / 초판발행 2020년 01월 30일

## 주석

[^ric-114]: 마이크로서비스 패턴. 3.2.1장.
[^bhakti-28]: RESTful 자바 패턴과 실전 응용. 1장. 28쪽.

[fowler-model]: https://martinfowler.com/articles/richardsonMaturityModel.html

