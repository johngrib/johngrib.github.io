---
layout  : wiki
title   : 구체수학 02.합.01.표기법
summary : 02.SUMS.01.NOTATION
date    : 2018-05-02 22:02:21 +0900
updated : 2018-05-18 13:32:39 +0900
tag     : math
toc     : true
public  : true
parent  : study-concrete-math
latex   : true
---
* TOC
{:toc}

# 표기법

## 표준적인 표기법

### 시그마 표기

$$
\sum_{k=1}^{n} a_k
$$

위의 표기는 $$a_1$$ 부터 $$a_n$$ 까지의 합을 의미한다.

$$a_1 + a_2 + ... + a_n $$

코드로 보자면 단순히 합계를 구하는 루프이다.

```python
def sum(n, a):
    """ 리스트 a의 1번째 원소부터 n번째 원소까지의 합을 구한다 """
    sum = 0
    for k in range(1, n+1):
        sum += a[k]
    return sum

# 결과는 2 + 4 + 8 = 14
print(sum(3, [0, 2, 4, 8, 10, 12, 14]))
```

* 참고로 $$\sum$$ 기호는 LATEX에서 `\sum`으로 쓴다.

#### 일반화된 시그마 표기

* 합산을 진행할 색인들의 집합을 규정하는 조건을 $$\sum$$ 아래쪽에 명시해준다.(오른쪽 식)

$$
\sum_{k=1}^{n} a_k = \sum_\color{red}{1 \le k \le n} a_k
$$

* 예: 100 미만의 모든 홀수의 제곱의 합
    * 색인이 $$1 \le k \le n \; \text{ AND  k는 홀수 }$$이므로 $$k$$는 `[1, 3, 5, 7, ... n]` 이다.

$$
\sum_{\substack{1 \le k \lt 100 \\ \text{k는 홀수}}} k^2
$$

1부터 100까지의 모든 홀수의 제곱의 합을 구하는 것이므로, 심플하게 다음과 같이 생각해도 된다.

```python
def sigma():
    """ 100 이하 모든 홀수의 제곱의 합 """
    sum = 0
    for k in range(1, 100, 2):
        sum += k**2
    return sum

print(sigma())  # 결과는 166650
```


#### 한계 명시 시그마 표기

* 한계 명시 표기법은 $$\sum$$ 위쪽에 한계를 명시한다.
* 조제프 푸리에(Joseph Fourier)가 1820년에 도입한 표기법.

$$
\sum_{k = 0}^\color{red}{49} (2k + 1)^2
$$

```python
def sigma():
    sum = 0
    for k in range(0, 49 + 1):
        sum += (2*k + 1)**2
    return sum

print(sigma())  # 결과는 166650
```

* 결과가 `166650`으로 위의 코드 실행 결과와 똑같다.
    * 잘 살펴보면 두 식이 똑같다는 것을 알 수 있다.
    * `2k + 1`에 `k` 값으로 `0 ~ 49`를 넣어 보면 `1, 3, 5, ... 99` 이다.

## 전통과 벗어난 표기법

* 케네스 E. 아이버슨(Kenneth E. Iverson)이 프로그래밍 언어 APL에서 착안.
    * 명제가 참이면 1, 거짓이면 0.

$$
[\text{p는 소수}] =
\begin{cases}
    1,  & \text{if p is a prime number;} \\[2ex]
    0,  & \text{if p is not a prime number.}
\end{cases}
$$

이 표기법은 상당히 편리하고 이해하기 쉽다.

$$
[1은 2이다] + [2는 2이다] = 0 + 1 = 1
$$

`True`는 `1`이고 `False`가 `0` 이므로 일반적인 프로그래밍 언어 상식과도 맞아 떨어진다.

```python
bool(1 == 2) + bool(2 == 2) # 0 + 1 이므로 결과는 1
```


# Links

* [[CONCRETE-MATH]]
