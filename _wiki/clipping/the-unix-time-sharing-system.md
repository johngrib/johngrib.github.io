---
layout  : wiki
title   : The UNIX Time-Sharing System
summary : 
date    : 2023-05-20 20:39:11 +0900
updated : 2023-09-14 22:14:13 +0900
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

대부분의 UNIX 소프트웨어는 위에서 언급한 'C 언어'로 작성되었다.

- 초기 버전의 운영체제는 어셈블리어로 작성되었다.
    - 하지만 1973년 여름에 C로 다시 작성되었다.
    - 새로운 시스템의 크기는 이전 시스템보다 약 1/3 정도 더 크다.
- 새로운 시스템은 이전 시스템보다 이해하고 수정하기가 훨씬 쉽다.
    - 또한 다중 프로그래밍과 여러 사용자 프로그램 간에 재진입 코드를 공유할 수 있는 기능을 포함하여 많은 기능적 개선 사항이 포함되어 있다.
    - 따라서 우리는 이 크기의 증가를 꽤 허용할만하다고 생각했다.

### 3. The File System

파일 시스템

UNIX의 가장 중요한 역할은 파일 시스템을 제공하는 것이다.

- 사용자의 관점에서 보면 세 가지 종류의 파일이 있다.
    - 일반 디스크 파일
    - 디렉토리
    - 특수 파일

#### 3.1 Ordinary Files

- 파일에는 사용자가 저장한 모든 정보가 포함된다.
    - 예를 들어, 심볼릭 또는 바이너리(오브젝트) 프로그램이 있다.
- 시스템은 특정한 구조를 미리 요구하지 않는다.
- 텍스트 파일은 단순히 문자열로 구성되어 있으며, 줄은 줄바꿈 문자로 구별한다.
- 바이너리 프로그램은 프로그램이 실행을 시작할 때 코어 메모리에 나타나는 단어의 시퀀스이다.
- 일부 사용자 프로그램은 더 많은 구조를 가진 파일을 조작한다.
    - 어셈블러는 특정 형식의 오브젝트 파일을 생성하고 로더는 특정 형식의 오브젝트 파일을 기대한다.
- 그러나 파일의 구조는 사용하는 프로그램에 의해 제어되며, 시스템에 의해 제어되지 않는다.

#### 3.2 Directories

디렉토리는 파일의 이름과 파일 자체 사이의 매핑을 제공하여, 파일 시스템 전체에 구조를 유도하는 역할을 한다.

- 각 사용자는 자신의 파일 디렉토리를 가지고 있다.
- 사용자는 그룹으로 편리하게 처리할 수 있는 파일을 포함하는 하위 디렉토리를 생성할 수도 있다.
- 디렉토리는 일반 파일과 정확히 같은 방식으로 작동한다.
    - 그러나 일반 프로그램은 디렉토리를 쓸 수 없으므로 시스템이 디렉토리의 내용을 제어한다.
    - 그러나 적절한 권한을 가진 사용자는 다른 파일과 마찬가지로 디렉토리도 읽을 수 있다.

시스템은 스스로 사용할 용도의 여러 디렉토리를 관리한다.

- 이 중 하나가 바로 root 디렉토리다.
    - 시스템의 모든 파일은 원하는 파일에 도달할 때까지 디렉토리 체인을 따라 경로를 추적함으로써 찾을 수 있다.
    - 이러한 검색의 시작점은 종종 root이다.
- 다른 시스템 디렉토리에는 일반적으로 사용되는 모든 프로그램(즉, 모든 명령)이 포함되어 있다.
    - 그러나 프로그램이 실행되기 위해 이런 디렉토리들에 반드시 존재해야 하는 것은 결코 아니다.

파일명과 경로에 대하여

- 파일명은 14글자 이하의 문자열로 지정된다.
- 파일의 이름이 시스템에 지정되면, 이는 경로 이름의 형태일 수 있다.
    - 경로 이름은 슬래시 `/`로 구분된 디렉토리 이름의 시퀀스로 구성되며, 파일 이름으로 끝난다.
    - 시퀀스가 슬래시로 시작하면 검색은 root 디렉토리부터 시작된다.
    - `/alpha/beta/gamma` 라는 이름은 시스템이 root에서 디렉토리 `alpha`를 검색하고, `alpha`에서 `beta`를 검색하고, 마지막으로 `beta`에서 `gamma`를 찾도록 한다.
    - `gamma`는 일반 파일, 디렉토리 또는 특수 파일일 수 있다.
    - `/`라는 이름은 root 자체를 가리킨다.

- `/`로 시작하지 않는 경로 이름은 시스템이 사용자의 현재 디렉토리에서 검색을 시작하도록 한다.
    - 따라서 `alpha/beta` 라는 이름은 현재 디렉토리의 하위 디렉토리 `alpha`에 있는 `beta`라는 이름의 파일을 지정한다.
    - 가장 간단한 종류의 이름인 `alpha`는 현재 디렉토리에 있는 파일을 가리킨다.
    - 다른 한편으로, `null` 파일 이름은 현재 디렉토리를 가리킨다.

디렉토리와 링크에 대하여

- 디렉토리가 아닌 동일한 파일이 여러 디렉토리에 다른 이름으로 표시될 수 있다.
    - 이 기능을 링크(linking)라고 한다.
    - 링크는 파일에 대한 디렉토리 항목이다.
- UNIX에서 링크를 허용하는 다른 시스템들과 다른 특징을 갖고 있다.
    - UNIX의 링크는 모두 동등한 상태를 갖는다.
    - 즉, 파일은 특정 디렉토리 내에 존재하지 않는다.
        - 파일에 대한 디렉토리 항목은 단지 '파일의 이름'과 실제로 파일을 설명하는 정보를 가리키는 '포인터'로 구성된다.
        - 따라서 파일은 디렉토리 항목과 독립적으로 존재한다.
        - 파일은 마지막 링크가 사라지게 되면 함께 사라진다.

- 각각의 디렉토리에는 항상 최소한 두 개의 항목이 있다.
    - 각 디렉토리의 이름은 디렉토리 자체를 가리킨다.
    - 전체 경로의 이름을 알지 못한다 해도 `.`이라는 이름으로 현재 디렉토리를 읽을 수 있다.
    - `..`이라는 이름은 관례적으로 그 디렉토리의 부모를 가리킨다.


디렉토리 구조는 root가 있는 트리의 형태를 갖도록 제한된다.

- `.`와 `..`을 제외한 각 디렉토리는 정확히 하나의 디렉토리에만 나타나야 한다.
- 이것은 디렉토리 구조의 하위 트리를 방문하는 프로그램의 작성을 단순화하고,
- 더 중요한 것은 계층 구조의 일부를 분리하는 것을 피하기 위한 것이다.
- 임의의 디렉토리에 대한 링크가 허용되면, root에서 디렉토리로의 마지막 연결이 끊어졌을 때 이를 감지하는 것이 매우 어려워진다.

#### 3.3 Special Files

특수 파일

특수 파일은 UNIX 파일 시스템의 가장 독특한 특징이다.

- UNIX에서 지원하는 각 I/O 장치들은 적어도 하나의 특수 파일과 연결된다.
    - 특수 파일은 일반 디스크 파일처럼 똑같이 읽고 쓸 수 있다.
    - 그러나 읽기/쓰기 요청을 하면 연결된 장치를 활성화시킨다는 점이 다르다.
- 각 특수 파일은 `/dev` 디렉토리에 존재한다.
    - 일반 파일처럼 이런 특수 파일에 대한 링크를 만들 수도 있다.
        - 예를 들어, 특수 파일 `/dev/ppt`에 값을 쓰면 종이 테이프를 펀치할 수 있다.
    - 각 통신 라인, 각 디스크, 각 테이프 드라이브, 물리적인 코어 메모리에 대한 특수 파일들이 있다.
    - 활성화된 디스크와 코어 특수 파일은 무차별적인 접근으로부터 보호된다.

이런 방식으로 I/O 장치를 처리하는 것에는 세 가지 이점이 있다.

- 파일과 장치 I/O 가 상당히 유사하다.
- 따라서 파일과 장치 이름은 같은 구문과 의미를 갖는다.
    - 따라서 파일 이름을 매개변수로 받는 프로그램에 장치 이름을 전달할 수 있다.
- 마지막으로, 특수 파일은 일반 파일과 동일한 보호 메커니즘의 대상이 된다.

#### 3.4 Removable File Systems

파일 시스템의 root 는 항상 같은 장치에 저장된다.

- 그러나 그렇다고 해서 이 장치에 전체 파일 시스템 계층 구조가 다 저장되어야 하는 것은 아니다.
- mount 시스템 요청에는 인자가 두 가지 있다.
    - 이미 존재하는 일반 파일의 이름
    - 독립적인 파일 시스템을 갖고 있는 direct-access 특수 파일의 이름
    - (mount는 이 둘을 연결한다)
- mount의 효과
    - '일반 파일에 대한 참조'가 이동식 볼륨의 파일 시스템의 'root 디렉토리'를 가리키도록 하는 것.
    - mount는 계층 트리의 잎(leaf, 일반 파일)을 완전히 새로운 하위 트리(이동식 볼륨의 계층구조)로 대체한다.
    - mount를 실행한 이후에는 이동식 볼륨의 파일과 영구적인 파일 시스템의 파일 사이에 사실상 구별이 없다.
    - 예를 들어,
        - root 디렉토리가 고정 디스크에 존재하고 사용자 파일을 포함하는 큰 디스크 드라이브는 시스템 초기화 프로그램에 의해 마운트되고,
        - 4개의 작은 디스크 드라이브는 사용자가 자신의 디스크 팩을 마운트하는 데 사용할 수 있다.
- 마운트 가능한 파일 시스템은 해당 특수 파일에 writing 하는 방식으로 생성된다.
    - 유틸리티 프로그램을 사용해서 비어있는 파일 시스템을 생성하거나 기존의 파일 시스템을 복사할 수도 있다.

서로 다른 장치에 있는 파일을 동일하게 처리하는 규칙에는 예외가 하나 있다.

- 하나의 파일 시스템 계층 구조와, 다른 파일 시스템 계층 구조 사이에는 링크가 존재할 수 없다는 것.
- 이 제한은 이동식 볼륨이 마운트 해제될 때 링크를 제거하기 위해 필요한 복잡한 작업을 피하기 위한 것이다.
- 특히 모든 파일 시스템의 root 디렉토리에서 이동식 볼륨이 마운트되었는지 여부와 상관없이, `..`은 부모 디렉토리가 아니라 자기 자신을 가리킨다.

#### 3.5 Protection

UNIX의 access control 체계는 매우 간단하지만, 몇 가지 특수한 기능이 있다.

- 시스템의 각 사용자는 고유한 사용자 식별 번호를 할당받는다.
    - 파일을 생성할 때, 생성되는 파일에는 소유자의 사용자 ID가 마킹된다.
    - 또한 새로운 파일에는 7개의 보호 비트가 주어진다.
    - 이 비트들 중 6개는 파일의 소유자와 다른 모든 사용자에 대해 독립적으로 읽기, 쓰기, 실행 권한을 지정한다.

- 7번째 비트(set-user-ID 비트)가 켜져 있으면 파일을 실행할 때, 시스템은 임시로 현재 사용자의 ID를 파일의 생성자 ID로 변경한다.
    - 이런 사용자 ID 변경은 해당 프로그램이 실행되는 동안에만 유효하다.
    - set-user-ID 기능은 다른 사용자에게는 접근이 제한된 파일을, 특권을 가진 프로그램이 사용할 수 있게 해주는 능력을 준다.
    - 이 기능을 통해 특정한 프로그램은 자신을 제외한 다른 프로그램이 접근할 수 없는 중요한 회계 파일 같은 것들을 사용할 수 있게 된다.
    - 프로그램을 호출한 실제 사용자의 ID를 확인하는 것은 항상 가능하므로, set-user-ID 프로그램은 자신의 호출자의 권한을 확인하는 데 필요한 모든 조치를 취할 수 있다.
- 이 기능은 일반 사용자가 특권을 가진 시스템 엔트리를 호출할 수 있게 해주는 조심스러운 명령어를 실행할 수 있게 해준다.
    - 예를 들어, "super-user"에 의해서만 호출될 수 있는 빈 디렉토리를 생성하는 시스템 엔트리가 있다.
    - 디렉토리는 "."와 ".." 엔트리를 가지고 있어야 한다.
    - 디렉토리를 생성하는 명령어는 super-user가 소유하고 있고, set-user-ID 비트가 설정되어 있다.
    - 이 명령어는 호출자의 디렉토리 생성 권한을 확인한 후, 디렉토리를 생성하고 "."와 ".."의 엔트리를 만든다.


- 누구나 자신의 파일에 set-user-ID 비트를 설정할 수 있으므로, 이 기능은 관리자의 개입 없이도 일반적으로 사용할 수 있다.
    - 예를 들어, 이 보호 체계는 [7]에서 제시된 MOO 회계 문제를 쉽게 해결할 수 있다.

- 시스템은 특정한 사용자 ID(super-user의 ID)를 파일 접근에 대한 일반적인 제약에서 벗어난 것으로 인식한다.
    - 따라서, 예를 들어 파일 시스템을 보호 체계의 제약 없이 dump하고 reload할 수 있는 프로그램을 작성할 수 있다.

#### 3.6 I/O Calls

