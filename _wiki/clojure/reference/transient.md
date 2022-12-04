---
layout  : wiki
title   : Clojure Transient Data Structures
summary : 
date    : 2022-01-22 17:43:29 +0900
updated : 2022-01-22 21:58:59 +0900
tag     : clojure 번역
resource: 0E/3211D0-F15A-4036-8A73-68BB63FD1DC0
toc     : true
public  : true
parent  : [[/clojure/reference]]
latex   : false
---
* TOC
{:toc}

## Transient Data Structures: Clojure Reference 문서 번역

[Transient Data Structures]( https://clojure.org/reference/transients )

### Rationale

**의도**

>
_If a tree falls in the woods, does it make a sound?_
>
_If a pure function mutates some local data in order to produce an immutable return value, is that ok?_

_만약 아무도 없는 숲 속에서 나무 한 그루가 쓰러졌다면, 과연 소리가 났을까?_

_만약 어떤 순수 함수가 변경 불가능한 리턴값을 생산하기 위해 로컬 데이터를 변경했다면, 올바른 일일까?_

>
It’s an interesting question.
Clojure data structures use mutation every time you call, e.g. **assoc**, creating one or more arrays and mutating them, before returning them for immutable use thereafter.
The reason is performance - you simply can’t get as fast using only pure functions and immutable data.
Once constructed and shared however, being immutable and persistent is essential to robust programs.
The things Clojure mutates internally are small, newly allocated arrays that constitute the internal nodes of its data structures.
No one ever sees the arrays.

흥미로운 질문입니다.
Clojure의 자료 구조들은 `assoc` 같은 것을 호출할 때마다 mutation을 사용합니다.
하나 이상의 배열을 생성하고 변경한 다음, immutable하게 사용할 수 있도록 만들어 리턴하는 거죠.
그 이유는 성능 때문입니다.
순수 함수와 immutable한 데이터만으로는 속도가 안 나옵니다.
그러나 일단 생성되고 공유되었다면, immutable하고 persistent해야 견고한 프로그램이 될 수 있을 것입니다.
Clojure는 내부적으로 새로 할당된 작은 배열들을 변경하며, 이들이 데이터 구조의 내부 노드를 구성하게 됩니다.
즉, 아무도 이 배열들을 보지 못하는 것입니다.

>
You run into a similar scenario, at a higher level, when you want to initialize or transform a large persistent data structure using multiple steps, none of which will be seen by any code other than the constructing/transforming code.
The challenge here is that the source of a transformation will be an existing persistent data structure, and the result of the function will be shared.
Copying into a traditional mutable data structure and back involves O(n) copying, and the internal code is an imperative mess quite unlike the rest of your Clojure code.
Furthermore, there are no guards against accidentally sharing or aliasing the mutable data structure, especially if you need to call helper functions to do the work.
In short, it would be a shame if you had to leave Clojure’s model in order to speed up a piece of code like this.
Transient data structures are a solution to this optimization problem that integrates with the Clojure model and provides the same thread safety guarantees you expect of Clojure.

여러 단계를 사용하여 대규모 영구 데이터 구조를 초기화하거나 변환하고자 한다면, 더 높은 수준에서 유사한 시나리오를 직면하게 됩니다.
이 경우 생성/변환 외에는 딱히 다른 방법이 보이지 않을 것입니다.

여기서 문제는 transformation할 소스가 persistent한 데이터 구조가 되어야 하며, 함수의 결과는 공유되어야 한다는 것입니다.
전통적인 mutable 데이터 구조로 복사하게 되면 `O(n)` 방식의 복사 작업을 하게 됩니다.
그리고 내부 코드는 다른 Clojure 코드들과는 달리 몹시 절차적인 코드일 것입니다.
게다가, 뭔가 작업을 하기 위해 helper 함수를 호출할 때 실수로 mutable한 데이터 구조를 공유하거나 aliasing해버릴 수도 있는데 그에 대한 안전장치도 없습니다.

하지만 코드의 속도를 높인다는 이유로 이런 방식으로 Clojure의 모델을 포기한다면 아쉬운 일이 될 것입니다.
Transient 데이터 구조는 Clojure의 모델에 통합된 것이면서도 여러분이 Clojure에 기대하고 있는 스레드 안전성도 제공하며, 동시에 앞에서 언급한 최적화 문제의 해결책이기도 합니다.

### How they work

>
Transient data structures are always created from an existing persistent Clojure data structure.
As of Clojure 1.1.0, vectors, hash-maps, and hash-sets are supported.
Note that not all Clojure data structures can support this feature, but most will.
Lists will not, as there is no benefit to be had.

Transient 데이터 구조는 항상 Clojure의 persistent 데이터 구조를 통해 생성됩니다.
Clojure 1.1.0 이후부터는 vector, hash-map, hash-set도 해당됩니다.

단, Clojure의 모든 데이터 구조가 이 기능을 지원하지는 않는다는 점에 유의해야 합니다(그러나 대부분은 지원합니다).
한편 List는 이 기능에 의한 이익이 없기 때문에 지원하지 않습니다.

>
You obtain a transient 'copy' of a data structure by calling **transient**.
This creates a new transient data structure that is a copy of the source, and has the same performance characteristics.
In fact, it mostly is the source data structure, and highlights the first feature of transients - creating one is O(1).
It shares structure with its source, just as persistent copies share structure.

`transient`를 호출하면 데이터 구조의 일시적인(transient) 복사본을 얻을 수 있습니다.
이 방법은 소스 데이터 구조의 일시적인 복사본을 생성하는 것이며, 성능 특성도 같습니다.
실제로는 이렇게 생성된 사본은 대부분 원본 데이터 구조 자체로 이루어져 있으며, 이것이 transient의 첫 번째 특징이라 할 수 있습니다.
하나를 생성할 때에는 `O(1)`인 것입니다.
persistent 사본들끼리 구조를 공유하는 것과 같이, transient 사본들도 구조를 공유합니다.

>
The second feature of transients is that creating one does not modify the source, and the source cannot be modified via use of the transient.
Your source data is immutable and persistent as always.

transient의 두 번째 특징은, transient의 생성이 원본을 수정하지 않으며 transient를 사용해 원본을 수정할 수도 없다는 것입니다.
원본 데이터는 언제나 immutable하며 persistent합니다.

>
Transients support the read-only interface of the source, i.e. you can call `nth`, `get`, `count` and fn-call a transient vector, just like a persistent vector.

또한 Transient는 원본의 read-only 인터페이스도 지원합니다.
persistent vector와 똑같이, transient vector에 대한 `nth`, `get`, `count`, `fn-call` 같은 것들이 이에 해당됩니다.

>
Transients **do not** support the persistent interface of the source data structure. `assoc`, `conj` etc will all throw exceptions, because transients are not persistent. Thus you cannot accidentally leak a transient into a context requiring a persistent.

Transient는 원본 데이터 구조의 persistent 인터페이스를 지원하지 않습니다.
`assoc`, `conj` 등을 사용하면 예외를 던지게 됩니다.
transient는 persistent가 아니기 때문입니다.
그러므로 persistent 속성이 요구되는 상황에서 transient를 잘못 사용하는 실수가 방지됩니다.

>
Transients support a parallel set of 'changing' operations, with similar names followed by `!` - `assoc!`, `conj!` etc.
These do the same things as their persistent counterparts except the return values are themselves transient.
Note in particular that transients are not designed to be bashed in-place.
You must capture and use the return value in the next call.
In this way, they support the same code structure as the functional persistent code they replace.
As the example will show, this will allow you to easily enhance the performance of a piece of code without structural change.

Transient는 이름 뒤에 `!`를 붙이는 종류의 'changing' 연산들의 병렬 집합을 지원합니다.
`assoc!`, `conj!` 등이 이에 해당됩니다.
이들은 그에 대응하는 persistent 연산들과 동일한 기능을 수행하지만, 리턴값은 자신들을 transient로 변환한 것들입니다.
transient는 데이터 구조 내의 같은 자리에서 값을 바꾸는 용도로는 디자인되지 않았다는 점에 유의하세요.
다음에 호출하게 됐을 때 리턴값을 확실히 받아서 사용해야 합니다.
이런 연산들은 이런 기법으로, replace하는 함수형 persistent 코드들과 동일한 코드 구조를 지원합니다.
이런 방법을 사용하면 다음에 볼 에제에서와 같이, 구조적인 변경 없이 쉽게 코드의 성능을 향상시킬 수 있습니다.

>
When you are finished building up your results, you can create a persistent data structure by calling `persistent!` on the transient.
This operation is also O(1).
Subsequent to calling `persistent!`, the transient should not be used, and all operations will throw exceptions.
This will be true also for any aliases you might have created.

작업 결과 생성이 완료되면, transient에서 `persistent!`를 호출해 persistent 데이터 구조로 생성할 수 있습니다.
이 연산도 `O(1)` 입니다.

`persistent!`를 호출한 후에는 transient는 사용할 수 없으며, 모든 연산은 예외를 던집니다.
이는 여러분이 생성한 모든 알리아스에 대해서도 해당합니다.

### Example

>
Here’s a very typical example, some code that builds up a vector for return, all 'changes' being local to the function. Note how the transient-using version has exactly the same structure, just:
>
- Calling `transient` on the source vector
- Using `conj!` instead of `conj`
- Calling `persistent!` on return

다음은 리턴값으로 vector를 만드는 몇몇 코드들에서 발생하는 모든 '변경'이 함수 내에서만 유효하다는 것을 보여주는 일반적인 에제입니다.
transient를 사용한 코드가 정확히 똑같은 구조를 갖는다는 것에 주목하세요.

- 원본 vector에 대해 `transient` 호출
- `conj` 대신 `conj!` 사용
- 리턴값으로 `persistent!` 호출

```clojure
(defn vrange [n]
  (loop [i 0 v []]
    (if (< i n)
      (recur (inc i) (conj v i))
      v)))

(defn vrange2 [n]
  (loop [i 0 v (transient [])]
    (if (< i n)
      (recur (inc i) (conj! v i))
      (persistent! v))))

;; benchmarked (Java 1.8, Clojure 1.7)
(def v (vrange 1000000))    ;; 73.7 ms
(def v2 (vrange2 1000000))  ;; 19.7 ms
```

>
Oh, yeah, **transients are fast!**

우와 transient는 빠르군요!

### Concurrent use

>
That’s all there is to using transients, but they have another important constraint: Transients require thread isolation.
Because each result of a transient operation shares (mutable) structure with the previous, it is an error if more than one thread manipulates a transient at once.
Use of a particular transient instance should be controlled either by using it in an single-threaded scope, or in a framework that enforces this.

지금까지 transient를 사용에 필요한 모든 것을 알아보았습니다만, 더 살펴봐야 하는 중요한 제약사항이 있습니다.
Transient가 thread 격리가 필요하다는 것입니다.
transient 연산의 각각의 결과는 이전 작업과 (mutable한) 구조를 공유하므로, 둘 이상의 스레드가 한번에 작업을 처리하면 에러의 원인이 됩니다.
특정 transient 인스턴스의 사용은 싱글 스레드 스코프 내, 또는 이런 특성이 반영된 프레임워크에서 제어해야 합니다.

>
In Clojure 1.6 and earlier, transients would detect any (read or write) use from a thread other than the one that created them and throw an exception.
That check was removed in 1.7 to allow for more flexible use in frameworks like core.async go blocks that enforce the single-threaded constraint via other means.

Clojure 1.6 이전 버전에서 transient는 자신을 생성한 스레드가 아닌 다른 스레드에서 (읽기/쓰기) 사용하는 것을 감지하여 예외를 던집니다.
이렇게 예외를 던지는 방식은 1.7 버전부터 제거되었는데, 다른 방법을 통해 단일 스레드 제약 조건을 적용하는 core.async go 블록과 같은 프레임워크에서 유연하게 사용할 수 있게 하기 위함입니다.

### Summary

>
Transients provide a high-performance optimization of functional data-structure-building code that works with Clojure’s data structures and provides critical safety guarantees.
>
- Single-path use
- O(1) creation from persistent data structures
- Shares structure with persistent source
- O(1) creation of persistent data structure when editing session finished
- Same code structure as functional version
- Capture return value, use for next call
- Don’t bash in place
- Not persistent, so you can’t hang onto interim values or alias
- Can’t use after returning a persistent version
- Fast

transient는 안전성 보장이 필요한 Clojure의 자료구조에 필요한 함수형 데이터 구조 생성 코드에 대한 높은 성능 최적화를 제공합니다.

- 단일 경로 사용
- persistent 데이터 구조를 사용해 `O(1)`으로 생성할 수 있음
- persistent 원본과 구조를 공유
- 수정 세션이 끝날 때 persistent 데이터 구조를 `O(1)`으로 생성할 수 있음
- 함수형 버전과 같은 코드 구조
- 리턴 값을 캡처하여 다음 호출에 사용
- 값을 바꿔치기 하지 않음
- persistent하지 않으므로, 중간 값을 잡아두거나 별도의 이름으로 사용할 수 없음
- persistent 버전으로 리턴한 이후에는 사용할 수 없음
- 빠름

>
Transient persistent vectors, hash-maps, and hash-sets were added in Clojure 1.1.

