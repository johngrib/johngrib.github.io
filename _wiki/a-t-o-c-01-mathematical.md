---
layout  : wiki
title   : 오토마타 및 계산이론.01
summary : Mathematical Preliminaries and Notation
date    : 2018-11-02 11:14:57 +0900
updated : 2018-11-03 23:16:16 +0900
tags    : automata theory-of-computation
toc     : true
public  : true
parent  : study-kocw-automata-theory-of-computation
latex   : true
---
* TOC
{:toc}

[20160302 Automata and Theory of Computation](https://www.youtube.com/watch?v=9RGYOBNh-iM&list=PLSN_PltQeOygPrInjCFdQM992AotARlFa )

language, alphabet, string.

# alphabet

alphabet은 $$\sum$$ 기호로 나타낸다.

예를 들어 a부터 z까지의 알파벳을 쓰는 언어는 다음과 같이 나타낼 수 있다.

$$ \sum = \{ a, b, c, ..., z \} $$

# string

string은 문자를 연결한 것이다.

$$ w = aabbac $$

## string의 각 문자를 index로 표현하기

string $$w = aabbac$$는 다음과 같이 index로도 표현할 수 있다.

$$ w = a_1 a_2 a_3 a_4 a_5 a_6 $$

## string concatenation

string $$w$$와 string $$v$$가 있을 때, $$wv$$라고 쓰면, 두 string을 붙인 것이다.
$$
\begin{align}
    w & = aabbac \\
    v & = fasd \\
    wv & = aabbacfasd \\
\end{align}
$$

$$ wv = a_1 a_2 a_3 a_4 a_5 a_6 b_1 b_2 b_3 b_4 \\ $$

## string reverse

$$ w^R = a_n a_{n-1} ... a_1 \\ $$

## string length

$$
\begin{align}
    | w | & = n \\
    | v | & = m \\
    | wv | & = n + m \\
\end{align}
$$

## null string : $$\lambda$$(lambda)

길이가 0인 string을 $$\lambda$$라 부른다.

$$ | \lambda | = 0 $$

## substring

* 원래 string의 일부 string.
* prefix : substring이면서 원본 string의 앞부분.
* suffix : substring이면서 원본 string의 뒷부분.

## $$w^n$$ 표현

$$
\begin{align}
    w^0 & = \lambda \\
    w^1 & = w \\
    w^2 & = ww \\
    w^3 & = www \\
\end{align}
$$

## $$\Sigma^*$$ string의 집합

* 시그마 스타

$$\Sigma^* = \{ \lambda, a, b, aa, ab, ... \}$$

## $$\Sigma^+$$ null string을 제외한 string의 집합

* 시그마 플러스

$$\Sigma^+ = \Sigma^* - \{ \lambda \}$$

# Language

language : $$\Sigma^*$$의 부분집합.

예 : 알파벳을 조금씩 다르게 사용하는 많은 언어. 유럽의 여러 나라들.

## L Complement(여집합)

$$ \bar{L} = \Sigma^* - L $$

## L reverse : L의 모든 sentence를 reverse 한 집합

$$ L^R = \{ w^R: w \in L \} $$

## $$ L_1 L_2 $$

$$ L_1 = \{ a, aa \} $$ 이고 $$ L_2 = \{ b, bb \} $$ 라면,

$$ L_1 L_2 = \{ ab, abb, aab, aabb \}$$ 이 된다.

* 집합 $$ L_1 L_2 $$의 원소의 개수 최대값은 집합 $$ L_1 $$의 원소의 개수 $$ \times $$ 집합 $$ L_2 $$의 원소의 개수이다.
    * 최대값? 중복이 발생할 수 있기 때문.

$$ | L_1 L_2 | \le | L_1 | \times | L_2 |$$

## $$ L^n $$

$$
\begin{align}
    L^1 & = L \\
    L^2 & = L L \\
    L^3 & = L L L \\
\end{align}
$$

$$
\begin{align}
    L   & = \{ a^n b^n : n \ge 0 \} \\
    L^2 & = \{ a^n b^n a^m b^m : n \ge 0, m \ge 0 \}
\end{align}
$$

* null string, 즉 $$\lambda$$만 있는 집합은 공집합과 다르다는 점에 주의할 것.

$$ L^0 = \{ \lambda \} \ne \{ \} $$

## $$ L^* $$

* $$ L $$ 반복의 합집합.

$$ L^* = L^0 \cup L^1 \cup L^2 \cup ... $$

## $$ L^+ $$

$$ L^+ = L^1 \cup L^2 \cup L^3 \cup ... $$

## $$ L^R $$

$$ L^R = \{ b^n a^n, n \ge 0 \} $$

# Grammar

$$ G = (V,T,S,P) $$

* V : variables
    * 영어로 비유하자면 주어, 동사, 형용사...
* T : terminal symbols
    * 단어들.
* S : start variable
    * V 중에서 특별히 시작할 때 사용하는 것들.
* P : productions
    * 우리가 일반적으로 문법이라 부르는 것. 문법 구조.

다음 예를 보자.

$$
G = ( \{S\}, \{a,b\}, S, P ) \\
\begin{align}
P : &  \\
    & S \rightarrow aSb \\
    & S \rightarrow \lambda \\
\end{align}
$$

* V : start variable만 들어 있음.
* T : a, b 만 들어 있음.
* S : V가 $$S$$ 하나 뿐이므로, $$S$$.
* P : Production rule 은 두 가지.
    * $$ S $$를 $$ aSb $$로 바꾸는 것.
    * $$ S $$를 $$ \lambda $$로 바꾸는 것.

이를 사용해 sentence를 만들 수 있다.

S에서 시작해 Variable이 없어질 때까지 P를 반복 적용($$ \Rightarrow $$, derivation)한다.

따라서 다음과 같은 derivation이 가능하다.

$$
\begin{align}
S & \Rightarrow aSb \Rightarrow ab \\
S & \Rightarrow aSb \Rightarrow aaSbb \Rightarrow aabb \\
\end{align}
$$

다음은 Production을 몇 번 적용하건 간에 $$ S $$에서 $$ ab $$가 나올 수 있다는 말.

$$ S \overset{*} \Rightarrow ab $$

다음은 Production을 몇 번 적용하건 간에 $$ S $$에서 $$ aabb $$가 나올 수 있다는 말.

$$ S \overset{*} \Rightarrow aabb $$

한편 $$ ab, aabb $$와 같이 Terminal로만 이루어진 것을 sentence라고 부른다.

그리고 $$ aaSbb $$와 같이 sentence가 될 수 있는 형태를 sentential form이라 부른다.

## Grammar와 Language의 관계 정의

$$ L(G) = \{ w \in T^*; S \overset{*} \Rightarrow w \} $$

Language : Grammar가 주어지면, Start Variable 에서부터 모든 derivation으로 나올 수 있는 모든 가능한 sentence의 집합.

다음과 같은 Language를 생각해 보자.

$$ L = \{ a^n b^{n+1}; n \ge 0 \} $$

이런 랭귀지를 생성하는 그래머는 어떻게 만들 수 있을까?

Production rule을 얼마나 잘 만드는지에 달려 있다.

$$
\begin{align}
S & \rightarrow Ab \\
A & \rightarrow aAb \\
A & \rightarrow \lambda \\
\end{align}
$$

아래쪽의 두 Production rule을 잘 보면 $$ a^n b^n $$을 만들 수 있다는 것을 알 수 있다.

그렇다면 $$ S $$에 $$ b $$만 붙여주면 $$ a^n b^{n+1} $$을 만들 수 있게 되는 것이다.


$$
\begin{align}
S & \rightarrow SS  \\
S & \rightarrow \lambda \\
S & \rightarrow aSb \\
S & \rightarrow bSa \\
\end{align}
$$

위의 Production rule로 생성되는 결과는 아래와 같은 특징이 있다.

$$
\begin{align}
n_a (w) & = n_b (w) \\
\text{a의 개수} & = \text{b의 개수} \\
\end{align}
$$

즉, a 와 b 의 개수가 같은 **모든** string을 생성하는 규칙이다.

