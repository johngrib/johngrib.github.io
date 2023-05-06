---
layout  : wiki
title   : Paxos Made Simple
summary : 간단하게 설명한 Paxos
date    : 2023-04-24 23:15:47 +0900
updated : 2023-05-06 23:41:53 +0900
tag     : 
resource: AC/F578A5-1346-4919-AE96-7DDEFBA2C574
toc     : true
public  : true
parent  : [[/clipping]]
latex   : true
---
* TOC
{:toc}

- 원문: [Paxos Made Simple]( https://lamport.azurewebsites.net/pubs/paxos-simple.pdf )

Leslie Lamport는 2013년 튜링상 수상자로 분산 시스템, 병렬 시스템 등 분야의 석학이다.

Paxos 알고리즘은 Leslie Lamport의 2000년 논문 [The Part-Time Parliament]( https://lamport.azurewebsites.net/pubs/lamport-paxos.pdf )에서 등장하는데, 수식이 많아 내게는 이해하기가 몹시 어려웠다.

Paxos Made Simple은 그 다음해인 2001년에 나온 논문으로, 어려운 Paxos 알고리즘을 상대적으로 쉽게 설명하고 있다.


## Paxos Made Simple 번역


>
Leslie Lamport  
01 Nov 2001

### Abstract

**초록**

>
The Paxos algorithm, when presented in plain English, is very simple.

Paxos 알고리즘은 평범한 영어로 설명하면 매우 간단합니다.

### 1 Introduction

**1. 서론**

>
The Paxos algorithm for implementing a fault-tolerant distributed system has been regarded as difficult to understand, perhaps because the original presentation was Greek to many readers [5].
In fact, it is among the simplest and most obvious of distributed algorithms.
At its heart is a consensus algorithm—the “synod” algorithm of [5].
The next section shows that this consensus algorithm follows almost unavoidably from the properties we want it to satisfy.
The last section explains the complete Paxos algorithm, which is obtained by the straightforward application of consensus to the state machine approach for building a distributed system—an approach that should be well-known, since it is the subject of what is probably the most often-cited article on the theory of distributed systems [4].

Paxos 알고리즘은 내결함성을 가진 분산 시스템을 구현하기 위한 알고리즘이지만, 이해하기 어렵다고 여겨지곤 합니다.
아마도 많은 독자들에게는 낯선 언어인 그리스어로 Paxos의 발표가 이루어졌기 때문일 것입니다.
사실, 이 알고리즘은 가장 간단하고 명백한 분산 알고리즘 중 하나입니다.
이 알고리즘의 핵심은 합의 알고리즘인 [5]의 "synod" 알고리즘입니다.

다음 섹션에서는 이 합의 알고리즘이 우리가 만족시키고자 하는 특성들로부터 거의 필연적으로 도출된다는 것을 보여줍니다.

마지막 섹션에서는 완전한 Paxos 알고리즘을 설명합니다.
이 알고리즘은 분산 시스템을 구축하기 위한 상태 머신 접근 방식에 합의를 직접적으로 적용하여 얻을 수 있습니다.
이 접근 방식은 분산 시스템 이론에 관해서는 아마도 가장 많이 인용된 논문 [4]의 주제로도 잘 알려져 있습니다.

### 2 The Consensus Algorithm

**2 합의 알고리즘**

#### 2.1 The Problem

**2.1 문제**

>
Assume a collection of processes that can propose values.
A consensus algorithm ensures that a single one among the proposed values is chosen.
If no value is proposed, then no value should be chosen.
If a value has been chosen, then processes should be able to learn the chosen value.
The safety requirements for consensus are:
>
> - Only a value that has been proposed may be chosen,
> - Only a single value is chosen, and
> - A process never learns that a value has been chosen unless it actually has been.
>
We won’t try to specify precise liveness requirements.
However, the goal is to ensure that some proposed value is eventually chosen and, if a value has been chosen, then a process can eventually learn the value.
>
We let the three roles in the consensus algorithm be performed by three classes of agents: proposers, acceptors, and learners.
In an implementation, a single process may act as more than one agent, but the mapping from agents to processes does not concern us here.
>
Assume that agents can communicate with one another by sending messages.
We use the customary asynchronous, non-Byzantine model, in which:
>
- Agents operate at arbitrary speed, may fail by stopping, and may restart. Since all agents may fail after a value is chosen and then restart, a solution is impossible unless some information can be remembered by an agent that has failed and restarted.
- Messages can take arbitrarily long to be delivered, can be duplicated, and can be lost, but they are not corrupted.

값을 제안할 수 있는 프로세스들의 집합이 있다고 가정합시다.
합의 알고리즘은 이런 프로세스들이 제안한 값들 중 하나만을 선택하도록 보장합니다.
만약 제안된 값이 없다면, 선택된 값도 없어야 합니다.
그리고 값이 선택되었다면, 프로세스들도 선택된 값을 알 수 있어야 합니다.
즉 합의를 위한 안전 요구사항은 다음과 같습니다.

- 제안된 값만이 선택될 수 있습니다.
- 단 하나의 값만 선택됩니다.
- 선택이 실제로 발생하지 않았다면, 프로세스는 선택이 발생했다는 것을 학습하지 않습니다.

확실한 '시스템 활동성(liveness)'까지를 요구사항에 포함시키자는 말이 아닙니다.
우리의 목표는 제안된 값들 중 하나가 어떻게든 선택이 되도록 보장하는 것이며,
값이 일단 선택되었다면 결국에는 프로세스가 그 값을 알 수 있게 하는 것입니다.

이 합의 알고리즘에서 세 가지 역할을 수행하는 세 가지 종류의 에이전트를 '제안자(proposers)', '수락자(acceptors)', '학습자(learners)'로 정의합시다.
알고리즘의 구현체에서는 프로세스 하나가 둘 이상의 에이전트 역할을 하는 경우도 있겠지만, 에이전트와 프로세스 간의 역할 매핑은 여기서는 중요한 문제가 아니니 넘어가도록 합시다.

이런 에이전트들이 서로 메시지를 전송해 통신할 수 있다고 가정해 봅시다.
여기에서는 일반적인 비동기 환경, 즉 non-Byzantine 모델을 사용한다고 하겠습니다.

- 에이전트들은 임의의 속도로 동작하며, 중지로 인해 실패(장애)할 수 있고, 재시작도 가능합니다.
    - 모든 에이전트는 값이 선택된 후에 실패할 수 있고, 그 이후에 재시작할 수 있기 때문에, 장애를 겪은 후 재시작한 에이전트가 약간의 정보라도 기억할 수 있지 않으면 "이 문제"는 해결이 불가능합니다.
- 메시지는 임의의 시간이 걸려 전달될 수 있으며, 중복되거나 손실될 수는 있지만, 손상되지는 않습니다.

#### 2.2 Choosing a Value

**2.2 값 선택하기**

>
The easiest way to choose a value is to have a single acceptor agent.
A proposer sends a proposal to the acceptor, who chooses the first proposed value that it receives.
Although simple, this solution is unsatisfactory because the failure of the acceptor makes any further progress impossible.
>
So, let’s try another way of choosing a value.
Instead of a single acceptor, let’s use multiple acceptor agents.
A proposer sends a proposed value to a set of acceptors.
An acceptor may accept the proposed value.
The value is chosen when a large enough set of acceptors have accepted it.
How large is large enough? To ensure that only a single value is chosen, we can let a large enough set consist of any majority of the agents.
Because any two majorities have at least one acceptor in common, this works if an acceptor can accept at most one value.
(There is an obvious generalization of a majority that has been observed in numerous papers, apparently starting with [3].)

값을 선택하는 가장 쉬운 방법은 acceptor를 한 개만 두는 것입니다.

- proposer는 제안을 acceptor에게 보내고,
- acceptor는 첫 번째로 받은 제안의 값을 선택하면 됩니다.

간단한 해결책이지만, 이 방법은 하나뿐인 acceptor가 장애(failure)를 겪으면 이후의 진행이 불가능해지기 때문에 썩 만족스럽지 않습니다.

그렇다면 이번에는 acceptor를 한 개만 쓰지 말고 여러 개를 사용해서 값을 선택하게 해봅시다.

- proposer는 제안하는 값을 acceptor들의 집합에 보냅니다.
- acceptor 하나하나는 제안된 값을 받아들일 수 있습니다.
- 충분히 많은 acceptor들이 제안된 값을 받아들이면, 그 값이 선택됩니다.

그런데 '충분히 많은'은 어느 정도가 되어야 충분한 것일까요?

선택되는 값이 딱 하나가 되도록 보장하기 위해, '충분히 많은'을 에이전트들의 다수결(majority)로 정의하도록 하죠.

다수결 집합이 두 개가 있는 상황이어도, 두 다수결 집합은 결국 최소 하나의 acceptor를 공유하게 되어 있습니다. 각 acceptor가 받아들일 수 있는 값이 최대 1개 뿐이기 때문입니다. 그래서 다수결은 동작할 것입니다.
[^two-majorities]
(다수결 개념에 대한 분명한 일반화는 [3]을 시작으로 여러 논문에서 보인 바 있습니다.)

>
In the absence of failure or message loss, we want a value to be chosen even if only one value is proposed by a single proposer.
This suggests the requirement:
>
$$P1$$. An acceptor must accept the first proposal that it receives.
>
But this requirement raises a problem.
Several values could be proposed by different proposers at about the same time, leading to a situation in which every acceptor has accepted a value, but no single value is accepted by a majority of them.
Even with just two proposed values, if each is accepted by about half the acceptors, failure of a single acceptor could make it impossible to learn which of the values was chosen.
>
$$P1$$ and the requirement that a value is chosen only when it is accepted by a majority of acceptors imply that an acceptor must be allowed to accept more than one proposal.
We keep track of the different proposals that an acceptor may accept by assigning a (natural) number to each proposal, so a proposal consists of a proposal number and a value.
To prevent confusion, we require that different proposals have different numbers.
How this is achieved depends on the implementation, so for now we just assume it.
A value is chosen when a single proposal with that value has been accepted by a majority of the acceptors.
In that case, we say that the proposal (as well as its value) has been chosen.

메시지가 손실되거나 전달 실패가 발생하지 않는다면, proposer가 제안한 값이 딱 한 개만 있더라도 우리는 그 값이 선택되길 바랍니다.
다음과 같은 요구 사항을 추가합시다.

$$P1$$. acceptor는 자신이 받은 첫 번째 제안을 받아들여야만 한다.
{:style="background-color: #e9f1f6;"}

하지만 이 새로운 요구 사항으로 인해 문제가 하나 발생합니다.
여러 proposer들이 서로 다른 값을 동시에 제안할 수도 있기 때문입니다.
그래서 모든 acceptor가 값을 받았긴 했는데, 다수결이 이뤄지지 않는 상황이 나올 수도 있게 됩니다.

제안된 값이 2가지만 있는 경우를 생각해 봅시다.
2가지 값 각각이 절반의 acceptor들에게 수락되는 상황에서, 만약에 acceptor 한 개가 장애가 나면 최종적으로 어떤 값이 선택되었는지를 알 수 없게 됩니다.

요구사항 '$$P1$$'[^p1-sentence]과 요구사항 **'과반수의 acceptor들이 값을 수락했을 경우에만 값이 선택된다'** 를 종합해 보면 acceptor가 하나 이상의 제안을 수락할 수 있도록 허용해야 한다는 것을 알 수 있습니다.

그렇다면 이제부터는 acceptor가 수락하는 제안들을 추적하기 좋게 각 제안에다가 자연수로 된 번호를 할당하기로 합시다.
이제 제안은 '번호'와 '제안하는 값'으로 이루어지게 됩니다.
그리고 헷갈리지 않게끔 서로 다른 제안이라면 '번호'도 서로 다른 것을 갖도록 합시다.

이것이 어떻게 돌아가는지는 구현에 따라 달라질 것이므로, 지금은 그냥 이렇게 된다고만 생각합시다.
값은 과반수의 acceptor들에게 그 값이 있는 제안이 수락되었을 때 비로소 선택됩니다.
이 경우, 우리는 그 제안이 (그리고 그 값이) '선택'됐다고 말하기로 합시다.

>
We can allow multiple proposals to be chosen, but we must guarantee that all chosen proposals have the same value. By induction on the proposal number, it suffices to guarantee:

>
$$P2$$. If a proposal with value v is chosen, then every higher-numbered proposal that is chosen has value v.
>
Since numbers are totally ordered, condition P2 guarantees the crucial safety property that only a single value is chosen.
>
To be chosen, a proposal must be accepted by at least one acceptor.
So, we can satisfy P2 by satisfying:

>
$$P2^a$$. If a proposal with value v is chosen, then every higher-numbered proposal accepted by any acceptor has value v.
>
We still maintain $$P1$$ to ensure that some proposal is chosen.
Because communication is asynchronous, a proposal could be chosen with some particular acceptor c never having received any proposal.
Suppose a new proposer “wakes up” and issues a higher-numbered proposal with a different value.
$$P1$$ requires c to accept this proposal, violating $$P2^a$$.
Maintaining both $$P1$$ and $$P2^a$$ requires strengthening $$P2^a$$ to:
>
Since a proposal must be issued by a proposer before it can be accepted by an acceptor, $$P2^b$$ implies $$P2^a$$, which in turn implies $$P2$$.

>
$$P2^b$$. If a proposal with value v is chosen, then every higher-numbered proposal issued by any proposer has value v.

그러면 이제 acceptor가 여러 제안을 허용할 수는 있지만, '선택'된 제안은 모두 동일한 값을 갖는다는 것을 보장하게 해야 합니다.
이는 수학적 귀납법을 제안 번호에 대해 적용해서 다음을 보장하는 것으로 충분합니다.

$$P2$$. 값 v를 갖는 제안이 선택됐다면, 더 높은 번호를 갖는 모든 선택된 제안은 값 v를 갖는다.[^p2]
{:style="background-color: #e9f1f6;"}

자연수는 완전히 정렬되어 있으므로, $$P2$$ 조건은 단 하나의 값만 선택된다는 중요한 안전성 속성을 보장합니다.

어떤 제안이 선택되기 위해서는 그 제안이 적어도 하나의 acceptor에 의해 수락돼야 합니다.
그래서 우리는 다음을 통해 $$P2$$를 만족시킬 수 있습니다.

$$P2^a$$. 값 v를 가진 제안이 선택되었다면, 어떤 한 acceptor가 수락한 더 높은 번호를 갖는 모든 제안은 값 v를 갖는다.[^p2a]
{:style="background-color: #e9f1f6;"}

$$P1$$[^p1-sentence] 요구사항이 작동하고 있으므로 어떤 제안이건 선택은 될 것입니다.
그런데 통신이 비동기적으로 작동하기 때문에, 어떤 c 라는 acceptor가 아직 제안을 하나도 받지 못한 상태인데도 제안이 선택될 수도 있습니다.

이럴 때, 새로운 proposer가 "깨어나서" 다른 값으로 더 높은 번호를 갖는 제안을 내놓았다고 가정해 봅시다.
acceptor c는 $$P1$$ 을 지켜야 하니까 이 제안을 받아들여야 하는데, 그렇게 하면 $$P2^a$$를 위반하게 됩니다.

그렇다면 $$P1$$과 $$P2^a$$를 모두 만족시키기 위해서 $$P2^a$$를 다음과 같이 강화해 봅시다.

$$P2^b$$. 값 v를 가진 제안이 선택되었다면, 이후 모든 proposer가 내놓는 더 높은 번호의 제안은 값 v를 갖는다.
{:style="background-color: #e9f1f6;"}

acceptor가 제안을 수락하기 전에 먼저 proposer가 발행해야 하므로, $$P2^b$$는 $$P2^a$$를 함축하고, 이는 다시 $$P2$$를 함축합니다.

>
To discover how to satisfy $$P2^b$$, let’s consider how we would prove that it holds.
We would assume that some proposal with number m and value v is chosen and show that any proposal issued with number $$n > m$$ also has value v.
We would make the proof easier by using induction on n, so we can prove that proposal number n has value v under the additional assumption that every proposal issued with a number in $$m .. (n − 1)$$ has value v, where $$i .. j$$ denotes the set of numbers from i through j.
For the proposal numbered m to be chosen, there must be some set C consisting of a majority of acceptors such that every acceptor in C accepted it.
Combining this with the induction assumption, the hypothesis that m is chosen implies:
>
> > Every acceptor in C has accepted a proposal with number in $$m ..(n − 1)$$, and every proposal with number in $$m ..(n − 1)$$ accepted by any acceptor has value v.
>
Since any set S consisting of a majority of acceptors contains at least one member of C , we can conclude that a proposal numbered n has value v by ensuring that the following invariant is maintained:

>
$$P2^c$$. For any v and n, if a proposal with value v and number n is issued, then there is a set S consisting of a majority of acceptors such that either (a) no acceptor in S has accepted any proposal numbered less than n, or (b) v is the value of the highest-numbered proposal among all proposals numbered less than n accepted by the acceptors in S.
>
We can therefore satisfy $$P2^b$$ by maintaining the invariance of $$P2^c$$.

$$P2^b$$를 [^p2b-sentence] 어떻게 만족시킬지 방법을 알아보기 위해, 이걸 어떻게 증명할지에 대해서 생각해 보겠습니다.

$$n > m$$ 이라 할 때, 번호가 m이고 값이 v인 제안이 선택되었다고 가정합시다.
그러면 번호가 n인 제안도 값이 v 라는 것을 보이면 됩니다.
증명을 쉽게 하기 위해 n에 대해 귀납법을 사용합시다.

번호가 $$m..(n-1)$$인 모든 제안들이 값 v를 갖는다고 가정하면, 번호 n인 제안이 값 v를 갖는다는 것을 증명할 수 있습니다.

여기에서 $$i..j$$는 i부터 j까지의 수 집합을 의미합니다.

번호 m인 제안이 선택되려면, 과반수의 acceptor들로 이루어진 어떤 집합 C가 있어서, C에 소속된 모든 acceptor가 수락해야 합니다.
m이 선택되었다는 것은 귀납적으로 생각하면 다음을 의미합니다.

**C에 소속된 모든 acceptor들은 $$m..(n-1)$$ 범위의 번호를 가진 제안을 수락했고, 각 acceptor가 수락한 '$$m..(n-1)$$ 범위의 번호를 갖는 모든 제안'은 값이 v 이다.**

과반수의 acceptor들로 이뤄진 어떤 집합 S가 C의 구성원을 적어도 하나 포함하고 있을 것입니다.
그러므로 다음의 식을 추가하면 번호가 n인 제안이 값 v를 갖는다는 것을 결론낼 수 있습니다.

$$P2^c$$. 임의의 v와 n에 대해서, 값이 v이고 번호가 n인 제안이 발행되면, 다음 중 하나를 만족하는 '과반수의 acceptor로 구성된 집합 S'가 존재한다.
{:style="background-color: #e9f1f6;"}

- (a) S에 소속된 어떤 acceptor도 번호가 n보다 작은 제안을 수락하지 않았다. 혹은,
- (b) S에 소속된 acceptor들이 수락한, '번호가 n보다 작은 모든 제안들' 중 '가장 높은 번호를 갖는 제안'의 값이 v 이다.
{:style="background-color: #e9f1f6;"}

따라서 $$P2^c$$가 성립되어 $$P2^b$$를[^p2b-sentence] 만족시킬 수 있습니다.

>
To maintain the invariance of $$P2^c$$ , a proposer that wants to issue a proposal numbered n must learn the highest-numbered proposal with number less than n, if any, that has been or will be accepted by each acceptor in some majority of acceptors.
Learning about proposals already accepted is easy enough; predicting future acceptances is hard.
Instead of trying to predict the future, the proposer controls it by extracting a promise that there won’t be any such acceptances.
In other words, the proposer requests that the acceptors not accept any more proposals numbered less than n.
This leads to the following algorithm for issuing proposals.

> - 1\. A proposer chooses a new proposal number n and sends a request to each member of some set of acceptors, asking it to respond with:
>    - (a) A promise never again to accept a proposal numbered less than n, and
>    - (b) The proposal with the highest number less than n that it has accepted, if any.
>    - I will call such a request a prepare request with number n.
> - 2\. If the proposer receives the requested responses from a majority of the acceptors, then it can issue a proposal with number n and value v, where v is the value of the highest-numbered proposal among the responses, or is any value selected by the proposer if the responders reported no proposals.
>
A proposer issues a proposal by sending, to some set of acceptors, a request that the proposal be accepted.
(This need not be the same set of acceptors that responded to the initial requests.)
Let’s call this an accept request.
>
This describes a proposer’s algorithm. What about an acceptor?
It can receive two kinds of requests from proposers: prepare requests and accept requests.
An acceptor can ignore any request without compromising safety.
So, we need to say only when it is allowed to respond to a request.
It can always respond to a prepare request.
It can respond to an accept request, accepting the proposal, iff it has not promised not to.
In other words:
>
$$P1^a$$. An acceptor can accept a proposal numbered n iff it has not responded to a prepare request having a number greater than n.
>
Observe that $$P1^a$$ subsumes $$P1$$.

$$P2^c$$ 때문에,[^p2c-sentence] 번호가 n인 제안을 발행하려는 proposer는, 다수의 acceptor들에게 더 낮은 번호의 제안이 이미 수락되었거나 수락될 것임을 알아야 합니다.

이미 수락된 제안에 대해 알아내는 것은 쉽지만 미래의 수락을 예측하는 것은 어렵습니다.
그러므로 미래예측은 포기하고, proposer가 '번호가 n보다 작은 제안은 더 이상 수락하지 않겠다'는 약속을 acceptor들에게서 얻어내서 미래를 통제하게 해줍시다. 즉, proposer는 acceptor들에게 '번호가 n보다 작은 제안은 더 이상 수락하지 말라'고 요청합니다.

이로 인해 다음과 같은 '제안을 발행하는 알고리즘'이 나옵니다.

- 1\. proposer는 새로운 번호 n을 선택하고,
    - acceptor 집합의 일부 구성원에게 다음과 같이 두 가지를 응답하도록 요청합니다.
        - (a) 'n보다 작은 번호'의 제안을 다시는 수락하지 않겠다는 약속. 그리고,
        - (b) n보다 작으면서 가장 높은 번호를 가진 제안들 중 acceptor가 이미 수락한 제안(있는 경우).
    - 이러한 요청을 번호가 n인 'prepare 요청'이라고 부르겠습니다.
- 2\. proposer가 과반수의 acceptor들로부터 응답을 받으면,
    - proposer는 번호가 n이고 값이 v인 제안을 발행할 수 있습니다.
        - 이 때, v는 응답 중 가장 높은 번호를 갖는 제안의 값이거나,
        - (응답자들이 제안을 보고하지 않은 경우라면) proposer가 선택한 임의의 값입니다.
{:style="background-color: #fff9e4;"}

즉 proposer는 '제안을 수락해 달라고 요청하는 제안'을 발행해 acceptor 집합에 보냅니다.
(초기 요청에 응답한 acceptor 집합과 동일하지 않아도 됩니다.)
이것을 'accept 요청'이라 부르도록 하겠습니다.

지금까지는 proposer의 알고리즘을 설명했습니다.
그렇다면 acceptor의 알고리즘은 어떻게 될까요?

- acceptor는 proposer로부터 'prepare 요청'과 'accept 요청' 이렇게 두 종류의 요청을 받을 수 있습니다.
- acceptor는 안전성 문제만 없다면 어떤 요청이건 무시할 수 있습니다.
{:style="background-color: #fff9e4;"}

따라서, acceptor가 요청에 응답할 수 있는 게 어떤 경우인지만 설명하면 됩니다.

- acceptor는 prepare 요청에는 항상 응답할 수 있습니다.
- acceptor는 아직 약속을 하지 않은 경우에만 제안을 받아들이고 accept 요청에 응답할 수 있습니다.
{:style="background-color: #fff9e4;"}

다시 말해,

$$P1^a$$. acceptor는 '번호가 n보다 큰 prepare 요청'에 응답하지 않았을 경우에만 번호가 n인 제안을 수락할 수 있습니다.
{:style="background-color: #e9f1f6;"}

$$P1^a$$가 $$P1$$을[^p1-sentence] 포함한다는 점에 주목합시다.


>
We now have a complete algorithm for choosing a value that satisfies the required safety properties—assuming unique proposal numbers.
The final algorithm is obtained by making one small optimization.
>
Suppose an acceptor receives a prepare request numbered n, but it has already responded to a prepare request numbered greater than n, thereby promising not to accept any new proposal numbered n.
There is then no reason for the acceptor to respond to the new prepare request, since it will not accept the proposal numbered n that the proposer wants to issue.
So we have the acceptor ignore such a prepare request.
We also have it ignore a prepare request for a proposal it has already accepted.
>
With this optimization, an acceptor needs to remember only the highestnumbered proposal that it has ever accepted and the number of the highestnumbered prepare request to which it has responded.
Because $$P2^c$$ must be kept invariant regardless of failures, an acceptor must remember this information even if it fails and then restarts.
Note that the proposer can always abandon a proposal and forget all about it—as long as it never tries to issue another proposal with the same number.
>
Putting the actions of the proposer and acceptor together, we see that the algorithm operates in the following two phases.
>
Phase 1. (a) A proposer selects a proposal number n and sends a prepare request with number n to a majority of acceptors.
(b) If an acceptor receives a prepare request with number n greater than that of any prepare request to which it has already responded, then it responds to the request with a promise not to accept any more proposals numbered less than n and with the highest-numbered proposal (if any) that it has accepted.
>
Phase 2. (a) If the proposer receives a response to its prepare requests (numbered n) from a majority of acceptors, then it sends an accept request to each of those acceptors for a proposal numbered n with a value v, where v is the value of the highest-numbered proposal among the responses, or is any value if the responses reported no proposals.
(b) If an acceptor receives an accept request for a proposal numbered n, it accepts the proposal unless it has already responded to a prepare request having a number greater than n.
>
A proposer can make multiple proposals, so long as it follows the algorithm for each one.
It can abandon a proposal in the middle of the protocol at any time.
(Correctness is maintained, even though requests and/or responses for the proposal may arrive at their destinations long after the proposal was abandoned.)
It is probably a good idea to abandon a proposal if some proposer has begun trying to issue a higher-numbered one.
Therefore, if an acceptor ignores a prepare or accept request because it has already received a prepare request with a higher number, then it should probably inform the proposer, who should then abandon its proposal.
This is a performance optimization that does not affect correctness.

이제 안전성 요구조건을 만족하는, 완전한 '유니크한 번호 기반의 값 선택 알고리즘'을 갖게 되었습니다.
여기에서 최적화만 좀 하면 최종 버전의 알고리즘을 얻을 수 있습니다.

acceptor가 번호 n인 prepare 요청을 받았지만, 이미 번호가 n보다 큰 prepare 요청에 응답하여, 번호가 n인 새로운 제안을 수락하지 않겠다고 약속한 경우를 가정해봅시다.

그렇다면 acceptor는 새로운 prepare 요청에 응답을 안해도 됩니다.
왜냐하면 proposer가 발행하려 하는 n번 제안을 어차피 수락하지 않을 것이기 때문입니다.
따라서 acceptor가 이런 prepare 요청을 무시하게 합시다.
그리고 이미 수락한 제안에 대한 prepare 요청도 무시하도록 합시다.

이렇게 최적화를 하고 나면, acceptor는 그냥 다음 두 가지만 기억하면 됩니다.

- 자신이 수락한 '가장 높은 번호의 제안'과
- '가장 높은 번호의 prepare 요청'에 응답한 번호.
{:style="background-color: #fff9e4;"}

$$P2^c$$는[^p2c-sentence] 장애가 나건 말건 무조건 성립해야 하므로, acceptor는 장애 발생 후 재시작하더라도 이 정보들을 기억해야 합니다.

proposer는 언제든지 제안을 포기하고 완전히 잊을 수 있습니다.
단, 동일한 번호로 다른 제안을 발행하지만 않으면 됩니다.

proposer와 acceptor의 행동을 함께 고려해 보면 알고리즘이 다음과 같이 두 단계로 작동한다는 것을 알 수 있습니다.

- 단계 1.
    - (a) proposer는 번호 n을 선택하고, 과반수의 acceptor들에게 '번호 n이 포함된 prepare 요청'을 보냅니다.
    - (b) acceptor가 '이미 응답한 prepare 요청보다 번호가 큰  번호 n을 가진 prepare 요청'을 받으면, n보다 작은 번호의 제안을 더 이상 수락하지 않겠다는 약속과 함께 그동안 수락한 가장 높은 번호의 제안(이 있다면)을 응답으로 보냅니다.
- 단계 2.
    - (a) proposer가 다수의 acceptor로부터 prepare 요청(번호 n)에 대한 응답을 받으면, 그 acceptor들 각각에게 값 v를 가진 번호 n의 제안에 대한 accept 요청을 보냅니다. 여기에서 v는 응답 중 가장 높은 번호의 제안 값이거나, 응답에서 제안이 보고되지 않은 경우 어떤 값이든 될 수 있습니다.
    - (b) acceptor가 번호가 n인 제안에 대한 accept 요청을 받으면, n보다 큰 번호를 가진 prepare 요청에 이미 응답한 경우가 아니라면 제안을 수락합니다.
{:style="background-color: #fff9e4;"}

proposer는 각각의 제안에 대해 알고리즘을 따르는 한, 여러 제안을 할 수 있습니다.
그리고 proposer는 언제든지 프로토콜 중간에 제안을 포기할 수 있습니다.
(제안이 포기된 후에도 요청이라던가 응답이 도착할 수는 있지만, 정확성은 유지됩니다.)

만약 다른 proposer가 더 높은 번호의 제안을 발행하기 시작했다면, 이 proposer는 제안을 포기하는 것이 좋은 생각일 것입니다.

그리고 acceptor가 이미 더 높은 번호의 prepare 요청을 받았기 때문에 'prepare 요청' 또는 'accept 요청'을 무시한다면, 이 사실을 proposer에게 알려줘서 proposer가 제안을 포기하게 해줍니다.

이것은 정확성에 영향을 미치지 않는 성능 최적화입니다.

#### 2.3 Learning a Chosen Value

**2.3 선택된 값 학습하기**

>
To learn that a value has been chosen, a learner must find out that a proposal has been accepted by a majority of acceptors.
The obvious algorithm is to have each acceptor, whenever it accepts a proposal, respond to all learners, sending them the proposal.
This allows learners to find out about a chosen value as soon as possible, but it requires each acceptor to respond to each learner—a number of responses equal to the product of the number of acceptors and the number of learners.
>
The assumption of non-Byzantine failures makes it easy for one learner to find out from another learner that a value has been accepted.
We can have the acceptors respond with their acceptances to a distinguished learner, which in turn informs the other learners when a value has been chosen.
This approach requires an extra round for all the learners to discover the chosen value.
It is also less reliable, since the distinguished learner could fail.
But it requires a number of responses equal only to the sum of the number of acceptors and the number of learners.
>
More generally, the acceptors could respond with their acceptances to some set of distinguished learners, each of which can then inform all the learners when a value has been chosen.
Using a larger set of distinguished learners provides greater reliability at the cost of greater communication complexity.
>
Because of message loss, a value could be chosen with no learner ever finding out.
The learner could ask the acceptors what proposals they have accepted, but failure of an acceptor could make it impossible to know whether or not a majority had accepted a particular proposal.
In that case, learners will find out what value is chosen only when a new proposal is chosen.
If a learner needs to know whether a value has been chosen, it can have a proposer issue a proposal, using the algorithm described above.

값이 선택되었다는 것을 learner가 학습하려면, 제안이 과반수의 acceptor들에게 수락되었다는 것을 learner가 알아야 합니다.
acceptor가 제안을 수락할 때마다 모든 learner에게 제안을 전송하는 방법이 확실하긴 합니다.

그런데 이렇게 하면 최단 시간으로 각 learner가 선택된 값을 학습하게 되긴 하지만, acceptor 하나하나가 모든 learner에게 응답을 해야 한다는 문제가 있습니다.
'acceptor의 수 ⨉ learner의 수' 만큼의 응답이 필요해지는 것입니다.

우리는 non-Byzantine 실패를 전제하고 있으니까,[^non-byzantine-failure] 어떤 값이 수락되었는지를 한 learner가 다른 learner에게 알려주게 하는 쉬운 방법을 쓸 수 있습니다.
acceptor들이 수락한 내용을 어떤 '특별한 learner' 하나에게 보내면, '특별한 learner'는 다른 learner들에게 값이 선택됐다고 알려줄 수 있는 것입니다.

이 방식을 쓰면 모든 learner가 선택된 값을 알아내기 위해 한 라운드를 더 거쳐야 한다는 단점이 있습니다.
그리고, 이 방식은 '특별한 learner'가 장애를 겪으면 곤란해져서 신뢰도가 좀 떨어집니다.
하지만 이 방법은 응답 횟수가 'acceptor의 수 + learner의 수' 만큼이면 됩니다.

좀 더 일반화하자면, acceptor들은 수락한 내용을 몇몇의 '특별한 learner들' 집합에 응답할 수 있습니다.
그리고 '특별한 learner들'은, 값이 선택됐다는 것을 모든 learner들에게 알려줄 수 있습니다.
특별한 learner들이 더 많이 들어있는 집합을 사용하면, 통신 복잡도가 더 커지긴 하지만 더 큰 신뢰성을 제공할 수 있습니다.

한편, 어떤 값이 선택된 상황인데도 메시지 손실이 발생해서, 모든 learner들이 전부 다 그 사실을 알지 못하는 문제도 발생할 수 있습니다.

물론 learner가 acceptor들에게 어떤 제안들이 수락되었는지 물어볼 수 있긴 합니다.
하지만 하필 그 acceptor가 장애를 겪고 있어서, 그 acceptor도 다른 과반수의 acceptor들이 어떤 제안을 수락했는지 아닌지를 모르는 상황일 수도 있습니다.

이런 경우라면, learner들은 그 다음의 새로운 제안이 선택됐을 때에서야 비로소 선택된 값이 무엇인지 알게 됩니다.

만약 learner가 어떤 값이 선택되었는지 알아야 하는 상황이라면, learner가 proposer에게 부탁하고, proposer는 위에서 설명한 알고리즘을 사용해 제안을 발행할 수 있습니다.

#### 2.4 Progress

**2.4 진행**

>
It’s easy to construct a scenario in which two proposers each keep issuing a sequence of proposals with increasing numbers, none of which are ever chosen.
Proposer p completes phase 1 for a proposal number $$n_1$$.
Another proposer q then completes phase 1 for a proposal number $$n_2$$ > $$n_1$$.
Proposer p’s phase 2 accept requests for a proposal numbered $$n_1$$ are ignored because the acceptors have all promised not to accept any new proposal numbered less than $$n_2$$.
So, proposer p then begins and completes phase 1 for a new proposal number $$n_3 > n_2$$, causing the second phase 2 accept requests of proposer q to be ignored.
And so on.
>
To guarantee progress, a distinguished proposer must be selected as the only one to try issuing proposals.
If the distinguished proposer can communicate successfully with a majority of acceptors, and if it uses a proposal with number greater than any already used, then it will succeed in issuing a proposal that is accepted.
By abandoning a proposal and trying again if it learns about some request with a higher proposal number, the distinguished proposer will eventually choose a high enough proposal number.
>
if enough of the system (proposer, acceptors, and communication network) is working properly, liveness can therefore be achieved by electing a single distinguished proposer.
the famous result of fischer, lynch, and patterson [1] implies that a reliable algorithm for electing a proposer must use either randomness or real time—for example, by using timeouts.
however, safety is ensured regardless of the success or failure of the election.

두 proposer가 증가하는 숫자를 갖는 제안 시퀀스를 계속해서 발행하지만, 어떤 제안도 선택이 안 되는 시나리오를 만들기는 쉽습니다.

1. proposer p는 제안 번호 $$n_1$$에 대해 1 단계를 완료합니다.
2. 다른 proposer q는 그 다음 제안 번호 $$n_2$$에 대해 1 단계를 완료합니다. ($$n_2 > n_1$$)
3. proposer p의 제안 번호 $$n_1$$에 대한 2 단계 accept 요청은 무시됩니다.
    - 왜냐하면 acceptor들은 모두 제안 번호 $$n_2$$보다 작은 제안은 수락하지 않겠다고 약속했기 때문입니다.
4. 따라서, proposer p는 새로운 제안 번호 $$n_3$$에 대해 1 단계를 시작하고 완료합니다. ($$n_3 > n_2$$)
5. 그러면 이로 인해 proposer q의 두 번째 2 단계 accept 요청이 무시됩니다.

이런 식으로 계속 이어지게 됩니다.

진행을 안전하게 보장하기 위해서는, 특별한 proposer를 하나 선택해서 유일하게 제안을 발행하도록 해야 합니다.

- 이 특별한 proposer가 과반수의 acceptor들과 성공적으로 통신할 수 있고
    - 이미 사용된 번호보다 큰 번호를 사용한다면, 그 제안은 수락될 것입니다.
    - 특별한 proposer가 더 높은 번호를 가진 요청을 알게 되면,
        - 그 제안을 포기하고 다시 시도함으로써, 결국 충분히 높은 번호를 선택하게 될 것입니다.

만약 시스템(proposer, acceptor, 통신 네트워크)의 충분한 양의 상당 부분이 제대로 작동한다면, '특별한 proposer'를 하나 선출함으로써 시스템 활동성(liveness)을 달성할 수 있습니다.

피셔(fischer), 린치(lynch), 패터슨(patterson)의 유명한 연구 결과는 'proposer를 선출하는 신뢰할 수 있는 알고리즘'이 무작위성이나 실시간성을 사용해야 한다는 것을 보여줍니다.
예를 들자면, timeout을 사용하는 것입니다.

그러나, 선출이 성공하든 실패하든, 안전성은 보장됩니다.

#### 2.5 The Implementation

**2.5 구현**

>
The Paxos algorithm [5] assumes a network of processes.
In its consensus algorithm, each process plays the role of proposer, acceptor, and learner.
The algorithm chooses a leader, which plays the roles of the distinguished proposer and the distinguished learner.
The Paxos consensus algorithm is precisely the one described above, where requests and responses are sent as ordinary messages.
(Response messages are tagged with the corresponding proposal number to prevent confusion.)
Stable storage, preserved during failures, is used to maintain the information that the acceptor must remember.
An acceptor records its intended response in stable storage before actually sending the response.

Paxos 알고리즘은 프로세스들의 네트워크를 가정합니다.
Paxos의 합의 알고리즘에서, 각 프로세스는 proposer, acceptor, learner의 역할을 수행합니다.
알고리즘은 리더(leader)를 선택하며, 이 리더는 '특별한 proposer'와 '특별한 learner'의 역할을 수행합니다.

Paxos 합의 알고리즘은 앞에서 설명한 것과 같이, 요청과 응답으로 일반 메시지를 써서 전송한다는 것을 명확하게 표현합니다.
(응답 메시지에는 번호가 붙어있어서 혼란을 방지합니다.)

장애가 발생한 동안에도 유지되는 안정적인 저장소는 acceptor가 기억해야 하는 정보를 유지하는 데 사용됩니다.
acceptor는 실제로 응답을 보내기 전에 먼저 안정적인 저장소에 보낼 응답을 기록합니다.

>
All that remains is to describe the mechanism for guaranteeing that no two proposals are ever issued with the same number.
Different proposers choose their numbers from disjoint sets of numbers, so two different proposers never issue a proposal with the same number.
Each proposer remembers (in stable storage) the highest-numbered proposal it has tried to issue, and begins phase 1 with a higher proposal number than any it has already used.

이제 남은 것은, 같은 번호를 가진 두 개의 제안이 발행되지 않게 보장하는 메커니즘을 설명하는 것입니다.

서로 다른 proposer들은 겹치지 않는 번호 집합에서 번호를 선택합니다.
그러므로 서로 다른 proposer들이라면 중복 번호를 가진 제안을 발행하지 않습니다.

각 proposer는 (안정된 저장소에서) 발행을 시도한 가장 높은 번호의 제안을 기억하고, 이미 사용한 번호보다 높은 제안 번호로 1 단계를 시작합니다.

### 3 Implementing a State Machine

**3 상태 머신 구현하기**

>
A simple way to implement a distributed system is as a collection of clients that issue commands to a central server.
The server can be described as a deterministic state machine that performs client commands in some sequence.
The state machine has a current state; it performs a step by taking as input a command and producing an output and a new state.
For example, the clients of a distributed banking system might be tellers, and the state-machine state might consist of the account balances of all users.
A withdrawal would be performed by executing a state machine command that decreases an account’s balance if and only if the balance is greater than the amount withdrawn, producing as output the old and new balances.
>
To guarantee that all servers execute the same sequence of state machine commands, we implement a sequence of separate instances of the Paxos consensus algorithm, the value chosen by the i<sup>th</sup> instance being the i<sup>th</sup> state machine command in the sequence.
Each server plays all the roles (proposer, acceptor, and learner) in each instance of the algorithm.
For now, I assume that the set of servers is fixed, so all instances of the consensus algorithm use the same sets of agents
>
In normal operation, a single server is elected to be the leader, which acts as the distinguished proposer (the only one that tries to issue proposals) in all instances of the consensus algorithm.
Clients send commands to the leader, who decides where in the sequence each command should appear.
If the leader decides that a certain client command should be the 135<sup>th</sup> command, it tries to have that command chosen as the value of the 135<sup>th</sup> instance of the consensus algorithm.
It will usually succeed.
It might fail because of failures, or because another server also believes itself to be the leader and has a different idea of what the 135<sup>th</sup> command should be.
But the consensus algorithm ensures that at most one command can be chosen as the 135<sup>th</sup> one.

분산 시스템을 구현하는 간단한 방법은, 중앙 서버에 명령을 내리는 클라이언트들의 집합을 사용하는 것입니다.

- 서버는 결정론적 상태 머신으로, 일정한 순서로 클라이언트가 보낸 명령을 수행합니다.
- 상태 머신은 현재 상태를 갖고 있습니다.
    - 그리고 명령 하나를 입력받아 결과를 출력하고, 새로운 상태로 전환하는 단계를 수행합니다.

예를 들어 분산 은행 시스템이 있다면, 은행원들은 클라이언트가 됩니다.
그리고 모든 사용자들의 계좌 잔액은 상태 머신의 상태가 될 수 있습니다.
인출은 계좌 잔액이 인출금액보다 큰 경우에만 계좌 잔액을 줄이는 상태 머신 명령을 실행함으로써 수행됩니다.
그리고 그 출력으로 이전 잔액과 새로운 잔액을 생성합니다.

모든 서버가 동일한 상태 머신 명령 시퀀스를 실행하도록 보장하기 위해, 우리는 Paxos 합의 알고리즘을 따르는 별도의 인스턴스들을 시퀀셜하게 구현하며, i 번째 인스턴스에서 선택된 값은 시퀀스에서 i번째 상태 머신 명령이 됩니다.
각 서버는 알고리즘의 각 인스턴스에서 모든 역할(proposer, acceptor, learner)을 수행합니다.
지금은 서버 집합이 고정되어 있다고 가정하므로, 합의 알고리즘의 모든 인스턴스는 동일한 에이전트 집합을 사용합니다.

일반적인 상황에서는, 서버 하나가 리더로 선출되어 합의 알고리즘의 모든 인스턴스에서 '특별한 proposer'(제안을 발행하는 유일한 서버)의 역할을 합니다.

클라이언트는 리더에게 명령을 보내고, 리더는 각 명령이 시퀀스 상에서 어디에 있어야 하는지를 결정합니다.
리더가 특정 클라이언트 명령이 135번째 명령이어야 한다고 결정하면,
리더는 해당 명령이 합의 알고리즘의 135번째 인스턴스의 값으로 선택되도록 시도합니다.
이 작업은 대체로 성공적으로 이루어집니다.

하지만 실패할 수도 있는데 장애가 발생해서 그럴 때도 있고, 다른 서버가 자기 자신을 리더라고 믿어서 135번째 명령이 무엇이어야 할지에 대해 다른 생각을 갖고 있기도 하기 때문입니다.
그러나 합의 알고리즘은 최대 하나의 명령만이 135번째 명령으로 선택될 수 있음을 보장합니다.

>
Key to the efficiency of this approach is that, in the Paxos consensus algorithm, the value to be proposed is not chosen until phase 2.
Recall that, after completing phase 1 of the proposer’s algorithm, either the value to be proposed is determined or else the proposer is free to propose any value.
I will now describe how the Paxos state machine implementation works during normal operation.
Later, I will discuss what can go wrong.
I consider what happens when the previous leader has just failed and a new leader has been selected.
(System startup is a special case in which no commands have yet been proposed.)
>
The new leader, being a learner in all instances of the consensus algorithm, should know most of the commands that have already been chosen.
Suppose it knows commands 1–134, 138, and 139—that is, the values chosen in instances 1–134, 138, and 139 of the consensus algorithm.
(We will see later how such a gap in the command sequence could arise.)
It then executes phase 1 of instances 135–137 and of all instances greater than 139.
(I describe below how this is done.)
Suppose that the outcome of these executions determine the value to be proposed in instances 135 and 140, but leaves the proposed value unconstrained in all other instances.
The leader then executes phase 2 for instances 135 and 140, thereby choosing commands 135 and 140.
>
The leader, as well as any other server that learns all the commands the leader knows, can now execute commands 1–135.
However, it can’t execute commands 138–140, which it also knows, because commands 136 and 137 have yet to be chosen.
The leader could take the next two commands requested by clients to be commands 136 and 137.
Instead, we let it fill the gap immediately by proposing, as commands 136 and 137, a special “noop” command that leaves the state unchanged.
(It does this by executing phase 2 of instances 136 and 137 of the consensus algorithm.)
Once these no-op commands have been chosen, commands 138–140 can be executed.

이러한 접근방법의 효율성의 핵심은, Paxos 합의 알고리즘에서 '제안할 값이 2 단계까지 가기 전에는 선택되지 않는다'는 것입니다.
proposer 알고리즘의 1단계를 완료한 이후에는, proposer가 제안할 값이 결정되거나 proposer가 어떤 값을 제안할지 자유롭게 선택할 수 있습니다.

이제 Paxos 상태 머신 구현이 정상적인 상황에서 어떻게 작동하는지 설명하겠습니다.
그리고 나서, 발생 가능한 문제 상황에 대해 논의하겠습니다.
이전 리더가 지금 막 장애가 발생한 상황에서 새로운 리더가 선출된 경우를 고려해 봅시다.
(시스템이 시작된 상황은 아직까지 제안된 명령이 없는 특수한 경우입니다.)

새로운 리더는 합의 알고리즘의 모든 인스턴스에서 learner 역할도 하기 때문에, 이미 선택된 명령들을 대부분 알고 있어야 합니다.

예를 들어 명령 1-134, 138, 139 를 알고 있다고 가정합시다.
즉, 합의 알고리즘의 인스턴스 1-134, 138, 139 에서 선택된 값들입니다.
(좀 있다가 우리는 이런 간격들이 명령 시퀀스에서 어떻게 발생할 수 있는지를 알아볼 것입니다.)
그러고 나서 리더는 인스턴스 135-137 과 139 보다 큰 모든 인스턴스에 대해 1 단계를 실행합니다.
(이 작업이 어떻게 이루어지는지는 아래에서 설명하겠습니다.)

이러한 실행들의 결과로 인스턴스 135와 140에서 제안할 값이 결정되고, 다른 모든 인스턴스에서 제안할 값이 제한 없이 남아있다고 가정해 봅시다.
그러면 리더는 135와 140에 대해 2단계를 실행하여, 명령 135와 140을 선택합니다.

리더는 리더가 알고 있는 모든 명령을 알게 된 다른 서버와 마찬가지로 이제 1-135 명령을 실행할 수 있습니다.
그러나 명령 138-140 을 실행할 수는 없는데, 왜냐하면 명령 136과 137이 아직 선택되지 않았기 때문입니다.
리더는 클라이언트가 요청한 다음 두 명령을 명령 136과 137에 할당할 수 있습니다.
대신, 리더는 상태를 그대로 유지하는 특별한 명령 "noop"을 명령 136과 137로 제안하여 이 공백을 채웁니다.
(합의 알고리즘의 인스턴스 136과 137의 2단계를 실행해서 이 작업을 수행합니다.)
이러한 no-op 명령이 선택되면, 명령 138-140을 실행할 수 있습니다.

>
Commands 1–140 have now been chosen.
The leader has also completed phase 1 for all instances greater than 140 of the consensus algorithm, and it is free to propose any value in phase 2 of those instances.
It assigns command number 141 to the next command requested by a client, proposing it as the value in phase 2 of instance 141 of the consensus algorithm.
It proposes the next client command it receives as command 142, and so on.
>
The leader can propose command 142 before it learns that its proposed command 141 has been chosen.
It’s possible for all the messages it sent in proposing command 141 to be lost, and for command 142 to be chosen before any other server has learned what the leader proposed as command 141.
When the leader fails to receive the expected response to its phase 2 messages in instance 141, it will retransmit those messages.
If all goes well, its proposed command will be chosen.
However, it could fail first, leaving a gap in the sequence of chosen commands.
In general, suppose a leader can get α commands ahead—that is, it can propose commands i + 1 through i +α after commands 1 through i are chosen.
A gap of up to α−1 commands could then arise.

이제 명령 1-140 이 선택되었습니다.
또한 리더는 합의 알고리즘의 140보다 큰 모든 인스턴스에 대해 1단계를 완료했으며, 이러한 인스턴스의 2단계에서 어떤 값을 제안할지 자유롭게 결정할 수 있습니다.
리더는 클라이언트가 요청한 다음 명령에 141이라는 명령 번호를 할당하고,
합의 알고리즘의 인스턴스 141 의 2단계에서 이 값을 제안합니다.
리더는 그 다음에 받은 다음 클라이언트 명령을 명령 142로 제안하고, 이런 식으로 계속됩니다.

리더는 제안한 명령 141이 선택되었다는 것을 알기 전에 명령 142를 제안할 수 있습니다.
리더가 명령 141을 제안하기 위해 보낸 모든 메시지가 분실되는 것도 가능하며,
리더가 명령 141로 제안한 내용을 다른 서버가 알기 전에 명령 142가 선택될 수도 있습니다.
리더는 인스턴스 141에서 2단계 메시지에 대한 예상되는 응답을 받지 못하게 되면, 해당 메시지를 다시 전송합니다.
이 과정이 잘 진행되면 제안된 명령이 선택됩니다.

그러나 리더가 먼저 실패하게 되면, 선택된 명령의 순서에 간격이 생길 수 있습니다.
일반적으로, 리더가 α개의 명령을 앞서 제안할 수 있다고 가정해 보겠습니다.
그러면 α-1개의 명령까지 간격이 생길 수 있습니다.

>
A newly chosen leader executes phase 1 for infinitely many instances of the consensus algorithm—in the scenario above, for instances 135–137 and all instances greater than 139.
Using the same proposal number for all instances, it can do this by sending a single reasonably short message to the other servers.
In phase 1, an acceptor responds with more than a simple OK only if it has already received a phase 2 message from some proposer.
(In the scenario, this was the case only for instances 135 and 140.)
Thus, a server (acting as acceptor) can respond for all instances with a single reasonably short message.
Executing these infinitely many instances of phase 1 therefore poses no problem.
>
Since failure of the leader and election of a new one should be rare events, the effective cost of executing a state machine command—that is, of achieving consensus on the command/value—is the cost of executing only phase 2 of the consensus algorithm.
It can be shown that phase 2 of the Paxos consensus algorithm has the minimum possible cost of any algorithm for reaching agreement in the presence of faults [2].
Hence, the Paxos algorithm is essentially optimal.

새로 선출된 리더는 합의 알고리즘의 무한히 많은 인스턴스에 대해 1단계를 실행합니다.

앞의 시나리오에서는 인스턴스 135-137 과 139 보다 큰 모든 인스턴스에 대해 실행합니다.
모든 인스턴스에 대해 똑같은 제안번호를 사용해서, 리더는 다른 서버에게 상당히 짧은 하나의 메시지를 보내는 것으로 이 작업을 수행할 수 있습니다.

1단계에서, acceptor는 이미 어떤 proposer로부터 2단계 메시지를 받은 경우에만 간단한 OK 이상의 응답을 보냅니다.
(위 시나리오에서는 인스턴스 135와 140에서만 이런 경우에 해당합니다.)
그러므로, 서버(acceptor 역할)는 모든 인스턴스에 대해 하나의 상당히 짧은 메시지로 응답할 수 있습니다.
따라서 이 무한히 많은 1단계 인스턴스를 실행하는 것은 문제가 되지 않습니다.


리더의 실패와 새로운 리더의 선출이 드물게 발생해야 하므로,
상태 머신 명령을 실행하는 효과적인 비용, 즉 명령/값에 대한 합의를 이루는 것은 합의 알고리즘의 2단계만 실행하는 비용입니다.
결함이 있는 상황에서 합의에 도달하기 위한 어떤 알고리즘보다도 Paxos 합의 알고리즘의 2단계는 최소한의 비용을 갖고 있다는 것을 보일 수 있습니다.

그러므로, Paxos 알고리즘은 본질적으로 최적입니다.

>
This discussion of the normal operation of the system assumes that there is always a single leader, except for a brief period between the failure of the current leader and the election of a new one.
In abnormal circumstances, the leader election might fail.
If no server is acting as leader, then no new commands will be proposed.
If multiple servers think they are leaders, then they can all propose values in the same instance of the consensus algorithm, which could prevent any value from being chosen.
However, safety is preserved—--two different servers will never disagree on the value chosen as the i<sup>th</sup> state machine command.
Election of a single leader is needed only to ensure progress.
>
If the set of servers can change, then there must be some way of determining what servers implement what instances of the consensus algorithm.
The easiest way to do this is through the state machine itself.
The current set of servers can be made part of the state and can be changed with ordinary state-machine commands.
We can allow a leader to get α commands ahead by letting the set of servers that execute instance i + α of the consensus algorithm be specified by the state after execution of the i th state machine command.
This permits a simple implementation of an arbitrarily sophisticated reconfiguration algorithm.

이 시스템의 정상적인 작동에 대한 논의는 현재 리더의 실패와 새로운 리더 선출 사이의 짧은 시간을 제외하면 항상 하나의 리더가 있다고 가정합니다.
비정상적인 상황에서는 리더 선출이 실패할 수 있습니다.
만약 리더로서 작동하는 서버가 없다면, 새로운 명령은 제안되지 않습니다.
만약 여러 서버가 자기 자신이 리더라고 생각한다면, 합의 알고리즘의 동일한 인스턴스에서 그들 모두가 값을 제안할 수 있기 때문에, 어떤 값도 선택되지 않는 상황이 발생할 수 있습니다.
그러나 안전성은 유지되는데, 서로 다른 두 서버가 i번째 상태 머신 명령으로 선택된 값에 절대 동의하지 않을 것이기 때문입니다.
단일 리더의 선출은 진행을 보장하기 위해서만 필요합니다.

만약 서버 집합이 변경될 수 있다면, 어떤 서버가 합의 알고리즘의 어떤 인스턴스를 구현하는지를 결정하는 방법이 있어야 합니다.
가장 쉬운 방법은 상태 머신 자체를 사용하는 것입니다.
현재 서버 집합을 상태의 일부로 만들면, 일반 상태 머신 명령을 사용해서 변경할 수 있습니다.
리더가 α개의 명령을 앞서갈 수 있게 하려면, 합의 알고리즘의 i+α 인스턴스를 실행하는 서버 집합이 i번째 상태 머신 명령 실행 후의 상태에 의해 지정되도록 할 수 있습니다.
이 방법은 임의로 복잡한 재구성 알고리즘을 간단하게 구현하는 것을 가능하게 합니다. 

### References

- [1] Michael J. Fischer, Nancy Lynch, and Michael S. Paterson. Impossibility of distributed consensus with one faulty process. Journal of the ACM, 32(2):374–382, April 1985.
- [2] Idit Keidar and Sergio Rajsbaum. On the cost of fault-tolerant consensus when there are no faults—a tutorial. TechnicalReport MIT-LCS-TR-821, Laboratory for Computer Science, Massachusetts Institute Technology, Cambridge, MA, 02139, May 2001. also published in SIGACT News 32(2) (June 2001).
- [3] Leslie Lamport. The implementation of reliable distributed multiprocess systems. Computer Networks, 2:95–114, 1978.
- [4] Leslie Lamport. Time, clocks, and the ordering of events in a distributed system. Communications of the ACM, 21(7):558–565, July 1978.
- [5] Leslie Lamport. The part-time parliament. ACM Transactions on Computer Systems, 16(2):133–169, May 1998.


## Links

- [Paxos Made Simple (pdf)]( https://lamport.azurewebsites.net/pubs/paxos-simple.pdf )
- [The Part-Time Parliament]( https://lamport.azurewebsites.net/pubs/lamport-paxos.pdf )

## 주석

[^two-majorities]: 역주: 다수결 집합이 1개 있는 경우는 일상에서도 흔하므로 상상하기 어렵지 않다. 그러나 다수결 집합이 2개인 경우는 상상하기 좀 어려울 수 있는데 집합론으로 생각해보는 방법이 있다. A,B,C 라는 3명의 acceptor가 있고, 1이라는 값이 제안됐다고 하자. 이 때, 1을 다수결로 찬성하는 다수결 집합은 4개이다($$3C2 + 3C3 = 4$$, `[A,B]`, `[A,C]`, `[B,C]`, `[A,B,C]`) 이 4개의 집합들 중 두 개를 뽑은 뒤 비교해 보면 최소한 하나의 acceptor를 공유하고 있음을 알 수 있다.
[^p2]: 역주: $$P2$$는 '선택된 제안들 간의 일관성'을 보장한다. 선택된 제안들은 모두 같은 값을 갖는다.
[^p2a]: 역주: $$P2^a$$는 'acceptor가 수락한 제안들 간의 일관성'을 보장한다. 즉, 값 v를 갖는 제안이 '선택'되었다면, 그 이후에 모든 acceptor는 더 높은 번호를 갖는 제안을 수락할 때 동일한 값을 유지해야 한다.
[^non-byzantine-failure]: 역주: [[/jargon/byzantine-failure]]는 시스템의 구성원이 악의적으로 행동하거나 잘못된 정보를 전송하는 것을 말한다. 즉 non-Byzantine failure는 시스템의 구성원이 악의적으로 행동하지 않았지만 예상치 못한 이유 등으로 잘못된 동작을 하거나 잘못된 정보를 전송하는 것을 의미한다.
[^p1-sentence]: "$$P1$$. acceptor는 자신이 받은 첫 번째 제안을 받아들여야만 한다."
[^p2b-sentence]: "$$P2^b$$. 값 v를 가진 제안이 선택되었다면, 이후 모든 proposer가 내놓는 더 높은 번호의 제안은 값 v를 갖는다."
[^p2c-sentence]: "$$P2^c$$. 임의의 v와 n에 대해서, 값이 v이고 번호가 n인 제안이 발행되면, 다음 중 하나를 만족하는 '과반수의 acceptor로 구성된 집합 S'가 존재한다. <br/> - (a) S에 소속된 어떤 acceptor도 번호가 n보다 작은 제안을 수락하지 않았다. 혹은, <br/> - (b) S에 소속된 acceptor들이 수락한, '번호가 n보다 작은 모든 제안들' 중 '가장 높은 번호를 갖는 제안'의 값이 v 이다."

