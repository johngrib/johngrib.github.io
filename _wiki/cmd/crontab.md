---
layout  : wiki
title   : crontab
summary : maintain crontab files for individual users
date    : 2023-11-06 22:54:23 +0900
updated : 2023-11-06 23:04:47 +0900
tag     : 
resource: 80/D05BAB-5081-48B9-87D4-BA339B73E70C
toc     : true
public  : true
parent  : [[/cmd]]
latex   : false
---
* TOC
{:toc}

## Examples

```bash
 # crontab 파일을 편집할 수 있도록 열어준다
crontab -e

 # cron 작업 목록을 확인한다
crontab -l
```

## Syntax

`분 시 일 월 요일 명령어` 형식을 사용한다.

```bash
 # 1분마다 ~/script.sh 를 실행한다
* * * * * ~/script.sh

 # 5분마다 ~/script.sh 를 실행한다
*/5 * * * * ~/script.sh

 # 매 시간 5분이 될 때마다(1시간마다) ~/script.sh 를 실행한다
5 * * * * ~/script.sh

 # 매일 오전 9시 30분에 ~/script.sh 를 실행한다
30 9 * * * ~/script.sh

 # 월,화,수,목,금 오전 9시 30분에 ~/script.sh 를 실행한다
30 9 * * 1-5 ~/script.sh

 # 이틀에 한번씩 밤 9시 30분에 ~/script.sh 를 실행한다
30 21 */2 * * ~/script.sh

 # 매달 1일 오전 9시 30분에 ~/script.sh 를 실행한다
30 9 1 * * ~/script.sh

 # 매년 8월 15일 오전 9시 30분에 ~/script.sh 를 실행한다
30 9 15 8 * ~/script.sh

 # 두 달에 한번씩 1일 오전 9시 30분에 ~/script.sh 를 실행한다
30 9 1 */2 * ~/script.sh

 # 월,수,금,일 오전 9시 30분에 ~/script.sh 를 실행한다
30 9 * * 1,3,5,7 ~/script.sh
```

## 추천하는 사이트

- [crontab.guru]( https://crontab.guru/ )

