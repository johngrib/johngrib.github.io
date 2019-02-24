---
layout  : wiki
title   : 선형합동
summary : Linear Congruences
date    : 2019-02-24 00:13:22 +0900
updated : 2019-02-24 17:01:57 +0900
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



# 참고문헌

* Rosen의 이산수학 / Kenneth H. Rosen 저 / 공은배 등저 / 한국맥그로힐(McGraw-Hill KOREA) / 2017년 01월 06일

# 함께 읽기

* [[discrete-math-modular]]{모듈러 연산(나머지 연산)}
* [[gcd]]{최대공약수와 최소공배수}

