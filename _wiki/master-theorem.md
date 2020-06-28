---
layout  : wiki
title   : 마스터 정리 (Master Theorem)
summary : 
date    : 2020-06-28 19:18:22 +0900
updated : 2020-06-28 20:29:21 +0900
tag     : 
toc     : true
public  : true
parent  : [[algorithm]]
latex   : true
---
* TOC
{:toc}

$$
\def\ceil#1{\lceil #1 \rceil}
\def\floor#1{\lfloor #1 \rfloor}
\def\frfr#1{\{ #1 \}}
$$

## From: CLRS - 점화식을 풀기 위한 마스터 방법

> 마스터 방법은 다음과 같은 형식의 점화식을 푸는 기본 지침을 제공한다.
>
> $$ T(n) = aT( n/b ) + f(n)    \tag{4.20} \label{4.20} $$
>
> 여기서 $$a( \ge 1)$$와 $$b( \gt 1)$$는 상수고 $$f(n)$$은 점근적으로 양인 함수다.
마스터 방법을 사용하기 위해서는 세 가지 경우를 암기해야 하지만,
많은 경우에 연필과 종이 없이 점화식의 해를 매우 쉽게 구할 수 있다.
>
점화식 $$\eqref{4.20}$$은 $$a$$와 $$b$$가 양의 상수일 때
문제 크기 $$n$$을 크기가 각각 $$n/b$$인 $$a$$개의 하위 문제로 나누는 알고리즘의 수행 시간을 나타낸다.
$$a$$개의 하위 문제는 각각 $$T(n/b)$$시간에 재귀적으로 풀린다.
문제를 나누고 하위 문제들의 결과를 합치는 데 드는 비용은 함수 $$f(n)$$으로 나타낸다.
예를 들어, 스트라센 알고리즘에서 도출할 수 있는 점화식은 $$a = 2$$, $$b = 2$$며 $$f(n) = Θ(n^2)$$이다.
>
> 기술적인 정확성의 측면에서 보면 이 점화식은 실제로 잘 정의된 것은 아닌데,
이는 $$n/b$$이 정수가 아닐 수도 있기 때문이다.
그러나 각 a에 대한 $$T(n/b)$$항을 $$T( \floor{ n/b } )$$또는 $$T( \ceil{ n/b } )$$으로 바꾸어도
점화식의 점근적 특성에는 영향을 주지 않는다(다음 절에서 이 주장을 증명할 것이다).
따라서 보통은 이런 형식처럼 분할정복 점화식을 쓸 때 내림과 홀림 함수를 생략하는 것이 편리하다는 것을 알 수 있다.
[^clrs-4-5]

### 마스터 정리

> $$a( \ge 1)$$와 $$b( \ge 1)$$가 상수고 $$f(n)$$이 함수라 하고, 음이 아닌 정수에 대해 $$T(n)$$이 다음 점화식에 의해 정의된다고 하자.
>
> $$T(n) = aT(n/b) + f(n)$$
>
> 여기서 $$n/b$$은 $$ \floor{ n/b } $$ 또는 $$ \ceil{ n/b }$$을 뜻하는 것으로 이해한다.
그러면 $$T(n)$$의 점근적 한계는 다음과 같다.
>
> 1. 상수 $$\epsilon ( \gt 0 )$$에 대해 $$f(n) = O(n^{ \log_b a - \epsilon })$$이면, $$T(n) = \Theta(n^{ \log_b a })$$이다.
> 2. $$f(n) = \Theta(n^{ \log_b a })$$이면, $$T(n) = \Theta(n^{ \log_b a \lg n })$$ 이다.
> 3. 상수 $$ \epsilon(\gt 0)$$에 대해 $$f(n) = \Omega(n^{ \log_b a + \epsilon })$$이고 상수 $$c(\lt 1)$$와 충분히 큰 모든 $$n$$에 대해 $$af(n/b) \le cf(n)$$이면, $$T(n) = \Theta(f(n))$$이다.
[^clrs-4-5]


## From: 다양한 예제로 학습하는 데이터 구조와 알고리즘 for Java
### 분할 정복을 위한 마스터 정리

> 분할 정복 알고리즘의 수행 시간을 계산하기 위해 다음의 정리(Theorem)가 사용될 수 있다.
주어진 프로그램(알고리즘)에 대해 먼저 문제의 재귀적 관계를 찾는다.
재귀 관계식이 다음의 형태를 지닌다면 문제를 다 풀지 않고도 바로 해답을 구할 수 있다.
>
> 재귀 관계식이 $$T(n) = aT( { n \over b } ) + \Theta( n^k \log^p n )$$의 형태이며,
$$a \ge 1, b \gt 1, k \ge 0$$ 이며 $$p$$가 실수라면 다음과 같다.
>
- 마스터 정리 1. $$ a \gt b^k$$ 이면 $$ T(n) = \Theta(n^{ \log_b^a })$$
- 마스터 정리 2. $$ a = b^k$$일 경우
    - a. $$p \gt -1$$ 이면 $$ T(n) = \Theta(n^{ \log_b^a } \log^{p+1} n) $$
    - b. $$p = -1$$ 이면   $$ T(n) = \Theta(n^{ \log_b^a } \log \log n) $$
    - c. $$p \lt -1$$ 이면 $$ T(n) = \Theta(n^{ \log_b^a }) $$
- 마스터 정리 3. $$a \lt b^k$$일 경우
    - a. $$p \ge 0$$이면 $$ T(n) = \Theta(n^k \log^p n)$$
    - b. $$p \le 0$$이면 $$ T(n) = O(n^k)$$
[^narasimha-1-22]

### 차감 정복 점화식을 위한 마스터 정리

> 양수 n에 대해 정의된 함수 $$T(n)$$이 어떤 상수 $$c, a \gt 0, b \gt 0, k \ge 0$$과 함수 $$f(n)$$에서 다음과 같은 속성을 갖는다고 하자.
>
$$
T(n) =
\begin{cases}
c              & \text{ if } n \le 1 \\
aT(n-b) + f(n) & \text{ if } n \gt 1 \\
\end{cases}
$$
>
> $$f(n)$$이 $$O(n^k)$$안에 있다면
>
$$
T(n) =
\begin{cases}
O(n^k)                  & \text{ if } a \lt 1 \\
O(n^{k+1})              & \text{ if } a = 1 \\
O(n^k a^{ n \over b })  & \text{ if } a \gt 1 \\
\end{cases}
$$
[^narasimha-1-24]

#### 변형

> $$ 0 \lt \alpha \lt 1$$이며 $$\beta \gt 0 $$인 상수 $$\alpha, \beta$$에 대해 $$T(n) = T(\alpha n) + T(( 1- \alpha )n) + \beta n$$의 해답은 $$O(n \log n)$$이다.
[^narasimha-1-25]

## 함께 읽기

- [[big-O-notation]]

## 참고문헌

- [Master theorem (wikipedia)]( https://en.m.wikipedia.org/wiki/Master_theorem_(analysis_of_algorithms) )
- Introduction to Algorithms 3판 / 토머스 코멘, 찰스 레이서손, 로날드 리베스트, 클리포드 스타인 공저 / 문병로, 심규석, 이충세 공역 / 한빛아카데미 / 2014년 06월 30일
- 다양한 예제로 학습하는 데이터 구조와 알고리즘 for Java / 나라심하 카루만치 저 / 전계도, 전형일 공역 / 인사이트(insight) / 2014년 02월 22일

## 주석

[^clrs-4-5]: Introduction to Algorithms. 4.5장.
[^narasimha-1-22]: 다양한 예제로 학습하는 데이터 구조와 알고리즘 for Java. 1.22장.
[^narasimha-1-24]: 다양한 예제로 학습하는 데이터 구조와 알고리즘 for Java. 1.24장.
[^narasimha-1-25]: 다양한 예제로 학습하는 데이터 구조와 알고리즘 for Java. 1.25장.

