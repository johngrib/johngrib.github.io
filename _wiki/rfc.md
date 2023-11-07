---
layout  : category
title   : RFC(Requests For Comments)
summary : 일련번호가 매겨진 인터넷 표준 문서
date    : 2017-12-10 12:42:46 +0900
updated : 2023-11-07 22:55:11 +0900
tag     : rfc
resource: 6F/286146-5C56-4DAA-96DE-6C7B24F6FC2D
toc     : true
public  : true
parent  : [[/index]]
latex   : false
---
* TOC
{:toc}

## 개요

* RFC는 IETF가 관리하고 있는 규약 문서.
    * IETF: 인터넷의 상호 접속성을 향상시키는 것을 목적으로 만들어진 단체.
* 누구나 만들 수 있는 것은 아니고 [절차][RFC-2026]가 있다.
* 많은 표준이 RFC 형태로 존재하지만, [모든 RFC가 표준인 것은 아니다][RFC-1796].
* Draft Standard(초안 표준)도 안정된 기술로 인정받곤 하므로 RFC를 참고하여 구현하는 회사들이 있다.
* 일단 발행된 RFC는 수정/삭제되지 않는다.
    * 업데이트는 새로운 RFC 문서가 발행되고, 해당 문서를 언급하고 링크하는 방식으로 이루어진다.

## 어디에서 읽나?

- [rfc-editor.org]( https://www.rfc-editor.org/ )
- [tools.ietf.org]( https://tools.ietf.org/html/ )
- [rfcreader]( https://www.rfcreader.com/ )

## RFC의 카테고리

RFC 문서의 상단을 보면 메타 정보가 있다. 다음은 [RFC-1796][RFC-1796]의 상단을 인용한 것이다.

```text
Network Working Group                                         C. Huitema
Request for Comments: 1796                                         INRIA
Category: Informational                                        J. Postel
                                                                     ISI
                                                              S. Crocker
                                                               CyberCash
                                                              April 1995
```

세번째 줄에 있는 Category의 종류를 알아두면 RFC 문서를 읽을 때 도움이 된다.

이 카테고리는 [RFC-2026][RFC-2026]의 Section 4~5에 정의되어 있다.

* **Proposed Standard, Draft Standard, Standard**
    * 제안 표준, 초안 표준, 표준
    * Standards Track에 해당하는 기술과 관련된 문서.
        * Standard Track: 표준으로 인정받기 위한 절차.
        * [RFC-2026][RFC-2026], [RFC-6410][RFC-6410]을 참고할 것.
    * 즉, 표준으로 공인 받았거나 미래에 승인 받을 가능성이 있는 기술을 설명한다.
* **Best Current Practice**
    * 현재 최고 사례: IETF에서 제공하는 지침 정보나 권고 문서.
    * 공식 표준은 아님.
* **Informational**
    * 정보성 문서.
* **Experimental**
    * 표준 트랙에 있지 않은 실험적 표준 제안.
* **Historic**
    * 최신 사양으로 대체되었거나 그 외의 다른 이유로 사용되지 않는 사양.

## 인용

### From: 유닉스·리눅스 시스템 관리 핸드북

>
인터넷 커뮤니티의 기술적인 활동들은 RFC<sup>Requests for Comments</sup>라는 문서에 요약돼 있다.
프로토콜 표준, 수정 제안, 정보 게시판 등은 결국 모두 RFC의 형태로 종결된다.
RFC는 인터넷 드래프트<sup>Internet Dreafts</sup>로 시작돼 수많은 이메일 논쟁과 IETF 미팅을 거친 후에 최종적으로 폐기되든지 RFC 시리즈로 승격되든지 한다.
그래프트나 제안된 RFC에 대해 언급할 것이 있는 사람은 누구나 회신을 보낼 수 있다.
RFC 메커니즘은 인터넷 프로토콜의 표준화뿐 아니라 때로는 현행 실무에 관한 여러 측면들을 문서화하거나 설명하기도 한다.
>
RFC에는 순차적으로 번호가 매겨진다.
현재 약 8,200개의 번호가 사용됐다.
RFC에는 그 내용을 나타내는 제목(예, 네트워크 시간 동기화를 위한 알고리듬)이 있긴 하지만 그 모호성을 방지하고자 보통은 숫자로 언급된다.
RFC 내용은 일단 배포된 후에는 결코 수정되지 않는다.
업데이트는 다른 참조 번호를 갖는 새로운 RFC로 배포된다.
업데이트는 기존 RFC를 확장해 명확하게 만들기도 하고 완전히 대체하기도 한다.
>
RFC는 수많은 출처에서 구할 수 있지만 [rfc-editor.org]( https://www.rfc-editor.org/ )가 배포 중심지이며 가장 업데이트된 정보를 갖고 있다.
문서를 읽는 데 시간을 투자하기 전에 [rfc-editor.org]( https://www.rfc-editor.org/ ) 에서 RFC 상태를 먼저 확인하기 바란다.
읽고 있는 문서가 그 주제에 관한 가장 최신 버전이 아닐 수 있기 때문이다.
>
인터넷 표준 프로세스 자체는 [RFC2026][RFC-2026]에 자세히 설명돼 있다. 또 다른 유용한 메 타RFC는 RFC 시스템의 문화와 기술적 맥락을 설명하고 있는 RFC5540, RFC의 40년이다.
>
RFC에 담겨 있는 많은 기술적 세부 사항에 겁먹을 필요는 없다.
기술적 세부 사항이 필요 없는 경우일지라도 대부분의 내용은 시스템 관리자들에게 유용한 서론, 개요, 이론들이다.
일부 RFC는 전반적인 개요나 일반적인 정보를 위해 특별히 작성된다.
RFC는 어떤 특정 주제를 배우기 위한 가장 쉬운 방법은 아닐 수 있지만 RFC는 공인된 권위가 있으며 매우 구체적인 데다가 무료다.
[^sysadmin-handbook-587]

### From: TCP/IP 완벽 가이드

>
오늘날 인터넷의 시초는 소수의 컴퓨터 과학자와 엔지니어가 개발하고 운영했던 작은 네트워크였다.
이 기술자들은 인터넷과 TCP/IP 프로토콜 슈트가 성공하기 위해서는 공개되고 널리 채택된 표준이 필수라는 사실을 알고 있었다.
하지만 그 당시에는 정형화된 표준 개발 방식이 존재하지 않았다.  
표준화를 하려면 새로운 기술과 프로토콜에 대해 공감대를 형성해야 한다.
새 기술이나 프로토콜에 대한 제안, 또는 기존 기술에 대한 개선안이 있는 사람은 그 내용을 메모에 적어 다른 사람들에게 회람시킨다.
이러한 회람의 목적은 제안에 대한 논평을 구하는 것이므로 이들 메모를 RFC(Request for Comments)라고 부른다.  
물론 요즘은 인터넷이 방대해졌기 때문에 새로운 인터넷과 TCP/IP 표준을 만드는 것을 담당하는 공식적인 인터넷 표준 기구 체계가 정립되어 있다.
수천 명의 사람들이 인터넷 기술을 열심히 개발하고 있기 때문에 누구나 RFC를 만들도록 허용한다면 표준 개발이 너무나도 혼란스러울 것이다.
그래서 인터넷과 TCP/IP 표준을 아직도 RFC라고 부르지만 그 표준을 만드는 절차는 예전에 비해 훨씬 공식화되고 구조화되었다.  
IETF는 인터넷 표준을 만드는 데 가장 직접적으로 연관된 표준 기구다.
IETF의 워킹 그룹(IESG와 IAB가 관리)은 새로운 프로토콜과 기술을 꾸준히 개발하며, 그 내용은 RFC로 공식화된다.  
RFC 편집자 사무소는 RFC 출판을 담당한다.
1969년부터 거의 30년 동안 RFC 편집자는 인터넷 선구자인 존 포스텔이었다.
1998년 그가 사망한 뒤 RFC 편집자의 기능은 한때 존 포스텔이 관리자로 있었던 USC Information Sciences Institute(ISI)의 네트워킹 부서로 옮겨졌다.
RFC 편집자의 역할은 RFC를 출판하고 보관하며 인터넷 커뮤니티에서 RFC에 쉽게 접근할 수 있도록 온라인 RFC 문서를 관리하는 것이다.
[^tcp-ip-guide-58]

### From: 리얼월드 HTTP

>
RFC는 IETF라는 조직이 중심이 되어 유지 관리하는 통신의 상호접속성 유지를 위해 공통화된 사양서 모음입니다.
'Requests for Comments'라는 이름인데 사양서라고 하니 조금 어색한 느낌도 있지만, 여기에는 역사적 이유가 있습니다.
인터넷의 근간이 된 네트워크는 미국의 국방 예산으로 만들어져, 사양을 외부에 공개할 수 없었습니다.
그래서 품질 향상을 위한 의견을 전 세계로부터 폭넓게 수집한다는 명목으로 사양을 공개했던 흔적이 RFC라는 명칭으로 남았습니다.
>
RFC에는 다양한 종류가 있고, 개개의 RFC는 'RFC 1945'처럼 RFC+숫자로 표기합니다.
이미 정의된 포맷을 새로운 RFC에서 참조하기도 합니다.
RFC에 문제가 있을 때는 새로운 버전의 RFC로 갱신되기도 하고,
완전히 새로운 버전이 완성되면 폐기(obsolete)되는 일도 있습니다.
[^real-world-http-35]


## 관련 있는 문서 모음

[rfcgraph](http://www.lysator.liu.se/~creideiki/rfcgraph/ )

### HTTP

![rfc-graph](/resource/6F/286146-5C56-4DAA-96DE-6C7B24F6FC2D/rfc_graph.jpg)

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


## 몇몇 RFC 소개
### RFC 768 - User Datagram Protocol

- 1980-08-28 [RFC 768 - User Datagram Protocol](https://www.rfc-editor.org/info/rfc768 )
    - 사용자 데이터그램 프로토콜.

### RFC 791 - INTERNET PROTOCOL

- 1981-09 [RFC 791 - Internet Protocol](https://www.rfc-editor.org/info/rfc791 )
    - 인터넷 프로토콜.

### RFC 792 - INTERNET CONTROL MESSAGE PROTOCOL

- 1981-09 [RFC 792 - Internet Control Message Protocol](https://www.rfc-editor.org/info/rfc792 )
    - 인터넷 제어 메시지 프로토콜.

### RFC 793 - TRANSMISSION CONTROL PROTOCOL

- 1981-09 [RFC 793 - Transmission Control Protocol](https://www.rfc-editor.org/info/rfc793 )
    - 전송 제어 프로토콜.

### RFC 822

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

### RFC 826 - An Ethernet Address Resolution Protocol

- 1982-11 [RFC 826 - An Ethernet Address Resolution Protocol](https://www.rfc-editor.org/info/rfc826 )
    - 이더넷 주소 해결 프로토콜.

### RFC 1855 - Netiquette Guidelines

- [[/rfc/1855]]

### RFC 1924 - A Compact Representation of IPv6 Addresses

TODO: 번역할 것

- <https://www.rfc-editor.org/rfc/rfc1924.html >

### RFC 1925 - The Twelve Networking Truths

네트워킹에 관한 12가지 진실.

- [[/rfc/1925]]

### RFC 1950 - ZLIB Compressed Data Format Specification version 3.3

- [[/rfc/1950]]

### RFC 2045

* Multipurpose Internet Mail Extensions(MIME) Part One: Format of Internet Message Bodies
* MIME 메시지 구조
* [https://www.ietf.org/rfc/rfc2045.txt](https://www.ietf.org/rfc/rfc2045.txt)

### RFC 2046

* Multipurpose Internet Mail Extensions(MIME) Part Two: Media Types
* MIME 타입
* [https://www.ietf.org/rfc/rfc2046.txt](https://www.ietf.org/rfc/rfc2046.txt)

### RFC 2047

* MIME(Multipurpose Internet Mail Extensions) Part Three: Message Header Extensions for Non-ASCII Text
* Non ASCII 문자를 헤더에 포함시키는 방법
* [https://www.ietf.org/rfc/rfc2047.txt](https://www.ietf.org/rfc/rfc2047.txt)

### RFC 2048

* Multipurpose Internet Mail Extensions(MIME) Part Four: Registration Procedures
* 새로운 MIME을 등록하는 방법
* [https://www.ietf.org/rfc/rfc2048.txt](https://www.ietf.org/rfc/rfc2048.txt)

### RFC 2049

* Multipurpose Internet Mail Extensions(MIME) Part Five: Conformance Criteria and Examples
* MIME: 표준에 적합한지 참고할 수 있는 규칙과 예제
* [https://www.ietf.org/rfc/rfc2049.txt](https://www.ietf.org/rfc/rfc2049.txt)

### RFC 2141

* URN Syntax
* [https://www.ietf.org/rfc/rfc2141.txt](https://www.ietf.org/rfc/rfc2141.txt)

### RFC 2616 - Hypertext Transfer Protocol -- HTTP/1.1

- [Hypertext Transfer Protocol -- HTTP/1.1](https://www.rfc-editor.org/rfc/rfc2616 )

### RFC 3092

* Etymology of "Foo"
* "Foo"의 어원
* [https://www.ietf.org/rfc/rfc3092.txt](https://www.ietf.org/rfc/rfc3092.txt)

### RFC 3629

- UTF-8, a transformation format of ISO 10646
- [RFC 3629]( https://datatracker.ietf.org/doc/html/rfc3629 )

### RFC 4122

* A Universally Unique IDentifier (UUID) URN Namespace
* UUID, GUID를 정의하고 생성 알고리즘을 기술한다.
    * UUID : Universally Unique IDentifier
    * GUID : Globally Unique IDentifier
* <https://tools.ietf.org/html/rfc4122 >

### RFC 4291

* IP Version 6 Addressing Architecture
* <https://tools.ietf.org/html/rfc4291 >

### RFC 5321

* Simple Mail Transfer Protocol(SMTP)
* <https://tools.ietf.org/html/rfc5321 >

### RFC 5424

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

### RFC 5952

- A Recommendation for IPv6 Address Text Representation
- <https://datatracker.ietf.org/doc/html/rfc5952 >

>
[RFC5952][RFC5952]는 표기 단순화를 필수적인 의무 사항으로 만들고자 [RFC4921][RFC4921]을 업데이트한 것이다.
또한 모든 주소가 오직 하나의 텍스트 표현을 갖는다는 것을 보장하고자 다음과 같은 몇 가지 규칙을 추가했다.
>
> - 16진수 `a`-`f`는 반드시 소문자로 표현해야 한다.
> - `::` 항목은 한 개의 16비트 그룹을 대체할 수 없다(단일 16비트 그룹의 표현은 `:0:`을 사용한다).
> - `::` 으로 대체할 그룹을 선택할 수 있는 상황이라면 `::`은 가장 길이가 긴 `0` 시퀀스를 대체해야 한다.
>
현실 세계에서는 여전히 [RFC5952][RFC5952]에 따르지 않는 주소들을 보게 될 것이며 거의 모든 네트워킹 소프트웨어도 그것을 받아들인다.
하지만 여러분의 환경설정, 기록 관리, 소프트웨어에서는 [RFC5952][RFC5952]에 따를 것을 강력히 권장한다.
[^sysadmin-handbook-613]

### RFC 6570

* URI Template
* <https://tools.ietf.org/html/rfc6570 >

다음과 같은 형식의 URI Template를 제안한다.

```text
http://example.com/~{username}/
http://example.com/dictionary/{term:1}/{term}
http://example.com/search{?q,lang}
```

### RFC 6749 - The Oauth 2.0 Authorization Framework

- [The OAuth 2.0 Authorization Framework](https://www.rfc-editor.org/rfc/rfc6749 )
- [[/oauth]]

### RFC 6750 - The OAuth 2.0 Authorization Framework: Bearer Token Usage

- [RFC 6750 - The OAuth 2.0 Authorization Framework: Bearer Token Usage]( https://www.rfc-editor.org/rfc/rfc6750 )

## 참고문헌

- TCP/IP 완벽 가이드 / 찰스 M. 코지에록 저/강유, 김진혁, 민병호, 박선재 역 / 에이콘출판사 / 2007년 01월 25일 / 원제 : The TCP/IP Guide: A Comprehensive, Illustrated Internet Protocols Reference
- 리얼월드 HTTP / 시부카와 요시키 저/김성훈 역 / 한빛미디어 / 2019년 04월 19일
- 유닉스·리눅스 시스템 관리 핸드북 5/e / 에비 네메스, 가스 스나이더, 트렌트 헤인, 벤 웨일리, 댄 맥킨 저 외 2명 / 에이콘출판사 / 발행: 2022년 01월 03일 / 원제: UNIX and Linux System Administration Handbook, 5th Edition

## 하위 문서

<div id="sub-document-list"></div>

## 주석

[^tcp-ip-guide-58]: TCP/IP 완벽 가이드. 3장. 네트워크 표준과 기구. 58쪽.
[^real-world-http-35]: 리얼월드 HTTP. 1장. 35쪽.
[^sysadmin-handbook-587]: 유닉스·리눅스 시스템 관리 핸드북 5/e. 13.1장. 587쪽.
[^sysadmin-handbook-613]: 유닉스·리눅스 시스템 관리 핸드북 5/e. 13.4장. 613쪽.

{% comment %}
    아래 목록은 vim 에서 :'<,'>sort n 으로 정렬했다.
{% endcomment %}

[RFC-7540]: https://tools.ietf.org/html/rfc7540
[RFC-6410]: https://tools.ietf.org/html/rfc6410
[RFC-3023]: https://tools.ietf.org/html/rfc3023
[RFC-2854]: https://tools.ietf.org/html/rfc2854
[RFC-2068]: https://tools.ietf.org/html/rfc2068
[RFC-2049]: https://tools.ietf.org/html/rfc2049
[RFC-2048]: https://tools.ietf.org/html/rfc2048
[RFC-2047]: https://tools.ietf.org/html/rfc2047
[RFC-2046]: https://tools.ietf.org/html/rfc2046
[RFC-2045]: https://tools.ietf.org/html/rfc2045
[RFC-2026]: https://tools.ietf.org/html/rfc2026
[RFC-1945]: https://tools.ietf.org/html/rfc1945
[RFC-1866]: https://tools.ietf.org/html/rfc1866
[RFC-1855]: https://tools.ietf.org/html/rfc1855
[RFC-1808]: https://tools.ietf.org/html/rfc1808
[RFC-1796]: https://tools.ietf.org/html/rfc1796
[RFC-1738]: https://tools.ietf.org/html/rfc1738
[RFC-1590]: https://tools.ietf.org/html/rfc1590
[RFC-1341]: https://tools.ietf.org/html/rfc1341
[RFC-1049]: https://tools.ietf.org/html/rfc1049
[RFC-977]: https://tools.ietf.org/html/rfc977
[RFC-850]: https://tools.ietf.org/html/rfc850
[RFC-822]: https://tools.ietf.org/html/rfc822
[RFC-733]: https://tools.ietf.org/html/rfc733
[RFC5952]: https://datatracker.ietf.org/doc/html/rfc5952
[RFC4291]: https://www.rfc-editor.org/rfc/rfc4291.html

