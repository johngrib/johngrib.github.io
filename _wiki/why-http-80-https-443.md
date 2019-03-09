---
layout  : wiki
title   : http의 기본 포트가 80, https의 기본 포트가 443인 이유는 무엇일까?
summary : 80은 처음부터 지정, 443은 나중에 요청을 받아 빈 공간으로 순서대로 배정
date    : 2017-12-12 23:19:48 +0900
updated : 2018-09-09 11:20:07 +0900
tag     : http rfc
toc     : true
public  : true
parent  : why
latex   : false
---
* TOC
{:toc}

## 개요

* http의 기본 포트는 `80`이다.
* https의 기본 포트는 `443`이다.

모르고 있었다면 간단한 실험으로도 알 수 있다.

* http 프로토콜
    * [ ] [http://www.google.com](http://www.google.com ) - http 프로토콜. 구글이 망하지만 않는다면 잘 접속된다.
    * [ ] [http://www.google.com:80](http://www.google.com:80 ) - `80` 포트를 명시했다. 잘 접속된다.
    * [X] [http://www.google.com:81](http://www.google.com:81 ) - `81` 포트를 명시했다. 목적이 다른 포트이므로 접속이 안 된다.
* https 프로토콜
    * [ ] [https://www.google.com](https://www.google.com ) - https 프로토콜. 잘 접속된다.
    * [ ] [https://www.google.com:443](https://www.google.com:443 ) - `443` 포트를 명시했다. 잘 접속된다.
    * [X] [https://www.google.com:444](https://www.google.com:444 ) - `444` 포트를 명시했다. 목적이 다른 포트이므로 접속이 안 된다.

이는 `80`과 `443`이 기본 포트 번호이기 때문이다. 포트 번호를 생략하면 기본 포트를 사용하게 된다.

자신이 자주 방문하는 웹 사이트 URL을 확인해보자.
포트 번호가 명시되어 있지 않다면, 프로토콜을 보고 `80`이나 `443` 포트를 붙여 실험해보자.
포트를 명시하지 않았을 때와 똑같이 잘 접속될 것이다.

## why?

### RFC 2616

1999년 6월에 나온 [RFC 2616](http://www.rfc-editor.org/rfc/rfc2616.txt )(Hypertext Transfer Protocol -- HTTP/1.1)을 찾아보자.

3.2.2 절을 읽어보면 다음과 같이 `80`포트가 기본 포트로 명시되어 있다.

```
3.2.2 http URL

   The "http" scheme is used to locate network resources via the HTTP
   protocol. This section defines the scheme-specific syntax and
   semantics for http URLs.

   http_URL = "http:" "//" host [ ":" port ] [ abs_path [ "?" query ]]

   If the port is empty or not given, port 80 is assumed. The semantics
   are that the identified resource is located at the server listening
   for TCP connections on that port of that host, and the Request-URI
   for the resource is abs_path (section 5.1.2). The use of IP addresses
   in URLs SHOULD be avoided whenever possible (see RFC 1900 [24]). If
   the abs_path is not present in the URL, it MUST be given as "/" when
   used as a Request-URI for a resource (section 5.1.2). If a proxy
   receives a host name which is not a fully qualified domain name, it
   MAY add its domain to the host name it received. If a proxy receives
   a fully qualified domain name, the proxy MUST NOT change the host
   name.
```

> If the port is empty or not given, port 80 is assumed.  
만약 포트가 비어 있거나 없으면 포트 80으로 간주한다.

### RFC 7540

이번엔 2015년 5월에 나온 [RFC 7540](https://tools.ietf.org/html/rfc7540 )(Hypertext Transfer Protocol Version 2 (HTTP/2))을 찾아보자.

3 절에 `80`, `443` 포트와 관련된 설명이 나와 있다.

```
3.  Starting HTTP/2

   An HTTP/2 connection is an application-layer protocol running on top
   of a TCP connection ([TCP]).  The client is the TCP connection
   initiator.

   HTTP/2 uses the same "http" and "https" URI schemes used by HTTP/1.1.
   HTTP/2 shares the same default port numbers: 80 for "http" URIs and
   443 for "https" URIs.  As a result, implementations processing
   requests for target resource URIs like "http://example.org/foo" or
   "https://example.com/bar" are required to first discover whether the
   upstream server (the immediate peer to which the client wishes to
   establish a connection) supports HTTP/2.

   The means by which support for HTTP/2 is determined is different for
   "http" and "https" URIs.  Discovery for "http" URIs is described in
   Section 3.2.  Discovery for "https" URIs is described in Section 3.3.
```

> HTTP/2 shares the same default port numbers: 80 for "http" URIs and 443 for "https" URIs.  
HTTP/2는 동일한 기본 포트 넘버를 공유한다: "http" URI는 80, "https" URI는 443.

### 히스토리

구글링을 하다 찾아낸 [howtogeek.com의 관련 질문/답변](https://www.howtogeek.com/233383/why-was-80-chosen-as-the-default-http-port-and-443-as-the-default-https-port/ )에 `80`, `443`과 관련된 히스토리가 답변으로 소개되어 있다.

요약하고 설명을 추가해 보았다.

* 1990년 3월: [RFC 1060](https://tools.ietf.org/html/rfc1060 )(ASSIGNED NUMBERS)
    * 포트 넘버 항목(8~9 쪽)을 보면 `79`, `81`은 있는데 `80`은 비어 있다.
* 1991년 : [HTTP 0.9 문서](https://www.w3.org/Protocols/HTTP/AsImplemented.html )
    * Connection 항목에 `If the port number is not specified, 80 is always assumed for HTTP.`라고 적혀 있다.
    * 이 문서는 최초로 작성된 HTTP 버전 문서이다.
* 1992년 7월 : [RFC 1060](ttps://tools.ietf.org/html/rfc1060 )이 [RFC 1340](https://tools.ietf.org/html/rfc1340 )으로 개정됨.
    * 알려진 포트 넘버 항목(Page 11)에 `80` 포트가 `World Wide Web HTTP`로 언급되었다.
    * 공식적으로 `80` 포트가 지정된 것.
    * 그러나 `443`은 아직 언급되지 않았다.
* 1994년 10월 : [RFC 1700](https://tools.ietf.org/html/rfc1700 )
    * Port Assignments를 보면(Page 33) `443` 포트가 `https  MCom`으로 언급되었다.
    * 그 밑의 주석을 보면 `# Kipp E.B. Hickman <kipp@mcom.com>`라고 나와 있다.
```
https           443/tcp    https  MCom
https           443/udp    https  MCom
#                          Kipp E.B. Hickman <kipp@mcom.com>
```
    * Kipp E.B. Hickman의 요청에 의해 `443` 포트가 추가된 것으로 보인다.
        * [Hickman의 홈페이지](http://home.mcom.com/people/kipp/ )를 보면 Mosaic Communications Corp의 일원이었음을 알 수 있다.

그렇다면 왜 `443` 일까?

* [www.rfc-editor.org/info/rfc1700](https://www.rfc-editor.org/info/rfc1700 )를 보면 `443`포트가 지정된 RFC [RFC 1700](https://tools.ietf.org/html/rfc1700 )은 [RFC 1340](https://www.rfc-editor.org/rfc/rfc1340.txt )을 개정한 것임을 알 수 있다.
* [RFC 1340](https://www.rfc-editor.org/rfc/rfc1340.txt )을 읽어보면 포트 번호가 `374`에서 바로 `512`로 건너뛴 것을 알 수 있다(Page 18).
    * 즉 `375` ~ `511`은 아예 언급이 없다.
```
   legent-2	   374/tcp    Legent Corporation		   [KXB]
   legent-2	   374/udp    Legent Corporation		   [KXB]
   exec		   512/tcp    remote process execution;
			      authentication performed using
			      passwords	and UNIX loppgin names
   biff		   512/udp    used by mail system to notify users
			      of new mail received; currently
			      receives messages	only from
			      processes	on the same machine
```
* 그리고 RFC 1700을 읽어보면 `375` ~ `450` 까지 모두 무언가가 지정됐는데, `451` ~ `511`은 `Unassigned`로 되어 있다(Page 33).
```
# 451-511    Unassigned
```
* `375` 부터 `450` 까지 요청받은 순서대로 지정된 것으로 추측할 수 있다. 요청대로 다 할당하고 남은 번호가 `451` ~ `511` 일듯 싶다.
    * [www.iana.org](https://www.iana.org/assignments/service-names-port-numbers/service-names-port-numbers.xhtml?search=451 )에서 찾아보면 2017년 12월 13일 현재는 `451`포트가 할당되었음을 알 수 있다. 다른 포트도 궁금하면 검색해 보면 된다.

## 결론 및 요약

* `80`
    * HTTP가 문서화되기 이전부터 보통 사용하지 않는 빈 포트 번호였다.
    * 1991년 HTTP 0.9 버전에서 처음으로 문서화되면서 기본 포트로 지정되었다.
* `443`
    * RFC 1700 이전까지는 빈 포트 번호였다.
    * Kipp E.B. Hickman의 요청으로 1994년 10월에 RFC 1700 문서에 `443`이 추가되었다.
    * `443`인 이유는 빈 칸에 순서대로 배정하다 보니 그렇게 된 것 같다.

## 부록

`nmap` 명령어를 사용하면 열려 있는 포트 번호를 쉽게 확인할 수 있다.

* google.com의 경우 기본값을 사용하고 있음을 알 수 있다.

```sh
$ nmap  www.google.com
Starting Nmap 7.70 ( https://nmap.org ) at 2018-09-09 11:12 KST
Nmap scan report for www.google.com (172.217.161.196)
Host is up (0.045s latency).
rDNS record for 172.217.161.196: kix07s03-in-f4.1e100.net
Not shown: 998 filtered ports
PORT    STATE SERVICE
80/tcp  open  http
443/tcp open  https
```

* gnu.org도 마찬가지

```sh
$ nmap www.gnu.org
Starting Nmap 7.70 ( https://nmap.org ) at 2018-09-09 11:16 KST
Nmap scan report for www.gnu.org (208.118.235.148)
Host is up (0.23s latency).
rDNS record for 208.118.235.148: wildebeest.gnu.org
Not shown: 998 filtered ports
PORT    STATE SERVICE
80/tcp  open  http
443/tcp open  https
```

* github.com의 경우 ssh와 git을 위한 포트가 추가로 열려 있다.

```sh
$ nmap www.github.com
Starting Nmap 7.70 ( https://nmap.org ) at 2018-09-09 11:16 KST
Nmap scan report for www.github.com (192.30.255.112)
Host is up (0.15s latency).
Other addresses for www.github.com (not scanned): 192.30.255.113
rDNS record for 192.30.255.112: lb-192-30-255-112-sea.github.com
Not shown: 996 filtered ports
PORT     STATE SERVICE
22/tcp   open  ssh
80/tcp   open  http
443/tcp  open  https
9418/tcp open  git
```

## Links

* [Why was 80 Chosen as the Default HTTP Port and 443 as the Default HTTPS Port?](https://www.howtogeek.com/233383/why-was-80-chosen-as-the-default-http-port-and-443-as-the-default-https-port/ )
* [Kipp E.B. Hickman 홈페이지](http://home.mcom.com/people/kipp/ )

* RFC : ASSIGNED NUMBERS
    * [RFC 1060](https://tools.ietf.org/html/rfc1060 ) - ASSIGNED NUMBERS
    * [RFC 1340](https://tools.ietf.org/html/rfc1340 ) - ASSIGNED NUMBERS : RFC 1060의 개정
    * [RFC 1700](https://tools.ietf.org/html/rfc1700 ) - ASSIGNED NUMBERS : RFC 1340의 개정
        * [RFC 1700(rfc editor)](https://www.rfc-editor.org/info/rfc1700 )
    * [RFC 3232](https://www.rfc-editor.org/rfc/rfc3232.txt ) - Assigned Numbers: RFC 1700 is Replaced by an On-line Database : RFC 1700의 개정
    * [https://www.iana.org/assignments/service-names-port-numbers/service-names-port-numbers.xhtml](https://www.iana.org/assignments/service-names-port-numbers/service-names-port-numbers.xhtml ) - RFC 3232 이후 포트 번호를 확인할 수 있는 곳
* HTTP
    * [HTTP 0.9 문서](https://www.w3.org/Protocols/HTTP/AsImplemented.html )
    * [RFC 2616](http://www.rfc-editor.org/rfc/rfc2616.txt ) : Hypertext Transfer Protocol -- HTTP/1.1
    * [RFC 7540](https://tools.ietf.org/html/rfc7540 ) : Hypertext Transfer Protocol Version 2 (HTTP/2)

