---
layout  : wiki
title   : The UNIX Time-Sharing System
summary : 
date    : 2023-05-20 20:39:11 +0900
updated : 2023-09-11 22:05:41 +0900
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

### 2. Hardware and Software Environment

하드웨어 및 소프트웨어 환경

- 우리의 UNIX 설치가 구현된 PDP-11/45는 16비트 워드(8비트 바이트) 컴퓨터이며, 144K 바이트의 코어 메모리를 가지고 있다.
    - UNIX는 42K 바이트를 차지한다.
    - 하지만 이 시스템은 매우 많은 장치 드라이버를 포함하고 있다.
    - 또한 I/O 버퍼와 시스템 테이블에 대한 공간이 넉넉하게 할당되어 있다.
- 위에서 언급한 소프트웨어를 실행할 수 있는 최소 시스템은 총 50K 바이트의 코어만 있어도 된다.

PDP-11 의 스펙

- 1M 바이트의 고정 헤드 디스크
    - 파일 시스템 저장 및 스왑에 사용된다.
- 2.5M 바이트의 이동식 디스크 카트리지를 제공하는 4개의 이동 헤드 디스크 드라이브
- 40M 바이트의 이동식 디스크 팩을 사용하는 단일 이동 헤드 디스크 드라이브
- 고속 종이 테이프 리더-펀치
- 9트랙 자기 테이프
- D-테이프
    - (개별 레코드를 주소 지정하고 재작성할 수 있는 일종의 자기 테이프 장치)
- 콘솔 타자기
- 14개의 가변 속도 통신 인터페이스
    - 100 시리즈 데이터셋에 연결
- 201 데이터셋 인터페이스
    - 주로 공동 라인 프린터에 출력을 스풀링하는 데 사용
- Picturephone® 인터페이스
- 음성 응답 장치
- 음성 합성기
- 포토 타입 세터
- 디지털 스위칭 네트워크
- Tektronix 611 저장관 디스플레이에 벡터, 곡선 및 문자를 생성하는 위성 PDP-11/20

The greater part of UNIX software is written in the above-mentioned C language [6]. Early versions of the operating system were written in assembly language, but during the summer of 1973, it was rewritten in C. The size of the new system is about one third greater than the old. Since the new system is not only much easier to understand and to modify but also includes many functional improvements, including multiprogramming and the ability to share reentrant code among several user programs, we considered this increase in size quite acceptable.

대부분의 UNIX 소프트웨어는 위에서 언급한 'C 언어'로 작성되었다.

- 초기 버전의 운영체제는 어셈블리어로 작성되었다.
    - 하지만 1973년 여름에 C로 다시 작성되었다.
    - 새로운 시스템의 크기는 이전 시스템보다 약 1/3 정도 더 크다.
- 새로운 시스템은 이전 시스템보다 이해하고 수정하기가 훨씬 쉽다.
    - 또한 다중 프로그래밍과 여러 사용자 프로그램 간에 재진입 코드를 공유할 수 있는 기능을 포함하여 많은 기능적 개선 사항이 포함되어 있다.
    - 따라서 우리는 이 크기의 증가를 꽤 허용할만하다고 생각했다.

### 3. The File System

파일 시스템
