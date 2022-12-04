---
layout  : wiki
title   : Clojure map
summary : 
date    : 2022-01-31 21:57:24 +0900
updated : 2022-02-16 23:53:23 +0900
tag     : clojure
resource: A6/D93582-768A-4B1D-A172-681F5B51B6B6
toc     : true
public  : true
parent  : [[/clojure/study]]
latex   : false
---
* TOC
{:toc}

## map과 map

Clojure에서 `map`은 두 가지 의미를 갖는다.

- 함수 `map`: `list`에 함수 `f`를 적용하는 함수.
- 자료구조 `map`: `#{:name "John"}`. Hash Map.

둘을 구분하기 위해 이 문서에서는 자료구조로서의 map을 Hash Map, 해시맵이라 부른다.

## 함수 map
### defn map

```clojure
(defn map
  "Returns a lazy sequence consisting of the result of applying f to
  the set of first items of each coll, followed by applying f to the
  set of second items in each coll, until any one of the colls is
  exhausted.  Any remaining items in other colls are ignored. Function
  f should accept number-of-colls arguments. Returns a transducer when
  no collection is provided."
  {:added "1.0"
   :static true}
  ([f]
    (fn [rf]
      (fn
        ([] (rf))
        ([result] (rf result))
        ([result input]
           (rf result (f input)))
        ([result input & inputs]
           (rf result (apply f input inputs))))))
  ([f coll]
   (lazy-seq
    (when-let [s (seq coll)]
      (if (chunked-seq? s)
        (let [c (chunk-first s)
              size (int (count c))
              b (chunk-buffer size)]
          (dotimes [i size]
              (chunk-append b (f (.nth c i))))
          (chunk-cons (chunk b) (map f (chunk-rest s))))
        (cons (f (first s)) (map f (rest s)))))))
  ([f c1 c2]
   (lazy-seq
    (let [s1 (seq c1) s2 (seq c2)]
      (when (and s1 s2)
        (cons (f (first s1) (first s2))
              (map f (rest s1) (rest s2)))))))
  ([f c1 c2 c3]
   (lazy-seq
    (let [s1 (seq c1) s2 (seq c2) s3 (seq c3)]
      (when (and  s1 s2 s3)
        (cons (f (first s1) (first s2) (first s3))
              (map f (rest s1) (rest s2) (rest s3)))))))
  ([f c1 c2 c3 & colls]
   (let [step (fn step [cs]
                 (lazy-seq
                  (let [ss (map seq cs)]
                    (when (every? identity ss)
                      (cons (map first ss) (step (map rest ss)))))))]
     (map #(apply f %) (step (conj colls c3 c2 c1))))))
```

### Examples

`map` 함수의 기본적인 사용은 리스트에 적용할 함수를 제공하는 것이다.

```clojure
(map inc [1 2 3])   ; (2 3 4)
(map inc '(1 2 3))  ; (2 3 4)
(map even? [1 2 3]) ; (false true false)
(map str [1 2 3])   ; ("1" "2" "3")

; 익명 함수
(map #(* 2 %) [1 2 3]) ; (2 4 6)
```

그렇다고 리스트에만 사용할 수 있는 건 아니다.

```clojure
; 집합에 적용
(map inc #{1 2 3}) ; (2 4 3)
```

hash map에 적용할 때에는 hash map의 각 `MapEntry`에 적용된다.

```clojure
; hash map 에 적용
(map (fn [entry] (type entry))
     {:name "John" :age 28})
=> (clojure.lang.MapEntry clojure.lang.MapEntry)
```

`MapEntry`는 vector처럼 사용할 수 있다.

```clojure
(map (fn [entry] entry)
     {:name "John" :age 28})
=> ([:name "John"] [:age 28])

(map (fn [entry] (str (first entry) "->" (second entry)))
     {:name "John" :age 28})
=> (":name->John" ":age->28")

; entry를 구조분해하여 key 와 value 를 사용
(map (fn [[key value]] (str key "->" value))
     {:name "John" :age 28})
=> (":name->John" ":age->28")
```

함수처럼 사용할 수 있는 자료구조를 적용하는 것도 가능하다.

```clojure
; hash set을 리스트에 적용
(map #{1 3 5}
     [1 2 3 4 5])
=> (1 nil 3 nil 5)

; hash map을 리스트에 적용
(map {1 "일" 3 "삼" 5 "오"}
     [1 2 3 4 5])
=> ("일" nil "삼" nil "오")

; 키워드를 hash map을 아이템으로 삼는 리스트에 적용
(map :name
     [{:age 10 :name "John"} {:age 11 :name "Jack"}])
=> ("John" "Jack")
```

여러 개의 리스트에 적용하면, 리스트의 각 아이템 순서쌍에 적용한다.

```clojure
(map +
     [1 2 3]
     [100 200 300])
=> (101 202 303)

(map #(str %1 "," %2)
     [1 2 3]
     [100 200 300])
=> ("1,100" "2,200" "3,300")

(map #(str %1 "," %2 "," %3)
     [1 2 3]
     [100 200 300]
     [:a :b :c])
=> ("1,100,:a" "2,200,:b" "3,300,:c")
```

## 자료구조 map

### Examples

`{key value key value ...}` 형태로 선언할 수 있다.

```clojure
{:a 1 :b 2 :c 3}
```

Java나 Javascript 같은 다른 언어에 익숙하다면 key 값으로 문자열을 사용하는 것이 익숙하겠지만, Clojure에서는 hash map의 key로 Keyword를 주로 사용한다.

```clojure
; 문자열을 key 로 사용하는 경우
{"a" 1 "b" 2 "c" 3}

; Clojure의 Keyword를 key로 사용하는 경우(권장)
{:a 1 :b 2 :c 3}
```

hash map에서 값을 꺼내는 기본적인 방법은 3가지.

- hash map을 함수로 사용하고, key를 인자로 제공하는 방법.
- Keyword를 함수로 사용하고, hash map을 인자로 제공하는 방법. (권장)
- `get` 함수를 사용하는 방법.
    - `get` 함수는 찾는 값이 없을 경우의 대안도 정의할 수 있다.

```clojure
; hash map을 함수로 사용하는 경우
({:a 1 :b 2 :c 3} :b) ; 2

; Keyword를 함수로 사용하는 경우
(:b {:a 1 :b 2 :c 3}) ; 2

; 그냥 get 함수를 사용하는 경우
(get {:a 1 :b 2 :c 3} :b) ; 2

; get을 쓰면 찾는 값이 없는 경우의 대안을 제공할 수 있다
(get {:a 1 :b 2 :c 3} :d 777)
=> 777
```

`assoc`, `dissoc`의 사용.

```clojure
(assoc {:a 1 :b 2 :c 3} :b 1000) ; {:a 1, :b 1000, :c 3}
(assoc {:a 1 :b 2 :c 3} :d 888)  ; {:a 1, :b 2, :c 3, :d 888}

(dissoc {:a 1 :b 2 :c 3} :a)     ; {:b 2, :c 3}
```

`merge`를 쓰면 두 hash map을 합친 hash map을 얻을 수 있다. 단 중복 key가 있다면 나중의 hash map의 것으로 적용된다.

```clojure
(merge {:a 1 :b 2 :c 3} {:a 100 :d 400})
=> {:a 100, :b 2, :c 3, :d 400}
```

### IPersistentMap

Clojure의 RunTime을 담당하는 `RT.java`의 `map`함수를 읽어보면 인자의 수에 따라 `PersistentArrayMap`과 `PersistentHashMap`을 선택적으로 생성하고 있음을 알 수 있다.

[clojure.lang.RT::map]( https://github.com/clojure/clojure/blob/clojure-1.11.0-alpha4/src/jvm/clojure/lang/RT.java#L1588-L1594 )

```java
static public IPersistentMap map(Object... init){
    if(init == null || init.length == 0)
        return PersistentArrayMap.EMPTY;
    else if(init.length <= PersistentArrayMap.HASHTABLE_THRESHOLD)
        return PersistentArrayMap.createWithCheck(init);
    return PersistentHashMap.createWithCheck(init);
}
```

`HASHTABLE_THRESHOLD`는 상수로, `16`이다.

[clojure.lang.PersistentArrayMap::HASHTABLE_THRESHOLD]( https://github.com/clojure/clojure/blob/clojure-1.11.0-alpha4/src/jvm/clojure/lang/PersistentArrayMap.java#L33 )

```java
static final int HASHTABLE_THRESHOLD = 16;
```

이걸 검증해보는 건 쉬운 일이다.

```clojure
(type {:a 1 :b 2 :c 3 :d 4 :e 5 :f 6 :g 7 :h 8})
=> clojure.lang.PersistentArrayMap

(type {:a 1 :b 2 :c 3 :d 4 :e 5 :f 6 :g 7 :h 8 :i 9})
=> clojure.lang.PersistentHashMap
```

16개의 인자를 제공하여 8개의 엔트리를 가진 map을 생성해 보았더니 타입이 `PersistentArrayMap`이었다.

그리고 인자를 두 개 더 추가해 9개의 엔트리를 가진 map을 생성했더니 타입이 `PersistentHashMap`이었다.

### PersistentArrayMap

`IPersistentMap`의 구현체 중 하나인 `PersistentArrayMap`을 살펴보자.

위의 `map` 함수에서 보았듯이, 인자의 수가 16개 이하이면 `PersistentArrayMap`이 생성된다.

#### 생성과 구조

이 생성 과정을 더 자세히 살펴보자.

[clojure.lang.PersistentArrayMap::createWithCheck]( https://github.com/clojure/clojure/blob/clojure-1.11.0-alpha4/src/jvm/clojure/lang/PersistentArrayMap.java#L67-L77 )

```java
static public PersistentArrayMap createWithCheck(Object[] init){
    for(int i=0;i< init.length;i += 2)
        {
        for(int j=i+2;j<init.length;j += 2)
            {
            // 모든 짝수 인덱스 아이템(key)의 중복을 검사한다.
            if(equalKey(init[i],init[j]))
                throw new IllegalArgumentException("Duplicate key: " + init[i]);
            }
        }
    // key 중복이 없다면 PersistentArrayMap을 생성한다.
    return new PersistentArrayMap(init);
}
```

`createWithCheck`은 주어진 인자 배열의 짝수 인덱스 아이템(key)에 대하여 `equalKey` 검사를 하고 있다.
value는 중복이어도 상관없으니 따로 검사하지 않는다.

key 중복이 없다면 `PersistentArrayMap`의 생성자를 호출한다. 이 생성자는 매우 심플한 구조로 되어 있다.

[clojure.lang.PersistentArrayMap]( https://github.com/clojure/clojure/blob/clojure-1.11.0-alpha4/src/jvm/clojure/lang/PersistentArrayMap.java#L48-L51 )

```java
public PersistentArrayMap(Object[] init) {
    this.array = init;
    this._meta = null;
}
```

그리고 `this.array`는 다음과 같이 key와 value를 번갈아가며 보관하는 구조로 되어 있다.

```clojure
{:a 1 :b 2 :c 3 :d 4 :e 5 :f 6 :g 7 :h 8}
```

![array map의 구조]( ./array-map.svg )

#### 배열 기반의 연산

즉, `PersistentArrayMap`은 주어진 배열을 감싸고 있는 Map 인터페이스의 구현체이다.

따라서 몇몇 주요 연산은 배열을 순회하거나, 배열의 길이를 이용한다.

`PersistentArrayMap`은 키 값을 8개까지만 포함하며 키가 더 추가되면 `PersistentHashMap` 타입을 생성하게 되는데,
아마도 8개까지는 HashMap보다 ArrayMap의 퍼포먼스가 더 낫기 때문에 이렇게 결정한 것으로 예상한다.

##### count

다음은 `count`인데, 배열의 길이를 2로 나누는 것이 전부이다.

[clojure.lang.PersistentArrayMap::count]( https://github.com/clojure/clojure/blob/clojure-1.11.0-alpha4/src/jvm/clojure/lang/PersistentArrayMap.java#L210-L212 )

```java
public int count() {
    return this.array.length / 2;
}
```

##### containsKey

`containsKey`는 단순하게 `indexOf`를 사용한다.

[clojure.lang.PersistentArrayMap::containsKey]( https://github.com/clojure/clojure/blob/clojure-1.11.0-alpha4/src/jvm/clojure/lang/PersistentArrayMap.java#L214-L216 )

```java
public boolean containsKey(Object key) {
    return this.indexOf(key) >= 0;
}
```

`containsKey`가 사용하고 있는 `indexOf`는 배열의 짝수 인덱스를 순회하며 주어진 키와 같은 키를 찾는다.

```java
private int indexOf(Object key) {
    if (key instanceof Keyword) {
        // key의 타입이 keyword라면...
        for(int i = 0; i < this.array.length; i += 2) {
            // 짝수 인덱스(key)를 순회하며 비교한다
            if (key == this.array[i]) {
                return i;
            }
        }
        return -1;  // sentinel value로 -1 을 사용한다.
    } else {
        // key의 타입이 keyword가 아니라면...
        return this.indexOfObject(key);
    }
}
```

##### assoc, dissoc

assoc은 array copy를 한 다음 길이에 따라 `PersistentArrayMap` 또는 `PersistentHashMap`을 생성하는 방식으로 작동한다.

[clojure.lang.PersistentArrayMap::assoc]( https://github.com/clojure/clojure/blob/clojure-1.11.0-alpha4/src/jvm/clojure/lang/PersistentArrayMap.java#L245-L266 )

```java
public IPersistentMap assoc(Object key, Object val) {
    // 키의 인덱스를 찾는다.
    int i = this.indexOf(key);
    Object[] newArray;
    if (i >= 0) {
        // 해당 키가 배열에 존재한다면...
        if (this.array[i + 1] == val) {
            return this;
        }
        // 배열을 복사해서 새로운 배열을 만들고,
        // 복사한 배열에 assoc할 키/값을 해당 위치에 입력한다.
        newArray = (Object[])this.array.clone();
        newArray[i + 1] = val;
    } else {
        // 해당 키가 배열에 존재하지 않는다면...
        if (this.array.length >= 16) {
            // 배열의 길이가 16 이상이라면 8개 엔트리를 초과하므로
            // PersistentHashMap 을 생성한다.
            return this.createHT(this.array).assoc(key, val);
        }

        // 새로운 키와 값이 들어가야 하므로
        // +2 길이를 갖는 배열을 새로 만들고, array copy를 한다.
        newArray = new Object[this.array.length + 2];
        if (this.array.length > 0) {
            System.arraycopy(this.array, 0, newArray, 0, this.array.length);
        }
        // assoc할 키/값을 늘어난 위치에 입력한다.
        newArray[newArray.length - 2] = key;
        newArray[newArray.length - 1] = val;
    }
    // 새로 만든 배열을 사용해 새로운 PersistentArrayMap을 생성해 리턴한다.
    return this.create(newArray);
}
```

`PersistentArrayMap`은 `dissoc`을 갖고 있지 않은데, 실제 `dissoc` 함수를 사용할 때 호출되는 것이 `without`이기 때문이다.

`RT`의 `dissoc` 코드를 읽어보면 이를 확인할 수 있다.

[clojure.lang.RT::dissoc]( https://github.com/clojure/clojure/blob/clojure-1.11.0-alpha4/src/jvm/clojure/lang/RT.java#L888-L892 )

```java
static public Object dissoc(Object coll, Object key) {
    if(coll == null)
        return null;
    return ((IPersistentMap) coll).without(key); // coll의 without을 부른다
}
```

이제 `without`의 코드를 읽어보자.

[clojure.lang.PersistentArrayMap::without]( https://github.com/clojure/clojure/blob/clojure-1.11.0-alpha4/src/jvm/clojure/lang/PersistentArrayMap.java#L268-L282 )

```java
public IPersistentMap without(Object key){
    // dissoc 하려는 키의 인덱스를 찾는다
    int i = indexOf(key);
    if(i >= 0) //have key, will remove
        {
        int newlen = array.length - 2;
        if(newlen == 0)
            return empty();
        // 새로운 배열을 만들고
        Object[] newArray = new Object[newlen];
        // dissoc 하려는 키 인덱스의 왼쪽 배열 array copy
        System.arraycopy(array, 0, newArray, 0, i);
        // dissoc 하려는 키 인덱스의 오른쪽 배열 array copy
        System.arraycopy(array, i+2, newArray, i, newlen - i);

        // 새로운 PersistentArrayMap 생성해 리턴
        return create(newArray);
        }
    // 키를 못 찾았으면 아무것도 하지 않고 그대로 this 리턴
    return this;
}
```

### PersistentHashMap

엔트리의 수가 8개를 초과한다면 `PersistentHashMap`을 생성하게 된다.

[clojure.lang.PersistentHashMap::create]( https://github.com/clojure/clojure/blob/clojure-1.11.0-alpha4/src/jvm/clojure/lang/PersistentHashMap.java#L52-L59 )

```java
public static PersistentHashMap create(Object... init){
    ITransientMap ret = EMPTY.asTransient();
    for(int i = 0; i < init.length; i += 2)
        {
        ret = ret.assoc(init[i], init[i + 1]);
        }
    return (PersistentHashMap) ret.persistent();
}
```

코드를 읽어보면 `PersistentHashMap`은 `ITransientMap`을 임시로 생성해 배열의 각 아이템을 map에 등록하고 나서, 등록이 완료되면 `persistent()`를 호출해 불변 객체로 만든다는 것을 알 수 있다.

`TransientHashMap`은 `PersistentHashMap`의 내부 클래스이며, `PersistentHashMap`의 생성에 사용되는 특수한 구현이다.

(Clojure의 transient 개념에 대해서는 [[/clojure/reference/transient]] 문서 참고.)

시험삼아 엔트리 9개를 갖는 `PersistentHashMap`을 생성해 보았더니 다음과 같은 구조를 갖고 있었다.

![9개의 아이템이 있는 PersistentHashMap]( ./item-9.jpg ){:style="max-width:350px"}

엔트리 기준으로 요약하자면 다음과 같은 것이다.

- **array**
    - entry 0
    - **array**
        - entry 3
        - entry 2
    - entry 4
    - entry 1
    - entry 8
    - entry 5
    - entry 7
    - entry 6

## 활용

### submap?

map과 map의 포함관계를 확인해야 할 때가 있다.

나는 처음에 이런 형태를 생각했다.

```clojure
(defn submap?
  "m1이 m2의 subset이면 true를 리턴합니다."
  [m1 m2]
  (= m1 (select-keys m2 (keys m1))))
```

다음은 [namenu]( https://github.com/namenu ) 님이 알려주신 코드로, 재귀하는 구조를 갖고 있다.

[clojure.tools.deps.alpha.script.test-make-classpath2 submap?]( https://github.com/clojure/tools.deps.alpha/blob/635a95db0b0a350ff00a2bbca46383f4089b6a23/src/test/clojure/clojure/tools/deps/alpha/script/test_make_classpath2.clj#L14-L21 )

```clojure
(defn submap?
  "Is m1 a subset of m2?"
  [m1 m2]
  (if (and (map? m1) (map? m2))
    (every? (fn [[k v]] (and (contains? m2 k)
                          (submap? v (get m2 k)))) ; 재귀
      m1)
    (= m1 m2)))
```

stackoverflow.com의 질문 [How to check if a map is a subset of another in clojure?]( https://stackoverflow.com/questions/20421405/how-to-check-if-a-map-is-a-subset-of-another-in-clojure )이 읽어볼 만하다.

위 글에 나오는 `clojure.set/subset?`을 사용하는 방법이 무척 흥미롭고 재미있다. 나는 이 방법이 마음에 든다.

```clojure
(defn submap?
  "m1이 m2의 submap이면 true를 리턴합니다."
  [m1 m2]
  (clojure.set/subset? (set m1) (set m2)))
```


## 함께 읽기

- [[/clojure/study/vector]]

## 참고문헌

- [How to check if a map is a subset of another in clojure? (stackoverflow.com)]( https://stackoverflow.com/questions/20421405/how-to-check-if-a-map-is-a-subset-of-another-in-clojure )
- [clojure 1.11.0-alpha4 소스코드 (github.com)]( https://github.com/clojure/clojure/tree/clojure-1.11.0-alpha4 )
- [clojure.tools.deps.alpha.script.test-make-classpath2 submap? (github.com)]( https://github.com/clojure/tools.deps.alpha/blob/635a95db0b0a350ff00a2bbca46383f4089b6a23/src/test/clojure/clojure/tools/deps/alpha/script/test_make_classpath2.clj#L14-L21 )

