---
layout  : wiki
title   : Go type
summary : Golang의 타입
date    : 2018-10-14 17:04:19 +0900
updated : 2018-10-14 21:48:34 +0900
tag     : golang type
toc     : true
public  : true
parent  : Golang
latex   : false
---
* TOC
{:toc}


# 타입 사이즈 알아내기

* `unsafe.Sizeof`를 사용하면 타입의 byte 크기를 알아낼 수 있다.
    * <https://golang.org/pkg/unsafe/#Sizeof >

```go
package main

import "fmt"
import "unsafe"

func main() {
	fmt.Println(unsafe.Sizeof(true))        // 1
	fmt.Println(unsafe.Sizeof(uint8(1)))    // 1
	fmt.Println(unsafe.Sizeof(uint32(1)))   // 4
	fmt.Println(unsafe.Sizeof(uint64(1)))   // 8
}
```

# 타입 목록

* <https://golang.org/ref/spec#Numeric_types >

| name       | description                                | byte  |
|------------|--------------------------------------------|-------|
| bool       | false, true                                | 1     |
| uint8      | 0 ~ 255                                    | 1     |
| uint16     | 0 ~ 65535                                  | 2     |
| uint32     | 0 ~ 4294967295                             | 4     |
| uint64     | 0 ~ 18446744073709551615                   | 8     |
| int8       | -128 ~ 127                                 | 1     |
| int16      | -32768 ~ 32767                             | 2     |
| int32      | -2147483648 ~ 2147483647                   | 4     |
| int64      | -9223372036854775808 ~ 9223372036854775807 | 8     |
| byte       | uint8 의 alias                             | 1     |
| rune       | int32 의 alias                             | 4     |
| uint       | 하드웨어 아키텍처에 따라 int32 또는 int64  | 4, 8  |
| int        | 하드웨어 아키텍처에 따라 int32 또는 int64  | 4, 8  |
| uintptr    | 포인터 값을 저장하기 위한 unsigned int     |       |
| float32    | IEEE-754 32-bit 부동 소수점 숫자           | 4     |
| float64    | IEEE-754 64-bit 부동 소수점 숫자           | 8     |
| complex64  | float32 실수부와 float32 허수부로 구성     | 8     |
| complex128 | float64 실수부와 float64 허수부로 구성     | 16    |
| string     | 포인터와 길이 두 값으로 구성               | 8, 16 |

* 참고: <https://github.com/tyranron/golang-sizeof.tips/blob/master/internal/parser/types.go >
* `uintptr` 는 다른 언어에서도 그렇듯, 하드웨어 아키텍처에 따라 사이즈가 다를 것이다.
    * 32비트 아키텍처에서 4 byte, 64비트 아키텍처에서 8 byte.

## int의 min, max 값 구하기

* <https://groups.google.com/forum/#!msg/golang-nuts/a9PitPAHSSU/ziQw1-QHw3EJ >
    * 간단한 bit operation을 통해 int의 min, max 값을 구할 수 있다.

```go
const MaxUint = ^uint64(0)              // 18446744073709551615
const MinUint = 0                       // 0
const MaxInt = int64(^uint64(0) >> 1)   // 9223372036854775807
const MinInt = -MaxInt - 1              // -9223372036854775808
```

## CPU 아키텍처 확인

* <https://golang.org/pkg/runtime/internal/sys/#GOARCH >
* 이건 그냥 운영체제에서 제공하는 시스템 정보를 봐도 된다.
* 굳이 코드로 확인하고 싶다면 `runtime.GOARCH`를 사용.

```go
package main

import "fmt"
import "runtime"

func main() {
	const GOARCH string = runtime.GOARCH
	fmt.Println(GOARCH) // amd64
}
```

## string

* <https://research.swtch.com/godata#Strings >

>
A string is represented in memory as a 2-word structure containing a pointer to the string data and a length. Because the string is immutable, it is safe for multiple strings to share the same storage, so slicing s results in a new 2-word structure with a potentially different pointer and length that still refers to the same byte sequence. This means that slicing can be done without allocation or copying, making string slices as efficient as passing around explicit indexes.

![string](https://user-images.githubusercontent.com/1855714/46915840-92631a80-cfec-11e8-9e82-175d7cec7693.png )

* string의 구조는 2 word로 되어 있다.
    * 배열의 첫 번째 인덱스의 포인터
    * 배열의 길이

따라서 문자열이 짧건 길건 관계없이, 변수의 사이즈는 동일하다.

```go
fmt.Println(runtime.GOARCH)         // amd64
fmt.Println(unsafe.Sizeof("hi"))    // 16
fmt.Println(unsafe.Sizeof("Hello")) // 16
```

* string은 immutable 하다.
* string을 slicing하는 것은 매우 효율적이다.
    * 문자열을 slicing하면 원본 문자열을 참조하는 새로운 포인터가 생긴다.
    * 문자열의 일부를 복사하거나 새로운 메모리 할당을 하지 않기 때문에 효율적이다.


# Links

* <https://golang.org/ref/spec >
    * <https://golang.org/ref/spec#Types >
    * <https://golang.org/ref/spec#Struct_types >
* <https://research.swtch.com/godata >

