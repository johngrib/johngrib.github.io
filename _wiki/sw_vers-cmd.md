---
layout  : wiki
title   : sw_vers 명령어
summary : Mac OS X 의 운영체제 버전 정보를 출력한다
date    : 2020-01-03 22:21:25 +0900
updated : 2020-01-03 22:24:28 +0900
tag     : bash command
toc     : true
public  : true
parent  : [[command-line]]
latex   : false
---
* TOC
{:toc}

## Examples
```sh
$ # 실행하면 다음과 같은 내용이 출력된다
$ sw_vers
ProductName:    Mac OS X
ProductVersion: 10.15.2
BuildVersion:   19C57
```

```sh
 # productName 만 출력한다
sw_vers -productName

 # productVersion 만 출력한다
sw_vers -productVersion

 # buildVersion 만 출력한다
sw_vers -buildVersion
```
