---
layout  : wiki
title   : ag
summary : the silver searcher
date    : 2018-12-27 22:01:47 +0900
updated : 2019-11-29 14:02:44 +0900
tag     : bash command
toc     : true
public  : true
parent  : [[command-line]]
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

### 실제 활용한 명령어들

```sh
 # 1개 이상의 공백 문자로만 이루어진 경우를 모두 찾아라
find . -name '*.java' | xargs ag '^\s{1,}$'

 # java 프로젝트 전체에서 중괄호가 생략된 if 문을 찾아라
find . -name '*.java' | xargs ag '^\s*if.*[^\{]\s*$' -A1

 # 100글자가 넘는 라인이 있는 파일의 수를 집계하라
find . -name '*.java' | xargs ag '^.{100}.+$' -l | wc -l

 # import, package 문을 제외하고 100 글자가 넘는 코드를 찾아라
find . -name '*.java' | xargs ag '^(?!(import|package)).{100}'

 # import, package, 주석을 제외하고 100 글자가 넘는 코드를 찾아라
find . -name '*.java' | xargs ag '^(?!(import|package|\s*\*|\s*\/\/|\/\*)).{100}'

 # 와일드 카드(*)를 사용한 모든 java 파일을 탐색하라
find . -name '*.java' | egrep -v '[tT]est.java$' | xargs ag '^\s*import.*\*'

 # 중괄호를 생략한 else 문을 찾아라
find . -name '*.java' | xargs ag '^\s*\b(else)\b|\b(else)\b[^\{]*?$'

 # 앞에 중괄호가 없는 else, catch를 찾아라
ag '^\s*?(else|catch)'

 # 좌우에 스페이스가 없는 = 를 찾아라. 단, +=, -=, == 는 제외한다.
find . -name '*.java' | xargs ag '[^\s<!=+-]=|\=[^=\s]'

 # 좌우에 공백이 없는 -> 를 찾아라
find . -name '*.java' | xargs ag '\-\>(?=\S)|(?<=\S)\-\>'
```

## Links
* [the silver searcher](https://github.com/ggreer/the_silver_searcher )

