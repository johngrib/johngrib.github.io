---
layout  : wiki
title   : Hints for Computer System Design By Butler W. Lampson
summary : 컴퓨터 시스템 설계를 위한 힌트
date    : 2023-04-15 22:56:16 +0900
updated : 2023-04-22 01:39:44 +0900
tag     : 
resource: 9B/E5E527-1F17-40DA-8334-9E5A7D674B75
toc     : true
public  : true
parent  : [[/clipping]]
latex   : true
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

- 참고
    - 의역이 많으며, 오역이 상당히 있을 수 있습니다.
    - `*`로 시작하는 소제목은 원문에는 없는 것이며, 역자가 Hint들을 쉽게 찾기 위해 추가한 것입니다.

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

##### * Do one thing well

> > Perfection is reached not when there is no longer anything to add,
> > but when there is no longer anything to take away. (A. Saint-Exupery)
>
> > Those friends thou hast, and their adoption tried,
> > Grapple them unto thy soul with hoops of steel;
> > But do not dull thy palm with entertainment
> > Of each new-hatch’d unfledg’d comrade.

완벽함은 더 이상 더할 것이 없을 때가 아니라, 더 이상 뺄 것이 없을 때 이루어집니다. (A. 생텍쥐페리)

네가 갖고 있는 친구들, 그들의 성향을 시험해 본 후, 강철의 고리로 너의 영혼에 꽉 붙잡거라; 하지만 새로 사귄 미숙한 친구들과의 교제로 손을 무디게 하지는 말거라.

>
_· Do one thing at a time, and do it well_.
An interface should capture the _minimum_ essentials of an abstraction.
_Don’t generalize_; generalizations are generally wrong.

<mark>한 번에 한 가지만 잘 할 것.</mark>
인터페이스는 추상화에 있어 _최소한의_ 필수 요소만 포착해야 합니다.
_일반화하지 마세요._ 일반화는 일반적으로 잘못된 선택입니다.

> > _We are faced with an insurmountable opportunity. (W. Kelley)_

우리는 극복할 수 없는 기회를 마주하고 있습니다. (W. Kelley)

>
When an interface undertakes to do too much its implementation will probably be large, slow and complicated.
An interface is a contract to deliver a certain amount of service; clients of the interface depend on the contract, which is usually documented in the interface specification.
They also depend on incurring a reasonable cost (in time or other scarce resources) for using the interface; the definition of ‘reasonable’ is usually not documented anywhere.
If there are six levels of abstraction, and each costs 50% more than is ‘reasonable’, the service delivered at the top will miss by more than a factor of 10.

인터페이스가 너무 많은 작업을 커버하게 하려고 하면, 구현이 크고 느리고 복잡해지게 됩니다.
인터페이스는 일정량의 서비스를 제공하기 위한 계약입니다.
일반적으로 인터페이스의 클라이언트는 인터페이스 스펙에 문서화되어 있는 계약에 의존하며,
인터페이스를 사용하기 위한 합리적인 비용(시간이나 다른 종류의 자원)을 지불하는 것에도 의존하고 있습니다. 물론 '합리적인'의 수준에 대해서는 어디에도 문서화되어 있지 않습니다.
만약 추상화가 6 레벨로 나뉘는데 각각의 비용이 '합리적인' 선의 50% 이상으로 더 들어간다면, 최상위 레벨에서 제공하는 서비스의 비용은 10배 이상이 됩니다.[^six-level-50-cost]

> > [[/jargon/kiss-principle]]{KISS: Keep It Simple, Stupid. (Anonymous)}
>
> > If in doubt, leave if out. (Anonymous)
>
> > Exterminate features. (C. Thacker)
>
On the other hand,
>
> > Everything should be made as simple as possible, but no simpler. (A. Einstein)

- KISS: 바보야, 단순하게 해. (출처 모름)
- 의심스럽다면, 그냥 빼라. (출처 모름)
- 기능을 제거하라. (C. Thacker)

그런 한편으로는,

- 모든 것은 가능한 한 단순하게 만들어야 하지만, 그 선보다 더 단순하면 안됩니다. (A. Einstein)

>
Thus, service must have a fairly predictable cost, and the interface must not promise more than the implementer knows how to deliver.
Especially, it should not promise features needed by only a few clients, unless the implementer knows how to provide them without penalizing others.
A better implementer, or one who comes along ten years later when the problem is better understood, might be able to deliver, but unless the one you have can do so, it is wise to reduce your aspirations.

그러므로 서비스는 상당히 예측 가능한 정도의 비용을 가져야 하며,
인터페이스 구현자가 알고 있는 '전달 방법'보다 더 많은 것들을 약속해서는 안됩니다.
특히 구현자가 '다른 클라이언트에게 불이익을 주지 않고 기능을 제공하는 방법'을 알지 못한다면, 소수의 클라이언트에게만 필요한 기능을 약속해서는 안됩니다.
더 나은 구현자가 나타나거나, 10년 후에 문제가 더 잘 이해되었을 때 등장한 구현자가 그런 기능을 제공할 수 있을지도 모르겠지만, 당신이 그런 사람이 아니라면 그런 욕심이나 요구사항은 쳐내는 것이 현명합니다.

>
For example, pl/1 got into serious trouble by attempting to provide consistent meanings for a large number of generic operations across a wide variety of data types.
Early implementations tended to handle all the cases inefficiently, but even with the optimizing compilers of 15 years later, it is hard for the programmer to tell what will be fast and what will be slow [31].
A language like Pascal or C is much easier to use, because every construct has a roughly constant cost that is independent of context or arguments, and in fact most constructs have about the same cost.

예를 들어, pl/1 은 다양한 데이터 유형에 걸쳐 많은 수의 일반 연산에 대해 일관된 의미를 제공하려 했기 때문에 심각한 문제에 빠지게 됐습니다.
pl/1의 초기 구현은 모든 경우를 비효율적으로 처리하는 경향이 있었고, 심지어 15년 후에 나온 최적화 컴파일러를 사용해도 프로그래머가 어떤 것이 빠르고 어떤 것이 느린지 알기 어려운 상태입니다.

Pascal이나 C와 같은 언어는 훨씬 사용하기 쉽습니다.
왜냐하면 모든 구문이 컨텍스트나 인수와 무관하게 비용이 일정하며, 실제로 대부분의 구문이 거의 동일한 비용을 갖기 때문입니다.

>
Of course, these observations apply most strongly to interfaces that clients use heavily, such as virtual memory, files, display handling, or arithmetic.
It is all right to sacrifice some performance for functionality in a seldom used interface such as password checking, interpreting user commands, or printing 72 point characters.
(What this really means is that though the cost must still be predictable, it can be many times the minimum achievable cost.)
And such cautious rules don’t apply to research whose object is learning how to make better implementations.
But since research may well fail, others mustn’t depend on its success.

물론 이런 특징은 가상 메모리, 파일, 디스플레이 처리, 산술 연산과 같이 클라이언트가 많이 사용하는 인터페이스에 가장 강력하게 적용됩니다.
패스워드 체크, 사용자 명령 해석, 72 포인트 문자를 출력하기 같이 사용 빈도가 낮은 인터페이스에서는 성능을 희생해도 괜찮습니다.
(희생이란 말은 비용이 여전히 예측 가능하긴 해야 하지만, 달성 가능한 최소 비용보다 여러 배가 될 수도 있다는 것을 의미합니다.)

한편, 이런 종류의 규칙은 더 나은 구현 방법을 찾아내는 것이 목적인 연구에는 적용되지 않습니다.
그리고 그런 연구도 실패할 수 있기 때문에 다른 사람들은 그런 연구의 성공에 의존해서는 안됩니다.

> > Algol 60 was not only an improvement on its predecessors,
> > but also on nearly all its successors. (C. Hoare)[^ewd-32]

_Algol 60은 그 이전 언어들을 개선한 것뿐만 아니라, 이전 언어들의 거의 모든 후속 언어들보다도 더 좋다. (C. Hoare)_

>
Examples of offering too much are legion.
The Alto operating system [29] has an ordinary read/write-n-bytes interface to files, and was extended for Interlisp-D [7] with an ordinary paging system that stores each virtual page on a dedicated disk page.
Both have small implementations (about 900 lines of code for files, 500 for paging) and are fast (a page fault takes one disk access and has a constant computing cost that is a small fraction of the disk access time, and the client can fairly easily run the disk at full speed).
The Pilot system [42] which succeeded the Alto OS follows Multics and several other systems in allowing virtual pages to be mapped to file pages, thus subsuming file input/output within the virtual memory system.
The implementation is much larger (about 11,000 lines of code) and slower (it often incurs two disk accesses to handle a page fault and cannot run the disk at full speed).

너무 많은 것을 제공한 사례는 많습니다.

Alto OS는 파일에 대한 일반적인 read/write-n-byte 인터페이스를 제공하며,
이는 각 가상 페이지를 전용 디스크 페이지에 저장하는 일반적인 페이징 시스템인 Interlisp-D 를 위해 확장되었습니다.
둘 다 구현이 작고(파일에 대해 900줄, 페이징에 대해 500줄) 빠릅니다(페이지 폴트가 발생하면 디스크 엑세스가 한 번 발생. 그 컴퓨팅 비용은 상수이며, 디스크 엑세스 타임의 일부를 차지하고, 클라이언트는 디스크를 손쉽게 최고 속도로 실행할 수 있음).

Alto OS를 계승한 Pilot 시스템은 Multics와 다른 시스템들을 따라서 가상 페이지를 파일 페이지에 매핑하여 가상 메모리 시스템 내에서 파일 input/output을 포함할 수 있도록 합니다.
이 구현은 훨씬 더 크고(약 11,000 줄의 코드) 느립니다(페이지 폴트를 처리하기 위해 디스크 엑세스가 두 번 발생하고, 디스크를 최고 속도로 실행할 수 없는 경우가 많음).
추가적인 기능을 높은 비용으로 탑재한 셈입니다.

>
This is not to say that a good implementation of this interface is impossible, merely that it is hard.
This system was designed and coded by several highly competent and experienced people.
Part of the problem is avoiding circularity: the file system would like to use the virtual memory, but virtual memory depends on files.
Quite general ways are known to solve this problem [22], but they are tricky and easily lead to greater cost and complexity in the normal case.

이것은 이 인터페이스를 잘 구현하는 것이 불가능하다는 말이 아닙니다. 그저 어렵다는 것입니다.
이 시스템은 매우 유능하고 경험이 풍부한 사람들이 설계하고 코딩한 것입니다.

이 문제의 측면 중 하나는 순환성을 피하는 것이라 할 수 있습니다.
파일 시스템은 가상 메모리를 사용하고자 하지만, 가상 메모리는 파일에 의존하고 있습니다.
이 문제의 해결책으로 널리 알려진 꽤 일반적인 방법이 있긴 하지만 몹시 까다롭고, 일반적인 경우 더 큰 비용과 더 큰 복잡성으로 쉽게 이어질 수 있습니다.

> > And, in this upshot, purposes mistook  
> > Fall’n on th’ inventors’ heads. (V ii 387)

그리고 결국, 목적이 오해되어,  
발명자들의 머리로 떨어진다.

>
Another example illustrates how easily generality can lead to unexpected complexity.
The Tenex system [2] has the following innocent-looking combination of features:
>
> - It reports a reference to an unassigned virtual page by a trap to the user program.
> - A system call is viewed as a machine instruction for an extended machine, and any reference it makes to an unassigned virtual page is thus similarly reported to the user program.
> - Large arguments to system calls, including strings, are passed by reference.
> - There is a system call CONNECT to obtain access to another directory; one of its arguments is a string containing the password for the directory. If the password is wrong, the call fails after a three second delay, to prevent guessing passwords at high speed.

또 다른 사례는 얼마나 쉽게 일반성이 예상치 못한 복잡도로 이어질 수 있는지를 보여줍니다.
Tenex 시스템은 다음과 같이 별 문제 없어 보이는 기능들을 가지고 있습니다.

- 트랩에 의해 할당되지 않은 가상 페이지에 대한 참조를 사용자 프로그램에 보고합니다.
- 시스템 호출은 확장 머신에 대한 머신 명령으로 간주되며, 따라서 할당되지 않은 가상 페이지에 대한 모든 참조는 사용자 프로그램에 유사하게 보고됩니다.
- string을 포함하여 시스템 호출에 대한 큰 인수는 참조로 전달됩니다.
- 다른 디렉토리에 대한 엑세스 권한을 얻기 위한 시스템 호출 CONNECT가 있습니다. 그 인자 중 하나는 디렉토리의 패스워드가 포함된 string입니다. 만약 password가 틀렸다면 password를 빠르게 알아내는 것을 방지하기 위해 3초 지연 후 호출이 실패합니다.

>
CONNECT is implemented by a loop of the form

CONNECT는 다음과 같은 형식의 루프로 구현됩니다.

> ```
> for i := 0 to Length(directoryPassword) do
>     if directoryPassword[i] ≠ passwordArgument[i] then
>         Wait three seconds; return BadPassword
>     end if
> end loop;
> connect to directory; return Success
> ```

>
The following trick finds a password of length n in 64n tries on the average, rather than 128n/2 (Tenex uses 7 bit characters in strings).
Arrange the passwordArgument so that its first character is the last character of a page and the next page is unassigned, and try each possible character as the first.
If CONNECT reports BadPassword, the guess was wrong; if the system reports a reference to an unassigned page, it was correct.
Now arrange the passwordArgument so that its second character is the last character of the page, and proceed in the obvious way.

그리고 이제 소개할 트릭을 쓰면 길이가 n인 패스워드를 평균적으로 $$128^n / 2$$ 가 아닌 $$64n$$ 만큼의 시도로 알아낼 수 있습니다(Tenex는 string에 7 비트 문자를 사용합니다).

passwordArgument의 첫 번째 문자를 어느 페이지의 마지막 문자가 되도록 하고, 그 다음 페이지는 할당되지 않은 페이지가 되도록 배치한 후, 모든 문자를 암호의 첫 번째 문자로 시도해 봅니다.
첫 번째 문자가 페이지의 마지막 문자이고 다음 페이지가 할당되지 않도록 passwordArgument를 정렬합니다. 그리고 첫 번째 문자에 가능한 모든 문자를 넣어보며 시도합니다.
이 때 CONNECT 가 BadPassword라고 보고하면 추측이 틀린 것이고, 시스템이 할당된 페이지에 대한 참조를 보고하면 맞은 것입니다.
이제 두 번째 문자가 페이지의 마지막 문자가 되도록 passwordArgument를 정렬하고, 같은 방법을 반복하면 됩니다.

>
This obscure and amusing bug went unnoticed by the designers because the interface provided by a Tenex system call is quite complex: it includes the possibility of a reported reference to an unassigned page.
Or looked at another way, the interface provided by an ordinary memory reference instruction in system code is quite complex: it includes the possibility that an improper reference will be reported to the client without any chance for the system code to get control first.

Tenex 시스템 호출이 제공하는 인터페이스가 상당히 복잡하기 때문에, 설계자는 이 미묘하고 재미있는 버그를 알아차리지 못했습니다.
할당되지 않은 페이지에 대한 참조가 보고될 가능성 또한 그 복잡한 구조에 포함되어 있었던 것입니다.
한편 다른 관점에서 보면, 시스템 코드에서 일반적인 메모리 참조 명령이 제공해주는 인터페이스가 굉장히 복잡하다는 것도 알 수 있습니다.
시스템 코드가 먼저 제어권을 확보할 기회 없이 부적절한 참조가 클라이언트에 보고될 가능성도 포함되어 있었기 때문입니다.

> > An engineer is a man who can do for a dime  
> > what any fool can do for a dollar. (Anonymous)

엔지니어는 바보들이 1 달러로 하고 있는 일을 10 센트만으로도 할 수 있는 사람이다. (출처 모름)

>
At times, however, it’s worth a lot of work to make a fast implementation of a clean and powerful interface.
If the interface is used widely enough, the effort put into designing and tuning the implementation can pay off many times over.
But do this only for an interface whose importance is already known from existing uses.
And be sure that you know how to make it fast.

그러나 때로는 깔끔하고 강력한 인터페이스를 갖는 빠른 성능 구현체를 위해 많은 노력을 기울이는 것도 가치있는 일이라 할 수 있습니다.
그렇게 만든 인터페이스가 충분히 광범위하게 사용된다면 구현체를 설계하고 튜닝하는 데 투자한 노력은 몇 배의 보상으로 돌아올 것입니다.
단, 기존의 사용 사례에서 이미 중요성이 알려진 인터페이스에 대해서만 수행하도록 합니다.
그리고 빠른 성능을 구현하는 방법을 확실히 알고 있어야 합니다.

>
For example, the BitBlt or RasterOp interface for manipulating raster images [21, 37] was devised by Dan Ingalls after several years of experimenting with the Alto’s high-resolution interactive display.
Its implementation costs about as much microcode as the entire emulator for the Alto’s standard instruction set and required a lot of skill and experience to construct.
But the performance is nearly as good as the special-purpose character-to-raster operations that preceded it, and its simplicity and generality have made it much easier to build display applications.

예를 들어, raster 이미지를 조작하는 BitBlt 나 RasterOp 인터페이스는 Dan Ingalls가 Alto의 고해상도 대화형 디스플레이를 몇 년 동안 실험한 결과 고안해낸 것입니다.
이 인터페이스의 구현에는 Alto의 표준 명령어 집합 전체 에뮬레이터만큼의 많은 마이크로 코드가 필요하며, 구축하는 데 상당한 기술과 경험이 필요했습니다.
그러나 그 성능은 그것에 앞서 이루어진 특수 목적의 character-to-raster 연산에 준할 만큼 우수하며, 그 단순함과 범용성 덕분에 디스플레이 응용 프로그램을 훨씬 쉽게 구축할 수 있게 되었습니다.

>
The Dorado memory system [8] contains a cache and a separate high-bandwidth path for fast input/output.
It provides a cache read or write in every 64 ns cycle, together with 500 MBits/second of I/O bandwidth, virtual addressing from both cache and I/O, and no special cases for the microprogrammer to worry about.
However, the implementation takes 850 msi chips and consumed several man-years of design time.
This could only be justified by extensive prior experience (30 years!) with this interface, and the knowledge that memory access is usually the limiting factor in performance.
Even so, it seems in retrospect that the high I/O bandwidth is not worth the cost; it is used mainly for displays, and a dual-ported frame buffer would almost certainly be better.

Dorado 메모리 시스템은 캐시와 빠른 input/output을 위한 별도의 고대역폭 경로를 포함하고 있습니다.
이 시스템은 64ns 사이클마다 캐시 읽기와 쓰기를 제공하며, 500MBits/sec의 I/O 대역폭과 캐시와 I/O 에서의 가상 주소 지정 기능을 갖고 있습니다.
또한 마이크로프로그래머가 걱정할만한 특수한 케이스가 없습니다.
그러나 이 시스템을 구현하려면 850개의 msi 칩이 필요했고, 몇 년이나 되는 설계 시간이 필요했습니다.
이러한 구현이 타당할 수 있었던 것은 이 인터페이스에 대한 경험과(30년!), 메모리 접근이 성능에서 일반적으로 제한 요인이라는 지식 덕분이었습니다.
그럼에도 불구하고 돌이켜 생각해 보면, 높은 I/O 대역폭은 비용 대비 가치가 없어 보입니다.
주로 디스플레이에 사용되지만, dual-port 프레임 버퍼가 거의 확실히 더 나은 선택이었을 것입니다.

##### * Get it right

>
Finally, lest this advice seem too easy to take,

마지막으로 이 조언을 너무 쉽게 받아들이지 않도록,

>
· Get it right.
Neither abstraction nor simplicity is a substitute for getting it right.
In fact, abstraction can be a source of severe difficulties, as this cautionary tale shows.
Word processing and office information systems usually have provision for embedding named fields in the documents they handle.
For example, a form letter might have ‘address’ and ‘salutation’ fields.
Usually a document is represented as a sequence of characters, and a field is encoded by something like {name: contents}.
Among other operations, there is a procedure FindNamedField that finds the field with a given name.
One major commercial system for some time used a FindNamedField procedure that ran in time O(n^2), where n is the length of the document.
This remarkable result was achieved by first writing a procedure FindIthField to find the ith field (which must take time O(n) if there is no auxiliary data structure), and then implementing FindNamedField(name) with the very natural program
>
> ```
> for i := 0 to numberofFields do
> FindIthField; if its name is name then exit
> end loop
> ```
>
Once the (unwisely chosen) abstraction FindIthField is available, only a lively awareness of its cost will avoid this disaster.
Of course, this is not an argument against abstraction, but it is well to be aware of its dangers.

올바르게 선택해야 합니다.
추상화도 단순함도 올바른 선택을 대신하지 못합니다.
사실 몇 가지 사례에서 알 수 있듯이, 추상화는 심각한 어려움의 원인이 될 수 있습니다.

일반적으로 워드 프로세싱 및 사무용 정보 시스템에는 명명된 필드를 문서에 삽입하는 기능을 제공합니다.
예를 들어, 양식 편지에는 '주소'와 '인사말' 같은 필드가 있을 수 있습니다.
대개 문서는 문자들의 시퀀스로 표현되며, 필드는 `{name: contents}`와 같은 형태로 인코딩됩니다.
다른 작업 중 하나로 주어진 이름의 필드를 찾는 `FindNamedField` 프로시저도 있습니다.
어떤 상용 시스템에서는 길이가 n인 문서에 대해 O(n^2) 시간이 걸리는 `FindNamedField` 프로시저를 사용하기도 했습니다.
이 기가막힌 프로시저는 먼저 i번째 필드를 찾는 `FindIthField` 프로시저를 작성하고(보조적인 데이터 구조가 없다면 O(n) 시간이 소요됨), 매우 당연하다는 듯이 `FindNamedField(name)` 을 구현해 달성하게 됐습니다.

```
for i := 0 to numberofFields do
    FindIthField; if its name is name then exit
end loop
```

(지혜롭지 못한 선택으로) 추상화된 `FindIthField`를 사용할 수 있게 되면, 그 비용에 대한 높은 인식만이 이러한 재앙을 피할 수 있게 해줍니다.
물론 이것은 추상화를 반대하는 주장은 아닙니다. 그러나 그 위험성을 인식하고 대비하는 것이 바람직합니다.

#### 2.2 Corollaries

**부속 정리**

>
The rule about simplicity and generalization has many interesting corollaries.

단순성과 일반화에 대한 규칙에는 흥미로운 부속 정리들이 많이 있습니다.

##### * Make it fast

> > Costly thy habit as thy purse can buy,  
> > But not express’d in fancy; rich, not gaudy.

비용이 많이 든다 해도 지갑이 버틸 수 있는 최고의 옷을 입어야 한단다.  
그러나 화려함에만 길들여지면 안되며, 부유하면서도 과시하지 않도록 해야 한다.

>
· Make it fast, rather than general or powerful.
If it’s fast, the client can program the function it wants, and another client can program some other function.
It is much better to have basic operations executed quickly than more powerful ones that are slower (of course, a fast, powerful operation is best, if you know how to get it).
The trouble with slow, powerful operations is that the client who doesn’t want the power pays more for the basic function.
Usually it turns out that the powerful operation is not the right one.

빠르게 만드세요. 범용적이거나 강력한 것보다 그게 낫습니다.
빠르다면, 클라이언트는 원하는 함수를 프로그래밍하고, 다른 클라이언트는 다른 함수를 프로그래밍할 수 있습니다.
느리지만 강력한 연산을 제공하는 것보다, 기본 연산이 빠르게 실행되는 것이 훨씬 좋습니다(물론, 할 수만 있다면 빠르면서도 강력한 것이 최선입니다).
느리지만 강력한 연산의 문제는, 강력한 기능을 원하지 않는 클라이언트가 기본 기능에 대해 더 많은 비용을 지불해야 한다는 것입니다.
대체로 강력한 연산을 제공하는 것이 올바른 선택이 아닌 경우가 많습니다.

> > Had I but time (as this fell sergeant, death,  
> > Is strict in his arrest) O, I could tell you —  
> > But let it be. (V ii 339)

나에게 시간이 있었다면(엄격한 사형 집행자, 죽음의 체포와 같이)  
오, 내가 너에게 말해줄 수 있었을 텐데  
하지만 그대로 받아들여야겠다.

>
For example, many studies (such as [23, 51, 52]) have shown that programs spend most of their time doing very simple things: loads, stores, tests for equality, adding one.
Machines like the 801 [41] or the RISC [39] with instructions that do these simple operations quickly can run programs faster (for the same amount of hardware) than machines like the VAX with more general and powerful instructions that take longer in the simple cases.
It is easy to lose a factor of two in the running time of a program, with the same amount of hardware in the implementation.
Machines with still more grandiose ideas about what the client needs do even worse [18].

예를 들어, 많은 연구들은 프로그램이 로드, 저장, 동등성 테스트, 1 더하기와 같은 매우 간단한 작업을 수행하는 데 대부분의 시간을 소비한다는 것을 보여줍니다.
이런 간단한 작업을 빠르게 수행하는 명령을 갖고 있는 801이나 RISC 같은 기계는, 일반적이고 강력한 명령을 갖는 VAX와 같은 기계보다 (동일한 양의 하드웨어에도 불구하고) 프로그램을 더 빠르게 실행할 수 있습니다.
동일한 양의 하드웨어를 사용해 구현했다고 해도, 프로그램 실행 시간에서 최대 2배의 차이를 보일 수 있는 것입니다.
클라이언트가 필요로 하는 것에 대해 더 거창한 아이디어를 갖는 기계는 성능이 더 떨어집니다.

>
To find the places where time is being spent in a large system, it is necessary to have measurement tools that will pinpoint the time-consuming code.
Few systems are well enough understood to be properly tuned without such tools; it is normal for 80% of the time to be spent in 20% of the code, but a priori analysis or intuition usually can’t find the 20% with any certainty.
The performance tuning of Interlisp-D sped it up by a factor of 10 using one set of effective tools [7].

대규모 시스템에서 시간이 낭비되는 부분을 찾으려면, 시간을 많이 잡아먹는 코드를 정확하게 찾아낼 수 있는 측정 도구가 필요합니다.
이러한 도구 없이도 충분히 이해하여 적절하게 튜닝할 수 있는 시스템은 드뭅니다.
일반적으로 80%의 시간이 20%의 코드에서 소비되지만, 선행 분석이나 직관만으로는 그 20%를 확실하게 찾아낼 수 없습니다.
Interlisp-D는 효과적인 도구들을 사용해 성능 튜닝을 한 결과 10배나 빨라졌습니다.

##### * Don't hide power

>
· Don’t hide power.
This slogan is closely related to the last one.
When a low level of abstraction allows something to be done quickly, higher levels should not bury this power inside something more general.
The purpose of abstractions is to conceal undesirable properties; desirable ones should not be hidden.
Sometimes, of course, an abstraction is multiplexing a resource, and this necessarily has some cost.
But it should be possible to deliver all or nearly all of it to a single client with only slight loss of performance.

파워를 숨기지 마세요.
이 슬로건은 바로 이전의 슬로건과 밀접한 관련이 있습니다.
낮은 수준의 추상화를 통해 무언가를 빠르게 처리할 수 있다면, 높은 수준의 추상화는 이런 능력을 일반화해서 파묻어서는 안됩니다.
추상화의 목적은 바람직하지 않은 속성을 감추기 위한 것이지, 바람직한 속성을 숨기기 위한 것이 아닙니다.
물론, 추상화는 때때로 리소스를 다중화하며, 이로 인해 필연적으로 비용이 발생하곤 합니다.
그러나 약간의 성능 저하를 감수하면서도 단일 클라이언트에 거의 모든 리소스를 제공할 수 있어야 합니다.

>
For example, the Alto disk hardware [53] can transfer a full cylinder at disk speed.
The basic file system [29] can transfer successive file pages to client memory at full disk speed, with time for the client to do some computing on each sector; thus with a few sectors of buffering the entire disk can be scanned at disk speed.
This facility has been used to write a variety of applications, ranging from a scavenger that reconstructs a broken file system, to programs that search files for substrings that match a pattern.
The stream level of the file system can read or write n bytes to or from client memory; any portions of the n bytes that occupy full disk sectors are transferred at full disk speed.
Loaders, compilers, editors and many other programs depend for their performance on this ability to read large files quickly.
At this level the client gives up the facility to see the pages as they arrive; this is the only price paid for the higher level of abstraction.

예를 들어, Alto의 디스크 하드웨어는 디스크 회전 속도로 전체 실린더를 전송할 수 있습니다.
기본 파일 시스템은 클라이언트가 각 섹터에서 일부 연산을 수행할 시간을 갖고 연속된 파일 페이지를 전체 디스크 속도로 클라이언트 메모리로 전송할 수 있습니다. 그러므로 섹터 몇 개의 버퍼링으로 전체 디스크를 디스크 속도로 스캔할 수 있습니다.
이 기능은 손상된 파일 시스템을 재구성하는 정리 도구부터, 패턴과 일치하는 문자열을 여러 파일들에서 찾는 프로그램까지 다양한 애플리케이션 작성에 활용됐습니다.
파일 시스템의 스트림 레벨은 클라이언트 메모리에서 n 바이트를 읽거나 쓸 수 있으며,
n 바이트 중에서 전체 디스크 섹터를 차지하는 부분은 전체 디스크 속도로 전송됩니다.
로더, 컴파일러, 편집기 등 많은 프로그램들은 대용량 파일을 빠르게 읽는 능력에 따라 성능이 좌우됩니다.
이 레벨에서 클라이언트는 도착하는 페이지를 볼 수 있는 기능을 포기하게 되며,
이는 더 높은 수준의 추상화에 대해 지불하는 유일한 비용입니다.

##### * Use procedure arguments

>
· Use procedure arguments to provide flexibility in an interface.
They can be restricted or encoded in various ways if necessary for protection or portability.
This technique can greatly simplify an interface, eliminating a jumble of parameters that amount to a small programming language.
A simple example is an enumeration procedure that returns all the elements of a set satisfying some property.
The cleanest interface allows the client to pass a filter procedure that tests for the property, rather than defining a special language of patterns or whatever.

프로시저 인자를 사용해 인터페이스에 유연성을 제공하라.
보호나 이식성이 필요하다면, 인자를 다양한 방법으로 제한하거나 인코딩할 수 있습니다.
이 기법은 인터페이스를 크게 단순화해서 작은 프로그래밍 언어에 해당하는 매개변수의 혼란스러움을 제거할 수 있습니다.
간단한 예로, 특정 속성을 만족하는 집합의 모든 원소를 리턴하는 열거 프로시저를 들 수 있습니다.
가장 깔끔한 인터페이스를 사용하면 클라이언트는 패턴 등의 특수한 언어를 정의하는 대신 속성을 검사하는 필터 프로시저를 전달할 수도 있습니다.

>
But this theme has many variations.
A more interesting example is the Spy system monitoring facility in the 940 system at Berkeley [10], which allows an untrusted user program to plant patches in the code of the supervisor.
A patch is coded in machine language, but the operation that installs it checks that it does no wild branches, contains no loops, is not too long, and stores only into a designated region of memory dedicated to collecting statistics.
Using the Spy, the student of the system can fine-tune his measurements without any fear of breaking the system, or even perturbing its operation much.

하지만 이 주제에는 많은 변형이 있습니다.
더 흥미로운 사례는 Berkeley의 940 시스템의 Spy 시스템 모니터링 기능으로, 이 기능은 신뢰할 수 없는 사용자 프로그램이 슈퍼바이저의 코드에 패치를 적용할 수 있게 합니다.
패치는 기계어로 코딩되지만, 설치 작업 중에 패치에 와일드 브랜치가 없는지, 루프가 없는지, 너무 길지는 않은지, 통계를 수집하기 위한 전용 메모리 영역에만 저장되는지 등을 확인합니다.
Spy를 사용하면 시스템을 망가뜨리거나 작동을 크게 방해할 걱정 없이 측정값을 미세 조정할 수 있습니다.

>
Another unusual example that illustrates the power of this method is the FRETURN mechanism in the Cal time-sharing system for the cdc 6400 [30].
From any supervisor call C it is possible to make another one CF that executes exactly like C in the normal case, but sends control to a designated failure handler if C gives an error return.
The CF operation can do more (for example, it can extend files on a fast, limited-capacity storage device to larger files on a slower device), but it runs as fast as C in the (hopefully) normal case.

이 기법의 힘을 보여주는 또 다른 독특한 사례는 cdc 6400용 Cal time-sharing 시스템의 FRETURN 메커니즘입니다.
모든 슈퍼바이저 호출 C은 일반적인 경우 C와 똑같이 실행되지만, C가 에러를 리턴하게 되면 지정된 실패 핸들러로 제어를 전달하는 CF 라는 다른 호출을 만들 수 있는 것입니다.
CF 연산은 더 많은 작업을 수행할 수 있지만(예를 들어, 용량이 제한된 고속 저장 장치의 파일을 더 큰 파일로 느린 장치에 확장할 수 있음), 일반적인 경우에는 C만큼 빠르게 실행됩니다.

>
It may be better to have a specialized language, however, if it is more amenable to static analysis for optimization.
This is a major criterion in the design of database query languages, for example.

그러나 최적화를 위한 정적 분석이 더 용이하다면 전문적인 언어를 사용하는 것이 더 나을 수 있습니다.
예를 들어, 이것은 데이터베이스 쿼리 언어 설계의 주요 기준이기도 합니다.

##### * Leave it to the client

>
· Leave it to the client.
As long as it is cheap to pass control back and forth, an interface can combine simplicity, flexibility and high performance by solving only one problem and leaving the rest to the client.
For example, many parsers confine themselves to doing context free recognition and call client-supplied "semantic routines" to record the results of the parse.
This has obvious advantages over always building a parse tree that the client must traverse to find out what happened.

클라이언트에 맞겨라.
제어를 주고받는 데 드는 비용이 저렴한 한, 인터페이스는 한 가지 문제만 해결하고 나머지는 클라이언트에 맡김으로써 단순함, 유연성 및 고성능을 결합해낼 수 있습니다.
예를 들어 많은 parser들은 문맥 인식 작업만 수행하고, parse 결과를 기록하기 위해 클라이언트가 제공하는 "시맨틱 루틴"을 호출합니다.
이는 클라이언트가 무슨 일이 일어났는지 파악하기 위해 항상 parse tree를 구축해야 하는 것에 비해 분명한 이점이 있습니다.

>
The success of monitors [20, 25] as a synchronization device is partly due to the fact that the locking and signaling mechanisms do very little, leaving all the real work to the client programs in the monitor procedures.
This simplifies the monitor implementation and keeps it fast;
if the client needs buffer allocation, resource accounting or other frills, it provides these functions itself or calls other library facilities, and pays for what it needs.
The fact that monitors give no control over the scheduling of processes waiting on monitor locks or condition variables, often cited as a drawback, is actually an advantage, since it leaves the client free to provide the scheduling it needs (using a separate condition variable for each class of process), without having to pay for or fight with some built-in mechanism that is unlikely to do the right thing.

모니터가 동기화 장치로서 성공한 이유 중 하나는, 잠금 및 신호 매커니즘이 거의 작동하지 않고 모니터 프로시저의 클라이언트 프로그램에 모든 실질적인 작업을 맡긴다는 것입니다.
이로 인해 모니터 구현은 단순해지고 속도도 빨라집니다.
만약 클라이언트에 버퍼 할당, 리소스 어카운팅 또는 부가적인 기능이 필요하다면 클라이언트는 그런 기능을 직접 제공하거나 다른 라이브러리 기능을 호출해서 필요한 만큼 비용을 지불하면 됩니다.
사실 모니터는 모니터 잠금이나 조건 변수에 대기 중인 프로세스의 스케쥴링에 대한 제어를 제공하지 않는다는 점이 종종 단점으로 지적되곤 하지만, 실제로는 클라이언트에 필요한 스케쥴링(각 프로세스 클래스마다 별도의 조건 변수를 사용)을 제공하면서 제대로 작동하는지 아닌지 모를 내장된 매커니즘과 씨름할 필요 없이 비용만 지불하도록 하는 장점이 있습니다.

>
The Unix system [44] encourages the building of small programs that take one or more character streams as input, produce one or more streams as output, and do one operation.
When this style is imitated properly, each program has a simple interface and does one thing well, leaving the client to combine a set of such programs with its own code and achieve precisely the effect desired.

Unix 시스템은 하나 이상의 문자 스트림을 입력으로 사용하고, 하나 이상의 스트림을 출력으로 생성하며, 한 가지 작업을 수행하는 작은 프로그램을 만드는 것을 권장합니다.
이 스타일을 적절하게 따르면 각 프로그램은 간단한 인터페이스를 갖고 한 가지 작업을 잘 수행하므로,
클라이언트는 이런 프로그램들을 자신의 코드와 결합하여 원하는 효과를 정확하게 얻을 수 있게 됩니다.

>
The _end-to-end_ slogan discussed in section 3 is another corollary of keeping it simple.

3장에서 논의할 _end-to-end_ 슬로건 또한 단순함을 유지(Keeping it simple)하는 것의 또 다른 부속 정리입니다.

#### 2.3 Continuity

**2.3 연속성**

>
There is a constant tension between the desire to improve a design and the need for stability or continuity.

'설계 개선에 대한 욕구'와 '안정성', '연속성의 필요' 사이에는 항상 긴장이 존재합니다.

##### * Keep basic interfaces stable

>
· Keep basic interfaces stable.
Since an interface embodies assumptions that are shared by more than one part of a system, and sometimes by a great many parts, it is very desirable not to change the interface.
When the system is programmed in a language without type-checking, it is nearly out of the question to change any public interface because there is no way of tracking down its clients and checking for elementary incompatibilities, such as disagreements on the number of arguments or confusion between pointers and integers.
With a language like Mesa [15] that has complete type-checking and language support for interfaces, it is much easier to change an interface without causing the system to collapse.
But even if type-checking can usually detect that an assumption no longer holds, a programmer must still correct the assumption.
When a system grows to more than 250K lines of code the amount of change becomes intolerable; even when there is no doubt about what has to be done, it takes too long to do it.
There is no choice but to break the system into smaller pieces related only by interfaces that are stable for years.
Traditionally only the interface defined by a programming language or operating system kernel is this stable.

기본 인터페이스를 안정적으로 유지하라.
인터페이스는 시스템의 여러 부분, 때로는 매우 많은 부분이 공유하는 가정을 전제로 구현합니다.
때문에 인터페이스를 변경하지 않는 것이 매우 바람직합니다.
타입 체크가 없는 언어로 프로그래밍된 시스템의 경우, 클라이언트를 추적하고 인자 개수의 불일치라던가 포인터와 정수 사이의 혼동 같은 기본적인 호환성 문제를 확인할 방법이 없기 때문에 공개된 인터페이스를 변경하는 것은 거의 불가능에 가깝습니다.
Mesa와 같이 인터페이스에 대한 완벽한 타입 체크와 언어 차원의 지원이 있는 언어를 사용하면 시스템을 붕괴시키지 않고도 인터페이스를 변경하는 것이 훨씬 쉽습니다.
그러나 일반적으로 타입 체크를 통해 이제 유효하지 않게 된 가정들을 찾아내는 것이 가능하다 하더라도, 프로그래머는 여전히 잘못된 가정을 교정하는 일을 해야 합니다.
시스템이 25만 줄 이상의 코드로 커지면 변경량이 감당할 수 없을 정도로 많아져서, 무엇을 수정해야 하는지 의심의 여지가 없는 경우에도 수정하는 데 너무 오랜 시간이 걸리게 됩니다.
결국 수 년이 지나도 안정적인 인터페이스로만 연결된 작은 부분들로 시스템을 분할하는 방법 밖에 없습니다.
전통적으로 프로그래밍 언어나, 운영체제 커널에서 정의하는 인터페이스만이 이 정도로 안정적입니다.

##### * Keep a place to stand

>
· Keep a place to stand if you do have to change interfaces.
Here are two rather different examples to illustrate this idea.
One is the compatibility package, which implements an old interface on top of a new system.
This allows programs that depend on the old interface to continue working.
Many new operating systems (including Tenex [2] and Cal [50]) have kept old software usable by simulating the supervisor calls of an old system (tops-10 and Scope, respectively).
Usually these simulators need only a small amount of effort compared to the cost of reimplementing the old software, and it is not hard to get acceptable performance.
At a different level, the ibm 360/370 systems provided emulation of the instruction sets of older machines like the 1401 and 7090.
Taken a little further, this leads to virtual machines, which simulate (several copies of) a machine on the machine itself [9].

인터페이스를 변경해야 한다면 서 있을 곳을 유지하라.
이 아이디어를 설명하기 위해 두 가지 매우 다른 예를 들어보겠습니다.
하나는 호환성 패키지로, 새 시스템 위에 이전 인터페이스를 구현하는 것입니다.
이를 통해 이전 인터페이스에 의존하는 프로그램이 계속 작동할 수 있습니다.
많은 새로운 운영체제들(Tenex와 Cal 같은)은 이전 시스템의 슈퍼바이저 호출을 시뮬레이션하여 이전 소프트웨어를 계속 사용할 수 있도록 했습니다(tops-10 과 Scope가 이에 해당합니다).
일반적으로 이런 시뮬레이터들을 사용하면 이전 버전의 소프트웨어를 다시 구현하는 비용에 비해 상대적으로 적은 노력으로 만들 수 있으며, 만족할 만한 성능을 얻는 것도 어렵지 않습니다.
다른 수준에서, IBM 360/370 시스템은 1401과 7090과 같은 구형 컴퓨터의 명령어 집합을 에뮬레이션해주었습니다.
이러한 접근 방식은 한 단계 더 나아가서, 가상 머신으로 발전하게 됐습니다.
즉 머신 자체에서 머신을 시뮬레이션(여러 개의 복사본)하게 됩니다.

>
A rather different example is the world-swap debugger, which works by writing the real memory of the target system (the one being debugged) onto a secondary storage device and reading in the debugging system in its place.
The debugger then provides its user with complete access to the target world, mapping each target memory address to the proper place on secondary storage.
With care it is possible to swap the target back in and continue execution.
This is somewhat clumsy, but it allows very low levels of a system to be debugged conveniently, since the debugger does not depend on the correct functioning of anything in the target except the very simple world-swap mechanism.
It is especially useful during bootstrapping.
There are many variations.
For instance, the debugger can run on a different machine, with a small ‘tele-debugging’ nub in the target world that can interpret ReadWord, WriteWord, Stop and Go commands arriving from the debugger over a network.
Or if the target is a process in a time-sharing system, the debugger can run in a different process.

다소 다른 사례로 월드 스왑 디버거가 있는데, 이는 대상 시스템(디버깅 중인 시스템)의 실제 메모리를 보조 저장 장치에 쓰고, 그 위치에 디버깅 시스템을 읽어들이는 방식으로 작동합니다.
그런 다음 디버거는 사용자에게 대상 월드에 대한 완전한 엑세스 권한을 제공하여, 각 대상 메모리 주소를 보조 저장소의 적절한 위치에 연결해 줍니다.
주의를 기울이면 대상을 다시 돌려놓고 실행을 계속하는 것도 할 수 있습니다.
썩 좋은 디버깅 방법이라 할 수는 없지만, 매우 간단한 월드 스왑 매커니즘만 작동한다면 시스템의 매우 낮은 레벨에서도 편리하게 디버깅할 수 있습니다. 디버깅 대상의 정상적인 기능에 의존하지 않기 때문입니다.
월드 스왑 디버거는 특히 부트스트래핑 중에 유용합니다.
이러한 디버거에는 다양한 변형이 있습니다.
예를 들어 디버거를 다른 머신에서 실행하는 것도 가능한데, 작은 'tele-debugging' 도구가 대상 월드에 있다면 네트워크를 통해 디버거로부터 전달받은 ReadWord, WriteWord, Stop, Go 명령을 실행할 수 있기 때문입니다.
또는 디버깅 대상이 time-sharing 시스템의 프로세스인 경우, 디버거를 다른 프로세스에서 실행할 수도 있습니다.

#### 2.4 Making implementations work

**2.4 구현이 작동하게 만들기**

##### * Plan to throw one away

> > Perfection must be reached by degrees; she requires the slow hand of time.
> > (Voltaire)

완벽함은 단계적으로 도달해야 한다. 그것은 시간의 느린 손길을 필요로 한다. (볼테르)

>
· Plan to throw one away; you will anyhow [6].
If there is anything new about the function of a system, the first implementation will have to be redone completely to achieve a satisfactory (that is, acceptably small, fast, and maintainable) result.
It costs a lot less if you plan to have a prototype.
Unfortunately, sometimes two prototypes are needed, especially if there is a lot of innovation.
If you are lucky you can copy a lot from a previous system; thus Tenex was based on the sds 940 [2].
This can even work even if the previous system was too grandiose; Unix took many ideas from Multics [44].

어차피 버린다고 생각하고, 하나를 버릴 계획을 세워라.
시스템의 기능에 새로운 것이 있다면 만족할만한(즉, 적당히 작고 빠르며 유지보수가 가능한) 결과를 얻기 위해 첫 번째 구현을 완전히 다시 해야 할 수도 있습니다.
프로토타을 계획에 포함시키면 비용이 훨씬 적게 들어갑니다.
불행하게도 어떤 경우에는 프로토타입이 두 개 필요하기도 합니다.
특히 혁신이 많은 경우에 그러합니다.
만약 운이 좋다면 이전 시스템에서 많은 부분을 참고할 수 있습니다.
예를 들어 Tenex는 sds 940을 기반으로 삼았습니다.
이전 시스템이 너무 거대했다고 해도 통하는 효과적인 방법이 바로 프로토타이핑입니다.
Unix는 Multics에서 많은 아이디어를 가져왔습니다.

>
Even when an implementation is successful, it pays to revisit old decisions as the system evolves; in particular, optimizations for particular properties of the load or the environment (memory size, for example) often come to be far from optimal.

구현이 성공적이었다 하더라도, 시스템이 발전함에 따라 이전 결정들을 재검토하는 것이 유익합니다.
특히, 시스템 부하나 환경의 특정 속성(예를 들어 메모리 크기)에 대한 최적화가 종종 최적이 아닌 경우가 많기 때문입니다.

##### * Keep secrets

> > Give thy thoughts no tongue,
> > Nor any unproportion’d thought his act.

생각을 말로 표현하지 말고,  
무리한 생각을 행동으로 옮기지 말거라.

>
· Keep secrets of the implementation.
Secrets are assumptions about an implementation that client programs are not allowed to make (paraphrased from [5]).
In other words, they are things that can change;
the interface defines the things that cannot change (without simultaneous changes to both implementation and client).
Obviously, it is easier to program and modify a system if its parts make fewer assumptions about each other.
On the other hand, the system may not be easier to design—it’s hard to design a good interface.
And there is a tension with the desire not to hide power.

구현을 비밀로 유지하라.
지켜야 할 '비밀'이란 것은 클라이언트 프로그램이 염두에 둬서는 안 되는 구체적인 구현에 대한 가정입니다.
이런 것들은 변경될 수 있는 가정이기 때문입니다.
클라이언트와 구현을 동시에 변경하지 않는 한 변경할 수 없는 것을 정의하는 것이 바로 인터페이스입니다.

시스템의 각 부분이 서로에 대해 가정하는 것이 적을수록, 시스템을 프로그래밍하고 수정하기가 분명히 더 쉬울 것입니다.
그러나 그런 시스템을 설계하는 것 자체는 쉬운 일이 아닙니다.
좋은 인터페이스를 설계하는 것이 어렵기 때문입니다.
또한, 강력함을 숨기고 싶지 않은 욕구와 충돌하는 문제도 있습니다.

> > An efficient program is an exercise in logical brinkmanship. (E. Dijkstra)

효율적인 프로그램을 작성하는 것은 논리적인 극한에 도전하는 연습이다.

>
There is another danger in keeping secrets.
One way to improve performance is to increase the number of assumptions that one part of a system makes about another; the additional assumptions often allow less work to be done, sometimes a lot less.
For instance, if a set of size n is known to be sorted, a membership test takes time log n rather than n.
This technique is very important in the design of algorithms and the tuning of small modules.
In a large system the ability to improve each part separately is usually more important.
Striking the right balance remains an art.

그런데 비밀을 유지하기 어려운 또 다른 위험이 있습니다.
성능을 향상시키는 방법 중 하나는 시스템의 한 부분이 다른 부분에 대해 전제하는 가정의 수를 늘리는 것입니다.
추가된 가정으로 인해 작업량이 줄어들곤 하는데, 어떤 경우에는 상당히 많이 줄이기도 합니다.
예를 들어, 크기가 n 인 집합이 이미 정렬된 것으로 알려져 있다면, 집합의 원소인지 확인하는데 걸리는 시간이 n 에서 log n 으로 줄어듭니다.
이런 기법은 알고리즘 설계와 소규모 모듈 최적화에서 매우 중요합니다.
그리고 대규모 시스템에서는 일반적으로 각 부분을 독립적으로 개선하는 능력이 매우 중요합니다.
적절한 균형점을 찾는 것은 여전히 예술의 영역입니다.

##### * Divide and conquer

> > O throw away the worser part of it,  
> > And live the purer with the other half. (III iv 157)

더 나쁜 부분을 버리거라,  
그리고 남은 반을 더 순수하게 살아가거라.

>
· Divide and conquer.
This is a well known method for solving a hard problem: reduce it to several easier ones.
The resulting program is usually recursive.
When resources are limited the method takes a slightly different form: bite off as much as will fit, leaving the rest for another iteration.

분할하여 정복하라.
분할 정복은 어려운 문제를 해결하는 잘 알려진 방법입니다.
바로 어려운 문제를 쉬운 문제 여러 개로 쪼개는 것입니다.
분할 정복을 선택한 프로그램은 보통 재귀적입니다.
자원이 제한되어 있을 때, 이 기법은 좀 다른 형태를 갖게 됩니다.
가능한 한 많이 잘라내 처리하고, 나머지는 다음 반복에서 처리하는 방식입니다.

>
A good example is in the Alto’s Scavenger program, which scans the disk and rebuilds the index and directory structures of the file system from the file identifier and page number recorded on each disk sector [29].
A recent rewrite of this program has a phase in which it builds a data structure in main storage, with one entry for each contiguous run of disk pages that is also a contiguous set of pages in a file.
Normally files are allocated more or less contiguously and this structure is not too large.
If the disk is badly fragmented, however, the structure will not fit in storage.
When this happens, the Scavenger discards the information for half the files and continues with the other half.
After the index for these files is rebuilt, the process is repeated for the other files.
If necessary the work is further subdivided; the method fails only if a single file’s index won’t fit.

Alto의 디스크 조각 모음 프로그램이 이 기법의 좋은 사례라 할 수 있습니다.
조각 모음 프로그램은 디스크를 스캔한 다음, 디스크의 각 섹터에 기록된 파일 식별자와 페이지 번호를 확인하고, 파일 시스템의 인덱스와 디렉토리 구조를 다시 빌드하는 방식으로 돌아갑니다.
이 프로그램은 최근에 다시 작성되었는데, 메인 저장 장치에 먼저 데이터 구조를 구축하는 단계를 갖고 있습니다.
그리고 이 데이터 구조에서는 디스크 페이지와 파일 내 페이지가 모두 연속적으로 이어져 있다면 하나의 엔트리로 구성되게 됩니다.
일반적으로는 파일이 연속적으로 할당된 정도가 적당하기 때문에, 이 데이터 구조는 지나치게 큰 사이즈가 되지는 않습니다.
그러나 디스크가 조각나있는 상태가 심각하다면, (엔트리가 너무 많아지므로) 이 데이터 구조는 저장 장치에 들어갈 수 없게 됩니다.
이런 일이 발생하면, 조각 모음 프로그램은 작업 파일들 절반을 처리하기 위한 정보를 버리고, 나머지 절반에 대해서만 작업을 처리합니다.
그리고 처리한 파일들의 인덱스가 빌드 완료되면, (포기했던) 나머지 파일들에 대해 작업을 계속 진행합니다.
물론 이번에도 필요하다면 작업을 또 쪼개서 수행합니다.
이 방법은 파일 하나의 인덱스가 너무 커서 디스크에 들어갈 수 없는 경우에만 실패합니다.

>
Another interesting example arises in the Dover raster printer [26, 53], which scan-converts lists of characters and rectangles into a large m ´ n array of bits, in which ones correspond to spots of ink on the paper and zeros to spots without ink.
In this printer m=3300 and n=4200, so the array contains fourteen million bits and is too large to store in memory.
The printer consumes bits faster than the available disks can deliver them, so the array cannot be stored on disk.
Instead, the entire array is divided into 16 ´ 4200 bit slices called bands, and the printer electronics contains two one-band buffers.
The characters and rectangles are sorted into buckets, one for each band; a bucket receives the objects that start in the corresponding band.
Scan conversion proceeds by filling one band buffer from its bucket, and then playing it out to the printer and zeroing it while filling the other buffer from the next bucket.
Objects that spill over the edge of one band are added to the next bucket; this is the trick that allows the problem to be subdivided.

또 다른 흥미로운 사례는 Dover 래스터 프린터입니다.
이 프린터는 문자와 직사각형 리스트를 m x n 크기의 배열로 스캔-변환하는데,
비트가 1인 곳은 종이에 잉크를 찍는 부분이고, 0이면 잉크를 찍지 않는 부분이라 할 수 있습니다.
이 프린터에서 m=3300 이고 n=4200 입니다.
그러므로 비트 배열은 1400만 개의 비트를 포함하는데 사이즈가 너무 크기 때문에 메모리에 그대로 저장할 수 없습니다.
게다가 프린터가 비트를 사용해 (출력하는) 속도가 디스크에서 비트를 전달하는 속도보다 빠르기 때문에,
이 배열을 디스크에 저장할 수도 없습니다.
이 문제를 이렇게 해결합니다.
배열 전체를 'band'라고 부르는 16 x 4200 사이즈의 비트 조각들로 쪼갭니다.
그리고 프린터의 전자 회로에 1 band 용량의 버퍼를 2개 탑재하게 합니다.

이제 문자와 직사각형을 각 band별로 순서대로 버킷으로 퍼담아 프린터로 전달하게 됩니다.
버킷은 일단 주어진 band에서 시작하는 객체를 전달받습니다.
스캔 변환은 버킷을 통해 band 버퍼를 하나를 다 채운 다음, 프린터로 출력합니다.
그리고 다음 버킷을 통해 다른 band 버퍼를 채우면서, 출력을 마친 이전 버퍼는 0으로 초기화합니다.
만약 band 하나의 끝을 넘어서는 객체가 있다면 다음 버킷에 추가되는데, 이런 방식으로 문제를 쪼개고 있다고 할 수 있습니다.

>
Sometimes it is convenient to artificially limit the resource, by quantizing it in fixed-size units;
this simplifies bookkeeping and prevents one kind of fragmentation.
The classical example is the use of fixed-size pages for virtual memory, rather than variable-size segments.
In spite of the apparent advantages of keeping logically related information together, and transferring it between main storage and backing storage as a unit, paging systems have worked out better.
The reasons for this are complex and have not been systematically studied.

가끔은 고정된 크기를 갖는 단위로 의도적으로 자원을 정량화해서 사용하는 것이 편리할 때가 있습니다.
이렇게 하면 bookkeeping[^what-bookkeeping]이 단순해지고, 일종의 단편화를 방지할 수도 있습니다.
고전적인 사례로는 가상 메모리에서 가변크기의 '세그먼트'가 아닌, 고정된 크기의 '페이지'를 사용하는 것이 있습니다.
논리적으로 연관된 정보를 함께 보관하고 메인 스토리지와 백업 스토리지 사이에서 한 덩어리로 전송할 수 있는 전자가 더 장점이 있을 것처럼 보이지만, 실제로는 페이징 시스템이 더 잘 작동했습니다.
이런 이유는 복잡하며 아직 체계적으로 연구되지 않았습니다.

##### * Use a good idea again

> > And makes us rather bear those ills we have  
> > Than fly to others that we know not of. (III i 81)[^hamlet-and-makes-us]

그래서 우리는 알고 있는 고난을 참게 되며,  
알 수 없는 다른 고난을 마주하는 것을 피하게 된다.

>
· Use a good idea again instead of generalizing it.
A specialized implementation of the idea may be much more effective than a general one.
The discussion of caching below gives several examples of applying this general principle.
Another interesting example is the notion of replicating data for reliability.
A small amount of data can easily be replicated locally by writing it on two or more disk drives [28].
When the amount of data is large or the data must be recorded on separate machines, it is not easy to ensure that the copies are always the same.
Gifford [16] shows how to solve this problem by building replicated data on top of a transactional storage system, which allows an arbitrarily large update to be done as an atomic operation (see section 4).
The transactional storage itself depends on the simple local replication scheme to store its log reliably.
There is no circularity here, since only the idea is used twice, not the code.
A third way to use replication in this context is to store the commit record on several machines [27].

좋은 아이디어는 일반화하기보다 재사용하라.
특정 상황에 맞춘 아이디어 구현이 일반화된 구현보다 훨씬 더 효과적일 수 있습니다.
아래에 이어지는 캐싱에 대한 논의에서 이 원칙이 적용된 몇 가지 사례를 확인할 수 있습니다.
이번에 소개하는 흥미로운 사례는 '신뢰성을 위해 데이터를 복제한다'는 개념입니다.
소량의 데이터는 2개 이상의 디스크 드라이브에 쓰는 것만으로도 간단하게 로컬에서 복제를 완료할 수 있습니다.
그러나 데이터의 양이 많다던가 데이터를 별도의 머신에 기록해야 하는 상황이라면, 항상 복사본이 원본과 똑같은지를 확인하기 어렵습니다.

Gifford는 트랜잭션 스토리지 시스템 위에 데이터 복제를 구축하는 방식으로 이 문제를 해결하는 방법을 제시했는데(section 4 참고),
이 방식을 통해 아무리 큰 규모의 업데이트도 원자적으로 수행할 수 있게 됐습니다.

이 트랜잭션 스토리지 자체는 로그를 안정적으로 저장하기 위해 간단한 로컬 복제 방식을 사용합니다.
여기에는 순환성이 없습니다.
왜냐하면 코드가 아니라 아이디어만 두 번 사용되었기 때문입니다.
이러한 문제를 해결하는 세 번째 방법은 커밋 레코드를 여러 머신에 저장하는 것입니다.

>
The user interface for the Star office system [47] has a small set of operations (type text, move, copy, delete, show properties) that apply to nearly all the objects in the system: text, graphics, file folders and file drawers, record files, printers, in and out baskets, etc.
The exact meaning of an operation varies with the class of object, within the limits of what the user might find natural.
For instance, copying a document to an out basket causes it to be sent as a message; moving the endpoint of a line causes the line to follow like a rubber band.
Certainly the implementations are quite different in many cases.
But the generic operations do not simply make the system easier to use;
they represent a view of what operations are possible and how the implementation of each class of object should be organized.

Star 오피스 시스템의 사용자 인터페이스에는 텍스트, 그래픽, 파일 폴더, 레코드 파일, 프린터, 발신함, 수신함 등 시스템의 거의 모든 객체에 적용되는 작은 작업 세트(텍스트 타이핑, 이동하기, 복사하기, 삭제하기, 속성 보기)를 갖고 있습니다.
각 작업의 의미는 사용자가 자연스럽게 사용하는 범위 내에서 객체의 종류에 따라 달라집니다.
예를 들어 문서를 발신함에 복사하면 그 문서가 메시지로 전송되며,
선의 끝점을 이동시켜보면 선이 고무줄처럼 따라서 움직입니다.
물론, 이러한 기능들은 각각 구현하는 방법이 다 달랐습니다.
하지만 일반적인 기능들은 단지 시스템 사용의 편의성을 증가시키는 것 뿐만 아니라
어떤 작업들이 가능한지와 각 객체의 종류에 따른 구현에 대한 관점을 제공합니다.

#### 2.5 Handling all the cases

**모든 케이스를 취급하기**

##### * Handle normal and worst cases separately

> > Diseases desperate grown  
By desperate appliance are reliev’d  
or not at all. (III vii 9)

질병이 절망적으로 심해지면  
절망적인 치료법으로만 고칠 수 있다.  
그 외의 방법은 전혀 없다.

> > Therefore this project  
Should have a back or second, that might hold,  
If this should blast in proof. (IV iii 151)

그러므로 이 계획은  
실패할 경우를 대비해 대비책이나 두번째 대안을 마련해야 한다.
시도가 실패할 수 있으니까.

>
· Handle normal and worst cases separately as a rule, because the requirements for the two are quite different:
>
- The normal case must be fast.
- The worst case must make some progress.

일반적인 케이스와 최악의 케이스는 별도로 처리는 것을 원칙으로 하라. 왜냐하면 두 경우의 요구 사항이 상당히 다르기 때문이다.

- 일반적인 케이스는 빨라야 합니다.
- 최악의 경우라 하더라도 진전이 좀 있어야 합니다.

>
In most systems it is all right to schedule unfairly and give no service to some of the processes, or even to deadlock the entire system, as long as this event is detected automatically and doesn’t happen too often.
The usual recovery is by crashing some processes, or even the entire system.
At first this sounds terrible, but one crash a week is usually a cheap price to pay for 20% better performance.
Of course the system must have decent error recovery (an application of the end-to-end principle; see section 4), but that is required in any case, since there are so many other possible causes of a crash.

대부분의 시스템에서는 스케쥴을 불공정하게 예약해서 일부 프로세스에게 서비스를 제공하지 않거나 전체 시스템을 데드락에 빠뜨린다 하더라도, 이런 상황이 너무 자주 발생하지 않고 자동으로 감지된다면 문제가 되지 않습니다.
이런 상황의 일반적인 복구 방법은 일부 프로세스나 전체 시스템을 강제 종료하는 것입니다.
끔찍한 방법처럼 들리겠지만, 일주일에 한 번의 강제 종료로 20%의 성능 향상을 얻을 수 있어서 비용 대비 효과적인 선택이기도 합니다.
물론 시스템은 적절한 에러 복구 기능(엔드 투 엔드 원칙의 응용. 4장 참고)을 가져야 하는데, 충돌의 원인이 다양하기 때문에 이건 원래 필요한 기능이라 할 수 있습니다.

>
Caches and hints (section 3) are examples of special treatment for the normal case, but there are many others.
The Interlisp-D and Cedar programming systems use a reference-counting garbage collector [11] that has an important optimization of this kind.
Pointers in the local frames or activation records of procedures are not counted; instead, the frames are scanned whenever garbage is collected.
This saves a lot of reference-counting, since most pointer assignments are to local variables.
There are not very many frames, so the time to scan them is small and the collector is nearly real-time.
Cedar goes farther and does not keep track of which local variables contain pointers; instead, it assumes that they all do.
This means that an integer that happens to contain the address of an object which is no longer referenced will keep that object from being freed.
Measurements show that less than 1% of the storage is incorrectly retained [45].

캐시와 힌트(section 3)는 일반적인 케이스를 위한 특별한 처리의 예이지만,
다른 경우도 많이 있습니다.
Interlisp-D와 Cedar 프로그래밍 시스템은 reference-counting 기반의 가비지 컬렉터를 사용하는데, 이런 종류의 중요한 최적화가 포함되어 있습니다.
로컬 프레임의 포인터나 프로시저의 활성 레코드에 있는 포인터는 카운트하지 않는 것입니다.
대신, 가비지를 수집할 때마다 프레임들을 스캔합니다.
포인터 할당은 대부분 로컬 변수에 대해 이루어지기 때문에, 이렇게 하면 reference-counting 작업을 많이 절약할 수 있습니다.
프레임의 수는 많지 않기 때문에, 스캔하는 데 걸리는 시간이 짧으므로 가비지 컬렉터는 거의 실시간으로 작동하게 됩니다.
Cedar는 여기에서 더 나아가서, 어떤 로컬 변수에 포인터가 포함되어 있는지를 추적하지 않고 아예 모든 변수에 포인터가 포함되어 있다고 가정하고 작동합니다.
즉, 만약에 더 이상 참조되지 않는 객체의 주소값을 갖고 있는 integer가 있다면, 해당 객체가 해제되지 않는 것입니다.
측정을 해보니 1% 미만의 스토리지가 잘못 유지되는 것을 알 수 있었습니다.

>
Reference-counting makes it easy to have an incremental collector, so that computation need not stop during collection.
However, it cannot reclaim circular structures that are no longer reachable.
Cedar therefore has a conventional trace-and-sweep collector as well.
This is not suitable for real time applications, since it stops the entire system for many seconds, but in interactive applications it can be used during coffee breaks to reclaim accumulated circular structures.

Reference-counting 덕분에 증분 컬렉터를 쉽게 구현할 수 있게 되어, 컬렉션이 진행되는 동안 계산을 중단할 필요가 없어졌습니다.
그러나 접근 불가능한 순환 구조를 갖는 참조를 회수할 수 없다는 문제가 있습니다.
따라서 Cedar는 기존의 trace-and-sweep 컬렉터도 함께 사용합니다.
이 방법은 전체 시스템을 수 초 동안 정지시키기 때문에 실시간 애플리케이션에는 적합하지 않지만,
대화형 애플리케이션에서는 커피 마시러 간 사이에(휴식 시간에) 누적된 순환 참조를 회수하는 데 활용할 수 있습니다.

>
Another problem with reference-counting is that the count may overflow the space provided for it.
This happens very seldom, because only a few objects have more than two or three references.
It is simple to make the maximum value sticky.
Unfortunately, in some applications the root of a large structure is referenced from many places; if the root becomes sticky, a lot of storage will unexpectedly become permanent.
An attractive solution is to have an ‘overflow count’ table, which is a hash table keyed on the address of an object.
When the count reaches its limit it is reduced by half, the overflow count is increased by one, and an overflow flag is set in the object.
When the count reaches zero, the process is reversed if the overflow flag is set.
Thus even with as few as four bits there is room to count up to seven, and the overflow table is touched only in the rare case that the count swings by more than four.

reference-counting의 또 다른 문제점은, 카운트가 할당된 공간을 초과할 수 있다는 것입니다.
이런 경우는 매우 드물게 발생하는데, 참조가 2~3개를 초과하는 객체가 매우 적기 때문입니다.
최대값을 고정시키면 이 문제를 간단하게 해결할 수 있습니다.
그러나 안타깝게도 일부 애플리케이션에서는 큰 구조의 루트 객체가 많은 곳에서 참조되는 경우가 있습니다.
만약 루트 객체가 다른 많은 객체의 참조를 단단하게 쥐고 있다면, 상당한 양의 스토리지를 영구적으로 차지하게 되는 예상치 못한 문제가 발생합니다.

이에 대한 매력적인 해결책은 '오버플로 카운트 테이블'을 도입하는 것입니다.
{:id="overflow-count-table"}

이 테이블은 객체의 주소를 key로 삼는 해시 테이블입니다.
'참조 카운트'가 설정된 최대값에 도달하면 '참조 카운트'를 반으로 줄이고,
'오버플로 카운트'를 1 증가시키며, 해당 객체에 오버플로 플래그를 설정합니다.
'참조 카운트'가 0 이 되었을 때, 오버플로 플래그가 설정되어 있다면 이 과정을 반대로 수행합니다.
그러므로 4 비트만 있어도 최대 7까지 참조를 카운트할 수 있으며,
참조 카운트가 4보다 많이 변경되는 드문 경우에만 오버플로 테이블을 사용하게 됩니다.

>
There are many cases when resources are dynamically allocated and freed (for example, real memory in a paging system), and sometimes additional resources are needed temporarily to free an item (some table might have to be swapped in to find out where to write out a page).
Normally there is a cushion (clean pages that can be freed with no work), but in the worst case the cushion may disappear (all pages are dirty).
The trick here is to keep a little something in reserve under a mattress, bringing it out only in a crisis.
It is necessary to bound the resources needed to free one item;
this determines the size of the reserve under the mattress, which must be regarded as a fixed cost of the resource multiplexing.
When the crisis arrives, only one item should be freed at a time, so that the entire reserve is devoted to that job; this may slow things down a lot but it ensures that progress will be made.

다음 사례를 살펴봅시다.
리소스를 동적으로 할당하고 해제하는 경우가 많은데(예: 페이징 시스템의 실제 메모리),
때로는 아이템 하나를 해제하기 위해 일시적으로 추가 리소스가 필요한 경우도 있습니다(페이지를 쓸 위치를 찾기 위해 몇몇 테이블을 스왑해야 할 수도 있음).
보통은 쿠션(작업 없이 해제 가능한 깨끗한 페이지)이 있지만,
쿠션이 없는 최악의 경우도 있을 수 있습니다(모든 페이지가 더려워진 상황).
여기에서 중요한 전략은, 매트리스 아래에 약간의 여분을 남겨뒀다가 이런 위기 상황이 발생했을 경우에만 쓰는 것입니다.
이걸 하려면 아이템 하나를 해제하는 데 필요한 리소스의 양을 정해놔야 합니다.
이 양을 정해야 매트리스 밑 예비 공간의 크기도 결정할 수 있고, 이 크기를 리소스 다중화를 위한 고정 비용으로 간주하게 됩니다.
위기 상황이 발생하면 이 공간을 활용해 한 번에 하나의 아이템만이라도 해제할 수 있게 됩니다.
이 방법은 속도가 몹시 느리겠지만, 어떻게든 돌아가기는 할 것입니다.

>
Sometimes radically different strategies are appropriate in the normal and worst cases.
The Bravo editor [24] uses a ‘piece table’ to represent the document being edited.
This is an array of pieces, pointers to strings of characters stored in a file;
each piece contains the file address of the first character in the string and its length.
The strings are never modified during normal editing.
Instead, when some characters are deleted, for example, the piece containing the deleted characters is split into two pieces, one pointing to the first undeleted string and the other to the second.
Characters inserted from the keyboard are appended to the file, and the piece containing the insertion point is split into three pieces: one for the preceding characters, a second for the inserted characters, and a third for the following characters.
After hours of editing there are hundreds of pieces and things start to bog down.
It is then time for a cleanup, which writes a new file containing all the characters of the document in order.
Now the piece table can be replaced by a single piece pointing to the new file, and editing can continue.
Cleanup is a specialized kind of garbage collection.
It can be done in background so that the user doesn’t have to stop editing (though Bravo doesn’t do this).

때로는 정상적인 경우와 최악의 경우에 대해 근본적으로 다른 전략이 필요할 수도 있습니다.
Bravo 에디터는 편집중인 문서를 나타내기 위해 '조각 테이블'이란 것을 사용합니다.
이 테이블은 '조각'들로 이루어진 배열인데, '조각'이란 파일에 저장된 string들을 가리키는 포인터를 말합니다.
각각의 '조각'에는 string의 첫 번째 글자의 파일 주소, 그리고 string의 길이가 포함되어 있습니다.
Bravo 에디터에서 일반적인 편집을 하는 중에는 string이 수정되지 않습니다.
그런데 예를 들어서 문자를 삭제할 때, 삭제된 문자가 들어있었던 '조각'이 두 개의 '조각'으로 나뉘게 됩니다.
첫번째 '조각'은 삭제되지 않은 원래의 string을 가리키고,
두번째 '조각'은 삭제된 문자 다음 부분의 string을 가리키게 됩니다.
키보드로 입력한 문자는 파일에 추가되고 추가된 지점을 포함하는 '조각'은
앞의 문자를 위한 '조각', 추가된 문자를 위한 '조각', 그리고 뒤의 문자를 위한 '조각' 이렇게 3개의 '조각'으로 나뉘게 됩니다.
몇 시간 동안 문서를 편집하다 보면 수 백개의 '조각'이 생겨나게 되어 시스템이 매우 느려지게 됩니다.
그러면 '정리 작업'을 하게 되는데, 문서의 모든 문자를 순서대로 새로운 파일에 쓰는 방식입니다.
정리가 끝나면 '조각 테이블'을 새로 만든 파일을 가리키는 하나의 '조각'으로 교체하고, 편집을 계속할 수 있게 됩니다.
'정리 작업'은 특수한 종류의 가비지 컬렉션이라 할 수 있습니다.
이 작업은 백그라운드에서 실행되기 때문에 사용자가 편집을 중단하지 않아도 됩니다(하지만 Bravo 에디터는 이 작업을 백그라운드에서 실행하지 않습니다).

### 3. Speed

**3. 속도**

>
This section describes hints for making systems faster, forgoing any further discussion of why this is important.
Bentley’s excellent book [55] says more about some of these ideas and gives many others.

이 섹션에서는 시스템을 더 빠르게 만들기 위한 힌트를 설명하며, 이것이 왜 중요한지에 대한 설명은 생략합니다.
Bentley의 훌륭한 책에서 이런 아이디어 중 몇몇을 자세히 설명하고, 관련 주제들도 소개하고 있습니다.

#### * Split resources

> > Neither a borrower, nor a lender be;  
For loan oft loses both itself and friend,  
And borrowing dulleth edge of husbandry.

빌리지도 말고, 빌려주지도 말거라.  
돈을 빌리면 돈과 친구 모두를 잃게 되곤 한단다.  
빌리는 것은 절약의 날카로움을 무디게 한다.

>
· Split resources in a fixed way if in doubt, rather than sharing them.
It is usually faster to allocate dedicated resources, it is often faster to access them, and the behavior of the allocator is more predictable.
The obvious disadvantage is that more total resources are needed, ignoring multiplexing overheads, than if all come from a common pool.
In many cases, however, the cost of the extra resources is small, or the overhead is larger than the fragmentation, or both.

자원을 고정적으로 분할해서 사용하라. 확실하지 않은 경우라면 리소스를 공유하는 것보다 공유하지 않는 것이 낫습니다.
일반적으로 전용으로 분할된 리소스는 빠르게 할당할 수 있고, 접근이 빠르며, 할당기의 동작도 더 예측하기 쉽습니다.

단편화에 분명한 단점이 있긴 합니다. 다중화 오버헤드를 따로 고려하지 않을 때, 공유 풀에서 자원을 가져오는 것에 비해 더 많은 전체 자원이 필요하다는 것입니다.
그러나 대부분의 경우 자원 단편화로 인한 추가 리소스의 비용이 적은 편이고, 단편화 때문에 낭비되는 비용보다 다중화 오버헤드가 더 크기도 합니다. 두 가지가 모두 해당되는 경우도 많습니다.

>
For example, it is always faster to access information in the registers of a processor than to get it from memory, even if the machine has a high-performance cache.
Registers have gotten a bad name because it can be tricky to allocate them intelligently, and because saving and restoring them across procedure calls may negate their speed advantages.
But when programs are written in the approved modern style with lots of small procedures, 16 registers are nearly always enough for all the local variables and temporaries, so that allocation is not a problem.
With n sets of registers arranged in a stack, saving is needed only when there are n successive calls without a return [14, 39].

예를 들어, 컴퓨터에 고성능 캐시가 있더라도 메모리에서 정보를 가져오는 것보다 프로세서의 레지스터에 있는 정보에 접근하는 것이 무조건 더 빠릅니다.
레지스터는 악명이 높은 편인데, 지능적으로 할당하기가 꽤 어렵고 프로시저가 실행될 때마다 레지스터를 저장하고 복원하고 저장하고 복원하고 하면 속도라는 장점이 사라지기 때문입니다.
그러나 작은 프로시저를 많이 사용하는 현대적 스타일로 작성된 프로그램이라면, 16개의 레지스터는 대부분의 경우에 모든 로컬 변수와 임시 변수를 담기에 충분하므로 레지스터 할당은 문제가 되지 않습니다.
스택에 레지스터 집합 n 개가 들어가는 구조에서 `return` 없이 n번의 호출이 연속되는 경우에만 레지스터 저장이 필요하게 됩니다.

>
Input/output channels, floating-point coprocessors, and similar specialized computing devices are other applications of this principle.
When extra hardware is expensive these services are provided by multiplexing a single processor, but when it is cheap, static allocation of computing power for various purposes is worthwhile.

I/O 채널, 부동소수점 코프로세서와 같은 특수한 컴퓨팅 장치는 이 원칙의 다른 예시라 할 수 있습니다.
추가적인 하드웨어가 값비싸다면 하나의 프로세서를 다중화하는 방식으로 서비스를 제공할 수 있을 것입니다. 그러나 하드웨어가 저렴하다면 다양한 용도로 컴퓨팅 파워를 정적으로 할당하는 것이 더 낫습니다.

>
The Interlisp virtual memory system mentioned earlier [7] needs to keep track of the disk address corresponding to each virtual address.
This information could itself be held in the virtual memory (as it is in several systems, including Pilot [42]), but the need to avoid circularity makes this rather complicated.
Instead, real memory is dedicated to this purpose.
Unless the disk is ridiculously fragmented the space thus consumed is less than the space for the code to prevent circularity.

앞에서 언급했던 Interlisp 가상 메모리 시스템은 각각의 가상 주소에 해당하는 디스크의 주소를 추적해야 합니다.
이 정보 자체도 가상 메모리에 저장될 수 있습니다만(Pilot을 포함한 여러 시스템에서는 이런 방법을 씁니다), 순환 참조를 피하기 위해 꽤 복잡한 처리를 해야 합니다.
따라서 Interlisp에서는 그렇게 하지 않고 실제 메모리를 이 용도에 전용으로 할당합니다.
디스크가 터무니 없을 정도로 단편화되지 않는 이상, 이 용도로 사용되는 공간은 순환 참조를 방지하기 위해 추가되었을 공간보다는 작은 영역을 사용합니다.

#### * Use static analysis

>
· Use static analysis if you can; this is a generalization of the last slogan.
Static analysis discovers properties of the program that can usually be used to improve its performance.
The hooker is "if you can"; when a good static analysis is not possible, don’t delude yourself with a bad one, but fall back on a dynamic scheme.

가능하다면 정적 분석을 사용하라. 이것은 이전 슬로건을 일반화한 것입니다.
정적 분석은 프로그램의 성능을 개선하는 데 사용할 수 있는 프로그램의 특성을 발견합니다.
여기에서 "가능하다면"이라는 말이 중요합니다.
좋은 정적 분석이 불가능한 상황이라면 나쁜 정적 분석으로 자신을 속이거나 하지 말고 동적 분석 방법을 사용하세요.

>
The remarks about registers above depend on the fact that the compiler can easily decide how to allocate them, simply by putting the local variables and temporaries there.
Most machines lack multiple sets of registers or lack a way of stacking them efficiently.
Good allocation is then much more difficult, requiring an elaborate inter-procedural analysis that may not succeed, and in any case must be redone each time the program changes.
So a little bit of dynamic analysis (stacking the registers) goes a long way.
Of course the static analysis can still pay off in a large procedure if the compiler is clever.

앞에서 언급했던 레지스터 이야기는 컴파일러가 로컬 변수와 임시 변수를 쉽게 할당할 수 있다는 사실에 기반합니다.
단순하게 로컬 변수와 임시 변수를 레지스터에 넣으면 되는 것입니다.
그러나 대부분의 머신은 여러 개의 레지스터 셋을 갖고 있지 않거나, 효율적으로 스택을 쌓는 방법이 없습니다.
따라서 좋은 할당은 꽤나 어려운 일이며, 성공할 보장이 없을 수도 있는 복잡한 프로시저 간 분석이 필요하고, 프로그램이 변경될 때마다 다시 돌려봐야 합니다.
따라서 작은 규모의 동적 분석(레지스터 스택)이 큰 도움이 될 수 있습니다.
물론 컴파일러가 똑똑하다면 큰 규모의 프로시저에서도 정적 분석이 효과가 있을 것입니다.

>
A program can read data much faster when it reads the data sequentially.
This makes it easy to predict what data will be needed next and read it ahead into a buffer.
Often the data can be allocated sequentially on a disk, which allows it to be transferred at least an order of magnitude faster.
These performance gains depend on the fact that the programmer has arranged the data so that it is accessed according to some predictable pattern, that is, so that static analysis is possible.
Many attempts have been made to analyze programs after the fact and optimize the disk transfers, but as far as I know this has never worked.
The dynamic analysis done by demand paging is always at least as good.

프로그램이 데이터를 순차적으로 읽으면 데이터를 훨씬 빠르게 읽을 수 있습니다.
순차적으로 데이터를 읽으면 다음에 어떤 데이터가 필요할지 쉽게 예측하고 버퍼에 미리 읽어들일 수 있게 됩니다.
데이터가 디스크에 순차적으로 할당되는 경우가 흔한 편인데, 이런 경우에는 데이터를 전송하는 속도가 적어도 10배 이상으로 빨라집니다.
이러한 성능 향상은 프로그래머가 데이터를 예측 가능한 패턴에 따라 접근할 수 있게 배열해놨다는 사실에 기반합니다.
즉, 정적 분석이 가능하다는 것입니다.
프로그램을 사후에 분석하여 디스크 전송을 최적화하려는 다양한 시도가 있었지만, 내가 알기로 이런 방법들은 결코 성공하지 못했습니다.
그런 방법들보다 적어도 수요 페이징(demand paging)[^what-demand-paging]에 의한 동적 분석이 언제나 더 좋았습니다.

>
Some kinds of static analysis exploit the fact that some invariant is maintained.
A system that depends on such facts may be less robust in the face of hardware failures or bugs in software that falsify the invariant.

어떤 종류의 정적 분석은 일부 불변성이 유지된다는 사실을 악용합니다.
이런 사실에 의존하는 시스템은 하드웨어 오류나 불변성을 위반하는 소프트웨어 버그에 대한 안정성이 떨어질 수 있습니다.

#### * Dynamic translation

>
· Dynamic translation from a convenient (compact, easily modified or easily displayed) representation to one that can be quickly interpreted is an important variation on the old idea of compiling.
Translating a bit at a time is the idea behind separate compilation, which goes back at least to Fortran 2.
Incremental compilers do it automatically when a statement, procedure or whatever is changed.
Mitchell investigated smooth motion on a continuum between the convenient and the fast representation [34].
A simpler version of his scheme is to always do the translation on demand and cache the result; then only one interpreter is required, and no decisions are needed except for cache replacement.

편리한(간결하거나, 쉽게 수정할 수 있거나, 쉽게 표시할 수 있는) 표현에서 빠르게 해석될 수 있는 표현으로의 동적 번역은 컴파일이라는 오래된 개념에 대한 중요한 변형이라 할 수 있습니다.
한 번에 조금씩 번역하는 것이 분할 컴파일의 기본적인 아이디어이며, 적어도 Fortran 2부터 이런 방식이 존재했습니다.
증분 컴파일러는 문장이 되었건 프로시저가 되었건 무엇이건 변경되기만 하면 자동으로 작동합니다.
Mitchell은 편리한 표현과 빠른 표현 사이를 원활하게 전환할 수 있는 절충점을 찾는 연구를 진행했습니다.
그의 연구 결과를 단순화한 버전은 항상 요청할 때에만 번역을 하고 그 결과를 캐시에 저장하는 방법을 씁니다.
그러면 한 개의 인터프리터만 필요하고, 캐시 교체 외에 다른 결정은 필요하지 않습니다.

>
For example, an experimental Smalltalk implementation [12] uses the bytecodes produced by the standard Smalltalk compiler as the convenient (in this case, compact) representation, and translates a single procedure from byte codes into machine language when it is invoked.
It keeps a cache with room for a few thousand instructions of translated code.
For the scheme to pay off, the cache must be large enough that on the average a procedure is executed at least n times, where n is the ratio of translation time to execution time for the untranslated code.

예를 들어, Smalltalk의 어떤 실험적인 구현체는 표준 Smalltalk 컴파일러가 생성하는 바이트 코드를 편리한(이 경우에는 압축한) 표현으로 사용하고, 호출될 때마다 프로시저를 바이트 코드에서 기계어로 번역합니다.
그 구현체는 번역된 코드의 명령어 수 천개를 저장할 수 있는 캐시를 유지합니다.
이 방법이 효과를 보려면 캐시가 충분할 정도로 크게 할당되어야 합니다.
그리고 프로시저가 평균적으로 최소 n회 실행되어야 합니다.
여기에서 n은 번역되지 않은 코드의 실행 시간에 대한 번역 시간의 비율입니다.
[^smalltalk-implementation]

>
The C-machine stack cache [14] provides a rather different example.
In this device instructions are fetched into an instruction cache; as they are loaded, any operand address that is relative to the local frame pointer FP is converted into an absolute address, using the current value of FP (which remains constant during execution of the procedure).
In addition, if the resulting address is in the range of addresses currently in the stack data cache, the operand is changed to register mode; later execution of the instruction will then access the register directly in the data cache.
The FP value is concatenated with the instruction address to form the key of the translated instruction in the cache, so that multiple activations of the same procedure will still work.

C-machine 스택 캐시는 좀 다른 사례를 보여줍니다.
이 장치는 명령어를 명령어 캐시로 가져옵니다.
명령어가 로드되는 동안 로컬 프레임 포인터 FP[^frame-pointer]에서 피연산자의 상대주소는 현재의 FP(프로시저 실행 중에는 상수로 유지됨)를 사용해 절대주소로 변환됩니다.
또한 그렇게 변환된 절대주소가 현재 스택 데이터 캐시에 있는 주소 범위에 포함된다면, 피연산자는 레지스터 모드로 전환됩니다.
그리고 나서 명령어가 실행되면 데이터 캐시에 있는 레지스터에 직접 접근합니다.
FP 값은 명령어 주소와 연결되며, 캐시에 있는 번역된 명령어의 키를 만들게 됩니다. 따라서 동일한 프로시저를 여러번 활성화해도 여전히 잘 작동합니다.

#### * Cache answers

> > If thou didst ever hold me in thy heart. (V ii 349)

만약 네 마음 속에 나를 담아두고 있다면.

>
· Cache answers to expensive computations, rather than doing them over.
By storing the triple $$[f, x, f(x)]$$ in an associative store with $$f$$ and $$x$$ as keys, we can retrieve $$f(x)$$ with a lookup.
This is faster if $$f(x)$$ is needed again before it gets replaced in the cache, which presumably has limited capacity.
How much faster depends on how expensive it is to compute $$f(x)$$.
A serious problem is that when $$f$$ is not functional (can give different results with the same arguments), we need a way to invalidate or update a cache entry if the value of $$f(x)$$ changes.
Updating depends on an equation of the form $$f(x + D ) = g(x, D , f(x))$$ in which $$g$$ is much cheaper to compute than $$f$$.
For example, $$x$$ might be an array of 1000 numbers, $$f$$ the sum of the array elements, and $$D$$ a new value for one of them, that is, a pair $$[i, v]$$.
Then $$g(x, [i, v], sum)$$ is $$sum - x_i + v$$.

비싼 계산을 반복하지 말고 결과를 캐시하라.
$$f$$와 $$x$$를 key로 사용해서 연관 저장소에 $$[f, x, f(x)]$$를 저장하면, 조회를 통해 $$f(x)$$를 얻을 수 있습니다.
용량에 한계가 있는 캐싱 방식을 고려해, $$f(x)$$가 캐시에서 아직 남아있을 때 $$f(x)$$를 다시 조회한다면 이전보다 더 빠르게 얻을 수 있을 것입니다.
그리고 조회가 얼마나 더 빨라지는지는 $$f(x)$$를 계산하는 비용에 달려있습니다.[^cache-fx-cost]

그런데 $$f$$가 함수적이지 않은 경우(같은 인자가 주어져도 $$f$$가 다른 결과를 리턴하는 경우)라면 심각한 문제가 발생합니다.
$$f(x)$$의 값이 바뀌어야 한다면 캐시된 내용을 무효화하거나 업데이트할 방법이 필요하게 됩니다.
캐시의 갱신은 $$f(x + D ) = g(x, D , f(x))$$ 형태의 식을 사용하며, 이 식에서는 $$f$$보다 $$g$$를 계산하는 비용이 훨씬 적습니다.
예를 들어, $$x$$ 는 1000개의 숫자 배열이고, $$f$$ 가 배열 요소의 합, $$D$$는 그 중 하나에 대한 새로운 값, 즉 $$[i, v]$$의 쌍이라 생각해 봅시다.
그러면 $$g(x, [i, v], sum)$$은 $$sum - x_i + v$$가 됩니다.[^cache-fx-example]

>
A cache that is too small to hold all the ‘active’ values will thrash, and if recomputing $$f$$ is expensive performance will suffer badly.
Thus it is wise to choose the cache size adaptively, making it bigger when the hit rate decreases and smaller when many entries go unused for a long time.

용량이 너무 작아서 모든 '활성화된'값들을 저장할 수 없는 캐시에서는 스래싱이 발생하며,
$$f$$를 다시 계산하는 비용이 크다면 성능이 크게 저하됩니다.
따라서 히트율이 감소하면 캐시 크기를 크게 조절하고, 오랫동안 사용되지 않는 항목이 많아지면 캐시 크기를 작게 조절하는 것이 현명한 선택입니다.

>
The classic example of caching is hardware that speeds up access to main storage; its entries are triples [Fetch, address, contents of address].
The `Fetch` operation is certainly not functional: `Fetch(x)` gives a different answer after `Store(x)` has been done.
Hence the cache must be updated or invalidated after a store.
Virtual memory systems do exactly the same thing; main storage plays the role of the cache, disk plays the role of main storage, and the unit of transfer is the page, segment or whatever.

캐싱의 전형적인 예는 메인 스토리지 엑세스 속도를 높이는 하드웨어입니다.
이 캐시의 엔트리는 `[Fetch, address, address의 내용]`으로 구성됩니다.
`Fetch` 연산은 확실히 함수적이지 않습니다.
`Fetch(x)`는 `Store(x)`가 실행된 후에는 다른 결과를 리턴합니다.
따라서 저장하는 작업을 한 이후에는 캐시도 함께 업데이트해주거나 무효화해야 합니다.
가상 메모리 시스템도 이와 정확히 같은 방식으로 작동합니다.
다만 메인 스토리지가 캐시의 역할을 하고, 디스크가 메인 스토리지의 역할을 하며, 페이지, 세그먼트 등이 전송 단위가 됩니다.

>
But nearly every non-trivial system has more specialized applications of caching.
This is especially true for interactive or real-time systems, in which the basic problem is to incrementally update a complex state in response to frequent small changes.
Doing this in an ad hoc way is extremely error-prone.
The best organizing principle is to recompute the entire state after each change but cache all the expensive results of this computation.
A change must invalidate at least the cache entries that it renders invalid; if these are too hard to identify precisely, it may invalidate more entries at the price of more computing to reestablish them.
The secret of success is to organize the cache so that small changes invalidate only a few entries.

그러나 거의 모든 단순하지 않은 시스템은 더 특화된 캐싱 기법을 사용합니다.
특히 상호작용적이거나 실시간성 시스템이 그런 편입니다.
이러한 시스템의 기본적인 문제는 빈번하게 발생하는 작은 변경에 대해 응답하며 복잡한 상태를 점진적으로 업데이트하는 것입니다.
이런 작업을 그때 그때의 특정 상황에 따라 수행하는 것은 매우 오류가 발생하기 쉽습니다.
변경 사항이 발생하면 전체적으로 상태를 다시 계산하지만, 계산 비용이 많이 드는 결과는 모두 캐시하는 것이 이를 조직화하는 최선의 원칙이라 할 수 있습니다.
그리고 변경으로 인해 무효화해야 하는 캐시 항목의 수를 최소화해야합니다.
만약 무효화할 항목들을 정확하게 식별하는 것이 너무 어렵다면, 더 많은 항목들을 무효화하게 될 테니, 결과적으로 더 많은 계산을 수행하게 됩니다.
성공의 비결은 작은 변경으로 인해 무효화되는 항목이 최소화되도록 캐시를 구성하는 것입니다.

>
For example, the Bravo editor [24] has a function `DisplayLine(document, firstChar)` that returns the bitmap for the line of text in the displayed document that has `document[firstChar]` as its first character.
It also returns lastChar and lastCharUsed, the numbers of the last character displayed on the line and the last character examined in computing the bitmap (these are usually not the same, since it is necessary to look past the end of the line in order to choose the line break).
This function computes line breaks, does justification, uses font tables to map characters into their raster pictures, etc.
There is a cache with an entry for each line currently displayed on the screen, and sometimes a few lines just above or below.
An edit that changes characters i through j invalidates any cache entry for which [firstChar .. lastCharUsed] intersects [i .. j].
The display is recomputed by

예를 들어 Bravo 편집기는 `DisplayLine(document, firstChar)`라는 함수를 갖고 있습니다.
이 함수는 화면에 표시된 문서의 텍스트 중 첫 번째 문자가 `document[firstChar]`인 행의 비트맵을 리턴합니다.
그리고 `lastChar`와 `lastCharUsed`도 리턴하는데, 이는 행에 표시된 마지막 문자의 번호와 비트맵을 계산할 때 검토한 마지막 문자의 번호입니다(이 두 마지막 문자는 일반적으로 같지 않은 경우가 많은데, 줄바꿈을 어디에서 할 지 결정하려면 행의 끝을 확인해야 하기 때문입니다).
이 함수는 줄바꿈 위치를 계산해 찾아내고, 정렬을 수행하고, 폰트 테이블을 사용해 문자를 래스터 이미지로 매핑하는 등의 작업을 수행합니다.
Bravo 편집기에서는 현재 화면에 표시된 각 행(화면의 위나 아래에 몇 줄이 더 있기도 합니다)에 대한 캐시 항목이 있습니다.
`i` 번째 문자부터 `j` 번째 문자까지의 문자를 변경하는 편집 작업은 `[firstChar .. lastCharUsed]`에서 `[i .. j]`에 해당되는 캐시 항목을 무효화하게 됩니다.
그래서 화면 출력은 다음과 같이 재계산됩니다.

```
loop
    (bitMap, lastChar, ) := DisplayLine(document, firstChar); Paint(bitMap); 
    firstChar := lastChar + 1
end loop
```

>
The call of `DisplayLine` is short-circuited by using the cache entry for `[document, firstChar]` if it exists.
At the end any cache entry that has not been used is discarded; these entries are not invalid, but they are no longer interesting because the line breaks have changed so that a line no longer begins at these points.

`[document, firstChar]`에 대한 캐시된 항목이 있을 때 `DisplayLine` 함수를 호출하면 캐시를 사용해 숏 서킷으로 리턴됩니다.
그리고 마지막에 사용되지 않은 모든 캐시 엔트리는 삭제됩니다.
이런 엔트리는 무효가 아니긴 하지만, 줄바꿈의 변경으로 인해 해당 지점에서 새로운 행이 시작되지 않게 되므로 버려도 상관없는 것입니다.

>
The same idea can be applied in a very different setting.
Bravo allows a document to be structured into paragraphs, each with specified left and right margins, inter-line leading, etc.
In ordinary page layout all the information about the paragraph that is needed to do the layout can be represented very compactly:
>
- the number of lines;
- the height of each line (normally all lines are the same height); 
- any keep properties;
- the pre and post leading.

같은 아이디어를 매우 다른 상황에도 적용해볼 수 있습니다.
Bravo 에디터는 문서를 여러 문단으로 구성할 수 있으며, 각 문단은 왼쪽/오른쪽 여백, 행 간격 등을 갖습니다.

일반적인 페이지 레이아웃에서는 레이아웃을 만들기 위해 필요한 문단의 정보를 매우 간결하게 표현할 수 있습니다.

- 행의 수
- 각 행의 높이 (보통 모든 행의 높이는 같다)
- 문단별 고정 속성
- 문단의 앞/뒤 여백

>
In the usual case this can be encoded in three or four bytes.
A 30 page chapter has perhaps 300 paragraphs, so about 1k bytes are required for all this data; this is less information than is required to specify the characters on a page.
Since the layout computation is comparable to the line layout computation for a page, it should be possible to do the pagination for this chapter in less time than is required to render one page.
Layout can be done independently for each chapter.

이런 정보들은 보통 3~4 바이트로 인코딩할 수 있습니다.
30 페이지 분량 정도라면 약 300개의 문단이 있으므로 약 1k 바이트가 필요하며,
이는 한 페이지의 모든 문자 데이터보다 적은 양입니다.
페이지 레이아웃 계산량은 한 페이지의 모든 행의 레이아웃을 계산하는 양과 비슷하기 때문에,
문단 정보를 활용하면 한 페이지를 렌더링하는 것보다 더 빠르게 챕터의 페이지네이션을 수행할 수 있게 됩니다.
그리고 레이아웃도 각 챕터별로 독립적으로 수행할 수 있습니다.

>
What makes this idea work is a cache of `[paragraph, ParagraphShape(paragraph)]` entries.
If the paragraph is edited, the cache entry is invalid and must be recomputed.
This can be done at the time of the edit (reasonable if the paragraph is on the screen, as is usually the case, but not so good for a global substitute), in background, or only when repagination is requested.

이 방식이 가능한 이유는 `[paragraph, ParagraphShape(paragraph)]` 형태의 캐시가 있기 때문입니다.
문단이 편집되면, 캐시 항목을 무효화하고 재계산해야 합니다.
이런 작업은 편집이 진행되는 동안 수행할 수 있으며(보통 편집중인 문단이 화면에 표시되고 있다면 이 방법이 합리적이겠지만, 문서 전체에 치환 작업을 하는 경우에는 그렇지 않습니다), 백그라운드에서 처리하거나, 페이지네이션을 다시 구성하라고 요청할 때만 수행할 수도 있습니다.

#### * Use hints

> > For the apparel oft proclaims the man.

의복은 종종 그 사람에 대해 알려준다.

>
· Use hints to speed up normal execution.
A hint, like a cache entry, is the saved result of some computation.
It is different in two ways: it may be wrong, and it is not necessarily reached by an associative lookup.
Because a hint may be wrong, there must be a way to check its correctness before taking any unrecoverable action.
It is checked against the ‘truth’, information that must be correct but can be optimized for this purpose rather than for efficient execution.
Like a cache entry, the purpose of a hint is to make the system run faster.
Usually this means that it must be correct nearly all the time.

힌트를 써라. 일반적인 실행 속도를 높이기 위해 힌트를 사용하세요.
힌트는 캐시 엔트리처럼 계산된 결과를 저장한 것입니다.
그러나 힌트와 캐시와 두 가지 차이점이 있습니다.
힌트는 틀릴 수 있습니다.
그리고 힌트는 반드시 연관 검색을 통해 도달하지 않아도 됩니다.
힌트는 잘못된 정보일 수 있기 때문에, 되돌릴 수 없는 작업을 하기 전이라면 올바른 힌트인지 아닌지를 확인할 수 있는 방법이 있어야 합니다.
힌트를 평가할 때는 '사실'을 기준으로 해야 합니다.
이러한 '사실'은 언제나 참된 정보여야만 하지만, 효율적인 실행보다는 힌트를 평가하는 목적에 맞게 최적화할 수도 있습니다.
캐시 엔트리와 같이, 힌트의 목적은 시스템이 더 빠르게 실행되도록 하는 것입니다.
대부분의 경우, 이는 힌트가 거의 항상 정확해야 한다는 것을 의미합니다.

>
For example, in the Alto [29] and Pilot [42] operating systems each file has a unique identifier, and each disk page has a ‘label’ field whose contents can be checked before reading or writing the data without slowing down the data transfer.
The label contains the identifier of the file that contains the page and the number of that page in the file.
Page zero of each file is called the ‘leader page’ and contains, among other things, the directory in which the file resides and its string name in that directory.
This is the truth on which the file systems are based, and they take great pains to keep it correct.

예를 들어, Alto와 Pilot 운영체제에서 각각의 파일은 unique 식별자를 갖고 있으며,
각각의 디스크 페이지에는 데이터 읽기/쓰기를 하기 전에 내용을 확인할 수 있는 '레이블'필드를 둬서 데이터 전송 속도 저하를 방지하고 있습니다.
레이블에는 페이지를 포함하는 파일의 식별자와 파일 내 페이지 번호가 포함되어 있습니다.
각 파일의 0번째 페이지는 '리더 페이지'라고 불리는데, 리더 페이지에는 파일이 존재하는 디렉토리와, 해당 파일의 디렉토리 속 이름 등이 포함되어 있습니다.
이것이 파일 시스템이 기반을 두고 있는 '사실'이며, 파일 시스템은 이것을 정확하게 유지하기 위해 많은 노력을 기울입니다.

>
With only this information, however, there is no way to find the identifier of a file from its name in a directory, or to find the disk address of page i, except to search the entire disk, a method that works but is unacceptably slow.
Each system therefore maintains hints to speed up these operations.
Both systems represent directory by a file that contains triples `[string name, file identifier, address of first page]`.
Each file has a data structure that maps a page number into the disk address of the page.
The Alto uses a link in each label that points to the next label; this makes it fast to get from page n to page n + 1.
Pilot uses a B-tree that implements the map directly, taking advantage of the common case in which consecutive file pages occupy consecutive disk pages.
Information obtained from any of these hints is checked when it is used, by checking the label or reading the file name from the leader page.
If it proves to be wrong, all of it can be reconstructed by scanning the disk.
Similarly, the bit table that keeps track of free disk pages is a hint; the truth is represented by a special value in the label of a free page, which is checked when the page is allocated and before the label is overwritten with a file identifier and page number.

그러나 이 정보만으로는 한계가 있습니다.
디렉토리에서 파일 이름을 사용해 파일 식별자를 찾거나, i번째 페이지의 디스크 주소를 찾거나 할 때에는 디스크 전체를 검색하는 수 밖에 없기 때문입니다.
작동하긴 하지만 너무 느리기 때문에 이 방법은 사용할 수 없습니다.
따라서 각 시스템은 이런 작업을 빠르게 수행하기 위해 힌트를 유지합니다.
두 시스템 모두 디렉토리를 `[string name, file identifier, address of first page]` 형태로 포함하는 파일로 표현합니다.
그리고 이러한 각각의 힌트 파일은 페이지 번호를 페이지의 디스크 주소로 매핑하는 데이터 구조를 갖고 있습니다.

Alto에서는 각 레이블에서 다음 레이블을 가리키는 링크를 사용하고 있으므로,
n번째 페이지에서 n+1번째 페이지로 빠르게 이동할 수 있습니다.

한편 Pilot은 연속된 파일 페이지가 연속된 디스크 페이지를 차지하는 경우가 일반적이라는 점에 착안하여, 맵을 직접 구현하는 B-tree를 사용합니다.
이러한 힌트들로부터 얻은 정보를 사용할 때에는 레이블을 확인하거나 리더 페이지에서 파일 이름을 읽는 방식으로 힌트의 사실 여부를 확인합니다.
만약 힌트의 내용이 잘못된 것이라면, 디스크를 스캔해서 모든 힌트를 재구성하면 됩니다.
이와 비슷하게, 디스크 페이지의 사용 여부를 추적하는 비트 테이블도 일종의 힌트에 해당됩니다.
빈 페이지의 레이블에 특별한 값을 사용해 '사실'을 표현하며, 페이지를 할당할 때와 파일 식별자와 페이지 번호로 레이블을 덮어쓰기 전에 값을 확인하게 되는 것입니다.

>
Another example of hints is the store and forward routing first used in the Arpanet [32].
Each node in the network keeps a table that gives the best route to each other node.
This table is updated by periodic broadcasts in which each node announces to all the other nodes its opinion about the quality of its links to its neighbors.
Because these broadcast messages are not synchronized and are not guaranteed to be delivered, the nodes may not have a consistent view at any instant.
The truth in this case is that each node knows its own identity and hence knows when it receives a packet destined for itself.
For the rest, the routing does the best it can; when things aren’t changing too fast it is nearly optimal.

힌트의 또 다른 예로는 Arpanet에서 처음 사용된 '저장 후 전달' 라우팅이 있습니다.
네트워크의 각 노드는 '다른 모든 노드로 가는 최적 경로'를 제공하는 테이블을 유지합니다.
이 테이블은 각 노드가 이웃 노드와의 연결 품질에 대해 평가한 것을 다른 모든 노드들에게 알려주는 주기적인 브로드캐스트를 통해서 업데이트됩니다.
이 브로드캐스트 메시지는 동기화되지도 않고 전달을 보장하지도 않기 때문에, 각 노드들은 동시에 전부 같은 정보를 갖고 있지 않을 수 있습니다.
이런 경우의 '진실'은 각 노드가 자신의 식별자를 알고 있어서, 어떤 패킷을 받을 때 그 패킷의 목적지가 자신이라는 것을 알 수 있다는 것입니다.
그 밖의 것들은 라우팅이 최선을 다해 작업을 해냅니다.
상황이 급박하게 변하지만 않는다면 이 방식은 거의 최적의 경로를 제공합니다.

>
A more curious example is the Ethernet [33], in which lack of a carrier signal on the cable is used as a hint that a packet can be sent. If two senders take the hint simultaneously, there is a collision that both can detect; both stop, delay for a randomly chosen interval, and then try again. If n successive collisions occur, this is taken as a hint that the number of senders is 2<sup>n</sup>, and each sender sets the mean of its random delay interval to 2<sup>n</sup> times its initial value. This ‘exponential backoff’ ensures that the net does not become overloaded.

더 흥미로운 사례는 이더넷입니다.
이더넷에서는 케이블에서 캐리어 신호가 없는 것을 '패킷을 보낼 수 있다'는 힌트로 사용합니다.
만약 두 개의 발신자가 동시에 이 힌트를 받는다면, 양쪽이 다 감지할 수 있는 충돌이 발생하게 됩니다.
그러면 양쪽 모두 패킷 전송을 멈추고, 랜덤한 시간만큼 기다린 다음 재시도합니다.
만약 충돌이 연속적으로 n번 발생한다면, 이것은 '발신자의 수가 2<sup>n</sup>개라는 것'[^ethernet-hint]을 나타내는 힌트로 받아들이게 됩니다.
그리고 각 발신자는 이 힌트를 토대로 자신의 랜덤 대기 시간의 평균을 2<sup>n</sup>배로 설정합니다.
이 '지수적 백오프'는 네트워크가 과부하되지 않도록 보장해줍니다.

>
A very different application of hints speeds up execution of Smalltalk programs [12].
In Smalltalk the code executed when a procedure is called is determined dynamically by the type of the first argument.
Thus `Print(x, format)` invokes the Print procedure that is part of the type of `x`.
Since Smalltalk has no declarations, the type of `x` is not known statically.
Instead, each object has a pointer to a table of pairs `[procedure name, address of code]`, and when this call is executed, `Print` is looked up x’s table (I have normalized the unusual Smalltalk terminology and syntax, and oversimplified a bit).
This is expensive.
It turns out that usually the type of `x` is the same as it was last time.
So the code for the call `Print(x, format)` can be arranged like this:

Smalltalk 프로그램의 성능 향상은 힌트를 꽤 다른 방식으로 응용한 사례라 할 수 있습니다.

Smalltalk에서는 프로시저가 호출될 때, 첫 번째 인자의 타입에 따라 실행되는 코드가 동적으로 결정됩니다.
그러므로 `Print(x, format)`은 타입 `x`에 포함된 `Print` 프로시저를 호출합니다.
Smalltalk은 선언문이 없기 때문에, `x`의 타입은 정적으로 알 수 없습니다.
그 대신, 각 객체는 `[procedure name, address of code]` 쌍을 담는 테이블에 대한 포인터를 갖고 있으며, 프로시저가 호출될 때 `x`의 테이블에서 `Print`를 검색합니다(설명을 위해 Smalltalk의 고유한 용어와 구문을 좀 단순하게 일반화했습니다).

이 작업은 비용이 많이 듭니다.
그런데 `x`의 타입이 이전의 호출과 같은 경우가 대부분이라는 것이 밝혀졌습니다.
따라서 `Print(x, format)`를 호출하는 코드는 다음과 같이 구성될 수 있습니다.

> ```smalltalk
> push format; push x;
> push lastType; call lastProc
> ```
>
and each `Print` procedure begins with

그리고 각 `Print` 프로시저는 다음과 같이 시작됩니다.

> ```smalltalk
> lastT := Pop(); x := Pop(); t := type of x;
> if t ≠ lastT then LookupAndCall(x, "Print") else the body of the procedure end if.
> ```

>
Here `lastType` and `lastProc` are immediate values stored in the code.
The idea is that `LookupAndCall` should store the type of `x` and the code address it finds back into the `lastType` and `lastProc` fields.
If the type is the same next time, the procedure is called directly.
Measurements show that this cache hits about 96% of the time.
In a machine with an instruction fetch unit, this scheme has the nice property that the transfer to `lastProc` can proceed at full speed; thus when the hint is correct the call is as fast as an ordinary subroutine call.
The check of `t ≠ lastT` can be arranged so that it normally does not branch.

여기에서 `lastType`과 `lastProc`는 코드에 저장된 즉시 값입니다.
이 아이디어는 `LookupAndCall`이 '`x`의 타입'과 '찾은 코드 주소'를 `lastType`과 `lastProc` 필드에 다시 저장해야 한다는 것이 핵심입니다.
만약 다음 호출에서도 타입이 동일하다면, 프로시저를 바로 호출하면 됩니다.

측정 결과, 이 캐시는 96%의 시간 동안 히트한다고 합니다.
명령어 페치 유닛이 있는 머신에서는 이 방식을 쓰면 `lastProc`로의 전송이 최고 속도로 진행된다는 큰 장점이 있습니다.
그러므로 힌트가 정확한 경우, 호출은 일반적인 서브루틴 호출만큼 빠른 속도로 처리됩니다.
(캐시 히트율이 높기 때문에) 일반적으로 `t != lastT` 에서 `else`로 잘 분기되지 않게 됩니다.

>
The same idea in a different guise is used in the S-1 [48], which has an extra bit for each instruction in its instruction cache.
It clears the bit when the instruction is loaded, sets it when the instruction causes a branch to be taken, and uses it to choose the path that the instruction fetch unit follows.
If the prediction turns out to be wrong, it changes the bit and follows the other path.

같은 아이디어가 다른 형태로 S-1 에서도 사용되었습니다.
S-1은 명령어 캐시에 저장된 각 명령어에 대해 비트를 하나씩 갖고 있게 합니다.
명령어가 로드될 때 이 비트는 0으로 초기화되며, 명령어가 분기를 수행하게 되면 1로 설정됩니다.
그리고 이 비트는 명령어 페치 유닛이 따라가는 경로를 선택하는 데 사용됩니다.
만약 예측이 잘못된 것으로 판명되면, 이 비트를 변경하고 다른 경로를 따릅니다.

#### * When it doubt, use brute force

>
· When in doubt, use brute force.

확신이 없다면, brute force를 써라.

>
Especially as the cost of hardware declines, a straightforward, easily analyzed solution that requires a lot of special-purpose computing cycles is better than a complex, poorly characterized one that may work well if certain assumptions are satisfied.
For example, Ken Thompson’s chess machine Belle relies mainly on special-purpose hardware to generate moves and evaluate positions, rather than on sophisticated chess strategies.
Belle has won the world computer chess championships several times.
Another instructive example is the success of personal computers over time-sharing systems; the latter include much more cleverness and have many fewer wasted cycles, but the former are increasingly recognized as the most cost-effective way to do interactive computing.

특히 하드웨어 비용이 점점 낮아지면서, 특수 목적의 컴퓨팅 사이클이 많이 필요한 '간단하고 쉽게 분석할 수 있는 솔루션'이 특정 가정이 만족되었을 때에만 잘 작동할지도 모르는 '복잡하고 설명하기 어려운 솔루션'보다 낫습니다.
예를 들어 Ken Thompson의 체스 머신 Belle은 정교한 체스 전략보다는 특수 목적 하드웨어를 메인으로 사용해서 체스의 수를 생성하고 각 포지션을 평가합니다.
Belle은 세계 컴퓨터 체스 선수권 대회에서 여러 번 우승했습니다.
또 다른 흥미로운 사례는 개인용 컴퓨터가 시분할 시스템을 누르고 승리한 것을 꼽을 수 있습니다.
시분할 시스템은 훨씬 더 똑똑하고 낭비되는 사이클이 훨씬 적지만, 개인용 컴퓨터는 가장 효율적인 방법으로 컴퓨터와 상호작용하는 수단으로 인정받고 있습니다.

>
Even an asymptotically faster algorithm is not necessarily better.
There is an algorithm that multiplies two n × n matrices faster than O(n<sup>2.5</sup>), but the constant factor is prohibitive.
On a more mundane note, the 7040 Watfor compiler uses linear search to look up symbols; student programs have so few symbols that the setup time for a better algorithm can’t be recovered.

심지어 점근적으로 더 빠른 알고리즘이라 해도 언제나 더 좋은 것만은 아닙니다.
n × n 행렬을 곱하는 알고리즘은 O(n<sup>2.5</sup>) 보다 빠르지만, 상수가 너무 크다는 문제가 있습니다.
좀 더 평범한 사례를 보자면, 7040 Watfor 컴파일러는 심볼을 찾는 데에 선형 탐색을 사용합니다.
학생들이 만든 프로그램은 심볼의 수가 많지 않아서 이보다 더 나은 알고리즘을 쓰면 소요되는 설정 시간이 더 비쌌기 때문입니다.

#### * Compute in background

>
· Compute in background when possible.

가능한 한 백그라운드에서 계산하라.

>
In an interactive or real-time system, it is good to do as little work as possible before responding to a request.
The reason is twofold: first, a rapid response is better for the users, and second, the load usually varies a great deal, so there is likely to be idle processor time later in which to do background work.
Many kinds of work can be deferred to background.
The Interlisp and Cedar garbage collectors [7, 11] do nearly all their work this way.
Many paging systems write out dirty pages and prepare candidates for replacement in background.
Electronic mail can be delivered and retrieved by background processes, since delivery within an hour or two is usually acceptable.
Many banking systems consolidate the data on accounts at night and have it ready the next morning.
These four examples have successively less need for synchronization between foreground and background tasks.
As the amount of synchronization increases more care is needed to avoid subtle errors; an extreme example is the on-the-fly garbage collection algorithm given in [13].
But in most cases a simple producer-consumer relationship between two otherwise independent processes is possible.

대화형이나 실시간 시스템에서는 요청에 응답하기 전에 가능한 한 적응 양의 작업을 하는 것이 좋습니다.
그 이유는 두 가지입니다.

- 첫째, 빠른 응답은 사용자에게 더 좋습니다.
- 둘째, 일반적으로 매우 다양한 부하가 있기 때문에, 나중에 백그라운드 작업을 할 수 있는 유휴 프로세서 시간이 있을 가능성이 높습니다.

많은 종류의 작업을 백그라운드로 연기할 수 있습니다.
Interlisp와 Cedar 가비지 컬렉터는 거의 모든 작업을 이런 식으로 합니다.
많은 페이징 시스템들은 더러운 페이지를 작성하고 교체 후보를 준비하는 작업을 백그라운드에서 합니다.
전자 메일은 보통 1~2시간의 전송시간도 괜찮기 때문에, 백그라운드로 프로세스로 전달하고 받아오면 됩니다.
많은 은행 시스템들이 계정 데이터를 밤에 정리하는 방식으로 다음날 아침을 준비합니다.
이 네 가지 예시들은 포어그라운드와 백그라운드 작업 간의 동기화가 필요한 정도가 점점 줄어들고 있습니다.
동기화량이 증가될수록 미묘한 오류를 피하기 위해 더 많은 주의가 필요합니다.
극단적인 예는 [13]에서 제시된 실시간 가비지 컬렉션 알고리즘입니다.
하지만 대부분의 경우에는 두 개의 독립적인 프로세스 사이에서 간단한 producer-consumer 관계를 만드는 것이 가능합니다.

#### * Use batch processing

>
· Use batch processing if possible.
Doing things incrementally almost always costs more, even aside from the fact that disks and tapes work much better when accessed sequentially.
Also, batch processing permits much simpler error recovery.
The Bank of America has an interactive system that allows tellers to record deposits and check withdrawals.
It is loaded with current account balances in the morning and does its best to maintain them during the day.
But early the next morning the on-line data is discarded and replaced with the results of night’s batch run.
This design makes it much easier to meet the bank’s requirements for trustworthy long-term data, and there is no significant loss in function.

가능한 한 배치 처리를 사용하라.
작업을 점진적으로 처리하는 것은 항상 비용이 더 많이 듭니다.
특히 디스크나 테이프에 순차적으로 접근하는 것이 훨씬 더 좋다는 점을 논외로 치더라도 마찬가지입니다.
또한, 배치 처리는 오류 복구가 훨씬 더 간단합니다.
뱅크 오브 아메리카는 창구 직원들이 입출금을 기록할 수 있는 대화형 시스템을 가지고 있습니다.
이 시스템은 아침에 현재 계좌 잔액을 로드하고 하루종일 데이터를 유지하려 노력합니다.
그러나 다음날 아침 일찍이 되면, 온라인 데이터는 버려지고 밤에 배치로 실행된 결과로 대체됩니다.
이 설계로 인해 은행은 신뢰할 수 있는 장기 데이터를 충족시키기가 훨씬 쉬워졌을 뿐 아니라, 기능상으로도 포기한 것이 거의 없었습니다.

#### * Safety first

> > Be wary then; best safety lies in fear. (I iii 43)

그러니 조심하거라. 가장 좋은 안전은 두려움에서 나온다.

>
· Safety first.
In allocating resources, strive to avoid disaster rather than to attain an optimum.
Many years of experience with virtual memory, networks, disk allocation, database layout, and other resource allocation problems has made it clear that a general-purpose system cannot optimize the use of resources.
On the other hand, it is easy enough to overload a system and drastically degrade the service.
A system cannot be expected to function well if the demand for any resource exceeds two-thirds of the capacity, unless the load can be characterized extremely well.
Fortunately hardware is cheap and getting cheaper; we can afford to provide excess capacity.
Memory is especially cheap, which is especially fortunate since to some extent plenty of memory can allow other resources like processor cycles or communication bandwidth to be utilized more fully.

안전 제일.
자원을 할당할 때, 최적화보다는 재난을 피하기 위해 노력해야 합니다.
가상 메모리, 네트워크, 디스크 할당, 데이터베이스 레이아웃 등의 자원 할당 문제에 대해 수년간의 경험을 통해, 일반적인 시스템은 자원을 최적화할 수 없다는 사실을 분명하게 알게 되었습니다.
반면, 시스템을 과부하 상태로 만들어서 서비스를 크게 저하시키는 것은 쉽게 할 수 있는 일입니다.
부하가 매우 정확하게 파악 가능한 경우를 제외하고, 어떤 자원에 대한 요구가 용량의 2/3을 초과하면 시스템의 원활한 동작을 기대할 수 없습니다.
다행히 하드웨어는 저렴한 편이며, 점점 더 저렴해지고 있습니다.
그래서 우리는 충분한 용량을 제공하는 것이 가능합니다.
메모리는 특히 많이 저렴한데, 이는 프로세서 사이클이나 통신 대역폭과 같은 다른 자원을 더욱 효율적으로 사용할 수 있도록 메모리를 충분히 제공할 수 있기 때문에 유리합니다.

>
The sad truth about optimization was brought home by the first paging systems.
In those days memory was very expensive, and people had visions of squeezing the most out of every byte by clever optimization of the swapping: putting related procedures on the same page, predicting the next pages to be referenced from previous references, running jobs together that share data or code, etc.
No one ever learned how to do this.
Instead, memory got cheaper, and systems spent it to provide enough cushion for simple demand paging to work.
We learned that the only important thing is to avoid thrashing, or too much demand for the available memory.
A system that thrashes spends all its time waiting for the disk.

최적화에 대한 슬픈 사실은 최초의 페이징 시스템이 등장했을 때 드러났습니다.
당시의 메모리는 매우 비쌌기 때문에, 사람들은 스와핑을 교묘하게 최적화해서 모든 바이트를 최대한 활용하려는 비전을 갖고 있었습니다.
관련된 프로시저를 같은 페이지에 둔다던가, 이전 참조에서 다음에 참조할 페이지를 예측하거나, 데이터나 코드를 공유하는 작업을 함께 실행하는 등의 방법들을 구상한 것입니다.
그러나 아무도 그런 최적화 기법들을 실현하지 못했습니다.
그 대신, 메모리 가격이 점점 떨어졌고, 시스템은 단순한 demand paging을 수행할 수 있도록 충분한 여유를 제공하기 위해 메모리를 마구 사용했습니다.
우리는 사용 가능한 메모리에 대한 과도한 수요, 즉 스래싱을 피하는 것이 유일하게 중요한 것이라는 사실을 깨달았습니다.
스래싱이 발생하는 시스템은 디스크에서 데이터를 읽어오기 위해 모든 시간을 소모하게 됩니다.

>
The only systems in which cleverness has worked are those with very well-known loads.
For instance, the 360/50 apl system [4] has the same size workspace for each user and common system code for all of them.
It makes all the system code resident, allocates a contiguous piece of disk for each user, and overlaps a swap-out and a swap-in with each unit of computation.
This works fine.

아주 잘 알려진 종류의 부하를 갖는 시스템에서만 이런 교묘한 최적화가 작동했습니다.
예를 들어, 360/50 APL 시스템은 각 사용자들에게 같은 크기의 작업공간을 제공하며, 모든 사용자들에게 공통된 시스템 코드를 제공합니다.
이 시스템은 모든 시스템 코드를 램상주시키고, 각 사용자에게 연속된 디스크 공간을 할당시켜 주며, 각 계산 단위를 swap-out하고 swap-in 하는 것을 겹쳐서 할 수 있었습니다.[^swap-in-out]
이 방식은 잘 작동합니다.

> > The nicest thing about the Alto is that it doesn’t run faster at night. (J. Morris)

Alto의 가장 멋진 점은 밤에 더 빨리 작동하지 않는다는 것이다. (J. Morris)

>
A similar lesson was learned about processor time.
With interactive use the response time to a demand for computing is important, since a person is waiting for it.
Many attempts were made to tune the processor scheduling as a function of priority of the computation, working set size, memory loading, past history, likelihood of an I/O request, etc..
These efforts failed.
Only the crudest parameters produce intelligible effects: interactive vs. non-interactive computation or high, foreground and background priority levels.
The most successful schemes give a fixed share of the cycles to each job and don’t allocate more than 100%; unused cycles are wasted or, with luck, consumed by a background job.
The natural extension of this strategy is the personal computer, in which each user has at least one processor to himself.

프로세서 시간에 대해서도 이와 비슷한 교훈을 얻었습니다.
대화식으로 컴퓨터를 사용할 때에는 사람이 응답을 기다리게 되기 때문에, 계산 요청에 대한 응답 시간이 중요합니다.
계산의 우선순위, 작업 집합 크기, 메모리 로딩, 과거 기록, I/O 요청 가능성 등을 토대로 프로세서 스케쥴링을 조절해보려는 다양한 시도가 있었습니다.
그러나 그런 시도는 실패했습니다.
오직 가장 기본적인 파라미터만이 이해할 수 있는 결과를 만들어냅니다.
그것은 바로 '대화식 vs 비대화식 계산'이나 '포어그라운드와 백그라운드의 우선순위 정도'입니다.
가장 성공적인 방식은 각 작업에 100% 이상 할당하지 않고 고정된 비율의 사이클만 할당합니다.
사용되지 않는 사이클은 그냥 낭비되거나, 운이 좋으면 백그라운드 작업에 의해 소비됩니다.
이 전략을 자연스럽게 확장한 것이 바로 개인용 컴퓨터입니다.
각 사용자가 적어도 하나의 프로세서를 독립적으로 사용할 수 있기 때문입니다.

#### * Shed load

> > Give every man thy ear, but few thy voice;  
Take each man’s censure, but reserve thy judgment.

모든 사람에게 귀를 기울이되, 몇몇 사람에게만 말을 걸어라.  
모든 사람의 비난을 받아들이되, 자신의 판단은 보류해 두거라.

>
· Shed load to control demand, rather than allowing the system to become overloaded.
This is a corollary of the previous rule.
There are many ways to shed load.
An interactive system can refuse new users, or even deny service to existing ones.
A memory manager can limit the jobs being served so that all their working sets fit in the available memory.
A network can discard packets.
If it comes to the worst, the system can crash and start over more prudently.

부하를 줄여라.
시스템이 과부하 상태가 되지 않도록 허용하지 말고, 수요를 제어하기 위해 부하를 줄이세요.
이 규칙은 앞에서 언급한 규칙들을 통해 도출된 것입니다.
부하를 줄이는 방법은 여러 가지가 있습니다.
대화식 시스템에서는 새로운 사용자나 기존의 사용자들에게 서비스하는 것을 거부할 수 있습니다.
메모리 관리자는 서비스 중인 작업들에 제한을 가해서, 모든 작업 집합이 사용 가능한 메모리에 들어갈 수 있도록 할 수 있습니다.
네트워크라면 패킷을 버릴 수도 있습니다.
최악의 경우가 발생해 시스템이 충돌하면 신중하게 다시 시작하도록 합니다.

>
Bob Morris suggested that a shared interactive system should have a large red button on each terminal.
The user pushes the button if he is dissatisfied with the service, and the system must either improve the service or throw the user off; it makes an equitable choice over a sufficiently long period.
The idea is to keep people from wasting their time in front of terminals that are not delivering a useful amount of service.

Bob Morris는 공유 대화형 시스템의 각 터미널에 큰 빨간 버튼을 두는 것이 좋겠다고 제안한 적이 있습니다.
사용자가 서비스에 만족하지 않으면 버튼을 누르는 겁니다.
그러면 시스템은 서비스를 개선하거나 사용자 접근을 강제로 끊거나 해야 합니다.
이 방법을 오랜 기간 사용하면 나름의 공정한 선택을 하는 셈이라 할 수 있습니다.
이 아이디어는 유용하지 못한 서비스를 제공하는 터미널 앞에서 사용자가 시간을 낭비하지 않도록 도와주는 것입니다.

>
The original specification for the Arpanet [32] was that a packet accepted by the net is guaranteed to be delivered unless the recipient machine is down or a network node fails while it is holding the packet.
This turned out to be a bad idea.
This rule makes it very hard to avoid deadlock in the worst case, and attempts to obey it lead to many complications and inefficiencies even in the normal case.
Furthermore, the client does not benefit, since it still has to deal with packets lost by host or network failure (see section 4 on end-to-end).
Eventually the rule was abandoned.
The Pup internet [3], faced with a much more variable set of transport facilities, has always ruthlessly discarded packets at the first sign of congestion.

Arpanet의 최초 스펙은 네트워크가 받아들인 패킷은 수신자 머신이 다운되거나, 패킷을 보관하는 네트워크 노드가 장애가 발생하지 않는 한, 네트워크에서 수락한 패킷이 반드시 전달된다는 것이었습니다.
하지만 이것은 좋지 않은 아이디어로 밝혀졌습니다.
이 규칙은 최악의 경우 데드락을 피하는 것을 매우 어렵게 만들고, 정상적인 경우에도 수많은 복잡한 문제와 비효율을 야기시킵니다.
게다가, 클라이언트는 호스트나 네트워크의 실패로 인한 패킷 손실을 처리해야 하기 때문에 이 규칙은 클라이언트에게도 이득이 없습니다.
결국 이 규칙은 폐기됐습니다.
Pup 인터넷은 훨씬 더 다양한 전송 장치들을 지원했으며, 부하의 첫 징후가 나타나면 무자비하게 패킷을 버리는 것으로 알려져 있습니다.

### 4. Fault-tolerance

**4. 내결함성**

> > The unavoidable price of reliability is simplicity. (C. Hoare)

신뢰성을 얻기 위한 피할 수 없는 대가는 단순함이다. (C. Hoare)[^hoare-1980-turing-award-lecture]

>
Making a system reliable is not really hard, if you know how to go about it.
But retrofitting reliability to an existing design is very difficult.

신뢰할 수 있는 시스템을 만드는 것은 방법만 알고 있다면 그리 어렵지 않습니다.
하지만 기존 설계에 신뢰성을 뒤늦게 끼워 맞추는 것은 매우 어려운 일입니다.

> > This above all: to thine own self be true,  
And it must follow, as the night the day,  
Thou canst not then be false to any man.

무엇보다 너 자신에게 진실해야 한단다.  
그것은 밤과 낮처럼 반드시 따르게 되는 것은,  
네가 어떤 사람에게도 거짓될 수 없다는 것이다.

#### * End-to-end

>
· End-to-end.
Error recovery at the application level is absolutely necessary for a reliable system, and any other error detection or recovery is not logically necessary but is strictly for performance.
This observation was first made by Saltzer [46] and is very widely applicable.

엔드 투 엔드.
애플리케이션 수준에서의 오류 복구는 신뢰성 있는 시스템을 위해 절대적으로 필요하며,
논리적으로는 그 외의 오류 복구는 필요하진 않고 오직 성능을 위한 것이라 할 수 있습니다.
이는 Saltzer에 의해 처음 제안되었으며, 매우 넓은 범위에 적용될 수 있습니다.

>
For example, consider the operation of transferring a file from a file system on a disk attached to machine A, to another file system on another disk attached to machine B.
To be confident that the right bits are really on B’s disk, you must read the file from B’s disk, compute a checksum of reasonable length (say 64 bits), and find that it is equal to a checksum of the bits on A’s disk.
Checking the transfer from A’s disk to A’s memory, from A over the network to B, or from B’s memory to B’s disk is not sufficient, since there might be trouble at some other point, the bits might be clobbered while sitting in memory, or whatever.
These other checks are not necessary either, since if the end-to-end check fails the entire transfer can be repeated.
Of course this is a lot of work, and if errors are frequent, intermediate checks can reduce the amount of work that must be repeated.
But this is strictly a question of performance, irrelevant to the reliability of the file transfer.
Indeed, in the ring based system at Cambridge it is customary to copy an entire disk pack of 58 MBytes with only an end-to-end check; errors are so infrequent that the 20 minutes of work very seldom needs to be repeated [36].

예를 들어, 머신 A에 연결된 디스크의 파일 시스템에 있는 파일 하나를, 머신 B에 연결된 다른 디스크의 파일 시스템으로 전송하는 작업을 생각해 봅시다.
B의 디스크에 올바른 비트들이 잘 복사되었나 확인하려면, B 디스크에서 파일을 읽고 적절한 길이의 체크섬(64비트라 합시다)을 계산한 다음, 그 체크섬이 A 디스크에 있는 비트들의 체크섬과 같은지를 확인해야 합니다.
A 디스크에서 A 메모리로, 그리고 A에서 네트워크를 통해 B로, B의 메모리에서 B의 디스크로 전송하는 과정을 체크하는 것만으로는 충분하지 않습니다.
어디에선가 이상한 문제가 생길 수도 있는 것입니다.
비트가 메모리에 있는 동안 손상되는 일이 발생할 수도 있습니다.
이런 종류의 체크를 하는 것들은 별로 필요한 일이 아닙니다.
왜냐하면 그냥 엔드 투 엔드로 결과만 검사해서 실패했는지 확인하고, 실패한다면 전체 전송을 다시 시도하면 되기 때문입니다.
물론 이 방식은 많은 작업이 필요한 일이긴 한데, 에러가 빈번하게 발생한다면 중간에 검사를 하는 방식을 써서 작업의 반복량을 줄일 수 있습니다.
그러나 이는 엄밀히 말해 성능 문제에 해당되며, 파일 전송의 신뢰성과는 관련이 없습니다.
실제로 캠브리지 대학의 링 기반 시스템에서는 58MB의 디스크 팩 전체를 복사하는 것이 일반적인 일입니다.
엔드 투 엔드 검사만 해도 오류가 매우 드물기 때문에 20분간의 작업을 다시 반복하는 일이 거의 없습니다.

>
Many uses of hints are applications of this idea.
In the Alto file system described earlier, for example, the check of the label on a disk sector before writing the sector ensures that the disk address for the write is correct.
Any precautions taken to make it more likely that the address is correct may be important, or even critical, for performance, but they do not affect the reliability of the file system.

힌트의 다양한 용도는 이런 아이디어를 응용한 것입니다.
예를 들어 Alto 운영체제의 파일 시스템에서는 섹터에 대한 레이블을 쓰기 전에, 해당 섹터에 대한 디스크 주소가 올바른지 확인합니다.
주소가 올바른지 확인하기 위해 취하는 모든 예방 조치는 매우 중요할 수 있고, 성능에도 큰 영향을 줄 수 있을 것입니다.
그러나 파일 시스템의 신뢰성에는 영향을 주지 않습니다.

>
The Pup internet [4] adopts the end-to-end strategy at several levels.
The main service offered by the network is transport of a data packet from a source to a destination.
The packet may traverse a number of networks with widely varying error rates and other properties.
Internet nodes that store and forward packets may run short of space and be forced to discard packets.
Only rough estimates of the best route for a packet are available, and these may be wildly wrong when parts of the network fail or resume operation.
In the face of these uncertainties, the Pup internet provides good service with a simple implementation by attempting only "best efforts" delivery.
A packet may be lost with no notice to the sender, and it may be corrupted in transit.
Clients must provide their own error control to deal with these problems, and indeed higher-level Pup protocols do provide more complex services such as reliable byte streams.
However, the packet transport does attempt to report problems to its clients, by providing a modest amount of error control (a 16-bit checksum), notifying senders of discarded packets when possible, etc.
These services are intended to improve performance in the face of unreliable communication and overloading; since they too are best efforts, they don’t complicate the implementation much.

Pup 인터넷은 여러 수준에서 엔드 투 엔드 전략을 채택해 사용하고 있습니다.
네트워크가 제공하는 주요 서비스는 데이터 패킷을 소스에서 목적지로 전송하는 것입니다.
이 패킷은 각기 다양한 에러율과 다른 특성들을 가진 여러 네트워크를 통과하게 됩니다.
패킷을 저장하고 전달하는 인터넷 노드들은 저장 공간이 부족해져서 패킷을 버려야 하는 상황에 처할 수 있습니다.
패킷의 최적화된 경로에 대해서는 대략적인 추정치만 제공되며, 네트워크의 일부에 장애가 발생하거나 재가동되거나 하면 이런 추정치가 완전히 틀릴 수도 있습니다.
그러나 이러한 불확실성에도 불구하고, Pup 인터넷은 "최선의 노력"으로만 전달을 시도하는 간단한 구현을 통해 좋은 서비스를 제공합니다.
패킷은 발신자에게 알려지는 일 없이 유실될 수 있고, 전송 중에 손상될 수도 있습니다.
클라이언트에서는 이런 문제를 처리하기 위해 자체적으로 에러 제어 기능을 제공해야 합니다.
실제로 상위 레벨의 Pup 프로토콜은 신뢰성있는 바이트 스트림과 같은 더 복잡한 서비스를 제공합니다.
그러나 패킷 전송은 적절한 수준의 에러 제어(16비트 체크섬)를 제공하고, 버려진 패킷을 발신자에게 알려주는 등의 방법으로 문제를 클라이언트에게 알려주려고 시도합니다.
이러한 서비스는 신뢰할 수 없는 통신 및 과부하 상황에서 성능을 개선하기 위한 것입니다.
이 또한 최선의 노력이기 때문에 구현을 많이 복잡하게 만들지 않습니다.

>
There are two problems with the end-to-end strategy.
First, it requires a cheap test for success.
Second, it can lead to working systems with severe performance defects that may not appear until the system becomes operational and is placed under heavy load.

엔드 투 엔드 전략에는 두 가지 문제가 있습니다.

- 첫째, 성공 여부를 확인할 수 있는 값싼 테스트 방법이 필요합니다.
- 둘째, 시스템이 작동하고 과부하 상태에 놓이기 전까지는 성능적인 결함이 발견되지 않을 수 있습니다. 이는 (미래에 나타날 수 있는) 심각한 성능 결함을 가진 시스템이 가동되는 문제가 될 수 있습니다.

#### * Log updates

>
· Log updates to record the truth about the state of an object.
A log is a very simple data structure that can be reliably written and read, and cheaply forced out onto disk or other stable storage that can survive a crash.
Because it is append-only, the amount of writing is minimized, and it is fairly easy to ensure that the log is valid no matter when a crash occurs.
It is also easy and cheap to duplicate the log, write copies on tape, or whatever.
Logs have been used for many years to ensure that information in a data base is not lost [17], but the idea is a very general one and can be used in ordinary file systems [35, 49] and in many other less obvious situations.
When a log holds the truth, the current state of the object is very much like a hint (it isn’t exactly a hint because there is no cheap way to check its correctness).

객체의 상태에 대한 진실을 기록하기 위해 로그 업데이트를 사용하세요.
로그는 매우 간단한 데이터 구조로, 신뢰성있게 쓰고 읽을 수 있습니다.
그리고 매우 저렴하게 충돌을 견딜 수 있는 디스크나 다른 안정적인 스토리지에 강제로 기록하는 것도 가능합니다.
로그는 특성상 추가만 하기 때문에, 쓰기 작업량을 최소화할 수 있으며, 충돌이 발생하더라도 로그가 유효한지 확인하는 것은 꽤 쉬운 일입니다.
또한 로그를 복제하거나 테이프에 복사하는 것도 쉽고 저렴합니다.
로그는 데이터베이스의 정보가 손실되지 않도록 보장하기 위해 여러 해동안 사용되어왔습니다.
하지만 로그라는 아이디어는 매우 일반적이며, 일반적인 파일 시스템이나 그 외의 다른 상황에서도 사용할 수 있습니다.
로그가 진실을 담고 있다고 생각해 보면, 객체의 현재 상태는 힌트와 매우 유사한 점이 있습니다.
(물론 로그는 힌트가 아닙니다. 정확성을 확인할 수 있는 저렴한 방법이 없기 때문입니다.)

>
To use the technique, record every update to an object as a log entry consisting of the name of the update procedure and its arguments.
The procedure must be functional: when applied to the same arguments it must always have the same effect.
In other words, there is no state outside the arguments that affects the operation of the procedure.
This means that the procedure call specified by the log entry can be re-executed later, and if the object being updated is in the same state as when the update was first done, it will end up in the same state as after the update was first done.
By induction, this means that a sequence of log entries can be re-executed, starting with the same objects, and produce the same objects that were produced in the original execution.

이 기법을 사용하기 위해서는, 객체의 모든 업데이트를 함수적인 로그 항목으로 기록해야 합니다.
그리고 로그 항목에는 업데이트 프로시저의 이름과 인자가 포함되어야 합니다.
해당 프로시저는 함수형이어야 합니다.
즉, 같은 인자가 다시 주어진다면 항상 동일한 결과를 내야 합니다.
다시 말해, 프로시저의 작업에 영향을 미치는 것은 인자 외에는 없어야 합니다.
즉, 로그 항목에 지정된 프로시저 호출은 나중에 다시 실행될 수 있으며,
업데이트 중인 객체가 처음으로 업데이트되었던 때와 상태가 똑같다면,
해당 객체는 업데이트가 처음 완료었던 때와 동일한 상태로 끝나야 한다는 것입니다.
귀납적으로 보면, 일련의 로그 항목 시퀀스는 같은 객체를 시작점으로 삼아 다시 실행될 수 있으며, 원래의 실행한 결과로 생성된 객체와 동일한 객체를 생성하게 됩니다.

>
For this to work, two requirements must be satisfied:
>
- The update procedure must be a true function:
    - Its result does not depend on any state outside its arguments.
    - It has no side effects, except on the object in whose log it appears.
- The arguments must be values, one of:
    - Immediate values, such as integers, strings, etc. An immediate value can be a large thing, like an array or even a list, but the entire value must be copied into the log entry.
    - References to immutable objects.

이를 위해서는 두 가지 요구사항이 충족되어야 합니다.

- 업데이트 프로시저는 진짜 함수여야 합니다.
    - 프로시저의 실행 결과는 인자 외에는 어떤 것에도 영향을 받지 않습니다.
    - 로그 외에는 사이드 이펙트가 없어야 합니다.
- 인자는 다음의 값들 중 하나여야 합니다.
    - 정수, 문자열 등과 같은 즉시 값. 즉시 값은 배열이나 리스트와 같은 큰 것일 수도 있지만, 그 전체 값이 로그 항목에 복사될 수 있어야만 합니다.
    - 변경 불가능한 객체에 대한 참조.

>
Most objects of course are not immutable, since they are updated.
However, a particular version of an object is immutable; changes made to the object change the version.
A simple way to refer to an object version unambiguously is with the pair `[object identifier, number of updates]`.
If the object identifier leads to the log for that object, then replaying the specified number of log entries yields the particular version.
Of course doing this replay may require finding some other object versions, but as long as each update refers only to existing versions, there won’t be any cycles and this process will terminate.

물론 대부분의 객체는 업데이트되기 때문에 변경 불가능하지 않습니다.
그러나 특정 버전의 객체는 변경 불가능합니다.
객체에 변경이 가해지면 버전이 변경되는 방식이라면요.
객체 버전을 명확하게 참조하는 간단한 방법은 `[object identifier, number of updates]` 쌍을 사용하는 것입니다.
만약 객체 식별자를 통해 해당 객체의 로그로 접근할 수 있다면, 특정 범위의 로그를 재생해서 특정 버전을 얻을 수 있게 됩니다.
물론 이런 재생을 할 수 있으려면 다른 객체 버전을 찾아야 할 수도 있습니다.
그러나 각 업데이트가 이미 생성된 버전만 참조한다면 순환 구조가 생기지 않으므로 이 프로세스는 종료를 보장할 수 있습니다.

>
For example, the Bravo editor [24] has exactly two update functions for editing a document:

예를 들어 Bravo 에디터는 문서를 편집하기 위한 업데이트 함수를 정확히 두 개만 가지고 있습니다.

>
> - `Replace(old: Interval, new: Interval)`
> - `ChangeProperties(where: Interval, what: FormattingOp)`
>
An `Interval` is a triple `[document version, first character, last character]`.
A `FormattingOp` is a function from properties to properties; a property might be `italic` or `leftMargin`, and a `FormattingOp` might be `leftMargin: = leftMargin + 10` or `italic: = true`.
Thus only two kinds of log entries are needed. All the editing commands reduce to applications of these two functions.

`Interval`은 `[document version, first character, last character]`의 삼중체입니다.
`FormattingOp`는 속성에서 속성으로의 함수입니다.
속성은 `italic`이나 `leftMargin` 등이 될 수 있고,
`FormattingOp`는 `leftMargin: = leftMargin + 10` 또는 `italic: = true` 와 같은 함수가 될 수 있습니다.
그러므로 로그 항목은 딱 두 가지 종류만 있으면 됩니다.
모든 편집 명령은 이 두 함수의 적용으로 축약될 수 있습니다.

#### * Make actions atomic or restartable

> > Beware  
Of entrance to a quarrel, but, being in,  
Bear ’t that th’ opposed may beware of thee.

말싸움에 끼어들지 않도록 하라.  
이미 휘말려든 상황이라면,  
상대방이 너를 두려워하게 해라.

>
· Make actions atomic or restartable.
An atomic action (often called a transaction) is one that either completes or has no effect.
For example, in most main storage systems fetching or storing a word is atomic.
The advantages of atomic actions for fault-tolerance are obvious: if a failure occurs during the action it has no effect, so that in recovering from a failure it is not necessary to deal with any of the intermediate states of the action [28].
Database systems have provided atomicity for some time [17], using a log to store the information needed to complete or cancel an action.
The basic idea is to assign a unique identifier to each atomic action and use it to label all the log entries associated with that action.
A commit record for the action [42] tells whether it is in progress, committed (logically complete, even if some cleanup work remains to be done), or aborted (logically canceled, even if some cleanup remains); changes in the state of the commit record are also recorded as log entries.
An action cannot be committed unless there are log entries for all of its updates.
After a failure, recovery applies the log entries for each committed action and undoes the updates for each aborted action.
Many variations on this scheme are possible [54].

작업을 원자적으로 또는 재시작 가능하게 만들어라.
원자적인 작업(트랜잭션이라고도 부름)은 일단 실행되면 완료되거나 또는 아무런 영향도 남기지 않는 작업을 말합니다.
예를 들어 워드를 가져오거나 저장하는 것은 대부분의 메인 스토리지 시스템에서 원자적인 작업입니다.
fault-tolerance 관점에서 원자적인 작업의 장점은 명확합니다.
작업 도중에 실패가 발생해도 아무런 영향이 없으므로, 실패를 복구할 때 작업 도중 발생한 중간 상태를 처리하지 않아도 됩니다.
데이터베이스 시스템은 예전부터 오랫동안 원자성을 제공해왔으며,
작업을 완료하거나 취소하기 위해 필요한 정보를 로그에 저장합니다.
기본적인 아이디어는 각 원자적 작업에 고유한 식별자를 할당하고,
그 식별자를 써서 해당 작업과 관련된 모든 로그 항목을 표시하는 것입니다.
작업의 커밋 레코드는 in progress, committed(논리적으로는 완료됐지만, 일부 정리 작업이 남아있을 수 있음), aborted(논리적으로는 취소됐지만, 일부 정리 작업이 남아있을 수 있음) 중 하나를 표시합니다.
커밋 레코드의 상태 변경도 로그 항목으로 기록됩니다.
모든 업데이트에 대한 로그 항목이 없다면 작업을 커밋할 수 없기 때문입니다.
실패가 발생한 후 복구하는 작업은 커밋된 작업에 대한 로그 항목을 적용하고, 중단된 작업에 대한 업데이트를 취소하는 방식입니다.
이 방식은 여러 가지 변형이 가능합니다.

>
For this to work, a log entry usually needs to be restartable.
This means that it can be partially executed any number of times before a complete execution, without changing the result; sometimes such an action is called ‘idempotent’.
For example, storing a set of values into a set of variables is a restartable action; incrementing a variable by one is not.
Restartable log entries can be applied to the current state of the object; there is no need to recover an old state.

이것이 가능하려면 로그 항목이 일반적으로 재시작 가능해야 합니다.
이는 완전하게 전체적으로 실행하기 전에도 결과에 영향을 주지 않고 여러 차례 부분적으로 실행할 수 있다는 것을 의미합니다.
이런 특성의 작업을 '멱등(idempotent)'이라 부릅니다.
예를 들어, 특정 값들의 집합을 변수들의 집합에 저장하는 것은 재시작 가능한 작업입니다.
그러나 변수를 1씩 증가시키는 것은 재시작 가능한 작업이 아닙니다.
재시작 가능한 로그 항목은 객체의 현재 상태에 적용될 수 있으며, 이전 상태를 복구할 필요가 없습니다.

>
This basic method can be used for any kind of permanent storage.
If things are simple enough a rather distorted version will work.
The Alto file system described above, for example, in effect uses the disk labels and leader pages as a log and rebuilds its other data structures from these if necessary.
As in most file systems, it is only the file allocation and directory actions that are atomic; the file system does not help the client to make its updates atomic.
The Juniper file system [35, 49] goes much further, allowing each client to make an arbitrary set of updates as a single atomic action.
It uses a trick known as ‘shadow pages’, in which data pages are moved from the log into the files simply by changing the pointers to them in the B-tree that implements the map from file addresses to disk addresses; this trick was first used in the Cal system [50].
Cooperating clients of an ordinary file system can also implement atomic actions, by checking whether recovery is needed before each access to a file; when it is they carry out the entries in specially named log files [40].

이 기본적인 방법은 어떤 종류의 영구 저장장치에서도 적용할 수 있습니다.
만약 작업이 충분히 단순하다면, 조금 변형된 버전도 작동할 수 있습니다.
예를 들어 Alto의 파일 시스템은 디스크 레이블과 리더 페이지를 로그로 사용하며, 필요한 경우 이것들을 기반으로 다른 데이터 구조를 리빌드합니다.
대부분의 파일 시스템에서 원자적인 작업은 파일 할당과 디렉토리 작업 뿐입니다.
그리고 파일 시스템은 클라이언트가 업데이트를 원자적으로 수행하는 데 도움을 주지 않습니다.
Juniper 파일 시스템은 여기에서 더 나아가, 각 클라이언트가 임의의 업데이트 세트를 단일한 원자적 작업으로 처리할 수 있게 합니다.
파일 주소를 디스크 주소로 매핑하는 B-트리에 있는 포인터를 변경하여 데이터 페이지를 로그에서 파일로 이동시키는 'shadow pages'라는 트릭을 사용하는 것입니다.
이 기법은 처음으로 Cal 시스템에서 사용됐습니다.
일반 파일 시스템의 협력하는 클라이언트들도 파일에 엑세스하기 전에 복구가 필요한지 확인하는 방식으로 원자적 작업을 구현할 수 있습니다.
필요한 경우가 된다면 특별한 이름의 로그 파일에 있는 항목들을 실행합니다.

>
Atomic actions are not trivial to implement in general, although the preceding discussion tries to show that they are not nearly as hard as their public image suggests.
Sometimes a weaker but cheaper method will do.
The Grapevine mail transport and registration system [1], for example, maintains a replicated data base of names and distribution lists on a large number of machines in a nationwide network.
Updates are made at one site and propagated to other sites using the mail system itself.
This guarantees that the updates will eventually arrive, but as sites fail and recover and the network partitions, the order in which they arrive may vary greatly.
Each update message is time-stamped, and the latest one wins.
After enough time has passed, all the sites will receive all the updates and will all agree.
During the propagation, however, the sites may disagree, for example about whether a person is a member of a certain distribution list.
Such occasional disagreements and delays are not very important to the usefulness of this particular system.


일반적으로 원자적 작업은 구현하기가 쉽지 않지만,
앞선 논의에서 그것들이 대중적으로 알려진 것만큼 어렵지 않다는 것을 보여줍니다.

때로는 더 약하지만 비용이 저렴한 방법이 더 적합한 경우도 있습니다.
예를 들어 Grapevine 메일 전송 및 등록 시스템은 전국적인 네트워크에 있는 수많은 머신들에 이름과 배포 목록 데이터베이스를 복제하여 유지합니다.
업데이트는 한 사이트에서 이루어지는데, 이 업데이트도 메일 시스템 자체를 사용해 다른 사이트로 전파됩니다.
이렇게 하면 업데이트 사항이 결국 도착하는 것이 보장되지만,
사이트가 장애를 겪어 복구하게 되면 네트워크가 분할되는 동안 도착하는 순서가 크게 달라질 수 있습니다.
각 업데이트 메시지에는 타임스탬프가 찍혀있어서, 가장 최신 메시지가 적용되는 방식입니다.
충분한 시간이 지나면 모든 사이트가 모든 업데이트를 받고 동의를 마치게 됩니다.
그러나 전파 과정에서 사이트와 사이트 사이에 불일치 상황이 발생할 수도 있습니다.
예를 들어 특정 배포 목록의 구성원인지 아닌지에 대한 불일치가 발생할 수 있습니다.
그러나 이런 일시적인 불일치와 딜레이는 이런 시스템의 유용성에 큰 영향을 미치지는 않습니다.


### 5. Conclusion

**5. 결론**

> > Most humbly do I take my leave, my lord.

겸손하게 작별을 고합니다.

>
Such a collection of good advice and anecdotes is rather tiresome to read; perhaps it is best taken in small doses at bedtime.
In extenuation I can only plead that I have ignored most of these rules at least once, and nearly always regretted it.
The references tell fuller stories about the systems or techniques that I have only sketched.
Many of them also have more complete rationalizations.
>
All the slogans are collected in Figure 1 near the beginning of the paper.

조언과 이야기를 모아놓은 이런 글을 읽는 것은 꽤 지루한 일일 겁니다.
아마 잠자리에 들기 전에 조금씩 읽는 것이 좋을 것 같습니다.
변명을 하자면 저도 이런 규칙들을 한 번씩은 무시했고, 대부분 후회했습니다.
참고 문헌들을 읽어보면 제가 간략하게 언급한 시스템이나 기술에 대한 더 자세한 이야기를 볼 수 있을 것입니다.
참고 문헌들 대부분은 더 완벽한 근거를 제시하고 있습니다.

모든 슬로건들은 논문의 맨 앞부분에 있는 그림 1에 모아 두었습니다.


### Acknowledgments

**감사**

>
I am indebted to many sympathetic readers of earlier drafts of this paper and to the comments of the program committee.

이 논문의 초기 초안을 읽어주신 많은 분들과 프로그램 위원회의 의견에 감사를 드립니다.

### References

1. Birrell, A.D. et al. Grapevine: An exercise in distributed computing. Comm. acm 25, 4, April 1982, pp 260-273.
2. Bobrow, D.G. et al. Tenex: A paged time-sharing system for the PDP-10. Comm. acm 15, 3, March 1972, pp 135-143.
3. Boggs, D.R. et al. Pup: An internetwork architecture. IEEE Trans. Communications com-28, 4, April 1980, pp 612-624.
4. Breed, L.M and Lathwell, R.H. The implementation of apl/360. In Interactive Systems for Experimental Applied Mathematics, Klerer and Reinfelds, eds., Academic Press, 1968, pp 390-399.
5. Britton, K.H., et al. A procedure for designing abstract interfaces for device interface modules. Proc. 5th Int’l Conf. Software Engineering, ieee Computer Society order no. 332, 1981, pp 195-204.
6. Brooks, F.H. The Mythical Man-Month, Addison-Wesley, 1975.
7. Burton, R.R. et al. Interlisp-D overview. In Papers on Interlisp-D, Technical report SSL-80-4, Xerox Palo Alto Research Center, 1981.
8. Clark, D.W. et al. The memory system of a high-performance personal computer. IEEE Trans. Computers TC-30, 10, Oct. 1981, pp 715-733.
9. Creasy, R.J. The origin of the vm/370 time-sharing system. ibm J. Res. Develop. 25, 5, Sep. 1981, pp 483-491.
10. Deutsch, L.P. and Grant. C.A. A flexible measurement tool for software systems. Proc. ifip Congress 1971, North-Holland.
11. Deutsch, L.P. and Bobrow, D.G. An efficient incremental automatic garbage collector. Comm. acm 19, 9, Sep. 1976, pp 522-526.
12. Deutsch, L.P. Efficient implementation of the Smalltalk-80 system. Proc. 11th acm Symposium on Principles of Programming Languages, 1984..
13. Dijkstra. E.W. et al. On-the-fly garbage collection: An exercise in cooperation. Comm. acm 21, 11, Nov. 1978, pp 966-975.
14. Ditzel, D.R. and McClellan, H.R. Register allocation for free: The C machine stack cache. sigplan Notices 17, 4, April 1982, pp 48-56.
15. Geschke, C.M, et al. Early experience with Mesa. Comm. acm 20, 8, Aug. 1977, pp 540-553.
16. Gifford, D.K. Weighted voting for replicated data. Operating Systems Review 13, 5, Dec. 1979, pp 150-162.
17. Gray, J. et al. The recovery manager of the System R database manager. Computing Surveys 13, 2, June 1981, pp 223-242.
18. Hansen, P.M. et al. A performance evaluation of the Intel iapx 432, Computer Architecture News 10, 4, June 1982, pp 17-26.
19. Hoare, C.A.R. Hints on programming language design. sigact/sigplan Symposium on Principles of Programming Languages, Boston, Oct. 1973.
20. Hoare, C.A.R. Monitors: An operating system structuring concept. Comm. acm 17, 10, Oct. 1974, pp 549-557.
21. Ingalls, D. The Smalltalk graphics kernel. Byte 6, 8, Aug. 1981, pp 168-194.
22. Janson, P.A. Using type-extension to organize virtual-memory mechanisms. Operating Systems Review 15, 4, Oct. 1981, pp 6-38.
23. Knuth, D.E. An empirical study of Fortran programs, Software- Practice and Experience 1, 2, Mar. 1971, pp 105-133.
24. Lampson. B.W. Bravo manual. In Alto Users Handbook, Xerox Palo Alto Research Center, 1976.
25. Lampson, B.W. and Redell, D.D. Experience with processes and monitors in Mesa. Comm. acm 23, 2, Feb. 1980, pp 105-117.
26. Lampson, B.W. et al. Electronic image processing system, U.S. Patent 4,203,154, May 1980.
27. Lampson, B.W. Replicated commit. Circulated at a workshop on Fundamental Principles of Distributed Computing, Pala Mesa, CA, Dec. 1980.
28. Lampson, B.W. and Sturgis, H.E. Atomic transactions. In Distributed Systems — An Advanced Course, Lecture Notes in Computer Science 105, Springer, 1981, pp 246-265.
29. Lampson, B.W. and Sproull, R.S. An open operating system for a single-user machine. Operating Systems Review 13, 5, Dec. 1979, pp 98-105.
30. Lampson, B.W. and Sturgis, H.E. Reflections on an operating system design. Comm. acm 19, 5, May 1976, pp 251-265.
31. McNeil, M. and Tracz, W. pl/1 program efficiency. sigplan Notices 5, 6, June 1980, pp 46-60.
32. McQuillan, J.M. and Walden, D.C. The arpa network design decisions. Computer Networks 1, Aug. 1977, pp 243-299.
33. Metcalfe, R.M. and Boggs, D.R. Ethernet: Distributed packet switching for local computer networks. Comm. acm 19, 7, July 1976, pp 395-404.
34. Mitchell, J.G. Design and Construction of Flexible and Efficient Interactive Programming Systems. Garland, 1979.
35. Mitchell, J.G. and Dion, J. A comparison of two network-based file servers. Comm. acm 25, 4, April 1982, pp 233-245.
36. Needham, R.M. Personal communication. Dec. 1980.
37. Newman, W.M. and Sproull, R.F. Principles of Interactive Computer Graphics, 2nd ed., McGraw-Hill, 1979.
38. Parnas, D.L. On the criteria to be used in decomposing systems into modules. Comm. acm 15, 12, Dec. 1972, pp 1053-1058.
39. Patterson, D.A. and Sequin, C.H. risc 1: A reduced instruction set vlsi computer. 8th Symp. Computer Architecture, ieee Computer Society order no. 346, May 1981, pp 443-457.
40. Paxton, W.H. A client-based transaction system to maintain data integrity. Operating Systems Review 13, 5, Dec. 1979, pp 18-23.
41. Radin, G.H. The 801 minicomputer, sigplan Notices 17, 4, April 1992, pp 39-47.
42. Redell, D.D. et al. Pilot: An operating system for a personal computer. Comm. acm 23, 2, Feb. 1980, pp 81-91.
43. Reed, D. Naming and Synchronization in a Decentralized Computer System, mit lcs tr-205. Sep. 1978.
44. Ritchie, D.M. and Thompson, K. The Unix time-sharing system. Bell System Tech. J. 57, 6, July 1978, pp 1905-1930.
45. Rovner, P. Personal communication. Dec. 1982.
46. Saltzer, J.H. et al. End-to-end arguments in system design. Proc. 2nd Int’l. Conf. Distributed Computing Systems, Paris, April 1981, pp 509-512.
47. Smith, D.C. et al. Designing the Star user interface. Byte 7,4, April 1982, pp 242-282 .
48. Smith, J.E. A study of branch prediction strategies. 8th Symp. Computer Architecture, ieee Computer Society order no. 346, May 1981, pp 135-148.
49. Sturgis, H.E, et al. Issues in the design and use of a distributed file system. Operating Systems Review 14, 3, July 1980, pp 55-69.
50. Sturgis, H.E. A Postmortem for a Time Sharing System. Technical Report csl-74-l, Xerox Palo Alto Research Center, 1974.
51. Sweet, R., and Sandman, J. Static analysis of the Mesa instruction set. sigplan Notices 17, 4, April 1982, pp 158-166.
52. Tanenbaum, A. Implications of structured programming for machine architecture. Comm. acm 21, 3, March 1978, pp 237-246.
53. Thacker, C.P. et al. Alto: A personal computer. In Computer Structures: Principles and Examples, 2nd ed., Siewiorek, Bell, and Newell, eds., McGraw-Hill,1982.
54. Traiger, I.L. Virtual memory management for data base systems. Operating Systems Review 16, 4, Oct. 1982, pp 26-48.
55. Bentley, J.L. Writing Efficient Programs. Prentice-Hall, 1982.

## 번역하며 남긴 메모

### 참조 카운트 오버플로를 방지하기 위한 오버플로 테이블 알고리즘 시뮬레이션

다음은 [오버플로 카운트 테이블]( #overflow-count-table )의 동작을 시뮬레이션 해 본 것이다.

- 전제
    - 참조 카운트의 최대값은 8 로 설정했다.
    - 변수 a가 시뮬레이션의 주인공이다.
    - 변수 a를 참조하는 객체는 현재 7개가 있다. 즉, a의 참조 카운트는 7 이다.
    - 변수 a의 주소는 1234 이며, 아직 오버플로 테이블에 등록되지 않았다.

시뮬레이션을 해보자.

1. 현재 상태.
    - a의 참조 카운트: `7`
    - a의 오버플로 플래그: `false`
    - 오버플로 카운트 테이블: `{}`
2. 변수 a를 참조하는 새로운 객체가 생겨났다.
    - a의 참조 카운트: `8`
    - a의 오버플로 플래그: `false`
    - 오버플로 카운트 테이블: `{}`
3. a의 참조 카운트가 최대값인 8에 도달했으므로, a의 참조 카운트를 반으로 나누고, a에 오버플로 플래그를 설정하고, 오버플로 카운트 테이블에 a의 오버플로 횟수를 저장한다.
    - a의 참조 카운트: `4`
    - a의 오버플로 플래그: `true`
    - 오버플로 카운트 테이블: `{key: 1234, value: 1}`
        - `1234`는 a의 주소이고, `1`은 오버플로 카운트이다.
    - (실제로 a를 참조하는 객체의 수: 8)
        - 참조 카운트는 4 이지만, 최대값이 8이라는 것과 오버플로 카운트가 1이라는 것을 통해 실제 a를 참조하는 객체의 수는 4 + 8/2 = 8 이라는 것을 알 수 있다.
4. a를 참조하는 객체 4개가 생겨났다.
    - a의 참조 카운트: 4 + 4 = `8`
    - 오버플로 카운트 테이블: `{key: 1234, value: 1}`
    - (실제로 a를 참조하는 객체의 수: 12)
5. a의 참조 카운트가 최대값인 8에 또 도달했으므로... 반으로 줄이고 오버플로 카운트를 1 증가시킨다.
    - a의 참조 카운트: `4`
    - a의 오버플로 플래그: `true`
    - 오버플로 카운트 테이블: `{key: 1234, value: 2}`
    - (실제로 a를 참조하는 객체의 수: 12)
7. a를 참조하는 객체 4개가 사라졌다고 하자.
    - a의 참조 카운트: `0`
    - a의 오버플로 플래그: `true`
    - 오버플로 카운트 테이블: `{key: 1234, value: 2}`
    - (실제로 a를 참조하는 객체의 수: 8)
8. 참조 카운트가 0 이 되었는데 오버플로 플래그가 설정되어 있으므로, 오버플로 카운트를 1 줄이고 참조 카운트를 4 복원한다.
    - a의 참조 카운트: `4`
    - a의 오버플로 플래그: `true`
    - 오버플로 카운트 테이블: `{key: 1234, value: 1}`
    - (실제로 a를 참조하는 객체의 수: 8)

## Links

- [Hints for Computer System Design - Butler W. Lampson]( http://bwl-website.s3-website.us-east-2.amazonaws.com/33-Hints/Abstract.html )
    - [Web Page]( http://bwl-website.s3-website.us-east-2.amazonaws.com/33-Hints/WebPage.html )
    - [PDF]( http://bwl-website.s3-website.us-east-2.amazonaws.com/33-Hints/Acrobat.pdf )

## 참고문헌

- 운영체제 아주 쉬운 세 가지 이야기 [제2판] / Remzi H. Arpaci-Dusseau, Andrea C. Arpaci-dusseau 공저 / 원유집, 박민규, 이성진 공역 / 홍릉 / 제2판 발행: 2020년 09월 10일 / 원제: Operating Systems: Three Easy Pieces

## 주석

[^three-50]: 운영체제 아주 쉬운 세 가지 이야기. 5.7장. 50쪽.
[^six-level-50-cost]: 역주: 1.5<sup>6</sup> = 11.390625
[^ewd-32]: 역주: Algol 60에 대한 이야기는 [[/clipping/ewd/32]]도 읽어볼 만하다.
[^what-bookkeeping]: 역주: bookkeeping은 정보의 상태를 추적, 관리, 유지하는 연산을 말한다. 메모리 할당, 해제, 참조 관리 등이 해당된다. ([참고]( https://encyclopedia2.thefreedictionary.com/bookkeeping+operation ))
[^hamlet-and-makes-us]: 역주: 셰익스피어의 햄릿에서 유명한 "To be or not to be" 이후에 이어지는 부분에 이 문장이 있다.
[^what-demand-paging]: 역주: 가상 메모리 시스템에서 사용하는 메모리 관리 기법 중 하나. 필요한 페이지를 요청할 때만 해당 페이지를 메모리에 로딩한다.
[^smalltalk-implementation]: 역주: 기계어로 번역한 코드를 많이 실행할수록 코드를 번역하는 데 소모해버린 시간을 만회하게 된다. 그리고 n 회 실행한 시점부터는 성능상의 이득을 보게 될 것이다. `n = 번역하는 데 사용한 시간 / 번역되지 않은 코드의 실행 시간`이므로 만약 `n = 2 / 1` 이라면 실행 시간이 1인 코드를 번역하는 데 2의 시간을 사용한 것이라 생각할 수 있다.
[^frame-pointer]: 역주: Frame Pointer. 함수 호출 스택에서 스택 프레임 하나를 가리키는 포인터.
[^cache-fx-cost]: 역주: `f(x)`를 계산하는 속도가 느리면 느릴수록 캐시를 조회하는 것이 더 이득이다.
[^cache-fx-example]: 역주: 배열 x의 총합 `sum`에서 i번째 원소인 $$x_i$$ 를 갱신하는 것을 설명하고 있다. `sum`에서 이전의 $$x_i$$를 빼고, 새로운 값 `v`를 더하면 `sum`을 쉽게 갱신할 수 있다. 만약 이 방법을 쓰지 않고 `f(x)`를 다시 계산해야 했다면 배열 `x`를 전부 다시 순회해야 한다.
[^ethernet-hint]: 역주: 발신자의 수가 2<sup>n</sup>개라는 것은 엄밀하게 계산된 값은 아니며 적당한 추정치이다.
[^swap-in-out]: 역주: 가상 메모리 시스템에서 메모리 페이지를 디스크로 옮기는 것을 swap-out, 디스크에서 메모리로 옮기는 것을 swap-in이라고 한다.
[^hoare-1980-turing-award-lecture]: [Hoare의 1980년 튜링상 수상 강연]( https://www.cs.fsu.edu/~engelen/courses/COP4610/hoare.pdf )도 함께 읽어볼 만하다. "At first I hoped that such a technically unsound project would collapse but I soon realized it was doomed to success. Almost anything in software can be implemented, sold, and even used given enough determination. There is nothing a mere scientist can say that will stand against the flood of a hundred million dollars. But there is one quality that cannot be purchased in this way--and that is reliability. The price of reliability is the pursuit of the utmost simplicity. It is a price which the very rich find most hard to pay."
