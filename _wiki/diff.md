---
layout  : wiki
title   : diff
summary : compare files line by line
date    : 2019-01-11 11:27:49 +0900
updated : 2019-01-11 11:30:51 +0900
tag     : bash command
toc     : true
public  : true
parent  : command-line
latex   : false
---
* TOC
{:toc}

# Examples
## 두 파일의 차이점 비교하기
```sh
$ diff FILE_A FILE_B
```

## 대소문자 무시
```sh
$ diff FILE_A FILE_B -i
```
