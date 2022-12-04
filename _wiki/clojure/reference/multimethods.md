---
layout  : wiki
title   : Multimethods and Hierarchies
summary : 
date    : 2022-06-27 21:03:54 +0900
updated : 2022-06-29 23:44:38 +0900
tag     : clojure 번역
resource: 53/CB676E-AD39-4E6F-B856-4AF34A58E4E1
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
>
A Clojure multimethod is a combination of a _dispatching_ _function_, and one or more _methods_.
When a multimethod is defined, using _**defmulti**_, a dispatching function must be supplied.
This function will be applied to the arguments to the multimethod in order to produce a _dispatching value_.
The multimethod will then try to find the method associated with the dispatching value or a value from which the dispatching value is derived.
If one has been defined (via [defmethod]),[defmethod]), it will then be called with the arguments and that will be the value of the multimethod call.
If no method is associated with the dispatching value, the multimethod will look for a method associated with the default dispatching value (which defaults to _**:default**_), and will use that if present.
Otherwise the call is an error.

전통적인 객체지향 패러다임에서는 매번 새로운 데이터 타입을 생성하는 것을 기본으로 합니다.
반면에 Clojure는 몇 개 안 되는 타입 세트를 지원하는 다양한 함수를 제공하는 대규모 라이브러리를 구축하는 방법을 선호합니다.
그럼에도 Clojure는 런타임에서 다형성을 지원하면 유연하고 확장 가능한 시스템 아키텍처를 구축하기 용이하다는 것도 인식하고 있습니다.
그래서 Clojure에서는 multimethod 시스템을 통해 정교한 런타임 다형성을 지원합니다.
multimethod 시스템은 타입, 값, 속성, 메타데이터, 여러 인자들 사이의 관계 등등에 대한 디스패치를 지원합니다.

Clojure의 multimethod는 분기(dispatching) 함수와 여러 method들을 조합해 만듭니다.

multimethod는 `defmulti`를 통해 정의하며, 분기 용도로 쓸 함수를 반드시 제공해줘야 합니다.
이 분기 함수는 multimethod의 인자를 토대로 분기의 기준값을 리턴하게 됩니다.
분기 기준값이 생성되면 multimethod는 해당 기준값과 연결된 메소드를 찾습니다.
그리고 [defmethod][defmethod]를 통해 정의된 함수를 찾으면, 해당 메소드에 인자를 집어넣고 호출하며, 그 결과값이 multimethod의 리턴값이 됩니다.
만약 분기 값과 연결된 메소드가 없다면 multimethod는 기본 분기 값(기본값은 `:default`)과 연결된 메소드를 찾아 사용하게 됩니다.
이런 경우에 기본 분기 메소드가 없다면 에러가 발생합니다.

>
The multimethod system exposes this API: [defmulti][defmulti] creates new multimethods, [defmethod][defmethod] creates and installs a new method of multimethod associated with a dispatch-value, [remove-method][remove-method] removes the method associated with a dispatch-value and [prefer-method][prefer-method] creates an ordering between methods when they would otherwise be ambiguous.
>
Derivation is determined by a combination of either Java inheritance (for class values), or using Clojure’s ad hoc hierarchy system.
The hierarchy system supports derivation relationships between names (either symbols or keywords), and relationships between classes and names.
The [derive][derive] function creates these relationships, and the [isa?][isa?] function tests for their existence.
Note that [isa?][isa?] is not [instance?][instance?].

multimethod 시스템이 제공하는 API:

- [defmulti][defmulti]는 새로운 multimethod를 생성합니다.
- [defmethod][defmethod]는 multimethod에 새로운 메소드를 생성해서 연결합니다. 각 메소드는 분기값을 갖습니다.
- [remove-method][remove-method]는 분기값에 연결된 메소드를 제거합니다.
- [prefer-method][prefer-method]는 메소드 우선순위를 설정합니다.

파생(derivation)은 Java의 상속(class 값인 경우)이나, Clojure의 임시 계층 시스템을 사용해 만들어집니다.
계층 시스템은 이름(symbol이나 keyword) 사이의 파생 관계와 class와 name 사이의 관계를 서포트합니다.
이런 관계들은 [derive][derive] 함수로 만들 수 있습니다.
그리고 [isa?][isa?] 그런 관계가 있는지 검사하는 데 쓰입니다.
참고로 [isa?][isa?] 는 [instance?][instance?]와 다르다는 점에 주의하세요.

>
You can define hierarchical relationships with (derive child parent).
Child and parent can be either symbols or keywords, and must be namespace-qualified:
>
_Note the :: reader syntax, ::keywords resolve namespaces._

`(derive child parent)`를 사용해서 계층 관계를 정의할 수 있습니다.
child와 parent는 symbol이나 keyword이면 되며, 반드시 namespace를 포함해야 합니다

`::` reader 문법에서 `::keyword` 이면 namespace를 resolve한다는 점을 기억해두세요.

```clojure
::rect
-> :user/rect
```

>
[derive][derive] is the fundamental relationship-maker

[derive][derive]는 관계를 만드는 기본적인 함수입니다.

```clojure
(derive ::rect ::shape)
(derive ::square ::rect)
```

>
[parents][parents] / [ancestors][ancestors] / [descendants][descendants] and [isa?][isa?] let you query the hierarchy

[parents][parents] / [ancestors][ancestors] / [descendants][descendants] / [isa?][isa?] 를 통해 계층 구조를 조회할 수 있습니다.

```clojure
(parents ::rect)
-> #{:user/shape}

(ancestors ::square)
-> #{:user/rect :user/shape}

(descendants ::shape)
-> #{:user/rect :user/square}
```

>
`(= x y)` implies `(isa? x y)`

`(= x y)`는 `(isa? x y)`를 암시합니다.

```clojure
(isa? 42 42)
-> true
```

>
`isa?` uses the hierarchy system

`isa?`는 계층 시스템을 확인합니다.

```clojure
(isa? ::square ::shape)
-> true
```

>
You can also use a class as the child (but not the parent, the only way to make something the child of a class is via Java inheritance).
>
This allows you to superimpose new taxonomies on the existing Java class hierarchy:

child에 class를 지정하는 것도 가능합니다
하지만 parent에 class를 지정하는 것은 할 수 없습니다.
class에 child를 달아주는 방법은 Java 상속 뿐입니다.

이 방법을 통해 Java class 계층구조를 바탕으로 새로운 분류체계를 만들 수 있습니다.

```clojure
(derive java.util.Map ::collection)
(derive java.util.Collection ::collection)

(isa? java.util.HashMap ::collection)
-> true
```

>
[isa?][isa?] also tests for class relationships:

`isa?`를 쓰면 class 관계를 검사할 수 있습니다.

```clojure
(isa? String Object)
-> true
```

>
as do [parents][parents] / [ancestors][ancestors] (but not [descendants][descendants], since class descendants are an open set)

[parents][parents] / [ancestors][ancestors]를 사용해서 관계 집합을 조사할 수 있습니다.

그러나 [descendants][descendants] 함수는 class descendants를 열린 집합으로 표현하므로 똑같이 동작하지 않습니다.

```clojure
(ancestors java.util.ArrayList)
-> #{java.lang.Cloneable java.lang.Object java.util.List
    java.util.Collection java.io.Serializable
    java.util.AbstractCollection
    java.util.RandomAccess java.util.AbstractList}
```

>
[isa?][isa?] works with vectors by calling [isa?][isa?] on their corresponding elements:

[isa?][isa?]는 vector가 주어지면 같은 인덱스를 가진 원소에 대해 조사해 줍니다.

```clojure
(isa? [::square ::rect] [::shape ::shape])
-> true
```

>
**역주**
>
[clojuredocs.org/clojure.core/isa_q]( https://clojuredocs.org/clojure.core/isa_q#example-5b315673e4b00ac801ed9e1f )의 예제를 함께 보면 `isa?`에 두 개의 벡터를 제공한 경우를 이해하기 쉽습니다.
>
> ```clojure
> ;; you can use vectors to test multiple child/parent pairs
>
> user=> (derive ::child-1 ::parent-1)
> nil
>
> user=> (derive ::child-2 ::parent-2)
> nil
>
> user=> (isa? [::child-1 ::child-2] [::parent-1 ::parent-2])
> true
> ```
{:style="background-color: #ecf1e8;"}

### isa? based dispatch

>
Multimethods use [isa?][isa?] rather than = when testing for dispatch value matches.
Note that the first test of [isa?][isa?] is =, so exact matches work.

multimethod는 분기 값을 검사할 때 `=`보다 [isa?][isa?]를 사용하는 것을 추천합니다.
[isa?][isa?] 내부에서 수행하는 첫 번째 테스트가 `=`를 사용한다는 점에 주목하세요.
따라서 정확한 일치 검사도 `isa?`로 할 수 있습니다.

>
**역주**: 다음은 `isa?`의 코드입니다.
>
> ```clojure
> (defn isa?
>   "Returns true if (= child parent), or child is directly or indirectly derived from
>   parent, either via a Java type inheritance relationship or a
>   relationship established via derive. h must be a hierarchy obtained
>   from make-hierarchy, if not supplied defaults to the global
>   hierarchy"
>   {:added "1.0"}
>   ([child parent] (isa? global-hierarchy child parent))
>   ([h child parent]
>    (or (= child parent) ;; <======= 여기!
>        (and (class? parent) (class? child)
>             (. ^Class parent isAssignableFrom child))
>        (contains? ((:ancestors h) child) parent)
>        (and (class? child) (some #(contains? ((:ancestors h) %) parent) (supers child)))
>        (and (vector? parent) (vector? child)
>             (= (count parent) (count child))
>             (loop [ret true i 0]
>               (if (or (not ret) (= i (count parent)))
>                 ret
>                 (recur (isa? h (child i) (parent i)) (inc i))))))))
> ```
{:style="background-color: #ecf1e8;"}

<span/>

```clojure
(defmulti foo class)
(defmethod foo ::collection [c] :a-collection)
(defmethod foo String [s] :a-string)

(foo [])
:a-collection

(foo (java.util.HashMap.))
:a-collection

(foo "bar")
:a-string
```

>
[prefer-method][prefer-method] is used for disambiguating in case of multiple matches where neither dominates the other.
You can just declare, per multimethod, that one dispatch value is preferred over another:

[prefer-method][prefer-method]는 애매하게 여러 경우가 매치될 때, 우선순위를 명확히 할 때 사용합니다.
multimethod 별로 각각의 우선순위를 정의할 수 있습니다.

```clojure
(derive ::rect ::shape)

(defmulti bar (fn [x y] [x y]))
(defmethod bar [::rect ::shape] [x y] :rect-shape)
(defmethod bar [::shape ::rect] [x y] :shape-rect)

(bar ::rect ::rect)
-> Execution error (IllegalArgumentException) at user/eval152 (REPL:1).
   Multiple methods in multimethod 'bar' match dispatch value:
   [:user/rect :user/rect] -> [:user/shape :user/rect]
   and [:user/rect :user/shape], and neither is preferred

(prefer-method bar [::rect ::shape] [::shape ::rect])
(bar ::rect ::rect)
-> :rect-shape
```

>
All of the examples above use the global hierarchy used by the multimethod system, but entire independent hierarchies can also be created with [make-hierarchy][make-hierarchy], and all of the above functions can take an optional hierarchy as a first argument.
>
This simple system is extremely powerful.
One way to understand the relationship between Clojure multimethods and traditional Java-style single dispatch is that single dispatch is like a Clojure multimethod whose dispatch function calls getClass on the first argument, and whose methods are associated with those classes.
Clojure multimethods are not hard-wired to class/type, they can be based on any attribute of the arguments, on multiple arguments, can do validation of arguments and route to error-handling methods etc.

위의 예제는 multimethod 시스템의 전역 계층을 사용하고 있습니다.
그러나 전체적인 독립 계층도 [make-hierarchy][make-hierarchy]를 사용하여 생성할 수 있습니다.
그리고 위의 모든 함수는 첫 번째 인자로 옵셔널 계층을 지정할 수 있습니다.

이 시스템은 간단하며 매우 강력합니다.

전통적인 Java 스타일의 단일 dispatch의 관점에서 Clojure의 multimethod를 이해해봅시다.

Java의 single dispatch는 Clojure multimethod의 첫 번째 인자에서 `.getClass()`를 호출하고 얻은 클래스의 메소드를 얻어내는 것과 비슷하다고 할 수 있을 것입니다.

CLojure의 multimethod는 class/type에 강하게 결합되어 있지 않습니다.
multimethod는 인자의 어떤 속성이건 토대로 삼을 수 있고, 인자의 수도 자유롭게 사용할 수 있으며,
여러 인자에 대해 유효성 검증을 해서 에러 핸들링 메소드로 라우팅하는 등의 응용이 가능합니다.

>
_Note: In this example, the keyword :Shape is being used as the dispatch function, as keywords are functions of maps, as described in the [Data Structures][Data Structures] section._

참고: 이 예제에서 `:Shape` 키워드는 dispatch 함수로 사용되고 있습니다.
이는 키워드를 map에 대해 함수로 사용할 수 있기 때문입니다.
자세한 내용은 [[/clojure/reference/data-structures]] 문서를 참고하세요.

```clojure
(defmulti area :Shape)
(defn rect [wd ht] {:Shape :Rect :wd wd :ht ht})
(defn circle [radius] {:Shape :Circle :radius radius})
(defmethod area :Rect [r]
    (* (:wd r) (:ht r)))
(defmethod area :Circle [c]
    (* (. Math PI) (* (:radius c) (:radius c))))
(defmethod area :default [x] :oops)
(def r (rect 4 13))
(def c (circle 12))
(area r)
-> 52
(area c)
-> 452.3893421169302
(area {})
-> :oops
```

[Data Structures]: https://clojure.org/reference/data_structures
[ancestors]: https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/ancestors
[defmethod]: https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/defmethod
[defmulti]: https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/defmulti
[derive]: https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/derive
[descendants]: https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/descendants
[instance?]: https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/instance?
[isa?]: https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/isa?
[make-hierarchy]: https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/make-hierarchy
[parents]: https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/parents
[prefer-method]: https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/prefer-method
[prefer-method]: https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/prefer-method
[remove-method]: https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/remove-method
