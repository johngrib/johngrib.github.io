---
layout  : wiki
title   : RFC(Request For Comment)
summary : 일련번호가 매겨진 인터넷 표준 문서
date    : 2017-12-10 12:42:46 +0900
updated : 2019-01-13 20:43:11 +0900
tag     : rfc
toc     : true
public  : true
parent  : what
latex   : false
---
* TOC
{:toc}

몇 가지 RFC 문서를 소개하는 페이지.

## RFC 822

* Standard for ARPA Internet Text Messages
* 인터넷 메일 포맷 표준
* [https://www.w3.org/Protocols/rfc822/](https://www.w3.org/Protocols/rfc822/)

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
