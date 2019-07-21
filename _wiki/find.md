---
layout  : wiki
title   : find 명령어
summary : walk a file hierarchy
date    : 2019-01-13 17:52:34 +0900
updated : 2019-07-21 18:57:21 +0900
tag     : bash command
toc     : true
public  : true
parent  : command-line
latex   : false
---
* TOC
{:toc}

# Examples
## 현재 디렉토리와 그 하위 디렉토리 전체에서 이름이 "README.md"인 파일을 찾는다.
```sh
$ find . -name 'README.md'
```
## 현재 디렉토리와 그 하위 디렉토리 전체에서 이름에 "test"가 들어가는 파일을 찾는다.
```sh
$ find . -name '*test*'
```
## 하위 경로의 빈 디렉토리를 모두 찾아 삭제한다
```sh
$ find . -type d -empty -delete
```

## 하위 경로의 빈 파일을 모두 찾아 삭제한다
```sh
$ find . -type f -empty -delete
```

## 디스크 전체를 뒤져 파일을 찾는다
```sh
$ find / -name 'lostfile.txt' 2>/dev/null
```

## 하위 경로의 CRLF 를 사용하는 모든 파일을 찾는다
```sh
$ find . -not -type d -exec file '{}' ';' | grep CRLF
```

## 이름이 *.temp 인 디렉토리, 파일을 찾아 모두 삭제한다
```sh
$ find . -name '*.temp' -exec rm -rf {} \;
```
