---
layout  : wiki
title   : openssl 명령어
summary : cryptography toolkit
date    : 2018-09-14 22:54:57 +0900
updated : 2024-06-22 17:57:01 +0900
tag     : bash encryption command
resource: 83/0E9814-D091-458F-9586-48A0687FDCC9
toc     : true
public  : true
parent  : [[/cmd]]
latex   : false
---
* TOC
{:toc}

```sh
$ cat test.txt
hello world!
```

## Examples
### help
```sh
$ openssl -h        # -h 옵션은 없지만 잘못된 옵션이기 때문에 도움말을 볼 수 있다.
$ openssl dgst -h
```

### sha256
```sh
$ echo 'hello world!' | openssl sha256
$ openssl dgst -sha256 input.txt
$ cat input.txt | openssl sha256
```

### aes256
#### encrypt
```sh
$ echo 'hello world!' | openssl aes-256-cbc -a
$ echo 'hello world!' | openssl aes-256-cbc -a -salt    # with salt
$ openssl aes-256-cbc -a -salt -in input.txt -out output.enc
```

#### decrypt
```sh
$ openssl aes-256-cbc -d -a -in result.enc
$ echo 'U2FsdGVkX18XbxUsGJ7tvr78efIxek8++Tbovib24Ec=' | openssl aes-256-cbc -a -d   # hello world!
```

### base64
#### encrypt
```sh
$ echo 'hello world!' | openssl base64
$ openssl enc -base64 -in input.txt
```

#### decrypt
```sh
$ echo 'aGVsbG8gd29ybGQhCg==' | openssl base64 -d   # hello world!
```

### 소수 관련 기능
```sh
$ openssl prime             # 도움말
$ openssl prime 997                 # 997 이 소수인지 조사한다
$ openssl prime -hex ff0            # ff0 이 소수인지 조사한다
$ openssl prime -generate -bits 16  # 랜덤으로 16 비트 소수 생성
```

## 경험

### KG 이니시스 개발가이드 예제

[KG 이니시스 개발가이드 - INIAPI(취소포함)]( https://manual.inicis.com/iniapi/api-info.php#enc )


![]( /resource/83/0E9814-D091-458F-9586-48A0687FDCC9/kg-iniapi-aes-enc.jpg )

주어진 PlainText `01011112222`를 `aes-cbc-128`을 사용해 암호화해보자. 암호화된 결과는 `5l8uENBFbTe50/9F3/7o0g==` 여야 한다.

예제에서 제공하고 있는 INIAPI key와 INIAPI iv[^iv]는 각각 `ItEQKi3rY7uvDS8l`와 `HYb3yQ4f65QL89==` 이다.
이 값들을 openssl에서 사용하기 위해 16진수로 변환해주자.
변환은 `xxd -ps` 명령을 사용하면 된다.

```sh
$ printf ItEQKi3rY7uvDS8l | xxd -ps
497445514b693372593775764453386c

$ printf HYb3yQ4f65QL89== | xxd -ps
48596233795134663635514c38393d3d
```

정리해보면 다음과 같다.

| 키         | 값                 | HEX                                |
|------------|--------------------|------------------------------------|
| INIAPI key | `ItEQKi3rY7uvDS8l` | `497445514b693372593775764453386c` |
| INIAPI iv  | `HYb3yQ4f65QL89==` | `48596233795134663635514c38393d3d` |

이제 이 값을 사용해 암호화를 해보자. `-K`에 키를 지정해주고 `-iv`에 iv를 지정해주면 된다.

```sh
$ printf "01011112222" \
    | openssl aes-128-cbc -e \
        -K "497445514b693372593775764453386c" \
        -iv "48596233795134663635514c38393d3d" \
        -a -A

5l8uENBFbTe50/9F3/7o0g==
```

또는 이렇게 해도 된다.

```sh
$ printf "01011112222" \
    | openssl enc -aes-128-cbc \
        -K "497445514b693372593775764453386c" \
        -iv "48596233795134663635514c38393d3d" \
        -a -A

5l8uENBFbTe50/9F3/7o0g==
```

결과 디코딩도 해보자.

```sh
$ printf "5l8uENBFbTe50/9F3/7o0g==" \
    | openssl enc -aes-128-cbc \
        -K "497445514b693372593775764453386c" \
        -iv "48596233795134663635514c38393d3d" \
        -a -A -d

01011112222
```

잘 나온다.

이제 `ItEQKi3rY7uvDS8lIssueReceipt20191128121211123.123.123.123INIpayTest1000100100` 에 `5l8uENBFbTe50/9F3/7o0g==`를 이어붙인 평문을 SHA512로 해싱해보자.

```sh
$ printf "ItEQKi3rY7uvDS8lIssueReceipt20191128121211123.123.123.123INIpayTest10001001005l8uENBFbTe50/9F3/7o0g==" | openssl sha512

e55083c6e4d492b0f4c3f3145348c20d9d9d8fbafbe530245e77ea4db824d81a412073195f86110224568c613efd146bada7755b2113fa94a82007ce1795e8c8
```

잘 나온다.

## Links
* <https://www.madboa.com/geek/openssl/ >
* [블록 암호 운용 방식(wikipedia)](https://ko.wikipedia.org/wiki/%EB%B8%94%EB%A1%9D_%EC%95%94%ED%98%B8_%EC%9A%B4%EC%9A%A9_%EB%B0%A9%EC%8B%9D )

## 주석

[^iv]: initialization vector. cbc 방식에서 cbc는 "cipher-block chaining" 이므로 블록 체인 방식을 말한다. `iv`는 여기에서 첫번째 블록을 암호화할 때 사용하는 값이다.
