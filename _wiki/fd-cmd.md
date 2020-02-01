---
layout  : wiki
title   : fd 명령어
summary : 이름으로 파일을 찾아준다
date    : 2019-12-28 17:03:29 +0900
updated : 2019-12-28 17:07:02 +0900
tag     : bash command
toc     : true
public  : true
parent  : [[command-line]]
latex   : false
---
* TOC
{:toc}

## fd
1. Rust 로 작성된 xNIX find 유틸리티
1. 멀티스레드로 검색하므로 find보다 더 빠른 검색 결과(공식 홈페이지 Benchmark 항목 참조).
1. find 명령 옵션 및 사용 방법에 차이점에 있어 완전한 대체는 되지 않으나(80% 정도라고) 훨씬 빠르게 결과 얻을 수 있다.

## Examples
```sh
 # test로 시작하는 이름을 가진 모든 파일을 찾는다
fd '^test'

 # 확장자가 txt인 모든 파일을 찾는다
fd -e txt

 # test라는 문자열이 이름에 들어간 모든 파일을 지정한 경로에서 찾는다
fd test ./sample

 # 일반 파일(regular file) 중 *.py, *.pl 파일만 찾는다
 fd -t f '.*\.py$|.*\.pl$'
 
 # 2019년 하반기에 변경된 일반 파일 찾기
 fd -t f --change-newer-than '2019-07-01 00:00:00' --changed-before '2019-12-31 11:59:59'
```

## Links
1. [fd 공식홈페이지](https://github.com/sharkdp/fd/)
1. [사용예-zetawiki](https://zetawiki.com/wiki/Fd-find)
