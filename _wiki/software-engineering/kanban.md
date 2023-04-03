---
layout  : wiki
title   : 칸반 (Kanban)
summary : 
date    : 2019-01-02 22:45:37 +0900
updated : 2023-04-03 22:06:06 +0900
tag     : agile
resource: E5/24DFF0-39F8-41F6-8FC0-385875E125D4
toc     : true
public  : true
parent  : [[/software-engineering]]
latex   : false
---
* TOC
{:toc}

## Kanban 칸반?

다음은 [Kanban and Scrum](https://www.infoq.com/minibooks/kanban-scrum-minibook ) 3쪽을 인용한 것이다.

>
**Kanban in a nutshell**
>
> - Visualize the workflow
>     - Split the work into pieces, write each item on a card and put on the wall
>     - Use named columns to illustrate where each item is in the workflow.
> - Limit WIP (work in progress) – assign explicit limits to how many items may be in progress at each workflow state.
> - Measure the lead time (average time to complete one item, sometimes called "cycle time"), optimize the process to make lead time as small and predictable as possible. 

- 작업 흐름을 시각화한다.
    - 일을 작은 조각으로 쪼갠다. 그리고 카드에 적어서 벽에 붙인다.
    - 각 칼럼에 이름을 붙여서 각 카드가 작업 흐름의 어디에 있는지 보이게 한다.
- WIP의 수를 제한한다.
    - 각 흐름별로 작업중인 업무의 수를 몇 개로 제한할지 명확하게 정한다.
- 업무 하나를 완료하는 데 소요되는 평균 시간(cycle time)을 측정한다.
    - 그리고 그 시간을 줄이고 예측 가능하게 만들기 위해 프로세스를 최적화한다.

## 칸반이 왜 필요한가?

>
작업이 원활하게 진행되고 있는 부분과 작업이 대기 중이거나 중단된 부분을 확인하기 위해서는 **작업을 가능한 한 시각화해야 한다**. 이를 수행하는 가장 좋은 방법 중 하나는 칸반 보드나 스프린트 계획 보드와 같은 시각적인 작업 보드를 사용해 실물 카드나 전자 카드에 작업 상태를 표시하는 것이다. 작업은 좌측에서 시작해(때때로, backlog에서 가져옴), 워크센터에서 워크센터(컬럼으로 표시됨)로 이동한 후 보드의 우측에 도달하면 완료된다. 일반적으로 (보드의 우측)컬럼은 "완료(Done)"나 "프로덕션에서 실행 중(in Porduction)"으로 표시된다.
>
작업을 시각화할 수 있을 뿐 아니라 작업이 가능한 한 빠르게 좌측에서 우측으로 진행될 수 있도록 관리할 수도 있다. 보드에 카드가 올라간 이후부터 "완료" 컬럼으로 이동할 때까지의 리드타임도 측정할 수 있다.
[^devops-handbook-56]

- 작업을 시각화해야 '원활한 작업', '대기중인 작업', '중단된 작업'을 확인하기 좋다.
- 작업을 시각화하는 좋은 방법 중 하나가 바로 칸반 보드.
    - 리드 타임도 측정할 수 있다.

## 진행중인 작업(WIP)의 수 제한

> WIP의 수를 제한하면 작업 완료를 방해하는 문제를 쉽게 발견할 수 있다. 예를 들어, WIP를 제한하면 다른 누군가의 작업을 기다리고 있기 때문에 아무런 작업도 하지 못하고 있었다는 사실이 드러난다. 새로운 일을 시작하는 것에 대한 유혹이 있을 수 있지만(즉, "아무것도 하지 않는 것보다는 낫다."), 지연을 유발하는 원인을 찾아 문제를 해결하는 것이 훨씬 더 좋은 방법이다. 사람들이 여러 프로젝트에 배정된 경우에는 잘못된 멀티태스킹과 우선순위와 관련된 문제가 많이 발생한다.[^devops-handbook-58]

각 컬럼에 머무르는 WIP 티켓이나 카드의 수의 최대값에 제한을 둔다.

- 예: 테스트 단계에 있는 카드의 수를 최대 3개로 제한한다.

### 왜 WIP에 제한을 두는가?

>
진행 중 업무 제한은 시스템에 긴장을 더한다.
사람들은 일을 끝내지 못하게 가로막는 문제를 쇄신하고 해결해야만 한다.
진행 중 업무 제한은 필요한 대화를 이끌어 낸다.
일부 구성원은 진행중 업무 제한이 자신의 업무에 불편을 준다고 느낄 수 있지만,
한편으로는 진행 중 업무 제한 때문에 생긴 긴장감이 팀의 창의성을 발휘해 문제를 해결할 수 있게 만든다.
진행 중 업무 제한은 사람들이 무리한 업무량을 따라잡기 위해 애쓰지 않게 보호하고, 일을 완료하는 데 도움이 되는 규칙을 적용한다.
시스템에 필요한 긴장감을 조성하는 것이 진행 중 업무 제한이다.
사람들이 "안 돼. 지금은 하고 있는 일이 많아서 당장 그 일을 시작할 수 없어."라고 말할 수 있게 해준다.
즉 업무를 완료할 수 있게 하는 제약 요소인 셈이다.
[^visible-109]

- WIP limit은 문제 해결을 위한 대화와 팀의 단합을 이끌어낸다.
- 팀이 무리한 업무량에 짓눌리지 않게 보호해준다.
- 팀원이 추가 업무에 대해 거절할 근거가 된다.
    - 이러한 거절은 생산성 확보에 도움이 된다.

## 운영 업무도 칸반 보드에 올려두자

>
일반적으로, 개발 팀의 작업은 프로젝트 보드나 칸반 보드에 시각화한다. 그러나 고객 가치가 창출되는 프로덕션 환경에서 애플리케이션을 성공적으로 실행하기 위해 실제로 수행해야 하는 관련 운영 작업은 표시하지 않는다. 그 결과, 위급한 상황이 발생할 수도 있고, 마감 일정이 위태로워지거나 프로덕션 중단 사태가 발생할 때까지 필요한 운영 작업을 인지하지 못하게 될 수도 있다.
>
운영은 제품 가치 흐름의 일부기 때문에 공유된 칸반 보드상에 제품 출시와 관련된 운영 작업을 포함시켜야 한다. 이렇게 하면, 제품 지원에 필요한 모든 운영 작업을 추적할 수 있을 뿐 아니라 코드를 프로덕션 환경으로 배포하는 데 필요한 모든 운영 작업을 보다 명확하게 파악할 수 있다. 그리고 운영 작업이 차단된 부분과 작업이 단계적으로 확대돼야 하는 부분을 파악해 개선이 필요한 부분을 강조할 수 있다.
[^devops-handbook-153]


## 업무 카테고리화

### 상사가 업무 카테고리를 정의해주면 곤란하다

>
상사나 몇몇 사람들이 전체 팀의 업무 항목 카테고리를 결정하는 것은 피해야 한다.
실제 업무를 수행하는 사람들은 항상 아래의 두 가지 항목을 기준으로 업무 흐름 관리 시스템 설계에 참여해야 한다.
>
> 1. 실무자가 참여해서 전체 팀의 요구와 수요를 만족하는 카테고리의 적정 숫자와 유형을 결정하도록 돕는다.
> 2. 사람들은 무언가를 만들어내는 과정에 참여할 때 주인의식을 갖게 된다. 주인의식은 문제를 해결하고 원하는 결과를 얻도록 노력할 수 있는 동기를 부여한다.
[^visible-97]

## Links

* [Kanban vs Scrum - How to make the most of both (PDF)](https://www.crisp.se/file-uploads/Kanban-vs-Scrum.pdf )
* [Kanban and Scrum - Making the Most of Both (Free version Download)](https://www.infoq.com/minibooks/kanban-scrum-minibook )
* [Cross-functional team (wikipedia)](https://en.wikipedia.org/wiki/Cross-functional_team )
* [자기조직화 (위키백과)](https://ko.wikipedia.org/wiki/%EC%9E%90%EA%B8%B0%EC%A1%B0%EC%A7%81%ED%99%94 )
    * [Self-organization](https://en.wikipedia.org/wiki/Self-organization )

## 참고문헌

- 데브옵스 핸드북 / 진 킴, 제즈 험블, 패트릭 드부아, 존 윌리스 저/김영기 역 외 1명 정보 더 보기/감추기 / 에이콘출판사 / 2018년 07월 06일 / 원제: The DevOps Handbook: How to Create World-Class Agility, Reliability, and Security in Technology Organizations
- 업무 시각화 / 도미니카 드그란디스 저/유지은, 김혜주 역/조승빈 감수 / 에이콘출판사 / 발행: 2020년 01월 31일 / 원제 : Making Work Visible

## 주석

[^devops-handbook-56]: 데브옵스 핸드북. 56쪽.
[^devops-handbook-58]: 데브옵스 핸드북. 58쪽.
[^devops-handbook-153]: 데브옵스 핸드북. 153쪽.
[^visible-97]: 업무 시각화. 2.1장. 97쪽.
[^visible-109]: 업무 시각화. 2.2장. 109쪽.

