---
layout  : wiki
title   : 주사위 문제
summary : 
date    : 2018-04-13 22:42:24 +0900
updated : 2018-04-14 08:51:36 +0900
tags    : bayes
toc     : true
public  : true
parent  : problem
latex   : true
---
* TOC
{:toc}

# 개요

* 4면체, 6면체, 8면체, 12면체, 20면체 주사위가 든 상자가 있다.
* 상자에서 임의로 주사위 하나를 집어서 던졌더니 `6`이 나왔다.

>
각 주사위를 선택했을 확률은?


# 풀이

* 5 개의 가설(Hypothesis)을 생각할 수 있다.
    * 4면체 주사위를 던졌다.
    * 6면체 주사위를 던졌다.
    * 8면체 주사위를 던졌다.
    * 12면체 주사위를 던졌다.
    * 20면체 주사위를 던졌다.
* 데이터 D : 주사위를 던져 `6`이 나왔다.

이해하기 쉽게 표로 정리해 보자.

| 식                   | 설명                               | 값               |
|----------------------|------------------------------------|------------------|
| $$p(H_4)$$           | 4면체 주사위를 선택할 확률         | $$\frac{1}{5}$$  |
| $$p(H_6)$$           | 6면체 주사위를 선택할 확률         | $$\frac{1}{5}$$  |
| $$p(H_8)$$           | 8면체 주사위를 선택할 확률         | $$\frac{1}{5}$$  |
| $$p(H_{12})$$        | 12면체 주사위를 선택할 확률        | $$\frac{1}{5}$$  |
| $$p(H_{20})$$        | 20면체 주사위를 선택할 확률        | $$\frac{1}{5}$$  |
| $$p(D \mid H_4)$$    | 4면체 주사위를 던져 6이 나올 확률  | 0                |
| $$p(D \mid H_6)$$    | 6면체 주사위를 던져 6이 나올 확률  | $$\frac{1}{6} $$ |
| $$p(D \mid H_8)$$    | 8면체 주사위를 던져 6이 나올 확률  | $$\frac{1}{8}$$  |
| $$p(D \mid H_{12})$$ | 12면체 주사위를 던져 6이 나올 확률 | $$\frac{1}{12}$$ |
| $$p(D \mid H_{20})$$ | 20면체 주사위를 던져 6이 나올 확률 | $$\frac{1}{20}$$ |
| $$p(D)$$             | 주사위를 던져 6이 나올 확률        | 아직 모름        |

$$p(D)$$ 부터 구해보자.

$$
\begin{align}
p(D) = & \space p(D \space and \space H_4) \\
        & + p(D \space and \space H_6) \\
        & + p(D \space and \space H_8) \\
        & + p(D \space and \space H_{12}) \\
        & + p(D \space and \space H_{20}) \\
\end{align}
$$

이는 다음과 같다.

$$
\begin{align}
p(D) = & \space p(H_4)p(D \mid H_4) \\
        & + p(H_6)p(D \mid H_6) \\
        & + p(H_8)p(D \mid H_8) \\
        & + p(H_{12})p(D \mid H_{12}) \\
        & + p(H_{20})p(D \mid H_{20}) \\
\\
    = & \space \frac{1}{5} \times 0 \\
        & + \frac{1}{5} \times \frac{1}{6} \\
        & + \frac{1}{5} \times \frac{1}{8} \\
        & + \frac{1}{5} \times \frac{1}{12} \\
        & + \frac{1}{5} \times \frac{1}{20} \\
\\
    = & \space \frac{1}{5} \left( \frac{1}{6} + \frac{1}{8} + \frac{1}{12} + \frac{1}{20} \right) \\
    = & \space \frac{1}{5} \times \frac{51}{120} = \frac{51}{600}
\end{align}
$$

이제 주사위 하나씩 살펴보면서 $$p(H_n \mid D)$$를 구하면 된다.

[[Bayes-theorem]]에 의해 다음과 같이 식을 꾸밀 수 있다.

4면체 주사위를 던져 6이 나오는 것은 불가능하므로 패스.

6면체 주사위의 경우는

$$
\begin{align}
p(H_6 \mid D)
    = & {p(H_6) \space p(D \mid H_6) \over p(D)} \\
    = & {\frac{1}{5} \times \frac{1}{\color{red}6} \over \frac{51}{600}}
        = {\frac{1}{\color{red}6} \over \frac{51}{120}} \\
    = & \frac{1}{\color{red}6} \times \frac{120}{51} = \frac{20}{51} \\
\approx & 0.392156862745098 \\
\end{align}
$$

8면체 주사위의 경우는

$$
\begin{align}
p(H_8 \mid D)
    = & {p(H_8) \space p(D \mid H_8) \over p(D)} \\
    = & \frac{1}{\color{red}8} \times \frac{120}{51} = \frac{15}{51} \\
\approx & 0.294117647058824 \\
\end{align}
$$

12면체 주사위의 경우는

$$
\begin{align}
p(H_{12} \mid D)
    = & {p(H_{12}) \space p(D \mid H_{12}) \over p(D)} \\
    = & \frac{1}{\color{red}{12}} \times \frac{120}{51} = \frac{10}{51} \\
\approx & 0.196078431372549 \\
\end{align}
$$

20면체 주사위의 경우는

$$
\begin{align}
p(H_{20} \mid D)
    = & {p(H_{20}) \space p(D \mid H_{20}) \over p(D)} \\
    = & \frac{1}{\color{red}{20}} \times \frac{120}{51} = \frac{6}{51} \\
\approx & 0.117647058823529 \\
\end{align}
$$

따라서 결과는 다음과 같다.

>
각 주사위를 선택했을 확률은?


| 주사위 | 확률                 |
|--------|----------------------|
| 4면체  | 0                    |
| 6면체  | 약 0.392156862745098 |
| 8면체  | 약 0.294117647058824 |
| 12면체 | 약 0.196078431372549 |
| 20면체 | 약 0.117647058823529 |

# Links

* [[Think-Bayes]]
