---
layout  : wiki
title   : ctags 명령어
summary : 소스코드를 분석해 인덱싱 파일을 만든다
date    : 2018-10-03 12:23:12 +0900
updated : 2022-05-22 14:35:10 +0900
tag     : bash vim ctags golang command
toc     : true
public  : true
parent  : [[cmd]]
latex   : false
---
* TOC
{:toc}

## ctags?

* ctags는 소스코드를 탐색해 함수명, 변수명, 클래스명, 인터페이스명 등을 수집하고 위치를 기록한 인덱싱 파일(`tags`)을 만들어 주는 도구다.
* 프로젝트 내 변수나 함수가 정의된 곳을 찾아보거나 특정 함수를 호출하는 모든 위치를 조회할 수 있다.
* 다양한 에디터/IDE에서 ctags를 사용한다.
    * Vim에서도 기본적으로 tags 파일을 사용하도록 설정되어 있으며, 관련 기능이 매우 다양하다.
* ctags, Exuberant ctags, Universal ctags 등 종류가 다양하다.

참고: 이 문서에서 다루는 ctags는 **Universal Ctags** 이다.

## Why I use Universal ctags

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

## Install

### Mac

```sh
$ brew install --HEAD universal-ctags/universal-ctags/universal-ctags
```

* 참고: `brew install ctags`로 설치하면 Exuberant Ctags가 설치되므로 주의할 것.

## tags 파일 생성하기

프로젝트 루트 디렉토리에서 다음 명령어를 입력하면 ctags로 tags 파일을 생성할 수 있다.

```sh
$ ctags -R
```

## tags 파일 .gitignore 설정

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


## vim 에서의 사용

### ctags 사용 vim 명령들

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

### vim-gutentags 플러그인

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

### tagbar 플러그인

* [tagbar](https://github.com/majutsushi/tagbar )
    * 함수명, 변수명 등의 목록을 정리한 윈도우를 열어준다.
    * tagbar 윈도우에서 함수명, 변수명에 커서를 놓고 엔터를 입력하면 해당 위치로 점프한다.

#### tagbar에 markdown 요약 보여주기

## 활용 사례

### 새로운 언어 vimwiki 정의하고 tagbar에 보여주기

Universal ctags는 vimwiki의 `.md` 확장자를 갖는 파일을 markdown 언어로 인식하여 자동으로 tagbar에 인덱스를 만들어 준다.

![Universal ctags가 만들어준 vimwiki 인덱스]( ./tagbar-vimwiki-ugly.jpg )

그런데 몇 가지 문제가 있다.

- 더 심플하게 보고 싶다.
    - `section`, `subsection` 같은 타입 표시는 나에게는 필요없다.
    - fold 기능도 필요없다.
- 문서에 실시간으로 새로운 섹션을 추가해도 곧바로 인덱스에 추가되지 않는다.
    - `:e`를 입력해야 반영된다. 이게 엄청 귀찮다.

이에 대한 해결책으로 `vimwiki`를 Universal ctags가 인식하는 새로운 언어로 등록해보자.

일단 알아둬야 할 것은 [Universal ctags가 설정 파일로 `~/.ctags`를 사용하지 않는다는 것]( https://github.com/universal-ctags/ctags#differences-from-exuberant-ctags )이다.

`~/.ctags.d/vimwiki.ctags` 파일을 만들고 다음과 같이 내용을 작성한다.

```
--langdef=vimwiki
--langmap=vimwiki:.md
--regex-vimwiki=/^(##+[ \t]+.*)/\1/h,heading,headings/
```

그리고 `.vimrc`에 다음과 같이 `vimwiki` 언어를 `tagbar`가 인식할 수 있도록 설정해 준다.

```viml
let g:tagbar_type_vimwiki = {
    \ 'ctagstype' : 'vimwiki',
    \ 'sort': 0,
    \ 'kinds' : [
        \ 'h:Heading'
    \ ]
\ }
``` 

그러면 다음과 같이 더 단순한 모습의 tagbar를 볼 수 있다.
이 방식을 사용하면 파일을 저장할 때마다 tagbar가 자동으로 갱신되므로 더 편리하다.

![심플한 태그바가 나온 모습]( ./tagbar-vimwiki-simple.jpg )

#### tagbar에 표시되는 목차 꾸미기

위와 같이 설정해도 잘 돌아가지만 `#`가 반복적으로 나타나는 것이 눈에 거슬린다.

따라서 [~/.ctags.d/vimwiki.ctags]( https://github.com/johngrib/dotfiles/blob/d63403b802d922aa5ea064267083fc851e588de7/.ctags.d/vimwiki.ctags ) 파일을 다음과 같이 수정해 주었다.

```
--langdef=vimwiki
--langmap=vimwiki:.md

--kinddef-vimwiki=t,subTitle,sub_title

--regex-vimwiki=/^## (.+)/\1/t/
--regex-vimwiki=/^### (.+)/·\1/t/
--regex-vimwiki=/^#### (.+)/··\1/t/
--regex-vimwiki=/^##### (.+)/···\1/t/
--regex-vimwiki=/^###### (.+)/····\1/t/
--regex-vimwiki=/^####### (.+)/·····\1/t/
--regex-vimwiki=/^######## (.+)/······\1/t/
--regex-vimwiki=/^######### (.+)/·······\1/t/
```

전에 쓰던 `headings`는 Universal ctags가 이미 쓰고 있어서 굳이 다시 쓰지 않기로 했다.

그래서 `--kinddef`를 사용해 `t` 라는 새로운 타입을 정의했다. (참고: [Regex control flags]( https://docs.ctags.io/en/latest/optlib.html#regex-control-flags ))

```
                  ↓
--kinddef-vimwiki=t,subTitle,sub_title
```

각 항목이 `##`, `###` 로 시작하는 것이 보기 싫었으므로 `·`로 표시되도록 설정했다.

```
                             ↓↓↓
--regex-vimwiki=/^##### (.+)/···\1/t/
```

tagbar 에서 `·`가 잘 안보이는 색(회색)으로 표시되도록 `set-tagbar.vim` 파일에 다음 내용을 추가해 주었다.

```viml
augroup tagbar_custom_color
    autocmd FileType tagbar syntax match tagbar_ignore_char /·/
    autocmd FileType tagbar hi def link tagbar_ignore_char Comment
augroup END
```

그리고 tagbar에 `t` 타입이 표시되도록 했다.

```viml
let g:tagbar_type_vimwiki = {
    \ 'ctagstype' : 'vimwiki',
    \ 'sort': 0,
    \ 'kinds' : [
        \ 't:목차'
    \ ]
\ }
```

다음은 이 설정을 적용한 tagbar의 모습이다.

![완성된 간략화된 vimwiki tagbar의 모습]( ./grey-dot-vimwiki.jpg )


### Deprecated: tagbar에 마크다운 요약 보여주기

>
이 방법은 Universal ctags가 markdown 언어를 지원하지 않았던 때의 해결책이다.
>
Universal ctags는 2019년 10월 22일부터 markdown 언어를 지원한다.

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

## 참고문헌

[Ctags(wikipedia)](https://en.wikipedia.org/wiki/Ctags )

- [Universal ctags](https://github.com/universal-ctags/ctags )
    - [Extending ctags with Regex parser (optlib)]( https://docs.ctags.io/en/latest/optlib.html# ) - Universal Ctags 공식 문서
        - 지원 언어 목록은 `ctags --list-languages`로 확인.
        - [Universal-ctags Hacking Guide](http://docs.ctags.io/en/latest/index.html#universal-ctags-hacking-guide )
- [Exuberant Ctags](http://ctags.sourceforge.net/ )
    - [지원 언어 목록](http://ctags.sourceforge.net/languages.html )
- [gotags](https://github.com/jstemmer/gotags )
- [Will universal-ctags replace exuberant-ctags? #446](https://github.com/universal-ctags/ctags/issues/446 ) - Drew Neil이 Universal ctags에 남긴 issue.

[tagbar](https://github.com/majutsushi/tagbar )

* [tagbar wiki: markdown](https://github.com/majutsushi/tagbar/wiki#markdown )
* [vim-gutentags](https://github.com/ludovicchabant/vim-gutentags )
* [markdown2ctags](https://github.com/jszakmeister/markdown2ctags )

## See also

* [[vim-tagbar-with-markdown]]

