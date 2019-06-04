---
layout  : wiki
title   : 이항 정리(Binomial Theorem)
summary : 
date    : 2019-03-21 22:49:36 +0900
updated : 2019-06-04 21:18:43 +0900
tag     : math
toc     : true
public  : true
parent  : math
latex   : true
---
* TOC
{:toc}

$$
\def\com#1#2{ {#1 \atopwithdelims () #2 }}
$$

# 표기법: 조합

* 조합을 의미하는 Combination 을 다음과 같이 괄호를 써서 위아래로 표기하고, 이항 계수라 부른다.
* 의미는 똑같지만 $$aCb$$ 는 $$a \times C \times b$$로 착각하기 좋은 모양이라 $$\com{a}{b}$$를 선호한다.

$$
\begin{align}
a C b & = \com{a}{b} \\
3 C 2 & = \com{3}{2} = 3 \\
\end{align}
$$

# 이항 정리

**Binomial Theorem**

$$
\begin{align}
(x+y)^n & = \sum_{j=0}^n \com{n}{j} x^{n-j} y^j \\
    & = \com{n}{0} x^{n} y^0
        + \com{n}{1} x^{n-1} y^1
        + ...
        + \com{n}{n-1} x^{1} y^{n-1}
        + \com{n}{n} x^{0} y^{n} \\
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

즉, $$ (a+b)^n $$ 형태의 각 항의 계수는 조합 $$\com{n}{k}$$ 형태로 표현할 수 있다.

## 따름 정리 1

* n 이 음이 아닌 정수라면 다음이 성립한다.

$$ \sum_{k=0}^n \com{n}{k} = 2^n $$

왜냐하면 $$ (1+1)^n $$ 과 같은 형태이기 때문이다.

$$
\begin{align}
(1+1)^n & = \sum_{k=0}^n \com{n}{k} 1^k 1^{n-k} \\
        & = \sum_{k=0}^n \com{n}{k} \\
\end{align}
$$

## 따름 정리 2

* n 이 음이 아닌 정수라면 다음이 성립한다.

$$ \sum_{k=0}^n (-1)^k \com{n}{k} = 0$$

왜냐하면 $$ (-1 + 1)^n $$ 과 같은 형태이기 때문이다.

$$
\begin{align}
(-1 + 1)^n & = \sum_{k=0}^n \com{n}{k} (-1)^k 1^{n-k} \\
0^n        & = \sum_{k=0}^n \com{n}{k} (-1)^k \\
\end{align}
$$

## 따름 정리 3

* n 이 음이 아닌 정수라면 다음이 성립한다.

$$ \sum_{k=0}^n 2^k \com{n}{k} = 3^n$$

왜냐하면 $$ (1 + 2)^n $$ 과 같은 형태이기 때문이다.

$$
\begin{align}
(1 + 2)^n & = \sum_{k=0}^n \com{n}{k} 1^{n-k} 2^{k} \\
3^n       & = \sum_{k=0}^n \com{n}{k} 2^{k} \\
\end{align}
$$

# 파스칼의 항등식

**Pascal's Identity**

> $$n, k$$ 가 양의 정수이고, $$n \ge k$$ 라면 다음이 성립한다.  
$$ \com{n+1}{k} = \com{n}{k-1} + \com{n}{k}$$

주머니 하나에 여러 색깔의 구슬 $$n+1$$ 개가 들어 있다고 하자.

만약 이 주머니에서 $$k$$개의 구슬을 순서 상관없이 골라낸다고 하면 경우의 수는 $$\com{n+1}{k}$$가 될 것이다.

그런데 이 경우의 수를 두 경우로 분할해서 생각할 수 있다.

1. 빨간 구슬 한 개를 골라놓고 $$k-1$$개를 골라내는 경우. $$\com{n}{k-1}$$
2. 빨간 구슬을 제외하고 $$k$$개를 골라내는 경우. $$\com{n}{k}$$

따라서 다음과 같이 정리할 수 있다.

$$\com{n+1}{k} = \com{n}{k-1} + \com{n}{k}$$

그냥 식을 정리해서 증명하는 방법도 있다.

$$
\begin{align}
\com{n+1}{k}
    & = \com{n}{k-1} + \com{n}{k}\\
    & = { n! \over (k-1)! (n-k+1)!} + { n! \over k!(n-k)! } \\
    & = { n!k \over k! (n-k+1)!} + { n!(n-k+1) \over k!(n-k+1)! } \\
    & = { n!k + n!(n-k+1) \over k!(n-k+1)! } \\
    & = { n! (k + n-k+1) \over k!(n-k+1)! } \\
    & = { n! (n+1) \over k!(n-k+1)! } \\
    & = { (n+1)! \over k!(n+1-k)! } \\
\end{align}
$$

## 파스칼의 삼각형

**Pascal's Triangle**

각 $$n$$번째 행을 $$ \com{n}{0} ... \com{n}{n} $$ 으로 나열하고 삼각형 모양으로 정렬한 것을 파스칼의 삼각형이라 한다.

$$
\begin{array}{ccccccccccccccccccccccccc}
             &            &            & \com{0}{0} \\
             &            & \com{1}{0} &               & \com{1}{1} \\
             & \com{2}{0} &            & \com{2}{1}    &               & \com{2}{2}\\
\com{3}{0}   &            & \com{3}{1} &               & \com{3}{2}    &              & \com{3}{3} \\
             &            &            & ... \\
\end{array}
$$

각 조합을 계산해보면 다음과 같은 자연수의 삼각형이 나오는데, 각 행은 행 번호에 해당하는 이항계수들의 리스트가 된다.

$$
\begin{array}{ccccccccccccccccccccccccc}
&   &   &   &   & 1   & \\
&   &   &   & 1 &     & 1  & \\
&   &   & 1 &   & 2   &    & 1  &   & \\
&   & 1 &   & 3 &     & 3  &    & 1 & \\
& 1 &   & 4 &   & 6   &    & 4  &   & 1 \\
&   &   &   &   & ... & \\
\end{array}
$$

잘 살펴보면 한 줄의 아이템 하나와 바로 위의 대각선 양쪽 아이템들이 파스칼의 항등식을 보여주고 있음을 알 수 있다.

즉, 다음 행의 특정 값을 구하고 싶으면 조합식을 계산하지 않고 위쪽의 양쪽 대각선의 합을 구해도 된다.

# 참고문헌

* Rosen의 이산수학 / Kenneth H. Rosen 저 / 공은배 등저 / 한국맥그로힐(McGraw-Hill KOREA) / 2017년 01월 06일

