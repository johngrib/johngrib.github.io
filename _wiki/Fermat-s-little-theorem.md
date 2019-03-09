---
layout  : wiki
title   : 페르마의 소정리
summary : Fermat's little theorem
date    : 2019-03-02 21:17:20 +0900
updated : 2019-03-03 17:42:20 +0900
tag     : math
toc     : true
public  : true
parent  : math
latex   : true
---
* TOC
{:toc}

# 정리

>
If $$p$$ is prime and $$a$$ is an integer not divisible by $$p$$, then  
$$a^{p−1} ≡ 1 (\bmod p)$$  
Furthermore, for every integer $$a$$ we have  
$$a^p ≡ a (\bmod p)$$

* $$ p $$ 가 소수이고 $$ a $$ 가 $$ p $$ 로 나누어지지 않는 정수이면
    * $$a^{p−1} ≡ 1 (\bmod p)$$ 이다.
* 그리고, 모든 $$ a $$ 에 대하여
    * $$a^p ≡ a (\bmod p)$$ 이다.

## 계산 예제

> $$ 7^{222} \bmod 11 $$ 을 계산하라.

7 보다 큰 소수 11 을 사용해 페르마의 소정리에 적용해보면 다음을 얻을 수 있다.

$$
\begin{align}
7^{11-1} & ≡ 1 (\bmod 11) \\
7^{10}   & ≡ 1 (\bmod 11) \\
\end{align}
$$

이제 $$ 7^{222} \bmod 11 $$을 단순하게 정리할 수 있다.

$$ 7^{222} = 7^{22 \times 10} \times 7^2$$

따라서 답은 5 다.

$$
\begin{align}
7^{222} & ≡ 1^{22} \times 7^2 (\bmod 11) \\
    & ≡ 49 (\bmod 11) \\
    & ≡ 5 (\bmod 11) \\
\end{align}
$$

# 유사소수

**pseudoprime**

페르마의 소정리는 편리하지만 주의해야 할 점이 있다.

* $$p$$ 가 소수이면 페르마의 소정리를 만족한다.
    * 하지만 페르마의 소정리를 만족한다고 해서 $$p$$ 가 반드시 소수인 것은 아니다.

즉, $$ p $$ 가 합성수인데도 $$a^{p − 1} ≡ 1 ( \bmod p)$$ 를 통과하는 경우가 있다.

이런 합성수들을 **유사소수**라 부른다.

>
Let $$b$$ be a positive integer.
If $$n$$ is a composite positive integer, and $$b^{n−1} ≡ 1 (\bmod n)$$,
then $$n$$ is called a _pseudoprime_ to the base $$b$$.

* $$ b $$ 를 양의 정수라 하자.
* $$ n $$ 이 양의 정수인 합성수이고, $$ b^{n-1} ≡ 1 (\bmod n) $$ 이면
    * $$n$$을 $$ b $$를 밑수로 하는 **유사소수**라 부른다.

### 유사소수 예제

> $$b = 2$$일 때, 341 은 유사소수인가?

유사소수인지 확인하려면 두 조건을 체크하면 된다.

1. 합성수인가?
2. 다음 합동식이 참인지 확인하면 된다.
    * $$ 2^{341 - 1} ≡ 1 (\bmod 341) $$.
    * 즉, $$ 2^{340} $$ 을 341 로 나눈 나머지가 1 인지 확인하면 된다.

일단 341 은 합성수가 맞다. $$ 341 = 11 \times 31 $$.

이제 $$ 2^{340} $$을 341로 나누면 나머지가 1 이 나오는지를 확인하면 된다.

$$ 2^{340} $$은 꽤 큰 수이기 때문에 나머지를 구하는 것은 까다로운 일이다.

그러나 [페르마의 소정리](/Fermat-s-little-theorem/)를 활용하면 $$ 2^{10} $$을 11로 나눈 나머지가 1 이라는 사실을 쉽게 확인할 수 있고, 이를 이용해 $$ 2^{340} \bmod 341 $$ 을 쉽게 풀 수 있다.

$$
\begin{align}
2^{11-1} & ≡ 1(\bmod 11) \\
2^{10}   & ≡ 1(\bmod 11) \\
\end{align}
$$

따라서 다음과 같이 확인할 수 있다.

$$
\begin{align}
2^{341 - 1} & ≡ 1 (\bmod 341) \\
2^{340}     & ≡ 1 (\bmod 341) \\
(2^{10})^{34} & ≡ 1 (\bmod 341) \\
1^{34}      & ≡ 1 (\bmod 341) \\
1           & ≡ 1 (\bmod 341) \\
\end{align}
$$

341 은 2를 밑수로 하는 유사소수이다.


## 카마이클 수

**Carmichael number**

>
A composite integer $$n$$ that satisfies the congruence $$b^{n−1} ≡ 1 (\bmod n)$$
for all positive integers $$b$$ with $$\gcd(b, n) = 1$$ is called a Carmichael number.
(These numbers are named after Robert Carmichael, who studied them in the early twentieth century.)

* $$ \gcd(b, n) = 1 $$ 인 모든 양의 정수 $$b$$ 에 대하여,
    * $$ b^{n-1} ≡ 1 (\bmod n) $$을 만족하는 합성수인 정수 $$n$$을 카마이클 수라 부른다.

### 카마이클 수 예제

> 561 은 카마이클 수인가?

카마이클 수인지 확인하려면 두 조건을 체크하면 된다.

1. 합성수인가?
2. $$\gcd(b,n)$$인 모든 양의 정수 $$ b $$에 대하여 $$ b^{561-1} ≡ 1 (\bmod 561) $$ 이 성립하는가?

일단 561 은 합성수가 맞다. $$ 561 = 3 \times 11 \times 17 $$.

이제 $$ b^{560} ≡ 1 (\bmod 561) $$ 을 확인하자.

561 의 소인수를 페르마의 소정리 $$a^{p-1} ≡ 1 (\bmod p)$$ 에 넣어 다음과 같이 정리할 수 있다.

$$
\begin{align}
b^{2} & ≡ 1 (\bmod 3) \\
b^{10} & ≡ 1 (\bmod 11) \\
b^{16} & ≡ 1 (\bmod 17) \\
\end{align}
$$

그러므로 $$ b^{560} $$ 에 대해 다음과 같은 사실을 알 수 있다.

$$
\begin{array}{rll}
b^{560} & = (b^2)^{280} & ≡ 1 (\bmod 3) \\
b^{560} & = (b^{10})^{56} & ≡ 1 (\bmod 11) \\
b^{560} & = (b^{16})^{35} & ≡ 1 (\bmod 17) \\
\end{array}
$$

따라서 561 과 서로소인 모든 양의 정수 $$ b $$에 대해 다음이 성립한다.

$$
\begin{align}
b^{560} & ≡ 1 \biggl(\bmod (3\times 11 \times 17) \biggl) \\
b^{560} & ≡ 1 (\bmod 561) \\
\end{align}
$$

(만약 $$b$$가 561 과 서로소가 아니라면?
가령 $$ b $$ 가 11 의 배수라면 $$\mod 11$$ 의 결과가 1 이 아니라 0 이 된다.
따라서 위의 합동식은 성립하지 않게 된다.)



# 참고문헌

* Rosen의 이산수학 / Kenneth H. Rosen 저 / 공은배 등저 / 한국맥그로힐(McGraw-Hill KOREA) / 2017년 01월 06일
