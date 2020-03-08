---
layout  : wiki
title   : Java의 삼항 연산자와 Null Pointer Exception
summary : 언박싱하다 NPE가 터지는 것이 원인
date    : 2020-03-05 22:50:36 +0900
updated : 2020-03-08 18:40:21 +0900
tag     : java
toc     : true
public  : true
parent  : [[Java]]
latex   : false
---
* TOC
{:toc}

## 발단: 삼항 연산자 사용중 NPE 발생

팀 동료가 삼항 연산자를 사용하다 NPE가 발생하는 문제를 경험하게 되어 기록한다.

동료가 사용한 Java 버전은 11이고, 내가 사용한 Java 버전은 13 이다.

그러나 Java 7 ~ 13 에 걸쳐 모두 나타나는 문제로 알고 있다. Java 6 이전은 잘 모르겠다.

다음 코드는 문제 상황을 단순하게 가공한 메소드이다.

```java
Integer occursNullPointerException() {
  boolean check = false;
  Integer number1 = null;
  Integer number2 = check ? 0 : number1; // NPE
  return number2;
}
```

얼핏 보면 `number2`에 그냥 `null`이 대입되어, `null`을 리턴하게 될 것 같다.

그러나 이 메소드를 실행하면 삼항 연산자가 있는 라인에서 `NullPointerException`이 발생한다.

사실 이 문제는 자바 세계에서는 유명한 삼항 연산자 언박싱 문제이며, Java Language Specification을 보면 어렵지 않게 이해할 수 있다.

## 용어: 삼항 연산자와 Conditional Operator

문제를 이해하기 전에 먼저 용어에 대해 정리할 필요가 있다.

삼항연산자는 말은 항이 셋인 연산자라는 뜻이다.

따라서 `? :`로 표현하는 연산자만을 지칭하는 단어가 아니다.

[Java 8 Language Specification][java-8-15-25]에서는 삼항 연산자를 `Conditional Operator`라고 부르고 있다.

번역하자면 **조건 연산자**라 할 수 있겠다.

그러므로 이 문서의 아래 부분부터는 삼항 연산자가 아니라 조건 연산자라는 표현을 사용하겠다.

## 스펙 문서를 읽어보자
### Java의 언박싱 형변환

이 문제를 이해하기 위해서는 먼저 언박싱(unboxing) 형변환이 무엇인지에 대해 알아야 한다.

언박싱 형변환이 무엇인지를 알아보는 것은 쉽다.

[Java 8 Language Specification 5.1.8. Unboxing Conversion][java-8-5-1-8]에 심플하게 나와 있기 때문이다.

다음의 딱 8 가지 경우만을 언박싱 형변환이라 부른다.

>
* From type `Boolean` to type `boolean`
* From type `Byte` to type `byte`
* From type `Short` to type `short`
* From type `Character` to type `char`
* From type `Integer` to type `int`
* From type `Long` to type `long`
* From type `Float` to type `float`
* From type `Double` to type `double`

(참고로 [Java 7의 5.1.8 절][java-7-5-1-8] 과 [Java 13의 5.1.8 절][java-13-5-1-8]을 비교해보면 바뀐 점이 전혀 없다.)

그리고 언박싱 형변환은 런타임에 다음과 같이 처리된다.

>
* If `r` is a reference of type `Boolean`, then unboxing conversion converts `r` into `r.booleanValue()`
* If `r` is a reference of type `Byte`, then unboxing conversion converts `r` into `r.byteValue()`
* If `r` is a reference of type `Character`, then unboxing conversion converts `r` into `r.charValue()`
* If `r` is a reference of type `Short`, then unboxing conversion converts `r` into `r.shortValue()`
* If `r` is a reference of type `Integer`, then unboxing conversion converts `r` into `r.intValue()`
* If `r` is a reference of type `Long`, then unboxing conversion converts `r` into `r.longValue()`
* If `r` is a reference of type `Float`, unboxing conversion converts `r` into `r.floatValue()`
* If `r` is a reference of type `Double`, then unboxing conversion converts `r` into `r.doubleValue()`
* If `r` is `null`, unboxing conversion throws a `NullPointerException`

여기에서 주목할 곳은 마지막 줄이다.

> If `r` is `null`, unboxing conversion throws a `NullPointerException`  

번역하자면 다음과 같다.

> 만약 `r`이 `null`이면, 언박싱 형변환은 `NullPointerException`을 던진다.

만약 `null`을 언박싱 하려 하면 `NPE`가 발생한다는 뜻이다.


### Java의 조건 연산자

이제 [Java 7 Language Specification 15.25. Conditional Operator ? :][java-7-15-25]를 읽어보자.

[Java 8 스펙 문서][java-8-15-25]를 먼저 읽지 않고 Java 7 스펙 문서를 먼저 읽는 이유는 7 스펙의 15.25절이 더 이해하기 쉽기 때문이다.

8 스펙 문서는 모든 경우의 수를 표로 정리해 두었기 때문에 읽기 좀 복잡하다. (궁금하다면 이 글의 [부록 A](#부록-a-java-13-스펙의-1525-절 )를 읽어보자.)

**이 부분을 읽을 때 주목할 점은 조건 연산자에 타입이 있다는 것이다.**

즉 조건 연산자는 `if`와는 다르다. 결과가 특정 타입으로 평가되는 표현식인 것이다.

#### 조건 연산자의 타입은 어떻게 결정되는가?

조건 연산자 표현식의 타입 결정 규칙은 스펙 문서에 잘 나와있다.

두 줄만 읽어보자.

>
* If the second and third operands have the same type (which may be the null type), then that is the type of the conditional expression.
* If one of the second and third operands is of primitive type `T`, and the type of the other is the result of applying boxing conversion ([§5.1.7][java7-5-1-7]) to `T`, then the type of the conditional expression is `T`.

번역해 보자면 다음과 같다.

>
* 두번째와 세번째 피연산자의 타입이 같다면(`null` 포함), 그 타입이 조건 표현식의 타입이다.
* 만약 두번째와 세번째 피연산자 둘 중 하나가 `T` 라는 primitive 타입이고, 다른 하나가 `T`를 박싱 형변환한 결과라면, 조건 표현식의 타입은 `T` 이다.

즉, 다음과 같이 생각하면 된다.

* `check ? null : null` 이면 타입은 `null`이다.
* `check ? Double : Double` 이면 타입은 `Double`이다.
* `check ? Boolean : boolean` 이면 타입은 `boolean`이다.
* `check ? int : Integer` 이면 타입은 `int`이다.

## 결론: NPE가 발생한 과정

스펙 문서는 충분히 읽었다. 이제 문제의 코드를 다시 살펴보자.

```java
Integer occursNullPointerException() {
  boolean check = false;
  Integer number1 = null;
  Integer number2 = check ? 0 : number1;    // NPE
  return number2;
}
```

조건 연산자의 타입은 `Integer`일까? 아니면 `int`일까?

**primitive `0`이 있으므로, 조건 연산자의 타입은 `int`가 된다.**

따라서

* 조건절이 `true` 이면 `int` 인 `0`이 된다.
    * 아무런 예외가 발생하지 않는다.
* 조건절이 `false` 이면 `Integer`인 `number1`을 `int`로 언박싱한다.
    * [5.1.8 절][java-8-5-1-8]에서 읽은 바와 같이 `null`을 언박싱 하는 것이므로 `NPE` 발생.

문제의 코드에서는 조건절이 `false` 였다.

그러므로 `number1`은 `Integer`에서 `int`로 언박싱되며, 다음 코드처럼 작동하게 된다.

```java
Integer occursNullPointerException() {
  boolean check = false;
  Integer number1 = null;
  Integer number2 = check ? 0 : number1.intValue(); // NPE
  return number2;
}
```

그런데 `number1`이 `null` 이므로 `NPE`가 발생하게 된다.


## 문제가 발생하지 않게 하려면 어떻게 해야 할까?

### 그냥 if 문을 쓴다

`if` 문은 이해하기 쉽고 심플하다.

```java
Integer getNumberWithoutNPE() {
  boolean check = false;
  Integer number1 = null;
  if (check) {
    return 0;
  }
  return number1;
}
```

### 조건 연산자의 타입을 맞춰준다

`0`을 `Integer`로 제공하면 조건 연산자의 타입이 `Integer`가 되므로 문제가 해결된다.

```java
Integer getNumberWithoutNPE() {
  boolean check = false;
  Integer number1 = null;
  Integer number2 = check ? Integer.valueOf(0) : number1;
  return number2;
}
```

## 부록 A. Java 13 스펙의 15.25 절

위에서는 [8 스펙 문서의 15.25 절][java-8-15-25]을 읽지 않고 [7 스펙 문서의 15.25 절][java-7-15-25]만 살펴 보았다.

그러나 그냥 넘어가면 아쉬우니 읽어보도록 하자. 사실 핵심은 Java 7 스펙 문서와 달라진 것이 없고, 모든 경우의 수를 자세히 나열하고 있기 때문에 여기부터는 관점에 따라 불필요한 파고들기로 보일 수도 있다.

(참고로 [Java 8 Spec의 15.25 절][java-8-15-25]과 [Java 13 Spec의 15.25 절][java-8-15-25]은 딱 한 줄만 다르고 나머지는 모두 같다.)

13의 스펙 문서가 한 줄이 더 많으므로 8은 건너뛰고 13의 15.25 절을 읽어 보도록 하겠다.

### 조건 표현식 타입의 결정

조건 표현식의 타입을 결정하는 부분에 대한 이야기는 세 파트로 나뉘어 있다.

1. `boolean` 표현식 파트
2. `numeric` 표현식 파트
3. 그 외의 경우 파트

>
* If both the second and the third operand expressions are boolean expressions, the conditional expression is a boolean conditional expression.
For the purpose of classifying a conditional, the following expressions are boolean expressions:
    * An expression of a standalone form ([§15.2][15-2]) that has type boolean or Boolean.
    * A parenthesized boolean expression ([§15.8.5][15-8-5]).
    * A class instance creation expression ([§15.9][15-9]) for class Boolean.
    * A method invocation expression ([§15.12][15-12]) for which the chosen most specific method ([§15.12.2.5][15-12-2-5]) has return type boolean or Boolean.<br/>Note that, for a generic method, this is the type before instantiating the method's type arguments.
    * A boolean conditional expression.

>
* If both the second and the third operand expressions are numeric expressions, the conditional expression is a numeric conditional expression.<br/>For the purpose of classifying a conditional, the following expressions are numeric expressions:
    * An expression of a standalone form ([§15.2][15-2]) with a type that is convertible to a numeric type ([§4.2][4-2], [§5.1.8][5-1-8]).
    * A parenthesized numeric expression ([§15.8.5][15-8-5]).
    * A class instance creation expression ([§15.9][15-9]) for a class that is convertible to a numeric type.
    * A method invocation expression ([§15.12][15-12]) for which the chosen most specific method ([§15.12.2.5][15-12-2-5]) has a return type that is convertible to a numeric type.<br/>Note that, for a generic method, this is the type before instantiating the method's type arguments.
    * A numeric conditional expression.

>
* Otherwise, the conditional expression is a reference conditional expression.

내용은 많지만 7 스펙을 기억하고 있다면 어렵지 않게 이해할 수 있다. 요약하자면 다음과 같다.

* 두번째, 세번째 피연산자가 모두 `boolean`이면 조건 표현식의 타입은 `boolean`이 된다.
* 두번째, 세번째 피연산자가 모두 `numeric` 타입이면 조건 표현식의 타입도 `numeric`이다.
* 그 외의 경우, 조건 표현식의 타입은 참조이다.

여기에서 경우의 수가 많이 나뉘는 곳은 `numeric` 타입에 대한 것이다. 그래서 모든 경우의 수가 테이블로 정리되어 있다.

이 표를 이해하려면 `bnp`와 `lub`가 무엇인지 먼저 알아야 한다.

#### BNP: Binary Numeric Promotion

`bnp`는 **Binary Numeric Promotion**를 말한다.

이 부분에서 Java Specification 문서는 BNP 에 대해 링크를 안 걸어놨기 때문에, 이 문서를 처음 본다면 당황할 수 있다.
그러나 다행히 링크만 안 걸려 있을 뿐이고 BNP 문서는 존재한다.

[5.6.2. Binary Numeric Promotion 절][5-6-2]이 있기 때문에 그걸 읽어보면 된다.

(참고로 Java 7 의 5.6.2 절과 Java 13의 5.6.2절은 단어 하나가 바뀌고, 잘못 쓰인 쉼표 하나가 빠진 것 빼고는 똑같다.)

앞 부분만 먼저 읽어보자.

>
When an operator applies binary numeric promotion to a pair of operands, each of which must denote a value that is convertible to a numeric type, the following rules apply, in order:  
1. If any operand is of a reference type, it is subjected to unboxing conversion ([§5.1.8][5-1-8]).
2. Widening primitive conversion ([§5.1.2][5-1-2]) is applied to convert either or both operands as specified by the following rules:
    * If either operand is of type double, the other is converted to double.
    * Otherwise, if either operand is of type float, the other is converted to float.
    * Otherwise, if either operand is of type long, the other is converted to long.
    * Otherwise, both operands are converted to type int.

[15.25][15-25]의 표를 이해하기 위한 최소한의 bnp의 알고리즘은 다음과 같다.

1. 모든 레퍼런스 타입은 먼저 언박싱 형변환을 한다.
2. 그리고 다음 절차를 따른다.
    * 피연산자 중 하나가 `double`이면, 다른 피연산자는 `double`로 형변환된다.
    * `double`이 아니라, `float`이라면, 다른 피연산자는 `float`으로 형변환된다.
    * `float`이 아니라, `long`이라면, 다른 피연산자는 `long`으로 형변환된다.
    * 그 외의 경우에 두 피연산자는 모두 `int`로 형변환 된다.

즉 일종의 우선순위이다.

```
double > float > long > int
```


가령 `bnp(double, Float)`이 있다면 다음의 절차를 거치게 된다.

* `bnp(double, Float)` → `bnp(double, float)` → `double`

만약 `bnp(Integer, Byte)`가 있다면 다음과 같이 된다.

* `bnp(Integer, Byte)` → `bnp(int, byte)` → `int`

#### LUB: Least Upper Bound

`lub`는 상속 계통에서 공통된 가장 가까운 조상 타입이다.

자세한 내용이 궁금하면 [4.10.4. Least Upper Bound][4-10-4]를 읽어보도록 하자.

### 표: 모든 경우의 수

![]( /post-img/ternary-operator-and-null-pointer-exception/15-25-a.png )  
![]( /post-img/ternary-operator-and-null-pointer-exception/15-25-b.png )  
![]( /post-img/ternary-operator-and-null-pointer-exception/15-25-c.png )  
![]( /post-img/ternary-operator-and-null-pointer-exception/15-25-d.png )  
![]( /post-img/ternary-operator-and-null-pointer-exception/15-25-e.png )  

### 예: 표를 읽는 방법

![byte-short]( /post-img/ternary-operator-and-null-pointer-exception/byte-short.png )

2번째 항이 `byte`이고 3번째 항이 `short` 이면?

* 표에서 다음과 같이 찾는다.
    * 즉 `check ? byte : short`의 타입은 `short`이다.

![]( /post-img/ternary-operator-and-null-pointer-exception/example2.png )

2번째 항이 `int` 이고 3번째 항이 `long` 이면?

* 표에서 찾아보면... `bnp(int, long)` 이다.
    * `bnp` 규칙에 따라 `bnp(int, long)` → `long` 이다.

2번째 항이 `Long` 이고 3번째 항이 `float` 이면?

* 표에서 찾아보면... `bnp(Long, float)` 이다.
    * `bnp` 규칙에 따라 `bnp(long, float)` → `float` 이다.

![]( /post-img/ternary-operator-and-null-pointer-exception/or-bnp.png )

2번째 항이 `int` 이고 3번째 항이 `byte` 이면?

* 표에서 찾아보면... `byte | bnp(int, byte)` 이다.
    * 한 눈에 `byte | int`라는 것을 알아볼 수 있다.
    * 즉, `byte`로 표현 가능한 값이면 `byte`, 그렇지 않다면 `int`가 된다는 뜻이다.

## 함께 읽기

* [[use-java-primitive-type-for-performance]]{Java Autoboxing 자동 변환 주의점}


[java-7-15-25]: https://docs.oracle.com/javase/specs/jls/se7/html/jls-15.html#jls-15.25
[java-7-5-1-8]: https://docs.oracle.com/javase/specs/jls/se7/html/jls-5.html#jls-5.1.8
[java-8-5-1-8]: https://docs.oracle.com/javase/specs/jls/se8/html/jls-5.html#jls-5.1.8
[java-13-5-1-8]: https://docs.oracle.com/javase/specs/jls/se13/html/jls-5.html#jls-5.1.8
[java-8-15-25]: https://docs.oracle.com/javase/specs/jls/se8/html/jls-15.html#jls-15.25
[java7-5-1-7]: https://docs.oracle.com/javase/specs/jls/se7/html/jls-5.html#jls-5.1.7

[4-2]: https://docs.oracle.com/javase/specs/jls/se13/html/jls-4.html#jls-4.2
[4-10-4]: https://docs.oracle.com/javase/specs/jls/se13/html/jls-4.html#jls-4.10.4
[5-1-2]: https://docs.oracle.com/javase/specs/jls/se13/html/jls-5.html#jls-5.1.2
[5-1-8]: https://docs.oracle.com/javase/specs/jls/se13/html/jls-5.html#jls-5.1.8
[5-6-2]: https://docs.oracle.com/javase/specs/jls/se13/html/jls-5.html#jls-5.6.2
[15-2]: https://docs.oracle.com/javase/specs/jls/se13/html/jls-15.html#jls-15.2
[15-25]: https://docs.oracle.com/javase/specs/jls/se13/html/jls-15.html#jls-15.25
[15-8-5]: https://docs.oracle.com/javase/specs/jls/se13/html/jls-15.html#jls-15.8.5
[15-9]: https://docs.oracle.com/javase/specs/jls/se13/html/jls-15.html#jls-15.9
[15-12]: https://docs.oracle.com/javase/specs/jls/se13/html/jls-15.html#jls-15.12
[15-12-2-5]: https://docs.oracle.com/javase/specs/jls/se13/html/jls-15.html#jls-15.12.2.5


[^java-7-15-25]: [Java 8 Language Specification 15.25 Conditional Operator ? :][java-7-15-25]
[^java-8-5-1-8]: [Java 8 Language Specification 5.1.8. Unboxing Conversion][java-8-5-1-8]
[^java-8-15-25]: [Java 8 Language Specification 15.25 Conditional Operator ? :][java-8-15-25]

