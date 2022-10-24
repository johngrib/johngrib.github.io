---
layout  : wiki
title   : Clojure hasheq
summary : Clojure의 hash값 계산을 담당하는 hasheq 메소드
date    : 2022-10-24 22:43:41 +0900
updated : 2022-10-24 23:07:03 +0900
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

TODO: 작성중

### String


### HashMap

### HashSet

### List


## 함께 읽기

- [[/clojure/study/hashmap]]
- [[/java/object-hashcode]]

