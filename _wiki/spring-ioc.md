---
layout  : wiki
title   : IoC
summary : Inversion of Control
date    : 2019-08-30 22:39:18 +0900
updated : 2019-08-31 16:08:26 +0900
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
    * Mazzocchi가 IoC 개념의 창안자라고 생각하는 사람들도 있지만 Mazzocchi는 그렇지 않다고 한다.
* Mazzocchi가 찾아낸 IoC의 최초 언급은 1996년 Michael Mattson의 논문.
    * [Object-Oriented Frameworks: A survey of methodological issues][o-o-framework]
* 마틴 파울러가 IoC를 Dependency Injection으로 이름을 바꿨다.
    * Mazzocchi는 DI라는 명명은 적절하지 않은 것으로 보는듯.

## Hollywood principle

한편 Michael Mattson의 논문 Conclusions (98쪽) 부분을 읽어보면 다음과 같은 문단이 있다.

>
The major difference between an object-oriented framework and a class library is that the framework calls the application code. Normally the application code calls the class library. This inversion of control is sometimes named the Hollywood principle, "Do not call us, we call You".

>
객체지향 프레임워크와 클래스 라이브러리의 큰 차이점은 프레임워크가 애플리케이션 코드를 호출한다는 것입니다. 일반적으로는 애플리케이션 코드가 클래스 라이브러리를 호출합니다. 이러한 제어의 역전(inversion of control)은 때때로 헐리우드 원칙이라고도 합니다. "우리에게 전화(call)하지 마세요. 우리가 당신을 부를(call) 것입니다".

* 참고: [[hollywood-principle]]{헐리우드 원칙}


## PicoContainer 문서를 통해 보는 IoC의 역사

PicoContainer 프레임워크의 문서 [Inversion of Control History][history]에는 IoC의 역사가 잘 나와 있다.

![ioc-timeline](/post-img/spring-ioc/ioc-timeline.png)

이 글에서 언급하는 선행 기술을 옮겨보자면 다음과 같다.

* 1994: GoF가 [[template-method-pattern]]{템플릿 메소드 패턴}에서 inverted control과 헐리우드 원칙을 이야기함.
* 1994-08-14: Robert C. Martin, 즉 밥 아저씨. [OO Design Quality Metrics: An Analysis of Dependencies?][oo-design].
* 1995-06: 밥 아저씨. Principle of Depenency Inversion. [The Principles of OOD](http://groups.google.com/group/comp.lang.c++/msg/30f7c7701209faba?dmode=source )
* 1996-05: 밥 아저씨. The Dependency Inversion Principle.
* 1996-02: Michael Mattesson의 논문 Object-Oriented Frameworks: A survey of methodological issues. "inversion of control" 등장.
* 1998-06: Brian Foote와 Joseph Yoder. [Big Ball of Mud](http://www.laputan.org/mud/ ).
* 1998-06: Ralph E. Johnson과 Brian Foote. [Designing Reusable Classes](http://www.laputan.org/drc/drc.html ). "inversion of control" 등장.

# 토비의 스프링 3.1

토비의 스프링 3.1 1권 92쪽에서는 다음과 같이 설명하고 있다.

>
제어의 역전이라는 건, 간단히 프로그램의 제어 흐름 구조가 뒤바뀌는 것이라고 설명할 수 있다.  
일반적으로 프로그램의 흐름은 main() 메소드와 같이 프로그램이 시작되는 지점에서 다음에 사용할 오브젝트를 결정하고,
결정한 오브젝트를 생성하고, 만들어진 오브젝트에 있는 메소드를 호출하고,
그 오브젝트 메소드 안에서 다음에 사용할 것을 결정하고 호출하는 식의 작업이 반복된다.
이런 프로그램 구조에서 각 오브젝트는 프로그램 흐름을 결정하거나 사용할 오브젝트를 구성하는 작업에 능동적으로 참여한다.  
(중략)  
제어의 역전이란 이런 제어 흐름의 개념을 꺼꾸로 뒤집는 것이다.
제어의 역전에서는 오브젝트가 자신이 사용할 오브젝트를 스스로 선택하지 않는다.
당연히 생성하지도 않는다.
또 자신도 어떻게 만들어지고 어디서 사용되는지를 알 수 없다.
모든 제어 권한을 자신이 아닌 다른 대상에게 위임하기 때문이다.
프로그램의 시작을 담당하는 main() 과 같은 엔트리 포인트를 제외하면
모든 오브젝트는 이렇게 위임받은 제어 권한을 갖는 특별한 오브젝트에 의해 결정되고 만들어진다.  
(중략)  
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
In Spring, the objects that form the backbone of your application and that are managed by the Spring IoC container are called beans. A bean is an object that is instantiated, assembled, and otherwise managed by a Spring IoC container. Otherwise, a bean is simply one of many objects in your application. Beans, and the dependencies among them, are reflected in the configuration metadata used by a container.

>
Spring에서 애플리케이션의 중추를 이루고 Spring IoC 컨테이너에 의해 관리되는 객체들을 Bean 이라 부릅니다.
Bean은 Spring IoC 컨테이너가 인스턴스로 만들고, 조립하고, 관리하는 객체입니다.
한편으로는, Bean은 당신의 애플리케이션 안에 있는 수많은 객체들 중 하나일 뿐이기도 합니다.
Bean과 Bean들 사이의 종속성은 컨테이너가 사용하는 configuration metadata에서 반영됩니다.

Bean에 대한 이야기도 나왔다.

Bean의 정의도 매우 심플하다. Spring IoC 컨테이너가 라이프 사이클을 관리하는 객체가 Bean 이다.

# PicoContainer의 IoC Overview

PicoContainer의 [Inversion of Control Overview](http://picocontainer.com/inversion-of-control.html ) 문서에 이해를 돕는 쉬운 예제가 있기에 발췌한다.

## IoC 컴포넌트와 냄새 나는 코드의 비교

다음의 코드는 가장 간단한 IoC 컴포넌트라 할 수 있다.

```java
public interface Orange {
  // methods
}
public class AppleImpl implements Apple {
  private Orange orange;
  public AppleImpl(Orange orange) {
    this.orange = orange;
  }
  // other methods
}
```

다음은 IoC 리팩토링이 필요한 냄새가 나는 코드이다. `new OrangeImpl()`에 주목.
`OrangeImpl`에 커플링이 생겼고, 재사용할 수 없는 코드가 되어버렸다.
위의 간단한 IoC 컴포넌트와 비교해 보자.

```java
public class AppleImpl implements Apple{
  private Orange orange;
  public Apple() {
    this.orange = new OrangeImpl();
  }
  // other methods
}
```

다음 코드에서도 냄새가 난다. 이것 역시 위의 간단한 IoC 컴포넌트와 비교해 보자.

```java
public class AppleImpl implements Apple {
  private static Orange orange = OrangeFactory.getOrange();
  public Apple() { }
  // other methods
}
```

## DI를 하는 3가지 방법

한편 PicoContainer는 DI에 대해 다음과 같은 세 가지 예제를 보여준다.

* Constructor Dependency Injection

```java
public interface Orange { 
  // methods 
} 

public class AppleImpl implements Apple {
  private Orange orange;
  public AppleImpl(Orange orange) {
    this.orange = orange; 
  } 
  // other methods 
}
```

* Setter Dependency Injection

```java
public interface Orange { 
  // methods 
} 
public class AppleImpl implements Apple {
  private Orange orange;
  public void setOrange(Orange orange) {
    this.orange = orange; 
  } 
  // other methods 
}
```

* Contextualized Dependency Lookup (Push Approach)

```java
public interface Orange { 
  // methods 
} 
public class AppleImpl implements Apple, DependencyProvision {
  private Orange orange;
  public void doDependencyLookup(DependencyProvider dp) throws DependencyLookupExcpetion{
    this.orange = (Orange) dp.lookup("Orange"); 
  } 
  // other methods 
}
```

마지막은 Spring의 ApplicationContext에서 직접 Bean을 꺼내는 것과 비슷한 느낌이다.

# Spring의 DI

PicoContainer의 DI를 보았으니, Spring의 DI도 살펴보자.

[Core 문서의 1.4.1. Dependency Injection][doc-1-4-1] 항목을 읽어보면 될 것 같다.

>
DI exists in two major variants: Constructor-based dependency injection and Setter-based dependency injection.

>
DI는 두 가지 방법이 있습니다. Constructor 기반 DI와 Seter 기반 DI.

다음은 생성자 주입으로만 DI가 가능한 클래스의 예제이다.

```java
public class SimpleMovieLister {

    // the SimpleMovieLister has a dependency on a MovieFinder
    private MovieFinder movieFinder;

    // a constructor so that the Spring container can inject a MovieFinder
    public SimpleMovieLister(MovieFinder movieFinder) {
        this.movieFinder = movieFinder;
    }

    // business logic that actually uses the injected MovieFinder is omitted...
}
```

>
Setter-based DI is accomplished by the container calling setter methods on your beans after invoking a no-argument constructor or a no-argument static factory method to instantiate your bean.  
<br/>
Setter 기반 DI는 인자가 없는 생성자나 인자가 없는 스태틱 팩토리 메서드를 호출하여 Bean을 인스턴스화한 다음,
컨테이너가 Bean의 setter 메소드를 호출하는 방식으로 이루어진다.

```java
public class SimpleMovieLister {

    // the SimpleMovieLister has a dependency on the MovieFinder
    private MovieFinder movieFinder;

    // a setter method so that the Spring container can inject a MovieFinder
    public void setMovieFinder(MovieFinder movieFinder) {
        this.movieFinder = movieFinder;
    }

    // business logic that actually uses the injected MovieFinder is omitted...
}
```

>
The ApplicationContext supports constructor-based and setter-based DI for the beans it manages. It also supports setter-based DI after some dependencies have already been injected through the constructor approach. You configure the dependencies in the form of a BeanDefinition, which you use in conjunction with PropertyEditor instances to convert properties from one format to another. However, most Spring users do not work with these classes directly (that is, programmatically) but rather with XML bean definitions, annotated components (that is, classes annotated with @Component, @Controller, and so forth), or @Bean methods in Java-based @Configuration classes. These sources are then converted internally into instances of BeanDefinition and used to load an entire Spring IoC container instance.

이 부분을 대충 번역하면...

>
ApplicationContext는 관리하는 Bean에 대해 생성자 기반 및 설정자 기반 DI를 지원합니다. 또한 생성자 접근 방식을 통해 일부 종속성이 이미 주입 된 후의 세터 기반 DI도 지원합니다. BeanDefinition의 형태로 종속성을 설정하면 됩니다. (생략). 그러나 대부분의 Spring 사용자는 이러한 클래스를 직접 코딩해 사용하지는 않고 XML Bean 정의, 어노테이션이있는 컴포넌트 (@Component, @Controller 등으로 어노테이션이있는 클래스) 또는 Java 기반 @Configuration 클래스 안의 @Bean 메소드로 작업합니다. 이러한 소스는 내부적으로 BeanDefinition 인스턴스로 변환되어 전체 Spring IoC 컨테이너 인스턴스를로드하는 데 사용됩니다.

예전에 정리한 두 문서와 관련이 있는 내용이다.

* [[spring-bean-config-configuration]]{@Configuration을 통한 Spring Bean 설정}
* [[spring-bean-config-xml]]{xml을 통한 Spring Bean 설정}

## 생성자 기반 DI와 세터 기반 DI 중 어떤 것을 사용해야 할까?

>
The Spring team generally advocates constructor injection,

Spring 팀은 생성자 주입 쪽을 선호한다고 한다. 그 이유는 다음과 같다.

* immutable 객체로 만들 수 있다.
* 디펜던시가 null이 되는 것을 예방할 수 있다.
* 완전히 초기화된 상태로 호출한 곳에 리턴된다.

세터 방식에 대해서는 다음과 같은 점을 생각해볼 만하다.

* 세터 방식은 클래스 내에서 적합한 기본값을 할당할 수 있는 경우에만 사용해야 한다.
    * 이렇게 하지 않으면 디펜던시를 사용할 때마다 null 체크를 해야 한다.
* 디펜던시를 재구성하거나 재주입이 필요한 경우엔 유용하다.

# 함께 읽기

* [[hollywood-principle]]{헐리우드 원칙}
* [[template-method-pattern]]{템플릿 메소드 패턴}

# 참고문헌

* 웹 문서
    * [On Inversion of Control by Stefano Mazzocchi][on-ioc]
    * Object Oriented Frameworks: a survey on methodological issues by Michael Mattsson
        * [link1(www.semanticscholar.org)](https://www.semanticscholar.org/paper/Object-Oriented-Frameworks-%3A-A-Survey-of-Issues-Mattsson/1d13fcb7b9b2bef5e2be3728d3168588a0e55c47 )
        * [link2(citeseerx.ist.psu.edu)](http://citeseerx.ist.psu.edu/viewdoc/summary?doi=10.1.1.41.1127 )
    * PicoContainer
        * [Inversion of Control History][history]
        * [Inversion of Control Overview](http://picocontainer.com/inversion-of-control.html )
    * Spring
        * [Core Technologies][doc-core]
* 서적
    * 토비의 스프링 3.1 vol 1 / 이일민 저 / 에이콘출판사 / 초판 4쇄 2013년 06월 10일
    * GoF의 디자인 패턴 / Erich Gamma 외 3인 공저 / 김정아 역 / 피어슨에듀케이션코리아(PTG) / 초판 6쇄 2005년 10월 20일
    * GoF의 디자인 패턴(개정판) / 에릭 감마, 리처드 헬름, 랄프 존슨, 존 블라시디스 공저 / 김정아 역 / 프로텍미디어 / 발행 2015년 03월 26일

# 주석

[^translate-hard]: 나에게 꽤 어려운 영어 문장이라 일단 의역했다.
[^kim]: 김정아 님의 주석은 2005년 번역본에는 없고, 프로텍미디어에서 출판한 2015년 개정판에 있다.

[on-ioc]: https://web.archive.org/web/20040413042810/http://www.betaversion.org/~stefano/linotype/news/38/
[o-o-framework]: https://www.semanticscholar.org/paper/Object-Oriented-Frameworks-%3A-A-Survey-of-Issues-Mattsson/1d13fcb7b9b2bef5e2be3728d3168588a0e55c47
[history]: http://picocontainer.com/inversion-of-control-history.html


[oo-design]: https://groups.google.com/forum/#!msg/comp.lang.c++/KU-LQ3hINks/ouRSXPUpybkJ
[doc-core]: https://docs.spring.io/spring/docs/current/spring-framework-reference/core.html
[doc-1-1]: https://docs.spring.io/spring/docs/current/spring-framework-reference/core.html#beans-introduction
[doc-1-4-1]: https://docs.spring.io/spring/docs/current/spring-framework-reference/core.html#beans-factory-collaborators
[doc-beanfactory]: https://docs.spring.io/spring-framework/docs/5.1.9.RELEASE/javadoc-api/org/springframework/beans/factory/BeanFactory.html
[doc-beanf]: https://docs.spring.io/spring/docs/current/spring-framework-reference/core.html#beans-beanfactory
[doc-application-context]: https://docs.spring.io/spring-framework/docs/5.1.9.RELEASE/javadoc-api/org/springframework/context/ApplicationContext.html
