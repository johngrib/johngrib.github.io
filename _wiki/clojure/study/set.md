---
layout  : wiki
title   : Clojure set
summary : 
date    : 2022-02-07 23:19:20 +0900
updated : 2022-02-11 00:39:33 +0900
tag     : clojure
resource: 2B/A2D918-CDDE-4E15-BC48-643BF9B4683B
toc     : true
public  : true
parent  : [[/clojure/study]]
latex   : false
---
* TOC
{:toc}

## defn

```clojure
(defn set
  "Returns a set of the distinct elements of coll."
  {:added "1.0"
   :static true}
  [coll]
  (if (set? coll)
    (with-meta coll nil)
    (if (instance? clojure.lang.IReduceInit coll)
      (persistent! (.reduce ^clojure.lang.IReduceInit coll conj! (transient #{})))
      (persistent! (reduce1 conj! (transient #{}) coll)))))
```

## Examples

집합은 `#{}`과 `set`으로 생성할 수 있다.

```clojure
#{1 2 3}       ; #{1 3 2}
(set [1 2 3])  ; #{1 3 2}
(set '(1 2 3)) ; #{1 3 2}
```

문자열에 사용하면 문자 집합이 된다.

```clojure
(set "foo bar") ; #{\space \a \b \f \o \r}
```

집합의 타입은 `PersistentHashSet`.

```clojure
(class #{}) ; clojure.lang.PersistentHashSet
```

`#{}` 리터럴을 사용하면 중복된 키가 있다면 신택스 에러가 난다. 그러나 `set` 함수를 사용하면 알아서 중복 아이템을 생략한다.

```clojure
#{:a :b :a} ; Syntax error

(set [:a :a :b]) ; #{:b :a}
```

집합을 함수처럼 사용하면 `get` 함수와 똑같이 작동한다. 주어진 값이 포함되어 있다면 해당 값을 리턴하고, 그렇지 않다면 `nil`을 리턴한다.

```clojure
(#{:a :b :c} :a) ; :a
(#{:a :b :c} :d) ; nil

(get #{:a :b :c} :a) ; :a
(get #{:a :b :c} :d) ; nil
```

키워드를 사용한다면 키워드를 함수처럼 사용해도 같은 결과가 리턴된다.

```clojure
(:a #{:a :b :c}) ; :a
(:d #{:a :b :c}) ; nil
```

Clojure에서는 조건문에서 `nil`과 `false`만 부정의 의미로 해석하고 나머지는 모두 `true`로 해석하므로 위의 방식은 조건문에서도 잘 작동한다.
그러나 굳이 `true`와 `false` 값이 필요하다면 `contains?` 함수를 사용하면 된다.

```clojure
(contains? #{:a :b :c} :a) ; true
(contains? #{:a :b :c} :d) ; false
```

길이는 `count`로 알 수 있다.

```clojure
(count #{:a :b :c}) ; 3
```

`cons`를 사용하면 `Cons` 타입이 리턴되므로 주의하자.

```clojure
(cons :d #{:a :b :c})        ; (:d :c :b :a)
(type (cons :d #{:a :b :c})) ; clojure.lang.Cons
```

`conj`는 아이템을 추가한 새로운 집합을 리턴하지만 타입이 바뀌지 않는다.

```clojure
(conj #{:a :b :c} :d)        ; #{:c :b :d :a}
(type (conj #{:a :b :c} :d)) ; clojure.lang.PersistentHashSet
```

`disj`를 쓰면 집합에서 아이템을 제거한 새로운 집합을 얻을 수 있다.

```clojure
(disj #{:a :b :c} :b) ; #{:c :a}
```

### clojure.set 함수

`union`은 합집합을 리턴한다.

```clojure
(clojure.set/union #{:a :b} #{:b :c})
=> #{:c :b :a}

(clojure.set/union #{:a :b} #{:b :c} #{:c :d})
=> #{:c :b :d :a}
```

`difference`는 차집합을 리턴한다. 첫 번째 집합에서 뒤에 오는 집합들을 계속 빼나간 결과로 생성된 집합을 리턴한다.

```clojure
(clojure.set/difference #{:a :b} #{:b :c})
=> #{:a}

(clojure.set/difference #{:a :b :c :d} #{:b} #{:d})
=> #{:c :a}
```

`intersection`은 교집합을 리턴한다.

```clojure
(clojure.set/intersection #{:a :b} #{:b :c})
=> #{:b}

(clojure.set/intersection #{:a :b} #{:b :c} #{:c :d})
=> #{}
```
