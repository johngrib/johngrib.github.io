---
layout  : wiki
title   : Hints for Computer System Design By Butler W. Lampson
summary : 컴퓨터 시스템 설계를 위한 힌트
date    : 2023-04-15 22:56:16 +0900
updated : 2023-04-16 22:50:12 +0900
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

참고: 의역, 오역이 많을 수 있습니다. 참고용으로만 봐주세요.

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

> > Perfection is reached not when there is no longer anything to add,
> > but when there is no longer anything to take away. (A. Saint-Exupery)
>
> > Those friends thou hast, and their adoption tried,
> > Grapple them unto thy soul with hoops of steel;
> > But do not dull thy palm with entertainment
> > Of each new-hatch’d unfledg’d comrade.

완벽함은 더 이상 더할 것이 없을 때가 아니라, 더 이상 뺄 것이 없을 때 이루어집니다. (A. 생텍쥐페리)

네가 갖고 있는 친구들, 그들의 성향을 시험해 본 후, 강철의 고리로 너의 영혼에 꽉 붙잡거라; 하지만 새로 사귄 미숙한 친구들과의 교제로 손을 무디게 하지는 말거라.

##### * Do one thing well

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

> > Costly thy habit as thy purse can buy,  
> > But not express’d in fancy; rich, not gaudy.

비용이 많이 든다 해도 지갑이 버틸 수 있는 최고의 옷을 입어야 한단다.  
그러나 화려함에만 길들여지면 안되며, 부유하면서도 과시하지 않도록 해야 한다.

##### * Make it fast

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

TODO: 작업중

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

