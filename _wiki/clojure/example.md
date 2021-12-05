---
layout  : wiki
title   : Clojure 학습
summary : 
date    : 2021-12-03 12:42:06 +0900
updated : 2021-12-05 19:20:01 +0900
tag     : clojure
toc     : true
public  : true
parent  : [[/clojure]]
latex   : false
---
* TOC
{:toc}

## 버전 확인

```
$ clojure --version
Clojure CLI version 1.10.3.1040
```

## 사칙연산

Clojure는 전위 표기법(prefix notation)을 사용한다. Java 코드와 비교해 보자.

| Java          | Clojure         |
|---------------|-----------------|
| `1 + 2`       | `(+ 1 2)`       |
| `1 + (2 * 3)` | `(+ 1 (* 2 3))` |
| `1 + 2 + 3`   | `(+ 1 2 3)`     |
| `2 * 3 * 4`   | `(* 2 3 4)`     |
| `5 - 2`       | `(- 5 2)`       |
| `5 / 2`       | `(quot 5 2)`    |
| `5 % 2`       | `(rem 5 2)`     |

Clojure는 ratio 타입을 기본으로 지원하고 있기 때문에 나눗셈 연산자를 그대로 사용하면 분수로 평가된다는 점을 기억해둘 필요가 있다.

```clojure
(quot 9 4)  ; 2    몫
(rem 9 4)   ; 1    나머지
(/ 9 4)     ; 9/4  비율, 분수

(println (class (/ 9 4)))   ; 9/4의 타입은 clojure.lang.Ratio
```

마지막 줄에 주목. `class`를 사용해 타입을 알아낼 수 있다는 것도 기억해두자.

### 타입 조사하기

`type`을 써도 `class`와 똑같이 작동하는 것으로 보이는데 REPL에서 `(doc type)`, `(doc class)`로 조사해 보니 다음과 같은 차이점이 있었다.

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

숫자의 타입을 조사해보면 Clojure는 기본적으로 `Double`과 `Long`을 사용하고 있다는 것을 알 수 있다.

```clojure
(type 1.0)  ; java.lang.Double
(type 1)    ; java.lang.Long
```

### 부동소수점과 BigDecimal

한편 부동소수점 연산은 어떨까? Clojure가 기본적으로 부동소수점을 사용한다면 `0.1 + 0.2`의 결과는 `0.3`이 아니라 `0.30000000000000004`일 것이다.

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
```

Java의 `BigDecimal` 클래스의 생성자를 사용하고 싶다면 그냥 `new` 키워드를 사용해도 된다.

```clojure
(new BigDecimal "1.0")  ; 1.0M
(new BigDecimal "0.1")  ; 0.1M
(new BigDecimal 0.1)    ; 0.1000000000000000055511151231257827021181583404541015625M
```

마지막 줄의 `0.1` 문제는 `0.1`을 부동소수점으로 표현할 때의 문제이므로 같은 코드를 쓰면 Java에서도 똑같은 결과가 나온다. Clojure의 문제는 아니다.

### 거듭제곱

거듭제곱은 어떻게 표현할 수 있을까?

Javascript라면 `Math.pow(x, y)`를 사용하면 된다.

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

`(repeat 10 2)`는 `(2 2 2 2 2 2 2 2 2 2)`를 생산하므로, 이 결과에 `*`을 `reduce`하는 코드라 할 수 있다.

기본 연산자가 제공되지 않는 건 아쉽지만 `reduce`-`*`-`repeat`이라는 코드를 작성할 수 있다는 것이 재미있다.

만약 이렇게 만들어 쓰는 것이 귀찮거나 어떻게 Clojure 코드로 표현할 지 생각이 안 난다면 그냥 Java의 `java.lang.Math`의 `pow`를 가져다 써도 된다.

```clojure
(Math/pow 2 10) ; 1024.0
```

Clojure는 `java.lang`은 기본으로 `import`를 해둔다고 한다. 그래서 `Math/pow`를 저렇게 간단하게 불러 쓸 수 있는 것 같다.

## 문자열 다루기

Clojure의 문자열 concatenation은 `str`을 사용하면 된다.

```clojure
(println (str "123" "456" "789"))
; 123456789
```

`String.format`은 Java와 똑같은 것 같다.

```clojure
(println
  (format "hello %s %d"
          "world" 123))
; hello world 123
```

문자열의 길이는 `count`로 셀 수 있다. 물론 Java `String`의 `length` 메소드도 사용할 수 있다.

```clojure
(println (count "hello"))
; 5
(println (.length "hello"))
; 5
```

`substring`은 `subs`를 사용한다. 물론 Java `String`의 `substring` 메소드도 사용할 수 있다.

```clojure
(println (subs "hello" 1 4))
; ell
(println (.substring "hello" 1 4))
; ell
(println (subs "hello" 1))
; ell
(println (.substring "hello" 1))
; ello
```

이렇게 Java의 메소드를 그대로 사용할 수 있는 건 꽤 편안하게 느껴진다.

반면 정규식을 사용한 `replace`는 Java보다 더 편리한 느낌이다. Clojure는 `#"pattern"`과 같이 정규식 리터럴을 따로 제공하는데, 정규식 내에서 역슬래시를 두 번 써서 이스케이프하지 않아도 된다.

```clojure
(println (clojure.string/replace
           "Hello World" #"^Hello\s" "---"))
; ---World
```

위의 `^Hello\s`를 잘 보면 공백문자 패턴으로 `\s`를 그대로 사용하고 있다. Java였다면 `\\s`로 사용해야 했을 것이다.

그럼에도 이 정규식 리터럴이 생성하는 것은 `java.util.regex.Pattern`이다.

다음은 Clojure 레퍼런스 문서에 있는 정규식 예제의 모습을 조금 수정한 것이다.

```clojure
(re-seq #"[0-9]+" "abs123def345ghi567")
;("123" "345" "567")

(re-find #"([-+]?[0-9]+)/([0-9]+)" "22/7")
;["22/7" "22" "7"]

(let
  [[a b c] (re-matches #"([-+]?[0-9]+)/([0-9]+)" "22/7")]
  [a b c])
;["22/7" "22" "7"]

(re-seq #"(?i)[fq].." "foo bar BAZ QUX quux")
;("foo" "QUX" "quu")
```

잘 살펴보면 정규식의 옵션 플래그는 `#"(?옵션)hello"` 처럼 정규식 패턴 앞쪽에 둔다는 것도 알 수 있다.

## 제어문

Clojure에서는 참/거짓을 구분해야 할 때에는 `nil`과 `false`가 아닌 모든 것은 `true`로 평가된다는 것만 기억하면 된다.

`if`는 `true`인 경우와 `false`인 경우의 표현식을 제공해주면 된다.

```clojure
(def b 10)
(println
  (if (> b 2)
    "b는 2보다 큽니다."
    "b는 2보다 크지 않습니다."))
```

`cond`를 `else if`처럼 쓸 수 있다.

```clojure
(def x 28)

(println
  (cond
    (< x 10) "10 미만"
    (< x 20) "10 이상 20 미만"
    (< x 30) "20 이상 30 미만"
    :else "30 초과")
  )
; 20 이상 30 미만
```

`case`는 `swtich`와 비슷하다.

```clojure
(def a "apple")
(case a
  "test" (println "테스트")
  "apple" (println "사과"))
; 사과
```

## Map

Clojure에서는 `{}`를 사용해 Map을 만들 수 있다.

```clojure
(def fruit
  {
   "apple"  "사과"
   "orange" "오렌지"
   })
```

`:`과 `,`만 없을 뿐, Javascript의 `Object`를 만드는 것과 비슷해 보인다.

```javascript
var fruit = {
  "apple"  : "사과",
  "orange" : "오렌지"
}
```

Java에서는 다음과 같이 `Map`을 만들어 사용한다.

```java
Map<String, String> fruit = new HashMap<>();
fruit.put("apple", "사과");
fruit.put("orange", "오렌지");
```

하지만 버전이 올라가면서 이렇게 작성할 수도 있게 됐다.

```java
Map<String, String> fruit = Map.of(
  "apple", "사과",
  "orange", "오렌지"
);
```

Clojure에서 Map의 값을 꺼내는 것은 엄청 단순하다. Map이 바인딩된 상수를 그대로 함수처럼 쓰면 된다.

```clojure
(fruit "apple") ; "사과"
```

없는 값에 대한 대안이 필요하다면 `get`을 쓰면 된다.

```clojure
(get fruit "apple" "없는 과일입니다.")      ; "사과"
(get fruit "fineapple" "없는 과일입니다.")  ; "없는 과일입니다."
```

`get`이 생각이 안 난다면 Java Map의 `getOrDefault`를 써도 된다.

```clojure
(.getOrDefault fruit "fineapple" "없는 과일입니다.") ; "없는 과일입니다."
```

### 키워드

그런데 Clojure에서는 Map의 key로 String보다 키워드를 주로 사용한다고 한다.

Clojure의 키워드는 `:`으로 시작한다.

```clojure
(type :foo) ; clojure.lang.Keyword
```

키워드를 key로 사용하는 Map을 다시 만들어보자.

```clojure
(def fruit
  {
   :apple  "사과"
   :orange "오렌지"
   })

(fruit :orange) ; "오렌지"
```

## 구조체

구조체 선언은 이렇게 한다.

```clojure
(defstruct person :first-name :last-name :age)
```

Java라면 다음과 같이 할 것이다.

```java
public class Person {
  String firstName;
  String lastName;
  int age;
}
```

다음과 같이 새로운 인스턴스를 만들 수 있고, 값을 부를 수도 있다.

```clojure
(defstruct person :first-name :last-name :age)

(def customer1 (struct person "John" "Grib" 28))

(println customer1)
; 출력 결과는 {:first-name John, :last-name Grib, :age 28}

(println (:age customer1))
; 출력 결과는 28
```

`struct-map`을 사용하면 순서를 신경쓰지 않고 키워드별로 값을 할당할 수 있다.

```clojure
(struct-map person
  :age 30
  :first-name "John")

; {:first-name "John", :last-name nil, :age 30}
```

## 함수 선언

```clojure
(defn function-name
  "함수를 설명하는 주석"
  [param1 param2 param3]
  ; 함수 본문은 여기에..
  ; 함수 마지막에 평가된 값이 return된다.
  )
```

### return

함수 마지막에 평가된 값이 return된다. 만약 이렇다 할 값이 없다면 `nil`이 return된다.

`return` 키워드가 없다는 점을 기억해두자.

Ruby나 Scala처럼 `return` 키워드를 생략 가능한 게 아니라 Elixir처럼 `return` 키워드가 없다.

early return을 즐겨 쓰는 편이라 좀 아쉽긴 하지만 이해가 가지 않는 상황은 아니다.
Clojure의 괄호는 단순한 표현식이 아니라 스코프를 의미하는 것 같다.
하나의 함수 내에서도 괄호가 계속해서 중첩이 될 수 있는 Clojure에서 `(return 3)`을 한다면
스택을 거슬러 올라가며 특정 순간에 값을 리턴해줄 수 있어야 하는데 그렇다면 `defn`이나 `fn`으로 생성한 함수를 특별취급해야 할 것 같다.
실제 구현체에서 이런 함수들을 어떻게 취급하는지는 아직 모르겠고, 나중에 자세히 조사해봐야 알겠지만 early return의 구현은
`goto`를 구현하는 것 같은 느낌이었을듯. 꽤나 골치아픈 문제이지만, 구현이 어려워서가 아니라 언어 철학과 상반되어 `return`이 빠진 느낌.

조사해보니 Common-Lisp의 경우 special keyword로 `return-from`을 제공해주는 것 같은데[^return-from-stackoverflow] [^return-from] [^lisp-return], 위에서 생각한 것과 비슷한 이유로 정지 시점을 지정해 주는 형태로 사용해야 하는 것으로 보인다.

```lisp
; common-lisp
(defun accumulate-list (list)
  (when (null list)
    (return-from accumulate-list 0)) ; return 값은 0. 대상은 accumulate-list을 지정하고 있다.
  (+ (first list)
     (accumulate-list (rest list))))
```

(나중에 조사해 보고 이 부분을 업데이트해 두도록 하자.)

early return이 아쉽다면 `cond`를 사용하거나 `return-from`같은 매크로를 만들어야 할 것 같다.

아무튼 이렇게 만든 함수를 `(doc function-name)`으로 조사해 보면 주석이 나온다.

```
(doc function-name)
-------------------------
hello.core/function-name
([] [name])
  함수를 설명하는 주석
=> nil
```

### 함수 오버로딩

함수 이름이 같아도 입력 파라미터의 수가 다르면 Java의 오버로딩과 똑같이 작동한다.

```clojure
(defn hello
  "함수를 설명하기 위한 주석."
  ([] "hello world")
  ([name] (str "hello " name))
  )

(hello)         ; "hello world"
(hello "john")  ; "hello john"
```

함수를 설명하기 위해 붙여주는 주석은 생략해도 문제없다.

위의 함수 선언문을 Java로 옮기면 다음과 같다.

```java
/** 메소드를 설명하기 위한 주석. */
String hello() {
  return "hello world";
}

/** 메소드를 설명하기 위한 주석. */
String hello(String name) {
  return "hello " + name;
}
```

### 가변 인자

가변 인자를 사용하려면 `&` 기호를 사용하면 된다.

```clojure
(defn hello
  [person1 person2 & other-people]  ; & other-people에 주목
  (println "안녕하세요." person1)
  (println "안녕하세요." person2)
  (if (< 0 (count other-people))
    (println
      "더 오신 분들이 있네요. 안녕하세요."
      (clojure.string/join ", " other-people))
    )
  )

(hello "john" "mary")
; 안녕하세요. john
; 안녕하세요. mary

(hello "john" "mary" "tom" "hong")
; 안녕하세요. john
; 안녕하세요. mary
; 더 오신 분들이 있네요. 안녕하세요. tom, hong
```

위의 코드를 Java로 번역하면 다음과 같다. 즉, 인자 목록에서의 `&`은 Java의 `...` 연산자와 같은 역할을 한다.

```java
void hello(String person1, String person2, String... otherPeople) {
  System.out.println("안녕하세요. " + person1);
  System.out.println("안녕하세요. " + person2);
  if (0 < otherPeople.length) {
    System.out.println("더 오신 분들이 있네요. 안녕하세요. "
      + String.join(", ", otherPeople));
  }
}
```

### 익명 함수

`#()`를 사용해 익명 함수를 선언할 수 있다. 다음 코드[^p-clojure-2]의 `#(Character/isWhitespace %)`가 익명 함수이다.

```clojure
(defn blank? [s]
  (every? #(Character/isWhitespace %) s))
```

이 함수는 다음과 같이 사용할 수 있다.

```clojure
(println (blank? ""))   ; true
(println (blank? "1a")) ; false
```

여기에서 인상적인 것들 몇 가지를 살펴보자.

- 함수 이름이 `blank?` 이다. Clojure에서는 함수 이름에 물음표를 쓸 수 있다. Java였다면 `isBlank`로 이름을 지었겠지만, Clojure에서는 그냥 `blank?`로 지을 수 있다.
- `#`과 `%`를 사용해 익명 함수를 만든다.
    - Perl이 떠오르는 축약 문법. `#`는 익명 함수의 선언을, `%`는 첫 번째 argument를 의미한다.[^reader]

`#(Character/isWhitespace %)`를 Java 코드로 표현하자면 다음과 같다.

```java
Function<Character, Boolean> noname = ((Character c) -> Character.isWhitespace(c));
```

하지만 Java 사용자들은 아무도 이런 식으로 문자열이 공백인지 체크하지 않는다. 보통은 이렇게 한다.

```java
"sentence".isBlank();   // Java
```

물론 Clojure에서도 `String`의 `isBlank`를 사용할 수 있다.

```clojure
(.isBlank "sentence")   ; Clojure
```

잘 살펴보면 세미콜론과 공백을 제외하고 모든 문자가 그대로 있다. 순서만 다를 뿐이다.


## 참고문헌

- 프로그래밍 클로저 / 스튜어트 할로웨이 저 / 유찬우 역 / 인사이트(insight) / 초판 1쇄 발행 2010년 06월 20일 / 원제 : Programming Clojure (2009)

## 주석
[^p-clojure-2]: 프로그래밍 클로저 1장. 2쪽.
[^reader]: [[/clojure/reader]] 참고.
[^return-from-stackoverflow]: [stackoverflow.com에 올라온 질문과 답변]( https://stackoverflow.com/a/26289792 )
[^return-from]: [Common Lisp HyperSpec - Special Operator RETURN-FROM]( http://www.lispworks.com/documentation/HyperSpec/Body/s_ret_fr.htm ). `return-from`은 스택을 거슬러 올라가는 작업을 멈춰줄 block을 지정해 주는 방식으로 사용하는 것 같다.
[^lisp-return]: [Common Lisp HyperSpec - Macro RETURN]( http://www.lispworks.com/documentation/HyperSpec/Body/m_return.htm ). 이 `return`은 키워드가 아니라 매크로이며, `nil` block에 대해 값을 `return`하는 것으로 보인다.
