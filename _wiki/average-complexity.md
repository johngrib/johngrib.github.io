---
layout  : wiki
title   : 평균 계산 복잡도 구하기
summary : Average Case Computational Complexity
date    : 2019-04-07 23:29:38 +0900
updated : 2019-04-08 22:59:16 +0900
tags    : 
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
* $$x$$가 리스트에 없을 확률을 $$q = p - 1$$라 하자.

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





# 참고문헌

* Rosen의 이산수학 / Kenneth H. Rosen 저 / 공은배 등저 / 한국맥그로힐(McGraw-Hill KOREA) / 2017년 01월 06일

