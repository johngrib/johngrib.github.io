---
layout  : wiki
title   : 수열
summary : Sequences
date    : 2019-01-27 20:09:06 +0900
updated : 2019-02-16 21:29:36 +0900
tag     : math
toc     : true
public  : true
parent  : study-discrete-mathematics
latex   : true
---
* TOC
{:toc}

# 정의

## 수열

**Sequences**

>
A sequence is a function from a subset of the set of integers
(usually either the set $$\{0, 1, 2, ...\}$$ or the set $$\{1,2,3,...\}$$)to a set S.
We use the notation $$a_n$$ to denote the image of the integer $$n$$.
We call $$a_n$$ a term of the sequence.

* 수열은 정수 집합의 부분집합($$\{0, 1, 2, ... \}$$)으로부터 집합 S로의 함수이다.
* 정수 $$n$$의 상(image)을 나타내기 위해서 $$a_n$$을 사용한다.
* $$a_n$$을 수열의 항(term)이라고 한다$$a_n$$을 수열의 항(term)이라고 한다.

## 등비수열

**geometric progression**

>
A geometric progression is a sequence of the form  
$$a, ar, ar^2, ..., ar^n, ...$$  
where the initial term $$a$$ and the common ratio $$r$$ are real numbers.

* 등비수열은 지수 함수 $$ f(x) = ar^x $$의 이산적 모습이다.

## 등차수열

**arithmetic progression**

>
An arithmetic progression is a sequence of the form  
$$a, a + d, a + 2d, ..., a + nd, ...$$  
where the initial term $$a$$ and the common difference $$d$$ are real numbers.

* 등차수열은 선형 함수 $$ f(x) = dx + a $$의 이산적 모습이다.

## 점화관계

**Recurrence Relations**

>
A **recurrence relation** for the sequence $$\{a_n\}$$
is an equation that expresses $$a_n$$ in terms of one or more of the previous terms of the sequence,
namely, $$a_0, a_1, ..., a_{n−1}$$,
for all integers $$n$$ with $$n ≥ n_0$$, where $$n_0$$ is a nonnegative integer.
A sequence is called a solution of a recurrence relation if its terms satisfy the recurrence relation.
(A recurrence relation is said to recursively define a sequence.)

* $$a_n$$을 수열에 있는 하나 이상의 이전 항들을 이용하여 표시하는 등식.
* 수열의 항들이 점화관계를 만족하면, 이 수열을 점화관계의 해(solution)라고 부른다.
* 점화관계를 **수열의 재귀적 정의**라고도 부른다.
* 점화관계로부터 수열의 **닫힌 공식**(closed formula, 수열의 일반항)을 구하는 것을 다음과 같이 부른다.
    * "초기 조건이 수반된 점화관계를 풀었다"
    * "수열의 해를 얻었다"

### 반복법

**iteration**

점화 관계를 초기조건부터 연속적으로 적용하여 일반항을 얻을 수 있을 때까지 반복하는 방법.

반복법으로 다음 점화관계를 풀어보자.

$$
\begin{align}
a_0 & = 2 \\
a_n & = a_{n-1} +3 \\
\end{align}
$$

반복하다 보면 규칙이 보인다.

$$
\begin{array}{lll}
a_0 & = 2       & \\
a_1 & = a_0 + 3 & = 2 + 3 \\
a_2 & = a_1 + 3 & = 2+3 + 3 \\
a_3 & = a_2 + 3 & = 2+3+3 + 3 \\
... \\
a_n & = a_{n-1} + 3 & = 2+3 \times n \\
\end{array}
$$

* 이렇게 초항부터 반복을 시작하여 $$ a_n $$을 얻어내는 방법을 전향 대입(forward substitution)이라 한다.
* 반대로 $$ a_n $$ 부터 반복하는 것을 후향 대입(backward substitution)이라 한다.


# 용어 정리

| English                       | 한국어             | 예/설명                           |
|-------------------------------|--------------------|-----------------------------------|
| sequence                      | 수열               |                                   |
| term                          | (수열의) 항        | $$ a_n $$                         |
| geometric progression         | 등비수열           | $$ a, ar, ar^2, ..., ar^n, ... $$ |
| arithmetic progression        | 등차수열           | $$ a, a+d, a+2d, ..., a+nd, ...$$ |
| initial term                  | (수열의) 첫 항     | $$ a_1 $$                         |
| common ration, common ratio   | 공비               |                                   |
| common difference             | 공차               |                                   |
| recurrence relation           | 점화관계           |                                   |
| recursively define a sequence | 수열의 재귀적 정의 |                                   |
| closed formula                | 닫힌 공식          |                                   |
| iteration                     | 반복법             |                                   |
| forward substitution          | 전향 대입          |                                   |
| backward substitution         | 후향 대입          |                                   |

# 참고문헌

* Rosen의 이산수학 / Kenneth H. Rosen 저 / 공은배 등저 / 한국맥그로힐(McGraw-Hill KOREA) / 2017년 01월 06일

