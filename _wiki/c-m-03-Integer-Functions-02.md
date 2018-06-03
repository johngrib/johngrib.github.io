---
layout  : wiki
title   : 구체수학 03.정수 함수.02.바닥 천장 함수의 응용
summary : 03.Integer Functions.01.FLOOR/CEILING APPLICATIONS
date    : 2018-06-03 14:17:27 +0900
updated : 2018-06-03 17:06:26 +0900
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

# Links

* [[CONCRETE-MATH]]

