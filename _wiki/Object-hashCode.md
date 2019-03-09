---
layout  : wiki
title   : java.lang.Object.hashCode 메소드
summary :
date    : 2018-03-09 18:54:19 +0900
updated : 2018-03-10 18:45:35 +0900
tag     : java 번역 소수
toc     : true
public  : true
parent  : Java
latex   : true
---
* TOC
{:toc}

버전: Java 1.8

## 원문

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

## 번역

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

#### 번역

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

#### 번역

이 메소드는 this 리스트의 해시 코드를 리턴합니다.

이 구현은 List 인터페이스의 hashCode 메소드 문서에 정의된 코드를 그대로 적용한 것입니다.

* @return this 리스트의 해시 코드

**그렇다면 List 인터페이스의 hashCode 메소드도 찾아봐야겠다.**

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

#### 번역

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

**매직 넘버 `31`이 인상적이다.**

## 그런데 왜 31을 곱하는 걸까?

### Effective Java - 이상적인 해시 함수에 가까운 함수 만들기

List의 hashCode 메소드를 보면 매 단계마다 각 원소의 해시코드를 더하고 `31`을 곱하고 있다.

무슨 이유일까? List 클래스 author인 Joshua Bloch가 쓴 책인 [[Effective-Java]] 규칙 9를 보면 다음과 같은 내용이 있다.

>
다행히도 이상적인 해시 함수에 '가까운' 함수를 만드는 건 별로 어렵지 않다. 아래의 지침을 따르면 된다.
<br/>
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
**31은 소수이면서 홀수이기 때문에 선택된 값이다.**
만일 그 값이 짝수였고 곱셈 결과가 오버플로되었다면 정보는 사라졌을 것이다.
2로 곱하는 것은 비트를 왼쪽으로 shift하는 것과 같기 때문이다.
**소수를 사용하는 이점은 그다지 분명하지 않지만 전통적으로 널리 사용된다.**
31의 좋은 점은 곱셈을 시프트와 뺄셈의 조합으로 바꾸면 더 좋은 성능을 낼 수 있다는 것이다(`31 * i`는 `(i << 5) - i` 와 같다).
최신 VM은 이런 최적화를 자동으로 실행한다.

오케이. `32`로 곱셈을 하게 되면 bit shift가 발생하게 되어 한쪽이 `0`으로 차게 되므로 하지 않는다는 것이다.

그러나 소수를 사용하는 이점은 분명하지 않으며, 관행이라고만 언급하고 있다.





### 해시 코드 생성에 소수를 사용하는 이유

어째서 소수를 이용하는 걸까?

해시 테이블에서 값을 넣고 뺄 때 사용할 해시 버킷을 선택하는 문제에 소수를 쓴다면 바로 이해할 수 있을 것 같다.
매미가 17년이나 땅 속에서 사는 것과 같은 이유로 추측할 수 있기 때문이다.
그러나 문제는 해시 코드 생성에 소수를 사용하는 이유이다.

인터넷을 뒤지다 다음 글을 찾을 수 있었다.

[Why MULT 31 (hash function for string)?](https://bytes.com/topic/c/answers/537762-why-mult-31-hash-function-string)

답변들 중 Eric Sosman의 답변이 설득력이 있어 다음과 같이 발췌하였다.

>
It's a mixture of superstition and good sense.
<br/><br/>
First, the superstition: People who write code having to do with hash tables apparently recall that prime numbers are particularly "good" for them.
It seems they don't always remember just what the "goodness" was or in what connection, but they'll throw prime numbers into the mix whenever they can.
They'll throw in prime numbers even if they're not too sure what a prime number is! A colleague of mine once ran across this little coding gem:
<br/><br/>
#define HASHSIZE 51 /* a smallish prime */
<br/><br/>
Second, the good sense: Suppose MULT were 26, and consider hashing a hundred-character string.
How much influence does the string's first character have on the final value of 'h', just before the mod operation?
The first character's value will have been multiplied by MULT 99 times,
so if the arithmetic were done in infinite precision the value would consist of some jumble of bits followed by 99 low-order zero bits -- each time you multiply by MULT you introduce another low-order zero, right?
The computer's finite arithmetic just chops away all the excess high-order bits, so the first character's actual contribution to 'h' is ... precisely zero!
The 'h' value depends only on the rightmost 32 string characters (assuming a 32-bit int), and even then things are not wonderful:
the first of those final 32 bytes influences only the leftmost bit of 'h' and has no effect on the remaining 31.
Clearly, an even-valued MULT is a poor idea.

내용을 요약하자면 다음과 같다.

31을 사용하는 데에는 나쁜 이유와 좋은 이유가 섞여 있다.

* 나쁜 이유는, **소수에 대한 미신**이다.
    * 알고리즘 작성에 소수가 도움이 될 거라는 맹신이 있다.
    * 아무 생각 없이 소수를 가져다 쓰는 사람들이 있다.
    * `51`을 써놓고 `/* a smallish prime */` 이라는 주석을 붙인 코드를 본 적도 있었다.
<br/><br/>
* 좋은 이유는, `MULT` 값으로 **짝수를 피해야 하기 때문**이다.
    * 짝수를 사용하면 해시코드를 계산할 때 `MULT`를 곱해가므로 비트의 오른쪽이 `0`으로 가득찬 결과가 나온다.
    * 가령, `100`글자 문자열의 해시코드를 구하게 되면 오른쪽에 `0`이 `99`개 붙은 결과가 나오는 것이다.
    * 따라서 홀수를 사용해야 한다.

홀수를 사용해야 하는데, 소수에 대한 맹신이 합쳐져 적당한 크기의 소수인 31이 사용되고 있다는 것.

일리 있다. 그러나 공식 레퍼런스가 근거로 달려 있지 않다는 점이 아쉽다.



#### CLRS 책의 "나누기 방법"

이왕 하는 김에 CLRS 책의 11. 해시 테이블 챕터를 찾아보았다.

소수에 대한 언급은 많았던 반면, 31이라는 매직 넘버에 대한 언급은 없었다.

다음은 CLRS 책의 11.3.1 나누기 방법에서 발췌한 것이다.

>
해시 함수를 만드는 *나누기 방법* 에서 키 $$k$$는 $$k$$를 $$m$$으로 나눈 나머지를 취함으로써 $$m$$ 개의 자리 중 하나로 위치를 결정한다.  
즉, 해시 함수는 $$h(k) = k \pmod m$$ 이다.  
예를 들어, 해시 테이블의 크기가 $$m = 12$$를 가지고 키가 $$k = 100$$ 일 때, $$h(k) = 4$$다.
단지 하나의 나누기 연산만 필요하기 때문에 나누기 방법에 의한 해싱은 매우 빠르다.
<br/><br/>
나누기 방법을 사용할 때 $$m$$이 특정 값을 갖는 것을 피하도록 선택한다.
예를 들어, $$m = 2^p$$이라면 $$h(k)$$는 $$k$$에서 가장 낮은 $$p$$비트로 이루어진 수기 때문에 $$m$$이 2의 지수승이 되는 것을 피하도록 한다.
모든 낮은 자리 $$p$$ 비트 패턴이 같은 확률로 나타나지 않는다면 키의 모든 비트를 사용하는 해시 함수를 만드는 것이 좋다.
연습문제 11.3-3과 같이 $$k$$가 $$2^p$$ 기수법으로 표현된 문자열일 때 $$m = 2^p - 1$$을 선택하는 것은 좋지 않은 선택이 된다.
이것은 $$k$$의 문자 순서를 섞는 것이 해시값을 변경하지 못하기 때문이다.
<br/><br/>
$$m$$은 2의 지수승 값에 근접하지 않은 **소수**를 택하는 것이 좋다.
예를 들어, $$ n = 2000 $$ 개의 문자열을 다루고 체이닝에 의해 충돌이 해결되는 해시 테이블을 할당하려 한다고 하자.
여기서 문자 하나는 8비트를 사용한다. 해시 테이블의 크기로 좋은 예는 $$m = 701$$이다.
이렇게 하면 실패하는 검색의 경우 평균 3개의 원소를 조사하게 되지만 개의치 않기로 한다. $$2000/3$$에 근접한 소수고 2의 지수승 값에 근접하지 않았기 때문에 701을 선택할 수 있었다.

위의 내용을 요약하자면 다음과 같다.

**나누기 방법의 해시 함수는 `key % m`과 같이 나머지를 구하는 방식이다.**

* 가령, 해시 테이블 크기 `m = 12`이고, `key = 100`이라면 해시 코드는 `100 % 12`로 `4`가 된다.

**나누기 방법을 사용할 때, 해시 테이블의 크기 `m`이 피해야 하는 값이 있다.**

* `m`이 2의 `p`제곱인 숫자가 되지 않도록 한다.
    * `key`의 가장 오른쪽 `p` 개의 비트만을 취하게 되므로 피하는 것이 좋다.
    * 왜냐하면, 키 값의 모든 비트를 활용하는 쪽이 더 균등하게 퍼진 해시 값을 만들어 내는 데에 도움이 될 것이기 때문이다.
    * 오른쪽 비트들이 모두 같고 왼쪽 비트들만 다른 값이 들어오는 경우가 있을 수 있기 때문이다.

* `key`가 2의 거듭제곱 기수법으로 표현된 문자열일 때(2진법, 8진법, 16진법...), `m`이 `2^p - 1`이 되지 않도록 한다.
    * 이런 상황에서는 모든 키 값이 같은 해시값을 갖게 되기 때문이다.

**`m` 값으로는 2의 거듭제곱 값과 어느 정도 거리가 있는 소수를 선택하자.**

* 해시 테이블에 집어넣을 아이템이 `2000`개이고, 해시 충돌은 링크드 리스트로 해결한다고 하자.
* 이 해시 테이블의 크기 `m`은 `701`이 적절한 것 같다.
* `701`은 소수이다.
* `2000 / 701 = 2.853..` 이므로 각 해시 버킷의 리스트 최대 길이는 `3`이 된다.
    * 해시 충돌로 루프를 돌며 선형 검색을 한다고 해도 `3`개만 검사하면 된다는 것이다.

이것도 잘 읽어보면 적당한 홀수 값을 선택하면 될 것 같은데, 굳이 소수를 선택하는 것 같다.

그런데 이걸 보다가 java.util.HashMap의 구현이 궁금해서 클래스를 열어보았는데,
java.util.HashMap은 나누기 방법을 좀 다른 방식으로 사용한다는 것을 알게 되었다.




## java.util.HashMap

다음은 java.util.HashMap의 put 메소드가 호출하는 putVal 메소드의 앞부분이다.

```java
final V putVal(int hash, K key, V value, boolean onlyIfAbsent, boolean evict) {
    Node<K,V>[] tab; Node<K,V> p;
    int n, i;
    if ((tab = table) == null || (n = tab.length) == 0)
        n = (tab = resize()).length;
    if ((p = tab[i = (n - 1) & hash]) == null)
        tab[i] = newNode(hash, key, value, null);
    else {
    /* 이후 생략*/
}
```

`n = (tab = resize()).length`로 해시 테이블의 사이즈 `n`을 구한 다음,
`i = (n - 1) & hash` 비트 연산으로 빠르게 나머지를 구해 해시 버킷 `i`를 결정하고 있다.

테이블 사이즈를 구하는 메소드는 다음과 같다.

```java
static final int MAXIMUM_CAPACITY = 1 << 30;    // 2의 30 제곱

static final int tableSizeFor(int cap) {
    int n = cap - 1;
    n |= n >>> 1;
    n |= n >>> 2;
    n |= n >>> 4;
    n |= n >>> 8;
    n |= n >>> 16;
    return (n < 0) ? 1 : (n >= MAXIMUM_CAPACITY) ? MAXIMUM_CAPACITY : n + 1;
}
```

비트 연산이 들어가서 좀 헷갈리긴 하지만, 잘 살펴보면 `cap`보다 큰 가장 작은 2의 제곱수를 구하는 메소드이다.

예를 들어 `55`를 넣으면 `64`가 나오고, `3172`를 넣으면 `4096`이 나오는 메소드라 할 수 있다.

테이블 사이즈인 `n` 값은 2의 제곱수이므로, `(n-1) & hash`는 그냥 나머지를 구하는 연산이란 것을 알 수 있다.

즉, java.util.HashMap은 CLRS의 나누기 방법을 사용하고 있다.

그런 한편으로는 테이블 사이즈로 CLRS에서 추천하는 방법은 아니라고 했던 2의 거듭제곱을 쓰고 있다.

하지만 `hash`메소드를 읽어보면, 가장 하위 비트가 아니라 가장 상위 비트 16개를 사용하고 있다.

```java
static final int hash(Object key) {
    int h;
    return (key == null) ? 0 : (h = key.hashCode()) ^ (h >>> 16);
}
```

즉 CLRS에서 언급한 문제인 해시코드의 가장 하위 비트가 아니라 상위 비트를 사용하고 있으므로 성급하게 판단할 필요는 없을 것 같다.




## Project Lombok의 hashCode 메소드 자동 구현

Lombok의 `@EqualsAndHashCode`를 사용하면 `equals`와 `hashCode` 메소드를 자동으로 만들어준다.

그런데 롬복은 `31`이 아니라 다른 소수를 사용하고 있다는 것을 알게 되었다.

다음은 롬복 홈페이지에서 복사해 온 코드이다.

```java
import lombok.EqualsAndHashCode;

// id와 shape를 제외한 나머지 필드를 참조하는 equals와 hashCode 생성
@EqualsAndHashCode(exclude={"id", "shape"})
public class EqualsAndHashCodeExample {
    private transient int transientVar = 10;
    private String name;
    private double score;
    private Shape shape = new Square(5, 10);
    private String[] tags;
    private int id;

    public String getName() {
        return this.name;
    }

    @EqualsAndHashCode(callSuper=true)
    public static class Square extends Shape {
        private final int width, height;

        public Square(int width, int height) {
            this.width = width;
            this.height = height;
        }
    }
}
```

위와 같이 `@EqualsAndHashCode` 어노테이션을 사용하면 다음과 같은 메소드가 자동생성된다.

```java
@Override public boolean equals(Object o) {
    if (o == this)
        return true;
    if (!(o instanceof EqualsAndHashCodeExample))
        return false;
    EqualsAndHashCodeExample other = (EqualsAndHashCodeExample) o;
    if (!other.canEqual((Object)this))
        return false;
    if (this.getName() == null ? other.getName() != null : !this.getName().equals(other.getName()))
        return false;
    if (Double.compare(this.score, other.score) != 0)
        return false;
    if (!Arrays.deepEquals(this.tags, other.tags))
        return false;
    return true;
}

@Override public int hashCode() {
    final int PRIME = 59;   // Lombok은 31이 아니라 조금 더 큰 소수인 59를 쓰고 있다
    int result = 1;
    final long temp1 = Double.doubleToLongBits(this.score);
    result = (result * PRIME) + (this.name == null ? 43 : this.name.hashCode());
    result = (result * PRIME) + (int)(temp1 ^ (temp1 >>> 32));
    result = (result * PRIME) + Arrays.deepHashCode(this.tags);
    return result;
}
```

이 예제를 보면 Lombok의 hashCode 메소드는 `31`이 아니라 `59`를 사용하고 있다.

궁금해서 찾아보니 HandlerUtil 클래스 [primeForHashcode 메소드](https://github.com/rzwitserloot/lombok/blob/760a4ec0d35f80bb7aa7089753643ba4c298d62b/src/core/lombok/core/handlers/HandlerUtil.java#L61)에 상수로 작성되어 있다.

```java
public static int primeForHashcode() {
    return 59;
}
```

그리고 HandleEqualsAndHashCode 클래스 [createHashCode 메소드](https://github.com/rzwitserloot/lombok/blob/045638ec1f79f68747f135061d2e026faa719642/src/core/lombok/javac/handlers/HandleEqualsAndHashCode.java#L262)
에서 이를 사용하고 있는 것을 보면, hashCode 메소드 생성에 `59`를 사용하고 있는 것이 맞는 것 같다.

좀 더 뒤져보니 [관련 commit](https://github.com/rzwitserloot/lombok/commit/14cc54527663018cdf7343eefffc8c37fbce93bb#diff-01082d42a593f828cc90164b842e96ddR31)도 찾을 수 있었다.

`59`가 사용된 것은 `v.1.16.20`부터이며
[diff를 보면](https://github.com/rzwitserloot/lombok/commit/14cc54527663018cdf7343eefffc8c37fbce93bb#diff-01082d42a593f828cc90164b842e96ddL30) 본래 `59`가 아니라 `277`을 사용하고 있었다는 것도 알 수 있다.

```java
public static final int PRIME_FOR_HASHCODE = 277;
```

[changelog를 보면](https://github.com/rzwitserloot/lombok/commit/14cc54527663018cdf7343eefffc8c37fbce93bb#diff-ac92d0caf5382ec198bbb28bd2ed7e33R6)
해시 코드 생성에 `277`을 쓰고 있었지만 `127`보다 작은 소수를 쓰기로 결정한 것으로 보인다.

```markdown
### v1.12.5 "Edgy Guinea Pig"
* DETAIL: {Delombok} Inside enum bodies the delombok formatter didn't respect the emptyLines directive [Issue #529](https://code.google.com/p/projectlombok/issues/detail?id=629).
* DETAIL: Use smaller primes (<127) for generating hashcodes [Issue #625](https://code.google.com/p/projectlombok/issues/detail?id=625)
```

안타깝게도 changelog의 링크는 모두 깨져 있었다.

그러나 31이 아닌 다른 소수를 사용하고 있어 31이 절대적인 숫자가 아니라는 것은 확인한 느낌이다.




## 내 생각: 고유한 숫자를 부여하기

소수를 사용하는 이점에 대해서는 왠지 괴델 수의 아이디어도 함께 생각해볼 만한 가치가 있지 않을까 하는 생각이 든다.

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

숫자가 엄청나게 크기 때문에 현실의 컴퓨터에서 사용할 수 없다는 문제점이 있긴 하지만, 이 방식의 장점은 다음과 같다.

* 인수분해를 하면, 객체의 해시코드를 만들어내는 데에 사용한 각 필드의 정확한 해시코드 자연수와 순서를 알아낼 수 있다.
* 자연수와 소수는 무한하므로, 아무리 큰 객체나 집합이라 하더라도 하나의 (큰)숫자로 표현 가능하다.


## Links

* [Object(docs.oracle.com/javase/8)](https://docs.oracle.com/javase/8/docs/api/java/lang/Object.html)
* [[Effective-Java]]
* [Why MULT 31 (hash function for string)?](https://bytes.com/topic/c/answers/537762-why-mult-31-hash-function-string)

* Lombok
    * [@EqualsAndHashCode](https://projectlombok.org/features/EqualsAndHashCode)
    * [Issue 625: use (even) better primes for hashcodes](https://github.com/rzwitserloot/lombok/commit/14cc54527663018cdf7343eefffc8c37fbce93bb#diff-01082d42a593f828cc90164b842e96ddR31)
