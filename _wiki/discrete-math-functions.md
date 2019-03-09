---
layout  : wiki
title   : 함수
summary : Functions
date    : 2019-01-23 22:56:50 +0900
updated : 2019-01-25 21:22:58 +0900
tag     : math
toc     : true
public  : true
parent  : study-discrete-mathematics
latex   : true
---
* TOC
{:toc}

# 정의

## 함수의 개념

**function**

>
Let A and B be nonempty sets.
A function $$f$$ from A to B is an assignment of exactly one element of B to each element of A.
We write $$f(a) = b$$ if b is the unique element of B assigned by the function $$f$$ to the element a of A. If $$f$$ is a function from A to B, we write $$f : A → B$$.

* $$ f(a) = b $$.
    * A 의 원소 a 가 함수 $$ f $$로 인해 대응된 B의 원소가 b.
* A 에서 B 로의 함수 $$f$$ 를 $$ f : A → B $$ 로 표기한다.
* function 을 사상(mappings), 변환(transformations)라 부르기도 한다.

## 정의역, 공역, 치역, 상, 원상, 사상

**domain, codomain, range, image, preimage, map**

>
If $$f$$ is a function from A to B, we say that A is the domain of f and B is the codomain of f.
If f (a) = b, we say that b is the image of a and a is a preimage of b.
The range, or image, of f is the set of all images of elements of A.
Also, if f is a function from A to B, we say that f maps A to B.

* 정의역(domain)과 공역(codomain)
    * $$ f $$ 가 A 에서 B 로의 함수라면 A 를 정의역, B 를 공역이라 한다.
* 상(image)과 원상(preimage)
    * $$ f(a) = b $$ 이면 b 를 a 의 상, a 를 b 의 원상이라 한다.
    * $$ \begin{matrix} f(&a&) & = &b \\ &원상& & &상 \\ \end{matrix} $$ &nbsp;
* $$ f $$의 치역(range)은 A의 원소에 대응되는 모든 상(image)의 집합이다.
* $$ f $$가 A 에서 B 로의 함수이면 $$ f $$는 A 에서 B 로 사상(map) 한다고 표현한다.
* 두 함수가 같다면 다음 조건을 모두 만족해야 한다.
    * 정의역이 같다.
    * 공역이 같다.
    * 정의역의 원소와 공역의 원소 사이에 같은 사상을 갖는다.

## 함수의 합과 곱

>
Let f1 and f2 be functions from A to R.
Then $$f_1 + f_2$$ and $$f_1 f_2$$ are also functions from A to R defined for all $$x ∈ A$$ by  
$$
\begin{align}
(f_1 + f_2)(x) & = f_1(x) + f_2(x) \\
(f_1 f_2)(x)   & = f_1(x)f_2(x) \\
\end{align}
$$

* $$ f_1, f_2$$가 A 로부터 **R**(실수) 로의 함수라면
    * $$ f_1 + f_2$$과 $$ f_1 f_2 $$ 도 A 로부터 **R** 로의 함수이다.

## 정의역의 부분집합의 상

>
Let f be a function from A to B and let S be a subset of A.
The image of S under the function f is the subset of B that consists of the images of the elements of S.
We denote the image of S by f (S), so  
$$f(S) = \{t \vert ∃s ∈ S (t = f(s)) \}$$  
We also use the shorthand $$\{f (s) \vert s ∈ S\}$$ to denote this set.

* $$ f $$가 집합 A 에서 B로의 함수라 하자.
* S 가 A의 부분집합이라면, 집합 S의 상(image)은 S의 원소들의 상들로 구성된 B의 부분집합이다.
* S의 상은 $$ f(S) = \{ t \vert ∃ s ∈ S( t = f(s) ) \}  $$ 이다.
    * $$ \color{blue}{f(S) = \{ f(s) \vert s ∈ S \}} $$ 로도 나타낸다.

**식을 풀어서 이해해 보자**

$$ \color{red}{f(S)} = \{ \color{red}{t} \vert ∃ s ∈ S( t = f(s) ) \}  $$.

* 집합 $$ f(S) $$는 $$ t $$들로 이루어진 집합이다.

$$ f(S) = \{ t \vert \color{red}{∃ s ∈ S( t = f(s) )} \}  $$.

* $$ t $$의 조건은 이러이러하다. 아래에서 자세히 살펴보자.

$$ f(S) = \{ t \vert \color{red}{∃ s ∈ S}( t = f(s) ) \}  $$.

* $$S$$의 원소 $$s$$ 라는 것들이 존재하는데...

$$ f(S) = \{ \color{red}{t} \vert ∃ s ∈ S( \color{red}{t = f(s)} ) \}  $$.

* 앞에서 말한 $$ t $$는 사실 $$ f(s) $$를 말한다.

지금까지 풀어서 이해한 것을 모으면 다음과 같이 정리할 수 있다.

* $$ f(S) $$는 $$ f(s) $$ 들의 집합인데, $$ s $$는 $$ S $$의 원소이다.
* 그리고 이 말을 식으로 바꾸면
    * $$ \color{blue}{f(S) = \{ f(s) \vert s ∈ S \}} $$ 이 된다.

**예를 들어 보자**

* $$ f(x) = x \times 2 $$ 라는 함수가 있다고 하자.
* 정의역은 $$ A = \{ 1, 2, 3, 4, 5 \} $$ 라고 하자.
* 공역은 $$ B = \{ 2, 4, 6, 8, 10, 12, 14 \} $$ 라고 하자.
* 정의역의 부분집합 S 가 있다고 하자.
    * 뭐가 좋을까... $$ S = \{ 2, 3 \} $$ 이라 하자.
    * 그렇다면 S의 상은 $$ f(S) = \{ f(2), f(3) \} = \{ 4, 6 \} $$ 이다.
    * S의 상은 B의 부분집합이다. 위의 정의는 이것을 말한다.

## 단사 함수

**one-to-one, injective**

>
A function f is said to be one-to-one, or an injunction,
if and only if $$f (a) = f (b)$$ implies that $$a = b$$ for all a and b in the domain of f.
A function is said to be injective if it is one-to-one.

* 함수 $$ f $$의 정의역의 모든 원소에 대하여 $$ f(a) = f(b) $$ 이면 반드시 $$ a = b $$일 때, $$f$$ 를 단사함수라 한다.

**예를 들어 보자**

* $$ f(x) = x + 1 $$ 은 단사 함수인가?
    * 정의역의 모든 원소에 대해 리턴값(상)이 모두 다르므로 단사 함수이다.
* $$ f(x) = x^2 $$ 은 단사 함수인가?
    * $$ f(1) = 1 $$ 이고, $$ f(-1) = 1 $$ 이므로 단사 함수가 아니다.

## 증가 함수, 단조 증가 함수, 감소 함수, 단조 감수 함수

**increasing function, strictly increasing function, decreasing function, strictly decreasing function**

>
A function $$f$$ whose domain and codomain are subsets of the set of real numbers is called increasing
if $$f (x) ≤ f (y)$$, and strictly increasing if $$f (x) < f (y)$$,
whenever $$x < y$$ and $$x$$ and $$y$$ are in the domain of $$f$$.
Similarly, $$f$$ is called decreasing if $$f (x) ≥ f (y)$$,
and strictly decreasing if $$f(x) > f(y)$$, whenever $$x < y$$ and $$x$$ and $$y$$ are in the domain of $$f$$.
(The word strictly in this definition indicates a strict inequality.)

| 증가 함수      | $$ a_1 < a_2 $$ 이면 $$ f(a_1) \color{red}\le f(a_2) $$ 인 함수. |
| 단조 증가 함수 | $$ a_1 < a_2 $$ 이면 $$ f(a_1) \color{red}\lt f(a_2) $$ 인 함수.            |
| 감소 함수      | $$ a_1 < a_2 $$ 이면 $$ f(a_1) \color{red}\ge f(a_2) $$ 인 함수.            |
| 단조 감소 함수 | $$ a_1 < a_2 $$ 이면 $$ f(a_1) \color{red}\gt f(a_2) $$ 인 함수.            |

## 전사 함수

**onto, surjection**

>
A function $$f$$ from A to B is called onto, or a surjection,
if and only if for every element $$b ∈ B$$ there is an element $$a ∈ A$$ with $$f(a) = b$$.
A function f is called surjective if it is onto.

* 공역과 치역이 같은 함수.

## 전단사 함수

**one-to-one correspondence, 일대일대응**

>
The function f is a one-to-one correspondence, or a bijection, if it is both one-to-one and onto. We also say that such a function is bijective.

* 단사 함수이면서 전사 함수인 함수를 전단사 함수라고 한다.
    * 일대일 대응이라고도 한다.

## 역함수

**inverse function**

>
Let $$f$$ be a one-to-one correspondence from the set A to the set B. The inverse function of $$f$$ is the function that assigns to an element b belonging to B the unique element a in A such that $$f (a) = b$$. The inverse function of f is denoted by $$f^{−1}$$. Hence, $$f^{−1}(b) = a$$ when $$f(a) = b$$.

* $$f(a) = b$$ 의 역함수는 $$ f^{-1}(b) = a$$.
* 전단사 함수는 역함수를 만들 수 있으므로 가역 함수(invertible function)이다.
* 전단사 함수가 아닌 함수는 역함수를 만들 수 없으므로 비가역 함수(not invertible function)이다.

## 합성함수

**composition of functions**

>
Let $$g$$ be a function from the set A to the set B and let $$f$$ be a function from the set B to the set C.
The composition of the functions $$f$$ and $$g$$, denoted for all $$a ∈ A$$ by $$f ◦ g$$, is defined by  
$$(f ◦ g)(a) = f (g(a))$$

* 함수 f와 g의 합성함수는 $$ f \circ g $$ 로 표기한다.
* $$ (f ◦ g)(a) = f (g(a)) $$.

## 함수의 그래프

>
Let $$f$$ be a function from the set A to the set B.
The graph of the function $$f$$ is the set of ordered pairs $$\{(a,b) \vert a ∈ A \ and \ f(a) = b \}$$.

* 함수 $$ f $$의 그래프는 $$\{(a,b) \vert a ∈ A \ and \ f(a) = b \}$$인 순서쌍의 집합이다.

## 바닥 함수와 천장 함수

**floor function, ceiling function**

>
The floor function assigns to the real number x the largest integer that is less than or equal to x.
The value of the floor function at x is denoted by $$⌊x⌋$$.
The ceiling function assigns to the real number x the smallest integer that is greater than or equal to x.
The value of the ceiling function at x is denoted by $$⌈x⌉$$.

* 바닥 함수 $$ ⌊x⌋ $$는 내림이다.
* 천장 함수 $$ ⌈x⌉ $$는 올림이다.

**바닥/천장 함수의 특징**(x는 실수, n은 정수)

| $$ ⌊x⌋ = n \ ↔ \ n ≤ x < n + 1 $$  |
| $$ ⌈x⌉ = n \ ↔ \ n - 1 < x ≤ n $$  |
| $$ ⌊x⌋ = n \ ↔ \ x - 1 < n ≤ x $$  |
| $$ ⌈x⌉ = n \ ↔ \ x ≤ n < x + 1 $$  |
| $$ x - 1 < ⌊x⌋ ≤ x ≤ ⌈x⌉ < x + 1$$ |
| $$ ⌊-x⌋ = -⌈x⌉ $$                  |
| $$ ⌈-x⌉ = -⌊x⌋ $$                  |
| $$ ⌊x+n⌋ = ⌊x⌋ + n $$              |
| $$ ⌈x+n⌉ = ⌈x⌉ + n $$              |

## 부분 함수

**partial functions**

>
A partial function $$ f $$ from a set A to a set B is an assignment to each element a in a subset of A,
called the domain of definition of $$ f $$, of a unique element b in B.
The sets A and B are called the domain and codomain of $$ f $$, respectively.
We say that $$ f $$ is undefined for elements in A that are not in the domain of definition of $$ f $$.
When the domain of definition of $$ f $$ equals A, we say that $$ f $$ is a total function.

* 정의된 정의역의 각 원소를 공역의 각 원소에 대응시키는 함수.
* 정의된 정의역(domain of definition): 정의역의 부분집합.
    * 정의된 정의역에 속하지 않는 원소에 대해서는 undefined 라 한다.
* 부분 함수는 다른 함수와 동일하게 표기하며, 부분함수인지는 문맥을 보고 파악해야 한다.
* 부분함수의 정의역이 원래의 정의역과 같을 때, 그 함수를 전체 함수(total function)라 한다.

# 용어 정리

| English                            | 한국어         | 예/설명                                              |
|------------------------------------|----------------|------------------------------------------------------|
| function                           | 함수           | $$ f(a) = b $$                                       |
| map                                | 사상(=함수)    | f는 A에서 B로 사상한다.                              |
| transformations                    | 변환(=함수)    | f는 A를 B로 변환한다.                                |
| domain                             | 정의역         | A는 정의역이다.                                      |
| codomain                           | 공역           | B는 공역이다.                                        |
| range                              | 치역           | 치역은 $$ f(a) $$의 집합이다.                        |
| image                              | 상             | b는 a의 상이다.                                      |
| preimage                           | 원상           | a는 b의 원상이다.                                    |
| real-valued function               | 실수 함수      | 공역이 실수의 집합인 함수                            |
| integer-valued function            | 정수 함수      | 공역이 정수의 집합인 함수                            |
| one-to-one function                | 단사함수       | 입력이 다르면 리턴값도 다른 함수                     |
| injunction                         | 단사함수       |                                                      |
| increasing function                | 증가함수       | $$ a_1 < a_2 $$ 이면 $$ f(a_1) \le f(a_2) $$ 인 함수 |
| strictly increasing function       | 단조 증가 함수 | $$ a_1 < a_2 $$ 이면 $$ f(a_1) \lt f(a_2) $$ 인 함수 |
| decreasing function                | 감소함수       | $$ a_1 < a_2 $$ 이면 $$ f(a_1) \ge f(a_2) $$ 인 함수 |
| strictly decreasing function       | 단조 감소함수  | $$ a_1 < a_2 $$ 이면 $$ f(a_1) \gt f(a_2) $$ 인 함수 |
| onto function                      | 전사 함수      | 공역과 치역이 같은 함수                              |
| surjection                         | 전사 함수      |                                                      |
| one-to-one correspondence function | 전단사 함수    | 일대일 대응 함수. 전사 함수이면서 단사 함수인 함수.  |
| inverse function                   | 역함수         | $$f(a) = b$$ 의 역함수는 $$ f^{-1}(b) = a$$          |
| invertible function                | 가역 함수      | 역함수를 만들 수 있는 함수(전단사 함수)              |
| not invertible function            | 비가역 함수    | 역함수를 만들 수 없는 함수                           |
| composition of functions           | 합성함수       | $$ f \circ g $$                                      |
| floor function                     | 바닥 함수      | 내림                                                 |
| ceiling function                   | 천장 함수      | 올림                                                 |
| total function                     | 전체 함수      |                                                      |
| partial function                   | 부분 함수      | 전체 함수의 정의역의 부분집합을 정의역으로 삼는 함수 |
| domain of definition               | 정의된 정의역  | 부분 함수의 정의역                                   |

# 참고문헌

* Rosen의 이산수학 / Kenneth H. Rosen 저 / 공은배 등저 / 한국맥그로힐(McGraw-Hill KOREA) / 2017년 01월 06일

