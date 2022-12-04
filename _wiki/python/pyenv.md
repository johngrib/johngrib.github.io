---
layout  : wiki
title   : pyenv
summary : 
date    : 2022-04-26 21:55:48 +0900
updated : 2022-04-26 22:21:15 +0900
tag     : python
resource: 81/47103F-FF92-4D75-9E4E-DABDBC674DD8
toc     : true
public  : true
parent  : [[/python]]
latex   : false
---
* TOC
{:toc}

<https://github.com/pyenv/pyenv >

## 설치 및 설정

```bash
 # 설치
brew install pyenv

 # 업그레이드
brew upgrade pyenv

 # 버전 확인
pyenv --version
```

이후 `.bash_profile`에 다음과 같이 추가해 주었다.

```bash
if which pyenv > /dev/null; then
    eval "$(pyenv init --path)"
    eval "$(pyenv init -)"
fi
```

## Examples

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

