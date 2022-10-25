---
layout  : wiki
title   : Clojure hasheq
summary : Clojure의 hash값 계산을 담당하는 hasheq 메소드
date    : 2022-10-24 22:43:41 +0900
updated : 2022-10-25 23:54:20 +0900
tag     : clojure
toc     : true
public  : true
parent  : [[/clojure/study]]
latex   : false
---
* TOC
{:toc}

>
참고: 이 문서는 [Clojure 1.12.0-alpha1]( https://github.com/clojure/clojure/tree/clojure-1.12.0-alpha1 )을 기준으로 합니다.
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

Long 타입의 해시값은 `Murmur3.hashLong` 메소드를 사용해서 구한다.

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

#### Double

#### Integer, Short, Byte, BigInteger

#### BigDecimal

#### Float

### String


### HashMap

### HashSet

### List


## 함께 읽기

- [[/clojure/study/hashmap]]
- [[/java/object-hashcode]]

