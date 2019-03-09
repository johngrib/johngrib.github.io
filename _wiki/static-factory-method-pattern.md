---
layout  : wiki
title   : 정적 팩토리 메서드(static factory method)
summary : static 메서드로 객체 생성을 캡슐화한다
date    : 2018-03-03 11:16:36 +0900
updated : 2018-03-04 13:03:09 +0900
tag     : programming design-pattern effective-java
toc     : true
public  : true
parent  : design-pattern
latex   : false
---
* TOC
{:toc}

주의 : 이 글은 Java 1.8 버전을 전제합니다.

## 개요

객체 생성을 캡슐화하는 기법이다.

좀 더 구체적으로는 객체를 생성하는 메소드를 만들고, static으로 선언하는 기법이다.

자바로 코딩할 때 흔하게 볼 수 있는 `valueOf` 메서드가 정적 팩토리 메서드의 한 예라 할 수 있다.

```java
BigInteger answer = BigInteger.valueOf(42L); // BigInteger 42를 리턴한다
```

`static`으로 선언된 메서드이며, `new BigInteger(...)`를 은닉하고 있다는 사실을 알 수 있다.


`valueOf` 외에, 정적 팩토리 메서드의 이름으로 흔히 사용되는 것들은 다음과 같다.

* `valueOf`
* `of`
* `getInstance`
* `newInstance`
* `getType`
* `newType`


## Effective Java

[[Effective-Java]]는 "규칙 1"에서 이 기법을 소개하고 있다.

> 규칙 1. 생성자 대신 정적 팩터리 메서드를 사용할 수 없는지 생각해 보라.

* 단, [[GoF-Design-Pattern]] 책에 나오는 **팩토리 메서드 패턴과는 다른 패턴이다. 이름만 비슷하다.**
* Effective Java 저자 조슈아 블로흐도 [[GoF-Design-Pattern]] 책에 나온 어떤 패턴과도 맞아 떨어지지 않는다며 주의하라고 한다.

Effective Java에서는 다음과 같은 장단점을 설명한다.

* 장점
    1. 이름이 있으므로 생성자에 비해 가독성이 좋다.
    2. 호출할 때마다 새로운 객체를 생성할 필요가 없다.
    3. 하위 자료형 객체를 반환할 수 있다.
    4. 형인자 자료형(parameterized type) 객체를 만들 때 편하다.

* 단점
    1. 정적 팩토리 메서드만 있는 클래스라면, 생성자가 없으므로 하위 클래스를 못 만든다.
    2. 정적 팩토리 메서드는 다른 정적 메서드와 잘 구분되지 않는다. (문서만으로 확인하기 어려울 수 있음)


## 특징

### 가독성이 좋다

다음은 전사와 마법사가 나오는 판타지 게임 소스 코드의 일부이다.

```java
class Character {

    int intelligence, strength, hitPoint, magicPoint;

    public Character(int intelligence, int strength, int hitPoint, int magicPoint) {
        this.intelligence = intelligence;   // 지능
        this.strength = strength;           // 힘
        this.hitPoint = hitPoint;           // HP
        this.magicPoint = magicPoint;       // MP
    }

    // 정적 팩토리 메소드
    public static Character newWarrior() {
        return new Character(5, 15, 20, 3);     // 전사는 힘과 HP가 높다
    }

    // 정적 팩토리 메소드
    public static Character newMage() {
        return new Character(15, 5, 10, 15);    // 마법사는 지능과 MP가 높다
    }
}
```

만약 생성자를 사용해 전사나 마법사를 생성한다면 다음과 같을 것이다.

```java
Character warrior = new Character(5, 15, 20, 3);
Character mage = new Character(15, 5, 10, 15);
```

변수명이 없었다면 5, 15, 20, 3 같은 연속된 숫자만으로는 캐릭터의 직업을 알아보기 어려웠을 것이다.

하지만 정적 팩토리 메서드를 사용한다면 좀 더 읽기 쉬운 코드가 된다.

```java
Character warrior = Character.newWarrior();
Character mage = Character.newMage();
```

### 호출할 때마다 새로운 객체를 생성할 필요가 없다

사실 위와 같이 마법사와 전사를 만드는 코드는 정적 팩토리 메서드를 호출할 때마다 `new Character(...)`를 호출하게 된다.

그러나 immutable 객체를 캐시해서 쓰고 있다면 굳이 일일이 `new` 같은 비싼 연산을 사용할 필요가 없다.

다음은 개요에서 호출 코드의 예로 사용했던 `java.math.BigInteger.valueOf`메서드의 코드이다.

```java
public static final BigInteger ZERO = new BigInteger(new int[0], 0);

private final static int MAX_CONSTANT = 16;
private static BigInteger posConst[] = new BigInteger[MAX_CONSTANT+1];
private static BigInteger negConst[] = new BigInteger[MAX_CONSTANT+1];

static {
    /* posConst에 1 ~ 16까지의 BigInteger 값을 담는다. */
    /* negConst에 -1 ~ -16까지의 BigInteger 값을 담는다. */
}

public static BigInteger valueOf(long val) {
    // 미리 만들어둔 객체를 리턴한다
    if (val == 0)
        return ZERO;
    if (val > 0 && val <= MAX_CONSTANT)
        return posConst[(int) val];
    else if (val < 0 && val >= -MAX_CONSTANT)
        return negConst[(int) -val];

    // 새로운 객체를 만들어 리턴한다
    return new BigInteger(val);
}
```

위와 같은 방법을 사용하면 흔히 사용하는 `0` 같은 값을 호출시마다 일일이 생성하는 일을 피할 수 있다.


### 하위 자료형 객체를 반환할 수 있다

리턴하는 객체의 타입을 유연하게 지정할 수 있다.

다음은 어느 가상의 인터넷 쇼핑몰에서 할인 코드를 처리하는 정적 팩토리 메서드이다.

```java
class OrderUtil {

    public static Discount createDiscountItem(String discountCode) throws Exception {
        if(!isValidCode(discountCode)) {
            throw new Exception("잘못된 할인 코드");
        }
        // 쿠폰 코드인가? 포인트 코드인가?
        if(isUsableCoupon(discountCode)) {
            return new Coupon(1000);
        } else if(isUsablePoint(discountCode)) {
            return new Point(500);
        }
        throw new Exception("이미 사용한 코드");
    }
}

class Coupon extends Discount { }
class Point extends Discount { }
```

할인 코드의 규칙에 따라 `Coupon`과 `Point` 객체를 선택적으로 리턴하고 있다.

이를 위해서는 두 하위 클래스가 같은 인터페이스를 구현하거나, 같은 부모 클래스를 갖도록 하면 된다.

만약 파일을 분리하기 애매한 작은 클래스가 있다면 private class를 활용할 수도 있다.

다음은 `java.util.Collections`에서 `EMPTY_MAP` 부분만 발췌한 것이다.

```java
@SuppressWarnings("rawtypes")
public static final Map EMPTY_MAP = new EmptyMap<>();

/**
 * Returns an empty map (immutable).  This map is serializable.
 */
@SuppressWarnings("unchecked")
public static final <K,V> Map<K,V> emptyMap() {
    return (Map<K,V>) EMPTY_MAP;
}

private static class EmptyMap<K,V> extends AbstractMap<K,V> implements Serializable {
    /* 생략 */
}
```

`EmptyMap` 클래스는 `java.util.Collections` 내에 private static으로 선언되었으며, `emptyMap`이라는 정적 팩토리 메서드를 통해 캐스팅된 인스턴스를 얻을 수 있다.

* 재미있는 사실: `java.util.Collections`의 최상단 주석을 읽어보면 Effective Java의 저자인 조슈아 블로흐의 이름을 볼 수 있다.

```java
/**
 * ...생략...
 *
 * <p>This class is a member of the
 * <a href="{@docRoot}/../technotes/guides/collections/index.html">
 * Java Collections Framework</a>.
 *
 * @author  Josh Bloch
 * @author  Neal Gafter
 * @see     Collection
 * @see     Set
 * @see     List
 * @see     Map
 * @since   1.2
 */
```

### 형인자 자료형 객체를 만들 때 편리하다

Java 1.7 이전에는 다음과 같이 형인자 자료형 객체를 만들어야 했다.

```java
Map<String, List<String>> list = new HashMap<String, List<String>>();
```

아무리 자동 완성이 있어도 타이핑하기 굉장히 짜증나는데, 정적 팩토리 메서드를 사용해서 다음과 같이 사용할 수 있었다.

```java
// 정적 팩토리 메서드: type inference를 이용한다
public static <K, V> HashMap<K, V> newInstance() {
    return new HashMap<K, V>();
}
```

```java
// 위의 정적 팩토리 메서드를 사용한다
Map<String, List<String>> list = HashMap.newInstance();
```

그러나 이 장점은 Java 1.7 이후로는 의미를 거의 잃었다.

```java
Map<String, List<String>> list = new HashMap<>();
```


## Links

* [[Effective-Java]]
* [[GoF-Design-Pattern]]
