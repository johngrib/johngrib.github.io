---
layout  : wiki
title   : Reading Clojure Characters
summary : Clojure의 다양한 특수문자들
date    : 2022-01-07 21:55:12 +0900
updated : 2022-05-11 20:46:52 +0900
tag     : clojure 번역
resource: 1E/FEA196-2411-48EE-A1A2-5275B142A880
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

이 페이지에서는 Clojure 신택스에서 사용하지만 구글에서 검색하기에는 어려운 문자들을 설명합니다.
각 섹션을 정렬한 기준은 딱히 없지만, 편의를 위해 서로 관련 있는 항목들끼리 모아 놓았습니다.
Clojure reader에 대한 공식 레퍼런스인 [reader reference]( https://clojure.org/reference/reader ) 페이지를 꼭 참고하시기 바랍니다.
이 가이드는 James Hughes의 블로그의 글을 토대로 하며, 저자의 허가를 받아 이곳에서 업데이트 및 확장되었습니다.[^here]

### `( ... )` - List

>
Lists are sequential heterogeneous collections implemented as a linked list.
>
- [Clojure Documentation: Lists]( https://clojure.org/reference/data_structures#Lists )
>
A list of three values:

List는 아이템의 순서를 보장하고, 아이템의 타입을 가리지 않는 컬렉션입니다.

다음은 3개의 값을 갖는 리스트입니다.

```clojure
(1 "two" 3.0)
```

### `[ ... ]` - Vector

>
Vectors are sequential, indexed, heterogeneous collections. Indexing is 0-based.
>
An example of retrieving the value at index 1 in a vector of three values:

Vector는 아이템의 순서를 보장하고, 타입을 가리지 않으며, 인덱스가 있는 컬렉션입니다.
인덱스는 0부터 시작합니다.

다음은 3개의 값을 가진 Vector에서 1번 인덱스를 검색하는 예제 입니다.

```clojure
user=> (get ["a" 13.7 :foo] 1)
13.7
```

- [Clojure Documentation: Vectors]( https://clojure.org/reference/data_structures#Vectors )

### `{ ... }` - Map

>
Maps are heterogeneous collections specified with alternating keys and values:

Map은 키와 값을 번갈아가며 지정하는 컬렉션입니다. Map 또한 타입을 가리지 않습니다.

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

`#(`라던가 `#"` 처럼 `#`이 다른 문자의 옆에 붙어 있는 것을 종종 볼 수 있습니다.

`#`은 Clojure reader(Clojure 소스를 가져와서 Clojure data로 "읽어내는" 컴포넌트를 말합니다)에게 다음에 오는 문자를 해석하는 방법을 read table을 사용해 알려주는 특수 문자입니다. 몇몇 Lisp 언어들은 사용자들이 read table을 확장할 수 있도록 허용하지만, Clojure는 read table 확장을 허용하지 않습니다.

`#`은 또한 generated symbol[^gensym]을 생성할 때 구문의 안쪽에서 symbol의 마지막에 붙이는 문자이기도 합니다.

### `#{ ...}` - Set

>
See [`#`]( https://clojure.org/guides/weird_characters#dispatch ) for additional details.
>
`#{…}` defines a set (a collection of unique values), specifically a `hash-set`. The following are equivalent:

`#{ ... }`는 set(유일한 값들의 컬렉션)을 정의합니다.
이렇게 정의한 set은 `hash-set`을 사용하고 있으므로 다음의 두 set은 같습니다.

```clojure
user=> #{1 2 3 4}
#{1 2 3 4}
user=> (hash-set 1 2 3 4)
#{1 2 3 4}
```

>
Sets cannot contain duplicates and thus the `set` reader will throw an exception in this case as it is an invalid literal. When items are added to a set, they are simply dropped if the value is already present.

set는 중복을 허용하지 않으므로, `set` reader는 아래의 예제 코드를 invalid literal로 판별해 예외를 던질 것입니다.
만약 set에 아이템을 추가하는 경우에 해당 값이 이미 들어가 있는 경우라면 예외는 던져지지 않고 추가하는 아이템은 무시됩니다.

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

`#_`가 edn에서도 작동한다는 걸 기억해두세요.

여러 개의 form을 생략하는 것이 필요하다면 `#_`를 여러 번 사용하는 트릭도 있습니다.

```clojure
user=> {:a 1, #_#_ :b 2, :c 3}
{:a 1, :c 3}
```

>
The docs suggest that "The form following #_ is completely skipped by the reader (This is a more complete removal than the comment macro which yields nil).". This can prove useful for debugging situations or for multiline comments.

공식 문서를 보면 **"`#_` 뒤에 오는 form은 reader에게 완전히 무시된다(이것은 nil로 평가되는 comment macro보다 더 강력한 제거 방식입니다)"**라고 나와 있습니다. `#_`는 디버깅할 때나 여러 줄에 잇달아 코멘트 처리를 해야 할 때 편하게 사용할 수 있습니다.

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
한편 Clojure에서 정규식을 사용할 때에는 Java처럼 string 내에서 몇몇 문자를 escaping하는 번거로운 일을 하지 않아도 된다는 것을 기억해 두세요.

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
The reader expands an anonymous function into a function definition whose arity (the number of arguments it takes) is defined by how the `%` placeholders are declared.
See the `%` character for discussion around arity.

reader는 이런 익명 함수를 함수 정의로 확장해 인식합니다.
해당 함수의 arity(함수가 받는 인자의 개수)는 `%` 인자 지정을 어떻게 사용하는지에 따라 정의됩니다.
`%`를 사용하는 방식에 대한 자세한 정보는 `%` 항목을 참고하세요.

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
특정 대상이 표현하는 값이 아니라 reference/declaration에 대해 이야기하려 할 때 이 방법이 유용합니다.
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

`%`는 `#(...)` 형식의 익명함수에서 인자로 사용됩니다. 예: `#(* % %)`

이런 형식의 익명함수는 확장되면 `fn` 형식이 되며, `%` 인자들은 `gensym`[^gensym] 처리된 이름들로 교체됩니다(여기에서는 가독성을 위해 arg1 등을 사용합니다):

```clojure
user=> (macroexpand `#(println %))
(fn* [arg1] (clojure.core/println arg1))
```

>
Numbers can be placed directly after the `%` to indicate the argument positions (1-based).
Anonymous function arity is determined based on the highest number `%` argument.

`%` 뒤에 숫자가 붙어있다면 순서로 구분한 인자를 의미합니다.
이 숫자는 1부터 시작합니다.
즉 익명 함수의 인자 개수(arity)는 `%` 뒤의 숫자 중 가장 큰 수에 의해 결정됩니다.

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
하지만 오래된 코드를 읽다 보면 `#^` 표기법을 보게 될 수도 있습니다.

>
Note that metadata is available in edn, but type hints are not.

metadata는 edn에서 사용할 수 있습니다. 그러나 타입 힌트는 edn에서는 사용할 수 없습니다.

- [Clojure Official Documentation]( https://clojure.org/reference/metadata )
    - [[/clojure/reference/metadata]] (한국어)
- [Learning Clojure: Meta Data]( http://en.wikibooks.org/wiki/Learning_Clojure/Meta_Data )

### `'` - Quote

>
Quoting is used to indicate that the next form should be read but not evaluated.
The reader expands `'` into a call to the `quote` special form.

외따옴표`'`는 form을 읽을 때 평가하지 말라는 것을 표현할 때 사용합니다.
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

줄 단위 주석은 `;`로 시작합니다.

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
키워드는 string에 비해 메모리 오버헤드가 더 적으며, 비교가 훨씬 빠릅니다(왜냐하면 키워드의 인스턴스가 캐시되며 재사용되기 때문입니다).
키워드는 주로 map에서 key로 사용됩니다.

```clojure
user=> (type :test)
clojure.lang.Keyword
```

>
Alternatively you can use the keyword function to create a keyword from a string

`string`으로 키워드를 생성하려면 `keyword` 함수를 사용하면 됩니다.

```clojure
user=> (keyword "test")
:test
```

>
Keywords can also be invoked as functions to look themselves up as a key in a map:

키워드를 함수로 사용하면 map에서 값을 조회할 수 있습니다.

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
한편으로는 symbol의 이름과 namespace를 구분하기 위한 구분자이기도 합니다(예: `my-namespace/utils`).
이 구분자가 있기 때문에 Namespace에서 이름이 중복되는 것을 방지할 수 있습니다.

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

>
Used to reference inner classes and interfaces in Java. Separates the container class name and the inner class name.

Java에서 inner class와 interface를 참조하기 위해 사용됩니다. `$` 기호를 통해 컨테이너 class 이름과 inner class 이름이 구분됩니다.

```clojure
(import (basex.core BaseXClient$EventNotifier)

(defn- build-notifier [notifier-action]
  (reify BaseXClient$EventNotifier
    (notify [this value]
      (notifier-action value))))
```

>
`EventNotifier` is an inner interface of the `BaseXClient` class which is an imported Java class

위의 예제에서 `EventNotifier`는 `BaseXClient` class의 inner interface입니다.

- [Clojure: Using Java Inner Classes](http://blog.jayfields.com/2011/01/clojure-using-java-inner-classes.html )
- [Official Documentation](https://clojure.org/reference/java_interop )


### `->`, `->>`, `some->`, `cond->`, `as->` etc. - Threading macros

>
These are threading macros. Please refer to [Official Clojure Documentation](https://clojure.org/guides/threading_macros )

이것들은 스레딩 매크로입니다. 자세한 내용은 공식 문서를 참고하세요.

- [Understanding the Clojure -> macro](http://blog.fogus.me/2009/09/04/understanding-the-clojure-macro/)

### ``` ` ```  - Syntax quote

>
``` ` ``` is the syntax quote. Syntax quote is similar to quoting (to delay evaluation) but has some additional effects.
>
Basic syntax quote may look similar to normal quoting:

``` ` ```는 syntax quote입니다. 평가를 고의로 지연시키기 위해 인용하는 것과 비슷하지만, 추가적인 효과가 있습니다.

이 구문은 기본적으로 평범한 인용과 비슷하게 보입니다.

```clojure
user=> (1 2 3)
Execution error (ClassCastException) at myproject.person-names/eval232 (REPL:1).
class java.lang.Long cannot be cast to class clojure.lang.IFn
user=> `(1 2 3)
(1 2 3)
```

>
However, symbols used within a syntax quote are fully resolved with respect to the current namespace:

그러나 syntax quote에서 사용된 symbol은 현재의 namespace를 기준으로 resolve됩니다.

```clojure
user=> (def five 5)
#'user/five
user=> `five
user/five
```

(``` `five ```가 `user/five`로 resolve된 것에 주목하자.)

>
Syntax quote is most used as a "template" mechanism within macros. We can write one now:

syntax quote는 macro 내에서 "template" 메커니즘으로 많이 사용됩니다. 아래과 같이 작성할 수 있습니다.

```clojure
user=> (defmacro debug [body]
  #_=>   `(let [val# ~body]
  #_=>      (println "DEBUG: " val#)
  #_=>      val#))
#'user/debug
user=> (debug (+ 2 2))
DEBUG:  4
4
```

>
Macros are functions invoked by the compiler with code as data.
They are expected to return code (as data) that can be further compiled and evaluated.
This macro takes a single body expression and returns a `let` form that will evaluate the body, print its value, and then return the value.
Here the syntax quote creates a list, but does not evaluate it.
That list is actually code.

macro는 코드를 입력 데이터로 삼는 컴파일러에서 호출되는 함수라 할 수 있습니다.
macro는 컴파일도 되고 평가도 되는 코드(데이터로서의 코드)를 리턴해야만 합니다.
이 macro는 하나의 body expression을 입력으로 받아서 하나의 `let` form을 리턴합니다.
그리고 이 `let` form은 주어진 body를 평가하고, 그 값을 출력한 다음 리턴합니다.
이 때, syntax quote 는 list 하나를 생성하지만, 평가하지는 않습니다.
그리고 그 생성된 list는 실제 코드입니다.

>
See [`~@`](https://clojure.org/guides/weird_characters#unquote_splicing ) and [`~`](https://clojure.org/guides/weird_characters#unquote ) for additional syntax allowed only within syntax quote.

syntax quote 내에서는 허용되는 추가적인 syntax에 대해서는 `~@`와 `~` 문서를 참고하세요.

- [Clojure for the Brave and True - Writing Macros](http://www.braveclojure.com/writing-macros/)
- [Clojure from the ground up: macros](http://aphyr.com/posts/305-clojure-from-the-ground-up-macros)
- [Clojure Official Documentation](https://clojure.org/reference/macros)

### `~` - Unquote

>
See [``` ` ```](https://clojure.org/guides/weird_characters#syntax_quote ) for additional information.
>
`~` is unquote. Syntax quote, like quote, means that evaluation is not occurring within the syntax quoted form.
Unquoting turns off quoting and evaluates an expression inside the syntax quoted expression.

`~`는 인용을 해제합니다. syntax quote는 quote처럼 표현식을 평가시키지 않는 것을 의미하는데,
unquote는 syntax quote된 표현식에서 quote를 해제해서 표현식이 평가되도록 합니다.

```clojure
user=> (def five 5) ; create a named var with the value 5
#'user/five
user=> five ; the symbol five is evaluated to its value
5
user=> `five ; syntax quoting five will avoid evaluating the symbol, and fully resolve it
user/five
user=> `~five ; within a syntax quoted block, ~ will turn evaluation back on just for the next form
5
user=> `[inc ~(+ 1 five)]
[clojure.core/inc 6]
```

>
Syntax quoting and unquote are essential tools for writing macros, which are functions invoked during compilation that take code and return code.

syntax quote와 unquote는 macro 작성에 있어 필수적인 도구라 할 수 있습니다.

- [Clojure for the Brave and True - Writing Macros](http://www.braveclojure.com/writing-macros/ )
- [Clojure from the ground up: macros](http://aphyr.com/posts/305-clojure-from-the-ground-up-macros )
- [Clojure Official Documentation](https://clojure.org/macros )

### `~@` - Unquote splicing

>
See [``` ` ```](https://clojure.org/guides/weird_characters#syntax_quote ) and [`~`](https://clojure.org/guides/weird_characters#unquote ) for additional information.
>
`~@` is unquote-splicing.
Where unquote [(`~`)](https://clojure.org/guides/weird_characters#unquote ) evaluates a form and places the result into the quoted result, `~@` expects the evaluated value to be a collection and splices the _contents_ of that collection into the quoted result.

`~@`는 unquote-splicing을 의미합니다.
unquote(`~`)와 비교해 봅시다.
unquote는 form을 평가하고 평가한 결과를 quoted result에 집어넣는데, `~@`는 평가된 결과 값을 컬렉션으로 가정하고 quoted result에 컬렉션의 내용물들을 집어넣습니다.

```clojure
user=> (def three-and-four (list 3 4))
#'user/three-and-four
user=> `(1 ~three-and-four) ; evaluates `three-and-four` and places it in the result
(1 (3 4))
user=> `(1 ~@three-and-four) ;  evaluates `three-and-four` and places its contents in the result
(1 3 4)
```

>
Again, this is a powerful tool for writing macros.

`~@` 또한 macro 작성을 위한 강력한 도구입니다.

### `<symbol>#` - Gensym

>
A `#` _at the end_ of a symbol is used to automatically generate a new symbol.
This is useful inside macros to keep macro specifics from leaking into the userspace.
A regular `let` will fail in a macro definition:

symbol 끝에 있는 `#`는 자동으로 새로운 symbol을 생성하는 데에 사용됩니다.
매크로 내부에서 매크로의 상세 내역을 userspace로 유출되는 것을 방지하고 싶을 때 유용하게 사용할 수 있습니다.

다음 예제를 봅시다.
macro를 정의할 때 평범하게 `let`을 사용하면 실패합니다.

```clojure
user=> (defmacro m [] `(let [x 1] x))
#'user/m
user=> (m)
Syntax error macroexpanding clojure.core/let at (REPL:1:1).
myproject.person-names/x - failed: simple-symbol? at: [:bindings :form :local-symbol]
  spec: :clojure.core.specs.alpha/local-name
myproject.person-names/x - failed: vector? at: [:bindings :form :seq-destructure]
  spec: :clojure.core.specs.alpha/seq-binding-form
myproject.person-names/x - failed: map? at: [:bindings :form :map-destructure]
  spec: :clojure.core.specs.alpha/map-bindings
myproject.person-names/x - failed: map? at: [:bindings :form :map-destructure]
  spec: :clojure.core.specs.alpha/map-special-binding
```

>
This is because symbols inside a syntax quote are fully resolved, including the local binding `x` here.
>
Instead you can append `#` to the end of the variable name and let Clojure generate a unique (unqualified) symbol:

이렇게 실패하는 이유는 `let`을 통한 로컬 바인딩인 `x`를 포함한 quote syntax 내부에 있는 symbol들이 전부 해석되기 때문입니다.

대안으로 `#`를 변수명 뒤에 붙여줘 봅시다.
이렇게 하면 Clojure가 유니크한(정규화되지 않은) symbol을 생성하게 됩니다.

```clojure
user=> (defmacro m [] `(let [x# 1] x#))
#'user/m
user=> (m)
1
user=>
```

>
Importantly, every time a particular `x#` is used within a single syntax quote, the _same_ generated name will be used.
>
If we expand this macro, we can see the `gensym` 'd name:

이때 중요한 점은, quote syntax 안쪽에서 `x#`이 쓰이는 곳마다 똑같은 이름이 사용되도록 생성된다는 것입니다.

이 macro를 확장해보면, `gensym`된 이름을 확인해 볼 수 있습니다.

```clojure
user=> (macroexpand '(m))
(let* [x__681__auto__ 1] x__681__auto__)
```

- [ClojureDocs - gensym](http://clojuredocs.org/clojure_core/clojure.core/gensym )

### `#?` - Reader conditional

>
Reader conditionals are designed to allow different dialects of Clojure to share common code.
The reader conditional behaves similarly to a traditional `cond`.
The syntax for usage is `#?` and looks like this:

조건부 reader는 Clojure의 여러 방언에서 돌아갈 수 있는 코드를 지원하기 위해 설계되었습니다.
조건부 reader는 언어 키워드가 조건으로 주어진 `cond`와 비슷하게 동작합니다.
조건부 reader는 `#?`로 시작하는 form에 예제와 같이 언어별 조건을 작성해 주는 식으로 사용할 수 있습니다.

```clojure
#?(:clj  (Clojure expression)
   :cljs (ClojureScript expression)
   :cljr (Clojure CLR expression)
   :default (fallthrough expression))
```

- [Reader conditionals](https://clojure.org/guides/reader_conditionals )

### `#?@` - Splicing Reader conditional

>
The syntax for a splicing reader conditional is `#?@`.
It is used to splice lists into the containing form.
So the Clojure reader would read this:

`#?@`를 사용하면 조건부 reader에 넘겨줄 form에 포함된 list를 splicing합니다.
즉 아래와 같은 코드가 주어지면, Clojure reader는(`:clj` 조건)...

```clojure
(defn build-list []
  (list #?@(:clj  [5 6 7 8]
            :cljs [1 2 3 4])))
```

>
as this:

다음과 같이 읽습니다.

```clojure
(defn build-list []
  (list 5 6 7 8))
```

- [Reader conditonals](https://clojure.org/guides/reader_conditionals )

### `*var-name*` - "Earmuffs"

>
Earmuffs (a pair of asterisk bookending var names) is a naming convention in many LISPs used to denote _special vars_.
Most commonly in Clojure this is used to denote _dynamic_ vars, i.e. ones that can change depending on dynamic scope.
The earmuffs act as a warning that "here be dragons" and to never assume the state of the var.
Remember, this is a convention, not a rule.

많은 LISP 언어의 이름 짓기 컨벤셔션에서 별표가 좌우에 있는 특수한 변수들을 귀마개 변수라고 부릅니다.
Clojure에서는 이 귀마개 변수를 일반적으로 dynamic vars라고 부르며, 스코프에 따라 동적으로 변화할 수 있는 변수를 의미합니다.
단, 귀마개는 "여기에 드래곤이 있어요!"라고 경고하는 것이며 절대로 변수가 어떤 것인지를 보장하지는 않습니다.
이게 규칙이 아니라 관례라는 것을 꼭 기억해 두세요.

>
Core Clojure examples include `*out*` and `*in*` which represent the standard in and out streams for Clojure.

Clojure의 core 예제를 살펴보면 standard out을 표현하는 `*out*`과 standard in을 표현하는 `*in*`이 포함되어 있습니다.

- [How is the var-name naming-convention used in clojure?](http://stackoverflow.com/questions/1986961/how-is-the-var-name-naming-convention-used-in-clojure )
- [Clojure API Docs](http://clojure.github.io/clojure/clojure.core-api.html#clojure.core/*out* )


### `>!!`, `<!!`, `>!`, and `<!` - core.async channel macros

>
These symbols are channel operations in [`core.async`](https://github.com/clojure/core.async ) - a Clojure/ClojureScript library for channel based asynchronous programming (specifically [CSP - Communicating Sequential Processes](http://en.wikipedia.org/wiki/Communicating_sequential_processes )).
>
If you imagine, for the sake of argument, a channel is a bit like a queue that things can put stuff on and take stuff off, then these symbols support that simple API.
>
- `>!!` and `<!!` are _blocking put_ and _take_ respectively
- `>!` and `<!` are, simply _put_ and _take_

이 symbol들은 `core.async`의 channel operation들입니다.
`core.async`는 Clojure와 ClojureScript의 channel 기반(특히 CSP - Communicating Sequential Processes) 비동기 프로그래밍 라이브러리입니다.

channel은 무언가를 넣고 뺄 수 있는 queue와 같은 것이라고 상상해 보세요.

- `>!!`, `<!!` - 동기식의 blocking put 과 blocking take.
- `>!`, `<!` - 간단한 비동기식의 put 과 take.

>
The difference being the blocking version operate outside `go` blocks and block the thread they operate on.

blocking 버전은 `go` 블록 바깥에서 작동하며, 작동하는 동안 스레드를 차단합니다.

```clojure
user=> (def my-channel (chan 10)) ; create a channel
user=> (>!! my-channel "hello")   ; put stuff on the channel
user=> (println (<!! my-channel)) ; take stuff off the channel
hello
```

>
The non-blocking versions need to be executed within a `go` block, otherwise they’ll throw an exception.

반면 non-blocking 버전은 `go` 블록 안쪽에서 실행해줘야 하며, 그렇게 하지 않으면 예외를 던지게 됩니다.

```clojure
user=> (def c (chan))
#'user/c
user=> (>! c "nope")
AssertionError Assert failed: >! used not in (go ...) block
nil  clojure.core.async/>! (async.clj:123)
```

>
While the difference between these is well outside the scope of this guide, fundamentally the `go` blocks operate and manage their own resources pausing **execution** of code without blocking threads.
This makes asynchronously executed code appear to be synchronous, removing the pain of managing asynchronous code from the code base.

이 두 방식 간의 차이점을 논하는 것은 이 가이드 문서의 범위를 벗어나는 것이지만, 기본적인 사항만 언급합니다.
`go` 블록은 스레드를 차단하지 않으면서 자신만의 리소스를 관리하고 실행합니다.
이를 통해 비동기식으로 실행된 코드가 동기식 코드와 비슷하게 보이게 되어, 코드 베이스에서 비동기식 코드를 관리하는 괴로움을 제거해 줍니다.

- [core.async Code Walkthrough](https://github.com/clojure/core.async/blob/master/examples/walkthrough.clj )
- [core.async Wiki](https://github.com/clojure/core.async/wiki )
- [Go Block Best Practices](https://clojure.org/guides/core_async_go )

### `<symbol>?` - Predicate Suffix

>
Putting `?` at the end of a symbol is a naming convention common across many languages that support special characters in their symbol names.
It is used to indicate that the thing is a predicate, i.e. that it _poses a question_.
For example, imagine using an API that dealt with buffer manipulation:

symbol 마지막에 `?`기호를 붙이는 것은, symbol 이름에 특수 문자를 허용하는 다양한 언어들에서 흔히 찾아볼 수 있는 컨벤션입니다.
이 표기법은 주어진 대상에 대한 단정을 표현합니다. 즉, 참인지 거짓인지를 질문하는 표현입니다.
예를 들어, 버퍼 조작을 처리하는 API를 사용해 본다고 가정해 봅시다.

```clojure
(def my-buffer (buffers/create-buffer [1 2 3]))
(buffers/empty my-buffer)
```

>
At a glance, how would you know if the function `empty` in this case,
>
- Returned `true` if the passed in buffer was empty, or,
- Cleared the buffer

이 경우에 `empty` 함수가 어떻게 작동하는지 한 눈에 알아볼 수 있나요?

- 버퍼가 비어 있다면 `true`를 리턴하는 함수
- 버퍼를 클리어하는 함수

>
While the author could have renamed `empty` to `is-empty`, the richness of symbol naming in Clojure allows us to express intent more symbolically.

물론 코드 작성자는 이 함수의 이름을 `empty`에서 `is-empty`로 바꿀 수 있긴 합니다.
그러나 Clojure에서는 symbol 이름을 지을 때 다양한 기호를 사용할 수 있으므로 `?` 같은 기호를 써서 의도를 더 잘 표현할 수 있습니다.

```clojure
(def my-buffer (buffers/create-buffer [1 2 3]))
(buffers/empty? my-buffer)
false
```

>
This is simply a recommended convention, not a requirement.

이것은 권장 컨벤션이며, 필수적인 규칙은 아닙니다.

- [Clojure Style Guide](https://github.com/bbatsov/clojure-style-guide#naming)

### `<symbol>!` - Unsafe Operations

>
[The Clojure style guide has this to say](https://github.com/bbatsov/clojure-style-guide#changing-state-fns-with-exclamation-mark ):
>>
The names of functions/macros that are not safe in STM transactions should end with an exclamation mark (e.g `reset!`).
>
You’ll most commonly see this appended to function names whose purpose is to mutate state, e.g. connecting to a data store, updating an atom or closing a file stream


Clojure 스타일 가이드 문서에는 다음과 같은 말이 있습니다.

**"STM 트랜잭션에서 안전하지 않은 함수와 매크로의 이름은 느낌표로 끝내야 합니다.(예: `reset!`)**

데이터 저장소에 접속한다던가, atom을 업데이트한다던가, file stream을 close하는 것과 같이 상태를 변경하는 종류의 함수 이름에서 `!`를 볼 수 있을 것입니다.

```clojure
user=> (def my-stateful-thing (atom 0))
#'user/my-stateful-thing
user=> (swap! my-stateful-thing inc)
1
user=> @my-stateful-thing
1
```

>
This is simply a recommended convention and not a requirement.
>
Note that the exclamation mark is often pronounced as bang.

이것 또한 권장 컨벤션이며, 필수적인 규칙은 아닙니다.

느낌표를 소리 내어 읽을 때에는 보통 "bang"으로 발음합니다.

* [Clojure Style Guide](https://github.com/bbatsov/clojure-style-guide#naming )

### `_` - Unused argument

>
When you see the underscore character used as function arguments or in a `let` binding, `_` is a common naming convention to indicate you won’t be using this argument.
>
This is an example using the `add-watch` function that can be used to add callback style behaviour when atoms change value.
Imagine, given an atom, we want to print the new value every time it changes:

함수 인자나, `let` 바인딩에서 `_`를 종종 볼 수 있을 것입니다.
`_`는 사용하지 않는 인자에 대한 일반적인 명명 컨벤션입니다.

다음은 `add-watch` 함수를 사용해 atom 값이 변경될 때에 대한 콜백 스타일 동작을 추가하는 예입니다.
주어진 atom에 대해 값이 변경될 때마다 새로운 값을 출력하고 싶은 상황이라고 생각해 보세요.

```clojure
(def value (atom 0))

(add-watch value nil (fn [_ _ _ new-value]
                       (println new-value))

(reset! value 6)
; prints 6
(reset! value 9)
; prints 9
```

>
`add-watch` takes four arguments, but in our case we only really care about the last argument - the new value of the atom so we use `_` for the others.

`add-watch`는 4개의 인자를 받지만, 여기에서는 atom의 새로운 값으로 할당할 마지막 인자만 사용하고 있습니다.
따라서 나머지 인자들의 이름은 모두 `_`로 지정해 주었습니다.

### `,` - Whitespace character

>
In Clojure, `,` is treated as whitespace, exactly the same as spaces, tabs, or newlines.
Commas are thus never required in literal collections, but are often used to enhance readability:

Clojure에서 `,`는 공백으로 취급됩니다. 좀 더 자세히 설명하자면 스페이스, 탭, 개행문자와 완전히 똑같이 취급됩니다.
콤마는 리터럴 컬렉션에서는 필요하지 않지만, 가독성을 향상시키기 위해 사용되곤 합니다.

```clojure
user=>(def m {:a 1, :b 2, :c 3}
{:a 1, :b 2, :c 3}
```

### 감사 인사

>
Many thanks to everyone who has contributed ideas and [the copious amounts of] spelling corrections (crikey I’m bad at speelingz - so thanks Michael R. Mayne, lobsang_ludd).
I’ve tried to call out people who have specifically asked for things. Sorry if I’ve missed you.
>
Original author: James Hughes


## 참고문헌

- [Reading Clojure Characters]( https://clojure.org/guides/weird_characters )

## 주석

[^here]: "이곳"은 clojure.org를 말한다.
[^gensym]: `gensym`은 Clojure의 함수. 입력된 prefix 문자열을 사용해 유니크한 이름을 만들어 준다.

