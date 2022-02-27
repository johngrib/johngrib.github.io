---
layout  : wiki
title   : Destructuring in Clojure
summary : 번역중인 문서
date    : 2022-02-27 00:36:51 +0900
updated : 2022-02-27 21:08:31 +0900
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

>
Clojure destructuring is broken up into two categories, sequential destructuring and associative destructuring.
Sequential destructuring represents a sequential data structure as a Clojure vector within a let binding.
>
This type of destructuring can be used on any kind of data structure that can be traversed in linear time, including lists, vectors, and anything that can produce a sequence.

Clojure의 구조분해는 순서 있는 자료에 대한 구조분해(sequential destructuring)와, 키가 할당된 자료에 대한 구조분해(associative destructuring) 이렇게 두 종류로 나뉩니다.
순서 있는 자료에 대한 구조분해는 `let` 바인딩 안쪽에서 Clojure vector를 사용해 표현합니다.

이러한 타입의 구조분해는 list나 vector 같은 sequence를 생성할 수 있는 선형 시간 내에 순회할 수 있는 어떤 종류의 자료구조에도 적용할 수 있습니다.

```clojure
(def my-vector [1 2 3])
(def my-list '(1 2 3))
(def my-string "abc")

;= It should come as no surprise that this will print out 1 2 3
; 1 2 3 이 출력되는 것을 보고 놀라지 마세요!
(let [[x y z] my-vector]
  (println x y z))
;= 1 2 3

;= We can also use a similar technique to destructure a list
; list를 구조분해 하는데에도 같은 방식을 사용할 수 있습니다.
(let [[x y z] my-list]
  (println x y z))
;= 1 2 3

;= For strings, the elements are destructured by character.
; string에 사용하면 각 문자 하나하나에 대해 구조분해가 작동합니다.
(let [[x y z] my-string]
  (println x y z)
  (map type [x y z]))
;= a b c
;= (java.lang.Character java.lang.Character java.lang.Character)
```

>
The key to sequential destructuring is that you bind the values one-by-one to the symbols in the vector.
For instance the vector `[x y z]` will match each element one-by-one with the list `'(1 2 3)`.
>
In some cases, the collection you are destructuring isn’t the exact same size as the destructuring bindings.
If the vector is too small, the extra symbols will be bound to nil.

sequential 구조분해의 핵심은 vector의 값을 하나 하나 symbol에 바인딩한다는 것입니다.
예를 들어 `'(1 2 3)`이라는 list에 대해 `[x y z]`라는 vector를 사용해 구조분해를 하면 각 원소가 하나씩 짝을 짓게 됩니다.

어떤 경우에는, 구조분해하려는 컬렉션이 구조분해용 바인딩과 사이즈가 같지 않을 수도 있습니다.
만약 vector가 너무 작다면, 짝을 짓지 못한 나머지 symbol에는 `nil`이 바인딩됩니다.

```clojure
(def small-list '(1 2 3))
(let [[a b c d e f g] small-list]
  (println a b c d e f g))
;= 1 2 3 nil nil nil nil
```

>
On the other hand, if the collection is too large, the extra values are simply ignored.

한편 컬렉션이 너무 큰 경우에는 남는 값들은 자연히 무시됩니다.

```clojure
(def large-list '(1 2 3 4 5 6 7 8 9 10))
(let [[a b c] large-list]
  (println a b c))
;= 1 2 3
```

>
Destructuring gives you total control over the elements that you choose to bind (or not) and how you bind them.
>
Many times, you don’t need access to every element in a collection, only certain ones.

구조분해를 사용하면 각 원소에 대한 바인딩을 할 지 안 할지를 완벽하게 제어할 수 있습니다.

어지간한 경우에는 컬렉션의 모든 요소에 엑세스할 필요가 없습니다. 몇 가지만 하면 되죠.

```clojure
(def names ["Michael" "Amber" "Aaron" "Nick" "Earl" "Joe"])
```

>
Say you want to print the first element on one line and the remainder on another line.

위의 vector에 들어있는 첫 번째 원소를 한 줄로 출력하고, 나머지는 그 다음 줄에 출력한다고 합시다.

```clojure
(let [[item1 item2 item3 item4 item5 item6] names]
  (println item1)
  (println item2 item3 item4 item5 item6))
;= Michael
;= Amber Aaron Nick Earl Joe
```

>
This binding works but even using destructuring it’s pretty clunky.
Instead we can use `&` to combine the tail elements into a sequence.

이 구조분해 바인딩은 잘 동작하지만, 좀 투박해서 아쉬운 점이 있습니다.
이렇게 하는 대신 `&`을 쓰면 리스트의 나머지 꼬리 원소들을 시퀀스로 합칠 수 있습니다.

```clojure
(let [[item1 & remaining] names]
  (println item1)
  (apply println remaining))
;= Michael
;= Amber Aaron Nick Earl Joe
```

>
You can ignore bindings that you don’t intend on using by binding them to any symbol of your choosing.

만약 필요없는 바인딩이 있다면, 적당한 symbol을 주고 무시해버리면 그만입니다.

```clojure
(let [[item1 _ item3 _ item5 _] names]
  (println "Odd names:" item1 item3 item5))
;= Odd names: Michael Aaron Earl
```

>
The convention for this is to use an underscore like above.
>
You can use `:as all` to bind the entire vector to the symbol `all`.

보통 이렇게 무시하는 경우에는 `_`를 사용하는 것이 관례입니다.

한편 `:as all`과 같이 `:as`를 쓰면 vector 전체를 `all` 이라는 symbol에 바인딩할 수 있습니다.

```clojure
(let [[item1 :as all] names]
  (println "The first name from" all "is" item1))
;= The first name from [Michael Amber Aaron Nick Earl Joe] is Michael
```

>
Let’s stop for a bit and look a little further into the types of `:as` and `&`.

여기서 잠시 멈춰서서 `:as`와 `&`에 대해 살펴보도록 합시다.

```clojure
(def numbers [1 2 3 4 5])
(let [[x & remaining :as all] numbers]
  (apply prn [remaining all]))
;= (2 3 4 5) [1 2 3 4 5]
```

>
Here `remaining` is bound to a sequence containing the remaining elements of the `numbers` vector while `all` has been bound to the original `vector`.
What happens when we destructure a string instead?

여기에서 `remaining`은 `numbers` vector의 나머지 원소들을 가지는 시퀀스를 바인딩합니다.
그리고 `all`은 주어진 vector 자체를 바인딩합니다.
만약 vector가 아니라 이와 같은 방식으로 string을 구조분해하면 어떻게 될까요?

```clojure
(def word "Clojure")
(let [[x & remaining :as all] word]
  (apply prn [x remaining all]))
;= \C (\l \o \j \u \r \e) "Clojure"
```

>
Here `all` is bound to the original structure (String, vector, list, whatever it may be) and `x` is bound to the character `\C`, and `remaining` is the remaining list of characters.
>
You can combine any or all of these techniques at the same time at your discretion.

`all`은 주어진 자료구조 자체(String, vector, list 등 뭐든지 될 수 있습니다)에 바인딩되고,
`x`는 문자 `\C`에 바인딩되며,
`remaining`은 `\C` 이후의 나머지 문자들의 리스트에 바인딩됩니다.

이러한 구조분해 기법들을 필요에 따라 조합해서 재량껏 사용하도록 합시다.

```clojure
(def fruits ["apple" "orange" "strawberry" "peach" "pear" "lemon"])
(let [[item1 _ item3 & remaining :as all-fruits] fruits]
  (println "The first and third fruits are" item1 "and" item3)
  (println "These were taken from" all-fruits)
  (println "The fruits after them are" remaining))
;= The first and third fruits are apple and strawberry
;= These were taken from [apple orange strawberry peach pear lemon]
;= The fruits after them are (peach pear lemon)
```

>
Destructuring can also be nested to get access to arbitrary levels of sequential structure.
Let’s go back to our vector from the very beginning, `my-line`.

복잡한 구조를 갖는 중첩된 sequential 자료구조에도 구조분해를 사용할 수 있습니다.
처음에 예로 들었던 `my-line`을 다시 살펴보겠습니다.

```clojure
(def my-line [[5 10] [10 20]])
```

>
This vector is comprised of nested vectors that we can access directly.

이 vector는 직접적으로 엑세스할 수 있는 중첩된 vector로 이루어져 있습니다.

```clojure
(let [[[x1 y1][x2 y2]] my-line]
  (println "Line from (" x1 "," y1 ") to (" x2 ", " y2 ")"))
;= "Line from ( 5 , 10 ) to ( 10 , 20 )"
```

>
When you have nested vectors, you can use `:as` or `&` at any level as well.

이렇게 중첩된 vector가 있다 하더라도 `:as`나 `&`을 깊이와 관계 없이 똑같이 사용할 수 있습니다.

```clojure
(let [[[a b :as group1] [c d :as group2]] my-line]
  (println a b group1)
  (println c d group2))
;= 5 10 [5 10]
;= 10 20 [10 20]
```

### Associative Destructuring

#### Keyword arguments

#### Namespaced keywords

### Where to destructure

### Macros

## 참고문헌

- [Destructuring in Clojure]( https://clojure.org/guides/destructuring )


