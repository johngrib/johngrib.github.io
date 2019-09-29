---
layout  : wiki
title   : Java Interface
summary : 자바 인터페이스
date    : 2019-08-10 12:17:35 +0900
updated : 2019-09-29 21:01:13 +0900
tag     : java
toc     : true
public  : true
parent  : Java
latex   : false
---
* TOC
{:toc}

* 읽기 전에
    * 이 문서는 Java SE 12 버전을 기준으로 한다.

# 주의할 점

## 다중 상속시 모호한 변수 참조

다음 예제를 보자.[^java12-fields]

```java
interface BaseColors {
    int RED = 1, GREEN = 2, BLUE = 4;
}
interface RainbowColors extends BaseColors {
    int YELLOW = 3, ORANGE = 5, INDIGO = 6, VIOLET = 7;
}
interface PrintColors extends BaseColors {
    int YELLOW = 8, CYAN = 16, MAGENTA = 32;
}
interface LotsOfColors extends RainbowColors, PrintColors {
    int FUCHSIA = 17, VERMILION = 43, CHARTREUSE = RED+90;
}
```

`LotsOfColors` 인터페이스를 보면 `RainbowColors`와 `PrintColors` 두 개의 인터페이스를 상속하고 있다.

즉, `RainbowColors.YELLOW`와 `PrintColors.YELLOW`가 겹치는 상황이다.

이런 상황만으로 컴파일 에러는 발생하지 않는데, `YELLOW`를 모호하게 참조하면 컴파일 에러가 발생한다.

```java
interface LotsOfColors extends RainbowColors, PrintColors {
    int FUCHSIA = 17, VERMILION = 43, CHARTREUSE = RED+90;
    int YELLOW2 = YELLOW;   // 컴파일 에러
}
```

다음과 같이 명확하게 참조하면 컴파일 에러가 발생하지 않는다.

```java
interface LotsOfColors extends RainbowColors, PrintColors {
    int FUCHSIA = 17, VERMILION = 43, CHARTREUSE = RED+90;
    int YELLOW2 = RainbowColors.YELLOW;
}
```

## 다이아몬드 상속시 메소드 상속 우선순위

다음 예제를 보자.[^java12-inherit-overriding]

```java
interface Top {
    default String name() { return "unnamed"; }
}
interface Left extends Top {
    default String name() { return getClass().getName(); }
}
interface Right extends Top {}

interface Bottom extends Left, Right {}
```

다이아몬드 상속이 발생한 상황. Bottom은 `Right.name()`과 `Left.name()`중 어떤 것을 상속받을까?

`Left.name()`을 상속받는다. `Left`가 오버라이드를 했기 때문이다.

# 주석

[^java12-fields]: 코드 출처 - [9.3. Field (Constant) Declarations](https://docs.oracle.com/javase/specs/jls/se12/html/jls-9.html#jls-9.3 )
[^java12-inherit-overriding]: 코드 출처 - [9.4.1. Inheritance and Overriding](https://docs.oracle.com/javase/specs/jls/se12/html/jls-9.html#jls-9.4.1 )
