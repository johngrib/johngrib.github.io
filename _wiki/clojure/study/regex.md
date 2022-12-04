---
layout  : wiki
title   : Clojure regex
summary : 
date    : 2022-05-17 00:05:29 +0900
updated : 2022-05-17 22:04:21 +0900
tag     : clojure
resource: D0/62F031-0170-488B-A016-35F45751DEC2
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

Java의 `java.util.regex.Pattern`에는 다음의 `static int` 값들이 정의되어 있다.

| 플래그                               |      값 |              bit | Clojure 플래그 |
|--------------------------------------|--------:|-----------------:|----------------|
| [UNIX_LINES][unix_lines]             |  `0x01` | `0000 0000 0001` | `(?d)`         |
| [CASE_INSENSITIVE][case_insensitive] |  `0x02` | `0000 0000 0010` | `(?i)`         |
| [COMMENTS][comments]                 |  `0x04` | `0000 0000 0100` | `(?x)`         |
| [MULTILINE][multiline]               |  `0x08` | `0000 0000 1000` | `(?m)`         |
| [LITERAL][literal]                   |  `0x10` | `0000 0001 0000` |                |
| [DOTALL][dotall]                     |  `0x20` | `0000 0010 0000` | `(?s)`         |
| [UNICODE_CASE][unicode_case]         |  `0x40` | `0000 0100 0000` | `(?u)`         |
| [CANON_EQ][canon_eq]                 |  `0x80` | `0000 1000 0000` |                |
| [UNICODE_CHARACTER_CLASS][u_c_class] | `0x100` | `0001 0000 0000` |                |
| ALL_FLAGS (private)                  | `0x1ff` | `0001 1111 1111` |                |

각 플래그는 bitwise OR (`|`)을 통해 조합되므로 여러 플래그를 섞어 쓸 수가 있다.

Clojure는 Java의 embedded flag와 똑같이 `(?플래그문자)` 형식으로 플래그를 선언해 쓸 수 있다.

- `(?d)`: UNIX LINES 모드 활성화.
    - 6가지 line terminator들 중, `\n`만 line terminator로 인식된다. 따라서 이 플래그를 사용하면 `\n`만 `.`, `^`, `$`에 인식된다.
- `(?i)`: 대소문자 구분 없이 ASCII 문자를 기준으로 매치됨.
- `(?x)`: 패턴 안에 있는 공백과 코멘트가 무시된다.
- `(?m)`: `^`, `$`는 개행 문자가 아닌 전체 문자열의 시작과 끝에서만 적용됨.
- `(?s)`: `.`이 개행 문자를 포함한 모든 문자에 매치됨.
- `(?u)`: 대소문자 구분 없이 유니코드 기준으로 매치됨.

[unix_lines]: https://docs.oracle.com/en/java/javase/12/docs/api/java.base/java/util/regex/Pattern.html#UNIX_LINES
[case_insensitive]: https://docs.oracle.com/en/java/javase/12/docs/api/java.base/java/util/regex/Pattern.html#CASE_INSENSITIVE
[comments]: https://docs.oracle.com/en/java/javase/12/docs/api/java.base/java/util/regex/Pattern.html#COMMENTS
[literal]: https://docs.oracle.com/en/java/javase/12/docs/api/java.base/java/util/regex/Pattern.html#LITERAL
[dotall]: https://docs.oracle.com/en/java/javase/12/docs/api/java.base/java/util/regex/Pattern.html#DOTALL
[multiline]: https://docs.oracle.com/en/java/javase/12/docs/api/java.base/java/util/regex/Pattern.html#MULTILINE
[unicode_case]: https://docs.oracle.com/en/java/javase/12/docs/api/java.base/java/util/regex/Pattern.html#UNICODE_CASE
[canon_eq]: https://docs.oracle.com/en/java/javase/12/docs/api/java.base/java/util/regex/Pattern.html#CANON_EQ
[u_c_class]: https://docs.oracle.com/en/java/javase/12/docs/api/java.base/java/util/regex/Pattern.html#UNICODE_CHARACTER_CLASS

>
참고: 6가지 line terminator들은 다음과 같다.
- A newline (line feed) character (`'\n'`),
- A carriage-return character followed immediately by a newline character (`"\r\n"`),
- A standalone carriage-return character (`'\r'`),
- A next-line character (`'\u0085'`),
- A line-separator character (`'\u2028'`), or
- A paragraph-separator character (`'\u2029'`).
{:style="background-color: #ecf1e8;"}

## Examples

### re-seq

>
Returns a lazy sequence of successive matches of pattern in string, using `java.util.regex.Matcher.find()`, each such match processed with re-groups.

`re-seq`는 매치된 문자열의 레이지 시퀀스를 리턴한다.

```clojure
(re-seq #"(?i)foo"
        "FOO BAR foo bar fOo bAr")
;; => ("FOO" "foo" "fOo")
```

위의 Clojure 코드는 아래의 Java 코드와 똑같다.

```java
List<String> result = new ArrayList<>();
while (m.find()) {
    result.add(m.group());
}
// result => ["FOO", "foo", "fOo"]
```

### clojure.string/replace

```clojure
(clojure.string/replace "aaaaBBbbBBccc"
                        #"B"
                        "_")
;; => "aaaa__bb__ccc"

(clojure.string/replace "aaaaBBbbBBccc"
                        #"(?i)b"
                        "_")
;; => "aaaa______ccc"
```

### re-find

>
Returns the next regex match, if any, of string to pattern, using java.util.regex.Matcher.find().  Uses re-groups to return the groups.

```clojure
(re-find #"[a-zA-Z]+"
         "F477AB5E-B959-4359-8EF5-EAB0059F0525")
;; => "F"

(re-find #"(\d+)-[a-zA-Z]+"
         "123-abc,42622-sf..52-rot")
;; => ["123-abc" "123"]
```

```clojure
(def alphabet-matcher
  (re-matcher #"[a-zA-Z]+"
              "F477AB5E-B959-4359-8EF5-EAB0059F0525"))

(re-find alphabet-matcher) ;; => "F"
(re-find alphabet-matcher) ;; => "AB"
(re-find alphabet-matcher) ;; => "E"
(re-find alphabet-matcher) ;; => "B"
(re-find alphabet-matcher) ;; => "EF"
```

### re-pattern

>
Returns an instance of java.util.regex.Pattern, for use, e.g. in re-matcher.

`re-pattern`은 `java.util.regex.Pattern` 인스턴스를 리턴한다.
`#` 표기법을 쓰지 않고 정규식을 정의할 필요가 있을 때 사용한다.

```
(re-pattern "\\d+")
;; => #"\d+"
```

### m (MULTILINE) 플래그의 사용

```clojure
; m 플래그의 사용
(re-seq #"(?m)\w+"
        "foo-bar*
        ..123--
        baz|test~fiz")
;; => ("foo" "bar" "123" "baz" "test" "fiz")
```

