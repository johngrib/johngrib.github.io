---
layout  : wiki
title   : 선택사항 열어두기
summary : 좋은 아키텍트는 결정되지 않은 사항의 수를 최대화한다
date    : 2021-02-14 12:44:50 +0900
updated : 2021-02-14 13:16:19 +0900
tag     : architecture Uncle-Bob
toc     : true
public  : true
parent  : [[architecture]]
latex   : false
---
* TOC
{:toc}

## From: 클린 아키텍처

엉클 밥은 클린 아키텍처 5장에서 다음과 같이 말한다. 추상화와 [[SOLID]]에 대한 통찰력이 돋보인다.

>
소프트웨어를 만든 이유는 기계의 행위를 빠르고 쉽게 변경하는 방법이 필요했기 때문이다.
하지만 이러한 유연성은 시스템의 형태, 컴포넌트의 배치 방식, 컴포넌트가 상호 연결되는 방식에 상당히 크게 의존한다.
>
소프트웨어를 부드럽게 유지하는 방법은 선택사항을 가능한 한 많이, 그리고 가능한 한 오랫동안 열어 두는 것이다.
그렇다면 열어 둬야 할 선택사항이란 무엇일까?
그것은 바로 중요치 않은 세부사항(detail)이다.
>
모든 소프트웨어 시스템은 주요한 두 가지 구성요소로 분해할 수 있다.
바로 정책(policy)과 세부사항이다.
정책 요소는 모든 업무 규칙과 업무 절차를 구체화한다.
정책이란 시스템의 진정한 가치가 살아 있는 곳이다.
>
세부사항은 사람, 외부 시스템, 프로그래머가 정책과 소통할 때 필요한 요소지만,
정책이 가진 행위에는 조금도 영향을 미치지 않는다.
이러한 세부사항에는 입출력 장치, 데이터베이스, 웹 시스템, 서버, 프레임워크, 통신 프로토콜 등이 있다.
>
아키텍트의 목표는 시스템에서 정책을 가장 핵심적인 요소로 식별하고,
동시에 세부사항은 정책에 무관하게 만들 수 있는 형태의 시스템을 구축하는 데 있다.
이를 통해 세부사항을 결정하는 일은 미루거나 연기할 수 있게 된다.

이러한 사항들에 대해 엉클 밥은 네 가지 예를 들어 설명한다.

- 개발 초기에는 데이터베이스 시스템을 선택할 필요가 없다.
- 개발 초기에는 웹 서버를 선택할 필요가 없다.
- 개발 초기에는 REST를 적용할 필요가 없다.
- 개발 초기에는 의존성 주입(dependency injection) 프레임워크를 적용할 필요가 없다.

즉, 소프트웨어를 작성하는 이유에 해당하는 고수준의 정책이 아닌 설정(configuration)이나 인프라와 관련된 선택지는 모두 열어두는 것이 중요하다는 것이다.

>
세부사항에 몰두하지 않은 채 고수준의 정책을 만들 수 있다면,
이러한 세부사항에 대한 결정을 오랫동안 미루거나 연기할 수 있다.
이러한 결정을 더 오래 참을 수 있다면, 더 많은 정보를 얻을 수 있고, 이를 기초로 제대로 된 결정을 내릴 수 있다.

선택사항을 미뤄두면 더 나은 결정을 내리는 데에 도움이 된다.

> 다른 누군가가 이미 그러한 결정을 내렸다면?
또는 회사에서 특정 데이터베이스, 특정 웹 서버, 또는 특정 프레임워크에 기여해왔다면?
뛰어난 아키텍트라면 이러한 결정이 아직 내려지지 않은 것처럼 행동하며,
여전히 결정을 가능한 한 오랫동안 연기하거나 변경할 수 있는 형태로 시스템을 만든다.
>
좋은 아키텍트는 결정되지 않은 사항의 수를 최대화한다.

## From: Spring Framework Overview

[Spring Framework Overview의 Design Philosophy]( https://docs.spring.io/spring-framework/docs/current/reference/html/overview.html#overview ) 첫 번째로 이와 관련된 이야기가 나온다.

> Provide choice at every level. Spring lets you defer design decisions as late as possible. For example, you can switch persistence providers through configuration without changing your code. The same is true for many other infrastructure concerns and integration with third-party APIs.
>
모든 레벨에서 선택권을 제공한다. **Spring을 쓰면 설계에 대한 결정을 최대한 나중으로 미룰 수 있다.** 예를 들어 개발자가 작성한 코드를 수정하지 않아도, 설정(configuration)을 바꾸는 것만으로 persistence providers를 교체할 수 있다. 다른 많은 인프라 문제, 서드 파티 API와의 통합에서도 이 원칙은 통한다.

## 함께 읽기

- [[spring-documents-overview]]

## 참고문헌

- [ROB] 클린 아키텍처 / 로버트 C. 마틴 저/송준이 역 / 인사이트(insight) / 초판 1쇄 2019년 08월 20일 / 원제 : Clean Architecture: A Craftsman's Guide to Software Structure and Design

