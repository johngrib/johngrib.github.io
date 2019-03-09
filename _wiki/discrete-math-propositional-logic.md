---
layout  : wiki
title   : 명제 논리
summary : Propositional Logic
date    : 2019-01-05 17:39:32 +0900
updated : 2019-01-06 10:27:36 +0900
tag     : math
toc     : true
public  : true
parent  : study-discrete-mathematics
latex   : true
---
* TOC
{:toc}

# 조건문

**Conditional Statement**

## 좋은 조건문의 영어 표현들

이건 외워두자.

| English                           | 한국어                              |
|-----------------------------------|-------------------------------------|
| if p, then q                      | p 이면 q 이다                       |
| p implies q                       | p 는 q 를 함축한다                  |
| if p, q                           | p 이면 q 이다                       |
| p only if q                       | q 일 경우에만 p 이다                |
| p is sufficient for q             | p는 q 인데 충분하다(충분조건 만족)  |
| a sufficient condition for q is p | q 의 충분조건은 p 이다.             |
| q if p                            | p 이면 q 이다                       |
| q whenever p                      | p 이면 항상 q 이다                  |
| q when p                          | p 이면 q 이다                       |
| q is necessary for p              | q 는 p 인데 필요하다(필요조건 만족) |
| a necessary condition for p is q  | p 의 필요조건은 q 이다              |
| q unless $$ \lnot $$p             | $$ \lnot $$p 가 아니면 q 이다       |


## 역, 이, 대우

**converse, inverse, contrapositive**

* 조건문 $$ p → q $$ 에 대하여
    * 역(converse) : $$ q → p $$
    * 이(inverse) : $$ ¬p → ¬q $$
    * 대우(contrapositive) : $$ ¬q → ¬p $$

## 상호 조건문

**biconditional**

* p 와 q 두 명제가 같은 진리값을 갖는다.
* $$(p → q) \land (q → p)$$ 와 똑같은 의미.

>
$$ p ↔ q $$

진리표는 다음과 같다.

| p | q | $$ p ↔ q $$ | $$(p → q) \land (q → p)$$ |
| - | - | ---         | ---                       |
| T | T | T           | T                         |
| T | F | F           | F                         |
| F | T | F           | F                         |
| F | F | T           | T                         |

다음과 같이 표현한다.


| p if and only if q                  |                                         |
| p is necessary and sufficient for q | p 는 q 의 필요충분 조건이다             |
| if p then q, and conversely         | 만약 p 이면 q 이다. 그 반대도 성립한다. |
| p iff q                             | p **if** and only **if** q 의 줄임말    |

# 논리 연산자 우선순위

| 연산자                | 우선순위 |
|-----------------------|----------|
| $$ \lnot $$           | 1        |
| $$ \land $$           | 2        |
| $$ \lor $$            | 3        |
| $$ \rightarrow $$     | 4        |
| $$ \leftrightarrow $$ | 5        |

# 논리적 동치

**Logical Equivalences**

## 드 모르간의 법칙 De Morgan's Laws

* $$ ¬(p \land q) \equiv ¬p \lor ¬q $$.
* $$ ¬(p \lor q) \equiv ¬p \land ¬q $$.

일반화하면 다음과 같다.

$$ ¬( p_1 \lor p_2 \lor ... \lor p_n ) \equiv ( ¬p_1 \land ¬p_2 \land ... \land ¬p_n ) $$

$$ ¬( p_1 \land p_2 \land ... \land p_n ) \equiv ( ¬p_1 \land ¬p_2 \land ... \land ¬p_n ) $$

다음과 같이 표기할 수도 있다.

$$ ¬( ∨_{j=1}^n p_j) \equiv ∧_{j=1}^n ¬p_j $$

$$ ¬( ∧_{j=1}^n p_j) \equiv ∨_{j=1}^n ¬p_j $$

## 논리적 동치식 모음

* 동일법칙 Identity laws
    * $$ p \land T \equiv p $$.
    * $$ p \lor F \equiv p $$.
* 지배법칙 Domination laws
    * $$ p \land T \equiv T $$.
    * $$ p \lor F \equiv F $$.
* 등멱법칙 Idempotent laws
    * $$ p \lor \equiv p $$.
    * $$ p \land p \equiv p $$.
* 이중부정법칙 Double negation law
    * $$ ¬( ¬ p ) \equiv p $$.
* 교환법칙 Commutative laws
    * $$ p \lor q \equiv q \lor p $$.
    * $$ p \land q \equiv q \land p $$.
* 결합법칙 Associative laws
    * $$ ( p ∨ q ) ∨ r \equiv p ∨ ( q ∨ r ) $$.
    * $$ ( p ∧ q ) ∧ r \equiv p ∧ ( q ∧ r ) $$.
* 분배법칙 Distributive laws
    * $$ p ∨ (q ∧ r) ≡ (p ∨ q) ∧ (p ∨ r) $$.
    * $$ p ∧ (q ∨ r) ≡ (p ∧ q) ∨ (p ∧ r) $$.
* 드 모르간 법칙 De Morgan's laws
    * $$ ¬(p ∧ q) ≡ ¬p ∨ ¬q $$.
    * $$ ¬(p ∨ q) ≡ ¬p ∧ ¬q $$.
* 흡수 법칙 Absorption laws
    * $$ p ∨ (p ∧ q) ≡ p $$.
    * $$ p ∧ (p ∨ q) ≡ p $$.
* 부정법칙 Negation laws
    * $$ p ∨ ¬p ≡ T $$.
    * $$ p ∧ ¬p ≡ F $$.
* 조건문을 포함한 경우
    * $$p → q ≡ ¬p ∨ q$$.
    * $$p → q ≡ ¬q → ¬p$$.
    * $$p ∨ q ≡ ¬p → q$$.
    * $$p ∧ q ≡ ¬(p → ¬q)$$.
    * $$¬(p → q) ≡ p ∧ ¬q$$.
    * $$(p → q) ∧ (p → r) ≡ p → (q ∧ r)$$.
    * $$(p → r) ∧ (q → r) ≡ (p ∨ q) → r$$.
    * $$(p → q) ∨ (p → r) ≡ p → (q ∨ r)$$.
    * $$(p → r) ∨ (q → r) ≡ (p ∧ q) → r$$.
* 상호 조건문을 포함한 경우
    * $$p ↔ q ≡ (p → q) ∧ (q → p)$$.
    * $$p ↔ q ≡ ¬p ↔ ¬q$$.
    * $$p ↔ q ≡ (p ∧ q) ∨ (¬p ∧ ¬q)$$.
    * $$¬(p ↔ q) ≡ p ↔ ¬q$$.

## $$ p \rightarrow q \equiv \lnot p \lor q $$.

이건 학생일 때 논리학 전공수업에서 배운 것인데 알아두면 편리하다.

* $$ p \rightarrow q $$ 와 $$ \lnot p \lor q $$ 는 동치이다.
    * 이걸 이용하면 `→` 기호를 `∨`(logical or)로 바꿀 수 있기 때문에 매우 유용하다.

직관적으로 바로 이해가 안 갈 수 있는데, 다음 진리표를 보자.

| $$p$$ | $$q$$ | $$ \lnot p \lor q $$ | $$ p \rightarrow q $$ |
|-------|-------|----------------------|-----------------------|
| T     | T     | T                    | T                     |
| T     | F     | F                    | F                     |
| F     | T     | T                    | T                     |
| F     | F     | T                    | T                     |

* 그런데 여기에서 3, 4번째 경우를 이해하는 것이 어렵다.
    * "p 가 false 이면 q 가 무엇이건 간에 $$ p \rightarrow q $$는 항상 참이다."
    * `거짓 → 참` 을 평가한 결과가 `참`이라고?! 하며 의아하게 생각할 수 있다.


그런데 이것은 `→`의 의미를 `~이면`으로만 생각하기 때문에 생기는 문제이다.

다음과 같은 명제가 있다고 하자.

> $$x$$가 $$4$$의 배수이면, $$x$$는 $$2$$의 배수이다.

**이것은 x 에 무엇이 들어가건 간에 명백한 참 명제이다.**

이제 p가 거짓인 경우와 참인 경우의 전체 문장 $$ p \rightarrow q $$를 보자.

>
$$3$$이 $$4$$의 배수이면, $$3$$은 $$2$$의 배수이다.  

* p가 거짓이고 q도 거짓인데, $$ p \rightarrow q $$는 참이다.
    * 이것으로 네 번째 경우를 이해할 수 있다.

>
$$6$$이 $$4$$의 배수이면, $$6$$은 $$2$$의 배수이다.

* p가 거짓이고 q는 참인데, $$ p \rightarrow q $$는 참이다.
    * 이것으로 세 번째 경우를 이해할 수 있다.

# 논리 회로

**Logic Circuits**

* NAND 는 &#124; 또는 $$ larrow_up $$로 표기하기도 한다. (참고: [Sheffer stroke](https://en.wikipedia.org/wiki/Sheffer_stroke#Truth_table ))
    * $$ p \vert q \equiv \lnot(p \land q) $$.
* NOR 는 $$ \downarrow $$로 표기하기도 한다. (참고: [Logical NOR](https://en.wikipedia.org/wiki/Logical_NOR#Truth_table ))
    * $$ p \downarrow q \equiv \lnot (p \lor q) $$.

