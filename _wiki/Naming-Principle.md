---
layout  : wiki
title   : 명명 원칙(The Naming Principle)
summary : 
date    : 2018-11-18 22:04:16 +0900
updated : 2018-11-18 22:31:43 +0900
tag     : proverb principle naming
toc     : true
public  : true
parent  : proverb
latex   : false
---
* TOC
{:toc}

알렉산더 A. 스테파노프(STL을 창안한 사람)의 From Mathematics to Generic Programming에 다음과 같은 원칙이 소개되어 있기에 옮겨 본다.

>
The Naming Principle  
<br/>
If we are coming up with a name for something, or overloading an existing name, we should follow these three guidelines:

>
1. If there is an established term, use it.
2. Do not use an established term inconsistently with its accepted meaning. In particular, overload an operator or function name only when you will be preserving its existing semantics.
3. If there are conflicting usages, the much more established one wins.

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


# 출처

* [FROM MATHEMATICS TO GENERIC PROGRAMMING / ALEXANDER A. STEPANOV DANIEL E. ROSE](http://www.fm2gp.com/ )
    * 한국 출판: 알고리즘 산책 수학에서 제네릭 프로그래밍까지. 알렉산더 A. 스테파노프, 다니엘 E. 로즈 저/서환수 역 / 길벗 / 2018년 05월 30일

