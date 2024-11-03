---
layout  : wiki
title   : Destructuring
summary : 작성중인 문서
date    : 2022-03-11 23:16:09 +0900
updated : 2024-11-03 22:46:21 +0900
tag     : clojure
resource: 80/84CC1A-8D40-478C-8E60-E05E0E57FD06
toc     : true
public  : true
parent  : [[/programming]]
latex   : false
---
* TOC
{:toc}

## 구조분해?

구조분해(destructuring)는 자료구조의 내부 값들에 이름을 붙여주는 기법이다.

## 여러 언어의 구조분해
### JavaScript

다음과 같은 함수가 있다고 하자.

```javascript
function print_head_numbers(numbers) {
  const num0 = numbers[0];
  const num1 = numbers[1];

  console.log(num0, num1);
}
```

위의 함수에 구조분해를 적용해 수정해 보자.

```javascript
// 배열이 함수에 입력될 때 num0, num1 로 배열의 구조를 분해한다
//                           ↓
function print_head_numbers([num0, num1]) {
  console.log(num0, num1);
}

print_head_numbers([2, 9, 44]); // 2 9
```

물론 함수에 진입할 때에만 쓸 수 있는 것은 아니다.

```javascript
// ... 을 사용해 rest에 나머지 배열 할당
var [a, b, ...rest] = ['a', 'b', 'c', 'd'];
console.log(a); // a
console.log(b); // b
console.log(rest); // ['c', 'd']
```

구조분해는 중첩해 사용할 수도 있다.

```javascript
var [[a, b]] = [['aa', 'bb']]
console.log(a, b)   // aa bb
```

그러나 구조분해 레벨을 맞추지 않는다면 에러가 발생한다.

```javascript
var [[a, b], c] = [['aa', 'bb'], 'c']
// Uncaught SyntaxError: Identifier 'c' has already been declared
```

기본값을 제공할 수도 있다.

```javascript
var [a='a', b='b'] = ['aa']
console.log(a, b)   // aa b
```

구조분해는 Object에도 사용할 수 있다.

```javascript
var {name, age} = {name: 'John', age: 28};
console.log(name, age); // John 28
```

`:`를 사용해 Object의 키 값과 다른 이름을 지정할 수도 있다.

```javascript
var {name: first_name, age, fav} = {name: 'John', age: 28, fav: ['Running', 'Reading']};

console.log(first_name, age); // John 28
```

### Clojure

Clojure에서는 주로 `let` 바인딩과 함수 인자에서 구조분해를 사용한다.

리스트 구조와 맵 구조를 갖고 있는 자료라면 무엇이든 가능하므로, Clojure 코드에서는 구조분해를 흔하게 볼 수 있다.

```clojure
(def names ["Kim" "Lee" "Park"])

(let [[name1 name2 name3] names]
    (println name1)
    (println name2)
    (println name3)))
```

필요없는 값이 있다면 보통 `_`에 할당해준다.
`_`의 사용은 Clojure 사용자들끼리의 컨벤션이며, 사용해도 값이 할당되지 않는 건 아니다.

```clojure
(def names ["Kim" "Lee" "Park"])

(let [[name1 _ name3] names]
    (println name1)
    (println name3)))
```

Clojure의 구조분해는 중첩해서 사용해도 잘 작동하므로, 복잡한 자료가 주어졌을 때 편리하게 사용할 수 있다.

```clojure
(let [[[a b] c] [[1 2] 3]]
  (println a)
  (println b)
  (println c))
; 1
; 2
; 3
```

```clojure
(let [[[a [b]] c] [[1 [2]] 3]]
  (println a)
  (println b)
  (println c))
; 1
; 2
; 3
```

String에도 사용할 수 있다는 점에서 Lisp 철학을 엿볼 수 있다.

```clojure
(let [[x y z] "hello"]
  (println x y z)
  (map type [x y z]))
; h e l
; (java.lang.Character java.lang.Character java.lang.Character)
```

주어진 리스트의 나머지는 `&`을 사용해서 벡터로 할당할 수 있다. (JavaScript의 `...`를 떠올려보자)

```clojure
(let [[x y & rest] [\a \b \c \d \e]]
  (println x y rest)
  (map type [x y rest]))
; a b (c d e)
; (java.lang.Character java.lang.Character clojure.lang.PersistentVector$ChunkedSeq)
```

`:as`를 사용하면 구조분해의 대상인 자료구조를 `:as` 뒤에 있는 심볼에 할당할 수 있다.

```clojure
(let [[x y & rest :as total] [\a \b \c \d \e]]
  (println x y rest)
  (println total))
; a b (c d e)
; [a b c d e]
```

map 에서도 사용할 수 있다.

```clojure
(def person {:name "John"
             :age  28
             :fav  ["Running" "Reading"]})

(let [{first-name :name
       age        :age
       fav        :fav} person]
  (println first-name)
  (println age)
  (println fav))
; John
; 28
; [Running Reading]
```

키워드를 그대로 이름으로 사용하고 싶다면 `:keys`를 쓴다.

```clojure
(def person {:name "John"
             :age  28
             :fav  ["Running" "Reading"]})

(let [{:keys [name age fav]} person]
  (println first)
  (println age)
  (println fav))
; John
; 28
; [Running Reading]
```

`:as`도 사용 가능하다.

```clojure
(let [{name :name
       age  :age
       :as  all} person] ; person을 all에 할당
  (println name)
  (println age)
  (println all))
; John
; 28
; {:name John, :age 28, :fav [Running Reading]
```

찾을 수 없는 키에 대한 대안은 `:or`로 지정하면 된다.

```clojure
(let [{name :name
       age  :age
       :as  all
       :or  {name "no name"
             age  0}} (dissoc person :name)]
  (println name)
  (println age)
  (println all))

; no name
; 28
; {:age 28, :fav [Running Reading]}
```

만약 map의 키가 키워드가 아니라 string이라면 `:strs`를 사용할 수 있다.

```clojure
(let [{:strs [name age]
       :as   all} {"name" "John" "age" 28}]
  (println name)
  (println age)
  (println all))
; John
; 28
; {name John, age 28}
```

키가 Symbol이라면 `:syms`를 쓰면 된다.

```clojure
(let [{:syms [name age]
       :as   all} {'name "John" 'age 28}]
  (println name)
  (println age)
  (println all))
; John
; 28
; {name John, age 28}
```

중첩 구조분해가 가능하므로 깊은 곳에 지정된 값도 이름을 붙일 수 있다.

```clojure
(let [{name        :name
       age         :age
       [fav1 fav2] :fav     ; 중첩 구조분해
       :as         all
       :or         {name "no name"}} person]
  (println name)
  (println fav1)
  (println fav2))
; John
; Running
; {:name John, :age 28, :fav [Running Reading]}
```

#### defn destructure

놀랍게도 destructure는 언어 문법이 아니라 `clojure.core`에서 제공하는 함수이다.

[`let` 매크로 코드]( https://github.com/clojure/clojure/blob/clojure-1.11.0-alpha4/src/clj/clojure/core.clj#L4498-L4514 )를 살펴보자.

```clojure
(defmacro let
  "binding => binding-form init-expr
  binding-form => name, or destructuring-form
  destructuring-form => map-destructure-form, or seq-destructure-form

  Evaluates the exprs in a lexical context in which the symbols in
  the binding-forms are bound to their respective init-exprs or parts
  therein.

  See https://clojure.org/reference/special_forms#binding-forms for
  more information about destructuring."
  {:added "1.0", :special-form true, :forms '[(let [bindings*] exprs*)]}
  [bindings & body]
  (assert-args
     (vector? bindings) "a vector for its binding"
     (even? (count bindings)) "an even number of forms in binding vector")
  `(let* ~(destructure bindings) ~@body))
```

마지막 줄에 주목하자. `destructure` 함수를 호출하고 있다.


[`destructure` 함수의 전문]( https://github.com/clojure/clojure/blob/clojure-1.11.0-alpha4/src/clj/clojure/core.clj#L4401-L4496 )은 다음과 같다.

```clojure
;;redefine let and loop  with destructuring
(defn destructure [bindings]
  (let [bents (partition 2 bindings)
        pb (fn pb [bvec b v]
             (let [pvec
                   (fn [bvec b val]
                     (let [gvec (gensym "vec__")
                           gseq (gensym "seq__")
                           gfirst (gensym "first__")
                           has-rest (some #{'&} b)]
                       (loop [ret (let [ret (conj bvec gvec val)]
                                    (if has-rest
                                      (conj ret gseq (list `seq gvec))
                                      ret))
                              n 0
                              bs b
                              seen-rest? false]
                         (if (seq bs)
                           (let [firstb (first bs)]
                             (cond
                              (= firstb '&) (recur (pb ret (second bs) gseq)
                                                   n
                                                   (nnext bs)
                                                   true)
                              (= firstb :as) (pb ret (second bs) gvec)
                              :else (if seen-rest?
                                      (throw (new Exception "Unsupported binding form, only :as can follow & parameter"))
                                      (recur (pb (if has-rest
                                                   (conj ret
                                                         gfirst `(first ~gseq)
                                                         gseq `(next ~gseq))
                                                   ret)
                                                 firstb
                                                 (if has-rest
                                                   gfirst
                                                   (list `nth gvec n nil)))
                                             (inc n)
                                             (next bs)
                                             seen-rest?))))
                           ret))))
                   pmap
                   (fn [bvec b v]
                     (let [gmap (gensym "map__")
                           gmapseq (with-meta gmap {:tag 'clojure.lang.ISeq})
                           defaults (:or b)]
                       (loop [ret (-> bvec (conj gmap) (conj v)
                                      (conj gmap) (conj `(if (seq? ~gmap)
                                                           (if (next ~gmapseq)
                                                             (clojure.lang.PersistentArrayMap/createAsIfByAssoc (to-array ~gmapseq))
                                                             (if (seq ~gmapseq) (first ~gmapseq) clojure.lang.PersistentArrayMap/EMPTY))
                                                           ~gmap))
                                      ((fn [ret]
                                         (if (:as b)
                                           (conj ret (:as b) gmap)
                                           ret))))
                              bes (let [transforms
                                          (reduce1
                                            (fn [transforms mk]
                                              (if (keyword? mk)
                                                (let [mkns (namespace mk)
                                                      mkn (name mk)]
                                                  (cond (= mkn "keys") (assoc transforms mk #(keyword (or mkns (namespace %)) (name %)))
                                                        (= mkn "syms") (assoc transforms mk #(list `quote (symbol (or mkns (namespace %)) (name %))))
                                                        (= mkn "strs") (assoc transforms mk str)
                                                        :else transforms))
                                                transforms))
                                            {}
                                            (keys b))]
                                    (reduce1
                                        (fn [bes entry]
                                          (reduce1 #(assoc %1 %2 ((val entry) %2))
                                                   (dissoc bes (key entry))
                                                   ((key entry) bes)))
                                        (dissoc b :as :or)
                                        transforms))]
                         (if (seq bes)
                           (let [bb (key (first bes))
                                 bk (val (first bes))
                                 local (if (instance? clojure.lang.Named bb) (with-meta (symbol nil (name bb)) (meta bb)) bb)
                                 bv (if (contains? defaults local)
                                      (list `get gmap bk (defaults local))
                                      (list `get gmap bk))]
                             (recur (if (ident? bb)
                                      (-> ret (conj local bv))
                                      (pb ret bb bv))
                                    (next bes)))
                           ret))))]
               (cond
                (symbol? b) (-> bvec (conj b) (conj v))
                (vector? b) (pvec bvec b v)
                (map? b) (pmap bvec b v)
                :else (throw (new Exception (str "Unsupported binding form: " b))))))
        process-entry (fn [bvec b] (pb bvec (first b) (second b)))]
    (if (every? symbol? (map first bents))
      bindings
      (reduce1 process-entry [] bents))))
```

### Kotlin

```kotlin
val (one, two) = Pair(1, 2)
```

사용하지 않는 값은 `_`에 할당해 무시할 수 있다.

```kotlin
val (_, two) = Pair(1, 2)
```

## 함께 읽기

- [[/clojure/guide/destructuring]]

## 참고문헌

- [Destructuring assignment (developer.mozilla.org)]( https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment )
    - [한국어]( https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment )
- [Destructuring declarations (kotlinlang.org)]( https://kotlinlang.org/docs/destructuring-declarations.html )


