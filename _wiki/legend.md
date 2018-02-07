---
layout  : wiki
title   : 레전드 모음
summary :
date    : 2017-12-03 15:01:36 +0900
updated : 2018-02-07 21:33:42 +0900
tags    : story
toc     : true
public  : true
parent  : clipping
latex   : false
---
* TOC
{:toc}

## 프로그래밍 언어를 하나도 만들지 않은 제랄드 와인버그

### "프로그래밍 언어 설계에 필요한 원칙" 중에서
>
(전략)  
내가 새로운 프로그래밍 언어를 만든 적이 없는 건 사실이지만, 프로그래밍 언어의 설계 원칙들을 만들어 내지 않았던가?
다시 말해서, 나는 프로그래밍 언어 설계의 설계자였다.  
설계 원칙을 만들었을 뿐이므로 나는 책임은 지지 않은 채 경기장 밖에 안아 훈수를 둘 수 있었다.
이제는 고백하겠다.
나는 최초의 어셈블리어에도, FORTRAN에도, APL에도, COBOL에도, PL/1에도, Simula에도, IBM System/360 기계어와 작업제어 언어에도,
Pascal에도, 프로그래밍 언어의 형식적 기술을 위한 비엔나 정의 언어(Vienna Definition Language, VDL)에도 훈수를 둔 사람 가운데 한 명이었다.
FORTRAN 개발자들과 컴퓨터를 공유했고, FORTRAN의 오브젝트 코드를 비판했으며,
FORTRAN이 결코 오래 가지 못할 거라고 잘못 예견했다.
APL의 창시자 켄 아이버슨(Ken Iverson)이 공개 비판을 받고자 언어에 대한 자신의 생각을 최초로 밝히던 자리에도 있었다.
또, MetaCOBOL 프로젝트에도 참여했고, 스위스에서는 Pascal의 아버지 니클라우스 워스(Niklaus Wirth)와 함께 있었으며,
IBM Vienna 연구소의 하인츠 제마넥(Heinz Zemanek)의 팀과도 함께 있었다. 고백이 이렇게 힘들 줄이야.
그런데 아직 끝이 아니다.
사실은 Algol(원래 버전은 물론이고 그 이후의 버전들까지), C, Smalltalk의 초기 버전에 대해서도 영향을 끼쳤다(별로 알려진 사실은 아니지만).
게다가 태어나지 못하도록 내가 일조를 했을지도 모르는 수십 개 언어들도 있다(내가 가장 자랑스럽게 생각하는 부분이다).
그중에는 마법(Magic)이라는 이름의 언어가 적어도 세 개는 있었다.  
내가 1970년에 동유럽을 방문했을 때, 사람들이 나를 **프로그래밍 언어의 왕**이라고 부르는 것을 듣고 충격을 받았다(내 자신의 정체성을 의심하게 될 정도로).
그래서 요즘에는 그간의 죄를 회개하며 언어 설계에 대해 훈수 두는 일을 최대한 자제하고 있지만, 그리 쉽지가 않다.
그러면서 깨달은 것이 하나 있는데, 아마도 이것이 프로그래밍 심리학에서 가장 중요한 원칙이라는 생각이 든다.  
모든 프로그래머는 메타언어 전문가다.  
(후략)

## 빌 앳킨슨(Bill Atkinson)의 생산성

### 개발하는 데 얼마나 걸렸나요?

>
**How long did it take?**  
A reporter asked Steve Jobs, “How many man-years did it take to write Quick Draw?” Steve asked Bill, who said, “Well, I worked on it on and off for four years.” Steve then told the reporter, “Twenty-four man-years”. Steve figured, with ample justification, that one Atkinson year was the equivalent of six ordinary programmer years.

한 기자가 스티브 잡스에게 "Quick Draw 개발에 얼만큼의 man-year가 필요했습니까?" 라고 질문했다.

스티브 잡스가 빌 앳킨슨에게 어땠냐고 물어보니
"글쎄, 4년간 열심히 일하긴 했지"라는 대답이 돌아왔다.

그러자 스티브 잡스가 "24 man-years 입니다." 라고 기자에게 대답했다.

스티브 잡스는 빌 앳킨슨의 1년이 평범한 프로그래머 6명의 1년과 맞먹는다고 생각했던 것이다.

[www.computerhistory.org/atchm/macpaint-and-quickdraw-source-code](http://www.computerhistory.org/atchm/macpaint-and-quickdraw-source-code/ )

### 프로그래머 생산성 측정 방법

>
**How do you measure programmer productivity?**  
When the Lisa team was pushing to finalize their software in 1982, project managers started requiring programmers to submit weekly forms reporting on the number of lines of code they had written. Bill Atkinson thought that was silly. For the week in which he had rewritten QuickDraw’s region calculation routines to be six times faster and 2000 lines shorter, he put “-2000″ on the form. After a few more weeks the managers stopped asking him to fill out the form, and he gladly complied.

1982년, Lisa팀이 소프트웨어를 완성할 무렵의 이야기이다.

프로젝트 관리자들이 프로그래머들에게 일주일간 작성한 코드 라인 수를 주간 보고서에 적어 내라는 지시를 내렸다.

그 지시가 정말 멍청한 생각이라고 여긴 빌 앳킨슨은 일주일간 QuickDraw의 지역 계산 루틴을 6배 빠르게 하고 2000 라인을 줄인 다음, 주간 보고 양식에 "-2000"을 써서 냈다.

몇 주 후 부터 관리자들은 문제의 양식을 작성하라는 요구를 포기했고 그는 상황을 흐뭇하게 받아들였다.

[www.computerhistory.org/atchm/macpaint-and-quickdraw-source-code](http://www.computerhistory.org/atchm/macpaint-and-quickdraw-source-code/ )

## 무협지 주인공 제임스 고슬링(James Gosling)

>
여름 학기 동안 전산학과에 침입하는 방법을 스스로 깨달았어요.
문마다 번호판이 달린 자물쇠가 있었어요.
문 앞에 와서 비밀번호를 누르면 문이 열리고 들어가는 식이었죠.
그냥 아무렇지도 않게 근처에 서 있다가 번호를 누르는 걸 보기만 하면 됐어요.
일단 그렇게 건물에 들어가기만 하면 사용자 ID나 비밀번호 같은 걸 걸어두지 않은 컴퓨터가 많이 있었죠.
TSS8이라는 운영체제를 돌리는 시간 공유 PDP-8 장비를 아주 많이 썼어요.
처음에는 거의 뼈대만 있는 PDP-8으로 시작했죠.
어떤 연구실 한 구석에 있는, 아무도 쓰지 않는 컴퓨터였죠.
그걸로 혼자 공부하기 시작했어요.
처음에 배운 언어는 공식 계산기<sup>FOrmula CALculator</sup>에서 이름을 따온 Focal5라는 이름의 언어였어요.
포트란하고 비슷한 일을 해 주는 꽤 단순한 언어였죠.
곡선을 인쇄한다든가 블랙잭, 솔리테어 게임 같은 걸 하기도 했어요.
그리고 Focal5가 워낙 제한이 많은 언어였기 때문에 어셈블리 언어도 배우기 시작했어요.
그렇게 PDP-8에서 어셈블리 코드를 만들기 시작했죠.
거의 비슷한 시기에 여기저기 돌아다니다가 그 대학교에서 수업용으로 쓰던 IBM 컴퓨터(IBM 360, 50, 40시리즈 등)도 건드리기 시작했어요.
그걸로 포트란 프로그램하고 PL1 프로그램을 만들었죠.
그리고 좀 있다가 학교에서 CDC 컴퓨터를 구입하기 시작했고,
CDC 포트란을 쓰는 방법도 공부했죠.
언젠가부터 대학생들하고 어울리기 시작했어요.
대학생들은 제가 아직 고등학교도 들어가지 못한 어린 학생이라는 걸 금세 알아챘죠.
별로 개의친 않았어요. 수업 조교들도 다들 제가 겨우 중학생이라는 걸 알고 있는 것 같았어요.
제가 뭘 부수거나 하지만 않으면 제가 근처에서 놀아도 신경 쓰지 않는 분위기였죠.
교수님도 두 분 알게 됐는데, 신기하다는 반응이었어요.
얼마 안 있어서 교수님 중 한 분이 물리학과와 함께 일하게 돼서 소프트웨어 만드는 걸 도와줄 사람이 필요했는데, 저한테 물어보더라고요.
그렇게 갓 15살이 됐을 무렵에 물리학과에서 일하게 됐어요.
그 후로 앞만 보고 여기까지 오게 된 것 같습니다.

## 참고문헌

* 프로그래머로 사는 법 - 프로그래머의 길을 걸어가는 당신을 위한 안내서
    * 원제: MAKING IT BIG IN SOFTWARE: GET THE JOB. WORK THE ORG. BECOME GREAT.
    * Sam Lightstone 지음 (2010, Pearson Education. Inc.)
    * 서환수 옮김 (2013 4쇄, Repulic of Korea, Hanbit media inc. (한빛미디어))
    * ISBN: 9788979149623
    * [한빛출판네트워크](http://www.hanbit.co.kr/store/books/look.php?p_code=B6104154358)
* 프로그래밍 심리학
    * 원제: PSYCHOLOGY OF COMPUTER PROGRAMMING, THE: Silver Anniversary Edition
    * Gerald M. Weinberg 지음 (1971년에 초판이 나옴)
    * 조상민 옮김 (2014 신판 1쇄, Republic of Korea, INSIGHT Press(인사이트))
    * ISBN: 978-89-6626-098-0(14000)
    * [인사이트](https://insightbooklist.wordpress.com/books/ppp/%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%B0%8D-%EC%8B%AC%EB%A6%AC%ED%95%99/ )
