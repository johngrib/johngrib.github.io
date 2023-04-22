---
layout  : wiki
title   : Kafka - a Distributed Messaging System for Log Processing
summary : Kafka - 대용량 로그 처리를 위한 분산 메시징 시스템
date    : 2023-04-22 21:16:04 +0900
updated : 2023-04-23 01:10:13 +0900
tag     : 
resource: 27/329CF0-E844-4E3C-AAFA-E8D4252CD62C
toc     : true
public  : true
parent  : [[/clipping]]
latex   : false
---
* TOC
{:toc}

## Kafka: a Distributed Messaging System for Log Processing 번역

### 일러두기

**이 웹 사이트( https://johngrib.github.io )는 상업적인 용도로 운영하는 것이 아니며, 개인적인 공부 목적으로 이 논문을 번역합니다. 이 논문의 원본 저작권자에게 존경과 감사를 표합니다.**

**This website( https://johngrib.github.io ) is not operated for commercial purposes, and the translation of this paper is for personal study purposes only. Respect and gratitude are expressed to the original copyright holders and publishers of this paper.**

>
Permission to make digital or hard copies of all or part of this work for personal or classroom use is granted without fee provided that copies are not made or distributed for profit or commercial advantage and that copies bear this notice and the full citation on the first page.  
To copy otherwise, or republish, to post on servers or to redistribute to lists, requires prior specific permission and/or a fee.  
NetDB'11, Jun. 12, 2011, Athens, Greece.  
Copyright 2011 ACM 978-1-4503-0652-2/11/06…$10.00.

### ABSTRACT

**초록**

>
Log processing has become a critical component of the data pipeline for consumer internet companies.
We introduce Kafka, a distributed messaging system that we developed for collecting and delivering high volumes of log data with low latency.
Our system incorporates ideas from existing log aggregators and messaging systems, and is suitable for both offline and online message consumption.
We made quite a few unconventional yet practical design choices in Kafka to make our system efficient and scalable.
Our experimental results show that Kafka has superior performance when compared to two popular messaging systems.
We have been using Kafka in production for some time and it is processing hundreds of gigabytes of new data each day.

로그 처리는 소비자 중심 인터넷 기업의 데이터 파이프라인에서 핵심적인 구성 요소가 되었습니다.
이 글에서는 우리가 개발한 Kafka를 소개하고자 합니다.
Kafka는 낮은 시연 시간으로 대량의 로그 데이터를 수집하고 전달하기 위한 분산 메시징 시스템입니다.
우리의 시스템은 기존의 로그 집계기와 메시징 시스템의 아이디어를 통합하고 있으며, 오프라인과 온라인 양쪽의 메시징 소비에 적합합니다.
우리는 카프카에서 효율적이고 확장 가능한 시스템을 만들기 위해, 일반적이지는 않지만 실용적인 몇 가지 선택을 했습니다.
우리의 실험 결과를 보면, 카프카는 두 가지 인기 있는 메시징 시스템과 비교해 보았을 때 우수한 성능을 보여줍니다.
우리는 일정 시간 동안 카프카를 프로덕션 환경에서 사용해 왔고, 매일 수백 기가바이트의 새로운 데이터를 처리하고 있습니다.

### General Terms

>
Management, Performance, Design, Experimentation.

### Keywords

>
messaging, distributed, log processing, throughput, online.

### 1. Introduction

**1. 서론**

>
There is a large amount of “log” data generated at any sizable internet company.
This data typically includes (1) user activity events corresponding to logins, pageviews, clicks, “likes”, sharing, comments, and search queries; (2) operational metrics such as service call stack, call latency, errors, and system metrics such as CPU, memory, network, or disk utilization on each machine.
Log data has long been a component of analytics used to track user engagement, system utilization, and other metrics.
However recent trends in internet applications have made activity data a part of the production data pipeline used directly in site features.
These uses include (1) search relevance, (2) recommendations which may be driven by item popularity or cooccurrence in the activity stream, (3) ad targeting and reporting, and (4) security applications that protect against abusive behaviors such as spam or unauthorized data scraping, and (5) newsfeed features that aggregate user status updates or actions for their “friends” or “connections” to read.

규모있는 인터넷 기업에서는 상당한 양의 "로그" 데이터가 생성됩니다.
이러한 데이터는 일반적으로 다음의 내용들로 이루어집니다.

- (1) 사용자 활동 이벤트
    - 로그인, 페이지 보기, 클릭, "좋아요", 공유, 댓글 및 검색 쿼리 등.
- (2) 시스템 지표
    - 서비스 호출 스택, 호출 지연, 에러.
    - 각 머신에서의 CPU, 메모리, 네트워크, 디스크 사용률.

로그 데이터는 사용자 참여, 시스템 사용률 등의 지표를 추적하는 데 사용되는 분석의 구성 요소로 오랫동안 사용되었습니다.
그러나 최근의 인터넷 애플리케이션 트렌드로 인해, 활동 데이터가 사이트의 기능에서 직접 사용되는 프로덕션 데이터 파이프라인의 일부가 되었습니다.
이러한 활동 데이터 사용 사례에는 다음과 같은 것들이 있습니다.

- (1) 검색 관련.
- (2) 활동 스트림에서 아이템의 인기나 동시 발생에 의해 작동하는 '추천'.
- (3) 광고 타겟팅과 광고 보고서.
- (4) 스팸 또는 미승인 데이터 스크래핑과 같은 악성 행위를 방지하는 보안 애플리케이션.
- (5) '사용자 상태 업데이트' 또는 "친구"나 "연결된 사용자들"에게 보여주는 '사용자 상태 업데이트', 행동을 집계하는 뉴스 피드 기능 등.

>
This production, real-time usage of log data creates new challenges for data systems because its volume is orders of magnitude larger than the “real” data.
For example, search, recommendations, and advertising often require computing granular click-through rates, which generate log records not only for every user click, but also for dozens of items on each page that are not clicked.
Every day, China Mobile collects 5–8TB of phone call records [11] and Facebook gathers almost 6TB of various user activity events [12].

로그 데이터의 실시간 사용은 "실제" 데이터보다 몇 단계 더 큰 규모의 데이터 볼륨으로, 데이터 시스템에 새로운 도전을 제시합니다.

예를 들어 검색, 추천, 광고는 종종 세부적인 클릭률을 계산해야 하는데, 이는 사용자의 모든 클릭에 대한 로그 레코드뿐만 아니라 클릭되지 않은 각 페이지의 수십 개의 항목에 대한 로그 레코드도 생성합니다.
중국의 모바일은 매일 5-8TB의 전화 기록을 수집하고, 페이스북은 거의 6TB의 다양한 사용자 활동 이벤트를 수집합니다.

>
Many early systems for processing this kind of data relied on physically scraping log files off production servers for analysis.
In recent years, several specialized distributed log aggregators have been built, including Facebook’s Scribe [6], Yahoo’s Data Highway [4], and Cloudera’s Flume [3].
Those systems are primarily designed for collecting and loading the log data into a data warehouse or Hadoop [8] for offline consumption.
At LinkedIn (a social network site), we found that in addition to traditional offline analytics, we needed to support most of the real-time applications mentioned above with delays of no more than a few seconds.

이런 종류의 데이터를 처리하기 위한 초기 시스템들은, 분석을 위해 프로덕션 서버에서 물리적으로 로그 파일을 스크래핑하는 방식을 사용했습니다.
최근 몇 년 동안에는 페이스북의 Scribe, 야후의 Data Highway, 클라우데라의 Flume 등과 같은 특수한 분산 로그 수집기들이 개발되었습니다.
이러한 시스템들은 주로 로그 데이터를 수집해서 데이터 웨어하우스 또는 하둡에 적재하고, 오프라인으로 사용하기 위해 설계되었습니다.

링크드인(소셜 네트워크 사이트)에서는 전통적인 오프라인 분석 외에도 위에서 언급한 실시간 애플리케이션 대부분을 몇 초 이내의 지연 시간으로 지원해야 했습니다.

>
We have built a novel messaging system for log processing called Kafka [18] that combines the benefits of traditional log aggregators and messaging systems.
On the one hand, Kafka is distributed and scalable, and offers high throughput.
On the other hand, Kafka provides an API similar to a messaging system and allows applications to consume log events in real time.
Kafka has been open sourced and used successfully in production at LinkedIn for more than 6 months.
It greatly simplifies our infrastructure, since we can exploit a single piece of software for both online and offline consumption of the log data of all types.
The rest of the paper is organized as follows.
We revisit traditional messaging systems and log aggregators in Section 2.
In Section 3, we describe the architecture of Kafka and its key design principles.
We describe our deployment of Kafka at LinkedIn in Section 4 and the performance results of Kafka in Section 5.
We discuss future work and conclude in Section 6.

우리는 전통적인 로그 집계기와 메시징 시스템의 장점을 결합한, Kafka라는 새로운 로그 처리용 메시징 시스템을 구축했습니다.
한편, Kafka는 분산되고 확장 가능하며, 높은 처리량을 제공합니다.
그리고 Kafka는 메시징 시스템과 유사한 API를 제공하며, 애플리케이션에서 실시간으로 로그 이벤트를 소비할 수 있도록 합니다.
Kafka는 오픈소스로 공개되었고, 링크드인에서 6개월 이상의 프로덕션 환경에서 성공적으로 사용되고 있습니다.
Kafka로 인해 모든 유형의 로그 데이터를 온라인과 오프라인으로 사용하는 데에 사용되는 소프트웨어를 하나로 통합할 수 있었기 때문에, 우리의 인프라가 크게 단순화되었습니다.

이 논문의 나머지 부분은 다음과 같이 되어 있습니다.
섹션 2에서는 전통적인 메시징 시스템과 로그 집계기를 다시 살펴봅니다.
섹션 3에서는 Kafka의 아키텍처와 핵심 설계 원칙을 설명합니다.
섹션 4에서는 링크드인에서의 Kafka 배포를, 섹션 5에서는 Kafka의 성능 결과를 설명합니다.
섹션 6에서는 앞으로의 작업과 결론에 대해 논의합니다.

### 2. Related Work

**2. 관련된 연구**

>
Traditional enterprise messaging systems [1][7][15][17] have existed for a long time and often play a critical role as an event bus for processing asynchronous data flows.
However, there are a few reasons why they tend not to be a good fit for log processing.
First, there is a mismatch in features offered by enterprise systems.
Those systems often focus on offering a rich set of delivery guarantees.
For example, IBM Websphere MQ [7] has transactional supports that allow an application to insert messages into multiple queues atomically.
The JMS [14] specification allows each individual message to be acknowledged after consumption, potentially out of order.
Such delivery guarantees are often overkill for collecting log data.
For instance, losing a few pageview events occasionally is certainly not the end of the world.
Those unneeded features tend to increase the complexity of both the API and the underlying implementation of those systems.
Second, many systems do not focus as strongly on throughput as their primary design constraint.
For example, JMS has no API to allow the producer to explicitly batch multiple messages into a single request.
This means each message requires a full TCP/IP roundtrip, which is not feasible for the throughput requirements of our domain.
Third, those systems are weak in distributed support.
There is no easy way to partition and store messages on multiple machines.
Finally, many messaging systems assume near immediate consumption of messages, so the queue of unconsumed messages is always fairly small.
Their performance degrades significantly if messages are allowed to accumulate, as is the case for offline consumers such as data warehousing applications that do periodic large loads rather than continuous consumption.

전통적인 기업용 메시징 시스템들은 오랫동안 존재해 왔으며, 비동기 데이터 흐름을 처리하는 이벤트 버스로서 종종 중요한 역할을 담당합니다.
그러나 그러한 시스템들이 로그 처리에 적합하지 않은 이유가 몇 가지 있습니다.

첫째, 기업용 시스템에서 제공하는 기능들 간의 불일치가 있습니다.
이러한 시스템들은 종종 다양한 전달 보장을 제공하는데 집중합니다.
예를 들어, IBM Websphere MQ는 애플리케이션이 여러 큐에 메시지를 원자적으로 입력할 수 있도록 해주는 트랜잭션을 지원합니다.
JMS 명세는 소비 후 각각의 메시지를 순서에 상관없이 확인할 수 있도록 해줍니다.
이러한 전달 보장은 로그 데이터 수집에 대해서는 과도한 기능입니다.
가령, 가끔 페이지뷰 이벤트를 몇 개 잃어버린다 해도 세상이 끝장나는 것은 아니기 때문입니다.
이러한 필요하지 않은 기능들은 API와 시스템의 기본 구현을 복잡하게 만드는 경향이 있습니다.

둘째, 많은 시스템에서는 처리율을 설계의 핵심 제약조건으로 강하게 주목하지 않습니다.
예를 들어 JMS에는, 프로듀서가 여러 메시지를 하나의 요청으로 명시적으로 묶을 수 있는 API가 없습니다.
이는 각 메시지가 전체 TCP/IP 라운드트립을 필요로 한다는 것을 의미하며, 이런 것은 우리 도메인의 처리율 요구사항에는 적합하지 않습니다.

셋째, 이러한 시스템들은 분산 지원이 약합니다.
여러 대의 컴퓨터에 메시지를 분할하고 저장하는 것은 쉽지 않습니다.
마지막으로, 많은 메시징 시스템들은 메시지 소비가 거의 즉시라고 가정하기 때문에, 항상 소비되지 않은 메시지의 큐가 꽤 작습니다.
연속적인 소비 대신 주기적인 대량 적재를 수행하는 데이터 웨어하우징 애플리케이션과 같은 오프라인 소비자의 경우, 메시지가 쌓이는 것을 허용하면 성능이 크게 저하됩니다.

>
A number of specialized log aggregators have been built over the last few years.
Facebook uses a system called Scribe.
Each frontend machine can send log data to a set of Scribe machines over sockets.
Each Scribe machine aggregates the log entries and periodically dumps them to HDFS [9] or an NFS device.
Yahoo’s data highway project has a similar dataflow.
A set of machines aggregate events from the clients and roll out “minute” files, which are then added to HDFS.
Flume is a relatively new log aggregator developed by Cloudera.
It supports extensible “pipes” and “sinks”, and makes streaming log data very flexible.
It also has more integrated distributed support.
However, most of those systems are built for consuming the log data offline, and often expose implementation details unnecessarily (e.g. “minute files”) to the consumer.
Additionally, most of them use a “push” model in which the broker forwards data to consumers.
At LinkedIn, we find the “pull” model more suitable for our applications since each consumer can retrieve the messages at the maximum rate it can sustain and avoid being flooded by messages pushed faster than it can handle.
The pull model also makes it easy to rewind a consumer and we discuss this benefit at the end of Section 3.2.

지난 몇 년 동안 수많은 전문적인 로그 집계기가 개발되었습니다.

페이스북은 Scribe라는 시스템을 사용합니다.
각 프론트엔드 머신은 Scribe 머신들에게 소켓을 통해 로그 데이터를 보낼 수 있습니다.
각각의 Scribe 머신은 로그 엔트리들을 집계하고 주기적으로 HDFS나 NFS 장치에 저장합니다.

야후의 데이터 하이웨이 프로젝트도 비슷한 데이터 흐름을 가지고 있습니다.
클라이언트로부터 이벤트를 집계하는 머신 집합이 “minute” 파일을 만들어서 HDFS에 추가합니다.

Flume는 클라우데라에서 개발한 상대적으로 새로운 로그 집계기입니다.
확장 가능한 “pipes”와 “sinks”를 지원하며, 로그 데이터 스트리밍을 매우 유연하게 만들어 줍니다.
또한 더 통합된 분산 지원을 제공합니다.

그러나, 대부분의 이러한 시스템들은 로그 데이터를 오프라인으로 소비하기 위해 만들어졌으며, 종종 불필요한 세부 구현을 컨슈머에게 노출합니다.(예: “minute files”)
게다가 대부분의 시스템에서는 브로커가 데이터를 컨슈머에게 전달하는 “push” 모델을 사용합니다.

링크드인에서는 "pull" 모델이 우리의 애플리케이션에 더 적합하다고 판단합니다.
각각의 컨슈머가 최대 속도로 메시지를 가져올 수 있고,
처리할 수 없는 속도로 메시지가 푸시되는 것을 피할 수 있기 때문입니다.
"pull" 모델은 컨슈머를 되감기하는 것을 쉽게 만들어주기도 합니다. 이러한 장점은 3.2절의 끝에서 논의합니다.

>
More recently, Yahoo! Research developed a new distributed pub/sub system called HedWig [13].
HedWig is highly scalable and available, and offers strong durability guarantees.
However, it is mainly intended for storing the commit log of a data store.

최근, Yahoo! Research는 HedWig이라는 새로운 분산 pub/sub 시스템을 개발했습니다.
HedWig는 높은 확장성과 가용성을 제공하며, 강력한 내구성 보장을 제공합니다.
그러나, 주로 데이터 스토어의 커밋 로그를 저장하기 위한 목적으로 사용됩니다.

### 3. Kafka Architecture and Design Principles

>
Because of limitations in existing systems, we developed a new messaging-based log aggregator Kafka.
We first introduce the basic concepts in Kafka.
A stream of messages of a particular type is defined by a topic.
A producer can publish messages to a topic.
The published messages are then stored at a set of servers called brokers.
A consumer can subscribe to one or more topics from the brokers, and consume the subscribed messages by pulling data from the brokers.

기존 시스템의 한계 때문에, 우리는 새로운 메시징 기반 로그 집계기인 Kafka를 개발했습니다.
먼저 Kafka의 기본 개념을 소개합니다.
특정한 타입의 메시지 스트림을 토픽으로 정의합니다.
프로듀서는 토픽에 메시지를 발행할 수 있습니다.
발행된 메시지는 브로커라고 불리는 서버 집합에 저장됩니다.
컨슈머는 브로커에 있는 토픽을 하나 이상 구독할 수 있으며, 브로커로부터 데이터를 풀링하여 구독한 메시지를 소비할 수 있습니다.

>
Messaging is conceptually simple, and we have tried to make the Kafka API equally simple to reflect this.
Instead of showing the exact API, we present some sample code to show how the API is used.
The sample code of the producer is given below.
A message is defined to contain just a payload of bytes.
A user can choose her favorite serialization method to encode a message.
For efficiency, the producer can send a set of messages in a single publish request.

메시징은 개념적으로 간단하기 때문에, 우리는 이를 반영해 Kafka API도 가능한 간단하게 만들려고 노력했습니다.
API가 어떻게 사용되는지 보여주기 위해 정확한 API를 보여주는 대신, 샘플 코드를 소개합니다.
프로듀서의 샘플 코드는 아래와 같습니다.
메시지는 바이트의 페이로드만 포함하도록 정의됩니다.
사용자는 메시지를 인코딩하기 위해 선호하는 직렬화 방법을 선택할 수 있습니다.
효율성을 위해, 프로듀서는 하나의 발행 요청에 메시지들의 집합을 보내는 것도 가능합니다.

> Sample producer code:
>
> ```java
> producer = new Producer(…);
> message = new Message("test message str".getBytes());
> set = new MessageSet(message);
> producer.send("topic1", set);
> ```

>
To subscribe to a topic, a consumer first creates one or more message streams for the topic.
The messages published to that topic will be evenly distributed into these sub-streams.
The details about how Kafka distributes the messages are described later in Section 3.2.
Each message stream provides an iterator interface over the continual stream of messages being produced.
The consumer then iterates over every message in the stream and processes the payload of the message.
Unlike traditional iterators, the message stream iterator never terminates.
If there are currently no more messages to consume, the iterator blocks until new messages are published to the topic.
We support both the point-topoint delivery model in which multiple consumers jointly consume a single copy of all messages in a topic, as well as the publish/subscribe model in which multiple consumers each retrieve its own copy of a topic.

토픽을 구독하려면, 컨슈머는 먼저 토픽에 대해 하나 이상의 메시지 스트림을 생성합니다.
해당 토픽에 발행된 메시지는 이러한 하위 스트림에 균등하게 분배됩니다.
Kafka가 메시지를 어떻게 분배하는지에 대한 세부 사항은 3.2절에서 설명합니다.
각각의 메시지 스트림은 계속해서 생성되는 메시지 스트림에 대한 반복자 인터페이스를 제공합니다.
컨슈머는 스트림의 모든 메시지를 반복하고, 메시지의 페이로드를 처리합니다.
전통적인 반복자와 달리, 메시지 스트림 반복자는 종료되지 않습니다.
현재 소비할 메시지가 없다면, 반복자는 새로운 메시지가 토픽에 발행될 때까지 블록됩니다.
우리는 여러 컨슈머가 토픽의 모든 메시지의 단일 복사본을 공동으로 소비하는 점대점 전달 모델과, 여러 컨슈머가 각각 토픽의 복사본을 가져오는 발행/구독 모델을 모두 지원합니다.

> Sample consumer code:
>
> ```java
> streams[] = Consumer.createMessageStreams("topic1", 1)
> for (message : streams[0]) {
>   bytes = message.payload();
>   // do something with the bytes
> }
> ```

>
The overall architecture of Kafka is shown in Figure 1.
Since Kafka is distributed in nature, an Kafka cluster typically consists of multiple brokers.
To balance load, a topic is divided into multiple partitions and each broker stores one or more of those partitions.
Multiple producers and consumers can publish and retrieve messages at the same time.
In Section 3.1, we describe the layout of a single partition on a broker and a few design choices that we selected to make accessing a partition efficient.
In Section 3.2, we describe how the producer and the consumer interact with multiple brokers in a distributed setting.
We discuss the delivery guarantees of Kafka in Section 3.3.

Kafka의 전체 아키텍처는 Figure 1에 나와 있습니다.
Kafka는 분산 환경이기 때문에, Kafka 클러스터는 일반적으로 여러 브로커들로 구성됩니다.
부하를 균형있게 분산하기 위해, 토픽은 여러 파티션으로 나뉘며, 각 브로커는 그러한 파티션 중 하나 이상을 저장합니다.
여러 프로듀서와 컨슈머가 동시에 메시지를 발행하고 가져올 수 있습니다.

3.1절에서, 브로커의 하나의 파티션에 대한 레이아웃과 파티션에 효율적으로 접근하기 위해 선택한 몇 가지 설계상의 선택에 대해 설명합니다.
그리고 3.2절에서는, 프로듀서와 컨슈머가 분산 환경에서 여러 브로커와 상호작용하는 방법에 대해 설명합니다.
3.3절에서는, Kafka의 전달 보장에 대해 설명합니다.

![image]( /resource/27/329CF0-E844-4E3C-AAFA-E8D4252CD62C/233792969-39665c96-9744-4202-aae7-d92220400912.png )


#### 3.1 Efficiency on a Single Partition

**3.1 단일 파티션에서의 효율성**

>
We made a few decisions in Kafka to make the system efficient

Kafka에서는 시스템을 효율적으로 만들기 위해 몇 가지 결정을 내렸습니다.

##### Simple storage

>
Simple storage: Kafka has a very simple storage layout.
Each partition of a topic corresponds to a logical log.
Physically, a log is implemented as a set of segment files of approximately the same size (e.g., 1GB).
Every time a producer publishes a message to a partition, the broker simply appends the message to the last segment file.
For better performance, we flush the segment files to disk only after a configurable number of messages have been published or a certain amount of time has elapsed.
A message is only exposed to the consumers after it is flushed.

간단한 저장소: Kafka는 매우 간단한 저장소 레이아웃을 가지고 있습니다.
토픽의 각 파티션은 논리적인 로그에 해당합니다.
물리적으로, 로그는 대략 같은 크기(예: 1GB)의 세그먼트 파일의 집합으로 구현됩니다.
프로듀서가 파티션에 메시지를 발행할 때마다, 브로커는 단순히 메시지를 마지막 세그먼트 파일에 추가합니다.
더 나은 성능을 위해, 우리는 메시지가 일정한 수가 되었거나 또는 일정한 시간이 지날 때마다 세그먼트 파일을 디스크에 쓰도록 합니다.
메시지는 디스크에 쓰여진(flushed) 후에만 컨슈머에게 노출됩니다.

>
Unlike typical messaging systems, a message stored in Kafka doesn’t have an explicit message id.
Instead, each message is addressed by its logical offset in the log.
This avoids the overhead of maintaining auxiliary, seek-intensive random-access index structures that map the message ids to the actual message locations.
Note that our message ids are increasing but not consecutive.
To compute the id of the next message, we have to add the length of the current message to its id.
From now on, we will use message ids and offsets interchangeably.

일반적인 메시징 시스템과는 달리, Kafka에 저장된 메시지에는 명시적인 메시지 id가 없습니다.
그 대신, 각 메시지는 로그에서의 논리적인 오프셋에 의해 주소가 지정됩니다.
이로 인해 메시지 id를 실제 메시지 위치에 매핑하는 '보조적이고 탐색에 집중된 랜덤 액세스 인덱스 구조'를 유지하는 오버헤드를 피할 수 있습니다.
메시지 id는 증가하지만 연속적이지는 않다는 점에 유의하세요.
다음 메시지의 id를 계산하기 위해서는, 현재 메시지의 id에 현재 메시지의 길이를 더해야 합니다.
이제부터, 메시지 id와 오프셋을 서로 바꿔서 사용할 것입니다.

>
A consumer always consumes messages from a particular partition sequentially.
If the consumer acknowledges a particular message offset, it implies that the consumer has received all messages prior to that offset in the partition.
Under the covers, the consumer is issuing asynchronous pull requests to the broker to have a buffer of data ready for the application to consume.
Each pull request contains the offset of the message from which the consumption begins and an acceptable number of bytes to fetch.
Each broker keeps in memory a sorted list of offsets, including the offset of the first message in every segment file.
The broker locates the segment file where the requested message resides by searching the offset list, and sends the data back to the consumer.
After a consumer receives a message, it computes the offset of the next message to consume and uses it in the next pull request.
The layout of an Kafka log and the in-memory index is depicted in Figure 2.
Each box shows the offset of a message.

컨슈머는 항상 특정 파티션에서 메시지를 순차적으로 소비합니다.
만약 컨슈머가 특정 메시지 오프셋을 확인했다면, 그 파티션에서 해당 오프셋 이전의 모든 메시지를 받았다는 것을 의미합니다.
내부적으로는,
컨슈머는 브로커에게 비동기 pull 요청을 발행하여, 애플리케이션이 소비할 수 있도록 데이터를 버퍼링합니다.
각 pull 요청에는 소비가 시작되는 메시지의 오프셋과 가져올 수 있는 바이트 수가 포함됩니다.
각 브로커는 메모리에 정렬된 오프셋들의 목록을 유지하며, 이 목록에는 모든 세그먼트 파일의 첫 번째 메시지의 오프셋이 포함됩니다.
브로커는 오프셋 목록을 검색하여 요청된 메시지가 있는 세그먼트 파일을 찾고, 데이터를 컨슈머에게 보냅니다.
컨슈머가 메시지를 받으면, 다음에 소비할 메시지의 오프셋을 계산하고, 다음 pull 요청에 사용합니다.
Kafka 로그의 레이아웃과 메모리 내 인덱스는 Figure 2에 나와 있습니다.
각 박스는 메시지의 오프셋을 보여줍니다.

![image]( /resource/27/329CF0-E844-4E3C-AAFA-E8D4252CD62C/233793778-642e4638-1d79-4ffb-b969-a270b0f9f5da.png )


##### Efficient transfer

>
Efficient transfer: We are very careful about transferring data in and out of Kafka.
Earlier, we have shown that the producer can submit a set of messages in a single send request.
Although the end consumer API iterates one message at a time, under the covers, each pull request from a consumer also retrieves multiple messages up to a certain size, typically hundreds of kilobytes.

효율적인 전송: 우리는 Kafka로 데이터를 주고받는 일에 매우 주의를 기울입니다.
위에서 우리는 한 번의 send 요청으로 메시지들의 집합을 제출할 수 있다고 설명했습니다.
최종 컨슈머 API는 한 번에 하나의 메시지를 반복하지만,
내부적으로는 컨슈머의 각 pull 요청도 일정한 크기가 되기까지 여러 메시지를 가져옵니다.
이 크기는 일반적으로 수백 킬로바이트입니다.

>
Another unconventional choice that we made is to avoid explicitly caching messages in memory at the Kafka layer.
Instead, we rely on the underlying file system page cache.
This has the main benefit of avoiding double buffering---messages are only cached in the page cache.
This has the additional benefit of retaining warm cache even when a broker process is restarted.
Since Kafka doesn’t cache messages in process at all, it has very little overhead in garbage collecting its memory, making efficient implementation in a VM-based language feasible.
Finally, since both the producer and the consumer access the segment files sequentially, with the consumer often lagging the producer by a small amount, normal operating system caching heuristics are very effective (specifically write-through caching and readahead).
We have found that both the production and the consumption have consistent performance linear to the data size, up to many terabytes of data.

우리가 선택한 또다른 일반적이지 않은 선택은 Kafka 레이어에서 메모리에 메시지를 캐싱하지 않는다는 것입니다.
대신, 우리는 기본 파일 시스템 페이지 캐시를 사용합니다.
이로 인해 메시지는 페이지 캐시에만 캐싱되므로, 더블 버퍼링을 피할 수 있습니다.
또한 브로커 프로세스가 재시작되어도 캐시가 유지되는 추가적인 장점이 있습니다.

Kafka가 프로세스에서 전혀 메시지를 캐싱하지 않기 때문에, 메모리의 가비지 컬렉팅 오버헤드가 거의 없습니다.
그러므로 VM 기반 언어에서 효율적인 구현이 가능합니다.
마지막으로, 프로듀서와 컨슈머가 모두 세그먼트 파일에 순차적으로 접근하며,
컨슈머가 프로듀서보다 작은 양만큼 뒤쳐져 있기 때문에,
일반적인 운영체제 캐싱 휴리스틱이 매우 효과적으로 작동합니다(특히 write-through caching과 readahead).
우리는 발행과 소비가 데이터 크기에 대해 선형적으로 일관된 성능을 갖는다는 것을 확인했습니다.
그리고 이는 수 테라바이트의 데이터 규모에서도 적용됩니다.

>
In addition we optimize the network access for consumers.
Kafka is a multi-subscriber system and a single message may be consumed multiple times by different consumer applications.
A typical approach to sending bytes from a local file to a remote socket involves the following steps: (1) read data from the storage media to the page cache in an OS, (2) copy data in the page cache to an application buffer, (3) copy application buffer to another kernel buffer, (4) send the kernel buffer to the socket.
This includes 4 data copying and 2 system calls.
On Linux and other Unix operating systems, there exists a sendfile API [5] that can directly transfer bytes from a file channel to a socket channel.
This typically avoids 2 of the copies and 1 system call introduced in steps (2) and (3).
Kafka exploits the sendfile API to efficiently deliver bytes in a log segment file from a broker to a consumer.

또한 우리는 컨슈머를 위한 네트워크 접근을 최적화합니다.
Kafka는 다중 구독자 시스템이며, 하나의 메시지가 각기 다른 컨슈머 애플리케이션에 의해 여러 번 소비될 수 있습니다.
로컬 파일에서 원격 소켓으로 바이트를 전송하는 일반적인 접근 방식은 다음과 같은 단계를 포함합니다.

- (1) 저장 매체에서 OS 페이지 캐시로 데이터를 읽습니다.
- (2) 페이지 캐시의 데이터를 애플리케이션 버퍼로 복사합니다.
- (3) 애플리케이션 버퍼를 다른 커널 버퍼로 복사합니다.
- (4) 커널 버퍼를 소켓으로 전송합니다.

이로 인해 4번의 데이터 복사와 2번의 시스템 호출이 발생합니다.
Linux와 다른 Unix 운영체제에서는 파일 채널에서 소켓 채널로 바이트를 직접 전송할 수 있는 sendfile API가 있습니다.
이것을 사용하면 일반적으로 (2)와 (3) 단계에서 소개된 2개의 복사와 1개의 시스템 호출을 피할 수 있습니다.
Kafka는 sendfile API를 사용하여 브로커에서 컨슈머로 로그 세그먼트 파일의 바이트를 효율적으로 전달합니다.

##### Stateless broker

>
Stateless broker: Unlike most other messaging systems, in Kafka, the information about how much each consumer has consumed is not maintained by the broker, but by the consumer itself.
Such a design reduces a lot of the complexity and the overhead on the broker.
However, this makes it tricky to delete a message, since a broker doesn’t know whether all subscribers have consumed the message.
Kafka solves this problem by using a simple time-based SLA for the retention policy.
A message is automatically deleted if it has been retained in the broker longer than a certain period, typically 7 days.
This solution works well in practice.
Most consumers, including the offline ones, finish consuming either daily, hourly, or in real-time.
The fact that the performance of Kafka doesn’t degrade with a larger data size makes this long retention feasible.

상태 없는 브로커: 대부분의 여타 메시징 시스템들과 달리, Kafka에서는 각 컨슈머가 얼마나 소비했는지에 대한 정보가 브로커가 아니라 컨슈머 자체에 의해 유지됩니다.
이러한 설계로 인해 브로커의 복잡성과 오버헤드가 많이 줄어듭니다.
그러나 이로 인해 모든 구독자가 메시지를 소비했는지를 브로커가 알 수 없으므로, 메시지를 삭제하는 것이 까다로워집니다.

Kafka는 간단한 시간 기반 SLA를 사용하여 보존 정책을 해결합니다.
특정 기간 이상 브로커에 보관된 메시지는 자동으로 삭제됩니다. 이 기간은 일반적으로는 7일 입니다.
이 솔루션은 실제로 잘 작동합니다.
오프라인 컨슈머를 포함한 대부분의 컨슈머는 매일, 매 시간마다, 또는 실시간으로 소비를 완료합니다.
Kafka의 성능이 더 큰 데이터 크기에서도 저하되지 않는다는 사실로 인해, 이러한 긴 보존 기간이 가능해집니다.

>
There is an important side benefit of this design.
A consumer can deliberately rewind back to an old offset and re-consume data.
This violates the common contract of a queue, but proves to be an essential feature for many consumers.
For example, when there is an error in application logic in the consumer, the application can re-play certain messages after the error is fixed.
This is particularly important to ETL data loads into our data warehouse or Hadoop system.
As another example, the consumed data may be flushed to a persistent store only periodically (e.g, a full-text indexer).
If the consumer crashes, the unflushed data is lost.
In this case, the consumer can checkpoint the smallest offset of the unflushed messages and re-consume from that offset when it’s restarted.
We note that rewinding a consumer is much easier to support in the pull model than the push model.

이 설계에는 중요한 부가적인 장점이 있습니다.
컨슈머는 의도적으로 이전의 오프셋으로 되돌아가서 데이터를 다시 소비할 수 있습니다.
이것은 일반적으로는 queue 데이터 구조의 계약을 위반하지만, 많은 컨슈머에게는 필수적인 기능으로 입증된 것입니다.
예를 들어, 컨슈머의 애플리케이션 로직에 오류가 있을 때, 오류가 수정된 후 특정 메시지를 다시 재생할 수 있습니다.
이것은 특히 데이터 웨어하우스나 하둡 시스템으로의 ETL 데이터 로드에 중요합니다.

또 다른 예를 들어 보자면, 소비된 데이터는 주기적으로만 영구 저장소로 플러시될 수 있습니다(예: 전문 검색 인덱서) .
만약 컨슈머가 크래시되면, 플러시되지 않은 데이터는 손실될 것입니다.
이러한 경우에 컨슈머는 플러시되지 않은 메시지의 가장 작은 오프셋을 체크포인트로 남기고, 재시작할 때 그 오프셋부터 다시 소비할 수 있습니다.
우리는 컨슈머를 되돌리는 것이 pull 모델에서는 push 모델보다 훨씬 더 지원하기 쉽다는 점에 착안했습니다.


#### 3.2 Distributed Coordination
#### 3.3 Delivery Guarantees
### 4. Kafka Usage at LinkedIn
### 5. Experimental Results
#### Producer Test
#### Consumer Test
### 6. Conclusion and Future Works
### 7. REFERENCES

## Links

- [Kafka: a Distributed Messaging System for Log Processing (microsoft.com) (PDF)]( https://www.microsoft.com/en-us/research/wp-content/uploads/2017/09/Kafka.pdf )
- [Kafka: a Distributed Messaging System for Log Processing (semanticscholar.org)]( https://www.semanticscholar.org/paper/Kafka-%3A-a-Distributed-Messaging-System-for-Log-Kreps/ea97f112c165e4da1062c30812a41afca4dab628 )
- [Academic References and Papers (kafka.apache.org)]( https://kafka.apache.org/books-and-papers#academic-references-and-papers )

