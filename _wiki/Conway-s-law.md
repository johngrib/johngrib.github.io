---
layout  : wiki
title   : 콘웨이의 법칙(Conway's law)
summary : 소프트웨어 구조는 개발 조직의 커뮤니케이션 구조를 닮는다.
date    : 2017-12-04 21:34:28 +0900
updated : 2018-02-20 09:00:21 +0900
tags    : proverb law
toc     : true
public  : true
parent  : proverb
latex   : false
---
* TOC
{:toc}

## 개요

> Any organization that designs a system (defined broadly) will produce a design whose structure is a copy of the organization's communication structure.[^1]

* 소프트웨어 구조는 해당 소프트웨어를 개발한 조직의 커뮤니케이션 구조를 닮게 된다.

### 멜빈 콘웨이(Melvin E. Conway)

* 멜빈 콘웨이는 컴퓨터 과학자이자, 해커이다.
* SAVE라 불리는 Burroughs 220을 위한 어셈블러를 작성한 바 있다.

## 해석

### The Jargon File에 수록된 콘웨이의 법칙

[[The-Jargon-File]]의 [콘웨이의 법칙 항목](http://www.catb.org/jargon/html/C/Conways-Law.html)에는 다음과 같은 말이 있다.

> If you have four groups working on a compiler, you'll get a 4-pass compiler.

**하나의 컴파일러를 만들기 위해 4개의 팀이 조직된다면, 4단계로 빌드하는 컴파일러가 나오게 된다.**

#### Tom Cheatham의 추가 해석

> If a group of N persons implements a COBOL compiler, there will be N-1 passes. Someone in the group has to be the manager.

**N 명의 그룹이 코볼 컴파일러를 구현한다면, N-1 단계가 될 것이다. 왜냐하면 한 사람은 관리자가 되어야 할 테니까.**

* 관료제를 중시한 코볼 업계를 돌려 비판한 말이라고 할 수 있겠다.

### 스티브 맥코넬이 설명한 콘웨이의 법칙

[[PROFESSIONAL-SOFTWARE-DEVELOPMENT]]{Professional 소프트웨어 개발}에서 스티브 맥코넬은 다음과 같이 설명한다.

>
콘웨이 법칙은 "프로그램의 구조는 그것을 제작하는 조직의 구조를 반영한다"는 것이다.
혼란스러운 회사는 혼란스러운 소프트웨어만 만들어낸다.
영웅 개발자를 고용하고, 그들에게 전권을 주며, 기적을 만들어 내기 위해 영웅들을 자유롭게 놔두는 회사는 결국 기발할지는 모르지만 에러도 무지하게 많은 제품을 만들어 낸다.
비효율적인 프로세스를 실행하는 회사의 제품은 유치하고 둔한 반면, 효과적이고 최적화된 조직은 조화롭고 아주 만족스러운 소프트웨어를 만들어 낸다.[^3]

### 프레드 브룩스가 설명한 콘웨이의 법칙

[[Mythical-Man-Month]]의 "10장 기록물 가설"을 읽어보면 프레드 브룩스가 콘웨이의 법칙을 설명한다.

>
조직도는 콘웨이의 법칙이 말하는 것처럼 인터페이스 명세와 서로 얽혀 있다.
"시스템을 설계하는 조직은, 그 조직의 의사소통 구조를 본뜬 시스템을 만들어내게 되어 있다."
이어서 콘웨이는 최초의 조직도에는 첫 설계 내용이 반영될 것이라고 지적한다.
이 설계가 제대로일 가능성은 물론 아주 낮다.
**시스템 설계가 자유롭게 변경될 수 있어야 한다면 조직 역시 변화에 대비하고 있어야 한다.**



## Links

* [CONWAY'S LAW](http://www.melconway.com/Home/Conways_Law.html): Conway 홈페이지에 소개된 Conway's law.
* [How Do Committees Invent? - Melvin E. Conway](http://www.melconway.com/Home/Committees_Paper.html): 1968년 Conway's law가 소개된 콘웨이의 페이퍼.

* [Conway's law(the jargon file)](http://www.catb.org/jargon/html/C/Conways-Law.html)
* [Conway's law(wikipedia)](https://en.wikipedia.org/wiki/Conway%27s_law)
* [Melvin Conway(wikipedia)](https://en.wikipedia.org/wiki/Melvin_Conway)

## 각주

[^1]: [CONWAY'S LAW](http://www.melconway.com/Home/Conways_Law.html): 콘웨이의 홈페이지에서 인용.
[^2]: The New Hacker's Dictionary. 국내에는 '해커 영어 사전'으로 번역되었다.
[^3]: [[PROFESSIONAL-SOFTWARE-DEVELOPMENT]]{Professional 소프트웨어 개발} 184쪽.
