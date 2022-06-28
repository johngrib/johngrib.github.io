---
layout  : wiki
title   : Multimethods and Hierarchies
summary : 번역 중인 문서
date    : 2022-06-27 21:03:54 +0900
updated : 2022-06-29 00:06:15 +0900
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
반면에 Clojure는 몇 개 안 되는 타입 세트를 지원하는 다양한 함수를 제공하는 대규모 라이브러리를 구축하는 방법을 선호합니다.

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

Clojure의 multimethod는 분기(dispatching) 함수와 여러 method들을 조합하는 것이라 할 수 있습니다.

multimethod를 정의할 때에는 `defmulti`를 통해 반드시 분기 용도로 쓸 함수를 제공해줘야 합니다.
이렇게 제공한 분기 함수는 multimethod의 인자에 적용되어 분기의 기준이 될 값을 생성하게 됩니다.
분기 기준값이 생성되면 multimethod는 해당 값과 연결된 메소드를 탐색합니다.
[defmethod][defmethod]를 통해 정의된 함수를 찾아내면 해당 메소드에 인자를 집어넣고 호출하며, 그 결과값이 multimethod의 리턴값이 됩니다.
만약 분기 값과 연결된 메소드가 없다면 multimethod는 기본 분기 값(기본값은 `:default`)과 연결된 메소드를 찾아 사용하게 됩니다.
이런 경우에 기본 분기 메소드가 없다면 에러가 발생합니다.

>
The multimethod system exposes this API: [defmulti][defmulti] creates new multimethods, [defmethod][defmethod] creates and installs a new method of multimethod associated with a dispatch-value, [remove-method][remove-method] removes the method associated with a dispatch-value and [prefer-method][prefer-method] creates an ordering between methods when they would otherwise be ambiguous.

multimethod 시스템이 제공하는 API:

- [defmulti][defmulti]는 새로운 multimethod를 생성합니다.
- [defmethod][defmethod]는 multimethod에 새로운 메소드를 생성해서 연결합니다. 각 메소드는 분기값을 갖습니다.
- [remove-method][remove-method]는 분기값에 연결된 메소드를 제거합니다.
- [prefer-method][prefer-method]는 메소드 우선순위를 설정합니다.


### isa? based dispatch

[defmethod]: https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/defmethod
[defmulti]: https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/defmulti
[prefer-method]: https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/prefer-method
[remove-method]: https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/remove-method
