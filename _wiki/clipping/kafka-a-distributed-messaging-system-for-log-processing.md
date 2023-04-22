---
layout  : wiki
title   : Kafka - a Distributed Messaging System for Log Processing
summary : Kafka - 대용량 로그 처리를 위한 분산 메시징 시스템
date    : 2023-04-22 21:16:04 +0900
updated : 2023-04-22 23:01:09 +0900
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
#### 3.1 Efficiency on a Single Partition
##### Simple storage
##### Efficient transfer
##### Stateless broker
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

