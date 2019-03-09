---
layout  : wiki
title   : 구체수학 01.재귀적인 문제들.01.하노이의 탑
summary : 01.RECURRENT PROBLEMS
date    : 2018-04-26 21:58:11 +0900
updated : 2018-05-18 06:41:05 +0900
tag     : math
toc     : true
public  : true
parent  : study-concrete-math
latex   : true
---
* TOC
{:toc}

# 개요

* 이 문서는 [[CONCRETE-MATH]]책의 1장을 공부하며 메모한 것입니다.
* 이 문서는 메모일 뿐이니 자세한 내용은 교재를 참고해야 합니다.

# 1.1 하노이의 탑(THE TOWER OF HANOI)

* 프랑스 수학자 에두아르 뤼카(Edouard Lucas)가 1883년에 만든 문제.
* 하노이의 탑 규칙은 [위키백과](https://ko.wikipedia.org/wiki/%ED%95%98%EB%85%B8%EC%9D%B4%EC%9D%98_%ED%83%91 )를 참고.


## 하노이의 탑 점화식

$$ T_n $$ : 원반 n 개를 다른 한 기둥으로 옮기는 데 필요한 최소한의 이동 횟수

* $$ T_0 = 0 $$ &nbsp;
* $$ T_1 = 1 $$ &nbsp;
* $$ T_2 = 3 $$ : 3번 만에 원반 2 개를 다른 한 기둥으로 옮길 수 있다.

python 코드로 표현하자면 다음과 같이 함수 `T`의 출력 결과 목록이라고 이해할 수 있다.

```python
print( T(0) )   # 출력 결과는 0
print( T(1) )   # 출력 결과는 1
print( T(2) )   # 출력 결과는 3
```

다음 과정을 거치면 `n`개의 원반이 있는 하노이의 탑을 클리어할 수 있다.

1. 가장 큰 원반 하나를 제외한 `n - 1` 개의 원반을 다른 기둥으로 옮긴다.
    * 이동 횟수는 $$ T_{n-1} $$.
2. 가장 큰 원반을 나머지 기둥으로 옮긴다.
    * 이동 횟수는 1.
3. `n - 1` 개의 원반을 가장 큰 원반 위로 옮긴다.
    * 이동 횟수는 $$ T_{n-1} $$.

그렇다면 총 이동 횟수는 $$T_{n-1} + T_{n-1} + 1$$ 이므로, 다음과 같은 일반식을 만들 수 있다.

`식 1.1`

$$
\begin{align}
& T_0 = 0; \\
& T_n \ge 2T_{n-1} + 1, \quad for \; n > 0 \\
\end{align}
$$

이와 같이 '**경곗값**(boundary value)'과 등식으로 구성되는 등식들을 다음과 같이 부른다.

* 점화식(recurrence)
* 점화 관계식(recurrence relation)
* 재귀식, 재귀관계식(recursion relation)

참고로 위의 점화식을 python 코드로 표현하자면 다음과 같다.

```python
def T(n):
    if n == 0:
        return 0
    return 2*T(n-1) + 1
```

## 점화식의 해(solution)

### 작은 n 값들을 살펴보기

$$
\begin{align}
& T_0 = 0 \\
& T_1 = 1 \\
& T_2 = 3 \\
& T_3 = 2 \times T_2 + 1 = 7 \\
& T_4 = 2 \times T_3 + 1 = 15 \\
& T_5 = 2 \times T_4 + 1 = 31 \\
& T_6 = 2 \times T_5 + 1 = 63 \\
& ... \\
\end{align}
$$

```python
for n in range(7):
    print(
        "T_{input} = {result}"
        .format(input=n, result=T(n))
    )
# T_0 = 0
# T_1 = 1
# T_2 = 3
# T_3 = 7
# T_4 = 15
# T_5 = 31
# T_6 = 63
```

곰곰히 살펴보면 다음과 같은 추측을 할 수 있다.

`식 1.2`

$$ T_n = 2^n - 1, \quad for \; n \ge 0 $$

```python
def T(n):
    return 2**n - 1
```


## 수학적 귀납법(mathematical induction)

수학적 귀납법

* 기초 단계(basis) : $$n_0$$에 대해 명제를 증명한다.
* 귀납 단계(induction) : ($$n_0$$에서 $$n-1$$에 대해 명제가 증명되었다는 가정 하에서) $$n \gt n_0$$에 대해 명제를 증명한다.

### 기초 단계

기초 단계는 쉽게 해결할 수 있다.

$$ T_0 = 2^0 - 1 = 0 $$

### 귀납 단계

`식 1.1`을 사용해 `식 1.2`를 유도해 냄으로써, `식 1.2`가 모든 $$n$$에 대하여 성립함을 보인다.

$$
\begin{align}
T_n & = 2 \times (T_{n-1}) + 1 \\
    & = 2 \times ( 2^{n-1} - 1) + 1 \\
    & = 2^n - 2 + 1 \\
    & = 2^n - 1 \\
\end{align}
$$

## 점화식의 해를 간단하게 구하기

`식 1.1`의 양 변에 1을 더해보자.

$$
\begin{align}
& T_0 + 1 = 1; \\
& T_n + 1 \ge 2T_{n-1} + 2, \quad for \; n > 0 \\
\end{align}
$$

이 때, $$U_n = T_n + 1$$ 이라 하면 다음과 같이 간단하게 바꿀 수 있다.

$$
\begin{align}
& U_0 = 1; \\
& U_n \ge 2U_{n-1}, \quad for \; n > 0 \\
\end{align}
$$

```python
def U(n):
    if n == 0:
        return 1
    return 2*U(n-1)

# T_0 = 0     U_0 = 1
# T_1 = 1     U_1 = 2
# T_2 = 3     U_2 = 4
# T_3 = 7     U_3 = 8
# T_4 = 15    U_4 = 16
# T_5 = 31    U_5 = 32
# T_6 = 63    U_6 = 64
```

# Links

* [[CONCRETE-MATH]]
* [하노이의 탑(wikipedia)](https://ko.wikipedia.org/wiki/%ED%95%98%EB%85%B8%EC%9D%B4%EC%9D%98_%ED%83%91 )
* [점화식](https://ko.wikipedia.org/wiki/%EC%A0%90%ED%99%94%EC%8B%9D )


