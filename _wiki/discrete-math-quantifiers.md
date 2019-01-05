---
layout  : wiki
title   : 한정기호
summary : Quantifiers
date    : 2019-01-05 22:47:57 +0900
updated : 2019-01-06 00:56:57 +0900
tags    : math
toc     : true
public  : true
parent  : study-discrete-mathematics
latex   : true
---
* TOC
{:toc}

# 전칭 한정기호 $$ \forall $$

**universal quantifier**

* P(x)의 전칭 한정

>
P(x) for all values of x in the domain.  
정의역의 원소인, 모든 x 에 대해 P(x)가 성립한다.

* $$ \forall $$ : 전칭 기호(universal quantifier)

$$ \forall $$는 다음과 같이 읽는다.

* for all
* for every
* all of
* for each
* given any
* for arbitrary
* for any - 의미가 모호해 사용을 권장하지 않는다.
* 모든

주의 : 정의역을 명확히 하는 것이 중요.

## 예제

* $$ \forall x \lt 0 \ ( x^2 \gt 0 ) $$ &nbsp;
    * $$ x \lt 0 $$ 인 모든 x 에 대하여 $$ x^2 \gt 0 $$ 이다.
    * $$ \forall ( x \lt 0 → x^2 \gt 0 ) $$ 과 동치.

* $$ \forall x \ne 0 \ (x^3 \ne 0) $$ &nbsp;
    * 0 이 아닌 모든 x 에 대하여, $$ x^3 \ne 0 $$ 이다.
    * $$ \forall x ( x \ne 0 → y^3 \ne 0 ) $$ 과 동치.

# 존재 기호 $$ \exists $$

**existential quantifier**

* P(x)의 존재 한정

>
There exists an element x in the domain such that P (x).  
정의역의 원소인, 적어도 하나의 x 에 대해 P(x)가 성립한다.

* $$ \exists $$ : 존재 기호(existential quantifier)

$$ \exists $$는 다음과 같이 읽는다.

* there exists
* for some
* for at least one
* there is

## 예제

* $$ \exists x \gt 0 \ ( x^2 = 1 ) $$ &nbsp;
    * $$ x^2 = 1 $$을 만족하는 0 보다 큰 x 가 적어도 하나 존재한다.
    * $$ \exists z \ (z \gt 0 \land z^2 = 2) $$ 와 동치.

## 유일 한정기호 $$ \exists !, \exists_1 $$

**uniqueness quantifier**

사용할 일은 별로 없지만 알아는 두자.

* $$ \exists_!x P(x) $$ : There exists a unique x such that P(x) is true
* $$ \exists_1x P(x) $$ : There exists a unique x such that P(x) is true

다음과 같이 읽는다.

* there exists a unique
* there is exactly one
* there is one and only one

# 연산자 우선순위

* $$ \forall, \exists $$ 는 명제 논리의 **모든** 논리 연산자보다 높은 우선순위를 갖는다.

# 한정 기호에 대한 드 모르간의 법칙

$$
\begin{align}
\lnot \forall x P(x)
    & \equiv \exists x \lnot P(x) \\
\lnot \exists P(x)
    & \equiv \forall x \lnot P(x) \\
\end{align}
$$


