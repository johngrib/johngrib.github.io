---
layout  : wiki
title   : Homebrew
summary : macOS 용 패키지 관리자. 이름은 Homebrew지만, 명령어는 brew.
date    : 2018-02-12 10:03:46 +0900
updated : 2022-07-25 23:01:01 +0900
tag     : bash mac command
toc     : true
public  : true
parent  : [[/cmd]]
latex   : false
---
* TOC
{:toc}

## Installation

<https://brew.sh/index >

```sh
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
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

## brew gem

- <https://github.com/sportngin/brew-gem >
- <https://formulae.brew.sh/formula/brew-gem >

brew-gem은 rubygem을 homebrew formula로 설치해주는 도구인데, gem 도구들을 `/opt/homebrew/bin/`에 설치해주므로 경로 관리가 편리하다.

```sh
# brew-gem 설치
brew install brew-gem
```

bropages 설치를 예로 들어보자. 본래 다음과 같이 설치해야 하지만...

```sh
# bropages 설치
gem install bropages
```

설치를 마친 후에 `gem environment` 명령으로 확인해보면 bropages를 통해 설치한 `bro` 명령이 저 세 경로 중 하나에 있다는 것을 알 수 있다.
경로가 복잡해서 짜증이 난다. 게다가 경로에 버전 넘버까지 있다.

```sh
$ gem environment | ag 'GEM PATHS' -A3
  - GEM PATHS:
     - /opt/homebrew/lib/ruby/gems/3.0.0
     - /Users/user/.gem/ruby/3.0.0
     - /opt/homebrew/Cellar/ruby/3.0.3/lib/ruby/gems/3.0.0
```

경로가 복잡한 건 괜찮은데 문제는 `PATH`를 설정해주지 않으면 명령을 못 찾아서 실행을 못 한다.

그러나 `brew gem` 명령을 사용해 이렇게 설치하면...

```sh
# bropages 설치
brew gem install bropages
```

`/opt/homebrew/bin` 경로가 잡혀서 `PATH` 때문에 짜증나는 일이 없다.

```sh
$ which bro
/opt/homebrew/bin/bro
```

## Links
* [Homebrew - macOS 용 패키지 관리자](https://brew.sh/index_ko.html)


