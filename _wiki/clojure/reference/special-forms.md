---
layout  : wiki
title   : Clojure Special Forms
summary : 번역 중인 문서
date    : 2022-05-05 23:15:05 +0900
updated : 2022-05-06 13:55:46 +0900
tag     : clojure 번역
toc     : true
public  : true
parent  : [[/clojure/reference]]
latex   : false
---
* TOC
{:toc}

## Special Forms: Clojure Reference 문서 번역

>
Special forms have evaluation rules that differ from standard Clojure evaluation rules and are understood directly by the Clojure compiler.
>
Headings for the special forms informally describe the special form grammar using regular expression syntax: ? (optional), * (0 or more), and + (1 or more). Non-terminals are denoted by italics.

Special form은 일반적인 Clojure evaluation과는 다른 규칙이 적용되며, Clojure compiler에서 직접 처리합니다.

- 이 문서의 소제목들은 special form의 문법을 개략적으로 보여주며, 정규식의 `?`, `*`, `+`를 사용해서 반복을 표현합니다.

### (`def` symbol doc-string? init?)

>
Creates and interns or locates a global [var]( https://clojure.org/reference/vars ) with the name of _symbol_ and a namespace of the value of the current namespace (`*ns*`).
If _init_ is supplied, it is evaluated, and the root binding of the var is set to the resulting value.
If _init_ is not supplied, the root binding of the var is unaffected.
 `def` always applies to the root binding, even if the var is thread-bound at the point where `def` is called.
 `def` yields the var itself (not its value).
Throws an exception if _symbol_ is already in the namespace and not mapped to an interned var.
Support for _doc-string_ was added in Clojure 1.3.

`symbol` 이름과 "현재 네임스페이스(`*ns*`)"를 사용해서 global var를 생성하고 intern 처리합니다.

- `init`
    - `init`이 주어진다면, `init`을 평가해서 var의 루트 바인딩에 할당합니다.
    - `init`이 없다면, var의 루트 바인딩은 아무런 영향을 받지 않습니다.
        - 역주: init이 없는 def 표현식인 `(def foo)`를 평가하고 나서 `foo`를 평가해 보면 `Unable to resolve symbol: foo in this context`가 발생한다.
- `def`
    - `def`는 언제나 루트 바인딩에 적용됩니다. var가 스레드 바인딩되었을 때 `def`가 호출되어도 마찬가지입니다.
    - `def`는 var 자체를 반환합니다(var의 값이 아니라 var 자체).

만약 `symbol`이 이미 네임스페이스에 존재하고, intern된 var에 매핑되지 않았다면 예외가 던져집니다.

`doc-string`은 Clojure 1.3 부터 지원되었습니다.

>
Any metadata on the _symbol_ will be evaluated, and become metadata on the var itself.
There are several metadata keys that have special interpretation:
>
- `:private`
    - a boolean indicating the access control for the var. If this key is not present, the default access is public (e.g. as if `:private false`).
- `:doc`
    - a string containing short (1-3 line) documentation for the var contents
- `:test`
    - a fn of no args that uses `assert` to check various operations. The var itself will be accessible during evaluation of a literal fn in the metadata map.
- `:tag`
    - a symbol naming a class or a Class object that indicates the Java type of the object in the var, or its return value if the object is a fn.

`symbol`의 모든 메타데이터는 평가를 마친 다음 var 자체의 메타데이터가 됩니다.
이런 메타데이터에는 특별하게 해석되는 다음과 같은 키값들이 있습니다.

- `:private`
    - var에 대한 접근 제어를 나타내는 boolean.
    - 이 키가 없다면 기본값은 `public` 입니다(`:private false`와 같음).
- `:doc`
    - var의 내용에 대한 1~3줄 정도의 짧은 설명 String.
- `:test`
    - `assert`를 사용해 다양한 체크가 가능한 함수.
    - 이 함수는 args가 하나도 없는 `fn` 입니다.
    - 메타데이터 map에서 fn 리터럴을 평가하는 동안 이 함수는 var 자체에 접근 가능합니다.
- `:tag`
    - class 이름에 대한 symbol.
    - 또는 var에 들어있는 객체의 Java 타입을 나타내는 Class 객체.
        - 만약 객체가 fn이라면 해당 fn의 리턴값.

>
In addition the compiler will place the following metadata keys on the var:
>
- `:file` string
- `:line` int
- `:name` simple symbol
- `:ns` namespace in which var is interned
- `:macro` true if var names a macro
- `:arglists` a list of vector(s) of argument forms, as were supplied to defn

다음의 메타데이터는 컴파일러가 var에 추가하는 것입니다.

- `:file` string
- `:line` int
- `:name` 간단한 symbol
- `:ns` var가 intern된 namespace
- `:macro` var가 매크로의 이름을 지정한다면 `true`.
- `:arglists`
    - defn에 지정된 인자들의 form vector.
    - vector의 list가 될 수도 있는데, 함수 오버로딩이 가능하기 때문이다.

>
The var metadata can be used for application-specific purposes as well.
Consider using namespace-qualified keys (e.g. `:myns/foo`) to avoid clashes.

var 메타데이터는 애플리케이션의 목적에 따라 다양하게 사용할 수 있습니다.

키 충돌을 예방하기 위해 네임스페이스에 한정된 키(예: `:myns/foo`)를 사용하는 것도 고려할 수 있습니다.

```clojure
(defn
 ^{:doc "mymax [xs+] gets the maximum value in xs using > "
   :test (fn []
             (assert (= 42  (mymax 2 42 5 4))))
   :user/comment "this is the best fn ever!"}
  mymax
  ([x] x)
  ([x y] (if (> x y) x y))
  ([x y & more]
   (reduce mymax (mymax x y) more)))

user=> (meta #'mymax)
  {:name mymax,
   :user/comment "this is the best fn ever!",
   :doc "mymax [xs+] gets the maximum value in xs using > ",
   :arglists ([x] [x y] [x y & more])
   :file "repl-1",
   :line 126,
   :ns #<Namespace user >,
   :test #<user$fn__289 user$fn__289@20f443 >}
```

>
Many macros expand into `def` (e.g. `defn`, `defmacro`), and thus also convey metadata for the resulting var from the _symbol_ used as the name.
>
Using `def` to modify the root value of a var at other than the top level is usually an indication that you are using the var as a mutable global, and is considered bad style.
Consider either using binding to provide a thread-local value for the var, or putting a [ref](https://clojure.org/reference/refs ) or [agent](https://clojure.org/reference/agents ) in the var and using transactions or actions for mutation.

많은 매크로가 `def`로 펼쳐지는데(예: `defn`, `defmacro`), 이렇게 하면 이름으로 지정한 symbol의 결과인 var에 대한 메타데이터도 함께 전달됩니다.

`def`를 사용해서 var의 루트 값을 변경하는 것은 나쁜 방식입니다.
var를 변경 가능한 전역변수로 사용하는 것이기 때문입니다.
바인딩을 사용해 var에 스레드 로컬 값을 제공하거나, var에 `ref`나 `agent`를 넣고 트랜잭션을 써서 값을 변경하는 방법을 고려해 보세요.

### (if test then else?)

https://clojure.org/reference/special_forms#if

