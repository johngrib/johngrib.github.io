---
layout  : wiki
title   : 수열의 합
summary : Summations
date    : 2019-01-27 21:09:13 +0900
updated : 2019-09-10 23:43:08 +0900
tag     : math
toc     : true
public  : true
parent  : study-discrete-mathematics
latex   : true
---
* TOC
{:toc}

# 수열의 합

다음과 같은 수열 $$ \{ a_n \} $$이 있다고 하자.

$$ \{ a_n \} = a_m, a_{m+1}, a_{m+2}, ..., a_n $$

이 수열 $$ \{ a_n \} $$의 모든 항의 sum을 다음과 같이 표기한다.

$$ \sum_{i=m}^n a_i = a_m + a_{m+1} + a_{m+2} ... + a_{n-1} + a_{n}$$

다음과 같이 범위를 사용해 표기하기도 한다.

$$ \sum_\color{red}{ m ≤ i ≤ n } a_i = a_m + a_{m+1} + a_{m+2} ... + a_{n-1} + a_{n}$$

이것을 "$$ a_i $$의 $$ i = m $$ 부터 $$ n $$ 까지의 합"이라 읽는다.

javascript 로 따지면 그냥 m 번 인덱스부터 n 번 인덱스까지 더하라는 뜻이다.

```js
let sum = 0;
for (let i = m; i <= n; i++) {
    sum += a[i];
}
```

## 등비수열의 합

$$ a, r $$ 이 실수이고, $$ r \ne 0 $$ 일 때

$$
\sum_{j=0}^n ar^j =
\begin{cases}
    { ar^{n+1} - a \over r-1 }  & \text{ if $ r \ne 1$ } \\
    (n + 1) \times a            & \text{ if $ r = 1 $ } \\
\end{cases}
$$

### 증명


$$
\begin{array}{rlll}
S_n  & = \sum_{j=0}^n ar^j \\
rS_n & = r \times \sum_{j=0}^n ar^{j} \ ^\color{red}{(a)} \\
     & = \sum_{j=0}^n ar^{(j+1)} \\
    & = \sum_{j=0}^n ar^{k} \ ^\color{red}{(b)} \\
    & = \sum_{k=1}^{n+1} ar^{k} \\
    & = \left( \sum_{ \color{red}{k=0}}^{n+1} ar^{k} \right) - ar^0 \\
    & = \left( \sum_{k=0}^{n+1} ar^{k} \right) - a \\
    & = \left( \sum_{k=0}^{\color{red}n} ar^{k} \right) - a + ar^{n+1} \\
    & = S_n - a + ar^{n+1} \\
rS_n - S_n
    & =  - a + ar^{n+1} \\
S_n ( r - 1 )
    & =  - a + ar^{n+1} \\
S_n & = { - a + ar^{n+1} \over r - 1} \ \text{ (단, $ r \ne 1 $) }\\
\end{array}
$$

* (a) 양 변에 $$r$$을 곱한다.
* (b) $$j+1$$이 성가시므로 $$k=j+1$$ 이라 하자.

## 이중합

$$ \sum_{i=1}^4 \sum_{j=1}^3 ij $$

$$\sum$$ 이 두 개 나왔다고 당황할 필요는 없다.

위의 식은 다음 코드와 똑같다.

```js
let sum = 0;
for (let i = 1; i <= 4; i++) {
    for (let j = 1; j <= 3; j++) {
        sum += i * j;
    }
}
```

## 유명한 공식들

적당히 외워두자.

$$
\begin{array}{rl}
\sum_{k=0}^n ar^k
    & = { ar^{n+1} - a \over r-1 } \quad \text{ 단, } r \ne 1 \\
\sum_{k=1}^n k
    & = { n(n+1) \over 2 } \\
\sum_{k=1}^n k^2
    & = { n(n+1)(2n+1) \over 6 } \\
\sum_{k=1}^n k^3
    & = { n^2 (n+1)^2 \over 4 } \\
\end{array}
$$

다음은 $$ \lvert x \rvert < 1 $$ 일 때 성립한다.

$$
\begin{array}{rl}
\sum_{k=0}^\infty x^k
    & = \frac{1}{1-x}   \\
\sum_{k=1}^\infty k x^{k-1}
    & = \frac{1}{ (1-x)^2 } \\
\end{array}
$$



# 참고문헌

* Rosen의 이산수학 / Kenneth H. Rosen 저 / 공은배 등저 / 한국맥그로힐(McGraw-Hill KOREA) / 2017년 01월 06일

