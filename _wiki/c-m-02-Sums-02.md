---
layout  : wiki
title   : 구체수학 02.합.02.합과 점화식
summary : 02.SUMS.02.SUMS AND RECURRENCES
date    : 2018-05-02 22:02:21 +0900
updated : 2018-05-04 23:29:28 +0900
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



# Links

* [[CONCRETE-MATH]]
