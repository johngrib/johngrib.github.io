---
layout  : wiki
title   : 구체수학 02.합.06.유한-무한 미적분
summary : 02.SUMS.06.FINITE AND INFINITE CALCULUS
date    : 2018-05-22 16:05:14 +0900
updated : 2018-05-24 23:18:50 +0900
tags    : math
toc     : true
public  : true
parent  : study-concrete-math
latex   : true
---
* TOC
{:toc}

이 문서는 [[CONCRETE-MATH]] **2장.합 - 6.유한 - 무한 미적분**을 공부한 노트입니다.

# 표기법

## 무한 미적분(infinite calculus)

무한 미적분은 미분연산자(differential operator) D의 성질을 토대로 한다.

$$
Df(x) = \lim_{h \to 0} {f(x+h) - f(x) \over h}
$$

D를 적용하는 방법, 즉 미분하는 방법은 다음과 같다.

고등학교에서 배운 그냥 미분이다.

$$
D(x^m) = mx^{m-1}
$$


## 유한 미적분(finite calculus)

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

## mth power 함수

편의를 위해 mth power 함수라는 형태를 새로 정의하자.

* mth power 라고 쓰고 Math Power 라고 읽자! (신난다)

mth power 함수는 두 종류가 있다.

* x의 m 내림제곱
* x의 m 올림제곱

### x의 m 내림제곱

$$
x^{\underline m} = \overbrace{x \cdot (x-1) \cdot (x-2) \cdot ... \cdot (x-m+1)}^{m개}, \quad integer \; m \ge 0.
$$

팩토리얼과 비슷한 느낌이지만 약간 다르다.

예를 들어 **10의 4 내림제곱**이라면 다음과 같이 전개된다.

$$
10^{\underline{4}} = 10 \cdot 9 \cdot 8 \cdot 7
$$

### x의 m 올림제곱

$$
x^{\overline m} = \overbrace{x \cdot (x+1) \cdot (x+2) \cdot ... \cdot (x+m-1)}^{m개}, \quad integer \; m \ge 0.
$$

이것도 팩토리얼과 비슷한 느낌이지만 약간 다르다.

예를 들어 **10의 4 올림제곱**이라면 다음과 같이 전개된다.

$$
10^{\overline 4} = 10 \cdot 11 \cdot 12 \cdot 13
$$

### 내림제곱, 올림제곱, 팩토리얼의 관계

$$
\begin{array}{ccccccc}
n!         & = & n^{\underline n}  & = & 1^{\overline n} \\
n 팩토리얼 & = & n의 n 내림제곱     & = & 1의 n 올림제곱 \\
\end{array}
$$

### 내림 거듭제곱과 차분연산자

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

## D 연산자의 역함수는 $$\int$$

드디어 적분 기호 $$\int$$ 가 나온다.

* 상식대로 미분의 역함수는 적분이다.
    * 위에서 미분 연산자로 `D`가 나왔으므로, `D`의 역함수 역할을 하는 연산자는 적분 기호 $$\int$$ 이다.
    * 반도함수(anti-derivative) 연산자라고도 부른다.

책에 실린 두 연산자의 관계는 다음과 같다.

$$
g(x) = Df(x) \quad \text{if and only if} \quad \int g(x)dx = f(x) + C
$$

번역서에는 다음과 같이 나와 있다.

$$
만일 \int g(x)dx = f(x) + C \quad \text{이면, 그리고 오직 그럴 때만} \quad g(x) = Df(x)
$$

나는 다음과 같이 심플하게 이해했다.

* $$g(x)$$를 적분해서 나온 결과를 $$f(x) + C$$라 하자.
* 그렇다면 $$f(x)$$를 미분하면 $$g(x)$$가 나온다.


## $$\Delta$$ 연산자의 역함수는 $$\sum$$

* 반차분(anti-difference) 연산자라고도 한다.

책에 실린 두 연산자의 관계는 다음과 같다.

$$
g(x) = \Delta f(x) \quad \text{if and only if} \quad \sum g(x) \delta x = f(x) + C
$$

번역서에는 다음과 같이 나와 있다.

$$
만일 \sum g(x) \delta x = f(x) + C \quad \text{이면, 그리고 오직 그럴 때만} \quad g(x) = \Delta f(x)
$$

나는 다음과 같이 심플하게 이해했다.

* $$\sum g(x) \delta x$$의 닫힌 형식을 $$f(x) + C$$ 라 하자.
    * `C`는 적분 상수(적분 결과로 튀어나온 값이 무엇인지 모르는 상수).
* 그렇다면 $$f(x)$$ 에 $$\Delta$$ 연산자를 적용하면 $$g(x)$$가 된다.

$$\Delta$$를 풀어 식으로 표현하자면 다음과 같다.

$$
\begin{align}
\Delta f(x)
    & = g(x) \\
    & = f(x+1) - f(x) \\
\\
\end{align}
$$

## 정적분(definite integrals)

* $$g(x) = Df(x)$$ 이면 다음이 성립한다.
    * ( $$f(x)$$를 미분한 결과가 $$g(x)$$이면 다음이 성립한다. )


$$
\begin{align}
\int_a^b g(x) dx
    & = f(x) \mid_a^b \\
    & = f(b) - f(a) \\
\end{align}
$$

## 정합(definite sums)

* $$g(x) = \Delta f(x)$$ 이면 다음이 성립한다. (단, $$b \ge a$$)
    * ( $$g(x) = f(x+1) - f(x)$$이면 다음이 성립한다. )

$$
\begin{align}
\sum_a^b g(x) \delta x
    & = f(x) \mid_a^b \\
    & = f(b) - f(a) \\
    & = \sum_{k=a}^{b-1} g(k) \\
    & = \sum_{a \le k \lt b} g(k), \quad \text{ for integers } b \ge a \\
\end{align}
$$

이유는 다음과 같다.

$$
\require{cancel}
\begin{align}
\sum_{k=a}^{b-1} g(k)
    & = \sum_{k=a}^{b-1} \Delta f(k) \\
    & = \sum_{k=a}^{b-1} \left( f(k+1) - f(k) \right) \\
    & = (\cancel{f(a+1)} - f(a)) \\
    & \quad + (f(a+2) - \cancel{f(a+1)}) \\
    & \quad + (f(a+3) - f(a+2)) \\
    & \quad + ... \\
    & \quad + (f(b) - f(b - 1)) \\
\\
    & = (\cancel{f(a+1)} - f(a)) \\
    & \quad + (\cancel{f(a+2)} - \cancel{f(a+1)}) \\
    & \quad + (\cancel{f(a+3)} - \cancel{f(a+2)}) \\
    & \quad + ... \\
    & \quad + (f(b) - \cancel{f(b - 1)}) \\
\\
    & = -f(a) + f(b) \\
\\
\therefore
\sum_{k=a}^{b-1} g(k)
    & = -f(a) + f(b) \\
한편 \; \sum_a^b g(x) \delta x
    & = f(b) - f(a) \; 이므로,\\
\sum_a^b g(x) \delta x
    & = \sum_{k=a}^{b-1} g(k) \\
\end{align}
$$

### 망원합(telescoping sum)

위에서 나온 $$\sum (f(k+1) - f(k))$$ 와 같이, 전개했을 때 최초항과 마지막 항만 남는 모양의 합을 망원합(telescoping sum)이라 부른다.

### $$b \lt a$$ 인 경우

정합의 정의는 다음과 같았다.

$$
\begin{align}
\sum_a^b g(x) \delta x
    & = f(x) \mid_a^b \\
    & = f(b) - f(a) \\
\end{align}
$$

따라서 $$b \lt a$$라면 다음이 성립한다.

$$
\begin{align}
\sum_a^b g(x) \delta x
    & = f(b) - f(a) \\
    & = -(f(a) - f(b)) \\
    & = - \sum_{\color{red}b}^{\color{red}a} g(x) \delta x
\end{align}
$$

* 그냥 더해가는 방향이 다를 뿐이라고 생각하면 심플하다.
* 어차피 적분과 아이디어는 같다.

같은 논리로 적분의 다음 항등식을 합산에 응용할 수 있다.

$$
\int_a^{\color{red}b} + \int_{\color{red}b}^c = \int_a^c
$$

즉, 합산에서는 다음과 같다.

$$
\sum_a^{\color{red}b} g(x) \delta x + \sum_{\color{red}b}^c g(x) \delta x = \sum_a^c g(x) \delta x
$$

# 일반 법칙: 내림제곱의 합산

위에서 배운 모든 표기법을 조합하여 다음을 유도할 수 있다.

$$
\begin{align}
\sum_{0 \le k \lt n} k^{\underline{m}}
    & = { k^{\underline{m+1}} \over m+1 } \biggr\rvert_0^n \\
    & = { n^{\underline{m+1}} \over m+1 }, \quad \text{for integers } m, n \ge 0 \\
\end{align}
$$

이유는 다음과 같다.

$$
\begin{align}
\sum_{0 \le k \lt n} k^{\underline{m}}
    & = \sum_{0 \le k \lt n} \left( \frac{1}{m+1} \cdot (m+1) \cdot k^{\underline{(m+1)-1}} \right) \\
    & = \sum_{0 \le k \lt n} \left( \frac{1}{m+1} \cdot \Delta(k^{\underline{m+1}}) \right) \\
    & \color{gray}{
        \quad \because \Delta (x^{\underline{m}}) = mx^{\underline{m-1}}
    } \\
    & = \frac{1}{m+1} \sum_{0 \le k \lt n} \Delta(k^{\underline{m+1}}) \\
    & = \frac{1}{m+1} \sum_{0 \le k \lt n} \left( (k+1)^{\underline{m+1}}  - k^{\underline{m+1}}\right) \\
    & \color{gray}{
        \quad \because \Delta f(x) = f(x+1) - f(x) = g(x)
    } \\
    & = \frac{1}{m+1} \cdot \left( - 0^{\underline{m+1}} + (n-1+1)^{\underline{m+1}}) \right)\\
    & \color{gray}{ \quad \because \text{망원합이기 때문에 가장 작은 항과 가장 큰 항만 남는다 }} \\
    & = \frac{1}{m+1} \cdot \left( n^{\underline{m+1}} \right)\\
    & = {n^{\underline{m+1}} \over m+1} \\
\\
\end{align}
$$

잘 살펴보면, 적분과 비슷한 모양이라 외우기 쉽다.

$$
\begin{align}
\text{적분} \quad
    & \int_0^n x^m dx
    & = { n^{m+1} \over m+1 }
\\
\text{내림제곱의 합산} \quad
    & \sum_{0 \le k \lt n} k^{\underline{m}}
    & = { n^{\underline{m+1}} \over m+1 }
\end{align}
$$

## 내림제곱의 합산을 응용하기

### $$ \sum_0^n k = \frac{n(n+1)}{2}$$ 의 증명

`m = 1`인 경우엔 다음과 같이 모양이 단순해진다.

$$
k^{\underline 1} = k
$$

여기에 내림제곱의 합산 공식을 적용하면 자연스럽게 $$\sum k$$를 유도할 수 있다.
(부등호 $$\lt$$에 주의)

$$
\begin{align}
\sum_{0 \le k \color{red}\lt n} k
    & = \sum_{0 \le k \lt n} k^{\underline 1} \\
    & = { n^{\underline{1+1}} \over 1 + 1 } \\
    & \color{gray}{
        \quad
        \because
        \sum_{0 \le k \lt n} k^{\underline{m}} = { n^{\underline{m+1}} \over m+1 }
    } \\
    & = { n^{\underline{2}} \over 2 } \\
    & = { n(n-1) \over 2 } \\
\end{align}
$$

만약 범위를 $$0 \le k \lt n$$ 이 아니라 $$0 \le k \le n$$로 조정하면 다음과 같이 될 것이다.

방법은 간단하다. `n`에 `n+1`을 대입하면 된다.

$$
\begin{align}
\sum_{0 \le k \le n} k
    & = { (n+1)(n+1-1) \over 2 } \\
    & = { n(n+1) \over 2 } \\
\end{align}
$$

또는 n 을 추가로 더해 유도하는 방법도 있을 것이다.

$$
\begin{align}
\sum_{0 \le k \le n} k
    & = \left( \sum_{0 \le k \lt n} k \right) + n \\
    & = { n(n-1) \over 2 } + n \\
    & = { n^2 - n + 2n \over 2 } \\
    & = { n^2 + n \over 2 } = { n(n+1) \over 2 } \\
\end{align}
$$

### $$ \sum_0^n k^2 = \frac{n(n+1)(2n+1)}{6} $$ 의 증명

$$
\begin{align}
k^{\color{red}{\underline 2}}
    & = k \cdot (k-1) \\
    & = k^2 - k \\
\therefore
k^2 & = k^{\color{red}{\underline 2}} + k \\
    & = k^{\color{red}{\underline 2}} + k^{\color{red}{\underline 1}}\\
\end{align}
$$

이 결과를 $$\sum k^2$$에 대입해 보자.

$$
\begin{align}
\sum_{0 \le k \color{red}\lt n} k^2
    & = \sum_{0 \le k \lt n} (k^{\underline 2} + k^{\underline 1}) \\
    & = \sum_{0 \le k \lt n} k^{\underline 2} + \sum_{0 \le k \lt n} k^{\underline 1} \\
    & = { n^{\underline 3} \over 3 } + { n^{\underline 2} \over 2 }\\
    & \color{gray}{
        \quad
        \because
        \sum_{0 \le k \lt n} k^{\underline{m}} = { n^{\underline{m+1}} \over m+1 }
    } \\
    & = { 2 n^{\underline 3} + 3 n^{\underline 2} \over 6 }\\
    & = { 2 n(n-1)(n-2) + 3 n(n-1) \over 6 }\\
    & = { n(n-1)(2(n-2) + 3) \over 6 }\\
    & = { n(n-1)(2n-1) \over 6 }\\
\end{align}
$$

만약 범위를 $$0 \le k \lt n$$ 이 아니라 $$0 \le k \le n$$로 조정하면 다음과 같이 될 것이다.

방법은 간단하다. `n`에 `n+1`을 대입하면 된다.

$$
\begin{align}
\sum_{0 \le k \le n} k^2
    & = { (n+1)(n+1-1)(2(n+1)-1) \over 6 }\\
    & = { (n+1)(n)(2n+1) \over 6 }\\
\end{align}
$$

너무 쉬워서 어이가 없을 정도다. 고등학생 때 이걸 배웠다면 얼마나 좋았을까.

### $$ \sum_0^n k^3 $$ 은 어떻게 될까?

세제곱수의 합은 아직 알지 못하므로 이번 기회에 유도해 두면 편할 것 같다.

일단 제곱수의 합을 증명할 때와 같이 내림제곱을 사용하여 활용하기 적당한 식을 만들어 보자.

$$
\begin{align}
k^{\color{red}{\underline 3}}
    & = k \cdot (k-1) \cdot (k-2) \\
    & = k(k-1)(k-2) \\
    & = k(k^2 -3k + 2) \\
    & = k^3 -3k^2 + 2k \\
    & = k^3 -3k^2 + 2k^{\color{red}{\underline 1}} \\
    & = k^3 -3(k^{\color{red}{\underline 2}} + k^{\color{red}{\underline 1}}) + 2k^{\color{red}{\underline 1}} \\
    & \quad \because \color{gray}{\text{거듭제곱의 합 증명 참고}} \\
    & = k^3 -3k^{\color{red}{\underline 2}} - k^{\color{red}{\underline 1}} \\
\therefore
k^3 & = k^{\color{red}{\underline 3}} + 3k^{\color{red}{\underline 2}} + k^{\color{red}{\underline 1}} \\
\end{align}
$$

이제 합 식을 다음과 같이 꾸밀 수 있게 되었다.

$$
\begin{align}
\sum_{a \le k \lt b} k^3
    & = \sum_{a \le k \lt b} \left( k^{\underline 3} + 3k^{\underline 2} + k^{\underline 1} \right) \\
    & = { k^{\underline 4} \over 4 } + { 3k^{\underline 3} \over 3 } + { k^{\underline 2} \over 2 } \biggr\rvert_a^b \\
    & = { k^{\underline 4} \over 4 } + k^{\underline 3} + { k^{\underline 2} \over 2 } \biggr\rvert_a^b \\
    & = \left( { b^{\underline 4} \over 4 } + b^{\underline 3} + { b^{\underline 2} \over 2 } \right)
        - \left( { a^{\underline 4} \over 4 } + a^{\underline 3} + { a^{\underline 2} \over 2 } \right) \\
\end{align}
$$

그렇다면 $$ \sum_0^n k^3 $$ 은 다음과 같이 구할 수 있을 것이다.

$$
\require{cancel}
\begin{align}
\sum_{0 \le k \lt n} k^3
    & = { n^{\underline 4} \over 4 } + n^{\underline 3} + { n^{\underline 2} \over 2 } \\
    & = { n^{\underline 4} + 4n^{\underline 3} + 2n^{\underline 2} \over 4 } \\
    & = { n(n-1)(n-2)(n-3) + 4n(n-1)(n-2) + 2n(n-1) \over 4 } \\
    & = { n(n-1) \biggr( (n-2)(n-3) + 4(n-2) + 2 \biggr) \over 4 } \\
    & = { n(n-1) ( n^2 - 5n + 6 + 4n -8 + 2 ) \over 4 } \\
    & = { n(n-1) ( n^2 -n ) \over 4 } \\
    & = { n(n-1) \cdot n(n-1) \over 4 } \\
    & = { n^2(n-1)^2 \over 4 } \\
\end{align}
$$

이제 $$0$$부터 $$n-1$$ 까지의 $$k^3$$의 합을 구했으므로 $$\sum_{0 \le k \le n} k^3$$을 구할 수 있다.

다음과 같이 `n` 대신 `n+1`을 대입하면 될 것이다.

$$
\require{cancel}
\begin{align}
\sum_{0 \le k \le n} k^3
    & = { (n+1)^2(n+1-1)^2 \over 4 } \\
    & = { (n+1)^2 \cdot n^2 \over 4 } \\
    & = { n^2(n+1)^2 \over 4 } \\
\end{align}
$$

# Links

* [[CONCRETE-MATH]]
