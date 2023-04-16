---
layout  : wiki
title   : Hints for Computer System Design By Butler W. Lampson
summary : 컴퓨터 시스템 설계를 위한 힌트
date    : 2023-04-15 22:56:16 +0900
updated : 2023-04-16 13:01:49 +0900
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
> > but also on nearly all its successors. (C. Hoare)

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

작업중..

## Links

- [Hints for Computer System Design - Butler W. Lampson]( http://bwl-website.s3-website.us-east-2.amazonaws.com/33-Hints/Abstract.html )
    - [Web Page]( http://bwl-website.s3-website.us-east-2.amazonaws.com/33-Hints/WebPage.html )
    - [PDF]( http://bwl-website.s3-website.us-east-2.amazonaws.com/33-Hints/Acrobat.pdf )

## 참고문헌

- 운영체제 아주 쉬운 세 가지 이야기 [제2판] / Remzi H. Arpaci-Dusseau, Andrea C. Arpaci-dusseau 공저 / 원유집, 박민규, 이성진 공역 / 홍릉 / 제2판 발행: 2020년 09월 10일 / 원제: Operating Systems: Three Easy Pieces

## 주석

[^three-50]: 운영체제 아주 쉬운 세 가지 이야기. 5.7장. 50쪽.
[^six-level-50-cost]: 1.5<sup>6</sup> = 11.390625