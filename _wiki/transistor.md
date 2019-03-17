---
layout  : wiki
title   : 트랜지스터
summary : 전자 신호 및 전력을 증폭하거나 스위칭하는 데 사용하는 반도체 소자
date    : 2019-03-17 18:08:43 +0900
updated : 2019-03-17 23:45:48 +0900
tags    : 
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
- 1947-12-23: 벨 연구소의 쇼클리, 바딘, 브래튼. 세계 최초 트랜지스터 완성.
    - [John R. Pierce, 트랜지스터라는 이름을 제안하다](https://www.pbs.org/transistor/album1/pierce/naming.html )
- 1956-12-10: [반도체 연구와 트랜지스터 효과의 발견으로 1956년 노벨 물리학상 수상](https://www.nobelprize.org/prizes/physics/1956/summary/)
    - 윌리엄 브래드퍼드 쇼클리(William Bradford Shockley)
        - 실리콘 밸리의 탄생에 큰 영향을 준 인물.
        - ["Shockley is the man who brought silicon to Silicon Valley."](https://web.archive.org/web/20050404102748/http://www.stanford.edu/dept/news/pr/02/shockley1023.html)
    - 존 바딘 (John Bardeen)
        - 1956년 외에도 1972년에 초전도 현상 해명으로 노벨 물리학상을 또 받았다.
    - 월터 하우저 브래튼(Walter Houser Brattain)

# Links

- [Circuit element utilizing semiconductive material](https://patents.google.com/patent/US2569347A/en ) - 윌리엄 쇼클리의 접합 트랜지스터 특허 문서
- [1948: Conception of the Junction Transistor (computerhistory.org)](https://www.computerhistory.org/siliconengine/conception-of-the-junction-transistor/ )
- [The Nobel Prize in Physics 1956](https://www.nobelprize.org/prizes/physics/1956/summary/ )
- [트랜지스터의 발명(야밤의 공대생 만화)](https://www.facebook.com/engineertoon/photos/pcb.484328328420694/484328051754055/?type=3&theater) - 즐겁게 읽을 수 있는 과학 역사 만화.
- [Naming The Transistor](https://www.pbs.org/transistor/album1/pierce/naming.html )

# Image References

- <http://hyperphysics.phy-astr.gsu.edu/hbase/Solids/trans.html >

