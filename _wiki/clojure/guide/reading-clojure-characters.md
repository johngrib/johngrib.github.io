---
layout  : wiki
title   : Reading Clojure Characters
summary : 번역 중인 문서
date    : 2022-01-07 21:55:12 +0900
updated : 2022-02-21 23:05:33 +0900
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

>
`@` expands into a call to the `deref` function, so these two forms are the same:

`@`는 `deref` 함수 호출로 확장됩니다. 따라서 다음의 두 form은 같습니다.

```clojure
user=> (def x (atom 1))
#'user/x
user=> @x
1
user=> (deref x)
1
user=>
```

>
`@` is used to get the current value of a reference.
The above example uses `@` to get the current value of an [atom]( https://clojure.org/reference/atoms ), but `@` can be applied to other things such as future s, delay s, promises s etc. to force computation and potentially block.

`@`는 참조의 현재 값을 가져오는 데 사용합니다.
위의 예제는 `@`를 사용해서 atom의 현재 값을 가져옵니다.
그러나 `@`는 `future` s, `delay` s, `promise` s 등의 다른 것들에도 적용해 강제로 계산하게 하고 잠재적으로 차단할 수 있습니다.

>
Note that `@` is not available in edn.

`@`는 edn 에서는 사용할 수 없습니다.


### `^` (and `#^`) - Metadata

>
`^` is the metadata marker.
Metadata is a map of values (with shorthand option) that can be attached to various forms in Clojure.
This provides extra information for these forms and can be used for documentation, compilation warnings, typehints, and other features.

`^`는 metadata를 표시합니다.
metadata는 Clojure에서 다양한 form에 붙일 수 있는 map 입니다.
metadata는 form에 대한 추가 정보를 제공해 주며 문서화, 컴파일 경고, 타입 힌트 등의 다양한 기능에 활용됩니다.

```clojure
user=> (def ^{:debug true} five 5) ; meta map with single boolean value
#'user/five
```

>
We can access the metadata by the `meta` function which should be executed against the declaration itself (rather than the returned value):

선언된 대상 자체에 `meta` 함수를 사용해 metadata에 접근할 수 있습니다.

```clojure
user=> (def ^{:debug true} five 5)
#'user/five
user=> (meta #'five)
{:ns #<Namespace user>, :name five, :column 1, :debug true, :line 1, :file "NO_SOURCE_PATH"}
```

>
As we have a single value here, we can use a shorthand notation for declaring the metadata `^:name` which is useful for flags, as the value will be set to true.

플래그가 필요하다면 `^:name`과 같이 짧은 표기법을 사용해 metadata를 선언할 수 있습니다.
이렇게 선언하면 해당 metadata는 true로 설정됩니다.

```clojure
user=> (def ^:debug five 5)
#'user/five
user=> (meta #'five)
{:ns #<Namespace user>, :name five, :column 1, :debug true, :line 1, :file "NO_SOURCE_PATH"}
```

>
Another use of `^` is for type hints.
These are used to tell the compiler what type the value will be and allow it to perform type specific optimizations thus potentially making resultant code faster:

`^`의 또다른 용도는 타입 힌트입니다.
타입 힌트를 통해 컴파일러에 값의 타입을 알려주는 방식을 통해, 타입별 최적화를 수행해 잠재적으로 성능을 향상시킬 수 있습니다.

```clojure
user=> (def ^Integer five 5)
#'user/five
user=> (meta #'five)
{:ns #<Namespace user>, :name five, :column 1, :line 1, :file "NO_SOURCE_PATH", :tag java.lang.Integer}
```

>
We can see in that example the `:tag` property is set.

바로 앞의 에제를 보면 `:tag` 속성이 설정되어 있는 것을 알 수 있습니다.

>
You can also stack the shorthand notations:

축약 표기법은 여러개를 사용할 수도 있습니다.

```clojure
user=> (def ^Integer ^:debug ^:private five 5)
#'user/five
user=> (meta #'five)
{:ns #<Namespace user>, :name five, :column 1, :private true, :debug true, :line 1, :file "NO_SOURCE_PATH", :tag java.lang.Integer}
```

>
Originally, meta was declared with `#^`, which is now deprecated (but still works).
Later, this was simplified to just `^` and that is what you will see in most Clojure, but occasionally you will encounter the `#^` syntax in older code.

본래 `meta`는 `#^`로 선언되었었지만, 이제는 deprecated되었습니다(아직 작동하긴 합니다).
이는 나중에 `^`로 더 단순하게 축약되었으므로 대부분의 Clojure 코드에서 `^`를 볼 수 있을 것입니다.
하지만 오래된 몇몇 코드에서는 `#^` 표기법을 목격하게 될 수 있습니다.

>
Note that metadata is available in edn, but type hints are not.

metadata는 edn에서 사용할 수 있지만, 타입 힌트는 edn에서는 사용할 수 없습니다.

- [Clojure Official Documentation]( https://clojure.org/reference/metadata )
    - [[/clojure/reference/metadata]] (한국어)
- [Learning Clojure: Meta Data]( http://en.wikibooks.org/wiki/Learning_Clojure/Meta_Data )

### `'` - Quote

>
Quoting is used to indicate that the next form should be read but not evaluated.
The reader expands `'` into a call to the `quote` special form.

외따옴표는 form을 읽을 때 evaluate하지 않아야 한다는 것을 표현할 때 사용합니다.
reader는 `'`를 확장해서 `quote` form으로 확장합니다.

```clojure
user=> (1 3 4) ; fails as it tries to invoke 1 as a function

Execution error (ClassCastException) at myproject.person-names/eval230 (REPL:1).
class java.lang.Long cannot be cast to class clojure.lang.IFn

user=> '(1 3 4) ; quote
(1 3 4)

user=> (quote (1 2 3)) ; using the longer quote method
(1 2 3)
user=>
```

- [Clojure Special Forms](https://clojure.org/reference/special_forms#quote)

### `;` - Comment

>
`;` starts a line comment and ignores all input from its starting point to the end of the line.

line comment는 `;`로 시작합니다.

```clojure
user=> (def x "x") ; this is a comment
#'user/x
user=> ; this is a comment too
<returns nothing>
```

>
It is common in Clojure to use multiple semicolons for readability or emphasis, but these are all the same to Clojure

Clojure에서는 특정 구문을 강조하거나 가독성 확보를 위해 여러 개의 세미콜론을 사용하곤 합니다. 물론 Clojure 에서는 세미콜론을 몇 개를 사용해도 한 개를 사용한 것과 같습니다.

```clojure
;; This is probably more important than

; this
```

### `:` - Keyword

>
`:` is the indicator for a keyword.
Keywords are often used as keys in maps and they provide faster comparisons and lower memory overhead than strings (because instances are cached and reused).

키워드는 `:`로 시작합니다.
키워드는 string에 비해 메모리 오버헤드가 더 적으며, 비교가 훨씬 빠릅니다(왜냐하면 키워드의 인스턴스가 캐시되며, 재사용되기 때문입니다).
키워드는 map에서 key로 주로 사용됩니다.

```clojure
user=> (type :test)
clojure.lang.Keyword
```

>
Alternatively you can use the keyword function to create a keyword from a string

`string`을 사용해 키워드를 생성하려면 `keyword` 함수를 사용하면 됩니다.

```clojure
user=> (keyword "test")
:test
```

>
Keywords can also be invoked as functions to look themselves up as a key in a map:

키워드를 함수로 사용하면 map에 대해 값을 조회하는 용도로 쓸 수 있습니다.

```clojure
user=> (def my-map {:one 1 :two 2})
#'user/my-map
user=> (:one my-map) ; get the value for :one by invoking it as function
1
user=> (:three my-map) ; it can safely check for missing keys
nil
user=> (:three my-map 3) ; it can return a default if specified
3
user => (get my-map :three 3) ; same as above, but using get
3
```

- [Data Structures - Keywords](https://clojure.org/reference/data_structures#Keywords)

### `::` - Auto-resolved keyword

>
`::` is used to auto-resolve a keyword in the current namespace.
If no qualifier is specified, it will auto-resolve to the current namespace.
If a qualifier is specified, it may use aliases in the current namespace:

`::`를 쓰면 현재 namespace 기준으로 경로를 자동 지정해 줍니다.
만약 qualifier를 지정해주지 않는다면, 자동으로 현재 namespace로 자동 설정합니다.
qualifier를 지정한다면, 현재 namespace에서 alias를 사용하는 것이 가능합니다.

```clojure
user=> :my-keyword
:my-keyword
user=> ::my-keyword
:user/my-keyword
user=> (= ::my-keyword :my-keyword)
false
```

>
This is useful when creating macros.
If you want to ensure that a macro that calls another function in the macro namespace correctly expands to call the function, you could use ::my-function to refer to the fully qualified name.

이로 인해 macro를 만들 때 유용하게 사용할 수 있습니다.
만약 macro의 namespace에 있는 다른 함수를 호출하도록 macro가 확장되게 하려면, `::my-function`을 사용해 (자동으로) 정규화된 이름을 지정할 수 있습니다.

>
Note that `::` is not available in edn.

`::`는 edn 에서는 사용할 수 없습니다.

- [Reader](https://clojure.org/reference/reader)

### `#:` and `#::` - Namespace Map Syntax

>
Namespace map syntax was added in Clojure 1.9 and is used to specify a default namespace context when keys or symbols in a map where they share a common namespace.

Namespace map syntax는 Clojure 1.9 부터 추가됐으며, map 안의 key나 symbol이 공통되는 namespace를 가지고 있을 때 그러한 namespace context를 지정하기 위해 사용됩니다.

>
The `#:ns` syntax specifies a fully-qualified namespace map prefix n alias in the namespace map prefix with, where ns is the name of a namespace and the prefix precedes the opening brace `{` of the map.

`#:ns`는 namespace map prefix에 지정해줍니다. 여기에서 `ns`는 namespace의 이름이며, map의 `{` 앞에 써주면 됩니다.

>
For example, the following map literal with namespace syntax:

다음은 namespace syntax를 사용한 map 리터럴의 예입니다.

```clojure
#:person{:first "Han"
         :last "Solo"
         :ship #:ship{:name "Millennium Falcon"
                      :model "YT-1300f light freighter"}}
```

>
is read as:

위의 map 리터럴은 아래와 같이 읽힙니다.

```clojure
{:person/first "Han"
 :person/last "Solo"
 :person/ship {:ship/name "Millennium Falcon"
               :ship/model "YT-1300f light freighter"}}
```

>
Note that these maps represent the identical object - these are just alternate syntaxes.

위의 두 map은 같습니다. 같은 대상을 표현하는 다른 문법이라 할 수 있습니다.

>
`#::` can be used to auto-resolve the namespace of keyword or symbol keys in a map using the current namespace.
>
These two examples are equivalent:

`#::`는 현재 namespace를 사용해 keyword나 symbol의 namespace를 자동으로 지정해 줍니다.

아래의 두 예제는 같습니다.

```clojure
user=> (keys {:user/a 1, :user/b 2})
(:user/a :user/b)
user=> (keys #::{:a 1, :b 2})
(:user/a :user/b)
```

>
Similar to [autoresolved keywords](https://clojure.org/guides/weird_characters#autoresolved_keys ), you can also use `#::alias` to auto-resolve with a namespace alias defined in the `ns` form:

`::`와 비슷하게, `#::alias`를 써서 namespace alias를 사용해서 자동으로 namespace를 지정할 수도 있습니다.

```clojure
(ns rebel.core
  (:require
    [rebel.person :as p]
    [rebel.ship   :as s] ))

#::p{:first "Han"
     :last "Solo"
     :ship #::s{:name "Millennium Falcon"
                :model "YT-1300f light freighter"}}
```

>
is read the same as:

위의 에제는 아래와 같이 읽힙니다.

```clojure
{:rebel.person/first "Han"
 :rebel.person/last "Solo"
 :rebel.person/ship {:rebel.ship/name "Millennium Falcon"
                     :rebel.ship/model "YT-1300f light freighter"}}
```

- [Reader](https://clojure.org/reference/reader#map_namespace_syntax )


### `/` - Namespace separator

>
`/` can be the division function `clojure.core//`, but can also act as a separator in a symbol name to separate a symbol’s name and namespace qualifier, e.g. my-namespace/utils.
Namespace qualifiers can thus prevent naming collisions for simple names.

`/`는 나눗셈 함수이기도 합니다(`clojure.core//`).
한편으로는 symbol의 이름과 namespace를 구분하기 위한 구분자이기도 합니다. (예: `my-namespace/utils`)
구분자가 있기 때문에 Namespace 한정자는 간단한 이름들이 중복되는 것을 방지할 수 있습니다.

* [Reader](https://clojure.org/reference/reader )

### `\` - Character literal

>
`\` indicates a literal character as in:

`\`는 문자 리터럴을 표현합니다.

```clojure
user=> (str \h \i)
"hi"
```

>
There are also a small number of special characters to name special ASCII characters: `\newline`, `\space`, `\tab`, `\formfeed`, `\backspace`, and `\return`.

보통은 `\h` 처럼 `\` 뒤에 한 글자가 오지만, 다음과 같이 몇몇 특수한 ASCII 문자들을 표현하기 위한 표기법도 있습니다.

`\newline`, `\space`, `\tab`, `\formfeed`, `\backspace`, `\return`

>
The `\` can also be followed by a Unicode literal of the form `\uNNNN`. For example, `\u03A9` is the literal for `Ω`.

`\uNNNN`의 형식으로 유니코드 리터럴을 사용할 수도 있습니다. 예를 들어, `\u03A9`는 `Ω`를 나타냅니다.

### `$` - Inner class reference



## 참고문헌


## 주석

[^here]: "이곳"은 clojure.org를 말한다.
[^gensym]: `gensym`은 Clojure의 함수. 입력된 prefix 문자열을 사용해 유니크한 이름을 만들어 준다.

