---
layout  : wiki
title   : Transducers
summary : 번역 중인 문서
date    : 2022-06-21 23:35:47 +0900
updated : 2022-06-22 00:07:50 +0900
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
#### Using Transducers
#### transduce
#### eduction
#### into
#### sequence
### Creating Transducers
#### Early termination
#### Transducers with reduction state
### Creating Transducible Processes

