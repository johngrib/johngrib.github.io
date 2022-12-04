---
layout  : wiki
title   : Clojure persistent map
summary : Clojure의 array map과 hash map
date    : 2022-10-16 15:16:49 +0900
updated : 2022-10-17 22:42:00 +0900
tag     : clojure java
resource: 9A/1A12A6-500C-441C-8208-04D084D9DFF7
toc     : true
public  : true
parent  : [[/clojure/study]]
latex   : true
---
* TOC
{:toc}

$$
\def\ceil#1{\lceil #1 \rceil}
\def\floor#1{\lfloor #1 \rfloor}
\def\frfr#1{\{ #1 \}}
$$

## Examples

`{}` 또는 `array-map`, `hash-map` 함수를 사용해 map을 생성할 수 있다.

```clojure
(def n:map {:a 1 :b 2 :c 3})
(def a:map (array-map :a 1 :b 2 :c 3))
(def h:map (hash-map :a 1 :b 2 :c 3))

(class n:map) ;; => clojure.lang.PersistentArrayMap
(class a:map) ;; => clojure.lang.PersistentArrayMap
(class h:map) ;; => clojure.lang.PersistentHashMap
```

## 엔트리 8개를 기준으로 구현체가 선택된다

clojure의 `{}` 표기법을 사용해 map을 만들면 엔트리의 수에 따라 타입이 달라진다.

- 엔트리 수 8개 이하: `PersistentArrayMap`
- 엔트리 수 9개 이상: `PersistentHashMap`

```clojure
(class {:a 1 :b 2 :c 3 :d 4 :e 5 :f 6 :g 7 :h 8})
;; => clojure.lang.PersistentArrayMap

(class {:a 1 :b 2 :c 3 :d 4 :e 5 :f 6 :g 7 :h 8 :i 9})
;; => clojure.lang.PersistentHashMap
```

이 분기는 [RT.java]( https://github.com/clojure/clojure/blob/1.5.x/src/jvm/clojure/lang/RT.java#L1457-L1463 )에서 찾아볼 수 있다.

```java
static public IPersistentMap map(Object... init){
    if(init == null)
        return PersistentArrayMap.EMPTY;

    // HASHTABLE_THRESHOLD 이하라면 array map을 생성한다
    else if(init.length <= PersistentArrayMap.HASHTABLE_THRESHOLD)
        return PersistentArrayMap.createWithCheck(init);

    // 그 외의 경우 hash map을 생성한다
    return PersistentHashMap.createWithCheck(init);
}
```

[HASHTABLE_THRESHOLD는 16]( https://github.com/clojure/clojure/blob/1.5.x/src/jvm/clojure/lang/PersistentArrayMap.java#L32 )으로, map에서 사용하는 엔트리 하나당 2씩 차지하므로 엔트리 8개가 기준이 된다는 것을 알 수 있다.

```java
static final int HASHTABLE_THRESHOLD = 16;
```

참고로 `PersistentArrayMap.EMPTY`는 `PersistentArrayMap`의 싱글톤이다.

[clojure.lang.PersistentArrayMap:EMPTY]( https://github.com/clojure/clojure/blob/1.5.x/src/jvm/clojure/lang/PersistentArrayMap.java#L34 )

```java
public static final PersistentArrayMap EMPTY = new PersistentArrayMap();
```

## PersistentArrayMap

`PersistentArrayMap`은 최대 길이 8인 배열을 사용하는 map으로, 매우 단순한 구조를 갖고 있으며 거의 모든 작업이 상수 시간에 수행된다.

key 탐색과 할당에 hash 알고리즘이 아니라 단순한 for loop를 사용한다.

### 생성

`PersistentArrayMap`의 생성을 이해하는 가장 쉬운 방법은 [createWithCheck]( https://github.com/clojure/clojure/blob/1.5.x/src/jvm/clojure/lang/PersistentArrayMap.java#L64-L74 ) 메소드를 읽어보는 것이다.

```java
static public PersistentArrayMap createWithCheck(Object[] init){
    // 2중 for를 돌면서 key 중복을 검사한다.
    for(int i = 0; i < init.length; i += 2) {
        for(int j = i + 2; j < init.length; j += 2) {
            if(equalKey(init[i], init[j]))
                // 중복이 있다면 예외를 던진다.
                throw new IllegalArgumentException("Duplicate key: " + init[i]);
        }
    }
    // 중복이 없다면 array map을 생성한다.
    return new PersistentArrayMap(init);
}
```

이렇게 호출된 [PersistentArrayMap의 생성자]( https://github.com/clojure/clojure/blob/1.5.x/src/jvm/clojure/lang/PersistentArrayMap.java#L142-L145 )는 다음과 같다.

```java
public PersistentArrayMap(Object[] init){
    this.array = init;
    this._meta = null;
}
```

### indexOf

`indexOf`는 private 메소드지만, `PersistentArrayMap`의 다양한 기능들이 이 메소드를 사용하므로 기능을 알아둘 필요가 있다.

`indexOf` 작은 사이즈의 배열(길이 8 이하)을 다루므로 굳이 해시값을 사용하지 않고 for loop으로 key를 찾는다.

`indexOf`를 사용하는 대표적 사례는 [containsKey]( https://github.com/clojure/clojure/blob/1.5.x/src/jvm/clojure/lang/PersistentArrayMap.java#L157-L159 ) 이다.

```java
public boolean containsKey(Object key){
    return indexOf(key) >= 0;
}
```

#### Keyword로 검색하는 경우

map에서 key의 인덱스를 찾는 [indexOf]( https://github.com/clojure/clojure/blob/1.5.x/src/jvm/clojure/lang/PersistentArrayMap.java#L263-L275 )는
주어진 key가 Keyword인지 Object인지에 따라 한번 분기하게 된다.

`indexOf` 메소드는 Keyword가 intern된 String이므로 `==` 연산자로 비교할 수 있다는 특징을 활용한다.

```java
private int indexOf(Object key){
    if(key instanceof Keyword) {
        // key가 Keyword 라면, 2씩 증가하며 키를 찾는다
        for(int i = 0; i < array.length; i += 2) {
            // key 를 찾았다면 인덱스를 리턴한다
            if(key == array[i])
                return i;
        }
        return -1;
    } else {
        // key 가 Keyword가 아니라면 Object로 검색한다.
        return indexOfObject(key);
    }
}
```

#### Object로 검색하는 경우

그런데 key가 Keyword가 아니라 Object라면 비교 작업이 약간 복잡해진다.
Clojure에서 map의 Key는 `String`과 `Number`는 물론이고 `Symbol`과 `Collection`도 가능하기 때문이다.

Clojure에서 map의 key 값으로 Keyword를 주로 사용하는 이유도 이와 관련이 있을 것이다.

[indexOfObject]( https://github.com/clojure/clojure/blob/1.5.x/src/jvm/clojure/lang/PersistentArrayMap.java#L253-L261 )

```java
// 객체가 Object 인 경우
private int indexOfObject(Object key){
    // 타입에 따른 비교자를 가져와 ep 에 할당해 둔다
    Util.EquivPred ep = Util.equivPred(key);

    // 2씩 증가하며 키를 찾는다
    for(int i = 0; i < array.length; i += 2) {
        // ep의 equiv 메소드로 비교한다
        if(ep.equiv(key, array[i]))
            return i;
    }
    return -1;
}
```

`EquivPred`는 Equivalence Predicate 를 줄여쓴 이름인 것 같다.

다음은 위에서 살펴본 `indexOfObject`에서 등장한 [equivPred]( https://github.com/clojure/clojure/blob/1.5.x/src/jvm/clojure/lang/Util.java#L70-L80 )의 코드이다.

```java
static public EquivPred equivPred(Object k1){
    if(k1 == null)
        return equivNull;
    else if (k1 instanceof Number)
        return equivNumber;
    else if (k1 instanceof String || k1 instanceof Symbol)
        return equivEquals;
    else if (k1 instanceof Collection || k1 instanceof Map)
        return equivColl;
    return equivEquals;
}
```

##### equivNull의 동등성 판별

null 판별은 간단하게 `==`를 사용한다.

[clojure.lang.Util:equivNull]( https://github.com/clojure/clojure/blob/1.5.x/src/jvm/clojure/lang/Util.java#L42-L46 )

```java
static EquivPred equivNull = new EquivPred() {
    public boolean equiv(Object k1, Object k2) {
        return k2 == null;
    }
};
```

##### equivColl의 Collection 동등성 판별

[clojure.lang.Util:equivColl]( https://github.com/clojure/clojure/blob/1.5.x/src/jvm/clojure/lang/Util.java#L62-L68 )

```java
static EquivPred equivColl = new EquivPred(){
    public boolean equiv(Object k1, Object k2) {
        if(k1 instanceof IPersistentCollection || k2 instanceof IPersistentCollection)
            return pcequiv(k1, k2);
        return k1.equals(k2);
    }
};
```

- k1 과 k2가 IPersistentCollection 인터페이스의 구현체라면 `pcequiv` 메소드를 사용해 비교한다.
    - `pcequiv`라는 메소드 이름은 Persistent Collection Equivalence의 약자인 것 같다.

[pcequiv]( https://github.com/clojure/clojure/blob/1.5.x/src/jvm/clojure/lang/Util.java#L122-L126 )의 내용은 단순히 캐스팅을 하고 `equiv`를 호출하는 방식이다.

```java
static public boolean pcequiv(Object k1, Object k2){
    if(k1 instanceof IPersistentCollection)
        return ((IPersistentCollection)k1).equiv(k2);
    return ((IPersistentCollection)k2).equiv(k1);
}
```

##### 그 외의 경우 동등성 판별

`equals`로 비교한다.

### assoc

[clojure.lang.PersistentArrayMap:assoc]( https://github.com/clojure/clojure/blob/1.5.x/src/jvm/clojure/lang/PersistentArrayMap.java#L188-L209 )

```java
public IPersistentMap assoc(Object key, Object val) {
    int i = indexOf(key);
    Object[] newArray;

    if(i >= 0) {
        // 주어진 key가 이미 map에 들어있는 경우

        if(array[i + 1] == val)
            // value 도 같다면 할당 작업을 하지 않는다. 그대로 리턴.
            return this;

        // value가 다르다면 배열을 복사하고 복사한 배열에 새로운 값을 할당한다.
        newArray = array.clone();
        newArray[i + 1] = val;

    } else {
        // 주어진 key가 map에 없는 경우

        if(array.length >= HASHTABLE_THRESHOLD)
            // array map의 사이즈 제한에 도달했다면 hash map을 생성하고, assoc 한다.
            return createHT(array).assoc(key, val);

        // array map의 사이즈 제한을 넘기지 않았다면
        // 배열을 복사하고, 복사한 배열에 새로운 key, value를 추가한다.
        newArray = new Object[array.length + 2];
        if(array.length > 0)
            System.arraycopy(array, 0, newArray, 0, array.length);
        newArray[newArray.length-2] = key;
        newArray[newArray.length-1] = val;
    }
    // 새로 만든 배열을 써서 새로운 array map을 생성한다.
    return create(newArray);
}
```

### dissoc

dissoc은 [without]( https://github.com/clojure/clojure/blob/1.5.x/src/jvm/clojure/lang/PersistentArrayMap.java#L211-L232 ) 메소드를 읽어보면 알 수 있다.

```java
public IPersistentMap without(Object key){
    int i = indexOf(key);
    if(i >= 0) {
        // key가 map에 존재한다면

        // 새로운 길이 = 기존의 길이 - 2
        int newlen = array.length - 2;

        if(newlen == 0)
            return empty();

        // 새로운 배열을 만들고, 삭제 대상 key를 제외한 나머지를 복사한다.
        Object[] newArray = new Object[newlen];
        for(int s = 0, d = 0; s < array.length; s += 2) {
            if(!equalKey(array[s], key)) {
                newArray[d] = array[s];
                newArray[d + 1] = array[s + 1];
                d += 2;
            }
        }
        // array map을 생성해 리턴한다.
        return create(newArray);
    }
    // key 가 map에 없다면 아무것도 하지 않는다.
    return this;
}
```

### count

array map의 [엔트리 카운트]( https://github.com/clojure/clojure/blob/1.5.x/src/jvm/clojure/lang/PersistentArrayMap.java#L153-L155 )는 내부의 배열 사이즈를 2로 나눈 값이다.

```java
public int count(){
    return array.length / 2;
}
```

## PersistentHashMap

### 생성

이번에도 [createWithCheck]( https://github.com/clojure/clojure/blob/1.5.x/src/jvm/clojure/lang/PersistentHashMap.java#L61-L94 ) 메소드를 읽어보자.

```java
public static PersistentHashMap createWithCheck(Object... init){
    // mutable Map 을 임시로 생성한다.
    ITransientMap ret = EMPTY.asTransient();

    for(int i = 0; i < init.length; i += 2) {
        // mutable Map에 key, value를 순서대로 추가한다.
        ret = ret.assoc(init[i], init[i + 1]);

        if(ret.count() != i/2 + 1)
            // key의 수가 증가하지 않았다면, key가 중복됐다는 뜻이다. 예외를 던진다.
            throw new IllegalArgumentException("Duplicate key: " + init[i]);
    }

    // mutable Map을 통해 immutable Map을 생성해 리턴한다.
    return (PersistentHashMap) ret.persistent();
}
```

```java
static public PersistentHashMap createWithCheck(ISeq items){
    // mutable Map 을 임시로 생성한다.
    ITransientMap ret = EMPTY.asTransient();

    // next를 사용해 시퀀스를 2개씩 순회한다.
    for(int i=0; items != null; items = items.next().next(), ++i) {
        if(items.next() == null)
            // key에 value 짝이 없다면 예외를 던진다.
            throw new IllegalArgumentException(String.format("No value supplied for key: %s", items.first()));

        // mutable Map에 key, value를 순서대로 추가한다.
        ret = ret.assoc(items.first(), RT.second(items));

        if(ret.count() != i + 1)
            // key의 수가 증가하지 않았다면, key가 중복됐다는 뜻이다. 예외를 던진다.
            throw new IllegalArgumentException("Duplicate key: " + items.first());
    }
    // mutable Map을 통해 immutable Map을 생성해 리턴한다.
    return (PersistentHashMap) ret.persistent();
}
```


## 공통

`PersistentArrayMap`과 `PersistentHashMap`의 공통 로직을 살펴보자.

### equals

`PersistentArrayMap`과 `PersistentHashMap`은 공통적으로 `APersistentMap`을 상속받고 있다.

두 클래스는 별도로 `equals` 메소드를 오버라이드하고 있지 않으므로 동등성 비교에 `APersistentMap`의 `equals` 메소드를 호출해 사용한다.

[clojure.lang.APersistentMap:equals]( https://github.com/clojure/clojure/blob/1.5.x/src/jvm/clojure/lang/APersistentMap.java#L48-L71 )

```java
public boolean equals(Object obj){
    return mapEquals(this, obj);
}

static public boolean mapEquals(IPersistentMap m1, Object obj){
    // m1과 m2가 같은 레퍼런스라면 true
    if(m1 == obj) return true;

    // m2가 Map 구현체가 아니라면 false
    if(!(obj instanceof Map))
        return false;

    Map m = (Map) obj;

    // 두 map의 사이즈가 다르면 false
    if(m.size() != m1.count())
        return false;

    for(ISeq s = m1.seq(); s != null; s = s.next()) {
        // m1의 key 하나하나가 m2에도 들어있는지 확인한다.
        Map.Entry e = (Map.Entry) s.first();
        boolean found = m.containsKey(e.getKey());

        // m1의 key가 m2에도 있다면 두 키의 value도 같은지 확인한다.
        // 같지 않다면 false
        if(!found || !Util.equals(e.getValue(), m.get(e.getKey())))
            return false;
    }

    // 이 과정을 모두 통과했다면 true
    return true;
}
```
