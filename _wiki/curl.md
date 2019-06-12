---
layout  : wiki
title   : curl 명령어
summary : transfer a URL
date    : 2019-06-12 22:26:35 +0900
updated : 2019-06-12 22:45:09 +0900
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

## http 버전 지정
```sh
$ curl --http1.0 http://httpbin.org/ip
```

## 다운로드
```sh
$ # 나의 ip 정보를 담은 json 문자열을 받아 파일로 저장한다
$ curl -o my_ip.json http://httpbin.org/ip
```
