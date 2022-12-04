---
layout  : wiki
title   : Clojure spec Guide
summary : 
date    : 2021-12-21 09:33:11 +0900
updated : 2022-03-05 21:49:21 +0900
tag     : clojure
resource: 9D/93E8F1-7805-4CF2-9802-C4972A1E6251
toc     : true
public  : true
parent  : [[/clojure/guide]]
latex   : false
---
* TOC
{:toc}

## spec Guide 문서 번역

[spec Guide]( https://clojure.org/guides/spec )

### Getting started

>
The [spec]( https://clojure.org/about/spec ) library ([API docs]( https://clojure.github.io/spec.alpha )) specifies the structure of data, validates or conforms it, and can generate data based on the spec.
>
To use spec, declare a dependency on Clojure 1.9.0 or higher:

spec 라이브러리는 spec을 기준으로 데이터의 구조를 정의하고, 검증하고, 데이터를 생성할 수 있도록 해줍니다.

spec을 사용하려면 Clojure 1.9.0 이상의 의존 라이브러리를 사용하세요.

```clojure
[org.clojure/clojure "1.10.3"]
```

>
To start working with spec, require the `clojure.spec.alpha` namespace at the REPL:

spec 작업을 시작하려면 REPL에서 `clojure.spec.alpha` 네임스페이스를 `require` 하세요.

```clojure
(require '[clojure.spec.alpha :as s])
```

>
Or include spec in your namespace:

또는 spec을 네임스페이스에 추가하세요.

```clojure
(ns my.ns
  (:require [clojure.spec.alpha :as s]))
```

### Predicates

>
Each spec describes a set of allowed values.
There are several ways to build specs and all of them can be composed to build more sophisticated specs.
>
Any existing Clojure function that takes a single argument and returns a truthy value is a valid predicate spec. We can check whether a particular data value conforms to a spec using [`conform`]( https://clojure.github.io/spec.alpha/clojure.spec.alpha-api.html#clojure.spec.alpha/conform ):

- 각각의 spec은 허용하는 값의 집합을 설명합니다.
- spec을 만드는 방법은 다양하며, 여러 spec을 조합해서 더 복잡한 spec을 만들 수도 있습니다.
- 한 개의 argument를 받아서 참/거짓 값을 리턴하는 Clojure 함수는 유효한 predicate spec이라 할 수 있습니다.
- conform을 사용하면 특정 데이터가 spec을 지키는지 확인할 수 있습니다.

```clojure
(s/conform even? 1000)
;;=> 1000
```

>
The `conform` function takes something that can be a spec and a data value. Here we are passing a predicate which is implicitly converted into a spec. The return value is "conformed". Here, the conformed value is the same as the original value - we’ll see later where that starts to deviate. If the value does not conform to the spec, the special value `:clojure.spec.alpha/invalid` is returned.
>
If you don’t want to use the conformed value or check for `:clojure.spec.alpha/invalid`, the helper [`valid?`]( https://clojure.github.io/spec.alpha/clojure.spec.alpha-api.html#clojure.spec.alpha/valid? ) can be used instead to return a boolean.

`conform`은 spec으로 취급할 수 있는 것과 data 값을 받는 함수입니다.

- 이 함수에 predicate를 넣어주면 spec으로 변환되는데, 변환된 함수는 "검증된 값"을 리턴하게 됩니다.
    - 이때 "검증된 값"은 함수에 넘겨준 값과 같은 값입니다.
    - (이에 대해서는 나중에 살펴볼 것입니다.)
- 만약 주어진 값이 spec과 맞지 않는다면, 특수한 값인 `:clojure.spec.alpha/invalid`가 리턴됩니다.

리턴된 "검증된 값"을 쓰고 싶지 않거나 `:clojure.spec.alpha/invalid`를 확인하고 싶지 않다면, boolean 값을 리턴하는 `valid?` 함수를 사용하면 됩니다.

```clojure
(s/valid? even? 10)
;;=> true
```

>
Note that again `valid?` implicitly converts the predicate function into a spec.
The spec library allows you to leverage all of the functions you already have - there is no special dictionary of predicates.
Some more examples:

`valid?`는 넘겨받은 predicate 함수를 암묵적으로 spec으로 변환합니다.

spec 라이브러리는 여러분이 갖고 있는 모든 함수를 활용할 수 있도록 만들어져 있으므로,
spec 라이브러리에는 특별한 dictionary나 predicate가 없습니다.

```clojure
(s/valid? nil? nil)  ;; true
(s/valid? string? "abc")  ;; true

(s/valid? #(> % 5) 10) ;; true
(s/valid? #(> % 5) 0) ;; false

(import java.util.Date)
(s/valid? inst? (Date.))  ;; true
```

>
Sets can also be used as predicates that match one or more literal values:

리터럴 값들을 확인하는 용도로 set을 predicate로 사용할 수도 있습니다.

```clojure
(s/valid? #{:club :diamond :heart :spade} :club) ;; true
(s/valid? #{:club :diamond :heart :spade} 42) ;; false

(s/valid? #{42} 42) ;; true
```

### Registry

>
Until now, we’ve been using specs directly. However, spec provides a central registry for globally declaring reusable specs. The registry associates a namespaced keyword with a specification. The use of namespaces ensures that we can define reusable non-conflicting specs across libraries or applications.
>
Specs are registered using [`s/def`]( https://clojure.github.io/spec.alpha/clojure.spec.alpha-api.html#clojure.spec.alpha/def ).
It’s up to you to register the specification in a namespace that makes sense (typically a namespace you control).

지금까지 spec을 직접 사용해 보았습니다만, spec 라이브러리는 spec을 글로벌하게 재사용할 수 있도록 central registry도 제공합니다.

- registry는 spec과 네임스페이스 키워드를 서로 연결해주는 역할을 합니다.
- 네임스페이스를 사용하면 spec을 충돌 없이 다양한 라이브러리나 애플리케이션에서 재활용할 수 있습니다.

spec은 `s/def`를 통해 등록할 수 있습니다.
어떤 네임스페이스에 spec을 등록하는지는 여러분의 선택입니다.

```clojure
(s/def :order/date inst?)
(s/def :deck/suit #{:club :diamond :heart :spade})
```

>
A registered spec identifier can be used in place of a spec definition in the operations we’ve seen so far - `conform` and `valid?`.

앞에서 살펴본 `conform`과 `valid?` 함수도 registered spec 식별자와 함께 사용할 수 있습니다.

```clojure
(s/valid? :order/date (Date.))
;;=> true
(s/conform :deck/suit :club)
;;=> :club
```

>
You will see later that registered specs can (and should) be used anywhere we compose specs.

여러분은 등록된 spec은 spec을 구성하는 모든 곳에서 사용할 수 있다는 것(그래야 합니다)을 이 문서를 읽어가며 알게 될 것입니다.

>
(!) Spec Names
>
Spec names are always fully-qualified keywords. Generally, Clojure code should use keyword namespaces that are sufficiently unique such that they will not conflict with specs provided by other libraries. If you are writing a library for public use, spec namespaces should include the project name, url, or organization. Within a private organization, you may be able to use shorter names - the important thing is that they are sufficiently unique to avoid conflicts.
>
In this guide we will often use shorter qualified names for example brevity.
{:style="background-color: #f8ebf8;"}

- Spec Names
    - spec name은 fully-qualified keyword 여야 합니다.
    - 일반적으로 Clojure 코드는 다른 라이브러리에서 제공하는 spec과 충돌하지 않도록 충분히 유니크한 keyword namespace를 사용해야 합니다.
    - 만약 공개용 라이브러리를 만들고 있다면, spec namespace에는 프로젝트 이름, url, 조직이 포함되어야 합니다.
    - private 조직이라면, 좀 더 짧은 이름을 사용해도 됩니다.
        - 중요한 것은 충돌을 피하기 위해서 충분히 유니크해야 한다는 것입니다.
    - 이 가이드 문서에서는 간결함을 위해 좀 더 짧은 이름을 사용할 것입니다.

>
Once a spec has been added to the registry, `doc` knows how to find it and print it as well:

spec을 registry에 추가하면 `doc`으로 spec을 찾고 출력하는 것도 가능합니다.

```clojure
(doc :order/date)
-------------------------
:order/date
Spec
  inst?

(doc :deck/suit)
-------------------------
:deck/suit
Spec
  #{:spade :heart :diamond :club}
```

### Composing predicates

>
The simplest way to compose specs is with [`and`]( https://clojure.github.io/spec.alpha/clojure.spec.alpha-api.html#clojure.spec.alpha/and ) and [`or`]( https://clojure.github.io/spec.alpha/clojure.spec.alpha-api.html#clojure.spec.alpha/or ).
Let’s create a spec that combines several predicates into a composite spec with s/and:

spec을 조합하는 가장 간단한 방법은 `and`와 `or`를 사용하는 것입니다.

`s/and`를 사용해 여러 개의 predicate를 하나의 composite spec으로 조합해 봅시다.

```clojure
(s/def :num/big-even (s/and int? even? #(> % 1000)))
(s/valid? :num/big-even :foo) ;; false
(s/valid? :num/big-even 10) ;; false
(s/valid? :num/big-even 100000) ;; true
```

>
We can also use `s/or` to specify two alternatives:

`s/or`를 사용해 검증 방법을 두 가지로 지정할 수도 있습니다.

```clojure
(s/def :domain/name-or-id (s/or :name string?
                                :id   int?))
(s/valid? :domain/name-or-id "abc") ;; true
(s/valid? :domain/name-or-id 100) ;; true
(s/valid? :domain/name-or-id :foo) ;; false
```

>
This `or` spec is the first case we’ve seen that involves a choice during validity checking. Each choice is annotated with a tag (here, between `:name` and `:id`) and those tags give the branches names that can be used to understand or enrich the data returned from `conform` and other spec functions.
>
When an `or` is conformed, it returns a vector with the tag name and conformed value:

이 `or` spec은 지금까지 우리가 살펴본 유효성 검사 방법 중에서 선택지가 있는 첫 번째 예제라 할 수 있습니다.

각각의 선택지를 보면 tag(여기에서는 `:name`과 `:id`)를 사용해 분기를 표시하여 읽는 사람의 이해를 돕는 한편, `conform`이나 다른 spec 함수들이 리턴한 데이터를 다양하게 처리할 수 있게 합니다.

아래의 예제를 봅시다.
`or`이 conform되면, tag 이름과 conform된 값이 들어있는 vector를 리턴합니다.

```clojure
(s/conform :domain/name-or-id "abc")
;;=> [:name "abc"]
(s/conform :domain/name-or-id 100)
;;=> [:id 100]
```

>
Many predicates that check an instance’s type do not allow `nil` as a valid value (`string?`, `number?`, `keyword?`, etc).
To include `nil` as a valid value, use the provided function [`nilable`]( https://clojure.github.io/spec.alpha/clojure.spec.alpha-api.html#clojure.spec.alpha/nilable ) to make a spec:

검사 대상의 인스턴스 타입을 체크하는 많은 predicate들이 `nil`을 유효한 값으로 취급하지 않습니다(`string?`, `number?`, `keyword?` 같은 것들).
`nil`을 유효한 값으로 취급하는 spec이 필요하다면 spec을 만들 때 `nilable`을 사용하면 됩니다.

```clojure
(s/valid? string? nil)
;;=> false
(s/valid? (s/nilable string?) nil)
;;=> true
```

### Explain

>
[`explain`]( https://clojure.github.io/spec.alpha/clojure.spec.alpha-api.html#clojure.spec.alpha/explain ) is another high-level operation in spec that can be used to report (to `*out*`) why a value does not conform to a spec.
Let’s see what explain says about some non-conforming examples we’ve seen so far.

`explain`은 spec의 고급 오퍼레이션 중 하나로, 주어진 값이 spec과 적합하지 않은 이유를 (`*out*`을 통해) 보고해 줍니다.
앞에서 봤던 예제를 사용해 설명해 보겠습니다.

```clojure
(s/explain :deck/suit 42)
;; 42 - failed: #{:spade :heart :diamond :club} spec: :deck/suit
(s/explain :num/big-even 5)
;; 5 - failed: even? spec: :num/big-even
(s/explain :domain/name-or-id :foo)
;; :foo - failed: string? at: [:name] spec: :domain/name-or-id
;; :foo - failed: int? at: [:id] spec: :domain/name-or-id
```

>
Let’s examine the output of the final example more closely. First note that there are two errors being reported - spec will evaluate all possible alternatives and report errors on every path. The parts of each error are:
- val - the value in the user’s input that does not match
- spec - the spec that was being evaluated
- at - a path (a vector of keywords) indicating the location within the spec where the error occurred - the tags in the path correspond to any tagged part in a spec (the alternatives in an `or` or `alt`, the parts of a `cat`, the keys in a map, etc)
- predicate - the actual predicate that was not satisfied by val
- in - the key path through a nested data val to the failing value. In this example, the top-level value is the one that is failing so this is essentially an empty path and is omitted.

마지막 예제의 결과를 살펴봅시다.
일단 두 개의 에러가 보고되어 있군요. (spec은 모든 가능한 조건을 평가하며, 모든 조건에서 발생한 에러를 보고합니다.)

- 에러의 각 부분을 자세히 살펴봅시다.
```clojure
     val    predicate       at          spec
;; :foo - failed: string? at: [:name] spec: :domain/name-or-id
;; :foo - failed: int?    at: [:id]   spec: :domain/name-or-id
```
    - `val` - 적합하지 않은 것으로 판별된 값
    - `predicate` - val이 만족시키지 못한 predicate
    - `at` - 에러가 발생한 위치 경로(keyword가 들어있는 vector)
        - spec에서 태그로 표시된 부분(`or`이나 `alt`이면 대안들, `cat`의 부분, map의 키 등등)에 대한 경로.
    - `spec` - 평가에 사용된 spec
    - `in` - 최상위부터 시작하는 실패한 값의 경로.
        - 이 예제와 같이 최상위 값이 실패하면 일반적으로 빈 경로로 표현합니다.

>
For the first reported error we can see that the value `:foo` did not satisfy the predicate `string?` at the path `:name` in the spec `:domain/name-or-id`.
The second reported error is similar but fails on the `:id` path instead.
The actual value is a keyword so neither is a match.


- 첫 번째로 보고된 에러를 살펴봅시다.
```clojure
;; :foo - failed: string? at: [:name] spec: :domain/name-or-id
```
    - 값 `:foo`는 `:domain/name-or-id` spec에 있는 `:name` 경로의 `string?` predicate를 만족시키지 못했습니다.
- 두 번째로 보고된 에러를 살펴봅시다.
```clojure
;; :foo - failed: int? at: [:id] spec: :domain/name-or-id
```
    - 첫 번째와 비슷하지만 `:name` 경로가 아니라 `:id` 경로에서 실패했습니다.
- 실제 값이 keyword 타입이므로, string도 아니고 int도 아니어서 둘 다 만족시키지 못한 것입니다.

>
In addition to `explain`, you can use [`explain-str`](https://clojure.github.io/spec.alpha/clojure.spec.alpha-api.html#clojure.spec.alpha/explain-str ) to receive the error messages as a string or [`explain-data`]( https://clojure.github.io/spec.alpha/clojure.spec.alpha-api.html#clojure.spec.alpha/explain-data ) to receive the errors as data.

`explain`에 추가로 설명하자면 `explain-str`을 써서 에러 메시지를 string으로 받거나, `explain-data`를 써서 에러 내역을 데이터로 받는 것도 가능합니다.

```clojure
(s/explain-data :domain/name-or-id :foo)
;;=> #:clojure.spec.alpha{
;;     :problems ({:path [:name],
;;                 :pred clojure.core/string?,
;;                 :val :foo,
;;                 :via [:domain/name-or-id],
;;                 :in []}
;;                {:path [:id],
;;                 :pred clojure.core/int?,
;;                 :val :foo,
;;                 :via [:domain/name-or-id],
;;                 :in []})}
```

> (i)
This result also demonstrates the namespace map literal syntax added in Clojure 1.9. Maps may be prefixed with `#:` or `#::` (for autoresolve) to specify a default namespace for all keys in the map. In this example, this is equivalent to `{:clojure.spec.alpha/problems …}`
{:style="background-color: #e6fae3;"}

- 이 결과를 통해 Clojure 1.9에서 추가된 namespace map literal syntax에 대해서도 배울 수 있습니다.
- map은 `#:` 또는 `#::`(autoresolve를 위한 표현)으로 map에 포함되는 모든 key의 default namespace를 지정할 수 있습니다.
- 이 예제에서 `#:clojure.spec.alpha`를 사용한 것은 `{:clojure.spec.alpha/problems …}`처럼 선언한 것과 같습니다.

### Entity Maps

>
Clojure programs rely heavily on passing around maps of data.
A common approach in other libraries is to describe each entity type, combining both the keys it contains and the structure of their values.
Rather than define attribute (key+value) specifications in the scope of the entity (the map), specs assign meaning to individual attributes, then collect them into maps using set semantics (on the keys).
This approach allows us to start assigning (and sharing) semantics at the attribute level across our libraries and applications.
>
For example, most Ring middleware functions modify the request or response map with unqualified keys. However, each middleware could instead use namespaced keys with registered semantics for those keys. The keys could then be checked for conformance, creating a system with greater opportunities for collaboration and consistency.
>
Entity maps in spec are defined with [`keys`]( https://clojure.github.io/spec.alpha/clojure.spec.alpha-api.html#clojure.spec.alpha/keys ):

Clojure 프로그램들은 주로 map 자료구조를 사용해 데이터를 전달하는 방식을 사용하고 있습니다.
따라서 라이브러리들은 자료구조에 포함된 키와 값의 구조를 엮은 엔티티 타입을 명시하는 전략을 일반적으로 사용하고 있습니다.

spec은 엔티티(map)의 스코프 내에서 각 속성(key+value)을 정의하는 대신, 각 개별 속성의 의미를 할당해준 다음 (key 기준의) set semantic을 사용해 한꺼번에 map으로 수집해냅니다.
이 방법으로 인해 우리는 라이브러리는 물론 애플리케이션 전반에 걸쳐 속성 수준에서 semantic을 할당하고 공유할 수 있습니다.

예를 들어, Ring 미들웨어 함수들 대부분은 request나 response map을 규정되지 않은 key값들로 수정합니다.
하지만 그렇게 하는 대신에 각각의 미들웨어들은 해당 key에 대한 semantic이 등록된 namespaced key를 사용할 수도 있습니다.
이를 통해 key들의 적합성을 체크할 수 있으므로 더 협업 가능하고 더 일관성있는 시스템을 만들 수 있습니다.

spec의 entity map은 `keys`를 사용하여 정의됩니다.

```clojure
(def email-regex #"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,63}$")
(s/def :acct/email-type (s/and string? #(re-matches email-regex %)))

(s/def :acct/acctid int?)
(s/def :acct/first-name string?)
(s/def :acct/last-name string?)
(s/def :acct/email :acct/email-type)

(s/def :acct/person (s/keys :req [:acct/first-name :acct/last-name :acct/email]
                            :opt [:acct/phone]))
```

>
This registers a `:acct/person` spec with the required keys `:acct/first-name`, `:acct/last-name`, and `:acct/email`, with optional key `:acct/phone`.
The map spec never specifies the value spec for the attributes, only what attributes are required or optional.

위의 코드는 `:acct/person` spec을 등록하며, 필수 key와 선택적 key도 지정합니다.
- 필수 key - `:acct/first-name`, `:acct/last-name`, `:acct/email`
- 선택적 key - `:acct/phone`

map spec은 어떤 속성들이 필수인지 선택적인지만 명시하고, 각 속성의 값 spec은 따로 지정하지 않습니다.

>
When conformance is checked on a map, it does two things - checking that the required attributes are included, and checking that every registered key has a conforming value.
We’ll see later where optional attributes can be useful.
Also note that ALL attributes are checked via `keys`, not just those listed in the `:req` and `:opt` keys.
Thus a bare `(s/keys)` is valid and will check all attributes of a map without checking which keys are required or optional.

map에 적합성 판별을 하게 되면 두 가지 작업이 실행됩니다.

1. 필수 속성이 포함되어 있는지 확인합니다.
2. 등록된 모든 key에 대해 적합한 value가 있는지 확인합니다.

(선택적 속성의 유용성은 나중에 살펴보기로 합시다.)

한편, `:req`와 `:opt`로 지정되지 않은 key들 또한 `keys`를 사용하여 확인하게 됩니다.
따라서 단순한 `(s/keys)`는 유효하며, 모든 map의 속성을 확인하는 것이 아니라 필수 속성이나 선택적 속성이 있는지 확인하는 작업만 합니다.

```clojure
(s/valid? :acct/person
  {:acct/first-name "Bugs"
   :acct/last-name "Bunny"
   :acct/email "bugs@example.com"})
;;=> true

;; Fails required key check
(s/explain :acct/person
  {:acct/first-name "Bugs"})
;; #:acct{:first-name "Bugs"} - failed: (contains? % :acct/last-name)
;;   spec: :acct/person
;; #:acct{:first-name "Bugs"} - failed: (contains? % :acct/email)
;;   spec: :acct/person

;; Fails attribute conformance
(s/explain :acct/person
  {:acct/first-name "Bugs"
   :acct/last-name "Bunny"
   :acct/email "n/a"})
;; "n/a" - failed: (re-matches email-regex %) in: [:acct/email]
;;   at: [:acct/email] spec: :acct/email-type
```

>
Let’s take a moment to examine the explain error output on that final example:
- in - the path within the data to the failing value (here, a key in the person instance)
- val - the failing value, here `"n/a"`
- spec - the spec that failed, here `:acct/email-type`
- at - the path in the spec where the failing value is located
- predicate - the predicate that failed, here `(re-matches email-regex %)`

- 예제의 마지막 에러 출력을 살펴보는 시간을 가져봅시다.
```clojure
;; "n/a" - failed: (re-matches email-regex %) in: [:acct/email]
;;   at: [:acct/email] spec: :acct/email-type
```
    - `in` - 실패한 값이 있는 경로 (person 인스턴스의 key)
    - `val` - 실패한 값. 여기서는 `"n/a"`.
    - `spec` - 실패한 spec. 여기서는 `:acct/email-type`
    - `at` - 실패한 값이 있는 spec의 경로
    - `predicate` - 실패한 검사. 여기서는 `(re-matches email-regex %)`.

>
Much existing Clojure code does not use maps with namespaced keys and so `keys` can also specify `:req-un` and `:opt-un` for required and optional unqualified keys.
These variants specify namespaced keys used to find their specification, but the map only checks for the unqualified version of the keys.

대다수의 기존 Clojure 코드는 map을 쓸 때 namespaced key를 사용하지 않고 있습니다.
따라서 `keys`를 통해 `:req-un`와 `:opt-un`에 필수와 선택적 unqualified key를 지정할 수 있습니다.
이러한 변형은 spec을 찾기 위해 사용되는 namespaced key를 지정하지만 map은 key의 unqualified 버전만 확인합니다.

>
Let’s consider a person map that uses unqualified keys but checks conformance against the namespaced specs we registered earlier:

정규화되지 않은 key를 사용하지만 이전에 등록한 namespaced spec을 확인하는 person map을 생각해봅시다.

```clojure
(s/def :unq/person
  (s/keys :req-un [:acct/first-name :acct/last-name :acct/email]
          :opt-un [:acct/phone]))

(s/conform :unq/person
  {:first-name "Bugs"
   :last-name "Bunny"
   :email "bugs@example.com"})
;;=> {:first-name "Bugs", :last-name "Bunny", :email "bugs@example.com"}

(s/explain :unq/person
  {:first-name "Bugs"
   :last-name "Bunny"
   :email "n/a"})
;; "n/a" - failed: (re-matches email-regex %) in: [:email] at: [:email]
;;   spec: :acct/email-type

(s/explain :unq/person
  {:first-name "Bugs"})
;; {:first-name "Bugs"} - failed: (contains? % :last-name) spec: :unq/person
;; {:first-name "Bugs"} - failed: (contains? % :email) spec: :unq/person
```

>
Unqualified keys can also be used to validate record attributes:

정규화되지 않은 key를 사용하여 record attribute를 검증할 수 있습니다.

```clojure
(defrecord Person [first-name last-name email phone])

(s/explain :unq/person
           (->Person "Bugs" nil nil nil))
;; nil - failed: string? in: [:last-name] at: [:last-name] spec: :acct/last-name
;; nil - failed: string? in: [:email] at: [:email] spec: :acct/email-type

(s/conform :unq/person
  (->Person "Bugs" "Bunny" "bugs@example.com" nil))
;;=> #user.Person{:first-name "Bugs", :last-name "Bunny",
;;=>              :email "bugs@example.com", :phone nil}
```

>
One common occurrence in Clojure is the use of "keyword args" where keyword keys and values are passed in a sequential data structure as options.
Spec provides special support for this pattern with the regex op [`keys*`]( https://clojure.github.io/spec.alpha/clojure.spec.alpha-api.html#clojure.spec.alpha/keys* ).
`keys*` has the same syntax and semantics as `keys` but can be embedded inside a sequential regex structure.

keyword key와 값이 옵션으로서 시퀀셜한 데이터 구조로 전달되는 "키워드 인자"를 사용하는 것은 Clojure에서 흔하게 발생하는 일입니다.
spec은 regex op `keys*`를 사용하여 이 패턴을 지원합니다.
`keys*`는 `keys`와 동일하지만 sequential regex structure에서 집어넣을 수 있습니다.

```clojure
(s/def :my.config/port number?)
(s/def :my.config/host string?)
(s/def :my.config/id keyword?)
(s/def :my.config/server (s/keys* :req [:my.config/id :my.config/host]
                                  :opt [:my.config/port]))
(s/conform :my.config/server [:my.config/id :s1
                              :my.config/host "example.com"
                              :my.config/port 5555])
;;=> #:my.config{:id :s1, :host "example.com", :port 5555}
```

>
Sometimes it will be convenient to declare entity maps in parts, either because there are different sources for requirements on an entity map or because there is a common set of keys and variant-specific parts.
The `s/merge` spec can be used to combine multiple `s/keys` specs into a single spec that combines their requirements.
For example consider two `keys` specs that define common animal attributes and some dog-specific ones.
The dog entity itself can be described as a `merge` of those two attribute sets:

가끔씩 엔티티 map을 부분적으로 선언하는 것이 더 편리할 수 있습니다.
엔티티 map에 대한 요구사항에 대한 소스가 다르거나, 공통되는 key 세트와 그렇지 않은 부분이 함께 있기 때문입니다.
`s/merge` spec을 사용하여 여러 `s/keys` spec을 하나의 spec으로 합칠 수 있습니다.
예를 들어 일반적인 동물 속성을 정의하는 `keys` spec과, 강아지 속성을 정의하는 `keys` spec을 합칠 수 있습니다.
강아지 엔티티 자체는 두 속성 set을 `merge`하는 것으로 정의할 수 있습니다.

```clojure
(s/def :animal/kind string?)
(s/def :animal/says string?)
(s/def :animal/common (s/keys :req [:animal/kind :animal/says]))
(s/def :dog/tail? boolean?)
(s/def :dog/breed string?)
(s/def :animal/dog (s/merge :animal/common
                            (s/keys :req [:dog/tail? :dog/breed])))
(s/valid? :animal/dog
  {:animal/kind "dog"
   :animal/says "woof"
   :dog/tail? true
   :dog/breed "retriever"})
;;=> true
```

### multi-spec

[multi-spec]( https://clojure.org/guides/spec#_multi_spec )


### Collections
### Sequences
### Using spec for validation
### Spec’ing functions
### Higher order functions
### Macros
### A game of cards
### Generators
#### Project Setup
#### Sampling Generators
#### Exercise
#### Using s/and Generators
#### Custom Generators
#### Range Specs and Generators
### Instrumentation and Testing
#### Instrumentation
#### Testing
#### Combining check and instrument
### Wrapping Up
### More information
