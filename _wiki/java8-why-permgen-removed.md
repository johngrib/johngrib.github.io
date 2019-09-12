---
layout  : wiki
title   : JDK 8에서 Perm 영역은 왜 삭제됐을까
summary : 
date    : 2019-09-12 14:06:08 +0900
updated : 2019-09-12 15:55:29 +0900
tag     : java
toc     : true
public  : true
parent  : Java
latex   : false
---
* TOC
{:toc}

# 요약

* JDK 8부터 Permanent Heap 영역이 제거되었다.
    * 대신 Metaspace 영역이 추가되었다.
    * Perm은 JVM에 의해 크기가 강제되던 영역이다.
* Metaspace는 Native memory 영역으로, OS가 자동으로 크기를 조절한다.
    * 옵션으로 Metaspace의 크기를 줄일 수도 있다.
* 그 결과 기존과 비교해 큰 메모리 영역을 사용할 수 있게 되었다.
    * Perm 영역 크기로 인한 `java.lang.OutOfMemoryError`를 더 보기 힘들어진다.


# JDK 8: PermGen 제거

[What's New in JDK 8](https://www.oracle.com/technetwork/java/javase/8-whats-new-2157071.html )문서를 보면 HotSpot 항목에서 다음 문장을 찾을 수 있다.

>
Removal of PermGen.

## 7과 8의 비교

"JVM Performance Optimizing 및 성능분석 사례"에서는 7과 8의 HotSpot JVM 구조를 비교하고 있다.[^compare]

Java7 까지의 HotSpot JVM 구조를 보자.

```ascii-art
<----- Java Heap ----->             <--- Native Memory --->
+------+----+----+-----+-----------+--------+--------------+
| Eden | S0 | S1 | Old | Permanent | C Heap | Thread Stack |
+------+----+----+-----+-----------+--------+--------------+
                        <--------->
                       Permanent Heap
S0: Survivor 0
S1: Survivor 1
```

그리고 Java 8 HotSpot JVM 구조를 보자.

```ascii-art
<----- Java Heap -----> <--------- Native Memory --------->
+------+----+----+-----+-----------+--------+--------------+
| Eden | S0 | S1 | Old | Metaspace | C Heap | Thread Stack |
+------+----+----+-----+-----------+--------+--------------+
```

7에서 Java Heap과 Perm 영역은 다음과 같은 역할을 한다.

* Java Heap
    * PermGen에 있는 클래스의 인스턴스 저장.
    * `-Xms`(min), `-Xmx`(max)로 사이즈 조정.
* PermGen
    * 클래스와 메소드의 메타데이터 저장.
    * 상수 풀 정보.
    * JVM, JIT 관련 데이터.
    * `-XX:PermSize`(min), `-XX:MaxPermSize`(max)로 사이즈 조정.

책에서는 Perm 영역의 역할에 대해 다음과 같이 설명한다.

>
Perm 영역은 보통 Class의 Meta 정보나 Method의 Meta 정보, Static 변수와 상수 정보들이 저장되는 공간으로 흔히 메타데이터 저장 영역이라고도 한다.
이 영역은 Java 8 부터는 Native 영역으로 이동하여 Metaspace 영역으로 변경되었다.
(다만, 기존 Perm 영역에 존재하던 Static Object는 Heap 영역으로 옮겨져서 GC의 대상이 최대한 될 수 있도록 하였다)


변경된 사항을 표로 정리하면 다음과 같다.

|                          | Java 7                                | Java 8                                          |
|--------------------------|---------------------------------------|-------------------------------------------------|
| Class 메타 데이터        | 저장                                  | 저장                                            |
| Method 메타 데이터       | 저장                                  | 저장                                            |
| Static Object 변수, 상수 | 저장                                  | Heap 영역으로 이동                              |
| 메모리 튜닝              | Heap, Perm 영역 튜닝                  | Heap 튜닝, Native 영역은 OS가 동적 조정         |
| 메모리 옵션              | `-XX:PermSize` <br> `-XX:MaxPermSize` | `-XX:MetaspaceSize` <br> `-XX:MaxMetaspaceSize` |

## 왜 Perm이 제거됐고 Metaspace 영역이 추가된 것인가?

>
최근 Java 8에서 JVM 메모리 구조적인 개선 사항으로 Perm 영역이 Metaspace 영역으로 전환되고 기존 Perm 영역은 사라지게 되었다.
Metaspace 영역은 Heap이 아닌 Native 메모리 영역으로 취급하게 된다.
(Heap 영역은 JVM에 의해 관리된 영역이며, Native 메모리는 OS 레벨에서 관리하는 영역으로 구분된다)
Metaspace가 Native 메모리를 이용함으로서 개발자는 영역 확보의 상한을 크게 의식할 필요가 없어지게 되었다.

즉, 각종 메타 정보를 OS가 관리하는 영역으로 옮겨 Perm 영역의 사이즈 제한을 없앤 것이라 할 수 있다.

영역의 크기를 확인해 보자.

[[sdkman]]을 사용해 1.7로 전환한 다음, 다음과 같이 버전을 확인하고 PermSize를 알아보았다.

```sh
$ java -version
openjdk version "1.7.0_232"
OpenJDK Runtime Environment (Zulu 7.31.0.5-CA-macosx) (build 1.7.0_232-b6)
OpenJDK 64-Bit Server VM (Zulu 7.31.0.5-CA-macosx) (build 24.232-b6, mixed mode)

$ java -XX:+PrintFlagsFinal -version -server | grep PermSize
    uintx AdaptivePermSizeWeight                    = 20              {product}
    uintx MaxPermSize                               = 85983232        {pd product}
    uintx PermSize                                  = 21757952        {pd product}
openjdk version "1.7.0_232"
OpenJDK Runtime Environment (Zulu 7.31.0.5-CA-macosx) (build 1.7.0_232-b6)
OpenJDK 64-Bit Server VM (Zulu 7.31.0.5-CA-macosx) (build 24.232-b6, mixed mode)
```

내 컴퓨터에서 아무런 커스텀 설정 없이 돌린 결과 `MaxPermSize`는 85,983,232 byte 이다. 즉 82 MB 정도 된다.

그리고 1.8로 전환한 다음, MetaspaceSize를 알아보았다.

```sh
$ java -version
openjdk version "1.8.0_222"
OpenJDK Runtime Environment (Zulu 8.40.0.25-CA-macosx) (build 1.8.0_222-b10)
OpenJDK 64-Bit Server VM (Zulu 8.40.0.25-CA-macosx) (build 25.222-b10, mixed mode)

$ java -XX:+PrintFlagsFinal -version -server | grep MetaspaceSize
    uintx InitialBootClassLoaderMetaspaceSize       = 4194304                             {product}
    uintx MaxMetaspaceSize                          = 18446744073709547520                    {product}
    uintx MetaspaceSize                             = 21807104                            {pd product}
openjdk version "1.8.0_222"
OpenJDK Runtime Environment (Zulu 8.40.0.25-CA-macosx) (build 1.8.0_222-b10)
OpenJDK 64-Bit Server VM (Zulu 8.40.0.25-CA-macosx) (build 25.222-b10, mixed mode)
```

내 컴퓨터에서 아무런 커스텀 설정 없이 돌린 결과 `MaxMetaspaceSize`는 18,446,744,073,709,547,520 byte 이다. 즉 17,592,186,044,415 MB 정도 된다.

이 크기는 64 비트 프로세서가 취급할 수 있는 메모리 상한에 가깝다고 한다.

`-XX:MaxMetaspaceSize` 옵션을 사용하면 이 크기를 줄이는 것도 가능하다.

# 참고문헌

* 도서
    * JVM Performance Optimizing 및 성능분석 사례 / 류길현, 오명훈, 한승민 저 / 엑셈 / 초판 1쇄 2017년 09월 10일
* 웹
    * [JEP 122: Remove the Permanent Generation](https://openjdk.java.net/jeps/122 )
    * [About G1 Garbage Collector, Permanent Generation and Metaspace](https://blogs.oracle.com/poonam/about-g1-garbage-collector%2c-permanent-generation-and-metaspace )
    * [PermGen Elimination project is promoting](http://mail.openjdk.java.net/pipermail/hotspot-dev/2012-September/006679.html )
    * [java.lang.OutOfMemoryError: PermGen space patterns](http://javaeesupportpatterns.blogspot.com/2011/02/outofmemoryerror-permgen-patterns-part1.html )

# 주석

[^compare]: JVM Performance Optimizing 및 성능분석 사례, 1) Hotspot JVM의 Heap 구조, 20쪽.
