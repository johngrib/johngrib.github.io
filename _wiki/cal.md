---
layout  : wiki
title   : cal, ncal
summary : displays a calendar and the date of Easter
date    : 2019-01-06 21:27:09 +0900
updated : 2019-01-07 13:05:08 +0900
tag     : bash command
toc     : true
public  : true
parent  : command-line
latex   : false
---
* TOC
{:toc}

# Examples
## 이번달 달력을 본다
```sh
$ cal
```

## 특정 년도의 1월~12월 달력을 본다
```sh
$ cal 2018
```

## 특정 년도, 특정 월의 달력을 본다
```sh
$ cal 06 2019
```

## 1월 1일부터 며칠이 지났는지를 보여주는 달력을 본다
```sh
$ cal -j 06 2019
```

## 가로/세로가 뒤집힌 달력을 본다
```sh
$ ncal
$ CAL
$ Cal
```

## 이번달의 2달 전, 3달 후까지의 달력도 함께 본다
```sh
$ cal -B2 -A3
```

## 전, 후 1달을 추가로 본다. (3개 달력 보기)
```sh
$ cal -3
$ cal -3 10 2019
```
