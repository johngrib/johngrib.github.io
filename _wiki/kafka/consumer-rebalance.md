---
layout  : wiki
title   : Kafka Consumer Rebalance
summary : 
date    : 2024-06-10 22:43:41 +0900
updated : 2024-06-10 22:51:27 +0900
tag     : 
resource: 7A/7FD1E3-E60C-4B2D-AADC-C7D1C2AE4204
toc     : true
public  : true
parent  : [[/kafka]]
latex   : false
---
* TOC
{:toc}

## 개요

컨슈머 rebalance는 두 가지 전략 중 하나를 선택할 수 있다.

- eager rebalance
- cooperative reblance
    - [3.1 버전부터 cooperative rebalance가 기본값이다](https://www.confluent.io/ko-kr/blog/apache-kafka-3-1-version-features-and-updates/#eager-rebalance-protocol ).

### eager rebalance {#eager-rebalance}

조급한 리밸런스(eager rebalance)는 모든 컨슈머의 작업을 중지시켜 놓고 다시 할당받는 전략이다.

1. 각 컨슈머는 작업을 멈춘다.
2. 각 컨슈머는 할당되었던 파티션에 대한 소유권을 포기한다.
3. 각 컨슈머는 컨슈머 그룹에 다시 join 하여, 파티션을 다시 할당받는다.


### cooperative rebalance {#cooperative-rebalance}

협력적 리밸런스(cooperative rebalance)는 'stop the world' 없이 점진적으로 리밸런스를 수행하는 전략이다.

작성중...

## 참고문헌

- [From Eager to Smarter in Apache Kafka Consumer Rebalances (confluent.io)](https://www.confluent.io/blog/cooperative-rebalancing-in-kafka-streams-consumer-ksqldb/ )
- [KAFKA-13439: The eager rebalance protocol is deprecated (confluent.io)](https://www.confluent.io/ko-kr/blog/apache-kafka-3-1-version-features-and-updates/#eager-rebalance-protocol )

