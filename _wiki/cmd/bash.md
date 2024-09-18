---
layout  : category
title   : bash
summary : 
date    : 2023-07-31 22:24:23 +0900
updated : 2024-09-18 09:12:37 +0900
tag     : 
resource: 65/1379C8-1FFE-4FE4-AB4F-FD812C06909D
toc     : true
public  : true
parent  : [[/cmd]]
latex   : false
---
* TOC
{:toc}

## From: Dave Taylor

>
수십 개의 유닉스 셀들이 있지만, 크게 본(Bourne) 셸(sh)과 C셸(csh), 이렇게 두가지 종류로 양분된다.
유닉스와 리눅스에서 가장 중요한 셀들은 본 셸, C 셸, 콘(Korn) 셸(C셸의 일부 수정본), 그리고 본 어게인(Bourne Again) 셸(bash)이다.
>
원조 명령어 셀로 유명한 것은 본 셀로, 유닉스의 초창기 시절 AT&T 벨 연구소에 근무하던 스티브 본(Steven Bourne)이 제작했다.
여러분의 유닉스 장비에 `/bin/sh`로 존재해 여전히 건재함을 과시하고 있다.
또 매력적이지도 않고 문법도 다소 엉뚱하지만, 단순하고 강력한 스크립트 관련 환경으로서, 스크립트 세계 공용어[^lingua-franca]가 될 만큼 이종 유닉스들에서도 공통적으로 사용된다.
>
프리소프트웨어재단(FSF, Free Software Foundation)이 오픈소스(open source) 방식으로 재구현한 본 셀은 bash(Bourne Again Shell)이라는 이름으로 사용된다.
이 셸은 20년 된 명령어 셸을 그저 재구현한 차원을 넘어, 멋진 셸 스크립트 관련 환경과 다양한 기능을 제공하는 대화식 사용자 셸이다.
많은 리눅스 시스템에서는 `/bin/sh` 이 `bash`의 하드 링크(hard link)이다.
[^wicked-2]

## 하위 문서

<div id="sub-document-list"></div>

## 참고문헌

- 셸 스크립트 - 101가지 예제로 정복하는 / Dave Taylor 저 / 여인춘 역 / 에이콘출판사 / 발행: 2005년 09월 26일 / 원제: Wicked Cool Shell Scripts

## 주석

[^lingua-franca]: 책에 포함된 감수자 주: lingua franca는 모국어를 달리하는 사람들이 상호이해를 위하여 습관적으로 사용하는 언어를 말한다.
[^wicked-2]: 셸 스크립트 - 101가지 예제로 정복하는. 2쪽.

