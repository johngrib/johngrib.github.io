---
layout  : wiki
title   : Java HotSpot VM G1GC
summary : Java9 ~ 12 디폴트 GC
date    : 2019-09-16 14:36:19 +0900
updated : 2019-09-29 09:28:22 +0900
tag     : java gc
toc     : true
public  : true
parent  : [[garbage-collection]]
latex   : true
---
* TOC
{:toc}

* 이 글은 Oracle의 "HotSpot Virtual Machine Garbage Collection Tuning Guide"의 Java 8 버전부터 12 버전까지의 문서를 읽고 정리한 문서이다.
* 이 문서에서는 원본 문서의 이름을 "HTG"로 줄여 부르기로 한다. **H**otSpot Virtual Machine Garbage Collection **T**uning **G**uide.
    * HTG-08, HTG-12는 각각 Java 8 버전의 HTG와 Java 12 버전의 HTG를 말한다.

> [HTG-12](https://docs.oracle.com/en/java/javase/12/gctuning/garbage-first-garbage-collector.html#GUID-ED3AB6D3-FD9B-4447-9EDF-983ED2F7A573 ), [HTG-11](https://docs.oracle.com/en/java/javase/11/gctuning/garbage-first-garbage-collector.html#GUID-ED3AB6D3-FD9B-4447-9EDF-983ED2F7A573 ), [HTG-10](https://docs.oracle.com/javase/10/gctuning/garbage-first-garbage-collector.htm#JSGCT-GUID-ED3AB6D3-FD9B-4447-9EDF-983ED2F7A573 ), [HTG-09](https://docs.oracle.com/javase/9/gctuning/garbage-first-garbage-collector.htm#JSGCT-GUID-ED3AB6D3-FD9B-4447-9EDF-983ED2F7A573 ), [HTC-08](https://docs.oracle.com/javase/8/docs/technotes/guides/vm/gctuning/g1_gc.html )

## G1GC

G1GC: Garbage First Garbage Collector

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

## 다른 GC와의 비교

* Parallel GC
    * Parallel GC는 old gen의 공간에서만 재확보(reclaim)와 조각 모음(compaction)을 한다.
    * G1은 이런 작업을 더 짧은 GC 작업들로 분배하여 수행하여, 전체적인 처리량이 줄어드는 대신 일시 정지 시간을 크게 단축한다.
* CMS
    * G1도 CMS처럼 old gen 영역을 동시에(concurrently) 작업한다.
    * CMS는 old gen의 조각 모음을 하지 않으므로 Full GC 시간이 길어지는 문제가 있다.

## 활성화하기

* G1GC는 디폴트이므로 보통은 따로 옵션을 써서 활성화할 필요가 없다.
* `-XX:+UseG1GC` 옵션을 쓰면 수동으로 활성화할 수 있다.

## 작동 방식

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

## GC Cycle

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

## IHOP 값에 대하여

IHOP: Initiating Heap Occupancy Percent

마킹 발동 기준이 되는 값으로, old gen 사이즈에 대한 백분율이다.

* Adaptive IHOP
    * G1 통계를 계산하며 최적의 IHOP 값을 찾아내 알아서 설정한다.
    * Adaptive IHOP 기능이 켜져 있을 때 `-XX:InitiatingHeapOccupancyPercent` 옵션을 주면 통계 자료가 충분하지 않은 초기 상태에서 이 옵션 값을 초기값으로 활용한다.
    * `-XX:-G1UseAdaptiveIHOP` 옵션으로 Adaptive IHOP 기능을 끌 수 있다.
        * Adaptive 기능을 끄면 통계를 게산하지 않으므로 `-XX:InitiatingHeapOccupancyPercent`로 지정한 IHOP 값을 계속 쓰게 된다.
    * Adaptive IHOP는 `-XX:G1HeapReservePercent`로 설정된 값 만큼의 버퍼를 제외하고 시작 heap 점유율을 설정한다.

## G1GC의 마킹

* G1GC는 SATB(Snapshot-At-The-Beginning) 알고리즘을 써서 마킹 작업을 한다.
* SATB는 일시 정지가 일어난 시점 직후의 라이브 객체에만 마킹을 한다. 따라서 마킹하는 도중에 죽은 객체도 라이브 객체로 간주하는 보수적인 특징이 있다. 비효율적일 것 같지만 Remark 단계의 응답 시간(latency)이 다른 GC에 비해 더 빠른 경향이 있다.

## Evacuation Failure

애플리케이션이 너무 많은 양의 메모리를 쓰고 있어서, 객체를 대피시킬 때 복사할만한 공간이 충분하지 않으면 대피 실패(Evacuation Failure)가 발생한다. 

이미 이동시킨 객체는 어쩔 수 없으니 새 위치 그대로 유지하고, 아직 이동하지 않은 객체는 복사하지 않는다. 이동하지 않은 객체는 참조를 끊지 않도록 조정하여 일단 무사히 GC 작업을 마치는 방향으로 진행한다.

이러한 대피 실패 작업은 일반적인 young collection 만큼 빠르며, 대피 실패로 GC 작업이 완료되면 다른 때와 다름없이 애플리케이션 실행으로 돌아간다.

G1은 GC가 끝날 무렵에 대피 실패의 뒷수습이 끝났다고 가정한다. 이 뒷수습이 끝나야 애플리케이션을 계속 실행할 수 있는 충분한 공간이 있는 셈이기 때문이다. 이 가정이 유지되지 않으면, 즉 애플리케이션을 계속 실행하기에 공간이 부족하다면 Full GC가 예약된다.

## Humongous Object

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




## 옵션 및 기본값

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

## 튜닝

여기에 나오는 지침들은 훑어보고 감 잡는 용으로만 쓰고, 실제로 튜닝을 하려면 문서를 직접 읽고 충분히 테스트하도록 하자.

### 일반적인 권장 사항

* 가급적이면 기본 설정으로 사용할 것.
* 필요하다면 `-Xmx` 옵션으로 최대 heap 사이즈를 넉넉하게 설정할 것.
* `-Xmn`, `-XX:NewRatio` 옵션으로 young gen의 사이즈를 설정하지 말 것. 이 사이즈 목표가 일시 중지 시간 목표보다 우선하게 되며, 일시 중지 시간 목표는 비활성화된다.
* GC 튜닝시 처리량과 정지 시간 사이의 상충 관계를 염두에 둘 것.
    * G1은 90%의 애플리케이션 시간과 10%의 GC 시간을 목표로 한다(Parallel GC의 경우 99%의 애플리케이션 시간과 1%의 GC 시간 목표). 따라서 처리량을 늘리고자 한다면 일시 정지 시간 목표를 어느 정도 느슨하게 해줘야 한다.

### G1 퍼포먼스 향상

가장 중요한 것은 로그. `-Xlog:gc*=debug` 옵션으로 로그를 보도록 하자.

#### Full GC

Full GC 로그를 보려면 로그에서 다음을 찾아보자.

* Pause Full(Allocation Failure): old gen의 heap 점유율이 너무 높아서 Full GC가 발생.
* to-space exhausted: 대비 실패를 의미하는 태그.

The reason that a Full GC occurs is because the application allocates too many objects that can't be reclaimed quickly enough.

Full GC가 발생하는 이유는 애플리케이션이 너무 많은 객체를 할당하는 바람에 회수가 빨리 이루어지지 못하기 때문이다.
concurrent marking을 끝내지 못하고 허겁지겁 space-reclamation 단계를 시작하기도 한다. 또한 커다란 객체를 많이 할당하는 것도 Full GC 발생 확률을 높인다.

concurrent marking이 정시에 끝난다면 Full GC 발생 확률을 낮출 수 있다.

Full GC 발생 확률을 낮추기 위해 다음 방법들을 시도해 보도록 하자.

* `gc+heap=info`로 로깅을 하면 커다란 객체가 있는 지역의 번호를 볼 수 있다.
* `-XX:G1HeapRegionSize`로 영역 크기를 늘려주면 커다란 객체 수도 줄어들게 될 것이다.
    * 커다란 객체 관련 문제는 이것 외에는 딱히 답이 없다.
* heap 사이즈를 늘려주면 마킹 완료까지의 시간도 같이 늘어난다.
* `-XX:ConcGCThreads`를 설정해서 동시 마킹 스레드의 수를 늘려준다.
* G1이 더 미리미리 마킹을 시작하게 한다.
    * `-XX:G1ReservePercent`를 설정해서 초기 시점의 Adaptive IHOP 계산에 영향을 준다.
    * `-XX:-G1UseAdaptiveIHOP`, `-XX:InitiatingHeapOccupancyPercent`를 설정해서 Adaptive IHOP 기능을 끈다.

#### Latency

`gc+cpu=info`로 로깅을 하면 `User=0.19s Sys=0.00s Real=0.01s` 형식의 시간 로그를 볼 수 있다.

* User: VM Code에서 소비한 시간.
* Sys: 운영체제에서 소비한 시간.
* Real: 일시 중지 동안 흘러간 절대 시간.

**Sys 시간이 길다면?**

환경이 원인이다.

* `-Xms`, `-Xmx` 옵션으로 최소/최대 heap 사이즈를 같게 설정하고, `-XX:+AlwaysPreTouch`로 모든 메모리를 pre-touch 하게 한다(pre-touch 작업을 VM이 시작할 때 수행하게 하는듯).
* Linux에서는 THP(Transparent Huge Pages)기능을 사용할 때 랜덤으로 프로세스가 중단되는 경우가 있다. VM은 많은 메모리를 관리하기 때문에 여기에 당첨될 확률이 높다. 운영체제 메뉴얼을 읽고 THP 기능을 비활성하는 방법을 찾아볼 것.
* 하드디스크 I/O 때문에 로그 출력이 중단될 수 있다.

**Real 시간이 User와 Sys를 합친 것보다 훨씬 크다면?**

* VM이 CPU 시간을 충분히 얻지 못한 상황일 수 있다.

**레퍼런스 객체 처리 시간이 너무 오래 걸린다면?**

* `-XX:+ParallelRefProcEnabled` 옵션을 사용해 참조 객체 참조 업데이트를 병렬로 수행하도록 시도해 본다.

**Young Only Collection이 너무 오래 걸린다면?**

* young collection은 복사해야 하는 라이브 객체 수에 비례하여 시간이 걸린다.
    * `-XX:G1NewSizePercent`를 작게 설정해서 young gen의 최소 크기를 줄여준다.
    * `-XX:G1MaxNewSizePercent`를 작게 설정해서 young gen의 최대 크기를 줄여준다.

**Mixed Collection이 너무 오래 걸린다면?**

* Mixed Collection은 old gen의 공간을 회복하기 위해 사용하며, young/old 영역을 모두 수집한다.
* `gc+ergo+cset=trace` 옵션으로 로깅을 하면 young/old의 대비 시간이 일시 정지 시간에 주는 영향을 알 수 있다.
* `-XX:G1MixedGCCountTarget` 를 설정해 대상 영역을 늘려서 더 많은 GC가 작업하게 한다.
* `-XX:G1MixedGCLiveThresholdPercent` 값을 조절해서 GC 대상을 줄인다.
* `-XX:G1HeapWastePercent` 값을 늘려주면 G1이 점유하는 메모리가 줄어들게 된다.

**RS 업데이트와 스캔 시간이 길다면?**

RS는 Remember Set를 말한다.

* `-XX:G1HeapRegionSize` 로 heap 사이즈를 조절하면 RS 크기에 영향을 준다.
* `-XX:G1RSetUpdatingPauseTimePercent`를 줄여주면 G1은 더 많은 RS 작업을 동시에(concurrently) 하려 한다.

#### Throughput

**처리량을 늘리고 싶다면?**

* `-XX:MaxGCPauseMillis`로 최대 일시 정지 시간을 늘려준다.
* `-XX:G1NewSizePercent`로 young gen의 최소 사이즈를 늘려준다.
* `-XX:G1MaxNewSizePercent`로 young gen의 최대 사이즈를 늘려준다.
* 동시 작업을 위한 Remeber Set 업데이트에는 CPU 리소스가 많이 필요하므로, 동시 작업량을 줄이면 처리량이 늘어난다.
    * `-XX:G1RSetUpdatingPauseTimePercent`를 늘려주면 동시 작업이 줄어들고, GC 일시 정지 시간이 늘어난다.
    * 최악의 경우, 다음 세 옵션을 설정하면 Remember Set 업데이트를 아예 끌 수도 있다. 이렇게 하면 RS 업데이트 작업을 다음 GC 작업으로 미룬다.
        * `-XX:-G1UseAdaptiveConcRefinement`, `-XX:G1ConcRefinementGreenZone=2G` `-XX:G1ConcRefinementThreads=0` 
* `-XX:+UseLargePages`를 설정해서 큰 페이지를 사용하면 처리량이 향상된다. (운영체제 메뉴얼을 참고할 것)
* heap 사이즈 조정 작업을 끄거나 최소화한다. 다음 두 방법을 쓰면 일관된 일시 정지 시간을 얻을 가능성이 올라간다.
    * `-Xms`, `-Xmx`를 같은 값으로 설정한다.
    * `-XX:+AlwaysPreTouch`를 설정한다.
* G1을 포함한 대부분의 GC는 GC 소요 시간이 `-XX:GCTimeRatio` 옵션으로 설정된 비율보다 낮도록 heap 사이즈를 자동으로 조절한다. 이 값을 조절해 보는 것도 방법이다.



## 함께 읽기

* [[java-gc-tuning]]{Java GC 튜닝}

## 참고문헌

* [JDK 12 Garbage Collection Tuning Guide](https://docs.oracle.com/en/java/javase/12/gctuning/introduction-garbage-collection-tuning.html )
* [JDK 11 Garbage Collection Tuning Guide](https://docs.oracle.com/en/java/javase/11/gctuning/introduction-garbage-collection-tuning.html )
* [JDK 10 Garbage Collection Tuning Guide](https://docs.oracle.com/javase/10/gctuning/introduction-garbage-collection-tuning.htm )
* [JDK 9 Garbage Collection Tuning Guide](https://docs.oracle.com/javase/9/gctuning/introduction-garbage-collection-tuning.htm )
* [JDK 8 Garbage Collection Tuning Guide](https://docs.oracle.com/javase/8/docs/technotes/guides/vm/gctuning/ )

