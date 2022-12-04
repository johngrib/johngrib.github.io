---
layout  : wiki
title   : clojure.lang. PersistentList.java
summary : 
date    : 2021-12-26 16:34:40 +0900
updated : 2021-12-26 17:38:46 +0900
tag     : clojure
resource: 46/ADC675-EE36-48F2-B526-FA2EFCEA8DD6
toc     : true
public  : true
parent  : [[/clojure/study]]
latex   : false
---
* TOC
{:toc}

이 문서에서 다루는 Clojure는 clojure-1.11.0-alpha3 입니다.

## List

Clojure의 리스트는 `'()`와 같이 생성하며, 타입은 [clojure.lang.PersistentList.java]( https://github.com/clojure/clojure/blob/clojure-1.11.0-alpha3/src/jvm/clojure/lang/PersistentList.java )이다.

```clojure
(type '(1 2 3)) ; clojure.lang.PersistentList
(type '())      ; clojure.lang.PersistentList$EmptyList
```

## 클래스 시그니처

```java
public class PersistentList extends ASeq implements IPersistentList, IReduce, List, Counted {

private final Object _first;
private final IPersistentList _rest;
private final int _count;
```

## 생성자

두 개의 생성자가 있다.

```java
public PersistentList(Object first){
  this._first = first;
  this._rest = null;

  this._count = 1;
}
```

첫 번째 생성자는 하나의 원소를 갖는 리스트를 생성한다. `_rest`에 `null`이 할당된다는 것에 주목.

```java
PersistentList(IPersistentMap meta, Object _first, IPersistentList _rest, int _count){
  super(meta);
  this._first = _first;
  this._rest = _rest;
  this._count = _count;
}
```

두 번째 생성자는 하나를 초과한 원소를 갖는 리스트를 생성한다. 그러나 디폴트 접근 제한을 갖고 있기 때문에 제한적으로 사용되고 있을 것이다.

```java
public static IPersistentList create(List init){
  IPersistentList ret = EMPTY;
  for(ListIterator i = init.listIterator(init.size()); i.hasPrevious();)
    {
    ret = (IPersistentList) ret.cons(i.previous());
    }
  return ret;
}
```

리스트를 통해 생성한다면 `create` 메소드를 사용하는 것으로 보인다.
단순한 `for` 루프를 돌면서 `EMPTY` 리스트에 `cons` 연산을 반복하는 방식이다.

## first, next, peek, pop, count

```java
public Object first(){
  return _first;
}

public ISeq next(){
  if(_count == 1)
    return null;
  return (ISeq) _rest;
}

public Object peek(){
  return first();
}

public IPersistentList pop(){
  if(_rest == null)
    return EMPTY.withMeta(_meta);
  return _rest;
}

public int count(){
  return _count;
}
```

코드를 읽어보면 이 연산들은 리스트에서는 대단히 빠를 것이라고 예측할 수 있다.

눈에 띄는 것은 `next`와 `pop`. `_rest`를 리턴한다는 점에서 거의 같지만 미세하게 다르다.


## cons

```java
public PersistentList cons(Object o){
  return new PersistentList(meta(), o, this, _count + 1);
}
```

`cons`는 새로 집어넣는 아이템 `o`를 `_first`로 지정하고, `this` 리스트를 `_rest`로 지정한다.

즉, `cons`는 새 아이템을 리스트의 맨 앞에 집어넣는다. 한편 `PersistentList`가 연결 리스트의 구조를 갖고 있다는 것도 알 수 있다.

## reduce

```java
public Object reduce(IFn f) {
  Object ret = first();
  for(ISeq s = next(); s != null; s = s.next()) {
    ret = f.invoke(ret, s.first());
    if (RT.isReduced(ret)) return ((IDeref)ret).deref();;
  }
  return ret;
}

public Object reduce(IFn f, Object start) {
  Object ret = f.invoke(start, first());
  for(ISeq s = next(); s != null; s = s.next()) {
    if (RT.isReduced(ret)) return ((IDeref)ret).deref();
    ret = f.invoke(ret, s.first());
  }
  if (RT.isReduced(ret)) return ((IDeref)ret).deref();
  return ret;
}
```

`reduce`는 두 가지 오버로딩된 함수가 있다.

두 함수는 거의 똑같은데, 첫 번째 아이템이 주어진 경우에는 `f.invoke(start, first())`를 통해 첫 번째 아이템에 대해 작업을 마친 다음 루프로 들어간다는 점이 다르다.



## EmptyList

`EmptyList`는 [PersistentList의 내부 클래스]( https://github.com/clojure/clojure/blob/clojure-1.11.0-alpha3/src/jvm/clojure/lang/PersistentList.java#L151 )이며, 비어 있는 리스트를 표현한다. 코드는 다음과 같이 시작한다.

```java
static class EmptyList extends Obj implements IPersistentList, List, ISeq, Counted, IHashEq {
  static final int hasheq = Murmur3.hashOrdered(Collections.EMPTY_LIST);

  public int hashCode(){
    return 1;
  }

  public int hasheq(){
    return hasheq;
  }
```

`hashCode`는 그냥 `1`을 리턴하지만, `hasheq`는 `Murmur3.hashOrdered`를 사용하여 `Collections.EMPTY_LIST`의 해시값을 리턴한다.

```java
public String toString() {
  return "()";
}

public boolean equals(Object o) {
  return (o instanceof Sequential || o instanceof List) && RT.seq(o) == null;
}

public boolean equiv(Object o){
  return equals(o);
}
```

- `toString`은 `()`를 리턴한다.
- `equals`는 Java 관례와는 달리 타입보다 `Sequential` 인터페이스나 `List` 인터페이스의 구현체인지를 더 중요하게 본다.

```java
public Object first() {
  return null;
}

public ISeq next() {
  return null;
}
```

`first`, `next` 등은 비어 있는 리스트답게 행동한다. 이는 Clojure REPL에서도 확인할 수 있다.

```clojure
(first '()) ; nil
(next '())  ; nil
```

```java
public Object peek(){
  return null;
}

public IPersistentList pop(){
  throw new IllegalStateException("Can't pop empty list");
}

public int count(){
  return 0;
}
```

`peek`, `pop`, `count` 등도 마찬가지.

```clojure
(peek '()) ; nil
(pop '())  ; Execution error (IllegalStateException) Can't pop empty list
(count '()) ; 0
```

나머지 메소드들도 비어 있는 리스트 조건에 맞게 행동한다.

```java
public ISeq seq(){
  return null;
}

public int size(){
  return 0;
}

public boolean isEmpty(){
  return true;
}

public boolean contains(Object o){
  return false;
}
```


