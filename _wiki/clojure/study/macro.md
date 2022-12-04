---
layout  : wiki
title   : Clojure macro
summary : Clojure의 macro 둘러보기
date    : 2022-03-13 22:14:01 +0900
updated : 2022-11-07 23:31:01 +0900
tag     : clojure
resource: 23/CF3D38-EAEE-49F7-A843-33138B568A0A
toc     : true
public  : true
parent  : [[/clojure/study]]
latex   : false
---
* TOC
{:toc}

## clojure.core

### when

[clojure.core/when]( https://github.com/clojure/clojure/blob/clojure-1.11.0-alpha4/src/clj/clojure/core.clj#L495 )

```clojure
(defmacro when
  "Evaluates test. If logical true, evaluates body in an implicit do."
  {:added "1.0"}
  [test & body]
  (list 'if test (cons 'do body)))
```

- `(defmacro when` - `when` 매크로 정의.
- `[test & body]` - test 구문과 body 구문을 인자로 받는다. body는 test 이후 나머지 인자들의 시퀀스이다.
- `(list 'if test (cons 'do body))`
    - `cons`는 `body` 리스트의 앞에 `do`를 추가한다.
        ```clojure
        (cons 1 '(2 3 4 5 6))
        ;;=> (1 2 3 4 5 6)
        ```
    - `'if` 와 `'do` 앞에 붙은 `'`([[/clojure/guide/reading-clojure-characters#-\-\-quote]]{qoute})에 주목.

다음과 같이 `when` 매크로를 사용한 코드가 있다고 하자.

```clojure
(when (= 3 (+ 1 2))
  (println "a")
  (println "b"))
```

위의 코드를 `macroexpand-1`을 사용해 펼쳐보면 다음과 같이 나온다.

```clojure
(macroexpand-1 '(when (= 3 (+ 1 2))
                      (println "a")
                      (println "b")))

=> (if (= 3 (+ 1 2))
       (do (println "a")
           (println "b")))
```

### when-not

[clojure.core/when-not]( https://github.com/clojure/clojure/blob/clojure-1.11.0-alpha4/src/clj/clojure/core.clj#L501 )

```clojure
(defmacro when-not
  "Evaluates test. If logical false, evaluates body in an implicit do."
  {:added "1.0"}
  [test & body]
    (list 'if test nil (cons 'do body)))
```

`when-not`은 `when`과 반대로 작동한다.
즉, `test`가 `if`의 조건을 만족시킨다면 `nil`을 리턴하고, 만족시키지 않으면 `(do body)`를 평가하고 리턴한다.

```clojure
(macroexpand-1 '(when-not (= 3 (+ 1 2))
                          (println "a")
                          (println "b")))
=> (if (= 3 (+ 1 2))
       nil    ; true 인 경우 nil 리턴
       (do (println "a")
           (println "b")))
```

### cond

[clojure.core/cond]( https://github.com/clojure/clojure/blob/clojure-1.11.0-alpha4/src/clj/clojure/core.clj#L576 )

```clojure
(defmacro cond
  "Takes a set of test/expr pairs. It evaluates each test one at a
  time.  If a test returns logical true, cond evaluates and returns
  the value of the corresponding expr and doesn't evaluate any of the
  other tests or exprs. (cond) returns nil."
  {:added "1.0"}
  [& clauses]
    (when clauses
      ;; 첫 번째 clause가 참이라면,
      (list 'if (first clauses)
            ;; 첫 번째 clause에 이어지는 이후 clause들이 존재하는지 확인한다.
            (if (next clauses)
                ;; 이후 clause들이 있다면 첫 번째 clause의 짝인 두 번째 clause를 평가하고 리턴한다.
                (second clauses)

                ;; 평가는 참이었는데 실행 구문이 없다!
                ;; cond를 문법에 맞지 않게 사용한 것이다. 예외를 던진다.
                (throw (IllegalArgumentException.
                         "cond requires an even number of forms")))

            ;; 첫 번째 caluse가 참이 아니라면, 세 번째 clause부터 재귀 cond.
            (cons 'clojure.core/cond (next (next clauses))))))
```

`cond`의 매크로 정의는 몇 가지 인상적인 면이 있다.

- 첫 번째 clause를 평가하고, 첫 번째 clause가 참이라면 두 번째 clause를 평가하고 리턴한다.
- 첫 번째 clause가 참이 아니라면, 두 번째 clause는 무시하고 세 번째 clause로 재귀한다.
- `cond`를 사용할 때 보통 마지막 조건으로 주는 `:else`는 특별히 정의된 키워드가 아니다.
    - `if`에서 키워드를 `true`로 평가하기 때문에 "else"로 읽기 좋도록 `:else`를 주는 것이다.
    - 따라서 `:else`말고 다른 키워드를 써도 잘 작동한다. `:default` 같은 것을 써도 `:else`와 똑같이 작동할 것이다.

`macroexpand-1`로 펼쳐보면 이런 재귀 구조가 쉽게 눈에 들어온다.

```clojure
(macroexpand-1 '(cond (= 2 3)           ; 첫 번째 clause
                      (println "2 = 3") ; 두 번째 clause

                      (= 3 3)           ; 세 번째 clause
                      (println "3 = 3") ; 네 번째 clause

                      :else             ; 다섯 번째 clause
                      (println "end"))) ; 여섯 번째 clause

=> (if (= 2 3)
       (println "2 = 3");   ; 첫번째, 두번째 clause를 처리, 나머지 clause들은 재귀로 처리
       (clojure.core/cond (= 3 3) (println "3 = 3")
                          (= 4 5) (println "4 = 5")
                          :else   (println "end")))
```

### lazy-seq

[clojure.core/lazy-seq]( https://github.com/clojure/clojure/blob/clojure-1.11.0-alpha4/src/clj/clojure/core.clj#L685 )

```clojure
(defmacro lazy-seq
  "Takes a body of expressions that returns an ISeq or nil, and yields
  a Seqable object that will invoke the body only the first time seq
  is called, and will cache the result and return it on all subsequent
  seq calls. See also - realized?"
  {:added "1.0"}
  [& body]
  (list 'new 'clojure.lang.LazySeq (list* '^{:once true} fn* [] body)))
```

`lazy-seq`는 아주 짧고 단순하다.
`new LazySeq`를 사용해 `LazySeq`의 새로운 인스턴스를 만드는데,
여기에 `(fn* [] body)`를 제공해서 `body`의 평가 시점을 함수 호출 시점으로 미루고 있다.

다음은 `lazy-seq`를 사용해 [[/fibonacci]]을 생성하는 예제이다.

```clojure
(defn fibonacci
  ([]
   (fibonacci 1 1))
  ([a b]
   (lazy-seq (cons a
                   (fibonacci b (+ a b))))))

(take 15 (fibonacci))
; (1 1 2 3 5 8 13 21 34 55 89 144 233 377 610)
```

이 `fibonacci` 함수의 매크로를 펼쳐보자.

```clojure
(def fibonacci
  (fn*
    ([]
     (fibonacci 1 1))
    ([a b]
     (new clojure.lang.LazySeq #(cons a (fibonacci b (+ a b)))))))
```

- `lazy-seq`가 `new clojure.lang.LazySeq`를 호출하는 Java interop 코드로 바뀌었다.
- `(cons a ...)` 가 `#(cons a ...)`로 앞에 `#`이 붙어 람다 함수 되었다.


#### fn*

한편 `fn*`은 `clojure.core`에서 몇 번 사용되고 있기는 하지만 Clojure 코드를 통해 정의되어 있지는 않다.
([clojuredocs.org 에서도 `fn*`을 찾아보면 나오지 않고, `bound-fn*`만 나온다]( https://clojuredocs.org/clojure.core/bound-fn* ))

`fn*`은 [`fn`을 정의하는 매크로]( https://github.com/clojure/clojure/blob/clojure-1.11.0-alpha4/src/clj/clojure/core.clj#L4560 ) 내부에도 등장하고 있으며,
잘 읽어보면 `fn` 매크로에서 실제로 함수를 생성하는 데에 사용되는 `fn`의 본체라는 것을 미루어 추측할 수 있다.

이 `fn*`은 [`Compiler.java`에서도 찾아볼 수 있어]( https://github.com/clojure/clojure/blob/clojure-1.11.0-alpha4/src/jvm/clojure/lang/Compiler.java#L47 )
Clojure의 함수를 생성하는 저수준 동작과 관련이 있어 보인다.

`fn*`은 Clojure 컴파일러에서 `Symbol FN`으로 정의되어 있으며, 이걸 추적하면 실제로 함수를 생성하는 것으로 추측되는 코드를 읽어볼 수 있다.

[clojure.lang.Compiler]( https://github.com/clojure/clojure/blob/clojure-1.11.0-alpha4/src/jvm/clojure/lang/Compiler.java#L47-L48 )

```java
public class Compiler implements Opcodes{

static final Symbol DEF = Symbol.intern("def");
static final Symbol LOOP = Symbol.intern("loop*");
static final Symbol RECUR = Symbol.intern("recur");
static final Symbol IF = Symbol.intern("if");
static final Symbol LET = Symbol.intern("let*");
static final Symbol LETFN = Symbol.intern("letfn*");
static final Symbol DO = Symbol.intern("do");
static final Symbol FN = Symbol.intern("fn*"); /* ←  ↓ 여기에서 FN 으로 이름을 붙인다 */
static final Symbol FNONCE = (Symbol) Symbol.intern("fn*").withMeta(RT.map(Keyword.intern(null, "once"), RT.T));
static final Symbol QUOTE = Symbol.intern("quote");
static final Symbol THE_VAR = Symbol.intern("var");
static final Symbol DOT = Symbol.intern(".");
static final Symbol ASSIGN = Symbol.intern("set!");
//static final Symbol TRY_FINALLY = Symbol.intern("try-finally");
static final Symbol TRY = Symbol.intern("try");
static final Symbol CATCH = Symbol.intern("catch");
static final Symbol FINALLY = Symbol.intern("finally");
static final Symbol THROW = Symbol.intern("throw");
static final Symbol MONITOR_ENTER = Symbol.intern("monitor-enter");
static final Symbol MONITOR_EXIT = Symbol.intern("monitor-exit");
static final Symbol IMPORT = Symbol.intern("clojure.core", "import*");
```

다음은 `Symbol FN`을 사용하는 코드 중 하나로, `LispReader$FnReader::invoke` 이다.

[clojure.lang.LispReader$FnReader::invoke]( https://github.com/clojure/clojure/blob/b1b88dd25373a86e41310a525a21b497799dbbf2/src/jvm/clojure/lang/LispReader.java#L861-L903 )

```java
    public Object invoke(Object reader, Object lparen, Object opts, Object pendingForms) {
        PushbackReader r = (PushbackReader) reader;
        if(ARG_ENV.deref() != null)
            throw new IllegalStateException("Nested #()s are not allowed");
        try
            {
            Var.pushThreadBindings(
                    RT.map(ARG_ENV, PersistentTreeMap.EMPTY));
            unread(r, '(');
            Object form = read(r, true, null, true, opts, ensurePending(pendingForms));

            PersistentVector args = PersistentVector.EMPTY;
            PersistentTreeMap argsyms = (PersistentTreeMap) ARG_ENV.deref();
            ISeq rargs = argsyms.rseq();
            if(rargs != null)
                {
                int higharg = (Integer) ((Map.Entry) rargs.first()).getKey();
                if(higharg > 0)
                    {
                    for(int i = 1; i <= higharg; ++i)
                        {
                        Object sym = argsyms.valAt(i);
                        if(sym == null)
                            sym = garg(i);
                        args = args.cons(sym);
                        }
                    }
                Object restsym = argsyms.valAt(-1);
                if(restsym != null)
                    {
                    args = args.cons(Compiler._AMP_);
                    args = args.cons(restsym);
                    }
                }
            // Java 코드지만 (FN args form) 이 무엇인지는 명백하다.
            return RT.list(Compiler.FN, args, form);
            }
        finally
            {
            Var.popThreadBindings();
            }
    }
```

아래쪽에 있는 `return` 구문을 읽어보면 Clojure 런타임에 `FN`, `args`, `form`을 넘겨주는 것을 볼 수 있다.

```java
return RT.list(Compiler.FN, args, form);
```

`FnReader`라는 클래스 이름과 `invoke`라는 메소드 이름, 그리고 `(FN args form)`이라는 모양을 조합해 보면 함수 호출이라는 것을 짐작할 수 있다.

### delay

[clojure.core/delay]( https://github.com/clojure/clojure/blob/clojure-1.11.0-alpha4/src/clj/clojure/core.clj#L748 )

```clojure
(defmacro delay
  "Takes a body of expressions and yields a Delay object that will
  invoke the body only the first time it is forced (with force or deref/@), and
  will cache the result and return it on all subsequent force
  calls. See also - realized?"
  {:added "1.0"}
  [& body]
    (list 'new 'clojure.lang.Delay (list* `^{:once true} fn* [] body)))
```

`delay`는 `lazy-seq`와 매우 비슷한 구조를 갖는 매크로이다.
어떤 Java 클래스를 사용하는지만 다르다.

```clojure
(defmacro lazy-seq
  [& body]
  (list 'new 'clojure.lang.LazySeq (list* '^{:once true} fn* [] body)))
```

### if-not

[clojure.core/if-not]( https://github.com/clojure/clojure/blob/clojure-1.11.0-alpha4/src/clj/clojure/core.clj#L769 )

```clojure
(defmacro if-not
  "Evaluates test. If logical false, evaluates and returns then expr, 
  otherwise else expr, if supplied, else nil."
  {:added "1.0"}
  ([test then] `(if-not ~test ~then nil))
  ([test then else]
   `(if (not ~test) ~then ~else)))
```

`if-not`은 `when-not`과 비슷하지만 `else`가 있다는 차이점이 있다.

`~`를 많이 사용하고 있는 것이 눈에 띈다.
[[/clojure/guide/reading-clojure-characters#&#45;&#45;&#45;unquote]]{`~`는 unquote}로, quot를 풀어버리는 의미를 갖고 있다.

### and

다른 언어에서는 핵심 키워드였을 `and`는 Clojure에서는 우아하게 macro로 정의되어 있다.

[clojure.core/and]( https://github.com/clojure/clojure/blob/clojure-1.11.0-alpha4/src/clj/clojure/core.clj#L844 )

```clojure
(defmacro and
  "Evaluates exprs one at a time, from left to right. If a form
  returns logical false (nil or false), and returns that value and
  doesn't evaluate any of the other expressions, otherwise it returns
  the value of the last expr. (and) returns true."
  {:added "1.0"}
  ([] true)
  ([x] x)
  ([x & next]
   `(let [and# ~x]
      (if and# (and ~@next) and#))))
```

- `and#`에서 [[/clojure/guide/reading-clojure-characters#symbol&#45;&#45;&#45;gensym]]{마지막에 `#`를 붙이는 것은 generated symbol을 위한 것}으로, macro 안쪽에서 `let`을 사용할 때 쓰는 기법이다.
- `~@next`에서 [[/clojure/guide/reading-clojure-characters#&#45;&#45;&#45;unquote-splicing]]{`~@`는 unquote splicing 이다}.

이제 매크로 코드를 읽어보자.

- `(let [and# ~x]` - 첫 번째 인자인 `x`를 `and#`에 `let` 할당한다.
    - [[/clojure/guide/reading-clojure-characters#&#45;&#45;&#45;&#45;syntax-quote]]{``` `(let ```에서 ``` ` ```은 syntax unquote}이며, 심볼을 현재 namespace로 resolve해준다.
- `(if and#` - `and#`가 참이면...
    - `(and ~@next)` - 첫번째 조건은 통과했다. 이제 나머지 인자들에 대해 `and`를 재귀한다.
- `(if and#` - `and#`가 거짓이면...
    - `and#` - 거짓으로 평가된 값을 리턴한다.

REPL에서 `and`를 사용해보며 macro의 동작을 체험해보자.

```clojure
;; 거짓이 하나라도 포함되어 있는 경우
;; macro 정의대로 가장 먼저 거짓으로 평가되는 값을 리턴
(and nil 3)     ; nil
(and false 3)   ; false
(and 1 2 3 false 4) ; false
```

```clojure
;; 모두 참인 경우
;; macro 정의대로 순서대로 평가해서 가장 마지막에 참으로 평가한 값을 리턴
(and 1 2 3 4)       ; 4
(and true #{} [] 7) ; 7
```

`and` 매크로를 펼쳐보면 재귀 구조가 한 눈에 들어온다.

```clojure
(macroexpand-1 '(and 11 22 33 44 55 66 77 false))
=>
;; let 에서 gensym에 11 을 할당한다
(clojure.core/let [and__5531__auto__ 11]
 (if and__5531__auto__
     ;; 첫 번째 조건이 참이면, 나머지 조건들에 대해서 재귀한다
     (clojure.core/and 22 33 44 55 66 77 false)
     ;; 첫 번째 조건이 거짓이면, 거짓으로 평가한 값을 리턴한다
     and__5531__auto__))
```

- 참고로 `let`이 `clojure.core/let`으로 확장된 것은 ``` ` ```의 영향이다.

### or

[clojure.core/or]( https://github.com/clojure/clojure/blob/clojure-1.11.0-alpha4/src/clj/clojure/core.clj#L856 )

```clojure
(defmacro or
  "Evaluates exprs one at a time, from left to right. If a form
  returns a logical true value, or returns that value and doesn't
  evaluate any of the other expressions, otherwise it returns the
  value of the last expression. (or) returns nil."
  {:added "1.0"}
  ([] nil)
  ([x] x)
  ([x & next]
      `(let [or# ~x]
         (if or# or# (or ~@next)))))
```

`or` 매크로는 `and`와 `if`의 인자 순서가 다르다는 것을 빼면 똑같다.

```clojure
`(let [and# ~x]
      ;; and는 첫 번째 인자가 참이어도 나머지를 모두 검사해야 한다
      (if and#
        (and ~@next)
        and#))
```

```clojure
`(let [or# ~x]
      ;; or는 첫 번째 인자가 참이라면 검사가 끝난다
      (if or#
        or#
        (or ~@next)))
```

### locking

```clojure
(defmacro locking
  "Executes exprs in an implicit do, while holding the monitor of x.
  Will release the monitor of x in all circumstances."
  {:added "1.0"}
  [x & body]
  `(let [lockee# ~x]
     (try
       (let [locklocal# lockee#]
         (monitor-enter locklocal#)
         (try
           ~@body
           (finally
            (monitor-exit locklocal#)))))))
```

[clojuredocs.org의 예제]( https://clojuredocs.org/clojure.core/locking#example-542692cdc026201cdc326d21 )를 읽어보면 `locking`이 [[/java/synchronized]]처럼 작동하는 매크로라는 설명이 있다.

> ```clojure
> ;; locking operates like the synchronized keyword in Java.
> ```

매크로를 잘 읽어보면 `try`-`catch`로 감싼 `monitor-enter`-`monitor-exit` 호출 구조를 만드는 내용이다.

#### monitor-enter 와 monitor-exit

`doc`으로 이 두 함수를 조사해 보면 사용자 코드에서는 권장되지 않으며, 대안으로 `locking` 매크로를 사용해야 한다는 내용을 읽을 수 있다.

```clojure
(doc monitor-enter)
-------------------------
monitor-enter
  (monitor-enter x)
Special Form
  Synchronization primitive that should be avoided
  in user code. Use the 'locking' macro.

  Please see http://clojure.org/special_forms#monitor-enter
```

`monitor-enter`와 `monitor-exit`은 `clojure.core`에 정의되어 있지 않고, `clojure.lang.Compiler`와 `clojure.asm.Opcodes`에 정의되어 있다.

[clojure.lang.Compiler]( https://github.com/clojure/clojure/blob/658693f6cf97e6ab0ff789e096c9eb6654e4d3ab/src/jvm/clojure/lang/Compiler.java#L58-L59 )

```java
static final Symbol TRY = Symbol.intern("try");     // try, catch, finally 도 여기에 있다.
static final Symbol CATCH = Symbol.intern("catch");
static final Symbol FINALLY = Symbol.intern("finally");
static final Symbol THROW = Symbol.intern("throw");
static final Symbol MONITOR_ENTER = Symbol.intern("monitor-enter"); // 여기
static final Symbol MONITOR_EXIT = Symbol.intern("monitor-exit");   // 여기
static final Symbol IMPORT = Symbol.intern("clojure.core", "import*");
```

[clojure.asm.Opcodes]( https://github.com/clojure/clojure/blob/b1b88dd25373a86e41310a525a21b497799dbbf2/src/jvm/clojure/asm/Opcodes.java#L342-L343 )

```java
int MONITORENTER = 194; // visitInsn
int MONITOREXIT = 195; // -
```

### ..

[clojure.core/..]( https://github.com/clojure/clojure/blob/clojure-1.11.0-alpha4/src/clj/clojure/core.clj#L1676 )

```clojure
(defmacro ..
  "form => fieldName-symbol or (instanceMethodName-symbol args*)

  Expands into a member access (.) of the first member on the first
  argument, followed by the next member on the result, etc. For
  instance:

  (.. System (getProperties) (get \"os.name\"))

  expands to:

  (. (. System (getProperties)) (get \"os.name\"))

  but is easier to write, read, and understand."
  {:added "1.0"}
  ;; form이 1개인 경우에는 . 으로 Java 코드를 호출한다.
  ([x form] `(. ~x ~form))
  ;; form 이후 여러 인자가 있다면 ~@more 를 사용해 재귀한다.
  ([x form & more] `(.. (. ~x ~form) ~@more)))
```

`..`은 Java interop과 관련이 있다. `.`를 줄줄이 이어서 쓰는 메소드 체인 방식의 Java 코드 호출이 필요한 경우에 쓰는 것.

```clojure
(.. "fooBAR" (toLowerCase) (substring 3))
=> "bar"
```

위의 Clojure 코드는 아래의 Java 코드와 같다.

```java
"fooBar".toLowerCase().substring(3);
```

이 매크로도 재귀 구조를 갖고 있다. 재귀하며 `~@more`를 넘기는 방식으로 인자를 앞에서부터 하나씩 줄여나간다.

```clojure
(defmacro ..
  ;; form이 1개인 경우에는 . 으로 Java 코드를 호출한다.
  ([x form] `(. ~x ~form)) ; Java 로 따지면 객체 x의 메소드 호출 form을 실행하는 것.

  ;; form 이후 인자가 있다면 ~@more 를 사용해 재귀한다.
  ([x form & more] `(.. (. ~x ~form) ~@more)))
```

### ->

[clojure.core/->](https://github.com/clojure/clojure/blob/clojure-1.11.0-alpha4/src/clj/clojure/core.clj#L1694 )

```clojure
(defmacro ->
  "Threads the expr through the forms. Inserts x as the
  second item in the first form, making a list of it if it is not a
  list already. If there are more forms, inserts the first form as the
  second item in second form, etc."
  {:added "1.0"}
  [x & forms]
  (loop [x x, forms forms]
    (if forms
      ;; forms 가 있다면.

      (let [form (first forms)  ; 실행할 form
            threaded (if (seq? form)
                        ;; form이 (A B C) 같은 시퀀스라면, (A x B C) 처럼 x를 넣어 실행한다
                        ;; 그리고 메타데이터가 유실되지 않도록 붙여준다.
                       (with-meta `(~(first form) ~x ~@(next form)) (meta form))

                       ;; form 이 시퀀스가 아니라면 그냥 함수만 있는 것이다.
                       ;; (form x)로 실행한다
                       (list form x))]
        ;; 나머지 form들이 있으므로 다음 loop를 진행한다
        (recur threaded (next forms)))

      ;; forms 가 없다면, 넘겨받은 x 를 리턴한다
      x)))
```

`->`는 [[/clojure/guide/threading-macros]]{스레딩 매크로}이다.

스레딩 파이프를 타고 흐르는 값을 `seq?`로 검사해서 메타데이터 유실을 막는 처리가 있다는 점이 인상적이다.

Clojure에서 primitive 타입은 메타데이터를 가질 수 없지만
map이나 시퀀스는 메타데이터를 가질 수 있으므로
스레딩 매크로를 거치면서 메타데이터가 유실되지 않도록 처리해주는 것이다.

`seq?` 함수는 검사 대상이 `clojure.lang.ISeq` 타입인지를 검사하는데, 이를 통해 메타데이터 적용 가능 대상을 `seq?`로 판별할 수 있다는 것을 배울 수 있다.

### -\>>

[clojure.core/->>]( https://github.com/clojure/clojure/blob/clojure-1.11.0-alpha4/src/clj/clojure/core.clj#L1710 )

```clojure
(defmacro ->>
  "Threads the expr through the forms. Inserts x as the
  last item in the first form, making a list of it if it is not a
  list already. If there are more forms, inserts the first form as the
  last item in second form, etc."
  {:added "1.1"}
  [x & forms]
  (loop [x x, forms forms]
    (if forms
      (let [form (first forms)
            threaded (if (seq? form)
              ;;                                         ↓
              (with-meta `(~(first form) ~@(next form)  ~x) (meta form))
              (list form x))]
        (recur threaded (next forms)))
      x)))
```

`->`와 거의 같다. `~x`의 위치만 다르다는 점에 주목.

### defmulti

### defmethod

### assert-args

[clojure.core/assert-args]( https://github.com/clojure/clojure/blob/clojure-1.11.0-alpha4/src/clj/clojure/core.clj#L1849 )

```clojure
(defmacro ^{:private true} assert-args
  [& pairs]
  `(do
     ;; (first pairs)가 참이 아니라면 예외를 던진다.
     (when-not ~(first pairs)
         (throw (IllegalArgumentException.
                  (str (first ~'&form) " requires " ~(second pairs) " in " ~'*ns* ":" (:line (meta ~'&form))))))
     ;; 예외를 안 던졌다면 다음 값을 체크하기 위해 재귀한다.
     ~(let [more (nnext pairs)]
        (when more
          (list* `assert-args more)))))
```

- 첫 번째 `pairs`를 평가한 다음, 참이 아니라면 `IllegalArgumentException` 예외를 던진다.
- `(do`를 쓰고 있으므로, 예외를 던지지 않았다면 그 다음 평가를 하기 위해 재귀한다.


### time

[clojure.core/time]( https://github.com/clojure/clojure/blob/clojure-1.11.0-alpha4/src/clj/clojure/core.clj#L3885 )

```clojure
(defmacro time
  "Evaluates expr and prints the time it took.  Returns the value of
 expr."
  {:added "1.0"}
  [expr]
  `(let [start# (. System (nanoTime))  ; 시작 시간을 보관해 둔 다음,
         ret# ~expr]                   ; 표현식을 평가하고,
     ;; 소요 시간을 출력한다
     (prn (str "Elapsed time: " (/ (double (- (. System (nanoTime)) start#)) 1000000.0) " msecs"))
     ;; 그리고 표현식 평가 결과를 리턴한다
     ret#))
```

### defstruct

[clojure.core/defstruct]( https://github.com/clojure/clojure/blob/clojure-1.11.0-alpha4/src/clj/clojure/core.clj#L4046 )

```clojure
(defmacro defstruct
  "Same as (def name (create-struct keys...))"
  {:added "1.0"
   :static true}
  [name & keys]
  `(def ~name (create-struct ~@keys)))
```

가장 간단한 형태의 함수 호출 매크로라 할 수 있다.

- 첫 번째 인자는 `name`으로, `def`를 통해 이름을 붙여준다.
- `create-struct` 함수에 두번째부터 마지막 인자까지를 넘겨준다.

### let

[clojure.core/let]( https://github.com/clojure/clojure/blob/clojure-1.11.0-alpha4/src/clj/clojure/core.clj#L4498 )

```clojure
(defmacro let
  "binding => binding-form init-expr
  binding-form => name, or destructuring-form
  destructuring-form => map-destructure-form, or seq-destructure-form

  Evaluates the exprs in a lexical context in which the symbols in
  the binding-forms are bound to their respective init-exprs or parts
  therein.

  See https://clojure.org/reference/special_forms#binding-forms for
  more information about destructuring."
  {:added "1.0", :special-form true, :forms '[(let [bindings*] exprs*)]}
  [bindings & body]
  ;; 입력 assert
  (assert-args
     ;; 바인딩이 vector 타입이어야 한다
     (vector? bindings) "a vector for its binding"
     ;; 바인딩 vector의 원소가 짝수개여야 한다
     (even? (count bindings)) "an even number of forms in binding vector")

  ;; 바인딩을 구조분해하고, let*의 첫 번째 인자로. body 리스트는 그 이후 인자로.
  `(let* ~(destructure bindings) ~@body))
```

### fn

[clojure.core/fn]( https://github.com/clojure/clojure/blob/clojure-1.11.0-alpha4/src/clj/clojure/core.clj#L4535 )

```clojure
;redefine fn with destructuring and pre/post conditions
(defmacro fn
  "params => positional-params*, or positional-params* & rest-param
  positional-param => binding-form
  rest-param => binding-form
  binding-form => name, or destructuring-form

  Defines a function.

  See https://clojure.org/reference/special_forms#fn for more information"
  {:added "1.0", :special-form true,
   :forms '[(fn name? [params* ] exprs*) (fn name? ([params* ] exprs*)+)]}
  ;; sigs 는 함수 시그니처
  [& sigs]
    ;; (fn name [params* ] exprs*) 처럼 사용했다면 name 이 있다.
    ;; (fn [params* ] exprs*) 처럼 사용했다면 name 이 없다.
    (let [name (if (symbol? (first sigs)) (first sigs) nil)
          sigs (if name (next sigs) sigs)
          sigs (if (vector? (first sigs))  ; 첫번째가 vector이면 인자 목록.
                 (list sigs) 
                 (if (seq? (first sigs))
                   sigs
                   ;; Assume single arity syntax
                   (throw (IllegalArgumentException. 
                            (if (seq sigs)
                              (str "Parameter declaration " 
                                   (first sigs)
                                   " should be a vector")
                              (str "Parameter declaration missing"))))))
          psig (fn* [sig]
                 ;; Ensure correct type before destructuring sig
                 (when (not (seq? sig))
                   (throw (IllegalArgumentException.
                            (str "Invalid signature " sig
                                 " should be a list"))))
                 (let [[params & body] sig
                       _ (when (not (vector? params))
                           (throw (IllegalArgumentException. 
                                    (if (seq? (first sigs))
                                      (str "Parameter declaration " params
                                           " should be a vector")
                                      (str "Invalid signature " sig
                                           " should be a list")))))
                       conds (when (and (next body) (map? (first body))) 
                                           (first body))
                       body (if conds (next body) body)
                       conds (or conds (meta params))
                       pre (:pre conds)
                       post (:post conds)                       
                       body (if post
                              `((let [~'% ~(if (< 1 (count body)) 
                                            `(do ~@body) 
                                            (first body))]
                                 ~@(map (fn* [c] `(assert ~c)) post)
                                 ~'%))
                              body)
                       body (if pre
                              (concat (map (fn* [c] `(assert ~c)) pre) 
                                      body)
                              body)]
                   (maybe-destructured params body)))
          new-sigs (map psig sigs)]
      (with-meta
        (if name
          (list* 'fn* name new-sigs)
          (cons 'fn* new-sigs))
        (meta &form))))
```

### loop

[clojure.core/loop]( https://github.com/clojure/clojure/blob/clojure-1.11.0-alpha4/src/clj/clojure/core.clj#L4599 )

```clojure
(defmacro loop
  "Evaluates the exprs in a lexical context in which the symbols in
  the binding-forms are bound to their respective init-exprs or parts
  therein. Acts as a recur target."
  {:added "1.0", :special-form true, :forms '[(loop [bindings*] exprs*)]}
  [bindings & body]
    (assert-args
      (vector? bindings) "a vector for its binding"
      (even? (count bindings)) "an even number of forms in binding vector")
    (let [db (destructure bindings)]
      (if (= db bindings)
        `(loop* ~bindings ~@body)
        (let [vs (take-nth 2 (drop 1 bindings))
              bs (take-nth 2 bindings)
              gs (map (fn [b] (if (symbol? b) b (gensym))) bs)
              bfs (reduce1 (fn [ret [b v g]]
                            (if (symbol? b)
                              (conj ret g v)
                              (conj ret g v b g)))
                          [] (map vector bs vs gs))]
          `(let ~bfs
             (loop* ~(vec (interleave gs gs))
               (let ~(vec (interleave bs gs))
                 ~@body)))))))
```

### comment

[clojure.core/comment]( https://github.com/clojure/clojure/blob/clojure-1.11.0-alpha4/src/clj/clojure/core.clj#L4735 )

```clojure
(defmacro comment
  "Ignores body, yields nil"
  {:added "1.0"}
  [& body])  ;; 아무 것도 안한다.
```

`[& body])`에서 `]`와 `)` 사이에 아무 것도 없다는 사실에 주목.

`comment` 매크로를 읽고 약간 웃음이 났다.


## TODO

```text
 ### if-let
 ### when-let
 ### if-some
 ### when-some
 ### binding
 ### with-bindings
 ### bound-fn
 ### sync
 ### io!
 ### vswap!
 ### dotimes
 ### declare
 ### doseq
 ### import
 ### with-open
 ### doto
 ### memfn
 ### def-aset
 ### with-local-vars
 ### when-first
 ### lazy-cat
 ### for
```

## 참고문헌

- 클로저 시작하기 / 캐린 마이어 저 / 박상규, 김만명, 김영태 공역 / 인사이트(insight) / 초판 1쇄 2016년 04월 01일 / 원제 : Living Clojure

