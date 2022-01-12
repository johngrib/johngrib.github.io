---
layout  : wiki
title   : Reading Clojure Characters
summary : 번역 중인 문서
date    : 2022-01-07 21:55:12 +0900
updated : 2022-01-09 14:37:23 +0900
tag     : clojure 번역
toc     : true
public  : true
parent  : [[/clojure/guide]]
latex   : false
---
* TOC
{:toc}

## Reading Clojure Characters: Clojure guide 문서 번역

원문: [Reading Clojure Characters]( https://clojure.org/guides/weird_characters )

>
This page explains the Clojure syntax for characters that are difficult to "google".
Sections are not in any particular order, but related items are grouped for ease.
Please refer to [the reader reference page]( https://clojure.org/reference/reader ) as the authoritative reference on the Clojure reader.
This guide is based on [James Hughes]( http://twitter.com/kouphax ) original [blog post]( https://yobriefca.se/blog/2014/05/19/the-weird-and-wonderful-characters-of-clojure/ ) and has been updated and expanded here with the permission of the author.

이 페이지에서는 Clojure 신택스에서 사용하지만 구글링하기는 어려운 문자들을 설명합니다.
각 섹션을 정렬한 기준은 딱히 없지만, 편의를 위해 서로 관련 있는 항목들끼리 묶어 놓았습니다.
Clojure reader에 대한 공식 레퍼런스로 reader reference 페이지를 참고하시기 바랍니다.
이 가이드는 James Hughes의 블로그의 글을 토대로 하며, 저자의 허가를 받아 이곳에서 업데이트 및 확장되었습니다.[^here]

### `( ... )` - List

>
Lists are sequential heterogeneous collections implemented as a linked list.
>
- [Clojure Documentation: Lists]( https://clojure.org/reference/data_structures#Lists )
>
A list of three values:

List는 링크드 리스트로 구현되었으며, 순서 있는(sequantial) 타입을 가리지 않는(heterogeneous) 컬렉션입니다.

다음 리스트는 3개의 값을 갖습니다.

```clojure
(1 "two" 3.0)
```

### `[ ... ]` - Vector

>
Vectors are sequential, indexed, heterogeneous collections. Indexing is 0-based.
>
An example of retrieving the value at index 1 in a vector of three values:

Vector는 순서가 있고(sequantial), 인덱스 있는(indexed) 타입을 가리지 않는(heterogeneous) 컬렉션입니다.
인덱스는 0부터 시작합니다.

다음은 3개의 값을 가진 벡터에서 인덱스 1을 검색하는 예제 입니다.

```clojure
user=> (get ["a" 13.7 :foo] 1)
13.7
```

- [Clojure Documentation: Vectors]( https://clojure.org/reference/data_structures#Vectors )

### `{ ... }` - Map

>
Maps are heterogeneous collections specified with alternating keys and values:

Map은 키와 값을 번갈아가며 지정하는, 타입을 가리지 않는 컬렉션입니다.

```clojure
user=> (keys {:a 1 :b 2})
(:a :b)
```

- [Clojure Documentation: Maps]( https://clojure.org/reference/data_structures#Maps )

### `#` - Dispatch character

>
You’ll see this character beside another e.g. `#(` or `#"`.
>
`#` is a special character that tells the Clojure reader (the component that takes Clojure source and "reads" it as Clojure data) how to interpret the next character using a read table. Although some Lisps allow the read table to be extended by users, Clojure [does not]( https://clojure.org/guides/faq#reader_macros ).
>
The `#` is also used at the end of a symbol when creating [generated symbols]( https://clojure.org/guides/weird_characters#gensym ) inside a syntax quote.

`#(`나 `#"` 처럼 `#` 문자가 다른 문자의 옆에 있는 것을 볼 수 있을 것입니다.

`#`은 Clojure reader(Clojure source를 가져와 그것을 Clojure data로 "읽는" 컴포넌트)에게 다음 문자를 해석하는 방법을 read table을 사용해 알려주는 특수 문자입니다. 몇몇 Lisp 언어들은 사용자들이 read table을 확장할 수 있도록 허용하지만, Clojure는 read table 확장을 허용하지 않습니다.

`#`은 또한 generated symbol[^gensym]을 생성할 때 구문의 안쪽에서 symbol의 마지막에 붙이는 문자이기도 합니다.

### `#{ ...}` - Set

>
See [`#`]( https://clojure.org/guides/weird_characters#dispatch ) for additional details.
>
`#{…}` defines a set (a collection of unique values), specifically a `hash-set`. The following are equivalent:

자세한 내용은 바로 윗 절을 참고하세요.

`#{ ... }`는 set(유일한 값의 컬렉션)을 정의합니다.
특히 `hash-set`를 사용하고 있으므로 다음은 같습니다.

```clojure
user=> #{1 2 3 4}
#{1 2 3 4}
user=> (hash-set 1 2 3 4)
#{1 2 3 4}
```

>
Sets cannot contain duplicates and thus the `set` reader will throw an exception in this case as it is an invalid literal. When items are added to a set, they are simply dropped if the value is already present.

set는 중복을 허용하지 않으므로, 아래의 예제에 대해 `set` reader는 invalid literal로 판별해 예외를 던질 것입니다.
만약 set에 아이템을 추가할 때 이미 set에 해당 값이 들어가 있다면 아이템은 무시됩니다.

```clojure
user=> #{1 2 3 4 1}
Syntax error reading source at (REPL:83:13).
Duplicate key: 1
```

- [Clojure Documentation: Sets]( https://clojure.org/reference/data_structures#sets )

### `#_` - Discard

>
See [`#`]( https://clojure.org/guides/weird_characters#dispatch ) for additional details.
>
`#_` tells the reader to ignore the next form completely.

자세한 내용은 바로 윗 절을 참고하세요.

`#_`는 reader에게 다음에 오는 form을 완전히 무시하라고 알려줍니다.

```clojure
user=> [1 2 3 #_ 4 5]
[1 2 3 5]
```

>
Note that the space following `#_` is optional, so

그리고 `#_` 뒤에는 공백이 있어도 되고 없어도 됩니다. 따라서 다음과 같이 해도 됩니다.

```clojure
user=> [1 2 3 #_4 5]
[1 2 3 5]
```

>
also works. Also note that the discard character works in edn.
>
A neat trick is that multiple `#_` can be stacked to omit multiple forms

또한 edn에서도 작동한다는 걸 기억해두세요.

여러 개의 form을 생략하는 방법으로 `#_`를 여러 번 사용하는 세련된 트릭도 있습니다.

```clojure
user=> {:a 1, #_#_ :b 2, :c 3}
{:a 1, :c 3}
```

>
The docs suggest that "The form following #_ is completely skipped by the reader (This is a more complete removal than the comment macro which yields nil).". This can prove useful for debugging situations or for multiline comments.

공식 문서들에서는 "`#_` 뒤에 오는 form이 reader에게 완전히 무시된다(이것은 nil로 평가되는 comment macro보다 더 강력한 제거 방식입니다)"라고 나와 있습니다. 이 기법은 디버깅이나 여러 줄에 코멘트 처리를 해야 할 때 유용할 수 있습니다.

- [Clojure Documentation - Reader]( https://clojure.org/reference/reader )
- [edn Tagged Elements]( https://github.com/edn-format/edn#tagged-elements )

### `#"..."` - Regular Expression

>
See [`#`]( https://clojure.org/guides/weird_characters#dispatch ) for additional details.
>
`#"` indicates the start of a regular expression

`#"`는 정규 표현식의 시작을 의미합니다.

```clojure
user=> (re-matches #"^test$" "test")
"test"
```

>
This form is compiled at _read time_ into a host-specific regex machinery, but it is not available in edn.
Note that when using regexes in Clojure, Java string escaping is not required

이 form은 read time에 컴파일되어 host-specific regex machinery가 되지만, edn에서는 사용할 수 없습니다.
Clojure에서 정규식을 사용할 때에는 Java string escaping이 필요하지 않다는 것을 주의하세요.

- [Clojure Documentation: Regex Support]( https://clojure.org/reference/other_functions#regex )
- [Java Regex]( http://docs.oracle.com/javase/7/docs/api/java/util/regex/Pattern.html )

### `#(...)` - Anonymous function

>
See [`#`]( https://clojure.org/guides/weird_characters#dispatch ) for additional details.
>
`#(` begins the short hand syntax for an inline function definition. The following two snippets of code are similar: 

`#(`는 축약형 inline function을 의미합니다. 다음 두 코드는 같은 의미를 가집니다.

```clojure
; anonymous function taking a single argument and printing it
(fn [line] (println line))

; anonymous function taking a single argument and printing it - shorthand
#(println %)
```

>
The reader expands an anonymous function into a function definition whose arity (the number of arguments it takes) is defined by how the `%` placeholders are declared. See the `%` character for discussion around arity.

reader는 이런 익명 함수를 함수 정의로 확장해 인식합니다.
이 함수의 인자들은 `%`를 사용하는 방식에 따라 해당 위치에 입력됩니다.
`%`를 사용하는 방식에 대한 자세한 정보는 `%`을 참고하세요.

```clojure
user=> (macroexpand `#(println %))
(fn* [arg] (clojure.core/println arg)) ; argument names shortened for clarity
```

### `#'` - Var quote

>
`#'` is the var quote which expands into a call to the `var` function:

`#'`는 `var` 함수의 호출로 확장되는 var quote를 의미합니다.

```clojure
user=> (read-string "#'foo")
(var foo)
user=> (def nine 9)
#'user/nine
user=> nine
9
user=> (var nine)
#'user/nine
user=> #'nine
#'user/nine
```

>
When used it will attempt to return the referenced var.
This is useful when you want to talk about the reference/declaration instead of the value it represents.
See the use of `meta` in the metadata ([`^`](https://clojure.org/guides/weird_characters#metadata )) discussion.
>
Note that var quote is not available in edn.

`#'`를 사용하면 referenced var를 리턴하게 됩니다.
이 방법을 사용하면 특정 대상이 표현하는 값 대신, reference/declaration에 대해 이야기하려 할 때 유용합니다.
자세한 내용은 metadata(`^`)에서의 `meta`의 사용을 참고하세요.

var quote는 edn에서는 사용할 수 없습니다.

- [Clojure Official Documentation: Special Forms](https://clojure.org/reference/special_forms#var)

### `##` - Symbolic values

>
Clojure can read and print the symbolic values `##Inf`, `##-Inf`, and `##NaN`. These are also available in edn.

Clojure는 symbolic 값으로 `##Inf`, `##-Inf`, and `##NaN`을 읽고 출력할 수 있습니다.
이 값들은 edn에서도 사용할 수 있습니다.

```clojure
user=> (/ 1.0 0.0)
##Inf
user=> (/ -1.0 0.0)
##-Inf
user=> (Math/sqrt -1.0)
##NaN
```

### `#inst`, `#uuid`, and `#js` etc. - tagged literals

>
Tagged literals are defined in edn and supported by the Clojure and ClojureScript readers natively. The `#inst` and `#uuid` tags are defined by edn, whereas the #js tag is defined by ClojureScript.
>
We can use Clojure’s `read-string` to read a tagged literal (or use it directly):

tagged literal은 edn에서 정의된 것이며, Clojure과 ClojureScript reader는 이를 네이티브 수준에서 지원합니다.

- `#inst`과 `#uuid`의 tag는 edn에서 정의되었습니다.
- `#js` tag는 ClojureScript에서 정의되었습니다.

Clojure의 `read-string`를 사용하여 tagged literal을 읽거나 직접 사용할 수 있습니다.

```clojure
user=> (type #inst "2014-05-19T19:12:37.925-00:00")
java.util.Date ;; this is host dependent
user=> (read-string "#inst \"2014-05-19T19:12:37.925-00:00\"")
#inst "2014-05-19T19:12:37.925-00:00"
```

>
A tagged literal tells the reader how to parse the literal value.
Other common uses include `#uuid` for expressing UUIDs and in the ClojureScript world an extremely common use of tagged literals is `#js` which can be used to convert ClojureScript data structures into JavaScript structures directly.
Note that `#js` doesn’t convert recursively, so if you have a nested data-structure, use [`js->clj`](https://cljs.github.io/api/cljs.core/js-GTclj ).
>
Note that while `#inst` and `#uuid` are available in edn, `#js` is not.

tagged literal은 reader에게 literal value를 어떻게 파싱할 것인지 알려줍니다.
가령 `#uuid` 사용하는 경우는 일반적으로 UUID를 표현하는 것이며,
ClojureScript에서 가장 많이 사용되는 tagged literal인 `#js`는 ClojureScript data structure를 직접 JavaScript data structure로 변환하는 것을 의미합니다.
다만 `#js`는 재귀적으로 변환되지 않으므로, 이런 구조를 가진 data-structure이 있다면 [`js->clj`](https://cljs.github.io/api/cljs.core/js-GTclj )를 사용하세요.

`#inst`와 `#uuid`는 edn에서 사용할 수 있습니다. 그러나 `#js`는 edn에서 사용할 수 없습니다.

- [edn Tagged Elements](https://github.com/edn-format/edn#tagged-elements)

### `%`, `%n`, `%&` - Anonymous function arguments

>
`%` is an argument in an anonymous function `#(...)` as in `#(* % %)`.
>
When an anonymous function is expanded, it becomes an `fn` form and `%` args are replaced with gensym’ed names (here we use arg1, etc for readability):

`%`는 `#(...)` 같은 형식의 익명함수에서 인자로 사용됩니다. 예: `#(* % %)`

이런 형식의 익명함수는 확장되면 `fn` 형식이 되며, `%` 인자들은 `gensym`[^gensym] 처리된 이름들로 교체됩니다(여기에서는 가독성을 위해 arg1 등을 사용합시다):

```clojure
user=> (macroexpand `#(println %))
(fn* [arg1] (clojure.core/println arg1))
```

>
Numbers can be placed directly after the `%` to indicate the argument positions (1-based).
Anonymous function arity is determined based on the highest number `%` argument.

`%` 뒤에 숫자가 붙어있다면 순서별 인자를 의미합니다. 숫자는 1부터 시작합니다.
익명 함수의 인자 개수는 `%` 뒤의 숫자 중 가장 큰 수를 따릅니다.

```clojure
user=> (#(println %1 %2) "Hello " "Clojure")
Hello Clojure ; takes 2 args
user=> (macroexpand `#(println %1 %2))
(fn* [arg1 arg2] (clojure.core/println arg1 arg2)) ; takes 2 args

user=> (#(println %4) "Hello " "Clojure " ", Thank " "You!!")
You!! ; takes 4 args, doesn't use first 3 args
user=> (macroexpand `#(println %4))
(fn* [arg1 arg2 arg3 arg4] (clojure.core/println arg4)) ; takes 4 args doesn't use 3
```

>
You don’t have to use the arguments, but you do need to declare them in the order you’d expect an external caller to pass them in.
>
`%` and `%1` can be used interchangeably: 

인자를 반드시 사용해야 하는 것은 아니지만, 함수 호출을 고려하며 인자들의 순서를 정의할 필요가 있습니다.

`%`과 `%1`은 서로 같은 의미를 갖습니다.

```clojure
user=> (macroexpand `#(println % %1)) ; use both % and %1
(fn* [arg1] (clojure.core/println arg1 arg1)) ; still only takes 1 argument
```

>
There is also `%&` which is the symbol used in a variadic anonymous function to represent the "rest" of the arguments (after the highest named anonymous argument).

한편 `%&`는 가변 익명 함수에서 사용되는데, 가장 큰 숫자로 선언된 인자 이후의 "rest" 인자들을 의미합니다.

```clojure
user=> (#(println %&) "Hello " "Clojure " ", Thank " "You!!")
(Hello Clojure , Thank You!! ) ; takes n args
user=> (macroexpand '#(println %&))
(fn* [& rest__11#] (println rest__11#))
```

>
Anonymous functions and `%` are not part of edn.

익명 함수와 `%`는 edn에서 사용할 수 없습니다.

### `@` - Deref

## 참고문헌


## 주석

[^here]: "이곳"은 clojure.org를 말한다.
[^gensym]: `gensym`은 Clojure의 함수. 입력된 prefix 문자열을 사용해 유니크한 이름을 만들어 준다.
