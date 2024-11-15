---
layout  : wiki
title   : crontab
summary : maintain crontab files for individual users
date    : 2023-11-06 22:54:23 +0900
updated : 2024-11-15 18:21:19 +0900
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

## 문제 해결

### .bash_profile 실행이 필요한 경우 {#bash-profile}

`.bash_profile`, `PATH` 등을 사용 환경과 일치시키려면 다음 방법을 사용할 수 있다.

```
* * * * * bash -c 'source ~/.bash_profile && ~/script.sh'
```

하지만 위의 방법이 썩 마음에 들지 않는다면 `SHELL`과 `PATH`를 지정하도록 한다.

```
SHELL=/bin/bash
PATH=/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin
* * * * * ~/script.sh
```

- `SHELL`을 `/bin/bash`로 지정하기 때문에 `~/.bash_profile`을 알아서 `source`한다.

### mail을 끄고 싶은 경우 {#off-mail}

crontab은 실행될 때마다 `/var/mail`로 메일을 보내는데, 가벼운 작업이라면 성가시다.

[[/cmd/chronic]]{chronic}과 명령을 조합하면 실패했을 경우에만 출력이 되므로, 명령이 실패한 경우에만 메일이 발송되도록 할 수 있다.

다음과 같이 실행하려는 명령 앞에 [[/cmd/chronic]]{chronic}을 붙여주면 된다.

```
* * * * * chronic ~/script.sh
```

