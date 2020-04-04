---
layout  : wiki
title   : ZGC, The Z Garbage Collector
summary : 작성중인 문서
date    : 2019-10-04 11:05:50 +0900
updated : 2019-10-15 17:31:28 +0900
tag     : java gc
toc     : true
public  : true
parent  : [[garbage-collection]]
latex   : false
---
* TOC
{:toc}

## 개요

>
The Z Garbage Collector, also known as ZGC, is a scalable low-latency garbage collector.[^jep-333]

ZGC는 확장 가능한 낮은 레이턴시의 GC이다.

* Low Latency: GC 일시 정지 시간이 10ms 미만이다.
* Scalable: heap 사이즈나 라이브셋의 사이즈가 커져도 일시 정지 시간이 늘어나지 않는다.

## ZGC의 목표

>
* GC pause times should not exceed 10ms
* Handle heaps ranging from relatively small (a few hundreds of megabytes) to very large (many terabytes) in size
* No more than 15% application throughput reduction compared to using G1
* Lay a foundation for future GC features and optimizations leveraging colored pointers and load barriers
* Initially supported platform: Linux/x64[^jep-333]

간단히 번역해 보자면 다음과 같다.

* GC 일시 정지 시간이 10ms를 초과하지 않아야 한다.
* 비교적 작은(수백 MB) 크기에서 매우 큰(수 TB) 사이즈의 heap을 다룰 수 있어야 한다.
* G1 보다 애플리케이션 처리량이 15% 이상 떨어지지 않을 것.
* colored pointers, load barriers를 사용하여 미래의 GC를 위한 기능/최적화 기반을 마련한다.
* 최초 지원 플랫폼은 Linux/x64.

즉 ZGC의 목표는 G1보다 더 짧은 latency를 가지면서 G1보다 크게 뒤쳐지지 않는 처리량을 갖는 것이다.

ZGC를 개발한 이유에 대해 더 자세히 알아보자.

>
Garbage collection is one of Java's main strengths. However, when garbage collection pauses become too long they start to affect application response times negatively. By removing or drastically reducing the length of GC pauses, we'll make Java a more attractive platform for an even wider set of applications.

Furthermore, the amount of memory available in modern systems continues to grow. Users and application developers expect the JVM to be equipped to take full advantage of this memory in an efficient manner, and without long GC pause times.

두 가지로 요약할 수 있다.

* GC 일시 정지를 최소화한다.
* 대량의 메모리를 최대한 효율적으로 사용하는 GC의 개발.

## 어떻게 사용하는가?

(참고: 세 버전의 튜닝 가이드([Java SE 11][java11], [Java SE 12][java12], [Java SE 13][java13])의 ZGC 항목이 동일하다.)

ZGC는 대기 시간이 낮은 확장 가능한(scalable low latency) GC이다. ZGC는 모든 종류의 비싼 작업을 동시에(concurrently) 작업하며, 애플리케이션 스레드의 실행을 중지하지 않는다는 특징이 있다.

ZGC는 10ms 미만의 짧은 대기 시간이 필요하거나 테라 바이트 큐모의 매우 큰 heap을 사용하는 애플리케이션을 위한 GC이다.

**ZGC는 JDK 11부터 실험적으로 도입되었다.**

ZGC는 JDK 11, 12, 13에서 `-XX:+UnlockExperimentalVMOptions XX:+UseZGC` 두 옵션을 켜서 활성화할 수 있다.

ZGC 튜닝에서 가장 중요한 것은 `-Xmx`로 설정할 수 있는 최대 힙 크기이다. ZGC는 동시 콜렉터이기 때문에,

1. heap이 애플리케이션의 라이브셋을 수용할 수 있고,
1. heap에서 GC가 돌아가는 동안 할당을 처리할 수 있을만큼의 충분한 여유 공간이 있어야 한다.

일반적으로 ZGC는 메모리가 많으면 많을수록 좋다고 한다.

ZGC 튜닝에서 두 번째로 중요한 것은 동시에 가동하는 GC 스레드의 수이다. `-XX:ConcGCThreads`로 설정할 수 있으며, ZGC는 휴리스틱을 통해 이 값을 자동으로 선택한다. 다만, 이 값이 너무 크면 GC가 애플리케이션의 CPU 시간을 다 빼앗아버리므로 처리량이 떨어진다. 반면 이 값이 너무 작으면 쓰레기 수거보다 쓰레기가 쌓이는 속도가 더 빠를 수 있다.



# 테스트 결과

한편 ZGC project의 리드인 Per Liden이 [FOSDEM 2018에서 발표한 자료][ZGC-FOSDEM-2018]를 보면 SPECjbb에서 2015년에 수행한 테스트 결과가 실려 있다.

![compare1]( /post-img/java-gc-zgc/zgc-compare1.jpg )

* 레이턴시에 대한 요구 조건이 있는 상황에서도 ZGC의 처리량이 G1보다 괜찮았다.

![compare2]( /post-img/java-gc-zgc/zgc-compare2.jpg )

* 일시 정지 시간도 압도적으로 짧았다.




# 참고문헌

* 웹 문서
    * [JEP 333: ZGC: A Scalable Low-Latency Garbage Collector (Experimental)][jep-333]
    * [HotSpot Virtual Machine Garbage Collection Tuning Guide(Java SE 11)][java11]
    * [HotSpot Virtual Machine Garbage Collection Tuning Guide(Java SE 12)][java12]
    * [HotSpot Virtual Machine Garbage Collection Tuning Guide(Java SE 13)][java13]
    * [The Z Garbage Collector An Introduction][ZGC-FOSDEM-2018]
    * [The Design of ZGC][design-of-zgc]
    * [CFV: New Project: ZGC][mail-new-project-zgc]
* 동영상
    * [The Z Garbage Collector (ZGC): Low Latency in JDK 11 with Per Liden](https://www.youtube.com/watch?v=7k_XfLGu-Ts )

# 주석

[wiki-main]: https://wiki.openjdk.java.net/display/zgc/Main
[jep-333]: https://openjdk.java.net/jeps/333
[java11]: https://docs.oracle.com/en/java/javase/11/gctuning/z-garbage-collector1.html
[java12]: https://docs.oracle.com/en/java/javase/12/gctuning/z-garbage-collector1.html
[java13]: https://docs.oracle.com/en/java/javase/13/gctuning/z-garbage-collector1.html
[ZGC-FOSDEM-2018]: http://cr.openjdk.java.net/~pliden/slides/ZGC-FOSDEM-2018.pdf
[design-of-zgc]: http://cr.openjdk.java.net/~pliden/slides/ZGC-PLMeetup-2019.pdf
[mail-new-project-jgc]: http://mail.openjdk.java.net/pipermail/announce/2017-October/000237.html

[^jep-333]: [JEP 333: ZGC: A Scalable Low-Latency Garbage Collector (Experimental)][jep-333]
[^goals]: [The Design of ZGC][design-of-zgc]. 4쪽.

