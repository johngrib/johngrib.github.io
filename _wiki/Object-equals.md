---
layout  : wiki
title   : java.lang.Object.equals 메소드
summary : Object.equals 메소드 주석 번역
date    : 2018-03-07 21:40:19 +0900
updated : 2018-03-07 23:19:23 +0900
tags    : java 번역
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

## Links

* [Object(docs.oracle.com/javase/8)](https://docs.oracle.com/javase/8/docs/api/java/lang/Object.html)

* [동치 관계(Equivalence relation)](https://ko.wikipedia.org/wiki/%EB%8F%99%EC%B9%98%EA%B4%80%EA%B3%84)
* [반사 관계(Reflexive relation)](https://ko.wikipedia.org/wiki/%EB%B0%98%EC%82%AC%EA%B4%80%EA%B3%84)
* [대칭 관계(Symmetric relation)](https://ko.wikipedia.org/wiki/%EB%8C%80%EC%B9%AD%EA%B4%80%EA%B3%84)
* [추이적 관계(Transitive relation)](https://ko.wikipedia.org/wiki/%EC%B6%94%EC%9D%B4%EC%A0%81_%EA%B4%80%EA%B3%84)
