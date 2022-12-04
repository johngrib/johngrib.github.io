---
layout  : wiki
title   : Clojure Equality
summary :
date    : 2021-12-07 21:04:40 +0900
updated : 2021-12-25 20:30:52 +0900
tag     : clojure
resource: 52/867735-9C47-4179-8C65-1222C17EF81E
toc     : true
public  : true
parent  : [[/clojure/guide]]
latex   : false
---
* TOC
{:toc}

## Equality: Clojure guide 문서 번역

원문: [Equality]( https://clojure.org/guides/equality )

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
- 둘 다 같은 '카테고리'에 포함된 number 이면서 같은 값을 갖는다면, '카테고리'는 다음과 같음.
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

Clojure의 `==`는 number 전용입니다.

- `==`는 카테고리가 다른 number에 대해서도 사용할 수 있습니다. (가령 정수 `0`과 `0.0`도 비교가 가능)
- 만약 비교 대상인 값이 number가 아니라면 예외가 던져집니다.

>
If you call `=` or `==` with more than two arguments, the result will be `true` when all consecutive pairs are `=` or `==`.
`hash` is consistent with `=`, with the exceptions given below.

- 만약 `=`이나 `==`를 호출할 때 2개보다 많은 인자를 주면, 각각의 연속적인 두 값이 `=`이나 `==`인 경우에만 `true`를 리턴합니다.
- `hash`는 `=`와 일관성있게 작동하지만, 아래와 같은 예외 사항들이 있습니다.

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
- collection을 `=`로 비교할 때, collection 내부의 number들도 `=`로 비교됩니다. 따라서 앞에서 언급한 number 카테고리들이 이 작업에서 중요합니다.
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

- `hash`는 number에 대해서는 `=`와 똑같습니다.
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

그러나 `=`는 두 수가 같다 하더라도 항상 `true`를 리턴하지는 않습니다.

```clojure
user> (= 2 2.0)
false
```

>
If you want to test for numeric equality across different numeric categories, use `==`.
See the section [Numbers]( https://clojure.org/guides/equality#numbers ) below for details.

- 만약 각각 다른 number 카테고리에 대해 값이 같은지를 확인하고 싶다면 `==`를 사용하세요.
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

- number와 Clojure collection을 제외하고 Clojure의 `=`는 Java의 `equals`와 똑같이 작동합니다.
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

- Java의 `equals`는 두 number에 대해 타입과 값이 같은 경우에만 `true`를 리턴합니다.
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

- Clojure의 `=`는 number에 대해 '카테고리'와 값이 같다면 `true`를 리턴합니다. 카테고리는 다음과 같습니다.
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
    - 산술 연산을 할 때 ratio는 값이 정수인 경우에, 자동으로 integer로 변환됩니다.
- 따라서 `Ratio` 타입인 Clojure number는 어떤 정수와도 같지 않습니다.
    - 그래서 `=`는 ratio와 integer를 비교할 때 항상 올바른 대답(`false`)을 리턴합니다.

>
Clojure also has `==` that is only useful for comparing numbers.
It returns `true` whenever `=` does.
It also returns `true` for numbers that are numerically equal, even if they are in different categories.
Thus `(= 1 1.0)` is false, but `(== 1 1.0)` is `true`.

- Clojure에서도 `==`를 사용하여 수를 비교할 수 있습니다.
- `=`가 `true`를 리턴한다면 `==`도 `true`를 리턴합니다.
- `==`는 number들의 값이 같다면, 카테고리가 다르더라도 `true`를 리턴합니다.
    - 그러므로 `(= 1 1.0)`은 `false`를 리턴하고, `(== 1 1.0)`은 `true`를 리턴합니다.

>
Why does `=` have different categories for numbers, you might wonder?
It would be difficult (if it is even possible) to make `hash` consistent with `=` if it behaved like `==` (see section [Equality and hash]( https://clojure.org/guides/equality#equality_and_hash )).
Imagine trying to write `hash` such that it was guaranteed to return the same hash value for all of `(float 1.5)`, `(double 1.5)`, `BigDecimal` values `1.50M`, `1.500M`, etc. and the ratio `(/ 3 2)`.

- 그렇다면 `=`는 왜 number와 number를 비교할 때 카테고리를 사용할까요?
- `hash`가 `==`와 같은 방식으로 작동하는 것을 보장하는 것이 어려울 수 있기 때문입니다.
    - [Equality and hash]( https://clojure.org/guides/equality#equality_and_hash ) 문서를 참고하세요.
    - `(float 1.5)`, `(double 1.5)`, `BigDecimal` 타입인 값 `1.50M`, `1.500M` 같은 모든 number들과 비율 `(/ 3 2)`에 대해 같은 해시 값을 리턴하도록 `hash` 함수를 만든다고 생각해 봅시다.

>
Clojure uses `=` to compare values for equality when they are used as elements in sets, or keys in maps.
Thus Clojure’s numeric categories come into play if you use sets with numeric elements or maps with numeric keys.

- Clojure는 `=`를 사용해서 set의 원소나 map의 key로 사용되는 value를 비교합니다.
- 그러므로, number 원소가 있는 set이나 number key가 있는 map을 사용한다면 Clojure의 수 카테고리가 사용됩니다.

#### Floating point numbers are usually approximations

부동소수점은 일반적으로 근사값입니다.

>
Note that floating point values might behave in ways that surprise you, if you have not learned of their approximate nature before.
They are often approximations simply because they are represented with a fixed number of bits, and thus many values cannot be represented exactly and must be approximated (or be out of range).
This is true for floating point numbers in any programming language.

부동소수점의 접근적 특성을 모르고 있다면 관련 동작 때문에 당황할 수 있습니다.
부동소수점은 고정된 수의 비트로 표현되므로, 정확한 값을 표현할 수 없는 수들도 있습니다.
따라서 그런 종류의 수에 대해서는 근사값으로 표현하게 됩니다.(또는 범위를 넘어서게 됩니다.)
이는 어느 프로그래밍 언어에서건 부동소수점을 다룬다면 발생하는 일입니다.

```clojure
user> (def d1 (apply + (repeat 100 0.1)))
#'user/d1
user> d1
9.99999999999998
user> (== d1 10.0)
false
```

>
There is a whole field called [Numerical Analysis]( https://en.wikipedia.org/wiki/Numerical_analysis ) dedicated to studying algorithms that use numerical approximation.
There are libraries of Fortran code that are used because their order of floating point operations is carefully crafted to give guarantees on the difference between their approximate answers and the exact answers.
["What Every Computer Scientist Should Know About Floating-Point Arithmetic"]( http://docs.oracle.com/cd/E19957-01/806-3568/ncg_goldberg.html ) is good reading if you want quite a few details.

- 수치 근사(numerical approximation) 사용 알고리즘을 연구하는 [Numerical Analysis]( https://en.wikipedia.org/wiki/Numerical_analysis )라는 분야가 있습니다.
- 그 분야에서는 부동소수점 연산의 결과에 대해 근사값과 정확한 값 사이의 차이를 유의미하게 보장하기 위해 부동 소수점 연산의 순서를 조심스럽게 조정한 Fortran 코드 라이브러리들이 있습니다.
- ["What Every Computer Scientist Should Know About Floating-Point Arithmetic"]( http://docs.oracle.com/cd/E19957-01/806-3568/ncg_goldberg.html )은 이와 관련된 좋은 문서입니다.

>
If you want exact answers for at least some kinds of problems, ratios or BigDecimals might suit your needs.
Realize that these require variable amounts of memory if the number of digits required grow (e.g. after many arithmetic operations), and significantly more computation time.
They also won’t help if you want exact values of pi or the square root of 2.

- 몇 가지 종류의 문제에 대해 정확한 값이 필요하다면, ratio 또는 BigDecimal이 적합할 수 있습니다.
- (다양한 연산을 거친 후라던가) 수의 자릿수가 꽤 증가하게 되면, 메모리도 많이 필요하고 계산에도 많은 시간이 필요하게 됩니다.
- 물론 ratio나 BigDecimal도 π나 루트 2의 정확한 값은 제공해줄 수 없습니다.

#### Floating point "Not A Number"

부동소수점 NaN에 대하여

>
Clojure uses the underlying Java double-size floating point numbers (64-bit) with representation and behavior defined by a standard, IEEE 754.
There is a special value [NaN]( http://en.wikipedia.org/wiki/NaN ) ("Not A Number") that is not even equal to itself. Clojure represents this value as the symbolic value `##NaN`.

- Clojure는 IEEE 754 표준에 정의된 동작을 구현한 Java의 64비트 배정밀도 부동 소수점을 사용합니다.
- IEEE 754에는 NaN ("Not A Number")라는 특수한 값이 있는데, 이 값은 자기 자신을 포함해 어떤 값과도 같지 않습니다.
    - Clojure는 이 값을 `##NaN`이라는 심볼로 표현합니다.

```clojure
user> (Math/sqrt -1)
##NaN
user> (= ##NaN ##NaN)
false
user> (== ##NaN ##NaN)
false
```

>
This leads to some odd behavior if this "value" appears in your data.
While no error occurs when adding `##NaN` as a set element or a key in a map, you cannot then search for it and find it.
You also cannot remove it using functions like `disj` or `dissoc`.
It will appear normally in sequences created from collections containing it.

- 이로 인해 이 "값"이 데이터에 포함되어 있을 때 이상 동작이 발생할 수 있습니다.
- `##NaN`을 set에 원소로 추가하거나 map의 키로 사용해도 에러는 발생하지 않는데, 일단 집어넣으면 찾을 수가 없습니다.
    - `disj`또는 `dissoc`와 같은 함수를 사용해도 제거할 수 없습니다.
    - 이 문제는 이 값을 포함하고 있는 collection에서 sequence를 생성하는 경우에 발생할 수 있습니다.

```clojure
user> (def s1 #{1.0 2.0 ##NaN})
#'user/s1
user> s1
#{2.0 1.0 ##NaN}
user> (s1 1.0)
1.0
user> (s1 1.5)
nil
user> (s1 ##NaN)
nil             ; cannot find ##NaN in a set, because it is not = to itself

user> (disj s1 2.0)
#{1.0 ##NaN}
user> (disj s1 ##NaN)
#{2.0 1.0 ##NaN}    ; ##NaN is still in the result!
```

>
In many cases, collections that contain `##NaN` will not be `=` to another collection, even if they look like they should be, because `(= ##NaN ##NaN)` is `false`:

`##NaN`을 포함하는 collection이 다른 collection과 `=`일 것 같은데 아닌 경우가 많습니다.
왜냐하면 `(= ##NaN ##NaN)`은 `false`이기 때문입니다.

```clojure
user> (= [1 ##NaN] [1 ##NaN])
false
```

>
Oddly enough, there are exceptions where collections contain `##NaN` that look like they should be `=`, and they are, because `(identical? ##NaN ##NaN)` is `true`:

그런데 `(identical? ##NaN ##NaN)`은 `true`이기 때문에,
collection에 `##NaN`이 포함되어 있어도 `=`가 성립하는 예외적인 경우도 있습니다.

```clojure
user> (def s2 #{##NaN 2.0 1.0})
#'user/s2
user> s2
#{2.0 1.0 ##NaN}
user> (= s1 s2)
true
```

>
Java has a special case in its `equals` method for floating point values that makes `##NaN` equal to itself.
Clojure `=` and `==` do not.

- Java는 부동소수점 타입에서 제공하는 `equals` 메서드를 통해 `##NaN`이 자기 자신과 같은지 확인할 수 있습니다.
- Clojure의 `=`와 `==`는 그렇지 않습니다.

```clojure
user> (.equals ##NaN ##NaN)
true
```

### Equality and hash

>
Java has `equals` to compare pairs of objects for equality.
>
Java has a method `hashCode` that is _consistent_ with this notion of equality (or is documented that it should be, at least).
This means that for any two objects `x` and `y` where `equals` is `true`, `x.hashCode()` and `y.hashCode()` are equal, too.

- Java는 두 객체의 같음을 비교하는 `equals` 메서드를 제공합니다.
- Java는 `hashCode` 메서드도 제공하는데, 일관성을 갖춘 논리적 일치를 의미합니다.
    - 즉, 두 객체 `x`와 `y`에 대해 `equals`가 `true`라면, `x.hashCode()`와 `y.hashCode()`는 리턴값이 같습니다.

>
This hash consistency property makes it possible to use `hashCode` to implement hash-based data structures like maps and sets that use hashing techniques internally.
For example, a hash table could be used to implement a set, and it will be guaranteed that objects with different `hashCode` values can be put into different hash buckets, and objects in different hash buckets will never be equal to each other.

- hash의 일관성으로 인해 `hashCode`를 사용해 map이나 set 같은 hash 기반의 자료구조를 사용하는 것이 가능해집니다.
- 예를 들어, hash 테이블을 써서 set을 구현할 수 있습니다.
    - `hashCode` 값이 다르면 다른 hash bucket에 넣으면 됩니다. 다른 hash bucket에 담긴 객체들은 서로 다르다는 것이 보장됩니다.

>
Clojure has `=` and `hash` for similar reasons.
Since Clojure `=` considers more pairs of things equal to each other than Java `equals`, Clojure `hash` must return the same hash value for more pairs of objects.
For example, `hash` always returns the same value regardless of whether a sequence of `=` elements is in a sequence, vector, list, or queue:

- 비슷한 이유로 Clojure도 `=`와 `hash`를 제공합니다.
- Clojure의 `=`는 Java의 `equals`보다 더 많은 것들을 서로 같다고 판단합니다.
    - 따라서 Clojure의 `hash`도 더 많은 객체에 대해 같은 hash 값을 리턴해야 합니다.
- 예를 들어 sequence, vector, list, queue에 대해서는 (자료구조 상관 없이) `hash`는 항상 같은 값을 리턴해야 합니다.

```clojure
user> (hash ["a" 5 :c])
1698166287
user> (hash (seq ["a" 5 :c]))
1698166287
user> (hash '("a" 5 :c))
1698166287
user> (hash (conj clojure.lang.PersistentQueue/EMPTY "a" 5 :c))
1698166287
```

>
However, since `hash` is not consistent with `=` when comparing Clojure immutable collections with their non-Clojure counterparts, mixing the two can lead to undesirable behavior, as shown in the examples below.

그러나 `hash`는 `=`와 일치하지 않으므로, Clojure의 immutable collection과 그에 대응되는 non-Clojure collection을 비교할 때 의도하지 않은 동작이 나타날 수 있습니다.

```clojure
user=> (def java-list (java.util.ArrayList. [1 2 3]))
#'user/java-list
user=> (def clj-vec [1 2 3])
#'user/clj-vec

;; They are =, even though they are different classes
user=> (= java-list clj-vec)
true
user=> (class java-list)
java.util.ArrayList
user=> (class clj-vec)
clojure.lang.PersistentVector

;; Their hash values are different, though.
;; = 로 비교했을 때에는 같지만, hash값은 다르다.

user=> (hash java-list)
30817
user=> (hash clj-vec)
736442005

;; If java-list and clj-vec are put into collections that do not use
;; their hash values, like a vector or array-map, then those
;; collections will be equal, too.
;; vector나 array-map처럼 집어넣을 때 hash값을 사용하지 않는 collection이므로 같다고 평가된다.

user=> (= [java-list] [clj-vec])
true
user=> (class {java-list 5})
clojure.lang.PersistentArrayMap
user=> (= {java-list 5} {clj-vec 5})
true
user=> (assoc {} java-list 5 clj-vec 3)
{[1 2 3] 3}

;; However, if java-list and clj-vec are put into collections that do
;; use their hash values, like a hash-set, or a key in a hash-map,
;; then those collections will not be equal because of the different
;; hash values.
;; 그러나 hash-set이나 hash-map처럼 집어넣을 때 hash값을 사용하는 collection이라면 같지 않다고 평가된다.

user=> (class (hash-map java-list 5))
clojure.lang.PersistentHashMap
user=> (= (hash-map java-list 5) (hash-map clj-vec 5))
false               ; sorry, not true
user=> (= (hash-set java-list) (hash-set clj-vec))
false               ; also not true

user=> (get (hash-map java-list 5) java-list)
5
user=> (get (hash-map java-list 5) clj-vec)
nil                 ; you were probably hoping for 5

user=> (conj #{} java-list clj-vec)
#{[1 2 3] [1 2 3]}          ; you may have been expecting #{[1 2 3]}
user=> (hash-map java-list 5 clj-vec 3)
{[1 2 3] 5, [1 2 3] 3}      ; I bet you wanted {[1 2 3] 3} instead
```

>
Most of the time you use maps in Clojure, you do not specify whether you want an array map or a hash map.
By default array maps are used if there are at most 8 keys, and hash maps are used if there are over 8 keys.
Clojure functions choose the implementation for you as you do operations on the maps.
Thus even if you tried to use array maps consistently, you are likely to frequently get hash maps as you create larger maps.

- Clojure에서 map을 사용할 때, 대부분의 경우 array map을 쓸 것인지 hash map을 쓸 것인지를 지정하지 않습니다.
- 기본적으로 key가 최대 8개라면 array map이, 8개를 초과하면 hash map이 사용됩니다.
- Clojure 함수는 map 연산을 사용할 때 자동으로 어떤 구현체를 사용할지 알아서 결정합니다.
- 그러므로 일관성있게 array map만 사용하려 시도해도, 더 큰 규모의 map을 생성하게 되면 종종 hash map을 갖게 될 것입니다.

>
We do _not_ recommend trying to avoid the use of hash-based sets and maps in Clojure.
They use hashing to help achieve high performance in their operations.
Instead we would recommend avoiding the use of non-Clojure collections as parts within Clojure collections.
Primarily this advice is because most such non-Clojure collections are mutable, and mutability often leads to subtle bugs.
Another reason is the inconsistency of `hash` with `=`.

- Clojure에서 hash 기반의 set과 map의 사용을 피하는 것을 추천하지 않습니다.
- 그런 자료구조들은 hashing을 통해 높은 성능을 보장하기 때문입니다.
- 다만, non-Clojure collection을 Clojure collection에 포함시키는 방식으로 사용하는 것은 권장하지 않습니다.
    - non-Clojure collection은 변경 가능한 경우가 많으며, 변경 가능성이 종종 버그의 원인이 되기 때문입니다.
    - 그리고 `hash`와 `=`의 비일치도 원인입니다.

>
Similar behavior occurs for Java collections that implement `java.util.List`, `java.util.Set`, and `java.util.Map`, and any of the few kinds of values for which Clojure’s `hash` is not consistent with `=`.

Java collection(`java.util.List`, `java.util.Set`, `java.util.Map` 같은 것들)과는 달리 Clojure의 `hash`는 몇몇 값들에 대해 `=`와 일치하지 않습니다.

>
If you use hash-inconsistent values as parts within _any_ Clojure collection, even as elements in a sequential collection like a list or vector, those collections become hash-inconsistent with each other, too.
This occurs because the hash value of collections is calculated by combining the hash values of their parts.

- 만약 어떤 Clojure collection에서 hash-inconsistent 값을 사용한다면, (그 collection이 list나 vector 같은 sequential collection이라 하더라도) 해당 collection은 다른 collection과 hash-inconsistent 하게 될 것입니다.
- 이는 collection의 hash값이 collection의 부분의 hash값을 조합해 계산되기 때문에 발생하는 일입니다.

#### Historical notes on hash inconsistency for non-Clojure collections

>
You are likely wondering _why_ `hash` is not consistent with `=` for non-Clojure collections.
Non-Clojure collections have used Java’s `hashCode` method long before Clojure existed.
When Clojure was initially developed, it used the same formula for calculating a hash function from collection elements as `hashCode` did.
>
Before the release of Clojure 1.6.0 it was discovered that this use of `hashCode` for Clojure’s `hash` function can lead to many hash collisions when small collections are used as set elements or map keys.
>
For example, imagine a Clojure program that represents the contents of a 2-dimensional grid with 100 rows and 100 columns using a map with keys that are vectors of two numbers in the range [0, 99].
There are 10,000 such points in this grid, so 10,000 keys in the map, but `hashCode` only gives 3,169 different results.

- non-Clojure collection에 대해 `hash`는 `=`가 일치하지 않는 이유가 궁금할 것입니다.
- Clojure가 탄생하기 오래전부터, non-Clojure collection은 Java의 `hashCode` 메소드를 사용해왔습니다.
- Clojure가 처음 개발되었을 때, Clojure는 collection의 원소들을 통해 hash값을 계산할 때 `hashCode`와 동일한 방법을 사용했었습니다.
- Clojure 1.6.0을 릴리즈하기 전에, `hashCode`를 Clojure의 `hash` 함수로 사용하면, 작은 collection을 set의 원소나 map의 key로 사용할 때 hash 충돌이 발생할 수 있다는 것을 발견하게 됐습니다.
- 예를 들어, 100 * 100 사이즈의 그리드를 가진 2차원 그리드를 표현하는 Clojure 프로그램이 있다고 생각해 봅시다.
    - 이 프로그램은 map을 사용하며, 이 map은 [0, 99] 범위의 두 수를 가진 vector를 key로 쓰고 있습니다.
    - 이 그리드에는 10,000 개의 포인트가 있으므로, map 에도 10,000 개의 key가 있습니다.
        - 그런데 `hashCode`는 3,169 개의 결과만 생산합니다.

```clojure
user=> (def grid-keys (for [x (range 100), y (range 100)]
                        [x y]))
#'user/grid-keys
user=> (count grid-keys)
10000
user=> (take 5 grid-keys)
([0 0] [0 1] [0 2] [0 3] [0 4])
user=> (take-last 5 grid-keys)
([99 95] [99 96] [99 97] [99 98] [99 99])
user=> (count (group-by #(.hashCode %) grid-keys))
3169
```

>
Thus there are an average of 10,000 / 3,169 = 3.16 collisions per hash bucket if the map uses the default Clojure implementation of a hash-map.
>
The Clojure developers [analyzed]( https://archive.clojure.org/design-wiki/display/design/Better%2Bhashing.html ) several alternate hash functions, and chose one based on the Murmur3 hash function, which has been in use since Clojure 1.6.0.
It also uses a different way than Java’s `hashCode` does to combine the hashes of multiple elements in a collection.

- 따라서 hash-map으로 기본 Clojure 구현체를 사용한다면 hash bucket에서는 평균적으로 10,000 / 3,169 = 3.16 개의 충돌이 발생합니다.
- Clojure 언어의 개발자들은 대안으로 여러 다른 hash 함수를 [연구]( https://archive.clojure.org/design-wiki/display/design/Better%2Bhashing.html )했습니다.
    - 그리고 Murmur3 hash 함수 기반의 hash 함수를 선택했고, 이는 Clojure 1.6.0 이후에 적용되었습니다.
    - 이 hash 함수는 Java의 `hashCode`와 다른 방법으로 collection의 여러 원소의 hash를 조합합니다.

>
At that time, Clojure could have changed `hash` to use the new technique for non-Clojure collections as well, but it was judged that doing so would significantly slow down a Java method called `hasheq`, used to implement `hash`.
See [CLJ-1372]( https://clojure.atlassian.net/browse/CLJ-1372 ) for approaches that have been considered so far, but as of this time no one has discovered a competitively fast way to do it.

- 그 무렵의 Clojure는 non-Clojure collection에서도 새로운 기법으로 바뀐 `hash`를 사용하도록 할 수 있었지만, 그렇게 하면 `hash`를 구현하는데 사용되는 `hasheq`라는 Java 메소드가 너무 느려질 것이라 판단했습니다.
- 지금까지 고려한 접근 방법에 대해서는 [CLJ-1372]( https://clojure.atlassian.net/browse/CLJ-1372 ) 문서를 참고해 주세요. 아직까지는 아무도 더 빠른 방법을 찾지 못했습니다.

#### Other cases of hash inconsistent with =

`hash`와 `=`가 불일치하는 그 외의 경우들

>
For some Float and Double values that are `=` to each other, their `hash` values are inconsistent:

몇몇 Float과 Double 값의 경우 `=`인데도, `hash` 값이 불일치합니다.

```clojure
user> (= (float 1.0e9) (double 1.0e9))
true
user> (map hash [(float 1.0e9) (double 1.0e9)])
(1315859240 1104006501)
user> (hash-map (float 1.0e9) :float-one (double 1.0e9) :oops)
{1.0E9 :oops, 1.0E9 :float-one}
```

>
You can avoid the `Float` vs `Double` hash inconsistency by consistently using one or the other types in floating point code. Clojure defaults to doubles for floating point values, so that may be the most convenient choice.
>
Rich Hickey has decided that changing this inconsistency in hash values for types `Float` and `Double` is out of scope for Clojure (mentioned in a comment of [CLJ-1036]( https://clojure.atlassian.net/browse/CLJ-1036 )).
Ticket [CLJ-1649]( https://clojure.atlassian.net/browse/CLJ-1649 ) has been filed suggesting a change that `=` always return false when comparing floats to doubles, which would make `hash` consistent with `=` by eliminating the restriction on `hash`, but there is no decision on that yet.

- 부동소수점을 다루는 경우 그냥 하나의 타입만 사용해서 `Float`과 `Double` 사이에 나타나는 이런 `hash` 불일치를 피할 수 있습니다.
- Clojure은 부동소수점에 기본적으로 `Double`을 사용하고 있으므로, 기본을 사용하는 것이 가장 편한 선택일 것입니다.
- Rich Hickey는 `Float`과 `Double`의 hash 불일치를 변경하는 것이 Clojure 언어의 범위를 벗어나는 것이라 판단했습니다.
    - [CLJ-1036]( https://clojure.atlassian.net/browse/CLJ-1036 )에서 언급된 댓글 참고.
- [CLJ-1649]( https://clojure.atlassian.net/browse/CLJ-1649 ) 티켓은 `=`가 float과 double을 비교할 때 항상 `false`를 리턴하는 것을 제안하고 있습니다. 이는 `hash`의 제약을 제거하여 `=`과 일관성을 갖도록 만들기 위해서입니다.
    - 그러나 이에 대해서는 아직 결정된 바가 없습니다.

### Defining equality for your own types

>
See the code of the projects below for examples of how to do this, and much more. In particular, the Java methods `equals` and `hashCode` from standard Java objects, and the Clojure Java methods `equiv` and `hasheq` are the most relevant for how `=` and `hash` behave.
>
- [org.clojure/data.priority-map]( https://github.com/clojure/data.priority-map )
- [org.flatland/ordered]( https://github.com/clj-commons/ordered ) but note that it needs a change so that its custom ordered map data structure is not `=` to any Clojure record: [PR #34]( https://github.com/clj-commons/ordered/pull/34 )

- 아래의 프로젝트 코드를 예제로 참고하세요.
- 특히, 기본 Java 객체의 `equals`와 `hashCode` 메소드와 Clojure Java 객체의 `equiv`와 `hasheq` 메소드가 어떻게 `=`와 `hash`의 동작과 관련이 있는지가 중요합니다.
    - [org.clojure/data.priority-map]( https://github.com/clojure/data.priority-map )
    - [org.flatland/ordered]( https://github.com/clj-commons/ordered )
        - 하지만 커스텀 ordered map 자료구조가 다른 어떤 Clojure record와 `=`하지 않도록 수정될 필요가 있습니다. [PR #34]( https://github.com/clj-commons/ordered/pull/34 )

### References

>
The paper ["Equal Rights for Functional Objects, or, the More Things Change, The More They Are the Same"]( http://citeseerx.ist.psu.edu/viewdoc/download;jsessionid=1?doi=10.1.1.23.9999&rep=rep1&type=pdf ) by Henry Baker includes code written in Common Lisp for a function `EGAL` that was an inspiration for Clojure’s `=`.
The idea of "deep equality" making sense for immutable values, but not as much sense for mutable objects (unless the mutable objects are the same object in memory), is independent of programming language.
>
Some differences between `EGAL` and Clojure’s `=` are described below.
These are fairly esoteric details about the behavior of `EGAL`, and are not necessary to know for an understanding of Clojure’s `=`.

- Henry Baker의 논문 "Equal Rights for Functional Objects, or, the More Things Change, The More They Are the Same"에는 Common Lisp의 `EGAL` 함수 코드가 포함되어 있습니다. Clojure의 `=`는 이 함수 코드에 영감을 받았습니다.
- "deep equality"라는 아이디어는 immutable 값에 대해서만 의미가 있지만, mutable 객체(비교 대상인 mutable 객체들이 메모리상의 같은 객체가 아닌 경우)에 대해서는 별로 의미가 없는 의미가 없으며 프로그래밍 언어와는 독립적인 개념입니다.
- `EGAL`과 Clojure의 `=`의 몇몇 차이점은 아래에서 언급합니다.
    - 이 정보들은`EGAL`의 동작에 대한 상당히 난해한 내용이며, Clojure의 `=`를 이해하기 위해 굳이 알아야 할 것은 아닙니다.

#### Comparing mutable collections to other things

>
`EGAL` is defined to be `false` when comparing mutable objects to anything else, unless that other thing is the same identical mutable object in memory.
>
As a convenience, Clojure’s `=` is designed to return `true` in some cases when comparing Clojure immutable collections to non-Clojure collections.
>
There is no Java method to determine whether an arbitrary collection is mutable or immutable, so it is not possible in Clojure to implement the intended behavior of `EGAL`, although one might consider `=` "closer" to `EGAL` if it always returned `false` when one of the arguments was a non-Clojure collection.

- `EGAL`은 mutable 객체를 다른 대상과 비교할 때 `false`를 리턴하도록 정의됐습니다.
    - 비교하는 mutable 객체가 메모리상에서 똑같은 객체인 경우는 제외됩니다.
- 편의상 Clojure의 `=`는 Clojure의 immutable collection과 non-Clojure collection을 비교하는 몇몇 케이스에서 `true`를 리턴하도록 설계되었습니다.
- 어떤 임의의 collection이 mutable인지 immutable인지를 판단해주는 Java 메소드는 존재하지 않습니다.
    - 따라서, Clojure의 `=`는 이러한 경우에는 의도적으로 `EGAL`와 가까운 행동을 하도록 구현되었습니다.
    - 인자 중 하나가 non-Clojure collection인 경우에는 `=`는 `false`를 리턴합니다.

#### Lazy and pending values

>
Baker recommends that `EGAL` force lazy values when comparing them (see Section 3. J. "Lazy Values" in the "Equal Rights for Functional Objects" paper).
When comparing a lazy sequence to another sequential thing, Clojure’s `=` does force the evaluation of the lazy sequence, stopping if it reaches a non-`=` sequence element.
Chunked sequences, e.g. as produced by `range`, can cause evaluation to proceed a little bit further than that point, as is the case for any event in Clojure that causes evaluation of part of a lazy sequence.
>
Clojure’s `=` does not `deref` delay, promise, or future objects when comparing them.
Instead, it compares them via `identical?`, thus returning `true` only if they are the same identical object in memory, even if calling `deref` on them would result in values that were `=`.

- Baker는 `EGAL`로 값을 비교할 때 lazy 값을 강제하는 것을 추천합니다. ("Equal Rights for Functional Objects"의 Section 3. J. "Lazy Values" 참고)
- Clojure의 `=`는 lazy sequence를 다른 sequential 한 자료와 비교할 때 강제로 lazy sequence 평가를 하며, `=`이 아닌 sequence 원소에 도달하게 되면 정지합니다.
- `range`로 생산된 것 같은 chunked sequence는 lazy sequence를 부분적으로 평가하게 하는 Clojure의 모든 이벤트와 마찬가지로, 평가가 특정 포인트보다 더 진행될 수 있습니다.
- Clojure의 `=`는 delay, promise, future 객체에 대해 `deref`를 사용하지 않습니다.
    - 이러한 경우에 `=`는 `identical?`를 사용하여 메모리상에서 같은 객체인 경우에만 `true`를 리턴합니다.
    - 오히려 이런 값들에 `deref`를 호출하면 `=`의 결과값을 얻게 됩니다.

#### Closures

>
Baker describes in detail how `EGAL` can return `true` in some cases when comparing [closures]( https://en.wikipedia.org/wiki/Closure_(computer_programming) ) to each other (see Section 3. D. "Equality of Functions and Function-Closures" in the "Equal Rights for Functional Objects" paper).
>
When given a function or closure as an argument, Clojure’s `=` only returns `true` if they are `identical?` to each other.
>
Baker appeared to be motivated to define `EGAL` this way because of the prevalence in some Lisp family languages of using closures to represent objects, where those objects could contain mutable state, or immutable values (see the example below). Given that Clojure has multiple other ways of creating immutable values and mutable objects (e.g. records, reify, proxy, deftype), using closures to do so is uncommon.

- Baker는 closure들을 비교할 때 `EGAL`이 `true`를 리턴하는 경우에 대해 자세하게 설명합니다. ("Equal Rights for Functional Objects"의 Section 3. D. "Equality of Functions and Function-Closures" 참고)
- 함수나 closure가 인자로 전달된 경우, Clojure의 `=`는 `identical?`의 결과를 리턴합니다.
- Baker가 이런 방식의 `EGAL`을 정의하게 된 것은, 몇몇 Lisp 계열 언어에서 객체를 표현할 때 closure를 사용하는 유행에 영향을 받은 것으로 보입니다.
- 이런 객체들은 mutable 상태를 가질 수 있거나, immutable한 값을 가질 수 있습니다. (아래 예제 참고)
- 이를 통해 Clojure는 별로 일반적인 방법은 아니지만 closure를 사용해 immutable 값과 mutable 객체를 생성하는 다양한 방법을 갖게 되었습니다. (예: record, reify, proxy, deftype)

```clojure
(defn make-point [init-x init-y]
  (let [x init-x
        y init-y]
    (fn [msg]
      (cond (= msg :get-x) x
            (= msg :get-y) y
	    (= msg :get-both) [x y]
	    :else nil))))

user=> (def p1 (make-point 5 7))
#'user/p1
user=> (def p2 (make-point -3 4))
#'user/p2
user=> (p1 :get-x)
5
user=> (p2 :get-both)
[-3 4]
user=> (= p1 p2)
false             ; We expect this to be false,
                  ; because p1 and p2 have different x, y values
user=> (def p3 (make-point 5 7))
#'user/p3
user=> (= p1 p3)
false             ; Baker's EGAL would return true here.  Clojure
                  ; = returns false because p1 and p3 are not identical?
```

Original author: Andy Fingerhut

## 참고문헌

- [Equality (clojure.org]( https://clojure.org/guides/equality )

## 주석

[^identical-expr-code]: [richhickey의 "added identical?" commit]( https://github.com/clojure/clojure/commit/59fede97ed5a7bb8f2531dd9bcbd08f36139e4ad#diff-acddf4ef15ed09e1bfb6c1c3efc03396bcc49fcd223c395b11f6eb765e52f22cR1570-R1573 ) 참고.

[^java-pattern-equals]: Java `Pattern` 클래스에는 `equals` 메소드가 구현되어 있지 않다. 따라서 `Object`의 `equals`를 그대로 상속받아 사용하고 있는데, `Obejct`의 `equals`는 `return (this == obj);`로 구현되어 있기 때문에 `Pattern`의 `equals`를 호출해도 `==`로 비교한 것과 같은 것이다.
