---
layout  : wiki
title   : 카프카 설명용 그림
summary : 카프카 관련 설명할 일이 있을 때마다 쓰려고 그려둔 그림들
date    : 2024-06-09 17:00:52 +0900
updated : 2024-06-09 23:00:18 +0900
tag     : 
resource: 8E/2BC882-483A-4878-8B45-23C239057272
toc     : true
public  : true
parent  : [[/kafka]]
latex   : false
---
* TOC
{:toc}

## 예제 시나리오 {#example-scenario}

- 브로커 A - 토픽 A에 파티션이 1개 있다.

![]( /resource/8E/2BC882-483A-4878-8B45-23C239057272/partition1-consumer0.svg )

### 컨슈머 하나가 참여한다 {#join-one-consumer}

- 컨슈머가 Consumer Group A 로 참여한다.
    - 토픽 파티션이 1개 있고, 컨슈머 그룹 내 컨슈머가 1개가 된다.
    - 그룹이 생긴다.
    - 가장 먼저 그룹에 참여한 컨슈머가 그룹 리더가 된다.

![]( /resource/8E/2BC882-483A-4878-8B45-23C239057272/partition1-consumer1.svg )

### 컨슈머 하나가 더 참여한다 {#join-one-more-consumer}

- Consumer Group A에 컨슈머를 하나 더 참여시켜보자.
    - 파티션 하나를 여러 컨슈머가 처리할 수 없도록 되어 있다.
    - 따라서 추가된 컨슈머는 노는 상태가 된다.
        - 파티션보다 컨슈머가 많은 경우에는 노는 컨슈머가 생긴다.

![]( /resource/8E/2BC882-483A-4878-8B45-23C239057272/partition1-consumer2.svg )

### 파티션을 하나 더 늘려보자 {#add-partition}

- 토픽 A에 파티션을 하나 더 늘려보자.
    - 놀고 있던 컨슈머(Consumer 1)가 노는 것을 멈추고 추가된 파티션을 처리하게 된다.

![]( /resource/8E/2BC882-483A-4878-8B45-23C239057272/partition2-consumer2.svg )

### 파티션을 또 하나 더 늘려보자 {#add-partition-2}

- 토픽 A에 파티션을 하나 또 늘려보자.
    - 추가된 파티션은 기존 컨슈머들 중 하나가 처리하게 된다.

![]( /resource/8E/2BC882-483A-4878-8B45-23C239057272/partition3-consumer2.svg )

### 컨슈머를 또 추가해보자 {#consumer3}

- 컨슈머를 하나 더 추가해보자.
    - 컨슈머 rebalance가 일어난다.
    - 즉, 컨슈머들끼리 파티션 소유권을 나누게 된다.

![]( /resource/8E/2BC882-483A-4878-8B45-23C239057272/partition3-consumer3.svg )

### 컨슈머 하나가 죽었다고 해보자 {#consumer-died}

- 컨슈머 하나에 장애가 발생해서 죽었다고 해보자.
    - 이번에도 컨슈머 rebalance가 일어난다.

![]( /resource/8E/2BC882-483A-4878-8B45-23C239057272/partition3-consumer2-disabled1.svg )

## 컨슈머 리밸런스 {#consumer-rebalance}

> TODO: 별도 문서로 분리해야 할 듯.

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


## 참고문헌

- [From Eager to Smarter in Apache Kafka Consumer Rebalances (confluent.io)](https://www.confluent.io/blog/cooperative-rebalancing-in-kafka-streams-consumer-ksqldb/ )
- [KAFKA-13439: The eager rebalance protocol is deprecated (confluent.io)](https://www.confluent.io/ko-kr/blog/apache-kafka-3-1-version-features-and-updates/#eager-rebalance-protocol )

