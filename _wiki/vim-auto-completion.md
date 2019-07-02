---
layout  : wiki
title   : vim 자동완성 기능 사용하기
summary : vim을 똑똑하게 사용하자
date    : 2018-11-22 23:10:03 +0900
updated : 2019-07-02 11:38:06 +0900
tag     : vim
toc     : true
public  : true
parent  : Vim
latex   : false
---
* TOC
{:toc}

# 요약

* vim에서 자동완성을 사용하는 방법은 엄청나게 많다.
* 이 글에서는 네 가지 방법을 소개한다.
    * &lt;C-p&gt;, &lt;C-n&gt; 사용
        * vim의 기본 자동완성이며, 어떤 플러그인도 없는 기본 vim에서도 사용할 수 있다.
    * &lt;C-x&gt; 사용
        * 이 기능은 서버의 설정 파일을 수정하는 데에만 vim을 쓰는 사람에게 특히 유용할 것이다.
    * :abbreviate 사용
        * vim의 기본 자동완성이며, 어떤 플러그인도 없는 기본 vim에서도 사용할 수 있다.
        * 평범한 자동완성으로도 사용할 수 있을 뿐만 아니라, 셸 스크립트도 실행할 수 있다.
    * youcompleteme + UltiSnips 사용
        * 자신만의 snippet 파일을 만들어가며 점점 더 편해지는 즐거움이 있다.
        * 셸 스크립트를 실행할 수 있으며, python 코드도 돌아가기 때문에 자유도가 높다.

# &lt;C-p&gt;, &lt;C-n&gt;

Vim의 기본 자동완성이라 할 수 있다.

* `<C-p>`: ctrl + p 를 의미한다.
* `<C-n>`: ctrl + n 을 의미한다.

insert 모드에서 `<C-p>` 또는 `<C-n>`을 입력하면, `complete`옵션에서 지정한 위치의 키워드를 기반으로 자동완성해준다.

* IDE의 자동완성과는 다르게, 주석이나 문자열 안에 있는 단어들도 모두 찾아준다.
* 보통은 아무런 설정 없이 insert 모드에서 `<C-p>`, `<C-n>` 만 눌러도 vim의 단어 완성을 사용할 수 있다.
    * 더 자세히 알고 싶지 않다면 아래의 `complete` 옵션은 읽지 않아도 좋다.

## complete 옵션

다음 명령으로 내 `complete`가 어떻게 설정되어 있는지 확인할 수 있다.

```viml
:set complete?
```

나는 다음과 같이 설정되어 있는데, 내가 직접 한 건 아니고 ycm 등이 자동으로 설정해준 것 같다.

```
complete=.,w,b,u,t,i
```

* `.`: 현재 편집중인 버퍼의 모든 단어를 자동완성 소스로 사용한다.
* `w`: vim에 현재 열려 있는 window들의 모든 단어를 사용한다.
* `b`: 버퍼 리스트에 있고 로드된 버퍼들의 모든 단어를 사용한다.
* `u`: 버퍼 리스트에 있고 로드되지 않은 버퍼들의 모든 단어를 사용한다.
* `t`: tag completion을 사용한다. ctags를 사용한다면 당연한 설정.
* `i`: 현재 파일과 include된 파일의 단어를 사용한다.

자세한 내용은 `:help complete`로 확인.

# &lt;C-x&gt;

* ctrl + x 입력.

insert 모드에서만 지원하는 자동완성 기능이다.

10가지 이상의 기능이 있지만 내가 자주 쓰는 두 가지만 나열해 본다.

* `<C-x><C-l>` : 라인 단위 자동 완성. 단어 완성이 아니라 줄 전체를 완성해 준다.
* `<C-x><C-f>` : 파일명, 경로 자동완성. vim을 즐겨 쓰지 않는 사람이라도 이 기능은 유용할 것이다.
    * 설정파일을 수정하는 데에만 vim을 쓴다면 특히 이 기능은 유용하다.
    * 예를 들어 `~/` 를 쓰고 ctrl+x ctrl-f 를 입력하면, home 경로의 파일들 (.bashrc 등등) 이름이 자동완성된다.

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

## vim 스크립트 실행 기능

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

## shell 스크립트 실행 기능

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

셸 스크립트 뿐만이 아니라 자신이 좋아하는 프로그래밍 언어로 작성한 도구를 호출해 사용할 수도 있다.

이를 응용하면 여러 가지 흑마법이 가능하지만, 이 글의 주제는 아니므로 다루지 않는다.

# 자동완성 플러그인 사용하기

이 글에서는 다음의 세 플러그인을 다룬다.

* youcompleteme
* coc.nvim
* UltiSnips

나는 2019년 6월 이전까지는 youcompleteme + UltiSnips 조합으로 사용해왔으나,
그 이후로는 coc.nvim + UltiSnips 조합으로만 사용하고 있다.

## youcompleteme + UltiSnips

ycm과 UltiSnips를 활용하면 편리한 자동완성 환경을 갖출 수 있다.

### ycm 설치

경험상 ycm을 문제 없이 설치하려면 다음과 같이 해야 했다.

* vim 설치시 `--with-python3` 옵션을 준다.
    * 요즘은 디폴트 옵션이 되어서, 이제 저 옵션을 생략해도 된다.
* 자동 완성 기능을 사용할 언어의 컴파일러를 각각 설치한다. (특히 새 컴퓨터에서 주의)
* ycm 플러그인 설치 후 `python3`를 사용해 ycm의 `install.py`를 실행한다.
    * 반드시 주로 사용하는 언어를 옵션으로 지정해 준다.
        * 언어 옵션은 `python3 ./install.py --help`로 확인할 수 있다.
    * vim-plug를 사용하면 이 귀찮은 작업을 간편하게 자동화할 수 있다.
    * vim-plug는 vim 플러그인을 clone만 하지 않고, 지정한 셸 명령을 실행해 주기 때문이다.

경험상 ycm은 그냥 설치하지 말고, 자신이 주로 사용하는 언어의 completer를 옵션으로 줘야 문제 없이 잘 설치되는 것 같다.

* 단, youcompleteme의 java 지원은 별로다.
    * `--java-completer`는 사용하지 않기를 권장한다.

다음은 내 ycm 플러그인 설치 설정이다. 플러그인 관리자는 vim-plug.

```viml
Plug 'valloric/youcompleteme', { 'do': 'python3 ./install.py --clang-completer --go-completer --rust-completer --js-completer'}
```

만약 vim-plug를 사용하지 않거나, 다른 문제가 있다면 youcompleteme가 설치된 경로(~/.vim 의 하위 디렉토리를 찾아볼 것)로 찾아 들어가 명령어를 입력해 수동으로 설치한다.

다음은 내가 사용하는 설치 명령어이다.

```sh
$ python3 ./install.py --clang-completer --go-completer --rust-completer --js-completer
```


### ycm 설정

다음은 나의 ycm 설정 전체이다.

```viml
let g:ycm_key_list_select_completion = ['<C-n>']
let g:ycm_key_list_previous_completion=['<C-p>']

let g:ycm_server_python_interpreter = '/usr/local/bin/python3'
let g:ycm_collect_identifiers_from_comments_and_strings = 1
let g:ycm_complete_in_strings = 1
let g:ycm_complete_in_comments = 1
let g:ycm_min_num_of_chars_for_completion = 1
let g:ycm_filetype_blacklist = {}
```

#### 키 설정

나는 첫번째와 두 번째, list completion 키를 `<C-n>`, `<C-p>`를 설정해 사용하고 있다.

```viml
let g:ycm_key_list_select_completion = ['<C-n>']
let g:ycm_key_list_previous_completion=['<C-p>']
```

* 기본값인 `<Tab>`을 쓰면 UltiSnips의 `<Tab>`과 충돌하기 때문에 ycm/UltiSnips 둘 중 하나는 바꿔줘야 한다.
* vim은 기본적으로 `<C-n>`, `<C-p>`를 사용해 단어 완성을 해주는데 ycm을 이렇게 설정해주면 vim 기본 동작이 확장된 것처럼 작동해서 사용감이 좋다.

#### python 경로 설정

```viml
let g:ycm_server_python_interpreter = '/usr/local/bin/python3'
```

* ycm은 python을 사용하므로 경로를 지정해 줘야 돌아간다.
* 위치를 모르겠다면(그럴리가) `$ which python3`로 알아낼 수 있다.

#### 자동 완성 소스로 주석과 문자열 추가 지정

```viml
let g:ycm_collect_identifiers_from_comments_and_strings = 1
let g:ycm_complete_in_strings = 1
let g:ycm_complete_in_comments = 1
```

* 이렇게 하면 주석과 문자열도 자동 완성에 사용할 소스로 수집한다.
* 주석에 들어간 단어들이 자동완성되면 은근히 편리하다.

#### 한 글자만 입력해도 작동할 것

```viml
let g:ycm_min_num_of_chars_for_completion = 1
```

* 이렇게 하면 한 글자만 입력해도 자동완성 후보 목록을 보여준다.

#### 블랙리스트 목록 비우기

```viml
let g:ycm_filetype_blacklist = {}
```

* 이렇게 하면 ycm이 모든 파일 타입에서 자동 완성 후보를 보여준다.
* 참고로 ycm이 기본적으로 무시하도록 되어 있는 파일 타입은 다음과 같다.

```viml
let g:ycm_filetype_blacklist = {
    \ 'tagbar' : 1,
    \ 'qf' : 1,
    \ 'notes' : 1,
    \ 'markdown' : 1,
    \ 'unite' : 1,
    \ 'text' : 1,
    \ 'vimwiki' : 1,
    \ 'pandoc' : 1,
    \ 'infolog' : 1,
    \ 'mail' : 1
    \}
```


### UltiSnips 설치

UltiSnips의 설치는 쉽다. 플러그인 관리자는 vim-plug.

```viml
Plug 'SirVer/ultisnips'
```

### UltiSnips 설정

다음은 나의 ultisnips 설정이다.

```viml
let g:UltiSnipsExpandTrigger="<Tab>"
let g:UltiSnipsJumpForwardTrigger="<Tab>"
let g:UltiSnipsJumpBackwardTrigger="<S-Tab>"
let g:UltiSnipsEditSplit="vertical"
" let g:UltiSnipsSnippetDirectories = ['~/.vim/UltiSnips']
let g:UltiSnipsSnippetDirectories = ['UltiSnips']
```

#### UltiSnips 확장 단축키 지정

```viml
let g:UltiSnipsExpandTrigger="<Tab>"
```

* ycm 목록에 나온 snippet 키워드를 선택한 다음 `<Tab>`을 누르면 자동 완성이 되도록 한다.

#### snippet 완성 후 점프 키 지정

```viml
let g:UltiSnipsJumpForwardTrigger="<Tab>"
let g:UltiSnipsJumpBackwardTrigger="<S-Tab>"
```

* 완성 후 입력 위치를 `<Tab>`과 `<S-Tab>`(shift + tab)으로 전/후로 이동할 수 있다.
* 자세한 사용법은 좀 더 밑에서...

#### snippet 편집기를 여는 방향 지정

```viml
let g:UltiSnipsEditSplit="vertical"
```

* 코딩중에 필요한 snippet이 생겼을 때 바로 snippet 파일을 불러 편집할 수 있다.
* 엄청 편한 기능이다.
* 이 옵션은 snippet 파일을 불러왔을 때 화면을 좌우로 분할한다는 것을 의미한다.
* 취향대로 설정하자.

#### snippet 위치 지정

```viml
" let g:UltiSnipsSnippetDirectories = ['~/.vim/UltiSnips']
let g:UltiSnipsSnippetDirectories = ['UltiSnips']
```

* 나만의 snippets 경로를 지정할 수 있다.
* `~/.vim/UltiSnips/`에 snippet 파일을 모아놓고, 위와 같이 설정하면 된다.

### ycm, UltiSnips의 기본적인 사용

`~/.vim/UltiSnip/javascript.snippets` 파일에
다음과 같은 snippet이 있다고 하자.

```perl
snippet fori
for (var ${1:prop} in ${2:object}) {
    ${0:$2[$1]}
}
endsnippet
```

* 코딩을 하다가 `for`라고 쓰면 ycm이 자동으로 자동 완성 후보를 보여준다.

![for](https://user-images.githubusercontent.com/1855714/48926044-86347c00-ef0d-11e8-82e0-50fa0a7e8155.png )

* `<C-n>`, `<C-p>`로 위아래로 움직여 선택을 할 수 있다.
* `<snip>`이라 되어 있는 것은 UltiSnips가 자동 완성을 보조해준다는 뜻이다.
* `fori`를 선택한 다음 `<Tab>`을 입력하면, 다음과 같이 자동완성된다.

![for completed](https://user-images.githubusercontent.com/1855714/48926090-11157680-ef0e-11e8-905e-f62b71a42d93.png)

커서가 자동으로 `prop`로 옮겨져 있는데, 여기에서 `item`이라 써보면...

![image](https://user-images.githubusercontent.com/1855714/48926105-43bf6f00-ef0e-11e8-9eb4-aba95adab0c1.png)

아래쪽에 있는 `prop`도 같이 `item`으로 실시간으로 수정된다.

snippet을 다시 잘 살펴보자. 두 위치를 똑같이 `${1}`로 지정했기 때문임을 추측할 수 있다.

```perl
snippet fori
for (var ${1:prop} in ${2:object}) {
    ${0:$2[$1]}
}
endsnippet
```

이 상태에서 `<Tab>`을 한 번 눌러보면 `${2}`위치로 커서가 점프한다.

![image](https://user-images.githubusercontent.com/1855714/48926158-bf212080-ef0e-11e8-9008-d7b537dc611d.png)

`list`라고 쓰면 아래와 같이 바뀐다.

![image](https://user-images.githubusercontent.com/1855714/48926173-ebd53800-ef0e-11e8-99bc-1bc40919e9e6.png)

`<Tab>`과 `<S-Tab>`으로 `${1}`과 `${2}`를 왔다갔다 할 수 있다.


### UltiSnips로 셸 명령 실행 결과를 가져오기

흥미롭게도 UltiSnips는 셸 명령어나 셸 스크립트 실행 결과를 사용할 수 있다.

다음과 같은 snippet을 작성해 보자.

```perl
snippet today
Today is the `date +%d.%m.%y`.
endsnippet
```

이렇게 하면 ``` ` ` ``` 안쪽의 `date +%d.%m.%y`는 bash에서 실행한 결과로 대체된다.

즉, `today`를 입력하고 `<Tab>`을 누르면 `Today is the 23.11.18.`과 같이 자동완성된다.

`abbr <expr> system(...)`과 비슷하니, 편리하게 사용하도록 하자.

### UltiSnips에서 python 함수 정의해 사용하기

```viml
:help Ultisnips-python
```

#### 예제: 오른쪽에 대문자 나타나게 하기

다음 snippet을 보자.

```perl
snippet wow
${1:Text}`!p snip.rv = (30-2*len(t[1]))*' '+t[1].upper()`
endsnippet
```

python에 익숙하다면 `!p snip.rv = ` 이후의 코드의 의미를 알 수 있을 것이다.

* `(30-2*len(t[1]))*' '` : 공백 `' '`을 `30 - 2 * len(t[1])` 만큼 만든다.
* `t[1].upper()` : `t[1]`을 대문자로 바꾼다.

`wow`를 쓰고 `<Tab>`으로 자동완성한 다음 `asdf oh...`를 쓰면 다음과 같이 된다.

```
asdf oh...          ASDF OH...
```

가장 오른쪽의 ... 까지 합하여 전부 30자이며, 오른쪽에는 내가 작성한 `asdf oh...`의 대문자가 나타나는 것이다.

#### 예제: 입력한 두 단어의 순서 바꾸기

```perl
snippet "([^\s].*)\.return" "Return (postfix)" r
return `!p snip.rv = match.group(1)`$0
endsnippet
```

이 snippet을 등록하고 `hello.return`을 쓴 다음 `<Tab>`을 누르면...

```
return hello
```

return hello
위와 같은 결과가 나온다.

* `r` : 정규표현식을 사용하겠다는 의미이다.
* `match.group(1)`: `([^\s].*)`에 매치된 결과를 가져온다. `hello`가 해당.

#### 예제: html 태그 자동완성하기

`<div>`를 작성한 이후에 `</div>`를 또 작성하는 일은 귀찮다.

이걸 자동화해보자.

```perl
snippet "<([^\s].*)" "tag <...></...>" r
`!p snip.rv='<'+match.group(1)+'>'+'</'+match.group(1)+'>'`$0
endsnippet
```

위의 snippet을 쓰면...

* `<html` 이라 쓰고 탭 키를 누르면 `<html></html>`로 자동 완성된다.
* `<div` 라 쓰고 탭 키를 누르면 `<div></div>`로 자동 완성된다.

조금 더 눈에 띄는 걸 좋아한다면 다음 방법을 사용해보자.

```perl
snippet <
<${1:tag}>`!p snip.rv = '</'+t[1]+'>'`$0
endsnippet
```

`<`을 입력하고 탭 키를 누르면 된다.

![tag](https://user-images.githubusercontent.com/1855714/48975289-43f77000-f0b0-11e8-9ef2-9b454f8199be.gif)

#### 예제: javascript import

다음은 웹 서핑을 하다가 찾아낸 snippet인데 특히 javascript 사용자에게 유용할 듯하여 소개한다.

<https://gist.github.com/mutewinter/825f44bfd3aa810088ea5de2f61bad63 >

![import](https://camo.githubusercontent.com/df94f1ae23a02ecbee681d966d116468187604bb/68747470733a2f2f692e696d6775722e636f6d2f737a624c7752722e676966 )

멋지다! `ii<Tab>`을 누르는 것만으로 돌아간다!

snippet은 다음과 같다.

```perl
snippet ii "magic import" b
import `!p
def formatVariableName(path):
  parts = path.split('/')
  module = parts[0]
  if len(parts) > 1:
    return parts[-1]
  else:
    return re.sub(r'[_\-]', '', module.title())
snip.rv = formatVariableName(t[1])
` from '${1}';$0
endsnippet
```

### UltiSnips에서 vimscript 사용하기

`!v`를 사용하면 vimscript를 사용할 수 있다.

다음 snippet을 사용해 보자.

```perl
snippet indent
Indent is: `!v indent(".")`.
endsnippet
```

인덴트가 없는 상태에서 `indent<Tab>`을 입력하면 다음과 같은 결과가 나온다.

```
Indent is: 0.
```

그렇다면 이번엔 `    indent<Tab>`을 입력해 보자. 숫자 부분에 `4`가 완성된다.

```
    Indent is: 4.
```

## coc.nvim

* coc.nvim은 VSCode와 비슷한 수준의 자동완성 기능을 제공하는 것을 목표로 하는 vim 플러그인이다.
* 사용해보면 매우 만족스럽다. VSCode 만큼은 된다.
    * youcompleteme에서 잘 안 되는 언어들이 매우 잘 되며, php/javascript 자동완성도 훌륭하다.
    * UltiSnips와의 연동도 youcompleteme 만큼은 된다.

### coc.nvim 설치

Node.js와 yarn을 먼저 설치한 다음, `.vimrc`에서 다음과 같이 플러그인을 정의해주면 된다.

```viml
Plug 'neoclide/coc.nvim', {'tag': '*', 'do': './install.sh'}
```

### 필요한 프로그래밍 언어의 랭귀지 서버 설치

1. coc.nvim의 [Language-servers](https://github.com/neoclide/coc.nvim/wiki/Language-servers ) 문서에서 내가 사용하는 언어를 찾는다.
2. 해당 언어 섹션에서 coc.nvim이 추천하는 랭귀지 서버 플러그인을 찾는다.
3. 해당 랭귀지 서버 플러그인 저장소에 가서 추천하는 설치 방법으로 설치한다.

보통은 `:CocInstall` 명령어를 사용해 필요한 언어의 랭귀지 서버를 설치하면 끝난다. 매우 간편하다.


#### golang 랭귀지 서버 설치

go 작성자들이 제공하는 `gopls`를 사용하도록 `coc-settings.json`에 다음과 같이 설정을 추가해주면 된다.

`coc-settings.json` 파일은 `:CocConfig` 명령어를 입력하면 vim에서 바로 열 수 있다.

```json
{
    "suggest.detailField": "abbr",
    "suggest.enablePreview": false,
    "languageserver": {
        "golang": {
            "command": "gopls",
            "rootPatterns": ["go.mod", ".vim/", ".git/", ".hg/"],
            "filetypes": ["go"]
        }
    }
}
```

#### php 랭귀지 서버 설치

```viml
:CocInstall coc-phpls
```

#### UltiSnips와의 연동

```viml
:CocInstall coc-ultisnips
```


# 문제 해결

## neovim 에서 ycm, UltiSnips가 돌아가지 않는 문제 해결하기

neovim에서 실행하면 다음과 같이 출력되며 ycm과 UltiSnips를 사용할 수 없다고 나온다.

```
$ nvim
YouCompleteMe unavailable: requires Vim compiled with Python (2.7.1+ or 3.4+) support.
UltiSnips requires py >= 2.7 or py3
```

ycm과 UltiSnips가 vim의 python support를 쓰기 때문에 생기는 문제다.

pip로 neovim을 업그레이드하면 해결되는 문제이므로 신경을 끄도록 하자.

```bash
$ sudo pip3 install --upgrade neovim
```


# Links

* [Using YouCompleteMe with Neovim #1315](https://github.com/neovim/neovim/issues/1315 )
