---
layout  : wiki
title   : Vim persistent_undo 기능 사용하기
summary : Vim을 재실행해도 undo를 쓸 수 있다
date    : 2018-09-18 16:05:10 +0900
updated : 2022-03-10 21:43:58 +0900
tag     : vim
resource: 8C/60986B-A0AA-4D1B-8F42-5CBE5575C06C
toc     : true
public  : true
parent  : [[/vim]]
latex   : false
---
* TOC
{:toc}

## 개요

* `persistent_undo` 기능을 사용하면 파일별로 undo 히스토리가 남게 된다.
* vim을 종료해도, 컴퓨터를 재부팅해도 undo 히스토리가 있기 때문에 계속해서 undo를 할 수 있다.

## 기능이 있는지 검사하기

* `persistent_undo` 기능을 사용하려면 먼저 기능이 있는지 확인해봐야 한다.

```sh
$ vim --version | grep +persistent_undo
```

검색 결과가 나온다면 `persistent_undo` 기능을 사용할 수 있다.

## 설정하기

다음과 같이 설정하면 된다.

```viml
if has('persistent_undo')
    let s:vimDir = '$HOME/.vim'
    let &runtimepath.=','.s:vimDir
    let s:undoDir = expand(s:vimDir . '/undodir')

    call system('mkdir ' . s:vimDir)
    call system('mkdir ' . s:undoDir)

    let &undodir = s:undoDir
    set undofile
endif
```

* `vimDir`, `undodir`은 자신이 선호하는 경로로 설정하자.

## 함께 읽기

- [[/cmd/grep]]

## Links

* [Using Vim's persistent undo? (stackoverflow.com)](https://stackoverflow.com/questions/5700389/using-vims-persistent-undo )


