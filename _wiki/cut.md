---
layout  : wiki
title   : cut 명령어
summary : cut out selected portions of each line of a file
date    : 2019-01-15 17:09:24 +0900
updated : 2019-01-15 17:21:17 +0900
tag     : bash command
toc     : true
public  : true
parent  : command-line
latex   : false
---
* TOC
{:toc}

# Examples
## 첫 3 글자를 출력한다
```sh
$ echo 'hello world' | cut -c 1-3
$ echo 'hello world' | cut -c1-3    # 이렇게 붙여도 된다
```

## 3 번째 글자부터 마지막 글자까지 출력한다
```sh
$ echo 'hello world' | cut -c 3-    # 결과는 llo world
```

## 공백을 기준으로 2 번째 필드(f) 를 출력한다
```sh
$ echo 'hello world' | cut -d' ' -f2
```

## 필드 범위 출력
```sh
$ cut -d: -f -4 /etc/passwd     # :를 기준으로 1 ~ 4 번 필드를 출력
$ cut -d: -f 4- /etc/passwd     # :를 기준으로 4 ~ 마지막 필드를 출력
$ cut -d: -f 2-4 /etc/passwd    # :를 기준으로 2 ~ 4 번 필드를 출력
$ cut -d: -f 3,5,8 /etc/passwd  # :를 기준으로 3, 5, 8 번 필드를 출력
```
