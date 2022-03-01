---
layout  : wiki
title   : Comparators Guide
summary : 번역 중인 문서
date    : 2022-03-01 21:23:11 +0900
updated : 2022-03-01 21:28:45 +0900
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


### Introduction

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

