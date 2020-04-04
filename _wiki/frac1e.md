---
layout  : wiki
title   : n개의 제비뽑기에 n번 도전
summary : 1/e
date    : 2017-12-03 09:44:20 +0900
updated : 2020-03-08 18:41:34 +0900
tag     : math 확률
toc     : true
public  : true
parent  : [[math]]
latex   : true
---
* TOC
{:toc}

## 개요

[Quora에 다음과 같은 질문](https://www.quora.com/What-is-displaystyle-lim_-n-to-infty-left-1-frac-1-n-right-n)이 올라왔다.

> What is $$\lim_{n\to\infty}\left(1-\frac{1}{n}\right)^n$$ ?

쭉 읽어보면 대부분의 사람들이 계산해보면 $$e^{-1}$$ 가 나온다고 답변을 달아놨다.

사실 이건 조금만 생각해봐도 알 수 있는데, $$e$$의 정의가 다음과 같기 때문이다.

$$
\begin{align}
e & = \lim_{ n \to \infty } \left( 1 + \frac{1}{n} \right)^n \\
  & = \lim_{ n \to \infty } \left( \frac{n+1}{n} \right)^n \\
\end{align}
$$

분모 분자를 뒤집어 주면 이런 모양이 된다.

$$
\frac{1}{e} = \lim_{ n \to \infty } \left( \frac{n}{n+1} \right)^n
$$

이제 $$ m = n + 1 $$ 이라 하고 다음과 같이 치환해 보자.

$$
\frac{1}{e} = \lim_{ m \to \infty } \left( \frac{m-1}{m} \right)^{m-1}
$$

더 따져볼 것도 없을 것 같지만, 기계적인 과정도 살펴보자면 다음과 같이 할 수 있을 것이다.

$$
\begin{align}
\frac{1}{e} & = \lim_{ m \to \infty } \left( \frac{m-1}{m} \right)^{m-1} \\
            & = \lim_{ m \to \infty } \left( \frac{m-1}{m} \right)^{m} \times \frac{m}{m-1} \\
            & = \lim_{ m \to \infty } \left( \frac{m-1}{m} \right)^{m} \times \frac{m \over m}{ {m \over m }-{1 \over m}} \\
            & = \lim_{ m \to \infty } \left( \frac{m-1}{m} \right)^{m} \times 1 \\
\end{align}
$$

이제 질문의 식을 다시 살펴보면 $$ \frac{1}{e} $$ 이라는 것을 어렵지 않게 알 수 있다.

$$
\begin{align}
\lim_{n\to\infty} \left( 1-\frac{1}{n} \right)^n & = \lim_{n\to\infty} \left( \frac{n-1}{n} \right)^n \\
\end{align}
$$

[WolframAlpah에 검색][n_inf]해보면 역시 $$e^{-1}$$ 가 나온다.

그리고 $$e^{-1}$$의 값은 대략 `0.367879` 이다.

## 메모

내가 $$n$$ 개의 제비 중 1개의 당첨 제비를 노리고 있다 하자. 제비는 뽑고 나서 버리지 않고 다시 상자로 집어넣는다.

매 번 뽑을 때마다 당첨 제비를 뽑을 확률은 $$\frac{1}{n}$$이며, 당첨되지 않을 확률은 $$\frac{n-1}{n}$$이 된다.

그렇다면 $$n$$개의 제비를 $$n$$번 뽑을 때 당첨 제비를 뽑지 못하게 될 확률은 얼마나 될까?

* $$n = 1$$ 인 경우: $$\left(\frac{1-1}{1}\right)^1$$ 이므로 $$0$$ 이다.
* $$n = 2$$ 인 경우: $$\left(\frac{2-1}{2}\right)^2 = (\frac{1}{2})^2$$ 이므로 $$\frac{1}{4}$$ 이다. `25%` 라고 할 수 있다.
* $$n = 3$$ 인 경우: $$\left(\frac{3-1}{3}\right)^3 = (\frac{2}{3})^3$$ 이므로 $$\frac{8}{27}$$ 이다. 약 `29.63%` 라고 할 수 있다.

...

* $$n\to\infty$$ 인 경우: $$\frac{1}{e}$$ 이다. 약 `36.79%`라고 할 수 있다.

영원히 제비를 뽑고 있어도 단 한 번도 당첨되지 않을 확률이 `36.79%`인 셈이다.

보통 10 개 중에 당첨 제비가 하나 있다면 10번 뽑으면 대체로 당첨 제비를 뽑을 거라는 기대를 한다.

* 제비의 수가 무한히 많고 똑같은 만큼 무한히 제비를 뽑는다면 아래와 같이 생각할 수 있을 것이다.
    * 당첨 제비를 뽑지 못할 확률이 `36.79%` 정도
    * 당첨 제비를 적어도 한 번 뽑을 확률이 `63.21%` 정도

대체로가 `50%` 이상을 의미한다고 가정해 보면 `대체로 뽑을 거라는` 기대는 어느 정도 들어맞는다고 할 수 있다.

그러나 `거의 확실하게 뽑게 된다`라는 믿음을 갖고 있다면 실망하게 될 가능성이 크다.

## 계산 자료

순전히 흥미로 다음 값들을 울프람 알파에서 검색해 보았다.

| n  | $$\left(1-\frac{1}{n}\right)^n$$ | 근사값                         | Link          |
|----|----------------------------------|--------------------------------|---------------|
| 1  | 0                                | $$1$$                          | [Link][n_1]   |
| 2  | $$ 1 \over 4 $$                  | $$0.25$$                       | [Link][n_2]   |
| 3  | $$ 8 \over 27 $$                 | $$0.296296296...$$             | [Link][n_3]   |
| 4  | $$ 81 \over 256 $$               | $$0.31640625$$                 | [Link][n_4]   |
| 5  | $$ 1024 \over 3125 $$            | $$0.32768$$                    | [Link][n_5]   |
| 6  | $$ 15625 \over 46656 $$          | $$0.334897976...$$             | [Link][n_6]   |
| 7  | $$ 279936 \over 823543 $$        | $$0.339916677...$$             | [Link][n_7]   |
| 8  | $$ 5764801 \over 16777216 $$     | $$0.343608915805816650390625$$ | [Link][n_8]   |
| 9  | $$ 134217728 \over 387420489 $$  | $$0.346439416...$$             | [Link][n_9]   |
| 10 | $$ 3486784401 \over 10^{10} $$   | $$0.3486784401$$               | [Link][n_10]  |
| ∞  | $$ 1 \over e $$                  | $$0.367879441...$$             | [Link][n_inf] |

[n = 100 인 경우][n_100]는 다음과 같다. 숫자가 너무 길어서 80 글자씩 잘랐다.

```
36603234127322950493061602657251738618971207663892369140595737269931704475072474
81871965435100269504006615691006528432747182356968017994158571053544917075742738
9035006098270837114978219916760849490001
/
10000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000
```

물론 이 값은 약 $$0.36603234127...$$ 이다.

* [n = 1000 인 경우][n_1000]
* [n = 5000 인 경우][n_5000]
* [n = 5008 인 경우][n_5008] 부터는 Wolfram Alpha 에서 `Wolfram|Alpha doesn't understand your query` 라는 메시지만 나오고 결과가 나오지 않는다.

## 함께 읽기

* [[secretary-problem]]{비서 문제}

[n_1]: https://www.wolframalpha.com/input/?i=n%3D1%3B+%28%28n-1%29%2Fn%29%5En
[n_2]: https://www.wolframalpha.com/input/?i=n%3D2%3B+%28%28n-1%29%2Fn%29%5En
[n_3]: https://www.wolframalpha.com/input/?i=n%3D3%3B+%28%28n-1%29%2Fn%29%5En
[n_4]: https://www.wolframalpha.com/input/?i=n%3D4%3B+%28%28n-1%29%2Fn%29%5En
[n_5]: https://www.wolframalpha.com/input/?i=n%3D5%3B+%28%28n-1%29%2Fn%29%5En
[n_6]: https://www.wolframalpha.com/input/?i=n%3D6%3B+%28%28n-1%29%2Fn%29%5En
[n_7]: https://www.wolframalpha.com/input/?i=n%3D7%3B+%28%28n-1%29%2Fn%29%5En
[n_8]: https://www.wolframalpha.com/input/?i=n%3D8%3B+%28%28n-1%29%2Fn%29%5En
[n_9]: https://www.wolframalpha.com/input/?i=n%3D9%3B+%28%28n-1%29%2Fn%29%5En
[n_10]: https://www.wolframalpha.com/input/?i=n%3D10%3B+%28%28n-1%29%2Fn%29%5En
[n_100]: https://www.wolframalpha.com/input/?i=n%3D100%3B+%28%28n-1%29%2Fn%29%5En
[n_1000]: https://www.wolframalpha.com/input/?i=n%3D1000%3B+%28%28n-1%29%2Fn%29%5En
[n_5000]: https://www.wolframalpha.com/input/?i=n%3D5000%3B+%28%28n-1%29%2Fn%29%5En
[n_5007]: https://www.wolframalpha.com/input/?i=n%3D5007%3B+%28%28n-1%29%2Fn%29%5En
[n_5008]: https://www.wolframalpha.com/input/?i=n%3D5008%3B+%28%28n-1%29%2Fn%29%5En
[n_7500]: https://www.wolframalpha.com/input/?i=n%3D7500%3B+%28%28n-1%29%2Fn%29%5En
[n_inf]: https://www.wolframalpha.com/input/?i=lim+n-%3Einf+%28%28n-1%29%2Fn%29%5En

