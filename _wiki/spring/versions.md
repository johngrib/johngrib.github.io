---
layout  : wiki
title   : 스프링 버전 체크
summary : 
date    : 2019-09-21 09:34:43 +0900
updated : 2023-01-28 23:12:44 +0900
tag     : java
resource: CB/CF2267-D748-4A03-BBA6-4B4CCA849FEC
toc     : true
public  : true
parent  : [[/spring]]
latex   : false
---
* TOC
{:toc}

## Spring - JDK Version 범위

[JDK Version Range]( https://github.com/spring-projects/spring-framework/wiki/Spring-Framework-Versions#jdk-version-range )

* Spring Framework 6.0.x: JDK 17-21 (for native images: JDK 17-19)
* Spring Framework 5.3.x: JDK 8-19
* Spring Framework 5.1.x: JDK 8-12
* Spring Framework 5.0.x: JDK 8-10
* Spring Framework 4.3.x: JDK 6-8

### iBatis 지원 중단

- 2015년 11월, [Spring 4 부터 iBatis 지원이 중단][mybatis]됐다.
    - iBatis를 써야 한다면 MyBatis를 쓰도록 한다.

## Spring Boot - JDK Version 범위

### Spring Boot 3

2022-11-28 업데이트된 [Spring Boot 3.0 Release Notes]( https://github.com/spring-projects/spring-boot/wiki/Spring-Boot-3.0-Release-Notes ).

- Spring Boot 3.0 은 JDK 19 에서도 잘 돌아간다.
- Spring Boot 3.0 은 최소 Java 17 을 사용해야 한다.
    - Java 8이나 Java 11을 쓰고 있는데 Spring Boot 3.0을 쓰고 싶다면 JDK를 업그레이드해야 한다.

### Spring Boot 2

2019년 9월 9일 업데이트된 [Spring Boot 2.0 Release Notes][sb2.0] 문서를 읽어보면 다음과 같이 요약할 수 있다.

* Spring Boot 2.0은 최소 Java 8에서 돌아간다.
* Spring Boot 2.0은 최소 JDK 9에서도 잘 돌아간다.

한편 2018년 11월 20일에 업데이트된 [Spring Boot with Java 9 and above][sb-java9] 문서를 읽어보면 다음과 같이 나와 있다.

* Spring Boot 2.0.1.RELEASE에서 Java 10이 지원된다.
* Spring Boot 2.1.0.M2 에서 Java 11이 지원된다.
* Spring Boot 2.2에서 Java 12가 공식적으로 지원되게 하는 것이 목표.

## References

* [Spring Framework Versions][spring-versions]
* [Spring Boot 2.0 - Java 8 Baseline and Java 9 Support][sb2.0]
* [Spring Boot with Java 9 and above][sb-java9]
* [Spring 4 got you down with no ibatis support - no worries Mybatis has your back][mybatis]


[spring-versions]: https://github.com/spring-projects/spring-framework/wiki/Spring-Framework-Versions
[sb2.0]: https://github.com/spring-projects/spring-boot/wiki/Spring-Boot-2.0-Release-Notes#java-8-baseline-and-java-9-support
[sb-java9]: https://github.com/spring-projects/spring-boot/wiki/Spring-Boot-with-Java-9-and-above
[mybatis]: https://blog.mybatis.org/2015/11/spring-4-got-you-down-with-no-ibatis.html

