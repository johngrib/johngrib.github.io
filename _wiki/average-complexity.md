---
layout  : wiki
title   : 평균 계산 복잡도 구하기
summary : Average Case Computational Complexity
date    : 2019-04-07 23:29:38 +0900
updated : 2019-05-27 14:08:24 +0900
tag     : algorithm
toc     : true
public  : true
parent  : algorithm
latex   : true
---
* TOC
{:toc}

# 준비물

* 평균 계산 복잡도를 산출하려면 확률 변수와 기대값에 대해 알아야 한다.

## 확률 변수

**Random Variables**

> A random variable is a function from the sample space of an experiment to the set of real numbers.
That is, a random variable assigns a real number to each possible outcome.

* 확률 변수는 **실험의 표본 공간**으로부터 **실수의 집합**으로의 함수다.
* 확률 변수(함수)는 가능한 모든 결과에 실수를 할당한다.
* 확률 변수는 주로 `X()`로 표기한다.

이름은 확률 변수지만 **함수**라는 점에 주의하자.

## 확률 변수의 예제

$$X$$가 동전을 두 번 던진 결과 $$t$$에서 앞면의 수를 할당하는 확률 변수(함수)라 하자.

X(t)는 모두 다음의 값을 갖는다.

$$
\begin{align}
X(HH) & = 2 \\
X(HT) & = X(TH) = 1 \\
X(TT) & = 0 \\
\end{align}
$$

## 기대값

**Expected Values**

> The expected value, also called the expectation
or mean, of the random variable $$X$$ on the sample space $$S$$ is equal to  
$$ E(X) = \sum_{s \in S} p(s) X(s) $$.  
The deviation of $$X$$ at $$s ∈ S$$ is $$X(s) − E(X)$$,
the difference between the value of $$X$$ and the mean of $$X$$.

* 표본 공간 $$S$$에서의 확률 변수 $$X$$의 기대값(혹은 평균)
    * $$ E(X) = \sum_{s \in S} p(s) X(s) $$.
        * $$p(s)$$: $$s$$의 확률.
    * 즉, 각 경우에 대한 확률 변수와 그 확률을 곱한 값을 모두 더한 것이다.
    * 즉, 평균이다.
* 편차는 $$X(s) - E(X)$$ 이다.
    * 즉, $$X$$의 값과 $$X$$의 평균과의 차이이다.

# 평균 계산 복잡도

다음과 같이 정의하자.

* $$a_j$$: 가능한 입력. $$j = 1, 2, ..., n $$
* $$X(a_j)$$: 입력 $$a_j$$에 대해 알고리즘이 사용하는 연산의 수
* $$p(a_j)$$: $$a_j$$의 확률

그렇다면 $$X$$의 기대값(평균 계산 복잡도)를 다음과 같이 표현할 수 있다.

$$ E(X) = \sum_{j=1}^n p(a_j) X(a_j) $$

## 예제: 선형 탐색 알고리즘

다음과 같이 선형 탐색 알고리즘을 심플하게 구현한 함수가 있다.

```js
function linearSearch(x, list) {
  let i = 0;
  for (let i = 0; i < list.length; i++) {
    if (list[i] === x) {
      return i;
    }
  }
  return -1;
}
```

* list의 길이가 $$n$$ 이라 하자.
* 가능한 결과는 $$-1$$이 리턴되는 경우까지 합쳐서 모두 $$n+1$$개이다.
* $$x$$가 리스트에 있을 확률을 $$p$$라 하자.
* $$x$$가 리스트에 없을 확률을 $$q = 1 - p$$라 하자.

비교 연산은 매 루프마다 2번씩 일어난다. `i < list.length`와 `list[i] === x`

그러므로 다음과 같이 생각할 수 있다.

* x가 0번 인덱스에 있다면 필요한 연산의 수는 $$2 \times 1$$.
* x가 1번 인덱스에 있다면 필요한 연산의 수는 $$2 \times 2$$.
* ...
* x가 $$n-1$$번 인덱스(리스트의 마지막)에 있다면 필요한 연산의 수는 $$2 \times n$$.
* x가 리스트에 없다면 필요한 연산의 수는 $$2 \times (n+1) = 2n + 2$$

리스트에 x가 있고, 리스트의 i번째 아이템과 x 가 같을 확률은 $$p \times { 1 \over n }$$.

따라서 기대값은 다음과 같이 표현할 수 있다.

$$
\begin{align}
E & = {2p \over n} + {4p \over n} + ... + {2np \over n} + (2n + 2)q \\
  & = {2p \over n}(1 + 2 + ... + n) + (2n + 2)q \\
  & = {2p \over n} \times {n(n+1) \over 2} + (2n + 2)q \\
  & = p(n+1) + (2n + 2)q \\
\end{align}
$$

* 만약 리스트에 x가 반드시 포함된다고 하면
    * $$p = 1, q = 0$$ 이므로 평균 계산 복잡도는 $$ n + 1 $$이 된다.
* 만약 리스트에 x가 존재하지 않는다고 하면
    * $$p = 0, q = 1$$ 이므로 평균 계산 복잡도는 $$ 2n + 2 $$이 된다.
* 만약 리스트에 x가 존재할 확률이 $${1 \over 2}$$ 라면
    * $$p = q = {1 \over 2}$$ 이므로 평균 계산 복잡도는 $$ {3n +3 \over 2} $$이 된다.


## 예제: 삽입 정렬 알고리즘

다음과 같이 삽입 정렬 알고리즘을 심플하게 구현한 함수가 있다. (코드 출처는 [한국어 위키백과](https://ko.wikipedia.org/wiki/삽입_정렬 ))

```python
def insert_sort(x):
    for i in range(1, len(x)):
        j = i - 1
        key = x[i]
        while x[j] > key and j >= 0:
            x[j+1] = x[j]
            j = j - 1
        x[j+1] = key
    return x
```

* 정렬할 $$n$$개의 원소 $$a_1, a_2, ..., a_n$$가 있다고 하자.
* $$i-1$$개의 원소가 정렬된 상태에서, $$a_i$$를 삽입하는데 필요한 비교 연산의 수를 확률변수 $$X_i$$라 하자.
    * $$X_1$$: $$0$$개의 원소가 정렬된 상태에서, $$a_1$$을 삽입하는 데 필요한 비교 연산의 수.
    * $$X_2$$: $$1$$개의 원소가 정렬된 상태에서, $$a_2$$을 삽입하는 데 필요한 비교 연산의 수.
    * ...
    * $$X_n$$: $$n-1$$개의 원소가 정렬된 상태에서, $$a_n$$을 삽입하는 데 필요한 비교 연산의 수.

그런데 확률변수 $$X_i$$는 $$i$$ 를 알면 바로 얻어낼 수 있는 값일까?

그렇지 않다.

만약 $$2,4,13,14$$ 가 정렬되어 있는 상태에서 $$25$$를 삽입하려 한다면 $$2, 4, 13, 14$$과 비교해야 할 것이므로 4 번의 비교가 필요하다.

이 경우 $$X_5 = 4$$ 이다.

하지만 $$2,4,13,14$$ 가 정렬되어 있는 상태에서 $$1$$을 삽입하려 한다면 $$2$$하고만 비교하면 되므로 1번의 비교로 충분하다.

이 경우 $$X_5 = 1$$ 이다.

즉 삽입하려는 원소 $$a_5$$가 이미 정렬된 수열의 어느 자리에 들어가야 하는지에 따라 확률 변수$$X_5$$의 값이 바뀐다.

```text
  a_1,  a_2,  a_3,  a_4
1     2     3     4     5
번    번     번    번    번
자    자     자    자    자
리    리     리    리    리
```

그러므로 $$X_5$$의 기대값을 다음과 같이 생각할 수 있다.

$$
\begin{align}
E(X_5) & = \text {1번 자리에 들어갈 확률 $\times$ 1번 자리에 들어갈 경우 비교 연산의 수} \\
    & + \text {2번 자리에 들어갈 확률 $\times$ 2번 자리에 들어갈 경우 비교 연산의 수} \\
    & + \text {3번 자리에 들어갈 확률 $\times$ 3번 자리에 들어갈 경우 비교 연산의 수} \\
    & + \text {4번 자리에 들어갈 확률 $\times$ 4번 자리에 들어갈 경우 비교 연산의 수} \\
    & + \text {5번 자리에 들어갈 확률 $\times$ 5번 자리에 들어갈 경우 비교 연산의 수} \\
\end{align}
$$

이걸 기호를 사용하면 조금 더 단순하게 쓸 수 있다.

$$
\begin{align}
E(X_5) & = p_5(1) \times X_i(1) \\
    & + p_5(2) \times X_i(2) \\
    & + p_5(3) \times X_i(3) \\
    & + p_5(4) \times X_i(4) \\
    & + p_5(5) \times X_i(5) \\
\end{align}
$$

$$\sum$$를 쓰면 한 줄로 표현할 수 있다.

$$ E(X_5) = \sum_{k=1}^5 p_5(k) \times X_i(k) \\ $$

그런데 1번 자리에 들어가건 2번 자리에 들어가건
수열이 랜덤하게 분포되어 있다면 확률은 다 똑같다.

따라서 다음과 같이 식을 다시 쓸 수 있다.

$$
\begin{align}
E(X_5) & = \sum_{k=1}^5 { 1 \over 5 } \times X_i(k) \\
    & = {1 \over 5} \sum_{k=1}^5 X_i(k) \\
\end{align}
$$

한편, $$X_i(k)$$는 $$k$$번 자리에 들어갈 경우 비교 연산의 수 이므로, 그냥 $$k$$ 이다.

그러므로 식을 다음과 같이 정리할 수 있다.

$$
\begin{align}
E(X_5) & = {1 \over 5} \sum_{k=1}^5 k \\
    & = {1 \over 5} \times { 5 ( 5 + 1 ) \over 2 } \\
\end{align}
$$

$$X_5$$인 경우를 해 봤으니 $$X_i$$인 경우에 대해서 일반화를 해보면 다음과 같을 것이다.

$$
\begin{align}
E(X_i) & = {1 \over i} \sum_{k=1}^i k \\
    & = {1 \over i} \times { i ( i + 1 ) \over 2 } \\
    & = { i + 1 \over 2 } \\
\end{align}
$$


이제 삽입 정렬의 평균 계산 복잡도를 구할 수 있다.

삽입 정렬은 원소를 하나하나 정렬해가므로, 삽입 정렬 과정 전체에 필요한 비교 연산의 수는 다음과 같을 것이다.

$$ X = X_1 + X_2 + ... + X_n $$

$$X_1$$은 $$0$$일 것이므로 $$X_1$$을 제외하고 다시 써보자.

$$ X = X_2 + X_3 + ... + X_n $$

그렇다면 기대값은 다음과 같을 것이다.

$$
\begin{align}
E(X) & = E(X_2 + X_3 + ... + X_n) \\
     & = E(X_2) + E(X_3) + ... + E(X_n) \\
\end{align}
$$

그런데 $$E(X_i) = { i + 1 \over 2 }$$라는 것을 위에서 이미 밝혔으므로 이를 이용하여 다음과 같이 정리할 수 있다.

$$
\begin{align}
E(X) & = E(X_2) + E(X_3) + ... + E(X_n) \\
    & = \sum_{i=2}^n E(X_i) \\
    & = \sum_{i=2}^n { i + 1 \over 2 } \\
    & = \sum_{i=1}^n { i + 1 \over 2 } - { 1 + 1 \over 2 }\\
    & = \sum_{i=1}^n { i + 1 \over 2 } - 1 \\
    & = \frac{1}{2} \sum_{i=1}^n ( i + 1 ) - 1 \\
    & = \frac{1}{2} \sum_{i=1}^n i + \frac{n}{2} - 1 \\
    & = \frac{1}{2} \times \frac{n (n+1)}{2} + \frac{n}{2} - 1 \\
    & = \frac{n (n+1)}{4} + \frac{2n}{4} - \frac{4}{4} \\
    & = \frac{n^2 + 3n - 4}{4} \\
\end{align}
$$

즉, 삽입 정렬 알고리즘에서 사용하는 비교 연산의 평균 개수는 $$ \frac{n^2 + 3n - 4}{4} $$ 이므로
$$ \Theta(n^2)$$ 이다.

# 함께 읽기

* [[big-O-notation]]

# 참고문헌

* Rosen의 이산수학 / Kenneth H. Rosen 저 / 공은배 등저 / 한국맥그로힐(McGraw-Hill KOREA) / 2017년 01월 06일

