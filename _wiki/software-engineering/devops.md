---
layout  : wiki
title   : 데브옵스 (DevOps)
summary : 
date    : 2020-01-14 20:15:49 +0900
updated : 2024-02-25 11:30:57 +0900
tag     : devops
resource: EC/C24CBB-D82B-435F-9AC8-7EC2CB12FFFF
toc     : true
public  : true
parent  : [[/software-engineering]]
latex   : false
---
* TOC
{:toc}

## 역사

패트릭 드부아(Patrick Debois)는 데브옵스의 기원에 대해 다음과 같이 말한다.

> 2007년 애자일 팀에서 데이터센터 마이그레이션 프로젝트를 진행했다. 팀은 높은 생산성으로 짧은 시간 내 많은 일을 끝내는 것으로 유명했다.
>
> 나의 다음 업무는 운영에 칸반(Kanban)이 팀의 역동성에 어떤 변화를 초래하는지를 실험하는 것이었다. 이후 Agile Toronto 2008 콘퍼런스에서 해당 실험에 대한 IEEE 논문을 발표했지만, 애자일 커뮤니티에서 큰 반향을 일으키진 못했다. 애자일 시스템 관리 그룹(Agile system administration group)을 시작했으나 인간적인 측면을 간과했기 때문이다.
>
> 존 앨스퍼(John Allspaw)와 폴 해먼드(Paul Hammond)가 2009 Velocity Conference 에서 발표한 '10 Deploys per Day'를 본 후 다른 사람들도 나와 비슷한 생각을 갖고 있다고 느꼈다. 그래서 첫 번째 [DevOpsDays]( https://devopsdays.org/ ) 콘퍼런스를 열기로 결심했고, 이 과정에서 데브옵스(DevOps)라는 용어가 탄생했다.
[^handbook-13]

## 목표

> 데브옵스의 목표는 개발자로 구성된 소규모 팀이 기능을 독립적으로 구현하고, 프로덕션과 유사한 환경에서 정확성을 검증하며, 코드를 프로덕션 환경으로 빠르고 안전하게 배포하는 것이다.[^handbook-30]

<span/>

### From: Release의 모든 것

>
**데브옵스 팀이라는 착오**
>
요즘은 데브옵스 팀이라고 부르는 부서를 흔히 볼 수 있고 큰 회사일수록 더 그렇다.
이 팀은 개발 부서와 운영 부서 사이에서 운영 환경으로 출시하는 작업을 더 빨리 진행되게 하고 자동화하는 것을 목표로 삼는데, 이것은 안티 패턴이다.
>
우선, 데브옵스는 개발과 운영이라는 두 세계를 하나가 되도록 하는 것이다.
개발과 운영 두 팀의 인터페이스는 부드러워져야 한다.
중계하는 부서를 도입한다고 이것이 달성될 리 만무하다.
원래 하나였던 인터페이스가 두 개가 될 뿐이다.
>
그리고 데브옵스는 배치 자동화 이상을 의미한다.
데브옵스는 문화적인 변혁이다.
개발에서는 운영을 전혀 고려하지 않은 채로 던져버리듯 운영에 넘기고 운영은 사무적으로 티켓을 순서대로 처리하며 비난을 회피하기 위해 일하는 문화에서,
정보와 기술을 공유하고 데이터에 기반해서 아키텍처와 설계 결정을 하며 운영 가용성과 응답성에 대한 공통의 가치를 가지는 문화로 전환하는 것이다.
다시 말하지만, 한 팀만 이 책임을 진다는 것은 핵심이 전부 훼손되는 일이다.
>
회사에서 데브옵스 팀을 만들 때 그 팀은 두 가지 목표 중 하나를 가진다.
한 가지 목표는 플랫폼 팀이나 도구 팀이다.
이는 추구할 만한 가치가 있는 목표지만 팀을 본질 그대로 부르는 것이 더 낫다.
>
다른 목표는 다른 팀이 데브옵스를 수용하도록 촉진하는 역할이다.
이는 애자일 확산 팀이나 전환 팀에 더 가깝다.
이 경우 팀의 목표가 소프트웨어나 플랫폼을 만드는 것이 아님을 분명하게 밝혀야 한다.
그 팀은 교육과 전파에 집중해야 한다.
팀 구성원은 가치를 전파하고 다른 팀이 데브옵스 정신을 수용하도록 장려해야 한다.
[^release-401]

## 참고문헌

- 데브옵스 핸드북 / 진 킴, 제즈 험블, 패트릭 드부아, 존 윌리스 저/김영기 역 외 1명 정보 더 보기/감추기 / 에이콘출판사 / 2018년 07월 06일 / 원제: The DevOps Handbook: How to Create World-Class Agility, Reliability, and Security in Technology Organizations
- Release의 모든 것 / 마이클 나이가드(Michael T. Nygard) 저/박성철 역 / 한빛미디어 / 초판 1쇄 발행: 2023년 11월 29일 / 원제: Release It!, 2nd Edition

## 주석

[^handbook-13]: 데브옵스 핸드북. 13쪽.
[^handbook-30]: 데브옵스 핸드북. 30쪽.
[^release-401]: Release의 모든 것. 16.2.1장. 401쪽.

