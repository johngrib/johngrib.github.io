---
layout  : wiki
title   : NeoVim에서 Clojure 코드를 작성하자
summary : 삽질의 흔적
date    : 2022-01-09 22:53:22 +0900
updated : 2022-01-13 00:43:33 +0900
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

## 환경 설정

다음 세 가지 도구를 사용한다.

- `clojure-lsp` : Clojure Language Server
- `coc.nvim` : lsp와 vim 사용자를 중개해 주며, 잡다한 IDE 기능을 제공해 준다.
- `conjure` : vim에서 다양한 언어의 대화형 환경을 구성해 준다. Clojure에 대해서는 nREPL.

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

## REPL을 띄우고 vim에서 REPL에 붙기

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

## 주석

[^coc-config-file]: 보통 `~/.config/nvim/coc-settings.json` 경로에 있다.

