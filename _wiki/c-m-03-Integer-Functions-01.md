---
layout  : wiki
title   : 구체수학 03.정수 함수.01.바닥과 천장
summary : 03.Integer Functions.01.FLOORS AND CEILINGS
date    : 2018-06-01 21:31:43 +0900
updated : 2018-06-02 23:28:08 +0900
tags    : math
toc     : true
public  : true
parent  : study-concrete-math
latex   : true
---
* TOC
{:toc}

이 문서는 [[CONCRETE-MATH]] **3장.정수 함수 - 1.바닥과 천장**을 공부한 노트입니다.

# 바닥(floor) 함수와 천장(celing) 함수

$$
\def\ceil#1{\lceil #1 \rceil}
\def\floor#1{\lfloor #1 \rfloor}
$$

* 두 함수의 정의는 다음과 같다.

$$
\begin{align}
\floor x =
    & \text{the greatest integer less than or equal to x } \\
    & \text{x 보다 작거나 같은 최대 정수} \\
\ceil x =
    & \text{the least integer greater than or equal to x} \\
    & \text{x 보다 크거나 같은 최소 정수} \\
\end{align}
$$

>
Kenneth E. Iverson introduced this notation, as well as the names "floor" and "ceiling", early in the 1960s.  
'천장', '바닥'으로 알려진 이 표기법은 케네스 E. 아이버슨이 1960년대 초에 도입했다.

(수학은 물론이고) 수많은 프로그래밍 언어에서 내림/올림의 용법으로 `floor`/`ceil`을 사용하는데 그 어원이 케네스 아이버슨이었구나!

## 바닥 함수

흔히 사용하는 `floor`이다.

$$
\begin{align}
\floor{3.2}  & = 3 \\
\floor{-3.2} & = -4 \\
\floor{3.0}  & = 3 \\
\floor{e}    & = 2 \\
\floor{-e}   & = -3 \\
\floor{\pi}  & = 3 \\
\floor{-\pi} & = -4 \\
\end{align}
$$

python으로는 다음과 같다.

```python
import math

print(math.floor(3.2))      # 3
print(math.floor(-3.2))     # -4
print(math.floor(3.0))      # 3
print(math.floor(math.e))   # 2
print(math.floor(-math.e))  # -3
print(math.floor(math.pi))  # 3
print(math.floor(-math.pi)) # -4
```

## 천장 함수

흔히 사용하는 `ceil`이다.

$$
\begin{align}
\ceil{3.2}  & = 4 \\
\ceil{-3.2} & = -3 \\
\ceil{3.0}  & = 3 \\
\ceil{e}    & = 3 \\
\ceil{-e}   & = -2 \\
\ceil{\pi}  & = 4 \\
\ceil{-\pi} & = -3 \\
\end{align}
$$

python으로는 다음과 같다.

```python
import math

print(math.ceil(3.2))       # 4
print(math.ceil(-3.2))      # -3
print(math.ceil(3.0))       # 3
print(math.ceil(math.e))    # 3
print(math.ceil(-math.e))   # -2
print(math.ceil(math.pi))   # 4
print(math.ceil(-math.pi))  # -3
```

## 규칙들

$$
\floor x = x \iff \text{x is an integer} \iff \ceil x = x
$$

* 위의 규칙은 다음을 의미한다.
    * $$\lfloor x \rfloor = x$$ 이면 `x`는 정수이다.
    * `x`가 정수이면 $$\lfloor x \rfloor = x$$ 이다.
    * $$\lceil x \rceil = x$$ 이면 `x`는 정수이다.
    * `x`가 정수이면 $$\lceil x \rceil = x$$ 이다.

---

$$
\ceil x - \floor x = [ \text{x is not an integer} ]
$$

* 위의 규칙은 아이버슨의 관례를 사용했다.
    * 아이버슨의 관례는 `[  ]`안에 있는 명제가 `True`인 경우 `1`, 아니면 `0`을 리턴한다.
* 즉 위의 규칙은 다음을 의미한다.
    * x가 정수이면 $$\ceil x - \floor x = 0$$ 이다.
    * x가 정수가 아니면 $$\ceil x - \floor x = 1$$ 이다.

---

$$
x - 1 \lt \floor x \\
x + 1 \gt \ceil x \\
\text{위의 두 식을 조합하면}\\
x - 1 \lt \floor x \le x \le \ceil x \lt x + 1 \\
$$

* 위의 규칙은 기억해 둘 만한 부등식이다.
    * 그러나 외울 필요는 없다.
    * 조금만 생각해보면 바로 떠올릴 수 있는 것들이다.

---

$$
\floor{-x} = - \ceil{x} \\
\ceil{-x} = - \floor{x} \\
$$

* 위의 규칙은 천장/바닥 함수의 관계를 잘 보여 준다.

# Links

* [[CONCRETE-MATH]]

