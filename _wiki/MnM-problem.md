---
layout  : wiki
title   : M&M 문제
summary :
date    : 2018-04-09 22:31:42 +0900
updated : 2018-04-24 20:49:22 +0900
tag     : Think-Bayes bayes
toc     : true
public  : true
parent  : study-think-bayes
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

## 손으로 계산해서 풀기

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


## 직접 코딩해 풀기

다음은 [[Think-Bayes]]의 코드를 참고하여 자바스크립트로 풀어본 것이다.

* [m_and_m.js](https://github.com/johngrib/think-bayes-study/blob/master/code/m_and_m.js )

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

// 모든 가설을 돌며 mix의 dataName에 해당하는 값을 곱해 업데이트한다
function update(p, dataName) {

    Object.keys(p).forEach((hypo) => {

        // p(H_dataName) * p(D | H_dataName)
        p[hypo] = p[hypo] * likelihood(p, hypo, dataName);
    });

    return normalize(p);
}

// p(D | H_dataName)
function likelihood(dict, hypo, dataName) {
    const bag = dataName[0];
    const color = dataName[1];
    return hypotheses[hypo][bag][color];
}

// 모든 가설의 확률의 비율을 유지하며, 총합이 1이 되도록 정규화한다
function normalize(p) {
    const values = Object.values(p);
    const sum = values.reduce((a, b) => a + b);
    const result = {};
    Object.keys(p).forEach((key) => {
        result[key] = p[key] / sum;
    });
    return result;
}

const mix94 = {
    'brown': 30,
    'yellow': 20,
    'red': 20,
    'green': 10,
    'orange': 10,
    'tan': 10,
};
const mix96 = {
    'blue': 24,
    'green': 20,
    'orange': 16,
    'yellow': 14,
    'red': 13,
    'brown': 13,
};
const hypotheses = {
    'A': {
        'bag1': mix94,
        'bag2': mix96,
    },
    'B': {
        'bag1': mix96,
        'bag2': mix94,
    }
};

function main() {

    const suite = init(['A', 'B']);

    let result;

    result = update(suite, ['bag1', 'yellow']);
    result = update(suite, ['bag2', 'green']);

    console.log(result);
}

main();
```

위의 코드를 실행하면 다음과 같은 결과가 나온다.

```bash
$ $ node m_and_m.js
{ A: 0.7407407407407407, B: 0.25925925925925924 }
```

$$\frac{20}{27} \approx 0.740740...$$ 이므로 손으로 계산한 값과 같다고 볼 수 있다.

# Links

* [[Think-Bayes]]

