---
layout  : wiki
title   : REST
summary : 
date    : 2019-07-24 19:59:55 +0900
updated : 2019-07-26 14:39:18 +0900
tag     : web
toc     : true
public  : true
parent  : what
latex   : false
---
* TOC
{:toc}

# 개요

이 개요는 논문을 읽고 나서 내 편의대로 요약한 것이므로, 정확한 내용은 원문을 참고할 것.

**REST?**

* REST 아키텍처 스타일은 Roy T. Fielding의 박사학위 논문에 최초로 소개되었다.
* 논문 이름은 "Architectural Styles and the Design of Network-based Software Architectures" (이하 "논문")
* REST는 Representational State Transfer의 줄임말이다.
    * "Representational State Transfer"는 REST가 추구하는 이상적인 웹 애플리케이션.

**REST 아키텍처 스타일은 설계 제약 조건들의 집합으로 이루어져 있다.**

* 아키텍처 스타일이란?
    * 설계 제약 조건들의 집합이다.
* REST 아키텍처 스타일이란?
    * 현대적인 웹을 위해 로이 필딩이 만든 하이브리드 아키텍처 스타일이다.
* 하이브리드 아키텍처 스타일이란?
    * 기존 아키텍처 스타일(제약 조건들) 여러 개를 합쳐 만든 새로운 아키텍처 스타일을 말한다.

**아키텍처 스타일의 평가 기준은?**

* 성능(Performance)
* 확장성(Scalability)
* 단순성(Simplicity)
* 수정용이성(Modifiability)
* 가시성(Visibility)
* 이식성(Portability)
* 신뢰성(Reliability)

**REST를 왜 만들었나?**

* 정보를 구조적으로 저장하여 누구나(사람, 기계) 웹을 이용할 수 있도록 하고 싶다.
* 사회의 발전에 웹이 따라갈 수 있어야 한다.
* 하루가 다르게 커져가는 웹의 규모에 대응할 수 있어야 한다.

**REST를 어떻게 만들 것인가?**

* 기존의 아키텍처 스타일들의 장단점을 검토한다.
* 필요한 효과를 기대할 수 있는 제약 조건들을 수집한다. => 완성!

**REST를 이루는 제약 조건들**

* 클라이언트-서버(Client-Server)
* 상태 없음(Stateless)
* 캐시(Cache)
* 일관된 인터페이스(Uniform Interface)
* 계층화된 시스템(Layered System)
* 주문형 코드(Code-On-Demand)

**Resource, Representation, Identifier**

* 리소스
    * 엔티티 집합의 개념적 매핑.
    * 정보의 추상화.
    * 세상의 무엇이든 리소스가 될 수 있다.
    * 하나의 리소스는 여러 식별자를 가질 수 있음.
* 식별자
    * 리소스에 매핑된 일종의 이름.
    * URI.
    * 하나의 식별자는 하나의 리소스에만 매핑될 수 있음.
* 표현(representation)
    * 서버가 응답으로 보내주는 것은 리소스가 아니라, 리소스의 표현이다.
    * 표현에는 데이터와 메타데이터가 들어있다.
    * 서버는 클라이언트가 보낸 정보를 보고 클라이언트에 맞는 형태로 리소스에 근거한 표현을 돌려준다.
    * 클라이언트는 메타데이터를 보고 데이터를 어떻게 해석할지를 알게 된다.

# 논문 요약

**Architectural Styles and the Design of Network-based Software Architectures**

* 로이 필딩의 논문을 요약해본다.

## DEDICATION

[원문](https://www.ics.uci.edu/~fielding/pubs/dissertation/dedication.htm )
**헌정**

* 저자(로이 필딩)가 가족들과 팀 버너스 리에 대한 고마움을 이야기한다.
* 두 편의 시(poet)를 인용한다.

## ACKNOWLEDGMENTS

[원문](https://www.ics.uci.edu/~fielding/pubs/dissertation/acknowledgments.htm )
**감사의 말**

* 저자가 박사 학위를 따기까지 직/간접적으로 도움을 준 모든 이들에게 감사를 표한다.
* 웹 아키텍처 스타일과 관련된 여러 단체의 공동 작업을 행한 많은 이들에게 감사를 표한다.
* 미국 정부와 국방부가 로이 필딩의 논문 연구를 후원해 주었음을 명시.

## CURRICULUM VITAE

[원문](https://www.ics.uci.edu/~fielding/pubs/dissertation/fielding_cv_2000.htm)
**저자 약력**

* 저자의 학력과 발표, 저술, 전문가로서의 활동 등을 나열한다.

## ABSTRACT OF THE DISSERTATION

[원문](https://www.ics.uci.edu/~fielding/pubs/dissertation/abstract.htm )
**개요**

* 설계, 정의, 배포(design, definition, deployment)를 가이드하는 최신 웹 아키텍처 모델이 필요하다고 생각하여 연구를 하게 됨.
* 로이 필딩의 연구는 아키텍처 제약조건(architectural constraints)에서 영감을 얻었다.

> An architectural style is a named, coordinated set of architectural constraints.

* 아키텍처 스타일은 선별되어 이름붙여진 아키텍처 제약 조건들의 집합이다.

이 논문은 이렇게 전개될 것이다.

1. 소프트웨어 아키텍처를 이해하기 위한 프레임워크를 정의한다.
    * 이 프레임워크는 아키텍처 스타일을 사용해 정의한다.
2. 아키텍처 스타일이 어떻게 아키텍처 디자인을 가이드하는지 예를 들어 보여준다.
3. 아키텍처 특성에 따라 아키텍처 스타일을 분류한다.
4. 현대적인 웹을 위한 REST(Repeatational State Transfer) 아키텍처 스타일을 소개한다.
    * REST는 다음과 같은 특징을 갖는다.
        * 콤포넌트간 상호 작용의 확장성(scalability of component interactions).
        * 인터페이스의 일반성(generality of interfaces).
        * 콤포넌트의 독립적인 배포(independent deployment of components).
        * 중간 콤포넌트를 통한 지연 시간 감소(intermediary components to reduce interaction latency).
        * 보안 강화(enforce security).
        * 레거시 시스템의 캡슐화(encapsulate legacy systems).
5. REST를 가이드하기 위한 소프트웨어 엔지니어링 원칙을 설명한다.
    * REST 원칙으로 선택한 상호작용 제약조건을 설명한다.
    * REST 외의 다른 아키텍처 제약조건과 비교한다.
6. HTTP 및 URI 설계에 REST를 적용하고 웹 클라이언트/서버 소프트웨어를 배포하며 깨닫게 된 것을 이야기한다.

## INTRODUCTION

[원문](https://www.ics.uci.edu/~fielding/pubs/dissertation/introduction.htm)
**도입**

* 지금까지의 소프트웨어 아키텍처 연구는 시스템을 부분과 부분으로 쪼개 연구하는 데에 중점을 두었다.
    * 현대 소프트웨어 시스템의 복잡성때문.
* 그러나 훌륭한 아키텍처를 만드려면 전체적 맥락을 고려해야 한다.
    * 시스템의 기능이라는 맥락
    * 행동이라는 맥락
    * 사회적 요구라는 맥락
    * ...

저자는 맥락을 고려해 설계하는 데에 **제약 사항**이 유용하다고 생각한다.

* 아키텍처 제약의 원칙적 사용으로
    * 네트워크 기반 애플리케이션 소프트웨어의 아키텍처 설계를 이해하고 평가한다.
    * 원하는 기능, 성능 및 사회적 속성을 얻고자 한다.

그리고 그러한 제약 사항 모음에 이름을 붙이면 하나의 아키텍처 스타일이 될 것이다.

이를 설명하기 위해 이 논문이 어떠한 방향으로 전개될 것인지를 예고한다.
(위의 개요와 똑같은 내용이므로 생략.)

한편, 이 논문의 의의는 다음과 같다.

* 소프트웨어 아키텍처를 이해하기 위한 프레임워크.
* 아키텍처 스타일 분류.
* 새로운 아키텍처 스타일인 REST 소개.
* 현대적인 월드 와이드 웹을 위한 아키텍처 설계 관점에서 REST 스타일 응용 및 평가.

## CHAPTER 1. Software Architecture

[원문](https://www.ics.uci.edu/~fielding/pubs/dissertation/software_arch.htm)
**소프트웨어 아키텍처**

이 챕터는 논문의 배경을 다루며, 여러 용어를 정의한다.

다음은 일부 정의를 내 멋대로 해석해 정리한 것이다.

* 소프트웨어 아키텍처는 소프트웨어 시스템의 런타임 요소를 추상화한 것.
    * 시스템은 많은 추상화 수준과 많은 운영 단계로 구성될 수 있으며, 각각 소프트웨어 아키텍처를 가지고 있다.
* 소프트웨어 아키텍처는 아키텍처 요소(elements)의 구성(configurations)과 그 관계의 제약에 의해 정의된다.
    * 아키텍처 요소: 콤포넌트, 커넥터, 데이터 등등.
        * 콤포넌트(components): (인터페이스를 통해 데이터 변환을 제공하는) 소프트웨어 명령어 및 내부 상태의 추상 단위.
        * 커넥터(connector)는 콤포넌트 간의 통신, 조정 또는 협력을 중재하는 추상 메커니즘이다.
        * 데이터(Data)는 콤포넌트가 커넥터를 통해 보내고 받는 정보 요소이다.
    * 구성(configurations)은 시스템 실행 시간 동안 이루어지는 콤포넌트, 커넥터, 데이터 간 아키텍처 관계의 구조이다.
* **아키텍처 스타일은 요소(elements)와 요소와의 관계를 제약하는 조건들의 집합이다.**


## CHAPTER 2. Network-based Application Architectures

[원문](https://www.ics.uci.edu/~fielding/pubs/dissertation/net_app_arch.htm )
**네트워크 기반의 애플리케이션 아키텍처**

이 챕터에서는 논문이 다루는 범위를 "네트워크 기반 애플리케이션 아키텍처"로 정의한다.

2.1 Scope(범위)

* 이 논문은 네트워크 기반 시스템을 다룬다.
* 이 논문의 논의는 애플리케이션 아키텍처로 제한한다.

2.2 Evaluating the Design of Application Architectures(애플리케이션 아키텍처 설계 평가)

* 이 논문의 목표
    * 주어진 애플리케이션 도메인에 가장 적합한 아키텍처를 선택하거나 만드는 과제에 대한 설계 가이드를 제공하는 것.
* 적합한 아키텍처를 선택하려면 아키텍처를 평가할 수 있어야 한다.

아키텍처 설계를 평가하기 위해 다음을 알아야 한다.

* "설계 근거"에서 "설계 제약 조건"이 파생된다.
* "설계 제약 조건"에서 "설계의 특성"이 파생된다.
* "설계 특성"을 "애플리케이션의 목표"와 비교해야 한다.

아키텍처 스타일은 (참조하기 편하도록) 적절한 이름을 붙인 아키텍처 제약 조건들의 집합이다.

* 각각의 설계상의 결정은 스타일을 적용하는 것.
* 제약 조건을 추가하면 새로운 스타일이 탄생할 수 있다.
    * 하이브리드 스타일: 제약 조건이 충돌하지 않는다면 여러 스타일을 합칠 수도 있다.
    * 기본 스타일에 제약 조건을 추가해가며, 애플리케이션의 목표 특성을 충족하는지 비교할 수 있다.
    * 새로 추가한 제약 조건이 다른 제약 조건의 장점을 방해하지 않는지 주의를 기울여야 한다.
* 애플리케이션 도메인이 다르면 아키텍처를 직접 비교하기 곤란하다.
    * 애플리케이션의 특성에 제약 조건이 의존하는 경우가 있기 때문.

2.3 Architectural Properties of Key Interest(주요 관심사의 아키텍처 속성)

아키텍처 스타일 분류 기준으로 쓰는 속성들.

* **성능(Performance)**
    * 네트워크 성능(Network Performance) 
    * 사용자가 느끼는 성능(User-perceived Performance)
        * latency
        * completion time
    * 네트워크 효율성(Network Efficiency)
* **확장성(Scalability)**
* **단순성(Simplicity)**
* **수정용이성(Modifiability)**
    * 진화가능성(evolvability)
    * 확장성(extensibility)
    * 커스터마이징 용이성(customizability)
    * 구성성(configurability)
    * 재사용 용이성(reusability)
* **가시성(Visibility)**
    * 각 콤포넌트 사이의 상호작용을 감시하거나 중재.
    * 모니터링 접근 제공 등등.
* **이식성(Portability)**
    * 소프트웨어가 다른 환경에서도 실행될 수 있다면 이식성이 있는 것이다.
* **신뢰성(Reliability)**
    * 장애 발생시 장애 범위 최소화 등.

## CHAPTER 3. Network-based Architectural Styles

[원문](https://www.ics.uci.edu/~fielding/pubs/dissertation/net_arch_styles.htm )
**네트워크 기반 아키텍처 스타일**

이 챕터에서는 네트워크 기반 애플리케이션 아키텍처 스타일을 몇 가지 소개하고 분류한다.

소개하는 스타일의 목록은 다음과 같다.

* Data-flow Styles
    * Pipe and Filter (PF)
    * Uniform Pipe and Filter (UPF)
* Replication Styles
    * Replicated Repository (RR)
    * Cache ($)
* Hierarchical Styles
    * Client-Server (CS)
    * Layered System (LS) and Layered-Client-Server (LCS)
    * Client-Stateless-Server (CSS)
    * Client-Cache-Stateless-Server (C$SS)
    * Layered-Client-Cache-Stateless-Server (LC$SS)
    * Remote Session (RS)
    * Remote Data Access (RDA)
* Mobile Code Styles
    * Virtual Machine (VM)
    * Remote Evaluation (REV)
    * Code on Demand (COD)
    * Layered-Code-on-Demand -Client-Cache-Stateless-Server (LCODC$SS)
    * Mobile Agent (MA)
* Peer-to-Peer Styles
    * Event-based Integration (EBI)
    * C2
    * Distributed Objects
    * Brokered Distributed Objects

## CHAPTER 4. Designing the Web Architecture: Problems and Insights

[원문](https://www.ics.uci.edu/~fielding/pubs/dissertation/web_arch_domain.htm )
**웹 아키텍처 설계: 문제점과 통찰**

* 이 장에서는 웹 아키텍처의 요구 사항과 핵심 통신 프로토콜에 대해 제안 된 개선 사항을 설계하고 평가할 때 직면하게되는 문제점에 대해 알아본다.
* 그리고 그 문제점을 해결하기 위한 방법들도 알아본다.

팀 버너스 리는 다음과 같이 쓴 바 있다.

> "Web's major goal was to be a shared information space through which people and machines could communicate."

"웹의 주요 목표는 사람과 기계가 통신할 수 있는 공유된 정보 공간이 되는 것이었다."

따라서 다음과 같은 사항이 필요했다.

* 사람들이 정보를 구조적으로 저장하여 다른 사람들도 이용할 수 있도록 하는 것.
* 다른 사람들이 저장한 정보를 구조적으로 참조할 수 있는 것.
    * 이렇게 하면 로컬에 다른 사람들(컴퓨터)의 자료를 죄다 저장할 필요가 없어진다.

이를 위해 다음과 같은 요구사항이 발생한다.

* 진입 장벽이 낮아야 한다(Low Entry-barrier).
    * 사용자가 자발적으로 정보를 구조적으로 저장할 수 있어야 한다.
* 확장성을 갖춰야 한다(Extensibility)
    * 시간의 흐름, 사회 변화에 따라 요구사항이 계속 바뀔 것이다.
* 분산형 하이퍼 미디어 고려(Distributed Hypermedia)
    * 웹을 이루는 각종 소스는 인터넷 여기저기에 분산되어 있다.
    * 분산형 하이퍼미디어를 쓰면 서버에서 클라이언트로 많은 양의 데이터가 전송될 것이다.
    * 웹 아키텍처는 대용량 데이터 전송을 고려해 설계되어야 한다.
* 인터넷의 규모(Internet-scale)
    * 웹은 인터넷 규모의 분산형 하이퍼 미디어 시스템이다.
    * 인터넷은 여러 조직의 경계에 걸쳐 정보 네트워크를 연결하는 것이다.
    * 무정형 확장성(Anarchic Scalability), 독립적인 배포(Independent Deployment).
 
문제점은 다음과 같다.

* 웹의 기하급수적인 성장.
    * 인프라를 빠르게 소모시킴.
    * 확장성이 떨어지는 아키텍처가 다수 등장.
    * 여러 업체의 상업적 경쟁으로 인해 웹 프로토콜과 모순되는 제안이 유입됨.

IETF(Internet Engineering Taskforce) 작업 그룹의 작업 대상은 URI, HTTP, HTML 이다.

그리고 IETF 작업 그룹의 목표는 다음과 같다.

* 기존 아키텍처 통신의 하위 집합을 정의한다.
* 해당 아키텍처 내의 문제를 확인한다.
* 해당 문제를 해결하기위한 일련의 표준을 지정한다.

즉, IETF는 URI/HTTP/HTML 표준을 지정하는 방식으로 목표를 향해 접근하고 있다.

IETF의 활동을 통해 다음과 같은 과제를 얻을 수 있다.

* 새로운 기능 세트를 널리 배포된 아키텍처에 어떻게 도입할 것인가?
* 새로운 기능의 도입이 (웹이 성공할 수 있게 한) 아키텍처 속성에 부정적인 영향을 미치는 것을 어떻게 방지하는가?

그러므로 다음과 같은 접근을 생각해 볼 수 있다.

* 초기 웹 아키텍처
    * 관심사, 단순성 및 일반성의 분리라는 견고한 원칙을 기반으로했다.
    * 그러나 아키텍처에 대한 설명과 근거가 부족했다. 
* 아키텍처 스타일
    * 아키텍처 스타일: 제약 조건 집합
    * 스타일을 통해 웹 아키텍쳐의 기본 원리를 정의하여 미래의 아키텍트에게 보여줄 수 있다.

**접근**

1. **초기 웹 아키텍처에서 바람직한 특성을 담당하는 제약 조건을 식별한다.**
2. **현대 웹을 위한 새로운 하이브리드 아키텍처 스타일을 만든다.**
    * 인터넷 규모의 분산 하이퍼 미디어 시스템에서 바람직한 특성을 확인한다.
    * 이러한 특성을 유도하는 추가 아키텍처 스타일을 선택한다.
    * 이 스타일을 초기 웹 제한 조건과 결합하여 하이브리드 아키텍처 스타일을 만든다.
        * 즉, 초기 웹 아키텍처의 제약 조건 + 현대적으로 바람직한 제약 조건.
3. 새로운 스타일을 기준으로 삼는다.
    * 웹 아키텍처에 대해 확장/수정 사항 제안이 들어올 때 기준과 충돌하는지 검사할 수 있다.
    * 충돌이 심각하다면? 설계를 바꾸거나, 웹과 별도로 실행되도록 권고할 수 있다.
4. 새로운 스타일로 업데이트된 아키텍처가 다양한 인프라/미들웨어 소프트웨어로 세상에 배포되어 퍼져나간다.

## CHAPTER 5. Representational State Transfer (REST)

[원문](https://www.ics.uci.edu/~fielding/pubs/dissertation/rest_arch_style.htm )
**REST 아키텍처 스타일**

이 챕터의 내용 흐름은 다음과 같다.

* 분산된 하이퍼 미디어 시스템을 위한 REST(Representational State Transfer) 아키텍처 스타일을 소개하고 설명한다.
* REST의 근거가 되는 엔지니어링 원칙을 소개한다.
    * 이 원칙을 위해 선택한 제약조건들을 소개한다.
    * 다른 아키텍처 스타일의 제약조건들과 비교한다.
* REST는 3장에서 설명한 여러 네트워크 기반 아키텍처 스타일에서 파생된 하이브리드 스타일이라는 것을 설명한다.
* 1 장의 소프트웨어 아키텍처 프레임 워크를 사용해
    * REST의 아키텍처 요소를 정의한다.
    * 프로토 타입 아키텍처의 샘플 프로세스, 커넥터 및 데이터 뷰를 검사한다.

### 5.1 Deriving REST

**REST의 파생**

이 섹션에서는 REST를 도출하는 과정을 설명한다.

1. Null 스타일로 시작.
    * 비어 있는 제약 조건 집합으로 시작.
2. 클라이언트-서버(Client-Server) 제약 조건 추가.
    * 관심사의 분리(Separation of concerns)
        * 사용자 인터페이스와 데이터 저장소를 분리.
        * 클라이언트의 이식성(portability), 서버의 확장성(scalability) 확보.
3. 상태 없음(Stateless) 제약 조건 추가.
    * 클라이언트는 상태를 저장하지 않는다.
    * 클라이언트의 각 요청은 서버가 요청을 이해하는 데에 필요한 모든 정보를 포함해야 한다.
    * 세션 상태는 클라이언트에서 전적으로 유지된다.
    * 가시성(visibility): 모니터링 시스템이 단일 요청만 관찰해도 요청의 전체 특성을 파악할 수 있다.
    * 신뢰성(reliability): 부분적인 처리 실패에 대한 회복이 쉽다.
    * 확장성(Scalability): 요청과 요청 사이에 상태를 저장하지 않아도 되므로 구현이 심플하여 확장성 향상.
    * 단점: 똑같은 정보가 계속 왔다갔다 할 수 있다.
4. 캐시(Cache)
    * 캐싱을 통해 네트워크 효율성을 높인다.
    * 요청에 대한 응답에 캐시 가능/불가능 여부가 들어 있어야 한다.
    * 효율성(efficiency), 확장성(scalability), 사용자 인지 성능(user-perceived performance) 확보.
    * 단점: 신선한 데이터와 캐싱된 오래된 데이터가 많이 다르면 신뢰성(reliability)이 저하된다.
5. 일관된 인터페이스(Uniform Interface)
    * 일관된 인터페이스는 REST의 핵심. 다른 아키텍처 스타일과의 가장 큰 차이점.
    * 전체 시스템 아키텍처가 단순해짐.
    * 가시성(visibility)이 향상됨.
    * 구현체가 서비스와 별도로 독립적으로 진화할 가능성을 얻게 된다.
    * 단점: 애플리케이션에 특화된 형태가 아니라 표준화된 형태로 데이터를 주고받게 되어 효율성이 떨어질 수 있다.
6. 계층화된 시스템(Layered System)
    * 인터넷 규모의 행동을 향상시키기 위해 추가한 제약 조건.
    * 이 제약 조건을 추가하면 각 콤포넌트가 계층을 넘어서 "보는(see)" 것을 막을 수 있다.
    * 시스템 복잡도를 관리하기 용이.
    * 레거시 서비스를 캡슐화할 수 있다.
    * 확장성(scalability): 중개자를 통해 여러 네트워크 및 프로세서에서 서비스 부하 분산을 할 수 있다.
    * 단점: 데이터 처리에 오버 헤드가 발생하여 사용자 인지 성능 저하.
7. 주문형 코드(Code-On-Demand)
    * 선택적 제약 조건. 장단점을 보고 선택하도록 한다.
    * 애플릿, 스크립트의 형태로 코드를 다운로드, 실행하여 클라이언트 기능을 확장할 수 있도록 한다.
    * 사전 구현에 필요한 기능의 수를 줄임으로써 클라이언트를 단순화.
    * 시스템 확장성이 향상.
    * 단점: 가시성 감소.

### 5.2 REST Architectural Elements

**REST 아키텍처 요소** 

* REST 스타일은 분산형 하이퍼미디어 시스템 내의 구조 요소의 추상화다.
* REST는 콤포넌트의 역할, 다른 콤포넌트와의 상호작용에 대한 제약 및 중요한 데이터 콤포넌트의 해석에 초점을 맞춘다.
    * 그를 위해 콤포넌트 구현 및 프로토콜 구문의 세부사항을 무시한다.
* REST는 웹 아키텍처의 기초를 정의하는 콤포넌트, 커넥터 및 데이터에 대한 근본적인 제약조건을 포함한다.

#### 5.2.1 Data Elements

**데이터 요소**

데이터 요소의 특성과 상태는 REST의 핵심 측면이다.

* REST는 분산형 하이퍼미디어의 특성에서 영향을 받았다.
* 분산형 하이퍼미디어의 특성은 다음과 같다.
    1. 데이터가 있는 곳에 데이터를 렌더링하고 수신자에게 고정 포맷의 이미지를 전송한다.
    2. 렌더링 엔진으로 데이터를 캡슐화하여 수신자에게 전송한다.
    3. 또는 데이터 유형을 설명하는 메타데이터와 함께 수신자에게 원시 데이터를 전송한다.

REST는 **메타 데이터로 데이터 유형을 공유하는 방법에 초점**을 맞추어 **표준화된 인터페이스**로 공개되는 범위를 제한함으로써 세 가지 옵션 모두의 하이브리드를 제공한다.

* REST는 수신자의 능력이나 필요, 자원(resource)의 특성에 따라 동적으로 선택된 표준 데이터 유형의 집합 중 하나와 일치하는 형식으로 자원의 표현(representation of a resource)을 응답으로 보내준다. 
* 표현(representation)이 원본 소스와 완전히 동일한 형식인지 아닌지는 인터페이스 뒤에 숨겨져 있다.
* 이러한 "고정되어 있지 않은 객체 스타일(the mobile object style)"은 캡슐화된 렌더링 엔진의 표준 데이터 형식을 참고하여 구성한 표현(representation)을 전송하여 목표에 접근한다.

(웹 개발자라면 콘텐츠 협상을 떠올려 보면 이해가 쉬울 것이다.)

이를 통해 REST는 서버 확장성 문제 없이 클라이언트-서버 스타일의 관심사 분리를 확보하고, 일반적인 인터페이스를 통해 정보를 숨겨 서비스의 캡슐화 및 진화를 가능하게 하며, 다양한 기능을 제공한다.

다음은 REST의 데이터 요소이다.

| Data Elements           | 한국어            | Modern Web Examples              |
|-------------------------|-------------------|----------------------------------|
| resource                | 자원              | 하이퍼 텍스트 참조의 개념적 목표 |
| resource identifier     | 자원 식별자       | URL, URN                         |
| representation          | 표현              | HTML document, JPEG image        |
| representation metadata | 표현의 메타데이터 | media type, last-modified time   |
| resource metadata       | 자원의 메타데이터 | source link, alternates, vary    |
| control data            | 컨트롤 데이터     | if-modified-since, cache-control |

##### 5.2.1.1 Resources and Resource Identifiers

**자원과 자원 식별자**

REST에서 정보의 핵심 추상화는 자원(resource)이다.
* 이름을 지정할 수 있는 세상의 모든 것은 다 자원이 될 수 있음.
* 시간이 지남에 따라 값이 바뀌는 것이 있고, 그렇지 않은 것이 있다.
* 자원은 "특정 시점의 매핑에 해당하는 엔티티"가 아니라 "엔티티 **집합**에 대한 개념적 매핑"이다.
    * 자원의 타입이나 구현에 영향을 받지 않는 보편성을 제공한다.
    * 요청의 특성을 기반으로 콘텐츠 협상을 수행 할 수 있도록 표현에 대한 참조의 지연 바인딩을 허용한다.
    * 개념의 단수 표현이 아니라 집합에 대한 표현이므로 표현이 바뀌어도 링크를 바꾸지 않아도 된다.

##### 5.2.1.2 Representations

**표현**

REST 콤포넌트는 자원(resource)의 현재 상태나 의도된 상태를 확인하고, 그에 맞는 표현(representation)을 다른 콤포넌트에게 전송하는 방식으로 자원을 다룬다.

> A representation is a sequence of bytes, plus representation metadata to describe those bytes.

표현은 일련의 바이트와, 그 바이트를 설명하는 메타데이터로 이루어진다.

표현의 구성은 다음과 같다.

* 데이터
* 데이터를 설명하는 메타데이터
* (경우에 따라) 메타데이터를 설명하기 위한 메타데이터

응답 메시지에는 표현 메타 데이터와 자원 메타 데이터가 모두 포함될 수 있다.
(제공된 표현에 특정되지 않은 리소스에 대한 정보가 포함될 수 있다.)

제어 데이터(Control data)는 콤포넌트 간의 메시지 목적을 정의한다.

* 제어 데이터
    * 요청을 매개 변수화하고 일부 연결 요소의 기본 동작을 재정의하는 데 사용.
        * 예: 제어 데이터를 사용하여 캐시 동작을 수정할 수 있다.
    * 제어 데이터를 사용해 리소스의 현재 상태, 원하는 상태 등을 표현 가능.

미디어 유형(media type)

* 표현의 데이터 타입을 미디어 유형이라 한다.
* 표현은 메시지에 포함시킬 수 있다.
* 메시지의 제어 데이터와 미디어 유형에 따라 수신자가 처리.
* 하나의 메시지에 여러 표현이 포함될 수 있다.

#### 5.2.2 Connectors

**커넥터**

REST는 다양한 커넥터 유형을 사용하여 자원 액세스 및 자원 표현 전송 활동을 캡슐화한다.

* 커넥터는 콤포넌트 간의 통신을 위한 추상 인터페이스를 제공한다.
    * 관심사를 분리.
    * 기본 구현 리소스 및 통신 메커니즘을 숨김으로써 단순성을 향상.

Table 5-2: REST Connectors

| Connector | Modern Web Examples                 |
|-----------|-------------------------------------|
| client    | libwww, libwww-perl                 |
| server    | libwww, Apache API, NSAPI           |
| cache     | browser cache, Akamai cache network |
| resolver  | bind (DNS lookup library)           |
| tunnel    | SOCKS, SSL after HTTP CONNECT       |

REST의 모든 상호 작용은 무상태(stateless) 기반이다.

* 각 요청에는 이전 요청과 관계 없이 커넥터가 요청을 이해하는 데 필요한 모든 정보가 들어 있다.
* 이에 따른 장점들은 다음과 같다.
    * 커넥터가 요청간에 상태를 유지할 필요가 없다.
    * 병렬 처리가 가능하다.
    * 요청 하나만 봐도 이해할 수 있다.
    * 캐싱이 용이하다.

커넥터의 유형은 위의 표와 같다.

* 기본 커넥터 유형은 클라이언트(client), 서버(server)이다.
* 캐시(cache) 커넥터는 네트워크 통신의 반복을 피하기 위해 서버나 클라이언트 인터페이스에 위치할 수 있다.
* 해석자(resolver) 커넥터는 자원 식별자를 네트워크 주소 정보로 변환한다.
* 터널(tunnel)은 통신을 중계한다.

#### 5.2.3 Components

* 역할에 따라 분류한 콤포넌트.

| Component     | Modern Web Examples                  |
|---------------|--------------------------------------|
| origin server | Apache httpd, Microsoft IIS          |
| gateway       | Squid, CGI, Reverse Proxy            |
| proxy         | CERN Proxy, Netscape Proxy, Gauntlet |
| user agent    | Netscape Navigator, Lynx, MOMspider  |

* 사용자 에이전트(user agent)
    * 클라이언트 커넥터를 사용하여 요청을 시작.
    * 응답의 최종 수신자.
    * 예: 웹 브라우저.
* 원본 서버(origin server)
    * 서버 커넥터를 사용하여 요청 된 리소스의 네임 스페이스를 제어.
    * 자원 표현에 대한 최종 출처.
    * 자원 값 수정 요청의 최종 수신자.
    * 각 오리진 서버는 서비스에 대한 자원 인터페이스로 일반 인터페이스를 제공한다.
    * 리소스 구현 세부 정보는 인터페이스 뒤에 숨겨져 있다.
* 중개 콤포넌트
    * 프록시(proxy)
        * 타 서비스의 인터페이스 캡슐화, 데이터 변환, 성능 향상, 보안 목적으로 클라이언트가 선택하는 중개자.
    * 게이트웨이(gateway, reverse proxy)
        * 데이터 변환, 성능 향상, 보안에 대해 다른 서비스의 인터페이스 캡슐화를 제공하는 매개체.
        * 프록시와 게이트웨이의 차이점: 프록시를 사용할 시점은 클라이언트가 결정.

### 5.3 REST Architectural Views

**REST 아키텍처 관점**

* 세 가지 관점에서 REST 디자인 원칙의 장단점을 논한다.
    * 프로세스
    * 커넥터
    * 데이터

비슷한 내용이 이어지므로 생략한다.

## CHAPTER 6. Experience and Evaluation

**경험과 평가**

1994 년 이후, REST 아키텍처 스타일은 현대 웹 아키텍처의 설계 및 개발의 가이드가 되었다.

이 장에서 저자는 HTTP, URI, HTML 등의 웹 표준에 REST가 어떤 영향을 끼쳤는지를 설명하고
그 과정에서 얻은 경험에 대해 이야기한다.

분량이 상당하고, 2019년에 HTTP를 다루는 웹 개발자의 입장에서 상식에 가까운 내용이 많아 내용은 생략하도록 한다.

다만 기억해두고 싶은 몇 가지 내용만 기록해둔다.

* REST: 웹이 어떻게 작동해야 하는지에 대한 아키텍처 모델.
    * IETF와 W3C에서 HTTP, URI, HTML 등의 웹 아키텍처 표준을 정의하기 위해 개발된 것.
* REST는 HTTP/1.0과 HTTP/1.1에 영향을 주었다.
* "Representational State Transfer"라는 이름.
    * 잘 설계된 웹 애플리케이션이 어떻게 동작하는지를 나타내기 위한 것.
        * 웹 페이지들의 네트워크(가상 상태 기계)
        * 애플리케이션 사용자의 링크 선택(상태 변환)
        * 그 결과 돌아온 다음 페이지(애플리케이션의 다음 상태)
* REST는 웹 프로토콜 표준의 용도를 모두 캡슐화하는 것은 아니다.
    * REST는 일반적인 경우에 최적화되어 있음.

REST가 URI 표준에 준 영향

* 자원 개념의 재정의
    * REST는 자원 자체를 돌려주는 방식으로 응답하지 않는다.
    * URI는 문서를 식별하는 것이 아니라 개념을 식별하는 것.
    * 리소스는 개념적 매핑. 
* Manipulating Shadows
    * 식별된 자원의 표현으로 적절한 것을 조작해 돌려주는 방식으로 응답. 
* ...

REST가 HTTP 표준에 준 영향

* 확장성
    * 프로토콜 버저닝
    * 프로토콜 요소의 확장
        * HTTP 메소드를 사용해 요청의 의미를 나타낸다.
        * HTTP 응답 코드 규칙과 포맷에 영향을 줌.
            * 1xx: 임시 정보 응답.
            * 2xx: 요청 성공.
            * 3xx: 리다이렉션.
            * 4xx: 클라이언트 오류.
            * 5xx: 서버 오류.
    * ...
* 자기 설명적 메시지
    * 계층화된 인코딩.
    * 캐시 컨트롤
        * Cache-Control, Age, Etag 등의 헤더 필드들.
    * 콘텐츠 협상
* 성능
 
## CONCLUSIONS

[원문](https://www.ics.uci.edu/~fielding/pubs/dissertation/conclusions.htm )
**결론**

* REST의 장점과 의의를 이야기하고 마무리.




# 참고문헌

* RESTful Web API / 레오나르드 리처드슨, 마이크 애먼슨, 샘 루비 공저 / 박세현, 박진형 공역 / 인사이트(insight) / 2017년 04월 17일
* Architectural Styles and the Design of Network-based Software Architectures by Roy Thomas Fielding 2000
    * [링크](https://www.ics.uci.edu/~fielding/pubs/dissertation/top.htm)
    * [PDF](https://www.ics.uci.edu/~fielding/pubs/dissertation/fielding_dissertation.pdf)

# Links

* [Content negotiation](https://developer.mozilla.org/ko/docs/Web/HTTP/Content_negotiation )

# 미주

