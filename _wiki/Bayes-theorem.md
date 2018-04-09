---
layout  : wiki
title   : 베이즈 정리(Bayes' theorem)
summary : p(A|B) = p(A) * p(B|A) / p(B)
date    : 2018-04-08 20:50:58 +0900
updated : 2018-04-09 13:45:23 +0900
tags    : bayes
toc     : true
public  : true
parent  : math
latex   : true
---
* TOC
{:toc}

# 개요

* 두 확률 변수의 사전 확률과 사후 확률 사이의 관계를 나타내는 정리.

$$ p(A \mid B) = \frac{p(B \mid A) \space p(A)}{p(B)} \propto p(A \mid B) \space p(A) $$

## 식에 대한 설명

* 결합 확률: A와 B가 모두 참일 확률

$$ p(A \space and \space B) = p(A) \space p(B \mid A) $$

* 결합 확률에서는 교환 법칙이 성립한다.

$$ p(A \space and \space B) = p(B \space and \space A) $$

* 따라서 다음과 같이 전개할 수 있다.

$$ p(B \space and \space A) = p(A \space and \space B) $$

$$ p(B) \space p(A \mid B) = p(A) \space p(B \mid A) $$

$$ p(A \mid B) = {p(A) \space p(B \mid A) \over p(B)} $$


## 베이즈 이론의 통시적 해석

* 통시적(diachronic) 해석 : 데이터 D의 관점에서 봤을 때 가설 H의 확률을 수정해준다.
* 시간에 따라 새로운 데이터를 접하게 되면서 가설에 대한 확률이 달라진다는 것.

$$ p(A \mid B) = {p(A) \space p(B \mid A) \over p(B)} $$

| 식              | 해석                                             |
|-----------------|--------------------------------------------------|
| $$p(A \mid B)$$ | 사후 확률. 데이터를 확인한 이후 가설의 확률.     |
| $$p(A)$$        | 사전 확률. 데이터를 보기 전 가설의 확률.         |
| $$p(B \mid A)$$ | 우도(가능도). 데이터가 가설에 포함될 확률.       |
| $$p(B)$$        | 한정 상수. 어떤 가설에든 포함되는 데이터의 비율. |

즉, 다음과 같이 해석할 수 있다.

$$ \text{사후 확률} = {\text{사전 확률} \times \text{우도} \over \text{한정 상수}}$$

# Links

* [[Think-Bayes]]
