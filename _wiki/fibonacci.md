---
layout  : wiki
title   : 피보나치 수열
summary : Fibonacci Sequence
date    : 2019-08-18 22:45:59 +0900
updated : 2019-08-19 21:32:47 +0900
tag     : math
toc     : true
public  : true
parent  : math
latex   : true
---
* TOC
{:toc}

# 정의

>
The Fibonacci sequence, $$f_0, f_1, f_2$$, . . . , is defined by the initial conditions $$f_0 = 0, f_1 = 1$$, and the recurrence relation  
$$f_n = f_{n−1} + f_{n−2}$$  
for $$n = 2,3,4,...$$.

* $$f_0 = 0$$.
* $$f_1 = 1$$.
* $$f_n = f_{n-1} + f_{n-2}$$.

피보나치 수열은 앞에 나온 두 개의 항을 더하는 것을 반복하여 얻을 수 있는 수열이다.

# 코딩할 때 주의점

* 숫자가 커지는 범위를 생각하면서 자료형을 선택해야 한다.
* $$f(94)$$ 이상을 구하려면 각 언어별로 제공되거나 구현된 BigNumber 라이브러리를 사용하도록 한다.

| n  | $$f(n)$$                   | 주의                                              |
|----|----------------------------|---------------------------------------------------|
| 46 | 1 836 311 903              |                                                   |
| 47 | 2 971 215 073              | int 32 max 는 2 147 483 647                       |
| 48 | 4 807 526 976              | unsigned int 32 max 는 4 294 967 295              |
|    | ...                        |                                                   |
| 92 | 7 540 113 804 746 346 429  |                                                   |
| 93 | 12 200 160 415 121 876 738 | int 64 max 는 9 223 372 036 854 775 807           |
| 94 | 19 740 274 219 868 223 167 | unsigned int 64 max 는 18 446 744 073 709 551 615 |

위의 표는 개행 문제 때문에 `,`대신 공백을 주어 표현하였다.

# n 번째 피보나치 수 구하기

## 반복법(iteration)

* 초기조건 $$f_0, f_1$$부터 반복적으로 덧셈을 하여 $$f_n$$을 얻어낼 때까지 계산하는 방법.
* $$O(n)$$의 시간 복잡도를 갖는다.

결과를 배열에 기록하길 바란다면 다음과 같이 할 수 있다.

```go
// int64는 92번째 피보나치 수까지만 표현 가능
var list = [92 + 1]int64{0, 1, 1}

func f(n int) int64 {
    if n <= 2 {
        return list[n]
    }
    for i := 3; i <= n && i <= 92; i++ {
        list[i] = list[i-2] + list[i-1]
    }
    return list[n]
}
```

두 개의 변수를 swap해가며 더하는 방법으로도 구할 수 있다.

```go
func f(n int) int {
    if n <= 1 {
        return n
    }
    a, b := 0, 1
    for i := 2; i < n; i++ {
        a, b = b, b+a   // swap
    }
    return a + b
}
```

## 재귀

* 가장 단순한 코드로 표현 가능하지만 $$O(2^n)$$의 시간 복잡도를 갖는다.

```go
func f(n int) int {
    if n <= 1 {
        return n
    }
    return f(n-1) + f(n-2)
}
```

## Q 행렬의 사용

행렬 $$Q$$의 거듭제곱을 사용해 계산하는 방법이다.
$$Q$$ 행렬은 1과 0만으로 이루어진 2차 정사각행렬이다.

$$
Q =
\begin{bmatrix}
1 & 1 \\
1 & 0 \\
\end{bmatrix}
$$

이 행렬 $$Q$$을 거듭제곱하면 아주 쉽게 피보나치 수를 얻을 수 있다.

$$
Q^n =
\begin{bmatrix}
1 & 1 \\
1 & 0 \\
\end{bmatrix} ^n
=
\begin{bmatrix}
f_{n+1} & f_n     \\
f_n     & f_{n-1} \\
\end{bmatrix}
$$

### Q 행렬이 작동하는 원리

다음과 같은 과정을 거치면 $$f_n = f_{n-1} + f_{n-2}$$를 단순한 두 개의 행렬 곱으로 변환할 수 있다.

$$
\begin{align}
f_n & = f_{n-1} + f_{n-2} \\
    & = 1 \times f_{n-1} + 1 \times f_{n-2} \\
    & =
        \begin{bmatrix} 1 & 1 \end{bmatrix}
            \times
        \begin{bmatrix} f_{n-1} \\ f_{n-2} \end{bmatrix}
\end{align}
$$

이번엔 $$f_{n-1}$$에 대한 간단한 식을 하나 꾸며 보자.
`0`에 주목하며 위의 식과 비교해보면 이해하기 쉽다.

$$
\begin{align}
f_{n-1} & = 1 \times f_{n-1} + \color{red}0 \times f_{n-2} \\
    & =
        \begin{bmatrix} 1 & \color{red}0 \end{bmatrix}
            \times
        \begin{bmatrix} f_{n-1} \\ f_{n-2} \end{bmatrix}
\end{align}
$$

이제 위에서 얻은 $$f_n$$과 $$f_{n-1}$$을 위아래로 쌓아 $$2 \times 1$$행렬을 만들면 다음과 같은 식을 얻을 수 있다.

$$
\begin{align}
f_n & = \begin{bmatrix} 1 & 1 \end{bmatrix}
            \times
        \begin{bmatrix} f_{n-1} \\ f_{n-2} \end{bmatrix} \\
f_{n-1} & = \begin{bmatrix} 1 & 0 \end{bmatrix}
            \times
        \begin{bmatrix} f_{n-1} \\ f_{n-2} \end{bmatrix} \\
\\
\begin{bmatrix} f_{n} \\ f_{n-1} \end{bmatrix}
& =
    \begin{bmatrix} 1 & 1 \\ 1 & 0 \end{bmatrix}
    \times
    \begin{bmatrix} f_{n-1} \\ f_{n-2} \end{bmatrix} \\
\end{align}
$$

가운데에 Q 행렬 $$\begin{bmatrix} 1 & 1 \\ 1 & 0 \end{bmatrix}$$이 나타난 것을 알 수 있다.

잠시 프로그래밍의 관점으로 돌아가서 생각해 보자. 이 곱셈은 결과 행렬
$$ \begin{bmatrix} f_{n} \\ f_{n-1} \end{bmatrix} $$
의 각 성분(entry)을 다음과 같이 채워준다.

* Q 행렬의 윗줄 $$\begin{bmatrix} 1 & 1 \end{bmatrix}$$은 $$f_{n-1}$$과 $$f_{n-2}$$의 합을 구해, 행렬의 윗줄로 올리는 역할을 한다.
* Q 행렬의 아랫줄 $$\begin{bmatrix} 1 & 0 \end{bmatrix}$$은 위에 있었던 $$f_{n-1}$$을 단순히 아랫줄로 내리는 역할이다.

$$
\begin{align}
\begin{bmatrix} f_{2} \\ f_{1} \end{bmatrix}
& =
    \begin{bmatrix} 1 & 1 \\ 1 & 0 \end{bmatrix}
    \times
    \begin{bmatrix} f_1 \\ f_0 \end{bmatrix} \\
& =
    \begin{bmatrix} f_1 + f_0 \\ f_1 \end{bmatrix}
\end{align}
$$

$$\begin{bmatrix} f_1 \\ f_0 \end{bmatrix}$$에 $$\begin{bmatrix} 1 & 1 \\ 1 & 0 \end{bmatrix}$$를 곱했더니
$$\begin{bmatrix} f_1 + f_0 \\ f_1 \end{bmatrix}$$가 되는 것을 확인할 수 있다.

즉 Q 행렬을 곱하는 방법은 두 개 변수의 값을 서로 바꿔가며 덧셈하여 피보나치 수를 구하는 방법과 똑같다.

```go
for i := 2; i < n; i++ {
    a, b = b, b+a   // swap
}
return a + b
```

행렬 Q를 반복적으로 곱하면 이러한 덧셈을 반복하는 셈이 된다.

$$
\begin{align}
\begin{bmatrix} f_{n} \\ f_{n-1} \end{bmatrix}
& =
    \begin{bmatrix} 1 & 1 \\ 1 & 0 \end{bmatrix}
    \times
    \begin{bmatrix} f_{n-1} \\ f_{n-2} \end{bmatrix} \\
& =
    \begin{bmatrix} 1 & 1 \\ 1 & 0 \end{bmatrix}
    \times
    \begin{bmatrix} 1 & 1 \\ 1 & 0 \end{bmatrix}
    \times
    \begin{bmatrix} f_{n-2} \\ f_{n-3} \end{bmatrix} \\
& ... \\
& =
    \begin{bmatrix} 1 & 1 \\ 1 & 0 \end{bmatrix} ^{n-1}
    \times
    \begin{bmatrix} f_1 \\ f_0 \end{bmatrix} \\
\end{align}
$$

### Q 행렬의 거듭제곱으로 효율 좋게 피보나치 수 계산하기

Q 행렬을 곱하는 것만으로도 피보나치 수를 구할 수 있으므로, 단순히 덧셈을 반복하는 것보다 빠르게 피보나치 수를 구할 수 있다.

[거듭제곱을 효율 좋게 계산하는 방법](/wiki/egyptian-multiplication/#거듭제곱 )을 활용할 수 있다.

TAOCP 2권. 4.6.3. Evaluation of Powers에서는 거듭제곱을 효율 좋게 계산하기 위한 여러 기법을 소개하는데 그 중 한 가지 방법은 다음과 같은 것이다.

>
예를 들어 $$x^{16}$$를 구해야 한다고 하자. 그냥 x로 시작해서 거기에 x를 열다섯 번 곱해도 된다.
단 네 번의 곱셈으로 같은 답을 구하는 것도 가능하다.
매 단계마다 중간 결과의 제곱을 취하는 방식으로, 차례로 $$x^2, x^4, x^8, x^{16}$$을 구하면 되는 것이다.


## Wolfram Alpha에서 검색하기

울프람 알파를 사용하면 굉장히 큰 피보나치 수를 쉽게 얻을 수 있다.

테스트해보니 울프람 알파에서는 6,487,075,382,438,781 번째 피보나치 수까지 조회할 수 있다.[^wolfram-test]

* [6487075382438781 번째 피보나치 수(wolframalpha)](https://www.wolframalpha.com/input/?i=fibonacci(6487075382438781) ) - 계산 결과로 1355718576299609 자리의 엄청나게 큰 숫자가 나온다.
* [6487075382438782 번째 피보나치 수(wolframalpha)](https://www.wolframalpha.com/input/?i=fibonacci(6487075382438782) ) - 계산 결과가 안 나온다.

# 참고문헌

* Rosen의 이산수학 / Kenneth H. Rosen 저 / 공은배 등저 / 한국맥그로힐(McGraw-Hill KOREA) / 2017년 01월 06일

# Links

* [피보나치 수(wikipedia)](https://ko.wikipedia.org/wiki/피보나치_수 )
* [Fibonacci number(wikipedia)](https://en.wikipedia.org/wiki/Fibonacci_number )
* [A000045(OEIS)](http://oeis.org/A000045 )
* [Fibonacci Number(mathworld.wolfram.com)](http://mathworld.wolfram.com/FibonacciNumber.html )
* [Fibonacci Q-Matrix(mathworld.wolfram.com)](http://mathworld.wolfram.com/FibonacciQ-Matrix.html )

# 주석

[^wolfram-test]: 이진 탐색으로 알아냈다.
