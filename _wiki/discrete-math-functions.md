---
layout  : wiki
title   : 함수
summary : Functions
date    : 2019-01-23 22:56:50 +0900
updated : 2019-01-24 00:03:46 +0900
tags    : math
toc     : true
public  : true
parent  : study-discrete-mathematics
latex   : true
---
* TOC
{:toc}

# 정의

>
Let A and B be nonempty sets.
A function $$f$$ from A to B is an assignment of exactly one element of B to each element of A.
We write $$f(a) = b$$ if b is the unique element of B assigned by the function $$f$$ to the element a of A. If $$f$$ is a function from A to B, we write $$f : A → B$$.

* $$ f(a) = b $$.
    * A 의 원소 a 가 함수 $$ f $$로 인해 대응된 B의 원소가 b.
* A 에서 B 로의 함수 $$f$$ 를 $$ f : A → B $$ 로 표기한다.
* function 을 사상(mappings), 변환(transformations)라 부르기도 한다.

>
If $$f$$ is a function from A to B, we say that A is the domain of f and B is the codomain of f.
If f (a) = b, we say that b is the image of a and a is a preimage of b.
The range, or image, of f is the set of all images of elements of A.
Also, if f is a function from A to B, we say that f maps A to B.

* 정의역(domain)과 공역(codomain)
    * $$ f $$ 가 A 에서 B 로의 함수라면 A 를 정의역, B 를 공역이라 한다.
* 상(image)과 원상(preimage)
    * $$ f(a) = b $$ 이면 b 를 a 의 상, a 를 b 의 원상이라 한다.
* $$ f $$의 치역(range)은 A의 원소에 대응되는 모든 상(image)의 집합이다.
* $$ f $$가 A 에서 B 로의 함수이면 $$ f $$는 A 에서 B 로 사상(map) 한다고 표현한다.
* 두 함수가 같다면 다음 조건을 모두 만족해야 한다.
    * 정의역이 같다.
    * 공역이 같다.
    * 정의역의 원소와 공역의 원소 사이에 같은 사상을 갖는다.

# 용어 정리

| English         | 한국어      | Example           |
|-----------------|-------------|-------------------|
| function        | 함수        | $$ f(a) = b $$    |
| map             | 사상(=함수) |                   |
| transformations | 변환(=함수) |                   |
| domain          | 정의역      |                   |
| codomain        | 공역        |                   |
| range           | 치역        |                   |
| image           | 상          | b는 a의 상이다.   |
| preimage        | 원상        | a는 b의 원상이다. |
