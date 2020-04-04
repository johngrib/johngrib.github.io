---
layout  : wiki
title   : Java Abstract Class
summary : 자바 추상 클래스
date    : 2019-08-09 23:25:24 +0900
updated : 2019-11-14 22:24:15 +0900
tag     : java
toc     : true
public  : true
parent  : [[Java]]
latex   : false
---
* TOC
{:toc}

* 읽기 전에
    * 이 문서는 Java SE 12 버전을 기준으로 한다.
    * Spec 문서 상에서 Abstract class는 8 ~ 12 버전에서 변화가 없었다.

## 예제 코드

다음은 Java SE 12 Edition Spec 문서에 있는 abstract class(이하 추상 클래스)의 예제이다.[^abstract-class-example]

```java
abstract class Point {
    int x = 1, y = 1;
    void move(int dx, int dy) {
        x += dx;
        y += dy;
        alert();
    }
    abstract void alert();
}
abstract class ColoredPoint extends Point {
    int color;
}
class SimplePoint extends Point {
    void alert() { }
}
```

* 추상 클래스는 불완전하거나 불완전한 것으로 간주되는 클래스이다.
* 클래스 인스턴스 생성 표현식으로 추상 클래스의 인스턴스를 만들려고하면 컴파일 타임 에러가 발생한다.
    ```java
    Point p = new Point();  // compile-time error
    ```
* 추상 클래스를 상속받은 서브 클래스는 인스턴스화할 수 있다.
    * 물론 이 서브 클래스도 추상 클래스라면 인스턴스화할 수 없다.
* 추상 클래스가 아닌 클래스가 추상 메소드를 갖는다면 컴파일 타임 에러가 발생한다.

## 추상 클래스 구현시 주의할 점

### 구현 불가능한 메소드가 있는 경우

다음과 같이 인터페이스를 구현하면 컴파일 타임 에러가 발생한다.

```java
interface Colorable {
    void setColor(int color);
}
abstract class Colored implements Colorable {
    public abstract int setColor(int color);
}
```

왜 컴파일 에러가 발생하는가?

* `Colored`는 `Colorable` 인터페이스를 구현하므로 `void setColor(int color)`도 구현해야 한다.
* `Colored`에는 `int setColor(int color)`가 추상 메소드로 선언되어 있다.
    * 즉, `Colored`는 `void setColor(int color)`를 구현할 수가 없다.
    * 두 메소드의 시그니처가 같고 리턴 타입만 다르기 때문.

### 의도

* 서브 클래스 작성을 통해 구현을 완료하는 것을 의도하는 경우에만 클래스를 `abstract`로 선언해야 한다.
* 인스턴스화를 막기 위해 `abstract` 클래스로 선언하는 것은 바람직하지 않다.
    * 인스턴스화를 막기 위한 의도라면 `private` 생성자를 만드는 방법이 있다.[^abstract-class-example]
        ```java
        public final class Math {
            private Math() { }  // never instantiate this class
            . . . declarations of class variables and methods . . .
        }
        ```


## 추상 클래스에 대한 버전에 따른 Spec 문서 변화

### JavaSE 8

Java 8 Spec 문서의 Abstract Classes 항목에서 enum 타입을 abstract로 선언하면 컴파일 타임 에러가 발생한다는 등의 enum과 관련된 내용이 삭제됨.[^java8-abstract-class]

삭제된 내용은 다음과 같다.[^java7-abstract-class]

>
An enum type ([§8.9](https://docs.oracle.com/javase/specs/jls/se7/html/jls-8.html#jls-8.9 )) must not be declared abstract, or a compile-time error occurs.  
It is a compile-time error for an enum type E to have an abstract method m as a member unless E has one or more enum constants, and all of E's enum constants have class bodies that provide concrete implementations of m.  
It is a compile-time error for the class body of an enum constant to declare an abstract method.

그러나 Enum type 항목에서 다음 문장이 추가되었으므로[^java8-enum-types] 내용상의 변화는 없는 것 같다.

>
It is a compile-time error if an enum declaration has the modifier abstract or final.

### JavaSE 9, 10, 11, 12

* 변화 없음

## 참고문헌 및 Links

* [The Java® Language Specification Java SE 12 Edition](https://docs.oracle.com/javase/specs/jls/se12/html/index.html ) (2019-02-08)
* [The Java® Language Specification Java SE 11 Edition](https://docs.oracle.com/javase/specs/jls/se11/html/index.html ) (2018-08-21)
* [The Java® Language Specification Java SE 10 Edition](https://docs.oracle.com/javase/specs/jls/se10/html/index.html ) (2018-02-20)
* [The Java® Language Specification Java SE 9 Edition](https://docs.oracle.com/javase/specs/jls/se9/html/index.html ) (2017-08-07)
* [The Java® Language Specification Java SE 8 Edition](https://docs.oracle.com/javase/specs/jls/se8/html/index.html ) (2015-02-13)
* [The Java® Language Specification Java SE 7 Edition](https://docs.oracle.com/javase/specs/jls/se7/html/index.html ) (2013-02-28)
* [The Java™ Language Specification Third Edition](https://docs.oracle.com/javase/specs/jls/se6/html/j3TOC.html ) - Java 6 (2006)

## 주석

[^abstract-class-example]: 코드의 출처 - [The Java® Language Specification Java SE 12 Edition](https://docs.oracle.com/javase/specs/jls/se12/html/jls-8.html#jls-8.1.1.1 )
[^java8-abstract-class]: [Java SE 8 abstract Classes](https://docs.oracle.com/javase/specs/jls/se8/html/jls-8.html#jls-8.1.1.1 )
[^java7-abstract-class]: [Java SE 7 abstract Classes](https://docs.oracle.com/javase/specs/jls/se7/html/jls-8.html#jls-8.1.1.1 )
[^java8-enum-types]: [Java SE 8 Enum Types](https://docs.oracle.com/javase/specs/jls/se8/html/jls-8.html#jls-8.9 )
