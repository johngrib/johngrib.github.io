---
layout  : wiki
title   : Destructuring in Clojure
summary : 번역중인 문서
date    : 2022-02-27 00:36:51 +0900
updated : 2022-02-27 00:59:25 +0900
tag     : clojure
toc     : true
public  : true
parent  : [[/clojure/guide]]
latex   : false
---
* TOC
{:toc}

## Destructuring in Clojure 문서 번역

원문: [Destructuring in Clojure]( https://clojure.org/guides/destructuring )

### What is Destructuring?

>
Destructuring is a way to concisely bind names to the values inside a data structure.
Destructuring allows us to write more concise and readable code.
>
Consider the following example of extracting and naming values in a vector.

구조분해는 주어진 데이터 구조에 포함된 값들에 간편하게 이름을 붙여주는 기법입니다.
구조분해를 사용하면 읽기 쉬우며 더 간결한 코드를 작성하는 데에 도움이 됩니다.

다음은 vector에 포함된 값을 뽑아내어 하나 하나 이름을 붙여주는 예제입니다.

```clojure
(def my-line [[5 10] [10 20]])

(let [p1 (first my-line)
      p2 (second my-line)
      x1 (first p1)
      y1 (second p1)
      x2 (first p2)
      y2 (second p2)]
  (println "Line from (" x1 "," y1 ") to (" x2 ", " y2 ")"))
;= "Line from ( 5 , 10 ) to ( 10 , 20 )"
```

>
This is perfectly valid, but the code extracting and naming the values in the vector obscures our intent.
Destructuring allows us to more concisely extract and name important parts of complex data structures to make our code cleaner.

이 코드는 완벽하게 작동하지만, vector에서 이렇게 값을 일일이 뽑아내어 하나 하나 이름을 붙여주는 코드가 복잡해서 의도가 가려질 수 있습니다.
구조분해를 사용하면 복잡한 데이터 구조에서 중요한 부분을 쉽게 뽑아 이름을 붙일 수 있으므로, 더 간결한 코드를 만들 수 있습니다.

```clojure
;= Using the same vector as above
(let [[p1 p2] my-line
      [x1 y1] p1
      [x2 y2] p2]
 (println "Line from (" x1 "," y1 ") to (" x2 ", " y2 ")"))
;= "Line from ( 5 , 10 ) to ( 10 , 20 )"
```

>
Rather than explicitly binding each variable, we describe the bindings based on their sequential order.
That’s a pretty weird statement, "describe the bindings," so let’s look at it again.

각각의 변수를 명시적으로 바인딩하지 않고, vector에 들어가 있는 순서에 따라 바인딩을 해 주었습니다.
이 과정을 자세히 살펴 봅시다.

>
We have a data structure `my-line` that looks like this, `\[[5 10] [10 20]]`.
In our destructuring form we will create a vector containing two elements, `p1` and `p2`, each of which are vectors themselves.
This will bind the vector `[5 10]` to the symbol `p1` and the vector `[10 20]` to the symbol `p2`.
Since we want to work with the elements of `p1` and `p2` rather than the structures themselves, we destructure `p1` and `p2` within the same let statement.
The vector `p1` looks like this, `[5 10]`, so to destructure it, we create a vector containing two elements, `x1` and `y1`.
This binds `5` to the symbol `x1` and `10` to the symbol `y1`.
The same is repeated for `p2` binding `10` to `x2` and `20` to `y2`.
At this point, we now have everything we need to work with our data.

- 주어진 데이터 구조 `my-line`은 이런 모양을 갖고 있습니다. `\[[5 10] [10 20]]`
- 이 데이터 구조를 구조분해하기 위해 우리는 vector 타입의 2개의 원소(`p1`과 `p2`)를 갖는 vector `[p1 p2]`를 만듭니다.
- 이렇게 하면 vector `[5 10]`이 `p1`에 바인딩되고, vector `[10 20]`가 `p2`에 바인딩됩니다.
    - 이렇게 하는 이유는 주어진 구조 자체를 다루는 게 아니라 `p1`과 `p2`라는 원소를 다루고 싶기 때문입니다.
    - 따라서 우리는 `let` 구문 안쪽에서 자료의 구조를 분해해서 `p1`과 `p2`를 얻어냈습니다.
- vector `p1`은 `[5 10]` 인데, 이것도 분해하기 위해 2개의 원소(`x1`과 `y1`)를 갖는 vector를 만듭니다.
    - 이로 인해 `5`는 `x1`에 바인딩되고, `10`은 `y1`에 바인딩됩니다.
- 똑같은 방식으로 `p2`의 `10`은 `x2`에 바인딩되고, `20`은 `y2`에 바인딩됩니다.

이제 이 데이터 구조에서 우리가 필요했던 것들을 모두 얻어내게 됐습니다.

### Sequential Destructuring

### Associative Destructuring

#### Keyword arguments

#### Namespaced keywords

### Where to destructure

### Macros

## 참고문헌

- [Destructuring in Clojure]( https://clojure.org/guides/destructuring )


