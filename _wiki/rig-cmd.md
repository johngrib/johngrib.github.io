---
layout  : wiki
title   : rig 명령어
summary : 가짜 신원과 주소를 랜덤으로 만들어 준다
date    : 2020-01-05 13:30:42 +0900
updated : 2020-01-06 10:06:43 +0900
tag     : bash command
toc     : true
public  : true
parent  : [[command-line]]
latex   : true
---
* TOC
{:toc}

## 활용

* 프로그램 테스트 용도로 쓰자.
* 게임 캐릭터 이름, 자작 소설/만화 등의 인물 이름으로 써먹을 수 있다.

## Installation
```sh
brew install rig
```

## Examples
```sh
 # 가짜 신원과 주소를 생성한다
rig

 # 도움말을 본다
rig --help

 # 랜덤의 남성 신원과 주소를 생성한다
rig -m

 # 랜덤의 여성 신원과 주소를 생성한다
rig -f

 # 100 개의 랜덤 신원을 생성한다
rig -c 100

 # 자신만의 데이터 파일이 있는 경로를 지정한다
rig -d ~/custom-data/
```

## 데이터 디렉토리

`--help`에서 기본 데이터 디렉토리를 알려준다.

내 컴퓨터에서는 `/usr/local/share/rig`가 기본 데이터 디렉토리다.

* `fnames.idx`: 여성 name 목록. 1000 개의 이름이 있다.
* `mnames.idx`: 남성 name 목록. 1000 개의 이름이 있다.
* `lnames.idx`: last name 목록. 1000 개의 성씨가 있다.
* `locdata.idx`: 주소 목록. 61개 주소가 있다.
* `street.idx`: 거리 목록. 61개 거리가 있다.

이름 조합이 $$1000^3$$ 이고, 주소 조합이 $$61^2$$이므로 똑같은 조합을 얻기 어렵다.

