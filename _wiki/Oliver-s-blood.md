---
layout  : wiki
title   : 올리버의 혈액형 문제(Oliver's blood)
summary : 흔한 혈액형으로는 유죄로 몰 수 없지
date    : 2018-04-22 22:26:19 +0900
updated : 2018-04-24 20:49:44 +0900
tag     : Think-Bayes bayes
toc     : true
public  : true
parent  : study-think-bayes
latex   : true
---
* TOC
{:toc}

# 개요

* 이 문서는 [[Think-Bayes]] 책 67~69쪽을 공부한 내용이다.
* [David J. C. MacKay](https://en.wikipedia.org/wiki/David_J._C._MacKay )의 [Information Theory, Inference, and Learning Algorithms](http://www.inference.org.uk/itprnn/book.pdf )에서 소개된 것이다.

>
Two people have left traces of their own blood at the scene of a crime.
A suspect, Oliver, is tested and found to have type 'O' blood.
The blood groups of the two traces are found to be of type 'O'
(a common type in the local population, having frequency 60%)
and of type 'AB' (a rare type, with frequency 1%).
Do these data (type ‘O’ and ‘AB’ blood were found at scene)
give evidence in favour of the proposition
that Oliver was one of the two people present at the crime?

* 범죄 현장에서 두 사람의 혈흔이 발견됐다.
* 용의자 Oliver의 혈액형을 검사해보니 'O'형이었다.
* 발견된 혈흔은 각각 'O'형과 'AB'형이었다.
    * 'O'형의 빈도는 매우 흔해서 전체 인구의 60% 정도.
    * 'AB'형의 빈도는 드문 편이어서 전체 인구의 1% 정도.

>
이 자료들이 Oliver가 범행 현장에 있었던 두 사람 중 한 명이라는 증거가 될 수 있는가?


# 풀이

## 공산을 사용해 풀기

* [[Bayes-theorem]] 문서의 공산을 참고할 것.

베이즈 정리의 공산 형태는 다음과 같다.

$$
\begin{align}
o(A \mid D) & = o(A) \times \frac{p(D \mid A)}{p(D \mid B)} \\
\text{사후 공산} & = \text{사전 공산} \times \text{우도비} \\
\end{align}
$$

양 변을 $$o(A)$$로 나누면 다음과 같이 된다.

$$
\begin{align}
{o(A \mid D) \over o(A)} & = {p(D \mid A) \over p(D \mid B)} \\
{\text{사후 공산} \over \text{사전 공산}} & = \text{우도비} \\
\end{align}
$$

* 우도비(Bayes factor; 베이즈 요인)
    * 1보다 크면, 데이터는 B의 가정보다는 A의 가정에 가깝다.
    * 1보다 작으면, 데이터는 A의 가정보다는 B의 가정에 가깝다.

개념을 표로 정리해 보자.

| 식                | 설명                                                                 |
|-------------------|----------------------------------------------------------------------|
| $$A$$             | Oliver와 또다른 한 사람이 범행 현장에 혈흔을 남겼다.                 |
| $$A^c$$           | Oliver가 아닌 정체를 알 수 없는 두 사람이 범행 현장에 혈흔을 남겼다. |
| $$D$$             | 'O', 'AB' 혈액형 혈흔이 범행 현장에 남아있었다.                      |
| $$p(D \mid A)$$   | A 조건 하에서 D가 발생할 확률                                        |
| $$p(D \mid A^c)$$ | $$A^c$$ 조건 하에서 D가 발생할 확률                                  |

그렇다면 다음과 같이 식을 꾸밀 수 있다.

$$
\begin{align}
{o(A \mid D) \over o(A)} & = {p(D \mid A) \over p(D \mid A^c)} \\
\end{align}
$$

$$p(D \mid A)$$ 부터 계산하자. Oliver가 범행 현장에 있었다는 전제이므로, 다음과 같이 된다.

* 혈흔1이 O형, 혈흔2가 AB형
* Oliver가 O형이므로, 혈흔2의 확률만 생각하면 된다.

$$p(D \mid A) = 1 \times 0.01 $$

$$p(D \mid A^c)$$ 는 Oliver가 범행 현장에 없었다는 전제이므로, 다음과 같이 두 가지 경우를 고려해야 한다.

* 혈흔1이 O형, 혈흔2가 AB형
* 혈흔1이 AB형, 혈흔2가 O형

$$p(D \mid A^c) = 2 \times 0.6 \times 0.01 $$

이제 식에 대입해보자.

$$
\begin{align}
{p(D \mid A) \over p(D \mid A^c)}
    & = {0.01 \over 2 \times 0.6 \times 0.01} \\
    & = {1 \over 1.2} \\
\end{align}
$$

값이 1보다 작으므로, $$A^c$$의 확률이 더 높다.

즉, Oliver가 범행 현장에 없었을 확률이 더 높다.


# Links

* [[Think-Bayes]]
* [[Bayes-theorem]]
* [Information Theory, Inference, and Learning Algorithms(PDF)](http://www.inference.org.uk/itprnn/book.pdf )
    * [David J. C. MacKay](https://en.wikipedia.org/wiki/David_J._C._MacKay )
