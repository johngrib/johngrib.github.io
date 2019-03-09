---
layout  : wiki
title   : Go cheatsheet
summary : golang을 배우면서 까먹기 쉬운 것들을 적어두자
date    : 2018-10-01 10:30:40 +0900
updated : 2018-10-19 22:21:31 +0900
tag     : golang cheatsheet
toc     : true
public  : true
parent  : Golang
latex   : false
---
* TOC
{:toc}

# 연산자

## Arithmetic operators

<https://golang.org/ref/spec#Arithmetic_operators >

```
+    sum                    integers, floats, complex values, strings
-    difference             integers, floats, complex values
*    product                integers, floats, complex values
/    quotient               integers, floats, complex values
%    remainder              integers

&    bitwise AND            integers
|    bitwise OR             integers
^    bitwise XOR            integers
&^   bit clear (AND NOT)    integers

<<   left shift             integer << unsigned integer
>>   right shift            integer >> unsigned integer
```


## Operator precedence

<https://golang.org/ref/spec#Operator_precedence >

연산자 우선순위는 다음과 같다.

```
Precedence    Operator
    5             *  /  %  <<  >>  &  &^
    4             +  -  |  ^
    3             ==  !=  <  <=  >  >=
    2             &&
    1             ||
```






# getter와 setter

[Effective Go - Getters](https://golang.org/doc/effective_go.html?#Getters )

* golang은 자동 getter/setter를 지원하지 않는다.
* getter
    * getter를 만들 때에는 `get`을 쓰지 않는다.
    * 그냥 해당 변수명을 메소드 이름으로 쓰면 된다.
    * 예) `foo`에 대한 getter는 `Foo()`.
        * `getFoo()`가 아니다.
* setter
    * setter는 `SetFoo()`와 같이 만들면 된다.

# interface

## naming

[Effective Go - Interface names](https://golang.org/doc/effective_go.html?#interface-names )

* one-method interface 이름은 메소드 이름에 `er`을 붙여 만든다.
    * `Read` 메소드가 하나 있다면 인터페이스 이름은 `Reader`.


## golang에서의 toString은?

`fmt` 패키지의 `print.go`를 열어보면 `Stringer` 인터페이스가 있다.

```go
// Stringer is implemented by any value that has a String method,
// which defines the ``native'' format for that value.
// The String method is used to print values passed as an operand
// to any format that accepts a string or to an unformatted printer
// such as Print.
type Stringer interface {
	String() string
}
```

`Stringer` 인터페이스에는 `String()`이 있고, 이것이 toString 의 역할을 한다.

다음 코드를 실행해보면 확인할 수 있다.

```go
package main

import "fmt"

type binary int

func (b binary) String() string {
	return fmt.Sprintf("%b", b)
}

func main() {
	fmt.Println(binary(8))  // 1000
}
```


# Links

* [Effective Go](https://golang.org/doc/effective_go.html )

