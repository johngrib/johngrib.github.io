---
layout  : wiki
title   : 구체수학 02.합.05.일반적인 방법들
summary : 02.SUMS.05.GENERAL METHODS
date    : 2018-05-19 10:40:25 +0900
updated : 2018-05-19 11:26:43 +0900
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



# Links

* [[CONCRETE-MATH]]
