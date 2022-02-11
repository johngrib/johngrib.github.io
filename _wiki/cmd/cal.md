---
layout  : wiki
title   : cal, ncal 명령어
summary : displays a calendar and the date of Easter
date    : 2019-01-06 21:27:09 +0900
updated : 2022-02-11 09:18:25 +0900
tag     : bash command
toc     : true
public  : true
parent  : [[/cmd]]
latex   : false
---
* TOC
{:toc}

## Examples

```sh
 # 도움말을 본다
cal -help
```

```sh
 # 이번달 달력을 본다
cal

 # 2018년의 1월~12월 달력을 본다
cal 2018

 # 2019년 6월의 달력을 본다
cal 06 2019

 # 1월 1일부터 2019년 6월까지 며칠이 지났는지를 보여주는 달력을 본다
cal -j 06 2019

 # 가로/세로가 뒤집힌 달력을 본다
ncal
CAL
Cal

 # 이번달의 2달 전, 3달 후까지의 달력도 함께 본다
cal -B2 -A3
 # 이렇게 써도 똑같다
cal -B 2 -A 3

 # 전, 후 1달을 추가로 본다. (3개 달력 보기)
cal -3
cal -3 10 2019
```

## 1752년 9월

`cal 9 1752`를 입력해 1752년 9월의 달력도 볼 수 있다.

```
$ cal 9 1752
   September 1752
Su Mo Tu We Th Fr Sa
       1  2 14 15 16
17 18 19 20 21 22 23
24 25 26 27 28 29 30
```

