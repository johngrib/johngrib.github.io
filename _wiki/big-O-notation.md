---
layout  : wiki
title   : 빅 오 표기법(Big O notation)
summary : 알고리즘의 효율성을 나타내는 표기법이다
date    : 2018-06-24 17:32:45 +0900
updated : 2018-06-24 18:56:44 +0900
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

| 시간 복잡도  | 한국어 명칭 | 영문 명칭          |
|--------------|-------------|--------------------|
| 1            | 상수형      | Constant           |
| $$\log n$$   | 로그형      | Logarithmic        |
| $$n$$        | 선형        | Linear             |
| $$n \log n$$ | 선형 로그형 | Linear Logarithmic |
| $$n^2$$      | 2차형       | Quadratic          |
| $$n^3$$      | 3차형       | Cubic              |
| $$2^n$$      | 지수형      | Exponential        |

## 다양한 증가율 비교

* 위로 올라갈수록 증가폭이 크다.
* 아래로 내려갈수록 증가폭이 작다.

| 시간 복잡도         |                        |
|---------------------|------------------------|
| $$2^{2^n}$$         |                        |
| $$n!$$              | 팩토리얼 증가.         |
| $$2^n$$             | 지수 증가.             |
| $$n^2$$             |                        |
| $$n \log n$$        |                        |
| $$\log(n!)$$        |                        |
| $$n$$               | 선형 증가.             |
| $$2^{\log n}$$      |                        |
| $$\sqrt{ \log n }$$ |                        |
| $$\log \log n $$    |                        |
| $$1$$               | 상수. 증가하지 않는다. |


# Links 및 참고문헌

* [Big_O_notation(wikipedia)](https://en.wikipedia.org/wiki/Big_O_notation )
* [다양한 예제로 학습하는 데이터 구조와 알고리즘 for Java](http://www.insightbook.co.kr/book/programming-insight/%EB%8B%A4%EC%96%91%ED%95%9C-%EC%98%88%EC%A0%9C%EB%A1%9C-%ED%95%99%EC%8A%B5%ED%95%98%EB%8A%94-%EB%8D%B0%EC%9D%B4%ED%84%B0-%EA%B5%AC%EC%A1%B0%EC%99%80-%EC%95%8C%EA%B3%A0%EB%A6%AC%EC%A6%98-for-java )
    * [책의 소스코드(github)](https://github.com/careermonk/DataStructureAndAlgorithmsMadeEasyInJava )
