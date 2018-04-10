---
layout  : wiki
title   : M&M 문제
summary :
date    : 2018-04-09 22:31:42 +0900
updated : 2018-04-10 22:46:59 +0900
tags    : bayes
toc     : true
public  : true
parent  : problem
latex   : true
---
* TOC
{:toc}

# 개요

* M&M 초콜렛을 만드는 Mars 사에서는 시간에 따라 색의 조합을 바꿔왔다.
* 1995년에는 파란색이 추가되었다.
* 1995년 기준으로 색 조합은 다음 표와 같다.

|              | 1995년 이전 | 1995년부터 |
|--------------|-------------|------------|
| 파랑(Blue)   |             | 24 %       |
| 갈색(Brown)  | 30 %        | 13 %       |
| 노랑(Yellow) | 20 %        | 14 %       |
| 빨강(Red)    | 20 %        | 13 %       |
| 녹색(Green)  | 10 %        | 20 %       |
| 주황(Orange) | 10 %        | 16 %       |
| 황갈색(Tan)  | 10 %        |            |

<br/>

>
한 친구가 M&M을 두 봉지 샀는데 각각 생산년도가 1994년, 1996년이었다.
생산년도를 알려주지 않고 각 봉지에서 M&M을 하나씩 꺼냈을 때 한 알은 노란색이고 한 알은 녹색이었다.
이 때 노랑 초콜렛이 1994년에 생산한 봉지에서 나왔을 확률은 얼마일까?

# 풀이

문제는 녹색, 노랑 초콜렛이 각 봉지에서 하나씩 나온 상태에서 1994년 생산 봉지에서 노랑 초콜렛이 나왔을 가능성을 따지는 것이다.

이를 좀 더 명확하게 표현하자면 다음과 같다.

* 봉지1과 봉지2가 있다.
    * 가설(Hypothesis) A : 봉지1이 1994년산, 봉지2가 1996년산.
    * 가설(Hypothesis) B : 봉지1이 1996년산, 봉지2가 1994년산.
        * Hypothesis를 줄여서 `H`라 하자.
* 데이터 D : 봉지1에서 노랑 초콜렛이 나왔고, 봉지2에서 녹색 초콜렛이 나왔다.
* $$p(H_a \mid D)$$의 값을 구하여라.

[[Bayes-theorem]]에 의해 다음과 같이 식을 꾸밀 수 있다.

$$ p(H_a \mid D) = {p(H_a) \space p(D \mid H_a) \over p(D)} $$

이제 각 항목당 값을 찾아 대입하면 된다.

일단 가설 A와 가설 B의 확률은 다음 값이 될 것이다.

$$
p(H_a) = \frac{1}{2} \\
p(H_b) = \frac{1}{2} \\
$$

이제 D의 확률을 구하자.

D의 확률은 다음의 두 가지 경우의 확률을 구해 더하면 된다.

* 가설 A and 데이터의 상황
* 가설 B and 데이터의 상황

$$
\begin{align}
p(D) & = p(D \space and \space H_a) + p(D \space and \space H_b) \\
    & = p(H_a) \times p(D \mid H_a) + p(H_b) \times p(D \mid H_b) \\
    & = \frac{1}{2} \times p(D \mid H_a) + \frac{1}{2} \times p(D \mid H_b)
\end{align}
$$

이제 $$p(D \mid H_a)$$ 와 $$p(D \mid H_b)$$의 값만 구하면 되겠다.

$$
\begin{align}
p(D \mid H_a) & = \frac{20}{100} \times \frac{20}{100} = \frac{40}{1000} \\
p(D \mid H_b) & = \frac{10}{100} \times \frac{14}{100} = \frac{14}{1000} \\
\end{align}
$$

따라서,

$$
\begin{align}
p(D) & = \frac{1}{2} \times \frac{40}{1000} + \frac{1}{2} \times \frac{14}{1000} \\
    & = \frac{20}{1000} + \frac{7}{1000} = \frac{27}{1000}
\end{align}
$$

$$p(D)$$ 까지 다 구했으니 이제는 값을 대입하기만 하면 된다.

$$
\begin{align}
p(H_a \mid D) & = {p(H_a) \space p(D \mid H_a) \over p(D)} \\
    & = {\frac{1}{2} \times \frac{40}{1000} \over \frac{27}{1000}} \\
    & = {\frac{20}{1000} \over \frac{27}{1000}} \\
    & = \frac{20}{27} \\
\end{align}
$$

그러므로, 답은 $$\frac{20}{27}$$이 된다.


# Links

* [[Think-Bayes]]

