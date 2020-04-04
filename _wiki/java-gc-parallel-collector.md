---
layout  : wiki
title   : Java HotSpot VM Parallel Collector
summary : Java8 디폴트 GC
date    : 2019-09-16 12:18:37 +0900
updated : 2019-09-29 09:28:57 +0900
tag     : java gc
toc     : true
public  : true
parent  : [[garbage-collection]]
latex   : false
---
* TOC
{:toc}

* 이 글은 Oracle의 "HotSpot Virtual Machine Garbage Collection Tuning Guide"의 Java 8 버전부터 12 버전까지의 문서를 읽고 정리한 문서이다.
* 이 문서에서는 원본 문서의 이름을 "HTG"로 줄여 부르기로 한다. **H**otSpot Virtual Machine Garbage Collection **T**uning **G**uide.
    * HTG-08, HTG-12는 각각 Java 8 버전의 HTG와 Java 12 버전의 HTG를 말한다.

> [HTG-12](https://docs.oracle.com/en/java/javase/12/gctuning/parallel-collector1.html#GUID-5A7866BE-59DF-44AD-B51A-274DE3F2BF59 ), [HTG-11](https://docs.oracle.com/en/java/javase/11/gctuning/parallel-collector1.html#GUID-DCDD6E46-0406-41D1-AB49-FB96A50EB9CE ), [HTG-10](https://docs.oracle.com/javase/10/gctuning/parallel-collector1.htm#JSGCT-GUID-DCDD6E46-0406-41D1-AB49-FB96A50EB9CE ), [HTG-09](https://docs.oracle.com/javase/9/gctuning/parallel-collector1.htm#JSGCT-GUID-DCDD6E46-0406-41D1-AB49-FB96A50EB9CE ), [HTC-08](https://docs.oracle.com/javase/8/docs/technotes/guides/vm/gctuning/parallel.html#parallel_collector )

## Parallel Collector?

Parallel Collector는 throughput collector 라고 부르기도 한다.

Parallel Collector는 2개 이상의 프로세서에서 Serial GC보다 나은 성능을 보이는 GC이다.

| 프로세서 | Serial Collector와의 비교                            |
|----------|------------------------------------------------------|
| 1        | Serial GC와 비슷한 성능                              |
| 2        | heap 사이즈가 크다면 Serial GC보다 조금 더 좋은 성능 |
| 3 이상   | Serial GC보다 훨씬 뛰어난 성능                       |

Parallel Collector는 `-XX:ParallelGCThreads=<N>`으로 스레드 수를 설정할 수 있다. 이 $$N$$ 값은 이 컬렉터에서 매우 중요한 값이다.

* $$N \lt 8$$: $$N$$ 개의 GC 스레드를 사용한다.
* $$N \gt 8$$: $$N$$개의 하드웨어 스레드가 있는 머신에서 일정 비율 만큼의 GC 스레드를 사용한다. $$N$$이 커지면 이 비율은 $${5 \over 8}$$로 수렴한다.

## 조각화 문제

Parallel Collector는 여러 스레드가 마이너 GC 작업을 하기 때문에 메모리 조각화가 발생할 수 있다.
마이너 GC를 수행하는 스레드가 프로모션을 할 때 old gen의 일부 공간을 예약해 사용하는데, 이 공간을 프로모션 버퍼라 한다. 메모리 조각화는 프로모션 버퍼에서 발생한다. 스레드 수를 줄이고 old gen의 크기를 늘려주면 조각화 현상은 줄어들게 된다.


## Parallel Collector의 generation 구조

Parallel Collector의 generation 구조는 다음과 같이 생겼다.

```ascii-art
                             <--------- Young ---------->
+-------------+-------------+---------+--------+----+----+
|             |   Virtual   | Virtual |  Eden  | Sv | Sp |
+-------------+-------------+---------+--------+----+----+
 <---------- Old ---------->
                                         Sv: Survivor
                                         Sp: Space
```

## Parallel GC 사용과 튜닝

* `-XX:+UseParallelGC`를 설정하면 Parallel GC를 사용할 수 있다.
    * 또는 하드웨어와 운영체제 환경을 고려해 가상 머신이 알아서 Parallel GC를 셋팅해 사용한다.

### GC 일시 정지 시간의 최대값 설정

* `-XX:MaxGCPauseMillis=<N>`으로 설정할 수 있다.
    * 이 옵션을 설정하면 가상 머신은 `N`ms 이하의 일시 정지 시간을 맞추기 위해 heap 사이즈와 여러 옵션들을 자동으로 조절한다.
    * "일시 정지 시간"을 짧게 만드는 튜닝을 하면 "전체 처리량"이 줄어든다는 상식을 잊지 말자.

### 처리량(throughput) 향상

처리량은 다음과 같이 계산한다.

$${ GC시간 \over GC시간 + \text{애플리케이션 처리 시간 }}$$

* 처리량:  GC에 소모된 시간과 애플리케이션 처리 시간의 비율로 계산한다.
* `-XX:GCTimeRatio=<N>` 옵션을 설정하면 이 비율을 $${ 1 \over 1 + N }$$으로 조절한다.
    * 예를 들어, $$N = 19$$ 이면 $${ 1 \over 1 + 19 }$$ 이므로, 전체 시간의 5% 가 GC에 사용된다.
    * 기본값은 99. 즉, 1% 의 시간이 GC에 사용된다.

### Footprint

* footprint 최대 heap 사이즈는 `-Xmx` 옵션으로 설정할 수 있다.
* GC는 다른 목표를 달성하는 한도에서 heap 사이즈를 최소화하려한다.

### Parallel GC의 목표 우선순위

1. 최대 일시 정지 시간 최소화
2. 처리량 최대화
3. heap 사이즈 최소화(footprint 목표)

Parallel GC는 1번 목표를 달성한 이후에야만 2번 목표를 달성하려 하고, 2번 목표가 달성된 이후에야만 3번 목표를 달성하려 한다.

**Parallel GC가 generation 사이즈를 조절하는 과정**

1. 평균 일시정지 시간 등, GC 가동에 필요한 통계는 각 GC 작업이 끝날 때마다 업데이트된다.
2. 목표를 달성했는지 확인하기 위한 테스트를 수행한다.
3. generation 사이즈를 조정한다.
    * generation은 20% 씩 증가하고 5% 씩 감소한다.
    * 한 번에 한 개의 generation 사이즈만 조절한다.
    * 두 generation의 일시 정지 시간 목표가 동시에 달성되면, 일시 정지 시간이 더 큰 쪽의 generation 사이즈를 줄인다.

단, `System.gc()` 호출로 인한 GC 작업은 통계 계산에서 제외되며, generation 사이즈 조정을 하지 않는다.

한편 generation의 증감율을 직접 조절하려면
증가율이 $$X$$% 이고, 감소율은 $${ X \over D }$$% 라는 점을 기억해야 한다.

사이즈 조정 옵션은 다음과 같다.

* `-XX:YoungGenerationSizeIncrement=<Y>`로 $$X$$를 설정할 수 있다.
* `-XX:AdaptiveSizeDecrementScaleFactor=<D>`로 $$D$$를 설정할 수 있다.

old gen의 경우 다음과 같이 증가율을 설정할 수 있다.

* `-XX:TenuredGenerationSizeIncrement=<T>`로 old gen의 증가율을 설정할 수 있다.


예를 들어 커지는 비율이 30% 일 때, 줄어드는 비율을 15% 로 맞추고 싶다면 `-XX:AdaptiveSizeDecrementScaleFactor=2`로 설정한다.

한편, GC가 최초 시작시 generation 크기를 증가시키기로 결정했다면 증가율에 보정값이 붙을 수 있다. 이런 보정값은 시작할 때의 성능을 향상시키는 것이 목적이기 때문에 GC가 여러 차례 수행되면서 알아서 사라지게 된다. 같은 이유로 감소율에 대한 보정값은 없다.

### Parallel GC의 heap 사이즈

* 기본적으로는 시스템 메모리 양을 바탕으로 계산된 값을 쓴다.
* 최대 heap 사이즈의 디폴트 값은 물리적 메모리의 $${1 \over 4}$$.
    * `-Xmx`(maximum heap size)로 조절할 수 있다.
* heap 사이즈 초기값은 물리적 메모리의 $${1 \over 64}$$.
    * `-Xms`(initial heap size)로 조절할 수 있다.
* young gen에 할당된 최대 사이즈는 토탈 heap 사이즈의 $${1 \over 3}$$.

애플리케이션을 최적으로 돌릴 수 있는 heap 사이즈를 알고 있다면 `-Xms`와 `-Xmx`를 같은 값으로 설정해 주도록 한다.
만약 잘 모르겠다면 가상 머신이 알아서 설정하게 한다. 가상 머신은 초기값부터 시작해서 heap 사이즈를 조절하며 heap 사용량과 성능 사이의 균형점을 찾으려 한다.

**heap 사이즈 확인**

옵션 설정에 따른 기본값을 확인하려면 `-XX:+PrintFlagsFinal` 옵션을 사용한다.

다음은 내 로컬 컴퓨터에서 출력한 결과이다.

```sh
$ java -XX:+PrintFlagsFinal -XX:+UseParallelGC  -version | egrep MaxHeap
    uintx MaxHeapFreeRatio = 100           {manageable} {default}
   size_t MaxHeapSize      = 4294967296    {product} {ergonomic}
openjdk version "12.0.1" 2019-04-16
OpenJDK Runtime Environment AdoptOpenJDK (build 12.0.1+12)
OpenJDK 64-Bit Server VM AdoptOpenJDK (build 12.0.1+12, mixed mode, sharing)
```

**OutOfMemoryError**

GC에 전체 시간의 98% 이상이 소모되고, heap의 2% 이하가 GC로 복구되면 OutOfMemoryError 가 발생한다.

이 에러는 heap이 너무 작을 때 애플리케이션이 오랫동안 실행되는 것을 방지하기 위한 기능이다.

`-XX:-UseGCOverheadLimit` 옵션을 설정하면 이 기능을 끌 수 있다.

## 함께 읽기

* [[java-gc-tuning]]{Java GC 튜닝}

## 참고문헌

* [JDK 12 Garbage Collection Tuning Guide](https://docs.oracle.com/en/java/javase/12/gctuning/introduction-garbage-collection-tuning.html )
* [JDK 11 Garbage Collection Tuning Guide](https://docs.oracle.com/en/java/javase/11/gctuning/introduction-garbage-collection-tuning.html )
* [JDK 10 Garbage Collection Tuning Guide](https://docs.oracle.com/javase/10/gctuning/introduction-garbage-collection-tuning.htm )
* [JDK 9 Garbage Collection Tuning Guide](https://docs.oracle.com/javase/9/gctuning/introduction-garbage-collection-tuning.htm )
* [JDK 8 Garbage Collection Tuning Guide](https://docs.oracle.com/javase/8/docs/technotes/guides/vm/gctuning/ )

