---
layout  : wiki
title   : fan in, fan out
summary : 
date    : 2022-05-10 22:45:43 +0900
updated : 2022-05-10 23:40:32 +0900
tag     : 논리회로
toc     : true
public  : true
parent  : [[/what]]
latex   : false
---
* TOC
{:toc}

## 요약

fan in, fan out은 디지털 논리회로에서 논리 게이트에 연결될 수 있는 입력과 출력의 최대값을 의미한다.

- fan in: 게이트에 연결될 수 있는 최대입력수.
- fan out: 게이트의 출력에 연결될 수 있는 입력게이트의 최대 수.

fan out은 소프트웨어 아키텍처에서도 비유적으로 사용되는 표현이기도 하다.

다음은 [rabbitmq.com]( https://www.rabbitmq.com/ )의 [AMQP 0-9-1 Model Explained]( https://www.rabbitmq.com/tutorials/amqp-concepts.html )에 수록된 이미지이다.

![fan out]( ./exchange-fanout.png )

## 인용

### From: 디지털논리회로

>
팬아웃(fan-out)이란 정상동작에 영향을 주지 않고 게이트 출력부에 연결할 수 있는 표준부하의 수이다.
여기서 표준부하란 대개 동일 IC군에서 다른 게이트 평가 정상적으로 동작하기 위해 게이트 입력에 필요한 전류량으로 표시된다.
즉, 팬아웃은 그 게이트의 출력에 연결될 수 있는 입력게이트의 최대수를 나타낸다.
또한 팬-아웃에 대응하여 팬-인(fan-in)을 표시하기도 한다.
논리계열의 팬-인은 논리게이트가 가질 수 있는 최대입력수를 표시한다.
[^kim-15]

### From: ko.wikipedia.org

>
팬 아웃(영어: fan out)은 논리 회로에서 하나의 논리 게이트의 출력이 얼마나 많은 논리 게이트의 입력으로 사용되는지에 대해 서술할 때에 쓰인다.
>
팬 아웃이 크다는 말은 하나의 출력이 많은 논리게이트의 입력으로 사용된다는 뜻이다.
팬 아웃이 너무 크면 무리가 많이 가거나 신호가 제대로 전달되지 않을 수 있기 때문에 중간에 버퍼나 NOT 게이트 두 개를 연결하여 해결하기도 한다.
[^ko-wikipedia]

### From: AMQP 0-9-1 Model Explained

>
역주: 원문은 RabbitMQ의 프로토콜 중 하나인 AMQP 0-9-1의 네 가지 exchange type을 설명하며, Fanout exchange type은 그 중의 하나이다.
이 문서에서는 Direct exchange type과 Fanout exchange type을 번역해 소개한다. 둘을 비교해가며 읽는 것이 Fanout을 더 잘 이해하는 데에 도움이 될 것 같기 때문이다.
{:style="background-color: #ecf1e8;"}

[원문]( https://www.rabbitmq.com/tutorials/amqp-concepts.html )

>
**Direct Exchange**
>
A direct exchange delivers messages to queues based on the message routing key.
A direct exchange is ideal for the unicast routing of messages (although they can be used for multicast routing as well).
Here is how it works:
>
> - A queue binds to the exchange with a routing key K
> - When a new message with routing key R arrives at the direct exchange, the exchange routes it to the queue if K = R
>
Direct exchanges are often used to distribute tasks between multiple workers (instances of the same application) in a round robin manner.
When doing so, it is important to understand that, in AMQP 0-9-1, messages are load balanced between consumers and not between queues.
>
A direct exchange can be represented graphically as follows:
>
![exchange-direct]( ./exchange-direct.png )

**Direct exchange(직접 교환기)**

- Direct exchange는 메시지 라우팅 키를 토대로 여러 큐에 메시지를 전달합니다.
- Direct exchange는 유니캐스트 라우팅을 할 때 이상적입니다(멀티캐스트에도 사용할 수 있습니다).

작동 방식은 다음과 같습니다.

- 각 큐는 라우팅 K를 통해 직접 교환기에 바인딩됩니다.
- 라우팅 키가 R인 새로운 메시지가 직접 교환기에 도착하면 교환기는 그 메시지를 K = R인 큐로 전달합니다.

직접 교환기는 여러 개의 worker(같은 애플리케이션의 여러 인스턴스들)에 라운드 로빈 방식으로 task를 배포할 때 자주 사용됩니다. 이런 방식으로 작동하게 설정한 AMQP 0-9-1에서 메시지는 큐가 아니라 컨슈머들 사이에서 로드 밸런싱된다는 것을 이해하는 것이 중요합니다.

>
**Fanout Exchange**
>
A fanout exchange routes messages to all of the queues that are bound to it and the routing key is ignored.
If N queues are bound to a fanout exchange, when a new message is published to that exchange a copy of the message is delivered to all N queues.
Fanout exchanges are ideal for the broadcast routing of messages.
>
Because a fanout exchange delivers a copy of a message to every queue bound to it, its use cases are quite similar:
>
> - Massively multi-player online (MMO) games can use it for leaderboard updates or other global events
> - Sport news sites can use fanout exchanges for distributing score updates to mobile clients in near real-time
> - Distributed systems can broadcast various state and configuration updates
> - Group chats can distribute messages between participants using a fanout exchange (although AMQP does not have a built-in concept of presence, so XMPP may be a better choice)
>
A fanout exchange can be represented graphically as follows:
>
![fan out]( ./exchange-fanout.png )

팬아웃 교환기는 바인딩된 모든 큐에 메시지를 라우팅합니다. 라우팅 키는 무시합니다.
만약 N개의 큐가 팬아웃 교환기에 바인딩되었을 때, 새로운 메시지가 교환기에 발행되었다면 해당 메시지의 복사본이 N개의 큐 모두에게 전달됩니다.
팬아웃 교환기는 메시지를 브로드캐스트 라우팅할 때 이상적입니다.

왜냐하면 팬아웃 교환기는 메시지의 복사본을 교환기에 바인딩된 모든 큐에 전달하기 때문이며, 사용 사례들도 매우 유사합니다.

- MMO 게임에서 리더보드 업데이트 또는 다양한 글로벌 이벤트에 사용할 수 있습니다.
- 스포츠 뉴스 사이트에서는 팬아웃 교환기를 사용해서 스포츠 경기 득점 업데이트를 거의 실시간으로 수많은 모바일 클라이언트에 전달할 수 있습니다.
- 분산 시스템에서는 다양한 상태와 설정 업데이트를 브로드캐스트할 수 있습니다.
- 그룹 채팅에서 팬아웃 교환기를 사용해 대화 참가자들 사이에 메시지를 배포할 수 있습니다.(AMQP에는 이에 대한 빌트인 컨셉이 없으므로 XMPP가 더 나은 선택일 수 있습니다.)


## 참고문헌

- [AMQP 0-9-1 Model Explained (rabbitmq.com)]( https://www.rabbitmq.com/tutorials/amqp-concepts.html )
- [Fan out (wikipedia)]( https://en.wikipedia.org/wiki/Fan_out ), [팬 아웃 (wikipedia)]( https://ko.wikipedia.org/wiki/팬_아웃 )
- 디지털논리회로 / 김형근, 손진곤 공저 / 한국방송통신대학교출판문화원 / 3개정판 4쇄 발행 2021년 01월 25일

## 주석

[^kim-15]: 디지털 논리회로. 15쪽.
[^ko-wikipedia]: <https://ko.wikipedia.org/wiki/팬_아웃 >
[^en-wikipedia]: <https://en.wikipedia.org/wiki/Fan_out >

