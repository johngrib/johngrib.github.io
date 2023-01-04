---
layout  : wiki
title   : Threading Macros Guide
summary : 스레딩 매크로 가이드
date    : 2021-12-10 22:47:25 +0900
updated : 2022-05-31 22:51:37 +0900
tag     : clojure
resource: BD/0330A1-8F04-4800-B384-A9E6AC6DF2D8
toc     : true
public  : true
parent  : [[/clojure/guide]]
latex   : false
giscus  : auto
---
* TOC
{:toc}

## Threading Macros Guide 문서 번역

[Threading Macros Guide]( https://clojure.org/guides/threading_macros )

>
Threading macros, also known as arrow macros, convert nested function calls into a linear flow of function calls, improving readability.

화살표 매크로라고도 부르는 threading macro는 중첩된 함수 호출을 줄줄이 늘어놓은 함수 호출로 표현해 읽기 좋게 해줍니다.

### The thread-first macro (->)

thread-first 매크로(`->`)

>
In idiomatic Clojure, pure functions transform immutable data structures into a desired output format.
Consider a function that applies two transformations to a map:

- Clojure의 관용적 표현에서, 순수 함수는 immutable한 자료 구조를 우리에게 필요한 출력 형식으로 변환합니다.
- 다음과 같이 map 자료에 두 가지의 변환을 적용하는 함수를 생각해 봅시다.

```clojure
(defn transform [person]
   (update (assoc person :hair-color :gray) :age inc))

(transform {:name "Socrates", :age 39})
;; => {:name "Socrates", :age 40, :hair-color :gray}
```

**역주**: `transform` 함수는 주어진 `person`에 `:hair-color`로 `:gray`를 추가하고, `:age`를 1 증가시킵니다.

>
`transform` is an example of a common pattern: it takes a value and applies multiple transformations with each step in the pipeline taking the result of the previous step as its input.
It is often possible to improve code of this type by rewriting it to use the thread-first macro `->`:

- `transform`은 일반적인 예시라 할 수 있습니다.
- 이 방식은 주어진 값에 파이프라인의 각 단계를 따라 이전 단계의 결과를 입력으로 사용해 여러 변환 작업을 적용하는 것입니다.
- 이런 코드는 thread-first 매크로 `->`를 활용해 개선할 수 있습니다.

```clojure
(defn transform* [person]
   (-> person
      (assoc :hair-color :gray)
      (update :age inc)))
```

>
Taking an initial value as its first argument, [`->`]( https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/-%3E ) threads it through one or more expressions.
>
_Note: The word "thread" in this context (meaning passing a value through a pipeline of functions) is unrelated to the concept of concurrent threads of execution._

- `->`는 처음에 있는 값을 첫 번째 인자로 사용해서, 하나 이상의 표현식에 줄줄이(thread) 적용해 줍니다.
    - _참고: 이 맥락에서 "thread"는 동시성의 실행 스레드 개념과는 관계가 없는 단어입니다._

>
Starting with the second form, the macro inserts the first value as its first argument.
This is repeated at each subsequent step with the result of the previous computation inserted as the first argument of the next form.
What looks like a function call with two arguments is in fact a call with three arguments, as the threaded value is inserted just after the function name.
It may be helpful to mark the insertion point with three commas for illustration:

- `->` 매크로는 가장 먼저 첫 번째 값을 두 번째 표현식의 첫 번째 인자로 집어넣습니다.
- 이런 작업은 각 단계마다 반복되며, 계속 이어서 다음 표현식에 이전 계산의 결과를 첫 번째 인자로 집어넣습니다.
- 그래서 이 예제에서 이어지는 각 함수 호출을 보면 인자가 2개인 것처럼 보입니다.
    - 역주: `(assoc :hair-color :gray)`와 `(update :age inc)`를 보면 인자가 2개인 것처럼 보임
- 그러나 사실은 인자가 3개인 함수 호출이라 할 수 있습니다.
    - 이어받은 값이 함수 이름 바로 뒤에 삽입되기 때문입니다.
- 이해를 돕기 위해 이어받은 값이 삽입되는 위치를 콤마 3개로 표시해 보겠습니다.

```clojure
(defn transform* [person]
   (-> person
      (assoc ,,, :hair-color :gray)
      (update ,,, :age inc)))
```

>
Though not often seen in practice, this visual aid is valid Clojure syntax, as commas are whitespace in Clojure.

이런 식의 코드가 흔한 것은 아니지만, Clojure에서 콤마는 공백으로 인식되므로 이런 표시는 valid한 Clojure 문법이 맞습니다.

>
Semantically, `transform*` is equivalent to `transform`: the arrow macro expands at compile time into the original code.
In each case, the return value of the function is the result of the last computation, the call to `update`.
The re-written function reads like a description of the transformation: "Take a person, increase their age, give them gray hair, and return the result".
Of course in the context of immutable values, no actual mutation takes place.
Instead, the function simply returns a new value with updated attributes.

- `transform*`함수의 코드는 `transform`함수의 코드와 의미상으로 똑같습니다.
    - 왜냐하면 화살표 매크로는 컴파일 타임에 진짜 코드로 확장되기 때문입니다.
- 두 함수 모두 리턴값은 마지막으로 호출한 `update`의 결과값입니다.
- 화살표 매크로를 써서 다시 작성한 함수는, 마치 변환 과정에 대한 설명문처럼 읽을 수 있습니다.
    - "person을 받아서, age를 증가시키고, gray hair를 주고, 결과를 리턴하세요"
- 물론 이 작업 전체는 immutable 값의 맥락에 있기 때문에 실제로는 값에 변경이 일어나지는 않습니다.
    - 그 대신, 함수는 업데이트된 속성들을 가진 새로운 값을 리턴하게 됩니다.

>
Syntactically, the threading macro also allows the reader to read the functions in left to right order of application, rather than reading from the innermost expression out.

- threading macro를 사용하면 코드를 읽는 사람이 괄호 표현식의 안쪽부터 바깥쪽으로 읽지 않아도 됩니다.
- 즉, 왼쪽에서 오른쪽으로 함수를 읽어나가면 됩니다.

### thread-last (-\>\>) and thread-as (as->) macros

thread-last 매크로(`->>`)와 thread-as 매크로(`as->`)

>
The `->` macro follows a purely syntactic transformation rule: for each expression, insert the threaded value between the function name and the first argument.
Note that the threading expressions are function calls of the form `(f arg1 arg2 …)`.
A bare symbol or keyword without parentheses is interpreted as a simple function invocation with a single argument.
This allows for a succinct chain of unary functions:

- `->` 매크로는 syntactic 변환 규칙을 단순하게 지킵니다.
    - 각각의 표현식에 대해 이어받은 값을 함수 이름과 첫 번째 인자 사이에 삽입합니다.
- 즉, 스레딩 표현식은 `(f arg1 arg2 …)` 형태의 함수 호출입니다.
- 괄호 없이 포함된 symbol이나 keyword는 한 개의 인자만 받는 단순한 함수로 해석됩니다.
- 이 규칙으로 인해 단항 함수의 단순한 연쇄가 가능해집니다.

```clojure
(-> person :hair-color name clojure.string/upper-case)

;; equivalent to
;; 위의 코드는 아래와 똑같습니다.

(-> person (:hair-color) (name) (clojure.string/upper-case))
```

>
However, `->` is not universally applicable, as we do not always want to insert the threaded argument in the initial position.
Consider a function that computes the sum of the squares of all odd positive integers below ten:

- 하지만 `->`는 언제나 사용할 수 있는 것은 아닙니다.
- 이어받은 인자를 항상 첫 번째 인자로 넣을 수는 없기 때문입니다.
- 10 미만의 모든 양수인 홀수를 제곱해서 총합을 구하는 함수 하나를 생각해 봅시다.

```clojure
(defn calculate []
   (reduce + (map #(* % %) (filter odd? (range 10)))))
```

>
Like `transform`, `calculate` is a pipeline of transformations, but unlike the former, the threaded value appears in each function call in the final position in the argument list.
Instead of the thread-first macro we need to use the thread-last macro [`->>`]( https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/-%3E%3E ) instead:

- `transform` 함수처럼 `calculate` 함수도 변환 파이프라인이라 할 수 있습니다.
- 하지만 `transform`과는 달리, `calculate`는 이어받은 인자가 매번 마지막 인자로 들어가고 있습니다.
- 이런 경우에는 thread-first macro(`->`) 대신에 thread-last macro(`->>`)를 사용해야 합니다.

```clojure
(defn calculate* []
   (->> (range 10)
        (filter odd? ,,,)
        (map #(* % %) ,,,)
        (reduce + ,,,)))
```

>
Again, though usually omitted, three commas mark the place where the argument will be inserted.
As you can see, in forms threaded using `->>` the threaded value is inserted at the end rather than the beginning of the argument list.

- 다시 강조하자면 예제의 콤마 3개는 인자가 삽입될 위치를 표시하기 위해 쓴 것입니다.
- 즉, `->>`로 늘어선 형태에서는 이어받은 값이 첫 번째 인자가 아니라 마지막 인자로 들어가게 됩니다.

>
Thread-first and thread-last are used in different circumstances.
Which one is appropriate depends on the signature of the transformation functions.
Ultimately you’ll need to consult the documentation of the functions used, but there are a few rules of thumb:

- thread-first와 thread-last는 서로 다른 상황에 사용하게 됩니다.
- 둘 중 어느쪽이 더 적절한지는 변환에 사용하는 함수들의 시그니처에 따라 달라집니다.
- 결국 사용하는 각 함수들의 문서를 참고해야 하지만, 경험에서 비롯된 몇 가지 규칙들이 있습니다.

>
- By convention, core functions that operate on sequences expect the sequence as their last argument. Accordingly, pipelines containing `map`, `filter`, `remove`, `reduce`, `into`, etc usually call for the `->>` macro.
- Core functions that operate on data structures, on the other hand, expect the value they work on as their first argument. These include [`assoc`][assoc], [`update`][update], [`dissoc`][dissoc], [`get`][get] and their [`-in`][dash-in] variants. Pipelines that transform maps using these functions often require the `->` macro.
- When calling methods through [Java interop][java-interop], the Java object is passed in as the first argument. In such cases, `->` is useful, for example, to check a string for a prefix:
  ```clojure
  (-> a-string clojure.string/lower-case (.startsWith "prefix"))
  ```
Note also the more specialized interop macros [`..`][dot-dot] and [`doto`][doto].

- 관례적으로 core 함수들은 시퀀스를 마지막 인자로 받습니다.
    - 그러므로 `map`, `filter`, `remove`, `reduce`, `into` 등으로 파이프라인을 구성하려면 `->>` 매크로를 주로 씁니다.
- 반면에, 자료 구조에서 작동하는 core 함수들은 작업 대상 값을 첫번째 인자로 받습니다.
    - `assoc`, `update`, `dissoc`, `get`과 이 함수들의 `-in` 변종 함수들을 사용해 map을 변환하는 파이프라인은 `->` 매크로를 주로 씁니다.
- Java interop를 통해 메서드를 호출할 때에는 Java 객체가 첫번째 인자로 들어갑니다.
    - 이 경우에는 `->` 매크로를 주로 사용합니다.
    - 다음은 String prefix를 체크하는 예제입니다.
      ```clojure
      (-> a-string clojure.string/lower-case (.startsWith "prefix"))
      ```
        - 이 작업에 특화된 매크로는 `..`과 `doto`가 있다는 것도 기억해 두세요.

>
Finally, there are cases where neither `->` nor `->>` are applicable.
A pipeline may consist of function calls with varying insertion points.
In these cases, you’ll need to use `as->`, the more flexible alternative.
`as->` expects two fixed arguments and a variable number of expressions.
As with `->`, the first argument is a value to be threaded through the following forms.
The second argument is the name of a binding.
In each of the subsequent forms, the bound name can be used for the prior expression’s result.
This allows a value to thread into any argument position, not just first or last.

- 마지막으로 `->`와 `->>`를 둘 다 적용할 수 없는 경우가 있습니다.
- 바로 삽입 위치가 다양한 함수들의 호출로 파이프라인이 구성되는 경우입니다.
- 이런 경우에는 좀 더 유연한 대안인 `as->`를 사용하면 됩니다.
- `as->`는 두 개의 인자를 고정으로 받고, 여러 개의 표현식을 사용할 수 있습니다.
- `->`와 마찬가지로, 이어지는 표현식으로 첫번째 인자는 전달되게 됩니다.
- 두 번째 인자는 바인딩할 이름입니다.
- 각각의 이어지는 표현식에서, 이전 표현식의 결과에 이름을 바인딩할 수가 있습니다.
- 이 방법을 통해 이어받은 값을, 꼭 첫번째나 마지막이 아닌 어떤 순서의 인자에도 집어넣을 수 있습니다.

```clojure
(as-> [:foo :bar] v
  (map name v)
  (first v)
  (.substring v 1))

;; => "oo"
```

역주: `[:foo :bar]`에 `v`라는 이름을 바인딩해서 `(map name v)`처럼 마지막 인자로도 집어넣고, `(.substring v 1)`처럼 첫번째 인자로도 집어넣고 있음.

### some->, some-\>\> and cond->

>
Two of Clojure’s more specialized threading macros, [`some->`][some-v] and [`some->>`][some-vv], are used most commonly when interfacing with Java methods.
`some->` resembles `->` in that it threads a value through a number of expressions.
However, it also short-circuits execution when an expression evaluates as `nil` at any point in the chain.
One common problem with arrow macros in the context of [Java interop][java-interop] is that Java methods do not expect to be passed `nil` (`null`).
One way to avoid a `NullPointerException` in these cases is to add an explicit guard:

- Clojure에는 `some->`과 `some->>`라는 좀 더 전문화된 스레딩 매크로가 또 있습니다.
- 이들은 Java 메소드와 인터페이싱할 때 주로 사용됩니다.
- `some->`는 여러 표현식을 통해 값을 이어준다는 점에서 `->`와 비슷합니다.
- 그러나, `some->`은 연쇄 과정에서 `nil` 평가결과가 발생하면 short-circuit 으로 작동합니다.
- Java interop 맥락에서 화살표 매크로를 사용할 때 발생하는 일반적인 문제는 바로 Java 메소드가 `nil`(`null`)이 전달될 거라고 예상하지 않는다는 것입니다.
- 그래서 `NullPointerException`을 피하려면 명시적으로 방어 코드를 넣어줘야 합니다.

```clojure
(when-let [counter (:counter a-map)]
  (inc (Long/parseLong counter)))
```

>
`some->` achieves the same effect more succinctly:

`some->`은 같은 작업을 더 단순하게 할 수 있습니다.

```clojure
(some-> a-map :counter Long/parseLong inc)
```

>
If `a-map` lacks the key `:counter`, the entire expression will evaluate to `nil` rather than raising an exception.
In fact, this behavior is so useful that it is common to see `some->` used when threading is not required:

- 만약 `a-map`에 `:counter`라는 키가 존재하지 않는다면, 이 표현식은 예외를 발생시키는 것이 아니라 `nil`로 평가됩니다.
- 사실 이런 동작으로 인해 `some->`을 통한 스레딩은 정말 필요하지 않은 경우에도 흔히 쓰이는 유용한 방법입니다.

```clojure
(some-> (compute) Long/parseLong)

;; equivalent to

(when-let [a-str (compute)]
  (Long/parseLong a-str))
```

>
Like `->`, the macro [`cond->`][cond-v] takes an initial value, but unlike the former, it interprets its argument list as a series of `test, expr` pairs.
`cond->` threads a value through the expressions but skips those with failing tests.
For each pair, `test` is evaluated.
If the result is truthy, the expression is evaluated with the threaded value inserted as its first argument; otherwise evaluation proceeds with the next `test, expr` pair.
Note that unlike its relatives, [`some->`][some-v] or [`cond`][cond], `cond->` never short-circuits evaluation, even if a test evaluates to `false` or `nil`:

- `cond->` 매크로는 `->`처럼 초기값을 받긴 하지만, `->`와는 달리 인자 목록을 `test, expr`의 형태로 인식합니다.
- `cond->`는 값을 표현식을 통해 이어주기는 하지만, 중간에 테스트가 실패하게 되면 skip합니다.
    - 각각의 `test, expr` 쌍에서 테스트 평가 대상은 `test`입니다.
- 만약 평가 결과가 참이면, 첫 번째 인자로 삽입된 이어받은 값으로 표현식이 평가됩니다.
    - 참이 아니라면, 다음 단계의 `test, expr`로 넘어가서 평가가 진행됩니다.
- `cond->`가 `some->`, `cond`와 다르다는 것을 주의하세요.
    - `cond->`는 테스트 결과가 `false`나 `nil`이 나오더라도 절대로 short-circuit 평가를 하지 않습니다.

```clojure
(defn describe-number [n]
  (cond-> []
    (odd? n) (conj "odd")
    (even? n) (conj "even")
    (zero? n) (conj "zero")
    (pos? n) (conj "positive")))

(describe-number 3) ;; => ["odd" "positive"]
(describe-number 4) ;; => ["even" "positive"]
```

>
`cond->>` inserts the threaded value as the last argument of each form but works analogously otherwise.

- `cond->>`는 각각의 표현식에 이어받은 값을 마지막 인자로 입력하지만, 그 외의 사항들은 다른 것들과 비슷합니다.

>
Original author: Paulus Esterhazy


## 참고문헌

- [Threading Macros Guide]( https://clojure.org/guides/threading_macros )

[assoc]: https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/assoc
[update]: https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/update
[dissoc]: https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/dissoc
[get]: https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/get
[dash-in]: https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/assoc-in
[java-interop]: https://clojure.org/reference/java_interop
[dot-dot]: https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/..
[doto]: https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/doto
[some-v]: https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/some-%3E
[some-vv]: https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/some-%3E%3E
[cond-v]: https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/cond-%3E
[cond]: https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/cond

