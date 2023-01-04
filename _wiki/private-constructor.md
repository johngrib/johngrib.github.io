---
layout  : wiki
title   : private 생성자 사용
summary : 특정 생성자 호출을 방지한다
date    : 2018-03-04 13:47:40 +0900
updated : 2021-05-28 13:59:40 +0900
tag     : java tip
resource: 83/A88DEE-A211-45A5-A55A-FE5468F0DA98
toc     : true
public  : true
parent  : [[java]]
latex   : false
---
* TOC
{:toc}

기본 생성자 호출을 방지하는 것이 필요한 경우에 사용하는 기본적인 기법이다.

이런 클래스의 대표적인 예는 `java.lang.Math`.

소스 코드를 읽어보면 기본 생성자에 `private`가 붙어 있음을 알 수 있다.

```java
public final class Math {

    private Math() {}

    public static final double E = 2.7182818284590452354;

    public static final double PI = 3.14159265358979323846;

    public static double sin(double a) {
        return StrictMath.sin(a); // default impl. delegates to StrictMath
    }

    public static double cos(double a) {
        return StrictMath.cos(a); // default impl. delegates to StrictMath
    }

    public static double tan(double a) {
        return StrictMath.tan(a); // default impl. delegates to StrictMath
    }

    /* ... */
}
```

당연히 다음과 같이 `new` 키워드로 `private` 생성자를 호출하면 에러가 발생한다.

```java
Math m = new Math();
```

