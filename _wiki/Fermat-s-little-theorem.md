---
layout  : wiki
title   : 페르마의 소정리
summary : Fermat's little theorem
date    : 2019-03-02 21:17:20 +0900
updated : 2019-03-02 21:32:02 +0900
tags    : math
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
* 그리고, 모든 정수 $$ a $$ 에 대하여
    * $$a^p ≡ a (\bmod p)$$ 이다.

# 예제

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


# 참고문헌

* Rosen의 이산수학 / Kenneth H. Rosen 저 / 공은배 등저 / 한국맥그로힐(McGraw-Hill KOREA) / 2017년 01월 06일
