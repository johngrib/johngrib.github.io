---
layout  : wiki
title   : 구체수학 02.합.03.합의 조작
summary : 02.SUMS.03.MANIPULATION OF SUMS
date    : 2018-05-09 22:00:21 +0900
updated : 2018-05-19 10:34:12 +0900
tag     : math
toc     : true
public  : true
parent  : study-concrete-math
latex   : true
---
* TOC
{:toc}

이 문서는 [[CONCRETE-MATH]] **2장.합 - 2.합의 조작**을 공부한 노트입니다.

# 법칙들

* `K`가 임의의 유한 정수 집합이라 하자.

## 분배법칙(distributive law)

$$
\sum_{k \in K} c a_k = c \sum_{k \in K} a_k
$$

이유는 다음과 같다.

$$
ca_1 + ca_2 + ... + ca_n = c ( a_1 + a_2 + ... + a_n )
$$

## 결합법칙(associative law)

$$
\sum_{k \in K} (a_k + b_k) = \sum_{k \in K} a_k + \sum_{k \in K} b_k
$$

이유는 다음과 같다.

$$
(a_1 + b_1) + (a_2 + b_2) + ... + (a_n + b_n)
= (a_1 + a_2 + ... + a_n) + (b_1 + b_2 + ... + b_n)
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

### 예

`K = [1,2,3]` 이고 `K' = [3,4,5]` 라면 다음과 같이 된다는 말이다.

$$
(a_1 + a_2 + a_3) + (a_3 + a_4 + a_5)
= (a_3)
+ (a_1 + a_2 + a_3 + a_4 + a_5)
$$

### 응용

서로 소인 두 색인 집합을 합친다.

$$
\begin{align}
\sum_{k = 1}^m a_k + \sum_{k = m}^n a_k
    & = a_m + \sum_{k = 1}^n a_k, \quad for \; 1 \le m \le n. \\
(a_1 + a_2 + ... + \color{red}{a_m}) + (\color{red}{a_m} + a_{m+1} + ... + a_n)
    & = \color{red}{a_m} + (a_1 + a_2 + ... + \color{red}{a_m} + ... + a_n)
\\
\end{align}
$$

합에서 항 하나를 분리한다.

$$
\sum_{0 \le k \le n} a_k = \color{red}{a_0} + \sum_{\color{red}1 \le k \le n} a_k, \quad for \; n \ge 0.
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

## 예1: 등비수열의 합 공식 유도

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

## 예2: 조금 더 복잡한 형태의 합에 섭동 기법 적용

$$
\begin{align}
S_n & = \sum_{0 \le k \le n} k 2^k \\
\\
S_n + (n+1) \cdot 2^{n+1}
    & = 0 \cdot 2^0 + \sum_{0 \le k \le n} (k+1) \cdot 2^{k+1} \quad \because \eqref{2.24} \\
    & = \sum_{0 \le k \le n} (k+1) \cdot 2^{k+1} \\
    & = \sum_{0 \le k \le n} k 2^{k+1} + \sum_{0 \le k \le n} 2^{k+1} \\
    & = \sum_{0 \le k \le n} k 2^k \cdot 2 + \sum_{0 \le k \le n} 2^k \cdot 2 \\
    & = 2S_n + 2 \sum_{0 \le k \le n} 2^k \\
    & = 2S_n + 2 \cdot \frac{2^0 (1 - 2^{n+1})}{1 - 2} \\
    & = 2S_n + 2 (-1 + 2^{n+1}) \\
    & = 2S_n + (2^{n+2} -2) \\
    \\
S_n - 2S_n
    & = (2^{n+2} -2) - (n+1)2^{n+1} \\
    & = 2 \cdot 2^{n+1} -2 - n2^{n+1} - 2^{n+1} \\
    & = 2^{n+1} -n2^{n+1} - 2 \\
-S_n & = (1 - n)2^{n+1} - 2 \\
\\
S_n & = (n - 1)2^{n+1} + 2 \\
\end{align}
$$

## 예3: 예2의 일반화(2대신 x 사용)

$$
\require{cancel}
\begin{align}
S_n & = \sum_{0 \le k \le n} k x^k \\
\\
S_n + (n+1) \cdot x^{n+1}
    & = 0 \cdot x^0 + \sum_{0 \le k \le n} (k+1) \cdot x^{k+1} \quad \because \eqref{2.24} \\
    & = \sum_{0 \le k \le n} (k+1) \cdot x^{k+1} \\
    & = \sum_{0 \le k \le n} k x^{k+1} + \sum_{0 \le k \le n} x^{k+1} \\
    & = \sum_{0 \le k \le n} k x^k \cdot x + \sum_{0 \le k \le n} x^k \cdot x \\
    & = xS_n + x \sum_{0 \le k \le n} x^k \\
    & = xS_n + x \cdot \frac{\cancel{x^0} (1 - x^{n+1})}{1 - x} \\
    & = xS_n + \frac{x - x^{n+2}}{1 - x} \\
S_n - xS_n
    & = - (n+1) \cdot x^{n+1} + \frac{x - x^{n+2}}{1 - x} \\
S_n(1 - x)
    & = {-(n+1) \cdot x^{n+1} \cdot (1-x) \over (1-x)} + \frac{x - x^{n+2}}{(1 - x)} \\
S_n & = {-(n+1) \cdot x^{n+1} \cdot (1-x) \over (1-x)^2} + \frac{x - x^{n+2}}{(1 - x)^2} \\
S_n & = {\left( -(n+1) \cdot x^{n+1} \cdot (1-x) \right) + x - x^{n+2} \over (1-x)^2} \\
S_n & = {\left( -(n+1) \cdot x^{n+1} +(n+1) \cdot x^{n+2} \right) + x - x^{n+2} \over (1-x)^2} \\
S_n & = { (n+1-1)x^{n+2} - (n+1)x^{n+1} + x \over (1-x)^2} \\
S_n & = { nx^{n+2} - (n+1)x^{n+1} + x \over (1-x)^2}, \quad for \; x \ne 1. \\
\\
\end{align}
$$

## 닫힌 형식을 미분해보면

다음과 같이 합의 식을 닫힌 형식으로 풀어낸 것을 미분해 보자.

$$
\underbrace{ \sum_{k=0}^n x^k }_\text{합의 식}
=
\underbrace{ 1 - x^{n+1} \over 1 -x }_\text{닫힌 형식}
$$

양변에서 x의 도함수를 취하면(미분하면) 다음과 같다. (어차피 다 덧셈이라 가능)

$$
\begin{align}
\sum_{k=0}^n k x^{k-1}
    & = { (1-x)(-(n+1)x^n) + 1 - x^{n+1} \over (1-x)^2 } \\
    & = { 1 - (n+1)x^n + nx^{n+1} \over (1-x)^2 } \\
\end{align}
$$


# Links

* [[CONCRETE-MATH]]
