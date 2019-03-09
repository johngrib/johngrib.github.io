---
layout  : wiki
title   : phpbrew
summary : Brew & manage PHP versions in pure PHP at HOME
date    : 2019-01-08 15:43:24 +0900
updated : 2019-01-08 22:43:54 +0900
tag     : php command
toc     : true
public  : true
parent  : command-line
latex   : false
---
* TOC
{:toc}

# Installation
```sh
$ curl -L -O https://github.com/phpbrew/phpbrew/raw/master/phpbrew
$ chmod +x phpbrew
$ sudo mv phpbrew /usr/local/bin/phpbrew
$ phpbrew init
$ echo "[[ -e ~/.phpbrew/bashrc ]] && source ~/.phpbrew/bashrc" >> ~/.bashrc
$ source ~/.phpbrew/bashrc
```

# Examples
## 설치 가능한 버전 목록을 본다
```sh
$ phpbrew known
$ phpbrew known --more  # 마이너 버전 포함
$ phpbrew known --old   # 5.4 이하 버전 포함
```

## 정보 업데이트
```sh
$ phpbrew update
$ phpbrew update --old  # 5.4 이하 버전 포함
```

## 설치 가능한 버전 목록
```sh
$ phpbrew variants
```

## 버전별 php 설치
```sh
$ phpbrew install 7.3 +default      # 7.3 버전 설치(with default variant)
$ phpbrew install 5.4.0             # 5.4.0 버전 설치
```

### 설치중 BZip2 오류가 발생할 경우 다음과 같이 설치해볼 것
```sh
$ brew install bzip2
$ brew install zlib
$ phpbrew install 7.2.10 +default +bz2=/usr/local/Cellar/bzip2/1.0.6_1 +zlib=/usr/local/Cellar/zlib/1.2.11
```

## Cleaning up build directory
```sh
$ phpbrew clean php-5.4.0
```

## 버전 선택하기
```sh
$ phpbrew use 5.4.22    # 일시적으로 버전을 선택한다
$ phpbrew switch 5.4.18 # default version을 선택한다.
```

## Turn Off
```sh
$ phpbrew off
```

## 설치된 php 목록 확인하기
```sh
$ phpbrew list
```

# Links
* <https://github.com/phpbrew/phpbrew >
