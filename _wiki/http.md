---
layout  : wiki
title   : HTTP
summary :
date    : 2017-12-24 23:21:39 +0900
updated : 2019-08-13 00:14:04 +0900
tag     : http
toc     : true
public  : true
parent  : what
latex   : false
---
* TOC
{:toc}

# Documents

* 1991 [The Original HTTP as defined in 1991](https://www.w3.org/Protocols/HTTP/AsImplemented.html )
    * 1.0이 유명해진 이후 HTTP/0.9 라고 불리게 되었다.
* 1996-05 [RFC 1945](https://tools.ietf.org/html/rfc1945 ): HTTP/1.0
* 1997-01 [RFC 2068](https://tools.ietf.org/html/rfc2068 ): HTTP/1.1
* 2015-05 [RFC 7540](https://tools.ietf.org/html/rfc7540 ): HTTP/2

좀 더 많은 문서 목록을 보고 싶다면 [RFC#http](/wiki/RFC/#http)를 참고.

# Request

[RFC 2616 - 5 Request](https://tools.ietf.org/html/rfc2616#section-5 )

```
Request       = Request-Line              ; Section 5.1
                *(( general-header        ; Section 4.5
                 | request-header         ; Section 5.3
                 | entity-header ) CRLF)  ; Section 7.1
                CRLF
                [ message-body ]          ; Section 4.3
```

* 세미콜론 이후는 주석이며, RFC 2616의 색인을 의미한다.
* [CRLF는 줄바꿈을 의미한다](/wiki/special-chars/#cr-lf).

문서의 내용을 종합하여 알아보기 쉽게 표현하면 다음과 같다.

* 리퀘스트 라인
* 헤더(각 헤더는 CRLF로 구별한다)
* CRLF
* 메시지 본문

예를 들어, 웹 브라우저에서 [https://developer.mozilla.org/ko/docs/Web/HTTP/Messages](https://developer.mozilla.org/ko/docs/Web/HTTP/Messages )로
접속한다면 다음과 같은 HTTP 리퀘스트 메시지가 전송된다.

```yml
GET /ko/docs/Web/HTTP/Messages HTTP/1.1
Host: developer.mozilla.org
User-Agent: Mozilla/5.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8
Referer: https://www.google.co.kr/
Accept-Encoding: gzip, deflate, br
Accept-Language: ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7,ja;q=0.6

```

* 첫 줄은 리퀘스트 라인이다.
* 이후 `key: value` 형식의 라인은 헤더를 의미한다.
* 본문은 보낼 필요가 없는 경우엔 안 보내도 된다.

## Request-Line

[RFC 2616 - 5.1 Request Line](https://tools.ietf.org/html/rfc2616#section-5.1 )

```
Request-Line   = Method SP Request-URI SP HTTP-Version CRLF
```

* 리퀘스트 메시지의 첫 번째 줄이다.
* `메소드 리퀘스트-URI HTTP-버전 줄바꿈`으로 이루어진다.
* `SP`는 스페이스를 의미한다. 각 항목 사이에 공백이 들어가야 한다는 말.
* 예: `GET /ko/docs/Web/HTTP/Messages HTTP/1.1`

## Method

[RFC 2616 - 5.1.1 Method](https://tools.ietf.org/html/rfc2616#section-5.1.1 )

```
Method         = "OPTIONS"                ; Section 9.2
               | "GET"                    ; Section 9.3
               | "HEAD"                   ; Section 9.4
               | "POST"                   ; Section 9.5
               | "PUT"                    ; Section 9.6
               | "DELETE"                 ; Section 9.7
               | "TRACE"                  ; Section 9.8
               | "CONNECT"                ; Section 9.9
               | extension-method
extension-method = token
```

**안전한 메소드**

* 개념상 부작용이 없어, 클라이언트에게 쉽게 허용할 수 있는 메소드.
* GET, HEAD, OPTIONS, TRACE

**안전하지 않은 메소드**

* 서버에 데이터를 보내거나, 서버의 상태를 변하게 하는 메소드.
* POST, PUT, DELETE

**멱등(idempotent)한 메소드**

* 반복적으로 요청해도 한 번 요청한 것과 같은 결과가 발생하는 메소드.
* (이상적으로) POST를 제외한 모든 메소드가 멱등성을 갖는다.

### GET

[RFC 2616 - 9.3 GET](https://tools.ietf.org/html/rfc2616#section-9.3 )

* 서버에 리소스를 요청할 때 사용한다.
* 클라이언트가 돌려받는 리소스의 표현은 요청 상황과 자료의 특성에 따라 달라질 수 있다.

### HEAD

[RFC 2616 - 9.4 GET](https://tools.ietf.org/html/rfc2616#section-9.4 )

* GET과 똑같지만, 헤더만 돌려주고 메시지 본문은 돌려주지 않는다.
* 다음의 용도로 사용할 수 있다.
    * 테스트 용도
    * 정보 변경/존재 여부 확인
    * 자료의 크기 조사

### POST

[RFC 2616 - 9.5 POST](https://tools.ietf.org/html/rfc2616#section-9.5 )

* 지정한 리소스에 데이터를 전송할 때 사용한다.
* 멱등성(idempotent)을 갖지 않는다.

>
- Annotation of existing resources;
- Posting a message to a bulletin board, newsgroup, mailing list, or similar group of articles;
- Providing a block of data, such as the result of submitting a form, to a data-handling process;
- Extending a database through an append operation.

* 존재하는 리소스에 주석을 단다.
* 게시판, 뉴스그룹, 메일링 리스트, 또는 비슷한 종류의 그룹에 메시지를 등록한다.
* 폼 전송의 결과 등과 같은 데이터 블록을 데이터 처리 프로세스에 전송한다.
* 추가(append) 작업으로 데이터베이스를 확장한다.

요청이 성공했을 경우 다음과 같은 상태 코드를 돌려주곤 한다.

| 201 Created | 새로운 리소스가 생성되었음. |
|             |                             |

### PUT

[RFC 2616 - 9.6 POST](https://tools.ietf.org/html/rfc2616#section-9.6 )

* 지정한 리소스에 데이터를 입력해달라는 요청을 보낼 때 사용한다.
* 멱등성을 갖는다.

### DELETE

[RFC 2616 - 9.7 DELETE](https://tools.ietf.org/html/rfc2616#section-9.7 )

* 지정한 리소스를 삭제하는 요청을 보낼 때 사용한다.

요청이 성공했을 경우 일반적으로 다음과 같은 상태 코드가 돌아온다.

| 204 No Content | 삭제에 성공하여, 해당 리소스가 없음.       |
| 200 OK         | 삭제 성공.                                 |
| 202 Accepted   | 삭제 요청을 받아들였음. 나중에 삭제하겠다. |

# Response

[RFC 2616 - 6 Response](https://tools.ietf.org/html/rfc2616#section-6 )

```
Response      = Status-Line               ; Section 6.1
                *(( general-header        ; Section 4.5
                 | response-header        ; Section 6.2
                 | entity-header ) CRLF)  ; Section 7.1
                CRLF
                [ message-body ]          ; Section 7.2
```

* 세미콜론 이후는 주석이며, RFC 2616의 색인을 의미한다.
* [CRLF는 줄바꿈을 의미한다](/wiki/special-chars/#cr-lf).

문서의 내용을 종합하여 알아보기 쉽게 표현하면 다음과 같다.

* 상태 라인
* 헤더(각 헤더는 CFLF로 구별한다)
* CRLF
* 메시지 본문

예를 들어, 웹 브라우저에서 [https://developer.mozilla.org/ko/docs/Web/HTTP/Messages](https://developer.mozilla.org/ko/docs/Web/HTTP/Messages )로
접속한다면 다음과 같은 HTTP 리스폰스 메시지가 전송된다.

```yml
HTTP/1.1 200 OK
Access-Control-Allow-Origin: *
Content-Encoding: gzip
Content-Type: text/html; charset=utf-8
Server: meinheld/0.6.1
Vary: Cookie, Accept-Encoding
Content-Length: 28676

<!DOCTYPE html>
<html lang="ko" dir="ltr" class="no-js" data-ffo-opensans="false" data-ffo-zillaslab="false">
<head prefix="og: http://ogp.me/ns#">
  <meta charset="utf-8">
...이후 생략...
```

* 첫 줄은 상태 라인이다.
* 이후 `key: value` 형식의 라인은 헤더를 의미한다.
* 본문 이전에 공백 라인이 하나 있어야 한다.
* 본문은 보낼 필요가 없는 경우엔 안 보내도 된다.

## Status-Line

[RFC 2616 - 6.1 Status-Line](https://tools.ietf.org/html/rfc2616#section-6.1 )

```
Status-Line = HTTP-Version SP Status-Code SP Reason-Phrase CRLF
```

* 리스폰스 메시지의 첫 번째 줄이다.
* `프로토콜-버전 상태-코드 사유-설명문(Reason-Phrase)`으로 이루어진다.
* `SP`는 스페이스를 의미한다. 각 항목 사이에 공백이 들어가야 한다는 말.
* 예: `HTTP/1.1 200 OK`

## Status-Code와 Reason-Phrase

[RFC 2616 - 6.1.1 Status Code and Reason Phrase](https://tools.ietf.org/html/rfc2616#section-6.1.1 )

상태 코드의 범위별 의미는 다음과 같다.

- 1xx: Informational - Request received, continuing process
- 2xx: Success - The action was successfully received, understood, and accepted
- 3xx: Redirection - Further action must be taken in order to complete the request
- 4xx: Client Error - The request contains bad syntax or cannot be fulfilled
- 5xx: Server Error - The server failed to fulfill an apparently valid request

**100, 200, 300, 400, 500 에 대하여**

* `00` 상태 코드는 해당 그룹을 대표하는 상태 코드이다.
    * 만약 클라이언트가 `491` 코드를 받았는데, 의미를 모르겠다면 `400 Bad Request`로 처리하는 식.

### 100 Continue

[RFC 7231 - 6.2.1 Continue]

* 일반적으로 클라이언트는 완전한 요청을 서버로 전달하고, 응답을 기다린다.
* 그러나 요청의 크기가 매우 큰 경우, 서버가 요청을 받을 의사가 있는지를 확인할 필요가 있다.
* 대략 다음과 같은 순서를 따르게 된다.
    1. 클라이언트는 `Expect: 100-Continue` 헤더를 서버에 보낸다.
    2. 서버는 요청의 헤더를 확인하고, 요청을 받을 수 있다면 `100 Continue` 응답을 돌려보낸다.
    3. 클라이언트는 `100` 상태 코드를 확인하고, 전체 요청을 서버로 보낸다.

### 101 Switching Protocols
### 200 OK

[RFC 7231 - 6.3.1 OK](https://tools.ietf.org/html/rfc7231#section-6.3.1 )

* 리퀘스트가 성공했음을 의미한다.

### 201 Created

[RFC 7231 - 6.3.2 Created](https://tools.ietf.org/html/rfc7231#section-6.3.2 )

* 요청이 성공하여, 서버 내에 자원을 생성하였음을 의미한다.
* PUT 메소드에 대한 일반적인 응답.

### 202 Accepted
### 203 Non-Authoritative Information
### 204 No Content
### 205 Reset Content
### 206 Partial Content
### 300 Multiple Choices
### 301 Moved Permanently

[RFC 7231 - 6.4.2 301 Moved Permanently ](https://tools.ietf.org/html/rfc7231#section-6.4.2 )

* 리소스가 영구히 옮겨져 다른 URI를 할당받은 경우를 의미한다.
* 응답에는 앞으로 해당 자원에 접근할 때 참조할 수 있도록 변경된 URI '들'이 포함된다.
    * 그러나 보통은 이런 처리가 매우 귀찮기 때문에 그냥 404 로 응답하는 경우가 많다.

### 302 Found
### 303 See Other
### 304 Not Modified

[RFC 7232 - 4.1. 304 Not Modified](https://tools.ietf.org/html/rfc7232#section-4.1 )

* 조건부 GET/HEAD 리퀘스트에 대한 응답이다.
    * 이미 똑같은 응답을 한 적이 있고, 서버의 리소스는 변경되지 않았으므로 또 보내지 않겠다는 의미.
    * 클라이언트에 저장된 리소스를 사용하도록 유도한다.
* 정보 전송을 최소화하는 것이 304의 목적이다.

### 305 Use Proxy
### 306 (unused)

[RFC 7232 - 6.4.6](https://tools.ietf.org/html/rfc7231#section-6.4.6 )

* HTTP 옛날 버전에 정의되었으나, 이제는 사용되지 않는 상태 코드.

### 307 Temporary Redirect
### 400 Bad Request

[RFC 7231 - 6.5.1 400 Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1 )

* 서버가 요청을 이해할 수 없거나, 클라이언트 에러로 인해 처리할 수 없었을 경우 사용하는 일반적인 응답.

### 401 Unauthorized

[RFC 7235 - 3.1. 401 Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1 )

* 대상 리소스에 대한 올바른 인증/권한이 없음.
* 패스워드 등으로 보호된 자원을 자격 없이 접근하려는 시도에 이 상태 코드를 반환한다.
    * 403 과의 차이점: 403은 인증과 관련이 없는 "거부"를 의미한다.

### 402 Payment Required
### 403 Forbidden

[RFC 7231 - 6.5.3 403 Forbidden](https://tools.ietf.org/html/rfc7231#section-6.5.3 )

* 서버는 요청을 이해했으나, 그에 대한 응답을 거부했다.
    * 401과 비교해보며 이해할 필요가 있음.
    * 만약 웹사이트 관리자가 특정 클라이언트의 접근을 막는다면 그 클라이언트의 모든 요청은 403 코드를 돌려받게 될 것이다.

### 404 Not Found

[RFC 7231 - 6.5.4 404 Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.3 )

요청한 리소스를 찾을 수 없다.

### 405 Method Not Allowed
### 406 Not Acceptable
### 407 Proxy Authentication Required
### 408 Request Time-out
### 409: Conflict

[RFC 7231 - 6.5.7 409 Conflict](https://tools.ietf.org/html/rfc7231#section-6.5.8 )

* 자원의 현재 상태와 관련된 충돌로 요청을 수행할 수 없음.
* PUT 메소드에 대한 응답으로 자주 쓰인다.

### 410: Gone
### 411: Length Required
### 412: Precondition Failed
### 413: Request Entity Too Large
### 414: Request-URI Too Large

[RFC 7231 - 6.5.12 414 URI Too Long](https://tools.ietf.org/html/rfc7231#section-6.5.12 )

요청 URL이 너무 길다.

[[URI]]에 관련 내용을 정리해 두었다.

### 415: Unsupported Media Type
### 416: Requested range not satisfiable
### 417: Expectation Failed
### 500 Internal Server Error

[RFC 7231 - 6.6.1 500 Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1 )

서버에 에러가 발생하여 요청을 처리할 수 없다.

### 501 Not Implemented
### 502 Bad Gateway
### 503 Service Unavailable
### 504 Gateway Time-out
### 505 HTTP Version not supported

# Links

* [RFC 7231](https://tools.ietf.org/html/rfc7231 ) - Hypertext Transfer Protocol (HTTP/1.1): Semantics and Content
* [RFC 7232](https://tools.ietf.org/html/rfc7232 ) - Hypertext Transfer Protocol (HTTP/1.1): Conditional Requests
* [RFC 2616](https://tools.ietf.org/html/rfc2616 ) - Hypertext Transfer Protocol -- HTTP/1.1
* [MDN: HTTP 메시지](https://developer.mozilla.org/ko/docs/Web/HTTP/Messages)

# 참고문헌

* 리얼월드 HTTP / 시부카와 요시키 저/김성훈 역 / 한빛미디어 / 2019년 04월 19일
* HTTP 완벽 가이드 / 데이빗 고울리, 브라이언 토티, 마조리 세이어, 세일루 레디, 안슈 아가왈 공저 / 이응준, 정상일 공역 / 인사이트(insight) / 2014년 12월 15일
* TCP/IP 완벽 가이드 / 찰스 M. 코지에록 저/강유, 김진혁, 민병호, 박선재 역 / 에이콘출판사 / 2007년 01월 25일 / 원제 : The TCP/IP Guide: A Comprehensive, Illustrated Internet Protocols Reference

