---
layout  : wiki
title   : Clojure Higher Order Functions
summary : 
date    : 2021-12-11 17:59:46 +0900
updated : 2021-12-11 21:14:26 +0900
tag     : clojure 번역
resource: 84/5A9F4F-AF91-4C63-AC0E-5DD520CA663F
toc     : true
public  : true
parent  : [[/clojure/guide]]
latex   : false
---
* TOC
{:toc}

## Higher Order Functions: Clojure guide 문서 번역

원문: [Higher Order Functions]( https://clojure.org/guides/higher_order_functions )

### First Class Functions

1급 함수

>
In functional programming, functions are first class citizens.
This means functions can be treated as values.
They can be assigned as values, passed into functions, and returned from functions.

- 함수형 프로그래밍에서, 함수는 1급 시민입니다.
- 1급 시민이란, 함수를 값처럼 취급할 수 있다는 것을 의미합니다.
- 함수를 값으로 할당할 수 있고, 함수에 함수를 인자로 넘겨줄 수 있고, 함수가 함수를 리턴할 수도 있습니다.

>
It’s common to see function definitions in Clojure using `defn` like `(defn foo …)`.
However, this is just syntactic sugar for `(def foo (fn …))` `fn` returns a function object.
`defn` returns a var which points to a function object.

- Clojure에서 `defn`을 사용해 `(defn foo …)`처럼 함수를 정의하는 것은 일반적인 일입니다.
- 그러나 사실 이 방법은 `(def foo (fn …))`에 대한 문법 설탕이라 할 수 있습니다.
    - `fn`은 함수 객체를 리턴하죠.
- `defn`은 함수 객체의 포인터 var를 리턴합니다.

### Higher Order Functions

고차 함수

> A higher order function is a function that either:
>
> 1. Takes one or more functions as arguments
> 2. Returns a function as its result
>
> This is an important concept in functional programming in any language.

고차 함수는 다음 특징들 중 적어도 하나를 갖습니다.

1. 하나 이상의 함수를 인자로 받는다.
2. 실행 결과로 함수를 리턴합니다.

이는 어떤 언어가 되었건 간에, 함수형 프로그래밍에서 중요한 개념입니다.

>
Higher order functions allow us to compose functions.
This means we can write small functions and combine them to create larger functions.
Like putting a bunch of small LEGO bricks together to build a house.
>
Let’s move away from theory a bit and look at an example.

- 고차 함수를 사용하면 함수를 조합(compose)할 수 있습니다.
- 이는 우리가 작은 함수들을 만들면, 그것들을 결합해서 더 큰 함수를 만들 수 있음을 의미합니다.
- 마치 작은 레고 블록들을 모아서 집을 지을 수 있는 것과 비슷합니다.

이제 이론 이야기는 그만 이야기하고, 에제를 살펴봅시다.

#### Functions as Arguments

함수를 인자로 제공하기

>
Let’s look at two functions

다음 두 함수를 봅시다.

```clojure
(defn double-+
    [a b]
    (* 2 (+ a b)))
```
```clojure
(defn double-*
    [a b]
    (* 2 (* a b)))
```

>
These functions share a common pattern.
They only differ in name and the function used in the computation of `a` and `b`.
In general, the pattern looks like this.

- 이 함수들은 같은 패턴으로 작성됐다는 공통점이 있습니다.
- 차이점이라면 함수 이름이랑, `a`와 `b`를 계산하는 데 사용하는 함수 정도입니다.
- 이 패턴을 일반화한다고 생각하면 다음과 같이 보일 것입니다.

```clojure
(defn double-<f>
    [a b]
    (* 2 (f a b)))
```

>
We can generalize our `double-` function by passing `f` in as an argument.

이 `double-` 함수에 `f`를 인자로 줘서 일반화를 해봅시다.

```clojure
(defn double-op
    [f a b]
    (* 2 (f a b)))
```

>
We can use this to express the concept of doubling the result of an operation rather than having to write functions that perform specific doubled operations individually.

이 방법 덕분에 연산의 구체적인 내용을 작성하지 않아도 어떤 연산(`f`)의 결과를 2배로 만들어주는 개념을 표현할 수 있습니다.


### Function Literals

함수 리터럴

>
An anonymous function is a function without a name.
In Clojure these can be defined in two ways, `fn` and the literal `#(…)`.
Creating a function with `defn` immediately binds it to a name, `fn` just creates a function.
>
Let’s have an example with a few music bands:

- 익명 함수는 이름이 없는 함수입니다.
- Clojure에서 익명함수는 두 가지 방법으로 만들 수 있습니다.
    - `fn`을 쓰는 방법
    - `#(…)`를 쓰는 방법
- `defn`으로 함수를 만들면 함수에 이름이 바인딩되지만, `fn`은 그냥 함수만 만들고 끝납니다.

음악 밴드를 예제로 삼아봅시다.

```clojure
(def bands [
    {:name "Brown Beaters"   :genre :rock}
    {:name "Sunday Sunshine" :genre :blues}
    {:name "Foolish Beaters" :genre :rock}
    {:name "Monday Blues"    :genre :blues}
    {:name "Friday Fewer"    :genre :blues}
    {:name "Saturday Stars"  :genre :jazz}
    {:name "Sunday Brunch"   :genre :jazz}
])
```

>
We want to retrieve only rock bands.
This is a one-off operation, we’re not going to use it anywhere else in our code.
We can save ourselves some keystrokes by using an anonymous function.

- rock 밴드만 추출하고 싶다고 합시다.
- 이 작업은 일회성이라서, 다른 곳 어디에도 굳이 코드를 남겨두지 않으려 합니다.
- 그래서 귀찮게 타이핑을 많이 하지 않아도 되는 익명함수를 사용할 것입니다.

```clojure
(def rock-bands
    (filter
        (fn [band] (= :rock (:genre band)))
        bands))
```

>
Even more concisely, using the function literal, we can define `rock-bands` like so.

함수 리터럴을 사용하면 이 `rock-bands` 함수를 더 간결하게 표현할 수도 있습니다.

```clojure
(def rock-bands (filter #(= :rock (:genre %)) bands))
```

>
The function literal supports multiple arguments via `%`, `%n`, and `%&`.

함수 리터럴에서는 `%`, `%n`, `%&` 기호를 사용해 여러 개의 인자를 표현할 수 있습니다.

```clojure
#(println %1 %2 %3)
```

>
If you’re writing an anonymous function, the literal syntax is nice because it’s so compact.
However, beyond a few arguments, the syntax can become difficult to read.
In that case, using `fn` may be more appropriate.

- 리터럴 문법은 간결하기 때문에, 익명 함수 작성에 좋습니다.
- 하지만 인자의 수가 많아지면 신택스가 읽기 어려워집니다.
- 이런 경우에는 그냥 `fn`을 쓰는 것이 더 적절합니다.

#### Functions Returning Functions and Closures

함수를 리턴하는 함수와 클로저(closure)

>
Our first function will be called `adder`.
It will take a number, `x`, as its only argument and return a function.
The function returned by `adder` will also take a single number, `a`, as its argument and return `x + a`.

- 이번에 만들 함수는 `adder`(덧셈기)입니다.
- `adder`는 숫자 `x`라는 인자 딱 하나를 받아서, 함수 하나를 리턴합니다.
- 그렇게 `adder`에게서 리턴된 함수는 숫자 `a`를 받아서, `x + a`를 리턴합니다.

```clojure
(defn adder [x]
  (fn [a] (+ x a)))

(def add-five (adder 5))

(add-five 100)
;; => 105
```

>
The returned function form `adder` is a closure.
This means, it can access all of the variables that were in scope when the function was created.
`add-five` has access to `x` even though it is outside of the `adder` function definition.

- `adder`에서 리턴된 함수는 클로저(closure)입니다.
- 이는 해당 함수가 생성되었을 때의 스코프에 있었던 모든 변수에 접근할 수 있다는것을 의미합니다.
- `add-five`는 `adder` 함수 정의의 바깥에 있지만, `x`에 대해 접근할 수 있는 것입니다.

#### Filter

>
Filtering is a common operation in computer programming. Take this set of animals

필터링은 컴퓨터 프로그래밍에서 일반적인 작업 중 하나입니다.
동물 집합을 예로 들어 봅시다.

```clojure
(def pets [
    {:name "Fluffykins" :type :cat}
    {:name "Sparky" :type :dog}
    {:name "Tibby" :type :dog}
    {:name "Al" :type :fish}
    {:name "Victor" :type :bear}
])
```

>
We want to filter out the non-dog animals because we’re writing enterprise grade software.
First, let’s look at a normal for loop.

기업용 소프트웨어를 만들고 있는 우리는 이 집합에서 강아지가 아닌 동물들을 필터링하고자 합니다.

먼저 평범한 for 루프를 봅시다.

```clojure
(defn loop-dogs [pets]
    (loop [pets pets
           dogs []]
        (if (first pets)
            (recur (rest pets)
                   (if (= :dog (:type (first pets)))
                       (conj dogs (first pets))
                       dogs))
            dogs)))
```

>
This code works fine, but it’s bulky and confusing.
We can simplify this using `filter`, a higher order function.

이 코드는 잘 작동하지만, 꽤 길고 복잡합니다.
이 코드를 고차 함수인 `filter`를 사용해 단순하게 만들어 봅시다.

```clojure
(defn filter-dogs [pets]
    (filter #(= :dog (:type %)) pets))
```

>
The solution using `filter` is much clearer and allows us to show intent rather than just give commands.
We can break this into even smaller pieces by breaking the filtering function out into a separate `var`.

`filter`를 사용한 방법은 명령들을 나열하는 것보다 더 명확하며 의도를 드러내기 좋습니다.

그리고 이 코드를 별도의 `var`로 분리해서 더 작은 조각들로 나누는 것도 가능합니다.

```clojure
(defn dog? [pet] (= :dog (:type pet)))

(defn filter-dogs [pets] (filter dog? pets))
```

>
Original author: Michael Zavarella

## 참고문헌

- [Higher Order Functions]( https://clojure.org/guides/higher_order_functions )

