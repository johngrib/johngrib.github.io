---
layout  : wiki
title   : 고대 이집트 곱셈법
summary : EGYPTIAN MULTIPLICATION
date    : 2018-11-14 23:24:36 +0900
updated : 2018-11-16 09:55:06 +0900
tags    : 
toc     : true
public  : true
parent  : algorithm
latex   : true
---
* TOC
{:toc}

* 러시아 소작농 곱셈법이라고도 부른다.

# 곱셈을 덧셈으로

만약 **곱셈을 할 줄 모르는 상태**에서 $$ 8 \times a $$를 구해야 한다고 하자.

곱셈을 모르므로 $$ a + a + a + a + a + a + a + a $$를 계산하면 결과를 얻을 수 있다.

다만 이렇게 하면 덧셈을 7번이나 해야 한다.

그런데, $$ a + a $$를 일단 계산하면 $$ 2a $$를 알 수 있으므로

$$ 2a + 2a + 2a + 2a $$를 계산하면 된다.

이와 같은 방법을 반복하면 덧셈 횟수를 많이 줄일 수 있다.

$$
\begin{align}
8a  & = \color{red}{a} + a + a + a + a + a + a + a \\
    & = \color{red}{2a} + 2a + 2a + 2a \\
    & = \color{red}{4a} + 4a \\
    & = \color{red}{8a} \\
\end{align}
$$

이 방법으로 $$ 8a $$를 계산하면 다음과 같이 3회의 덧셈으로 계산이 끝난다.

$$
a + a \\
2a + 2a \\
4a + 4a \\
$$

곱하는 수 8이 2의 거듭제곱의 형태이므로 $$ \log_2 8 = 3 $$회의 덧셈으로 끝난 것이다.

## 이진법으로 생각하면

이 계산은 이진법으로 따지면 간단한 비트 쉬프트다.

2를 곱하는 것은 오른쪽에 `0`을 하나 추가하는 것으로 간단하게 계산할 수 있다.

만약 $$ a = 13 $$라고 한다면 이진 표현은 $$ a = 1101_2$$ 이므로...

$$ a \times 2 = 11010_2 $$

$$
\begin{align}
a & = 1101_2 \\
2a & = 11010_2 \\
4a & = 110100_2 \\
8a & = 1101000_2 \\
\end{align}
$$

$$ 1101000_2 = 104_{10} $$

결과는 `104` 이다.

다음은 이 과정을 Go 코드로 작성한 것이다.

```go
func multiply(a, b int) int {
    count := 1
    for count != b {
        a = a << 1
        count += count
    }
    return a
}

func ExampleMultiply() {
    fmt.Println(multiply(13, 8))
    // Output:
    // 104
}
```

물론 $$ \log_2 $$를 사용한다면 더 심플한 코드를 작성할 수 있다.

```go
func multiply(a, b int) int {
    return a << log2(b)
}

func log2(num int) uint {
    return uint(math.Log2(float64(num)))
}
```

하지만 여기에서는 로그는 고사하고 덧셈 밖에 모르고 있으니 이 코드는 반칙이다.

# 곱하는 수가 2의 거듭제곱이 아니라면?

8과 달리 곱하는 수가 2의 거듭제곱이 아니라면 어떻게 할까?

이번에도 **곱셈을 모르는 상태**를 전제로 하고, $$ 42 \times 59 $$를 덧셈만으로 알아내는 방법을 생각해 보자.

일단 1부터 자기 자신을 더해가며, 42보다 작은 가장 큰 2의 거듭제곱인 32까지 찾아낼 수 있다.

$$
\begin{align}
        & 1 \\
1+1   = & 2 \\
2+2   = & 4 \\
4+4   = & 8 \\
8+8   = & 16 \\
16+16 = & 32 \\
\color{grey}{32+32 =} & \color{grey}{64} \ \leftarrow \text{42 초과. 여기서 멈춘다.} \\
\end{align}
$$

이제 얻어낸 목록 옆에 곱할 수인 59를 덧셈해가며 기록한다.

$$
\begin{align}
1 \quad  & 59 \\
2 \quad  & 59 + 59 = 118 \\
4 \quad  & 118 + 118 = 236 \\
8 \quad  & 236 + 236 = 472 \\
16 \quad & 472 + 472 = 944 \\
32 \quad & 944 + 944 = 1888 \\
\end{align}
$$

이제 다음과 같은 표를 얻을 수 있다.

$$
\begin{align}
1 \quad  & 59  \\
2 \quad  & 118 \\
4 \quad  & 236 \\
8 \quad  & 472 \\
16 \quad & 944 \\
32 \quad & 1888 \\
\end{align}
$$

오른쪽 숫자들의 의미는 다음과 같다.

$$
\begin{align}
1 \quad  & 59   \\
2 \quad  & 118 \color{grey}{= 59 \times 2 } \\
4 \quad  & 236 \color{grey}{= 59 \times 4 } \\
8 \quad  & 472 \color{grey}{= 59 \times 8 } \\
16 \quad & 944 \color{grey}{= 59 \times 16 } \\
32 \quad & 1888 \color{grey}{= 59 \times 32 } \\
\end{align}
$$

이제 왼쪽의 숫자들 중 큰 숫자부터 42에서 빼면서 42가 어떤 숫자들의 합으로 되어 있는지를 알아내면 된다.

* $$ 42 - 32 = 10 $$ 이므로, $$ 42 = 32 + 10 $$.
* $$ 10 - 16 $$ 은 음수가 나오니 패스
* $$ 10 - 8 = 2 $$ 이므로, $$ 42 = 32 + 8 + 2 $$

그렇다면
$$ 42 \times 59 = (32 + 8 + 2) \times 59 $$

$$
\begin{align}
42 \times 59
    & = (32 + 8 + 2) \times 59 \\
    & = 59 \times 32 + 59 \times 8 + 59 \times 2 \\
    & = 1888 + 472 + 118 \\
    & = 2478 \\
\end{align}
$$

## 비트 쉬프트로 생각하면

비트 쉬프트를 사용한 2의 거듭 제곱이 아닌 상수의 곱셈은 다음과 같이 할 수 있다.

$$
\begin{align}
a \times 3
    & = a \times 2 + a \\
    & = a \lt\lt 1 + a \\
\\
a \times 13
    & = a \times 2^3 + a \times 2^2 + a \\
    & = a \lt\lt 3 + a \lt\lt 2 + a \\
\\
a \times 60
    & = a \times 2^6 - a \times 2^2 \\
    & = a \lt\lt 6 - a \lt\lt 2 \\
\end{align}
$$

## 홀짝을 구분해 계산하기

모든 자연수는 홀수 또는 짝수이기 때문에 다음과 같이 표현할 수 있을 것이다.

* n이 짝수인 경우. $$ \ n = \frac{n}{2} + \frac{n}{2} $$
* n이 홀수인 경우. $$ \ n - 1 = \frac{n-1}{2} + \frac{n-1}{2} $$

$$ a \times b $$를 계산할 때 다음의 방법을 따르면 된다.

* a 가 1 이면 답은 b 이다.
* a 가 홀수이면 결과에 b를 한 번 더한다.
* a를 반으로 나누고(내림), b를 2배 한 다음, 새로운 a와 새로운 b의 곱을 결과에 더한다.
    * a 는 점점 반으로 줄어서 언젠간 1이 될 것이다.

곱셈, 나눗셈을 모르는데 홀짝은 어떻게 구분하나?

* 곱셈 나눗셈을 몰라도, 이진법을 알고 있다면 마지막 비트가 1인지만 확인하면 된다.
```go
func isOdd(n int) bool {
    return (n & 0x1) == 1
}
```

나눗셈을 모르는데 반으로 나누는 것은 어떻게 하나?

* 오른쪽으로 비트 쉬프트를 한 번만 하면 된다.
```go
func half(n int) int {
    return n >> 1
}
```

그러면 다음과 같은 코드를 작성할 수 있다.
```go
// multiply returns a * b.
func multiply(a, b int) int {
    if a == 1 {
        return b
    }
    result := 0
    if isOdd(a) {
        result += b
    }
    return result + multiply(half(a), b+b)
}
```

