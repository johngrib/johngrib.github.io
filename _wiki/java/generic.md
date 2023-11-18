---
layout  : wiki
title   : Java Generic
summary : 작성중
date    : 2023-11-13 23:15:12 +0900
updated : 2023-11-18 17:21:47 +0900
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


## 참고문헌

- [The Java™ Tutorials - Lesson: Generics (Updated)](https://docs.oracle.com/javase/tutorial/java/generics/index.html )
- [The Java™ Tutorials - Lesson: Generics by Gilad Bracha](https://docs.oracle.com/javase/tutorial/extra/generics/index.html )

## 주석

[tutorial]: https://docs.oracle.com/javase/tutorial/java/generics/types.html

[^tutorial-generic-types]: [The Java™ Tutorials - Lesson: Generics (Updated) - Generic Types][tutorial]
[^tutorial-types]: [The Java™ Tutorials - Lesson: Generics (Updated) - Generic Types][tutorial]의 Type Parameter Naming Conventions.


