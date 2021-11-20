---
layout  : wiki
title   : (번역) The Feel of Java
summary : 
date    : 2021-11-20 21:19:49 +0900
updated : 2021-11-20 22:42:34 +0900
tag     : 
toc     : true
public  : true
parent  : [[/java]]
latex   : false
---
* TOC
{:toc}

* 원문: 1997-06 [The Feel of Java]( https://www.win.tue.nl/~evink/education/avp/pdf/feel-of-java.pdf ) by James Gosling
    * [PDF]( ./feel-of-java.pdf )
* 의역 많으니 원문도 같이 읽어보세요.

## The Feel of Java

>
Java is a blue collar language.
It’s not PhD thesis material but a language for a job.
Java feels very familiar to many different programmers because we preferred tried-and-tested things.

Java는 블루칼라 언어입니다.
박사 논문을 위한 자료가 아니라 직업에 필요한 언어입니다.
우리는 시행착오와 테스트를 거친 검증된 것들을 선호하기 때문에, 우리의 Java는 여러 프로그래머들에게 매우 친숙하게 느껴질 것입니다.

>
Java evolved out of a Sun research project started six years ago to look into distributed control of consumer electronics devices.
It was not an academic research project studying programming languages: Doing language research was actively an antigoal.
For the first three years, I worked on the language and the runtime, and everybody else in the group worked on a variety of different prototype applications, the things that were really the heart of the project.
So the drive for changes came from the people who were actually using it and saying “do this, do this, do this.”

6년 전, Sun에서는 가전제품 분산 제어 시스템을 연구하기 위한 프로젝트 하나가 시작됐습니다.
Java는 그 프로젝트에서 발전한 언어입니다.
그 프로젝트는 프로그래밍 언어 연구라는 학술적인 목표를 갖고 있지 않았습니다. 완전히 다른 목표를 갖는 프로젝트였죠.
나는 처음 3년간은 언어와 런타임을 연구했습니다.
그리고 그룹의 다른 모든 사람들은 프로젝트의 핵심인 다양한 프로토타입 애플리케이션에 대한 작업을 수행했습니다.
즉, (Java 언어의 탄생을 위한) 변화를 위한 추진력은 실제로 그것을 사용하고 "이거 하고, 이것도 하자, 저것도 하자"라고 말하던 사람들에게서 나온 것입니다.

>
Probably the most important thing I learned in talking to the folks building TVs and VCRs was that their priorities were quite different from ours in the computer industry.
Whereas five years ago our mantra was compatibility, the consumer electronics industry considered secure networking, portability, and cost far more important.
And when compatibility did become an issue, they limited notions of compatibility to well-defined interfaces— unlike the computer industry where the most ubiquitous interface around, namely DOS, is full of secret back doors that make life extremely difficult.

TV, VCR을 만드는 사람들과 대화하며 내가 배운 가장 중요한 것은 컴퓨터 산업에 속해 있는 우리의 우선순위와 그들의 우선순위가 매우 다르다는 사실이었습니다.
5년 전, 우리의 핵심 목표는 호환성이었습니다.
그러나 가전제품 산업계에서는 안전한 네트워킹, 휴대성, 그리고 가격을 훨씬 더 중요하게 여기고 있었습니다.
호환성이 이슈가 되는 상황이 발생하면 그들은 잘 정의된 인터페이스를 통해 호환성을 제한하는 방식을 사용했습니다.
이는 당시의 컴퓨터 산업에서 가장 널리 사용되던 인터페이스인 DOS가 삶을 어렵게 만드는 수많은 비밀 백도어로 돌아가고 있던 것과는 상반되는 것이었습니다.

>
I’ve listed the differing priorities for the commercial software and consumer electronics industries in Table 1.
One interesting phenomenon that has occurred over the past five years is that consumer electronics concerns have become mainstream software concerns as the market for software in the home has grown.

상용 소프트웨어 업계와 가전제품 업계의 우선순위를 표 1에 나열해 보았습니다.
지난 5년간 발생한 흥미로운 현상 한 가지는 가정용 소프트웨어 시장이 성장함에 따라, 전자제품이 일반 소프트웨어 시장에서 더욱 중요해졌다는 것입니다.

![표 1]( ./table1.jpg )

>
The buzzwords that have been applied to Java derive directly from this context.
In the consumer electronics world, you connect your VCR to a television, your telephone to a network.
And the consumer electronics industry wants to make these kinds of networked appliances even more pervasive.

Java의 화두(buzzwords)들은 바로 이러한 컨텍스트에서 파생되었습니다.
전자제품 세계에서 여러분은 VCR을 TV에 연결하고, 전화기를 네트워크에 연결합니다.
그리고 전자제품 업계는 이런 종류의 네트워크 가전제품을 더 광범위하게 보급하고 싶어합니다.

>
Architecture neutrality is another issue.
In the consumer electronics business, there are dozens of different CPU types and good reasons for all of them in their individual contexts.
But developing software for a dozen different platforms just doesn’t scale, and it was this desire for architecture neutrality that broke the C++ mold—not so much C++ the language, but the standard way people built C++ compilers.

아키텍처 중립성 또한 이슈라 할 수 있습니다.
가전제품 비즈니스에는 수많은 다양한 CPU 타입이 있는데, 그 각각의 타입들은 각자의 컨텍스트에서 타당한 근거를 갖고 있습니다.
하지만 소프트웨어 개발은 이렇게 각자 다른 다양한 플랫폼에 대해서 쉽게 적용되는 종류의 작업이 아닙니다.
C++라는 틀(C++ 언어가 아니라 사람들이 C++ 컴파일러를 빌드하는 표준 방식)을 깨게 된 것은 아키텍처 중립성에 대한 이러한 필요가 있었기 때문입니다.

### BLUE COLLAR LANGUAGE


## 참고문헌

- 1997-06 [The Feel of Java]( https://www.win.tue.nl/~evink/education/avp/pdf/feel-of-java.pdf ) by James Gosling
    - [PDF]( ./feel-of-java.pdf )

