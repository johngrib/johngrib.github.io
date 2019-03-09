---
layout  : wiki
title   : openssl 명령어
summary : cryptography toolkit
date    : 2018-09-14 22:54:57 +0900
updated : 2019-01-19 12:58:50 +0900
tag     : bash encryption command
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

# Examples
## help
```sh
$ openssl -h        # -h 옵션은 없지만 잘못된 옵션이기 때문에 도움말을 볼 수 있다.
$ openssl dgst -h
```

## sha256
```sh
$ echo 'hello world!' | openssl sha256
$ openssl dgst -sha256 input.txt
$ cat input.txt | openssl sha256
```

## aes256
### encrypt
```sh
$ echo 'hello world!' | openssl aes-256-cbc -a
$ echo 'hello world!' | openssl aes-256-cbc -a -salt    # with salt
$ openssl aes-256-cbc -a -salt -in input.txt -out output.enc
```

### decrypt
```sh
$ openssl aes-256-cbc -d -a -in result.enc
$ echo 'U2FsdGVkX18XbxUsGJ7tvr78efIxek8++Tbovib24Ec=' | openssl aes-256-cbc -a -d   # hello world!
```

## base64
### encrypt
```sh
$ echo 'hello world!' | openssl base64
$ openssl enc -base64 -in input.txt
```

### decrypt
```sh
$ echo 'aGVsbG8gd29ybGQhCg==' | openssl base64 -d   # hello world!
```

## 소수 관련 기능
```sh
$ openssl prime             # 도움말
$ openssl prime 997                 # 997 이 소수인지 조사한다
$ openssl prime -hex ff0            # ff0 이 소수인지 조사한다
$ openssl prime -generate -bits 16  # 랜덤으로 16 비트 소수 생성
```

# Links
* <https://www.madboa.com/geek/openssl/ >
* [블록 암호 운용 방식(wikipedia)](https://ko.wikipedia.org/wiki/%EB%B8%94%EB%A1%9D_%EC%95%94%ED%98%B8_%EC%9A%B4%EC%9A%A9_%EB%B0%A9%EC%8B%9D )

