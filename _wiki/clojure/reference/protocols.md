---
layout  : wiki
title   : Protocols
summary : Clojure 레퍼런스 문서 번역
date    : 2022-07-02 23:21:40 +0900
updated : 2022-07-02 23:45:24 +0900
tag     : clojure 번역
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

protocol은 Clojure 1.2에서 추가되었습니다.


#### Basics
#### Guidelines for extension
#### Extend via metadata

[datatypes]: https://clojure.org/reference/datatypes
[protocols]: https://clojure.org/reference/protocols
