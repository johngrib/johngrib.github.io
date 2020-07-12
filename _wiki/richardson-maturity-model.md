---
layout  : wiki
title   : 리처드슨의 REST 성숙도 모델 (Richardson Maturity Model)
summary : REST 성숙도를 4단계로 표현한다
date    : 2020-07-12 20:24:29 +0900
updated : 2020-07-12 20:38:13 +0900
tag     : rest
toc     : true
public  : true
parent  : [[proverb]]
latex   : false
---
* TOC
{:toc}

## From: 마이크로서비스 패턴

> 레너드 리처드슨(Leonard Richardson)은 REST가 얼마나 성숙했는지 알 수 있는 아주 유용한 모델을 제시했습니다. 이 모델에 따르면 REST의 성숙도는 다음 4단계로 구분됩니다.
>
> - 레벨 0: 클라이언트는 서비스별로 유일한 URL 끝점에 HTTP POST 요청을 하여 서비스를 호출합니다. 요청을 할 때마다 어떤 액션을 수행할지, 그 대상(예: 비즈니스 객체)은 무엇인지 지정합니다. 필요한 매개변수도 함께 전달합니다.
> - 레벨 1: 서비스는 리소스 개념을 지원합니다. 클라이언트는 수행할 액션과 매개변수가 지정된 POST 요청을 합니다.
> - 레벨 2: 서비스는 HTTP 동사를 이용해서 액션을 수행하고(예: GET은 조회, POST는 생성, PUT은 수정), 요청 쿼리 매개변수 및 본문, 필요 시 매개변수를 지정합니다. 덕분에 서비스는 GET 요청을 캐싱하는 등 웹 인프라를 활용할 수 있습니다.
> - 레벨 3: 서비스를 HATEOAS(Hypertext As The Engine Of Application State, 애플리케이션 상태 엔진으로서의 하이퍼미디어) 원칙에 기반하여 설계합니다. HATEOAS는 GET 요청으로 반환된 리소스 표현형에 그 리소스에 대한 액션의 링크도 함께 태워 보내자는 생각입니다. 가령 클라이언트는 GET 요청으로 주문 데이터를 조회하고 이때 반환된 표현형 내부 링크를 이용해서 해당 주문을 취소할 수도 있습니다. HATEOAS를 사용하면 하드 코딩한 URL을 클라이언트 코드에 욱여넣지 않아도 됩니다.[^ric-114]


## 함께 읽기

- [Richardson Maturity Model (Martin Fowler)][fowler-model]
- [[REST-paper-summary]]{(요약) Architectural Styles and the Design of Network-based Software Architectures by Roy Thomas Fielding, 2000} - 로이 필딩의 REST 논문 요약

## 참고문헌

- [RIC] 마이크로서비스 패턴 / 크리스 리처드슨 저/이일웅 역 / 길벗 / 초판발행 2020년 01월 30일

## 주석

[^ric-114]: [RIC] 3.2.1장.

[fowler-model]: https://martinfowler.com/articles/richardsonMaturityModel.html

