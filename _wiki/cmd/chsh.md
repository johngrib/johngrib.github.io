---
layout  : wiki
title   : chsh
summary : change your login shell
date    : 2020-05-07 08:01:50 +0900
updated : 2024-08-12 22:30:49 +0900
tag     : bash command
resource: AE/213528-A967-4B37-8157-C04302668924
toc     : true
public  : true
parent  : [[/cmd]]
latex   : false
---
* TOC
{:toc}

## Examples

```sh
 # 사용자 정보를 보거나 편집한다
chsh

 # 셸을 bash로 변경한다
chsh -s /bin/bash
```

## MacOS의 빌트인 /bin/bash 변경하기 {#chsh-macos-bash}

MacOS의 빌트인 [[/cmd/bash]]{bash(`/bin/bash`)}는 버전이 너무 낮다.

```
$ /bin/bash --version
GNU bash, version 3.2.57(1)-release (arm64-apple-darwin23)
Copyright (C) 2007 Free Software Foundation, Inc.
```

그런데 `brew install bash`로 최신 버전의 bash를 설치해도 자동으로 기본 셸로 적용되지 않는다.


따라서 [[/cmd/brew]]{brew}로 설치한 최신 버전의 bash를 기본 셸로 사용하고 싶다면 다음 과정을 거치도록 한다.

### 1. 경로 확인

먼저 [[/cmd/brew]]{brew}로 설치한 [[/cmd/bash]]{bash}의 경로를 확인한다.

```bash
$ which bash
/opt/homebrew/bin/bash
```

### 2. /etc/shells 파일에 새로운 셸 경로 추가

2\. 1에서 확인한 경로를 `/etc/shells` 파일에 추가해준다.

```bash
$ sudo sh -c 'echo /opt/homebrew/bin/bash >> /etc/shells'
```

(왜 이렇게 하는지는 `/etc/shells` 파일을 읽어보면 주석에 설명이 되어 있다.)

이제 `/etc/shells` 파일을 열어서 추가한 내용이 마지막줄에 잘 들어갔는지 확인한다.

```
$ cat /etc/shells
# List of acceptable shells for chpass(1).
# Ftpd will not allow users to connect who are not using
# one of these shells.

/bin/bash
/bin/csh
/bin/dash
/bin/ksh
/bin/sh
/bin/tcsh
/bin/zsh
/opt/homebrew/bin/bash
```

### 3. chsh로 기본 셸 변경

마지막으로 `chsh` 명령어로 기본 셸을 변경한다.

```bash
chsh -s /opt/homebrew/bin/bash
```

이제 터미널을 새로 열고 `echo $SHELL`로 현재 셸을 확인해보자.

```
$ echo $SHELL
/opt/homebrew/bin/bash
```

버전도 변경된 것을 확인할 수 있다.

```
$ bash --version
GNU bash, version 5.2.32(1)-release (aarch64-apple-darwin23.4.0)
Copyright (C) 2022 Free Software Foundation, Inc.
License GPLv3+: GNU GPL version 3 or later <http://gnu.org/licenses/gpl.html>

This is free software; you are free to change and redistribute it.
There is NO WARRANTY, to the extent permitted by law.
```

