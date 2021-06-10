---
layout  : wiki
title   : 작성중 - (요약) Spring Core Technologies
summary : Version 5.3.7
date    : 2021-06-06 15:56:22 +0900
updated : 2021-06-10 23:26:04 +0900
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

## 함께 읽기

- [[inversion-of-control]]

## 참고문헌

- [Core Technologies (docs.spring.io)][5-3-7-core] - 5.3.7 버전

[5-3-7-core]: https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html
