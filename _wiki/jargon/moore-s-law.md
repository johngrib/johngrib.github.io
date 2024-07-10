---
layout  : wiki
title   : 무어의 법칙 (Moore's Law)
summary : 
date    : 2022-01-01 12:24:07 +0900
updated : 2024-07-10 23:05:21 +0900
tag     : 
resource: 42/ACF750-AAF1-4F5E-A651-7F19100A0FD0
toc     : true
public  : true
parent  : [[/jargon]]
latex   : false
---
* TOC
{:toc}

## 브라이언 커니핸이 말하는 무어의 법칙

>
무어의 법칙은 자연의 법칙이 아니라 반도체 산업에서 목표를 설정하기 위한 일종의 가이드라인이다.
미래 어떤 시점에는 더 이상 이 법칙이 적용되지 않을 것이다.
과거에도 무어의 법칙이 한계에 부딪힐 거라는 예측이 자주 나왔지만,
아직까지는 다양한 기술 연구를 통해 계속 한계를 극복해왔다.
하지만 이제 일부 회로에는 개별 원자가 단 몇 개만 들어갈 수 있는 수준에 이르렀는데, 이 수준은 제어하기에는 크기가 너무 작다.
>
프로세서 속도는 예전만큼 빨리 증가하지는 않으며, 더 이상 2년마다 두 배가 되지는 않는다.
한 가지 이유는 칩이 너무 빨라져 열을 너무 많이 발생시키기 때문이다.
하지만 메모리 용량은 여전히 증가하고 있다.
한편, 프로세서는 칩 하나에 프로세서 코어를 두 개 이상 배치함으로써 더 많은 트랜지스터를 활용할 수 있고,
컴퓨터 시스템에는 흔히 프로세서 칩이 여러 개 들어간다.
즉, 개별 코어의 실행 속도가 빨라진다기보다는 장착 가능한 코어의 개수가 늘면서 성능이 향상된다고 볼 수 있다.
[^brian-1]

## From: 고든 무어의 부고

- [Gordon Moore, Intel Co-Founder, Dies at 94 (Intel Corporation)]( https://www.intc.com/news-events/press-releases/detail/1611/gordon-moore-intel-co-founder-dies-at-94 )
    - 부고: 인텔 공동 창립자 고든 무어, 94세 나이로 별세

>
“All I was trying to do was get that message across, that by putting more and more stuff on a chip we were going to make all electronics cheaper,” Moore said in a 2008 interview.
>
With his 1965 prediction proven correct, in 1975 Moore revised his estimate to the doubling of transistors on an integrated circuit every two years for the next 10 years.
Regardless, the idea of chip technology growing at an exponential rate, continually making electronics faster, smaller and cheaper, became the driving force behind the semiconductor industry and paved the way for the ubiquitous use of chips in millions of everyday products.

무어는 2008년 인터뷰에서
"칩에 점점 더 많은 것을 넣음으로써 모든 전자기기를 더 저렴하게 만들 수 있다는 메시지를 전달하려고 했을 뿐입니다."라고 말했습니다.

1965년의 예측이 정확했음이 입증되자, 무어는 1975년에 이후 10년 동안 집적 회로의 트랜지스터가 2년마다 두 배씩 증가할 것이라고 예측을 수정했습니다.
어쨌든 기하급수적으로 성장하는 칩 기술을 통해 전자 제품을 더 빠르고, 더 작고, 더 저렴하게 만들겠다는 아이디어는 반도체 산업의 원동력이 되었고,
수백만 개의 일상 제품에 칩이 유비쿼터스하게 사용되는 길을 열었습니다.

## From: 컴퓨터 구조 및 설계

데이비드 페터슨과 존 헤네시는 '컴퓨터 구조 및 설계' 앞부분에서 다음과 같이 이야기한다.

>
**Moor의 법칙을 고려한 설계**
>
컴퓨터 설계자에게 한 가지 변하지 않는 상수가 있다면 Moore의 법칙(Moore's Law)을 따르는 빠른 변화 속도이다.
18~24개월마다 칩에 집적되는 소자의 수가 2배가 된다는 Moore의 법칙은 Intel 창립자 중 한 명인 Gordon Moore의 1965년 예측에서 유래한다.
컴퓨터를 설계하는 데에는 수년이 소요되기 때문에 프로젝트를 시작해서 끝나는 기간 동안 칩에 집적되는 소자가 2배 내지 4배 증가할 것이다.
스키트 사격 선수와 같이 컴퓨터 설계자는 프로젝트의 시작 시점보다 종료 시점의 기술을 예상해야 한다.
우리는 '우상향'으로 증가하는 Moore 법칙 그래프를 빠른 변화를 고려한 설계를 나타내는 데 사용할 것이다.
[^petterson-11]

## 존 카멕의 코멘트

John Carmack은 무어의 법칙에 대해 다음과 같은 코멘트를 남겼다.

>
무어의 법칙<sup>Moore's Law</sup> 때문에, 아주 영리한 그래픽 프로그래머가 개발한 모든 것이 몇 년 후에는 단지 고만고만하게 유능한 프로그래머에 의해 복제될 수 있었습니다.
[^blackbook-doom-29]

## 함께 읽기

## 참고문헌

- 1일 1로그 100일 완성 IT 지식 / 브라이언 W. 커니핸 저/하성창 역 / 인사이트(insight) / 2021년 12월 31일 / 원제: Understanding the Digital World (2nd edition)
- [Cramming more components onto integrated circuits By Gordon E. Moore]( https://newsroom.intel.com/wp-content/uploads/sites/11/2018/05/moores-law-electronics.pdf ) - 1965-04-19, 고든 무어의 글.
- 게임 엔진 블랙 북: 둠 / 파비앙 상글라르 저/박재호 역 / 한빛미디어 / 초판 1쇄 발행: 2021년 04월 01일 / 원제: Game Engine Black Book: DOOM
- 컴퓨터 구조 및 설계 [5판] / David A. Patterson, John L. Hennessy 저/장훈, 하순회, 김병기 외 1명 역 / 한티미디어 / 2015년 01월 19일


## 주석

[^brian-1]: 1일 1로그 100일 완성 IT 지식
[^petterson-11]: 컴퓨터 구조 및 설계. 1장. 11쪽.
[^blackbook-doom-29]: 게임엔진 블랙 북: 둠. 1장. 29쪽.

