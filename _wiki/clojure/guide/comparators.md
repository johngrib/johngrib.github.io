---
layout  : wiki
title   : Comparators Guide
summary : 번역 중인 문서
date    : 2022-03-01 21:23:11 +0900
updated : 2022-03-01 22:21:08 +0900
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

### Off-the-shelf comparators

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

