---
layout  : wiki
title   : uptime 명령어
summary : 현재 시간, 시스템 부팅 후 경과된 시간, 로그인 사용자, 시스템 부하율을 보여준다.
date    : 2018-02-06 12:33:02 +0900
updated : 2018-02-06 22:25:08 +0900
tag     : bash command
toc     : true
public  : true
parent  : command-line
latex   : false
---
* TOC
{:toc}

## 개요

>
The uptime utility displays the current time,
the length of time the system has been up, the number of users,
and the load average of the system over the last 1, 5, and 15 minutes.

uptime 명령어는 다음 정보를 보여준다.

* 시스템 부팅 후 경과된 시간.
* 로그인 사용자 수.
* 최근 1, 5, 15분 간의 평균 시스템 부하율.

## 사용 방법

다음 예제와 같이 명령어를 입력하면 된다.

```
$ uptime
12:37  up 3 days, 21:48, 4 users, load averages: 5.88 4.15 3.74
```

예제 실행 결과는 다음과 같이 해석할 수 있다.

* 현재 시간은 12:37 이다.
* 부팅 후 3일 21시간 48분이 경과되었다.
* 4 명의 사용자가 시스템에 로그인한 상태이다.
* 시스템 부하율
    * 최근 1분간의 평균 시스템 부하율은 `5.88`.
    * 최근 5분간의 평균 시스템 부하율은 `4.15`.
    * 최근 15분간의 평균 시스템 부하율은 `3.74`.
    * 시스템 부하율이 올라가는 중이라는 것을 알 수 있다.

## 참고 사항

* 만약 CPU가 2개인 시스템에서 평균 부하가 `1.00` 이라면
    * 두 CPU 중 하나만 항상 작업을 하고 있는 셈[^1]이다.
    * 즉, 50%의 부하를 의미한다.

## 각주

[^1]: [[DevOps-Troubleshooting]]{데브옵스} 18쪽.

