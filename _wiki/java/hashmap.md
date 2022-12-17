---
layout  : wiki
title   : java.util. HashMap
summary : 
date    : 2019-10-27 11:54:24 +0900
updated : 2022-12-17 19:58:55 +0900
tag     : java
resource: AD/0DA9BB-65E8-490B-BFF7-77004E50553D
toc     : true
public  : true
parent  : [[/java]]
latex   : true
---
* TOC
{:toc}

## Java 8 HashMap 퍼포먼스 향상에 대하여

요약하자면 균형 트리를 도입해 $$O(n)$$ 에서 $$O(log n)$$으로 향상됐다.

* Java 8 부터 `HashMap`, `LinkedHashMap`, `ConcurrentHashMap`의 퍼포먼스가 향상된다.
* 기존에는 키 충돌이 많은 아이템들을 linked list로 관리했는데, 이후로는 balanced tree로 관리하게 된다.
    * 최악의 경우 시간 복잡도가 $$O(n)$$에서 $$O(\log n)$$으로 향상됐다.

### 문서를 찾아보자

#### What's New in JDK 8

다음은 [What's New in JDK 8][new-jdk8] 문서의 "Collections" 항목을 인용한 것이다.

>
* Classes in the new java.util.stream package provide a Stream API to support functional-style operations on streams of elements. The Stream API is integrated into the Collections API, which enables bulk operations on collections, such as sequential or parallel map-reduce transformations.
* Performance Improvement for HashMaps with Key Collisions

두 가지를 이야기하고 있다.

* Stream API 제공
* 해시맵의 키 충돌 관련 퍼포먼스 향상

이 문서에서는 두 번째 항목인 "Performance Improvement for HashMaps with Key Collisions"에 대해 조사하는 것이 목표이므로, [Collections Framework Enhancements in Java SE 8][new-jdk8-collections] 문서로 따라 들어가 읽어보도록 하자.

#### Collections Framework Enhancements in Java SE 8

다음은 [Collections Framework Enhancements in Java SE 8][new-jdk8-collections] 문서의 일부를 인용한 것이다.

>
**Performance Improvement for HashMaps with Key Collisions**  
As part of the work for [JEP 180][jep-180], there is a performance improvement for HashMap objects where there are lots of collisions in the keys.  
The alternative String hash function added in 7u6 has been removed from JDK 8, along with the jdk.map.althashing.threshold system property. Instead, hash bins containing a large number of colliding keys improve performance by storing their entries in a balanced tree instead of a linked list. This JDK 8 change applies only to HashMap, LinkedHashMap, and ConcurrentHashMap.  
In rare situations, this change could introduce a change to the iteration order of HashMap and HashSet. A particular iteration order is not specified for HashMap objects - any code that depends on iteration order should be fixed.  
Note that, other than removing the feature introduced in 7u6, the java.util.Hashtable class is not affected. The features added in 7u6 applied to WeakHashMap and Hashtable (and by extension Properties and Provider) but in JDK 8 these have been removed.

핵심을 요약하자면 다음과 같다.

* 7u6에 추가됐었던 `String` 해시 함수와 `jdk.map.althashing.threshold` 시스템 속성은 JDK 8 에서 제외됐다.
* 이제 충돌되는 키가 많은 해시 저장소는 **linked list에 저장하지 않고 balanced tree에 저장**하게 된다.
* 이 변경 사항은 `HashMap`, `LinkedHashMap`, `ConcurrentHashMap`에만 적용된다.
* 드물게 `HashMap`, `HashSet`에서 이터레이팅 순서가 바뀔 수 있는데, `HashMap` 이터레이팅 순서에 의존하는 코드는 좋지 않으므로 고치는 것이 좋다.


#### JEP 180

읽는 김에 [JEP 180][jep-180]도 읽어보았다. 다음은 기억해 두고 싶은 부분을 몇 군데 인용한 것이다.

> JEP 180: Handle Frequent HashMap Collisions with Balanced Trees

* JEP 180의 제목. Balanced Tree를 사용해 HashMap에서 빈번하게 발생하는 충돌을 관리하라는 내용이다.

>
**Summary**  
Improve the performance of java.util.HashMap under high hash-collision conditions by using balanced trees rather than linked lists to store map entries. Implement the same improvement in the LinkedHashMap class.

* linked list가 아니라 balanced tree를 사용해 높은 해시 충돌 빈도를 가진 경우의 HashMap과 LinkedHashMap 클래스 성능을 향상시키라는 내용이다.

>
**Motivation**  
Earlier work in this area in JDK 8, namely the alternative string-hashing implementation, improved collision performance for string-valued keys only, and it did so at the cost of adding a new (private) field to every String instance.  
The changes proposed here will improve collision performance for any key type that implements Comparable. The alternative string-hashing mechanism, including the private hash32 field added to the String class, can then be removed.

* 이 작업을 통해 모든 `Comparable` 구현체의 키 충돌 퍼포먼스를 향상시킬 수 있다.
* alternative string-hashing을 위해 String 클래스에 추가됐던 `private hash32` 필드를 삭제할 수 있게 된다.

이 부분을 읽고 궁금해져서 Java 7 버전의 String 클래스를 확인해보니 hash32 변수가 있다.

```java
/**
 * Cached value of the alternative hashing algorithm result
 */
private transient int hash32 = 0;

/**
 * Calculates a 32-bit hash value for this string.
 *
 * @return a 32-bit hash value for this string.
 */
int hash32() {
  int h = hash32;
  if (0 == h) {
     // harmless data race on hash32 here.
     h = sun.misc.Hashing.murmur3_32(HASHING_SEED, value, 0, value.length);

     // ensure result is not zero to avoid recalcing
     h = (0 != h) ? h : 1;

     hash32 = h;
  }
  return h;
}
```

그러나 Java 8 버전의 String 클래스에는 `hash32`가 존재하지 않았다.

>
**Description**  
The principal idea is that once the number of items in a hash bucket grows beyond a certain threshold, that bucket will switch from using a linked list of entries to a balanced tree. In the case of high hash collisions, this will improve worst-case performance from O(n) to O(log n).  
This technique has already been implemented in the latest version of the java.util.concurrent.ConcurrentHashMap class, which is also slated for inclusion in JDK 8 as part of JEP 155. Portions of that code will be re-used to implement the same idea in the HashMap and LinkedHashMap classes. Only the implementations will be changed; no interfaces or specifications will be modified. Some user-visible behaviors, such as iteration order, will change within the bounds of their current specifications.  
We will not implement this technique in the legacy Hashtable class. That class has been part of the platform since Java 1.0, and some legacy code that uses it is known to depend upon iteration order. Hashtable will be reverted to its state prior to the introduction of the alternative string-hashing implementation, and will maintain its historical iteration order.  
We also will not implement this technique in WeakHashMap. An attempt was made, but the complexity of having to account for weak keys resulted in an unacceptable drop in microbenchmark performance. WeakHashMap will also be reverted to its prior state.  
There is no need to implement this technique in the IdentityHashMap class. It uses System.identityHashCode() to generate hash codes, so collisions are generally rare.

* 기본적인 아이디어: 해시 버킷의 아이템 수가 특정 임계 값을 초과하면, linked list를 balanced tree로 바꾼다.
* 이렇게 하면 최악의 경우의 성능을 $$O(n)$$에서 $$O(\log n)$$으로 향상시킬 수 있다.
* 이 기법은 이미 `ConcurrentHashMap`에서는 구현되어 있다.
* 인터페이스나 스펙은 바뀌지 않는다.
* `WeakHashMap`에는 이 기법이 적용되지 않았다. 시도는 해보았는데 복잡도와 성능 문제가 있어 되돌렸다.
* `IdentityHashMap` 클래스는 `System.identityHashCode()`를 사용해 해시 코드를 생성하므로 충돌이 거의 없어 이 기법이 필요가 없다.

>
**Risks and Assumptions**  
This change will introduce some overhead for the addition and management of the balanced trees; we expect that overhead to be negligible.  
This change will likely result in a change to the iteration order of the HashMap class. The HashMap specification explicitly makes no guarantee about iteration order. The iteration order of the LinkedHashMap class will be maintained.

* 이 변경으로 인해 약간의 오버 헤드가 발생하지만, 그 정도의 오버헤드는 무시해도 된다고 생각한다.
* 이 변경으로 인해 `HashMap` 클래스의 이터레이션 순서가 바뀔 수 있지만, `HashMap` 스펙은 이터레이션 순서를 보장하지 않는다. `LinkedHashMap` 클래스의 이터레이션 순서는 유지된다.

### 코드를 읽어보자

이제 문서는 그만 읽고 코드를 읽어보자.

#### Java 7의 HashMap

다음은 Java 7의 java.util.HashMap의 put 메소드 코드이다. 한국어 주석은 내가 작성한 것이다.

```java
/**
 * Associates the specified value with the specified key in this map.
 * If the map previously contained a mapping for the key, the old
 * value is replaced.
 *
 * @param key key with which the specified value is to be associated
 * @param value value to be associated with the specified key
 * @return the previous value associated with <tt>key</tt>, or
 *     <tt>null</tt> if there was no mapping for <tt>key</tt>.
 *     (A <tt>null</tt> return can also indicate that the map
 *     previously associated <tt>null</tt> with <tt>key</tt>.)
 */
public V put(K key, V value) {
  if (table == EMPTY_TABLE) {
    inflateTable(threshold);
  }
  if (key == null)
    return putForNullKey(value);

  int hash = hash(key);
  int i = indexFor(hash, table.length);

  // table의 각 인덱스에는 Entry가 들어 있고, Entry는 LinkedList 이다.
  for (Entry<K,V> e = table[i]; e != null; e = e.next) {
    Object k;
    if (e.hash == hash && ((k = e.key) == key || key.equals(k))) {
      V oldValue = e.value;
      e.value = value;
      e.recordAccess(this);
      return oldValue;
    }
  }

  modCount++;
  addEntry(hash, key, value, i);
  return null;
}
```

코드를 읽어보면 같은 해시값을 가진 아이템을 LinkedList로 관리하는 방식을 사용하고 있음을 확인할 수 있다.

#### Java 8 ~ 12의 HashMap

다음은 Java 8 의 put 메소드 코드이다. 역시 한국어 주석은 내가 작성한 것이다.

참고로 이 메소드는 Java 8과 Java 12를 비교해 본 결과 변화가 없었다.

```java
/**
 * Associates the specified value with the specified key in this map.
 * If the map previously contained a mapping for the key, the old
 * value is replaced.
 *
 * @param key key with which the specified value is to be associated
 * @param value value to be associated with the specified key
 * @return the previous value associated with <tt>key</tt>, or
 *     <tt>null</tt> if there was no mapping for <tt>key</tt>.
 *     (A <tt>null</tt> return can also indicate that the map
 *     previously associated <tt>null</tt> with <tt>key</tt>.)
 */
public V put(K key, V value) {
  return putVal(hash(key), key, value, false, true);
}

/**
 * Implements Map.put and related methods
 *
 * @param hash hash for key
 * @param key the key
 * @param value the value to put
 * @param onlyIfAbsent if true, don't change existing value
 * @param evict if false, the table is in creation mode.
 * @return previous value, or null if none
 */
final V putVal(int hash, K key, V value, boolean onlyIfAbsent,
         boolean evict) {
  Node<K,V>[] tab; Node<K,V> p; int n, i;

  // 만약 테이블이 없다면, 비어 있는 테이블을 만든다
  if ((tab = table) == null || (n = tab.length) == 0)
    n = (tab = resize()).length;

  // 테이블 인덱스는 (n-1) & hash 로 계산한다
  // p가 인덱스에 있는 노드를 참조하게 한다
  // p가 null이면 새로운 노드를 만들어 테이블 인덱스에 넣는다
  if ((p = tab[i = (n - 1) & hash]) == null)
    tab[i] = newNode(hash, key, value, null);
  else {
    Node<K,V> e; K k;
    if (p.hash == hash &&
      ((k = p.key) == key || (key != null && key.equals(k))))
      // 해시값이 같고 키도 같은 경우
      e = p;
    else if (p instanceof TreeNode)
      // 테이블에서 가져온 노드가 TreeNode라면 아이템을 트리에 입력한다
      e = ((TreeNode<K,V>)p).putTreeVal(this, tab, hash, key, value);
    else {
      // 그 외의 경우 LinkedList로 관리한다
      for (int binCount = 0; ; ++binCount) {
        if ((e = p.next) == null) {
          // 새로운 노드를 만들어 LinkedList에 추가한다
          p.next = newNode(hash, key, value, null);

          // 만약 LinkedList 아이템 수가 threshold 이상이면 트리로 만든다
          if (binCount >= TREEIFY_THRESHOLD - 1) // -1 for 1st
            treeifyBin(tab, hash);
          break;
        }
        if (e.hash == hash &&
          ((k = e.key) == key || (key != null && key.equals(k))))
          break;
        p = e;
      }
    }
    if (e != null) { // existing mapping for key
      V oldValue = e.value;
      if (!onlyIfAbsent || oldValue == null)
        e.value = value;
      afterNodeAccess(e);
      return oldValue;
    }
  }
  ++modCount;
  if (++size > threshold)
    resize();
  afterNodeInsertion(evict);
  return null;
}
```

코드를 읽어보면 아이템을 LinkedList로 관리하다가, LinkedList가 일정 이상 길어지면 해당 인덱스를 Tree로 변경해 관리한다는 것을 알 수 있다.

이렇게 되면 최선의 경우 $$O(1)$$, 최악의 경우 $$O(\log n)$$ 시간 복잡도가 나올 것이다.

## HashMap의 TreeNode를 확인하는 실험

실제로 사용해보며 작동하는 모습을 관찰해 보자.

- Java 11을 사용하는 프로젝트 하나를 만든다.
- `java.util.HashMap`을 복사해 몇 가지 내부 값들을 확인할 수 있는 클래스 `_HashMap`을 만든다.
    - `_HashMap`은 공개되어 있지 않은 `table`과 `Node` 등을 `public`으로 변경해 접근할 수 있도록 한다.
- 좁은 해시값 범위를 갖는 `Key` 클래스를 만들어 고의로 해시 충돌을 일으키도록 한다.


이 실험에 사용한 소스코드는 [study-java-hashmap]( https://github.com/johngrib/study-java-hashmap/tree/print-hashmap-tree ) 리포지토리에 올려두었다.

### 고의로 해시 충돌을 일으키기 위한 Key 클래스

```java
public class Key {
  private final int i;

  public Key(int i) {
    this.i = i;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    Key key = (Key) o;
    return i == key.i;
  }

  @Override
  public String toString() {
    return "Key:" + i;
  }

  // 여기가 핵심
  @Override
  public int hashCode() {
    return i % 3;   // 0, 1, 2
  }
}
```

이 클래스의 핵심은 `hashCode`로, `i % 3`을 사용하고 있다.
이렇게 하면 이 클래스 인스턴스의 가능한 해시값은 모두 `0`, `1`, `2`가 된다.

### 고의로 특정 필드를 공개한 _HashMap 클래스

[Node table getter 추가]( https://github.com/johngrib/study-java-hashmap/blob/1ab6030003dd9bcd26fb5fe51fd6886cd1342805/src/main/java/_java/_HashMap.java#L393-L395 )

```java
public Node<K, V>[] getTable() {
  return table;
}
```

[TreeNode를 공개하고, left / right 자식 노드도 공개]( https://github.com/johngrib/study-java-hashmap/blob/1ab6030003dd9bcd26fb5fe51fd6886cd1342805/src/main/java/_java/_HashMap.java#L1664 )

```java
public static final class TreeNode<K, V> extends _LinkedHashMap.Entry<K, V> {
  TreeNode<K, V> parent;  // red-black tree links
  public TreeNode<K, V> left;
  public TreeNode<K, V> right;
  TreeNode<K, V> prev;    // needed to unlink next upon deletion

  // ...
}
```

### 출력 코드

간단한 테스트 코드를 만든다. 대신, assertion은 하지 않고 출력만 해보자.

먼저 트리를 walk를 하며 출력하는 메소드를 작성한다.

```java
static void printRecur(Node<Key, Integer> node, int level) {
  if (node instanceof _HashMap.TreeNode) {
    // 트리인 경우
    _HashMap.TreeNode<Key, Integer> tree = (_HashMap.TreeNode<Key, Integer>) node;
    tree.level = level;
    System.out.println(Strings.repeat("  ", level) + "Tree " + ((Node) tree));

    if (tree.left != null) {
      printRecur(tree.left, level + 1);
    }
    if (tree.right != null) {
      printRecur(tree.right, level + 1);
    }
    return;
  } else {
    // 연결 리스트인 경우
    node.level = level;
    System.out.println(Strings.repeat("  ", level) + "Link " + node);
    if (node.getNext() != null) {
      printRecur(node.getNext(), level + 1);
    }
  }
}
```

그리고 다음과 같은 테스트를 작성했다.

```java
@Nested
static class IncrementalInput {
  private _HashMap<Key, Integer> map = new _HashMap<>();

  @BeforeEach
  void prepareTest() {
    map.clear();
    List<Integer> givenList = List.of(
        // 해시값 0 후보
        0, 3, 6, 9, 12, 15, 18, 21, 24,
        // 해시값 1 후보
        1, 4, 7, 10, 13, 16, 19, 22, 25, 28,
        // 해시값 2 후보
        2, 5, 8, 11, 14, 17, 20, 23, 26, 29, 32, 35, 38
    );
    for (var i :  givenList) {
      map.put(new Key(i), i);
    }
  }

  @Test
  void it() {
    final Node<Key, Integer>[] nodes = map.getTable();

    for (var node : nodes) {
      if (node == null) {
        continue;
      }
      System.out.println();
      printRecur(node, 0);
    }
  }
}
```

### 출력 결과

이 테스트를 가동해 보면 다음과 같이 출력된다.

```
Link {level=0, Key:0}
  Link {level=1, Key:3}
    Link {level=2, Key:6}
      Link {level=3, Key:9}
        Link {level=4, Key:12}
          Link {level=5, Key:15}
            Link {level=6, Key:18}
              Link {level=7, Key:21}
                Link {level=8, Key:24}

Tree {level=0, Key:4}
  Tree {level=1, Key:19}
    Tree {level=2, Key:10}
      Tree {level=3, Key:22}
    Tree {level=2, Key:16}
      Tree {level=3, Key:28}
  Tree {level=1, Key:1}
    Tree {level=2, Key:13}
    Tree {level=2, Key:7}
      Tree {level=3, Key:25}

Tree {level=0, Key:11}
  Tree {level=1, Key:5}
    Tree {level=2, Key:2}
    Tree {level=2, Key:20}
  Tree {level=1, Key:8}
    Tree {level=2, Key:29}
      Tree {level=3, Key:23}
        Tree {level=4, Key:38}
      Tree {level=3, Key:32}
        Tree {level=4, Key:35}
    Tree {level=2, Key:17}
      Tree {level=3, Key:14}
      Tree {level=3, Key:26}
```

#### 첫 번째 해시 버킷

하나하나 살펴보자.

첫 번째 해시 버킷은 `0`, `3`, `6`, `9`, `12`, `15`, `18`, `21`, `24`로 만든 9개의 Key가 들어가 있다.

```
Link {level=0, Key:0}
  Link {level=1, Key:3}
    Link {level=2, Key:6}
      Link {level=3, Key:9}
        Link {level=4, Key:12}
          Link {level=5, Key:15}
            Link {level=6, Key:18}
              Link {level=7, Key:21}
                Link {level=8, Key:24}
```

그림으로 그려본다면 다음과 같을 것이다.

![]( /resource/AD/0DA9BB-65E8-490B-BFF7-77004E50553D/linked-list.svg )

연결 리스트라는 것을 눈으로 쉽게 확인할 수 있다.

`TREEIFY_THRESHOLD` 값인 `8`을 기준으로 삼는데, `binCount`가 `0`부터 시작하므로, 아이템 9개까지는 연결 리스트로 유지한다.

#### 두 번째 해시 버킷

두 번째 해시 버킷은 `1`, `4`, `7`, `10`, `13`, `16`, `19`, `22`, `25`, `28`로 만든 10개의 Key가 들어가 있다.

아이템의 수가 연결 리스트 기준을 넘어섰으므로 연결 리스트가 아니라 이진 트리로 관리된다.

```
Tree {level=0, Key:4}
  Tree {level=1, Key:19}
    Tree {level=2, Key:10}
      Tree {level=3, Key:22}
    Tree {level=2, Key:16}
      Tree {level=3, Key:28}
  Tree {level=1, Key:1}
    Tree {level=2, Key:13}
    Tree {level=2, Key:7}
      Tree {level=3, Key:25}
```

그림으로 그려보면 이진 트리라는 것을 쉽게 확인할 수 있다.

![]( /resource/AD/0DA9BB-65E8-490B-BFF7-77004E50553D/tree-node.svg )

첫 번째 해시 버킷과 아이템 수 1개 차이가 난다는 점에 주목.

#### 세 번째 해시 버킷

세 번째 해시 버킷은 `2`, `5`, `8`, `11`, `14`, `17`, `20`, `23`, `26`, `29`, `32`, `35`, `38`로 만든 13개의 Key가 들어가 있다.

```
Tree {level=0, Key:11}
  Tree {level=1, Key:5}
    Tree {level=2, Key:2}
    Tree {level=2, Key:20}
  Tree {level=1, Key:8}
    Tree {level=2, Key:29}
      Tree {level=3, Key:23}
        Tree {level=4, Key:38}
      Tree {level=3, Key:32}
        Tree {level=4, Key:35}
    Tree {level=2, Key:17}
      Tree {level=3, Key:14}
      Tree {level=3, Key:26}
```

이것도 그림으로 그려보자.

![]( /resource/AD/0DA9BB-65E8-490B-BFF7-77004E50553D/third-bucket.svg )

#### 종합

다음은 위의 세 그림을 종합한 것이다.

![]( /resource/AD/0DA9BB-65E8-490B-BFF7-77004E50553D/all-buckets.svg )

## HashMap이 같은 해시값을 갖는 두 Key를 비교하는 방법

같은 해시값을 갖고 있는 여러 Key를 집어넣을 때, 어떤 Key는 노드의 왼쪽 붙고 어떤 Key는 오른쪽에 붙는 것을 보면,
Key를 `put` 하거나 `get` 할 때 Key 사이의 비교가 일어난다는 것을 알 수 있다.

이 비교는 다음과 같이 작동한다.

1. `a.equals(b)`로 비교했을 때 `true`이면 같은 Key로 간주한다.
2. Key가 `Comparable`을 구현하는 클래스라면, `a.compareTo(b)`로 우선순위를 매긴다.
3. `a`, `b` 둘 중 하나가 `null` 이라면 `System.identityHashCode` 메소드를 사용해 결과값을 비교한다.
4. `a`와 `b`가 `equals`로 같지 않고, `Comparable` 구현체도 아니고 `null`도 아니라면 `.getClass().getName()`을 사용해 두 `String`을 얻은 다음 `compareTo`로 비교한다.
5. 위의 모든 경우가 다 아니라면 `System.identityHashCode` 메소드를 사용해 결과값을 비교한다.

자세한 내용은 `putTreeVal`과 `tieBreakOrder` 메소드를 보면 알 수 있다.

### putTreeVal 메소드

[jdk-11+28 java.util.HashMap.putTreeVal]( https://github.com/openjdk/jdk/blob/jdk-11%2B28/src/java.base/share/classes/java/util/HashMap.java#L2021-L2065 )

`putTreeVal`은 한 글자짜리 변수 이름을 많이 사용해서 알아보기 어렵다.

다음은 내가 주석을 추가하고 변수 이름을 바꾼(알아보기 쉽게 snake_case로 바꾸었다) `putTreeVal` 메소드이다.

```java
final TreeNode<K, V> putTreeVal(_HashMap<K, V> map, Node<K, V>[] tab,
                                int key_hash, K given_key, V given_value) {
  Class<?> key_class = null;
  boolean searched = false;
  TreeNode<K, V> root = (parent != null) ? root() : this;

  // 무한 루프를 돌며 given_key / given_value를 집어넣을 곳을 찾는다.
  for (TreeNode<K, V> pointer_node = root; ; ) {
    int direction, pointer_hash;
    K pointer_key;
    if ((pointer_hash = pointer_node.hash) > key_hash)
      // 만약 포인터 노드의 해시값이, 주어진 key의 해시값보다 크다면 방향은 왼쪽
      direction = -1;
    else if (pointer_hash < key_hash)
      // 만약 포인터 노드의 해시값이, 주어진 key의 해시값보다 작다면 방향은 오른쪽
      direction = 1;
    else if ((pointer_key = pointer_node.key) == given_key || (given_key != null && given_key.equals(pointer_key)))
      // 만약 포인터 노드와 주어진 key 가 같다면 중복이다. 삽입하지 않고 그냥 포인터 노드를 리턴한다.
      return pointer_node;
    else if ((key_class == null && (key_class = comparableClassFor(given_key)) == null)
            ||
            (direction = compareComparables(key_class, given_key, pointer_key)) == 0) {
      // 만약 주어진 key 클래스가 Comparable 인터페이스를 구현한다면 key_class를 할당한다.
      // 만약 주어진 key 클래스가 Comparable 구현체가 맞다면 compare 해보고, 결과가 0인지(같은지) 판별한다.
      if (!searched) {
        // 이번 루프에서 삽입할 지점을 찾지 못했다면 이번에 찾는다
        TreeNode<K, V> found_node, child_node;
        searched = true;
        if (
            ((child_node = pointer_node.left) != null && (found_node = child_node.find(key_hash, given_key, key_class)) != null)
            ||
            ((child_node = pointer_node.right) != null && (found_node = child_node.find(key_hash, given_key, key_class)) != null)
        )
          // 왼쪽 또는 오른쪽 중 중복된 key 를 갖는 노드를 찾았다면 삽입하지 않고 리턴한다.
          return found_node;
      }
      // direction이 0,-1 인지 1 인지에 따라 새로운 노드를 왼쪽에 붙일지 오른쪽에 붙일지가 달라진다.
      direction = tieBreakOrder(given_key, pointer_key);
      // ↑ 주목: 같은 해시값을 갖는 노드를 어느 방향에 붙일지 결정한다
    }

    TreeNode<K, V> xp = pointer_node;
    // direction이 0 이하이면 왼쪽에 붙이고, 1 이면 오른쪽에 붙인다.
    if ((pointer_node = (direction <= 0) ? pointer_node.left : pointer_node.right) == null) {
      // 붙일 노드가 null 이라면 새로운 노드를 생성해 key / value를 붙인다.
      Node<K, V> xp_next = xp.next;
      TreeNode<K, V> new_tree_node = map.newTreeNode(key_hash, given_key, given_value, xp_next);
      if (direction <= 0)
        xp.left = new_tree_node;
      else
        xp.right = new_tree_node;
      xp.next = new_tree_node;
      new_tree_node.parent = new_tree_node.prev = xp;
      if (xp_next != null)
        ((TreeNode<K, V>) xp_next).prev = new_tree_node;
      moveRootToFront(tab, balanceInsertion(root, new_tree_node));
      return null;
    }
  }
}
```

### tieBreakOrder 메소드

`tieBreakOrder` 메소드를 읽어보면 해시값이 같은 두 key의 우선순위를 어떻게 결정하는지 알 수 있다.

[jdk-11+28 java.util.HashMap.tieBreakOrder]( https://github.com/openjdk/jdk/blob/jdk-11%2B28/src/java.base/share/classes/java/util/HashMap.java#L1946-L1954 )

```java
/**
 * Tie-breaking utility for ordering insertions when equal
 * hashCodes and non-comparable. We don't require a total
 * order, just a consistent insertion rule to maintain
 * equivalence across rebalancings. Tie-breaking further than
 * necessary simplifies testing a bit.
 */
static int tieBreakOrder(Object a, Object b) {
  int d;
  if (a == null || b == null ||
      (d = a.getClass().getName().
          compareTo(b.getClass().getName())) == 0) {
    d = (System.identityHashCode(a) <= System.identityHashCode(b) ?
        -1 : 1);
  }
  return d;
}
```

- `a` 또는 `b`가 `null` 이면
    - `System.identityHashCode` 값을 비교해 `-1`, `1` 을 리턴한다.
- `a`의 클래스 이름 String과 `b`의 클래스 이름 String을 compare 한 결과를 리턴한다.


## 참고문헌

- [Collections Framework Enhancements in Java SE 8][new-jdk8-collections]
- [JEP 180: Handle Frequent HashMap Collisions with Balanced Trees][jep-180]
- [What's New in JDK 8][new-jdk8]
- [jdk-11+28 java.util.HashMap.java]( https://github.com/openjdk/jdk/blob/jdk-11%2B28/src/java.base/share/classes/java/util/HashMap.java )
- [jdk-17+35 java.util.HashMap.java]( https://github.com/openjdk/jdk/blob/jdk-17%2B35/src/java.base/share/classes/java/util/HashMap.java )


## 주석

[new-jdk8]: https://www.oracle.com/technetwork/java/javase/8-whats-new-2157071.html
[new-jdk8-collections]: https://docs.oracle.com/javase/8/docs/technotes/guides/collections/changes8.html
[jep-180]: http://openjdk.java.net/jeps/180

