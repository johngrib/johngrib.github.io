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

## Examples
```sh
 # test로 시작하는 이름을 가진 모든 파일을 찾는다
fd '^test'

 # 확장자가 txt인 모든 파일을 찾는다
fd -e txt

 # test라는 문자열이 이름에 들어간 모든 파일을 지정한 경로에서 찾는다
fd test ./sample
```
