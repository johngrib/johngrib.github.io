---
layout  : wiki
title   : Clojure Equality
summary : 
date    : 2021-12-07 21:04:40 +0900
updated : 2021-12-07 23:52:35 +0900
tag     : 
toc     : true
public  : true
parent  : 
latex   : false
---
* TOC
{:toc}

## Equality: Clojure guide 문서 번역

[Equality]( https://clojure.org/guides/equality )

>
This document discusses the concept of equality in Clojure, including the functions `=`, `==`, and `identical?`, and how they differ from Java’s `equals` method.
It also has some description of Clojure’s `hash`, and how it differs from Java’s `hashCode`.
The beginning of this guide provides a summary of the most important information for quick reference followed by a much more extensive review of the details.
>
_Information in this guide describes the behavior of Clojure 1.10.0 unless noted otherwise._

- 이 문서는 Clojure의 equality 개념에 대해 설명합니다.
    - Clojure의 `=`, `==`, `identical?` 함수가 Java의 `equals` 메소드와 어떻게 다른지도 알아봅니다.
- Clojure의 `hash` 함수와 Java의 `hashCode` 함수가 어떻게 다른지도 알아봅니다.
- 빠르게 훑어볼 수 있도록 이 가이드 문서의 앞부분에는 가장 중요한 내용들이 요약되어 있고, 아래로 갈수록 자세한 내용이 있습니다.
- 이 가이드 문서는 Clojure 1.10.0 에 대해 설명합니다.

### Summary

>
Clojure’s `=` is `true` when comparing immutable values that represent the same value, or when comparing mutable objects that are the identical object.
As a convenience, `=` also returns `true` when used to compare Java collections against each other, or against Clojure’s immutable collections, if their contents are equal.
However, there are important caveats if you use non-Clojure collections.

- Clojure의 `=`는 다음 경우에 `true` 입니다.
    - immutable 한 값을 비교할 때, 두 값이 같은 경우
    - mutable 객체를 비교할 때, 두 객체가 같은 경우
- 편의를 위해 다음의 경우에도 `=`는 `true`를 리턴합니다.
    - Java의 컬렉션들을 서로 비교할 때 컬렉션들의 내용물이 동일한 경우
    - Java의 컬렉션과 Clojure의 immutable 컬렉션을 비교할 때 내용물이 동일한 경우
- 그러나 Clojure의 컬렉션이 아닌 컬렉션을 다룰 때에는 주의해야 할 점들이 있습니다.

>
Clojure’s `=` is `true` when called with two immutable scalar values, if:
>
- Both arguments are `nil`, `true`, `false`, the same character, or the same string (i.e. the same sequence of characters).
- Both arguments are symbols, or both keywords, with equal namespaces and names.
- Both arguments are numbers in the same 'category', and numerically the same, where category is one of:
    - integer or ratio
    - floating point (float or double)
    - [BigDecimal]( https://docs.oracle.com/javase/8/docs/api/java/math/BigDecimal.html ).

다음과 같은 경우 Clojure의 `=`는 2개의 immutable한 scalar 값에 대해 호출하면 `true` 입니다.

- 둘 다 `nil`인 경우
- 둘 다 `true`인 경우
- 둘 다 `false`인 경우
- 둘 다 같은 character인 경우
- 둘 다 같은 string인 경우
- 둘 다 namespace와 name이 같은 symbol인 경우
- 둘 다 namespace와 name이 같은 keyword인 경우
- 둘 다 같은 '카테고리'에 포함된 숫자이면서, 동시에 같은 숫자인 경우. '카테고리'는 다음과 같음.
    - integer 또는 ratio
    - floating point (float 또는 double)
    - [BigDecimal]( https://docs.oracle.com/javase/8/docs/api/java/math/BigDecimal.html )

>
Clojure’s `=` is `true` when called with two collections, if:
>
- Both arguments are _sequential_ (sequences, lists, vectors, queues, or Java collections implementing `java.util.List`) with `=` elements in the same order.
- Both arguments are sets (including Java sets implementing `java.util.Set`), with `=` elements, ignoring order.
- Both arguments are maps (including Java maps implementing `java.util.Map`), with `=` keys **and** values, ignoring entry order.
- Both arguments are records created with `defrecord`, with `=` keys **and** values, ignoring order, and they have the same type. `=` returns `false` when comparing a record to a map, regardless of their keys and values, because they do not have the same type.

다음과 같은 경우 Clojure의 `=`는 2개의 컬렉션에 대해 `true`입니다.

- 둘 다 sequential(sequence, list, vector, queue, `java.util.List`를 구현한 Java collection)이면서, 각각 `=`로 평가했을 때 `true`인 원소들이 같은 순서로 있는 경우.
- 둘 다 set(`java.util.Set`를 구현한 Java set)이면서, `=`로 평가했을 때 값이 같은 원소들이 있는 경우.
    - (Set 이므로 순서는 무시)
- 둘 다 map(`java.util.Map`를 구현한 Java map)이면서, `=`로 평가했을 때 key와 value가 같은 원소들이 있는 경우.
    - (Map의 entry 순서는 무시)
- 둘 다 `defrecord`로 생성한 record이고, type이 같으며, `=`로 평가했을 때 key와 value가 같은 원소들이 있는 경우.
    - record와 map을 비교하면 type이 다르기 때문에 `=`는 key와 value가 어떻건 간에 무시하고 `false`를 리턴합니다.

>
Clojure’s `=` is `true` when called with two mutable Clojure objects, i.e. vars, refs, atoms, or agents, or with two "pending" Clojure objects, i.e. futures, promises, or delays, if:
>
> - Both arguments are the identical object, i.e. `(identical? x y)` is `true`.
>
For all other types:
>
- Both arguments are the same type defined with `deftype`. The type’s `equiv` method is called and its return value becomes the value of `(= x y)`.
- For other types, Java’s `x.equals(y)` is `true`.

다음과 같은 경우 Clojure의 `=`는 2개의 mutable Clojure object 즉 var, ref, atom, agent, "pending" Clojure object(future, promise, delay)에 대해 `true`입니다.

- 둘 다 일치하는(identical) 객체인 경우. 즉, `(identical? x y)`이 `true`인 경우.[^identical-expr-code]

그리고 나머지 타입들에 대해서는...

- 둘 다 `deftype`로 정의된 같은 타입인 경우, 해당 타입의 `equiv` 메서드를 호출한 결과가 `(= x y)`의 값이 됩니다.
- 그 외의 타입이라면 Java의 `x.equals(y)`의 값이 `true`인 경우.

>
Clojure’s `==` is intended specifically for numerical values:
>
- `==` can be used with numbers across different number categories (such as integer `0` and floating point `0.0`).
- If any value being compared is not a number, an exception is thrown.

Clojure의 `==`는 숫자에 대해서는 특별히 작동합니다.

- `==`는 카테고리가 다른 숫자들에 대해서도 사용할 수 있습니다. (가령 정수 `0`과 `0.0`도 비교가 가능)
- 만약 비교 대상인 값이 숫자가 아니라면 예외가 던져집니다.

>
If you call `=` or `==` with more than two arguments, the result will be `true` when all consecutive pairs are `=` or `==`.
`hash` is consistent with `=`, with the exceptions given below.

- 만약 `=`이나 `==`를 호출할 때 2개보다 많은 인자를 주면, 각각의 연속적인 두 값이 `=`이나 `==`인 경우에만 `true`를 리턴합니다.
- `hash`는 `=`와 일치하지만, 아래와 같은 예외 사항들이 있습니다.

>
Exceptions, or possible surprises:
>
- When using non-Clojure collections in a Clojure hash-based collection (as map keys, or set elements), it will not appear equal to a similar collection with Clojure counterparts, due to the difference in hashing behavior. (see [Equality and hash]( https://clojure.org/guides/equality#equality_and_hash ) and [CLJ-1372]( https://clojure.atlassian.net/browse/CLJ-1372 ))
- When comparing collections with `=`, numbers within the collections are also compared with `=`, so the three numeric categories above are significant.
- 'Not a Number' values `##NaN`, `Float/NaN`, and `Double/NaN` are not `=` or `==` to anything, not even themselves. _Recommendation_: Avoid including `##NaN` inside of Clojure data structures where you want to compare them to each other using `=`, and sometimes get `true` as the result.
- `0.0` is `=` to `-0.0`
- Clojure regex’s, e.g. `#"a.*bc"`, are implemented using Java `java.util.regex.Pattern` objects, and Java’s `equals` on two `Pattern` objects returns `(identical? re1 re2)`, even though they are documented as immutable objects. Thus `(= #"abc" #"abc")` returns false, and `=` only returns true if two regex’s happen to be the same identical object in memory. _Recommendation_: Avoid using regex instances inside of Clojure data structures where you want to compare them to each other using `=`, and get `true` as the result even if the regex instances are not identical objects. If you feel the need to, consider converting them to strings first, e.g. `(str #"abc")` → `"abc"` (see [CLJ-1182]( https://clojure.atlassian.net/browse/CLJ-1182 ))
- Clojure persistent queues are never `=` to Java collections implementing `java.util.List`, not even if they have `=` elements in the same order (see [CLJ-1059]( https://clojure.atlassian.net/browse/CLJ-1059 ))
- Using `=` to compare a sorted map with another map, where `compare` throws an exception when comparing their keys to each other because they have different types (e.g. keywords vs. numbers), will in some cases throw an exception (see [CLJ-2325]( https://clojure.atlassian.net/browse/CLJ-2325 ))

- Clojure hash 기반의 collection 안에서 non-Clojure collection을 사용한다면(map key나 set 원소 등), hashing 동작의 차이 때문에 `=`가 Clojure에 대응하는 collection과 똑같이 작동하지 않을 것입니다.
    - 자세한 내용은 [Equality and hash]( https://clojure.org/guides/equality#equality_and_hash ), [CLJ-1372]( https://clojure.atlassian.net/browse/CLJ-1372 ) 문서를 참고하세요.
- collection을 `=`로 비교할 때, collection 내부의 숫자들도 `=`로 비교됩니다. 따라서 앞에서 언급한 숫자 카테고리들이 이 작업에서 중요합니다.
- `##NaN`, `Float/NaN`, `Double/NaN` 같은 'Not a Number' 값들은 어떤 것과도 `=`나 `==`를 호출해도 `false`입니다.
    - 심지어 자기 자신과 비교해도 `false`입니다.
    - 권장사항: `=`를 써서 `true`를 결과로 얻는 것이 필요한 경우에는 Clojure data structure에 `##NaN`을 포함시키지 마세요.
- `0.0`과 `-0.0`은 `=`로 비교하면 `true`입니다.
- Clojure의 정규식은 Java의 `java.util.regex.Pattern`를 사용해 구현되어 있습니다. Java의 `Pattern` 객체는 immutable 이지만 `equals`를 호출한 결과는 `(identical? re1 re2)`과 같습니다.[^java-pattern-equals]
    - 따라서 `(= #"abc" #"abc")`는 `false`를 리턴하고, 두 정규식이 동일한 메모리 객체인 경우에만 `true`를 리턴합니다.
    - 권장사항: `=`를 써서 `true`를 결과로 얻는 것이 필요한 경우에는 Clojure data structure에 identical 객체가 아닌 regex를 포함시키지 마세요.
        - 만약 그럼에도 포함시켜야 한다면, 정규식을 string으로 변환하는 것을 고려하세요. (예: `(str #"abc")` → `"abc"`)    
        - 자세한 내용은 [CLJ-1182]( https://clojure.atlassian.net/browse/CLJ-1182 ) 문서를 참고하세요.
- Clojure의 persistent queue는 `java.util.List`를 구현한 Java collection과 `=`로 비교했을 때 무조건 `false`입니다.
    - 심지어 `=`로 비교했을 때 같은 원소들이 같은 순서로 있어도 `false`를 리턴합니다.
    - 자세한 내용은 [CLJ-1059]( https://clojure.atlassian.net/browse/CLJ-1059 ) 문서를 참고하세요.
- sorted map 을 다른 map과 비교할 때 `=`를 사용하면 `compare`가 예외를 던질 수 있습니다.
    - key를 비교할 때 key의 type이 다르다면(예: keyword와 number), 몇몇 케이스에서 예외를 던지게 됩니다.

>
In most cases, `hash` is consistent with `=`, meaning: if `(= x y)`, then `(= (hash x) (hash y))`. For any values or objects where this does not hold, Clojure hash-based collections will not be able to find or remove those items correctly, i.e. for hash-based sets with those items as elements, or hash-based maps with those items as keys.
>
- `hash` is consistent with `=` for numbers, except for special `float` and `double` values. _Recommendation_: Convert floats to doubles with `(double x)` to avoid this issue.
- `hash` is not consistent with `=` for immutable Clojure collections and their non-Clojure counterparts. See the [Equality and hash]( https://clojure.org/guides/equality#equality_and_hash ) section for more details. _Recommendation_: Convert non-Clojure collections to their Clojure immutable counterparts before including them in other Clojure data structures.
- `hash` is not consistent with `=` for objects with class `VecSeq`, returned from calls like `(seq (vector-of :int 0 1 2))` (see [CLJ-1364]( https://clojure.atlassian.net/browse/CLJ-1364 ))

대부분의 경우 `hash`는 `=`와 똑같이 작동합니다.
즉, `(= x y)`이면, `(= (hash x) (hash y))`라는 의미입니다.
만약 이 규칙이 적용되지 않는 값이나 객체라면, Clojure hash 기반 collection은 이런 객체를 정확히 찾거나 삭제할 수 없습니다.
예를 들어 그런 아이템들을 원소로 갖는 hash 기반의 set 이나, 그런 아이템들을 key로 삼는 hash 기반이 map들이 이에 해당됩니다.

- `hash`는 숫자에 대해서는 `=`와 똑같습니다.
    - 특별한 `float`과 `double` 값은 예외입니다.
    - 권장사항: 이 문제를 피하고 싶다면 `(double x)`를 써서 `float`을 `double`으로 변환하세요.
- `hash`는 immutable Clojure collection과 그 외의 non-Clojure collection을 비교할 때 `=`와 똑같지 않습니다.
    - 자세한 내용은 [Equality and hash]( https://clojure.org/guides/equality#equality_and_hash )문서를 참고하세요.
    - 권장사항: 이 문제를 피하고 싶다면 non-Clojure collection을 다른 Clojure data structure에 포함시키기 전에 Clojure immutable인 대응 collection으로 변환하세요.
- `hash`는 `(seq (vector-of :int 0 1 2))`같은 코드에서 리턴된 `VecSeq` 클래스 객체에 대해서 `=`와 똑같지 않습니다.
    - 자세한 내용은 [CLJ-1364]( https://clojure.atlassian.net/browse/CLJ-1364 ) 문서를 참고하세요.

### Introduction

>
Equality in Clojure is most often tested using =.

Clojure에서 '같음'은 주로 `=`를 사용해 판별합니다.

```clojure
user> (= 2 (+ 1 1))
true
user> (= (str "fo" "od") "food")
true
```

>
Unlike Java’s `equals` method, Clojure’s `=` returns `true` for many values that do not have the same type as each other.

Java의 `equals` 메서드와 달리, Clojure의 `=`는 타입이 다른 경우에도 `true`를 반환하는 경우가 많습니다.

```clojure
user> (= (float 314.0) (double 314.0))
true
user> (= 3 3N)
true
```

>
`=` does **not** always return true when two numbers have the same numeric value.

그러나 `=`는 두 숫자가 같다 하더라도 항상 `true`를 리턴하지는 않습니다.

```clojure
user> (= 2 2.0)
false
```

>
If you want to test for numeric equality across different numeric categories, use `==`.
See the section [Numbers]( https://clojure.org/guides/equality#numbers ) below for details.

- 만약 각각 다른 숫자 카테고리에 대해 숫자 값이 같은지를 확인하고 싶다면 `==`를 사용하세요.
- 자세한 내용은 [Numbers]( https://clojure.org/guides/equality#numbers ) 문서를 참고하세요.

>
Sequential collections (sequences, vectors, lists, and queues) with equal elements in the same order are equal:

Sequential collection (sequence, vector, list, and queue)에서 같은 원소들이 같은 순서로 있다면 같은 것입니다.

```clojure
user> (range 3)
(0 1 2)
user> (= [0 1 2] (range 3))
true
user> (= [0 1 2] '(0 1 2))
true
;; not = because different order
user> (= [0 1 2] [0 2 1])
false
;; not = because different number of elements
user> (= [0 1] [0 1 2])
false
;; not = because 2 and 2.0 are not =
user> (= '(0 1 2) '(0 1 2.0))
false
```

>
Two sets are equal if they have equal elements. Sets are normally unordered but even with sorted sets, the sort order is not considered when comparing for equality.

- 같은 원소들을 갖는 두 set는 같습니다.
- set은 일반적으로 정렬되어 있지 않지만, 정렬된 set이 있다 하더라도 정렬 순서가 비교에 영향을 주지 않습니다.

```clojure
user> (def s1 #{1999 2001 3001})
#'user/s1
user> s1
#{2001 1999 3001}
user> (def s2 (sorted-set 1999 2001 3001))
#'user/s2
user> s2
#{1999 2001 3001}
user> (= s1 s2)
true
```

>
Two maps are equal if they have the same set of keys, and each key maps to equal values in each map.
As with sets, maps are unordered and the sort order is not considered for sorted maps.

- 두 map은 key들의 set이 서로 같고, 각각의 key가 같은 값을 갖고 있다면 같습니다.
- set에서와 같이 map은 정렬되어 있지 않으며, 정렬된 map이 있어도 정렬 순서가 비교에 영향을 주지 않습니다.

>
Note that while vectors are indexed and possess some map-like qualities, maps and vectors never compare as `=` in Clojure:

vector가 인덱스를 가지고 있고 map 비슷한 특징이 있긴 하지만,  Clojure에서 map과 vector는 `=`로 비교했을 때 절대 `true`가 아닙니다.

```clojure
user> (def v1 ["a" "b" "c"])
#'user/v1
user> (def m1 {0 "a" 1 "b" 2 "c"})
#'user/m1
user> (v1 0)
"a"
user> (m1 0)
"a"
user> (= v1 m1)
false
```

>
Any metadata associated with Clojure collections is ignored when comparing them.

Clojure collection 와 관련된 메타데이터는 비교에서 무시됩니다.

```clojure
user> (def s1 (with-meta #{1 2 3} {:key1 "set 1"}))
#'user/s1
user> (def s2 (with-meta #{1 2 3} {:key1 "set 2 here"}))
#'user/s2
user> (binding [*print-meta* true] (pr-str s1))
"^{:key1 \"set 1\"} #{1 2 3}"
user> (binding [*print-meta* true] (pr-str s2))
"^{:key1 \"set 2 here\"} #{1 2 3}"
user> (= s1 s2)
true
user> (= (meta s1) (meta s2))
false
```

>
Records created with `defrecord` in many ways behave similarly to Clojure maps.
However, they are only `=` to other records of the same type, and only then if they have the same keys and the same values.
They are never equal to maps, even if they have the same keys and values.

- `defrecord`로 생성된 record는 여러가지 면에서 Clojure의 map처럼 동작합니다.
- 그러나, 같은 타입인 record이고, key가 같고, value도 같은 경우에만 `=`로 비교했을 때 `true`입니다.
- key와 value가 모두 같다 하더라도 record는 절대로 map과 같지 않습니다.

>
When you define a Clojure record, you are doing so in order to create a distinct type that can be distinguished from other types — you want each type to have its own behavior with Clojure protocols and multimethods.

- Clojure record를 정의하는 행위는 다른 타입과 구별되는 타입을 생성하기 위한 것입니다.
    - 이렇게 타입을 만드는 이유는 여러분이 Clojure 프로토콜과 멀티메소드를 사용하여 자신만의 동작을 갖춘 타입을 원해서인 것이죠.

```clojure
user=> (defrecord MyRec1 [a b])
user.MyRec1
user=> (def r1 (->MyRec1 1 2))
#'user/r1
user=> r1
#user.MyRec1{:a 1, :b 2}

user=> (defrecord MyRec2 [a b])
user.MyRec2
user=> (def r2 (->MyRec2 1 2))
#'user/r2
user=> r2
#user.MyRec2{:a 1, :b 2}

user=> (def m1 {:a 1 :b 2})
#'user/m1

user=> (= r1 r2)
false             ; r1 and r2 have different types
user=> (= r1 m1)
false             ; r1 and m1 have different types
user=> (into {} r1)
{:a 1, :b 2}      ; this is one way to "convert" a record to a map
user=> (= (into {} r1) m1)
true              ; the resulting map is = to m1
```

>
Clojure `=` behaves the same as Java’s `equals` for all types except numbers and Clojure collections.
>
Booleans and characters are straightforward in their equality.
>
Strings are straightforward, too, except in some cases involving Unicode where strings that consist of different sequences of Unicode characters can look the same when displayed, and in some applications should be treated as equal even though `=` returns `false`.
See "Normalization" on the Wikipedia page on [Unicode equivalence]( http://en.wikipedia.org/wiki/Unicode_equivalence ) if you are interested. There are libraries like [ICU]( http://site.icu-project.org/ ) (International Components for Unicode for Java) that can help if you need to do this.
>
Two symbols are equal if they have the same namespace and symbol name.
Two keywords are equal given the same conditions.
Clojure makes equality testing for keywords particularly quick (a simple pointer comparison).
It achieves this by its `intern` method of the Keyword class guaranteeing that all keywords with the same namespace and name will return the same keyword object.

- 숫자와 Clojure collection을 제외하고 Clojure의 `=`는 Java의 `equals`와 똑같이 작동합니다.
- boolean과 character는 있는 그대로 비교합니다.
- String도 있는 그대로 비교합니다. 그러나 Unicode를 포함하는 String의 경우, 눈으로 보기엔 똑같은 Unicode character가 다른 시퀀스를 갖는 경우가 있어서 `=`를 써도 `false`를 리턴할 수 있습니다.
    - 관심이 있다면 위키피디아의 [Unicode equivalence]( http://en.wikipedia.org/wiki/Unicode_equivalence )문서에서 "Normalization"을 읽어보세요.
    - [ICU]( http://site.icu-project.org/ ) (International Components for Unicode for Java) 같은 라이브러리가 필요할 수도 있을 것입니다.
- namespace와 symbol 이름이 같다면 두 symbol은 같습니다.
    - 두 keyword도 namespace와 keyword 이름이 같다면 같습니다.
    - keyword의 같음을 테스트할 때 Clojure는 굉장히 빠릅니다.(간단한 포인터 비교를 사용합니다)
    - namespace가 같고, 이름이 같다면 같은 keyword 객체라는 것은 keyword 클래스의 `intern` 메소드가 보장합니다.

### Numbers

>
Java `equals` is only true for two numbers if the types and numeric values are the same.
Thus `equals` is false even for `Integer` `1` and `Long` `1`, because they have different types.
Exception: Java `equals` is also false for two `BigDecimal` values that are numerically equal if they have different scales, e.g. `1.50M` and `1.500M` are not equal.
This behavior is documented for `BigDecimal` method [equals]( https://docs.oracle.com/javase/8/docs/api/java/math/BigDecimal.html#equals-java.lang.Object- ).

- Java의 `equals`는 숫자와 타입과 숫자 값이 같은 경우에만 `true`를 리턴합니다.
    - 그러므로 `Integer` `1`과 `Long` `1` `equals`에 대해 `equals`는 `false`를 리턴합니다. 타입이 다르기 때문입니다.
- 예외사항: Java의 `equals`는 `BigDecimal` 값이 같은데도 `false`를 리턴할 수 있습니다.
    - 예를 들어 `1.50M`은 `1.500M`과 같지 않습니다.
    - 이 동작은 `BigDecimal`의 [equals]( https://docs.oracle.com/javase/8/docs/api/java/math/BigDecimal.html#equals-java.lang.Object- ) 문서에 설명이 있습니다.

>
Clojure `=` is `true` if the 'category' and numeric values are the same. Category is one of:
>
- integer or ratios, where integer includes all Java integer types such as `Byte`, `Short`, `Integer`, `Long`, `BigInteger`, and `clojure.lang.BigInt`, and ratios are represented with the Java type named `clojure.lang.Ratio`.
- floating point: `Float` and `Double`
- decimal: `BigDecimal`

- Clojure의 `=`는 숫자의 '카테고리'와 값이 같다면 `true`를 리턴합니다. 카테고리는 다음과 같습니다.
    - 정수, 비율, Java의 모든 정수 타입들(`Byte`, `Short`, `Integer`, `Long`, `BigInteger`), `clojure.lang.BigInt`, 그리고 `clojure.lang.Ratio`라는 Java 타입으로 표현되는 비율.
- 부동 소수점 수: `Float`과 `Double`
- 소수: `BigDecimal`

>
So `(= (int 1) (long 1))` is `true` because they are in the same integer category, but `(= 1 1.0)` is `false` because they are in different categories (integer vs. floating).
While integers and ratios are separate types in the Clojure implementation, for the purposes of `=` they are effectively in the same category.
The results of arithmetic operations on ratios are auto-converted to integers if they are whole numbers.
Thus any Clojure number that has type `Ratio` cannot equal any integer, so `=` always gives the correct numerical answer (`false`) when comparing a ratio to an integer.

- 그러므로 `(= (int 1) (long 1))`은 `true`를 리턴합니다. 두 수가 같은 integer 카테고리에 있기 때문입니다.
    - 하지만 `(= 1 1.0)`은 `false`를 리턴합니다. 두 수가 integer와 floating이라는 다른 카테고리에 있기 때문입니다.
- integer와 ratio는 Clojure에서는 따로 구현리되어 있지만, `=`에 대해서는 같은 카테고리로 간주합니다.
    - 산술 연산을 할 때 ratio 숫자는 값이 정수인 경우에, 자동으로 integer로 변환됩니다.
- 따라서 `Ratio` 타입인 Clojure 숫자는 어떤 정수와도 같지 않습니다.
    - 그래서 `=`는 ratio와 integer를 비교할 때 항상 올바른 대답(`false`)을 리턴합니다.

>
Clojure also has `==` that is only useful for comparing numbers.
It returns `true` whenever `=` does.
It also returns `true` for numbers that are numerically equal, even if they are in different categories.
Thus `(= 1 1.0)` is false, but `(== 1 1.0)` is `true`.

- Clojure에서도 `==`를 사용하여 숫자를 비교할 수 있습니다.
- `=`가 `true`를 리턴한다면 `==`도 `true`를 리턴합니다.
- `==`는 숫자들이 숫자의 값이 같다면, 카테고리가 다르더라도 `true`를 리턴합니다.
    - 그러므로 `(= 1 1.0)`은 `false`를 리턴하고, `(== 1 1.0)`은 `true`를 리턴합니다.

>
Why does `=` have different categories for numbers, you might wonder?
It would be difficult (if it is even possible) to make `hash` consistent with `=` if it behaved like `==` (see section [Equality and hash]( https://clojure.org/guides/equality#equality_and_hash )).
Imagine trying to write `hash` such that it was guaranteed to return the same hash value for all of `(float 1.5)`, `(double 1.5)`, `BigDecimal` values `1.50M`, `1.500M`, etc. and the ratio `(/ 3 2)`.

- 그렇다면 `=`는 왜 숫자 비교에 카테고리를 사용할까요?
- `hash`가 `==`와 같은 방식으로 작동하는 것을 보장하는 것이 어려울 수 있기 때문입니다.
    - [Equality and hash]( https://clojure.org/guides/equality#equality_and_hash ) 문서를 참고하세요.
    - `(float 1.5)`, `(double 1.5)`, `BigDecimal` 타입인 값 `1.50M`, `1.500M` 같은 모든 숫자들과 비율 `(/ 3 2)`에 대해 같은 해시 값을 리턴하도록 `hash` 함수를 만든다고 생각해 봅시다.

>
Clojure uses `=` to compare values for equality when they are used as elements in sets, or keys in maps.
Thus Clojure’s numeric categories come into play if you use sets with numeric elements or maps with numeric keys.

- Clojure는 `=`를 사용해서 set의 원소나 map의 key로 사용되는 value를 비교합니다.
- 그러므로, 숫자 원소가 있는 set이나 숫자 key가 있는 map을 사용한다면 Clojure의 숫자 카테고리가 사용됩니다.

#### Floating point numbers are usually approximations

부동소수점은 일반적으로 근사값입니다.

## 참고문헌

- [Equality (clojure.org]( https://clojure.org/guides/equality )

## 주석

[^identical-expr-code]: [richhickey의 "added identical?" commit]( https://github.com/clojure/clojure/commit/59fede97ed5a7bb8f2531dd9bcbd08f36139e4ad#diff-acddf4ef15ed09e1bfb6c1c3efc03396bcc49fcd223c395b11f6eb765e52f22cR1570-R1573 ) 참고.

[^java-pattern-equals]: Java `Pattern` 클래스에는 `equals` 메소드가 구현되어 있지 않다. 따라서 `Object`의 `equals`를 그대로 상속받아 사용하고 있는데, `Obejct`의 `equals`는 `return (this == obj);`로 구현되어 있기 때문에 `Pattern`의 `equals`를 호출해도 `==`로 비교한 것과 같은 것이다.
