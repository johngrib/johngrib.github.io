---
layout  : wiki
title   : packet
summary : 
date    : 2023-10-24 23:25:35 +0900
updated : 2023-10-24 23:42:15 +0900
tag     : 
resource: C1/6CC477-1849-4276-B494-D2E4040DCDBB
toc     : true
public  : true
parent  : [[/network]]
latex   : false
---
* TOC
{:toc}

## encapsulation

>
패킷이 전송 준비를 위해 프로토콜 스택을 따라 아래로(TCP나 UDP로부터 IP, 이더넷, 물리적 케이블 방향으로) 이동하면서
각각의 프로토콜은 자신의 헤더 정보를 추가한다.
각 프로토콜이 작업을 마친 패킷은 다음 프로토콜이 생성하는 패킷의 페이로드 부분이 된다.
이런 식으로 끼워 넣는 것을 캡슐화<sup>encapsulation</sup>라고 한다.
패킷을 수신하는 머신에서는 패킷이 프로토콜 스택을 위로 거슬러 올라가면서 역캡슐화<sup>reverse encapsulation</sup>가 이뤄진다.
>
예를 들어 이더넷을 통해 전송되는 UDP 패킷은 3 종류의 래퍼 또는 엔벨로프<sup>envelope</sup>를 포함한다.
이더넷 케이블상에는 발송지<sup>source</sup>와 다음 홉<sup>hop</sup> 목적지의 하드웨어 주소, 프레임의 길이, 프레임의 체크섬 CRC이 포함된 간단한 헤더로 프레임이 구성된다.
이더넷 프레임의 페이로드는 IP 패킷이며 IP 패킷의 페이로드는 UDP 패킷이고, UDP 패킷의 페이로드는 전송 데이터가 된다.
그림 B는 이와 같은 프레임의 구성 요소를 보여준다.
>
![]( /resource/C1/6CC477-1849-4276-B494-D2E4040DCDBB/b.jpg )
[^handbook-594]


## 참고문헌

- 유닉스·리눅스 시스템 관리 핸드북 5/e / 에비 네메스, 가스 스나이더, 트렌트 헤인, 벤 웨일리, 댄 맥킨 저 외 2명 / 에이콘출판사 / 발행: 2022년 01월 03일 / 원제: UNIX and Linux System Administration Handbook, 5th Edition

## 주석

[^handbook-594]: 유닉스·리눅스 시스템 관리 핸드북. 13장. 594쪽.

