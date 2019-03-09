---
layout  : wiki
title   : 폰 노이만식 난수 생성법(Basic von Neumann extractor)
summary : 0과 1이 발생할 확률이 다른 경우 사용하자
date    : 2018-02-04 15:28:29 +0900
updated : 2018-04-08 15:12:05 +0900
tag     : Von-Neumann random
toc     : true
public  : true
parent  : algorithm
latex   : true
---
* TOC
{:toc}

## 개요

* 폰 노이만식 난수 생성법을 사용하면 $$p = {1 \over 2}$$인 베르누이 과정을 얻을 수 있다.

## 방법

* 연속하는 두 비트가 같으면 버린다.
* 연속하는 두 비트가 다르면 앞의 비트를 갖는다.


## 응용

`0`과 `1`이 발생할 확률이 다른 경우 랜덤한 값을 구하려면 다음과 같이 하면 된다.

* `00`, `11`은 버린다.
* `01`이 나오면 `0`을 갖는다.
* `10`이 나오면 `1`을 갖는다.

`00`과 `11`의 확률은 다르지만, `01`과 `10`의 확률은 같기 때문이다.

이 방법을 사용하면 앞면과 뒷면의 확률이 다른 동전이 있어도 $$1 \over 2$$의 확률로 내기를 할 수 있다.

## Links

* [Randomness extractor - Von Neumann extractor(wikipedia)](https://en.wikipedia.org/wiki/Randomness_extractor#Von_Neumann_extractor )
* [Bernoulli_process - Basic_von_Neumann_extractor(wikipedia)](https://en.wikipedia.org/wiki/Bernoulli_process#Basic_von_Neumann_extractor )
* [베르누이 과정(위키백과)](https://ko.wikipedia.org/wiki/%EB%B2%A0%EB%A5%B4%EB%88%84%EC%9D%B4_%EA%B3%BC%EC%A0%95 )
* [베르누이 시행](https://ko.wikipedia.org/wiki/%EB%B2%A0%EB%A5%B4%EB%88%84%EC%9D%B4_%EC%8B%9C%ED%96%89 )
