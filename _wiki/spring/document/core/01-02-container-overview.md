---
layout  : wiki
title   : Spring Core Technologies - 1.2. Container Overview
summary : 
date    : 2021-06-14 22:52:27 +0900
updated : 2021-07-10 20:42:56 +0900
tag     : java spring
resource: 85/33345D-E8EF-4CD5-8C07-46FAEBD00C95
toc     : true
public  : true
parent  : [[/spring/document/core]]
latex   : false
---
* TOC
{:toc}

- 목록으로 - [[/spring/document/core]]{Spring Core Technologies}
- 이전 문서 - [[/spring/document/core/01-01-introduction]]{1.1. Introduction to the Spring IoC Container and Beans}
- 다음 문서 - [[/spring/document/core/01-03-bean-overview]]{1.3. Bean Overview}

## 1.2. Container Overview

**1.2. 컨테이너 개요** [원문]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-basics )

>
The `org.springframework.context.ApplicationContext` interface represents the Spring IoC container and is responsible for instantiating, configuring, and assembling the beans. The container gets its instructions on what objects to instantiate, configure, and assemble by reading configuration metadata. The configuration metadata is represented in XML, Java annotations, or Java code. It lets you express the objects that compose your application and the rich interdependencies between those objects.

- `org.springframework.context.ApplicationContext` 인터페이스는
    - 스프링 IoC 컨테이너를 표현한다.
    - bean의 인스턴스화, configuring, 조립을 담당한다.

- configuration meta data
    - 애플리케이션을 구성하는 객체와 객체 간의 의존관계를 설정할 수 있다.
    - XML, Java 애노테이션, Java 코드로 작성할 수 있다.
    - 컨테이너는 configuration 메타 데이터를 읽은 다음, 객체를 인스턴스화하고, 설정하고, 조립한다.

>
Several implementations of the `ApplicationContext` interface are supplied with Spring. In stand-alone applications, it is common to create an instance of [ClassPathXmlApplicationContext][classpath-xml-ac] or [FileSystemXmlApplicationContext][filesystem-xml-ac]. While XML has been the traditional format for defining configuration metadata, you can instruct the container to use Java annotations or code as the metadata format by providing a small amount of XML configuration to declaratively enable support for these additional metadata formats.

[classpath-xml-ac]: https://docs.spring.io/spring-framework/docs/5.3.7/javadoc-api/org/springframework/context/support/ClassPathXmlApplicationContext.html
[filesystem-xml-ac]: https://docs.spring.io/spring-framework/docs/5.3.7/javadoc-api/org/springframework/context/support/FileSystemXmlApplicationContext.html

Spring은 `ApplicationContext` 인터페이스의 여러 가지 구현체를 제공한다.

- 독립 실행형 애플리케이션에서는 일반적으로 `ClassPathXmlApplicationContext`나 `FileSystemXmlApplicationContext`를 쓴다.
- configuration 메타 데이터는 XML로 작성하는 것이 Spring 초기부터 기본이었다.
    - 하지만 Java 애노테이션이나 Java 코드를 사용해 작성하는 것도 가능하다.

>
In most application scenarios, explicit user code is not required to instantiate one or more instances of a Spring IoC container. For example, in a web application scenario, a simple eight (or so) lines of boilerplate web descriptor XML in the `web.xml` file of the application typically suffices (see [Convenient ApplicationContext Instantiation for Web Applications][context-create]). If you use the [Spring Tools for Eclipse][spring-tools-eclipse] (an Eclipse-powered development environment), you can easily create this boilerplate configuration with a few mouse clicks or keystrokes.

[context-create]: https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#context-create
[spring-tools-eclipse]: https://spring.io/tools

어지간한 애플리케이션을 개발할 때에는 스프링 IoC 컨테이너를 인스턴스화하기 위해 사용자가 코딩을 해서 일부러 설정할 필요가 없다.

- 예를 들어,
    - 웹 애플리케이션 시나리오에서는 `web.xml` 파일에 있는 8 줄 정도의 보일러플레이트 web descriptor XML이면 충분하다.
    - Eclipse Spring Tools에서는 마우스 몇 번 클릭하거나 키보드 좀 만지작거리면 보일러플레이트 configuration을 쉽게 만들 수 있다.

>
The following diagram shows a high-level view of how Spring works. Your application classes are combined with configuration metadata so that, after the `ApplicationContext` is created and initialized, you have a fully configured and executable system or application.

다음 다이어그램은 Spring이 어떻게 작동하는지를 추상적으로 표현한 것이다.
- 여러분의 애플리케이션 클래스들은 configuration 메타 데이터에 정의된 대로 조합된다.
- `ApplicationContext`가 생성되고 초기화 되면, 여러분은 설정이 완전히 반영되어 있는 실행 가능한 애플리케이션을 갖게 된다.

![image]( /resource/wiki/spring/document/core/01-02-container-overview/120928640-6dcd8b00-c720-11eb-932c-2398df0faa48.png )

### 1.2.1. Configuration Metadata

[원문]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-factory-metadata )

>
As the preceding diagram shows, the Spring IoC container consumes a form of configuration metadata. This configuration metadata represents how you, as an application developer, tell the Spring container to instantiate, configure, and assemble the objects in your application.
>
Configuration metadata is traditionally supplied in a simple and intuitive XML format, which is what most of this chapter uses to convey key concepts and features of the Spring IoC container.

configuration 메타 데이터

- 앞의 다이어그램에서 볼 수 있듯이 Spring IoC 컨테이너는 configuration 메타 데이터를 사용한다.
- 애플리케이션 개발자(여러분)는 configuration 메타 데이터를 통해 Spring 컨테이너가 객체를 어떻게 인스턴스화하고, 설정하고, 조립하는지를 알려줄 수 있다.
- configuration 메타 데이터는 XML 형식으로 제공되어 왔다.

>
(i) XML-based metadata is not the only allowed form of configuration metadata. The Spring IoC container itself is totally decoupled from the format in which this configuration metadata is actually written. These days, many developers choose [Java-based configuration]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-java ) for their Spring applications.

- (i) 참고
    - configuration 메타 데이터는 XML로만 작성할 수 있는 것은 아니다.
    - Spring IoC 컨테이너는 이 configuration 메타 데이터 포맷과는 분리되어 있어서, 다양한 포맷을 쓸 수 있다.
    - 요즘은 XML보다는 Java 코드 기반의 configuration을 많이 사용한다.

>
For information about using other forms of metadata with the Spring container, see:
>
- [Annotation-based configuration]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-annotation-config ): Spring 2.5 introduced support for annotation-based configuration metadata.
- [Java-based configuration]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-java ): Starting with Spring 3.0, many features provided by the Spring JavaConfig project became part of the core Spring Framework. Thus, you can define beans external to your application classes by using Java rather than XML files. To use these new features, see the [@Configuration]( https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/context/annotation/Configuration.html ), [@Bean]( https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/context/annotation/Bean.html ), [@Import]( https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/context/annotation/Import.html ), and [@DependsOn]( https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/context/annotation/DependsOn.html ) annotations.

Spring 컨테이너에서 다른 형식의 메타 데이터를 사용하는 방법에 대한 내용은 다음을 참고할 것.

- 애노테이션 기반의 configuration: Spring 2.5 부터는 애노테이션 기반의 configuration 메타데이터를 지원한다.
- Java 코드 기반의 configuration: Spring 3.0 부터는 Spring JavaConfig 프로젝트에서 제공하는 다양한 기능이 Spring Framework에 추가되었다.
    - 따라서 XML이 아니라 Java 코드로 애플리케이션 클래스와 별도로 Bean을 정의할 수 있다.
    - `@Configuration`, `@Bean`, `@Import`, `@DependsOn` 애노테이션을 참고할 것.

>
Spring configuration consists of at least one and typically more than one bean definition that the container must manage. XML-based configuration metadata configures these beans as <bean/> elements inside a top-level <beans/> element. Java configuration typically uses @Bean-annotated methods within a @Configuration class.

Spring configuration은 컨테이너가 관리할 bean 정의 여러 개로 이루어진다.
- XML 기반의 configuration 메타 데이터에서는,
    - 최상위에 `<beans/>` 엘리먼트가 있고, 이 엘리먼트 안쪽에 여러 개의 `<bean/>` 엘리먼트를 작성하는 방식이다.
- Java 기반의 configuration 에서는,
    - `@Configuration`를 붙인 클래스 내에서 `@Bean` 애노테이션을 붙인 메소드를 사용한다.

>
These bean definitions correspond to the actual objects that make up your application. Typically, you define service layer objects, data access objects (DAOs), presentation objects such as Struts `Action` instances, infrastructure objects such as Hibernate `SessionFactories`, JMS `Queues`, and so forth. Typically, one does not configure fine-grained domain objects in the container, because it is usually the responsibility of DAOs and business logic to create and load domain objects. However, you can use Spring’s integration with AspectJ to configure objects that have been created outside the control of an IoC container. See [Using AspectJ to dependency-inject domain objects with Spring]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#aop-atconfigurable ).

이러한 빈 정의는 여러분의 애플리케이션을 구성하는 실제 객체들에 해당된다.

- 예를 들어 다음과 같은 객체들을 정의하는 경우가 많다.
    - service 계층 객체
    - 데이터 액세스 객체(DAO)
    - Struts의 `Action` 인스턴스와 같은 프리젠테이션 객체
    - Hibernate의 `SessionFactories`
    - JMS `Queues` 등등과 같은 인프라 객체

- 컨테이너가 세분화된(fine-grained) 도메인 객체를 만들게 하는 일은 흔하지 않은 편이다.
    - 도메인 객체를 만들고 로드하는 것은 DAO 및 비즈니스 로직의 책임이기 때문.
    - Spring의 AspectJ 통합을 사용하면 IoC 컨테이너의 컨트롤 바깥에서 생성된 객체를 구성할 수도 있음.
        - 자세한 내용은 [AspectJ를 사용하여 Spring에서 도메인 객체를 종속성 주입하기]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#aop-atconfigurable )를 참고.

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

이 예제는 XML 기반의 configuration 메타데이터의 기본적인 구조를 보여 준다.

1. `id`는 bean 정의를 식별하는 문자열이다.
2. `class`는 bean의 타입을 정의하는데, 패키지 경로를 최대한 풀어쓴 클래스 이름을 사용한다.

자세한 내용은 [DEpendencies]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-dependencies ) 문서를 참고할 것.

### 1.2.2. Instantiating a Container

[원문]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-factory-instantiation )

>
The location path or paths supplied to an `ApplicationContext` constructor are resource strings that let the container load configuration metadata from a variety of external resources, such as the local file system, the Java `CLASSPATH`, and so on.

- 다음 코드를 보면 `ApplicationContext` 생성자에 XML 파일 경로 문자열을 넣고 있다.
    - 컨테이너는 다양한 포맷의 리소스를 통해 configuration 메타 데이터를 로드할 수 있다.
    - 로컬 파일시스템이나, Java `CLASSPATH` 등등.

```java
ApplicationContext context = new ClassPathXmlApplicationContext("services.xml", "daos.xml");
```

>
(i) After you learn about Spring’s IoC container, you may want to know more about Spring’s `Resource` abstraction (as described in [Resources]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#resources )), which provides a convenient mechanism for reading an InputStream from locations defined in a URI syntax. In particular, `Resource` paths are used to construct applications contexts, as described in [Application Contexts and Resource Paths]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#resources-app-ctx ).

- (i) 참고
    - 여러분이 Spring의 IoC 컨테이너에 대해 학습한 후에는 추상화된 `Resource`에 대해 학습하고 싶게 될 것이다.
    - `Resource`는 Spring의 리소스 추상화이며 URI 형식의 경로가 주어지면 InputStream으로 변환해 읽을 수 있게 해 주는 편리한 기능을 제공한다.
    - 특히, `Resource` 경로는 "Application Contexts and Resource Paths" 문서에 설명된 바와 같이 application context를 생성하는 데에 사용된다.

>
The following example shows the service layer objects (services.xml) configuration file:

다음 예는 서비스 레이어 객체 `(services.xml)` configuration 파일을 보여준다.

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

다음 예는 데이터 액세스 객체에 대한 `daos.xml` 파일을 보여준다.

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

위의 예에서 서비스 계층은 `PetStoreServiceImpl` 클래스와 `JpaAccountDao` 및 `JpaItemDao` 타입의 두 DAO로 이루어진다(JPA ORM 표준 기반).
- `property name` 엘리먼트는 JavaBean 속성의 이름을 참조하고,
- `ref` 엘리먼트는 다른 bean 정의의 이름을 참조한다.
- `id`와 `ref` 엘리먼트의 이러한 연결은 협업하는 객체들 간의 의존관계를 표현한다.
- 객체들 간의 의존관계 configuration에 대한 자세한 내용은 Dependencies 문서를 참고할 것.

#### Composing XML-based Configuration Metadata

**XML 기반의 configuration 메타데이터 작성하기** [원문]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-factory-xml-import )

>
It can be useful to have bean definitions span multiple XML files. Often, each individual XML configuration file represents a logical layer or module in your architecture.
>
You can use the application context constructor to load bean definitions from all these XML fragments. This constructor takes multiple `Resource` locations, as was shown in the [previous section]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-factory-instantiation ). Alternatively, use one or more occurrences of the `<import/>` element to load bean definitions from another file or files. The following example shows how to do so:

여러 개의 XML 파일을 사용해 bean을 정의하면 레이어별로, 모듈별로 XML 설정 파일을 나눌 때 유용하다.

- 애플리케이션 컨텍스트 생성자를 사용하면 여러 개의 XML 파일을 읽어 Bean 정의를 로드할 수 있다.
- 아니면, `<import/>` 엘리먼트를 사용해 다른 파일에서 Bean 정의를 로드하는 방법도 있다.

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

위의 예제를 보면 `services.xml`, `messageSource.xml` `themeSource.xml` 이렇게 3개의 파일에서 bean 정의가 로드된다는 것을 알 수 있다.

- 모든 경로는 import 파일을 가져오는 파일에 대한 상대 경로를 사용한다.
    - 따라서 `services.xml`는 import 하는 xml 파일과 같은 디렉토리나 클래스 경로에 있어야 한다.
    - `messageSource.xml`, `themeSource.xml`은 위의 xml 파일 경로의 `resource`에 있어야 한다.
- `resources`와 `/resources`를 통해 알 수 있듯, 앞에 있는 슬래시(`/`)는 무시.
    - 그런데 상대 경로를 사용하고 있으므로 가급적이면 슬래시를 사용하지 않는 것이 더 좋다.
- 한편 xml 파일의 최상위 `<beans/>` 엘리먼트에서 import하고 있는 파일의 내용은 반드시 Spring Schema 정의를 따르는 XML 빈 정의를 갖고 있어야 한다.

>
(i) It is possible, but not recommended, to reference files in parent directories using a relative "../" path. Doing so creates a dependency on a file that is outside the current application. In particular, this reference is not recommended for `classpath:` URLs (for example, `classpath:../services.xml`), where the runtime resolution process chooses the “nearest” classpath root and then looks into its parent directory. Classpath configuration changes may lead to the choice of a different, incorrect directory.
>
You can always use fully qualified resource locations instead of relative paths: for example, `file:C:/config/services.xml` or `classpath:/config/services.xml`. However, be aware that you are coupling your application’s configuration to specific absolute locations. It is generally preferable to keep an indirection for such absolute locations — for example, through "${…}" placeholders that are resolved against JVM system properties at runtime.

- (i) 참고
    - 상대 경로인 "../"를 사용해서 상위 디렉토리의 파일을 참조하는 것은 가능하긴 하지만 권장하지는 않는다.
    - 이런 식으로 경로를 사용하하면 현재 애플리케이션 바깥에 있는 파일에 대한 의존성이 생기기 때문.
    - 특히, 이 참조는 `classpath:` URL(예: `classpath: ../ services.xml`)을 쓸 때에는 별로 좋지 않다.
        - 런타임 확인 프로세스는 먼저 "가장 가까운" 클래스패스 루트를 선택하고, 상위 디렉토리를 찾기 때문.
        - 이런 클래스패스 configuration 변경 때문에 의도하지 않은 잘못된 디렉토리가 선택될 수 있다.
    - 상대 경로를 사용하는 대신 정규화된 경로를 사용할 수 있다.
        - 예: `file:C:/config/services.xml`, `classpath:/config/services.xml`
    - 그러나 애플리케이션의 configuration과 특정한 절대 경로 사이에 커플링이 생기지 않도록 주의할 것.
        - 일반적으로는 이런 절대 경로는 직접적으로 사용하지 않고 간접적으로 사용하는 것이 좋다.
            - 예를 들어 "$ {…}"를 써서 런타임에 JVM 시스템 속성에 값을 집어넣는 방법이라던가..

>
The namespace itself provides the import directive feature. Further configuration features beyond plain bean definitions are available in a selection of XML namespaces provided by Spring — for example, the context and util namespaces.

네임스페이스는 자체적으로 import 기능을 제공한다.
- 단순한 bean 정의를 넘어서는 추가적인 설정은 Spring에서 제공하는 XML 네임스페이스에서 사용할 수 있다.
- 예: context, util namespaces.

#### The Groovy Bean Definition DSL

[원문]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#groovy-bean-definition-dsl )

>
As a further example for externalized configuration metadata, bean definitions can also be expressed in Spring’s Groovy Bean Definition DSL, as known from the Grails framework. Typically, such configuration live in a ".groovy" file with the structure shown in the following example:

외부에 정의된 configuration 메타데이터에 대한 또다른 예제를 살펴 보자.

- bean 정의는 Grails 프레임워크라는 이름으로 알려진 Spring의 Groovy Bean Definition DSL로도 표현이 가능하다.
- 다음은 일반적으로 이러한 configuration 구조를 ".groovy" 파일로 작성한 예이다.

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

- 이러한 configuration 스타일은 XML 방식의 bean 정의와 거의 동일하며,
    - Spring의 XML 설정 네임스페이스도 지원한다.
- 또한 `importBeans` 지시문을 사용해 XML bean 정의 파일을 가져올 수도 있다.

### 1.2.3. Using the Container

**1.2.3. 컨테이너 사용하기** [원문]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-factory-client )

>
The `ApplicationContext` is the interface for an advanced factory capable of maintaining a registry of different beans and their dependencies. By using the method `T getBean(String name, Class<T> requiredType)`, you can retrieve instances of your beans.
>
The `ApplicationContext` lets you read bean definitions and access them, as the following example shows:

`interface ApplicationContext`는 다른 bean과 그 의존관계들의 레지스트리를 유지할 수 있는 고급 팩토리(advanced factory)를 위한 인터페이스이다.
`T getBean (String name, Class <T> requiredType)` 메소드를 호출하면 Bean 인스턴스를 리턴받을 수 있다.

`ApplicationContext`를 사용하면 다음 예제와 같이 bean 정의를 읽고 액세스할 수 있다.

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

Groovy configuration을 사용한 부트스트랩도 이와 매우 비슷하다.
Groovy를 인식하는 컨텍스트 구현 클래스도 있다(XML bean 정의도 호환).

다음 예는 Groovy configuration을 보여준다.

```java
ApplicationContext context = new GenericGroovyApplicationContext("services.groovy", "daos.groovy");
```

>
The most flexible variant is GenericApplicationContext in combination with reader delegates — for example, with XmlBeanDefinitionReader for XML files, as the following example shows:

가장 유연한 방법은 `GenericApplicationContext`를 읽기 대리자(예: XML 파일용 `XmlBeanDefinitionReader`)와 함께 쓰는 것이다.

```java
GenericApplicationContext context = new GenericApplicationContext();
new XmlBeanDefinitionReader(context).loadBeanDefinitions("services.xml", "daos.xml");
context.refresh();
```

>
You can also use the GroovyBeanDefinitionReader for Groovy files, as the following example shows:

다음 예제와 같이 Groovy 파일용 `GroovyBeanDefinitionReader`를 사용할 수도 있다.

```java
GenericApplicationContext context = new GenericApplicationContext();
new GroovyBeanDefinitionReader(context).loadBeanDefinitions("services.groovy", "daos.groovy");
context.refresh();
```

>
You can mix and match such reader delegates on the same `ApplicationContext`, reading bean definitions from diverse configuration sources.

이러한 읽기 대리자를 `ApplicationContext`와 조합하여, 다양한 configuration 소스에서 bean 정의를 읽을 수 있다.

>
You can then use `getBean` to retrieve instances of your beans. The `ApplicationContext` interface has a few other methods for retrieving beans, but, ideally, your application code should never use them. Indeed, your application code should have no calls to the `getBean()` method at all and thus have no dependency on Spring APIs at all. For example, Spring’s integration with web frameworks provides dependency injection for various web framework components such as controllers and JSF-managed beans, letting you declare a dependency on a specific bean through metadata (such as an autowiring annotation).

그런 다음에는 `getBean`을 사용하여 Bean 인스턴스를 가져올 수 있다.
그런데 `ApplicationContext` 인터페이스에는 Bean을 가져오는 메소드가 몇 가지 있긴 하지만, 이상적으로는 애플리케이션 코드에서 이런 메소드를 사용하지 않는 것이 좋다.

- 실제로 여러분의 애플리케이션 코드에는 `getBean()` 메소드 호출이 전혀 없어야 한다.
    - 즉 Spring API에 전혀 의존하지 않아야 한다.
    - 예를 들어 Spring의 웹 프레임워크 통합은,
        - controller 및 JSF 관리 bean 같은 웹 프레임워크를 구성하는 component에 대한 dependency 주입을 제공하며, 여러분은 이를 이용해 메타 데이터(예: autowiring 애노테이션)를 통해 특정 bean에 대한 의존관계를 선언할 수 있다.

## 함께 읽기

- 목록으로 - [[/spring/document/core]]{Spring Core Technologies}
- 이전 문서 - [[/spring/document/core/01-01-introduction]]{1.1. Introduction to the Spring IoC Container and Beans}
- 다음 문서 - [[/spring/document/core/01-03-bean-overview]]{1.3. Bean Overview}
- [[inversion-of-control]]

## 참고문헌

- [Core Technologies (docs.spring.io)][5-3-7-core] - 5.3.7 버전

[5-3-7-core]: https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html
