---
layout  : wiki
title   : 이름 짓기
summary : 프로그래밍 할 때 이름 짓기가 가장 어렵더라
date    : 2018-11-18 22:04:16 +0900
updated : 2023-01-27 21:17:52 +0900
tag     : proverb principle naming
resource: 4A/46ED35-3756-494C-B709-5707FE7B1C50
toc     : true
public  : true
parent  : [[/software-engineering]]
latex   : false
---
* TOC
{:toc}

## 알렉산더 스테파노프의 명명 원칙

알렉산더 A. 스테파노프(STL의 창안자)의 From Mathematics to Generic Programming에 다음과 같은 원칙이 소개되어 있기에 옮겨 본다.

> The Naming Principle
>
> If we are coming up with a name for something, or overloading an existing name, we should follow these three guidelines:
>
> 1. If there is an established term, use it.
> 2. Do not use an established term inconsistently with its accepted meaning. In particular, overload an operator or function name only when you will be preserving its existing semantics.
> 3. If there are conflicting usages, the much more established one wins.

새로운 이름을 짓거나 기존의 이름을 오버로드하는 경우, 다음의 가이드라인을 따르도록 한다.

1. 관례적으로 널리 쓰이는 용어가 있다면, 사용한다.
2. 널리 쓰이는 용어를 모순되는 용도로 사용하지 않도록 한다.
    * 특히, 연산자/함수 이름을 오버로드 할 경우 원래의 의미가 변하지 않도록 한다.
3. 용어의 쓰임이 여러 곳에서 충돌한다면, 더 많이 사용되는 쪽을 선택한다.

>
The name vector in STL was taken from the earlier programming languages Scheme and Common Lisp. Unfortunately, this was inconsistent with the much older meaning of the term in mathematics and violates Rule 3; this data structure should have been called array. Sadly, if you make a mistake and violate these principles, the result might stay around for a long time.

* STL의 vector는 프로그래밍 언어 Scheme, Common Lisp 에서 따 온 것이다.
    * 그런데, Vector는 이미 수학에서 오랫동안 사용하고 있던 용어를 다른 의미로 사용하는 것이다.
    * 따라서 3번 규칙을 어긴 셈이 된다.
    * vector는 원래 array라 불려야 올바르다.
* 이와 같이 원칙을 어기는 실수를 하게 되면, 그 결과는 오랫동안 남아 있게 된다.

## From: DATABASE DESIGN FOR MERE MORTALS

Michael J. Hernandez는 데이터베이스 테이블 이름 짓기에 대한 지침을 제시한다.
[^mortals-148]

- 유일하고, 전체 조직에 의미가 있는 설명적인 이름을 부여한다.
- 테이블의 주제를 정확하게, 명확하게, 그리고 모호하지 않게 식별하는 이름을 부여한다.
- 테이블의 주제를 전달하기 위해 필요한 최소 개수의 단어들을 사용하라.
- 물리적 특성을 전달하는 단어들을 사용하지 말라.
- 두문자어(頭文字語, acronyms)와 약어(abbreviations)를 사용하지 않는다.
- 테이블에 입력되는 데이터를 지나치게 제한하는 독특한 이름이나 다른 단어들을 사용하지 않는다.
- 하나 이상의 주제를 암시적 또는 명시적으로 식별하는 이름을 사용하지 않는다.
- 이름의 복수형을 사용한다.


## 출처

* [FROM MATHEMATICS TO GENERIC PROGRAMMING / ALEXANDER A. STEPANOV DANIEL E. ROSE](http://www.fm2gp.com/ )
    * 한국 출판: 알고리즘 산책 수학에서 제네릭 프로그래밍까지. 알렉산더 A. 스테파노프, 다니엘 E. 로즈 저/서환수 역 / 길벗 / 2018년 05월 30일
- 운명적 존재를 위한 데이터베이스 설계 [제2판] / Michael J. Hernandez 저 / 손광수 역 / 지앤선(志&嬋) / 2004년 7월 20일 2쇄 / 원제: Database Design for Mere Mortals: A Hands-On Guide to Relational Database Design (2nd Edition)

## 주석

[^mortals-148]: 운명적 존재를 위한 데이터베이스 설계. 7장. 148쪽.

