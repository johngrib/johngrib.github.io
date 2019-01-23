---
layout  : wiki
title   : awk
summary : pattern-directed scanning and processing language
date    : 2019-01-23 11:18:43 +0900
updated : 2019-01-23 11:26:56 +0900
tags    : command
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

