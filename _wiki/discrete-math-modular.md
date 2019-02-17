---
layout  : wiki
title   : 모듈러 연산(나머지 연산)
summary : Modular Arithmetic
date    : 2019-02-17 21:58:31 +0900
updated : 2019-02-18 00:10:12 +0900
tags    : math
toc     : true
public  : true
parent  : study-discrete-mathematics
latex   : true
---
* TOC
{:toc}

# 정의

## 나눗셈 알고리즘

**THE DIVISION ALGORITHM**

> Let $$a$$ be an integer and $$d$$ a positive integer.
Then there are unique integers $$q$$ and $$r$$,
with $$0 ≤ r < d$$, such that $$a = dq + r$$.

* 정수 $$ a $$와 양의 정수 $$ d $$ 에 대하여
    * $$ 0 \le r \lt d $$ 이고, $$ a = dq + r $$ 을 만족하는 $$ q $$와 $$ r $$ 이 유일하게 존재한다.
    * $$ r $$이 나머지. 즉 나머지는 0 보다 크다.

## div 와 mod

>
In the equality given in the division algorithm,
d is called the divisor,
a is called the dividend,
q is called the quotient,
and r is called the remainder.
This notation is used to express the quotient and remainder:  
$$
\begin{align}
q & = a \text{ div } d \\
r & = a \mod d \\
\end{align}
$$

* `mod` 는 Java, Python 과 같은 프로그래밍 언어에서의 `%` 와 같다.
* $$ 7 = 2 \times 3 + 1$$ 인 경우
    * $$2 = 7 \text{ div } 3 $$.
    * $$ 7 \mod 2 = 1 $$.

음수의 나눗셈은 어떻게 될까?

* $$ -7 = 2 \times (-4) + 1$$ 로 생각한다.
    * 나머지 $$ r $$은 $$ 0 \le r \lt 2 $$ 여야 한다.
    * $$ -7 \mod 2 = 1 $$.

## 모듈로 합동

**congruent modulo**

>
If $$a$$ and $$b$$ are integers and $$m$$ is a positive integer,
then $$a$$ is congruent to $$b$$ modulo $$m$$ if $$m$$ divides $$a − b$$.
We use the notation $$a ≡ b \ (\mod m)$$ to indicate that $$a$$ is congruent to $$b$$ modulo $$m$$.
We say that $$a ≡ b \ (\mod m)$$ is a **congruence** and that $$m$$ is its **modulus**(plural moduli).
If $$a$$ and $$b$$ are not congruent modulo $$m$$, we write $$ a \not ≡ b \ (\mod m)$$.

* 정수 $$ a, b $$와 양의 정수 $$ m $$에 대하여
    * $$ a - b $$ 가 $$m$$ 으로 나누어 떨어진다면,
        * $$a$$와 $$b$$는 **모듈로 $$m$$ 합동(a is congruent to b modulo m)**이다.
* 모듈로 $$m$$ 합동의 표기. $$ a ≡ b \ (\mod m) $$.
* 모듈로 $$m$$ 합동이 아님의 표기. $$ a \not ≡ b \ (\mod m) $$.

### 모듈로 합동의 필요충분조건

>
Let $$a$$ and $$b$$ be integers, and let $$m$$ be $$a$$ positive integer.
Then $$a ≡ b \ (\mod m)$$ if and only if $$a \mod m = b \mod m$$.

* $$ a \equiv b \ (\mod m) $$ 의 필요충분조건은
    * $$ a \mod m = b \mod m $$.

>
Let $$m$$ be a positive integer.
The integers $$a$$ and $$b$$ are congruent modulo $$m$$
if and only if there is an integer $$k$$ such that $$a = b + km$$.

* 정수 $$ a, b $$ 가 모듈로 $$m$$ 합동이기 위한 필요충분조건은
    * $$ a = b + km $$ 을 만족하는 $$ k $$ 의 존재이다.
    * $$ a - b = km $$ 이란 뜻이므로, 당연한 말이다.

### 모듈로 m 합동 클래스

>
The set of all integers congruent to an integer $$a$$ modulo $$m$$
is called the congruence class of $$a$$ modulo $$m$$.

* 정수 $$ a $$와 모듈로 $$ m $$합동인 모든 정수의 집합을
    * "$$ a $$와 모듈로 $$ m $$ 합동 클래스"라 부른다.
* 예를 들어 $$ \{ ...-19, -9, 1, 11, 21, 31, ... \} $$ 은 1과 모듈로 10 합동 클래스다.
    * (10으로 나누면 나머지가 1 나오는 모든 정수의 집합).

## 모듈로 연산

>
Let $$m$$ be a positive integer.  
If $$a ≡ b \ (\mod m)$$ and $$c ≡ d \ (\mod m)$$,  
then $$a + c ≡ b + d \ (\mod m)$$ and $$ac ≡ bd \ (\mod m)$$.

* 양의 정수 $$ m $$에 대하여
    * $$a ≡ b \ (\mod m)$$ 이고 $$c ≡ d \ (\mod m)$$ 이면,
    * $$a + c ≡ b + d \ (\mod m)$$ 이고 $$ac ≡ bd \ (\mod m)$$ 이다.
* 양의 정수 $$ m $$에 대하여
    * $$a$$와 $$b$$ 가 $$m$$ 으로 나눴을 때의 나머지가 같고, $$c$$와 $$d$$가 $$m$$으로 나눴을 때의 나머지가 같다면
    * $$a + c ≡ b + d \ (\mod m)$$ 이고 $$ac ≡ bd \ (\mod m)$$ 이다.

>
Let $$m$$ be a positive integer and let $$a$$ and $$b$$ be integers.
Then $$(a + b) \mod m = ((a \mod m) + (b \mod m)) \mod m$$  
and  
$$ab \mod m = ((a \mod m)(b \mod m)) \mod m.$$

## 산술 모듈로 m

**Arithmetic Modulo m**

* $$ m $$ 보다 작고 음이 아닌 정수의 집합, $$ Z_m = \{ 0, 1, ..., m-1 \} $$.

연산자 정의

* $$ +_m $$: $$ Z_m $$ 의 두 원소에 대해 덧셈을 하고 $$ \mod m $$ 한다.
    * $$ a +_m b = (a + b) \mod m $$.
* $$ \cdot_m $$: $$ Z_m $$ 의 두 원소에 대해 곱셈을 하고 $$ \mod m $$ 한다.
    * $$ a \cdot_m b = (a \times b) \mod m $$.

위의 두 연산자를 사용할 때 **산술 모듈로 m 한다**(we are said to be doing arithmetic modulo m)고 말한다.

위의 두 연산자는 다음을 만족한다.

* $$a \in Z_m, b \in Z_m, c \in Z_m$$이면,
    * 폐쇄(closure): $$a+_m b \in Z_m $$이고 $$a \cdot_m b \in Z_m $$이다.
    * 결합성(associativity): $$(a+_m b)+_m c =a+_m(b+_m c)$$ 이고 $$(a\cdot_m b)\cdot_m c =a\cdot_m(b \cdot_m c)$$ 이다.
    * 교환성(commutativity): $$a+_m b \in Z_m $$이고 $$a \cdot_m b \in Z_m $$이다.
    * 항등원(identity elements): 0과 1은 각각 모듈로 m 합과 곱의 항등원이다.
    * 덧셈법 역원(additive inverses): $$ a \not = 0 $$ 이고 $$ a \in Z_m $$ 이면, $$ m - a $$ 는 a 모듈로 m 의 덧셈법 역원이다.
        * $$ a+_m (m-a) = 0 $$ 이고, $$ 0 +_m 0 = 0 $$ 이다.
    * 분배성(distributivity): $$a \cdot_m(b +_m c) = (a \cdot_m b)+_m(a \cdot_m c)$$ 이고, $$(a+_m b) \cdot_m c = (a\cdot_m c)+_m(b \cdot_m c)$$ 이다.

모듈로 m 합을 갖는 $$ Z_m $$ 은 교환 그룹(commutative group) 이라 불린다.

두 연산을 모두 갖는 $$ Z_m $$ 은 교환 고리(commutative ring) 이라 불린다.

# 참고문헌

* Rosen의 이산수학 / Kenneth H. Rosen 저 / 공은배 등저 / 한국맥그로힐(McGraw-Hill KOREA) / 2017년 01월 06일

