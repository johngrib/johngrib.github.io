---
layout  : wiki
title   : 구체수학 02.합.02.합과 점화식
summary : 02.SUMS.02.SUMS AND RECURRENCES
date    : 2018-05-02 22:02:21 +0900
updated : 2018-05-02 23:10:32 +0900
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
\end{align}
$$

다음과 같은 식이 있다고 하자.

* $$a_n$$은 n을 몇 배 하고 어떤 상수를 더한 것이다.

그렇다면 다음과 같이 점화식을 꾸밀 수 있을 것이다.

$$
\begin{align}
R_0 & = \alpha;   \\
R_n & = R_{n - 1} + \beta + \gamma \cdot n, \quad for \; n \gt 0 \\
\end{align}
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

# Links

* [[CONCRETE-MATH]]
