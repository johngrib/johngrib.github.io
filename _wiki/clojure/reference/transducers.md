---
layout  : wiki
title   : Transducers
summary : 번역 중인 문서
date    : 2022-06-21 23:35:47 +0900
updated : 2022-06-28 23:11:34 +0900
tag     : clojure 번역
resource: 99/1ACF65-65E9-4A66-BA0A-8872F42DCBA1
toc     : true
public  : true
parent  : [[/clojure/reference]]
latex   : false
---
* TOC
{:toc}

- 원문: [Transducers]( https://clojure.org/reference/transducers )

## Transducers : Clojure Reference 문서 번역

>
Transducers are composable algorithmic transformations.
They are independent from the context of their input and output sources and specify only the essence of the transformation in terms of an individual element.
Because transducers are decoupled from input or output sources, they can be used in many different processes - collections, streams, channels, observables, etc.
Transducers compose directly, without awareness of input or creation of intermediate aggregates.

Transducer는 조합 가능한 알고리즘 변환기입니다.
Transducer는 입력이나 출력 소스의 컨텍스트에서 독립적이며, 개별 원소 측면에서의 변환에 대한 본질만을 지정합니다.
왜냐하면 transducer는 입력이나 출력 소스와 분리(decoupled)되어 있기 때문에 collection, stream, channel, observable과 같은 다양한 프로세스에서 사용할 수 있습니다.
transducer는 직접 구성하기 때문에 입력이나 중간 집계물(intermediate aggregates)의 생성에 의지하지 않습니다.

### Terminology

>
A _reducing function_ is the kind of function you’d pass to **reduce** - it is a function that takes an accumulated result and a new input and returns a new accumulated result:

감소 함수(reducing function)는 우리가 **reduce**에 전달하곤 하는 함수의 일종입니다.
이런 함수는 누적된 결과(accumulated result)랑 새로운 입력을 받은 다음, 새로 만든 누적된 결과를 리턴하죠.

> ```clojure
> ;; reducing function signature
> whatever, input -> whatever
> ```
>
A _transducer_ (sometimes referred to as xform or xf) is a transformation from one reducing function to another:

transducer는 감소 함수가 다른 감소 함수로 변환되는 것입니다(transducer는 xform, xf 라 부르기도 합니다).

```clojure
;; transducer signature
(whatever, input -> whatever) -> (whatever, input -> whatever)
```

### Defining Transformations With Transducers

>
Most sequence functions included in Clojure have an arity that produces a transducer.
This arity omits the input collection; the inputs will be supplied by the process applying the transducer.
_Note: this reduced arity is not currying or partial application._
>
For example:
>
> ```clojure
> (filter odd?) ;; returns a transducer that filters odd
> (map inc)     ;; returns a mapping transducer for incrementing
> (take 5)      ;; returns a transducer that will take the first 5 values
> ```

Clojure에 포함된 대부분의 시퀀스 함수들은 transducer를 생성하는 arity를 갖고 있습니다.
이 arity에는 입력 collection이 생략되어 있습니다.
왜냐하면 입력은 transducer를 적용하는 프로세스가 제공할 것이기 때문입니다.

참고: 이런 collection이 빠져 있는 arity는 currying이나 partial 적용과는 다른 것입니다.

예를 들어 봅시다.

```clojure
(filter odd?) ;; 홀수를 필터링하는 transducer를 리턴합니다
(map inc)     ;; 수를 증가시키는 mapping transducer를 리턴합니다.
(take 5)      ;; 첫 다섯 값을 취하는 transducer를 리턴합니다.
```

>
Transducers compose with ordinary function composition.
A transducer performs its operation before deciding whether and how many times to call the transducer it wraps.
The recommended way to compose transducers is with the existing **comp** function:

transducer는 일반적인 함수들의 조합으로 이루어집니다.
transducer는 자신이 감싸는 transducer를 몇 번이나 호출할지를 결정하기 전에 먼저 자신의 작업을 수행합니다.
transducer를 만들 때 권장하는 방법은 **comp** 함수를 사용하는 것입니다.

> ```clojure
> (def xf
>   (comp
>     (filter odd?)
>     (map inc)
>     (take 5)))
> ```

<span/>

>
The transducer xf is a transformation stack that will be applied by a process to a series of input elements.
Each function in the stack is performed _before_ the operation it wraps.
Composition of the transformer runs right-to-left but builds a transformation stack that runs left-to-right (filtering happens before mapping in this example).

xf 라는 transducer는 일련의 입력 원소들에 적용되는 변환 스택이라 할 수 있습니다.
스택을 이루고 있는 각각의 함수들은 하나의 스택으로 포장되기 전에 먼저 처리됩니다.
변환기는 오른쪽에서 왼쪽으로 조합되지만, 실행은 왼쪽에서 오른쪽으로 진행됩니다.
(이 예제에서는 filtering을 먼저 하고 그 다음에 mapping이 이뤄지게 됩니다.

>
As a mnemonic, remember that the ordering of transducer functions in **comp** is the same order as sequence transformations in **\-\>\>**. The transformation above is equivalent to the sequence transformation:

**comp**에 포함된 transducer 함수들의 작동 순서가 `->>` 매크로의 시퀀스 변환과 순서가 같다는 것을 기억해 두세요.
즉, 위의 예제 속 변환은 아래의 시퀀스 변환과 같습니다.

> ```clojure
> (->> coll
>      (filter odd?)
>      (map inc)
>      (take 5))
> ```

<span/>

>
The following functions produce a transducer when the input collection is omitted: [map][map] [cat][cat] [mapcat][mapcat] [filter][filter] [remove][remove] [take][take] [take-while][take-while] [take-nth][take-nth] [drop][drop] [drop-while][drop-while] [replace][replace] [partition-by][partition-by] [partition-all][partition-all] [keep][keep] [keep-indexed][keep-indexed] [map-indexed][map-indexed] [distinct][distinct] [interpose][interpose] [dedupe][dedupe] [random-sample][random-sample]

이 함수들은 입력 collection이 생략된다면 transducer를 생성하게 됩니다: [map][map] [cat][cat] [mapcat][mapcat] [filter][filter] [remove][remove] [take][take] [take-while][take-while] [take-nth][take-nth] [drop][drop] [drop-while][drop-while] [replace][replace] [partition-by][partition-by] [partition-all][partition-all] [keep][keep] [keep-indexed][keep-indexed] [map-indexed][map-indexed] [distinct][distinct] [interpose][interpose] [dedupe][dedupe] [random-sample][random-sample]

#### Using Transducers

>
Transducers can be used in many contexts (see below for how to create new ones).

transduce는 다양한 상황에서 사용할 수 있습니다(새로운 transducer를 만드는 방법은 아래를 참고하세요).

#### transduce

>
One of the most common ways to apply transducers is with the [transduce][transduce] function, which is analogous to the standard reduce function:

transducer를 적용하는 가장 일반적인 방법은 표준 reduce 함수와 비슷한 [transduce][transduce] 함수를 쓰는 것입니다.

> ```clojure
> (transduce xform f coll)
> (transduce xform f init coll)
> ```

>
**transduce** will immediately (not lazily) reduce over **coll** with the transducer **xform** applied to the reducing function **f**, using init as the initial value if supplied or (f) otherwise.
f supplies the knowledge of how to accumulate the result, which occurs in the (potentially stateful) context of the reduce.

위의 코드는 주어진 컬렉션 `coll`에 transducer인 `xform`을 적용한 결과를 함수 `f`로 reducing합니다.
reducing은 lazy하지 않게 실행됩니다.
초기값 `init`을 제공할 수도 있습니다.

이 때, `f`의 역할은 reduce가 돌아가는 컨텍스트에서 결과들을 누적하는 방법을 제공하는 것입니다.

> ```clojure
> (def xf (comp (filter odd?) (map inc)))
> (transduce xf + (range 5))
> ;; => 6
> (transduce xf + 100 (range 5))
> ;; => 106
> ```
>
The composed xf transducer will be invoked left-to-right with a final call to the reducing function f.
In the last example, input values will be filtered, then incremented, and finally summed.

함수들을 조합해 만든 `xf` transducer는 왼쪽에서 오른쪽으로 실행되며, 최종 단계에서 reducing 함수 f를 호출하게 됩니다.
즉, 마지막 예제에서 입력값은 `filter` 되고 `inc`된 다음, 마지막으로 `+`를 통해 합계에 적용됩니다.

![Nested transformations]( ./xf.png )

#### eduction

>
To capture the process of applying a transducer to a coll, use the [eduction][eduction] function.
It takes any number of xforms and a final coll and returns a reducible/iterable application of the transducer to the items in coll.
These applications will be performed each time reduce/iterator is called.

[eduction][eduction] 함수를 사용하면 transducer를 coll에 적용하는 과정을 캡쳐할 수 있습니다.
이 함수는 xform 여러개와 coll을 받아서, coll의 각 아이템에 대해 reducible/iterable한 transducer를 리턴합니다.

이런 transducer는 reduce/iterator 함수가 호출될 때마다 매번 실행됩니다.

```clojure
(def iter (eduction xf (range 5)))
(reduce + 0 iter)
;; => 6
```

#### into

>
To apply a transducer to an input collection and construct a new output collection, use [into][into] (which efficiently uses reduce and transients if possible):

컬렉션에 transducer를 적용해서 새로운 컬렉션을 생성하려면 [into][into] 함수를 사용하세요.
(가능한 경우에 한해 reduce와 transient를 써서 작업을 최적화해줍니다.)

```clojure
(into [] xf (range 1000))
```

#### sequence

>
To create a sequence from the application of a transducer to an input collection, use [sequence][sequence]:

컬렉션에 transducer를 적용해서 새로운 sequence를 생성하려면 [sequence][sequence] 함수를 사용하세요.

```clojure
(sequence xf (range 1000))
```

>
The resulting sequence elements are incrementally computed.
These sequences will consume input incrementally as needed and fully realize intermediate operations.
This behavior differs from the equivalent operations on lazy sequences.

결과 sequence의 원소들은 점진적으로 계산됩니다.
이러한 sequence들은 필요할 때마다 입력을 점진적으로 소비하며, 중간 작업을 완전히 realize합니다.
이 동작은 lazy sequence의 동작과 같지 않습니다.

>
**역주**
>
위의 예제에서 소개한 transducer인 `(def xf (comp (filter odd?) (map inc)))`을 사용하는 예제를 더 추가합니다.
>
- `into`를 쓰면 컬렉션으로 수집해 리턴합니다. (lazy하지 않고, eager하게 작업합니다.)
    ```clojure
    (into [] xf [11 12 13 14 15 16])
    ;; => [12 14 16]
    ```
- `sequence`를 쓰면 lazy sequence를 리턴합니다.
    ```clojure
    (take 3
          (sequence xf [1 2 3 4 5 6 7 8 9]))
    ;; => (2 4 6)
    ```
- transduce를 쓰면 transducer를 통해 변환한 모든 원소를 reducing 한 결과를 리턴합니다.
    ```clojure
    (transduce xf
               (fn
                 ([p1] (str p1))
                 ([p1 p2] (str p1 "," p2)))
               "start"
               [1 2 3 4 5 6 7 8]) ;; => "start,2,4,6,8"
    ```
    - 두 번째 인자로 주어진 함수는 arity-1 과 arity-2 가 있습니다. arity-2 만 있다면 `reduce`처럼 보일텐데, 그렇게 하면 `transduce`가 예외를 던집니다. 둘 다 있어야 하는 것입니다. 따라서 이걸 일일이 만들기 귀찮으면 `completing` 함수를 쓸 수도 있습니다. 이렇게 하면 좀 더 `reduce` 처럼 보이는 코드가 됩니다.
        ```clojure
        (transduce xf
                   (completing #(str %1 "," %2))
                   "start"
                   [1 2 3 4 5 6 7 8]) ;; => "start,2,4,6,8"
        ```
>
{:style="background-color: #ecf1e8;"}

### Creating Transducers

>
Transducers have the following shape (custom code in "…"):

transducer는 다음과 같은 형태를 갖습니다.

```clojure
(fn [rf]
  (fn ([] ...)
      ([result] ...)
      ([result input] ...)))
```

>
Many of the core sequence functions (like map, filter, etc) take operation-specific arguments (a predicate, function, count, etc) and return a transducer of this shape closing over those arguments.
In some cases, like **cat**, the core function _is_ a transducer function and does not take an **rf**.

map, filter 같은 대다수의 core sequence 함수들은 연산을 명시하는 인자(predicate, function, count, 등등)를 받아서 그 인자들을 담고 있는 transducer를 리턴합니다.
다만 core 함수 `cat` 같은 경우는 transducer 함수이지만 `rf`를 인자로 받지 않습니다.

>
The inner function is defined with 3 arities used for different purposes:
>
- **Init** (arity 0) - should call the init arity on the nested transform **rf**, which will eventually call out to the transducing process.
- **Step** (arity 2) - this is a standard reduction function but it is expected to call the **rf** step arity 0 or more times as appropriate in the transducer. For example, filter will choose (based on the predicate) whether to call **rf** or not. map will always call it exactly once. cat may call it many times depending on the inputs.
- **Completion** (arity 1) - some processes will not end, but for those that do (like **transduce**), the completion arity is used to produce a final value and/or flush state. This arity must call the **rf** completion arity exactly once.

안쪽의 함수는 서로 다른 용도를 갖는 3 가지 arity들을 정의합니다.

- **Init arity** (인자 0개) - 중첩된 변환 **rf**에 대해 init arity를 호출해야 합니다. 이를 통해 transduce를 수행하는 프로세스를 호출하게 됩니다.
- **Step arity** (인자 2개) - step arity는 표준적인 reduce 함수이지만, transducer안에서 돌아갈 때는 **rf** step arity를 0회 이상 호출할 수 있습니다. 예를 들어 `filter`는 predicate를 통해 **rf**를 호출할지 말지 선택하게 됩니다. `map`은 **rf**를 정확히 딱 한 번 호출하며, `cat`은 입력에 따라 여러번 호출할 수도 있습니다.
- **Completion arity** (인자 1개) - completion arity는 프로세스가 종료되는 경우(예를 들어 `transduce`)에 한해 최종 결과값을 생산하고 상태를 flush하는 데 사용됩니다. 이 arity는 **rf** completion arity를 딱 한번만 호출해야 합니다.

>
An example use of **completion** is **partition-all**, which must flush any remaining elements at the end of the input.
The [completing][completing] function can be used to convert a reducing function to a transducing function by adding a default completion arity.

**partition-all**이 **completion**의 사용 예라 할 수 있습니다.
**partition-all**은 입력 끝에 남아있는 원소를 반드시 flush해야 하기 때문입니다.
[completing][completing] 함수를 사용하면 디폴트 completion arity 하나를 추가해서 reducing 함수를 transducing 함수로 변환할 수 있습니다.

#### Early termination

>
Clojure has a mechanism for specifying early termination of a reduce:
>
> - [reduced][reduced] - takes a value and returns a _reduced_ value indicating reduction should stop
> - [reduced?][reduced?] - returns true if the value was created with _reduced_
> - [deref][deref] or @ can be used to retrieve the value inside a _reduced_
>
A process that uses transducers must check for and stop when the step function returns a reduced value (more on that in Creating Transducible Processes).
Additionally, a transducer step function that uses a nested reduce must check for and convey reduced values when they are encountered.
(See the implementation of cat for an example.)

Clojure는 reduce를 진행 도중에 중단할 수 있는 메커니즘을 제공합니다.

- [reduced][reduced] - 값을 하나 받고, reduce를 조기 중단하면서 리턴하게 될 값을 하나 리턴합니다.
- [reduced?][reduced?] - 값이 reduced로 만들어졌다면 true를 리턴합니다.
- [deref][deref] 또는 @를 사용하면 _reduced_안에 있는 값을 가져올 수 있습니다.

transducer를 사용하는 프로세스는 step 함수가 reduced 값을 리턴하는지를 반드시 체크해야 하며, reduced 값이 리턴될 때 중단되어야 합니다(자세한 내용은 이 문서의 마지막 절인 Creating Transducible Processes를 참고하세요).
또한, 중첩된 reduce를 사용하는 transducer step 함수라면 reduced 값이 발생했을 때 반드시 이를 확인하고 전달도 해야 합니다(예제로 `cat`의 구현을 참고하세요).


#### Transducers with reduction state

>
Some transducers (such as **take**, **partition-all**, etc) require state during the reduction process.
This state is created each time the transducible process applies the transducer.
For example, consider the dedupe transducer that collapses a series of duplicate values into a single value.
This transducer must remember the previous value to determine whether the current value should be passed on:

**take**나 **partition-all** 같은 몇몇 transducer들은 reduce 프로세스가 진행되는 동안 필수적으로 "상태"를 사용합니다.
이런 "상태"는 변환 프로세스에 transducer를 적용할 때마다 생성됩니다.
예를 들어, 연속적으로 나타나는 중복값이 있을 때 하나만 남겨놓는 dedupe transducer를 생각해 봅시다.
이 transducer는 현재 보고 있는 값을 보존할지 말 지를 판별해야 하므로 반드시 이전 값을 기억해야만 합니다.

```clojure
(defn dedupe []
  (fn [xf]
    (let [prev (volatile! ::none)]
      (fn
        ([] (xf))
        ([result] (xf result))
        ([result input]
          (let [prior @prev]
            (vreset! prev input)
              (if (= prior input)
                result
                (xf result input))))))))
```

>
**역주**: 이 dedupe 함수를 다음과 같이 사용할 수 있다.
>
> ```clojure
> (sequence (dedupe) [1 1 1 2 2 3 3 3])
> ;; => (1 2 3)
>
> (transduce (dedupe) + [1 1 1 2 2 3 3 3])
> ;; => 6
> ```
{:style="background-color: #ecf1e8;"}

>
In dedupe, **prev** is a stateful container that stores the previous value during the reduction.
The prev value is a volatile for performance, but it could also be an atom.
The prev value will not be initialized until the transducing process starts (in a call to **transduce** for example).
The stateful interactions are therefore contained within the context of the transducible process.
>
In the completion step, a transducer with reduction state should flush state prior to calling the nested transformer’s completion function, unless it has previously seen a reduced value from the nested step in which case pending state should be discarded.

위의 dedupe 함수에서 `prev`는 reduce 과정에서 이전 값을 보관하는 상태 저장 컨테이너라 할 수 있습니다.
prev 값은 성능을 위해 volatile로 선언되며, atom으로 선언될 수도 있습니다.
prev 값은 변환 프로세스가 시작되기 전까지는 초기화되지 않습니다.
즉 상태와 관련된 작업은 변환 프로세스 컨텍스트 안쪽에서만 수행됩니다.

reduction 상태를 갖는 transducer가 completion step이 됐을 때, 아직 reduced 값을 보지 못한 중첩된 변환기가 있다면 completion 함수를 호출하기 전에 상태를 flush해야 합니다. 이렇게 되면 pending 상태는 폐기해야 합니다.

### Creating Transducible Processes

>
Transducers are designed to be used in many kinds of processes.
A transducible process is defined as a succession of steps where each step ingests an input.
The source of the inputs is specific to each process (from a collection, an iterator, a stream, etc).
Similarly, the process must choose what to do with the outputs produced by each step.
>
If you have a new context for applying transducers, there are a few general rules to be aware of:
>
- If a step function returns a reduced value, the transducible process must not supply any more inputs to the step function. The reduced value must be unwrapped with deref before completion.
- A completing process must call the completion operation on the final accumulated value exactly once.
- A transducing process must encapsulate references to the function returned by invoking a transducer - these may be stateful and unsafe for use across threads.

transducer는 다양한 작업에 사용할 수 있도록 설계됐습니다.
transducer를 사용하는 작업은 단계별로 입력을 수집하는 각각의 단계로 정의됩니다.
입력 소스는 각 프로세스에 따라 달라집니다(collection, iterator, stream, 등).
이와 비슷하게, 프로세스는 각 단계에서 생성된 결과물로 무엇을 할 것인지를 반드시 선택해야 합니다.

transducer를 새로운 컨텍스트에 적용해보고 싶다면, 다음과 같은 일반적인 규칙들을 알아둬야 합니다.

- step 함수가 reduced 값을 리턴한다면, transducing process는 step 함수에 입력을 추가로 제공하면 안됩니다. reduced 값은 completion이 실행되기 전에 반드시 deref로 래핑을 해제해야 합니다.
- completing process는 최종 accumulated 값에 completion 작업을 정확히 딱 한 번만 호출해야 합니다.
- transducing process는 transducer를 호출했을 때 리턴된 함수 레퍼런스들을 반드시 캡슐화해야 합니다 - 이런 레퍼런스들은 상태를 토대로 하므로 스레드 안전하지 않습니다.

[cat]: https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/cat
[completing]: https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/completing
[dedupe]: https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/dedupe
[deref]: https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/deref
[distinct]: https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/distinct
[drop-while]: https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/drop-while
[drop]: https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/drop
[eduction]: https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/eduction
[filter]: https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/filter
[interpose]: https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/interpose
[into]: https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/into
[keep-indexed]: https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/keep-indexed
[keep]: https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/keep
[map-indexed]: https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/map-indexed
[map]: https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/map
[mapcat]: https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/mapcat
[partition-all]: https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/partition-all
[partition-by]: https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/partition-by
[random-sample]: https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/random-sample
[reduced?]: https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/reduced?
[reduced]: https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/reduced
[remove]: https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/remove
[replace]: https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/replace
[sequence]: https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/sequence
[take-nth]: https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/take-nth
[take-while]: https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/take-while
[take]: https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/take
[transduce]: https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/transduce

