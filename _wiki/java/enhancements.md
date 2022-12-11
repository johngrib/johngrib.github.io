---
layout  : wiki
title   : Java 버전별 변경점
summary : 1996년 1.0 부터 2022년 11월까지
date    : 2019-09-11 21:14:23 +0900
updated : 2022-12-11 23:03:29 +0900
tag     : java
resource: F7/24638D-3BAC-44BD-875C-F401971F22C3
toc     : true
public  : true
parent  : [[/java]]
latex   : true
---
* TOC
{:toc}

## 참고
### LTS에 대하여

[Oracle Java SE Support Roadmap]( https://www.oracle.com/java/technologies/java-se-support-roadmap.html ) 문서에 의하면 LTS는 Long Term Support의 약자로, 장기 지원 릴리스 의미한다.

>
**Oracle Java SE Product Releases**
>
Oracle provides Customers with Oracle Premier Support on Oracle Java SE products as described in the [Oracle Lifetime Support Policy](https://www.oracle.com/support/lifetime-support/ ).
For product releases after Java SE 8, Oracle will designate only certain releases as Long-Term-Support (LTS) releases.
Java SE 7, 8, 11 and 17 are LTS releases.
Oracle intends to make future LTS releases every two years meaning the next planned LTS release is Java 21 in September 2023.
For the purposes of Oracle Premier Support, non-LTS releases are considered a cumulative set of implementation enhancements of the most recent LTS release.
Once a new feature release is made available, any previous non-LTS release will be considered superseded.
For example, Java SE 9 was a non-LTS release and immediately superseded by Java SE 10 (also non-LTS), Java SE 10 in turn is immediately superseded by Java SE 11.
Java SE 11 however is an LTS release, and therefore Oracle Customers will receive Oracle Premier Support and periodic update releases, even though Java SE 12 was released.

- Oracle은 [평생지원 정책문서]( https://www.oracle.com/support/lifetime-support/ )에 명시한 대로 Oracle Java SE 제품군 대한 Oracle Premier Support를 고객 여러분께 제공합니다.
- Java SE 8 버전 이후 릴리스되는 제품의 경우, Oracle은 특정 릴리스 버전만을 Long-Term-Support(LTS, 장기 지원) 릴리스로 지정합니다.
- Oracle은 2년마다 다음 LTS 릴리스를 선보일 예정이며, 이는 다음 LTS 릴리스가 2023년 9월에 나올 Java 21 버전이라는 것을 의미합니다.
- Oracle Premier Support의 본래 목적상, LTS가 아닌 릴리스는 가장 최신 LTS 릴리스 구현의 개선을 누적한 집합으로 간주합니다.
- 새로운 기능 릴리스 출시되면, 이전의 non-LTS 릴리스는 대체된 것으로 간주합니다.
- 예를 들어, non-LTS 릴리스인 Java SE 9는, Java SE 10(non-LTS)가 나오자마자 대체되었으며, Java SE 10 또한 Java SE 11에 의해 바로 대체되었습니다.
- 하지만 Java SE 11 은 LTS 릴리스이므로, Java SE 12가 릴리스된 이후라 하더라도 Java SE 11을 사용하시는 Oracle 고객 여러분은 Oracle Premier Support와 주기적인 업데이트 릴리스를 받을 수 있습니다.

## JDK 21 (LTS)

TODO

## JDK 20

TODO

## JDK 19

TODO

## JDK 18

TODO

## JDK 17 (LTS)

- 2021-09-15 [JDK 17 발표 및 새로운 변화]( https://blogs.oracle.com/javakr/post/jdk-17 )
    - 새로운 LTS인 Java 17이 발표되었다.
    - 지난 LTS 버전인 11 이후에 3년만에 발표된 LTS 릴리스이고, LTS 릴리스로써 최소 8년 동안 성능, 안정성 및 보안 업데이트가 예정되어 있는 중요한 릴리스.
    - 다음 LTS 버전은 JDK 21 으로 예상하며, 2023년에 발표될 것이다.
    - JDK 17부터 기존에 Oracle JDK에 적용이 되었던 Oracle Technology Network (OTN) 라이선스 대신에 Oracle No-Fee Terms and Conditions (NFTC) 라이선스가 적용.
        - 여러 사용 용도 및 배포에 있어 제약 조건이 있던 OTN 라이선스와는 달리, 상업 및 프로덕션 용도를 포함하여 모든 사용자들에게 무료로 사용 및 배포를 허용.

2021-10-19 [Consolidated JDK 17 Release Notes]( https://www.oracle.com/java/technologies/javase/17all-relnotes.html#R17_0_1 )

## JDK 16

2021-04-20 [Consolidated JDK 16 Release Notes]( https://www.oracle.com/java/technologies/javase/16-all-relnotes.html )

[JDK 16 Release Notes]( https://www.oracle.com/java/technologies/javase/16-relnotes.html )

## JDK 15

2020-09-15 [Consolidated JDK 15 Release Notes]( https://www.oracle.com/java/technologies/javase/15all-relnotes.html )

## JDK 14

2020-03-17 [Release Notes for JDK 14 and JDK 14 Update Releases]( https://www.oracle.com/java/technologies/javase/14all-relnotes.html )

- LTS 버전이 아니지만 변화 많음
    - 스위치/instanceof 개선
    - Record 초안 발표
        - [JEP 359 Records (Preview)]( https://openjdk.java.net/jeps/359 )

## JDK 13

2019-09-17 General Availability

[Release Notes for JDK 13 and JDK 13 Update Releases]( https://www.oracle.com/java/technologies/javase/13all-relnotes.html )

* [JDK 13 What's new](https://www.oracle.com/technetwork/java/javase/13-relnote-issues-5460548.html#NewFeature )
* [JDK 13 Documentation](https://docs.oracle.com/en/java/javase/13/ )
* [JDK 13 (openjdk.java.net)](https://openjdk.java.net/projects/jdk/13/ )

- 멀티 라인 문자열을 위한 텍스트 블록 초안 발표 `"""`
    - [JEP 355: Text Blocks (Preview)]( https://openjdk.java.net/jeps/355 )
- 스위치 표현 개선 - 자바 12에 소개된 스위치 표현에 기능 추가
    - `break` 대신 `yield` 키워드 사용
    - 하나의 `case`에 여러 개의 구문 사용 가능

## JDK 12

2019-03-19 [Release Notes for JDK 12 and JDK 12 Update Releases]( https://www.oracle.com/java/technologies/javase/12all-relnotes.html )

[OpenJDK 12](https://openjdk.java.net/projects/jdk/12/ )

- 언어적/기능적 변경 크지 않음.
- 스위치 표현 개선을 위한 초안 발표.
    - [[java-switch-expression]]{Switch Expressions (Preview)}

그 외

* [Shenandoah: A Low-Pause-Time Garbage Collector (Experimental)](https://openjdk.java.net/jeps/189 )
* [Microbenchmark Suite](https://openjdk.java.net/jeps/230 )
* [JVM Constants API](https://openjdk.java.net/jeps/334 )
* [One AArch64 Port, Not Two](https://openjdk.java.net/jeps/340 )
* [Default CDS Archives](https://openjdk.java.net/jeps/341 )
* [Abortable Mixed Collections for G1](https://openjdk.java.net/jeps/344 )
* [Promptly Return Unused Committed Memory from G1](https://openjdk.java.net/jeps/346 )

### Shenandoah GC

* [Shenandoah GC](https://wiki.openjdk.java.net/display/shenandoah/Main )

## JDK 11 (LTS)

2018-09-25 [Consolidated JDK 11 Release Notes]( https://www.oracle.com/java/technologies/javase/11all-relnotes.html )

[OpenJDK 11](https://openjdk.java.net/projects/jdk/11/ )

- 발표 주기 변경 후 최초의 LTS 버전
- HTTP 클라이언트 API를 정식으로 추가
- 컬렉션 인터페이스에 `toArray` 메소드 추가
- `var` 키워드 지원 확대 - 람다 표현식에서도 `var` 사용 가능
- `String` 클래스 기능 추가
    - `isBlank`, `lines`, `strip`, `stripLeading`, `stripTrailing`

## JDK 10

2018-03-20 [JDK 10 Release Notes]( https://www.oracle.com/java/technologies/javase/10-relnote-issues.html )

[OpenJDK 10](https://openjdk.java.net/projects/jdk/10/ )

- JDK 9 안정화 버전
- 로컬 변수 추론 기능 `var`
    - [JEP 286: Local-Variable Type Inference](https://openjdk.java.net/jeps/286 )
- 가비지 컬렉터 개선
    - [JDK-8172890 : JEP 307: Parallel Full GC for G1]( https://bugs.java.com/bugdatabase/view_bug.do?bug_id=JDK-8172890 )


## JDK 9

2017-09-21 [What's New in Oracle JDK 9](https://docs.oracle.com/javase/9/whatsnew/toc.htm#JSNEW-GUID-5B808B2F-E891-43CD-BF6E-78787E547071 )

[OpenJDK 9](https://openjdk.java.net/projects/jdk9/ )

- 라이선스 체계
- 발표 주기 변경(6개월 주기 업그레이드)
    - [Update and FAQ on the Java SE Release Cadence]( https://blogs.oracle.com/java-platform-group/update-and-faq-on-the-java-se-release-cadence )
- 모듈화(Project Jigsaw)
- JShell(REPL)
- 통합 JVM 로깅
    - 자바를 실행할 때 `-Xlog` 파라미터 옵션을 적용하면 된다.
- HTML5 JavaDoc
    - `javadoc` 명령에 `-html5` 옵션을 적용하면 HTML5로 JavaDoc이 빌드된다.
- try-with-resource 개선
- private 메소드도 interface 내에 생성할 수 있게 됨.
- 다이아몬드 연산자 `<>` 개선 - 익명 클래스에서도 `<>`를 쓸 수 있게 됐다.
- 프로세스 API - 프로세스 정보에 접근할 수 있는 새로운 API.
    - 모든 프로세스, 현재 프로세스, 자식 프로세스, 종료 프로세스 등의 정보를 조회하고 관리할 수 있게 됐다.
- `CompletableFuture` 개선 - 타임아웃과 지연 기능 추가
- Reactive stream API

## JDK 8 (LTS)

2014-03-18 [What's New in JDK 8](https://www.oracle.com/technetwork/java/javase/8-whats-new-2157071.html )

- 언어적 변경
    * [Lambda Expressions](https://docs.oracle.com/javase/specs/jls/se8/html/jls-15.html#jls-15.27 ).
    * [Functional Interfaces]( https://docs.oracle.com/javase/specs/jls/se8/html/jls-9.html#jls-9.8 )
    * 인터페이스 개선
        * [default methods](https://docs.oracle.com/javase/specs/jls/se8/html/jls-13.html#d5e19889 ).
    * ...
* Collections
    * `java.util.stream` 패키지 추가.
        * stream의 원소들에 함수형 스타일의 작업을 지원.
        * stream API는 Collections API에 통합.
    * [[/java/hashmap##java-8-hashmap-퍼포먼스-향상에-대하여]]{HashMap 퍼포먼스 향상}
* Date-Time Package
* `Optional`
* `CompletableFuture` - `Future` 인터페이스에서 제공하는 기능을 개선
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

## JDK 7 (LTS)

[2011-07-28](https://openjdk.java.net/projects/jdk7/ )

[Java SE 7 Update Release Notes](https://www.oracle.com/technetwork/java/javase/7u-relnotes-515228.html )

- File NIO 2.0
    - 파일 처리를 위한 새로운 기능.
    - `java.io.File` 클래스와 개념이 다름.
- 포크/조인 프레임워크
    - 자바 5에서 처음 등장한 컨터런트 API에 포크/조인 기능이 추가되었다.
- 다이아몬드 연산자 `<>`
    - 제네릭 선언 방법 개선
- try-with-resource
- 하나의 catch 내에 여러 개의 Exception을 처리할 수 있도록 개선
- JVM 기반 스크립트 언어 지원

## JDK 6

[2004-09-30 릴리즈](https://web.archive.org/web/20080207083457/http://www.sun.com/smi/Press/sunflash/2004-09/sunflash.20040930.1.xml )

[Highlights of Technology Changes in Java SE 6](https://www.oracle.com/technetwork/java/javase/features-141434.html )

- JDK 5 안정화 기능 보강 버전
- G1GC - 6 버전의 중간부터 추가된 기능. 자바 7 부터 기본 GC가 되었다.

## JDK 5

[New Features and Enhancements J2SE 5.0](https://docs.oracle.com/javase/1.5.0/docs/relnotes/features.html )

- 버전 체계 변경
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
- 정규식 등 기능 포함

## JDK 1.3

[2000-05-08 릴리즈](https://web.archive.org/web/20070817053430/http://www.sun.com/smi/Press/sunflash/2000-05/sunflash.20000508.3.xml )

- 성능 향상
    - Java HotSpot 포함
- JNDI (Java Naming and Directory Interface) 추가
- 그 외 여러가지

## JDK 1.2 (Java 2 SE)

[1998-12-08 릴리즈](https://web.archive.org/web/20070816170028/http://www.sun.com/smi/Press/sunflash/1998-12/sunflash.981208.9.xml )

- Java™ 2 Brand Unveiled
    - 버전 정책 변경: Java 2 SE(Standard Edition) 용어 사용
- 새로운 통합 아키텍처 Collection Framework
- 퍼포먼스 향상
    - 로드된 클래스에 대한 메모리 압축
    - 더 빠른 메모리 할당 및 개선된 GC
    - 곧 출시될 Java HotSpot VM을 포함하여 다른 VM을 위한 플러그형 VM 아키텍처
    - 새로운 JIT(Just In Time) 컴파일러
    - JNI(Java Native Interface) 변환
- 향상된 JDBC 2.0
- Collections Framework
- 그 외 여러가지

## JDK 1.1

[1997-02-19 릴리즈](https://web.archive.org/web/20080210044125/http://www.sun.com/smi/Press/sunflash/1997-02/sunflash.970219.0001.xml )

- 컴파일러 개선
- 개선된 AWT(GUI)
- 내부 클래스
- JavaBeans
- DB 연결을 위한 JDBC
- Unicode 2.0 표준을 기반으로 한 글로벌 언어 지원

## JDK 1.0

[1996-01-23 릴리즈](https://web.archive.org/web/20070310235103/http://www.sun.com/smi/Press/sunflash/1996-01/sunflash.960123.10561.xml )

## 참고문헌

- 웹 문서
    - [All JDK Release][all-enhance]
    - [Java Programming Language Enhancements (JAVA SE 6)][java6-enhance]
    - [Java version history (wikipedia)][wiki]
- 도서
    - Practical 모던 자바 / 장윤기 저 / 인사이트(insight) / 초판 1쇄 2020년 09월 21일

## 주석

[all-enhance]: https://www.oracle.com/java/technologies/javase/jdk-relnotes-index.html
[java6-enhance]: https://docs.oracle.com/javase/6/docs/technotes/guides/language/enhancements.html
[wiki]: https://en.wikipedia.org/wiki/Java_version_history

[^why-link]: 1.4 기능이지만 이 링크는 Java SE 6 documentation으로 연결되어 있는데, [Java Programming Language Enhancements][java6-enhance] 문서의 Enhancements in JDK v1.4 항목에 연결된 링크를 그대로 옮겼기 때문이다.
