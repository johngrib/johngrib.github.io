---
layout  : wiki
title   : 선형합동
summary : Linear Congruences
date    : 2019-02-24 00:13:22 +0900
updated : 2019-02-27 22:26:04 +0900
tags    : math
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

그러므로 $$ x ≡ a_1 M_1 y_1 + a_2 M_2 y_2 + a_3 M_3 y_3 $$ 이고, 값을 대입해 계산해 보면...

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


# 참고문헌

* Rosen의 이산수학 / Kenneth H. Rosen 저 / 공은배 등저 / 한국맥그로힐(McGraw-Hill KOREA) / 2017년 01월 06일

# 함께 읽기

* [[discrete-math-modular]]{모듈러 연산(나머지 연산)}
* [[gcd]]{최대공약수와 최소공배수}

