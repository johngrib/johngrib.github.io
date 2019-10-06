---
layout  : wiki
title   : SOLID 원칙
summary : 객체지향 5대 원칙
date    : 2019-09-05 18:06:38 +0900
updated : 2019-10-06 11:03:05 +0900
tag     : oop
toc     : true
public  : true
parent  : proverb
latex   : false
---
* TOC
{:toc}

# 기원

* 엉클 밥은 다음과 같인 SOLID 원칙의 기원을 말한다.[^origin]

>
SOLID 원칙의 역사는 깊다. 나는 1980년대 후반 유즈넷(과거 버전의 페이스북)에서 다른 사람들과 소프트웨어 설계 원칙에 대해 토론하는 과정에서 이들 원칙을 모으기 시작했다. 시간이 지나면서 원칙은 교체되거나 변경되었다. 사라져 버린 원칙도 있다. 어떤 원칙들은 서로 합쳐졌다. 새롭게 추가된 원칙도 있다. 2000년대 초반 나는 안정화된 최종 버전을 내놓았는데, 이 때 원칙들의 순서는 지금과 달랐다.  
<br/>
2004년 무렵, 마이클 페더스(Michael Feathers)가 이메일 한 통을 보내왔는데, 원칙들을 재배열하면 각 원칙의 첫 번째 글자들로 SOLID라는 단어를 만들 수 있다는 내용이었다. 그렇게 SOLID 원칙이 탄생했다.

# SOLID

SOLID는 다섯 개의 원칙으로 이루어져 있다.

* SRP: Single Responsibility Principle. 단일 책임 원칙.
* OCP: Open-Closed Principle. 개방-폐쇄 원칙
* LSP: Liskov Substitution Principle. 리스코프 치환 원칙.
* ISP: Interface Segregation Principle. 인터페이스 분리 원칙.
* DIP: Dependency Inversion Principle. 의존성 역전 원칙.

## 단일 책임 원칙(SRP)

> 한 클래스는 단 한 가지의 변경 이유만을 가져야 한다.[^srp]

> 하나의 모듈은 하나의, 오직 하나의 액터에 대해서만 책임져야 한다.[^srp1]

단일 책임 원칙은 "응집도(cohesion)"와 관련이 있다.

> 단일 책임 원칙(SRP: Single-Responsibility Principle)은 톰 드마르코(Tom DeMarco)와 메이릴 페이지 존스(Meilir Page-Jones)의 연구에서 설명된 것으로,
그들은 이것을 **응집도(cohesion)**라 불렀다.[^srp]

특정 코드의 책임을 파악하기 어렵다면 다음 조언을 기억해 두자.

> SRP의 맥락에서, 우리는 책임(responsibility)을 '변경을 위한 이유'로 정의한다.
만약 여러분이 한 클래스를 변경하기 위한 한 가지 이상의 이유를 생각할 수 있다면,
그 클래스는 한 가지 이상의 책임을 맡고 있는 것이다.
때로 이것은 알아내기가 어려운데, 우리는 책임을 묶어서 생각하는 데 익숙해져 있기 때문이다.[^responsibility]

예를 들어 다음과 같은 경우는 단일 책임 원칙을 위반한 것이다.

```ascii-art
┌─────────────┐    ┌───────────────┐    ┌───────────┐
│Computational│    │   Rectangle   │    │ Graphical │
│  Geometry   ├───>├───────────────┤<───┤Application│
│ Application │    │+ draw()       │    └─────┬─────┘
└─────────────┘    │+ area():double│          │
                   └───────┬───────┘          │
                           ↓                  │
                        ┌─────┐               │
                        │ GUI │<──────────────┘
                        └─────┘
```

* Rectangle 클래스가 두 가지 책임을 갖고 있기 때문이다.
    * 책임1: 직사각형 모양의 수학적 모델 제공(`area()`)
    * 책임2: 직사각형을 그리는 것(`draw()`)

따라서, 이 경우 Rectangle을 2개의 다른 클래스로 분리하여 설계하는 것을 고려할 수 있다.

```ascii-art
 ┌─────────────┐     ┌───────────┐
 │Computational│     │ Graphical │──────┐
 │  Geometry   │     │Application│      │
 │ Application │     └─────┬─────┘      │
 └──────┬──────┘           │            │
        ↓                  ↓            │
┌───────────────┐    ┌───────────┐      ↓
│   Geometric   │    │ Rectangle │   ┌─────┐
│   Rectangle   │<───┼───────────┤──>│ GUI │
├───────────────┤    │+ draw()   │   └─────┘
│+ area():double│    └───────────┘
└───────────────┘
```


# 참고문헌

* 클린 아키텍처 / 로버트 C. 마틴 저/송준이 역 / 인사이트(insight) / 초판 1쇄 2019년 08월 20일 / 원제 : Clean Architecture: A Craftsman's Guide to Software Structure and Design
* 클린 소프트웨어 / 로버트 C. 마틴 저 / 이용원, 김정민, 정지호 공역 / 제이펍 / 초판 1쇄 2017년 05월 15일 / 원제 : Agile Software Development, Principles, Patterns, and Practices

# 주석

[^origin]: 클린 아키텍처 3부 설계 원칙, 63쪽.
[^srp]: 클린 소프트웨어. CHAPTER 8. 124쪽.
[^srp1]: 클린 아키텍처. 7장. 66쪽.
[^responsibility]: 클린 소프트웨어. CHAPTER 8. 126쪽.

