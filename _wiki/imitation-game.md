---
layout  : wiki
title   : 이미테이션 게임 (The Imitation Game)
summary : 튜링 테스트
date    : 2020-06-23 23:15:28 +0900
updated : 2020-06-24 20:28:04 +0900
tag     : turing
toc     : true
public  : true
parent  : [[proverb]]
latex   : false
---
* TOC
{:toc}

## 기원: 앨런 튜링의 "계산 기계와 지능"

이미테이션 게임은 앨런 튜링의 1950년 논문, "계산 기계와 지능"에 소개된 게임이다.

## 규칙

이미테이션 게임에는 세 사람이 참여한다.

- `A`: 남자 - `C`가 `A`의 성별을 맞추지 못하게 하는 것이 목표.
- `B`: 여자 - `C`가 정답을 맞추도록 돕는 것이 목표.
- `C`: 질문자 - `A`, `B`의 성별을 맞추는 것이 목표.

`A`, `B`는 거짓말을 해도 된다.

`C`가 `A`와 `B`의 목소리를 통해 답을 쉽게 맞추는 일을 막기 위해 글을 써서 응답하거나, 타자기를 사용할 수 있다.

## 튜링 테스트

앨런 튜링은 이미테이션 게임 규칙을 소개한 다음, 갑자기 "기계가 A를 하면 어떻게 될까" 하는 질문을 던진다.

> We now ask the question, "What will happen when a machine takes the part of A in this game?"
Will the interrogator decide wrongly as often when the game is played like this as
he does when the game is played between a man and a woman? These questions replace
our original, "Can machines think?"
>
> 이제 원래 질문을 이렇게 바꿔보자.
"이 게임에서 기계가 A의 역할을 맡으면 어떻게 될까?"
이렇게 했을 때 질문자가 못 맞힐 가능성은 실제 남자와 여자가 참가했을 때만큼 클까?
이것이 우리의 원래 질문 "기계가 생각할 수 있을까?"를 대체하는 새로운 질문이다.[^turing-68]

## 인용
### From: Can Digital Computers Think?

앨런 튜링의 1951년 5월 15일 BBC 라디오 강연 "Can Digital Computers Think?"에서도 이 게임이 언급된다.

[The Turing Digital Archive]( http://www.turingarchive.org/browse.php/B/5 )

![]( /post-img/imitation-game/1951-4.jpg )

![]( /post-img/imitation-game/1951-5.jpg )

> 이를 염두에 두면 디지털 컴퓨터가 '기계 두뇌'나 '전자 두뇌'라는 주장을 비판하는 가장 현명한 근거는
뇌처럼 행동하도록 프로그래밍 할 수는 있어도 어떻게 해야 하는지 현재로서는 알 수 없다는 것입니다.
이 견해에 대해서는 전적으로 동의합니다.
그런 프로그램을 결국 찾아낼 수 있을지 없을지는 미지수입니다.
개인적으로 저는 그런 프로그램을 찾을 수 있으리라 믿는 쪽입니다.
이를테면 20세기 말이 되면 어떤 질문에 대해 사람이 대답하는지 기계가 대답하는지 알아맞히기가 매우 힘들도록
기계를 프로그래밍 하는 것이 가능해지리라 생각합니다.
저는 구술 시험 비슷한 것을 상상하고 있는데,
음성을 얼마나 그럴듯하게 흉내 낼 수 있는가와 같은 지엽적 문제를 배제할 수 있도록 질문과 답변은 모두 타자기로 주고받습니다.
이것은 제 의견을 제시한 것에 불과하며 다른 의견의 여지도 얼마든지 있습니다.[^turing-129]

## 참고문헌

- [COMPUTING MACHINERY AND INTELLIGENCE By A. M. Turing]( https://www.csee.umbc.edu/courses/471/papers/turing.pdf ) - 앨런 튜링의 1950년 논문, 계산 기계와 지능.
    - []( /post-img/imitation-game/computing-machinary-and-intelligence.pdf )
- 앨런 튜링 지능에 관하여 / 앨런 튜링 저/곽재식 해제/노승영 역 / 에이치비프레스 / 1판 2쇄 2019년 12월 24일

## 주석

[^turing-68]: 앨런 튜링 지능에 관하여. 68쪽.
[^turing-129]: 앨런 튜링 지능에 관하여. 129쪽.

