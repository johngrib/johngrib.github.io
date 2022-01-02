---
layout  : wiki
title   : Clojure cursive
summary : 
date    : 2021-12-20 10:50:43 +0900
updated : 2022-01-02 15:46:50 +0900
tag     : clojure
toc     : true
public  : true
parent  : [[/clojure]]
latex   : false
---
* TOC
{:toc}

## Ideavim 설정

### slurp, barf

IntelliJ 플러그인인 Cursive에서는 paredit의 기능으로 제공하고 있다.

그런데 단축키 조합이 뜬금없어서 외울 생각이 들지 않는다.

- slurp backwards : `control + command + j`
- barf backwards: `control + command + k`
- barf forwards: `shift + command + j`
- slurp forwards : `shift + command + k`

그래서 다음과 같이 매핑해주었다.

```viml
nmap sch :action :cursive.actions.paredit/slurp-backwards<CR>
nmap scH :action :cursive.actions.paredit/barf-backwards<CR>
nmap scL :action :cursive.actions.paredit/barf-forwards<CR>
nmap scl :action :cursive.actions.paredit/slurp-forwards<CR>
```

prefix `s`는 내가 서포트 기능들에 주는 prefix이다. 즉, `sc`는 다음과 같은 의미를 갖는다.

- `s`: 서포트 기능
- `c`: cursive의 기능

prefix를 `sc`로 주고 마지막 구분을 `hH`와 `Ll`로 준 것이다.
`h`와 `l`은 vim에서 왼쪽과 오른쪽을 표현하며, vim에서 shift와 함께 누르는 입력은 반대를 의미하므로 외우기 쉽다.

|                      | sch | scH | scK | scl |
|----------------------|-----|-----|-----|-----|
| 괄호가 움직이는 방향 | ← ( | → ( | ) ← | ) → |


아래의 키워드 `:b`에 커서가 있다고 하자. 커서 위치는 `v`로 표시한다.

```clojure
;    v
:a (:b) :c :d
```

이 때 sch 를 입력하면 다음과 같이 왼쪽 괄호가 왼쪽 아이템 하나를 잡아먹는다(slurp backwards).

```clojure
;    v
(:a :b) :c :d
```

이 상태에서 scl을 입력하면 오른쪽 괄호가 오른쪽 아이템 하나를 잡아먹는다(slurp forwards).

```clojure
;    v
(:a :b :c) :d
```

이제 barf도 해보자.

위의 상태에서 scH를 입력하면 왼쪽 괄호가 아이템 하나를 내보낸다(barf backwards).

```clojure
;    v
:a (:b :c) :d
```

그리고 scL 를 입력하면 오른쪽 괄호가 아이템 하나를 내보낸다(barf forwards).

```clojure
;    v
:a (:b) :c :d
```

## Ideavim actionlist

다음은 cursive 1.12.1-2021.3의 모든 Ideavim actionlist 이다.

```
:cursive.actions.paredit/backward                  <M-Left> <A-Left>
:cursive.actions.paredit/backward-down
:cursive.actions.paredit/backward-up
:cursive.actions.paredit/barf-backwards            <M-C-K>
:cursive.actions.paredit/barf-forwards             <M-S-J>
:cursive.actions.paredit/clojure-edit-group
:cursive.actions.paredit/clojure-navigate-group
:cursive.actions.paredit/close-curly-and-newline
:cursive.actions.paredit/close-paren-and-newline   <M-S-0>
:cursive.actions.paredit/close-square-and-newline  <M-]>
:cursive.actions.paredit/copy-as-kill              <C-S-K>
:cursive.actions.paredit/cycle-collection-type
:cursive.actions.paredit/forward                   <M-Right> <A-Right>
:cursive.actions.paredit/forward-down
:cursive.actions.paredit/forward-up
:cursive.actions.paredit/join                      <A-C-J>
:cursive.actions.paredit/kill                      <C-K>
:cursive.actions.paredit/kill-sexp                 <M-A-K>
:cursive.actions.paredit/move-form-down            <M-S-Down>
:cursive.actions.paredit/move-form-up              <M-S-Up>
:cursive.actions.paredit/raise                     <M-Þ>
:cursive.actions.paredit/slurp-backwards           <M-C-J>
:cursive.actions.paredit/slurp-forwards            <M-S-K>
:cursive.actions.paredit/splice                    <A-S>
:cursive.actions.paredit/splice-killing-backwards
:cursive.actions.paredit/splice-killing-forwards
:cursive.actions.paredit/split                     <A-C-S>
:cursive.actions.paredit/thread-form               <A-C-,>
:cursive.actions.paredit/toggle
:cursive.actions.paredit/unthread-form             <A-C-.>
:cursive.actions.paredit/wrap-curly
:cursive.actions.paredit/wrap-paren                <M-S-9>
:cursive.actions.paredit/wrap-quotes               <M-S-Þ>
:cursive.actions.paredit/wrap-square               <M-[>
:cursive.editor.actions/show-type                  <C-S-P>
:cursive.extensions.clojure.core.typed.actions/type-check-ns
:cursive.repl.actions/clear-repl
:cursive.repl.actions/clojure-repl-commands-group
:cursive.repl.actions/clojure-repl-group
:cursive.repl.actions/interrupt
:cursive.repl.actions/jump-to-output
:cursive.repl.actions/jump-to-repl                 <M-\>
:cursive.repl.actions/load-file                    <M-S-L>
:cursive.repl.actions/macroexpansion               <M-S-\>
:cursive.repl.actions/next-history-item            <M-Down>
:cursive.repl.actions/prev-history-item            <M-Up>
:cursive.repl.actions/print-exception
:cursive.repl.actions/run-last-sexp
:cursive.repl.actions/run-top-sexp                 <M-S-P>
:cursive.repl.actions/search-history               <M-A-E>
:cursive.repl.actions/switch-namespace             <M-S-N>
:cursive.repl.actions/sync-files                   <M-S-M>
:cursive.repl.actions/toggle-repl-editor-type
:cursive.repl.commands/add-new
:cursive.repl.commands/edit
:cursive.testing.actions/remove-test-markers
:cursive.testing.actions/rerun-last-test
:cursive.testing.actions/run-ns-tests
:cursive.testing.actions/run-single-test
```
