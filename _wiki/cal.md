---
layout  : wiki
title   : cal, ncal
summary : displays a calendar and the date of Easter
date    : 2019-01-06 21:27:09 +0900
updated : 2019-01-06 22:43:06 +0900
tags    : bash
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

## 이번달의 이전, 이후 월의 달력도 함께 본다
```sh
$ cal -B2 -A3
```
