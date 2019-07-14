---
layout  : wiki
title   : IP
summary : Internet Protocol
date    : 2019-07-14 23:10:36 +0900
updated : 2019-07-14 23:47:00 +0900
tag     : network
toc     : true
public  : true
parent  : what
latex   : false
---
* TOC
{:toc}

# 역사

TCP/IP 완벽 가이드 15장에서 IP의 역사에 대해 다음과 같이 소개한다.

> IP의 개발 과정에서 주목할만한 사실은 IP의 기능이 원래 TCP에 속해 있었다는 것이다.
공식 프로토콜로서 IP는 근대 인터넷의 전임자로 1970년대에 개발된 초창기 TCP가 4계층 TCP와 3계층 IP로 분리되면서 탄생했다.
IP의 개발과정에서 획기적인 사건은 1981년 9월에 [RFC 791](https://tools.ietf.org/html/rfc791 ) "인터넷 프로토콜" 문서가 발표된 것이었다.
그 전 해에 나왔던 [RFC 760](https://tools.ietf.org/html/rfc760 )을 개선한 이 표준은 지난 20년간 널리 쓰였던 IP 버전의 핵심 기능과 특성을 정의했다.

# 버전에 대한 의문들

**왜 IPv1은 없고 IPv4가 IP의 첫 버전인가?**

* TCP 4 버전에서 TCP와 IP가 분리되었기 때문.

**왜 IPv5는 없고 IPv6가 IPv4의 다음 버전인가?**

* [RFC 1190](https://tools.ietf.org/html/rfc1190 ): Experimental Internet Stream Protocol, Version 2 (ST-II)
    * 인터넷 스트림 프로토콜 버전 2가 IPv5이다.

# 참고문헌

* TCP/IP 완벽 가이드 / 찰스 M. 코지에록 저/강유, 김진혁, 민병호, 박선재 역 / 에이콘출판사 / 2007년 01월 25일 / 원제 : The TCP/IP Guide: A Comprehensive, Illustrated Internet Protocols Reference
