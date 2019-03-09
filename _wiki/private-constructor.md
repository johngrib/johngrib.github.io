---
layout  : wiki
title   : Java에서 객체가 생성되는 것을 막는 방법
summary : private 생성자를 선언한다
date    : 2018-03-04 13:47:40 +0900
updated : 2018-03-05 16:17:51 +0900
tag     : java tip
toc     : true
public  : true
parent  : Java
latex   : false
---
* TOC
{:toc}

가끔 static 메서드나, static 상수만 갖고 있는 클래스가 필요할 때가 있다.

이런 클래스들은 해당 클래스를 `new`할 일이 없다.

된다고 하더라도 **사용하지 않는 것은 막는 것이 바람직하다**고 생각한다.

이런 클래스의 대표적인 예는 `java.lang.Math`.

소스 코드를 읽어보면 전부 static 변수와 static 메서드로 이루어져 있음을 알 수 있다.

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

그렇다면 `java.lang.Math`는 `new` 키워드로 생성자를 호출하면 어떻게 될까?

```java
Math m = new Math();
```

테스트해보면 에러가 발생하는데, 그 이유는 유일한 생성자가 private으로 접근 제한이 걸려 있기 때문이다.

```java
private Math() {}
```

이를 통해 객체 생성을 막고 유틸리티 클래스로만 사용하려면 private 생성자를 만들면 된다는 것을 배울 수 있었다.



