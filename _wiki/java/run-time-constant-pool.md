---
layout  : wiki
title   : Java 런타임 상수 풀
summary : 
date    : 2022-11-12 12:56:44 +0900
updated : 2022-11-12 16:26:22 +0900
tag     : java
resource: 8C/139852-F69A-45E7-AEE3-B5699F4C82B7
toc     : true
public  : true
parent  : [[/java]]
latex   : false
---
* TOC
{:toc}

## JVMS 7

### 2.5.5. Run-Time Constant Pool

[2.5.5. Run-Time Constant Pool]( https://docs.oracle.com/javase/specs/jvms/se7/html/jvms-2.html#jvms-2.5.5 )

>
A run-time constant pool is a per-class or per-interface run-time representation of the constant_pool table in a class file ([§4.4][jvms7-4-4]).
It contains several kinds of constants, ranging from numeric literals known at compile-time to method and field references that must be resolved at run-time.
The run-time constant pool serves a function similar to that of a symbol table for a conventional programming language, although it contains a wider range of data than a typical symbol table.
>
Each run-time constant pool is allocated from the Java Virtual Machine's method area ([§2.5.4][jvms7-2-5-4]).
The run-time constant pool for a class or interface is constructed when the class or interface is created ([§5.3][jvms7-5-3]) by the Java Virtual Machine.
>
The following exceptional condition is associated with the construction of the run-time constant pool for a class or interface:
>
> - When creating a class or interface, if the construction of the run-time constant pool requires more memory than can be made available in the method area of the Java Virtual Machine, the Java Virtual Machine throws an OutOfMemoryError.
>
See [§5][jvms7-5] for information about the construction of the run-time constant pool.

런타임 상수 풀은 `constant_pool` 테이블에 있는 class나 interface별 런타임 표현입니다.
런타임 상수 풀은 컴파일 타임에 알려진 숫자 리터럴부터 런타임에 반드시 확인(resolve)되어야 하는 메소드나 필드 참조에 이르기까지 다양한 종류의 상수를 취급합니다.
런타임 상수 풀은 일반적인(conventional) 프로그래밍 언어의 symbol 테이블과 비슷한 기능을 제공하지만, 일반적인 symbol 테이블에 비해 더 넓은 범위의 데이터를 포함합니다.

각각의 런타임 상수 풀은 Java Virtual Machine의 method 영역에서 할당됩니다.
class 또는 interface에 대한 런타임 상수 풀은 Java Virtual Machine에 의해 class 또는 interface가 생성될 때 생성됩니다.

단, class 또는 interface에 대한 런타임 상수 풀의 생성과 관련된 다음과 같은 예외 조건이 있습니다.

class 또는 interface를 생성할 때, 런타임 상수 풀의 생성이 Java Virtual Machine의 method 영역에서 할당할 수 있는 메모리보다 많은 메모리를 필요로 할 경우, Java Virtual Machine은 OutOfMemoryError를 던집니다.

런타임 상수 풀 생성과 관련된 자세한 내용은 [§5][jvms7-5]를 참고하세요.


### 5.1. The Run-Time Constant Pool

[5.1. The Run-Time Constant Pool (JVMS 7)]( https://docs.oracle.com/javase/specs/jvms/se7/html/jvms-5.html#jvms-5.1 )

>
The Java Virtual Machine maintains a per-type constant pool ([§2.5.5][jvms7-2-5-5]), a run-time data structure that serves many of the purposes of the symbol table of a conventional programming language implementation.

Java Virtual Machine은 타입별 상수 풀을 유지합니다.
이 풀은 런타임 데이터 구조로서, 전통적인(conventional) 프로그래밍 언어 구현에 포함되는 symbol 테이블의 다양한 기능을 지원합니다.

>
The constant_pool table ([§4.4][jvms7-4-4]) in the binary representation of a class or interface is used to construct the run-time constant pool upon class or interface creation ([§5.3][jvms7-5-3]).
All references in the run-time constant pool are initially symbolic.
The symbolic references in the run-time constant pool are derived from structures in the binary representation of the class or interface as follows:

class 또는 interface의 바이너리 표현에 들어있는 `constant_pool` 테이블은 class나 interface를 생성할 때 런타임 상수 풀을 구성하는 데 사용됩니다.
런타임 상수 풀에 들어있는 모든 참조(reference)는 symbolic으로 초기화됩니다.
런타임 상수 풀의 symbolic 참조는 다음과 같이 class나 interface의 바이너리 표현에 들어있는 구조로부터 파생됩니다.

>
- A symbolic reference to a class or interface is derived from a CONSTANT_Class_info structure ([§4.4.1][jvms7-4-4-1]) in the binary representation of a class or interface. Such a reference gives the name of the class or interface in the form returned by the `Class.getName` method, that is:
    - For a nonarray class or an interface, the name is the binary name ([§4.2.1][jvms7-4-2-1]) of the class or interface.
    - For an array class of n dimensions, the name begins with n occurrences of the ASCII "[" character followed by a representation of the element type:
        - If the element type is a primitive type, it is represented by the corresponding field descriptor ([§4.3.2][jvms7-4-3-2]).
        - Otherwise, if the element type is a reference type, it is represented by the ASCII "L" character followed by the binary name ([§4.2.1][jvms7-4-2-1]) of the element type followed by the ASCII ";" character.

>
Whenever this chapter refers to the name of a class or interface, it should be understood to be in the form returned by the Class.getName method.


- class 또는 interface에 대한 symbolic 참조는 class나 interface의 바이너리 표현에 들어있는 `CONSTANT_Class_info` 구조로부터 파생됩니다.
이러한 참조는 `Class.getName` 메소드가 반환하는 형식으로 class나 interface의 이름을 제공합니다.
    - array가 아닌 class나 interface의 경우, 이름은 class나 interface의 binary name입니다.
    - n 차원 array class의 이름은 ASCII "[" 문자가 n번 나오고, element type의 표현이 나오면서 시작합니다.
        - 만약 element type이 primitive type이라면, 해당 필드 디스크립터로 표현됩니다.
        - 만약 element type이 reference type이라면 ASCII "L" 문자가 나오고, element type의 binary name이 이어진 다음, ASCII ";" 문자가 붙습니다.

참고로 이 챕터에서 언급하는 class나 interface의 이름은 Class.getName 메소드가 반환하는 형식이라고 알아두세요.

>
- A symbolic reference to a field of a class or an interface is derived from a CONSTANT_Fieldref_info structure ([§4.4.2][jvms7-4-4-2]) in the binary representation of a class or interface. Such a reference gives the name and descriptor of the field, as well as a symbolic reference to the class or interface in which the field is to be found.
- A symbolic reference to a method of a class is derived from a CONSTANT_Methodref_info structure ([§4.4.2][jvms7-4-4-2]) in the binary representation of a class or interface. Such a reference gives the name and descriptor of the method, as well as a symbolic reference to the class in which the method is to be found.
- A symbolic reference to a method of an interface is derived from a CONSTANT_InterfaceMethodref_info structure ([§4.4.2][jvms7-4-4-2]) in the binary representation of a class or interface. Such a reference gives the name and descriptor of the interface method, as well as a symbolic reference to the interface in which the method is to be found.
- A symbolic reference to a method handle is derived from a CONSTANT_MethodHandle_info structure ([§4.4.8][jvms7-4-4-8]) in the binary representation of a class or interface.
- A symbolic reference to a method type is derived from a CONSTANT_MethodType_info structure ([§4.4.9][jvms7-4-4-9]) in the binary representation of a class or interface.
- A symbolic reference to a call site specifier is derived from a CONSTANT_InvokeDynamic_info structure ([§4.4.10][jvms7-4-4-10]) in the binary representation of a class or interface. Such a reference gives:
    - a symbolic reference to a method handle, which will serve as a bootstrap method for an invokedynamic instruction ([§invokedynamic][jvms7-6-5-invokedynamic]);
    - a sequence of symbolic references (to classes, method types, and method handles), string literals, and run-time constant values which will serve as static arguments to a bootstrap method;
    - a method name and method descriptor.

- class 또는 interface의 field에 대한 symbolic 참조는 class나 interface의 바이너리 표현에 들어있는 `CONSTANT_Fieldref_info` 구조체로부터 파생됩니다. 이러한 참조는 field의 이름, 디스크립터, 그리고 field가 위치한 class나 interface에 대한 symbolic 참조를 제공합니다.
- class의 method에 대한 symbolic 참조는 class나 interface의 바이너리 표현에 들어있는 `CONSTANT_Methodref_info` 구조체로부터 파생됩니다. 이러한 참조는 method의 이름, 디스크립터, 그리고 method가 위치한 class에 대한 symbolic 참조를 제공합니다.
- interface의 method에 대한 symbolic 참조는 class나 interface의 바이너리 표현에 들어있는 `CONSTANT_InterfaceMethodref_info` 구조체로부터 파생됩니다. 이러한 참조는 interface method의 이름, 디스크립터, 그리고 method가 위치한 interface에 대한 symbolic 참조를 제공합니다.
- method handle에 대한 symbolic 참조는 class나 interface의 바이너리 표현에 들어있는 `CONSTANT_MethodHandle_info` 구조체로부터 파생됩니다.
- method type에 대한 symbolic 참조는 class나 interface의 바이너리 표현에 들어있는 `CONSTANT_MethodType_info` 구조체로부터 파생됩니다.
- call site specifier에 대한 symbolic 참조는 class나 interface의 바이너리 표현에 들어있는 `CONSTANT_InvokeDynamic_info` 구조체로부터 파생됩니다. 이 참조는 다음을 제공합니다.
    - method handle에 대한 symbolic 참조. 이는 invokedynamic 명령의 bootstrap method로 사용됩니다.
    - bootstrap method에 대한 정적 인자로 제공되는 symbolic 참조들의 시퀀스(class, method type, method handle), string literal, 그리고 런타임 상수 값들.
    - method 이름과 method 디스크립터.

>
In addition, certain run-time values which are not symbolic references are derived from items found in the constant_pool table:

또한, 아래와 같은 symbolic 참조가 아닌 런타임 상수 값들은 constant_pool 테이블에서 찾은 아이템으로부터 파생됩니다.

>
- A string literal is a reference to an instance of class String, and is derived from a CONSTANT_String_info structure ([§4.4.3][jvms7-4-4-3]) in the binary representation of a class or interface.
The CONSTANT_String_info structure gives the sequence of Unicode code points constituting the string literal.<br/><br/>
The Java programming language requires that identical string literals (that is, literals that contain the same sequence of code points) must refer to the same instance of class String (JLS §3.10.5). In addition, if the method String.intern is called on any string, the result is a reference to the same class instance that would be returned if that string appeared as a literal. Thus, the following expression must have the value true:
```java
("a" + "b" + "c").intern() == "abc"
```
To derive a string literal, the Java Virtual Machine examines the sequence of code points given by the CONSTANT_String_info structure.
    - If the method String.intern has previously been called on an instance of class String containing a sequence of Unicode code points identical to that given by the CONSTANT_String_info structure, then the result of string literal derivation is a reference to that same instance of class String.
    - Otherwise, a new instance of class String is created containing the sequence of Unicode code points given by the CONSTANT_String_info structure; a reference to that class instance is the result of string literal derivation. Finally, the intern method of the new String instance is invoked.
- Run-time constant values are derived from CONSTANT_Integer_info, CONSTANT_Float_info, CONSTANT_Long_info, or CONSTANT_Double_info structures ([§4.4.4][jvms7-4-4-4], [§4.4.5][jvms7-4-4-5]) in the binary representation of a class or interface.<br/><br/>
Note that CONSTANT_Float_info structures represent values in IEEE 754 single format and CONSTANT_Double_info structures represent values in IEEE 754 double format ([§4.4.4][jvms7-4-4-4], [§4.4.5][jvms7-4-4-5]). The run-time constant values derived from these structures must thus be values that can be represented using IEEE 754 single and double formats, respectively.

- string 리터럴은 String class 인스턴스에 대한 참조이며, class나 interface의 바이너리 표현에 들어있는 `CONSTANT_String_info` 구조체로부터 파생됩니다.
`CONSTANT_String_info` 구조체는 string 리터럴을 구성하는 유니코드 코드 포인트들의 시퀀스를 제공합니다.<br/><br/>
Java 프로그래밍 언어에서는 '동일한 string 리터럴'(즉, 동일한 코드 포인트들의 시퀀스를 갖는 리터럴)은 String class 인스턴스에 대해 반드시 동일한 참조를 가져야 합니다(JLS §3.10.5). 또한 어떤 string에 대해 `String.intern` 메소드가 호출되면, 그 string 리터럴이 나타나는 것과 동일한 class 인스턴스를 반환하는 참조가 결과로 나옵니다. 따라서 아래의 표현식은 true 값을 가져야 합니다.
```java
("a" + "b" + "c").intern() == "abc"
```
string 리터럴을 파생하기 위해, Java 가상 머신은 `CONSTANT_String_info` 구조체로 얻은 코드 포인트들의 시퀀스를 검사합니다.
    - 만약 `String.intern` 메소드가 이전에 `CONSTANT_String_info` 구조체로부터 얻은 코드 포인트들과 동일한 시퀀스를 갖는 String class 인스턴스에 대해서 호출된 적이 있다면, string 리터럴 파생의 결과는 동일한 String class 인스턴스에 대한 참조가 됩니다.
    - 그렇지 않다면, `CONSTANT_String_info` 구조체로부터 얻은 유니코드 코드 포인트들의 시퀀스를 갖는 String class 인스턴스가 새로 생성됩니다. 그리고 그 class 인스턴스에 대한 참조가 string 리터럴 파생의 결과가 됩니다. 결국, 새로 생성된 String 인스턴스의 intern 메소드가 호출됩니다.
- 런타임 상수값들은 class나 interface의 바이너리 표현에 들어있는 `CONSTANT_Integer_info`, `CONSTANT_Float_info`, `CONSTANT_Long_info`, `CONSTANT_Double_info` 구조체로부터 파생됩니다.<br/><br/>
참고로 `CONSTANT_Float_info` 구조체는 IEEE 754 single format에 있는 값들을 나타내고, `CONSTANT_Double_info` 구조체는 IEEE 754 double format에 있는 값들을 나타냅니다. 따라서 런타임 상수값들은 `CONSTANT_Float_info` 구조체로부터 파생된 값들은 IEEE 754 single format에 있는 값들이어야 하고, `CONSTANT_Double_info` 구조체로부터 파생된 값들은 IEEE 754 double format에 있는 값들이어야 합니다.

>
The remaining structures in the constant_pool table of the binary representation of a class or interface - the CONSTANT_NameAndType_info and CONSTANT_Utf8_info structures ([§4.4.6][jvms7-4-4-6], [§4.4.7][jvms7-4-4-7]) - are only used indirectly when deriving symbolic references to classes, interfaces, methods, fields, method types, and method handles, and when deriving string literals and call site specifiers.

`constant_pool` 테이블의 나머지 구조체들(`CONSTANT_NameAndType_info`와 `CONSTANT_Utf8_info`([§4.4.6][jvms7-4-4-6], [§4.4.7][jvms7-4-4-7]))은 class나 interface의 바이너리 표현에서는 직접적으로 사용되지 않으며, 클래스, 인터페이스, 메소드, 필드, 메소드 타입, 메소드 핸들에 대한 symbolic reference를 파생할 때, 그리고 string 리터럴과 call site specifier를 파생할 때만 간접적으로 사용됩니다.


## 참고문헌

- [2.5.5. Run-Time Constant Pool (JVMS 7)]( https://docs.oracle.com/javase/specs/jvms/se7/html/jvms-2.html#jvms-2.5.5 )
- [5.1. The Run-Time Constant Pool (JVMS 7)]( https://docs.oracle.com/javase/specs/jvms/se7/html/jvms-5.html#jvms-5.1 )


[jvms7-2-5-4]: https://docs.oracle.com/javase/specs/jvms/se7/html/jvms-2.html#jvms-2.5.4
[jvms7-2-5-5]: https://docs.oracle.com/javase/specs/jvms/se7/html/jvms-2.html#jvms-2.5.5
[jvms7-4-2-1]: https://docs.oracle.com/javase/specs/jvms/se7/html/jvms-4.html#jvms-4.2.1
[jvms7-4-2-1]: https://docs.oracle.com/javase/specs/jvms/se7/html/jvms-4.html#jvms-4.2.1
[jvms7-4-4-10]: https://docs.oracle.com/javase/specs/jvms/se7/html/jvms-4.html#jvms-4.4.10
[jvms7-4-4-1]: https://docs.oracle.com/javase/specs/jvms/se7/html/jvms-4.html#jvms-4.4.1
[jvms7-4-4-2]: https://docs.oracle.com/javase/specs/jvms/se7/html/jvms-4.html#jvms-4.4.2
[jvms7-4-4-3]: https://docs.oracle.com/javase/specs/jvms/se7/html/jvms-4.html#jvms-4.4.3
[jvms7-4-4-4]: https://docs.oracle.com/javase/specs/jvms/se7/html/jvms-4.html#jvms-4.4.4
[jvms7-4-4-5]: https://docs.oracle.com/javase/specs/jvms/se7/html/jvms-4.html#jvms-4.4.5
[jvms7-4-4-6]: https://docs.oracle.com/javase/specs/jvms/se7/html/jvms-4.html#jvms-4.4.6
[jvms7-4-4-7]: https://docs.oracle.com/javase/specs/jvms/se7/html/jvms-4.html#jvms-4.4.7
[jvms7-4-4-8]: https://docs.oracle.com/javase/specs/jvms/se7/html/jvms-4.html#jvms-4.4.8
[jvms7-4-4-9]: https://docs.oracle.com/javase/specs/jvms/se7/html/jvms-4.html#jvms-4.4.9
[jvms7-4-4]: https://docs.oracle.com/javase/specs/jvms/se7/html/jvms-4.html#jvms-4.4
[jvms7-5-3]: https://docs.oracle.com/javase/specs/jvms/se7/html/jvms-5.html#jvms-5.3
[jvms7-5]: https://docs.oracle.com/javase/specs/jvms/se7/html/jvms-5.html
[jvms7-6-5-invokedynamic]: https://docs.oracle.com/javase/specs/jvms/se7/html/jvms-6.html#jvms-6.5.invokedynamic
