---
layout  : wiki
title   : 숫자만 포함하는 문자열 판별하기
summary : 
date    : 2022-11-08 23:17:58 +0900
updated : 2022-11-09 00:10:15 +0900
tag     : java
resource: 5E/133421-653D-4C8F-BF3D-E098CDF4C49B
toc     : true
public  : true
parent  : [[/problem]]
latex   : false
---
* TOC
{:toc}

## Examples

### Java

#### char 크기 비교하기

확실하게 가장 빠른 방법이지 싶다.

```java
public static boolean isNumericArray_c_style(String s) {
  if (s == null) {
    return false;
  }
  for (char c : s.toCharArray()) {
    if (c < '0' || c > '9') {
      return false;
    }
  }
  return true;
}
```

#### Character.isDigit을 사용하기

```java
public static boolean isNumberString(String s) {
  if (s == null || s.isBlank()) {
    return false;
  }
  for (int i = 0; i < s.length(); i++) {
    if (!Character.isDigit(s.charAt(i))) {
      return false;
    }
  }
  return true;
}
```

#### 정규식을 사용하기

`\d+`를 쓰는 방식이 `[0-9]+`를 쓰는 방식보다 더 빠르다.
`\d+` 방법은 `Character.isDigit` 보다 더 빠를 때도 있다.

```java
public static boolean isNumberString(String s) {
  if (s == null || s.isBlank()) {
    return false;
  }
  return s.matches("\\d+");
}
```

```java
public static boolean isNumberString(String s) {
  if (s == null || s.isBlank()) {
    return false;
  }
  return s.matches("[0-9]+");
}
```

#### anyMatch, allMatch 사용하기

`allMatch`를 쓰는 방식이 `anyMatch`를 쓰는 방식보다 더 빠른 편이다.

```java
  public static boolean isNumberString(String s) {
    if (s == null || s.isBlank()) {
      return false;
    }
    return s.chars()
            .allMatch(Character::isDigit);
  }
```

```java
public static boolean isNumberString(String s) {
  if (s == null || s.isBlank()) {
    return false;
  }
  return !s.chars()
           .anyMatch(c -> !Character.isDigit(c));
}
```

#### 주의: 예외를 사용하기

```java
  public static boolean isNumberString(String s) {
    if (s == null || s.isBlank()) {
      return false;
    }

    try {
      Long.parseLong(s);
      return true;
    } catch (NumberFormatException e) {
      return false;
    }
  }
```

이 방식은 동작하긴 하지만 "숫자만 포함하는 문자열 판별"이라는 문제 조건을 잘못 파악하고 있다.

예를 들어 `11111111111111111111`은 숫자만 포함하는 문자열이지만 `Long`의 범위를 넘어가기 때문에 `NumberFormatException`이 던져지고, 따라서 결과로 `false`를 리턴하게 된다.

```java
// 의도하지 않은 결과
isNumberString("11111111111111111111");  // false
```

