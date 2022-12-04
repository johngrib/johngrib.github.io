---
layout  : wiki
title   : 이진 탐색 (Binary Search)
summary : 
date    : 2022-10-01 23:12:37 +0900
updated : 2022-11-20 13:55:12 +0900
tag     : 
resource: 5F/C17323-ABF2-4011-B272-A9B7D27BB269
toc     : true
public  : true
parent  : [[/algorithm]]
latex   : true
---
* TOC
{:toc}

$$
\def\ceil#1{\lceil #1 \rceil}
\def\floor#1{\lfloor #1 \rfloor}
$$

## 역사

>
이진 검색은 모클리<sup>John Mauchly</sup>가 처음으로 언급했는데, 비수치적 프로그래밍 방법에 대한 출판된 논의로는 아마도 그것이 최초일 것이다.[^taocp-6-2-1-484-book1]
그런데 그 방법이 프로그래머들 사이에서 널리 알려지긴 했지만, $$N$$ 이 $$ 2^n - 1 $$ 이라는 특별한 형태가 아닐 때 구체적으로 어떻게 적용되는지는 아무도 밝혀내지 못한 것으로 보인다.[^taocp-6-2-1-484-book2]
>
모든 $$N$$에 대해 작동하는 이진 검색 알고리즘을 처음으로 출판한 이는 레머<sup>D. H. Lehmer</sup>[^taocp-6-2-1-485-book1]임이 명백하다.
그 다음의 진보를 이룬 사람은 보텐부르흐<sup>H. Bottenbruch</sup>[^taocp-6-2-1-485-book2]로, 그는 공정의 끝에 도달하기 전까지는 상등을 개별적으로 판정할 필요가 없는, 알고리즘 B의 흥미로운 변형을 제시했다.
>
(중략)
>
아이버슨<sup>K. E. Iverson</sup>은 알고리즘 B의 절차를 제시했으나 검색이 실패하는 경우는 고려하지 않았다.[^taocp-6-2-1-485-book3]
커누스<sup>D. E. Knuth</sup>는 자동화된 흐름도 작성 시스템에 쓰이는 한 예로 알고리즘 B를 설명했다.
균등 이진 검색(알고리즘 C)는 1971년에 Stanford University의 찬드라<sup>A. K. Chandra</sup>가 필자[^d-k]에게 제안한 것이다.
>
-- TAOCP 3권. 6.2.1. 485쪽.

## 개요

>
정렬된 집합에서 원하는 원소를 찾아내는 알고리즘으로서, 매우 효율적이고, 메모리나 디스크상에서 사용될 수 있다.
유일한 단점은 전체의 집합을 미리 알고 있어야 하며 탐색에 앞서 이미 정렬된 상태여야 한다는 점이다.
많은 애플리케이션에서 이 간단한 알고리즘에 기반한 방법을 사용한다.
>
-- 생각하는 프로그래밍. 2장. 43쪽.

<span/>


## mid 값을 계산할 때 오버플로우를 주의할 것

>
이진 검색은 간단하면서도 부정확하게 구현하기가 아주 쉽다는 점에서 훌륭한 예제가 된다.
Programming Pearls에 나와 있는 이야기인데, 벤틀리는 수년간 수백 명의 전문 프로그래머들 에게 기본적인 알고리즘 설명을 제시한 후 이진 검색을 구현해 보도록 요청했다.
언어에 대한 제약은 없었다. 원한다면 임의의 고수준 언어(의사코드도 포함해서)를 사용할 수도 있었다.
그 결과, 놀랍게도 전문 프로그래머들 중 단 10퍼센트만이 이진 검색을 정확하게 구현했다고 한다.
>
더욱 놀랍게도, Sorting and Searchingt에서 커누스<sup>Donald Knuth</sup>는 이진 검색이 처음 발표된 것은 1946년이었으나 버그가 없는 최초의 이진 검색이 발표되기까지는 12년 이상이 걸렸다고 지적하고 있다.
>
그러나 가장 놀라운 일은, 수천 회 이상 구현되고 적용되었으리라 가정할 수 있는 벤틀리의 공식적인, 그리고 증명된 알고리즘조차도, 구현 언어가 고정 정밀도 산술을 채용하고 있으며 주어진 배열이 충분히 큰 상황에서는 문제를 노출한다는 것이다.
>
Java에서는 이 버그 때문에 `ArrayIndexOutOfBoundsException` 예외가 던져진다.
그리고 C에서는 배열 색인이 경계를 넘어서 예측할 수 없는 결과가 나타난다.
이 최신의 버그는 블로흐<sup>Joshua Bloch</sup>의 블로그에 잘 설명되어 있다.[^bloch-blog]
>
-- Beautiful Code. 7장. 134쪽.

다음은 위의 인용문에 등장하는 조슈아 블로흐가 블로그에 소개한 문제를 약간 수정한 코드이다.

```java
public static int binarySearch(int[] a, int key) {
   int low = 0;
   int high = a.length - 1;

   while (low <= high) {
       int mid = (low + high) / 2;  // int 오버플로우 위험
       int midVal = a[mid];

       if (midVal < key)
           low = mid + 1
       else if (midVal > key)
           high = mid - 1;
       else
           return mid; // key found
    }
    return -(low + 1);  // key not found.
}
```

오버플로우 위험을 표시해둔 주석에 주목하자.

`low`와 `high`의 합이 `Integer.MAX_VALUE`, 즉 $$2^{31} - 1$$보다 크면 오버플로우가 발생해 `mid`가 음수가 되는 버그가 발생한다는 것.

이에 대해 두 가지 해결 방법이 제시된다.

- 방법1. 뺄셈을 사용하기

```java
int mid = low + ((high - low) / 2);
```

- 방법 2. 부호 없는 비트 시프트 사용 ([Java 공식 버그 리포트][JDK-5045582] 권장사항)

```java
int mid = (low + high) >>> 1;
```

## Java의 Arrays.binarySearch() 메소드

- java.util.Arrays 에는 다양한 타입 맞게 오버로딩된 `binarySearch()` 메소드가 있다.

```java
public static <T> int binarySearch(T[] a, T key, Comparator<? super T> c) {
public static <T> int binarySearch(T[] a, int fromIndex, int toIndex, T key, Comparator<? super T> c) {
private static <T> int binarySearch0(T[] a, int fromIndex, int toIndex, T key, Comparator<? super T> c) {

public static int binarySearch(Object[] a, Object key) {
public static int binarySearch(Object[] a, int fromIndex, int toIndex, Object key) {
private static int binarySearch0(Object[] a, int fromIndex, int toIndex, Object key) {

public static int binarySearch(byte[] a, byte key) {
public static int binarySearch(byte[] a, int fromIndex, int toIndex, byte key) {
private static int binarySearch0(byte[] a, int fromIndex, int toIndex, byte key) {

public static int binarySearch(char[] a, char key) {
public static int binarySearch(char[] a, int fromIndex, int toIndex, char key) {
private static int binarySearch0(char[] a, int fromIndex, int toIndex, char key) {

public static int binarySearch(double[] a, double key) {
public static int binarySearch(double[] a, int fromIndex, int toIndex, double key) {
private static int binarySearch0(double[] a, int fromIndex, int toIndex, double key) {

public static int binarySearch(float[] a, float key) {
public static int binarySearch(float[] a, int fromIndex, int toIndex, float key) {
private static int binarySearch0(float[] a, int fromIndex, int toIndex, float key) {

public static int binarySearch(int[] a, int fromIndex, int toIndex, int key) {
public static int binarySearch(int[] a, int key) {
private static int binarySearch0(int[] a, int fromIndex, int toIndex, int key) {

public static int binarySearch(long[] a, int fromIndex, int toIndex, long key) {
public static int binarySearch(long[] a, long key) {
private static int binarySearch0(long[] a, int fromIndex, int toIndex, long key) {

public static int binarySearch(short[] a, int fromIndex, int toIndex, short key) {
public static int binarySearch(short[] a, short key) {
private static int binarySearch0(short[] a, int fromIndex, int toIndex, short key) {
```

다음은 JDK 17 Arrays.binarySearch 중 하나이다.

[jdk-17+35 java.util.Arrays.binarySearch - long]( https://github.com/openjdk/jdk/blob/jdk-17+35/src/java.base/share/classes/java/util/Arrays.java#L1558-L1579 )

```java
/**
 * Searches the specified array of longs for the specified value using the
 * binary search algorithm.  The array must be sorted (as
 * by the {@link #sort(long[])} method) prior to making this call.  If it
 * is not sorted, the results are undefined.  If the array contains
 * multiple elements with the specified value, there is no guarantee which
 * one will be found.
 *
 * @param a the array to be searched
 * @param key the value to be searched for
 * @return index of the search key, if it is contained in the array;
 *         otherwise, <code>(-(<i>insertion point</i>) - 1)</code>.  The
 *         <i>insertion point</i> is defined as the point at which the
 *         key would be inserted into the array: the index of the first
 *         element greater than the key, or {@code a.length} if all
 *         elements in the array are less than the specified key.  Note
 *         that this guarantees that the return value will be &gt;= 0 if
 *         and only if the key is found.
 */
public static int binarySearch(long[] a, long key) {
    return binarySearch0(a, 0, a.length, key);
}
```

다음은 JavaDoc을 번역한 것이다.

>
이진탐색 알고리즘을 사용해 주어진 long 배열에서 주어진 value를 찾습니다.
주어지는 배열은 이 메소드를 호출하기 전에 (`sort()` 메소드 등을 통해)반드시 정렬되어 있어야 합니다.
정렬되지 않은 배열에 대한 결과는 정의되어 있지 않습니다.
만약 배열에 주어진 value가 여럿 들어있다면, 그 중 어떤 것을 찾게 될 지는 보장할 수 없습니다.
>
> - @param a : 탐색할 배열
> - @param key : 찾을 값
> - @return : 찾아낸 값의 인덱스. 찾지 못했다면 `-1`.


실제 정렬은 `binarySearch0`에서 수행된다.

[jdk-17+35 java.util.Arrays.binarySearch0 - long]( https://github.com/openjdk/jdk/blob/jdk-17+35/src/java.base/share/classes/java/util/Arrays.java#L1619-L1637 )

```java
// Like public version, but without range checks.
private static int binarySearch0(long[] a, int fromIndex, int toIndex,
                                 long key) {
    int low = fromIndex;
    int high = toIndex - 1;

    while (low <= high) {
        int mid = (low + high) >>> 1;
        long midVal = a[mid];

        if (midVal < key)
            low = mid + 1;
        else if (midVal > key)
            high = mid - 1;
        else
            return mid; // key found
    }
    return -(low + 1);  // key not found.
}
```

- `double` 타입에 대해서는 `Double.doubleToLongBits`를 사용하고 있다는 점에 주목.
    - (`float` 타입에 대해서는 `Float.floatToIntBits`을 사용한다.)

[jdk-17+35 java.util.Arrays.binarySearch0 ]( https://github.com/openjdk/jdk/blob/jdk-17+35/src/java.base/share/classes/java/util/Arrays.java#L2026-L2052 )

```java
// Like public version, but without range checks.
private static int binarySearch0(double[] a, int fromIndex, int toIndex,
                                 double key) {
    int low = fromIndex;
    int high = toIndex - 1;

    while (low <= high) {
        int mid = (low + high) >>> 1;
        double midVal = a[mid];

        if (midVal < key)
            low = mid + 1;  // Neither val is NaN, thisVal is smaller
        else if (midVal > key)
            high = mid - 1; // Neither val is NaN, thisVal is larger
        else {
            long midBits = Double.doubleToLongBits(midVal);  // 여기
            long keyBits = Double.doubleToLongBits(key);
            if (midBits == keyBits)     // Values are equal
                return mid;             // Key found
            else if (midBits < keyBits) // (-0.0, 0.0) or (!NaN, NaN)
                low = mid + 1;
            else                        // (0.0, -0.0) or (NaN, !NaN)
                high = mid - 1;
        }
    }
    return -(low + 1);  // key not found.
}
```

- 제네릭을 사용한 `T[]` 타입에서는 `Comparator`를 쓰기 때문에 `compare` 메소드를 호출한다.

[jdk-17+35 java.util.Arrays.binarySearch0 ]( https://github.com/openjdk/jdk/blob/jdk-17+35/src/java.base/share/classes/java/util/Arrays.java#L2328-L2349 )

```java
// Like public version, but without range checks.
private static <T> int binarySearch0(T[] a, int fromIndex, int toIndex,
                                     T key, Comparator<? super T> c) {
    if (c == null) {
        return binarySearch0(a, fromIndex, toIndex, key);
    }
    int low = fromIndex;
    int high = toIndex - 1;

    while (low <= high) {
        int mid = (low + high) >>> 1;
        T midVal = a[mid];
        int cmp = c.compare(midVal, key);   // 여기
        if (cmp < 0)
            low = mid + 1;
        else if (cmp > 0)
            high = mid - 1;
        else
            return mid; // key found
    }
    return -(low + 1);  // key not found.
}
```

## 함께 읽기

- [Extra, Extra - Read All About It: Nearly All Binary Searches and Mergesorts are Broken]( https://ai.googleblog.com/2006/06/extra-extra-read-all-about-it-nearly.html ) - Joshua Bloch의 2006년 블로그 글.
- [JDK-5045582 : (coll) binarySearch() fails for size larger than `1<<30`][JDK-5045582]
- [[/clojure/guide/comparators]]

## 참고문헌

- The art of computer programming 3 정렬과 검색(개정2판) / 도널드 커누스 저 / 한빛미디어 / 초판 발행 2008년 01월 28일
- 생각하는 프로그래밍 / 존 벤틀리 저 / 윤성준, 조상민 공역 / 인사이트(insight) / 초판 6쇄 발행 2007년 07월 20일

## 주석

[^taocp-6-2-1-484-book1]: [Theory and Techniques for the Design of Electronic Digital Computers, G. W. Patterson 엮음, 1 (1946), 9.7-9.8; 3 (1946), 22.8-22.9].
[^taocp-6-2-1-484-book2]: [A . D. Booth, Nature 176 (1955), 565; A. I. Dumey, computers and Automation 5 (1956년 12월), 7, 여기서는 이진 검색을 "Twenty Questions(스무고개)"라고 부름; Daniel D. McCrachen, Digital Computer Programming (Wiley, 1957), 201-203; M. Halpern, CACM 1, (1958년 2월), 1-3을 볼 것.].
[^taocp-6-2-1-485-book1]: [Proc. Symp. Appl. Math. 10 (1960), 180-181]
[^taocp-6-2-1-485-book2]: [JACM 9 (1962), 214]
[^taocp-6-2-1-485-book3]: [A Programming Language (Wiley, 1962), 141]
[^d-k]: 도널드 커누스

[^bloch-blog]: [Extra, Extra - Read All About It: Nearly All Binary Searches and Mergesorts are Broken]( https://ai.googleblog.com/2006/06/extra-extra-read-all-about-it-nearly.html )

[JDK-5045582]: https://bugs.java.com/bugdatabase/view_bug.do?bug_id=5045582
