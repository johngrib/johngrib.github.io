---
layout  : wiki
title   : CLI 프로그램 탈출방법 모음
summary : 터미널에서는 나도 후디니가 될 수 있다!
date    : 2020-01-25 22:00:51 +0900
updated : 2020-01-25 22:21:33 +0900
tag     : bash command
toc     : true
public  : true
parent  : [[command-line]]
latex   : false
---
* TOC
{:toc}

## 발단

* 종료 방법이 다른 프로그램들이 꽤 많다.
* 종료 방법을 모르겠어서 일일이 여기저기 찾아보는 것도 지겹다.
* 해리 후디니(Harry Houdini)
    * 유명한 탈출 마술의 대가로, 이 문서에 후디니의 이름이 들어가면 재미있는 분위기를 줄 수 있을 것 같아 summary에 넣었다.

## 용어 설명

* `C-x`: `control` + `x`

## 탈출 대상
### vim

* `:q`
* `:q!`
* `:qa`
* `:qa!`
* `:wq`
* `:wq!`
* `:wqa`
* `:x`
* `:xa`
* `ZZ`

이 중에서 내가 가장 자주 쓰는 종료 명령은 `:x` 이다. `:x`는 "변경 사항이 있을 경우 저장하고 종료"한다. `:wq`보다 한 글자 적어서 좋아한다.

### emacs

* `C-x`를 누른 후, `C-c`

내가 알고 있는 유일한 Emacs 종료 명령이다.

### nano

* `C-x`

### ed

* `Q`

### top, less, more

* `q`

### bash

* `exit`

### 대부분의 경우

* `C-c`

