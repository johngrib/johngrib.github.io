---
layout  : wiki
title   : Java 함수형 인터페이스의 사용
summary : 
date    : 2020-01-25 16:21:36 +0900
updated : 2021-02-21 17:52:16 +0900
tag     : java
resource: 84/621244-8C5F-44D3-A8BA-A45379221280
toc     : true
public  : true
parent  : [[java]]
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

## 대표적인 함수형 인터페이스

* 다음 표는 이펙티브 자바를 참고해 내용을 추가한 것이다.[^effective-44-264]

| 인터페이스          | 함수 시그니처         | 예                    | Args Type | Return Type | 설명                                            |
|---------------------|-----------------------|-----------------------|-----------|-------------|-------------------------------------------------|
| `UnaryOperator<T>`  | `T apply(T t)`        | `String::toLowerCase` | `T`       | `T`         | 입력과 리턴 타입이 동일. `Function`.            |
| `BinaryOperator<T>` | `T apply(T t1, T t2)` | `BigInteger::add`     | `T`, `T`  | `T`         | 입력(2개)과 리턴 타입이 동일. `Function`.       |
| `Predicate<T>`      | `boolean test(T t)`   | `Collection::isEmpty` | `T`       | `boolean`   | 값을 전달받아 true/false를 리턴한다             |
| `Function<T,R>`     | `R apply(T t)`        | `Arrays::asList`      | `T`       | `R`         | 값을 다른 값으로 변환해 리턴한다                |
| `Supplier<T>`       | `T get()`             | `Instant::now`        |           | `T`         | 입력값 없이 리턴값만 있다                       |
| `Consumer<T>`       | `void accept(T t)`    | `System.out::println` | `T`       | `void`      | 값을 받아서 처리만 하고 결과 리턴은 하지 않는다 |

## Predicate

* `Predicate`는 인수 하나를 받아 `boolean` 타입의 값을 리턴하는 함수를 의미한다.

```java
Predicate<Integer> checker  = (number)-> number > 100;
System.out.println(checker.test(42));
```

### interface

```java
/**
 * Represents a predicate (boolean-valued function) of one argument.
 *
 * <p>This is a <a href="package-summary.html">functional interface</a>
 * whose functional method is {@link #test(Object)}.
 *
 * @param <T> the type of the input to the predicate
 *
 * @since 1.8
 */
@FunctionalInterface
public interface Predicate<T> {
```
- `interface Predicate<T>`
    - 하나의 인자를 받아 평가한 `boolean` 결과를 리턴한다.
    - 함수형 메소드가 `test(Object)`인 함수형 인터페이스.

### test
```java
    /**
     * Evaluates this predicate on the given argument.
     *
     * @param t the input argument
     * @return {@code true} if the input argument matches the predicate,
     * otherwise {@code false}
     */
    boolean test(T t);
```
- `boolean test(T t)`
    - 하나의 인자를 받아 predicate와 맞을 경우 `true`, 그렇지 않다면 `false`를 리턴한다.

### and

```java
    /**
     * Returns a composed predicate that represents a short-circuiting logical
     * AND of this predicate and another.  When evaluating the composed
     * predicate, if this predicate is {@code false}, then the {@code other}
     * predicate is not evaluated.
     *
     * <p>Any exceptions thrown during evaluation of either predicate are relayed
     * to the caller; if evaluation of this predicate throws an exception, the
     * {@code other} predicate will not be evaluated.
     *
     * @param other a predicate that will be logically-ANDed with this
     *              predicate
     * @return a composed predicate that represents the short-circuiting logical
     * AND of this predicate and the {@code other} predicate
     * @throws NullPointerException if other is null
     */
    default Predicate<T> and(Predicate<? super T> other) {
        Objects.requireNonNull(other);
        return (t) -> test(t) && other.test(t);
    }
```
- 이 predicate 함수와 다른 predicate 함수를 AND 관계로 조합한 predicate 함수를 리턴한다.
- 논리적 AND는 숏 서킷 방식으로 작동한다.
    - 먼저 평가한 predicate가 `false`이면 나머지 predicate는 평가하지 않는다.
- 두 함수 중 하나에서 예외가 던져지면 예외는 caller에게 전달된다.

### negate

```java
    /**
     * Returns a predicate that represents the logical negation of this
     * predicate.
     *
     * @return a predicate that represents the logical negation of this
     * predicate
     */
    default Predicate<T> negate() {
        return (t) -> !test(t);
    }
```
- predicate의 논리적 부정을 표현하는 predicate를 리턴한다.

### or

```java
    /**
     * Returns a composed predicate that represents a short-circuiting logical
     * OR of this predicate and another.  When evaluating the composed
     * predicate, if this predicate is {@code true}, then the {@code other}
     * predicate is not evaluated.
     *
     * <p>Any exceptions thrown during evaluation of either predicate are relayed
     * to the caller; if evaluation of this predicate throws an exception, the
     * {@code other} predicate will not be evaluated.
     *
     * @param other a predicate that will be logically-ORed with this
     *              predicate
     * @return a composed predicate that represents the short-circuiting logical
     * OR of this predicate and the {@code other} predicate
     * @throws NullPointerException if other is null
     */
    default Predicate<T> or(Predicate<? super T> other) {
        Objects.requireNonNull(other);
        return (t) -> test(t) || other.test(t);
    }
```
- 이 predicate 함수와 다른 predicate 함수를 OR 관계로 조합한 predicate 함수를 리턴한다.
- 논리적 OR은 숏 서킷 방식으로 작동한다.
    - 먼저 평가한 predicate가 `true`이면 나머지 predicate는 평가하지 않는다.
- 두 함수 중 하나에서 예외가 던져지면 예외는 caller에게 전달된다.

### isEqual
```java
    /**
     * Returns a predicate that tests if two arguments are equal according
     * to {@link Objects#equals(Object, Object)}.
     *
     * @param <T> the type of arguments to the predicate
     * @param targetRef the object reference with which to compare for equality,
     *               which may be {@code null}
     * @return a predicate that tests if two arguments are equal according
     * to {@link Objects#equals(Object, Object)}
     */
    static <T> Predicate<T> isEqual(Object targetRef) {
        return (null == targetRef)
                ? Objects::isNull
                : object -> targetRef.equals(object);
    }
```
- 두 인자를 받아 두 인자가 `equal`한지 테스트하는 predicate를 리턴한다.

### not
```java
    /**
     * Returns a predicate that is the negation of the supplied predicate.
     * This is accomplished by returning result of the calling
     * {@code target.negate()}.
     *
     * @param <T>     the type of arguments to the specified predicate
     * @param target  predicate to negate
     *
     * @return a predicate that negates the results of the supplied
     *         predicate
     *
     * @throws NullPointerException if target is null
     *
     * @since 11
     */
    @SuppressWarnings("unchecked")
    static <T> Predicate<T> not(Predicate<? super T> target) {
        Objects.requireNonNull(target);
        return (Predicate<T>)target.negate();
    }
}
```
- 주어진 predicate와 부정 관계인 predicate를 리턴한다.
    - 메소드 본문을 읽어보면 `target.negate()`를 호출한 결과를 리턴하고 있다.

### 추가 인터페이스

- 주의: 아래의 인터페이스들은 `Predicate`를 `extends` 하지 않는다.

| interface         | 함수형 메서드 시그니처       |
|-------------------|------------------------------|
| `BiPredicate`     | `boolean test(T t, U u)`     |
| `DoublePredicate` | `boolean test(double value)` |
| `IntPredicate`    | `boolean test(int value)`    |
| `LongPredicate`   | `boolean test(long value)`   |

## Function

* `Function` 인터페이스는 인수와 리턴 타입이 다른 함수를 의미한다.

```java
Function<Integer,String> toStr = (i)-> Integer.toString(i);
System.out.println(toStr.apply(42).length());
```

### interface

```java
/**
 * Represents a function that accepts one argument and produces a result.
 *
 * <p>This is a <a href="package-summary.html">functional interface</a>
 * whose functional method is {@link #apply(Object)}.
 *
 * @param <T> the type of the input to the function
 * @param <R> the type of the result of the function
 *
 * @since 1.8
 */
@FunctionalInterface
public interface Function<T, R> {
```

- `interface Function<T, R>`
    - 한 개의 입력 인수를 받아 한 개의 결과를 리턴하는 함수를 표현한다.
    - 함수형 메소드가 `apply(Object)`인 함수형 인터페이스.

### apply

```java
    /**
     * Applies this function to the given argument.
     *
     * @param t the function argument
     * @return the function result
     */
    R apply(T t);
```

- `R apply(T t)`
    - 함수를 주어진 인자에 적용한다.

### compose
```java
    /**
     * Returns a composed function that first applies the {@code before}
     * function to its input, and then applies this function to the result.
     * If evaluation of either function throws an exception, it is relayed to
     * the caller of the composed function.
     *
     * @param <V> the type of input to the {@code before} function, and to the
     *           composed function
     * @param before the function to apply before this function is applied
     * @return a composed function that first applies the {@code before}
     * function and then applies this function
     * @throws NullPointerException if before is null
     *
     * @see #andThen(Function)
     */
    default <V> Function<V, R> compose(Function<? super V, ? extends T> before) {
        Objects.requireNonNull(before);
        return (V v) -> apply(before.apply(v));
    }
```

- `default <V> Function<V, R> compose(Function<? super V, ? extends T> before)`
    - `before` 함수를 입력에 먼저 적용한 다음, 그 결과에 이 함수를 적용하도록 조합된 함수를 리턴한다.
    - 두 함수 중 하나에서 예외가 던져지면 예외는 caller에게 전달된다.

### andThen
```java
    /**
     * Returns a composed function that first applies this function to
     * its input, and then applies the {@code after} function to the result.
     * If evaluation of either function throws an exception, it is relayed to
     * the caller of the composed function.
     *
     * @param <V> the type of output of the {@code after} function, and of the
     *           composed function
     * @param after the function to apply after this function is applied
     * @return a composed function that first applies this function and then
     * applies the {@code after} function
     * @throws NullPointerException if after is null
     *
     * @see #compose(Function)
     */
    default <V> Function<T, V> andThen(Function<? super R, ? extends V> after) {
        Objects.requireNonNull(after);
        return (T t) -> after.apply(apply(t));
    }
```

- `default <V> Function<T, V> andThen(Function<? super R, ? extends V> after)`
    - 이 함수를 먼저 입력에 적용하고, 이후 `after` 함수를 결과에 적용하도록 조합된 함수를 리턴한다.
    - 두 함수 중 하나에서 예외가 던져지면 예외는 caller에게 전달된다.

```java
    /**
     * Returns a function that always returns its input argument.
     *
     * @param <T> the type of the input and output objects to the function
     * @return a function that always returns its input argument
     */
    static <T> Function<T, T> identity() {
        return t -> t;
    }
}
```

- `static <T> Function<T, T> identity()`
    - 입력받은 인자를 무조건 그대로 리턴한다.

### 추가 인터페이스

- 주의: 아래의 인터페이스들은 `Function`을 `extends` 하지 않는다.

| interface              | 함수형 메서드 시그니처             |
|------------------------|------------------------------------|
| `BiFunction`           | `R apply(T t, U u)`                |
| `DoubleFunction`       | `R apply(double value)`            |
| `DoubleToIntFunction`  | `int applyAsInt(double value)`     |
| `DoubleToLongFunction` | `long applyAsLong(double value)`   |
| `IntFunction`          | `R apply(int value)`               |
| `IntToDoubleFunction`  | `double applyAsDouble(int value)`  |
| `IntToLongFunction`    | `long applyAsLong(int value)`      |
| `LongFunction`         | `R apply(long value)`              |
| `LongToDoubleFunction` | `double applyAsDouble(long value)` |
| `ToDoubleBiFunction`   | `double applyAsDouble(T t, U u)`   |
| `ToDoubleFunction`     | `double applyAsDouble(T value)`    |
| `ToIntBiFunction`      | `int applyAsInt(T t, U u)`         |
| `ToIntFunction`        | `int applyAsInt(T value)`          |
| `ToLongBiFunction`     | `long applyAsLong(T t, U u)`       |
| `ToLongFunction`       | `long applyAsLong(T value)`        |

### Operator 인터페이스

| interface              | 인터페이스 시그니처 or 함수형 메서드 시그니처     | 상속                |
|------------------------|---------------------------------------------------|---------------------|
| `UnaryOperator`        | `T apply(T t)`                                    | `Function<T,T>`     |
| `BinaryOperator`       | `T apply(T t, U u)`                               | `BiFunction<T,T,T>` |
| `DoubleBinaryOperator` | `double applyAsDouble(double left, double right)` |                     |
| `DoubleUnaryOperator`  | `double applyAsDouble(double operand)`            |                     |
| `IntBinaryOperator`    | `int applyAsInt(int left, int right)`             |                     |
| `IntUnaryOperator`     | `int applyAsInt(int operand)`                     |                     |
| `LongBinaryOperator`   | `long applyAsLong(long left, long right)`         |                     |
| `LongUnaryOperator`    | `long applyAsLong(long operand)`                  |                     |

#### UnaryOperator

* `UnaryOperator`는 인수 1개를 받아, 인수와 같은 타입의 값을 리턴하는 함수를 의미한다.
    * 입력 인수와 반환값의 타입이 같다.

```java
UnaryOperator<String> toLower = (s)-> s.toLowerCase();
System.out.println(toLower.apply("Hello World"));
```

##### interface

```java
/**
 * Represents an operation on a single operand that produces a result of the
 * same type as its operand.  This is a specialization of {@code Function} for
 * the case where the operand and result are of the same type.
 *
 * <p>This is a <a href="package-summary.html">functional interface</a>
 * whose functional method is {@link #apply(Object)}.
 *
 * @param <T> the type of the operand and result of the operator
 *
 * @see Function
 * @since 1.8
 */
@FunctionalInterface
public interface UnaryOperator<T> extends Function<T, T> {
```

- 입력값과 같은 타입의 출력값을 리턴하는 함수를 표현한다.
- `Function`을 상속해 하나의 타입으로만 돌아가도록 한 것이다.
- `Function<T,T>`를 상속했으므로 `T apply(T t)`가 이 인터페이스의 함수형 메서드이다.

##### identity

```java
    /**
     * Returns a unary operator that always returns its input argument.
     *
     * @param <T> the type of the input and output of the operator
     * @return a unary operator that always returns its input argument
     */
    static <T> UnaryOperator<T> identity() {
        return t -> t;
    }
}
```

- 입력받은 값을 그대로 리턴하기만 하는 unary operator를 리턴한다.

#### BinaryOperator

* `BinaryOperator`는 인수 2 개를 받아, 인수와 같은 타입의 값을 리턴하는 함수를 의미한다.
    * 입력 인수와 반환값의 타입이 같다.
    * 두 인수는 타입이 같아야 한다.

```java
BinaryOperator<Integer> add = (a, b) -> a + b;
System.out.println(add.apply(1, 2));
```

##### interface

```java
/**
 * Represents an operation upon two operands of the same type, producing a result
 * of the same type as the operands.  This is a specialization of
 * {@link BiFunction} for the case where the operands and the result are all of
 * the same type.
 *
 * <p>This is a <a href="package-summary.html">functional interface</a>
 * whose functional method is {@link #apply(Object, Object)}.
 *
 * @param <T> the type of the operands and result of the operator
 *
 * @see BiFunction
 * @see UnaryOperator
 * @since 1.8
 */
@FunctionalInterface
public interface BinaryOperator<T> extends BiFunction<T,T,T> {
```
- 입력값 2개와 같은 타입의 출력값을 리턴하는 함수를 표현한다. (값 3개의 타입이 모두 같다.)
- `BiFunction`을 상속해 하나의 타입으로만 돌아가도록 한 것이다.
- `BiFunction<T,U,R>`를 상속했으므로 `T apply(T t, T u)`가 이 인터페이스의 함수형 메서드이다.

##### minBy

```java
    /**
     * Returns a {@link BinaryOperator} which returns the lesser of two elements
     * according to the specified {@code Comparator}.
     *
     * @param <T> the type of the input arguments of the comparator
     * @param comparator a {@code Comparator} for comparing the two values
     * @return a {@code BinaryOperator} which returns the lesser of its operands,
     *         according to the supplied {@code Comparator}
     * @throws NullPointerException if the argument is null
     */
    public static <T> BinaryOperator<T> minBy(Comparator<? super T> comparator) {
        Objects.requireNonNull(comparator);
        return (a, b) -> comparator.compare(a, b) <= 0 ? a : b;
    }
```
- 주어진 `Comparator`를 사용해 두 값을 비교하고 더 작은 값을 리턴하는 `BinaryOperator`를 리턴한다.

##### maxBy

```java
    /**
     * Returns a {@link BinaryOperator} which returns the greater of two elements
     * according to the specified {@code Comparator}.
     *
     * @param <T> the type of the input arguments of the comparator
     * @param comparator a {@code Comparator} for comparing the two values
     * @return a {@code BinaryOperator} which returns the greater of its operands,
     *         according to the supplied {@code Comparator}
     * @throws NullPointerException if the argument is null
     */
    public static <T> BinaryOperator<T> maxBy(Comparator<? super T> comparator) {
        Objects.requireNonNull(comparator);
        return (a, b) -> comparator.compare(a, b) >= 0 ? a : b;
    }
}
```
- 주어진 `Comparator`를 사용해 두 값을 비교하고 더 큰 값을 리턴하는 `BinaryOperator`를 리턴한다.


## Supplier

* `Supplier`는 인수 없이 값을 리턴하는 함수를 의미한다.

```java
Supplier<Integer> solution  = () -> 42;
System.out.println(solution.get());
```

### interface

```java
/**
 * Represents a supplier of results.
 *
 * <p>There is no requirement that a new or distinct result be returned each
 * time the supplier is invoked.
 *
 * <p>This is a <a href="package-summary.html">functional interface</a>
 * whose functional method is {@link #get()}.
 *
 * @param <T> the type of results supplied by this supplier
 *
 * @since 1.8
 */
@FunctionalInterface
public interface Supplier<T> {
```

- 결과 제공자(supplier)를 표현한다.
    - 함수형 메소드가 `get()`인 함수형 인터페이스.

### get

```java
    /**
     * Gets a result.
     *
     * @return a result
     */
    T get();
}
```

- 결과를 리턴한다.

### 추가 인터페이스

- 주의: 아래의 인터페이스들은 `Supplier`를 `extends` 하지 않는다.

| interface         | 함수형 메서드 시그니처   |
|-------------------|--------------------------|
| `BooleanSupplier` | `boolean getAsBoolean()` |
| `DoubleSupplier`  | `double getAsDouble()`   |
| `IntSupplier`     | `int getAsInt()`         |
| `LongSupplier`    | `long getAsLong()`       |


## Consumer

* `Consumer`는 하나의 인수를 받고 리턴값이 없는(`void`) 함수를 의미한다.

```java
Consumer<String> hi = (str) -> System.out.println("hello" + str);
hi.accept("John");
```

### interface

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
```

- `interface Consumer<T>`
    - 한 개의 입력 인수를 받아들이고 결과를 리턴하지 않는 작업을 표현한다.
    - 대부분의 다른 함수형 인터페이스와 달리 `Consumer`는 사이드 이펙트를 통한 기능 수행을 염두에 둔다.
    - 함수형 메소드가 `accept(Object)`인 함수형 인터페이스.

### accept

```java
    /**
     * Performs this operation on the given argument.
     *
     * @param t the input argument
     */
    void accept(T t);
```

- `void accept(T t)`
    - 주어진 인자를 받아 작업을 실행한다.

### andThen
```java
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

- `Consumer<T> andThen(Consumer<? super T> after)`
    - 이 작업과, `after` 작업을 순서대로 실행하도록 조합된 `Consumer`를 리턴한다.
    - 작업 수행 도중 예외가 던져지면,
        - 예외는 caller에게 전달된다.
        - `after` 작업은 실행되지 않는다.

#### 사용 예제

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

### 추가 인터페이스

- 주의: 아래의 인터페이스들은 `Consumer`를 `extends` 하지 않는다.

| interface           | 함수형 메서드 시그니처           |
|---------------------|----------------------------------|
| `BiConsumer`        | `void accept(T t, U u)`          |
| `DoubleConsumer`    | `void accept(double value)`      |
| `IntConsumer`       | `void accept(int value)`         |
| `LongConsumer`      | `void accept(int long)`          |
| `ObjDoubleConsumer` | `void accept(T t, double value)` |
| `ObjIntConsumer`    | `void accept(T t, int value)`    |
| `ObjLongConsumer`   | `void accept(T t, long value)`   |

## 주의 사항

함수형 인터페이스에서도 오토 박싱, 언박싱이 발생한다.

- 리턴 타입이 객체형인 경우에 대해 특히 주의할 것.
    - `Function.apply`, `Supplier.get`은 객체를 리턴하므로 박싱에 대해 생각하고 사용하자.
    - 박싱 오버헤드를 관리할 필요가 있다면 추가 인터페이스 사용을 고려하자.
- 리턴 타입이 primitive 타입인 경우는 괜찮다.
    - `Predicate.test`는 `boolean`을 리턴하므로 신경쓰지 않아도 된다.
    - `Consumer.accept`는 `void`를 리턴하므로 신경쓰지 않아도 된다.

## 참고문헌

- 웹 문서
    - [Annotation Type FunctionalInterface (Java SE 15)][se15-func-interf]
- 도서
    - Practical 모던 자바 / 장윤기 저 / 인사이트(insight) / 초판 1쇄 2020년 09월 21일
    - 이펙티브 자바 Effective Java 3/E / 조슈아 블로크 저/개앞맵시(이복연) 역 / 인사이트(insight) / 초판 2쇄 2018년 11월 21일

## 주석

[^effective-44-264]: 이펙티브 자바. Item44. 264쪽.

[se15-func-interf]: https://docs.oracle.com/en/java/javase/15/docs/api/java.base/java/lang/FunctionalInterface.html
