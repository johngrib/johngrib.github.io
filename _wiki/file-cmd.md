---
layout  : wiki
title   : file 명령어
summary : 파일 타입을 조사한다
date    : 2020-09-03 18:38:21 +0900
updated : 2020-09-03 18:42:09 +0900
tag     : bash command
toc     : true
public  : true
parent  : [[command-line]]
latex   : false
---
* TOC
{:toc}

## Examples

```
$ file .gitignore
.gitignore: ASCII text
```

### 파일 인코딩을 조사할 수 있다
```
$ file test.txt
test.csv: ISO-8859 text, with CRLF line terminators

$ file -I test.txt
test.csv: text/plain; charset=iso-8859-1
```

