---
layout  : wiki
title   : grep 명령어
summary : file pattern searcher
date    : 2018-08-31 13:01:17 +0900
updated : 2018-09-14 17:06:32 +0900
tag     : bash command
toc     : true
public  : true
parent  : command-line
latex   : false
---
* TOC
{:toc}

# syntax

```sh
grep [option] pattern [file]
```

# 사용 예

* 파일에서 내용 찾기

```sh
$ cat test.txt
foobar
foo
bar
baz
qux
quux
quuz
corge

$ # test.txt 파일에서 foo 문자열을 찾는다.
$ grep foo test.txt
foobar
foo
```

* `-v`, `--invert-match`: 일치하지 않는 대상을 찾는다.

```sh
$ grep -v foo test.txt
bar
baz
qux
quux
quuz
corge
```

* `-n`, `--line-number`: 검색 결과에 파일의 라인 넘버를 보여준다.

```sh
$ grep -n foo test.txt 
1:foobar
2:foo
```

* `-c`, `--count`: 검색 결과의 숫자를 센다.

```sh
$ grep -c foo test.txt 
2
```

* `-e`: 정규식 입력을 받는다.
    * `--regexp=pattern`: 긴 명령어는 이렇게 쓴다.

```sh
$ # 아래와 같이 or 검색을 하는 것도 가능하다
$ grep -e foo -e bar test.txt
foobar
foo
bar
```
