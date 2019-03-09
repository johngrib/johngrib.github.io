---
layout  : wiki
title   : Vim 공백 문자 조작 설정
summary : 
date    : 2018-10-31 08:32:31 +0900
updated : 2018-10-31 10:00:21 +0900
tag     : vim
toc     : true
public  : true
parent  : Vim
latex   : false
---
* TOC
{:toc}

# set list

* `:set list` 명령을 사용하면 화면에 공백으로만 보이는 다양한 문자들을 **다른 문자**로 대체해 보여주게 된다.
    * `:set list!` 으로 on/off를 토글할 수 있다.
    * `:set nolist` 로 off 할 수 있다.

예를 들어 화면에 출력된 tab과 space는 눈으로 구분할 수 없는데, 이 명령을 사용하면 구분할 수 있게 된다.

`:set list` 명령 실행 전/후를 비교해 보자.

```
// 명령 실행 전
	value : 3  

// 명령 실행 후
^Ivalue : 3  $
```

`^I`는 탭 문자를 의미하며, `$`는 end of line을 의미한다(정규식을 떠올려보자).

그런데 탭과 스페이스를 구분할 수 있게 된 것은 좋지만, 오히려 가독성은 떨어진 것 같다.

좀 더 읽기 쉬운 대체 문자열로 설정해 보자.


## listchars

* `:set list` 설정시 공백 대체 문자를 확인할 수 있다.
* `:set listchars?`를 입력해보면 현재 listchars 설정을 확인할 수 있다.

다음은 listchars 로 설정할 수 있는 문자들이다.

* tab : 탭 문자. `^I`.
* eol : 행의 끝. End Of Line. `<EOL>`.
* space : 스페이스
* trail : trailing space. 행 가장 오른쪽에 공백만 있다면 이것으로 확인할 수 있다.
* extends : `wrap` 설정을 통해 한 줄이 화면을 넘어갔을 때의 표시.
    * 오른쪽으로 더 많은 문자가 있음을 보여준다.
    * 즉, 오른쪽 스크롤 가능 여부를 보여준다.
* precedes : `wrap` 설정을 통해 한 줄이 화면을 넘어갔을 때의 표시.
    * 왼쪽으로 더 많은 문자가 있음을 보여준다.
    * 즉, 왼쪽 스크롤 가능 여부를 보여준다.
* conceal : Vim에서는 이런저런 이유로 의도적으로 보여주지 않는 문자들이 있다.
    * conceal은 이와 관련된 설정이다.
    * 잘 만들어진 플러그인들은 이를 매우 잘 활용한다.
    * 하지만 그렇지 않은 플러그인들은 엄청난 혼란을 일으키곤 한다.
    * 가급적이면 conceal은 건드리지 않는 쪽이 좋다.
* nbsp : non breakable space characcter. 모르는 사람이 없는 문자.

## 설정 예제

나는 .vimrc에 다음과 같이 설정해서 사용하고 있다.

```viml
set list listchars=tab:·\ ,trail:·,extends:>,precedes:<
```

위와 같이 설정하면 다음과 같은 결과가 나온다.

```
// 명령 실행 전
	value : 3  

// 명령 실행 후
· value : 3··
```

탭을 구분할 수 있는 것은 좋은데, 간격이 너무 좁으니 `tabstop`을 `4`로 조정해보자.

```viml
set tabstop=4
set list listchars=tab:·\ ,trail:·,extends:>,precedes:<
```

이제 탭의 길이가 4칸으로 표현된다.

```
// 명령 실행 전
	value : 3  

// 명령 실행 후
·   value : 3··
```

* 왼쪽 인덴팅에 탭이 사용되었는지, 스페이스가 사용되었는지 확인할 수 있다.
* 오른쪽 마지막에 필요 없는 공백 문자가 들어갔는지 확인할 수 있다.

## 색깔 지정

listchars에 색깔을 지정할 수 있다.

다음은 빨간색을 지정한 것이다.

```viml
highlight NonText guifg=#ff0000
highlight SpecialKey guifg=#ff0000
```

편안하게 코딩할 수 있도록, 글자 색과 다르며 다소 연한 색을 쓰는 것이 좋다.

# smarttab, tabstop, softtabstop, expandtab, shiftwidth

* smarttab
    * shiftwidth, tabstop, softtabstop을 참조하여, 탭과 백 스페이스 키의 동작을 보조해준다.
* tabstop
    * 파일의 tab을 스페이스 몇 개로 보여주는지를 설정한다.
    * 약자는 `ts`.
    * 기본값은 `8`.
* softtabstop
    * expandtab이 설정되어 있다면 텍스트 편집중에 tab 키로 softtabstop에 지정된 숫자만큼의 스페이스를 입력해준다.
    * 약자는 `sts`.
* expandtab
    * Insert 모드에서 탭 키를 누르면 탭이 아니라 스페이스를 입력한다.
    * 입력하는 스페이스의 수는 softtabstop에서 지정한 값이다.
    * 탭 키로 sts만큼 스페이스를 입력하고, 백 스페이스로 sts만큼 스페이스를 삭제한다.
    * 스페이스 기반이라도 동작은 탭을 추가하고 삭제할 때와 똑같아서 `set list`를 설정해두지 않으면 구분하기 어렵다.
        * 간격도 착착 맞춰준다.
    * 약자는 `et`
    * `set noexpandtab`으로 off 할 수 있다.
* shiftwidth
    * `<<`, `>>`과 오토 인덴팅의 스페이스 수를 지정한다.

나는 다음과 같이 설정하여 사용하고 있다.

```viml
set tabstop=4 softtabstop=4 shiftwidth=4 expandtab smarttab
```

만약 언어별로 탭/스페이스, 인덴팅 깊이를 구분하고 있다면 다음과 같이 설정하면 된다.

예를 들어 Go 언어를 사용한다면 다음과 같이 설정할 수 있다.

```viml
autocmd FileType go setlocal nolist
autocmd FileType go setlocal tabstop=4 shiftwidth=4 noexpandtab smarttab
```

# retab

* `:retab`을 입력하면 파일 내의 탭을 `tabstop` 만큼의 스페이스로 바꿔준다.
* `:retab 4`를 입력하면 탭을 `4` 스페이스로 바꿔준다.
* visual 모드로 범위를 선택하고 사용하는 쪽이 바람직하다.

# backspace

* 백 스페이스가 지울 수 있는 것과 없는 것을 설정한다.
* 약자는 `bs`.

세 가지 값을 지정할 수 있다.

* indent : 오토 인덴트를 지울 수 있다.
    * 가령 인덴팅에 4개의 스페이스를 사용하고 있다면, 백 스페이스를 한 번 눌러서 인덴팅의 스페이스 4개를 지울 수 있다.
* eol : end of line을 지워서, 두 줄을 하나로 합칠 수 있다.
* start : 행의 시작 지점을 지울 수 있다.
    * eol과 start를 함께 설정하면 백 스페이스로 이번 줄을 다 지우고 나서, 더 누르면 바로 윗줄 제일 오른쪽 글자부터 지우기 시작한다.

나는 다음과 같이 설정하여 사용하고 있다.

```viml
set bs=indent,eol,start
```

