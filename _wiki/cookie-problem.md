---
layout  : wiki
title   : 쿠키 문제(The cookie problem)
summary : 베이즈 이론 연습문제
date    : 2018-04-09 09:14:07 +0900
updated : 2018-04-11 22:55:20 +0900
tags    : bayes
toc     : true
public  : true
parent  : problem
latex   : true
---
* TOC
{:toc}

# 개요

* 쿠키 두 그릇이 있다.
* 첫 번째 그릇: 40 개의 쿠키가 담겨 있다.
    * 바닐라 쿠키 30개
    * 초콜렛 쿠키 10개
* 두 번째 그릇: 40개의 쿠키가 담겨 있다.
    * 바닐라 쿠키 20개
    * 초콜렛 쿠키 20개

>
문제 : 어떤 그릇인지 보지 않고 한 그릇에서 임의로 쿠키를 집었는데 바닐라 쿠키였다.
그렇다면 이 때 이 바닐라 쿠키가 그릇1에서 나왔을 가능성은?

# 풀이

## 손으로 풀기

바닐라 쿠키가 나온 상태에서 그릇 1의 가능성을 따지는 것이므로 다음의 식을 풀면 된다.

$$ p( 그릇1 \mid 바닐라) $$

[[Bayes-theorem]]이 다음과 같으므로,

$$ p(A \mid B) = {p(A) \space p(B \mid A) \over p(B)} $$

식도 다음과 같이 꾸며보자.

$$ p(B_1 \mid V) = {p(B_1) \space p(V \mid B_1) \over p(V)} $$

생각해야 할 변수가 많으므로 표로 정리해야 이해하기 쉽다.

| 식                | 설명                                           | 값                               |
|-------------------|------------------------------------------------|----------------------------------|
| $$p(B_1)$$        | 그릇1을 선택할 확률                            | $$ 1 \over 2 $$                  |
| $$p(V)$$          | 바닐라 쿠키를 선택할 확률                      | 모름                             |
| $$p(V \mid B_1)$$ | 그릇1에서 바닐라 쿠키를 선택할 확률            | $$ {30 \over 40} = {3 \over 4}$$ |
| $$p(B_1 \mid V)$$ | 바닐라 쿠키를 선택했는데 그릇1에서 나왔을 확률 | 이 값이 답이다                   |

바닐라 쿠키를 선택할 확률 $$p(V)$$를 먼저 구해보자.

다음의 두 값을 구해 더하면 된다.

* 그릇1에서 바닐라 쿠키를 선택할 확률.
* 그릇2에서 바닐라 쿠키를 선택할 확률.

식은 다음과 같이 두 가지 형태로 만들 수 있는데

$$
\begin{align}
p(V) & = p(V \space and \space B_1) + p(V \space and \space B_2) \\
    & = p(V) p(B_1 \mid V) + p(V) p(B_2 \mid V) \\
\end{align}
$$

$$
\begin{align}
p(V) & = p(B_1 \space and \space V) + p(B_2 \space and \space V) \\
    & = p(B_1) p(V \mid B_1) + p(B_2) p(V \mid B_2) \\
\end{align}
$$

첫번째의 경우 양 변을 `p(V)`로 나눠주면 $$ 1 = p(B_1 \mid V) + p(B_2 \mid V) $$ 이 나오므로 의미가 없다.

따라서 두 번째 식을 사용해 계산한다.

$$
\begin{align}
p(V) & = p(B_1 \space and \space V) + p(B_2 \space and \space V) \\
    & = p(B_1) p(V \mid B_1) + p(B_2) p(V \mid B_2) \\
    & = {1 \over 2} \times {30 \over 40} + {1 \over 2} \times {20 \over 40} \\
    & = {3 \over 8} + {2 \over 8} \\
    & = {5 \over 8} \\
\end{align}
$$

이제 $$p(V)$$를 구했으니 식에 대입해 보자.

$$
\begin{align}
p(B_1 \mid V) & = \frac{ {1 \over 2} \times {3 \over 4} }{5 \over 8} = \frac{3 \over 8}{5 \over 8} = \frac{3}{5} \\
\end{align}
$$

따라서, 답은 $$3 \over 5$$ 이다.

## Think-Bayes 책에서 제공하는 라이브러리를 사용해 풀기

* [cookie.py](https://github.com/AllenDowney/ThinkBayes/blob/master/code/cookie.py )

```python
"""This file contains code for use with "Think Bayes",
by Allen B. Downey, available from greenteapress.com

Copyright 2012 Allen B. Downey
License: GNU GPLv3 http://www.gnu.org/licenses/gpl.html
"""

from thinkbayes import Pmf

pmf = Pmf()
pmf.Set('Bowl 1', 0.5)  # p(B1)
pmf.Set('Bowl 2', 0.5)  # p(B2)

pmf.Mult('Bowl 1', 0.75)    # p(B1) * p(V | B1)
pmf.Mult('Bowl 2', 0.5)     # p(B2) * p(V | B2)

pmf.Normalize()

print pmf.Prob('Bowl 1')
```

위의 파이썬 코드를 실행하면 `0.6`이 나온다.

```bash
$ python cookie.py
0.6
```

# Links

* [[Think-Bayes]]
    * [cookie.py](https://github.com/AllenDowney/ThinkBayes/blob/master/code/cookie.py )
* <https://allendowney.blogspot.kr/2011/10/all-your-bayes-are-belong-to-us.html >
