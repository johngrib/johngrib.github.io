---
layout  : wiki
title   : 죽음의 GC 소용돌이
summary : GC death spiral
date    : 2019-10-29 23:02:40 +0900
updated : 2019-10-29 23:12:24 +0900
tag     : gc
toc     : true
public  : true
parent  : [[garbage-collection]]
latex   : false
---
* TOC
{:toc}

## 인용: 사이트 신뢰성 엔지니어링

> **자바의 가비지 컬렉션 수행률 증가로 인한 CPU 사용률 증가**  
가비지 컬렉션이 비정상적으로 동작하면 가용한 CPU 자원이 줄어들고 이로 인해 요청의 처리가 느려지면서 RAM 사용량이 증가하고 그 결과 GC 작업이 더 빈번하게 수행되면 CPU 자원이 더 모자라게 되는 악순환이 발생한다. 이를 '죽음의 GC 소용돌이(GC death spiral)'라고 한다.[^sre]

## 참고문헌

*  * 사이트 신뢰성 엔지니어링 / 벳시 베이어, 크리스 존스, 제니퍼 펫오프, 니얼 리처드 머피 저/장현희 역 / 제이펍 / 초판 1쇄 2018년 01월 18일 / 원서 : Site Reliability Engineering: How Google Runs Production Systems

## 주석

[^sre]: 사이트 신뢰성 엔지니어링. 22 연속적 장애 다루기. 306쪽.
