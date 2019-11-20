---
layout  : wiki
title   : ag
summary : the silver searcher
date    : 2018-12-27 22:01:47 +0900
updated : 2019-11-20 21:42:25 +0900
tag     : bash command
toc     : true
public  : true
parent  : command-line
latex   : false
---
* TOC
{:toc}

## Installation
```sh
brew install ag
```

## Examples

```sh
 # test 텍스트를 가진 파일명과 매치된 내용을 보여준다
ag test

 # 검색 결과에서 파일명만 목록으로 보여준다
ag test -l

 # 문자열 test를 가진 모든 파일을 찾아, 파일명과 일치한 숫자 카운트를 보여준다.
ag test -c

 # -A3 : 검색 결과와 일치한 라인 아래로 3줄을 더 보여준다.
 # -B2 : 검색 결과와 일치한 라인 위로 2줄을 더 보여준다.
ag test -A3 -B2

 # 중괄호 없는 if 문을 모두 찾는다
ag '^\s*if.*[^\{]\s*$'

 # 중괄호 없는 if 문을 가진 java 파일을 찾는다
find . -name '*.java' | xargs ag '^\s*if.*[^\{]\s*$' -A1
```

### pager 지정
```sh
 # 검색 결과를 less로 본다.
ag test --pager='less -XRF'
```

* `-X` 옵션을 붙이면 초기화 문자를 보내지 않는다(clear 하지 않는다).
* `-R` 옵션을 붙이면 컬러링된 결과로 볼 수 있다.
* `-F` 옵션을 붙이면 less가 종료되어도 화면이 clear 되지 않는다.


## Links
* [the silver searcher](https://github.com/ggreer/the_silver_searcher )

