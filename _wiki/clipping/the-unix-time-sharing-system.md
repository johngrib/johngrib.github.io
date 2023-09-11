---
layout  : wiki
title   : The UNIX Time-Sharing System
summary : 
date    : 2023-05-20 20:39:11 +0900
updated : 2023-09-11 21:55:54 +0900
tag     : 
resource: 6D/5062DC-B812-495F-A01B-A6FB0FF09FA9
toc     : true
public  : true
parent  : [[/clipping]]
latex   : false
---
* TOC
{:toc}

- [PDF]( https://dsf.berkeley.edu/cs262/unix.pdf )
- Dennis M. Ritchie 와 Ken Thompson의 1974년 7월 논문.

## 요약

- UNIX는 Digital Equipment Corporation PDP-11/40 과 11/45 컴퓨터를 위한 범용(General-purpose), 다중 사용자(Multi-user), 대화형(Interactive) 운영체제이다.
- 이 운영체제는 다음과 같은 특징을 가지고 있으며, 이는 대형 OS에서도 찾아보기 힘든 다양한 기능들이다.
    - (1) 분리 가능한 볼륨을 포함하는 계층적 파일 시스템
    - (2) 호환 가능한 파일, 장치, 프로세스 간 I/O
    - (3) 비동기 프로세스를 시작할 수 있는 능력
    - (4) 사용자별로 선택 가능한 시스템 명령어 언어
    - (5) 12개의 언어를 포함한 100개 이상의 서브시스템
- 이 논문은 파일 시스템과 사용자 명령어 인터페이스의 특성과 구현에 대해 설명한다.

### 1. Introduction

서론

UNIX 에는 3가지 버전이 있다.

- 초기 버전은 1969-1970년경에 PDP-7, PDP-9 컴퓨터에서 동작했다.
- 두 번째 버전은 보호되지 않은 PDP-11/20 컴퓨터에서 동작했다.
- 이 논문은 PDP-11/40, /45 시스템에 대해서만 설명한다.
    - 이 시스템이 최신이고, 이전 UNIX 시스템에서 부족하거나 결여된 기능들을 재설계한 것이다

1971년 2월에 PDP-11 UNIX가 운영되기 시작했고, 이후 UNIX는 40번 설치됐다.

- 이 시스템은 일반적으로 이 논문에서 설명하는 시스템보다 작다.
- 이들 대부분은 다음과 같은 용도로 사용되고 있다.
    - 특허 신청서 및 기타 텍스트 자료의 준비 및 서식 지정
    - 벨 시스템 내의 다양한 교환기에서 발생하는 문제 데이터의 수집 및 처리
    - 전화 서비스 주문의 기록 및 확인
    - OS, 언어, 컴퓨터 네트워크 및 컴퓨터 과학의 다른 주제에 대한 연구과 문서 작성

UNIX의 가장 중요한 성과는, 장비/인력 등에 많은 비용을 들이지 않아도 강력한 대화형 운영체제를 만들 수 있다는 것을 보여준 것이다.

- UNIX는 4만 달러에 구입할 수 있는 장비에서 동작할 수 있다.
- 메인 시스템 소프트웨어 개발에는 2 man/year 이하가 소요되었다.
- UNIX는 대형 시스템에서도 찾아보기 힘든 다양한 기능들을 가지고 있다.
    - 하지만 UNIX의 가장 중요한 특징은 간결함, 우아함, 사용의 용이함이다.


시스템 자체 외에도 UNIX에서 사용 가능한 주요 프로그램은 다음과 같다.

- 어셈블러
- QED 기반의 텍스트 편집기 [2]
- 링킹 로더
- 심볼릭 디버거
- 타입 및 구조(C)를 갖는 BCPL [3]과 유사한 프로그래밍 언어의 컴파일러
- BASIC 방언용 인터프리터
- 텍스트 포매팅 프로그램
- Fortran 컴파일러
- Snobol 인터프리터
- 하향식(top-down) 컴파일러-컴파일러 (TMG) [4]
- 상향식(bottom-up) 컴파일러-컴파일러 (YACC)
- 서식 문자 생성기
- 매크로 프로세서 (M6) [5]
- 순열 색인 프로그램

>
There is also a host of maintenance, utility, recreation, and novelty programs. All of these programs were written locally. It is worth noting that the system is totally self-supporting. All UNIX software is maintained under UNIX; likewise, UNIX documents are generated and formatted by the UNIX editor and text formatting program.

그 외에도 유지보수, 유틸리티, 레크리에이션, 재미 용도의 프로그램들이 있다.

- 이 모든 프로그램들은 로컬에서 작성되었다.
- UNIX 시스템은 완전히 자체 지원(self-supporting)되는 것이다.
    - 모든 UNIX 소프트웨어는 UNIX에서 유지보수된다.
    - UNIX 문서도 UNIX 편집기와 텍스트 포매팅 프로그램에 의해 생성되고 서식이 지정된다.

