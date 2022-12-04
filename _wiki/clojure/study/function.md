---
layout  : wiki
title   : Clojure 함수
summary : 
date    : 2022-02-27 00:13:23 +0900
updated : 2022-02-27 00:32:42 +0900
tag     : clojure
resource: 55/9B3046-3345-45F6-B69B-72BF32A79CA8
toc     : true
public  : true
parent  : [[/clojure/study]]
latex   : false
---
* TOC
{:toc}

## 기본
### 함수 선언

```clojure
(defn hello [name]
  (println (str "Hello, " name)))

(hello "John")  ; Hello, John
```

```clojure
(defn hello
  "name 에게 인사를 합니다."    ; docstring
  [name]
  (println (str "Hello, " name)))
```

### 오버로딩

```clojure
(defn hello
  ([name]
   (println (str "Hello, " name)))
  ([name greeting]
   (println (str greeting " " name))))

(hello "John")                ; Hello, John
(hello "John" "Good morning") ; Good morning John
```

### 익명함수

```clojure
; fn 을 사용한 익명함수
(fn [name]
  (str "Hello, " name))

(fn [name greeting]
  (str greeting " " name))
```

```clojure
; # 를 사용한 축약표현
#(str "Hello, " %)  ; 인자가 1개라면 % 로 인자를 표현

#(str %2 " " %1)    ; 인자가 여러개라면 %1, %2, ... 로 인자 순서를 표현
```

### predicate

predicate는 마지막에 `?`를 붙이는 것이 관례다.

```clojure
(defn even?
  "n이 짝수이면 true를 리턴합니다."
  [n]
  (= (rem n 2) 0))  ; rem 은 나머지를 계산하는 함수
```

```clojure
(defn odd?
  "n이 홀수이면 true를 리턴합니다."
  [n]
  (not= (rem n 2) 0))
```

## 함수를 생성하는 함수

### partial

`partial`을 사용하면 currying을 할 수 있다.

```clojure
(defn add [a b] (+ a b))
(def add3 (partial add 3))

(add3 7)    ; 10
```

### comp

`comp`를 사용하면 여러 함수를 하나로 합성한 파이프라인을 만들 수 있다.

합성된 함수는 `comp`에 제공했던 함수를 오른쪽에서 왼쪽으로 실행한다.

```clojure
(defn append-a [s] (str s "a"))
(defn append-b [s] (str s "b"))
(defn append-c [s] (str s "c"))

((comp append-c append-a append-b) "111")   ; "111bac"
;                        111 에 b 를 붙이고
;               111b 에 a 를 붙이고
;      111ba 에 c를 붙인다
```

## 참고문헌

- 클로저 시작하기 / 캐린 마이어 저 / 박상규, 김만명, 김영태 공역 / 인사이트(insight) / 초판 1쇄 발행 2016년 04월 01일 / 원제: Living Clojure

