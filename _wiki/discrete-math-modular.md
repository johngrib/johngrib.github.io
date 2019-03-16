---
layout  : wiki
title   : 모듈러 연산(나머지 연산)
summary : Modular Arithmetic
date    : 2019-02-17 21:58:31 +0900
updated : 2019-03-16 23:25:56 +0900
tag     : math
toc     : true
public  : true
parent  : study-discrete-mathematics
latex   : true
---
* TOC
{:toc}

# 정의

## 나눗셈 알고리즘

**THE DIVISION ALGORITHM**

> Let $$a$$ be an integer and $$d$$ a positive integer.
Then there are unique integers $$q$$ and $$r$$,
with $$0 ≤ r < d$$, such that $$a = dq + r$$.

* 정수 $$ a $$와 양의 정수 $$ d $$ 에 대하여
    * $$ 0 \le r \lt d $$ 이고, $$ a = dq + r $$ 을 만족하는 $$ q $$와 $$ r $$ 이 유일하게 존재한다.
    * $$ r $$이 나머지. 즉 나머지는 0 보다 크다.

## div 와 mod

>
In the equality given in the division algorithm,
d is called the divisor,
a is called the dividend,
q is called the quotient,
and r is called the remainder.
This notation is used to express the quotient and remainder:  
$$
\begin{align}
q & = a \text{ div } d \\
r & = a \bmod d \\
\end{align}
$$

* `mod` 는 Java, Python 과 같은 프로그래밍 언어에서의 `%` 와 같다.
* $$ 7 = 2 \times 3 + 1$$ 인 경우
    * $$2 = 7 \text{ div } 3 $$.
    * $$ 7 \bmod 2 = 1 $$.

음수의 나눗셈은 어떻게 될까?

* $$ -7 = 2 \times (-4) + 1$$ 로 생각한다.
    * 나머지 $$ r $$은 $$ 0 \le r \lt 2 $$ 여야 한다.
    * $$ -7 \bmod 2 = 1 $$.

## 모듈로 합동

**congruent modulo**

>
If $$a$$ and $$b$$ are integers and $$m$$ is a positive integer,
then $$a$$ is congruent to $$b$$ modulo $$m$$ if $$m$$ divides $$a − b$$.
We use the notation $$a ≡ b \ (\bmod m)$$ to indicate that $$a$$ is congruent to $$b$$ modulo $$m$$.
We say that $$a ≡ b \ (\bmod m)$$ is a **congruence** and that $$m$$ is its **modulus**(plural moduli).
If $$a$$ and $$b$$ are not congruent modulo $$m$$, we write $$ a \not ≡ b \ (\bmod m)$$.

* 정수 $$ a, b $$와 양의 정수 $$ m $$에 대하여
    * $$ a - b $$ 가 $$m$$ 으로 나누어 떨어진다면,
        * $$a$$와 $$b$$는 **모듈로 $$m$$ 합동(a is congruent to b modulo m)**이다.
* 모듈로 $$m$$ 합동의 표기. $$ a ≡ b \ (\bmod m) $$.
* 모듈로 $$m$$ 합동이 아님의 표기. $$ a \not ≡ b \ (\bmod m) $$.

### 모듈로 합동의 필요충분조건

>
Let $$a$$ and $$b$$ be integers, and let $$m$$ be $$a$$ positive integer.
Then $$a ≡ b \ (\bmod m)$$ if and only if $$a \bmod m = b \bmod m$$.

* $$ a \equiv b \ (\bmod m) $$ 의 필요충분조건은
    * $$ a \bmod m = b \bmod m $$.

>
Let $$m$$ be a positive integer.
The integers $$a$$ and $$b$$ are congruent modulo $$m$$
if and only if there is an integer $$k$$ such that $$a = b + km$$.

* 정수 $$ a, b $$ 가 모듈로 $$m$$ 합동이기 위한 필요충분조건은
    * $$ a = b + km $$ 을 만족하는 $$ k $$ 의 존재이다.
    * $$ a - b = km $$ 이란 뜻이므로, 당연한 말이다.

### 모듈로 m 합동 클래스

>
The set of all integers congruent to an integer $$a$$ modulo $$m$$
is called the congruence class of $$a$$ modulo $$m$$.

* 정수 $$ a $$와 모듈로 $$ m $$합동인 모든 정수의 집합을
    * "$$ a $$와 모듈로 $$ m $$ 합동 클래스"라 부른다.
* 예를 들어 $$ \{ ...-19, -9, 1, 11, 21, 31, ... \} $$ 은 1과 모듈로 10 합동 클래스다.
    * (10으로 나누면 나머지가 1 나오는 모든 정수의 집합).

## 모듈로 연산

>
Let $$m$$ be a positive integer.  
If $$a ≡ b \ (\bmod m)$$ and $$c ≡ d \ (\bmod m)$$,  
then $$a + c ≡ b + d \ (\bmod m)$$ and $$ac ≡ bd \ (\bmod m)$$.

* 양의 정수 $$ m $$에 대하여
    * $$a ≡ b \ (\bmod m)$$ 이고 $$c ≡ d \ (\bmod m)$$ 이면,
    * $$a + c ≡ b + d \ (\bmod m)$$ 이고 $$ac ≡ bd \ (\bmod m)$$ 이다.
* 양의 정수 $$ m $$에 대하여
    * $$a$$와 $$b$$ 가 $$m$$ 으로 나눴을 때의 나머지가 같고, $$c$$와 $$d$$가 $$m$$으로 나눴을 때의 나머지가 같다면
    * $$a + c ≡ b + d \ (\bmod m)$$ 이고 $$ac ≡ bd \ (\bmod m)$$ 이다.

>
Let $$m$$ be a positive integer and let $$a$$ and $$b$$ be integers.
Then $$(a + b) \bmod m = ((a \bmod m) + (b \bmod m)) \bmod m$$  
and  
$$a \times b \bmod m = ((a \bmod m) \times (b \bmod m)) \bmod m.$$

## 산술 모듈로 m

**Arithmetic Modulo m**

* $$ m $$ 보다 작고 음이 아닌 정수의 집합, $$ Z_m = \{ 0, 1, ..., m-1 \} $$.

연산자 정의

* $$ +_m $$: $$ Z_m $$ 의 두 원소에 대해 덧셈을 하고 $$ \bmod m $$ 한다.
    * $$ a +_m b = (a + b) \bmod m $$.
* $$ \cdot_m $$: $$ Z_m $$ 의 두 원소에 대해 곱셈을 하고 $$ \bmod m $$ 한다.
    * $$ a \cdot_m b = (a \times b) \bmod m $$.

위의 두 연산자를 사용할 때 **산술 모듈로 m 한다**(we are said to be doing arithmetic modulo m)고 말한다.

위의 두 연산자는 다음을 만족한다.

* $$a \in Z_m, b \in Z_m, c \in Z_m$$이면,
    * 폐쇄(closure): $$a+_m b \in Z_m $$이고 $$a \cdot_m b \in Z_m $$이다.
    * 결합성(associativity): $$(a+_m b)+_m c =a+_m(b+_m c)$$ 이고 $$(a\cdot_m b)\cdot_m c =a\cdot_m(b \cdot_m c)$$ 이다.
    * 교환성(commutativity): $$a+_m b \in Z_m $$이고 $$a \cdot_m b \in Z_m $$이다.
    * 항등원(identity elements): 0과 1은 각각 모듈로 m 합과 곱의 항등원이다.
    * 덧셈법 역원(additive inverses): $$ a \not = 0 $$ 이고 $$ a \in Z_m $$ 이면, $$ m - a $$ 는 a 모듈로 m 의 덧셈법 역원이다.
        * $$ a+_m (m-a) = 0 $$ 이고, $$ 0 +_m 0 = 0 $$ 이다.
    * 분배성(distributivity): $$a \cdot_m(b +_m c) = (a \cdot_m b)+_m(a \cdot_m c)$$ 이고, $$(a+_m b) \cdot_m c = (a\cdot_m c)+_m(b \cdot_m c)$$ 이다.

모듈로 m 합을 갖는 $$ Z_m $$ 은 교환 그룹(commutative group) 이라 불린다.

두 연산을 모두 갖는 $$ Z_m $$ 은 교환 고리(commutative ring) 이라 불린다.

# 알고리즘

## 기본적인 몫과 나머지 구하기

* 다음 함수는 몫과 나머지를 계산하는 기본적인 알고리즘을 js로 구현한 것이다.
    * 이 알고리즘은 $$ O(q \log a) $$ 의 비트 동작을 사용한다.

```js
// a: integer
// b: positive integer
function div(a, d) {
    let q = 0
    let r = Math.abs(a)

    // 나머지가 d 보다 작아질 때까지 a 에서 d 를 계속 뺀다
    while (r >= d) {
        r -= d      // 빼기가 끝난 다음 남은 것이 나머지
        q += 1      // 빼기를 한 횟수가 몫
    }
    if (a < 0 && r > 0) {
        r = d - r
        q = -(q + 1)
    }
    return {
        div: q,     // 몫
        mod: r,     // 나머지
    }
}
```

실행 결과는 다음과 같다.

```js
div(10, 3)  // { div: 3, mod: 1 }
div(17, 3)  // { div: 5, mod: 2 }
div(-17, 3) // { div: -6, mod: 1 }
```

## 거듭제곱 수의 나머지 구하기

$$ b^n \bmod m $$ 의 나머지를 구할 때 $$ b^n $$ 이 꽤 큰 수라면 계산하기 곤란할 수 있다.

가령 $$ 7^{30} \bmod 661 $$ 을 구한다고 하자.

* $$ b^n = 7^{30} = 22,539,340,290,692,258,087,863,249 $$ 이다.
    * JavaScript의 경우 `Number.MAX_SAFE_INTEGER`가 $$9,007,199,254,740,991$$ 이다.
    * Java의 경우 `Long.MAX_VALUE`가 $$9,223,372,036,854,775,807$$ 이다.

이런 경우라면 $$ 7^{30} $$ 을 계산한 다음 나머지를 구하는 방법을 사용하면 오버플로가 발생할 것이다.

따라서 위의 모듈로 연산에서 배운 공식을 사용하여 문제를 분할해 해결하도록 하자.

>
$$a \times b \bmod m = ((a \bmod m) \times (b \bmod m)) \bmod m.$$

$$
\begin{align}
7^{30} \bmod 661
    & = ( 7^{15} \times 7^{15} ) \bmod 661 \\
    & = ( (7^{15} \bmod 661) \times (7^{15} \bmod 661)) \bmod 661 \\
    & = (21 \times 21) \bmod 661 \\
    & = 441 \\
\end{align}
$$

* 답은 [441](https://www.wolframalpha.com/input/?i=7%5E30+mod+661) 이다.
    * 중간에 $$ 7^{15} \bmod 661 $$을 계산하는 과정은 생략했다.

이 방법을 사용하면 $$ 7^{30} \bmod 661 $$ 은 $$ 7^{15} \bmod 661$$ 을 구하면 풀리는 문제가 된다.

한편, $$7^{15} \bmod 661 = ((7^{10} \bmod 661) \times (7^5 \bmod 661)) \bmod 661 $$ 이므로...

$$ 7^{30} \bmod 661 $$ 은 $$ 7^{10} \bmod 661, 7^{10} \bmod 661$$ 을 구하면 풀리는 문제인 것이다.

이를 반복하면 아무리 거듭제곱의 수가 많아도 오버플로하지 않도록 관리하면서 계산하는 것이 가능해진다.

### 이진법을 사용해 거듭제곱 수의 나머지 구하기

다음 알고리즘은 바로 위에서 문제를 분할해 푸는 방법을 응용한 것이다.

이 방법에서는 $$ b^n \bmod m $$의 $$n$$을 이진법으로 보고, 2의 거듭제곱으로 쪼개서 순차적으로 계산한다.

```js
// b: integer
// n: list (n의 이진수 표현)
// m: integer
function mod_exponentiation(b, n, m) {
    let x = 1
    let power = mod(b, m)

    for (let i = 0; i < n.length; i++) {
        if (n[i] == 1) {
            x = mod(x * power, m)
        }
        power = mod(power * power, m)
    }
    return x
}
```

가령 $$ 3^{644} \bmod 645 $$ 를 구한다고 하자.

$$ 645 = 1010000100_2 $$ 이므로 `n = [0,0,1,0,0,0,0,1,0,1]` 이 된다.

루프를 돌면서 각 값의 테이블을 만들어 보면 다음과 같다.


| i | n[i] | x                                                | power                       |
|---|------|--------------------------------------------------|-----------------------------|
|   |      | 1                                                | $$3 \bmod 645 = 3$$         |
| 0 | 0    | 1                                                | $$(3^2) \bmod 645 = 9$$     |
| 1 | 0    | 1                                                | $$(9^2) \bmod 645 = 81$$    |
| 2 | 1    | $$(1 \times 81) \bmod 645 = 81$$                 | $$(81^2) \bmod 645 = 111$$  |
| 3 | 0    | 81                                               | $$(111^2) \bmod 645 = 66$$  |
| 4 | 0    | 81                                               | $$(66^2) \bmod 645 = 486$$  |
| 5 | 0    | 81                                               | $$(486^2) \bmod 645 = 126$$ |
| 6 | 0    | 81                                               | $$(126^2) \bmod 645 = 396$$ |
| 7 | 1    | $$(81 \times 396) \bmod 645 = 471$$              | $$(396^2) \bmod 645 = 81$$  |
| 8 | 0    | 471                                              | $$(81^2) \bmod 645 = 111$$  |
| 9 | 1    | $$(471 \times 111) \bmod 645 = \color{red}{36}$$ |                             |

$$ 3^{644} \bmod 645 = 36 $$

### 재귀 알고리즘으로 거듭제곱 수의 나머지 구하기

$$
\def\ceil#1{\lceil #1 \rceil}
\def\floor#1{\lfloor #1 \rfloor}
\def\frfr#1{\{ #1 \}}
$$

>
$$a \times b \bmod m = ((a \bmod m) \times (b \bmod m)) \bmod m.$$

위의 식을 응용하면 다음과 같은 방법으로 거듭제곱 수의 나머지를 구할 수 있다.

* n 이 짝수인 경우.
    * $$ b^n \bmod m = (b^{ n \over 2 } \bmod m)^2 \bmod m $$.
* n 이 홀수인 경우.
    * $$ b^n \bmod m = \biggl((b^{ \floor{ {n \over 2} }} \bmod m)^2 \bmod m \times b \bmod m \biggl) \bmod m $$.

다음은 이 알고리즘을 자바스크립트 코드로 작성한 것이다.

```js
// b^n mod m
function mpower(b, n, m) {
    if (n == 0) {
        return 1;
    }
    if (n % 2 == 0) {
        const next = mpower(b, half(n), m);
        return square(next) % m;
    }

    const next = mpower(b, half(n), m);
    return ((square(next) % m) * (b % m)) % m;
}

function half(n) {
    return parseInt(n / 2, 10);
}

function square(n) {
    return n * n;
}
```

# 참고문헌

* Rosen의 이산수학 / Kenneth H. Rosen 저 / 공은배 등저 / 한국맥그로힐(McGraw-Hill KOREA) / 2017년 01월 06일

