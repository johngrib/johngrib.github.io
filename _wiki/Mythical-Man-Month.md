---
layout  : wiki
title   : (책) 맨먼스 미신 - 소프트웨어 공학에 관한 에세이
summary : The Mythical Man-Month - Essays on Software Engineering
date    : 2018-02-19 12:52:55 +0900
updated : 2018-02-21 22:38:43 +0900
tag     : book Fred-Brooks
toc     : true
public  : true
parent  : book
latex   : false
---
* TOC
{:toc}

## 개요

1975년에 나온 소프트웨어 공학의 고전.

### 브룩스의 법칙

> 브룩스의 법칙: 소프트웨어 개발 프로젝트에 인력을 더 투입하면, 개발은 더 늦어진다.

브룩스의 법칙은 이 책의 핵심 주제를 요약한 것이다.

### 저자 프레드 브룩스(Frederick P. Brooks Jr.)에 대하여

* [1999년 튜링상 수상자](https://amturing.acm.org/award_winners/brooks_1002187.cfm).
* [노스 캐롤라이나 대학 컴퓨터 과학과를 설립했다](http://cs.unc.edu/people/frederick-p-brooks-jr/).
* 논문 [[No-Silver-Bullet]]{은총알은 없다}를 쓴 사람이다.
    * "은총알은 없다"는 맨먼스 미신 20주년 기념판의 16장에 수록되어 있다.

## 인상적인 부분 내용 정리

### 2장. 맨먼스 미신

맨먼스(Man-Month) 단위를 사용해 일정을 추정하는 것은 잘못된 사고방식이다.

* [[Brooks-s-law]]{브룩스의 법칙} 참고.

### 3장. 외과 수술 팀

프레드 브룩스가 제안하는 팀 구성 방법

* 커다란 전체 업무를 여러 팀에 나누어 맡긴다.
* 각각의 팀은 외과 수술 팀처럼 조직한다.
* 외과 수술 팀은 한 명의 외과의(수석 프로그래머)를 리더로 삼으며, 다양한 역할을 가진 전문가들이 업무를 나눠갖는다.

외과 수술 팀은 다음과 같이 구성된다.

* 외과의
* 부조종사: 외과의의 분신. 외과의 대신 회의에 가기도 한다. 외과의 부재시 대리 역할 수행.
* 행정 담당
    * 행정 담당의 비서
* 편집자(문서)
    * 편집자의 비서
* 프로그램 사무원
* 도구 담당
* 테스터
* 프로그래밍 언어 전문가

#### 외과 수술 팀에 대한 스티브 맥코넬의 코멘트

스티브 맥코넬은 [[PROFESSIONAL-SOFTWARE-DEVELOPMENT]] 10장. "건축가와 목수"에서 프레드 브룩스의 외과 수술 팀 모델에 대해 다음과 같이 적었다.

>
그러나 이 방식을 25년 동안 적용해 오면서, 생산성 향상이 외과 수술 팀 구조에 기인한 게 아니라,
그 프로젝트 내의 전문성이 아주 높았기 때문이란 걸 알게 되었다.

### 16장. 은총알은 없다

[[No-Silver-Bullet]] 참고.

* (1986년 기준으로) 앞으로 10년간 소프트웨어 분야에서 프로그래밍 생산성을 10배 이상 향상시킬 발전은 나타나지 않을 것이다.
* 소프트웨어 개발은 본질적으로 빠른 발전이 불가능한 분야이다.

## Links

* [맨먼스 미신(인사이트 출판사)](http://www.insightbook.co.kr/ppp/%EB%A7%A8%EB%A8%BC%EC%8A%A4-%EB%AF%B8%EC%8B%A0)
* [[Brooks-s-law]]{브룩스의 법칙}
* [프레드 브룩스의 홈페이지](http://www.cs.unc.edu/~brooks/)
* [[PROFESSIONAL-SOFTWARE-DEVELOPMENT]]{(책) Professional 소프트웨어 개발}
* [[No-Silver-Bullet]]{은총알은 없다}


