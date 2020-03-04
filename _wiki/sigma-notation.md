---
layout  : wiki
title   : 시그마 표기법
summary : ∑ 기호의 의미와 사용
date    : 2020-03-04 20:49:36 +0900
updated : 2020-03-04 21:06:48 +0900
tag     : math
toc     : true
public  : true
parent  : [[math]]
latex   : true
---
* TOC
{:toc}

## TeX 에서 사용하기

TeX에서 `\sum`으로 쓴다.

$$ \sum $$

아래에 뭔가 붙이려면 `_`을 쓰면 된다.

* `\sum_{ a }`, `\sum_b`

$$ \sum_{ a } \quad \sum_b $$

위에 뭔가 붙이려면 `^`을 쓰면 된다.

* `\sum_{k=1}^{n} a_k`

$$ \sum_{k=1}^{n} a_k $$

## 시그마 표기

$$ \sum_{k=1}^{n} a_k $$ 는 $$a_1$$ 부터 $$a_n$$ 까지의 합을 의미한다.

$$ \sum_{k=1}^{n} a_k = a_1 + a_2 + ... + a_n $$

코드로 보자면 단순히 합계를 구하는 루프이다.

```python
def sum(n, a):
    """ 리스트 a의 1번째 원소부터 n번째 원소까지의 합을 구한다 """
    sum = 0
    for k in range(1, n+1):
        sum += a[k]
    return sum

 # list a 가 다음과 같다면
a = [0, 2, 4, 8, 10, 12, 14]

 # 1번째 원소부터 3번째 원소까지를 더한 결과
print(sum(3, a))    # 2 + 4 + 8 = 14
```


### 일반화된 시그마 표기

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


### 한계 명시 시그마 표기

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


## 함께 읽기

* [[CONCRETE-MATH]]

## 참고 문헌

* CONCRETE MATHEMATICS 구체 수학 / 로널드 L. 그레이엄, 도널드 E. 커누스, 오렌 파타슈닉 저/류광 역 / 인사이트(insight) / 초판 1쇄 2018년 04월 20일

