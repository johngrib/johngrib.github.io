---
layout  : wiki
title   : (책) 이펙티브 자바 2판
summary : Effective Java 2/E by Joshua Bloch
date    : 2018-02-09 06:31:21 +0900
updated : 2018-03-04 19:18:08 +0900
tags    : book java effective-java
toc     : true
public  : true
parent  : book
latex   : false
---
* TOC
{:toc}

## 개요

* Java 프로그래머에게 유용한 지침을 78가지로 요약한 책.
* 이 책은 Java 언어에 어느 정도 익숙한 개발자를 독자로 상정한다.
* 코드의 성능보다는 유연하고 유지보수하기 쉬운 코드 작성에 더 가치를 둔다.

## 규칙 목록

1. 생성자 대신 [[static-factory-method-pattern]]{정적 팩터리 메서드}를 사용할 수 없는지 생각해 보라
2. 생성자 인자가 많을 때는 [[builder-pattern]]{Builder 패턴} 적용을 고려하라
3. private 생성자나 enum 자료형은 싱글턴 패턴을 따르도록 설계하라
4. 객체 생성을 막을 때는 [[private-constructor]]{private 생성자}를 사용하라
5. 불필요한 객체는 만들지 말라
6. 유효기간이 지난 객체 참조는 폐기하라
7. 종료자 사용을 피하라

## Links

* [이펙티브 자바(인사이트 출판사)](http://www.insightbook.co.kr/book/programming-insight/%EC%9D%B4%ED%8E%99%ED%8B%B0%EB%B8%8C-%EC%9E%90%EB%B0%94effective-java-2e)
* [Effective Java - 3rd Edition (amazon.com)](https://www.amazon.com/Effective-Java-3rd-Joshua-Bloch/dp/0134685997)
* <https://en.wikipedia.org/wiki/Joshua_Bloch>

* [[static-factory-method-pattern]]
* [[builder-pattern]]
* [[private-constructor]]
