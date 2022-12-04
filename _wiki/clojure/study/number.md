---
layout  : wiki
title   : Clojure number
summary : 작성중인 문서
date    : 2021-12-26 11:08:25 +0900
updated : 2022-05-15 23:36:00 +0900
tag     : clojure
resource: D0/E71F9A-C545-44DE-B4A7-2D990E706C72
toc     : true
public  : true
parent  : [[/clojure/study]]
latex   : false
---
* TOC
{:toc}

## 이 문서를 읽기 위한 준비물: 타입 조사 방법

`class`와 `type` 함수를 사용해 타입을 조사할 수 있다.
두 함수는 `doc` 함수로 조사해 보면 다음과 같은 차이점이 있다.

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

## number category

Clojure는 다음과 같이 수 카테고리를 분류한다.[^clojure-equality]

- 정수, 유리수
    - 정수: Java의 `java.lang.Long`과 `java.lang.Integer`. 기본값은 `Long`.
    - 유리수: [`clojure.lang.Ratio`]( https://github.com/clojure/clojure/blob/clojure-1.11.0-alpha3/src/jvm/clojure/lang/Ratio.java ).
- 부동소수점 수
    - Java의 `java.lang.Float`과 `java.lang.Double`. 기본값은 `Double`.
- BigDecimal
    - Java의 `java.math.BigDecimal`.

### 동등성 비교

수의 동등성 비교에는 `=`, `==`를 사용한다.

Clojure의 `=`는 수의 크기뿐 아니라 카테고리도 같아야 `true`를 리턴하므로 카테고리를 생각하며 사용해야 한다.

```clojure
; 카테고리가 같은 경우
(= 1 2/2)   ; true   정수와 유리수
```

```clojure
; 카테고리가 다른 경우
(= 1.0 1)   ; false   Double과 Long
(= 1M 1)    ; false   BigDecimal과 Long
(= 1/2 0.5) ; false   Ratio와 Double
```

`==`는 수의 크기 비교 전용이며, 카테고리를 무시한다. Java의 `==`처럼 주소 비교가 아니라는 점에 주의할 것.

```clojure
(== 1.0 1) ; true
(== 1M 1)  ; true
(== 2/2 1) ; true
(== 1/4 0.25M) ; true
(== 1/4 0.25) ; true
```

컴퓨터에 익숙하다면 [[/floating-point#01&#45;&#45;02&#45;&#45;030000000000000004&#45;%EB%AC%B8%EC%A0%9C]]{`0.1 + 0.2` 문제}를 알고 있을 것이다.
이 문제는 [[/floating-point]]{부동소수점}의 특성과 관련되어 있다.
그러므로 다음 예제처럼 작업한다면 `=`, `==` 둘 중 무엇을 써도 컴퓨터 바깥 세상의 수학과 같은 결과가 나오지 않는다.

```clojure
(+ 0.1 0.2) ; 0.30000000000000004

(== (+ 0.1 0.2) 0.3) ; false
(= (+ 0.1 0.2) 0.3)  ; false
```

그래서 이런 경우엔 유리수를 사용하거나 BigDecimal을 사용해야 원하는 결과가 나온다.

```clojure
(= (+ 1/10 2/10) 3/10)  ; true
(== (+ 1/10 2/10) 3/10) ; true

(= (+ 0.1M 0.2M) 0.3M)  ; true
(== (+ 0.1M 0.2M) 0.3M) ; true
```

### 크기 비교

Clojure도 Java처럼 `<`, `<=`, `>`, `>=`를 사용한다.

```clojure
(< 1 2)  ; true   1 <  2
(<= 1 2) ; true   1 <= 2
(> 1 2)  ; false  1 >  2
(>= 1 2) ; false  1 >= 2
```

Java에 익숙한 상태에서 이런 비교 코드를 접하면 굉장히 생소하게 보일 수 있다.
하지만 이 표기법은 3개 이상의 수를 비표할 때 상당한 편리함이 있다.

```clojure
(< 3 4 5 6)   ; true
(< 3 4 5 1 8) ; false
```

변수 `x`가 특정 범위에 있는지 검사할 때 Java였다면 다음과 같이 작업했을 것이다.

```java
if (10 <= x && x <= 20) {
    // ...
}
```

하지만 Clojure 에서는 이렇게 하면 된다.

```clojure
(if (<= 10 x 20)
    ; ...
)
```


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

Clojure는 `Ratio` 타입을 기본으로 지원하고 있기 때문에 나눗셈 연산자를 그대로 사용하면 유리수로 평가된다는 점을 기억해둘 필요가 있다.

```clojure
(quot 9 4)  ; 2    몫
(rem 9 4)   ; 1    나머지
(/ 9 4)     ; 9/4  비율, 유리수

(class (/ 9 4))   ; 9/4의 타입은 clojure.lang.Ratio
(type (/ 9 4))    ; 9/4의 타입은 clojure.lang.Ratio
```

## 유리수

유리수를 만드는 가장 쉬운 방법은 `/` 표기법을 쓰거나 `/` 함수를 사용하는 것이다.

```clojure
1/5     ;; => 1/5
(/ 1 3) ;; => 1/3

(type 1/3)     ;; => clojure.lang.Ratio
(type (/ 1 3)) ;; => clojure.lang.Ratio
```

다음 세 표현식은 모두 똑같이 `1/3`로 평가된다.

```clojure
(+ (/ 1 6) (/ 1 6)) ;; => 1/3
(+ 1/6 (/ 1 6))     ;; => 1/3
(+ 1/6 1/6)         ;; => 1/3
```

또는 `rationalize` 함수를 써도 된다.

```clojure
; 유리수가 아님
1.07e-20 ;; => 1.07E-20
(type 1.07e-20) ;; => java.lang.Double

; 유리수
(rationalize 1.07e-20) ;; => 107/10000000000000000000000
(type (rationalize 1.07e-20)) ;; => clojure.lang.Ratio

; 루트 2
(rationalize (Math/sqrt 2)) ;; => 14142135623730951/10000000000000000

; PI
(rationalize Math/PI) ;; => 3141592653589793/1000000000000000
```

몇 번 사칙연산을 해보면 편리하게 자동으로 약분이 된다는 것도 알 수 있다.

```clojure
(+ 1/6) (/ 1 6)) ;; => 1/3
(+ (/ 1 6) (/ 8 6)) ;; => 3/2
```

유리수 검사 함수는 `ratio?`가 있는데 `rational?`과 이름이 헷갈리므로 주의해야 한다.

```clojure
(type 22/7)      ;; => clojure.lang.Ratio
(ratio? 22/7)    ;; => true
(rational? 22/7) ;; => true

(type 22)        ;; => java.lang.Long
(ratio? 22)      ;; => false
(rational? 22)   ;; => true

(type 2.2)       ;; => java.lang.Double
(ratio? 2.2)     ;; => false
(rational? 2.2)  ;; => false

(type 2.2M)      ;; => java.math.BigDecimal
(ratio? 2.2M)    ;; => false
(rational? 2.2M) ;; => true

(type 22222222222222222222222222222222N)      ;; => clojure.lang.BigInt
(ratio? 22222222222222222222222222222222N)    ;; => false
(rational? 22222222222222222222222222222222N) ;; => true
```

- `ratio?`: 주어진 수가 `clojure.lang.Ratio` 타입인 경우에만 `true`를 리턴한다.
- `rational?`: 주어진 수가 부동소수점 수가 아니라면 `true`를 리턴한다.

| type                 | `ratio?` | `rational?` |
|----------------------|----------|-------------|
| java.lang.Long       | false    | true        |
| java.lang.Integer    | false    | true        |
| java.lang.Double     | false    | `false`     |
| java.lang.Float      | false    | `false`     |
| java.math.BigDecimal | false    | true        |
| clojure.lang.BigInt  | false    | true        |
| clojure.lang.Ratio   | `true`   | true        |

분자와 분모는 각각 `numerator`, `denominator` 함수로 얻을 수 있다.

```clojure
(numerator 3/2)   ;; => 3
(denominator 3/2) ;; => 2
```

## 타입

### promotion

Long이나 Double의 경계를 넘나드는 수나 연산을 다루면 자동으로 프로모션이 발생한다.

```clojure
(def a-num 1)
(type a-num) ;; => java.lang.Long

(def b-num (+ a-num 99999999999999999999)) ;; => 100000000000000000000N
(type b-num) ;; => clojure.lang.BigInt

(def c-num (+ a-num 99999999999999999999.8)) ;; => 1.0E20
(type c-num) ;; => java.lang.Double

(def d-num (+ a-num 99999999999999999999.8M)) ;; => 100000000000000000000.8M
(type d-num) ;; => java.math.BigDecimal
```

### overflow

Java에서 `Long.MAX_VALUE`에 `1`을 더하면 다음과 같이 오버플로우가 발생한다.

```java
long num = Long.MAX_VALUE + 1;
// -9223372036854775808
```

그러나 Clojure에서는 `ArithmeticException` 예외가 던져진다.

```clojure
(+ Long/MAX_VALUE 1)

; Execution error (ArithmeticException) at ... (REPL:57).
; integer overflow
```


## 정밀도

### truncation

```clojure
;                               ↓                           ↓
(def a-number 0.123456789123456789) ;; => 0.12345678912345678
(def b-number 0.123456789123456780) ;; => 0.12345678912345678

(= a-number b-number) ;; => true
(type a-number) ;; => java.lang.Double
(type b-number) ;; => java.lang.Double
```

위의 예제를 보면 `a-number`의 마지막 `9`가 절삭(truncation)되어 정밀도가 떨어졌음을 알 수 있다.

따라서 `a-number`를 더 작은 수인 `b-number`와 `=`로 비교하면 `true`로 평가된다.

정밀도를 보장하려면 수 마지막에 `M`을 붙여서 `java.math.BigDecimal` 타입으로 생성해 주어야 한다.

```clojure
(def a-number 0.123456789123456789M) ;; => 0.123456789123456789M
(type a-number) ;; => java.math.BigDecimal
```

### 부동소수점과 BigDecimal

앞에서 언급했던 `0.1 + 0.2` 문제를 다시 살펴보자.

```clojure
(+ 0.1 0.2) ; 0.30000000000000004
```

예상과 같다. 이걸 정확히 계산하려면 Java의 `BigDecimal` 타입을 사용하면 되는데, Clojure에서는 숫자에 postfix로 `M`을 붙이면 된다.

```clojure
(+ 0.1M 0.2M)   ; 0.3M
(class *1)      ; java.math.BigDecimal
```

>
참고: `*1`은 REPL에서 가장 최근에 평가한 결과를 의미한다. 그 이전은 `*2`.
{:style="background-color: #ecf1e8;"}

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

## 사용 예제

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
- 클로저 프로그래밍의 즐거움 / 마이클 포거스, 크리스 하우저 공저 / 김선호 역 / 비제이퍼블릭(BJ퍼블릭) / 초판 1쇄 발행 2016년 03월 04일 / 원서 : The Joy of Clojure

## 주석

[^clojure-equality]: [Clojure Equality](https://clojure.org/guides/equality#numbers ) (한국어 번역: [[/clojure/equality]])
