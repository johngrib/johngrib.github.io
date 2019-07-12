---
layout  : wiki
title   : OSI 7 계층 모형
summary : 네트워킹을 여러 계층에서 동작하는 별도의 기능으로 분할한 모델
date    : 2019-07-10 16:37:12 +0900
updated : 2019-07-12 21:44:14 +0900
tag     : network
toc     : true
public  : true
parent  : what
latex   : true
---
* TOC
{:toc}

# 개요

**네트워킹 전반의 동작을 설명하는 모델**

* 모든 네트워크 기술이 OSI 모델에 완벽히 들어맞는 것은 아니라는 점에 주의.
* 복잡한 인터네트워크를 부분으로 나누어 쉽게 이해하고 설계와 개발을 편하기 하기 위함.
* 계층 번호에 `L`을 붙여 말하기도 한다.
    * 예: 데이터 링크 계층을 L2라고 부름.

**주의: OSI 모델은 만능이 아니다.**

* 어떤 기술을 이해할 때 OSI 모델 때문에 더 복잡해진다면 OSI 모델을 이용하지 않는 편이 좋다.
* OSI 모델을 고려하지 않고 설계되는 프로토콜도 많다.
    * OSI 계층과 정확히 들어맞지 않는 프로토콜도 있다.
    * 여러 계층에 걸쳐 있는 프로토콜도 있다.
    * 여러 프로토콜 스택이 하나의 계층 안에 있을 수도 있다.
    * 진보적인 제품들이 바람직한 방향으로 OSI 계층의 관습을 깨는 경우가 있다.
* OSI 모델 외에도 네트워크 구조를 설명하는 다른 모델들도 있다.

# 계층 구조

| # | 이름                  |
|---|-----------------------|
| 7 | Application(응용)     |
| 6 | Presentation(표현)    |
| 5 | Session(세션)         |
| 4 | Transport(전송)       |
| 3 | Network(네트워크)     |
| 2 | Data Link(데이터링크) |
| 1 | Physical(물리)        |

* 각 N 계층은 N+1 계층에 서비스를 제공한다.
* 각 N 계층은 N-1 계층의 서비스를 이용한다.

| L1에서 L7으로 갈수록         | L7에서 L1로 갈수록         |
|------------------------------|----------------------------|
| 추상화 수준이 높다.          | 추상화 수준이 낮다.        |
| 소프트웨어를 더 많이 다룬다. | 하드웨어를 더 많이 다룬다. |

# OSI 모델에서의 프로토콜과 인터페이스

**프로토콜(protocol)**

* 동일 계층에서의 논리적/물리적 장비 간의 통신.
* N 계층과 다른 장비의 N 계층 간 통신.
    * 수평적 통신(horizontal communication)이라고도 한다.
* 프로토콜끼리 주고받는 메시지는 PDU(Protocol Data Unit)이라 부른다.
    * 각 PDU는 해당하는 프로토콜의 스펙을 구현한 포맷을 갖는다.
    * PDU가 N-1 계층으로 전달되면 N-1 프로토콜이 서비스를 제공해야 하는 데이터가 되므로, N-1 계층 SDU(Service Data Unit)이라고도 부른다.

**인터페이스(interface)**

* 동일 장비의 위아래 인접 계층 간에 이동하는 정보를 나타냄.
* 동일 장비의 N 계층과 N+1 계층, N 계층과 N-1 계층 간의 통신을 다룬다.
    * 예: 2/3 계층 인터페이스는 2계층과 3계층을 연결한다.

## 메시지 전달

다음 이미지의 프로토콜과 인터페이스 위치를 잘 살펴보자.

![layers](/post-img/osi-model/layers.jpg )  
이미지 출처: TCP/IP 완벽 가이드 5장. 그림 5-4.

* 가령 7계층 프로토콜을 사용하여 A 장비의 7계층에서 B장비의 7계층으로 메시지를 보낸다고 하자.
    * A의 7계층에서 B의 7계층으로 직접 보내는 것이 아니다.

실제 메시지는 다음과 같은 과정을 거쳐 전달된다.

$$
\underbrace{ \color{red}7 → 6 → 5 → 4 → 3 → 2 → 1 }_{A 장비}
→
\underbrace{ 1 → 2 → 3 → 4 → 5 → 6 → \color{red}7 }_{B 장비}
$$

* 이를 "**A 장비 7 계층 $$→$$ B 장비 7계층**"과 같이 생략해 추상적으로 표현하는 것이다.
* 어떤 메시지도 물리 계층(L1)을 통하지 않고서는 다른 장비로 전달할 수 없다.

만약 A 장비의 3계층에서 B 장비의 3계층으로 보낸다 해도 다음의 절차를 거친다.

$$
\underbrace{ \color{red}3 → 2 → 1 }_{A 장비}
→
\underbrace{ 1 → 2 → \color{red}3 }_{B 장비}
$$

### OSI 모델의 라우팅

만약 A 장비와 B 장비 사이에 라우터 장비가 있다면 다음과 같이 된다.

$$
\underbrace{ \color{red}7 → 6 → 5 → 4 → 3 → 2 → 1 }_{A 장비}
→
\underbrace{ 1 → 2 → 3 → 2 → 1 }_{중간 장비(라우터)}
→
\underbrace{ 1 → 2 → 3 → 4 → 5 → 6 → \color{red}7}_{B 장비}
$$


## PDU capsulation

다음 이미지는 PDU가 N-1 계층의 SDU 가 되는 것과, N-1 계층의 PDU로 캡슐화되는 것을 보여준다.

![pdu-capsulation](/post-img/osi-model/pdu-capsulation.jpg )  
이미지 출처: TCP/IP 완벽 가이드 5장. 그림 5-6.

* 계층을 타고 내려갈수록 각 계층 프로토콜의 헤더가 붙게 된다.

# 인용

* TCP/IP 완벽 가이드 5장. 일반 OSI 참조 모델 관련 이슈와 개념. 86쪽.

> 시험에 합격하기 위해 어려운 질문에 대해 간단한 답을 외우고자 하는 사람들은,
"이 하드웨어가 어떤 계층에서 동작합니까?" 라는 질문을 할 때가 있다.
여기서 문제는 답변이 아니라 질문이 너무 단순하다는 데 있다.
커넥터나 케이블 같은 단순한 물리 장비를 제외하면 거의 모든 네트워킹 장비는 여러 계층에서 동작한다.
예를 들어 라우터는 보통 3 계층과 연관돼 있지만 2계층과 1계층을 구현한 두 개 이상의 장비 인터페이스를 포함하고 있다.
그보다 더 좋은 질문은 "장비가 동작하는 가장 높은 계층은 무엇입니까?" 가 될 것이다.

# TCP/IP 모델과의 비교

<table>
  <thead>
    <tr>
      <th colspan="2">OSI 모델</th>
      <th colspan="2">TCP/IP 모델</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>7</td>
      <td>Application(응용)</td>
      <td rowspan="3">4</td>
      <td rowspan="3">Application(응용)</td>
    </tr>
    <tr>
      <td>6</td>
      <td>Presentation(표현)</td>
    </tr>
    <tr>
      <td>5</td>
      <td>Session(세션)</td>
    </tr>
    <tr>
      <td>4</td>
      <td>Transport(전송)</td>
      <td>3</td>
      <td>Host to Host Transport(호스트 간 전송)</td>
    </tr>
    <tr>
      <td>3</td>
      <td>Network(네트워크)</td>
      <td>2</td>
      <td>Internet(인터넷)</td>
    </tr>
    <tr>
      <td>2</td>
      <td>Data Link(데이터링크)</td>
      <td>1</td>
      <td>Network Interface(네트워크 인터페이스)</td>
    </tr>
    <tr>
      <td>1</td>
      <td>Physical(물리)</td>
      <td></td>
      <td>(하드웨어)</td>
    </tr>
  </tbody>
</table>

**TCP/IP 구조 모델은 4개 계층으로 이루어져 있다.**

* OSI 모델의 7개 계층들 중 6개와 대응된다.
    * TCP/IP 모델은 물리 계층을 설명하지 않는다.
* TCP/IP 구조의 핵심 계층은 **호스트 간 전송 계층**과 **인터넷 계층**이다.
    * 전송 계층에서 동작하는 핵심 프로토콜이 TCP, UDP.
    * 인터넷 계층에서 동작하는 핵심 프로토콜이 IP, 라우팅 프로토콜.

**왜 TCP/IP 모델을 OSI 모델로 설명하지 않는가?**

* TCP/IP 프로토콜 슈트(suite)가 OSI 모델보다 먼저 개발됐기 때문.

![tcpip](/post-img/osi-model/tcpip.jpg )  
이미지 출처: TCP/IP 완벽 가이드 8장. 그림 8-3.

# Links

* [OSI model(wikipedia)](https://en.wikipedia.org/wiki/OSI_model )
    * [한국어](https://ko.wikipedia.org/wiki/OSI_모형 )

# 참고문헌

* TCP/IP 완벽 가이드 / 찰스 M. 코지에록 저/강유, 김진혁, 민병호, 박선재 역 / 에이콘출판사 / 2007년 01월 25일 / 원제 : The TCP/IP Guide: A Comprehensive, Illustrated Internet Protocols Reference
