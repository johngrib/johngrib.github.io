---
layout  : wiki
title   : Clojure를 학습하며 남기는 기록과 예제 1
summary : 
date    : 2021-12-08 22:48:20 +0900
updated : 2021-12-08 23:40:17 +0900
tag     : clojure
toc     : true
public  : true
parent  : [[/clojure]]
latex   : false
---
* TOC
{:toc}

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

### set, hash-set, vec

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

`vec`은 vector를 만들어 준다.

```clojure
(vec '(1 2 3)) ; [1 2 3]
(type (vec '(1 2 3))) ; clojure.lang.PersistentVector
```


## 참고문헌

- 프로그래밍 클로저 / 스튜어트 할로웨이 저 / 유찬우 역 / 인사이트(insight) / 초판 1쇄 발행 2010년 06월 20일 / 원제 : Programming Clojure (2009)
