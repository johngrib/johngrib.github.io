---
layout  : wiki
title   : Saga
summary : 작성중인 문서
date    : 2020-07-15 23:22:02 +0900
updated : 2020-07-15 23:26:18 +0900
tag     : 
toc     : true
public  : true
parent  : [[index]]
latex   : false
---
* TOC
{:toc}

## From: 마이크로서비스 패턴

> 기존 분산 트랜잭션 관리 기법이 요즘 애플리케이션에 잘 맞지 않는 것은 공공연한 사실입니다.
여러 서비스에 걸친 작업의 데이터 일관성을 유지하려면 ACID 트랜잭션 대신 사가(saga)라는 메시지 주도(message-driven) 방식의 로컬 트랜잭션을 사용해야 합니다.
그런데 사가는 ACID에서 I(격리성)가 빠진 ACD(원자성, 일관성, 지속성)만 지원하고 격리가 되지 않기 때문에 동시 비정상(concurrency anomaly)의 영향을 방지하거나 줄일 수 있는 설계 기법(대책, countermeasure)을 적용해야 합니다.
[^RIC-4-0]


## 참고문헌

- [RIC] 마이크로서비스 패턴 / 크리스 리처드슨 저/이일웅 역 / 길벗 / 초판발행 2020년 01월 30일

## 주석

[^RIC-4-0]: [RIC] 4장. 154쪽.

