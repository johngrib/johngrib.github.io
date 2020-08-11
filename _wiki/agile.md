---
layout  : wiki
title   : 애자일(agile)에 대한 토막글 모음
summary : 
date    : 2019-04-24 22:55:36 +0900
updated : 2020-08-11 23:35:03 +0900
tag     : agile
toc     : true
public  : true
parent  : [[software-engineering]]
latex   : false
---
* TOC
{:toc}

## 애자일 소프트웨어 개발 선언

* [Manifesto for Agile Software Development]( https://agilemanifesto.org/iso/en/manifesto.html )
* [애자일 소프트웨어 개발 선언]( https://agilemanifesto.org/iso/ko/manifesto.html )

```text
애자일 소프트웨어 개발 선언

우리는 소프트웨어를 개발하고, 또 다른 사람의 개발을
도와주면서 소프트웨어 개발의 더 나은 방법들을 찾아가고
있다. 이 작업을 통해 우리는 다음을 가치 있게 여기게 되었다:

공정과 도구보다 개인과 상호작용을
포괄적인 문서보다 작동하는 소프트웨어를
계약 협상보다 고객과의 협력을
계획을 따르기보다 변화에 대응하기를

가치 있게 여긴다. 이 말은, 왼쪽에 있는 것들도 가치가 있지만,
우리는 오른쪽에 있는 것들에 더 높은 가치를 둔다는 것이다.

Kent Beck           James Grenning  Robert C. Martin
Mike Beedle         Jim Highsmith   Steve Mellor
Arie van Bennekum   Andrew Hunt     Ken Schwaber
Alistair Cockburn   Ron Jeffries    Jeff Sutherland
Ward Cunningham     Jon Kern        Dave Thomas
Martin Fowler       Brian Marick

© 2001, 상기 저자들
이 선언문은 어떤 형태로든 자유로이 복사할 수 있지만,
본 고지와 함께 전문으로서만 가능하다.
```

## From: Robert C. Martin 트위터

> Agile is not about going faster.
Agile is about destroying hope.
The data produced by a good agile team provides a cold dose of reality to the managers — in time for them to — manage.[^bob-twitter]

## From: 리팩토링 데이터베이스

* 1. 진화적 데이터베이스 개발 - 1.2 진화적 데이터 모델링에서 인용

> 이전에 뭐라고 들었든 상관없이,
진화적이고 애자일한 기술은 단순한 "일단 짜보고 고치기(code-and-fix)"의 새로운 이름이 아니다.
여전히 시스템을 구축하기 이전에 요구사항을 찾아내야 하고 아키텍처와 디자인을 처음부터 끝까지 깊이 생각해야 한다.
그리고 이렇게 하는 한 가지 좋은 방법은 코딩하기 전에 먼저 모델링을 하는 것이다.

code-and-fix: 이러한 개발 방식은 계획 수립과 분석, 설계의 상위 과정을 무시하고 오로지 코딩(프로그래밍)만을 강조하는, 빨리 일정을 끝내려는 변형된 무리한 속성 과정이다.

## From: 엔터프라이즈 애플리케이션 아키텍처 패턴

> 한 가지 다행인 것은 영구적인 결정이란 없다는 것이다.
아키텍처 리팩터링은 힘들고 예기치 못한 비용이 많이 들지만 불가능한 것은 아니다.
이 경우 여러분에게 해줄 수 있는 가장 좋은 조언은 익스트림 프로그래밍 전체가 마음에 들지는 않더라도 지속적 통합,
테스트 주도 개발, 리팩터링이라는 세 가지 기술적 기법은 진지하게 고려해보라는 것이다.
이러한 기법이 만병통치약은 아니지만 마음을 바꿀 필요가 있을 때 해야 할 일을 훨씬 쉽게 만들어준다.
그리고 여러분이 필자가 만난 그 누구보다 운과 실력이 좋은 사람이 아니라면 이러한 기법이 반드시 필요할 것이다.[^fowler-ent]

## From: 데브옵스 핸드북

애자일 선언문에 대해.

> 애자일 매니페스토(Agile Manifesto)는 2001년 소프트웨어 개발 분야의 선도적인 사상가 17명에 의해 탄생했다. 이들은 폭포수 개발(waterfall development)과 같은 중량 소프트웨어 개발 프로세스나 래셔널 통합 프로세스(Rational Unified Process)와 같은 방법론과는 다른, 가벼운 가치 체계와 원칙을 만들고자 했다.
>
> 애자일의 핵심 원칙은 "동작하는 소프트웨어를 몇 주 또는 몇 개월의 짧은 기간 동안 자주 출시"하는 것으로 대규모의 폭포수 방식의 출시 대신 소규모 배치 및 증가분 출시(incremental release)에 대한 열망을 강조했다. 다른 원칙들은 고신뢰성 관리 모델에서 자발적으로 일하는 소규모 팀의 필요성을 강조했다.
>
> 애자일은 많은 개발 조직의 생산성을 획기적으로 향상시킨 것으로 평가된다.[^devops-handbook-43]

애자일 운동에 대해.

> 애자일 운동은 2001년에 시작됐다. 애자일 선언문은 폭포수 개발 방법과 같은 중량 소프트웨어 개발 프로세스와 RUP(Rational Unified Process)와 같은 방법론에 맞서기 위해 만들어졌다. 애자일 선언문은 DP와 DSDM과 같은 경량 방법론으로의 전환보다 광범위한 목표를 갖고 있는 소프트웨어 개발 분야의 저명한 사상가 17명에 의해 작성됐다.  
애자일의 핵심 원칙은 "2주에서 2달 사이에 동작하는 소프트웨어를 자주 전달하고 더 짧은 시간 간격을 선호하는 것"이다. 소규모이면서 스스로 동기를 부여하는 팀과 높은 신뢰를 갖는 관리 모델에서 작업하는 원칙과 같은 크기의 배치 작업을 강조하는 원칙이 있다. 애자일은 스크럼(Scrum), 스탠드업(Standups)과 같은 도구의 실천 방법과도 관련돼 있다.[^devops-handbook-424]

## 참고문헌

* 리팩토링 데이터베이스 진화적 데이터베이스 디자인 / 스캇 W. 엠블러, 프라모드 J. 세달라지 공저 / 정원혁, 이재범, 권태돈, 성대중, 현중균 공역 / 위키북스 / 2007년 06월 29일 / 원제 : Refactoring Databases
* 엔터프라이즈 애플리케이션 아키텍처 패턴 / 마틴 파울러 저 / 최민석 역 / 위키북스 / 2쇄 2018년 10월 31일 / 원제 : Patterns of Enterprise Application Architecture
* 데브옵스 핸드북 / 진 킴, 제즈 험블, 패트릭 드부아, 존 윌리스 저/김영기 역 외 1명 정보 더 보기/감추기 / 에이콘출판사 / 2018년 07월 06일 / 원제: The DevOps Handbook: How to Create World-Class Agility, Reliability, and Security in Technology Organizations

## 주석

[bob-twitter]: https://twitter.com/unclebobmartin/status/1199000963950022656
[^bob-twitter]: [Uncle Bob Martin 오전 1:24 · 2019년 11월 26일][bob-twitter]
[^fowler-ent]: 엔터프라이즈 아키텍처 패턴. 8장 종합. 102쪽.
[^devops-handbook-43]: 데브옵스 핸드북. 43쪽.
[^devops-handbook-424]: 데브옵스 핸드북. 424쪽.

