---
layout  : wiki
title   : MapReduce - Simplified Data Processing on Large Clusters
summary : 
date    : 2023-06-07 22:35:44 +0900
updated : 2023-06-07 22:53:12 +0900
tag     : 
resource: CA/CDB27E-8CD8-4A10-A135-9B772E2B2752
toc     : true
public  : true
parent  : [[/clipping]]
latex   : false
---
* TOC
{:toc}

## 번역

### Abstract

초록

>
MapReduce is a programming model and an associated implementation for processing and generating large data sets.
Users specify a map function that processes a key/value pair to generate a set of intermediate key/value pairs, and a reduce function that merges all intermediate values associated with the same intermediate key.
Many real world tasks are expressible in this model, as shown in the paper.

MapReduce는 대규모 데이터 세트를 처리하고 생성하기 위한 프로그래밍 모델과 그에 대한 구현체입니다.
사용자는 키/값 쌍을 처리하여 중간 키/값 쌍의 집합을 생성하는 map 함수와, 동일한 중간 키에 연관된 모든 중간 값들을 병합하는 reduce 함수를 지정합니다.
이 논문에서는 이 모델로 표현할 수 있는 많은 실제적인 작업들을 보여줍니다.

>
Programs written in this functional style are automatically parallelized and executed on a large cluster of commodity machines.
The run-time system takes care of the details of partitioning the input data, scheduling the program’s execution across a set of machines, handling machine failures, and managing the required inter-machine communication.
This allows programmers without any experience with parallel and distributed systems to easily utilize the resources of a large distributed system.

이런 식의 함수형 스타일로 작성된 프로그램은 자동으로 병렬화되어, 대규모의 일반적인 머신들로 구성된 클러스터에서 실행됩니다.
런타임 시스템은 입력 데이터를 분할하고, 여러 머신에 걸쳐 프로그램 실행을 스케쥴링하고, 머신의 실패를 처리하고, 필수적인 머신 간의 통신을 관리하는 세부 사항들을 처리합니다.
이를 통해 병렬 및 분산 시스템에 대한 경험이 전혀 없는 프로그래머들도 쉽게 대규모 분산 시스템 자원을 활용할 수 있습니다.

>
Our implementation of MapReduce runs on a large cluster of commodity machines and is highly scalable: a typical MapReduce computation processes many terabytes of data on thousands of machines.
Programmers find the system easy to use: hundreds of MapReduce programs have been implemented and upwards of one thousand MapReduce jobs are executed on Google’s clusters every day.

우리의 MapReduce 구현체는 대규모의 일반적인 머신들로 구성된 클러스터에서 실행되며, 매우 확장성이 높습니다: 일반적인 MapReduce 계산은 수천 대의 머신 위에서 수 테라바이트의 데이터를 처리합니다.
프로그래머들은 이 시스템을 쉽게 사용할 수 있습니다: 수백 개의 MapReduce 프로그램이 이미 구현되었으며, 하루에 1,000개가 넘는 MapReduce 작업이 Google의 클러스터에서 실행되고 있습니다.

### 1 Introduction

서론
