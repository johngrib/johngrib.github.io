---
layout  : wiki
title   : 몬티 홀 문제(Monty Hall problem)
summary : 
date    : 2018-04-11 12:20:40 +0900
updated : 2018-04-24 20:49:29 +0900
tag     : Think-Bayes bayes
toc     : true
public  : true
parent  : study-think-bayes
latex   : true
---
* TOC
{:toc}

# 개요

* Monty Hall(1921 - 2017)은 Let's Make a Deal 이란 게임 쇼의 사회자였다.
* 몬티 홀 문제는 이 게임 쇼의 게임 중 하나에서 유래되었다.

문제의 내용은 다음과 같다.

1. 사회자는 참가자에게 3개의 문을 보여준다.
    * 1개의 문 뒤에는 자동차가 있고, 나머지 2개의 문 뒤에는 염소가 한 마리씩 있다.
    * 게임의 목적은 자동차가 있는 문을 맞추는 것이다.  (염소는 꽝)
    * 자동차가 있는 문을 맞추면 참가자는 자동차를 경품으로 받을 수 있다.
2. 참가자는 문을 하나 선택한다.
3. 사회자는 참가자가 선택하지 않은 2개의 문 중 자동차가 없는 문 하나를 열어서 보여준다.
    * 사회자는 (당연히) 자동차가 있는 문을 알고 있다.
4. 사회자는 참가자에게 선택을 변경할 기회를 준다.
    * 참가자는 첫 선택을 고수하거나, 닫혀 있는 다른 문으로 선택을 바꿀 수 있다. 
5. 참가자가 최종 선택을 마치면, 정답을 공개하고 경품을 준다.

>
참가자가 선택을 고수하는 것과, 바꾸는 것 둘 중 어느쪽이 더 유리한가?

# 풀이

## 손으로 계산해서 풀기

다음과 같은 상황을 가정하자.

* 참가자가 문 A를 선택했다.
* 사회자는 문 B를 열어 염소를 보여준다.
* 참가자는 문 A를 고수할 것인지, 문 C로 선택을 바꿀지 고민하는 상황이다.

그렇다면 다음과 같이 정리할 수 있다.

* 가설(Hypothesis) A : 자동차가 문 A 뒤에 있다.
* 가설(Hypothesis) B : 자동차가 문 B 뒤에 있다.
* 가설(Hypothesis) C : 자동차가 문 C 뒤에 있다.
* 데이터 D : 사회자가 문 B를 열어 염소를 보여준다.
    * 사회자가 문 B를 열었으므로 가설 B는 생각할 필요 없음.

$$p(H_a \mid D)$$ 와 $$p(H_c \mid D)$$ 를 비교하면 된다.

* $$p(H_a \mid D) \gt p(H_c \mid D)$$ 라면 문 A를 고수하는 선택이 유리하다.
* $$p(H_a \mid D) \lt p(H_c \mid D)$$ 라면 문 C로 선택을 바꾸는 것이 유리하다.

즉, $$p(H_a \mid D) - p(H_c \mid D)$$의 값이 양수인지 음수인지를 알아내면 된다.

[[Bayes-theorem]]이 다음과 같으므로,

$$ p(A \mid B) = {p(A) \space p(B \mid A) \over p(B)} $$

다음과 같이 식을 꾸밀 수 있을 것이다.

$$ p(H_a \mid D) = {p(H_a) \space p(D \mid H_a) \over p(D)} $$

$$ p(H_c \mid D) = {p(H_c) \space p(D \mid H_c) \over p(D)} $$

그렇다면 필요한 식은 다음과 같다.

$$ {p(H_a) \space p(D \mid H_a) \over p(D)} - {p(H_c) \space p(D \mid H_c) \over p(D)} $$

$$p(D)$$는 0이 아니고 어차피 양수일 테니 무시하자.

$$ p(H_a) \space p(D \mid H_a) - p(H_c) \space p(D \mid H_c) $$

이 식을 계산한 값이

* 0보다 크면 문 A를 고수하는 선택이 유리하다.
* 0보다 작으면 문 C로 선택을 바꾸는 것이 유리하다.
* 0과 같으면 어느쪽을 선택하건 똑같다.


생각해야 할 변수가 많으므로 표로 정리해 보자.

| 식                | 설명                                         | 값            |
|-------------------|----------------------------------------------|---------------|
| $$p(H_a)$$        | 자동차가 문 A에 있을 가능성                  | $$1 \over 3$$ |
| $$p(H_b)$$        | 자동차가 문 B에 있을 가능성                  | $$0$$         |
| $$p(H_c)$$        | 자동차가 문 C에 있을 가능성                  | $$1 \over 3$$ |
| $$p(D \mid H_a)$$ | 자동차가 문 A에 있고, 사회자가 문 B를 열어줌 | $$1 \over 2$$ |
| $$p(D \mid H_c)$$ | 자동차가 문 C에 있고, 사회자가 문 B를 열어줌 | $$1$$         |

$$
\begin{align}
p(H_a) \space p(D \mid H_a) & - p(H_c) \space p(D \mid H_c) \\
= \frac{1}{3} \times \frac{1}{2} & - \frac{1}{3} \times 1 \\
= \frac{1}{6} & - \frac{2}{6} \\
\end{align}
$$

결과는 음수이므로, 선택을 바꾸는 쪽이 더 유리하다.

한편 $$p(H_c)p(D \mid H_c)$$가 $$p(H_a) \space p(D \mid H_a)$$의 두 배이므로, 선택을 바꾸는 쪽이 두 배 더 유리하다는 것도 알 수 있다.


## 직접 코딩해 풀기

다음은 [[Think-Bayes]]의 코드를 참고하여 자바스크립트로 풀어본 것이다.

* [monty.js](https://github.com/johngrib/think-bayes-study/blob/master/code/monty.js )

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
        const like = likelihood(p, hypo, dataName);

        // p(H_dataName) * p(D | H_dataName)
        p[hypo] = p[hypo] * likelihood(p, hypo, dataName);
    });

    return normalize(p);
}

// p(D | H_dataName) 를 계산한다
function likelihood(dict, hypo, dataName) {
    if (hypo == dataName) {
        return 0;
    }
    // p(D | H_a)
    if (hypo == 'A') {
        return 1/2;
    }
    return 1;
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

function main() {

    const hypos = ['A', 'B', 'C'];
    const pmf = init(hypos);
    const result = update(pmf, 'B');
    console.log(result);
}

main();
```

위의 코드를 실행해 보면 다음과 같은 결과가 나온다.

```bash
$ node monty.js
{ A: 0.3333333333333333, B: 0, C: 0.6666666666666666 }
```

선택을 C로 바꾸는 쪽이 두 배 유리하다는 것을 알 수 있다.




# Links

* [[Think-Bayes]]
* [Monty Hall problem(wikiepdia)](https://en.wikipedia.org/wiki/Monty_Hall_problem ) - [한국어](https://ko.wikipedia.org/wiki/%EB%AA%AC%ED%8B%B0_%ED%99%80_%EB%AC%B8%EC%A0%9C )
    * [Monty Hall(wikipedia)](https://en.wikipedia.org/wiki/Monty_Hall )
* [몬티 홀 문제(나무위키)](https://namu.wiki/w/%EB%AA%AC%ED%8B%B0%20%ED%99%80%20%EB%AC%B8%EC%A0%9C )
