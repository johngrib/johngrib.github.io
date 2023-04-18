---
layout  : wiki
title   : Hints for Computer System Design By Butler W. Lampson
summary : 컴퓨터 시스템 설계를 위한 힌트
date    : 2023-04-15 22:56:16 +0900
updated : 2023-04-18 22:28:50 +0900
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



TODO: 작업중

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
