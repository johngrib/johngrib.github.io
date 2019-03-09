---
layout  : wiki
title   : 집합
summary : Sets
date    : 2019-01-14 22:13:18 +0900
updated : 2019-02-02 14:50:16 +0900
tag     : math
toc     : true
public  : true
parent  : study-discrete-mathematics
latex   : true
---
* TOC
{:toc}

# 정의

## 집합(sets)

>
A set is an unordered collection of objects, called elements or members of the set.
A set is said to contain its elements.
We write $$a ∈ A$$ to denote that a is an element of the set A.
The notation $$a \notin A$$ denotes that a is not an element of the set A.

* 집합은 순서 없는 객체들의 컬렉션이다.

## 집합의 같음

>
Two sets are equal if and only if they have the same elements.
Therefore, if A and B are sets,
then A and B are equal if and only if $$∀x(x ∈ A ↔ x ∈ B)$$.
We write $$A=B$$ if A and B are equal sets.

* 두 집합이 같은 원소를 갖고 있다면 두 집합은 같다.
* $$ A \subseteq B $$ 이고, $$ B \subseteq A $$ 이면 $$ A=B $$.

## 부분집합(subset), 진 부분집합(proper subset)

>
The set A is a subset of B if and only if every element of A is also an element of B.
We use the notation $$A ⊆ B$$ to indicate that A is a subset of the set B.

* 집합 A의 모든 원소가 집합 B의 원소이면 A는 B의 부분집합이다.
* $$ A \subset B $$ : 진 부분집합(proper subset)
    * $$ A \subseteq B $$ 이고, $$ A \ne B $$ 이면 A는 B의 진 부분집합.

## 멱집합(poser set)

>
Given a set S, the power set of S is the set of all subsets of the set S.
The power set of S is denoted by $$P(S)$$.

* 집합 S의 멱집합(power set)은 집합 S의 모든 부분집합의 집합을 말한다.
* $$ P(S) $$로 표기한다.

## 데카르트 곱(cartesian products)

>
Let A and B be sets.
The Cartesian product of A and B, denoted by $$A × B$$,
is the set of all ordered pairs $$(a, b)$$, where $$a ∈ A$$ and $$b ∈ B$$.
Hence, $$A × B = \{(a, b) \vert a ∈ A ∧ b ∈ B \}$$

* A와 B의 데카르트 곱 $$A × B$$는 $$a ∈ A$$ 이고 $$b ∈ B$$인 모든 순서쌍의 집합이다.
* $$ A_1 × A_2 × ... × A_n = \{(a_1, a_2, ..., a_n) \vert a_i ∈ A_i \ for \ i = 1, 2, ..., n \} $$ &nbsp;
* $$ A × B $$의 부분집합 $$ R $$을 집합 A 로부터 집합 B로의 관계(relation)라고 한다.

## 연산

### 합집합(union)

> Let A and B be sets.
The union of the sets A and B, denoted by $$A ∪ B$$,
is the set that contains those elements that are either in A or in B, or in both.

* $$ A ∪ B = \{ x \vert x ∈ A ∨ x ∈ B \} $$
* 여러 집합의 합집합은 적어도 하나의 집합에 있는 원소들의 집합이다.

$$ A_1 ∪ A_2 ∪ ... ∪ A_n = \bigcup_{i=1}^n A_i $$

### 교집합(intersection)

> Let A and B be sets.
The intersection of the sets A and B, denoted by $$A ∩ B$$,
is the set containing those elements in both A and B.

* $$ A ∩ B = \{ x \vert x ∈ A ∧ x ∈ B \} $$
* 여러 집합의 교집합은 여러 집합 모두에 나타나는 원소들의 집합이다.

$$ A_1 ∩ A_2 ∩ ... ∩ A_n = \bigcap_{i=1}^n A_i $$

#### 서로 소(disjoint)

> Two sets are called disjoint if their intersection is the empty set.

* 두 집합의 교집합이 공집합인 경우를 서로 소라 한다.

### 차집합(difference)

> Let A and B be sets. The difference of A and B, denoted by $$A − B$$, is the set containing those elements that are in A but not in B. The difference of A and B is also called the complement of B with respect to A.

* A에 대한 B의 여집합(complement of B with respect to A) 이라고도 부른다.
* $$ A-B = \{ x \vert x ∈ A ∧ x ∉ B \} $$

### 여집합(complement)

> Let U be the universal set. The complement of the set A, denoted by $$ \bar{A} $$, is the complement of A with respect to U . Therefore, the complement of the set A is $$U − A$$.

* 여집합은 $$ U - A $$이고, $$ \bar{A} $$로 표기한다.
* $$ \bar{A} = \{ x ∈ U \vert x ∉ A \} $$

# 집합의 항등

| $$A ∩ U = A$$ <br> $$A ∪ \emptyset = A $$                      | 항등법칙         | Identity laws       |
| $$A ∪ U = U$$ <br> $$A ∩ \emptyset = \emptyset $$              | 지배법칙         | Domination laws     |
| $$A ∪ A = A$$ <br> $$A ∩ A = A$$                               | 멱등법칙         | Idempotent laws     |
| $$ \overline{ (\bar{A}) } = A $$                               | 보원법칙         | Complementation law |
| $$A ∪ B = B ∪ A$$ <br> $$ A ∩ B = B ∩ A $$                     | 교환법칙         | Commutative laws    |
| $$A∪(B∪C) = (A∪B)∪C$$ <br> $$A∩(B∩C) = (A∩B)∩C$$               | 결합법칙         | Associative laws    |
| $$A∪(B∩C)=(A∪B)∩(A∪C)$$<br>$$A∩(B∪C)=(A∩B)∪(A∩C)$$             | 분배법칙         | Distributive laws   |
| $$\bar{A∩B}=\bar{A}∪\bar{B}$$<br>$$\bar{A∪B}=\bar{A}∩\bar{B}$$ | 드 모르간의 법칙 | De Morgan's laws    |
| $$A ∪ (A ∩ B) = A$$ <br> $$A ∩ (A ∪ B) = A $$                  | 흡수법칙         | Absorption laws     |
| $$A ∪ \bar{A} = U$$ <br> $$A ∩ \bar{A} = ∅ $$                  | 보수법칙         | Complement laws     |

# datatype 과 집합

>
컴퓨터과학에서 이야기하는 "데이터형"이라고 하는 개념은 집합의 개념 위에 정의된다는 것에 주목하라.
특히 **datatype, type**이란 집합과 그 집합을 구성하고 있는 개체에 적용할 수 있는 연산자들의 집합을 말한다.
예를 들어 boolean 이란 집합 $$ \{ 0, 1 \} $$과, 그 원소인 0과 1을 피연산자로 하여 연산을 수행하는
**AND, OR, NOT**과 같은 연산자들을 함께 지칭하는 것이다.

# 집합의 크기

**Cardinality of Sets**

>
Let S be a set.
If there are exactly n distinct elements in S where n is a nonnegative integer,
we say that S is a finite set and that n is the cardinality of S.
The cardinality of S is denoted by $$ \vert S \vert $$.

* 0 이상의 정수 $$n$$에 대하여, 집합 $$S$$에 $$n$$ 개의 서로 다른 원소가 존재하면
    * $$S$$는 유한집합(finite set)이다.
    * $$n$$은 집합 $$S$$의 크기(cardinality)이다.
* 유한 집합(finite set) $$S$$의 크기는 $$ \vert S \vert $$로 표기한다.

>
The sets A and B have the same cardinality if and only if there is a one-to-one correspondence from A to B.
When A and B have the same cardinality, we write $$|A| = |B|$$.

* 집합 A와 B가 같은 크기(same cardinality)이면
    * A로부터 B로의 [전단사 함수](/wiki/discrete-math-functions/#전단사-함수)가 존재한다.
    * 두 집합의 크기가 같을 때 $$\vert A \vert = \vert B \vert$$로 표기한다.

$$
\def\abs#1{\lvert #1 \rvert}
$$

>
If there is a one-to-one function from A to B, the cardinality of A is less than or the same as the cardinality of B and we write $$\abs{A} ≤ \abs{B}$$. Moreover, when $$\abs{A} ≤ \abs{B}$$ and A and B have different cardinality, we say that the cardinality of A is less than the cardinality of B and we write $$\abs{A} < \abs{B}$$.

* A로부터 B로의 [단사 함수](/wiki/discrete-math-functions/#단사-함수)가 있다면
    * A의 크기는 B보다 작거나 같다. $$ \abs{A} \le \abs{B} $$.
* $$ \abs{A} \le \abs{B} $$이고, $$ \abs{A} \ne \abs{B} $$이면
    * A의 크기는 B보다 작다. $$ \abs{A} < \abs{B} $$.

## 셀 수 있는 집합

**Countable Sets**

>
A set that is either finite or has the same cardinality as the set of positive integers is called countable.
A set that is not countable is called uncountable.
When an infinite set S is countable,
we denote the cardinality of S by $$ \aleph_0 $$
(where $$\aleph$$ is aleph, the first letter of the Hebrew alphabet).
We write $$\abs{S} = \aleph_0$$ and say that S has cardinality "**aleph null**".

* **uncountable**(셀 수 없는) 집합
* **countable**(셀 수 있는) 집합
    * 원소의 수가 유한한 집합.
    * 원소의 수가 무한한 집합 중, 원소의 수가 **양의 정수의 집합**과 같은 크기를 갖는 집합.
        * 무한집합 S가 셀 수 있을 경우 S의 크기를 $$ \aleph_0 $$ 라고 표기한다. $$ \abs{S} = \aleph_0 $$.
        * $$ \aleph_0 $$는 "알레프 널(aleph null)"이라 읽는다.

* 무한 집합을 셀 수 있다는 말은 좀 이상하게 들릴 수 있다.
    * 양의 정수의 집합으로부터 어떤 집합 S로의 일대일 대응이 가능하다면(전단사 함수) 셀 수 있다고 생각하자.

> If A and B are countable sets, then $$A ∪ B$$ is also countable.

* 집합 A와 집합 B와 셀 수 있는 집합이면, $$A ∪ B$$도 셀 수 있는 집합이다.

### 슈뢰더-베른슈타인 정리

**Schröder–Bernstein theorem**

>
If A and B are sets with $$\abs{A} ≤ \abs{B}$$ and $$\abs{B} ≤ \abs{A}$$, then $$\abs{A} = \abs{B}$$.
In other words, if there are one-to-one functions $$f$$ from A to B and $$g$$ from B to A,
then there is a one-to-one correspondence between A and B.

* A, B 가 $$\abs{A} ≤ \abs{B}$$ 이고 $$\abs{B} ≤ \abs{A}$$, 이면 $$\abs{A} = \abs{B}$$ 이다.
* 즉 A 에서 B 로의 단사 함수 $$f$$ 가 존재하고, B 로부터 A 로의 단사 함수 $$g$$ 가 존재하면 A와 B는 **전단사 함수 관계**이다.

**예제**: $$ \abs{ (0,1) } = \abs{ (0,1] } $$ 인가?

* 슈뢰더 베른슈타인 정리를 사용하자.
    * $$ (0,1) \subset (0,1] $$ 이다. 그러므로, $$ (0,1) $$에서 $$ (0,1] $$ 으로의 단사 함수가 존재한다.
        * $$ f(x) = x $$ 가 그러한 단사 함수의 하나에 해당한다.
    * $$ (0,1] $$ 에서 $$ (0,1) $$ 로의 단사 함수를 찾아보자.
        * $$ g(x) = \frac{x}{2} $$ 는 $$(0,1]$$의 모든 원소를 $$(0, \frac{1}{2}]$$로 대응시키는 단사 함수다.
    * 따라서 $$ \abs{ (0,1) } = \abs{ (0,1] } $$ 는 참이다.

### 모든 정수의 집합은 셀 수 있는가?

* 모든 정수는 다음과 같이 나열할 수 있을 것이다. 인덱스를 매기기 애매하다.

$$ ..., -3, -2, -1, 0, 1, 2, 3, ... $$

* 나열하는 방법을 바꿔서, 다음과 같이 나열해 보자.

$$ 0, 1, -1, 2, -2, 3, -3, ... $$

이렇게 하면 양의 정수로 인덱스를 매길 수 있다. 전단사 함수 관계가 성립하는 것이다.

| 1 | 2 | 3  | 4 | 5  | 6 | 7  | ... |
| 0 | 1 | -1 | 2 | -2 | 3 | -3 | ... |

따라서 모든 정수의 집합은 셀 수 있다.

### 모든 양의 유리수의 집합은 셀 수 있는가?

다음과 같이 배열하면 순서대로 셀 수 있다.

$$
\require{enclose}
\def\cir#1{ \enclose{circle}{#1} }

\begin{matrix}
\cir{1\over 1}&   &\cir{2 \over 1}& → &\cir{3 \over 1}&   &\cir{4 \over 1}& → &\cir{5 \over 1}& \cdots \\
↓             & ↗ &               & ↙ &               & ↗ &               & ↙                          \\
\cir{1\over 2}&   &    {2 \over 2}&   &\cir{3 \over 2}&   &{4 \over 2}    &   &{5 \over 2}    & \cdots \\
              & ↙ &               & ↗ &               & ↙                                              \\
\cir{1\over 3}&   &\cir{2 \over 3}&   &    {3 \over 3}&   &{4 \over 3}    &   &{5 \over 3}    & \cdots \\
↓             & ↗ &               & ↙                                                       \\
\cir{1\over 4}&   &    {2 \over 4}&   &    {3 \over 4}&   &{4 \over 4}    &   &{5 \over 4}    & \cdots \\
              & ↙                                                                           \\
\cir{1\over 5}&   &    {2 \over 5}&   &    {3 \over 5}&   &{4 \over 5}    &   &{5 \over 5}    & \cdots \\
↓             &   & \vdots        &   & \vdots        &   & \vdots        &   & \vdots      \\
\end{matrix}
$$

따라서 양의 유리수의 집합은 셀 수 있다.

## 셀 수 없는 집합

**An Uncountable Set**

### 칸토어의 대각선 논법

**Cantor diagonalization argument**: 실수는 비가산 집합이다.

* 귀류법을 사용하자.
    * 실수의 집합이 셀 수 있다고 가정하자.
    * 셀 수 있는 집합의 부분 집합은 셀 수 있으므로, 실수의 부분집합도 셀 수 있을 것이다.
    * 적당히 `(0, 1)` 범위($$ 0 \lt r \lt 1$$)의 수들의 집합을 잡는다.
        * 이 집합이 셀 수 없는 집합임을 보이면 된다.

0 과 1 사이의 실수를 모두 나열한다면 다음과 같을 것이다.

$$
\begin{align}
r_{1} & = 0.d_{11} d_{12} d_{13} d_{14} ... \\
r_{2} & = 0.d_{21} d_{22} d_{23} d_{24} ... \\
r_{3} & = 0.d_{31} d_{32} d_{33} d_{34} ... \\
r_{4} & = 0.d_{41} d_{42} d_{43} d_{44} ... \\
\vdots &  \\
\end{align}
$$

* 여기에서 $$d_{ij}$$는
    * $$ r_i $$ 의 소수점 아래 $$ j $$ 번째 숫자를 말하며,
    * $$ d_{ij} \in \{ 0,1,2,3,4,5,6,7,8,9 \}$$ 이다.

그런데 $$ d_{ij} $$가 다닥다닥 붙어있으니 알아보기가 어렵다.

네모칸을 나누어, 한 글자가 한 칸에 들어가도록 하면 눈이 편할 것 같다.

예를 들어 $$r_n = 0.1415$$ 를 이렇게 표기해 보자.

| $$r_n$$ | = | 0 | . | 1 | 4 | 1 | 5 | 0 | 0 | $$...$$ |

이제 0 과 1 사이의 모든 실수를 다음과 같이 나열했다고 하자.

| $$r_1 $$ | = | 0 | . | $$d_{11}$$ | $$d_{12}$$ | $$d_{13}$$ | $$d_{14}$$ | $$...$$ |
| $$r_2 $$ | = | 0 | . | $$d_{21}$$ | $$d_{22}$$ | $$d_{23}$$ | $$d_{24}$$ | $$...$$ |
| $$r_3 $$ | = | 0 | . | $$d_{31}$$ | $$d_{32}$$ | $$d_{33}$$ | $$d_{34}$$ | $$...$$ |
| $$r_4 $$ | = | 0 | . | $$d_{41}$$ | $$d_{42}$$ | $$d_{43}$$ | $$d_{44}$$ | $$...$$ |
| $$...$$  |   |   |   |            |            |            |            |         |

* 위에서 실수의 집합이 셀 수 있는 집합이라 가정했으므로,
    * 이렇게 나열한 집합도 셀 수 있는 집합이어야 한다.

그런데 $$r_1$$ 부터 $$r_n$$까지의 모든 수와 각 자리값이 하나씩만 다른 수를 만들어 보자.

이 수를 만들 수 있다면 0과 1 사이의 실수들 중 나열하지 못한 수가 존재한다는 의미이다.

따라서 모순이 발생하며, 그러므로 0과 1 사이의 실수는 셀 수 없는 집합이 된다.

그 수 $$x$$는 다음과 같이 만든다. (그러므로 실수의 집합은 셀 수 없는 집합이다.)

1. `i` 값을 `1`로 한다.
2. 실수 $$ r_i $$의 소수점 아래 $$ i $$ 번째 수를 확인한다.
    * `if` 그 수가 4 이면 $$ x $$의 소수점 아래 $$ i $$번째 수를 `5` 로 한다.
    * `else` $$ x $$의 소수점 아래 $$ i $$번째 수를 `4` 로 한다.
3. `i` 에 `1`을 더한다.
4. $$ r_i $$ 가 마지막 숫자인가?
    * `if` 맞다면 작업을 끝낸다.
    * `else` `GOTO 2`

예를 들어 $$ r_1 $$ 부터 $$ r_5 $$ 이 다음과 같다고 하자.

| $$r_1$$ | = | 0 | . | $$\color{blue}1$$ | 4                | 2                  | 3                 | 0     | 0     |
| $$r_2$$ | = | 0 | . | 1                 | $$\color{red}4$$ | 2                  | 4                 | 0     | 0     |
| $$r_3$$ | = | 0 | . | 1                 | 4                | $$\color{green}2$$ | 5                 | 0     | 0     |
| $$r_4$$ | = | 0 | . | 1                 | 4                | 2                  | $$\color{gold}6$$ | 0     | 0     |
| $$r_5$$ | = | 0 | . | 1                 | 4                | 2                  | 7                 | __0__ | 0     |

$$x$$ 는 다음과 같을 것이다.

| $$x$$ | = | 0 | . | $$\color{blue}4$$ | $$\color{red}5$$ | $$\color{green}4$$ | $$\color{gold}4$$ | 4 |

4와 5로만 구성된 수이지만, $$r_1$$ ~ $$r_5$$ 중 어느 숫자와도 같을 수 없다. 적어도 한 자리는 다른 숫자가 되기 때문이다.

## 계산 가능, 계산 불가

**coumputable, uncomputable**

>
We say that a function is **computable**
if there is a computer program in some programming language that finds the values of this function.
If a function is not computable we say it is **uncomputable**.

* 계산 가능
    * 어떤 프로그래밍 언어로 어떤 컴퓨터 프로그램을 짰을 때, 그 프로그램이 어떤 함수의 값을 계산해 낼 수 있다면, 그 함수는 **계산가능**하다고 한다.
* 계산 불가능
    * 어떤 프로그래밍 언어로 어떤 컴퓨터 프로그램을 짰을 때, 그 프로그램이 어떤 함수의 값을 계산해 낼 수 없다면, 그 함수는 **계산불가능**하다고 한다.


# 용어 정리

| English                    | 한국어           | Example, 설명                                      |
|----------------------------|------------------|----------------------------------------------------|
| element, member            | 원소             |                                                    |
| roster method              | 원소나열법       | $$ O = \{ 1,2,3 \} $$                              |
| set builder notation       | 조건 제시법      | $$ O = \{ x \vert x\text{는 짝수} \} $$            |
| empty set, null set        | 공집합           | $$ \emptyset $$                                    |
| singleton set              | 단일원소 집합    | $$ O = \{ 1 \} $$                                  |
| venn diagrams              | 벤 다이어그램    |                                                    |
| universal set              | 전체집합         | $$ U $$                                            |
| subsets                    | 부분집합         |                                                    |
| proper subset              | 진부분집합       |                                                    |
| size of a set, cardinality | 집합의 크기      | $$ \vert \emptyset \vert = 0 $$                    |
| power set                  | 멱집합           | $$ P(\{0,1\})=\{\emptyset,\{0\},\{1\},\{0,1\}\} $$ |
| ordered n-tuples           | 순서가 있는 n짝  |                                                    |
| ordered pairs              | 순서쌍           |                                                    |
| countable                  | 셀 수 있다(가산) |                                                    |
| aleph                      | 알레프           | $$ \aleph $$                                       |

## 조건 제시법의 예

| $$N =\{0,1,2,3,...\} $$                           | 자연수의 집합    | the set of natural numbers       |
| $$Z =\{...,-2,-1,0,1,2,...\} $$                   | 정수의 집합      | the set of integers              |
| $$Z^+=\{1,2,3,...\} $$                            | 양의 정수의 집합 | the set of positive integers     |
| $$Q =\{\frac{p}{q}\vert p\in Z,q\in Z,q\ne 0\} $$ | 유리수의 집합    | the set of rational numbers      |
| $$ R $$                                           | 실수의 집합      | the set of real numbers          |
| $$ R^+ $$                                         | 양의 실수의 집합 | the set of positive real numbers |
| $$ C $$                                           | 복소수의 집합    | the set of complex numbers       |

## 구간(interval) 표기법

$$
\begin{align}
[a,b] & = \{ x \vert a \le x \le b \} \\
[a,b) & = \{ x \vert a \le x \lt b \} \\
(a,b] & = \{ x \vert a \lt x \le b \} \\
(a,b) & = \{ x \vert a \lt x \lt b \} \\
\end{align}
$$

* **[a, b]** : 닫힌 구간(closed interval)
* **(a, b)** : 열린 구간(open interval)


# 참고문헌

* Rosen의 이산수학 / Kenneth H. Rosen 저 / 공은배 등저 / 한국맥그로힐(McGraw-Hill KOREA) / 2017년 01월 06일

# Links

* [대각선 논법(위키백과)](https://ko.wikipedia.org/wiki/%EB%8C%80%EA%B0%81%EC%84%A0_%EB%85%BC%EB%B2%95 )

