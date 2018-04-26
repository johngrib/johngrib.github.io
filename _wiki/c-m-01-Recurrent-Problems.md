---
layout  : wiki
title   : 구체수학 01. 재귀적인 문제들
summary : 01. Recurrent Problems
date    : 2018-04-26 21:58:11 +0900
updated : 2018-04-26 23:16:47 +0900
tags    : math
toc     : true
public  : true
parent  : study-concrete-math
latex   : true
---
* TOC
{:toc}

# 개요

* 이 문서는 [[CONCRETE-MATH]]책의 1 ~ 6 쪽을 공부하며 메모한 것입니다.

# 하노이의 탑(THE TOWER OF HANOI)

![하노이의 탑](https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Tower_of_Hanoi.jpeg/450px-Tower_of_Hanoi.jpeg)

하노이의 탑 규칙은 [위키백과](https://ko.wikipedia.org/wiki/%ED%95%98%EB%85%B8%EC%9D%B4%EC%9D%98_%ED%83%91 )를 참고.

## 문제를 약간 더 일반화한다

* 원반이 8개인 경우가 아니라 원반이 n 개인 경우를 생각한다.

## 적절한 표기법을 도입한다.

* 이를 **명명정복**(name and conquer)이라 할 수 있을 것이다.

$$ T_n $$ : 원반 n 개를 다른 한 기둥으로 옮기는 데 필요한 최소한의 이동 횟수

* $$ T_0 = 0 $$ &nbsp;
* $$ T_1 = 1 $$ &nbsp;
* $$ T_2 = 3 $$ : 3번 만에 원반 2 개를 다른 한 기둥으로 옮길 수 있다.

## 하노이의 탑 점화식

n 개의 원반이 있다고 하자. 다음 과정을 거치면 하노이의 탑에서 승리할 수 있다.

1. 가장 큰 원반 하나를 제외한 $$n - 1$$ 개의 원반을 다른 기둥으로 옮긴다.
    * 이동 횟수는 $$ T_{n-1} $$.
2. 가장 큰 원반을 나머지 기둥으로 옮긴다.
    * 이동 횟수는 1.
3. $$n - 1$$ 개의 원반을 가장 큰 원반 위로 옮긴다.
    * 이동 횟수는 $$ T_{n-1} $$.

그렇다면 총 이동 횟수는 $$T_{n-1} + T_{n-1} + 1$$ 이므로, 다음과 같은 일반식을 만들 수 있다.

`식 1.1`

$$
\begin{align}
& T_0 = 0; \\
& T_n \ge 2T_{n-1} + 1, \quad for \; n > 0 \\
\end{align}
$$

이와 같이 '**경곗값**(boundary value)'과 등식으로 구성되는 등식들을 다름과 같이 부른다.

* 점화식(recurrence)
* 점화 관계식(recurrence relation)
* 재귀식, 재귀관계식(recursion relation)

## 점화식의 해(solution)

### 작은 n 값들을 살펴보기

점화식의 해를 구하는 가장 좋은 방법은 작은 사례를 구해보는 것이다.

$$
\begin{align}
& T_0 = 0 \\
& T_1 = 1 \\
& T_2 = 3 \\
& T_3 = 2 \times T_2 + 1 = 7 \\
& T_4 = 2 \times T_3 + 1 = 15 \\
& T_5 = 2 \times T_4 + 1 = 31 \\
& T_6 = 2 \times T_5 + 1 = 63 \\
& ... \\
\end{align}
$$

곰곰히 살펴보면 다음과 같은 추측을 할 수 있다.

`식 1.2`

$$ T_n = 2^n - 1, \quad for \; n \ge 0 $$


## 수학적 귀납법(mathematical induction)

수학적 귀납법

* 기초 단계(basis) : $$n_0$$에 대해 명제를 증명한다.
* 귀납 단계(induction) : ($$n_0$$에서 $$n-1$$에 대해 명제가 증명되었다는 가정 하에서) $$n \gt n_0$$에 대해 명제를 증명한다.

### 기초 단계

기초 단계는 쉽게 해결할 수 있다.

$$ T_0 = 2^0 - 1 = 0 $$

### 귀납 단계

`식 1.1`을 사용해 `식 1.2`를 유도해 냄으로써, `식 1.2`가 모든 $$n$$에 대하여 성립함을 보인다.

$$
\begin{align}
T_n & = 2 \times T_{n-1} + 1 \\
    & = 2 \times ( 2^{n-1} - 1) + 1 \\
    & = 2^n - 2 + 1 \\
    & = 2^n - 1 \\
\end{align}
$$

## 점화식의 해를 간단하게 구하기

`식 1.1`의 양 변에 1을 더해보자.

$$
\begin{align}
& T_0 + 1 = 1; \\
& T_n + 1 \ge 2T_{n-1} + 2, \quad for \; n > 0 \\
\end{align}
$$

이 때, $$U_n = T_n + 1$$ 이라 하면 다음과 같이 간단하게 바꿀 수 있다.

$$
\begin{align}
& U_0 = 1; \\
& U_n \ge 2U_{n-1}, \quad for \; n > 0 \\
\end{align}
$$


# 평면의 선들(LINES IN THE PLANE)


# Links

* [[CONCRETE-MATH]]
* [하노이의 탑(wikipedia)](https://ko.wikipedia.org/wiki/%ED%95%98%EB%85%B8%EC%9D%B4%EC%9D%98_%ED%83%91 )
* [점화식](https://ko.wikipedia.org/wiki/%EC%A0%90%ED%99%94%EC%8B%9D )


