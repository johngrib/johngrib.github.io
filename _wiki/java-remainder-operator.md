---
layout  : wiki
title   : Java 나머지 연산자 % 주의점
summary : (a / b) * b + ( a % b ) == a
date    : 2019-10-13 17:00:49 +0900
updated : 2020-01-12 11:41:32 +0900
tag     : java 번역
toc     : true
public  : true
parent  : [[Java]]
latex   : true
---
* TOC
{:toc}

## 개요

* Java, Javascript의 나머지 연산은 제수(divisor)가 음수인 경우 생각과 다른 값이 나올 수 있다.
    * 합동이므로 틀린 값은 아니지만, 다룰 때 주의할 필요가 있다.
* Java Spec을 읽어보면 Java의 % 연산자를 다음과 같이 정의한다.

```java
(a / b) * b + ( a % b ) == a
```

$$
\frac{a}{b} \times b + ( a \mod b ) = a
$$

* 이 글의 후반에 Java Spec의 % 연산자 항목의 번역을 함께 소개한다.


## 5 % -3 의 결과는?

5를 -3 으로 나누면 나머지는 얼마가 나오는가?

$$5 \mod -3$$의 [결과는 -1 이다][wolfram5-3].

이는 python3 에서도 잘 구현되어 있다.

```python
>>> 5 % 3
2
>>> 5 % -3
-1
```

perl에서도 같은 결과가 나온다.

```sh
$ perl -e 'print 5 % 3'
2
$ perl -e 'print 5 % -3'
-1
```

그런데 Node.js에서는 -1 이 아니라 2가 나온다.

```javascript
> 5 % 3
2
> 5 % -3
2
```

Java도 2가 나온다.

```javascript
jshell> 5 % 3
$1 ==> 2

jshell> 5 % -3
$2 ==> 2
```

사실 -1 이 나오건 2 가 나오건 `-3`에 대해 모듈로 합동이므로 큰 문제는 없다.

그런데 Java에서 다음과 같은 메소드를 만든다면 의외의 상황을 만날 수 있다.

```java
public boolean isOdd(int n) {
  return n % 2 == 1;
}
```

다음과 같은 결과가 나오기 때문이다.

```java
for (int i : List.of(3, 2, 1, 0, -1, -2, -3)) {
  System.out.println(i + ": " + isOdd(i));
}
// 3: true
// 2: false
// 1: true
// 0: false
// -1: false
// -2: false
// -3: false
```


## Java의 % 연산자 정의

따라서 Java의 나머지 연산자 % 의 작동에 대해 알아둘 필요가 있다.

Java Spec 문서를 보면 Java의 나머지 연산자는 다음의 코드를 만족하는 a, b를 사용해 **a % b**를 정의한다는 사실을 알 수 있다.

```java
(a / b) * b + ( a % b ) == a
```

$$ a = 5 , b = -3 $$을 대입하여 계산해보자.

```javascript
jshell> int a = 5; int b = -3;
a ==> 5
b ==> -3
```

상식적으로 `(a / b) * b`는 `a`여야 할 것 같지만 Java의 int 연산이므로 `a`가 아니라 `3`이 나온다.

```javascript
jshell> a / b
$6 ==> -1

jshell> (a / b) * b
$7 ==> 3
```

즉 다음과 같은 과정을 거쳐 2 를 생산하게 된다.

$$
\begin{align}
a = & \frac{a}{b} \times b + (a \mod b) \\
5 = & \color{red}{\frac{5}{-3} \times -3} + ( 5 \mod -3 ) \\
5 = & \color{red}{3} + ( 5 \mod -3 ) \\
2 = & ( 5 \mod -3 ) \\
\end{align}
$$


따라서 음수를 사용할 경우 결과가 mod 연산과 달라지는 것이다.

유쾌한 자바 퍼즐러에서는 이에 대해 두 가지 방법을 제안한다.[^puzzler]

다음과 같이 고치면 음수 문제를 해결할 수 있다.

```java
public boolean isOdd(int n) {
  return n % 2 != 0;
}
// 3: true
// 2: false
// 1: true
// 0: false
// -1: true
// -2: false
// -3: true
```

아니면 다음과 같이 가장 오른쪽 비트 하나만 검사하는 방법도 생각할 수 있다.

```java
public static boolean isOdd(int n) {
  return (n & 1) != 0;
}
// 3: true
// 2: false
// 1: true
// 0: false
// -1: true
// -2: false
// -3: true
```


## Spec 문서 번역

* % 연산에 대한 Java 스펙 문서는 [Java SE 6][se6]부터 [Java SE 13][se13]까지 변화가 없다.
* 따라서 [Java SE 13][se13] 문서를 인용하고 번역한다.
    * 번역은 구글 번역기와 "The Java™ Language Specification Third Edition (한국어판)"을 참고하였다.

> The binary % operator is said to yield the remainder of its operands from an implied division; the left-hand operand is the dividend and the right-hand operand is the divisor. In C and C++, the remainder operator accepts only integral operands, but in the Java programming language, it also accepts floating-point operands. The remainder operation for operands that are integers after binary numeric promotion ([§5.6.2][se13-5-6-2]) produces a result value such that (a/b)*b+(a%b) is equal to a. This identity holds even in the special case that the dividend is the negative integer of largest possible magnitude for its type and the divisor is -1 (the remainder is 0). It follows from this rule that the result of the remainder operation can be negative only if the dividend is negative, and can be positive only if the dividend is positive. Moreover, the magnitude of the result is always less than the magnitude of the divisor. **If the value of the divisor for an integer remainder operator is 0, then an ArithmeticException is thrown.**

이항 % 연산자는 암시적으로 나눗셈을 하여 피연산자의 나머지를 얻어냅니다.
왼쪽 피연산자는 피제수(dividend)이고 오른쪽 피연산자가 제수(divisor)입니다.
C와 C++ 에서의 나머지 연산자는 오직 정수 피연산자만 허용합니다.
그러나 Java 프로그래밍 언어는 부동소수점 피연산자도 허용합니다.
정수인 피연산자에 대해, 나머지 연산은 이항 수치 프로모션(binary numeric promotion)(5.6.2절) 이후에 **(a/b)*b+(a%b)가 a와 같다**는 결과값을 생산합니다.
이 명제는 피제수가 정수형에서 가장 큰 음의 정수이고 제수가 -1(나머지는 0)인 특수한 경우에서조차 유효합니다.
이 규칙에 의해 나머지 연산의 결과는 피제수가 음수일 때만 음수일 수 있으며, 양수일 때만 양수일 수 있습니다.
또한 결과의 크기는 항상 제수보다 작습니다.
**만약 정수 나머지 연산자에 대해 제수의 값이 0 이면, ArithmeticException이 발생합니다.**

```java
// Example 15.17.3-1. Integer Remainder Operator
class Test1 {
  public static void main(String[] args) {
    int a = 5%3;  // 2
    int b = 5/3;  // 1
    System.out.println("5%3 produces " + a +
               " (note that 5/3 produces " + b + ")");

    int c = 5%(-3);  // 2
    int d = 5/(-3);  // -1
    System.out.println("5%(-3) produces " + c +
               " (note that 5/(-3) produces " + d + ")");

    int e = (-5)%3;  // -2
    int f = (-5)/3;  // -1
    System.out.println("(-5)%3 produces " + e +
               " (note that (-5)/3 produces " + f + ")");

    int g = (-5)%(-3);  // -2
    int h = (-5)/(-3);  // 1
    System.out.println("(-5)%(-3) produces " + g +
               " (note that (-5)/(-3) produces " + h + ")");
  }
}
```

> This program produces the output:

이 프로그램은 다음과 같이 출력합니다.

```text
5%3 produces 2 (note that 5/3 produces 1)
5%(-3) produces 2 (note that 5/(-3) produces -1)
(-5)%3 produces -2 (note that (-5)/3 produces -1)
(-5)%(-3) produces -2 (note that (-5)/(-3) produces 1)
```

> The result of a floating-point remainder operation as computed by the % operator is not the same as that produced by the remainder operation defined by IEEE 754. The IEEE 754 remainder operation computes the remainder from a rounding division, not a truncating division, and so its behavior is not analogous to that of the usual integer remainder operator. Instead, the Java programming language defines % on floating-point operations to behave in a manner analogous to that of the integer remainder operator; this may be compared with the C library function fmod. The IEEE 754 remainder operation may be computed by the library routine Math.IEEEremainder.  
<br>
The result of a floating-point remainder operation is determined by the rules of IEEE 754 arithmetic:
* _If either operand is NaN, the result is NaN._
* _If the result is not NaN, the sign of the result equals the sign of the dividend._
* _If the dividend is an infinity, or the divisor is a zero, or both, the result is NaN._
* _If the dividend is finite and the divisor is an infinity, the result equals the dividend._
* _If the dividend is a zero and the divisor is finite, the result equals the dividend._

>
In the remaining cases, where neither an infinity, nor a zero, nor NaN is involved, the floating-point remainder r from the division of a dividend n by a divisor d is defined by the mathematical relation r = n - (d ⋅ q) where q is an integer that is negative only if n/d is negative and positive only if n/d is positive, and whose magnitude is as large as possible without exceeding the magnitude of the true mathematical quotient of n and d.
<br><br>
Evaluation of a floating-point remainder operator % never throws a run-time exception, even if the right-hand operand is zero. Overflow, underflow, or loss of precision cannot occur.

부동소수점에 % 연산자를 써서 계산해낸 나머지 연산의 결과는 IEEE 754에 정의된 나머지 연산의 결과와 같지 않습니다.
IEEE 754 나머지 연산은 나눗셈을 버림(truncating division)한 결과가 아니라 반올림(rounding division)한 결과로 나머지를 계산하므로,
일반적인 정수 나머지 연산자의 동작과 비슷하지 않습니다.

그 대신, Java 프로그래밍 언어는 부동 소수점 연산에 대해 % 연산자를 정수 나머지 연산과 비슷하게 동작하도록 정의합니다.
이는 C 라이브러리 함수인 `fmod`와 비교할 수 있습니다.
Math.IEEEremainder 라이브러리 루틴을 쓰면 IEEE 754의 나머지 연산으로 계산할 수 있습니다.

부동소수점 나머지 연산의 결과는 IEEE 754의 계산 규칙을 따릅니다.

* 만약 피연산자 둘 중 하나가 NaN이면, 결과는 NaN 이다.
* 만약 결과가 NaN이 아니라면, 결과의 부호는 피제수의 부호와 같다.
* 만약 피제수가 무한이거나, 제수가 0 이거나, 둘 다라면, 결과는 NaN 이다.
* 만약 피제수가 유한이고 제수가 무한이면, 결과는 피제수와 같다.
* 만약 피제수가 0 이고 제수가 유한이면, 결과는 피제수와 같다.

그 외의 경우, 즉 무한이 아니고, 0이 아니고, NaN이 없을 경우,
피제수 $$n$$을 제수 $$d$$로 나눈 부동소수점 나머지 $$r$$은 $$r = n - (d \cdot q)$$으로 정의됩니다.

단, 다음을 따릅니다.

* $$n \over d$$가 음수이면 q 는 음의 정수.
* $$n \over d$$가 양수이면 q 는 양수.
* 나머지는 $$n$$과 $$d$$의 수학적 몫을 초과하지 않는 한 가장 큰 값.

부동소수점 나머지 연산자 %의 평가는 오른쪽 피연산자가 0 인 경우에도 절대로 런타임 예외를 던지지 않습니다. 오버플로우, 언더플로우, 정밀도 손실은 발생하지 않습니다.

```java
// Example 15.17.3-2. Floating-Point Remainder Operator
class Test2 {
  public static void main(String[] args) {
    double a = 5.0%3.0;  // 2.0
    System.out.println("5.0%3.0 produces " + a);

    double b = 5.0%(-3.0);  // 2.0
    System.out.println("5.0%(-3.0) produces " + b);

    double c = (-5.0)%3.0;  // -2.0
    System.out.println("(-5.0)%3.0 produces " + c);

    double d = (-5.0)%(-3.0);  // -2.0
    System.out.println("(-5.0)%(-3.0) produces " + d);
  }
}
```

> This program produces the output:

이 프로그램은 다음과 같이 출력합니다.

```
5.0%3.0 produces 2.0
5.0%(-3.0) produces 2.0
(-5.0)%3.0 produces -2.0
(-5.0)%(-3.0) produces -2.0
```

## 함께 읽기

* [[discrete-math-modular]]{모듈러 연산(나머지 연산)}


## 참고문헌

* 웹 문서
    * [The Java® Language Specification Java SE 13 Edition][se13]
* 도서
    * The Java™ Language Specification Third Edition (한국어판) / 허진영, 최선재, 이상민, 이정룡 옮김 / 에이콘출판사 / 2008년 01월 02일 / 원제 : The Java™ Language Specification, Third Edition
    * 유쾌한 자바 퍼즐러 / Joshua Bloch, Gafter 공저 / 송치형, 박준상 공역 / 사이텍미디어 / 2007년 06월 15일 발행


## 주석

[^puzzler]: 유쾌한 자바 퍼즐러. 6쪽.

[se13]: https://docs.oracle.com/javase/specs/jls/se13/html/jls-15.html#jls-15.17.3
[se13-5-6-2]: https://docs.oracle.com/javase/specs/jls/se13/html/jls-5.html#jls-5.6.2
[se6]: https://docs.oracle.com/javase/specs/jls/se6/html/expressions.html#15.17.3

[wolfram5-3]: https://www.wolframalpha.com/input/?i=5+%25+%28-3%29


