---
layout  : wiki
title   : Router(라우터)
summary : 
date    : 2019-07-22 23:30:06 +0900
updated : 2023-09-30 11:40:16 +0900
tag     : 
resource: 59/4E6168-C1CF-4146-8A8A-438804E1022E
toc     : true
public  : true
parent  : [[/network]]
latex   : false
---
* TOC
{:toc}

## Router

* TCP/IP 완벽 가이드 36장에서 인용

> 일반 네트워크를 서로 연결하면 인터네트워크가 된다.
네트워크를 연결하는 장비가 바로 라우터이며, 라우터는 한 네트워크에서 다른 네트워크로 데이터를 전송한다.
호스트가 로컬 네트워크에 있는 장비가 아닌 다른 장비에게 데이터그램을 보내려면 라우터에게 의존해야 한다.
그렇게 때문에 호스트가 인터네트워크에서 제대로 동작하려면 먼저 로컬 네트워크에 있는 라우터를 찾고
라우터와 네트워크에 대한 정보를 알아야 한다.

* TCP/IP 완벽 가이드 37장에서 인용

> TCP/IP와 인터넷은 동시에 개발되었으므로 TCP/IP 라우팅 프로토콜은 인터넷과 같이 진화되어 왔다.
인터넷의 초기 구조는 인터네트워크에 대해 충분히 알고 있는 적은 수의 핵심 라우터로 이루어져 있었다.
인터넷이 매우 작았을 시절에는 라우터를 추가할수록 핵심 부분도 확장됐다.
핵심 부분이 확장될 때마다 라우터가 유지해야 하는 라우팅 정보는 급속도로 증가했다.  
결국 핵심 부분이 너무 커져서 2계층 구조를 도입해야 했다.
비핵심 라우터는 핵심 라우터의 주변에 위치하며 일부 라우팅 정보만을 가진다.
따라서 비핵심 라우터가 인터넷을 거쳐 데이터를 전송하기 위해서는 핵심 라우터에게 의존해야 한다.
게이트웨이 간 프로토콜(GGP)이라는 특별한 라우팅 프로토콜로 인터넷 핵심 라우터 간의 정보를 교환했고,
외부 게이트웨이 프로토콜(EGP)은 비핵심 라우터와 핵심 라우터 간의 정보를 교환하는 프로토콜이었다.
비핵심 라우터는 단일 네트워크를 핵심 라우터에 연결하는 하나의 단독 라우터일 수도, 한 기관의 라우터 집합일 수도 있다.  
이러한 2계층 구조로도 라우팅을 할 수 있었지만 단 두 계층밖에 존재하지 않았기 때문에 인터넷이 성장하는
속도를 라우팅 프로토콜이 따라잡기는 힘들었다.
핵심 계층에 있는 모든 라우터는 다른 모든 라우터와 통신해야 했으므로
주변 라우터가 핵심 부분의 외부에 있다고는 해도 핵심 라우팅 정보는 계속 늘어만 갔다.

> 크기 증가 문제를 해결하기 위해서는 중앙 관리식 구조에서 탈피하여
크고 성장 속도가 빠른 인터넷에 적합한 구조로 바뀌어야 했다.
탈중앙 구조에서는 인터넷을 자율 시스템(AS, Autonomous System)이라고 불리는 독립된 그룹의 집합으로 취급한다.
AS는 특정 기관이나 관리 단체에서 통제하는 라우터와 네트워크 모음으로 구성된다.
AS는 하나의 일관된 정책을 사용하여 내부 라우팅을 수행한다.  
AS 시스템을 사용하면 인터넷의 라우팅이 개개의 라우터 간에 일어나는 것이 아니라 AS 간에 일어난다는 점이 가장 큰 장점이다.
인터넷에 대한 정보는 AS당 하나나 두 개 정도의 라우터만이 가질 뿐,
AS 내의 다른 라우터는 전체 인터넷에 대해 몰라도 된다.
또한 AS 밖에서는 AS 안의 상세 라우팅에 대해 알 수 없다.
AS를 사용하면 각 AS가 자신에게 맞는 라우팅 방식을 택할 수 있으므로(이 때문에 "자율"이라고 부른다)
전체 인터네트워크의 효율을 높일 수 있다.
각 AS는 전체 인터네트워크에서 고유한 번호를 가진다.

## Hop

* TCP/IP 완벽 가이드 38장에서 인용

> 이론상, 거리 척도로 어떤 비용이라도 사용할 수 있지만 RIP에서는 홉으로 잰 거리를 사용한다.
TCP/IP는 데이터그램이 라우터를 지날 때마다 홉을 세게 되어있다.
따라서 RIP 거리는 라우터와 네트워크 사이의 거리를 데이터그램이 네트워크를 지나는 동안 거쳐야 하는 라우터의 수로 잰다.
라우터가 네트워크에 직접 연결되어 있다면 거리는 1홉이다.
1개의 라우터를 거쳐가야 한다면 거리는 2홉이다.
RIP에서는 어떤 네트워크나 호스트에 대해서도 최대 15홉까지만을 허용한다.
16홉은 무한을 뜻하기 때문에 항목의 값이 16이라면 "이 네트워크나 호스트는 도착할 수 없다"는 것을 의미한다.

RIP(Routing Information Protocol, 라우팅 정보 프로토콜)


## 참고문헌

* TCP/IP 완벽 가이드 / 찰스 M. 코지에록 저/강유, 김진혁, 민병호, 박선재 역 / 에이콘출판사 / 2007년 01월 25일 / 원제 : The TCP/IP Guide: A Comprehensive, Illustrated Internet Protocols Reference
