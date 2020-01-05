---
layout  : wiki
title   : Java enum의 사용
summary : 
date    : 2020-01-05 16:23:57 +0900
updated : 2020-01-05 17:47:05 +0900
tag     : 
toc     : true
public  : true
parent  : 
latex   : false
---
* TOC
{:toc}

## enum

> 열거 타입은 일정 개수의 상수 값을 정의한 다음, 그 외의 값은 허용하지 않는 타입이다.[^effective-define]

* 다른 언어와 달리 단순한 정수 값이 아니다.
* Java의 enum 타입은 클래스이다.
* enum 상수 하나당 인스턴스가 만들어지며, 각각 `public static final` 이다.
* 컴파일 타임 안전성을 제공한다.

## 언제 사용하는가?

> **필요한 원소를 컴파일 타임에 다 알 수 있는 상수 집합이라면 항상 열거 타입을 사용하자.**
태양계 행성, 한 주의 요일, 체스 말처럼 본질적으로 열거 타입인 타입은 당연히 포함된다.
그리고 메뉴 아이템, 연산 코드, 명령줄 플래그 등 허용하는 값 모두를 컴파일타임에 이미 알고 있을 때도 쓸 수 있다.
**열거 타입에 정의된 상수 개수가 영원히 고정 불변일 필요는 없다.**
열거 타입은 나중에 상수가 추가돼도 바이너리 수준에서 호환되도록 설계되었다.
[^effective-219]

## Examples
### 가장 단순한 형태

다음은 가장 단순한 형태의 enum 이다.[^se13-8-9-3]

```java
enum Season { WINTER, SPRING, SUMMER, FALL }
```

`.values()`와 `for`를 사용해 다음과 같이 반복할 수 있다.

```java
for (Season s : Season.values()) {
    System.out.println(s);
}
/*
WINTER
SPRING
SUMMER
FALL
*/
```

### 데이터와 메서드가 있는 형태

나름의 데이터와 메서드가 있는 형태를 만들 수도 있다.[^se13-8-9-2]
```java
enum Coin {
    PENNY(1), NICKEL(5), DIME(10), QUARTER(25);
    Coin(int value) { this.value = value; }

    private final int value;
    public int value() { return value; }
}
```

다양한 내부 값을 갖고 있는 형태를 만드는 것도 가능하다.[^effective-211]

```java
public enum Planet {
    MERCURY(3.302e+23, 2.439e6),
    VENUS (4.869e+24, 6.052e6),
    EARTH (5.975e+24, 6.378e6),
    MARS (6.419e+23, 3.393e6),
    JUPITER(1.899e+27, 7.149e7),
    SATURN (5.685e+26, 6.027e7),
    URANUS (8.683e+25, 2.556e7),
    NEPTUNE(1.024e+26, 2.477e7);

    private final double mass;              // 질량(단위: kg)
    private final double radius;            // 반지름(단위: m)
    private final double surfaceGravity;    // 표면중력(단위: m / s^2)

    // 중력상수(단위: m^3 / kg s^2)
    private static final double G = 6.67300E-11;

    // Constructor
    Planet(double mass, double radius) {
        this.mass = mass;
        this.radius = radius;
        surfaceGravity = G * mass / (radius * radius);
    }

    public double mass() { return mass; }
    public double radius() { return radius; }
    public double surfaceGravity() { return surfaceGravity; }
    /* 해당 행성에서의 무게를 구한다 */
    public double surfaceWeight(double mass) {
        return mass * surfaceGravity; // F = ma
    }
}
```

### switch와 함께 사용하기

`switch`와 함께 사용한다면 모든 타입을 나열해야 할 수 있고, 마지막의 `throw`와 같은 불필요한 코드가 있어야 한다.[^effective-213]

```java
public enum Operation {
    PLUS, MINUS, TIMES, DIVIDE;

    // 상수가 뜻하는 연산을 수행한다
    public double apply(double x, double y) {
        switch (this) {
            case PLUS:
                return x + y;
            case MINUS:
                return x - y;
            case TIMES:
                return x * y;
            case DIVIDE:
                return x / y;
        }
        // 도달 불가능한 코드지만 아랫줄이 없으면 컴파일이 안된다
        throw new AssertionError("Unknown op: " + this);
    }
}
```

다음과 같이 2개의 `enum`을 사용해 `switch`를 사용하는 방법도 있다.[^se13-8-9-3]

```java
enum Coin {
    PENNY(1), NICKEL(5), DIME(10), QUARTER(25);

    Coin(int value) { this.value = value; }

    private final int value;
    public int value() { return value; }
}

enum CoinColor {COPPER, NICKEL, SILVER}

static CoinColor color(Coin c) {
    switch (c) {
        case PENNY:
            return CoinColor.COPPER;
        case NICKEL:
            return CoinColor.NICKEL;
        case DIME:
        case QUARTER:
            return CoinColor.SILVER;
        default:
            throw new AssertionError("Unknown coin: " + c);
    }
}
```

### switch의 대안으로 상수별로 다르게 동작하는 코드 구현

이펙티브 자바 3/E 에서는 위와 같은 `switch`의 대안으로 다음과 같은 방식을 소개한다.[^effective-214]

```java
public enum Operation {
    PLUS {
        public double apply(double x, double y) { return x + y; }
    },
    MINUS {
        public double apply(double x, double y) { return x - y; }
    },
    TIMES {
        public double apply(double x, double y) { return x * y; }
    },
    DIVIDE {
        public double apply(double x, double y) { return x / y; }
    };
    public abstract double apply(double x, double y);
}
```

### toString을 사용해 출력을 보기 좋게 만든 경우

`toString`을 오버라이드하여 위의 코드를 다음과 같이 출력하기 좋게 변경할 수 있다.

```java
enum Operation {
    PLUS("+") {
        public double apply(double x, double y) { return x + y; }
    },
    MINUS("-") {
        public double apply(double x, double y) { return x - y; }
    },
    TIMES("*") {
        public double apply(double x, double y) { return x * y; }
    },
    DIVIDE("/") {
        public double apply(double x, double y) { return x / y; }
    };
    private final String symbol;
    Operation(String symbol) { this.symbol = symbol; }
    @Override public String toString() { return symbol; }
    public abstract double apply(double x, double y);
}
```


## 참고문헌
* [The Java® Language Specification Java SE 13 Edition - 8.9. Enum Types][spec-8-9]
* 이펙티브 자바 Effective Java 3/E / 조슈아 블로크 저/개앞맵시(이복연) 역 / 인사이트(insight) / 초판 2쇄 2018년 11월 21일

## 주석

[^effective-define]: 이펙티브 자바 3/E. Item 34. 208쪽.
[^effective-209]: 이펙티브 자바 3/E. Item 34. 209쪽.
[^effective-211]: 이펙티브 자바 3/E. Item 34. 211쪽.
[^effective-213]: 이펙티브 자바 3/E. Item 34. 213쪽.
[^effective-214]: 이펙티브 자바 3/E. Item 34. 214쪽.
[^effective-219]: 이펙티브 자바 3/E. Item 34. 219쪽.

[^se13-8-9-2]: 출처는 [Java SE 13 Spec][se13-8-9-2].
[se13-8-9-2]: https://docs.oracle.com/javase/specs/jls/se13/html/jls-8.html#jls-8.9.2

[^se13-8-9-3]: 출처는 [Java SE 13 Spec][se13-8-9-3].
[se13-8-9-3]: https://docs.oracle.com/javase/specs/jls/se13/html/jls-8.html#jls-8.9.3

[spec-8-9]: https://docs.oracle.com/javase/specs/jls/se13/html/jls-8.html#jls-8.9
