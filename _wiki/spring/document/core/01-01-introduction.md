---
layout  : wiki
title   : Spring Core Technologies - 1.1. Introduction to the Spring IoC Container and Beans
summary : 
date    : 2021-06-15 21:36:28 +0900
updated : 2021-07-10 20:56:34 +0900
tag     : java spring
resource: 77/2A43E6-5CE8-4EDA-9F94-1F1334D53550
toc     : true
public  : true
parent  : [[/spring/document/core]]
latex   : false
---
* TOC
{:toc}

- 목록으로 - [[/spring/document/core]]{Spring Core Technologies}
- 다음 문서 - [[/spring/document/core/01-02-container-overview]]{1.2. Container Overview }

## 1. The IoC Container

**1. IoC 컨테이너** [원문]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans )

## 1.1. Introduction to the Spring IoC Container and Beans

**1.1. 스프링 IoC 컨테이너와 Bean** [(원문)]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-introduction )

>
This chapter covers the Spring Framework implementation of the Inversion of Control (IoC) principle. IoC is also known as dependency injection (DI).
It is a process whereby objects define their dependencies (that is, the other objects they work with) only through constructor arguments, arguments to a factory method, or properties that are set on the object instance after it is constructed or returned from a factory method.
The container then injects those dependencies when it creates the bean. This process is fundamentally the inverse (hence the name, Inversion of Control) of the bean itself controlling the instantiation or location of its dependencies by using direct construction of classes or a mechanism such as the Service Locator pattern.

이 챕터에서는 스프링 프레임워크의 Inversion of Control(IoC) 원칙 구현에 대해 설명한다.

- IoC는 DI(dependency injection)이라고도 부른다.
- IoC는 객체의 의존관계(함께 작동하는 다른 객체)를 다음의 방법들을 통해서만 정의하는 프로세스이다.
    - 생성자 인자
    - 팩토리 메소드의 인자
    - 객체 인스턴스가 생성되고 나서, 또는 팩토리 메소드에서 리턴되고 나서 설정된 프로퍼티
- 컨테이너는 Bean을 생성할 때 이러한 의존관계(dependencies)를 주입한다.
    - 이 프로세스는 Bean의 입장에서는 근본적으로 뒤집힌 것.
        - (그래서 IoC라는 이름을 갖게 되었다.)
        - Bean 스스로 인스턴스화를 컨트롤하기도 하고, 클래스의 생성자를 직접 사용하거나 Service Locator 패턴 같은 방법을 사용하여 의존관계의 위치를 제어하기 때문.

>
The `org.springframework.beans` and `org.springframework.context` packages are the basis for Spring Framework’s IoC container. The `BeanFactory` interface provides an advanced configuration mechanism capable of managing any type of object. `ApplicationContext` is a sub-interface of `BeanFactory`. It adds:
>
- Easier integration with Spring’s AOP features
- Message resource handling (for use in internationalization)
- Event publication
- Application-layer specific contexts such as the `WebApplicationContext` for use in web applications.

`org.springframework.beans`와 `org.springframework.context`는 스프링 프레임워크 IoC 컨테이너의 기반이 되는 패키지다.

- `BeanFactory` 인터페이스는 모든 타입의 객체를 관리할 수 있는 advanced configuration 메커니즘을 제공한다.
- `ApplicationContext`는 `BeanFactory`를 확장한 인터페이스이며, 다음과 같은 것들이 추가되어 있다.
    - 스프링 AOP 기능과의 손쉬운 통합
    - 메시지 리소스 처리(국제화)
    - 이벤트 발행
    - 웹 애플리케이션에서 사용하기 위한 `WebApplicationContext`와 같은 애플리케이션 레이어 스펙 컨텍스트.

>
In short, the `BeanFactory` provides the configuration framework and basic functionality, and the `ApplicationContext` adds more enterprise-specific functionality. The `ApplicationContext` is a complete superset of the `BeanFactory` and is used exclusively in this chapter in descriptions of Spring’s IoC container. For more information on using the `BeanFactory` instead of the `ApplicationContext`, see [The BeanFactory][beanfactory].

[beanfactory]: https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-beanfactory

간단히 말하자면...

- `BeanFactory`는 configuration 프레임워크와 기본 기능을 제공하고,
- `ApplicationContext`는 좀 더 많은 엔터프라이즈 스펙 기능을 추가한다.
    - `ApplicationContext`는 `BeanFactory`의 완전한 수퍼셋이다.
    - `ApplicationContext`는 스프링 IoC 컨테이너를 설명하기 위한 이 챕터의 주인공이라 할 수 있다.
- `ApplicationContext` 대신 `BeanFactory`를 사용하는 방법에 대한 자세한 내용은 [The BeanFactory][beanfactory]를 참고할 것.

>
In Spring, the objects that form the backbone of your application and that are managed by the Spring IoC container are called beans. A bean is an object that is instantiated, assembled, and managed by a Spring IoC container. Otherwise, a bean is simply one of many objects in your application. Beans, and the dependencies among them, are reflected in the configuration metadata used by a container.

스프링에서는 애플리케이션의 뼈대를 구성하고, 스프링 IoC 컨테이너에 의해 관리되는 객체를 Bean이라고 부른다.

- Bean은 Spring IoC 컨테이너에 의해 인스턴스화되고, 조립되며, 관리되는 객체.
- 그렇지 않으면 Bean은 단순히 애플리케이션의 수많은 객체 중 하나일 뿐.
- Bean과 다른 객체들 간의 의존관계는 컨테이너에서 사용하는 configuration 메타 데이터에 반영된다.

## 함께 읽기

- 목록으로 - [[/spring/document/core]]{Spring Core Technologies}
- 다음 문서 - [[/spring/document/core/01-02-container-overview]]{1.2. Container Overview }
- [[/inversion-of-control]]

## 참고문헌

- [Core Technologies (docs.spring.io)][5-3-7-core] - 5.3.7 버전

[5-3-7-core]: https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html

