---
layout  : wiki
title   : 관계(Relations)
summary : 
date    : 2019-05-06 17:22:32 +0900
updated : 2019-06-04 21:21:56 +0900
tag     : math
toc     : true
public  : true
parent  : math
latex   : true
---
* TOC
{:toc}

# 정의

$$ \require{cancel} $$

## 이진관계

* binary relation

> Let A and B be sets.
A binary relation from A to B is a subset of A $$\times$$ B.

* A 에서 B로의 이진관계는 $$A \times B$$의 부분집합이다.
* A 에서 B로의 이진관계는 순서쌍의 집합 R 이다.
    * `(A의 원소, B의 원소)`는 집합 R의 원소.
    * $$ ( a, b ) ∈ R $$를 $$a \ R \ b$$ 로도 표기한다.
    * $$ ( a, b ) \notin R $$는 $$a \cancel{R} \ b$$ 로도 표기한다.
* 이진관계는 두 집합의 원소들 사이의 관계를 표현한다.
    * n 개 집합의 원소들 사이의 관계는 n항 관계(n-ary relations)라 한다.

## 하나의 집합에 대한 관계

* Relations on a Set

> A relation on a set A is a relation from A to A.

* "집합 A에 대한 관계"는 A에서 A로의 관계를 말한다.
* 집합 A에 대한 관계는 $$A \times A$$의 부분집합이다.

## 반사 관계

* reflexive relation

> A relation R on a set A is called reflexive if $$(a, a) ∈ R$$ for every element $$a ∈ A$$.

* 집합 A의 모든 원소 a 에 대해 $$(a, a) ∈ R$$ 인 관계.

반사적 관계를 행렬로 표현하면 다음과 같은 모양을 갖는다.

$$
\begin{bmatrix}
1  &   &   &     & \\
   & 1 &   &     & \\
   &   & 1 &     & \\
   &   &   & ... & \\
   &   &   &     & 1 \\
\end{bmatrix}
$$

한편 비반사적 관계(irreflexive relation)는 $$(a, a) ∉ R$$ 이고, 다음과 같은 모양을 갖는다.

$$
\begin{bmatrix}
0  &   &   &     & \\
   & 0 &   &     & \\
   &   & 0 &     & \\
   &   &   & ... & \\
   &   &   &     & 0 \\
\end{bmatrix}
$$

다음은 반사적 관계도 아니고 비반사적 관계도 아닌 경우이다. (각 원소의 자기 자신과의 관계에 0과 1이 섞여 있다)

$$
\begin{bmatrix}
0  &   &   &     & \\
   & 1 &   &     & \\
   &   & 0 &     & \\
   &   &   & ... & \\
   &   &   &     & 1 \\
\end{bmatrix}
$$

예제를 보자.

집합 $$A = \{ 1,2,3,4 \}$$ 에 대한 관계
$$R_1 ~ R_6$$ 중에서 반사적 관계에 해당되는 것들을 찾아보자.

$$
\begin{align}
R_1 & = \{ \color{blue}{(1,1)},(1,2),(2,1),\color{blue}{(2,2)},(3,4),(4,1),\color{blue}{(4,4)} \} \\
R_2 & = \{ \color{blue}{(1,1)},(1,2),(2,1) \} \\
R_3 & = \{ \color{red}{(1,1)},(1,2),(1,4),(2,1),\color{red}{(2,2)},
        \color{red}{(3,3)},(4,1), \color{red}{(4,4)} \} \\
R_4 & = \{ (2,1),(3,1),(3,2),(4,1),(4,2),(4,3) \} \\
R_5 & = \{ \color{red}{(1,1)},(1,2),(1,3),(1,4),\color{red}{(2,2)},(2,3),(2,4),
        \color{red}{(3,3)},(3,4),\color{red}{(4,4)} \} \\
R_6 & = \{ (3, 4) \} \\
\end{align}
$$

* $$R_3, R_5$$: $$(1, 1), (2, 2), (3, 3), (4, 4)$$가 모두 있으므로 반사적 관계이다.

$$
R_3 =
\begin{bmatrix}
\color{red}1 & 1            & 0            & 1 \\
1            & \color{red}1 & 0            & 0 \\
0            & 0            & \color{red}1 & 0 \\
1            & 0            & 0            & \color{red}1 \\
\end{bmatrix}
$$

$$
R_5 =
\begin{bmatrix}
\color{red}1 & 1            & 1            & 1 \\
0            & \color{red}1 & 1            & 1 \\
0            & 0            & \color{red}1 & 1 \\
0            & 0            & 0            & \color{red}1 \\
\end{bmatrix}
$$

한편 방향성 그래프로 그리면 반사 관계를 쉽게 이해할 수 있다.

반사적 관계는 다음과 같이 각 원소가 자신에게 돌아간다.

{% raw %}
<svg width="250" height="280" version="1.1" xmlns="http://www.w3.org/2000/svg">
	<ellipse stroke="black" stroke-width="1" fill="none" cx="173.5" cy="69.5" rx="30" ry="30"/>
	<text x="167.5" y="75.5" font-family="Times New Roman" font-size="20">2</text>
	<ellipse stroke="black" stroke-width="1" fill="none" cx="61.5" cy="69.5" rx="30" ry="30"/>
	<text x="55.5" y="75.5" font-family="Times New Roman" font-size="20">1</text>
	<ellipse stroke="black" stroke-width="1" fill="none" cx="61.5" cy="184.5" rx="30" ry="30"/>
	<text x="55.5" y="190.5" font-family="Times New Roman" font-size="20">3</text>
	<ellipse stroke="black" stroke-width="1" fill="none" cx="173.5" cy="184.5" rx="30" ry="30"/>
	<text x="167.5" y="190.5" font-family="Times New Roman" font-size="20">4</text>
	<path stroke="black" stroke-width="1" fill="none" d="M 34.988,55.712 A 22.5,22.5 0 1 1 56.318,40.07"/>
	<polygon fill="black" stroke-width="1" points="56.318,40.07 61.283,32.048 51.283,32.092"/>
	<path stroke="black" stroke-width="1" fill="none" d="M 181.313,40.656 A 22.5,22.5 0 1 1 201.146,58.157"/>
	<polygon fill="black" stroke-width="1" points="201.146,58.157 210.043,61.295 207.866,51.535"/>
	<path stroke="black" stroke-width="1" fill="none" d="M 50.348,212.224 A 22.5,22.5 0 1 1 32.711,192.512"/>
	<polygon fill="black" stroke-width="1" points="32.711,192.512 24.245,188.349 25.259,198.298"/>
	<path stroke="black" stroke-width="1" fill="none" d="M 198.075,201.502 A 22.5,22.5 0 1 1 174.953,214.348"/>
	<polygon fill="black" stroke-width="1" points="174.953,214.348 169.022,221.684 178.949,222.894"/>
</svg>
{% endraw %}


## 대칭, 반대칭 관계

* symmetric, antisymmetric

> A relation R on a set A is called symmetric if $$(b,a) ∈ R$$
whenever $$(a,b) ∈ R$$, for all $$a,b ∈ A$$.  
A relation R on a set A such that for all $$a, b ∈ A$$,
if $$(a, b) ∈ R$$ and $$(b, a) ∈ R$$, then $$a = b$$ is called antisymmetric.

* 집합 A에 대한 관계 R이 있다고 하자.
* 집합 A의 원소 a, b에 대해,
    * $$(a, b) ∈ R$$ 일 때, $$(b, a) ∈ R$$인 관계를 대칭(symmetric) 관계라 한다.
    * $$(a, b) ∈ R$$ 일 때, $$(b, a) ∈ R$$ 이고, $$a = b$$ 인 관계를 반대칭(antisymmetric) 관계라 한다.

행렬로 나타내면 쉽게 이해할 수 있다.

* 대칭관계: $$M_r = [m_{ij}]$$에서 $$m_{ij} = m_{ji}$$ 이면 대칭관계.
* 반대칭관계: $$M_r = [m_{ij}]$$에서 $$i \ne j$$ 일 때, $$m_{ij} = 0$$ 또는 $$m_{ji} = 0$$ 이면 반대칭 관계.

방향성 그래프로 대칭 관계를 그려보면 양쪽 방향을 가리키는 화살표로 이해할 수 있다.

만약 화살표가 한쪽 방향만 가리킨다면 대칭 관계가 아니다.

{% raw %}
<svg width="250" height="110" version="1.1" xmlns="http://www.w3.org/2000/svg">
	<ellipse stroke="black" stroke-width="1" fill="none" cx="173.5" cy="69.5" rx="30" ry="30"/>
	<text x="167.5" y="75.5" font-family="Times New Roman" font-size="20">2</text>
	<ellipse stroke="black" stroke-width="1" fill="none" cx="61.5" cy="69.5" rx="30" ry="30"/>
	<text x="55.5" y="75.5" font-family="Times New Roman" font-size="20">1</text>
	<polygon stroke="black" stroke-width="1" points="91.5,69.5 143.5,69.5"/>
	<polygon fill="black" stroke-width="1" points="143.5,69.5 135.5,64.5 135.5,74.5"/>
	<polygon stroke="black" stroke-width="1" points="143.5,69.5 91.5,69.5"/>
	<polygon fill="black" stroke-width="1" points="91.5,69.5 99.5,74.5 99.5,64.5"/>
</svg>
{% endraw %}

### 주의1. 관계에 있어 대칭과 반대칭은 반대 의미가 아니다

$$R=\{(1,1),(2,2),(3,3),(4,4)\}$$ 같은 경우는 대칭이면서 반대칭이다.

$$
R = \begin{bmatrix}
1 & 0 & 0 & 0 \\
0 & 1 & 0 & 0 \\
0 & 0 & 1 & 0 \\
0 & 0 & 0 & 1 \\
\end{bmatrix}
$$

### 주의2. 반대칭(antisymmetric)과 비대칭(asymmetric)은 다르다

* 대칭의 반대는 반대칭이 아니라 비대칭이다.
* 비대칭은 $$ ∀a, b ∈ a R b \Rightarrow ¬ (b R a) $$.

### 대칭과 반대칭 예제

다음 관계들에서 대칭과 반대칭 관계를 찾아보자.

$$
\begin{align}
R_1 & = \{ (1,1),(1,2),(2,1),(2,2),(3,4),(4,1),(4,4) \} \\
R_2 & = \{ (1,1),(1,2),(2,1) \} \\
R_3 & = \{ (1,1),(1,2),(1,4),(2,1),(2,2), (3,3),(4,1), (4,4) \} \\
R_4 & = \{ (2,1),(3,1),(3,2),(4,1),(4,2),(4,3) \} \\
R_5 & = \{ (1,1),(1,2),(1,3),(1,4),(2,2),(2,3),(2,4), (3,3),(3,4),(4,4) \} \\
R_6 & = \{ (3, 4) \} \\
\end{align}
$$

* 대칭: $$R_2, R_3$$
* 반대칭: $$R_4,R_5,R_6$$

대칭 반대칭은 해당되는 곳에 1을 표시한 행렬로 그려보면 이해가 쉽다.

대칭은 $$M_r = [m_{ij}]$$에서 $$m_{ij} = m_{ji}$$ 이다.

$$
R_2 =
\begin{bmatrix}
1            & \color{red}1 & 0 & 0 \\
\color{red}1 & 0            & 0 & 0 \\
0            & 0            & 0 & 0 \\
0            & 0            & 0 & 0 \\
\end{bmatrix}
$$

$$
R_3 =
\begin{bmatrix}
1 & \color{red} 1 & 0 & \color{red}1 \\
\color{red}1 & 1 & 0 & 0 \\
0 & 0 & 1 & 0 \\
\color{red}1 & 0 & 0 & 1 \\
\end{bmatrix}
$$

반대칭관계는 $$M_r = [m_{ij}]$$에서 $$i \ne j$$ 일 때, $$m_{ij} = 0$$ 또는 $$m_{ji} = 0$$ 이다.

$$
R_4 =
\begin{bmatrix}
\color{red}0 & 0             & 0             & 0 \\
1            & \color{red} 0 & 0             & 0 \\
1            & 1             & \color{red} 0 & 0 \\
1            & 1             & 1             & \color{red} 0 \\
\end{bmatrix}
$$

$$
R_5 =
\begin{bmatrix}
\color{red}1 & 1            & 1            & 1 \\
0            & \color{red}1 & 1            & 1 \\
0            & 0            & \color{red}1 & 1 \\
0            & 0            & 0            & \color{red}1 \\
\end{bmatrix}
$$

$$
R_6 =
\begin{bmatrix}
\color{red}0 & 0            & 0            & 0 \\
0            & \color{red}0 & 0            & 0 \\
0            & 0            & \color{red}0 & 1 \\
0            & 0            & 0            & \color{red}0 \\
\end{bmatrix}
$$

그러면 $$R_1$$은 왜 대칭도 반대칭도 아닌가?

* $$(3,4) ∈ R$$ 인데, $$(4,3) ∉ R$$ 이므로 대칭이 아니다.
* $$(1,2) ∈ R$$ 이고, $$(2,1) ∈ R$$ 이므로 반대칭이 아니다. 적어도 둘 중 하나는 0 이어야 한다.

$$
R_1 =
\begin{bmatrix}
1            & \color{red}1 & 0            & 0 \\
\color{red}1 & 1            & 0            & 0 \\
0            & 0            & 0            & \color{red}1 \\
1            & 0            & \color{red}0 & 1 \\
\end{bmatrix}
$$

## 전이적 관계

* transitive
* 추이적 관계라고도 한다.

> A relation R on a set A is called transitive if whenever $$(a,b) ∈ R$$ and $$(b,c) ∈ R$$,
then $$(a,c) ∈ R$$, for all $$a,b,c ∈ A$$.

* 집합 A에 대한 관계 R이 모든 $$a,b,c ∈ A$$ 에 대해...
    * $$(a,b) ∈ R$$ 이고 $$(b,c) ∈ R$$ 일 때, $$(a,c) ∈ R$$ 이면 전이적 관계라 한다.

전이적 관계를 행렬로 나타내면
$$M_r = [m_{ij}]$$에서 $$m_{ij} = 1, m_{jk} = 1$$ 일 때, $$m_{ik} = 1$$인 행렬이다.

다음 관계들에서 전이적 관계를 찾아보자.

$$
\begin{align}
R_1 & = \{ (1,1),(1,2),(2,1),(2,2),(3,4),(4,1),(4,4) \} \\
R_2 & = \{ (1,1),(1,2),(2,1) \} \\
R_3 & = \{ (1,1),(1,2),(1,4),(2,1),(2,2), (3,3),(4,1), (4,4) \} \\
R_4 & = \{ (2,1),(3,1),(3,2),(4,1),(4,2),(4,3) \} \\
R_5 & = \{ (1,1),(1,2),(1,3),(1,4),(2,2),(2,3),(2,4), (3,3),(3,4),(4,4) \} \\
R_6 & = \{ (3, 4) \} \\
\end{align}
$$

관계 $$R_4, R_5, R_6$$이 전이적이다.

$$
R_4 =
\begin{bmatrix}
0            & 0             & 0 & 0 \\
1            & 0             & 0 & 0 \\
\color{red}1 & 1             & 0 & 0 \\
\color{red}1 & \color{red} 1 & 1 & 0 \\
\end{bmatrix}
$$

* $$(a,b) ∈ R$$ 이고 $$(b,c) ∈ R$$ 인 관계는 모두 다음과 같다.
    * $$(3,2), (2,1)$$.
    * $$(4,2), (2,1)$$.
    * $$(4,3), (3,1)$$.
    * $$(4,3), (3,2)$$.

이 네 관계가 모두 전이적인지만 확인하면 된다.

* $$(3,1)$$: $$(3,2), (2,1) ∈ R$$ 이면서, $$(3,1) ∈ R$$을 만족.
* $$(4,1)$$: $$(4,2), (2,1) ∈ R$$ 이면서, $$(4,1) ∈ R$$을 만족.
* $$(4,1)$$: $$(4,3), (3,1) ∈ R$$ 이면서, $$(4,1) ∈ R$$을 만족.
* $$(4,2)$$: $$(4,3), (3,2) ∈ R$$ 이면서, $$(4,2) ∈ R$$을 만족.

그러므로 $$R_4$$는 전이적이다.

$$
R_5 =
\begin{bmatrix}
1 & 1 & \color{red}1 & \color{red}1 \\
0 & 1 & \color{red}1 & \color{red}1 \\
0 & 0 & 1 & 1 \\
0 & 0 & 0 & 1 \\
\end{bmatrix}
$$

* $$(a,b) ∈ R$$ 이고 $$(b,c) ∈ R$$ 인 관계는 모두 다음과 같다.
    * $$(1,2), (2,3)$$.
    * $$(1,2), (2,4)$$.
    * $$(1,3), (3,4)$$.
    * $$(2,3), (3,4)$$.
    * 당연한 관계
        * $$(1,1), (1,1)$$
        * $$(2,2), (2,2)$$.
        * $$(3,3), (3,3)$$.
        * $$(4,4), (4,4)$$.

이 네 관계가 모두 전이적인지만 확인하면 된다.

* $$(1,3)$$: $$(1,2), (2,3) ∈ R$$ 이면서, $$(1,3) ∈ R$$을 만족.
* $$(1,4)$$: $$(1,2), (2,4) ∈ R$$ 이면서, $$(1,4) ∈ R$$을 만족.
* $$(1,4)$$: $$(1,3), (3,4) ∈ R$$ 이면서, $$(2,3) ∈ R$$을 만족.
* $$(2,4)$$: $$(2,3), (3,4) ∈ R$$ 이면서, $$(2,4) ∈ R$$을 만족.

그러므로 $$R_5$$는 전이적이다.

$$
R_6 =
\begin{bmatrix}
0 & 0 & 0 & 0 \\
0 & 0 & 0 & 0 \\
0 & 0 & 0 & 1 \\
0 & 0 & 0 & 0 \\
\end{bmatrix}
$$

* $$R_6$$은 잘 모르겠는데, 책에서는 $$R_6$$이 전이적 관계라고 한다.
* 왜 그렇지? 전이 관계를 위반하는 것이 하나도 없는 것도 전이 관계로 보는 걸까?
    * [황병연 교수님의 이산수학 수업](http://www.kocw.net/home/cview.do?lid=89d3066f26b87171 )을 보고 알게 되었다(링크된 동영상의 3:00 ~ 3:15) - 관계가 몇 개 없어서 추이관계가 안 되는 게 없다면 추이관계다.

전이 관계가 아니라는 $$R_1, R_2, R_3$$ 도 살펴보자.

$$
\begin{align}
R_1 & = \{ (1,1),(1,2),(2,1),(2,2),(3,4),(4,1),(4,4) \} \\
R_2 & = \{ (1,1),(1,2),(2,1) \} \\
R_3 & = \{ (1,1),(1,2),(1,4),(2,1),(2,2), (3,3),(4,1), (4,4) \} \\
\end{align}
$$

* $$R_1$$의 경우 $$(3,4), (4,1)$$은 있는데 $$(3,1)$$이 없다.
    * 따라서 $$R_1$$은 전이적 관계가 아니다.
* $$R_2$$의 경우 $$(2,1), (1,2)$$는 있는데 $$(2,2)$$가 없다.
    * 따라서 $$R_2$$는 전이적 관계가 아니다.
* $$R_3$$의 경우 $$(4,1), (1,2)$$는 있는데 $$(4,2)$$가 없다.
    * 따라서 $$R_3$$는 전이적 관계가 아니다.

## 관계 결합

* combining relations

> Let R be a relation from a set A to a set B and S a relation from B to a set C.
The composite of R and S is the relation consisting of ordered pairs $$(a, c)$$,
where $$a ∈ A$$, $$c ∈ C$$, and for which there exists an element $$b ∈ B$$ such that $$(a, b) ∈ R$$ and $$(b, c) ∈ S$$.
We denote the composite of R and S by $$S \circ R$$.

* R을 집합 A에서 집합 B로의 관계라 하자.
* S를 집합 B에서 집합 C로의 관계라 하자.
* R과 S의 합성은 $$(a, c)$$로 구성되는 관계이다.
    * $$a ∈ A, c ∈ C $$이고, $$(a,b) ∈ R, (b,c) ∈ S$$인 원소 $$b ∈ B$$가 존재한다.
* R과 S의 합성을 $$R \circ S$$로 표기한다.

> Let R be a relation on the set A.
The powers $$R^n, n = 1,2,3,...$$, are defined recursively by
$$R^1 =R$$ and $$R^{n+1} =R^n \circ R$$.

* $$R^{n+1} = R^n \circ R$$.

> The relation R on a set A is transitive if and only if $$R^n ⊆ R$$ for $$n = 1,2,3,...$$.

* 집합 A에 대한 관계 R 이 전이적이라면, 자연수 n에 대하여 $$R^n ⊆ R$$ 이다.

# 관계의 폐쇄(closure)

> A path from a to b in the directed graph G
is a sequence of edges $$(x_0,x_1), (x_1,x_2), (x_2,x_3),...,(x_{n−1},x_n)$$ in G,
where n is a nonnegative integer, and $$x_0 = a$$ and $$x_n = b$$,
that is, a sequence of edges where the terminal vertex of an edge is the same as the initial vertex in the next edge in the path.
This path is denoted by $$x_0, x_1, x_2, ... , x_{n−1}, x_n$$ and has length n.
We view the empty set of edges as a path of length zero from a to a.
A path of length $$n ≥ 1$$ that begins and ends at the same vertex is called a circuit or cycle.

* 방향성 그래프 G 에서 "a 에서 b 로의 경로"는 G의 모서리들의 순서쌍의 시퀀스로 표현한다.
* 길이가 1 이상이고 한 정점에서 시작해서 시작한 정점에서 끝나는 경로를 회로(circuit) 또는 사이클(cycle)이라 부른다.

>
Let R be a relation on a set A.
There is a path of length n, where n is a positive integer,
from a to b if and only if $$(a, b) ∈ R$$n.

* 길이가 n인 a 에서 b 로의 경로가 있다는 것과 $$ (a,b) ∈ R^n $$은 똑같은 표현이다.

> Let R be a relation on a set A.
The connectivity relation $$R^∗$$ consists of the pairs $$(a, b)$$ such that there is a path of length at least one from a to b in R.

* $$R^n$$은 a 에서 b 로의 길이 n 의 경로가 있는 쌍 $$(a, b)$$로 구성된다.
* 연결관계(connectivity relation) $$R^*$$
    * R의 원소들 중 길이가 적어도 1 이상인 a 에서 b 로의 경로 순서쌍$$(a, b)$$로 구성된다.
    * $$R^*$$는 모든 집합 $$R^n$$의 합집합이다.

$$
R^* = \bigcup^{\infty}_{n=1} R^n
$$

> The transitive closure of a relation R equals the connectivity relation $$R^∗$$.

* 관계 $$R^*$$의 전이폐쇄(transitive closure)는 연결관계 $$R^*$$과 같다.

> Let $$M_R$$ be the zero–one matrix of the relation R on a set with n elements.
Then the zero–one matrix of the transitive closure $$R^∗$$ is  
$$
M_{R^∗} = M_{R} ∨ M_{R}^{[2]} ∨ M_{R}^{[3]} ∨ ... ∨ M_{R}^{[n]}
$$

예제를 풀어보자. 다음 관계 R의 전이폐쇄를 의미하는 0-1 행렬을 구하라.

$$
M_R =
\begin{bmatrix}
1 & 0 & 1 \\
0 & 1 & 0 \\
1 & 1 & 0 \\
\end{bmatrix}
$$

이걸 풀기 위해 먼저 $$M_R^{[2]}$$를 구하자.

길이가 2인 a에서 b로 가는 경로가 존재하는가?

| a | b | 존재 | 증거                                |
|---|---|------|-------------------------------------|
| 1 | 1 | 1    | $$(1,1), (1,1)$$ / $$(1,3), (3,1)$$ |
| 1 | 2 | 1    | $$(1,3), (3,2)$$                    |
| 1 | 3 | 1    | $$(1,1), (1,3)$$                    |
| 2 | 1 | 0    |                                     |
| 2 | 2 | 1    | $$(2,2), (2,2)$$                    |
| 2 | 3 | 0    |                                     |
| 3 | 1 | 1    | $$(3,1), (1,1)$$                    |
| 3 | 2 | 1    | $$(3,2), (2,2)$$                    |
| 3 | 3 | 1    | $$(3,1), (1,3)$$                    |

위의 표를 참고하면 다음과 같이 행렬을 그릴 수 있다.

$$
M_R^{[2]} =
\begin{bmatrix}
1 & 1 & 1 \\
0 & 1 & 0 \\
1 & 1 & 1 \\
\end{bmatrix}
$$

이번엔 $$M_R^{[3]}$$을 구하자.

길이가 3인 a에서 b로 가는 경로가 존재하는가?

| a | b | 존재 | 증거                    |
|---|---|------|-------------------------|
| 1 | 1 | 1    | $$(1,1), (1,1), (1,1)$$ |
| 1 | 2 | 1    | $$(1,1), (1,3), (3,2)$$ |
| 1 | 3 | 1    | $$(1,1), (1,1), (1,3)$$ |
| 2 | 1 | 0    |                         |
| 2 | 2 | 1    | $$(2,2), (2,2), (2,2)$$ |
| 2 | 3 | 0    |                         |
| 3 | 1 | 1    | $$(3,1), (1,3), (1,1)$$ |
| 3 | 2 | 1    | $$(3,2), (2,2), (2,2)$$ |
| 3 | 3 | 1    | $$(3,1), (1,1), (1,3)$$ |

위의 표를 참고하면 다음과 같이 행렬을 그릴 수 있다.

$$
M_R^{[3]} =
\begin{bmatrix}
1 & 1 & 1 \\
0 & 1 & 0 \\
1 & 1 & 1 \\
\end{bmatrix}
$$

잘 살펴보면 $$M_R^{[2]}$$과 $$M_R^{[3]}$$가 똑같으므로 계속 순환할 것임을 알 수 있다.

따라서

$$
M_{R^∗} = M_{R} ∨ M_{R}^{[2]} ∨ M_{R}^{[3]} ∨ ... ∨ M_{R}^{[n]}
$$

$$
M_{R^∗} =
\begin{bmatrix}
1 & 0 & 1 \\
0 & 1 & 0 \\
1 & 1 & 0 \\
\end{bmatrix}
∨
\begin{bmatrix}
1 & 1 & 1 \\
0 & 1 & 0 \\
1 & 1 & 1 \\
\end{bmatrix}
∨
\begin{bmatrix}
1 & 1 & 1 \\
0 & 1 & 0 \\
1 & 1 & 1 \\
\end{bmatrix}
=
\begin{bmatrix}
1 & 1 & 1 \\
0 & 1 & 0 \\
1 & 1 & 1 \\
\end{bmatrix}
$$


# 참고문헌

* Rosen의 이산수학 / Kenneth H. Rosen 저 / 공은배 등 저 / 한국맥그로힐(McGraw-Hill KOREA) / 2017년 01월 06일

