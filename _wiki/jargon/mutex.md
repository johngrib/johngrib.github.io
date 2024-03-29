---
layout  : wiki
title   : mutex
summary : 
date    : 2023-06-14 22:24:19 +0900
updated : 2023-07-09 19:31:28 +0900
tag     : 
resource: BF/65A2CF-F24A-44CC-AEE3-EAE2D3425CDD
toc     : true
public  : true
parent  : [[/jargon]]
latex   : false
---
* TOC
{:toc}

## From: 운영체제 아주 쉬운 세 가지 이야기

>
쓰레드 간에 상호 배제(mutual exclusion) 기능을 제공하기 때문에 POSIX 라이브러리는 락을 mutex라고 부른다.
상호 배제는 한 쓰레드가 임계 영역 내에 있다면 이 쓰레드의 동작이 끝날 때까지 다른 쓰레드가 임계 영역에 들어올 수 없도록 제한한다고 해서 얻은 이름이다.
다음과 같은 POSIX 쓰레드 코드를 만나면 앞에서 언급한 것과 같은 동작을 한다고 이해하면 된다(래퍼를 사용하여 락과 언락 시에 에러를 확인하도록 하였다.)
>
> ```c
> pthread_mutex_t lock = PTHREAD_MUTEX_INITIALIZER;
> Pthread_mutex_lock(&lock); // 래퍼. 실패시 exit
> balance = balance + 1;
> Pthread_mutex_unlock(&lock);
> ```
[^easy-334]


## From: UNIX 고급 프로그래밍

>
한 번에 하나의 스레드만 접근하도록 강제해서 공유 자료를 보호하는 한 가지 방법은 `pthreads`의 뮤텍스 인터페이스를 사용하는 것이다.
뮤텍스(mutex)라는 이름은 mutual-exclusion(상호배제)을 줄인 것이다.
기본적으로 뮤텍스는 공유 자원에 접근하기 전에 설정하고(잠그고) 공유 자원을 다 쓴 후에는 해제하는(푸는) 하나의 자물쇠이다.
한 스레드가 뮤텍스를 설정하면, 그 뮤텍스를 설정하고자 하는 다른 모든 스레드는 원래의 스레드가 뮤텍스를 해제할 때까지 차단된다.
만일 여러 개의 스레드가 차단된 상태에서 뮤텍스가 풀리면 차단되었던 모든 스레드는 실행 가능 상태로 변하며, 그 중 가장 먼저 실행된 스레드가 뮤텍스를 설정하게 된다.
나머지 스레드들은 뮤텍스가 여전히 잠겨 있다고 인식하고는 다시 풀릴 때까지 기다린다.
결과적으로, 오직 한 번에 하나의 스레드만 실행을 진행할 수 있다.
>
이러한 상호 배제 메커니즘은 모든 스레드가 동일한 자료 접근 규칙을 따르도록 프로그램을 설계할 때에만 제대로 작동한다.
운영체제가 자료에 대한 접근을 프로그램 대신 직렬화해주지는 않는다.
만일 스레드 하나가 자물쇠를 획득하지도 않고 공유 자원에 접근할 수 있게 하면, 다른 모든 스레드가 자물쇠를 획득한 후 공유 자원에 접근한다는 규칙을 지켜도 비일관성이 발생할 수 있다.
>
`pthreads` 인터페이스에서 뮤텍스는 `pthread_mutex_t` 형식의 변수로 표현된다.
뮤텍스 변수를 사용하려면 먼저 그것을 상수 `PTHREAD_MUTEX_INITIALIZER`로 설정하거나(정적으로 할당된 뮤텍스의 경우에만) `pthread_mutex_init` 함수를 호출해서 초기화해 주어야 한다.
뮤텍스를 동적으로 할당하는 경우(이를테면 `malloc`을 호출해서), 메모리를 해제하기 전에 반드시 `pthread_mutex_destory` 함수를 호출해야 한다.
[^rich-491]

## 함께 읽기

- [[/locking]]

## 참고문헌

- UNIX 고급 프로그래밍 [제3판] / 리처드 스티븐스, 스티븐 레이고 공저 / 류광 역 / 퍼스트북 / 인쇄일: 2014년 08월 28일 / 원제: Advanced Programming in the UNIX Environment
- 운영체제 아주 쉬운 세 가지 이야기 [제2판] / Remzi H. Arpaci-Dusseau, Andrea C. Arpaci-dusseau 공저 / 원유집, 박민규, 이성진 공역 / 홍릉 / 제2판 발행: 2020년 09월 10일 / 원제: Operating Systems: Three Easy Pieces

## 주석

[^rich-491]: UNIX 고급 프로그래밍. 11.6.1장. 491쪽.
[^easy-334]: 운영체제 아주 쉬운 세 가지 이야기. 28.2장. 334쪽.

