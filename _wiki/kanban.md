---
layout  : wiki
title   : 칸반 (Kanban)
summary : 
date    : 2019-01-02 22:45:37 +0900
updated : 2020-01-16 22:15:23 +0900
tag     : agile
toc     : true
public  : true
parent  : [[software-engineering]]
latex   : false
---
* TOC
{:toc}

## Kanban 칸반?

>
* Visualize the workflow
    * Split the work into pieces, write each item on a card and put on the wall
    * Use named columns to illustrate where each item is in the workflow.
* Limit WIP (work in progress) – assign explicit limits to how many items may be in progress at each workflow state.
* Measure the lead time (average time to complete one item, sometimes called "cycle time"), optimize the process to make lead time as small and predictable as possible. 

* 작업 흐름을 시각화한다.
    * 일을 작은 조각으로 쪼갠다. 그리고 카드에 적어서 벽에 붙인다.
    * 각 칼럼에 이름을 붙여서 각 카드가 작업 흐름의 어디에 있는지 알아볼 수 있게 한다.
* 진행중인 업무의 수를 제한한다.
    * 각 작업 흐름별로 작업중인 업무 수의 제한을 명확하게 둔다.
* 업무 하나를 완료하는 데 소요되는 평균 시간(cycle time)을 측정한다.
    * 그리고 그 시간을 줄이고 예측할 수 있도록 하는 것을 목표로 프로세스를 최적화한다.

## 칸반이 왜 필요한가?

> 기술 작업에서는 작업 티켓을 다른 팀에 재할당하는 것 같이 버튼 클릭만으로 업무를 이동시킬 수 있다. 이렇듯 작업을 이동하기가 매우 쉽기 때문에 불완전한 정보로 인한 팀들 사이의 업무 미루기가 끊임없이 계속될 수 있다. 고객에게 약속한 것을 뒤늦게 제공하거나 프로덕션 환경에서 애플리케이션이 실패할 때까지 문제점이 완전히 보이지 않는 상태로 다운스트림 워크센터로 전달되기도 한다.
<br/><br/>
작업이 원활하게 진행되고 있는 부분과 작업이 대기 중이거나 중단된 부분을 확인하기 위해서는 **작업을 가능한 한 시각화해야 한다**. 이를 수행하는 가장 좋은 방법 중 하나는 칸반 보드나 스프린트 계획 보드와 같은 시각적인 작업 보드를 사용해 실물 카드나 전자 카드에 작업 상태를 표시하는 것이다. 작업은 좌측에서 시작해(때때로, backlog에서 가져옴), 워크센터에서 워크센터(컬럼으로 표시됨)로 이동한 후 보드의 우측에 도달하면 완료된다. 일반적으로 (보드의 우측)컬럼은 "완료(Done)"나 "프로덕션에서 실행 중(in Porduction)"으로 표시된다.
<br/><br/>
작업을 시각화할 수 있을 뿐 아니라 작업이 가능한 한 빠르게 좌측에서 우측으로 진행될 수 있도록 관리할 수도 있다. 보드에 카드가 올라간 이후부터 "완료" 컬럼으로 이동할 때까지의 리드타임도 측정할 수 있다.
<br/><br/>
이상적인 칸반 보드는 전체적인 가치 흐름에 걸쳐 있으며, 보드의 우측에 도달한 경우에만 완료된 것으로 정의한다. **개발 팀에서 기능 구현을 완료했다고 해서 작업이 완료되는 것이 아니라** 애플리케이션이 프로덕션 환경에서 성공적으로 실행되고, **고객에게 가치를 제공해야만 작업이 완료된다**.[^devops-handbook-56]

## 진행죽인 작업(WIP)의 수 제한

각 컬럼에 머무르는 WIP 티켓이나 카드의 수의 최대값에 제한을 두는 방법이다.

* 예: 테스트 단계에 있을 수 있는 카드의 수를 최대 3개로 제한한다.
    * 3개 중 하나가 다른 단계로 이동해야만 다른 카드가 테스트 단계로 들어올 수 있다.

> WIP의 수를 제한하면 작업 완료를 방해하는 문제를 쉽게 발견할 수 있다. 예를 들어, WIP를 제한하면 다른 누군가의 작업을 기다리고 있기 때문에 아무런 작업도 하지 못하고 있었다는 사실이 드러난다. 새로운 일을 시작하는 것에 대한 유혹이 있을 수 있지만(즉, "아무것도 하지 않는 것보다는 낫다."), 지연을 유발하는 원인을 찾아 문제를 해결하는 것이 훨씬 더 좋은 방법이다. 사람들이 여러 프로젝트에 배정된 경우에는 잘못된 멀티태스킹과 우선순위와 관련된 문제가 많이 발생한다.[^devops-handbook-58]

## 운영 업무를 칸반 보드에 시각화하자

> 일반적으로, 개발 팀의 작업은 프로젝트 보드나 칸반 보드에 시각화한다. 그러나 고객 가치가 창출되는 프로덕션 환경에서 애플리케이션을 성공적으로 실행하기 위해 실제로 수행해야 하는 관련 운영 작업은 표시하지 않는다. 그 결과, 위급한 상황이 발생할 수도 있고, 마감 일정이 위태로워지거나 프로덕션 중단 사태가 발생할 때까지 필요한 운영 작업을 인지하지 못하게 될 수도 있다.
<br/><br/>
운영은 제품 가치 흐름의 일부기 때문에 공유된 칸반 보드상에 제품 출시와 관련된 운영 작업을 포함시켜야 한다. 이렇게 하면, 제품 지원에 필요한 모든 운영 작업을 추적할 수 있을 뿐 아니라 코드를 프로덕션 환경으로 배포하는 데 필요한 모든 운영 작업을 보다 명확하게 파악할 수 있다. 그리고 운영 작업이 차단된 부분과 작업이 단계적으로 확대돼야 하는 부분을 파악해 개선이 필요한 부분을 강조할 수 있다.
<br/><br/>
칸반 보드는 가시성을 창출하는 이상적인 도구다. 가시성은 모든 가치 흐름에서 운영 작업을 적절하게 인식하고 통합하는 핵심적인 구성 요소다. 칸반 보드를 잘 이용하면 조직도의 작성 방법과는 관계없이 시장지향적인 성과를 얻을 수 있다.
[^devops-handbook-153]

## Links

* [Kanban vs Scrum - How to make the most of both (PDF)](https://www.crisp.se/file-uploads/Kanban-vs-Scrum.pdf )
* [Kanban and Scrum - Making the Most of Both (Free version Download)](https://www.infoq.com/minibooks/kanban-scrum-minibook )
* [Cross-functional team (wikipedia)](https://en.wikipedia.org/wiki/Cross-functional_team )
* [자기조직화 (위키백과)](https://ko.wikipedia.org/wiki/%EC%9E%90%EA%B8%B0%EC%A1%B0%EC%A7%81%ED%99%94 )
    * [Self-organization](https://en.wikipedia.org/wiki/Self-organization )

## 참고문헌

* 데브옵스 핸드북 / 진 킴, 제즈 험블, 패트릭 드부아, 존 윌리스 저/김영기 역 외 1명 정보 더 보기/감추기 / 에이콘출판사 / 2018년 07월 06일 / 원제: The DevOps Handbook: How to Create World-Class Agility, Reliability, and Security in Technology Organizations

## 주석

[^devops-handbook-56]: 데브옵스 핸드북. 56쪽.
[^devops-handbook-58]: 데브옵스 핸드북. 58쪽.
[^devops-handbook-153]: 데브옵스 핸드북. 153쪽.

