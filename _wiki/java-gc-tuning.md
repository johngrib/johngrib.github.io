---
layout  : wiki
title   : Java GC 튜닝
summary : 
date    : 2019-09-12 22:35:34 +0900
updated : 2019-09-14 23:32:39 +0900
tag     : java gc
toc     : true
public  : true
parent  : Java
latex   : true
---
* TOC
{:toc}


# Garbage Collector란 무엇인가?

## Java 9 ~ 12

>
* [Java 12](https://docs.oracle.com/en/java/javase/12/gctuning/introduction-garbage-collection-tuning.html ), [구글 번역](https://translate.google.co.kr/translate?hl=ko&sl=en&tl=ko&u=https%3A%2F%2Fdocs.oracle.com%2Fen%2Fjava%2Fjavase%2F12%2Fgctuning%2Fintroduction-garbage-collection-tuning.html )
* [Java 11](https://docs.oracle.com/en/java/javase/11/gctuning/introduction-garbage-collection-tuning.html ), [구글 번역](https://translate.google.co.kr/translate?hl=ko&sl=en&tl=ko&u=https%3A%2F%2Fdocs.oracle.com%2Fen%2Fjava%2Fjavase%2F11%2Fgctuning%2Fintroduction-garbage-collection-tuning.html )
* [Java 10](https://docs.oracle.com/javase/10/gctuning/introduction-garbage-collection-tuning.htm ), [구글 번역](https://translate.google.co.kr/translate?hl=ko&sl=en&tl=ko&u=https%3A%2F%2Fdocs.oracle.com%2Fjavase%2F10%2Fgctuning%2Fintroduction-garbage-collection-tuning.htm )
* [Java 9](https://docs.oracle.com/javase/9/gctuning/introduction-garbage-collection-tuning.htm ), [구글 번역](https://translate.google.co.kr/translate?hl=ko&sl=en&tl=ko&u=https%3A%2F%2Fdocs.oracle.com%2Fjavase%2F9%2Fgctuning%2Fintroduction-garbage-collection-tuning.htm )

GC는 애플리케이션의 동적 메모리 할당 요청을 자동으로 관리한다.

GC는 다음 작업을 통해 자동으로 동적 메모리를 관리한다.

* 운영 체제로부터 메모리를 받아 할당에 사용한다.
* 애플리케이션이 메모리를 요청하면 전달해 준다.
* 애플리케이션이 메모리의 어떤 부분을 사용 중인지 확인한다.
* 사용되지 않은 메모리를 회수하여 애플리케이션이 메모리를 재사용 할 수 있도록 한다.

Java HotSpot 가비지 수집기는 다음 방법들을 사용해 GC 효율을 향상시키려 한다.

* generational scavenging.
* 멀티 스레드를 사용해 병렬로 작업하거나, 애플리케이션이 돌아갈 때 백그라운드에서 작업한다.
* 라이브 오브젝트 압축.

## Java 8

>
* [Java 8](https://docs.oracle.com/javase/8/docs/technotes/guides/vm/gctuning/introduction.html#sthref3 ), [구글 번역](https://translate.google.co.kr/translate?hl=ko&sl=en&tl=ko&u=https%3A%2F%2Fdocs.oracle.com%2Fjavase%2F8%2Fdocs%2Ftechnotes%2Fguides%2Fvm%2Fgctuning%2Fintroduction.html%23sthref3 )

GC는 메모리를 관리하는 도구이다. GC는 다음과 같은 작업을 한다.

* young generation에 객체를 할당하고, 오래된 객체를 old generation으로 프로모션한다.
* 동시(병렬) 마킹 단계(marking phase)를 통해 old generation에서 살아있는 객체를 찾는다. HotSpot VM은 토탈 Java heap 사용량이 기본 임계 값을 초과하게 되면 marking phase를 발동한다. 이에 대해서는 CMS(Concurrent Mark Sweep) Collector와 Garbage-First GC 문서를 참고할 것.
* 병렬 복사(copying) 작업을 통해 라이브 객체를 압축하여 사용 가능한 메모리를 복구한다. 이에 대해서는 Parallel Collector와 Garbage-First GC 문서를 참고할 것.

# Default Selections

## Java 9 ~ 12

>
* [Java 12](https://docs.oracle.com/en/java/javase/12/gctuning/ergonomics.html ), [구글 번역](https://docs.oracle.com/en/java/javase/12/gctuning/ergonomics.html )
* [Java 11](https://docs.oracle.com/en/java/javase/11/gctuning/ergonomics.html ), [구글 번역](https://translate.google.co.kr/translate?hl=ko&sl=en&tl=ko&u=https%3A%2F%2Fdocs.oracle.com%2Fen%2Fjava%2Fjavase%2F11%2Fgctuning%2Fergonomics.html )
* [Java 10](https://docs.oracle.com/javase/10/gctuning/ergonomics.htm#JSGCT-GUID-DA88B6A6-AF89-4423-95A6-BBCBD9FAE781 ), [구글 번역](https://translate.google.co.kr/translate?hl=ko&sl=en&tl=ko&u=https%3A%2F%2Fdocs.oracle.com%2Fjavase%2F10%2Fgctuning%2Fergonomics.htm%23JSGCT-GUID-DA88B6A6-AF89-4423-95A6-BBCBD9FAE781 )
* [Java 9](https://docs.oracle.com/javase/9/gctuning/ergonomics.htm#JSGCT-GUID-DA88B6A6-AF89-4423-95A6-BBCBD9FAE781 ), [구글 번역](https://translate.google.co.kr/translate?hl=ko&sl=en&tl=ko&u=https%3A%2F%2Fdocs.oracle.com%2Fjavase%2F9%2Fgctuning%2Fergonomics.htm%23JSGCT-GUID-DA88B6A6-AF89-4423-95A6-BBCBD9FAE781 )

GC, heap 사이즈, 런타임 컴파일러 기본 셋팅은 다음과 같다.

* **Garbage-First(G1) collector**
* GC 스레드의 최대 갯수 한계는 heap 사이즈와 사용 가능한 CPU 자원에 따라 달라진다.
* 초기 heap 사이즈는 물리 메모리의 $${ 1 \over 64 }$$
* 최대 heap 사이즈는 물리 메모리의 $${1 \over 4}$$
* C1, C2를 같이 사용하는 계층화된 컴파일러(Tiered comiler)

## Java 8

>
* [Java 8](https://docs.oracle.com/javase/8/docs/technotes/guides/vm/gctuning/ergonomics.html#sthref5 ), [구글 번역](https://translate.google.co.kr/translate?hl=ko&sl=en&tl=ko&u=https%3A%2F%2Fdocs.oracle.com%2Fjavase%2F8%2Fdocs%2Ftechnotes%2Fguides%2Fvm%2Fgctuning%2Fergonomics.html%23sthref5 )

* **Throughput garbage collector** (The parallel collector를 이렇게도 부른다)
* 초기 heap 사이즈는 물리 메모리의 $${ 1 \over 64 }$$
* 최대 heap 사이즈는 물리 메모리의 $${1 \over 4}$$
* 서버 런타임 컴파일러

# Behavior-Based Tuning

## Java 8 ~ 12

>
* [Java 12](https://docs.oracle.com/en/java/javase/12/gctuning/ergonomics.html#GUID-3D0BB91E-9BFF-4EBB-B523-14493A860E73 ), [구글 번역](https://translate.google.co.kr/translate?hl=ko&sl=en&tl=ko&u=https%3A%2F%2Fdocs.oracle.com%2Fen%2Fjava%2Fjavase%2F12%2Fgctuning%2Fergonomics.html%23GUID-3D0BB91E-9BFF-4EBB-B523-14493A860E73 )
* [Java 11](https://docs.oracle.com/en/java/javase/11/gctuning/ergonomics.html#GUID-3D0BB91E-9BFF-4EBB-B523-14493A860E73 ), [구글 번역](https://translate.google.co.kr/translate?hl=ko&sl=en&tl=ko&u=https%3A%2F%2Fdocs.oracle.com%2Fen%2Fjava%2Fjavase%2F11%2Fgctuning%2Fergonomics.html%23GUID-3D0BB91E-9BFF-4EBB-B523-14493A860E73 )
* [Java 10](https://docs.oracle.com/javase/10/gctuning/ergonomics.htm#JSGCT-GUID-3D0BB91E-9BFF-4EBB-B523-14493A860E73 ), [구글 번역](https://translate.google.co.kr/translate?hl=ko&sl=en&tl=ko&u=https%3A%2F%2Fdocs.oracle.com%2Fjavase%2F10%2Fgctuning%2Fergonomics.htm )
* [Java 9](https://docs.oracle.com/javase/9/gctuning/ergonomics.htm#JSGCT-GUID-3D0BB91E-9BFF-4EBB-B523-14493A860E73 ), [구글 번역](https://translate.google.co.kr/translate?hl=ko&sl=en&tl=ko&u=https%3A%2F%2Fdocs.oracle.com%2Fjavase%2F9%2Fgctuning%2Fergonomics.htm%23JSGCT-GUID-3D0BB91E-9BFF-4EBB-B523-14493A860E73 )
* [Java 8](https://docs.oracle.com/javase/8/docs/technotes/guides/vm/gctuning/ergonomics.html#sthref11 ), [구글 번역](https://translate.google.co.kr/translate?hl=ko&sl=en&tl=ko&u=https%3A%2F%2Fdocs.oracle.com%2Fjavase%2F8%2Fdocs%2Ftechnotes%2Fguides%2Fvm%2Fgctuning%2Fergonomics.html%23sthref11 )

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
* GC가 사용할 수 있는 최소/최대 heap 사이즈는 다음 옵션으로 설정할 수 있다.(Java 9 ~ 12)

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

# 참고문헌

* [JDK 12 Garbage Collection Tuning Guide](https://docs.oracle.com/en/java/javase/12/gctuning/introduction-garbage-collection-tuning.html )
* [JDK 11 Garbage Collection Tuning Guide](https://docs.oracle.com/en/java/javase/11/gctuning/introduction-garbage-collection-tuning.html )
* [JDK 10 Garbage Collection Tuning Guide](https://docs.oracle.com/javase/10/gctuning/introduction-garbage-collection-tuning.htm )
* [JDK 9 Garbage Collection Tuning Guide](https://docs.oracle.com/javase/9/gctuning/introduction-garbage-collection-tuning.htm )
* [JDK 8 Garbage Collection Tuning Guide](https://docs.oracle.com/javase/8/docs/technotes/guides/vm/gctuning/ )

