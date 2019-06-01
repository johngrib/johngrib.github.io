---
layout  : wiki
title   : awk
summary : pattern-directed scanning and processing language
date    : 2019-01-23 11:18:43 +0900
updated : 2019-06-01 11:11:05 +0900
tag     : command
toc     : true
public  : true
parent  : programming-language
latex   : false
---
* TOC
{:toc}

# Examples
## sum 구하기
```sh
$ awk '{s+=$1} END {print s}' test.txt  # ' 를 "로 쓰지 않도록 주의한다
```

## 마지막 필드 출력하기
```sh
$ awk '{print $NF}'
```

## 중복된 라인 제거하기
```sh
$ awk '!strmap[$0]++' test.txt
```
* uniq는 인접한 중복 값들만 제거하지만, 이 방법을 쓰면 파일 전체에서 중복 값을 제거한다.
