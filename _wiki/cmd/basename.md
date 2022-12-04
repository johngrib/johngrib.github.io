---
layout  : wiki
title   : basename 명령어
summary : 주어진 경로에서 파일명만 추출한다
date    : 2019-12-30 22:22:03 +0900
updated : 2022-10-15 11:00:03 +0900
tag     : bash command
resource: 9A/DBE3FA-5A1F-4715-8027-D14BEA9130C1
toc     : true
public  : true
parent  : [[/cmd]]
latex   : false
---
* TOC
{:toc}

## Examples
```sh
 # 실행 결과는 johngrib.github.io
basename /Users/johngrib/johngrib.github.io

 # 실행 결과는 test
basename -s .js /Users/johngrib/johngrib.github.io/test.js
```

