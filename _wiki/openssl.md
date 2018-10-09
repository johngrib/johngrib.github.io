---
layout  : wiki
title   : openssl 명령어
summary : cryptography toolkit
date    : 2018-09-14 22:54:57 +0900
updated : 2018-10-09 22:34:00 +0900
tags    : bash encryption aes sha
toc     : true
public  : true
parent  : command-line
latex   : false
---
* TOC
{:toc}

```sh
$ cat test.txt
hello world!
```

# help

* `--help`, `-h` 옵션이 없지만, 일단 입력하면 헬프 비슷하게 나오긴 한다.

```sh
$ openssl -h
$ openssl dgst -h
```

# 암호화/복호화

## sha256

```sh
$ echo 'hello world!' | openssl sha256
ecf701f727d9e2d77c4aa49ac6fbbcc997278aca010bddeeb961c10cf54d435a

$ openssl dgst -sha256 test.txt
SHA256(test.txt)= ecf701f727d9e2d77c4aa49ac6fbbcc997278aca010bddeeb961c10cf54d435a

$ cat test.txt | openssl sha256
ecf701f727d9e2d77c4aa49ac6fbbcc997278aca010bddeeb961c10cf54d435a
```

## aes256

* encrypt

```sh
$ echo 'hello world!' | openssl aes-256-cbc -a
U2FsdGVkX19L7YAZRxgLunaWIlZd9FL3YkOXqHE3t7w=

$ echo 'hello world!' | openssl aes-256-cbc -a -salt
U2FsdGVkX19TX/3mxzMQRoIapHj5AitWususevKSW10=

$ openssl aes-256-cbc -a -salt -in test.txt -out result.enc

$ cat result.enc
U2FsdGVkX18XbxUsGJ7tvr78efIxek8++Tbovib24Ec=
```

* decrypt

```sh
$ openssl aes-256-cbc -d -a -in result.enc 
hello world!

$ echo 'U2FsdGVkX18XbxUsGJ7tvr78efIxek8++Tbovib24Ec=' | openssl aes-256-cbc -a -d
hello world!
```

## base64

```sh
$ echo 'hello world!' | openssl base64
aGVsbG8gd29ybGQhCg==

$ echo 'aGVsbG8gd29ybGQhCg==' | openssl base64 -d
hello world!

$ openssl enc -base64 -in test.txt
aGVsbG8gd29ybGQhCg==
```

# 소수 관련 기능

```sh
$ openssl prime
No prime specified.
usage: prime [-bits n] [-checks n] [-generate] [-hex] [-safe] p
 -bits n            Number of bits in the generated prime number
 -checks n          Miller-Rabin probablistic primality test iterations
 -generate          Generate a pseudo-random prime number
 -hex               Hexadecimal prime numbers
 -safe              Generate only "safe" prime numbers
```

## 소수 확인

```sh
$ openssl prime 2
2 is prime

$ openssl prime 50159
C3EF is prime

$ openssl prime -hex ff0
FF0 is not prime
```

## 랜덤 소수 얻어내기

```sh
$ openssl prime -generate -bits 16 
53987

$ openssl prime 53987
D2E3 is prime

$ openssl prime -generate -bits 16 
58967

$ openssl prime 58967
E657 is prime
```


# Links

* <https://www.madboa.com/geek/openssl/ >
* [블록 암호 운용 방식(wikipedia)](https://ko.wikipedia.org/wiki/%EB%B8%94%EB%A1%9D_%EC%95%94%ED%98%B8_%EC%9A%B4%EC%9A%A9_%EB%B0%A9%EC%8B%9D )

