---
layout  : wiki
title   : 스크럼 (Scrum)
summary : 
date    : 2019-01-02 22:45:37 +0900
updated : 2021-01-10 23:32:21 +0900
tag     : agile
toc     : true
public  : true
parent  : [[software-engineering]]
latex   : false
---
* TOC
{:toc}


## From: HARD CODE

- [The Agile bullet][agile-bullet]

에릭 브레히너의 마이크로소프트 사내 칼럼으로, 2006년 3월 1일 작성된 글이다.

### 스크럼은 약어인가?

>
**미신 #7: 스크럼은 약어다**
>
스크럼은 가장 널리 알려지고 가장 많이 적용되는 애자일 기법의 하나지만 약어는 아니다.
스크럼은 럭비 용어로, 팀이 공을 되찾으려고 팔짱 끼고 전진하는 모습을 가리킨다.
스크럼팀이 매일 여는 간단 회의(Standup meeting)도 스크럼이라고 부른다.
마이크로소프트에서는 스크럼과 유사한 기법을 10여년 전부터, 그러니까 용어가 생기기 훨씬 전부터 사용해 왔다.
스크럼은 가장 단순한 애자일 기법 중 하나며, 많은 마이크로소프트 팀이 이미 사용하는 방식과 가장 유사하다.
[^hardcode-2]

### 에릭 브레히너가 말하는 스크럼

>
마지막으로 소개할 기법은 스크럼으로, 가장 오해를 많이 받는 기법이다.
익스트림 프로그래밍과 스크럼을 혼동하는 사람도 있고(실제로 익스트림 프로그래밍은 스크럼을 사용하지 않는다)
애자일과 스크럼을 동일하게 취급하는 사람도 있다(도대체 왜?).
이 중에서도 가장 혼란스러운 점이라면 스크럼이 사용하는 이상한 용어들이다.
스크럼 마스터(Scrum Master), 백로그(backlog), 번다운(burn-down), 스프린트(spring), 심지어 닭과 돼지라는 용어도 나온다. 관리자들이 겁먹고 달아날 만하다. 큰 실수다.  
(중략)
[^hardcode-2]

- 스크럼: 매일 모여서서 진행하는 간단한 회의
- 스크럼 마스터: 기능팀 조직자
- 백로그: 기능 목록 혹은 작업 항목 목록
- 번다운: 남은 업무를 표시하는 그래프
- 스프린트: 작은 중간목표
- 닭과 돼지: 기업 농장에 사는 동물들

>
- 스크럼에서 일일 간단 회의는 아주 체계적이며 유용한 자료를 수집한다. 스크럼 마스터(팀 조직자)는 각 팀원에게 어제 회의 이후로 진행한 업무와 (걸린 시간과) 내일 회의까지 진행할 업무와 (남은 업무량과) 업무 장애 요소를 묻는다.
>
- 스크럼에서 수집하는 자료는 스프레드시트나 데이터베이스에 저장한다. 스프레드시트 기능을 이용하면 업무에 걸리는 시간, 완료 날짜, 진행 중인 업무, 계획 변경 등 다양한 프로젝트 사안을 분석하기 쉽다. 스크럼 기법에서 가장 많이 사용하는 그래프는 시간 대비 남은 작업량을 보여주는 번다운 차트다.
>
- 스크럼 마스터는 팀에서 독립적인 위치에 선다. 아예 팀 소속이 아니면 더욱 좋지만 현실적으로 쉽지 않다. 스크럼 마스터는 회의를 짧고 간단하게 이끌어야 한다.
>
- 기능 목록이나 기능 일정은 **제품 백로그**, 작업 항목 목록이나 작업 일정은 **스프린트 백로그**라고 부른다. 두 목록을 분리함으로써 관리층은 제품에 넣을 기능(제품 백로그)에, 기능팀은 닥친 업무(스프린트 백로그)에 집중할 수 있다. 스크럼 마스터는 보통 일주일에 한 번씩 관리층과 만나서 (예를 들어, 주간 책임자 회의에서) 경과와 상태를 보고한다.
>
- 작은 중간목표를 뜻하는 스프린트는 기간을 고정한다. 스프린트는 지정한 일 수가 지나면 끝나는데, 대략 30일 정도가 보통이다.
>
- 스프린트가 끝날 때마다 기능팀은 관리층과 만나 업무 진행 상태를 검토하고(꽤 괜찮은 변화라고 생각하지 않는가?), 잘한 점과 개선할 점을 토론하고(제품을 출시하고 나서 사후분석을 수행할 때까지 일 년 아니 10년을 기다리는 방식보다 훨씬 낫지 않은가?), 다음 스프린트에 주력할 작업 항목을 다시 예측한다(계획과 예측값이 변했다고? 그럴 리가!).
>
일일, 주간, 월간 피드백 메커니즘을 둠으로써 스크럼팀은 변화하는 환경에서도 효율성과 탄력성을 잃지 않는다.
또한 핵심 자료를 수집함으로써 스크럼팀과 관리층은 프로젝트 진행 상태와 업무 장애 요인을 사전에 파악한다.
관리층이 소유하는 기능 목록과 기능팀이 소유하는 작업 항목 목록을 분리함으로써 스크럼팀은 방향을 잃지 않고 업무에 집중한다.
이런 방식으로 스크럼은 팀 구성원 각자와 관리층 모두에게 책임을 부여한다.
[^hardcode-2]

### 강요하면 안 된다

에릭 브레히너는 강요하면 안 된다고 강조한다.

> 관리자들이 팀에게 특정 방법론을 강요하는 경우를 내 주변에서 많이 봤다.
스크럼처럼 인기 있는 기법일지라도 강요는 반드시 역효과를 낸다.
관리자는 제안하고, 보조하고, 장려하는 역할에 서야 한다.
절대로 강요해서는 안 된다.
[^hardcode-2]

## From: Kanban and Scrum - Making the Most of Both

>
* Split your organization into small, cross-functional, self-organizing teams.
* Split your work into a list of small, concrete deliverables. Sort the list by priority and estimate the relative effort of each item.
* Split time into short fixed-length iterations (usually 1 – 4 weeks), with potentially shippable
code demonstrated after each iteration.
* Optimize the release plan and update priorities in collaboration with the customer, based on insights gained by inspecting the release after each iteration.
* Optimize the process by having a retrospective after each iteration. 

* 조직을 작게 쪼갠다.
    * 기능적으로 직교하도록 쪼갠다.
    * 스스로 운영할 수 있도록 쪼갠다.
* 업무를 작은 일들의 목록으로 쪼갠다.
    * 배포 가능한 단위로 쪼갠다.
    * 목록은 우선순위에 따라 정렬한다.
    * 각 업무 항목에 대해 상대적인 노력의 양을 추정한다.
* 시간을 쪼갠다.
    * 시간을 짧고 고정된 단위의 이터레이션(1~4 주 정도)으로 쪼갠다.
    * 각 이터레이션마다 출시 가능한 코드가 나와야 하고, 시연도 가능해야 한다.
* 릴리즈 계획을 최적화한다. 그리고 고객과 함께 검토하여 일의 우선순위를 업데이트한다.
    * 매 이터레이션마다 배포된 결과를 검토하면서 얻은 깨달음을 활용하도록 한다.
* 매 이터레이션마다 회고를 하여 업무 프로세스를 최적화한다.

>
So instead of a large group spending a long time building a big thing,
we have a small team spending a short time building a small thing.
But integrating regularly to see the whole. 

* 우리는 커다란 그룹에서 오랜 시간을 사용하여 커다란 결과를 만드는 것보다,
작은 팀으로 짧은 시간 동안 작은 결과를 만들어 내도록 한다.
* 단, 항상 전체를 조망할 수 있도록 주기적으로 결과를 전체에 통합한다.

## From: 데브옵스 핸드북

> 대부분의 최신 소프트웨어 개발 방법론은 빅뱅 방식(예를 들어, 폭포수 모델) 대신, 짧고 반복적인 개발 주기를 규정하고 있다. 일반적으로, 배포 주기가 길어질수록 결과가 나빠진다. 예를 들어 스크럼 방법론에서 스프린트(sprint)는 시간이 표시된 개발 완료 주기(일반적으로, 1개월이나 그 이하)로, 여기에서 "완료(Done)"란 "작동하고, 잠재적으로 출시 가능한 코드"가 있는 경우로 정의된다.[^devops-handbook-168]

## 참고문헌

- [Kanban vs Scrum - How to make the most of both (PDF)](https://www.crisp.se/file-uploads/Kanban-vs-Scrum.pdf )
- HARD CODE / 박재호 역 / 에이콘출판사 / 발행 2009년 06월 30일 / 원제 : I. M. Wright's Hard Code
- 데브옵스 핸드북 / 진 킴, 제즈 험블, 패트릭 드부아, 존 윌리스 저/김영기 역 외 1명 정보 더 보기/감추기 / 에이콘출판사 / 2018년 07월 06일 / 원제: The DevOps Handbook: How to Create World-Class Agility, Reliability, and Security in Technology Organizations

## Links

* [Kanban and Scrum - Making the Most of Both (Free version Download)](https://www.infoq.com/minibooks/kanban-scrum-minibook )
* [Cross-functional team (wikipedia)](https://en.wikipedia.org/wiki/Cross-functional_team )
* [자기조직화 (위키백과)](https://ko.wikipedia.org/wiki/%EC%9E%90%EA%B8%B0%EC%A1%B0%EC%A7%81%ED%99%94 )
    * [Self-organization](https://en.wikipedia.org/wiki/Self-organization )

## 주석

[^devops-handbook-168]: 데브옵스 핸드북. 168쪽.
[^hardcode-2]: HARD CODE. 2장.

[agile-bullet]: https://imwrightshardcode.com/2006/03/the-agile-bullet/

