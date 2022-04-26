---
layout  : wiki
title   : pyenv
summary : 
date    : 2022-04-26 21:55:48 +0900
updated : 2022-04-26 22:19:53 +0900
tag     : python
toc     : true
public  : true
parent  : [[/python]]
latex   : false
---
* TOC
{:toc}

<https://github.com/pyenv/pyenv >

## Examples

```bash
 # 설치
brew install pyenv

 # 업그레이드
brew upgrade pyenv

 # 버전 확인
pyenv --version
```

```bash
 # 설치 가능한 버전 확인
pyenv install --list

 # 3.10.3 버전 설치
pyenv install 3.10.3

 # 3.10.3 버전을 사용한다
pyenv global 3.10.3

 # 3.10.3 버전 삭제
pyenv uninstall 3.10.3

 # 설치된 버전들 확인
pyenv versions
```

