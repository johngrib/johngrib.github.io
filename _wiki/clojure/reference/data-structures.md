---
layout  : wiki
title   : Data Structures
summary : Clojure 레퍼런스 문서 번역
date    : 2022-06-12 00:53:56 +0900
updated : 2022-06-12 01:16:41 +0900
tag     : clojure 번역
toc     : true
public  : true
parent  : [[/clojure/reference]]
latex   : false
---
* TOC
{:toc}

## Data Structures: Clojure Reference 문서 번역

- 원문: [Data Structures]( https://clojure.org/reference/data_structures )

>
Clojure has a rich set of data structures. They share a set of properties:
>
- They are immutable
- They are read-able
- They support proper value equality semantics in their implementation of equals
- They provide good hash values
- In addition, the collections:
    - Are manipulated via interfaces.
    - Support sequencing
    - Support persistent manipulation.
    - Support metadata
    - Implement java.lang.Iterable
    - Implement the non-optional (read-only) portion of java.util.Collection or java.util.Map

Clojure는 다음과 같은 속성들을 갖는 다양한 종류의 데이터 구조를 제공합니다.

- immutable 합니다.
- 읽기 전용입니다.
- 개별적인 equals 구현을 통해 동등성 판별이 용이한 값을 제공합니다.
- 적절한 hash 값을 제공합니다.
- collection의 경우
    - interface를 통해 조작합니다.
    - 시퀀스를 지원합니다.
    - 영속성 조작을 지원합니다.
    - 메타데이터를 지원합니다.
    - java.lang.Iterable을 구현합니다.
    - java.util.Collection 또는 java.util.Map의 일부분을 읽기 전용으로 구현합니다.

### nil

>
nil is a possible value of any data type in Clojure.
nil has the same value as Java null.
The Clojure conditional system is based around nil and false, with nil and false representing the values of logical falsity in conditional tests - anything else is logical truth.
In addition, nil is used as the end-of-sequence sentinel value in the sequence protocol.

nil Clojure의 모든 데이터 타입이 가질 수 있는 값입니다.

nil은 Java의 null과 같은 값입니다.

Clojure 조건 제어 시스템은 nil과 false를 기준으로 삼습니다.
조건 판별에서 nil과 false는 논리적 거짓을 표현하며, 그 외의 모든 것은 논리적 참을 의미합니다.

한편, nil은 시퀀스 프로토콜에서 시퀀스의 끝을 의미하는 sentinel 값으로 사용됩니다.


### Numbers
### Strings
### Characters
### Keywords
### Symbols
### Collections
### Lists (IPersistentList)
### Vectors (IPersistentVector)
### Maps (IPersistentMap)
### StructMaps
### ArrayMaps
### Sets
