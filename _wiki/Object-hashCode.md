---
layout  : wiki
title   : java.lang.Object.hashCode 메소드
summary :
date    : 2018-03-09 18:54:19 +0900
updated : 2018-03-09 23:42:18 +0900
tags    : java 번역
toc     : true
public  : true
parent  : Java
latex   : true
---
* TOC
{:toc}

버전: Java 1.8

## 개요

```java
/**
 * Returns a hash code value for the object. This method is
 * supported for the benefit of hash tables such as those provided by
 * {@link java.util.HashMap}.
 * <p>
 * The general contract of {@code hashCode} is:
 * <ul>
 * <li>Whenever it is invoked on the same object more than once during
 *     an execution of a Java application, the {@code hashCode} method
 *     must consistently return the same integer, provided no information
 *     used in {@code equals} comparisons on the object is modified.
 *     This integer need not remain consistent from one execution of an
 *     application to another execution of the same application.
 * <li>If two objects are equal according to the {@code equals(Object)}
 *     method, then calling the {@code hashCode} method on each of
 *     the two objects must produce the same integer result.
 * <li>It is <em>not</em> required that if two objects are unequal
 *     according to the {@link java.lang.Object#equals(java.lang.Object)}
 *     method, then calling the {@code hashCode} method on each of the
 *     two objects must produce distinct integer results.  However, the
 *     programmer should be aware that producing distinct integer results
 *     for unequal objects may improve the performance of hash tables.
 * </ul>
 * <p>
 * As much as is reasonably practical, the hashCode method defined by
 * class {@code Object} does return distinct integers for distinct
 * objects. (This is typically implemented by converting the internal
 * address of the object into an integer, but this implementation
 * technique is not required by the
 * Java&trade; programming language.)
 *
 * @return  a hash code value for this object.
 * @see     java.lang.Object#equals(java.lang.Object)
 * @see     java.lang.System#identityHashCode
 */
public native int hashCode();
```

hashCode 메소드는 객체의 해시코드 값을 리턴합니다.

이 메소드는 해시 테이블(java.util.HashMap 같은)을 사용할 때의 이점을 위해 제공됩니다.

hashCode 메소드의 일반 규약은 다음과 같습니다.

1. 변경되지 않은 한 객체의 hashCode 메소드를 호출한 결과는 항상 똑같은 integer 값이어야 합니다.
    * 객체가 변경됐더라도 equals 메소드가 참고하는 정보가 변경되지 않았다면 hashCode 값은 달라지지 않습니다.
2. equals 메소드가 같다고 판별한 두 객체의 hashCode 호출 결과는 똑같은 integer 값이어야 합니다.
3. 그러나 java.lang.Object.equals 메소드가 다르다고 판별한 두 객체의 hashCode 값이 반드시 달라야 하는 것은 아닙니다.
    * 단, 같지 않은 객체들이 각기 다른 hashCode 값을 가지면 해시 테이블 성능이 향상된다는 점을 기억해두세요.

실용적인 이유로, hashCode 메소드는 다른 객체에 대해 각기 다른 integer 값을 리턴하도록 정의되었습니다. (일반적으로 객체의 내부 주소를 integer 값으로 변환하는 방식으로 구현되지만, 그러한 구현 기법은 Java(TM) 프로그래밍 언어에서는 필수적인 것은 아닙니다)

* @return this 객체의 해시코드 값
* @see java.lang.Object#equals(java.lang.Object)
* @see java.lang.System#identityHashCode

## equals와의 관계

주석을 읽어보면 hashCode 메소드가 equals와 밀접한 관련이 있음을 알 수 있다.

[[Effective-Java]]에서는 다음과 같은 규칙을 제안하고 있다.

> 규칙 9. equals를 재정의할 때는 반드시 hashCode도 재정의하라

equals를 재정의할 때, hashCode도 재정의하지 않으면, 2번 규약을 어길 수 있기 때문이다.

## hashCode 메소드 예제

### AbstractSet.java

2번 규약과 3번 규약을 읽어보면 `equals` 메소드와 `hashCode` 메소드의 관계가 다음과 같음을 알 수 있다.

|        | equals | hashCode                 |
|--------|--------|--------------------------|
| 규약 1 | true   | **같아야 한다**          |
| 규약 2 | false  | 같아도 되고, 달라도 된다 |

위의 경우는 이해하기 쉽지만, 아래의 경우는 이해하기 어렵다.

그러나 java.util.AbstractSet의 hashCode를 보면 비교적 쉽게 이해할 수 있다.

AbstractSet에 정의된 hashCode는 집합의 모든 원소의 hashCode 값의 총합이다.

따라서 다음이 가능하다.

* 두 집합이 동치이면, 해시코드도 똑같게 된다.
    * `[1, 2, 3] => 6`과 `[1, 2, 3] => 6`
* 두 집합이 동치가 아닌데도, 두 집합의 모든 원소의 해시코드 총합이 같을 수 있다.
    * `[1, 2, 3] => 6`과 `[0, 2, 4] => 6`

다음은 java.util.AbstractSet.java에 들어 있는 hashCode 메소드의 코드이다.

```java
/**
 * Returns the hash code value for this set.  The hash code of a set is
 * defined to be the sum of the hash codes of the elements in the set,
 * where the hash code of a <tt>null</tt> element is defined to be zero.
 * This ensures that <tt>s1.equals(s2)</tt> implies that
 * <tt>s1.hashCode()==s2.hashCode()</tt> for any two sets <tt>s1</tt>
 * and <tt>s2</tt>, as required by the general contract of
 * {@link Object#hashCode}.
 *
 * <p>This implementation iterates over the set, calling the
 * <tt>hashCode</tt> method on each element in the set, and adding up
 * the results.
 *
 * @return the hash code value for this set
 * @see Object#equals(Object)
 * @see Set#equals(Object)
 */
public int hashCode() {
    int h = 0;
    Iterator<E> i = iterator();
    while (i.hasNext()) {
        E obj = i.next();
        if (obj != null)
            h += obj.hashCode();    // 각 원소의 해시코드 총 합계를 구한다
    }
    return h;
}
```

hashCode 메소드는 this 집합(Set)의 해시코드 값을 리턴합니다.

한 집합의 해시 코드는 집합에 포함된 모든 원소의 해시코드 값의 합계로 정의됩니다.

만약 null 인 원소가 있다면 해당 원소의 해시코드 값은 0으로 정의합니다.

이 방법을 통해 두 집합 s1, s2가 `s1.equals(s2)`를 만족하는 관계라면 `s1.hashCode() == s2.hashCode()` 라는 것을 보장할 수 있으며, 이는 Object#hashCode의 일반 규약에서 요구하고 있는 것입니다.

이 메소드의 구현은 집합의 원소 전체를 순회하며 각각의 원소의 hashCode 메소드를 호출하여 결과에 더해가는 방식입니다.

* @return this 집합의 해시코드
* @see Object#equals(Object)
* @see Set#equals(Object)


### AbstractList.java

다음은 java.util.AbstractList.java에 들어 있는 hashCode 메소드의 코드이다.

```java
/**
 * Returns the hash code value for this list.
 *
 * <p>This implementation uses exactly the code that is used to define the
 * list hash function in the documentation for the {@link List#hashCode}
 * method.
 *
 * @return the hash code value for this list
 */
public int hashCode() {
    int hashCode = 1;
    for (E e : this)
        hashCode = 31*hashCode + (e==null ? 0 : e.hashCode());
    return hashCode;
}
```

이 메소드는 this 리스트의 해시 코드를 리턴합니다.

이 구현은 List 인터페이스의 hashCode 메소드 문서에 정의된 코드를 그대로 적용한 것입니다.

* @return this 리스트의 해시 코드

**그렇다면 List 인터페이스의 hashCode 메소드도 봐야겠지요?**

### List.java

다음은 java.util.List.java에 들어 있는 List 인터페이스의 hashCode 메소드 코드이다.

```java
/**
 * Returns the hash code value for this list.  The hash code of a list
 * is defined to be the result of the following calculation:
 * <pre>{@code
 *     int hashCode = 1;
 *     for (E e : list)
 *         hashCode = 31*hashCode + (e==null ? 0 : e.hashCode());
 * }</pre>
 * This ensures that <tt>list1.equals(list2)</tt> implies that
 * <tt>list1.hashCode()==list2.hashCode()</tt> for any two lists,
 * <tt>list1</tt> and <tt>list2</tt>, as required by the general
 * contract of {@link Object#hashCode}.
 *
 * @return the hash code value for this list
 * @see Object#equals(Object)
 * @see #equals(Object)
 */
int hashCode();
```

이 메소드는 this 리스트의 해시 코드 값을 리턴합니다.

리스트의 해시 코드는 다음 방법으로 계산하도록 정의되어 있습니다.

```java
int hashCode = 1;
for (E e : list) {
    if (e == null) {
        hashCode = 31 * hashCode + 0;
    } else {
        hashCode = 31 * hashCode + e.hashCode();
    }
}
return hashCode;
```

이 방법을 통해 두 리스트 list1, list2가 `list1.equals(list2)`를 만족하는 관계라면 `list1.hashCode() == list2.hashCode()` 라는 것을 보장할 수 있으며, 이는 Object#hashCode의 일반 규약에서 요구하고 있는 것입니다.

* @return this 리스트의 해시 코드
* @see Object#equals(Object)
* @see #equals(Object)

**그런데 왜 31을 곱하는 걸까?**

## 이상적인 해시 함수에 가까운 함수 만들기

List의 hashCode 메소드를 보면 매 단계마다 각 원소의 해시코드를 더하고 `31`을 곱하고 있다.

무슨 이유일까? List 클래스의 author가 작성한 책인 [[Effective-Java]] 규칙 9를 보면 다음과 같은 내용이 있다.

>
다행히도 이상적인 해시 함수에 '가까운' 함수를 만드는 건 별로 어렵지 않다. 아래의 지침을 따르면 된다.
<br/><br/>
1. 17과 같은 0 아닌 상수를 result라는 이름의 int 변수에 저장한다.
2. 객체 안에 있는 모든 중요 필드 f에 대해서(equals 메서드가 사용하는 필드들을 말한다) 아래의 절차를 시행한다.
    * A. 해당 필드에 대한 int 해시 코드 c를 계산한다.
        * i. 필드가 boolean이면 `(f ? 1 : 0)`을 계산한다.
        * ii. 필드가 byte, char, short, int 중 하나이면 `(int) f`를 계산한다.
        * iii. 필드가 long이면 `(int)(f ^ (f >>> 32))`를 계산한다.
        * iv. 필드가 float이면 `Float.floatToIntBits(f)`를 계산한다.
        * v. 필드가 double이면 `Double.doubleToLongBits(f)`를 계산하고 그 결과로 얻은 long 값을 위의 절차 3에 따라 해시 코드로 변환한다.
        * vi. 필드가 객체 참조이고 equals 메서드가 해당 필드의 equals 메서드를 재귀적으로 호출하는 경우에는 해당 필드의 hashCode 메서드를 제귀적으로 호출하여 해시 코드를 계산한다. 좀 더 복잡한 비교가 필요한 경우에는 해당 필드의 "대표 형태(canonical representation)"를 계산한 다음, 대표 형태에 대해 hashCode를 호출한다. 필드 값이 null인 경우에는 0을 반환한다. (다른 상수를 반환할 수도 있으나, 보통 0을 사용한다.)
        * vii. 필드가 배열인 경우에는 배열의 각 원소가 별도 필드인 것처럼 계산한다. 즉, 각각의 중요 원소에 대해서 방금 설명한 규칙들을 재귀적으로 적용해 해시 코드를 계산하고, 그 결과를 절차 2.B와 같이 결합한다. 배열 내의 모든 원소가 중요하다면 JDK 1.5 부터 제공되는 Arrays.hashCode 메소드 가운데 하나를 사용할 수도 있다.
    * B. 위의 절차 A에서 계산된 해시 코드 c를 result에 다음과 같이 결합한다.
        * `result = 31 * result + c`
3. result를 반환한다.
4. hashCode 구현이 끝났다면, 동치 관계에 있는 객체의 해시 코드 값이 똑같이 계산되는지 점검하라. 단위 테스트를 작성해서 생각대로 되는지 확인하라. 동치 관계의 객체인데 해시 코드 값이 서로 다르다면 원인을 알아내서 고쳐라.

2.B 항목을 보면 매 단계마다 `31`을 곱하라고 한다.
다음 페이지에 있는 이 부분에 대한 설명을 읽어보면 될 것 같다.

>
31은 소수이면서 홀수이기 때문에 선택된 값이다.
만일 그 값이 짝수였고 곱셈 결과가 오버플로되었다면 정보는 사라졌을 것이다.
2로 곱하는 것은 비트를 왼쪽으로 shift하는 것과 같기 때문이다.
소수를 사용하는 이점은 그다지 분명하지 않지만 전통적으로 널리 사용된다.
31의 좋은 점은 곱셈을 시프트와 뺄셈의 조합으로 바꾸면 더 좋은 성능을 낼 수 있다는 것이다(`31 * i`는 `(i << 5) - i` 와 같다).
최신 VM은 이런 최적화를 자동으로 실행한다.

오케이. `32`로 곱셈을 하게 되면 bit shift가 발생하게 되어 한쪽이 `0`으로 차게 되므로 하지 않는다는 것이다.

그리고 소수를 사용하는 이점은 분명하지 않다고 하는데, 이에 대해서는 왠지 괴델 수의 아이디어와 관련이 있지 않을까 하는 생각이 든다.



### 내 생각: 이론적으로 이상적이지만 사용 불가능한 해시 코드 함수 만들기

해시 코드는 객체에 대해 고유한 숫자를 부여하기 위한 방법이다.

그렇다면 가장 이상적인 해시 코드 생성 방법으로 괴델 수 생성 로직을 응용할 수 있을 것 같다.

아마도 다음과 같이 할 수 있을 것이다.

1. `n = 1`
2. `sum = 0`
3. `p = n번째 소수`
4. `h = 객체의 n 번째 필드의 해시 코드`
5. `result = result + p^h`
6. 모든 필드에 대해 작업을 수행하였는가?
    * `true`: result를 리턴한다.
    * `false`: `n++` 후, 1로 돌아간다.

이 방법이라면 각 필드의 해시코드가 `9283`, `5420`, `4356`, `6123`, `5729`, `3954` 인 경우, 다음과 같은 숫자가 생성된다.

$$ 2^{9283} + 3^{5420} + 5^{4356} + 7^{6123} + 11^{5729} + 13^{3954} $$

숫자가 엄청나게 크기 때문에 현실의 컴퓨터에서 사용할 수 없다는 문제점이 있긴 하지만, 이 방식의 장점은 뚜렷하다.

* 인수분해를 하면, 객체의 해시코드를 만들어내는 데에 사용한 각 필드의 순서와 정확한 해시코드 자연수를 알아낼 수 있다.
* 자연수와 소수는 무한하므로, 아무리 큰 객체나 집합이라 하더라도 하나의 (큰)숫자로 표현 가능하다.

## Links

* [Object(docs.oracle.com/javase/8)](https://docs.oracle.com/javase/8/docs/api/java/lang/Object.html)
* [[Effective-Java]]
