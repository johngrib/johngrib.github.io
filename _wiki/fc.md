---
layout  : wiki
title   : fc 명령어
summary : 명령어 입력/편집, 나열, 재실행 등을 할 수 있다
date    : 2018-08-29 09:22:26 +0900
updated : 2018-08-29 09:45:22 +0900
tags    : bash
toc     : true
public  : true
parent  : command-line
latex   : false
---
* TOC
{:toc}

# 사용 예

## 명령어 편집 후 실행

```sh
$ fc
```

* 위와 같이 그냥 `fc`를 입력하면 기본 편집기(일반적으로 vi)가 열리며, 마지막으로 입력했던 명령어가 나와 있다.
* 명령어 편집이 가능하다는 말.
* 저장하고 종료하면 편집한 명령어가 실행된다.
* `set -o vi`에서 `v`로 명령어를 편집하는 것과 비슷하나, 마지막으로 입력한 명령어가 기본으로 표시된다는 점이 다르다.

## 명령 히스토리 보기

```sh
$ fc -l
```

* `-l` 옵션을 주면 `history | tail` 과 비슷한 결과가 나온다.

```sh
$ fc -l 500
```

* 숫자를 지정하면 500번 히스토리부터 가장 최근 히스토리까지를 보여준다.

```sh
$ fc -l 500 510
```

* 500번 히스토리부터 510번 히스토리까지를 보여준다.

```sh
$ fc -ln -1
```

* 이 명령은 마지막으로 실행한 명령어를 보여준다.
* `-ln` 옵션을 주면 목록을 보여주되, 숫자는 보여주지 않는다.
* `-1`은 리스트의 마지막을 의미한다.
* `fc -ln -1 | pbcopy` 등으로 응용 가능.

## 재실행

```sh
$ fc -e -
```

* 마지막 명령어를 실행한다.
* `!!`과 똑같은 기능을 한다.

```sh
$ fc -e - 880
```

* 880번 히스토리 명령어를 실행한다.
* `!880`과 똑같은 기능을 한다.

# Links

* [Linux and Unix fc command tutorial with examples(shapeshed.com)](https://shapeshed.com/unix-fc/#what-is-the-fc-command )
