---
layout  : wiki
title   : 비잔틴 오류(Byzantine failure)
summary : 
date    : 2019-10-17 16:44:17 +0900
updated : 2019-10-17 17:04:34 +0900
tag     : 
toc     : true
public  : true
parent  : [[index]]
latex   : false
---
* TOC
{:toc}

* TODO: 문제에 대한 설명 추가
* TODO: 알려진 해결 방법 추가

## 기원

* [LESLIE LAMPORT, ROBERT SHOSTAK, MARSHALL PEASE의 1982년 논문][pdf].

## 인용

### Mastering Bitcoin

>
사토시 나카모토가 비트코인을 발명하면서 "비잔티움 장군 문제(Byzantine Generals' Problem)"로 알려져 있는, 분산 컴퓨팅 분야에서 예전부터 풀지 못했던 문제에 대한 실용적인 해결책이 마련되었다. 간단하게 설명하자면 비잔티움 장군 문제는 신뢰성이 없고 임시로 구성된 네트워크상에서 정보를 교환함으로써 행동방침에 대해 동의를 구하고자 하는 과정에서 발생한다. 사토시 나카모토의 해결책은 신뢰성이 있는 중앙 기관의 존재가 없는 상태에서 네트워크의 동의를 얻기 위해서 작업증명 개념을 이용한다. 이 해법은 분산 컴퓨팅 과학에서 획기적인 업적을 이룬 것이며 통화뿐만이 아니라 다른 분야에도 적용 가능하다. 이 방법은 선거나 복권, 자산 등록, 디지털 공증 등 공정성을 입증해야 하는 분야에서 분산 네트워크에 대한 동의를 구하는 데 사용될 수 있다.[^mastering]

### 트랜잭션 처리의 원리

>
모든 시스템과 리소스 관리자는 정지(stopping)에 의해서 장애가 생긴다. 즉, 2PC 프로토콜은 시스템이나 리소스 관리자가 기능불량(malfaunction)일 때는 잘못을 범하지 않는다. 프로토콜은 어떻게 해야 할 것인가 지시하는 바를 정확히 수행하거나 수행을 정지한다. 어떤 장애는 가짜 메시지 전송처럼 메시지와 일치하지 않는 어떤 것을 프로토콜로 하여금 수행하게 할 수 있다. 이들을 비잔틴 오류(Byzantine failure)라고 한다. 비잔틴 오류에 대처하는 방법은 있지만 그런 방법은 교환되는 메시지의 수에 비추어서 상당히 비용이 많이 들기 때문에 현행 TP 시스템에서는 사용하지 않는다.[^bernstein]

## 참고문헌

* 웹 문서
    * [The Byzantine Generals Problem by LESLIE LAMPORT, ROBERT SHOSTAK, and MARSHALL PEASE. SRI International, 1982][pdf]
    * [Byzantine fault (wikipedia)][wiki-eng]
    * [비잔티움 장애 허용 (위키백과)][wiki]
* 도서
    * 트랜잭션 처리의 원리 / 필립 A. 번스타인, 에릭 뉴코머 공저 / 한창래 역 / KICC(한국정보통신) / 1판 1쇄 2011년 12월 19일
    * 비트코인, 블록체인과 금융의 혁신 / 안드레아스 M. 안토노풀로스 저 / 최은실, 김도훈, 송주한 공역 / 코인플러그 감수 / 고려대학교출판부 / 초판 12쇄 2018년 05월 02일 / 원제: Mastering Bitcoin: Unlocking Digital Cryptocurrencies

## 주석

[^bernstein]: 트랜잭션 처리의 원리. 8 Two-Phase Commit. 291쪽.
[^mastering]: 비트코인, 블록체인과 금융의 혁신. 1 서론. 36쪽.

[pdf]: https://people.eecs.berkeley.edu/~luca/cs174/byzantine.pdf
[wiki]: https://ko.wikipedia.org/wiki/비잔티움_장애_허용
[wiki-eng]: https://en.wikipedia.org/wiki/Byzantine_fault

