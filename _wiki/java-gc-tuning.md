---
layout  : wiki
title   : Java GC 튜닝
summary : Oracle의 튜닝 가이드를 읽고 정리해 보자
date    : 2019-09-12 22:35:34 +0900
updated : 2019-10-04 12:56:34 +0900
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


## Garbage Collector란 무엇인가?

* GC의 정의는 HTG-08 과 HTG-09 ~ HTG-12 가 미묘하게 다른데, 9 부터 G1GC가 기본값이 되었기 때문이다.

### Java 9 ~ 12

>
* [HTG-12](https://docs.oracle.com/en/java/javase/12/gctuning/introduction-garbage-collection-tuning.html ), [HTG-11](https://docs.oracle.com/en/java/javase/11/gctuning/introduction-garbage-collection-tuning.html ), [HTG-10](https://docs.oracle.com/javase/10/gctuning/introduction-garbage-collection-tuning.htm ), [HTG-09](https://docs.oracle.com/javase/9/gctuning/introduction-garbage-collection-tuning.htm )

GC는 애플리케이션의 동적 메모리 할당 요청을 자동으로 관리한다.

GC는 다음 작업을 통해 자동으로 동적 메모리를 관리한다.

* 운영 체제로부터 메모리를 받아 할당에 사용한다.
* 애플리케이션이 메모리를 요청하면 전달해 준다.
* 애플리케이션이 메모리의 어떤 부분을 사용 중인지 확인한다.
* 사용되지 않은 메모리를 회수하여 애플리케이션이 메모리를 재사용 할 수 있도록 한다.

Java HotSpot 가비지 수집기는 다음 방법들을 사용해 GC 효율을 향상시키려 한다.

* generational 청소(scavenging).
* 멀티 스레드를 사용해 병렬로 작업하거나, 애플리케이션이 돌아갈 때 백그라운드에서 작업한다.
* 라이브 오브젝트 압축.

### Java 8

>
* [HTG-08](https://docs.oracle.com/javase/8/docs/technotes/guides/vm/gctuning/introduction.html#sthref3 )

GC는 메모리를 관리하는 도구이다. GC는 다음과 같은 작업을 한다.

* young generation에 객체를 할당하고, 오래된 객체를 old generation으로 프로모션한다.
* 동시(병렬) 마킹 단계(marking phase)를 통해 old generation에서 살아있는 객체를 찾는다. HotSpot VM은 토탈 Java heap 사용량이 기본 임계 값을 초과하게 되면 marking phase를 발동한다. 이에 대해서는 CMS(Concurrent Mark Sweep) Collector와 Garbage-First GC 문서를 참고할 것.
* 병렬 복사(copying) 작업을 통해 라이브 객체를 압축하여 사용 가능한 메모리를 복구한다. 이에 대해서는 Parallel Collector와 Garbage-First GC 문서를 참고할 것.

## Default Selections

### Java 9 ~ 12

>
* [HTG-12](https://docs.oracle.com/en/java/javase/12/gctuning/ergonomics.html ), [HTG-11](https://docs.oracle.com/en/java/javase/11/gctuning/ergonomics.html ), [HTG-10](https://docs.oracle.com/javase/10/gctuning/ergonomics.htm#JSGCT-GUID-DA88B6A6-AF89-4423-95A6-BBCBD9FAE781 ), [HTG-09](https://docs.oracle.com/javase/9/gctuning/ergonomics.htm#JSGCT-GUID-DA88B6A6-AF89-4423-95A6-BBCBD9FAE781 )

GC, heap 사이즈, 런타임 컴파일러 기본 셋팅은 다음과 같다.

* **Garbage-First(G1) collector**
* GC 스레드의 최대 갯수 한계는 heap 사이즈와 사용 가능한 CPU 자원에 따라 달라진다.
* 초기 heap 사이즈는 물리 메모리의 $${ 1 \over 64 }$$
* 최대 heap 사이즈는 물리 메모리의 $${1 \over 4}$$
* C1, C2를 같이 사용하는 계층화된 컴파일러(Tiered comiler)

### Java 8

>
* [HTG-08](https://docs.oracle.com/javase/8/docs/technotes/guides/vm/gctuning/ergonomics.html#sthref5 )

* **Throughput garbage collector** (The parallel collector를 이렇게도 부른다)
* 초기 heap 사이즈는 물리 메모리의 $${ 1 \over 64 }$$
* 최대 heap 사이즈는 물리 메모리의 $${1 \over 4}$$
* 서버 런타임 컴파일러

## Behavior-Based Tuning

>
* [HTG-12](https://docs.oracle.com/en/java/javase/12/gctuning/ergonomics.html#GUID-3D0BB91E-9BFF-4EBB-B523-14493A860E73 ), [HTG-11](https://docs.oracle.com/en/java/javase/11/gctuning/ergonomics.html#GUID-3D0BB91E-9BFF-4EBB-B523-14493A860E73 ), [HTG-10](https://docs.oracle.com/javase/10/gctuning/ergonomics.htm#JSGCT-GUID-3D0BB91E-9BFF-4EBB-B523-14493A860E73 ), [HTG-09](https://docs.oracle.com/javase/9/gctuning/ergonomics.htm#JSGCT-GUID-3D0BB91E-9BFF-4EBB-B523-14493A860E73 ), [HTG-08](https://docs.oracle.com/javase/8/docs/technotes/guides/vm/gctuning/ergonomics.html#sthref11 )

HotSpot VM GC는 두 가지 목표 중 하나를 우선적으로 달성하도록 설정할 수 있다.

* 최대 일시 정지 시간 최소화
* 애플리케이션 처리량 향상

두 목표는 어느 정도 트레이드 오프 관계에 있다. 일시 정지 시간을 최소화하면 짧은 GC가 자주 발생하는 대신, 전체 처리량이 떨어진다. 한편 처리량을 향상시키면 GC가 드물게 발생하는 대신 GC 작업 시간이 오래 걸린다.

**최대 일시 정지 시간 최소화 목표(Maximum Pause-Time Goal)**

* 일시 정지 시간은 GC가 애플리케이션을 정지시켜 놓고 사용하지 않는 메모리 공간을 복구하는 기간이다.
* 이 작업의 목표는 일시 정지들 중 가장 긴 시간에 한계를 두는 것이다.
* 통계는 GC에서 관리한다.
* 평균은 실행 시작부터 계산하지만, 최근의 일시 정지 시간이 더 중요하게 계산되도록 가중치가 적용된다.
* 일시 정지 시간의 평균 + 분산이 최대 일시 정지 시간 목표보다 크면, GC는 목표를 달성하지 못한 것으로 간주한다.

최대 일시 정지 시간 목표는 다음 옵션으로 설정할 수 있다.

```
-XX:MaxGCPauseMillis=<nnn>
```

* 이 설정은 `<nnn>` 밀리 초 이하의 일시 정지 시간을 원한다고 GC에 hint를 주는 것이다.
* GC는 이 설정을 만족하기 위해 GC와 관련된 여러 변수값과 Java heap 크기를 조절한다.
* 이 설정의 디폴트 값은 없다.
* 이 값을 설정하게 되면 GC가 짧아지는 대신 더 자주 발생하게 되고, 그 결과 애플리케이션의 전체 처리량이 줄어들게 된다.
* 이 값을 설정해도 상황에 따라 일시 정지 시간 목표를 달성하지 못할 수도 있다.


**처리량 향상 목표(Throughput Goal)**

* 처리량은 GC에 소요된 시간과 애플리케이션 처리에 소요된 시간으로 측정한다.

이 목표는 다음 옵션으로 설정할 수 있다.

```
-XX:GCTimeRatio=<nnn>
```

* 이 설정은 GC 시간과 애플리케이션 시간의 비율을 $$ \frac{ 1 }{1 + nnn} $$로 설정한다.
* `-XX:GCTimeRatio=19`로 설정하면, $${ 1 \over 20 }$$ 이므로, 전체 시간의 5%가 GC 시간으로 조절된다.
* 처리량 목표를 달성하지 못하면 GC가 더 드물게 발생하게 만들기 위해 generation들의 사이즈가 늘어나게 된다.

**Footprint**

* Footprint: 프로그램이 실행되는 동안 사용하는 기본 메모리의 양을 말한다.
* 처리량/최대 일시 정지 시간 목표를 달성하게 되면, GC는 두 목표 중 하나를 랜덤으로 골라 목표를 달성할 수 없는 수준까지 heap 크기를 줄인다.
* GC가 사용할 수 있는 최소/최대 heap 사이즈는 다음 옵션으로 설정할 수 있다.(HTG-09 ~ 12)

```
-Xms=<nnn>
-Xmx=<mmm>
```

**튜닝 전략**

* 디폴트 최대 heap 사이즈보다 큰 heap 사이즈가 필요한 경우가 아니면 heap의 max 값을 설정하지 말 것.
    * 애플리케이션에 필요한 처리량 달성을 목표로 튜닝할 것.
* heap은 선택한 처리량 목표를 지원하는 크기로 커지거나 줄어든다.
    * 가령, 애플리케이션이 더 빠르게 할당하기 시작하면, 처리량을 유지하기 위해 heap이 커진다.
* heap이 최대 크기로 커졌는데도 처리량 목표가 달성되지 않으면, 최대 heap 크기가 처리량 목표에 비해 너무 작은 것이다.
    * 이런 경우엔 최대 heap 크기를 플랫폼의 물리 메모리 최대값에 가까운 값으로 설정해볼 것(애플리케이션이 죽지 않을 정도로).
* 그래도 목표가 달성되지 않는다면, 플랫폼에서 사용 가능한 메모리에 비해 목표가 너무 높은 것이다.
* 처리량 목표를 달성할 수 있긴 한데, 일시 정지가 너무 길다면 최대 일시 정지 시간 목표를 잡아 볼 것.
    * 최대 일시 정지 시간 목표를 잡으면 처리량 목표를 달성하지 못할 수 있으므로 적절히 타협해서 값을 설정할 것.
* 일반적으로 GC가 여러 목표를 경쟁적으로 달성하려 할 때 heap 사이즈는 계속 바뀐다.
    * 애플리케이션이 정상 상태(steady state)에 도달해도 그렇다.
    * 처리량 목표 달성 과제는 큰 heap을 필요로 하고 최대 일시 정지 시간 목표 달성 과제는 작은 heap을 필요로 해서, 두 목표는 경쟁하게 되어 있다.

## Generational Garbage Collection

>
* [HTG-12](https://docs.oracle.com/en/java/javase/12/gctuning/garbage-collector-implementation.html#GUID-71D796B3-CBAB-4D80-B5C3-2620E45F6E5D ), [HTG-11](https://docs.oracle.com/en/java/javase/11/gctuning/garbage-collector-implementation.html#GUID-71D796B3-CBAB-4D80-B5C3-2620E45F6E5D ), [HTG-10](https://docs.oracle.com/javase/10/gctuning/garbage-collector-implementation.htm#JSGCT-GUID-71D796B3-CBAB-4D80-B5C3-2620E45F6E5D ), [HTG-09](https://docs.oracle.com/javase/9/gctuning/garbage-collector-implementation.htm#JSGCT-GUID-71D796B3-CBAB-4D80-B5C3-2620E45F6E5D ), [HTG-08](https://docs.oracle.com/javase/8/docs/technotes/guides/vm/gctuning/generations.html#sthref16 )

**쓰레기**

* HTG-09 ~ 12: 실행중인 프로그램의 어떤 라이브 오브젝트의 레퍼런스에서도 도달할 수 없는 객체가 있다면 그 객체는 쓰레기로 간주되며, 쓰레기의 메모리는 VM이 재사용할 수 있다.
* HTG-08: 실행중인 프로그램의 어떤 포인터도 도달할 수 없는 객체는 쓰레기로 간주된다.

**이론적으로 가장 단순한 가비지 컬렉터**

가장 단순무식한 GC는 어떤 방식으로 동작할까?
도달 가능한 모든 객체를 일일이 순회하며 체크하고, 순회가 끝났을 때 체크되지 않은 객체를 쓰레기라 생각하면 된다.
그런데 이 방식은 라이브 객체의 수가 늘어나면 그에 비례하여 순회하는 시간도 늘어난다.
따라서 많은 라이브 데이터를 유지하는 대규모 애플리케이션에서는 사용하면 안되는 방식이다.


### generational collection

HotSpot VM은 generational collection 기법을 사용하는 여러 GC 알고리즘을 통합하고 있으며, 이런 여러 알고리즘 중에서 상황에 맞는 것을 골라 쓴다.

generational collection은 객체를 세대별로 관리하는 기법이다. 초등학교 - 중학교 - 고등학교처럼 나이를 주요 기준으로 삼아 관리하는 방법이라 할 수 있다. 이 방법을 사용하면 단순무식한 GC처럼 모든 객체를 일일이 확인하는 것이 아니라 세대별로 나누어 GC를 수행하게 되어, 작업량을 많이 줄일 수 있다.

그렇다면 GC 설계자들은 왜 generational collection을 선택했는가? generational collection이 이론적으로 최고인가?

그렇지는 않다.

generational collection은 논리적으로 완벽한 이론을 바탕으로 하고 있는 것은 아니다. 이 방식은 경험과 가설을 근거로 삼는다. GC 설계자들은 객체 대부분이 생겨나자마자 얼마 지나지 않아 쓰레기가 된다는 것을 경험적으로 알고 있었다. 이를 "weak generational hypothesis", 즉 "약한 세대 가설"이라 부른다.

![weak generational hypothesis]( /post-img/java-gc-tuing/generational.png )

* x축: 객체의 수명(할당된 바이트 단위)
* y축: 해당 수명을 가진 객체의 총 바이트

이 그래프의 이름은 "객체 수명의 일반적 분포(Typical Distribution for Lifetimes of Objects)"이다.[^graph] 그래프를 살펴보면 수명이 짧은 객체의 수가 압도적으로 많은 반면, 수명이 긴 객체의 수가 매우 적다는 것을 알 수 있다. 애플리케이션에 따라 모양이 다르긴 하지만 수많은 애플리케이션이 이러한 형태를 이루고 있다고 한다. 즉 대부분의 객체는 생겨나고 얼마 되지 않아 죽으며(die young) 이러한 특성에 주목하면 효과적인 GC가 가능하다.

generational collection 기법을 쓰는 GC는 다음과 같이 작동한다.

* young generation
    * 객체 대부분이 생성될 때 이곳으로 들어간다(너무 커서 이 영역에 들어갈 수 없는 객체는 더 윗 세대로 들어간다).
    * 가득 차면 이 영역에서만 돌아가는 minor gc가 발생한다.
    * gc의 비용은 살아있는 객체의 수에 비례하므로, young gen의 gc는 효율적이다.
    * 살아남은 객체들 중 더 오래 쓸 것 같은 것들은 tenured generation으로 옮긴다.
* old generation
    * 이곳이 가득 차면 major gc가 발생한다.
    * major gc는 객체 수가 많으므로 minor gc보다 더 오래 걸린다.

참고: HTG-09 ~ HTG-12 는 old generation이라 하고, HTG-08 에서는 tenured generation 이라고 한다.


### generation은 어떤 모양으로 배치되어 있나

다음 그림은 Serial Collector의 generation 디폴트 배열을 보여준다.


```ascii-art
HTG-09 ~ 12
Default Arrangement of Generations in the Serial Collector

                          <-------------- Old -------------->
+------+---+---+---------+---------------------+-------------+
| Eden | S | S | Virtual |                     |   Virtual   |
+------+---+---+---------+---------------------+-------------+
 <------- Young -------->
S: Survivor
```

```ascii-art
HTG-08
Default Arrangement of Generations, Except for Parallel Collector and G1

                          <----------- Tenured ------------->
+------+---+---+---------+---------------------+-------------+
| Eden | S | S | Virtual |                     |   Virtual   |
+------+---+---+---------+---------------------+-------------+
 <------- Young -------->
S: Survivor
```

HTG-09 부터 Tenured가 Old로 바뀐 것으로 확인할 수 있다.

뿐만 아니라 이 그림은 제목도 바뀌었다.

* HTG-90 ~ 12: _Default Arrangement of Generations in the Serial Collector_
    * 시리얼 컬렉터의 기본 배열
* HTG-08: _Default Arrangement of Generations, Except for Parallel Collector and G1_
    * Generation의 기본 배열(병렬 컬렉터와 G1 컬렉터를 제외)

그 이유는 [Default Selection의 변화](#default-selections) 때문인 것으로 보인다. Java 9 부터는 G1이 기본 가비지 컬렉터로 설정되었기 때문이다.

### Survivor는 왜 두 개인가?

young gen은 Eden과 두 개의 Survivor로 이루어져 있다. 여기에서 중요한 것은 Survivor가 두 개라는 것이다. Survivor 영역은 서로 교대하면서 살아남은 객체가 옮겨가는 대상 영역이 된다. 따라서 Survivor 둘 중 하나는 반드시 깨끗하게 비워져 있어야 한다.

GC 작업이 끝나면 Eden과 Survivor 하나는 위와 같이 반드시 비워지게 되어 있다.
Survivor는 이후 역할을 바꾸게 되며, Survivor에서 다른 Survivor로 객체가 옮겨가는 일을 노화(aging)라 부른다.

이해를 돕기 위해 예를 들어 보자.

다음과 같이 Eden이 꽉 차게 되어 Minor GC가 발생하여, Eden과 Survivor 0의 살아있는 객체(A, B, C)를 이동시키게 되었다고 하자.

```ascii-art
Eden
+---------------------------+
| ( ) (   ) ( C ) (  ) (  ) |
+---------------------------+

Survivor 0              Survivor 1
+-------------------+   +-------------------+
| (A) (B) (  ) (  ) |   |                   |
+-------------------+   +-------------------+
```

다음과 같이 A, B, C 가 Survivor 1 로 복사된다.

```ascii-art
Eden
+---------------------------+
| ( ) (   ) ( C ) (  ) (  ) |
+---------------------------+

Survivor 0              Survivor 1
+-------------------+   +-------------------+
| (A) (B) (  ) (  ) |   | (A) (B) ( C )     |
+-------------------+   +-------------------+
```

그리고 Eden과 Survivor 0 을 깨끗하게 비운다.

```ascii-art
Eden
+---------------------------+
|                           |
+---------------------------+

Survivor 0              Survivor 1
+-------------------+   +-------------------+
|                   |   | (A) (B) ( C )     |
+-------------------+   +-------------------+
```

다음 Minor GC에서는 Survivor 0이 객체를 복사받는 입장이 되고, Survivor 1이 청소의 대상이 될 것이다. Survivor는 이렇게 서로 교대를 한다.

자세한 내용은 [[java-gc-eden-to-survivor]]{Minor GC - Eden에서 Survivor 영역으로} 문서를 참고.

## 측정하기

커맨드 라인 옵션 `-verbose:gc`를 사용하면 각 콜렉션에서 heap 및 gc에 대한 정보를 보여준다.

### Java 9 ~ 12

>
* [HTG-12](https://docs.oracle.com/en/java/javase/12/gctuning/garbage-collector-implementation.html#GUID-A24775AB-16A3-4B86-9963-76E5AC398A3E ), [HTG-11](https://docs.oracle.com/en/java/javase/11/gctuning/garbage-collector-implementation.html#GUID-A24775AB-16A3-4B86-9963-76E5AC398A3E ), [HTG-10](https://docs.oracle.com/javase/10/gctuning/garbage-collector-implementation.htm#JSGCT-GUID-A24775AB-16A3-4B86-9963-76E5AC398A3E ), [HTG-09](https://docs.oracle.com/javase/9/gctuning/garbage-collector-implementation.htm#JSGCT-GUID-A24775AB-16A3-4B86-9963-76E5AC398A3E )

`-Xlog`는 HotSpot JVM의 제너럴한 로깅 옵션이다. 즉 `gc`는 `-Xlog`의 태그이며, `-verbose:gc`는 `-Xlog:gc`의 알리아스다.

자세한 정보를 얻고 싶다면 `-Xlog:gc*`를 시도해 보자.


다음은 HTG-09 ~ 12 문서에 수록된 예제이다.

```
[15,651s][info ][gc] GC(36) Pause Young (G1 Evacuation Pause) 239M->57M(307M) (15,646s, 15,651s) 5,048ms
[16,162s][info ][gc] GC(37) Pause Young (G1 Evacuation Pause) 238M->57M(307M) (16,146s, 16,162s) 16,565ms
[16,367s][info ][gc] GC(38) Pause Full (System.gc()) 69M->31M(104M) (16,202s, 16,367s) 164,581ms
```

이 로그는 다음과 같은 형식을 따른다.

```
[언제][로그레벨][태그] GC(gc 아이디) GC유형 (GC원인) GC이전용량->GC이후용량(heap사이즈) (GC시작시간, 종료시간) 소요시간
```

위의 출력 결과를 보면 다음의 사실들을 알 수 있다.

* 첫번째 라인
    * GC id 번호는 36.
    * 사용되고 있었던 239M의 메모리를 청소하여, 57M 만큼 살아남았다.
    * heap 사이즈는 307M.
    * 소요시간은 5,048ms.
* 세번째 라인
    * GC id 번호는 38.
    * heap 사이즈가 104M로 조절되었다.
    * `System.gc()` 호출로 인한 GC 작업이다.

다음은 Java 12에서 Spring 애플리케이션을 돌려보면서 얻은 출력 결과의 일부이다.

```
[0.015s][info][gc] Using G1
[0.037s][info][gc] Periodic GC disabled
[0.444s][info][gc] GC(0) Pause Young (Normal) (G1 Evacuation Pause) 25M->6M(258M) 9.461ms

...중략...

[1.395s][info][gc] GC(1) Pause Young (Concurrent Start) (Metadata GC Threshold) 154M->11M(258M) 7.820ms
[1.395s][info][gc] GC(2) Concurrent Cycle
[1.406s][info][gc] GC(2) Pause Remark 17M->17M(67M) 4.928ms
[1.407s][info][gc] GC(2) Pause Cleanup 17M->17M(67M) 0.054ms
[1.407s][info][gc] GC(2) Concurrent Cycle 12.830ms
[1.673s][info][gc] GC(3) Pause Young (Normal) (G1 Evacuation Pause) 43M->12M(67M) 9.535ms
[1.957s][info][gc] GC(4) Pause Young (Normal) (G1 Evacuation Pause) 44M->14M(67M) 2.559ms
```


### Java 8

> [HTG-08](https://docs.oracle.com/javase/8/docs/technotes/guides/vm/gctuning/generations.html#sthref20 )

한편 HTG-08 에서는 출력 형식이 조금 다르다.

```
[GC 325407K->83000K(776768K), 0.2300771 secs]
[GC 325816K->83372K(776768K), 0.2454258 secs]
[Full GC 267628K->83769K(776768K), 1.8479984 secs]
```

다음은 내가 Java 8에서 Spring 애플리케이션을 돌려보면서 얻은 출력 결과의 일부이다.

```
[GC (Metadata GC Threshold)  188956K->36195K(494080K), 0.0170272 secs]
[Full GC (Metadata GC Threshold)  36195K->33146K(560128K), 0.1685522 secs]
```

* 더 자세한 내용을 보고 싶다면 `-XX:+PrintGCDetails` 옵션을 쓰자.
* GC 발생 타임 스탬프를 보고 싶다면 `-XX:+PrintGCTimeStamps` 옵션을 쓰자.

## Serial GC에 영향을 주는 요소들

> [HTG-12](https://docs.oracle.com/en/java/javase/12/gctuning/factors-affecting-garbage-collection-performance.html#GUID-5508674B-F32D-4B02-9002-D0D8C7CDDC75 ), [HTG-11](https://docs.oracle.com/en/java/javase/11/gctuning/factors-affecting-garbage-collection-performance.html#GUID-5508674B-F32D-4B02-9002-D0D8C7CDDC75 ), [HTG-10](https://docs.oracle.com/javase/10/gctuning/factors-affecting-garbage-collection-performance.htm#JSGCT-GUID-5508674B-F32D-4B02-9002-D0D8C7CDDC75 ), [HTG-09](https://docs.oracle.com/javase/9/gctuning/factors-affecting-garbage-collection-performance.htm#JSGCT-GUID-5508674B-F32D-4B02-9002-D0D8C7CDDC75 ), [HTC-08](https://docs.oracle.com/javase/8/docs/technotes/guides/vm/gctuning/sizing.html#sizing_generations )

주의: 이 항목에서는 주로 heap의 증가 및 축소, heap 레이아웃 및 기본값에 대해 Serial 컬렉션을 전제하고 설명한다. Parallel / G1 GC에는 잘 들어맞지 않을 수 있다.

### GC에 가장 큰 영향을 주는 것은 Heap의 total 사이즈

GC 성능에 가장 큰 영향을 미치는 요소는 사용 가능한 총 메모리이다.

generation이 꽉 찰 때 GC가 발생하기 때문에, 처리량(throughput)은 사용 가능한 메모리 양에 반비례한다.

다음 그림은 Committed 와 Virtual 공간을 나타낸 것이다.

```ascii-art
+------+---+---+---------+------------------+-------------------+
| Eden | S | S | Virtual |        Old       |       Virtual     |
+------+---+---+---------+------------------+-------------------+
 <- committed ->          <--- committed --->
 <-------------------- total ---------------------------------->
```

가상 머신을 초기화하면, 일단 heap의 전체 공간이 예약된다.

* 예약 공간의 크기는 `-Xmx` 옵션으로 지정할 수 있다.
    * `-Xmx` 로 위 그림의 **total** 영역의 크기를 지정할 수 있다.
    * `-Xms` 로 위 그림에서 **committed** 영역의 크기를 지정할 수 있다.
* `-Xms` 옵션의 값이 `-Xmx` 과 차이가 있다면, 즉 여유 공간이 있다면 예약된 모든 공간이 가상 머신에 커밋되지는 않는다.
    * 위 그림의 Virtual 영역이 바로 커밋되지 않은 여유 공간이다.
    * heap의 다른 영역들은 필요에 따라 크기가 더 커질 수 있다.
    * 상황에 따라 heap의 크기를 키우기 위해 에비된 공간이 virtual 영역.

`-XX:NewRatio` 옵션은 young gen과 old gen의 상대적인 크기를 조절한다.

```ascii-art
+------+---+---+---------+------------------+-------------------+
| Eden | S | S | Virtual |        Old       |       Virtual     |
+------+---+---+---------+------------------+-------------------+
 <-------- Young -------> <-------------- Old ----------------->
```

가상 머신은 각 heap 사이즈를 조절해서 설정된 free 메모리의 비율을 유지하려 한다.

64bit Solaris OS의 경우 heap 사이즈와 관련된 기본값은 다음과 같다.

| Option                 | Server JVM Default Value | 단위    |
|------------------------|--------------------------|---------|
| `-XX:MinHeapFreeRatio` | 40                       | percent |
| `-XX:MaxHeapFreeRatio` | 70                       | percent |
| `-Xms`                 | 6656                     | KB      |
| `-Xmx`                 | calculated               | KB      |

`-XX:MinHeapFreeRatio`의 값이 **40%**로 되어 있는데,
이렇게 설정하면 사용 가능한 공간이 40% 보다 줄었을 때 generation의 크기를 키워서 40% 이상을 유지하게 된다.

`-XX:MaxHeapFreeRatio`의 값이 **70%**인 것도 비슷하게 생각하면 된다.
이렇게 설정하면 사용 가능한 여유 공간이 70%를 초과했을 때, generation의 크기를 줄여서 70% 이하를 유지하게 하는 것이다.

한편 `-Xmx`를 보면 `calculated`라 되어 있는데, heap 사이즈의 디폴트 최대값은 JVM이 알아서 계산한다는 말이다.

Parallel Collector의 heap 사이즈는 좀 더 나중에 다루기로 한다.

서버 애플리케이션을 가동한다면, 다음 지침을 기억하고 따르도록 하자.

* 기본값은 매우 작다. 일시 정지 문제가 없다면, 가능한 큰 크기의 메모리를 가상 머신이 사용할 수 있도록 설정해준다.
* `-Xmx`와 `-Xms`를 같은 값으로 설정하면 가상 머신이 크기를 계산하고 결정하는 과정이 생략되기 때문에 예측 가능성이 높아진다.
    * 하지만, 적절하지 않은 값을 주면 좋지 못한 결과가 나올 수 있으므로 주의한다.
* 메모리 할당은 병렬(parallel)로 가능하기 때문에, 프로세서 수를 늘리는 만큼 메모리도 늘려주도록 한다.

실행 중 소비되는 최대 RAM 크기를 최소화하고 싶다면(Embedded 등에서) Java heap 사이즈를 최소화하는 방법을 사용할 수 있다.

다음은 heap 사이즈를 최소화하여 동적 공간을 절약하는 방법이다.

* heap 사이즈를 최소화한다(`-XX:MaxHeapFreeRatio` 값과 `-XX:MinHeapFreeRatio` 값을 낮춘다).
* `-XX:MaxHeapFreeRatio`를 `10`으로 설정했더니 `-XX:MinHeapFreeRatio`가 적절히 조절되어 성능 저하 없이 heap 사이즈를 줄였다는 사례가 있다.
    * 애플리케이션에 따라 다른 결과가 나올 수 있으므로, 여러 값을 설정해보며 테스트할 것.

* `-XX:-ShrinkHeapInSteps`를 지정하면 heap 크기를 `-XX:MaxHeapFreeRatio`를 통해 지정된 값으로 즉각적으로 줄인다.
    * 이 설정을 쓰면 성능이 저하될 수 있다.
    * 이 프로세스는 여러 차례의 GC 주기가 필요하다.
    * 기본적으로 Java 런타임은 Java heap을 단계적으로 목표값을 향해 줄여나가므로 필요성이 있는지 고려할 것.

### 두번째로 큰 영향을 주는 것은 young generation의 heap 비율

전체 heap 사이즈가 고정되어 있다고 치고 생각해보자.

마이너 GC는 young gen이 가득 찰 때마다 발생하기 때문에 young gen이 크면 클수록 마이너 GC가 더 드물게 발생하게 된다.

한편, young gen의 크기가 크다면 old gen은 크기가 작을 것이므로 메이저 GC가 더 자주 발생하게 된다.

```ascii-art
+-----------------------+-------+
|         Young         |  Old  |
+-----------------------+-------+
```

* Minor GC 빈도: ↓, Major GC 빈도: ↑


```ascii-art
+-------+-----------------------+
| Young |          Old          |
+-------+-----------------------+
```

* Minor GC 빈도: ↑, Major GC 빈도: ↓


기본적으로 Young gen의 크기는 `-XX:NewRatio`을 통해 비율로 조절할 수 있다.

예를 들어 `-XX:NewRatio=3`으로 설정하면 **young : old** 가 **1 : 3** 으로 조절된다.

```ascii-art
+-------+-------+-------+-------+
| Young |          Old          |
+-------+-------+-------+-------+
```

더 디테일하게 설정하고 싶다면 다음 옵션들을 사용하면 된다.

* `-XX:NewSize`: Young gen 크기의 최소값을 설정한다.
* `-XX:MaxNewSize`: Young gen 크기의 최대값을 설정한다.

Survivor 영역은 `-XX:SurvivorRatio` 옵션으로 설정할 수 있다.

예를 들어 `-XX:SurvivorRatio=6`으로 설정하면 **Eden : Survivor 하나**의 비율을 **6 : 1**으로 조절한다.

```ascii-art
.+----+----+----+----+----+----+----+----+
.|            Eden             | S0 | S1 |
.+----+----+----+----+----+----+----+----+
```

Survivor 영역이 너무 작으면 큰 객체를 Survivor 영역을 거치지 않고 그냥 old 영역으로 보내버리는 경우도 생긴다.

그리고 Survivor 영역이 너무 커도 별 의미가 없다.

GC가 실행될 때마다 가상 머신은 threshold 값을 선택하는데, 이 threshold 값은 old 영역으로 보낼 객체의 나이(복사된 횟수)라 할 수 있다.
그리고 이 값은 Survivor 영역에 남는 객체가 절반이 되도록 조절되기 때문이다.

* Java 9 ~ 12: `-Xlog:gc,age`를 사용하면 threshold 값과 new generation 객체들의 나이를 출력할 수 있다.
* Java 8: `XX:+PrintTenuringDistribution`를 사용해 threshold 값과 new generation 객체들의 나이를 출력할 수 있다.

64bit Solaris OS의 경우 기본값은 다음과 같다.


| Option            | Server JVM Default Value |
|-------------------|--------------------------|
| -XX:NewRatio      | 2                        |
| -XX:NewSize       | 1310 MB                  |
| -XX:MaxNewSize    | not limited              |
| -XX:SurvivorRatio | 8                        |

* Young gen의 최대 크기는 total heap의 최대 크기와 `XX:NewRatio`의 값을 통해 자동으로 계산된다.

다음은 서버 애플리케이션에 대한 지침이다.

* 가장 먼저 가상 머신에 제공할 수 있는 최대 heap 사이즈를 결정하도록 한다.
* Young gen 크기를 측정하며 설정해보고 최적의 설정을 찾도록 한다.
* 최대 heap 크기는 시스템 메모리 양보다 작아야 에러를 예방할 수 있다.
* total heap 사이즈가 고정값일 때, young gen 크기를 늘리려면 old gen 크기를 줄여야 한다.
* old gen은 모든 라이브 데이터를 갖고 있으면서도 10 ~ 20%의 여유 공간을 가질 수 있도록 충분히 크게 설정해준다.
* Young gen에 충분한 양의 메모리를 할당할 것.
* 할당은 병렬(parallel)로 할 수 있으므로, 프로세서를 추가했다면 Young gen 사이즈도 키워 주도록 한다.


## GC의 종류와 선택

> [HTG-12](https://docs.oracle.com/en/java/javase/12/gctuning/available-collectors.html#GUID-F215A508-9E58-40B4-90A5-74E29BF3BD3C ), [HTG-11](https://docs.oracle.com/en/java/javase/11/gctuning/available-collectors.html#GUID-F215A508-9E58-40B4-90A5-74E29BF3BD3C ), [HTG-10](https://docs.oracle.com/javase/10/gctuning/available-collectors.htm#JSGCT-GUID-F215A508-9E58-40B4-90A5-74E29BF3BD3C ), [HTG-09](https://docs.oracle.com/javase/9/gctuning/available-collectors.htm#JSGCT-GUID-C7B19628-27BA-4945-9004-EC0F08C76003 ), [HTC-08](https://docs.oracle.com/javase/8/docs/technotes/guides/vm/gctuning/collectors.html#sthref27 )

잘 모르겠다면 다음 지침을 읽고 테스트해 보도록 한다.

**애플리케이션의 일시 정지 시간 요구사항이 까다롭지 않은가?**

* 가상 머신이 알아서 GC를 선택하도록 한다. 하드웨어와 운영체제 환경에 따라 적절한 GC를 선택할 것이다.

**애플리케이션이 100MB 이하의 작은 데이터 셋을 다루는가?**

* `-XX:+UseSerialGC`를 써서 Serial GC를 사용한다.

**애플리케이션이 싱글 프로세서에서 실행되며, 일시 정지 시간이 길어도 괜찮은가?**

* `-XX:+UseSerialGC`를 써서 Serial GC를 사용한다.

**애플리케이션의 최고 성능이 가장 중요하고, 1초 이상의 일시 정지가 있어도 괜찮은가?**

* 가상 머신이 알아서 GC를 선택하도록 한다.
* 또는 `-XX:+UseParallelGC`를 설정해 Parallel GC를 사용한다.

**응답 시간이 처리량보다 중요하고, GC 일시 정지가 1초 미만이어야 하는가?**

* `-XX:+UseG1GC`를 설정해 G1GC를 사용한다.
* 또는 `-XX:+UseConcMarkSweepGC`를 설정해 CMS를 사용한다. (CMS는 JDK 8까지만 사용이 가능하다)

**응답 시간이 매우 중요하거나 매우 큰 heap을 사용하는가?**

* `-XX:UseZGC`를 설정해 ZGC를 사용한다. (ZGC는 JDK 11 부터 사용이 가능하다)

(참고: 이 지침은 GC 선택의 출발지점이라 할 수 있다. 열심히 테스트해보면서 찾아야 한다.)

위와 같이 설정했는데도 원하는 성능이 안 나온다면, 다음 방법을 시도해 보도록 한다.

* 목표에 맞게 heap 사이즈, generation 사이즈를 조절해 본다.
* 그래도 성능이 안 나오면 다른 GC를 써보도록 한다.
    * 동시성(concurrent) GC는 일시 정지 시간을 줄여준다.
    * 병렬(parallel) GC는 멀티 프로세서 하드웨어에서 전체 처리량(throughput)을 늘려준다.

### Serial Collector

Serial Collector는 싱글 스레드를 사용하여 GC 작업을 수행한다.

* 장점: 싱글 스레드이므로 스레드와 스레드 사이의 통신 오버헤드가 없다.
* 단점: 멀티 프로세서 하드웨어를 활용할 수 없다.

싱글 스레드 GC라 할 수 있다.
멀티 프로세서에서는 비효율적인 GC이지만, 100MB 정도로 작은 규모의 데이터셋을 사용하는 애플리케이션이라면 멀티 프로세서에서도 쓸만하다고 한다. Serial Collector는 VM이 운영체제와 하드웨어 환경에 따라 자동으로 선택하거나, `-XX:+UseSerialGC` 옵션으로 활성화할 수 있다.

함께 읽기: [[java-gc-serial-collector]]

### Parallel Collector

Parallel Collector는 throughput collector 라고 부르기도 한다.

* Parallel Collector와 Serial Collector의
    * 공통점: generational collector
    * 차이점: Parallel Collector는 멀티 스레드를 쓴다.

Parallel Collector는 Parallel Compaction을 사용해 병렬로 메이저 GC를 수행한다.

* `-XX:+UseParallelGC` 옵션을 쓰면 기본값으로 Parallel Compaction을 사용한다.
* `-XX:-UseParallelOldGC` 옵션을 쓰면 Parallel Compaction을 끌 수 있다.

Parallel GC는 HTG-10 까지는 "많은 heap 사이즈 및 하드웨어 조합에서 1초 이상의 일시 정지 시간이 나타난다"고 하였으나, HTG-11 부터는 그러한 언급이 사라졌다.

상세한 내용은 [[java-gc-parallel-collector]]{Parallel Collector} 문서를 참고할 것.

### Mostly Concurrent Collectors

동시성 GC를 사용할 때 알아둬야 할 점들.

* 동시성 GC들은 메이저 GC가 발생했을 때의 일시 정지 시간을 줄이기 위해 프로세서 자원을 사용한다.
    * 즉, 이 방식을 쓰면 애플리케이션이 쓸 수 있는 프로세서 자원이 줄어든다.
* N개의 프로세서를 가진 시스템에서 동시성 GC는 사용 가능한 프로세서의 $${K \over N}$$개를 사용한다($$1 \le K \le { N \over 4 }$$).
    * 예를 들어 사용 가능한 프로세서가 12개라면 1~3개를 GC에 사용하는 것이다.
* 동시성 작업을 위한 오버헤드가 발생할 수 밖에 없으므로, 동시성 GC를 사용할 때 GC를 위한 일시 정지 시간은 짧아지지만 애플리케이션의 처리량은 다른 GC에 비해 떨어지게 된다.

프로세서 코어가 둘 이상인 시스템에서는 GC 스레드와 애플리케이션 스레드가 각자 프로세서를 사용할 수 있으므로 애플리케이션이 거의 멈추지 않게 된다. 그러나 애플리케이션 처리에 사용 가능한 프로세서가 줄어들게 되므로 애플리케이션이 모든 프로세서 자원을 최대한 사용하고 있다면 애플리케이션의 속도가 떨어지게 된다.

* 프로세서의 수 N이 크면 클수록 GC에 쓰는 프로세서 자원의 비율이 줄어들게 되고, 동시성 GC의 이득이 향상된다.
* 동시성 GC는 싱글 프로세서 시스템에서는 아무런 이득이 없다.


#### G1 Garbage Collector

G1GC는 Garbage-First Garbage Collector를 줄여쓴 것이다.

G1은 많은 양의 메모리가 있는 멀티 프로세서 시스템을 위한 GC이다. 높은 처리량(throughput)을 달성하면서도 일시 정지 시간 목표를 높은 확률로 달성해내는 GC이다.

G1은 가상 머신이 하드웨어/운영체제를 참고하여 자동으로 선택하거나, `-XX:+UseG1GC` 옵션으로 활성화된다.

상세한 내용은 [[java-g1gc]]{G1GC} 문서를 참고할 것.

#### Concurrent Mark Sweep Collector

CMS Collector라고도 한다. CMS는 일시 정지 시간이 짧은 것을 선호하고 GC 작업과 프로세스 리소스를 공유할 수 있는 애플리케이션을 위한 GC이다.

CMS는 `-XX:+UseConcMarkSweepGC` 옵션으로 활성화할 수 있다.

**CMS는 JDK 9 부터는 사용되지 않는다.**

#### Z Garbage Collector

ZGC는 대기 시간이 낮은 확장 가능한(scalable low latency) GC이다.
ZGC는 모든 종류의 비싼 작업을 동시에(concurrently) 작업하며, 애플리케이션 스레드의 실행을 중지하지 않는다는 특징이 있다.

ZGC는 10ms 미만의 짧은 대기 시간이 필요하거나 테라 바이트 큐모의 매우 큰 heap을 사용하는 애플리케이션을 위한 GC이다.

**ZGC는 JDK 11부터 실험적으로 도입되었다.**

상세한 내용은 [[java-gc-zgc]]{ZGC} 문서를 참고할 것.

## 그 외의 고려할 사항들

> [HTG-12](https://docs.oracle.com/en/java/javase/12/gctuning/other-considerations.html#GUID-28448147-EC4C-4C94-9A54-54152AD21CB8 ), [HTG-11](https://docs.oracle.com/en/java/javase/11/gctuning/other-considerations.html#GUID-28448147-EC4C-4C94-9A54-54152AD21CB8 ), [HTG-10](https://docs.oracle.com/javase/10/gctuning/other-considerations.htm#JSGCT-GUID-28448147-EC4C-4C94-9A54-54152AD21CB8 ), [HTG-09](https://docs.oracle.com/javase/9/gctuning/other-considerations.htm#JSGCT-GUID-28448147-EC4C-4C94-9A54-54152AD21CB8 ), [HTC-08](https://docs.oracle.com/javase/8/docs/technotes/guides/vm/gctuning/considerations.html#sthref62 )


### Explicit Garbage Collection

* `System.gc()`를 사용한 명시적인 가비지 컬렉터 호출은 가급적이면 사용하지 않도록 한다.
* `-XX:+DisableExplicitGC`를 설정하면 `System.gc()` 호출을 무시하게 된다.

### Class Metadata

* JDK 8 부터는 Perm gen이 삭제되었고, 클래스 메타 데이터가 네이티브 메모리에 할당된다.
* 따라서 클래스 메타 데이터에 사용할 수 있는 네이티브 메모리의 양은 이론적으로는 무제한이다.
* `-XX:MaxMetaspaceSize` 옵션을 사용하면 클래스 메타 데이터에 사용되는 기본 메모리의 양을 최대로 늘릴 수 있다.


## 함께 읽기

* [[java-gc-eden-to-survivor]]{Minor GC - Eden에서 Survivor 영역으로}
* [[java-gc-serial-collector]]{Serial Collector}
* [[java-gc-parallel-collector]]{Parallel Collector}
* [[java-g1gc]]{G1GC}
* [[java-gc-zgc]]{ZGC}

## 참고문헌

* [JDK 12 Garbage Collection Tuning Guide](https://docs.oracle.com/en/java/javase/12/gctuning/introduction-garbage-collection-tuning.html )
* [JDK 11 Garbage Collection Tuning Guide](https://docs.oracle.com/en/java/javase/11/gctuning/introduction-garbage-collection-tuning.html )
* [JDK 10 Garbage Collection Tuning Guide](https://docs.oracle.com/javase/10/gctuning/introduction-garbage-collection-tuning.htm )
* [JDK 9 Garbage Collection Tuning Guide](https://docs.oracle.com/javase/9/gctuning/introduction-garbage-collection-tuning.htm )
* [JDK 8 Garbage Collection Tuning Guide](https://docs.oracle.com/javase/8/docs/technotes/guides/vm/gctuning/ )

## 주석

[^graph]: 정확히 어떤 환경에서 어떻게 측정했는지는 문서에 나와있지 않다.
