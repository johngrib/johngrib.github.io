---
layout  : wiki
title   : Java Abstract Methods
summary : 자바 추상 메소드
date    : 2021-05-25 23:05:20 +0900
updated : 2021-05-25 23:44:21 +0900
tag     : java
toc     : true
public  : true
parent  : [[Java]]
latex   : false
---
* TOC
{:toc}

## Java Language Specification 11

>
**8.4.3.1. abstract Methods**
>
An abstract method declaration introduces the method as a member, providing its signature ([§8.4.2][8-4-2]), result ([§8.4.5][8-4-5]), and throws clause if any ([§8.4.6][8-4-6]), but does not provide an implementation ([§8.4.7][8-4-7]). A method that is not abstract may be referred to as a concrete method.
>
The declaration of an abstract method m must appear directly within an abstract class (call it A) unless it occurs within an enum declaration ([§8.9][8-9]); otherwise, a compile-time error occurs.
>
Every subclass of A that is not abstract ([§8.1.1.1][8-1-1-1]) must provide an implementation for m, or a compile-time error occurs.
>
An abstract class can override an abstract method by providing another abstract method declaration.
>
This can provide a place to put a documentation comment, to refine the return type, or to declare that the set of checked exceptions that can be thrown by that method, when it is implemented by its subclasses, is to be more limited.
>
An instance method that is not abstract can be overridden by an abstract method.
>
**8.4.3.1. 추상 메소드**
>
추상 메소드 선언은 해당 메소드가 (클래스의) 멤버라는 것과, 메소드 시그니처, 리턴 타입, `throw`에 대한 정의는 하지만 구현은 제공하지 않습니다.
추상 메소드가 아닌 메소드는 구체(concrete) 메소드라 할 수 있습니다.
>
추상 메소드 `m`은 반드시 직접적으로 추상 클래스(이를 `A`라 하자) 내에 선언되어야 합니다. 그렇지 않으면 컴파일 에러가 발생합니다.
>
추상 클래스가 아닌 `A`의 모든 서브 클래스는 반드시 `m`의 구현을 제공해야 합니다. 그렇지 않으면 컴파일 에러가 발생합니다.
>
추상 클래스는 또다른 추상 메소드 선언을 제공하는 것으로, 추상 메소드를 오버라이드할 수 있습니다.
>
이런 오버라이드를 통해 주석을 추가하거나, 리턴 타입을 구체화하거나, 또는 하위 클래스에서 구현할 메소드가 던져야 할 checked exception 등을 정의하는데 사용할 공간을 만들 수 있습니다.
>
추상 메소드가 아닌 인스턴스 메소드는 추상 메소드에 의해 오버라이드될 수 있습니다.



## 참고문헌

- [The Java® Language Specification Java SE 11 Edition](https://docs.oracle.com/javase/specs/jls/se11/html/index.html ) (2018-08-21)
    - [8.4.3.1. abstract Methods]( https://docs.oracle.com/javase/specs/jls/se11/html/jls-8.html#jls-8.4.3.1 )

[8-4-2]: https://docs.oracle.com/javase/specs/jls/se11/html/jls-8.html#jls-8.4.2
[8-4-5]: https://docs.oracle.com/javase/specs/jls/se11/html/jls-8.html#jls-8.4.5
[8-4-6]: https://docs.oracle.com/javase/specs/jls/se11/html/jls-8.html#jls-8.4.6
[8-4-7]: https://docs.oracle.com/javase/specs/jls/se11/html/jls-8.html#jls-8.4.7
[8-9]: https://docs.oracle.com/javase/specs/jls/se11/html/jls-8.html#jls-8.9
[8-1-1-1]: https://docs.oracle.com/javase/specs/jls/se11/html/jls-8.html#jls-8.1.1.1

