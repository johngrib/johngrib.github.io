---
layout  : wiki
title   : Java volatile
summary : 
date    : 2022-02-01 10:46:59 +0900
updated : 2022-02-01 13:55:16 +0900
tag     : java
toc     : true
public  : true
parent  : [[/java]]
latex   : false
---
* TOC
{:toc}

## From: Java Language Specification 7~17

JLS의 8.3.1.4. volatile Fields 항목은 Java 7 버전에서 Java 17버전에 이르기까지 한 글자의 변화도 없다.

- [JLS 17 - 8.3.1.4. volatile Fields]( https://docs.oracle.com/javase/specs/jls/se17/html/jls-8.html#jls-8.3.1.4 )
- [JLS 7 - 8.3.1.4. volatile Fields]( https://docs.oracle.com/javase/specs/jls/se7/html/jls-8.html#jls-8.3.1.4 )

아래는 JLS 17의 8.3.1.4. 절을 내가 번역한 것이다.

>
**8.3.1.4. volatile Fields**
>
The Java programming language allows threads to access shared variables ([§17.1]( https://docs.oracle.com/javase/specs/jls/se11/html/jls-17.html#jls-17.1 )).
As a rule, to ensure that shared variables are consistently and reliably updated, a thread should ensure that it has exclusive use of such variables by obtaining a lock that, conventionally, enforces mutual exclusion for those shared variables.

- Java 프로그래밍 언어는 공유된 변수에 스레드들이 접근하는 것을 허용합니다.
- 공유된 변수의 일관성있고 신뢰성있는 업데이트를 보장하기 위해,
- 스레드는 공유된 변수에 대해 상호 배재를 강제하는 잠금을 획득하여 공유된 변수의 독점적인 사용을 보장해야 합니다.

>
The Java programming language provides a second mechanism, volatile fields, that is more convenient than locking for some purposes.
>
A field may be declared volatile, in which case the Java Memory Model ensures that all threads see a consistent value for the variable ([§17.4]( https://docs.oracle.com/javase/specs/jls/se17/html/jls-17.html#jls-17.4 )).
>
**It is a compile-time error if a final variable is also declared volatile.**

- Java 프로그래밍 언어는 잠금보다 더 편리한 메커니즘인 `volatile` 필드를 제공합니다.
- 필드는 `volatile`로 선언될 수 있으며, 이 경우 Java 메모리 모델은 모든 스레드가 변수에 대해 일관된 값을 볼 수 있도록 합니다.
- 만약 `final` 변수에 `volatile`도 선언하면 컴파일 타임 에러입니다.

>
**Example 8.3.1.4-1. volatile Fields**
>
If, in the following example, one thread repeatedly calls the method one (but no more than Integer.MAX_VALUE times in all), and another thread repeatedly calls the method two:

다음 예제에서 스레드 하나는 반복적으로 `one` 메소드를 호출하고(호출 횟수는 `Integer.MAX_VALUE`를 넘지 않음), 다른 스레드 하나는 반복적으로 `two` 메소드를 호출합니다.

> ```java
> class Test {
>     static int i = 0, j = 0;
>     static void one() { i++; j++; }
>     static void two() {
>         System.out.println("i=" + i + " j=" + j);
>     }
> }
> ```
>
then method two could occasionally print a value for `j` that is greater than the value of `i`, because the example includes no synchronization and, under the rules explained in [§17.4]( https://docs.oracle.com/javase/specs/jls/se17/html/jls-17.html#jls-17.4 ), the shared values of `i` and `j` might be updated out of order.

`two` 메소드는 `i`와 `j`를 출력하는 일만 하는데, 가끔씩 `i`보다 값이 큰 `j`를 출력할 수 있습니다.
왜냐하면 이 예제에는 (17.4 절에서 설명된) 동기화가 사용되지 않았기 때문입니다.
즉, 공유된 변수인 `i`와 `j`는 예상과는 달리 비순차적으로 업데이트될 수 있습니다.

>
One way to prevent this out-or-order behavior would be to declare methods one and two to be synchronized ([§8.4.3.6]( https://docs.oracle.com/javase/specs/jls/se17/html/jls-8.html#jls-8.4.3.6 )):

이런 비순차적 동작을 방지하는 방법 하나는 `one`과 `two` 메소드를 `synchronized`로 선언하는 것입니다.

> ```java
> class Test {
>     static int i = 0, j = 0;
>     static synchronized void one() { i++; j++; }
>     static synchronized void two() {
>         System.out.println("i=" + i + " j=" + j);
>     }
> }
> ```

>
This prevents method `one` and method `two` from being executed concurrently, and furthermore guarantees that the shared values of `i` and `j` are both updated before method `one` returns.
Therefore method `two` never observes a value for `j` greater than that for `i`; indeed, it always observes the same value for `i` and `j`.

이렇게 하면 `one`, `two` 메소드가 동시에(concurrently) 실행되는 것을 방지하며,
`one` 메소드가 값을 리턴하기 전에 공유된 값인 `i`와 `j`가 업데이트되는 것을 보장합니다.
그러므로 `two` 메소드를 실행한 결과에서 `i`와 `j`는 항상 같은 값으로 출력될 것이며, `j`가 `i`보다 큰 경우는 절대로 관찰할 수 없을 것입니다.

>
Another approach would be to declare `i` and `j` to be `volatile`:

다른 접근방법은 `i`와 `j`를 `volatile`로 선언하는 것입니다.

> ```java
> class Test {
>     static volatile int i = 0, j = 0;
>     static void one() { i++; j++; }
>     static void two() {
>         System.out.println("i=" + i + " j=" + j);
>     }
> }
> ```

>
This allows method `one` and method `two` to be executed concurrently, but guarantees that accesses to the shared values for `i` and `j` occur exactly as many times, and in exactly the same order, as they appear to occur during execution of the program text by each thread.
Therefore, the shared value for `j` is never greater than that for `i`, because each update to `i` must be reflected in the shared value for `i` before the update to `j` occurs.
It is possible, however, that any given invocation of method `two` might observe a value for `j` that is much greater than the value observed for `i`, because method `one` might be executed many times between the moment when method `two` fetches the value of `i` and the moment when method `two` fetches the value of `j`.
>
See [§17.4]( https://docs.oracle.com/javase/specs/jls/se17/html/jls-17.html#jls-17.4 ) for more discussion and examples.

이 방법을 사용하면 `one` 메소드와 `two` 메소드가 동시에(concurrently) 실행될 수 있지만,
각각의 스레드에서 프로그램 코드를 실행하는 동안 공유된 값인 `i`와 `j`에 대한 접근이 정확히 동일한 횟수와 동일한 순서로 발생하는 것을 보장해 줍니다.

그러므로 공유값 `j`는 절대로 `i`보다 클 수 없으며, 그 이유는 `i` 값의 각 업데이트는 `j` 값의 업데이트가 발생하기 전에 `i` 값에 반영되어야 하기 때문입니다.

그러나 `two` 메소드가 `i` 값을 가져오는 순간과 `j` 값을 가져오는 순간 사이에 `one` 메소드가 여러 차례 실행되는 경우에는 `two` 메소드를 호출했을 때 `i`의 값보다 큰 `j` 값을 관찰하게 되는 경우도 가능합니다.

자세한 내용과 예제는 17.4 절을 참고하세요.


## From: The C Programming Language

>
**A.4.4 형 한정사**
>
어떤 대상체(object)의 형태는 부가적으로 한정사(qualifier)를 가질 수 있다.
대상체를 `const`로 선언하는 것은 그것의 값이 바뀌지 않을 것임을 나타낸다.
대상체를 `volatile`로 선언하는 것은 최적화와 관련된 특별한 성질을 갖는다는 것을 나타낸다.
한정사는 대상체의 값의 범위나 산술적 성질에 영향을 미치지 않는다.
한정사에 대해서는 A.8.2절에서 설명하였다.
[^tcpl-290]

<span/>

>
`const`와 `volatile` 특성은 ANSI 표준에서 새로이 채택한 것이다.
`const`의 목적은 대상체가 ROM에 위치할 수 있다는 것을 알리고 최적화의 가능성을 증대시키기 위해서이다.
`volatile`의 목적은 그것을 사용하지 않는 경우에 컴파일러가 최적화시키는 것을 억제하는 것이다.
예를 들어, 기억장치 사상(memory-mapped) 입출력 방식의 기계에서 컴파일러가 포인터를 통한 확실히 중복된 참조를 제거하는 것을 막기 위해
레지스터(device register)에 대한 포인터를 `volatile`에 대한 포인터로 선언할 수 있다.
외부적으로 `const` 대상체를 변화하려는 시도를 검사해야 하는 경우를 제외하고 컴파일러는 이러한 한정어들을 무시할 수 있다.
>
세 번째 한정어 noalias는 현재 표준화 위원회에서 심사 중에 있다.
[^tcpl-314]

## From: The C++ Programming Language, 4th Edition

>
**41.4 volatile**
>
`volatile` 지정자는 어떤 객체가 제어 스레드 외부에 있는 뭔가에 의해 변경될 수 있다는 점을 나타내는 데 쓰인다. 예를 들면 다음과 같다.
>
> ```cpp
> volatile const long clock_register; // 하드웨어 시계에 의해 갱신된다.
> ```
>
`volatile` 지정자는 기본적으로 컴파일러에게 군더더기인 것이 확실해 보이는 읽기와 쓰기를 최적화해서 날려버리지 말라고 알려주는 것이다. 예를 들면 다음과 같다.
>
> ```cpp
> auto t1 { clock_register};
> // ... 여기서 clock_register는 쓰이지 않는다...
> auto t2{clock_register};
> ```
>
`clock_register`가 `volatile`이 아니었다면 컴파일러는 읽기 중 하나를 제거해 버리고 `t1==t2`라고 가정했을 것이다.
>
하드웨어를 직접적으로 다루는 저수준의 코드가 아니라면 `volatile`을 쓰지 말기 바란다.
`volatile`이 메모리 모델에서 특별한 의미가 있다고 가정하지 말기 바란다. 그렇지 않다.
일부 다른 언어에서처럼 `volatile`은 동기화 메커니즘이 아니다.
동기화를 위해서라면 `atomic`(41.3절), `mutex`(42.31절), 또는 `condition_variable`(42.3.4절)을 이용하기 바란다.
[^bjarne-1289]

## 참고문헌

- KERNIGHAN의 C 언어 프로그래밍 Second Edition 수정판 / Brian W. Kernighan, Dennis M. Ritchie 공저 / 김석환, 박용규, 최홍순 공저 / 휴먼싸이언스 / 2016년 02월 01일 2판 1쇄 발행 / 원제: The C Programming Language, 2nd Edition
- The C++ Programming Language Fourth EDition / 비야네 스트롭스트룹 저 / 박지유 역 / 에이콘출판사 / 발행 2016년 1월 4일 / 원제 : The C++ Programming Language
- [JLS 17 - 8.3.1.4. volatile Fields]( https://docs.oracle.com/javase/specs/jls/se17/html/jls-8.html#jls-8.3.1.4 )
- [JLS 7 - 8.3.1.4. volatile Fields]( https://docs.oracle.com/javase/specs/jls/se7/html/jls-8.html#jls-8.3.1.4 )

## 주석

[^tcpl-290]: The C Programming Language. Appendix A. 290쪽.
[^tcpl-314]: The C Programming Language. Appendix A. 314쪽.
[^bjarne-1289]: The C++ Programming Language 한국어판 [4판]. 41장. 1289쪽.
