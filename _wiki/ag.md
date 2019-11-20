---
layout  : wiki
title   : ag
summary : the silver searcher
date    : 2018-12-27 22:01:47 +0900
updated : 2019-11-20 21:32:43 +0900
tag     : bash command
toc     : true
public  : true
parent  : command-line
latex   : false
---
* TOC
{:toc}

# Installation
```sh
$ brew install ag
```

# Examples
## 텍스트 찾기
```sh
$ ag test
```

* 문자열 `test`를 가진 모든 파일의 해당 라인을 찾아 보여준다.
* 파일명, 라인 넘버도 같이 보여준다.

## 파일명 찾기
```sh
$ ag test -l
```

* 문자열 `test`를 가진 모든 파일을 찾아, 파일명을 보여준다.

## 일치한 문자열 카운트
```sh
$ ag test -c
```

* 문자열 `test`를 가진 모든 파일을 찾아, 파일명과 일치한 숫자 카운트를 보여준다.

## pager 지정
```sh
$ ag test --pager='less -XRF'
```

* 이렇게 하면 출력 결과를 `less`로 볼 수 있다.
    * `-R` 옵션을 붙이면 컬러링된 결과로 볼 수 있다.
    * `-X` 옵션을 붙이면 초기화 문자를 보내지 않는다(clear 하지 않는다).
    * `-F` 옵션을 붙이면 less가 종료되어도 화면이 clear 되지 않는다.

## 검색결과 전/후를 함께 보기
```sh
$ ag test -A3 -B2
```

* `-A3` : 검색 결과와 일치한 라인 아래로 3줄을 더 보여준다.
* `-B2` : 검색 결과와 일치한 라인 위로 2줄을 더 보여준다.

## 응용
```sh
$ # 중괄호 없는 if 문을 모두 찾는다
$ ag '^\s*if.*[^\{]\s*$' -A1

$ # 중괄호 없는 if 문을 가진 java 파일을 찾는다
$ find . -name '*.java' | xargs ag '^\s*if.*[^\{]\s*$' -A1
```

# Links
* [the silver searcher](https://github.com/ggreer/the_silver_searcher )

