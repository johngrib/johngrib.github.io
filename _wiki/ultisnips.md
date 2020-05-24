---
layout  : wiki
title   : Ultisnips
summary : 자신만의 snippet 파일을 만들어 쓰자
date    : 2020-01-03 21:32:03 +0900
updated : 2020-01-03 21:54:38 +0900
tag     : vim completion
toc     : true
public  : true
parent  : [[Vim]]
latex   : false
---
* TOC
{:toc}

## Ultisnips?

* vim을 위한 궁극의 snippet 솔루션.
* 자신만의 snippet 파일을 만들어갈 수 있으므로, 점점 더 편해지는 즐거움이 있다.
* 셸 스크립트, vimscript, python 코드를 실행할 수 있어 자유도가 높다.

## 설치

UltiSnips의 설치는 쉽다. 플러그인 관리자는 vim-plug.

```viml
Plug 'SirVer/ultisnips'
```

## 설정

다음은 나의 ultisnips 설정이다.

```viml
let g:UltiSnipsExpandTrigger="<Tab>"
let g:UltiSnipsJumpForwardTrigger="<Tab>"
let g:UltiSnipsJumpBackwardTrigger="<S-Tab>"
let g:UltiSnipsEditSplit="vertical"
" let g:UltiSnipsSnippetDirectories = ['~/.vim/UltiSnips']
let g:UltiSnipsSnippetDirectories = ['UltiSnips']
```

### 확장 단축키 지정

* 자동완성 목록에 나온 snippet 키워드를 선택한 다음 `<Tab>`을 누르면 자동 완성이 되도록 한다.

```viml
let g:UltiSnipsExpandTrigger="<Tab>"
```

### snippet 완성 후 점프 키 지정

```viml
let g:UltiSnipsJumpForwardTrigger="<Tab>"
let g:UltiSnipsJumpBackwardTrigger="<S-Tab>"
```

* 완성 후 입력 위치를 `<Tab>`과 `<S-Tab>`(shift + tab)으로 전/후로 이동할 수 있다.
* 자세한 사용법은 좀 더 밑에서...

### snippet 편집기를 여는 방향 지정

```viml
let g:UltiSnipsEditSplit="vertical"
```

* 코딩중에 필요한 snippet이 생겼을 때 바로 snippet 파일을 불러 편집할 수 있다.
    * `:UltiSnipsEdit`를 사용하면 된다.
* 엄청 편한 기능이다.
* 이 옵션은 snippet 파일을 불러왔을 때 화면을 좌우로 분할한다는 것을 의미한다.

### snippet 위치 지정

```viml
" let g:UltiSnipsSnippetDirectories = ['~/.vim/UltiSnips']
let g:UltiSnipsSnippetDirectories = ['UltiSnips']
```

* 나만의 snippets 경로를 지정할 수 있다.
* `~/.vim/UltiSnips/`에 snippet 파일을 모아놓고, 위와 같이 설정하면 된다.

## 기본적인 사용

`~/.vim/UltiSnip/javascript.snippets` 파일에
다음과 같은 snippet이 있다고 하자.

```perl
snippet fori
for (var ${1:prop} in ${2:object}) {
    ${0:$2[$1]}
}
endsnippet
```

* 코딩을 하다가 `for`라고 쓰면 ycm이나 coc를 통해 자동 완성 후보가 나타난다.

![for]( /post-img/ultisnips/for.png )

* `<C-n>`, `<C-p>`로 위아래로 움직여 선택을 할 수 있다.
* `<snip>`이라 되어 있는 것은 UltiSnips가 자동 완성을 보조해준다는 뜻이다.
* `fori`를 선택한 다음 `<Tab>`을 입력하면, 다음과 같이 자동완성된다.

![for completed]( /post-img/ultisnips/for-completed.png )

커서가 자동으로 `prop`로 옮겨져 있는데, 여기에서 `item`이라 써보면...

![for-item]( /post-img/ultisnips/for-item.png )

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

![for-jump]( /post-img/ultisnips/for-jump.png )

`list`라고 쓰면 아래와 같이 바뀐다.

![for-list]( /post-img/ultisnips/for-list.png )

`<Tab>`과 `<S-Tab>`으로 `${1}`과 `${2}`를 왔다갔다 할 수 있다.


## 셸 명령 실행 결과를 가져오기

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

## python 함수 정의해 사용하기

```viml
:help Ultisnips-python
```

## 예제 모음
### 오른쪽에 대문자 나타나게 하기

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

### 입력한 두 단어의 순서 바꾸기

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

### html 태그 자동완성하기

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

![tag]( /post-img/ultisnips/lt.gif )

### javascript import

다음은 웹 서핑을 하다가 찾아낸 snippet인데 특히 javascript 사용자에게 유용할 듯하여 소개한다.

[Magic Import for Vim UltiSnips](https://gist.github.com/mutewinter/825f44bfd3aa810088ea5de2f61bad63 )

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

### kebab-case를 snake_case로 변환

rust 언어를 공부하다 만들어본 snippet이다. `kebab-case`를 작성하고 `<Tab>`을 입력하면 `snake_case`로 완성해준다.

![kebab-case to snake_case]( /post-img/ultisnips/kebab-case.gif )

```perl
# kebab-case to snake_case
snippet "([\S]+(\-[\S]+)+)" "kebab-case to snake_case" r
`!p snip.rv = re.sub('-','_', match.group(1))`$0
endsnippet
```

## UltiSnips에서 vimscript 사용하기

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

## See Also

* [[vim-auto-completion]]{Vim 자동 완성 기능 사용하기}
* [[my-study-method]]{나의 공부 방법} - 나는 새로운 프로그래밍 언어를 익힐 때 ultisnips로 사용할 snippet을 만들면서 공부한다.

## Links

* [SirVer/ultisnips](https://github.com/SirVer/ultisnips )


