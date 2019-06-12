---
layout  : wiki
title   : P-NP 문제
summary : 
date    : 2019-02-24 20:38:46 +0900
updated : 2019-06-12 10:05:45 +0900
tag     : math cs
toc     : true
public  : true
parent  : algorithm
latex   : true
---
* TOC
{:toc}

# 정의

> A decision problem is in P, the class of polynomial-time problems, if it can be solved by a deterministic Turing machine in polynomial time in terms of the size of its input. That is, a decision problem is in P if there is a deterministic Turing machine T that solves the decision problem and a polynomial p(n) such that for all integers n, T halts in a final state after no more than p(n) transitions whenever the input to T is a string of length n. A decision problem is in NP, the class of nondeterministic polynomial-time problems, if it can be solved by a nondeterministic Turing machine in polynomial time in terms of the size of its input. That is, a decision problem is in NP if there is a nondeterministic Turing machine T that solves the problem and a polynomial p(n) such that for all integers n, T halts for every choice of transitions after no more than p(n) transitions whenever the input to T is a string of length n.

* P
    * Class of **P**olynomial-time problem
        * 다항: **P**olynomial
    * 결정적 튜링 기계가 입력의 크기에 관한 다항식으로 표현된 시간 내에 풀 수 있는 결정 문제들.
    * $$O(n), O(n^2), O(n^3), ...$$.

어떤 결정 문제를 푸는 결정적 튜링 기계 $$T$$가 있다고 하자.

그리고 $$p(n)$$이 $$p(n) = an^m + bn^{m-1} + ...$$ 형태의 다항식이라 하자.

입력의 길이가 $$n$$일 때, $$T$$가 $$p(n)$$ 횟수 이내의 전이를 거친 후 최종 상태에서 정지한다면 그 결정 문제는 $$P$$에 속한다.

* NP
    * Class of **N**ondeterministic **P**olynomial-time problem
        * 비결정적 다항: **N**ondeterministic **P**olynomial
    * **비**결정적 튜링 기계가 입력의 크기에 대한 다항식 시간 내에 풀 수 있는 결정 문제들.

어떤 결정 문제를 푸는 비결정적 튜링 기계 $$T$$가 있다고 하자.

입력의 길이가 $$n$$일 때, $$T$$가 $$p(n)$$ 횟수 이내의 전이 후 최종 상태에서 전이한다면 그 결정 문제는 $$NP$$에 속한다.


# 참고문헌

* Rosen의 이산수학 / Kenneth H. Rosen 저 / 공은배 등 저 / 한국맥그로힐(McGraw-Hill KOREA) / 2017년 01월 06일


