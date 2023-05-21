---
layout  : wiki
title   : Convoy effect
summary : 수송대 효과, 호위 효과
date    : 2023-04-19 20:50:10 +0900
updated : 2023-05-21 22:28:15 +0900
tag     : 
resource: 18/827513-63B9-4FE1-8E72-C9E3EB23FABF
toc     : true
public  : true
parent  : [[/jargon]]
latex   : true
---
* TOC
{:toc}

## 개요

CPU를 많이 필요로 하지 않는 프로세스들이, CPU를 오랫동안 사용하는 프로세스가 끝나기를 기다리는 현상.

- convoy는 일종의 군사용어로 차량이나 항공기, 선박 등이 함께 무리를 지어 전술적으로 이동하는 모습을 의미한다.

## From: 운영체제 아주 쉬운 세 가지 이야기

>
FIFO 스케쥴링이 어떤 문제를 야기하는지 같이 생각해 보자.
구체적으로 다시 A, B, C 세 개의 작업을 가정하자.
이번에는 A는 100초, B와 C는 10초 동안 실행된다.
>
> ![]( /resource/18/827513-63B9-4FE1-8E72-C9E3EB23FABF/233068273-4f67fee7-e84f-4e93-a93e-eb6883a2c470.png )
>
> **<그림 7.2> FIFO가 그렇게 좋은 스케줄링이 아닌 이유**
>
그림 7.2에서 볼 수 있듯이, 작업 A가 B와 C 보다 먼저 100초 동안 실행된다.
따라서 시스템의 평균 반환 시간은 110초로 늘어난다. $$ { ( 100 + 110 + 120 ) \over 3 } = 110 $$.
>
이 현상을 convoy effect라 부른다.
CPU를 많이 필요로 하지 않는 프로세스들이, CPU를 오랫동안 사용하는 프로세스가 끝나기를 기다리는 현상을 말한다.
>
슈퍼마켓에서 줄 서서 계산을 기다릴 때도 비슷하게 발생한다.
나는 음료수 한 병만 계산하면 되는데, 앞사람이 카트 세 개에 물건을 가득 싣고, 계산을 기다리는 경우다.
[^three-71]


## From: 응용 운영체제 개념

>
모든 다른 프로세스들이 하나의 긴 프로세스가 CPU를 양도하기를 기다리는 것을 호위 효과(convoy effect)라고 한다.
이 효과는 CPU와 장치 이용률이 짧은 프로세스들이 먼저 처리되도록 허용될 때보다 저하되는 결과를 초래한다.
>
선입 선처리 스케줄링 알고리즘은 비선점형이라는 것을 명심한다.
일단 CPU가 한 프로세스에 할당되면, 그 프로세스가 종료하든지 또는 입출력 처리를 요구하든지 하여 CPU를 방출할 때까지 CPU를 점유한다.
선입 선처리 알고리즘은 특히 시분할 시스템에서 문제가 되는데 그 이유는 시분할 시스템에서는 각 사용자가 규칙적인 간격으로 CPU의 몫을 얻는 것이 매우 중요하기 때문이다.
한 프로세스가 지나치게 오랫동안 CPU를 점유하게 허용하는 것은 손해가 클 것이다.
[^concepts-167]

## 참고문헌

- 운영체제 아주 쉬운 세 가지 이야기 [제2판] / Remzi H. Arpaci-Dusseau, Andrea C. Arpaci-dusseau 공저 / 원유집, 박민규, 이성진 공역 / 홍릉 / 제2판 발행: 2020년 09월 10일 / 원제: Operating Systems: Three Easy Pieces
- [Operating Systems: Three Easy Pieces]( https://pages.cs.wisc.edu/~remzi/OSTEP/ ) - '운영체제 아주 쉬운 세 가지 이야기'의 인터넷에 공개된 원서.
    - [7 CPU Scheduling]( https://pages.cs.wisc.edu/~remzi/OSTEP/cpu-sched.pdf )
- 응용 운영체제 개념 / Abraham Silberschatz 저 / 조봉열 역 / 홍릉과학출판사 / 초판 발행: 2013년 02월 15일 / 원제: Operating System Concepts with JAVA 7TH EDITION

## 함께 읽기

- [THE CONVOY PHENOMENON (PDF)]( https://dl.acm.org/doi/pdf/10.1145/850657.850659 ) - Mike Blasgen, Jim Gray, Mike Mitoma, Tom Price 의 1977년 논문.
    - 아직 안 읽었다. 나중에 읽으려고 링크 추가해 둠.
    - [THE CONVOY PHENOMENON (PDF)]( https://jimgray.azurewebsites.net/papers/Convoy%20Phenomenon%20RJ%202516.pdf )
    - [The convoy phenomenon]( https://blog.acolyer.org/2019/07/01/the-convoy-phenomenon/ )

## 주석

[^three-71]: 운영체제 아주 쉬운 세 가지 이야기. 7.3장. 71쪽.
[^concepts-167]: 응용 운영체제 개념. 5.3.1장. 167쪽.

