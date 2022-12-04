---
layout  : wiki
title   : Java Abstract Methods
summary : 자바 추상 메소드
date    : 2021-05-25 23:05:20 +0900
updated : 2021-05-26 20:18:43 +0900
tag     : java
resource: 9E/F59370-707A-4DB3-AE3F-D8027E87EC16
toc     : true
public  : true
parent  : [[java]]
latex   : false
---
* TOC
{:toc}

## Java Language Specification 11

- [원문 - 8.4.3.1. abstract Methods]( https://docs.oracle.com/javase/specs/jls/se11/html/jls-8.html#jls-8.4.3.1 )

>
**8.4.3.1. abstract Methods**
>
An abstract method declaration introduces the method as a member, providing its signature ([§8.4.2][8-4-2]), result ([§8.4.5][8-4-5]), and throws clause if any ([§8.4.6][8-4-6]), but does not provide an implementation ([§8.4.7][8-4-7]). A method that is not abstract may be referred to as a concrete method.

- 추상 메소드 선언은 해당 메소드가 (클래스의) 멤버라는 것과, 메소드 시그니처, 리턴 타입, `throw`에 대한 정의는 하지만 구현은 제공하지 않습니다.
- 추상 메소드가 아닌 메소드는 구체(concrete) 메소드라 할 수 있습니다.

>
The declaration of an abstract method m must appear directly within an abstract class (call it A) unless it occurs within an enum declaration ([§8.9][8-9]); otherwise, a compile-time error occurs.
>
Every subclass of A that is not abstract ([§8.1.1.1][8-1-1-1]) must provide an implementation for m, or a compile-time error occurs.

- 추상 메소드 `m`은 반드시 추상 클래스(이를 `A`라 하자) 내에 직접 선언되어야 합니다. 그렇지 않으면 컴파일 에러가 발생합니다.
- 추상 클래스가 아닌 `A`의 모든 서브 클래스는 반드시 `m`의 구현을 제공해야 합니다. 그렇지 않으면 컴파일 에러가 발생합니다.

>
An abstract class can override an abstract method by providing another abstract method declaration.
>
This can provide a place to put a documentation comment, to refine the return type, or to declare that the set of checked exceptions that can be thrown by that method, when it is implemented by its subclasses, is to be more limited.

- 추상 클래스에서 또다른 추상 메소드 선언을 제공하면 추상 메소드를 오버라이드할 수 있습니다.
- 이렇게 오버라이드를 통해 주석을 추가하거나, 리턴 타입을 구체화하거나, 또는 하위 클래스에서 구현할 메소드가 던져야 할 checked exception 등을 정의하는데 사용할 공간을 만들 수 있습니다.

>
An instance method that is not abstract can be overridden by an abstract method.

- 추상 메소드가 아닌 인스턴스 메소드는 추상 메소드에 의해 오버라이드될 수 있습니다.

### Example 8.4.3.1-1. Abstract/Abstract Method Overriding

>
```java
class BufferEmpty extends Exception {
    BufferEmpty() { super(); }
    BufferEmpty(String s) { super(s); }
}
class BufferError extends Exception {
    BufferError() { super(); }
    BufferError(String s) { super(s); }
}
interface Buffer {
    char get() throws BufferEmpty, BufferError;
}
abstract class InfiniteBuffer implements Buffer {
    public abstract char get() throws BufferError;
}
```
>
The overriding declaration of method get in class InfiniteBuffer states that method get in any subclass of InfiniteBuffer never throws a BufferEmpty exception, putatively because it generates the data in the buffer, and thus can never run out of data.

- `Buffer` 인터페이스의 `get` 메소드는 `BufferEmpty`와 `BufferError` 예외를 던지지만, `InfiniteBuffer`는 `BufferError` 예외만을 던집니다.
- 이는 `InfiniteBuffer`의 모든 서브 클래스에 있는 `get` 메서드가 버퍼에 데이터를 생성할 것이기 때문에 `BufferEmpty` 예외를 절대로 `throw`하지 않는다는 것을 기술한 것이다.

### Example 8.4.3.1-2. Abstract/Non-Abstract Overriding

>
We can declare an abstract class Point that requires its subclasses to implement toString if they are to be complete, instantiable classes:

- 예를 들어 인스턴스화할 수 있는 서브 클래스에서 `toString` 메소드를 반드시 구현하도록 하고 싶다면, 다음과 같이 할 수 있습니다.

>
```java
abstract class Point {
    int x, y;
    public abstract String toString();
}
```

>
This abstract declaration of toString overrides the non-abstract toString method of class Object. (Class Object is the implicit direct superclass of class Point.) Adding the code:

- 이렇게 `toString`을 추상 메소드로 선언한 것은 `Object` 클래스의 `toString` 메소드를 오버라이드한 것이다. (`Object`는 암묵적으로 `Point` 클래스의 슈퍼클래스이다.)
- `Object`의 `toString`은 추상 메소드가 아니다.

>
```java
class ColoredPoint extends Point {
    int color;
    public String toString() {
        return super.toString() + ": color " + color;  // error
    }
}
```
>
results in a compile-time error because the invocation super.toString() refers to method toString in class Point, which is abstract and therefore cannot be invoked. Method toString of class Object can be made available to class ColoredPoint only if class Point explicitly makes it available through some other method, as in:

- 위의 `ColoredPoint`의 `toString`과 같이 `super.toString()`을 호출하면 컴파일 타임 에러가 발생한다.
- 왜냐하면 `super.toString()`은 추상 메소드인 `Point`의 `toString`을 참조하고 있기 때문이다.
- 만약 `ColoredPoint`에서 `Object`의 `toString`을 직접 사용할 수 있게 하려면, 다음과 같이 할 수 있다.

>
```java
abstract class Point {
    int x, y;
    public abstract String toString();
    protected String objString() { return super.toString(); }
}
class ColoredPoint extends Point {
    int color;
    public String toString() {
        return objString() + ": color " + color;  // correct
    }
}
```

## 참고문헌

- [The Java® Language Specification Java SE 11 Edition](https://docs.oracle.com/javase/specs/jls/se11/html/index.html ) (2018-08-21)
    - [8.4.3.1. abstract Methods]( https://docs.oracle.com/javase/specs/jls/se11/html/jls-8.html#jls-8.4.3.1 )

[8-4-2]: https://docs.oracle.com/javase/specs/jls/se11/html/jls-8.html#jls-8.4.2
[8-4-5]: https://docs.oracle.com/javase/specs/jls/se11/html/jls-8.html#jls-8.4.5
[8-4-6]: https://docs.oracle.com/javase/specs/jls/se11/html/jls-8.html#jls-8.4.6
[8-4-7]: https://docs.oracle.com/javase/specs/jls/se11/html/jls-8.html#jls-8.4.7
[8-9]: https://docs.oracle.com/javase/specs/jls/se11/html/jls-8.html#jls-8.9
[8-1-1-1]: https://docs.oracle.com/javase/specs/jls/se11/html/jls-8.html#jls-8.1.1.1

