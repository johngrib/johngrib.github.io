---
layout  : wiki
title   : GNU core utilities
summary : GNU 운영체제의 기본 유틸리티 모음
date    : 2023-08-07 21:59:15 +0900
updated : 2023-08-08 21:02:04 +0900
tag     : 
resource: 79/1AC502-8496-4DC1-B88D-DE20B7F6427D
toc     : true
public  : true
parent  : [[/cmd]]
latex   : false
---
* TOC
{:toc}

## 포함된 유틸리티 명령들

[Decoded: GNU coreutils](https://www.maizure.org/projects/decoded-gnu-coreutils/ ) 문서에 의하면 GNU core utilities에는 다음 명령들이 포함되어 있다.

- [[/cmd/arch]], [[/base64]]{base64}, [[/cmd/basename]], cat, chcon
- chgrp, [[/cmd/chmod]], chown, chroot, cksum
- comm, cp, [[/csplit]], [[/cut]], date
- dd, [[/df]], dir, dircolors, dirname
- [[/cmd/du]], [[/cmd/echo]], env, expand, expr
- factor, false, fmt, fold, groups
- head, hostid, hostname, id, install
- join, [[/cmd/kill]], link, [[/cmd/ln]], logname
- [[/cmd/ls]], md5sum, mkdir, mkfifo, mknod
- mktemp, [[/cmd/mv]], nice, nl, nohup
- nproc, numfmt, od, paste, pathchk
- pinky, pr, printenv, printf, ptx
- pwd, readlink, realpath, rm, rmdir
- runcon, [[/cmd/seq]], shred, shuf, sleep
- [[/cmd/sort]], split, stat, stdbuf, stty
- sum, tac, [[/tail]], tee, test
- timeout, touch, [[/cmd/tr]], true, truncate
- tsort, [[/cmd/tty]], [[/cmd/uname]], unexpand, uniq
- unlink, [[/uptime]], users, vdir, wc
- who, whoami, [[/cmd/yes]]

## macOS에서

macOS에서는 [[/cmd/brew]]를 사용해 간단하게 설치할 수 있다.

```bash
brew install coreutils
```

설치한 명령들은 앞에 `g`를 붙이면 사용할 수 있다.

예를 들어 다음과 같다.

- `ls`: `gls`
- `cat`: `gcat`
- `cp`: `gcp`
- `mv`: `gmv`
- ...

## Links

- [Coreutils - GNU core utilities]( https://www.gnu.org/software/coreutils/ )
- [Decoded: GNU coreutils]( https://www.maizure.org/projects/decoded-gnu-coreutils/ )

