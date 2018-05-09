---
layout  : wiki
title   : 구체수학 02.합.03.합의 조작
summary : 02.SUMS.03.MANIPULATION OF SUMS
date    : 2018-05-09 22:00:21 +0900
updated : 2018-05-09 23:02:40 +0900
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


