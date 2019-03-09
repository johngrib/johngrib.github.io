---
layout  : wiki
title   : 구체수학 02.합.06.유한-무한 미적분
summary : 02.SUMS.06.FINITE AND INFINITE CALCULUS
date    : 2018-05-22 16:05:14 +0900
updated : 2018-05-27 16:37:36 +0900
tag     : math
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

### 미분연산자 D

무한 미적분은 미분연산자(derivative operator) D의 성질을 토대로 한다.

$$
Df(x) = \lim_{h \to 0} {f(x+h) - f(x) \over h}
$$

D를 적용하는 방법, 즉 미분하는 방법은 다음과 같다.

고등학교에서 배운 그냥 미분이다.

$$
D(x^m) = mx^{m-1}
$$

### D 연산자의 역함수는 $$\int$$

적분 기호 $$\int$$.

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

나는 다음과 같이 심플하게 이해했다. 고등학교에서 배운 그대로다.

* $$g(x)$$를 적분해서 나온 결과를 $$f(x) + C$$라 하자.
* 그렇다면 $$f(x)$$를 미분하면 $$g(x)$$가 나온다.


### 정적분(definite integrals)

* $$g(x) = Df(x)$$ 이면 다음이 성립한다.
    * ( $$f(x)$$를 미분한 결과가 $$g(x)$$이면 다음이 성립한다. )

$$
\begin{align}
\int_a^b g(x) dx
    & = f(x) \mid_a^b \\
    & = f(b) - f(a) \\
\end{align}
$$

## 유한 미적분(finite calculus)

### 차분연산자 $$\Delta$$

"깔끔하고 체계적인 방식으로 합산에 접근할 수 있다."

유한 미적분은 차분연산자(difference operator) $$\Delta$$의 성질을 토대로 한다.

차분(difference)은 "미분"과 한 글자 차이이므로 외우기도 쉽다.

유한 미적분 버전의 미분이라 생각하면 될 것 같다.

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

$$\Delta$$를 적용하는 방법, 즉 유한 미분(차분)하는 방법은 다음과 같다.

$$x^3$$을 예로 들자면...

$$
\begin{align}
\Delta (x^3)
    & = (x+1)^3 - x^3 \\
    & = (x^3 + 3x^2 + 3x +1) - x^3 \\
    & = 3x^2 + 3x + 1 \\
\end{align}
$$


### $$\Delta$$ 연산자의 역함수는 $$\sum$$

* 반차분(anti-difference) 연산자라고도 한다.

책에 실린 두 연산자의 관계는 다음과 같다.

$$
g(x) = \Delta f(x) \quad \text{if and only if} \quad \sum g(x) \delta x = f(x) + C
$$

차분과 반차분의 관계는 무한 미적분의 미분과 적분의 관계와 비슷하다고 생각하면 될 것 같다.

$$
미분과 \; 적분 \\
차분과 \; 반차분
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



### 정합(definite sums)

무한 미적분에 정적분이 있는 것과 같이, 유한 미적분에는 정합이 있다.

구간이 있는 덧셈, 즉 구간이 있는 반차분이라 생각하면 될 것 같다.

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
    & = \sum_{k=a}^{b-1} \left( - f(k) - f(k+1) \right) \\
\\
    & = - f(a) + \cancel{f(a+1)} \\
    & \quad - \cancel{f(a+1)} + \cancel{f(a+2)} \\
    & \quad - \cancel{f(a+2)} + \cancel{f(a+3)} \\
    & \quad ... \\
    & \quad - \cancel{f(b - 1)} + f(b) \\
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

#### 참고: 망원합(telescoping sum)

위에서 나온 $$\sum (f(k+1) - f(k))$$ 와 같이, 전개했을 때 최초항과 마지막 항만 남는 모양의 합을 망원합(telescoping sum)이라 부른다.

쉽게 표현하자면 다음과 같다.

$$
\begin{align}
\sum_{0 \le k \le n} (f(k+1) - f(k))
    & = \sum_{0 \le k \le n} (-f(k) + f(k+1)) \\
    & = -f(0)+f(1) \\
    & \quad -f(1)+f(2) \\
    & \quad -f(2)+f(3) \\
    & \quad ... \\
    & \quad -f(n)+f(n+1) \\
    & = -f(0)+f(n+1) \\
\end{align}
$$

#### 정합: $$b \lt a$$ 인 경우

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

내림 거듭제곱 $$x^{\underline m}$$을 차분하면 다음과 같이 된다.

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



# 법칙: 내림제곱의 합산

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
\text{내림제곱의 합산(반차분)} \quad
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
    & = { k^{\underline 4} \over 4 } + k^{\underline 3} + { k^{\underline 2} \over 2 } \biggr\rvert_a^b \quad
    \color{gray}{\text{책에는 여기까지만 나와 있다.}} \\
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

# 내림제곱의 또다른 특징

다음과 같이 직접 다루는 것이 가능한 경우가 많다.

다음은 널리 알려진 곱셈 공식이다.

$$
(x+y)^2 = x^2 + 2xy + y^2
$$

이와 유사하게 내림제곱에서도 다음이 가능하다.

$$
(x+y)^{\underline 2} = x^{\underline 2} + 2x^{\underline 1}y^{\underline 1} + y^{\underline 2}
$$

이유는 다음과 같다.

$$
\begin{align}
(x+y)^{\underline 2}
    & = (x+y)(x+y-1) \\
    & = x^2 +xy -x +xy +y^2 -y \\
    & = (x^2 -x) +2xy +(y^2 -y) \\
    & = (x^2 -x^{\underline 1}) +2xy +(y^2 -y^{\underline 1}) \\
    & = x^{\underline 2} +2xy +y^{\underline 2} \\
    & \quad \color{gray}{\because k^2 = k^{\underline 2} + k^{\underline 1}} \\
    & = x^{\underline 2} +2x^{\underline 1}y^{\underline 1} +y^{\underline 2} \\
\end{align}
$$

한편, $$(x+y)^m$$ 과 $$(x+y)^{\underline m}$$ 도 유사한 관계가 있다고 한다.

증명은 5장 연습문제 37번에서 한다.


# 내림제곱의 지수가 - 인 경우

다음과 같이 "더해가며 나누는 것"으로 생각할 수 있을 것이다.

$$
\begin{align}
x^{\underline 3} & = x(x-1)(x-2) \\
x^{\underline 2} & = x(x-1) \\
x^{\underline 1} & = x \\
x^{\underline 0} & = 1 \\
x^{\underline -1} & = { 1 \over (x+1) } \\
x^{\underline -2} & = { 1 \over (x+1)(x+2) } \\
x^{\underline -3} & = { 1 \over (x+1)(x+2)(x+3) } \\
\end{align}
$$

따라서 다음과 같이 정의할 수 있다.

$$
x^{\underline -m} = { 1 \over (x+1)(x+2)...(x+m) }, \quad for \; m \gt 0 \\
$$

지수 `m`에는 실수를 넣을 수도 있고, 복소수를 넣을 수도 있다고 한다.
(숫자 타입이 다 들어가네?)

이에 대해서는 5장에서 다룬다고 한다.

참고로 차분 연산자 또한 내림제곱이 음수일 때에도 성립한다고 한다.

$$
\Delta x^{\underline m} = mx^{\underline{m-1}}
$$

# 내림제곱의 지수법칙

다음은 일반적인 거듭제곱의 지수법칙이다.

$$
x^{m+n} = x^m x^n
$$

내림제곱에서는 다음과 같다.

$$
x^{\underline{m+n}} = x^{\underline m} (x-m)^n, \quad \text{integers m and n}
$$

이유는 다음과 같다.

$$
\begin{align}
x^{\underline{m+n}}
    & = \overbrace{x(x-1)(x-2)...(x-(m+n-1))}^{m+n개} \\
    & = \overbrace{x(x-1)(x-2)...(x-(m-1))}^{m개} \\
    & \quad \times \overbrace{(x-m)(x-(m+1))(x-(m+2))...(x-(m+n-1))}^{n개} \\
\\
    & = x^{\underline m} (x-m)^n \\
\end{align}
$$

# 내림제곱 합산 법칙의 일반화

## $$\ln x$$ 의 이산 버전은 조화수 $$ H_n $$

위에서 언급되었던 내림제곱의 합산 법칙은 다음과 같다.

$$
\begin{align}
\sum_{0 \le k \lt n} k^{\underline{m}}
    & = { k^{\underline{m+1}} \over m+1 } \biggr\rvert_0^n \\
    & = { n^{\underline{m+1}} \over m+1 }, \quad \text{for integers } m, n \ge 0 \\
\end{align}
$$

이제 내림제곱이 음수에 대해서도 작동한다는 것을 알게 되었으므로,
법칙을 다음과 같이 일반화할 수 있다.

$$
\begin{align}
\sum_a^b x^{\underline{m}} \delta x = \frac{x^{\underline{m+1}}}{m+1} \biggr\rvert_a^b, \quad for \; m \ne -1
\end{align}
$$

이제 $$m = -1$$ 인 경우만 알아보면 될 것 같다.

즉, $$x^{\underline{-1}}$$을 반차분한 $$\sum_{0 \le k \lt n} x^{\underline{-1}}$$ 의 해가 어떻게 되는지를 알아내면 된다.

쉽게 표현하자면, 차분했을 때 $$x^{\underline{-1}}$$가 나오는 식 $$f(x)$$를 찾아야 한다.

$$
\Delta f(x) = x^{\underline{-1}} = \frac{1}{x+1}
$$

$$\Delta f(x) = f(x+1) - f(x)$$ 이므로, $$f(x+1) - f(x)$$ 모양을 만족하는 함수를 찾으면 될 것 같다.

참고로 무한 미적분에서 $$x^-1$$을 적분하면 $$\ln x$$가 나온다.

$$ \int_a^b dx = \ln x \biggr\rvert_a^b$$

따라서 이번 과제는 $$\ln x$$의 이산 버전을 찾는 셈이기도 하다.

자 그렇다면 이제 어떻게 찾아야 할지를 열심히 생각해야 한다.

...그런데 책에서 바로 답을 알려준다.

$$
f(x) = \frac{1}{1} + \frac{1}{2} + ... + \frac{1}{x}
$$

아하 이거라면 $$\Delta f(x) = \frac{1}{x+1}$$이 될 것 같다.

이유는 다음과 같다.

$$
\begin{align}
\Delta f(x)
    & = f(x+1) - f(x) \\
    & = (\frac{1}{1} + \frac{1}{2} + ... + \frac{1}{x} + \frac{1}{x+1}) - (\frac{1}{1} + \frac{1}{2} + ... + \frac{1}{x}) \\
    & = \frac{1}{x+1} \\
\end{align}
$$

사실 이것은 예전에 배운 적 있는 조화수 $$H_n$$이다.


$$H_n = \sum_{k=1}^n \frac{1}{k} = \frac{1}{1} + \frac{1}{2} + ... + \frac{1}{n}$$

책에 의하면 이로 인해 $$H_n$$은 연속함수 $$\ln x$$의 이산 버전인 셈이라 한다.

아무튼 $$x^{\underline{-1}}$$을 유한적분한 식이 조화수라는 것도 알게 되었다.

이제 다음과 같이 정리할 수 있다.

$$
\sum_a^b x^{\underline m} \delta x =
\begin{cases}
    { x^{\underline{m+1}} \over m+1 } \biggr\rvert_a^b, & if \; m \ne -1 \\
    H_x \biggr\rvert_a^b & if \; m - -1 \\
\end{cases}
$$

## $$e^x$$의 이산 버전은 $$2^x$$

$$\ln x$$를 찾았는데 $$e^x$$의 이산 버전을 안 찾을 수는 없을 것이다.

참고로 무한 미적분에서의 $$e^x$$는 미분해도 $$e^x$$인 멋지고 유용한 녀석이다.

$$D e^x = e^x$$

그렇다면 유한 미적분에서는 어떨까?

다음의 항등식을 만족시키는 $$f(x)$$를 찾으면 될 것 같다.

$$\Delta f(x) = f(x)$$

다음과 같이 정리할 수 있을 것 같다.

$$
\begin{align}
f(x)
    & = \Delta f(x) \\
    & = f(x+1) - f(x) \\
\\
\therefore 2f(x) & = f(x+1) \\
\end{align}
$$

이는 다음 항으로 갈 때마다 `2`씩 곱해 간다는 의미이다.

심플하게 다음과 같이 정리할 수 있다.

$$
f(x) = 2^x
$$

시험삼아 유한 미분(차분)을 해 보자.

$$
\begin{align}
\Delta f(x) & = f(x+1) - f(x) \\
    & = 2^{x+1} - 2^x \\
    & = 2^x \cdot (2 - 1) \\
    & = 2^x \\
\end{align}
$$

오 정말 자기 자신이 나온다.

그렇다면 `2`가 아니라 다른 수가 있는 경우엔 어떻게 차분할 수 있을까?

다음과 같이 하면 된다.

$$
\begin{align}
\Delta(c^x) & = c^{x+1} - c^x \\
    & = c^x \cdot (c - 1) \\
    & = (c-1)c^x \\
\end{align}
$$

이를 통해 $$c^x$$의 반차분은 $$\frac{c^x}{c-1}$$가 된다는 것을 알 수 있다.
(`c-1`은 상수이므로)

따라서 다음과 같이 정리할 수 있다.

$$
\begin{align}
\sum_{a \le k \lt b} c^k
    & = \sum_a^b c^x \delta x \\
    & = \frac{c^x}{c-1} \biggr\rvert_a^b \\
    & = \frac{c^b}{c-1} - \frac{c^a}{c-1} \\
\\
\therefore
\sum_{a \le k \lt b} c^k
    & = \frac{c^b - c^a}{c-1}, \quad for \; c \ne 1 \\
\end{align}
$$

이것은 고등학교 때 배운 등비수열의 합 일반식을 증명하는 방법이기도 하다.

# 부분합산

이번에는 $$\Delta f(x)g(x)$$ 에 대해 알아보자.

"부분합산은 미적분의 부분적분(integration by parts)에 대응된다."

일단 무한 미적분에서는 다음과 같이 처리한다.

* $$ D(uv) = uDv + vDu $$ &nbsp;
* $$ \int uDv + \int vDu = uv $$ &nbsp;

유한 미적분에서는 다음과 같다.

$$
\begin{align}
\Delta(f(x))
    & = f(x+1) - f(x) \\
    & \color{gray}{\text{ f(x) 에 u(x)v(x) 를 넣어보자 }} \\
\Delta(u(x)v(x))
    & = u(x+1)v(x+1) - u(x)v(x) \\
    & = u(x+1)v(x+1) - u(x)v(x) + \color{red}{ u(x)v(x+1) - u(x)v(x+1) } \\
    & = u(x) \biggr( v(x+1) -v(x) \biggr) + v(x+1) \biggr( u(x+1) - u(x) \biggr)\\
    & = u(x) \Delta v(x) + v(x+1) \Delta u(x) \\
\\
\therefore \Delta uv & = u\Delta v + v\Delta u \\
\end{align}
$$

그리고 일일이 `f(x+1)`을 쓰는 건 귀찮으니 다음과 같은 표기법을 추가하자.

$$ Ef(x) = f(x+1) $$

`E`는 자리이동 연산자(shift operator)라고 부른다.

이제 `E`를 적용하면 다음과 같이 정리할 수 있다.

$$
\begin{align}
\Delta a(x)b(x)
    & = a(x)\Delta b(x) + b(x+1)\Delta a(x) \\
    & = a(x)\Delta b(x) + Eb(x)\Delta a(x) \\
\\
\therefore
\Delta(ab) & = a\Delta b + E b\Delta a
\end{align}
$$

이제 유한/무한 부분미적분을 요약할 수 있다.

* 무한 미적분의 경우: $$ D(uv) = uDv + vDu $$ &nbsp;
* 유한 미적분의 경우: $$ \Delta(uv) = u\Delta v + Ev\Delta u $$ &nbsp;

참고로, 무한 미적분에서는 유한 미적분에서 `f(x+1)`의 `1`이 `0`으로 수렴하기 때문에 `E`가 사라진다.


그리고 양변에 부정합을 취해주면,

$$
\begin{align}
\Delta(uv)
    & = u\Delta v + E v\Delta u \\
    & \color{gray}{\text{ 양 변에 부정합을 취해주자 }} \\
\sum \Delta(uv)
    & = \sum(u\Delta v + E v\Delta u) \\
uv  & = \sum u\Delta v + \sum E v\Delta u \\
\\
\therefore
\sum u\Delta v & = uv - \sum Ev \Delta u
\end{align}
$$

위의 식에 등장하는 세 항 모두에 한계(범위)를 지정하면 부정합은 정합이 된다.
(부정적분이 정적분이 되는 것과 비슷)

## 부분합산의 응용: $$\sum x 2^x \delta x$$

* $$\int xe^x dx$$ &nbsp;
    * 흔히 부분적분으로 적분하는 함수이다.
* $$\sum x2^x \delta x$$ &nbsp;
    * 위의 식의 이산 버전이다.

$$\sum x2^x \delta x$$에 부분합산을 사용해 보자.

일단 다음과 같이 정의하고 풀이를 시작하자.

$$
\begin{align}
x   & = u(x) \\
2^x & = \Delta v(x) \\
\\
그러므로 \\
\\
\Delta u(x) & = 1 \\
v(x) & = 2^x \\
Ev(x) & = 2^{x+1} \\
\end{align}
$$

이를 위에서 얻어낸 공식에 대입하자.

$$
\begin{align}
\sum u\Delta v
    & = uv - \sum Ev \Delta u \\
\sum u(x) \Delta v(x) \delta x
    & = u(x) v(x) - \sum E v(x) \Delta u(x) \delta x \\
\sum x 2^x \delta x
    & = x 2^x - \sum 2^{x+1} \cdot 1 \delta x \\
    & = x 2^x - (2^{x+1} + C ) \\
    & = 2^x ( x - 2 ) - C \\
\end{align}
$$

이제 한계(범위)를 부여하자.

$$
\begin{align}
\sum_{k=0}^n k2^k
    & = \sum_0^{n+1} x2^x \delta x \\
    & = x2^x - 2^{x+1} - C \biggr\rvert_0^{n+1} \\
    & = 2^x(x-2) \biggr\rvert_0^{n+1} \\
    & = \biggr( 2^{n+1}(n+1-2) - C \biggr) - \biggr( 2^0(0-2) - C \biggr) \\
    & = \biggr( 2^{n+1}(n-1) -C \biggr) - \biggr( -2 - C \biggr) \\
    & = 2^{n+1}(n-1) + 2 \\

\end{align}
$$

## 부분합산의 응용: $$\sum_{0 \le k \lt n} kH_k x$$

이번에는 다음을 풀어 보자.

$$
\sum_{0 \le k \lt n} kH_k
$$

일단 다음과 같이 정의하고 풀이를 시작하자.

$$
\begin{align}
H_x & = u(x) \\
x   & = x^{\underline 1} \\
x   & = \Delta v(x) \\
\\
그러므로 \\
\\
\Delta u(x) & = x^{\underline{-1}} \\
v(x) & = \frac{x^{\underline 2}}{2} \\
Ev(x) & = \frac{(x+1)^{\underline 2}}{2} \\
\end{align}
$$

이를 위에서 얻은 공식에 대입하자.

`uv` 순서를 지켜야 덜 헷갈리므로 $$ \sum_{0 \le k \lt n} kH_k $$를 $$\sum_{0 \le k \lt n} H_k k $$로 바꾸고 푸는 쪽이 좋을 것 같다.

$$
\begin{align}
\sum u\Delta v
    & = uv - \sum Ev \Delta u \\
\sum u(x) \Delta v(x) \delta x
    & = u(x) v(x) - \sum E v(x) \Delta u(x) \delta x \\
\\
\sum H_x x \delta x
    & = H_x \frac{x^{\underline 2}}{2} - \sum \frac{(x+1)^{\underline 2}}{2} x^{\underline{-1}} \delta x \\
    & = H_x \frac{x^{\underline 2}}{2} - \frac{1}{2} \sum (x+1)^{\underline 2} x^{\underline{-1}} \delta x \\
    & = H_x \frac{x^{\underline 2}}{2} - \frac{1}{2} \sum (x+1)(x) x^{\underline{-1}} \delta x \\
    & = H_x \frac{x^{\underline 2}}{2} - \frac{1}{2} \sum (x+1)(x) \frac{1}{x+1} \delta x \\
    & = H_x \frac{x^{\underline 2}}{2} - \frac{1}{2} \sum x \delta x \\
    & = H_x \frac{x^{\underline 2}}{2} - \frac{1}{2} \sum x^{\underline 1} \delta x \\
    & = H_x \frac{x^{\underline 2}}{2} - \frac{1}{2} ( \frac{x^{\underline 2}}{2} + C ) \\
    & = H_x \frac{x^{\underline 2}}{2} - \frac{x^{\underline 2}}{4} + C \\
    & = \frac{x^{\underline 2}}{2}(H_x - \frac{1}{2}) + C \\
\end{align}
$$

이제 한계(범위)를 주자.

$$
\begin{align}
\sum_{0 \le k \lt n} kH_k
    & = \sum_0^n xH_x \delta x \\
    & = \frac{x^{\underline 2}}{2}(H_x - \frac{1}{2}) + C \biggr\rvert_0^n \\
    & = \biggr( \frac{n^{\underline 2}}{2}(H_n - \frac{1}{2}) \biggr)
    -
    \biggr( \frac{0^{\underline 2}}{2}(H_0 - \frac{1}{2}) \biggr) \\
    & = \frac{n^{\underline 2}}{2}(H_n - \frac{1}{2}) \\
\end{align}
$$



# 차분 목록

다음은 책에 있는 지금까지 나온 차분 식을 옮겨온 것이다.

* 왼쪽 열의 식을 차분하면 오른쪽 열이 나온다.
* 오른쪽 열의 식을 반차분하면 왼쪽 열이 나온다.

예를 들어 첫번째 행은 "$$x^{\underline 0}$$을 차분하면 $$0$$이 된다"로 보면 적당하다.

| $$f=\sum g$$                     | $$\Delta f=g$$                       | 참고               |
|----------------------------------|--------------------------------------|--------------------|
| $$x^{\underline 0}=1$$           | 0                                    |                    |
| $$x^{\underline 1}=x$$           | 1                                    |                    |
| $$x^{\underline 2}=x(x-1)$$      | $$2x$$                               |                    |
| $$x^{\underline m}$$             | $$mx^{\underline{m-1}}$$             |                    |
| $$\frac{x^{\underline m}}{m+1}$$ | $$x^{\underline{m}}$$                | $$m\ne-1$$인 경우  |
| $$H_x$$                          | $$x^{\underline{-1}}=\frac{1}{x+1}$$ | $$m=1$$인 경우     |
| $$2^x$$                          | $$(2-1)2^x = 2^x$$                   | c는 상수           |
| $$c^x$$                          | $$(c-1)c^x$$                         | c는 상수           |
| $$\frac{c^x}{c-1}$$              | $$c^x$$                              | c는 상수           |
| $$cu$$                           | $$c\Delta u$$                        | c는 상수           |
| $$uv$$                           | $$u\Delta v + Ev \Delta u$$          | $$Ef(x) = f(x+1)$$ |




# Links

* [[CONCRETE-MATH]]
