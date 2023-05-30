---
layout  : wiki
title   : daemon
summary : 뭔가 유용한 작업을 하는 백그라운드 스레드/프로세스
date    : 2023-05-28 19:30:59 +0900
updated : 2023-05-30 23:10:53 +0900
tag     : 
resource: 29/BC90A3-7CD5-40DD-9809-633E41575E85
toc     : true
public  : true
parent  : [[/jargon]]
latex   : false
---
* TOC
{:toc}

## From: 운영체제 아주 쉬운 세 가지 이야기

>
"데몬(daemon)"이라는 단어는 일반적으로 "데몬(demon)"으로 발음되는데, 이것은 유용한 어떤 동작을 하는 백그라운드 쓰레드 또는 프로세스를 나타내는 오래된 용어이다.
(또 다시!) 이 용어의 근원은 Multics에서 시작되었다.
[^easy-251]

## 기원은 맥스웰의 악마 {#corbato-origin}

Fernando Corbato[^corbato]에 의하면 컴퓨팅에서 사용하는 daemon이라는 용어의 영감은 맥스웰의 악마에서 얻은 것이라 한다.

[원문 (takeourword.com)]( https://www.takeourword.com/TOW146/page4.html )

>
From Richard Steinberg/Mr. Smarty Pants (The Austin Chronicle):
>
Professor Corbato
>
I write a trivia column for a newspaper called The Austin Chronicle.
Someone has asked me the origin of the word daemon as it applies to computing.
Best I can tell based on my research, the word was first used by people on your team at Project MAC using the IBM 7094 in 1963.
The first daemon (an abbreviation for Disk And Executive MONitor) was a program that automatically made tape backups of the file system.
Does this sound about right?
Any corrections or additions?
Thank you for your time!

리처드 스타인버그/스마티 팬츠 씨(오스틴 크로니클):

코바토 교수님께

저는 The Austin Chronicle이라는 신문에 잡학(trivia) 칼럼을 쓰고 있습니다.
그런데 누가 컴퓨팅 분야에서 쓰는 데몬(daemon)이라는 단어의 기원을 물어본 일이 있었어요.
제가 조사한 바에 따르면 이 단어는 1963년에 IBM 7094를 사용한 프로젝트 MAC에 소속된 팀원들이 처음 사용했다고 합니다.
그리고 최초의 데몬(Disk And Executive MONitor의 약자)은 자동으로 파일 시스템의 테이프 백업을 만드는 프로그램이었습니다.
이 설명이 맞을까요? 아니면 수정하거나 추가할 내용이 있을까요?
시간 내주셔서 감사합니다!

>
From Fernando J. Corbato:
>
Your explanation of the origin of the word daemon is correct in that my group began using the term around that time frame.
However the acronym explanation is a new one on me.
Our use of the word daemon was inspired by the Maxwell's daemon of physics and thermodynamics.
(My background is Physics.)
Maxwell's daemon was an imaginary agent which helped sort molecules of different speeds and worked tirelessly in the background.
We fancifully began to use the word daemon to describe background processes which worked tirelessly to perform system chores.
I found a very good explanation of all this online at:
>
> <http://www.takeourword.com/TOW129/page2.html >  
(Search on "Maxwell" to locate the pertinent paragraph.)

페르난도 J. 코바토:

데몬이라는 단어의 기원에 대한 설명 중에서 우리 그룹이 그 시기에 이 용어를 사용하기 시작했다는 점은 정확합니다.
그러나 약어에 대한 그런 설명은 나로서는 처음 보는 것입니다.
우리가 사용했던 데몬이라는 단어는 물리학과 열역학에서 말하는 맥스웰의 악마에서 영감을 얻었습니다.
(내 전공은 물리학입니다.)
맥스웰의 악마는 다양한 속도의 분자를 분류하는 데 도움을 주는 가상의 에이전트로, 백그라운드에서 지치지 않고 일합니다.
우리는 시스템 상의 잡다한 일을 수행하기 위해 지칠 줄 모르고 일하는 백그라운드 프로세스를 설명하기 위해 데몬이라는 단어를 공상적으로 사용하기 시작했습니다.
온라인에서 그것과 관련된 모든 것에 대한 아주 좋은 설명을 찾을 수 있었습니다:

<http://www.takeourword.com/TOW129/page2.html >  
(관련 문단을 찾으려면 '맥스웰'을 검색하세요.)

## From: 해커 영어사전

다음은 에릭 레이몬드의 설명으로, 1996년 당시의 프린팅 환경에 대한 예제가 흥미롭다.

>
daemon /day’mn/ 명사. [원래는 신화적인 였으나 후에 'Disk And Execution MONitor'의 머리글자라고 그럴 듯하게 설명되고 있다.][^initial-explain]
>
이 프로그램은 명시적으로 호출되지는 않으나 몇몇 조건이 충족되면 발생하는 휴면 대기 상태에 놓여 있는 프로그램.
이 개념은 이같은 조건을 발생시키는 범인인 daemon이 매복하고 있다는 것을 알고 있을 필요가 없다는 것이다(비록 이는 암묵적으로 daemon을 불러낼 것임을 알고 있기 때문에 프로그램이 실행되는 것이지만).
예를 들어, 비시분할 시스템(ITS)하에서 출력(LPT) 스풀러 디렉토리상에 파일을 작성하려면 스풀링 daemon을 호출하고 난 다음에 파일을 프린트할 것이다.
파일을 한 인쇄 장치에서 인쇄하고 싶을 때에는 실제로 인쇄를 행하는 프로그램을 명시적으로 실행하는 대신에 어떤 특정 디렉토리(파일 영역)에 그 파일을 복사만 하면 된다.
printing daemon은 항상 작동하고 있는 하나의 프로그램에 불과하다.
그것은 특별한 디렉토리를 일정 간격으로 검색하고, 그 곳에서 파일을 발견하면 그 파일을 인쇄한 후 삭제해 버린다.
이것의 이점은 (이 예로 말하면) 파일을 인쇄하고 싶은 프로그램은 인쇄 장치에 접근하는 경합에 참가할 필요도 없고,
또한 인쇄가 끝날 때까지 기다릴 필요도 없다는 것이다.
특히 사용자는 인쇄 프로그램이 작업을 하고 있는 사이에 단말 장치의 앞에 앉아 기다릴 필요도 없다.
그 사용자는 daemon이 이 작업을 수행해 주고 있는 동안에 더욱 유익한 다른 작업을 할 수 있다.
>
daemon과 demon은 잘 혼동되어 사용되지만 분명한 어의의 차이를 지니고 있는 것 같다.
"daemon"은 MIT에 의해 개발된 최초의 시분할 시스템 CTSS(Compatible Time-Sharing System)에 몰려든 사람들에 의해 컴퓨터 세계에 소개되었다.
그들은 이 말을/dee'mən/이라고 발음하고, 오늘날 ITS가 dragon 또는 phantom이라 호칭하는 것을 언급하는 데 쓰이고 있다.
그 뜻과 발음은 그 정형을 이루지 못하고 표류하다가 여기서 정의한 것 같은 용법으로 현재(1996년)에 이르지 않았나 한다.
[^eric-215]

## 참고문헌

- UNIX 고급 프로그래밍 [제3판] / 리처드 스티븐스, 스티븐 레이고 공저 / 류광 역 / 퍼스트북 / 인쇄일: 2014년 08월 28일 / 원제: Advanced Programming in the UNIX Environment
- [Take Our Word For It Issue 146, page 4]( https://www.takeourword.com/TOW146/page4.html )
- 운영체제 아주 쉬운 세 가지 이야기 [제2판] / Remzi H. Arpaci-Dusseau, Andrea C. Arpaci-dusseau 공저 / 원유집, 박민규, 이성진 공역 / 홍릉 / 제2판 발행: 2020년 09월 10일 / 원제: Operating Systems: Three Easy Pieces
- 해커 영어사전 제3판 / ERIC S.RAYMOND 편 / 기전연구사 / 1998년 12월 25일 제1판 제1발행.
    - [jargon file daemon]( http://www.catb.org/~esr/jargon/html/D/daemon.html )

## 주석

[^easy-251]: 운영체제 아주 쉬운 세 가지 이야기. 21장. 251쪽.
[^corbato]: Fernando J. Corbató는 1990년 튜링상 수상자이다.
[^initial-explain]: [리처드 스타인버그가 Corbato 교수에게 한 질문]( #corbato-origin )에서 언급되었다.
[^eric-215]: 해커 영어사전. 215쪽.

