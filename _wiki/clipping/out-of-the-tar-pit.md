---
layout  : wiki
title   : Out of the Tar Pit
summary : 타르 구덩이에서 탈출하기
date    : 2023-05-16 19:07:40 +0900
updated : 2023-05-20 23:08:20 +0900
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

>
The severity of the impact of state on testing noted by Brooks is hard to over-emphasise.
State affects all types of testing — from system-level testing (where the tester will be at the mercy of the same problems as the hapless user just mentioned) through to component-level or unit testing.
The key problem is that a test (of any kind) on a system or component that is in one particular state tells you nothing at all about the behaviour of that system or component when it happens to be in another state.

Brooks가 언급한 상태가 테스트에 미치는 영향의 심각성은 아무리 강조해도 지나치지 않습니다.
상태는 시스템 수준 테스트(테스터가 방금 언급한 불행한 사용자와 같은 문제를 겪게 될 것입니다)에서부터
컴포넌트 수준 테스트, 단위 테스트에 이르기까지 모든 유형의 테스트에 영향을 미칩니다.
핵심적인 문제는 특정 상태에 있는 시스템이나 컴포넌트에 대한 테스트(모든 종류의 테스트)가 해당 시스템이나 컴포넌트가 '다른 상태일 때의 동작'에 대해 전혀 알려주지 않는다는 것입니다.

>
The common approach to testing a stateful system (either at the component or system levels) is to start it up such that it is in some kind of “clean” or “initial” (albeit mostly hidden) state, perform the desired tests using the test inputs and then rely upon the (often in the case of bugs ill-founded) assumption that the system would perform the same way — regardless of its hidden internal state — every time the test is run with those inputs.

상태기반 시스템(컴포넌트 또는 시스템 레벨에서)을 테스트하는 일반적인 접근방법은,

- 시스템이 '깨끗'하거나 '초기' 상태가 되도록 시작하고(초기 상태라 해도 대부분의 상태값은 숨겨져 있다),
- 테스트 입력을 사용하여 원하는 테스트를 수행한 다음,
- 해당 입력으로 테스트를 실행할 때마다 시스템이 숨겨진 내부 상태와 관계 없이 똑같은 방식으로 작동할 거라는 가정(종종 원인을 알 수 없는 버그가 나온다)에 의존하는 것입니다.

>
In essence, this approach is simply sweeping the problem of state under the carpet.
The reasons that this is done are firstly because it is often possible to get away with this approach and more crucially because there isn’t really any alternative when you’re testing a stateful system with a complicated internal hidden state.

이 접근방법은 본질적으로 '상태 문제'를 바닥 청소를 하지 않고 카펫 밑으로 쑤셔넣는 것에 불과합니다.
이렇게 하는 이유는,

- 첫째, 이 접근법을 통해 문제를 피할 수 있는 경우가 많기 때문이고,
- 둘쟤, 결정적으로 더 복잡한 '내부적으로 숨겨진 상태'가 있는 상태기반 시스템을 테스트할 때는 실제로 별다른 대안이 없기 때문입니다.

>
The difficulty of course is that it’s not always possible to “get away with it” — if some sequence of events (inputs) can cause the system to “get into a bad state” (specifically an internal hidden state which was different from the one in which the test was performed) then things can and do go wrong.
This is what is happening to the hypothetical support-desk caller discussed at the beginning of this section.
The proposed remedies are all attempts to force the system back into a “good internal state”.

물론, 어떤 연속된 이벤트(입력)들로 인해 시스템이 "나쁜 상태"로 빠질 수 있다면(특히 테스트해본 상태와 다른, 내부의 숨겨진 상태로), 상황이 실제로 잘못될 수 있다는 점이 어렵습니다.

이 장의 시작 부분에서 설명한 가상의 고객센터로 전화를 건 발신자에게는 이런 일이 발생하고 있는 것입니다.
그 고객에게 제안된 해결 방법은 모두, 시스템을 "좋은 내부 상태"로 되돌리려는 시도였습니다.

>
This problem (that a test in one state tells you nothing at all about the system in a different state) is a direct parallel to one of the fundamental problems with testing discussed above — namely that testing for one set of inputs tells you nothing at all about the behaviour with a different set of inputs.
In fact the problem caused by state is typically worse — particularly when testing large chunks of a system — simply because even though the number of possible inputs may be very large, the number of possible states the system can be in is often even larger.

이 문제(하나의 상태를 토대로 한 테스트가 다른 상태의 시스템에 대해 전혀 알려주지 않는다는 점)는 위에서 설명한 테스팅의 근본적인 문제 중 하나, 즉 '하나의 입력 세트에 대한 테스트'가 '다른 입력 세트의 동작에 대해 전혀 알려주지 않는다'는 문제와 직접적으로 유사합니다.

사실 상태로 인한 문제는 일반적으로 특히 시스템의 큰 덩어리를 테스트하는 경우일수록 더 심각합니다.
가능한 입력의 수도 매우 많을 수 있지만, 시스템이 가질 수 있는 가능한 상태의 수가 그보다 훨씬 더 많은 경우가 많기 때문입니다.

>
These two similar problems — one intrinsic to testing, the other coming from state — combine together horribly.
Each introduces a huge amount of uncertainty, and we are left with very little about which we can be certain if the system/component under scrutiny is of a stateful nature.

이 두 가지의 유사한 문제(하나는 테스트에 내재된 문제, 다른 하나는 상태에서 비롯된 문제)는 끔찍할 정도로 결합되어 있습니다.
이 문제들 각각은 엄청난 불확실성을 야기하며, 조사 대상인 시스템/컴포넌트가 상태의 성격을 띄고 있는지를 확신할 수 있는 방법도 거의 없습니다.

##### 4.1.2 Impact of State on Informal Reasoning

상태가 비형식적 추론에 미치는 영향

>
In addition to causing problems for understanding a system from the outside, state also hinders the developer who must attempt to reason (most commonly on an informal basis) about the expected behaviour of the system “from the inside”.

상태는 외부에서 시스템을 이해하는 데 문제를 일으킬 뿐만 아니라, '내부에서' 시스템의 예상 동작을 추론(일반적으로 비형식적인 추론 기반)해야 하는 개발자에게도 방해가 됩니다.

>
The mental processes which are used to do this informal reasoning often revolve around a case-by-case mental simulation of behaviour: “if this variable is in this state, then this will happen — which is correct — otherwise that will happen — which is also correct”.
As the number of states — and hence the number of possible scenarios that must be considered — grows, the e↵ectiveness of this mental approach buckles almost as quickly as testing (it does achieve some advantage through abstraction over sets of similar values which can be seen to be treated identically).

이러한 비형식적 추론에 동원되는 정신적 프로세스는 종종 동작 사례에 대한 정신적인 시뮬레이션을 중심으로 이루어집니다.
"만약에 이 변수가 이런 상태에 있다면, 이런 일이 일어나겠지. 음 이건 맞고, 그렇지 않으면 저런 일이 일어나겠지. 음 이것도 맞고." 이런 식으로 말이죠.

상태의 수와 고려해야 하는 가능한 시나리오들의 수가 증가함에 따라, 이런 정신적인 접근 방식의 효율성은 테스팅만큼이나 빠르게 떨어져버립니다. (다만 테스팅은 동일하게 취급되는 것으로 볼 수 있는 유사한 값 집합에 비해서는 추상화를 통해 꽤나 이득을 얻을 수 있습니다.)

>
One of the issues (that affects both testing and reasoning) is the exponential rate at which the number of possible states grows — for every single bit of state that we add we double the total number of possible states.
Another issue — which is a particular problem for informal reasoning — is contamination.

테스팅과 추론 모두에 영향을 미치는 문제 중 하나는, 가능한 상태의 수가 기하급수적으로 증가한다는 것입니다.
상태를 하나 추가할 때마다 가능한 상태의 총 수가 두 배로 늘어납니다.
그리고 비형식적 추론에서 특히 문제가 되는 또 다른 문제는 오염(contamination)입니다.

>
Consider a system to be made up of procedures, some of which are stateful and others which aren’t.
We have already discussed the difficulties of understanding the bits which are stateful, but what we would hope is that the procedures which aren’t themselves stateful would be more easy to comprehend.
Alas, this is largely not the case.
If the procedure in question (which is itself stateless) makes use of any other procedure which is stateful — even indirectly — then all bets are off, our procedure becomes contaminated and we can only understand it in the context of state.
If we try to do anything else we will again run the risk of all the classic state-derived problems discussed above.
As has been said, the problem with state is that “when you let the nose of the camel into the tent, the rest of him tends to follow”.

어떤 시스템 하나가 프로시저들로 만들어져 있는데, 그 프로시저 중 몇몇은 상태 기반이고 나머지는 그렇지 않다고 가정해 봅시다.
우리는 이미 상태 기반 비트를 이해하는 것에 대한 어려움을 이야기한 바 있습니다.
따라서 상태 기반이 아닌 프로시저는 이해하기 쉬우면 좋겠지만, 아쉽게도 그렇지 않습니다.

만약 문제의 프로시저(stateless)가 '간접적으로라도' 상태 기반의 다른 프로시저를 사용한다면,
이 프로시저도 오염이 되어 '상태의 문맥'에서만 이해할 수 있게 되어버립니다.
그리고 그 외의 다른 작업을 시도한다 해도 위에서 언급한 전형적인 상태 기반 문제들을 다시 한 번 마주하게 될 위험이 있습니다.
앞에서 말했듯이, 상태의 문제는 _"낙타의 코를 텐트 안으로 들여보내면, 낙타의 나머지 몸뚱이도 코를 따라가는 경향이 있다"_ 는 말과 비슷합니다.

>
As a result of all the above reasons it is our belief that the single biggest remaining cause of complexity in most contemporary large systems is state, and the more we can do to limit and manage state, the better.

위의 모든 이유로 인해, 대부분의 현대적인 대규모 시스템에서 복잡성을 유발하는 가장 큰 원인은 상태이며, 상태를 제한하고 관리하기 위해 할 수 있는 일이 많을수록 더 좋다고 생각합니다.

#### 4.2 Complexity caused by Control

제어로 인한 복잡성

>
Control is basically about the order in which things happen.

'제어'는 기본적으로 일이 진행되는 순서에 대한 것입니다.

>
The problem with control is that very often we do not want to have to be concerned with this.
Obviously — given that we want to construct a real system in which things will actually happen — at some point order is going to be relevant to someone, but there are significant risks in concerning ourselves with this issue unnecessarily.

제어의 문제점은 우리가 이 문제에 대해 신경쓰고 싶지 않은 경우가 많다는 것입니다.
물론, '실제로 뭔가 일이 일어나는 시스템'을 구축하고자 한다면 순서 문제는 언젠가는 중요해질 것입니다.
그러나 이 문제에 불필요하게 신경을 쓰는 것은 상당한 위험이 따르는 일입니다.

>
Most traditional programming languages do force a concern with ordering — most often the ordering in which things will happen is controlled by the order in which the statements of the programming language are written in the textual form of the program.
This order is then modified by explicit branching instructions (possibly with conditions attached), and subroutines are normally provided which will be invoked in an implicit stack.

대부분의 전통적인 프로그래밍 언어는 '순서'에 대한 고려를 필요로 합니다.
주로 프로그래밍 언어의 명령문이 프로그램의 텍스트 형식으로 작성된 순서가 실행될 일들의 순서를 결정하는 방식입니다.
이렇게 결정된 순서는 명시적인 제어 분기 명령어를 통해 변경될 수 있고, 이런 분기 명령에는 분기를 위한 조건이 붙을 수 있으며, 일반적으로 암묵적 스택에서 호출되는 서브루틴이 제공됩니다.

>
Of course a variety of evaluation orders is possible, but there is little variation in this regard amongst widespread languages.

물론 평가 순서는 다양한 방식으로도 가능하지만, 널리 사용되는 프로그래밍 언어들 사이에서는 큰 차이가 없습니다.

>
The difficulty is that when control is an implicit part of the language (as it almost always is), then every single piece of program must be understood in that context — even when (as is often the case) the programmer may wish to say nothing about this.
When a programmer is forced (through use of a language with implicit control flow) to specify the control, he or she is being forced to specify an aspect of how the system should work rather than simply what is desired.
Effectively they are being forced to over-specify the problem.
Consider the simple pseudo-code below:

어려운 지점은 제어가 언어의 암묵적인 부분인 경우(거의 대부분이 해당됨), 프로그래머가 이에 대해 어떤 것도 명시적으로 표현하고 싶지 않은 경우에도 모든 프로그램을 해당 맥락에서 이해해야만 한다는 것입니다.

프로그래머가 (암묵적 제어 흐름을 가진 언어를 사용해서) 제어를 명시하도록 강요받고 있는 경우라면, 원하건 원하지 않건 시스템이 어떻게 작동해야 하는지에 대한 상세 내역을 지정할 수 밖에 없게 됩니다.
사실상 문제를 과도할 정도로 상세히 명시하도록 강요당하고 있는 것입니다.

아래의 간단한 의사 코드를 읽어 봅시다.

>
```
a := b + 3
c := d + 2
e := f * 4
```

>
In this case it is clear that the programmer has no concern at all with the order in which (i.e. how) these things eventually happen.
The programmer is only interested in specifying a relationship between certain values, but has been forced to say more than this by choosing an arbitrary control flow.
Often in cases such as this a compiler may go to lengths to establish that such a requirement (ordering) — which the programmer has been forced to make because of the semantics of the language — can be safely ignored.

이런 코드의 경우, 프로그래머는 이런 일들이 발생하는 순서(즉, 방법)에 대해서는 전혀 관심이 없음이 분명해 보입니다.
이 코드를 작성한 프로그래머는 특정한 값들 사이의 관계를 지정하는 데에만 관심이 있습니다.
그러나 임의의 제어 흐름을 선택함으로써 의도한 것보다 더 많은 것을 표현하도록 강요받고 있습니다.

이런 경우 컴파일러는 '언어의 의미론 때문에 프로그래머가 어쩔 수 없이 만든' 이런 요구 사항들(순서)을 안전하게 무시할 수 있다는 것을 입증하기 위해 많은 노력을 기울이게 될 수 있습니다.

>
In simple cases like the above the issue is often given little consideration, but it is important to realise that two completely unnecessary things are happening — first an artificial ordering is being imposed, and then further work is done to remove it.

위의 예제와 같은 단순한 경우에는 이런 문제를 거의 고려하지 않는 경우가 많습니다.
그러나 먼저 '인위적인 순서'가 부여되었다가 이런 것을 또 제거하기 위한 추가적인 작업이 수행되는 등, 완전히 불필요한 두 가지 일이 발생하고 있다는 사실을 인식하는 것이 중요합니다.

>
This seemingly innocuous occurrence can actually significantly complicate the process of informal reasoning.
This is because the person reading the code above must effectively duplicate the work of the hypothetical compiler — they must (by virtue of the definition of the language semantics) start with the assumption that the ordering specified is significant, and then by further inspection determine that it is not (in cases less trivial than the one above determining this can become very difficult).
The problem here is that mistakes in this determination can lead to the introduction of very subtle and hard-to-find bugs.

별로 해롭지 않아 보이기도 하는 이 문제는, 실제로 비형식적 추론 과정을 상당히 복잡하게 만들 수 있습니다.

왜냐하면 위의 코드를 읽는 사람은 언어 의미론의 정의에 따라 지정된 '순서'가 중요하다는 가정 하에서 생각을 시작하여, 추가적인 검사를 통해 사실은 순서가 중요하지 않았다는 것을 판단해야 하기 때문입니다(위의 경우보다 덜 사소한 경우에는 이를 결정하는 것이 매우 어려워질 수 있습니다).

여기에서 문제는 이러한 판단을 잘못 내리면 매우 미묘하고 찾기 어려운 버그가 발생할 수 있다는 것입니다.

>
It is important to note that the problem is not in the text of the program above — after all that does have to be written down in some order — it is solely in the semantics of the hypothetical imperative language we have assumed.
It is possible to consider the exact same program text as being a valid program in a language whose semantics did not define a run-time sequencing based upon textual ordering within the program.[^orig-02]

(프로그램을 결국 어떤 순서에 맞게 작성해야 한다는 것은 맞는 말이지만)
문제가 위의 예제 프로그램 텍스트에 있는 것이 아니라,
우리가 가정한 가상의 명령형 언어의 의미론에 문제가 있다는 점에 주목하는 것이 중요합니다.

프로그램 내의 텍스트 순서에 따른 런타임 순서를 정의하지 않는 언어에서는, 동일한 프로그램 텍스트가 (실행 순서에 대한 가정을 포함하지 않아도) '유효한 프로그램'으로 해석될 수 있습니다.[^orig-02]

>
Having considered the impact of control on informal reasoning, we now look at a second control-related problem, concurrency, which affects testing as well.

제어가 비형식적 추론에 미치는 영향을 고려했으니, 이제 테스팅에도 영향을 미치는 또 다른 제어 문제인 '동시성(concurrency)'에 대해서도 살펴보겠습니다.

>
Like basic control such as branching, but as opposed to sequencing, concurrency is normally specified explicitly in most languages.
The most common model is “shared-state concurrency” in which specification for explicit synchronization is provided.
The impacts that this has for informal reasoning are well known, and the difficulty comes from adding further to the number of scenarios that must mentally be considered as the program is read.
(In this respect the problem is similar to that of state which also adds to the number of scenarios for mental consideration as noted above).

분기와 같은 기본 제어와 비슷하긴 하지만, 시퀀싱과는 달리 '동시성'은 일반적으로 대부분의 프로그래밍 언어에서는 명시적으로 지정됩니다.

가장 일반적인 모델은 명시적인 동기화를 위한 스펙이 제공되는 "공유 상태 동시성(shared-state concurrency)"입니다.

이것이 비형식적 추론에 미치는 영향은 잘 알려져 있으며, 프로그램을 읽는 동안 고려해야 하는 가능한 시나리오의 수가 증가함으로써 어려움이 따르는 것도 알려져 있습니다.
(이 문제는 이전에 언급한 '상태'의 문제와 비슷하게, 고려해야 하는 가능한 시나리오의 수가 증가한다는 점에서 어려움이 있습니다.)

>
Concurrency also affects testing, for in this case, we can no longer even be assured of result consistency when repeating tests on a system — even if we somehow ensure a consistent starting state.
Running a test in the presence of concurrency with a known initial state and set of inputs tells you nothing at all about what will happen the next time you run that very same test with the very same inputs and the very same starting state... and things can’t really get any worse than that.

동시성은 테스팅에도 영향을 미치는데, 동시성이 관여되는 경우 초기 상태를 어떻게든 일정하게 유지한다 해도 시스템에서 테스트를 반복할 때마다 결과의 일관성은 보장할 수 없게 됩니다.

알려진 초기 상태와 입력 집합이 있어도 동시성이 있는 상태에서 테스트를 실행하면, 똑같은 입력과 똑같은 초기 상태로 똑같은 테스트를 다시 실행한다 하더라도 어떤 일이 일어날지 전혀 예측할 수 없습니다... 이보다 더 나쁠 수는 없습니다.

#### 4.3 Complexity caused by Code Volume

10쪽


## 주석

[^orig-01]: 원주: By “state” we mean mutable state specifically — i.e. excluding things like (immutable) single-assignment variables which are provided by logic programming languages for example <br/> 번역: "상태"란 특별히 변경 가능한 상태(mutable state)를 의미합니다. 예를 들어 논리 프로그래밍 언어에서 제공하는 (불변) 단일 할당 변수와 같은 것은 이 개념에서 제외됩니다.

[^orig-02]: 원주: Indeed early versions of the Oz language (with implicit concurrency at the statement level) were somewhat of this kind [vRH04, p809] <br/> 번역: 실제로 Oz 프로그래밍 언어의 초기 버전이 바로 이런 종류의 언어였습니다.(명령문 수준에서 암시적인 동시성이 있었음) 
