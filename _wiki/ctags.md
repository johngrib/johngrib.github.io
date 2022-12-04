---
layout  : wiki
title   : ctags 명령어
summary : 소스코드를 분석해 인덱싱 파일을 만든다
date    : 2018-10-03 12:23:12 +0900
updated : 2022-11-05 10:43:36 +0900
tag     : bash vim ctags golang command clojure vim-syntax-color
resource: 4D/8CF153-8D49-406F-875F-8385D1599361
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
| 최신 버전    | 2009-07-09        | 2022-10-22        | 2018-02-03 |
| 버전업 빈도  |                   | 한 달에 2~3번     |            |
| markdown     | X                 | O                 | X          |
| golang       | X                 | O                 | O          |
| customize    | O                 | O                 | ?          |

* Exuberant ctags는 golang, markdown을 쓰려면 [[vim-tagbar-with-markdown]]{커스터마이즈} 해줘야 한다.
* [gotags](https://github.com/jstemmer/gotags )는 golang 에서만 작동한다.
    * 나에게 가장 필요한 종류의 도구는 아니다.
    * gotags는 내 컴퓨터에서 vim-gutentags와 사용할 때마다 제대로 동작하지 않았다. (내 잘못일 수도 있다)
* 중요: [**Drew Neil**도 Universal ctags를 사용한다](https://github.com/universal-ctags/ctags/issues/446 ).

### 설치되어 있는 ctags 종류 확인하기

다음 명령을 입력해보면 Universal Ctags 인지 Exuberant Ctags 인지 확인할 수 있다.

```sh
ctags --version
```

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

### Clojure

#### Universal ctags를 그대로 사용하는 경우의 문제

Universal ctags는 Clojure 프로그래밍 언어를 지원하지만 다소 허술하다는 문제가 있다.

아마 Clojure를 쓰는 사람들 중 Vim + tagbar를 쓰는 사람의 수가 부족해서 그런 것 같다.

다음은 Universal ctags를 사용해 Clojure tags 파일을 만들고 tagbar를 띄운 화면이다.

![universal ctags와 tagbar를 조합한 모습]( ./clojure-universal-ctags.jpg )

오른쪽의 tagbar를 보면 `defn`으로 정의한 `public` 함수는 있지만, `defn-`로 정의한 `private` 함수는 나타나지 않았다.

그리고 `def` 로 정의한 상수와 `defmacro` 등도 나타나지 않는다.

이건 tagbar의 문제가 아니라 Universal ctags가 `defn`만 수집해서 tags 파일을 만들기 때문에 발생하는 문제이다.

다음은 `ctags chess_board.clj` 명령을 실행해 생성한 tags 파일인데, 마지막 3줄을 보면 `defn`으로 정의한 함수만 태그를 만들었다는 것을 알 수 있다.

```
!_TAG_FILE_FORMAT	2	/extended format; --format=1 will not append ;" to lines/
!_TAG_FILE_SORTED	1	/0=unsorted, 1=sorted, 2=foldcase/
!_TAG_OUTPUT_EXCMD	mixed	/number, pattern, mixed, or combineV2/
!_TAG_OUTPUT_FILESEP	slash	/slash or backslash/
!_TAG_OUTPUT_MODE	u-ctags	/u-ctags or e-ctags/
!_TAG_PATTERN_LENGTH_LIMIT	96	/0 for no limit/
!_TAG_PROC_CWD	/Users/johngrib/Dropbox/project-local/clojure-aoc/	//
!_TAG_PROGRAM_AUTHOR	Universal Ctags Team	//
!_TAG_PROGRAM_NAME	Universal Ctags	/Derived from Exuberant Ctags/
!_TAG_PROGRAM_URL	https://ctags.io/	/official site/
!_TAG_PROGRAM_VERSION	5.9.0	//
initial-board	src/joy_of_clojure/ch1/chess_board.clj	/^(defn initial-board$/;"	f	namespace:joy-of-clojure.ch1.chess-board
joy-of-clojure.ch1.chess-board	src/joy_of_clojure/ch1/chess_board.clj	/^(ns joy-of-clojure.ch1.chess-board$/;"	n
lookup	src/joy_of_clojure/ch1/chess_board.clj	/^(defn lookup$/;"	f	namespace:joy-of-clojure.ch1.chess-board
```

`defn-`를 인식하지 못하는 이유는 [Universal ctags의 parser가 `defn`만 함수로 인식하도록 코딩되어 있기 때문이다]( https://github.com/universal-ctags/ctags/blob/9f5a3ddac16749bb45bedd97ed910413d2af53f4/parsers/clojure.c#L40-L43 ).

```c
static int isFunction (const char *strp)
{
    return (strncmp (++strp, "defn", 4) == 0 && isspace (strp[4]));
}
```

#### 인터넷에서 복사해온 설정이 돌아가게 만들자

다행히 ctags는 설정 파일에서 정규식을 써서 확장이 가능한 구조로 되어 있다.

따라서 누가 미리 작성해 둔 괜찮은 설정 파일만 사용하면 되는데, 인터넷에서 구하기 쉬운 가장 유명한 설정은 다음과 같다.

[xzj/clojure.ctags](https://gist.github.com/xzj/1518834 )

```
--langdef=Clojure
--langmap=Clojure:.clj
--regex-clojure=/\([ \t]*create-ns[ \t]+([-[:alnum:]*+!_:\/.?]+)/\1/n,namespace/
--regex-clojure=/\([ \t]*def[ \t]+([-[:alnum:]*+!_:\/.?]+)/\1/d,definition/
--regex-clojure=/\([ \t]*defn[ \t]+([-[:alnum:]*+!_:\/.?]+)/\1/f,function/
--regex-clojure=/\([ \t]*defn-[ \t]+([-[:alnum:]*+!_:\/.?]+)/\1/p,private function/
--regex-clojure=/\([ \t]*defmacro[ \t]+([-[:alnum:]*+!_:\/.?]+)/\1/m,macro/
--regex-clojure=/\([ \t]*definline[ \t]+([-[:alnum:]*+!_:\/.?]+)/\1/i,inline/
--regex-clojure=/\([ \t]*defmulti[ \t]+([-[:alnum:]*+!_:\/.?]+)/\1/a,multimethod definition/
--regex-clojure=/\([ \t]*defmethod[ \t]+([-[:alnum:]*+!_:\/.?]+)/\1/b,multimethod instance/
--regex-clojure=/\([ \t]*defonce[ \t]+([-[:alnum:]*+!_:\/.?]+)/\1/c,definition (once)/
--regex-clojure=/\([ \t]*defstruct[ \t]+([-[:alnum:]*+!_:\/.?]+)/\1/s,struct/
--regex-clojure=/\([ \t]*intern[ \t]+([-[:alnum:]*+!_:\/.?]+)/\1/v,intern/
--regex-clojure=/\([ \t]*ns[ \t]+([-[:alnum:]*+!_:\/.?]+)/\1/n,namespace/
```

설정을 잘 읽어보면 `defn-`이 `p,private function`으로 설정되어 있어 잘 동작할 것처럼 보인다.

하지만 이 설정은 2011년에 작성된 것으로, 최근의 Universal ctags와 호환되지 않아 돌아가지 않는다.

- `--langdef=Clojure`: Universal ctags는 이제 Clojure를 지원하므로 이렇게 `langdef`를 하면 에러가 발생해 `tags` 파일을 생성하지 못한다.
- 설정 중간에 공백 문자가 있어서 에러가 난다. 공백을 제거해 줘야 한다.
    ```
                                                                             ↓
    --regex-clojure=/\([ \t]*defn-[ \t]+([-[:alnum:]*+!_:\/.?]+)/\1/p,private function/
                                                                                    ↓
    --regex-clojure=/\([ \t]*defmulti[ \t]+([-[:alnum:]*+!_:\/.?]+)/\1/a,multimethod definition/
                                                                                     ↓
    --regex-clojure=/\([ \t]*defmethod[ \t]+([-[:alnum:]*+!_:\/.?]+)/\1/b,multimethod instance/
                                                                                  ↓
    --regex-clojure=/\([ \t]*defonce[ \t]+([-[:alnum:]*+!_:\/.?]+)/\1/c,definition (once)/
    ```

따라서 위의 설정은 다음과 같이 수정해줘야 Universal ctags에서 작동한다.

```
--langmap=Clojure:.clj
--regex-clojure=/\([ \t]*create-ns[ \t]+([-[:alnum:]*+!_:\/.?]+)/\1/n,namespace/
--regex-clojure=/\([ \t]*def[ \t]+([-[:alnum:]*+!_:\/.?]+)/\1/d,definition/
--regex-clojure=/\([ \t]*defn[ \t]+([-[:alnum:]*+!_:\/.?]+)/\1/f,function/
--regex-clojure=/\([ \t]*defn-[ \t]+([-[:alnum:]*+!_:\/.?]+)/\1/p,privateFunction/
--regex-clojure=/\([ \t]*defmacro[ \t]+([-[:alnum:]*+!_:\/.?]+)/\1/m,macro/
--regex-clojure=/\([ \t]*definline[ \t]+([-[:alnum:]*+!_:\/.?]+)/\1/i,inline/
--regex-clojure=/\([ \t]*defmulti[ \t]+([-[:alnum:]*+!_:\/.?]+)/\1/a,multimethodDefinition/
--regex-clojure=/\([ \t]*defmethod[ \t]+([-[:alnum:]*+!_:\/.?]+)/\1/b,multimethodInstance/
--regex-clojure=/\([ \t]*defonce[ \t]+([-[:alnum:]*+!_:\/.?]+)/\1/c,definitionOnce/
--regex-clojure=/\([ \t]*defstruct[ \t]+([-[:alnum:]*+!_:\/.?]+)/\1/s,struct/
--regex-clojure=/\([ \t]*intern[ \t]+([-[:alnum:]*+!_:\/.?]+)/\1/v,intern/
--regex-clojure=/\([ \t]*ns[ \t]+([-[:alnum:]*+!_:\/.?]+)/\1/n,namespace/
```

이제 tags 파일을 재생성해보면 다음과 같이 private 함수에 대한 태그도 생성된다.

```
$ ctags src/joy_of_clojure/ch1/chess_board.clj

$ grep -v '^!' tags
file-component	src/joy_of_clojure/ch1/chess_board.clj	/^(defn- file-component$/;"	p
index	src/joy_of_clojure/ch1/chess_board.clj	/^(defn- index$/;"	p
initial-board	src/joy_of_clojure/ch1/chess_board.clj	/^(defn initial-board$/;"	f
initial-board	src/joy_of_clojure/ch1/chess_board.clj	/^(defn initial-board$/;"	f	namespace:joy-of-clojure.ch1.chess-board
joy-of-clojure.ch1.chess-board	src/joy_of_clojure/ch1/chess_board.clj	/^(ns joy-of-clojure.ch1.chess-board$/;"	n
lookup	src/joy_of_clojure/ch1/chess_board.clj	/^(defn lookup$/;"	f
lookup	src/joy_of_clojure/ch1/chess_board.clj	/^(defn lookup$/;"	f	namespace:joy-of-clojure.ch1.chess-board
rank-component	src/joy_of_clojure/ch1/chess_board.clj	/^(defn- rank-component$/;"	p
``` 

하지만 이번에는 tagbar에서 `p`를 인식하지 못한다는 문제가 있다.
다음과 같이 설정해주면 `p`, `m`, `d` 등을 인식하게 할 수 있다.

```viml
let g:tagbar_type_clojure = {
    \ 'ctagstype' : 'Clojure',
    \ 'sort': 0,
    \ 'kinds' : [
        \ 'n:ns',
        \ 'd:def',
        \ 'p:defn-',
        \ 'f:defn',
        \ 'm:defmacro',
        \ ],
    \}
```

![tagbar 설정을 통해 private 함수가 표시되도록 수정한 모습]( ./clojure-naive-tagbar.jpg )

이번에도 마음에 들지 않는 몇 가지 문제가 있다.

- `def`가 단순하게 설정되어 있어, metadata가 붙은 `def`를 인식하지 못한다.
    ```clojure
    (def ^:dynamic *file-key* "x 좌표 기준" \a)
    (def ^:dynamic *rank-key* "y 좌표 기준" \0)
    ```
- `defn`, `defn-`가 별도의 섹션으로 그룹이 잡힌다. 내가 원하는 건 소스코드에서 정의한 순서대로 나오는 것.
- tagbar에 `defn`이 두 번 중복되어 나타나므로 보기 짜증난다.
- 함수 이름이 `-`로 시작하거나, 함수 이름에 `>`, `<`가 포함되는 경우를 인식하지 못한다. 모두 Clojure에서는 가능한 함수 이름이다.

내가 원하는 형태는 다음 스크린샷 수준으로 중요 정보들이 모두 표시되는 것이다.

![git.c 파일을 tagbar로 본 내용]( ./git-c-tagbar.jpg )

위의 스크린샷은 [git.c]( https://github.com/git/git/blob/master/git.c ) 파일을 tagbar로 본 결과이다.

#### 복사한 거 쓰지 말고 내 취향에 맞게 내가 작성하자

복사해 온 게 더 골치아픈 느낌이다. 그래서 다음과 같이 설정을 직접 작성했다.

```
--langmap=clojure:.clj

--kinddef-clojure=e,expressionAndFunction,expressions_and_functions

--regex-clojure=/\([ \t]*create-ns[ \t]+([-[:alnum:]*+!_:\/.?]+)/\1/n,namespace/
--regex-clojure=/\([ \t]*ns[ \t]+([-[:alnum:]*+!_:\/.?]+)/\1/n,namespace/

--regex-clojure=/\([ \t]*def[ \t]+([-[:alnum:]*+!_<>:\/.?]+)/+D·\1/e/
--regex-clojure=/\([ \t]*def[ \t]+\^:[a-zA-Z0-9]+[ \t]+([-[:alnum:]*+!_<>:\/.?]+)/+D·\1/e/
--regex-clojure=/\([ \t]*defn[ \t]+([-[:alnum:]*+!_<>:\/.?]+)/+F·\1/e/
--regex-clojure=/\([ \t]*defn-[ \t]+([-[:alnum:]*+!_<>:\/.?]+)/-F·\1/e/
--regex-clojure=/\([ \t]*defmacro[ \t]+([-[:alnum:]*+!_<>:\/.?]+)/+M·\1/e/
--regex-clojure=/\(comment[ \t]?/-·comment/e/

--regex-clojure=/^[\{ \t](:[a-zA-Z0-9\/\-]+)/+\1/e/
--regex-clojure=/^[\{ \t]{2}(:[a-zA-Z0-9\/\-]+)/-·\1/e/
```

vim 설정은 다음과 같다.

```viml
let g:tagbar_type_clojure = {
    \ 'ctagstype' : 'Clojure',
    \ 'sort': 0,
    \ 'kinds' : [
        \ 'n:ns',
        \ 'e:form',
        \ ],
    \}
```

이제 tagbar를 띄우면 다음과 같이 나온다.

![access 기호가 포함된 clojure tagbar]( ./clojure-access-symbol.jpg )

- Universal ctags는 이미 Clojure를 language로 인식하고 있으므로 `--langdef=clojure` 처럼 언어를 새로 정의해주면 에러가 발생한다. 따라서 langdef는 생략했다.
- `--kinddef`로 `e`를 정의해 줬다.
- `e`를 써서 모든 코드를 같은 타입으로 인식하게 했으므로 소스코드에서의 상대적 순서가 tagbar에서도 유지된다.
- `public`은 `+`, `private`은 `-`로 시작하게 했다.
- 함수는 `F`, 상수는 `D`, 매크로는 `M`을 붙였다.
- 마지막을 보면 `(comment`도 있어서, 코멘트 위치를 파악해 이동하기에도 좋다.

#### access 추가

`public`, `private` 같은 접근제한자를 추가하고 싶어서 다음과 같이 작성해 보았다.

```
--langmap=clojure:.clj

--kinddef-clojure=e,expressionAndFunction,expressions_and_functions

--_fielddef-clojure=access,accessScope
--fields-clojure=+{access}

--regex-clojure=/\([ \t]*create-ns[ \t]+([-[:alnum:]*+!_:\/.?]+)/\1/n,namespace/
--regex-clojure=/\([ \t]*ns[ \t]+([-[:alnum:]*+!_:\/.?]+)/\1/n,namespace/

 # access로 public, private을 넣어서 접근제어를 쉽게 알 수 있게 한다
--regex-clojure=/^\(def[ \t]+([-[:alnum:]*+!_<>:\/.?]+)/D·\1/e/{_field=access:public}
--regex-clojure=/^\(def[ \t]+\^:[a-zA-Z0-9]+[ \t]+([-[:alnum:]*+!_<>:\/.?]+)/D·\1/e/{_field=access:public}
--regex-clojure=/^\(defn[ \t]+([-[:alnum:]*+!_<>:\/.?]+)/F·\1/e/{_field=access:public}
--regex-clojure=/^\(defn-[ \t]+([-[:alnum:]*+!_<>:\/.?]+)/F·\1/e/{_field=access:private}
--regex-clojure=/^\(defmacro[ \t]+([-[:alnum:]*+!_<>:\/.?]+)/M·\1/e/{_field=access:public}

 # comment
--regex-clojure=/^\(comment[ \t]?/comment/e/{_field=access:private}

 # 인덴팅 있는 def 와 defn 등. 보통 이렇게 안쪽에 있으면 comment 에 포함된 것들.
--regex-clojure=/^[ \t]+\([ \t]*def[ \t]+([-[:alnum:]*+!_<>:\/.?]+)/·D·\1/e/
--regex-clojure=/^[ \t]+\([ \t]*def[ \t]+\^:[a-zA-Z0-9]+[ \t]+([-[:alnum:]*+!_<>:\/.?]+)/·D·\1/e/
--regex-clojure=/^[ \t]+\([ \t]*defn[ \t]+([-[:alnum:]*+!_<>:\/.?]+)/·F·\1/e/
--regex-clojure=/^[ \t]+\([ \t]*defn-[ \t]+([-[:alnum:]*+!_<>:\/.?]+)/·F·\1/e/
--regex-clojure=/^[ \t]+\([ \t]*defmacro[ \t]+([-[:alnum:]*+!_<>:\/.?]+)/·M·\1/e/

 # edn 용
--regex-clojure=/^[\{ \t](:[a-zA-Z0-9\/\-]+)/+\1/e/
--regex-clojure=/^[\{ \t]{2}(:[a-zA-Z0-9\/\-]+)/-·\1/e/
```

이렇게 작성하면 굳이 앞에 `-`, `+`를 넣어주지 않아도 작동한다.

### TODO, FIXME, XXX 보여주기

Clojure 코딩을 할 때 `TODO`, `FIXME`, `XXX`도 보이도록 하면 편할 것 같아서 다음 두 줄을 clojure.ctags 파일에 추가해 주었다.

```
--kinddef-clojure=t,toDo,to_do
--regex-clojure=/; *(TODO|FIXME|XXX):?[ \t]+(.+)$/\1 ✏️  \2/t/
```

그리고 vim 설정 파일에서 `g:tagbar_type_clojure`에 `t:ToDo`를 추가해 주었다.

```viml
"* tagbar 설정
let g:tagbar_type_clojure = {
    \ 'ctagstype' : 'Clojure',
    \ 'sort': 0,
    \ 'kinds' : ['n:ns', 'e:form', 't:ToDo'],
    \}
```

이렇게 하면 tagbar에 다음과 같이 `TODO` 등이 나타나게 된다.

![적용한 모습]( /resource/wiki/ctags/200007646-1686d51b-2b0e-47bc-ad6a-c9182c409e9a.jpg )


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

## 함께 읽기

* [[vim-tagbar-with-markdown]]

