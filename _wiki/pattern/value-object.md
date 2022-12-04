---
layout  : wiki
title   : 값 객체 (Value Object)
summary : 
date    : 2021-10-15 20:24:30 +0900
updated : 2021-10-15 20:50:51 +0900
tag     : ddd
resource: A1/7C8104-2B95-4DC9-AA67-A3FCFD34A06D
toc     : true
public  : true
parent  : [[/pattern]]
latex   : false
---
* TOC
{:toc}

## From: 도메인 주도 설계

>
개념적 식별성을 갖지 않으면서 도메인의 서술적 측면을 나타내는 객체를 VALUE OBJECT라 한다.[^entity-comment]
VALUE OBJECT는 설계 요소를 표현할 목적으로 인스턴스화되는데,
우리는 이러한 설계 요소가 **어느 것인지에** 대해서는 관심이 없고 오직 해당 요소가 무엇인지에 대해서만 관심이 있다.
[^ddd-100]

<span/>

>
모델에 포함된 어떤 요소의 속성에만 관심이 있다면 그것을 VALUE OBJECT로 분류하라.
VALUE OBJECT에서 해당 VALUE OBJECT가 전하는 속성의 의미를 표현하게 하고 관련 기능을 부여하라.
또한 VALUE OBJECT는 불변적(immutable)으로 다뤄라.
VALUE OBJECT에는 아무런 식별성도 부여하지 말고 [[/pattern/entity]]{ENTITY}를 유지하는 데 필요한 설계상의 복잡성을 피하라.
>
VALUE OBJECT를 구성하는 속성은 개념적 완전성(conceptual whole)[^conceptual-whole]을 형성해야 한다.
이를테면, 도, 시군구, 읍면동, 우편번호와 같은 속성은 한 Personal 객체에서 개별 속성이 되어서는 안 된다.
그러한 속성은 하나의 완전한 주소를 구성함으로써 더 단순한 Person과 더 응집력 있는 VALUE OBJECT를 만들어낸다.
[^ddd-101]


## 참고문헌

- 도메인 주도 설계 / 에릭 에반스 저 / 이대엽 역 / 위키북스 / 2011년 07월 21일 / 원제 : Domain-Driven Design

## 주석

[^ddd-100]: 도메인 주도 설계. 5장. 100쪽.
[^ddd-101]: 도메인 주도 설계. 5장. 101쪽.
[^entity-comment]: 개념적 식별성을 갖는 객체에 대해서는 [[/pattern/entity]] 문서를 참고.
[^conceptual-whole]: 원주: 워드 커닝햄의 WHOLE VALUE 패턴.
