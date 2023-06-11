---
layout  : wiki
title   : MapReduce - Simplified Data Processing on Large Clusters
summary : 
date    : 2023-06-07 22:35:44 +0900
updated : 2023-06-11 22:46:53 +0900
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
jeff @ google.com, sanjay @ google.com
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

>
Consider the problem of counting the number of occurrences of each word in a large collection of documents.
The user would write code similar to the following pseudo-code:

대량의 문서 컬렉션에서 각 단어의 수를 세는 문제를 생각해 보세요.
사용자는 다음과 유사한 의사 코드를 작성할 것입니다.

```
map(String key, String value):
  // key: document name
  // value: document contents
  for each word w in value:
    EmitIntermediate(w, "1");

reduce(String key, Iterator values):
  // key: a word
  // values: a list of counts
  int result = 0;
  for each v in values:
    result += ParseInt(v);
  Emit(AsString(result));
```

>
The `map` function emits each word plus an associated count of occurrences (just ‘1’ in this simple example).
The `reduce` function sums together all counts emitted for a particular word.

`map` 함수는 각 단어에 대해 발생 횟수(여기에서는 그냥 1)를 출력합니다.
`reduce` 함수는 특정 단어의 발생 횟수를 모두 더합니다.

>
In addition, the user writes code to fill in a mapreduce specification object with the names of the input and output files, and optional tuning parameters.
The user then invokes the MapReduce function, passing it the specification object.
The user’s code is linked together with the MapReduce library (implemented in C++).
Appendix A contains the full program text for this example.

또한, 사용자는 입출력 파일의 이름과 선택적인 튜닝 파라미터를 mapreduce 스펙 객체에 설정하는 코드를 작성합니다.
그리고 나서 사용자는 MapReduce 함수에 스펙 객체를 전달하고 호출합니다.
사용자의 코드는 (C++로 구현된) MapReduce 라이브러리와 함께 링크됩니다.
부록 A에는 이 예제의 전체 프로그램 텍스트가 포함되어 있습니다.

#### 2.2 Types

타입

>
Even though the previous pseudo-code is written in terms of string inputs and outputs, conceptually the map and reduce functions supplied by the user have associated types:
>
> ```
> map    (k1,v1)       → list(k2,v2)
> reduce (k2,list(v2)) → list(v2)
> ```
>
I.e., the input keys and values are drawn from a different domain than the output keys and values.
Furthermore, the intermediate keys and values are from the same domain as the output keys and values.
>
Our C++ implementation passes strings to and from the user-defined functions and leaves it to the user code to convert between strings and appropriate types.

이전의 의사 코드는 문자열 입력과 출력에 대한 것이었지만, 사용자가 제공하는 map과 reduce 함수는 개념적으로 다음과 같은 타입을 가지고 있습니다.

다시 말해, 입력 키/값은 출력 키/값과 다른 도메인에서 추출됩니다.
또한, 중간 키/값은 출력 키/값과 같은 도메인에서 가져옵니다.

우리의 C++ 구현은 문자열을 사용자 정의 함수에 전달하고, 문자열과 적절한 타입 사이의 변환은 사용자 코드에 맡깁니다.

#### 2.3 More Examples

더 많은 예제

>
Here are a few simple examples of interesting programs that can be easily expressed as MapReduce computations.

다음은 MapReduce 계산으로 쉽게 표현할 수 있는 몇 가지 흥미로운 프로그램들의 간단한 예제입니다.

>
**Distributed Grep:**
The map function emits a line if it matches a supplied pattern.
The reduce function is an identity function that just copies the supplied intermediate data to the output.

**분산 Grep:**
map 함수는 주어진 패턴과 일치하는 경우에만 행을 출력합니다.
reduce 함수는 입력된 중간 데이터를 출력으로 복사하는 것만 하는 identity 함수입니다.

>
**Count of URL Access Frequency:**
The map function processes logs of web page requests and outputs ⟨URL, 1⟩.
The reduce function adds together all values for the same URL and emits a ⟨URL, total count⟩ pair.

**URL 엑세스 빈도 카운트:**
map 함수는 웹 페이지 요청 로그를 처리하고 `⟨URL, 1⟩`을 출력합니다.
reduce 함수는 동일한 URL에 대한 모든 값을 더하고 `⟨URL, 총 카운트⟩` 쌍을 출력합니다.


>
**Reverse Web-Link Graph:**
The map function outputs ⟨target, source⟩ pairs for each link to a target URL found in a page named source.
The reduce function concatenates the list of all source URLs associated with a given target URL and emits the pair:
⟨target, list(source)⟩

**역방향 Web-Link 그래프:**
map 함수는 source라는 이름의 페이지에서 찾은 target URL에 대한 각 링크에 대해 `⟨target, source⟩` 쌍을 출력합니다.
reduce 함수는 지정된 대상 URL과 연결된 모든 소스 URL 목록을 연결하고 해당 쌍 `⟨target, list(source)⟩`를 출력합니다.

>
**Term-Vector per Host:**
A term vector summarizes the most important words that occur in a document or a set of documents as a list of ⟨word, f requency⟩ pairs.
The map function emits a ⟨hostname, term vector⟩ pair for each input document (where the hostname is extracted from the URL of the document).
The reduce function is passed all per-document term vectors for a given host.
It adds these term vectors together, throwing away infrequent terms, and then emits a final ⟨hostname, term vector⟩ pair.

**호스트별 Term-Vector:**
Term-Vector는 문서나 문서 집합에서 가장 중요한 단어를 `⟨word, f requency⟩` 쌍의 리스트로 요약합니다.
map 함수는 각 입력 문서에 대해 `⟨hostname, term vector⟩` 쌍을 출력합니다(호스트 이름은 문서의 URL에서 추출됩니다).
reduce 함수는 주어진 호스트에 대한 모든 문서별 term vector를 전달받습니다.
이 term vector를 모두 더하고, 빈번하지 않은 단어를 버린 다음 최종 `⟨hostname, term vector⟩` 쌍을 출력합니다.

>
**Inverted Index:**
The map function parses each document, and emits a sequence of ⟨word, document ID⟩ pairs.
The reduce function accepts all pairs for a given word, sorts the corresponding document IDs and emits a ⟨word,list(document ID)⟩pair.
The set of all output pairs forms a simple inverted index.
It is easy to augment this computation to keep track of word positions.

**역순 인덱스:**
map 함수는 각 문서를 구문 분석하고 `⟨word, document ID⟩` 쌍의 시퀀스를 출력합니다.
reduce 함수는 주어진 단어에 대한 모든 쌍을 받아서 해당 문서 ID를 정렬하고 `⟨word,list(document ID)⟩` 쌍을 출력합니다.
모든 출력 쌍의 집합은 간단한 역순 인덱스를 형성합니다.
이 계산을 단어 위치를 추적하는 것으로 쉽게 확장할 수 있습니다.

>
**Distributed Sort:**
The map function extracts the key from each record, and emits a ⟨key, record⟩ pair.
The reduce function emits all pairs unchanged.
This computation depends on the partitioning facilities described in Section 4.1 and the ordering properties described in Section 4.2.

**분산 정렬:**
map 함수는 각 레코드에서 키를 추출하고 `⟨key, record⟩` 쌍을 출력합니다.
reduce 함수는 모든 쌍을 변경하지 않고 출력합니다.
이 계산은 4.1절에서 설명하는 파티션 기능과 4.2절에서 설명하는 정렬 속성에 따라 달라집니다.

### 3 Implementation

구현

>
Many different implementations of the MapReduce interface are possible.
The right choice depends on the environment.
For example, one implementation may be suitable for a small shared-memory machine, another for a large NUMA multi-processor, and yet another for an even larger collection of networked machines.

MapReduce 인터페이스는 다양한 구현이 가능합니다.
환경에 따라 올바른 선택이 달라질 수 있습니다.
예를 들어, 어떤 구현은 소규모의 공유 메모리를 갖는 머신에 적합할 수 있고, 어떤 구현은 대규모의 NUMA 멀티 프로세서에 적합할 수도 있고, 어떤 구현은 훨씬 더 큰 네트워크 머신 집합에 적합할 수 있습니다.

>
This section describes an implementation targeted to the computing environment in wide use at Google: large clusters of commodity PCs connected together with switched Ethernet [4].
In our environment:
>
- (1) Machines are typically dual-processor x86 processors running Linux, with 2-4 GB of memory per machine.
- (2) Commodity networking hardware is used – typically either 100 megabits/second or 1 gigabit/second at the machine level, but averaging considerably less in overall bisection bandwidth.
- (3) A cluster consists of hundreds or thousands of machines, and therefore machine failures are common.
- (4) Storage is provided by inexpensive IDE disks attached directly to individual machines. A distributed file system [8] developed in-house is used to manage the data stored on these disks. The file system uses replication to provide availability and reliability on top of unreliable hardware.
- (5) Users submit jobs to a scheduling system. Each job consists of a set of tasks, and is mapped by the scheduler to a set of available machines within a cluster.

이 섹션에서는 Google에서 널리 사용되는 컴퓨팅 환경, 즉 스위치 이더넷[4]으로 연결된 표준형 PC로 이루어진 대규모 클러스터를 대상으로 하는 구현에 대해 설명합니다.
우리의 환경에서는,

- (1) 머신은 일반적으로 Linux를 실행하는 듀얼 프로세서 x86 프로세서이며 머신당 2~4GB의 메모리가 있습니다.
- (2) 표준 네트워킹 하드웨어가 사용됩니다. 일반적으로 머신 수준에서 100 megabits/sec 또는 1 gigabit/sec 이지만 평균적으로 전체 구간 대역폭은 이보다 훨씬 낮습니다.
- (3) 클러스터는 수백~수천대의 머신으로 구성되므로 머신 장애가 자주 발생합니다.
- (4) 스토리지는 개별 머신에 직접 연결된 저렴한 IDE 디스크로 제공됩니다. 내부에서 개발된 분산 파일 시스템[8]은 이러한 디스크에 저장된 데이터를 관리하는 데 사용됩니다. 파일 시스템은 불안정한 하드웨어 위에 가용성과 신뢰성을 제공하기 위해 복제(replication)를 사용합니다.
- (5) 사용자는 스케줄링 시스템에 작업을 제출합니다. 각 작업은 일련의 태스크로 구성되며, 스케줄러에 의해 클러스터 내의 사용 가능한 머신 집합으로 매핑됩니다.

#### 3.1 Excution Overview

실행 개요

