---
layout  : wiki
title   : youcompleteme를 python3로 구동하기
summary : python2 좀 그만 쓰자
date    : 2018-03-21 22:48:40 +0900
updated : 2018-03-21 23:24:50 +0900
tag     : vim python
toc     : true
public  : true
parent  : Vim
latex   : false
---
* TOC
{:toc}

## 버전 확인

ycm을 python3로 구동하려면 일단 사용하고 있는 Vim이 `python3` 옵션을 갖고 있는지 확인해야 한다.

Vim의 `python` 옵션은 `--version`으로 확인할 수 있다.

```sh
$ vim --version | grep python
+comments          +libcall           +python            +vreplace
+conceal           +linebreak         -python3           +wildignore
```

* `+python`은 `python2` 옵션으로 빌드된 것을 의미한다.
* `-python3`은 `python3` 옵션이 없는 것을 의미한다.

## Vim 빌드

`python3` 옵션이 없으므로 Vim을 새로 빌드해야 한다.

Mac 이라면 `brew`로 쉽게 빌드할 수 있다.

```sh
$ brew remove vim
$ brew cleanup
$ brew install vim --with-python3
```

별 생각 없이 기본 옵션으로 빌드하면 `python2` 옵션이 달려 나오므로 주의해야 한다.

빌드가 끝났을 때 `vim --version`으로 확인해 보면 `python3`가 있을 것이다.

```sh
$ vim --version | grep python
+comments          +libcall           -python            +vreplace
+conceal           +linebreak         +python3           +wildignore
```

## .vimrc 설정

.vimrc에 다음과 같이 ycm이 사용할 python interpreter 경로를 지정해 준다.

```viml
let g:ycm_server_python_interpreter = '/usr/local/bin/python3'
```

python3가 어딨는지 모르겠다면 `which`로 확인하면 된다.

```sh
$ which python3
/usr/local/bin/python3
```

## ycm 빌드

ycm을 빌드하려면 ycm이 설치된 경로에 있는 `install.py`를 실행해야 한다.

ycm이 설치된 경로는 직접 설치했다면 `~/.vim/plugin/youcompleteme`일 것이고, Vim-plug를 사용해 설치했다면 `~/.vim/plugged/youcompleteme`일 것이다. 플러그인 매니저마다 경로가 조금씩 다르긴 한데 어차피 `~/.vim/`에 들어가보면 디렉토리가 몇 개 없어 찾는 것이 어렵진 않다.

ycm이 설치된 경로로 이동했다면 다음과 같이 설치 옵션을 알아보자.

```sh
$ ./install.py --help
usage: build.py [-h] [--clang-completer] [--cs-completer] [--go-completer]
                [--rust-completer] [--js-completer] [--java-completer]
                [--system-boost] [--system-libclang] [--msvc {12,14,15}]
                [--all] [--enable-coverage] [--enable-debug]
                [--build-dir BUILD_DIR] [--quiet] [--skip-build]

optional arguments:
  -h, --help            show this help message and exit
  --clang-completer     Enable C-family semantic completion engine.
  --cs-completer        Enable C# semantic completion engine.
  --go-completer        Enable Go semantic completion engine.
  --rust-completer      Enable Rust semantic completion engine.
  --js-completer        Enable JavaScript semantic completion engine.
  --java-completer      Enable Java semantic completion engine.
(이하 생략)
```

ycm은 Vim을 위한 자동 완성 플러그인이므로, 다음 옵션들이 가장 중요하다.

* `--clang-completer` : 필수. C, C++로 코딩을 안 하더라도 기본으로 설치하면 어지간한 자동완성은 다 된다.
* `--cs-completer` : C# 개발 환경이 갖춰져 있다면 Vim을 쓸까? MS 윈도우가 아니면 빌드가 실패하므로 이 옵션은 넣지 말자.
* `--go-completer` : golang 컴파일러를 먼저 깔아야 한다.
* `--rust-completer` : rust 컴파일러와 cargo를 먼저 깔아야 한다.
* `--js-completer` : JavaScript
* `--java-completer` : IntelliJ와 Vim을 함께 사용한다면 이 옵션은 넣지 말자. Vim에서 Java 파일을 열었을 때 Eclipse 설정 파일과 캐시 파일을 자동으로 생성한다.

필요한 옵션을 확인하고, 옵션에서 요구하는 컴파일러들도 설치했다면 다음과 같이 명령을 실행해주면 된다.

단, 그냥 `install.py`를 실행하면 `python2`로 빌드하는 수가 있으므로 반드시 `python3`로 실행해 주도록 한다.

```sh
$ python3 ./install.py --clang-completer --go-completer --rust-completer --js-completer
```

만약 빌드가 실패한다면, 메시지를 읽어보고 미리 설치하지 않은 컴파일러가 있는지 확인한 다음 해당 컴파일러를 설치하고 재시도하면 된다.

만약 최소한의 필수 기능만 필요하다면 다음과 같이 `--clang-completer`로 빌드하는 것도 방법이다.

```sh
$ python3 ./install.py --clang-completer
```
