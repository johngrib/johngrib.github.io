---
layout  : wiki
title   : 램슨의 법칙 (Lampson's Law)
summary : 추상화도 단순함도 올바른 선택을 대체할 수 없다
date    : 2023-04-16 00:05:20 +0900
updated : 2023-07-09 14:37:59 +0900
tag     : people.butler-lampson
resource: 0C/BF6B32-CA82-4389-9291-6FA52204F93C
toc     : true
public  : true
parent  : [[/jargon]]
latex   : false
---
* TOC
{:toc}

## 개요

>
Get it right. Neither abstraction nor simplicity is a substitute for getting it right.
>
올바르게 선택하라. 추상화도 단순함도 올바른 선택을 대체할 수 없다.

[[/clipping/butler-w-lampson/hints-for-computer-system-design]] 6쪽.

## From: 운영체제 아주 쉬운 세 가지 이야기

>
팁: 올바른 선택하기(Lampson's Law)
>
그 유명한 [[/clipping/butler-w-lampson/hints-for-computer-system-design]]{"Hints for Computer Systems Design"}에서 [[/people/butler-w-lampson]]{Lampson}이 말한바같이
"올바르게 선택하라. 추상화도 단순함도 올바른 선택을 대체할 수 없다."
올바른 선택을 해야만 한다.
올바른 선택은 다른 어떤 대안보다 나아야 한다.
프로세스 생성을 위한 API를 설계하는 방법은 많다.
그러나 fork()와 exec()의 조합은 단순하면서 매우 강력하다.
UNIX 설계자들은 단순하고 올바른 방법으로 구현하였다.[^why-fork]
Lampson은 매우 자주 올바른 선택을 했기 때문에 그를 기념하여 이 법칙에 그의 이름을 붙였다.
[^three-45]

## Links

- [[/people/butler-w-lampson]]
- [[/clipping/butler-w-lampson/hints-for-computer-system-design]]

## 참고문헌

- 운영체제 아주 쉬운 세 가지 이야기 [제2판] / Remzi H. Arpaci-Dusseau, Andrea C. Arpaci-dusseau 공저 / 원유집, 박민규, 이성진 공역 / 홍릉 / 제2판 발행: 2020년 09월 10일 / 원제: Operating Systems: Three Easy Pieces

## 주석

[^three-45]: 운영체제 아주 쉬운 세 가지 이야기. 5.4장. 45쪽.
[^why-fork]: 프로세스 생성 API, `fork()`, `exec()`, UNIX 이야기가 나오는 이유: 이 책에서 UNIX의 프로세스 생성에 대해 설명하고 있던 와중에, 램슨의 법칙을 팁으로 소개하기 때문이다.

