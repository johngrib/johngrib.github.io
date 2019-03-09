---
layout  : wiki
title   : 구체수학 01.재귀적인 문제들.연습문제
summary : 01.RECURRENT PROBLEMS.Exercises
date    : 2018-06-01 21:28:05 +0900
updated : 2018-06-02 09:44:05 +0900
tag     : math
toc     : true
public  : true
parent  : study-concrete-math
latex   : true
---
* TOC
{:toc}

* 이 문서는 [[CONCRETE-MATH]]책의 1장 연습 문제 중 몇몇을 공부하며 메모한 것입니다.

# Warmups

# Homework exercises

## 1.8

### 문제

> 다음 점화식의 해를 구하라.
>
$$
\begin{align}
Q_0 & = \alpha; \\
Q_1 & = \beta; \\
Q_n & = (1 + Q_{n-1})\frac{1}{Q_{n-2}}, \quad for \; n \gt 1.
\end{align}
$$
>
모든 $$n \ge 0$$에 대해 $$Q_n \ne 0$$이라고 가정하라.

### 풀이

위의 점화식은 python 이라면 다음과 같을 것이다.

```python
def Q(n):
    if n == 0:
        return alpha
    if n == 1:
        return beta
    return (1 + Q(n-1)) / Q(n-2)
```

코딩 문제라면, 위의 재귀함수의 시간 복잡도를 최대한 개선하는 것이 목표라고 볼 수 있겠다.

일단 순서대로 풀어내 보자.

$$
\require{cancel}
\begin{align}
Q_0 & = \alpha \\
Q_1 & = \beta \\
Q_2 & = (1+Q_1)\frac{1}{Q_0} \\
    & = (1+\beta)\frac{1}{\alpha} = \frac{1 + \beta}{\alpha} \\
Q_3 & = (1+Q_2)\frac{1}{Q_1} \\
    & = \left( 1+(1+\beta)\frac{1}{\alpha} \right) \frac{1}{\beta} \\
    & = \left( \frac{\alpha}{\alpha}+\frac{1}{\alpha}+\frac{\beta}{\alpha} \right) \frac{1}{\beta} \\
    & = \frac{\alpha + \beta + 1}{\alpha \beta} \\
Q_4 & = (1+Q_3)\frac{1}{Q_2} \\
    & = \left(1+\frac{\alpha + \beta + 1}{\alpha \beta}\right)\frac{1}{(1+\beta)\frac{1}{\alpha}} \\
    & = \left(\frac{\alpha \beta + \alpha + \beta + 1}{ \cancel{\alpha} \beta}\right)\frac{\cancel{\alpha}}{(1+\beta)} \\
    & = \left(\frac{\alpha \beta + \alpha + \beta + 1}{\beta}\right)\frac{1}{(1+\beta)} \\
    & = \left(\frac{(\alpha + 1)\cancel{(\beta + 1)}}{\beta}\right)\frac{1}{\cancel{(1+\beta)}} \\
    & = \frac{\alpha + 1}{\beta} \\
Q_5 & = (1+Q_4)\frac{1}{Q_3} \\
    & = (1+\frac{\alpha + 1}{\beta})\frac{1}{\frac{\alpha + \beta + 1}{\alpha \beta} } \\
    & = (1+\frac{\alpha + 1}{\beta})\frac{\alpha \beta}{\alpha + \beta + 1} \\
    & = (\frac{\beta + \alpha + 1}{\beta})\frac{\alpha \beta}{\alpha + \beta + 1} \\
    & = (\frac{\cancel{\beta + \alpha + 1}}{\cancel{\beta}})\frac{\alpha \cancel{\beta}}{\cancel{\alpha + \beta + 1}} \\
    & = \alpha \\
Q_6 & = (1+Q_5)\frac{1}{Q_4} \\
    & = (1+\alpha)\frac{1}{\frac{\alpha + 1}{\beta} } \\
    & = (1+\alpha){\frac{\beta}{\alpha + 1} } \\
    & = \beta \\
\end{align}
$$

표로 나타내면 다음과 같이 순환하고 있음을 알 수 있다.

곰곰히 살펴보면 순환 주기는 `5` 라는 것도 알 수 있다.

| n | $$Q_n$$                                     |
|---|---------------------------------------------|
| 0 | $$\alpha$$                                  |
| 1 | $$\beta$$                                   |
| 2 | $$\frac{1 + \beta}{\alpha}$$                |
| 3 | $$\frac{\alpha + \beta + 1}{\alpha \beta}$$ |
| 4 | $$\frac{\alpha + 1}{\beta}$$                |
| 5 | $$\alpha$$                                  |
| 6 | $$\beta$$                                   |

그렇다면 `n` 값이 4보다 크다면, 5로 나눈 나머지를 새로운 `n`으로 삼아 계산하면 된다.

따라서 이 문제의 답은 위의 표가 된다고 할 수 있다.

코드로 표현한다면 어떨까?

python이라면 다음과 같이 표현할 수 있을 것이다. 

```python
def Q(n):
    n = n % 5

    if n == 0:
        return alpha
    if n == 1:
        return beta

    return (1 + Q(n-1)) / Q(n-2)
```

`n`을 5로 나눈 나머지로 재할당하고 있기 때문에, `n`에 아무리 큰 값이 들어온다 하더라도 최대 8번만 재귀한다.

만약 `n = 4`인 경우 다음과 같은 호출이 일어나기 때문이다.

$$
Q(4)
    \begin{cases} 
    Q(3)
        \begin{cases}
        Q(2)
            \begin{cases}
            Q(1) \\ Q(0)
            \end{cases} \\
        Q(1)
        \end{cases} \\
    Q(2)
        \begin{cases}
        Q(1) \\ Q(0)
        \end{cases} \\
    \end{cases}
$$

재할당을 할 수 없거나 하지 않기로 약속한 환경이라면 다음과 같이 `if`를 하나 더 추가하여 한 번 더 재귀하는 것도 방법이겠다.

```python
def Q(n):
    if n == 0:
        return alpha
    if n == 1:
        return beta
    if n > 4:
        return Q(n % 5)

    return (1 + Q(n-1)) / Q(n-2)
```

물론 순환 주기가 5 밖에 안 되기 때문에 다음과 같이 `if` 문을 잔뜩 사용한 하드 코드도 하나의 방법이겠지만, 별로 바람직해 보이지는 않는다.

```python
def Q(n):
    n = n % 5
    if n == 0:
        return alpha
    if n == 1:
        return beta
    if n == 2:
        return (1+beta) / alpha
    if n == 3:
        return (alpha + beta + 1) / (alpha * beta)
    if n == 4:
        return (alpha + 1) / beta
```

그런데 만약 2 장에서 배우는 [아이버슨의 관례](/wiki/c-m-02-Sums-01/#전통과-벗어난-표기법)와 3 장에서 배우는 `mod`를 사용하면, 위의 `if`문이 떡칠된 코드는 다음과 같은 식으로 표현이 가능하다. 코드와 굉장히 유사하게 표현할 수 있다는 점이 재미있다. 보이는 것만 똑같은 것이 아니라 코드와 의미도 똑같다.

$$
\begin{align}
Q_n & = [n\mod 5 = 0]\times \alpha \\
    & + [n\mod 5 = 1]\times \beta \\
    & + [n\mod 5 = 2]\times \frac{1+\beta}{\alpha} \\
    & + [n\mod 5 = 3]\times \frac{\alpha+\beta+1}{\alpha \beta} \\
    & + [n\mod 5 = 4]\times \frac{\alpha+1}{\beta}
\end{align}
$$

### 참고사항

* 아이버슨의 관례 표기법
    * `[ ]` 안에 들어간 식이 참인 경우 `1`을 리턴하고, 그 외의 경우 `0`을 리턴한다.
* `mod`
    * 나머지를 구하는 연산이다.



# Exam problems

# Bonus problems

# Links

* [[CONCRETE-MATH]]

