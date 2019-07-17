---
layout  : wiki
title   : IP
summary : Internet Protocol
date    : 2019-07-14 23:10:36 +0900
updated : 2019-07-17 15:57:24 +0900
tag     : network
toc     : true
public  : true
parent  : what
latex   : true
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

# IP Address

**IP 주소는 인터네트워크에서의 네트워크 계층(3계층) 데이터 전달에 쓰인다.**

* 각각의 네트워크 인터페이스는 하나의 IP 주소를 필요로 한다.
* 즉, 어떤 장비가 인터네트워크에 여러 인터페이스로 연결되어 있다면 그 장비는 여러 개의 IP 주소를 갖는다.

**IP 주소(IPv4)는 32비트 이진수.**

* IPv6의 IP 주소는 127비트 이진수.
* 참고: MAC 주소는 48비트 이진수.

## 32비트 이진수인 IPv4 주소를 점으로 구분된 십진 형식으로 변환하는 방법

이진수 주소로는 사람이 알아보기 어려우므로 IP 주소는 주로 `.`으로 구분된 4개의 십진수로 변환하여 사용하곤 한다.

방법은 쉽다. 8자리씩 쪼갠 다음 각자 십진수로 변환하고 `.`으로 이어주면 된다.

만약 어떤 IP 주소가 `1010 1100 1101 1001 0001 1111 1010 1110` 이라 하자. (편의를 위해 4 자리마다 스페이스를 넣었다.)

이를 8 자리씩 쪼개고 각자 십진수로 변환하면 다음과 같다.

$$
\underbrace{ 1010 \ 1100 }_{172} \
\underbrace{ 1101 \ 1001 }_{217} \
\underbrace{ 0001 \ 1111 }_{31} \
\underbrace{ 1010 \ 1110 }_{174} \
$$

이제 각 십진수 사이에 `.`을 넣고 하나로 합치면 `172.217.31.174`가 된다.

* 이 표기법을 Dotted Decimal Notation이라 한다.
    * IP 주소 부점 10진 표기법이라고도 한다.
    * 보통 IP 주소라 하면 이 형식을 떠올린다.


참고: MAC 주소의 경우

* Mac 주소는 48비트.
* IP 주소와는 달리 십진수가 아니라 십육진수로 표현한다.
    * 그리고 `.`이 아니라 `:`나 `-`로 이어붙인다.

## Network ID와 Host ID

* 네트워크 ID: IP 주소 32비트 중 왼쪽 비트들
* 호스트 ID: IP 주소 32비트 중 오른쪽 비트들

그렇다면 네트워크 ID와 호스트 ID의 경계는 어디인가?

그때그때 다르다.

만약 `127.0.0.1`의 네트워크 ID가 왼쪽 8개 비트라고 하자.

따라서 다음과 같이 생각할 수 있다.

$$
\underbrace{ 0111 \ 1111 }_{네트워크 ID \\ 127 } \
\underbrace{ 0000 \ 0000 \ 0000 \ 0000 \ 0000 \ 0001 }_{호스트 ID \\ 0.0.1 }
$$

그러므로 네트워크 주소는 다음과 같이 된다.

* $$\color{blue}{0111 \ 1111} \ 0000 \ 0000 \ 0000 \ 0000 \ 0000 \ 0000$$.
* `127.0.0.0`

호스트 주소는 다음과 같다.

* $$0000 \ 0000 \ \color{blue}{0000 \ 0000 \ 0000 \ 0000 \ 0000 \ 0001}$$.
* `0.0.0.1`

그런데 모든 네트워크 ID가 이렇게 8개 비트 단위로 깔끔하게 나뉘는 것은 아니다.

예를 들어 `227.82.157.177`의 왼쪽 20비트가 네트워크 ID라 생각해 보자.

$$
\underbrace{1110 \ 0011 \ 0101 \ 0010 \ \color{red}{1001}}_{네트워크 ID \\ 227.82.144 } \
\underbrace{ \color{red}{1101} \ 1011 \ 0001 }_{호스트 ID \\ 13.177 }
$$

`157`을 의미하는 `1001 1101`이 양쪽으로 찢어지게 된다.

따라서 네트워크 주소는 다음과 같이 된다.

* $$\color{blue}{1110 \ 0011 \ 0101 \ 0010} \ \color{red}{1001} \ 0000 \ 0000 \ 0000$$.
* `227.82.144.0`

그리고 호스트 주소는 다음과 같다.

* $$0000 \ 0000 \ 0000 \ 0000 \ 0000 \ \color{red}{1101} \ \color{blue}{1011 \ 0001}$$.
* `0.0.13.177`

### 그렇다면 네트워크 ID가 몇 비트인지 어떻게 아는가?

크게 세 가지 방법이 있다.

* 클래스 단위 주소 지정(Classful)
* 서브넷 사용(Subnetted)
* 클래스 비사용 주소 지정(Classless)

이들 중 클래스 비사용 주소 지정은 주소 뒤에 `/숫자`형식의 값을 추가로 제공한다.

예를 들어

* `127.0.0.0/8`은 왼쪽의 8개 비트가 네트워크 ID.
* `192.168.0.0/16`은 왼쪽의 16개 비트가 네트워크 ID.

## 주소공간

IP 주소의 최소값은 `0.0.0.0` 이고, 최대값은 `255.255.255.255`이다.

* 이론적으로는 $$2^{32} = 4,294,967,296$$개의 주소가 존재할 수 있다.
* 주소 공간이 42억 개가 넘어가니 꽤 큰 편인데도, 예약된 주소 공간이 많아서 모든 주소를 사용할 수 없다.
    * 예: `127`로 시작하는 주소($$2^{24} = 16,777,216$$개)는 loopback 주소로 예약되어 있음.

다음은 [RFC 3330](https://tools.ietf.org/html/rfc3330 )(Special-Use IPv4 Addresses)을 참고하여 인용한 것이다.

| Address Block    | Present Use                                   | Reference                                                   |
|------------------|-----------------------------------------------|-------------------------------------------------------------|
| 0.0.0.0/8        | "This" Network                                | [[RFC1700](https://tools.ietf.org/html/rfc1700 ), page 4]   |
| 10.0.0.0/8       | Private-Use Networks                          | [[RFC1918](https://tools.ietf.org/html/rfc1918 )]           |
| 14.0.0.0/8       | Public-Data Networks                          | [[RFC1700](https://tools.ietf.org/html/rfc1700 ), page 181] |
| 24.0.0.0/8       | Cable Television Networks                     | --                                                          |
| 39.0.0.0/8       | Reserved but subject  to allocation           | [[RFC1797](https://tools.ietf.org/html/rfc1797 )]           |
| 127.0.0.0/8      | Loopback                                      | [[RFC1700](https://tools.ietf.org/html/rfc1700 ), page 5]   |
| 128.0.0.0/16     | Reserved but subject to allocation            | --                                                          |
| 169.254.0.0/16   | Link Local                                    | --                                                          |
| 172.16.0.0/12    | Private-Use Networks                          | [[RFC1918](https://tools.ietf.org/html/rfc1918 )]           |
| 191.255.0.0/16   | Reserved but subject to allocation            | --                                                          |
| 192.0.0.0/24     | Reserved but subject to allocation            | --                                                          |
| 192.0.2.0/24     | Test-Net                                      |                                                             |
| 192.88.99.0/24   | 6to4 Relay Anycast                            | [[RFC3068](https://tools.ietf.org/html/rfc3068 )]           |
| 192.168.0.0/16   | Private-Use Networks                          | [[RFC1918](https://tools.ietf.org/html/rfc1918 )]           |
| 198.18.0.0/15    | Network Interconnect Device Benchmark Testing | [[RFC2544](https://tools.ietf.org/html/rfc2544 )]           |
| 223.255.255.0/24 | Reserved but subject to allocation            | --                                                          |
| 224.0.0.0/4      | Multicast                                     | [[RFC3171](https://tools.ietf.org/html/rfc3171 )]           |
| 240.0.0.0/4      | Reserved for Future Use                       | [[RFC1700](https://tools.ietf.org/html/rfc1700 ), page 4]   |

## IP 주소의 중복 방지는 어떻게?

* 주소가 중복으로 할당되지 않도록 통제하는 중앙 관리 기관이 필요하다.
    * 중앙 기관에서 각 집단에 주소를 블록(범위)으로 나누어 주는 방식.

IP 주소 할당 중앙 기관

다음은 TCP/IP 완벽 가이드 16장에서 인용한 것이다.

> 인터넷도 거대한 IP 인터네트워크이기 때문에 전 세계적으로 수백만 개가 넘는 기관을 위해 이러한 조정 작업을 하는 기관이 필요하다.
인터넷의 IP 주소 할당 관리 작업은 원래 인터넷 할당 번호 관리기관(IANA, Internet Assigned Number Authority)에서 담당했다.
IANA는 IP 주소 할당과 기타 중요 조정 작업(TCP/IP 프로토콜의 인자를 관리하는 등)을 수행했다.
1990년대 후반에 인터넷 이름/번호 할당 기관(ICANN, Internet Corporation for Assigned Names and Numbers)이라는 새로운 기관이 탄생했다.
이제 ICANN은 IANA의 주소 할당 임무를 감독하며 DNS 네임 등록과 같은 다른 업무도 관리한다.  
IP 주소는 원래 기관에 직접 할당됐다.
초기 IP 주소지정 방법은 클래스를 이용했기 때문에 IANA는 클래스 A, B, C 블록의 주소를 할당했다.
하지만 오늘날의 주소지정은 CIDR의 계층적 주소 지정 방식을 사용하는 클래스 비사용 방법이다.
그래서 IANA는 주소를 직접 할당하지 않고 대륙별 인터넷 레지스트리(RIR, Regional Internet registries)에게 그 임무를 위임한다.
그러한 RIR에는 APNIC, ARIN, LACNIC, RIPE NCC가 있다.
각 RIR은 주소 블록을 하위 수준 레지스트리인 국가 인터넷 레지스트리(NIR, National Internet registries)와 로컬 인터넷 레지스트리(LIR, local Internet Registries)에게 다시 위임한다.  
결국 ISP는 주소 블록을 할당받고 최종 사용자인 기관에게 그 주소를 분배한다.
ISP의 고객 중 일부는 최종 사용 기관이지만 일부는 (더 작은) ISP이기도 하다.
이러한 ISP는 자신이 할당받은 주소를 사용하거나 다른 기관에 위임한다.
이것은 계층적으로 여러 단계에 걸쳐 일어날 수 있다.
이 방법은 IP 주소가 가장 효율적인 방법으로 할당되고 쓰이는 것을 보장한다.

# 의문점들

**왜 IPv1은 없고 IPv4가 IP의 첫 버전인가?**

* TCP 4 버전에서 TCP와 IP가 분리되었기 때문.

**왜 IPv5는 없고 IPv6가 IPv4의 다음 버전인가?**

* [RFC 1190](https://tools.ietf.org/html/rfc1190 ): Experimental Internet Stream Protocol, Version 2 (ST-II)
    * 인터넷 스트림 프로토콜 버전 2가 IPv5이다.

**3계층 미만에서 작동하는 장비들도 IP를 사용하는가?**

* TCP/IP 완벽 가이드 16장에서는 다음과 같이 설명한다.

> 리피터(repeater), 브리지(bridge), 스위치(switch) 같은 하위 수준 네트워크 연결 장비는 2계층(데이터 링크) 주소에 근거하여 트래픽을 통과시키기 때문에 IP 주소가 없어도 된다.
브리지와 스위치로 연결된 네트워크 세그먼트는 단일 브로드캐스트 도메인을 구성하기 때문에 거기에 속한 어떤 장비도 다른 장비와 라우팅 없이도 직접 데이터를 주고 받을 수 있다.
IP에게 있어 브리지와 스위치는 본질적으로 없는 것, 즉 장비를 연결하는 케이블과 다를 바가 없다(몇 가지 예외는 있다).
하지만 그러한 장비도 관리 목적을 위해 선택적으로 IP 주소가 할당될 수 있다.
그 경우 브리지와 스위치는 네트워크에서 일반 호스트와 유사하게 동작한다.

# 참고문헌

* TCP/IP 완벽 가이드 / 찰스 M. 코지에록 저/강유, 김진혁, 민병호, 박선재 역 / 에이콘출판사 / 2007년 01월 25일 / 원제 : The TCP/IP Guide: A Comprehensive, Illustrated Internet Protocols Reference

# Links

* <https://en.wikipedia.org/wiki/Dot-decimal_notation >
