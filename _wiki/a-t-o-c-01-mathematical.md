---
layout  : wiki
title   : 오토마타 및 계산이론.01
summary : Mathematical Preliminaries and Notation
date    : 2018-11-02 11:14:57 +0900
updated : 2018-11-02 22:15:22 +0900
tags    : automata theory-of-computation
toc     : true
public  : true
parent  : study-kocw-automata-theory-of-computation
latex   : true
---
* TOC
{:toc}

# alphabet

alphabet은 $$\sum$$ 기호로 나타낸다.

예를 들어 a부터 z까지의 알파벳을 쓰는 언어는 다음과 같이 나타낼 수 있다.

$$
\sum = \{ a, b, c, ..., z \}
$$

# string

string은 문자를 연결한 것이다.

$$
w = aabbac
$$

## index로 표현하기

string $$w = aabbac$$는 다음과 같이 index로도 표현할 수 있다.

$$
w = a_1 a_2 a_3 a_4 a_5 a_6 \\
$$

## concatenation

string $$w$$와 string $$v$$가 있을 때, $$wv$$라고 쓰면, 두 string을 붙인 것이다.

$$
\begin{align}
w & = aabbac \\
v & = fasd \\
wv & = aabbacfasd \\
\end{align}
$$











