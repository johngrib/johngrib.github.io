---
layout  : wiki
title   : Clojure number
summary : 
date    : 2021-12-26 11:08:25 +0900
updated : 2021-12-26 11:55:14 +0900
tag     : clojure
toc     : true
public  : true
parent  : [[/clojure/study]]
latex   : false
---
* TOC
{:toc}

## number category

Clojure는 다음과 같이 수 카테고리를 분류한다.[^clojure-equality]

- 정수, 분수(비율)
    - 정수: Java의 `java.lang.Long`과 `java.lang.Integer`. 기본값은 `Long`.
    - 분수: [`clojure.lang.Ratio`]( https://github.com/clojure/clojure/blob/clojure-1.11.0-alpha3/src/jvm/clojure/lang/Ratio.java ).
- 부동소수점 수
    - Java의 `java.lang.Float`과 `java.lang.Double`. 기본값은 `Double`.
- BigDecimal
    - Java의 `java.math.BigDecimal`.


## 사칙연산

Clojure는 Lisp 방언이므로 전위 표기법(prefix notation)을 사용한다. Java 코드와 비교해 보자.

| Java          | Clojure         |
|---------------|-----------------|
| `1 + 2`       | `(+ 1 2)`       |
| `1 + (2 * 3)` | `(+ 1 (* 2 3))` |
| `1 + 2 + 3`   | `(+ 1 2 3)`     |
| `2 * 3 * 4`   | `(* 2 3 4)`     |
| `5 - 2`       | `(- 5 2)`       |
| `5 / 2`       | `(quot 5 2)`    |
| `5 % 2`       | `(rem 5 2)`     |

Clojure는 `Ratio` 타입을 기본으로 지원하고 있기 때문에 나눗셈 연산자를 그대로 사용하면 분수로 평가된다는 점을 기억해둘 필요가 있다.

```clojure
(quot 9 4)  ; 2    몫
(rem 9 4)   ; 1    나머지
(/ 9 4)     ; 9/4  비율, 분수

(class (/ 9 4))   ; 9/4의 타입은 clojure.lang.Ratio
(type (/ 9 4))    ; 9/4의 타입은 clojure.lang.Ratio
```

마지막 줄에 주목. `class`와 `type`을 사용해 타입을 알아낼 수 있다는 것도 기억해두자.

### 타입 조사하기

`class`와 `type`이 똑같이 작동하는 것으로 보이는데 REPL에서 `(doc type)`, `(doc class)`로 조사해 보니 다음과 같은 차이점이 있었다.

```
(doc type)
-------------------------
clojure.core/type
([x])
  Returns the :type metadata of x, or its Class if none
=> nil

(doc class)
-------------------------
clojure.core/class
([x])
  Returns the Class of x
=> nil
```

- `type`: 주어진 값의 metadata에 들어있는 `:type`을 리턴한다. 만약 `:type`이 없다면 Class를 리턴한다.
- `class`: 주어진 값의 Class를 리턴한다.

숫자의 타입을 조사해보면 Clojure는 기본적으로 `Double`과 `Long`을 사용하고 있다는 것을 확인할 수 있다.

```clojure
(type 1.0)  ; java.lang.Double
(type 1)    ; java.lang.Long
```

## 부동소수점과 BigDecimal

한편 부동소수점 연산은 어떨까? Clojure가 기본적으로 부동소수점을 사용한다면 `0.1 + 0.2`의 결과는 `0.3`이 아니라 `0.30000000000000004`일 것이다.

실험해 보자.

```clojure
(+ 0.1 0.2) ; 0.30000000000000004
```

예상과 같다. 이걸 정확히 계산하려면 Java의 `BigDecimal` 타입을 사용하면 되는데, Clojure에서는 숫자에 postfix로 `M`을 붙이면 된다.

```clojure
(+ 0.1M 0.2M)   ; 0.3M
(class *1)      ; java.math.BigDecimal
```

여기에서 `*1`은 REPL에서 가장 최근에 평가한 결과를 의미한다. 그 이전은 `*2`.

만약 이미 정의된 숫자를 사용해 `BigDecimal` 타입의 인스턴스를 생성하려면 다음과 같이 하면 된다.

```clojure
(bigdec "1.0")  ; 1.0M
(bigdec 1.0)    ; 1.0M
(bigdec 0.1)    ; 0.1M
```

Java의 `BigDecimal` 클래스의 생성자를 사용하고 싶다면 그냥 `new` 키워드를 사용해도 된다.

```clojure
(new BigDecimal "1.0")  ; 1.0M
(new BigDecimal "0.1")  ; 0.1M
(new BigDecimal 0.1)    ; 0.1000000000000000055511151231257827021181583404541015625M
```

마지막 줄의 `0.1` 문제는 `0.1`을 부동소수점으로 표현할 때의 문제이므로 Java에서 `new BigDecimal(0.1)`을 쓰면 똑같은 결과가 나온다. 즉 Clojure의 문제는 아니다.

다만 `(bigdec 0.1)`은 `0.1M` 이었지만 `(new BigDecimal 0.1)`이 `0.1M`이 아니라는 것은 주목해야 한다.

`bigdec`은 `new BigDecimal`을 단순하게 래핑한 함수가 아니라는 것.
사용하게 되면 꼭 테스트 코드를 통해 실험해 보도록 하자.

## 거듭제곱

거듭제곱은 어떻게 표현할 수 있을까?

Javascript라면 `Math.pow(x, y)`를 사용하면 된다.[^javascript-exponentation]

```javascript
Math.pow(2, 10);    // 1024
```

이건 Python이 가장 쉽다. 거듭제곱 전용 연산자가 있기 때문이다.

```python
2 ** 10;    # 1024
```

Clojure에서는 거듭제곱 연산자를 기본으로 지원하지는 않는 것 같다. 그래서 다음과 같은 함수를 만들어 쓰면 될 것 같다.

```clojure
(defn power [x n]
  (reduce * (repeat n x)))

(power 2 10)  ; 1024
```

`*`도 함수 이름에 쓸 수 있는 문자이기 때문에 이렇게 할 수도 있다.[^clojure-star-star]

```clojure
(defn ** [x n]
  (reduce * (repeat n x)))

(** 2 10)  ; 1024
```

`(repeat 10 2)`는 `(2 2 2 2 2 2 2 2 2 2)`를 생산하므로, 이 결과에 `*`을 `reduce`하는 코드라 할 수 있다.

기본 연산자가 제공되지 않는 건 아쉽지만 `reduce`-`*`-`repeat`이라는 코드를 작성할 수 있다는 것이 재미있다.

Javascript에서 `Math.pow`를 사용하지 않고 굳이 비슷한 스타일의 코드를 작성한다면 다음과 같이 할 수 있겠다.

```javascript
function power(x, n) {
  return Array(n).fill(x).reduce((a, b) => a * b);
}

power(2, 10); // 1024
```

만약 만들어 쓰는 것이 귀찮거나 어떻게 Clojure 코드로 표현할 지 생각이 안 난다면 그냥 Java의 `java.lang.Math`의 `pow`를 가져다 써도 된다.

```clojure
(Math/pow 2 10) ; 1024.0
```

Clojure는 `java.lang`은 기본으로 `import`를 해둔다고 한다. 그래서 `Math/pow`를 저렇게 간단하게 불러 쓸 수 있는 것 같다.

## 계산 예제

Double과 BigDecimal의 합은 Double.

```clojure
(+ 1.0 3M)      ; 4.0
(+ 1.0 99999999999999999999999999999999999999999999999999999M) ; 1.0E53
```

8진수와 16진수는 모두 Long이므로 결과도 `java.lang.Long`.

```clojure
(+ 010 0xF) ; 23
```

```
(+ 10.0 0xF)    ; 25.0   Double과 16진수 Long의 합
(+ 1/2 010)     ; 17/2   Ratio와 8진수 Long의 합
```

과학 표기법.

```clojure
(+ 1 7.0E-10)   ; 1.0000000007
(+ 1 7.0E+10)   ; 7.0000000001E10
```

`Ratio` 타입은 자동으로 약분이 된다.

```clojure
(+ 1/3 3/9) ; 2/3
```


## 참고문헌

- [Equality (clojure.org)]( https://clojure.org/guides/equality )
- [clojure.lang.Ratio.java (github.com/clojure)]( https://github.com/clojure/clojure/blob/clojure-1.11.0-alpha3/src/jvm/clojure/lang/Ratio.java ) - clojure-1.11.0-alpha3의 `Ratio` Java 클래스
- [java.lang.Long.java (github.com/AdoptOpenJDK)]( https://github.com/AdoptOpenJDK/openjdk-jdk11/blob/master/src/java.base/share/classes/java/lang/Long.java ) - openjdk-jdk11의 `Long` Java 클래스
- [java.math.BigDecimal.java (github.com/AdoptOpenJDK)]( https://github.com/AdoptOpenJDK/openjdk-jdk11/blob/master/src/java.base/share/classes/java/math/BigDecimal.java ) - openjdk-jdk11의 `BigDecimal` Java 클래스

## 주석

[^clojure-equality]: [Clojure Equality](https://clojure.org/guides/equality#numbers ) (한국어 번역: [[/clojure/equality]])
