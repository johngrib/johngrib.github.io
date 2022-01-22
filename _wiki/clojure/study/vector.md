---
layout  : wiki
title   : Clojure vector
summary : 
date    : 2022-01-22 16:30:48 +0900
updated : 2022-01-22 16:55:52 +0900
tag     : clojure
toc     : true
public  : true
parent  : [[/clojure/study]]
latex   : false
---
* TOC
{:toc}

## defn

```clojure
(defn vector
  "Creates a new vector containing the args."
  {:added "1.0"
   :static true}
  ([] [])
  ([a] [a])
  ([a b] [a b])
  ([a b c] [a b c])
  ([a b c d] [a b c d])
    ([a b c d e] [a b c d e])
    ([a b c d e f] [a b c d e f])
  ([a b c d e f & args]
     (. clojure.lang.LazilyPersistentVector (create (cons a (cons b (cons c (cons d (cons e (cons f args))))))))))
```

## Examples

```clojure
[]       ; []
(vector) ; []

[1 2 3]        ; [1 2 3]
(vector 1 2 3) ; [1 2 3]

(type []) ; clojure.lang.PersistentVector
```

## clojure.lang.PersistentVector

vector의 구현체는 `clojure.lang.PersistentVector` 이다.


## 참고문헌

- <https://clojuredocs.org/clojure.core/vector >

