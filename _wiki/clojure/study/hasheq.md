---
layout  : wiki
title   : Clojure hasheq
summary : Clojure의 hash값 계산을 담당하는 hasheq 메소드
date    : 2022-10-24 22:43:41 +0900
updated : 2022-10-27 00:27:54 +0900
tag     : clojure
resource: 74/1387B1-573E-4FC6-B5D5-D1D7BFEEC55C
toc     : true
public  : true
parent  : [[/clojure/study]]
latex   : false
---
* TOC
{:toc}

>
참고: 이 문서는 [Clojure 1.12.0-alpha1]( https://github.com/clojure/clojure/tree/clojure-1.12.0-alpha1 )과 [openjdk-jdk11](https://github.com/AdoptOpenJDK/openjdk-jdk11 )을 기준으로 합니다.
{:style="background-color: #ecf1e8;"}

## hasheq

Clojure는 Java로 만들어졌기 때문에 [[/clojure/study/hashmap]] 등을 구성할 때 [[/java/object-hashcode]]를 사용해 해시값을 계산할 것으로 생각할 수 있다.
그러나 실제로는 그렇지 않다.

Clojure는 해시값을 계산할 때 이 글의 주제인 `hasheq` Java 메소드를 사용한다.

[clojure.lang.Util:hasheq]( https://github.com/clojure/clojure/blob/clojure-1.12.0-alpha1/src/jvm/clojure/lang/Util.java#L164-L174 )

```java
public static int hasheq(Object o) {
    if(o == null)
        return 0;
    if(o instanceof IHashEq)
        return dohasheq((IHashEq) o);
    if(o instanceof Number)
        return Numbers.hasheq((Number)o);
    if(o instanceof String)
        return Murmur3.hashInt(o.hashCode());
    return o.hashCode();
}
```

### null

```java
public static int hasheq(Object o) {
    if(o == null)
        return 0;
```

`null`의 `hasheq` 값은 `0` 이다.

### IHashEq

```java
public static int hasheq(Object o) {
    // 생략
    if(o instanceof IHashEq)
        return dohasheq((IHashEq) o);
```

[clojure.lang.IHashEq]( https://github.com/clojure/clojure/blob/clojure-1.12.0-alpha1/src/jvm/clojure/lang/IHashEq.java )

```java
public interface IHashEq {
    int hasheq();
}
```

[clojure.lang.Util:dohasheq]( https://github.com/clojure/clojure/blob/clojure-1.12.0-alpha1/src/jvm/clojure/lang/Util.java#L176-L178 )

```java
private static int dohasheq(IHashEq o) {
    return o.hasheq();
}
```

`IHashEq` 인터페이스의 구현체는 `hasheq` 메소드를 호출해서 해시값을 구한다.

### Number

#### Long

[clojure.lang.Numbers:hasheq]( https://github.com/clojure/clojure/blob/clojure-1.12.0-alpha1/src/jvm/clojure/lang/Numbers.java#L1151-L1167 )

```java
static int hasheq(Number x){
    Class xc = x.getClass();

    if(xc == Long.class) {
        long lpart = x.longValue();
        return Murmur3.hashLong(lpart);
        //return (int) (lpart ^ (lpart >>> 32));
    }
    if(xc == Double.class) {
        if(x.equals(-0.0))
            return 0;  // match 0.0
        return x.hashCode();
    }
    return hasheqFrom(x, xc);
}
```

`java.lang.Long` 타입의 해시값은 `Murmur3.hashLong` 메소드를 사용해서 구한다.

[clojure.lang.Murmur3:hashLong]( https://github.com/clojure/clojure/blob/clojure-1.12.0-alpha1/src/jvm/clojure/lang/Murmur3.java#L58-L70 )

```java
public static int hashLong(long input){
    if(input == 0) return 0;
    int low = (int) input;
    int high = (int) (input >>> 32);

    int k1 = mixK1(low);
    int h1 = mixH1(seed, k1);

    k1 = mixK1(high);
    h1 = mixH1(h1, k1);

    return fmix(h1, 8);
}
```

#### Double, Float

`java.lang.Double` 타입의 해시값은 `java.lang.Number`의 `hashCode` 메소드를 사용해서 구한다.

`java.lang.Number`의 `hashCode`는 따로 오버라이드 하지 않았으므로 `java.lang.Object`의 `hashCode`를 호출하는 것과 같다.

[java.lang.Object::hashCode]( https://github.com/AdoptOpenJDK/openjdk-jdk11/blob/master/src/java.base/share/classes/java/lang/Object.java#L109 )

```java
public native int hashCode();
```

한편, `java.lang.Float` 타입도 `java.lang.Number`의 `hashCode`를 사용한다.


#### Integer, Short, Byte, BigInteger

이 타입들의 수가 `long` 타입의 범위 내에 있다면 `long`으로 변환된 다음, `Murmer3.hashLong`을 통해 해시값을 구하게 된다.

[clojure.lang.Numbers::hasheqFrom]( https://github.com/clojure/clojure/blob/clojure-1.12.0-alpha1/src/jvm/clojure/lang/Numbers.java#L1118-L1148 )

```java
static int hasheqFrom(Number x, Class xc){
    if(xc == Integer.class
            || xc == Short.class
            || xc == Byte.class
            || (xc == BigInteger.class && lte(x, Long.MAX_VALUE) && gte(x,Long.MIN_VALUE))) {
        long lpart = x.longValue();
        return Murmur3.hashLong(lpart);
        //return (int) (lpart ^ (lpart >>> 32));
    }
```

`long` 타입의 범위를 넘어선다면 `java.lang.Object`의 `hashCode`를 사용해서 해시값을 구한다.


#### BigDecimal

마지막에 붙은 소수점 이하의 무의미한 `0`을 제거하고, `java.math.BigDecimal`의 `hashCode`를 사용해서 해시값을 구한다.

[clojure.lang.Numbers::hasheqFrom]( https://github.com/clojure/clojure/blob/clojure-1.12.0-alpha1/src/jvm/clojure/lang/Numbers.java#L1118-L1148 )

```java
if(xc == BigDecimal.class) {
    // stripTrailingZeros() to make all numerically equal
    // BigDecimal values come out the same before calling
    // hashCode.  Special check for 0 because
    // stripTrailingZeros() does not do anything to values
    // equal to 0 with different scales.
    if (isZero(x))
        return BigDecimal.ZERO.hashCode();
    else {
        BigDecimal tmp = ((BigDecimal) x).stripTrailingZeros();
        return tmp.hashCode();
    }
}
```

[java.math.BigDecimal::hashCode]( https://github.com/AdoptOpenJDK/openjdk-jdk11/blob/master/src/java.base/share/classes/java/math/BigDecimal.java#L3110-L3118 )

```java
public int hashCode() {
    if (intCompact != INFLATED) {
        long val2 = (intCompact < 0)? -intCompact : intCompact;
        int temp = (int)( ((int)(val2 >>> 32)) * 31  +
                          (val2 & LONG_MASK));
        return 31*((intCompact < 0) ?-temp:temp) + scale;
    } else
        return 31*intVal.hashCode() + scale;
}
```

### String


### HashMap

### HashSet

### List


## 함께 읽기

- [[/clojure/study/hashmap]]
- [[/java/object-hashcode]]

