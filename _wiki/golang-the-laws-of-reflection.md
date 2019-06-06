---
layout  : wiki
title   : (번역) 리플렉션의 규칙들
summary : The Laws of Reflection
date    : 2019-06-05 19:20:39 +0900
updated : 2019-06-06 18:47:59 +0900
tag     : golang 번역 the-go-blog reflection
toc     : true
public  : true
parent  : Go-Blog-translation
latex   : false
---
* TOC
{:toc}

* 원문: [The Laws of Reflection by Rob Pike](https://blog.golang.org/laws-of-reflection ) (2011-09-06)
* 의역이 많으며 오역이 있을 수 있습니다.
* (역: ...) 은 원문에 없는 말을 이해를 돕기 위해 제가 추가한 것입니다.

# Introduction

**서문**

_Reflection in computing is the ability of a program to examine its own structure, particularly through types;
it's a form of metaprogramming. It's also a great source of confusion._

_In this article we attempt to clarify things by explaining how reflection works in Go.
Each language's reflection model is different (and many languages don't support it at all),
but this article is about Go, so for the rest of this article the word "reflection" should be taken to mean "reflection in Go"._

컴퓨팅에서의 리플렉션은 프로그램이 자기 자신의 구조를 (특히 타입을 통해) 검토하는 기능입니다.
리플렉션은 메타 프로그래밍의 한 형태이며, 엄청난 혼란의 원인이기도 합니다.

이 글에서는 Go 언어에서 리플렉션이 어떻게 작동하는지를 명확히 설명하고자 합니다.
여러 언어의 리플렉션 모델은 각기 다르기 마련입니다만(리플렉션을 지원하지 않는 언어도 있습니다),
이 글은 Go 언어에 대한 것이므로 이 글에서 언급하는 "리플렉션(reflection)"은 "Go 언어에서의 리플렉션"을 의미합니다.

# Types and interfaces

**타입과 인터페이스**

_Because reflection builds on the type system, let's start with a refresher about types in Go._

_Go is statically typed. Every variable has a static type, that is, exactly one type known and fixed at compile time: int, float32, *MyType, []byte, and so on. If we declare_

리플렉션이 타입 시스템을 토대로 작동하므로, Go 언어에서의 타입에 대해 다시 생각하며 시작해 봅시다.

Go는 정적 타입 언어입니다.  모든 변수는 각자 하나의 정적 타입을 갖고 있습니다.
이는 `int`, `float32`, `*MyType`, `[]byte` 등등의 타입이 컴파일 타임에 고정되는 것을 의미합니다.
만약 우리가 다음과 같이 선언한다면

```go
type MyInt int

var i int
var j MyInt
```

_then i has type int and j has type MyInt.
The variables i and j have distinct static types and, although they have the same underlying type, they cannot be assigned to one another without a conversion._

_One important category of type is interface types, which represent fixed sets of methods. An interface variable can store any concrete (non-interface) value as long as that value implements the interface's methods. A well-known pair of examples is io.Reader and io.Writer, the types Reader and Writer from the [io package](https://golang.org/pkg/io/ ):_

`i`는 `int` 타입, `j`는 `MyInt` 타입을 갖고 있습니다.
변수 `i`, `j`는 별개의 정적 타입을 갖는데, `i`와 `j`는 기본적으로는 동일한 타입이긴 하지만(역: `type MyInt int`이므로) 컨버전을 하지 않는다면 서로 값을 바꾸어 할당할 수는 없습니다.

고정된 메소드들의 집합을 의미하는 인터페이스 타입은 매우 중요한 종류의 타입에 속합니다.
어떤 구체적인(인터페이스가 아닌) 값이라도, 인터페이스의 메소드들을 구현하고 있다면 인터페이스 변수에 값을 담아둘 수 있습니다.
`io` 패키지의 `io.Reader`와 `io.Writer`가 그에 해당하는 잘 알려진 예라 할 수 있습니다.

```go
// Reader is the interface that wraps the basic Read method.
// Reader는 Read 메소드를 감싸는 인터페이스입니다.
type Reader interface {
    Read(p []byte) (n int, err error)
}

// Writer is the interface that wraps the basic Write method.
// Writer는 Write 메소드를 감싸는 인터페이스입니다.
type Writer interface {
    Write(p []byte) (n int, err error)
}
```

_Any type that implements a Read (or Write) method with this signature is said to implement io.Reader (or io.Writer). For the purposes of this discussion, that means that a variable of type io.Reader can hold any value whose type has a Read method:_

이런 시그니처를 사용해 `Read`(또는 `Writer`) 메소드를 구현하는 모든 타입을 두고 `io.Reader`(또는 `io.Writer`)를 구현한 것이라 합니다. 이 말의 의미는 `io.Reader` 타입의 변수가 `Read` 메소드를 가진 모든 종류의 값을 담을 수 있음을 의미합니다.

(역: 타입이 무엇이 되었건 간에 `Read` 메소드를 갖고 있다면 아무거나 `io.Reader` 인터페이스 타입의 변수에 넣을 수 있습니다.)

```go
var r io.Reader
r = os.Stdin
r = bufio.NewReader(r)
r = new(bytes.Buffer)
// and so on
```

(역: `io.Reader` 인터페이스 타입의 변수 `r`에 `os.Stdin`도 들어가고, `bufio.NewReader(r)`도 들어가고, `new(bytes.Buffer)`도 들어가고...)

_It's important to be clear that whatever concrete value r may hold, r's type is always io.Reader: Go is statically typed and the static type of r is io.Reader._

_An extremely important example of an interface type is the empty interface:_

`r`에 들어간 구체적인 값이 무엇이건 간에 `r`의 타입이 `io.Reader`로 고정되어 있다는 사실은 중요합니다.
Go 언어는 정적 타입 언어이고, `r`의 정적 타입은 `io.Reader` 입니다.

인터페이스 타입의 엄청나게 중요한 예는 바로 비어 있는 인터페이스(empty interface)입니다.

```go
interface{}
```

_It represents the empty set of methods and is satisfied by any value at all, since any value has zero or more methods._

_Some people say that Go's interfaces are dynamically typed, but that is misleading.
They are statically typed:
a variable of interface type always has the same static type, and even though at run time the value stored in the interface variable may change type, that value will always satisfy the interface._

_We need to be precise about all this because reflection and interfaces are closely related._

빈 인터페이스는 메소드가 하나도 없는 공집합입니다.
따라서 어떤 값을 넣어도 인터페이스를 만족시키게 됩니다.
모든 값은 반드시 0개 이상의 메소드를 갖고 있기 때문입니다.

Go 언어의 인터페이스가 동적으로 타입이 지정된다고 말하는 사람들도 있는 것 같던데, 잘못된 정보입니다.
인터페이스는 정적 타입입니다. 인터페이스 타입의 변수는 언제나 동일한 정적 타입을 갖습니다.
설령 런타임에 인터페이스 변수에 저장된 값의 타입을 바꾼다고 하더라도, 그 값은 언제나 인터페이스 조건을 만족시킬 것입니다.

우리는 이런 사실을 명확히 알아둘 필요가 있습니다.
왜냐하면 리플렉션은 인터페이스와 밀접한 관련을 갖고 있기 때문입니다.

# The representation of an interface

**인터페이스의 표현**

_Russ Cox has written a [detailed blog post](https://research.swtch.com/2009/12/go-data-structures-interfaces.html ) about the representation of interface values in Go. It's not necessary to repeat the full story here, but a simplified summary is in order._

_A variable of interface type stores a pair: the concrete value assigned to the variable, and that value's type descriptor. To be more precise, the value is the underlying concrete data item that implements the interface and the type describes the full type of that item. For instance, after_

Russ Cox는 Go 언어의 인터페이스 값 표현에 대한 상세한 글을 블로그에 남겼습니다.
그 블로그 글의 전체 내용을 이 글에서 다시 반복할 필요는 없고, 요약한 내용을 순서대로 살펴보도록 합시다.

인터페이스 타입의 변수는 한 쌍의 정보를 저장합니다.
하나는 변수에 지정된 구체적인 값이고, 다른 하나는 그 값의 타입을 설명하는 정보입니다.
정확히 말하자면 값은 인터페이스를 구현하는 기본 데이터이고,
타입은 그 데이터의 모든 타입 정보를 담고 있습니다.
다음의 예를 봅시다.

```go
var r io.Reader
tty, err := os.OpenFile("/dev/tty", os.O_RDWR, 0)
if err != nil {
    return nil, err
}
r = tty
```

(역: `os.OpenFile`는 `(*os.File, error)`를 리턴합니다. 그러므로 `tty`의 타입은 `*os.File`입니다.)

_r contains, schematically, the (value, type) pair, (tty, *os.File).
Notice that the type *os.File implements methods other than Read;
even though the interface value provides access only to the Read method, the value inside carries all the type information about that value. That's why we can do things like this:_

`r`이 담고 있는 값을 (value, type) 쌍으로 보면, (`tty`, `*os.File`)이라 할 수 있습니다.
`*os.File`이 `Read`외에도 다른 메소드들을 구현한다는 점에 주목하세요.

인터페이스가 `Read` 메소드만을 제공하고 있는데도, 내부에는 값의 타입 정보를 갖고 있습니다.
그렇기 때문에 다음과 같은 일을 할 수 있습니다.

```go
var w io.Writer
w = r.(io.Writer)
```

(역: `os/file.go`를 열어보면 `*os.File`은 `Read`와 `Write` 메소드를 둘 다 구현하고 있습니다.)

_The expression in this assignment is a type assertion; what it asserts is that the item inside r also implements io.Writer, and so we can assign it to w. After the assignment, w will contain the pair (tty, *os.File). That's the same pair as was held in r. The static type of the interface determines what methods may be invoked with an interface variable, even though the concrete value inside may have a larger set of methods._

_Continuing, we can do this:_

이 변수 할당문은 타입을 단언(type assertion)하는 것입니다.
즉, 변수 `r`에 담겨 있는 아이템이 `io.Writer`를 구현한다는 것을 단언합니다.
그래서 그 아이템을 `w`에도 할당할 수 있는 것입니다.

이 할당으로 인해 `w`는 (`tty`, `*os.File`) 쌍을 갖게 됩니다.
이것은 `r`이 갖고 있던 쌍과 같은 쌍입니다.

인터페이스의 정적 타입은 인터페이스 변수에 들어있는 값이 얼마나 많은 메소드를 갖고 있건 간에 상관없이, 인터페이스 변수로 호출할 수 있는 메소드들을 결정합니다.

그러므로 다음과 같은 것도 가능합니다.

```go
var empty interface{}
empty = w
```

_and our empty interface value empty will again contain that same pair, (tty, *os.File). That's handy: an empty interface can hold any value and contains all the information we could ever need about that value._

_(We don't need a type assertion here because it's known statically that w satisfies the empty interface. In the example where we moved a value from a Reader to a Writer, we needed to be explicit and use a type assertion because Writer's methods are not a subset of Reader's.)_

_One important detail is that the pair inside an interface always has the form (value, concrete type) and cannot have the form (value, interface type). Interfaces do not hold interface values._

_Now we're ready to reflect._

이런 빈 인터페이스 값도 똑같이 (`tty`, `*os.File`) 쌍을 갖게 됩니다.
이것은 꽤 편리한 기능입니다.
빈 인터페이스에는 모든 종류의 값을 넣을 수 있고, 우리가 나중에 그 값을 사용할 때 필요할 모든 정보도 함께 들어갑니다.

(`w`는 정적으로 빈 인터페이스 타입을 만족시키고 있기 때문에 타입을 단정할(type assertion) 필요가 없습니다. 
`Reader`에서 `Writer`로 값을 옮겨 담았던 위의 예제에서는 `Writer`의 메소드들이 `Reader`의 부분집합이 아니었기 때문에 타입 단정을 보여준 것입니다.)

여기에서 중요한 사항은 인터페이스 내부가 (value, interface type)의 형태가 아니라 항상 **(value, concrete type)**의 형태를 갖는다는 것입니다. 인터페이스는 인터페이스 값을 갖지 않습니다.

이제 리플렉트 이야기로 들어갑시다.

# The first law of reflection

**리플렉션의 첫 번째 규칙**

> 1 . Reflection goes from interface value to reflection object.  

1 . 리플렉션은 인터페이스 값에서 출발하여 리플렉션 객체로 갑니다.

_At the basic level, reflection is just a mechanism to examine the type and value pair stored inside an interface variable. To get started, there are two types we need to know about in package reflect: Type and Value.
Those two types give access to the contents of an interface variable, and two simple functions, called reflect.TypeOf and reflect.ValueOf, retrieve reflect.Type and reflect.Value pieces out of an interface value. (Also, from the reflect.Value it's easy to get to the reflect.Type, but let's keep the Value and Type concepts separate for now.)_

_Let's start with TypeOf:_

기본적으로, 리플렉션은 그저 인터페이스 변수 안에 저장된 타입과 값의 쌍을 검사하는 구조로 되어 있습니다.

우선 `reflect` 패키지에 대해 우리가 알아야 할 두 가지 타입이 있습니다.
바로 `Type`과 `Value`입니다. 

이 두 타입은 인터페이스 변수의 내용물에 대한 접근을 제공합니다. 그리고 `reflect.TypeOf`와 `reflect.ValueOf`라는 두 함수는 인터페이스 값에서 `reflect.Type`과 `reflect.Value`를 찾아 꺼내줍니다. (또한, `reflect.Value`에서 `reflect.Type`을 얻는 것은 쉬운 일입니다. 그러나 일단 `Value`와 `Type` 개념은 일단 따로따로 알아두기로 합시다.)

`typeOf`부터 시작해 봅시다.

```go
package main

import (
    "fmt"
    "reflect"
)

func main() {
    var x float64 = 3.4
    fmt.Println("type:", reflect.TypeOf(x))
}
```

_This program prints_

이 프로그램은 다음을 출력합니다.

```text
type: float64
```

_You might be wondering where the interface is here, since the program looks like it's passing the float64 variable x, not an interface value, to reflect.TypeOf. But it's there; as [godoc reports](https://golang.org/pkg/reflect/#TypeOf ), the signature of reflect.TypeOf includes an empty interface:_

이 프로그램이 인터페이스 값이 아니라 `float64` 변수 `x`를 `reflect.TypeOf` 함수에 전달하고 있기 때문에 인터페이스가 어디에 있을까 하고 궁금해하고 계실 수 있겠네요. 하지만 이 프로그램은 인터페이스를 다루고 있습니다. [godoc reports](https://golang.org/pkg/reflect/#TypeOf )를 읽어보면 `reflect.TypeOf`의 시그니처는 빈 인터페이스를 포함하고 있음을 알 수 있습니다.

```go
// TypeOf returns the reflection Type of the value in the interface{}.
// TypeOf는 interface{}에 들어있는 reflection Type 값을 리턴합니다.
func TypeOf(i interface{}) Type
```

_When we call reflect.TypeOf(x), x is first stored in an empty interface, which is then passed as the argument; reflect.TypeOf unpacks that empty interface to recover the type information._

_The reflect.ValueOf function, of course, recovers the value (from here on we'll elide the boilerplate and focus just on the executable code):_

우리가 `reflect.TypeOf(x)`를 호출하면 `x`는 먼저 함수의 인자로 전달될 빈 인터페이스에 저장됩니다.
그리고 `reflect.TypeOf`는 전달받은 빈 인터페이스 내에 숨겨진 타입 정보를 꺼내옵니다.

물론 `reflect.ValueOf` 함수도 값을 꺼내옵니다(여기에서는 상용구는 생략하고 돌아가는 코드만 보도록 합시다).

```go
var x float64 = 3.4
fmt.Println("value:", reflect.ValueOf(x).String())
```

_prints_

출력을 보면

```text
value: <float64 Value>
```

_(We call the String method explicitly because by default the fmt package digs into a reflect.Value to show the concrete value inside. The String method does not.)_

_Both reflect.Type and reflect.Value have lots of methods to let us examine and manipulate them.
One important example is that Value has a Type method that returns the Type of a reflect.Value.
Another is that both Type and Value have a Kind method that returns a constant indicating what sort of item is stored: Uint, Float64, Slice, and so on.
Also methods on Value with names like Int and Float let us grab values (as int64 and float64) stored inside:_

`String` 메소드를 호출한 이유는 `fmt` 패키지가 `reflect.Value`의 내부까지 파고 들어가서 구체적인 값을 보여주기 때문입니다. `String`은 그러지 못하거든요.

`reflect.Type`과 `reflect.Value`에는 우리가 `Type`과 `Value`를 검사하고 조작하는 데에 사용할 수 있는 많은 메소드가 들어 있습니다.
한편 `Type`과 `Value`는 `Kind` 메소드를 갖고 있는데,
이 메소드는 보관된 아이템이 어떤 종류인지(`Uint`, `Float64`, `Slice` 등등)를 의미하는 상수를 리턴합니다.
또한 `Value`에 있는 `Int`와 `Float` 같은 이름을 가진 메소드들은 내부에 저장된 값(`int64`, `float64`와 같은)을 가져옵니다.

```go
var x float64 = 3.4
v := reflect.ValueOf(x)
fmt.Println("type:", v.Type())
fmt.Println("kind is float64:", v.Kind() == reflect.Float64)
fmt.Println("value:", v.Float())
```

_prints_

출력은 다음과 같습니다.

```text
type: float64
kind is float64: true
value: 3.4
```

_There are also methods like SetInt and SetFloat but to use them we need to understand settability, the subject of the third law of reflection, discussed below._

_The reflection library has a couple of properties worth singling out. First, to keep the API simple, the "getter" and "setter" methods of Value operate on the largest type that can hold the value: int64 for all the signed integers, for instance. That is, the Int method of Value returns an int64 and the SetInt value takes an int64; it may be necessary to convert to the actual type involved:_

`SetInt`나 `SetFloat`와 같은 메소드도 있긴 하지만, 이런 것들을 사용하려면 `settability`를 먼저 이해할 필요가 있습니다. 이것은 아래쪽의 "리플렉션의 세 번째 규칙"에서 다룰 것입니다.

리플렉션 라이브러리가 독자적으로 갖는 두 가지 특징이 있습니다.

**첫 번째, API를 단순하게 유지하기 위해 `Value`의 "getter"와 "setter" 메소드는 값을 가질 수 있는 가장 큰 타입으로 작동합니다.** 예를 들어 모든 종류의 부호 있는 정수는 `int64`로 처리합니다.

즉 `Value`의 `Int` 메소드는 `int64` 값을 리턴하고, `SetInt`는 `int64` 값을 받습니다.
그렇기 때문에 실제로 사용할 타입으로 변환해 줄 필요가 있습니다.

```go
var x uint8 = 'x'
v := reflect.ValueOf(x)
fmt.Println("type:", v.Type())                            // uint8.
fmt.Println("kind is uint8: ", v.Kind() == reflect.Uint8) // true.
x = uint8(v.Uint())                                       // v.Uint returns a uint64.
```

_The second property is that the Kind of a reflection object describes the underlying type, not the static type. If a reflection object contains a value of a user-defined integer type, as in_

**두 번째, 리플렉션 객체의 `Kind`는 정적 타입이 아니라 기본 타입(underlying type)만을 설명합니다.**
만약 리플렉션 객체가 사용자 정의 정수 타입을 갖게 된다면,

```go
type MyInt int
var x MyInt = 7
v := reflect.ValueOf(x)
```

_the Kind of v is still reflect.Int, even though the static type of x is MyInt, not int. In other words, the Kind cannot discriminate an int from a MyInt even though the Type can._

`x`의 정적 타입이 `int`가 아니라 `MyInt` 인데도, `v`의 `Kind`는 변함없이 `reflect.Int`입니다.
다시 말해, `Kind`는 `int`와 `MyInt`를 구별할 수 없습니다. 그것은 `Type`이 할 수 있는 일입니다.

# The second law of reflection

**리플렉션의 두 번째 규칙**

> 2 . Reflection goes from reflection object to interface value.

2 . 리플렉션은 리플렉션 객체에서 출발하여 인터페이스 값으로 갑니다.

_Like physical reflection, reflection in Go generates its own inverse._

_Given a reflect.Value we can recover an interface value using the Interface method; in effect the method packs the type and value information back into an interface representation and returns the result:_

물리학에서의 리플렉션(반사)처럼, Go 언어에서의 리플렉션은 자신의 역을 생성합니다.

`reflect.Value`가 주어진다면, 우리는 `Interface` 메소드를 사용해서 인터페이스 값을 얻어낼 수 있습니다.
실제로 이 메소드는 타입과 값 정보를 인터페이스 표현으로 다시 포장하고 그 결과를 리턴합니다.

```go
// Interface returns v's value as an interface{}.
// Interface 함수는 v의 값을 interface{} 타입으로 리턴합니다.
func (v Value) Interface() interface{}
```

_As a consequence we can say_ 

결론적으로 우리는 다음과 같은 코드를 작성할 수 있습니다.

```go
y := v.Interface().(float64) // y will have type float64.
fmt.Println(y)
```

_to print the float64 value represented by the reflection object v._

_We can do even better, though. The arguments to fmt.Println, fmt.Printf and so on are all passed as empty interface values, which are then unpacked by the fmt package internally just as we have been doing in the previous examples. Therefore all it takes to print the contents of a reflect.Value correctly is to pass the result of the Interface method to the formatted print routine:_

이 코드는 리플렉션 객체 `v`가 나타내는 `float64` 값을 출력합니다.

물론 이 작업을 더 쉽게 할 수도 있습니다.

`fmt.Println`, `fmt.Printf` 등의 함수에 넘겨주는 인자들은 모두 빈 인터페이스 값으로 전달됩니다.
그리고 그 값들은 앞에서 본 예제와 같이 `fmt` 패키지에 의해 파헤쳐(unpacked)집니다.

따라서 `Interface` 메소드의 결과를 형식을 갖춘 출력 루틴(formatted print routine)에 전달하기만 해도, `reflect.Value`의 내용을 올바르게 출력할 수 있습니다.

```go
fmt.Println(v.Interface())
```

_(Why not fmt.Println(v)? Because v is a reflect.Value; we want the concrete value it holds.) Since our value is a float64, we can even use a floating-point format if we want:_

(`fmt.Println(v)`는 왜 안되냐고요? `v`는 `reflect.Value`이므로 구체적인 값이 필요하기 때문입니다.)

우리의 값은 `float64`이므로, 원한다면 부동 소수점 타입을 사용하는 것도 가능합니다.

```go
fmt.Printf("value is %7.1e\n", v.Interface())
```

_and get in this case_

이렇게 하면 다음과 같은 결과가 나옵니다.

```text
3.4e+00
```

_Again, there's no need to type-assert the result of v.Interface() to float64; the empty interface value has the concrete value's type information inside and Printf will recover it._

_In short, the Interface method is the inverse of the ValueOf function, except that its result is always of static type interface{}._

_Reiterating: Reflection goes from interface values to reflection objects and back again._

다시 말하자면, `v.Interface()`의 결과를 `float64` 타입으로 단언(type-assert)할 필요가 없습니다.
빈 인터페이스 값은 내부에 있는 구체적인 값의 타입 정보를 갖고 있으며, `Printf`는 그 정보를 복구할 수 있기 때문입니다.

간단히 말해서, `Interface` 메소드는 실행 결과가 항상 `interface{}` 정적 타입인 것만 제외하면 `ValueOf` 함수의 역함수인 셈입니다.

다시 강조하자면, 리플렉션은 인터페이스 값에서 출발하여 리플렉션 객체로 다시 돌아갑니다.

# The third law of reflection

**리플렉션의 세 번째 규칙**

> 3 . To modify a reflection object, the value must be settable.

3 . 리플렉션 객체를 수정하려면, 값이 설정 가능해야 합니다.

_The third law is the most subtle and confusing, but it's easy enough to understand if we start from first principles._

_Here is some code that does not work, but is worth studying._

세 번째 규칙은 가장 미묘하고 혼란스러운 것입니다.
하지만 첫 번째 원칙으로 돌아가 생각한다면 이해하는 것은 어렵지 않습니다.

다음은 돌아가지는 않지만 연구할 만한 가치가 있는 코드입니다.

```go
var x float64 = 3.4
v := reflect.ValueOf(x)
v.SetFloat(7.1) // Error: will panic.
```

_If you run this code, it will panic with the cryptic message_

이 코드를 돌려보면 `panic`이 발생하고 수수께끼 같은 메시지를 보게 될 것입니다.

```text
panic: reflect.Value.SetFloat using unaddressable value
```

_The problem is not that the value 7.1 is not addressable; it's that v is not settable. Settability is a property of a reflection Value, and not all reflection Values have it._

_The CanSet method of Value reports the settability of a Value; in our case,_

`7.1`이 `not addressable` 하다는 것이 문제가 아닙니다.
`v`가 `settable` 하지 않다는 것이 문제입니다.
설정 가능함(Settability)는 리플렉션 `Value`의 속성이지만, 모든 리플렉션 `Value`가 그 속성을 가지는 것은 아닙니다.

`Value`의 `CanSet` 메소드는 `Value`의 설정 가능 여부를 알려줍니다.

```go
var x float64 = 3.4
v := reflect.ValueOf(x)
fmt.Println("settability of v:", v.CanSet())
```

_prints_

출력은 다음과 같습니다.

```text
settability of v: false
```

_It is an error to call a Set method on an non-settable Value. But what is settability?_

_Settability is a bit like addressability, but stricter. It's the property that a reflection object can modify the actual storage that was used to create the reflection object. Settability is determined by whether the reflection object holds the original item. When we say_

설정 불가능한 `Value`의 `Set` 메소드를 호출하면 오류가 발생합니다.
그런데 설정 가능성이란 과연 무엇일까요?

설정 가능성(**Settability**)이란 주소 지정 가능성(**addressability**)과 약간 비슷하지만, 더 엄격합니다.
설정 가능성은 리플렉션 객체가 리플렉션 객체를 생성하는 데에 사용된 실제 저장소를 수정할 수 있는 속성입니다.
설정 가능성은 리플렉션 객체가 원본 아이템을 가졌는지에 따라 결정됩니다.

만약 다음과 같은 코드라면

```go
var x float64 = 3.4
v := reflect.ValueOf(x)
```

_we pass a copy of x to reflect.ValueOf, so the interface value created as the argument to reflect.ValueOf is a copy of x, not x itself. Thus, if the statement_

우리는 `x`의 사본을 `reflect.ValueOf`로 전달하게 됩니다.
그러므로 `reflect.ValueOf`의 인자로 만들어지는 인터페이스 값은 `x`의 사본이 됩니다.
`x` 자신이 아닙니다.
따라서,

```go
v.SetFloat(7.1)
```

_were allowed to succeed, it would not update x, even though v looks like it was created from x. Instead, it would update the copy of x stored inside the reflection value and x itself would be unaffected. That would be confusing and useless, so it is illegal, and settability is the property used to avoid this issue._

_If this seems bizarre, it's not. It's actually a familiar situation in unusual garb. Think of passing x to a function:_

`v`가 `x`로부터 만들어진 것처럼 보이더라도 `v`는 `x`를 업데이트하지 않습니다.
그 대신 `v`는 리플렉션 값 안에 저장된 `x`의 사본을 업데이트할 것이고,
`x`의 원본은 아무런 영향을 받지 않을 것입니다.
이는 헷갈리기도 하고 쓸모도 없으므로 허용되지 않습니다.
설정 가능성은 이 문제를 회피하기 위한 속성입니다.

이런 방식이 이상하게 보일 수 있겠지만, 그렇지만도 않습니다.
실제로는 겉보기에 특이할 뿐 실제로는 친숙한 상황이라 할 수 있습니다.
`x`를 함수에 전달한다고 생각해 봅시다.

```go
f(x)
```

_We would not expect f to be able to modify x because we passed a copy of x's value, not x itself. If we want f to modify x directly we must pass our function the address of x (that is, a pointer to x):_

`x`의 원본이 아닌 `x`의 사본을 전달했으므로, 우리는 `f`가 `x`를 수정할 수 있다고 생각하지 않습니다.
만약 `f`가 `x`를 직접적으로 수정하기 바란다면, 우리는 `x`의 주소(`x`의 포인터)를 전달해야 합니다.

```go
f(&x)
```

_This is straightforward and familiar, and reflection works the same way. If we want to modify x by reflection, we must give the reflection library a pointer to the value we want to modify._

_Let's do that. First we initialize x as usual and then create a reflection value that points to it, called p._

이는 직접적이고 익숙한 방법인데, 리플렉션도 이와 같은 방식으로 작동합니다.
리플렉션으로 `x`를 수정하려면 리플렉션 라이브러리에 수정하고 싶은 값의 포인터를 전달해야 합니다.

연습해 봅시다. 먼저 `x`를 초기화하고, `x`를 가리키는 리플렉션 값을 만들어서 `p`라고 합시다.

```go
var x float64 = 3.4
p := reflect.ValueOf(&x) // Note: take the address of x.
fmt.Println("type of p:", p.Type())
fmt.Println("settability of p:", p.CanSet())
```

_The output so far is_

출력은 다음과 같습니다.

```text
type of p: *float64
settability of p: false
```

_The reflection object p isn't settable, but it's not p we want to set, it's (in effect) *p. To get to what p points to, we call the Elem method of Value, which indirects through the pointer, and save the result in a reflection Value called v:_

리플렉션 객체 `p`는 설정 가능하지 않습니다.
그러나 우리가 실제로 값을 설정하고 싶은 것은 `p`가 아니라 `*p`입니다.
`p`가 가리키는 것을 얻으려면 포인터를 통해 간접적으로 `Value`의 `Elem` 메소드를 호출하고
그 결과를 `v`라고 불리는 리플렉션 `Value`에 저장하면 됩니다.

```go
v := p.Elem()
fmt.Println("settability of v:", v.CanSet())
```

_Now v is a settable reflection object, as the output demonstrates,_

출력을 보면 알 수 있듯, 이제 `v`는 설정 가능한 리플렉션 객체입니다.

```text
settability of v: true
```

_and since it represents x, we are finally able to use v.SetFloat to modify the value of x:_

그리고 `v`가 `x`를 나타내므로, 우리는 `v.SetFloat`을 써서 `x`의 값을 수정할 수 있습니다.

```go
v.SetFloat(7.1)
fmt.Println(v.Interface())
fmt.Println(x)
```

_The output, as expected, is_

결과는 예상과 같습니다.

```text
7.1
7.1
```

_Reflection can be hard to understand but it's doing exactly what the language does, albeit through reflection Types and Values that can disguise what's going on. Just keep in mind that reflection Values need the address of something in order to modify what they represent._

리플렉션은 이해하기 어려울 수 있습니다. 리플렉션의 `Type`과 `Value`가 실제로 일어나는 동작을 은폐하고는 있지만, 리플렉션은 언어의 목적을 정확히 수행하는 기능입니다. 리플렉션 `Value`가 나타내는 값을 수정하고자 할 때 그 값의 주소가 필요하다는 것을 꼭 기억해 두세요.

# Struct

**구조체**

_In our previous example v wasn't a pointer itself, it was just derived from one. A common way for this situation to arise is when using reflection to modify the fields of a structure. As long as we have the address of the structure, we can modify its fields._

_Here's a simple example that analyzes a struct value, t. We create the reflection object with the address of the struct because we'll want to modify it later.
Then we set typeOfT to its type and iterate over the fields using straightforward method calls (see [package reflect](https://golang.org/pkg/reflect/ ) for details). Note that we extract the names of the fields from the struct type, but the fields themselves are regular reflect.Value objects._

앞의 예제에서 `v`는 포인터 자체는 아니었습니다. `v`는 포인터에서 파생된 것입니다.
이런 상황은 일반적으로 리플렉션을 사용하여 구조체의 필드를 수정할 때 발생합니다.
즉 어떤 구조체의 주소를 갖고 있다면, 그 구조체의 필드를 수정할 수도 있습니다.

다음은 구조체 `t`의 값을 분석하는 간단한 예제입니다.
나중에 구조체를 수정해볼 것이기 때문에, 일단 구조체의 주소를 써서 리플렉션 객체를 생성합니다.
그리고 리플렉션 객체의 타입을 `typeOfT`에 할당하고, 간단한 메소드 호출을 모든 필드에 걸쳐 반복합니다(자세한 내용은 reflect 패키지를 참고하세요).

이때, 알아둬야 할 것은 우리가 `struct` 타입에서 여러 필드의 이름을 뽑아내긴 했지만, 필드 각각은 `reflect.Value` 객체라는 점입니다.

```go
type T struct {
    A int
    B string
}
t := T{23, "skidoo"}
s := reflect.ValueOf(&t).Elem()
typeOfT := s.Type()
for i := 0; i < s.NumField(); i++ {
    f := s.Field(i)
    fmt.Printf("%d: %s %s = %v\n", i,
        typeOfT.Field(i).Name, f.Type(), f.Interface())
}
```

_The output of this program is_

이 프로그램은 다음을 출력합니다.

```text
0: A int = 23
1: B string = skidoo
```

_There's one more point about settability introduced in passing here:
the field names of T are upper case (exported) because only exported fields of a struct are settable._

_Because s contains a settable reflection object, we can modify the fields of the structure._

여기에서 설정 가능성(settability)에 대해 한 가지 더 알아볼 수 있겠네요.
`T`의 필드 이름들이 모두 대문자인데, 이는 구조체에서는 오직 공개된(exported) 필드들만이 설정 가능하기 때문입니다.

`s`가 settable한 리플렉션 객체를 갖고 있기 때문에 우리는 구조체의 필드를 변경할 수 있습니다.

```go
s.Field(0).SetInt(77)
s.Field(1).SetString("Sunset Strip")
fmt.Println("t is now", t)
```

_And here's the result:_

결과는 다음과 같습니다.

```text
t is now {77 Sunset Strip}
```

_If we modified the program so that s was created from t, not &t, the calls to SetInt and SetString would fail as the fields of t would not be settable._

만약 `&t`를 써서 `s`를 만들지 않고, `t`를 써서 `s`를 만들도록 프로그램을 수정한다면,
(역: `s := reflect.ValueOf(&t).Elem()` 부분을 말합니다.)
`t`의 필드들이 설정 가능하지 않기 때문에 `SetInt`와 `SetString` 함수 호출은 실패할 것입니다.


# Conclusion

**결론**

_Here again are the laws of reflection:_

* _Reflection goes from interface value to reflection object._
* _Reflection goes from reflection object to interface value._
* _To modify a reflection object, the value must be settable._

_Once you understand these laws reflection in Go becomes much easier to use, although it remains subtle. It's a powerful tool that should be used with care and avoided unless strictly necessary._

_There's plenty more to reflection that we haven't covered — sending and receiving on channels, allocating memory, using slices and maps, calling methods and functions — but this post is long enough. We'll cover some of those topics in a later article._

_By Rob Pike_

지금까지 살펴본 리플렉션의 규칙들을 정리해 봅시다.

* 리플렉션은 인터페이스 값에서 출발하여 리플렉션 객체로 갑니다.
* 리플렉션은 리플렉션 객체에서 출발하여 인터페이스 값으로 갑니다.
* 리플렉션 객체를 수정하려면, 값이 설정 가능해야 합니다.

Go 언어의 이러한 리플렉션 규칙들을 이해한다면 훨씬 사용하기 쉬울 것입니다.
물론 리플렉션은 너무나 강력한 도구이므로 조심스럽게 사용하고, 정말 필요한 경우가 아니면 사용을 피하는 것이 좋습니다.

리플렉션에 대해 다루지 않은 많은 정보(`channel`로 뭔가를 주고받고, 메모리를 할당하고, `slice`와 `map`을 사용하고, 메소드와 함수를 호출하는 등)가 있습니다. 그러나 이 글도 충분히 길어졌으므로, 그런 것들은 다음에 다른 글에서 알아보도록 하겠습니다.

_By Rob Pike_

# License 관련 사항

* 이 번역문의 원문은 [Creative Commons Attribution 3.0 라이센스](https://creativecommons.org/licenses/by/3.0/deed.ko )를 따릅니다.
* 이 번역문의 원문에 첨부된 코드는 [BSD license](https://golang.org/LICENSE )를 따릅니다.
* 이 번역문의 원문 주소는 <https://blog.golang.org/laws-of-reflection > 입니다.
* 번역하는 과정에서 상당한 의역과 임의의 내용 추가가 있었습니다.
* 코드에 포함된 주석들 중 일부를 번역하여 주석 아래에 추가하였습니다.
