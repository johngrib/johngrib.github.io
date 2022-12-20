---
layout  : wiki
title   : touch
summary : change file access and modification times
date    : 2019-01-13 18:10:46 +0900
updated : 2022-12-20 23:29:03 +0900
tag     : bash command
resource: F0/546F35-303B-466A-83CF-9FB012A9EE68
toc     : true
public  : true
parent  : [[/cmd]]
latex   : false
---
* TOC
{:toc}

## Examples
### test 파일의 생성시간을 1970년 12월 31일 9시 30분 12초로 지정한다
```sh
$ touch -t 197012310930.12 test   # 1970년에 생성된 정보를 가진 파일 생성
$ touch -t 197312310930.12 test   # 마지막으로 수정된 시간을 1973년으로 변경
```

### test 파일이 존재하는 경우에만 touch 명령어 실행
```sh
$ touch -c test     # 존재하는 test 파일의 마지막 수정 시간을 변경
```
