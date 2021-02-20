---
layout  : wiki
title   : Java 함수형 인터페이스의 사용
summary : 
date    : 2020-01-25 16:21:36 +0900
updated : 2021-02-21 00:26:36 +0900
tag     : java
toc     : true
public  : true
parent  : [[Java]]
latex   : false
---
* TOC
{:toc}

## @interface FunctionalInterface

다음은 Java 15 API 문서의 [@interface FunctionalInterface][se15-func-interf] 인터페이스 주석을 인용한 것이다.

>
An informative annotation type used to indicate that an interface type declaration is intended to be a functional interface as defined by the Java Language Specification. Conceptually, a functional interface has exactly one abstract method. Since default methods have an implementation, they are not abstract. If an interface declares an abstract method overriding one of the public methods of java.lang.Object, that also does not count toward the interface's abstract method count since any implementation of the interface will have an implementation from java.lang.Object or elsewhere.
Note that instances of functional interfaces can be created with lambda expressions, method references, or constructor references.
>
If a type is annotated with this annotation type, compilers are required to generate an error message unless:
>
- The type is an interface type and not an annotation type, enum, or class.
- The annotated type satisfies the requirements of a functional interface.
>
However, the compiler will treat any interface meeting the definition of a functional interface as a functional interface regardless of whether or not a FunctionalInterface annotation is present on the interface declaration.
>
-- [Annotation Type FunctionalInterface (Java SE 15)][se15-func-interf]

- Java 언어 스펙에 정의된 함수형 인터페이스라는 것을 표시하기 위한 정보성 애노테이션 타입이다.
- 함수형 인터페이스의 컨셉에 의해, 각각의 함수형 인터페이스는 한 개의 추상 메소드를 갖는다.
    - `default` 메소드는 구현이 있으므로 함수형 인터페이스의 추상 메소드로 따지지 않는다.
    - `java.lang.Object`의 공통 메소드를 대체하는 추상 메소드를 선언해도, 함수형 인터페이스의 추상 메소드로 따지지 않는다.
- 함수형 인터페이스의 인스턴스는 람다 표현식, 메소드 레퍼런스, 생성자 레퍼런스를 사용해서 만들 수 있다.
- `@FunctionalInterface`로 선언된 타입이라면, 다음의 경우를 만족하지 않으면 컴파일러가 에러 메시지를 생성합니다.
    - `interface`이어야 한다. 그리고 `annotation`, `enum`, `class`이면 안된다.
    - 함수형 인터페이스의 조건을 만족해야 한다.
- 그러나 컴파일러는 `@FunctionalInterface`가 인터페이스 선언에 있건 없건 간에, 함수형 인터페이스의 정의를 충족하는 모든 인터페이스를 함수형 인터페이스로 취급한다.

### FunctionalInterface의 의의

그런데 `@FunctionalInterface`가 있건 없건 컴파일러가 상관하지 않는다면 이 애노테이션은 왜 있는 것일까?

>
앞에서 설명했지만 함수형 인터페이스는 오직 하나의 추상 메서드를 갖는다는 전제 조건을 만족하면 별도의 어노테이션을 붙이지 않아도 함수형 인터페이스로 취급할 수 있다.
그래서 자바 8 이전 버전에서 만든 인터페이스도 람다 표현식으로 활용할 수 있다.
하지만 이렇게 어노테이션을 붙이면 좀 더 명확하게 함수형 인터페이스임을 알 수 있고,
또한 실수로 함수형 인터페이스에 메서드를 추가했을 때 컴파일 에러를 일으켜서 문제를 사전에 예방할 수 있다.
>
그러므로 자바에서 제공하는 기본 함수형 인터페이스 외에 새로 함수형 인터페이스를 추가할 때는 명시적으로 `FunctionalInterface` 어노테이션을 적용하는 것이 좋다.
>
-- Practical 모던 자바. 4장 람다와 함수형 인터페이스.

- 과거 버전 호환
- 함수형 인터페이스라는 사실을 명시
- 함수형 인터페이스에 적합하지 않은 메서드를 추가하는 일 방지

## 대표적인 함수형 인터페이스 6 가지

* 다음 표는 이펙티브 자바를 참고해 내용을 추가한 것이다.[^effective-44-264]

| 인터페이스          | 함수 시그니처         | 예                    | Args Type | Return Type | 설명                                            |
|---------------------|-----------------------|-----------------------|-----------|-------------|-------------------------------------------------|
| `UnaryOperator<T>`  | `T apply(T t)`        | `String::toLowerCase` | `T`       | `T`         |                                                 |
| `BinaryOperator<T>` | `T apply(T t1, T t2)` | `BigInteger::add`     | `T`, `T`  | `T`         |                                                 |
| `Predicate<T>`      | `boolean test(T t)`   | `Collection::isEmpty` | `T`       | `boolean`   | 값을 전달받아 true/false를 리턴한다             |
| `Function<T,R>`     | `R apply(T t)`        | `Arrays::asList`      | `T`       | `R`         | 값을 다른 값으로 변환해 리턴한다                |
| `Supplier<T>`       | `T get()`             | `Instant::now`        |           | `T`         | 입력값 없이 리턴값만 있다                       |
| `Consumer<T>`       | `void accept(T t)`    | `System.out::println` | `T`       | `void`      | 값을 받아서 처리만 하고 결과 리턴은 하지 않는다 |

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

#### Consumer 소스 코드

다음은 `Consumer`의 소스 코드이다(Java 15).

```java
/**
 * Represents an operation that accepts a single input argument and returns no
 * result. Unlike most other functional interfaces, {@code Consumer} is expected
 * to operate via side-effects.
 *
 * <p>This is a <a href="package-summary.html">functional interface</a>
 * whose functional method is {@link #accept(Object)}.
 *
 * @param <T> the type of the input to the operation
 *
 * @since 1.8
 */
@FunctionalInterface
public interface Consumer<T> {

    /**
     * Performs this operation on the given argument.
     *
     * @param t the input argument
     */
    void accept(T t);

    /**
     * Returns a composed {@code Consumer} that performs, in sequence, this
     * operation followed by the {@code after} operation. If performing either
     * operation throws an exception, it is relayed to the caller of the
     * composed operation.  If performing this operation throws an exception,
     * the {@code after} operation will not be performed.
     *
     * @param after the operation to perform after this operation
     * @return a composed {@code Consumer} that performs in sequence this
     * operation followed by the {@code after} operation
     * @throws NullPointerException if {@code after} is null
     */
    default Consumer<T> andThen(Consumer<? super T> after) {
        Objects.requireNonNull(after);
        return (T t) -> { accept(t); after.accept(t); };
    }
}
```

- `interface Consumer<T>`
    - 한 개의 입력 인수를 받아들이고 결과를 리턴하지 않는 작업을 표현한다.
    - 대부분의 다른 함수형 인터페이스와 달리 `Consumer`는 사이드 이펙트를 통한 기능 수행을 염두에 둔다.
    - 함수형 메소드가 `accept(Object)`인 함수형 인터페이스.
- `void accept(T t)`
    - 주어진 인자를 받아 작업을 실행한다.
- `Consumer<T> andThen(Consumer<? super T> after)`
    - 이 작업과, `after` 작업을 순서대로 실행하도록 조합된 `Consumer`를 리턴한다.
    - 작업 수행 도중 예외가 던져지면,
        - 예외는 caller에게 전달된다.
        - `after` 작업은 실행되지 않는다.

#### andThen 메소드 사용 예제

```java
@Test
void andThenTest() {
  Consumer<String> toLowerPrint = (str) -> System.out.println(str.toLowerCase());
  Consumer<String> toUpperPrint = (str) -> System.out.println(str.toUpperCase());
  Consumer<String> addDotsPrint = (str) -> System.out.println(str + "...");

  toLowerPrint              // 1. 가장 먼저 실행
    .andThen(addDotsPrint)  // 2. 두번째로 실행
    .andThen(toUpperPrint)  // 3. 마지막으로 실행
    .accept("Hello World"); // 입력
}
```

실행 결과는 다음과 같다.

```
hello world
Hello World...
HELLO WORLD
```

## 참고문헌

- 웹 문서
    - [Annotation Type FunctionalInterface (Java SE 15)][se15-func-interf]
- 도서
    - Practical 모던 자바 / 장윤기 저 / 인사이트(insight) / 초판 1쇄 2020년 09월 21일
    - 이펙티브 자바 Effective Java 3/E / 조슈아 블로크 저/개앞맵시(이복연) 역 / 인사이트(insight) / 초판 2쇄 2018년 11월 21일

## 주석

[^effective-44-264]: 이펙티브 자바. Item44. 264쪽.

[se15-func-interf]: https://docs.oracle.com/en/java/javase/15/docs/api/java.base/java/lang/FunctionalInterface.html
