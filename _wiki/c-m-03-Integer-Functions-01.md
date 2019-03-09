---
layout  : wiki
title   : 구체수학 03.정수 함수.01.바닥과 천장
summary : 03.Integer Functions.01.FLOORS AND CEILINGS
date    : 2018-06-01 21:31:43 +0900
updated : 2018-06-03 14:10:47 +0900
tag     : math
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
\def\frfr#1{\{ #1 \}}
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

### x 가 정수인 경우

$$
\floor x = x \iff \text{x is an integer} \iff \ceil x = x
$$

* 위의 규칙은 다음을 의미한다.
    * $$\floor x = x$$ 이면 `x`는 정수이다.
    * `x`가 정수이면 $$\lfloor x \rfloor = x$$ 이다.
    * $$\ceil x = x$$ 이면 `x`는 정수이다.
    * `x`가 정수이면 $$\ceil x = x$$ 이다.

요약하자면 다음과 같다.

* x를 내림/올림한 결과가 x와 같다면 정수이다.
* x가 정수이면, 내림/올림한 결과도 x이다.

이는 흔히 알려져 있는 수학적 사실로, 여러 프로그래밍 언어에서도 이 방식으로 실수 타입이 정수값을 갖고 있는지의 여부를 판별하곤 한다.

다음은 [cpython의 float_is_integer 함수](https://github.com/python/cpython/blame/bd250300191133d276a71b395b6428081bf825b8/Objects/floatobject.c#L832 )이다. 가운데 부분을 잘 보면 `x`를 내림한 결과가 `x`와 같은지를 비교하여 `True`/`False`를 리턴하고 있다. python은 잘 모르지만 이렇게 하고 있을 거라고 생각해서 찾아 보았더니 나왔다.

```c
static PyObject *
float_is_integer(PyObject *v)
{
    double x = PyFloat_AsDouble(v);
    PyObject *o;

    if (x == -1.0 && PyErr_Occurred())
        return NULL;
    if (!Py_IS_FINITE(x))
        Py_RETURN_FALSE;
    errno = 0;
    PyFPE_START_PROTECT("is_integer", return NULL)

    // floor(x)와 x를 비교해 정수인지 확인
    o = (floor(x) == x) ? Py_True : Py_False;

    PyFPE_END_PROTECT(x)
    if (errno != 0) {
        PyErr_SetFromErrno(errno == ERANGE ? PyExc_OverflowError :
                             PyExc_ValueError);
        return NULL;
    }
    Py_INCREF(o);
    return o;
}
```

### 천장 - 바닥

$$
\ceil x - \floor x = [ \text{x is not an integer} ]
$$

* 위의 규칙은 아이버슨의 관례를 사용했다.
    * 아이버슨의 관례는 `[  ]`안에 있는 명제가 `True`인 경우 `1`, 아니면 `0`을 리턴한다.
* 즉 위의 규칙은 다음을 의미한다.
    * x가 정수이면 $$\ceil x - \floor x = 0$$ 이다.
    * x가 정수가 아니면 $$\ceil x - \floor x = 1$$ 이다.

```python
import math
math.ceil(math.pi) - math.floor(math.pi)    # 1
math.ceil(3) - math.floor(3)                # 0
```

### 기본적인 부등식

$$
x - 1 \lt \floor x \\
x + 1 \gt \ceil x \\
\text{위의 두 식을 조합하면}\\
x - 1 \lt \floor x \le x \le \ceil x \lt x + 1 \\
$$

* 위의 규칙은 기억해 둘 만한 부등식이다.
    * 그러나 외울 필요는 없다.
    * 조금만 생각해보면 바로 떠올릴 수 있는 것들이다.

### 천장과 바닥의 관계는 대칭

$$
\floor{-x} = - \ceil{x} \\
\ceil{-x} = - \floor{x} \\
$$

* 위의 규칙은 천장/바닥 함수의 관계를 잘 보여 준다.

```python
import math
math.floor(-math.pi) == - math.ceil(math.pi) # True
math.ceil(-math.pi) == - math.floor(math.pi) # True
```

### x가 정수인 경우 유용한 네 가지 규칙

* x 가 정수인 경우 다음의 네 규칙이 성립한다.
* `floor`, `ceil`에 익숙한 프로그래머라면 누구나 알고 있는 내용이다.
    * 설령 모르거나 헷갈리더라도 익숙한 언어로 금방 작동을 확인할 수 있다.

$$
\begin{array}{cccclc}
\floor x = n \iff & n   & \le & x & \lt n + 1 & (a) \\
\floor x = n \iff & x-1 & \lt & n & \le x     & (b) \\
\ceil  x = n \iff & n-1 & \lt & x & \le n     & (c) \\
\ceil  x = n \iff & x   & \le & n & \lt x + 1 & (d) \\
\end{array}
$$

### 정수 항을 집어넣거나 뺄 수 있다

* `n`이 정수라면, 다음이 가능하다.

$$
\floor{x+n} = \floor x + n, \quad \text{integer n}.
$$

다음은 $$x = \pi, \ n = 2$$인 경우이다.

```python
import math
math.floor(math.pi + 2) == math.floor(math.pi) + 2  # True
```

### 바닥/천장 부등식

* `n`이 정수이고, `x`가 실수라면 다음이 성립한다.

$$
\begin{array}{cccclc}
x \lt n \iff & \floor x & \lt & n        & (a) \\
n \lt x \iff & n        & \lt & \ceil x  & (b) \\
x \le n \iff & \ceil x  & \le & n        & (c) \\
n \le x \iff & n        & \le & \floor x & (d) \\
\end{array}
$$


## 분수부와 정수부

실수 $$x$$를 분수부(fractional part)와 정수부(integer part)로 나눌 수 있다.

만약 `1.78`이란 숫자가 있다면 정수부와 분수부는 다음과 같다.

* 정수부: `1`
* 분수부: `0.78`

분수부는 `{ }`로 표기하기로 하며, 다음과 같이 정의한다.

$$
\frfr x = x - \floor x
$$

이 식의 좌우 변을 뒤집고 항 하나를 옮겨주면 다음과 같이 된다.

$$
\begin{array}{ccccc}
x =  & \floor x & + & \frfr x \\
     & 정수부   &   & 분수부 \\
\end{array}
$$



# Links

* [[CONCRETE-MATH]]

