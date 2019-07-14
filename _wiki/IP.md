---
layout  : wiki
title   : IP
summary : Internet Protocol
date    : 2019-07-14 23:10:36 +0900
updated : 2019-07-14 23:59:33 +0900
tag     : network
toc     : true
public  : true
parent  : what
latex   : false
---
* TOC
{:toc}

# 개요

**IP는 [[osi-model]]의 3 계층 프로토콜에 해당된다.**

* 즉, IP는 TCP/IP 스택의 4계층인 TCP, UDP에 서비스를 제공한다.
* IP는 TCP, UDP가 포장한 데이터를 받아서 나름의 조작을 거친 다음 전송한다.

**IP의 특징과 기능**

* IP는 네트워크를 위한 주소지정 방법을 정의한다.
* IP는 데이터를 보내기는 하지만 데이터가 목적지에 도착하는 것은 보장하지 않는다.
    * 데이터를 받았을 때, 데이터를 보낸 장비에게 잘 받았다는 응답을 하지 않음.
    * 연결, 에러 검사, 전송 보장 같은 기능은 전송 계층(4계층; TCP, UDP)에서 담당한다.
* IP는 전송 계층 프로토콜(TCP, UDP)로부터 데이터를 받아 IP 데이터그램으로 캡슐화한다.
* IP는 비연결형 프로토콜이다.
    * 연결을 수립한 다음 데이터를 보내는 것이 아니라 데이터그램을 만들면 곧바로 전송한다.
* IP는 데이터그램을 조각으로 단편화하여 전송한다.
    * 전송받은 장비는 IP의 재조합 기능을 사용해 단편화된 데이터그램을 다시 합친다.
* 중간 장비(라우터)를 통해 데이터그램을 목적지로 보낸다.
    * 이를 위해 인터넷 제어 메시지 프로토콜(ICMP, Internet Control Message Protocol), TCP/IP 게이트웨이/라우팅 프로토콜, 경계 경로 프로토콜(BGP, Border Gateway Protocol) 등을 사용한다.

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
