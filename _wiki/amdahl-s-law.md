---
layout  : wiki
title   : 암달의 법칙 (Amdahl's law)
summary : 
date    : 2020-06-19 23:31:46 +0900
updated : 2020-06-21 00:53:34 +0900
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




## 참고문헌

- [Validity of the single processor approach to achieving large scale computing capabilitie - Gene M. Amdahl (PDF)]( https://www3.cs.stonybrook.edu/~rezaul/Spring-2012/CSE613/reading/Amdahl-1967.pdf )
    - [백업 PDF]( /post-img/amdahl-s-law/Amdahl-1967.pdf )
- [Validity of the single processor approach to achieving large scale computing capabilitie - Gene M. Amdahl (PDF)]( https://www-inst.eecs.berkeley.edu//~n252/paper/Amdahl.pdf ) - Guihai Chen이 옮겨 적은 버전. (This paper is retyped as the present form by Guihai Chen He wishes you would enjoy reading this historic)
    - [백업 PDF]( /post-img/amdahl-s-law/Amdahl.pdf )
- [Amdahl's Law (WOLFRAM Demonstrations Project)](https://demonstrations.wolfram.com/AmdahlsLaw/ )

