---
layout  : wiki
title   : vim 자동완성 기능 사용하기
summary : abbr, ycm, UltiSnips 사용법
date    : 2018-11-22 23:10:03 +0900
updated : 2018-11-23 09:41:30 +0900
tags    : vim
toc     : true
public  : true
parent  : Vim
latex   : false
---
* TOC
{:toc}

# 요약

이 글은 Vim 기준이며, NeoVim에서는 안 돌아갈 수도 있습니다.

* vim에서 자동완성을 사용하는 방법은 엄청나게 많다.
* 이 글에서는 세 가지 방법을 소개한다.
    * :abbreviate 사용
    * youcompleteme 사용
    * UltiSnips 사용

# :abbreviate

* 축약어(abbreviation)를 등록할 수 있다.
* insert, command-line 모드에서만 작동하는 일종의 자동 완성 기능.
    * `abbr`: insert, command-line 모드 양쪽에서 작동.
    * `iabbr`: insert 모드에서만 작동
    * `cabbr`: command-line 모드에서만 작동
* `:ab`로 써도 작동한다.
    * 이러면 너무 짧아서 헷갈릴 수 있으니 나는 `:abbr`로 사용하고 있다.

## 오타 교정

가장 쉬운 사용 방법은 자신이 자주 내는 오타를 등록해 자동으로 교정되도록 하는 것이다.

```viml
:abbr consolee console
```

위와 같이 설정하면 `consolee.log` 라고 오타를 쳐도 `console.log`로 자동으로 교정된다.

```viml
:abbr coment comment
```

`coment` 이라 썼을 때 `comment`로 교정된다.

## 자동완성으로 활용

눈치가 빠른 사람이라면 위의 예제를 보고 다음 기능을 생각해냈을 것이다.

```viml
:abbr cns console.log()
```

`cns`라 입력하면 `console.log()`가 자동으로 완성된다.

```viml
:abbr cmt /* */
```

`cmt`라 입력하면 `/* */`가 자동으로 완성된다.

## normal 모드를 활용하자

`<Esc>`를 사용하면 normal모드로 들어갈 수 있다.

```viml
:abbr _cmt /* */<Esc>hhi
```

이제 `_cmt`라 입력하면 `/*  */`가 자동으로 완성되고, 커서가 가운데의 스페이스 부분으로 이동해 있다.

* `_cmt` 앞에 `_`를 붙인 이유는 `cmt`를 그냥 작성할 때 멋대로 자동 완성이 되어서 골치아플 수도 있기 때문이다.

이 기능을 사용하면 `import`, `if`, `for` 문과 같은 괄호가 많고 줄바꿈이 있는 형태의 템플릿을 만들어 두고 사용할 수 있다.

* 하지만 abbr을 snippet 용도로 쓰는 것은 별로 추천하지 않는다.
    * abbr은 본래 snippet 자동완성이 아니라 축약어 기능이라는 점에 주의.
    * snippet 용도로 사용하는 것은 UltiSnips쪽이 훨씬 강력하고 `abbr` 특유의 이런저런 짜증나는 문제가 없다.

## 스크립트 실행 기능

`<expr>`을 사용하면 스크립트 실행 결과로 완성해 준다.

다음은 내 vimrc 파일에 넣어두고 사용하고 있는 abbr이다.

```viml
iabbr __email abcd@efgh.com
iabbr <expr> __time strftime("%Y-%m-%d %H:%M:%S")
iabbr <expr> __file expand('%:p')
iabbr <expr> __name expand('%')
iabbr <expr> __pwd expand('%:p:h')
iabbr <expr> __branch system("git rev-parse --abbrev-ref HEAD")
```

하나하나 살펴보자.

* __time
    * vim 내장 함수인 `strftime`을 실행하여 나온 결과(현재 시간)로 완성해 준다.
    * 예: `__time`을 입력하면 `2018-11-23 09:25:07`와 같이 나온다.
* __file
    * vim 내장 함수인 `expand`를 실행하여 나온 결과(현재 편집중인 파일의 전체 경로)로 완성해 준다.
    * 예: `__file`을 입력하면 `/Users/jg/johngrib.github.io/_wiki/vim-auto-completion.md`가 나온다.
* __name, __pwd
    * 뻔하니 생략.
* __branch
    * 현재 git branch를 완성해 준다.

마지막 예제인 `__branch`에서 사용한 `system` 함수에 주목하자.

이걸 쓰면 셸 명령어를 호출해 출력된 결과로 완성할 수 있다.

따라서 `__time`의 `strftime`은 다음과 같이 대체할 수 있다.

```viml
:iabbr <expr> _time system("date '+%Y-%m-%d %H:%M:%S'")
```

`__pwd`는 다음과 같이 대체할 수 있다.

```viml
:iabbr <expr> _pwd system("pwd")
```

당연히 자신이 작성한 셸 스크립트를 실행할 수도 있다.

이를 응용하면 여러 가지 흑마법이 가능하지만, 이 글의 주제는 아니므로 다루지 않는다.
