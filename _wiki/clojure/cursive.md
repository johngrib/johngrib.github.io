---
layout  : wiki
title   : Clojure cursive
summary : 
date    : 2021-12-20 10:50:43 +0900
updated : 2022-01-03 16:18:53 +0900
tag     : clojure
resource: B2/A38967-B276-437F-9372-E1AF102982D6
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

nmap <Tab>h :action :cursive.actions.paredit/slurp-backwards<CR>
nmap <Tab>H :action :cursive.actions.paredit/barf-backwards<CR>
nmap <Tab>L :action :cursive.actions.paredit/barf-forwards<CR>
nmap <Tab>l :action :cursive.actions.paredit/slurp-forwards<CR>
```

prefix `s`는 내가 서포트 기능들에 주는 prefix이다. 즉, `sc`는 다음과 같은 의미를 갖는다.

- `s`: 서포트 기능
- `c`: cursive의 기능

prefix를 `sc`로 주고 마지막 구분을 `hH`와 `Ll`로 준 것이다.
`h`와 `l`은 vim에서 왼쪽과 오른쪽을 표현하며, vim에서 shift와 함께 누르는 입력은 반대를 의미하므로 외우기 쉽다.

|                      | sch | scH | scK | scl |
|----------------------|-----|-----|-----|-----|
| 괄호가 움직이는 방향 | ← ( | → ( | ) ← | ) → |

한편 `<Tab>`은 내가 랭귀지 서포트를 위해 사용하고 있는 키이기 때문에 매핑해 주었다.
한동안 사용해 보고 양쪽 중 더 편한 쪽을 선택할 생각이다.
Ideavim은 autocommand를 지원하지 않아 언어별로 이런 설정을 다르게 할 수 없다는 것이 아쉽다.

#### 사용방법

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

### thread-form, unthread-form

thread-form은 평범한 form에 thread macro를 적용시켜 주는 편리한 기능이다. 디폴트 단축키는 다음과 같다.

- Thread Form `control + option + ,`
- Unthread Form `control + option + .`

하지만 `control`과 `option`을 눌러야 하는 이유를 잘 모르겠다.
내 취향대로 매핑해 주자. Thread라는 의미로 `sct`를, 해제의 의미로 `scT`로 지정했다.

```viml
nmap sct :action :cursive.actions.paredit/thread-form<CR>
nmap scT :action :cursive.actions.paredit/unthread-form<CR>
```

다음과 같은 쓰레드 매크로를 사용한 Clojure 코드가 있다고 하자.

```clojure
(->> [10 20 30]
     (map inc)
     (map str))
```
여기에 커서를 두고 `scT`를 입력해 쓰레드 매크로를 해제하면 다음과 같이 `(map str)`이 빠져나온 것을 볼 수 있다.

```clojure
(map str (->> [10 20 30]
              (map inc)))
```

한번 더 `scT` 하면 이렇게 된다.

```clojure
(map str (map inc [10 20 30]))
```

쓰레드 매크로 해제는 간단하지만 쓰레드 매크로 적용은 `->`를 쓸 지, `->>`를 쓸 지 선택지를 물어보기도 한다.
어렵진 않으니 적용에 대해서는 생략한다.

### Parinfer 토글

Parinfer보다 surround.vim의 동작이 더 편리한 경우도 있다. 이럴 땐 Parinfer가 방해되기 때문에 그때 그때 토글하며 사용한다.

```viml
nmap scp :cursive.actions.paredit/toggle
```

### 폼 업/다운

폼 업/다운은 괄호 내 아이템의 위치를 서로 스왑해준다. 매우 편리하다.

```viml
nmap scj :action :cursive.actions.paredit/move-form-up<CR>
nmap sck :action :cursive.actions.paredit/move-form-down<CR>
```

커서가 v 위치에 있다고 하자.

```clojure
;         v
(first [1 2 3])
```

`sck`를 입력하면 `2`와 `3`이 서로 자리를 바꾼다. 커서는 `2` 위에 있다.

```clojure
;           v
(first [1 3 2])
```

`scj`를 입력하면 다시 원위치가 된다.

```clojure
;         v
(first [1 2 3])
```

그런데 이건 form에 대해 작동하기 때문에 굉장히 강력하다.

```clojure
;      v
(first [1 2 3])
```

커서를 `[`에 놓고 `scj`를 입력하면 `first`와 `[1 2 3]`이 서로 자리를 바꾼다.

```clojure
;v
([1 2 3] first)
```

다시 `sck`를 입력하면 `first`와 `[1 2 3]`이 또다시 자리를 바꾼다.

```clojure
;      v
(first [1 2 3])
```

수십줄로 묶인 괄호에 대해서도 잘 작동하므로 편리하게 사용하자.

### 내가 사용하지 않는 기능들

```
:cursive.actions.paredit/splice
```

splice는 커서가 있는 곳을 감싸는 괄호를 제거한다. surround.vim의 `ds`와 같은 기능이므로 필요없다.

```
:cursive.actions.paredit/cycle-collection-type
```

cycle-collection-type은 커서가 있는 곳을 감싸는 괄호의 컬렉션 타입을 순환시킨다.

순환 순서는 이렇다. `#{}` → `()` → `{}` → `[]` → `#{}`

즉, vim의 axring 같은 기능을 하는데.. 순환이 5개나 되다 보니 돌리는 게 생각보다 불편하다.
surround.vim의 `cs`가 훨씬 빠르고 눌러야 하는 키도 더 적다. 그냥 surround.vim을 쓰자.


```
:cursive.actions.paredit/close-curly-and-newline
:cursive.actions.paredit/close-paren-and-newline
:cursive.actions.paredit/close-square-and-newline
:cursive.actions.paredit/wrap-curly

:cursive.actions.paredit/wrap-paren
:cursive.actions.paredit/wrap-quotes
:cursive.actions.paredit/wrap-square
```

괄호를 닫고 씌우고 하는 기능들인데, surround.vim의 `ys`가 더 편리하고 직관적이다.
쓸 일이 없어서 키 할당을 모두 제거해 주었다.

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
