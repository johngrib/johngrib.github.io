---
layout  : wiki
title   : 빅 오 표기법(Big O notation)
summary : 알고리즘의 효율성을 나타내는 표기법이다
date    : 2018-06-24 17:32:45 +0900
updated : 2018-11-07 18:22:17 +0900
tags    : 
toc     : true
public  : true
parent  : algorithm
latex   : true
---
* TOC
{:toc}


# 이 문서에 대하여

* 종종 헷갈리곤 하는 정보를 기록한다.
* 이 문서는 빅 오 표기법을 모르는 사람을 대상으로 삼지 않는다.

# $$O, \Theta, \Omega$$

big-$$O$$, big-$$\Omega$$, big-$$\Theta$$는 각각 상한, 하한, 딱 맞는 수행 시간을 의미한다.

* big-$$O$$
    * `빅-오` 라고 읽는다.
    * 점근적 상한에 대한 표기법.
* big-$$\Omega$$
    * `빅-오메가` 라고 읽는다.
    * 점근적 하한에 대한 표기법.
* big-$$\Theta$$
    * `빅-세타` 라고 읽는다.

# 증가량 비교

## 그래프 비교

![Graphs of functions commonly used in the analysis of algorithms](https://user-images.githubusercontent.com/1855714/41817416-d269efb0-77d5-11e8-8220-6b8e7c9eacbc.png )

이미지 출처는 [Big_O_notation(wikipedia)](https://en.wikipedia.org/wiki/Big_O_notation )

## 주요 증가율

| 시간 복잡도                      | 한국어 명칭     | 영문 명칭                     | $$ n $$이 두 배가 되면                                           |
| -------------------------------- | --------------- | ----------------------------- | ---------------------                                            |
| $$ O(1) $$                       | 상수            | constant                      | 변함없다                                                         |
| $$O(\log n)$$                    | 로그            | logarithmic                   | 약간의 상수만큼 커진다                                           |
| $$O(n)$$                         | 선형            | linear                        | 2배 커진다                                                       |
| $$O(n \log n)$$                  | 선형 로그형     | linear logarithmic, n log n   | 2배보다 약간 커진다                                              |
| $$O(n^2)$$                       | 2차형, 제곱배   | quadratic                     | 4배 커진다                                                       |
| $$O(n^3)$$                       | 3차형           | cubic                         | 8배 커진다                                                       |
| $$O(n^k)$$, (상수 $$k$$)         | k승배, 다항     | polynomial                    | $$2^k$$배 커진다                                                 |
| $$O(k^n)$$, (상수 $$k \gt 1$$)   | 기하급수배      | exponential                   | $$k^n$$배 커진다                                                 |
| $$O(n!)$$                        | 계승배          | factorial                     | $$n^n$$배 정도 커진다. $$ n! \approx \sqrt{2 \pi n} (n / e)^n $$ |

# 예제로 이해하자

## 쉬운 예제

상수항은 무시하고, 지배적이지 않은 항도 무시한다.

| 식                                        | 상한         |
|-------------------------------------------|--------------|
| $$f(n) = 5n + 3$$                         | $$O(n)$$     |
| $$f(n) = 3n^2 - 3$$                       | $$O(n^2)$$   |
| $$f(n) = 5n^3 - n^2$$                     | $$O(n^3)$$   |
| $$O(n^2 + n)$$                            | $$O(n^2)$$   |
| $$O(n + \log n)$$                         | $$O(n)$$     |
| $$O(5 \times 2^n + 1000 \times n^{100})$$ | $$O(2^n)$$   |
| $$O(n + m)$$                              | $$O(n + m)$$ |

## 헷갈리는 예제

### 안쪽 루프가 1씩 줄어드는 이중 루프

```javascript
function test(list) {
    for (var i = 0; i < list.length; i++) {
        for (var j = 0; j < list.length; j++) {
            console.log(i + ',' + j);
        }
    }
}
```

위의 코드는 `list`를 이중으로 돌리고 있으므로 $$O(n^2)$$ 이다.

아래의 코드는 `j`가 `i+1`로 시작하므로 루프가 진행될수록 안쪽 루프의 횟수가 줄어든다.

좀 헷갈린다.

```javascript
function test(list) {
    for (var i = 0; i < list.length; i++) {
        // j = i + 1 에 주목
        for (var j = i + 1; j < list.length; j++) {
            console.log(i + ',' + j);
        }
    }
}
```

그러나 반복 횟수를 다음과 같이 생각해 보면 $$O(\frac{1}{2}n^2) = O(n^2)$$ 임을 알 수 있다.

$$
\begin{align}
& (n-1) + (n-2) + (n-3) + ... + 2 + 1 \\
& = \sum_1^{n-1} k = \frac{(n-1)n}{2} = \frac{n^2 - n}{2}\\
& = \frac{1}{2}n^2 - \frac{1}{2}n \\
& \therefore O(n^2) \\
\end{align}
$$

### 두 개의 다른 리스트를 루프하는 이중 루프

```javascript
function test(listA, listB) {
    // 바깥쪽 루프는 listA
    for (var i = 0; i < listA.length; i++) {
        // 안쪽 루프는 listB
        for (var j = 0; j < listB.length; j++) {
            console.log(i + ',' + j);
        }
    }
}
```

* 답은 $$O(a \cdot b)$$.
    * 느낌상 $$O(n^2)$$일 것 같지만, 아니다.
    * 두 리스트의 길이가 같으리란 보장이 없다.
    * 두 리스트의 크기를 모두 고려해야 한다.

그렇다면 아래와 같은 삼중 루프는 어떻게 될까?

```javascript
function test(listA, listB) {
    for (var i = 0; i < listA.length; i++) {
        for (var j = 0; j < listB.length; j++) {
            for (var k = 0; k < 99999; k++) {
                console.log(i + ',' + j + ',' + k);
            }
        }
    }
}
```

* 답은 $$O(a \cdot b \cdot 99999) = O(a \cdot b)$$.
    * 당연히 `99999`는 무시한다.

### 문자열 배열 정렬 문제

이 문제의 출처는 **코딩 인터뷰 완전 분석**이다.

다음과 같은 알고리즘이 있다고 하자.

* 여러 개의 문자열로 구성된 배열(`String[]`)이 주어진다.
* 각각의 문자열을 먼저 `abc` 순으로 정렬한다.
* 배열(`String[]`)을 정렬한다.

알고리즘의 수행 시간은?

* 이 문제는 생각보다 까다롭다.
* 얼핏 생각해보면 $$O(n \cdot n \log n + n \log n) = O(n^2 \log n)$$일 것 같지만 틀린 답이다.

제대로 풀어보면 다음과 같다.

* 정의
    * 가장 길이가 긴 문자열의 길이를 `s`라 하자.
    * 배열의 길이를 `a`라 하자.
* 문자열 정렬
    * 문자열 하나하나를 정렬하는데 $$O(s \cdot \log s)$$ 소요.
    * 문자열은 모두 `a`개.
    * 즉, 모든 문자열 정렬에 $$O(a \cdot s \cdot \log s)$$ 소요.
* 배열 정렬
    * 배열의 길이 : `a`
    * 문자열 두 개를 비교(최악의 경우) : $$O(s)$$
    * 정렬에 필요한 시간 : $$O(a \cdot \log a)$$
    * 즉, 배열을 정렬하는 데에 $$O(s \cdot a \cdot \log a)$$ 소요.
* 결론
    * $$O(a \cdot s \cdot \log s + s \cdot a \cdot \log a) = O\biggr(a \cdot s (\log s + \log a)\biggr)$$.
    * 이보다 더 줄일 수는 없다.


# Links 및 참고문헌

* [Big_O_notation(wikipedia)](https://en.wikipedia.org/wiki/Big_O_notation )
* [INTRODUCTION TO ALGORITHMS THIRD EDITION(CLRS)](https://mitpress.mit.edu/books/introduction-algorithms-third-edition )
* [다양한 예제로 학습하는 데이터 구조와 알고리즘 for Java](http://www.insightbook.co.kr/book/programming-insight/%EB%8B%A4%EC%96%91%ED%95%9C-%EC%98%88%EC%A0%9C%EB%A1%9C-%ED%95%99%EC%8A%B5%ED%95%98%EB%8A%94-%EB%8D%B0%EC%9D%B4%ED%84%B0-%EA%B5%AC%EC%A1%B0%EC%99%80-%EC%95%8C%EA%B3%A0%EB%A6%AC%EC%A6%98-for-java )
    * [책의 소스코드(github)](https://github.com/careermonk/DataStructureAndAlgorithmsMadeEasyInJava )
* [코딩 인터뷰 완전 분석(Cracking the Coding Interview, Sixth Edition)(인사이트 출판사)](http://www.insightbook.co.kr/12103 )
* [컴퓨터 과학이 여는 세계](http://www.yes24.co.kr/24/goods/17976737 )
