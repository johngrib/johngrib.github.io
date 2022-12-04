---
layout  : wiki
title   : Clojure Evaluation
summary : 
date    : 2021-12-12 13:36:05 +0900
updated : 2021-12-12 14:51:13 +0900
tag     : clojure 번역
resource: D5/36FC0C-341D-4F8C-851C-944F6856A5B4
toc     : true
public  : true
parent  : [[/clojure/reference]]
latex   : false
---
* TOC
{:toc}

## Evaluation: Clojure Reference 문서 번역

>
Evaluation can occur in many contexts:
>
- Interactively, in the REPL
- On a sequence of forms read from a stream, via `load` / `load-file` / `load-reader` / `load-string`
- Programmatically, via `eval`

evaluation은 다양한 컨텍스트에서 가능합니다.

- REPL에서, 대화방식으로
- `load` / `load-file` / `load-reader` / `load-string` 등의 스트림을 통해 읽은 형식(form)의 시퀀스에서
- `eval`을 통해 프로그래밍 방식으로

>
Clojure programs are composed of expressions.
Every form not handled specially by a special form or macro is considered by the compiler to be an expression, which is evaluated to yield a value.
There are no declarations or statements, although sometimes expressions may be evaluated for their side-effects and their values ignored.
In all cases, evaluation is the same - a single object is considered by the compiler, evaluated, and its result returned.
If an expression needs to be compiled, it will be.
There is no separate compilation step, nor any need to worry that a function you have defined is being interpreted.
_Clojure has no interpreter._

- Clojure 프로그램은 표현식들로 이루어집니다.
- 특수한 표현식이나 매크로에 의해 특별하게 취급되지 않는 모든 형식(form)은 컴파일러에 의해 표현식(expression)으로 간주되며, 값을 산출하도록 평가됩니다.
- 어떤 경우에는 표현식이 사이드 이펙트를 발생시키도록 평가되어 값이 무시되기도 하지만, 명령만을 위한 구문이나 선언은 없습니다.
- 어떤 경우에도 evaluation은 같습니다. 객체는 컴파일러의 고려 대상이 되어 평가를 받은 다음, 결과를 리턴하게 됩니다.
- 만약 어떤 표현식이 컴파일되어야 한다면, 컴파일될 것입니다.
- 별도로 분리된 컴파일 단계가 없으므로, 여러분이 정의한 함수가 해석에서 누락될까 걱정할 필요도 없습니다.
- _Clojure에는 인터프리터가 없습니다._

>
Strings, numbers, characters, `true`, `false`, `nil` and keywords evaluate to themselves.

Stiring, number, character, `true`, `false`, `nil` 및 키워드는 있는 그대로 평가됩니다.

>
A Symbol is resolved:
>
- If it is namespace-qualified, the value is the value of the binding of the global var named by the symbol. It is an error if there is no global var named by the symbol, or if the reference is to a non-public var in a different namespace.
- If it is package-qualified, the value is the Java class named by the symbol. It is an error if there is no Class named by the symbol.
- Else, it is not qualified and the first of the following applies:
    1. If it names a special form it is considered a special form, and must be utilized accordingly.
    2. If in a local scope (e.g. in a function definition or a let form), a lookup is done to see if it names a local binding (e.g. a function argument or let-bound name). If so, the value is the value of the local binding.
    3. A lookup is done in the current namespace to see if there is a mapping from the symbol to a class. If so, the symbol is considered to name a Java class object. Note that class names normally denote class objects, but are treated specially in certain special forms, e.g. `.` and `new`.
    4. A lookup is done in the current namespace to see if there is a mapping from the symbol to a var. If so, the value is the value of the binding of the var referred-to by the symbol.
    5. It is an error.


심볼은 다음과 같이 해석됩니다.

- namespace에 한정된 심볼이라면 global var에 해당 심볼로 이름이 붙여진 값입니다.
    - 만약 해당 심볼로 이름이 붙여진 global var가 없다면 에러입니다.
    - 만약 해당 심볼이 다른 namespace에 non-public var로 등록된 레퍼런스라면 에러입니다.
- package에 한정된 심볼이라면 해당 심볼을 이름으로 갖는 Java 클래스입니다.
    - 만약 해당하는 이름을 가진 Java 클래스가 없다면 에러입니다.
- 그 외의 경우, 위치 한정이 아니라 판단하며 아래의 조건들 중 가장 먼저 만족하는 것을 따릅니다.
    1. 심볼의 이름이 특수 형식으로 간주되면 해당 특수 형식 규칙에 따라 사용해야 합니다.
    2. 로컬 스코프(가령, `let`을 사용한 함수 정의 내에서 사용하는 경우) 내에서라면, 로컬 바인딩(`let`이나 함수 인자의 이름 등처럼)에서 탐색하게 됩니다. 이런 경우에 심볼의 값은 로컬에서 해당 심볼에 바인딩해둔 값이 됩니다.
    3. 현재 namespace에서 해당 심볼의 이름과 매핑되는 class를 찾습니다.
        - 탐색이 성공하면 심볼은 Java class object를 지시하는 것으로 간주됩니다.
        - 그러나 `.`이나 `new` 같은 심볼은 특수하게 취급됩니다.
    4. 현재 namespace에서 해당 심볼의 이름과 매핑되는 var를 찾습니다.
        - 탐색이 성공하면 해당 심볼의 값은 해당 var에 바인딩된 값입니다.
    5. 그 외의 경우 에러입니다.

>
If a Symbol has metadata, it may be used by the compiler, but will not be part of the resulting value.

만약 심볼이 metadata를 갖는다면 컴파일러는 그 데이터를 사용할 수 있지만, 결과값에 metadata가 포함되지는 않을 것입니다.

>
Vectors, Sets and Maps yield vectors and (hash) sets and maps whose contents are the evaluated values of the objects they contain.
Vector elements are evaluated left to right, Sets and Maps are evaluated in an undefined order.
The same is true of metadata maps.
If the vector or map has metadata, the evaluated metadata map will become the metadata of the resulting value.

- Vector, Set, Map은 포함하고 있는 object의 평가된 값을 갖는 vector와 (hash) set, map으로 평가됩니다.
- Vector의 원소들은 왼쪽에서 오른쪽으로 평가되며, Set과 Map의 경우에는 순서 상관없이 평가됩니다.
- 이는 metadata map에도 동일하게 적용됩니다.
- 만약 vector나 map이 metadata를 갖는다면, 평가된 metadata map은 결과값의 metadata가 됩니다.

```clojure
user=> (def x 1)
user=> (def y 2)
user=> ^{:x x} [x y 3]
^{:x 1} [1 2 3]
```

>
An empty list `()` evaluates to an empty list.
>
Non-empty Lists are considered calls to either special forms, macros, or functions. A call has the form (operator operands*).

- 비어 있는 리스트를 의미하는 `()`는 비어 있는 리스트로 평가됩니다.
- 비어있지 않은 리스트는 특수한 form, macro, 함수에 대한 호출을 의미합니다.
    - 호출은 (operator operands*) 와 같은 형식을 갖습니다.

>
Special forms are primitives built-in to Clojure that perform core operations.
If the operator of a call is a symbol that resolves to the name of a special form, the call is to that special form.
Each form discussed individually under [Special Forms]( https://clojure.org/reference/special_forms ).

- 특수한 form들은 Clojure의 코어 연산을 담당하는 built-in primitive입니다.
- 만약 호출 연산자가 특수한 form으로 확인되는 심볼이라면, 호출은 해당 특수 form에 대한 것이 됩니다.
- 각각의 form에 대한 자세한 내용은 [Special Forms]( https://clojure.org/reference/special_forms ) 문서에 있습니다.

>
[Macros]( https://clojure.org/reference/macros ) are functions that manipulate forms, allowing for syntactic abstraction.
If the operator of a call is a symbol that names a global var that is a macro function, that macro function is called and is passed the unevaluated operand forms.
The return value of the macro is then evaluated in its place.

- macro는 syntactic 추상화를 허용하는 기능이며, form을 조작하는 함수라고도 할 수 있습니다.
- 만약 호출 연산자가 global var로 이름이 지정되어 있으면서 macro 함수라면, 해당 macro 함수가 호출되었을 때, 아직 평가되지 않은 operand form을 전달받게 됩니다.
    - 그리고 그 지점에서 평가된 값이 macro의 리턴값이 됩니다.

>
If the operator is not a special form or macro, the call is considered a function call.
Both the operator and the operands (if any) are evaluated, from left to right.
The result of the evaluation of the operator is cast to IFn (the interface representing Clojure functions), and invoke() is called on it, passing the evaluated arguments.
The return value of invoke() is the value of the call expression.
If the function call form has metadata, it may be used by the compiler, but will not be part of the resulting value.
Note that special forms and macros might have other-than-normal evaluation of their arguments, as described in their entries under [Special Forms]( https://clojure.org/reference/special_forms ).

- 연산자가 특수한 form이나 macro가 아니라면, 호출은 함수 호출으로 간주됩니다.
- 연산자와 연산인자(있는 경우)는 왼쪽에서 오른쪽으로 평가됩니다.
- 연산자의 평가 결과는 IFn(Clojure 함수의 인터페이스)로 캐스팅되며, 평가된 인자들을 IFn의 `invoke()`에 입력해 호출하게 됩니다.
- `invoke()`의 리턴값이 바로 호출 표현식의 결과값입니다.
- 만약 함수 호출 form이 metadata를 갖고 있다면, 컴파일러가 그 metadata를 사용할 수 있습니다. 하지만 metadata가 결과값에 포함되지는 않습니다.
- special form과 macro는 일반적이지 않은 특수한 평가 방법으로 arguments를 평가할 수 있습니다.
    - 이에 대한 자세한 내용은 [Special Forms]( https://clojure.org/reference/special_forms ) 문서에 있습니다.

>
Any object other than those discussed above will evaluate to itself.

위에서 언급한 사항 이외의 모든 object는 자기 자신으로 평가됩니다.

---

```clojure
(load classpath-resource …)
(load-file filename)
(load-reader reader)
(load-string string)
```

>
The above describes the evaluation of a single form.
The various load forms will sequentially read and evaluate the set of forms contained in the source.
Such sets of forms usually have side effects, often on the global environment, defining functions etc.

- 이들은 single form의 평가를 설명합니다.
- 이렇게 다양한 load form은 소스에 포함되어 있는 form들의 set을 순차적으로 읽고 평가하게 됩니다.
- 이러한 form들의 set은 일반적으로 global environment이나 함수 정의와 관련된 사이드 이펙트를 유발시키기도 합니다.

>
The loading functions occur in a temporary context, in which `*ns*` has a fresh binding.
That means that, should any form have an effect on that var (e.g. in-namespace), the effect will unwind at the completion of the load.
load et al return the value produced by the last expression.

- loading 기능은 `*ns*`가 새로운 바인딩을 갖는 임시 context에서 발생합니다.
- 즉, 어떤 form이 var(예: in-namespace)에 영향을 줄 수 있다면, 해당 이펙트는 load가 완료될 때 해제(unwind)됩니다.
- 그 외의 load는 마지막 expression의 값을 리턴합니다.

>
```clojure
(eval form)
```

>
Evaluates the form data structure (not text!) and returns the result.

form 자료구조(텍스트로 평가하는 게 아님!)를 평가하고, 결과를 리턴합니다.

```clojure
(eval (list + 1 2 3))
-> 6
```

## 참고문헌

- [Evaluation (clojure.org)]( https://clojure.org/reference/evaluation )

