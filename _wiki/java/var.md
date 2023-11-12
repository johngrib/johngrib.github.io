---
layout  : wiki
title   : Java의 var
summary : 
date    : 2019-09-12 21:13:19 +0900
updated : 2023-11-12 18:01:05 +0900
tag     : java
resource: 02/76470F-F819-4653-8CF2-4B2A0E9517F7
toc     : true
public  : true
parent  : [[/java]]
latex   : false
---
* TOC
{:toc}


Java 10부터 var 키워드를 통해 변수를 선언할 수 있게 됐다.

## From: JEP 286

다음은 [JEP 286의 Description 섹션 앞부분](https://openjdk.org/jeps/286#Description )을 인용해 간략히 번역한 것이다.

>
**Description**
>
For local variable declarations with initializers, enhanced for-loop indexes, and index variables declared in traditional for loops, allow the reserved type name `var` to be accepted in place of manifest types:

이니셜라이저가 포함된 로컬 변수 선언, 향상된 for 루프 인덱스, 전통적 방식의 for 루프에서 선언된 인덱스 변수의 경우 매니페스트 타입 대신 예약된 타입 이름 `var`를 사용할 수 있습니다.

>
```java
var list = new ArrayList<String>(); // infers ArrayList<String>
var stream = list.stream();         // infers Stream<String>
```

>
The identifier `var` is not a keyword; instead it is a reserved type name.
This means that code that uses var as a variable, method, or package name will not be affected; code that uses var as a class or interface name will be affected (but these names are rare in practice, since they violate usual naming conventions).

식별자 var는 키워드가 아니라 예약된 타입명입니다.
즉, 변수, 메서드 또는 패키지 이름으로 `var`를 사용하는 코드는 영향을 받지 않지만 클래스 또는 인터페이스 이름으로 `var`를 사용하는 코드는 영향을 받습니다(하지만 이러한 이름은 일반적인 명명 규칙을 위반하므로 실제로는 드물게 사용됩니다).


## Examples

* 올바른 사용과 잘못된 사용

```java
// 문제 없음
var a = 1;            // Legal

// 잘못된 사용
var b = 2, c = 3.0;   // Illegal: multiple declarators
var d[] = new int[4]; // Illegal: extra bracket pairs
var e;                // Illegal: no initializer
var f = { 6 };        // Illegal: array initializer
var g = (g = 7);      // Illegal: self reference in initializer
```

* 타입

```java
// 문제 없음
var a = 1;                // a has type 'int'
var b = java.util.List.of(1, 2);  // b has type 'List<Integer>'
var c = "x".getClass();   // c has type 'Class<? extends String>' 
                          // (see JLS 15.12.2.6)
var d = new Object() {};  // d has the type of the anonymous class
var e = (CharSequence & Comparable<String>) "x";
                          // e has type CharSequence & Comparable<String>
// 잘못된 사용
var f = () -> "hello";    // Illegal: lambda not in an assignment context
var g = null;             // Illegal: null type
```

## 참고문헌

- [Java 10 spec][local-var]
- [JEP 286: Local-Variable Type Inference]( https://openjdk.org/jeps/286 )

[local-var]: https://docs.oracle.com/javase/specs/jls/se10/html/jls-14.html#jls-14.4
