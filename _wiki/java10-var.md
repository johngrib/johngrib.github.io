---
layout  : wiki
title   : Java의 var
summary : 
date    : 2019-09-12 21:13:19 +0900
updated : 2019-09-12 22:01:56 +0900
tag     : java
toc     : true
public  : true
parent  : [[Java]]
latex   : false
---
* TOC
{:toc}


Java 10부터 var 키워드를 통해 변수를 선언할 수 있게 됐다.


## Examples

* 올바른 사용과 잘못된 사용

```java
var a = 1;            // Legal
var b = 2, c = 3.0;   // Illegal: multiple declarators
var d[] = new int[4]; // Illegal: extra bracket pairs
var e;                // Illegal: no initializer
var f = { 6 };        // Illegal: array initializer
var g = (g = 7);      // Illegal: self reference in initializer
```

* 타입

```java
var a = 1;                // a has type 'int'
var b = java.util.List.of(1, 2);  // b has type 'List<Integer>'
var c = "x".getClass();   // c has type 'Class<? extends String>' 
                          // (see JLS 15.12.2.6)
var d = new Object() {};  // d has the type of the anonymous class
var e = (CharSequence & Comparable<String>) "x";
                          // e has type CharSequence & Comparable<String>
var f = () -> "hello";    // Illegal: lambda not in an assignment context
var g = null;             // Illegal: null type
```

## 참고문헌

* [Java 10 spec][local-var]

[local-var]: https://docs.oracle.com/javase/specs/jls/se10/html/jls-14.html#jls-14.4
