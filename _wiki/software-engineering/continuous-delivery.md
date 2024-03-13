---
layout  : wiki
title   : Continuous Delivery
summary : 지속적 전달
date    : 2020-07-11 20:52:44 +0900
updated : 2023-02-05 19:44:21 +0900
tag     : 
resource: 8F/11C0F4-601D-4310-A21A-7867803A86AD
toc     : true
public  : true
parent  : [[/software-engineering]]
latex   : false
---
* TOC
{:toc}

## CD

> Continuous Delivery is the ability to get changes of all types—including new features, configuration changes, bug fixes and experiments—into production, or into the hands of users, safely and quickly in a sustainable way.
>
-- Jez Humble[^continuousdelivery]
>
> 지속적 전달은 새 기능, 구성 변경, 버그 조치, 실험 등 갖가지 변경분을 프로덕션 또는 사용자에게 직접 안전하고 신속하게, 일정한 수준으로 계속 전달하는 능력이다.
>
-- 제즈 험블(Jez Humble)[^richardson-64]

## From: 소프트웨어 아키텍처 101

>
**익스트림 프로그래밍에서 지속적 전달까지**
>
익스트림 프로그래밍(XP)의 기원은 프로세스<sup>process</sup>와 엔지니어링<sup>engineering</sup>의 차이를 잘 보여줍니다.
1990년대 초, 켄트 벡<sup>Kent Beck</sup>이 이끄는 경험 많은 소프트웨어 개발자들은 당시 유행했던 많은 개발 프로세스에 대해 의문을 가지기 시작했습니다.
개발 프로세스 치고 반복적으로 좋은 결과를 내는 건 경험상 하나도 없었죠.
XP 창시자 중 한 사람은 당시 프로세스 중 하나를 고르라는 건 '동전 던지기를 하는 것만큼이나 프로젝트 성공을 보장할 수 없는 행위'라고 말했습니다.
그들은 소프트웨어를 구축하는 방법을 재고하기로 했고 1996년 3월, 드디어 XP 프로젝트를 시작했습니다.
전통적인 지혜와 담을 쌓은 그들은 과거에 프로젝트를 성공으로 이끌었던 프랙티스를 집중적으로 파헤쳤습니다.
과거 프로젝트를 분석한 결과, 테스트를 더 많이 하는 것과 소프트웨어 품질이 상호 연관관계가 있음이 밝혀졌습니다.
그리하여 테스팅을 극도로 실천하는, 즉 테스트를 먼저 해보면서 개발하고 모든 코드를 테스트한 다음에 코드베이스에 넣는 XP 방식의 프랙티스를 확립했습니다.
>
XP는 관점이 비슷한 다른 유명한 애자일 프로세스와 함께 뭉뚱그려 지기도 했지만,
자동화, 테스팅, 지속적 통합, 그 밖에도 구체적이면서 경험에 기초한 여러 기법이 포함된 방법론 중 하나였습니다.
이후에도 소프트웨어 개발의 엔지니어링 측면을 발전시키려는 노력은 계속되어 업데이트된 많은 XP 프랙티스가 집대성된 [Continuous Delivery] (Addison-Wesley Professional, 2010)라는 책이 출간되어 데브옵스가 태동하는 원동력이 되었습니다.
자동화, 테스팅, 선언적 단일 진실 공급원<sup>single source of truth</sup>(SSOT) 등 원래 XP에서 주창한 엔지니어링 프랙티스를 운영자가 받아들이기 시작하면서 데브옵스 혁명이 일어났습니다.
우리는 이러한 진보가 결국 언젠가 소프트웨어 개발을 적절한 엔지니어링의 한 분야로 정착시키는 징검다리 역할을 한다는 점에서 강력히 지지합니다.
>
-- 소프트웨어 아키텍처 101. 1장. 41쪽.

## 참고문헌

- 마이크로서비스 패턴 / 크리스 리처드슨 저/이일웅 역 / 길벗 / 초판발행 2020년 01월 30일
- 소프트웨어 아키텍처 101 / 마크 리처즈, 닐 포드 저/이일웅 역 / 한빛미디어 / 초판 1쇄 발행 2021년 11월 01일 / 원제: Fundamentals of Software Architecture

## 함께 읽기

- [[/software-engineering/continuous-integration]]
- [CONTINUOUS DELIVERY][cdcom]

## 주석

[^richardson-64]: 마이크로서비스 패턴. 1.7.2장.
[^continuousdelivery]: [CONTINUOUS DELIVERY][cdcom]


[cdcom]: https://continuousdelivery.com/

