---
layout  : wiki
title   : tr 명령어
summary : translate characters
date    : 2019-11-18 13:52:25 +0900
updated : 2023-07-31 21:08:01 +0900
tag     : bash command
resource: 89/84AC90-2C84-4506-AB5A-CB5D964C06EE
toc     : true
public  : true
parent  : [[/cmd]]
latex   : false
---
* TOC
{:toc}

다음과 같이 `test.txt` 파일이 있다고 하자.

```sh
$ cat test.txt
The quick brown fox jumps over the lazy dog.
Hello, World!
```

## 문자 제거

```sh
# 개행 문자 제거
$ printf '1\n2\n3\n' | tr -d '\n'     # 123

# 개행 문자 제거
$ cat test.txt | tr -d '\n'
The quick brown fox jumps over the lazy dog.Hello, World!
```

```sh
# 파일 test.txt에서 문자 a, i, u, e, o 제거
$ cat test.txt | tr -d 'aiueo'
Th qck brwn fx jmps vr th lzy dg.
Hll, Wrld!

# 파일 test.txt에서 문자 a, i, u, e, o 제거
$ tr -d 'aiueo' < test.txt
Th qck brwn fx jmps vr th lzy dg.
Hll, Wrld!

# 파일 test.txt에서 문자 a, i, u, e, o 제거하고, test-out.txt 파일로 저장
$ tr -d 'aiueo' < test.txt > test-out.txt
$ cat test-out.txt
Th qck brwn fx jmps vr th lzy dg.
Hll, Wrld!
```

## 반복 문자 제거

```sh
$ echo hello | tr -s l
helo

$ echo aalaaallalll | tr -s a
alallalll

$ echo aalaaallalll | tr -s al
alalal

$ echo "hello         world" | tr -s ' '
hello world

$ echo "hello         world" | tr -s [:space:]
hello world

$ echo hello 111123333 world | tr -s [:digit:]
hello 123 world
```

## 지정한 문자만 남기고 나머지 모두 제거

```sh
$ cat test.txt
The quick brown fox jumps over the lazy dog.
Hello, World!

$ cat test.txt | tr -cd aiueo
euioouoeeaoeoo
```

## 문자 변환

### 대문자를 소문자로 변환

```sh
echo 'ASDF' | tr '[:upper:]' '[:lower:]'    # asdf
echo 'ASDF' | tr A-Z a-z    # asdf
echo 'ASDF' | tr AD ad      # aSdF
```

### 공백 문자 변환

```sh
# 공백 문자를 _ 로 변환
$ tr [:space:] _ < test.txt
The_quick_brown_fox_jumps_over_the_lazy_dog._Hello,_World!_
```

```sh
# 공백 문자를 개행 문자로 변환
$ tr [:space:] '\n' < test.txt 
The
quick
brown
fox
jumps
over
the
lazy
dog.
Hello,
World!
```

### character 1:1 replace {#character-1-1-replace}

```sh
# 모음 a i u e o 를 1 2 3 4 5로 변환한다.
$ tr 'aiueo' '12345' < test.txt
Th4 q32ck br5wn f5x j3mps 5v4r th4 l1zy d5g.
```

- `aiueo` `12345` 는 1:1 replace 매핑을 의미한다.
    - `a` → `1`
    - `i` → `2`
    - `u` → `3`
    - `e` → `4`
    - `o` → `5`

### 프롬프트 입력을 통한 변환

한편 `tr`은 입력을 따로 제공하지 않으면 프롬프트로 입력을 받는다.

다음과 같이 입력을 하고 엔터를 치면, 명령이 종료되지 않고 입력을 기다리고 있게 된다.

```sh
$ tr aiueo 12345

```

이때 `hello world` 라고 입력하고 엔터를 치면...

```sh
$ tr aiueo 12345
hello world
```

다음과 같이 변환된 결과를 출력한다.

```sh
$ tr aiueo 12345
hello world
h4ll5 w5rld
```

다른 문장을 더 입력해도 된다.

```sh
$ tr aiueo 12345
hello world
h4ll5 w5rld
the art of tr
th4 1rt 5f tr
```

종료하려면 `control+d`나 `control+c`를 입력하면 된다.

같은 방법으로 아래와 같이 대소문자 변환을 할 수도 있다.

```sh
$ tr [:lower:] [:upper:]
hello world
HELLO WORLD

$ tr a-z A-Z
hello world
HELLO WORLD
```

