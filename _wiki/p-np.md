---
layout  : wiki
title   : P-NP 문제
summary : 
date    : 2019-02-24 20:38:46 +0900
updated : 2019-02-24 21:13:14 +0900
tag     : math cs
toc     : true
public  : true
parent  : algorithm
latex   : true
---
* TOC
{:toc}

# P

* 다항 시간 내에 해결할 수 있는 문제들.
    * 다항: **P**olynomial
* $$O(n), O(n^2), O(n^3), ...$$ 와 같은 P 복잡도를 가진 문제들이 해당된다.

# NP

* 다항 알고리즘으로는 풀 수 없는 문제들.
    * 비결정적 다항: **N**ondeterministic **P**olynomial
    * 다항 시간 내에 해결은 못 하지만, 해결책이 주어졌을 경우 그 해결책이 맞는 해결책인지는 다항 시간 내에 알아낼 수 있다는 특징이 있다.
* $$O(n^k)$$ 로는 풀 수 없는 이상의 복잡도를 가진 문제들.
    * 예를 들어 $$O(2^n)$$.
