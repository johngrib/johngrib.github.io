---
layout  : wiki
title   : 지프의 법칙(Zipf's law)
summary : 단어의 빈도는 단어 빈도 랭킹에 반비례한다
date    : 2018-04-15 17:47:44 +0900
updated : 2018-04-15 18:35:07 +0900
tag     : law stat
toc     : true
public  : true
parent  : proverb
latex   : false
---
* TOC
{:toc}

# 개요

* 수학적 통계를 바탕으로 밝혀진 경험적 법칙.
* 물리 및 사회 과학 분야에서 연구된 많은 종류의 정보들이 지프 분포에 가까운 경향을 보인다.
    * 도시의 인구 순위나 기업의 크기, 소득 순위 등과 같은 언어학과 관련이 없는 다른 여러가지 순위에서도 동일하게 발견된다고 한다.

>
주어진 언어 자료에 있어서 어떤 단어의 빈도는 빈도 테이블에서 전반적인 단어 목록의 랭크에 반비례한다.

쉽게 이해하자면 다음과 같다.

* 빈도 1위인 단어는 빈도 2위인 단어보다 약 2배 높은 빈도를 갖는다.
* 빈도 1위인 단어는 빈도 3위인 단어보다 약 3배 높은 빈도를 갖는다.
* ...

다음은 내가 [Computer(wikipedia)](https://en.wikipedia.org/wiki/Computer ) 문서의 단어 빈도를 계산해 본 결과이다.

| 순위 | 단어 | 카운트 |
|------|------|--------|
| 1    | the  | 645    |
| 2    | of   | 386    |
| 3    | and  | 265    |
| 4    | to   | 255    |
| 5    | a    | 242    |
| 6    | in   | 192    |
| ...  | ...  | ...    |

백의 자리 숫자만 보면 1순위부터 3순위까지 `6`, `3`, `2`로 대략 지프의 법칙과 비슷한 결과가 나오고 있다.

* [기업체의 규모 순위와 규모의 크기 관계 또한 지프 분포에 가깝다는 연구](http://science.sciencemag.org/content/293/5536/1818/tab-pdf )도 있다.


# Links

* [Zipf's law(wikipedia)](https://en.wikipedia.org/wiki/Zipf%27s_law ) [한국어](https://ko.wikipedia.org/wiki/%EC%A7%80%ED%94%84%EC%9D%98_%EB%B2%95%EC%B9%99 )
* [Zipf's law(wolfram.com)](https://www.wolfram.com/language/11/text-and-language-processing/zipfs-law.en.html?footer=lang) [한국어](https://www.wolfram.com/language/11/text-and-language-processing/zipfs-law.ko.html?footer=lang )
* [Zipf, Power-laws, and Pareto - a ranking tutorial Lada A. Adamic](http://www.hpl.hp.com/research/idl/papers/ranking/ranking.html )
* [Computer(wikipedia)](https://en.wikipedia.org/wiki/Computer )
* [Zipf Distribution of U.S. Firm Sizes ](http://science.sciencemag.org/content/293/5536/1818/tab-pdf ) [PDF](http://www2.econ.iastate.edu/tesfatsi/USFirmSizesAreZipfDistributed.RAxtell2001.pdf )
