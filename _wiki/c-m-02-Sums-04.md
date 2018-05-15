---
layout  : wiki
title   : 구체수학 02.합.04.다중합
summary : 02.SUMS.03.MULTIPLE SUMS
date    : 2018-05-13 10:35:14 +0900
updated : 2018-05-15 23:17:40 +0900
tags    : math
toc     : true
public  : true
parent  : study-concrete-math
latex   : true
---
* TOC
{:toc}

# 둘 이상의 색인을 사용하기

색인이 여러 개 있어도 합 기호는 하나만 써도 된다.

$$
\begin{align}
\sum_{1 \le j,k \le 3} a_j b_k \\
  = & a_1 b_1 + a_1 b_2 + a_1 b_3 \\
    & + a_2 b_1 + a_2 b_2 + a_2 b_3 \\
    & + a_3 b_1 + a_3 b_2 + a_3 b_3 \\
\end{align}
$$

## 아이버슨의 관례 사용

$$
\sum_{P(j,k)} a_{j,k} = \sum_{j,k} a_{j,k} \cdot [ P(j,k) ]
$$

### 복습: 아이버슨의 관례?

대괄호 안에 있는 내용이 `true`이면 `1`, 아니면 `0`.

* 예
    * `[2는 짝수] = 1`
    * `[2는 홀수] = 0`

# 합 기호를 두 개 사용하는 경우: 합들의 합을 다루는 경우

$$
\sum_{j} \left( \sum_{k} a_{j,k} [P(j,k)] \right)
=
\sum_{j} \sum_{k} a_{j,k} [P(j,k)]
$$

* `2중 for문`과 똑같이 생각하면 된다.
    * 안쪽에서부터 실행된다고 생각하자. 즉, 위에서는 `k`가 `j`보다 먼저다.
* `j`, `k`는 콜렉션이라 생각하면 된다.
    * $$\sum_j$$는 덧셈 루프에 `j`콜렉션을 집어넣은 것이다. 즉 루프를 돌며 `j`의 원소가 하나씩 함수에 입력되고, $$\sum$$은 함수의 출력 결과가 나올 때마다 더한다.
* 주석을 붙이자면 다음과 같다.

$$
\underbrace{
    \sum_{j}
    \overbrace{
        \sum_{k} a_{j,k} [P(j,k)]
    }^{P(j,k)가 참인 모든 정수 k에 대한 모든 a_{j,k} 항의 합}
}_{모든 정수 j에 대한 \sum_{k} a_{j,k} [P(j,k)]들의 합}
$$

## 합산 순서 교환 법칙(interchanging the order of summation)

$$
\begin{align}
\sum_j \sum_k a_{j,k} [P(j,k)]
    & = \sum_{j,k} a_{j,k} \\
    & = \sum_k \sum_j a_{j,k} [P(j,k)] \\
\end{align}
\tag{2.27}\label{2.27}
$$

* 어차피 덧셈이라 순서가 바뀌어도 결과는 달라지지 않는다.
* 따라서 어느 쪽이 계산이 더 쉬울지 고려해서 계산하기 편한 쪽을 고른다.

## 일반 분배법칙(general distributive law)

이번 장 처음에 나온 $$ \sum_{1 \le j,k \le 3} a_j b_k $$ 를 풀어보자.

회색으로 보이는 식은, 이해를 돕기 위해 붙인 것이다.

$$
\begin{align}
\sum_{1 \le j,k \le 3} a_j b_k
    & = \sum_{j,k} a_j b_k [1 \le j,k \le 3] \\
    & \color{gray}{ = a_1 b_1 + a_1 b_2 + a_1 b_3 + a_2 b_1 + a_2 b_2 + a_2 b_3 + a_3 b_1 + a_3 b_2 + a_3 b_3 } \\
    & = \sum_{j,k} a_j b_k [1 \le j \le 3][1 \le k \le 3] \\
    & \color{gray}{ = a_1 b_1 + a_1 b_2 + a_1 b_3 + a_2 b_1 + a_2 b_2 + a_2 b_3 + a_3 b_1 + a_3 b_2 + a_3 b_3 } \\
    & = \sum_j \sum_k a_j b_k [1 \le j \le 3][1 \le k \le 3] \\
    & \color{gray}{ = (a_1 b_1 + a_1 b_2 + a_1 b_3) + (a_2 b_1 + a_2 b_2 + a_2 b_3) + (a_3 b_1 + a_3 b_2 + a_3 b_3) } \\
    & = \sum_j a_j [1 \le j \le 3] \sum_k b_k [1 \le k \le 3] \\
    & \color{gray}{ = a_1(b_1 + b_2 + b_3) + a_2(b_1 + b_2 + b_3) + a_3(b_1 + b_2 + b_3) } \\
    & = \sum_j a_j [1 \le j \le 3] \left( \sum_k b_k [1 \le k \le 3] \right) \\
    & \color{gray}{ = a_1(b_1 + b_2 + b_3) + a_2(b_1 + b_2 + b_3) + a_3(b_1 + b_2 + b_3) } \\
    & = \left( \sum_j a_j [1 \le j \le 3] \right) \left( \sum_k b_k [1 \le k \le 3] \right) \\
    & \color{gray}{ = (a_1 + a_2 + a_3)(b_1 + b_2 + b_3) } \\
    & = \left( \sum_{j=1}^3 a_j \right) \left( \sum_{k=1}^3 b_k \right)\\
    & \color{gray}{ = (a_1 + a_2 + a_3)(b_1 + b_2 + b_3) } \\
\end{align}
$$

위의 과정을 통해 "색인 J, K의 모든 집합에 대해 성립하는" **일반 분배법칙**을 유도할 수 있다.

$$
\sum_{ j \in J \\ k \in K } a_j b_k = \left( \sum_{j \in J} a_j \right)\left( \sum_{k \in K} b_k\right)
\tag{2.28}\label{2.28}
$$

## 합산 순서 교환 기본 법칙의 변형들

크게 두 가지 버전이 있다.

### vanilla version

* $$\eqref{2.27}$$과 똑같은 원리.
* `j`, `k`의 limit가 독립적일 때 사용.

$$
\begin{align}
\sum_{j \in J} \sum_{k \in K} a_{j,k}
    & = \sum_{j \in J \\ k \in K} a_{j,k} \\
    & = \sum_\color{red}{k \in K} \sum_\color{red}{j \in J} a_{j,k}
\end{align}
\tag{2.29}\label{2.29}
$$

### rocky road version

* 안쪽 합의 범위가 바깥쪽 합의 색인 변수에 의존적인 경우에 사용.

$$
\sum_{j \in J} \sum_{k \in K(j)} a_{j,k} = \sum_\color{red}{k \in K'} \sum_\color{red}{j \in J'(k)} a_{j,k} \\
\text{단, 다음 조건을 만족해야 한다.} \\
[j \in J][k \in K(j)] = [k \in K'][j \in J'(k)]
\tag{2.30}\label{2.30}
$$

* 조건식을 좀 더 자세히 살펴보자.
    * 좌변을 **인수분해**(factorization)하여 우변을 얻은 것이라고 책에서는 표현한다.

$$
[j \in J][k \in K(j)] = [k \in K'][j \in J'(k)]
$$

## 유용한 인수분해

$$
\begin{align}
[1 \le j \le n][j \le k \le n]
    & = [1 \le j \le k \le n] \\
    & = [1 \le k \le n][1 \le j \le k]
\end{align}
$$

## 아이버슨식 공식을 사용한 변환식

위의 공식을 활용하면 다음이 가능하다.

$$
\begin{align}
\sum_{j = 1}^n \sum_{k = j}^n a_{j,k}
    & = \sum_{1 \le j \le k n} a_{j,k} \\
    & = \sum_\color{red}{k=1}^n \sum_\color{red}{j=1}^\color{red}k a_{j,k} \\
\end{align}
$$
