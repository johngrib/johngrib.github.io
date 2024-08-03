---
layout  : wiki
title   : java.util. HashSet
summary : 
date    : 2024-08-03 19:50:29 +0900
updated : 2024-08-03 20:17:15 +0900
tag     : 
resource: 56/6B7B19-CD7F-4A9A-AB8C-CE75DB9A072F
toc     : true
public  : true
parent  : [[/java]]
latex   : false
---
* TOC
{:toc}

>
이 문서는 [jdk-22-ga](https://github.com/openjdk/jdk/releases/tag/jdk-22-ga ) 버전을 참고하였다.

## HashSet은 HashMap을 사용한다 {#hashset-has-a-hashmap}

[java.util.HashSet](https://github.com/openjdk/jdk/blob/jdk-22-ga/src/java.base/share/classes/java/util/HashSet.java#L90C1-L108C6 )

```java
public class HashSet<E>
    extends AbstractSet<E>
    implements Set<E>, Cloneable, java.io.Serializable
{
    @java.io.Serial
    static final long serialVersionUID = -5024744406713321676L;

    transient HashMap<E,Object> map;

    static final Object PRESENT = new Object();

    public HashSet() {
        map = new HashMap<>();
    }

    public HashSet(Collection<? extends E> c) {
        map = HashMap.newHashMap(Math.max(c.size(), 12));
        addAll(c);
    }

    public HashSet(int initialCapacity, float loadFactor) {
        map = new HashMap<>(initialCapacity, loadFactor);
    }

    public HashSet(int initialCapacity) {
        map = new HashMap<>(initialCapacity);
    }

    HashSet(int initialCapacity, float loadFactor, boolean dummy) {
        map = new LinkedHashMap<>(initialCapacity, loadFactor);
    }
```

- `HashSet`은 `new HashMap`을 생성해 사용한다.
- `HashSet`에 입력하는 값은 `HashMap`의 key로 들어간다.
    - value로는 `PRESENT`로 이름을 붙인 `Object`를 사용한다.

## Links

- [jdk-22-ga](https://github.com/openjdk/jdk/releases/tag/jdk-22-ga )
- [java.util.HashSet](https://github.com/openjdk/jdk/blob/jdk-22-ga/src/java.base/share/classes/java/util/HashSet.java )

