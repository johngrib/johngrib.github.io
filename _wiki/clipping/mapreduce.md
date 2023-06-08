---
layout  : wiki
title   : MapReduce - Simplified Data Processing on Large Clusters
summary : 
date    : 2023-06-07 22:35:44 +0900
updated : 2023-06-08 22:33:05 +0900
tag     : 
resource: CA/CDB27E-8CD8-4A10-A135-9B772E2B2752
toc     : true
public  : true
parent  : [[/clipping]]
latex   : false
---
* TOC
{:toc}

- Jeff Dean과 Sanjay Ghemawat의 2004년 논문.

## 번역

>
Jeffrey Dean and Sanjay Ghemawat
>
jeff@google.com, sanjay@google.com
>
Google, Inc.

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

이런 식의 함수형 스타일로 작성된 프로그램은 자동으로 병렬화되어, 대규모의 표준 사양의 머신들로 구성된 클러스터에서 실행됩니다.
런타임 시스템은 입력 데이터를 분할하고, 여러 머신에 걸쳐 프로그램 실행을 스케쥴링하고, 머신의 실패를 처리하고, 필수적인 머신 간의 통신을 관리하는 세부 사항들을 처리합니다.
이를 통해 병렬 및 분산 시스템에 대한 경험이 전혀 없는 프로그래머들도 쉽게 대규모 분산 시스템 자원을 활용할 수 있습니다.

>
Our implementation of MapReduce runs on a large cluster of commodity machines and is highly scalable: a typical MapReduce computation processes many terabytes of data on thousands of machines.
Programmers find the system easy to use: hundreds of MapReduce programs have been implemented and upwards of one thousand MapReduce jobs are executed on Google’s clusters every day.

우리의 MapReduce 구현체는 대규모의 표준화된 머신들로 구성된 클러스터에서 실행되며, 매우 확장성이 높습니다: 일반적인 MapReduce 계산은 수천 대의 머신 위에서 수 테라바이트의 데이터를 처리합니다.
프로그래머들은 이 시스템을 쉽게 사용할 수 있습니다: 수백 개의 MapReduce 프로그램이 이미 구현되었으며, 하루에 1,000개가 넘는 MapReduce 작업이 Google의 클러스터에서 실행되고 있습니다.

### 1 Introduction

서론

>
Over the past five years, the authors and many others at Google have implemented hundreds of special-purpose computations that process large amounts of raw data, such as crawled documents, web request logs, etc., to compute various kinds of derived data, such as inverted indices, various representations of the graph structure of web documents, summaries of the number of pages crawled per host, the set of most frequent queries in a given day, etc.
Most such computations are conceptually straightforward.
However, the input data is usually large and the computations have to be distributed across hundreds or thousands of machines in order to finish in a reasonable amount of time.
The issues of how to parallelize the computation, distribute the data, and handle failures conspire to obscure the original simple computation with large amounts of complex code to deal with these issues.

최근 5년간 저자를 비롯한 Google의 많은 직원들은, 크롤링된 문서, 웹 리퀘스트 로그와 같은 대량의 원시 데이터를 처리하는 수백 개의 특수 목적 계산을 구현하여, 역방향 인덱스, 웹 문서의 그래프 구조 표현, 호스트에서 가장 빈번하게 크롤링되는 페이지의 수 요약, 특정한 날에 가장 빈도 높은 쿼리의 집합과 같은 다양한 종류의 파생 데이터를 계산해왔습니다.

이런 계산들은 대부분 개념상으로는 간단하지만, 일반적으로 입력 데이터가 매우 큰 규모이기 때문에 합리적인 시간 내에 계산을 완료하려면 수백에서 수천 대의 머신에 작업을 분산해야 합니다.
계산을 병렬화하고, 데이터를 분산하고, 장애를 처리하는 문제들 때문에 원래는 간단한 계산이 복잡한 코드에 가려지게 되는 것입니다.

>
As a reaction to this complexity, we designed a new abstraction that allows us to express the simple computations we were trying to perform but hides the messy details of parallelization, fault-tolerance, data distribution and load balancing in a library.
Our abstraction is inspired by the map and reduce primitives present in Lisp and many other functional languages.
We realized that most of our computations involved applying a map operation to each logical “record” in our input in order to compute a set of intermediate key/value pairs, and then applying a reduce operation to all the values that shared the same key, in order to combine the derived data appropriately.
Our use of a functional model with user-specified map and reduce operations allows us to parallelize large computations easily and to use re-execution as the primary mechanism for fault tolerance.

이러한 복잡성에 대응하기 위한 대책으로 우리는 새로운 추상화 기법을 설계했습니다.
이 기법은 수행하려고 하는 간단한 계산을 표현하면서도 그와 동시에 라이브러리에서 병렬화, 내결함성, 데이터 분산, 로드 밸런싱과 같은 복잡한 세부 구현을 숨길 수 있습니다.

우리의 추상화 기법은 Lisp과 그 외의 함수형 언어들에서 사용하는 기본적인 연산인 map과 reduce에서 영감을 얻었습니다.

우리는 대부분의 계산이 입력의 각 논리적인 "레코드"에 map 연산을 적용하여 중간 키/값 쌍의 집합을 계산한 다음, 같은 키를 공유하는 모든 값에 reduce 연산을 적용하여 파생 데이터를 적절하게 결합하는 작업이라는 것을 깨달았습니다.
사용자가 지정한 map과 reduce 연산을 사용하는 함수형 모델을 사용하면, 대규모 계산을 쉽게 병렬화할 수 있고, 주요한 장애 대책 메커니즘으로는 재실행(re-execution)을 사용할 수 있게 됩니다.

>
The major contributions of this work are a simple and powerful interface that enables automatic parallelization and distribution of large-scale computations, combined with an implementation of this interface that achieves high performance on large clusters of commodity PCs.

이 작업을 통해 이루어낸 주요한 기여는, 대규모 계산의 자동 병렬화와 분산을 가능하게 하는 간단하고 강력한 인터페이스와, 이 인터페이스의 구현을 통해 표준 사양의 PC들로 구성된 대규모 클러스터에서 높은 성능을 달성했다는 점입니다.

>
Section 2 describes the basic programming model and gives several examples.
Section 3 describes an implementation of the MapReduce interface tailored towards our cluster-based computing environment.
Section 4 describes several refinements of the programming model that we have found useful.
Section 5 has performance measurements of our implementation for a variety of tasks.
Section 6 explores the use of MapReduce within Google including our experiences in using it as the basis for a rewrite of our production indexing system.
Section 7 discusses related and future work.

섹션 2에서는 기본적인 프로그래밍 모델을 설명하고, 몇 가지 예제를 보여줍니다.
섹션 3에서는 우리의 클러스터 기반 컴퓨팅 환경에 맞춰 설계된 MapReduce 인터페이스의 구현에 대해 설명합니다.
섹션 4에서는 우리가 유용하게 사용한 프로그래밍 모델의 몇 가지 개선 사항을 설명합니다.
섹션 5에서는 다양한 작업에 대한 우리의 구현의 성능 측정 결과를 보여줍니다.
섹션 6에서는 우리가 Google 내에서 MapReduce를 사용한 경험을 포함하여, MapReduce를 프로덕션 인덱싱 시스템을 재작성하는 토대로 사용한 경험에 대해 설명합니다.
섹션 7에서는 관련된 연구와 앞으로의 작업 방향에 대해 논의합니다.

### 2 Programming Model

프로그래밍 모델

>
The computation takes a set of input key/value pairs, and produces a set of output key/value pairs.
The user of the MapReduce library expresses the computation as two functions: Map and Reduce.

계산은 입력 키/값 쌍의 집합을 가져와서, 출력 키/값 쌍의 집합을 생성합니다.
MapReduce 라이브러리의 사용자는 Map과 Reduce라는 두 개의 함수로 계산을 표현합니다.

>
Map, written by the user, takes an input pair and produces a set of intermediate key/value pairs.
The MapReduce library groups together all intermediate values associated with the same intermediate key I and passes them to the Reduce function.

사용자가 작성한 Map은 입력 쌍을 받아서 중간 키/값 쌍의 집합을 생성합니다.
MapReduce 라이브러리는 같은 중간 키 I와 연관된 모든 중간 값들을 묶어서 Reduce 함수에 전달합니다.

>
The Reduce function, also written by the user, accepts an intermediate key I and a set of values for that key.
It merges together these values to form a possibly smaller set of values.
Typically just zero or one output value is produced per Reduce invocation.
The intermediate values are supplied to the user’s reduce function via an iterator.
This allows us to handle lists of values that are too large to fit in memory.

사용자가 작성한 Reduce 함수는 중간 키 I와 그 키에 대한 값들의 집합을 받습니다.
이 함수는 이런 값들을 병합하여 더 작은 값들의 집합을 형성합니다.
Reduce 호출은 일반적으로 0개 또는 1개의 출력 값을 생성합니다.
중간 값은 반복자(iterator)를 통해 사용자의 reduce 함수에 제공됩니다.
이 방법을 통해 메모리에 저장하기에 너무 큰 값들의 목록을 처리할 수 있습니다.

#### 2.1 Example

예제
