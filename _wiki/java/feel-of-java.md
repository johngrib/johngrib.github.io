---
layout  : wiki
title   : (번역) The Feel of Java
summary : 
date    : 2021-11-20 21:19:49 +0900
updated : 2021-11-21 11:37:07 +0900
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
우리는 시행착오를 거친 것들을 선호하기 때문에, Java는 여러 프로그래머들에게 매우 친숙하게 느껴집니다.

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

>
Java is a blue collar language.
It’s not PhD thesis material but a language for a job.
Java feels very familiar to many different programmers because I had a very strong tendency to prefer things that had been used a lot over things that just sounded like a good idea.
And so Java ended up as this fusion of four different kinds of programming.

Java는 블루칼라 언어입니다.
박사 논문을 위한 자료가 아니라 직업에 필요한 언어입니다.
Java는 좋은 아이디어로 여겨지는 이론보다 많은 사람들에게 사용된 것을 선호하는 경향이 강하기 때문에 여러 프로그래머들에게 매우 친숙하게 느껴집니다.
Java는 4가지 종류의 다른 프로그래밍 형태가 융합된 것입니다.

>
1. It has an object-oriented flavor that derives from a number of languages—Simula, C/C++, Objective C, Cedar/Mesa, Modula, and Smalltalk.
2. Another one of my favorite areas is numeric programming.
One of the things that’s different about Java is that we say what 2 + 2 means.
When C came out there were so many different ways of computing 2 + 2 that you couldn’t lay down any kind of rule.
But today, the IEEE 754 standard for floating-point arithmetic has won, and the world owes William Kahan and the other folks who worked on it a real debt, because it removes much of the complexity and clutter in numerical programming.
3. Java also has a systems programming flavor inherited from C that has proven useful over the years.
4. But the one way in which Java is unique is its distributed nature—it feels like there aren’t boundaries between machines.
People can have pieces of behavior squirt back and forth across the network, picked up here, landed over there.
And they just don’t care. The network, by and large, starts to behave like a sea of computation on which you can go rafting.

<span/>

1. Java는 Simula, C/C++, Objective C, Cedar/Mesa, Modula, Smalltalk 같은 여러 언어에서 파생된 객체지향적 특징이 있습니다.
2. 내가 좋아하는 또다른 특징 하나는 숫자 프로그래밍입니다.
Java의 다른 점은, `2 + 2`가 무엇을 의미하는지 말해준다는 것입니다.
C 언어가 나왔을 때 `2 + 2`를 계산하는 방법이 너무 다양해서 어떤 규칙도 확정해서 적용할 수가 없었습니다.
하지만 오늘날엔 부동소수점 연산을 위한 IEEE 754 표준이 채택되었으므로
숫자 프로그래밍의 복잡성과 혼란함이 상당히 제거되어 William Kahan과 그 연구진들에게 빚을 지고 있다고 할 수 있습니다.
3. Java는 수 년동안 유용성이 입증된 C 언어로부터 물려받은 시스템 프로그래밍 형태를 갖추고 있습니다.
4. 한편 Java는 분산 특성이라는 고유성을 갖고 있습니다. 즉, 여러 머신들 사이에 경계가 없는 것처럼 느껴진다는 것입니다.
사람들은 네트워크를 가로질러 다양한 활동을 할 수 있습니다. 이곳에서 자료를 얻고, 저곳에서 착륙하고 그럴 수 있죠.
이런 작업들이 손쉽게 이루어지기에 네트워크는 여러분이 래프팅을 할 수 있는 계산의 바다처럼 작동하게 됩니다.

### Distributed objects on the Web

>
In this particular environment, one of the key design requirements was to create quanta of behavior that could be shipped from place to place.
Oddly enough, classes provide a nice encapsulation boundary for defining what one of these quantum particles is.

이러한 환경에서 비롯된 핵심 설계 요구사항은, 이곳저곳으로 이동할 수 있는 행위의 퀀텀을 만드는 것이었습니다.
클래스는 훌륭한 캡슐화 경제를 제공하여, 이러한 퀀텀 파티클을 정의하게 해줍니다.

>
We also wanted to keep these quanta of behavior separate from data, which at the time was a real departure.
General Magic was doing a very similar thing, except it was putting the code and the data together.
In some cases this has a real advantage, but what if you’re shipping around JPEG images? You end up in an untenable situation if every JPEG image has to have its own JPEG decompressor: You load a page with 20 images and end up with 20 JPEG decompressors at 100 Kbytes each.

우리는 또한 이러한 행위들을 데이터와 분리하고 싶었는데,
[General Magic]( https://en.wikipedia.org/wiki/General_Magic )은 코드와 데이터를 함께 몰아놓는다는 것을 제외하고는 이와 매우 유사했습니다.
이렇게 몰아놓으면 경우에 따라 장점이 있기는 합니다.
그러나 만약 JPEG 이미지를 여러개 전송한다고 생각해 봅시다.
모든 JPEG 이미지가 각각의 JPEG 디코더를 가지고 있다면 어떻게 될까요?
20개의 이미지가 포함된 페이지를 로드하고 나면 각각 100 Kbyte 용량을 가진 20개의 JPEG 디코더가 생성됩니다.

>
So we worked hard to make sure that data and implementation were separate, but that the data could have tags that say, “I’m a bag of bytes that’s understood by this type.”
And if the client doesn’t understand the component’s data type, it would be able to turn around and say, “Gee Mr. Server, do you have the implementation for this particular type?” and reach out across the Internet, grab the implementation, and do some checking to make sure that it won’t turn the disk drive into a puddle of ash.

따라서 우리는 데이터와 구현을 최대한 분리하려 노력했지만, 데이터는 "저는 이 타입으로 해석될 수 있는 byte 덩어리입니다" 라는 태그를 가지고 있어야 했습니다.
그리고 만약 클라이언트가 컴포넌트의 데이터 타입을 인식하지 못한다면, 컴포넌트의 구현을 얻기 위해 인터넷을 가로질러 서버를 불러서 "저기 서버 선생님, 이 타입에 대한 구현체를 갖고 계신가요?"라고 물어볼 수 있습니다.

### Thin clients

>
You can think of this as the client learning something.
It now understands a new data type that it didn’t understand before, and it obtained that knowledge from some remote repository.
You can start building systems that are much more lean, that feel as though there’s this core that understands the basic business of the application.

이 방식을 클라이언트가 무언가를 배우는 것으로도 생각할 수 있습니다.
클라이언트는 이전에는 알지 못했던 새로운 데이터 타입을 이해하고 있으며, 이를 일부 원격 저장소에서 얻은 것입니다.
이제 여러분은 애플리케이션의 기본적인 비즈니스를 이해하는 코어가 있는 것처럼 훨씬 더 lean 한 시스템 구축을 시작할 수 있습니다.

>
A Web browser is a good example.
It’s a simple loop—a set of interfaces to networking standards, document format standards, image format standards, and so on.
And other components can plug into this browser until you have this huge brick of code around which you wrap a big steel band.
That’s your application, and it does everything. But what’s lost in this pile of support code is the essence of a Web browser.

웹 브라우저가 좋은 예시입니다.
웹 브라우저는 네트워킹 표준, 문서 형식 표준, 이미지 형식 표준 등의 인터페이스를 갖고 있는 단순한 루프입니다.
그리고 다른 컴포넌트를 이 브라우저에 연결하는 것도 가능하며, 이 큰 코드 블럭을 둘러싼 다른 다른 컴포넌트들도 있습니다.
이것이 바로 여러분의 애플리케이션이며 모든 작업을 수행하게 됩니다.
그러나 이 과정에서 웹 브라우저의 본질을 잃었다고 할 수 있습니다.

>
Similarly, the support code itself tends to lose its boundaries because people start getting sloppy.
They start saying, “Well gee, there’s this global variable over there that HTML was using, but I could use that creatively with my HTTP driver.”
It always bites you in the end, even though short term it feels good.
With Java, we tended to do things that promoted up-front pain and long-term health, one of those funny religious principles.

이와 비슷하게 지원 코드 자체도 사람들이 엉성해지면서 그 경계를 잃는 경향이 있습니다.
그들은 "HTML이 저쪽에서 사용하고 있었던 전역 변수가 있긴 해요, 하지만 나는 HTTP 드라이버를 써서 그 전역변수를 창의적으로 사용할 수 있습니다"
하지만 이렇게 하면 당장은 기분이 좋겠지만, 결국엔 자신의 발등을 찍게 됩니다.
Java와 함께 하면서, 우리는 재미있는 종교적 원칙 중 하나인 up-front pain과 long-term health를 지원하는 방식으로 일을 해왔습니다.

### Architecture neutral

>
Much of Java was driven by the Internet, and there’s a series of deductive steps that follow from that starting point.
The Internet has a diverse population, some companies’ aspirations to the contrary.
If you need to avoid doing different versions for different platforms, then you need some way of distributing software that is architecturally neutral.
C, by and large, has been very portable, apart from a few gotchas like what does int mean.
So we pushed for a uniform feeling and a deterministic semantics, so that you know what 2 + 2 means and what kind of evaluation order you have.

Java의 많은 부분이 인터넷에서 주도되었습니다.
그리고 그러한 시작점부터 이어져 내려오는 연역적 단계들이 있습니다.
인터넷에는 다양한 사람들의 욕구가 있는데, 몇몇 기업들이 하고자 하는 바는 이와 반대되기도 합니다.
만약 여러분이 각각의 플랫폼마다 각기 다른 버전을 적용하는 것을 피하고자 한다면, 구조적으로 중립적인 소프트웨어 배포 방법이 필요합니다.
C 언어의 경우 매우 이식성이 뛰어나지만, `int`의 의미 같은 몇 가지 이상한 문제들이 있습니다.
그래서 우리는 일관적인 느낌과 결정적인 의미를 전달할 수 있도록 했습니다. `2 + 2`가 무엇을 의미하는지, 어떤 평가 우선순위를 갖고 있는지 알 수 있도록이요.

### JAVA VIRTUAL MACHINE

## 참고문헌

- 1997-06 [The Feel of Java]( https://www.win.tue.nl/~evink/education/avp/pdf/feel-of-java.pdf ) by James Gosling
    - [PDF]( ./feel-of-java.pdf )

