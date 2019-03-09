---
layout  : wiki
title   : 구체수학 02.합.02.합과 점화식
summary : 02.SUMS.02.SUMS AND RECURRENCES
date    : 2018-05-02 22:02:21 +0900
updated : 2018-05-21 21:25:46 +0900
tag     : math
toc     : true
public  : true
parent  : study-concrete-math
latex   : true
---
* TOC
{:toc}

이 문서는 [[CONCRETE-MATH]] **2장.합 - 2.합과 점화식**을 공부한 노트입니다.

$$
S_n = \sum_{k = 0}^{n} a_k
$$

위의 식은 다음과 같다.

$$ S_n = a_0 + a_1 + a_2 + ... + a_n $$

한편으로는 다음 점화식과 같다고도 볼 수 있다.

$$
\begin{align}
S_0 & = a_0;  \\
S_n & = S_{n-1} + a_n, \quad for \; n \gt 0   \\
\end{align}\tag{2.6}\label{2.6}
$$

# 예제

다음과 같은 식이 있다고 하자.

* $$a_n$$은 n을 몇 배 하고 어떤 상수를 더한 것이다.

그렇다면 다음과 같이 점화식을 꾸밀 수 있을 것이다.

$$
\begin{align}
R_0 & = \alpha;   \\
R_n & = R_{n - 1} + \beta + \gamma \cdot n, \quad for \; n \gt 0 \\
\end{align}\tag{2.7}\label{2.7}
$$

python 으로 표현하자면 다음과 같을 것이다.

```python
def R(n):
    if n == 0:
        return alpha
    return R(n-1) + beta + gamma * n

# alpha, beta, gamma의 값은 아직 모른다
```

작은 값들부터 넣어보며 생각해보면 다음을 알 수 있다.

$$
\begin{align}
R_0 & = \alpha;   \\
R_1 & = R_0 + \beta + \gamma    \\
    & = \alpha + \beta + \gamma \\
R_2 & = R_1 + \beta + \gamma \cdot 2    \\
    & = \alpha + 2 \beta + 3 \gamma     \\
...
\end{align}
$$

이를 다음과 같이 일반해로 유도해내자.

$$
R_n = A(n) \alpha + B(n) \beta + C(n) \gamma
$$

그리고 다음과 같은 경우들을 생각해보자.

### R_n = 1 인 경우

$$R_n = 1$$ 이라면

$$
\begin{align}
R_0 & = A(0) \alpha + B(0) \beta + C(0) \gamma \\
    & = \color{red}{\alpha = 1} \\
\\
R_1 & = A(1) \alpha + B(1) \beta + C(1) \gamma \\
    & = R_0  + (\beta + \gamma \cdot 1) \\
    & = \color{red}{\alpha  + \beta + \gamma = 1} \\
\\
R_2 & = A(2) \alpha + B(2) \beta + C(2) \gamma \\
    & = R_1 + (\beta + \gamma \cdot 2)\\
    & = (\alpha  + \beta + \gamma) + (\beta + \gamma \cdot 2)\\
    & = \color{red}{\alpha  + 2 \beta + 3 \gamma = 1} \\
\\
& \left.
    \begin{array}{ll}
        \alpha & = 1 \\
        \alpha + \beta + \gamma & = 0 \\
        \alpha + 2\beta + 3\gamma & = 0 \\
    \end{array}
\right\}
\text{ 이므로}
\\
\therefore & \; \alpha = 1, \; \beta = 0, \; \gamma = 0 \\
\\
R_n & = A(n) \alpha + B(n) \beta + C(n) \\
    & = A(n) \cdot 1 + B(n) \cdot 0 + C(n) \cdot 0 \\
\\
A(n)    & = 1 \quad \because R_n = 1 \\
\end{align}
$$

* 잘 생각해 보면 이 점화식대로라면, $$R_n$$의 값이 무엇이건 간에 $$A(n) = 1$$ 이라는 것을 알 수 있다.
    * $$\alpha$$는 초항이므로, 합을 몇 번이고 반복해도 딱 한 번만 더하기 때문이다.
* $$B(n), C(n)$$은 `0`과 곱하므로 지금 시점에서는 알아낼 방법이 없다.

## R_n = n 인 경우

$$R_n = n$$ 이라면

$$
\begin{align}
R_0 & = A(0) \alpha + B(0) \beta + C(0) \gamma \\
    & = \color{red}{\alpha = 0} \\
R_1 & = A(1) \alpha + B(1) \beta + C(1) \gamma \\
    & = \color{red}{\alpha  + \beta + \gamma = 1} \\
R_2 & = A(2) \alpha + B(2) \beta + C(2) \gamma \\
    & = \color{red}{\alpha  + 2 \beta + 3 \gamma = 2} \\
\\
\therefore & \; \alpha = 0, \; \beta = 1, \; \gamma = 0 \\
\\
R_n & = A(n) \alpha + B(n) \beta + C(n) \gamma \\
    & = A(n) \cdot 0 + B(n) \cdot 1 + C(n) \cdot 0 \\
\\
B(n) & = n \quad \because R_n = n \\
\end{align}
$$

* 잘 생각해 보면 이 점화식대로라면, $$R_n$$의 값이 무엇이건 간에 $$B(n) = n$$ 라는 것을 알 수 있다.
    * 더하는 항의 수 만큼 $$\beta$$가 증가하기 때문이다.
* $$A(n), C(n)$$은 `0`과 곱하므로 지금 시점에서는 알아낼 방법이 없다.

## R_n = n^2 인 경우

$$R_n = n^2$$ 이라면

$$
\begin{align}
R_0 & = A(0) \alpha + B(0) \beta + C(0) \gamma \\
    & = \color{red}{\alpha = 0} \\
R_1 & = A(1) \alpha + B(1) \beta + C(1) \gamma \\
    & = \color{red}{\alpha  + \beta + \gamma = 1} \\
R_2 & = A(2) \alpha + B(2) \beta + C(2) \gamma \\
    & = \color{red}{\alpha  + 2 \beta + 3 \gamma = 4} \\
\\
\therefore & \; \alpha = 0, \; \beta = -1, \; \gamma = 2 \\
\\
B(n) & = n \\
& \because R_n = \alpha + n \cdot \beta + C(n) \gamma
\\
\\
R_n & = n^2 \\
    & = A(n) \alpha + B(n) \beta + C(n) \gamma \\
    & = - B(n) + 2 C(n) \\
n^2 & = - B(n) + 2 C(n) \\
    & = - n + 2 C(n) \\
n^2 & + n = 2 C(n) \\
\\
C(n) & = \frac{n^2 + n}{2} \\
\end{align}
$$

* 잘 생각해 보면 이 점화식대로라면, $$R_n$$의 값이 무엇이건 간에 $$C(n) = \frac{n^2 + n}{2}$$ 라는 것을 알 수 있다.
    * $$\frac{n(n+1)}{2} \cdot \gamma = 1 \cdot \gamma + 2 \cdot \gamma + ... + n \cdot \gamma$$ 이기 때문이다.
* $$A(n)$$은 `0`과 곱하므로 지금 시점에서는 알아낼 방법이 없다.

## 응용

다음과 같은 합이 있다고 하자.

$$\sum_{k = 0}^n (a + bk)$$

python으로는 다음과 같을 것이다.

```python
def sigma(n):
    sum = 0
    for k in range(0, n+1):
        sum += a + b*k
    return sum
```

위 합의 점화식은 다음과 같다.

$$
\begin{align}
S_0 & = a;  \\
S_n & = S_{n-1} + a + bn, \quad for \; n \gt 0   \\
\end{align}
$$

python으로는 다음과 같을 것이다.

```python
def S(n):
    if n == 0:
        return a
    return S(n-1) + a + (b*n)
```


그렇다면 $$\eqref{2.7}$$과 같은 방식으로, 다음과 같이 점화식을 꾸밀 수 있다.

$$
\begin{align}
R_0 & = \alpha;   \\
R_n & = \color{gray}{R_{n - 1} + \beta + \gamma \cdot n}, \quad for \; n \gt 0 \\
    & = R_{n - 1} + a     + b \cdot n \\
\end{align}
$$

모양이 같으므로, 어렵지 않게 다음의 사실을 알아낼 수 있다.

$$
\begin{align}
a   & = \alpha \quad \because S_0 = R_0 \\
a   & = \beta \\
b   & = \gamma \\
\end{align}
$$

이를 $$ A(n) \alpha + B(n) \beta + C(n) \gamma $$ 에 대입해보면 다음과 같이 될 것이다.

$$
\begin{align}
aA(n) & + aB(n) + bC(n) \\
    & = a \cdot 1 + a \cdot n + b \cdot \frac{n^2 + n}{2} \\
    & = a(n + 1) + \frac{b(n+1)n}{2} \\
R_n & = a(n + 1) + \frac{b(n+1)n}{2} \\
\end{align}
$$

## 검증

검증해보고 싶다.

$$\sum_{k = 0}^n (a + bk)$$

이를 풀어 쓰면 구조를 이해하기 쉬울 것 같다.

$$
\begin{align}
& \sum_{k = 0}^n (a + 7k) \\
& = \underbrace{(a + b \cdot 0) + (a + b \cdot 1) + (a + b \cdot 2) + ... + (a + b \cdot n)}_{n+1 개} \\
\\
& \text{0 ~ n 까지 모두 n + 1 개의 항이 있으므로} \\
\\
& = a \cdot (n + 1) + b \cdot (0 + 1 + 2 + ... + n) \\
& = a \cdot (n + 1) + b \cdot \frac{(n+1)(0 + n)}{2} \\
& = a \cdot (n + 1) + b \cdot \frac{(n+1)n}{2} \\
\end{align}
$$

일반해와 똑같은 모양이 나왔다.

# 예제: 하노이의 탑

하노이의 탑 점화식은 다음과 같다.

$$
\begin{align}
T_0 & = 0; \\
T_n & = 2T_{n-1} + 1, \quad for \; n \gt 0. \\
\end{align}
$$

```python
def T(n):
    if n == 0:
        return 0
    return 2*T(n-1) + 1
```

양변을 $$2^n$$으로 나누면 $$\eqref{2.6}$$과 같은 모양이 된다.

$$
\begin{align}
\frac{T_0}{2^n} & = 0; \\
\frac{T_n}{2^n} & = \frac{2T_{n-1}}{2^n} + \frac{1}{2^n}, \quad for \; n \gt 0. \\
\\
S_n & = \frac{T_n}{2^n} \; \text{이라 하자.} \\
\\
S_n & = \frac{T_n}{2^n} \\
    & = S_{n-1} + 2^{-n}, \quad for \; n \gt 0. \\
\end{align}
$$

```python
def S(n):
    if n == 0:
        return 0
    return S(n-1) + 2**(-n)

def T(n):
    return S(n) * (2**n)
```

그렇다면 $$2^{-n}$$씩 더해가는 것이므로 다음과 같이 표현할 수 있다.

$$
\begin{align}
S_n & = \sum_{k = 1}^n 2^{-k} \\
    & = \left(\frac{1}{2}\right)^1 + \left(\frac{1}{2}\right)^2 + ... + \left(\frac{1}{2}\right)^n \\
\end{align}
$$

```python
def S(n):
    sum = 0
    for k in range(1, n+1):
        sum += 2**(-k)
    return sum

def T(n):
    return S(n) * (2**n)
```

고등학교 때 배운 등비수열의 합 공식 $$S_n = \frac{S_1 \cdot (r^n - 1)}{r - 1}$$ 을 적용해 보면

$$
\begin{align}
S_n & = \sum_{k = 1}^n 2^{-k} \\
    & = {\frac{1}{2} \cdot ((\frac{1}{2})^n - 1) \over \frac{1}{2} - 1} \\
    & = - \left(\frac{1}{2}\right)^n + 1 \\
\frac{T_n}{2^n}
    & = - \left(\frac{1}{2}\right)^n + 1 \\
T_n & = - 1 + 2^n \\
\end{align}
$$

따라서 하노이의 탑에 `n`개의 원판이 있을 때, 이를 옮기는 최소한의 횟수는 $$2^n - 1$$ 임을 알 수 있다.

```python
# 최적화 완료
def T(n):
    return 2**n - 1
```

## 일반화

위의 풀이법을 사용하면 다음 형태의 점화식을 일반화할 수 있을 것 같다.

$$
a_n T_n = b_n T_{n-1} + c_n
    \tag{2.9}\label{2.9}
$$

양 변에 $$s_n$$을 곱하자. (단, $$s_n b_n = s_{n-1} a_{n-1}$$.)

$$
\begin{align}
s_n a_n T_n
    & = \color{red}{s_n     b_n}     T_{n-1} + s_n c_n \\
    & = \color{red}{s_{n-1} a_{n-1}} T_{n-1} + s_n c_n \\
\\
S_n & = (S_{n-1}) + s_n c_n \quad \color{gray}{(S_n = s_n a_n T_n \text{이라 하자})} \\
    & = (S_{n-2} + s_{n-1} c_{n-1}) + s_n c_n \quad \color{gray}{(재귀)} \\
    & = (S_{n-3} + s_{n-2} c_{n-2} + s_{n-1} c_{n-1}) + s_n c_n \quad \color{gray}{(재귀)} \\
    & ... \\
    & = S_0 + s_1 c_1 + s_2 c_2 + ... + s_n c_n \\
    & = s_0 a_0 T_0 + \sum_{k = 1}^n s_k c_k \\
    & = s_1 b_1 T_0 + \sum_{k = 1}^n s_k c_k \\
\end{align}
$$

$$
\begin{align}
한편, \; & S_n = s_n a_n T_n \quad 이므로 \\
T_n & = \frac{1}{s_n a_n} \cdot S_n \\
    & = \frac{1}{s_n a_n} \left( s_1 b_1 T_0 + \sum_{k = 1}^n s_k c_k \right) \\
\end{align}
\tag{2.10}\label{2.10}
$$

## 검증

위의 일반해를 하노이의 탑으로 검증해 보자.

하노이의 탑 점화식은 다음과 같았다.

$$
\begin{align}
T_0 & = 0; \\
T_n & = 2T_{n-1} + 1, \quad for \; n \gt 0. \\
\end{align}
$$

일반화에 사용한 형태의 점화식이 다음과 같았으므로,

$$ a_n T_n = b_n T_{n-1} + c_n $$

하노이의 탑에서 각 변수의 값은 다음과 같다.

* $$ a_n = 1 $$ &nbsp;
* $$ b_n = 2 $$ &nbsp;
* $$ c_n = 1 $$ &nbsp;
* $$ T_0 = 0 $$ &nbsp;

따라서 일반해는 다음과 같다.

$$
\require{cancel}
\begin{align}
s_n b_n & = s_{n-1}a_{n-1} \; 이므로 \\
s_n \cdot 2 & = s_{n-1} \\
s_n & = 2^{-n} \\
\\
T_n & = \frac{1}{s_n a_n} \left( s_1 b_1 T_0 + \sum_{k = 1}^n s_k c_k \right) \\
    & = \frac{1}{s_n a_n} \left(\sum_{k = 1}^n s_k c_k \right) \\
    & = \frac{1}{s_n} \left(\sum_{k = 1}^n s_k \right) \\
    & = 2^n \sum_{k = 1}^n 2^{-k} \\
    & = 2^n {\cancel{\frac{1}{2}} ( 1 - (\frac{1}{2})^n ) \over \cancel{1 - \frac{1}{2}}} \\
    & = 2^n - 2^n \cdot \frac{1}{2^n} \\
    & = 2^n - 1 \\
\end{align}
$$

# 예제: quick-sort 퀵 소트

퀵 소트의 점화식은 다음과 같다.

$$
\begin{align}
C_0 & = 0; \\
C_1 & = 0; \\
C_n & = n + 1 + \frac{2}{n} \sum_{k=0}^{n-1} C_k , \quad for \; n \gt 1. \\
C_n & = \text{n개 항목을 퀵 소트로 정렬할 때 비교 횟수의 평균} \\
\end{align}
$$

점화식을 정리해 보자.

일단 양 변에 `n`을 곱해서, 분모의 `n`을 제거한다.

$$
\begin{align}
C_n
    & = n + 1 + \frac{2}{n} \sum_{k=0}^{n-1} C_k , \quad for \; n \gt 1. \\
n \cdot C_n
    & = n^2 + n + 2 \sum_{k=0}^{n-1} C_k , \quad for \; n \gt 1. \\
\\
n을 & \; n-1 \text{로 대체한다.} \\
(n - 1) \cdot C_{n-1}
    & = (n-1)^2 + (n-1) + 2 \sum_{k=0}^{n-2} C_k , \quad for \; n - 1 \gt 1. \\
\end{align}
$$

위의 식에서 아래 식을 빼보자.

$$
\begin{array}{c|rllll}
    & n \cdot C_n
    & = n^2
    & + n
    & + 2 \sum_{k=0}^{n-1} C_k \\
{\color{red}-}
    & (n - 1) \cdot C_{n-1}
    & = (n-1)^2
    & + (n-1)
    & + 2 \sum_{k=0}^{n-2} C_k \\
\hline
    & nC_n - (n-1)C_{n-1}
    & =
    & 2n
    & + 2C_{n-1}
\end{array}
$$

즉, 다음과 같다.

$$
\begin{align}
nC_n - (n-1)C_{n-1}
    & = 2n + 2C_{n-1}, & \quad for \; n \gt 2. \\
nC_n
    & = 2n + 2C_{n-1} + (n - 1)C_{n-1} \\
nC_n
    & = 2n + (n + 1)C_{n-1} \\
\end{align}
$$

그리고 점화식은 다음과 같이 정리된다.

$$
\begin{align}
C_0 & = 0; \\
C_1 & = 0; \\
C_2 & = 3; \\
n C_n & = (n+1) C_{n-1} + 2n , \quad for \; n \gt 2. \\
\end{align}
$$

식 $$\eqref{2.9}$$를 참고해 꾸며보자.

$$
\begin{align}
a_n T_n & = b_n T_{n-1} + c_n \\
n C_n   & = (n+1) C_{n-1} + 2n \\
\\
a_n & = n \\
b_n & = n + 1 \\
c_1 & = 0 \quad \because C_1 = 0 + 0 \\
c_2 & = 6 \quad \because 2 C_2 = 3 C_1 + c_2 \\
c_n & = 2n \\
\\
s_n b_n
    & = s_{n-1} a_{n-1} \; 에서 \\
s_n & = s_{n-1} \cdot \frac{a_{n-1}}{b_n} \\
    & = (s_{n-2} \cdot \frac{a_{n-2}}{b_{n-1}}) \cdot \frac{a_{n-1}}{b_n} \\
    & = { a_1 a_2 ... a_{n-1} \over b_2 b_3 ... b_n } \\
    & = { 1 \cdot 2 \cdot ... \cdot n-1 \over 3 \cdot 4 \cdot ... \cdot (n-1) \cdot n \cdot (n + 1)} \\
    & = { 1 \cdot 2 \over n (n + 1)} \\
\end{align}
$$

식 $$\eqref{2.10}$$을 적용하자.

$$
\require{cancel}
\begin{align}
T_n & = \frac{1}{s_n a_n} \left( s_1 b_1 T_0 + \sum_{k = 1}^n s_k c_k \right) \\
C_n & = { 1 \over \frac{1 \cdot 2}{n(n+1)} \cdot n } \left( s_1 b_1 C_0 + \sum_{k = 1}^n s_k c_k \right) \\
    & = { 1 \over \frac{1 \cdot 2}{\cancel{n}(n+1)} \cdot \cancel{n} } \left( \sum_{k = 1}^n s_k c_k \right) \\
    & = { n + 1 \over 2 } \sum_{k = 1}^n s_k c_k \\
    & = { n + 1 \over 2 } \sum_{k = 1}^n {2 \over k(k+1)} \cdot c_k \\
    & = (n + 1) \sum_{k = 1}^n {1 \over k(k+1)} \cdot c_k \\
    & = (n + 1)
        \left(
            \frac{1}{1 \cdot 2} \cdot 0
            + \frac{1}{2 \cdot 3} \cdot 6
            + \sum_{k = 3}^n {1 \over k(k+1)} \cdot c_k
        \right)\\
    & = (n + 1)
        \left( 0 + 1 + \sum_{k = 3}^n {1 \over k(k+1)} \cdot 2k \right)\\
    & = 2(n + 1)
        \left( \frac{1}{2} + \sum_{k = 3}^n {1 \over \cancel{k}(k+1)} \cdot \cancel{k} \right)\\
    & = 2(n + 1)
        \left( \frac{1}{2} + \sum_{k = 3}^n {1 \over k+1} \right)\\
    & = 2(n + 1)
        \left( \frac{1}{2} + \sum_{k = 1}^n {1 \over k+1} - \frac{1}{1+1} - \frac{1}{1+2} \right)\\
    & = 2(n + 1)
        \left( \sum_{k = 1}^n {1 \over k+1} - \frac{1}{3} \right)\\
    & = 2(n + 1) \sum_{k = 1}^n {1 \over k+1} - \frac{2(n+1)}{3}, \quad for \; n \gt 1. \\
\end{align}
$$

## 퀵 소트 점화식의 닫힌 형식

위에서 얻은 퀵 소트 점화식의 해는 다음과 같았다.

$$
\begin{align}
C_n & = 2(n + 1) \sum_{k = 1}^n {1 \over k+1} - \frac{2(n+1)}{3}, \quad for \; n \gt 1. \\
\end{align}
$$

해를 잘 살펴보면 [조화수(Harmonic number)](https://ko.wikipedia.org/wiki/%EC%A1%B0%ED%99%94%EC%8%98 )가 식의 중간에 들어가 있음을 알 수 있다.

$$
\begin{align}
조화수 \, H_n
    & = 1 + \frac{1}{2} + ... + \frac{1}{n} \\
    & = \sum_{k=1}^n \frac{1}{k} \\
\end{align}
$$

퀵 소트 점화식의 해를 조화수를 사용해 정리해 보자.

$$ \sum_{k=1}^n \frac{1}{k+1} $$ 만 떼어서 작업하는 쪽이 편할 것 같다.

$$
\begin{align}
\sum_{k=1}^n \frac{1}{k+1}
    & = \sum_{k=2}^{n+1} \frac{1}{k} \\
    & = \sum_{k=1}^{n+1} \frac{1}{k} - \frac{1}{1} \\
    & = \sum_{k=1}^{n} \frac{1}{k} - \frac{1}{1} + \frac{1}{n+1} \\
    & = \sum_{k=1}^{n} \frac{1}{k} - \frac{n}{n+1} \\
    & = H_n - \frac{n}{n+1} \\
\\
\end{align}
$$

간단하게 된 합을 적용해 보자.

$$
\require{cancel}
\begin{align}
C_n & = 2(n + 1) \sum_{k = 1}^n {1 \over k+1} - \frac{2(n+1)}{3}, \quad for \; n \gt 1. \\
    & = 2(n + 1) (H_n - \frac{n}{n+1}) - \frac{2(n+1)}{3} \\
    & = 2(n + 1) H_n - \frac{2 \cancel{(n+1)}n}{\cancel{n+1}} - \frac{2(n+1)}{3} \\
    & = 2(n + 1) H_n - 2n - \frac{2(n+1)}{3} \\
    & = 2(n + 1) H_n - 2n - \frac{2n}{3} - \frac{2}{3} \\
    & = 2(n + 1) H_n - \frac{8n}{3} - \frac{2}{3}, \quad for \; n \gt 1. \\
\end{align}
$$


# Links

* [[CONCRETE-MATH]]
* [조화수(wikipedia)](https://ko.wikipedia.org/wiki/%EC%A1%B0%ED%99%94%EC%88%98 )
