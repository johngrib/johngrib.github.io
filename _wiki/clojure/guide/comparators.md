---
layout  : wiki
title   : Comparators Guide
summary : 번역 중인 문서
date    : 2022-03-01 21:23:11 +0900
updated : 2022-03-03 00:30:28 +0900
tag     : clojure
toc     : true
public  : true
parent  : [[/clojure/guide]]
latex   : true
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

>
To sort numbers in decreasing order, simply write a comparator that calls `compare` with the arguments in the opposite order:

수를 내림차순으로 정렬하려면 간단하게 `compare`에 인자를 반대 순서로 넣어주는 comparator를 만들어 주면 됩니다.

```clojure
user> (sort [4 2 3 1])
(1 2 3 4)

user> (defn reverse-cmp [a b]
        (compare b a))
#'user/reverse-cmp

user> (sort reverse-cmp [4 3 2 1])
(4 3 2 1)
```

>
Such short functions are often written using Clojure’s #() notation, where the two arguments are %1 and %2, in that order.

이런 짧은 함수는 Clojure의 `#()` 표기법을 사용해 작성되곤 합니다. 인자가 `%1`, `%2` 순서대로 들어온다는 점을 이용하면 됩니다.

```clojure
user> (sort #(compare %2 %1) [4 3 2 1])
```

>
`reverse-cmp` will also work for all other types `compare` works for.

`reverse-cmp`는 `compare`가 동작하는 다른 타입들에서도 잘 동작할 것입니다.

#### Multi-field comparators

>
Because equal-length Clojure vectors are compared lexicographically, they can be used to do multi-field sorting on values like maps or records.
This only works if the fields are already sorted by `compare` in the order you wish (or the reverse of that).
>
First we will show a way to do it that does not compare vectors.

길이가 같은 Clojure vector들은 사전 순서로 비교되기 때문에, map이나 record와 같은 값들에 대한 다중 필드 정렬에 활용할 수 있습니다.
이 방식은 이미 `compare`를 통해 필드들이 원하는 순서대로 정렬된 경우(또는 역순으로)에만 작동합니다.

먼저 이 방법을 사용하지 않는 코드를 살펴봅시다.

```clojure
(def john1 {:name "John", :salary 35000.00, :company "Acme"})
(def mary  {:name "Mary", :salary 35000.00, :company "Mars Inc"})
(def john2 {:name "John", :salary 40000.00, :company "Venus Co"})
(def john3 {:name "John", :salary 30000.00, :company "Asteroids-R-Us"})
(def people [john1 mary john2 john3])

(defn by-salary-name-co [x y]
  ;; :salary values sorted in decreasing order because x and y
  ;; swapped in this compare.
  (let [c (compare (:salary y) (:salary x))]
    (if (not= c 0)
      c
      ;; :name and :company are sorted in increasing order
      (let [c (compare (:name x) (:name y))]
        (if (not= c 0)
          c
          (let [c (compare (:company x) (:company y))]
            c))))))

user> (pprint (sort by-salary-name-co people))
({:name "John", :salary 40000.0, :company "Venus Co"}
 {:name "John", :salary 35000.0, :company "Acme"}
 {:name "Mary", :salary 35000.0, :company "Mars Inc"}
 {:name "John", :salary 30000.0, :company "Asteroids-R-Us"})
```

>
Below is the shorter way, by comparing Clojure vectors.
It behaves exactly the same as above.
Note that as above, the field :salary is sorted in descending order because x and y are swapped.

다음은 Clojure vector를 사용해 정렬을 수행하는 더 짧은 코드입니다.
위의 에제와 완전히 똑같이 작동하죠.
물론 `:salary`는 x와 y가 바뀌어 있기 때문에 위에서와 같이 내림차순으로 정렬됩니다.

```clojure
(defn by-salary-name-co2 [x y]
    (compare [(:salary y) (:name x) (:company x)]
             [(:salary x) (:name y) (:company y)]))

user> (pprint (sort by-salary-name-co2 people))
({:name "John", :salary 40000.0, :company "Venus Co"}
 {:name "John", :salary 35000.0, :company "Acme"}
 {:name "Mary", :salary 35000.0, :company "Mars Inc"}
 {:name "John", :salary 30000.0, :company "Asteroids-R-Us"})
```

>
The above is fine for key values that are inexpensive to compute from the values being sorted.
If the key values are expensive to compute, it is better to calculate them once for each value.
See the "decorate-sort-undecorate" technique described in the documentation for [sort-by](https://github.com/jafingerhut/thalia/blob/master/doc/project-docs/clojure.core-1.5.1/clojure.core/sort-by.md ).

위의 방법은 정렬할 데이터셋에서 정렬에 필요한 비용이 싼 경우에는 괜찮습니다.
만약 키 값들을 비교하는 비용이 비싸다면, 각 값에 대해 한번씩만 계산할 수 있도록 하는 것이 좋습니다.
[sort-by](https://github.com/jafingerhut/thalia/blob/master/doc/project-docs/clojure.core-1.5.1/clojure.core/sort-by.md ) 문서에 설명되어 있는 "decorate-sort-undecorate" 기법을 참고하세요.

#### Boolean comparators

>
Java comparators are all 3-way, meaning they return a negative, 0, or positive integer depending upon whether the first argument should be considered less than, equal to, or greater than the second argument.
>
In Clojure, you may also use boolean comparators that return `true` if the first argument should come before the second argument, or `false` otherwise (i.e. should come after, or it is equal).
The function `<` is a perfect example, as long as you only need to compare numbers.
`>` works for sorting numbers in decreasing order.
Behind the scenes, when such a Clojure function `bool-cmp-fn` is "called as a comparator", Clojure runs code that works like this to return an _int_ instead:

Java의 comparator들은 모두 3-way comparator 입니다. 즉, 첫 번째 인자가 두 번째 인자보다 작으면 음수, 같으면 0, 크면 양수를 리턴합니다.

Java와 달리 Clojure에서는 boolean comparator를 사용할 수 있습니다.
boolean comparator는 첫 번째 인자가 두 번째 인자보다 앞에 와야 한다면 `true`를 리턴하고, 그렇지 않으면 `false`를 리턴합니다(`false`는 두 인자가 같은 경우도 포함합니다).
숫자 비교에 대해서 `<` 함수는 이에 대한 완벽한 예입니다.
한편 `>`는 수를 내림차순으로 정렬할 때 사용합니다.

사실 이런 작업들의 이면에서는, `bool-cmp-fn` 같은 Clojure 함수가 "comparator로 호출될 때" Clojure는 아래와 같이 작동하는 코드를 실행해서 `boolean`이 아니라 `int`를 리턴합니다.

```clojure
(if (bool-cmp-fn x y)
  -1     ; x < y
  (if (bool-cmp-fn y x)  ; note the reversed argument order
    1    ; x > y
    0))  ; x = y
```

>
You can see this by calling the compare method of any Clojure function.
Below is an example with a custom version `my-<` of `<` that prints its arguments when it is called, so you can see the cases where it is called more than once:

Clojure의 어떤 비교 메소드를 호출하더라도 이와 같이 작동하는 것을 확인할 수 있을 것입니다.
호출될 때 `<`의 인자와 결과를 화면에 출력하도록 만든 `my-<` 함수를 사용해 이런 동작을 확인해 봅시다.

```clojure
user> (defn my-< [a b]
        (println "(my-<" a b ") returns " (< a b))
        (< a b))
#'user/my-<

;; (. o (compare a b)) calls the method named compare for object
;; o, with arguments a and b.  In this case the object is the
;; Clojure function my-<
user> (. my-< (compare 1 2))
(my-< 1 2 ) returns  true
-1
user> (. my-< (compare 2 1))
(my-< 2 1 ) returns  false
(my-< 1 2 ) returns  true
1
user> (. my-< (compare 1 1))
(my-< 1 1 ) returns  false
(my-< 1 1 ) returns  false
0

;; Calling a Clojure function in the normal way uses its invoke
;; method, not compare.
user> (. my-< (invoke 2 1))
(my-< 2 1 ) returns  false
false
```

>
See Clojure source file [src/jvm/clojure/lang/AFunction.java](https://github.com/clojure/clojure/blob/clojure-1.10.0/src/jvm/clojure/lang/AFunction.java#L50 ) method `compare` if you want all the details.

이에 대한 자세한 내용을 알고 싶다면 Clojure 소스 파일 [src/jvm/clojure/lang/AFunction.java](https://github.com/clojure/clojure/blob/clojure-1.10.0/src/jvm/clojure/lang/AFunction.java#L50 )의 `compare` 메소드를 확인해 보세요.

#### General rules for comparators

>
Any comparator, whether 3-way or boolean, should return answers consistent with a [total order](https://en.wikipedia.org/wiki/Total_order ) on the values you want to compare.
>
A total order is simply an ordering of all values from smallest to largest, where some groups of values can all be equal to each other.
Every pair of values must be comparable to each other (i.e. no "I do not know how to compare them" answers from the comparator).
>
For example, you can order all fractions written in the form _m/n_ for integers m and n from smallest to largest, in the usual way this is done in mathematics.
Many of the fractions would be equal to each other, e.g. _1/2 = 2/4 = 3/6_.
A comparator implementing that total order should behave as if they are all the same.
>
A 3-way comparator `(cmp a b)` should return a negative, positive, or 0 _int_ if _a_ is before, after, or is considered equal to b in the total order, respectively.
>
A boolean comparator `(cmp a b)` should return true if _a_ is before _b_ in the total order, or false if _a_ is after or considered equal to _b_.
That is, it should work like `<` does for numbers.
As explained later, it should not behave like `<=` for numbers (see section "Comparators for sorted sets and maps are easy to get wrong").

3-way가 되었건 boolean이 되었건, comparator는 비교하는 값들을 입력받았을 때 전순서 집합에 어긋나지 않는 값을 리턴해야 합니다.

전순서 집합은 단순히 가장 작은 값부터 가장 큰 값까지를 순서대로 정렬한 것입니다.
이 때 몇몇 값들은 서로 같은 크기를 갖고 있을 수도 있으며, 모든 값들의 쌍은 서로 비교가 가능해야 합니다.
(comparator가 "이건 어떻게 비교해야 할 지 모르겠는데요?" 같은 대답을 하는 상황이 있어서는 안 됩니다.)

예를 들어 정수 m과 n으로 만든 분수 $$\frac{m}{n}$$과 같은 형태의 수들을 가장 작은 것부터 가장 큰 것까지를 정렬할 수 있습니다.
이건 수학에서는 일반적인 방식입니다.
그런데 $$ 1 \over 2 $$ = $$ 2 \over 4 $$ = $$ 3 \over 6 $$ 처럼 많은 분수들이 서로 같은 크기를 갖는다는 문제가 있습니다.
전순서 집합을 구현하는 comparator는 이런 분수들을 같다고 취급하도록 동작해야 합니다.

`(cmp a b)` 형태의 3-way comparator는 전순서 집합 기준으로 `a`가 `b`에 대해 앞선다면 음수, 나중이라면 양수, 같다면 0을 리턴해야 합니다.

`(cmp a b)` 형태의 boolean comparator는 전순서 집합 기준으로 `a`가 `b`에 대해 앞선다면 true를, 나중이거나 같은 경우라면 false를 리턴해야 합니다.
즉, 숫자에 대해 `<`가 작동하는 것과 똑같이 작동해야 합니다.
나중에 설명하겠지만 boolean comparator는 숫자에 대해 `<=` 처럼 작동하면 안됩니다. (이 문서 아래쪽의 섹션 "Comparators for sorted sets and maps are easy to get wrong"를 참고하세요.)


### Mistakes to avoid

#### Be wary of "Not a Number" values as compared values in sorted collections

**정렬할 컬렉션에 "NaN" 값이 들어있는 경우를 조심하세요**

>
Clojure’s default comparator `compare` treats "Not a Number" (`##NaN`) values as equal to all other numbers.
If you call [sort](https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/sort ) on sequences of numbers that contain occurrences of `##NaN`, it might throw an exception.

Clojure의 디폴트 comparator인 `compare`는 "Not a Number"(`##NaN`)와 다른 모든 숫자를 같다고 비교합니다.
만약 `##NaN`이 포함되어 있는 숫자들의 시퀀스에 `sort`를 호출하면 예외가 던져질 수 있습니다.

```clojure
user> (sort [##NaN 5 13 ##NaN 3 7 12 ##NaN 8 4 2 20 6 9 ##NaN 50 83 19 -7 0 18 26 30 42 ##NaN 57 90 -8 -12 43 87 38])
Execution error (IllegalArgumentException) at java.util.TimSort/mergeHi (TimSort.java:899).
Comparison method violates its general contract!
```

>
Even if it does not throw an exception, it is likely that the returned sequence will not be sorted.
This is because `compare` does not put `##NaN` into a total order with other numbers as a comparator should, in order for `sort` to work correctly:

예외가 던져지지 않았다 하더라도, 제대로 정렬되지 않은 시퀀스가 리턴될 가능성이 있습니다.
이는 다른 숫자들과 달리 `compare`가 `##NaN`을 전순서 집합의 원소로 고려하지 않기 때문이며,
`sort`가 제대로 동작하게 하기 위해서입니다.

```clojure
user> (sort [##NaN 10 5 13 ##NaN 3 7 12 ##NaN 8 4 2 20 6 9 ##NaN 50 83 19 -7])
(##NaN -7 2 3 4 5 6 7 8 10 12 13 ##NaN ##NaN 9 19 20 ##NaN 50 83)
```

>
Because `##NaN` is not equal to any other value, you cannot use code like this to remove values from a sequence of numbers:

왜냐하면 `##NaN`은 (자기 자신을 포함해) 다른 어떤 값과도 같지 않기 때문입니다.
따라서 아래와 같은 코드를 사용해도 숫자 시퀀스에서 값을 제거할 수 없습니다.

```clojure
user> (remove #(= % ##NaN) [9 3 ##NaN 4])
(9 3 ##NaN 4)
```

>
You may use the function `NaN?` to determine whether a value is `##NaN`.
The function `NaN?` was added in Clojure version 1.11.0.
You may use the Java method `Double/isNaN` with any version of Clojure:

`NaN?` 함수를 사용하면 주어진 값이 `##NaN`인지 아닌지를 확인할 수 있습니다.
`NaN?` 함수는 Clojure 1.11.0 버전부터 추가되었습니다.
Java의 `Double/isNaN` 메소드는 Clojure 버전과 관계 없이 언제나 사용할 수 있습니다.

```clojure
user> (remove NaN? [9 3 ##NaN 4])
(9 3 4)
user> (remove #(Double/isNaN %) [9 3 ##NaN 4])
(9 3 4)
```

#### Comparators for sorted sets and maps are easy to get wrong

#### Beware using subtraction in a comparator

### Comparators that work between different types

