---
layout  : wiki
title   : Clojure를 학습하며 남기는 기록과 예제 1
summary : 
date    : 2021-12-08 22:48:20 +0900
updated : 2021-12-09 23:14:02 +0900
tag     : clojure
resource: 30/D76CA0-E8E0-4D6B-8F62-DFFB87253C44
toc     : true
public  : true
parent  : [[/clojure]]
latex   : false
---
* TOC
{:toc}

### apply

Lisp을 다룬다면 역사적인 함수인 `apply`를 빠뜨릴 수 없을 것이다.

`apply`는 시퀀스를 받아 주어진 함수의 인자로 제공해 준다.

나는 이번에 Clojure를 통해 Lisp을 처음 접하므로 내가 `apply`를 가장 많이 사용해 본 언어인 Javascript를 통해 연습해 보자.

Javascript에서 `apply`는 다음과 같이 사용한다.

```javascript
function add(a, b) {
  return a + b;
}

add.apply(null, [7, 12]); // 19
```

`add(7, 12)`로 호출할 수 있는 함수에 `[7, 12]`를 제공해서 호출하고 있다.
`this` 바인딩은 필요 없어서 그냥 `null`을 줬다.

그렇다면 이번엔 Clojure에서 `apply`를 사용해 보자.

```clojure
(+ 1 2 3) ; 6

(apply + [1 2 3]) ; 6
```

참 쉽다. `apply` 함수에 적용할 함수와 인자 시퀀스를 함께 넘기면 끝.



## Clojure sequence의 특징

- lazy하다. 따라서 무한대의 시퀀스를 다룰 수도 있다.
- immutable하다.


## sequence 연산

### first, rest

`first`는 첫 번째 원소를 리턴한다.

```clojure
(first '(2 4 6)) ; 2
(first [3 6 9]) ; 3
(first [])      ; nil
```

`rest`는 첫 번째 원소를 제외한 나머지 원소들을 리턴한다.

```clojure
(rest '(2 4 6)) ; (4 6)
(rest [3 6 9]) ; (6 9)
(rest [3])     ; ()
(rest [])      ; ()
```

### cons, conj, into

`cons`는 주어진 시퀀스의 앞에 원소를 추가한 시퀀스를 리턴한다.

```clojure
(cons 3 [1 2]) ; (3 1 2)
(cons 6 '())   ; (6)
```

`conj`는 `cons`와 비슷하지만 자료구조의 특성에 따라 원소가 추가되는 위치가 다르다.

```clojure
(conj '(1 2 3) 4) ; (4 1 2 3) ; 앞에 추가
(conj [1 2 3] 4)  ; [1 2 3 4] ; 뒤에 추가
```

`into`는 두 컬렉션을 합친 결과를 리턴한다. `conj`처럼 어디에 추가되는지는 자료구조에 따라 다르다.

```clojure
(into '(1 2 3) '(4 5)) ; (5 4 1 2 3) ; 앞에 추가
(into [1 2 3] '(4 5))  ; [1 2 3 4 5] ; 뒤에 추가
(into [1 2 3] [4 5])   ; [1 2 3 4 5]
```

### seq, next

`seq`는 다른 자료구조를 시퀀스로 만들어 리턴한다.

```clojure
; vector를 시퀀스로 만들기
(seq [1 2 3])  ; (1 2 3)

; set을 시퀀스로 만들기
(seq #{"a" "b" "c"}) ; ("a" "b" "c")

; map을 시퀀스로 만들기
(seq {1 "a", 2 "b", 3 "c"}) ; ([1 "a"] [2 "b"] [3 "c"])
```

`next`는 `(seq (rest x))`와 같다.

```clojure
(next [1 2 3])        ; (2 3)
(next {1 "a", 2 "b"}) ; ([2 "b"])
```

### range, repeat, iterate, take

`take`는 주어진 시퀀스의 첫 n개의 원소를 리턴한다.

```clojure
(take 2 [:a :b :c :d :e]) ; (:a :b)
(take 3 [11 22 33 44 55]) ; (11 22 33)
```

`range`는 특정 범위의 시퀀스를 만들어 리턴한다.

```clojure
(range 5)      ; (0 1 2 3 4)
(range 5 10)   ; (5 6 7 8 9)
(range 5 10 2) ; (5 7 9)

(take 3 (range 5 10)) ; (5 6 7)
```

`repeat`은 주어진 원소를 반복한다.

```clojure
(repeat 3 1)      ; (1 1 1)
(repeat 5 :a)     ; (:a :a :a :a :a)
(repeat 4 "test") ; ("test" "test" "test" "test")
```

단, `repeat`은 인자를 1개만 주면 무한히 반복하므로 `take`를 사용해 무한반복을 방지하도록 하자.

```clojure
(take 10 (repeat 1)) ; (1 1 1 1 1 1 1 1 1 1)
```

`iterate`는 무한히 반복하는 시퀀스를 만들어준다.

```clojure
(take 3 (iterate inc 10)) ; (10 11 12)
```

위의 코드는 `10`부터 1씩 증가하는(`inc` 함수 사용) 무한한 시퀀스에서 `take`를 사용해서 앞의 3개만 추출한 결과를 리턴한다.

### cycle, interleave, interpose

`cycle`은 컬렉션을 무한히 반복하는 시퀀스를 리턴한다.

```clojure
(take 10 (cycle [1 7 99]))
; (1 7 99 1 7 99 1 7 99 1)
```

`interleave`는 두 컬렉션을 교차시켜서 반복시킨다. 단 두 컬렉션 중 하나가 다 소진되면 반복을 멈춘다.

```clojure
(interleave (range 1 10) ["홀" "짝"]) ; (1 "홀" 2 "짝")

(interleave
  (range 1 10)
  (cycle ["홀" "짝"]))
; (1 "홀" 2 "짝" 3 "홀" 4 "짝" 5 "홀" 6 "짝" 7 "홀" 8 "짝" 9 "홀")
```

`interpose`는 `interleave`와 비슷하지만 구분자를 넣을 수 있다는 특징이 있다.

```clojure
(interpose "," [1 2 3]) ; (1 "," 2 "," 3)
```

`apply`를 써서 `str`에 시퀀스를 인자로 적용해주면 다음과 같이 문자열을 콤마 조인시킬 수도 있다.

```clojure
(apply str (interpose "," [1 2 3])) ; "1,2,3"
```

하지만 그냥 문자열 join이라면 이미 `string/join`이 있으므로 굳이 `apply`를 쓰지 않아도 된다.

```clojure
(clojure.string/join "," [1 2 3]) ; "1,2,3"
```

`clojure.string/join`을 쓰는 게 좀 아쉽다면 `use`를 써도 된다.

```
(use 'clojure.string)
(join "," [1 2 3]) ; "1,2,3"
```

### vec, set, hash-set

`vec`은 vector를 만들어 준다.

```clojure
(vec '(1 2 3)) ; [1 2 3]
(type (vec '(1 2 3))) ; clojure.lang.PersistentVector
```

`set`은 주어진 컬렉션을 set으로 만들어 리턴한다.

```clojure
(set [1 2 3])  ; #{1 3 2}
(set '(1 2 3)) ; #{1 3 2}
```

`hash-set`은 컬렉션이 아니라 인자를 받는데, 결과 타입은 `set`과 다르지 않다.

```clojure
(hash-set 1 2 3) ; #{1 3 2}

(type (set '(1 2 3)))   ; clojure.lang.PersistentHashSet
(type (hash-set 1 2 3)) ; clojure.lang.PersistentHashSet
```

`hash`가 아니라 굳이 `hash-set`을 쓰겠다면 `apply`를 써도 될 것 같다. 하지만 이렇게 쓸 일은 없을 것 같다.

```clojure
(apply hash-set [1 2 3]) ; #{1 3 2}
```

### filter

`filter`는 이름 그대로의 역할을 한다.

```clojure
(filter neg? [1 -2 3 -4 5 -6]) ; (-2 -4 -6)
```

`neg?`는 음수값을 판별하는 함수이다. 즉, 다음과 같이 해도 똑같다.

```clojure
(filter (fn [x] (< x 0)) [1 -2 3 -4 5 -6])
; (-2 -4 -6)
````

익명함수 축약 문법을 사용하면 이렇게도 할 수 있겠다.

```clojure
(filter #(< % 0) [1 -2 3 -4 5 -6])
; (-2 -4 -6)
```

### take-while, drop-while

`take-while`은 주어진 함수가 실패하는 지점까지의 컬렉션을 리턴한다.

```clojure
(filter even? [2 4 5 8 10 11 12])
; (2 4 8 10 12)

(take-while even? [2 4 5 8 10 11 12])
; (2 4)
```

위의 예제는 `take-while`은 짝수가 아닌 5 에서 멈추고 `(2 4)`를 리턴했다.
`filter`와는 다르다는 점을 분명히 기억해 두자. `filter`였다면 뒤에 있는 짝수인 8, 10, 12도 추가됐을 것이다.

`filter`와 `take-while`의 차이를 Java 코드로 살펴보자.

```java
// filter
List<Integer> list = List.of(2, 4, 5, 8, 10, 11, 12);
List<Integer> result = new ArrayList<>();
for (int num : list) {
  if (num % 2 == 0) {
    result.add(num);  // 루프를 끝까지 돌면서 수집한다.
  }
}
```

```java
// take-while
List<Integer> list = List.of(2, 4, 5, 8, 10, 11, 12);
List<Integer> result = new ArrayList<>();
for (int num : list) {
  if (num % 2 == 0) {
    result.add(num);
  } else {
    break;  // 조건이 만족되지 않으면 루프를 중단한다.
  }
}
```

`drop-while`은 `take-while`과 반대로 동작한다.

`take-while`이 조건에 맞는 아이템을 수집한다면, `drop-while`은 조건에 맞는 아이템을 제외한다.

```clojure
(drop-while even? [2 4 5 8 10 11 12])
; (5 8 10 11 12)
```

`drop-while`도 앞부분의 2, 4는 제외했지만 drop을 멈춘 이후에 나온 짝수인 8, 10, 12는 그대로 남겨두고 있다.

### split-at, split-with

`split-at`은 컬렉션을 쪼갠다.

```clojure
(split-at 3 ["a" "b" "c" "d" "e" "f" "g"])
; [("a" "b" "c") ("d" "e" "f" "g")]
```

`split-with`는 체크 함수를 기준으로 컬렉션을 쪼갠다. `filter`처럼 작동하지는 않고, 함수가 `false`를 리턴하는 곳을 기준으로 쪼갠다.

```clojure
(split-with even? [0 2 4 5 6 8])
; [(0 2 4) (5 6 8)]
```

### every?, not-every?

```clojure
(every? zero? [0 0 0 1 0]) ; false
(every? zero? [0 0 0 0 0]) ; true

(not-every? zero? [0 0 0 1 0]) ; true
(not-every? zero? [0 0 0 0 0]) ; false
```

### map, reduce

```clojure
(map #(* 10 %) [1 2 3]) ; (10 20 30)

(reduce * [2 3 10]) ; 60

(reduce #(- %1 %2) [2 3 10]) ; -11
; 2 - 3 - 10 의 결과는 -11
```

### sort, sort-by, reverse

```clojure
(sort [2 1 3])                    ; (1 2 3)
(sort (fn [a b] (< a b)) [2 1 3]) ; (1 2 3)
(sort (fn [a b] (> a b)) [2 1 3]) ; (3 2 1)
```

위의 예제 중 익명 함수를 사용한 것은 이렇게 표현하는 것이 좀 더 심플할 것이다.

```clojure
(sort < [2 1 3]) ; (1 2 3)
(sort > [2 1 3]) ; (3 2 1)
```

`sort-by`는 구조체의 특정 멤버를 기준으로 정렬할 수 있다.

```clojure
(sort-by :grade > [{:grade 83} {:grade 90} {:grade 77}])
; ({:grade 90} {:grade 83} {:grade 77})
(sort-by :grade < [{:grade 83} {:grade 90} {:grade 77}])
; ({:grade 77} {:grade 83} {:grade 90})
```

`reverse`는 시퀀스를 뒤집는다.

```clojure
(reverse [1 2 3]) ; (3 2 1)
```

### for

다른 언어의 `for`와는 다르다. Clojure의 `for`는 루프 키워드가 아니라 다양한 조건을 받아 새로운 리스트를 만들어내는 함수다.

```clojure
(for
  [x '(1 2 3)]
  (* 2 x))
; (2 4 6)
```

이 코드를 Javascript로 표현하면 다음과 같다.

```javascript
[1, 2, 3].map(x => 2*x); // [2, 4, 6]
```

`:when` 키워드를 사용하고 뒤에 함수를 제공하면 `filter`로 작동한다.

```clojure
(for
  [x '(1 -2 3) :when (> x 0)]
  (* 10 x))
; (10 30)
```

Javascript로는 다음과 같다.

```javascript
[1, -2, 3]
  .filter(x => x > 0)   // :when (> x 0)
  .map(x => 10 * x);    // (* 10 x)
// [10, 30]
```

`:let`을 사용하면 임시 변수를 사용할 수 있다.

```clojure
(for
  [x [1 -2 3]
  :let [temp (* x 100)]
  :when (pos? temp)]
  (str temp "%"))
; ("100%" "300%")
```

Javascript로는 다음과 같다.

```javascript
[1, -2, 3]
  .map(x => x * 100)    // :let [temp (* x 100)]
  .filter(x => x > 0)   // :when (pos? temp)]
  .map(x => `${x}%`)    // (str temp "%")
// ['100%', '300%']
```

다음 예제는 책 '프로그래밍 클로저'의 예제를 일부 수정한 것인데, `[]` 내에서 두 개의 임시변수를 생성해 사용한다.[^programming-clojure-121] 이 에제는 체스판의 모든 위치를 출력한다.

```clojure
(for
  [col "ABCDEFGH" row (range 1 9)]
  (format "%c%d" col row))

; ("A1" "A2" "A3" ... "H8")
```

Python에서 2중 루프를 사용해 비슷한 일을 한다면 이럴 것 같다.

```python
col = list('ABCDEFGH')
row = range(1, 9)
for c in col:
  for r in row:
    print('{}{}'.format(c, r))
```

## lazy sequence

Clojure의 시퀀스 대부분은 lazy하다. 다음은 '프로그래밍 클로저'에 등장하는 예제이다.[^programming-clojure-123]

```clojure
(def x
  (for
    [i (range 1 3)]
    (do (println i) i)))
```

이 코드에는 `(println i)`가 있는데도, 이 코드를 실행해도 출력 결과는 나오지 않는다. lazy하기 때문에 아직 실행이 미뤄져 있는 것이다.

`doall`을 사용하면 지연된 연산을 실행할 수 있다.

```clojure
(doall x)
1
2
=> (1 2)
```

`dorun`은 `doall`처럼 작동하지만 실행 과정에서 접근했던 원소를 메모리에 보존하지 않는다고 한다. 그래서 `nil`을 리턴한다. `dorun`을 사용하면 굉장히 커서 메모리에 부담이 되는 컬렉션도 취급할 수 있을 것으로 보인다.

```clojure
(dorun x)
1
2
=> nil
```

다만, `dorun`과 `doall`은 Clojure에서는 거의 사용되지 않는 함수라고 한다.

## map 연산

`keys`로 map의 key, `vals`로 map의 value를 얻을 수 있다.

```clojure
(def m
  {:apple "사과",
   :orange "오렌지"})

(keys m) ; (:apple :orange)
(vals m) ; ("사과" "오렌지")
```

map을 함수처럼 사용하고 key를 넘기면 값이 나온다. 대안이 필요하다면 `get`을 쓰면 된다.

```clojure
(m :apple) ; "사과"
(get m :pear "없는 과일입니다") ; "없는 과일입니다"
```

내가 지금까지 경험한 언어들과 굉장히 다른 느낌인데, map의 key로 키워드를 사용한다면 이런 것도 된다.

```clojure
(:apple m) ; "사과"
```

`contains?`를 통해 map에 등록된 key인지 확인할 수 있다.

```clojure
(contains? m :orange) ; true
(contains? m :pear) ; false
```

`assoc`를 사용하면 새로운 엔트리가 추가된 map을 얻을 수 있다. 원래 있던 map은 immutable이므로 이렇게 새로 생성된 map은 새로운 이름으로 할당해줘야 쓸 수 있다는 점에 주의해야 한다.

```clojure
(assoc m :banana "바나나")
; {:apple "사과", :orange "오렌지", :banana "바나나"}
```

`dissoc`를 쓰면 해당 key를 제거한 map을 얻을 수 있다. 이것도 새로 할당해줘야 쓸 수 있다는 점에 주의해야 한다.

```clojure
(dissoc m :orange)
; {:apple "사과"}
```

`select-keys`를 쓰면 주어진 key만 갖는 map이 리턴된다.

```clojure
(select-keys m [:apple :pear :banana])
; {:apple "사과"}
```

`merge`는 두 map을 합친 결과를 리턴한다. 중복 key가 있다면 나중 것이 선택된다.

```clojure
(merge
  {:apple "사과" :orange "오렌지"}
  {:orange "오렌지!" :banana "바나나"})

; {:apple "사과", :orange "오렌지!", :banana "바나나"}
```

`merge-with`는 함수를 사용해 중복 key의 value를 처리한다.

```clojure
(merge-with
  str
  {:apple "사과" :orange "오렌지"}
  {:orange "오렌지!" :banana "바나나"})

; {:apple "사과", :orange "오렌지오렌지!", :banana "바나나"}
```

`str` 함수를 줬더니 `오렌지`와 `오렌지!`가 합쳐져서 `오렌지오렌지!`가 됐다.

## set 연산

`union`으로 두 set를 합친 결과(합집합)를 얻을 수 있다.

```clojure
(def s1 #{:apple :orange})
(def s2 #{:orange :banana})

(clojure.set/union s1 s2)
; #{:orange :apple :banana}
```

`intersection`은 교집합이다.

```clojure
(clojure.set/intersection s1 s2)
; #{:orange}
```

`difference`는 차집합이다.

```clojure
(clojure.set/difference s1 s2)
; #{:apple}
```

`select`는 익명 함수를 넘겨 필터링을 할 수 있다. 하지만 `filter`를 사용해도 문제는 없다.

```clojure
(clojure.set/select #(= :orange %) s1)
; #{:orange}

(filter #(= :orange %) s1)
; (:orange)
```

`rename`은 좀 굉장한데, `key`를 일괄적으로 수정해 준다.

```clojure
(def fruit
  #{
    {:name "apple", :korean "사과"}
    {:name "orange", :korean "오렌지"}})

(clojure.set/rename fruit {:name :english})
; #{
    {:korean "오렌지", :english "orange"}
    {:korean "사과", :english "apple"}}
```

잘 보면 `:name`이 `:english`로 한꺼번에 바뀌었다.

이 외에도 다양한 함수들이 있으니 나중에 필요할 때 찾아보자.

## 참고문헌

- 프로그래밍 클로저 / 스튜어트 할로웨이 저 / 유찬우 역 / 인사이트(insight) / 초판 1쇄 발행 2010년 06월 20일 / 원제 : Programming Clojure (2009)

## 주석

[^programming-clojure-121]: 프로그래밍 클로저. 4장. 121쪽.
[^programming-clojure-123]: 프로그래밍 클로저. 4장. 123쪽.

