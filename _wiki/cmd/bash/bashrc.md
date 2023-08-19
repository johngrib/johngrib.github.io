---
layout  : wiki
title   : .bashrc
summary : 
date    : 2023-08-19 13:39:25 +0900
updated : 2023-08-19 18:01:07 +0900
tag     : 
resource: BB/4CCA11-5D44-4D64-AF7E-66E22C35676E
toc     : true
public  : true
parent  : [[/cmd/bash]]
latex   : false
---
* TOC
{:toc}

## 공통 시동 파일과 용도

다음은 '유닉스·리눅스 시스템 관리 핸드북'의 일부를 인용한 것이다.

> <div id="table1"></div>
[^handbook-420]

- th
    - 타깃
    - 파일명
    - 전형적 용도
- td
    - 모든 셸
    - .login_conf
    - 사용자별 로그인 기본값의 설정(FreeBSD)
- td
    - sh
    - .profile
    - 검색 경로, 터미널 타입, 환경설정
- td
    - bash
    - .bashrc
    - 
        - 터미널 타입 설정(필요한 경우)
        - biff와 mesg 스위치 설정
- td
    - bash
    - .bash_profile
    - 
        - 환경변수 설정
        - 명령 앨리어스 설정
        - 검색 경로 설정
        - 사용 권한을 제어하는 umask 값 설정
        - 파일명 검색용 CDPATH 설정
        - PS1(프롬프트)과 HISTCONTROL 변수 설정
{:class="table-generate" data-target-id="table1"}

내가 가장 많이 사용하는 macOS 컴퓨터를 기준으로 설명을 보충한다.

- `.login_conf`
    - macOS는 BSD 계열의 UNIX 시스템이긴 하지만, `.login_conf` 파일은 사용하지 않는다.
- `.profile`
    - `.bash_profile` 파일이 없다면 bash는 `.profile` 파일을 읽는다.
    - `.bash_profile` 파일이 있다면 bash는 `.bash_profile` 파일을 읽는다.
- `.bashrc`
    - `rc`는 run command의 약자이다.
    - 터미널 타입 설정: `TERM` 환경변수 같은 것을 말한다.
        - 내 경우에는 `export TERM=xterm-256color` 과 같이 설정한다.
    - 다음 둘은 요즘은 거의 아무도 사용하지 않을 것이다.
        - `biff`: 초기의 UNIX 시스템에서 사용되던 이메일 도착 알림.
        - `mesg`: 다른 사용자가 `write` 명령을 사용해 보내는 메시지를 받을 것인지를 설정.

## 실행 기준과 순서

- `.bash_profile`
    - 로그인 셸이 시작될 때 한 번 실행된다.
    - 예:
        - GUI 세션을 시작.
        - `ssh`로 원격 로그인.
- `.bashrc`
    - 새로운 셸 인스턴스를 시작할 때마다 실행된다.

두 파일의 실행 시점을 파악하기 위해 다음과 같이 `.bash_profile`과 `.bashrc`를 구성해 실험해 보자.

- `.bash_profile`

```bash
#!/usr/bin/env bash

echo '.bash_profile'
```

- `.bashrc`

```bash
echo '.bashrc'
```

이런 상태에서 터미널 에뮬레이터를 실행하거나 터미널의 새 탭을 열면, 터미널 스크린에 다음과 같이 출력된다.

```bash
.bash_profile
```

서브셸 레벨을 확인해보면 `1` 이다.

```bash
$ echo $SHLVL
1
```

이 때 `bash`를 실행하면 `.bashrc`를 읽고 실행한다.

```bash
$ bash
.bashrc

$ echo $SHLVL
2
```

## 내 설정

나는 다음과 같이 설정한다.

- `.bash_profile`
    - 주로 `PATH` 값을 설정하고, `PATH`를 `export` 한다.
    - 마지막에 `.bashrc`를 실행한다.
- `.bashrc`
    - 그 외의 환경변수 설정.
    - `alias` 설정.
    - 잡다한 bash 설정 파일을 for 돌리면서 source.

## 참고문헌

- 유닉스·리눅스 시스템 관리 핸드북 5/e / 에비 네메스, 가스 스나이더, 트렌트 헤인, 벤 웨일리, 댄 맥킨 저 외 2명 / 에이콘출판사 / 발행: 2022년 01월 03일 / 원제: UNIX and Linux System Administration Handbook, 5th Edition

## 주석

[^handbook-420]: 유닉스·리눅스 시스템 관리 핸드북 5/e. 8장. 420쪽.

