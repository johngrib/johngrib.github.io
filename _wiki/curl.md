---
layout  : wiki
title   : curl 명령어
summary : transfer a URL
date    : 2019-06-12 22:26:35 +0900
updated : 2020-06-03 09:44:01 +0900
tag     : bash command
toc     : true
public  : true
parent  : [[command-line]]
latex   : false
---
* TOC
{:toc}

## Examples
```sh
 # 요청 보내기
curl http://httpbin.org/ip

 # 요청시 자세한 정보 표시
curl -v http://httpbin.org/ip
```

```sh
 # POST 요청 보내기
curl -X POST http://httpbin.org/anything
curl -X POST --data "name=John&age=29" http://httpbin.org/anything

 # csv 파일을 Form(POST)으로 전송
curl -F csv=@$PWD/sample.csv http://localhost:8088/submit-csv
```

### header 지정
```sh
curl \
  -H 'Content-Type: text/html; charset=UTF=8' \
  -H 'Location: http://www.google.com' https://httpbin.org/ip \
  http://httpbin.org/ip
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

User-Agent를 지정하는 두 가지 방법

```sh
curl \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X x.y; rv:42.0) Gecko/20100101 Firefox/42.0" \
  http://localhost:8080

curl -A \
  "Mozilla/5.0 (Macintosh; Intel Mac OS X x.y; rv:42.0) Gecko/20100101 Firefox/42.0" \
  http://localhost:8080
```

### body 지정
```sh
 # form 보내기
curl \
  -d name="John Grib" \
  -d hobby="coding" \
  https://httpbin.org/anything

 # json 보내기
curl -d '{"name":"john"}' \
  -H "Content-Type: application/json" \
  https://httpbin.org/anything

 # json 파일 이름을 지정하여 파일 내용 보내기
curl -d @test.json \
  -H "Content-Type: application/json" \
  https://httpbin.org/anything
```

* `-d`, `--data` 옵션을 쓰면 body를 지정할 수 있다.
* `-d @FILE_NAME`: 텍스트 파일의 내용을 보낼 수 있다.
* `--data-urlencode`: URL encode를 사용한다.
* `--data-binary`: 바이너리 데이터를 전송할 때 사용한다.


### http 버전 지정
```sh
curl --http1.0 http://httpbin.org/ip
```

### 다운로드
```sh
 # 나의 ip 정보를 담은 json 문자열을 받아 파일로 저장한다
curl -o my_ip.json http://httpbin.org/ip
```

### 재미있는 사용법
```sh
curl wttr.in          # 날씨를 본다
curl v2.wttr.in
curl v2.wttr.in/Seoul

curl ifconfig.me  # ip주소를 본다
```
