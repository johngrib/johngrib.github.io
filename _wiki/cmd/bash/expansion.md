---
layout  : wiki
title   : Bash 구문 확장
summary : 
date    : 2023-08-15 18:27:35 +0900
updated : 2024-09-29 17:19:56 +0900
tag     : 
resource: 39/80DE57-7F00-4588-AB78-C96EBACB4BF0
toc     : true
public  : true
parent  : [[/cmd/bash]]
latex   : false
---
* TOC
{:toc}

## 확장에 대하여

>
명령어를 입력하고 엔터키를 누르면 bash는 그 명령어를 수행하기 전에 텍스트에 몇 가지 프로세스를 진행한다.
예를 들면 `*` 기호처럼 쉘에 여러 의미를 주는 경우, 단순히 연속된 문자열로 처리되는 것과 같은 몇 가지 경우를 살펴보았다.
이러한 프로세스를 확장이라고 하는데, 이 기능으로 인해 무엇이든 입력하면 쉘이 그것을 처리하기 전에 다른 무언가로 확장된다.
[^tlcl-69]

## 기본: *, ?, [ ] {#basics}

- `*` : 모든 문자

```bash
 # D 로 시작하는 모든 파일/디렉토리
echo D*

 # D 로 시작하고 s 로 끝나는 모든 파일/디렉토리
echo D*s

 # .log 로 끝나는 모든 파일
ls *.log

 # 대문자로 시작하는 모든 파일/디렉토리(POSIX 문자 클래스 사용)
echo [[:upper:]]*

 # 소문자로 시작하는 모든 파일/디렉토리(POSIX 문자 클래스 사용)
echo [[:lower:]]*
```

- `?` : 한 글자

```bash
 # F로 시작하면서 뒤에 한 개의 문자만 있는 파일/디렉토리
echo F?

 # a로 시작하면서 뒤에 세 개의 문자만 있는 파일/디렉토리
echo a???
```

- `[]` : 문자 클래스

```bash
 # a, b, c, d, e, f 로 시작하는 모든 xml 파일
echo [a-f]*.xml

 # a~f, s~z 로 시작하는 모든 xml 파일
echo [a-fs-z]*.xml

 # F0 ~ F5, F9
echo F[0-59]
```

- `~` : 홈 디렉토리

```bash
 # 홈 디렉토리
cat ~/.bashrc
```

## 홈 경로 확장

- `~`: `$HOME`과 똑같은 값으로 확장된다.

## 산술 확장 {#arithmetic}

- `$(( ))` : 산술 확장

### 연산자

- `+`, `-`, `*`, `/` : 사칙연산
- `%` : 나머지
- `**` : 거듭제곱
- 비트 연산
    - `~` : 비트 반전
    - `<<` : 왼쪽 시프트
    - `>>` : 오른쪽 시프트
    - `&` : 비트 AND
    - `|` : 비트 OR
    - `^` : 비트 XOR

```bash
echo $(( 5 + 8 ))   # 13
echo $(( 5 * 8 ))   # 40
echo $(( 154 / 10 ))  # 15
echo $(( 154 % 10 ))  # 4
echo $(( 2 ** 10 ))   # 1024

echo $(( 1 << 10 )) # 1024
echo $(( 2 | 8 ))   # 10
```

### 수의 진법 표현

- `0` prefix: 8진수
- `0x` prefix: 16진수
- `base#` prefix: base 진수

```bash
echo $(( 10 ))   # 10 (10진수)
echo $(( 010 ))  #  8 (8진수)
echo $(( 0x10 )) # 16 (16진수)
echo $(( 3#10 )) #  3 (3진수)
echo $(( 2#10 )) #  2 (2진수)

echo $(( 010 + 20 )) # 8 + 20 = 28
```

## 중괄호 확장 {#braces}

```bash
echo test{a,c,f} # testa testc testf
echo {a,f}       # a f
```

```bash
echo {1..4}    # 1 2 3 4
echo {100..96} # 100 99 98 97 96
echo {-2..4}   # -2 -1 0 1 2 3 4

echo {a..d}  # a b c d
echo {z..w}  # z y x w

echo {1{a..c},2{h..j}}  # 1a 1b 1c 2h 2i 2j
```

```bash
 # 2020-01 ~ 2023-12 디렉토리 40개 생성
mkdir {2020..2023}-{0{1..9},1{0..2}}
```

## POSIX 문자 클래스 {#posix-character-classes}

- `[:alnum:]` : Alphanumeric characters
    - 정규식으로는 `[A-Za-z0-9]`와 같다.
- `[:alpha:]` : Alphabetic characters
    - 정규식 `[A-Za-z]`
- `[:blank:]` : Space and TAB characters
    - 정규식 `[ \t]`
- `[:cntrl:]` : Control characters
    - 정규식 `[\x00-\x1F\x7F]`
    - `\x00`(NULL) 부터 `\x1F`(US) 까지, 그리고 `\x7F`(DEL) 문자.
- `[:digit:]` : Numeric characters
    - 정규식 `[0-9]`
- `[:graph:]` : Characters that are both printable and visible (a space is printable but not visible, whereas an ‘a’ is both)
    - 출력 가능하고 눈에 보이는 문자들(공백 문자는 안 보이므로 제외).
    - 정규식 `[\x21-\x7E]`
- `[:lower:]` : Lowercase alphabetic characters
    - 정규식 `[a-z]`
- `[:print:]` : Printable characters (characters that are not control characters)
    - 출력 가능한 문자들(제어 문자 제외, 스페이스 포함).
    - 정규식 `[\x20-\x7E]`
- `[:space:]` : Space characters (these are: space, TAB, newline, carriage return, formfeed and vertical tab)
    - 공백 문자(space, tab, NL, CR, formfeed, vertiacl tab).
    - 정규식 `[ \t\r\n\v\f]`
- `[:upper:]` : Uppercase alphabetic characters
    - 정규식 `[A-Z]`
- `[:xdigit:]` : Characters that are hexadecimal digits
    - 16진수 숫자 문자들.
    - 정규식 `[0-9A-Fa-f]`

```bash
 # 현재 디렉토리에서 소문자 한 글자로 된 모든 파일과 디렉토리
echo [:lower:]

 # 소문자 한 글자로 시작하는 모든 파일과 디렉토리
echo [[:lower:]]*

 # 소문자로 시작하지 않는 모든 파일과 디렉토리
echo [^[:lower:]]

 # 숫자나 소문자로 시작하는 모든 파일과 디렉토리
echo [[:digit:][:lower:]]*
```

## 참고문헌

- 리눅스 커맨드라인 완벽 입문서 / 윌리엄 E. 샤츠 주니어 저 / 이종우, 정영신 공역 / 비제이퍼블릭(BJ퍼블릭) / 초판 1쇄 발행: 2013년 01월 11일 / 원제: The Linux Command Line
- [3.4 Using Bracket Expressions (gawk manual)](https://www.gnu.org/software/gawk/manual/html_node/Bracket-Expressions.html )
    - POSIX 문자 클래스 참고 자료

## 주석

[^tlcl-69]: 리눅스 커맨드라인 완벽 입문서. 7장. 69쪽.

