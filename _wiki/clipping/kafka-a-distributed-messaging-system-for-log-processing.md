---
layout  : wiki
title   : Kafka - a Distributed Messaging System for Log Processing
summary : Kafka - 대용량 로그 처리를 위한 분산 메시징 시스템
date    : 2023-04-22 21:16:04 +0900
updated : 2023-04-22 22:25:44 +0900
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

>
Permission to make digital or hard copies of all or part of this work for personal or classroom use is granted without fee provided that copies are not made or distributed for profit or commercial advantage and that copies bear this notice and the full citation on the first page.
To copy otherwise, or republish, to post on servers or to redistribute to lists, requires prior specific permission and/or a fee.
NetDB'11, Jun. 12, 2011, Athens, Greece.
Copyright 2011 ACM 978-1-4503-0652-2/11/06…$10.00.

이 작업물의 전부 또는 일부를 개인 또는 교실에서 사용하기 위해 디지털 또는 인쇄 복사본을 만드는 것은 이 복사본이 이익이나 상업적 이점을 위해 만들어지거나 배포되지 않으며, 이 공지와 첫 페이지에 전체 인용이 포함된 경우 비용 없이 허용됩니다. 다른 용도로 복사하거나 재게시, 서버에 게시하거나 목록으로 재배포하려면 사전 구체적인 허가 및/또는 수수료가 필요합니다.

NetDB'11, 2011년 6월 12일, 그리스 아테네.

저작권 2011 ACM 978-1-4503-0652-2/11/06…$10.00.

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

