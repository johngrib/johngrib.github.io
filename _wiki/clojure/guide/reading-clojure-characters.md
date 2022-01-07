---
layout  : wiki
title   : Reading Clojure Characters
summary : 번역 중인 문서
date    : 2022-01-07 21:55:12 +0900
updated : 2022-01-07 23:16:54 +0900
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

`#`은 또한 generated symbol을 생성할 때 구문의 안쪽에서 symbol의 마지막에 붙이는 문자이기도 합니다.

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


## 참고문헌


## 주석

[^here]: "이곳"은 clojure.org를 말한다.

