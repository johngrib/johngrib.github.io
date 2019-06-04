---
layout  : wiki
title   : 트랜지스터
summary : 전자 신호 및 전력을 증폭하거나 스위칭하는 데 사용하는 반도체 소자
date    : 2019-03-17 18:08:43 +0900
updated : 2019-06-04 21:19:44 +0900
tag     : 
toc     : true
public  : true
parent  : what
latex   : false
---
* TOC
{:toc}

# pnp/npn 트랜지스터

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

## 다이오드도 함께 보자

p-n 접합(p-n junction)으로 만든 다이오드의 구조를 보면 트랜지스터를 이해할 때 도움이 된다.

![npn](/post-img/transistor/pn-diode.png)

## 점접촉 트랜지스터와의 비교

다음은 윌리엄 쇼클리의 [Electrons And Holes In Semiconductors](https://archive.org/details/ElectronsAndHolesInSemiconductors/page/n51 ) 35 쪽의 일부를 캡처한 사진이다.

![symbol](/post-img/transistor/1950.png)

# npn 트랜지스터로 논리 게이트 만들기

- 논리 게이트는 트랜지스터를 스위치로 사용한다.

## and, nand

| and                                   | nand                                   |
| ![and](/post-img/transistor/and4.gif) | ![and](/post-img/transistor/nand4.gif) |

* and 게이트
    * 트랜지스터 둘을 직렬로 연결한다.
    * 두 base 입력 모두 high여야만 out 으로 high 출력이 나간다.
* nand 게이트
    * 트랜지스터 둘을 직렬로 연결한다.
    * out 이 and 게이트보다 위쪽에 있다는 점에 주목.
    * 두 base 입력이 모두 high 이면 out 으로 high 출력이 나가지 않는다.

## or, nor

| or                                  | nor                                   | nor(다른 방식)                        |
| ![or](/post-img/transistor/or4.gif) | ![nor](/post-img/transistor/nor5.gif) | ![nor](/post-img/transistor/nor4.gif) |



# 역사

- 1939-12-29: [윌리엄 쇼클리, 아이디어를 메모하다.](https://www.computerhistory.org/tdih/december/29/ )
- 1947-12-23: 벨 연구소의 쇼클리, 바딘, 브래튼. 점 접촉 트랜지스터(Point Contact Transistor) 완성.
    - [John R. Pierce, 트랜지스터라는 이름을 제안하다](https://www.pbs.org/transistor/album1/pierce/naming.html )
- 1948-01-23: 쇼클리. 접합 트랜지스터(Junction Transistor) 발명.
- 1956-12-10: [반도체 연구와 트랜지스터 효과의 발견으로 1956년 노벨 물리학상 수상](https://www.nobelprize.org/prizes/physics/1956/summary/)
    - 윌리엄 브래드퍼드 쇼클리(William Bradford Shockley)
        - 실리콘 밸리의 탄생에 큰 영향을 준 인물.
        - ["Shockley is the man who brought silicon to Silicon Valley."](https://web.archive.org/web/20050404102748/http://www.stanford.edu/dept/news/pr/02/shockley1023.html)
    - 존 바딘 (John Bardeen)
        - 1956년 외에도 1972년에 초전도 현상 해명으로 노벨 물리학상을 또 받았다.
    - 월터 하우저 브래튼(Walter Houser Brattain)

## 1954년 11월

* 시무어 크레이가 공군의 IBCM 제어용 컴퓨터 설계에 트랜지스터를 도입하였으나 채택은 되지 않았다.

>
더 정확한 궤적을 얻기 위해서 공군은 ICBM의 유도 시스템을 원격에서 제어하는 컴퓨터를 개발하고 싶어 했다.
유니백은 이 프로젝트의 입찰에 참여하기는 했지만 그런 컴퓨터를 어떻게 만들어야 할지를 잘 몰랐다.
문제는 신뢰성이었다.
공군은 쉽게 고장 나는 진공관의 성능에 ICBM의 운명을 맡기는 일은 어떻게든 피하고 싶어 했다.
<br><br> (중략) <br><br>
시제품들이 거의 완성되자 크레이는 글라이더 공장의 지하실에 회의를 소집했다.
ICBM 설계에 적용할 더 나은 기술을 선택하기 위해서였다.
한 엔지니어가 칠판에 각 기술의 장점과 단점들을 쭉 써 내려갔다.
분명히 둘 다 진공관보다는 장점을 가지고 있었다.
그들은 크기, 무게, 속도, 신뢰성에서 월등했다.
자기 스위치는 더 균일한 성능을 제공했고 더 이해하기가 쉬웠다.
그래서 순수하게 논리적인 관점에서 보면 자기 스위치가 우승자로 보였다.
그러나 그 회의에 참석한 엔지니어들은 프로젝트를 위해서 몇 달을 보낸 상태였고 대부분 트랜지스터에 대해서 느끼는 육감이 있었다.
트랜지스터 기술은 이제 겨우 걸음마 단계였고 극적인 성능향상을 가질 운명이었다.
그것을 이사회 앞에서 증명할 수는 없었지만, 이 그룹의 소속원들은 논리적 장점과 단점을 적은 후에 본능을 따랐다.
중지가 모아졌고 그들은 트랜지스터에 미래를 걸었다.
방 뒤에 조용히 앉아 있던 시모어 크레이는 고개를 끄덕이며 동의했다.
논리를 초월한 엔지니어링 전문가 세계에선 경험에서 우러나온 본능이 이기는 법이었다.
글라이더 공장의 지하실에 모인 엔지니어들에게 이 결정은 그저 작은 사건이었다.
엔지니어들이 항상 해야 하는 작은 일상적 선택 중 하나였을 뿐이었다.
그들은 그 결정이 회사, 업계, 혹은 전반적인 컴퓨터 설계에 어떤 영향을 미칠지 알지 못했다.

>
필라델피아에서는 J. 프레스퍼 에커트와 그의 동료들이 같은 결정을 내려야 하는 상황에 있었고 그들은 자기 스위치 기술을 선택했다.
409-3이라고 알려진 그들의 설계가 결국 공군의 컴퓨터에 채택되었다.

* 슈퍼컴퓨터를 사랑한 슈퍼맨 3장에서 인용.




# Links

- [Circuit element utilizing semiconductive material](https://patents.google.com/patent/US2569347A/en ) - 윌리엄 쇼클리의 접합 트랜지스터 특허 문서
- [1948: Conception of the Junction Transistor (computerhistory.org)](https://www.computerhistory.org/siliconengine/conception-of-the-junction-transistor/ )
- [The Nobel Prize in Physics 1956](https://www.nobelprize.org/prizes/physics/1956/summary/ )
- [트랜지스터의 발명(야밤의 공대생 만화)](https://www.facebook.com/engineertoon/photos/pcb.484328328420694/484328051754055/?type=3&theater) - 즐겁게 읽을 수 있는 과학 역사 만화.
- [Naming The Transistor](https://www.pbs.org/transistor/album1/pierce/naming.html )
- [Electrons And Holes In Semiconductors by William Shockley(1950)](https://archive.org/details/ElectronsAndHolesInSemiconductors/page/n51 )

# Image References

- <http://hyperphysics.phy-astr.gsu.edu/hbase/Solids/trans.html >
- <https://en.wikipedia.org/wiki/P%E2%80%93n_diode > : 다이오드 이미지

# 참고문헌

* 슈퍼컴퓨터를 사랑한 슈퍼맨 / 찰스 J. 머리 저 / 이재범 역 / 지식함지 / 2015년 08월 11일 / 원제 : The Supermen: The Story of Seymour Cray and the Technical Wizards Behind the Supercomputer
* 트랜지스터의 개념 주워담기 1 / 이용훈 저 / Ohm사(오므사) / 2016년 05월 16일

