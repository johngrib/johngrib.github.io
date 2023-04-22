---
layout  : wiki
title   : Kafka - a Distributed Messaging System for Log Processing
summary : Kafka - 대용량 로그 처리를 위한 분산 메시징 시스템
date    : 2023-04-22 21:16:04 +0900
updated : 2023-04-22 21:41:05 +0900
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

