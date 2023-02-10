---
layout  : wiki
title   : Java String
summary : 
date    : 2022-11-11 00:27:32 +0900
updated : 2023-02-10 23:39:40 +0900
tag     : java clojure
resource: 8C/44F1A0-7F42-415F-BB9C-1098ECC5E5D2
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

### format 메소드

포매팅을 적용한 문자열을 리턴해준다.

문자열은 다음과 같이 포매팅할 수 있다.

```java
String.format("_%s_", "JohnGrib");
// _JohnGrib_

String.format("_%10s_", "JohnGrib");
// _  JohnGrib_

String.format("_%-10s_", "JohnGrib");   // 왼쪽 정렬
// _JohnGrib  _

String.format("_%4$2s %3$2s %2$2s %1$2s_", "a", "b", "c", "d");
// _ d  c  b  a_
```

콤마를 넣어주는 것도 쉽게 할 수 있다.

```java
String.format("%,d", 12345678);
// 12,345,678

String.format("%,f", 12345678.90123456);
// 12,345,678.901235
```

실수 포맷팅은 이런 식으로 할 수 있다.

```java
String.format("%.2f", Math.PI);
// 3.14

String.format("%f", Math.PI);
// 3.141593

String.format("%3.5f", Math.PI);
// 3.14159

String.format("_%5d_", 123);
// _  123_

String.format("_%05d_", 123);
// _00123_
```

날짜와 시간도 가능하다.

```java
String.format("%tF", LocalDate.now());
// 2023-02-10

String.format("Local time: %tT", LocalDateTime.now());
// Local time: 23:37:08
```

국가별로 소수점을 `.`으로 쓰기도 하고, `,`로 쓰기도 하는데, 이런 경우에는 `Locale`을 지정해주면 된다.

```java
// 미국, 한국은 점을 소수점으로 사용한다.

  String.format(Locale.US, "e = %+10.4f", Math.E * 1000);
  // e = +2718.2818

  String.format(Locale.KOREA, "e = %+10.4f", Math.E * 1000);
  // e = +2718.2818

// 이탈리아, 프랑스, 독일은 콤마를 소수점으로 사용한다.

  String.format(Locale.ITALY, "e = %+10.4f", Math.E * 1000);
  // e = +2718,2818

  String.format(Locale.FRANCE, "e = %+10.4f", Math.E * 1000);
  // e = +2718,2818

  String.format(Locale.GERMAN, "e = %+10.4f", Math.E * 1000);
  // e = +2718,2818
```

`(` 를 사용하면 회계에서 사용하곤 하는 것처럼 음수값을 괄호로 감싸준다.

```java
//                                                            ↓
String.format("Amount gained or lost since last statement: $ %(,.2f", 6217.58);
// Amount gained or lost since last statement: $ 6,217.58
    // 양수이므로 6,217.58

String.format("Amount gained or lost since last statement: $ %(,.2f", -6217.58);
// Amount gained or lost since last statement: $ (6,217.58)
    // 음수이므로 (6,217.58)
```

## The Run-Time Constant Pool

## Clojure

### Clojure의 Keyword는 interned string

Clojure의 RT.java 파일을 읽어보면 Clojure의 Keyword를 생성할 때 `Keyword.intern` static method를 호출하는 것을 알 수 있다.

[Clojure 1.11.1 clojure.lang.RT.keyword]( https://github.com/clojure/clojure/blob/clojure-1.11.1/src/jvm/clojure/lang/RT.java#L347-L349 )

```java
static public Keyword keyword(String ns, String name){
    return Keyword.intern((Symbol.intern(ns, name)));
}
```

다만 JVM에서 운영하는 interned string pool이 아니라 `ConcurrentHashMap`을 사용해 Keyword를 위한 별도의 pool을 관리하고 있다는 점이 인상적이다.

코드가 짧고 단순해 이해하기 어렵지 않다.

[Clojure 1.11.1 clojure.lang.Keyword.intern]( https://github.com/clojure/clojure/blob/clojure-1.11.1/src/jvm/clojure/lang/Keyword.java#L28-L53 )

```java
private static ConcurrentHashMap<Symbol, Reference<Keyword>> table
    = new ConcurrentHashMap();  // 이 table이 interned keyword의 pool이 된다.
static final ReferenceQueue rq = new ReferenceQueue();
public final Symbol sym;
final int hasheq;
transient String _str;

public static Keyword intern(Symbol sym){
    Keyword k = null;
    // table에 들어있는지 확인한다
    Reference<Keyword> existingRef = table.get(sym);
    if(existingRef == null) {
        // table에 키워드가 없다면
        Util.clearCache(rq, table);
        if(sym.meta() != null) {
            sym = (Symbol) sym.withMeta(null);
        }
        k = new Keyword(sym);
        // 새로 집어넣는다
        existingRef = table.putIfAbsent(sym, new WeakReference<Keyword>(k, rq));
    }
    if(existingRef == null)
        return k;
    Keyword existingk = existingRef.get();
    if(existingk != null)
        return existingk;
    //entry died in the interim, do over
    table.remove(sym, existingRef);
    return intern(sym);
}
```


## 참고문헌

- [5.1. The Run-Time Constant Pool (JVMS 7)]( https://docs.oracle.com/javase/specs/jvms/se7/html/jvms-5.html#jvms-5.1 )
- [Clojure 1.11.1 clojure.lang.RT.java]( https://github.com/clojure/clojure/blob/clojure-1.11.1/src/jvm/clojure/lang/RT.java )
- [jdk-17+35 java.lang.String.java]( https://github.com/openjdk/jdk/blob/jdk-17%2B35/src/java.base/share/classes/java/lang/String.java )
