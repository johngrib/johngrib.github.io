---
layout  : wiki
title   : 하노이의 탑 (The Tower of Hanoi)
summary : 
date    : 2019-12-16 21:24:41 +0900
updated : 2019-12-17 08:07:12 +0900
tag     : math
toc     : true
public  : true
parent  : [[algorithm]]
latex   : true
---
* TOC
{:toc}

## 하노이의 탑?

* 프랑스 수학자 에두아르 뤼카(Edouard Lucas)가 1883년에 만든 문제.
* 하노이의 탑 규칙은 [위키백과](https://ko.wikipedia.org/wiki/%ED%95%98%EB%85%B8%EC%9D%B4%EC%9D%98_%ED%83%91 )를 참고.

하노이의 탑은 보통 두 가지 문제로 나뉜다.

* 원반을 이동하는 총 횟수를 구하는 문제.
* 원반을 이동하는 과정을 출력하는 문제.

## 요약

하노이의 탑에 있는 원반 n 개를 다른 한 기둥으로 옮기는 최소한의 이동 횟수 $$T_n$$은 다음과 같다.

$$ T_n = 2^n - 1$$

n 개의 원반을 옮기는 방법은 다음과 같이 생각하면 심플하다.

1. 가장 작은 원반을 $$1$$번, 가장 큰 원반을 $$n$$ 번이라 한다.
2. 중간 위치로 $$1$$번부터 $$n-1$$번 원반까지 옮긴다.
3. 목적지 위치로 $$n$$번 원반을 옮긴다.
4. 중간 위치에서 목적지 위치로 $$1$$번부터 $$n-1$$번 원반을 옮긴다.

이 방법은 재귀를 사용하면 1~4 번 과정을 말로 설명한 것과 유사한 형태의 코드를 작성할 수 있다.

```go
func hanoi(source, destination, temp string, n int) {
    if n <= 0 {
        return
    }
    // source -> temp 로 n-1 개를 옮긴다.
    hanoi(source, temp, destination, n-1)
    // 원반 하나를 source -> destination 으로 옮긴다.
    fmt.Printf("%d 원반을 %s 에서 %s 로 옮깁니다.\n", n, source, destination)
    // temp -> destination 으로 n-1 개를 옮긴다
    hanoi(temp, destination, source, n-1)
}
```

[[gray-code]]{그레이 코드}는 하노이의 탑 솔루션이기도 하다.


## 점화식

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
& T_n \ge 2 \times T_{n-1} + 1, \quad for \; n > 0 \\
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

### 점화식의 해를 구하자

해를 구하기 위해 먼저 작은 n 값들을 살펴보자.

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

곰곰히 살펴보면 다음을 알 수 있다.

`식 1.2`

$$ T_n = 2^n - 1, \quad for \; n \ge 0 $$

```python
def T(n):
    return 2**n - 1
```

### 수학적 귀납법을 사용한 증명

수학적 귀납법을 사용해 증명하려면 두 가지 단계를 증명하면 된다.

* 기초 단계(basis) : $$n_0$$에 대해 명제를 증명한다.
* 귀납 단계(induction) : ($$n_0$$에서 $$n-1$$에 대해 명제가 증명되었다는 가정 하에서) $$n \gt n_0$$에 대해 명제를 증명한다.

기초 단계는 쉽게 해결할 수 있다.

$$ T_0 = 2^0 - 1 = 0 $$

귀납 답계는 `식 1.1`을 사용해 `식 1.2`를 유도해 내어, `식 1.2`가 모든 $$n$$에 대하여 성립함을 보인다.

$$
\begin{align}
T_n & = 2 \times (T_{n-1}) + 1 \\
    & = 2 \times ( 2^{n-1} - 1) + 1 \\
    & = 2^n - 2 + 1 \\
    & = 2^n - 1 \\
\end{align}
$$

### 점화식의 해를 간단하게 바꾸자

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

## 원반을 옮기는 과정을 출력하자

다음은 원반을 옮기는 과정을 출력하는 go 코드이다.

```go
func hanoi(source, destination, temp string, n int) {
    if n <= 0 {
        return
    }
    // source -> temp 로 n-1 개를 옮긴다.
    hanoi(source, temp, destination, n-1)
    // 원반 하나를 source -> destination 으로 옮긴다.
    fmt.Printf("%d 원반을 %s 에서 %s 로 옮깁니다.\n", n, source, destination)
    // temp -> destination 으로 n-1 개를 옮긴다
    hanoi(temp, destination, source, n-1)
}
```

만약 `hanoi("source", "dest", "temp", 3)`과 같이 호출하면 다음과 같은 결과가 나온다.

```
1 원반을 source 에서 dest 로 옮깁니다.
2 원반을 source 에서 temp 로 옮깁니다.
1 원반을 dest 에서 temp 로 옮깁니다.
3 원반을 source 에서 dest 로 옮깁니다.
1 원반을 temp 에서 source 로 옮깁니다.
2 원반을 temp 에서 dest 로 옮깁니다.
1 원반을 source 에서 dest 로 옮깁니다.
```


### 그레이 코드

[[gray-code]]{그레이 코드}는 하노이의 탑 원반 이동 과정을 출력하는 문제의 솔루션이다.

## 참고문헌

* CONCRETE MATHEMATICS / 로널드 L. 그레이엄, 도널드 E. 커누스, 오렌 파타슈닉 저/류광 역 / 인사이트(insight) / 초판 1쇄 2018년 04월 20일
* 다이내믹 프로그래밍 완전 정복 / 미나크시, 카말 라와트 저/박상은 역 / 한빛미디어 / 초판 1쇄 2019년 10월 04일
