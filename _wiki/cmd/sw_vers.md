---
layout  : wiki
title   : sw_vers 명령어
summary : Mac OS X 의 운영체제 버전 정보를 출력한다
date    : 2020-01-03 22:21:25 +0900
updated : 2022-12-28 19:55:47 +0900
tag     : bash command
resource: 06/41D140-153C-4E42-BAEB-EDB4E91CF395
toc     : true
public  : true
parent  : [[/cmd]]
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
