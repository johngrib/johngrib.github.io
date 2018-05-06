---
layout  : wiki
title   : 구체수학 02.합.02.합과 점화식
summary : 02.SUMS.02.SUMS AND RECURRENCES
date    : 2018-05-02 22:02:21 +0900
updated : 2018-05-07 07:12:56 +0900
tags    : math
toc     : true
public  : true
parent  : study-concrete-math
latex   : true
---
* TOC
{:toc}


# 합과 점화식

$$
S_n = \sum_{k = 0}^{n} a_k
$$

위의 식은 다음 점화식과 같다.

$$
\begin{align}
S_0 & = a_0;  \\
S_n & = S_{n-1} + a_n, \quad for \; n \gt 0   \\
\end{align}\tag{2.6}\label{2.6}
$$

## 예제

다음과 같은 식이 있다고 하자.

* $$a_n$$은 n을 몇 배 하고 어떤 상수를 더한 것이다.

그렇다면 다음과 같이 점화식을 꾸밀 수 있을 것이다.

$$
\begin{align}
R_0 & = \alpha;   \\
R_n & = R_{n - 1} + \beta + \gamma \cdot n, \quad for \; n \gt 0 \\
\end{align}\tag{2.7}\label{2.7}
$$

작은 값들부터 넣어보며 생각해보면 다음을 알 수 있다.

$$
\begin{align}
R_0 & = \alpha;   \\
R_1 & = R_0 + \beta + \gamma    \\
    & = \alpha + \beta + \gamma \\
R_2 & = R_1 + \beta + \gamma \cdot 2    \\
    & = \alpha + 2 \beta + 3 \gamma     \\
...
\end{align}
$$

이를 다음과 같이 일반해로 유도해내자.

$$
R_n = A(n) \alpha + B(n) \beta + C(n) \gamma
$$

레퍼토리법을 사용해 `A(n)`, `B(n)`, `C(n)`을 구하자.

### A(n)을 구하자

$$R_n = 1$$ 이라면

$$
\begin{align}
R_0 & = A(0) \alpha + B(0) \beta + C(0) \gamma \\
    & = \alpha = 1 \\
R_1 & = A(1) \alpha + B(1) \beta + C(1) \gamma \\
    & = \alpha  + \beta + \gamma = 1 \\
R_2 & = A(2) \alpha + B(2) \beta + C(2) \gamma \\
    & = \alpha  + 2 \beta + 3 \gamma = 1 \\
\\
\therefore & \; \alpha = 1, \; \beta = 0, \; \gamma = 0 \\
\\
R_n & = 1 = A(n) \alpha + B(n) \beta + C(n) \gamma \quad 이므로 \\
A(n) & = 1 \; 이다.
\end{align}
$$

### B(n)을 구하자

$$R_n = n$$ 이라면

$$
\begin{align}
R_0 & = A(0) \alpha + B(0) \beta + C(0) \gamma \\
    & = \alpha = 0 \\
R_1 & = A(1) \alpha + B(1) \beta + C(1) \gamma \\
    & = \alpha  + \beta + \gamma = 1 \\
R_2 & = A(2) \alpha + B(2) \beta + C(2) \gamma \\
    & = \alpha  + 2 \beta + 3 \gamma = 2 \\
\\
\therefore & \; \alpha = 0, \; \beta = 1, \; \gamma = 0 \\
\\
R_n & = n = A(n) \alpha + B(n) \beta + C(n) \gamma \quad 이므로 \\
B(n) & = n \; 이다.
\end{align}
$$

### C(n)을 구하자

$$R_n = n^2$$ 이라면

$$
\begin{align}
R_0 & = A(0) \alpha + B(0) \beta + C(0) \gamma \\
    & = \alpha = 0 \\
R_1 & = A(1) \alpha + B(1) \beta + C(1) \gamma \\
    & = \alpha  + \beta + \gamma = 1 \\
R_2 & = A(2) \alpha + B(2) \beta + C(2) \gamma \\
    & = \alpha  + 2 \beta + 3 \gamma = 4 \\
\\
\therefore & \; \alpha = 0, \; \beta = -1, \; \gamma = 2 \\
\\
R_n & = n^2 \\
    & = A(n) \alpha + B(n) \beta + C(n) \gamma \\
    & = - B(n) + 2 C(n) \\
n^2 & = - B(n) + 2 C(n) \\
    & = - n + 2 C(n) \\
\\
n^2 & + n = 2 C(n) \; 이므로 \\
C(n) & = \frac{n^2 + n}{2} \; 이다.
\end{align}
$$

### 응용

다음과 같은 합이 있다고 하자.

$$\sum_{k = 0}^n (a + bk)$$

점화식은 다음과 같을 것이다.

$$
\begin{align}
S_0 & = a;  \\
S_n & = S_{n-1} + a + bn, \quad for \; n \gt 0   \\
\end{align}
$$

그렇다면 $$\eqref{2.7}$$과 같은 방식으로, 다음과 같이 점화식을 꾸밀 수 있다.

$$
\begin{align}
R_0 & = \alpha;   \\
R_n & = R_{n - 1} + \beta + \gamma \cdot n, \quad for \; n \gt 0 \\
    & = R_{n - 1} + a     + b \cdot n \\
\\
\therefore a & = \alpha = \beta \\
           b & = \gamma \\
\end{align}
$$

이를 $$ A(n) \alpha + B(n) \beta + C(n) \gamma $$ 에 대입해보면 다음과 같이 될 것이다.

$$
\begin{align}
aA(n) & + aB(n) + bC(n) \\
    & = a + a n + b \times \frac{n^2 + n}{2} \\
    & = a(n + 1) + \frac{b(n+1)n}{2} \\
\end{align}
$$

### 검증

검증해보고 싶다.

$$\sum_{k = 0}^n (a + bk)$$

이를 풀어 쓰면 구조를 이해하기 쉬울 것 같다.

$$
\begin{align}
& \sum_{k = 0}^n (a + 7k) \\
& = \underbrace{(a + b \cdot 0) + (a + b \cdot 1) + (a + b \cdot 2) + ... + (a + b \cdot n)}_{n+1 개} \\
\\
& \text{0 ~ n 까지 모두 n + 1 개의 항이 있으므로} \\
\\
& = a \cdot (n + 1) + b \cdot (0 + 1 + 2 + ... + n) \\
& = a \cdot (n + 1) + b \cdot \frac{(n+1)(0 + n)}{2} \\
& = a \cdot (n + 1) + b \cdot \frac{(n+1)n}{2} \\
\end{align}
$$

일반해와 똑같은 모양이 나왔다.

## 예제: 하노이의 탑

하노이의 탑 점화식은 다음과 같다.

$$
\begin{align}
T_0 & = 0; \\
T_n & = 2T_{n-1} + 1, \quad for \; n \gt 0. \\
\end{align}
$$

양변을 $$2^n$$으로 나누면 $$\eqref{2.6}$$과 같은 모양이 된다.

$$
\begin{align}
\frac{T_0}{2^n} & = 0; \\
\frac{T_n}{2^n} & = \frac{2T_{n-1}}{2^n} + \frac{1}{2^n}, \quad for \; n \gt 0. \\
\\
S_n & = \frac{T_n}{2^n} \; \text{이라 하자.} \\
\\
S_n & = \frac{T_n}{2^n} \\
    & = S_{n-1} + 2^{-n}, \quad for \; n \gt 0. \\
\end{align}
$$

그렇다면 $$2^{-n}$$씩 더해가는 것이므로 다음과 같이 표현할 수 있다.

$$
\begin{align}
S_n & = \sum_{k = 1}^n 2^{-k} \\
    & = \left(\frac{1}{2}\right)^1 + \left(\frac{1}{2}\right)^2 + ... + \left(\frac{1}{2}\right)^n \\
\end{align}
$$

고등학교 때 배운 등비수열의 합 공식 $$S_n = \frac{S_1 \cdot (r^n - 1)}{r - 1}$$ 을 적용해 보면

$$
\begin{align}
S_n & = \sum_{k = 1}^n 2^{-k} \\
    & = {\frac{1}{2} \cdot ((\frac{1}{2})^n - 1) \over \frac{1}{2} - 1} \\
    & = - \left(\frac{1}{2}\right)^n + 1 \\
\frac{T_n}{2^n}
    & = - \left(\frac{1}{2}\right)^n + 1 \\
T_n & = - 1 + 2^n \\
\end{align}
$$

따라서 하노이의 탑에 `n`개의 원판이 있을 때, 이를 옮기는 최소한의 횟수는 $$2^n - 1$$ 임을 알 수 있다.

### 일반화

위의 풀이법을 사용하면 다음 형태의 점화식을 일반화할 수 있을 것 같다.

$$
a_n T_n = b_n T_{n-1} + c_n
$$

양 변에 $$s_n$$을 곱하자. (단, $$s_n b_n = s_{n-1} a_{n-1}$$.)

$$
\begin{align}
s_n a_n T_n
    & = s_n b_n T_{n-1} + s_n c_n \\
    & = s_{n-1} a_{n-1} T_{n-1} + s_n c_n \\
S_n & = (S_{n-1}) + s_n c_n \quad (S_n = s_n a_n T_n \text{이라 하자}) \\
    & = (S_{n-2} + s_{n-1} c_{n-1}) + s_n c_n \\
    & ... \\
    & = S_0 + s_1 c_1 + s_2 c_2 + ... + s_n c_n \\
    & = s_0 a_0 T_0 + \sum_{k = 1}^n s_k c_k \\
    & = s_1 b_1 T_0 + \sum_{k = 1}^n s_k c_k \\
\\
한편, \; & S_n = s_n a_n T_n \quad 이므로 \\
T_n & = \frac{1}{s_n a_n} \cdot S_n \\
    & = \frac{1}{s_n a_n} \left( s_1 b_1 T_0 + \sum_{k = 1}^n s_k c_k \right) \\
\end{align}
$$

#### 검증

위의 일반해를 하노이의 탑으로 검증해 보자.

하노이의 탑 점화식은 다음과 같았다.

$$
\begin{align}
T_0 & = 0; \\
T_n & = 2T_{n-1} + 1, \quad for \; n \gt 0. \\
\end{align}
$$

일반화에 사용한 형태의 점화식이 다음과 같았으므로,

$$ a_n T_n = b_n T_{n-1} + c_n $$

하노이의 탑에서 각 변수의 값은 다음과 같다.

* $$ a_n = 1 $$ &nbsp;
* $$ b_n = 2 $$ &nbsp;
* $$ c_n = 1 $$ &nbsp;
* $$ T_0 = 0 $$ &nbsp;

따라서 일반해는 다음과 같다.

$$
\require{cancel}
\begin{align}
s_n b_n & = s_{n-1}a_{n-1} \; 이므로 \\
s_n \cdot 2 & = s_{n-1} \\
s_n & = 2^{-n} \\
\\
T_n & = \frac{1}{s_n a_n} \left( s_1 b_1 T_0 + \sum_{k = 1}^n s_k c_k \right) \\
    & = \frac{1}{s_n a_n} \left(\sum_{k = 1}^n s_k c_k \right) \\
    & = \frac{1}{s_n} \left(\sum_{k = 1}^n s_k \right) \\
    & = 2^n \sum_{k = 1}^n 2^{-k} \\
    & = 2^n {\cancel{\frac{1}{2}} ( 1 - (\frac{1}{2})^n ) \over \cancel{1 - \frac{1}{2}}} \\
    & = 2^n - 2^n \cdot \frac{1}{2^n} \\
    & = 2^n - 1 \\
\end{align}
$$


# Links

* [[CONCRETE-MATH]]
