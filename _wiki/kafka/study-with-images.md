---
layout  : wiki
title   : 카프카 설명용 그림
summary : 카프카 관련 설명할 일이 있을 때마다 쓰려고 그려둔 그림들
date    : 2024-06-09 17:00:52 +0900
updated : 2024-06-17 23:04:04 +0900
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

#### 파티션은 어떻게 컨슈머에게 할당되는가?

>
컨슈머가 그룹에 참여하고 싶을 때는 그룹 코디네이터에게 `JoinGroup` 요청을 보낸다.
가장 먼저 그룹에 참여한 컨슈머가 그룹 리더가 된다.
리더는 그룹 코디네이터로부터 해당 그룹 안에 있는 모든 컨슈머의 목록(여기에는 최근 하트비트를 보냈기 때문에 살아 있는 것으로 간주되는 모든 컨슈머가 포함된다)을 받아서 각 컨슈머에게 파티션의 일부를 할당해 준다.
어느 파티션이 어느 컨슈머에게 할당되어야 하는지를 결정하기 위해서는 `PartitionAssignor` 인터페이스의 구현체가 사용된다.
>
카프카에는 몇 개의 파티션 할당 정책이 기본적으로 내장되어 있다(여기에 대해서는 설정에 대해서 설명할 때 자세히 논의할 것이다).
파티션 할당이 결정되면 컨슈머 그룹 리더는 할당 내역을 `GroupCoordinator`에게 전달하고 그룹 코디네이터는 다시 이 정보를 모든 컨슈머에게 전파한다.
각 컨슈머 입장에서는 자기에게 할당된 내역만 보인다.
즉, 리더만 클라이언트 프로세스 중에서 유일하게 그룹 내 컨슈머와 할당 내역 전부를 볼 수 있는 것이다. 이 과정은 리밸런스가 발생할 때마다 반복적으로 수행된다.
>
-- 카프카 핵심 가이드. 4.1.2장. 89쪽.

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

#### 주의: 파티션을 늘일 수는 있지만 줄일 수는 없다 {#partition-increase}

토픽의 파티션 개수를 늘리는 것은 가능하다. 그러나 줄일 수는 없다.

>
토픽의 파티션 개수는 줄일 수 없다.
토픽에서 파티션을 삭제한다는 것은 곧 토픽에 저장된 데이터의 일부를 삭제한다는 의미인데,
이는 클라이언트 입장에서 일관적이지 않아 보일 수 있다.
뿐만 아니라 데이터를 남은 파티션에 다시 분배하는 것은 어려울 뿐 아니라 메시지의 순서를 바꾸게 된다.
만약 파티션의 수를 줄여야 한다면, 토픽을 삭제하고 다시 만들거나 (토픽 삭제가 불가능할 경우) 새로운 버전의 토픽을 생성해서
모든 쓰기 트래픽을 새 토픽(예 'my-topic-v2')으로 몰아주는 것을 권장한다.
>
-- 카프카 핵심 가이드. 12.1.5장. 348쪽.


### 파티션을 또 하나 더 늘려보자 {#add-partition-2}

- 토픽 A에 파티션을 하나 또 늘려보자.
    - 추가된 파티션은 기존 컨슈머들 중 하나가 처리하게 된다.

![]( /resource/8E/2BC882-483A-4878-8B45-23C239057272/partition3-consumer2.svg )

### 컨슈머를 또 추가해보자 {#consumer3}

- 컨슈머를 하나 더 추가해보자.
    - [[/kafka/consumer-rebalance]]{컨슈머 rebalance}가 일어난다.
    - 즉, 컨슈머들끼리 파티션 소유권을 나누게 된다.

![]( /resource/8E/2BC882-483A-4878-8B45-23C239057272/partition3-consumer3.svg )

### 컨슈머 하나가 죽었다고 해보자 {#consumer-died}

- 컨슈머 하나에 장애가 발생해서 죽었다고 해보자.
    - 이번에도 컨슈머 rebalance가 일어난다.

![]( /resource/8E/2BC882-483A-4878-8B45-23C239057272/partition3-consumer2-disabled1.svg )


## 참고문헌

- [From Eager to Smarter in Apache Kafka Consumer Rebalances (confluent.io)](https://www.confluent.io/blog/cooperative-rebalancing-in-kafka-streams-consumer-ksqldb/ )
- [KAFKA-13439: The eager rebalance protocol is deprecated (confluent.io)](https://www.confluent.io/ko-kr/blog/apache-kafka-3-1-version-features-and-updates/#eager-rebalance-protocol )
- 카프카 핵심 가이드 [개정증보판] / 그웬 샤피라(Gwen Shapira), 토드 팔리노(Todd Palino), 라지니 시바람(Rajini Sivaram), 크리트 페티(Krit Petty) 저 / 이동진 역 / 제이펍 / 1쇄 발행: 2023-04-14 / 원제: Kafka: The Definitive Guide, 2nd Edition

