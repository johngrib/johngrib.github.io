---
layout  : wiki
title   : 구체수학 02.합.07.무한합
summary : 02.SUMS.06.INFINITE SUMS
date    : 2018-05-27 17:04:23 +0900
updated : 2018-05-28 00:39:16 +0900
tags    : math
toc     : true
public  : true
parent  : study-concrete-math
latex   : true
---
* TOC
{:toc}

이 문서는 [[CONCRETE-MATH]] **2장.합 - 7.무한합**을 공부한 노트입니다.

# 무한합 주의점

* 지금까지 배운 것은 "유한합(finite sum)"이었다.
    * 지금까지 배운 $$\sum$$ 조작 방법들 중, 무한합에 통하지 않는 것들이 있다.
    * 어떤 경우에 어떤 것이 통하는지를 배워야 한다.

## 예: 통하는 경우

다음과 같이 `S`의 값이 `2`라고 하는 것은 통한다.
(수렴하기 때문인 것 같다)

$$
\begin{align}
S   & = 1 + \frac{1}{2} + \frac{1}{4} + \frac{1}{8} + ... \\
    & = 2 \\
\end{align}
$$

왜냐하면 다음과 같기 때문이다.

$$
\begin{align}
2S  & = 2 \biggr(1 + \frac{1}{2} + \frac{1}{4} + \frac{1}{8} + ... \biggr) \\
    & = 2 + \frac{2}{2} + \frac{2}{4} + \frac{2}{8} + ... \\
    & = 2 + \biggr(1 + \frac{1}{2} + \frac{1}{4} + ... \biggr)\\
    & = 2 + S \\
2S -S & = 2 \\
S   & = 2 \\
\end{align}
$$

그러나 다음과 같은 경우에는 모순이 발생하여 통하지 않는다는 것을 알 수 있다.
(발산하기 때문인 것 같다)

$$
\begin{align}
T   & = 1 + 2 + 4 + 8 + ... \\
2T  & = 2 + 4 + 8 + 16 + ... \\
2T  & = -1 + 1 + (2 + 4 + 8 + ...) \\
2T  & = -1 + (1 + 2 + 4 + 8 + ...) \\
2T  & = -1 + T \\
T   & = -1 \\
-1  & = 1 + 2 + 4 + 8 + ... 모순 발생\\
\end{align}
$$

# $$\sum_{k \in K} a_k$$를 정의하자

* 집합 `K`는 음이 아닌 정수의 집합이다.
* 집합 `K`는 무한 집합일 수도 있다.
* 일반 합 $$\sum_{k \in K} a_k$$를 어떻게 안전하게 정의할 수 있을까?

$$a_k \ge 0$$ 이라 생각하자.  그렇다면 가능한 경우는 두 가지다.

집합 `K`의 유한 부분집합 `F`에 대해,

* $$\sum_{k \in F} a_k \le A$$ &nbsp;
    * 합의 결과가 `A`의 최소값으로 나온다.
        * 이런 `A`를 경계상수라 부르자.
* $$\sum_{k \in K} a_k = \infty $$ &nbsp;
    * 합의 결과로, 경계상수 `A`가 없다면 합의 결과는 $$\infty$$일 것이다.
    * 즉, 합의 결과는 결계상수 `A`이거나 무한대이다.


일단 집합 `K`가 음이 아닌 정수들의 집합이라면 다음과 같이 생각할 수 있다.

$$
\sum_{k \ge 0} a_k = \lim_{n \to \infty} \sum_{k=0}^n a_k
$$

## 응용

### $$a_k = x^k$$ 를 풀어보자

$$a_k = x^k$$ 이라면 다음과 같다.

$$
\sum_{k \ge 0} x^k = \lim_{n \to \infty} \frac{1-x^{n+1}}{1-x} =
\begin{cases}
    \frac{1}{1-x},  & if \; 0 \le x \lt 1 \\
    \infty,         & if \; x \ge 1 \\
\end{cases}
$$

* 만약 `x`가 0보다 크고 1보다 작은 수라면 결과는 $$\frac{1}{1-x}$$이 된다.
* 만약 `x`가 1보다 크거나 같다면 결과는 무한대가 된다.

### S 를 풀어보자

위에서 풀어 보았던 `S`의 값을 이 방법으로 검증해 보자.

$$
\begin{align}
S   & = 1 + \frac{1}{2} + \frac{1}{4} + \frac{1}{8} + ... \\
    & = 2 \\
\end{align}
$$

$$
\begin{align}
\sum_{k \ge 0} \left(\frac{1}{2}\right)^k
    & = \frac{1}{1-\frac{1}{2}} \\
    & = 2 \\
\end{align}
$$

오오. 아주 쉽게 `2`가 맞다는 것을 검증할 수 있었다.

### T 를 풀어보자

그렇다면 이번에는 위에서 풀지 못했던 `T`를 풀어 보자.

$$
T = 1 + 2 + 4 + 8 + ...
$$

모양을 보면 대충 식이 다음과 같이 될 것 같다.

$$
\sum_{k \ge 0} 2^k
$$

여기에서 `x`값이 `1` 이상이므로 $$T = \infty$$ 가 된다.

### 내림제곱이 있는 형태를 풀어보자

$$
\begin{align}
\sum_{k \ge 0} \frac{1}{(k+1)(k+2)}
    & = \sum_{k \ge 0} k^{\underline{-2}} \\
    & = \lim_{n \to \infty} \sum_{k=0}^{n-1} k^{\underline{-2}} \\
    & = \lim_{n \to \infty} \frac{k^{\underline{-1}}}{-1} \biggr\rvert_0^n \\
    & = - \lim_{n \to \infty} k^{\underline{-1}} \biggr\rvert_0^n \\
    & = - \lim_{n \to \infty} \frac{1}{k+1} \biggr\rvert_0^n \\
    & = - (\lim_{n \to \infty} \frac{1}{n+1} - \lim_{n \to \infty} \frac{1}{0+1}) \\
    & = - (\frac{1}{\infty + 1} - 1) \\
    & = - (0 - 1) \\
    & = 1 \\
\end{align}
$$
