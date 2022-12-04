---
layout  : wiki
title   : Clojure merge-with
summary : 
date    : 2021-12-20 00:17:32 +0900
updated : 2021-12-20 10:03:57 +0900
tag     : clojure
resource: B0/9F952D-92FF-4339-A3BC-74CEA96AD763
toc     : true
public  : true
parent  : [[/clojure/study]]
latex   : false
---
* TOC
{:toc}

## defn

```clojure
(defn merge-with
  "Returns a map that consists of the rest of the maps conj-ed onto
  the first.  If a key occurs in more than one map, the mapping(s)
  from the latter (left-to-right) will be combined with the mapping in
  the result by calling (f val-in-result val-in-latter)."
  {:added "1.0"
   :static true}
  [f & maps]
  (when (some identity maps)
    (let [merge-entry (fn [m e]
            (let [k (key e) v (val e)]
              (if (contains? m k)
                (assoc m k (f (get m k) v))
                (assoc m k v))))
          merge2 (fn [m1 m2]
           (reduce1 merge-entry (or m1 {}) (seq m2)))]
      (reduce1 merge2 maps))))
```

## Examples

```clojure
(merge-with +
            {:a 1 :b 2}
            {:a 9 :b 98 :c 0}
            {:a 9 :d 100})
=> {:a 19, :b 100, :c 0, :d 100}
```

세 개의 map에 대해 같은 key값을 가진 엔트리에 `+` 함수를 적용한 결과가 나왔다. map 의 개수는 몇 개를 줘도 상관없다.

만약 여러 개의 map이 리스트에 들어있는 상태라면 `apply`를 쓴다.

```clojure
(apply merge-with +
            [{:a 1 :b 2},
             {:a 9 :b 98 :c 0},
             {:a 9 :d 100}])
=> {:a 19, :b 100, :c 0, :d 100}
```

이번엔 `+` 함수가 아니라 `list` 함수를 써보자.

```clojure
(merge-with list
            {:a 1 :b 2},
            {:a 9 :b 98 :c 0},
            {:a 7 :d 100})
=> {:a ((1 9) 7), :b (2 98), :c 0, :d 100}
```

`(1 9 7)`처럼 나오길 바랐지만 `((1 9) 7)`이 나왔다.
하지만 `merge-with`가 어떻게 동작하는지 알 수 있다.
아마 다음과 같이 작동했을 것이다.

```clojure
(list (list 1 9) 7)
=> ((1 9) 7)
```

그러므로 map의 각 엔트리에 들어있는 value값이 리스트로 되어 있다면 `into`를 사용할 수 있다.

```clojure
(merge-with into
            {:a [1 2] :b [4 7]                },
            {:a [1 4] :b [98]  :c [0]         },
            {:a [2]                   :d [100]})
=> {:a [1 2 1 4 2], :b [4 7 98], :c [0], :d [100]}
```


## 참고문헌

- <https://clojuredocs.org/clojure.core/merge-with >
