---
layout  : wiki
title   : Cardinality
summary : 기수성
date    : 2022-12-19 22:57:15 +0900
updated : 2024-04-10 20:33:45 +0900
tag     : 
resource: 83/6F4D46-B963-4139-BF3F-AC026F7B961F
toc     : true
public  : true
parent  : [[/database]]
latex   : true
---
* TOC
{:toc}

## 의미

영문 위키백과의 Cardinality 항목은 이렇게 설명하며 시작한다.

>
In mathematics, the cardinality of a set is a measure of the number of elements of the set.
For example, the set $$ A=\{2,4,6\} $$ contains 3 elements, and therefore $$ A $$ has a cardinality of 3.
[^wikipedia-cardinality-eng]

한국어 위키백과에서는 다음과 같이 설명하며 시작한다.

>
집합론에서, 집합의 크기(영어: cardinality) 또는 농도(濃度)는 집합의 "원소 개수"에 대한 척도이다.
유한 집합의 크기의 표현은 자연수로 충분하다.
임의의 집합의 크기는 단사 함수 및 전단사 함수를 통해 비교할 수 있으며, 기수로서 대상화할 수도 있다.
집합 $$A$$의 크기는 $$ \vert A \vert $$ 또는 $$ n(A) $$, $$ A $$, $$ card(A) $$, $$ \#A $$로 표기한다.
[^wikipedia-cardinality-kor]

## 선택도와 기수성

>
인덱스에서 선택도(Selectivity) 또는 기수성(Cardinality)은 거의 같은 의미로 사용되며, 모든 인덱스 키 값 가운데 유니크한 값의 수를 의미한다.
전체 인덱스 키 값은 100개인데, 그중에서 유니크한 값의 수는 10개라면 기수성은 10이다.
인덱스 키 값 가운데 중복된 값이 많아지면 많아질수록 기수성은 낮아지고 동시에 선택도 또한 떨어진다.
인덱스는 선택도가 높을수록 검색 대상이 줄어들기 때문에 그만큼 빠르게 처리된다.
>
-- Real MySQL 8.0 1권. 8.3.3.3장. 227쪽.


## 참고문헌

- Real MySQL 8.0 (1권) / 백은빈, 이성욱 저 / 위키북스 / 초판 발행 2021년 09월 08일
- [Cardinality (wikipedia.org)]( https://en.wikipedia.org/wiki/Cardinality )
- [집합의 크기 (wikipedia.org)]( https://ko.wikipedia.org/wiki/집합의_크기 )

## 주석

[^wikipedia-cardinality-eng]: [Cardinality]( https://en.wikipedia.org/wiki/Cardinality )
[^wikipedia-cardinality-kor]: [집합의 크기]( https://ko.wikipedia.org/wiki/집합의_크기 )

