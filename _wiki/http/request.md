---
layout  : wiki
title   : HTTP Request
summary : 
date    : 2023-03-13 23:22:28 +0900
updated : 2023-03-13 23:24:52 +0900
tag     : 
resource: 37/8181DA-09A3-42CD-8E3D-704B50576239
toc     : true
public  : true
parent  : [[/http]]
latex   : false
---
* TOC
{:toc}

## RFC 2616

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
* 기능 예제
    * 존재하는 리소스에 주석을 단다.
    * 게시판, 뉴스그룹, 메일링 리스트, 또는 비슷한 종류의 그룹에 메시지를 등록한다.
    * 폼 전송의 결과 등과 같은 데이터 블록을 데이터 처리 프로세스에 전송한다.
    * 추가(append) 작업으로 데이터베이스를 확장한다.

요청이 성공했을 경우 다음과 같은 상태 코드를 돌려주곤 한다.

| 201 Created    | 새로운 리소스가 생성되었음.                                    |
| 204 No Content | 새로운 리소스가 생성되지 않았음.                               |
| 303 See Other  | 다른 자원 지시 또는 사용자 에이전트에게 캐시 리소스 검색 지시. |

#### RFC 2616 번역

>
The POST method is used to request that the origin server accept the entity enclosed in the request as a new subordinate of the resource identified by the Request-URI in the Request-Line.
POST is designed to allow a uniform method to cover the following functions:
>
- Annotation of existing resources;
- Posting a message to a bulletin board, newsgroup, mailing list, or similar group of articles;
- Providing a block of data, such as the result of submitting a form, to a data-handling process;
- Extending a database through an append operation.

POST 메소드는 원본 서버가 request에 포함된 엔티티를, 요청의 URI로 식별된 리소스의 새로운 하위 항목으로 받아들이도록 요청하는 데 사용됩니다.
POST는 다음과 같은 기능을 일관성있는 방법으로 처리할 수 있도록 설계되었습니다.

- 기존 리소스에 주석을 단다.
- 게시판, 뉴스 그룹, 메일링 리스트 또는 이와 유사한 게시글 그룹에 메시지 등록.
- form 제출 결과와 같은 데이터 블록을 데이터 처리 프로세스에 제공하기.
- append 작업으로, 이를 통해 데이터베이스 확장.

>
The actual function performed by the POST method is determined by the server and is usually dependent on the Request-URI.
The posted entity is subordinate to that URI in the same way that a file is subordinate to a directory containing it, a news article is subordinate to a newsgroup to which it is posted, or a record is subordinate to a database.
>
The action performed by the POST method might not result in a resource that can be identified by a URI.
In this case, either 200 (OK) or 204 (No Content) is the appropriate response status, depending on whether or not the response includes an entity that describes the result.
>
If a resource has been created on the origin server, the response SHOULD be 201 (Created) and contain an entity which describes the status of the request and refers to the new resource, and a Location header (see section 14.30).
>
Responses to this method are not cacheable, unless the response includes appropriate Cache-Control or Expires header fields. However, the 303 (See Other) response can be used to direct the user agent to retrieve a cacheable resource.
>
POST requests MUST obey the message transmission requirements set out in section 8.2.
>
See section 15.1.3 for security considerations.

POST 메소드가 수행하는 실제 작업은 서버에 의해 결정되며, 일반적으로 Request-URI에 따라 달라지게 됩니다.
게시된 엔티티는 파일이 포함된 디렉토리에 종속되거나 뉴스 기사가 게시된 뉴스 그룹에 종속되거나 레코드가 데이터베이스에 종속되는 것과 같은 방식으로 해당 URI에 종속됩니다.

POST 메소드를 통해 어떤 작업이 실행되어도, URI로 식별할 수 있는 리소스가 생성되지 않을 수도 있습니다.
이런 경우 응답에 결과를 설명하는 엔티티가 포함되어 있는지에 따라 200(OK) 또는 204(No Content) 중 하나가 적절한 응답 상태 코드가 됩니다.

이 메소드에 대한 응답은 적절한 캐시 제어 또는 만료 헤더 필드를 포함하지 않는 한 캐싱할 수 없습니다.
그러나 303(See Other) 응답은 사용자 에이전트가 캐시 가능한 리소스를 검색하도록 지시하는 데 사용할 수 있습니다.

POST 요청은 섹션 8.2에 명시된 메시지 전송 요건을 준수해야 합니다.

보안 고려 사항은 섹션 15.1.3을 참고하세요.

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

>
**9.7 DELETE**
>
The DELETE method requests that the origin server delete the resource identified by the Request-URI.
This method MAY be overridden by human intervention (or other means) on the origin server.
The client cannot be guaranteed that the operation has been carried out, even if the status code returned from the origin server indicates that the action has been completed successfully.
However, the server SHOULD NOT indicate success unless, at the time the response is given, it intends to delete the resource or move it to an inaccessible location.
>
A successful response SHOULD be 200 (OK) if the response includes an entity describing the status, 202 (Accepted) if the action has not yet been enacted, or 204 (No Content) if the action has been enacted but the response does not include an entity.
>
If the request passes through a cache and the Request-URI identifies one or more currently cached entities, those entries SHOULD be treated as stale.
Responses to this method are not cacheable.

- DELETE 메소드는 Request-URI를 통해 지정된 자원을 origin 서버에서 삭제하도록 요청합니다.
- 이 메소드는 origin 서버에서 인간의 개입(또는 다른 방식)으로 인해 무시되거나 다른 방식으로 처리될 수 있습니다.
- 이 요청은 클라이언트가 요청한대로 처리된다고 보장할 수 없습니다. 심지어 origin 서버가 작업이 성공적으로 완료되었다는 의미의 상태 코드로 응답했다 하더라도 마찬가지입니다.
- 한편 서버는 해당 자원을 삭제하려는 의도가 없거나, 접근할 수 없는 위치로 이동시키려는 의도가 없다면, 성공했다고 응답하지 않아야 합니다.
- 성공에 대한 응답은,
    - 응답에 상태를 설명하는 엔티티가 포함된다면 200 (OK),
    - 접수는 되었지만 실행이 아직 되지 않은 경우에는 202 (Accepted),
    - 조치가 시행되어 응답에 엔티티가 포함되지 않는다면 204 (No Content)를 사용합니다.
- 만약 요청이 cache를 통해 전달되며 Request-URI가 하나 이상의 현재 캐시된 엔티티를 식별한다면, 해당 항목들은 낡은(stale) 자료로 취급해야 합니다.
- 이 메소드에 대한 응답은 캐시하지 않도록 합니다.

### PATCH

[RFC 5789 - PATCH Method for HTTP]( https://www.rfc-editor.org/rfc/rfc5789 )

## Links

* [RFC 2616](https://tools.ietf.org/html/rfc2616 ) - Hypertext Transfer Protocol -- HTTP/1.1
* [RFC 7231](https://tools.ietf.org/html/rfc7231 ) - Hypertext Transfer Protocol (HTTP/1.1): Semantics and Content
* [RFC 7232](https://tools.ietf.org/html/rfc7232 ) - Hypertext Transfer Protocol (HTTP/1.1): Conditional Requests
* [MDN: HTTP 메시지](https://developer.mozilla.org/ko/docs/Web/HTTP/Messages)
