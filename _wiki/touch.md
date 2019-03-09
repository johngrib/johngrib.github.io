---
layout  : wiki
title   : touch 명령어
summary : change file access and modification times
date    : 2019-01-13 18:10:46 +0900
updated : 2019-01-13 18:22:50 +0900
tag     : bash command
toc     : true
public  : true
parent  : command-line
latex   : false
---
* TOC
{:toc}

# Examples
## test 파일의 생성시간을 1970년 12월 31일 9시 30분 12초로 지정한다
```sh
$ touch -t 197012310930.12 test   # 1970년에 생성된 정보를 가진 파일 생성
$ touch -t 197312310930.12 test   # 마지막으로 수정된 시간을 1973년으로 변경
```

## test 파일이 존재하는 경우에만 touch 명령어 실행
```sh
$ touch -c test     # 존재하는 test 파일의 마지막 수정 시간을 변경
```
