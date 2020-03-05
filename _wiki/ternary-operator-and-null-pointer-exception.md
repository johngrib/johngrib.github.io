---
layout  : wiki
title   : Java의 삼항 연산자와 Null Pointer Exception
summary : 언박싱하다 NPE가 터지는 것이 원인
date    : 2020-03-05 22:50:36 +0900
updated : 2020-03-05 23:56:36 +0900
tag     : 
toc     : true
public  : true
parent  : [[Java]]
latex   : false
---
* TOC
{:toc}

## 발단: 삼항 연산자 사용중 NPE 발생

팀 동료가 다음과 같은 상황을 겪게 되었다.

다음 코드는 문제 상황을 단순하게 가공한 메소드이다.

```java
void occursNullPointerException() {
    Integer number1 = null;
    Integer number2 = false ? 0 : number1;
}
```

얼핏 보면 `number2`에 그냥 `null`이 대입되고 끝나야 할 것 같다.

그러나 이 메소드를 실행하면 `NullPointerException`이 발생한다.

사실 이 문제는 꽤 유명한 삼항 연산자 박싱 문제이며, Java Language Spec을 보면 어렵지 않게 이해할 수 있다.


## Spec의 언박싱 형변환

이 문제를 이해하기 위해서는 먼저 언박싱(unboxing) 형변환이 무엇인지에 대해 알아야 한다.

언박싱 형변환이 무엇인지를 알아보는 것은 쉽다.

[Spec 5.1.8][java-8-5-1-8]에 심플하게 나와 있기 때문이다.

딱 다음의 8 가지 경우만을 언박싱 형변환이라 부른다.

>
* From type `Boolean` to type `boolean`
* From type `Byte` to type `byte`
* From type `Short` to type `short`
* From type `Character` to type `char`
* From type `Integer` to type `int`
* From type `Long` to type `long`
* From type `Float` to type `float`
* From type `Double` to type `double`[^java-8-5-1-8]

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

>
If `r` is `null`, unboxing conversion throws a `NullPointerException`  
만약 `r`이 `null`이면, 언박싱 형변환은 `NullPointerException`을 던진다.

만약 `null`을 언박싱 하려 하면 `NPE`가 발생한다는 뜻이다.

## Spec의 삼항연산자(Conditional Operator)

이제 [Java 7의 Spec 15.25][java-7-15-25]를 읽어보자. Java 8 Spec을 읽지 않고 7 Spec을 먼저 읽는 이유는 7 스펙이 조금 더 이해하기 쉽기 때문이다.

Java 8 Spec의 15.25 절[^java-8-15-25]은 모든 경우의 수를 표로 정리해 두었기 때문에 읽기 좀 복잡하다.

규칙이 까다로워 보이지만 생각보다 어렵지는 않다.

삼항 연산자 표현식(conditional expression)의 타입은 다음 규칙을 통해 결정된다. 규칙이 꽤 많긴 한데 두 줄만 읽어보자.

>
* If the second and third operands have the same type (which may be the null type), then that is the type of the conditional expression.
* If one of the second and third operands is of primitive type T, and the type of the other is the result of applying boxing conversion ([§5.1.7][java7-5-1-7]) to T, then the type of the conditional expression is T.
* ...생략

번역해 보자면 다음과 같다.

* 두번째와 세번째 피연산자의 타입이 같다면(`null` 포함), 그 타입이 조건 표현식의 타입이다.
* 만약 두번째와 세번째 피연산자 둘 중 하나가 `T` 라는 primitive 타입이고, 다른 하나가 `T`를 박싱 형변환한 결과라면, 조건 표현식의 타입은 `T` 이다.

즉, 다음과 같이 생각하면 된다.

* `check ? boolean : Boolean` 이면 타입은 `boolean`이다.
* `check ? int : Integer` 이면 타입은 `int`이다.
* ...

`check ? int : Integer`를 두고 생각해 보자.

이 삼항연산자의 타입은 `int`이다.

따라서 `check`가 `false` 라면, `Integer`는 `int`로 언박싱 형변환된 다음 리턴될 것이다.

만약 `Integer`가 `null` 이라면 5.1.8 절에서 읽은 바와 같이 `null`을 언박싱 하려는 것이므로 `NPE`가 발생하게 된다.




## 주석

[java-7-15-25]: https://docs.oracle.com/javase/specs/jls/se7/html/jls-15.html#jls-15.25
[java-8-5-1-8]: https://docs.oracle.com/javase/specs/jls/se8/html/jls-5.html#jls-5.1.8
[java-8-15-25]: https://docs.oracle.com/javase/specs/jls/se8/html/jls-15.html#jls-15.25
[java7-5-1-7]: https://docs.oracle.com/javase/specs/jls/se7/html/jls-5.html#jls-5.1.7
[^java-7-15-25]: [Java 8 Language Specification 15.25 Conditional Operator ? :][java-7-15-25]
[^java-8-5-1-8]: [Java 8 Language Specification 5.1.8. Unboxing Conversion][java-8-5-1-8]
[^java-8-15-25]: [Java 8 Language Specification 15.25 Conditional Operator ? :][java-8-15-25]
