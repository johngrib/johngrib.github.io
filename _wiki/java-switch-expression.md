---
layout  : wiki
title   : Java switch 문
summary : 
date    : 2019-09-11 22:23:19 +0900
updated : 2019-12-27 21:18:25 +0900
tag     : java
toc     : true
public  : true
parent  : [[Java]]
latex   : false
---
* TOC
{:toc}

## JDK 12 preview의 switch 문

12 preview 부터는 다음과 같은 편리한 용법이 추가되었다. (나중에 [instanceof의 패턴 매칭 기능](https://openjdk.java.net/jeps/305 )을 넣기 위한 사전 작업이다)

```java
switch (day) {
    case MONDAY, FRIDAY, SUNDAY -> System.out.println(6);
    case TUESDAY                -> System.out.println(7);
    case THURSDAY, SATURDAY     -> System.out.println(8);
    case WEDNESDAY              -> System.out.println(9);
}
```

변수 할당을 Scala 비슷한 느낌으로 할 수도 있다.

```java
int numLetters = switch (day) {
    case MONDAY, FRIDAY, SUNDAY -> 6;
    case TUESDAY                -> 7;
    case THURSDAY, SATURDAY     -> 8;
    case WEDNESDAY              -> 9;
};
```

```java
int j = switch (day) {
    case MONDAY  -> 0;
    case TUESDAY -> 1;
    default      -> {
        int k = day.toString().length();
        int result = f(k);
        break result;
    }
};
```

하지만 실행해보니 그냥은 사용할 수 없고 `--enable-preview` 옵션을 써야 사용할 수 있다.

IntelliJ IDE 에서도 Language level을 그냥 12를 고르면 쓸 수 없고, 12(Preview)를 골라야 사용할 수 있다.

[Java SE 12 spec 문서][spec-12]에는 기존 switch 문의 문법만 나와 있을 뿐, 새로운 방식은 나와 있지 않은 것 같았다.

13버전부터는 옵션 없이 사용할 수 있기를 바란다.


## 참고문헌

* [JEP 325: Switch Expressions (Preview)][jep-325]
* [The switch Statement (Java SE 12)][spec-12]


[jep-325]: https://openjdk.java.net/jeps/325
[spec-12]: https://docs.oracle.com/javase/specs/jls/se12/html/jls-14.html#jls-14.11
