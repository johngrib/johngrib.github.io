---
layout  : wiki
title   : Java GC 튜닝
summary :
date    : 2019-09-12 22:35:34 +0900
updated : 2019-09-15 15:40:03 +0900
tag     : java gc
toc     : true
public  : true
parent  : Java
latex   : true
---
* TOC
{:toc}

* 이 글은 Oracle의 "HotSpot Virtual Machine Garbage Collection Tuning Guide"의 Java 8 버전부터 12 버전까지의 문서를 읽고 정리한 문서입니다.
* 이 문서에서는 원본 문서의 이름을 "HTG"로 줄여 부르기로 한다. **H**otSpot Virtual Machine Garbage Collection **T**uning **G**uide.
    * HTG-08, HTG-12는 각각 Java 8 버전의 HTG와 Java 12 버전의 HTG를 말한다.


# Garbage Collector란 무엇인가?

* GC의 정의는 HTG-08 과 HTG-09 ~ HTG-12 가 미묘하게 다른데, 9 부터 generational collection을 사용하지 않는 G1GC가 기본값이 되었기 때문이다.

## Java 9 ~ 12

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

## Java 8

>
* [HTG-08](https://docs.oracle.com/javase/8/docs/technotes/guides/vm/gctuning/introduction.html#sthref3 )

GC는 메모리를 관리하는 도구이다. GC는 다음과 같은 작업을 한다.

* young generation에 객체를 할당하고, 오래된 객체를 old generation으로 프로모션한다.
* 동시(병렬) 마킹 단계(marking phase)를 통해 old generation에서 살아있는 객체를 찾는다. HotSpot VM은 토탈 Java heap 사용량이 기본 임계 값을 초과하게 되면 marking phase를 발동한다. 이에 대해서는 CMS(Concurrent Mark Sweep) Collector와 Garbage-First GC 문서를 참고할 것.
* 병렬 복사(copying) 작업을 통해 라이브 객체를 압축하여 사용 가능한 메모리를 복구한다. 이에 대해서는 Parallel Collector와 Garbage-First GC 문서를 참고할 것.

# Default Selections

## Java 9 ~ 12

>
* [HTG-12](https://docs.oracle.com/en/java/javase/12/gctuning/ergonomics.html ), [HTG-11](https://docs.oracle.com/en/java/javase/11/gctuning/ergonomics.html ), [HTG-10](https://docs.oracle.com/javase/10/gctuning/ergonomics.htm#JSGCT-GUID-DA88B6A6-AF89-4423-95A6-BBCBD9FAE781 ), [HTG-09](https://docs.oracle.com/javase/9/gctuning/ergonomics.htm#JSGCT-GUID-DA88B6A6-AF89-4423-95A6-BBCBD9FAE781 )

GC, heap 사이즈, 런타임 컴파일러 기본 셋팅은 다음과 같다.

* **Garbage-First(G1) collector**
* GC 스레드의 최대 갯수 한계는 heap 사이즈와 사용 가능한 CPU 자원에 따라 달라진다.
* 초기 heap 사이즈는 물리 메모리의 $${ 1 \over 64 }$$
* 최대 heap 사이즈는 물리 메모리의 $${1 \over 4}$$
* C1, C2를 같이 사용하는 계층화된 컴파일러(Tiered comiler)

## Java 8

>
* [HTG-08](https://docs.oracle.com/javase/8/docs/technotes/guides/vm/gctuning/ergonomics.html#sthref5 )

* **Throughput garbage collector** (The parallel collector를 이렇게도 부른다)
* 초기 heap 사이즈는 물리 메모리의 $${ 1 \over 64 }$$
* 최대 heap 사이즈는 물리 메모리의 $${1 \over 4}$$
* 서버 런타임 컴파일러

# Behavior-Based Tuning

>
* [HTG-12](https://docs.oracle.com/en/java/javase/12/gctuning/ergonomics.html#GUID-3D0BB91E-9BFF-4EBB-B523-14493A860E73 ), [HTG-11](https://docs.oracle.com/en/java/javase/11/gctuning/ergonomics.html#GUID-3D0BB91E-9BFF-4EBB-B523-14493A860E73 ), [HTG-10](https://docs.oracle.com/javase/10/gctuning/ergonomics.htm#JSGCT-GUID-3D0BB91E-9BFF-4EBB-B523-14493A860E73 ), [HTG-09](https://docs.oracle.com/javase/9/gctuning/ergonomics.htm#JSGCT-GUID-3D0BB91E-9BFF-4EBB-B523-14493A860E73 ), [HTG-08](https://docs.oracle.com/javase/8/docs/technotes/guides/vm/gctuning/ergonomics.html#sthref11 )

HotSpot VM GC는 두 가지 목표 중 하나를 우선적으로 달성하도록 설정할 수 있다.

* 최대 일시 정지 시간 최소화
* 애플리케이션 처리량 향상

**최대 일시 정지 시간 최소화 목표**

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

**처리량 향상 목표**

* 처리량은 GC에 소요된 시간과 애플리케이션 처리에 소요된 시간으로 측정한다.

이 목표는 다음 옵션으로 설정할 수 있다.

```
-XX:GCTimeRatio=<nnn>
```

* 이 설정은 GC 시간과 애플리케이션 시간의 비율을 $$ \frac{ 1 }{1 + nnn} $$로 설정한다.
* `-XX:GCTimeRatio=19`로 설정하면, $${ 1 \over 20 }$$ 이므로, 전체 시간의 5%가 GC 시간으로 조절된다.
* 처리량 목표를 달성하지 못하면 GC가 더 드물게 발생하게 만들기 위해 generation들의 사이즈가 늘어나게 된다.

**점진적 목표 달성**

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

# Generational Garbage Collection

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


## generational collection

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


## generation은 어떤 모양으로 배치되어 있나

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

그 이유는 [Default Selection의 변화](#default-selections) 때문인 것으로 보인다. Java 9 부터는 G1이 기본 가비지 컬렉터로 설정되었기 때문이다. 조금 더 뒤에서 살펴보겠지만, G1은 generational collection을 사용하지 않는다.

## Survivor는 왜 두 개인가?

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

# 함께 읽기

* [[java-gc-eden-to-survivor]]{Minor GC - Eden에서 Survivor 영역으로}

# 참고문헌

* [JDK 12 Garbage Collection Tuning Guide](https://docs.oracle.com/en/java/javase/12/gctuning/introduction-garbage-collection-tuning.html )
* [JDK 11 Garbage Collection Tuning Guide](https://docs.oracle.com/en/java/javase/11/gctuning/introduction-garbage-collection-tuning.html )
* [JDK 10 Garbage Collection Tuning Guide](https://docs.oracle.com/javase/10/gctuning/introduction-garbage-collection-tuning.htm )
* [JDK 9 Garbage Collection Tuning Guide](https://docs.oracle.com/javase/9/gctuning/introduction-garbage-collection-tuning.htm )
* [JDK 8 Garbage Collection Tuning Guide](https://docs.oracle.com/javase/8/docs/technotes/guides/vm/gctuning/ )

# 주석

[^graph]: 정확히 어떤 환경에서 어떻게 측정했는지는 문서에 나와있지 않다.
