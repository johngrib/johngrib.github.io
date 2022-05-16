---
layout  : wiki
title   : Clojure regex
summary : 
date    : 2022-05-17 00:05:29 +0900
updated : 2022-05-17 00:48:45 +0900
tag     : clojure
toc     : true
public  : true
parent  : [[/clojure/study]]
latex   : false
---
* TOC
{:toc}

## 선언

Clojure에서 정규 표현식은 `#"..."`의 형태로 선언할 수 있다.

```clojure
#"pattern"
```

이렇게 선언한 정규 표현식은 실제로는 컴파일된 `java.util.regex.Pattern` 이다.

```clojure
(type #"^\d+[a-z]\s+$") ;; => java.util.regex.Pattern
```

Clojure 정규표현식은 `#`가 붙은 문자열처럼 생겼지만 문자열이 아니다.
문자열과 닮았을 뿐 다른 규칙이 적용된다.

예를 들어 `\`를 이스케이프하지 않고도 사용할 수 있다.

```java
// Java
Pattern pattern = Pattern.compile("^\\d\\d$");
//                        불편하게 \ 를 두번씩 써야 한다
```

```clojure
; Clojure
(def pattern #"^\d\d$")
;           \ 를 한번씩만 써도 된다
```

## 플래그

플래그는 정규식 앞에 `(?플래그문자)` 형식으로 붙여준다.

- `(?i)`: [CASE_INSENSITIVE]( https://docs.oracle.com/en/java/javase/12/docs/api/java.base/java/util/regex/Pattern.html#CASE_INSENSITIVE )
- `(?x)`: [COMMENTS]( https://docs.oracle.com/en/java/javase/12/docs/api/java.base/java/util/regex/Pattern.html#COMMENTS )
- `(?s)`: [DOTALL]( https://docs.oracle.com/en/java/javase/12/docs/api/java.base/java/util/regex/Pattern.html#DOTALL )
- `(?m)`: [MULTILINE]( https://docs.oracle.com/en/java/javase/12/docs/api/java.base/java/util/regex/Pattern.html#MULTILINE )
- `(?u)`: [UNICODE_CASE]( https://docs.oracle.com/en/java/javase/12/docs/api/java.base/java/util/regex/Pattern.html#UNICODE_CASE )
- `(?d)`: [UNIX_LINES]( https://docs.oracle.com/en/java/javase/12/docs/api/java.base/java/util/regex/Pattern.html#UNIX_LINES )

```clojure
; i 플래그의 사용
(re-seq #"(?i)foo"
        "FOO BAR foo bar fOo bAr")
;; => ("FOO" "foo" "fOo")

; m 플래그의 사용
(re-seq #"(?m)\w+"
        "foo-bar*
        ..123--
        baz|test~fiz")
;; => ("foo" "bar" "123" "baz" "test" "fiz")
```

