---
layout  : wiki
title   : Comparators Guide
summary : 번역 중인 문서
date    : 2022-03-01 21:23:11 +0900
updated : 2022-03-01 22:56:16 +0900
tag     : clojure
toc     : true
public  : true
parent  : [[/clojure/guide]]
latex   : false
---
* TOC
{:toc}

## Comparators Guide: Clojure guide 문서 번역

원문: [Comparators Guide]( https://clojure.org/guides/comparators )

>
Note: This document describes Clojure 1.10 and Java 8, but applies to most other versions as well.

일러두기: 이 문서는 Clojure 1.10와 Java 8을 대상으로 하여 작성되었으나, 다른 버전을 사용하는 경우에도 적용됩니다.

### Summary

>
A comparator is a function that takes two arguments x and y and returns a value indicating the relative order in which x and y should be sorted.
It can be a 3-way comparator returning an integer, or a 2-way comparator returning a boolean.
See the DOs below for what the return values should be, depending upon the order of x and y.
>
In Clojure you need comparators for sorting a collection of values, or for maintaining a collection of values in a desired sorted order, e.g a [sorted-map](https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/sorted-map ), [sorted-set](https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/sorted-set ), or [priority-map](https://clojure.github.io/data.priority-map/#clojure.data.priority-map/priority-map ) (also known as a priority queue).
>
The default comparator [compare](https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/compare ) works well for sorting numbers in increasing order, or strings, keywords, or symbols, in [lexicographic](https://en.wikipedia.org/wiki/Lexicographical_order ) (i.e dictionary) order, and a few other cases.
See below for examples and more details.
>
If `compare` does not do what you want, you must provide your own comparator that does.
Each of the recommendations below is explained in more detail later in this document.

comparator는 두 개의 인자 x와 y를 받아서, x와 y를 정렬하기 위한 상대적인 순서를 표현하는 값을 리턴하는 함수입니다.
comparator는 두 가지가 있습니다. 정수 값을 리턴하는 3-way comparator와 boolean 값을 리턴하는 2-way comparator입니다.
x와 y의 순서에 따라 리턴값이 어떻게 달라지는지는 아래의 "comparator 구현을 위해 해야 할 일들"을 참고하세요.

Clojure에서는 컬렉션의 값들을 정렬하거나, 의도한 순서대로 컬렉션을 유지하기 위해 comparator를 필요로 하고 있습니다.
(예: [sorted-map](https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/sorted-map ), [sorted-set](https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/sorted-set ), [priority-map](https://clojure.github.io/data.priority-map/#clojure.data.priority-map/priority-map ) (priority-map은 우선 순위 큐라고도 부릅니다.))

디폴트 comparator인 `compare`는 숫자를 오름차순으로 정렬하거나, string, keyword, symbol 등을 lexicographic (사전순) 순서로 정렬하기 위한 용도로 잘 사용할 수 있습니다.
자세한 내용은 아래의 예제를 참고하세요.

만약 `compare`가 의도한 대로 작동하지 않는다면, 용도에 맞는 자신만의 comparator를 만들어야 합니다.
다음은 이를 위한 권장사항들이며, 각 항목에 대해 이 문서 전체에서 자세히 설명하게 됩니다.

>
**DOs:**
>
- Ensure that your comparators are based on a [total order](https://en.wikipedia.org/wiki/Total_order ) over the values you want to compare. It should be able to compare any pair of values that can appear in your data set, and determine which value should come first (or that they are equal).
- Write either a 3-way comparator or a boolean comparator:
    - A 3-way comparator takes 2 values, _x_ and _y_, and returns a Java 32-bit _int_ that is negative if _x_ comes before _y_, positive if _x_ comes after _y_, or 0 if they are equal. Use values -1, 0, and 1 if you have no reason to prefer other return values.
    - A boolean comparator takes 2 values, _x_ and _y_, and returns true if _x_ comes before _y_, or false otherwise (including if _x_ and _y_ are equal). `<` and `>` are good examples. `<=` and `>=` are not. Performance note: your boolean comparator may be called twice to distinguish between the "comes after" or "equals" cases.
- Reverse the sort by reversing the order that you give the arguments to an existing comparator.
- Compare equal-length Clojure vectors containing "sort keys" in order to do a multi-field comparison between values.
- Remove or replace occurrences of "Not a Number" (`##NaN`) from your data before sorting a collection, and avoid using them as parts of keys in a sorted collection.

**"comparator 구현을 위해 해야 할 일들"**

- 새로 만드는 comparator가, 비교하려는 값들의 [전순서 집합](https://en.wikipedia.org/wiki/Total_order )을 고려하고 있는지를 확인하세요. 그리고 데이터 셋에 들어 있을 수 있는 어떤 종류의 값이건 두 개가 주어졌을 때 작동해야 하며, 둘을 비교해서 어떤 값이 우선하는지도(또는 같은지를) 판별해 줄 수 있어야 합니다.
- comparator는 3-way comparator 또는 boolean comparator 둘 중 하나를 선택해 만들어야 합니다.
    - 3-way comparator는 2개의 값 `x`와 `y`를 받아서, 비교한 결과로 Java 32-bit `int` 값을 리턴합니다. `x`가 `y`보다 우선하면 -1, `y`가 `x`보다 우선하면 1, 둘이 같다면 0을 리턴합니다. 특별한 이유가 없다면 -1, 0, 1 말고 다른 값을 리턴하지 않도록 합니다.
    - boolean comparator는 2개의 값 `x`와 `y`를 받아서, `x`가 `y`보다 우선하면 true, 그 밖의 경우에는 false를 리턴합니다(둘이 같은 경우 포함). `<`와 `>`를 사용하는 것이 바람직하며, `<=`와 `>=`를 사용하지 마세요.
        - 성능 메모: boolean comparator는 두 값 중 하나가 우선하는지 아니면 똑같은지를 구별하기 위해 두 번 호출될 수도 있습니다. (3-way comparator는 한 번만으로도 구별이 됨)
- 역순 정렬을 할 때에는 이미 존재하는 comparator에 인자 순서를 뒤집어서 제공하는 방법을 사용하세요.
- 두 자료구조의 다중 필드를 비교하려면 "정렬 키"를 포함하는 같은 길이의 Clojure vector를 `compare` 함수에 넘기세요.
- 컬렉션을 정렬하기 전에 데이터에서 "Not a Number" (`##NaN`)을 제거하거나 다른 값으로 바꿔치우세요. 정렬된 컬렉션에서는 NaN을 키로 사용하지 마세요.

>
**DO NOTs:**
>
- Do not write a boolean comparator that returns true if the values are equal. Such a comparator is inconsistent. It will cause sorted collections to behave incorrectly, and sorting to give unpredictable orders.
- Do not use comparators for sorted sets and maps that treat two values as equal, unless you want at most one of those two values to appear in the sorted collection.
- Do not use subtraction when writing a 3-way comparator, unless you really know what you are doing.

**"comparator를 구현할 때 하면 안 되는 일들"**

- boolean comparator를 만들 때 두 값이 같은 경우에 `true`를 리턴하도록 하지 마세요. comparator를 이렇게 만들면 일관성 없게 정렬이 됩니다. 정렬이 올바르지 않게 작동하고, 예상하지 못한 순서로 정렬될 수 있습니다.
- sorted set과 sorted map을 만들기 위해 comparator를 사용하지 마세요. 이 자료구조들에서는 주어진 두 값이 같다고 처리되게 되면 둘 중 하나를 잃게 될 수 있습니다.
- 3-way comparator를 만들 때 상황을 정확히 파악하고 있는 게 아니라면, 두 값을 뺄셈해서 리턴값을 만들지 마세요.

>
See also:
[compare](https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/compare ),
[sort](https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/sort ),
[sort-by](https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/sort-by ),
[sorted-set](https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/sorted-set ),
[sorted-set-by](https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/sorted-set-by ),
[sorted-map](https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/sorted-map ),
[sorted-map-by](https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/sorted-map-by ),
[subseq](https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/subseq ),
[rsubseq](https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/rsubseq )

### Introduction

>
Here we describe the default sorting order provided by the function `compare`.
After that we give examples of other comparators, with some guidelines to follow and mistakes to avoid when writing your own.

여기에서는 `compare` 함수를 통한 기본적인 정렬에 대해 다룹니다.
그리고 나서 다른 comparator를 다루는 예제들을 살펴본 다음, 자신만의 comparator를 만들기 위한 방법과 실수를 방지하는 방법에 대해 알아봅니다.

### Clojure’s default comparator

>
If you do not specify your own comparator, sorting is done by a built-in function `compare`.
 `compare` works for many types of values, ordering them in one particular way:
>
- numbers are sorted in increasing numeric order, returning 0 if two numbers are numerically equal by `==`, even if `=` returns false. Exception: Even though `(== ##NaN x)` is false for all numbers _x_, even `##NaN`, `(compare ##NaN x)` is 0 for all numbers _x_, including `##NaN`.
- strings are sorted in [lexicographic order](http://en.wikipedia.org/wiki/Lexicographical_order ) (aka dictionary order) by their representation as sequences of UTF-16 code units. This is alphabetical order (case-sensitive) for strings restricted to the ASCII subset.
- symbols are sorted first by their namespace, if they have one, and if they have the same namespace, then by their name. Both the namespace and names are compared as their string representations would be, lexicographically. All symbols that do not have a namespace are sorted before any symbol with a namespace.
- keywords are sorted the same way as symbols, but an exception is thrown if you attempt to compare a keyword to a symbol.
- vectors are sorted from fewest elements to most elements, with [lexicographic ordering](http://en.wikipedia.org/wiki/Lexicographical_order ) among equal length vectors.
- Clojure refs are sorted in the order that they were created.
- All Java types implementing the [Comparable](https://docs.oracle.com/javase/8/docs/api/java/lang/Comparable.html ) interface such as characters, booleans, File, URI, and UUID are compared via their `compareTo` methods.
- `nil`: can be compared to all values above, and is considered less than anything else.


자신만의 comparator를 지정하지 않는다면, 빌트인 함수인 `comparator`가 정렬에 사용됩니다.
`compare`는 다양한 타입의 값에 대해서도 작동하며, 아래와 같은 방식으로 정렬을 수행합니다.

- 수는 오름차순으로 정렬됩니다.
    - `==`에 의해 두 수가 같다고 판별된 경우, `compare`는 `0`을 리턴합니다.
        - `=`가 `false`를 리턴하는 경우라도 `==`가 `true`이면, `compare`는 `0`을 리턴합니다.
    - 예외 케이스: 모든 수 `x`에 대해 `(== ##NaN x)`는 `false` 입니다. 심지어 `x`가 `##NaN`인 경우에도 그렇기 때문에 `(compare ##NaN x)`는 `0`을 리턴합니다.
- string은 UTf-16 코드 단위의 시퀀스로 표현하는 방식에 따라 사전 순서로 정렬됩니다. 이 순서는 ASCII의 하위 집합으로 제한된 문자열들의 대소문자를 구분하는 알파벳 순서입니다.
- symbol은 네임스페이스를 갖고 있다면 자신의 네임스페이스를 기준으로 먼저 정렬되며, 서로 같은 네임스페이스를 갖는 경우라면 symbol의 이름으로 비교를 합니다. 네임스페이스와 이름은 모두 string과 똑같이 사전 순서로 정렬됩니다. 네임스페이스가 없는 모든 symbol들은 네임스페이스가 있는 symbol보다 먼저 정렬됩니다.
- keyword는 symbol과 같은 방식으로 정렬되지만, keyword와 symbol을 비교하려고 하면 예외가 던져집니다.
- vector는 가장 적은 수의 엘리먼트를 가진 vector부터 가장 많은 엘리먼트를 가진 vector 순으로 정렬됩니다.
    - 만약 두 vector의 길이가 같다면, 사전 순서로 정렬됩니다.
- Clojure 참조(ref)는 생성된 순서대로 정렬됩니다.
- java.lang.Comparable을 구현하는 모든 Java 타입은 자신이 갖고 있는 `compareTo` 메서드를 통해 비교됩니다.
    - character, boolean, File, URI, UUID 같은 것들이 이에 해당됩니다.
- `nil`은 위의 모든 값들과 비교가 가능하며, 어떤 값보다도 작은 값으로 간주됩니다.


>
`compare` throws an exception if given two values whose types are "too different", e.g. it can compare integers, longs, and doubles to each other, but not strings to keywords or keywords to symbols.
It cannot compare lists, sequences, sets, or maps.
>
The examples below with `sort`, `sorted-set`, and `sorted-map` all use the default comparator.

`compare`는 주어진 두 값의 타입이 "너무 다르면" 예외를 던집니다.
예를 들어 `compare`는 integer, long, double은 서로 비교할 수 있지만, string은 keyword나 symbol과 비교할 수 없습니다.
그리고 list, sequence, set, map도 서로 비교할 수 없습니다.

아래는 디폴트 comparator를 써서 `sort`와 `sorted-set`, `sorted-map`을 사용하는 예제입니다.

```clojure
user> (sort [22/7 2.71828 ##-Inf 1 55 3N])
(##-Inf 1 2.71828 3N 22/7 55)

user> (sorted-set "aardvark" "boo" "a" "Antelope" "bar")
#{"Antelope" "a" "aardvark" "bar" "boo"}

user> (sorted-set 'user/foo 'clojure.core/pprint 'bar 'clojure.core/apply 'user/zz)
#{bar clojure.core/apply clojure.core/pprint user/foo user/zz}

user> (sorted-map :map-key 10, :amp [3 2 1], :blammo "kaboom")
{:amp [3 2 1], :blammo "kaboom", :map-key 10}

user> (sort [[-8 2 5] [-5 -1 20] [1 2] [1 -5] [10000]])
([10000] [1 -5] [1 2] [-8 2 5] [-5 -1 20])

user> (import '(java.util UUID))
java.util.UUID

user> (sort [(UUID. 0xa 0) (UUID. 5 0x11) (UUID. 5 0xb)])
(#uuid "00000000-0000-0005-0000-00000000000b"
 #uuid "00000000-0000-0005-0000-000000000011"
 #uuid "00000000-0000-000a-0000-000000000000")

user> (sort [:ns2/kw1 :ns2/kw2 :ns1/kw2 :kw2 nil])
(nil :kw2 :ns1/kw2 :ns2/kw1 :ns2/kw2)
```

>
An exception will be thrown if you call `compare` with different types.
Any numeric types above can be compared to each other, but not to a non-numeric type.
An exception will also be thrown if you use `compare` on a list, set, map, or any other type not mentioned above.
You must implement your own comparator if you wish to sort such values.

`compare`에 다른 타입들을 제공하면 예외를 던지게 됩니다.
위의 에제에 나온 모든 숫자 타입들은 서로 비교가 가능하지만, 숫자가 아닌 타입과는 비교할 수 없습니다.
`compare`를 list, set, map, 또는 위에서 언급하지 않은 다른 타입들과 사용하면 예외가 던져질 수도 있습니다.
이런 값들을 비교하기 위해서는 직접 comparator를 구현해야 합니다.

### Off-the-shelf comparators

>
First consider using well-tested comparators developed by others, especially if they are complex.
>
A perfect example of this would be sorting Unicode strings in different languages in orders specific to different locales. The Java [Collator](https://docs.oracle.com/javase/8/docs/api/java/text/Collator.html ) class and [ICU](http://site.icu-project.org/home#TOC-What-is-ICU- ) (International Components for Unicode) provide libraries for this.

직접 만들기 전에 먼저 다른 사람들이 개발해 잘 검증된 comparator를 사용하는 것을 고려해 보세요. 특히 구현이 복잡한 경우에는 다른 사람들이 만든 것을 꼭 검토해 보세요.

이런 복잡한 상황을 보여주는 아주 좋은 사례가 하나 있습니다. 다른 로케일에 대해 특정한 순서로 다른 언어의 Unicode 문자열을 정렬하는 문제입니다. Java [Collator](https://docs.oracle.com/javase/8/docs/api/java/text/Collator.html ) 클래스와 [ICU](http://site.icu-project.org/home#TOC-What-is-ICU- ) (International Components for Unicode)는 이런 문제를 해결할 수 있는 라이브러리를 제공합니다.

### Writing your own comparators

#### Reverse order

#### Multi-field comparators

#### Boolean comparators

#### General rules for comparators

### Mistakes to avoid

#### Be wary of "Not a Number" values as compared values in sorted collections

#### Comparators for sorted sets and maps are easy to get wrong

#### Beware using subtraction in a comparator

### Comparators that work between different types

