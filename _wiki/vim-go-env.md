---
layout  : wiki
title   : go를 위한 vim 환경설정
summary : 사실 이 문서의 대부분은 vim-go cheatsheet라 할 수 있다
date    : 2018-09-21 08:29:49 +0900
updated : 2018-09-28 23:04:19 +0900
tag     : vim golang
toc     : true
public  : true
parent  : Golang
latex   : false
---
* TOC
{:toc}

# Plugins

플러그인은 이 정도는 있어야 편하다.

```viml
" 유명한 플러그인들
Plug 'majutsushi/tagbar'
Plug 'fatih/vim-go', { 'do': ':GoUpdateBinaries' }
Plug 'SirVer/ultisnips'
Plug 'honza/vim-snippets'
Plug 'valloric/youcompleteme', { 'do': 'python3 ./install.py --clang-completer --go-completer --js-completer'}

" 편의
Plug 'milkypostman/vim-togglelist'
Plug 'AndrewRadev/splitjoin.vim'
```

* [vim-togglelist](https://github.com/milkypostman/vim-togglelist )
    * Quickfix 윈도우 open/close를 토글해준다. 굉장히 작은 플러그인.
* [splitjoin](https://github.com/AndrewRadev/splitjoin.vim )
    * vim-go 튜터에서 추천하길래 써 보았는데 괜찮았다. 훌륭한 플러그인이라 생각.
    * 링크를 타고 들어가서 gif를 보면 막 써보고 싶어진다.


# .vimrc

`.vimrc` 설정은 다음과 같이 해 두었다.

```viml
" for Golang
    set updatetime=100

    " 저장할 때 자동으로 formatting 및 import
    let g:go_fmt_command = "goimports"
    let g:go_list_type = "quickfix"
    let g:go_addtags_transform = "camelcase"

    let g:go_autodetect_gopath = 1
    let g:go_highlight_types = 1
    let g:go_highlight_fields = 1
    let g:go_highlight_functions = 1
    let g:go_highlight_function_calls = 1
    let g:go_highlight_extra_types = 1
    let g:go_highlight_generate_tags = 1
    let g:go_highlight_operators = 1
    let g:go_auto_type_info = 1
    let g:go_auto_sameids = 1

    " quickfix 이동 및 open/close
    nnoremap <C-n> :cnext<CR>
    nnoremap <C-p> :cprevious<CR>
    nnoremap <LocalLeader>q :call ToggleQuickfixList()<CR>

    " 테스트 커버리지 검사 및 색깔 표시 토글
    nnoremap <LocalLeader>c :GoCoverageToggle<CR>

    " 자주 쓰는 기능들
    autocmd FileType go nnoremap <Tab>b :GoBuild<CR>
    autocmd FileType go nnoremap <Tab>r :GoRun<CR>
    autocmd FileType go nnoremap <Tab><Tab>r :GoRun %<CR>

    autocmd FileType go nnoremap <Tab>t :GoTest<CR>
    autocmd FileType go nnoremap <Tab><Tab>t :GoTestFunc<CR>
    autocmd FileType go nnoremap <Tab>c :GoCoverageToggle<CR>
```

# vim-go

## Run/Build/Test

* run
    * `:GoRun` - 패키지 전체를 실행한다.
    * `:GoRun %` - 현재 편집중인 파일을 실행한다.
* build
    * `:GoBuild` - 빌드한다. 빌드 warning은 Quickfix 윈도우를 열어 보여준다.
* test
    * `:GoTest` - 모든 테스트 케이스를 실행.
    * `:GoTestFunc` - 현재 커서가 위치한 함수의 테스트를 실행.
    * `:GoCoverage` - 테스트 코드를 실행하고, 성공/실패한 함수들에 색깔을 칠해 보여준다. 색깔은 토글 가능.
    * `:GoAlternate` - 현재 코딩 중인 파일과, 해당 파일의 테스트 코드 파일을 번갈아 가며 보여준다.

만약 테스트 타임아웃을 변경할 필요가 있다면 다음과 같이 수정해주면 된다.

```viml
" 테스트 타임아웃 기본값은 10초.
let g:go_test_timeout = '10s'
```

## Quickfix 윈도우 사용하기

* 빌드 도중 경고나 에러가 있으면 Quickfix 윈도우가 자동으로 열려 목록을 볼 수 있다.
* 파일명, 문제가 된 row/col, 문제 사유, 문제와 관련된 다른 파일 등의 정보를 보여준다.

Quickfix 윈도우는 다음과 같이 출력된다.

```c
main.go|8 col 6| undefined: a
test.go|4 col 6| main redeclared in this block previous declaration at ./constants.go:8:6
```

* Quickfix 윈도우에서 각 항목에 커서를 놓고 엔터를 누르면 해당 코드로 커서가 점프.
* 경고를 해결하면 Quickfix 목록에서 해당 항목이 자동으로 사라진다.
* `ctrl-n` 으로 다음 경고 코드로 커서 이동.
* `ctrl-p` 로 이전 경고 코드로 커서 이동.
* `<LocalLeader>q` 로 Quickfix 윈도우를 토글할 수 있다.

## import

.vimrc에서 다음과 같이 설정했다면, 기본적인 패키지 임포트는 저장할 때마다 자동으로 입력된다.

```viml
let g:go_fmt_command = "goimports"
```

* 자동 import 구문 입력.
* 자동으로 사용하지 않는 import 구문 삭제.
* 자동으로 코드 포매터 적용.

수동으로는 다음과 같은 방법이 있다.

* `:GoImport strings` - `import "strings"` 구문이 추가된다.
* `:GoImport s<Tab>` - 일부만 쓰고 `<Tab>`을 입력하면 자동완성되며, 계속 누르면 후보를 돌아가며 보여준다.
* `:GoImportAs str strings` - `import str "strings"` 구문이 추가된다.
* `:GoDrop strings` - `import strings` 구문이 삭제된다.

## vim-go에서 지원하는 텍스트 오브젝트

vim-go를 설치하면 다음 텍스트 오브젝트가 추가된다.

* `if`, `af` : func 범위.
    * 당연히 `v`, `d`, `y` 등과 조합해서 쓰는 것이 가능.
    * `let g:go_textobj_include_function_doc = 0` - `af` 사용시 함수 상단의 코멘트도 포함하는지를 설정할 수 있다.

## 자동완성

### snippet 사용

200개 이상의 자동 완성 키워드가 있으며, 필요에 의해 직접 추가할 수도 있다.

다음은 몇 가지 대표적인 키워드를 뽑아본 것이다.

* `v` : 간단한 변수 대입
```js
`${1} := ${2}`
```

* `inf` : 인터페이스
```js
interface ${1:name} {
    ${2:/* methods */}
}
```

* `ife` : if / else
```js
if ${1:/* condition */} {
    ${2:${VISUAL}}
} else {
    ${0}
}
```

* `fun`
```js
func ${1:funcName}(${2}) ${3:error} {
    ${4}
}
${0}
```

* `pl`
```js
fmt.Println("${1:s}")
```

### interface 구현

* `:GoImpl` - 인터페이스 이름을 입력하면 구현해야 하는 함수들의 뼈대를 만들어 준다.

## 찾기, 보기, 이동

* `[[` - 이전 함수로 커서 이동.
* `]]` - 다음 함수로 커서 이동.
* `:GoDef` - 커서가 위치한 함수나 변수가 선언된 곳으로 점프.
    * vim 기본 커맨드인 `ctrl+]` 로도 된다. 외울 필요 없음.
    * `gd`로도 가능하다.
    * 점프 전의 위치로 돌아가는 방법은 세 가지가 있다.
        * 점프 전의 위치로 돌아가려면 vim 기본 커맨드인 `ctrl+o`.
        * `ctrl+o`의 작동 방식이 마음에 안 든다면 vim-go에서 제공하는 `ctrl+t`를 써도 좋다.
        * 가장 확실하게 돌아가려면 `:GoDefPop`을 쓰면 된다.
* `:GoDecls`, `:GoDeclsDir` - 함수나 변수가 정의된 파일, 경로 목록을 보여준다.
    * fzf와 조합하면 매우 편리하다.
* `:GoDoc`
    * 함수 바로 위에 달아둔 코멘트를 볼 수 있다.
* `:GoInfo`
    * 해당 함수의 이름과 parameter 목록, return type 등을 아래 status line 에 한 줄로 보여준다.
    * `let g:go_auto_type_info = 1`로 설정해두면, 커서 아래의 함수 정보를 자동으로 보여준다.
* `let g:go_auto_sameids = 1` - 설정해 두면, 커서 아래의 변수명/함수명을 현재 버퍼에서 모두 찾아 색깔을 칠해준다.
* `:GoDeps` - 파일의 모든 디펜던시 보기.
* `:GoReferrers` - 커서가 위치한 함수, 변수를 사용하는 모든 파일/위치를 조사해준다.
* `:GoImplements` - 인터페이스 구현 목록을 보여준다. 유용하다.
* `:GoChannelPeers` - 변수 위에 커서를 놓고 사용한다. 해당 변수가 선언된 곳, 재할당된 곳, 함수로 넘겨진 곳 등을 목록으로 보여준다.
* `:GoCallers`, `:GoCallees` - 어지간한 IDE들이 모두 제공하는 기능.

## 리팩터링 도구

* `:GoRename` - 변수, 함수명 변경을 도와준다. 훌륭하다.
* `:GoFreevars` - 비주얼 모드에서 사용. 범위 내의 변수들 중 extract 해도 문제 없을 변수 목록을 만들어 준다.

## Debugger 사용

* [2018년 3월 27일 vim-go 업데이트](https://github.com/fatih/vim-go/blob/master/CHANGELOG.md#117---march-27-2018 ) 부터 디버거 기능 지원.
    * vim-go의 개발자인 Fatih Arslan님 [트위터](https://twitter.com/fatih/status/978652722835656704 ).

### 설치

* [devle](https://github.com/derekparker/delve )를 설치한다.
    * 설치 방법은 [delve installaion 문서](https://github.com/derekparker/delve/tree/master/Documentation/installation ) 참고.

### 사용

다음 명령어들만 알아두면된다. 적당히 매핑해서 쓰면 될듯.

* `:GoDebugStart`
* `:GoDebugTest`
* `:GoDebugBreakpoint`
* `:GoDebugContinue`
* `:GoDebugNext`
* `:GoDebugStep`
* `:GoDebugStop`
* `:GoDebugRestart`

## 문제 해결

### delve 업데이트로 인한 debugger 오작동 문제

2018년 7월 15일, [delve의 업데이트](https://github.com/derekparker/delve/pull/1230 )로 인해, vim-go의 디버거 기능이 작동하지 않는 문제가 발생했다.

돌려보면 엉뚱한 에러 메시지만 자꾸 나오는데, 아직 머지되지는 않았지만 [문제를 해결한 Pull Request](https://github.com/fatih/vim-go/pull/1992 )가 있어 적용해 보았더니 잘 작동하였다.

### K 커맨드 :GoDoc 매핑 문제

* vim-go는 자동으로 `K`키에 `:GoDoc`을 맵핑시킨다.
* 그런데 나는 `K`에 다른 기능을 매핑시켜 쓰고 있었으므로, 이 설정이 마음에 들지 않았다.

찾아보니 [관련 이슈](https://github.com/fatih/vim-go/issues/140 )가 있었다.

다음과 같이 설정하면 vim-go가 `K`에 `:GoDoc`을 맵핑시키지 않는다.

```viml
let g:go_doc_keywordprg_enabled = 0
```

# Links

* [vim-go](https://github.com/fatih/vim-go )
    * vim-go 개발자 후원하기: <https://patreon.com/fatih >
* [Tutorial for vim-go](https://github.com/fatih/vim-go-tutorial )

---

* Debugger
    * [devle](https://github.com/derekparker/delve )
    * [delve installaion](https://github.com/derekparker/delve/tree/master/Documentation/installation )

