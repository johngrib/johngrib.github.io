---
layout  : wiki
title   : 암달의 법칙 (Amdahl's law)
summary : 
date    : 2020-06-19 23:31:46 +0900
updated : 2020-06-21 01:02:04 +0900
tag     : 
toc     : true
public  : false
parent  : [[proverb]]
latex   : true
---
* TOC
{:toc}

## 개요

- 진 암달(Gene Amdahl, 1922 ~ 2015)
    - 미국의 컴퓨터 공학자.
    - IBM에서 메인프레임 개발에 크게 공헌했다.

## 정의

전체 작업의 $$P$$%에 해당하는 부분의 성능을 $$S$$배 향상시켰을 때, 전체의 성능 향상 최대값은 다음과 같다.

$$
S_{\text{latency}}(s) = { 1 \over (1-p) + \frac{p}{s} }
$$


## From: Beautiful Code

> 행렬 자료를 분할하다 보니 소위 암달의 법칙(Amdahl's law)이 말하는 규모가변성 문제가 금세 드러나게 되었다.
암달의 법칙이란 한 계산에서 순차적인 부분에 소요되는 시간이 전체 수행 시간의 최소 하계를(따라서 병렬 처리로 얻을 수 있는 이득을) 결정한다는 것이다.
바꾸어 말하자면, 대부분의 게산들이 독립적으로 수행되지 않는 한, 하드웨어 구성에 프로세서들을 추가한다고 해도 처리가 더 빨라지지는 않는 이득체감 지점에 도달한다는 것이다.
[^beautiful-312]


## 참고문헌

도서

- Beautiful Code / 찰스 페졸드 외 37 저 / 한빛미디어 / 초판발행 2007년 12월 17일

웹 문서

- [Validity of the single processor approach to achieving large scale computing capabilitie - Gene M. Amdahl (PDF)]( https://www3.cs.stonybrook.edu/~rezaul/Spring-2012/CSE613/reading/Amdahl-1967.pdf )
    - [백업 PDF]( /post-img/amdahl-s-law/Amdahl-1967.pdf )
- [Validity of the single processor approach to achieving large scale computing capabilitie - Gene M. Amdahl (PDF)]( https://www-inst.eecs.berkeley.edu//~n252/paper/Amdahl.pdf ) - Guihai Chen이 옮겨 적은 버전. (This paper is retyped as the present form by Guihai Chen He wishes you would enjoy reading this historic)
    - [백업 PDF]( /post-img/amdahl-s-law/Amdahl.pdf )
- [Amdahl's Law (WOLFRAM Demonstrations Project)](https://demonstrations.wolfram.com/AmdahlsLaw/ )

## 주석

[^beautiful-312]: Beautiful Code. 14장. 312쪽.

