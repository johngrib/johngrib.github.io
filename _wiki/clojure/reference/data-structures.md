---
layout  : wiki
title   : Data Structures
summary : Clojure 레퍼런스 문서 번역
date    : 2022-06-12 00:53:56 +0900
updated : 2022-06-12 14:43:09 +0900
tag     : clojure 번역
toc     : true
public  : true
parent  : [[/clojure/reference]]
latex   : false
---
* TOC
{:toc}

## Data Structures: Clojure Reference 문서 번역

- 원문: [Data Structures]( https://clojure.org/reference/data_structures )

>
Clojure has a rich set of data structures. They share a set of properties:
>
- They are immutable
- They are read-able
- They support proper value equality semantics in their implementation of equals
- They provide good hash values
- In addition, the collections:
    - Are manipulated via interfaces.
    - Support sequencing
    - Support persistent manipulation.
    - Support metadata
    - Implement java.lang.Iterable
    - Implement the non-optional (read-only) portion of java.util.Collection or java.util.Map

Clojure는 다음과 같은 속성들을 갖는 다양한 종류의 데이터 구조를 제공합니다.

- immutable 합니다.
- 읽기 전용입니다.
- 개별적인 equals 구현을 통해 동등성 판별이 용이한 값을 제공합니다.
- 적절한 hash 값을 제공합니다.
- collection의 경우
    - interface를 통해 조작합니다.
    - 시퀀스를 지원합니다.
    - 영속성 조작을 지원합니다.
    - 메타데이터를 지원합니다.
    - java.lang.Iterable을 구현합니다.
    - java.util.Collection 또는 java.util.Map의 일부분을 읽기 전용으로 구현합니다.

### nil

>
nil is a possible value of any data type in Clojure.
nil has the same value as Java null.
The Clojure conditional system is based around nil and false, with nil and false representing the values of logical falsity in conditional tests - anything else is logical truth.
In addition, nil is used as the end-of-sequence sentinel value in the sequence protocol.

nil Clojure의 모든 데이터 타입이 가질 수 있는 값입니다.

nil은 Java의 null과 같은 값입니다.

Clojure 조건 제어 시스템은 nil과 false를 기준으로 삼습니다.
조건 판별에서 nil과 false는 논리적 거짓을 표현하며, 그 외의 모든 것은 논리적 참을 의미합니다.

한편, nil은 시퀀스 프로토콜에서 시퀀스의 끝을 의미하는 sentinel 값으로 사용됩니다.


### Numbers

>
Clojure provides full support for JVM primitive values by default, allowing high performance, idiomatic Clojure code for numeric applications.
>
Clojure also supports the Java boxed number types derived from java.lang.Number, including BigInteger and BigDecimal, plus its own Ratio type. There is some special handling:

Clojure는 JVM의 primitive 값을 기본으로 지원합니다. 이를 통해 일반적인 Clojure의 코드를 사용해 수를 다루는 고성능의 애플리케이션을 만들 수 있습니다.

또한 Clojure는 java.lang.Number를 토대로 삼는 Java의 박스 타입들을 지원합니다. 이러한 지원에는 BigInteger와 BigDecimal은 물론이고 Clojure 고유의 Ratio 타입도 포함되어 있습니다.

#### Longs

>
By default Clojure operates with natural numbers as instances of Java’s long primitive type.
When a primitive integer operation results in a value that too large to be contained in a primitive value, a java.lang.ArithmeticException is thrown.
Clojure provides a set of alternative math operators suffixed with an apostrophe: +', -', *', inc', and dec'.
These operators auto-promote to BigInt upon overflow, but are less efficient than the regular math operators.

Clojure는 기본적으로 자연수를 Java의 long primitive 타입의 인스턴스로 취급합니다.

만약 primitive integer 연산의 결과 값이 primitive 타입의 범위를 벗어난다면, java.lang.ArithmeticException이 던져집니다.

Clojure 산술 연산자들에 대해 `+'`, `-'`, `*'`, `inc'`, `dec'` 처럼 뒤에 어퍼스트러피(`'`)를 붙인 대안적인 명령들도 제공합니다.
이런 연산자들은 overflow가 발생하면 자동으로 BigInt로 프로모트되지만, 일반적인 산술 연산자들에 비해 덜 효율적이라는 단점도 있습니다.

#### Ratio

>
Represents a ratio between integers.
Division of integers that can’t be reduced to an integer yields a ratio, i.e. 22/7 = 22/7, rather than a floating point or truncated value.

Ratio는 정수들의 비율을 표현합니다.

나누어 떨어지지 않는 정수의 나눗셈(예: 22/7)은 부동소수점 수나 반올림/내림한 값이 아니라 Ratio 타입으로 표현합니다.

#### Contagion

>
BigInts and floating point types are "contagious" across operations.
That is, any integer operation involving a BigInt will result in a BigInt, and any operation involving a double or float will result in a double.

BigInt와 부동소수점 수는 전파력을 갖고 있습니다.
정수 연산을 할 때 BigInt가 포함되어 있다면 결과값 BigInt가 됩니다.
그리 double 이나 float이 연산에 포함되면 결과는 double이 됩니다.

#### BigInt and BigDecimal literals

>
Numeric literals for BigInt and BigDecimal are specified using a postfix N and M respectively.

BigInt와 BigDecimal을 표현하는 수 리터럴은 각각 접미사로 `N`과 `M`을 사용합니다.

>
| Example expression                 | Return value           |
|:-----------------------------------|:-----------------------|
| `(== 1 1.0 1M)`                    | `true`                 |
| `(/ 2 3)`                          | `2/3`                  |
| `(/ 2.0 3)`                        | `0.6666666666666666`   |
| `(map #(Math/abs %) (range -3 3))` | `(3 2 1 0 1 2)`        |
| `(class 36786883868216818816N)`    | `clojure.lang.BigInt`  |
| `(class 3.14159265358M)`           | `java.math.BigDecimal` |

#### Related functions

>
Computation: [+][+] [\-][\-] [\*][\*] [/][/] [inc][inc] [dec][dec] [quot][quot] [rem][rem] [min][min] [max][max]  
Auto-promoting computation: [+'][+'] [\-'][\-'] [\*'][\*'] [inc'][inc'] [dec'][dec']  
Comparison: [\==][\==] [<][<] [<\=][<\=] [\>][\>] [\>\=][\>\=] [zero?][zero?] [pos?][pos?] [neg?][neg?]  
Bitwise operations: [bit-and][bit-and] [bit-or][bit-or] [bit-xor][bit-xor] [bit-not][bit-not] [bit-shift-right][bit-shift-right] [bit-shift-left][bit-shift-left]  
Ratios: [numerator][numerator] [denominator][denominator]  
Coercions: [int][int] [bigdec][bigdec] [bigint][bigint] [double][double] [float][float] [long][long] [num][num] [short][short]

[+]: https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/%2B
[\-]: https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/%2D
[\*]: https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/%2A
[/]: https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/%2F
[inc]: https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/inc
[dec]: https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/dec
[quot]: https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/quot
[rem]: https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/rem
[min]: https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/min
[max]: https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/max
[+']: https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/%2B%27
[\-']: https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/%2D%27
[\*']: https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/%2A%27
[inc']: https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/inc%27
[dec']: https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/dec%27
[\==]: https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/%3D%3D
[<]: https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/%3C
[<\=]: https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/%3C%3D
[\>]: https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/%3E
[\>\=]: https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/%3E%3D
[zero?]: https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/zero%3F
[pos?]: https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/pos%3F
[neg?]: https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/neg%3F
[bit-and]: https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/bit-and
[bit-or]: https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/bit-or
[bit-xor]: https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/bit-xor
[bit-not]: https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/bit-not
[bit-shift-right]: https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/bit-shift-right
[bit-shift-left]: https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/bit-shift-left
[numerator]: https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/numerator
[denominator]: https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/denominator
[int]: https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/int
[bigdec]: https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/bigdec
[bigint]: https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/bigint
[double]: https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/double
[float]: https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/float
[long]: https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/long
[num]: https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/num
[short]: https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/short

### Strings

>
Clojure strings are Java Strings.
See also [Printing](https://clojure.org/reference/other_functions#printing ).

Clojure의 string은 Java의 String과 같습니다.
자세한 내용은 [Printing](https://clojure.org/reference/other_functions#printing )을 참고하세요.

#### Related functions

[str](https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/str )
[string?](https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/string? )
[pr-str](https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/pr-str )
[prn-str](https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/prn-str )
[print-str](https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/print-str )
[println-str](https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/println-str )
[with-out-str](https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/with-out-str )

### Characters

>
Clojure characters are Java Characters.

Clojure의 character는 Java의 Character와 같습니다.

#### Related functions

[char](https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/char )
[char-name-string](https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/char-name-string )
[char-escape-string](https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/char-escape-string )


### Keywords

>
Keywords are symbolic identifiers that evaluate to themselves.
They provide very fast equality tests.
Like Symbols, they have names and optional [namespaces](https://clojure.org/reference/namespaces ), both of which are strings.
The leading ':' is not part of the namespace or name.
>
Keywords implement IFn for invoke() of one argument (a map) with an optional second argument (a default value).
For example `(:mykey my-hash-map :none)` means the same as `(get my-hash-map :mykey :none)`.
See [get](https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/get ).

키워드는 그 자체로 평가되는 기호 식별자입니다.
키워드의 동일성 테스트는 굉장히 빠릅니다.
키워드는 Symbol처럼 자신의 name을 갖고 있고, 선택적으로 namespace를 갖습니다. 그리고 name과 namespace는 둘 다 문자열로 이루어집니다.
키워드 앞의 `:`는 namespace와 name에 포함되지 않습니다.

키워드는 invoke() 메소드를 정의한 IFn 인터페이스를 구현하고 있으므로,
map 하나를 인자로 전달해 값을 얻을 수 있고 선택적으로 두 번째 인자로 default value를 전달할 수도 있습니다.
예를 들어 `(:mykey my-hash-map :none)`는 `(get my-hash-map :mykey :none)`과 같은 의미를 갖습니다.

자세한 내용은 [get](https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/get )을 참고하세요.

#### Related functions

[keyword](https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/keyword )
[keyword?](https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/keyword? )

### Symbols

>
Symbols are identifiers that are normally used to refer to something else.
They can be used in program forms to refer to function parameters, let bindings, class names and global vars.
They have names and optional [namespaces](https://clojure.org/reference/namespaces ), both of which are strings.
Symbols can have metadata (see [with-meta](https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/with-meta )).
>
Symbols, just like Keywords, implement IFn for invoke() of one argument (a map) with an optional second argument (a default value).
For example `('mysym my-hash-map :none)` means the same as `(get my-hash-map 'mysym :none)`.
See [get](https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/get ).

Symbol은 일반적으로 다른 무언가를 참조하는 식별자입니다.
Symbol은 프로그램 form에서 함수 파라미터, let binding, class 이름, global var를 참조할 때 사용합니다.
Symbol은 name을 갖고, 선택적으로 namespace를 갖습니다. 그리고 name과 namespace는 둘 다 문자열로 이루어집니다.
Symbol은 메타데이터를 가질 수 있습니다([with-meta](https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/with-meta ) 참고).

Symbol은 Keyword와 마찬가지로 invoke() 메소드를 정의한 IFn 인터페이스를 구현하고 있습니다.
따라서 map 인자 하나를 받아 값을 얻을 수 있고, 선택적으로 두 번째 인자로 default value를 전달할 수도 있습니다.
예를 들어 `('mysym my-hash-map :none)`은 `(get my-hash-map 'mysym :none)`과 같은 의미를 갖습니다.

자세한 내용은 [get](https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/get )을 참고하세요.

#### Related functions

[symbol](https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/symbol )
[symbol?](https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/symbol? )
[gensym](https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/genysm )
(see also the #-suffix [reader](https://clojure.org/reference/reader ) macro)

### Collections
### Lists (IPersistentList)
### Vectors (IPersistentVector)
### Maps (IPersistentMap)
### StructMaps
### ArrayMaps
### Sets

vf)"zymz}oz0f(r:a $x`zf(df)hviW"zyPE:delm z
