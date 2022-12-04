---
layout  : wiki
title   : Datatypes - deftype, defrecord and reify
summary : Clojure Reference 문서 번역
date    : 2022-06-18 11:02:52 +0900
updated : 2022-06-18 17:51:24 +0900
tag     : 
resource: D8/BC9E6B-ACE0-47CE-86FB-0B96A9CD4333
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

**deftype과 defrecord 둘 중 하나만 있어도 되는 거 아닌가요?**

>
It ends up that classes in most OO programs fall into two distinct categories: those classes that are artifacts of the implementation/programming domain, e.g. String or collection classes, or Clojure’s reference types; and classes that represent application domain information, e.g. Employee, PurchaseOrder etc.
It has always been an unfortunate characteristic of using classes for application domain information that it resulted in information being hidden behind class-specific micro-languages, e.g. even the seemingly harmless employee.getName() is a custom interface to data.
Putting information in such classes is a problem, much like having every book being written in a different language would be a problem.
You can no longer take a generic approach to information processing.
This results in an explosion of needless specificity, and a dearth of reuse.
>
This is why Clojure has always encouraged putting such information in maps, and that advice doesn’t change with datatypes.
By using defrecord you get generically manipulable information, plus the added benefits of type-driven polymorphism, and the structural efficiencies of fields.
OTOH, it makes no sense for a datatype that defines a collection like vector to have a default implementation of map, thus deftype is suitable for defining such programming constructs.
>
Overall, records will be better than structmaps for all information-bearing purposes, and you should move such structmaps to defrecord.
It is unlikely much code was trying to use structmaps for programming constructs, but if so, you will find deftype much more suitable.
>
AOT-compiled deftype/defrecord may be suitable for some of the use cases of **gen-class**, where their limitations are not prohibitive. In those cases, they will have better performance than gen-class.

어지간한 객체지향 프로그램의 클래스는 결국 두 가지 유형으로 나뉘게 됩니다.

- 구현/프로그래밍 도메인을 위해 만든 클래스
    - 예: String, collection 클래스, Clojure의 reference 클래스
- 애플리케이션 도메인 정보를 표현하는 클래스
    - 예: `Employee`, `PurchaseOrder` 등

애플리케이션 도메인 정보를 위한 클래스의 사용에는 안타까운 특성이 있습니다.
클래스별로 정의된 마이크로 언어 뒤에 정보가 숨겨져 있다는 거죠.
예를 들어 `employee.getName()`은 겉보기에 무난해 보이지만 데이터에 대한 커스텀 인터페이스이기도 합니다.

이런 클래스에 정보를 집어넣는 것은, 마치 세상의 모든 책이 각기 다른 언어로 쓰여지는 것과 같은 문제를 가지고 있습니다.

데이터를 처리하기 위한 일반적인 접근이 불가능해지는 것입니다.
이로 인해 불필요한 특이성의 폭발이 발생하며 재사용도 극히 어려워집니다.

이것이 바로 Clojure가 datatype과 관계 없이 항상 자료를 map에 넣는 것을 권장하고 있는 이유입니다.
defrecord를 사용하면 정보를 일반적인 방식으로 처리할 수 있습니다. 그리고 타입 기반의 다형성이라는 이점과 필드들을 포함하는 구조체라는 이점을 함께 얻을 수 있습니다.
반면에, vector 같은 컬렉션을 정의할 때라면 map의 기본 구현을 제공해주는 defrecord는 적절하지 않습니다.
이런 프로그래밍 구조를 정의할 때에는 deftype이 적합합니다.

전반적으로 모든 종류의 정보 전달에 대해 record는 structmap보다 나은 선택입니다. 따라서 structmap으로 만들어둔 게 있다면 defrecord로 바꾸도록 해야 합니다.
프로그래밍 구조체에 대해서 일반적으로 structmap을 사용했을 것 같지는 않지만, 만약 그렇게 했다면 그보다 deftype이 더 적합하다는 것도 알게 될 것입니다.

AOT 컴파일된 deftype/defrecord는 **gen-class**처럼 사용하는 것이 적절한 때도 있는데, 그런 경우에는 gen-class 보다 더 성능이 좋을 것입니다.

### Datatypes and protocols are opinionated

**datatype과 protocol의 원칙**

>
While datatypes and protocols have well-defined relationships with host constructs, and make for a great way to expose Clojure functionality to Java programs, they are not primarily interop constructs.
That is, they make no effort to completely mimic or adapt to all of the OO mechanisms of the host.
In particular, they reflect the following opinions:
>
- Concrete derivation is bad
    - you cannot derive datatypes from concrete classes, only interfaces
- You should always program to protocols or interfaces
    - datatypes cannot expose methods not in their protocols or interfaces
- Immutability should be the default
    - and is the only option for records
- Encapsulation of information is folly
    - fields are public, use protocols/interfaces to avoid dependencies
- Tying polymorphism to inheritance is bad
    - protocols free you from that

datatype과 protocol은 호스트 구조체와 잘 맞물려 돌아가도록 정의되었고, Java 프로그램에 Clojure의 기능을 노출하는 좋은 방법을 제공하긴 하지만 기본적으로 구조체 interop은 아닙니다.
즉, 호스트의 모든 객체지향 메커니즘을 완전히 모방하거나 적용하려 하지 않는다는 것입니다.
이는 다음과 같은 의견을 반영한 것입니다.

- 구체 상속은 나쁘다
    - 구체 클래스에서 datatype을 상속하지 않도록 합니다. 인터페이스만 상속하도록 합니다.
- 항상 protocol이나 interface만 사용해서 프로그래밍하도록 합니다.
    - datatype가 자신의 protocol이나 interface에 없는 메소드를 노출하는 것은 불가능합니다.
- 불변이 기본이어야 합니다.
    - record는 불변으로만 만들 수 있습니다.
- 정보의 캡슐화는 어려석은 선택입니다.
    - 모든 필드를 public으로 하고, 의존성을 피하기 위해 protocol/interface를 사용합니다.
- 다형성을 상속에 연계시키는 것은 나쁩니다.
    - protocol은 이런 연계에서 해방시킵니다.

>
If you use datatypes and protocols you will have a clean, interface-based API to offer your Java consumers.
If you are dealing with a clean, interface-based Java API, datatypes and protocols can be used to interoperate with and extend it.
If you have a 'bad' Java API, you will have to use gen-class.
Only in this way can the programming constructs you use to design and implement your Clojure programs be free of the incidental complexities of OO.

datatype과 protocol을 사용하면 인터페이스 기반의 깨끗한 API를 여러분의 Java 소비자들에게 제공할 수 있습니다.
깨끗한 인터페이스 기반의 Java API를 다룬다면 datatype과 protocol을 사용해서 API를 확장하고 상호 운용하는 것이 가능해집니다.
만약 '나쁜' Java API가 있다면, gen-class를 사용해야 합니다.
이것이 Clojure 프로그램을 설계하고 구현할 때 사용하는 프로그래밍 구조체에서 객체지향의 부수적인 복잡성을 떼어내는 유일한 방법입니다.


### reify

>
While deftype and defrecord define named types, [reify][reify] defines both an anonymous type and creates an instance of that type.
The use case is where you need a one-off implementation of one or more protocols or interfaces and would like to take advantage of the local context.
In this respect its use case is similar to proxy, or anonymous inner classes in Java.
>
The method bodies of reify are lexical closures, and can refer to the surrounding local scope.
**reify** differs from **proxy** in that:
>
- Only protocols or interfaces are supported, no concrete superclass.
- The method bodies are true methods of the resulting class, not external fns.
- Invocation of methods on the instance is direct, not using map lookup.
- No support for dynamic swapping of methods in the method map.

>
The result is better performance than proxy, both in construction and invocation.
**reify** is preferable to proxy in all cases where its constraints are not prohibitive.

deftype과 defrecord는 이름있는 타입을 정의합니다. 반면, [reify][reify]는 익명 타입을 정의하고 해당 타입의 인스턴스도 생성합니다.

하나 이상의 protocol이나 interface의 일회성 구현과 로컬 컨텍스트의 활용이 필요한 경우가 바로 reify의 사용 사례가 됩니다.

이런 사용 사례는 proxy나 Java의 익명 내부 클래스와 비슷합니다.

reify의 메소드 본문은 어휘적 closure이며, 주위를 감싸는 로컬 스코프를 참조할 수 있습니다.
**reify**와 **proxy**는 다음과 같은 차이점이 있습니다.

- protocol이나 interface만 지원되며, 구체 superclass는 없습니다.
- 메소드 본문은 외부의 fn 이 아니라 결과 클래스의 실제 메소드입니다.
- 인스턴스에서 메소드를 호출할 때, 메소드를 map에서 찾지 않습니다. 직접 호출합니다.
- 메소드 map에서 method의 동적 스와핑을 지원하지 않습니다.

reify를 사용한 결과는 proxy를 사용한 것보다 더 나은 성능을 제공합니다.
제약 조건이 금지되지 않은 모든 경우에 대해 **reify**는 proxy보다 더 선호됩니다.

### Java annotation support

>
Types created with deftype, defrecord, and definterface, can emit classes that include Java annotations for Java interop. Annotations are described as meta on:

deftype, defrecord, definterface로 생성한 타입은 Java interop을 위한 Java annotation을 포함하는 클래스를 내보낼 수 있습니다.
annotation은 다음과 같은 메타데이터로 명시할 수 있습니다.

>
- Type name (deftype/record/interface) - class annotations
- Field names (deftype/record) - field annotations
- Method names (deftype/record) - method annotations

<span/>

>
Example:
>
> ```clojure
> (import [java.lang.annotation Retention RetentionPolicy Target ElementType]
>         [javax.xml.ws WebServiceRef WebServiceRefs])
>
> (definterface Foo (foo []))
> 
> ;; annotation on type
> (deftype ^{Deprecated true
>            Retention RetentionPolicy/RUNTIME
>            javax.annotation.processing.SupportedOptions ["foo" "bar" "baz"]
>            javax.xml.ws.soap.Addressing {:enabled false :required true}
>            WebServiceRefs [(WebServiceRef {:name "fred" :type String})
>                            (WebServiceRef {:name "ethel" :mappedName "lucy"})]}
>   Bar [^int a
>        ;; on field
>        ^{:tag int
>          Deprecated true
>          Retention RetentionPolicy/RUNTIME
>          javax.annotation.processing.SupportedOptions ["foo" "bar" "baz"]
>          javax.xml.ws.soap.Addressing {:enabled false :required true}
>          WebServiceRefs [(WebServiceRef {:name "fred" :type String})
>                          (WebServiceRef {:name "ethel" :mappedName "lucy"})]}
>        b]
>   ;; on method
>   Foo (^{Deprecated true
>          Retention RetentionPolicy/RUNTIME
>          javax.annotation.processing.SupportedOptions ["foo" "bar" "baz"]
>          javax.xml.ws.soap.Addressing {:enabled false :required true}
>          WebServiceRefs [(WebServiceRef {:name "fred" :type String})
>                          (WebServiceRef {:name "ethel" :mappedName "lucy"})]}
>        foo [this] 42))
>
> (seq (.getAnnotations Bar))
> (seq (.getAnnotations (.getField Bar "b")))
> (seq (.getAnnotations (.getMethod Bar "foo" nil)))
> ```

[datatypes]: https://clojure.org/reference/datatypes
[defrecord]: https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/defrecord
[deftype]: https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/deftype
[protocols]: https://clojure.org/reference/protocols
[reify]: https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/reify


