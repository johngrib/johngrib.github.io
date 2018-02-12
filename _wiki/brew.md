---
layout  : wiki
title   : Homebrew
summary : macOS 용 패키지 관리자. 이름은 Homebrew지만, 명령어는 brew.
date    : 2018-02-12 10:03:46 +0900
updated : 2018-02-12 10:11:46 +0900
tags    : bash mac
toc     : true
public  : true
parent  : command-line
latex   : false
---
* TOC
{:toc}

## 개요

mac 터미널에서 사용할 수 있는 편리한 패키지 관리자.

## 문제 해결

### ~ is not writable 문제

새 맥북으로 옮겨가고 나서, 이런 저런 자잘한 문제가 많았다.

이 문제는 그 문제들 중의 하나였다.

`brew link` 명령어를 사용하는데 다음과 같은 에러가 발생했다.

```
$ brew link jq
Linking /usr/local/Cellar/jq/1.5_2... 
Error: Could not symlink include/jq.h
/usr/local/include is not writable.
```

이 때 `brew doctor`를 실행해보니 다음과 같은 경고문이 나오는 것을 볼 수 있었다.

```
$ brew doctor
Please note that these warnings are just used to help the Homebrew maintainers
with debugging if you file an issue. If everything you use Homebrew for is
working fine: please don't worry or file an issue; just ignore this. Thanks!

Warning: The following directories are not writable:
/usr/local/include

This can happen if you "sudo make install" software that isn't managed
by Homebrew. If a formula tries to write a file to this directory, the
install will fail during the link step.

You should change the ownership of these directories to your account.
  sudo chown -R $(whoami) /usr/local/include

(이후 생략)
```

`/usr/local/include` 에 쓰기 금지가 되어 있으므로, 권한을 주어 해결할 수 있다는 말이다.

doctor의 권고에 따라 다음 명령어로 해결할 수 있었다.

```
$ sudo chown -R $(whoami) /usr/local/include
```


## Links

* [Homebrew - macOS 용 패키지 관리자](https://brew.sh/index_ko.html)
