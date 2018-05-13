---
layout  : wiki
title   : 구체수학 02.합.04.다중합
summary : 02.SUMS.03.MULTIPLE SUMS
date    : 2018-05-13 10:35:14 +0900
updated : 2018-05-13 11:21:24 +0900
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

## 합산 순서 교환 법칙

* interchanging the order of summation

$$
\begin{align}
\sum_j \sum_k a_{j,k} [P(j,k)]
    & = \sum_{j,k} a_{j,k} \\
    & = \sum_k \sum_j a_{j,k} [P(j,k)] \\
\end{align}
$$

* 어차피 덧셈이라 순서가 바뀌어도 결과는 달라지지 않는다.
* 따라서 어느 쪽이 계산이 더 쉬울지 고려해서 계산하기 편한 쪽을 고른다.

