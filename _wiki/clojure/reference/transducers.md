---
layout  : wiki
title   : Transducers
summary : 번역 중인 문서
date    : 2022-06-21 23:35:47 +0900
updated : 2022-06-26 23:07:45 +0900
tag     : clojure 번역
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
### Creating Transducers
#### Early termination
#### Transducers with reduction state
### Creating Transducible Processes

[cat]: https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/cat
[dedupe]: https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/dedupe
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
[remove]: https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/remove
[replace]: https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/replace
[take-nth]: https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/take-nth
[take-while]: https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/take-while
[take]: https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/take
[transduce]: https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/transduce

