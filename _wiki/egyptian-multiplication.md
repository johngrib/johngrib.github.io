---
layout  : wiki
title   : 고대 이집트 곱셈법
summary : EGYPTIAN MULTIPLICATION
date    : 2018-11-14 23:24:36 +0900
updated : 2018-11-16 10:54:03 +0900
tag     : 
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
    if isOdd(a) {
        return b + multiply(half(a), b+b)
    }
    return multiply(half(a), b+b)
}
```

# 거듭제곱

이번에는 곱셈을 알고 있다고 하자. 그리고 거듭제곱을 풀어야 한다고 생각하자.

곱셈을 모르는 상태에서 덧셈을 반복해 곱셈의 결과를 내는 것과, 곱셈을 알고 있는 상태에서 곱셈을 반복해 거듭제곱의 결과를 구하는 것은 굉장히 비슷한 구조를 갖고 있다.

TAOCP 2권. 4.6.3. Evaluation of Powers를 읽어보면 다음과 같은 거듭제곱 알고리즘이 나온다.

>
Algorithm A (Right-to-left binary method for exponentiation). This algorithm evaluates $$ x^n $$, where n is a positive integer. (Here x belongs to any algebraic system in which an associative multiplication, with identity element 1, has been defined.)  
A1. [Initialize.] Set $$ N \leftarrow n, Y \leftarrow 1, Z \leftarrow x $$.  
A2. [Halve N.] (At this point, $$ x^n = YZ^N $$.) Set $$ t \leftarrow N\mod 2 $$ and $$ N ← ⌊N/2⌋ $$. If $$ t = 0 $$, skip to step A5.  
A3. [Multiply Y by Z.] Set $$Y ← Z$$ times $$Y$$.  
A4. [$$N = 0$$?] If $$N = 0$$, the algorithm terminates, with $$Y$$ as the answer.  
A5. [Square Z.] Set $$Z ← Z$$ times $$Z$$, and return to step A2.  

아이디어는 덧셈을 하는 방식과 크게 다르지 않은 것 같다.

열심히 읽고 참고하여 다음과 같이 Go 코드로 작성해 보았다.

```go
func power(x, n int) int {
    // A1
    N := n
    Y := 1
    Z := x
    fmt.Printf("A1: %10d %10d %10d\n", N, Y, Z)

    for i := 0; i < 30; i++ {
        // A2
        t := N % 2
        N = half(N)

        // A3
        if t != 0 {
            Y = Z * Y
            if N == 0 {
                // A4
                fmt.Printf("A4: %10d %10d %10d\n", N, Y, Z)
                fmt.Println("result ", Y)
                return Y
            }
        }
        // A5
        Z = Z * Z
        fmt.Printf("A5: %10d %10d %10d\n", N, Y, Z)
    }
    return 0
}
```

이 power 함수로 $$ 2^{23} $$을 계산해 보았더니 다음과 같은 출력을 얻을 수 있었다.

```
A1:         23          1          2
A5:         11          2          4
A5:          5          8         16
A5:          2        128        256
A5:          1        128      65536
A4:          0    8388608      65536
result  8388608
```

>
The great calculator al-Kāshī stated Algorithm A in A.D. 1427 [Istoriko-Mat. Issledovani.. 7 (1954), 256–257]. The method is closely related to a procedure for multiplication that was actually used by Egyptian mathematicians as early as 2000 B.C.; for if we change step A3 to “Y ← Y + Z” and step A5 to “Z ← Z + Z”, and if we set Y to zero instead of unity in step A1, the algorithm terminates with Y = nx. [See A. B. Chace, The Rhind Mathematical Papyrus (1927); W. W. Struve, Quellen und Studien zur Geschichte der Mathematik A1 (1930).] This is a practical method for multiplication by hand, since it involves only the simple operations of doubling, halving, and adding. It is often called the “Russian peasant method” of multiplication, since Western visitors to Russia in the nineteenth century found the method in wide use there.

* 알고리즘 A는 1427년에 위대한 수학자 al-Kāshī가 기록한 바 있다.
* 이 방법은 적어도 B.C. 2000년부터 이집트 수학자들이 사용한 방법과 비슷하다.
    * A3를 $$ Y \leftarrow Y + Z $$로 바꾸고, A5를 $$ Z \leftarrow Z + Z $$로 바꾸고, A1에서 $$ Y larrow_left 0 $$으로 하면, $$ Y = nx $$가 결과로 나오게 된다.
* 이 알고리즘은 "러시아 농부의 곱셈 방법"이라고도 불리곤 한다.
    * 19세기에 서양 사람들이 러시아에 갔을 때 러시아에서 이 방법이 많이 사용되고 있었기 때문이다.

알고리즘 A는 다음 횟수만큼 곱셈을 한다.

$$ \lfloor \log_2 n \rfloor + \nu(n) $$

* $$ \nu(n) $$ : 숫자 n의 2진 표현에서 1의 개수.

이 알고리즘은 최적의 방법은 아니다.


# Links

* [고대 이집트 곱셈법(wikipedia)](https://ko.wikipedia.org/wiki/%EA%B3%A0%EB%8C%80_%EC%9D%B4%EC%A7%91%ED%8A%B8_%EA%B3%B1%EC%85%88%EB%B2%95 )

# 참고문헌

* 알고리즘 산책 수학에서 제네릭 프로그래밍까지 / 알렉산더 A. 스테파노프, 다니엘 E. 로즈 저/서환수 역 / 길벗 / 2018년 05월 30일
    * 2장 첫번째 알고리즘
* The art of computer programming 2 준수치적 알고리즘(개정3판) 도널드 커누스 저 / 한빛미디어 / 2007년 09월 13일 / 원제 : THE ART OF COMPUTER PROGRAMMING VOL.2 3/E
    * 4.6.3.

