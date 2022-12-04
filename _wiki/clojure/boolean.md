---
layout  : wiki
title   : Clojure boolean
summary : 
date    : 2021-12-12 15:54:43 +0900
updated : 2021-12-12 20:30:11 +0900
tag     : clojure
resource: F0/C64250-DA4A-4475-A69C-94B6054B259F
toc     : true
public  : true
parent  : [[/clojure]]
latex   : false
---
* TOC
{:toc}

이 문서는 [Clojure 1.11.0 버전]( https://github.com/clojure/clojure/releases/tag/clojure-1.11.0-alpha3 )을 기준으로 합니다.

## 타입

Clojure의 `true`와 `false`는 `java.lang.Boolean` 타입이다.

```clojure
(type true)  ; java.lang.Boolean
(type false) ; java.lang.Boolean
```

[boolean? 함수]( https://github.com/clojure/clojure/blob/8ebad0ab3f912932d94874120cad89493f2aa22e/src/clj/clojure/core.clj#L521 )는 주어진 타입이 `Boolean`이면 `true`를 리턴한다.

```clojure
(boolean? true) ; true
(boolean? 123)  ; false
```

## =

[= 함수]( https://github.com/clojure/clojure/blob/8ebad0ab3f912932d94874120cad89493f2aa22e/src/clj/clojure/core.clj#L803 )는 주어진 값들이 같으면 `true`를 리턴한다.

```clojure
(= true true) ; true
(= 1 1 1)     ; true
```

여러 값이 주어졌을 때에는 하나라도 다른 값이 있다면 `false`를 리턴한다.

```clojure
(= 1 1 2) ; false
```

[= 함수]( https://github.com/clojure/clojure/blob/8ebad0ab3f912932d94874120cad89493f2aa22e/src/clj/clojure/core.clj#L803 )는
Java의 `equals` 메소드를 사용한다는 점을 기억해 두자.

```clojure
;equals-based
#_(defn =
  "Equality. Returns true if x equals y, false if not. Same as Java
  x.equals(y) except it also works for nil. Boxed numbers must have
  same type. Clojure's immutable data structures define equals() (and
  thus =) as a value, not an identity, comparison."
  {:inline (fn [x y] `(. clojure.lang.Util equals ~x ~y))
   :inline-arities #{2}
   :added "1.0"}
  ([x] true)
  ([x y] (clojure.lang.Util/equals x y))
  ([x y & more]
   (if (= x y)
     (if (next more)
       (recur y (first more) (next more))
       (= y (first more)))
     false)))
```

여기에서 `([x y] (clojure.lang.Util/equals x y))`을 주목하자.

[clojure.lang.Util.equals]( https://github.com/clojure/clojure/blob/8ebad0ab3f912932d94874120cad89493f2aa22e/src/jvm/clojure/lang/Util.java#L128 )는 이렇게 생겼다.

```java
static public boolean equals(Object k1, Object k2){
  if(k1 == k2)
    return true;
  return k1 != null && k1.equals(k2); // equals를 사용한다
}
```

## not

`not` 함수는 `ture`가 주어지면 `false`를 리턴하고, `false`가 주어지면 `true`를 리턴한다. 다른 언어처럼 `!`을 사용하지 않으니 주의.

```clojure
(not true)  ; false
(not false) ; true

(not 1)     ; false
(not 0)     ; false
(not "foo") ; false
(not nil)   ; true ; Clojure에서는 false와 nil 만 false로 평가된다.
```

[`not` 함수의 소스코드]( https://github.com/clojure/clojure/blob/8ebad0ab3f912932d94874120cad89493f2aa22e/src/clj/clojure/core.clj#L526 )는 다음과 같다.

```clojure
(defn not
  "Returns true if x is logical false, false otherwise."
  {:tag Boolean
   :added "1.0"
   :static true}
  [x] (if x false true))
```

### not=

[not= 함수]( https://github.com/clojure/clojure/blob/8ebad0ab3f912932d94874120cad89493f2aa22e/src/clj/clojure/core.clj#L821 )는 하나라도 다른 값이 섞여 있다면 `true`를 리턴한다.

```clojure
(not= 1 1 2) ; true
(not= 1 2 3) ; true

(not= 1 1 1)       ; false
(not= nil nil nil) ; false

(not= false false false) ; false
(not= true true true)    ; false
```

## true?, false?

[`true?` 함수]( https://github.com/clojure/clojure/blob/8ebad0ab3f912932d94874120cad89493f2aa22e/src/clj/clojure/core.clj#L514 )는 주어진 값이 `true`이면 `true`를 리턴한다.

```clojure
(true? true)
=> true
(true? false)
=> false
```

[`false?` 함수]( https://github.com/clojure/clojure/blob/8ebad0ab3f912932d94874120cad89493f2aa22e/src/clj/clojure/core.clj#L507 )는 주어진 값이 `false`이면 `true`를 리턴한다.

```clojure
(false? true)
=> false
(false? false)
=> true
```

[`false?` 함수의 소스코드]( https://github.com/clojure/clojure/blob/8ebad0ab3f912932d94874120cad89493f2aa22e/src/clj/clojure/core.clj#L507 )는 다음과 같다.

```clojure
(defn false?
  "Returns true if x is the value false, false otherwise."
  {:tag Boolean,
   :added "1.0"
   :static true}
  [x] (clojure.lang.Util/identical x false))
```

주어진 값 `x`와 `false`를 `identical`로 비교하고 있다.

참고로 [`identical`은 단순히 Java의 `==` 연산자를 사용한다.]( https://github.com/clojure/clojure/blob/8ebad0ab3f912932d94874120cad89493f2aa22e/src/jvm/clojure/lang/Util.java#L134 )

```java
static public boolean identical(Object k1, Object k2){
  return k1 == k2;
}
```

## and

`and`는 이렇게 사용한다.

```clojure
(and true true)   ; true
(and false false) ; false
(and true false)  ; false

(and true true false) ; false
(and true true true) ; true
```

`and`는 하나하나 비교해가다가 `true`로 평가되지 않는 값(`false`와 `nil`)이 나오면 그 값을 리턴한다.

```clojure
(and true true nil true) ; nil
(and true true nil false true) ; nil
(and true true false nil true) ; false
```

## or

`or`은 이렇게 사용한다.

```clojure
(or true true)   ; true
(or false true)  ; true
(or false false) ; false
(or false false true) ; true
```

`or`도 하나하나 비교해가다가 `true`로 평가되는 값이 나오면 그 값을 바로 리턴한다.

```clojure
(or false false 0) ; 0
(or false false 1) ; 1
(or 1 false)       ; 1
```

## 참고문헌

- [Clojure 1.11.0 소스코드 - clojure/lang/Util.java]( https://github.com/clojure/clojure/blob/8ebad0ab3f912932d94874120cad89493f2aa22e/src/jvm/clojure/lang/Util.java )
- [Clojure 1.11.0 소스코드 - clojure/core.clj]( https://github.com/clojure/clojure/blob/8ebad0ab3f912932d94874120cad89493f2aa22e/src/clj/clojure/core.clj#L521 )

