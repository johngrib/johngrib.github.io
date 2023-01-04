---
layout  : wiki
title   : java.util.ArrayList
summary : 이걸 모르면 곤란하지
date    : 2021-03-31 23:24:24 +0900
updated : 2022-01-29 00:55:15 +0900
tag     : java algorithm
resource: 6A/7AB989-C200-477D-B71B-F3873C6D6690
toc     : true
public  : true
parent  : [[/java]]
latex   : true
giscus  : auto
---
* TOC
{:toc}

## 소스코드와 JavaDoc

### class ArrayList

<details><summary>(클릭) ArrayList의 클래스 JavaDoc 주석.</summary><div markdown="1">

```java
/**
 * Resizable-array implementation of the {@code List} interface.  Implements
 * all optional list operations, and permits all elements, including
 * {@code null}.  In addition to implementing the {@code List} interface,
 * this class provides methods to manipulate the size of the array that is
 * used internally to store the list.  (This class is roughly equivalent to
 * {@code Vector}, except that it is unsynchronized.)
 *
 * <p>The {@code size}, {@code isEmpty}, {@code get}, {@code set},
 * {@code iterator}, and {@code listIterator} operations run in constant
 * time.  The {@code add} operation runs in <i>amortized constant time</i>,
 * that is, adding n elements requires O(n) time.  All of the other operations
 * run in linear time (roughly speaking).  The constant factor is low compared
 * to that for the {@code LinkedList} implementation.
 *
 * <p>Each {@code ArrayList} instance has a <i>capacity</i>.  The capacity is
 * the size of the array used to store the elements in the list.  It is always
 * at least as large as the list size.  As elements are added to an ArrayList,
 * its capacity grows automatically.  The details of the growth policy are not
 * specified beyond the fact that adding an element has constant amortized
 * time cost.
 *
 * <p>An application can increase the capacity of an {@code ArrayList} instance
 * before adding a large number of elements using the {@code ensureCapacity}
 * operation.  This may reduce the amount of incremental reallocation.
 *
 * <p><strong>Note that this implementation is not synchronized.</strong>
 * If multiple threads access an {@code ArrayList} instance concurrently,
 * and at least one of the threads modifies the list structurally, it
 * <i>must</i> be synchronized externally.  (A structural modification is
 * any operation that adds or deletes one or more elements, or explicitly
 * resizes the backing array; merely setting the value of an element is not
 * a structural modification.)  This is typically accomplished by
 * synchronizing on some object that naturally encapsulates the list.
 *
 * If no such object exists, the list should be "wrapped" using the
 * {@link Collections#synchronizedList Collections.synchronizedList}
 * method.  This is best done at creation time, to prevent accidental
 * unsynchronized access to the list:<pre>
 *   List list = Collections.synchronizedList(new ArrayList(...));</pre>
 *
 * <p id="fail-fast">
 * The iterators returned by this class's {@link #iterator() iterator} and
 * {@link #listIterator(int) listIterator} methods are <em>fail-fast</em>:
 * if the list is structurally modified at any time after the iterator is
 * created, in any way except through the iterator's own
 * {@link ListIterator#remove() remove} or
 * {@link ListIterator#add(Object) add} methods, the iterator will throw a
 * {@link ConcurrentModificationException}.  Thus, in the face of
 * concurrent modification, the iterator fails quickly and cleanly, rather
 * than risking arbitrary, non-deterministic behavior at an undetermined
 * time in the future.
 *
 * <p>Note that the fail-fast behavior of an iterator cannot be guaranteed
 * as it is, generally speaking, impossible to make any hard guarantees in the
 * presence of unsynchronized concurrent modification.  Fail-fast iterators
 * throw {@code ConcurrentModificationException} on a best-effort basis.
 * Therefore, it would be wrong to write a program that depended on this
 * exception for its correctness:  <i>the fail-fast behavior of iterators
 * should be used only to detect bugs.</i>
 *
 * <p>This class is a member of the
 * <a href="{@docRoot}/java.base/java/util/package-summary.html#CollectionsFramework">
 * Java Collections Framework</a>.
 *
 * @param <E> the type of elements in this list
 *
 * @author  Josh Bloch
 * @author  Neal Gafter
 * @see     Collection
 * @see     List
 * @see     LinkedList
 * @see     Vector
 * @since   1.2
 */
public class ArrayList<E> extends AbstractList<E>
        implements List<E>, RandomAccess, Cloneable, java.io.Serializable
{
```

</div></details>

>
Resizable-array implementation of the List interface. Implements all optional list operations, and permits all elements, including null. In addition to implementing the List interface, this class provides methods to manipulate the size of the array that is used internally to store the list. (This class is roughly equivalent to `Vector`, except that it is unsynchronized.)

- `List` 인터페이스의 크기 조정 가능 배열 구현.
- 모든 선택적 목록 작업을 구현하고 `null`을 포함한 모든 요소를 허용합니다.
- `List` 인터페이스를 구현하는 것 외에도 이 클래스는 목록을 저장하기 위해 내부적으로 사용되는 배열의 크기를 조작하는 메서드를 제공합니다.
    - (이 클래스는 비 동기화(unsynchronized)된다는 점을 제외하면 `Vector`와 거의 동일합니다.)

>
The `size`, `isEmpty`, `get`, `set`, `iterator`, and `listIterator` operations run in constant time. The add operation runs in amortized constant time, that is, adding n elements requires $$O(n)$$ time. All of the other operations run in linear time (roughly speaking). The constant factor is low compared to that for the `LinkedList` implementation.

- `size`, `isEmpty`, `get`, `set`, `iterator`, `listIterator` 작업은 상수 시간에 실행됩니다.
- `add`는 amortized constant 시간에 실행됩니다.
    - 즉, `n` 개의 요소를 추가하려면 $$O(n)$$ 시간이 필요합니다.
    - 다른 모든 작업은 (대략) 선형 시간으로 실행됩니다.
    - 상수 요인은 `LinkedList` 구현에 비해 낮습니다.

>
Each `ArrayList` instance has a _capacity_. The capacity is the size of the array used to store the elements in the list. It is always at least as large as the list size. As elements are added to an `ArrayList`, its capacity grows automatically. The details of the growth policy are not specified beyond the fact that adding an element has constant amortized time cost.

- 각 `ArrayList` 인스턴스에는 용량이 있습니다.
    - 용량은 목록의 요소를 저장하는 데 사용되는 배열의 크기입니다.
    - 언제나 용량의 크기는 리스트의 크기보다 크거나 같습니다.
    - `ArrayList`에 요소가 추가되면 용량이 자동으로 증가합니다.
    - 요소를 추가하면 상각된 시간 비용(amortized time cost)이 일정하다는 사실 외에 성장 정책의 세부 사항은 이 주석에 명시하지 않습니다.

>
An application can increase the capacity of an `ArrayList` instance before adding a large number of elements using the `ensureCapacity` operation. This may reduce the amount of incremental reallocation.

- 응용 프로그램은 `ensureCapacity` 작업을 사용하여 많은 수의 요소를 추가하기 전에 `ArrayList` 인스턴스의 용량을 늘릴 수 있습니다.
- 이것은 증분 재할당의 양을 줄일 수 있습니다.

>
**Note that this implementation is not synchronized.** If multiple threads access an ArrayList instance concurrently, and at least one of the threads modifies the list structurally, it must be synchronized externally. (A structural modification is any operation that adds or deletes one or more elements, or explicitly resizes the backing array; merely setting the value of an element is not a structural modification.) This is typically accomplished by synchronizing on some object that naturally encapsulates the list. If no such object exists, the list should be "wrapped" using the Collections.synchronizedList method. This is best done at creation time, to prevent accidental unsynchronized access to the list:
>
```java
   List list = Collections.synchronizedList(new ArrayList(...));
```

- **이 구현은 동기화되지 않습니다.**
- 여러 스레드가 동시에 `ArrayList` 인스턴스에 액세스하는 상황에서 하나 이상의 스레드가 리스트를 구조적으로 수정하게 되는 경우 외부에서 동기화 처리(synchronize)를 해줘야 합니다.
    - (구조적 수정이란 하나 이상의 원소를 추가/삭제하거나 명시적으로 백업 배열의 크기를 조정하는 작업을 말합니다. 단순히 원소의 값을 변경하는 것은 구조적 수정이 아닙니다.)
- 이런 동기화 작업은 리스트를 캡슐화하는 객체를 사용해 해결하는 방법도 있습니다.
    - 그러한 객체가 없으면 `Collections.synchronizedList` 메서드를 사용하여 목록을 "래핑"해야합니다.
    - 동기화되지 않은 엑세스가 일어나는 사고를 방지하는 가장 좋은 방법은 객체를 생성할 때 다음과 같이 하는 것입니다.

```java
List list = Collections.synchronizedList(new ArrayList(...));
```

>
The iterators returned by this class's `iterator` and `listIterator` methods are fail-fast: if the list is structurally modified at any time after the iterator is created, in any way except through the iterator's own `remove` or `add` methods, the iterator will throw a `ConcurrentModificationException`. Thus, in the face of concurrent modification, the iterator fails quickly and cleanly, rather than risking arbitrary, non-deterministic behavior at an undetermined time in the future.

- 이 클래스의 `iterator`와 `listIterator` 메소드가 리턴한 이터레이터들은 fail-fast 방식을 따릅니다.
    - 이터레이터가 생성된 후 목록이 구조적으로 수정되면 이터레이터가 자체적으로 갖고 있는 `remove`나 `add` 메소드를 사용하지 않는 한, 이터레이터는 `ConcurrentModificationException`을 던집니다.
    - 그러므로 동시적으로(concurrent) 수정 작업이 발생한다면 이터레이터는 빠르고 깔끔하게 실패하게 됩니다. 이를 통해 비결정적 변경이라는 위험을 최대한 방지하려 합니다.

>
Note that the fail-fast behavior of an iterator cannot be guaranteed as it is, generally speaking, impossible to make any hard guarantees in the presence of unsynchronized concurrent modification. Fail-fast iterators throw `ConcurrentModificationException` on a best-effort basis. Therefore, it would be wrong to write a program that depended on this exception for its correctness: _the fail-fast behavior of iterators should be used only to detect bugs_.
>
This class is a member of the Java Collections Framework.

- 이터레이터의 이러한 동시적 수정에 대한 fail-fast 동작은 보장된 것이 아닙니다.
- fail-fast 이터레이터는 최대한 `ConcurrentModificationException`을 던지려 할 뿐이므로, 이 예외가 정확할 것이라 전제하고 예외에 의존하는 프로그램을 작성하면 안됩니다.
- 이터레이터의 fail-fast 동작은 버그를 찾는 데에만 사용해야 합니다.
- 이 클래스는 Java Collections Framework의 멤버입니다.

### 상수

```java
/**
 * Default initial capacity.
 */
private static final int DEFAULT_CAPACITY = 10;
```

- 용량 초기값은 `10` 이다.

```java
/**
 * The maximum size of array to allocate (unless necessary).
 * Some VMs reserve some header words in an array.
 * Attempts to allocate larger arrays may result in
 * OutOfMemoryError: Requested array size exceeds VM limit
 */
private static final int MAX_ARRAY_SIZE = Integer.MAX_VALUE - 8;
```

- 배열의 최대 사이즈로 설정된 것은 `Integer.MAX_VALUE - 8` 이다.
- 그러나 진짜로 최대 사이즈는 아니고, 이 값보다 큰 배열 사이즈가 필요한 상황이 되면 `hugeCapacity`가 처리를 담당한다.
- `hugeCapacity` 메소드는 `minCapacity`가 음수이면 `OutOfMemoryError`를 던지고, `MAX_ARRAY_SIZE`보다 큰 값이면 `Integer.MAX_VALUE`를 사이즈로 사용한다.



### 생성자

#### ArrayList()

```java
/**
 * Constructs an empty list with an initial capacity of ten.
 */
public ArrayList() {
```

- 기본 생성자는 초기 용량을 `10`으로 잡는다.

#### ArrayList(int initialCapacity)

```java
/**
 * Constructs an empty list with the specified initial capacity.
 *
 * @param  initialCapacity  the initial capacity of the list
 * @throws IllegalArgumentException if the specified initial capacity
 *         is negative
 */
public ArrayList(int initialCapacity) {
    if (initialCapacity > 0) {
        this.elementData = new Object[initialCapacity];
    } else if (initialCapacity == 0) {
        this.elementData = EMPTY_ELEMENTDATA;
    } else {
        throw new IllegalArgumentException("Illegal Capacity: "+
                                           initialCapacity);
    }
}
```

- 초기 용량값인 `initialCapacity`가 주어지면, 초기 용량만큼의 사이즈를 가진 배열을 생성해 사용한다.

#### ArrayList(Collection<? extends E> c)

```java
/**
 * Constructs a list containing the elements of the specified
 * collection, in the order they are returned by the collection's
 * iterator.
 *
 * @param c the collection whose elements are to be placed into this list
 * @throws NullPointerException if the specified collection is null
 */
public ArrayList(Collection<? extends E> c) {
    elementData = c.toArray();
    if ((size = elementData.length) != 0) {
        // defend against c.toArray (incorrectly) not returning Object[]
        // (see e.g. https://bugs.openjdk.java.net/browse/JDK-6260652)
        if (elementData.getClass() != Object[].class)
            elementData = Arrays.copyOf(elementData, size, Object[].class);
    } else {
        // replace with empty array.
        this.elementData = EMPTY_ELEMENTDATA;
    }
}
```

- `Collection`이 주어지면 같은 사이즈를 갖는 배열을 생성하고 값을 복사해 사용한다.

### 사이즈 조정 관련 메소드

#### trimToSize

```java
/**
 * Trims the capacity of this {@code ArrayList} instance to be the
 * list's current size.  An application can use this operation to minimize
 * the storage of an {@code ArrayList} instance.
 */
public void trimToSize() {
    modCount++;
    if (size < elementData.length) {
        elementData = (size == 0)
          ? EMPTY_ELEMENTDATA
          : Arrays.copyOf(elementData, size);
    }
}
```

- 용량에서 빈 공간을 현재 사이즈에 맞게 깎아낸다(trim).
- 이 메소드는 `ArrayList` 인스턴스의 스토리지 용량을 최소화시키고 싶을 때 사용한다.

#### ensureCapacity

```java
/**
 * Increases the capacity of this {@code ArrayList} instance, if
 * necessary, to ensure that it can hold at least the number of elements
 * specified by the minimum capacity argument.
 *
 * @param minCapacity the desired minimum capacity
 */
public void ensureCapacity(int minCapacity) {
    if (minCapacity > elementData.length
        && !(elementData == DEFAULTCAPACITY_EMPTY_ELEMENTDATA
             && minCapacity <= DEFAULT_CAPACITY)) {
        modCount++;
        grow(minCapacity);
    }
}
```

- 용량을 증가시킨다.

#### grow

```java
/**
 * Increases the capacity to ensure that it can hold at least the
 * number of elements specified by the minimum capacity argument.
 *
 * @param minCapacity the desired minimum capacity
 * @throws OutOfMemoryError if minCapacity is less than zero
 */
private Object[] grow(int minCapacity) {
    return elementData = Arrays.copyOf(elementData,
                                       newCapacity(minCapacity));
}

private Object[] grow() {
    return grow(size + 1);
}
```

- `grow()`는 `size+1`을 사용해 용량을 자동으로 증가시키려 한다.
- `grow(int minCapacity)`는 `newCapacity`를 새로 계산해 얻고, 새로운 배열을 만들어 갖고 있던 원소들을 복사해 옮긴다.

#### newCapacity

```java
/**
 * Returns a capacity at least as large as the given minimum capacity.
 * Returns the current capacity increased by 50% if that suffices.
 * Will not return a capacity greater than MAX_ARRAY_SIZE unless
 * the given minimum capacity is greater than MAX_ARRAY_SIZE.
 *
 * @param minCapacity the desired minimum capacity
 * @throws OutOfMemoryError if minCapacity is less than zero
 */
private int newCapacity(int minCapacity) {
    // overflow-conscious code
    int oldCapacity = elementData.length;
    int newCapacity = oldCapacity + (oldCapacity >> 1);
    if (newCapacity - minCapacity <= 0) {
        if (elementData == DEFAULTCAPACITY_EMPTY_ELEMENTDATA)
            return Math.max(DEFAULT_CAPACITY, minCapacity);
        if (minCapacity < 0) // overflow
            throw new OutOfMemoryError();
        return minCapacity;
    }
    return (newCapacity - MAX_ARRAY_SIZE <= 0)
        ? newCapacity
        : hugeCapacity(minCapacity);
}
```

- `private` 메소드지만 이 메소드를 이해하는 것이 `ArrayList`의 핵심이라 생각한다.
- 특히 다음 부분이 중요하다. Dynamic Array로서 `ArrayList`의 growth factor가 `1.5`라는 것을 확인할 수 있다.
```java
int newCapacity = oldCapacity + (oldCapacity >> 1);
```

#### add

```java
/**
 * This helper method split out from add(E) to keep method
 * bytecode size under 35 (the -XX:MaxInlineSize default value),
 * which helps when add(E) is called in a C1-compiled loop.
 */
private void add(E e, Object[] elementData, int s) {
    if (s == elementData.length)
        elementData = grow();
    elementData[s] = e;
    size = s + 1;
}
```

- 사이즈가 부족한 상황이 되면 `grow` 메소드를 호출해 배열의 사이즈를 증가시킨다.
- `grow()`이므로 `size+1`을 하고 있는 셈이다.

```java
/**
 * Appends the specified element to the end of this list.
 *
 * @param e element to be appended to this list
 * @return {@code true} (as specified by {@link Collection#add})
 */
public boolean add(E e) {
    modCount++;
    add(e, elementData, size);
    return true;
}
```

```java
/**
 * Inserts the specified element at the specified position in this
 * list. Shifts the element currently at that position (if any) and
 * any subsequent elements to the right (adds one to their indices).
 *
 * @param index index at which the specified element is to be inserted
 * @param element element to be inserted
 * @throws IndexOutOfBoundsException {@inheritDoc}
 */
public void add(int index, E element) {
    rangeCheckForAdd(index);
    modCount++;
    final int s;
    Object[] elementData;
    if ((s = size) == (elementData = this.elementData).length)
        elementData = grow();
    System.arraycopy(elementData, index,
                     elementData, index + 1,
                     s - index);
    elementData[index] = element;
    size = s + 1;
}
```

- 주어진 원소를 주어진 위치에 밀어넣는다. 해당 위치에 있던 아이템부터는 뒤로 밀리게 된다.

#### remove

```java
/**
 * Removes the element at the specified position in this list.
 * Shifts any subsequent elements to the left (subtracts one from their
 * indices).
 *
 * @param index the index of the element to be removed
 * @return the element that was removed from the list
 * @throws IndexOutOfBoundsException {@inheritDoc}
 */
public E remove(int index) {
    Objects.checkIndex(index, size);
    final Object[] es = elementData;

    @SuppressWarnings("unchecked") E oldValue = (E) es[index];
    fastRemove(es, index);

    return oldValue;
}
```

- 원소를 삭제하고, `fastRemove`를 사용해 배열의 사이즈를 줄인다.

#### fastRemove

```java
/**
 * Private remove method that skips bounds checking and does not
 * return the value removed.
 */
private void fastRemove(Object[] es, int i) {
    modCount++;
    final int newSize;
    if ((newSize = size - 1) > i)
        System.arraycopy(es, i + 1, es, i, newSize - i);
    es[size = newSize] = null;
}
```

- 원소를 삭제하고 배열의 사이즈를 줄인다.
    - `newSize = size - 1`

## ArrayList의 구조와 grow

ArrayList를 기본 생성자를 호출해 생성했다면 `elementData`는 `DEFAULTCAPACITY_EMPTY_ELEMENTDATA`를 가리키고 있다.

[java.util.ArrayList]( https://github.com/openjdk/jdk/blob/jdk-19%2B7/src/java.base/share/classes/java/util/ArrayList.java#L168 )

```java
/**
 * Constructs an empty list with an initial capacity of ten.
 */
public ArrayList() {
    this.elementData = DEFAULTCAPACITY_EMPTY_ELEMENTDATA;
}
```

주석을 읽어보면 `initial capcity`가 `ten`이라고 하는데, 실제로도 DEFAULT_CAPACITY`가 `10`으로 선언되어 있다.

```java
private static final int DEFAULT_CAPACITY = 10;
```

그런데 `DEFAULTCAPACITY_EMPTY_ELEMENTDATA`는 다음과 같이 선언되어 있다.

[java.util.ArrayList. DEFAULTCAPACITY_EMPTY_ELEMENTDATA]( https://github.com/openjdk/jdk/blob/jdk-19%2B7/src/java.base/share/classes/java/util/ArrayList.java#L130 )

```java
/**
 * Shared empty array instance used for default sized empty instances. We
 * distinguish this from EMPTY_ELEMENTDATA to know how much to inflate when
 * first element is added.
 */
private static final Object[] DEFAULTCAPACITY_EMPTY_ELEMENTDATA = {};
```

즉 기본 생성자로 초기화된 ArrayList의 capacity는 `10`이지만,
`elementData`는 길이가 0인 배열인 `DEFAULTCAPACITY_EMPTY_ELEMENTDATA`를 가리키고 있다는 것.

하지만 아이템 하나를 추가하면 길이가 10인 배열로 `elementData`를 교체하게 되므로 크게 신경쓸 일은 아니다.

이제 아이템을 하나 추가하면 `grow(1)`이 호출된다. `grow`의 코드는 다음과 같다.

[java.util.ArrayList::grow]( https://github.com/openjdk/jdk/blob/jdk-19%2B7/src/java.base/share/classes/java/util/ArrayList.java#L231 )

```java
private Object[] grow(int minCapacity) {
    int oldCapacity = elementData.length;
    if (oldCapacity > 0 || elementData != DEFAULTCAPACITY_EMPTY_ELEMENTDATA) {
        int newCapacity = ArraysSupport.newLength(oldCapacity,
                minCapacity - oldCapacity, /* minimum growth */
                oldCapacity >> 1           /* preferred growth */);
        return elementData = Arrays.copyOf(elementData, newCapacity);
    } else {
        // 여기
        return elementData = new Object[Math.max(DEFAULT_CAPACITY, minCapacity)];
    }
}
```

첫 아이템을 추가하게 되면 `elementData == DEFAULTCAPACITY_EMPTY_ELEMENTDATA` 이므로 `DEFAULT_CAPACITY` 사이즈(10)를 갖는 배열을 생성한다.

![아이템이 1개 있는 ArrayList]( ./arraylist-1.svg )

아이템을 9개 더 추가하면 `elementData`가 꽉 차게 된다.

![아이템이 10개 있는 ArrayList]( ./arraylist-10.svg )

이 때 아이템을 한 개 더 추가하면 `grow(size+1)`, 즉 `grow(11)`이 호출된다.

![아이템이 11개 있는 ArrayList]( ./arraylist-11.svg )

그 결과는 위의 그림과 같다. 즉, grow는 `elementData`가 부족할 때마다 `1.5`배 사이즈를 갖는 배열을 생성해 값을 복사하는 작업을 한다.

`elementData` 배열의 사이즈가 작을 때에는 이런 복사작업이 좀 있어도 괜찮은데, 아이템의 수가 많아지면 그만큼 grow가 여러 차례 발생한다는 점을 고려해야 한다.
특히 아이템을 1개씩 계속해서 추가하고 있다면 grow를 통한 복사가 누적될 수 있으므로 주의해야 한다.

다음은 [[/clojure/study/vector]] 문서에서 인용한 것이다.

>
32801개의 아이템을 하나씩 일일이 ArrayList에 추가할 때 내부에서 새로 만드는 배열의 사이즈를 순서대로 나열해보면 다음과 같다.
>
10, 15, 22, 33, 49, 73, 109, 163, 244, 366, 549, 823, 1234, 1851, 2776, 4164, 6246, 9369, 14053, 21079, 31618, 47427
>
array copy를 통한 아이템의 복사는 146,029 회.
>
$$ 10 + 15 + ... + 31618 + (32801 - 31618) = 146029 $$
>
그러므로 32801개의 아이템을 ArrayList에 하나 하나 추가하면 최소한 146029회의 값 복사가 발생한다.
(게다가 복제 이후에 이전의 배열은 안 쓰게 되므로 gc가 모두 청소할 것이다.)

## 참고문헌

- [ArrayList (docs.oracle.com)]( https://docs.oracle.com/en/java/javase/11/docs/api/java.base/java/util/ArrayList.html )
- [Dynamic array]( https://en.wikipedia.org/wiki/Dynamic_array )

