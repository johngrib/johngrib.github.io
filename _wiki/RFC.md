---
layout  : wiki
title   : RFC(Requests For Comments)
summary : 일련번호가 매겨진 인터넷 표준 문서
date    : 2017-12-10 12:42:46 +0900
updated : 2019-06-15 19:03:51 +0900
tag     : rfc
toc     : true
public  : true
parent  : what
latex   : false
---
* TOC
{:toc}

# Requests For Comments

* IETF가 만든 규약 문서.
    * IETF: 인터넷의 상호 접속성을 향상시키는 것을 목적으로 만들어진 단체.

책 "리얼월드 HTTP"에서는 RFC에 대해 다음과 같이 소개한다.

> RFC는 IETF라는 조직이 중심이 되어 유지 관리하는 통신의 상호접속성 유지를 위해 공통화된 사양서 모음입니다.
'Requests for Comments'라는 이름인데 사양서라고 하니 조금 어색한 느낌도 있지만, 여기에는 역사적 이유가 있습니다.
인터넷의 근간이 된 네트워크는 미국의 국방 예산으로 만들어져, 사양을 외부에 공개할 수 없었습니다.
그래서 품질 향상을 위한 의견을 전 세계로부터 폭넓게 수집한다는 명목으로 사양을 공개했던 흔적이 RFC라는 명칭으로 남았습니다.  
<br/>
RFC에는 다양한 종류가 있고, 개개의 RFC는 'RFC 1945'처럼 RFC+숫자로 표기합니다.
이미 정의된 포맷을 새로운 RFC에서 참조하기도 합니다.
RFC에 문제가 있을 때는 새로운 버전의 RFC로 갱신되기도 하고,
완전히 새로운 버전이 완성되면 폐기(obsolete)되는 일도 있습니다.

# 관련 있는 문서 모음

[rfcgraph](http://www.lysator.liu.se/~creideiki/rfcgraph/ )

## HTTP

![rfc-graph](/post-img/rfc/rfc_graph.jpg)

이미지 출처: "리얼월드 HTTP" 36쪽.

* 1977-11-21 [RFC-733][RFC-733] STANDARD FOR THE FORMAT OF ARPA NETWORK TEXT MESSAGES(1)
* 1982-08-13 [RFC-822][RFC-822] STANDARD FOR THE FORMAT OF ARPA INTERNET TEXT MESSAGES
* 1983-06 [RFC-850][RFC-850] Standard for Interchange of USENET Messages
* 1986-02 [RFC-977][RFC-977] Network News Transfer Protocol
* 1988-03 [RFC-1049][RFC-1049] A CONTENT-TYPE HEADER FIELD FOR INTERNET MESSAGES
* 1991 [The Original HTTP as defined in 1991](https://www.w3.org/Protocols/HTTP/AsImplemented.html )
* 1992-06 [RFC-1341][RFC-1341] MIME(Multipurpose Internet Mail Extensions)
* 1994-03 [RFC-1590][RFC-1590] Media Type Registration Procedure
* 1994-12 [RFC-1738][RFC-1738] Uniform Resource Locators (URL)
* 1995-06 [RFC-1808][RFC-1808] Relative Uniform Resource Locators
* 1995-11 [RFC-1866][RFC-1866] Hypertext Markup Language - 2.0
* 1996-05 [RFC-1945][RFC-1945] Hypertext Transfer Protocol -- HTTP/1.0
* 1996-11 [RFC-2045][RFC-2045] Multipurpose Internet Mail Extensions (MIME) Part One
* 1996-11 [RFC-2046][RFC-2046] Multipurpose Internet Mail Extensions (MIME) Part Two
* 1996-11 [RFC-2047][RFC-2047] Multipurpose Internet Mail Extensions (MIME) Part Three
* 1996-11 [RFC-2048][RFC-2048] Multipurpose Internet Mail Extensions (MIME) Part Four
* 1996-11 [RFC-2049][RFC-2049] Multipurpose Internet Mail Extensions (MIME) Part Five
* 1997-01 [RFC 2068](https://tools.ietf.org/html/rfc2068 ): HTTP/1.1
* 2000-06 [RFC-2854][RFC-2854] The 'text/html' Media Type
* 2001-01 [RFC-3023][RFC-3023] XML Media Types
* 2015-05 [RFC 7540](https://tools.ietf.org/html/rfc7540 ): HTTP/2


# 몇몇 RFC 소개
## RFC 822

* 1982-08-13 [STANDARD FOR THE FORMAT OF ARPA INTERNET TEXT MESSAGES](https://tools.ietf.org/html/rfc822 )
    * 아르파 인터넷 텍스트 메시지 형식 표준
* 업데이트
    * 2013-03 [RFC 6854 - Update to Internet Message Format to Allow Group Syntax in the "From:" and "Sender:" Header Fields](https://tools.ietf.org/html/rfc6854 )
    * 2008-10 [RFC 5322 - Internet Message Format](https://tools.ietf.org/html/rfc5322 )
    * 2001-04 [RFC 2822 - Internet Message Format](https://tools.ietf.org/html/rfc2822 )

이 문서의 머리말은 다음과 같이 시작한다.

>
By 1977, the Arpanet employed several informal standards for the text messages (mail) sent among its host computers. It was felt necessary to codify these practices and provide for those features that seemed imminent.  
<br>
1977 년 Arpanet은 호스트 컴퓨터간에 전송된 텍스트 메시지(**메일**)에 대해 여러 가지 비공식 표준을 사용했습니다. 이러한 관습을 문서화하고 임박한 기능을 제공하는 것이 필요하다고 느꼈습니다. 


## RFC 2045

* Multipurpose Internet Mail Extensions(MIME) Part One: Format of Internet Message Bodies
* MIME 메시지 구조
* [https://www.ietf.org/rfc/rfc2045.txt](https://www.ietf.org/rfc/rfc2045.txt)

## RFC 2046

* Multipurpose Internet Mail Extensions(MIME) Part Two: Media Types
* MIME 타입
* [https://www.ietf.org/rfc/rfc2046.txt](https://www.ietf.org/rfc/rfc2046.txt)

## RFC 2047

* MIME(Multipurpose Internet Mail Extensions) Part Three: Message Header Extensions for Non-ASCII Text
* Non ASCII 문자를 헤더에 포함시키는 방법
* [https://www.ietf.org/rfc/rfc2047.txt](https://www.ietf.org/rfc/rfc2047.txt)

## RFC 2048

* Multipurpose Internet Mail Extensions(MIME) Part Four: Registration Procedures
* 새로운 MIME을 등록하는 방법
* [https://www.ietf.org/rfc/rfc2048.txt](https://www.ietf.org/rfc/rfc2048.txt)

## RFC 2049

* Multipurpose Internet Mail Extensions(MIME) Part Five: Conformance Criteria and Examples
* MIME: 표준에 적합한지 참고할 수 있는 규칙과 예제
* [https://www.ietf.org/rfc/rfc2049.txt](https://www.ietf.org/rfc/rfc2049.txt)

## RFC 2141

* URN Syntax
* [https://www.ietf.org/rfc/rfc2141.txt](https://www.ietf.org/rfc/rfc2141.txt)

## RFC 3092

* Etymology of "Foo"
* "Foo"의 어원
* [https://www.ietf.org/rfc/rfc3092.txt](https://www.ietf.org/rfc/rfc3092.txt)

## RFC 4122

* A Universally Unique IDentifier (UUID) URN Namespace
* UUID, GUID를 정의하고 생성 알고리즘을 기술한다.
    * UUID : Universally Unique IDentifier
    * GUID : Globally Unique IDentifier
* <https://tools.ietf.org/html/rfc4122 >

## RFC 4291

* IP Version 6 Addressing Architecture
* <https://tools.ietf.org/html/rfc4291 >

## RFC 5321

* Simple Mail Transfer Protocol(SMTP)
* <https://tools.ietf.org/html/rfc5321 >

## RFC 5424

* The Syslog Protocol
* <https://tools.ietf.org/html/rfc5424 >
* Syslog Message Severities 가 정의된 문서이기도 하다.

| Code | Severity                                 |
|------|------------------------------------------|
| 0    | Emergency: system is unusable            |
| 1    | Alert: action must be taken immediately  |
| 2    | Critical: critical conditions            |
| 3    | Error: error conditions                  |
| 4    | Warning: warning conditions              |
| 5    | Notice: normal but significant condition |
| 6    | Informational: informational messages    |
| 7    | Debug: debug-level messages              |

다양한 언어의 logger 라이브러리가 이 문서를 인용한다.

예를 들어, [PSR-3 의 LoggerInterface](https://github.com/php-fig/fig-standards/blob/master/accepted/PSR-3-logger-interface.md )는 이를 참고한다.

```php
<?php
namespace Psr\Log;

interface LoggerInterface
{
    public function emergency($message, array $context = array());
    public function alert($message, array $context = array());
    public function critical($message, array $context = array());
    public function error($message, array $context = array());
    public function warning($message, array $context = array());
    public function notice($message, array $context = array());
    public function info($message, array $context = array());
    public function debug($message, array $context = array());
    public function log($level, $message, array $context = array());
}
```

# 참고문헌

* 리얼월드 HTTP 시부카와 요시키 저/김성훈 역 / 한빛미디어 / 2019년 04월 19일


[RFC-7540]: https://tools.ietf.org/html/rfc7540
[RFC-3023]: https://tools.ietf.org/html/rfc3023
[RFC-2854]: https://tools.ietf.org/html/rfc2854
[RFC-2068]: https://tools.ietf.org/html/rfc2068
[RFC-2049]: https://tools.ietf.org/html/rfc2049
[RFC-2048]: https://tools.ietf.org/html/rfc2048
[RFC-2047]: https://tools.ietf.org/html/rfc2047
[RFC-2046]: https://tools.ietf.org/html/rfc2046
[RFC-2045]: https://tools.ietf.org/html/rfc2045
[RFC-1945]: https://tools.ietf.org/html/rfc1945
[RFC-1866]: https://tools.ietf.org/html/rfc1866
[RFC-1808]: https://tools.ietf.org/html/rfc1808
[RFC-1738]: https://tools.ietf.org/html/rfc1738
[RFC-1590]: https://tools.ietf.org/html/rfc1590
[RFC-1341]: https://tools.ietf.org/html/rfc1341
[RFC-1049]: https://tools.ietf.org/html/rfc1049
[RFC-977]: https://tools.ietf.org/html/rfc977
[RFC-850]: https://tools.ietf.org/html/rfc850
[RFC-822]: https://tools.ietf.org/html/rfc822
[RFC-733]: https://tools.ietf.org/html/rfc733
