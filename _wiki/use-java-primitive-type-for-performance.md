---
layout  : wiki
title   : Java Autoboxing 자동 변환 주의점
summary : Long, Integer보다 primitive 타입을 쓰는 쪽이 훨씬 빠르다
date    : 2018-03-04 13:47:40 +0900
updated : 2018-03-05 16:22:11 +0900
tag     : java tip performance
toc     : true
public  : true
parent  : Java
latex   : false
---
* TOC
{:toc}

## 개요

다음과 같은 테스트 코드를 작성하고 돌려 보았다.

```java
import org.junit.Test;

public class LongObjectConstructionTest {

    @Test
    public void objectLongIntegerTest() {

        // 결과값에 Long, 루프 카운터에 Integer 사용
        Long result = 0L;
        for (Integer i = 0; i < Integer.MAX_VALUE; i++) {
            result += i * 2;
        }
    }

    @Test
    public void objectLongTest() {

        // 결과값에 Long 사용, 루프 카운터에 primitive int 사용
        Long result = 0L;
        for (int i = 0; i < Integer.MAX_VALUE; i++) {
            result += i * 2;
        }
    }

    @Test
    public void primitiveTest() {

        // 둘 다 primitive long, int 사용
        long result = 0L;
        for (int i = 0; i < Integer.MAX_VALUE; i++) {
            result += i * 2;
        }
    }
}
```

총 3 번 돌려 보았고 결과는 다음과 같았다.

| 테스트                  | 1차 결과      | 2차 결과    | 3차 결과    |
| ----------------------- | ------------: | ----------: | ----------: |
| objectLongIntegerTest   | 11,510 ms     | 11,393 ms   | 11,492 ms   |
| objectLongTest          | 6,905 ms      | 7,007 ms    | 6,918 ms    |
| primitiveTest           | 704 ms        | 710 ms      | 708 ms      |

* Long에 long을 더할 떄 새로운 Long 객체가 생성되기 때문에 속도 차이가 발생한다.
* Integer와 int도 마찬가지.

## 레퍼런스 문서도 찾아보자

Java Documentation에서 [Autoboxing](https://docs.oracle.com/javase/8/docs/technotes/guides/language/autoboxing.html )을 찾아보니 다음과 같은 예제 코드가 있었다.

```java
// List adapter for primitive int array
public static List<Integer> asList(final int[] a) {
    return new AbstractList<Integer>() {

        public Integer get(int i) {
            return a[i];
        }

        // Throws NullPointerException if val == null
        public Integer set(int i, Integer val) {
            Integer oldVal = a[i];  // Boxing 발생
            a[i] = val;             // UnBoxing 발생
            return oldVal;
        }

        public int size() {
            return a.length;
        }
    };
}
```

그리고 다음과 같은 설명이 있었다.

>
The performance of the resulting list is likely to be poor,
as it boxes or unboxes on every get or set operation.
It is plenty fast enough for occasional use, but it would be folly to use it in a performance critical inner loop.
<br/><br/>
So when should you use autoboxing and unboxing?
Use them only when there is an "impedance mismatch" between reference types and primitives,
for example, when you have to put numerical values into a collection.
It is not appropriate to use autoboxing and unboxing for scientific computing, or other performance-sensitive numerical code.
An Integer is not a substitute for an int; autoboxing and unboxing blur the distinction between primitive types and reference types,
but they do not eliminate it.

간단하게 번역해 요약해보자면 다음과 같은 내용이다.

>
위 코드의 퍼포먼스는 썩 좋지 않은 편입니다.
모든 get / set 작업에서 박싱과 언박싱이 일어나고 있기 때문이죠.
가끔 중요하지 않은 부분에 쓰기에는 충분한 속도이겠지만, 퍼포먼스가 중요한 루프에서 이런 방식을 쓰는 건 멍청한 일입니다.
<br/><br/>
그렇다면 도대체 언제 오토박싱과 언박싱을 사용해야 할까요?
레퍼런스 타입과 기본 타입 사이의 "임피던스 불일치"가 있는 경우에만 사용하세요(기본 타입을 쓸 수 없는 경우에만 쓰세요).
예를 들어 Map이나 Set 같은 Java Collection에는 기본 타입을 못 넣으니까 이런 경우에는 레퍼런스 타입을 쓰면 됩니다.
하지만 과학 계산이나, 성능에 민감한 계산 코드에 오토박싱/언박싱을 사용하는 건 적절하지 않습니다.
Integer는 int를 완벽히 대체할 수 없습니다. 오토박싱과 언박싱은 기본 타입과 레퍼런스 타입 사이의 구분을 흐릿하게 만들어주지만,
그 차이를 완벽히 없애는 것은 아닙니다.


## 결론

* 오토박싱으로 인한 속도 지연이 문제가 되는 상황이라면 primitive 타입으로 바꾸는 것을 검토해 볼 것.
* 가급적이면 primitive 타입을 쓰자.

## Links

* [Autoboxing(docs.oracle.com)](https://docs.oracle.com/javase/8/docs/technotes/guides/language/autoboxing.html)
* [Autoboxing(docs.oracle.com - tutorial)](https://docs.oracle.com/javase/tutorial/java/data/autoboxing.html)



