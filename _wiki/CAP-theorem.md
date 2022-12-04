---
layout  : wiki
title   : CAP 정리
summary :
date    : 2019-10-27 22:43:59 +0900
updated : 2021-08-22 15:35:52 +0900
tag     : 
resource: C9/5A81A4-E2D5-4861-B1BB-7BCF0A4CBA5B
toc     : true
public  : true
parent  : [[jargon]]
latex   : false
---
* TOC
{:toc}

## 요약

CAP 정리는 **분산 컴퓨터 시스템**에서 다음의 세 가지 조건을 모두 만족하는 것이 불가능하다는 것을 증명한 정리이다.

- Consistency: 일관성
- Availability: [[availability]]{가용성}
- Partition Tolerance: 파티션 내성

세 조건을 모두 만족하는 것이 불가능하므로, 만들 수 있는 것은 셋 중 하나를 어느 정도 희생한 시스템이다.

- CP 시스템: [[availability]]{가용성}을 희생한다.
- AP 시스템: 데이터 일관성을 희생한다.
- CA 시스템: 파티션 내성을 희생한다.
    - P는 포기할 수 없는 조건이다. 진짜 리얼 월드에서 네트워크 장애는 회피할 수 없다.
    - CA 시스템은 고려하지 않는다.

>
CAP는 네트워크 분단이 생겼을 때 일관성과 가용성 중 하나를 선택하라는 의미로 보는 게 좋다.
>
-- 데이터 중심 애플리케이션 설계. 9 일관성과 합의. 335쪽.

실제 업무를 할 때에는 CAP 정리를 너무 강하게 의식하지 않도록 한다.
분산 컴퓨터 시스템에서는 안 되는 것이 적어도 한 가지 있다는 정도로 생각해 두어도 작은 개발 과제를 수행하는 데에는 충분한 정도의 지식이다.

만약 높은 일관성과 높은 가용성을 필요로 하는 분산 시스템 작업을 하게 된다면
먼저 어느 정도의 가용성과 일관성이 필요한지에 대해 주의깊게 정의내리는 것이 필요하다고 생각한다.

특히 높은 가용성을 획득하는 것이 매우 어려운 일이기 때문에, 충분한 가용성이 어느 정도인지를 파악하는 것이 중요하다.

## 역사

>
2000년에 분산 컴퓨터에 관한 대담 중에 Eric A Brewer 교수가 처음으로 언급했으므로, CAP 정리를 "Brewer’s Theorem"이라고도 합니다. 2년 후에, MIT의 Seth Gilbert 및 Nancy Lynch 교수는 “Brewer’s Conjecture”에 대한 증명을 공개했습니다.
>
-- [CAP 정리(ibm.com)]( https://www.ibm.com/kr-ko/cloud/learn/cap-theorem )

- Dr. Eric A. Brewer - Towards Robust Distributed Systems
    - [PDF]( https://people.eecs.berkeley.edu/~brewer/cs262b-2004/PODC-keynote.pdf ), [백업 PDF]( /resource/wiki/CAP-theorem/PODC-keynote.pdf )
- Nancy Lynch and Seth Gilbert - Brewer’s Conjecture and the Feasibility of Consistent, Available, Partition-Tolerant Web Services
    - [PDF]( https://web.archive.org/web/20080908063921/http://lpd.epfl.ch/sgilbert/pubs/BrewersConjecture-SigAct.pdf ), [백업]( /resource/wiki/CAP-theorem/BrewersConjecture-SigAct.pdf )

## 인용
### From: 사이트 신뢰성 엔지니어링

> CAP 이론(Consistent, Available, Partition-Tolerant)은 분산 시스템은 아래의 세 가지를 동시에 만족할 수 없음을 증명하는 이론이다.
* 각 노드에서의 데이터에 대한 일관된 확인
* 각 노드에서의 데이터의 가용성
* 네트워크 파티션에 대한 장애 허용

> 이 이론은 매우 직관적이다: 만일 두 노드가 (분할된 네트워크로 인해) 서로 통신할 수 없다면 전체 시스템은 일부 혹은 모든 노드에서 일부 혹은 모든 요청에 응답할 수 없게 되거나(그래서 가용성이 떨어지거나) 아니면 요청을 처리하게 됨으로써 각 노드에서 데이터의 불일치가 발생할 수 있다.
>
-- 사이트 신뢰성 엔지니어링. 23 치명적인 상태 관리하기: 신뢰성을 위한 분산에 대한 합의. 334쪽.

### From: 트랜잭션 처리의 원리

> 분산 시스템에서, 데이터 일관성(data consistency), 시스템 가용성(system availability),
네트워크 분할 허용성(network to partition-tolerance) 간의 고유한 균형이 존재한다.
시스템은 이들 세 특성 가운데 두 가지를 제공할 수 있지만, 세 가지 모두는 제공하지 않는다.
이를 CAP 추측(CAP conjecture)이라고 한다.
>
-- 트랜잭션 처리의 원리. 9 복제. 340쪽.

### From: 데이터 중심 애플리케이션 설계

>
CAP는 때때로 **일관성(Consistency), 가용성(Availability), 분단 내성(Partition tolerance)이라는 세 개 중 두 개를 고르라**는 것으로 표현된다.
불행하게도 이런 식으로 생각하면 오해의 소지가 있다.
네트워크 분단은 일종의 결함이므로 선택할 수 있는 뭔가가 아니기 때문이다.
네트워크 분단은 좋든 싫든 발생한다.  
네트워크가 올바르게 동작할 때는 시스템이 일관성(선형성)과 완전한 가용성 모두를 제공할 수 있다.
네트워크 결함이 생기면 선형성과 완전한 가용성 사이에서 선택해야 한다.
따라서 CAP는 **네트워크 분단이 생겼을 때 일관성과 가용성 중 하나를 선택하라**는 의미로 보는 게 좋다.
이런 선택을 자주하지 않으려면 더욱 신뢰성 있는 네트워크가 필요하지만 어떤 시점에서는 선택이 불가피하다.
>
CAP에 대한 논의에서 **가용성**이라는 단어의 몇 가지 모순된 정의가 있고, 공식적인 정리는 보통의 의미와 부합하지 않는다. 많은 이른바 "고가용성"(내결함성) 시스템들은 실제로 CAP에서의 가용성에 대한 기이한 정의를 만족시키지 않는다. 대체로 CAP 주위에는 많은 오해와 혼란이 있으며 시스템을 더 잘 이해하는 데 도움을 주지 않으므로 CAP는 피하는 게 최선이다.
>
-- 데이터 중심 애플리케이션 설계. 9 일관성과 합의. 335쪽.

### From: 가상 면접 사례로 배우는 대규모 시스템 설계 기초

>
분산 시스템을 설계할 때는 CAP 정리(Consistency, Availability, Partition Tolerance theorem)를 이해하고 있어야 한다.
>
**CAP 정리**
>
CAP 정리는 데이터 일관성(consistency), 가용성 (availability), 파티션 감내(partition tolerance)라는 세 가지 요구사항을 동시에 만족하는 분산 시스템을 설계하는 것은 불가능하다는 정리다.
우선 각 요구사항의 의미부터 명확히 정리하고 넘어가자.
>
- 데이터 일관성: 분산 시스템에 접속하는 모든 클라이언트는 어떤 노드에 접속했느냐에 관계없이 언제나 같은 데이터를 보게 되어야 한다.
- 가용성: 분산 시스템에 접속하는 클라이언트는 일부 노드에 장애가 발생하더라도 항상 응답을 받을 수 있어야 한다.
- 파티션 감내: 파티션은 두 노드 사이에 통신 장애가 발생하였음을 의미한다. 파티션 감내는 네트워크에 파티션이 생기더라도 시스템은 계속 동작하여야 한다는 것을 뜻한다.
>
CAP 정리는 그림 6-1에서와 같이 이들 가운데 어떤 두 가지를 충족하려면 나머지 하나는 반드시 희생되어야 한다는 것을 의미한다.
>
> <div id="cap-diagram"></div> [^cap-diagram]
>
키-값 저장소는 앞서 제시한 세 가지 요구사항 가운데 어느 두 가지를 만족하느냐에 따라 다음과 같이 분류할 수 있다. 어느 두 가지를 만족하느냐에 따라 다음과 같이 분류할 수 있다.
>
- CP 시스템: 일관성과 파티션 감내를 지원하는 키-값 저장소. 가용성을 희생한다.
- AP 시스템: 가용성과 파티션 감내를 지원하는 키-값 저장소. 데이터 일관성을 희생한다.
- CA 시스템: 일관성과 가용성을 지원하는 키-값 저장소. 파티션 감내는 지원하지 않는다. 그러나 통상 네트워크 장애는 피할 수 없는 일로 여겨지므로, 분산 시스템은 반드시 파티션 문제를 감내할 수 있도록 설계되어야 한다. 그러므로 실세계에 CA 시스템은 존재하지 않는다.
>
-- 가상 면접 사례로 배우는 대규모 시스템 설계 기초. 6장. 93쪽.

<svg class="dynamic-insert" data-target-selector="#cap-diagram"
    xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="305px" height="275px" viewBox="0 0 305 275">
    <g fill-opacity="0.5" stroke-opacity="0.5">
        <ellipse cx="152" cy="80" rx="80" ry="80" fill="#1ba1e2"/>
        <ellipse cx="80" cy="194" rx="80" ry="80" fill="#008a00"/>
        <ellipse cx="224" cy="194" rx="80" ry="80" fill="#e3c800"/>
    </g>
    <g fill="#000000" font-size="13px" font-family="Helvetica" text-anchor="middle">
        <g>
            <text x="112" y="137">CA</text>
        </g>
        <g>
            <text x="192" y="137">CP</text>
        </g>
        <g>
            <text x="152" y="198"> AP</text>
        </g>
        <g>
            <text x="152" y="84">Consistency</text>
        </g>
        <g>
            <text x="80" y="198">Availability</text>
        </g>
        <g>
            <text x="224" y="198">Partition</text>
            <text x="224" y="215">Tolerance</text>
        </g>
    </g>
</svg>

#### 데이터 일관성 모델

>
일관성 모델은 데이터 일관성의 수준을 결정하는데, 종류가 다양하다.
>
- 강한 일관성(strong consistency): 모든 읽기 연산은 가장 최근에 갱신된 결과를 반환한다. 다시 말해서 클라이언트는 절대로 낡은(out-of-date) 데이터를 보지 못한다.
- 약한 일관성(weak consistency): 읽기 연산은 가장 최근에 갱신된 결과를 반환하지 못할 수 있다.
- 최종 일관성(eventual consistency): 약한 일관성의 한 형태로, 갱신 결과가 결국에는 모든 사본에 반영(즉, 동기화)되는 모델이다.
>
강한 일관성을 달성하는 일반적인 방법은, 모든 사본에 현재 쓰기 연산의 결과가 반영될 때까지 해당 데이터에 대한 읽기/쓰기를 금지하는 것이다.
이 방법은 고가용성 시스템에는 적합하지 않다. 새로운 요청의 처리가 중단되기 때문이다.
>
-- 가상 면접 사례로 배우는 대규모 시스템 설계 기초. 6장. 100쪽.

## 참고문헌

- 도서
    - 가상 면접 사례로 배우는 대규모 시스템 설계 기초 / 알렉스 쉬 저/이병준 역 / 인사이트(insight) / 2021년 07월 28일 / 원서 : System Design Interview
    - 데이터 중심 애플리케이션 설계 / 마틴 클레프만 저/정재부, 김영준, 이도경 역 / 위키북스 / 초판발행 2018년 04월 12일
    - 사이트 신뢰성 엔지니어링 / 벳시 베이어, 크리스 존스, 제니퍼 펫오프, 니얼 리처드 머피 저/장현희 역 / 제이펍 / 초판 1쇄 2018년 01월 18일 / 원서 : Site Reliability Engineering: How Google Runs Production Systems
    - 트랜잭션 처리의 원리 / 필립 A. 번스타인, 에릭 뉴코머 공저 / 한창래 역 / KICC(한국정보통신) / 1판 1쇄 2011년 12월 19일
- 웹 문서
    - [CAP 정리(ibm.com)]( https://www.ibm.com/kr-ko/cloud/learn/cap-theorem )

## 함께 읽기

- [[availability]]

## 주석

[^cap-diagram]: 책을 참고해 SVG로 따라 그린 다이어그램이다.

