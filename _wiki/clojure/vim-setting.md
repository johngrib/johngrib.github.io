---
layout  : wiki
title   : Neovim에서 Clojure 코드를 작성하자
summary : vim-iced까지 이르는 삽질과 고민의 기록
date    : 2022-01-09 22:53:22 +0900
updated : 2022-03-19 00:38:33 +0900
tag     : clojure vim
toc     : true
public  : true
parent  : [[/clojure]]
latex   : false
---
* TOC
{:toc}

## 고민과 방황

### 어떤 환경을 쓸 것인가?

회사에서 Clojure를 쓰게 되어 다음과 같은 방황을 하였다.

- [Emacs]( https://www.gnu.org/software/emacs/ )
    - [evil]( https://github.com/emacs-evil/evil )이나 [doom-emacs]( https://github.com/hlissner/doom-emacs ) 같은 것이 있긴 하지만 vim의 모든 명령을 구현했을 것 같지는 않다.
    - 내가 만든 vim 플러그인들([한글 f]( https://github.com/johngrib/vim-f-hangul ) 등)을 하루에도 수십~수백번 사용하고 있는데, emacs에서는 사용할 수 없을 것이다.
    - 내 웹 사이트는 vim으로 관리하도록 몇 년간 커스터마이즈 했고, 노하우도 쌓여서 vim은 버리기 아깝다. 그래서 Emacs를 선택하면 평소에 쓰는 에디터만 늘어난다.
    - 결론: vim에 대한 매몰비용과 애정이 커서 가능한 한 vim 안에서 해결하고 싶다.
- [VsCode]( https://code.visualstudio.com/ ) + [Calva]( https://calva.io/ ) + [vscode-neovim]( https://github.com/asvetliakov/vscode-neovim )
    - 꽤 괜찮았지만 [[/vim/ultisnips]]가 작동하지 않고, 명령행 모드를 부르면 위에 나타나는 것이 불편하게 느껴진다.
    - vscode-neovim은 상당히 괜찮은 vim 지원이지만, 내가 원하는 수준에는 미치지 못했다.
    - vscode의 snippet 지원은 최악이다. json으로 snippet을 작성해야 하며, [[/vim/ultisnips]] 처럼 내가 생각한 생성 코드를 만드는 것은 할 수 없는 것 같다. 특수 변수를 쓰는 정도가 최선. vscode-neovim은 neovim을 서버로 띄우는 방식인데 대체 왜 ultisnips가 안 돌아가는지 모르겠다.
    - 결론: Calva는 좋지만 vscode-neovim 때문에 편하게 느껴지지 않는다.
- [IntelliJ]( https://www.jetbrains.com/ko-kr/idea/download/ ) + [Cursive]( https://cursive-ide.com/ ) + [ideavim]( https://github.com/JetBrains/ideavim )
    - ideavim을 열심히 커스터마이징하니 그럭저럭 괜찮았다.
    - vscode-neovim처럼 vim 서버를 띄우는 방식이 아니라 vim을 흉내내는 방식이므로 거의 모든 vim 플러그인을 사용할 수 없다.
    - 테스트 실행 등이 다른 환경에 비해 느리다.
    - [Clojure Extras]( https://plugins.jetbrains.com/plugin/18108-clojure-extras )를 함께 사용하면 가독성 측면에서 괜찮았다.
    - 결론: cursive가 유료인데 아까우니 계속 쓰자. 딱히 나쁜 건 없는데 vim 지원이 가장 아쉽고 답답하다.

### 세 가지 대안: 결론은 vim-iced

vim에서 Clojure 코딩을 할 수 있는 환경을 구성하기 위해 약 3달 간 세 가지 대안을 살펴보았다.

세 대안 모두 공통적으로 다음 스택을 사용한다.

Neovim + [coc.nvim]( https://github.com/neoclide/coc.nvim ) + [clojure-lsp]( https://clojure-lsp.io/ ) + [clj-kondo]( https://github.com/clj-kondo/clj-kondo ) + [vim-sexp]( https://github.com/guns/vim-sexp )

다음은 각 대안을 사용하고 커스터마이즈해보면서 느낀 점들이다.

- \+ [vim-fireplace](https://github.com/tpope/vim-fireplace )
    - vim 세계에서 가장 유명한 개발자인 Tim Pope의 플러그인. 그는 vim 언어를 확장하는 아주 참신하면서도 아주 작은 해법들을 천재적으로 내놓는데, fireplace도 그의 철학이 투영되었는지 아주 작고 최소한의 기능만 한다. 그런데 내가 원하는 건 최소한의 기능만 하는 플러그인이 아니다. 일일이 설정하는 건 힘든 일이고, 나는 통합된 기능을 제공하는 Clojure 플러그인을 원한다.
- \+ [conjure](https://github.com/Olical/conjure )
    - 통합된 환경을 제공해 주는 플러그인. 떠 있는 REPL에 자동으로 붙고, REPL을 닫아둔 상태에서도 코드 평가를 하면 팝업으로 결과를 잠시 보여주고 사라지는 등 사용감이 좋았다.
    - 필요한 기능 대부분을 무리 없이 사용할 수 있었다. 회사 일을 하기에도 충분해 보였다.
    - `:ConjureSchool` 이라는 튜토리얼을 시작하는 명령이 있어 초보자에게 친절하다.
    - 인상적인 것은 개발 언어. vim 플러그인인데 Lua 코드가 67.4%, Fennel 코드가 30.6%. Fennel은 Lisp 방언이니 Lisp으로 만든 vim 플러그인인 셈이다. 여기까지 모든 것이 합격점.
    - 가장 큰 문제는 vim session과 조합이 좋지 않았다는 것. Conjure의 REPL 버퍼는 hidden 속성을 갖고 있는데, 이게 session에 함께 저장되어 버린다. 그래서 다음에 vim을 열고 프로젝트 세션을 열면 에러 메시지가 화면을 가득 채우게 된다. [6개월쯤 된 알려진 이슈]( https://github.com/Olical/conjure/issues/244 )이긴 하지만, [내가 궁여지책으로 떠올린 허접한 방법]( https://github.com/johngrib/dotfiles/blob/7e249a217fd9d09f2b3bfaa1bb2920d905c325b9/vim-include/fix-conjure-session.sh ) 외에는 딱히 훌륭한 해법이 없어 보인다. 너무 허접한 방법이라 다른 사람에게 소개시켜 줄 수도 없다. 혼자서만 써야 하는 방법인 것이다. 그렇다고 session 없이 vim을 쓰면 너무 힘들다. 그럴 바엔 IntelliJ를 쓰는 게 낫다.
- \+ [vim-iced](https://liquidz.github.io/vim-iced/ )
    - [clojure-emacs/cider](https://github.com/clojure-emacs/cider )에 영감을 받아 만들어진 플러그인이며, ["Emacs CIDER에 필적하는 Clojure 도구 = 회사에서 Clojure 개발에 사용할 때 지장이 없는 도구"]( https://liquidz.github.io/vim-iced/#_overview )라는 훌륭한 목표를 갖고 있다.
    - vim과 REPL의 통합적 사용을 위한 `iced`라는 셸 명령을 제공한다. `iced`를 사용하면 [nrepl]( https://github.com/nrepl/nrepl )을 띄워주므로 다른 에디터에서도 붙을 수 있다.
    - 코드를 평가하면 stdout 출력만 REPL 버퍼에 띄워주는 것이 불만이었다. IntelliJ + Cursive나 VsCode + Calva 는 stdout도 출력하고 평가 결과도 출력해주니까 굉장히 불편하게 느껴졌다. 그러나 결국 해결 방법을 찾아서 다른 환경에서의 REPL과 비슷하게 사용할 수 있었다.
    - Conjure와 달리 REPL이 평범한 버퍼여서 session 문제가 없다.
    - lsp 통합이 잘 되어 있어서 어지간한 기능은 대부분 vim-iced에서 wrapping해서 제공한다.

Conjure와 vim-iced 를 왔다갔다 하면서 vim을 사용했다.
처음에는 Conjure가 훨씬 좋다고 느꼈는데, 사용하면 할수록 vim-iced가 나에게 더 맞는 도구라는 생각이 들었다.

## Clojure + Vim + vim-iced 로 Clojure 코딩하기

### REPL 실행

vim-iced는 통합적인 환경을 위해 자체적으로 `iced`라는 명령을 제공한다.

`iced` 명령으로 터미널에서 REPL을 띄운다.
alias는 `-A:알리아스`로 지정해주면 된다.

```bash
iced repl -A:dev
```

이렇게 실행된 REPL은 평범한 Clojure REPL과 똑같으므로 Clojure 코드를 입력해 평가해볼 수도 있다.

만약 터미널 하나를 띄워놓기 아깝다면 백그라운드로 실행해서 사용하면 된다.

```bash
iced repl -A:dev &  # 백그라운드로 실행
```

포트 번호는 굳이 기억해두지 않아도 자동으로 `.nrepl-port` 파일에 저장되니 신경쓰지 않아도 된다.

### vim에서 REPL에 접속하기

vim을 실행하고, 최근 작업중인 프로젝트 session을 로드한다.

이제 `src`를 입력해 REPL에 접속할 수 있다.
접속이 완료되면 왼쪽 아래에 `connected`라고 표시되고, 이미 접속된 상태라면 `Already connected`라고 표시된다.

![src를 입력해 REPL에 연결하는 장면]( ./src.gif )

`s`는 내가 프로그래밍 언어별로 특화된 기능을 붙일 때 쓰는 키이다. `src`는 다음과 같은 의미를 갖는다.

- `s`: Clojure 관련 기능
- `r`: REPL
- `c`: connect

즉, `sr`로 시작하는 명령은 모두 REPL과 관련된 것들이다.

### 코드를 평가하기

아래와 같은 코드가 있고, 커서가 `ten`에 있다고 하자.

```clojure
(def ten 10)
(str
  (* 1000 (+ ten 3)))
;             ↑
```

코드 평가와 관련된 명령은 모두 `se`로 시작하도록 설정해 두었다.
가장 많이 쓰는 것은 `sef`, `ser`, `see`.

- `sef`: 현재 파일을 읽고 평가한다.
    - Cursive의 `command + shift + L`과 같다.
- `ser`: 커서 위치의 outer form을 평가하고 결과를 출력한다.
    - Cursive의 `command + shift + P`와 같다.
    - REPL에 `"13000"`이 출력된다.
- `see`: 커서 위치의 form을 평가한다.
    - REPL에 `13`이 출력된다.
- `sew`: 커서 위치의 element를 평가한다.
    - REPL에 `10`이 출력된다.
    - 단일 변수값을 볼 때 편리하다.
- `sea`: classpath의 모든 변경된 파일을 다시 읽는다.
- `sem`: vim mark가 있는 위치를 평가한다.
    - mark를 찍어놓고 계속 평가할 수 있으므로 평가할 곳으로 커서를 갖다 놓지 않아도 된다. `(run-tests)` 같은 것을 실행할 때 편리하다.
    - vim mark를 모두 쓸 수 있다. 즉, `sema`, `semb`, `semc` .. `semz`를 사용할 수 있다.
- `seu`: 현재 네임스페이스의 모든 `def`를 undef 한다.

![REPL 팝업]( ./iced-repl-popup.jpg )

- 만약 REPL 버퍼가 열려 있지 않다면 오른쪽에 팝업이 잠시 떠서 결과를 보여준 다음 사라진다.
- 어떤 방식으로든 평가를 하면 공통적으로 코드 오른쪽에 평가 결과가 잠시 회색으로 표시되다가 잠시 후에 사라진다.
- 하단의 메시지 출력 바에도 평가 결과가 나타난다.
- REPL의 `#1`, `#2`, `#3`과 같이, 평가 결과는 1번 레지스터에 저장된다. 평가가 누적될수록 2, 3 숫자 레지스터로 밀리게 된다.

### REPL 다루기

이제 REPL을 열어보자. REPL 조작은 `sr`로 시작한다.

- `src`: REPL에 연결한다. (앞에서 사용한 명령이다.)
- `srr`: REPL 버퍼를 열었다 닫았다 한다.
- `srd`: REPL 버퍼의 내용을 전부 지운다.
- `sri`: REPL에 인터럽트를 보낸다. 오래 걸리는 작업을 취소할 때 쓸 수 있다.

![화면 오른쪽에 나타난 REPL 버퍼]( ./iced-repl-on-right.jpg )

화면 오른쪽의 버퍼가 REPL 이다. 평가 결과들이 출력되어 있는 것을 볼 수 있다.

### 코드 자동완성

#### 함수

다음은 `(sol`을 입력했을 때 자동완성 추천이 나타나는 장면을 찍은 것이다.

![자동완성 추천]( ./iced-code-suggestion.jpg )

- 왼쪽 하이라이트 메뉴에서는 완성할 코드를 선택할 수 있다.
- 하이라이트 메뉴 오른쪽은 선택한 코드의 docstring과 clojuredocs.org 조회 결과를 보여준다.
- `clojure.core`만 보여주는 게 아니라 내가 만든 `def`나 함수도 잘 보여준다.

#### ultisnips

vim을 쓰는데 ultisnips를 안 쓰면 서운하다.
이번에는 ultisnips를 써보자.

Lisp에 macro가 있다면 vim에는 vim register macro와 [[/vim/ultisnips]]가 있다.

셋 다 메타 프로그래밍 도구라 부를 수 있는데,
vim register 매크로와 ultisnips는 타이핑하는 손가락 끝에서 코드가 펼쳐진다는
특성상 매크로 조각을 개인 공간에 혼자 보관하고 실행 결과로 생성된 코드만 회사 코드 베이스에 추가할 수 있다는 장점이 있다.
나 혼자만 알아보게 짜도 문제가 없고, 한번 만들어서 쓰고 버려도 괜찮다는 점이 편안하다.

예제를 위해 Java interop을 수행하는 자동 완성 snippet을 하나 만들어 보았다.

```perl
snippet "([^\s].*)\.([^s].*)" "Object.method -> (.method Object)" r
(`!p snip.rv = "." + match.group(2) + " " + match.group(1)`)$0
endsnippet
```

[clojure.org의 Java interop 예제]( https://clojure.org/reference/java_interop )를 Java 코드에서 Clojure 코드로 변환하는 모습을 gif 이미지로 찍어 보았다.

![ultisnips를 사용하는 모습]( ./ultisnips-java-interop.gif )

`"fred".toUpperCase`를 입력하고 `control+y`를 누르면 `(.toUpperCase "fred")`로 변환되는 것을 볼 수 있다.

Clojure도 천천히 개발하다보면 이런 ultisnips snippet이 하나 하나 쌓이게 될 것이다.


#### github copilot

copilot도 문제 없이 작동하는 것을 확인할 수 있었다.

`(defn factorial`을 입력했더니 함수 본문을 제안해 주고 있다.

![copilot이 함수 완성을 추천해주는 장면]( ./copilot.jpg )

### 코드 조사하기

몇몇 기능을 제외하고 전부 `sa`로 시작하도록 명령을 설정해 두었다. `a`는 analyze.

#### docstring

docstring을 보는 것은 엄청 쉽다.
vim 전통의 명령 `K`를 입력하면 된다.

다음은 `apply`에 커서를 두고 `K`를 입력한 것이다.

![K로 docstring 보기]( ./iced-k-docstring.jpg )

#### 사용하는 곳들 조사하기

`sar`를 입력하면 커서가 위치한 엘리먼트, 심볼, 함수 등을 사용하는 곳을 모두 조사해서 목록으로 만들어 준다.

![apply 함수를 사용하는 곳들]( ./iced-references.jpg )

목록에서 엔터를 입력하면 해당 파일의 해당 라인으로 이동하게 된다.

`sa/`는 grep을 사용할 수 있다. 키워드, 문자열까지 찾아주므로 `sar`보다 더 많은 검색결과가 나온다.

![sa/를 사용한 모습]( ./iced-grep.jpg )

위의 이미지는 문자열 안에 있는 `중복`에 커서를 놓고 `sa/`를 실행한 것이다.
검색 결과를 보면 문자열은 물론이고 주석까지 전부 찾아주고 있다.

#### 의존관계 조사하기

`sad`로 커서가 위치한 함수가 어떤 다른 함수나 상수들에 의존하는지 확인할 수 있다.

![의존관계 리스트]( ./iced-dependencies.jpg )

위의 스크린샷은 `solve-8-1` 함수가 어떤 사용자 함수를 사용하고 있는지 조사한 것이다.

- `strings->codes`, `run-operation-list` 이렇게 두 함수를 사용하고 있다.
    - dependencies list 영역에서도 엔터 키를 사용해 해당 함수로 이동할 수 있다.
- 오른쪽의 TagBar 영역은 vim 사용자들이라면 익숙하게 사용하는 것으로, 현재 파일에 정의된 모든 상수와 함수 목록을 보여준다. 선택해서 이동하는 기능도 있다.
    - 참고로 TagBar는 vim-iced와는 별개의 플러그인이며 언제든지 켜고 끌 수 있다.

#### macroexpand

---

---

### plugin 설정

```viml
Plug 'liquidz/vim-iced', {'for': 'clojure'}
Plug 'guns/vim-sexp', {'for': 'clojure'}
```
- 필수 플러그인
    - `vim-iced`
    - `vim-sexp`: vim-iced의 일부 명령이 `vim-sexp`에 의존한다.

```viml
Plug 'neoclide/coc.nvim', {'branch': 'release'}
Plug 'liquidz/vim-iced-coc-source', {'for': 'clojure'}
```

- 자동 완성 플러그인
    - `coc.nvim`: 꼭 coc를 사용하지 않아도 된다. 하지만 나는 coc를 몇 년째 잘 사용하고 있으므로 그대로 사용한다.
    - `vim-iced-coc-source`: vim-iced와 coc와의 통합을 위한 플러그인.

플러그인 설치가 완료되었다면 [coc의 Language Servers 문서 - clojure]( https://github.com/neoclide/coc.nvim/wiki/Language-servers#clojure )를 참고해서 vim 명령으로 clojure coc 설치를 해준다.

```viml
:CocInstall coc-clojure
```

### REPL 다루기

이제 vim에 들어가서 프로젝트 세션을 열거나 clj 파일을 열거나 해서 코딩을 할 수 있다.

다음은 REPL 과 관련된 내 map 설정이다.

```viml
" REPL: - "sr"
autocmd FileType clojure nmap src <Plug>(iced_connect)
autocmd FileType clojure nmap srr <Plug>(iced_stdout_buffer_toggle)
autocmd FileType clojure nmap srd <Plug>(iced_stdout_buffer_clear)
autocmd FileType clojure nmap sri <Plug>(iced_interrupt)
```

나는 vim의 `s`키를 죽이고 프로그래밍 언어별 특수 기능의 prefix로 사용하고 있다.
따라서 위의 `s`로 시작하는 키스트로크는 다음과 같이 생각하고 쓰면 된다.

- `s`-`rc`: Clojure 특수기능 - REPL - Connect
- `s`-`rr`: Clojure 특수기능 - REPL - Toggle REPL Buffer (`r`의 반복이라 누르기 쉽다)
- `s`-`rd`: Clojure 특수기능 - REPL - Delete
- `s`-`ri`: Clojure 특수기능 - REPL - Interrupt (오래 걸리는 평가 중단)

먼저 REPL에 접속해 보자. `src`를 입력하면 iced가 `.nrepl-port`에 저장된 포트를 읽고 알아서 접속한다.

이제 REPL 버퍼를 띄우려면 `srr`을 입력한다. 다시 한 번 더 `srr`을 입력하면 버퍼가 닫힌다.

버퍼에 출력된 내용을 청소하려면 `srd`를 입력한다.

### Code Evaluation

```viml
" Eval Code: - "se"
"  (defn greet [] (println "hello world"))
"                           <--inner-->
"                 <-----outer_list------>
"  <-----------outer_top_list------------>
autocmd FileType clojure nmap s? :vs ~/dotfiles/vim-include/set-clojure.vim<CR>
autocmd FileType clojure vmap se <Plug>(iced_eval_visual)
autocmd FileType clojure nmap see <Plug>(iced_eval_and_print)<Plug>(sexp_outer_list)``
autocmd FileType clojure nmap sew <Plug>(iced_eval_and_print)<Plug>(sexp_inner_element)``
autocmd FileType clojure nmap ser <Plug>(iced_eval_and_print)<Plug>(sexp_outer_top_list)``
autocmd FileType clojure nmap sef :IcedRequire<CR>:echom "file loaded:" expand("%")<CR>
autocmd FileType clojure nmap seF :IcedRequireAll<CR>:echom "Require and reload current file."<CR>
autocmd FileType clojure nmap se<CR> :IcedRefresh<CR>:echom "Reload all changed files on the classpath."<CR>
autocmd FileType clojure nmap seu <Plug>(iced_undef_all_in_ns)
autocmd FileType clojure nmap sex <Plug>(iced_macroexpand_1_outer_list)
autocmd FileType clojure nmap seX <Plug>(iced_macroexpand_outer_list)
autocmd FileType clojure nmap se' <Plug>(iced_eval_at_mark)
autocmd FileType clojure nmap sem <Plug>(iced_eval_at_mark)
```

- `s` - `?`: 도움말, 즉 clojure vim 설정 파일을 열어준다.
- `s` - `ee`: 현재 커서가 위치하고 있는 form을 평가한다.
- `s` - `ef`: 현재 편집중인 파일을 읽는다.
- `s` -`e'`: vim mark가 찍혀 있는 곳을 평가한다.


## Conjure로 Clojure 코딩하기

Clojure + Vim + Conjure로 작업하는 과정을 기록으로 남겨본다.

### REPL 띄우고 vim에서 붙기

먼저 터미널에서 REPL을 띄운다. 명령이 좀 길기 때문에 `__start.sh`라는 셸 스크립트 하나를 만들어서 사용하고 있다.

```bash
#!/usr/bin/env bash

clojure -Sdeps '{:deps {nrepl/nrepl {:mvn/version "0.8.3"}} :aliases {:nrepl {:main-opts ["-m" "nrepl.cmdline"]}}}' -M:nrepl:dev &
```

- 제일 오른쪽에 `-M:nrepl:dev`로 `:dev` alias를 지정한 점에 주목한다.

이 명령을 실행하면 다음과 같은 로그가 출력된다.

```
[main] INFO org.eclipse.jetty.util.log - Logging initialized @12559ms to org.eclipse.jetty.util.log.Slf4jLog
nREPL server started on port 59594 on host localhost - nrepl://localhost:59594
```

nREPL 서버가 시작되었고, 포트가 `59594`라는 것을 알 수 있다.

만약 유효하지 않은 alias라면 다음과 같이 경고가 뜬다.
이런 경우에는 해당 alias가 존재하는지 확인해 주도록 한다.

```
WARNING: Specified aliases are undeclared and are not being used: [:dev]
nREPL server started on port 59594 on host localhost - nrepl://localhost:59594
```

이제 vim을 실행하고 프로젝트 세션으로 붙는다.

![vim을 실행하고 conjure가 자동으로 nrepl에 붙는 장면]( ./conjure-connect.jpg )

vim에 들어가자마자 Conjure가 알아서 `59594` 포트로 접속한다.

만약 자동 접속이 제대로 안 된다면 vim 명령을 써서 수동으로 접속할 수도 있다. 모두 3가지 방법이 있다.

```
:ConjureConnect
:ConjureConnect 59594
:ConjureConnect localhost 59594
```

`:conjureco` 까지 쓰고 탭을 누르면 자동완성이 되므로 일일이 대소문자 지켜가며 쓸 필요가 없다는 점을 기억해두자.












## 환경 설정

- `clojure-lsp` : Clojure Language Server
- `coc.nvim` : lsp와 vim 사용자를 중개해 주며, 잡다한 IDE 기능을 제공해 준다.

그리고 Vim의 Clojure REPL 통합 도구가 필요한데, 둘 중 하나를 사용하면 적절한 것 같다. (둘 다 사용하는 것은 곤란할 수 있다.)

둘 다 vim에서 Lisp 계열 언어들의 대화형 환경을 구성해 준다는 공통점이 있다.

- `conjure`
    - 깔끔한 REPL 화면과 편리한 키 매핑을 제공한다.
    - IntelliJ + Cursive와 비슷한 느낌을 준다.
    - REPL에 붙으려면 `clj` 같은 명령의 사용 방법과 옵션을 어느 정도 이해해야 한다.
    - 문서화가 좀 아쉽다.
    - session 관련 버그가 있다. 해결하기 쉽지 않다.
- `vim-iced`
    - `iced`라는 터미널 명령을 제공해 REPL을 쉽게 띄울 수 있다.
    - 머그잔에 들어간 귀여운 핑크색 토끼가 마스코트이다.
    - [문서화]( https://liquidz.github.io/vim-iced/ )가 잘 되어 있는 편이다.
    - "회사에서 개발에 사용하는 데에 지장이 없는 것"을 목표로 개발되고 있는 프로젝트이다.

### clojure-lsp 설치

가장 먼저 할 일은 Clojure용 Language Server인 clojure-lsp를 설치하는 것이다.

- <https://github.com/clojure-lsp/clojure-lsp >
- <https://clojure-lsp.io/installation/ >

나는 Mac을 사용하고 있으므로 위의 안내 페이지를 읽고 `brew`를 사용해 설치했다.

```sh
brew remove clojure-lsp # if you have old clojure-lsp installed via brew
brew install clojure-lsp/brew/clojure-lsp-native
```

`clojure-lsp --version`으로 설치가 완료되었는지 확인하자.

```sh
$ clojure-lsp  --version
clojure-lsp 2022.01.03-19.46.10
clj-kondo 2021.12.20-SNAPSHOT
```

### coc.nvim 설정

coc.nvim 의 Wiki 페이지에 있는 Language Servers 목록을 보면 반갑게도 Clojure가 있다.

- <https://github.com/neoclide/coc.nvim/wiki/Language-servers#clojure >

위 링크에 나와 있는 설정값을 복사해서 coc.nvim의 설정 파일에 추가해주면 된다.

`:CocConfig`명령으로 `coc-settings.json`[^coc-config-file]을 열고, 다음과 같이 clojure-lsp 설정을 추가하자.

```jsonc
"languageserver": {
    "clojure-lsp": {
        "command": "bash",
        "args": ["-c", "clojure-lsp"],
        "filetypes": ["clojure"],
        "rootPatterns": ["project.clj", "deps.edn"],    // deps.edn 추가
        "additionalSchemes": ["jar", "zipfile"],
        "trace.server": "verbose",
        "initializationOptions": {
            "ignore-classpath-directories": true
        }
    }
}
```

주의: coc config가 비어 있는 파일이라면 "languageserver"를 감싸는 중괄호도 추가해야 한다.

나는 회사에서 `deps.edn`을 사용하고 있으므로, coc.nvim에서 제공하고 있는 예제에 `deps.edn`을 추가했다.

### conjure

- <https://github.com/Olical/conjure >

conjure는 neovim을 위한 대화식 소프트웨어 개발 도구인데, Clojure nREPL 통합 기능을 제공한다.

나는 vim-plug를 사용하므로 `init.vim`에 다음과 같이 추가해 주었다.

```viml
Plug 'Olical/conjure'
```

이러면 설치는 끝이다.

이제 vim 설정을 해줘야 한다.

좀 더 내 손에 맞게 사용하기 위해 다음과 같이 설정해 주었다.

```viml
augroup vim_conjure
    " Goto the definition
    autocmd FileType clojure nmap <silent> <C-]> <localleader>gd
    let g:conjure#mapping#prefix = "<leader>"
augroup END
```

이렇게 하면 다음과 같이 사용할 수 있게 된다.

- `<leader>ee` : 현재 커서가 놓인 form을 평가한다.
- `<leader>eb` : 현재 편집중인 버퍼를 평가한다.
- `<leader>lv` : 화면 오른쪽에 REPL 출력 버퍼를 띄운다.

#### REPL을 띄우고 conjure로 붙기

이제 REPL이 떠 있을 때 vim을 실행하면 conjure가 자동으로 연결을 해 줄 것이다.

`deps.edn` 파일이 있는 프로젝트 루트에 가서 REPL을 띄운다.
(자세한 내용은 `clojure --help` 참고)

```sh
clojure -Sdeps '{:deps {nrepl/nrepl {:mvn/version "0.8.3"}} :aliases {:nrepl {:main-opts ["-m" "nrepl.cmdline"]}}}' -M:nrepl:dev
```

그러면 nREPL 서버가 시작되면서, host 주소와 port 번호를 알려준다.
아래는 서버가 시작되며 출력된 첫 두 줄의 예이다.

```
[main] INFO org.eclipse.jetty.util.log - Logging initialized @9923ms to org.eclipse.jetty.util.log.Slf4jLog
nREPL server started on port 58617 on host localhost - nrepl://localhost:58617
```

위의 로그에서는 `58617` 포트에서 REPL이 시작되었다는 것을 알 수 있다.

(이 포트 번호는 랜덤으로 지정되며, 화면을 굳이 확인하지 않아도 해당 경로의 `.nrepl-port` 파일을 열어 포트 번호를 확인할 수 있다.)

특별히 뭔가 달라지지 않는다면 다음번에 REPL을 시작해도 같은 포트 번호에 붙는다.


이제 vim을 열고 프로젝트의 `deps.edn`이 있는 경로를 루트로 삼는 세션을 연다.

별다른 문제가 없다면 자동으로 연결되며, vim 화면 오른쪽 위에 다음과 같이 출력된다.

```
; --------------------------------------------------------
; localhost:58617 (connected): server/.nrepl-port
; --------------------------------------------------------
; Assumed session: Entlebucher Mountain Dog (Clojure)
```

만약 다른 포트에 떠 있는 REPL에 연결하고 싶다면 수동으로 연결해주면 된다.

가령 `58617` 포트에 붙는다면 vim 커맨드 라인에서 다음 명령을 입력해주면 된다.

```
:ConjureConnect 58617
```

`:ConjureConnect`는 세 가지 방법으로 사용할 수 있으니 상황에 맞춰 쓰면 된다.

- `:ConjureConnect` : 자동으로 붙기
- `:ConjureConnect 5678` : host 주소는 localhost로 하고, 포트 번호를 지정해서 붙기
- `:ConjureConnect staging.my-app.com 5678` : host 주소와 포트 번호를 지정해서 붙기

항상 자동으로 붙은 REPL만 쓰는 게 아니라 가끔씩 다른 REPL에 붙을 일이 생길 수 있으므로 기억해 둘 필요가 있다.

심심하다면 IntelliJ의 Cursive를 통해 띄운 REPL에 붙어보자. Eclim과 같이 IntelliJ를 vim 플러그인처럼 쓰는 기분을 느낄 수 있다.

### vim-iced

conjure가 훌륭하긴 하지만 session과 관련된 버그가 있어 매우 골치가 아팠다.

[vim-iced]( https://liquidz.github.io/vim-iced/ )는 conjure의 대안으로 충분하다 생각한다.

단 conjure보다 iced가 좀 더 기능이 많고 통합적인 환경을 지향하는 것으로 보인다.

설치는 어렵지 않다.

```viml
Plug 'liquidz/vim-iced', {'for': 'clojure'}
```

다음과 같이 설정해서 기본 키 맵핑을 사용할 수 있도록 해주자.

```viml
let g:iced_default_key_mapping_leader = '<Leader>'
let g:iced_enable_default_key_mappings = v:true
```

`.bashrc`나 `.bash_profile`에 `iced` 명령의 PATH도 추가해 주자.

```
export PATH="$PATH:~/.vim/plugged/vim-iced/bin"
```

## 편집 설정

### vim-sexp

- <https://github.com/guns/vim-sexp >
- 도움말은 `:help vim-sexp`.

vim-sexp를 설치하면 Lisp 편집에 유용한 다양한 키 매핑을 사용할 수 있다. 몇 가지만 소개해 보자.

#### slurp, barf

`<M-S-h>`, `<M-S-j>`, `<M-S-k>`, `<M-S-l>`로 사용할 수 있다.

![slurp, barf]( ./slurp-barf.gif )

이 영상에서는 `[ ]`만 움직이고 있지만, 실제로는 모든 종류의 Lisp 괄호에서 잘 작동한다. (`< >`에 대해서는 작동하지 않는다.)

| 키 조합 (Mac)        | 동작                            |
|----------------------|---------------------------------|
| `option + shift + h` | 여는 괄호 `( { [` 를 왼쪽으로   |
| `option + shift + j` | 여는 괄호 `( { [` 를 오른쪽으로 |
| `option + shift + k` | 닫는 괄호 `) } ]` 를 왼쪽으로   |
| `option + shift + l` | 닫는 괄호 `) } ]` 를 오른쪽으로 |

#### swap

`<M-h>`, `<M-j>`, `<M-k>`, `<M-l>`로 사용할 수 있다.

![swap]( ./swap.gif )

| 키 조합 (Mac) | 동작                             |
|---------------|----------------------------------|
| `option + h`  | 원소를 다음 원소와 스왑한다.     |
| `option + j`  | 리스트를 다음 리스트와 스왑한다. |
| `option + k`  | 리스트를 이전 리스트와 스왑한다. |
| `option + l`  | 원소를 이전 원소와 스왑한다.     |

#### 텍스트 오브젝트

sexp는 다양한 텍스트 오브젝트를 제공한다.
(다만 vim-surround가 있다면 sexp의 몇몇 텍스트 오브젝트는 아예 쓸 일이 없다.)

| 키         | 의미          | 참고                                                                   |
|------------|---------------|------------------------------------------------------------------------|
| `af`, `if` | form          | surround의 `i(`, `a(`, `i{`, `i[`, ... 등이 더 편리하고 더 직관적이다. |
| `aF`, `iF` | to-level form |                                                                        |
| `as`, `is` | String        | surround의 `i"`, `a"`가 더 직관적이다.                                 |
| `ae`, `ie` | element       | `aW`, `iW`로도 대부분 커버될 것 같지만 `e`는 매크로 캐릭터를 포함한다. |

#### 커서 모션

| 키               | 의미                                    | 참고                                                                             |
|------------------|-----------------------------------------|----------------------------------------------------------------------------------|
| `(`, `)`         | 여는 괄호, 닫는 괄호로 이동한다.        | `F(`와 비슷하지만 행이 달라도 작동하며, `{`과 `[`에도 된다.                      |
| `<M-b>`, `<M-w>` | 이전, 다음 엘리먼트로 이동한다.         | 그냥 `b`랑 `w`를 써도 비슷해서 잘 안 쓸 것 같다.                                 |
| `\[[`, `]]`      | 이전, 다음 톱 레벨 엘리먼트로 이동한다. | 개행만 잘 했다면 `{`, `}`로도 되긴 한다. 즉 `def`, `defn` 단위로 이동할 수 있다. |

#### insert mode 보조

- 여는 괄호나 쌍따옴표를 입력할 때 닫는 괄호, 닫는 쌍따옴표를 함께 입력해주는 보조 기능이 있다.
- 삭제할 때에도 내용을 모두 지우고 여는 괄호/쌍따옴표를 지우면 닫는 괄호/쌍다옴표도 함께 지워준다.

### parinfer

parinfer 에디터 플러그인에 대해서는 [shaunlebron.github.io]( https://shaunlebron.github.io/parinfer/#editor-plugins )에서 정보를 얻을 수 있었다.

다만 [vim-parinfer]( https://github.com/bhurlow/vim-parinfer )는 On/Off 조절이 편리하지 않았기 때문에 [parinfer-rust]( https://github.com/eraserhd/parinfer-rust )를 사용하기로 했다.

parinfer-rust는 rust로 작성되었기 때문에 그냥 `Plug`를 연결하면 안 되고, 빌드를 해 줘야 한다. 따라서 다음과 같이 `Plug`를 선언해주면 된다.

```
Plug 'eraserhd/parinfer-rust', {'do': 'cargo build --release'}
```

- `:ParinferOff`, `:ParinferOn` : parinfer를 끄고 켠다.

#### 문제점: 기본 상태가 On 이다

parinfer의 기본 상태가 On 이기 때문에, 빌트인 라이브러리를 열어봤을 때에도 포매팅을 하여 변경사항이 발생하는 문제가 있다.

따라서 사용하지 않기로 결정. 만약 기본 상태를 Off로 하려 한다면 다음과 같이 설정하는 것을 고려할 수 있을 것이다.

```viml
augroup vim_conjure
    autocmd BufRead,BufNewFile *.clj ParinferOff
augroup END
```

## 주석

[^coc-config-file]: 보통 `~/.config/nvim/coc-settings.json` 경로에 있다.

