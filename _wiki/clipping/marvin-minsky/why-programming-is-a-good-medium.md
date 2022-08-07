---
layout  : wiki
title   : WHY PROGRAMMING IS A GOOD MEDIUM FOR EXPRESSING POORLY UNDERSTOOD AND SLOPPILY­FORMULATED IDEAS by Marvin Minsky
summary : 제대로 이해되지 않고 형식화된 아이디어를 표현할 때 프로그래밍이 좋은 수단인 이유 - 마빈 민스키
date    : 2022-08-06 11:15:12 +0900
updated : 2022-08-08 00:08:02 +0900
tag     : 번역
toc     : true
public  : true
parent  : [[/clipping]]
latex   : false
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
아무리 엄격한 문법이라 해도 프로세스를 기술할 때의 정확성은 보장해주지 않습니다.
프로그래머는 컴퓨터 문법을 매우 정확하게 따라야 하지만, 의도하는 내용<sub>content</sub>은 얼마든지 자유롭게 표현할 수 있는 셈이죠.

딱딱한 것은 문법이며, 문법이 엄격한 이유는 문법을 사용하는 프로그래머 때문입니다. 컴퓨터 때문이 아닙니다.
프로그래머는 아이디어를 아주 정확하게 가다듬지 않아도 됩니다.
컴퓨터의 응답 범위를 적절히 생각해두고 컴퓨터의 응답이 이 범위를 벗어나지 않으면 만족합니다.
프로그래머는 특정 프로세스에 맞춰 컴퓨터를 고정해놓고 사용하지 않아도 됩니다.
문제가 불확실한 영역에 있다면 프로그래머는 컴퓨터에게 새로운 절차<sub>procedures</sub>를 생성하도록 요청할 수 있습니다.
아니면 선택 규칙을 추천해주는 식으로 어떤 선택을 해야 하는지에 대해 컴퓨터에게 조언을 줄 수도 있습니다.

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
우리가 컴퓨터를 사용해서 무엇을 할 수 있는가라는 일반적인 문제에 대한 것입니다.

다양한 이유로 컴퓨터의 가능성은 과소평가되는 것이 일반적입니다.
나는 먼저 겉보기에 "온건해 보이는" 입장을 받아들이는 것의 함정을 경고하고 싶습니다.
상황을 이해한다고 생각하는 많은 사람들이 취하는 입장이죠.
SF 작가, 모든 분야의 과학자, 경제 예측가, 심리학자, 심지어 논리학자도 컴퓨터가 실제로는 생각하지 않는 기계라며 설득력 있는 논조로 이렇게 이야기하곤 합니다.
"기계를 의인화하는 사고 방식에 빠지면 안됩니다. 기계는 프로그램된 대로만 작동하며 스스로 독창적일 수 없고, 창의적이지도 않습니다."
이런 말을 안 들어본 사람은 없겠죠. 대다수의 사람들은 이런 의견을 받아들입니다.

>
It is easy to understand why a humanist will want to rhapsodize about the obscurity of thought processes, for there is an easy non sequitur between that obscurity and the desired an anthropomorphic uniqueness.
But this isn't the non sequitur important here.
The fallacy under discussion is the widespread superstition that we can't write a computer program to do something unless one has an extremely clear, precise formulation of what is to be done, and exactly how to do it.
This superstition is propagated at least as much by scientists—and even by "computer scientists"—as by humanists.

인문주의자들이 사고 프로세스의 난해함에 대해 이렇게 강하게 이야기하고 싶어하는 이유를 이해하는 것은 간단합니다.
왜냐하면 이런 종류의 불명확함과 다른 곳에서 찾아볼 수 없는 방식으로 의인화된 것을 구분하기가 쉽지 않기 때문입니다.

그러나 이것은 여기에서 중요한 논점이 아닙니다.
우리가 따져보고 있는 오류는, "수행할 작업과 수행하는 방법에 대해 아주 명확하고 정확한 공식이 없으면 컴퓨터 프로그램을 만들어서 돌릴 수 없다는" 널리 퍼져 있는 미신입니다.
이 미신은 과학자들은 물론이고 심지어 "컴퓨터 과학자"들에게도 인문주의자들만큼이나 퍼져 있습니다.

>
What we are told, about the limitations of computers, usually takes this general form:
"A computer cannot create. It can do only exactly what it is told. Unless a process is formulated with perfect precision, you cannot make a computer do it."
Now this is perfectly true in one sense, and it is absolutely false in another.
Before explaining why, it is interesting to note that ‑ long before computers ‑ the same was said of the Devil: he could only appear to be creative.

우리 귀에 들려오곤 하는 컴퓨터의 한계에 대한 이야기는 보통 이런 식입니다.
"컴퓨터는 스스로 창조하지 못합니다. 컴퓨터는 그냥 시키는 것만 할 수 있습니다. 완벽한 정밀도로 공식화한 프로세스를 주지 않으면 컴퓨터는 돌아가지 않을 겁니다."

이제 이 말은 어떤 의미에서는 완벽하게 사실이기도 하지만, 한편으로는 절대적으로 거짓이기도 합니다.
왜 그런지 이유를 설명하기 전에 - 컴퓨터가 등장하기 훨씬 이전에 악마에 대해서도 똑같은 말이 있었다는 사실이 무척 흥미롭게 느껴집니다. 악마는 창의적으로 보인다는 거죠.

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
하나는 마스터 수준으로 체커 게임을 하는 Samuel의 체커 프로그램입니다.
다른 하나는 Evans의 ANALOGY 프로그램인데, 기하학적 도형들 사이의 유사성을 인식하는 특정한 지능 테스트 문제를 상당히 잘 풀어냅니다.
그리고 세 번째는 아래와 같이 영어로 된 "이야기" 형식의 고등학교 대수 문제를 푸는 Bobrow의 "STUDENT" 프로그램입니다.

**"메리의 나이는 메리가 앤의 현재 나이였을 때의 두 배입니다. 메리가 24세라면, 앤은 현재 몇 살입니까?"**

이 프로그램은 문제를 좀 풀긴 하지만 모든 문제를 잘 풀어내지는 않습니다.
그 글에서 내 관심은 다재다능한 일반 지능으로 발전하는 문제에 대한 것이었습니다만,
이 프로그램들은 미신을 타파하겠다는 나의 목적에 적합한 예제가 될 수 있을 것 같습니다.
왜냐하면 이 프로그램들이 취급할 수 있는 것은 제한적이긴 하나 오랫동안 받아들여진 미신을 혼란시켜 꺾기에는 충분하기 때문입니다.

>
The old view is that a program is "nothing but" a set of rigid rules for exactly what to do in each situation.
This is indeed a useful point of view for reassuring beginners at programming, or for analyzing the programs written by beginners.
However, for more advanced processes, while "perfectly" true in one sense, it would be as correct to say that "houses are nothing but arrangements of construction materials" or "books are merely long strings of words."
Indeed, a review of my Scientific American article (in Computer Reviews 8, 1, Jan. 1967) asserts that these programs are made of "dictionary lookup routines, sequences of search and comparison functions, and sort-merge type operations."

프로그램에 대한 낡은 관점 하나는 프로그램이 "아무것도 아니며" 단지 각각의 상황에서 정확히 무엇을 해야 하는지에 대한 엄격한 규칙 집합이라는 것입니다.
이 관점은 프로그래밍 초보자를 안심하게 해주고, 초보자가 작성한 프로그램을 분석할 때에는 유용한 관점이라 할 수 있습니다.
그러나 고급 프로세스에 대해서는 이 관점은 특정한 의미에서만 "완전히" 사실일 뿐이며 "집은 건설자재들을 배치해 놓은 것에 불과하다", "책은 단순히 단어들을 길게 늘어놓은 것에 불과하다"라고 말하는 것과 다름이 없습니다.

실제로, 나의 Scientific American 글에 대한 리뷰를 읽어보면 프로그램은 "dictionary lookup 루틴, search 및 comparison 함수들의 sequence, sort-merge 타입 연산"들로 구성된다는 주장이 있습니다.

### LOGIC AND CONSISTENCY
