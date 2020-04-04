---
layout  : wiki
title   : Java 버전별 변경점
summary : 1996년 1.0 부터 2019년 12 까지
date    : 2019-09-11 21:14:23 +0900
updated : 2019-11-12 23:23:41 +0900
tag     : java
toc     : true
public  : true
parent  : [[Java]]
latex   : true
---
* TOC
{:toc}

## Java SE 13

2019-09-17 General Availability

* [JDK 13 What's new](https://www.oracle.com/technetwork/java/javase/13-relnote-issues-5460548.html#NewFeature )
* [JDK 13 Documentation](https://docs.oracle.com/en/java/javase/13/ )
* [JDK 13 (openjdk.java.net)](https://openjdk.java.net/projects/jdk/13/ )

## Java SE 12

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

## Java SE 11

[OpenJDK 11](https://openjdk.java.net/projects/jdk/11/ )

## Java SE 10

[OpenJDK 10](https://openjdk.java.net/projects/jdk/10/ )

* [JEP 286: Local-Variable Type Inference](https://openjdk.java.net/jeps/286 )

## Java SE 9

[2017-09 What's New in Oracle JDK 9](https://docs.oracle.com/javase/9/whatsnew/toc.htm#JSNEW-GUID-5B808B2F-E891-43CD-BF6E-78787E547071 )

[OpenJDK 9](https://openjdk.java.net/projects/jdk9/ )

* Project Jigsaw
* JShell

## Java SE 8

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

## Java SE 7

[2011-07-28](https://openjdk.java.net/projects/jdk7/ )

[Java SE 7 Update Release Notes](https://www.oracle.com/technetwork/java/javase/7u-relnotes-515228.html )

## Java SE 6

[2004-09-30 릴리즈](https://web.archive.org/web/20080207083457/http://www.sun.com/smi/Press/sunflash/2004-09/sunflash.20040930.1.xml )

[Highlights of Technology Changes in Java SE 6](https://www.oracle.com/technetwork/java/javase/features-141434.html )

## J2SE 5.0

[New Features and Enhancements J2SE 5.0](https://docs.oracle.com/javase/1.5.0/docs/relnotes/features.html )

* Generics
    * [(PDF) Making the future safe for the past: Adding Genericity to the Java(TM) Programming Language](http://homepages.inf.ed.ac.uk/wadler/gj/Documents/gj-oopsla.pdf )
    * [(PDF) GJ: Extending the Java TM programm](http://homepages.inf.ed.ac.uk/wadler/gj/Documents/gj-tutorial.pdf )
    * [(PDF) Adding Wildcards to the Java Programming Language](http://www.bracha.org/wildcards.pdf )

## J2SE 1.4

[2002-02-06 릴리즈](https://web.archive.org/web/20070815095726/http://www.sun.com/smi/Press/sunflash/2002-02/sunflash.20020206.5.xml )

## J2SE 1.3

[2000-05-08 릴리즈](https://web.archive.org/web/20070817053430/http://www.sun.com/smi/Press/sunflash/2000-05/sunflash.20000508.3.xml )

## J2SE 1.2

[1998-12-08 릴리즈](https://web.archive.org/web/20070816170028/http://www.sun.com/smi/Press/sunflash/1998-12/sunflash.981208.9.xml )

## JDK 1.1

[1997-02-19 릴리즈](https://web.archive.org/web/20080210044125/http://www.sun.com/smi/Press/sunflash/1997-02/sunflash.970219.0001.xml )

## JDK 1.0

[1996-01-23 릴리즈](https://web.archive.org/web/20070310235103/http://www.sun.com/smi/Press/sunflash/1996-01/sunflash.960123.10561.xml )

## 참고문헌

* [Java Programming Language Enhancements (JAVA SE 6)][java6-enhance]
* [Java version history (wikipedia)][wiki]

## 주석

[java6-enhance]: https://docs.oracle.com/javase/6/docs/technotes/guides/language/enhancements.html
[wiki]: https://en.wikipedia.org/wiki/Java_version_history

[^why-link]: 1.4 기능이지만 이 링크는 Java SE 6 documentation으로 연결되어 있는데, [Java Programming Language Enhancements][java6-enhance] 문서의 Enhancements in JDK v1.4 항목에 연결된 링크를 그대로 옮겼기 때문이다.
