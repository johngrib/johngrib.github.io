---
layout  : wiki
title   : Protocols
summary : Clojure 레퍼런스 문서 번역
date    : 2022-07-02 23:21:40 +0900
updated : 2022-07-03 13:27:41 +0900
tag     : clojure 번역
resource: 9E/7A62C6-8DB3-4E42-932D-04007507D41B
toc     : true
public  : true
parent  : [[/clojure/reference]]
latex   : false
---
* TOC
{:toc}

## Protocols : Clojure Reference 문서 번역

- [원문]( https://clojure.org/reference/protocols )

### Motivation

>
Clojure is written in terms of abstractions.
There are abstractions for sequences, collections, callability, etc.
In addition, Clojure supplies many implementations of these abstractions.
The abstractions are specified by host interfaces, and the implementations by host classes.
While this was sufficient for bootstrapping the language, it left Clojure without similar abstraction and low-level implementation facilities.
The [protocols][protocols] and [datatypes][datatypes] features add powerful and flexible mechanisms for abstraction and data structure definition with no compromises vs the facilities of the host platform.

Clojure는 추상화 개념을 중심으로 만들어졌습니다.
여기에서 말하는 추상화에는 sequence, collection, callability 같은 것들이 있습니다.

Clojure는 이런 추상화에 대한 많은 구현체들을 제공하는 언어입니다.
그런데 이런 추상들은 호스트 인터페이스에서 정의되고 구현도 호스트 클래스에서 이루어집니다.
이런 특성은 Clojure 언어를 부트스트래핑하기에는 충분했지만, 이와 유사한 Clojure 자체의 추상화 및 저수준 구현이 없다는 문제가 생기게 되었습니다.

[protocol][protocols]과 [datatype][datatypes]은 호스트 플랫폼의 특성과 타협하지 않으면서도 Clojure에 강력하고 유연한 추상화 메커니즘과 자료 구조를 제공합니다.

>
**역주**
>
Motivation의 첫 문단은 [[/clojure/reference/datatypes]]와 똑같습니다.
{:style="background-color: #ecf1e8;"}

<span/>

>
There are several motivations for protocols:
>
- Provide a high-performance, dynamic polymorphism construct as an alternative to interfaces
- Support the best parts of interfaces
    - specification only, no implementation
    - a single type can implement multiple protocols
- While avoiding some of the drawbacks
    - Which interfaces are implemented is a design-time choice of the type author, cannot be extended later (although interface injection might eventually address this)
    - implementing an interface creates an isa/instanceof type relationship and hierarchy
- Avoid the 'expression problem' by allowing independent extension of the set of types, protocols, and implementations of protocols on types, by different parties
    - do so without wrappers/adapters
- Support the 90% case of multimethods (single dispatch on type) while providing higher-level abstraction/organization

protocol의 설계 목적은 다음과 같습니다.

- interface의 대안으로 고성능의 동적 다형성 구조를 제공합니다.
- interface 최고의 장점을 지원합니다.
    - 정의만 하고, 구현하지 않는다는 것.
    - 하나의 타입이 여러 프로토콜로 구현될 수 있음.
- 다음의 단점들은 회피합니다.
    - 구현된 interface는 작성자가 설계할 때 확정되며 추후에 확장할 수 없다(interface 주입이 이 문제의 대책이 될 수는 있음).
    - interface의 구현이 isa/instanceof를 사용하는 타입 관계와 계층 구조를 생성하게 된다.
- 다른 조직(different parties)이 독립적으로 타입 집합, protocol, 타입에 대한 protocol 구현을 확장하는 것을 허용해서 '표현 문제'를 우회합니다.
    - 따라서 wrapper, adapter를 쓰지 않아도 됩니다.
- 더 높은 수준의 추상화/조직화를 제공하면서 동시에 multimethod 기능(타입에 대한 싱글 디스패치)의 90% 가량을 제공합니다.

>
(i) Protocols were introduced in Clojure 1.2.
{:style="background-color: #e6fae3;"}

protocol은 Clojure 1.2에서 추가되었습니다.


#### Basics

>
A protocol is a named set of named methods and their signatures, defined using [defprotocol][defprotocol]:

protocol은 [defprotocol][defprotocol]을 사용해 정의된 메소드들의 집합입니다.
protocol에 포함되는 메소드는 메소드 이름과 시그니처를 갖습니다.

```clojure
(defprotocol AProtocol
  "A doc string for AProtocol abstraction"
  (bar [a b] "bar docs")
  (baz [a] [a b] [a b c] "baz docs"))
```

>
- No implementations are provided
- Docs can be specified for the protocol and the functions
- The above yields a set of polymorphic functions and a protocol object
    - all are namespace-qualified by the namespace enclosing the definition
- The resulting functions dispatch on the type of their first argument, and thus must have at least one argument
- defprotocol is dynamic, and does not require AOT compilation

- protocol에서 구현체는 제공하지 않습니다.
- protocol과 함수에 대해 docs를 명시할 수 있습니다.
- 위의 코드는 다형성 함수 집합과 protocol 객체롤 생성합니다.
    - 정의한 곳을 감싸는 namespace에 의해 모든 항목의 namespace가 부여됩니다.
- 결과 함수는 첫 번째 인자의 타입을 통해 분기됩니다. 따라서 각 함수는 적어도 하나의 인자가 있어야 합니다.
- defprotocol은 동적으로 작동하며, AOT 컴파일이 필요하지 않습니다.

>
[defprotocol][defprotocol] will automatically generate a corresponding interface, with the same name as the protocol, e.g. given a protocol my.ns/Protocol, an interface my.ns.Protocol. The interface will have methods corresponding to the protocol functions, and the protocol will automatically work with instances of the interface.
>
Note that you do not need to use this interface with [deftype][deftype], [defrecord][defrecord], or [reify][reify], as they support protocols directly:

[defprotocol][defprotocol]은 자동으로 protocol과 같은 이름의 interface를 생성합니다.
예를 들어 protocol 이름이 `my.ns/Protocol` 이라면, 생성된 interface 이름은 `my.ns.Protocol`이 됩니다.
생성된 interface는 protocol의 함수들과 같은 메소드들을 갖습니다.
그리고 protocol은 자동으로 해당 인터페이스의 인스턴스와 함께 작동합니다.

주의: [deftype][deftype], [defrecord][defrecord], [reify][reify]는 protocol을 직접적으로 지원하기 때문에 이런 인터페이스와 함께 사용하지 않아도 됩니다.

```clojure
(defprotocol P
  (foo [x])
  (bar-me [x] [x y]))

(deftype Foo [a b c]
  P
  (foo [x] a)
  (bar-me [x] b)
  (bar-me [x y] (+ c y)))

(bar-me (Foo. 1 2 3) 42)
= > 45

(foo
 (let [x 42]
   (reify P
     (foo [this] 17)
     (bar-me [this] x)
     (bar-me [this y] x))))

> 17
```

>
A Java client looking to participate in the protocol can do so most efficiently by implementing the protocol-generated interface.
>
External implementations of the protocol (which are needed when you want a class or type not in your control to participate in the protocol) can be provided using the [extend][extend] construct:

Java 클라이언트는 protocol을 통해 생성된 interface를 구현하는 방식을 사용하면 가장 효율적인 방법으로 protocol을 사용할 수 있습니다.

protocol의 외부 구현(여러분의 통제 영역 바깥의 클래스나 타입이 protocol을 포함시키고자 할 때)은 [extend][extend]를 사용해 제공할 수 있습니다.

```clojure
(extend AType
  AProtocol
   {:foo an-existing-fn
    :bar (fn [a b] ...)
    :baz (fn ([a]...) ([a b] ...)...)}
  BProtocol
    {...}
...)
```

>
extend takes a type/class (or interface, see below), a one or more protocol + function map (evaluated) pairs.
>
- Will extend the polymorphism of the protocol’s methods to call the supplied functions when an AType is provided as the first argument
- Function maps are maps of the keywordized method names to ordinary fns
    - this facilitates easy reuse of existing fns and maps, for code reuse/mixins without derivation or composition
- You can implement a protocol on an interface
    - this is primarily to facilitate interop with the host (e.g. Java)
    - but opens the door to incidental multiple inheritance of implementation
        - since a class can inherit from more than one interface, both of which implement the protocol
        - if one interface is derived from the other, the more derived is used, else which one is used is unspecified.
- The implementing fn can presume first argument is instanceof AType
- You can implement a protocol on nil
- To define a default implementation of protocol (for other than nil) just use Object

`extend`가 받는 인자는 타입/클래스(또는 interface)와, protocol 그리고 protocol에 추가할 함수들이 들어있는 맵 쌍을 받습니다.

- 그 결과로 protocol의 다형성에 참여한 메소드를 추가해서, AType이 첫번째 인자로 주어지면 해당 함수가 호출되도록 합니다.
- 함수 map은 키워드화된 메소드 이름과 평범한 fn으로 이루어집니다.
    - 이를 통해 이미 만들어져 있는 fn과 map을 쉽게 재활용할 수 있으므로 파생(derivation)이나 합성(composition)을 사용하지 않고도 코드 재사용이 가능해집니다.
- interface로 protocol을 구현하는 것도 가능합니다.
    - 이 방법은 주로 호스트 언어(예: Java)와의 상호 운용을 위한 것입니다.
    - 하지만 이 방법은 다중 상속이라는 불필요한 문을 열어 버리게 될 수 있습니다.
        - class가 각각 protocol을 구현하는 하나 이상의 interface를 상속하게 될 수 있습니다.
        - 만약 다른 interface에서 파생된 interface를 사용하게 된다면, 더 많이 파생된 interface가 사용됩니다. 그 외의 경우에는 어느 것이 사용되는지 지정되지 않습니다.
- 구현된 fn은 첫번째 인자를 AType의 인스턴스라고 가정합니다.
- `nil`에도 protocol을 구현할 수 있습니다.
- (nil이 아닌) protocol의 기본 구현을 정의하고 싶다면 Object를 사용하세요.

>
Protocols are fully reified and support reflective capabilities via [extends?][extends?], [extenders][extenders], and [satisfies?][satisfies?].
>
- Note the convenience macros [extend-type][extend-type] and [extend-protocol][extend-protocol]
- If you are providing external definitions inline, these will be more convenient than using **extend** directly

protocol은 완전히 구체화되며, protocol의 reflection 기능은 [extends?][extends?], [extenders][extenders], [satisfies?][satisfies?]를 통해 지원됩니다.

- 편리한 매크로인 [extend-type][extend-type], [extend-protocol][extend-protocol]를 기억해 두세요.
- 외부 정의를 인라인에서 제공하고 싶다면 위의 매크로들이 `extend`를 직접 사용하는 것보다 편리할 것입니다.

```clojure
(extend-type MyType
  Countable
    (cnt [c] ...)
  Foo
    (bar [x y] ...)
    (baz ([x] ...) ([x y zs] ...)))

  ;expands into:

(extend MyType
  Countable
   {:cnt (fn [c] ...)}
  Foo
   {:baz (fn ([x] ...) ([x y zs] ...))
    :bar (fn [x y] ...)})
```

#### Guidelines for extension

>
Protocols are an open system, extensible to any type. To minimize conflicts, consider these guidelines:
>
- If you don’t own the protocol or the target type, you should only extend in app (not public lib) code, and expect to maybe be broken by either owner.
- If you own the protocol you get to provide some base versions for common targets as part of the package, subject to the dictatorial nature of doing so.
- If you are shipping a lib of potential targets you can provide implementations of common protocols for them, subject to the fact that you are dictating. You should take particular care when extending protocols included with Clojure itself.
- If you are a library developer, you should not extend if you own neither the protocol nor the target

>
Also see this [mailing list discussion][mailing list discussion].

protocol은 어떤 타입으로도 확장할 수 있는 열린 시스템입니다.
다음은 protocol을 쓸 때 충돌을 최소화하기 위한 가이드입니다.

- 만약 여러분이 해당 protocol이나 대상 타입을 소유하고 있지 않다면 app 코드(공개된 라이브러리가 아닌 경우)에서만 확장해야 합니다. 그리고 양쪽에서 깨질 수 있다는 걸 알아둬야 합니다.
- 여러분이 해당 protocol을 소유하고 있다면 일반적인 대상에 대한 기본적인 버전 몇 가지를 패키지의 일부로 제공할 수 있습니다.
- 만약 잠재적 대상에 대한 라이브러리를 제공한다면 해당 대상에 대한 공용 protocol의 구현을 제공할 수 있습니다. 단, Clojure 자체에 포함된 protocol을 확장할 때에는 특히 주의하세요.
- 라이브러리를 개발할 때, 만약 여러분이 protocol이나 작업 대상을 소유하고 있지 않다면 확장하면 안 됩니다.

자세한 내용은 [이메일을 통한 토론 내역][mailing list discussion]을 읽어 보세요.

#### Extend via metadata

>
As of Clojure 1.10, protocols can optionally elect to be extended via per-value metadata:

Clojure 1.10 부터 protocol이 각 값의 메타데이터를 통해 확장되도록 할 수도 있습니다.

```clojure
(defprotocol Component
  :extend-via-metadata true
  (start [component]))
```

>
When :extend-via-metadata is true, values can extend protocols by adding metadata where keys are fully-qualified protocol function symbols and values are function implementations.
Protocol implementations are checked first for direct definitions (defrecord, deftype, reify), then metadata definitions, then external extensions (extend, extend-type, extend-protocol).

`:extend-via-metadata`가 `true`이면, key가 정규화된 protocol 함수 symbol이고 value가 함수 구현체인 메타데이터를 추가해서 protocol을 확장할 수 있습니다.

protocol 구현의 체크 순서는 다음과 같습니다.

1. 직접 정의된 것들(defrecord, deftype, reify) 체크
2. 메타데이터 정의
3. 외부 확장(extend, extend-type, extend-protocol)

```clojure
(def component (with-meta {:name "db"} {`start (constantly "started")}))
(start component)
;;=> "started"
```

[datatypes]: https://clojure.org/reference/datatypes
[defprotocol]: https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/defprotocol
[defrecord]: https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/defrecord
[deftype]: https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/deftype
[extend-protocol]: https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/extend-protocol
[extend-type]: https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/extend-type
[extend]: https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/extend
[extenders]: https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/extenders
[extends?]: https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/extends%3F
[mailing list discussion]: https://groups.google.com/d/msg/clojure/vyX5-F3NiVg/Ti1apkxDFl0J
[protocols]: https://clojure.org/reference/protocols
[reify]: https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/reify
[satisfies?]: https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/satisfies%3F

