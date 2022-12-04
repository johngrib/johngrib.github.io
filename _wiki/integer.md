---
layout  : wiki
title   : Integer 이것저것
summary : 
date    : 2019-12-08 17:38:25 +0900
updated : 2022-11-09 22:43:40 +0900
tag     : 
resource: D2/B9DBB8-64D0-4BFA-961D-EFE074050E4F
toc     : true
public  : true
parent  : [[index]]
latex   : true
---
* TOC
{:toc}

## 범위

* `Integer.MAX_VALUE`는 $$2^{31} -1 = 2,147,483,647$$ 이다.
* `Integer.MIN_VALUE`는 $$-2^{31} = -2,147,483,648$$ 이다.

## 음수 부호 적용으로 인한 컴파일 에러

따라서 다음과 같은 컴파일 에러가 가능하다.

```java
/* Java */
// 정상
int a = -2147483648;
long b = -9223372036854775808L;

// compile error
int c = -(2147483648);
long d = -(9223372036854775808L);
```

## overflow

### 합

```java
int a = Integer.MAX_VALUE;
int b = Integer.MAX_VALUE;

int c = a + b;  // -2
long d = a + b; // -2
int e = a + 1;  // -2147483648
```

위 문제를 피하고 싶다면 `long`으로 계산하거나, `Math.addExact`를 써서 예외가 던져지게 한다.

```java
int a = Integer.MAX_VALUE;
int b = Integer.MAX_VALUE;

int c = (Math.addExact(a, b));
// java.lang.ArithmeticException: integer overflow

int d = (Math.addExact(a, 1));
// java.lang.ArithmeticException: integer overflow
```

`long`도 마찬가지다.

```java
long a = Long.MAX_VALUE;
long b = Long.MAX_VALUE;

long c = a + b;  // -2
long e = a + 1;  // -9223372036854775808
```

```java
long a = Long.MAX_VALUE;

long f = Math.addExact(a, 1);
// java.lang.ArithmeticException: long overflow
```

### 곱

```java
int a = Integer.MAX_VALUE;
int b = Integer.MAX_VALUE;

int c = a * b;  // 1
long d = a * b; // 1
```

```java
int a = Integer.MIN_VALUE;  // -2147483648
int c = a * -1;             // -2147483648
boolean d = a == c;         // true
```

위 문제를 피하고 싶다면 `long`으로 계산하거나, `Math.multiplyExact`를 써서 예외가 던져지게 한다.

```java
long a = Integer.MAX_VALUE;
long b = Integer.MAX_VALUE;

long c = a * b;  // 4611686014132420609

long d = Integer.MIN_VALUE; // -2147483648
long e = d * -1;            // 2147483648
boolean f = d == e;         // false
```

```java
int a = Integer.MAX_VALUE;
int b = Integer.MAX_VALUE;

int c = Math.multiplyExact(a, b);
// java.lang.ArithmeticException: integer overflow
```

