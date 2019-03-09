---
layout  : wiki
title   : 원시근(Primitive Roots)
summary : 
date    : 2019-03-03 21:55:44 +0900
updated : 2019-03-03 22:45:31 +0900
tag     : math
toc     : true
public  : true
parent  : math
latex   : true
---
* TOC
{:toc}

# 정의

## 원시근

**Primitive Roots**

>
A primitive root modulo a prime $$p$$ is an integer $$r$$ in $$Z_p$$ such that every nonzero element of $$Z_p$$ is a power of $$r$$.

* 원시근 모듈로 소수 $$p$$는 $$ Z_p $$ 의 원소이며, 정수이다.
    * $$Z_p$$는 $$r$$의 거듭제곱으로 이루어진 0 이 아닌 정수들이다.

모든 소수 $$p$$에 대해 원시근 모듈로 $$p$$가 존재한다.

* 만약 $$a$$ 가 $$Z_p$$의 원소이면 (즉, $$ 0 \lt a \le p - 1 $$ 이면)
    * $$ Z_p $$ 에 $$r^e = a$$ 인 유일한 지수 $$e$$가 있다. (즉, $$r^e \bmod p = a$$ 인 $$e$$가 있다.)

### 원시근 예제

> 2 와 3 이 원시근 모듈로 11 임을 결정하라.

$$Z_{11}$$ 안에서 2의 거듭제곱을 계산해보자. 각 거듭제곱의 결과를 11로 나눈 나머지를 구하면 된다.

$$
\begin{align}
2^1 & = 2 \\
2^2 & = 4 \\
2^3 & = 8 \\
2^4 & = 5 \\
2^5 & = 10 \\
2^6 & = 9 \\
2^7 & = 7 \\
2^8 & = 3 \\
2^9 & = 6 \\
2^{10} & = 1 \\
\end{align}
$$

1 부터 10 까지 다 있다.

$$ Z_{11} $$의 모든 원소가 2의 거듭제곱이므로 2 는 11의 원시근이다.

이번에는 3 이 11 의 원시근인지 알아보자.

$$
\begin{align}
3^1 & = 3 \\
3^2 & = 9 \\
3^3 & = 5 \\
3^4 & = 4 \\
3^5 & = 1 \\
3^6 & = 3 \\
3^7 & = 9 \\
3^8 & = 5 \\
3^9 & = 4 \\
3^{10} & = 1 \\
\end{align}
$$

$$3, 9, 5, 4, 1$$ 이 반복된다.

$$2, 6, 7, 8, 10$$ 이 빠졌으므로 3 은 11 의 원시근이 아니다.

## 이산로그

**discrete logarithm**

>
Suppose that $$p$$ is a prime,
$$r$$ is a primitive root modulo $$p$$,
and $$a$$ is an integer between 1 and $$p − 1$$ inclusive.
If $$r^e \bmod p = a$$ and $$0 ≤ e ≤ p − 1$$,
we say that $$e$$ is the discrete logarithm of $$a$$ modulo $$p$$ to the base $$r$$
and we write $$\log_r a = e$$
(where the prime $$p$$ is understood).

* $$ p $$ 가 소수이고, $$r$$이 원시근 모듈로 $$p$$이고, $$ a $$가 $$ 1 \le a \le p-1 $$인 정수라 하자.
    * $$ r^e \bmod p = a $$ 이고, $$ 0 \le e \le p-1 $$ 이면...
    * $$ e $$ 를 $$r$$을 밑으로 하는 $$a$$ 모듈로 $$p$$의 이산로그라 한다.
        * 표기는 $$ \log_r a = e $$ 이다.

이산로그 문제는 쉬워 보이지만, 의외로 다항시간 알고리즘이 존재하지 않는다.

이산로그 문제의 어려움은 암호학에서 유용하게 쓰인다.

### 이산로그 예제

> 2를 밑으로 하는 3과 5의 모듈로 11의 이산로그를 찾아라.

위의 원시근 예제를 풀 때 다음을 미리 계산해 두었었다.

$$
\begin{align}
2^4 & = 5 \\
2^8 & = 3 \\
\end{align}
$$

따라서 3 과 5는 $$Z_{11}$$에 들어있다.

$$ 2^4 \bmod 11 = 5 $$ 이고, $$ 0 \le 4 \le 10 $$ 이므로 2 를 밑으로 하는 5 모듈로 11 의 이산로그는 4 이다.

막상 써보면 평범한 로그와 똑같이 생겼으므로 어렵지 않게 이해할 수 있다.

$$ \log_2 5 = 4 $$

한편,
$$ 2^8 \bmod 11 = 3 $$ 이고, $$ 0 \le 8 \le 10 $$ 이므로 2 를 밑으로 하는 3 모듈로 11 의 이산로그는 8 이다.

$$ \log_2 3 = 8 $$

# 참고문헌

* Rosen의 이산수학 / Kenneth H. Rosen 저 / 공은배 등저 / 한국맥그로힐(McGraw-Hill KOREA) / 2017년 01월 06일

