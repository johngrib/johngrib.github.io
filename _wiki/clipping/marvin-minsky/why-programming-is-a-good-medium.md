---
layout  : wiki
title   : WHY PROGRAMMING IS A GOOD MEDIUM FOR EXPRESSING POORLY UNDERSTOOD AND SLOPPILY­FORMULATED IDEAS by Marvin Minsky
summary : 제대로 이해되지 않고 엉성하게 형식화된 아이디어를 표현할 때 프로그래밍이 좋은 수단인 이유 - 마빈 민스키
date    : 2022-08-06 11:15:12 +0900
updated : 2023-04-03 23:26:48 +0900
tag     : 번역 lisp
resource: 5A/3FD6C4-694B-4196-9BF0-13AB73D9B6F0
toc     : true
public  : true
parent  : [[/clipping]]
latex   : true
---
* TOC
{:toc}

- 원문: [WHY PROGRAMMING IS A GOOD MEDIUM FOR EXPRESSING POORLY UNDERSTOOD AND SLOPPILY­FORMULATED IDEAS]( https://web.media.mit.edu/~minsky/papers/Why%20programming%20is--.html )

이 글은 마빈 민스키의 1967년 글을 번역한 것입니다.
의역이 많으므로 원문과 대조해가며 읽기를 권합니다.

## WHY PROGRAMMING IS A GOOD MEDIUM FOR EXPRESSING POORLY UNDERSTOOD AND SLOPPILY­FORMULATED IDEAS

>
This is a slightly revised version of a chapter published in _Design and Planning II -- Computers in Design and Communication_, (Martin Krampen and Peter Seitz, eds.), Visual Committee Books, Hastings House Publishers, New York, 1967.

이 글은 1967년에 출간된 Design and Planning II -- Computers in Design and Communication 의 한 챕터를 약간 수정한 것입니다.

>
_There is a popular, widespread belief that computers can do only what they are programmed to do.
This false belief is based on a confusion between form and content.
A rigid grammar need not make for precision in describing processes.
The programmer must be very precise in following the computer grammar, but the content he wants to be expressed remains free.
The grammar is rigid because of the programmer who uses it, not because of the computer.
The programmer does not even have to be exact in his own ideas‑he may have a range of acceptable computer answers in mind and may be content if the computer's answers do not step out of this range.
The programmer does not have to fixate the computer with particular processes.
In a range of uncertainty he may ask the computer to generate new procedures, or he may recommend rules of selection and give the computer advice about which choices to make.
Thus, computers do not have to be programmed with extremely clear and precise formulations of what is to be executed, or how to do it._

컴퓨터는 프로그래밍된 작업만 수행할 수 있다는 믿음이 널리 펴져 있습니다.
이 잘못된 믿음은 형식<sub>form</sub>과 내용<sub>content</sub>을 혼동하는 데에서 비롯됐습니다.
아무리 문법이 엄격하다 해도 프로세스를 기술할 때의 정확성까지 보장해주지는 않습니다.
프로그래머는 컴퓨터 문법을 매우 정확하게 따라야 하지만, 의도하는 내용<sub>content</sub>은 얼마든지 자유롭게 표현할 수 있는 셈이죠.

문법이 엄격한 이유는 문법을 사용하는 프로그래머 때문입니다. 컴퓨터 때문이 아닙니다.
프로그래머는 아이디어를 아주 정확하게 가다듬지 않아도 됩니다.
컴퓨터의 응답 범위를 적절히 생각해두고 컴퓨터의 응답이 이 범위를 벗어나지 않으면 만족하는 것이 프로그래머입니다.
프로그래머는 특정 프로세스에 맞춰 컴퓨터를 고정해놓고 사용하지 않아도 됩니다.
문제가 불확실한 영역에 있다면 프로그래머는 컴퓨터에게 새로운 절차<sub>procedures</sub>를 생성하도록 요청하면 그만입니다.
아니면 선택 규칙을 추천해주는 식으로 어떤 선택을 해야 하는지에 대해 컴퓨터에게 알려주는 방법도 있습니다.

즉, 컴퓨터는 무엇을 어떻게 실행해야 하는지에 대해 극도로 명확하고 정확한 공식을 통해 프로그래밍하지 않아도 되는 것입니다.

### =====

>
The argument presented here is not specifically about "design," but about the general question of what we can get computers to help us do.
For a number of reasons, it is customary to underestimate the possibilities.
To begin, I want to warn against the pitfall of accepting the apparently "moderate" positions taken by many people who believe they understand the situation.
Science‑fiction writers, scientists of all descriptions, economic forecasters, psychologists, and even logicians tell us often, and make it a convincing tale, that computers will never really think.
_"We must not fall into anthropomorphic ways of thinking about machines; they do only what their programs say; they can't be original or creative."_
We have all heard these views, and most of us accept them.

여기에서 말하고자 하는 바는 구체적으로 "설계<sub>design</sub>"에 대한 것이 아닙니다.
우리가 컴퓨터를 사용해서 무엇을 할 수 있는가라는 광범위한 질문이 우리의 주제라 할 수 있습니다.

일반적으로 여러가지 이유로 컴퓨터의 가능성은 과소평가되고 있습니다.
그래서 나는 일단 겉보기에 "온건해 보이는" 입장을 받아들이는 것의 함정을 경고하면서 이야기를 시작하고 싶습니다.
상황을 이해한다고 생각하는 많은 사람들이 취하는 입장이죠.
SF 작가라던가, 온갖 분야의 과학자, 경제 예측가, 심리학자, 심지어 논리학자들도 진지한 논조로 컴퓨터가 실제로는 절대로 생각을 못하는 기계라고 이야기하곤 합니다.
*"기계를 의인화하는 사고 방식에 빠지면 안됩니다. 기계는 프로그램된 대로만 작동하며 스스로 독창적일 수 없고, 창의적이지도 않습니다."*
이런 말을 안 들어본 사람은 없겠죠. 대다수의 사람들은 이런 의견을 무비판적으로 받아들입니다.

>
It is easy to understand why a humanist will want to rhapsodize about the obscurity of thought processes, for there is an easy non sequitur between that obscurity and the desired an anthropomorphic uniqueness.
But this isn't the non sequitur important here.
The fallacy under discussion is the widespread superstition that we can't write a computer program to do something unless one has an extremely clear, precise formulation of what is to be done, and exactly how to do it.
This superstition is propagated at least as much by scientists—and even by "computer scientists"—as by humanists.

사고의 프로세스의 난해함에 대해 인본주의자들이 이렇게 강하게 이야기하고 싶어하는 이유를 이해하는 것은 간단합니다.
이런 종류의 의인화는 다른 곳에서 찾아볼 수 없는 독특한 것이므로, 이 주제의 난해함과 구분해서 생각하기가 쉽지 않기 때문입니다.

그러나 이런 것은 이 글에서 중요한 논점이 아닙니다.
우리가 따져보고 있는 문제는, *"수행할 작업과 수행하는 방법에 대해 아주 명확하고 정확한 공식이 없으면 컴퓨터 프로그램을 만들어서 돌릴 수 없다"* 는 엄청 유명한 미신입니다.
이 미신은 과학자들은 물론이고 심지어 "컴퓨터 과학자"들에게도 인본주의자들만큼이나 퍼져 있습니다.

>
What we are told, about the limitations of computers, usually takes this general form:
"A computer cannot create. It can do only exactly what it is told. Unless a process is formulated with perfect precision, you cannot make a computer do it."
Now this is perfectly true in one sense, and it is absolutely false in another.
Before explaining why, it is interesting to note that ‑ long before computers ‑ the same was said of the Devil: he could only appear to be creative.

우리 귀에 들려오곤 하는 컴퓨터의 한계에 대한 이야기는 보통 이런 식입니다.
*"컴퓨터는 스스로 창조하지 못합니다. 컴퓨터는 그냥 시키는 것만 할 수 있습니다. 완벽한 정밀도로 공식화한 프로세스를 주지 않으면 컴퓨터는 돌아가지 않을 겁니다."*

오늘날의 관점에서 이 말은 어떤 의미에서는 완벽하게 사실이기도 하지만, 한편으로는 절대적으로 거짓이기도 합니다.
왜 그런지 이유를 설명하기 전에 문득... 컴퓨터가 등장하기 한참 전에 악마에 대해서도 똑같은 말이 있었다는 것이 무척 흥미롭게 느껴집니다. 악마는 창조력을 갖고 있는 것처럼 보이지만 실제로는 그렇지 않다는 거요.

>
In the September 1966 issue of Scientific American, I discussed three programs: one is the checkers program of Samuel, which plays at the master level.
Another is the ANALOGY program of Evans, which does rather well on certain intelligence‑test problems of recognizing analogous relations between geometric figures.
The third is the program "STUDENT" of Bobrow, which takes high school algebra "story" problems given in English:
> > Mary is twice as old as Ann was when Mary was as old as Ann is now. If Mary is 24 years old, how old is Ann?
>
and solves some, but not all of them.
In that article I was concerned with problems of going further, to extend such work in the direction of more versatile general intelligence.
But for my purpose here, they can serve as adequate examples even in their present state, for while limited in what they can handle, they already do enough to confound the old comfortable superstitions.

Scientific American 1966년 9월호에서 나는 세 가지 프로그램에 대해 논의한 바 있습니다.
하나는 마스터 수준의 실력을 보이는 Samuel의 체커 프로그램입니다.
다른 하나는 Evans의 ANALOGY 프로그램인데, 기하학적 도형들 사이의 유사성을 인식하는 종류의 지능 테스트 문제를 상당히 잘 풀어냅니다.
그리고 세 번째는 영어로 된 "이야기" 형식의 고등학교 대수 문제를 푸는 Bobrow의 "STUDENT" 프로그램입니다. 이런 식이죠.

**"메리의 나이는 메리가 앤의 현재 나이였을 때의 두 배입니다. 메리가 24세라면, 앤은 현재 몇 살입니까?"**

이 프로그램은 문제를 제법 풀긴 하지만 모든 문제를 잘 풀어내지는 못했습니다.
그 글에서 내가 표현하려 한 주제는 다재다능한 일반 지능으로의 발전에 대한 것이었습니다만,
이 프로그램들은 미신을 타파하겠다는 이 글의 목적에도 적합한 예제가 될 수 있을 것 같습니다.
왜냐하면 이 프로그램들이 제한적인 대상을 취급하긴 하지만 오랫동안 받아들여진 미신을 뒤흔들기에는 충분할 것으로 보이기 때문입니다.

>
The old view is that a program is "nothing but" a set of rigid rules for exactly what to do in each situation.
This is indeed a useful point of view for reassuring beginners at programming, or for analyzing the programs written by beginners.
However, for more advanced processes, while "perfectly" true in one sense, it would be as correct to say that "houses are nothing but arrangements of construction materials" or "books are merely long strings of words."
Indeed, a review of my Scientific American article (in Computer Reviews 8, 1, Jan. 1967) asserts that these programs are made of "dictionary lookup routines, sequences of search and comparison functions, and sort-merge type operations."

프로그램에 대한 고리타분한 관점 중 하나는 프로그램이 "아무것도 아니며<sub>nothing but</sub>" 단지 각각의 상황에서 정확히 무엇을 해야 하는지에 대한 엄격한 규칙을 모아놓은 집합이라는 것입니다.
이 관점은 프로그래밍 초보자를 안심하게 해주는 효능을 갖고 있고, 초보자가 작성한 프로그램을 분석할 때에 한해서는 유용하기도 합니다.
그러나 고급 프로세스에 대해 논할 때 이 관점은 특정한 의미에서만 "완전히" 사실일 뿐이며 "집은 건설자재들을 배치해 놓은 것에 불과하다", "책은 단순히 단어들을 길게 늘어놓은 것에 불과하다"라고 말하는 것과 다름이 없습니다.

실제로, Scientific American에 실린 나의 글에 대한 어떤 리뷰에서는 프로그램은 "dictionary lookup 루틴, search 및 comparison 함수들의 sequence, sort-merge 타입 연산"들로 구성된다고 말하는 반론을 읽어볼 수 있습니다.

### LOGIC AND CONSISTENCY

**논리와 일관성**

>
Let me begin by discussing one of the skeptical attitudes that is derived from some statements of good logicians and bad philosophers.
We are told that certain theorems about proving the self‑consistency of logical systems have the consequence:
"It is impossible to mechanize completely the process of discovery and therefore humans will always have the advantage over machines."
I am sure almost every reader has heard of Godel's theorem, and most have heard of this alleged consequence.
But this is not a logical consequence, for it is based on a careless technical oversight.
If applicable at all to the problem‑solving question, Godel's theorem applies strictly only to perfectly self‑consistent logical systems.
People are not this consistent, and there is no reason whatever why we should feel constrained to build our machines along such lines.
Instead we can, and already do, build machines that can tolerate contradictory factual assertions.
To do this, we have to add selection rules for resolving contradictions, priority hierarchies for choosing between incompatible statements, and the like.
A simple example of such a scheme is described in Bertram Raphael's 1964 MIT PhD dissertation.
Here is an example of a dialog with that program:
>
> ```
> →       EVERY BOY IS A PERSON
> (I UNDERSTAND)
> →       A FINGER IS PART OF A HAND
> (I UNDERSTAND)
> →       EACH PERSON HAS TWO HANDS
> THE ABOVE SENTENCE IS AMBIGUOUS •• PLEASE REPHRASE IT)
> →       THERE ARE TWO HANDS ON EACH PERSON
> (I UNDERSTAND)
> →       HOW MANY FINGERS DOES JOHN HAVE?
> (I DON'T KNOW WHETHER FINGER IS PART OF JOHN)
> →       JOHN IS A BOY
> (I UNDERSTAND)
> →       HOW MANY FINGERS DOES JOHN HAVE?
> (HOW MANY FINGERS PER HAND?)
> →       EVERY HAND HAS 5 FINGERS)
> (I UNDERSTAND)
> →       HOW MANY FINGERS DOES JOHN HAVE?
> (THE ANSWER IS 10)
> →       HOW MANY AUTOMOBILES DOES JOHN HAVE?
> THE ABOVE SENTENCE IS AMBIGUOUS. PLEASE RE-PHRASE IT)
> →       WHO IS PRESIDENT OF THE UNITED STATES?)
> (STATEMENT FORM NOT RECOGNIZED)
> →       THE B0Y IS JUST TO THE LEFT OF THE TABLE
> (G02840 IS A TABLE)
> (I UNDERSTAND)
> →       THE LAMP IS JUST TO THE LEFT OF THE TABLE
> (G02841 IS A LAMP)
> (THE ABOVE STATEMENT IS IMPOSSIBLE)
> →       THE TABLE IS TO THE RIGHT OF THE CHAIR
> (G02842 IS A CHAIR)
> (I UNDERSTAND)
> →       WHAT IS THE RELATIVE POSITION OF A PERSON?
> (THE LEFT-TO-RIGHT ORDER IS AS FOLLOWS)
> (CHAIR BOY TABLE))
> ```

좋은 논리학자와 나쁜 철학자의 몇 가지 발언에서 유래된 회의적인 태도 중 하나를 논의하는 것으로 시작해보죠.

논리 시스템의 자기 일관성을 증명하는 것에 대한 어떤 정리는 *"발견 과정을 완전히 기계화하는 것은 불가능하다. 그러므로 인간은 항상 기계보다 우수하다"* 는 결론을 내렸다고 합니다.
나는 이 글을 읽는 독자 대부분이 괴델의 정리를 들어본 적이 있고 이런 주장에 대해서도 들어본 적이 있을 거라고 확신합니다. 이 주장은 기술적으로 부주의하게 간과한 면이 있죠. 그래서 논리적인 결론이라 할 수 없습니다.

만약 problem‑solving 문제에 적용한다 치면 괴델의 정리는 완벽히 자기 모순이 없는 논리 시스템에만 엄격하게 적용할 수 있습니다.
그러나 인간은 그렇게까지 일관성을 갖는 존재가 아니며, 우리가 굳이 그런 까다로운 제약에 따라 기계를 만들어야 할 이유도 없습니다.
그래서 그렇게 모순 없는 것을 만드는 대신에 우리는 모순되는 주장들을 수용하는 것이 가능한 기계를 만들 수 있으며, 이미 실제로 그렇게 하고 있습니다.
이것이 가능하려면 모순들을 해결하기 위한 선택 규칙과 양립할 수 없는 선언들에 적용할 우선순위를 규칙 등을 추가해야 합니다.

1964년 Bertram Raphael의 MIT 박사 논문에 이런 설계의 간단한 예가 나와 있습니다.
다음은 그 프로그램의 대화 예제입니다.


```
→       모든 소년은 사람이다
(알겠습니다)
→       손가락은 손의 일부이다
(알겠습니다)
→       사람은 두 개의 손을 갖고 있다
위의 문장은 모호합니다 .. 다시 말해 주십시오)
→       각각의 사람들은 두 개의 손을 갖고 있다
(알겠습니다)
→       JOHN은 손가락을 몇 개 갖고 있는가?
(손가락이 JOHN의 일부인지 아닌지 모르겠습니다)
→       JOHN은 소년이다
(알겠습니다)
→       JOHN은 손가락을 몇 개 갖고 있는가?
(손 하나에는 몇 개의 손가락이 있습니까?)
→       모든 손은 다섯개의 손가락을 갖는다)
(알겠습니다)
→       JOHN은 손가락을 몇 개 갖고 있는가?
(답은 10 입니다)
→       JOHN은 자동차를 몇 대 갖고 있는가?
위의 문장은 모호합니다. 다시 말해 주십시오)
→       미국 대통령은 누구인가?)
(질문 형식을 인식할 수 없음)
→       소년은 테이블 바로 왼쪽에 있다
(G02840은 테이블입니다)
(알겠습니다)
→       램프는 테이블 바로 왼쪽에 있다
(G02841은 램프입니다)
(위의 설명은 불가능합니다)
→       테이블은 의자의 오른쪽에 있다
(G02842는 의자입니다)
(알겠습니다)
→       사람의 상대적인 위치는?
(THE LEFT-TO-RIGHT ORDER IS AS FOLLOWS)
(왼쪽에서 오른쪽 순서에 따르겠습니다)
(의자 소년 테이블))
```

>
Raphael's knowledge‑collecting, question‑answering system shows how it gives higher priority to particular facts when they conflict with general principles.
This "Exception Principle" is, of course, a rather simple‑minded way to resolve contradictions, and it can be only used when there is a clear difference in level of generality between the statements.
When they are on the same level, the program simply rejects the later statement, as seen here:
>
> ```
> →       THERE ARE 5 FINGERS ON EVERY HAND)
> (I UNDERSTAND)
> →       THERE ARE TWO HANDS ON A PERSON
> (I UNDERSTAND)
> →       A BOY IS A PERSON
> (I UNDERSTAND)
> →       TOM IS A BOY
> (I UNDERSTAND)
> →       DICK IS A BOY
> (I UNDERSTAND)
> →       HARRY IS A BOY
> (I UNDERSTAND)
> →       TOM HAS NINE FINGERS
> (THE ABOVE SENTENCE IS AMBIGUOUS •• BUT I ASSUME (HAS) MEANS (HAS AS PARTS))
> (I UNDERSTAND)
> →       DICK HAS ONE HAND
> (THE ABOVE SENTENCE IS AMBIGUOUS •• BUT I ASSUME (HAS) MEANS (HAS AS PARTS))
> (I UNDERSTAND)
> →       HOW MANY FINGERS DOES TOM HAVE?
> (THE ANSWER IS 9)
> →       HON MANY FINGERS DOES DICK HAVE?
> (THE ANSWER IS 5)
> →       HOW MANY FINGERS DOES HARRY HAVE?
> (THE ANSWER IS 10)
> →       HOW MANY FINGERS DOES JOE HAVE?
> (I DON’T KNOW WHETHER FINGER IS PART OF JOE)
> ```

Raphael의 지식 수집, 질문 응답 시스템은 일반 원칙과 특정한 사실들이 모순될 때 어떤 방식으로 우선 순위를 부여하는지를 보여줍니다.
모순을 해결하기 위한 방법들 중에서 이러한 "예외 원칙"은 상당히 단순한 방법입니다.
명령문들 사이에 일반성 레벨에 확실한 차이가 있는 경우에만 사용할 수 있죠.
명령문들이 같은 레벨에 있다면 프로그램은 아래와 같이 단순하게 나중에 입력된 명령을 거부합니다.

```
→       모든 손에는 다섯 개의 손가락이 있다)
(알겠습니다)
→       한 사람은 두 개의 손을 갖고 있다
(알겠습니다)
→       소년은 사람이다
(알겠습니다)
→       TOM은 소년이다
(알겠습니다)
→       DICK은 소년이다
(알겠습니다)
→       HARRY는 소년이다
(알겠습니다)
→       TOM은 손가락을 아홉개 갖고 있다
(위의 문장은 모호합니다 .. 그러나 (갖는다)의 의미를 (부분으로 갖는다)로 가정합니다)
(알겠습니다)
→       DICK은 손을 하나 갖고 있다
(위의 문장은 모호합니다 .. 그러나 (갖는다)의 의미를 (부분으로 갖는다)로 가정합니다)
(알겠습니다)
→       TOM의 손가락은 몇 개인가?
(답은 9 입니다)
→       DICK의 손가락은 몇 개인가?
(답은 5 입니다)
→       HARRY의 손가락은 몇 개인가?
(답은 10 입니다)
→       JOE의 손가락은 몇 개인가?
(손가락이 JOE의 일부인지 아닌지 모르겠습니다)
```

>
But of course Raphael could have written some other priority rule.
Incidentally, the program's statement, "The above sentence is ambiguous..." concerns the possibility that the word "has" might mean either "has as a part" or "owns. "
Raphael's program usually guesses correctly by a study of whether the entities in question are already known to own things, or to be parts of things, etc.
I will describe this later in more detail.
Raphael's demonstration that such "contextual" decisions can be programmed, illustrates a more general point, or rather, shows a different and healthier attitude toward programs than the "nothing but" approach.
We will therefore try to explain some of these better ways to think about programs.

물론 Raphael은 다른 방식으로 작동하는 우선순위 규칙을 만들 수도 있었겠지만 그러지 않았습니다.
이 프로그램에서 말하는 *"위의 문장은 모호합니다..."* 는 *"갖는다<sub>has</sub>"* 라는 단어가 *"부분으로 갖는다<sub>has as a part</sub>"* 또는 *"소유한다<sub>owns</sub>"* 는 의미를 포함하고 있을 가능성을 표현하고 있습니다.
즉, Raphael의 프로그램은 문제 속 대상이 일반적으로 무언가를 갖고 있거나, 아니면 다른 무언가의 일부로 존재하는 것인지 등을 올바르게 추측하고 있습니다.
이것에 대해서는 나중에 설명하도록 하죠.

너무 일반적인 지점을 묘사하거나 "프로그램이 아무것도 아니라는<sub>nothing but</sub>" 접근방식에 비해, 이와 같이 "맥락을 고려한" 결정 과정이 프로그래밍될 수 있다는 Raphael의 예제는 논증에 있어 훨씬 건강한 태도를 보여주는 사례라 할 수 있겠습니다.
지금부터는 이와 같이 프로그램에 대해 고찰하는 더 나은 방법들을 써서 살펴보도록 하겠습니다.

### (1) A PROGRAM AS A SEQUENCE OF INSTRUCTIONS TO BE OBEYED.

**(1) 준수해야 하는 명령 시퀀스로서의 프로그램**

>
The most common and simple‑minded view is that a computer program is a sequence of clear-cut operations to be performed on some data.
Let's take a simple example of a program: suppose that X is a number given as input:

가장 일반적이면서 단순한 관점은 컴퓨터 프로그램이 어떤 데이터에 대해 수행되는 명료한 작업들의 시퀀스라는 것입니다.
이런 프로그램의 간단한 예를 들어보죠. 입력으로 `X`라는 숫자가 주어졌다고 합시다.

```
START: SET R = 1
LOOP:   SET S = X/R
        SET T=R+S
        SET R = T/2
        SET U = R x R
        SET V = X - U
        IF |V| > .001, GO TO LOOP
        ELSE PRINT V
```

>
This program (attributed to Isaac Newton) will compute an approximation to the square root of X.
At each line in the program it is perfectly clear what is the current status of things, and what is to be done next.
Of course, it requires a mathematical analysis, to show that the sequence of situations so developed will eventually lead to an acceptable value of R, and terminate the computation.'
So there is no great harm in thinking of these statements as a sequence of steps.
The "GO TO" instruction might be considered to be a super‑abbreviation for several more copies of the "main loop."
Of course, until the analysis is made, one should think of the program as an expression of a useful but poorly understood idea.

아이작 뉴턴이 만든 이 프로그램은 `X`의 제곱근의 근사값을 계산합니다.
이 프로그램의 각 라인은 현재 상태와 다음에 수행해야 할 작업을 완전히 명확하게 표현하고 있습니다.
물론 이렇게 진행되는 상태의 시퀀스가 허용 가능한 `R` 값으로 귀결되며 계산 과정이 종료된다는 것을 보여주기 위해서는 수학적 분석이 필요하긴 하지만, 이런 명령문들의 나열이라면 단계적인 시퀀스로 생각해도 별다른 문제는 없습니다.
"GO TO" 명령도 "main loop"의 다양한 변형 중 하나로 간주할 수 있죠.

분석이 필요하다는 문제가 있긴 하지만 이 관점에서는 프로그램은 이해하기는 좀 어려워도 유용한 아이디어를 표현하는 것이라 생각할 수 있습니다.

### (2) A PROGRAM AS A COURT OF LAW

**(2) 법원으로서의 프로그램**

>
In Raphael's program, it has to be decided whether "has" means "owns" or "has as parts" when a statement of the form "x has y" is encountered:
>
> ```
> →     JOHN IS A PERSON)
> (I UNDERSTAND)
> →     DICK IS A PERSON)
> (I UNDERSTAND)
> →     A CHAIN IS PART OF A BICYCLE
> (I UNDERSTAND)
> →     THE POWER-SAW HAS A CHAIN
> (THE ABOVE SENTENCE IS AMBIGUOUS •• BUT I ASSUME (HAS) MEANS (HAS AS PARTS))
> (I UNDERSTAND)
> →     JOHN OWNS A CHAIN
> (I UNDERSTAND)
> →     DICK HAS A CHAIR
> (THE ABOVE SENTENCE IS AMBIGUOUS •• BUT I ASSUME (HAS) MEANS (HAS AS PARTS))
> →     THE CUCKOO-CLOCK HAS A CHAIN
> (THE ABOVE SENTENCE IS AMBIGUOUS •• PLEASE REPHRASE IT)
> ```

Raphael의 프로그램은 "x가 y를 갖는다"라는 형태의 명령에 대해 "갖는다<sub>has</sub>"가 "소유한다<sub>own</sub>"를 의미하는지, "부분으로 갖는다<sub>has as parts</sub>"를 의미하는지 결정해야 합니다.

```
→     JOHN은 사람이다)
(알겠습니다)
→     DICK은 사람이다)
(알겠습니다)
→     체인은 자전거의 일부이다
(알겠습니다)
→     전기톱은 체인을 갖고 있다
(위의 문장은 모호합니다 .. 그러나 (갖는다)의 의미를 (부분으로 갖는다)로 가정합니다)
(알겠습니다)
→     JOHN은 체인을 소유한다
(알겠습니다)
→     DICK은 의자를 갖고 있다
(위의 문장은 모호합니다 .. 그러나 (갖는다)의 의미를 (부분으로 갖는다)로 가정합니다)
→     뻐꾸기 시계는 체인을 갖고 있다
위의 문장은 모호합니다 .. 다시 말해 주십시오)
```

>
The problem, when recognized, is transmitted to a part of the program that is able to review all that has happened before.
This sub‑program makes its decision on the following basis:
- _(1) Is y already known to be part of some other thing? Or is y a member of some set whose members are known to be parts of something?_
- _(2) Is y known to be owned by something, or is it a member of some set whose members are known to be owned by something?_
- _(3) If exactly one of (1) or (2) is true, make the choice in the corresponding direction. If neither holds, give up and ask for more information. If both are true, then consider the further possibilities at (4) below. (Thus the program uses evidence about how previously acquired information has been incorporated into its "model" of the world.)_
- _(4) If we get to this point, then y is known already to be involved in being part of something and in being owned and we need a finer test._

인식된 문제는 이전에 발생한 모든 것을 검토하는 서브 프로그램으로 전달됩니다.
이 서브 프로그램은 다음 규칙에 따라 결정을 내립니다.

- (1) `y`는 다른 것의 일부로 알려져 있는 것인가? 아니면 `y`는 다른 무언가의 일부로 구성된 집합의 원소인가?
- (2) `y`는 어떤 것의 소유물로 알려져 있는가? 아니면 무언가의 소유물로 이루어진 어떤 집합의 원소인가?
- (3) 만약 (1) 이나 (2) 중 하나만 참이라면 해당 방향으로 선택한다.
    - 만약 둘 다 거짓이라면, 처리를 포기하고 더 많은 정보를 얻기 위해 질문을 한다.
    - 만약 둘 다 참이라면, 아래의 (4)를 통해 다른 가능성을 고려한다. (이렇게 하여 프로그램은 앞에서 획득한 정보가 세계의 "모델"에 어떻게 통합되었는지에 대한 증거로 사용합니다.)
- (4) 여기까지 왔다면, `y`는 이미 알려진 무언가의 일부이며 소유된 상태라는 것을 알게 되므로 더 정밀한 테스트가 필요하다.

>
Let $$U_1$$ and $$U_2$$ be the "something" or the "some set" that we know exists, respectively, in the answers to questions (1) and (2).
These depend on‑ y.
We now ask: is x a member of, or a subject of $$U_1$$ or $$U_2$$?
If neither, we give up.
If one, we choose the corresponding result‑"part of" or "owns."
If both, we again give up and ask for more information. As Raphael says:

질문 (1)과 질문 (2)의 답변에 사용되는 우리가 알고 있는 "무언가" 내지 "어떤 집합"이 $$U_1$$과 $$U_2$$ 라고 생각해 봅시다.
이것들은 `y`에 따라 달라지겠죠.
그래서 **`x`는 $$U_1$$ 또는 $$U_2$$ 의 원소인가?** 라고 질문하게 됩니다.
만약 둘 다 아니라면 처리를 포기합니다.
만약 둘 중 하나라면 해당하는 결과, 즉 "일부" 또는 "소유"를 선택하게 됩니다.
만약 둘 다라면 우리는 추가 정보를 얻기 위해 질문을 하게 됩니다.

이에 대해 Raphael은 다음과 같이 말합니다.

>
_"These criteria are simple, yet they are sufficient to enable the program to make quite reasonable decisions about the intended purpose in various sentences of the ambiguous word "has."
Of course, the program can be fooled into making mistakes, e.g., in case the sentence, "Dick has a chain," had been presented before the sentence, "John owns a chain," in the above dialogue.
However, a human being exposed to a new word in a similar situation would make a similar error.
The point here is that it is feasible to automatically resolve ambiguities in sentence meaning by referring to the descriptions of the words in the sentence‑descriptions which can automatically be created through proper prior exposure to unambiguous sentences."_

"이 기준은 심플하긴 하지만 다양한 문장에서 모호하게 사용되는 "갖는다<sub>has</sub>"라는 단어가 사용된 의도를 판별하는 데에 충분히 합리적인 결정을 내릴 수 있게 해줍니다.
물론, "Dick은 체인을 갖고 있다"가 "John은 체인을 소유한다"보다 먼저 나오게 한다던가 해서 프로그램을 속여 실수하게 할 수도 있습니다.
하지만 사람도 비슷한 상황에서 새로운 단어를 접하게 되면 비슷한 오류를 저지를 수 있습니다.
여기에서 핵심은 명확한 문장을 적절히 미리 노출시킬 수 있다면, 단어에 대한 설명을 자동으로 생성 가능할 것이고, 이런 설명을 참고해서 모호한 의미를 갖는 문장 문제를 자동으로 해결할 수 있다는 것입니다."

>
Thus, the program is instructed to attempt to search though its collection of prior knowledge, to find whether x and y are related, if at all, more closely in one or the other way.
This "part" of the program is best conceived of as a little trial court, or as an evidence‑collecting and evidence-weighing procedure.
It is not good to think of it as a procedure directly within a pre‑specified sequence of problem solving, but rather as an appeal court to consult when the program encounters an inconsistency or ambiguity.
Now when we write a large program, with many such courts, each capable if necessary of calling upon others for help, it becomes meaningless to think of the program as a "sequence."
Even though the programmer himself has stated the "legal" principles which permit such "appeals," he may have only a very incomplete understanding of when and where in the course of the program's operation these procedures will call on each other.
And for a particular "court," he has only a sketchy idea of only some of the circumstances that will cause it to be called upon.
In short, once past the beginner level, programmers do not simply write 'sequences of instructions'.
Instead, they write for the individuals of little societies or processes.
For try as we may, we rarely can fully envision, in advance, all the details of their interactions.
For that, after all, is why we need computers.

그러므로 이 프로그램은 서로 관련되어 있는 x와 y가 어떤 형태로 밀접하게 연관되어 있는지를 탐색하기 위해, 사전에 수집해 놓은 지식을 검색하라는 명령을 받아 처리하는 도구라 할 수 있습니다.
이런 "측면"을 두고 잘 생각해 보면 작은 재판 법원이라던가, 증거 수집, 증거 평가 절차 같은 것들을 떠올리기 좋습니다.
즉 이 프로그램을 '미리 지정해둔 문제 해결을 위한 순서를 따라가는 절차'로 여기는 것은 바람직하지 않습니다.
모순점이나 모호한 상황을 접하게 된 프로그램이 찾아가는 항소 법원이라 보는 것이 더 자연스럽습니다.


이제 우리가 대규모의 프로그램을 작성할 때, 상황에 따라 도움을 요청할 수 있는 이런 법원을 내부에 많이 포함하고 있게 한다면 그 프로그램을 단순히 "시퀀스"라고 여기는 것은 무의미한 일이라는 것을 알게 되었습니다.
심지어 이런 "소송"이 작동하는 "법적" 원칙을 만들어낸 프로그래머라 하더라도, 프로그램이 돌아갈 때 언제 어디서 이런 절차가 서로 호출되는지에 대해서는 명확하게 이해하지 못하고 있을 수 있습니다.
그리고 특정한 "법원"이 호출되는 상황이 어떤 것이 있는지에 대해서도 프로그래머는 대략적인 아이디어만 갖습니다.
즉 초보자 레벨을 넘어선 프로그래머가 작성하는 프로그램은 단순한 명령의 나열이 아닙니다.
프로그래머는 작은 사회와 그 사회의 절차를 담당하는 개인들을 만들어내는 것입니다.
그러한 프로그램 속 상호작용의 모든 디테일을 완전히 상상해내는 것은 거의 불가능하죠.

그리고 이것이 바로 우리에게 컴퓨터가 필요한 이유입니다.

### (3) A PROGRAM AS A COLLECTION OF STATEMENTS OF ADVICE

**(3) 조언 명령의 집합으로서의 프로그램**

>
The great illusion shared not only by all terrified humanists but also by most computer "experts," that programming is an inherently precise and rigid medium of expression, is based on an elementary confusion between form and content.
If poets were required to write in units of fourteen lines, it wouldn't make them more precise;
if composers had to use all twelve tones, it wouldn't constrain the overall forms;
if designers had to use only fourth order surfaces no ‑one would notice it much!
It is humorous, then, to find such unanimity about how the rather stiff grammar of (the older) programming language makes for precision in describing processes.
It's perfectly true that you have to be very precise in your computer grammar (syntax) to get your program to run at all.
No spelling or punctuation errors are allowed!
But it's perfectly false that this makes you have a precise idea of what your program will do.
In FORTRAN, if you want your program to call upon some already written procedure, you have to use one of the fixed forms like "GO TO."
You can't say "USE," or "PROCEED ON TO," etc., so the syntax is stiff.
But, you can "GO TO" almost anything, so the content is free.
>
A worse fallacy is to assume that such stiffness is because of the computer!
It's because of the programmers who specified the language!
In Bobrow's STUDENT program, you could type once and for all, if you wish, "USE ALWAYS MEANS GO TO" and in simple situations it would then allow you to use "USE" instead of "GO T0."
This is, of course, a trivial example of flexibility, but it is a point that most people don't appreciate: FORTRAN's stiffness is, if anything, derived from the stiffness superstition, not an instance of some stiffness fact!

겁에 질린 인본주의자들 뿐 아니라 대부분의 컴퓨터 "전문가들"도 품고 있는 *'프로그래밍은 본질적으로 정확하고 엄격한 표현 매체'* 라는 엄청난 환상은 기본적으로 형식과 내용을 헷갈리고 있기 때문에 발생하는 것입니다.

14행 단위로 시인이 시를 써야 하는 제약이 생긴다고 칩시다. 그것 때문에 시가 더 정밀해지지는 않을 겁니다.
작곡가는 12음계를 사용해야 하지만 음악 또한 그런 형식에 갇히지 않습니다.
만약 디자이너가 4개의 레이어만 사용해야 하는 상황이라 해도 아무도 그걸 눈치채지 못할 것입니다.
이와 유사하게, 상당히 엄격한 문법 규칙을 갖는 (오래된) 프로그래밍 언어를 쓰는 것이야말로 프로세스를 작성할 때의 정확성을 유지하는 방법이라고 다같이 맞장구친다면 꽤나 우스운 일일 것입니다.

물론 우리가 작성한 프로그램을 실행하려면 컴퓨터의 문법(구문)을 매우 정확하게 따라야 한다는 것은 누구도 부정할 수 없는 사실입니다.
오타는 물론이고 구두점을 잘못 사용하는 것도 절대 허용되지 않죠!
그러나 이렇게 문법을 따르는 것을 두고 '문법을 따르면 프로그램이 무엇을 하는지에 대해 정확하게 파악할 수 있다'고 생각한다면 완전히 잘못된 것입니다.

예를 들어 FORTRAN에서는 이미 만들어둔 프로시저를 프로그래밍 방식으로 호출하려면 "GO TO"와 같은 고정된 형식 중 하나를 사용해야 합니다.
"USE" 라던가, "PROCEED ON TO"라고 쓰면 안되니까 문법이 딱딱하다고 할 수 있겠습니다.
하지만 "GO TO"를 통해 거의 무엇이든 해낼 수 있죠.
때문에 형식은 딱딱하지만 내용은 자유로운 셈입니다.

더더욱 바람직하지 않은 것은 그런 딱딱함의 원인이 바로 컴퓨터라고 생각하는 것입니다.
그건 컴퓨터가 아니라 언어를 만든<sub>specified</sub> 프로그래머들 때문입니다!
가령 Bobrow의 STUDENT 프로그램을 쓰면 "USE ALWAYS MEANS GO TO"를 딱 한 번만 입력하고, 그 이후부터는 "GO TO" 대신 "USE"를 사용할 수 있게 됩니다.
이것은 유연성을 보여주는 사례 중에서는 사소한 것이지만 대부분의 사람들이 무심코 지나치는 특장점이기도 합니다.
FORTRAN의 딱딱함은 딱딱함에 대한 미신에서 강조하는 것이며, 컴퓨터의 딱딱함에 대한 적절한 예가 아닙니다!

>
For an example of a modern system with more flexibility, a programming language called PILOT, developed by Warren Teitelman (Ph.D. dissertation, MIT, 1966), allows the programmer to make modifications both in his programs and in the language itself, by external statements in the (current version of) the language.
We can often think of these as "advice" rather than as "program," because they are written at odd times, and are usually conditionally applied in default situations, or as a consequence of previous advice.
**An example is the following** typed in while developing a program to solve problems like the well‑known "missionaries and cannibals" dilemma ‑ the one with the boat that holds only two people, etc:

>
_Tell progress, if m is a member of side‑1 and m is a member of side‑2 and (countq side‑1 m) is not equal to (countq side‑1 c), then quit._ (An earlier collection of advice statements to the input system has been used to produce the reasonably humanoid input syntax.)

보다 유연한 최신 시스템의 예로 Warren Teitelman(1966년 MIT 박사논문)이 개발한 PILOT이라는 프로그래밍 언어를 사용하면, 언어 바깥의 명령을 통해 프로그래머는 프로그램은 물론이고 언어 자체까지 수정할 수 있습니다.
우리는 이런 것을 "프로그램"이라기보다는 "조언<sub>advice</sub>"으로 생각해 볼 수 있습니다.
왜냐하면 이런 조언들은 프로그램 작성 당시가 아니라 별도의 타이밍에 작성되며, 기본 상황에서는 조건부로 적용되기도 하고 이전 조언들의 영향을 받은 결과로 적용되기도 하기 때문입니다.
예를 들어, 잘 알려진 딜레마인 "두 명만 탈 수 있는 보트가 등장하는 선교사와 식인종 문제"를 해결하기 위한 프로그램을 개발하고 있을 때 다음과 같이 입력했다고 합시다.

*만약 `m`이 side-1의 멤버이고, `m`이 side-2의 멤버일 때, `(countq side-1 m)`이 `(countq side-1 c)`와 같지 않다면 진행 상황을 설명하고 종료하라.
(이 입력 시스템을 구성하기 위한 조언 명령의 이전 컬렉션은 합리적인 휴머노이드 입력 구문을 생성하는 데에 사용되었습니다)*

>
(역주) 예제의 코드는 마빈 민스키가 Lisp과 관련이 깊다는 점도 함께 떠올려보면 더 흥미롭게 읽을 수 있다고 생각합니다.
`(countq side-1 m)`와 `(countq side-1 c)`는 Lisp 코드로, 각각 1번 강변의 선교사의 수와 1번 강변의 식인종의 수를 표현하고 있습니다.
선교사와 식인종이 보트를 타고 강을 건너는 문제들은 보통 식인종이 수적으로 우세하지 않은 경우에는 선교사를 공격하지 않는다는 조건이 붙습니다. 1번 강변에 선교사 2명 식인종이 2명 있다면 안전하겠지만, 1번 강변에 선교사가 1명 식인종이 2명 있다면 그 선교사는 잡아먹히게 되겠죠.
{:style="background-color: #ecf1e8;"}

<span/>

>
The program is a heuristic search that tries various arrangements and moves, and prefers those that make "progress" toward getting the people across the river.
Teitelman writes the basic program first.
But the missionaries get eaten, and the above "advice" says to "modify the progress‑measuring part of the program to reject moves that leave unequal numbers of missionaries and cannibals on the sides of the river."
As Teitelman says:
>
_This gives the eating conditions to PROGRESS.
It is not sufficient to simply count and compare, because when all of the cannibals are on one side with no missionaries, they do outnumber the missionaries 3 to 0.
However, nobody gets eaten._

이 프로그램은 휴리스틱한 탐색을 통해 다양한 배치와 움직임을 시도하며, 사람들이 강을 건너갈 수 있도록 "진행"하는 것을 우선시합니다.
Teitelman은 먼저 간단한 프로그램을 작성했는데 실행해 놓고 보니 선교사가 잡아먹히게 됐습니다.
그래서 위의 "조언"은 *"양쪽 강가에 선교사와 식인종의 수가 똑같지 않게 하는 움직임을 거부할 수 있도록, 프로그램의 진행률을 측정하는 부분을 수정하십시오."* 라고 제안했습니다.

Teitelman은 다음과 같이 말합니다.

*이 조언은 PROGRESS에 잡아먹는 것과 관련된 조건을 부여합니다.
단순히 수를 세고 비교하는 것만 따지면 헛점이 있다는 거죠.
왜냐하면 모든 식인종들이 선교사 없이 한쪽 강변에만 있다고 합시다.
이렇게 되면 식인종들이 선교사들을 3:0 으로 압도하게 되긴 하는데 수만 따졌을 때 그런 거고 실제로는 선교사가 없으니 잡아먹지는 못합니다.*

>
The point, however, is not in the relaxation of syntax restrictions, but in the advice‑like character of the modification just made in the program.
The "tell progress" statement can be made without knowing very much about how "progress" works already or where it lies in the "program."
It may already be affected by other advice, and one might not have a clear idea of when the new advice will be used and when it will be ignored.
Some other function may have been modified so that, in certain situations, "progress" won't get to evaluate the situation at all, and someone might get eaten anyway.
If that happened, the outsider would try to guess why.
>
He would have the options (1) of thoroughly understanding the existing program and "really fixing" the trouble, or (2) of entering anew advice statement describing what he imagines to be the defective situation and telling the program not to move the missionary into the position of being eaten.
When a program grows in power by an evolution of partially‑understood patches and fixes, the programmer begins to lose track of internal details and can no longer predict what will happen—and begins to hope instead of know, watching the program as though it were an individual of unpredictable behavior.

여기에서 중요한 것은 구문에 대한 딱딱한 제한이 완화된다는 것이 아니라, 프로그램을 즉시 수정할 수 있는 "조언"의 특성입니다.
"progress"가 어떻게 작동하는지, "program"의 안쪽 어디에서 돌아가는지 알지 못한다 하더라도,
"진행 상황을 알려줘<sub>tell progress</sub>"라고 지시를 할 수 있다는 것입니다.
물론 이미 다른 조언의 영향을 받고 있는 중일 수도 있고, 새로운 조언이 언제 사용되고 언제 무시되는지는 명확하지 않을 수도 있습니다.
또는 어떤 함수가 수정되어서, 특정 상황에서 "progress"가 상황을 평가하지 못하고 누군가가 잡아먹히게 되는 일이 일어나게 될 수도 있습니다.

이런 일들이 발생하게 되면, 외부에서 관찰하는 사람은 이렇게 돌아가게 된 이유를 추측하려 할 것입니다.

그 사람은 둘 중 하나를 선택할 수 있습니다.

1. 기존 프로그램을 철저하게 이해해서 문제를 "진짜로 수정"하는 방법.
2. 결함이 있는 상황이라는 것을 염두에 두고, 프로그램에 선교사가 잡아먹히도록 옮기면 안된다는 내용의 새로운 "조언"을 입력하는 방법.

부분적인 이해를 통해 만들어진 패치와 온갖 수정 사항들이 쌓여 프로그램이 발전하게 되면, 프로그래머는 프로그램의 내부에서 무슨 일이 일어나는지 못 따라가게 되며 어떤 일이 발생하게 될 지 예측하지 못하게 됩니다.

>
This is already true in some big programs, but as we enter the era of multiple‑console computers, it will soon be much more acute.
With time‑sharing, large heuristic programs will be developed and modified by several programmers, each testing them on different examples from different consoles and inserting advice independently.
The program will grow in effectiveness, but no one of the programmers will understand it all.
(Of course, this won't always be successful‑the interactions might make it get worse, and no one might be able to fix it again!)
Now we see the real trouble with statements like "it only does what its programmer told it to do."
There isn't any one programmer.

이미 몇몇 대형 프로그램에서는 이런 일들이 일어나고 있습니다.
그리고 이 문제는 다중 콘솔 컴퓨터 시대에 들어서게 되면 훨씬 심각해질 것입니다.
시분할<sub>time-sharing</sub> 시스템에서의 대규모 휴리스틱 프로그램은 여러 명의 프로그래머에 의해 개발되고 수정될 것이며, 각기 다른 콘솔에서 다양한 예제를 통해 테스트되고 독립적으로 "조언"이 삽입되게 될 것입니다.
프로그램의 효율성은 향상되겠지만, 어떤 프로그래머도 프로그램의 모든 것을 이해하지는 못하게 될 것입니다.
(물론 이런 미래가 항상 성공적이지는 않을 것입니다. 상호 작용이 오히려 더 좋지 않은 상황을 만들 수도 있고, 그걸 고칠 수 있는 사람이 아무도 없을 수 있기 때문입니다!)

이제 "프로그래머가 지시한 것만 그대로 수행합니다" 같은 말의 진짜 문제를 알 수 있게 되었습니다.

프로그래머는 프로그램을 혼자서 만들지 않는다는 것입니다.

### LATITUDE OF EXPRESSION AND SPECIFICITY OF IDEAS

**표현의 자유도와 아이디어의 구체성**

>
Finally we come to the question of what to do when we want to write a program but our idea of what is to be done, or how to do it, is incompletely specified.
The non sequitur that put everyone off about this problem is very simple:
>
> - _Major Premise: If I write a program it will do something particular, for every program does something definite._
> - _Minor Premise: My idea is vague. I don't have any particular result in mind._
> - _Conclusion: Ergo, the program won't do what I want._
>
So, everyone thinks, programs aren't expressive of vague ideas.
There are really two fallacies.
First, it isn't enough to say that one doesn't have a particular result in mind.
Instead, one has an (ill-defined) range of acceptable performances, and would be delighted if the machine's performance lies in the range.
The wider the range, then, the wider is one's latitude in specifying the program.
This isn't necessarily nullified, even when one writes down particular words or instructions, for one is still free to regard that program as an instance.
In this sense, one could consider a particular written-down story as an instance of the concept that still may remain indefinite in the author's mind.

결국 우리는 하나의 질문에 도달하게 되었습니다.
"무엇을 어떻게 할 지에 대해 불완전한 생각만 있을 때, 프로그램을 작성해야 한다면 무엇을 해야 하는가?"
모든 사람들이 이 문제를 미루게 하는 이유는 매우 간단합니다.

- 대전제: 만약 내가 프로그램을 작성한다면, 그 프로그램은 특정한 일을 하게 될 것이다. 왜냐하면 모든 프로그램은 의도한 작업을 수행하기 때문이다.
- 소전제: 내 아이디어는 모호하다. 나는 내가 원하는 특정한 결과가 뭔지 모르겠다.
- 결론: 그러므로 내가 만든 프로그램은 내가 원하는 것을 하지 않을 것이다.

즉, 사람들은 프로그램은 모호한 아이디어를 표현하는 매체가 아니라고 생각합니다.

사실 위의 생각에는 두 가지 오류가 있습니다.
첫째, 내가 원하는 특정한 결과가 뭔지 모르겠다고 말하는 것으로는 충분하지 않습니다.
그 대신 (잘못 정의된) 허용 가능한 성능 범위가 있을 수 있으며, 이런 경우에는 기계의 성능이 해당 범위 내에 있다면 만족한다고 할 수 있습니다.
이런 범위가 넓어질수록 프로그램을 지정할 수 있는 자유도 또한 넓어지게 됩니다.
이렇게 하는 방식은 특정한 단어나 지시문을 기록한다 하더라도 무효화되지 않습니다.
왜냐하면 해당 프로그램을 범위 속 하나의 사례<sub>instance</sub>로 간주할 수 있기 때문입니다.
이런 의미에서, 이미 기록된 특정한 이야기를 작가의 마음 속에 아직 불명확하게 남아있을 수 있는 개념의 사례<sub>instance</sub>로도 생각할 수 있습니다.

>
At this point there might be a final objection: does it lie exactly over this range?
Remember, I'm not saying that programming is an easy way to express poorly defined ideas!
To take advantage of the unsurpassed flexibility of this medium requires tremendous skill‑technical, intellectual, and esthetic.
To constrain the behavior of a program precisely to a range may be very hard, just as a writer will need some skill to express just a certain degree of ambiguity.
A computer is like a violin.
You can imagine a novice trying first a phonograph and then a violin.
The latter, he says, sounds terrible.
That is the argument we have heard from our humanists and most of our computer scientists.
Computer programs are good, they say, for particular purposes, but they aren't flexible.
Neither is a violin, or a typewriter, until you learn how to use it.

이 시점에서 "그런 이야기는 논점이라는 범위를 벗어나는 것이 아닌가요?"
라는 최종적인 반론이 있을 수 있습니다.

나는 프로그래밍이 충분하지 않게 정의된 아이디어를 표현하는 간단한 방법이라고 말하는 것이 아닙니다.
이 매체의 탁월한 유연성을 이용하려면 상당한 기술과, 지적이고 심미적인 능력이 필요합니다.
프로그램의 동작을 정확하게 특정한 범위 내로 제한하는 것은 매우 어려운 일일 수 있습니다.
이것은 작가가 어느 정도는 모호하게 표현하는 기술을 사용하는 것과 비슷합니다.

컴퓨터는 바이올린과 비슷합니다.
초보자가 먼저 축음기로 대단한 음악을 들은 다음에 바이올린을 연주한다고 생각해 보세요.
그러면 그 사람은 연주 소리가 별로라고 말할 것입니다.
이것이 우리가 인본주의자들과 대부분의 컴퓨터 과학자들에게 들은 이야기입니다.
컴퓨터 프로그램은 특정한 목적에는 적합할 수는 있어도, 유연하지는 않다고 그들은 말합니다.
하지만 바이올린이나 타자기도 유연하지 않은 것은 마찬가지입니다.

우리가 사용법을 익히기 전에는 말이죠.

