---
layout  : wiki
title   : Why numbering should start at zero by E. W. Dijkstra
summary : 번호 매기기가 0 부터 시작해야 하는 이유
date    : 2023-05-16 23:05:12 +0900
updated : 2023-05-17 00:08:51 +0900
tag     : dijkstra 번역
resource: 82/A6980D-C202-49E9-ACCE-08E4DE022C5F
toc     : true
public  : true
parent  : [[/clipping]]
latex   : false
---
* TOC
{:toc}


- 원문:
    - [Why numbering should start at zero (PDF)]( https://www.cs.utexas.edu/users/EWD/ewd08xx/EWD831.PDF )
    - [Why numbering should start at zero (html)]( https://www.cs.utexas.edu/users/EWD/transcriptions/EWD08xx/EWD831.html )

이 글은 데이크스트라가 [1981년에서 1984년 사이에]( https://www.cs.utexas.edu/~EWD/index08xx.html ) 작성한 문서 [Why numbering should start at zero]( https://www.cs.utexas.edu/users/EWD/ewd08xx/EWD831.PDF )를 번역한 것입니다. 의역이 많으므로 원문과 대조해가며 읽기를 권합니다.

## 번역

>
To denote the subsequence of natural numbers 2, 3, ..., 12 without the pernicious three dots, four conventions are open to us
>
- a) `2 ≤ i < 13`
- b) `1 < i ≤ 12`
- c) `2 ≤ i ≤ 12`
- d) `1 < i < 13`

>
Are there reasons to prefer one convention to the other?
Yes, there are.
The observation that conventions a) and b) have the advantage that the difference between the bounds as mentioned equals the length of the subsequence is valid.
So is the observation that, as a consequence, in either convention two subsequences are adjacent means that the upper bound of the one equals the lower bound of the other.
Valid as these observations are, they don't enable us to choose between a) and b); so let us start afresh.

자연수의 부분 수열인 `2, 3, ..., 12`를 표현할 때, 세 개의 점(`...`) 없이 표현하는 방법으로 우리에게는 다음의 네 가지가 있습니다.

- a) `2 ≤ i < 13`
- b) `1 < i ≤ 12`
- c) `2 ≤ i ≤ 12`
- d) `1 < i < 13`

이들 중 한 규칙을 다른 것보다 선호할 수 있을까요? 네 선호할 수 있습니다.
규칙 a) 와 규칙 b) 의 '경계의 차이'가 부분 수열의 길이와 같다는 장점을 갖고 있다는 사실이 유효하다는 것을 알 수 있습니다.
이로 인해, 두 개의 수열이 서로 인접한 경우 한 수열의 상한 경계가 다른 수열의 하한 경계와 같다는 점도 마찬가지입니다.
이런 장점들이 있지만, 이것들만으로는 a) 와 b) 중 어느 것을 선택해야 할지를 결정할 수는 없습니다.
그러니 논의를 새롭게 시작해 봅시다.

>
There is a smallest natural number.
Exclusion of the lower bound —as in b) and d)— forces for a subsequence starting at the smallest natural number the lower bound as mentioned into the realm of the unnatural numbers.
That is ugly, so for the lower bound we prefer the `≤` as in a) and c).
Consider now the subsequences starting at the smallest natural number: inclusion of the upper bound would then force the latter to be unnatural by the time the sequence has shrunk to the empty one.
That is ugly, so for the upper bound we prefer `<` as in a) and d). We conclude that convention a) is to be preferred.

가장 작은 자연수가 있다는 사실을 떠올려 봅시다.
규칙 b) 와 d) 처럼 하한을 제외하게 되면, 가장 작은 자연수로 시작하는 부분 수열의 하한을 비자연수의 영역으로 넘어가도록 강제합니다.[^example-1]
이것은 아름답지 않으므로, 하한에 대해서는 `≤` 를 사용하는 규칙 a) 와 c) 를 선호합니다.

이제 가장 작은 자연수로 시작하는 부분 수열을 생각해 봅시다.
상한을 포함하게 되면, 부분 수열을 공집합으로 축소하게 되었을 때 상한이 비자연수가 되어버립니다.[^example-2]
이것도 아름답지 않으므로 상한에는 `<` 를 사용하는 규칙 a) 와 d) 를 선호합니다.
이로써 규칙 a) 의 선호를 결론지을 수 있습니다.

>
**Remark**
The programming language Mesa, developed at Xerox PARC, has special notations for intervals of integers in all four conventions.
Extensive experience with Mesa has shown that the use of the other three conventions has been a constant source of clumsiness and mistakes, and on account of that experience Mesa programmers are now strongly advised not to use the latter three available features.
I mention this experimental evidence —for what it is worth— because some people feel uncomfortable with conclusions that have not been confirmed in practice.
(End of Remark.)

**비고**
Xerox PARC에서 개발한 프로그래밍 언어 Mesa는 정수 간격을 표현할 때 위에서 언급한 네 가지 규칙을 모두 사용할 수 있는 특별한 표기법이 있습니다.
Mesa를 다루며 얻은 다양한 사람들의 광범위한 경험에 의해 다른 세 가지 규칙의 사용이 계속해서 서투른 코드와 오류의 원인이 되었다는 것이 검증되었습니다.
이런 경험으로 인해 Mesa 프로그래머는 해당 세 가지 기능을 사용하지 않는 방향을 강력하게 권고받고 있는 상황입니다.
이런 실험적인 증거를 언급하는 이유는, 실제로 경험해 확인하지 않은 것이라면 불편함을 느끼는 사람들이 있기 때문입니다.
(비고 끝)

---

>
When dealing with a sequence of length N, the elements of which we wish to distinguish by subscript, the next vexing question is what subscript value to assign to its starting element.
Adhering to convention a) yields, when starting with subscript 1, the subscript range 1 ≤ i < N+1; starting with 0, however, gives the nicer range 0 ≤  i < N.
So let us let our ordinals start at zero: an element's ordinal (subscript) equals the number of elements preceding it in the sequence.
And the moral of the story is that we had better regard —after all those centuries!— zero as a most natural number.

길이가 N인 수열을 다룰 때, 각 원소를 구별하기 위해 어떤 첨자를 할당할 것인지는 그 다음의 고민이라 할 수 있습니다.
규칙 a) 에서 첨자를 1부터 시작하면 첨자 범위는 `1 ≤ i < N+1` 이 됩니다.
그러나 0 부터 시작하면 `0 ≤ i < N` 이라는 더 보기 좋은 범위를 얻을 수 있습니다.
그러므로 첨자는 0부터 시작하도록 합시다.
이렇게 하면 원소의 첨자는 수열에서 그 원소 앞에 있는 원소의 개수와 같습니다.

>
**Remark**  Many programming languages have been designed without due attention to this detail.
In FORTRAN subscripts always start at 1; in ALGOL 60 and in PASCAL, convention c) has been adopted; the more recent SASL has fallen back on the FORTRAN convention: a sequence in SASL is at the same time a function on the positive integers.
Pity!
(End of Remark.)

**비고**
많은 프로그래밍 언어가 이런 세부적인 사항에 대해 충분히 고려하지 않고 설계되었습니다.
FORTRAN에서는 첨자가 항상 1부터 시작합니다.
ALGOL 60과 PASCAL에서는 규칙 c) 를 채택했습니다.
최근에 개발된 SASL은 FORTRAN 규칙으로 되돌아갔습니다.
그런데 SASL에서 수열은 양의 정수에 대한 함수입니다.
무척 안타깝군요!
(비고 끝)

---

>
The above has been triggered by a recent incident, when, in an emotional outburst, one of my mathematical colleagues at the University —not a computing scientist— accused a number of younger computing scientists of "pedantry" because —as they do by habit— they started numbering at zero.
He took consciously adopting the most sensible convention as a provocation.
(Also the "End of ..." convention is viewed of as provocative; but the convention is useful: I know of a student who almost failed at an examination by the tacit assumption that the questions ended at the bottom of the first page.)
I think Antony Jay is right when he states: "In corporate religions as in others, the heretic must be cast out not because of the probability that he is wrong but because of the possibility that he is right."

이 글을 쓰게 된 계기는 최근에 있었던 어떤 사건 때문입니다.
대학의 수학 교수 중 한 분이(컴퓨터 과학자가 아님) 몇몇 젊은 컴퓨터 과학자들을 "규칙적인 짓거리"를 한다며 비난한 일이 있었습니다.
그 이유는 그들이 습관적으로 0부터 숫자를 세었기 때문이었습니다.
그 교수는 가장 합리적인 규칙을 의식적으로 사용하는 모습을 괴상한 행동으로 받아들인 것이었습니다.
(물론 "End of ..." 규칙도 괴상한 행동으로 받아들이는 사람들이 있습니다. 그러나 이것은 유용한 규칙입니다.
내가 아는 어느 학생이 시험을 보는데, 시험지의 첫 페이지 맨 아랫부분이 시험 문제의 끝이라고 암묵적으로 가정했기 때문에 거의 시험에 떨어질 뻔했습니다.)
나는 Antony Jay 가 말한, "다른 종교와 마찬가지로 조직 문화에서도 이단자는 그가 틀렸을 가능성이 아니라 옳았을 가능성이 있기 때문에 쫓겨나게 된다."는 말이 옳다고 생각합니다.



## 주석

[^example-1]: 역주: 1로 시작하는 부분 수열을 `0 < i ≤ 12` 과 같이 표현하게 될 텐데, 이렇게 되면 자연수가 아닌 0 을 사용하게 된다.
[^example-2]: 역주: 1로 시작하는 부분 수열 `1 ≤ i ≤ 2` 이 있다고 하자. 이 부분 수열에서 `2`를 제거하면 길이가 1인 부분 수열 `1 ≤ i ≤ 1` 이 되고, 여기에서 `1`을 또 제거해서 공집합을 만들면 `1 ≤ i ≤ 0` 이 되어 모양이 보기 좋지 않게 된다. 그러나 상한에 대해 `<`를 사용하게 되면 공집합이 `1 ≤ i < 1` 이 되어 보기 나쁘지 않다.

