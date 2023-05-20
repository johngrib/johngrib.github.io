---
layout  : wiki
title   : Out of the Tar Pit
summary : 타르 구덩이에서 탈출하기
date    : 2023-05-16 19:07:40 +0900
updated : 2023-05-20 13:05:08 +0900
tag     : 
resource: 22/453745-5C75-4EB3-BC75-3A5297F1FDC5
toc     : true
public  : true
parent  : [[/clipping]]
latex   : false
---
* TOC
{:toc}

> 번역 중인 문서.
{:style="background-color: #ecf1e8;"}

- 원문
    - [Out of the Tar Pit (PDF)]( https://curtclifton.net/papers/MoseleyMarks06a.pdf )
    - [Out of the Tar Pit (papers-we-love)]( https://github.com/papers-we-love/papers-we-love/blob/main/design/out-of-the-tar-pit.pdf )

## 번역

### Abstract

초록

>
Complexity is the single major diculty in the successful development of large-scale software systems.
Following Brooks we distinguish accidental from essential diculty, but disagree with his premise that most complexity remaining in contemporary systems is essential.
We identify common causes of complexity and discuss general approaches which can be taken to eliminate them where they are accidental in nature.
To make things more concrete we then give an outline for a potential complexity-minimizing approach based on functional programming and Codd’s relational model of data.

'복잡성'은 대규모 소프트웨어 시스템을 성공적으로 개발하는 데 있어 가장 큰 어려움입니다.
우리는 Brooks가 제시한 우발적인 복잡성과 본질적인 복잡성을 구분하는 접근방법에는 동의하지만, 그가 주장하는 대로 현대 시스템에 남아있는 대부분의 복잡성이 본질적인 것이라는 주장에는 동의하지 않습니다.
우리는 복잡성의 주요 원인들을 파악하고, 그것들이 우연한 성격의 복잡성인 경우 제거할 수 있는 일반적인 접근 방식을 논의합니다.
그리고 더 구체적으로 설명하기 위해 함수형 프로그래밍과 Codd의 관계형 데이터 모델에 기반을 둔 복잡성을 최소화하는 잠재적인 접근법에 대한 개요를 제시합니다.

### 1 Introduction

1 서론

>
The "software crisis" was first identified in 1968 [NR69, p70] and in the intervening decades has deepened rather than abated. The biggest problem in the development and maintenance of large-scale software systems is complexity — large systems are hard to understand. We believe that the major contributor to this complexity in many systems is the handling of state and the burden that this adds when trying to analyse and reason about the system. Other closely related contributors are code volume, and explicit concern with the flow of control through the system.

"소프트웨어 위기"론은 1968년에 처음으로 등장했습니다.
그 이후 수십 년, 소프트웨어의 위기는 더 심각해졌으며 해결되지 못했습니다.
대규모 소프트웨어 시스템의 개발 및 유지 관리에서 가장 큰 문제는 복잡성입니다(시스템이 클수록 이해하기 어렵습니다).
우리는 많은 시스템에서 이 복잡성의 주요 원인이 '상태의 처리'와 이것이 시스템을 분석하고 이해하는 데 부과하는 부담이라고 믿습니다. 코드의 양과 시스템을 통한 제어 흐름에 대한 명확한 고려 등이 밀접하게 관련된 기여자들입니다.

>
The classical ways to approach the difficulty of state include object-oriented programming which tightly couples state together with related behaviour, and functional programming which — in its pure form — eschews state and side-effects all together.
These approaches each suffer from various (and differing) problems when applied to traditional large-scale systems.

상태의 어려움에 접근하는 고전적인 방법은 주로 두 가지입니다.
하나는 상태를 관련된 동작과 밀접하게 결합시키는 객체지향 프로그래밍이고,
다른 하나는 순수한 형식을 통해 상태와 사이드 이펙트를 모두 배제하는 함수형 프로그래밍입니다.

이런 접근법들은 각각 전통적인 대규모 시스템에 적용할 때 각각 다양하고 서로 다른 문제들을 겪게 됩니다.

>
We argue that it is possible to take useful ideas from both and that — when combined with some ideas from the relational database world — this approach offers significant potential for simplifying the construction of large-scale software systems.

우리는 두 가지 접근법 모두 우리에게 유용한 아이디어를 제공해 주며, 관계형 데이터베이스의 일부 아이디어와 결합하면 이런 접근법이 대규모 소프트웨어 시스템 구축을 단순화하는 데 상당한 잠재력을 발휘하게 될 것이라고 생각합니다.

>
The paper is divided into two halves.
In the first half we focus on complexity.
In section 2 we look at complexity in general and justify our assertion that it is at the root of the crisis, then we look at how we currently attempt to understand systems in section 3.
In section 4 we look at the causes of complexity (i.e. things which make understanding difficult) before discussing the classical approaches to managing these complexity causes in section 5.
In section 6 we define what we mean by “accidental” and “essential” and then in section 7 we give recommendations for alternative ways of addressing the causes of complexity — with an emphasis on avoidance of the problems rather than coping with them.
>
In the second half of the paper we consider in more detail a possible approach that follows our recommended strategy.
We start with a review of the relational model in section 8 and give an overview of the potential approach in section 9.
In section 10 we give a brief example of how the approach might be used.
>
Finally we contrast our approach with others in section 11 and then give conclusions in section 12.

이 논문은 크게 두 부분으로 나눌 수 있습니다.

- 전반부는 복잡성에 초점을 맞춥니다.
    - 제2장에서는 일반적인 복잡성을 살펴보고, 이것이 위기의 근본적인 원인이라는 주장을 정당화한 다음,
    - 제3장에서 우리가 시스템을 이해하려고 시도하는 현재의 방법들을 살펴봅니다.
    - 제4장에서는 복잡성의 원인(이해를 어렵게 만드는 것들)을 살펴본 다음,
    - 제5장에서 이런 복잡성의 원인이 되는 것들을 관리하기 위한 고전적인 접근 방식을 논의합니다.
    - 제6장에서는 "우발적인"과 "본질적인"이라는 용어를 정의한 다음,
    - 제7장에서 복잡성의 원인을 해결하는 대안적인 접근 방식을 제시합니다. 이때, 문제를 해결하는 것보다는 문제를 피하는 것에 중점을 둡니다.
- 논문의 후반부에서는 우리가 권장하는 전략을 따르는 가능한 접근 방식을 더 자세히 살펴봅니다.
    - 제8장에서는 관계형 모델에 대한 검토를 시작하고,
    - 제9장에서 잠재적인 접근 방식에 대한 개요를 제시합니다.
    - 제10장에서는 이런 접근 방식이 어떻게 사용될 수 있는지에 대한 간단한 예를 들어봅니다.
    - 마지막으로, 제11장에서는 우리의 접근 방식을 다른 접근 방식과 대조하고,
    - 제12장에서 결론을 내립니다.

### 2 Complexity

>
In his classic paper — "No Silver Bullet" Brooks[Bro86] identified four properties of software systems which make building software hard: Complexity, Conformity, Changeability and Invisibility.
Of these we believe that Complexity is the only significant one — the others can either be classified as forms of complexity, or be seen as problematic solely because of the complexity in the system.

프레드 브룩스는 그의 고전이 된 논문인 "은총알은 없다"에서 소프트웨어 구축을 어렵게 만드는 소프트웨어 시스템의 네 가지 특성을 규명했습니다. 그것은 바로 '복잡성', '적합성', '변경 가능성', '비가시성'입니다.

우리는 이들 중 복잡성만이 유일하게 중요하다고 생각하며, 다른 세 가지는 복잡성의 한 형태로 분류되거나, 시스템의 복잡성 때문에 문제가 되는 것으로 봅니다.

>
Complexity is the root cause of the vast majority of problems with software today.
Unreliability, late delivery, lack of security — often even poor performance in large-scale systems can all be seen as deriving ultimately from unmanageable complexity.
The primary status of complexity as the major cause of these other problems comes simply from the fact that being able to understand a system is a prerequisite for avoiding all of them, and of course it is this which complexity destroys.

복잡성은 오늘날 소프트웨어와 관련된 대부분의 문제의 근본 원인이라 할 수 있습니다.
불안정성, 지연된 일정, 부족한 보안, 심지어 대규모 시스템의 성능 저하까지 모두 따지고 보면 복잡성을 관리하기 어렵다는 것에서 비롯된 것으로 볼 수 있습니다.

복잡성이 이렇게 다른 다양한 문제들의 주요 원인이 되는 이유는, 단순히 시스템을 일단 이해할 수 있어야 모든 가능한 문제를 피해낼 수 있다는 사실에서 비롯되는 것입니다. 그리고 복잡성이 파괴하는 것은 바로 그러한 '시스템을 이해하는 능력'입니다.

>
The relevance of complexity is widely recognised.
As Dijkstra said [Dij97, EWD1243]:
> >
"...we have to keep it crisp, disentangled, and simple if we refuse to be crushed by the complexities of our own making..."
>
...and the Economist devoted a whole article to software complexity [Eco04] — noting that by some estimates software problems cost the American economy $59 billion annually.

복잡성의 중요성은 널리 인식된 것이기도 합니다.
Dijkstra가 말한 바와 같이,

_"만약 우리가 자신이 만든 복잡성에 짓눌리고 싶지 않다면, 우리는 그것을 선명하게, 엉키지 않게, 그리고 단순하게 유지해야 합니다."_

...그리고 Economist지는 소프트웨어 복잡성을 주제로 전체 기사를 할애하기도 했는데, 해당 기사에서는 소프트웨어 문제로 미국 경제가 연간 약 590억 달러의 손실을 보고 있다는 추정값에 주목했습니다.

>
Being able to think and reason about our systems (particularly the effects of changes to those systems) is of crucial importance.
The dangers of complexity and the importance of simplicity in this regard have also been a popular topic in ACM Turing award lectures.
In his 1990 lecture Corbato said [Cor91]:

> >
"The general problem with ambitious systems is complexity.",
"...it is important to emphasize the value of simplicity and elegance, for complexity has a way of compounding diculties"

시스템에 대해 생각하고, 특히 그 시스템에 변화가 생길 경우 그 영향에 대해 추론할 수 있는 능력은 매우 중요합니다.
복잡성이 얼마나 위험하고 단순함이 얼마나 중요한지는 ACM Turing award 강연에서도 인기 있는 주제였습니다.
Corbato는 1990년 튜링상 수상 강연에서 다음과 같이 말했습니다.

- _"야심차게 만든 시스템에서 일반적으로 발생하는 문제는 복잡성입니다."_
- _"...단순함과 우아함의 가치를 강조하는 것이 중요합니다. 왜냐하면 복잡성은 어려움을 복리적으로 증가시키는 경향이 있기 때문입니다."_

>
In 1977 Backus [Bac78] talked about the "complexities and weaknesses" of traditional languages and noted:

> >
"there is a desperate need for a powerful methodology to help us think about programs.
... conventional languages create unnecessary confusion in the way we think about programs"

그리고 1997년, Backus도 튜링상 수상 강연에서 전통적인 언어들의 "복잡성과 약점"을 언급하며 다음과 같이 이야기했습니다.

_"프로그램에 대해 생각하는 데 도움이 되는 강력한 방법론이 절실하게 필요합니다.
... 기존의 언어들은 우리가 프로그램을 생각하는 방식에 오히려 불필요한 혼란을 일으킵니다."_

>
Finally, in his Turing award speech in 1980 Hoare [Hoa81] observed:
> >
"...there is one quality that cannot be purchased... — and that is reliability.
The price of reliability is the pursuit of the utmost simplicity"

>
and

> >
"I conclude that there are two ways of constructing a software design:
One way is to make it so simple that there are obviously no deficiencies and the other way is to make it so complicated that there are no obvious deficiencies.
The first method is far more difficult."

마지막으로, 1980년 튜링상 수상 강연에서 Hoare는 다음과 같이 말했습니다.

_"...돈으로도 얻을 수 없는 하나의 품질이 있습니다... 그것은 신뢰성입니다.
신뢰성의 대가는 극도의 단순함을 추구하는 것입니다."_

그리고

_"나는 소프트웨어를 설계하는 방법에는 두 가지가 있다고 결론내렸습니다.
한 가지 방법은 결함이 없다는 것이 명백한 정도로 단순하게 만드는 것이고,
다른 한 가지 방법은 결함이 없다는 것이 명백한 정도로 복잡하게 만드는 것입니다.
그리고 첫 번째 방법이 훨씬 더 어렵습니다."_

>
This is the unfortunate truth:

>
Simplicity is Hard
{:style="text-align:center;"}

>
...but the purpose of this paper is to give some cause for optimism.

불행히도 이것이 진실입니다.

단순함은 달성하기 어렵다.
{:style="text-align:center;"}

...하지만 이 논문의 목적은 긍정적으로 볼 수 있는 근거를 제시하는 것입니다.

>
One final point is that the type of complexity we are discussing in this paper is that which makes large systems hard to understand.
It is this that causes us to expend huge resources in creating and maintaining such systems.
This type of complexity has nothing to do with complexity theory — the branch of computer science which studies the resources consumed by a machine executing a program.
The two are completely unrelated — it is a straightforward matter to write a small program in a few lines which is incredibly simple (in our sense) and yet is of the highest complexity class (in the complexity theory sense).
From this point on we shall only discuss complexity of the first kind.
>
We shall look at what we consider to be the major common causes of complexity (things which make understanding difficult) after first discussing exactly how we normally attempt to understand systems.

마지막으로 이 논문에서 논의하는 종류의 복잡성은, '대규모 시스템을 이해하기 어렵게 만드는 종류의 복잡성'을 말한다는 것입니다.
'이런 종류의 복잡성' 때문에 우리는 시스템을 만들고 유지보수하는 데에 막대한 자원을 소모하게 됩니다.
프로그램을 실행하는 기계가 소비하는 리소스를 연구하는 컴퓨터 과학의 한 분야인 '복잡성 이론'과 '이런 종류의 복잡성'은 아무런 관련이 없습니다.
몇 줄로 된 작은 프로그램은 우리가 보기에는 매우 간단한 것이지만,
복잡성 이론의 관점에서 보면 가장 높은 복잡성 유형에 속하는 문제인 것입니다.

이제부터 우리는 첫 번째 종류의 복잡성에 대해서만 논의하겠습니다.

우리는 일단 시스템을 이해하려고 할 때 보통 어떤 방식으로 노력하는지에 대해 정확히 논의한 후,
이해를 어렵게 만드는 복잡성의 주요한 공통적인 원인들에 대해 살펴보려 합니다.

### 3 Approaches to Understanding

시스템을 이해하려 할 때의 접근 방식들

>
We argued above that the danger of complexity came from its impact on our attempts to understand a system.
Because of this, it is helpful to consider the mechanisms that are commonly used to try to understand systems.
We can then later consider the impact that potential causes of complexity have on these approaches.
There are two widely-used approaches to understanding systems (or components of systems):
>
**Testing**
This is attempting to understand a system from the outside — as a "black box".
Conclusions about the system are drawn on the basis of observations about how it behaves in certain specific situations.
Testing may be performed either by human or by machine.
The former is more common for whole-system testing, the latter more common for individual component testing.
>
**Informal Reasoning**
This is attempting to understand the system by examining it from the inside.
The hope is that by using the extra information available, a more accurate understanding can be gained.

앞에서 우리는 '시스템을 이해하기 어렵게 만든다'는 지점에서 복잡성이 위험하다고 주장했습니다.
따라서, 시스템을 이해하려 할 때 일반적으로 사용되곤 하는 메커니즘을 살펴보는 것이 도움이 될 것입니다.
그리고 나서 복잡성의 잠재적 원인이 이러한 접근 방식에 미치는 영향을 나중에 고려할 수 있을 것입니다.
시스템, 또는 시스템을 구성하는 컴포넌트들을 이해하려 할 때 널리 사용되는 두 가지 접근 방식은 다음과 같습니다.

**테스팅**

이 방법은 시스템을 '블랙박스'처럼 외부의 관점에서 이해하려 시도하는 것입니다.
따라서 특정한 상황에서 시스템이 어떻게 동작하는지에 대한 관찰을 바탕으로 시스템에 대한 결론을 도출합니다.
이러한 테스트는 사람 또는 머신에 의해 수행될 수 있습니다.
전자는 전체 시스템 테스트에 더 많이 사용되고, 후자는 개별 컴포넌트 테스트에 더 많이 사용됩니다.

**비형식적 추론**

이 방법은 시스템을 내부에서 살펴보면서 이해하려는 것입니다.
가용한 추가적인 정보를 사용하여 보다 정확한 이해를 얻기를 바라는 활동입니다.

>
Of the two informal reasoning is the most important by far.
This is because — as we shall see below — there are inherent limits to what can be achieved by testing, and because informal reasoning (by virtue of being an inherent part of the development process) is always used.
The other justification is that improvements in informal reasoning will lead to less errors being created whilst all that improvements in testing can do is to lead to more errors being detected.
As Dijkstra said in his Turing award speech [Dij72, EWD340]:

> >
"Those who want really reliable software will discover that they must find means of avoiding the majority of bugs to start with."

>
and as O’Keefe (who also stressed the importance of “understanding your problem” and that “Elegance is not optional”) said [O’K90]:

> >
“Our response to mistakes should be to look for ways that we can avoid making them, not to blame the nature of things.”

이들 중 '비형식적 추론'이 훨씬 중요합니다.
아래에서 살펴보겠지만, 테스팅을 통해 얻을 수 있는 것에는 본질적인 한계가 있는 반면, '비형식적 추론'은 개발 프로세스의 본질적인 부분이므로 항상 사용되고 있기 때문입니다.
그리고 비형식적 추론이 개선되면 오류가 더 적게 발생하게 되지만, 테스팅은 개선한다 해도 더 많은 오류를 찾아낼 수 있을 뿐입니다.
Dijkstra는 튜링상 수상 강연에서 다음과 같이 말한 바 있습니다.

_"정말 신뢰할 수 있는 소프트웨어를 원하는 사람들은, 처음부터 대부분의 버그를 피할 수 있는 방법을 찾아야 한다는 것을 깨닫게 될 것입니다."_

그리고 ("문제를 이해하는 것"의 중요성과 "우아함은 선택 사항이 아니다"라는 것을 강조한) O'Keefe는 다음과 같이 말했습니다.

_"실수에 대한 우리의 대응은, 사물의 본질을 탓하는 것이 아니라 실수를 저지르지 않을 방법을 찾는 것이어야 합니다."_

>
The key problem with testing is that a test (of any kind) that uses one particular set of inputs tells you nothing at all about the behaviour of the system or component when it is given a different set of inputs.
The huge number of different possible inputs usually rules out the possibility of testing them all, hence the unavoidable concern with testing will always be — have you performed the right tests?.
The only certain answer you will ever get to this question is an answer in the negative — when the system breaks.
Again, as Dijkstra observed [Dij71, EWD303]:
> >
“testing is hopelessly inadequate....(it) can be used very effectively to show the presence of bugs but never to show their absence.”
>
We agree with Dijkstra. Rely on testing at your peril.

테스팅의 중요한 문제점은 (어떤 종류가 되었건 간에) 특정 입력 세트를 사용하는 테스트는, 다른 입력 세트가 주어졌을 때 시스템 또는 컴포넌트의 동작에 대해 전혀 알려주지 않는다는 것입니다.

가능한 입력의 경우의 수가 너무 많기 때문에 일반적으로 모든 입력을 테스트하는 것은 불가능합니다.
따라서 테스트에 대한 피할 수 없는 고민은 항상 '올바른 테스트를 수행했는가?'가 될 수 밖에 없습니다.
이 질문에 대한 유일하고 확실한 답은 바로, 시스템에 고장이 났을 때 발생하는 부정적인 결과를 확인하는 것입니다.
다시 Dijkstra를 인용해보겠습니다.

_"테스트는 절망적으로 부적절하다... (테스트는) 버그의 존재를 보여주는 데는 매우 효과적으로 사용될 수 있지만 버그가 없다는 것을 보여주는 데에는 결코 사용될 수 없다."_

우리도 Dijkstra의 말에 동의합니다.
테스팅에 과도하게 의존하면 위험합니다.

>
This is not to say that testing has no use.
The bottom line is that all ways of attempting to understand a system have their limitations (and this includes both informal reasoning — which is limited in scope, imprecise and hence prone to error — as well as formal reasoning — which is dependent upon the accuracy of a specification).
Because of these limitations it may often be prudent to employ both testing and reasoning together.
>
It is precisely because of the limitations of all these approaches that simplicity is vital.
When considered next to testing and reasoning, simplicity is more important than either.
Given a stark choice between investment in testing and investment in simplicity, the latter may often be the better choice because it will facilitate all future attempts to understand the system — attempts of any kind.

이것은 테스팅이 무의미하다는 말이 아닙니다.
시스템을 이해하려는 모든 방법에는 한계가 있다는 것이 핵심입니다.
(여기에는 범위가 제한적이고 부정확해서 오류가 발생하기 쉬운 '비형식적 추론'과, 스펙의 정확성에 의존하는 '형식적 추론'이 모두 포함됩니다.)
이러한 한계로 인해 테스팅과 추론을 함께 사용하는 것이 현명한 선택일 수 있습니다.

이러한 모든 접근 방법들에 한계가 있기 때문에, 단순성이 매우 중요합니다.
테스팅, 그리고 추론과 동등하게 놓고 고려해 봤을 때, 단순성은 이들 중 어느 것보다 더 중요합니다.
테스팅에 대한 투자와 단순성에 대한 투자 사이에서 강력한 선택을 해야 하는 상황이라면, 단순성에 대한 투자가 더 나은 선택일 수 있습니다.
왜냐하면 단순성은 '어떠한 방식으로든 시스템을 이해하려 하는 모든 미래의 시도'들을 용이하게 만들어주기 때문입니다.

### 4 Causes of Complexity

복잡성의 원인

>
In any non-trivial system there is some complexity inherent in the problem that needs to be solved.
In real large systems however, we regularly encounter complexity whose status as “inherent in the problem” is open to some doubt.
We now consider some of these causes of complexity.

사소하지 않은 모든 시스템에서는 해결해야 하는 문제 자체에 복잡성이 내재되어 있습니다.
그러나 실제의 대규모 시스템에서 마주하게 되는 복잡성들은 '문제에 내재된'것인지 아닌지 구별하기 어려운 경우가 자주 있습니다.
이제 이러한 복잡성의 원인들 중 몇 가지를 살펴보겠습니다.

#### 4.1 Complexity caused by State

>
Anyone who has ever telephoned a support desk for a software system and been told to “try it again”, or “reload the document”, or “restart the program”, or “reboot your computer” or “re-install the program” or even “re-install the operating system and then the program” has direct experience of the problems that state[^orig-01] causes for writing reliable, understandable software.
>
The reason these quotes will sound familiar to many people is that they are often suggested because they are often successful in resolving the problem.
The reason that they are often successful in resolving the problem is that many systems have errors in their handling of state.
The reason that many of these errors exist is that the presence of state makes programs hard to understand.
It makes them complex.

누구든지 소프트웨어 시스템 서비스 센터에 전화를 걸었을 때 "다시 시도해 보세요", "문서 파일을 다시 로드해보세요", "프로그램을 재시작하세요", "컴퓨터를 재부팅하세요", "프로그램을 재설치하세요", 심지어 "운영체제를 다시 설치한 다음, 프로그램을 재설치하세요" 같은 말들을 들어본 사람이라면, 신뢰할 수 있고 이해하기 쉬운 소프트웨어를 작성하는 데 '상태'[^orig-01]가 일으키는 문제를 직접 경험한 적이 있는 셈입니다.

고객센터 전화통화에서 듣는 이런 말들이 많은 사람들에게 친숙하게 들리는 이유는, 문제를 해결하는 데 성공하는 경우가 많은 편이기 때문입니다.
그리고 이런 방법들이 종종 문제를 해결하는 데 성공하는 이유는, 많은 시스템들이 '상태'를 처리하는 데 오류가 있기 때문입니다.
이러한 오류가 많이 발생하는 이유는 상태의 존재가 프로그램을 이해하기 어렵게 만들기 때문입니다.
상태는 프로그램을 복잡하게 만듭니다.

>
When it comes to state, we are in broad agreement with Brooks’ sentiment when he says [Bro86]:
> >
“From the complexity comes the difficulty of enumerating, much less understanding, all the possible states of the program, and from that comes the unreliability”

>
— we agree with this, but believe that it is the presence of many possible states which gives rise to the complexity in the first place, and:
> >
“computers. . . have very large numbers of states. This makes conceiving, describing, and testing them hard. Software systems have orders-of-magnitude more states than computers do.”

상태에 대해 Fred Brooks가 다음과 같이 말한 것에 대해 우리는 폭넓게 동의합니다.

_"복잡성으로 인해, 프로그램의 모든 가능한 상태를 열거하는 것이 어려워지며, 이를 이해하는 것도 더욱 어려워지고, 그로 인해 결국 신뢰성이 떨어지게 됩니다."_

이에 동의하긴 하지만, 우리는 애초에 가능한 상태가 많다는 것 자체가 복잡성을 야기한다고 믿습니다.

_"컴퓨터는 매우 많은 수의 상태를 갖고 있습니다. 따라서 상태를 구상하고, 설명하고, 테스트하기란 어렵습니다. 소프트웨어 시스템은 컴퓨터보다 훨씬 더 많은 상태를 갖고 있습니다."_

##### 4.1.1 Impact of State on Testing

상태가 테스트에 미치는 영향

6쪽


## 주석

[^orig-01]: 원주: By “state” we mean mutable state specifically — i.e. excluding things like (immutable) single-assignment variables which are provided by logic programming languages for example <br/> 번역: "상태"란 특별히 변경 가능한 상태(mutable state)를 의미합니다. 예를 들어 논리 프로그래밍 언어에서 제공하는 (불변) 단일 할당 변수와 같은 것은 이 개념에서 제외됩니다.
