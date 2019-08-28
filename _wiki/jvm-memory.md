---
layout  : wiki
title   : JVM 메모리 구조와 GC
summary :
date    : 2019-08-28 15:52:08 +0900
updated : 2019-08-29 00:17:57 +0900
tag     : java
toc     : true
public  : true
parent  : Java
latex   : false
---
* TOC
{:toc}

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

## Generation 구조 공식 문서 요약

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

## Java SE 8 JVM Tuning Guide의 구조 그림

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

## Java SE 9 ~ 12 JVM Tuning Guide의 구조 그림

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

## JVM Performance Optimizing 및 성능분석 사례의 구조 그림

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

# Minor GC

## Eden 에서 Survivor 영역으로

현재 절판된 책 Java Performance Fundamental에는 Minor GC 과정에 대한 상세한 설명이 있다.

다음 과정을 따라가며 이해하자.

```ascii-art
Eden
+---------------------------+
| ( ) (  ) (   ) ( ) (    ) |
+---------------------------+

Survivor 0              Survivor 1
+-------------------+   +-----------------+
| ( ) (   ) ( ) ( ) |   |                 |
+-------------------+   +-----------------+
```

* Eden과 Survivor 0 이 꽉 찬 상태이다.
* Eden이 꽉 찼으므로 Minor GC가 발생한다.
* JVM이 Suspend 상태(Stop-the-world)로 들어간다.
* 쓰레기와 쓰레기 아닌 것을 구분해야 하므로, Mark 작업을 시작한다.

```ascii-art
Eden
+---------------------------+
| ( ) (  ) ( A ) ( ) (    ) |
+---------------------------+

Survivor 0              Survivor 1
+-------------------+   +-----------------+
| ( ) ( B ) (C) ( ) |   |                 |
+-------------------+   +-----------------+
```

* Mark 작업을 끝낸 결과, A, B, C가 쓰레기가 아니라는 표시를 달게 되었다.

```ascii-art
Eden
+---------------------------+
| ( ) (  ) ( A ) ( ) (    ) |
+---------------------------+

Survivor 0              Survivor 1
+-------------------+   +-----------------+
| ( ) ( B ) (C) ( ) |   | ( A ) ( B ) (C) |
+-------------------+   +-----------------+
```

* Survivor 0 도 꽉 차 있어서 A가 Survivor 0 으로는 들어갈 수 없으므로, A, B, C를 Survivor 1 영역으로 복사했다.

```ascii-art
Eden
+---------------------------+
|                           |
+---------------------------+

Survivor 0              Survivor 1
+-------------------+   +-----------------+
|                   |   | ( A ) ( B ) (C) |
+-------------------+   +-----------------+
```

* Eden과 Survivor 0 을 깨끗하게 비워버린다.
* JVM의 Suspend 상태가 해제된다.

## Survivor 에서 Old 영역으로 Promotion

```ascii-art
Eden
+---------------------------+
| ( ) (  ) (   ) (A) (    ) |
+---------------------------+

Survivor 0              Survivor 1
+-------------------+   +-------------------+
|                   |   | ( ) (   ) (B) (M) |
+-------------------+   +-------------------+

Old
+-------------------------------------------+
| (   ) (    )                              |
+-------------------------------------------+
```

* Mark 작업을 마친 후 위와 같은 상태가 되었다고 하자.
* M을 여러 차례의 GC 에서 살아남은 나이가 많은 객체라 하자.

```ascii-art
Eden
+---------------------------+
| ( ) (  ) (   ) (A) (    ) |
+---------------------------+

Survivor 0              Survivor 1
+-------------------+   +-------------------+
| (A) (B)           |   | ( ) (   ) (B) (M) |
+-------------------+   +-------------------+

Old
+-------------------------------------------+
| (   ) (    ) (M)                          |
+-------------------------------------------+
```

* Survivor 0 에 A, B가 복사되었다.
* Old 영역에 M이 복사되었다. Promotion 된 것이다.
    * Minor GC에서 살아남아 Survivor로 이동할 때마다 객체의 Age 가 증가하는데, 이 Age가 일정 이상이 되면 Old 영역으로 이동하게 된다.
* Promotion의 기준이 되는 Age는 `-XX:MaxTenuringThreshold` 옵션으로 설정할 수 있다.
    * Java SE 8 에서의 default 값은 15 이다. 설정 가능한 범위는 0 ~ 15.[^technotes8]

```ascii-art
Eden
+---------------------------+
|                           |
+---------------------------+

Survivor 0              Survivor 1
+-------------------+   +-------------------+
| (A) (B)           |   |                   |
+-------------------+   +-------------------+

Old
+-------------------------------------------+
| (   ) (    ) (M)                          |
+-------------------------------------------+
```

* Eden과 Survivor 1 이 깨끗하게 비워진다.

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

# 주석

[^tuning-guide8]: [Java SE 8 JVM GC Tuning Guide][tuning-guide8]
[^tuning-guide9]: [Java SE 9 JVM GC Tuning Guide][tuning-guide9]
[^tuning-guide10]: [Java SE 10 JVM GC Tuning Guide][tuning-guide10]
[^tuning-guide11]: [Java SE 11 JVM GC Tuning Guide][tuning-guide11]
[^tuning-guide12]: [Java SE 11 JVM GC Tuning Guide][tuning-guide12]
[^technotes8]: [Java Platform, Standard Edition Tools Reference][technotes8]
[^book2-Heap]: 1, JVM 메모리 구조. 20쪽.


[tuning-guide8]: https://docs.oracle.com/javase/8/docs/technotes/guides/vm/gctuning/generations.html
[tuning-guide9]: https://docs.oracle.com/javase/9/gctuning/garbage-collector-implementation.htm
[tuning-guide10]: https://docs.oracle.com/javase/10/gctuning/garbage-collector-implementation.htm
[tuning-guide11]: https://docs.oracle.com/javase/11/gctuning/garbage-collector-implementation.htm
[tuning-guide12]: https://docs.oracle.com/en/java/javase/12/gctuning/garbage-collector-implementation.html
[technotes8]: https://docs.oracle.com/javase/8/docs/technotes/tools/windows/java.html
