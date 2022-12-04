---
layout  : wiki
title   : gvm
summary : Go Version Manager
date    : 2022-05-20 00:08:56 +0900
updated : 2022-05-20 00:26:56 +0900
tag     : 
resource: 5D/73CA1A-F031-4A69-9B2C-ABE81F25DA8E
toc     : true
public  : true
parent  : [[/go]]
latex   : false
---
* TOC
{:toc}

<https://github.com/moovweb/gvm >

## Install

```
bash < <(curl -s -S -L https://raw.githubusercontent.com/moovweb/gvm/master/binscripts/gvm-installer)
```

이후, 다음을 `.bashrc` 등에 추가한다.

```bash
[[ -s "$HOME/.gvm/scripts/gvm" ]] && source "$HOME/.gvm/scripts/gvm"
```

## Examples

```bash
 # 버전 확인
gvm version

 # 설치 가능한 go 버전들을 본다
gvm listall

 # go 1.18.2 버전을 설치한다
gvm install go1.18.2

 # 설치되어 있는 go 버전들을 본다
gvm list

 # go 1.18.2 버전을 이 터미널 세션에서 사용한다
gvm use go1.18.2

 # go 1.18.2 버전을 앞으로도 사용한다
gvm use go1.18.2 --default
```
