---
layout  : wiki
title   : Java Generic
summary : 작성중
date    : 2023-11-13 23:15:12 +0900
updated : 2023-11-18 23:02:07 +0900
tag     : 
resource: 02/76BD62-057B-4A44-A8B3-B9BC3EC7011C
toc     : true
public  : true
parent  : [[/java]]
latex   : false
---
* TOC
{:toc}

## Generic Type

>
A generic type is a generic class or interface that is parameterized over types.
[^tutorial-generic-types]

제네릭 타입은 타입을 매개변수화한 제네릭 클래스나 인터페이스다.

### Generic Class

제네릭 클래스는 다음과 같은 형식으로 정의할 수 있다.

```java
class name<T1, T2, ..., Tn> { /* ... */ }
```

### Generic Method

다음은 2개의 타입 파라미터를 사용하는 제네릭 메소드의 예이다.

```java
public class Util {
  public static <K, V> boolean compare(Pair<K, V> p1, Pair<K, V> p2) {
    return p1.getKey().equals(p2.getKey()) &&
      p1.getValue().equals(p2.getValue());
  }
}
```

위의 메소드는 아래와 같이 사용할 수 있다.

```java
Pair<Integer, String> p1 = new Pair<>(1, "apple");
Pair<Integer, String> p2 = new Pair<>(2, "pear");
boolean same = Util.<Integer, String>compare(p1, p2);
```

## Type Parameter 네이밍 컨벤션 {#type-parameter-naming-convention}

타입 매개변수 이름은 일반적으로 대문자 한 글자를 사용한다.

일반적인 클래스나 인터페이스의 이름과 구분하기 위해서이다.

주로 쓰이는 한 글자 대문자는 보통 다음과 같은 의미를 갖는다.

>
- E - Element (used extensively by the Java Collections Framework)
- K - Key
- N - Number
- T - Type
- V - Value
- S,U,V etc. - 2nd, 3rd, 4th types
[^tutorial-types]

- `E` - Element
    - Java Collections Framework에서 많이 쓰인다.
- `K` - Key
- `N` - Number
- `T` - Type
- `V` - Value
- `S`, `U`, `V` - 2번째, 3번째, 4번째 타입이 필요한 경우

## Covariance (공변) {#covariance}

>
첫 번째 가변성은 제네릭 타입이 타입 인자의 서브타입 관계를 보존하는 것이다.
`List1`이 여기에 해당한다.
`B`가 `A`의 서브타입일 때 `List1<B>`가 `List1<A>`의 서브타입이다.
약간 달리 표현하면, 타입 인자가 `A`에서 서브타입인 `B`로 변할 때 `List1<A>` 역시 서브타입인 `List1<B>`로 변한다고 말할 수 있다.
그래서 제네릭 타입이 타입 인자와 '함께 변한다'는 뜻을 담아, 이런 가변성을 공변(covariance)이라고 부른다.
[^hong-269]

Java에서는 `I<? extends T>`로 같이 공변을 표현할 수 있다. `T`로 상한선을 정의하는 방식.

```java
Class<? extends Fruit> fruitClass = Apple.class;
List<? extends Fruit> fruits = new ArrayList<Apple>();
```

## 참고문헌

- [The Java™ Tutorials - Lesson: Generics (Updated)](https://docs.oracle.com/javase/tutorial/java/generics/index.html )
- [The Java™ Tutorials - Lesson: Generics by Gilad Bracha](https://docs.oracle.com/javase/tutorial/extra/generics/index.html )
- 타입으로 견고하게 다형성으로 유연하게 / 홍재민 저 / 인사이트(insight) / 초판 1쇄 발행: 2023년 10월 19일

## 주석

[tutorial]: https://docs.oracle.com/javase/tutorial/java/generics/types.html

[^tutorial-generic-types]: [The Java™ Tutorials - Lesson: Generics (Updated) - Generic Types][tutorial]
[^tutorial-types]: [The Java™ Tutorials - Lesson: Generics (Updated) - Generic Types][tutorial]의 Type Parameter Naming Conventions.

[^hong-269]: 타입으로 견고하게 다형성으로 유연하게. 4.3장. 269쪽.

