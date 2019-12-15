---
layout  : wiki
title   : ykman 명령어
summary : yubikey를 관리한다
date    : 2019-12-15 17:32:45 +0900
updated : 2019-12-15 18:22:57 +0900
tag     : command bash
toc     : true
public  : true
parent  : [[command-line]]
latex   : false
---
* TOC
{:toc}

## Install
```sh
brew install ykman
```

## Examples
```sh
 # 도움말을 본다
ykman --help

 # 연결된 yubikey 목록을 본다
ykman list

 # 연결된 yubikey 중, 시리얼 번호가 0123456 인 yubikey의 정보를 본다
ykman --device 0123456 info
```

## Links

* [YubiKey Manager CLI](https://developers.yubico.com/yubikey-manager/ )
