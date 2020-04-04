---
layout  : wiki
title   : pwgen 명령어
summary : 패스워드를 생성한다
date    : 2019-12-09 20:50:26 +0900
updated : 2019-12-09 20:58:29 +0900
tag     : command bash encryption
toc     : true
public  : true
parent  : [[command-line]]
latex   : false
---
* TOC
{:toc}

## Install
```sh
brew install pwgen
```

## Examples
```sh
 # 패스워드를 여러 개 만든다
pwgen

 # 적어도 하나의 특수문자를 포함하게 한다
pwgen -y

 # 헷갈릴 수 있는 문자(1, l, 0, O 같은)를 제외한다
pwgen -B

 # 24글자의 패스워드를 만든다
pwgen 24

 # 24글자의 패스워드 1개를 만든다
pwgen 24 1
```
