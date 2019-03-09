---
layout  : wiki
title   : 주사위 문제
summary : 
date    : 2018-04-13 22:42:24 +0900
updated : 2018-04-24 20:48:57 +0900
tag     : Think-Bayes bayes
toc     : true
public  : true
parent  : study-think-bayes
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

## 손으로 계산해 풀기


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


## 직접 코딩해 풀기


다음은 [[Think-Bayes]]의 코드를 참고하여 자바스크립트로 풀어본 것이다.

* [dice.js](https://github.com/johngrib/think-bayes-study/blob/master/code/dice.js )


```javascript
// hypos: 가설의 배열
// 가설의 배열을 돌며 같은 경우의 수 1을 부여한다
function init(hypos) {
    const dict = {};
    hypos.forEach((h) => {
        dict[h] = 1;
    });
    return dict;
}

// 모든 가설을 돌며 mix의 data에 해당하는 값을 곱해 업데이트한다
function update(dict, data) {

    Object.keys(dict).forEach((hypo) => {
        dict[hypo] = dict[hypo] * likelihood(hypo, data);
    });

    return normalize(dict);
}

// p(D | H_n)
function likelihood(hypo, data) {
    if (hypo < data) {
        return 0;
    }
    return 1 / hypo;
}

// 모든 가설의 확률의 비율을 유지하며, 총합이 1이 되도록 정규화한다
function normalize(dict) {
    const values = Object.values(dict);
    const sum = values.reduce((a, b) => a + b);
    const result = {};
    Object.keys(dict).forEach((key) => {
        result[key] = dict[key] / sum;
    });
    return result;
}

function main() {

    const hypos = [4, 6, 8, 12, 20];
    const pmf = init(hypos);
    const result = update(pmf, 6);
    console.log(result);
}

main();
```

위의 코드를 실행하면 다음의 결과가 출력된다.

```bash
$ node dice.js
{ '4': 0,
  '6': 0.3921568627450981,
  '8': 0.2941176470588236,
  '12': 0.19607843137254904,
  '20': 0.11764705882352944 }
```

코드를 잘 읽어보면 `p(D)`는 일일이 구할 필요가 없으며, `p(Hn)` 도 비율만 맞춰주면 된다는 것을 알 수 있다.

# Links

* [[Think-Bayes]]
