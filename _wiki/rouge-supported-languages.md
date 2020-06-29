---
layout  : wiki
title   : Rouge가 지원하는 언어 목록
summary : Github Jekyll의 syntax highlight용 언어 키워드 모음
date    : 2018-09-17 23:14:53 +0900
updated : 2020-06-29 21:16:51 +0900
tag     : github jekyll
toc     : true
public  : true
parent  : [[what]]
latex   : false
---
* TOC
{:toc}

## Github Jekyll의 코드 하이라이팅

* 다음과 같이 마크다운 파일을 작성하면 Jekyll이 해당 언어의 신택스로 하이라이팅을 해준다.

````
```언어이름
해당 언어로 작성한 코드
```
````

* 이름이 심플한 언어라면 괜찮은데, 가끔 언어 이름을 어떻게 지정해야 할 지 애매한 경우가 있다.
    * 가령 VimL은 Vim Script라고도 부르므로 `viml`이라 적을지 `vimscript`로 적을지 애매하다.
    * 물론 테스트해보면 되지만 매번 테스트하는 것도 귀찮은 일이다.
* 어딜 봐야 알 수 있나 하다가 Rouge wiki를 보면 된다는 것을 알게 되었다.
    * Github Jekyll의 코드 블록 신택스 하이라이팅 도구는 Rouge가 기본값이기 때문.

자세한 내용은 다음 링크 참고.

* <https://github.com/jneen/rouge/wiki/List-of-supported-languages-and-lexers >


## 언어 목록

Jekyll에서 Rouge를 사용하고 있다면 코드 블록에서 언어를 지정할 때 아래의 목록을 참고하면 된다.

예를 들어 Clojure의 알리아스는 `clojure`, `clj`, `cljs`이므로 셋 중 하나인 `clj`를 지정해주면

````
```clj
(println "Hello, World")
```
````

다음과 같이 Clojure 코드로 신택스 하이라이팅이 된다.

```clj
(println "Hello, World")
```

다음 목록은 백업 겸, Rouge wiki에서 복사해 붙여넣은 것이다.

(Rouge wiki가 언제든지 변경될 수 있으므로 이 목록만 참고하지 않도록 한다.)

- abap
- actionscript, as, as3
- apache
- apiblueprint, apiblueprint, apib
- applescript, applescript
- awk
- biml
- brainfuck
- bsl
- c
- ceylon
- cfscript, cfc
- clojure, clj, cljs
- cmake
- coffeescript, coffee, coffee-script
- common_lisp, cl, common-lisp, elisp, emacs-lisp
- conf, config, configuration
- console, terminal, shell_session, shell-session
- coq
- cpp, c++
- crystal, cr
- csharp, c#, cs
- css
- d, dlang
- dart
- diff, patch, udiff
- digdag
- docker, dockerfile
- dot
- eiffel
- elixir, elixir, exs
- elm
- erb, eruby, rhtml
- erlang, erl
- escape, esc
- factor
- fortran
- fsharp
- gherkin, cucumber, behat
- glsl
- go, go, golang
- gradle
- graphql
- groovy
- hack, hack, hh
- haml, HAML
- handlebars, hbs, mustache
- haskell, hs
- hcl
- html
- http
- hylang, hy
- idlang
- igorpro
- ini
- io
- irb, pry
- java
- javascript, js
- jinja, django
- json
- json-doc
- jsonnet
- jsp
- jsx, jsx, react
- julia, jl
- kotlin
- lasso, lassoscript
- liquid
- literate_coffeescript, litcoffee
- literate_haskell, lithaskell, lhaskell, lhs
- llvm
- lua
- m68k
- magik
- make, makefile, mf, gnumake, bsdmake
- markdown, md, mkd
- mathematica, wl
- matlab, m
- moonscript, moon
- mosel
- mxml
- nasm
- nginx
- nim, nimrod
- nix, nixos
- objective_c, objc, obj-c, obj_c, objectivec
- ocaml
- pascal
- perl, pl
- php, php, php3, php4, php5
- plaintext, text
- plist, plist
- powershell, posh, microsoftshell, msshell
- praat
- prolog, prolog
- prometheus, prometheus
- properties
- protobuf, proto
- puppet, pp
- python, py
- q, kdb+
- qml, qml
- r, r, R, s, S
- racket
- ruby, rb
- rust, rs, rust, no_run, rs, no_run, rust, ignore, rs, ignore, rust, should_panic, rs, should_panic
- sass
- scala, scala
- scheme
- scss
- sed
- shell, bash, zsh, ksh, sh
- sieve
- slim
- smalltalk, st, squeak
- smarty, smarty
- sml, ml
- sqf
- sql
- supercollider
- swift
- tap, tap
- tcl
- terraform, tf
- tex, TeX, LaTeX, latex
- toml
- tsx
- tulip, tulip
- turtle
- twig
- typescript, ts
- vala
- vb, visualbasic
- verilog
- vhdl
- viml, vim, vimscript, ex
- vue, vuejs
- wollok
- xml
- xojo, realbasic
- yaml, yml

## Links

* <https://github.com/jneen/rouge/wiki/List-of-supported-languages-and-lexers >
