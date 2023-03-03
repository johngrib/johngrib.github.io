---
layout  : wiki
title   : Neovim에서 Clojure 코드를 작성하자
summary : vim-iced까지 이르는 삽질과 고민의 기록
date    : 2022-01-09 22:53:22 +0900
updated : 2022-12-17 12:34:46 +0900
tag     : clojure vim
resource: C8/18B9F8-7A97-432E-9CEC-795E39AB8608
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
    - 코드를 평가하면 stdout 출력만 REPL 버퍼에 띄워주는 것이 불만이었다. IntelliJ + Cursive나 VsCode + Calva 는 stdout도 출력하고 평가 결과도 출력해주니까 굉장히 불편하게 느껴졌고 그래서 vim-iced의 첫인상도 좋지 않았다. 그러나 결국 해결 방법을 찾아서 다른 환경에서의 REPL과 비슷하게 사용할 수 있었다.
    - Conjure와 달리 REPL이 평범한 버퍼여서 session 문제가 없다.
    - 머그잔에 들어간 귀여운 핑크색 토끼가 마스코트이다.
    - [문서화]( https://liquidz.github.io/vim-iced/ )가 잘 되어 있는 편이다.
    - lsp 통합이 잘 되어 있어서 어지간한 기능은 대부분 vim-iced에서 wrapping해서 제공한다.

Conjure와 vim-iced 를 왔다갔다 하면서 vim을 사용했다.
처음에는 Conjure가 훨씬 좋다고 느꼈는데, 사용하면 할수록 vim-iced가 나에게 더 맞는 도구라는 생각이 들었다.

## 공통 환경 설정

- `clojure-lsp` : Clojure Language Server
- `coc.nvim` : lsp와 vim 사용자를 중개해 주며, 잡다한 IDE 기능을 제공해 준다.


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

#### 방법1. coc-clojure 설치

[coc의 Language Servers 문서 - clojure]( https://github.com/neoclide/coc.nvim/wiki/Language-servers#clojure )에서 추천하는 방법이다.

간단하게 [coc-clojure]( https://github.com/NoahTheDuke/coc-clojure )를 설치하면 된다.

```viml
:CocInstall coc-clojure
```


#### 방법2. clojure-lsp를 사용하도록 설정

>
주의: coc-clojure를 설치하는 것이 더 편리하기 때문에 이 방법은 권장하지 않는다. coc-clojure를 사용할 수 없는 경우에 이 방법을 쓸 것.
{:style="background-color: #ecf1e8;"}

다음 설정을 복사해서 coc.nvim의 설정 파일인 `coc-settings.json`[^coc-config-file]에 추가해주면 된다.

`:CocConfig`명령으로 `coc-settings.json`[^coc-config-file]을 열고, 다음과 같이 clojure-lsp 설정을 추가하자.

```jsonc
{
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
}
```

나는 회사에서 `deps.edn`을 사용하고 있으므로, coc.nvim에서 제공하고 있는 예제에 `deps.edn`을 추가했다.

- [참고 설정 파일 링크]( https://github.com/johngrib/dotfiles/blob/db2279bcae1b0b519f9236757afbc845e587e86f/nvim/coc-settings.json )
    - 2022-10-23 기준
    - languageserver 설정이 포함되어 있으나 사용하지 않아 주석 처리되어 있다.
    - 이 설정이 필요한 경우에 주석을 풀고 사용하면 된다.

### clj-kondo

clj-kondo는 clojure 코드 정적분석기이다.
[Installation 문서]( https://github.com/clj-kondo/clj-kondo/blob/master/doc/install.md )를 참고해 설치하면 된다.

만약 vim-iced를 사용한다면 clj-kondo를 일부러 설치하지 않아도 된다.
vim-iced가 설치하겠냐고 물어본 다음 알아서 설치해준다.

## Clojure + Vim + vim-iced 로 Clojure 코딩하기

설정을 마친 다음, 내가 어떻게 Clojure로 코딩하고 있는지를 기록으로 남겨본다.

`s`는 내가 프로그래밍 언어별로 특화된 기능을 붙일 때 쓰는 키이다.
따라서 Clojure 코딩과 관련된 vim 명령은 `s`로 시작하도록 매핑해 두었다.

- `sss`: vim-iced 명령 검색 메뉴 띄우기.

```vim
autocmd FileType clojure nmap sss :IcedCommandPalette<CR>
```

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

참고로 vim-iced의 매뉴얼을 읽어보면 `iced` 명령이 어떤 설정들을 래핑한 것인지 짐작할 수 있다.

```
                                                    *vim-iced-manual-leiningen*
LEININGEN~

  $HOME/.lein/profile.clj
>
  {:user
   {:dependencies [[nrepl "0.9.0"]
                   [com.github.liquidz/iced-nrepl "1.2.8"]
                   [cider/cider-nrepl "0.28.2"]]
    :repl-options {:nrepl-middleware [cider.nrepl/wrap-classpath
                                      cider.nrepl/wrap-clojuredocs
                                      cider.nrepl/wrap-complete
                                      cider.nrepl/wrap-debug
                                      cider.nrepl/wrap-format
                                      cider.nrepl/wrap-info
                                      cider.nrepl/wrap-macroexpand
                                      cider.nrepl/wrap-ns
                                      cider.nrepl/wrap-out
                                      cider.nrepl/wrap-spec
                                      cider.nrepl/wrap-test
                                      cider.nrepl/wrap-trace
                                      cider.nrepl/wrap-undef
                                      cider.nrepl/wrap-xref
                                      iced.nrepl/wrap-iced]}
    :plugins [[refactor-nrepl "3.3.2"]]}}
```

### vim에서 REPL에 접속하기

#### 방법1. 띄워둔 REPL에 접속하기

REPL과 관련된 명령은 모두 `sr`로 시작하도록 설정해 보았다.

![]( /resource/C8/18B9F8-7A97-432E-9CEC-795E39AB8608/iced-src.gif )

- `src`: REPL 접속. (`c`: connect)

`src`를 입력해서 REPL에 접속할 수 있다.
접속이 완료되면 왼쪽 아래에 흐릿하게 `connected`라고 표시된다.

접속할 때 현재 편집중인 파일도 함께 읽어들인다.

#### 방법2. vim 안에서 REPL을 띄우고 접속하기

에디터 안에서 REPL을 띄우고 접속하는 방법을 Jack In 이라 부른다.

- `srj`: Jack In. (`j`: jack in)

이것도 접속이 완료되면 `connected`라고 표시된다.

Jack In을 기본값 외의 설정으로 작동하게 하기 위해서는 다음 두 변수를 지정해 줘야 한다.

- `g:iced#nrepl#connect#iced_command`
    - `iced` 명령의 경로. 기본값은 `iced`.
- `g:iced#nrepl#connect#jack_in_command`
    - REPL을 실행할 전체 명령.

위의 두 변수를 설정해주지 않으면 기본값인 `iced repl` 로 Jack In이 작동하게 된다.


### 코드 평가하기

코드 평가와 관련된 명령은 모두 `se`로 시작하도록 설정해 두었다.
가장 많이 쓰는 것은 `sef`, `ser`, `see`.

(`sef`와 `ser`은 Cursive의 `command + shift + L`, `command + shift + P`에 해당한다.)

![vim-iced로 Clojure 코드를 평가하는 gif]( /resource/C8/18B9F8-7A97-432E-9CEC-795E39AB8608/iced-eval.gif )

- `sef`: 파일을 읽고 평가한다. (`e`: eval, `f`: file)
- `ser`: 커서 위치의 outer form을 평가하고 결과를 출력한다. (`r`: oute**r**, 그리고 위치가 좋아서 선택.)
- `see`: 커서 위치의 form을 평가한다. (`ee`: 두 번 반복해 누르는 vim 설탕)
- `sew`: 커서 위치의 element를 평가한다. (`w`: word)
- `sea`: classpath의 모든 변경된 파일을 다시 읽는다. (프로젝트 전체를 읽는다)
- `seA`: classpath의 모든 파일을 읽는다. (프로젝트 전체를 읽는다)
- `seu`: 현재 네임스페이스의 모든 `def`를 undef 한다.
    - (`seu` `sef`를 쓰면 파일을 다시 읽기 위해 REPL을 껐다 켜지 않아도 된다)

vim 답게 물 흐르듯이 부드럽게 순서대로 입력할 수 있도록 키 위치에 신경을 썼다.
`ser`은 세 손가락으로 순서대로 누르므로 손가락이 꼬이지도 않는다.
`w < e < r < f` 순으로 범위가 커지는 것도 마음에 든다. `a`는 `g`로 할까 하다가 `all`의 의미를 강조하고 싶어 `a`로 정했다.

![ser을 입력하는 경우의 키보드 키 입력 순서]( /resource/C8/18B9F8-7A97-432E-9CEC-795E39AB8608/iced-ser-keyboard.jpg ){:style="max-width:300px"}

`see`나 `sew`는 자주 사용하는 건 아니지만 가끔 표현식을 더 섬세하게 평가할 필요가 있을 때 유용하다.
아래와 같은 코드가 있고, 커서가 셋째 줄의 `ten`에 있다고 하자.

```clojure
(def ten 10)
(str
  (* 1000 (+ ten 3)))
;             ↑
```

- `sew`: `ten`을 평가한다. REPL에 `10`이 출력된다. **즉, 상수값 확인에 편리하다.**
- `see`: `(+ ten 3)`을 평가한다. REPL에 `13`이 출력된다.
- `ser`: `(str .. )`을 평가한다. REPL에 `"13000"`이 출력된다.

평가 결과를 바로 주석으로 남기는 방법도 마련해 두었다. 중간에 `c`를 끼워넣으면 된다. (`c`: comment)

![sec를 사용하는 모습]( /resource/C8/18B9F8-7A97-432E-9CEC-795E39AB8608/iced-sec.gif )

- `secw`: `sew`로 평가하고 결과를 오른쪽에 주석으로 남긴다.
- `sece`: `see`로 평가하고..
- `secr`: `ser`로 평가하고..

한편, vim의 특성을 정말 잘 살린 평가 방법도 있다. vim mark를 지정해 놓고 mark를 평가하는 방법인데, 이렇게 하면 커서가 위치하지 않은 곳의 표현식도 평가할 수 있다.

![sem을 사용하는 장면]( /resource/C8/18B9F8-7A97-432E-9CEC-795E39AB8608/iced-sem.gif )

이 gif는 `a`,`b`,`C` 마크를 지정하고 평가하는 모습을 찍은 것이다.

- `sem`: vim mark가 있는 위치를 평가한다. (`m`: mark)
    - mark를 찍어놓고 계속 평가할 수 있으므로 커서를 갖다 놓지 않아도 된다.
    - 대문자 마크로 다른 파일에 있는 마크도 평가할 수 있다. 즉  `(run-tests)`를 파일 이동 없이 실행 가능하다.
    - vim mark를 모두 쓸 수 있다. 즉, `sema`, `semb`, `semc` .. `semz`를 사용할 수 있다. 대문자까지 합치면 수가 상당하다.

한편 REPL stdout 버퍼가 열려 있지 않을 경우의 평가 결과는 다음과 같이 보여준다.

![REPL 팝업]( /resource/C8/18B9F8-7A97-432E-9CEC-795E39AB8608/iced-repl-popup.jpg )

- 만약 REPL 버퍼가 열려 있지 않다면 오른쪽에 팝업이 잠시 떠서 결과를 보여준 다음 사라진다.
- 어떤 방식으로든 평가를 하면 공통적으로 코드 오른쪽에 평가 결과가 잠시 회색으로 표시되다가 잠시 후에 사라진다.
- 하단의 메시지 출력 바에도 평가 결과가 나타난다.
- REPL의 `#1`, `#2`, `#3`과 같이, 평가 결과는 1번 레지스터에 저장된다. 평가가 누적될수록 2, 3, .. 9 숫자 레지스터로 밀리게 된다.
    - 평범한 vim 레지스터에 저장된 것이기 때문에 `:reg`로 볼 수도 있고, `p`로 붙여넣을 수도 있고, Vimscript로 조작할 수도 있다. 신경을 좀 쓴다면 `@` 매크로로 활용할 수도 있다.

위의 기능들을 사용하기 위해 설정은 다음과 같이 했다.

```vim
" Eval Code: - "se"
"  (defn greet [] (println "hello world"))
"                           <--inner-->
"                 <-----outer_list------>
"  <-----------outer_top_list------------>
autocmd FileType clojure vmap se <Plug>(iced_eval_visual)

autocmd FileType clojure nmap s? :vs ~/dotfiles/vim-include/set-clojure.vim<CR>
autocmd FileType clojure nmap see <Plug>(iced_eval_and_print)<Plug>(sexp_outer_list)``
autocmd FileType clojure nmap sew <Plug>(iced_eval_and_print)<Plug>(sexp_inner_element)``
autocmd FileType clojure nmap ser <Plug>(iced_eval_and_print)<Plug>(sexp_outer_top_list)``
autocmd FileType clojure nmap sef :IcedRequire<CR>:echom "file loaded:" expand("%")<CR>
autocmd FileType clojure nmap seF :IcedRequireAll<CR>:echom "Require and reload current file."<CR>
autocmd FileType clojure nmap sea :IcedRefresh<CR>:echom "Reload all changed files on the classpath."<CR>
autocmd FileType clojure nmap seA :IcedRefreshAll<CR>:echom "Reload all files on the classpath."<CR>
autocmd FileType clojure nmap seu <Plug>(iced_undef_all_in_ns)
autocmd FileType clojure nmap se' <Plug>(iced_eval_at_mark)
autocmd FileType clojure nmap sem <Plug>(iced_eval_at_mark)
```

- `s?`: Clojure 관련 vim 설정 파일을 본다. 도움말처럼 쓰려고 이렇게 설정했다.
- `vmap se`: 위에서는 설명하지 않았는데, visual 모드일 때 `se`를 입력하면 선택한 영역을 평가한다.
- `sef`, `seF`, `sea`에 `:echom`을 붙인 이유는 이 명령들이 아무런 메시지가 없이 끝나서 실행에 들어갔는지를 알 수 없었기 때문이다.
- `sem`은 vim mark라는 것을 강조하기 위해 `se'`로도 쓸 수 있게 했다.

### REPL 다루기

이제 REPL을 열어보자. REPL 조작은 `sr`로 시작한다.

- `src`: REPL에 연결한다. (`c`: connect)
    - (사실 `src`를 일일이 입력하지 않아도 `ser` 처럼 코드를 평가하려고 해도 알아서 접속한다.)
- `srr`: REPL 버퍼를 열었다 닫았다 한다. (`rr`: vim 반복명령 설탕)
- `srd`: REPL 버퍼의 내용을 전부 지운다. (`d`: delete)
- `sri`: REPL에 인터럽트를 보낸다. 오래 걸리는 작업을 취소할 때 쓸 수 있다. (`i`: interrupt)
- `srj`: REPL을 띄우고 Jack In 한다. (`j`: jack in)

![화면 오른쪽에 나타난 REPL 버퍼]( /resource/C8/18B9F8-7A97-432E-9CEC-795E39AB8608/iced-repl-on-right.jpg )

화면 오른쪽의 버퍼가 REPL 이다. 평가 결과들이 출력되어 있는 것을 볼 수 있다.

설정은 이렇게 하였다.

```viml
" REPL: - "sr"
autocmd FileType clojure nmap srr <Plug>(iced_stdout_buffer_toggle)
autocmd FileType clojure nmap srd <Plug>(iced_stdout_buffer_clear)
autocmd FileType clojure nmap src <Plug>(iced_connect)
autocmd FileType clojure nmap sri <Plug>(iced_interrupt)
```

Jack In의 경우는 프로젝트 별로 실행 옵션을 다르게 줄 필요가 있어서 옵션을 선택하거나 직접 입력하는 기능을 넣었다.

```viml
autocmd FileType clojure nmap srj :call popup_menu#open([' ', ' -A:dev:itest:test', ' 직접입력'], {selected -> <SID>jack_in(selected)})<CR>

" Jack In을 수행한다
function! s:jack_in(selected)
    call Noti_pipe(v:null, 'REPL을 시작합니다.')
    if a:selected == ' 직접입력'
        let l:options = input('options: ', '-A:dev:itest:test')
    else
        let l:options = a:selected
    endif
    let g:iced#nrepl#connect#jack_in_command = g:iced#nrepl#connect#iced_command . ' repl ' . l:options
    IcedJackIn
endfunction
```

첫 번째 줄의 `popup_menu#open`은 [kamykn/popup-menu.nvim]( https://github.com/kamykn/popup-menu.nvim ) 플러그인이 필요하다.

### 코드 자동완성

#### 함수, 심볼, 키워드, 문자열, 주석

다음은 `(s`를 입력했을 때 자동완성 추천이 나타나는 장면을 찍은 것이다.

![자동완성 추천]( /resource/C8/18B9F8-7A97-432E-9CEC-795E39AB8608/iced-code-suggestion.jpg )

- 왼쪽 하이라이트 메뉴에서는 완성할 코드를 선택할 수 있다.
- 하이라이트 메뉴 오른쪽은 선택한 코드의 docstring과 clojuredocs.org 조회 결과를 보여준다.
- `clojure.core`만 보여주는 게 아니라 내가 만든 `def`나 함수도 잘 보여준다.

물론 키워드도 자동완성 추천에 나타난다.

![키워드 추천]( /resource/C8/18B9F8-7A97-432E-9CEC-795E39AB8608/iced-coc-keyword.jpg )

그리고 vim 자체의 기능 덕분에 `;` 주석이나 문자열 내에 있는 단어도 자동완성 추천에 나타난다.

![문자열 추천]( /resource/C8/18B9F8-7A97-432E-9CEC-795E39AB8608/iced-completion-string.jpg )

물론 그 외에도 `abbr`, `iabbr` 같은 vim의 기본 자동완성들도 사용 가능하므로, 필요한 것들을 만들어 쓰면 된다.

자세한 내용은 [[/vim/auto-completion]] 문서 참고.

#### ultisnips

vim으로 코딩을 하는데 ultisnips를 안 쓰면 vim의 매력이 확 줄어든다.

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

![ultisnips를 사용하는 모습]( /resource/C8/18B9F8-7A97-432E-9CEC-795E39AB8608/ultisnips-java-interop.gif )

`"fred".toUpperCase`를 입력하고 `tab`을 누르면 `(.toUpperCase "fred")`로 변환되는 것을 볼 수 있다.

다음은 문득 생각나서 만들어 본 `#_`를 반복 입력해주는 snippet이다.

![ultisnips를 사용하는 모습2]( /resource/C8/18B9F8-7A97-432E-9CEC-795E39AB8608/ultisnips-hash-underbar-repeat.gif )

`4#_`를 입력하고 `tab`을 누르면 `#_#_#_#_`로 완성되는 것을 볼 수 있다.
물론 `100#_`도 되고 `10000#_`도 된다.

시간이 흐르며 ultisnips snippet이 하나 하나 쌓이게 되는데, ultisnips snippet은 자동으로 언어별로 별도로 관리되므로 일종의 cheatsheet로 활용하는 방법도 있다.

한편 ultisnips는 셸에서 실행해서 문자열을 얻을 수 있는 프로그램이라면 무엇이든 활용할 수 있으므로,
자신이 즐겨 쓰는 프로그래밍 언어(Python, JavaScript, Perl 등등)로 자동 완성 기능을 얼마든지 만들어 붙일 수 있다.

![ultisnips와 함께 코딩]( /resource/C8/18B9F8-7A97-432E-9CEC-795E39AB8608/ultisnips-edit.jpg )

위의 스크린샷은 bash의 `date` 명령을 사용하는 자동 완성 snippet을 만들고 실행한 결과를 캡처한 것이다.

`today`를 입력하고 `tab`을 누른 결과 `"Today is 2022.03.19."`로 완성된 것.

ultisnips snippet을 만들며 작업할 때는 위의 스크린샷과 같이 오른쪽에 스니펫 에디터를 띄워놓고 코딩하는 것이 일반적이다.
파일을 리로드하지 않아도 오른쪽에 작성하고 있는 스니펫을 바로 코드 영역에서 사용할 수 있다.


#### github copilot

[copilot]( https://github.com/github/copilot.vim )도 문제 없이 작동하는 것을 확인할 수 있었다.

`(defn factorial`을 입력했더니 함수 본문을 제안해 주고 있다.

![copilot이 함수 완성을 추천해주는 장면]( /resource/C8/18B9F8-7A97-432E-9CEC-795E39AB8608/copilot.jpg )

나는 INSERT 모드에서 `<C-j>`를 통해 copilot 자동완성을 사용한다.

### 코드 조사하기

몇몇 기능을 제외하고 전부 `sa`로 시작하도록 명령을 설정해 두었다. (`a`: analyze)

#### docstring

- `sak` - 전용 버퍼를 열고 docstring 보기. (`k` - vim의 문서 보기 명령 K 에서 따옴)

다음은 `apply`에 커서를 두고 `sak`를 입력한 것이다.

![sak를 사용한 장면]( /resource/C8/18B9F8-7A97-432E-9CEC-795E39AB8608/iced-sak.jpg )

굳이 버퍼를 열어 보는 것이 귀찮다면, man 페이지를 열어주는 vim 전통의 명령 `K`를 입력하면 된다.
이러면 버퍼가 아니라 팝업으로 볼 수 있다.
팝업은 다음 키 입력이 있을 때까지 사라지지 않고 기다려 준다.

![K로 docstring 보기]( /resource/C8/18B9F8-7A97-432E-9CEC-795E39AB8608/iced-k-docstring.jpg )

이 설정은 이렇게 해 주었다.

```viml
autocmd FileType clojure nmap K <Plug>(iced_document_popup_open)
autocmd FileType clojure nmap sak <Plug>(iced_document_open)
```

#### definition으로 점프

vim의 기본 코드 점프 기능인 `control + ]` 으로 함수나 상수가 정의된 곳으로 이동할 수 있게 했다.

vim 기본 기능이기 때문에 `control + o`로 이전 커서 위치로 돌아갈 수 있고, `control + i`로 앞으로 갈 수도 있다.

```viml
" autocmd FileType clojure nmap <silent> <C-]> <Plug>(coc-definition)
autocmd FileType clojure nmap <silent> <C-]> :IcedDefJump<CR>
```

- 윗줄의 주석처리한 설정은 coc.nvim 의 definition jump 이다.

#### 소스 코드 흘끗 읽기

- `sas`: 커서가 지시하는 함수의 소스 코드를 팝업으로 보여준다. (`s`: source)
- `saS`: 커서가 지시하는 함수의 소스 코드를 작은 버퍼를 열어 보여준다.

다음은 `is`에 커서를 두고 `sas`를 입력했을 때 나타난 팝업을 캡처한 것이다.

![sas를 사용한 모습]( /resource/C8/18B9F8-7A97-432E-9CEC-795E39AB8608/iced-sas.jpg )

```viml
autocmd FileType clojure nmap sas :IcedSourcePopupShow<CR>
autocmd FileType clojure nmap saS :IcedSourceShow<CR>
```

#### clj-kondo로 lint 하기

vim-iced는 clj-kondo와 통합이 되어 있어 문제가 있는 코드에 밑줄을 쳐주고, 커서를 올리면 경고 팝업을 띄워준다.

그런데 아쉽게도 정작 이런 경고 목록을 만들어주는 기능은 없어서 커서를 일일이 문제 위치에 갖다 놓아야만 팝업으로 경고의 내용을 알 수 있다.

하지만 기능이 없다고 못 쓰면 말이 안 된다. `sal`을 입력하면 `clj-kondo`를 실행해 목록을 만들고 quickfix 버퍼에서 보여주도록 하자.

- `sal`: 린터를 실행하고 결과 목록을 보여준다. (`l`: lint)

![quickfix 버퍼를 연 모습]( /resource/C8/18B9F8-7A97-432E-9CEC-795E39AB8608/clj-kondo-quickfix.jpg )

quickfix 버퍼에서 엔터를 치면 경고가 있는 위치로 이동한다.

구현은 다음과 같이 하였다.
`makeprg`로 컴파일러를 지정하고, `errorformat`으로 컴파일러 에러를 해석하는 포맷 문자열을 지정해주면 되는 C 언어 시절의 방식이지만.. 오래된 방법일 뿐 문제없이 잘 동작한다.

```vim
autocmd FileType clojure nmap sal :make<CR>:copen<CR>
" autocmd FileType clojure nmap sal :Dispatch<CR>
autocmd FileType clojure setlocal makeprg=clj-kondo\ --lint\ %
autocmd FileType clojure setlocal errorformat=%f:%l:%c:\ Parse\ %t%*[^:]:\ %m,%f:%l:%c:\ %t%*[^:]:\ %m
```

만약 비동기식으로 작동하길 바란다면 팀 포프의 [vim-dispatch]( https://github.com/tpope/vim-dispatch )를 설치하고
`:make<CR>:copen<CR>` 대신 `:Dispatch` 명령을 사용하면 된다.


#### 사용하는 곳들 조사하기

- `sar`: 커서가 지시하는 아이템을 사용하는 곳을 모두 조사해서 목록으로 만들어 준다.
(`r`: references)

![apply 함수를 사용하는 곳들]( /resource/C8/18B9F8-7A97-432E-9CEC-795E39AB8608/iced-references.jpg )

목록에서 아이템에 커서를 올려놓고 엔터를 입력하면 해당 파일의 해당 라인으로 이동하게 된다.

한편 파일로 저장할 수 있는 형식으로 보는 방법도 있다.

- `sau`: `sar`과 같지만 좀 더 raw format으로 보여준다. (`u`: usages)

![sau를 사용하는 모습]( /resource/C8/18B9F8-7A97-432E-9CEC-795E39AB8608/iced-sau.jpg )

`sau`의 결과는 파일의 이름과 행 번호 열 번호를 목록으로 보여준다.
vim은 기본적으로 파일 이름과 행 번호가 이 포맷으로 주어지면 `gf`, `gF`를 써서 해당 파일의 해당 위치를 바로 열 수 있으므로
quickfix보다 사용성이 더 떨어지지도 않는다. 보기에 좀 덜 예쁠 뿐이다.

- `sa/`: 커서가 위치한 아이템을 검색. (`/`: vim search)

이 방법은 grep과 같다.
키워드, 문자열까지 찾아주므로 `sar`보다 더 많은 검색결과가 나온다.
게다가 clj나 edn 파일 뿐 아니라 다른 확장자를 갖는 파일에서도 찾아주므로 쓸모가 많다.

![sa/를 사용한 모습]( /resource/C8/18B9F8-7A97-432E-9CEC-795E39AB8608/iced-grep.jpg )

위의 이미지는 문자열 안에 있는 `중복`에 커서를 놓고 `sa/`를 실행한 것이다.
검색 결과를 보면 문자열은 물론이고 주석까지 전부 찾아주고 있다.

설정은 아래와 같이 해 주었다. `sau`에는 `gF`를 잊지 말라고 출력 문구를 달아주었다.

```viml
autocmd FileType clojure nmap sar :IcedBrowseReferences<CR>
autocmd FileType clojure nmap sau :IcedUseCaseOpen<CR>:echom "list use case: gF to open file"<CR>
autocmd FileType clojure nmap sa/ <Plug>(iced_grep)
```

#### 의존관계 조사하기

- `sad`: 커서가 지시하는 함수가 어떤 다른 함수나 상수들에 의존하는지 확인한다. (`d`: dependencies)

![의존관계 리스트]( /resource/C8/18B9F8-7A97-432E-9CEC-795E39AB8608/iced-sad.jpg )

위의 스크린샷은 `solve-8-1` 함수가 어떤 사용자 함수를 사용하고 있는지 조사한 것이다.

- `strings->codes`, `run-operation-list` 이렇게 두 함수를 사용하고 있다.
    - dependencies list 영역에서도 엔터 키를 사용해 해당 함수로 이동할 수 있다.

```viml
autocmd FileType clojure nmap sad :IcedBrowseDependencies<CR>
```

#### 파일 구조 확인하기

파일 구조는 [tagbar]( https://github.com/preservim/tagbar )를 통해 확인하면 된다.
tagbar는 오랜 세월 vim 사용자들의 사랑을 받은 플러그인이다.

![tagbar를 띄운 모습]( /resource/C8/18B9F8-7A97-432E-9CEC-795E39AB8608/clojure-access-symbol.jpg )

- 오른쪽의 TagBar 영역은 vim 사용자들이라면 익숙하게 사용하는 것으로, 현재 파일에 정의된 모든 상수와 함수 목록을 보여준다.
- 목록에서 선택하면 해당 위치로 이동한다.

tagbar를 잘 쓰려면 [[/ctags]] 사용법을 조금은 알아야 하며, 백그라운드에서 tags 파일을 생성하는 방법도 준비해야 한다.
(tags 파일은 프로젝트 전체의 함수 이름과 주요 변수, 상수, 네임스페이스 등을 정리해두는 인덱스 파일이라 생각하면 된다.
IntelliJ가 항상 갱신하고 있는 그것과 같다.)

나는 백그라운드 tags 갱신은 [vim-gutentags]( https://github.com/ludovicchabant/vim-gutentags )를 사용하고 있는데,
5년 가까이 사용하고 있는데 단 한 번도 불만을 느끼지 못한 멋진 플러그인이다.

vim-gutentags는 git status를 참고해 효율적으로 태그를 갱신한다.

![tagbar로 미리보기를 사용하는 모습]( /resource/C8/18B9F8-7A97-432E-9CEC-795E39AB8608/tagbar.gif )

tagbar는 소스코드 미리보기 기능도 있어서 코드를 브라우징할 때 편리하다.

#### macroexpand

Clojure 코딩을 하다 보면 `macroexpand-1`를 사용할 때도 있다.
REPL에 입력해서 쓰는 방법도 있지만 vim-iced는 고맙게도 래핑 명령을 제공해 준다.

- `sam`: `macroexpand-1`로 매크로를 펼쳐 보여준다. (`m`: macroexpand-1)
- `saM`: `macroexpand`로 매크로를 펼쳐 보여준다. (`M`: macroexpand)

다음 스크린샷은 `->` 매크로를 `sam`으로 펼친 것이다.

![macroexpand-1]( /resource/C8/18B9F8-7A97-432E-9CEC-795E39AB8608/iced-sam.jpg )

```viml
autocmd FileType clojure nmap sam <Plug>(iced_macroexpand_1_outer_list)
autocmd FileType clojure nmap saM <Plug>(iced_macroexpand_outer_list)
```

### Clojure 코딩

- vim의 기본 기능과 [vim-sexp]( https://github.com/guns/vim-sexp )의 도움을 많이 받는다.
- vim-sexp는 vim에서의 s-expression 편집을 위한 플러그인으로 paredit를 대신한다.
- 팀 포프의 vim-surround는 원래 많이 사용하는 플러그인이긴 하지만 Clojure가 괄호를 많이 다루는 프로그래밍 언어이다 보니 특히 빛을 발한다.

#### 괄호 삭제, 입력, 편집, 선택

![괄호를 삭제하는 모습]( /resource/C8/18B9F8-7A97-432E-9CEC-795E39AB8608/sexp-delete.gif )

그냥 앞으로 지우고 있으면 vim-sexp가 닫는 괄호까지 알아서 지워준다.

(그런데 이 기능은 별로 쓸모가 없다. surround의 `dab`가 있기 때문이다.)

![괄호를 추가하는 모습]( /resource/C8/18B9F8-7A97-432E-9CEC-795E39AB8608/sexp-insert-pair.gif )

여는 괄호만 입력해도 닫는 괄호도 자동으로 잘 추가된다. 물론 `( )` 뿐 아니라 `{ }`, `[ ]` 도 잘 된다.

한편, 편집과 선택은 vim 에서 흔하게 사용되는 [vim-surround]( https://github.com/tpope/vim-surround )를 그대로 써도 문제없다.

surround는`y`와 `s`를 사용해 매우 세련되게 vim 언어를 확장하는 훌륭한 플러그인이다.
vim의 텍스트 오브젝트와 함께 사용하면 매우 편리하게 괄호 뿐 아니라 다양한 텍스트 뭉치를 편집할 수 있다.

surround는 약 5분 정도 훈련이 필요하긴 하지만 그 이후로는 게임처럼 재미있게 사용할 수 있다.

이건 나름의 문법이 있어서 공부를 해야 하긴 하지만 대표격인 3가지만 소개한다면 다음과 같다.

- `ys<text object><char>`: 텍스트 오브젝트를 `char`로 감싼다.
- `ds<char>`: 텍스트 오브젝트를 감싸는 `char`를 삭제한다.
- `cs<char><replace>`: 텍스트 오브젝트를 감싸는 `char`를 `replace`로 바꾼다.

surround는 따옴표, 괄호, 스페이스까지 모두 사용이 가능하며 사용자 정의 텍스트 오브젝트도 쓸 수 있기 때문에 굉장히 강력하다.

다음은 이런 기법들을 사용해 괄호나 따옴표 쌍을 조작하고 선택하는 장면을 gif로 만든 것이다.

![vim surround를 사용하는 모습]( /resource/C8/18B9F8-7A97-432E-9CEC-795E39AB8608/surround.gif )

(gif로 만들면서 속도가 빨라졌는데 실제로는 이 정도로 빠르게 작업하지 않는다.)

#### sexp를 사용한 surround 확장

- `dsp`: 부모 form을 삭제한다. (`d`elete `s`urround `p`arent)
- `dso`: 형제 엘리먼트를 삭제한다. (`d`elete `s`urround `o`ther)
- `csp`: 부모 form과 현재 form을 교체한다. (`c`hange `s`urround `p`arent)

sexp의 명령 중 raise list, raise element, convolute를 surround의 개념으로 포섭할 수 있다고 생각했다.
마침 `dsp` ,`dso`, `csp`는 surround 명령과 겹치지 않았다.


```viml
" v는 커서 위치

" 부모 form 삭제
"                            v
" from: (let [foo bar] (if a b c))
" to  : (if a b c)
let g:sexp_mappings.sexp_raise_list = 'dsp'

" 형제 element 모두 삭제하고 혼자 남게 됨
"                            v
" from: (let [foo bar] (if a b c))
" to  : (let [foo bar] b)
let g:sexp_mappings.sexp_raise_element = 'dso'

" convolute - https://stackoverflow.com/a/18192105
"                   v
" from: (+ 1 2 (* 3 4))
" to  : (* 3 (+ 1 2 4))
let g:sexp_mappings.sexp_convolute = 'csp'
```

#### 커서 점프

vim은 기본적으로 괄호짝을 맞춰 커서를 점프시키는 `%` 명령(`shift + 5`)이 있으므로 짝으로의 이동은 이걸 쓴다.

![%를 사용하는 모습]( /resource/C8/18B9F8-7A97-432E-9CEC-795E39AB8608/percent.gif )

vim-sexp 기능으로 `(`, `)`를 쓰면 같은 레벨의 이전 여는 괄호, 다음 닫는 괄호로 이동할 수 있다.

![양쪽 괄호를 사용해 이동하는 모습]( /resource/C8/18B9F8-7A97-432E-9CEC-795E39AB8608/sexp-left-right.gif )

`\[[`와 `]]`로 탑 레벨 엘리먼트 이동을 할 수 있다. vim-sexp 기능.

![양쪽 대괄호 두번으로 이동하는 모습]( /resource/C8/18B9F8-7A97-432E-9CEC-795E39AB8608/sexp-top-move.gif )

`[e`, `]e`를 사용하면 이전, 다음 엘리먼트를 비주얼 모드로 선택할 수 있다.
선택 후 복사하거나 삭제할 때 사용할 수 있을텐데 surround로도 가능해서 잘 쓸 것 같지는 않다.

![이전 다음 엘리먼트를 선택하는 모습]( /resource/C8/18B9F8-7A97-432E-9CEC-795E39AB8608/sexp-visual-move.gif )

그 외에도 다양한 이동 명령을 제공하는데,
아쉬운 것은 워낙 많다 보니 키가 부족했는지 vim스럽지 않게 메타 키 조합이 종종 등장한다는 것.

그런데 팀 포프가 vim-sexp의 이런 키 맵핑에 대해 괜찮은 대안으로
[vim-sexp-mappings-for-regular-people]( https://github.com/tpope/vim-sexp-mappings-for-regular-people )이라는 플러그인을 만들어 둔 바 있다.

이 플러그인을 설치하면 다음 설정을 사용할 수 있다.

```viml
autocmd FileType clojure nmap B   <Plug>(sexp_move_to_prev_element_head)
autocmd FileType clojure nmap W   <Plug>(sexp_move_to_next_element_head)
autocmd FileType clojure nmap gE  <Plug>(sexp_move_to_prev_element_tail)
autocmd FileType clojure nmap E   <Plug>(sexp_move_to_next_element_tail)
autocmd FileType clojure xmap B   <Plug>(sexp_move_to_prev_element_head)
autocmd FileType clojure xmap W   <Plug>(sexp_move_to_next_element_head)
autocmd FileType clojure xmap gE  <Plug>(sexp_move_to_prev_element_tail)
autocmd FileType clojure xmap E   <Plug>(sexp_move_to_next_element_tail)
autocmd FileType clojure omap B   <Plug>(sexp_move_to_prev_element_head)
autocmd FileType clojure omap W   <Plug>(sexp_move_to_next_element_head)
autocmd FileType clojure omap gE  <Plug>(sexp_move_to_prev_element_tail)
autocmd FileType clojure omap E   <Plug>(sexp_move_to_next_element_tail)
```

읽어보면 불필요하게 메타 키(Mac이라면 `option` 키) 조합을 누르지 않아도
vim의 기본 키에 쉬프트만 더 누르면 sexp의 동작을 그대로 사용할 수 있도록 되어 있다는 것을 알 수 있다.
기본 키와 똑같으므로 외울 필요도 없다.

gif는 일일이 찍기 어려워 생략하도록 한다.

#### 커서 점프(INSERT MODE)

- `control + f`: 현재 입력중인 form의 닫는 괄호 바깥으로 점프.
- `control + b`: 현재 입력중인 form의 여는 괄호 바깥으로 점프.

![c-f, c-b를 사용하는 모습]( /resource/C8/18B9F8-7A97-432E-9CEC-795E39AB8608/c-f.gif )

```viml
autocmd FileType clojure imap <C-f> <Esc><Plug>(sexp_move_to_next_bracket)a
autocmd FileType clojure imap <C-b> <Esc><Plug>(sexp_move_to_prev_bracket)i
```

#### slurp, barf, swap

vim-sexp는 이 기능에 대한 복잡한 메타 키 조합을 제공한다.
쓰고 있다보면 vim이 아니라 emacs를 쓰는 기분이 든다.

이것 또한 팀 포프의 vim-sexp-mappings-for-regular-people 설정을 사용하면 적절하다.

```viml
autocmd FileType clojure nmap <i  <Plug>(sexp_insert_at_list_head)
autocmd FileType clojure nmap >a  <Plug>(sexp_insert_at_list_tail)
autocmd FileType clojure nmap <f  <Plug>(sexp_swap_list_backward)
autocmd FileType clojure nmap >f  <Plug>(sexp_swap_list_forward)
autocmd FileType clojure nmap <e  <Plug>(sexp_swap_element_backward)
autocmd FileType clojure nmap >e  <Plug>(sexp_swap_element_forward)
autocmd FileType clojure nmap >(  <Plug>(sexp_emit_head_element)
autocmd FileType clojure nmap <)  <Plug>(sexp_emit_tail_element)
autocmd FileType clojure nmap <(  <Plug>(sexp_capture_prev_element)
autocmd FileType clojure nmap >)  <Plug>(sexp_capture_next_element)
```

직관적인 표현이 마음에 든다.

- slurp
    - `>)`: slurp forward. 닫는 괄호를 오른쪽으로 옮겨서 다음 엘리먼트를 잡아먹는다.
    - `<(`: slurp backward. 여는 괄호를 왼쪽으로 옮겨서 이전 엘리먼트를 잡아먹는다.
- barf
    - `<)`: bark forward. 닫는 괄호를 왼쪽으로 옮겨서 엘리먼트 하나를 토해낸다.
    - `>(`: barf backward. 여는 괄호를 오른쪽으로 옮겨서 첫 번째 엘리먼트를 토해낸다.
- swap
    - `<f`: swap forward. 표현식을 왼쪽 표현식과 자리바꿈한다.
    - `>f`: swap backward. 표현식을 오른쪽 표현식과 자리바꿈한다.
    - `<e`: swap element forward. 엘리먼트를 왼쪽 엘리먼트와 자리바꿈한다.
    - `>e`: swap element backward. 엘리먼트를 오른쪽 엘리먼트와 자리바꿈한다.
- insert 커서
    - `<I`: 현재 표현식의 첫번째 위치를 편집할 수 있도록 커서를 이동시키고 insert 모드로 바꾼다.
    - `>I`: 현재 표현식의 마지막 위치를 편집할 수 있도록 커서를 이동시키고 insert 모드로 바꾼다.

이 표현식의 훌륭한 점은 vim의 `>`와 `<` 명령이 motion 명령이라는 컨벤션을 무시하지 않고 활용했다는 것이다.

따라서 '괄호 이동', '표현식 이동'을 생각할 때 자연스럽게  `<`, `>`를 떠올리게 된다.

게다가 `<`, `>`를 사용하므로 횟수를 지정할 수 있다는 것도 장점이다.
즉 `3>)`는 slurp를 3회 하라는 뜻이다. 세 번 연속 누르는 것보다 vim 스럽다.

![slurp, barf, swap을 사용하는 모습]( /resource/C8/18B9F8-7A97-432E-9CEC-795E39AB8608/sexp-regular.gif )

이 gif에서는 3가지 명령을 사용한다. `3>)`, `2<)`, `3>e`.

#### 텍스트 오브젝트

vim-sexp는 다음과 같이 8개의 텍스트 오브젝트를 제공하므로 surround와 좋은 조합을 보인다.
(다만 surround 가 더 넓은 범위를 커버하므로 sexp의 몇몇 텍스트 오브젝트는 쓸 일이 없다.)

- `af`, `if`: COMPOUND FORMS. surround의 `i(`, `a(`, `i{`, `i[`, ... 등이 더 편리하고 더 직관적이다.
- `aF`, `iF`: top-level COMPOUND FORMS.
- `as`, `is`: STRINGS. surround의 `i"`, `a"`가 더 직관적이다.
- `ae`, `ie`: ELEMENTS. 좋은 텍스트 오브젝트. vim 기본인 `aW`, `iW`로도 대부분 커버될 것 같지만 `ae`, `ie` 는 매크로 캐릭터도 포함한다.

vim-sexp-mappings-for-regular-people을 설치하면 다음과 같이 8개의 텍스트 오브젝트를 제공한다.

- `dsf`: splice (delete surroundings of form)
- `cse(`, `cse)`, `cseb`: surround element in parentheses
- `cse[`, `cse]`: surround element in brackets
- `cse{`, `cse}`: surround element in braces

#### 인덴팅, 파일 포매팅

vim 기본 인덴팅 명령인 `=`, `==`를 사용하면 된다.

vim-sexp는 탑 레벨 form까지 자동으로 포함시키는 `=-`도 제공해 주는데, 사실 텍스트 오브젝트가 있어서 불필요하다.

나는 전체 파일 텍스트 오브젝트로 `iE`, `aE`를 사용하고 있으므로 다음과 같이 전체 파일 포매팅을 할 수 있다.

- `==`: 커서가 지시하는 form 인덴팅 (본래 `==`와는 달리 한 줄만 인덴팅하지 않음)
- `=<텍스트 오브젝트>`: 텍스트 오브젝트를 인덴팅한다.
    - vim 기본 텍스트 오브젝트와 sexp에서 제공하는 텍스트 오브젝트를 모두 사용할 수 있다.
    - `=iE`, `=aE`: 나는 현재 파일 전체를 의미하는 텍스트 오브젝트로 `iE`, `aE`를 사용하고 있다.
- `=[`: `[ ]` 안쪽 vertical align.
- `={`: `{ }` 안쪽 vertical align.

![포매팅하는 모습]( /resource/C8/18B9F8-7A97-432E-9CEC-795E39AB8608/formatting.gif )

이 gif에서는 `==`, `=[`, `={` 를 연달아 사용한다.

`==`는 인덴팅만 해주며, `=[`, `={`는 vertical align이 필요한 상황에서만 써주면 된다.

열 정렬(vertical align)에 대해서는 의견이 분분하다.
나는 변경사항이 다른 라인으로 전파되는 것이 싫어서 열 정렬을 가급적으로 하지 않는 것이 좋다고 생각하고,
가독성 측면에서 장점이 상당한 경우에만 조심스럽게 하자는 입장이다.
물론 열 정렬을 적극적으로 찬성하는 의견도 있다.

- 참고할만한 웹 페이지
    - [bbatsov/clojure-style-guide #10]( https://github.com/bbatsov/clojure-style-guide/issues/10#issuecomment-11990654 )
    - [Vim support for vertically aligning values in Clojure]( https://medium.com/@adamneilson/vim-support-for-vertically-aligning-values-in-clojure-c25406cc58f0 )
    - [junegunn/vim-easy-align #115]( https://github.com/junegunn/vim-easy-align/issues/115#issuecomment-325899234 )

```viml
autocmd FileType clojure nmap == :IcedFormat<CR>
autocmd FileType clojure nnoremap =[ vi[<c-v>$:EasyAlign\ g/^\S/<cr>gv=
autocmd FileType clojure nnoremap ={ vi{<c-v>$:EasyAlign\ g/^\S/<cr>gv=
```

`=[`와 `={`는 [vim-easy-align]( https://github.com/junegunn/vim-easy-align ) 플러그인을 사용한다.

#### 리네임

![리네임하는 모습]( /resource/C8/18B9F8-7A97-432E-9CEC-795E39AB8608/scr.gif )

- `scr`: 심볼 rename. (`c`: code, `r`: rename)

이 기능은 coc.nvim의 `<Plug>(coc-rename)`을 사용한다.

설정 초기에는 vim-iced의 `:IcedRenameSymbol` 사용했지만 다음과 같은 문제가 있었다.

- [jet]( https://github.com/borkdude/jet )에 의존하기 때문에 jet을 설치해 줘야 한다.
    ```bash
    brew install borkdude/brew/jet
    ```
- 연속적으로 rename을 할 때 깔끔하게 되지 않는 느낌이 든다.
- symbol rename 은 잘 되지만 키워드는 지원하지 않는다. [[/cmd/sed]]를 사용하는 도구를 만들어야 할지 고민스러웠다.
- clj-kondo가 바뀐 이름을 인지하지 못하는 경우가 있다.

coc.nvim의 coc-rename은 IcedRenameSymbol에 비해 만족스럽게 잘 작동한다.

단 키워드 리네임은 제공하지 않으니 vim의 기본 substitute를 사용해야 한다.

```viml
" autocmd FileType clojure nmap scR :IcedRenameSymbol<CR>
autocmd FileType clojure nmap scr <Plug>(coc-rename)
```

#### 주석처리

나는 팀 포프의 [vim-commentary]( https://github.com/tpope/vim-commentary )를 오랫동안 사용해오고 있으므로
Clojure 코딩을 하는 동안에도 특별한 설정 없이 그대로 사용하고 있다.

- `gcc`: 한 줄 주석처리.
- `gc<텍스트 오브젝트>`: 텍스트 오브젝트 주석처리.
    - `gcip`: 문단 주석처리.
    - `gciE`: 파일 전체 주석처리. (나는 `iE`, `aE`를 파일 전체로 사용하고 있다.)

![gcc와 gc를 사용하는 모습]( /resource/C8/18B9F8-7A97-432E-9CEC-795E39AB8608/gcc.gif )

#### Discard

엘리먼트나 form 앞에 `#_` 붙여 사용할 수 있는 Discard를 편하게 사용할 수 있도록 설정해 쓰고 있다.

- `sc#`: form에 `#_`를 추가한다.
- `sc3`: 엘리먼트에 `#_`를 추가한다.

`숫자.`과 함께 사용하면 꽤 편리하다.

![sc3, sc#을 사용하는 모습]( /resource/C8/18B9F8-7A97-432E-9CEC-795E39AB8608/sc3.gif )

```viml
autocmd FileType clojure nmap sc# <Plug>(sexp_move_to_prev_bracket)i#_<Esc>``
autocmd FileType clojure nmap sc3 <Plug>(sexp_move_to_prev_element_head)i#_<Esc>l
```

Ultisnips를 써서 `3#_` 처럼 숫자와 조합하면 `#_#_#_` 로 완성해주는 기능도 만들어 쓰고 있다. ( [ultisnips 섹션]( #ultisnips) 참고 )

![ultisnips를 사용해 #_를 입력하는 모습]( /resource/C8/18B9F8-7A97-432E-9CEC-795E39AB8608/ultisnips-hash-underbar-repeat.gif )

#### cycle collection

- `scc`: 컬렉션 리터럴 순환. (`c`: cycle)

`scc`를 입력할 때마다 `#{}`, `{}`, `[]`, `()`로 바꾼다.

![컬렉션 순환을 사용하는 모습]( /resource/C8/18B9F8-7A97-432E-9CEC-795E39AB8608/coc-scc.gif )

```viml
autocmd FileType clojure nmap <silent> scc :call CocAction('runCommand', 'lsp-clojure-cycle-coll')<CR>
```

#### 네임스페이스 관리

- `sna`: 현재 편집중인 파일 최상단의 `ns` `:require`에 사용할 라이브러리를 추가하고 알리아스도 지정해 준다. (`a`: add)

![sna를 사용하는 모습]( /resource/C8/18B9F8-7A97-432E-9CEC-795E39AB8608/iced-sna.gif )

- `snc`: 편집중인 파일 최상단의 `ns` `:require`에서 사용하지 않는 라이브러리를 제거한다. (`c`: clear)
- `sns`: `:require`, `:import` 등 파일 최상단의 `ns` 목록을 정렬해 준다. (`s`: sort)
    - vim 매크로를 사용해 정렬한다. 빠르다. 시간 소요를 거의 못 느낌.

![sns를 사용하는 모습]( /resource/C8/18B9F8-7A97-432E-9CEC-795E39AB8608/require-sort-vim.gif )

- `snS`: `sns`와 같지만 몇 가지 기능이 더 붙어있다.
    - `clojure-lsp`의 `clean-ns`를 사용한다. 느리다. 4~6초 정도 걸린다.

```viml
autocmd FileType clojure nmap sna :IcedAddNs<CR>
autocmd FileType clojure nmap snc :IcedCleanNs<CR>

autocmd FileType clojure nmap sns :call Sort_clojure_namspace_require()<CR>
function! Sort_clojure_namspace_require()
    if input("namespace require list를 정렬하시겠습니까? (y/n)") =~ "y"
        execute "normal! gg/:require ^Mea^M^M^[/))^Mi^M^M^[ggvip}10</[^Mvip:sort^MkkJJ}kJJvip="
    endif
endfunction

autocmd FileType clojure nmap snS :call system("clojure-lsp clean-ns --settings '{:clean {:ns-inner-blocks-indentation :same-line :sort {:ns true :require true :import true :refer {:max-line-length 80}}}}' --filenames " . expand("%"))<CR>:e<CR>
```

- 주의: `Sort_clojure_namspace_require`에 포함되어 있는 `^M`은 표기상 문제로 `^M` 두 글자로 대체했지만 실제로는 개행문자 한 글자이다.
    - 참고: [나의 설정 파일]( https://github.com/johngrib/dotfiles/blob/78cec0a6d5f2cf258d4868f7b5a071e1caba1488/vim-include/set-clojure.vim#L91 )

### 테스트 코드

- `stc`: 커서가 지시하고 있는 함수를 테스트하기 위한 테스트 파일을 테스트 경로에 생성해 준다. (`t`: test, `c`: create)
    - 테스트 파일을 생성할 때 기본이라 할 수 있는 최상단 `ns`와 `:require`, 첫 번째 `deftest` 구문은 자동으로 완성되어 있다.
- `st'`: 현재 파일의 테스트 코드 파일로 점프한다. 한 번 더 입력하면 소스코드 파일로 점프. (`'`: mark jump를 의도했다)
    - `file_name.clj` - `file_name_test.clj`로 파일 이름 형식이 맞아야 작동한다.
- `stt`: 커서가 지시하고 있는 테스트 코드 하나를 실행한다. (`tt`: vim 설탕)
- `stn`: 현재 네임스페이스의 테스트 코드를 모두 실행한다. (`n`: namespace)
- `sta`: 프로젝트의 모든 테스트 코드를 실행한다. (`a`: all)
    - TODO: 테스트를 찾지 못한다는 메시지가 나온다. 작동하지 않는 원인을 찾아보도록 하자.
- `str`: 실패한 테스트를 다시 실행한다. (`r`: redo)
- `st.`: 마지막에 실행한 테스트를 다시 실행한다. (`.`: vim repeat)

`stc`를 제외하고 모두 vim-iced의 기능을 사용하고 있다.
vim-iced는 실패한 테스트가 있을 경우 보기 좋게 레포트 버퍼를 만들어 보여주고, 테스트 옆 라인 넘버에 🔥 이모지를 보여준다.

다음은 `stn`으로 실패한 테스트가 발견됐을 경우이다.

![stn 테스트가 실패한 경우]( /resource/C8/18B9F8-7A97-432E-9CEC-795E39AB8608/iced-test-fail.jpg )

테스트에 성공하면 레포트 버퍼와 🔥 이모지는 사라진다.

![테스트에 성공한 경우]( /resource/C8/18B9F8-7A97-432E-9CEC-795E39AB8608/iced-test-success.jpg )

```viml
autocmd FileType clojure nmap <silent> stc :call CocAction('runCommand', 'lsp-clojure-create-test')<CR>
autocmd FileType clojure nmap st' <Plug>(iced_cycle_src_and_test)
autocmd FileType clojure nmap stt :IcedTestUnderCursor<CR>
autocmd FileType clojure nmap stn :IcedTestNs<CR>
autocmd FileType clojure nmap sta :IcedTestAll<CR>
autocmd FileType clojure nmap str :IcedTestRedo<CR>
autocmd FileType clojure nmap st. :IcedTestRerunLast<CR>
```


### clj-kondo 작업

- `skl`: 현재 파일을 린팅하고 목록을 보여준다. `sal`과 똑같다. (`k`: kondo, `l`: lint)
- `skm`: `.clj-kondo/config.edn`에 매크로를 등록해서 clj-kondo가 매크로를 인식하게 해준다. (`m`: macro)
    - TODO: 아직 쓸 일이 없어서 실제로 써보지 않았음. 사용해 본 다음 업데이트할 것.
- `sks`: `.clj-kondo/ignore`에 현재 라인을 추가해서 경고가 나오지 않도록 한다. (`s`: suppress)
    - TODO: 문제가 있는지 작동하지 않는다. 방법을 찾아볼 것.
    - 일단 `i#_:clj-kondo/ignore<ESC>`으로 대체하여 사용중.


```viml
autocmd FileType clojure nmap skl :Dispatch<CR>
autocmd FileType clojure nmap skm :call CocAction('runCommand', 'lsp-clojure-resolve-macro-as')<CR>
autocmd FileType clojure nmap sks i#_:clj-kondo/ignore<ESC>
" autocmd FileType clojure nmap sks :call CocAction('runCommand', 'lsp-clojure-suppress-diagnostic')<CR>
```

### 디버거 사용하기

vim-iced는 [CIDER의 debugger]( https://docs.cider.mx/cider/debugging/debugger.html )를 감싸고 있어서 CIDER의 디버거를 사용할 수 있다.

![디버거를 사용하는 모습]( /resource/C8/18B9F8-7A97-432E-9CEC-795E39AB8608/debugger.gif )

디버거로 멈추고 싶은 form 앞에 `#break`나 `#dbg`를 적어두고 코드를 평가하는 방식으로 사용할 수 있다.

- `#break`를 적어두면 실행중에 해당 위치에서 멈춘다.
    - 이후 `:n`이나 `:c`를 입력하면 끝까지 실행된다.
- `#dbg`를 적어두면 실행중에 해당 form의 안쪽에 있는 모든 코드에서 매번 멈춘다.
    - 멈출 때마다 `:n`을 입력하면 다음 스텝으로 이동한다.

### 파일 탐색

파일 탐색은 Clojure 코딩의 문제는 아니지만
통합적인 환경을 설명한다면 빠뜨릴 수 없는 내용일 것이다.

나는 보통은 fzf를 사용해 파일을 탐색한다.

![fzf Files 명령]( /resource/C8/18B9F8-7A97-432E-9CEC-795E39AB8608/fzf-files.jpg )

만약 트리 구조의 파일 목록을 보고 싶다면 [coc-explorer]( ./https://github.com/weirongxu/coc-explorer )를 사용한다.
(나는 [NERDTree]( https://github.com/preservim/nerdtree )를 별로 안 좋아한다.)

![coc-explorer]( /resource/C8/18B9F8-7A97-432E-9CEC-795E39AB8608/coc-explorer.jpg )

여기에서 파일을 추가하거나 삭제하거나 열거나 이동하거나 하는 등의 작업이 가능하다.

### plugin 목록

- 필수 플러그인
    - `vim-iced`
    - `vim-sexp`: vim-iced의 일부 명령이 `vim-sexp`에 의존한다.

- 자동 완성 플러그인
    - `coc.nvim`: 꼭 coc를 사용하지 않아도 된다. 하지만 나는 coc를 몇 년째 잘 사용하고 있으므로 그대로 사용한다.
    - `vim-iced-coc-source`: vim-iced와 coc와의 통합을 위한 플러그인.

그 외에는 없어도 딱히 지장이 없거나 내가 원래 평소에 사용하던 플러그인들이다.

#### vim-iced 설치

```viml
Plug 'liquidz/vim-iced', {'for': 'clojure'}
Plug 'liquidz/vim-iced-coc-source', {'for': 'clojure'}
```

다음과 같이 설정해서 기본 키 맵핑을 사용할 수 있도록 해주자.

```viml
let g:iced_default_key_mapping_leader = '<Leader>'
let g:iced_enable_default_key_mappings = v:true
```

`.bashrc`나 `.bash_profile`에 `iced` 명령의 PATH도 추가해 준다.

```
export PATH="$PATH:~/.vim/plugged/vim-iced/bin"
```

#### vim-sexp, vim-sexp-mappings-for-regular-people 설치

```viml
Plug 'guns/vim-sexp',    {'for': 'clojure'}
Plug 'tpope/vim-sexp-mappings-for-regular-people', {'for': 'clojure'}
```

### 문제 해결

#### coc-clojure가 작동하지 않는 경우 clojure-lsp 기능을 coc에서 호출하는 방법

coc-clojure에 문제가 있어 작동하지 않는 경우에는 clojure-lsp 기능을 coc를 통해 호출하면 된다.

```viml
" coc-clojure를 사용하는 경우
autocmd FileType clojure nmap sctl :call
    \ CocActionAsync('runCommand', 'lsp-clojure-thread-last-all')<CR>
```

```viml
" coc-clojure를 사용하지 않고 호출하는 경우
autocmd FileType clojure nmap sctl :call CocRequest(
    \ 'clojure-lsp',
    \ 'workspace/executeCommand',
    \ {'command': 'thread-first-all', 'arguments': [FileExpand('%:p'), line('.') - 1, col('.') - 1]})<CR>
```

`CocRequest`에 입력해야 하는 인자가 많기 때문에 나는 다음과 같은 함수를 작성해 사용하고 있다.

```viml
function! FileExpand(exp) abort
    let l:result = expand(a:exp)
    return l:result ==# '' ? '' : "file://" . l:result
endfunction

" https://github.com/snoe/dotfiles/blob/f427da9ab83bbedf30a90c490309ee90a08f4abf/home/.vimrc#L275-L295
function! ClojureLsp(command)
    call CocRequest('clojure-lsp', 'workspace/executeCommand', {'command': a:command, 'arguments': [FileExpand('%:p'), line('.') - 1, col('.') - 1]})
endfunction

autocmd FileType clojure nmap sctl :call ClojureLsp('thread-first-all')<CR>
```

위의 함수와 함수 호출은 [clojure-lsp.io/clients/#vim](https://clojure-lsp.io/clients/#vim )에서 소개하는 [.vimrc]( https://github.com/snoe/dotfiles/blob/master/home/.vimrc )를 참고해 응용한 것이다.

기능 목록 또한 [clojure-lsp.io/features/#execute-command]( https://clojure-lsp.io/features/#execute-command )에서 확인하면 된다.

#### vim-iced에서 Jack In을 실행하면 iced 명령을 찾지 못하는 경우

![iced를 찾지 못하는 vim]( /resource/C8/18B9F8-7A97-432E-9CEC-795E39AB8608/197396998-cf352d90-f734-4b00-9fc1-f0a0d611e4ee.png )

`g:iced#nrepl#connect#iced_command`에 설정된 `iced` 명령이 잘못 지정됐거나 vim이 `iced` 명령을 찾지 못하는 경우이다.

Vim에서 다음 명령을 실행해보자. `0`이 출력된다면 `g:iced#nrepl#connect#iced_command`를 잘못 지정한 것이다.

```viml
:echo executable(g:iced#nrepl#connect#iced_command)
```

`g:iced#nrepl#connect#iced_command`의 기본값은 `iced`인데, 기본값으로 작동하지 않는다면 full path를 지정해주면 된다.

다음은 나의 설정이다.

```viml
let g:iced#nrepl#connect#iced_command = $HOME . '/.config/nvim/plugged/vim-iced/bin/iced'
let g:iced#nrepl#connect#jack_in_command = g:iced#nrepl#connect#iced_command . ' repl -A:dev:test:itest'
```

- `g:iced#nrepl#connect#iced_command`: `iced` 명령의 경로. 기본값은 `iced`.
- `g:iced#nrepl#connect#jack_in_command`: REPL을 실행할 전체 명령.

REPL 실행시 알리아스를 제공하고 싶다면 `g:iced#nrepl#connect#jack_in_command`에 꼭 지정해 줘야 한다.
단, `iced repl` 명령이 prefix로 들어가 있어야 한다.

- (작동함) `g:iced#nrepl#connect#jack_in_command = 'iced repl -A:dev'`
- (작동함) `g:iced#nrepl#connect#jack_in_command = '/Users/johngrib/.config/nvim/plugged/vim-iced/bin/iced repl -A:dev'`
- (작동안함) `g:iced#nrepl#connect#jack_in_command = '-A:dev'`

#### 자동완성 목록에 중복 아이템이 나오는 경우

다음과 같이 coc 자동완성 목록에 중복 아이템이 나온다면 여러 개의 coc 서비스가 떠 있을 수 있다.

![자동완성 제안이 2개씩 나오고 있다]( /resource/C8/18B9F8-7A97-432E-9CEC-795E39AB8608/197347081-7bf16bb0-de98-4c97-907f-83f30700979b.png )

`:CocList services`를 입력하면 아래와 같이 서비스 목록을 볼 수 있다.

![CocList services로 확인한 모습]( /resource/C8/18B9F8-7A97-432E-9CEC-795E39AB8608/197347190-0d471a13-2c44-4975-b0a5-638049f46c67.png )

스크린샷을 보면 `languageserver.clojure-lsp`와 `clojure`가 `[running]` 상태로 떠 있음을 알 수 있다. 즉 두 개가 돌고 있는 것이다.

`languageserver.clojure-lsp`는 `coc-settings.json`에 내가 지정해 준 설정으로 작동하고 있는 것이고,
아래에 있는 `clojure`는 [coc-clojure]( https://github.com/NoahTheDuke/coc-clojure ) 이다. 따라서 `coc-settings.json`에서 `languageserver.clojure-lsp` 설정을 삭제하여 해결하였다.

관련 링크: <https://github.com/neoclide/coc.nvim/issues/1824 >

```js
// vim: ft=jsonc
// https://github.com/neoclide/coc.nvim/wiki/Using-the-configuration-file
{
    "suggest": {
        "noselect": false
    },
    "coc": {
        "preferences": {
            "formatOnSaveFileTypes": ["rust"],
            "promptInput": true
        },
        "source": {
            "iced.enable": false
        }
    },
    "languageserver": {
        "kotlin": {
            "command": "/opt/homebrew/bin/kotlin-language-server",
            "filetypes": ["kotlin"]
        },
        // "clojure-lsp": {
        //     // 참고: https://clojure-lsp.io/clients/#nvim
        //     "command": "clojure-lsp",
        //     "filetypes": ["clojure"],
        //     "rootPatterns": ["project.clj", "deps.edn"],
        //     "additionalSchemes": ["jar", "zipfile"],
        //     "trace.server": "verbose",
        //     "diagnostic.showUnused": true,
        //     "diagnostic.showDeprecated": true,
        //     "diagnostic.highlightPriority": 1000000,
        //     "initializationOptions": {
        //         "ignore-classpath-directories": true
        //     }
        // }
    }
}
```

## Clojure + Vim + Conjure로 Clojure 코딩하기

주의: 나는 이제 Conjure를 사용하지 않는다.

Clojure + Vim + Conjure로 작업하는 과정을 기록으로 남겨본다.

### conjure 설치

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

### REPL을 띄우고 conjure로 붙기

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

![vim을 실행하고 conjure가 자동으로 nrepl에 붙는 장면]( /resource/C8/18B9F8-7A97-432E-9CEC-795E39AB8608/conjure-connect.jpg )

vim에 들어가자마자 Conjure가 알아서 `59594` 포트로 접속한다.

만약 자동 접속이 제대로 안 된다면 vim 명령을 써서 수동으로 접속할 수도 있다. 모두 3가지 방법이 있다.

```
:ConjureConnect
:ConjureConnect 59594
:ConjureConnect localhost 59594
```

`:conjureco` 까지 쓰고 탭을 누르면 자동완성이 되므로 일일이 대소문자 지켜가며 쓸 필요가 없다는 점을 기억해두자.

## 함께 읽기

- [[/vim/auto-completion]]

## 주석

[^coc-config-file]: 보통 `~/.config/nvim/coc-settings.json` 경로에 있다.

