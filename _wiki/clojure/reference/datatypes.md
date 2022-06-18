---
layout  : wiki
title   : Datatypes - deftype, defrecord and reify
summary : Clojure Reference 문서 번역 - 번역중
date    : 2022-06-18 11:02:52 +0900
updated : 2022-06-18 15:45:27 +0900
tag     : 
toc     : true
public  : true
parent  : [[/clojure/reference]]
latex   : false
---
* TOC
{:toc}

## Datatypes: deftype, defrecord and reify : Clojure Reference 문서 번역

- 원문: [Datatypes: deftype, defrecord and reify : Clojure Reference]( https://clojure.org/reference/datatypes )

### Motivation

>
Clojure is written in terms of abstractions.
There are abstractions for sequences, collections, callability, etc.
In addition, Clojure supplies many implementations of these abstractions.
The abstractions are specified by host interfaces, and the implementations by host classes.
While this was sufficient for bootstrapping the language, it left Clojure without similar abstraction and low-level implementation facilities.
The [protocols](https://clojure.org/reference/protocols ) and [datatypes](https://clojure.org/reference/datatypes ) features add powerful and flexible mechanisms for abstraction and data structure definition with no compromises vs the facilities of the host platform.

Clojure는 추상화 개념을 중심으로 만들어졌습니다.
여기에서 말하는 추상화에는 sequence, collection, callability 같은 것들이 있습니다.

Clojure는 이런 추상화에 대한 많은 구현체들을 제공하는 언어입니다.
그런데 이런 추상들은 호스트 인터페이스에서 정의되고 구현도 호스트 클래스에서 이루어집니다.
이런 특성은 Clojure 언어를 부트스트래핑하기에는 충분했지만, 이와 유사한 Clojure 자체의 추상화 및 저수준 구현이 없다는 문제가 생기게 되었습니다.

[protocol][protocols]과 [datatype][datatypes]은 호스트 플랫폼의 특성과 타협하지 않으면서도 Clojure에 강력하고 유연한 추상화 메커니즘과 자료 구조를 제공합니다.

### Basics

>
The datatype features - [deftype][deftype], [defrecord][defrecord] and [reify][reify], provide the mechanism for defining implementations of abstractions, and in the case of reify, instances of those implementations.
The abstractions themselves are defined by either [protocols][protocols] or interfaces.
A datatype provides a host type, (named in the case of deftype and defrecord, anonymous in the case of reify), with some structure (explicit fields in the case of deftype and defrecord, implicit closure in the case of reify), and optional in-type implementations of abstraction methods.
They support, in a relatively clean manner, access to the highest-performance primitive representation and polymorphism mechanisms of the host.
N.B. that they are not merely host-in-parens constructs.
They support only a circumscribed subset of the host facilities, often with more dynamism than the host itself.
The intent is that, unless interop forces one to go beyond their circumscribed scope, one need not leave Clojure to get the highest-performing data structures possible on the platform.

[deftype][deftype], [defrecord][defrecord], [reify][reify]와 같은 datatype 기능들은 추상화 구현을 정의하기 위한 메커니즘을 제공합니다.
그리고 reify는 이러한 구현체들의 인스턴스입니다.

추상화 자체는 [protocol][protocols]이나 인터페이스로 정의됩니다.

datatype은 호스트 타입(deftype이나 defrecord이면 이름이 있고, reify이면 이름이 없음)과 몇 가지 구조(deftype과 defrecord이면 명시적으로 필드를 갖고 있고, reify이면 암묵적인 closure를 사용), 그리고 옵셔널하게 해당 타입의 추상화된 메소드 구현을 제공합니다. 그러면서 성능이 뛰어난 호스트의 기본 표현과 다형성 메커니즘에 대해 깔끔한 방식의 접근을 지원합니다.

호스트 기능에 단순히 껍질을 씌우기만 한 기능이 것이 아니라는 사실이 중요합니다.
이들은 호스트 언어 기능의 부분 집합을 제한적으로 지원하지만, 호스트 언어보다 더 다이나믹하게 사용하는 것도 가능합니다.
이렇게 만든 이유는 플랫폼 위에서 돌아가는 가장 강력한 성능의 자료구조를 얻는다는 이유로 Clojure 바깥으로 나갈 필요가 없게 하기 위해서였습니다. 제한해둔 영역을 interop을 사용해 강제로 벗어나지 않는 한에서는요.

### deftype and defrecord

>
[deftype][deftype] and [defrecord][defrecord] dynamically generate compiled bytecode for a named class with a set of given fields, and, optionally, methods for one or more protocols and/or interfaces.
They are suitable for dynamic and interactive development, need not be AOT compiled, and can be re-evaluated in the course of a single session.
They are similar to defstruct in generating data structures with named fields, but differ from defstruct in that:
>
- They generate a unique class, with fields corresponding to the given names.
- the resulting class has a proper type, unlike conventions for encoding type for structs in metadata
- because they generate a named class, it has an accessible constructor
- fields can have type hints, and can be primitive
    - note that currently a type hint of a non-primitive type will not be used to constrain the field type nor the constructor arg, but will be used to optimize its use in the class methods
    - constraining the field type and constructor arg is planned
- a deftype/defrecord can implement one or more protocols and/or interfaces
- deftype/defrecord can be written with a special reader syntax #my.thing[1 2 3] where:
    - each element in the vector form is passed to the deftype/defrecord’s constructor un-evaluated
    - the deftype/defrecord name must be fully qualified
    - only available in Clojure versions later than 1.3
- when a deftype/defrecord Foo is defined a corresponding function ->Foo is defined that passes its arguments to the constructor (versions 1.3 and later only)

[deftype][deftype]과 [defrecord][defrecord]는 이름있는 클래스의 컴파일된 바이트코드를 동적으로 생성합니다. 이 때 주어진 필드들도 포함되며, 옵셔널하게 하나 이상의 프로토콜/인터페이스의 메소드도 여기에 포함될 수 있습니다.
deftype과 defrecord는 다이나믹하고 인터랙티브한 개발에 잘 어울립니다.
[AOT 컴파일]( https://ko.wikipedia.org/wiki/AOT_컴파일 )도 필요하지 않으므로 하나의 세션 과정에서 재평가(re-evaluated)하는 것도 가능합니다.
deftype과 defrecord는 이름있는 필드를 갖는 데이터 구조를 생성한다는 점에서 defstruct와 비슷하지만, 다음과 같은 차이점이 있습니다.

- 주어진 여러 이름의 필드를 갖는 유일한 클래스를 생성합니다.
- 결과 클래스는 적절한 타입을 갖습니다. 이는 메타데이터의 타입을 인코딩하는 struct의 규칙과 다릅니다.
- 이름있는 클래스를 생성하므로 접근 가능한 생성자를 갖고 있습니다.
- 각 필드들은 타입 힌트를 가질 수 있으며 primitive 타입도 가능합니다.
    - primitive가 아닌 타입에 대한 타입 힌트는 필드 타입이나 생성자 인자에 제약사항을 주는 용도가 아니며, 클래스 메소드에서 최적화에 사용된다는 점에 주목하세요.
    - 필드 타입과 생성자 인자에 타입 제약을 줍니다.
- deftype/defrecord는 `#my.thing[1 2 3]` 같은 특별한 reader syntax를 사용할 수 있습니다.
    - 벡터에 들어있는 각각의 원소들은 평가되지 않은 상태로 deftype/defrecord의 생성자로 전달됩니다.
    - deftype/defrecord의 이름은 생략 없이 완전히 명시되어야 합니다.
    - Clojure 1.3 이후 버전부터 가능합니다.
- deftype/defrecord 로 `Foo`를 정의하면, 해당 인자들을 생성자로 전달하는 `->Foo` 함수가 자동으로 정의됩니다. (Clojure 1.3 이후 버전부터 가능.)

>
[deftype][deftype] and [defrecord][defrecord] differ in the following ways:
>
- deftype provides no functionality not specified by the user, other than a constructor
- defrecord provides a complete implementation of a persistent map, including:
    - value-based equality and hashCode
    - metadata support
    - associative support
    - keyword accessors for fields
    - extensible fields (you can assoc keys not supplied with the defrecord definition)
    - etc
- deftype supports mutable fields, defrecord does not
- defrecord supports an additional reader form of #my.record{:a 1, :b 2} taking a map that initializes a defrecord according to:
    - the defrecord name must be fully qualified
    - the elements in the map are un-evaluated
    - existing defrecord fields take the keyed values
    - defrecord fields without keyed values in the literal map are initialized to nil
    - additional keyed values are allowed and added to the defrecord
    - only available in Clojure versions later than 1.3
- when a defrecord Bar is defined a corresponding function map->Bar is defined that takes a map and initializes a new record instance with its contents (versions 1.3 and later only)

deftype과 defrecord의 차이점은 다음과 같습니다.

- deftype은 생성자만 제공하며, 사용자가 지정하지 않은 기능을 자동으로 제공하지 않습니다.
- defrecord는 완전한 persistent map 구현체를 제공하며, 다음과 같은 특징들이 있습니다.
    - 값 기반의 equality와 hashCode
    - 메타데이터 지원
    - associative 지원
    - 필드에 대한 keyword 접근자
    - 필드 확장 가능(`assoc`을 사용해 defrecord 정의에 없었던 키를 추가할 수 있음)
    - 기타 등등
- deftype은 mutable한 필드를 지원하지만, defrecord는 지원하지 않습니다.
- defrecord는 `#my.record{:a 1, :b 2}` 같은 특별한 reader syntax를 사용할 수 있으며, 이 방법으로 defrecord를 생성할 때 초기값 map을 줄 수 있습니다.
    - defrecord 이름은 반드시 생략 없이 전체 경로를 지정해야 합니다.
    - map 내부의 원소들은 평가되지 않은 채로 전달됩니다.
    - 이미 존재하는 defrecord 필드는 키에 해당되는 값을 갖게 됩니다.
    - map에 초기값이 지정되지 않은 defrecord의 필드들은 nil로 초기화됩니다.
    - 정의에 없었던 추가된 키 값들도 defrecord에 추가됩니다.
    - Clojure 1.3 이후 버전부터 가능합니다.
- defrecord `Bar`가 정의될 때 map 하나를 받아 새로운 record 인스턴스를 만들어주는 `map->Bar` 함수가 자동으로 정의됩니다. (Clojure 1.3 이후 버전부터 가능.)

### Why have both deftype and defrecord?

### Datatypes and protocols are opinionated

### reify

### Java annotation support

[datatypes]: https://clojure.org/reference/datatypes
[defrecord]: https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/defrecord
[deftype]: https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/deftype
[protocols]: https://clojure.org/reference/protocols
[reify]: https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/reify

## 주석


