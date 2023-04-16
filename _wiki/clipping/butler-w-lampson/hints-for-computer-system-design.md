---
layout  : wiki
title   : Hints for Computer System Design By Butler W. Lampson
summary : 컴퓨터 시스템 설계를 위한 힌트
date    : 2023-04-15 22:56:16 +0900
updated : 2023-04-16 11:28:43 +0900
tag     : 
resource: 9B/E5E527-1F17-40DA-8334-9E5A7D674B75
toc     : true
public  : true
parent  : [[/clipping]]
latex   : false
---
* TOC
{:toc}

## 소개

버틀러 램슨의 1983년 7월 논문.

'운영체제 아주 쉬운 세 가지 이야기'에서는 램슨의 이 논문에 대해 다음과 같이 소개한다.

>
컴퓨터 시스템의 설계에 관한 Lampson의 그 유명한 조언.
언젠가 한번은 읽어야 할 논문ㅓ이자 아마 여러 번 읽어야 할 논문일 것이다.
[^three-50]

## Hints for Computer System Design 번역

>
Hints for Computer System Design
>
Butler W. Lampson
>
Computer Science Laboratory
Xerox Palo Alto Research Center
Palo Alto, CA 94304

### Abstract

**초록**

>
Studying the design and implementation of a number of computer has led to some general hints for system design.
They are described here and illustrated by many examples, ranging from hardware such as the Alto and the Dorado to application programs such as Bravo and Star.

다수의 컴퓨터를 설계하고 구현하는 과정에서 시스템 설계에 대한 몇 가지 일반적인 힌트를 얻게 되었습니다.
이 문서에서는 Alto와 Dorado 같은 하드웨어부터 Bravo와 Star 같은 응용 프로그램까지 다양한 예제를 통해 이러한 힌트들을 설명합니다.

### 1. Introduction

**1. 소개**

>
Designing a computer system is very different from designing an algorithm:  
>
> - The external interface (that is, the requirement) is less precisely defined, more complex, and more subject to change.
> - The system has much more internal structure, and hence many internal interfaces.
> - The measure of success is much less clear.
>
The designer usually finds himself floundering in a sea of possibilities, unclear about how one choice will limit his freedom to make other choices, or affect the size and performance of the entire system.
There probably isn’t a ‘best’ way to build the system, or even any major part of it; much more important is to avoid choosing a terrible way, and to have clear division of responsibilities among the parts.
>
I have designed and built a number of computer systems, some that worked and some that didn’t.
I have also used and studied many other systems, both successful and unsuccessful.
From this experience come some general hints for designing successful systems.
I claim no originality for them; most are part of the folk wisdom of experienced designers.
Nonetheless, even the expert often forgets, and after the second system [6] comes the fourth one.

컴퓨터 시스템을 설계하는 것은 알고리즘을 설계하는 것과는 매우 다릅니다.

- 외부 인터페이스(즉, 요구사항)는 덜 정확하게 정의되어 있고, 더 복잡하며, 더 많이 변경될 수 있습니다.
- 컴퓨터 시스템에은 훨씬 더 많은 내부 구조를 갖고 있므로, 많은 내부 인터페이스도 갖고 있습니다.
- 성공의 기준이 훨씬 덜 명확합니다.

컴퓨터 시스템 설계자는 일반적으로 가능성의 바다에서 허우적거리게 됩니다.
한 가지 선택이 다른 선택을 할 수 있는 자유를 제한한다는 것과, 그런 선택이 전체 시스템의 크기와 성능에 어떤 영향을 미치는지가 불분명하기 때문입니다.
아마도 시스템을 구축하는 '최고'의 방법은 없을 것입니다.
그보다 더 중요한 것은 끔찍한 방법을 선택하지 않으면서도 시스템의 각 부분들이 명확하게 책임을 분담할 수 있도록 하는 것입니다.

나는 수많은 컴퓨터 시스템을 설계하고 구축해왔습니다. 그 시스템들은 잘 작동한 것도 있고, 그렇지 않은 것도 있습니다.
그리고 나는 성공적이었거나 실패한 다른 많은 시스템들도 사용도 해 보았고 연구도 해왔습니다.
이러한 경험을 통해 나는 성공적인 시스템 설계를 위한 몇 가지 일반적인 힌트를 얻을 수 있었습니다.
이런 힌트들은 내가 처음으로 생각한 건 아니고, 대부분은 숙련된 설계자들의 경험에서 우러나온 지혜라 할 수 있습니다.
그런데 전문가들조차도 종종 이런 힌트들을 잊곤 합니다.
그래서 두 번째 시스템이 나오고 네 번째 시스템이 나오곤 하죠.

#### 면책 조항

>
Disclaimer: These are not
> - novel (with a few exceptions),
> - foolproof recipes,
> - laws of system design or operation,
> - precisely formulated,
> - consistent,
> - always appropriate,
> - approved by all the leading experts, or
> - guaranteed to work.
>
They are just hints.
Some are quite general and vague; others are specific techniques which are more widely applicable than many people know.
Both the hints and the illustrative examples are necessarily oversimplified. Many are controversial.
>
I have tried to avoid exhortations to modularity, methodologies for top-down, bottom-up, or iterative design, techniques for data abstraction, and other schemes that have already been widely disseminated.
Sometimes I have pointed out pitfalls in the reckless application of popular methods for system design.

면책 조항: 내가 소개할 힌트들은

- 소설(일부 예외 있음)이 아닙니다.
- 완벽한 레시피가 아닙니다.
- 시스템 설계나 운영에 대한 법칙이 아닙니다.
- 정확한 공식이 아닙니다.
- 일관성이 없을 수 있습니다.
- 항상 적절하지 않을 수 있습니다.
- 모든 선도적인 전문가들이 확인한 것이 아닙니다.
- 작동한다고 보장하지 않습니다.

이것들은 힌트일 뿐입니다.
어떤 것은 매우 일반적이고 모호하지만, 어떤 것은 이미 많은 사람들이 알고 있는 것보다 더 광범위하게 적용될 수 있는 특정한 기술이기도 합니다.
여기에서 소개하는 힌트와 예제는 지나칠 정도로 단순하게 소개될 수도 있습니다.
논란의 여지가 있는 내용도 많습니다.

나는 '모듈화', '하향식 방법론', '상향식 방법론', '반복적인 설계 방법론', '데이터 추상화 기술' 등 이미 널리 보급된 다양한 방법에 대해 권장하지 않으려 노력했습니다.
나는 가끔 대중적으로 인기있는 기법을 무분별하게 시스템 설계에 적용하는 것의 위험성을 지적해왔기 때문입니다.

>
The hints are illustrated by a number of examples, mostly drawn from systems I have worked on.
They range from hardware such as the Ethernet local area network and the Alto and Dorado personal computers, through operating systems such as the sds 940 and the Alto operating system and programming systems such as Lisp and Mesa, to application programs such as the Bravo editor and the Star office system and network servers such as the Dover printer and the Grapevine mail system.
I have tried to avoid the most obvious examples in favor of others which show unexpected uses for some well-known methods.
There are references for nearly all the specific examples but for only a few of the ideas; many of these are part of the folklore, and it would take a lot of work to track down their multiple sources.

나는 주로 내가 작업했던 시스템을 사례로 들면서 힌트를 설명할 텐데,
이런 사례들은 Ethernet local 네트워크와 Alto, Dorado 개인용 컴퓨터 같은 하드웨어부터 sds 940와 Alto 운영체제, Lisp, Mesa 같은 프로그래밍 시스템, Bravo 에디터, Star 오피스 시스템, Dover 프린터, Grapevine 메일 시스템 같은 응용 프로그램, 네트워크 서버까지 다양할 것입니다.
널리 알려진 방법론을 예상치 못한 방법으로 사용한 예를 소개하기 위해 뻔한 사례들은 피하려 애썼습니다.
거의 모든 구체적인 사례들에 대해서는 참고문헌을 달아놓긴 했지만, 아이디어에 대해서는 참고문헌이 없는 것도 있습니다.
이런것들 중 상당수는 구전되어 내려오는 것이어서 출처를 알아내려면 많은 노력이 필요할 것입니다.

#### 인용 구문에 대해

>
> > And these few precepts in thy memory  
> > Look thou character.
>
It seemed appropriate to decorate a guide to the doubtful process of system design with quotations from Hamlet.
Unless otherwise indicated, they are taken from Polonius’ advice to Laertes (I iii 58-82).
Some quotations are from other sources, as noted. Each one is intended to apply to the text which follows it.

"이 몇 가지 교훈을 기억에 담고, 너의 행동에 반영하라."

시스템 설계에 대한 이 미심쩍은 가이드를 '햄릿'을 인용해서 꾸며보고 싶었습니다.
특별히 명시하지 않는 한, 이런 인용문들은 폴로니우스가 라에르테스에게 보낸 편지에서 발췌한 것이며
출처가 명시된 몇몇 인용문들은 다른 출처에서 가져온 것입니다.
그리고 각 인용문은 인용문 뒤에 이어지는 텍스트에 적용되는 것으로 보면 됩니다.

#### 힌트 슬로건에 대해

>
Each hint is summarized by a slogan that when properly interpreted reveals the essence of the hint.
Figure 1 organizes the slogans along two axes:
>
> - Why it helps in making a good system: with functionality (does it work?), speed (is it fast enough?), or fault-tolerance (does it keep working?).
> - Where in the system design it helps: in ensuring completeness, in choosing interfaces, or in devising implementations.
>
Fat lines connect repetitions of the same slogan, and thin lines connect related slogans.
>
The body of the paper is in three sections, according to the why headings: functionality (section 2), speed (section 3), and fault-tolerance (section 4).
>
![Figure 1: Summary of the slogans]( /resource/9B/E5E527-1F17-40DA-8334-9E5A7D674B75/232261963-a4ed57e2-9958-4f71-a40a-6b7957e1a84f.png )

각 힌트는 슬로건으로 요약됩니다.
슬로건은 적절하게 해석하면 힌트의 본질을 알 수 있도록 했습니다.
Figure 1 은 슬로건을 2개의 축으로 구성해 보여줍니다.

- `Why?` 왜 이 선택이 좋은 시스템을 만들 수 있게 해주는가?
    - `Functionality - Does it work?` 기능(작동하는가?)
    - `Speed - Is it fast enough?` 속도(충분히 빠른가?)
    - `Fault-tolerance - Does it keep working?` 내결함성(계속 작동하는가?)
- 시스템 설계의 어느 측면에 도움이 되는가:
    - `Completeness` 완전성 보장 관점
    - `Interface` 인터페이스 선택 관점
    - `Implementation` 구현하는 관점

굵은 선은 같은 슬로건끼리 연결된 것을 나타내고, 가는 선은 연관된 슬로건끼리 연결된 것을 나타냅니다.

이 논문의 본문은 Why? 의 세 가지 항목에 따라 '기능(섹션 2)', '속도(섹션 3)', '내결함성(섹션 4)' 이렇게 세 부분으로 나뉩니다.

### 2. Functionality

**2. 기능**

>
The most important hints, and the vaguest, have to do with obtaining the right functionality from a system, that is, with getting it to do the things you want it to do.
Most of these hints depend on the notion of an interface that separates an implementation of some abstraction from the clients who use the abstraction.
The interface between two programs consists of the set of assumptions that each programmer needs to make about the other program in order to demonstrate the correctness of his program (paraphrased from [5]).
Defining interfaces is the most important part of system design.
Usually it is also the most difficult, since the interface design must satisfy three conflicting requirements: an interface should be simple, it should be complete, and it should admit a sufficiently small and fast implementation.
Alas, all too often the assumptions embodied in an interface turn out to be misconceptions instead.
Parnas’ classic paper [38] and a more recent one on device interfaces [5] offer excellent practical advice on this subject.

가장 중요한 힌트이면서 가장 모호한 힌트는 시스템이 올바르게 기능하는 것, 즉 사용자가 원하는 작업을 수행하도록 하는 것과 관련이 있습니다.
이러한 힌트 대부분은 '추상화의 구현'과 '추상화를 사용하는 클라이언트'를 분리하는 인터페이스 개념에 일부 의존합니다.

두 프로그램 간의 인터페이스는 각 프로그래머가 '자신이 만든 프로그램의 정확성'을 입증하기 위해서 '다른 프로그램에 대해 만들어야 하는 가정들의 집합'으로 이루어집니다.
인터페이스를 정의하는 것은 시스템 설계에서 가장 중요한 부분입니다.
인터페이스는 단순해야 하고, 완전해야 하며, 충분히 작고 빠른 구현이 가능해야 합니다.
일반적으로 인터페이스 설계는 이러한 세 가지 상충되는 요구 사항을 충족시켜야 하기 때문에 가장 어려운 부분이기도 합니다.
안타깝게도 인터페이스에 적용된 가정이 오해에서 비롯됐다는 것이 드러나는 경우가 너무 많습니다.
Parnas의 고전적인 논문과 장치 인터페이스에 대한 최신 논문은 이 주제에 대해 탁월하고 실용적인 조언을 제공합니다.

>
The main reason interfaces are difficult to design is that each interface is a small programming language: it defines a set of objects and the operations that can be used to manipulate the objects.
Concrete syntax is not an issue, but every other aspect of programming language design is present.
Hoare’s hints on language design [19] can thus be read as a supplement to this paper.

인터페이스를 설계하는 것이 어려운 주된 이유는 각 인터페이스가 '작은 프로그래밍 언어'이기 때문입니다.
인터페이스는 객체 집합과 객체를 조작하는 데 사용할 수 있는 연산을 정의하죠.
구체적인 신택스는 제쳐두고, 프로그래밍 언어 설계의 모든 측면이 존재하는 문제라 할 수 있습니다.
따라서 언어 설계에 대한 Hoare의 힌트를 이 논문의 보충 자료로 읽을 수 있을 것입니다.

#### 2.1 Keep it simple


## Links

- [Hints for Computer System Design - Butler W. Lampson]( http://bwl-website.s3-website.us-east-2.amazonaws.com/33-Hints/Abstract.html )
    - [Web Page]( http://bwl-website.s3-website.us-east-2.amazonaws.com/33-Hints/WebPage.html )
    - [PDF]( http://bwl-website.s3-website.us-east-2.amazonaws.com/33-Hints/Acrobat.pdf )

## 참고문헌

- 운영체제 아주 쉬운 세 가지 이야기 [제2판] / Remzi H. Arpaci-Dusseau, Andrea C. Arpaci-dusseau 공저 / 원유집, 박민규, 이성진 공역 / 홍릉 / 제2판 발행: 2020년 09월 10일 / 원제: Operating Systems: Three Easy Pieces


[^three-50]: 운영체제 아주 쉬운 세 가지 이야기. 5.7장. 50쪽.

