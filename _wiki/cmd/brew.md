---
layout  : wiki
title   : Homebrew
summary : macOS 용 패키지 관리자. 이름은 Homebrew지만, 명령어는 brew.
date    : 2018-02-12 10:03:46 +0900
updated : 2022-10-28 22:09:30 +0900
tag     : bash mac command
resource: F4/81FF40-317B-45FF-BF0C-90DB22CB9915
toc     : true
public  : true
parent  : [[/cmd]]
latex   : false
---
* TOC
{:toc}

## Installation

설치 명령은 공식 홈페이지를 참고.

<https://brew.sh/index >

## Examples

### install, uninstall
```sh
 # 패키지 install
brew install ag       # ag 설치

 # 패키지 uninstall
brew uninstall ag     # uninstall ag
```

### upgrade

```sh
 # gh를 최신 버전으로 업그레이드
brew upgrade gh

 # wezterm을 최신 버전으로 업그레이드
brew upgrade --cask wezterm
```

### 전용 경로 확인하기

`--prefix`로 전용 경로를 확인할 수 있다.

```bash
 # macOS ARM 인 경우 (M1을 쓰는 경우)
$ brew --prefix
/opt/homebrew

 # macOS Intel 인 경우
$ brew --prefix
/usr/local
```

ARM 프로세서를 쓰는 경우와 Intel 프로세서를 쓰는 경우의 경로가 다르니 주의할 것.

```sh
cd /usr/local/Cellar  # brew로 설치한 패키지는 모두 여기에 있다
cd /usr/local         # /usr/local 하위에 있는 bin, sbin 등에 설치한 패키지의 심볼릭 링크가 있다
```

### 설치한 formula 모두 보기

```sh
brew leaves
```

## Brewfile

```sh
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


