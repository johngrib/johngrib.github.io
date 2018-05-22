---
layout  : wiki
title   : 구체수학 02.합.06.유한-무한 미적분
summary : 02.SUMS.06.FINITE AND INFINITE CALCULUS
date    : 2018-05-22 16:05:14 +0900
updated : 2018-05-22 20:35:16 +0900
tags    : math
toc     : true
public  : true
parent  : study-concrete-math
latex   : true
---
* TOC
{:toc}

이 문서는 [[CONCRETE-MATH]] **2장.합 - 6.유한 - 무한 미적분**을 공부한 노트입니다.

# 무한 미적분(infinite calculus)

무한 미적분은 미분연산자(differential operator) D의 성질을 토대로 한다.

$$
Df(x) = \lim_{h \to 0} {f(x+h) - f(x) \over h}
$$

D를 적용하는 방법, 즉 미분하는 방법은 다음과 같다.

고등학교에서 배운 그냥 미분이다.

$$
D(x^m) = mx^{m-1}
$$


# 유한 미적분(finite calculus)

깔끔하고 체계적인 방식으로 합산에 접근할 수 있다.

유한 미적분은 차분연산자(difference operator) $$\Delta$$의 성질을 토대로 한다.

* 위의 무한 미적분에서 살펴본 `Df(x)`에 다음의 제약을 추가한다.
    * **`h`는 양의 정수.**
    * 따라서, $$h \to 0$$ 의 극한에 가장 가까운 것은 $$h = 1$$.

위의 특징들을 적용한 식을 $$\Delta f(x)$$라 하자.

다음과 같이 식을 꾸밀 수 있다.

$$
\begin{align}
\Delta f(x)
    & = \lim_{h \to 0 \\ h \in 양의 정수} {f(x+h) - f(x) \over h} \\
    & = \lim_{h = 1} {f(x+h) - f(x) \over h} \\
    & = {f(x+h) - f(x) \over 1} \\
    & = f(x+h) - f(x) \\
\\
\therefore \Delta f(x) & = f(x+1) - f(x) \\
\end{align}
$$

$$\Delta$$를 적용하는 방법, 즉 유한 미분하는 방법은 다음과 같다.

$$x^3$$을 예로 들자면...

$$
\begin{align}
\Delta (x^3)
    & = (x+1)^3 - x^3 \\
    & = (x^3 + 3x^2 + 3x +1) - x^3 \\
    & = 3x^2 + 3x + 1 \\
\end{align}
$$

# mth power 함수

편의를 위해 mth power 함수라는 형태를 새로 정의하자.

* mth power 라고 쓰고 Math Power 라고 읽자! (신난다)

mth power 함수는 두 종류가 있다.

* x의 m 내림제곱
* x의 m 올림제곱

## x의 m 내림제곱

$$
x^{\underline m} = \overbrace{x \cdot (x-1) \cdot (x-2) \cdot ... \cdot (x-m+1)}^{m개}, \quad integer \; m \ge 0.
$$

팩토리얼과 비슷한 느낌이지만 약간 다르다.

예를 들어 **10의 4 내림제곱**이라면 다음과 같이 전개된다.

$$
10^{\underline{4}} = 10 \cdot 9 \cdot 8 \cdot 7
$$

## x의 m 올림제곱

$$
x^{\overline m} = \overbrace{x \cdot (x+1) \cdot (x+2) \cdot ... \cdot (x+m-1)}^{m개}, \quad integer \; m \ge 0.
$$

이것도 팩토리얼과 비슷한 느낌이지만 약간 다르다.

예를 들어 **10의 4 올림제곱**이라면 다음과 같이 전개된다.

$$
10^{\overline 4} = 10 \cdot 11 \cdot 12 \cdot 13
$$

## 내림제곱, 올림제곱, 팩토리얼의 관계

$$
\begin{array}{ccccccc}
n!         & = & n^{\underline n}  & = & 1^{\overline n} \\
n 팩토리얼 & = & n의 n 내림제곱     & = & 1의 n 올림제곱 \\
\end{array}
$$

## 내림 거듭제곱과 차분연산자

내림 거듭제곱 $$x^{\underline m}$$에 차분 연산자 $$\Delta$$를 적용하면 다음과 같이 된다.

$$
\begin{align}
\Delta (x^{\underline m})
    & = (x+1)^{\underline m} - x^{\underline m} \\
\\
    & = \color{red}{(x + 1)}(x)(x - 1)(x - 2) ... (x-m+2) \\
    & \quad \quad \quad - (x)(x - 1)(x - 2) ... (x-m+2)\color{red}{(x-m+1)} \\
    & = ( \color{red}{(x+1)} - \color{red}{(x-m+1)} ) \cdot (x)(x-1)(x-2) ... (x-m+2)\\
    & = m \cdot \underbrace{(x)(x-1)(x-2) ... (x-m+2)}_{m-1 개}\\
\therefore \Delta (x^{\underline m})
    & = m x^{\underline{m-1}} \\
\end{align}
$$



# Links

* [[CONCRETE-MATH]]
