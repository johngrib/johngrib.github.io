---
layout  : wiki
title   : Clojure Reader
summary : 
date    : 2021-11-30 10:12:05 +0900
updated : 2021-12-10 22:40:40 +0900
tag     : clojure
resource: 7D/DFBABD-0FDA-4EE0-94CF-E8C67E005DDF
toc     : true
public  : true
parent  : [[/clojure/reference]]
latex   : false
---
* TOC
{:toc}

## The Reader: Clojure Reference 문서 번역

[The Reader]( https://clojure.org/reference/reader )

### Reader Forms

#### Symbols

>
- Symbols begin with a non-numeric character and can contain alphanumeric characters and `*`, `+`, `!`, `-`, `_`, `'`, `?`, `<`, `>` and `=` (other characters may be allowed eventually).
- `/` has special meaning, it can be used once in the middle of a symbol to separate the namespace from the name, e.g. `my-namespace/foo`. `/` by itself names the division function.
- `.` has special meaning - it can be used one or more times in the middle of a symbol to designate a fully-qualified class name, e.g. `java.util.BitSet`, or in namespace names. Symbols beginning or ending with `.` are reserved by Clojure. Symbols containing `/` or `.` are said to be 'qualified'.
- Symbols beginning or ending with `:` are reserved by Clojure. A symbol can contain one or more non-repeating `:`s.

- Symbol은 숫자가 아닌 문자로 시작합니다.
    - 그리고 알파벳과 숫자, `*`, `+`, `!`, `-`, `_`, `'`, `?`, `<`, `>`, `=`를 포함할 수 있습니다.
    - (다른 문자도 필요에 따라 사용할 수 있습니다.)
- `/`은 namespace와 name의 구분을 위한 기호입니다.
    - 예를 들어 `my-namespace/foo`처럼 사용할 수 있습니다.
    - `/`는 기본적으로는 나눗셈 함수를 의미합니다.
- `.`은 fully-qualified class name 또는 namespace를 의미합니다.
    - 예를 들어 `java.util.BitSet`처럼 사용할 수 있습니다.
    - `.`로 시작하거나 끝나는 symbol은 Clojure에서 예약되어 있습니다.
- `/` 또는 `.`를 포함한 symbol은 'qualified'라고 불립니다.
- `:`로 시작하거나 끝나는 symbol은 Clojure에서 예약되어 있습니다.
    - symbol은 한 개 이상의 쭉 이어서 반복되지 않는 `:`를 포함할 수 있습니다.

#### Literals

>
- Strings - Enclosed in `"double quotes"`. May span multiple lines. Standard Java escape characters are supported.

- Strings - "쌍따옴표"안에 넣습니다. 여러 줄로 표현할 수 있습니다. Java의 escape 문자를 지원합니다.

>
- Numbers - generally represented as per Java
    - Integers can be indefinitely long and will be read as `Long`s when in range and `clojure.lang.BigInts` otherwise. Integers with an `N` suffix are always read as `BigInts`. Octal notation is allowed with a `0` prefix, and hexadecimal notation is allowed with a `0x` prefix. When possible, they can be specified in any base with radix from 2 to 36 (see [Long.parseLong()]( https://docs.oracle.com/javase/7/docs/api/java/lang/Long.html#parseLong(java.lang.String,%20int) )); for example `2r101010`, `052`, `8r52`, `0x2a`, `36r16`, and `42` are all the same Long.
    - Floating point numbers are read as Doubles; with M suffix they are read as BigDecimals.
    - Ratios are supported, e.g. `22/7`.

- Numbers
    - 정수는 길이 제한이 없습니다. `Long`의 범위 내에 있는 숫자라면 `Long`으로 읽고, 그 외의 경우는 `clojure.lang.BigInts`로 읽습니다.
    - 만약 숫자가 `N`으로 끝난다면, 그 숫자는 항상 `clojure.lang.BigInts`로 읽습니다.
    - `0`으로 시작한다면 8진수입니다.
    - `0x`로 시작한다면 16진수입니다.
    - 2진수에서 36진수까지의 표현을 지원합니다. ([Long.parseLong()]( https://docs.oracle.com/javase/7/docs/api/java/lang/Long.html#parseLong(java.lang.String,%20int) ) 참고)
        - 예: `2r101010`(2진수), `052`(8진수), `8r52`(8진수), `0x2a`(16진수), `36r16`(36진수), `42`(10진수)는 모두 `Long`입니다.


>
- Characters - preceded by a backslash: `\c`, `\newline`, `\space`, `\tab`, `\formfeed`, `\backspace`, and `\return` yield the corresponding characters. Unicode characters are represented with `\uNNNN` as in Java. Octals are represented with `\oNNN`.

- Characters - 백슬래시가 앞에 붙어있습니다.
    - 예: `\c`, `\newline`, `\space`, `\tab`, `\formfeed`, `\backspace`, `\return`
    - 유니코드 문자는 Java와 같이 `\uNNNN`와 같이 표현합니다.
    - 8진수는 `\oNNN`으로 표현합니다.

>
- `nil` Means 'nothing/no-value'- represents Java `null` and tests logical `false`

- `nil`은 'nothing/no-value'를 의미하며, Java의 `null`과 논리적인 `false`를 표현합니다.

>
- Booleans - `true` and `false`

- Booleans - `true`, `false`

>
- Symbolic values - `##Inf`, `##-Inf`, and `##NaN`

- Symbolic values - `##Inf`(무한대), `##-Inf`(마이너스 무한대), `##NaN`(Not a Number)

>
- Keywords - Keywords are like symbols, except:
    - They can and must begin with a colon, e.g. `:fred`.
    - They cannot contain `.` in the name part, or name classes.
    - Like symbols, they can contain a namespace, `:person/name`, which may contain `.`s.
    - A keyword that begins with two colons is auto-resolved in the current namespace to a qualified keyword:
        - If the keyword is unqualified, the namespace will be the current namespace. In `user`, `::rect` is read as `:user/rect`.
        - If the keyword is qualified, the namespace will be resolved using aliases in the current namespace. In a namespace where `x` is aliased to `example`, `::x/foo` resolves to `:example/foo`.

- Keywords - 키워드는 심볼과 비슷하지만, 다음과 같은 차이점이 있습니다.
    - 콜론(`:`)을 앞에 붙입니다. 예: `:fred`.
    - name part 또는 name classes에 `.`을 포함할 수 없습니다.
    - symbol과 같이, namespace를 포함할 수 있습니다. `:person/name` 처럼요. 여기에는 `.`을 포함할 수도 있습니다.
    - 콜론이 앞에 두 번 있는(`::`) 키워드는 현재 namespace에서 qualified 키워드로 auto-resolved 된 것입니다.
        - 키워드가 unqualified이면, namespace는 현재 namespace입니다. 즉, `user`에서 `::rect`는 `:user/rect`로 읽힙니다.
        - 키워드가 qualified이면, namespace는 현재 namespace에서 alias를 사용합니다. namespace에서  `example`의 알리아스가 `x`라면 `::x/foo`는 `:example/foo`가 됩니다.

#### Lists

>
Lists are zero or more forms enclosed in parentheses: `(a b c)`

List는 0개 이상의 표현식을 괄호로 감싼 것입니다. 예: `(a b c)`

#### Vectors

>
Vectors are zero or more forms enclosed in square brackets: `[1 2 3]`

Vector는 0개 이상의 표현식을 대괄호로 감싼 것입니다. 예: `[1 2 3]`

#### Maps

>
- Maps are zero or more key/value pairs enclosed in braces: `{:a 1 :b 2}`
- Commas are considered whitespace, and can be used to organize the pairs: `{:a 1, :b 2}`
- Keys and values can be any forms.

- Map은 0개 이상의 key/value 쌍을 중괄호로 감싼 것입니다. 예: `{:a 1 :b 2}`
- 콤마(`,`)는 공백으로 취급되므로 각 key/value 쌍을 구분지을 때 사용할 수 있습니다. 예: `{:a 1, :b 2}`
- key와 value로 어떠한 표현식도 사용할 수 있습니다.

##### Map namespace syntax

>
Added in Clojure 1.9
>
Map literals can optionally specify a default namespace context for keys in the map using a `#:ns` prefix, where `ns` is the name of a namespace and the prefix precedes the opening brace `{` of the map. Additionally, `#::` can be used to auto-resolve namespaces with the same semantics as auto-resolved keywords.

Clojure 1.9 부터 추가된 기능.

Map 리터럴은 `#:ns` 접두사를 사용해서 map의 key에 대한 디폴트 namespace context를 지정할 수도 있습니다.

- 이 때, `ns`는 namespace의 이름을 의미하며, 접두사는 map 선언의 열린 중괄호 `{` 앞에 위치합니다.
- `#::`는 auto-resolved keywords와 같은 의미로 auto-resolved namespace를 자동으로 찾습니다.

>
A map literal with namespace syntax is read with the following differences from a map without:
>
- Keys
    - Keys that are keywords or symbols without a namespace are read with the default namespace.
    - Keys that are keywords or symbols with a namespace are not affected **except** for the special namespace `_`, which is removed during read. This allows for the specification of keywords or symbols without namespaces as keys in a map literal with namespace syntax.
    - Keys that are not symbols or keywords are not affected.
- Values
    - Values are not affected.
    - Nested map literal keys are not affected.

namespace syntax를 적용한 map 리터럴과 평범한 map은 읽을 때 다음과 같은 차이점이 있습니다.

- Keys
    - namespace를 지정하지 않은 keyword나 symbol을 key로 사용하면 default namespace로 읽습니다.
    - namespace를 지정한 keyword나 symbol은 영향을 받지 않습니다. (특수한 namespace인 `_`는 제외)
        - 이 규칙으로 인해, namespace syntax를 적용한 map에서도 namespace를 지정하지 않은 keyword나 symbol을 사용할 수 있습니다.
    - key가 symbol이 아니거나 keyword가 아니면 이 문법의 영향을 받지 않습니다.
- Values
    - 이 문법의 영향을 받지 않습니다.
    - nested map literal key는 이 문법의 영향을 받지 않습니다.

> For example, the following map literal with namespace syntax:
>
> ```clojure
> #:person{:first "Han"
>          :last "Solo"
>          :ship #:ship{:name "Millennium Falcon"
>                       :model "YT-1300f light freighter"}}
> ```

위는 namespace syntax가 적용된 map의 예제이며, 아래와 같이 읽게 됩니다.

> is read as:
>
> ```clojure
> {:person/first "Han"
>  :person/last "Solo"
>  :person/ship {:ship/name "Millennium Falcon"
>                :ship/model "YT-1300f light freighter"}}
> ```

#### Sets

> Sets are zero or more forms enclosed in braces preceded by `#`: `#{:a :b :c}`

Set은 0개 이상의 표현식을 `#` 기호를 앞에 둔 중괄호로 감싼 것입니다. 예: `#{:a :b :c}`

#### deftype, defrecord, and constructor calls (version 1.3 and later)

1.3 버전 이후의 `deftype`, `defrecord`, 그리고 생성자 호출에 대해

>
- Calls to Java class, deftype, and defrecord constructors can be called using their fully qualified class name preceded by `#` and followed by a vector: `#my.klass_or_type_or_record[:a :b :c]`
- The elements in the vector part are passed **unevaluated** to the relevant constructor. defrecord instances can also be created with a similar form that takes a map instead: `#my.record{:a 1, :b 2}`
- The keyed values in the map are assigned **unevaluated** to the relevant fields in the defrecord. Any defrecord fields without corresponding entries in the literal map are assigned `nil` as their value. Any extra keyed values in the map literal are added to the resulting defrecord instance.

- Java class, deftype, defrecord의 생성자 호출은 `#` 기호를 앞에 둔 전체 경로의 클래스 이름을 사용하며, 뒤에 vector를 붙입니다.
    - 예: `#my.klass_or_type_or_record[:a :b :c]`
- vector의 원소들은 **평가되지 않고** 대상 생성자로 전달됩니다.
    - `defrecord` 인스턴스를 생성할 때에도 map을 사용하는 비슷한 형식을 사용합니다.
        - 예: `#my.record{:a 1, :b 2}`
- map의 key로 지정된 value들은 **평가되지 않고** `defrecord`의 대상 필드에 전달됩니다.
    - map에 누락된 `defrecord` 필드에는 `nil`이 값으로 할당됩니다.
    - map에 추가된 key/value는 결과로 생성된 `defrecord` 인스턴스에 추가됩니다.

### Macro Characters

>
The behavior of the reader is driven by a combination of built-in constructs and an extension system called the read table.
Entries in the read table provide mappings from certain characters, called macro characters, to specific reading behavior, called reader macros.
Unless indicated otherwise, macro characters cannot be used in user symbols.

- reader의 행동은 built-in 구조와 table이라는 확장 시스템의 조합에 따릅니다.
- read table의 각 항목은 매크로 문자라고 부르는 특정 문자들을 제공하며, 이를 통해 reader의 행동을 명시해줄 수 있습니다. 이를 reader macro라 부릅니다.
- 특별히 명시되지 않는다면 매크로 문자는 user symbol에 사용할 수 없습니다.

#### Quote (')

> `'form` ⇒ `(quote form)`


#### Character (\)

>
As per above, yields a character literal. Example character literals are: `\a \b \c`.
>
The following special character literals can be used for common characters: `\newline`, `\space`, `\tab`, `\formfeed`, `\backspace`, and `\return`.
>
Unicode support follows Java conventions with support corresponding to the underlying Java version. A Unicode literal is of the form `\uNNNN`, for example `\u03A9` is the literal for `Ω`.

- 문자 리터럴은 앞에서 언급한 바와 같습니다.
    - 문자 리터럴 예: `\a \b \c`
- 다음의 특수 문자 리터럴도 일반 문자처럼 사용할 수 있습니다.
    - `\newline`, `\space`, `\tab`, `\formfeed`, `\backspace`, `\return`
- 유니코드 지원은 Java 버전에 맞는 규칙을 따릅니다.
    - 유니코드 리터럴은 `\uNNNN` 형식을 사용합니다. 예를 들어 `\u03A9`는 `Ω`의 리터럴입니다.

#### Comment (;)

> Single-line comment, causes the reader to ignore everything from the semicolon to the end-of-line.

한 줄 주석은 reader가 `;` 부터 해당 라인의 마지막까지 무시하게 됩니다.

#### DEref (@)

`@form` ⇒ `(deref form)`

#### Metadata (^)

>
Metadata is a map associated with some kinds of objects: Symbols, Lists, Vector, Sets, Maps, tagged literals returning an IMeta, and record, type, and constructor calls.
The metadata reader macro first reads the metadata and attaches it to the next form read (see [with-meta]( https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/with-meta ) to attach meta to an object):
`^{:a 1 :b 2} [1 2 3]` yields the vector `[1 2 3]` with a metadata map of `{:a 1 :b 2}`.

- Metadata는 symbol, list, vector, set, map, IMeta를 리턴하는 tagged literal, record, type, 생성자 호출과 같은 몇몇 객체와 관련된 map 입니다.
- metadata reader macro는 먼저 metadata를 읽고, 그것을 바로 다음에 읽게 되는 표현식에 추가합니다.
    - 예: `{:a 1 :b 2} [1 2 3]`는 `{:a 1 :b 2}`라는 metadata map을 갖는 `[1 2 3]`이라는 vector를 의미합니다.

>
A shorthand version allows the metadata to be a simple symbol or string, in which case it is treated as a single entry map with a key of `:tag` and a value of the (resolved) symbol or string, e.g.:
`^String x` is the same as `^{:tag java.lang.String} x`

- 축약 버전을 사용하면 metadata를 간단한 symbol이나 string으로 만들 수도 있습니다.
- 이 방법을 쓰면 `:tag`라는 key를 하나만 갖는 map이 됩니다. 그리고 string 또는 확정된 symbol을 value로 갖게 됩니다.
    - 예: `^String x`는 `{:tag java.lang.String} x`와 같습니다.

>
Such tags can be used to convey type information to the compiler.

이러한 tag는 컴파일러에 type 정보를 전달할 때 사용할 수 있습니다.

>
Another shorthand version allows the metadata to be a keyword, in which case it is treated as a single entry map with a key of the keyword and a value of true, e.g.:
`^:dynamic x` is the same as `^{:dynamic true} x`

- 또다른 축약 버전을 사용하면 metadata를 keyword로 만들 수도 있습니다.
- 이 방법을 쓰면 key로 주어진 keyword를 쓰고, value는 true인 엔트리가 하나인 map이 됩니다.
    - 예: `^:dynamic x`는 `{:dynamic true} x`와 같습니다.

>
Metadata can be chained in which case they are merged from right to left.

metadata 각각은 연결(chain)될 수 있으며, 오른쪽에서 왼쪽으로 병합됩니다.

#### Dispatch (#)

>
The dispatch macro causes the reader to use a reader macro from another table, indexed by the character following

dispatc 매크로는 reader를 다른 테이블의 reader macro를 사용하도록 합니다.

>
- `#{}` - see Sets above
- Regex patterns (`#"pattern"`)  
A regex pattern is read and _compiled at read time_.
The resulting object is of type `java.util.regex.Pattern`.
Regex strings do not follow the same escape character rules as strings.
Specifically, backslashes in the pattern are treated as themselves (and do not need to be escaped with an additional backslash).
For example, `(re-pattern "\\s*\\d+")` can be written more concisely as `#"\s*\d+"`.

- `#{}` - 위의 Sets 참조.
- 정규식 패턴 (`#"pattern"`)
    - 정규식 패턴은 read time에 컴파일됩니다.
    - 결과 객체는 `java.util.regex.Pattern` 타입입니다.
    - 정규식 문자열은 string과 같은 이스케이프 문자를 쓰지 않습니다.
    - 특히, 백슬래시는 자기 자신을 의미하며, 백슬래시를 또 써서 이스케이프해주지 않아도 됩니다.
    - 예를 들어, `(re-pattern "\\s*\\d+")`는 `#"\s*\d+"`로 축약해 사용할 수 있습니다.

>
- Var-quote (`#'`) <br/>
`#'x` ⇒ `(var x)`
- Anonymous function literal (`#()`) <br/>
`#(...)` ⇒ `(fn [args] (...))` <br/>
where args are determined by the presence of argument literals taking the form `%`, `%n` or `%&`.
`%` is a synonym for `%1`, `%n` designates the nth arg (1-based), and `%&` designates a rest arg.
This is not a replacement for [fn]( https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/fn) - idiomatic use would be for very short one-off mapping/filter fns and the like. `#()` forms cannot be nested.
- Ignore next form (`#_`) <br/>
The form following `#_` is completely skipped by the reader.
(This is a more complete removal than the comment macro which yields `nil`).

- Var-quote (`#'`)
    - `#'x` ⇒ `(var x)`
- 익명 함수 리터럴 (`#()`)
    - `#(...)` ⇒ `(fn [args] (...))`
    - 이 때 `args`는 `%`, `%n`, `%&`로 시작하는 인자 리터럴에 의해 결정됩니다.
    - `%`는 `%1`을 의미합니다.
    - `%n`는 n번째 인자를 의미합니다. (1-based 이므로 0부터 시작이 아니라 1부터 시작)
    - `%&`는 나머지 인자를 의미합니다.
    - 이 익명 함수 리터럴은 `fn`을 대체하는 것이 아니라, 매우 짧은 일회성 매핑/필터 등의 용도로 사용하기 위한 것입니다.
    - `#()` 구문은 중첩되지 않습니다.
- 다음 형식을 무시하는 `#_`
    - `#_` 다음 형식은 reader가 완전히 무시합니다.
    - 이 방법은 `nil`을 생성하는 주석 매크로보다 더 완전히 제거합니다.

#### Syntax-quote (&#96;), Unquote (~) and Unquote-splicing (~@)

>
For all forms other than Symbols, Lists, Vectors, Sets and Maps, &#96;x is the same as 'x.

Symbol, List, Vector, Set, Map을 제외한 모든 형식에서, <code>&#96;x</code> 는 `'x`와 같습니다.

>
For Symbols, syntax-quote _resolves_ the symbol in the current context, yielding a fully-qualified symbol (i.e. `namespace/name` or `fully.qualified.Classname`).
If a symbol is non-namespace-qualified and ends with `#`, it is resolved to a generated symbol with the same name to which `_` and a unique id have been appended.
e.g. `x#` will resolve to `x_123`.
All references to that symbol within a syntax-quoted expression resolve to the same generated symbol.

- symbol의 경우, syntax-quote는 현재 컨텍스트 기반으로 symbol을 해석하여, 완전한 symbol로 산출해냅니다.
- 만약 symbol이 namespace 기반이 아니고, `#`으로 끝난다면, `_`과 유니크 아이디가 추가되어 생성된 symbol로 해석됩니다.
    - 예를 들어 `x#`은 `x_123`으로 해석됩니다.
- syntax-quote 표현식 내에서 symbol에 대한 모든 참조는 똑같이 생성된 symbol로 해석됩니다.

>
For Lists/Vectors/Sets/Maps, syntax-quote establishes a template of the corresponding data structure.
Within the template, unqualified forms behave as if recursively syntax-quoted, but forms can be exempted from such recursive quoting by qualifying them with unquote or unquote-splicing, in which case they will be treated as expressions and be replaced in the template by their value, or sequence of values, respectively.

- List, Vector, Set, Map의 경우, syntax-quote는 해당 데이터 구조의 템플릿을 설정합니다.
- 템플릿 내에서 적합하지 않은 형식은 재귀적으로 syntax-quote인 것처럼 작동하지만, unquote나 unquote-splicing으로 표시를 해주면 syntax-quote가 재귀적으로 적용되지 않게 할 수 있습니다. 

>
For example:
>
> ```clojure
> user=> (def x 5)
> user=> (def lst '(a b c))
> user=> `(fred x ~x lst ~@lst 7 8 :nine)
> (user/fred user/x 5 user/lst a b c 7 8 :nine)
> ```
>
The read table is currently not accessible to user programs.

{% comment %}`{% endcomment %}

read table은 현재 user 프로그램에 접근할 수 없습니다.

(예제를 잘 읽어보면 `~x`는 `5`로, `~@lst`는 `(a b c)`로 해석된 것을 알 수 있다.)

### extensible data notation (edn)

확장 가능한 데이터 표기법 (edn)

>
Clojure’s reader supports a superset of extensible data notation (edn).
The edn specification is under active development, and complements this document by defining a subset of Clojure data syntax in a language-neutral way.

Clojure의 reader는 확장 가능한 데이터 표기법 (edn)을 지원합니다.
edn 스펙은 현재 개발 중이며, 이 문서에서는 언어 중립적인 방식으로 Clojure data syntax의 서브셋을 정의합니다.

### Tagged Literals

>
Tagged literals are Clojure’s implementation of edn [tagged elements]( https://github.com/edn-format/edn#tagged-elements).
>
When Clojure starts, it searches for files named `data_readers.clj` or `data_readers.cljc` at the root of the classpath.
Each such file must contain a Clojure map of symbols, like this:

- tagged literal은 확장 가능한 데이터 표기법(edn) 중 tagged element의 Clojure 구현입니다.
- Clojure가 시작되면, Clojure는 `data_readers.clj`나 `data_readers.cljc`라는 이름을 가진 파일들을 classpath의 루트에서 찾습니다.
- 이 파일들에는 다음 예제와 같이 Clojure의 symbol map이 포함되어 있어야 합니다.

>
> ```clojure
> {foo/bar my.project.foo/bar
>  foo/baz my.project/baz}
> ```

>
The key in each pair is a tag that will be recognized by the Clojure reader.
The value in the pair is the fully-qualified name of a [Var]( https://clojure.org/reference/vars ) which will be invoked by the reader to parse the form following the tag.
For example, given the `data_readers.clj` file above, the Clojure reader would parse this form:
>
> ```clojure
> #foo/bar [1 2 3]
> ```
>
by invoking the Var `#'my.project.foo/bar` on the vector `[1 2 3]`.
The data reader function is invoked on the form AFTER it has been read as a normal Clojure data structure by the reader.

- 각 key(`foo/bar`, `foo/baz`)는 Clojure reader가 인식 가능한 tag 입니다.
- 각 value는 tag 뒤에 따라오는 형식을 reader가 파싱하는 데 사용하는 Var의 정규화된 이름입니다.
- 예를 들어 다음과 같은 `data_readers.clj` 파일이 주어지면,
    - `#foo/bar [1 2 3]`
    - Clojure의 reader는, Var `#'my.project.foo/bar`를 vector `[1 2 3]`에 대해 호출합니다.
- data reader 함수는 reader가 normal Clojure data structure로 읽어들인 후에 호출됩니다.

>
Reader tags without namespace qualifiers are reserved for Clojure.
Default reader tags are defined in [default-data-readers]( https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/default-data-readers ) but may be overridden in `data_readers.clj` / `data_readers.cljc` or by rebinding [*data-readers*]( https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/%2Adata-readers%2A ).
If no data reader is found for a tag, the function bound in [*default-data-reader-fn*]( https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/%2Adefault-data-reader-fn%2A ) will be invoked with the tag and value to produce a value.
If *default-data-reader-fn* is nil (the default), a RuntimeException will be thrown.


- namespace 한정자가 없는 reader tag는 Clojure 용으로 이미 예약되어 있습니다.
- default reader tag는 default-data-readers에 정의되어 있지만, `data_readers.clj` / `data_readers.cljc` 또는 `*data-readers*`를 다시 바인딩하면 오버라이드될 수 있습니다.
- 만약 tag에 대한 data reader가 없다면, `*default-data-reader-fn*`에 바인딩된 함수가 tag와 value와 함께 호출되어 값을 생성하게 됩니다.
- `*default-data-reader-fn*`가 `nil`이면 `RuntimeException`이 발생합니다.

>
If a `data_readers.cljc` is provided, it is read with the same semantics as any other cljc source file with reader conditionals.

- 만약 `data_readers.cljc`가 주어지면, 모든 cljc source file에서 reader conditionals와 같은 의미로 읽어들입니다.

#### Built-in tagged literals

>
Clojure 1.4 introduced the _instant_ and _UUID_ tagged literals.
Instants have the format `#inst "yyyy-mm-ddThh:mm:ss.fff+hh:mm"`.
NOTE: Some of the elements of this format are optional. See the code for details. The default reader will parse the supplied string into a `java.util.Date` by default. For example:
>
> ```clojure
> (def instant #inst "2018-03-28T10:48:00.000")
> (= java.util.Date (class instant))
> ;=> true
> ```

- Clojure 1.4는 instant 와 UUID tagged literal을 도입했습니다.
- instant의 형식은 `#inst "yyyy-mm-ddThh:mm:ss.fff+hh:mm"`입니다.
- 참고: 이 포맷의 몇몇 항목은 선택사항입니다. 자세한 내용은 코드를 참고하세요.
- default reader는 주어진 문자열을 읽고 `java.util.Date` 타입으로 파싱합니다.

>
Since [*data-readers*]( https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/%2Adata-readers%2A ) is a dynamic var that can be bound, you can replace the default reader with a different one.
For example, `clojure.instant/read-instant-calendar` will parse the literal into a `java.util.Calendar`, while `clojure.instant/read-instant-timestamp` will parse it into a `java.util.Timestamp`:
>
> ```clojure
> (binding [*data-readers* {'inst read-instant-calendar}]
>   (= java.util.Calendar (class (read-string (pr-str instant)))))
> ;=> true
>
> (binding [*data-readers* {'inst read-instant-timestamp}]
>   (= java.util.Timestamp (class (read-string (pr-str instant)))))
> ;=> true
> ```

- *data-readers*는 dynamic var이므로, default reader를 다른 함수로 바꿀 수 있습니다.
- 예를 들어 `clojure.instant/read-instant-calendar`는 literal을 `java.util.Calendar`로 파싱하고, `clojure.instant/read-instant-timestamp`는 `java.util.Timestamp`로 파싱합니다.

>
The `#uuid` tagged literal will be parsed into a `java.util.UUID`:
>
> ```clojure
> (= java.util.UUID (class (read-string "#uuid \"3b8a31ed-fd89-4f1b-a00f-42e3d60cf5ce\"")))
> ;=> true
> ```

`#uuid` 태그 리터럴은 `java.util.UUID`로 파싱됩니다.

#### Default data reader function

>
If no data reader is found when reading a tagged literal, the [*default-data-reader-fn*]( https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/%2Adefault-data-reader-fn%2A ) is invoked.
You can set your own default data reader function and the provided [tagged-literal]( https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/tagged-literal ) function can be used to build an object that can store an unhandled literal.
The object returned by `tagged-literal` supports keyword lookup of the `:tag` and `:form`:
>
> ```clojure
> (set! *default-data-reader-fn* tagged-literal)
>
> ;; read #object as a generic TaggedLiteral object
> (def x #object[clojure.lang.Namespace 0x23bff419 "user"])
>
> [(:tag x) (:form x)]
> ;=> [object [clojure.lang.Namespace 599782425 "user"]]
> ```

- 만약 tagged literal을 읽을 때 data reader가 없다면, `*default-data-reader-fn*`가 호출됩니다.
- 여러분은 자신만의 default data reader function을 설정할 수 있습니다. 그리고 `tagged-literal` 함수를 사용하여 처리되지 않은 literal을 저장할 수 있는 객체를 만들 수 있습니다.
- `tagged-literal` 함수가 리턴한 객체는 `:tag`와 `:form`에 대한 keyword lookup을 지원합니다.

### Reader Conditionals

>
Clojure 1.7 introduced a new extension (`.cljc`) for portable files that can be loaded by multiple Clojure platforms.
The primary mechanism for managing platform-specific code is to isolate that code into a minimal set of namespaces, and then provide platform-specific versions (`.clj/.class` or `.cljs`) of those namespaces.

- Clojure 1.7에서는 여러 Clojure 플랫폼에서 로드될 수 있는 이식성 있는 파일에 대한 새로운 확장자(`.cljc`)가 추가되었습니다.
- 플랫폼이 명시된 코드를 관리하는 기본적인 방법은 해당 코드를 최소한의 네임스페이스 집합으로 분리하고, 해당 네임스페이스의 플랫폼 특성에 맞는 버전(`.clj/.class` 또는 `.cljs`)을 제공하는 것입니다.

>
In cases where is not feasible to isolate the varying parts of the code, or where the code is mostly portable with only small platform-specific parts, 1.7 also introduced _reader conditionals_, which are supported only in cljc files and at the default REPL.
Reader conditionals should be used sparingly and only when necessary.

- 코드의 다양한 부분을 이식성있게 격리할 수 없거나, 특수한 작은 플랫폼으로만 이식 가능한 경우 1.7 에서는 cljc 파일과 기본 REPL만 지원되는 _reader conditionals_도 도입되었습니다.
- Reader conditionals는 필요한 경우에만 주의깊게 사용해야 합니다.

>
Reader conditionals are a new reader dispatch form starting with `#?` or `#?@`.
Both consist of a series of alternating features and expressions, similar to `cond`.
Every Clojure platform has a well-known "platform feature" - `:clj`, `:cljs`, `:cljr`.
Each condition in a reader conditional is checked in order until a feature matching the platform feature is found.
The reader conditional will read and return that feature’s expression.
The expression on each non-selected branch will be read but skipped.
A well-known `:default` feature will always match and can be used to provide a default.
If no branches match, no form will be read (as if no reader conditional expression was present).

- Reader conditionals는 `#?` 또는 `#?@`로 시작하는 새로운 reader dispatch 형식입니다.
- 이 두 가지 형식은 `cond`와 비슷하게 여러 가지 프로퍼티와 표현식을 연속으로 갖습니다.
- 모든 Clojure 플랫폼은 알려진 "플랫폼 특성"을 갖습니다 - `:clj`, `:cljs`, `:cljr`.
- reader conditional에서 사용되는 각 조건은 플랫폼 기능과 일치하는 기능을 찾을 때까지 순서대로 검사됩니다.
- reader conditional는 해당 기능의 표현식을 읽고 반환합니다.
- 각각의 선택되지 않은 분기에서 읽은 표현식은 무시됩니다.
- 알려진 `:default` 특성은 항상 일치하며, 기본값으로 사용할 수 있습니다.
- 어떤 분기도 일치하지 않으면 표현식을 읽지 않습니다(`#?`, `#?@` 같은 표현식이 없는 경우).

>
(i) Implementors of non-official Clojure platforms should use a qualified keyword for their platform feature to avoid name collisions. Unqualified platform features are reserved for official platforms.

- (i) 비공식 Clojure 구현 플랫폼에서는 플랫폼 특성에 대한 지정된 키워드를 사용하여 이름 충돌을 피해야 합니다.
    - 지정되지 않은 플랫폼 특성은 공식 플랫폼에 예약되어 있습니다.

>
The following example will read as `Double/NaN` in Clojure, `js/NaN` in ClojureScript, and `nil` in any other platform:
>
> ```clojure
> #?(:clj     Double/NaN
>    :cljs    js/NaN
>    :default nil)
> ```

다음 예제는 Clojure에서는 `Double/NaN`으로, ClojureScript에서는 `js/NaN`, 그 외의 플랫폼에서는 nil으로 읽습니다.

>
The syntax for `#?@` is exactly the same but the expression is expected to return a collection that can be spliced into the surrounding context, similar to unquote-splicing in syntax quote.
Use of reader conditional splicing at the top level is not supported and will throw an exception. An example:
>
> ```clojure
> [1 2 #?@(:clj [3 4] :cljs [5 6])]
> ;; in clj =>        [1 2 3 4]
> ;; in cljs =>       [1 2 5 6]
> ;; anywhere else => [1 2]
> ```

- `#?@` syntax도 같지만, 컨텍스트에 따라 다른 컬렉션을 반환해야 합니다. syntax quote의 unquote-splicing과 비슷합니다.
- top level에서 `#?@`를 사용하는 것은 지원되지 않으며 예외가 던져집니다.

>
The [read]( https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/read ) and [read-string]( https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/read-string ) functions optionally take a map of options as a first argument.
The current feature set and reader conditional behavior can be set in the options map with these keys and values:
>
> ```clojure
>   :read-cond - :allow to process reader conditionals, or
>                :preserve to keep all branches
>   :features - persistent set of feature keywords that are active
> ```

- `read`와 `read-string` 함수는 첫 번째 인자로 옵션 맵을 취할 수 있습니다.
- 현재의 feature set 과 reader conditional은 옵션 맵에서 다음과 같은 키와 값을 사용할 수 있습니다.

>
An example of how to test ClojureScript reader conditionals from Clojure:
>
> ```clojure
> (read-string
>   {:read-cond :allow
>    :features #{:cljs}}
>   "#?(:cljs :works! :default :boo)")
> ;; :works!
> ```

다음은 Clojure에서 ClojureScript reader conditionals를 테스트하는 방법의 예제입니다.

>
However, note that the Clojure reader will always inject the platform feature `:clj` as well.
For platform-agnostic reading, see [tools.reader]( https://github.com/clojure/tools.reader ).

- 하지만, Clojure reader는 항상 플랫폼 기능인 `:clj`를 삽입합니다.
- `platform-agnostic` reading에 대해서는 [tools.reader]( https://github.com/clojure/tools.reader ) 문서를 참고하세요.

>
If the reader is invoked with `{:read-cond :preserve}`, the reader conditional and non-executed branches will be preserved, as data, in the returned form.
The reader-conditional will be returned as a type that supports keyword retrieval for keys with `:form` and a `:splicing?` flag.
Read but skipped tagged literals will be returned as a type that supports keyword retrieval for keys with `:form` and `:tag` keys.
>
> ```clojure
> (read-string
>   {:read-cond :preserve}
>   "[1 2 #?@(:clj [3 4] :cljs [5 6])]")
> ;; [1 2 #?@(:clj [3 4] :cljs [5 6])]
> ```

- 만약 reader가 `{:read-cond :preserve}`에 대해 호출되면, reader conditional과 실행되지 않은 분기는 반환된 형태에서 data로 저장됩니다.
- reader-conditional은 `:form`과 `:splicing?` 플래그를 지원하는 타입으로 반환됩니다.
- 읽었지만 스킵된 태그된 리터럴은 `:form`과 `:tag` 키를 지원하는 타입으로 반환됩니다.

>
The following functions can also be used as predicates or constructors for these types:
[reader-conditional?]( https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/reader-conditional%3F )
[reader-conditional]( https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/reader-conditional )
[tagged-literal?]( https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/tagged-literal%3F )
[tagged-literal]( https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/tagged-literal )

다음 함수들도 이러한 타입들을 predicate나 생성자로 사용할 수 있습니다.


## 참고문헌

- [The Reader (clojure.org)]( https://clojure.org/reference/reader )

