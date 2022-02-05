---
layout  : wiki
title   : tr 명령어
summary : translate characters
date    : 2019-11-18 13:52:25 +0900
updated : 2022-02-06 00:06:58 +0900
tag     : bash command
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

## 문자 변환

### 대문자를 소문자로 변환

```sh
echo 'ASDF' | tr '[:upper:]' '[:lower:]'    # asdf
echo 'ASDF' | tr A-Z a-z    # asdf
echo 'ASDF' | tr AD ad      # aSdF
```

### character 1:1 replace

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

