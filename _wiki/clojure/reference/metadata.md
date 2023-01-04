---
layout  : wiki
title   : Metadata
summary : Clojure Reference 문서 번역
date    : 2022-02-15 23:36:00 +0900
updated : 2022-06-19 19:28:58 +0900
tag     : clojure
resource: 0E/9EAC3A-9C53-4B6F-9742-75E944F24FB6
toc     : true
public  : true
parent  : [[/clojure/reference]]
latex   : false
giscus  : auto
---
* TOC
{:toc}

## Metadata: Clojure Reference 문서 번역

[Metadata]( https://clojure.org/reference/metadata )

>
Symbols and collections support metadata, a map of data about the symbol or collection.
The metadata system allows for arbitrary annotation of data.
It is used to convey information to the compiler about types, but can also be used by application developers for many purposes, annotating data sources, policy etc.

심볼과 컬렉션은 metadata를 지원합니다.
metadata는 심볼이나 컬렉션에 대한 데이터 map입니다.
metadata 시스템을 통해 데이터에 대한 임의의 주석(annotation)을 남기는 것이 가능합니다.
metadata는 기본적으로 컴파일러에 타입 정보를 전달하는데 사용되지만,
애플리케이션 개발자들이 데이터 소스에 주석이나 정책 등을 기록하는 용도로 사용할 수도 있습니다.

>
An important thing to understand about metadata is that it is not considered to be part of the value of an object.
As such, metadata does not impact equality (or hash codes).
Two objects that differ only in metadata are equal.

metadata에 대해 이해해야 하는 중요한 점은 metadata가 객체에 포함되는 값으로 취급되지 않는다는 것입니다.
그러므로 metadata는 동등성(equality)이나 해시 코드에 영향을 주지 않습니다.
metadata만 다르고 나머지 정보는 모두 같은 두 객체는 같은 것으로 취급됩니다.

>
That said, metadata and its relationship to an object is immutable - an object with different metadata is a different object.
One consequence of this is that applying metadata to a lazy sequence will realize the head of the sequence so that both objects can share the same sequence.

한편, metadata와 객체의 연결 관계는 불변(immutable)입니다.
서로 다른 meatadata를 갖는 객체들은 각각 다른 객체인 것입니다.
이것 때문에 lazy sequence에 metadata를 적용(apply)했을 때 두 객체가(적용 전과 적용 후의 두 객체가) 동일한 시퀀스를 공유할 수 있도록 시퀀스의 head를 realize 하는 방식을 씁니다.

### (meta obj)

>
Returns the metadata of obj, returns nil if there is no metadata.

obj의 meatadata를 리턴합니다. metadata가 없으면 `nil`을 리턴합니다.

```clojure
(pprint (meta #'+)) ;; #'+ is the + var

;; {:added "1.2",
;;  :name +,
;;  :file "clojure/core.clj",
;;  :column 1,
;;  :line 984,
;;  :arglists ([] [x] [x y] [x y & more]),
;;  ...
```

### (with-meta obj map)

>
Returns an object of the same type and value as obj, with map as its metadata.

주어진 `map`을 metadata로 삼는 객체를 리턴합니다. 리턴된 객체의 타입과 값은 입력된 obj와 같습니다.

```clojure
(def m ^:hi [1 2 3])
(meta (with-meta m {:bye true}))
;; {:bye true}
```

### *print-meta*

>
If set to logical true, when printing an object, its metadata will also be printed in a form that can be read back by the reader.

만약 `*print-meta*`를 logical true로 설정하면, 객체를 출력할 때 객체의 metadata도 출력합니다. 출력 형식은 reader가 읽는 방식과 같습니다.

```clojure
(def m ^:hi [1 2 3])
(binding [*print-meta* true]
  (prn m))

;; ^{:hi true} [1 2 3]
```

### (vary-meta obj f & args)

>
Returns an object of the same type and value as obj, with `(apply f (meta obj) args)` as its metadata.

주어진 obj에 `(apply f (meta obj) args)` 방식으로 metadata를 붙여준 객체를 리턴합니다.
리턴된 객체는 obj와 타입이 같고 값도 같습니다.

```clojure
(def m ^:hi [1 2 3])
(meta (vary-meta m merge {:bye true}))
;; {:hi true, :bye true}
```

### (alter-meta! ref f & args) and (reset-meta! ref map)

>
Modify or reset the metadata respectively for a namespace/var/ref/agent/atom.

`namespace/var/ref/agent/atom`에 대한 metadata를 수정하거나 리셋합니다.

### Metadata Reader Macros

>
In addition to with-meta, there are a number of reader macros ([The Reader: Macro Characters]( https://clojure.org/reference/reader#macrochars )) for applying metadata to the expression following it at read-time:
>
- `^{:doc "How it works!"}` - adds the metadata map to the metadata of the next value read
- `^:dynamic` - like `^{:dynamic true}`
- `^String` - like `^{:tag java.lang.String}`
- `^"java.lang.String"` - like `^{:tag java.lang.String}`

`with-meta` 외에도 read-time에 표현식에 metadata를 적용하기 위한 다양한 reader macro가 있습니다.

- `^{:doc "How it works!"}` - 다음에 읽을 값에 metadata map을 붙여줍니다.
- `^:dynamic` - `^{:dynamic true}`와 같습니다.
- `^String` - `^{:tag java.lang.String}`와 같습니다.
- `^"java.lang.String"` - `^{:tag java.lang.String}`와 같습니다.

>
The `:tag` key is used to hint an objects type to the Clojure compiler.
See [Java Interop: Type Hints]( https://clojure.org/reference/java_interop#typehints ) for more information and a complete list of special type hints.

`:tag` 키는 Clojure 컴파일러에 객체의 타입을 알려주는 힌트로 사용됩니다.
이에 대한 자세한 내용과 special type hint 목록은 Java Interop: Type Hints 문서를 참고하세요.

>
It is possible to add multiple pieces of metadata by chaining the metadata reader macros together.
For example: `^:dynamic ^ints obj` would apply both the :dynamic flag and ints type-hint to obj.
Metadata chains from right to left (left takes precedence).

metadata reader macro 여러개를 한번에 연결하는 방법으로 여러 조각의 metadata를 추가하는 것도 가능합니다.
예를 들어, `^:dynamic ^ints obj`는 객체에 `:dynamic` flag와 `ints` type-hint를 붙여줍니다.
이 방식을 사용해 metadata chain을 하면 오른쪽에서 왼쪽으로 적용됩니다. (즉 왼쪽이 우선순위를 갖습니다)

>
Note that metadata reader macros are applied at read-time, not at evaluation-time, and can only be used with values that support metadata, like symbols, vars, collections, sequences, namespaces, refs, atoms, agents, etc.
Some important exceptions that **don’t** support metadata are strings, numbers, booleans, Java objects, keywords (these are cached and can be shared within the runtime), and deftypes (unless they explicitly implement clojure.lang.IMeta).

metadata reader macro는 evaluation-time이 아니라 read-time에 적용됩니다.
그리고 symbol, var, collection, sequence, namespace, ref, atom, agent 등과 같이 metadata를 지원하는 값에만 적용할 수 있습니다.
string, number, boolean, Java object, keyword(키워드는 캐시되어 runtime에서 공유될 수 있습니다), deftype(`clojure.lang.IMeta`를 명시적으로 구현하지 않는 경우)이 metadata를 지원하지 않는 중요한 예외들입니다.




## 참고문헌

- [Metadata (clojure.org)]( https://clojure.org/reference/metadata )

