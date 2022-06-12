---
layout  : wiki
title   : Data Structures
summary : Clojure 레퍼런스 문서 번역
date    : 2022-06-12 00:53:56 +0900
updated : 2022-06-12 17:20:07 +0900
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

>
All of the Clojure collections are immutable and [persistent](https://en.wikipedia.org/wiki/Persistent_data_structure ).
In particular, the Clojure collections support efficient creation of 'modified' versions, by utilizing structural sharing, and make all of their performance bound guarantees for persistent use.
The collections are efficient and inherently thread-safe.
Collections are represented by abstractions, and there may be one or more concrete realizations.
In particular, since 'modification' operations yield new collections, the new collection might not have the same concrete type as the source collection, but will have the same logical (interface) type.
>
All the collections support [count](https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/count ) for getting the size of the collection, [conj](https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/conj ) for 'adding' to the collection, and [seq](https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/seq ) to get a sequence that can walk the entire collection, though their specific behavior is slightly different for different types of collections.
>
Because collections support the [seq](https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/seq ) function, all of the [sequence functions](https://clojure.org/reference/sequences ) can be used with any collection.

Clojure의 모든 collection은 immutable 하며 [persistent](https://en.wikipedia.org/wiki/Persistent_data_structure ) 합니다.

특히 Clojure의 collection은 내부 자료의 구조적 공유를 통해 '수정된' 버전을 효율적으로 생성할 수 있게 하면서, 영구적(persistent)인 사용을 가능하게 하기 위한 안정적인 성능도 보장합니다.
Clojure collection은 모두 효율적이며 근본적으로 thread-safe 합니다.
Clojure collection은 추상적으로 정의되어 표현되며, 하나 이상의 구체적인 구현을 갖습니다.
특히 '수정하는' 종류의 작업은 언제나 새로운 collection을 생성하는데, 이렇게 생성된 새 collection은 원본 collection과 동일한 타입이 아닐 수 있지만, 동일한 논리적(interface) 타입을 갖습니다.

모든 collection은 사이즈를 알기 위한 [count](https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/count ),
collection에 무언가를 '추가'하기 위한 [conj](https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/conj ),
collection 전체를 순회(walk)하기 위한 시퀀스를 얻을 수 있는 [seq](https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/seq )를 제공합니다.
(특정한 동작은 collection의 타입에 따라 다르게 작동합니다.)

collection이 [seq](https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/seq )함수를 지원하기 때문에, 어떠한 collection이라 하더라도 모든 종류의 [시퀀스 함수](https://clojure.org/reference/sequences )를 사용할 수 있습니다.

#### Java collection hashes

>
The Java collection interfaces specify algorithms for [Lists](https://docs.oracle.com/javase/8/docs/api/java/util/List.html#hashCode() ), [Sets](https://docs.oracle.com/javase/8/docs/api/java/util/Set.html#hashCode() ), and [Maps](https://docs.oracle.com/javase/8/docs/api/java/util/Map.html#hashCode() ) in calculating hashCode() values.
All Clojure collections conform to these specifications in their hashCode() implementations.

Java의 collection 인터페이스들은 `List`, `Set`, `Map` 를 위한 `hashCode()` 값 계산 알고리즘을 정의하고 있습니다.
Clojure collection들의 `hashCode()` 구현은 이러한 스펙을 따릅니다.

#### Clojure collection hashes

>
Clojure provides its own hash computations that provide better hash properties for collections (and other types), known as the _hasheq_ value.
>
The `IHashEq` interface marks collections that provide the `hasheq()` function to obtain the hasheq value.
In Clojure, the [hash](https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/hash ) function can be used to compute the hasheq value.
>
Ordered collections (vector, list, seq, etc) must use the following algorithm for calculating hasheq (where hash computes hasheq).
Note that unchecked-add-int and unchecked-multiply-int are used to get integer overflow calculations.

Clojure는 collection을 포함한 다양한 타입들이 더 나은 해시 속성을 가질 수 있도록, _hasheq_라고 부르는 자체적인 해시값 계산법을 제공합니다.

hasheq 값을 리턴하는 `hasheq()` 함수를 갖고 있는 collection을 표시하기 위해 `IHashEq` 인터페이스가 사용되고 있으며,
Clojure 코드에서는 `hash` 함수를 써서 hasheq 값을 계산할 수 있습니다.

순서가 있는 collection들(vector, list, seq, 등등)은 반드시 hasheq를 계산(hash 함수를 호출하면 hasheq를 계산합니다)하기 위해 다음의 알고리즘을 사용해야 합니다.
이 때, unchecked-add-int와 unchecked-multiply-int를 사용하여 정수 오버플로우 계산을 한다는 점을 주목하세요.


> ```clojure
> (defn hash-ordered [collection]
>   (-> (reduce (fn [acc e] (unchecked-add-int
>                             (unchecked-multiply-int 31 acc)
>                             (hash e)))
>               1
>               collection)
>       (mix-collection-hash (count collection))))
> ```

<span/>

>
**역주**
>
`hash-ordered` 함수는 다음 과정을 통해 collection의 해시값을 계산한다.
- reduce. `acc` 초기값으로 `1`을 설정한다.
    1. 전달받은 `acc` 값에 31을 곱한다. (`unchecked-multiply-int` 사용)
        - 왜 `31`을 쓰는지에 대해서는 [[/java/object-hashcode]] 문서 참고.
    2. collection의 원소 `e`의 해시값을 구한다.
    3. 위의 두 값을 더한다. 이 값이 reduce 다음 단계의 `acc`가 된다.
- 1 ~ 3을 반복해서 나온 값을 `hash-basis`라 한다.
- `mix-collection-hash` 함수에 collection의 `hash-basis`와 collection의 길이를 전달한다.
    - `mix-collection-hash` 함수는 `clojure.lang.Murmur3/mixCollHash` 함수를 사용해 collection의 해시값을 계산한다.
    - 이 값이 collection의 해시값이다.
>
{:style="background-color: #ecf1e8;"}

<span/>

>
Unordered collections (maps, sets) must use the following algorithm for calculating hasheq.
A map entry is treated as an ordered collection of key and value.
Note that unchecked-add-int is used to get integer overflow calculations.

순서가 없는 collection들(map, set)은 hasheq를 계산할 때 아래의 알고리즘을 반드시 사용해야 합니다.
각각의 map 엔트리는 key와 value를 갖는 하나의 순서 있는 collection으로 취급됩니다.
이번에도 unchecked-add-int를 사용하여 정수 오버플로우 계산을 한다는 점을 주목하세요.

> ```clojure
> (defn hash-unordered [collection]
>   (-> (reduce unchecked-add-int 0 (map hash collection))
>       (mix-collection-hash (count collection))))
> ```
>
The [mix-collection-hash](https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/mix-collection-hash ) algorithm is an implementation detail subject to change.

[mix-collection-hash](https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/mix-collection-hash ) 알고리즘은 구현에 따라 상세 내용이 다를 수 있습니다.


### Lists (IPersistentList)

>
Lists are collections.
They implement the ISeq interface directly.
(Note that the empty list implements ISeq as well, however the `seq` function will always return `nil` for an empty sequence.)
[count](https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/count ) is O(1).
[conj](https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/conj ) puts the item at the front of the list.

List는 collection 이며, ISeq interface를 직접 구현합니다.
(empty List도 ISeq를 구현하지만, `seq` 함수가 비어 있는 시퀀스에 대해 호출했을 때 `nil`을 리턴한다는 점에 주목하세요.)

[count](https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/count )는 O(1)입니다.
[conj](https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/conj )는 List의 앞에서부터 아이템을 삽입합니다.

#### Related functions

>
Create a list: [list](https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/list ) [list\*](https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/list* )  
Treat a list like a stack: [peek](https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/peek ) [pop](https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/pop )  
Examine a list: [list?](https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/list? )

### Vectors (IPersistentVector)

>
A Vector is a collection of values indexed by contiguous integers.
Vectors support access to items by index in log32N hops.
[count](https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/count ) is O(1).
[conj](https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/conj ) puts the item at the end of the vector.
Vectors also support [rseq](https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/rseq ), which returns the items in reverse order.
Vectors implement IFn, for invoke() of one argument, which they presume is an index and look up in themselves as if by nth, i.e. vectors are functions of their indices.
Vectors are compared first by length, then each element is compared in order.

Vector는 연속적인 정수 인덱스를 갖는 값들의 collection 입니다.
Vector는 아이템에 접근할 때 인덱스를 통해 log32N 단계를 거쳐 접근할 수 있습니다.

[count](https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/count )는 O(1)입니다.
[conj](https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/conj )는 Vector의 끝에 아이템을 삽입합니다.

Vector는 아이템들의 순서를 뒤집은 결과를 리턴하는 [rseq](https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/rseq )를 지원합니다.
Vector는 invoke() 메소드를 정의하는 IFn을 구현하여, 인자가 하나 주어지면 인덱스로 간주하여 nth를 사용해 아이템을 찾습니다.
즉, Vector는 인덱스를 인자로 받는 함수이기도 합니다.
Vector를 비교할 때에는 가장 먼저 길이를 대조하고, 그 다음에 순서대로 각각의 아이템을 비교합니다.

#### Related functions

>
Create a vector:
[vector](https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/vector )
[vec](https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/vec )
[vector-of](https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/vector-of )  
Examine a vector:
[get](https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/get )
[nth](https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/nth )
[peek](https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/peek )
[rseq](https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/rseq )
[vector?](https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/vector? )  
'change' a vector: [assoc](https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/assoc )
[pop](https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/pop )
[subvec](https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/subvec )
[replace](https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/replace )
>
See also [zippers](https://clojure.org/reference/other_libraries )

### Maps (IPersistentMap)

>
A Map is a collection that maps keys to values.
Two different map types are provided - hashed and sorted.
Hash maps require keys that correctly support hashCode and equals.
Sorted maps require keys that implement Comparable, or an instance of Comparator.
Hash maps provide faster access (log32N hops) vs (logN hops), but sorted maps are, well, sorted.
[count](https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/count ) is O(1).
[conj](https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/conj ) expects another (possibly single entry) map as the item, and returns a new map which is the old map plus the entries from the new, which may overwrite entries of the old.
[conj](https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/conj ) also accepts a MapEntry or a vector of two items (key and value).
[seq](https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/seq ) returns a sequence of map entries, which are key/value pairs.
Sorted map also supports [rseq](https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/rseq ), which returns the entries in reverse order.
Maps implement IFn, for invoke() of one argument (a key) with an optional second argument (a default value), i.e. maps are functions of their keys.
nil keys and values are ok.

Map은 key와 value 쌍을 갖는 collection 입니다.
Map은 hashed와 sorted 라는 두 가지 타입이 있습니다.

- Hash map은 hashCode와 equals를 지원하는 키값을 사용해야 합니다.
- Sorted map은 Comparable 인터페이스를 구현하거나 Comparator의 인스턴스인 키값을 사용해야 합니다.

Hash map은 log32N 단계로 접근할 수 있어 logN 으로 접근하는 sorted map보다 빠른 성능을 보입니다.

[count](https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/count )는 O(1)입니다.
[conj](https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/conj )는 다른 map(엔트리 하나만 있어도 가능)을 인자로 받아, 이전 map에 새로운 아이템을 추가하거나 기존 key를 덮어쓴 새로운 map을 리턴합니다.
[conj](https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/conj )는 또한 MapEntry를 받을 수도 있고 key/value 쌍을 의미하는 두 개의 아이템을 갖는 vector를 인자로 받기도 합니다.
[seq](https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/seq )는 map 엔트리를 순차적으로 리턴합니다.

Sorted map은 뒤집은 시퀀스를 리턴하는 [rseq](https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/rseq )도 지원합니다.

Map은 invoke() 함수를 정의한 IFn 인터페이스를 구현합니다.
하나의 인자는 key로 사용해 값을 리턴하게 되고, 선택적으로 줄 수 있는 두번째 인자는 default value를 의미합니다.
즉, Map은 자신이 갖고 있는 key에 대해 값을 리턴하는 함수로 작동합니다.
nil도 key와 value로 사용할 수 있습니다.

#### Related functions

>
Create a new map: [hash-map](https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/hash-map )
[sorted-map](https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/sorted-map )
[sorted-map-by](https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/sorted-map-by )  
'change' a map: [assoc](https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/assoc )
[dissoc](https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/dissoc )
[select-keys](https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/select-keys )
[merge](https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/merge )
[merge-with](https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/merge-with )
[zipmap](https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/zipmap )  
Examine a map: [get](https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/get )
[contains?](https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/contains? )
[find](https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/find )
[keys](https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/keys )
[vals](https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/vals )
[map?](https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/map? )  
Examine a map entry: [key](https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/key )
[val](https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/val )


### StructMaps

>
(i) Most uses of StructMaps would now be better served by [records](https://clojure.org/reference/datatypes ).

정보: 이제는 대부분의 경우 StructMap 보다 [record](https://clojure.org/reference/datatypes )를 사용하는 것이 더 낫습니다.

>
Often many map instances have the same base set of keys, for instance when maps are used as structs or objects would be in other languages.
StructMaps support this use case by efficiently sharing the key information, while also providing optional enhanced-performance accessors to those keys.
StructMaps are in all ways maps, supporting the same set of functions, are interoperable with all other maps, and are persistently extensible (i.e. struct maps are not limited to their base keys).
The only restriction is that you cannot dissociate a struct map from one of its base keys.
A struct map will retain its base keys in order.
>
StructMaps are created by first creating a structure basis object using [create-struct](https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/create-struct ) or [defstruct](https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/defstruct ), then creating instances with [struct-map](https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/struct-map ) or [struct](https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/struct ).

다른 언어에서 구조체나 객체를 쓰는 것처럼, 같은 key 세트를 갖고 있는 map 인스턴스를 쓰는 경우가 종종 있습니다.
StructMap은 이러한 사용 사례를 지원하는 것으로, 효율성을 위해 key 정보를 공유하며 key에 대해 더 높은 성능을 가진 접근자를 선택적으로 제공합니다.
StructMap은 모든 면에서 map과 같은 기능을 갖고 있습니다.
map에서 사용할 수 있는 것과 같은 함수들을 지원하고, 다른 모든 map들과도 함께 사용할 수 있으며, 지속적으로 확장할 수 있습니다(StructMap은 base key만 갖도록 제한되지 않습니다).
StructMap의 유일한 제약사항은 base key를 dissociate할 수 없다는 것입니다.
StructMap은 base key를 순서대로 유지합니다.

StructMap는 [create-struct](https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/create-struct ) 또는 [defstruct](https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/defstruct )를 사용하여 베이스 객체를 생성하고, [struct-map](https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/struct-map ) 또는 [struct](https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/struct )를 사용하여 인스턴스를 생성합니다.

> ```clojure
> (defstruct desilu :fred :ricky)
> (def x (map (fn [n]
>               (struct-map desilu
>                 :fred n
>                 :ricky 2
>                 :lucy 3
>                 :ethel 4))
>              (range 100000)))
> (def fred (accessor desilu :fred))
> (reduce (fn [n y] (+ n (:fred y))) 0 x)
>  -> 4999950000
> (reduce (fn [n y] (+ n (fred y))) 0 x)
>  -> 4999950000
> ```

#### Related functions

>
StructMap setup: [create-struct](https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/create-struct )
[defstruct](https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/defstruct )
[accessor](https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/accessor )  
Create individual struct: [struct-map](https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/struct-map )
[struct](https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/struct )


### ArrayMaps

>
When doing code form manipulation it is often desirable to have a map which maintains key order.
An array map is such a map - it is simply implemented as an array of key val key val...
As such, it has linear lookup performance, and is only suitable for _very small_ maps.
It implements the full map interface.
New ArrayMaps can be created with the [array-map](https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/array-map ) function.
Note that an array map will only maintain sort order when un-'modified'.
Subsequent assoc-ing will eventually cause it to 'become' a hash-map.

코드 form을 조작할 때 key 순서를 유지하는 map이 필요한 경우가 종종 있습니다.

ArrayMap이 바로 그런 특징을 갖는 map 입니다. 단순하게 key, value, key, value, ... 를 순서대로 집어넣은 배열로 구현한 map 이죠.
이와 같은 구현 때문에 조회를 할 때 선형으로 증가하는 성능을 가지며, _아주 적은_ 수의 엔트리를 갖는 map이 필요할 때 사용하는 것이 적절합니다.
ArrayMap 또한 map interface를 완전히 구현하고 있습니다.

[array-map](https://clojure.github.io/clojure/clojure.core-api.html#clojure.core/array-map ) 함수를 호출해서 새로운 ArrayMap을 생성할 수 있습니다.
ArrayMap은 수정되지 않은 경우에만 정렬 순서를 유지한다는 것을 기억해 두세요.
생성 후에 엔트리를 추가하면 ArrayMap이 아니라 hash-map이 될 수 있습니다.

### Sets

vf)"zymz}oz0f(r:a $x`zf(df)hviW"zyPE:delm z
