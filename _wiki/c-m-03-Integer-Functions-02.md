---
layout  : wiki
title   : 구체수학 03.정수 함수.02.바닥 천장 함수의 응용
summary : 03.Integer Functions.01.FLOOR/CEILING APPLICATIONS
date    : 2018-06-03 14:17:27 +0900
updated : 2018-06-20 22:21:35 +0900
tag     : math
toc     : true
public  : true
parent  : study-concrete-math
latex   : true
---

$$
\def\ceil#1{\lceil #1 \rceil}
\def\floor#1{\lfloor #1 \rfloor}
\def\frfr#1{\{ #1 \}}
\def\bigceil#1{ \biggr\lceil #1 \biggr\rceil }
\def\bigfloor#1{ \biggr\lfloor #1 \biggr\rfloor }
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

$$\bigfloor{ \sqrt{\floor x} } = \floor{\sqrt x}, \; real \; x \ge 0$$

* `real`은 `실수`를 의미한다
* 즉, 문제 조건의 `x`는 **0 이상의 실수**이다.

일단 다음과 같이 정의하자.

$$
m = \bigfloor{ \sqrt{ \floor x } }
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

### 중요한 특수 경우

위에서 증명한 정리의 특수한 경우.

$$m, n$$이 정수이고, 분모인 $$n$$은 양수인 정수라면 다음 두 가지가 성립한다.

$$
\begin{align}
\bigfloor{ \frac{x+m}{n} } & = \bigfloor{ \frac{\floor x + m}{n} } \\
\bigceil{ \frac{x+m}{n} } & = \bigceil{ \frac{\ceil x + m}{n} } \\
\end{align}
$$

$$m = 0$$ 이라면 다음과 같을 것이다.

$$
\begin{align}
\bigfloor{ \frac{x}{n} } & = \bigfloor{ \frac{\floor x}{n} } \\
\bigceil{ \frac{x}{n} } & = \bigceil{ \frac{\ceil x}{n} } \\
\end{align}
$$

둘 다 생각하기 귀찮으므로 바닥 함수만 놓고 생각해보자.

$$m = 0, n = 10$$ 이라면 다음 사실을 알 수 있다.

$$
\bigfloor{ \frac{x}{10} } = \bigfloor{ \frac{\floor x}{10} } \\
$$

중첩이 되는 것 같다? $$x$$에 $$\frac{x}{10}$$를 넣어 보자.

$$
\begin{align}
\bigfloor{ \frac{\frac{x}{10}}{10} } & = \bigfloor{ \frac{\floor{ \frac{x}{10} }}{10} } \\
\bigfloor{ \frac{x}{100} } & = \bigfloor{ \frac{\floor{ \frac{x}{10} }}{10} } \\
\bigfloor{ \frac{x}{100} } & = \bigfloor{ \frac{\floor{ \frac{ \floor x}{10} }}{10} } \\
\because & \color{gray}{\bigfloor{ \frac{x}{10} } = \bigfloor{ \frac{\floor x}{10} }} \\
\end{align}
$$

위의 식의 왼쪽은 다음을 의미한다.

```python
# 100 으로 나누고, 나머지를 버린 결과를 리턴한다.
def ft100(x):
    return x // 100
```

오른쪽은 다음을 의미한다.

```python
# 10 으로 나누고, 나머지를 버리고, 10으로 나누고, 나머지를 버리고 리턴한다.
def ft10_10(x):
    x = x // 10
    x = x // 10
    return x
```

100 으로 나누어 나머지를 버리거나, 10으로 나누어 나머지를 버리는 일을 두 번 반복하나 똑같다는 의미이다.

# 두 번째 문제

다음 명제를 증명 또는 반증하자.

$$
\ceil{ \sqrt{ \floor x } } \stackrel{?}{=} \ceil{ \sqrt x }, \quad { real \\ 실수 } \; x \ge 0 \\
$$

이 문제는 다음의 값들을 대입해보며 풀어보면 쉽게 반증할 수 있다.

* $$\pi$$ : [원주율](https://www.wolframalpha.com/input/?i=pi ).
    * 약 `3.1415926535897...`
    * `파이(/paɪ/)`라고 읽는다.
* $$e$$ : [자연상수](https://www.wolframalpha.com/input/?i=mathematical+constant+e ).
    * 약 `2.7182818284590...`
* $$\phi$$ : [황금비](https://www.wolframalpha.com/input/?i=phi ).
    * 약 `1.618033988749...`
    * `파이(/faɪ/)`라고 읽는다.

계산하기 귀찮으니 컴퓨터로 해결하자.

```python
import math

def test(x):
    left = math.ceil(math.sqrt(math.floor(x)))
    right = math.ceil(math.sqrt(x))
    return left == right

phi = (1 + math.sqrt(5)) / 2

print(math.pi, test(math.pi))   # 3.141592653589793 True
print(math.e, test(math.e))     # 2.718281828459045 True
print(phi, test(phi))           # 1.618033988749895 False
```

* $$\phi$$(phi)가 `False`가 나왔다.
* 따라서 위의 명제는 참이 아니다.

## $$\ceil{ \sqrt{ \floor x } } = \ceil{ \sqrt{ x } }$$일 필요충분조건은?

* 윗 절에서 테스트 한 결과
    * $$x = \pi$$ 인 경우엔 참.
    * $$x = e $$ 인 경우엔 참.
    * $$x = \phi$$ 인 경우엔 **거짓**.

책에서는 "좀 더 실험해보면, x가 9와 10 사이일 때에도 등식이 성립하지 않음을 알 수 있다."고 한다.

나는 다음과 같이 python으로 돌려 보았다.

```python
import math

def test(x):
    left = math.ceil(math.sqrt(math.floor(x)))
    right = math.ceil(math.sqrt(x))
    return left == right

def say(num, result):
    print(f'{num:7.2f} {str(result):s}')

i = 0.0
step = 0.01
pre = test(i)

say(i, pre)

while (i <= 100):
    num = round(i, 3)
    result = test(num)
    if pre != result:
        say(num, result)
    pre = result
    i += step
```

실행해보면 다음과 같은 결과가 나온다.

```
   0.00 True
   0.01 False
   1.00 True
   1.01 False
   2.00 True
   4.01 False
   5.00 True
   9.01 False
  10.00 True
  16.01 False
  17.00 True
  25.01 False
  26.00 True
  36.01 False
  37.00 True
  49.01 False
  50.00 True
  64.01 False
  65.00 True
  81.01 False
  82.00 True
```

결과를 표로 정리해 보았다.

| 범위 (0.01 단위)           | $$\ceil{\sqrt{\floor x}}=\ceil{\sqrt x}$$ |                         |
|----------------------------|-------------------------------------------|-------------------------|
| $$ 0.01 \le x \lt 1.00$$   | `False`                                   |                         |
| $$ x = 1.00 $$             | `True`                                    |                         |
| $$ 1.00 \lt x \lt 2.00$$   | `False`                                   | $$\phi$$ 가 있는 범위   |
| $$ 2.00 \le x \le 4.00$$   | `True`                                    | $$e, \pi$$ 가 있는 범위 |
| $$ 4.00 \lt x \lt 5.00$$   | `False`                                   |                         |
| $$ 5.00 \le x \le 9.00$$   | `True`                                    |                         |
| $$ 9.00 \lt x \lt 10.00$$  | `False`                                   | 책에서 알려준 범위      |
| $$ 10.00 \le x \le 16.00$$ | `True`                                    |                         |
| $$ 16.00 \lt x \lt 17.00$$ | `False`                                   |                         |
| ...                        | ...                                       | 생략                    |

### False 의 조건

책에서는 `False`의 조건이 다음과 같다고 말한다.

$$
m^2 \lt x \lt m^2 + 1
$$

`False`로 나온 범위들을 살펴보면 위의 조건을 만족하고 있음을 알 수 있다.

$$
\begin{array}{cc}
1.00 \lt x \lt 2.00 & = & 1^2 \lt x \lt 1^2 + 1\\
4.00 \lt x \lt 5.00 & = & 2^2 \lt x \lt 2^2 + 1\\
9.00 \lt x \lt 10.00 & = & 3^2 \lt x \lt 3^2 + 1\\
16.00 \lt x \lt 17.00 & = & 4^2 \lt x \lt 4^2 + 1\\
... & & ...
\end{array}
$$

그렇다면 다음과 같이 전제하고 식을 풀어 보자.

* 조건
    * $$ x = m^2 + a $$ &nbsp;
    * $$m$$은 0보다 큰 정수
    * $$0 \lt a \lt 1$$ &nbsp;

$$
\begin{align}
\ceil{ \sqrt{ \floor x } } & = \ceil{ \sqrt{ x } } \\
\ceil{ \sqrt{ \floor{m^2 + a} } } & = \ceil{ \sqrt{ m^2 + a } } \\
\ceil{ \sqrt{ m^2 } } & = \ceil{ \sqrt{ m^2 + a } } \\
\ceil{ m } & = \ceil{ \sqrt{ m^2 + a } } \\
m          & = \ceil{ m + 0.\Box\Box } \\
m          & = m+1 \\
\end{align}
$$

잘못된 결과가 나왔다. 즉, 책에 나온 조건을 검증했다.

### True 의 조건

한편, 책에서 말하고 있는 `True`의 조건은 다음과 같다.

$$
\begin{cases}
x = 0 \\
m^2 + 1 \le x \le (m+1)^2 \\
\end{cases}
$$

이번에도 위에서 정리한 표를 참고해 다음과 같이 정리해 보았다.

$$
\begin{array}{cc}
1.00 \le x \le 1.00 & = & 0^2+1 \le x \le (0+1)^2\\
2.00 \le x \le 4.00 & = & 1^2+1 \le x \le (1+1)^2\\
5.00 \le x \le 9.00 & = & 2^2+1 \le x \le (2+1)^2\\
10.00 \le x \le 16.00 & = & 3^2+1 \le x \le (3+1)^2\\
... & & ...
\end{array}
$$

### 결론

따라서

$$\ceil{ \sqrt{ \floor x } } = \ceil{ \sqrt{ x } }$$

를 만족시키는 필요충분조건은 다음과 같다고 할 수 있다.

$$
x \text{가 정수} \\
or \\
\sqrt{ \floor x } \text{ 가 정수가 아니다.} \\
$$

# 세 번째 문제

## 새로운 표기법: 폐구간과 열린 구간

* [C.A.R. Hoare](https://en.wikipedia.org/wiki/Tony_Hoare ), [Lyle Ramshaw](https://dblp.uni-trier.de/pers/hd/r/Ramshaw:Lyle )가 제안한 표기법.
* 개발자에게는 익숙한 표기법이다.

### 폐구간(closed interval)

$$[\alpha..\beta]$$

* $$\alpha \le x \le \beta $$ 인 집합을 의미한다.
    * 즉 $$\alpha, \alpha+1, \alpha+2, ..., \beta$$ 의 집합을 의미한다.
    * python이라면 `list(range(alpha, beta+1))`
```python
>>> alpha = 3
>>> beta = 6
>>> list(range(alpha, beta+1))
[3, 4, 5, 6]
```
    * 원소의 개수는
        * $$\alpha, \beta$$가 정수이면 $$\beta - \alpha + 1$$
        * $$\alpha, \beta$$가 실수이면 $$\floor{\beta} - \ceil{\alpha} + 1$$

### 열린 구간(open interval)

$$(\alpha..\beta)$$

* $$\alpha \lt x \lt \beta $$ 인 집합을 의미한다.
    * 즉 $$\alpha+1, \alpha+2, ..., \beta - 1$$ 의 집합을 의미한다.
    * python이라면 `list(range(alpha + 1, beta))`
```python
>>> alpha = 3
>>> beta = 6
>>> list(range(alpha + 1, beta))
[4, 5]
```
    * 원소의 개수는
        * $$\alpha, \beta$$가 정수이면 $$\beta - \alpha - 1$$
        * $$\alpha, \beta$$가 실수이고 $$\alpha \ne \beta$$ 이면, $$\ceil{\beta} - \floor{\alpha} - 1$$

### 반개구간(half-open interval)

반개구간은 두 가지가 있다.

$$[\alpha..\beta)$$

* $$\alpha \le x \lt \beta $$ 인 집합을 의미한다.
    * 즉 $$\alpha, \alpha+1, ..., \beta - 1$$ 의 집합을 의미한다.
    * python이라면 `list(range(alpha, beta))`
```python
>>> alpha = 3
>>> beta = 6
>>> list(range(alpha, beta))
[3, 4, 5]
```
    * 원소의 개수는
        * $$\alpha, \beta$$가 정수이면 $$\beta - \alpha$$
        * $$\alpha, \beta$$가 실수이면 $$\ceil{\beta} - \ceil{\alpha}$$

$$(\alpha..\beta]$$

* $$\alpha \lt x \le \beta $$ 인 집합을 의미한다.
    * 즉 $$\alpha+1, \alpha+2, ..., \beta$$ 의 집합을 의미한다.
    * python이라면 `list(range(alpha+1, beta+1))`
```python
>>> alpha = 3
>>> beta = 6
>>> list(range(alpha + 1, beta + 1))
[4, 5, 6]
```
    * 원소의 개수는
        * $$\alpha, \beta$$가 정수이면 $$\beta - \alpha$$
        * $$\alpha, \beta$$가 실수이면 $$\floor{\beta} - \floor{\alpha}$$

## 표기법: 나누어 떨어짐

$$ a \backslash b$$

* `b` 가 `a` 로 나누어 떨어짐을 의미한다.
* `b가 a로 나누어 떨어진다`라고 읽으면 된다.
* 즉 `b`가 `a`의 배수임을 의미한다.
    * `2 \ 8` 는 참이다.
    * `3 \ 8` 은 거짓이다.

## 구체 수학 클럽 도박장 문제

* `1`부터 `1000`까지의 번호가 있는 룰렛이 있다고 하자.
* 룰렛을 돌려서 나온 번호 `n`에 대하여, $$\floor{ \sqrt[3]{n} } \backslash n$$ 이 참이라면, `5` 달러를 받고 아니면 `1` 달러를 낸다.
    * (즉, `n`이 `n`의 세제곱근의 바닥으로 나누어 떨어지면 `5` 달러를 받는다.)
    * (즉, `n`이 `n`의 세제곱근의 바닥으로 나누어 떨어지지 않으면 `1` 달러를 낸다.)

이해하기 쉽게 python으로 표현하자면 다음과 같다.

```python
import math

def isWin(n):
    return 0 == (n % math.floor(math.pow(n, 1/3)))
```

* 룰렛을 돌려 나온 숫자 `n`을 `isWin` 함수에 넣은 결과가
    * `True`이면 게임에 이겨 `5` 달러를 받는다.
    * `False`이면 게임에 패배하여 `1`달러를 내놓게 된다.

### 이 게임에서 돈을 딸 수 있을까?

기대값을 구해보면 대충 알 수 있을 것 같다.

기대값은 다음과 같이 구할 수 있을 것이다.

$$
\begin{align}
& (5달러) \times (승리하는경우) + (-1달러) \times (패배하는경우) \over 승리하는경우 + 패배하는경우 \\
& = \frac{5W - L}{1000} = \frac{5W - (1000 - W)}{1000} \\
\\
& = \frac{6W - 1000}{1000}
\end{align}
$$

이제 승리하는 경우의 수(W)가 얼마인지만 계산하면 된다.

### python으로 풀어 보자

물론 코딩하면 아주 쉽게 구할 수 있다.

```python
import math
import numpy

def isWin(n):
    # pow3 = n ** (1/3)
    pow3 = numpy.cbrt(n)
    return 0 == (n % math.floor(pow3))

W = 0

for i in range(1, 1000 + 1):
    num = i
    if isWin(num):
        W += 1

print(W) # 172
```

* $$\sqrt[3]{ n }$$ 계산을 할 때 부동소수점 때문에 결과가 달라질 수 있어서 `numpy`를 사용했다.
* 결과는 `172`
    * 따라서 기대값은 $$ \frac{6 \times 172 - 1000}{1000} = \frac{4}{125} = 0.032 $$
    * 한 게임에 `0.032`달러를 벌 수 있는 셈이다.
    * 즉, 이 게임은 여러 차례 플레이할수록 (소액이지만) 돈을 벌 확률이 높다.

### 수학으로 풀어 보자

책에서는 좀 더 복잡하지만 확실한 방법으로 `172`를 계산해 낸다.

다음은 책을 참고하여, 내 수준에 맞게 훨씬 자세히 풀어본 것이다.

$$
\begin{align}
W & = \sum_{n=1}^{1000} \biggr[ \text{숫자 n 은 승리 번호이다} \biggr] \\
& = \sum_{\color{blue}{1 \le n \le 1000}} \biggr[ \floor{ \sqrt[3]{n} } \backslash n \biggr] \\
& = \sum_{n} \biggr[ \floor{\sqrt[3] n} \backslash n \biggr] \biggr[ \color{blue}{1 \le n \le 1000} \biggr] \\
\\
& = \sum_{k,n}\biggr[k=\floor{\sqrt[3] n}\biggr]\biggr[k \backslash n \biggr]\biggr[1\le n\le 1000 \biggr]\\
& = \sum_{k, n} \biggr[ k = \floor{\sqrt[3] n} \biggr] \biggr[\color{blue}{n=km}\biggr]\biggr[ 1 \le n \le 1000 \biggr] \\
& \qquad \color{gray}{ \because \text{ n 은 k의 배수 } } \\
& = \sum_{k,m,n} \biggr[ k^3 \le n \lt (k+1)^3 \biggr]\biggr[n=km \biggr]\biggr[ 1 \le n \le 1000 \biggr] \\
& \qquad \color{gray}{ \because k = \floor{ \sqrt[3] n } \text{을 만족시키는 n의 범위 }} \\
& = \sum_{k,m,n} \biggr[ k^3 \le n \lt (k+1)^3 \biggr]\biggr[n=km \biggr]\biggr[ 1 \le n \lt 1000 \biggr] \\
& \quad + \sum_{k,m,n} \biggr[ k^3 \le n \lt (k+1)^3 \biggr]\biggr[n=km \biggr]\biggr[ n = 1000 \biggr] \\
& \qquad \color{gray}{ \because n = 1000 \text{인 경우를 분리 }} \\
& = 1 + \sum_{k,m,n} \biggr[ k^3 \le n \lt (k+1)^3 \biggr]\biggr[n=km \biggr]\biggr[ 1 \le n \lt 1000 \biggr] \\
& \qquad \color{gray}{ \because n = 1000 \text{인 경우는 1이다 }} \\
& = 1 + \sum_{k,m} \biggr[ k^3 \le km \lt (k+1)^3 \biggr]\biggr[ 1 \le km \lt 1000 \biggr] \\
& \qquad \color{gray}{ \because n = km} \\
& = 1 + \sum_{k,m} \biggr[ k^2 \le m \lt \frac{(k+1)^3}{k} \biggr]\biggr[ k의 \ 범위 \biggr] \\
& \qquad \color{gray}{ \because \text{m은 k와 n의 관계가 배수이기 때문에 넣은 것이었다}} \\
& = 1 + \sum_{k,m} \biggr[ k^2 \le m \lt \frac{(k+1)^3}{k} \biggr]\biggr[ 1 \le k \lt 10 \biggr] \\
& \qquad \color{gray}{ \because k = \floor{ \sqrt[3] n }} \\
& = 1 + \sum_{k,m} \biggr[ m \in \color{red}[ k^2 .. \frac{(k+1)^3}{k}\color{red}) \biggr]\biggr[ 1 \le k \lt 10 \biggr] \\
& \qquad \color{gray}{ \because 반개구간 \ 적용} \\
& = 1 + \sum_{1 \le k \lt 10} \biggr[ \color{red}[ k^2 .. \frac{(k+1)^3}{k}\color{red}) \biggr] \\
& = 1 + \sum_{1 \le k \lt 10} \biggr( \ceil{ \frac{(k+1)^3}{k} } \biggr)
- \sum_{1 \le k \lt 10} \biggr( \ceil{ k^2 } \biggr) \\
& \qquad \color{gray}{ \because ``A부터\ B까지"는 ``1부터\ B"에서 ``1부터\ A"를 \text{ 뺀 것과 똑같다 }} \\
& = 1 + \sum_{1 \le k \lt 10} \biggr( \ceil{ \frac{k^3 + 3k^2 + 3k + 1}{k} } - \ceil{ k^2 }\biggr) \\
& = 1 + \sum_{1 \le k \lt 10} \biggr( \ceil{ k^2 + 3k + 3 + \frac{1}{k} } - \ceil{ k^2 }\biggr)\\
& = 1 + \sum_{1 \le k \lt 10} \biggr( \ceil{ 3k + 3 + \frac{1}{k} }\biggr) \\
& = 1 + \color{red}{\sum_{1 \le k \lt 10} (3k + 4)} \\
& = 1 + \sum_{1 \le k \lt 10} 3k + 4 \cdot 9\\
& = 1 + 3 \cdot \sum_{1 \le k \lt 10} k + 36\\
& = 3 \cdot \sum_{1 \le k \lt 10} k + 37\\
& = 3 \cdot \frac{9 \cdot 10}{2} + 37\\
& = 3 \cdot 45 + 37\\
& = 135 + 37\\
\\
& = 172\\
\\
\\
\end{align}
$$

### 일반화

이제 구체 수학 클럽 도박장 문제의 `1000`을 `N`으로 확장하여 일반화해보자.

위의 문제에서는 $$1 \le k \le 10$$ 이었으므로, `k`의 최대값은 `10`이었다.

* $$1 \le k \lt 10$$ 아닌가? 하는 생각이 들 수도 있는데, `k = 10`인 경우(`n = 1000`인 경우)를 분리했기 때문에 식에 `1 +`가 붙었음을 잊으면 안된다.

이제 다음과 같이 정의하자.

$$K = k의 \ 최대값$$

다음과 같이 표현할 수도 있다.

$$K = \floor{ \sqrt[3] N }$$

그렇다면 `N`에 대한 승리 번호 개수 `W`는 다음과 같이 계산하여 일반식을 끌어낼 수 있다. 흐름은 앞의 문제 풀이와 비슷하다.

$$
\begin{align}
W   & = \sum_{n=1}^{N}[\text{숫자 n은 승리 번호이다}] \\
    & = \sum_{\color{blue}{1 \le n \le N}} \biggr[ \floor{ \sqrt[3] n } \backslash n \biggr] \\
    & = \sum_{k,n} \biggr[ k = \floor{ \sqrt[3] n } \biggr]\biggr[ k \backslash n \biggr]\biggr[\color{blue}{1 \le n \le N} \biggr] \\
    & = \sum_{k,n} \biggr[ k = \floor{ \sqrt[3] n } \biggr]\biggr[ k \backslash n \biggr]\biggr[1 \le n \color{blue}{\lt} N \biggr] + \sum_{k,n} \biggr[ k = \floor{ \sqrt[3] n } \biggr]\biggr[ k \backslash n \biggr]\biggr[n = N \biggr] \\
    & \quad \color{gray}{ \because n = N\text{ 인 경우를 분리 }} \\
    & = \color{red}{\sum_{1 \le k \lt K} (3k + 4)} + \sum_{k,n} \biggr[ k = \floor{ \sqrt[3] n } \biggr]\biggr[ k \backslash n \biggr]\biggr[n = N \biggr] \\
    & \quad \color{gray}{ \because \text{ 앞의 문제에서 풀었던 방식을 그대로 적용 }} \\
    & \quad \color{gray}{ \quad \text{ 이제 오른쪽만 정리하면 된다 }} \\
\\
    & = \sum_{1 \le k \lt K} (3k + 4) + \sum_m [ K^3 \le n \le N ][n = Km][n = N] \\
    & \quad \color{gray}{ \because K = \floor{ \sqrt[3] n } \text{을 만족시키는 n의 범위 적용 }} \\
\\
    & = \sum_{1 \le k \lt K} (3k + 4) + \sum_m [ K^3 \le Km \le N ] \\
    & = \sum_{1 \le k \color{blue}{\le K-1}} (3k + 4) + \sum_m [ K^3 \le Km \le N ] \\
\\
    & = 3 \times \sum_{1 \le k \le K-1} k + 4(K-1) + \sum_m [ K^3 \le Km \le N ] \\
    & = 3 \times \frac{(K-1)(K-1+1)}{2} + 4(K-1) + \sum_m [ K^3 \le Km \le N ] \\
    & = \frac{3}{2} \cdot (K-1)K + 4K-4 + \sum_m [ K^3 \le Km \le N ] \\
    & = \frac{3}{2} K^2 - \frac{3}{2}K + 4K - 4 + \sum_m [ K^3 \le Km \le N ] \\
\\
    & = \frac{3}{2} K^2+\frac{5}{2}K -4 + \color{blue}{\sum_m [ K^3 \le Km \le N ]} \\
    & = \left(\frac{3}{2} K^2+\frac{5}{2}K -4\right) + \sum_m [ K^2 \le m \le \frac{N}{K} ] \\
    & = \left(\frac{3}{2} K^2+\frac{5}{2}K -4\right) + \sum_m \biggr[ m \in [K^2 .. \frac{N}{K}] \biggr] \\
\\
& = \left(\frac{3}{2} K^2+\frac{5}{2}K -4\right) +\left(\floor{\frac{N}{K}} - K^2 + 1 \right) \\
    & \quad \color{gray}{ \because m \in [K^2 .. \frac{N}{K}] \text{을 만족시키는 m의 개수}} \\
& = \floor{\frac{N}{K}} + \frac{3}{2} K^2 - K^2 + \frac{5}{2}K - 4 + 1 \\
\\
\therefore
W   & = \floor{\frac{N}{K}} + \frac{1}{2} K^2 + \frac{5}{2}K - 3,
    \quad K = \floor{ \sqrt[3] N } \\
\end{align}
$$

그런데, 일반해를 잘 살펴보면 다음의 사실을 알 수 있다.

$$
\begin{align}
W   & = \floor{\frac{N}{K}} + \frac{1}{2} K^2 + \frac{5}{2}K - 3 \\
& = \color{red}{\bigfloor{\frac{N}{ \floor{N^{1 \over 3}}}} } + \color{blue}{\frac{1}{2} \floor{N^{2 \over 3}} } + \frac{5}{2}\floor{N^{1 \over 3}} - 3 \\
\end{align}
$$

* 이 식을 알고리즘의 시간 복잡도 분석할 때처럼 생각해 보자.
    * 바닥 함수는 일단 무시하고 생각해 보자.
    * `N`이 붙은 항 위주로 근사값을 생각해보자.
    * 그러면 다음과 같이 간략화된 식을 생각할 수 있다.

$$
\color{red}{N^{2 \over 3}} + \color{blue}{\frac{1}{2} N^{2 \over 3}} + \frac{5}{2}{N^{1 \over 3}} \\
= \frac{3}{2} N^{2 \over 3} + \frac{5}{2}{N^{1 \over 3}} \\
$$

Big O 표기법을 적용해 본다면 $$O(n^{2 \over 3})$$라고도 할 수 있을 것 같다.

책을 읽어 보면 `N`이 커질수록 위의 근사값 식과 실제 식 사이의 오차가 줄어든다는 것을 알 수 있다.


# 네 번째 문제

## 스펙트럼(spectrum)

양의 실수 $$\alpha$$에 대해 다음과 같이 스펙트럼을 정의하자.

$$
Spec(\alpha) = \{ \floor{ \alpha }, \floor{ 2\alpha }, \floor{ 3\alpha }, ... \}
$$

예를 들어 $$\alpha = \frac{1}{2} = 0.5$$인 경우, 스펙트럼은 다음과 같이 나온다.

$$
\begin{array}{rrccccccccccc}
Spec(0.5) & = \{ & \floor{0.5},& \floor{1},& \floor{1.5},& \floor{2},& \floor{2.5},& \floor{3},& \floor{3.5}, & ... \} \\
    & = \{ & 0,& 1,& 1,& 2,& 2,& 3,& 3, & ...\} \\
\end{array}
$$


# Links

* [[CONCRETE-MATH]]

