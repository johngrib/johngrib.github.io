---
layout  : wiki
title   : false positive와 false negative
summary : 
date    : 2020-01-11 15:19:59 +0900
updated : 2020-01-18 19:16:31 +0900
tag     : test statistics
toc     : true
public  : true
parent  : [[index]]
latex   : true
---
* TOC
{:toc}

## 개요

통계의 개념.

* 긍정 오류는 (존재하지 않는) **오류의 존재를 긍정**한 것을 말한다.
    * 귀무 가설(null hypothesis)이 참인데도 귀무 가설을 기각하는 오류.
* 부정 오류는 (존재하는) **오류의 존재를 부정**한 것을 말한다.
    * 귀무 가설이 거짓인데도 귀무 가설을 채택하는 오류.


![]( /post-img/two-type-error/error-table.jpg )

_이미지 출처는 공학 학교에서 배운 101가지_ [^engineering-47]

**긍정** 오류(Type 1 error)
* False positive, 거짓 양성, 긍정 오류.
* False가 존재한다고 잘못 판정(False positive).
    * 결함이 아닌데, 결함이 있다고 판정.
    * 통계상 음성인데 실험/검사 결과는 양성이라고 나오는 것.

**부정** 오류(Type 2 error)
* False negative, 거짓 음성, 부정 오류.
* False가 존재하지 않는다고 잘못 판정(False negative).
    * 결함이 있는데, 결함이 아니라고 판정.
    * 통계상 양성인데 실험/검사 결과는 음성이라고 나오는 것.

## 예

귀무가설(null hypothesis)에 따라 False Positive와 False Negative가 바뀔 수 있다는 점에 주목.

| Null Hypothesis                 | False Positive (Type 1 error)                     | False Negative (Type 2 error)                       |
|---------------------------------|---------------------------------------------------|-----------------------------------------------------|
| 늑대가 없다                     | 늑대가 없는데도 양치기는 늑대가 나타났다고 외친다 | 늑대가 나타났는데도 양치기는 늑대가 없다고 생각한다 |
| 용의자는 무죄이다               | 범죄를 저지르지 않은 용의자가 유죄 판결을 받는다  | 범죄를 저지른 용의자가 무죄 판결을 받는다           |
| A약이 질병 B를 치료한다         | A로 B를 치료했지만, 치료하지 못했다고 판단한다    | A로 B를 치료하지 못했지만, 치료했다고 판단한다      |
| 광고 A가 구매 유도에 효과적이다 | A는 효과적인 광고였지만, 효과가 없다고 판단한다   | A는 효과가 없었지만, 효과가 있다고 판단한다         |
| 환자 A는 임신하지 않았다        | 임신이 아닌데 임신했다고 진단한다                 | 임신했는데 임신이 아니라고 진단한다                 |
| 메소드 A에 버그가 없다          | 메소드 A에 버그가 없는데 버그가 있다고 판정한다   | 메소드 A에 버그가 있는데 버그가 없다고 판정한다     |

[[Lubarsky-s-Law-of-Cybernetic-Entomology]]{버그는 언제나 적어도 한 마리가 더 있기 마련이다}. 버그는 없을 수가 없다.
정확히는 모르겠지만 소프트웨어에서 **버그가 없다는 통계가 나올 확률 $$p$$**는 **적어도 하나의 버그가 있다는 통계가 나올 확률 $$1-p$$**보다 작을 것이다.
따라서 나는 소프트웨어 프로젝트의 일반적인 귀무 가설은 "버그가 없다"는 것이라 생각한다.

귀무 가설이 "버그 A가 없는 것"이라면 False positive는 버그 A가 없는데도 있다고 판정하는 것이다.


## 유명한 짤방

![]( /post-img/two-type-error/pregnant.jpeg )

_이미지 출처는 Quora._ [^pregnant]

## 비용의 관점

> **지나치게 빈번하거나 드문 점검은 많은 오류를 발생시킬 수 있다**
<br/><br/>
설계과정 중 모든 단계에서의 점검은 오히려 좋은 아이템을 놓치거나, 결함을 발견하기 어렵게 하기도 한다. 이때 발생하는 **긍정 오류**False positive error는 아이템 교체에 발생하는 비용부담 같은 비교적 작은 결과를 초래한다. 하지만 **부정 오류**False negative error의 경우 서비스가 제공된 이후 아이템이 제 기능을 하지 못하는 심각한 결과를 초래하게 된다.
<br/><br/>
문제 해결을 위해서는 반드시 빈번한 점검이 필요하지는 않다. 통계적으로, 단계마다 행해지는 지나치게 잦은 점검은 어떤 방식으로든 대부분 아이템에 대해 결함 판정을 내리는 것으로 나타났다. 따라서 적정 수준의 점검이란, 제품 설계과정 초기 단계에서 긍정 오류를 찾아내어 추후 발생할 실제 오류 또는 제품의 결함을 미연에 방지하여 비용 면에서 경제적 균형을 맞추는 것이다.[^engineering-47]

* 긍정 오류는 결함이 아닌 것을 결함으로 판정하여, 아이템 교체 등의 비용 부담을 초래할 수 있다.
* 부정 오류는 결함인 것을 결함이 아닌 것으로 판정하여, 재난과 같은 비용 부담을 초래할 수 있다.

건축에서는 지나치게 빈번하게 점검하다 보면 어떻게든 긍정 오류를 경험하게 된다는 것이 인상적이다.


## 기억하는 방법

긍정 오류가 1종 에러인지 2종 에러인지 기억하는 것은 헷갈리는 일이다.

웹 서비스라면 장애가 없는데도 모니터링 서비스가 장애가 났다고 알려주는 상황이 False positive 라 생각할 수 있다. (양치기의 장난: 늑대가 나타났어요!)

한편 트위터의 [Victor Pr][twitter-bikutoru]님은 다음과 같이 기발한 방법을 공유했다.

{% raw %}
<blockquote class="twitter-tweet"><p lang="en" dir="ltr">Type I and type II errors are widely used terms for false positive and false negative. It&#39;s really hard to remember their meanings, so I have drawn an image with an easy to remember mnemonic.<br>Inspired by <a href="https://twitter.com/chrisalbon?ref_src=twsrc%5Etfw">@chrisalbon</a> and his <a href="https://twitter.com/hashtag/machinelearningflashcards?src=hash&amp;ref_src=twsrc%5Etfw">#machinelearningflashcards</a> <a href="https://t.co/oO8av8hWP3">pic.twitter.com/oO8av8hWP3</a></p>&mdash; Victor Pr👨🏻‍💻 (@bikutoru) <a href="https://twitter.com/bikutoru/status/981977290430189569?ref_src=twsrc%5Etfw">April 5, 2018</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
{% endraw %}

([혹시 이미지가 안 보인다면]( /post-img/two-type-error/remember.jpeg ))

## 인용

> 중요한 프로덕션 서비스에 문제가 있다면, 오전 2시에 사람들을 깨우는 것이 올바른 조치가 될 수 있다. 그러나 조치가 불가능한 경고나 거짓 양성(false positives)에 대한 경고를 생성한다면, 한밤중에 불필요하게 사람들을 깨우게 된다. 데브옵스 운동의 초기 리더인 존 빈센트(John Vincent)는 다음과 같이 말했다.  
"지금 우리가 당면한 가장 큰 문제는 경고가 유발하는 피로감이다. 우리는 경고를 더 똑똑하게 처리할 필요가 있다. 그렇지 않으면 모두 미쳐버릴 것이다."[^devops-handbook-271]

## 참고문헌

* 도서
    * 공학 학교에서 배운 101가지 / 존 쿠프레나스, 매튜 프레더릭 공저 / 김소진 역 / 글램북스 / 초판 1쇄 2015년 03월 20일
    * 데브옵스 핸드북 / 진 킴, 제즈 험블, 패트릭 드부아, 존 윌리스 저/김영기 역 외 1명 정보 더 보기/감추기 / 에이콘출판사 / 2018년 07월 06일 / 원제: The DevOps Handbook: How to Create World-Class Agility, Reliability, and Security in Technology Organizations
* 웹
    * [Type I and type II errors(wikipedia)][wiki-eng]
    * [거짓 양성과 거짓 음성(wikipedia)][wiki-kor]
    * [What is a type I error?(Quora)][pregnant]
    * [Understanding Type I and Type II Errors(DELL Technologies)][william_schmarzo]

## 주석

[^engineering-47]: 공학 학교에서 배운 101가지. 47.
[^pregnant]: [What is a type I error?][pregnant]
[^william_schmarzo]: [Understanding Type I and Type II Errors(DELL Technologies)][william_schmarzo]
[^devops-handbook-271]: 데브옵스 핸드북. 15장. 271쪽.

[twitter-bikutoru]: https://twitter.com/bikutoru
[pregnant]: https://www.quora.com/What-is-a-type-I-error
[wiki-eng]: https://en.wikipedia.org/wiki/Type_I_and_type_II_errors
[wiki-kor]: https://ko.wikipedia.org/wiki/거짓_양성과_거짓_음성
[william_schmarzo]: https://infocus.dellemc.com/william_schmarzo/understanding-type-i-and-type-ii-errors/

