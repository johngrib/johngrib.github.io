---
layout  : wiki
title   : Java 버전별 변경점
summary : 1996년 1.0 부터 2019년 12 까지
date    : 2019-09-11 21:14:23 +0900
updated : 2021-02-14 17:32:22 +0900
tag     : java
toc     : true
public  : true
parent  : [[Java]]
latex   : true
---
* TOC
{:toc}

## JDK 15

[Consolidated JDK 15 Release Notes]( https://www.oracle.com/java/technologies/javase/15all-relnotes.html )

## JDK 14

[Release Notes for JDK 14 and JDK 14 Update Releases]( https://www.oracle.com/java/technologies/javase/14all-relnotes.html )

## JDK 13

2019-09-17 General Availability

[Release Notes for JDK 13 and JDK 13 Update Releases]( https://www.oracle.com/java/technologies/javase/13all-relnotes.html )

* [JDK 13 What's new](https://www.oracle.com/technetwork/java/javase/13-relnote-issues-5460548.html#NewFeature )
* [JDK 13 Documentation](https://docs.oracle.com/en/java/javase/13/ )
* [JDK 13 (openjdk.java.net)](https://openjdk.java.net/projects/jdk/13/ )

## JDK 12

[Release Notes for JDK 12 and JDK 12 Update Releases]( https://www.oracle.com/java/technologies/javase/12all-relnotes.html )

[OpenJDK 12](https://openjdk.java.net/projects/jdk/12/ )

* [Shenandoah: A Low-Pause-Time Garbage Collector (Experimental)](https://openjdk.java.net/jeps/189 )
* [Microbenchmark Suite](https://openjdk.java.net/jeps/230 )
* [[java-switch-expression]]{Switch Expressions (Preview)}
* [JVM Constants API](https://openjdk.java.net/jeps/334 )
* [One AArch64 Port, Not Two](https://openjdk.java.net/jeps/340 )
* [Default CDS Archives](https://openjdk.java.net/jeps/341 )
* [Abortable Mixed Collections for G1](https://openjdk.java.net/jeps/344 )
* [Promptly Return Unused Committed Memory from G1](https://openjdk.java.net/jeps/346 )

### Shenandoah GC

* [Shenandoah GC](https://wiki.openjdk.java.net/display/shenandoah/Main )

## JDK 11

[2018-09-25 Consolidated JDK 11 Release Notes]( https://www.oracle.com/java/technologies/javase/11all-relnotes.html )

[OpenJDK 11](https://openjdk.java.net/projects/jdk/11/ )

- 발표 주기 변경 후 최초의 LTS 버전

## JDK 10

[2018-03-20 JDK 10 Release Notes]( https://www.oracle.com/java/technologies/javase/10-relnote-issues.html )

[OpenJDK 10](https://openjdk.java.net/projects/jdk/10/ )

- 로컬 변수 추론 기능
    - [JEP 286: Local-Variable Type Inference](https://openjdk.java.net/jeps/286 )
- 가비지 컬렉터 개선
    - [JDK-8172890 : JEP 307: Parallel Full GC for G1]( https://bugs.java.com/bugdatabase/view_bug.do?bug_id=JDK-8172890 )

## 자바 버전 6개월 주기 업그레이드 결정

[Update and FAQ on the Java SE Release Cadence]( https://blogs.oracle.com/java-platform-group/update-and-faq-on-the-java-se-release-cadence )

## JDK 9

[2017-09 What's New in Oracle JDK 9](https://docs.oracle.com/javase/9/whatsnew/toc.htm#JSNEW-GUID-5B808B2F-E891-43CD-BF6E-78787E547071 )

[OpenJDK 9](https://openjdk.java.net/projects/jdk9/ )

* Project Jigsaw
* JShell

## JDK 8

[What's New in JDK 8](https://www.oracle.com/technetwork/java/javase/8-whats-new-2157071.html )

* Java Programming Language
    * [Lambda Expressions](https://docs.oracle.com/javase/specs/jls/se8/html/jls-15.html#jls-15.27 ).
    * [default methods](https://docs.oracle.com/javase/specs/jls/se8/html/jls-13.html#d5e19889 ).
    * ...
* Collections
    * `java.util.stream` 패키지 추가.
        * stream의 원소들에 함수형 스타일의 작업을 지원.
        * stream API는 Collections API에 통합.
    * [[java8-performance-improvement-for-hashmap]]{HashMap 퍼포먼스 향상}
* Date-Time Package
* IO, NIO
    * `java.lang.String(byte[], *)` 생성자 퍼포먼스 향상.
    * `java.lang.String.getBytes()` 메소드 퍼포먼스 향상.
    * ...
* `java.lang`, `java.util` 패키지
    * Parallel Array Sorting
    * ...
* HotSpot
    * [[java8-why-permgen-removed]]{Removal of PermGen}
* ...

## JDK 7

[2011-07-28](https://openjdk.java.net/projects/jdk7/ )

[Java SE 7 Update Release Notes](https://www.oracle.com/technetwork/java/javase/7u-relnotes-515228.html )

## JDK 6

[2004-09-30 릴리즈](https://web.archive.org/web/20080207083457/http://www.sun.com/smi/Press/sunflash/2004-09/sunflash.20040930.1.xml )

[Highlights of Technology Changes in Java SE 6](https://www.oracle.com/technetwork/java/javase/features-141434.html )

## JDK 5

[New Features and Enhancements J2SE 5.0](https://docs.oracle.com/javase/1.5.0/docs/relnotes/features.html )

- 언어 기능
    - Generics 추가
        - [(PDF) Making the future safe for the past: Adding Genericity to the Java(TM) Programming Language](http://homepages.inf.ed.ac.uk/wadler/gj/Documents/gj-oopsla.pdf )
        - [(PDF) GJ: Extending the Java TM programm](http://homepages.inf.ed.ac.uk/wadler/gj/Documents/gj-tutorial.pdf )
        - [(PDF) Adding Wildcards to the Java Programming Language](http://www.bracha.org/wildcards.pdf )
    - Enhanced for Loop
    - Autoboxing/Unboxing
    - Typesafe Enums
    - Varargs
    - Static Import
    - Metadata (Annotations)
- Virtual Machine
    - [Class Data Sharing]( https://docs.oracle.com/javase/1.5.0/docs/guide/vm/class-data-sharing.html )
    - [Garbage Collector Ergonomics]( https://docs.oracle.com/javase/1.5.0/docs/guide/vm/gc-ergonomics.html )
    - [Server-Class Machine Detection]( https://docs.oracle.com/javase/1.5.0/docs/guide/vm/server-class.html )
    - [Thread Priority Changes]( https://docs.oracle.com/javase/1.5.0/docs/guide/vm/thread-priorities.html )
- 성능 향상

## JDK 1.4

[2002-02-06 릴리즈](https://web.archive.org/web/20070815095726/http://www.sun.com/smi/Press/sunflash/2002-02/sunflash.20020206.5.xml )

- 성능 향상

## JDK 1.3

[2000-05-08 릴리즈](https://web.archive.org/web/20070817053430/http://www.sun.com/smi/Press/sunflash/2000-05/sunflash.20000508.3.xml )

- 성능 향상
    - Java HotSpot 포함
- JNDI (Java Naming and Directory Interface) 추가
- 그 외 여러가지

## JDK 1.2 (Java 2 SE)

[1998-12-08 릴리즈](https://web.archive.org/web/20070816170028/http://www.sun.com/smi/Press/sunflash/1998-12/sunflash.981208.9.xml )

- Java™ 2 Brand Unveiled
- 새로운 통합 아키텍처 Collection Framework!
- 퍼포먼스 향상
    - 로드된 클래스에 대한 메모리 압축
    - 더 빠른 메모리 할당 및 개선된 GC
    - 곧 출시될 Java HotSpot VM을 포함하여 다른 VM을 위한 플러그형 VM 아키텍처
    - 새로운 JIT(Just In Time) 컴파일러
    - JNI(Java Native Interface) 변환
- 향상된 JDBC 2.0
- 그 외 여러가지

## JDK 1.1

[1997-02-19 릴리즈](https://web.archive.org/web/20080210044125/http://www.sun.com/smi/Press/sunflash/1997-02/sunflash.970219.0001.xml )

- JavaBeans
- DB 연결을 위한 JDBC
- Unicode 2.0 표준을 기반으로 한 글로벌 언어 지원
- 개선된 AWT(GUI)

## JDK 1.0

[1996-01-23 릴리즈](https://web.archive.org/web/20070310235103/http://www.sun.com/smi/Press/sunflash/1996-01/sunflash.960123.10561.xml )

## 참고문헌

- [All JDK Release][all-enhance]
- [Java Programming Language Enhancements (JAVA SE 6)][java6-enhance]
- [Java version history (wikipedia)][wiki]

## 주석

[all-enhance]: https://www.oracle.com/java/technologies/javase/jdk-relnotes-index.html
[java6-enhance]: https://docs.oracle.com/javase/6/docs/technotes/guides/language/enhancements.html
[wiki]: https://en.wikipedia.org/wiki/Java_version_history

[^why-link]: 1.4 기능이지만 이 링크는 Java SE 6 documentation으로 연결되어 있는데, [Java Programming Language Enhancements][java6-enhance] 문서의 Enhancements in JDK v1.4 항목에 연결된 링크를 그대로 옮겼기 때문이다.
