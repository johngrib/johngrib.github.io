---
layout  : wiki
title   : mv 명령어
summary : move files
date    : 2020-04-18 23:08:16 +0900
updated : 2020-04-18 23:14:24 +0900
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
 # a.txt 파일명을 b.txt 로 바꾼다
mv a.txt b.txt
mv {a,b}.txt
mv a.txt !#:1:s/a/b
```
