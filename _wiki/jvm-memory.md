---
layout  : wiki
title   : JVM 메모리 구조와 GC
summary : 작성중인 문서
date    : 2019-08-28 15:52:08 +0900
updated : 2019-09-15 15:06:24 +0900
tag     : java
toc     : true
public  : true
parent  : jvm
latex   : true
---
* TOC
{:toc}

$$
\def\ceil#1{\lceil #1 \rceil}
$$

# 문서를 읽자

이 주제에 대해 공식 문서보다 정확하고 중요한 문서는 없다.

* [JDK 12 Garbage Collection Tuning Guide](https://docs.oracle.com/en/java/javase/12/gctuning/introduction-garbage-collection-tuning.html )
* [JDK 11 Garbage Collection Tuning Guide](https://docs.oracle.com/en/java/javase/11/gctuning/introduction-garbage-collection-tuning.html )
* [JDK 10 Garbage Collection Tuning Guide](https://docs.oracle.com/javase/10/gctuning/introduction-garbage-collection-tuning.htm )
* [JDK 9 Garbage Collection Tuning Guide](https://docs.oracle.com/javase/9/gctuning/introduction-garbage-collection-tuning.htm )
* [JDK 8 Garbage Collection Tuning Guide](https://docs.oracle.com/javase/8/docs/technotes/guides/vm/gctuning/ )

# 요약

요약이 밑에 있으면 읽기 불편하길래 위로 올렸다.

## Generation 구조 요약

요약하자면 다음과 같다.

* 모든 객체가 쓰레기인지 검사하는 무식한 방식의 가비지 컬렉션은 규모가 큰 프로그램에서 심각한 문제가 생길 수 있다.
* JVM GC 설계자들은 경험적으로 대부분의 객체가 생겨나자마자 쓰레기가 된다는 것을 알고 있었다.
    * 이것을 '약한 세대 가설(weak generational hypothesis)'이라 부른다.
* 따라서 매번 전체를 검사하지 않고 일부만 검사할 수 있도록 generational한 구조를 고안해 내었다.
* young generation
    * 객체 대부분이 생성될 때 이곳으로 들어간다.
    * 이곳이 가득차면 minor gc가 발생한다.
    * minor gc가 발생하면 살아있는 객체들만 체크하고 나머지는 다 없애버린다.
    * 살아남은 객체들 중 더 오래 쓸 것 같은 것들은 tenured generation으로 옮긴다.
* tenured generation
    * 이곳이 가득 차면 major gc가 발생한다.
    * major gc는 minor gc보다 더 오래 걸린다.

## GC 종류 요약

### Serial Collector

* 싱글 스레드로 모든 종류의 가비지 컬렉션을 수행한다.
* 싱글 프로세서 시스템에 가장 적합.
    * 멀티 프로세서 하드웨어를 활용할 수 없다.
    * 멀티 프로세서 환경에서도 소형 데이터셋(최대 100MB 정도)을 다루는 애플리케이션이라면 쓸만함.
* 시스템 환경에 따라 선택되거나, `-XX:+UseSerialGC` 옵션으로 선택할 수 있다.
* Young Generation Collection 알고리즘: Serial
* Old Generation Collection 알고리즘: Serial Mark-Sweep-Compact

### Parallel Collector

* 마이너 컬렉션을 병렬로 수행한다.
    * GC의 오버헤드를 현저하게 줄일 수 있다.
* 멀티 프로세서나 멀티 스레드 하드웨어에서 돌아가는 중대형 규모의 데이터셋을 다루는 애플리케이션을 위한 GC.
* 시스템 환경에 따라 선택되거나, `-XX:+UseParallelGC` 옵션으로 선택할 수 있다.
* **Parallel Compaction**
    * Parallel Collector가 메이저 컬렉션을 병렬로 수행하게 해주는 기능.
    * Parallel Compaction을 쓰지 않으면 싱글 스레드만으로 메이저 컬렉션이 작동하게 되므로 확장성이 크게 제한될 수 있다.
    * `-XX:+UseParallelGC` 옵션을 지정하면 Parallel Compaction이 디폴트로 사용된다.
    * `-XX:-UseParallelOldGC` 옵션을 지정하면 Parallel Compaction을 사용하지 않는다.

멀티 스레드를 사용한 컬렉션 사용이 Young 영역에 국한된다는 점에 주의.

* Young Generation Collection 알고리즘: **Parallel** Scavenge
* Old Generation Collection 알고리즘: **Serial** Mark-Sweep-Compact


### Concurrent Collectors

* 전체 처리량보다 응답 시간이 더 중요한 경우에 사용할 것.
    * 프로세서가 GC와 처리 역할을 나누어 일하기 때문에 일시 정지가 짧아진다.
    * 프로세서의 수를 늘릴수록 효과를 볼 수 있지만 한계가 있음.

#### Concurrent Mark Sweep(CMS) Collector

* 가비지 컬렉션 일시 정지가 짧은 것을 선호하는 애플리케이션을 위한 컬렉터. 
* 이 방식은 프로세서 리소스를 가비지 컬렉션과 공유한다.
* heap 메모리 영역의 크기가 클 때 적합하다.
* GC의 일시 정지 시간을 줄이는 것이 목적이며, 크기가 큰 오래된 객체가 있는 경우에 적합하다.
* `-XX:+UseConcMarkSweepGC` 옵션으로 CMS 컬렉터를 켤 수 있다.
* Young Generation Collection 알고리즘: Parallel
* Old Generation Collection 알고리즘: Concurrent Mark-Sweep

**Concurrent Mark-Sweep 알고리즘**

이 방식은 다음의 네 단계를 따른다.[^book2-concurrent-mark-sweep]

1. Initial Mark Phase
    * 애플리케이션 일시 정지.
    * GC에 싱글 스레드를 사용.
        * 애플리케이션의 Root set과 직접적으로 관계가 있는 살아있는 객체만 마크한다.
2. Concurrent Mark Phase
    * GC 스레드는 GC 작업을 하고, Working 스레드는 애플리케이션 작업을 한다.
    * GC에 싱글 스레드를 사용.
        * 바로 전 단계에서 체크한 객체가 바라보고 있는 객체들을 추적해 살아있는지 마크한다.
3. Remark Phase
    * 애플리케이션 일시 정지.
    * GC에 멀티 스레드 사용.
    * 마크한 객체를 다시 추적해, 살아있는지 확인한다.
4. Concurrent Sweep Phase
    * 애플리케이션은 멈추지 않고 작업을 계속한다.
    * GC에 싱글 스레드 사용.
    * Sweep: 살아있는 객체를 제외한 죽은 객체를 모두 삭제한다.
    * compaction(조각 모음)은 하지 않는다.
        * 따라서, Sweep을 하다 보면 단편화가 발생한다.
        * Free List를 사용해 단편화를 최소화한다.

#### Garbage-First Garbage Collector

* G1GC 라고도 부른다.
* 서버 스타일 컬렉터.
* 큰 메모리를 가진 멀티 프로세서 머신을 위한 컬렉터.
* 높은 확률로 일시 정지 시간에 대한 목표와 높은 처리량을 달성할 것이다.
* `-XX:+UseG1GC` 옵션으로 G1 컬렉터를 켤 수 있다.
* Young Generation Collection 알고리즘: Snapshot-At-The-Beginning(SATB)
* Old Generation Collection 알고리즘: Snapshot-At-The-Beginning(SATB)

G1GC만 Generational GC가 아니라는 점에 주의.

"JVM Performance Optimizing 및 성능분석 사례"에 잘 설명되어 있다.[^book2-g1gc]

* G1은 물리적 generation 구분을 없애고, 전체 heap을 1MB 단위의 리전(region)들로 다룬다.
* G1 이라는 이름은 가비지로 가득찬 리전부터 컬렉션을 시작한다는 의미.
    * 가비지로 꽉 찬 리전이 발견되면 바로 컬렉션을 돌린다.
* Old 리전의 살아있는 객체는 다른 Old 리전으로 옮겨지며 compaction이 이뤄진다.
* G1에서 Young, Old 영역 개념은 고정된 개념이 아니다.
    * 객체가 새로 할당되는 리전들의 집합이 Young generation 이다.
    * 프로모션이 일어나는 리전의 집합이 Old Generation 이다.


## GC 선택 가이드라인 요약

**일시 정지 시간 요구 사항이 까다롭지 않다면?**

* 그냥 VM이 알아서 선택하게 놔둔다.
* 필요하다면 heap 사이즈를 조절해본다.

그래도 퍼포먼스가 부족한 것 같다면 아래의 가이드를 따른다.

**애플리케이션이 최대 약 100MB 정도의 작은 데이터셋을 다루는 경우**

* Serial Collector를 선택하면 된다.
    * `-XX:+UseSerialGC` 옵션으로 켜면 됨.

**애플리케이션이 싱글 프로세서에서 돌아가고, 일시 정지 시간에 대한 요구 사항이 없는 경우**

* VM이 알아서 컬렉터를 선택하게 놔둔다.
* VM이 알아서 잘 선택하겠지만 수동으로 선택하고 싶다면 `-XX:+UseSerialGC` 옵션을 켠다.

**애플리케이션의 최고 성능이 가장 중요하고, 일시 정지 시간이 1초 이상이어도 상관없는 경우**

* VM이 알아서 컬렉터를 선택하게 놔둔다.
* VM이 알아서 잘 선택하겠지만 수동으로 선택하고 싶다면 `-XX:+UseParallelGC` 옵션을 켠다.

**응답 시간이 전체 처리량보다 중요하고 일시 정지 시간이 1초 이하여야 하는 경우**

* Concurrent Collector를 사용해 본다.
    * `-XX:+UseConcMarkSweepGC` 옵션이나 `-XX:+UseG1GC` 옵션을 켠다.

**그래도 성능이 부족하다면**

* heap 사이즈와 generation 사이즈를 조절해 볼 것.

**그래도 성능이 부족하다면**

* 컬렉터를 바꿔가면서 테스트해볼 것.
* Concurrent Collector로 일시 정지 시간을 줄여보고, Parallel Collector로 멀티 프로세서 하드웨어의 이점을 살려 전체 처리량을 늘려볼 것.

---

요약은 여기서 끝.

# Garbage?

가비지란 무엇을 말하는 것인가?

Oracle의 Java SE 8 GC 튜닝 가이드[^tuning-guide8]에 매우 심플하게 정의되어 있다.

>
An object is considered garbage when it can no longer be reached from any pointer in the running program.

_실행중인 프로그램의 어느 포인터도 접근할 수 없는 객체는 쓰레기(garbage)로 간주됩니다._


# JVM의 메모리는 Generation 구조를 갖는다

JVM의 메모리는 다음과 같은 형태의 Generation 구조를 갖는다. 그 이유는 무엇일까?

```ascii-art
                    <---- Tenured ---->
+----------+---+---+---------+---------+
|   Eden   | S | S |         | Virtual |
+----------+---+---+---------+---------+
<----- Young ------>

S: Survivor
```

Oracle의 Java SE 8 GC 튜닝 가이드[^tuning-guide8]를 읽어보자.

>
An object is considered garbage when it can no longer be reached from any pointer in the running program. The most straightforward garbage collection algorithms iterate over every reachable object. Any objects left over are considered garbage. The time this approach takes is proportional to the number of live objects, which is prohibitive for large applications maintaining lots of live data.

_가장 간단한 형태의 가비지 컬렉션 알고리즘은 접근 가능한 모든 객체를 순회하는 것입니다. 순회가 끝난 후에 남아있는 객체를 쓰레기로 판단하는 방식입니다. 그런데 이런 방법을 쓰면 살아있는 객체의 수에 비례하는 시간이 소요되므로, 수많은 라이브 데이터를 관리하는 규모가 큰 애플리케이션에서는 절대 사용하면 안됩니다._

>
The virtual machine incorporates a number of different garbage collection algorithms that are combined using generational collection. While naive garbage collection examines every live object in the heap, generational collection exploits several empirically observed properties of most applications to minimize the work required to reclaim unused (garbage) objects. 

_가상 머신은 generational collection으로 다양한 가비지 컬렉션 알고리즘을 통합해 사용합니다. 간단한 형태의 가비지 컬렉션은 heap의 모든 라이브 객체를 검사하지만, generational collection은 경험적으로 파악한 대부분의 애플리케이션들이 공통적으로 갖고 있는 특성들을 활용해 쓰레기 객체를 처리하는 데 필요한 작업량을 최소화합니다._

>
The most important of these observed properties is the weak generational hypothesis, which states that most objects survive for only a short period of time.

_이러한 경험적으로 파악한 특성 중 가장 중요한 것은 '약한 세대 가설'입니다. 이 가설은 객체 대부분이 아주 짧은 시간 동안만 살아남는다는 내용입니다._

이 가설을 뒷받침하기 위한 도표와 이어지는 문단 하나를 건너뛰고 조금 더 읽어보자.

>
To optimize for this scenario, memory is managed in generations (memory pools holding objects of different ages). Garbage collection occurs in each generation when the generation fills up. The vast majority of objects are allocated in a pool dedicated to young objects (the young generation), and most objects die there. When the young generation fills up, it causes a minor collection in which only the young generation is collected; garbage in other generations is not reclaimed. Minor collections can be optimized, assuming that the weak generational hypothesis holds and most objects in the young generation are garbage and can be reclaimed. The costs of such collections are, to the first order, proportional to the number of live objects being collected; a young generation full of dead objects is collected very quickly. Typically, some fraction of the surviving objects from the young generation are moved to the tenured generation during each minor collection. Eventually, the tenured generation will fill up and must be collected, resulting in a major collection, in which the entire heap is collected. Major collections usually last much longer than minor collections because a significantly larger number of objects are involved.

_이 시나리오를 최적화하기 위해, 메모리는 여러 generation 으로 관리됩니다. 각 세대가 꽉 채워질 때 가비지 컬렉션이 발생하는 것입니다. 대부분의 객체는 young generation에서 할당되고 또 그곳에서 죽게 됩니다. young generation이 가득 차면 young generation만을 대상으로 하는 마이너 컬렉션이 발생합니다. 이 때 다른 세대의 가비지는 처리되지 않습니다. 마이너 컬렉션은 '약한 세대 가설'을 전제로 최적화된 것입니다. 컬렉션의 비용은 수집되는 살아있는 객체의 수에 비례하므로, 죽은 객체들로만 가득찬 young generation은 매우 빠르게 수집되기 때문입니다. 일반적으로, young generation에서 살아남은 객체들 중 일부는 각각의 마이너 컬렉션 동안 tenured generation으로 옮겨집니다. 결과적으로 tenured generation은 채워지게 되고, 컬렉션의 대상이 되어, 힙 전체를 수집하는 메이저 컬렉션이 발생하게 됩니다. 메이저 컬렉션은 마이너 컬렉션보다 더 오래 걸리는 편인데, 더 많은 객체가 관련되어 있기 때문입니다._

## 구조 그림 모아보기
### Java SE 8 JVM Tuning Guide의 구조 그림

다음은 오라클의 Java SE 8 JVM GC 튜닝 가이드[^tuning-guide8]에 수록된 Generation들의 나열을 참고해 그린 것이다.
(Parallel Collector와 G1은 제외된 그림이다)

```ascii-art
                    <---- Tenured ---->
+----------+---+---+---------+---------+
|   Eden   | S | S |         | Virtual |
+----------+---+---+---------+---------+
<----- Young ------>

참고) S: Survivor
```

### Java SE 9 ~ 12 JVM Tuning Guide의 구조 그림

다음은 오라클의 Java SE 9 JVM GC 튜닝 가이드[^tuning-guide9]에 수록된 Generation들의 나열을 참고해 그린 것이다.
(Parallel Collector와 G1은 제외된 그림이다)

```ascii-art
                              <------ Old ------>
+----------+---+---+---------+---------+---------+
|   Eden   | S | S | Virtual |         | Virtual |
+----------+---+---+---------+---------+---------+
<--------- Young ------------>
```

참고로 Java SE 9, 10, 11, 12 버전별 튜닝 가이드에 모두 똑같이 실려 있다.

### JVM Performance Optimizing 및 성능분석 사례의 구조 그림

다음은 "JVM Performance Optimizing 및 성능분석 사례"(이하 성능분석 책)에 수록된 그림[1-3]을 참고해 그린 것이다.[^book2-Heap]

```ascii-art
+---------+-----+-----+-------------------+ +------+
| Eden    | S 0 | S 1 |      Tenured      | | Perm |
+---------+-----+-----+-------------------+ +------+
<- Young Generation -> <- Old Generation ->
<---------------- Total Heap Size -------->
```

이 책의 그림은 Permanent 영역도 함께 소개하고 있다.

>Perm 영역은 보통 Class의 Meta 정보나 Method의 Meta 정보, Static 변수와 상수 정보들이 저장되는 공간으로 흔히 메타데이터 저장 영역이라고도 한다. 이 영역은 Java 8 부터는 Native 영역으로 이동하여 Metaspace 영역으로 변경되었다.(다만, 기존 Perm 영역에 존재하던 Static Object는 Heap 영역으로 옮겨져서 GC의 대상이 최대한 될 수 있도록 하였다)

이 책에서는 다음과 같이 Java 7 과 Java 8 버전의 Hotspot JVM 구조도 비교하고 있다.

```ascii-art
Java 7 Hotspot JVM 구조
<---- Java Heap ------> < Permanent Heap > < Native Memory  >
+------+---+---+-------+------------------+--------+--------+
| Eden | S | S |  Old  |     Permanent    | C Heap | Thread |
|      | 0 | 1 |       |                  |        | Stack  |
+------+---+---+-------+------------------+--------+--------+
```

```ascii-art
Java 8 Hotspot JVM 구조
<---- Java Heap ------> <--------- Native Memory ---------->
+------+---+---+-------+------------------+--------+--------+
| Eden | S | S |  Old  |     Metaspace    | C Heap | Thread |
|      | 0 | 1 |       |                  |        | Stack  |
+------+---+---+-------+------------------+--------+--------+

* Java Heap: JVM이 관리하는 영역

* Native Memory: OS에서 관리하는 영역
```

한편, 2. Garbage Collection에서는 다음과 같이 GC 대상 및 범위를 소개한다.

```ascii-art
+------+---+---+------------------+ +--------+
| Eden | S | S |     Tenured      | | Perm   |
|      | 0 | 1 |                  | |        |
+------+---+---+------------------+ +--------+
<- Young Gen -> <--- Old Gen ---->   <------->
    Minor GC         Full GC          Full GC

<-------------- GC 대상 범위 ---------------->
```

# GC의 종류

Java SE 8에서는 다음과 같이 3 가지의 컬렉터를 소개하고 있다.[^collectors8]

>
The serial collector uses a single thread to perform all garbage collection work, which makes it relatively efficient because there is no communication overhead between threads. It is best-suited to single processor machines, because it cannot take advantage of multiprocessor hardware, although it can be useful on multiprocessors for applications with small data sets (up to approximately 100 MB). The serial collector is selected by default on certain hardware and operating system configurations, or can be explicitly enabled with the option -XX:+UseSerialGC.

_시리얼 컬렉터는 싱글 스레드를 사용해서 모든 종류의 가비지 컬렉션 작업을 합니다. 이 방법은 스레드 사이의 커뮤니케이션 오버헤드가 없으므로 상대적으로 효율적입니다. 멀티 프로세서 하드웨어의 장점을 살릴 수 없기 때문에 싱글 프로세서 머신에 최적화된 방법입니다. 작은 데이터셋(최대 100MB 정도)을 쓰는 애플리케이션이라면 멀티 프로세서 환경에서도 쓸만합니다. 시리얼 컬렉터는 하드웨어와 OS 설정에 따라 default로 선택됩니다. `-XX:+UseSerialGC` 옵션을 써서 선택할 수도 있습니다._

>
The parallel collector (also known as the throughput collector) performs minor collections in parallel, which can significantly reduce garbage collection overhead. It is intended for applications with medium-sized to large-sized data sets that are run on multiprocessor or multithreaded hardware. The parallel collector is selected by default on certain hardware and operating system configurations, or can be explicitly enabled with the option -XX:+UseParallelGC.

_패러렐 컬렉터는(스루풋 컬렉터라고도 알려져 있음) 마이너 컬렉션을 병렬로 수행하므로, 가비지 컬렉션 오버헤드를 현저하게 줄일 수 있습니다. 이 방식은 멀티 프로세서나 멀티 스레드 하드웨어에서 돌아가는 중-대형 데이터셋을 다루는 애플리케이션을 위한 것입니다. 패러렐 컬렉터는 하드웨어와 OS 설정에 따라 default로 선택됩니다. 또는 `-XX:+UseParallelGC` 옵션을 써서 선택할 수도 있습니다._

>
Parallel compaction is a feature that enables the parallel collector to perform major collections in parallel. Without parallel compaction, major collections are performed using a single thread, which can significantly limit scalability. Parallel compaction is enabled by default if the option -XX:+UseParallelGC has been specified. The option to turn it off is -XX:-UseParallelOldGC.

_패러렐 컴팩션은 패러렐 컬렉터가 메이저 컬렉션을 병렬로 수행할 수 있도록 해줍니다. 패러렐 컴팩션이 없다면, 메이저 컬렉션이 싱글 스레드로 돌아가게 되어 확장성(scalability)이 크게 제한됩니다. `-XX:+UseParallelGC` 옵션이 켜져 있다면 패러렐 컴팩션도 default로 켜져 있습니다. `-XX:-UseParallelOldGC` 옵션을 쓰면 패러렐 컴팩션을 끌 수 있습니다._

>
The mostly concurrent collector performs most of its work concurrently (for example, while the application is still running) to keep garbage collection pauses short. It is designed for applications with medium-sized to large-sized data sets in which response time is more important than overall throughput because the techniques used to minimize pauses can reduce application performance. The Java HotSpot VM offers a choice between two mostly concurrent collectors; see The Mostly Concurrent Collectors. Use the option -XX:+UseConcMarkSweepGC to enable the CMS collector or -XX:+UseG1GC to enable the G1 collector.

_대부분의 동시(concurrent) 컬렉터는 가비지 컬렉션으로 인한 일시 정지 현상을 짧게 하기 위해 동시에(concurrently) 작업을 수행합니다. 일시 정지 현상을 최소화하기 위해 사용되는 테크닉이 애플리케이션 퍼포먼스를 감소시킬 수 있기 때문에, 동시 컬렉터는 응답 시간이 전체 처리량보다 더 중요한 중대형 규모의 데이터셋을 다루는 애플리케이션을 위해 설계되었습니다. Java HotSpot VM에서는 주로 두 개의 동시 컬렉터 중 하나를 선택할 수 있습니다. 이에 대해서는 [The Mostly Concurrent Collectors][concurrent8] 문서를 참고하세요. `-XX:+UseConcMarkSweepGC` 옵션을 켜면 CMS 컬렉터를 활성화할 수 있고, `-XX:+UseG1GC` 옵션을 켜면 G1 컬렉터를 활성화할 수 있습니다._


## GC 선택 가이드라인

그리고 이 문서 하단에는 컬렉터 선택에 대한 가이드가 있다.[^collectors8]

>
Unless your application has rather strict pause time requirements, first run your application and allow the VM to select a collector. If necessary, adjust the heap size to improve performance. If the performance still does not meet your goals, then use the following guidelines as a starting point for selecting a collector.

_애플리케이션의 일시 정지 시간에 대한 요구 사항이 까다로운 경우가 아니라면, 그냥 일단 애플리케이션을 실행하고 VM이 알아서 컬렉터를 선택하게 하세요. 만약 필요하다면, heap 사이즈를 조절해서 퍼포먼스를 향상시킬 수 있습니다. 그렇게 해도 퍼포먼스 목표치를 달성할 수 없다면, 아래의 가이드라인을 참고해 보세요._

>
If the application has a small data set (up to approximately 100 MB), then select the serial collector with the option -XX:+UseSerialGC.

_애플리케이션이 작은 데이터셋(최대 약 100MB)을 다루는 경우, `-XX:+UseSerialGC` 옵션을 켜서 Serial Collector를 선택하세요._

>
If the application will be run on a single processor and there are no pause time requirements, then let the VM select the collector, or select the serial collector with the option -XX:+UseSerialGC.

_애플리케이션이 싱글 프로세서에서 실행되고, 일시 정지 시간에 대한 요구 사항이 없다면, VM이 알아서 컬렉터를 선택하게 하세요. 아니면 `-XX:+UseSerialGC` 옵션을 켜서 Serial Collector를 선택하세요._

> If (a) peak application performance is the first priority and (b) there are no pause time requirements or pauses of 1 second or longer are acceptable, then let the VM select the collector, or select the parallel collector with -XX:+UseParallelGC.

_만약 애플리케이션의 최고 성능이 최우선 순위이고, 일시 정지 시간에 대한 요구 사항이 없거나 1초 이상의 일시 정지 시간이 허용된다면, VM이 컬렉터를 선택하게 하세요. 아니면 `-XX:+UseParallelGC` 옵션을 켜서 Parallel Collector를 선택하세요._

> If response time is more important than overall throughput and garbage collection pauses must be kept shorter than approximately 1 second, then select the concurrent collector with -XX:+UseConcMarkSweepGC or -XX:+UseG1GC.

_만약 응답 시간이 전체 처리량보다 중요하고 가비지 컬렉션으로 인한 일시 정지가 1초보다 짧아야 한다면, `-XX:+UseConcMarkSweepGC` 옵션이나 `-XX:+UseG1GC` 옵션을 켜서 Concurrent Collector를 선택하세요._

> These guidelines provide only a starting point for selecting a collector because performance is dependent on the size of the heap, the amount of live data maintained by the application, and the number and speed of available processors. Pause times are particularly sensitive to these factors, so the threshold of 1 second mentioned previously is only approximate: the parallel collector will experience pause times longer than 1 second on many data size and hardware combinations; conversely, the concurrent collector may not be able to keep pauses shorter than 1 second on some combinations.

_이 가이드라인은 컬렉터 선택에 대한 시작점을 제공할 뿐입니다. 왜냐하면 성능(performance)은 heap 사이즈와, 애플리케이션이 관리하는 라이브 데이터의 양, 사용 가능한 프로세서들의 속도에 따라 달라지기 때문입니다. 일시 정지 시간은 이러한 요소들에 의해 영향을 받으므로, 위에서 언급한 '1초'라는 기준 시간은 어림값일 뿐입니다. 패러렐 컬렉터를 쓰면 많은 데이터 사이즈와 하드웨어 조합에서 1초 이상의 일시 정지 시간을 경험할 수 있습니다. 한편, 컨커런트 컬렉터는 몇몇 조합에서는 일시 정지 시간을 1초보다 짧게 유지할 수 없습니다._

>
If the recommended collector does not achieve the desired performance, first attempt to adjust the heap and generation sizes to meet the desired goals. If performance is still inadequate, then try a different collector: use the concurrent collector to reduce pause times and use the parallel collector to increase overall throughput on multiprocessor hardware.

_권장한 컬렉터가 필요한 성능을 달성하지 못한다면, 먼저 heap과 generation 사이즈를 조절하세요. 그래도 성능이 부족하다면, 다른 종류의 컬렉터 사용을 시도해 보세요. 컨커런트 컬렉터를 사용해 일시 정지 시간을 줄이고, 패러렐 컬렉터를 사용해 멀티 프로세서 하드웨어의 전체 처리량을 늘려보세요._


## Concurrent 컬렉터

[The Mostly Concurrent Collectors][concurrent8] 문서도 읽어보자.

>
Concurrent Mark Sweep (CMS) Collector: This collector is for applications that prefer shorter garbage collection pauses and can afford to share processor resources with the garbage collection.

_Concurrent Mark Sweep(CMS) Collector: 이 컬렉터는 가비지 컬렉션 일시 정지가 짧은 것을 선호하는 애플리케이션을 위한 것입니다. 이 방식은 프로세서 리소스를 가비지 컬렉션과 공유할 수 있습니다._

>
Garbage-First Garbage Collector: This server-style collector is for multiprocessor machines with large memories. It meets garbage collection pause time goals with high probability while achieving high throughput.

_G1 Garbage Collector: 이 서버 스타일 컬렉터는 큰 메모리를 가진 멀티 프로세서 머신을 위한 것입니다. 높은 확률로 일시 정지 시간에 대한 목표와 높은 처리량을 달성할 것입니다._

## 동시성(Concurrency)의 오버헤드

그 밑에는 다음과 같은 동시성의 오버헤드에 대한 지침이 있다.

>
The mostly concurrent collector trades processor resources (which would otherwise be available to the application) for shorter major collection pause times. The most visible overhead is the use of one or more processors during the concurrent parts of the collection. On an N processor system, the concurrent part of the collection will use K/N of the available processors, where 1<=K<=ceiling{N/4}. (Note that the precise choice of and bounds on K are subject to change.) In addition to the use of processors during concurrent phases, additional overhead is incurred to enable concurrency. Thus while garbage collection pauses are typically much shorter with the concurrent collector, application throughput also tends to be slightly lower than with the other collectors.

_대부분의 동시 컬렉터는 프로세서 자원과 짧은 메이저 컬렉션 일시 정지 시간을 트레이드합니다. 가장 눈에 띄는 오버헤드는 컬렉션의 동시 처리 부분(concurrent parts)에서 하나 이상의 프로세서를 사용하는 것입니다. N 개의 프로세서가 있는 시스템에서, 컬렉션의 동시 처리 부분은 사용 가능한 프로세서들의 $$\frac{K}{N}$$을 사용합니다($$1 \le K \le \ceil{ {N \over 4} }$$이며, K의 선택값이나 범위는 변경될 수 있습니다). 그 외에도 동시성을 사용하기 위한 추가적인 오버헤드가 있습니다. 그러므로 일반적으로 동시 컬렉터에서는 가비지 컬렉션의 일시 정지가 훨씬 짧은 편이지만 애플리케이션의 처리량은 다른 컬렉터보다 낮은 경향이 있습니다._

>
On a machine with more than one processing core, processors are available for application threads during the concurrent part of the collection, so the concurrent garbage collector thread does not "pause" the application. This usually results in shorter pauses, but again fewer processor resources are available to the application and some slowdown should be expected, especially if the application uses all of the processing cores maximally. As N increases, the reduction in processor resources due to concurrent garbage collection becomes smaller, and the benefit from concurrent collection increases. The section Concurrent Mode Failure in Concurrent Mark Sweep (CMS) Collector discusses potential limits to such scaling.

_프로세싱 코어가 둘 이상인 머신에서는 컬렉션의 동시 처리를 작업하는 중에 프로세서를 사용할 수 있으므로, 동시 가비지 컬렉터 스레드는 애플리케이션을 "일시 정지"하지 않습니다. 이러한 이유로 일시 정지 시간은 일반적으로 짧아지지만, 애플리케이션이 사용 가능한 프로세서 리소스는 줄어들게 되며, 특히 애플리케이션이 모든 프로세서 코어를 최대한으로 사용하고 있다면 속도 저하가 발생할 수 있습니다.  프로세서 코어를 늘리면 N이 증가하므로 동시 가비지 컬렉션으로 인한 프로세서 자원의 감소가 줄어들어 동시 컬렉션의 이득이 커집니다. 자세한 내용은 [Concurrent Mark Sweep(CMS) Collector](https://docs.oracle.com/javase/8/docs/technotes/guides/vm/gctuning/cms.html#concurrent_mark_sweep_cms_collector ) 문서의 [Concurrent Mode Failure](https://docs.oracle.com/javase/8/docs/technotes/guides/vm/gctuning/cms.html#concurrent_mode_failure ) 항목에서 이러한 스케일링의 잠재적 한계에 대해 다룹니다._

>
Because at least one processor is used for garbage collection during the concurrent phases, the concurrent collectors do not normally provide any benefit on a uniprocessor (single-core) machine. However, there is a separate mode available for CMS (not G1) that can achieve low pauses on systems with only one or two processors; see Incremental Mode in Concurrent Mark Sweep (CMS) Collector for details. This feature is being deprecated in Java SE 8 and may be removed in a later major release.

_동시 처리 단계 중에는 하나 이상의 프로세서가 가비지 컬렉션에 사용되기 때문에, 동시 컬렉터는 싱글 코어 머신에서는 아무런 장점이 없습니다. 하지만 1~2 프로세서만 있는 시스템에서는 일시 정지 시간을 줄일 수 있는 별도의 CMS 모드를 사용할 수 있습니다. 자세한 내용은 [Concurrent Mark Sweep(CMS) Collector](https://docs.oracle.com/javase/8/docs/technotes/guides/vm/gctuning/cms.html#concurrent_mark_sweep_cms_collector ) 문서의 [Incremental Mode](https://docs.oracle.com/javase/8/docs/technotes/guides/vm/gctuning/cms.html#CJAGIIEJ ) 항목을 참고하세요. 다만 이 기능은 Java SE 8에서 deprecated 되었으며, 이후 메이저 릴리즈에서는 제거될 것입니다._

# Minor GC

## Eden 에서 Survivor 영역으로

* [[java-gc-eden-to-survivor]]

# 참고문헌

* 웹 문서
    * [Java Platform, Standard Edition HotSpot Virtual Machine Garbage Collection Tuning Guide (Java SE 8)][tuning-guide8]
    * [Java Platform, Standard Edition HotSpot Virtual Machine Garbage Collection Tuning Guide (Java SE 9)][tuning-guide9]
    * [Java Platform, Standard Edition HotSpot Virtual Machine Garbage Collection Tuning Guide (Java SE 10)][tuning-guide10]
    * [Java Platform, Standard Edition HotSpot Virtual Machine Garbage Collection Tuning Guide (Java SE 11)][tuning-guide11]
    * [Java Platform, Standard Edition HotSpot Virtual Machine Garbage Collection Tuning Guide (Java SE 12)][tuning-guide12]
* 도서
    * Java Performance Fundamental / 김한도 저 / 엑셈 / 초판 1쇄 2009년 09월 23일
    * JVM Performance Optimizing 및 성능분석 사례 / 류길현, 오명훈, 한승민 저 / 엑셈 / 초판 1쇄 2017년 09월 10일
    * 자바 성능 튜닝 / 스캇 오크스 저 / 최가인 역 / 비제이퍼블릭(BJ퍼블릭) / 초판 1쇄 2016년 03월 29일 / 원서: Java Performance: The Definitive Guide

# 주석

[^tuning-guide8]: [Java SE 8 JVM GC Tuning Guide][tuning-guide8]
[^tuning-guide9]: [Java SE 9 JVM GC Tuning Guide][tuning-guide9]
[^tuning-guide10]: [Java SE 10 JVM GC Tuning Guide][tuning-guide10]
[^tuning-guide11]: [Java SE 11 JVM GC Tuning Guide][tuning-guide11]
[^tuning-guide12]: [Java SE 11 JVM GC Tuning Guide][tuning-guide12]
[^technotes8]: [Java Platform, Standard Edition Tools Reference][technotes8]
[^book2-Heap]: 1, JVM 메모리 구조. 20쪽.
[^book2-concurrent-mark-sweep]: 2, Garbage Collection. 41쪽.
[^book2-g1gc]: 2, Garbage Collection. 49쪽.
[^collectors8]: [Java SE 8 JVM GC Tuning Guide][collectors8]
[^concurrent8]: [Java SE 8 JVM GC Tuning Guide][concurrent8]

[tuning-guide8]: https://docs.oracle.com/javase/8/docs/technotes/guides/vm/gctuning/generations.html
[tuning-guide9]: https://docs.oracle.com/javase/9/gctuning/garbage-collector-implementation.htm
[tuning-guide10]: https://docs.oracle.com/javase/10/gctuning/garbage-collector-implementation.htm
[tuning-guide11]: https://docs.oracle.com/javase/11/gctuning/garbage-collector-implementation.htm
[tuning-guide12]: https://docs.oracle.com/en/java/javase/12/gctuning/garbage-collector-implementation.html
[technotes8]: https://docs.oracle.com/javase/8/docs/technotes/tools/windows/java.html

[collectors8]: https://docs.oracle.com/javase/8/docs/technotes/guides/vm/gctuning/collectors.html
[concurrent8]: https://docs.oracle.com/javase/8/docs/technotes/guides/vm/gctuning/concurrent.html#mostly_concurrent 
