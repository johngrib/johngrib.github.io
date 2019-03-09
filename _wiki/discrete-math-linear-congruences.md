---
layout  : wiki
title   : 선형합동
summary : Linear Congruences
date    : 2019-02-24 00:13:22 +0900
updated : 2019-03-07 21:44:09 +0900
tag     : math
toc     : true
public  : true
parent  : study-discrete-mathematics
latex   : true
---
* TOC
{:toc}

# 선형합동

**Linear Congruences**

>
A congruence of the form $$ax ≡ b \ (\bmod m)$$,
where $$m$$ is a positive integer, $$a$$ and $$b$$ are integers,
and $$x$$ is a variable, is called a linear congruence.

* 양의 정수 m, 정수 a,b 에 대하여,
    * $$ ax ≡ b \ (\bmod m) $$ 형태의 합동을 선형합동(linear congruence)이라 부른다.

## a 모듈로 m 의 역(inverse)

* $$ \bar{a} a \equiv 1 \ (\bmod m) $$ 인 정수 $$ a $$가 존재한다면,
    * 정수 $$ \bar{a} $$를 $$a$$ 모듈로 $$m$$의 역(inverse)이라 부른다.

>
If $$a$$ and $$m$$ are relatively prime integers and $$m > 1$$, then an inverse of $$a$$ modulo $$m$$ exists.
Furthermore, this inverse is unique modulo $$m$$.
(That is, there is a unique positive integer $$\bar{a}$$ less than $$m$$
that is an inverse of $$a$$ modulo $$m$$ and every other inverse of $$a$$ modulo $$m$$ is congruent to $$\bar{a}$$ modulo $$m$$.)

* $$ \bar{a} a \equiv 1 \ (\bmod m) $$ 에 대하여
    * $$a, m$$ 이 서로소이고 $$ m > 1 $$ 이면
        * $$a$$ 모듈로 $$m$$의 역이 존재한다.
        * 이런 경우, $$0 < \bar{a} < m$$인 $$a$$ 모듈로 $$m$$의 역 $$ \bar{a} $$는 하나 밖에 없다.
        * 그 외의 다른 모든 a 모듈로 m 의 역은 $$\bar{a}$$ 모듈로 m과 합동이다.

예를 보며 이해하자.

* $$ \bar{a} \times 2 ≡ 1 (\bmod 5) $$.
    * 2와 5는 서로소이고 $$ 5 > 1 $$ 이므로, '2 모듈로 5'의 역 $$\bar{a}$$는 존재한다.
    * 정수 3, 8, 13, 18, ... 등은 '2 모듈로 5의 역'이다.
        * $$ m = 5 $$ 보다 작은 '2 모듈로 5의 역' 은 3 하나뿐이다.

## a 모듈로 m 의 역 구하기 연습

### 예제 1

> [베주의 계수](/wiki/gcd/#베주의-정리와-베주의-항등식)를 찾는 방법으로, 3 modulo 7 의 역을 찾아라.

$$ \bar{a} \times \color{blue}{3} = 1 \ (\bmod 7) $$

* 3과 7의 최대공약수는 1이다.
    * $$ 2 \times 3 + 1 = 7 $$ 이므로
    * 베주의 항등식으로 표현하면 $$ \gcd(3, 7) = 1 = \color{red}{-2} \times \color{blue}3 + \color{red}{1} \times 7 $$
        * 따라서 베주의 계수는 $$\color{red}{-2, 1}$$이다.
    * 잘 살펴보면 3 modulo 7 의 역이 $$-2$$ 라는 것을 알 수 있다.
    * 0보다 크고 m 보다 작은 역은 5 이다.

### 예제 2

> 101 모듈로 4620 의 역을 찾아라.

$$ \bar{a} \times 101 = 1 \ (\bmod 4620)$$

먼저 [유클리드 호제법](/wiki/gcd/#유클리드-알고리즘)을 사용해 $$ gcd(101, 4620) $$을 찾자.

$$
\begin{align}
4620 & = 45 \times 101 + 75 \\
101 & = 1 \times 75 + 26 \\
75 & = 2 \times 26 + 23 \\
26 & = 1 \times 23 + 3 \\
23 & = 7 \times 3 + 2 \\
3 & = 1 \times 2 + 1 \\
2 & = 2 \times 1 \\
\end{align}
\\
\therefore \gcd(101, 4620) = 1 \\
$$

베주의 항등식을 만들자.

$$ 1 = s \times \color{red}{101} + t \times \color{red}{4620} $$

형태가 나오도록 위의 호제법 과정의 계산식을 적당히 가져다 끼워 맞추면 된다.

$$
\begin{array}{rll}
1 & = 3 - 1 \times 2 \\
  & = 3 - \color{purple}2 & \color{gray}{\text{ (2 제거) }} \\
  & = 3 - (23 - 7 \times 3) \\
  & = -23 + 8 \times \color{purple}3 \\
  & = -23 + 8 \times (26 - 23) & \color{gray}{\text{ (3 제거) }} \\
  & = -9 \times \color{purple}{23} + 8 \times 26 \\
  & = -9 \times (75 - 2 \times 26) + 8 \times 26 & \color{gray}{\text{ (23 제거) }} \\
  & = -9 \times 75 + 26 \times \color{purple}{26} \\
  & = -9 \times 75 + 26 \times (101 - 75) & \color{gray}{\text{ (26 제거) }} \\
  & = -35 \times \color{purple}{75} + 26 \times 101 \\
  & = -35 \times (4620 - 45 \times 101) + 26 \times 101 & \color{gray}{\text{ (75 제거) }} \\
  & = -35 \times 4620 + (-35 \times -45 + 26) \times 101 \\
  & = -35 \times \color{red}{4620} + 1601 \times \color{red}{101} \\
\end{array}
$$

따라서 101 모듈로 4620 의 역 $$ \bar{a} = 1601 $$ 이다.

### 예제 3

* a 모듈로 m 의 역 $$ \bar{a} $$를 알고 있으면 합동 $$ ax ≡ b \ (\bmod m) $$ 을 풀 수 있다.
    * 양 변에 $$ \bar{a} $$ 를 곱하면 된다.

> 선형합동 $$ 3x ≡ 4 (\bmod 7) $$ 의 해를 구하라.

먼저 3 모듈로 7 의 역을 찾아보자.

$$ \bar{a} \times 3 ≡ 1 \ (\bmod 7) $$

베주의 항등식을 이용하면 $$ 1 = 7 - 2 \times 3 $$ 이므로,

3 모듈로 7 의 역은 $$-2$$ 이다.

합동식의 양 변에 $$-2$$를 곱하자.


$$
\begin{align}
3 x & ≡  4 \ (\bmod 7) \\
-2 \times 3 x & ≡ -2 \times 4 \ (\bmod 7) \\
-6 x & ≡ -8 \ (\bmod 7) \\
\end{align}
$$

그런데 $$ -6 ≡ \color{red}1 \ (\bmod 7) $$ 이고, $$ -8 ≡ \color{blue}6 \ (\bmod 7) $$ 이다.

우변과 나머지를 맞추기 위해 $$x ≡ \color{purple}6 \ (\bmod 7)$$ 이라 가정하자.

$$
\begin{align}
-6 x & ≡ -8 \ (\bmod 7) \\
\color{red}1 \times \color{purple}6 & ≡ \color{blue} 6 \ (\bmod 7) \\
\end{align}
$$

대입해보면 들어맞는다.

$$
\begin{align}
3x & ≡ 4 \ (\bmod 7) \\
3 \times 6 & ≡ 4 \ (\bmod 7) \\
18  & ≡ 4 \ (\bmod 7) \\
\end{align}
$$

따라서 $$x ≡ 6 \ (\bmod 7)$$ 인 정수 x, 즉 $$ -8, -1, 6, 13, 20, ... $$ 등이 합동의 해이다.


# 중국인의 나머지 정리

**The Chinese Remainder Theorem**

>
Let $$m_1, m_2, ..., m_n$$ be pairwise relatively prime positive integers
greater than one and $$a_1, a_2, ..., a_n$$ arbitrary integers.
Then the system  
$$
x ≡ a_1 (\bmod m_1), \\
x ≡ a_2 (\bmod m_2), \\
\vdots \\
x ≡ a_n (\bmod m_n) \\
\\
$$
has a unique solution modulo $$m = m_1 \cdot m_2 ... m_n$$.
(That is, there is a solution $$x$$ with $$0 \le x \lt m$$,
and all other solutions are congruent modulo $$m$$ to this solution.)

* $$ m_1, m_2, ..., m_n $$가 모두 서로소인 양의 정수이고, $$ a_1, a_2, ..., a_n $$가 모두 임의의 정수라 할 때,
    * 다음의 연립 합동식은 유일한 해를 갖는다.

$$
x ≡ a_1 (\bmod m_1), \\
x ≡ a_2 (\bmod m_2), \\
\vdots \\
x ≡ a_n (\bmod m_n) \\
\\
$$

* 그리고 그 해는 모듈로 $$m = m_1 \cdot m_2 ... m_n$$ 이다.
    * 즉 $$ 0 \le x \lt m $$ 인 해 $$x$$가 있고, 모든 다른 해는 이 해에 모듈로 $$m$$ 합동이다.

## 증명

$$m = m_1 \cdot m_2 ... m_n$$ 이므로, $$ M_k $$ 를 다음과 같이 정의하자.

$$
\begin{align}
M_k & = \frac{m}{m_k} \\
\end{align}
$$

그런데 $$ m_1, m_2, m_3, ..., m_n $$ 은 모두 서로소이므로 $$ m_k $$ 와 $$ M_k $$의 최대공약수는 1 이다.

$$ \gcd(m_k, M_k) = 1 $$

$$m_k$$과 $$M_k$$ 가 서로소이고, $$ m_k > 1 $$ 이므로, [위에서 언급한 정리](#a-모듈로-m-의-역inverse)에 의해 $$ M_k $$ 모듈로 $$ m_k $$의 역이 존재할 것이다.

그 $$ M_k $$ 모듈로 $$ m_k $$의 역을 $$ y_k $$ 라 하자.

$$ M_k \cdot y_k ≡ 1 \ (\bmod m_k) $$

연립해를 구성하기 위해 다음과 같은 합을 꾸며보자.

$$x = a_1 M_1 y_1 + a_2 M_2 y_2 + ... + a_n M_n y_n $$

이 합이 왜 엽립해가 되는가?

$$ j \ne k $$ 일 때 $$ M_j ≡ 0 \ (\bmod m_k) $$ 이므로 $$ k $$ 번째 항을 제외한 모든 항이 $$ 0 $$ 모듈로 $$ m_k $$ 에 합동이기 때문이다.

$$ x ≡ a_k M_k y_k ≡ a_k \ (\bmod m_k) $$

## 예제 4

>
알려지지 않은 숫자가 있다.
3으로 나누면 2가 남고 5로 나누면 3이 남고 7로 나누면 2가 남는 수는 무엇인가?

이 문제는 다음의 연립 합동식으로 생각할 수 있다.

$$
x ≡ 2 (\bmod 3), \\
x ≡ 3 (\bmod 5), \\
x ≡ 2 (\bmod 7) \\
$$

그리고 $$ m = 3 \times 5 \times 7 = 105 $$ 이므로,

$$
\begin{align}
M_1 & = \frac{m}{3} = 35 \\
M_2 & = \frac{m}{5} = 21 \\
M_3 & = \frac{m}{7} = 15 \\
\end{align}
$$

35 modulo 3의 역 $$ y_1 $$,
21 modulo 5의 역 $$ y_2 $$,
15 modulo 7의 역 $$ y_3 $$를 구하자.

* $$35 y_1 ≡ 1 \ (\bmod 3)$$ 이므로 $$ y_1 = 2 $$
* $$21 y_2 ≡ 1 \ (\bmod 5)$$ 이므로 $$ y_2 = 1 $$
* $$15 y_3 ≡ 1 \ (\bmod 7)$$ 이므로 $$ y_3 = 1 $$

$$ x ≡ a_1 M_1 y_1 + a_2 M_2 y_2 + a_3 M_3 y_3 $$ 이므로, 값을 대입해 계산해 보면...

$$
\begin{align}
a_1 M_1 y_1 + a_2 M_2 y_2 + a_3 M_3 y_3
    & = 2 \cdot 35 \cdot 2 + 3 \cdot 21 \cdot 1 + 2 \cdot 15 \cdot 1 \\
    & = 140 + 63 + 30 \\
    & = 233
\end{align}
$$

233 이 문제의 답에 해당되긴 하지만 더 작은 수를 찾아보면 좋을 것 같다.

$$
\begin{align}
x & ≡ 233 (\bmod 105) \\
  & ≡ 128 (\bmod 105) \\
  & ≡ 23 (\bmod 105) \\
\end{align}
$$

따라서 문제의 조건에 들어맞는 가장 작은 자연수는 23 이다.

## 예제 5

>
알려지지 않은 숫자가 있다.
5로 나누면 1이 남고 6으로 나누면 2가 남고 7로 나누면 3이 남는 수는 무엇인가?

예제 4와 똑같이 풀어보자. 다음과 같은 연립 합동식을 생각할 수 있을 것이다.

$$
x ≡ 1 (\bmod 5), \\
x ≡ 2 (\bmod 6), \\
x ≡ 3 (\bmod 7) \\
$$

$$ m = 5 \times 6 \times 7 = 210 $$ 이므로...

$$
\begin{align}
M_1 & = \frac{m}{5} = \frac{210}{5} = 42 \\
M_2 & = \frac{m}{6} = \frac{210}{6} = 35 \\
M_3 & = \frac{m}{7} = \frac{210}{7} = 30 \\
\end{align}
$$

이제 42 modulo 5 의 역 $$ y_1 $$, 35 modulo 6 의 역 $$ y_2 $$, 30 modulo 7 의 역 $$ y_3 $$ 을 구하자.

* $$42 y_1 ≡ 1 \ (\bmod 5)$$ 이므로 $$ y_1 = 3 $$
* $$35 y_2 ≡ 1 \ (\bmod 6)$$ 이므로 $$ y_2 = 5 $$
* $$30 y_3 ≡ 1 \ (\bmod 7)$$ 이므로 $$ y_3 = 4 $$

$$ x ≡ a_1 M_1 y_1 + a_2 M_2 y_2 + a_3 M_3 y_3 $$ 이므로, 값을 대입해 계산해 보면...

$$
\begin{align}
a_1 M_1 y_1 + a_2 M_2 y_2 + a_3 M_3 y_3
    & = 1 \cdot 42 \cdot 3 + 2 \cdot 35 \cdot 5 + 3 \cdot 30 \cdot 4 \\
    & = 126 + 350 + 360 \\
    & = 836
\end{align}
$$

이제 값을 좁혀 나가면 된다.

$$
\begin{align}
x & ≡ 836 (\bmod 210) \\
  & ≡ 206 (\bmod 210) \\
\end{align}
$$

206 은 5 로 나누면 1 이 남고, 6 으로 나누면 2 가 남고, 7 로 나누면 3 이 남는 가장 작은 양의 정수이다.

## 예제 6

> back substitution 방법을 사용하여 $$ x ≡ 1 (\bmod 5), x ≡ 2 (\bmod 6), x ≡ 3 (\bmod 7) $$을 만족하는 모든 $$x$$를 찾아라.

위의 예제 5를 다른 방식으로 풀어보는 문제다.

$$ x ≡ 1 (\bmod 5) $$ 를 $$ x = 5t + 1 $$ 과 같이 표현할 수 있다(단, $$ t $$는 정수).

이를 이용하자.

$$ x = 5t + 1 $$ 를 두 번째 합동식에 대입해보자.

$$
\begin{align}
5t + 1 & ≡ 2 (\bmod 6) \\
5t     & ≡ 1 (\bmod 6) \\
\end{align}
$$

이제 $$t$$ 를 구하자. $$t$$ 는 5 모듈로 6 의 역이다.

$$ \gcd(5, 6) = 1 $$ 이고, $$ 1 = 1 \times 6 - 1 \times 5 $$ 이므로 5 모듈로 6 의 역이 -1 임을 알 수 있다.

t 는 6 을 주기로 순환할 것이므로 $$ 6u - 1 $$ 과 같이 표현할 수 있을텐데, 모듈로 6 에 대해 생각해야 하므로 6을 더해 -1 을 없애주자.

따라서 $$ t = 6u + 5 $$ 이다(단, $$ u $$는 정수).

그렇다면 $$ x $$를 다음과 같이 $$u$$ 로 표현할 수 있다.

$$
\begin{align}
x & = 5t +1  \\
  & = 5(6u + 5) + 1 \\
  & = 30u + 26 \\
\end{align}
$$

이제 이 $$ x $$ 를 세번째 합동식에 대입하자.

$$
\begin{align}
x & ≡ 3 (\bmod 7) \\
30u + 26 & ≡ 3 (\bmod 7)  \\
30u + (3 \times 7 + 5) & ≡ 3 (\bmod 7)  \\
30u + 5 & ≡ 3 (\bmod 7)  \\
30u & ≡ -2 (\bmod 7)  \\
30u & ≡ 5 (\bmod 7)  \\
\end{align}
$$

u 를 조사하기 위해 30 모듈러 7 의 역을 구하자.

$$
\begin{align}
30 & = 4 \times 7 + 2 \\
7  & = 2 \times 3 + 1 \\
\end{align}
$$

$$ \gcd(30, 7) = 1 $$ 이다.

$$
\begin{align}
1 & = 7 - 2 \times 3 \\
  & = 7 - (30 - 4 \times 7) \times 3 \\
  & = 7 - 3 \times 30 + 12 \times 7 \\
  & = -3 \times 30 + 13 \times 7 \\
\end{align}
$$

7 로 나누었을 때 1 이 나머지가 되어야 하므로 모양을 잘 살펴보면 역의 후보는 13 이 아니라 -3 이라는 것을 알 수 있다.

-3 에 7 을 더하면 4 이므로 30 모듈러 7 의 역은 4 이다.

$$
\begin{align}
30u & ≡ 5 (\bmod 7)  \\
4 \times 30u & ≡ 4 \times 5 (\bmod 7)  \\
120 u & ≡ 20 (\bmod 7) \\
u & ≡ 6 (\bmod 7) \\
\end{align}
$$

따라서 $$ u = 7v + 6 $$ 이다(단, $$v$$ 는 정수).

그러므로 $$ x = 30 u + 26 $$

$$
\begin{align}
x & = 30 u + 26  \\
  & = 30 ( 7v + 6 ) + 26 \\
  & = 210 v + 206 \\
\end{align}
$$

세 합동식을 모두 사용해여 만든 $$ x ≡ 206 (\bmod 210) $$ 이다.

즉, $$ x $$ 는 $$ 206, 416, 626, ... $$ 이다.

## 응용: 큰 정수를 컴퓨터로 계산하기

중국인의 나머지 정리를 응용하면 어떤 수 $$a$$를 $$ (a \bmod m_1, a \bmod m_2, ..., a \bmod m_n) $$ 과 같은 방법으로 유일하게 표현할 수 있다.

가령 0 부터 11 까지의 모든 수를 $$\bmod 3$$, $$\bmod 4$$ 를 써서 다음과 같이 유일하게 나타낼 수 있다.

$$
\begin{array}{rll}
0 & = (0 \bmod 3, 0 \bmod 4) & = (0, 0)  \\
1 & = (1 \bmod 3, 1 \bmod 4) & = (1, 1)  \\
2 & = (2 \bmod 3, 2 \bmod 4) & = (2, 2)  \\
3 & = (3 \bmod 3, 3 \bmod 4) & = (0, 3)  \\
4 & = (4 \bmod 3, 4 \bmod 4) & = (1, 0)  \\
5 & = (5 \bmod 3, 5 \bmod 4) & = (2, 1)  \\
6 & = (6 \bmod 3, 6 \bmod 4) & = (0, 2)  \\
7 & = (7 \bmod 3, 7 \bmod 4) & = (1, 3)  \\
8 & = (8 \bmod 3, 8 \bmod 4) & = (2, 0)  \\
9 & = (9 \bmod 3, 9 \bmod 4) & = (0, 1)  \\
10 & = (10 \bmod 3, 10 \bmod 4) & = (1, 2)  \\
11 & = (11 \bmod 3, 11 \bmod 4) & = (2, 3)  \\
\end{array}
$$

* 아주 커다란 정수를 "다른 방식으로" 표현하는 방법의 하나로 고려할 수 있다.
* 큰 정수에 대한 연산이 필요할 때, n 쌍의 각 요소에 해당 연산을 수행하고, 모듈로 $$ m_i $$ 합동식을 풀어서 값을 회복하는 방법으로 결과를 얻을 수 있다.
    * 이 방법은 병렬 처리가 가능하기 때문에 큰 수를 효율적으로 다룰 수 있다.

예를 들어 $$99, 98, 97, 95$$ 를 계수로 사용한다 하자.

그렇다면 $$ m $$ 값은 다음과 같을 것이다.

$$ m = 99 \times 98 \times 97 \times 95 = 89403930 $$

이제 89403930 보다 작은 모든 양의 정수는 $$99,98,97,95$$ 로 표현하는 것이 가능하다.

구체적으로 만약 구하려는 수가 $$x = 123684 + 413456$$ 라면 다음과 같이 계산을 수행할 수 있다.

$$
\begin{align}
(123684 \bmod 99, 123684 \bmod 98, 123684 \bmod 97, 123684 \bmod 95) & = (33, 8, 9, 89) \\
(413456 \bmod 99, 413456 \bmod 98, 413456 \bmod 97, 413456 \bmod 95) & = (32, 92, 42, 16) \\
\end{align}
$$

이제 두 튜플의 합을 구한다.

$$
\begin{array}{l}
(33, 8, 9, 89) + (32, 92, 42, 16) \\
\ = \biggl((33+32) \bmod 99, (8+92) \bmod 98, (9+42) \bmod 97, (89+16) \bmod 95 \biggl) \\
\ = (65 \bmod 99, 100 \bmod 98, 51 \bmod 97, 105 \bmod 95) \\
\ = (65, 2, 51, 10) \\
\end{array}
$$

이제 $$x$$를 다음과 같은 합동식으로 표현할 수 있다.

$$
\begin{array}{rr}
x ≡ & 65 (\bmod 99) \\
x ≡ & 2  (\bmod 98) \\
x ≡ & 51 (\bmod 97) \\
x ≡ & 10 (\bmod 95) \\
\end{array}
$$

$$0 \lt x \lt 98403930$$ 이면서 이 합동식의 해가 되는 $$x$$는 하나 밖에 없다.

책에 이 합동식의 풀이는 안 나왔지만 하는 김에 풀어보자.

다음 식을 풀면 된다.

$$ x ≡ (a_1 M_1 y_1 + a_2 M_2 y_2 + a_3 M_3 y_3 + a_4 M_4 y_4) (\bmod 89403930) $$

일단 $$ a_i $$ 는 이미 나와 있으므로 또 계산할 필요는 없다.

$$
\begin{align}
a_1 & = 65 \\
a_2 & = 2 \\
a_3 & = 51 \\
a_4 & = 10 \\
\end{align}
$$

다음은 $$ M_i, y_i $$ 차례.
계산이 좀 짜증나긴 하지만 큰 수의 연산을 위해
이 $$ 99,98,97,95 $$ 합동식을 사용하는 컴퓨터 시스템이라면
$$ M_i, y_i $$ 와 같은 숫자들은 미리 계산해놓고 상수로 쓰고 있을 것이다.

$$
\begin{align}
M_1 & = \frac{99 \times 98 \times 97 \times 95}{99} = 903070 \\
M_2 & = \frac{99 \times 98 \times 97 \times 95}{98} = 912285 \\
M_3 & = \frac{99 \times 98 \times 97 \times 95}{97} = 921690 \\
M_4 & = \frac{99 \times 98 \times 97 \times 95}{95} = 941094 \\
\end{align}
$$

이제 각 $$ M_i $$ 의 역을 구하면 된다.

$$
\begin{align}
903070 \times y_1 & = 1 (\bmod 99) \\
912285 \times y_2 & = 1 (\bmod 98) \\
921690 \times y_3 & = 1 (\bmod 97) \\
941094 \times y_4 & = 1 (\bmod 95) \\
\end{align}
$$

역은 [예제 4](#예제-4)와 [예제 5](#예제-5)에서 많이 연습했으니 구하는 과정은 생략하자.
(컴퓨터도 처음에 계산해둔 역을 사용할 것이다.)

계산해보면 다음과 같이 나온다.

$$
\begin{align}
y_1 & = 37 \\
y_2 & = 33 \\
y_3 & = 24 \\
y_4 & = 4 \\
\end{align}
$$

따라서 다음과 같은 중간 결과를 얻을 수 있다.

$$
\begin{align}
a_1 M_1 y_1 & = 65 × 903070 × 37 \\
a_2 M_2 y_2 & = 2 × 912285 × 33 \\
a_3 M_3 y_3 & = 51 × 921690 × 24 \\
a_4 M_4 y_4 & = 10 × 941094 × 4
\end{align}
$$

구하고자 하는 $$ x $$ 의 값은 다음과 같으므로

$$ x ≡ (a_1 M_1 y_1 + a_2 M_2 y_2 + a_3 M_3 y_3 + a_4 M_4 y_4) (\bmod 89403930) $$

덧셈으로 연결된 각 $$ a_i M_i y_i $$ 는 병렬로 따로 계산할 수 있을 것이다.

$$
\begin{array}{rrllll}
a_1 M_1 y_1 \bmod 89403930 = & 2171883350 & \bmod 89403930 & = 26189030 \\
a_2 M_2 y_2 \bmod 89403930 = & 60210810   & \bmod 89403930 & = 60210810 \\
a_3 M_3 y_3 \bmod 89403930 = & 1128148560 & \bmod 89403930 & = 55301400 \\
a_4 M_4 y_4 \bmod 89403930 = & 37643760   & \bmod 89403930 & = 37643760 \\
\end{array}
$$

이제 나머지만 구하면 된다.

$$
\begin{align}
x & ≡ 26189030 + 60210810 + 55301400 + 37643760 (\bmod 89403930)  \\
  & ≡ 179345000 (\bmod 89403930)  \\
  & ≡ 537140
\end{align}
$$

따라서 $$x = 123684 + 413456 = 537140$$ 이다.

# 유사난수

**pseudorandom numbers**

알고리즘을 통해 생성된 난수는 진정한 난수라 부르기 어렵다. 따라서 유사난수라 부른다.

## 선형합동방법

**linear congruential method**

선형합동방법은 유사난수를 만들 때 흔히 사용하는 방법이다.

다음과 같은 방법을 따른다.

4개의 정수를 선택한다.

* modulus로서, $$m$$.
* multiplier로서, $$a$$.
* increment로서, $$c$$.
* seed로서, $$x_0$$.

단, 위의 네 정수들은 다음 조건을 만족해야 한다.

$$
2 \le a \lt m \\
0 \le c \lt m \\
0 \le x_0 \lt m \\
$$

그리고 다음 합동식을 사용하면,

$$ x_{n+1} = (ax_n + c) \bmod m $$

$$ x_0 $$으로 $$ x_1 $$ 을구하고 $$ x_1 $$ 로 $$ x_2 $$를 구해낼 수 있다.

이 방법으로 $$ \{ x_0, x_1, ..., x_n  \} $$ 을 구한다.

(단, $$ 0 \le x_i \lt m $$ 이라는 점에 주의한다.)

프로그래밍을 할 때 구하곤 하는 일반적인 난수처럼 0과 1 사이의 값이 필요하면 선형합동방법을 통해 얻은 수를 $$ m $$ 으로 나누면 된다.

### 유사난수 선형합동방법 예제

> 선형합동방법으로 $$m = 9, a = 7, c = 4, x_0 = 3 $$ 을 사용해 유사난수의 수열을 구하라.

일단 합동식에 값을 채워보자. $$ x_{n+1} = (ax_n + c) \bmod m $$ 이므로...

$$ x_{n+1} = (7x_n + 4) \bmod 9 $$

순서대로 계산해 보자.

$$
\begin{array}{rllll}
x_0 & = \color{red}3 \\
x_1 & = (7 \times x_0 + 4) \bmod 9 & = 25 \bmod 9 & = 7 \\
x_2 & = (7 \times x_1 + 4) \bmod 9 & = 53 \bmod 9 & = 8 \\
x_3 & = (7 \times x_2 + 4) \bmod 9 & = 60 \bmod 9 & = 6 \\
x_4 & = (7 \times x_3 + 4) \bmod 9 & = 46 \bmod 9 & = 1 \\
x_5 & = (7 \times x_4 + 4) \bmod 9 & = 11 \bmod 9 & = 2 \\
x_6 & = (7 \times x_5 + 4) \bmod 9 & = 18 \bmod 9 & = 0 \\
x_7 & = (7 \times x_6 + 4) \bmod 9 & = 4 \bmod 9  & = 4 \\
x_8 & = (7 \times x_7 + 4) \bmod 9 & = 32 \bmod 9 & = 5 \\
x_9 & = (7 \times x_8 + 4) \bmod 9 & = 39 \bmod 9 & = \color{red}3 \\
\end{array}
$$

$$ x_9 $$ 에서 $$ x_0 $$ 과 똑같이 나오고, 이후로는 9를 주기로 순환하게 된다.

따라서 유사난수의 수열은 다음과 같다.

$$ \{ \color{red}3,7,8,6,1,2,0,4,5, \color{red}3, 7,8,6,... \} $$

# 검사 숫자

**Check Digits**

* 합동을 사용해 숫자 배열의 오류를 검사할 수 있다.
    * 보통 수열의 마지막에 검사용 숫자를 더하는 방식이다.
    * 검사용 숫자는 알고리즘을 사용해 만들어낸다.

## 패리티 검사 비트

**parity check bits**

* 비트열을 저장하거나 전송하기 전에 패리티 검사 비트 하나를 뒤에 붙이는 방식.
* 패리티 비트는 전체 비트열의 1이 짝수 개가 되도록 조절하는 비트이다.

예를 들어 $$11010110$$을 전송하려면 1이 5개이므로 패리티 비트 1을 붙여서 $$11010110\color{red}1$$ 로 만든 다음 전송한다.

* 전송받은 쪽에서 비트열을 받아봤더니 $$010101101$$ 가 나왔다고 하자.
    * 1의 수를 세어보면 5개이다.
    * $$5 \bmod 2$$는 짝수가 아니므로 잘못 전송되었다는 것을 알 수 있다.

보내는 쪽에서 어떤 수를 보냈는지 전혀 모르는 상태이지만,
항상 1의 수가 짝수가 되도록 패리티 비트를 붙여 보내기로 했으므로 잘못 전송되었다는 것을 알 수 있다.
이제 재전송을 요청하면 된다.

* 이 방식의 문제점: 잘못 전송된 비트가 홀수 개일 때에만 잘못 전송되었다는 사실을 깨달을 수 있다.

# 참고문헌

* Rosen의 이산수학 / Kenneth H. Rosen 저 / 공은배 등저 / 한국맥그로힐(McGraw-Hill KOREA) / 2017년 01월 06일

# 함께 읽기

* [[discrete-math-modular]]{모듈러 연산(나머지 연산)}
* [[gcd]]{최대공약수와 최소공배수}

