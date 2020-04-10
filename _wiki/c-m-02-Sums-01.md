---
layout  : wiki
title   : 구체수학 02.합.01.표기법
summary : 02.SUMS.01.NOTATION
date    : 2018-05-02 22:02:21 +0900
updated : 2020-04-10 23:51:40 +0900
tag     : math
toc     : true
public  : true
parent  : [[study-concrete-math]]
latex   : true
---
* TOC
{:toc}

## 표기법

### 표준적인 표기법

#### 시그마 표기

[[sigma-notation]]

### 전통과 벗어난 표기법

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


### Links

* [[CONCRETE-MATH]]
