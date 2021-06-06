---
layout  : wiki
title   : (요약) Spring Core Technologies
summary : Version 5.3.7
date    : 2021-06-06 15:56:22 +0900
updated : 2021-06-06 23:45:10 +0900
tag     : java spring
toc     : true
public  : true
parent  : [[spring-documents]]
latex   : false
---
* TOC
{:toc}

## Core Technologies

>
This part of the reference documentation covers all the technologies that are absolutely integral to the Spring Framework.
>
Foremost amongst these is the Spring Framework’s Inversion of Control (IoC) container. A thorough treatment of the Spring Framework’s IoC container is closely followed by comprehensive coverage of Spring’s Aspect-Oriented Programming (AOP) technologies. The Spring Framework has its own AOP framework, which is conceptually easy to understand and which successfully addresses the 80% sweet spot of AOP requirements in Java enterprise programming.
>
Coverage of Spring’s integration with AspectJ (currently the richest — in terms of features — and certainly most mature AOP implementation in the Java enterprise space) is also provided.

이 레퍼런스 문서는 스프링 프레임워크에 절대적으로 필수적인 모든 기술을 다룹니다.

- 가장 중요한 것은 스프링 프레임워크의 IoC 컨테이너입니다.
    - 스프링 프레임워크의 IoC 컨테이너를 다룬 이후에는 스프링의 AOP 기술에 대한 포괄적인 설명이 이어집니다.
- 스프링 프레임워크에는 자체적인 AOP 프레임워크가 포함되어 있습니다.
    - 이 AOP 프레임워크는 개념적으로 이해하기 쉽고 Java 엔터프라이즈 프로그래밍에서 AOP에 대해 필요로 하는 스윗 스팟의 80% 가량을 해결합니다.
- 이 문서에서는 스프링의 AspectJ 통합(기능 측면에서 현재 가장 풍부하고 성숙한 AOP 구현)에 대한 내용도 제공합니다.

## 1. The IoC Container

**1. IoC 컨테이너** [원문]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans )

>
This chapter covers Spring’s Inversion of Control (IoC) container.

이 챕터는 스프링의 IoC 컨테이너를 다룹니다.

### 1.1. Introduction to the Spring IoC Container and Beans

**1.1. 스프링 IoC 컨테이너와 Bean** [원문]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-introduction )

>
This chapter covers the Spring Framework implementation of the Inversion of Control (IoC) principle. IoC is also known as dependency injection (DI).
It is a process whereby objects define their dependencies (that is, the other objects they work with) only through constructor arguments, arguments to a factory method, or properties that are set on the object instance after it is constructed or returned from a factory method.
The container then injects those dependencies when it creates the bean. This process is fundamentally the inverse (hence the name, Inversion of Control) of the bean itself controlling the instantiation or location of its dependencies by using direct construction of classes or a mechanism such as the Service Locator pattern.

이 챕터에서는 스프링 프레임워크의 Inversion of Control(IoC) 원칙 구현에 대해 설명합니다.

- IoC는 DI(dependency injection)이라고도 부릅니다.
- IoC는 객체의 의존관계(함께 작동하는 다른 객체)를 다음의 방법들을 통해서만 정의하는 프로세스입니다.
    - 생성자 인자
    - 팩토리 메소드의 인자
    - 객체 인스턴스가 생성되고 나서, 또는 팩토리 메소드에서 리턴되고 나서 설정된 프로퍼티
- 컨테이너는 Bean을 생성할 때 이러한 의존관계(dependencies)를 주입합니다.
    - 이 프로세스는 Bean의 입장에서는 근본적으로 뒤집힌 것입니다.
        - (그래서 IoC라는 이름을 갖게 되었습니다.)
    - Bean 스스로 인스턴스화를 컨트롤하기도 하고, 클래스의 생성자를 직접 사용하거나 Service Locator 패턴 같은 방법을 사용하여 의존관계의 위치를 제어하기 때문입니다.

>
The `org.springframework.beans` and `org.springframework.context` packages are the basis for Spring Framework’s IoC container. The `BeanFactory` interface provides an advanced configuration mechanism capable of managing any type of object. `ApplicationContext` is a sub-interface of `BeanFactory`. It adds:
>
- Easier integration with Spring’s AOP features
- Message resource handling (for use in internationalization)
- Event publication
- Application-layer specific contexts such as the `WebApplicationContext` for use in web applications.

`org.springframework.beans`와 `org.springframework.context`는 스프링 프레임워크 IoC 컨테이너의 기반이 되는 패키지입니다.

- `BeanFactory` 인터페이스는 어떤 타입의 객체이건 관리할 수 있는 advanced configuration 메커니즘을 제공합니다.
- `ApplicationContext`는 `BeanFactory`의 서브 인터페이스이며, 다음과 같은 것들을 추가합니다.
    - 스프링 AOP 기능과의 손쉬운 통합
    - 메시지 리소스 처리(국제화)
    - 이벤트 발행
    - 웹 애플리케이션에서 사용하기 위한 `WebApplicationContext`와 같은 애플리케이션 레이어 스펙 컨텍스트.

>
In short, the `BeanFactory` provides the configuration framework and basic functionality, and the `ApplicationContext` adds more enterprise-specific functionality. The `ApplicationContext` is a complete superset of the `BeanFactory` and is used exclusively in this chapter in descriptions of Spring’s IoC container. For more information on using the `BeanFactory` instead of the `ApplicationContext`, see [The BeanFactory][beanfactory].

[beanfactory]: https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-beanfactory

간단히 말하자면...

- `BeanFactory`는 configuration 프레임워크와 기본 기능을 제공하고,
- `ApplicationContext`는 좀 더 많은 엔터프라이즈 스펙 기능을 추가합니다.
    - `ApplicationContext`는 `BeanFactory`의 완전한 수퍼셋(더 많은 기능을 제공)입니다.
    - `ApplicationContext`는 스프링 IoC 컨테이너를 설명하기 위한 이 챕터의 주인공이라 할 수 있습니다.
- `ApplicationContext` 대신 `BeanFactory`를 사용하는 방법에 대한 자세한 내용은 [The BeanFactory][beanfactory]를 참조하십시오.

>
In Spring, the objects that form the backbone of your application and that are managed by the Spring IoC container are called beans. A bean is an object that is instantiated, assembled, and managed by a Spring IoC container. Otherwise, a bean is simply one of many objects in your application. Beans, and the dependencies among them, are reflected in the configuration metadata used by a container.

스프링에서는 애플리케이션의 뼈대를 구성하고, 스프링 IoC 컨테이너에 의해 관리되는 객체를 Bean이라고 부릅니다.

- Bean은 Spring IoC 컨테이너에 의해 인스턴스화되고, 조립되며, 관리되는 객체입니다.
- 그렇지 않으면 Bean은 단순히 애플리케이션의 수많은 객체 중 하나일 뿐입니다.
- Bean과 다른 객체들 간의 의존관계는 컨테이너에서 사용하는 configuration 메타 데이터에 반영됩니다.


### 1.2. Container Overview

**1.2. 컨테이너 개요** [원문]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-basics )

>
The `org.springframework.context.ApplicationContext` interface represents the Spring IoC container and is responsible for instantiating, configuring, and assembling the beans. The container gets its instructions on what objects to instantiate, configure, and assemble by reading configuration metadata. The configuration metadata is represented in XML, Java annotations, or Java code. It lets you express the objects that compose your application and the rich interdependencies between those objects.

- `org.springframework.context.ApplicationContext` 인터페이스는
    - 스프링 IoC 컨테이너를 표현합니다.
    - 빈의 인스턴스화, configuring, 조립을 담당합니다.

- configuration meta data
    - 컨테이너는 configuration 메타 데이터를 읽고 얻은 지침을 통해 객체를 인스턴스화하고, 설정하고, 조립할 수 있게 됩니다.
    - configuration 메타 데이터는 XML, Java 애노테이션, Java 코드로 표현됩니다.
    - 이를 통해 여러분은 애플리케이션을 구성하는 객체와 객체 간의 의존관계를 충분히 표현할 수 있습니다.

>
Several implementations of the `ApplicationContext` interface are supplied with Spring. In stand-alone applications, it is common to create an instance of [ClassPathXmlApplicationContext][classpath-xml-ac] or [FileSystemXmlApplicationContext][filesystem-xml-ac]. While XML has been the traditional format for defining configuration metadata, you can instruct the container to use Java annotations or code as the metadata format by providing a small amount of XML configuration to declaratively enable support for these additional metadata formats.

[classpath-xml-ac]: https://docs.spring.io/spring-framework/docs/5.3.7/javadoc-api/org/springframework/context/support/ClassPathXmlApplicationContext.html
[filesystem-xml-ac]: https://docs.spring.io/spring-framework/docs/5.3.7/javadoc-api/org/springframework/context/support/FileSystemXmlApplicationContext.html

스프링에서는 `ApplicationContext` 인터페이스의 여러 가지 구현체가 제공됩니다.

- 독립 실행형 애플리케이션에서는 `ClassPathXmlApplicationContext`나 `FileSystemXmlApplicationContext`의 인스턴스를 만들어 쓰는 것이 일반적입니다.
- XML은 configuration 메타 데이터를 정의하는 전통적인 포맷이었습니다.
    - Java 애노테이션이나 코드를 사용해 컨테이너에 지시를 내리는 것도 가능합니다.

>
In most application scenarios, explicit user code is not required to instantiate one or more instances of a Spring IoC container. For example, in a web application scenario, a simple eight (or so) lines of boilerplate web descriptor XML in the `web.xml` file of the application typically suffices (see [Convenient ApplicationContext Instantiation for Web Applications][context-create]). If you use the [Spring Tools for Eclipse][spring-tools-eclipse] (an Eclipse-powered development environment), you can easily create this boilerplate configuration with a few mouse clicks or keystrokes.

[context-create]: https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#context-create
[spring-tools-eclipse]: https://spring.io/tools

대부분의 애플리케이션 시나리오에서는 스프링 IoC 컨테이너를 하나 이상 인스턴스화하기 위해 사용자가 코딩을 해서 명시적으로 설정할 필요가 없습니다.

- 예를 들어,
    - 웹 애플리케이션 시나리오에서는 `web.xml` 파일에 있는 8 줄 정도의 보일러플레이트 web descriptor XML이면 충분합니다.
    - Eclipse Spring Tools에서는 마우스 몇 번 클릭하거나 키보드 좀 만지작거리면 보일러플레이트 configuration을 쉽게 만들 수 있습니다.

>
The following diagram shows a high-level view of how Spring works. Your application classes are combined with configuration metadata so that, after the `ApplicationContext` is created and initialized, you have a fully configured and executable system or application.

다음 다이어그램은 스프링이 어떻게 작동하는지를 고수준으로 보여줍니다.
- 여러분의 애플리케이션 클래스들은 configuration 메타 데이터에 정의된 대로 조합됩니다.
- `ApplicationContext`가 생성되고 초기화 된 후, 여러분은 설정이 완전히 반영되어 있고 실행 가능한 애플리케이션을 갖게 됩니다.

![image]( /post-img/spring-documents-core/120928640-6dcd8b00-c720-11eb-932c-2398df0faa48.png )

#### 1.2.1. Configuration Metadata

[원문]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-factory-metadata )


## 함께 읽기

- [[inversion-of-control]]

## 참고문헌

- [Core Technologies (docs.spring.io)][5-3-7-core] - 5.3.7 버전

[5-3-7-core]: https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html
