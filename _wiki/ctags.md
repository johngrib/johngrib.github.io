---
layout  : wiki
title   : ctags 명령어
summary : 소스코드를 분석해 인덱싱 파일을 만든다
date    : 2018-10-03 12:23:12 +0900
updated : 2018-10-03 23:48:53 +0900
tag     : bash vim ctags golang command
toc     : true
public  : true
parent  : command-line
latex   : false
---
* TOC
{:toc}

# ctags?

* ctags는 소스코드를 탐색해 함수명, 변수명, 클래스명, 인터페이스명 등을 수집하고 위치를 기록한 인덱싱 파일(`tags`)을 만들어 주는 도구다.
* 프로젝트 내 변수나 함수가 정의된 곳을 찾아보거나 특정 함수를 호출하는 모든 위치를 조회할 수 있다.
* 다양한 에디터/IDE에서 ctags를 사용한다.
    * Vim에서도 기본적으로 tags 파일을 사용하도록 설정되어 있으며, 관련 기능이 매우 다양하다.
* ctags, Exuberant ctags, Universal ctags 등 종류가 다양하다.

참고: 이 문서에서 다루는 ctags는 **Universal Ctags** 이다.

# Why I use Universal ctags

* Exuberant ctags가 ctags를 대체하기 위해 나온 것이므로 original ctags는 고려하지 않는다.

|              | Exuberant ctags   | Universal ctags   | gotags     |
| ----------   | :---------------: | :---------------: | :------:   |
| 지원 언어 수 | 41                | 101               | 1          |
| 최신 버전    | 2009-07-09        | 2018-09-28        | 2018-02-03 |
| markdown     | X                 | O                 | X          |
| golang       | X                 | O                 | O          |
| customize    | O                 | O                 | ?          |

* Exuberant ctags는 golang, markdown을 쓰려면 [[vim-tagbar-with-markdown]]{커스터마이즈} 해줘야 한다.
* [gotags](https://github.com/jstemmer/gotags )는 golang 에서만 작동한다.
    * 나에게 가장 필요한 종류의 도구는 아니다.
    * gotags는 내 컴퓨터에서 vim-gutentags와 사용할 때마다 제대로 동작하지 않았다. (내 잘못일 수도 있다)
* 중요: [**Drew Neil**도 Universal ctags를 사용한다](https://github.com/universal-ctags/ctags/issues/446 ).

# Install

## Mac

```sh
$ brew install --HEAD universal-ctags/universal-ctags/universal-ctags
```

* 참고: `brew install ctags`로 설치하면 Exuberant Ctags가 설치되므로 주의할 것.

# tags 파일 생성하기

프로젝트 루트 디렉토리에서 다음 명령어를 입력하면 ctags로 tags 파일을 생성할 수 있다.

```sh
$ ctags -R
```

# tags 파일 .gitignore 설정

`.gitignore` 파일에 다음을 추가하면 된다.

```
tags
```

프로젝트 컨벤션에 편집기/IDE 설정을 추가하는 것이 금지되어 있다던가 하는 이유로
`.gitignore` 파일에 `tags`를 추가하기 곤란하다면 `.git/info/exclude` 파일에 추가해 주면 된다.

```sh
$ cd Project-Root-Directory
$ echo 'tags' >> ./.git/info/exclude
```


# vim 에서의 사용

## ctags 사용 vim 명령들

설정 및 수동 실행

* `:set tags?` - tags 파일 위치 설정 확인.
* `:!ctags -R` - tag 생성 명령어를 vim 안에서 실행.

태그 점프

* `ctrl-]` - 현재 커서가 위치한 태그(함수명, 변수명, 클래스명, 인터페이스명...)가 정의된 곳으로 점프.
* `:tag 태그명` - 입력한 태그로 점프. 태그명은 `tab` 자동 완성이 된다.
    * `:tag /정규식`도 가능하다.

태그 목록 기반 점프

* `g ctrl-]` - 같은 태그를 사용하는 코드가 있는 파일 이름과 줄 번호를 목록으로 보여준다.
    * 목록을 보고 선택해 해당 위치로 점프할 수 있다. 숫자, 엔터를 입력하면 된다.
* `:tselect 태그명` - 태그 목록을 본다.
    * 태그명을 생략하면 마지막에 검색한 태그 목록을 보여준다.
    * `tab` 자동완성 가능.
* `:tjump` - `:tselect`와 똑같지만 검색 결과가 하나라면 목록을 보여주지 않고 바로 점프한다.
* `:tnext` - 목록의 다음 태그 위치로 점프.
* `:tprev` - 목록의 이전 태그 위치로 점프.
* `:tfirst` - 목록의 첫 번째 태그 위치로 점프.
* `:tlast` - 목록의 마지막 태그 위치로 점프.

이전 위치로 돌아가기

* `ctrl-t` - 점프 이전 위치로 돌아가기.
    * `:tags` - 태그 점프 기록 stack을 볼 수 있다.
    * `:help tag-stack`

## vim-gutentags 플러그인

* `ctags`는 자동으로 돌아가는 종류의 명령이 아니다.
    * 명령을 실행시켜 주지 않으면 `tags` 파일이 갱신되지 않는다.
* `autocmd`를 사용하여 파일을 저장할 때마다 `tags` 파일이 갱신되도록 설정할 수 있다.

```viml
autocmd BufWritePost * call system("ctags -R")
```

하지만 이렇게 하면 파일을 저장할 때마다 프로젝트 전체를 스캔하므로 프로젝트 크기가 커질수록 딜레이가 길어지는 문제가 있다.

이 문제는 vim-gutentags를 설치하는 것으로 쉽게 해결할 수 있다.

* [vim-gutentags](https://github.com/ludovicchabant/vim-gutentags )
    * vim으로 코드를 편집하는 동안 백그라운드에서 자동으로 `tags` 파일을 갱신한다.
    * `git`을 참고하여 변경된 파일만 갱신하므로 효율적이다.

## tagbar 플러그인

* [tagbar](https://github.com/majutsushi/tagbar )
    * 함수명, 변수명 등의 목록을 정리한 윈도우를 열어준다.
    * tagbar 윈도우에서 함수명, 변수명에 커서를 놓고 엔터를 입력하면 해당 위치로 점프한다.

### tagbar에 markdown 요약 보여주기

[tagbar wiki: markdown](https://github.com/majutsushi/tagbar/wiki#markdown )

tags를 잘 이용하면 tagbar로 md 파일의 요약을 보며 편집하거나 각 섹션으로 쉽게 이동할 수 있다.

* [markdown2ctags](https://github.com/jszakmeister/markdown2ctags )를 받아, `markdown2ctags.py`를 적절한 경로에 복사한다.
* 내 경우에는 vim-plug를 사용하여 `.vimrc`에 다음과 같이 설정하였다.
    * `Plug 'jszakmeister/markdown2ctags', {'do' : 'cp ./markdown2ctags.py ~/markdown2ctags.py'}`
* `.vimrc`에 다음과 코드를 추가한다.

```viml
let g:tagbar_type_markdown = {
    \ 'ctagstype': 'markdown',
    \ 'ctagsbin' : '~/markdown2ctags.py',
    \ 'ctagsargs' : '-f - --sort=yes --sro=»',
    \ 'kinds' : [
        \ 's:sections',
    \ 'i:images'
        \ ],
        \ 'sro' : '»',
        \ 'kind2scope' : { 's' : 'section' },
        \ 'sort': 0,
        \ }
```

* 이후 `.md` 파일을 편집할 때 tagbar를 열어보면 각 섹션의 제목이 목록으로 보이게 된다.
* 목록이 갱신되지 않는다면, `:e`를 입력하여 수동으로 갱신할 수 있다.



# Links

* [Ctags(wikipedia)](https://en.wikipedia.org/wiki/Ctags )
    * [Universal ctags](https://github.com/universal-ctags/ctags )
        * 지원 언어 목록은 `ctags --list-languages`로 확인.
        * [Universal-ctags Hacking Guide](http://docs.ctags.io/en/latest/index.html#universal-ctags-hacking-guide )
    * [Exuberant Ctags](http://ctags.sourceforge.net/ )
        * [지원 언어 목록](http://ctags.sourceforge.net/languages.html )
    * [gotags](https://github.com/jstemmer/gotags )
* [Will universal-ctags replace exuberant-ctags? #446](https://github.com/universal-ctags/ctags/issues/446 ) - Drew Neil이 Universal ctags에 남긴 issue.

---

* [tagbar](https://github.com/majutsushi/tagbar )
    * [tagbar wiki: markdown](https://github.com/majutsushi/tagbar/wiki#markdown )
* [vim-gutentags](https://github.com/ludovicchabant/vim-gutentags )
* [markdown2ctags](https://github.com/jszakmeister/markdown2ctags )

# See also

* [[vim-tagbar-with-markdown]]

