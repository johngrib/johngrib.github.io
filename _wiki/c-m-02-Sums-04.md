---
layout  : wiki
title   : 구체수학 02.합.04.다중합
summary : 02.SUMS.03.MULTIPLE SUMS
date    : 2018-05-13 10:35:14 +0900
updated : 2018-05-19 10:34:45 +0900
tag     : math
toc     : true
public  : true
parent  : study-concrete-math
latex   : true
---
* TOC
{:toc}

이 문서는 [[CONCRETE-MATH]] **2장.합 - 4.다중합**을 공부한 노트입니다.

# 둘 이상의 색인을 사용하기

색인이 여러 개 있어도 합 기호는 하나만 써도 된다.

$$
\begin{align}
\sum_{1 \le j,k \le 3} a_j b_k \\
  = & a_1 b_1 + a_1 b_2 + a_1 b_3 \\
    & + a_2 b_1 + a_2 b_2 + a_2 b_3 \\
    & + a_3 b_1 + a_3 b_2 + a_3 b_3 \\
\end{align}
$$

위의 식을 python으로 표현하면 다음과 같다.

```python
sum = 0
for j in range(1, 3+1):
    for k in range(1, 3+1):
        sum += a[j] * b[k]
```

## 아이버슨의 관례 사용

$$
\sum_{P(j,k)} a_{j,k} = \sum_{j,k} a_{j,k} \cdot [ P(j,k) ]
$$

### 복습: 아이버슨의 관례?

대괄호 안에 있는 내용이 `true`이면 `1`, 아니면 `0`.

* 예
    * `[2는 짝수] = 1`
    * `[2는 홀수] = 0`

# 합 기호를 두 개 사용하는 경우: 합들의 합을 다루는 경우

$$
\sum_{j} \left( \sum_{k} a_{j,k} [P(j,k)] \right)
=
\sum_{j} \sum_{k} a_{j,k} [P(j,k)]
$$

* `2중 for문`과 똑같이 생각하면 된다.
    * 안쪽에서부터 실행된다고 생각하자. 즉, 위에서는 `k`가 `j`보다 먼저다.
* `j`, `k`는 콜렉션이라 생각하면 된다.
    * $$\sum_j$$는 덧셈 루프에 `j`콜렉션을 집어넣은 것이다. 즉 루프를 돌며 `j`의 원소가 하나씩 함수에 입력되고, $$\sum$$은 함수의 출력 결과가 나올 때마다 더한다.
* 주석을 붙이자면 다음과 같다.

$$
\underbrace{
    \sum_{j}
    \overbrace{
        \sum_{k} a_{j,k} [P(j,k)]
    }^{P(j,k)가 참인 모든 정수 k에 대한 모든 a_{j,k} 항의 합}
}_{모든 정수 j에 대한 \sum_{k} a_{j,k} [P(j,k)]들의 합}
$$

## 합산 순서 교환 법칙(interchanging the order of summation)

$$
\begin{align}
\sum_j \sum_k a_{j,k} [P(j,k)]
    & = \sum_{j,k} a_{j,k} \\
    & = \sum_k \sum_j a_{j,k} [P(j,k)] \\
\end{align}
\tag{2.27}\label{2.27}
$$

* 어차피 덧셈이라 순서가 바뀌어도 결과는 달라지지 않는다.
* 따라서 어느 쪽이 계산이 더 쉬울지 고려해서 계산하기 편한 쪽을 고른다.

## 일반 분배법칙(general distributive law)

이번 장 처음에 나온 $$ \sum_{1 \le j,k \le 3} a_j b_k $$ 를 풀어보자.

회색으로 보이는 식은, 이해를 돕기 위해 붙인 것이다.

$$
\begin{align}
\sum_{1 \le j,k \le 3} a_j b_k
    & = \sum_{j,k} a_j b_k [1 \le j,k \le 3] \\
    & \color{gray}{ = a_1 b_1 + a_1 b_2 + a_1 b_3 + a_2 b_1 + a_2 b_2 + a_2 b_3 + a_3 b_1 + a_3 b_2 + a_3 b_3 } \\
    & = \sum_{j,k} a_j b_k [1 \le j \le 3][1 \le k \le 3] \\
    & \color{gray}{ = a_1 b_1 + a_1 b_2 + a_1 b_3 + a_2 b_1 + a_2 b_2 + a_2 b_3 + a_3 b_1 + a_3 b_2 + a_3 b_3 } \\
    & = \sum_j \sum_k a_j b_k [1 \le j \le 3][1 \le k \le 3] \\
    & \color{gray}{ = (a_1 b_1 + a_1 b_2 + a_1 b_3) + (a_2 b_1 + a_2 b_2 + a_2 b_3) + (a_3 b_1 + a_3 b_2 + a_3 b_3) } \\
    & = \sum_j a_j [1 \le j \le 3] \sum_k b_k [1 \le k \le 3] \\
    & \color{gray}{ = a_1(b_1 + b_2 + b_3) + a_2(b_1 + b_2 + b_3) + a_3(b_1 + b_2 + b_3) } \\
    & = \sum_j a_j [1 \le j \le 3] \left( \sum_k b_k [1 \le k \le 3] \right) \\
    & \color{gray}{ = a_1(b_1 + b_2 + b_3) + a_2(b_1 + b_2 + b_3) + a_3(b_1 + b_2 + b_3) } \\
    & = \left( \sum_j a_j [1 \le j \le 3] \right) \left( \sum_k b_k [1 \le k \le 3] \right) \\
    & \color{gray}{ = (a_1 + a_2 + a_3)(b_1 + b_2 + b_3) } \\
    & = \left( \sum_{j=1}^3 a_j \right) \left( \sum_{k=1}^3 b_k \right)\\
    & \color{gray}{ = (a_1 + a_2 + a_3)(b_1 + b_2 + b_3) } \\
\end{align}
$$

위의 과정을 통해 "색인 J, K의 모든 집합에 대해 성립하는" **일반 분배법칙**을 유도할 수 있다.

$$
\sum_{ j \in J \\ k \in K } a_j b_k = \left( \sum_{j \in J} a_j \right)\left( \sum_{k \in K} b_k\right)
\tag{2.28}\label{2.28}
$$

## 합산 순서 교환 기본 법칙의 변형들

크게 두 가지 버전이 있다.

### vanilla version

* $$\eqref{2.27}$$과 똑같은 원리.
* `j`, `k`의 limit가 독립적일 때 사용.

$$
\begin{align}
\sum_{j \in J} \sum_{k \in K} a_{j,k}
    & = \sum_{j \in J \\ k \in K} a_{j,k} \\
    & = \sum_\color{red}{k \in K} \sum_\color{red}{j \in J} a_{j,k}
\end{align}
\tag{2.29}\label{2.29}
$$

### rocky road version

* 안쪽 합의 범위가 바깥쪽 합의 색인 변수에 의존적인 경우에 사용.

$$
\sum_{j \in J} \sum_{k \in K(j)} a_{j,k} = \sum_\color{red}{k \in K'} \sum_\color{red}{j \in J'(k)} a_{j,k} \\
\text{단, 다음 조건을 만족해야 한다.} \\
[j \in J][k \in K(j)] = [k \in K'][j \in J'(k)]
\tag{2.30}\label{2.30}
$$

* 조건식을 좀 더 자세히 살펴보자.
    * 좌변을 **인수분해**(factorization)하여 우변을 얻은 것이라고 책에서는 표현한다.

$$
[j \in J][k \in K(j)] = [k \in K'][j \in J'(k)]
$$

## 유용한 인수분해

$$
\begin{align}
[1 \le j \le n][j \le k \le n]
    & = [1 \le j \le k \le n] \\
    & = [1 \le k \le n][1 \le j \le k]
\end{align}
$$

## 아이버슨식 공식을 사용한 변환식

위의 공식을 활용하면 다음이 가능하다.

$$
\begin{align}
\sum_{j = 1}^n \sum_{k = j}^n a_{j,k}
    & = \sum_{1 \le j \le k n} a_{j,k} \\
    & = \sum_\color{red}{k=1}^n \sum_\color{red}{j=1}^\color{red}k a_{j,k} \\
\end{align}
$$

아무래도 좌변보다 우변이 사용하기 쉬워 보인다.

### 응용: 상삼각 배열의 합을 단순한 단일합으로 표현하기

다음 식을 단순하게 정리하고 싶다고 하자.

$$
\sum_{1 \le j \le k \le n} a_j a_k
$$

식만 갖고는 생각하기 어려우니까 단순하게 다음과 같은 배열이 있다고 상상해 보자.

위의 식은 아래 배열의 파란색 항목(대각선)과 빨간색 항목의 합이라 할 수 있다.

$$
\begin{bmatrix}
\color{blue}{a_1 a_1}
    & \color{red}{a_1 a_2}
    & \color{red}{a_1 a_3}
    & \color{red}\cdots
    & \color{red}{a_1 a_n}
\\
a_2 a_1
    & \color{blue}{a_2 a_2}
    & \color{red}{a_2 a_3}
    & \color{red}{\cdots}
    & \color{red}{a_2 a_n}
\\
a_3 a_1
    & a_3 a_2
    & \color{blue}{a_3 a_3}
    & \color{red}{\cdots}
    & \color{red}{a_3 a_n}
\\
\vdots
    & \vdots
    & \vdots
    & \color{blue}{\ddots}
    & \color{red}{\vdots}
\\
a_n a_1
    & a_n a_2
    & a_n a_3
    & \cdots
    & \color{blue}{a_n a_n}
\\
\end{bmatrix}
$$

삼각형 모양이니까... 이를 다음과 같이 축약하여 표현할 수 있을 것이다.

$$
S_\unicode{0x25F9} = \sum_{1 \le j \le k \le n} a_j a_k
$$

$$
\begin{bmatrix}
\color{blue}{a_1 a_1}
    & \color{red}{a_1 a_2}
    & \color{red}{a_1 a_3}
    & \color{red}\cdots
    & \color{red}{a_1 a_n}
\\
    & \color{blue}{a_2 a_2}
    & \color{red}{a_2 a_3}
    & \color{red}{\cdots}
    & \color{red}{a_2 a_n}
\\
    &
    & \color{blue}{a_3 a_3}
    & \color{red}{\cdots}
    & \color{red}{a_3 a_n}
\\
    &
    &
    & \color{blue}{\ddots}
    & \color{red}{\vdots}
\\
    &
    &
    &
    & \color{blue}{a_n a_n}
\\
\end{bmatrix}
$$

**즉, 우리의 목표는 $$S_\unicode{0x25F9}$$을 단순하게 정리하는 것이다.**

한편, 파란색 항목과 까만색 항목의 합은 다음과 같이 표현할 수 있을 것이다.

$$
S_\unicode{0x25FA} = \sum_{1 \le k \le j \le n} a_j a_k
$$

$$
\begin{bmatrix}
\color{blue}{a_1 a_1}
    &
    &
    &
    &
\\
a_2 a_1
    & \color{blue}{a_2 a_2}
    &
    &
    &
\\
a_3 a_1
    & a_3 a_2
    & \color{blue}{a_3 a_3}
    &
    &
\\
\vdots
    & \vdots
    & \vdots
    & \color{blue}{\ddots}
    &
\\
a_n a_1
    & a_n a_2
    & a_n a_3
    & \cdots
    & \color{blue}{a_n a_n}
\\
\end{bmatrix}
$$

곰곰히 살펴보면 $$S_\unicode{0x25F9} = S_\unicode{0x25FA}$$ 라는 것을 알 수 있다!

($$a_1 \cdot a_2 = a_2 \cdot a_1 $$ 이기 때문)

이 아이디어를 식으로 표현하면 다음과 같다.

$$
\begin{align}
S_\unicode{0x25F9}
    & = \sum_{1 \le j \le k \le n} a_j a_k \\
    & = \sum_{1 \le k \le j \le n} a_k a_j \\
    & = \sum_{1 \le k \le j \le n} a_j a_k \\
    & = S_\unicode{0x25FA} \\
\end{align}
$$

덧붙여, 다음 사실도 알 수 있다.

$$
\begin{array}{cccc}
[1 \le j \le k \le n] & + & [1 \le k \le j \le n]
& = &
[1 \le j,k \le n] & + & [1 \le j = k \le n]
\\
가 & & 나 & & 다 & & 라 \\
\end{array}
$$

어려운 식 같지만 하나씩 살펴보면 이해할 수 있다.

* 가. $$ [1 \le j \le k \le n] $$ 은 다음을 말한다.

$$
\begin{bmatrix}
a_1 a_1
    & a_1 a_2
    & a_1 a_3
    & \cdots
    & a_1 a_n
\\
    & a_2 a_2
    & a_2 a_3
    & \cdots
    & a_2 a_n
\\
    &
    & a_3 a_3
    & \cdots
    & a_3 a_n
\\
    &
    &
    & \ddots
    & \vdots
\\
    &
    &
    &
    & a_n a_n
\\
\end{bmatrix}
$$

* 나. $$ [1 \le k \le j \le n] $$ 은 다음을 말한다.

$$
\begin{bmatrix}
a_1 a_1
    &
    &
    &
    &
\\
a_2 a_1
    & a_2 a_2
    &
    &
    &
\\
a_3 a_1
    & a_3 a_2
    & a_3 a_3
    &
    &
\\
\vdots
    & \vdots
    & \vdots
    & \ddots
    &
\\
a_n a_1
    & a_n a_2
    & a_n a_3
    & \cdots
    & a_n a_n
\\
\end{bmatrix}
$$

* 다. $$[1 \le j,k \le n]$$는 다음을 말한다.

$$
\begin{bmatrix}
a_1 a_1
    & a_1 a_2
    & a_1 a_3
    & \cdots
    & a_1 a_n
\\
a_2 a_1
    & a_2 a_2
    & a_2 a_3
    & \cdots
    & a_2 a_n
\\
a_3 a_1
    & a_3 a_2
    & a_3 a_3
    & \cdots
    & a_3 a_n
\\
\vdots
    & \vdots
    & \vdots
    & \ddots
    & \vdots
\\
a_n a_1
    & a_n a_2
    & a_n a_3
    & \cdots
    & a_n a_n
\\
\end{bmatrix}
$$

* 라. $$ [1 \le j = k \le n] $$ 는 다음을 말한다.

$$
\begin{bmatrix}
a_1 a_1 & & & & \\
& a_2 a_2 & & & \\
& & a_3 a_3 & & \\
& & & \ddots & \\
& & & & a_n a_n \\
\end{bmatrix}
$$

* `가 + 나 = 다 + 라`임을 어렵지 않게 알 수 있다.

아무튼, 이를 통해 다음을 유도할 수 있다.

$$
\begin{align}
2S_\unicode{0x25F9}
    & = S_\unicode{0x25F9} + S_\unicode{0x25FA} \\
    & \color{gray}{= \text{오른쪽 위 삼각형} + \text{왼쪽 아래 삼각형} }\\
    & = \sum_{1 \le j,k \le n} a_j a_k + \sum_{1 \le j = k \le n} a_j a_k \\
    & \color{gray}{= \text{전체} + \text{대각선} }\\
    & = \left( \sum_{j=1}^n a_j \right) \left( \sum_{k=1}^n a_k \right) + \sum_{1 \le j = k \le n} a_j a_k \\
    & = \left( \sum_{k=1}^n a_k \right)^2 + \sum_{1 \le j = k \le n} a_j a_k \\
    & = \left( \sum_{k=1}^n a_k \right)^2 + \sum_{k=1}^n (a_k)^2 \\
\\
\therefore
S_\unicode{0x25F9}
    & = \frac{1}{2} \left( \left( \sum_{k=1}^n a_k \right)^2 + \sum_{k=1}^n (a_k)^2 \right) \\
\end{align}
$$


### 응용: 또 다른 형태의 이중합을 정리하기

$$
S = \sum_{1 \le j \lt k \le n} (a_k - a_j)(b_k - b_j)
$$

이번에는 위의 식을 정리해 보자.

* 책을 보면 "`j`와 `k`의 교환에 대칭성이 존재한다."고 한다.
    * `j`와 `k`를 서로 바꾸어도 똑같다는 말이다.

$$
\begin{align}
S   & = \sum_{1 \le j \lt k \le n} (a_k - a_j)(b_k - b_j) \\
    & = \sum_{1 \le k \lt j \le n} (a_j - a_k)(b_j - b_k) \\
    & = \sum_{1 \le k \lt j \le n} (a_k - a_j)(b_k - b_j) \\
\end{align}
$$

이를 다음과 같이 `2S = ...`의 형태로 정리할 수 있는데,

$$
\begin{align}
2S
    & = \sum_{1 \le j,k \le n} (a_j - a_k)(b_j - b_k)
        - \sum_{1 \le j = k \le n} (a_j - a_k)(b_j - b_k) \\
\end{align}
$$

그 이유는 다음과 같다.

$$
\begin{array}{ccccccc}
[1 \le j \lt k \le n] & + & [1 \le k \lt j \le n]
& = & [1 \le j,k \le n] & - & [1 \le j = k \le n]
\\
{ 오른쪽 위 삼각형 \\ (대각선 제외) } & + & { 왼쪽 아래 삼각형 \\ (대각선 제외) }
& = & 전체 & - & 대각선
\end{array}
$$

이제 계속 정리해 보자.

$$
\begin{align}
2S  & = \sum_{1 \le j,k \le n} (a_j - a_k)(b_j - b_k)
        - \sum_{1 \le j = k \le n} (a_j - a_k)(b_j - b_k) \\
    & = \sum_{1 \le j,k \le n} (a_j - a_k)(b_j - b_k) - 0 \\
    & \color{gray}{ \qquad \because
        \text{두번째 합의 조건이 } j=k \text{ 이므로, } a_j - a_k = 0, \, b_j - b_k = 0
    }\\
    & = \sum_{1 \le j,k \le n} (a_j - a_k)(b_j - b_k) \\
    & \qquad \color{gray}{\text{괄호를 전개하면}} \\
    & =
        \sum_{1 \le j,k \le n} a_j b_j
      - \sum_{1 \le j,k \le n} a_j b_k
      - \sum_{1 \le j,k \le n} a_k b_j
      + \sum_{1 \le j,k \le n} a_k b_k \\
    & =
    \left(
        \sum_{1 \le j,k \le n} a_j b_j
      + \sum_{1 \le j,k \le n} a_k b_k
    \right)
    -
    \left(
        \sum_{1 \le j,k \le n} a_j b_k
      + \sum_{1 \le j,k \le n} a_k b_j
    \right) \\ \\
    & = 2 \sum_{1 \le j,k \le n} a_k b_k - 2 \sum_{1 \le j,k \le n} a_j b_k \\
    & = 2 \left( \sum_{1 \le k \le n} \sum_{1 \le j \le n} a_k b_k \right)
        - 2 \sum_{1 \le j,k \le n} a_j b_k \\
    & = 2 \left( \sum_{1 \le k \le n} a_k b_k \sum_{1 \le j \le n} 1 \right)
        - 2 \sum_{1 \le j,k \le n} a_j b_k \\
    & = 2 \left( \sum_{1 \le k \le n} a_k b_k n \right)
        - 2 \sum_{1 \le j,k \le n} a_j b_k \\
    & = 2n \left( \sum_{1 \le k \le n} a_k b_k \right)
        - 2 \sum_{1 \le j,k \le n} a_j b_k \\
    & = 2n \left( \sum_{1 \le k \le n} a_k b_k \right)
        - 2 \left( \sum_{k=1}^n a_k \right) \left( \sum_{k=1}^n b_k \right) \\
    & \color{gray}{\text{양 변을 2로 나누자}} \\
S   & = n \left( \sum_{1 \le k \le n} a_k b_k \right)
        - \left( \sum_{k=1}^n a_k \right) \left( \sum_{k=1}^n b_k \right) \\
\sum_{1 \le j \lt k \le n} (a_k - a_j)(b_k - b_j)
    & = n \left( \sum_{1 \le k \le n} a_k b_k \right)
        - \left( \sum_{k=1}^n a_k \right) \left( \sum_{k=1}^n b_k \right) \\
\left( \sum_{k=1}^n a_k \right) \left( \sum_{k=1}^n b_k \right)
    & = n \left( \sum_{1 \le k \le n} a_k b_k \right)
        - \sum_{1 \le j \lt k \le n} (a_k - a_j)(b_k - b_j) \\
    & = n \sum_{k=1}^n a_k b_k
        - \sum_{1 \le j \lt k \le n} (a_k - a_j)(b_k - b_j) \\
\\
\end{align}
$$

이를 통해 다음 항등식을 얻어내었다.

$$
\left( \sum_{k=1}^n a_k \right) \left( \sum_{k=1}^n b_k \right)
    = n \sum_{k=1}^n a_k b_k
        - \sum_{1 \le j \lt k \le n} (a_k - a_j)(b_k - b_j) \\
$$

#### 체비쇼프 단조 부등식(Chebyshev's monotonic inequalities)

체비쇼프 단조 부등식은 위에서 얻어낸 항등식의 사례 중 하나이다.

$$
\begin{align}
\left( \sum_{k=1}^n a_k \sum_{k=1}^n b_k \right)
    & \le n \sum_{k=1}^n a_k b_k,
    \quad if \; a_1 \le \cdots \le a_n \; and \; b_1 \le \cdots \le b_n; \\
\left( \sum_{k=1}^n a_k \sum_{k=1}^n b_k \right)
    & \ge n \sum_{k=1}^n a_k b_k,
    \quad if \; a_1 \le \cdots \le a_n \; and \; b_1 \ge \cdots \ge b_n; \\
\end{align}
$$


## 교환법칙?

다중합과 단일합의 일반적인 합산 색인 변경 연산 사이의 관계를 살펴본다.

$$ \sum_{k \in K} a_k = \sum_{p(k) \in K} a_{p(k)} $$

* $$k \in K$$ : `K`는 정수의 집합이다. `k`는 정수 집합 `K`의 원소이므로 정수이다.
* 함수 `p(k)`의 리턴 타입이 정수이고, 모든 리턴 값이 `K`의 원소라면 위와 같이 `k`를 `p(k)`로 바꿔칠 수 있다.

여기에서, 색인 변수 `k`를 `f(j)`로 대체해보자.

* `f`는 정수 $$j \in J$$ 를 정수 $$ f(j) \in K $$로 대응시키는 함수이다.
    * 정수 배열 `J`의 원소인 `j`를 입력했을 때, 정수 배열 `K`의 원소가 나오는 함수 `f`를 말하는 것이다.

그러면 다음과 같이 된다.

$$
\begin{align}
\sum_{j \in J} a_{f(j)}
    & = \sum_{ j \in J \\ k \in K } a_k [f(j) = k] \\
    & = \sum_{k \in K} a_k \sum_{j \in J} [f(j) = k] \\
    & = \sum_{k \in K} a_k \#f^-(k) \\
\tag{2.35}\label{2.35}
\end{align}
$$

* 이때, $$\#f^-(k)$$는 집합 $$ f^-(k) $$의 원소의 갯수이다.
* $$f^-(k)$$는 $$f(k)$$의 역함수이다.
    * 즉, $$f^-(k)$$는 $$f(j) = k$$를 뒤집은 것이다.

만약 `f`가 `J`와 `K`를 일대일 대응시킨다면 $$\#f^-(k)$$의 값은 언제나 1이 된다.

그렇다면 $$\eqref{2.35}$$는 다음과 같이 정리할 수 있다.

$$
\sum_{j \in J} a_{f(j)} = \sum_{f(j) \in K} a_{f(j)} = \sum_{k \in K} a_k
$$

이는 교환 법칙과 똑같다.

## 구체적인 다중합의 예

$$ S_n = \sum_{1 \le j \lt k \le n} \frac{1}{k - j} $$

작은 값부터 생각해 보자.

$$
S_1 = \sum_{1 \le j \lt k \le 1} \frac{1}{k - j} = 0 \\
$$

* $$1 \le j \lt k \le 1$$ 이므로, $$j = k = 1$$ 이어야 한다.
* 그러나 $$ k - j $$ 가 분모에 있으므로 이 합은 더할 항이 하나도 없다.
    * 따라서 `0` 이다.

$$
\begin{align}
S_2 & = \sum_{1 \le j \lt k \le 2} \frac{1}{k - j} \\
    & = \sum_{j = 1 \\ k = 2} \frac{1}{k - j} \\
    & = \frac{1}{2 - 1} \\
    & = 1 \\
\end{align}
$$

* $$1 \le j \lt k \le 2$$ 를 만족시키는 `j`, `k`는 `j = 1`, `k = 2` 밖에 없다.
    * 따라서 `1` 이다.

$$
\begin{align}
S_3 & = \sum_{1 \le j \lt k \le 3} \frac{1}{k - j} \\
    & = \frac{1}{2-1} + \frac{1}{3-1} + \frac{1}{3-2} \\
    & = 1 + \frac{1}{2} + 1 \\
    & = \frac{5}{2} \\
\end{align}
$$

* $$1 \le j \lt k \le 3$$ 를 만족시키는 `(j, k)`는 `(1,2)`,`(1,3)`,`(2,3)` 밖에 없다.
    * 따라서 결과는 `5/2`.

이제 이 식을 정리해 보자.

$$
\begin{align}
S_n & = \sum_{1 \le j \lt k \le n} \frac{1}{k - j} \\
    & = \sum_{1 \le k \le n} \sum_{1 \le j \lt k} \frac{1}{k-j} \\
    & \color{gray}{\text{안쪽 루프를 j에 대한 것으로 정리}} \\
    & = \sum_{1 \le k \le n} \sum_{1 \le k-j \lt k} \frac{1}{j} \\
    & \color{gray}{\text{j를 k - j 로 교체}} \\
    & = \sum_{1 \le k \le n} \; \sum_{1-k \le -j \lt k-k} \frac{1}{j} \\
    & = \sum_{1 \le k \le n} \; \sum_{0 \lt j \lt k-1} \frac{1}{j} \\
    & \color{gray}{\text{안쪽 루프 인덱스를 j 위주로 정리}} \\
    & = \sum_{1 \le k \le n} H_{k-1} \\
    & \color{gray}{\text{조화수이므로 } H_{k-1} \text{ 로 교체}} \\
    & = \sum_{1 \le k+1 \le n} H_{k} \\
    & = \sum_{0 \le k \lt n} H_{k} \\
\end{align}
$$

모양이 꽤 단순해졌지만, 아직 우리는 조화수의 합을 구하는 식을 모른다.

그래서 다른 방법으로 풀어야 한다.

$$
\begin{align}
S_n & = \sum_{1 \le j \lt k \le n} \frac{1}{k - j} \\
    & = \sum_{1 \le j \lt k+j \le n} \frac{1}{k + j - j} \\
    & \color{gray}{\text{k를 k + j 로 치환}} \\
    & = \sum_{1 \le j \lt k+j \le n} \frac{1}{k} \\
    & = \sum_{1 \le k \le n} \; \sum_{1 \le j \le n-k} \frac{1}{k} \\
    & \color{gray}{\text{안쪽 루프를 j에 대한 것으로 정리}} \\
    & = \sum_{1 \le k \le n} \; \sum_{1 \le j \le n-k} (\frac{1}{k} + 0 \cdot j) \\
    & = \sum_{1 \le k \le n} (n-k) \cdot \frac{1}{k} \\
    & \color{gray}{1 \le j \le n-k \text{를 만족시키는 j는 } n-k \text{개.}} \\
    & = \sum_{1 \le k \le n} \left( \frac{n}{k} - \frac{k}{k} \right) \\
    & = \sum_{1 \le k \le n} \left( \frac{n}{k} - 1 \right) \\
    & = \sum_{1 \le k \le n} \frac{n}{k} - \sum_{1 \le k \le n} 1 \\
    & = n \left( \sum_{1 \le k \le n} \frac{1}{k} \right) - n \\
    & = n H_n - n \\
    & \color{gray}{\text{조화수이므로 } H_{n} \text{ 으로 교체}} \\
\end{align}
$$

$$
\begin{array}{crccc}
\therefore & S_n & = n H_n - n \\
\therefore & \sum_{0 \le k \lt n} H_{k} & = n H_n - n \\
\end{array}
\\
\color{gray}{\text{앞에서 먼저 구한 식을 활용}} \\
$$


# Links

* [[CONCRETE-MATH]]
