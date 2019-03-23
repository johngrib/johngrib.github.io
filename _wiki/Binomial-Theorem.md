---
layout  : wiki
title   : 이항 정리(Binomial Theorem)
summary : 
date    : 2019-03-21 22:49:36 +0900
updated : 2019-03-23 11:43:09 +0900
tags    : math
toc     : true
public  : true
parent  : math
latex   : true
---
* TOC
{:toc}

# 표기법: 조합

* 조합을 의미하는 Combination 을 다음과 같이 괄호를 써서 위아래로 표기하고, 이항 계수라 부른다.
* 의미는 똑같지만 $$aCb$$ 는 $$a \times C \times b$$로 착각하기 좋은 모양이라 $${a \atopwithdelims () b}$$를 선호한다.

$$
\begin{align}
a C b & = {a \atopwithdelims () b} \\
3 C 2 & = {3 \atopwithdelims () 2} = 3 \\
\end{align}
$$

# 이항 정리

**Binomial Theorem**

$$
\begin{align}
(x+y)^n & = \sum_{j=0}^n {n \atopwithdelims () j} x^{n-j} y^j \\
    & = {n \atopwithdelims () 0} x^{n} y^0 + {n \atopwithdelims () 1} x^{n-1} y^1 + ... + {n \atopwithdelims () n-1} x^{1} y^{n-1} + {n \atopwithdelims () n} x^{0} y^{n} \\
\end{align}
$$

중학교 때 배운 곱셈 공식을 생각해 볼 수 있을 것이다.

$$(a+b)^2 = a^2 + 2ab + b^2$$

이 등식의 계수는 왜 $$1, 2, 1$$ 이 될까?

식을 전개하는 과정이 a와 b가 들어있는 주머니에서 중복을 무시하고 2번 꺼내서 나열하는 것과 같기 때문이다.

$$
\begin{array}{rlllllllll}
(a+b)^2 & = & a^2 & + & 2ab & + & b^2 \\
        &   & aa  &   & ab  &   & bb  \\
        &   &     &   & bb  &   &     \\
\end{array}
$$

$$(a+b)^3$$ 형태도 마찬가지다.

$$
\begin{array}{rlllllllll}
(a+b)^3 & = & a^3 & + & 3a^2b & + & 3ab^2 & + & b^3 \\
        &   & aaa &   & aab   &   & bba   &   & bbb \\
        &   &     &   & aba   &   & bab   &   &     \\
        &   &     &   & baa   &   & abb   &   &     \\
\end{array}
$$

즉, $$ (a+b)^n $$ 형태의 각 항의 계수는 조합 $${n \atopwithdelims () k}$$ 형태로 표현할 수 있다.

## 따름 정리 1

* n 이 음이 아닌 정수라면 다음이 성립한다.

$$ \sum_{k=0}^n {n \atopwithdelims () k} = 2^n $$

왜냐하면 $$ (1+1)^n $$ 과 같은 형태이기 때문이다.

$$
\begin{align}
(1+1)^n & = \sum_{k=0}^n { n \atopwithdelims () k } 1^k 1^{n-k} \\
    & = \sum_{k=0}^n { n \atopwithdelims () k } \\
\end{align}
$$

## 따름 정리 2

* n 이 음이 아닌 정수라면 다음이 성립한다.

$$ \sum_{k=0}^n (-1)^k {n \atopwithdelims () k} = 0$$

왜냐하면 $$ (-1 + 1)^n $$ 과 같은 형태이기 때문이다.

$$
\begin{align}
(-1 + 1)^n & = \sum_{k=0}^n {n \atopwithdelims () k} (-1)^k 1^{n-k} \\
0^n     & = \sum_{k=0}^n {n \atopwithdelims () k} (-1)^k \\
\end{align}
$$

## 따름 정리 3

* n 이 음이 아닌 정수라면 다음이 성립한다.

$$ \sum_{k=0}^n 2^k {n \atopwithdelims () k} = 3^n$$

왜냐하면 $$ (1 + 2)^n $$ 과 같은 형태이기 때문이다.

$$
\begin{align}
(1 + 2)^n & = \sum_{k=0}^n {n \atopwithdelims () k} 1^{n-k} 2^{k} \\
3^n     & = \sum_{k=0}^n {n \atopwithdelims () k} 2^{k} \\
\end{align}
$$


# 참고문헌

* Rosen의 이산수학 / Kenneth H. Rosen 저 / 공은배 등저 / 한국맥그로힐(McGraw-Hill KOREA) / 2017년 01월 06일

