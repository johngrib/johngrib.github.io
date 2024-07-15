---
layout  : wiki
title   : curl 명령어
summary : transfer a URL
date    : 2019-06-12 22:26:35 +0900
updated : 2024-07-15 21:44:40 +0900
tag     : bash command
resource: B6/81C877-1018-4D8C-832C-D96244F87479
toc     : true
public  : true
parent  : [[/cmd]]
latex   : false
---
* TOC
{:toc}

## 역사

- 1996-11-11 - Rafael Sagula에 의해 개발된 httpget
    - httpget 0.1 버전은 C 언어로 작성된 300줄 미만의 프로그램이었음
    - Daniel Stenberg가 발견하고 기여하기 시작
    - 비슷한 시기(1996-11)에 wget의 최초 릴리즈(1.4.0)도 있었음
- 2022-02-02 - [`--json` 옵션 추가]( https://daniel.haxx.se/blog/2022/02/02/curl-dash-dash-json/ )

{% raw %}
<blockquote class="twitter-tweet"><p lang="en" dir="ltr">This day 23 years ago, I uploaded the first ever curl release. Happy birthday to all of us who use and appreciate curl. I love you all.<a href="https://t.co/sbw4Yps3s6">https://t.co/sbw4Yps3s6</a> <a href="https://t.co/4VXtdiuP5b">pic.twitter.com/4VXtdiuP5b</a></p>&mdash; Daniel Stenberg (@bagder) <a href="https://twitter.com/bagder/status/1373047807876153349?ref_src=twsrc%5Etfw">March 19, 2021</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
{% endraw %}

> curl's official birthday was March 20, 1998. That was the day the first ever tarball was made available that could build a tool named curl. I put it together and I called it curl 4.0 since I kept the version numbering from the previous names I had used for the tool. Or rather, I bumped it up from 3.12 which was the last version I used under the previous name: urlget.
>
-- [CURL IS 23 YEARS OLD TODAY]( https://daniel.haxx.se/blog/2021/03/20/curl-is-23-years-old-today/ )
>
curl의 공식 생일은 1998년 3월 20일 이었습니다. curl이라는 도구를 빌드할 수 있는 최초의 tarball을 만든 날이었습니다. 먼저 사용하던 도구에서 버전 번호를 이어받아서 curl 4.0 이라고 불렀습니다. 좀 더 정확하게 말하자면 이전 이름인 urlget의 마지막 버전인 3.12에서 올렸다고 할 수 있습니다.
>
-- [curl 23주년을 기념하는 Daniel Stenberg의 포스트 (2021-03-20)]( https://daniel.haxx.se/blog/2021/03/20/curl-is-23-years-old-today/ )

- 1998년 봄에 이름을 curl로 변경
- 1998년 3월 20일, curl 4.0 배포

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

 # stdin 사용하기
echo '{"name":"johngrib"}' \
  | curl -H "Content-Type: application/json" https://httpbin.org/anything -d @-
```

* `-d`, `--data` 옵션을 쓰면 body를 지정할 수 있다.
* `-d @FILE_NAME`: 텍스트 파일의 내용을 보낼 수 있다.
    * `-d @-`: stdin을 body로 지정할 수 있다.
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

### --json 옵션의 사용

[CURL DASH-DASH-JSON]( https://daniel.haxx.se/blog/2022/02/02/curl-dash-dash-json/ )

- curl에 `--json` 옵션이 추가되었다.

### 재미있는 사용법
```sh
curl wttr.in          # 날씨를 본다
curl v2.wttr.in
curl v2.wttr.in/Seoul

curl ifconfig.me  # ip주소를 본다
```

## 참고문헌

- [curl / Docs / Project / History of curl][curl-history]
- [curl 23주년을 기념하는 Daniel Stenberg의 포스트 (2021-03-20)]( https://daniel.haxx.se/blog/2021/03/20/curl-is-23-years-old-today/ )
- [--json 옵션의 추가를 알리는 Daniel Stenberg의 글 (2022-02-02)]( https://daniel.haxx.se/blog/2022/02/02/curl-dash-dash-json/ )

[curl-history]: https://curl.se/docs/history.html
[curl-23]: https://daniel.haxx.se/blog/2021/03/20/curl-is-23-years-old-today/

