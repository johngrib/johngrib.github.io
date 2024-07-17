---
layout  : wiki
title   : curl 명령어
summary : transfer a URL
date    : 2019-06-12 22:26:35 +0900
updated : 2024-07-17 21:16:50 +0900
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

## Options

### -H : header {#option-h}

`-H`로 헤더를 지정할 수 있다.

```sh
curl \
  -H 'Content-Type: text/html; charset=UTF=8' \
  -H 'Location: http://www.google.com' https://httpbin.org/ip \
  http://httpbin.org/ip
```

위와 같이 명령을 입력하면 아래와 같은 Http Request가 전송된다.

```text
GET /ip HTTP/1.1
Host: httpbin.org
User-Agent: curl/7.54.0
Accept: */*
Content-Type: text/html; charset=UTF=8
Location: http://xxx...
```

#### User-Agent를 지정하는 두 가지 방법 {#option-user-agent}

```sh
curl \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X x.y; rv:42.0) Gecko/20100101 Firefox/42.0" \
  http://localhost:8080

curl -A \
  "Mozilla/5.0 (Macintosh; Intel Mac OS X x.y; rv:42.0) Gecko/20100101 Firefox/42.0" \
  http://localhost:8080
```

### -o {#option-o}

`-o` 옵션을 사용하면 다운로드한 내용을 파일로 저장할 수 있다.

다음은 curl의 [[/cmd/man]]{man page}에서 소개하는 예제이다.

```sh
curl -o file https://example.com
curl "http://{one,two}.example.com" -o "file_#1.txt"
curl "http://{site,host}.host[1-5].example" -o "#1_#2"
curl -o file https://example.com -o file2 https://example.net
```

### \--data {#option-data}

`-d`, `--data` 옵션을 쓰면 body를 지정할 수 있다.

아래와 같이 `-d`를 여러번 사용할 수 있다.

```sh
 # form 보내기
curl \
  -d name="John Grib" \
  -d hobby="coding" \
  https://httpbin.org/anything
```

물론 json을 직접 입력하는 방법이 가장 흔한 방법 중 하나일 것이다.

```sh
 # json 보내기
curl -d '{"name":"john"}' \
  -H "Content-Type: application/json" \
  https://httpbin.org/anything
```

body에 입력할 내용이 길어서 번거롭다면 파일로 저장해서 파일 이름을 지정하는 것이 편하다.

```sh
 # json 파일 이름을 지정하여 파일 내용 보내기
curl -d @filename \
  -H "Content-Type: application/json" \
  https://httpbin.org/anything
```

- `-d @FILE_NAME`: 텍스트 파일의 내용을 보낼 수 있다.
    - `{"name":"john"}`을 내용으로 갖는 파일이 있다면 위와 같이 사용할 수 있다.

아래와 같이 `@-`를 사용하면 stdin을 body로 지정할 수 있다.

```sh
 # stdin 사용하기
echo '{"name":"johngrib"}' \
  | curl -H "Content-Type: application/json" https://httpbin.org/anything -d @-
```

### \--json {#option-json}

[CURL DASH-DASH-JSON]( https://daniel.haxx.se/blog/2022/02/02/curl-dash-dash-json/ )

curl에 `--json` 옵션이 추가되었다.

아래의 두 명령은 똑같이 작동한다.

```sh
curl -d '{"name":"john"}' \
  -H "Content-Type: application/json" \
  https://httpbin.org/anything
```

```sh
curl --json '{"name":"john"}' \
  -H "Content-Type: application/json" \
  https://httpbin.org/anything
```

물론 아래와 같이 해도 된다.

```sh
curl --json @filename \
  -H "Content-Type: application/json" \
  https://httpbin.org/anything
```

아래와 같이 `@-`도 쓸 수 있다.

```sh
echo '{"name":"john"}' | curl --json @- \
  -H "Content-Type: application/json" \
  https://httpbin.org/anything
```

### -i : response header 출력

`-i` 옵션을 사용하면 response header를 출력한다.


### http 버전 지정

```sh
curl --http1.0 http://httpbin.org/ip
```

지정 가능한 옵션은 다음과 같다.

- `--http0.9`
- `--http1.0` 또는 `-0`
- `--http1.1`
- `--http2-prior-knowledge`
- `--http2`
- `--http3-only`
- `--http3`


### 그 외 기타 옵션들

- `--data-urlencode`: URL encode를 사용한다.
- `--data-binary`: 바이너리 데이터를 전송할 때 사용한다.



## 참고문헌

- [curl / Docs / Project / History of curl][curl-history]
- [curl 23주년을 기념하는 Daniel Stenberg의 포스트 (2021-03-20)]( https://daniel.haxx.se/blog/2021/03/20/curl-is-23-years-old-today/ )
- [--json 옵션의 추가를 알리는 Daniel Stenberg의 글 (2022-02-02)]( https://daniel.haxx.se/blog/2022/02/02/curl-dash-dash-json/ )

[curl-history]: https://curl.se/docs/history.html
[curl-23]: https://daniel.haxx.se/blog/2021/03/20/curl-is-23-years-old-today/

