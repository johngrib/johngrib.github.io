---
layout  : wiki
title   : 구체수학 02.합.01.표기법
summary : 02.SUMS.01.NOTATION
date    : 2018-05-02 22:02:21 +0900
updated : 2018-05-02 23:10:36 +0900
tags    : math
toc     : true
public  : true
parent  : study-concrete-math
latex   : true
---
* TOC
{:toc}

# 표기법

## 표준적인 표기법

### 시그마 표기

$$
\sum_{k=1}^{n} a_k
$$

#### 일반화된 시그마 표기

* 합산을 진행할 색인들의 집합을 규정하는 조건을 $$\sum$$ 아래쪽에 명시해준다.

$$
\sum_{1 \le k \le n} a_k
$$

* 100 미만의 모든 홀수의 제곱의 합

$$
\sum_{\substack{1 \le k \lt 100 \\ \text{k는 홀수}}} k^2
$$

#### 한계 명시 시그마 표기

* 한계 명시 표기법은 $$\sum$$ 위쪽에 한계를 명시한다.
* 조제프 푸리에(Joseph Fourier)가 1820년에 도입한 표기법.

$$
\sum_{k = 0}^{49} (2k + 1)^2
$$

## 전통과 벗어난 표기법

* 케네스 E. 아이버슨(Kenneth E. Iverson)이 프로그래밍 언어 APL에서 착안.
    * 명제가 참이면 1, 거짓이면 0.

$$
[\text{p는 소수}] =
\begin{cases}
    1,  & \text{if p is a prime number;} \\[2ex]
    0,  & \text{if p is not a prime number.}
\end{cases}
$$

# Links

* [[CONCRETE-MATH]]
