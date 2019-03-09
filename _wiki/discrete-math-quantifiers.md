---
layout  : wiki
title   : 한정기호
summary : Quantifiers
date    : 2019-01-05 22:47:57 +0900
updated : 2019-01-06 11:21:04 +0900
tag     : math
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


# 한정기호 중첩

**Nested Quantifiers**

$$∀x∀yP(x,y)$$ 또는 $$∀y∀xP(x,y)$$

* $$P(x,y)$$ is true for every pair x, y.
* 모든 x, y에 대하여 $$P(x, y)$$가 참이다.

$$∀x∃yP(x,y)$$ &nbsp;

* For every x there is a y for which $$P(x,y)$$ is true.
* 모든 x에 대하여 $$P(x, y)$$가 참이 되는 y 가 적어도 하나 존재한다.

$$∃x∀yP(x,y)$$ &nbsp;

* There is an x for which $$P(x,y)$$ is true for every y.
* 어떤 x 가 존재하여, 모든 y에 대해 $$P(x,y)$$가 참이다.

$$∃x∃y P(x,y)$$ 또는 $$∃y∃x P(x,y)$$

* There is a pair x, y for which $$P(x, y)$$ is true.
* $$P(x, y)$$가 참이 되는 x, y 쌍이 적어도 하나 존재한다.

한정 순서가 크게 상관 없는 것처럼 보이지만, 두 한정 기호가 섞여 있을 때 순서가 바뀌면 참/거짓이 바뀌는 경우가 있으니 주의한다.

다음 문장을 $$ ∀x ∀y ∃z Q(x,y,z) $$라는 식으로 옮겼다고 생각해 보자.

* For all real numbers x and for all real numbers y there is a real number z such that $$x + y = z$$.
* 모든 실수 x, 모든 실수 y에 대해 $$ x + y = z $$를 만족하는 z 가 존재한다.

이것은 참이다.

하지만 위의 문장을 $$ ∃z ∀x ∀y Q(x,y,z) $$ 와 같은 식으로 꾸미면 거짓이 된다.

* There is a real number z such that for all real numbers x and for all real numbers y it is true that $$x + y = z$$.
* 어떤 실수 z가 있는데, 모든 실수 x 와 모든 실수 y 에 대해 $$ x + y = z $$가 참인 결과가 나온다.


## 예제

$$ ∀x ∃y ( x + y = 0 ) $$ &nbsp;

* 모든 x 에 대하여, $$x + y = 0$$ 을 만족하는 y 가 적어도 하나 존재한다.

$$ ∀x ∀y ( x + y = y + x ) $$ &nbsp;

* 모든 x, y 에 대하여, $$x + y = y + x$$ 가 성립한다.
    * 교환법칙이 성립한다.

$$ ∀x ∀y ∀z ( x + (y + z) = (x + y) + z) $$ &nbsp;

* 모든 x, y, z 에 대하여, 결합법칙이 성립한다.

