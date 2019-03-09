---
layout  : wiki
title   : httpbin(1) HTTP Request & Response Service
summary : mock 데이터가 필요할 때 사용하기 좋다
date    : 2018-04-22 21:21:07 +0900
updated : 2018-04-22 21:28:11 +0900
tag     : http
toc     : true
public  : true
parent  : useful-site
latex   : false
---
* TOC
{:toc}

# 개요

* <https://httpbin.org/>
* 다양한 request end point가 준비되어 있어 여러 용도로 활용할 수 있다.

# 사용 예

* 자세한 내용은 <https://httpbin.org/>를 참고할 것.

```
$ curl http://httpbin.org/ip
{"origin": "24.127.96.129"}

$ curl http://httpbin.org/user-agent
{"user-agent": "curl/7.19.7 (universal-apple-darwin10.0) libcurl/7.19.7 OpenSSL/0.9.8l zlib/1.2.3"}

$ curl http://httpbin.org/get
{
   "args": {},
   "headers": {
      "Accept": "*/*",
      "Connection": "close",
      "Content-Length": "",
      "Content-Type": "",
      "Host": "httpbin.org",
      "User-Agent": "curl/7.19.7 (universal-apple-darwin10.0) libcurl/7.19.7 OpenSSL/0.9.8l zlib/1.2.3"
   },
   "origin": "24.127.96.129",
   "url": "http://httpbin.org/get"
}
```
