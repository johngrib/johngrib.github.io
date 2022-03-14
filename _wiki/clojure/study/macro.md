---
layout  : wiki
title   : Clojure macro
summary : Clojure의 macro 둘러보기
date    : 2022-03-13 22:14:01 +0900
updated : 2022-03-14 18:37:25 +0900
tag     : clojure
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
- `[test & body]` - test 구문과 body 구문을 받는다. body는 test 이후 나머지 인자들의 시퀀스이다.
- `(list 'if test (cons 'do body))` - `(if test (do '(body1 body2 ...)))`로 확장되는 매크로.

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
       nil
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
(macroexpand-1 '(cond (= 2 3)
                      (println "2 = 3")

                      (= 3 3)
                      (println "3 = 3")

                      :else
                      (println "end")))

=> (if (= 2 3)
       (println "2 = 3")
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
      (if and# (and ~@next) and#))
```

```clojure
`(let [or# ~x]
      ;; or는 첫 번째 인자가 참이라면 검사가 끝난다
      (if or# or# (or ~@next)))
```

## 참고문헌

- 클로저 시작하기 / 캐린 마이어 저 / 박상규, 김만명, 김영태 공역 / 인사이트(insight) / 초판 1쇄 2016년 04월 01일 / 원제 : Living Clojure

