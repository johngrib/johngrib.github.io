---
layout  : wiki
title   : 베이즈 정리(Bayes' theorem)
summary : p(A|B) = p(A) * p(B|A) / p(B)
date    : 2018-04-08 20:50:58 +0900
updated : 2018-04-22 18:56:03 +0900
tag     : bayes
toc     : true
public  : true
parent  : math
latex   : true
---
* TOC
{:toc}

# 개요

* 두 확률 변수의 사전 확률과 사후 확률 사이의 관계를 나타내는 정리.

$$ p(A \mid B) = \frac{p(B \mid A) \space p(A)}{p(B)} \propto \mathcal{L}(A \mid B) \space p(A) $$

## 식에 대한 설명

* 결합 확률: A와 B가 모두 참일 확률

$$ p(A \space and \space B) = p(A) \space p(B \mid A) $$

* 결합 확률에서는 교환 법칙이 성립한다.

$$ p(A \space and \space B) = p(B \space and \space A) $$

* 따라서 다음과 같이 전개할 수 있다.

$$ p(B \space and \space A) = p(A \space and \space B) $$

$$ p(B) \space p(A \mid B) = p(A) \space p(B \mid A) $$

$$ p(A \mid B) = {p(A) \space p(B \mid A) \over p(B)} $$

## 가능도(우도)

$$ \mathcal{L}(A \mid B) = p(B \mid A) $$ 이며, A가 주어졌을 때 B의 가능도(우도)라 부른다.

# 베이즈 이론의 통시적 해석

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

# 베이즈 이론의 공산 형태

## 공산(odds)

* 0~1 사이의 숫자가 아니라 비율로 확률을 표현하는 방법
* 승산(The odds in favor): 사건이 일어나지 않을 때의 확률과 일어났을 때의 확률의 비율
    * 승률이 `75%`라면, 승산으로는 `3:1` 이다.
    * 승률이 `10%`라면, 승산으로는 `1:9` 이다.
* 공산(The odds against): 승산의 반대 형식
    * 승률이 `75%`라면, 공산으로는 `1:3` 이다.
    * 승률이 `10%`라면, 공산으로는 `9:1` 이다.
* 확률이 낮은 경우 승산보다 공산으로 표기하는 경우가 흔하다.

이 문서에서는 공산을 다음 함수의 의미로 표현하도록 하겠다.

```javascript
function odds(p) {
    return p / (1 - p);
}
```

A와 B가 상호 배제적이며 전체 포괄적이라면 $$p(B) = 1 - p(A)$$ 이므로 사전 확률비, 사후 확률비를 공산으로 쓸 수 있다.

다음은 베이즈 이론의 확률 형태이다.

$$ p(H \mid D) = \frac{p(H) p(D \mid H)}{p(D)} $$

A, B 두 가설이 있을 때 사후 확률비는 다음과 같다.

$$
\require{cancel}
\begin{align}
{p(A \mid D) \over p(B \mid D)}
    & = { \frac{p(A)p(D \mid A)}{\cancel{p(D)}} \over \frac{p(B)p(D \mid B)}{\cancel{p(D)}}} \\
    & = {p(A)p(D \mid A) \over p(B)p(D \mid B)}
\end{align}
$$

A에 대한 공산을 $$o(A)$$라 하면 다음과 같이 베이즈 이론을 공산 형태로 나타낼 수 있다.

$$
\begin{align}
o(A \mid D) & = o(A) \times \frac{p(D \mid A)}{p(D \mid B)} \\
\text{사후 공산} & = \text{사전 공산} \times \text{우도비} \\
\end{align}
$$




# Links, 참고문헌

* [[Think-Bayes]]{파이썬을 활용한 베이지안 통계}

