---
layout  : wiki
title   : fc 명령어
summary : 명령어 입력/편집, 나열, 재실행 등을 할 수 있다
date    : 2018-08-29 09:22:26 +0900
updated : 2019-01-29 10:50:49 +0900
tag     : bash command
toc     : true
public  : true
parent  : command-line
latex   : false
---
* TOC
{:toc}

# Examples
## 명령어 편집 후 실행
```sh
$ fc    # 기본 편집기(vi)가 열리고, 마지막으로 입력했던 명령어가 나온다. 수정 후 저장하면 실행.
```

## 명령 히스토리 보기
```sh
$ fc -l         # `history | tail` 과 비슷.
$ fc -l 500     # 500번 히스토리부터 가장 최근 히스토리까지.
$ fc -l 500 510 # 500 ~ 510 히스토리.

$ fc -ln -1     # 마지막으로 실행한 명령어를 보기. -ln 옵션을 붙이면 숫자 인덱스 생략.
```

## 재실행

```sh
$ fc -e -       # 마지막 명령어 실행. `!!`과 똑같다.
$ fc -e - 880   # 880번 히스토리 명령어 실행. `!880`과 똑같다.
```

# Links

* [Linux and Unix fc command tutorial with examples(shapeshed.com)](https://shapeshed.com/unix-fc/#what-is-the-fc-command )
