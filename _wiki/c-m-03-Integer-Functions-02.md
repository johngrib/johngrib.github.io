---
layout  : wiki
title   : 구체수학 03.정수 함수.02.바닥 천장 함수의 응용
summary : 03.Integer Functions.01.FLOOR/CEILING APPLICATIONS
date    : 2018-06-03 14:17:27 +0900
updated : 2018-06-06 23:14:19 +0900
tags    : math
toc     : true
public  : true
parent  : study-concrete-math
latex   : true
---

$$
\def\ceil#1{\lceil #1 \rceil}
\def\floor#1{\lfloor #1 \rfloor}
\def\frfr#1{\{ #1 \}}
$$

* TOC
{:toc}

이 문서는 [[CONCRETE-MATH]] **3장.정수 함수 - 2.바닥 천장 함수의 응용**을 공부한 노트입니다.


# 문제를 풀며 시작

## $$\ceil{\lg 35}$$의 값은?

* 참고: 기수 2 로그를 `lg`로 표기한다.
    * 예: $$\log_2 42 = \lg 42$$

$$
2^5 \lt 35 \le 2^6 \ \text{이므로 기수가 2 인 로그를 취하면} \\
\log_2 2^5 \lt \log_2 35 \le \log_2 2^6 \\
5 \lt \lg 35 \le 6 \\
\\
\therefore \ceil{\lg 35} = 6
$$

당연한 말이지만 컴퓨터를 사용하면 매우 쉽게 알아낼 수 있다.

```python
import math
math.ceil(math.log2(35))
```

## 비트 수 알아내기

위의 문제를 풀었으므로 다음의 두 사실을 알고 있다.

$$
\begin{align}
\ceil{lg 35} & = 6 \\
35 & = (100011)_2 \\
\end{align}
$$

* 2진수로 표현할 때
    * 2 개의 비트가 필요한 수는 `2`, `3` 이다.
    * 3 개의 비트가 필요한 수는 `4`, `5`, `6`, `7` 이다.

곰곰히 생각해 보면 다음을 알 수 있다.

숫자 `n`을 이진수로 표현할 때 필요한 비트의 수를 `m`이라 하면 다음을 만족시킨다.

$$
2^{m-1} \le n \lt 2^m
$$

이 식에 $$\lg$$를 적용해 보자.

$$
\begin{align}
\lg 2^{m-1} & \le \lg n \lt \lg 2^m \\
m - 1       & \le \lg n \lt m \\
\\
& \text{m-1 과 m 의 차이가 1 이므로} \\
& 0 \le \lg n \lt 1 이다. \\
& \therefore m-1 = \floor{\lg n} \\
\\
\therefore m & = \floor{\lg n} + 1 \\
\end{align}
$$

따라서 숫자 `n`을 이진수로 표현하려면 $$\floor{\lg n} + 1$$개의 비트가 필요하다.

다만 이 식의 경우 `n = 0`인 경우를 설명할 수 없으므로, 다음과 같이 생각할 수 있다.

$$
2^{m-1} \lt n + 1 \le 2^{m}
$$

$$
\begin{align}
\lg 2^{m-1} & \lt \lg (n+1) \le \lg 2^{m} \\
m-1 & \lt \lg (n+1) \le m \\
\\
& \text{m-1 과 m 의 차이가 1 이므로} \\
& 0 \lt \lg (n+1) \le 1 이다. \\
\\
\therefore m & = \ceil{\lg (n+1)} \\
\end{align}
$$

이렇게 되면 `n = 0`일 때에는 `m = 0`이 나오게 된다.

이제 특정 숫자의 비트 수를 수학적으로 리턴하는 함수를 작성할 수 있겠다.
(비트 카운트는 빌트인 함수가 훨씬 빠를 테니 이 함수를 실제로 사용할 생각은 하지 말자)

```python
import math

def bit_count(n):
    return math.ceil(math.log2(n+1))
```

여흥으로, 다음과 같이 소박하게 일부 숫자를 검증할 수 있겠다. `bit_count`함수를 $$2^{16} - 1= 65535$$까지 검증한다.

```python
for i in range(2**16):
    if bit_count(i) != i.bit_length():
        print('Error', i, bit_count(i), i.bit_length())

print('end')
```

## $$\floor{\sqrt{\floor x}} = \floor{\sqrt x}, \; real \; x \ge 0$$를 증명하라

$$\biggr\lfloor \sqrt{\floor x} \biggr\rfloor = \floor{\sqrt x}, \; real \; x \ge 0$$

* `real`은 `실수`를 의미한다
* 즉, 문제 조건의 `x`는 **0 이상의 실수**이다.

일단 다음과 같이 정의하자.

$$
m = \biggr\lfloor \sqrt{ \floor x } \biggr\rfloor
$$

그렇다면 $$\sqrt{\floor x}$$의 범위는 다음과 같을 것이다.

$$
m \le \sqrt{\floor x} \lt m + 1
$$

세 항이 모두 음수가 아니므로, 전체를 제곱해도 부등호는 변화가 없을 것이다.

$$
m^2 \le \floor x \lt (m + 1)^2
$$

여기에서 두 가지 부등식을 끌어낼 수 있다.

$$
\begin{align}
m^2 & \le x \\
    & \color{gray}{ \because n \le x \iff n \le \floor x } \\
x   & \lt (m+1)^2 \\
    & \color{gray}{ \because x \lt n \iff \floor x \lt n } \\
\end{align}
$$

이제 둘을 종합하면 다음을 얻을 수 있다.

$$
m^2 \le x \lt (m + 1)^2
$$

세 항에 모두 제곱근을 취하자.

$$
\begin{align}
m & \le \sqrt x \lt m + 1 \\
m & = \floor{\sqrt x} \\
& \color{gray}{ \because \floor x = n \iff n \le x \lt n + 1 } \\
\therefore
m   & = \biggr\lfloor \sqrt{ \floor x } \biggr\rfloor = \floor{\sqrt x} \\
\end{align}
$$

## $$\ceil{\sqrt{\ceil x}} = \ceil{\sqrt x}, \; real \; x \ge 0$$을 증명하라

바로 윗 절과 비슷한 방법으로 증명이 가능하다.

일단 다음을 정의한다.

$$
m = \biggr\lceil \sqrt{ \ceil x } \biggr\rceil
$$

그렇다면 $$\sqrt{\ceil x}$$의 범위는 다음과 같을 것이다.

$$
m - 1 \lt \sqrt{\ceil x} \le m
$$

역시 세 항이 모두 음수가 아니므로, 제곱하자.

$$
(m - 1)^2 \lt \ceil x \le m^2
$$

그리고 두 부등식을 이끌어내어, 종합하자.

$$
\begin{align}
x   & \le m^2 \\
    & \color{gray}{ \because x \le n \iff \ceil x \le n } \\
(m-1)^2 & \lt x \\
    & \color{gray}{ \because n \lt x \iff n \lt \ceil x } \\
\therefore (m-1)^2 & \lt x \le m^2 \\
\end{align}
$$

이제 제곱근을 취한다.

$$
\begin{align}
(m-1) & \lt \sqrt x \le m \\
m   & = \ceil{\sqrt x} \\
    & \color{gray}{ \because \ceil x = n \iff n -1 \lt x \le n } \\
\therefore
m   & = \biggr\lceil \sqrt{ \ceil x } \biggr\rceil = \ceil{\sqrt x} \\
\end{align}
$$

## 일반화

위에서 푼 문제를 일반화해보자.

* `f(x)`가 `어떤 실수 구간에 대한 임의의 연속 단조증가 함수`이며, 다음을 만족한다고 하자.

$$
\begin{array}{rcl}
f(x) = \text{integer} \quad & \Rightarrow & x = \text{integer} \\
\end{array}
$$

그렇다면, 위의 조건을 만족하는 함수 `f(x)`에 대해 다음의 두 식이 항상 성립한다.

$$
\floor{f(x)} = \floor{f( \floor x )} \\
\ceil{f(x)} = \ceil{ f( \ceil x ) }
$$

### 무슨 뜻인지 이해해보자 : 조건

$$
\begin{array}{rcl}
f(x) = \text{integer} \quad & \Rightarrow & x = \text{integer} \\
\text{함수 f의 리턴값 f(x)가 integer} & 이면 & \text{입력값 x는 integer 이다.}
\end{array}
$$

* 리턴값 `f(x)`가 integer 라면, 입력값 `x`는 integer 라는 것을 알 수 있다는 말이다.
* 그러나 위의 명제의 역은 참이 아닐 수 있음을 기억해 두어야 할 것 같다.
    * (입력값 `x`가 integer 라고 해서 리턴값이 무조건 integer 라고 할 수는 없다.)

예를 들어 다음은 이러한 조건에 맞는 함수의 예라고 할 수 있겠다.

```python
def f(x):
    return x / 2
```

* 리턴값이 integer라면, 입력값 `x`는 짝수일 것이므로 반드시 integer 일 수 밖에 없다.
* 그러나 입력값이 integer라고 해도, 리턴값이 integer가 아닌 경우도 있다.
    * `f(3)`의 값은 `1.5`이기 때문이다.

### 무슨 뜻인지 이해해보자 : 어떤 실수 구간에 대한...

그리고 "어떤 실수 구간에 대한 임의의 연속 단조증가 함수" 에 대해서는 다음과 같이 이해하였다.

* `실수 구간에 대한` : 함수 `f`에 넣어줄 인자 `x`와 리턴값 `f(x)`가 실수라는 말이다.
* `연속` : 그래프를 그렸을 때 선이 끊어지지 않고 계속 이어진다는 뜻이다.
* `단조증가` : `x1 < x2` 일 때, 리턴값도 `f(x1) < f(x2)`의 관계가 있음을 말한다.
    * 계속 오르기만 하는 환상의 주식 그래프를 상상해 보자.

정리하자면 다음과 같다.

* 모든 실수 범위의 입력값 `x`와, 실수 범위의 리턴값 `f(x)`로 그래프를 그렸을 때, 그래프가 끊임 없이 이어지고, 계속해서 오른쪽 위로 상승하는 모양이다.
* 그런 와중에 입력값 `x`가 integer 이면, 리턴값 `f(x)`도 integer 이다.

### $$\ceil{f(x)} = \ceil{f( \ceil x )}$$ 의 증명

세 가지 경우로 나누어 생각할 수 있다.

* $$ x = \ceil x $$ 인 경우
    * 명백하므로 증명할 필요가 없다.
* $$ x \gt \ceil x $$인 경우
    * 이건 불가능한 경우이다.
* $$ x \lt \ceil x $$ 인 경우
    * 좀 더 정확히는 $$\floor x \lt x \lt \ceil x$$인 경우라 할 수 있겠다.
    * 이 경우만 증명하면 되겠다.

$$
\begin{align}
x & \lt \ceil x \\
f(x) & \lt f( \ceil x ) \\
    & \color{gray}{\because \text{f 는 단조증가 함수이기 때문이다.}} \\
\ceil{f(x)} & \le \ceil{ f( \ceil x ) } \\
    & \color{gray}{\because \ceil \ \text{은 비감소 함수이기 때문이다.}} \\
\end{align}
$$

이 때, 다음의 조건을 만족하는 임의의 수 $$y$$가 반드시 존재할 것이다.

$$
x \le y \lt \ceil x \\
f(y) = \ceil{f(x)} \\
$$

이제 이 문제의 조건이 `함수 f의 리턴값 f(x)가 integer 이면 입력값 x는 integer이다`라는 점을 떠올려보자.

* $$f(y) = \ceil{f(x)}$$ 이니까, $$f(y)$$는 integer 이다.
* 따라서, $$y$$는 integer 이다.

그런데 부등식을 써 놓고 다시 잘 생각해보면 모순이 발생했다는 것을 알 수 있다.

$$
\begin{cases}
\floor x \lt x \le y \lt \ceil x \\
y \text{는 integer이다.} \\
\end{cases}
$$

$$\floor x$$ 와 $$\ceil x$$ 의 차이는 1 이므로, 둘 사이에 다른 정수가 있다는 것은 말이 안 된다.

따라서 다음의 식에서 부등호는 빠져야 한다.

$$
\ceil{f(x)} \le \ceil{ f( \ceil x ) } \\
$$

결론적으로 다음 등식이 남게 된다.

$$
\ceil{f(x)} = \ceil{ f( \ceil x ) } \\
$$

# Links

* [[CONCRETE-MATH]]

