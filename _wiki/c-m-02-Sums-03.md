---
layout  : wiki
title   : 구체수학 02.합.03.합의 조작
summary : 02.SUMS.03.MANIPULATION OF SUMS
date    : 2018-05-09 22:00:21 +0900
updated : 2018-05-12 18:02:23 +0900
tags    : math
toc     : true
public  : true
parent  : study-concrete-math
latex   : true
---
* TOC
{:toc}

# 법칙들

* `K`가 임의의 유한 정수 집합이라 하자.

## 분배법칙(distributive law)

$$
\sum_{k \in K} c a_k = c \sum_{k \in K} a_k
$$

## 결합법칙(associative law)

$$
\sum_{k \in K} (a_k + b_k) = \sum_{k \in K} a_k + \sum_{k \in K} b_k
$$

## 교환법칙(commutative law)

$$
\sum_{k \in K} a_k = \sum_{p(k) \in K} a_{p(k)}
$$


# 법칙의 응용: 등차수열의 일반합

$$
\begin{align}
S   & = \sum_{ 0 \le k \le n } (a + bk) \\
    & = \sum_{ 0 \le n-k \le n } (a + b(n-k)) & (교환법칙) \\
    & = \sum_{ 0 \le k \le n } (a + bn -bk) \\
    & \because 0 \le n-k \le n \; 와 \; 0 \le k \le n \; 는 \; 같다. \\
\\
2S  & = \sum_{ 0 \le k \le n } (a + bk) + \sum_{ 0 \le k \le n } (a + bn -bk) \\
    & = \sum_{ 0 \le k \le n } (a2 + bn) & (결합법칙) \\
    & = (2a + bn) \sum_{ 0 \le k \le n } 1 \\
    & = (2a + bn)(n + 1) \\
\\
S   & = \frac{1}{2}(2a + bn)(n + 1) \\
    & = \underbrace
            {\frac{1}{2}(a + (a + bn))}_{첫 항과 마지막 항의 평균}
        \underbrace
            {(n + 1)}_{항의 갯수} \\
\end{align}
$$


## 합의 추가적인 성질들

서로 다른 색인 집합을 결합할 때의 규칙.

$$
\text{if K and K' are any sets of integers, then} \\
    \sum_{k \in K} a_k         + \sum_{k \in K'} a_k
  = \sum_{k \in K \cap K'} a_k + \sum_{k \in K \cup K'} a_k \\
\tag{2.20}\label{2.20}
$$

### 응용

서로 소인 두 색인 집합을 합친다.

$$
\sum_{k = 1}^m a_k + \sum_{k = m}^n a_k
    = a_m + \sum_{k = 1}^n a_k, \quad for \; 1 \le m \le n.
$$

합에서 항 하나를 분리한다.

$$
\sum_{0 \le k \le n} a_k = a_0 + \sum_{1 \le k \le n} a_k, \quad for \; n \ge 0.
$$

# 섭동법(perturbation method)

$$
\begin{align}
S_n
    & = \sum_{0 \le k \le n} a_k \\
\\
S_n + a_{n+1}
    & = \sum_{0 \le k \le n+1} a_k \\
    & = a_0 + \sum_{1 \le k \le n+1} a_k \\
    & = a_0 + \sum_{1 \le k+1 \le n+1} a_{k+1} \\
    & = a_0 + \sum_{0 \le k \le n} a_{k+1} \\
\end{align}
\tag{2.24}\label{2.24}
$$

## 예: 등비수열의 합 공식 유도

$$
\begin{align}
S_n & = \sum_{0 \le k \le n} ax^k. \\
S_n + ax^{n+1}
    & = ax^0 + \sum_{0 \le k \le n} ax^{k+1} \quad \because \eqref{2.24} \\
    & = a + x \sum_{0 \le k \le n} ax^k \\
    & = a + x \cdot S_n \\
S_n & = a + x \cdot S_n - ax^{n+1} \\
S_n - x \cdot S_n & = a - ax^{n+1} \\
S_n (1 - x) & = a (1 - x^{n+1}) \\
\\
S_n & = { a (1 - x^{n+1}) \over 1 - x}, \quad for \; x \ne 1. \\
\end{align}
$$

