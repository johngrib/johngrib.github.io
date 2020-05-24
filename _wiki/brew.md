---
layout  : wiki
title   : Homebrew
summary : macOS 용 패키지 관리자. 이름은 Homebrew지만, 명령어는 brew.
date    : 2018-02-12 10:03:46 +0900
updated : 2020-05-06 15:37:19 +0900
tag     : bash mac command
toc     : true
public  : true
parent  : [[command-line]]
latex   : false
---
* TOC
{:toc}

## Installation
```sh
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

## Examples
```sh
 # 패키지 install
brew install ag       # ag 설치

 # 패키지 uninstall
brew uninstall ag     # uninstall ag
```

* 전용 경로 확인하기

```sh
cd /usr/local/Cellar  # brew로 설치한 패키지는 모두 여기에 있다
cd /usr/local         # /usr/local 하위에 있는 bin, sbin 등에 설치한 패키지의 심볼릭 링크가 있다
```

* 내가 설치한 formulae 를 모두 보여준다. 새로운 컴퓨터를 셋팅할 때 이걸 복사해서 사용하면 편리하다.

```sh
brew leaves
```

## Brewfile

```
 # Brewfile 을 자동으로 생성한다
brew bundle dump

 # Brewfile 을 사용해 여러 프로그램을 설치한다
brew bundle

 # ~/path/Brewfile 에 있는 Brewfile을 사용해 여러 프로그램을 설치한다
brew bundle --file=~/path/
```

## 문제 해결
```sh
brew doctor   # 문제 목록을 보여주고, 대응 방법을 알려준다
```

## Links
* [Homebrew - macOS 용 패키지 관리자](https://brew.sh/index_ko.html)


