---
layout  : wiki
title   : Java String
summary : 
date    : 2022-11-11 00:27:32 +0900
updated : 2022-11-20 20:58:17 +0900
tag     : java
toc     : true
public  : true
parent  : [[/java]]
latex   : false
---
* TOC
{:toc}

## 코드

### intern 메소드

[jdk-17+35 java.lang.String.intern]( https://github.com/openjdk/jdk/blob/jdk-17%2B35/src/java.base/share/classes/java/lang/String.java#L4367-L4390 )

```java
/**
 * Returns a canonical representation for the string object.
 * <p>
 * A pool of strings, initially empty, is maintained privately by the
 * class {@code String}.
 * <p>
 * When the intern method is invoked, if the pool already contains a
 * string equal to this {@code String} object as determined by
 * the {@link #equals(Object)} method, then the string from the pool is
 * returned. Otherwise, this {@code String} object is added to the
 * pool and a reference to this {@code String} object is returned.
 * <p>
 * It follows that for any two strings {@code s} and {@code t},
 * {@code s.intern() == t.intern()} is {@code true}
 * if and only if {@code s.equals(t)} is {@code true}.
 * <p>
 * All literal strings and string-valued constant expressions are
 * interned. String literals are defined in section 3.10.5 of the
 * <cite>The Java&trade; Language Specification</cite>.
 *
 * @return  a string that has the same contents as this string, but is
 *          guaranteed to be from a pool of unique strings.
 * @jls 3.10.5 String Literals
 */
public native String intern();
```

>
문자열 객체의 정식 표현을 리턴합니다.
>
문자열 풀은 비어있는 상태로 초기화되며, String 클래스에 의해 내부적으로(privately) 관리됩니다.
>
intern 메소드가 호출되었을 때, this String 객체와 `equals` 메소드로 비교했을 때 '같다'고 판별되는 문자열이 이미 문자열 풀에 들어있다면, 문자열 풀의 문자열이 리턴됩니다.
그러나 문자열 풀에 해당 문자열이 들어있지 않다면, this String 객체가 문자열 풀에 추가되고 this String 객체의 참조가 리턴됩니다.
>
두 문자열 s와 t에 대해, `s.equals(t)`가 `true`인 경우에만 한하여 `s.intern() == t.intern()`는 `true`가 됩니다.
>
모든 리터럴 문자열과 문자열 상수 표현식은 이미 intern된 상태입니다.
String 리터럴은 Java Language Specification의 3.10.5 절에 정의되어 있습니다.
>
- @return this String과 같은 내용을 가진 문자열이며, unique한 문자열들이 들어있는 문자열 풀에서 가져온다는 것을 보장합니다.



## The Run-Time Constant Pool


## 참고문헌

- [5.1. The Run-Time Constant Pool (JVMS 7)]( https://docs.oracle.com/javase/specs/jvms/se7/html/jvms-5.html#jvms-5.1 )
- [jdk-17+35 java.lang.String.java]( https://github.com/openjdk/jdk/blob/jdk-17%2B35/src/java.base/share/classes/java/lang/String.java )

