---
layout  : wiki
title   : TOCTTOU
summary : Time Of Check To Time Of Use 오류
date    : 2023-06-10 20:14:42 +0900
updated : 2023-07-30 13:43:44 +0900
tag     : 
resource: 83/2DE29A-6CFC-4858-AD37-D947DC492BBB
toc     : true
public  : true
parent  : [[/jargon]]
latex   : false
---
* TOC
{:toc}

- TOCTOU 라고도 부른다.

## From: 운영체제 아주 쉬운 세 가지 이야기

>
팁: TOCTTOU에 주의하자
>
1974년에 McPhee는 컴퓨터에 있는 한 문제를 발견했다.
"...만약 유효성 검사와 실제 유효성 검사 동작 사이에 시간차이가 발생한다면, 멀티태스킹 상황에서 그 시간 차이 내에서 유효성 검사 변수가 의도적으로 변경될 수 있다. 그 결과 제어 프로그램에서 오동작이 발생하게 된다." 라고 McPhee는 말했다.
오늘 날에는 **검사 시작 시간과 사용 시간 사이 (Time Of Check To Time Of Use (TOCTTOU))** 문제라고 부르며, 여전히 발생할 수 있는 현상이다.
Bishop과 Dilger [BD96][^bd96]가 소개한 간단한 예제를 통해 어떻게 사용자가 서비스의 신뢰성을 깨고 문제를 일으킬 수 있는지 알아보자.
메일 서비스가 루트 권한으로 실행되었다고 하자(그렇기 때문에 시스템에 있는 모든 파일들에 접근 가능하다).
메일 서비스는 사용자의 도착 메일함에 새로 도착한 메시지들을 다음과 같이 추가한다.
먼저, 지정된 사용자가 소유한 일반 파일인지 확인을 위해 `lstat()`을 호출하여 파일에 대한 정보를 얻는다.
이 때 메일 서버가 갱신하면 안되는 파일에 해당 파일이 링크된 것인지 확인을 한다.
그리고 검사가 성공적으로 끝나면 해당 파일에 새로운 메시지를 포함시킨다.
>
불행하게도 검사하는 시점과 갱신되는 시점 사이에 시간차가 발생한다.
공격자(이 경우에는 도착한 메일이 있고 도착 메일함에 접근 권한이 있는 사용자)가 도착 메일함을 사용자와 패스워드 목록을 담은 `/etc/passwd`와 같은 민감한 파일로 변경한다고 해보자(`rename()` 명령을 사용해서).
검사와 접근 시간 사이에 변경이 일어난다면 아무것도 모른체 메일의 수신 내용을 그 민감한 파일에 갱신해 넣을 것이다.
이로써 권한 상승이 되었기 때문에 메일을 보내는 것으로 민감한 파일을 쓸 수 있게 되었다.
사용자가 `/etc/passwd`에 루트 계정을 추가할 수 있으며 시스템 제어권을 얻게 된다.
>
TOCTTOU 문제를 해결할 간단하지만 위대한 해결책은 나오지 않았다 [Tsa+08][^tsa08].
한 가지 도움이 되는 해결책은 루트 권한이 있어야 실행할 수 있는 프로그램의 수를 줄이는 것이다.
`open()` 명령 수행시 `O_NOFOLLOW` 플래그를 써서 대상 파일이 심볼릭 링크면 실패하도록 할 수 있다.
그래서 심볼릭 링크를 악용한 공격을 피할 수 있다.
**트랜잭션 기반 파일 시스템 (transactional file system)** [Hu+18][^hu18]과 같은 좀 더 극단적 방법은 이 문제를 해결할 수 있지만, 그렇게 많이 활용중은 아니다.
그렇고 그런 조언일 수도 있지만, 높은 권한으로 실행하는 코드를 작성할 때는 조심하자.
[^easy-531]

## From: UNIX 고급 프로그래밍

>
TOCTTOU 오류는 응용 프로그램이 파일 기반 함수를 두 번 호출하는데 둘째 호출이 첫째 호출의 결과에 의존하는 경우 발생하는 프로그램 취약점을 뜻한다.
두 호출이 원자적이지 않기 때문에 두 호출 사이에서 파일이 변할 수 있으며, 그러면 첫째 호출의 결과가 무효가 되어서 프로그램이 오작동할 수 있다.
파일 시스템 이름공간(namespace) 안에서 TOCTTOU 오류는 주로 특권을 가진 프로그램을 속여서 파일 시스템 권한들을 변조하려는(그럼으로써 특권을 가진 파일에 대한 권한이 줄어들게 하거나 특권을 가진 파일을 수정해서 보안 구멍을 만들기 위해) 목적으로 악용된다.
[Wei, Pu 2005][^wei]에 UNIX 파일 시스템 인터페이스의 TOCTTOU 취약점이 논의되어 있다.
[^rich-82]

## 함께 읽기

- [[/pattern/defensive-copy]]
    - 방어적 복사 기법을 통해 TOCTTOU 문제를 우회하는 방법.

## 참고문헌

- UNIX 고급 프로그래밍 [제3판] / 리처드 스티븐스, 스티븐 레이고 공저 / 류광 역 / 퍼스트북 / 인쇄일: 2014년 08월 28일 / 원제: Advanced Programming in the UNIX Environment
- 운영체제 아주 쉬운 세 가지 이야기 [제2판] / Remzi H. Arpaci-Dusseau, Andrea C. Arpaci-dusseau 공저 / 원유집, 박민규, 이성진 공역 / 홍릉 / 제2판 발행: 2020년 09월 10일 / 원제: Operating Systems: Three Easy Pieces

## 주석

[^easy-531]: 운영체제 아주 쉬운 세 가지 이야기. 39.16장. 531쪽.
[^bd96]: 원주: "Checking for Race Conditions in File Accesses," Matt Bishop and Michael Dilger. Computing Systems 9:2, 1996.. 파일 시스템에 존재하는 TOCTTOU 문제를 매우 잘 설명하였다.
[^tsa08]: 원주: "Portably Solving File TOCTTOU Races with Hardness Amplification," D. Tsafrir, T. Hertz, D. Wagner, and D. Da Silva. FAST'08, San Jose, California, 2008. TOCTTOU를 소개한 논문은 아니지만 그 문제를 꽤 최근에 그리고 아주 잘 설명하였고, 쉽게 이식할 수 있는 방식의 해결법을 제시하였다.
[^hu18]: 원주: "TxFS: Leveraging File-System Crash Consistency to Provide ACID Transactions," Y. Hu, Z. Zhu, I. Neal, Y. Kwon, T. Cheng, V. Chidambaram, and E. Witchel. USENIX ATC'18, June 2018. USENIX ATC'18에서 최우수 논문상을 수상했다. 트랜잭션 파일 시스템을 배우기에 매우 좋은 시작점이 되는 최신 논문이다.
[^rich-82]: UNIX 고급 프로그래밍. 3.3장. 82쪽.
[^wei]: 원주: Wei, J., Pu, C. 2005. "TOCTTOU Vulnerabilities in UNIX_Style File Systems: An Anatomical Study," Proceedings of the 4th USENIX Conference on File and Storage Technologies (FAST'05), pp. 155-167, San Francisco, CA. <br/> UNIX 파일 시스템 인터페이스의 TOCTTOU 취약점을 서술한다.

