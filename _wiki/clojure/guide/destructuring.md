---
layout  : wiki
title   : Destructuring in Clojure
summary : 클로저의 구조분해
date    : 2022-02-27 00:36:51 +0900
updated : 2022-03-01 00:27:36 +0900
tag     : clojure
resource: 5E/2AC796-8B14-4571-B2DF-6671479CB46C
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

>
Associative destructuring is similar to sequential destructuring, but applied instead to associative (key-value) structures (including maps, records, vectors, etc).
The associative bindings are concerned with concisely extracting values of the map by key.
>
Let’s first consider an example that extracts values from a map without destructuring:

연관 구조분해는 sequential 구조분해와 비슷하지만, 리스트가 아니라 key와 value가 있는 연관 구조(map, record, vector 등)에 적용하다는 특징이 있습니다.
연관 바인딩을 사용하면 key를 통해 map에 담겨있는 값들을 간결하게 추출할 수 있습니다.

먼저 구조분해를 사용하지 않고 map에서 값을 뽑아내는 예제를 살펴봅시다.

```clojure
(def client {:name "Super Co."
             :location "Philadelphia"
             :description "The worldwide leader in plastic tableware."})

(let [name (:name client)
      location (:location client)
      description (:description client)]
  (println name location "-" description))
;= Super Co. Philadelphia - The worldwide leader in plastic tableware.
```

>
Note that each line of the let binding is essentially the same - it extracts a value from the map by the name of the key, then binds it to a local with the same name.
>
Below is a first example of doing the same thing with associative destructuring:

`let` 바인딩의 한 줄 한 줄을 봅시다.
이들은 모두 본질적으로 똑같은 일을 하고 있는데,
key 이름으로 map에서 값을 추출해서 같은 이름으로 로컬 바인딩을 하고 있습니다.

아래의 코드를 봅시다. 연관 구조분해를 사용하는 첫 번째 에제라 할 수 있습니다.

```clojure
(let [{name :name
       location :location
       description :description} client]
  (println name location "-" description))
;= Super Co. Philadelphia - The worldwide leader in plastic tableware.
```

>
The destructuring form is now a map rather than a vector, and instead of a symbol on the left side of the let, we have a map.
The keys of the map are the symbols we want to bind in the let.
The values of the destructuring map are the keys we will look up in the associative value.
Here they are keywords (the most common case), but they could be any key value - numbers, strings, symbols, etc.
>
Similar to sequential destructuring, if you try to bind a key that is not present in the map, the binding value will be nil.

구조분해의 모양을 보면 앞에서와 달리 vector가 아니라 map 형태를 갖고 있습니다.
그리고 `let` 바인딩 왼쪽에 symbol이 있는 게 아니라 map이 있게 되었습니다.
이 때, map의 각 key들은 우리가 `let`을 통해 바인딩하려는 symbol들입니다.
그리고 구조분해하는 map의 각 값들은, 구조분해되는 map의 key들에 해당됩니다.
여기에서는 keyword를 사용하고 있는데(보통 이렇게 씁니다),
map에서 key로 사용하는 값이라면 number, string, symbol 등 그 외의 아무거나 사용할 수 있습니다.

시퀀셜 구조분해와 똑같이, map에 없는 값을 바인딩하면 `nil`을 값으로 갖게 됩니다.

```clojure
(let [{category :category} client]
  (println category))
;= nil
```

>
Associative destructuring, however, also allows you to supply a default value if the key is not present in the associative value with the `:or` key.

그러나 연관 구조분해를 사용하는 경우에는, `:or`을 사용해서 key가 map에 없을 때도 기본값을 지정할 수 있습니다.

```clojure
(let [{category :category, :or {category "Category not found"}} client]
  (println category))
;= Category not found
```

>
The value for `:or` is a map where the bound symbol (here `category`) is bound to the expression `"Category not found"`.
When category is not found in `client`, it is instead found in the `:or` map and bound to that value instead.

`:or`의 값으로 주어진 것은 바인딩할 symbol을 갖고 있는 map이며(여기에서는 `category`), `"Category not found"`라는 값을 마련하고 있습니다.
만약 `client` map에서 `category`를 찾지 못한다면, `:or` map에 들어있는 `category` 값을 찾아서 바인딩하게 됩니다.

>
In sequential destructuring, you generally bind unneeded values with an `_`.
Since associative destructuring doesn’t require traversing the entire structure, you can simply omit any keys you don’t plan on using from the destructuring form.
>
If you need access to the entire map, you can use the `:as` key to bind the entire incoming value, just as in sequential destructuring.

시퀀셜 구조분해에서는 필요없는 값들을 `_`로 바인딩했었습니다.
연관 구조분해에서는 주어진 자료구조 전체를 탐색하지 않기 때문에 사용하지 않을 key는 그냥 무시하면 됩니다.

만약 map 전체에 엑세스할 필요가 있다면, 시퀀셜 구조분해에서 했던 것과 똑같이 `:as`를 사용해서 전체 값을 바인딩할 수 있습니다.

```clojure
(let [{name :name :as all} client]
  (println "The name from" all "is" name))
;= The name from {:name Super Co., :location Philadelphia, :description The world wide leader in plastic table-ware.} is Super Co.
```

>
The `:as` and `:or` keywords can be combined in a single destructuring.

`:as`와 `:or` 키워드를 함께 사용하는 것도 가능합니다.

```clojure
(def my-map {:a "A" :b "B" :c 3 :d 4})
(let [{a :a, x :x, :or {x "Not found!"}, :as all} my-map]
  (println "I got" a "from" all)
  (println "Where is x?" x))
;= I got A from {:a "A" :b "B" :c 3 :d 4}
;= Where is x? Not found!
```

>
You might have noticed that our original example still contains redundant information (the local binding name and the key name) in the associative destructuring form.
The `:keys` key can be used to further remove the duplication:

이 예제를 잘 살펴보면, 연관 구조분해를 하면서도 중복된 이름들이 보일 것입니다(`a :a` `x :x` 처럼 로컬 바인딩하는 이름과 key 이름이 반복되는 모습).
`:keys`를 사용하면 이런 종류의 중복을 제거할 수 있습니다.

```clojure
(let [{:keys [name location description]} client]
  (println name location "-" description))
;= Super Co. Philadelphia - The worldwide leader in plastic tableware.
```

>
This example is exactly the same as the prior version - it binds `name` to `(:name client)`, `location` to `(:location client)`, and `description` to `(:description client)`.

이 예제는 앞의 예제와 똑같습니다.

- `name`은 `(:name client)`에 바인딩.
- `location`은 `(:location client)`에 바인딩.
- `description`은 `(:description client)`에 바인딩.

>
The `:keys` key is for associative values with keyword keys, but there are also `:strs` and `:syms` for string and symbol keys respectively.
In all of these cases the vector contains symbols which are the local binding names.

`:keys` 키는 연관 자료구조의 값들을 위한 것이지만, string에 쓰기 위한 `:strs`와 symbol에 쓰기 위한 `:syms`도 있습니다.
이런 키워드들을 사용하는 경우에는 vector에 로컬 바인딩에 사용할 symbol 이름을 포함하도록 작성합니다.

```clojure
(def string-keys {"first-name" "Joe" "last-name" "Smith"})

(let [{:strs [first-name last-name]} string-keys]
  (println first-name last-name))
;= Joe Smith

(def symbol-keys {'first-name "Jane" 'last-name "Doe"})

(let [{:syms [first-name last-name]} symbol-keys]
  (println first-name last-name))
;= Jane Doe
```

>
Associative destructuring can be nested and combined with sequential destructuring as needed.

연관 구조분해는 중첩해서 사용할 수 있으며, 필요한 경우 sequential 구조분해와 함께 사용할 수도 있습니다.

```clojure
(def multiplayer-game-state
  {:joe {:class "Ranger"
         :weapon "Longbow"
         :score 100}
   :jane {:class "Knight"
          :weapon "Greatsword"
          :score 140}
   :ryan {:class "Wizard"
          :weapon "Mystic Staff"
          :score 150}})
{% raw %}
(let [{{:keys [class weapon]} :joe} multiplayer-game-state]
  (println "Joe is a" class "wielding a" weapon))
;= Joe is a Ranger wielding a Longbow
{% endraw %}
```


#### Keyword arguments

>
One special case is using associative destructuring for keyword-arg parsing.
Consider a function that takes options `:debug` and `:verbose`.
These could be specified in an options map:

키워드 인자를 파악하는 방식으로 연관 구조분해를 쓰는 특별한 케이스가 하나 있습니다.

`:debug`와 `:verbose`를 갖는 `options`라는 map을 입력받는 함수를 하나 생각해 봅시다.
이 키워드들은 아래 예제와 같이 `options` map에 지정됩니다.

```clojure
(defn configure [val options]
  (let [{:keys [debug verbose] :or {debug false, verbose false}} options]
    (println "val =" val " debug =" debug " verbose =" verbose)))

(configure 12 {:debug true})
;;val = 12  debug = true  verbose = false
```

>
However, it would be nicer to type if we could pass those optional arguments as just additional "keyword" arguments like this:

그런데 이 함수에 인자를 넘길 때 아래와 같이 "keyword" 인자로 전달할 수 있다면 좀 더 편리할 것 같습니다.

```clojure
(configure 12 :debug true)
```
>
To support this style of invocation, associative destructuring also works with lists or sequences of key-value pairs for keyword argument parsing.
The sequence comes from the rest arg of a variadic function but is destructured not with sequential destructuring, but with associative destructuring (so a sequence destructured as if it were the key-value pairs in a map):

이런 방식의 호출을 지원하기 위해, 연관 구조분해는 key-value 쌍을 갖는 list나 sequence 에서도 작동합니다.
가변 함수의 나머지 인수에서 딸려온 sequence는 시퀀셜 구조분해가 아니라, 연관 구조분해로 구조분해됩니다.
(즉, 시퀀스는 마치 map의 key-value 쌍처럼 구조분해됩니다.)

```clojure
(defn configure [val & {:keys [debug verbose]
                        :or {debug false, verbose false}}]
  (println "val =" val " debug =" debug " verbose =" verbose))

(configure 10)
;;val = 10  debug = false  verbose = false

(configure 5 :debug true)
;;val = 5  debug = true  verbose = false

;; Note that any order is ok for the kwargs
 (configure 12 :verbose true :debug true)
;;val = 12  debug = true  verbose = true
```

>
The use of keyword arguments had fallen in and out of fashion in the Clojure community over the years.
They are now mostly used when presenting interfaces that people are expected to type at the REPL or the outermost layers of an API.
In general, inner layers of the code found it easier to pass options as an explicit map.
However, in Clojure 1.11 the capability was added to allow passing of alternating key→values, or a map of those same mappings, or even a map with key→values before it to functions expecting keyword arguments.
Therefore, the call to `configure` above can take any of the following forms in addition to those shown above:

keyword 인자를 사용하는 방법은 Clojure 커뮤니티에서 몇 년간은 인기있었지만, 이제는 흘러간 유행이 됐습니다.
이제 이 기법은 REPL이나 API의 가장 바깥쪽 레이어에서 입력해야 하는 인터페이스를 표현할 때 주로 사용됩니다.
일반적으로, 코드의 안쪽 레이어들에서는 옵션을 명시적으로 선언한 map으로 전달하는 것이 더 쉽다는 것을 깨닫게 되었기 때문입니다.
그러나 Clojure 1.11 부터는 이에 대한 대체적인 기능이 추가되었으며,
`configure` 함수를 호출하는 방법으로 앞에서 본 것 외에도 아래와 같은 방법들을 사용할 수 있습니다.

```clojure
 (configure 12 {:verbose true :debug true})
;;val = 12  debug = true  verbose = true

 (configure 12 :debug true {:verbose true})
;;val = 12  debug = true  verbose = true
```

>
The trailing map to functions expecting keyword aguments is often useful in overriding the default keys provided as key→value pairs.

마지막 예제와 같이 키워드 인자를 기대하는 함수에 대해 뒤따르는 map을 제공하면 key→value 쌍으로 제공되는 기본 키를 덮어쓸 수 있어 유용하게 사용할 수 있습니다.

#### Namespaced keywords

>
If the keys in your map are namespaced keywords, you can also use destructuring with it, even though local binding symbols are not allowed to have namespaces.
Destructuring a namespaced key will bind a value to the local name part of the key and drop the namespace.
(Thus you can use `:or` as with a non-namespaced key.)

로컬 바인딩 symbol에는 네임스페이스가 허용되지 않지만, map의 key가 네임스페이스 키워드인 경우라면 구조분해를 할 수 있습니다.
네임스페이스 key를 구조분해하면 key의 로컬 이름 부분에 값이 바인딩되며, 네임스페이스 부분은 버려 버립니다.
(따라서 네임스페이스가 없는 key에서도 `:or`을 사용할 수 있습니다.)

```clojure
(def human {:person/name "Franklin"
            :person/age 25
            :hobby/hobbies "running"})
(let [{:keys [hobby/hobbies]
       :person/keys [name age]
       :or {age 0}} human]
  (println name "is" age "and likes" hobbies))
;= Franklin is 25 and likes running
```

>
Destructuring namespaced keywords using `:keys` alone can result in local bindings that clash.
Because all map destructuring options can be combined, any local binding form can be defined individually.

`:keys`만 사용해 네임스페이스 키워드를 구조분해하면 로컬 바인딩을 하는 과정에서 충돌이 발생할 수 있습니다.
왜냐하면 map에 대한 구조분해 옵션 규칙들이 전부 작동할 수 있기 때문입니다.
그러므로 로컬 바인딩 형식을 개별적으로 정의할 수 있습니다.

```clojure
(def human {:person/name "Franklin"
            :person/age 25
            :hobby/name "running"})
(let [{:person/keys [age]
       hobby-name :hobby/name
       person-name :person/name} human]
  (println person-name "is" age "and likes" hobby-name))
;= Franklin is 25 and likes running
```

>
You can even destructure using auto-resolved keywords, which will again be bound to only the name part of the key:

auto-resolved 키워드를 사용해서 구조분해하는 것도 가능합니다.
이런 키워드는 키의 이름 부분에만 바인딩됩니다.

```clojure
;; this assumes you have a person.clj namespace in your project
;; if not do the following at your repl instead: (create-ns 'person) (alias 'p 'person)
(require '[person :as p])

(let [person {::p/name "Franklin", ::p/age 25}
      {:keys [::p/name ::p/age]} person]
  (println name "is" age))

;= Franklin is 25
```

>
Creating and destructuring maps with auto-resolved keywords allow us to write code using a namespace alias (here `p`) that is defined by a `require` in the current namespace, giving us a means of namespace indirection that can be changed at a single place in the code.

auto-resolved 키워드를 사용해서 map을 생성하거나 구조분해하면, 현재 네임스페이스에서 `require`로 정의된 네임스페이스 알리아스(방금 전 예제에서 `p`)를 사용해 코드를 작성할 수 있으며, 이로 인해 네임스페이스에 대한 간접적인 참조가 가능하게 됩니다.

>
All symbols bound in the context of destructuring can be further destructured - this allows destructuring to be used in a nested fashion for both sequential and associative destructuring.
It is less obvious, but this also extends to the symbol defined after `&`.

구조분해 컨텍스트에 바인딩된 모든 symbol들은 더 작은 구조분해를 통해 다시 구조분해될 수 있습니다.
따라서 구조분해는 시퀀셜 구조분해와 연관 구조분해 전부에 대해 중첩적으로 사용할 수가 있는 것입니다.
이 기법은 (좀 덜 명확한 방법이긴 하지만) `&` 기호의 정의까지 확장됩니다.

>
This example destructures the `&` seq in place to decode the rest of the arguments as options (note that we are thus destructuring the two arguments sequentially and the rest associatively):

아래의 예제는 나머지 인자들을 받는 `&` 시퀀스를 구조분해하는 내용입니다.
(이 예제에서 앞의 두 인자는 시퀀셜 구조분해를 사용하고, 나머지는 연관 구조분해를 사용한다는 점에 주목하세요)

```clojure
(defn f-with-options
  [a b & {:keys [opt1]}]
  (println "Got" a b opt1))

(f-with-options 1 2 :opt1 true)
;= Got 1 2 true
```


### Where to destructure

>
You can utilize destructuring anywhere that there is an explicit or implicit let binding.
>
One of the most common places to see destructuring is in pulling apart the arguments passed to a function.
>
Here we have the standard let x equal this, let y equal that, etc…
Again, this is perfectly valid code, it’s just verbose.

명시적이건 암시적이건 `let` 바인딩을 쓰는 곳이라면 어디든지 구조분해를 사용할 수 있습니다.

구조분해를 사용하는 가장 흔한 예는 바로 함수에 전달된 인자들을 구조분해하는 것일 겁니다.

예제 코드를 봅시다. `let x`를 이렇게 하고, `let y`를 저렇게 하는 식의 코드가 보입니다.
이 코드는 잘 작동하는 적합한 코드이지만 좀 수다스럽군요.

```clojure
(defn print-coordinates-1 [point]
  (let [x (first point)
        y (second point)
        z (last point)]
    (println "x:" x ", y:" y ", z:" z)))
```

>
Any time we see code that is using `first`, `second`, `nth`, or `get` to pull apart a data structure, it’s likely that destructuring can clean that up - we can start by rewriting the `let`:

주어진 자료구조에서 원하는 값을 꺼내기 위해
`first`, `second`, `nth`, `get`를 사용하는 코드는 어디에서나 볼 수 있습니다.
이제 이걸 `let`을 사용한 구조분해로 깨끗한 코드로 다시 작성해 봅시다.

```clojure
(defn print-coordinates-2 [point]
  (let [[x y z] point]
    (println "x:" x ", y:" y ", z:" z)))
```

>
When defining a function in clojure, destructuring can be applied on the incoming parameters, just like in a let:

Clojure에서 함수를 정의할 때에도 `let`에서 썼던 것과 똑같은 방법으로 주어지는 인자에 대한 구조분해를 적용할 수 있습니다.

```clojure
(defn print-coordinates-3 [[x y z]]
  (println "x:" x ", y:" y ", z:" z))
```

>
We have replaced several lines of code that pulled apart the incoming point data with a concise statement about the structure of that data that also binds the data to local values.
>
For a more realistic example, let’s create a map containing some basic contact information for the infamous John Smith.

위 예제에서 함수에 입력되는 데이터를 분해하는 여러 줄의 코드를 로컬 변수에 바인딩하는 간단한 코드로 대체할 수 있었습니다.

좀 더 현실적인 예제를 살펴봅시다. 다음은 악명 높은 John Smith 씨의 연락처 정보가 포함된 map 입니다.

```clojure
(def john-smith {:f-name "John"
                 :l-name "Smith"
                 :phone "555-555-5555"
                 :company "Functional Industries"
                 :title "Sith Lord of Git"})
```

>
Now that we have John’s personal information we need to access the values within this map.

이제 John의 개인 정보에 엑세스해보도록 합시다.

```clojure
(defn print-contact-info [{:keys [f-name l-name phone company title]}]
  (println f-name l-name "is the" title "at" company)
  (println "You can reach him at" phone))

(print-contact-info john-smith)
;= John Smith is the Sith Lord of Git at Functional Industries
;= You can reach him at 555-555-5555
```

>
This function will associatively destructure the input using the `:keys` shortcut and then print out the contact information that we provided.
>
But what about when we want to send John a nice letter?

이 함수는 `:keys`를 사용한 축약 규칙을 써서 입력된 map을 구조분해하고, 연락처 정보를 출력할 것입니다.

그런데 John 씨에게 멋진 편지를 보내고 싶다면 어떻게 해야 할까요?

```clojure
(def john-smith {:f-name "John"
                 :l-name "Smith"
                 :phone "555-555-5555"
                 :address {:street "452 Lisp Ln."
                           :city "Macroville"
                           :state "Kentucky"
                           :zip "81321"}
                 :hobbies ["running" "hiking" "basketball"]
                 :company "Functional Industries"
                 :title "Sith Lord of Git"})
```

>
We have an address in there now, but we needed to nest a map into our original structure in order to accomplish this.

주소를 얻기 위해서는 중첩된 map을 써야 합니다.

```clojure
(defn print-contact-info
  [{:keys [f-name l-name phone company title]
    {:keys [street city state zip]} :address
    [fav-hobby second-hobby] :hobbies}]
  (println f-name l-name "is the" title "at" company)
  (println "You can reach him at" phone)
  (println "He lives at" street city state zip)
  (println "Maybe you can write to him about" fav-hobby "or" second-hobby))

(print-contact-info john-smith)
;= John Smith is the Sith Lord of Git at Functional Industries
;= You can reach him at 555-555-5555
;= He lives at 452 Lisp Ln. Macroville Kentucky 81321
;= Maybe you can write to him about running or hiking
```

### Macros

>
Macro writers may find the need to write a macro that incorporates destructuring.
The most common way to do so is to produce a call to something that already does destructuring (like `let`, `loop`, `fn`, etc).
Some examples of this in `clojure.core` include `if-let`, `when-let`, `when-some`, etc.

macro를 작성할 때 구조분해를 포함하는 macro를 만들 필요가 있을 수 있습니다.
가장 일반적인 방법은 이미 구조분해를 잘 수행하고 있는 것(`let`, `loop`, `fn` 등)을 호출하는 것입니다.
`clojure.core`의 `if-let`, `when-let`, `when-some` 등이 이에 해당됩니다.

>
However, in rare cases you might want to instead resolve the destructuring yourself in a macro. In this case, use the (undocumented) `clojure.core/destructure` function, which implements the destructuring logic and is what `let` and `loop` actually invoke. The `destructure` function is designed to be invoked in a macro and expects to take a form and return a form:

그런데, 좀 드문 경우이긴 하지만 macro 내에서 직접 구조분해를 할 필요가 있을 수 있습니다.
이런 경우에는 `clojure.core/destructure` 함수를 사용해 보세요.
이 함수는 구조분해 로직을 구현하고 있으며, `let`과 `loop`가 이걸 사용하고 있습니다.
이 `destructure` 함수는 macro에서 호출하도록 설계되었으며, form을 입력받아서 form을 리턴하도록 구성되어 있습니다.

```clojure
(destructure '[[x & remaining :as all] numbers])
;= [vec__1 numbers
;=  x (clojure.core/nth vec__1 0 nil)
;=  remaining (clojure.core/nthnext vec__1 1)
;=  all vec__1]
```

>
The result was formatted here to give it a little more clarity.
This example should also give you some insight into how destructuring works under the hood.

결과를 더 명확히 보여주기 위해 포매팅을 해 두었습니다.
이 예제는 또한 구조분해가 내부적으로 어떻게 작동하는지에 대한 통찰을 제공해줍니다.

Original author: Michael Zavarella


## 참고문헌

- [Destructuring in Clojure]( https://clojure.org/guides/destructuring )


