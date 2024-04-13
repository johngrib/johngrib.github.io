---
layout  : wiki
title   : Kafka Producer acks
summary : 
date    : 2024-04-13 22:58:18 +0900
updated : 2024-04-13 23:48:54 +0900
tag     : 
resource: 1D/72DBD2-5E8E-4AD3-AF1E-DA42E535C81E
toc     : true
public  : true
parent  : [[/kafka]]
latex   : false
---
* TOC
{:toc}

## 개요

acks 설정값은 프로듀서가 쓰기 요청을 보낸 다음, 요청이 성공했다는 응답을 받기 위해 필요한 '요청한 값이 복제된 파티션 레플리카의 수'를 지정한다.

- `acks=0`
    - 프로듀서는 브로커의 메시지 수신확인 응답을 기다리지 않고, 전송 완료됐다고 판단한다.
        - 레코드는 곧바로 소켓버퍼에 추가되며, 전송 완료된 것으로 취급된다.
        - 그러나 실제로 잘 받았는지에 대해서는 보장할 수 없다.
        - `retries` 설정도 적용되지 않는다.
    - 높은 처리율이 필요하면서, 데이터가 좀 유실되어도 큰 문제가 없을 때 고려할 수 있다.
- `acks=1`
    - leader 레플리카는 메시지를 받으면 곧바로 프로듀서에게 확인 응답을 한다.
        - leader 레플리카는 레코드를 받아 로컬 로그에 기록하고, follower들에게 복제가 완료됐다는 확인이 돌아오는 것을 기다리지 않고, 수신됐다고 응답해버린다.
    - 메시지 유실 위험
        - leader가 수신확인했다고 응답하고 난 직후에 leader에 장애가 발생했는데 아직 follower들에게 레코드가 전혀 복제되지 않았다면 메시지가 유실된다.
- `acks=all`
    - `acks=-1` 로 해도 똑같다.
    - leader는 모든 in-sync 레플리카가 레코드를 수신확인할 때까지 기다린 다음, 수신됐다고 응답한다.
    - 따라서 in-sync 레플리카 하나를 제외하고 나머지 모든 레플리카에 장애가 발생한다 하더라도 레코드는 유실되지 않는다.
    - `acks=all` 설정은 idempotence를 활성화하려면 필수.
        - 만약 idempotence가 명시적으로 설정되지 않았는데 충돌하는 설정이 있다면, idempotence는 비활성화되므로 주의할 것.
    - [Kafka 3.0.0 버전부터 default 설정](https://kafka.apache.org/36/documentation.html#upgrade_300_notable ). 그 이전엔 `acks=1` 이었다.

## 인용
### From: Kafka 3.6 Documentation

[3.3 Producer Configs](https://kafka.apache.org/36/documentation.html#producerconfigs_acks )

>
The number of acknowledgments the producer requires the leader to have received before considering a request complete.
This controls the durability of records that are sent. The following settings are allowed:
>
> - `acks=0` If set to zero then the producer will not wait for any acknowledgment from the server at all. The record will be immediately added to the socket buffer and considered sent. No guarantee can be made that the server has received the record in this case, and the `retries` configuration will not take effect (as the client won't generally know of any failures). The offset given back for each record will always be set to `-1`.
> - `acks=1` This will mean the leader will write the record to its local log but will respond without awaiting full acknowledgement from all followers. In this case should the leader fail immediately after acknowledging the record but before the followers have replicated it then the record will be lost.
> - `acks=all` This means the leader will wait for the full set of in-sync replicas to acknowledge the record. This guarantees that the record will not be lost as long as at least one in-sync replica remains alive. This is the strongest available guarantee. This is equivalent to the acks=-1 setting.
>
> Note that enabling idempotence requires this config value to be 'all'. If conflicting configurations are set and idempotence is not explicitly enabled, idempotence is disabled.

### From: 카프카 핵심 가이드

>
보다시피 프로듀서의 `acks` 설정을 내려잡아서 신뢰성을 낮추면 그만큼 레코드를 빠르게 보낼 수 있다.
정리하자면, 신뢰성과 프로듀서 지연 사이에는 트레이드오프 관계가 있다는 이야기다.
하지만, 레코드가 생성되어 컨슈머가 읽을 수 있을 때까지의 시간을 의미하는 <mark>종단 지연(end to end latency)의 경우 세 값이 모두 똑같다.
카프카는 일관성을 유지하기 위해서 모든 인-싱크 레플리카에 복제가 완료된 뒤에야 컨슈머가 레코드를 읽어 갈 수 있게 하기 때문이다.</mark>
따라서, 단순한 프로듀서 지연이 아니라 종단 지연이 주로 고려되어야 하는 경우라면 딱히 절충해야 할 것은 없다.
가장 신뢰성 있는 설정을 택해도 종단 지연은 똑같기 때문이다.
[^kafka-definitive-guide-59]

## 참고문헌

- 카프카 핵심 가이드 [개정증보판] / 그웬 샤피라(Gwen Shapira), 토드 팔리노(Todd Palino), 라지니 시바람(Rajini Sivaram), 크리트 페티(Krit Petty) 저 / 이동진 역 / 제이펍 / 1쇄 발행: 2023-04-14 / 원제: Kafka: The Definitive Guide, 2nd Edition

## 주석

[^kafka-definitive-guide-59]: 카프카 핵심 가이드. 3.4.2장. 59쪽.

