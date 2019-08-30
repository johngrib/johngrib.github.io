---
layout  : wiki
title   : JVM stack과 frame
summary : 
date    : 2019-08-30 10:05:12 +0900
updated : 2019-08-30 12:18:19 +0900
tag     : java
toc     : true
public  : true
parent  : jvm
latex   : false
---
* TOC
{:toc}

# stack과 frame?

* JVM 스레드가 생겨날 때, 해당 스레드를 위한 스택(stack)도 같이 만들어진다.[^2-5-2]
    * 그 스택엔 무엇이 들어가는가? 프레임(frame)이 들어간다.
* 그렇다면 프레임은 무엇인가?
    * 프레임은 메소드가 호출될 때마다 만들어지며, 메소드 상태 정보를 저장한다.

```ascii-art
Thread1   Thread2   Thread3
+-------+ +-------+ +-------+
|       | |       | |       |
|       | |       | | frame |
|       | |       | | frame |
| frame | |       | | frame |
| frame | | frame | | frame |
+-------+ +-------+ +-------+
```

* 스레드가 쓸 수 있는 스택의 사이즈를 넘기게 되면 `StackOverflowError`가 발생한다.
* 스택 사이즈를 동적으로 확장할 수도 있는데 확장할 메모리가 부족하거나, 새로운 스레드를 만들 때 필요한 새로운 스택에 할당할 메모리가 부족하면 `OutOfMemoryError`가 발생한다.

# frame

그리고 프레임은 다음의 3가지로 구성되어 있다.

* Local Variables
* Operand Stack
* Constant Pool Reference

## Local Variables

로컬 변수 배열은 메소드의 지역 변수들을 갖는다.

다음과 같은 자바 코드가 있다고 하자.

```java
class Test {
    public int hello(int a, double b, String c) {
        return 0;
    }
}
```

프레임의 로컬 변수 배열은 다음과 같이 만들어진다.

```ascii-art
  +-----------+
0 | reference | this (hidden)
  +-----------+
1 | int       | int a
  +-----------+
2 |           | double b
  + double    +
3 |           |
  +-----------+
4 | reference | String c
  +-----------+
```

* reference는 heap의 레퍼런스를 의미한다.
* primitive 타입은 값을 그냥 프레임에 저장한다.
    * 그래서 `int`나, `double`이 `Integer`, `Double`보다 조금 더 빠르다.
* `double`, `long`은 두 칸씩 차지한다.

## Operand Stack

오퍼랜드 스택은 메소드 내 계산을 위한 작업 공간이다. 어셈블리어나 아희, 브레인퍽 같은 언어를 다뤄봤다면 어렵지 않게 이해할 수 있다.

예를 들어 다음과 같은 `4+3`을 계산하는 자바 코드를 작성했다고 하자.

```java
package main;

class Main {
    public int test() {
        int a = 4;
        int b = 3;
        return a + b;
    }
}
```

컴파일한 다음, javap 로 바이트 코드를 확인해보자.

```sh
$ javac main.java

$ javap -c Main.class
Compiled from "main.java"
class main.Main {
  main.Main();
    Code:
       0: aload_0
       1: invokespecial #1                  // Method java/lang/Object."<init>":()V
       4: return

  public int test();
    Code:
       0: iconst_4
       1: istore_1
       2: iconst_3
       3: istore_2
       4: iload_1
       5: iload_2
       6: iadd
       7: ireturn
}
```

여기에서 주목할 것은 `public int test()`의 `Code` 부분이다.

위에서 작성한 test 메소드의 계산 내용이 바이트코드로 변환된 것을 볼 수 있다.

하나하나 살펴보자.

| 바이트코드  | 작동                                                | 자바 코드    |
|-------------|-----------------------------------------------------|--------------|
| 0: iconst_4 | 상수 4를 오퍼랜드 스택에 push.                      | `4`          |
| 1: istore_1 | pop 하여 지역 변수 배열 1번 인덱스(`int a`)에 저장. | `int a = 4`  |
| 2: iconst_3 | 상수 3을 오퍼랜드 스택에 push.                      | `3`          |
| 3: istore_2 | pop 하여 지역 변수 배열 2번 인덱스(`int b`)에 저장. | `int b = 3`  |
| 4: iload_1  | 지역 변수 배열 1번 인덱스의 값을 읽는다.            | `a`          |
| 5: iload_2  | 지역 변수 배열 2번 인덱스의 값을 읽는다.            | `b`          |
| 6: iadd     | 읽은 두 값을 더한다.                                | `a+b`        |
| 7: ireturn  | 더한 값을 리턴한다.                                 | `return a+b` |

## Constant Pool Reference

프레임은 런타임 상수 풀의 참조를 갖는다.[^2-6-3]

궁금해진다. 위의 자바 코드를 다음과 같이 수정해 보았다.

```java
package main;

class Main {
    public int test() {
        int a = 40000000;
        int b = 3;
        String name = Test.name;
        return a + b;
    }
}

class Test {
    public static final String name = "TEST";
}
```

컴파일하고, 바이트코드를 읽어보면 `0: ldc #2`와 `5: ldc #4`를 볼 수 있다.

```sh
$ javac main.java 
$ javap -c Main.class 
Compiled from "main.java"
class main.Main {
  main.Main();
    Code:
       0: aload_0
       1: invokespecial #1                  // Method java/lang/Object."<init>":()V
       4: return

  public int test();
    Code:
       0: ldc           #2                  // int 40000000
       2: istore_1
       3: iconst_3
       4: istore_2
       5: ldc           #4                  // String TEST
       7: astore_3
       8: iload_1
       9: iload_2
      10: iadd
      11: ireturn
}
```

`ldc`는 무엇을 하는 instruction일까?

[문서를 찾아보니][ldc]의 기능은 다음과 같다.

> Push item from run-time constant pool

`ldc`의 신택스는 심플하게 `ldc index`로 이루어다. 즉 뒤의 `#2`, `#4`가 바로 상수 풀의 인덱스를 의미한다.

>
The index is an unsigned byte that must be a valid index into the run-time constant pool of the current class. The run-time constant pool entry at index either must be a run-time constant of type int or float, or a reference to a string literal, or a symbolic reference to a class, method type, or method handle.

한편 위쪽의 `1: invokespecial #1`도 눈에 들어온다. `invokespecial`도 [찾아보자][invokespecial].

> Invoke instance method; special handling for superclass, private, and instance initialization method invocations

`invokespecial`의 신택스는 `invokespecial indexbyte1 indexbyte2`로 이루어진다.

그리고 조금 더 설명을 읽어보면 `invokespecial` 뒤의 `#1`도 상수 풀의 인덱스임을 알 수 있다.

> The unsigned indexbyte1 and indexbyte2 are used to construct an index into the run-time constant pool of the current class, where the value of the index is (indexbyte1 << 8) &vert; indexbyte2.



# 참고문헌

* [The Java Virtual Machine Specification, Java SE 8 Edition][jvm8]
* Java Performance Fundamental / 김한도 저 / 엑셈 / 초판 1쇄 2009년 09월 23일

# 주석

[^2-5-2]: Each Java Virtual Machine thread has a private Java Virtual Machine stack, created at the same time as the thread. A Java Virtual Machine stack stores frames. [출처][2.5.2]
[^2-6-3]: Each frame contains a reference to the run-time constant pool for the type of the current method to support dynamic linking of the method code. [출처][2.6.3]

[jvm8]: https://docs.oracle.com/javase/specs/jvms/se8/html/jvms-2.html
[jvm8-2.6]: https://docs.oracle.com/javase/specs/jvms/se8/html/jvms-2.html#jvms-2.6

[2.5.2]: https://docs.oracle.com/javase/specs/jvms/se8/html/jvms-2.html#jvms-2.5.2
[2.5.5]: https://docs.oracle.com/javase/specs/jvms/se8/html/jvms-2.html#jvms-2.5.5
[2.6.1]: https://docs.oracle.com/javase/specs/jvms/se8/html/jvms-2.html#jvms-2.6.1
[2.6.2]: https://docs.oracle.com/javase/specs/jvms/se8/html/jvms-2.html#jvms-2.6.2
[2.6.3]: https://docs.oracle.com/javase/specs/jvms/se8/html/jvms-2.html#jvms-2.6.3
[ldc]: https://docs.oracle.com/javase/specs/jvms/se8/html/jvms-6.html#jvms-6.5.ldc
[invokespecial]: https://docs.oracle.com/javase/specs/jvms/se8/html/jvms-6.html#jvms-6.5.invokespecial
