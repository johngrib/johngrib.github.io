---
layout  : wiki
title   : 작성중 - (요약) Spring Core Technologies
summary : Version 5.3.7
date    : 2021-06-06 15:56:22 +0900
updated : 2021-06-14 22:47:09 +0900
tag     : java spring
toc     : true
public  : false
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

>
As the preceding diagram shows, the Spring IoC container consumes a form of configuration metadata. This configuration metadata represents how you, as an application developer, tell the Spring container to instantiate, configure, and assemble the objects in your application.
>
Configuration metadata is traditionally supplied in a simple and intuitive XML format, which is what most of this chapter uses to convey key concepts and features of the Spring IoC container.

configuration 메타 데이터

- 앞의 다이어그램에서 볼 수 있듯이 Spring IoC 컨테이너는 configuration 메타 데이터의 한 형태를 사용합니다.
- configuration 메타 데이터는 애플리케이션 개발자(여러분)가 스프링 컨테이너로 하여금 객체를 인스턴스화하고, 설정하고, 조립하도록 지시하는 방법을 표현합니다.
- configuration 메타 데이터는 전통적으로 간단하고 직관적인 XML 형식으로 제공되어 왔습니다.
    - 이 XML은 이 챕터의 대부분에서 스프링 IoC 컨테이너의 주요 개념과 기능을 전달하는 예제로 등장합니다.

>
(i) XML-based metadata is not the only allowed form of configuration metadata. The Spring IoC container itself is totally decoupled from the format in which this configuration metadata is actually written. These days, many developers choose [Java-based configuration]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-java ) for their Spring applications.

- (i) 참고
    - configuration 메타 데이터는 XML로만 작성할 수 있는 것은 아닙니다.
    - Spring IoC 컨테이너는 이 configuration 메타 데이터 형식과는 완전히 분리되어 있습니다.
    - 요즘은 많은 개발자들이 Spring 애플리케이션을 만들기 위해 XML이 아니라 Java 코드 기반의 configuration을 씁니다.

>
For information about using other forms of metadata with the Spring container, see:
>
- [Annotation-based configuration]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-annotation-config ): Spring 2.5 introduced support for annotation-based configuration metadata.
- [Java-based configuration]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-java ): Starting with Spring 3.0, many features provided by the Spring JavaConfig project became part of the core Spring Framework. Thus, you can define beans external to your application classes by using Java rather than XML files. To use these new features, see the [@Configuration]( https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/context/annotation/Configuration.html ), [@Bean]( https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/context/annotation/Bean.html ), [@Import]( https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/context/annotation/Import.html ), and [@DependsOn]( https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/context/annotation/DependsOn.html ) annotations.

Spring 컨테이너에서 다른 형식의 메타 데이터를 사용하는 방법에 대한 내용은 다음을 참고하세요.

- 애노테이션 기반의 configuration: Spring 2.5 부터는 애노테이션 기반의 configuration 메타데이터를 지원합니다.
- Java 코드 기반의 configuration: Spring 3.0 부터는 Spring JavaConfig 프로젝트에서 제공하는 많은 기능이 Spring Framework에 추가되었습니다.
    - 따라서 XML 파일이 아니라 Java 코드를 사용해 애플리케이션 클래스 외부에서 Bean을 정의할 수 있습니다.
    - 이런 새로운 기능들 사용하려면 `@Configuration`, `@Bean`, `@Import`, `@DependsOn` 애노테이션을 참고하세요.

>
Spring configuration consists of at least one and typically more than one bean definition that the container must manage. XML-based configuration metadata configures these beans as <bean/> elements inside a top-level <beans/> element. Java configuration typically uses @Bean-annotated methods within a @Configuration class.

Spring configuration은 컨테이너가 관리할 하나 이상의 bean 정의로 이루어집니다.
- XML 기반의 configuration 메타 데이터에서는,
    - 이런 Bean들을 최상위 `<beans/>` 엘리먼트 내에서 `<bean/>` 엘리먼트로 구성합니다.
- Java 기반의 configuration 에서는,
    - 일반적으로 `@Configuration` 클래스 내에서 `@Bean` 애노테이션을 붙인 메소드를 사용합니다.

>
These bean definitions correspond to the actual objects that make up your application. Typically, you define service layer objects, data access objects (DAOs), presentation objects such as Struts `Action` instances, infrastructure objects such as Hibernate `SessionFactories`, JMS `Queues`, and so forth. Typically, one does not configure fine-grained domain objects in the container, because it is usually the responsibility of DAOs and business logic to create and load domain objects. However, you can use Spring’s integration with AspectJ to configure objects that have been created outside the control of an IoC container. See [Using AspectJ to dependency-inject domain objects with Spring]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#aop-atconfigurable ).

이러한 빈 정의는 여러분의 애플리케이션을 구성하는 실제 객체들에 해당됩니다.

- 일반적으로는 다음과 같은 객체들을 정의하기도 합니다.
    - service 계층 객체
    - 데이터 액세스 객체(DAO)
    - Struts의 `Action` 인스턴스와 같은 프리젠테이션 객체
    - Hibernate의 `SessionFactories`
    - JMS `Queues` 등등과 같은 인프라 객체

- 일반적으로 컨테이너에서는 세분화된(fine-grained) 도메인 객체를 구성하지 않습니다.
    - 일반적으로 도메인 개체를 만들고 로드하는 것은 DAO 및 비즈니스 로직의 책임이기 때문입니다.
    - 그러나 Spring의 AspectJ 통합을 사용하면 IoC 컨테이너의 컨트롤 바깥에서 생성된 객체를 구성할 수 있습니다.
        - 자세한 내용은 [AspectJ를 사용하여 Spring에서 도메인 객체를 종속성 주입하기]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#aop-atconfigurable )를 참고하세요.

>
The following example shows the basic structure of XML-based configuration metadata:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://www.springframework.org/schema/beans
        https://www.springframework.org/schema/beans/spring-beans.xsd">

    <bean id="..." class="...">  <!-- (1) -->  <!-- (2) -->
        <!-- collaborators and configuration for this bean go here -->
    </bean>

    <bean id="..." class="...">
        <!-- collaborators and configuration for this bean go here -->
    </bean>

    <!-- more bean definitions go here -->

</beans>
```

>
1. The `id` attribute is a string that identifies the individual bean definition.
2. The `class` attribute defines the type of the bean and uses the fully qualified classname.
>
The value of the `id` attribute refers to collaborating objects. The XML for referring to collaborating objects is not shown in this example. See [Dependencies]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-dependencies ) for more information.

다음 예는 XML 기반의 configuration 메타데이터의 기본적인 구조를 보여 줍니다.

1. `id`는 bean 정의를 식별하는 문자열입니다.
2. `class`는 bean의 타입을 정의하며, 경로를 최대한 풀어쓴 클래스 이름을 사용합니다.

`id` 값은 협업 객체를 나타냅니다.
위의 예제에서는 협업 객체 참조를 표시하기 위한 XML 코드는 보이지 않습니다.
자세한 내용은 [의존관계]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-dependencies ) 문서를 참조하십시오.

#### 1.2.2. Instantiating a Container

[원문]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-factory-instantiation )

>
The location path or paths supplied to an `ApplicationContext` constructor are resource strings that let the container load configuration metadata from a variety of external resources, such as the local file system, the Java `CLASSPATH`, and so on.

다음 코드를 보면 `ApplicationContext` 생성자에 경로 문자열을 넣고 있습니다.
이 경로 문자열은 컨테이너가 로컬 파일시스템이나, Java `CLASSPATH`와 같은 다양한 외부 리소스를 통해 configuration 메타 데이터를 로드할 수 있도록 하기 위한 것입니다.

```java
ApplicationContext context = new ClassPathXmlApplicationContext("services.xml", "daos.xml");
```

>
(i) After you learn about Spring’s IoC container, you may want to know more about Spring’s `Resource` abstraction (as described in [Resources]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#resources )), which provides a convenient mechanism for reading an InputStream from locations defined in a URI syntax. In particular, `Resource` paths are used to construct applications contexts, as described in [Application Contexts and Resource Paths]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#resources-app-ctx ).

- (i) 참고
    - 여러분이 Spring의 IoC 컨테이너에 대해 학습한 후에는 추상화된 `Resource`에 대해 학습하고 싶을 것입니다.
    - `Resource`는 스프링의 리소스 추상화이며 URI 형식의 경로가 주어지면 InputStream으로 변환해 읽을 수 있게 해 주는 편리한 기능을 제공합니다.
    - 특히, `Resource` 경로는 "Application Contexts and Resource Paths" 문서에 설명된 바와 같이 application context를 생성하는 데에 사용됩니다.

>
The following example shows the service layer objects (services.xml) configuration file:

다음 예는 서비스 레이어 객체 `(services.xml)` configuration 파일을 보여줍니다.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://www.springframework.org/schema/beans
        https://www.springframework.org/schema/beans/spring-beans.xsd">

    <!-- services -->

    <bean id="petStore" class="org.springframework.samples.jpetstore.services.PetStoreServiceImpl">
        <property name="accountDao" ref="accountDao"/>
        <property name="itemDao" ref="itemDao"/>
        <!-- additional collaborators and configuration for this bean go here -->
    </bean>

    <!-- more bean definitions for services go here -->

</beans>
```

>
The following example shows the data access objects daos.xml file:

다음 예는 데이터 액세스 객체에 대한 `daos.xml` 파일을 보여줍니다.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://www.springframework.org/schema/beans
        https://www.springframework.org/schema/beans/spring-beans.xsd">

    <bean id="accountDao"
        class="org.springframework.samples.jpetstore.dao.jpa.JpaAccountDao">
        <!-- additional collaborators and configuration for this bean go here -->
    </bean>

    <bean id="itemDao" class="org.springframework.samples.jpetstore.dao.jpa.JpaItemDao">
        <!-- additional collaborators and configuration for this bean go here -->
    </bean>

    <!-- more bean definitions for data access objects go here -->

</beans>
```

>
In the preceding example, the service layer consists of the `PetStoreServiceImpl` class and two data access objects of the types `JpaAccountDao` and `JpaItemDao` (based on the JPA Object-Relational Mapping standard). The `property name` element refers to the name of the JavaBean property, and the `ref` element refers to the name of another bean definition. This linkage between `id` and `ref` elements expresses the dependency between collaborating objects. For details of configuring an object’s dependencies, see [Dependencies]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-dependencies ).

위의 예에서 서비스 계층은 `PetStoreServiceImpl` 클래스와 `JpaAccountDao` 및 `JpaItemDao` 타입의 두 DAO로 구성됩니다(JPA ORM 표준 기반).
- `property name` 엘리먼트는 JavaBean 속성의 이름을 참조하고,
- `ref` 엘리먼트는 다른 bean 정의의 이름을 참조합니다.
- `id`와 `ref` 엘리먼트의 이러한 연결은 협업하는 객체들 간의 의존관계를 표현합니다.
- 객체들 간의 의존관계 configuration에 대한 자세한 내용은 Dependencies 문서를 참고하세요.

##### Composing XML-based Configuration Metadata

**XML 기반의 configuration 메타데이터 작성하기** [원문]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-factory-xml-import )

>
It can be useful to have bean definitions span multiple XML files. Often, each individual XML configuration file represents a logical layer or module in your architecture.
>
You can use the application context constructor to load bean definitions from all these XML fragments. This constructor takes multiple `Resource` locations, as was shown in the [previous section]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-factory-instantiation ). Alternatively, use one or more occurrences of the `<import/>` element to load bean definitions from another file or files. The following example shows how to do so:

여러 개의 XML 파일을 사용해 bean을 정의하면 꽤 유용할 수 있습니다.
각각의 XML 설정 파일을 여러분의 아키텍처의 논리적인 레이어나 모듈에 맞게 작성할 수도 있습니다.

- 애플리케이션 컨텍스트 생성자를 사용하면 이런 여러 개의 XML 파일들을 읽어 Bean 정의를 로드할 수 있습니다.
    - 이 생성자는 위의 섹션에서 설명한 바와 같이 여러 개의 리소스 위치를 사용합니다.
- 아니면 다른 방법으로, `<import/>` 엘리먼트를 사용해 다른 파일에서 Bean 정의를 로드할 수도 있습니다.

다음 예를 통해 살펴봅시다.

```xml
<beans>
    <import resource="services.xml"/>
    <import resource="resources/messageSource.xml"/>
    <import resource="/resources/themeSource.xml"/>

    <bean id="bean1" class="..."/>
    <bean id="bean2" class="..."/>
</beans>
```

>
In the preceding example, external bean definitions are loaded from three files: `services.xml`, `messageSource.xml`, and `themeSource.xml`. All location paths are relative to the definition file doing the importing, so `services.xml` must be in the same directory or classpath location as the file doing the importing, while `messageSource.xml` and `themeSource.xml` must be in a `resources` location below the location of the importing file. As you can see, a leading slash is ignored. However, given that these paths are relative, it is better form not to use the slash at all. The contents of the files being imported, including the top level `<beans/>` element, must be valid XML bean definitions, according to the Spring Schema.

위의 예제에서 외부 Bean 정의는 `services.xml`, `messageSource.xml` `themeSource.xml` 이렇게 3개의 파일에서 로드됩니다.

- 모든 경로는 import 파일을 가져오는 파일에 대한 상대 경로를 사용합니다.
    - 따라서 `services.xml`는 가져 오기를 수행하는 xml 파일과 같은 디렉토리나 클래스 경로에 있어야 합니다.
    - `messageSource.xml`, `themeSource.xml`은 위의 xml 파일 경로의 `resource`에 있어야합니다.
- `resources`와 `/resources`를 통해 알 수 있듯, 앞에 있는 슬래시(`/`)는 무시합니다.
    - 그런데 상대 경로를 사용하고 있으므로 가급적이면 슬래시를 사용하지 않는 것이 더 좋습니다.
- 한편 xml 파일의 최상위 `<beans/>` 엘리먼트에서 import하고 있는 파일의 내용은 반드시 Spring Schema 정의를 따르는 XML 빈 정의를 갖고 있어야 합니다.

>
(i) It is possible, but not recommended, to reference files in parent directories using a relative "../" path. Doing so creates a dependency on a file that is outside the current application. In particular, this reference is not recommended for `classpath:` URLs (for example, `classpath:../services.xml`), where the runtime resolution process chooses the “nearest” classpath root and then looks into its parent directory. Classpath configuration changes may lead to the choice of a different, incorrect directory.
>
You can always use fully qualified resource locations instead of relative paths: for example, `file:C:/config/services.xml` or `classpath:/config/services.xml`. However, be aware that you are coupling your application’s configuration to specific absolute locations. It is generally preferable to keep an indirection for such absolute locations — for example, through "${…}" placeholders that are resolved against JVM system properties at runtime.

- (i) 참고
    - 상대 경로인 "../"를 사용해서 상위 디렉토리의 파일을 참조하는 것은 가능하긴 하지만 권장하지 않습니다.
    - 이런 식으로 경로를 사용하하면 현재 애플리케이션 바깥에 있는 파일에 대한 의존성이 생깁니다.
    - 특히, 이 참조는 `classpath:` URL(예: `classpath: ../ services.xml`)형식에 권장되지 않습니다.
        - 런타임 확인 프로세스는 먼저 "가장 가까운" 클래스패스 루트를 선택하고, 상위 디렉토리를 찾기 때문입니다.
        - 이런 클래스패스 configuration 변경 때문에 의도하지 않은 잘못된 디렉토리가 선택될 수 있습니다.
    - 상대 경로를 사용하는 대신 정규화된 경로를 사용할 수 있습니다.
        - 예: `file:C:/config/services.xml`, `classpath:/config/services.xml`
    - 그러나 애플리케이션의 configuration과 특정한 절대 경로 사이에 커플링이 생기지 않도록 주의하세요.
        - 일반적으로는 이런 절대 경로는 직접적으로 사용하지 않고 간접적으로 사용하는 것이 좋습니다.
            - 예를 들어 "$ {…}"를 써서 런타임에 JVM 시스템 속성에 값을 집어넣는 방법이라던가..

>
The namespace itself provides the import directive feature. Further configuration features beyond plain bean definitions are available in a selection of XML namespaces provided by Spring — for example, the context and util namespaces.

네임스페이스는 자체적으로 import 기능을 제공합니다.
- 단순한 bean 정의를 넘어서는 추가적인 설정은 Spring에서 제공하는 XML 네임스페이스에서 사용할 수 있습니다.
- 예: context, util namespaces.

##### The Groovy Bean Definition DSL

[원문]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#groovy-bean-definition-dsl )

>
As a further example for externalized configuration metadata, bean definitions can also be expressed in Spring’s Groovy Bean Definition DSL, as known from the Grails framework. Typically, such configuration live in a ".groovy" file with the structure shown in the following example:

외부에 정의된 configuration 메타데이터에 대한 또다른 예제를 살펴 봅시다.

- bean 정의는 Grails 프레임워크라는 이름으로 알려진 Spring의 Groovy Bean Definition DSL로도 표현이 가능합니다.
- 다음은 일반적으로 이러한 configuration 구조를 ".groovy" 파일로 작성한 예입니다.

```groovy
beans {
    dataSource(BasicDataSource) {
        driverClassName = "org.hsqldb.jdbcDriver"
        url = "jdbc:hsqldb:mem:grailsDB"
        username = "sa"
        password = ""
        settings = [mynew:"setting"]
    }
    sessionFactory(SessionFactory) {
        dataSource = dataSource
    }
    myService(MyService) {
        nestedBean = { AnotherBean bean ->
            dataSource = dataSource
        }
    }
}
```

>
This configuration style is largely equivalent to XML bean definitions and even supports Spring’s XML configuration namespaces. It also allows for importing XML bean definition files through an `importBeans` directive.

- 이러한 configuration 스타일은 XML 파일의 bean 정의와 거의 동일하며,
    - Spring의 XML 설정 네임스페이스도 지원합니다.
- 또한 `importBeans` 지시문을 사용해 XML bean 정의 파일을 가져올 수도 있습니다.

#### 1.2.3. Using the Container

**1.2.3. 컨테이너 사용하기** [원문]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-factory-client )

>
The `ApplicationContext` is the interface for an advanced factory capable of maintaining a registry of different beans and their dependencies. By using the method `T getBean(String name, Class<T> requiredType)`, you can retrieve instances of your beans.
>
The `ApplicationContext` lets you read bean definitions and access them, as the following example shows:

`interface ApplicationContext`는 다른 bean과 그 의존관계들의 레지스트리를 유지할 수 있는 고급 팩토리(advanced factory)를 위한 인터페이스입니다.
`T getBean (String name, Class <T> requiredType)` 메소드를 호출하면 Bean 인스턴스를 리턴받을 수 있습니다.

`ApplicationContext`를 사용하면 다음 예제와 같이 bean 정의를 읽고 액세스할 수 있습니다.

```java
// create and configure beans
ApplicationContext context = new ClassPathXmlApplicationContext("services.xml", "daos.xml");

// retrieve configured instance
PetStoreService service = context.getBean("petStore", PetStoreService.class);

// use configured instance
List<String> userList = service.getUsernameList();
```

>
With Groovy configuration, bootstrapping looks very similar. It has a different context implementation class which is Groovy-aware (but also understands XML bean definitions). The following example shows Groovy configuration:

Groovy configuration을 사용한 부트스트랩도 이와 매우 비슷합니다.
Groovy를 인식하는 컨텍스트 구현 클래스도 있습니다(XML bean 정의도 호환).
다음 예는 Groovy configuration을 보여줍니다.

```java
ApplicationContext context = new GenericGroovyApplicationContext("services.groovy", "daos.groovy");
```

>
The most flexible variant is GenericApplicationContext in combination with reader delegates — for example, with XmlBeanDefinitionReader for XML files, as the following example shows:

가장 유연한 방법은 `GenericApplicationContext`를 읽기 대리자(예: XML 파일용 `XmlBeanDefinitionReader`)와 함께 쓰는 것입니다.

```java
GenericApplicationContext context = new GenericApplicationContext();
new XmlBeanDefinitionReader(context).loadBeanDefinitions("services.xml", "daos.xml");
context.refresh();
```

>
You can also use the GroovyBeanDefinitionReader for Groovy files, as the following example shows:

다음 예제와 같이 Groovy 파일용 `GroovyBeanDefinitionReader`를 사용할 수도 있습니다.

```java
GenericApplicationContext context = new GenericApplicationContext();
new GroovyBeanDefinitionReader(context).loadBeanDefinitions("services.groovy", "daos.groovy");
context.refresh();
```

>
You can mix and match such reader delegates on the same `ApplicationContext`, reading bean definitions from diverse configuration sources.

이러한 읽기 대리자를 `ApplicationContext`와 조합하여, 다양한 configuration 소스에서 bean 정의를 읽을 수 있습니다.

>
You can then use `getBean` to retrieve instances of your beans. The `ApplicationContext` interface has a few other methods for retrieving beans, but, ideally, your application code should never use them. Indeed, your application code should have no calls to the `getBean()` method at all and thus have no dependency on Spring APIs at all. For example, Spring’s integration with web frameworks provides dependency injection for various web framework components such as controllers and JSF-managed beans, letting you declare a dependency on a specific bean through metadata (such as an autowiring annotation).

그런 다음에는 `getBean`을 사용하여 Bean 인스턴스를 가져올 수 있습니다.
그런데 `ApplicationContext` 인터페이스에는 Bean을 가져오는 메소드가 몇 가지 있긴 하있지만, 이상적으로는 애플리케이션 코드에서 이런 메소드를 사용하지 않아야합니다.

- 실제로 여러분의 애플리케이션 코드에는 `getBean()` 메소드 호출이 전혀 없어야 합니다.
    - 즉 Spring API에 전혀 의존하지 않아야 합니다.
    - 예를 들어 Spring의 웹 프레임워크 통합은,
        - controller 및 JSF 관리 bean 같은 웹 프레임워크를 구성하는 component에 대한 dependency 주입을 제공하며, 여러분은 이를 이용해 메타 데이터(예: autowiring 애노테이션)를 통해 특정 bean에 대한 의존관계를 선언할 수 있습니다.

### 1.3. Bean Overview

[원문]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-definition )

>
A Spring IoC container manages one or more beans. These beans are created with the configuration metadata that you supply to the container (for example, in the form of XML `<bean/>` definitions).
>
Within the container itself, these bean definitions are represented as `BeanDefinition` objects, which contain (among other information) the following metadata:
>
- A package-qualified class name: typically, the actual implementation class of the bean being defined.
- Bean behavioral configuration elements, which state how the bean should behave in the container (scope, lifecycle callbacks, and so forth).
- References to other beans that are needed for the bean to do its work. These references are also called collaborators or dependencies.
- Other configuration settings to set in the newly created object — for example, the size limit of the pool or the number of connections to use in a bean that manages a connection pool.
>
This metadata translates to a set of properties that make up each bean definition. The following table describes these properties:

- Spring IoC 컨테이너는 bean을 관리합니다.
    - bean들은 컨테이너에 제공한 configuration 메타데이터(예: `<bean/>` 정의가 있는 형식의 XML 파일)를 통해 생성됩니다.

bean 정의는 컨테이너 내에서 다음과 같은 메타데이터를 포함하는 `BeanDefinition` 객체로 표현됩니다.


- package-qualified class name: 일반적으로 정의된 Bean을 실제로 구현한 클래스.
- 컨테이너 내에서 Bean의 작동 방식을 나타내는 Bean 동작 configuration(scope, 라이프 사이클 콜백 등).
- Bean이 작업을 수행하는 데 필요한 다른 Bean에 대한 레퍼런스.
    - 이러한 참조를 공동 작업자(collaborators) 또는 의존관계(dependencies)라고도 합니다.
- 새로 생성된 객체에 설정할 그 외의 설정
    — 예: pool 사이즈 리미트, 또는 커넥션 풀을 관리하는 Bean에서 사용할 커넥션 수.

메타 데이터는 bean 각각의 정의를 구성하는 속성 집합으로 변환됩니다. 다음 표는 이러한 속성을 설명합니다.

>
**Table 1. The bean definition**
| Property                 | Explained in...                                                                                                                                    |
|--------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------|
| Class                    | [Instantiating Beans]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-factory-class )                           |
| Name                     | [Naming Beans]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-beanname )                                       |
| Scope                    | [Bean Scopes]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-factory-scopes )                                  |
| Constructor arguments    | [Dependency Injection]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-factory-collaborators )                  |
| Properties               | [Dependency Injection]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-factory-collaborators )                  |
| Autowiring mode          | [Autowiring Collaborators]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-factory-autowire )                   |
| Lazy initialization mode | [Lazy-initialized Beans]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-factory-lazy-init )                    |
| Initialization method    | [Initialization Callbacks]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-factory-lifecycle-initializingbean ) |
| Destruction method       | [Destruction Callbacks]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-factory-lifecycle-disposablebean )      |

>
In addition to bean definitions that contain information on how to create a specific bean, the `ApplicationContext` implementations also permit the registration of existing objects that are created outside the container (by users). This is done by accessing the ApplicationContext’s BeanFactory through the `getBeanFactory()` method, which returns the BeanFactory `DefaultListableBeanFactory` implementation. `DefaultListableBeanFactory` supports this registration through the `registerSingleton(..)` and `registerBeanDefinition(..)` methods. However, typical applications work solely with beans defined through regular bean definition metadata.

bean을 생성하는 방법에 대한 정보를 포함하고 있는 bean 정의 외에도, `ApplicationContext` 구현체들은 사용자들이 컨테이너 바깥에서 만들어둔 객체의 등록도 허용합니다.

- 이런 등록 작업은 `ApplicationContext`의 `BeanFactory`에 접근하여 수행할 수 있습니다.
    - 구체적으로는 `getBeanFactory()`를 호출하면 `DefaultListableBeanFactory`를 리턴받습니다.
        - `DefaultListableBeanFactory`의 `registerSingleton(..)`과 `registerBeanDefinition(..)` 메소드를 사용하면 (컨테이너 외부에서 생성한 bean을) 등록할 수 있습니다.
- 그러나 일반적인 애플리케이션은 이러한 방법을 사용하지 않고 표준적인 방법으로 정의된 메타데이터로 만들어진 bean들만 써서 작동합니다.


>
(i) Bean metadata and manually supplied singleton instances need to be registered as early as possible, in order for the container to properly reason about them during autowiring and other introspection steps. While overriding existing metadata and existing singleton instances is supported to some degree, the registration of new beans at runtime (concurrently with live access to the factory) is not officially supported and may lead to concurrent access exceptions, inconsistent state in the bean container, or both.

- (i) 참고
    - bean 메타데이터와 수동으로 제공되는 싱글톤 인스턴스는 가능한 한 빨리 등록해줘야 합니다.
        - 그렇지 않으면 컨테이너가 그런 bean들을 자동으로 연결(autowiring)하지 못할 수 있고, 그 외의 내부 단계에서도 올바르게 작동하지 못할 수 있습니다.
- 기존 메타데이터 및 기존 싱글톤 인스턴스를 재정의하는 것은 어느 정도 지원되지만...
    - 런타임에 새 bean을 등록(팩토리에 대한 라이브 액세스와 동시에)하는 것은 공식적으로 지원되지 않습니다.
        - 동시성 액세스 예외가 발생할 수 있습니다.
        - bean 컨테이너의 일관성에 문제가 생길 수도 있습니다.

#### 1.3.1. Naming Beans

[원문]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-beanname )

>
Every bean has one or more identifiers. These identifiers must be unique within the container that hosts the bean. A bean usually has only one identifier. However, if it requires more than one, the extra ones can be considered aliases.
>
In XML-based configuration metadata, you use the `id` attribute, the `name` attribute, or both to specify the bean identifiers. The `id` attribute lets you specify exactly one id. Conventionally, these names are alphanumeric ('myBean', 'someService', etc.), but they can contain special characters as well. If you want to introduce other aliases for the bean, you can also specify them in the `name` attribute, separated by a comma (`,`), semicolon (`;`), or white space. As a historical note, in versions prior to Spring 3.1, the `id` attribute was defined as an `xsd:ID` type, which constrained possible characters. As of 3.1, it is defined as an `xsd:string` type. Note that bean `id` uniqueness is still enforced by the container, though no longer by XML parsers.

모든 bean은 하나 이상의 식별자를 갖습니다.
- 이러한 식별자는 bean을 호스팅하는 컨테이너 내에서 유니크 해야 합니다.
- 일반적으로 bean 하나는 하나의 식별자만 갖습니다.
- 그러나 식별자가 두 개 이상 필요하다면, 추가 식별자를 알리아스로 간주할 수 있습니다.

XML 기반의 configuration 메타데이터에서 여러분은 `id` 속성이나 `name` 속성 또는 둘 다를 사용하여 bean 식별자를 지정하게 됩니다.

- `id` 속성을 사용하면 정확히 하나의 ID를 지정할 수 있습니다.
- 일반적으로 이러한 이름은 알파벳과 숫자로 이루어지지만('myBean', 'someService' 등), 특수 문자를 사용할 수도 있습니다.
- bean에 대한 다른 알리아스를 사용하려면 쉼표(`,`), 세미콜론(`;`) 또는 공백을 구분자로 사용해 `name` 속성에 지정할 수도 있습니다.
- Spring 3.1 이전 버전에서는,
    - `id` 속성은 사용 가능한 문자를 제한하는 `xsd:ID` 타입으로 정의되었습니다.
- Spring 3.1 이후부터는,
    - `id` 속성은 `xsd:string` 유형으로 정의됩니다.
    - bean `id`가 유니크해야 한다는 제약 사항은 XML 파서가 아니라, 컨테이너에 의해 적용됩니다.

>
You are not required to supply a `name` or an `id` for a bean. If you do not supply a `name` or `id` explicitly, the container generates a unique name for that bean. However, if you want to refer to that bean by name, through the use of the `ref` element or a Service Locator style lookup, you must provide a name. Motivations for not supplying a name are related to using [inner beans]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-inner-beans ) and [autowiring collaborators]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-factory-autowire ).

여러분이 bean의 `name`이나 `id`를 꼭 지정하지 않아도 됩니다.
- `name`이나 `id`를 명시적으로 제공하지 않으면 컨테이너가 해당 bean에 대한 유니크한 `name`을 자동으로 생성합니다.
- 그러나 여러분이 `ref` element나 Service Locator 스타일 검색을 통해 이름으로 해당 bean을 참조하려한다면 name을 작성해야 합니다.
- 이름을 제공하지 않는 이유는 [inner beans]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-inner-beans ), [autowiring collaborators]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-factory-autowire )와 관련이 있습니다.

>
**Bean Naming Conventions**
>
The convention is to use the standard Java convention for instance field names when naming beans. That is, bean names start with a lowercase letter and are camel-cased from there. Examples of such names include accountManager, accountService, userDao, loginController, and so forth.
>
Naming beans consistently makes your configuration easier to read and understand. Also, if you use Spring AOP, it helps a lot when applying advice to a set of beans related by name.

Bean 네이밍 컨벤션
- 인스턴스 필드 이름에 대한 스탠다드 Java 컨벤션을 bean 이름을 지정할 때에도 똑같이 적용합니다.
    - 즉, bean의 이름은 소문자로 시작하고, camelCase 를 사용합니다.
    - 예: `accountManager`, `accountService`, `userDao`, `loginController` 등

- Bean 네이밍 컨벤션은 configuration의 가독성을 확보하여 이해하기 쉽게 해줍니다.
- 또한, Spring AOP를 사용하면 특정 이름과 관련된 bean 집합에 advice를 적용할 때 많은 도움이됩니다.

>
(i) With component scanning in the classpath, Spring generates bean names for unnamed components, following the rules described earlier: essentially, taking the simple class name and turning its initial character to lower-case. However, in the (unusual) special case when there is more than one character and both the first and second characters are upper case, the original casing gets preserved. These are the same rules as defined by `java.beans.Introspector.decapitalize` (which Spring uses here).

- (i) 참고
    - Spring은 classpath 에서의 컴포넌트 스캔을 통해, 이름이 지정되지 않은 컴포넌트에게도 위에서 설명한 규칙에 따라 bean 이름을 만들어 줍니다.
        - 기본적으로는 클래스 이름을 가져와서, 첫 글자를 소문자로 바꾼 이름을 만듭니다.
    - 그런데 클래스 이름이 두 개의 대문자로 시작하는 것 같은 특별한 경우에는, 원래의 클래스 이름을 그대로 사용하게 됩니다.
        - 이 규칙은 [java.beans.Introspector.decapitalize]( https://docs.oracle.com/en/java/javase/11/docs/api/java.desktop/java/beans/Introspector.html#decapitalize(java.lang.String) )의 작동 방식과 같습니다(스프링이 이걸 사용합니다).

##### Aliasing a Bean outside the Bean Definition

**Bean Definition 외부에서 Bean 알리아싱하기** [원문]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-beanname-alias )

>
In a bean definition itself, you can supply more than one name for the bean, by using a combination of up to one name specified by the `id` attribute and any number of other names in the `name` attribute. These names can be equivalent aliases to the same bean and are useful for some situations, such as letting each component in an application refer to a common dependency by using a bean name that is specific to that component itself.

Bean 정의 자체에서, 하나의 Bean에 대해 이름을 하나 이상 제공할 수 있습니다.
- `id` 속성에 지정된 이름 하나와, `name` 속성에 있는 다른 이름의 조합을 사용하면 됩니다.
    - 이러한 이름은 하나의 동일한 bean에 대해 동등하게 취급되는 알리아스가 될 수 있으며
    - 애플리케이션의 각 컴포넌트가 자신에게 고유한 bean 이름을 사용해서 공통 의존관계를 참조하도록 하는 것 같은 상황에서 유용할 수 있습니다.

>
Specifying all aliases where the bean is actually defined is not always adequate, however. It is sometimes desirable to introduce an alias for a bean that is defined elsewhere. This is commonly the case in large systems where configuration is split amongst each subsystem, with each subsystem having its own set of object definitions. In XML-based configuration metadata, you can use the `<alias/>` element to accomplish this. The following example shows how to do so:

그러나 bean에 모든 알리아스를 명시해 사용하는 것이 언제나 적절한 것은 아닙니다.
- 자신이 아닌 다른 곳에서 정의된 bean 알리아스를 사용하는 것이 바람직할 때도 있습니다.
    - 일반적으로는 configuration이 각각의 하위 시스템에 나뉘에 적용되고, 각 하위 시스템에서는 자신만의 객체 정의 집합이 있는 대규모 시스템의 경우가 이에 해당됩니다.
- XML 기반의 configuration 메타데이터에서는 `<alias/>` 엘리먼트를 사용하여 이렇게 할 수 있습니다.
    - 다음 예는 이 방법을 보여줍니다.

```xml
<alias name="myApp-dataSource" alias="subsystemA-dataSource"/>
<alias name="myApp-dataSource" alias="subsystemB-dataSource"/>
```

>
Now each component and the main application can refer to the dataSource through a name that is unique and guaranteed not to clash with any other definition (effectively creating a namespace), yet they refer to the same bean.

- 이제 각 컴포넌트와 메인 애플리케이션은 유니크한 이름을 통해 데이터 소스를 참조할 수 있습니다.
    - 그리고 그 이름은 다른 정의와 충돌하지도 않으며(실제로는 네임스페이스를 생성합니다), 같은 bean을 참조할 수도 있습니다.

>
**Java-configuration**
>
If you use Javaconfiguration, the @Bean annotation can be used to provide aliases. See [Using the @Bean Annotation]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-java-bean-annotation ) for details.

만약 여러분이 Javaconfiguration을 사용한다면, `@Bean` 애노테이션을 써서 알리아스를 지정할 수 있습니다.
자세한 내용은 `@Bean` 애노테이션 사용을 참조하십시오.

#### 1.3.2. Instantiating Beans

[원문]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-factory-class )

>
A bean definition is essentially a recipe for creating one or more objects. The container looks at the recipe for a named bean when asked and uses the configuration metadata encapsulated by that bean definition to create (or acquire) an actual object.
>
If you use XML-based configuration metadata, you specify the type (or class) of object that is to be instantiated in the `class` attribute of the `<bean/>` element. This `class` attribute (which, internally, is a `Class` property on a `BeanDefinition` instance) is usually mandatory. (For exceptions, see [Instantiation by Using an Instance Factory Method]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-factory-class-instance-factory-method ) and [Bean Definition Inheritance]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-child-bean-definitions ).) You can use the `Class` property in one of two ways:
>
- Typically, to specify the bean class to be constructed in the case where the container itself directly creates the bean by calling its constructor reflectively, somewhat equivalent to Java code with the `new` operator.
- To specify the actual class containing the `static` factory method that is invoked to create the object, in the less common case where the container invokes a `static` factory method on a class to create the bean. The object type returned from the invocation of the `static` factory method may be the same class or another class entirely.

bean 정의는 하나 이상의 객체를 생성하기 위한 레시피라 할 수 있습니다.
- 컨테이너는 요청을 받으면 이름이 있는 bean의 레시피를 보고, 캡슐화 된 configuration 메타데이터를 사용하여 실제 객체를 생성(또는 획득)합니다.

XML 기반 configuration 메타데이터를 사용한다면, `<bean/>` 엘리먼트의 `class` 속성에서 인스턴스화 할 객체의 타입(또는 class)을 지정합니다.
- 이 `class` 속성(내부적으로 `BeanDefinition` 인스턴스의 `Class` 속성)은 필수값입니다.
    - (어떤 예외가 있는지에 대해서는 [Instantiation by Using an Instance Factory Method]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-factory-class-instance-factory-method ) 와[Bean Definition Inheritance]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-child-bean-definitions )를 참고하세요.)

여러분은 다음 두 가지 방법 중 하나로 `Class` 속성을 사용할 수 있습니다.

- 생성할 Bean 클래스를 지정합니다.
    - 컨테이너가 생성자를 호출해 Bean을 직접 생성하는 경우이며, 이 방법은 `new` 연산자를 사용하는 Java 코드와 거의 똑같습니다.
- 객체를 생성할 `static` 팩토리 메소드가 들어있는 클래스를 지정합니다.
    - 컨테이너가 정적 팩토리 메소드를 호출해 bean을 생성하는 경우입니다.
    - 정적 팩토리 메서드가 리턴한 객체 타입은 지정한 클래스와 같은 클래스일 수도 있지만 완전히 다른 클래스일 수도 있습니다.

>
**Nested class names**
>
If you want to configure a bean definition for a nested class, you may use either the binary name or the source name of the nested class.

For example, if you have a class called `SomeThing` in the `com.example` package, and this `SomeThing` class has a `static` nested class called `OtherThing`, they can be separated by a dollar sign (`$`) or a dot (`.`). So the value of the `class` attribute in a bean definition would be `com.example.SomeThing$OtherThing` or `com.example.SomeThing.OtherThing`.

**중첩된 클래스의 이름은 어떻게 표현하나?**

- 중첩된 클래스에 대한 bean 정의를 구성하려면, 중첩된 클래스의 이진 이름(binary name)이나 소스 이름(source name)을 사용할 수 있습니다.
- 예를 들어
    - `com.example` 패키지에 `SomeThing`이라는 class가 있고, 이 `SomeThing` class 내부에 `OtherThing`이라는 `static` class가 있다면, 달러 기호(`$`) 또는 점(`.`)을 구분자로 사용할 수 있습니다.
    - 따라서 bean 정의의 `class` 속성 값은 `com.example.SomeThing$OtherThing` 또는 `com.example.SomeThing.OtherThing` 입니다.

##### Instantiation with a Constructor

**생성자를 사용한 초기화** [원문]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-factory-class-ctor )

>
When you create a bean by the constructor approach, all normal classes are usable by and compatible with Spring. That is, the class being developed does not need to implement any specific interfaces or to be coded in a specific fashion. Simply specifying the bean class should suffice. However, depending on what type of IoC you use for that specific bean, you may need a default (empty) constructor.
>
The Spring IoC container can manage virtually any class you want it to manage. It is not limited to managing true JavaBeans. Most Spring users prefer actual JavaBeans with only a default (no-argument) constructor and appropriate setters and getters modeled after the properties in the container. You can also have more exotic non-bean-style classes in your container. If, for example, you need to use a legacy connection pool that absolutely does not adhere to the JavaBean specification, Spring can manage it as well.
>
With XML-based configuration metadata you can specify your bean class as follows:

생성자로 bean을 생성하는 방식을 쓰면 모든 일반 클래스가 Spring과 호환 가능합니다.
- 즉, 특정 인터페이스를 구현하거나 특정한 방식으로 코딩하지 않아도 됩니다.
- 그냥 bean 클래스를 지정하기만 해도 됩니다.
- 그러나 특정 bean에 사용하는 IoC 유형에 따라서, 기본 생성자가 필요한 경우도 있습니다.

Spring IoC 컨테이너는 거의 모든 클래스를 관리할 수 있습니다.
- 완전한 JavaBeans만 관리하지 않습니다.
- 대부분의 Spring 사용자는 (컨테이너의 속성을 고려해서) 기본 생성자와 적당한 setter와 getter만 있는 JavaBeans를 선호합니다.
- 평범한 bean 스타일과는 다른 형태의 클래스를 컨테이너가 관리하게 할 수도 있습니다.
    - 예를 들어 JavaBean 사양을 준수하지 않는 레거시 커넥션 풀을 사용해야하는 경우에도 Spring으로 관리가 가능합니다.

XML 기반의 configuration 메타데이터를 사용하면 다음과 같이 Bean 클래스를 지정할 수 있습니다.

```xml
<bean id="exampleBean" class="examples.ExampleBean"/>

<bean name="anotherExample" class="examples.ExampleBeanTwo"/>
```

>
For details about the mechanism for supplying arguments to the constructor (if required) and setting object instance properties after the object is constructed, see [Injecting Dependencies]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-factory-collaborators ).

생성자에 인자를 제공하는 메커니즘과 객체가 생성된 이후 인스턴스 속성에 값을 셋팅하는 메커니즘에 대해 자세히 알고 싶다면 [Injecting Dependencies]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-factory-collaborators ) 문서를 참고하세요.

##### Instantiation with a Static Factory Method

**정적 팩토리 메소드를 사용한 초기화** [원문]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-factory-class-static-factory-method )

>
When defining a bean that you create with a static factory method, use the `class` attribute to specify the class that contains the `static` factory method and an attribute named `factory-method` to specify the name of the factory method itself. You should be able to call this method (with optional arguments, as described later) and return a live object, which subsequently is treated as if it had been created through a constructor. One use for such a bean definition is to call `static` factories in legacy code.
>
The following bean definition specifies that the bean be created by calling a factory method. The definition does not specify the type (class) of the returned object, only the class containing the factory method. In this example, the `createInstance()` method must be a static method. The following example shows how to specify a factory method:

- 정적 팩토리 메소드를 사용해 bean을 생성하려면,
    - `static` 팩토리 메소드가 들어 있는 클래스를 `class` attribute에 지정해 줍니다.
        - 그리고 `factory-method`에 팩토리 메소드 이름을 지정해 줍니다.
            - 물론 이 팩토리 메소드는 호출 가능해야 하고, 라이브 객체를 리턴할 수 있어야 합니다.
            - 이렇게 리턴된 객체는 생성자를 통해 생성된 것과 똑같이 처리됩니다.
    - 이 방식은 레거시 코드에서 `static` 팩토리를 호출할 수 있다는 점에서도 의미가 있습니다.

다음 bean 정의는 팩토리 메서드를 호출하여 bean이 생성되도록 설정합니다.
- 리턴된 객체의 타입(클래스)을 지정하지 않고 팩토리 메서드와 클래스만 지정한다는 점에 주목합시다.
- 이 예제에서 `createInstance()` 메서드는 정적 메서드여야합니다.
- 다음 예제는 팩토리 메소드를 지정하는 방법을 보여줍니다.

```xml
<bean id="clientService"
    class="examples.ClientService"
    factory-method="createInstance"/>
```

>
The following example shows a class that would work with the preceding bean definition:

다음 예제는 위의 Bean 정의와 함께 작동하는 클래스를 보여줍니다.

```java
public class ClientService {
    private static ClientService clientService = new ClientService();
    private ClientService() {}

    public static ClientService createInstance() {
        return clientService;
    }
}
```

>
For details about the mechanism for supplying (optional) arguments to the factory method and setting object instance properties after the object is returned from the factory, see [Dependencies and Configuration in Detail]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-factory-properties-detailed ).

팩토리 메소드에 인자를 제공하는 메커니즘과 팩토리가 객체를 리턴한 이후 객체 인스턴스 속성에 값을 셋팅하는 메커니즘에 대해 자세히 알고 싶다면 [Dependencies and Configuration in Detail]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-factory-properties-detailed ) 문서를 참고하세요.

##### Instantiation by Using an Instance Factory Method

**인스턴스 팩토리 메소드를 사용한 초기화** [원문]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-factory-class-instance-factory-method )

>
Similar to instantiation through a [static factory method]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-factory-class-static-factory-method ), instantiation with an instance factory method invokes a non-static method of an existing bean from the container to create a new bean. To use this mechanism, leave the `class` attribute empty and, in the `factory-bean` attribute, specify the name of a bean in the current (or parent or ancestor) container that contains the instance method that is to be invoked to create the object. Set the name of the factory method itself with the `factory-method` attribute. The following example shows how to configure such a bean:

- 인스턴스 팩토리 메소드를 사용하는 인스턴스화는,
    - 컨테이너에서 이미 만들어둔 bean의 특정 메소드를 호출하여 새로운 bean을 만듭니다.
- 이 메커니즘을 사용하려면
    - `class` 속성은 비워둡니다.
    - 그리고 `factory-bean` 속성에,
        - 호출할 인스턴스 메소드를 갖고 있는 현재 컨테이너(또는 부모나 조상 컨테이너)의 bean 이름을 지정합니다.
        - `factory-method` 속성에 팩토리 메소드의 이름도 지정해 줍니다.
- 다음 예제는 이 방법을 보여줍니다.

```xml
<!-- the factory bean, which contains a method called createInstance() -->
<bean id="serviceLocator" class="examples.DefaultServiceLocator">
    <!-- inject any dependencies required by this locator bean -->
</bean>

<!-- the bean to be created via the factory bean -->
<bean id="clientService"
    factory-bean="serviceLocator"
    factory-method="createClientServiceInstance"/>
```

>
The following example shows the corresponding class:

다음 예제는 해당 클래스를 보여줍니다.

```java
public class DefaultServiceLocator {

    private static ClientService clientService = new ClientServiceImpl();

    public ClientService createClientServiceInstance() {
        return clientService;
    }
}
```

>
One factory class can also hold more than one factory method, as the following example shows:

다음 예제와 같이, 하나의 팩토리 클래스는 팩토리 메소드를 여러 개 갖고 있을 수도 있습니다.

```xml
<bean id="serviceLocator" class="examples.DefaultServiceLocator">
    <!-- inject any dependencies required by this locator bean -->
</bean>

<bean id="clientService"
    factory-bean="serviceLocator"
    factory-method="createClientServiceInstance"/>

<bean id="accountService"
    factory-bean="serviceLocator"
    factory-method="createAccountServiceInstance"/>
```

>
The following example shows the corresponding class:

다음 예제는 해당 클래스를 보여줍니다.

```java
public class DefaultServiceLocator {

    private static ClientService clientService = new ClientServiceImpl();

    private static AccountService accountService = new AccountServiceImpl();

    public ClientService createClientServiceInstance() {
        return clientService;
    }

    public AccountService createAccountServiceInstance() {
        return accountService;
    }
}
```

>
This approach shows that the factory bean itself can be managed and configured through dependency injection (DI). See [Dependencies and Configuration in Detail]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-factory-properties-detailed ).

이 방법은 팩토리 bean 자신조차도 의존관계 주입(DI)를 통해 구성되고 관리된다는 것을 보여줍니다.
자세한 내용은 [Dependencies and Configuration in Detail]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-factory-properties-detailed ) 문서를 참고하세요.

>
(i) In Spring documentation, "factory bean" refers to a bean that is configured in the Spring container and that creates objects through an [instance]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-factory-class-instance-factory-method ) or [static]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-factory-class-static-factory-method ) factory method. By contrast, `FactoryBean` (notice the capitalization) refers to a Spring-specific [FactoryBean]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-factory-extension-factorybean ) implementation class.

- (i) 참고
    - Spring 문서에서 "factory Bean"은
        - Spring 컨테이너에 구성되는 bean 이며,
        - 인스턴스 또는 정적 팩토리 메소드를 통해 객체를 생성하는 Bean을 의미합니다.
    - 대조적으로, `FactoryBean`(대문자 사용에주의)은 Spring 스펙의 `FactoryBean`을 구현한 클래스입니다.

##### Determining a Bean’s Runtime Type

**Bean의 런타임 타입 결정하기** [원문]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-factory-type-determination )

>
The runtime type of a specific bean is non-trivial to determine. A specified class in the bean metadata definition is just an initial class reference, potentially combined with a declared factory method or being a `FactoryBean` class which may lead to a different runtime type of the bean, or not being set at all in case of an instance-level factory method (which is resolved via the specified `factory-bean` name instead). Additionally, AOP proxying may wrap a bean instance with an interface-based proxy with limited exposure of the target bean’s actual type (just its implemented interfaces).
>
The recommended way to find out about the actual runtime type of a particular bean is a `BeanFactory.getType` call for the specified bean name. This takes all of the above cases into account and returns the type of object that a `BeanFactory.getBean` call is going to return for the same bean name.

런타임일 때 bean이 실제로 어떤 타입을 갖는지는 쉽지 않은 문제입니다.
- bean 메타데이터 정의에 지정된 클래스는 그냥 초기화 클래스의 참조일 뿐입니다.
- 명시된 팩토리 메소드나 `FactoryBean`이 된 클래스와의 조합으로 인해 bean이 런타임에서 타입이 달라질 수 있습니다.
    - 인스턴스 레벨 팩토리 메소드(`factory-bean` name 설정을 쓰지 않고 설정된 경우)를 사용했다면 (리턴 타입을 지정하지 않았으므로) 런타임 타입을 지정하지 않습니다.
- 또한, AOP 프록시는 bean 인스턴스를 (bean의 실제 타입에 비해 노출이 제한된) 인터페이스 기반의 프록시로 래핑할 수 있습니다.

특정 bean이 런타임일 때 실제로 어떤 타입인지 알아내기 위해 추천하는 방법은

- bean 이름으로 `BeanFactory.getType` 메소드를 호출하는 것입니다.
- 이 방법은 위에서 말한 모든 경우를 고려하여 객체의 타입을 리턴해 줍니다.
    - 리턴된 값은 `BeanFactory.getBean` 메소드가 리턴해주는 것과 같은 bean입니다.

### 1.4. Dependencies

[원문]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-dependencies )

>
A typical enterprise application does not consist of a single object (or bean in the Spring parlance). Even the simplest application has a few objects that work together to present what the end-user sees as a coherent application. This next section explains how you go from defining a number of bean definitions that stand alone to a fully realized application where objects collaborate to achieve a goal.

일반적인 엔터프라이즈 애플리케이션은 단일 객체(또는 Spring 용어로 bean)로 이루어지지 않습니다.
- 심지어 최종 사용자의 눈에 한 덩어리로 만들어져 잘 돌아가는 것처럼 보이는 단순한 종류의 애플리케이션도, 실제로는 함께 작동하는 몇 개의 객체로 구성되어 돌아가고 있습니다.
- 이번 섹션에서는 독립적인 여러 bean을 정의하는 것부터, 여러 객체가 협력해 개발 목표를 달성하는 애플리케이션으로 전환하는 방법까지를 설명합니다.

#### 1.4.1. Dependency Injection

[원문]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-factory-collaborators )

>
Dependency injection (DI) is a process whereby objects define their dependencies (that is, the other objects with which they work) only through constructor arguments, arguments to a factory method, or properties that are set on the object instance after it is constructed or returned from a factory method. The container then injects those dependencies when it creates the bean. This process is fundamentally the inverse (hence the name, Inversion of Control) of the bean itself controlling the instantiation or location of its dependencies on its own by using direct construction of classes or the Service Locator pattern.

의존관계 주입(DI)은 다음의 방법들만을 사용해 객체가 자신의 의존관계(함께 일하는 다른 객체들)를 정의하는 프로세스입니다.
- 생성자 인자
- 팩토리 메소드 인자
- 객체 인스턴스가 생성되고 나서, 또는 팩토리 메소드에서 리턴되고 나서 설정된 프로퍼티

그러고 나서, 컨테이너는 bean을 생성할 때 이러한 의존관계를 주입합니다.
- 이러한 프로세스는 Bean의 입장에서는 근본적으로 뒤집힌 것입니다(그래서 Inversion of Control이라는 이름이 되었습니다).
- bean 스스로 인스턴스화를 컨트롤하기도 하고, 클래스의 생성자를 직접 사용하거나 Service Locator 패턴 같은 방법을 사용하여 의존관계의 위치를 제어하기 때문입니다.

>
Code is cleaner with the DI principle, and decoupling is more effective when objects are provided with their dependencies. The object does not look up its dependencies and does not know the location or class of the dependencies. As a result, your classes become easier to test, particularly when the dependencies are on interfaces or abstract base classes, which allow for stub or mock implementations to be used in unit tests.

DI 원칙으로 인해 코드는 더 깨끗해지며, 객체가 자신의 의존관계를 제공하기 때문에 효과적으로 디커플링이 달성됩니다.
- 객체는 자신의 의존관계를 탐색하지도 않고, 의존관계에 있는 대상들의 위치나 클래스가 무엇인지도 알지 못합니다.
- 결과적으로 여러분의 클래스들은 더 테스트하기 쉬워집니다.
    - 특히 의존관계가 인터페이스나 추상화된 클래스에 기반을 둔 경우에는, stub이나 mock 구현을 단위 테스트에서 사용할 수 있습니다.

>
DI exists in two major variants: [Constructor-based dependency injection]() and [Setter-based dependency injection]().

DI는 주로 두 가지 방법이 있습니다. Constructor 기반의 DI와 Setter 기반의 DI.

##### Constructor-based Dependency Injection

[원문]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-constructor-injection )

>
Constructor-based DI is accomplished by the container invoking a constructor with a number of arguments, each representing a dependency. Calling a `static` factory method with specific arguments to construct the bean is nearly equivalent, and this discussion treats arguments to a constructor and to a `static` factory method similarly. The following example shows a class that can only be dependency-injected with constructor injection:

생성자 기반 DI는 컨테이너가 각각의 의존관계를 나타내는 여러 인자를 사용해 생성자를 호출하는 방식으로 수행됩니다.

- bean을 생성하기 위해 특정 인자를 사용해 `static` 팩토리 메소드를 호출하는 것과 거의 같은 방법입니다.
- 이 경우에는 생성자에 집어넣는 인자나 정적 팩토리 메소드에 집어넣는 인자나 비슷하게 처리합니다.
- 다음 예제는 생성자 주입을 통해서만 의존관계 주입이 가능한 클래스를 보여줍니다.

```java
public class SimpleMovieLister {

    // the SimpleMovieLister has a dependency on a MovieFinder
    private final MovieFinder movieFinder;

    // a constructor so that the Spring container can inject a MovieFinder
    public SimpleMovieLister(MovieFinder movieFinder) {
        this.movieFinder = movieFinder;
    }

    // business logic that actually uses the injected MovieFinder is omitted...
}
```

>
Notice that there is nothing special about this class. It is a POJO that has no dependencies on container specific interfaces, base classes, or annotations.

이 클래스는 특별한 점이 없습니다.
- 단순한 POJO 입니다.
- 컨테이너 인터페이스 스펙, 베이스 클래스, 애노테이션 등에 대한 의존이 없습니다.

###### Constructor Argument Resolution

>
Constructor argument resolution matching occurs by using the argument’s type. If no potential ambiguity exists in the constructor arguments of a bean definition, the order in which the constructor arguments are defined in a bean definition is the order in which those arguments are supplied to the appropriate constructor when the bean is being instantiated. Consider the following class:

생성자 인자 결정은 인자의 타입을 사용합니다.
- 만약 bean 정의에 있어 생성자 인자에 잠재적 모호성이 없다면, bean 정의에서의 생성자 인자들의 순서는 bean이 인스턴스화 될 때 해당 인자가 생성자에 제공되는 순서와 같습니다.
- 다음 클래스 예제를 읽어봅시다.

```java
package x.y;

public class ThingOne {

    public ThingOne(ThingTwo thingTwo, ThingThree thingThree) {
        // ...
    }
}
```

>
Assuming that the `ThingTwo` and `ThingThree` classes are not related by inheritance, no potential ambiguity exists. Thus, the following configuration works fine, and you do not need to specify the constructor argument indexes or types explicitly in the `<constructor-arg/>` element.

`ThingTwo`와 `ThingThree` 클래스가 상속이 없다고 가정하면, 잠재적 모호성도 없습니다.
- 따라서, 다음 XML 설정은 잘 작동합니다.
    - 여러분은 `<constructor-arg/>` 엘리먼트에 생성자 인자의 인덱스나 타입 등을 명시할 필요가 없습니다.

```xml
<beans>
    <bean id="beanOne" class="x.y.ThingOne">
        <constructor-arg ref="beanTwo"/>
        <constructor-arg ref="beanThree"/>
    </bean>

    <bean id="beanTwo" class="x.y.ThingTwo"/>

    <bean id="beanThree" class="x.y.ThingThree"/>
</beans>
```

>
When another bean is referenced, the type is known, and matching can occur (as was the case with the preceding example). When a simple type is used, such as `<value>true</value>`, Spring cannot determine the type of the value, and so cannot match by type without help. Consider the following class:

위의 예제의 경우를 보면 생성자 인자로 다른 bean이 참조될 때에는 타입이 알려져 있으므로, 인자 매칭이 가능합니다.

- 그러나 만약 `<value>true</value>`와 같이 단순한 타입이 사용된다면,
    - Spring은 값의 타입을 판별하지 못하여, 도움 없이는 매칭을 하지 못합니다.
- 다음 예제 클래스를 읽어 봅시다.

```java
package examples;

public class ExampleBean {

    // Number of years to calculate the Ultimate Answer
    private final int years;

    // The Answer to Life, the Universe, and Everything
    private final String ultimateAnswer;

    public ExampleBean(int years, String ultimateAnswer) {
        this.years = years;
        this.ultimateAnswer = ultimateAnswer;
    }
}
```

**Constructor argument type maching**

>
In the preceding scenario, the container can use type matching with simple types if you explicitly specify the type of the constructor argument by using the `type` attribute, as the following example shows:

위의 시나리오에서는 다음 예제와 같이 여러분이 `type` 속성을 사용해 생성자 인자의 타입을 명시해주면 컨테이너가 간단한 타입들의 타입 매칭을 할 수 있습니다.

```xml
<bean id="exampleBean" class="examples.ExampleBean">
    <constructor-arg type="int" value="7500000"/>
    <constructor-arg type="java.lang.String" value="42"/>
</bean>
```

**Constructor argument index**

>
You can use the `index` attribute to specify explicitly the index of constructor arguments, as the following example shows:

`index` 속성을 사용해서 생성자 인자의 인덱스를 명시해줄 수도 있습니다.

```xml
<bean id="exampleBean" class="examples.ExampleBean">
    <constructor-arg index="0" value="7500000"/>
    <constructor-arg index="1" value="42"/>
</bean>
```

>
In addition to resolving the ambiguity of multiple simple values, specifying an index resolves ambiguity where a constructor has two arguments of the same type.

여러 개의 단순한 타입 값이 있는 경우의 모호성을 해결하기 위한 목적 외에도,
인덱스를 명시하면 같은 타입의 인자가 두 개 있는 경우의 모호성을 해결하는 데에 사용할 수 있습니다.

> (i) The index is 0-based.


- (i) 참고: 인덱스는 0 부터 시작합니다.

**Constructor argument name**

>
You can also use the constructor parameter name for value disambiguation, as the following example shows:

값을 명확히 지정하기 위해 생성자 파라미터의 이름을 사용하는 방법도 있습니다.

```xml
<bean id="exampleBean" class="examples.ExampleBean">
    <constructor-arg name="years" value="7500000"/>
    <constructor-arg name="ultimateAnswer" value="42"/>
</bean>
```

>
Keep in mind that, to make this work out of the box, your code must be compiled with the debug flag enabled so that Spring can look up the parameter name from the constructor. If you cannot or do not want to compile your code with the debug flag, you can use the [@ConstructorProperties]( https://download.oracle.com/javase/8/docs/api/java/beans/ConstructorProperties.html ) JDK annotation to explicitly name your constructor arguments. The sample class would then have to look as follows:

이런 작업이 가능하려면, debug flag 활성화 옵션을 켜고 코드를 컴파일해야 합니다.
- 그래야 Spring이 생성자 파라미터의 이름을 찾을 수 있습니다.
- 만약 debug flag 옵션을 켤 수 없는 상황이라면, JDK 애노테이션인 `@ConstructorProperties`을 써서 생성자 인자의 이름을 명시적으로 지정할 수 있습니다.
    - 예제는 다음과 같습니다.

```java
package examples;

public class ExampleBean {

    // Fields omitted

    @ConstructorProperties({"years", "ultimateAnswer"})
    public ExampleBean(int years, String ultimateAnswer) {
        this.years = years;
        this.ultimateAnswer = ultimateAnswer;
    }
}
```

##### Setter-based Dependency Injection

[원문]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-setter-injection )

>
Setter-based DI is accomplished by the container calling setter methods on your beans after invoking a no-argument constructor or a no-argument `static` factory method to instantiate your bean.
>
The following example shows a class that can only be dependency-injected by using pure setter injection. This class is conventional Java. It is a POJO that has no dependencies on container specific interfaces, base classes, or annotations.

setter 기반의 DI는 다음과 같이 수행됩니다.
- 컨테이너가 기본 생성자를 호출하거나 `static` 팩토리 메소드를 호출해 bean을 초기화합니다.
- 컨테이너가 생성된 bean의 setter 메소드를 호출합니다.

다음 예제는 순수한 setter 주입만을 통해서만 의존관계 주입이 가능한 클래스를 보여줍니다.
- 예제의 클래스는 평범한 Java 코드입니다.
- 예제의 클래스는 컨테이너 스펙 인터페이스나, 베이스 클래스, 애노테이션 등에 의존하지 않는 POJO 입니다.

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
The `ApplicationContext` supports constructor-based and setter-based DI for the beans it manages. It also supports setter-based DI after some dependencies have already been injected through the constructor approach. You configure the dependencies in the form of a `BeanDefinition`, which you use in conjunction with `PropertyEditor` instances to convert properties from one format to another. However, most Spring users do not work with these classes directly (that is, programmatically) but rather with XML `bean` definitions, annotated components (that is, classes annotated with `@Component`, `@Controller`, and so forth), or `@Bean` methods in Java-based `@Configuration` classes. These sources are then converted internally into instances of `BeanDefinition` and used to load an entire Spring IoC container instance.

`ApplicationContext`는 관리 대상 Bean에 대해 생성자 기반 및 setter 기반 DI를 지원합니다.
- 또한 생성자 방식을 통해 일부 의존관계가 이미 주입된 후의 setter 기반 DI도 지원합니다.
- 속성을 한 포맷에서 다른 포맷으로 변환하기 위해 `PropertyEditor` 인스턴스와 `BeanDefinition` 형식의 조합으로 의존관계를 구성할 수도 있습니다.
- 그러나 대부분의 Spring 사용자는 이러한 클래스를 직접(프로그래밍) 사용하지는 않고 다음과 같은 방법들을 사용합니다.
    - XML `bean` 정의.
    - 애노테이션 컴포넌트(즉, `@Component`, `@Controller`등과 같이 애노테이션이 붙은 클래스).
    - Java 기반의 `@Configuration` 클래스 내에 작성한 `@Bean` 메소드.
    - 이러한 소스들은 내부적으로 `BeanDefinition` 인스턴스로 변환되며, 전체 Spring IoC 컨테이너 인스턴스를 로드하는데 사용됩니다.

**Constructor-based or setter-based ID?**

>
Since you can mix constructor-based and setter-based DI, it is a good rule of thumb to use constructors for mandatory dependencies and setter methods or configuration methods for optional dependencies. Note that use of the [@Required]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-required-annotation ) annotation on a setter method can be used to make the property be a required dependency; however, constructor injection with programmatic validation of arguments is preferable.
>
The Spring team generally advocates constructor injection, as it lets you implement application components as immutable objects and ensures that required dependencies are not `null`. Furthermore, constructor-injected components are always returned to the client (calling) code in a fully initialized state. As a side note, a large number of constructor arguments is a bad code smell, implying that the class likely has too many responsibilities and should be refactored to better address proper separation of concerns.
>
Setter injection should primarily only be used for optional dependencies that can be assigned reasonable default values within the class. Otherwise, not-null checks must be performed everywhere the code uses the dependency. One benefit of setter injection is that setter methods make objects of that class amenable to reconfiguration or re-injection later. Management through [JMX MBeans]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/integration.html#jmx ) is therefore a compelling use case for setter injection.
>
Use the DI style that makes the most sense for a particular class. Sometimes, when dealing with third-party classes for which you do not have the source, the choice is made for you. For example, if a third-party class does not expose any setter methods, then constructor injection may be the only available form of DI.

생성자 기반 DI와 setter 기반의 DI를 조합해서 사용할 수 있습니다.
따라서, 필수적인 의존관계에는 생성자 방식을 사용하고, 옵셔널한 의존관계에는 setter 메소드 방식을 사용하는 것은 좋은 규칙이라 할 수 있습니다.
- setter 메소드에 `@Required` 애노테이션을 사용하면 해당 속성을 필수값으로 지정할 수 있습니다.
- 그러나 프로그래밍 방식의 validation을 통한 생성자 주입 방식이 더 바람직합니다.

스프링 팀은 생성자 주입 방식을 옹호합니다.
- 생성자 주입 방식은 애플리케이션을 구성하는 객체들을 불변 객체로 만들 수 있고, 필수 의존관계들이 `null`이 되지 않도록 해줍니다.
- 또한, 생성자 주입 방식으로 생성된 컴포넌트는 초기화가 완전히 끝난 상태로 클라이언트 코드로 리턴됩니다.
- 첨부하자면 생성자 인자가 너무 많으면 코드에서 나쁜 냄새가 납니다.
    - 이런 경우에는 클래스에 너무 많은 책임이 부여되었을 가능성이 높으므로, 관심사를 적절히 분리하기 위해 리팩토링을 해야 할 수 있습니다.

setter 주입은 주로 클래스 내에서 적절한 기본값을 할당할 수 있는 옵셔널한 의존관계에만 사용해야 합니다.
- 기본값을 주지 않으면 주입된 의존관계를 사용하는 모든 곳에서 `null` 체크를 해줘야 합니다.
- setter 주입의 한 가지 장점은 필요한 경우에 setter 메서드를 통해 나중에 해당 클래스를 재구성하거나, 주입을 다시 할 수도 있다는 것입니다.
    - JMX MBeans는 setter 주입 방식의 바람직한 사용 사레라 할 수 있습니다.

클래스 특성에 적합한 DI 스타일을 사용하세요.
- 어떨 때에는 소스코드를 볼 수 없는 서드 파티 클래스를 다뤄야 할 수도 있습니다.
    - 예를 들어 서드 파티 클래스가 setter 메소드를 전혀 노출하지 않는다면, 생성자 주입이 유일한 DI 방법일 수 있습니다.

##### Dependency Resolution Process

[원문]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-dependency-resolution )

>
The container performs bean dependency resolution as follows:
>
- The `ApplicationContext` is created and initialized with configuration metadata that describes all the beans. Configuration metadata can be specified by XML, Java code, or annotations.
- For each bean, its dependencies are expressed in the form of properties, constructor arguments, or arguments to the static-factory method (if you use that instead of a normal constructor). These dependencies are provided to the bean, when the bean is actually created.
- Each property or constructor argument is an actual definition of the value to set, or a reference to another bean in the container.
- Each property or constructor argument that is a value is converted from its specified format to the actual type of that property or constructor argument. By default, Spring can convert a value supplied in string format to all built-in types, such as `int`, `long`, `String`, `boolean`, and so forth.

컨테이너는 다음과 같이 bean 의존관계 작업을 수행합니다.

- `ApplicationContext`는 configuration 메타데이터를 통해 생성되고 구성됩니다.
    - configuration 메타데이터는 모든 bean을 설명하며 XML, Java 코드, 애노테이션으로 작성할 수 있습니다.
- 각각의 bean에 대한 의존관계는 다음과 같은 형태로 표현됩니다.
    - 클래스 속성, 생성자 인자, 정적 팩토리 메소드 인자
    - 이런 의존관계들은 bean이 생성될 때 bean에 제공됩니다.
- 각각의 속성이나 생성자 인자는 설정에서 정의된 값이거나, 컨테이너에서 관리하고 있는 다른 bean의 참조값입니다.
- 레퍼런스가 아니라 값 타입인 클래스 속성이나 생성자 인자의 경우, 값은 사전에 정의된 포맷으로 변환됩니다.
    - Spring은 `String` 형식으로 제공된 값을 `int`, `long`, `String,` `boolean` 등등과 같은 빌트인 타입으로 변환할 수 있습니다.

>
The Spring container validates the configuration of each bean as the container is created. However, the bean properties themselves are not set until the bean is actually created. Beans that are singleton-scoped and set to be pre-instantiated (the default) are created when the container is created. Scopes are defined in [Bean Scopes]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-factory-scopes ). Otherwise, the bean is created only when it is requested. Creation of a bean potentially causes a graph of beans to be created, as the bean’s dependencies and its dependencies' dependencies (and so on) are created and assigned. Note that resolution mismatches among those dependencies may show up late — that is, on first creation of the affected bean.

Spring 컨테이너가 생성될 때, 각 bean의 구성을 검증하게 됩니다.
- 그러나 bean 속성 자체는 bean이 실제로 생성되기 전까지는 설정되지 않습니다.
- singleton-scope 로 설정되고, pre-instantiated 로 설정된(이 두 설정이 bean의 기본 설정입니다) bean들은 컨테이너가 생성될 때 생성됩니다.
    - scope에 대한 설명은 [Bean Scopes]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-factory-scopes ) 문서를 참고하세요.
- 그 외의 경우, bean은 bean이 요청된 경우에만 생성됩니다.
- bean의 생성은 다양한 다른 bean의 생성을 필요로 할 수 있으며, 생성해야 할 bean 들은 그래프 구조를 이루게 됩니다.
    - 의존관계의 의존관계, 의존관계의 의존관계의 의존관계 등이 생성되고 할당될 수 있기 때문입니다.
- 이러한 의존관계들 사이의 미스 매치는 뒤늦게 드러날 수도 있습니다(영향을 받는 bean의 최초 생성시).

>
**Circular dependencies**
>
If you use predominantly constructor injection, it is possible to create an unresolvable circular dependency scenario.
>
For example: Class A requires an instance of class B through constructor injection, and class B requires an instance of class A through constructor injection. If you configure beans for classes A and B to be injected into each other, the Spring IoC container detects this circular reference at runtime, and throws a `BeanCurrentlyInCreationException`.
>
One possible solution is to edit the source code of some classes to be configured by setters rather than constructors. Alternatively, avoid constructor injection and use setter injection only. In other words, although it is not recommended, you can configure circular dependencies with setter injection.
>
Unlike the typical case (with no circular dependencies), a circular dependency between bean A and bean B forces one of the beans to be injected into the other prior to being fully initialized itself (a classic chicken-and-egg scenario).

**순환 의존관계**

- 만약 여러분이 주로 생성자 주입을 사용한다면, 해결 불가능한 순환 의존관계 시나리오를 만날 수도 있습니다.
    - 예
        - 클래스 A는 생성자를 통해 클래스 B의 인스턴스를 주입받습니다.
        - 클래스 B는 생성자를 통해 클래스 A의 인스턴스를 주입받습니다.
    - 이와 같이 클래스 A, B가 서로를 주입하도록 bean을 구성한다면?
        - Spring IoC 컨테이너는 런타임에 이런 순환참조를 감지하고, `BeanCurrentlyInCreationException` 예외를 던집니다.
- 이런 경우에 대한 한 가지 해결책은 생성자 주입이 아니라 setter 주입을 사용하도록 문제가 발생한 클래스의 코드를 수정하는 것입니다.
    - 또는 생성자 주입을 아예 안 쓰고 setter 주입만 사용할 수도 있습니다.
    - 즉, setter 주입이 권장되는 방식은 아니지만, setter 주입을 쓰면 예외 없이 순환 의존관계를 설정하는 것이 가능합니다.
- 순환 의존관계가 없는 일반적인 경우와 달리, bean A와 bean B 사이의 순환 의존관계는 완전한 초기화가 끝나기 전에 bean 중 하나가 다른 bean에 주입되도록 강제해야 해결 가능합니다.
    - 계란이 먼저인지 닭이 먼저인지의 문제와 같습니다.


>
You can generally trust Spring to do the right thing. It detects configuration problems, such as references to non-existent beans and circular dependencies, at container load-time. Spring sets properties and resolves dependencies as late as possible, when the bean is actually created. This means that a Spring container that has loaded correctly can later generate an exception when you request an object if there is a problem creating that object or one of its dependencies — for example, the bean throws an exception as a result of a missing or invalid property. This potentially delayed visibility of some configuration issues is why `ApplicationContext` implementations by default pre-instantiate singleton beans. At the cost of some upfront time and memory to create these beans before they are actually needed, you discover configuration issues when the `ApplicationContext` is created, not later. You can still override this default behavior so that singleton beans initialize lazily, rather than being eagerly pre-instantiated.

여러분은 대부분의 경우에 Spring이 알아서 잘 할 거라고 신뢰할 수 있습니다.
- Spring은 컨테이너를 로드할 때 다음과 같은 구성 문제들을 찾아냅니다.
    - 존재하지 않는 Bean 참조 문제
    - 순환 의존관계
- Spring은 Bean을 실제로 생성할 때 가능한 한 늦게 속성을 설정하고 의존관계를 연결합니다.
- 이는 Spring 컨테이너가 올바르게 로드되었다면 문제 있는 객체를 요청했을 때 컨테이너가 예외를 발생시킬 것이라는 의미입니다.
    - 생성할 수 없는 객체나 의존관계를 생성하는 데에 문제가 있는 객체
    - 예를 들어, 속성이 누락되었거나 검증에 실패했다면 bean은 예외를 던집니다.
- `ApplicationContext`의 구현체가 bean의 기본값으로 pre-instantiate singleton을 사용하는 이유가 바로 이것 때문입니다.
    - 이렇게 구성 문제를 뒤늦게 보여주는 방식 때문.
- bean이 실제로 필요하기 전에 이렇게 bean을 미리 만들어 두는 데에 업프론트 타임과 메모리를 사용하는 방식으로, 여러분은 configuration 문제를 뒤늦게 알게 되는 것이 아니라 `ApplicationContext`가 생성될 때 발견할 수 있게 됩니다.
- 물론 이런 기본 동작을 오버라이드해서 singleton bean이 pre-instantiate 되지 않고 나중에 초기화되도록 바꿀 수도 있습니다.

>
If no circular dependencies exist, when one or more collaborating beans are being injected into a dependent bean, each collaborating bean is totally configured prior to being injected into the dependent bean. This means that, if bean A has a dependency on bean B, the Spring IoC container completely configures bean B prior to invoking the setter method on bean A. In other words, the bean is instantiated (if it is not a pre-instantiated singleton), its dependencies are set, and the relevant lifecycle methods (such as a [configured init method]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-factory-lifecycle-initializingbean ) or the [InitializingBean callback method]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-factory-lifecycle-initializingbean )) are invoked.

만약 순환 의존관계가 없다면 서로 협업하는 bean 들은 다른 bean에 주입되기 전에 이미 완전히 구성을 마친 상태가 됩니다.
- 가령, bean B에 의존하고 있는 bean A가 있다면, Spring IoC 컨테이너는 먼저 bean B를 완전히 만들어 놓고, bean A의 setter 메소드를 호출한다는 뜻입니다.
- 즉, (pre-instantiated singleton이 아닌)bean이 인스턴스화될 때, 해당 bean의 의존관계가 세팅되며, 라이프사이클 메소드(`configured init method` 또는 `InitializingBean callback method` 같은 것들)가 호출됩니다.

##### Examples of Dependency Injection

[원문]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-some-examples )

>
The following example uses XML-based configuration metadata for setter-based DI. A small part of a Spring XML configuration file specifies some bean definitions as follows:

다음 예제들은 XML 기반의 configuration 메타데이터를 사용하며, setter 기반의 DI를 씁니다.

```xml
<bean id="exampleBean" class="examples.ExampleBean">
    <!-- setter injection using the nested ref element -->
    <property name="beanOne">
        <ref bean="anotherExampleBean"/>
    </property>

    <!-- setter injection using the neater ref attribute -->
    <property name="beanTwo" ref="yetAnotherBean"/>
    <property name="integerProperty" value="1"/>
</bean>

<bean id="anotherExampleBean" class="examples.AnotherBean"/>
<bean id="yetAnotherBean" class="examples.YetAnotherBean"/>
```

>
The following example shows the corresponding `ExampleBean` class:

다음 예제는 위의 XML에 대응하는 `ExampleBean` 클래스를 보여줍니다.

```java
public class ExampleBean {

    private AnotherBean beanOne;

    private YetAnotherBean beanTwo;

    private int i;

    public void setBeanOne(AnotherBean beanOne) {
        this.beanOne = beanOne;
    }

    public void setBeanTwo(YetAnotherBean beanTwo) {
        this.beanTwo = beanTwo;
    }

    public void setIntegerProperty(int i) {
        this.i = i;
    }
}
```

>
In the preceding example, setters are declared to match against the properties specified in the XML file. The following example uses constructor-based DI:

위의 예제를 보면 XML에 설정된 값들에 대응하는 setter 메소드들이 선언되었음을 알 수 있습니다.

다음 예제는 생성자 기반의 DI를 보여줍니다.

```xml
<bean id="exampleBean" class="examples.ExampleBean">
    <!-- constructor injection using the nested ref element -->
    <constructor-arg>
        <ref bean="anotherExampleBean"/>
    </constructor-arg>

    <!-- constructor injection using the neater ref attribute -->
    <constructor-arg ref="yetAnotherBean"/>

    <constructor-arg type="int" value="1"/>
</bean>

<bean id="anotherExampleBean" class="examples.AnotherBean"/>
<bean id="yetAnotherBean" class="examples.YetAnotherBean"/>
```

>
The following example shows the corresponding `ExampleBean` class:

다음 예제는 위의 XML에 대응하는 `ExampleBean` 클래스를 보여줍니다.

```java
public class ExampleBean {

    private AnotherBean beanOne;

    private YetAnotherBean beanTwo;

    private int i;

    public ExampleBean(
        AnotherBean anotherBean, YetAnotherBean yetAnotherBean, int i) {
        this.beanOne = anotherBean;
        this.beanTwo = yetAnotherBean;
        this.i = i;
    }
}
```

>
The constructor arguments specified in the bean definition are used as arguments to the constructor of the `ExampleBean`.
>
Now consider a variant of this example, where, instead of using a constructor, Spring is told to call a static factory method to return an instance of the object:

XML에 정의된 bean의 생성자 인자는 `ExampleBean`의 생성자 인자로 사용됩니다.

이제 이 예제를 생성자 방식이 아니라 정적 팩토리 메소드 방식으로 변형한 예제를 봅시다.

```xml
<bean id="exampleBean" class="examples.ExampleBean" factory-method="createInstance">
    <constructor-arg ref="anotherExampleBean"/>
    <constructor-arg ref="yetAnotherBean"/>
    <constructor-arg value="1"/>
</bean>

<bean id="anotherExampleBean" class="examples.AnotherBean"/>
<bean id="yetAnotherBean" class="examples.YetAnotherBean"/>
```

>
The following example shows the corresponding `ExampleBean` class:

다음 예제는 위의 XML에 대응하는 `ExampleBean` 클래스를 보여줍니다.

```java
public class ExampleBean {

    // a private constructor
    private ExampleBean(...) {
        ...
    }

    // a static factory method; the arguments to this method can be
    // considered the dependencies of the bean that is returned,
    // regardless of how those arguments are actually used.
    public static ExampleBean createInstance (
        AnotherBean anotherBean, YetAnotherBean yetAnotherBean, int i) {

        ExampleBean eb = new ExampleBean (...);
        // some other operations...
        return eb;
    }
}
```

>
Arguments to the `static` factory method are supplied by `<constructor-arg/>` elements, exactly the same as if a constructor had actually been used. The type of the class being returned by the factory method does not have to be of the same type as the class that contains the `static` factory method (although, in this example, it is). An instance (non-static) factory method can be used in an essentially identical fashion (aside from the use of the `factory-bean` attribute instead of the `class` attribute), so we do not discuss those details here.

정적 팩토리 메소드의 인자는 생성자 방식과 똑같이 `<constructor-arg/>` 엘리먼트에 정의된 것을 사용합니다.
- 팩토리 메소드가 리턴하는 클래스의 타입은 정적 팩토리 메소드가 들어있는 클래스의 타입과 똑같지 않아도 됩니다.
    - (이 예제에서는 정적 팩토리 메소드가 리턴하는 타입과, 정적 팩토리 메소드가 정의된 클래스의 타입이 같습니다.)
- 인스턴스 (static이 아닌)팩토리 메소드도 기본적으로는 같은 방법으로 사용할 수 있습니다.
    - `class` 속성 대신 `factory-bean`을 쓴다는 점만 다릅니다.
    - 따라서 인스턴스 팩토리 메소드에 대한 예제는 생략합니다.

#### 1.4.2. Dependencies and Configuration in Detail

[원문]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-factory-properties-detailed )

>
As mentioned in the [previous section]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-factory-collaborators ), you can define bean properties and constructor arguments as references to other managed beans (collaborators) or as values defined inline. Spring’s XML-based configuration metadata supports sub-element types within its `<property/>` and `<constructor-arg/>` elements for this purpose.

앞 섹션에서 언급한 바와 같이, bean 속성과 생성자 인자를 설정할 때, 컨테이너가 관리하는 다른 bean(협업 객체)의 레퍼런스나 설정에 정의된 값을 사용할 수 있습니다.

이런 설정을 할 수 있도록 Spring의 XML 기반 configuration 메타데이터는 `<property/>`와 `<constructor-arg/>` 엘리먼트에서 하위 엘리먼트를 사용할 수 있도록 지원합니다.

##### Straight Values (Primitives, Strings, and so on)

[원문]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-value-element )

>
The `value` attribute of the `<property/>` element specifies a property or constructor argument as a human-readable string representation. Spring’s [conversion service]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#core-convert-ConversionService-API ) is used to convert these values from a `String` to the actual type of the property or argument. The following example shows various values being set:

`<property/>` 엘리먼트의 `value` 속성은 단순한 값이나 생성자 인자 같은 것들을 사람이 읽기 좋은 형태의 문자열을 사용합니다.
Spring의 conversion service는 이런 `String` 타입의 값들을 속성값이나 인자 값에 필요한 실제 타입으로 변환해 줍니다.
다음 예제를 참고해 봅시다.

```xml
<bean id="myDataSource" class="org.apache.commons.dbcp.BasicDataSource" destroy-method="close">
    <!-- results in a setDriverClassName(String) call -->
    <property name="driverClassName" value="com.mysql.jdbc.Driver"/>
    <property name="url" value="jdbc:mysql://localhost:3306/mydb"/>
    <property name="username" value="root"/>
    <property name="password" value="misterkaoli"/>
</bean>
```

>
The following example uses the [p-namespace]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-p-namespace ) for even more succinct XML configuration:

다음 예제는 XML 파일을 간결하게 구성하기 위해 p-namespace를 사용합니다.

```xml
<beans xmlns="http://www.springframework.org/schema/beans"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xmlns:p="http://www.springframework.org/schema/p"
    xsi:schemaLocation="http://www.springframework.org/schema/beans
    https://www.springframework.org/schema/beans/spring-beans.xsd">

    <bean id="myDataSource" class="org.apache.commons.dbcp.BasicDataSource"
        destroy-method="close"
        p:driverClassName="com.mysql.jdbc.Driver"
        p:url="jdbc:mysql://localhost:3306/mydb"
        p:username="root"
        p:password="misterkaoli"/>

</beans>
```

>
The preceding XML is more succinct. However, typos are discovered at runtime rather than design time, unless you use an IDE (such as [IntelliJ IDEA]( https://www.jetbrains.com/idea/ ) or the [Spring Tools for Eclipse]( https://spring.io/tools )) that supports automatic property completion when you create bean definitions. Such IDE assistance is highly recommended.
>
You can also configure a `java.util.Properties` instance, as follows:

앞의 XML은 좀 더 간결합니다.
bean 정의를 만들 때 자동 완성을 지원하는 IDE (IntelliJ IDEA 또는 Spring Tools for Eclipse)를 쓴다면 값을 타이핑할 떄 오타를 발견할 수 있으므로, IDE 사용을 적극 권장합니다.

다음과 같이 `java.util.Properties` 인스턴스를 구성하는 방법도 있습니다.

```xml
<bean id="mappings"
    class="org.springframework.context.support.PropertySourcesPlaceholderConfigurer">

    <!-- typed as a java.util.Properties -->
    <property name="properties">
        <value>
            jdbc.driver.className=com.mysql.jdbc.Driver
            jdbc.url=jdbc:mysql://localhost:3306/mydb
        </value>
    </property>
</bean>
```

>
The Spring container converts the text inside the `<value/>` element into a `java.util.Properties` instance by using the JavaBeans `PropertyEditor` mechanism. This is a nice shortcut, and is one of a few places where the Spring team do favor the use of the nested `<value/>` element over the `value` attribute style.

Spring 컨테이너는 JavaBeans `PropertyEditor` 메커니즘을 사용하여 `<value/>` 내부의 텍스트를 `java.util.Properties` 인스턴스로 변환합니다.
이 방법은 멋진 지름길이며 Spring 팀이 `value` 속성 스타일보다 중첩된 `<value/>` 요소를 사용하는 것을 선호하는 몇 안되는 곳 중 하나입니다.


###### The idref element

[원문]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-idref-element )

>
The `idref` element is simply an error-proof way to pass the `id` (a string value - not a reference) of another bean in the container to a `<constructor-arg/>` or `<property/>` element. The following example shows how to use it:

`idref` 엘리먼트는 컨테이너에 있는 다른 빈의 `id`(문자열 값이며, 참조가 아님)를 `<constructor-arg/>` 또는 `<property/>` 엘리먼트에 전달하는 오류 방지 방법입니다.
다음 예제는 사용 방법을 보여줍니다.

```xml
<bean id="theTargetBean" class="..."/>

<bean id="theClientBean" class="...">
    <property name="targetName">
        <idref bean="theTargetBean"/>
    </property>
</bean>
```

>
The preceding bean definition snippet is exactly equivalent (at runtime) to the following snippet:

앞의 bean 정의 스니펫은 다음 스니펫과 정확히 똑같이 평가됩니다.(런타임 기준)

```xml
<bean id="theTargetBean" class="..." />

<bean id="client" class="...">
    <property name="targetName" value="theTargetBean"/>
</bean>
```

>
The first form is preferable to the second, because using the `idref` tag lets the container validate at deployment time that the referenced, named bean actually exists. In the second variation, no validation is performed on the value that is passed to the `targetName` property of the `client` bean. Typos are only discovered (with most likely fatal results) when the `client` bean is actually instantiated. If the `client` bean is a [prototype]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-factory-scopes ) bean, this typo and the resulting exception may only be discovered long after the container is deployed.

첫 번째 방법이 두 번째 방법보다 선호됩니다.
- `idref` 태그를 사용하면 배포시에 컨테이너가 각 bean들(이름을 붙이고, 참조한 bean들)이 실제로 존재하는지 확인할 수 있기 때문입니다.
- 두 번째 방법에서는 id가 `client`인 Bean의 `targetName` 값에 대한 유효성 검증이 수행되지 않습니다.
- 값을 잘못 작성했거나 오타가 있다면
    - `client` bean이 실제로 인스턴스화 될 때만 발견됩니다(꽤나 치명적일 것입니다).
    - 만약 `client` bean이 prototype bean이라면 오타나 예외는 컨테이너가 배포되고 나서 한참 지난 후에 발견될 수도 있습니다.

>
(i) The `local` attribute on the `idref` element is no longer supported in the 4.0 beans XSD, since it does not provide value over a regular `bean` reference any more. Change your existing `idref local` references to `idref bean` when upgrading to the 4.0 schema.

- (i) 참고
    - `idref` 엘리먼트의 `local` 속성은 더 이상 4.0 beans XSD 에서 지원되지 않습니다.
    - 일반적인 Bean 참조값을 제공하지 않기 때문입니다.
    - 만약 4.0 스키마로 업그레이드하려 한다면 기존의 `idref local` 참조를 `idref Bean`으로 변경하세요.

>
A common place (at least in versions earlier than Spring 2.0) where the `<idref/>` element brings value is in the configuration of [AOP interceptors]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#aop-pfb-1 ) in a `ProxyFactoryBean` bean definition. Using `<idref/>` elements when you specify the interceptor names prevents you from misspelling an interceptor ID.

(적어도 Spring 2.0 이전 버전에서) `<idref/>` 엘리먼트가 값을 가져 오는 일반적인 장소는 `ProxyFactoryBean` bean 정의 내에 있는 AOP 인터셉터의 configuration에 있습니다.
- 인터셉터 이름을 지정할 때 `<idref/>` 엘리먼트를 사용하면 인터셉터 ID를 잘못 입력하는 실수를 방지할 수 있습니다.

##### References to Other Beans (Collaborators)

[원문]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-ref-element )

##### Inner Beans

[원문]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-inner-beans )

##### Collections

[원문]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-collection-elements )

##### Null and Empty String Values

[원문]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-null-element )

##### XML Shortcut with the p-namespace

[원문]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-p-namespace )

##### XML Shortcut with the c-namespace

[원문]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-c-namespace )

##### Compound Property Names

[원문]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-compound-property-names )


#### 1.4.3. Using depends-on

[원문]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-factory-dependson )

## 함께 읽기

- [[inversion-of-control]]

## 참고문헌

- [Core Technologies (docs.spring.io)][5-3-7-core] - 5.3.7 버전

[5-3-7-core]: https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html
