---
layout  : wiki
title   : NeoVim에서 Clojure 코드를 작성하자
summary : 삽질의 흔적
date    : 2022-01-09 22:53:22 +0900
updated : 2022-01-22 15:48:49 +0900
tag     : clojure vim
toc     : true
public  : true
parent  : [[/clojure]]
latex   : false
---
* TOC
{:toc}

## 방황

회사에서 Clojure를 쓰게 되어 다음과 같은 방황을 하였다.

- [Emacs]( https://www.gnu.org/software/emacs/ )
    - 시작을 못 하겠다. `<C-x>` `<C-c>`로 종료는 할 수 있다.
- [VsCode]( https://code.visualstudio.com/ ) + [Calva]( https://calva.io/ ) + [vscode-neovim]( https://github.com/asvetliakov/vscode-neovim )
    - 꽤 괜찮았지만 ultisnips가 작동하지 않고, 명령행 모드가 위에 있는 것이 불편하게 느껴진다.
- [IntelliJ]( https://www.jetbrains.com/ko-kr/idea/download/ ) + [Cursive]( https://cursive-ide.com/ ) + [ideavim]( https://github.com/JetBrains/ideavim )
    - ideavim 빼고는 다 좋다.
    - vim 서버를 띄우는 방식이 아니라 vim을 흉내내는 방식이므로 거의 모든 vim 플러그인을 사용할 수 없다.

이러다 그냥 Vim을 쓰거나 IntelliJ와 함께 써야겠다는 생각을 하게 되었다.

경험상 이 중 가장 쾌적한 환경은 IntelliJ + Cursive + ideavim 이었다.

하지만 Ultisnips를 사용할 수 없는 게 너무 아쉽다. 그래서 IntelliJ와 Vim을 필요에 따라 번갈아가며 사용하는 것을 고려하게 됐다.


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

#### REPL을 띄우고 iced로 붙기

터미널에서 다음과 같이 `iced`를 사용해 REPL을 실행해준다.

```
iced repl
```

`:dev` 알리아스를 지정하고 싶다면 이렇게 하면 된다.

```
iced repl -A:dev
```

REPL이 뜨면 vim에서 `:IcedConnect`를 입력하면 된다.


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

