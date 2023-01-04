---
layout  : wiki
title   : Clojure Macros
summary : Clojure의 매크로
date    : 2022-03-09 23:56:39 +0900
updated : 2022-03-10 00:28:02 +0900
tag     : clojure 번역
resource: E2/79F2AE-F3CE-4712-9AAC-461C3084ED2D
toc     : true
public  : true
parent  : [[/clojure/reference]]
latex   : false
giscus  : auto
---
* TOC
{:toc}

## Macros: Clojure Reference 문서 번역

[원문](https://clojure.org/reference/macros )

>
Clojure has a programmatic macro system which allows the compiler to be extended by user code.
Macros can be used to define syntactic constructs which would require primitives or built-in support in other languages.
Many core constructs of Clojure are not, in fact, primitives, but are normal macros.
>
Some macros produce simple combinations of primitive forms.
For example, [`when`](https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/when ) combines [`if`](https://clojure.org/reference/special_forms#if ) and [`do`](https://clojure.org/reference/special_forms#do ):

Clojure에는 사용자가 작성한 코드를 통해 컴파일러를 확장할 수 있는 프로그래밍 매크로 시스템이 있습니다.
매크로는 다른 언어였다면 기본으로 제공되고 있거나, 내부적으로 지원되어야 가능했을 구문 구조를 정의하는 데 사용됩니다.
실제로 Clojure의 다양한 핵심 구조는 매크로로 정의되어 있으며, 언어에서 기본적으로 제공하는 것이 아닙니다.

매크로는 기본적인 form들을 간단하게 조합해 만들 수도 있습니다.

예를 들어 `when`은 `if`와 `do`를 조합해서 만든 것입니다.

```clojure
user=> (macroexpand '(when (pos? a) (println "positive") (/ b a)))
(if (pos? a) (do (println "positive") (/ b a)))
```

>
Other macros re-arrange forms in useful ways, like the `->` macro, which recursively inserts each expression as the first argument of the next expression:

`->` 매크로처럼 유용성을 위해 form들을 재배치하는 매크로도 있습니다.
`->` 매크로는 각 표현식을 다음에 오는 표현식의 첫 번째 인자로 재귀적으로 삽입해 줍니다.

```clojure
user=> (-> {} (assoc :a 1) (assoc :b 2))
{:b 2, :a 1}
user=> (macroexpand '(-> {} (assoc :a 1) (assoc :b 2)))
(assoc (clojure.core/-> {} (assoc :a 1)) :b 2)
```

### Special variables

>
Two special variables are available inside defmacro for more advanced usages:
>
- `&form` - the actual form (as data) that is being invoked
- `&env` - a map of local bindings at the point of macro expansion. The env map is from symbols to objects holding compiler information about that binding.

defmacro 안쪽에서 사용할 수 있는 두 개의 특수 변수가 있습니다.

- `&form` - 실제로 호출되는 (데이터로서의) form.
- `&env` - 매크로 확장 시점에서의 로컬 바인딩을 위한 map. `env` map은 symbol에서 object까지 바인딩에 대한 컴파일러 정보를 갖고 있습니다.

>
All of the following macros are documented on the [API](https://clojure.github.io/clojure/ ) page.
Many are also discussed on topic pages as noted:

아래에서 소개하는 모든 매크로는 API 페이지에서 설명을 찾아볼 수 있습니다.
다음은 주제별 페이지를 모아놓은 것입니다.

>
- Creating macros:
[defmacro](https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/defmacro )
[definline](https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/definline )
[macroexpand-1](https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/macroexpand-1 )
[macroexpand](https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/macroexpand )
>
- Branching:
[and](https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/and )
[or](https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/or )
[when](https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/when )
[when-not](https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/when-not )
[when-let](https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/when-let )
[when-first](https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/when-first )
[if-not](https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/if-not )
[if-let](https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/if-let )
[cond](https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/cond )
[condp](https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/condp )
>
- Looping (see also [Sequences](https://clojure.org/reference/sequences )):
[for](https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/for )
[doseq](https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/doseq )
[dotimes](https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/dotimes )
[while](https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/while )
>
- Working with vars (see also [Vars and Environment](https://clojure.org/reference/vars )):
[ns](https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/ns )
[declare](https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/declare )
[defn](https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/defn )
[defmacro](https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/defmacro )
[definline](https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/definline )
[defmethod](https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/defmethod )
[defmulti](https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/defmulti )
[defn-](https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/defn- )
[defonce](https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/defonce )
[defstruct](https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/defstruct )
>
- Arranging code differently:
[..](https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/%2E%2E )
[doto](https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/doto )
[\-\>](https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/-%3e )
>
- Dynamic scopes (see also [Vars and Environment](https://clojure.org/reference/vars )):
[binding](https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/binding )
[locking](https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/locking )
[time](https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/time )
[with-in-str](https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/with-in-str )
[with-local-vars](https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/with-local-vars )
[with-open](https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/with-open )
[with-out-str](https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/with-out-str )
[with-precision](https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/with-precision )
>
- Creating lazy things (see also [Sequences](https://clojure.org/reference/sequences )):
[lazy-cat](https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/lazy-cat )
[lazy-cons](https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/lazy-cons )
[delay](https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/delay )
>
- [Java interop](https://clojure.org/reference/java_interop ) macros:
[..](https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/%2E%2E )
[amap](https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/amap )
[areduce](https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/areduce )
[gen-class](https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/gen-class )
[gen-interface](https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/gen-interface )
[proxy](https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/proxy )
[proxy-super](https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/proxy-super )
[memfn](https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/memfn )
>
- Documenting code:
[assert](https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/assert )
[comment](https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/comment )
[doc](https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/doc )
>
- Transactions:
[dosync](https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/dosync )
[io!](https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/io! )

>
A few [special forms](https://clojure.org/reference/special_forms )
 are actually implemented as macros, primarily to provide destructuring: fn let loop

몇몇 special form들은 구조분해를 제공하기 위해 실제로 매크로를 통해 구현됩니다.
`fn`, `let`, `loop`가 이에 해당됩니다.
