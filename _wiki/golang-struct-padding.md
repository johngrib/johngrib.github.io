---
layout  : wiki
title   : Golang struct alignment padding
summary : 구조체 멤버 정렬 순서에 따라 구조체 크기가 달라진다
date    : 2018-10-14 21:47:38 +0900
updated : 2018-10-15 10:15:05 +0900
tag     : golang padding alignment
toc     : true
public  : true
parent  : Golang
latex   : false
---
* TOC
{:toc}

# 구조체 사이즈가 생각보다 크다?

비어 있는 struct의 사이즈는 `0` 이다.

```go
type empty struct{}
var e empty
fmt.Println(unsafe.Sizeof(e))   // 0
```

`int32` 하나만 갖고 있는 struct의 사이즈는 `4` 이다.

```go
type simple struct {
    num int32
}
var s simple
fmt.Println(unsafe.Sizeof(s))   // 4
```

`int64` 둘을 갖고 있는 struct의 사이즈는 `16` 이다.

```go
type simple struct {
    num1 int64
    num2 int64
}
var s simple
fmt.Println(unsafe.Sizeof(s))   // 16
```

그런데 `int32`와 `int64`가 있으면 `4 + 8 = 12`가 되어야 할 것 같은데 `16` 이 나온다.

```go
type simple struct {
    num1 int32
    num2 int64
}
var s simple
fmt.Println(unsafe.Sizeof(s))   // 16
```

# 왜 그럴까?

* 생각해보니 C 언어랑 똑같은 이유로 패딩을 집어넣는 것 같다.
* CPU 작동방식과 퍼포먼스 때문이다.

K&R의 The C Programming Language[^1]의 챕터 6.4를 보면 다음과 같은 말이 나온다.

>
하지만 구조체의 크기가 모든 멤버 크기의 합이라고 생각하면 안 된다.
서로 다른 대상의 정렬제한 규칙으로 인해 구조체에 이름이 붙지 않는 빈칸(hole)이 생길 수 있기 때문이다.
예를 들어, char이 1바이트이고 int가 4바이트라면 구조체는
```
struct {
    char c;
    int i;
}
```
5바이트가 아닌 8바이트를 요구할지도 모른다.

이어서 챕터 6.5에서도 다음과 같은 말이 나온다.

>
첫째, 대부분의 컴퓨터에서 요구하는 특정한 형태의 정렬제한(alignment restriction) 문제를 어떻게 만족시킬 것인가?(예: 정수는 기억장소의 짝수 주소에 저장되어야 된다는 것)  
둘째, 메모리 할당 프로그램이 여러 형태의 포인터를 리턴하도록 하려면 함수를 어떻게 선언해야 하는가?  
정렬문제는 기억장소를 조금 낭비해서 항상 모든 제한사항을 만족하는 포인터를 리턴하게 되면 일반적으로는 쉽게 해결할 수가 있다.


다음의 위키백과 글도 읽어볼 만하다.

* [Data structure alignment (wikipedia)](https://en.wikipedia.org/wiki/Data_structure_alignment )

C 언어에서 다음의 구조체는 8 byte 같지만...

```c
struct MixedData
{
    char Data1;
    short Data2;
    int Data3;
    char Data4;
};
```

컴파일하면 12 byte가 된다. (패딩이 1 byte, 3 byte 두 번 들어갔다.)

```c
struct MixedData    /* After compilation in 32-bit x86 machine */
{
    char Data1;         /* 1 byte */
    char Padding1[1];   /* 1 byte for the following 'short' to be aligned on a 2 byte boundary assuming that the address where structure begins is an even number */
    short Data2;        /* 2 bytes */
    int Data3;          /* 4 bytes - largest structure member */
    char Data4;         /* 1 byte */
    char Padding2[3];   /* 3 bytes to make total size of the structure 12 bytes */
};
```

stackoverflow를 찾아보니 다음과 같은 질문/답변이 있었다.

* <https://stackoverflow.com/questions/39063530/optimising-datastructure-word-alignment-padding-in-golang >

질문자의 코드는 다음과 같다.

```go
type Foo struct {
    w byte      //1 byte
    x byte      //1 byte
    y uint64    //8 bytes
}
type Bar struct {
    x byte      //1 byte
    y uint64    //8 bytes
    w byte      // 1 byte
}
fmt.Println(runtime.GOARCH)
newFoo := new(Foo)
fmt.Println(unsafe.Sizeof(*newFoo)) // 16
newBar := new(Bar)
fmt.Println(unsafe.Sizeof(*newBar)) // 24
```

# 그림을 그려보자

`Foo`의 `w`, `x`, `y`의 주소 값을 각각 선언된 순서대로 출력해 보았다.

```go
fmt.Println(unsafe.Sizeof(*newFoo)) // 16
fmt.Printf("%d\n", &newFoo.w)   // 824633802896
fmt.Printf("%d\n", &newFoo.x)   // 824633802897
fmt.Printf("%d\n", &newFoo.y)   // 824633802904

fmt.Println(unsafe.Sizeof(*newBar)) // 24
fmt.Printf("%d\n", &newBar.x)   // 824633795296
fmt.Printf("%d\n", &newBar.y)   // 824633795304
fmt.Printf("%d\n", &newBar.w)   // 824633795312
```

* `newFoo`의 메모리 구조를 그림으로 그려보면 다음과 같을 것이다.
* 8 칸씩으로 쪼개어 표현해보자.
* 사이즈는 `16`.

| 896 | 897 | 898 | 899 | 900 | 901 | 902 | 903 |
| w   | x   |     |     |     |     |     |     |
| 904 | 905 | 906 | 907 | 908 | 909 | 910 | 911 |
| y   | y   | y   | y   | y   | y   | y   | y   |

* `newBar`는 다음과 같을 것이다.
* 17칸인데, `newBar`의 사이즈는 `24`였으므로 뒤에 padding이 7칸 더 있을 것이다.
* 8 칸씩으로 쪼개어 표현해보자. 사이즈가 `24`인 이유를 알 수 있다.

| 296 | 297 | 298 | 299 | 300 | 301 | 302 | 303 |
| x   |     |     |     |     |     |     |     |
| 304 | 305 | 306 | 307 | 308 | 309 | 310 | 311 |
| y   | y   | y   | y   | y   | y   | y   | y   |
| 312 | 313 | 314 | 315 | 316 | 317 | 318 | 319 |
| w   |     |     |     |     |     |     |     |

* 8칸 단위로 쪼개면서 padding을 넣고 있다.
* 그렇다면 항상 8칸 단위일까? 그렇지는 않을 것이다.
    * 멤버 사이즈에 따라 달라질 것이다.

이번에는 가장 사이즈가 큰 멤버가 4 byte인 `Baz`라는 구조체를 만들어 보았다.

```go
type Baz struct {
    y uint32    // 4 bytes
    x byte      // 1 byte
    w byte      // 1 byte
}
newBaz := new(Baz)
fmt.Println(unsafe.Sizeof(*newBaz)) // 8
fmt.Printf("%d\n", &newBaz.y)   // 824633802912
fmt.Printf("%d\n", &newBaz.x)   // 824633802916
fmt.Printf("%d\n", &newBaz.w)   // 824633802917
```

* `newBaz`의 메모리 구조도 그려보았다.
* 사이즈가 `8`이고 시작 주소가 `912`이므로, 마지막 주소는 `919`일 것이다.

| 912 | 913 | 914 | 915 |
| y   | y   | y   | y   |
| 916 | 917 | 918 | 919 |
| x   | w   |     |     |

그리고 `Baz`의 멤버를 섞어서 `FooBaz`도 만들어 보았다.

```go
type FooBaz struct {
    x byte   // 1 byte
    y uint32 // 4 bytes
    w byte   // 1 byte
}
newFooBaz := new(FooBaz)
fmt.Println(unsafe.Sizeof(*newFooBaz))  // 12
fmt.Printf("%d\n", &newFooBaz.x)    // 824633802912
fmt.Printf("%d\n", &newFooBaz.y)    // 824633802916
fmt.Printf("%d\n", &newFooBaz.w)    // 824633802920
```

* `FooBaz`의 메모리 구조도 그려보았다.
* 사이즈가 `12`이고 시작 주소가 `912`이므로, 마지막 주소는 `923`일 것이다.
* 가장 큰 `y`가 4 byte이므로 4칸씩 쪼개면 다음과 같다.

| 912 | 913 | 914 | 915 |
| x   |     |     |     |
| 916 | 917 | 918 | 919 |
| y   | y   | y   | y   |
| 920 | 921 | 922 | 923 |
| w   |     |     |     |

큰 순서대로 멤버를 정렬한 `Baz`가 더 작은 크기를 갖는다.

# 착각: 기준은 가장 큰 사이즈를 갖는 멤버인가?

* 기준은 가장 큰 사이즈를 갖는 멤버인가? 그렇지 않다.
    * 그렇다면 모든 멤버가 같은 크기의 공간을 차지하게 될 것이다.
    * 그렇게 하면 용량이 더 커지고 공간의 낭비도 심해진다.

다음과 같이 `FooBaz`를 변경해 보았다. 1, 2, 4 byte 가 멤버로 들어가 있다.

```go
type FooBaz struct {
    x byte   // 1 byte
    y uint16 // 2 bytes
    z uint32 // 4 byte
}
newFooBaz := new(FooBaz)
fmt.Println(unsafe.Sizeof(*newFooBaz))  // 8
fmt.Printf("%d\n", &newFooBaz.x)    // 824633802912
fmt.Printf("%d\n", &newFooBaz.y)    // 824633802914
fmt.Printf("%d\n", &newFooBaz.z)    // 824633802916
```

만약 가장 큰 멤버를 기준으로 그림을 그린다면 다음과 같이 나와야 할 것이다.

| 912 | 913 | 914 | 915 |
| x   |     |     |     |
| 916 | 917 | 918 | 919 |
| y   | y   |     |     |
| 920 | 921 | 922 | 923 |
| z   | z   | z   | z   |

하지만 출력된 결과를 보고 그림을 그려보면 다음과 같다.

| 912 | 913 | 914 | 915 |
| x   |     | y   | y   |
| 916 | 917 | 918 | 919 |
| z   | z   | z   | z   |

# 규칙 정리

규칙은 다음과 같다.

* 순서대로 `각 멤버의 사이즈 * n` 만큼의 주소에 들어가게 되고, 그에 따라 padding이 생긴다.
* 단, 선언된 순서는 지킨다.

## 시뮬레이션 해보자

다음과 같이 시뮬레이션 할 수 있을 것이다.

* `x`가 들어간다.
    * `x`는 1 byte이므로 1칸씩 건너뛰며 들어갈 곳을 찾는다.
    * 따라서 체크하는 곳은 912, 913, 914, 915...
    * 912가 비어 있으므로 들어간다.

| **912** | 913 | 914 | 915 |
| `x`     |     |     |     |

* `y`가 들어간다.
    * `y`는 2 byte 이므로 2칸씩 건너뛰며 들어갈 곳을 찾는다.
    * 따라서 체크하는 곳은 912, 914, 916... 이면서 `x`보다 뒤인 곳.
    * 914가 비어 있으므로 들어간다.

| **912** | 913 | **914** | 915 |
| x       |     | `y`     | `y` |

* `z`가 들어간다.
    * `z`는 4 byte 이므로 4칸씩 건너뛰며 들어갈 곳을 찾는다.
    * 체크하는 곳은 912, 916, 920... 이면서 `y`보다 뒤인 곳.
    * 916이 비어 있으므로 들어간다.

| **912** | 913 | 914 | 915 |
| x       |     | y   | y   |
| **916** | 917 | 918 | 919 |
| `z`     | `z` | `z` | `z` |

## 순서를 뒤집고 시뮬레이션 해보자

순서를 뒤집으면 어떻게 될까?

```go
type FooBaz struct {
    z uint32 // 4 byte
    y uint16 // 2 bytes
    x byte   // 1 byte
}
newFooBaz := new(FooBaz)
fmt.Println(unsafe.Sizeof(*newFooBaz))  // 8
fmt.Printf("%d\n", &newFooBaz.z)    // 824633802912
fmt.Printf("%d\n", &newFooBaz.y)    // 824633802916
fmt.Printf("%d\n", &newFooBaz.x)    // 824633802918
```

일단 결과는 다음과 같다.

| 912 | 913 | 914 | 915 |
| z   | z   | z   | z   |
| 916 | 917 | 918 | 919 |
| y   | y   | x   |     |

이것도 시뮬레이션 해보자.

* `z`가 들어간다.
    * `z`는 4 byte 이므로 4칸씩 건너뛰며 들어갈 곳을 찾는다.
    * 체크하는 곳은 912, 916...
    * 912가 비어 있으므로 들어간다.

| **912** | 913 | 914 | 915 |
| `z`     | `z` | `z` | `z` |

* `y`가 들어간다.
    * `y`는 2 byte 이므로 2칸씩 건너뛰며 들어갈 곳을 찾는다.
    * 체크하는 곳은 912, 914, 916, 918... 이면서 `z`보다 뒤인 곳.
    * 916이 비어 있으므로 들어간다.

| 912     | 913 | 914 | 915 |
| z       | z   | z   | z   |
| **916** | 917 | 918 | 919 |
| `y`     | `y` |     |     |

* 마지막으로 `x`가 들어간다.
    * `x`는 1 byte 이므로 1칸씩 건너뛰며 들어갈 곳을 찾는다.
    * 체크하는 곳은 912, 913... 이면서 `y`보다 뒤인 곳.
    * 918이 비어 있으므로 들어간다.

| 912 | 913 | 914     | 915 |
| z   | z   | z       | z   |
| 916 | 917 | **918** | 919 |
| y   | y   | `x`     |     |

## 1 - 4 - 2 순서로 시뮬레이션

이번엔 4 byte가 가운데로 오게 하여, 용량이 커지는 과정을 시뮬레이션해보자.

```go
type FooBaz struct {
    x byte   // 1 byte
    z uint32 // 4 byte
    y uint16 // 2 bytes
}
newFooBaz := new(FooBaz)
fmt.Println(unsafe.Sizeof(*newFooBaz))  // 12
fmt.Printf("%d\n", &newFooBaz.x)    // 824633802912
fmt.Printf("%d\n", &newFooBaz.z)    // 824633802916
fmt.Printf("%d\n", &newFooBaz.y)    // 824633802920
```

* `x`가 들어간다.
    * `x`는 1 byte 이므로 1칸씩 건너뛰며 들어갈 곳을 찾는다.
    * 체크하는 곳은 912, 913...
    * 912가 비어 있으므로 들어간다.

| **912** | 913 | 914 | 915 |
| `x`     |     |     |     |

* `z`가 들어간다.
    * `z`는 4 byte 이므로 4칸씩 건너뛰며 들어갈 곳을 찾는다.
    * 따라서 체크하는 곳은 912, 916, 920... 이면서 `x`보다 뒤인 곳.
    * 916이 비어 있으므로 들어간다.

| 912     | 913 | 914 | 915 |
| x       |     |     |     |
| **916** | 917 | 918 | 919 |
| `z`     | `z` | `z` | `z` |

* `y`가 들어간다.
    * `y`는 2 byte 이므로 2칸씩 건너뛰며 들어갈 곳을 찾는다.
    * 따라서 체크하는 곳은 912, 914, 916... 이면서 `z`보다 뒤인 곳.
    * 914는 `z`보다 앞이므로 순서에 어긋난다. 들어갈 수 없다.
    * 920이 비어 있으므로 들어간다.

| 912     | 913 | 914 | 915 |
| x       |     |     |     |
| 916     | 917 | 918 | 919 |
| z       | z   | z   | z   |
| **920** | 921 | 922 | 923 |
| `y`     | `y` |     |     |

결과적으로 용량이 12 byte가 되었다.

# 결론

* struct 멤버 순서에 대한 컴파일 타임 최적화는 없다.
* 극한의 최적화가 필요하다면 코딩할 때 직접 순서를 정렬하는 것을 고려하자.
    * 사이즈가 큰 멤버를 작은 멤버 사이에 끼우면 용량이 늘어난다.
    * 큰 순서에서 작은 순서로 정렬하는 방법이 대부분의 상황에서 최적의 용량이 될 것 같다.

하지만 이정도 용량을 신경쓰면서 코딩해야 할까?

가독성을 위주로 코딩하는 것을 중점으로 두면서, 필요한 경우에만 정렬하면 되겠다.

# Links

* [Size and alignment guarantees (golang.org)](https://golang.org/ref/spec#Size_and_alignment_guarantees )
* [Data structure alignment](https://en.wikipedia.org/wiki/Data_structure_alignment )
* <https://stackoverflow.com/questions/39063530/optimising-datastructure-word-alignment-padding-in-golang >

# EndNotes

[^1]: C 언어 프로그래밍 수정판 Brian W. Kernighan , Dennis M. Ritchie 지음 / 김석환, 박용규, 최홍순 옮김 / 휴먼사이언스 / 2012년 06월 20일 출간

