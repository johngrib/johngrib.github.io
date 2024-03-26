---
layout  : wiki
title   : 사이드카 패턴 (Sidecar Pattern)
summary : 
date    : 2024-03-24 16:09:32 +0900
updated : 2024-03-24 16:52:34 +0900
tag     : msa
resource: 32/DA418B-6E6C-4FA8-894B-5728C8A48A94
toc     : true
public  : true
parent  : [[/pattern]]
latex   : false
---
* TOC
{:toc}

- 다음과 같이 불린다.
    - 사이드카
    - 사이드킥

## 개요

>
주 애플리케이션과 응집력 있는 작업 집합을 공동 배치하지만
자체 프로세스 또는 컨테이너 내에 배치하여
언어 간 플랫폼 서비스에 대한 동질적인 인터페이스를 제공합니다.
[^learn-ms]

## From: 소프트웨어 아키텍처 101

>
앞서 마이크로서비스가 커플링보다 복제를 선호한다고 했습니다.
그러면 모니터링, 로깅, 회로 차단기 등의 운영 관심사와 같이 실제로 커플링이 더 유리한 아키텍처 부분은 어떻게 처리해야 할까요?
전통적인 서비스 지향 아키텍처의 철학에 따르면 도메인이든 운영이든 가급적 많은 기능을 재사용하는 것이 좋습니다.
마이크로서비스 아키텍트는 이 두 가지 관심사를 분리하고자 합니다.
>
여러 마이크로서비스를 구축한 이후에 잘 살펴보면 각 마이크로서비스에 공통적인 요소가 있고 그 유사성을 활용하면 더 유리한 부분이 있음을 알게 됩니다.
예를 들어, 서비스 팀마다 자체 모니터링 체제를 구축하도록 허용하면 팀별로 알아서 잘하리라 장담할 수 있을까요?
또 업그레이드 같은 문제는 어떻게 처리할까요?
모니터링 도구를 새 버전으로 업그레이트하는 작업을 각 팀별 책임으로 부과해야 할까요? 그리고 그 작업은 얼마나 오래 걸릴까요?
>
이 문제를 해결하는 방법이 바로 사이드카 패턴<sup>sidecar pattern</sup>입니다.
>
![]( /resource/32/DA418B-6E6C-4FA8-894B-5728C8A48A94/sidecar-101.jpg )
>
[그림 17-2]에서 보다시피, 공통 운영 관심사를 각 서비스마다 별도의 컴포넌트에 두고, 해당 팀이나 공유 인프라팀이 소유할 수 있도록 합니다.
사이드카 컴포넌트는 팀이 서로 커플링되면 더 유리한 모든 운영 관심사를 도맡아 처리합니다.
따라서 가령 모니터링 도구를 업그레이드할 때가 되면 공유 인프라팀이 사이드카를 업데이트하는 방식으로 각 마이크로서비스는 신기능을 받아 사용할 수 있습니다.
>
각 서비스에는 공통 사이드카가 포함돼 있으므로 서비스 메시<sup>service mesh</sup>를 구축하면 로깅, 모니터링 등의 관심사를 아키텍처 전체적으로 일원화하여 제어할 수 있습니다.
공통 사이드카 컴포넌트는 모든 마이크로서비스에 대해 일관된 운영 인터페이스를 제공합니다.
[^fundamentals-307]

## From: 소프트웨어 아키텍처 The Hard Parts

>
사이드카 패턴은 기술(인프라) 로직과 도메인 로직을 분리한다는, [[/architecture/hexagonal]]{육각형 아키텍처}와 동일한 개념을 응용한 것입니다.
예를 들어, [그림 8-13]처럼 두 마이크로서비스가 있다고 합니다.[^figure-8-13]
>
두 서비스 모두 운영 관심사(서비스 아랫 부분의 규모가 더 큰 컴포넌트)와 도메인 관심사('도메인'이라고 표시된 서비스 윗쪽의 박스들)가 서로 분리돼 있습니다.
운영 기능의 일관성을 중시하는 아키텍트라면 분리 가능한 파트를 사이드카 컴포넌트에 집어넣을 것입니다.
사이드카는 오토바이 옆에 나란히 붙어 있는 사이드카<sup>sidecar</sup>를 비유적으로 표현한 명칭입니다.
사이드카의 구현부는 팀별로 알아서 공유하거나 별도의 인프라 팀이 관리합니다.
아키텍트가 모든 서비스에 사이드카를 두기로 했다면 서비스 플레인<sup>service plane</sup>을 통해 부착된 사이드카가 모든 서비스를 통틀어 일관된 운영 인터페이스 역할을 합니다.
>
모든 서비스가 (피트니스 함수로 관리되는) 사이드카 컴포넌트를 갖고 있다는 전제하에 전체적으로는 [그림 8-15]와 같은 서비스 메시<sup>service mesh</sup> 구조가 됩니다.
각 서비스 우측에 있는 사이드카 박스에 서로 맞물려 말 그대로 '메시<sup>mesh</sup>(그물, 망(網))'가 형성되는 것입니다.
>
![]( /resource/32/DA418B-6E6C-4FA8-894B-5728C8A48A94/service-mesh.jpg )
>
아키텍트와 데브옵스 담당자는 이러한 메시를 이용해 대시보드를 만들거나 확장성 같은 운영 특성을 제어하는 등 여러 가지 일을 할 수 있습니다.
[^hard-parts-289]

## From: learn.microsoft.com

>
이 패턴은 오토바이에 연결된 사이드카와 유사하므로 사이드카라고 합니다.
패턴에서 사이드카는 부모 애플리케이션에 연결되고 애플리케이션에 대한 지원 기능을 제공합니다.
또한 사이드카는 부모 애플리케이션과 동일한 수명 주기를 공유하며, 부모와 함께 생성 및 사용 중지됩니다.
사이드카 패턴은 사이드킥 패턴이라고도 하며 분해 패턴입니다.
[^learn-ms]


## 참고문헌

- [Sidecar pattern(learn.microsoft.com)](https://learn.microsoft.com/en-us/azure/architecture/patterns/sidecar )
    - [한국어](https://learn.microsoft.com/ko-kr/azure/architecture/patterns/sidecar )
- 소프트웨어 아키텍처 101 / 마크 리처즈, 닐 포드 저/이일웅 역 / 한빛미디어 / 초판 1쇄 발행 2021년 11월 01일 / 원제: Fundamentals of Software Architecture
- 소프트웨어 아키텍처 The Hard Parts / 닐 포드, 마크 리처즈, 프라모드 세달라지, 세막 데그하니 저/이일웅 역 / 한빛미디어 / 초판1쇄 발행:  2022년 10월 01일 / 원제: Software Architecture: The Hard Parts

## 주석

[^learn-ms]: [사이드카 패턴(learn.microsoft.com)](https://learn.microsoft.com/ko-kr/azure/architecture/patterns/sidecar )
[^fundamentals-307]: 소프트웨어 아키텍처 101. 17.6장. 307쪽.
[^figure-8-13]: 이 이미지는 '소프트웨어 아키텍처 101'의 그림 17-2와 똑같으므로 생략.
[^hard-parts-289]: 소프트웨어 아키텍처 The Hard Parts. 8.4장. 289쪽.
