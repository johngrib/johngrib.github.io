---
layout  : wiki
title   : Java HotSpot VM G1GC
summary : Java9 ~ 12 디폴트 GC
date    : 2019-09-16 14:36:19 +0900
updated : 2019-09-17 13:20:43 +0900
tag     : java gc
toc     : true
public  : true
parent  : Java
latex   : true
---
* TOC
{:toc}

* 이 글은 Oracle의 "HotSpot Virtual Machine Garbage Collection Tuning Guide"의 Java 8 버전부터 12 버전까지의 문서를 읽고 정리한 문서이다.
* 이 문서에서는 원본 문서의 이름을 "HTG"로 줄여 부르기로 한다. **H**otSpot Virtual Machine Garbage Collection **T**uning **G**uide.
    * HTG-08, HTG-12는 각각 Java 8 버전의 HTG와 Java 12 버전의 HTG를 말한다.

> [HTG-12](https://docs.oracle.com/en/java/javase/12/gctuning/garbage-first-garbage-collector.html#GUID-ED3AB6D3-FD9B-4447-9EDF-983ED2F7A573 ), [HTG-11](https://docs.oracle.com/en/java/javase/11/gctuning/garbage-first-garbage-collector.html#GUID-ED3AB6D3-FD9B-4447-9EDF-983ED2F7A573 ), [HTG-10](https://docs.oracle.com/javase/10/gctuning/garbage-first-garbage-collector.htm#JSGCT-GUID-ED3AB6D3-FD9B-4447-9EDF-983ED2F7A573 ), [HTG-09](https://docs.oracle.com/javase/9/gctuning/garbage-first-garbage-collector.htm#JSGCT-GUID-ED3AB6D3-FD9B-4447-9EDF-983ED2F7A573 ), [HTC-08](https://docs.oracle.com/javase/8/docs/technotes/guides/vm/gctuning/g1_gc.html )

# G1GC

G1GC: Garbage First Garbage Collecor

* G1은 이름을 보면 짐작할 수 있듯, 쓰레기로 가득찬 heap 영역을 집중적으로 수집한다.
* G1은 큰 메모리를 가진 멀티 프로세서 시스템에서 사용하기 위해 개발된 GC이다.
* GC 일시 정지 시간을 최소화하면서, 따로 설정을 하지 않아도 가능한 한 처리량(throughput)도 확보하는 것이  G1GC의 목표이다.
* G1은 Java 9부터 디폴트 GC이다.
* G1은 실시간(real time) GC가 아니다. 일시 정지 시간을 최소화하긴 하지만 완전히 없애지는 못한다.
* G1은 통계를 계산해가면서 GC 작업량을 조절한다.

다음 상황이라면 G1을 쓰면 도움이 된다.

* Java heap의 50% 이상이 라이브 데이터.
* 시간이 흐르면서 객체 할당 비율과 프로모션 비율이 크게 달라진다.
* GC가 너무 오래 걸린다(0.5 ~ 1초).

# 다른 GC와의 비교

* Parallel GC
    * Parallel GC는 old gen의 공간에서만 재확보(reclaim)와 조각 모음(compaction)을 한다.
    * G1은 이런 작업을 더 짧은 GC 작업들로 분배하여 수행하여, 전체적인 처리량이 줄어드는 대신 일시 정지 시간을 크게 단축한다.
* CMS
    * G1도 CMS처럼 old gen 영역을 동시에(concurrently) 작업한다.
    * CMS는 old gen의 조각 모음을 하지 않으므로 Full GC 시간이 길어지는 문제가 있다.

# 활성화하기

* G1GC는 디폴트이므로 보통은 따로 옵션을 써서 활성화할 필요가 없다.
* `-XX:+UseG1GC` 옵션을 쓰면 수동으로 활성화할 수 있다.

# 작동 방식

G1GC의 힙 레이아웃은 다른 generational collector와 좀 다르다.

**G1GC는 전체 heap을 체스판처럼 여러 영역(region)으로 나누어 관리한다.**

따라서 G1은 영역의 참조를 관리할 목적으로 remember set를 만들어 사용한다. remember set은 total heap의 5% 미만 크기.

* 비어 있는 영역에만 새로운 객체가 들어간다.
* 쓰레기가 쌓여 꽉 찬 영역을 우선적으로 청소한다.
* 꽉 찬 영역에서 라이브 객체를 다른 영역으로 옮기고, 꽉 찬 영역은 깨끗하게 비운다.
* 이렇게 옮기는 과정이 조각 모음의 역할도 한다.

![g1gc-layout]( /post-img/java-g1gc/g1gc-layout.png )

* 빨간색은 Eden으로 쓰이고 있는 영역을 의미한다.
* 빨간색 S는 Survivor. Eden이 꽉 차면 라이브 객체를 S로 옮기고 Eden은 비워버린다.
* 파란색은 old gen 처럼 쓰이고 있는 영역이다.
* 파란색 H는 한 영역보다 크기가 커서 여려 영역을 차지하고 있는 커다란 객체이다(Humongous Object).

G1GC는 일시 정지 시간을 줄이기 위해 병렬로 GC 작업을 한다. 각각의 스레드가 자신만의 영역을 잡고 작업하는 방식.

# GC Cycle

G1은 두 페이즈를 번갈아 가며 GC 작업을 한다.

* young-only 페이즈: old 객체를 새로운 공간으로 옮긴다.
* space-reclamation 페이즈: 공간 회수.

![g1gc-cycle]( /post-img/java-g1gc/g1gc-cycle.png )

그림을 보며 생각하자.

* old gen의 점유율이 threshold 값을 넘어서면 Young-only 페이즈로 전환된다.
* Concurrent Start 단계: 도달할 수 있는 객체들에 마킹 작업을 한다.
* Remark: 마킹을 끝내고, 쓰레기 영역을 해지한다.
* Cleanup: Space-Reclamation 페이즈로 들어가야 할지 말지를 판단한다.
* Space-Reclamation: young/old 가리지 않고 라이브 객체를 적절한 곳으로 대피시킨다(Evacuation). 작업 효율이 떨어지게 되면 이 페이즈는 끝나고, 다시 Young-only 페이즈로 전환된다.

만약 애플리케이션 메모리가 부족한 경우 G1GC는 다른 GC들처럼 Full GC를 수행한다.

# IHOP 값에 대하여

IHOP: Initiating Heap Occupancy Percent

마킹 발동 기준이 되는 값으로, old gen 사이즈에 대한 백분율이다.

* Adaptive IHOP
    * G1 통계를 계산하며 최적의 IHOP 값을 찾아내 알아서 설정한다.
    * Adaptive IHOP 기능이 켜져 있을 때 `-XX:InitiatingHeapOccupancyPercent` 옵션을 주면 통계 자료가 충분하지 않은 초기 상태에서 이 옵션 값을 초기값으로 활용한다.
    * `-XX:-G1UseAdaptiveIHOP` 옵션으로 Adaptive IHOP 기능을 끌 수 있다.
        * Adaptive 기능을 끄면 통계를 게산하지 않으므로 `-XX:InitiatingHeapOccupancyPercent`로 지정한 IHOP 값을 계속 쓰게 된다.
    * Adaptive IHOP는 `-XX:G1HeapReservePercent`로 설정된 값 만큼의 버퍼를 제외하고 시작 heap 점유율을 설정한다.

# G1GC의 마킹

* G1GC는 SATB(Snapshot-At-The-Beginning) 알고리즘을 써서 마킹 작업을 한다.
* SATB는 일시 정지가 일어난 시점 직후의 라이브 객체에만 마킹을 한다. 따라서 마킹하는 도중에 죽은 객체도 라이브 객체로 간주하는 보수적인 특징이 있다. 비효율적일 것 같지만 Remark 단계의 응답 시간(latency)이 다른 GC에 비해 더 빠른 경향이 있다.

# Evacuation Failure

애플리케이션이 너무 많은 양의 메모리를 쓰고 있어서, 객체를 대피시킬 때 복사할만한 공간이 충분하지 않으면 대피 실패(Evacuation Failure)가 발생한다. 

이미 이동시킨 객체는 어쩔 수 없으니 새 위치 그대로 유지하고, 아직 이동하지 않은 객체는 복사하지 않는다. 이동하지 않은 객체는 참조를 끊지 않도록 조정하여 일단 무사히 GC 작업을 마치는 방향으로 진행한다.

이러한 대피 실패 작업은 일반적인 young collection 만큼 빠르며, 대피 실패로 GC 작업이 완료되면 다른 때와 다름없이 애플리케이션 실행으로 돌아간다.

G1은 GC가 끝날 무렵에 대피 실패의 뒷수습이 끝났다고 가정한다. 이 뒷수습이 끝나야 애플리케이션을 계속 실행할 수 있는 충분한 공간이 있는 셈이기 때문이다. 이 가정이 유지되지 않으면, 즉 애플리케이션을 계속 실행하기에 공간이 부족하다면 Full GC가 예약된다.

# Humongous Object

* 위의 체스판 모양의 heap 구조에서 파란색 H로 표시된 객체가 커다란 객체(Humongous Object) 이다.
* 한 영역의 절반 이상의 크기를 가진 객체를 말한다.
* 영역의 절반이 기준이므로 `-XX:G1HeapRegionSize`의 영향을 받는다.
    * 기본값을 쓰고 있다면, 알아서 자동으로 결정된다.

커다란 객체는 아무래도 크기가 있다 보니 특별하게 다뤄진다.

* 연속된 영역을 순차적으로 차지하도록 할당된다.
* 마지막 꼬리 영역에 남는 공간이 생길 수 있는데, 그 잉여 공간은 아깝지만 사용하지 않는다.
    * 즉, 커다란 객체가 회수될 때까지는 잉여 공간을 사용할 수 없다.

```ascii-art
 영역1  영역2  영역3  영역4
+------+------+------+------+
|######|######|######|###   |
|######|######|######|###   |
+------+------+------+------+
                          ^ 잉여 공간
```

* 커다란 객체가 할당되면, G1은 IHOP를 확인하고 IHOP가 초과된 상태라면 즉시 강제로(force) young collection을 시작한다.
    * (집에 커다란 가구가 들어오게 되면 가족들이 열심히 여기저기 치우고 옮기며 공간을 확보하는 모습이 연상된다.)
* 커다란 객체는 Full GC 중에도 옮겨지지 않는데, 이로 인해 조각화가 발생할 수 있다.
    * 그 결과, 공간이 충분한데도 메모리 부족 상태가 발생할 수 있다.
    * 그 결과, Full GC가 느려질 수 있다.




# 옵션 및 기본값

`-XX:MaxGCPauseMillis=200`

* 최대 일시 정지 시간 목표. 기본값은 200ms.

`-XX:GCPauseTimeInterval=<ergo>`

* 일시 정지 시간 "최대 간격" 목표
* 이 값은 기본값이 없어서, 최악의 경우 G1이 GC를 끊임없이 계속 수행할 수도 있다.

`-XX:ParallelGCThreads = <ergo>`

* 일시 정지 중 parallel 작업에 사용되는 최대 스레드 갯수.
* 사용 가능한 프로세서 수가 8보다 작으면 그대로 지정한 값을 사용하고, 그 외의 경우는 $${5 \over 8}$$ 만큼의 스레드를 추가로 사용한다.
    * 예를 들어 사용 가능한 프로세서 수가 13 개라면 $$ 8 + (13-8) \times { 5 \over 8 } = 11.125 $$ 이므로, 11 개의 스레드를 사용한다.
* 일시 정지 상태로 들어갔을 때 사용되는 최대 스레드의 수는 최대 토탈 heap 사이즈에 의해 제한을 받는다.
    * `-XX:HeapSizePerGCThread` 옵션으로 지정된 GC 스레드가 담당할 heap 사이즈의 최대값에 영향을 받는다.

`-XX:ConcGCThreads=<ergo>`

* 동시 작업에 사용하는 최대 스레드 수.
* 이 값은 `-XX:ParallelGCThreads`를 4로 나눈 값이다.

`-XX:+G1UseAdaptiveIHOP`, `-XX:InitiatingHeapOccupancyPercent=45`

* IHOP 관련 설정. 

`-XX:G1HeapRegionSize=<ergo>`

* 영역 하나의 사이즈.
* 기본적으로는 최대 heap 사이즈 $${1 \over 2048}$$ 만큼의 계산된 사이즈를 갖는다.
* 굳이 설정을 한다면 1 ~ 32MB 정도로 설정할 수 있으며, 2의 거듭제곱 값이어야 한다.

`-XX:G1NewSizePercent=5`, `-XX:G1MaxNewSizePercent=60`

* young gen의 총 사이즈는 이 두 값 사이에서 변화한다.

`-XX:G1HeapWastePercent=5`

* The allowed unreclaimed space in the collection set candidates as a percentage. G1 stops the space-reclamation phase if the free space in the collection set candidates is lower than that.

`-XX:G1MixedGCCountTarget=8`

* The expected length of the space-reclamation phase in a number of collections.

`-XX:G1MixedGCLiveThresholdPercent=85`

* 라이브 객체 점유율이 이 값보다 높은 old gen은 space-reclamation 단계에서 수집되지 않는다.

# 함께 읽기

* [[java-gc-tuning]]{Java GC 튜닝}

# 참고문헌

* [JDK 12 Garbage Collection Tuning Guide](https://docs.oracle.com/en/java/javase/12/gctuning/introduction-garbage-collection-tuning.html )
* [JDK 11 Garbage Collection Tuning Guide](https://docs.oracle.com/en/java/javase/11/gctuning/introduction-garbage-collection-tuning.html )
* [JDK 10 Garbage Collection Tuning Guide](https://docs.oracle.com/javase/10/gctuning/introduction-garbage-collection-tuning.htm )
* [JDK 9 Garbage Collection Tuning Guide](https://docs.oracle.com/javase/9/gctuning/introduction-garbage-collection-tuning.htm )
* [JDK 8 Garbage Collection Tuning Guide](https://docs.oracle.com/javase/8/docs/technotes/guides/vm/gctuning/ )

