---
layout  : wiki
title   : Other Useful Functions and Macros
summary : 
date    : 2022-06-11 19:43:34 +0900
updated : 2022-06-11 20:20:42 +0900
tag     : clojure 번역
resource: 06/7FD83F-7E1C-4501-A914-2B16D355054B
toc     : true
public  : true
parent  : [[/clojure/reference]]
latex   : false
---
* TOC
{:toc}

- 원문: [Other Useful Functions and Macros]( https://clojure.org/reference/other_functions )

## Other Useful Functions and Macros: Clojure Reference 문서 번역

>
Boolean and comparison functions:
[\=](https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/= )
[\==](https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/== )
[identical?](https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/identical? )
[not=]( https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/not= )
[not](https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/not )
[true?](https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/true? )
[false?](https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/false? )
[nil?](https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/nil?)
>
Miscellaneous:
[identity](https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/identity )
[dotimes](https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/dotimes )
[time](https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/time )
[assert](https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/assert )
[with-open](https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/with-open )

### Creating functions

| Function                   | Example expression                   | Return value             |
| :-------                   | :-----------------                   | :------------            |
| [fn][fn]                   | `(map (fn [x] (+ 2 x)) [1 2 3])`     | `(3 4 5)`                |
| #() [reader][reader] macro | `(map #(+ 2 %) [1 2 3])`             | `(3 4 5)`                |
| [partial][partial]         | `(map (partial + 2) [1 2 3])`        | `(3 4 5)`                |
| [comp][comp]               | `(map (comp - *) [2 4 6] [1 2 3])`   | `(-2 -8 -18)`            |
| [complement][complement]   | `(map (complement zero?) [3 2 1 0])` | `(true true true false)` |
| [constantly][constantly]   | `(map (constantly 9) [1 2 3])`       | `(9 9 9)`                |

### Printing

>
Several functions are provided to print objects to the output stream that is the current value of `*out*`.
The -str versions bind `*out*` to a StringWriter, print to that, and return the resulting string.
[pr][pr] prints the object(s), separated by spaces if there is more than one.
[prn][prn] does the same and follows it with a [newline][newline].
[print][print] and [println][println] call [pr][pr] and [prn][prn] respectively, with `*print-readably*` (which defaults to true) bound to nil, which causes strings to print without surrounding quotes or any escape character encoding, and characters to print without the leading '\\', or any escape character encoding.
By default, [pr][pr] and [prn][prn] print in a way that objects can be read by the reader, while [print][print] and [println][println] produce output for human consumption. When `*print-readably*` is non-nil, the printing of metadata is toggled by `*print-meta*`, which defaults to nil.

객체를 output stream (`*out*`의 현재 값)으로 출력하기 위한 몇 가지 함수가 있습니다.

`-str` 이 붙은 버전은 StringWriter를 사용해서 출력을 하고, 결과는 string으로 리턴합니다.

- [pr][pr]은 객체를 출력하며, 객체가 여러개 있을 경우에는 구분자로 공백을 넣어줍니다.
- [prn][prn]도 같은 일을 하지만 마지막에 [newline][newline]을 붙여줍니다.
- [print][print]와 [println][println]은 각각 [pr][pr]과 [prn][prn]을 호출하며, `*print-readably*`(기본값: true)을 nil로 설정해서 쓴다는 특징이 있습니다.
    - 이로 인해 string은 인용 부호나 이스케이프 문자 없이 출력되고, character는 앞에 있는 '\\'가 제외된 상태로 출력됩니다.
- 기본적으로 [pr][pr]과 [prn][prn]은 reader가 읽을 수 있는 형태로 출력하고, [print][print]와 [println][println]은 사람이 읽기 쉬운 형태로 출력합니다.
- `*print-readably*` 값이 nil 아니라면, 메타데이터의 출력은 `*print-meta*` 값으로 토글됩니다.
    - `*print-meta*`의 기본값은 nil 입니다.


#### Related functions

>
Print to `*out*`: [pr][pr] [prn][prn] [print][print] [println][println] [newline][newline]
>
Print to string: [pr-str][pr-str] [prn-str][prn-str] [print-str][print-str] [println-str][println-str] [with-out-str][with-out-str]

### Regex Support

>
Regex patterns can be compiled at read-time via the `#"pattern"` reader macro, or at run time with [re-pattern][re-pattern].
Both forms produce [java.util.regex.Pattern][Pattern] objects.

정규식 패턴은 `#"pattern"` 리더 매크로를 사용해서 read-time에 컴파일하거나, [re-pattern][re-pattern]으로 run time에 컴파일할 수 있습니다.
두 가지 form 모두 [java.util.regex.Pattern][Pattern] 객체를 생성합니다.

```clojure
user=> (re-seq #"[0-9]+" "abs123def345ghi567")
("123" "345" "567")
user=> (re-find #"([-+]?[0-9]+)/([0-9]+)" "22/7")
["22/7" "22" "7"]
user=> (let [[a b c] (re-matches #"([-+]?[0-9]+)/([0-9]+)" "22/7")]
         [a b c])
["22/7" "22" "7"]
user=> (re-seq #"(?i)[fq].." "foo bar BAZ QUX quux")
("foo" "QUX" "quu")
```

#### Related functions

>
[re-matcher][re-matcher] [re-find][re-find] [re-matches][re-matches] [re-groups][re-groups] [re-seq][re-seq]

[fn]: https://clojure.org/reference/special_forms#fn
[reader]: https://clojure.org/reference/reader
[partial]: https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/partial
[comp]: https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/comp
[complement]: https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/complement
[constantly]: https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/constantly

[pr]: https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/pr
[prn]: https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/prn
[newline]: https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/newline
[print]: https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/print
[println]: https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/println

[pr-str]: https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/pr-str
[prn-str]: https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/prn-str
[print-str]: https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/print-str
[println-str]: https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/println-str
[with-out-str]: https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/with-out-str
[re-pattern]: https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/re-pattern
[Pattern]: https://docs.oracle.com/javase/8/docs/api/java/util/regex/Pattern.html

[re-matcher]: https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/re-matcher
[re-find]: https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/re-find
[re-matches]: https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/re-matches
[re-groups]: https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/re-groups
[re-seq]: https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/re-seq
