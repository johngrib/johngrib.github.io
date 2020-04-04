---
layout  : wiki
title   : 책임 주도 설계
summary : Responsibility-Driven Design, RDD
date    : 2020-03-03 22:47:35 +0900
updated : 2020-03-03 22:57:07 +0900
tag     : 
toc     : true
public  : true
parent  : [[index]]
latex   : false
---
* TOC
{:toc}

* [Responsibility-Driven Design][wirfs]

## 인용: 오브젝트

> 지금까지 살펴본 내용의 요점은 협력을 설계하기 위해서는 책임에 초점을 맞춰야 한다는 것이다.
어떤 책임을 선택하느냐가 전체적인 설계의 방향과 흐름을 결정한다.
이처럼 책임을 찾고 책임을 수행할 적절한 객체를 찾아 책임을 할당하는 방식으로 협력을 설계하는 방법을 **책임 주도 설계**(Responsibility-Driven Design, RDD)라고 부른다.
[^objects-83]

책임 주도 설계 방법의 과정은 다음과 같다.

>
* 시스템이 사용자에게 제공해야 하는 기능인 시스템 책임을 파악한다.
* 시스템 책임을 더 작은 책임으로 분할한다.
* 분할된 책임을 수행할 수 있는 적절한 객체 또는 역할을 찾아 책임을 할당한다.
* 객체가 책임을 수행하는 도중 다른 객체의 도움이 필요한 경우 이를 책임질 적절한 객체 또는 역할을 찾는다.
* 해당 객체 또는 역할에게 책임을 할당함으로써 두 객체가 협력하게 한다.
[^objects-84]

## 참고문헌

* 오브젝트 / 조영호 저 / 위키북스 / 2쇄 2019년 07월 17일

## 주석

[wirfs]: http://www.wirfs-brock.com/Design.html

[^objects-83]: 오브젝트. 03장. 83쪽.
[^objects-84]: 오브젝트. 03장. 84쪽.
