---
layout  : wiki
title   : Java의 삼항 연산자와 Null Pointer Exception
summary : 언박싱하다 NPE가 터지는 것이 원인
date    : 2020-03-05 22:50:36 +0900
updated : 2020-03-06 23:45:20 +0900
tag     : 
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

그러나 Java 7 ~ 13 에 걸쳐 모두 나타나는 문제로 알고 있다. 이전 버전은 잘 모르겠다.

다음 코드는 문제 상황을 단순하게 가공한 메소드이다.

```java
Integer occursNullPointerException() {
  boolean check = false;
  Integer number1 = null;
  Integer number2 = check ? 0 : number1;    // NPE
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

(참고로 [Java 8의 5.1.8 절][java-8-5-1-8] 과 [Java 13의 5.1.8 절][java-13-5-1-8]을 비교해보면 바뀐 점이 전혀 없다.)

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

8 스펙 문서를 먼저 읽지 않고 Java 7 스펙 문서를 먼저 읽는 이유는 7 스펙의 15.25절이 더 이해하기 쉽기 때문이다.

[Java 8 Spec의 15.25 절][java-8-15-25]은 모든 경우의 수를 표로 정리해 두었기 때문에 읽기 좀 복잡하다.

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

## NPE가 발생한 과정

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




## 주석

[java-7-15-25]: https://docs.oracle.com/javase/specs/jls/se7/html/jls-15.html#jls-15.25
[java-8-5-1-8]: https://docs.oracle.com/javase/specs/jls/se8/html/jls-5.html#jls-5.1.8
[java-13-5-1-8]: https://docs.oracle.com/javase/specs/jls/se13/html/jls-5.html#jls-5.1.8
[java-8-15-25]: https://docs.oracle.com/javase/specs/jls/se8/html/jls-15.html#jls-15.25
[java7-5-1-7]: https://docs.oracle.com/javase/specs/jls/se7/html/jls-5.html#jls-5.1.7
[^java-7-15-25]: [Java 8 Language Specification 15.25 Conditional Operator ? :][java-7-15-25]
[^java-8-5-1-8]: [Java 8 Language Specification 5.1.8. Unboxing Conversion][java-8-5-1-8]
[^java-8-15-25]: [Java 8 Language Specification 15.25 Conditional Operator ? :][java-8-15-25]
