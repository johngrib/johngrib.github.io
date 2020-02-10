---
layout  : wiki
title   : Java에서 random 숫자 사용하기
summary : 
date    : 2020-02-10 23:04:19 +0900
updated : 2020-02-10 23:08:06 +0900
tag     : random
toc     : true
public  : true
parent  : [[Java]]
latex   : false
---
* TOC
{:toc}

## From: 이펙티브 자바 3/E

> 자바 7부터는 Random을 더 이상 사용하지 않는 게 좋다. ThreadLocalRandom 으로 대체하면 대부분 잘 작동한다. Random 보다 더 고품질의 무작위 수를 생성할 뿐 아니라 속도도 더 빠르다(내 컴퓨터에서는 3.6배나 빠르다). 한편, 포크-조인 풀이나 병렬 스트림에서는 SplittableRandom을 사용하라.
[^effective-352]

## TODO

* TODO: ThreadLocalRandom 에 대해 조사하라.
* TODO: SplittableRandom 에 대해 조사하라.

## 참고문헌

* 이펙티브 자바 Effective Java 3/E / 조슈아 블로크 저/개앞맵시(이복연) 역 / 인사이트(insight) / 초판 2쇄 2018년 11월 21일

## 주석
[^effective-352]: 이펙티브 자바. 아이템 59. 352쪽.

