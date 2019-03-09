---
layout  : wiki
title   : sha256sum 명령어
summary : compute and check SHA256 message digest
date    : 2018-08-24 21:37:34 +0900
updated : 2018-08-24 22:12:12 +0900
tag     : bash encryption command
toc     : true
public  : true
parent  : command-line
latex   : false
---
* TOC
{:toc}

# 간단 사용법

'test'라는 문자열의 SHA256을 다음과 같이 쉽게 구할 수 있다.

```sh
$ echo 'test' | sha256sum
```

그러면 다음과 같은 결과가 나온다.

```
f2ca1bb6c7e907d06dafe4687e579fce76b37e4e93b7605022da52e6ccc26fd2  -
```

파일을 집어넣을 수도 있다.

```sh
$ echo '1234' > sample.txt

$ sha256sum sample.txt
a883dafc480d466ee04e0d6da986bd78eb1fdd2178d04693723da3a8f95d42f4  sample.txt
```

그냥 `1234`를 넣고 돌린 것과 같은 결과이다.

```sh
$ echo '1234' | sha256sum
a883dafc480d466ee04e0d6da986bd78eb1fdd2178d04693723da3a8f95d42f4  -
```

오른쪽에 `-` 가 붙는 것이 싫다면 `cut` 으로 64 글자만 잘라도 된다.

```sh
$ echo '1234' | sha512sum | cut -c1-64
7985558370f0de86a864e0050afdf45d7029b8798bcd72cddbf781329f99380e
```

# gsha256sum

맥이라면 컴퓨터에 `sha256sum` 명령어가 없고, 대신 `gsha256sum`이 있을 수도 있다.

다음과 같이 심볼릭 링크를 걸어주면 문제 없이 `sha256sum`으로 사용할 수 있다.

```sh
$ sudo ln -s /usr/local/bin/gsha256sum /usr/local/bin/sha256sum
$ sudo ln -s /usr/local/bin/gsha512sum /usr/local/bin/sha512sum
```

# 대안

## openssl

`openssl`을 써도 똑같은 값을 구할 수 있다.

```sh
$ echo 'test' | openssl sha256
```

## function

다음과 같은 function을 정의해 사용하는 것도 방법이다.

```sh
function sha256sum() { openssl sha256 "$@" | awk '{print $2}'; }
```

다음과 같이 실행할 수 있다.

```sh
$ sha256sum sample.txt
a883dafc480d466ee04e0d6da986bd78eb1fdd2178d04693723da3a8f95d42f4
```

# Links

* [SHA-2(wikipedia)](https://en.wikipedia.org/wiki/SHA-2 )

