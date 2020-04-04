---
layout  : wiki
title   : Java 함수형 인터페이스의 사용
summary : 
date    : 2020-01-25 16:21:36 +0900
updated : 2020-01-25 20:30:00 +0900
tag     : java
toc     : true
public  : true
parent  : [[Java]]
latex   : false
---
* TOC
{:toc}

## 대표적인 함수형 인터페이스 6 가지

* 다음 표는 이펙티브 자바를 참고해 내용을 추가한 것이다.[^effective-44-264]

| 인터페이스          | 함수 시그니처         | 예                    | Args Type | Return Type |
|---------------------|-----------------------|-----------------------|-----------|-------------|
| `UnaryOperator<T>`  | `T apply(T t)`        | `String::toLowerCase` | `T`       | `T`         |
| `BinaryOperator<T>` | `T apply(T t1, T t2)` | `BigInteger::add`     | `T`, `T`  | `T`         |
| `Predicate<T>`      | `boolean test(T t)`   | `Collection::isEmpty` | `T`       | `boolean`   |
| `Function<T,R>`     | `R apply(T t)`        | `Arrays::asList`      | `T`       | `R`         |
| `Supplier<T>`       | `T get()`             | `Instant::now`        |           | `T`         |
| `Consumer<T>`       | `void accept(T t)`    | `System.out::println` | `T`       | `void`      |

### UnaryOperator

* `UnaryOperator`는 인수 1개를 받아, 인수와 같은 타입의 값을 리턴하는 함수를 의미한다.
    * 입력 인수와 반환값의 타입이 같다.

```java
UnaryOperator<String> toLower = (s)-> s.toLowerCase();
System.out.println(toLower.apply("Hello World"));
```

### BinaryOperator

* `BinaryOperator`는 인수 2 개를 받아, 인수와 같은 타입의 값을 리턴하는 함수를 의미한다.
    * 입력 인수와 반환값의 타입이 같다.
    * 두 인수는 타입이 같아야 한다.

```java
BinaryOperator<Integer> add = (a, b) -> a + b;
System.out.println(add.apply(1, 2));
```

### Predicate

* `Predicate`는 인수 하나를 받아 `boolean` 타입의 값을 리턴하는 함수를 의미한다.

```java
Predicate<Integer> checker  = (number)-> number > 100;
System.out.println(checker.test(42));
```

### Function

* `Function` 인터페이스는 인수와 리턴 타입이 다른 함수를 의미한다.

```java
Function<Integer,String> toStr = (i)-> Integer.toString(i);
System.out.println(toStr.apply(42).length());
```

### Supplier

* `Supplier`는 인수 없이 값을 리턴하는 함수를 의미한다.

```java
Supplier<Integer> solution  = ()-> 42;
System.out.println(solution.get());
```

### Consumer

* `Consumer`는 하나의 인수를 받고 리턴값이 없는(`void`) 함수를 의미한다.

```java
Consumer<String> hi = (str) -> System.out.println("hello" + str);
hi.accept("John");
```

## 참고문헌

* 이펙티브 자바 Effective Java 3/E / 조슈아 블로크 저/개앞맵시(이복연) 역 / 인사이트(insight) / 초판 2쇄 2018년 11월 21일

## 주석

[^effective-44-264]: 이펙티브 자바. Item44. 264쪽.

