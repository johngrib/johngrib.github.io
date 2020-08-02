---
layout  : wiki
title   : 트랜지스터
summary : 전자 신호 및 전력을 증폭하거나 스위칭하는 데 사용하는 반도체 소자
date    : 2019-03-17 18:08:43 +0900
updated : 2020-08-02 10:29:38 +0900
tag     : transistor bell-labs
toc     : true
public  : true
parent  : [[what]]
latex   : false
---
* TOC
{:toc}

## pnp/npn 트랜지스터

![transistors](/post-img/transistor/tran1.gif)

트랜지스터에는 3개의 다리가 있으며 각자 다음과 같은 이름을 갖고 있다.

- Base
- Emitter
- Collector

![amplifier](/post-img/transistor/tran2.gif)

- 트랜지스터의 두 가지 기능
    - 증폭: base가 일종의 수도꼭지 역할을 하여, Collector에서 Emitter로 흐르는 전류를 증폭시킨다.
    - 스위치: base의 전압으로 트랜지스터의 on/off를 조절할 수 있다.

{% raw %}
<iframe src="https://www.youtube.com/embed/7ukDKVHnac4?start=0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
{% endraw %}

- 다음은 [윌리엄 쇼클리의 특허 문서](https://patents.google.com/patent/US2569347A/en )에서 캡처한 것이다.

![npn](/post-img/transistor/patent-npn.png)

### 다이오드도 함께 보자

p-n 접합(p-n junction)으로 만든 다이오드의 구조를 보면 트랜지스터를 이해할 때 도움이 된다.

![npn](/post-img/transistor/pn-diode.png)

### 점접촉 트랜지스터와의 비교

다음은 윌리엄 쇼클리의 [Electrons And Holes In Semiconductors](https://archive.org/details/ElectronsAndHolesInSemiconductors/page/n51 ) 35 쪽의 일부를 캡처한 사진이다.

![symbol](/post-img/transistor/1950.png)

## npn 트랜지스터로 논리 게이트 만들기

- 논리 게이트는 트랜지스터를 스위치로 사용한다.

### and, nand

| and                                   | nand                                   |
| ![and](/post-img/transistor/and4.gif) | ![and](/post-img/transistor/nand4.gif) |

* and 게이트
    * 트랜지스터 둘을 직렬로 연결한다.
    * 두 base 입력 모두 high여야만 out 으로 high 출력이 나간다.
* nand 게이트
    * 트랜지스터 둘을 직렬로 연결한다.
    * out 이 and 게이트보다 위쪽에 있다는 점에 주목.
    * 두 base 입력이 모두 high 이면 out 으로 high 출력이 나가지 않는다.

### or, nor

| or                                  | nor                                   | nor(다른 방식)                        |
| ![or](/post-img/transistor/or4.gif) | ![nor](/post-img/transistor/nor5.gif) | ![nor](/post-img/transistor/nor4.gif) |



## 역사

- 1939-12-29: [윌리엄 쇼클리, 아이디어를 메모하다.](https://www.computerhistory.org/tdih/december/29/ )
- 1947-12-23: 벨 연구소의 쇼클리, 바딘, 브래튼. 점 접촉 트랜지스터(Point Contact Transistor) 완성.
    - [John R. Pierce, 트랜지스터라는 이름을 제안하다](https://www.pbs.org/transistor/album1/pierce/naming.html )
- 1948-01-23: 쇼클리. 접합 트랜지스터(Junction Transistor) 발명.
- 1948-05: 벨 전화 연구소 공식 기밀 기술로 지정되다.
- 1956-12-10: [반도체 연구와 트랜지스터 효과의 발견으로 1956년 노벨 물리학상 수상](https://www.nobelprize.org/prizes/physics/1956/summary/)
    - 윌리엄 브래드퍼드 쇼클리(William Bradford Shockley)
        - 실리콘 밸리의 탄생에 큰 영향을 준 인물.
        - ["Shockley is the man who brought silicon to Silicon Valley."](https://web.archive.org/web/20050404102748/http://www.stanford.edu/dept/news/pr/02/shockley1023.html)
    - 존 바딘 (John Bardeen)
        - 1956년 외에도 1972년에 초전도 현상 해명으로 노벨 물리학상을 또 받았다.
    - 월터 하우저 브래튼(Walter Houser Brattain)

### 1948년 초 - 트랜지스터의 이름을 정하다

벨 연구소 직원 및 임원, 고체 물리 연구팀 31명에게 투표 용지가 부여됐으며, 위원회가 선택지를 하나만 제공할 수 없었다는 설명이 있었다고 한다.

> "On the subject of a generic name to be applied to this class of devices, the committee is unable to make [a] unanimous recommendation."
[^GER-6]

투표 용지에 적혀 있었던 트랜지스터의 이름 후보는 다음과 같았다고 한다.

>
- __Semiconductor Triode
- __Surface States Triode
- __Crystal Triode
- __Solid Triode
- __Iotatron
- __Transistor
- ____(Other Suggestion)[^GER-6]

다음은 트랜지스터라는 이름의 적절성에 대한 존 거트너의 설명이다.

>
벨 연구소의 엔지니어들은 단어 끝에 '-이스터(-istor)'를 붙이길 좋아했다.
배리스터(varistor: 반도체 저항 소자)나 서미스터(thermistor: 온도에 따라 전기저항치가 달라지는 반도체 회로 소자)라는 이름의 소형 장치들은
이미 통신시스템의 전기회로망에 있어 필수불가결한 요소로 사용되고 있었다.
메모에는 '트랜지스터'라는 이름은 '상호 전도도(trans-conductance: 진공관의 증폭률을 양극 저항의 값으로 나눈 것)' 또는 '전송하다(transfer)'라는 단어와
'배리스터(varistor: 반도체 저항 소자)'라는 단어를 합친 것이라는 설명이 달려 있었다.
다른 이름들 역시 연구소 핵심 간부들이 좋아할 만한 것이었다.
[^GER-6]

### 1954년 11월

시무어 크레이가 공군의 ICBM 제어용 컴퓨터 설계에 진공관 대신 트랜지스터를 도입하였으나 채택은 되지 않았다고 한다.
공군이 채택한 것은 자기 스위치 기술을 선택한 409-3 이었다고 한다.[^MUR-3]

### 보청기 회사 라이선스 면제

트랜지스터 발명 후 한동안은, 트랜지스터를 보청기에 사용한 회사들은 라이선스 비용을 내지 않아도 됐었다고 한다.
청력을 잃은 채 경력 대부분을 보낸 AT&T 창립자 알렉산더 그레이엄 벨에 대한 경의의 표시였다고.[^GER-6]

## Links

- [Circuit element utilizing semiconductive material](https://patents.google.com/patent/US2569347A/en ) - 윌리엄 쇼클리의 접합 트랜지스터 특허 문서
- [1948: Conception of the Junction Transistor (computerhistory.org)](https://www.computerhistory.org/siliconengine/conception-of-the-junction-transistor/ )
- [The Nobel Prize in Physics 1956](https://www.nobelprize.org/prizes/physics/1956/summary/ )
- [트랜지스터의 발명(야밤의 공대생 만화)](https://www.facebook.com/engineertoon/photos/pcb.484328328420694/484328051754055/?type=3&theater) - 즐겁게 읽을 수 있는 과학 역사 만화.
- [Naming The Transistor](https://www.pbs.org/transistor/album1/pierce/naming.html )
- [Electrons And Holes In Semiconductors by William Shockley(1950)](https://archive.org/details/ElectronsAndHolesInSemiconductors/page/n51 )

## Image References

- <http://hyperphysics.phy-astr.gsu.edu/hbase/Solids/trans.html >
- <https://en.wikipedia.org/wiki/P%E2%80%93n_diode > : 다이오드 이미지

## 참고문헌

- [GER] 벨 연구소 이야기 / 존 거트너 저/정향 역 / 살림Biz / 2012년 05월 22일 / 원제 : The Idea Factory
- [LEE] 트랜지스터의 개념 주워담기 1 / 이용훈 저 / Ohm사(오므사) / 2016년 05월 16일
- [MUR] 슈퍼컴퓨터를 사랑한 슈퍼맨 / 찰스 J. 머리 저 / 이재범 역 / 지식함지 / 2015년 08월 11일 / 원제 : The Supermen: The Story of Seymour Cray and the Technical Wizards Behind the Supercomputer

## 주석

[^MUR-3]: [MUR] 3장.
[^GER-6]: [GER] 6장.

