---
layout  : wiki
title   : ADR
summary : Architecture Decision Record
date    : 2023-06-20 21:06:06 +0900
updated : 2023-06-20 22:02:56 +0900
tag     : 
resource: 87/90D712-0CA9-431B-A5AB-9B748CDB4346
toc     : true
public  : true
parent  : [[/software-engineering]]
latex   : false
---
* TOC
{:toc}

## ADR?

>
아키텍처 결정을 가장 효과적으로 문서화하는 방법은 바로 아키텍처 결정 레코드<sup>Architecture Decision Record</sup>(ADR)[^orig-4]입니다.
ADR은 마이클 나이가드의 블로그 게시글[^orig-5][^nygard]에서 처음 소개됐고 이후 쏘우트웍스 기술 레이더<sup>ThoughtWorks Technology Radar</sup>[^orig-6][^thoughtworks-6]에서 '채택됨<sup>adopt</sup>'으로 표시됐습니다.
ADR은 아키텍처 결정이 기술된 (보통 한두 페이지 정도의) 짧은 텍스트 파일로, 일반 텍스트로 작성할 수도 있지만 대개 아스키독<sup>AsciiDoc</sup>이나 마크다운<sup>Markdown</sup> 같은 텍스트 문서 포맷 또는 위키 페이지 템플릿으로 작성합니다.
[^software-architecture-101-345]

## DOCUMENTING ARCHITECTURE DECISIONS 요약

원문: Michael Nygard의 2011년 11월 15일 글, [DOCUMENTING ARCHITECTURE DECISIONS]( https://cognitect.com/blog/2011/11/15/documenting-architecture-decisions )

- 애자일 프로젝트를 위한 아키텍처 문서는 어때야 하는가?
    - 애자일 프로젝트에서는 의사결정이 처음에 다 되어 있지 않으며, 시간이 지날수록 변화한다.
    - 문서가 너무 크면 안된다.
        - 최신화가 어렵다.
        - 아무도 안 읽게 된다.
    - 의사결정의 동기와 이유를 기록해야 한다.
        - 프로젝트에 새로 참여한 사람이 의사결정을 이해하지 못하면...
            - 결정을 맹목적으로 받아들이거나,
            - 결정을 이해하지 못하고 결정을 변경한다.
- 구조적으로 중요한 결정에 대한 기록들을 보관하도록 한다.
    - 짧은 텍스트 파일로 작성한다.
    - 문서 길이는 1~2 페이지 정도로.
    - 프로젝트 저장소에 `doc/arch/adr-NNN.md` 처럼 같이 저장한다.
    - 의사결정이 뒤집히면?
        - 뒤집힌 의사결정 파일을 지우지 않는다. 다만, 대체되었다고 표시해 둔다.
    - 문서 포맷은 5단계로 기록한다.
        - Title, Context, Decision, Status, Consequences

## From: Lightweight Architecture Decision Records

원문: ThoughtWorks의 Technology Radar [Lightweight Architecture Decision Records]( https://www.thoughtworks.com/radar/techniques/lightweight-architecture-decision-records )

번역은 내가 했다.

>
Much documentation can be replaced with highly readable code and tests.
In a world of evolutionary architecture, however, it's important to record certain design decisions for the benefit of future team members as well as for external oversight.
Lightweight Architecture Decision Records is a technique for capturing important architectural decisions along with their context and consequences.
We recommend storing these details in source control, instead of a wiki or website, as then they can provide a record that remains in sync with the code itself.
For most projects, we see no reason why you wouldn't want to use this technique.

수많은 문서들이 읽기 쉬운 코드와 테스트로 대체될 수 있습니다만,
진화하는 아키텍처의 세계에서는 미래의 팀 구성원을 돕기 위해서, 또는 외부 감독을 대비하기 위해 특정한 설계에 대한 결정을 기록해두는 것이 중요합니다.
Lightweight Architecture Decision Records는 중요한 아키텍처 의사결정과 그와 관련된 맥락과 결과를 함께 기록하는 기법입니다.
코드 자체와 동기화된 상태로 유지되는 기록을 제공하기 위해, 이런 기록을 Wiki나 웹 사이트가 아니라 소스 버전관리에 함께 저장하는 것을 권장합니다.
대부분의 프로젝트에서는 이 기법을 사용하지 않을 이유가 없을 것입니다.

## 포맷

### 3단 포맷 {#three-section-format}

>
ADR: 아키텍처 결정을 짤막한 문구로 나타낸 제목
>
콘텍스트<sup>context</sup>  
ADR이 다루는 문제를 한 두 문장으로 간략히 기술하고 문제를 해결할 수 있는 대안을 열거한다.
>
결정<sup>decision</sup>  
확정된 아키텍처 결정과 그렇게 결정하게 된 사유를 자세히 밝힌다.
>
결과<sup>consequence</sup>  
아키텍처 결정이 적용되면 어떤 결과가 발생하는지, 어떤 트레이드오프를 고려해야 하는지 기술한다.
[^software-architecture-hard-parts-31]

#### 예시

>
ADR: 공통 티케팅 데이터베이스 로직은 공유 라이브러리로 구현
>
**콘텍스트**
>
티케팅 기능은 티켓 생성, 티켓 배정, 티켓 완료라는 세 서비스로 나눌 수 있는데, 이들 모두 데이터베이스 조회/수정 로직을 대부분 공통 코드로 처리한다.
이는 공유 라이브러리와 공유 데이터 서비스, 두 가지 방법으로 구현할 수 있다.
>
**결정**
>
공통 티케팅 데이터베이스 로직은 공유 라이브러리를 사용해 구현한다.  
공유 라이브러리를 쓰면 고객 대면 서비스인 티켓 생성 및 배정 서비스의 성능, 확장성, 내고장성을 높일 수 있다.  
우리가 확인한 결과, 공통 데이터베이스 로직이 구현된 코드는 변경 빈도가 비교적 낮은 상당히 안정된 코드이고,
서비스는 어차피 테스트와 재배포가 필요하므로 일반적인 데이터베이스 로직은 변경 리스크가 낮은 편이다.
공통 데이터베이스 로직의 변경이 필요할 경우, 모든 서비스를 재배포할 필요가 없도록 라이브러리를 적절히 버저닝하면 된다.  
공유 라이브러리를 사용하면 서비스 커플링과 디펜던시를 낮추고 HTTP 트래픽과 전체 대역폭을 절약할 수 있다.
>
**결과**
>
공유 DLL 파일에 구현된 공통 데이터베이스 로직이 변경되면 티켓 서비스의 테스트 및 재배포가 불가피하므로 티케팅 기능의 민첩성은 전반적으로 떨어질 것이다.  
각 서비스 인스턴스는 알아서 데이터베이스 커넥션 풀을 관리해야 할 것이다.
[^software-architecture-hard-parts-301]

### 5단 포맷 {#five-section-format}

>
제목  
아키텍처 결정을 간략히 기재
>
상태  
제안됨, 수락됨, 대체됨
>
콘텍스트  
왜 이렇게 결정할 수밖에 없었나?
>
결정  
결정, 그리고 그렇게 결정한 합당한 사유
>
결과  
이 결정이 어떤 영향을 끼치는가?
>
컴플라이언스  
이 결정의 컴플라이언스를 어떻게 보장할 것인가?
>
노트  
이 결정에 관한 메타데이터(결정한 사람 등)
[^software-architecture-101-347]

#### 예시

>
ADR 76. 입찰 서비스 간 펍/섭 메시징
>
상태  
수락됨
>
콘텍스트  
BidCapture 서비스는 온라인 입찰자 또는 경매인을 통한 라이브 입찰자로부터 입찰을 받아
BidStreamer 서비스, BidTracker 서비스에 전달해야 한다.
입찰은 비동기 점대점(p2p), 비동기 펍섭(pub/sub), 온라인 경매 API를 통한 REST 방식으로 전달할 수 있다.
>
결정  
BidCapture, BidStreamer, BidTracker 세 서비스는 비동기 펍/섭 메시지를 주고받기로 결정할 예정이다.
BidStreamer 서비스는 BidCapture 서비스가 받은 순서 그대로 입찰을 수신해야 한다.
메시징과 큐는 스트림의 입찰 순서를 자동으로 보장한다.
비동기 펍/섭 메시징을 사용하면 입찰 프로세스의 성능이 개선되고 입찰 정보를 확장할 수 있다.
>
결과  
메시징 큐의 고가용성이 필요하고 클러스터 구성을 해야 할 것이다.  
내부 입찰 이벤트는 API 레이어에서 수행되는 보안 체크를 우회할 것이다.  
업데이트: 2020년 4월 14일 ARB 회의에서 검토한 결과,
ARB는 위와 같은 트레이드오프를 수용하기로 판단했으며, 새 서비스 간 입찰 이벤트에 추가적으로 보안 체크는 필요하지 않다고 결론지었다.
>
컴플라이언스  
주기적으로 수동 코드 검사 및 설계 리뷰를 실시하여 BidCapture, BidStreamer, BidTracker 세 서비스 간에 비동기 펍/섭 메시징이 제대로 이뤄지고 있는지 확인할 예정이다.
[^software-architecture-101-357]


## 참고문헌

- [DOCUMENTING ARCHITECTURE DECISIONS](https://cognitect.com/blog/2011/11/15/documenting-architecture-decisions )
- 소프트웨어 아키텍처 101 / 마크 리처즈, 닐 포드 저/이일웅 역 / 한빛미디어 / 초판 1쇄 발행 2021년 11월 01일 / 원제: Fundamentals of Software Architecture
- 소프트웨어 아키텍처 The Hard Parts / 닐 포드, 마크 리처즈, 프라모드 세달라지, 세막 데그하니 저/이일웅 역 / 한빛미디어 / 초판1쇄 발행:  2022년 10월 01일 / 원제: Software Architecture: The Hard Parts

## 주석

[^orig-4]: 원주: <https://adr.github.io >
[^orig-5]: 원주: <https://oreil.ly/yDcU2 >
[^nygard]: [DOCUMENTING ARCHITECTURE DECISIONS](https://cognitect.com/blog/2011/11/15/documenting-architecture-decisions )
[^orig-6]: 원주: <https://oreil.ly/0nwHw >
[^thoughtworks-6]: [Lightweight Architecture Decision Records](https://www.thoughtworks.com/radar/techniques/lightweight-architecture-decision-records )
[^software-architecture-101-345]: 소프트웨어 아키텍처 101. 19.3장. 345쪽.
[^software-architecture-hard-parts-31]: 소프트웨어 아키텍처 The Hard Parts. 1.4장. 31쪽.
[^software-architecture-hard-parts-301]: 소프트웨어 아키텍처 The Hard Parts. 8.7장. 301쪽.
[^software-architecture-101-347]: 소프트웨어 아키텍처 101. 19.3.1장. 347쪽.
[^software-architecture-101-357]: 소프트웨어 아키텍처 101. 19.3.5장. 357쪽.

