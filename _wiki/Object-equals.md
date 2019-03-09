---
layout  : wiki
title   : java.lang.Object.equals 메소드
summary :
date    : 2018-03-07 21:40:19 +0900
updated : 2018-03-08 23:00:25 +0900
tag     : java 번역
toc     : true
public  : true
parent  : Java
latex   : false
---
* TOC
{:toc}

버전: Java 1.8

## 원문

```java
/**
 * Indicates whether some other object is "equal to" this one.
 * <p>
 * The {@code equals} method implements an equivalence relation
 * on non-null object references:
 * <ul>
 * <li>It is <i>reflexive</i>: for any non-null reference value
 *     {@code x}, {@code x.equals(x)} should return
 *     {@code true}.
 * <li>It is <i>symmetric</i>: for any non-null reference values
 *     {@code x} and {@code y}, {@code x.equals(y)}
 *     should return {@code true} if and only if
 *     {@code y.equals(x)} returns {@code true}.
 * <li>It is <i>transitive</i>: for any non-null reference values
 *     {@code x}, {@code y}, and {@code z}, if
 *     {@code x.equals(y)} returns {@code true} and
 *     {@code y.equals(z)} returns {@code true}, then
 *     {@code x.equals(z)} should return {@code true}.
 * <li>It is <i>consistent</i>: for any non-null reference values
 *     {@code x} and {@code y}, multiple invocations of
 *     {@code x.equals(y)} consistently return {@code true}
 *     or consistently return {@code false}, provided no
 *     information used in {@code equals} comparisons on the
 *     objects is modified.
 * <li>For any non-null reference value {@code x},
 *     {@code x.equals(null)} should return {@code false}.
 * </ul>
 * <p>
 * The {@code equals} method for class {@code Object} implements
 * the most discriminating possible equivalence relation on objects;
 * that is, for any non-null reference values {@code x} and
 * {@code y}, this method returns {@code true} if and only
 * if {@code x} and {@code y} refer to the same object
 * ({@code x == y} has the value {@code true}).
 * <p>
 * Note that it is generally necessary to override the {@code hashCode}
 * method whenever this method is overridden, so as to maintain the
 * general contract for the {@code hashCode} method, which states
 * that equal objects must have equal hash codes.
 *
 * @param   obj   the reference object with which to compare.
 * @return  {@code true} if this object is the same as the obj
 *          argument; {@code false} otherwise.
 * @see     #hashCode()
 * @see     java.util.HashMap
 */
public boolean equals(Object obj) {
    return (this == obj);
}
```

## 번역

equals 메소드는 이 객체가 다른 객체와 **같은지** 아닌지를 나타냅니다.

equals 메소드는 null이 아닌 객체 참조들에 대한 **동치 관계**를 구현하며, 동치 관계의 조건은 다음과 같습니다.

* null이 아닌 참조 x, y, z에 대하여,
    * 반사관계: `x.equals(x)`는 `true`여야 한다.
    * 대칭관계: `y.equals(x)`가 `true`이면, `x.equals(y)`도 `true`여야 한다.
    * 추이관계: `x.equals(y)`가 `true`이고, `y.equals(z)`도 `true`이면, `x.equals(z)` 또한 `true`여야 한다.
    * 일관성: `equals` 비교에 필요한 정보가 수정되지 않았다면, `x.equals(y)`를 여러 차례 실행한 결과는 일관성 있게 `true`만 리턴하거나 `false`만 리턴해야 한다.
    * `x.equals(null)`은 `false`여야 한다.

Object 클래스에 들어 있는 equals 메소드는 가장 확실한 근거만으로 동치 관계를 판별하는데, 그 조건은 null이 아닌 참조 x와 y가 똑같은 객체인지의 여부(`x == y`가 `true`인 경우)입니다.

주의: 일반적으로 `equals` 메소드를 오버라이드하면 `hashCode` 메소드도 오버라이드하며, `hashCode` 메소드는 **같은 객체는 같은 해시코드를 가져야 한다**는 `hashCode` 메소드에 대한 일반 규약을 따라야 합니다.

* @param obj 비교할 객체의 참조
* @return
    * `true` : obj와 이 객체가 같은 경우.
    * `false` : 그 외의 경우.
* @see
    * `hashCode()`
    * `java.util.HashMap`

## equals 메소드 예제

### AbstractSet.java

다음은 java.util.AbstractSet.java에 들어 있는 equals 메소드의 코드이다.

```java
/**
 * Compares the specified object with this set for equality.  Returns
 * <tt>true</tt> if the given object is also a set, the two sets have
 * the same size, and every member of the given set is contained in
 * this set.  This ensures that the <tt>equals</tt> method works
 * properly across different implementations of the <tt>Set</tt>
 * interface.<p>
 *
 * This implementation first checks if the specified object is this
 * set; if so it returns <tt>true</tt>.  Then, it checks if the
 * specified object is a set whose size is identical to the size of
 * this set; if not, it returns false.  If so, it returns
 * <tt>containsAll((Collection) o)</tt>.
 *
 * @param o object to be compared for equality with this set
 * @return <tt>true</tt> if the specified object is equal to this set
 */
public boolean equals(Object o) {
    if (o == this)              // 자기 자신과 같은가?
        return true;

    if (!(o instanceof Set))    // 집합인가(Set 인터페이스 구현체인가)?
        return false;

    Collection<?> c = (Collection<?>) o;
    if (c.size() != size())     // 두 집합의 크기가 같은가?
        return false;
    try {
        return containsAll(c);  // 대상 집합은 this 집합의 부분집합인가?
    } catch (ClassCastException unused)   {
        return false;
    } catch (NullPointerException unused) {
        return false;
    }
}
```

#### 번역

equals 메소드는 this 집합(Set)과 주어진 객체의 동치 관계를 비교합니다.

주어진 객체가 집합이고, 두 집합의 크기가 같으며, 주어진 집합의 모든 원소가 this 집합에 포함되어 있다면 `true`를 리턴합니다.

이 방법으로 집합(Set)인터페이스의 다양한 구현체에 대해 equals 메소드가 올바르게 작동함을 보장할 수 있습니다.

이 메소드의 로직은 다음과 같습니다.

1. 주어진 객체가 this 집합과 같은 객체인지를 검사합니다. 같은 객체라면 `true`를 리턴합니다.
1. 주어진 객체가 집합이고 this 집합과 같은 크기를 가지고 있는지를 검사합니다. 만약 아니라면 `false`를 리턴합니다.
1. `containsAll((Collection) o)`를 호출한 결과를 리턴합니다. (역주: 길이가 같고 포함관계라면 동치라고 볼 수 있다.)

* @param o 이 집합과 동치 관계를 비교하려는 객체
* @return 주어진 객체와 this 집합이 동치라면 `true`

### AbstractList.java

다음은 java.util.AbstractList.java에 들어 있는 equals 메소드의 코드이다.

```java
/**
 * Compares the specified object with this list for equality.  Returns
 * {@code true} if and only if the specified object is also a list, both
 * lists have the same size, and all corresponding pairs of elements in
 * the two lists are <i>equal</i>.  (Two elements {@code e1} and
 * {@code e2} are <i>equal</i> if {@code (e1==null ? e2==null :
 * e1.equals(e2))}.)  In other words, two lists are defined to be
 * equal if they contain the same elements in the same order.<p>
 *
 * This implementation first checks if the specified object is this
 * list. If so, it returns {@code true}; if not, it checks if the
 * specified object is a list. If not, it returns {@code false}; if so,
 * it iterates over both lists, comparing corresponding pairs of elements.
 * If any comparison returns {@code false}, this method returns
 * {@code false}.  If either iterator runs out of elements before the
 * other it returns {@code false} (as the lists are of unequal length);
 * otherwise it returns {@code true} when the iterations complete.
 *
 * @param o the object to be compared for equality with this list
 * @return {@code true} if the specified object is equal to this list
 */
public boolean equals(Object o) {
    if (o == this)              // 자기 자신과 같은가?
        return true;
    if (!(o instanceof List))   // 리스트인가(List 인터페이스 구현체인가)?
        return false;

    // 두 리스트의 원소를 순서대로 비교한다
    ListIterator<E> e1 = listIterator();
    ListIterator<?> e2 = ((List<?>) o).listIterator();
    while (e1.hasNext() && e2.hasNext()) {
        E o1 = e1.next();
        Object o2 = e2.next();
        if (!(o1==null ? o2==null : o1.equals(o2))) // 각각의 원소가 같은가?
            return false;
    }
    // 루프가 끝난 이후 두 리스트의 원소 중 검사하지 않은 것이 없다면 true
    return !(e1.hasNext() || e2.hasNext());
}
```

#### 번역

equals 메소드는 this 리스트와 지정한 객체의 동치 관계를 비교합니다.

주어진 객체가 리스트이고, 두 리스트의 길이가 같으며,
두 리스트의 모든 원소가 순서대로 짝을 이루어 같은 경우에만, true를 리턴합니다.

(두 원소 e1과 e2의 동치 여부는 `e1 == null ? e2 == null : e1.equals(e2)` 로 알아냅니다.)

즉, 두 리스트가 같은 원소들을 갖고 있고, 원소들의 순서도 똑같다면, 두 리스트는 동치 관계입니다.

이 메소드의 로직은 다음과 같습니다.

1. 주어진 객체가 this 리스트와 같은 객체인지를 검사합니다. 같은 객체라면 `true`를 리턴합니다.
2. 주어진 객체가 리스트인지를 검사합니다. 리스트가 아니라면 `false`를 리턴합니다.
3. 두 리스트를 루프하며, 모든 원소가 같은지를 비교합니다. 하나라도 `false`가 나오면 `false`를 리턴합니다.
4. 두 리스트를 루프하는 도중, 한 쪽이 먼저 끝나면 `false`를 리턴합니다. (두 리스트의 길이가 똑같지 않음이 증명됐기 때문)
5. 루프가 끝나면 `true`를 리턴합니다.

* @param o 이 리스트와 동치 관계를 비교하려는 객체
* @return 주어진 객체와 this 리스트가 동치라면 `true`

## equals를 잘못 구현한 사례 - java.sql.Timestamp

[[Effective-Java]] 규칙 8 중에서 발췌.

> 자바의 기본 라이브러리 가운데는 객체 생성 가능 클래스를 계승하여 값 컴포넌트를 추가한 클래스도 있다.
일례로 java.sql.Timestamp는 java.util.Date를 계승하여 nanoseconds 필드를 추가한 것이다.
Timestamp 클래스의 equals 메소드는 대칭성을 위반하므로
**Timestamp 객체와 Date 객체를 같은 컬렉션에 보관하거나 섞어 쓰면 문제가 생길 수 있다**.
그래서 Timestamp 클래스의 주석에는 Date 객체와 Timestamp 객체를 함께 쓰지 말라는 경고가 있다.
경고대로 하면 문제가 생기지는 않겠지만, 실수로 섞어 쓰는 것까지 방지할 수는 없으므로 디버깅하기 어려운 문제가 생길 수도 있다.
Timestamp가 이렇게 구현된 것은 실수이며, 절대로 따라하면 안 된다.

궁금해서 테스트 코드를 돌려 보았더니, 정말로 대칭 관계를 위반하고 있었다.

```java
import java.sql.Timestamp;
import java.util.Date;
import static org.junit.Assert.*;

public class EqualsTest {

    @Test
    public void test1() {

        Timestamp timestamp = new Timestamp(0L);
        Date date = new Date(timestamp.getTime());

        // 테스트 통과. date는 timestamp와 동치이다.
        assertTrue(date.equals(timestamp));
    }

    @Test
    public void test2() {

        Timestamp timestamp = new Timestamp(0L);
        Date date = new Date(timestamp.getTime());

        // 테스트 실패. timestamp는 date와 동치가 아니다. 즉, 대칭관계 위반.
        assertTrue(timestamp.equals(date));
    }
}
```

java.util.Date의 equals 메소드는 다음과 같다. 편의상 주석은 생략하였다.

```java
public boolean equals(Object obj) {
    return obj instanceof Date && getTime() == ((Date) obj).getTime();
}
```

한편, java.sql.Timestamp의 equals 메소드를 보니 다음과 같았다.

```java
public boolean equals(Timestamp ts) {
    if (super.equals(ts)) {         // java.util.Date.equals
        if  (nanos == ts.nanos) {
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }
}

public boolean equals(java.lang.Object ts) {
  if (ts instanceof Timestamp) {
    return this.equals((Timestamp)ts);
  } else {
    return false;
  }
}
```

* `date.equals(timestamp)` : date 기준으로 시간이 같은지만 검사하므로 true가 된다.
* `timestamp.equals(date)` : date는 Timestamp의 인스턴스가 아니므로 false가 된다. 인스턴스 검사를 하지 않고 date가 timestamp로 형변환이 가능하다 쳐도, nanos 검사에서 false가 나올 수 밖에 없다.


## Links

* [Object(docs.oracle.com/javase/8)](https://docs.oracle.com/javase/8/docs/api/java/lang/Object.html)

* [동치 관계(Equivalence relation)](https://ko.wikipedia.org/wiki/%EB%8F%99%EC%B9%98%EA%B4%80%EA%B3%84)
* [반사 관계(Reflexive relation)](https://ko.wikipedia.org/wiki/%EB%B0%98%EC%82%AC%EA%B4%80%EA%B3%84)
* [대칭 관계(Symmetric relation)](https://ko.wikipedia.org/wiki/%EB%8C%80%EC%B9%AD%EA%B4%80%EA%B3%84)
* [추이적 관계(Transitive relation)](https://ko.wikipedia.org/wiki/%EC%B6%94%EC%9D%B4%EC%A0%81_%EA%B4%80%EA%B3%84)

* [[Effective-Java]]
