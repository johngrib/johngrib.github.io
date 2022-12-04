---
layout  : wiki
title   : Java 키워드 정렬 순서
summary : 8.1.1, 8.3.1, 8.4.3 을 읽자
date    : 2021-03-05 20:34:20 +0900
updated : 2021-03-06 12:10:22 +0900
tag     : java jls
resource: 9D/83DF93-4016-42B4-B1E2-A5A7D2AB2A77
toc     : true
public  : true
parent  : [[java]]
latex   : false
---
* TOC
{:toc}

## 요약

Java Language Specification에서 권장하는 키워드 정렬 순서는 다음과 같다.

1. `Annotations`
1. `public`
1. `protected`
1. `private`
1. `abstract`
1. `static`
1. `final`
1. `transient`
1. `volatile`
1. `synchronized`
1. `native`
1. `strictfp`

## checkstyle의 수식어 순서 경고

다음과 같은 메소드를 작성했다고 하자.

```java
//                 ↓ 여기에 경고
final synchronized protected void hello() {
  System.out.println("Hello, World!");
}
```

그리고 checkstyle을 돌려보면 다음과 같이 `protected`가 JLS에서 권장하는 modifier 순서에 맞지 않는다는 경고를 띄운다. ([google_checks 사용][google-checks-xml])

```
'protected' modifier out of order with the JLS suggestions.
```

## JLS를 찾아보자

JLS는 "Java Language Specification"을 의미한다. 여기에서 봐야 하는 곳은 8.1.1, 8.3.1, 8.4.3 절이다.

>
[**8.1.1. Class Modifiers**][jls-8-1-1]
>
A class declaration may include class modifiers.
>
```
ClassModifier:
  (one of)
  Annotation public protected private
  abstract static final strictfp
```

>
[**8.3.1. Field Modifiers**][jls-8-3-1]
>
```
FieldModifier:
  (one of)
  Annotation public protected private
  static final transient volatile
```

>
[**8.4.3. Method Modifiers**][jls-8-4-3]
>
```
MethodModifier:
  (one of)
  Annotation public protected private
  abstract static final synchronized native strictfp
```

모두 조합해보면 다음과 같이 정리할 수 있다.

`Annotations`, `public`, `protected`, `private`, `abstract`, `static`, `final`, `transient`, `volatile`, `synchronized`, `native`, `strictfp`

[google-checks-xml]: https://github.com/checkstyle/checkstyle/blob/master/src/main/resources/google_checks.xml
[jls-8-1-1]: https://docs.oracle.com/javase/specs/jls/se8/html/jls-8.html#jls-8.1.1
[jls-8-3-1]: https://docs.oracle.com/javase/specs/jls/se8/html/jls-8.html#jls-8.3.1
[jls-8-4-3]: https://docs.oracle.com/javase/specs/jls/se8/html/jls-8.html#jls-8.4.3

