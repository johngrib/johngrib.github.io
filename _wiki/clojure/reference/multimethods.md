---
layout  : wiki
title   : Multimethods and Hierarchies
summary : 번역 중인 문서
date    : 2022-06-27 21:03:54 +0900
updated : 2022-06-27 21:53:25 +0900
tag     : clojure 번역
toc     : true
public  : true
parent  : [[/clojure/reference]]
latex   : false
---
* TOC
{:toc}

- 원문: [Multimethods and Hierarchies]( https://clojure.org/reference/multimethods )

## Multimethods and Hierarchies : Clojure Reference 문서 번역

>
Clojure eschews the traditional object-oriented approach of creating a new data type for each new situation, instead preferring to build a large library of functions on a small set of types.
However, Clojure fully recognizes the value of runtime polymorphism in enabling flexible and extensible system architecture.
Clojure supports sophisticated runtime polymorphism through a multimethod system that supports dispatching on types, values, attributes and metadata of, and relationships between, one or more arguments.

전통적인 객체지향 패러다임에서는 매번 새로운 데이터 타입을 생성하는 것을 기본으로 합니다.
반면에 Clojure는 몇 개 안 되는 타입 세트를 지원하는 다양한 함수를 모아두는 방식의 대규모 라이브러리를 구축하는 방법을 선호합니다.

그럼에도 Clojure는 런타임에서 다형성을 지원하면 유연하고 확장 가능한 시스템 아키텍처를 구축하기 용이하다는 것도 인식하고 있습니다.
Clojure에서는 multimethod 시스템을 통해 정교한 런타임 다형성을 지원합니다.
multimethod 시스템은 타입, 값, 속성, 메타데이터에 대한 디스패치를 지원하며 하나 이상의 인자 등의 관계도 지원합니다.

>
A Clojure multimethod is a combination of a _dispatching_ _function_, and one or more _methods_.
When a multimethod is defined, using _**defmulti**_, a dispatching function must be supplied.
This function will be applied to the arguments to the multimethod in order to produce a _dispatching value_.
The multimethod will then try to find the method associated with the dispatching value or a value from which the dispatching value is derived.
If one has been defined (via [defmethod]),[defmethod]), it will then be called with the arguments and that will be the value of the multimethod call.
If no method is associated with the dispatching value, the multimethod will look for a method associated with the default dispatching value (which defaults to _**:default**_), and will use that if present.
Otherwise the call is an error.

Clojure의 multimethod는 dispatching 함수와 여러 method들을 조합하는 것이라 할 수 있습니다.

multimethod를 정의할 때에는 `defmulti`를 통해 반드시 dispatching 함수를 제공해줘야 합니다.
이렇게 제공한 함수는 디스패치 값을 생성하기 위해 multimethod의 인자들에 적용됩니다.
그러고 나서 multimethod는 디스패칭 값이나 디스패치 값이 파생된 값과 연결된 메소드를 찾아봅니다.
만약 [defmethod][defmethod]를 통해 하나가 정의되었다면, 해당 메소드는 인자들과 함께 호출되며, 그 결과값이 호출된 multimethod의 호출의 값이 됩니다.
만약 디스패치 값과 연결된 메소드가 없다면 multimethod는 기본 디스패치 값(기본값은 `:default`)과 연결된 메소드를 찾고, 그게 있다면 사용하게 됩니다. 그렇지 않다면 호출은 에러가 됩니다.


### isa? based dispatch

[defmethod]: https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/defmethod
