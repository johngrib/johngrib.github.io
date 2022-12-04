---
layout  : wiki
title   : Comparators Guide
summary : 정렬용 비교 함수 가이드
date    : 2022-03-01 21:23:11 +0900
updated : 2022-09-12 23:34:48 +0900
tag     : clojure
resource: 88/294CD1-6000-4576-9522-DEE287BF9188
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

일러두기: 이 문서는 Clojure 1.10와 Java 8을 전제하고 작성했지만 대부분의 다른 버전에도 들어맞을 것입니다.

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

comparator란 두 개의 인자 x와 y를 정렬하기 위한 상대적인 순서를 표현하는 값을 리턴하는 함수입니다.

comparator는 크게 두 가지가 있습니다.
- 정수 값을 리턴하는 3-way comparator
- boolean 값을 리턴하는 2-way comparator

x와 y의 순서에 따라 리턴값이 어떻게 달라지는지는 아래의 ["comparator 구현을 위해 해야 할 일들"]( #dos )을 참고하세요.

Clojure에서는 컬렉션의 값들을 정렬하거나, 의도한 순서대로 컬렉션을 유지할 때 comparator를 사용합니다.
- 예
    - [sorted-map](https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/sorted-map )
    - [sorted-set](https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/sorted-set )
    - [priority-map](https://clojure.github.io/data.priority-map/#clojure.data.priority-map/priority-map ) - priority-map은 우선 순위 큐라고도 부릅니다.

디폴트 comparator인 `compare` 함수는 숫자를 오름차순으로 정렬하거나, string, keyword, symbol 등을 사전 순서로 정렬할 때 사용할 수 있습니다.
자세한 내용은 아래의 예제를 참고하세요.

만약 `compare`와 다르게 작동하는 것이 필요하다면 용도에 맞는 comparator를 만들어야 합니다.
아래는 이를 위한 권장사항이며, 각 항목에 대해 이 문서 전체에서 자세히 설명하도록 하겠습니다.


#### DOs

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

- 새로 만드는 comparator가, 비교하려는 값들의 [전순서 집합](https://en.wikipedia.org/wiki/Total_order )을 고려하고 있는지를 확인하세요.
    - comparator는 데이터 셋에 포함될 수 있는 어떤 종류의 값이건 두 개가 주어졌을 때 작동해야 합니다.
    - 두 값을 비교해서 어떤 값이 우선하는지 또는 같은지도 판별해 줄 수 있어야 합니다.
- comparator는 3-way comparator 또는 boolean comparator 둘 중 하나를 선택해 만들어야 합니다.
    - 3-way comparator는 2개의 값 `x`와 `y`를 받아서, 비교한 결과로 Java 32-bit `int` 값을 리턴합니다.
        - `x`가 `y`보다 우선하면 -1, `y`가 `x`보다 우선하면 1, 둘이 같다면 0을 리턴합니다.
        - 특별한 이유가 없다면 -1, 0, 1 말고 다른 값을 리턴하지 않도록 합니다.
    - boolean comparator는 2개의 값 `x`와 `y`를 받아서 boolean을 리턴합니다.
        - `x`가 `y`보다 우선하면 true, 그 밖의 경우에는 false를 리턴합니다(둘이 같은 경우 포함).
        - `<`와 `>`를 사용하는 것이 바람직하며, `<=`와 `>=`를 사용하지 마세요.
        - 성능 이슈: boolean comparator는 특성상 두 값 중 하나가 우선하는지 아니면 똑같은지를 한 번에 알아낼 수 없기 때문에 두 번 호출될 수도 있습니다. (3-way comparator는 한 번만으로도 구별이 됨)
- 역순 정렬을 할 때에는 이미 존재하는 comparator에 인자 순서를 뒤집어서 제공하는 방법을 사용하세요.
- 두 자료구조의 다중 필드를 비교하려면 "정렬 키"를 포함하는 길이가 같은 Clojure vector 여러개를 `compare` 함수에 넘기세요.
- 컬렉션을 정렬하기 전에 데이터에서 "Not a Number" (`##NaN`)을 제거하거나 다른 값으로 바꿔치우세요. 정렬된 컬렉션에서는 NaN을 키로 사용하지 마세요.

#### DO NOTs
>
**DO NOTs:**
>
- Do not write a boolean comparator that returns true if the values are equal. Such a comparator is inconsistent. It will cause sorted collections to behave incorrectly, and sorting to give unpredictable orders.
- Do not use comparators for sorted sets and maps that treat two values as equal, unless you want at most one of those two values to appear in the sorted collection.
- Do not use subtraction when writing a 3-way comparator, unless you really know what you are doing.

**"comparator를 구현할 때 하면 안 되는 일들"**

- boolean comparator를 만들 때 두 값이 같은 경우에 `true`를 리턴하도록 하지 마세요. comparator를 이렇게 만들면 일관성 없게 정렬이 됩니다. 정렬이 올바르지 않게 작동하고, 예상하지 못한 순서로 정렬될 수 있습니다.
- sorted set과 sorted map을 만들기 위해 comparator를 사용하지 마세요. 이 자료구조들에서는 주어진 두 값이 같다고 처리되게 되면 둘 중 하나를 잃게 될 수 있습니다.
- 3-way comparator를 만들 때 아주 특별한 이유가 있는 게 아니라면, 두 값을 뺄셈해서 리턴값을 만들지 마세요.

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

여기에서는 `compare` 함수를 사용하는 기본적인 정렬에 대해 다룹니다.
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


자신만의 comparator를 지정하지 않는다면, 빌트인 함수인 `compare`가 정렬에 사용됩니다.
`compare`는 다양한 타입의 값에 대해서도 작동하며, 아래 나열된 규칙대로 정렬을 수행합니다.

- 수는 오름차순으로 정렬합니다.
    - `==`에 의해 두 수가 같다고 판별된 경우, `compare`는 `0`을 리턴합니다.
        - (`=`가 `false`를 리턴하는 경우라 하더라도) `==`가 `true`를 리턴하면, `compare`는 `0`을 리턴합니다.
        - 문제의 케이스: 모든 수 `x`에 대해 `(== ##NaN x)`는 `false` 입니다. 심지어 `x`가 `##NaN`인 경우에도 그렇습니다. 그러므로 `(compare ##NaN x)`는 모든 수 `x`에 대해 `0`을 리턴합니다.
- string은 UTF-16 코드 단위의 시퀀스로 표현하는 방식에 따라 사전 순서로 정렬합니다. 이 순서는 ASCII의 하위 집합으로 제한된 문자열들의 대소문자를 구분하는 알파벳 순서입니다.
- symbol은 네임스페이스를 갖고 있다면 자신의 네임스페이스를 기준으로 먼저 정렬하며, 서로 같은 네임스페이스를 갖는 경우라면 symbol의 이름으로 비교를 합니다. 네임스페이스와 이름은 모두 string과 똑같이 사전 순서로 정렬합니다. 네임스페이스가 없는 모든 symbol들은 네임스페이스가 있는 symbol보다 먼저 정렬합니다.
- keyword는 symbol과 같은 방식으로 정렬하지만, keyword와 symbol을 비교하려고 하면 예외를 던집니다.
- vector는 가장 적은 수의 원소를 가진 vector부터 가장 많은 원소를 가진 vector 순으로 정렬합니다.
    - 만약 두 vector의 길이가 같다면, 사전 순서로 정렬합니다.
- Clojure 참조(ref)는 생성된 순서대로 정렬합니다.
- java.lang.Comparable을 구현하는 모든 Java 타입은 자신이 갖고 있는 `compareTo` 메서드를 통해 비교됩니다.
    - character, boolean, File, URI, UUID 같은 것들이 이에 해당됩니다.
- `nil`은 위의 모든 값들과 비교가 가능하며, 어떤 값보다도 작은 값으로 간주됩니다.


>
`compare` throws an exception if given two values whose types are "too different", e.g. it can compare integers, longs, and doubles to each other, but not strings to keywords or keywords to symbols.
It cannot compare lists, sequences, sets, or maps.
>
The examples below with `sort`, `sorted-set`, and `sorted-map` all use the default comparator.

`compare`는 주어진 두 값의 타입이 "너무 다르면" 예외를 던집니다.
예를 들어 `compare`는 integer, long, double을 서로 비교할 수 있습니다.
그러나 `compare`는 string은 keyword, symbol과 서로 비교하지 못합니다.
그리고 list, sequence, set, map도 서로 비교하지 못합니다.

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
위의 예제에 등장한 모든 숫자 타입들은 서로 비교가 가능하지만, 숫자가 아닌 타입과는 비교할 수 없습니다.
`compare`를 써서 list, set, map, 또는 위에서 언급하지 않은 다른 타입들과 비교하려 하면 예외를 던질 수도 있습니다.
이런 값들을 비교하기 위해서는 comparator를 직접 구현해야 합니다.

### Off-the-shelf comparators

>
First consider using well-tested comparators developed by others, especially if they are complex.
>
A perfect example of this would be sorting Unicode strings in different languages in orders specific to different locales. The Java [Collator](https://docs.oracle.com/javase/8/docs/api/java/text/Collator.html ) class and [ICU](http://site.icu-project.org/home#TOC-What-is-ICU- ) (International Components for Unicode) provide libraries for this.

comparator를 직접 만들기 전에, 다른 사람들이 개발해 잘 검증된 comparator를 사용하는 것을 고려해 보세요. 특히 구현이 복잡한 경우에는 다른 사람들이 만든 것을 꼭 검토해 보세요.

이런 복잡한 상황을 보여주는 아주 좋은 사례가 하나 있습니다. 다른 로케일에 대해 특정한 순서로 다른 언어의 Unicode 문자열을 정렬하는 문제입니다. Java [Collator](https://docs.oracle.com/javase/8/docs/api/java/text/Collator.html ) 클래스와 [ICU](http://site.icu-project.org/home#TOC-What-is-ICU- ) (International Components for Unicode)는 이런 문제를 해결할 수 있는 라이브러리를 제공합니다.

### Writing your own comparators

#### Reverse order

>
To sort numbers in decreasing order, simply write a comparator that calls `compare` with the arguments in the opposite order:

수를 내림차순으로 정렬하려면 간단하게 `compare` 함수에 인자를 반대 순서로 넣어주는 comparator를 만들어 주면 됩니다.

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

이렇게 만든 `reverse-cmp`함수는 `compare`가 동작하는 다른 타입들에서도 잘 동작할 것입니다.

#### Multi-field comparators

>
Because equal-length Clojure vectors are compared lexicographically, they can be used to do multi-field sorting on values like maps or records.
This only works if the fields are already sorted by `compare` in the order you wish (or the reverse of that).
>
First we will show a way to do it that does not compare vectors.

길이가 같은 Clojure vector들은 사전 순서로 비교되기 때문에, map이나 record와 같은 값들을 여러 필드 기준으로 정렬하려 할 때 활용할 수 있습니다.
이 방식은 이미 `compare`를 통해 필드명들이 순서대로 정렬된 경우에만 작동합니다(역순도 괜찮습니다).

먼저 이 방법을 사용하지 않고 정렬하는 코드를 살펴봅시다.

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

다음은 Clojure vector를 활용해 정렬하지만 위의 예제와 완전히 똑같이 작동하는 더 짧은 코드입니다.
위의 에제와 비교해 보세요.
`:salary`에 대해서는 x와 y가 바뀌어 있기 때문에 위에서와 똑같이 내림차순으로 정렬됩니다.

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

Java의 comparator들은 모두 3-way comparator 입니다. 즉, 첫 번째 인자가 두 번째 인자보다 작으면 음수, 같으면 `0`, 크면 양수를 리턴합니다.

Java와 달리 Clojure에서는 boolean comparator를 사용할 수 있습니다.
boolean comparator는 첫 번째 인자가 두 번째 인자보다 우선한다면 `true`를 리턴하고, 그렇지 않으면 `false`를 리턴합니다(두 인자가 같은 경우도 `false`입니다).
숫자를 비교하는 boolean comparator라면 `<` 함수는 완벽한 예시라 할 수 있습니다.
한편 `>`는 수를 내림차순으로 정렬할 때 사용합니다.

사실 이런 작업들의 밑단에서는, `bool-cmp-fn` 같은 Clojure 함수가 "comparator로 호출될 때" Clojure는 아래와 같이 작동하는 코드를 실행해서 `boolean`이 아니라 `int`를 리턴합니다.

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
-1                              ; 한 번 호출됐고 -1 리턴
user> (. my-< (compare 2 1))
(my-< 2 1 ) returns  false
(my-< 1 2 ) returns  true
1                               ; 재귀해서 두 번 호출됐고 1 리턴
user> (. my-< (compare 1 1))
(my-< 1 1 ) returns  false
(my-< 1 1 ) returns  false
0                               ; 재귀해서 두 번 호출됐고 0 리턴

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

예를 들어 정수 m과 n으로 만든 분수 $$\frac{m}{n}$$과 같은 형태의 수열이 있다면 가장 작은 수부터 가장 큰 수까지 정렬할 수 있을 겁니다.
수학에서는 상식이죠.
그런데 분수 특성상 $$ 1 \over 2 $$ = $$ 2 \over 4 $$ = $$ 3 \over 6 $$ 처럼 서로 같은 크기를 갖는 수가 여러개 있을 수 있다는 문제가 있습니다.
즉, 전순서 집합을 구현하는 comparator는 이런 분수들을 동등하게 취급해야 합니다.

`(cmp a b)` 형태의 3-way comparator는 전순서 집합 기준으로 `a`가 `b`에 대해 우선한다면 음수, 나중이라면 양수, 같다면 0을 리턴해야 합니다.

`(cmp a b)` 형태의 boolean comparator는 전순서 집합 기준으로 `a`가 `b`에 대해 우선한다면 true를, 나중이거나 같은 경우라면 false를 리턴해야 합니다.
즉, 숫자에 대해 `<`가 작동하는 것과 똑같이 작동해야 합니다.
나중에 설명하겠지만 boolean comparator는 숫자에 대해 `<=` 처럼 작동하면 안됩니다. (이 문서 아래쪽의 섹션 "Comparators for sorted sets and maps are easy to get wrong"를 참고하세요.)


### Mistakes to avoid

**주의해서 피해야 하는 실수들**

#### Be wary of "Not a Number" values as compared values in sorted collections

**정렬할 컬렉션에 "NaN"이 들어있는 경우를 조심하세요**

>
Clojure’s default comparator `compare` treats "Not a Number" (`##NaN`) values as equal to all other numbers.
If you call [sort](https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/sort ) on sequences of numbers that contain occurrences of `##NaN`, it might throw an exception.

Clojure의 디폴트 comparator인 `compare`는 "Not a Number"(`##NaN`)와 다른 모든 숫자를 같다고 취급합니다.

`##NaN`이 포함되어 있는 숫자들의 시퀀스에 `sort`를 호출하면 예외가 던져질 수 있습니다.

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
`sort`가 이상하게 작동한 것이 아닙니다.

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
물론 Java의 `Double/isNaN` 메소드는 Clojure 버전과 관계 없이 언제나 사용할 수 있습니다.

```clojure
user> (remove NaN? [9 3 ##NaN 4])
(9 3 4)
user> (remove #(Double/isNaN %) [9 3 ##NaN 4])
(9 3 4)
```

#### Comparators for sorted sets and maps are easy to get wrong

**sorted set과 sorted map에 대해 comparator를 잘 사용하는 것은 어려운 일입니다.**

>
This is just as accurately stated as "comparators are easy to get wrong", but it is often more noticeable when you use a bad comparator for sorted sets and maps.
If you write the kinds of bad comparators in this section and use them to call `sort`, usually little or nothing will go wrong (although inconsistent comparators are not good for sorting, either).
With sorted sets and maps, these bad comparators can cause values not to be added to your sorted collections, or to be added but not be found when you search for them.
>
Suppose you want a sorted set containing vectors of two elements, where each is a string followed by a number, e.g. `["a" 5]`.
You want the set sorted by the number, and to allow multiple vectors with the same number but different strings.
Your first try might be to write something like `by-2nd`:

"comparator를 잘 사용하는 것은 어렵다"라고 말하긴 했지만, 특히 sorted set과 sorted map에 나쁜 comparator를 사용하는 경우가 흔하게 발생합니다.

만약 여러분이 이 섹션에서 소개하는 나쁜 종류의 comparator를 만들어서 `sort`에 사용한다 하더라도, 잘못되는 결과가 나오는 경우는 흔하지 않을 것입니다. (물론 일관성없는 comparator가 정렬에 좋다는 건 아닙니다.)

그러나 나쁜 comparator를 **sorted set과 sorted map에 사용하면** 정렬된 컬렉션에 값이 빠져있게 되거나, 값이 추가가 되기는 하지만 찾지는 못하게 될 수도 있습니다.

예를 들어 원소가 2개인 vector들의 sorted set이 필요하다고 합시다.
그리고 각 vector는 예를 들어 `["a" 5]`처럼 string이 하나, number가 하나 들어있습니다.
이 때 정렬 기준은 number이며, 같은 number를 가졌지만 string이 다른 vector들이라면 중복을 허용한다고 합시다.

정렬을 위해 아래와 같이 `by-2nd`라는 comparator를 만들었습니다.

```clojure
(defn by-2nd [a b]
  (compare (second a) (second b)))
```

>
But look what happens when you try to add multiple vectors with the same number.

`by-2nd`를 사용해 같은 number를 가진 vector 여러 개를 정렬해 봅시다. 어떻게 될까요?

```clojure
user> (sorted-set-by by-2nd ["a" 1] ["b" 1] ["c" 1])
#{["a" 1]}
```

>
Only one element is in the set, because `by-2nd` treats all three of the vectors as equal.
Sets should not contain duplicate elements, so the other elements are not added.
>
A common thought in such a case is to use a boolean comparator function based on `<=` instead of `<`:

딱 한 개의 원소만이 들어있는 set이 나왔습니다.
`by-2nd`가 주어진 3개의 vector를 전부 같은 것으로 취급해버렸기 때문입니다.
set은 원소의 중복을 허용하지 않으므로 다른 원소들은 하나도 추가되지 않은 것입니다.

이런 경우를 처리하기 위한 일반적인 아이디어는 `<`가 아니라 `<=`를 기반으로 삼는 boolean comparator 함수를 사용하는 것입니다.

```clojure
(defn by-2nd-<= [a b]
  (<= (second a) (second b)))
```

>
The boolean comparator `by-2nd-<=` seems to work correctly on the first step of creating the set, but fails when testing whether elements are in the set.

boolean comparator인 `by-2nd-<=`는 set 생성이라는 첫 번째 목표는 잘 달성하는 것처럼 보입니다.
그러나 set에 원소가 포함되어 있는지 검사해보면 원하지 않은 결과가 나옵니다.

```clojure
user> (def sset (sorted-set-by by-2nd-<= ["a" 1] ["b" 1] ["c" 1]))
#'user/sset
user> sset
#{["c" 1] ["b" 1] ["a" 1]}
user> (sset ["c" 1])
nil
user> (sset ["b" 1])
nil
user> (sset ["a" 1])
nil
```

>
The problem here is that `by-2nd-<=` gives inconsistent answers.
If you ask it whether `["c" 1]` comes before `["b" 1]`, it returns true (which Clojure’s boolean-to-int comparator conversion turns into -1).
If you ask it whether `["b" 1]` comes before `["c" 1]`, again it returns true (again converted into -1 by Clojure).
One cannot reasonably expect an implementation of a sorted data structure to provide any kind of guarantees on its behavior if you give it an inconsistent comparator.

여기서 문제점은 `by-2nd-<=` 함수가 대답을 일관성 없게 한다는 것입니다.

- 만약 `["c" 1]`이 `["b" 1]`보다 우선하는지 물어보면 `true`를 리턴합니다(Clojure의 boolean-to-int comparator라면 `-1` 을 리턴).
- 그런데 `["b" 1]`이 `["c" 1]`보다 우선하는지를 물어보면 또 `true`를 리턴합니다(이것도 Clojure의 boolean-to-int라면 `-1`을 리턴).

정렬된 데이터 구조의 구현에 일관성 없는 comparator를 제공하면 어떤 종류의 안전성도 기대할 수 없습니다.

>
The techniques described in "Multi-field comparators" above provide correct comparators for this example.
In general, be wary of comparing only parts of values to each other.
Consider having some kind of tie-breaking condition after all of the fields of interest to you have been compared.

앞의 "Multi-field comparators" 섹션에서 설명한 기법을 사용하면 이 예제에 대한 올바른 comparator를 만들 수 있습니다.
다만, 값의 일부만 비교하는 실수를 하지 않도록 주의할 필요가 있습니다.
관심사에 해당하는 모든 필드를 비교한 다음, 우선순위가 같은 경우에 대한 조건을 추가하는 것을 고려해 보세요.

>
Aside: If you do not want multiple vectors in your set with the same number, `by-2nd` is the comparator you should use.
It gives exactly the behavior you want.
(TBD: Are there any caveats here? Will `sorted-set` ever use `=` to compare elements for any reason, or only the supplied comparator function?)

한편 이건 좀 다른 이야기이긴 한데, 만약 같은 number를 갖는 여러 개의 중복된 vector가 필요하지 않은 상황이라면 `by-2nd`는 이 상황에 적합한 comparator입니다.
(확인해야 할 사항: 이 문장에 고려해야 할 주의사항이 있지 않을까요? `sorted-set`은 어떤 방식으로든 비교에 `=`를 사용하는 것인가요? 아니면 주어진 comparator 함수만을 사용하나요?)


#### Beware using subtraction in a comparator

**comparator에서 빼기는 주의해서 사용해야 합니다.**

>
Java comparators return a negative int value if the first argument is to be treated as less than the second, a positive int value if the first argument is to be treated as greater than the second, and 0 if they are equal.

Java의 comparator는 첫 번째 인자가 두 번째보다 작은 경우에는 음수를, 두 번째보다 큰 경우에는 양수를 리턴하고, 그 외의 경우에는 0을 리턴합니다.

```clojure
user> (compare 10 20)
-1
user> (compare 20 10)
1
user> (compare 20 20)
0
```

>
Because of this, you might be tempted to write a comparator by subtracting one numeric value from another, like so.

그렇기 때문에 여러분이 comparator를 작성할 때 두 수를 뺄셈하는 것도 괜찮겠다는 생각을 하게 될 수도 있습니다.

```clojure
user> (sort #(- %1 %2) [4 2 3 1])
(1 2 3 4)
```

>
While this works in many cases, think twice (or three times) before using this technique.
It is less error-prone to use explicit conditional checks and return -1, 0, or 1, or to use boolean comparators.

이 방법은 다양한 경우에 잘 작동하긴 하는데, 이 방법을 쓰기 전에는 두 번(세 번도 괜찮습니다) 정도는 생각해 보세요.
조건 검사를 통해 `-1`, `0`, `1`을 확실히 리턴하게 하거나, 그냥 boolean comparator를 사용하는 것이 에러가 발생할 가능성이 더 적습니다.

>
Why?
Java comparators must return a 32-bit _int_ type, so when a Clojure function is used as a comparator and it returns any type of number, that number is converted to an _int_ behind the scenes using the Java method [intValue](https://docs.oracle.com/javase/8/docs/api/java/lang/Number.html#intValue-- ).
See Clojure source file [src/jvm/clojure/lang/AFunction.java](https://github.com/clojure/clojure/blob/clojure-1.10.0/src/jvm/clojure/lang/AFunction.java#L50 ) method `compare` if you want the details.
>
For comparing floating point numbers and ratios, this causes numbers differing by less than 1 to be treated as equal, because a return value between -1 and 1 is truncated to the _int_ 0:

왜 그럴까요?
Java의 comparator는 32 bit int 타입을 리턴해야 합니다.
따라서 Clojure 함수를 comparator로 사용하게 되면, comparator가 리턴하는 수는 타입이 뭐가 되었건 Java의 `intValue` 메소드를 통해 int 로 변환됩니다.

자세한 내용을 알고 싶다면 Clojure 소스 파일 [src/jvm/clojure/lang/AFunction.java](https://github.com/clojure/clojure/blob/clojure-1.10.0/src/jvm/clojure/lang/AFunction.java#L50 )의 `compare` 메소드를 참고하세요.

그리고 부동 소수점 수와 ratio를 비교하게 될 때도 문제입니다.
이 경우에는 두 수의 차이가 1 미만인 경우에는 같은 수로 취급될 수 있습니다.
왜냐하면 `-1`과 `1` 사이의 실수는 int 0 으로 변환되기 때문입니다.

```clojure
;; This gives the correct answer
user> (sort #(- %1 %2) [10.0 9.0 8.0 7.0])
(7.0 8.0 9.0 10.0)

;; but this does not, because all values are treated as equal by
;; the bad comparator.
user> (sort #(- %1 %2) [1.0 0.9 0.8 0.7])
(1.0 0.9 0.8 0.7)

;; .intValue converts all values between -1.0 and 1.0 to 0
user> (map #(.intValue %) [-1.0 -0.99 -0.1 0.1 0.99 1.0])
(-1 0 0 0 0 1)
```

>
This also leads to bugs when comparing integer values that differ by amounts that change sign when you truncate it to a 32-bit int (by discarding all but its least significant 32 bits).
About half of all pairs of long values are compared incorrectly by using subtraction as a comparator.

이런 원리로 인해 정수 값을 비교할 때 또다른 버그가 발생할 수 있습니다.
(32 bit int로 변환해야 하므로 최하위 32개의 비트를 제외한 상위 비트가 다 버려집니다)
그러므로 뺄셈을 사용하는 compartor를 사용한다면 long 타입 숫자들의 절반은 올바르지 않게 비교되는 셈입니다.

```clojure
;; This looks good
user> (sort #(- %1 %2) [4 2 3 1])
(1 2 3 4)

;; What the heck?
user> (sort #(- %1 %2) [2147483650 2147483651 2147483652 4 2 3 1])
(3 4 2147483650 2147483651 2147483652 1 2)

user> [Integer/MIN_VALUE Integer/MAX_VALUE]
[-2147483648 2147483647]

;; How .intValue truncates a few selected values.  Note especially
;; the first and last ones.
user> (map #(.intValue %) [-2147483649 -2147483648 -1 0 1
                            2147483647  2147483648])
(2147483647 -2147483648 -1 0 1 2147483647 -2147483648)
```

>
Java itself uses a subtraction comparator for strings and characters, among others.
This does not cause any problems, because the result of subtracting an arbitrary pair of 16-bit characters converted to ints is guaranteed to fit within an int without wrapping around.
If your comparator is not guaranteed to be given such restricted inputs, better not to risk it.

Java는 character를 비교하거나 string을 비교할 때 뺄셈 comparator를 사용합니다.
16 비트 문자들은 int로 문제없이 변환되도록 보장되기 때문에 이런 작업에서는 아무런 문제가 발생하지 않습니다.
만약 여러분이 comparator를 만들 때 이런 것들을 확실히 보장할 수 없다면 굳이 모험을 하지 않는 것이 바람직합니다.

### Comparators that work between different types

**서로 다른 타입이 주어져도 작동하도록 comparator를 만들 때 주의하세요**

>
Sometimes you might wish to sort a collection of values by some key, but that key is not unique.
You want the values with the same key to be sorted in some predictable, repeatable order, but you do not care much what that order is.
>
As a toy example, you might have a collection of vectors, each with two elements, where the first element is always a string and the second is always a number.
You want to sort them by the number value in increasing order, but you know your data can contain more than one vector with the same number.
You want to break ties in some way, consistently across multiple sorts.
>
This case is easily implemented using a multi-field comparator as described in an earlier section.

어떨 때에는 어떤 key 값을 통해 컬렉션을 정렬할 필요가 있는 경우도 있습니다.
그리고 그 key가 unique가 아닌 경우라고 생각해 봅시다.
이 때 정렬이 어떻게 되건 상관없는데 일단 같은 key를 가진 값들이라면 예측 가능한 순서로 정렬되고, 여러 차례 정렬해봐도 똑같은 순서로 정렬되기를 바란다고 합시다.

예를 들어 각각 두 개의 원소를 갖는 vector들의 컬렉션이 있다고 합시다.
여기에서 첫 번째 원소는 무조건 string이고 두 번째 원소는 무조건 number가 온다고 합시다.
이 vector들을 number 기준으로 오름차순으로 정렬하고자 하지만 전체 데이터에 같은 숫자를 가진 vector가 여러개 있을 수 있다는 사실도 알고 있다고 합시다.
여기에서 이런 관계를 어떻게든 일관성있게 끊고 싶다고 합시다.

이런 경우에는 위의 섹션에서 설명한 바와 같이 다중 필드 comparator를 사용하면 쉽게 구현할 수 있습니다.

```clojure
(defn by-number-then-string [[a-str a-num] [b-str b-num]]
  (compare [a-num a-str]
           [b-num b-str]))
```

>
If the entire vector values can be compared with `compare`, because all vectors are equal length, and the type of each corresponding elements can be compared to each other with `compare`, then you can also do this, using the entire vector values as the final tie-breaker:

모든 vector들이 같은 길이를 갖고 있으며, 원소의 타입들도 서로 `compare`로 비교가 되기 때문에 모든 vector값은 `compare`로 비교가 가능합니다.
그러므로 여러분도 이렇게 한다면 전체 vector 값들의 연관관계를 끊을 수 있습니다.

```clojure
(defn by-number-then-whatever [a-vec b-vec]
  (compare [(second a-vec) a-vec]
           [(second b-vec) b-vec]))
```

>
However, that will throw an exception if some element position in the vectors contain types too different for `compare` to work on, and those vectors have the same second element:

하지만 만약 vector에 들어있는 원소 중에 `compare`로 검사하지 못하는 이질적인 타입이 있거나, 두번째 원소로 중복값이 있다면 예외가 던져집니다.

```clojure
;; compare throws exception if you try to compare a string and a
;; keyword
user> (sort by-number-then-whatever [["a" 2] ["c" 3] [:b 2]])
Execution error (ClassCastException) at user/by-number-then-whatever (REPL:2).
class java.lang.String cannot be cast to class clojure.lang.Keyword
```

>
`cc-cmp` ("cross class compare") below may be useful in such cases.
It can compare values of different types, which it orders based on a string that represents the type of the value.
It is not simply `(class x)`, because then numbers like `Integer` and `Long` would not be sorted in numeric order.
The library [clj-arrangement](https://github.com/greglook/clj-arrangement ) may also be useful to you.

`cc-cmp` ("cross class compare")는 이런 경우에 유용할 수 있습니다.
`cc-cmp`는 다른 타입의 값들을 해당 타입의 값을 표현하는 string을 기준으로 정렬하기 때문입니다.
이 방법은 `(class x)`를 그냥 호출해 사용하지 않는데, `(class x)`를 써서 비교하게 되면 `Integer`나 `Long` 같은 숫자들이 수의 크기대로 올바르게 정렬되지 않기 때문입니다.
한편, [clj-arrangement](https://github.com/greglook/clj-arrangement ) 라이브러리도 이런 문제에 유용할 수 있습니다.

```clojure
;; comparison-class throws exceptions for some types that might be
;; useful to include.

(defn comparison-class [x]
  (cond (nil? x) ""
        ;; Lump all numbers together since Clojure's compare can
        ;; compare them all to each other sensibly.
        (number? x) "java.lang.Number"

        ;; sequential? includes lists, conses, vectors, and seqs of
        ;; just about any collection, although it is recommended not
        ;; to use this to compare seqs of unordered collections like
        ;; sets or maps (vectors should be OK).  This should be
        ;; everything we would want to compare using cmp-seq-lexi
        ;; below.  TBD: Does it leave anything out?  Include anything
        ;; it should not?
        (sequential? x) "clojure.lang.Sequential"

        (set? x) "clojure.lang.IPersistentSet"
        (map? x) "clojure.lang.IPersistentMap"
        (.isArray (class x)) "java.util.Arrays"

        ;; Comparable includes Boolean, Character, String, Clojure
        ;; refs, and many others.
        (instance? Comparable x) (.getName (class x))
        :else (throw
               (ex-info (format "cc-cmp does not implement comparison of values with class %s"
                                (.getName (class x)))
                        {:value x}))))

(defn cmp-seq-lexi
  [cmpf x y]
  (loop [x x
         y y]
    (if (seq x)
      (if (seq y)
        (let [c (cmpf (first x) (first y))]
          (if (zero? c)
            (recur (rest x) (rest y))
            c))
        ;; else we reached end of y first, so x > y
        1)
      (if (seq y)
        ;; we reached end of x first, so x < y
        -1
        ;; Sequences contain same elements.  x = y
        0))))

;; The same result can be obtained by calling cmp-seq-lexi on two
;; vectors, but cmp-vec-lexi should allocate less memory comparing
;; vectors.
(defn cmp-vec-lexi
  [cmpf x y]
  (let [x-len (count x)
        y-len (count y)
        len (min x-len y-len)]
    (loop [i 0]
      (if (== i len)
        ;; If all elements 0..(len-1) are same, shorter vector comes
        ;; first.
        (compare x-len y-len)
        (let [c (cmpf (x i) (y i))]
          (if (zero? c)
            (recur (inc i))
            c))))))

(defn cmp-array-lexi
  [cmpf x y]
  (let [x-len (alength x)
        y-len (alength y)
        len (min x-len y-len)]
    (loop [i 0]
      (if (== i len)
        ;; If all elements 0..(len-1) are same, shorter array comes
        ;; first.
        (compare x-len y-len)
        (let [c (cmpf (aget x i) (aget y i))]
          (if (zero? c)
            (recur (inc i))
            c))))))

(defn cc-cmp
  [x y]
  (let [x-cls (comparison-class x)
        y-cls (comparison-class y)
        c (compare x-cls y-cls)]
    (cond (not= c 0) c  ; different classes

          ;; Compare sets to each other as sequences, with elements in
          ;; sorted order.
          (= x-cls "clojure.lang.IPersistentSet")
          (cmp-seq-lexi cc-cmp (sort cc-cmp x) (sort cc-cmp y))

          ;; Compare maps to each other as sequences of [key val]
          ;; pairs, with pairs in order sorted by key.
          (= x-cls "clojure.lang.IPersistentMap")
          (cmp-seq-lexi cc-cmp
                        (sort-by key cc-cmp (seq x))
                        (sort-by key cc-cmp (seq y)))

          (= x-cls "java.util.Arrays")
          (cmp-array-lexi cc-cmp x y)

          ;; Make a special check for two vectors, since cmp-vec-lexi
          ;; should allocate less memory comparing them than
          ;; cmp-seq-lexi.  Both here and for comparing sequences, we
          ;; must use cc-cmp recursively on the elements, because if
          ;; we used compare we would lose the ability to compare
          ;; elements with different types.
          (and (vector? x) (vector? y)) (cmp-vec-lexi cc-cmp x y)

          ;; This will compare any two sequences, if they are not both
          ;; vectors, e.g. a vector and a list will be compared here.
          (= x-cls "clojure.lang.Sequential")
          (cmp-seq-lexi cc-cmp x y)

          :else (compare x y))))
```

>
Here is a quick example demonstrating `cc-cmp’s ability to compare values of different types.

아래 예제는 `cc-cmp`를 사용해서 서로 다른 타입의 값을 비교하는 것을 보여줍니다.

```clojure
user> (pprint (sort cc-cmp [true false nil Double/MAX_VALUE 10
                            Integer/MIN_VALUE :a "b" 'c (ref 5)
                            [5 4 3] '(5 4) (seq [5]) (cons 6 '(1))
                            #{1 2 3} #{2 1}
                            {:a 1, :b 2} {:a 1, :b -2}
                            (object-array [1 2 3 4])]))
(nil
 {:a 1, :b -2}
 {:a 1, :b 2}
 #{1 2}
 #{1 2 3}
 :a
 #<Ref@1493d9b3: 5>
 (5)
 (5 4)
 [5 4 3]
 (6 1)
 c
 false
 true
 -2147483648
 10
 1.7976931348623157E308
 "b"
 [1, 2, 3, 4])
nil
```

>
Original author: Andy Fingerhut

## 함께 읽기

- [Comparator - Java SE 17 (docs.oracle.com)]( https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/Comparator.html )

## 참고문헌

- [Comparators Guide]( https://clojure.org/guides/comparators )


