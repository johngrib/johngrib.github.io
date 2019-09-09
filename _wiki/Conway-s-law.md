---
layout  : wiki
title   : 콘웨이의 법칙(Conway's law)
summary : 소프트웨어 구조는 개발 조직의 커뮤니케이션 구조를 닮는다.
date    : 2017-12-04 21:34:28 +0900
updated : 2019-09-09 16:43:05 +0900
tag     : proverb law
toc     : true
public  : true
parent  : proverb
latex   : false
---
* TOC
{:toc}

# 개요

> Any organization that designs a system (defined broadly) will produce a design whose structure is a copy of the organization's communication structure.[^origin]

* 소프트웨어 구조는 해당 소프트웨어를 개발한 조직의 커뮤니케이션 구조를 닮게 된다.
* 콘웨이가 논문을 Havard Business Review에 제출했을 때에는 가설을 입증할 수 없다는 이유로 거절당했다고 한다.[^reject]
    * 그러나 개발자들 사이에서는 상식의 반열에 오른 법칙이다.

# 멜빈 콘웨이(Melvin E. Conway)

* 멜빈 콘웨이는 컴퓨터 과학자이자, 해커이다.
* SAVE라 불리는 Burroughs 220을 위한 어셈블러를 작성한 바 있다.

# 인용과 해석

## 콘웨이의 논문에 소개된 콘웨이의 법칙

* 1968년4월, Datamation 지에 실린 콘웨이의 논문 "HOW DO COMMITTEES INVENT?".

결론 부분만 인용하고 간단하게 번역해 보았다.

> Conclusion  
<br/>
The basic thesis of this article is that organizations which design systems (in the broad sense used here) are constrained to produce designs which are copies of the communication structures of these organizations. We have seen that this fact has important implications for the management of system design. Primarily, we have found a criterion for the structuring of design organizations: a design effort should be organized according to the need for communication.  
This criterion creates problems because the need to communicate at any time depends on the system concept in effect at that time.
Because the design which occurs first is almost never the best possible, the prevailing system concept may need to change.
Therefore, flexibility of organization is important to effective design.  
Ways must be found to reward design managers for keeping their organizations lean and flexible.
There is need for a philosophy of system design management which is not based on the assumption that adding manpower simply adds to productivity.
The development of such a philosophy promises to unearth basic questions about value of resources and techniques of communication which will need to be answered before our system-building technology can proceed with confidence.

결론

이 논문의 기본 논제는(넓은 의미에서) 시스템을 설계하는 조직은 조직의 의사소통 구조를 본딴 설계를 생산하도록 제약된다는 것이다.
우리는 이 사실이 시스템 설계 관리에 중요한 영향을 미친다는 것을 보았다.
기본적으로, 우리는 설계 조직의 구조에 대한 기준을 발견했다: 설계 활동은 의사소통 필요에 따라 조직되어야 한다.

이 기준은 유효한 시스템의 개념이 시기에 따라 바뀌고 그에 따라 의사소통의 필요성이 달라질 수 있기 때문에 문제를 일으킨다.
최초의 설계가 최선의 설계일 가능성이 없으므로, 일반적인 시스템 개념의 변경이 필요할 수 있기 때문이다.
따라서 효율적인 설계에는 조직의 유연성이 중요하다.

조직을 기민하고 유연하게 유지한 설계 관리자에게 보상을 할 수 있는 방법을 찾아야 한다.
단순하게 인력을 추가하는 것이 생산성을 증가시킨다는 가정에 근거하지 않는 시스템 설계 관리상의 철학이 필요하다.
이러한 철학의 발전은 자원의 가치와 의사소통의 기술에 대한 근본적인 문제들, 즉 우리의 시스템 구축 기술이 확신 위에서 진행되기 위한 과제들을 밝혀내게 될 것이다.


## The Jargon File에 수록된 콘웨이의 법칙

[[The-Jargon-File]]의 [콘웨이의 법칙 항목](http://www.catb.org/jargon/html/C/Conways-Law.html)에는 다음과 같은 말이 있다.

> If you have four groups working on a compiler, you'll get a 4-pass compiler.

**하나의 컴파일러를 만들기 위해 4개의 팀이 조직된다면, 4단계로 빌드하는 컴파일러가 나오게 된다.**

명쾌한 설명이라 생각한다.

## Tom Cheatham의 추가 해석

> If a group of N persons implements a COBOL compiler, there will be N-1 passes. Someone in the group has to be the manager.

**N 명의 그룹이 코볼 컴파일러를 구현한다면, N-1 단계가 될 것이다. 왜냐하면 한 사람은 관리자가 되어야 할 테니까.**

* 관료제를 중시한 코볼 업계를 돌려 비판한 말이라고 할 수 있겠다.

## 스티브 맥코넬이 설명한 콘웨이의 법칙

[[PROFESSIONAL-SOFTWARE-DEVELOPMENT]]{Professional 소프트웨어 개발}에서 스티브 맥코넬은 다음과 같이 설명한다.

>
콘웨이 법칙은 "프로그램의 구조는 그것을 제작하는 조직의 구조를 반영한다"는 것이다.
혼란스러운 회사는 혼란스러운 소프트웨어만 만들어낸다.
영웅 개발자를 고용하고, 그들에게 전권을 주며, 기적을 만들어 내기 위해 영웅들을 자유롭게 놔두는 회사는 결국 기발할지는 모르지만 에러도 무지하게 많은 제품을 만들어 낸다.
비효율적인 프로세스를 실행하는 회사의 제품은 유치하고 둔한 반면, 효과적이고 최적화된 조직은 조화롭고 아주 만족스러운 소프트웨어를 만들어 낸다.[^steve]

## 프레드 브룩스가 설명한 콘웨이의 법칙

[[Mythical-Man-Month]]의 "10장 기록물 가설"을 읽어보면 프레드 브룩스가 콘웨이의 법칙을 설명한다.

>
조직도는 콘웨이의 법칙이 말하는 것처럼 인터페이스 명세와 서로 얽혀 있다.
"시스템을 설계하는 조직은, 그 조직의 의사소통 구조를 본뜬 시스템을 만들어내게 되어 있다."
이어서 콘웨이는 최초의 조직도에는 첫 설계 내용이 반영될 것이라고 지적한다.
이 설계가 제대로일 가능성은 물론 아주 낮다.
**시스템 설계가 자유롭게 변경될 수 있어야 한다면 조직 역시 변화에 대비하고 있어야 한다.**

## 마이크로소프트의 Windows Vista 사례 연구

* [The Influence of Organizational Structure On Software Quality: An Empirical Case Study](https://www.microsoft.com/en-us/research/publication/the-influence-of-organizational-structure-on-software-quality-an-empirical-case-study/?from=http%3A%2F%2Fresearch.microsoft.com%2Fpubs%2F70535%2Ftr-2008-11.pdf )
    * [PDF](https://www.microsoft.com/en-us/research/wp-content/uploads/2016/02/tr-2008-11.pdf )

Windows Vista 개발 조직과 소프트웨어 품질과의 상관관계를 연구한 경험적 사례 연구이다.

다음은 결론 부분의 일부를 인용한 것이다. 번역은 파파고가 했다.

> Our study also compares the prediction models built using organizational metrics against traditional code churn, code complexity, code coverage, code dependencies and pre-release defect measures to show that organizational metrics are better predictors of failure-proneness than the traditional metrics used so far.

또한 본 연구는 조직 지표를 사용하여 구축된 예측 모델을 전통적인 코드 전환, 코드 복잡성, 코드 의존성 및 발표 전 결함 조치와 비교하여 조직 지표가 지금까지 사용한 기존 지표보다 더 나은 오류 발생 예측 변수임을 보여준다.

## 콘웨이의 법칙에 대한 엉클 밥의 코멘트

밥 아저씨(로버트 C. 마틴)는 클린 아키텍처에서 콘웨이의 법칙을 언급하고 다음과 같이 말한다.[^bob]

>
많은 팀으로 구성되며 관심사가 다양한 조직에서 어떤 시스템을 개발해야 한다면,
각 팀이 독립적으로 행동하기 편한 아키텍처를 반드시 확보하여 개발하는 동안 팀들이 서로를 방해하지 않도록 해야 한다.
이러한 아키텍처를 만들려면 잘 격리되어 독립적으로 개발 가능한 컴포넌트 단위로 시스템을 분할할 수 있어야 한다.
그래야만 이들 컴포넌트를 독립적으로 작업할 수 있는 팀에 할당할 수 있다.

# Links

* [CONWAY'S LAW](http://www.melconway.com/Home/Conways_Law.html): Conway 홈페이지에 소개된 Conway's law.
* [How Do Committees Invent? - Melvin E. Conway](http://www.melconway.com/Home/Committees_Paper.html ): 1968년 Conway's law가 소개된 콘웨이의 페이퍼.

* [Conway's law(the jargon file)](http://www.catb.org/jargon/html/C/Conways-Law.html)
* [Conway's law(wikipedia)](https://en.wikipedia.org/wiki/Conway%27s_law)
* [Melvin Conway(wikipedia)](https://en.wikipedia.org/wiki/Melvin_Conway)

# 참고문헌

* 해커 영어사전 제3판 / Guy L. Steel Jr. Eric S.RayMond 편저, 한경훈 역 / 기전연구사 / 1판 1쇄 1998년 12월 25일
* Professional 소프트웨어 개발 / 스티브 맥코넬 저 / 윤준호, 한지윤 공역 / 인사이트(insight) / 초판 4쇄 2006년 10월 13일 / 원제 : Professional Software Development (Addison-Wesley)
* 마이크로서비스 아키텍처 구축 / 샘 뉴먼 저 / 정성권 역 / 한빛미디어 / 초판 2쇄 2017년 05월 01일 / 원서 : Building Microservices: Designing Fine-Grained Systems
* 클린 아키텍처 / 로버트 C. 마틴 저/송준이 역 / 인사이트(insight) / 초판 1쇄 2019년 08월 20일 / 원제 : Clean Architecture: A Craftsman's Guide to Software Structure and Design

# 각주

[^origin]: [CONWAY'S LAW](http://www.melconway.com/Home/Conways_Law.html ): 콘웨이의 홈페이지에서 인용.
[^reject]: 마이크로서비스 아키텍처 구축 10.1
[^steve]: [[PROFESSIONAL-SOFTWARE-DEVELOPMENT]]{Professional 소프트웨어 개발} 184쪽.
[^bob]: 클린 아키텍처 16장 독립성. 158쪽.
