---
layout  : wiki
title   : vim-rest-console 사용법
summary : vim을 cURL 클라이언트로 사용하자
date    : 2018-04-12 21:41:12 +0900
updated : 2018-09-05 22:31:54 +0900
tag     : vim http
toc     : true
public  : true
parent  : Vim
latex   : false
---
* TOC
{:toc}

# 개요

HTTP 메시지를 보내고 받을 수 있다.

# 설치 방법

* VimPlug

```viml
Plug 'diepm/vim-rest-console'
```

# 간단한 사용 방법

확장명이 `rest`인 파일을 만들고 Vim에서 열어주면 된다.

파일의 내용엔 다음과 같이 HTTP 리퀘스트 메시지를 작성해주면 된다.


```
# 공통으로 사용할 header 를 다음과 같이 작성해준다
Content-Type: application/json; charset=utf-8
Authorization: XXXX XXXX-XXXX
--

# GET 요청을 보낸다
https://httpbin.org/
GET /ip

# 헤더를 개별 정의하려면 URI 아래에 두면 된다.
# POST 요청을 보낸다
https://httpbin.org/
Content-Type: application/json; charset=utf-8
Authorization: XXXX XXXX-XXXX
POST /post
{
    "test" : "1234"
}

# GET, POST 는 물론이고 모든 HTTP 메소드를 사용할 수 있다.
https://httpbin.org/
PUT /put
{
    "test": "1234"
}
```

* 커서를 각 항목 위에 놓고 `<C-j>`를 입력하면, 해당 문단에 작성해 둔 메시지로 리퀘스트를 보낸다.
* 리스폰스를 받으면 오른쪽에 `vs`를 열고 보여준다.

# 트리거 키 변경

다음과 같이 변경해주면 된다.

```
let g:vrc_trigger = '<C-k>'
```

# 문제 해결

## json 결과 출력에 formatting이 안 되는 문제

vim-rest-console은 결과 출력의 포매팅을 위해 다음과 같은 옵션을 디폴트로 제공하고 있다.

```viml
let s:vrc_auto_format_response_patterns = {
  \ 'json': 'python -m json.tool',
  \ 'xml': 'xmllint --format -',
\}
```

하지만 막상 실행해 보면 다음과 같이 표기되며, 포매팅이 안 되는 경우가 있다.

```json
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
  0     0    0     0    0     0      0      0 --:--:-- --:--:-- --:--:--     0100   129  100   129    0     0    146      0 --:--:-- --:--:-- --:--:--   146
{"headers":{"Accept":"*/*","Content-Type":"application/json","Host":"nghttp2.org","User-Agent":"curl/7.54.0","Via":"2 nghttpx"}}
```

원인은 심플하다. curl 수행 보고 테이블이 위에 출력되기 때문에 `python -m json.tool`이 통하지 않는 것이다.

이 문제를 해결하려면 다음과 같이 vrc가 리퀘스트를 보낼 때 `curl`의`-s` 옵션(silence)을 사용하도록 설정해주면 된다.

```viml
let g:vrc_curl_opts = {
  \ '-s': '',
\}
```

이렇게 수정한 다음, 다시 실행해 보면 다음과 같이 포매팅이 완료된 결과가 나온다.

```json
{
    "headers": {
        "Accept": "*/*",
        "Content-Type": "application/json",
        "Host": "nghttp2.org",
        "User-Agent": "curl/7.54.0",
        "Via": "2 nghttpx"
    }
}
```

# Links

* [github.com/vim-rest-console](https://github.com/diepm/vim-rest-console )
