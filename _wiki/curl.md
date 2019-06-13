---
layout  : wiki
title   : curl 명령어
summary : transfer a URL
date    : 2019-06-12 22:26:35 +0900
updated : 2019-06-13 08:59:57 +0900
tag     : bash command
toc     : true
public  : true
parent  : command-line
latex   : false
---
* TOC
{:toc}

# Examples
## 요청 보내기
```sh
$ curl http://httpbin.org/ip
```

## 요청시 자세한 정보 표시
```sh
$ curl -v http://httpbin.org/ip
```

## POST 요청 보내기
```sh
$ curl -X POST http://httpbin.org/anything
$ curl -X POST --data "name=John&age=29" http://httpbin.org/anything
```

## header 지정
```sh
$ curl \
> -H 'Content-Type: text/html; charset=UTF=8' \
> -H 'Location: http://www.google.com' https://httpbin.org/ip \
> http://httpbin.org/ip
```

위와 같이 명령을 입력하면 다음과 같은 Http Request가 전송된다.

```text
GET /ip HTTP/1.1
Host: httpbin.org
User-Agent: curl/7.54.0
Accept: */*
Content-Type: text/html; charset=UTF=8
Location: http://xxx...
```


## http 버전 지정
```sh
$ curl --http1.0 http://httpbin.org/ip
```

## 다운로드
```sh
$ # 나의 ip 정보를 담은 json 문자열을 받아 파일로 저장한다
$ curl -o my_ip.json http://httpbin.org/ip
```
