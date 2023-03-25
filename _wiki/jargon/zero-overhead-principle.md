---
layout  : wiki
title   : 제로 오버헤드 원리
summary : Zero-overhead principle
date    : 2023-03-25 16:43:02 +0900
updated : 2023-03-25 17:00:26 +0900
tag     : 
resource: 94/139567-8951-465E-9BFA-821B976EC114
toc     : true
public  : true
parent  : [[/jargon]]
latex   : false
---
* TOC
{:toc}

## 개요

C++의 저자인 비야네 스트롭스트룹이 제안한 원리로, D&E 라고 알려진 'Design and Evolution of C++' 책에서 소개되었다.

## From: The C++ Programming Language

비야네 스트롭스트룹은 C++의 개념과 설계 목적을 소개할 때 두 가지 원리에 주목해야 한다면서, 두 번째 원리로 제로 오버헤드 원리를 소개한다.[^first-principle]

>
**쓰지 않을 것에 낭비하지 말자.**
프로그래머가 직접 수작업으로 적절한 코드를 작성해서 언어 특성이나 기본 추상화를 흉내 내거나 심지어 약간이라도 나은 성능을 보일 수 있다면 누군가는 그렇게 할 것이고, 많은 사람이 그것을 흉내 낼 것이다.
그러므로 언어 특성과 기본 추상화는 동등한 대안에 비교할 때 하나의 바이트나 하나의 프로세서 사이클이라도 낭비하지 않게 설계돼야 한다.
이것은 제로 오버헤드<sup>zero-overhead</sup> 원리라고 알려져 있다.
[^cpp-31]

## From: cppreference.com

>
The zero-overhead principle is a C++ design principle that states:
>
> 1. You don't pay for what you don't use.
> 2. What you do use is just as efficient as what you could reasonably write by hand.
>
In general, this means that no feature should be added to C++ that would impose any overhead, whether in time or space, greater than a programmer would introduce without using the feature.
>
The only two features in the language that do not follow the zero-overhead principle are runtime type identification and exceptions, and are why most compilers include a switch to turn them off.

제로 오버헤드 원칙은 C++의 설계 원칙이며, 내용은 다음과 같습니다.

1. 사용하지 않는 것에 대해서는 비용을 지불하지 않는다.
2. 실제로 사용하는 것이 있다면, 수작업으로 코드를 작성한 것 만큼 효율적이어야 한다.

일반적으로 이 원칙은 어떤 기능을 프로그래머가 직접 코딩했을 때보다 더 많은 시간적 공간적인 오버헤드가 있는 기능은 C++ 언어에 추가해서는 안 된다는 의미입니다.

언어에서 제로 오버헤드 원칙을 따르지 않는 유일한 두 가지 기능은 '런타임 타입 식별'과 '예외'이며, 이로 인해 대부분의 컴파일러에는 이걸 끄는 스위치가 포함되어 있습니다.

## 참고문헌

- The C++ Programming Language 한국어판 [4판] / 비야네 스트롭스트룹 저 / 박지유 역 / 에이콘출판사 / 발행 2016년 1월 4일 / 원제: The C++ Programming Language Fourth Edition
- [Zero-overhead principle (cppreference.com)]( https://en.cppreference.com/w/cpp/language/Zero-overhead_principle )


## 주석

[^first-principle]: 첫 번째 원리는 "C++ 이하의 로우레벨 언어에 대한 필요성을 없앤다" 이다.
[^cpp-31]: The C++ Programming Language. 1장. 31쪽.

