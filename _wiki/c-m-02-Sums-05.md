---
layout  : wiki
title   : 구체수학 02.합.05.일반적인 방법들
summary : 02.SUMS.05.GENERAL METHODS
date    : 2018-05-19 10:40:25 +0900
updated : 2018-05-20 23:15:09 +0900
tags    : math
toc     : true
public  : true
parent  : study-concrete-math
latex   : true
---
* TOC
{:toc}

이 문서는 [[CONCRETE-MATH]] **2장.합 - 5.일반적인 방법들**을 공부한 노트입니다.

# 개요

이번 장의 목표는 한 가지 문제를 다양한 방법으로 풀어보며 배운 바를 정리하는 것이다.

그리고 그 문제는 `0`부터 `n`까지의 거듭제곱의 합이다.

$$
\Box_n = \sum_{0 \le k \le n} k^2, \quad for \; n \ge 0.
$$

위의 합 식은 python 코드로 생각하자면 다음과 같다.
```python
def box(n):
    sum = 0
    for k in range(n+1):
        sum += k**2
    return sum
```

앞으로 쭉 참고하게 될 것이므로 `0~12` 사이의 `n`과 `n^2`, `Box(n)` 값을 다음과 같이 구하였다.

```python
for n in range(12 + 1):
    print(n, n**2, box(n))
```

* 결과를 다음과 같이 표로 정리해 보았다.
    * 가장 오른쪽 열은 표를 정리하다가, 점화식 구조를 떠올리게 되어 추가한 것이다.

| $$n$$ | $$n^2$$ | $$\Box_n$$ | $$\Box_n = n^2 + \Box_{n-1}$$ |
|-------|---------|------------|-------------------------------|
| 0     | 0       | 0          | 0                             |
| 1     | 1       | 1          | = 1 + 0                       |
| 2     | 4       | 5          | = 4 + 1                       |
| 3     | 9       | 14         | = 9 + 5                       |
| 4     | 16      | 30         | = 16 + 14                     |
| 5     | 25      | 55         | = 25 + 30                     |
| 6     | 36      | 91         | = 36 + 55                     |
| 7     | 49      | 140        | = 49 + 91                     |
| 8     | 64      | 204        | = 64 + 140                    |
| 9     | 81      | 285        | = 81 + 204                    |
| 10    | 100     | 385        | = 100 + 285                   |
| 11    | 121     | 506        | = 121 + 385                   |
| 12    | 144     | 650        | = 144 + 506                   |


# 방법 0: 답을 찾아본다

> Method 0: You could look it up.

이런 문제는 아마도 옛날 사람들이 다 풀어 놨을 것이다.

따라서 책이나 인터넷에서 답을 찾아본다.

* 교재에서는 CRC Standard Mathematical Tables에서 답을 찾았다고 한다.
* 나는 그냥 Wolfram Alpha에서 찾았다.
    * <https://www.wolframalpha.com/input/?i=sum+0+to+n+k%5E2>

이 문제의 닫힌 형식은 다음과 같다. 고등학교에서 배웠던 익숙한 공식이다.

$$
\Box_n = { n(n+1)(2n+1) \over 6 }, \quad for \; n \ge 0.
\tag{2.38} \label{2.38}
$$

이 식을 python으로 옮기면 다음과 같을 것이다. 최적화되어 시간 복잡도가 선형 시간에서 상수 시간이 된 것 같다.

```python
def Box(n):
    return n * (n+1) * (2*n+1) / 6
```

한편, 식을 전개하면 $$\Box_n = { 2n^3 + 3n^2 + n \over 6 }$$ 이 되므로 다음과 같이 표현하는 것도 가능하다.

```python
def Box(n):
    return (2*(n**3) + 3*(n**2) + n) / 6
```


# 방법 1: 답을 추측하고 귀납법으로 증명한다

> Method 1: Guess the answer, prove it by induction.

일단 위에서 얻은 답은 잊어버리자.

그리고 이 책을 읽고 있는 내가 열심히 생각해서 다음과 같은 답을 추측했다고 치자.

$$
\Box_n = { n(n+\frac{1}{2})(n+1) \over 3 }, \quad for \; n \ge 0.
$$

* 여기에서 중요한 것은 **열심히 생각해서 떠올려 추측하는 것**.
* 별 생각이 안 난다면 이 방법은 사용할 수 없다.
* 주관식 답을 찍는 것과 비슷하다. 그러나 그것보다는 조금 더 열심히 생각해야 한다.

이 답이 맞을 수도 있고, 틀릴 수도 있다.

그러니 수학적 귀납법으로 맞는지를 확인하면 된다.

수학적 귀납법으로 위의 추측을 검증하는 방법은 다음과 같다.

* 점화식을 준비한다.
* 점화식에 추측한 답을 대입해 모순이 없는지를 확인하면 된다.

그렇다면 주어진 문제를 통해 점화식을 만들어 보자.

* 재귀 함수를 만드는 과정과 똑같다.
* 재귀가 멈추는 조건인 `n = 0`일 때부터 만들자.

$$\Box_0 = 0^2 = 0$$

* 이제 $$\Box_n$$과 $$\Box_{n-1}$$의 관계를 찾아주면 된다.

$$
\begin{align}
\Box_n & = \sum_{0 \le k \le n} k^2, \quad for \; n \ge 0. \\
    & = 0^2 + 1^2 + 2^2 + ... + (n-1)^2 + n^2 \\
    & = \left( 0^2 + 1^2 + 2^2 + ... + (n-1)^2 \right) + n^2 \\
    & = \left( \Box_{n-1} \right) + n^2 \\
\end{align}
$$

따라서 점화식은 다음과 같이 꾸밀 수 있을 것이다.

$$
\begin{align}
\Box_0 & = 0; \\
\Box_n & = \Box_{n-1} + n^2, \quad for \; n \le 0. \\
\end{align}
$$

```python
def box(n):
    if n == 0:
        return 0
    return Box(n-1) + n**2
```

이제 점화식에 추측한 식을 넣어보고, 모순이 없는지를 확인하면 된다.

$$
\require{cancel}
\begin{align}
\Box_n & = \Box_{n-1} + n^2 \\
\\
\left( { n(n+\frac{1}{2})(n+1) \over 3 } \right)
    & = \left( { (n-1)(n - 1+\frac{1}{2})(n - 1 +1) \over 3 } \right) + n^2 \\
    & \color{gray}{\text{양 변에 3을 곱하자}}\\
n(n+\frac{1}{2})(n+1)
    & = (n-1)(n - 1+\frac{1}{2})(n - 1 +1) + 3n^2 \\
n(n+\frac{1}{2})(n+1)
    & = (n-1)(n - \frac{1}{2})n + 3n^2 \\
    & \color{gray}{\text{양 변을 n으로 나누자}}\\
(n+\frac{1}{2})(n+1)
    & = (n-1)(n - \frac{1}{2}) + 3n \\
n^2 + \frac{3}{2} \cdot n + \frac{1}{2}
    & = (n-1)(n - \frac{1}{2}) + 3n \\
\cancel{n^2} + \frac{3}{2} \cdot n + \cancel{\frac{1}{2}}
    & = \cancel{n^2} - \frac{3}{2} \cdot n + \cancel{\frac{1}{2}} + 3n \\
\frac{3}{2} \cdot n
    & = - \frac{3}{2} \cdot n  + 3n \\
\frac{6}{2} \cdot n & = 3n \\
3n & = 3n \\
\end{align}
$$

따라서 추측이 맞다고 볼 수 있다.

그리고 추측한 값은, 다음과 같이 변형해보면 방법 0에서 알아낸 식과 똑같다.

$$
\begin{align}
\Box_n & = { n(n+\frac{1}{2})(n+1) \over 3 } \\
    & = { n \cdot 2 \cdot (n+\frac{1}{2})(n+1) \over 2 \cdot 3 } \\
    & = { n (2n+1)(n+1) \over 6 } \\
    & = { n (n+1)(2n+1) \over 6 } \\
\end{align}
$$


# 방법 2: 합을 어지럽힌다(섭동)

> Method 2: Perturb the sum.

섭동법은 다음과 같은 방법이다.

* 합 $$S_{n+1}$$ 을 다음 두 가지 방법으로 표현한다.
    * 첫번째: 합의 마지막 항을 뽑아낸다.
        * 예: $$S_{n+1} = S_n + a_{n+1}$$
    * 두번째: 합의 첫 항을 뽑아낸다.
        * 예: $$S_{n+1} = a_0 + \sum_{1 \le k \le n+1} a_k = a_0 + \sum_{0 \le k \le n} a_{k+1}$$
* 첫번째 식과 두번째 식을 같다고 놓고, 적절히 조작해서 $$S_n$$으로 표현한다.

섭동법을 적용해보자.

* 첫번째: 합의 마지막 항을 뽑아낸다.

$$ \Box_{n+1} = \Box_n + (n+1)^2 $$

* 두번째: 합의 첫 항을 뽑아낸다.

$$
\begin{align}
\Box_{n+1}
    & = 0^2 + \sum_{1 \le k \le n+1} k^2 \\
    & = 0^2 + \sum_{0 \le k \le n} (k+1)^2 \\
\end{align}
$$

* 이제 둘을 조합한다.

$$
\begin{align}
\Box_n + (n+1)^2
    & = 0^2 + \sum_{0 \le k \le n} (k+1)^2 \\
    & = \sum_{0 \le k \le n} (k^2 + 2k + 1) \\
    & = \sum_{0 \le k \le n} k^2 + \sum_{0 \le k \le n} 2k + \sum_{0 \le k \le n} 1 \\
    & = \Box_n + \sum_{0 \le k \le n} 2k + \sum_{0 \le k \le n} 1 \\
    & = \Box_n + 2 \sum_{0 \le k \le n} k + (n + 1) \\
    & = \Box_n + 2 \cdot \frac{n(n+1)}{2} + (n + 1) \\
    & = \Box_n + n(n+1) + (n + 1) \\
\\
\Box_n + (n+1)^2
    & = \Box_n + n^2 + 2n + 1 \\
\end{align}
$$

`0 = 0` 모양이 나와 작업이 실패하였다.

그렇다면 조금 더 머리를 굴려서 $$\sum k^2$$ 모양이 남도록 조작을 할 궁리를 해야 한다.

방금 양 변이 $$\sum k^2 ... = \sum k^2 ...$$의 모양이 되어 $$\Box_n$$이 소거되었는데, 혹시 $$\sum k^3$$을 사용하면 양 변이 $$\sum k^3 ... = \sum k^3 ...$$ 이 되고 $$\sum k^2$$가 남을 가능성은 없을까? 궁금하니 시도해 보자.

일단 다음과 같이 세제곱의 합을 정의하자.

$$ \unicode{0x2750}_n = \sum_{0 \le k \le n} k^3 $$

그렇다면 다음과 같이 섭동법을 적용해 보자.

* 첫번째: 합의 마지막 항을 뽑아낸다.

$$\unicode{0x2750}_{n+1} = \unicode{0x2750}_n + (n+1)^3$$

* 두번째: 합의 첫 항을 뽑아낸다.

$$
\unicode{0x2750}_{n+1} = 0^3 + \sum_{0 \le k \le n} (k+1)^3
$$

* 이제 둘을 조합한다.

$$
\begin{align}
\unicode{0x2750}_n + (n+1)^3
    & = 0^3 + \sum_{0 \le k \le n} (k+1)^3 \\
    & = \sum_{0 \le k \le n} (k^3 + 3k^2 + 3k +1) \\
    & = \sum_{0 \le k \le n} k^3 + \sum_{0 \le k \le n}3k^2 + \sum_{0 \le k \le n}3k + \sum_{0 \le k \le n}1 \\
    & = \unicode{0x2750}_n + \sum_{0 \le k \le n}3k^2 + \sum_{0 \le k \le n}3k + \sum_{0 \le k \le n}1 \\
(n+1)^3
    & = \sum_{0 \le k \le n}3k^2 + \sum_{0 \le k \le n}3k + \sum_{0 \le k \le n}1 \\
(n+1)^3
    & = 3 \Box_n + \sum_{0 \le k \le n}3k + \sum_{0 \le k \le n}1 \\
n^3 + 3n^2 + 3n + 1
    & = 3 \Box_n + 3 \cdot \frac{n(n+1)}{2} + (n+1) \\
2n^3 + 6n^2 + 6n + 2
    & = 6 \Box_n + 3 n(n+1) + 2(n+1) \\
2n^3 + 6n^2 + 6n + 2
    & = 6 \Box_n + 3n^2 + 5n + 2 \\
2n^3 + 3n^2 + n
    & = 6 \Box_n \\
\Box_n
    & = { 2n^3 + 3n^2 + n \over 6 } \\
    & = { n(2n^2 + 3n + 1) \over 6 } \\
    & = { n(n + 1)(2n + 1) \over 6 } \\
\end{align}
$$

닫힌 형식을 구했다!


# Links

* [[CONCRETE-MATH]]
