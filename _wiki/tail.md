---
layout  : wiki
title   : tail 명령어
summary : display the last part of a file
date    : 2019-01-06 23:17:41 +0900
updated : 2020-01-19 21:54:13 +0900
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
 # 마지막 10 줄을 출력한다
tail test.txt
tail -n10 test.txt
tail -n 10 test.txt
tail -10 test.txt
cat test.txt | tail - 10

 # 파일의 마지막 부분을 출력하고, 추가되는대로 계속 출력해준다
tail -f log.txt

 # -F : 파일명이 변경되어도 follow를 유지한다
tail -F log.txt

 # 파일의 처음 10 줄을 제외한 나머지 모두 출력
tail -n +10

 # 역순으로 출력한다
tail -r log.txt
```

* `-r` 옵션은 `-F`, `-f` 옵션과 함께 사용할 수 없다.

