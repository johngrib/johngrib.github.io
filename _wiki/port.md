---
layout  : wiki
title   : 포트(port)
summary : 
date    : 2019-07-26 20:08:40 +0900
updated : 2019-07-26 20:58:45 +0900
tag     : network
toc     : true
public  : true
parent  : what
latex   : true
---
* TOC
{:toc}

# TCP/UDP와 포트 번호

* TCP/IP 호스트는 여러 개의 프로세스를 동시에 운영한다.
* 그리고 각각의 프로세스는 데이터그램을 보내고 받는다.
* 여러 곳에서 호스트로 날아오는 데이터그램은 모두 동일한 IP 주소를 갖고 있다.

그렇다면 IP 계층(3계층)은 전달받은 각각의 데이터그램을 어느 프로세스로 보내야 할지 어떻게 알 수 있을까?

다음은 IP 프로토콜 데이터그램의 헤더 포맷이다.[^ip-datagram]

```text
 0                   1                   2                   3
 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|Version|  IHL  |Type of Service|          Total Length         |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|         Identification        |Flags|      Fragment Offset    |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|  Time to Live |    Protocol   |         Header Checksum       |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                       Source Address                          |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                    Destination Address                        |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                    Options                    |    Padding    |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
```

* `Source Address`와 `Destination Address`를 확인할 수 있다.
* IP 프로토콜의 데이터그램이므로 이 두 주소는 IP 주소를 의미한다.

즉, IP 데이터그램만으로는 해당 IP주소를 가신 머신의 어느 프로세스로 돌려줘야 할 지 알 수 없다.

프로세스를 찾기 위한 정보는 TCP/UDP(4계층)의 데이터그램에 있다.

다음은 UDP 데이터그램의 헤더 포맷이다.[^udp-datagram]

```text
 0      7 8     15 16    23 24    31
+--------+--------+--------+--------+
|     Source      |   Destination   |
|      Port       |      Port       |
+--------+--------+--------+--------+
|                 |                 |
|     Length      |    Checksum     |
+--------+--------+--------+--------+
|
|          data octets ...
+---------------- ...
```

그리고 다음은 TCP 데이터그램의 헤더 포맷이다.[^tcp-datagram]

```text
 0                   1                   2                   3
 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|          Source Port          |       Destination Port        |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                        Sequence Number                        |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                    Acknowledgment Number                      |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|  Data |           |U|A|P|R|S|F|                               |
| Offset| Reserved  |R|C|S|S|Y|I|            Window             |
|       |           |G|K|H|T|N|N|                               |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|           Checksum            |         Urgent Pointer        |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                    Options                    |    Padding    |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                             data                              |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
```

두 프로토콜의 헤더에서 공통적으로 `Source Port`와 `Destination Port`를 확인할 수 있다.

* 4계층 메시지(TCP/UDP) 헤더에 "**출발지 포트**"와 "**목적지 포트**"가 있다.
* 포트 번호는 데이터그램을 목적지 장비의 적절한 프로세스로 전달하기 위한 일종의 서브 주소이다.

# 포트 번호의 범위

위의 TCP/UDP 데이터그램 포맷을 보면 포트 번호의 크기가 16비트라는 것을 알 수 있다.

즉 포트 번호의 범위는 0 ~ 65,535 이다.

$$2^{16} = 65,536$$이기 때문이다.

# 특수 목적의 포트 번호

| 범위 이름                      | 범위          | 설명                                                                                                                                 |
|--------------------------------|---------------|--------------------------------------------------------------------------------------------------------------------------------------|
| Well-Known (Privileged)        | 0 ~ 1023      | IANA가 관리. 표준을 위한 포트 번호 범위. 범용적인 TCP/IP 애플리케이션을 위해 예약된 번호들이다.                                      |
| Registered (User) Port Numbers | 1024 ~ 49151  | 새로운 (비표준)애플리케이션을 위해 요청할 수 있는 포트 넘버들. 요청이 승인되면 IANA는 해당 포트 넘버를 해당 애플리케이션에 할당한다. |
| Private/Dynamic Port Numbers   | 49152 ~ 65535 | 누구나 등록 없이 사용할 수 있다.                                                                                                     |

한편 잘 알려진 포트 넘버 목록을 알고 싶다면 다음 문서를 보면 된다.

* [Service Name and Transport Protocol Port Number Registry](https://www.iana.org/assignments/service-names-port-numbers/service-names-port-numbers.xhtml ) - xhtml
* [Service Name and Transport Protocol Port Number Registry](https://www.iana.org/assignments/service-names-port-numbers/service-names-port-numbers.txt ) - txt

# 참고문헌

* TCP/IP 완벽 가이드 / 찰스 M. 코지에록 저/강유, 김진혁, 민병호, 박선재 역 / 에이콘출판사 / 2007년 01월 25일 / 원제 : The TCP/IP Guide: A Comprehensive, Illustrated Internet Protocols Reference

# 주석

[^udp-datagram]: https://tools.ietf.org/html/rfc768 RFC 768. 1쪽
[^tcp-datagram]: https://tools.ietf.org/html/rfc793 RFC 793. 3.1. Header Format. 15쪽
[^ip-datagram]: https://tools.ietf.org/html/rfc791 RFC 791. 3.1. Internet Header Format. 11쪽.
