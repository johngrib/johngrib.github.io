---
layout  : wiki
title   : IoC
summary : Inversion of Control
date    : 2019-08-30 22:39:18 +0900
updated : 2019-08-31 01:24:51 +0900
tag     : spring
toc     : true
public  : true
parent  : spring
latex   : false
---
* TOC
{:toc}

# 기원

IoC에 대해 조사하던 도중, 트위터에서 [@wickedev88](https://twitter.com/wickedev88 )님이 다음 글을 소개해주셔서 읽게 되었다.

[On Inversion of Control][on-ioc]

이 글을 읽고 몇 가지 사실을 알게 되었다.

* 1998년 Avalon 커뮤니티에 Stefano Mazzocchi가 IoC 개념을 소개하였음.
    * Mazzocchi가 IoC 개념의 창안자라고 생각하는 사람들도 있지만 사실이 아님.
* Mazzocchi가 찾아낸 IoC의 최초 언급은 1996년 Michael Mattson의 논문.
    * [Object-Oriented Frameworks: A survey of methodological issues][o-o-framework]
* 마틴 파울러가 IoC를 Dependency Injection으로 이름을 바꿨다.
    * Mazzocchi는 DI라는 명명은 적절하지 않은 것으로 보는듯.

한편 Michael Mattson의 논문 Conclusions (98쪽) 부분을 읽어보면 다음과 같은 문단이 있다.

>
The major difference between an object-oriented framework and a class library is that the framework calls the application code. Normally the application code calls the class library. This inversion of control is sometimes named the Hollywood principle, "Do not call us, we call You".

>
객체지향 프레임워크와 클래스 라이브러리의 큰 차이점은 프레임워크가 애플리케이션 코드를 호출한다는 것입니다. 일반적으로는 애플리케이션 코드가 클래스 라이브러리를 호출합니다. 이러한 제어의 역전(inversion of control)은 때때로 헐리우드 원칙이라고도 합니다. "우리에게 전화(call)하지 마세요. 우리가 당신을 부를(call) 것입니다".[^we-call-you]

# 토비의 스프링 3.1

토비의 스프링 3.1 1권 92쪽에서 이러한 면(헐리우드 원칙)을 상세히 잘 설명하고 있다.

92쪽.
>
제어의 역전이라는 건, 간단히 프로그램의 제어 흐름 구조가 뒤바뀌는 것이라고 설명할 수 있다.  
일반적으로 프로그램의 흐름은 main() 메소드와 같이 프로그램이 시작되는 지점에서 다음에 사용할 오브젝트를 결정하고,
결정한 오브젝트를 생성하고, 만들어진 오브젝트에 있는 메소드를 호출하고,
그 오브젝트 메소드 안에서 다음에 사용할 것을 결정하고 호출하는 식의 작업이 반복된다.
이런 프로그램 구조에서 각 오브젝트는 프로그램 흐름을 결정하거나 사용할 오브젝트를 구성하는 작업에 능동적으로 참여한다.  
(중략)

>
제어의 역전이란 이런 제어 흐름의 개념을 꺼꾸로 뒤집는 것이다.
제어의 역전에서는 오브젝트가 자신이 사용할 오브젝트를 스스로 선택하지 않는다.
당연히 생성하지도 않는다.
또 자신도 어떻게 만들어지고 어디서 사용되는지를 알 수 없다.
모든 제어 권한을 자신이 아닌 다른 대상에게 위임하기 때문이다.
프로그램의 시작을 담당하는 main() 과 같은 엔트리 포인트를 제외하면
모든 오브젝트는 이렇게 위임받은 제어 권한을 갖는 특별한 오브젝트에 의해 결정되고 만들어진다.  
(중략)

>
프레임워크도 제어의 역전 개념이 적용된 대표적인 기술이다.
프레임워크는 라이브러리의 다른 이름이 아니다.
프레임워크는 단지 미리 만들어둔 반제품이나, 확장해서 사용할 수 있도록 준비된 추상 라이브러리의 집합이 아니다.
프레임워크가 어떤 것인지 이해하려면 라이브러리와 프레임워크가 어떻게 다른지 알아야 한다.
라이브러리를 사용하는 애플리케이션 코드는 애플리케이션 흐름을 직접 제어한다.
단지 동작하는 중에 필요한 기능이 있을 때 능동적으로 라이브러리를 사용할 뿐이다.
반면에 프레임워크는 거꾸로 애플리케이션 코드가 프레임워크에 의해 사용된다.
보통 프레임워크 위에 개발한 클래스를 등록해두고, 프레임워크가 흐름을 주도하는 중에
개발자가 만든 애플리케이션 코드를 사용하도록 만드는 방식이다.
최근에는 툴킷, 엔진, 라이브러리 등도 유행을 따라서 무작정 프레임워크라고 부르기도 하는데 이는 잘못된 것이다.
프레임워크에는 분명한 제어의 역전 개념이 적용되어 있어야 한다.
애플리케이션 코드는 프레임워크가 짜놓은 틀에서 수동적으로 동작해야 한다.



# docs.spring.io 를 읽어보자

내가 IoC에 대해 조사하기로 마음먹은 이유는 Spring Framework 때문이다.

따라서 [Spring Framework의 Core 문서][doc-core]도 읽기로 했다. 문서가 다루는 Spring의 버전은 5.1.9.RELEASE.

>
This chapter covers the Spring Framework implementation of the Inversion of Control (IoC) principle. IoC is also known as dependency injection (DI). It is a process whereby objects define their dependencies (that is, the other objects they work with) only through constructor arguments, arguments to a factory method, or properties that are set on the object instance after it is constructed or returned from a factory method. The container then injects those dependencies when it creates the bean. This process is fundamentally the inverse (hence the name, Inversion of Control) of the bean itself controlling the instantiation or location of its dependencies by using direct construction of classes or a mechanism such as the Service Locator pattern.

>
이 챕터에서는 스프링 프레임워크의 Inversion of Control(IoC) 원칙 구현에 대해 설명합니다. IoC는 객체가 자신의 종속성(함께 작동하는 다른 객체)을 다음의 방법들을 통해서만 정의하는 프로세스입니다.  
* 생성자 인자
* 팩토리 메소드의 인자
* 객체 인스턴스가 생성되고 나서, 또는 팩토리 메소드에서 리턴되고 나서 설정된 프로퍼티  

>
그러고 나서 컨테이너는 Bean을 만들 때 이러한 디펜던시들을 주입합니다. 이 프로세스는 Bean의 입장에서는 근본적으로 뒤집힌 것입니다. Bean 스스로 인스턴스화를 컨트롤하기도 하고, 클래스의 생성자를 직접 사용하거나 Service Locator 패턴 같은 방법을 사용하여 종속성의 위치를 제어하기 때문입니다.[^translate-hard]

이 문서에서는 IoC를 매우 심플하게 정의하고 있다.

**객체가 자신과 함께 작동하는 객체를 생성자, 팩토리 메소드의 인자, 프로퍼티로만 받는 프로세스가 IoC다.**

>
The org.springframework.beans and org.springframework.context packages are the basis for Spring Framework’s IoC container. The [BeanFactory][doc-beanfactory] interface provides an advanced configuration mechanism capable of managing any type of object. [ApplicationContext][doc-application-context] is a sub-interface of BeanFactory. It adds:
* Easier integration with Spring’s AOP features
* Message resource handling (for use in internationalization)
* Event publication
* Application-layer specific contexts such as the WebApplicationContext for use in web applications.

>
`org.springframework.beans` 및 `org.springframework.context` 패키지는 Spring Framework의 IoC 컨테이너의 기초를 이루고 있습니다. `BeanFactory` 인터페이스는 모든 타입의 객체를 관리할 수 있는 고급 구성 메커니즘을 제공합니다. `ApplicationContext`는 `BeanFactory`의 하위 인터페이스입니다. `ApplicationContext`에는 다음과 같은 것들을 추가합니다.  
* Spring의 AOP 기능과의 간편한 통합
* 메시지 자원 처리(국제화에 사용)
* 이벤트 게시
* 웹 애플리케이션에서 사용하기 위한 `WebApplicationContext`와 같은 애플리케이션 레이어 컨텍스트

>
In short, the BeanFactory provides the configuration framework and basic functionality, and the ApplicationContext adds more enterprise-specific functionality. The ApplicationContext is a complete superset of the BeanFactory and is used exclusively in this chapter in descriptions of Spring’s IoC container. For more information on using the BeanFactory instead of the ApplicationContext, see [The BeanFactory][doc-beanf].

>
간단히 말하자면, `BeanFactory`는 configuration 프레임워크와 기본적인 기능을 제공합니다. 그리고 `ApplicationContext`는 거기에 더 많은 엔터프라이즈 용도의 기능을 추가합니다. `ApplicationContext`는 `BeanFactory`의 완벽한 수퍼셋이며, 이 챕터에서 Spring IoC 컨테이너를 설명할 때 집중적으로 다룰 것입니다.
`ApplicationContext`가 아니라 `BeanFactory` 사용에 대한 더 많은 정보는 `BeanFactory` 문서를 참고하세요.

>
In Spring, the objects that form the backbone of your application and that are managed by the Spring IoC container are called beans. A bean is an object that is instantiated, assembled, and otherwise managed by a Spring IoC container. Otherwise, a bean is simply one of many objects in your application. Beans, and the dependencies among them, are reflected in the configuration metadata used by a container.

>
Spring에서 애플리케이션의 중추를 이루고 Spring IoC 컨테이너에 의해 관리되는 객체들을 Bean 이라 부릅니다.
Bean은 Spring IoC 컨테이너가 인스턴스로 만들고, 조립하고, 관리하는 객체입니다.
한편으로는, Bean은 당신의 애플리케이션 안에 있는 수많은 객체들 중 하나일 뿐이기도 합니다.
Bean과 Bean들 사이의 종속성은 컨테이너가 사용하는 configuration metadata에서 반영됩니다.

Bean에 대한 이야기도 나왔다.

Bean의 정의도 매우 심플하다. Spring IoC 컨테이너가 라이프 사이클을 관리하는 객체가 Bean 이다.

# 참고문헌

* [On Inversion of Control by Stefano Mazzocchi][on-ioc]
* Object Oriented Frameworks: a survey on methodological issues by Michael Mattsson
    * [link1(www.semanticscholar.org)](https://www.semanticscholar.org/paper/Object-Oriented-Frameworks-%3A-A-Survey-of-Issues-Mattsson/1d13fcb7b9b2bef5e2be3728d3168588a0e55c47 )
    * [link2(citeseerx.ist.psu.edu)](http://citeseerx.ist.psu.edu/viewdoc/summary?doi=10.1.1.41.1127 )
* 토비의 스프링 3.1 vol 1 / 이일민 저 / 에이콘출판사 / 초판 4쇄 2013년 06월 10일

# 주석

[^we-call-you]: "Do not call us, we call You" 헐리우드에서 오디션이 끝난 후 가수나 배우에게 하는 말로 보인다. [the phrase finder](https://www.phrases.org.uk/meanings/dont-call-us.html ) 참고.
[^translate-hard]: 나에게 꽤 어려운 영어 문장이라 일단 의역했다.

[on-ioc]: https://web.archive.org/web/20040413042810/http://www.betaversion.org/~stefano/linotype/news/38/
[o-o-framework]: https://www.semanticscholar.org/paper/Object-Oriented-Frameworks-%3A-A-Survey-of-Issues-Mattsson/1d13fcb7b9b2bef5e2be3728d3168588a0e55c47


[doc-core]: https://docs.spring.io/spring/docs/current/spring-framework-reference/core.html
[doc-1-1]: https://docs.spring.io/spring/docs/current/spring-framework-reference/core.html#beans-introduction
[doc-beanfactory]: https://docs.spring.io/spring-framework/docs/5.1.9.RELEASE/javadoc-api/org/springframework/beans/factory/BeanFactory.html
[doc-beanf]: https://docs.spring.io/spring/docs/current/spring-framework-reference/core.html#beans-beanfactory
[doc-application-context]: https://docs.spring.io/spring-framework/docs/5.1.9.RELEASE/javadoc-api/org/springframework/context/ApplicationContext.html
