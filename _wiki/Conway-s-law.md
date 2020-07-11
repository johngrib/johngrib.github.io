---
layout  : wiki
title   : 콘웨이의 법칙(Conway's law)
summary : 소프트웨어 구조는 개발 조직의 커뮤니케이션 구조를 닮는다.
date    : 2017-12-04 21:34:28 +0900
updated : 2020-07-11 20:49:45 +0900
tag     : proverb law
toc     : true
public  : true
parent  : [[proverb]]
latex   : false
---
* TOC
{:toc}

## 개요

> Any organization that designs a system (defined broadly) will produce a design whose structure is a copy of the organization's communication structure.[^origin]

* 소프트웨어 구조는 해당 소프트웨어를 개발한 조직의 커뮤니케이션 구조를 닮게 된다.
* 콘웨이가 논문을 Havard Business Review에 제출했을 때에는 가설을 입증할 수 없다는 이유로 거절당했다고 한다.[^reject]
    * 그러나 개발자들 사이에서는 상식의 반열에 오른 법칙이다.

## 멜빈 콘웨이(Melvin E. Conway)

* 멜빈 콘웨이는 컴퓨터 과학자이자, 해커이다.
* SAVE라 불리는 Burroughs 220을 위한 어셈블러를 작성한 바 있다.

## 인용과 해석

### 콘웨이의 논문에 소개된 콘웨이의 법칙

* 1968년4월, Datamation 지에 실린 콘웨이의 논문 "HOW DO COMMITTEES INVENT?".

결론 부분만 인용하고 간단하게 번역해 보았다.

> Conclusion
>
> The basic thesis of this article is that organizations which design systems (in the broad sense used here) are constrained to produce designs which are copies of the communication structures of these organizations. We have seen that this fact has important implications for the management of system design. Primarily, we have found a criterion for the structuring of design organizations: a design effort should be organized according to the need for communication.  
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

### 데브옵스 핸드북에서 말하는 콘웨이의 법칙

> 결국, 팀을 구성하는 방법은 업무 수행 방식에 영향을 미친다. 1968년, 멜빈 콘웨이 박사는 코볼과 ALGOL 컴파일러를 제작하는 연구팀 여덟 명과 함께 유명한 실험을 수행했다. 콘웨이 박사는 다음과 같이 말했다.
>
> "처음에 난이도와 시간을 추정한 후, 다섯 명이 코볼 작업에 그리고 세 명이 ALGOL 작업에 배정됐다. 그 결과, 코볼 컴파일러는 5단계, ALGOL 컴파일러는 3단계로 실행됐다."
[^devops-handbook-123]

### The Jargon File에 수록된 콘웨이의 법칙

에릭 레이몬드는 [[The-Jargon-File]]의 [콘웨이의 법칙 항목](http://www.catb.org/jargon/html/C/Conways-Law.html )에서 다음과 같이 말했다.

> If you have four groups working on a compiler, you'll get a 4-pass compiler.

**하나의 컴파일러를 만들기 위해 4개의 팀이 조직된다면, 4단계로 빌드하는 컴파일러가 나오게 된다.**

명쾌한 설명이라 생각한다.

### Tom Cheatham의 추가 해석

> If a group of N persons implements a COBOL compiler, there will be N-1 passes. Someone in the group has to be the manager.

**N 명의 그룹이 코볼 컴파일러를 구현한다면, N-1 단계가 될 것이다. 왜냐하면 한 사람은 관리자가 되어야 할 테니까.**

* 관료제를 중시한 코볼 업계를 돌려 비판한 말이라고 할 수 있겠다.

### 스티브 맥코넬이 설명한 콘웨이의 법칙

[[PROFESSIONAL-SOFTWARE-DEVELOPMENT]]{Professional 소프트웨어 개발}에서 스티브 맥코넬은 다음과 같이 설명한다.

>
콘웨이 법칙은 "프로그램의 구조는 그것을 제작하는 조직의 구조를 반영한다"는 것이다.
혼란스러운 회사는 혼란스러운 소프트웨어만 만들어낸다.
영웅 개발자를 고용하고, 그들에게 전권을 주며, 기적을 만들어 내기 위해 영웅들을 자유롭게 놔두는 회사는 결국 기발할지는 모르지만 에러도 무지하게 많은 제품을 만들어 낸다.
비효율적인 프로세스를 실행하는 회사의 제품은 유치하고 둔한 반면, 효과적이고 최적화된 조직은 조화롭고 아주 만족스러운 소프트웨어를 만들어 낸다.[^steve]

### 프레드 브룩스가 설명한 콘웨이의 법칙

[[Mythical-Man-Month]]의 "10장 기록물 가설"을 읽어보면 프레드 브룩스가 콘웨이의 법칙을 설명한다.

>
조직도는 콘웨이의 법칙이 말하는 것처럼 인터페이스 명세와 서로 얽혀 있다.
"시스템을 설계하는 조직은, 그 조직의 의사소통 구조를 본뜬 시스템을 만들어내게 되어 있다."
이어서 콘웨이는 최초의 조직도에는 첫 설계 내용이 반영될 것이라고 지적한다.
이 설계가 제대로일 가능성은 물론 아주 낮다.
**시스템 설계가 자유롭게 변경될 수 있어야 한다면 조직 역시 변화에 대비하고 있어야 한다.**

### 마이크로소프트의 Windows Vista 사례 연구

* [The Influence of Organizational Structure On Software Quality: An Empirical Case Study](https://www.microsoft.com/en-us/research/publication/the-influence-of-organizational-structure-on-software-quality-an-empirical-case-study/?from=http%3A%2F%2Fresearch.microsoft.com%2Fpubs%2F70535%2Ftr-2008-11.pdf )
    * [PDF](https://www.microsoft.com/en-us/research/wp-content/uploads/2016/02/tr-2008-11.pdf )

Windows Vista 개발 조직과 소프트웨어 품질과의 상관관계를 연구한 경험적 사례 연구이다.

다음은 결론 부분의 일부를 인용한 것이다. 번역은 파파고가 했다.

> Our study also compares the prediction models built using organizational metrics against traditional code churn, code complexity, code coverage, code dependencies and pre-release defect measures to show that organizational metrics are better predictors of failure-proneness than the traditional metrics used so far.

> 또한 본 연구는 조직 지표를 사용하여 구축된 예측 모델을 전통적인 코드 전환, 코드 복잡성, 코드 의존성 및 발표 전 결함 조치와 비교하여 조직 지표가 지금까지 사용한 기존 지표보다 더 나은 오류 발생 예측 변수임을 보여준다.

### 콘웨이의 법칙에 대한 엉클 밥의 코멘트

밥 아저씨(로버트 C. 마틴)는 클린 아키텍처에서 콘웨이의 법칙을 언급하고 다음과 같이 말한다.[^bob]

>
많은 팀으로 구성되며 관심사가 다양한 조직에서 어떤 시스템을 개발해야 한다면,
각 팀이 독립적으로 행동하기 편한 아키텍처를 반드시 확보하여 개발하는 동안 팀들이 서로를 방해하지 않도록 해야 한다.
이러한 아키텍처를 만들려면 잘 격리되어 독립적으로 개발 가능한 컴포넌트 단위로 시스템을 분할할 수 있어야 한다.
그래야만 이들 컴포넌트를 독립적으로 작업할 수 있는 팀에 할당할 수 있다.

### 마이크로서비스 아키텍처 구축에서 말하는 응용 방법

> 그렇다면 우리가 소유한 서비스의 설계를 진화시키려 할 때 어떻게 해야 할까?
필자는 서비스가 분해되어야 할 때 시스템 개발에 연관된 사람들의 **지리적인 경계**가 이를 추진할 훌륭한 방법이 될 수 있다고 제안한다.
그리고 일반적으로 서비스의 소유권을 변경 비용을 적게 유지할 수 있는 **동일 위치의 한 팀**에 부여할 것을 검토해야 한다.[^newman-264]

* 매우 단순한 예
    * 서비스를 분리해야 한다면 => **지리적으로 분리된 여러 팀**이 한 서비스를 유지보수하게 한다.
    * 서비스를 합쳐야 한다면 => **동일 위치의 한 팀**이 서비스를 유지보수하게 한다.

## 역콘웨이의 법칙

### 크리스 리처드슨

크리스 리처드슨(Chris Richardson)은 마이크로서비스 패턴(Microservices Patterns)에 다음과 같은 노트를 삽입했다.[^richardson-63]

> 역 콘웨이 전략(reverse Conway maneuver)
>
> (중략)
>
> 즉, 애플리케이션 아키텍처는 그것을 개발하는 조직의 구조를 그대로 반영한다는 뜻입니다.
따라서 이 법칙을 역으로 이용해서 조직의 구조가 마이크로서비스 아키텍처에 고스란히 반영되도록 설계해야 합니다.
이렇게 하면 개발 팀과 서비스를 느슨하게 결합시킬 수 있습니다.

### 수잔 파울러

**Inverse Conway's Law**

수잔 파울러(Susan Fowler)는 마이크로서비스 구축과 운영(Production-Ready Microservices)에서 마이크로서비스 관점에서 역콘웨이의 법칙에 대해 이야기한다.[^inverse-conway]

>
역콘웨이의 법칙이라 불리는 콘웨이 법칙의 역('회사 제품의 아키텍처가 회사의 조직 구조를 결정한다')도 유효한데 이는 특히 마이크로서비스 생태계에 의의가 있다. 콘웨이의 법칙이 처음 소개된 지 40년이 지난 지금, 콘웨이의 법칙과 역콘웨이의 법칙 둘 다 여전히 유효하다. 마이크로소프트 사의 조직 구조를 시스템 아키텍처처럼 스케치하면 마이크로소프트 사의 제품 아키텍처와 매우 비슷하다. 구글, 아마존 등 다른 대형 기술 회사도 마찬가지다. 마이크로서비스 아키텍처를 도입한 회사도 이러한 규칙을 예외 없이 적용할 수 있다.
>
> 마이크로서비스 아키텍처는 독립적으로 격리된 작은 마이크로서비스로 구성된다.
역콘웨이의 법칙에서 마이크로서비스 아키텍처를 사용한 회사는 조직 구조를 매우 작고 격리된 독립적인 팀으로 구성할 것을 요구한다. 이로부터 발생하는 팀 구조는 필연적으로 사일로 현상과 스프롤 현상을 야기한다. 마이크로서비스 생태계가 좀 더 정교하고 복잡해지고 동시적이고 효율적일 때마다 문제는 악화된다.
>
> 역콘웨이의 법칙은 어떤 점에서는 개발자도 마이크로서비스와 같을 것이라는 것을 의미한다. 개발자는 한 가지 업무를 하며 그 한 가지 업무를 매우 잘 수행할 것이다. 개발자는 특정 분야의 지식과 경험, 책임 면에서 마이크로서비스 생태계의 나머지 부분과 격리된다. 총체적으로 보면 마이크로서비스 생태계의 모든 개발자는 업무에서 경험하는 마이크로서비스 생태계의 모든 것을 안다. 반면, 개개의 개발자는 매우 전문화됐기 때문에 담당하고 있는 마이크로서비스 생태계의 업무에 대해서만 안다.
>
> 이로부터 야기되는 조직적인 문제는 피할 수 없다. 팀이 격리되고 단절된 채로 마이크로서비스를 개발해야 하더라도 마이크로서비스는 서로 고립되지 않으며 이왕 제품이 전체적으로 작동하려면 마이크로서비스 간 소통이 원활해야 한다. 따라서 팀은 격리되고 독립적으로 기능하면서도 서로 긴밀히 협력해야 한다. 팀의 목적과 핵심 결과 지표를 성문화한 대부분의 팀 목표와 계획이 해당 팀이 담당하는 마이크로서비스에만 특정한다는 점을 고려해보면 마이크로서비스 간의 원활한 소통은 다소 힘들 수 있다.
>
> (중략)
>
> 역콘웨이의 법칙 때문에 발생하는 관련 문제는 더 있다. 모놀리식 아키텍처를 사용하는 회사에서 거의 발견되지 않는 운영 조직에 대한 운영의 어려움이다. 모놀리스에서는 애플리케이션을 위해 운영 인력의 배치와 비상 대기 업무 지원이 용이하지만 마이크로서비스 아키텍처에서는 잘 해내기가 매우 어렵다. 왜냐하면 마이크로서비스마다 개발 팀과 운영 팀 둘 다 배치해야 하기 때문이다. 결과적으로 마이크로서비스 개발 팀은 운영 업무와 마이크로서비스에 연관된 작업을 담당해야 한다. 비상 대기 업무와 모니터링 업무를 맡을 별도의 운영 조직이 없다. 즉, 개발자는 자신의 서비스에 대해 비상 대기해야 한다.


## Links

* [CONWAY'S LAW](http://www.melconway.com/Home/Conways_Law.html): Conway 홈페이지에 소개된 Conway's law.
* [How Do Committees Invent? - Melvin E. Conway](http://www.melconway.com/Home/Committees_Paper.html ): 1968년 Conway's law가 소개된 콘웨이의 페이퍼.

* [Conway's law(the jargon file)](http://www.catb.org/jargon/html/C/Conways-Law.html)
* [Conway's law(wikipedia)](https://en.wikipedia.org/wiki/Conway%27s_law)
* [Melvin Conway(wikipedia)](https://en.wikipedia.org/wiki/Melvin_Conway)

## 참고문헌

* 해커 영어사전 제3판 / Guy L. Steel Jr. Eric S.RayMond 편저, 한경훈 역 / 기전연구사 / 1판 1쇄 1998년 12월 25일
* Professional 소프트웨어 개발 / 스티브 맥코넬 저 / 윤준호, 한지윤 공역 / 인사이트(insight) / 초판 4쇄 2006년 10월 13일 / 원제 : Professional Software Development (Addison-Wesley)
* 마이크로서비스 아키텍처 구축 / 샘 뉴먼 저 / 정성권 역 / 한빛미디어 / 초판 2쇄 2017년 05월 01일 / 원서 : Building Microservices: Designing Fine-Grained Systems
* 클린 아키텍처 / 로버트 C. 마틴 저/송준이 역 / 인사이트(insight) / 초판 1쇄 2019년 08월 20일 / 원제 : Clean Architecture: A Craftsman's Guide to Software Structure and Design
* 마이크로서비스 구축과 운영 / 수잔 파울러 저/서영일 역 / 에이콘출판사 / 발행 2019년 05월 31일 / 원서 : Production-Ready Microservices: Building Standardized Systems Across an Engineering Organization
* 데브옵스 핸드북 / 진 킴, 제즈 험블, 패트릭 드부아, 존 윌리스 저/김영기 역 외 1명 정보 더 보기/감추기 / 에이콘출판사 / 2018년 07월 06일 / 원제: The DevOps Handbook: How to Create World-Class Agility, Reliability, and Security in Technology Organizations
* 마이크로서비스 패턴 / 크리스 리처드슨 저/이일웅 역 / 길벗 / 초판발행 2020년 01월 30일


## 각주

[^origin]: [CONWAY'S LAW](http://www.melconway.com/Home/Conways_Law.html ): 콘웨이의 홈페이지에서 인용.
[^reject]: 마이크로서비스 아키텍처 구축 10.1
[^steve]: [[PROFESSIONAL-SOFTWARE-DEVELOPMENT]]{Professional 소프트웨어 개발} 184쪽.
[^bob]: 클린 아키텍처 16장 독립성. 158쪽.
[^inverse-conway]: 마이크로서비스 구축과 운영 1장 마이크로서비스. 51쪽.
[^devops-handbook-123]: 데브옵스 핸드북. 123쪽.
[^newman-264]: 마이크로서비스 아키텍처 구축. 10장. 264쪽.
[^richardson-63]: 마이크로서비스 패턴. 1.7장.

