---
layout  : wiki
title   : 증명
summary : Proofs
date    : 2019-01-06 16:36:55 +0900
updated : 2019-01-09 18:41:01 +0900
tag     : math
toc     : true
public  : true
parent  : study-discrete-mathematics
latex   : true
---
* TOC
{:toc}

# 용어

## 증명 proof

* 특정한 공리들을 가정하고, 그 가정 하에서 어떤 명제가 참임을 보여주는 것.
* 증명이란 어떤 정리가 참임을 보여주는 정당한 논증이다.

## 정리 theorem

* 가정(assumption)으로부터 증명된 명제.
    * 증명된 명제들 중 중요한 것들을 주로 정리라고 부른다.
    * 좀 덜 중요한 정리는 주장(proposition) 이라고도 한다.
* 그것이 참임을 보일 수 있는 하나의 진술.
* fact, results 라고도 한다.
* 한자로는 定理 로 쓴다.
    * 定 정할 정
    * 理 이치 리

## 보조 정리 lemma

* 정리를 증명하기 위해 사용되는 보조적인 명제를 보조정리라 부른다.
* 영어로는 lemma 라 쓴다.
* 복수형은 lemmas, lemmata.

## 따름정리, 계 corollary

* 따름정리, 계. 두 이름 중 편한 걸 쓰자.
* 증명된 정리로부터 직접적으로 귀결될 수 있는 정리를 말한다.
* 명제나 정리에서 바로 유도되는 명제를 따름정리라 부른다.
    * 따름 정리 여부는 보통 주관적이다.
* "계" 는 한자로, 系를 쓴다.
    * 系 : 맬 계
        * 매다, 묶다, 잇다, 매달다, 줄, 혈통, 죄수, 실마리와 같이 끈(string)과 관련된 뜻이 많다.

## 가설 conjecture

* 부분적 증거나 휴리스틱한 논거, 전문가의 직감에 근거하여 참이라고 주장되는 문장.
* 가설이 참으로 증명되면 정리가 된다.
* 한자로는 假說 이라 쓴다.

# 정리 증명 방법

## 직접 증명

**Direct Proofs**

* $$ p → q $$에 대해, 만약 p 가 참이면 q가 참일 수 밖에 없음을 보인다.

## 대우에 의한 증명

**Proof by Contraposition**

* $$ p → q $$에 대해, $$ ¬q → ¬p $$가 참임을 증명한다.
* 유용한 간접증명 방법.

### 공허한 증명

**vacuous proofs**

* $$ p → q $$ 일 때, p가 false 이면 $$ p → q $$는 true 가 된다는 점을 이용하는 증명법.
    * **즉, p 가 거짓임을 보여, $$ p → q $$를 증명하는 방법.**
    * [명제논리 $$p → q ≡ ¬ p ∨ q$$](/wiki/discrete-math-propositional-logic/#p-rightarrow-q-equiv-lnot-p-lor-q) 문서 참고.
* 공허한 증명은 어떤 조건문이 모든 양의 정수에 대하여 성립한다는 정리($$ ∀nP(n) $$ 형태의 정리)의 특별한 경우를 증명할 때 사용되곤 한다.
* "무의미한 증명"이라 부르기도 한다.

### 자명한 증명

**trivial proofs**

* $$ p → q $$에 대해, q 가 참임을 증명하여 $$ p → q $$를 증명하는 방법.
    * [명제논리 $$p → q ≡ ¬ p ∨ q$$](/wiki/discrete-math-propositional-logic/#p-rightarrow-q-equiv-lnot-p-lor-q) 문서 참고.
* 수학적 귀납법에서 중요하다.
* "사소한 증명"이라 부르기도 한다.

## 모순에 의한 증명, 귀류법

**Proofs by Contradiction**

* 명제의 결론이 거짓이라 가정하여, 모순을 유도해 원래 명제가 참임을 증명하는 방법.
* 歸謬法

## 동치 증명

**Proofs of Equivalence**

* $$ p ↔ q $$의 형태를 갖는 정리를 증명하기 위해 $$ p → q $$와 $$ q → p $$가 모두 참임을 증명하는 방법.

## 경우에 의한 증명

**Proof by Cases**

$$ ( p_1 ∨ p_2 ∨ ... ∨ p_n ) → q $$

* $$ p_1 → q $$을 증명하고, $$ p_2 → q $$를 증명하고...
* 모든 가능한 경우를 증명하는 것을 전수 증명(exhaustive proof)이라 한다.

## 존재 증명

**Existence Proofs**

* $$ ∃x P(x) $$ 형태의 정리를 증명하는 것.
* 생산적 존재 증명(A Constructive Existence Proof)
    * $$ ∃x P(x) $$가 true 가 되게 하는 원소 x를 찾아내는 방법.
* 비생산적 존재 증명(A Nonconstructive Existence Proof)
    * 귀류법 등을 통해 존재하지 않을 리가 없다는 것을 증명하는 방법.
    * 증명을 해도 존재 여부만 알 수 있다.

## 유일성 증명

**Uniqueness Proofs**

$$ ∃x ( P(x) ∧ ∀y ( y \ne x → ¬ P(y) ) ) $$

* 어떤 집합에서 하나의 원소만 어떤 특징을 갖고 있고, 나머지 다른 원소들은 그 특징이 없다는 것을 보이는 증명.
    * 존재성(Existence) : 어떤 원소 x 가 주어진 특성을 갖고 있음을 보인다.
    * 유일성(Uniqueness) : x 가 아닌 다른 원소는 주어진 특성이 없음을 보인다.
        * 주어진 특성을 갖는 두 원소 x, y 가 $$x = y$$ 임을 보이는 방법도 있다.

# Links

* [정리 (wikipedia)](https://ko.wikipedia.org/wiki/%EC%A0%95%EB%A6%AC )
* [증명 (wikipedia)](https://ko.wikipedia.org/wiki/%EC%A6%9D%EB%AA%85_(%EC%88%98%ED%95%99) )

# 참고문헌

* Rosen의 이산수학 / Kenneth H. Rosen 저 / 공은배 등저 / 한국맥그로힐(McGraw-Hill KOREA) / 2017년 01월 06일

