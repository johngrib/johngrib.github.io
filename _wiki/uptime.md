---
layout  : wiki
title   : uptime 명령어
summary : 현재 시간, 시스템 부팅 후 경과된 시간, 로그인 사용자, 시스템 부하율을 보여준다.
date    : 2018-02-06 12:33:02 +0900
updated : 2018-02-06 12:46:04 +0900
tags    : bash
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

```
$ uptime
12:37  up 3 days, 21:48, 4 users, load averages: 5.88 4.15 3.74
```

* 현재 시간은 12:37 이다.
* 부팅 후 3일 21시간 48분이 경과되었다.
* 4 명의 사용자가 시스템에 로그인한 상태이다.
* 최근 1분간의 평균 시스템 부하율은 `5.88`.
* 최근 5분간의 평균 시스템 부하율은 `4.15`.
* 최근 15분간의 평균 시스템 부하율은 `3.74`.



