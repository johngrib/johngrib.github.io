---
layout  : wiki
title   : reader-writer lock
summary : 리더-라이터 락
date    : 2023-06-15 21:56:38 +0900
updated : 2023-06-15 22:01:47 +0900
tag     : 
resource: 2F/7180A1-E213-41B1-AEA0-B33D0A1A04F3
toc     : true
public  : true
parent  : [[/jargon]]
latex   : false
---
* TOC
{:toc}

## From: UNIX 고급 프로그래밍

>
판독자-기록자 자물쇠(reader-writer lock; 또는 읽기-쓰기 자물쇠)는 [[/jargon/mutex]]{뮤텍스}와 비슷하되 좀 더 높은 수준의 병렬성을 지원할 수 있다는 점이 특징이다.
뮤텍스의 상태는 잠기거나 잠기지 않은 두 가지뿐이며, 한 시점에서 오직 하나의 스레드만 뮤텍스를 잠글 수 있다.
반면 판독자 기록자 자물쇠의 상태는 세 가지이다.
이 자물쇠는 읽기 모드로 잠기거나, 쓰기 모드로 잠기거나, 잠기지 않는다.
쓰기 모드 잠금은 한 시점에서 단 하나의 스레드에게만 가능하지만, 읽기 모드 잠금의 경우에는 하나의 자물쇠를 여러 스레드가 동시에 잠그는 것이 가능하다.
>
판독자-기록자 자물쇠가 쓰기 모드로 잠겨 있으면, 그 자물쇠를 잠그려 하는 다른 모든 스레드는 자물쇠가 풀릴 때까지 차단된다.
반면 판독자-기록자 자물쇠가 읽기 모드로 잠겨 있으면, 다른 모든 스레드는 그 자물쇠를 읽기 모드로 잠글 수 있다.
그러나 쓰기 모드로 잠그려 하는 스레드(기록자)는 모든 스레드가 자물쇠를 풀 때까지 기다려야 한다.
그리고 구현에 따라 다를 수 있긴 하지만, 읽기 모드로 잠겨 있는 자물쇠를 쓰기 모드로 잠그기 위해 차단된 스레드가 존재하는 동안에는 추가적인 읽기 잠금 시도들이 차단되는 것이 일반적이다.
이는 판독자들이 끊임없이 생겨서 기록자가 굶주리는 일을 방지하기 위한 것이다.
>
판독자-기록자 자물쇠는 어떤 자료구조의 조회가 수정보다 훨씬 많이 일어나는 상황에 적합하다.
판독자-기록자 자물쇠가 쓰기 모드로 잠겨 있을 때에는 그 자물쇠로 보호되는 자료구조에 오직 하나의 스레드만 접근할 수 있으므로 자료구조가 동시적인 수정으로 깨지는 일이 없다.
판독자-기록자 자물쇠가 읽기 모드로 잠겨 있을 때에는 그 자물쇠로 보호되는 자료구조를 여러 스레드가 동시에 읽을 수 있다.
물론 그 스레드들은 먼저 자물쇠를 읽기 모드로 획득해야 한다.
>
판독자-기록자 자물쇠를 공유-독점 자물쇠(shared-exclusive lock)라고 부르기도 한다.
읽기 모드 잠금이 공유 모드에 해당하고 쓰기 모드 잠금이 독점 모드에 해당한다.
>
뮤텍스처럼 판독자-기록자 자물쇠도 먼저 초기화한 후 사용해야 하며, 사용 후에는 반드시 파괴한 후에 관련 메모리를 해제해야 한다.
[^rich-502]

## 함께 읽기

- [[/locking]]
- [[/jargon/mutex]]

## 참고문헌

- UNIX 고급 프로그래밍 [제3판] / 리처드 스티븐스, 스티븐 레이고 공저 / 류광 역 / 퍼스트북 / 인쇄일: 2014년 08월 28일 / 원제: Advanced Programming in the UNIX Environment

## 주석

[^rich-502]: UNIX 고급 프로그래밍. 11.6.4장. 502쪽.
