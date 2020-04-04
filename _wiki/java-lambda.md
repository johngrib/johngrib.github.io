---
layout  : wiki
title   : Java lambda의 사용
summary : 
date    : 2020-01-25 15:29:20 +0900
updated : 2020-01-25 15:54:28 +0900
tag     : java
toc     : true
public  : true
parent  : [[Java]]
latex   : false
---
* TOC
{:toc}

## 조슈아 블로흐가 말하는 람다 사용시 주의할 점

> 메서드나 클래스와 달리, **람다는 이름이 없고 문서화도 못 한다. 따라서 코드 자체로 동작이 명확히 설명되지 않거나 코드 줄 수가 많아지면 람다를 쓰지 말아야 한다.** 람다는 한 줄 일 때 가장 좋고 길어야 세 줄 안에 끝내는 게 좋다. 세 줄을 넘어가면 가독성이 심하게 나빠진다. 람다가 길거나 읽기 어렵다면 더 간단히 줄여보거나 람다를 쓰지 않는 쪽으로 리팩터링하길 바란다.[^effective-42-257]

람다보다 메서드 참조를 사용하는 편이 더 나은 경우도 많으니 한 가지 방법만 고집하지 말 것.

## 익명 클래스를 대체하는 여러가지 방법들

* 익명 클래스를 사용하는 전통적인 방법

```java
List<String> words = ...;

Collections.sort(words, new Comparator<String>() {
    @Override
    public int compare(String s, String t1) {
        return Integer.compare(s.length(), t1.length());
    }
});
```

* Comparator를 생성하는 메서드(`comparingInt`)와 메서드 참조를 사용하는 방법

```java
List<String> words = ...;
Collections.sort(words, Comparator.comparingInt(String::length));

// List의 sort를 사용하는 방법
words.sort(Comparator.comparingInt(String::length));
```

* 람다를 사용하는 방법

```java
List<String> words = ...;
Collections.sort(words, (s, t1) -> Integer.compare(s.length(), t1.length()));
```

## 메서드 참조와 같은 기능을 하는 람다 표현

다음 표는 이펙티브 자바 Item 43에서 인용한 것이다.

| 메서드 참조 유형   | 예                       | 같은 기능을 하는 람다                                |
|--------------------|--------------------------|------------------------------------------------------|
| 정적               | `Integer::parseInt`      | `str -> Integer.parseInt(str)`                       |
| 한정적(인스턴스)   | `Instant.now()::isAfter` | `Instant then = Instant.now(); t -> then.isAfter(t)` |
| 비한정적(인스턴스) | `String::toLowerCase`    | `str -> str.toLowerCase()`                           |
| 클래스 생성자      | `TreeMap<K,V>::new`      | `() -> new TreeMap<K,V>()`                           |
| 배열 생성자        | `int[]::new`             | `len -> new int[len]`                                |



## 참고문헌

* 이펙티브 자바 Effective Java 3/E / 조슈아 블로크 저/개앞맵시(이복연) 역 / 인사이트(insight) / 초판 2쇄 2018년 11월 21일
    * Item 42. 익명 클래스보다는 람다를 사용하라
    * Item 43. 람다보다는 메서드 참조를 사용하라

## 주석

[^effective-42-257]: 이펙티브 자바. Item 42. 257쪽.

