---
layout  : wiki
title   : Spring Core Technologies - 1.12. Java-based Container Configuration
summary : 
date    : 2021-07-11 13:42:50 +0900
updated : 2021-07-12 17:25:39 +0900
tag     : java spring
toc     : true
public  : true
parent  : [[/spring/document/core]]
latex   : false
---
* TOC
{:toc}

- 목록으로 - [[/spring/document/core]]{Spring Core Technologies}
- 이전 문서 - [[/spring/document/core/01-11-using-jsr-330-standard-annotations]]{1.11. Using JSR 330 Standard Annotations}
- 다음 문서 - {1.13. Environment Abstraction}

## 1.12. Java-based Container Configuration

[원문]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-java )

>
This section covers how to use annotations in your Java code to configure the Spring container. It includes the following topics:

이 섹션에서는 Java 코드에서 애노테이션을 사용해 Spring 컨테이너를 configure하는 방법을 다룹니다. 다음 주제를 다루게 됩니다.

>
- [Basic Concepts: @Bean and @Configuration]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-java-basic-concepts )
- [Instantiating the Spring Container by Using AnnotationConfigApplicationContext]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-java-instantiating-container )
- [Using the @Bean Annotation]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-java-bean-annotation )
- [Using the @Configuration annotation]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-java-configuration-annotation )
- [Composing Java-based Configurations]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-java-composing-configuration-classes )
- [Bean Definition Profiles]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-definition-profiles )
- [PropertySource Abstraction]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-property-source-abstraction )
- [Using @PropertySource]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-using-propertysource )
- [Placeholder Resolution in Statements]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-placeholder-resolution-in-statements )

### 1.12.1. Basic Concepts: @Bean and @Configuration

[원문]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-java-basic-concepts )

>
The central artifacts in Spring’s new Java-configuration support are `@Configuration`-annotated classes and `@Bean`-annotated methods.

Spring의 새로운 Java configuration support의 핵심 아티팩트는 `@Configuration` 애노테이션을 붙인 클래스와 `@Bean` 애노테이션을 붙인 메소드입니다.

>
The `@Bean` annotation is used to indicate that a method instantiates, configures, and initializes a new object to be managed by the Spring IoC container. For those familiar with Spring’s `<beans/>` XML configuration, the `@Bean` annotation plays the same role as the `<bean/>` element. You can use `@Bean`-annotated methods with any Spring `@Component`. However, they are most often used with `@Configuration` beans.

`@Bean` 애노테이션은 Spring IoC 컨테이너가 관리할 새로운 객체를 인스턴스화하고, configure하고, 초기화한다는 것을 나타내는 데 사용됩니다.
Spring의 XML 설정에서 `<beans/>`에 익숙한 사람이라면, `@Bean`이 `<bean/>`과 같은 역할을 한다고 생각하면 됩니다.
`@Bean` 애노테이션을 붙인 메소드는 Spring `@Component`와 함께 사용할 수 있지만, 대체로 `@Configuration` bean과 사용하는 경우가 많습니다.

>
Annotating a class with `@Configuration` indicates that its primary purpose is as a source of bean definitions. Furthermore, `@Configuration` classes let inter-bean dependencies be defined by calling other `@Bean` methods in the same class. The simplest possible `@Configuration` class reads as follows:

클래스에 `@Configuration` 애노테이션을 붙이는 것은 해당 클래스의 목적이 bean definition 소스라는 것을 나타내는 것입니다.
그리고 `@Configuration` 클래스는 같은 클래스 안에 있는 `@Bean` 메소드들끼리 서로를 호출하여 bean들 사이의 dependency를 정의할 수 있게 합니다.
다음은 간단한 `@Configuration` 클래스의 예제입니다.


```java
@Configuration
public class AppConfig {

    @Bean
    public MyService myService() {
        return new MyServiceImpl();
    }
}
```

>
The preceding `AppConfig` class is equivalent to the following Spring `<beans/>` XML:

위의 `AppConfig` 클래스는 다음 Spring XML의 `<beans/>`와 똑같습니다.

```xml
<beans>
    <bean id="myService" class="com.acme.services.MyServiceImpl"/>
</beans>
```

>
**Full @Configuration vs “lite” @Bean mode?**
>
When `@Bean` methods are declared within classes that are not annotated with `@Configuration`, they are referred to as being processed in a “lite” mode. Bean methods declared in a `@Component` or even in a plain old class are considered to be “lite”, with a different primary purpose of the containing class and a `@Bean` method being a sort of bonus there. For example, service components may expose management views to the container through an additional `@Bean` method on each applicable component class. In such scenarios, `@Bean` methods are a general-purpose factory method mechanism.
>
Unlike full `@Configuration`, lite `@Bean` methods cannot declare inter-bean dependencies. Instead, they operate on their containing component’s internal state and, optionally, on arguments that they may declare. Such a `@Bean` method should therefore not invoke other `@Bean` methods. Each such method is literally only a factory method for a particular bean reference, without any special runtime semantics. The positive side-effect here is that no CGLIB subclassing has to be applied at runtime, so there are no limitations in terms of class design (that is, the containing class may be `final` and so forth).
>
In common scenarios, `@Bean` methods are to be declared within `@Configuration` classes, ensuring that “full” mode is always used and that cross-method references therefore get redirected to the container’s lifecycle management. This prevents the same `@Bean` method from accidentally being invoked through a regular Java call, which helps to reduce subtle bugs that can be hard to track down when operating in “lite” mode.
{:style="background-color: #ecf1e8;"}

- **Full @Configuration vs “lite” @Bean mode?**
    - `@Configuration` 애노테이션이 붙지 않은 클래스에서 `@Bean` 메소드를 선언하면, 그런 메소드들은 "lite" 모드로 처리가 됩니다.
        - `@Component`나 순수한 클래스 안에서 선언된 bean 메소드는 "lite"로 간주됩니다.
            - 일종의 보너스에 해당하는 목적이 있기 때문입니다.
        - 예를 들어, 서비스 컴포넌트는 컨테이너에 대한 관리적인 관점에서 적용 가능한 각 컴포넌트 클래스에 대해 추가적인 `@Bean` 메소드를 사용할 수 있습니다.
        - 이런 시나리오에서 `@Bean` 메소드는 범용적인 팩토리 메소드 메커니즘이 됩니다.
    - full `@Configuration`과 달리 lite `@Bean` 메소드는 bean과 bean 사이의 dependencies를 선언할 수 없습니다.
        - 그 대신, lite `@Bean` 메소드를 포함하는 컴포넌트의 내부 상태와, 옵셔널하게 선언할 수 있는 인자에 따라 작동하게 됩니다.
        - 따라서 이런 종류의 (lite) `@Bean` 메소드는 다른 `@Bean` 메소드를 호출하지 않아야 합니다.
        - 이런 메소드들은 특별한 런타임상의 의미가 없고, 말 그대로 특정 bean 참조에 대한 팩토리 메소드일 뿐입니다.
        - lite `@Bean`의 긍정적인 사이드 이펙트는 클래스 디자인 측면에서 제안이 별로 없다는 것입니다.
            - (예를 들어 포함하는 클래스가 `final`이어도 가능합니다)
            - 런타임에 CGLIB 서브클래싱을 적용할 필요가 없기 때문입니다.
    - 일반적인 시나리오에서 `@Bean` 메소드는 `@Configuration` 클래스 내에서 선언되어 항상 "full" 모드가 적용됩니다.
        - 따라서 교차 메소드 참조(cross-method references)가 있다면 컨테이너의 생명주기 관리로 리다이렉션됩니다.
        - 이러한 구조 때문에 평범한 Java 호출을 통해 똑같은 `@Bean` 메소드가 우발적으로 호출되는 것이 방지되어 미묘한 버그를 줄이는 데에 도움이 됩니다.
            - (lite 모드에서는 이것이 방지되지 않기 때문)

>
The `@Bean` and `@Configuration` annotations are discussed in depth in the following sections. First, however, we cover the various ways of creating a spring container using by Java-based configuration.

`@Bean`과 `@Configuration` 애노테이션은 다음 섹션에서 자세히 설명합니다.
일단은 Java 기반 configuration을 사용하여 Spring 컨테이너를 생성하는 다양한 방법을 알아봅시다.

### 1.12.2. Instantiating the Spring Container by Using `AnnotationConfigApplicationContext`

[원문]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-java-instantiating-container )

>
The following sections document Spring’s `AnnotationConfigApplicationContext`, introduced in Spring 3.0. This versatile `ApplicationContext` implementation is capable of accepting not only `@Configuration` classes as input but also plain `@Component` classes and classes annotated with JSR-330 metadata.
>
When `@Configuration` classes are provided as input, the `@Configuration` class itself is registered as a bean definition and all declared `@Bean` methods within the class are also registered as bean definitions.
>
When `@Component` and JSR-330 classes are provided, they are registered as bean definitions, and it is assumed that DI metadata such as `@Autowired` or `@Inject` are used within those classes where necessary.

다음 섹션부터는 Spring 3.0에 도입된 Spring `AnnotationConfigApplicationContext`를 다룹니다.
`AnnotationConfigApplicationContext`는 `ApplicationContext`의 구현체이며, `@Configuration` 클래스 뿐만 아니라 일반적인 `@Component` 클래스와 JSR-330 메타데이터 애노테이션이 붙은 클래스도 입력받을 수 있습니다.

`@Configuration` 클래스가 입력으로 제공되면 `@Configuration` 클래스 자체가 bean definition으로 등록되고, 해당 클래스 내에 선언된 모든 `@Bean` 메소드도 bean definition으로 등록됩니다.

`@Component`와 JSR-330 클래스들이 제공되면, 얘네들도 bean definition으로 등록되고, 필요에 따라 해당 클래스 내에 있는 `@Autowired`와 `@Inject` 등의 DI 메타데이터를 사용하게 됩니다.


#### Simple Construction

[원문]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-java-instantiating-container-constructor )

>
In much the same way that Spring XML files are used as input when instantiating a `ClassPathXmlApplicationContext`, you can use `@Configuration` classes as input when instantiating an `AnnotationConfigApplicationContext`. This allows for completely XML-free usage of the Spring container, as the following example shows:

`ClassPathXmlApplicationContext`를 인스턴스화할 때 Spring XML 파일을 입력받는 것처럼, `AnnotationConfigApplicationContext`를 인스턴스화할 때에는 `@Configuration` 클래스를 입력으로 사용하게 됩니다.
이를 통해 다음 예제와 같이 XML 없이 Spring 컨테이너를 사용할 수 있게 됩니다.

```java
public static void main(String[] args) {
    ApplicationContext ctx = new AnnotationConfigApplicationContext(AppConfig.class);
    MyService myService = ctx.getBean(MyService.class);
    myService.doStuff();
}
```

>
As mentioned earlier, `AnnotationConfigApplicationContext` is not limited to working only with `@Configuration` classes. Any `@Component` or JSR-330 annotated class may be supplied as input to the constructor, as the following example shows:

위에서 언급한 바와 같이, `AnnotationConfigApplicationContext`는 `@Configuration`만 사용하게끔 제한되어 있지는 않습니다.
다음 예제와 같이 `@Component` 또는 JSR-330 애노테이션 클래스를 `AnnotationConfigApplicationContext`의 생성자에 입력할 수 있습니다.

```java
public static void main(String[] args) {
    ApplicationContext ctx = new AnnotationConfigApplicationContext(MyServiceImpl.class, Dependency1.class, Dependency2.class);
    MyService myService = ctx.getBean(MyService.class);
    myService.doStuff();
}
```

>
The preceding example assumes that `MyServiceImpl`, `Dependency1`, and `Dependency2` use Spring dependency injection annotations such as `@Autowired`.

위의 예제에서는 `MyServiceImpl`, `Dependency1`, `Dependency2`가 `@Autowired`와 같은 Spring dependency injection 애노테이션을 사용한다고 전제한 것입니다.

#### Building the Container Programmatically by Using `register(Class<?>…)`

[원문]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-java-instantiating-container-register )

>
You can instantiate an `AnnotationConfigApplicationContext` by using a no-arg constructor and then configure it by using the `register()` method. This approach is particularly useful when programmatically building an `AnnotationConfigApplicationContext`. The following example shows how to do so:

인자 없는 생성자를 사용하여 `AnnotationConfigApplicationContext`를 인스턴스화한 다음에 `register()` 메소드를 사용해 configure하는 것도 가능합니다.
이런 접근 방법은 `AnnotationConfigApplicationContext`를 프로그래밍 방식으로 빌드할 때 유용합니다.
다음 예제를 봅시다.

```java
public static void main(String[] args) {
    AnnotationConfigApplicationContext ctx = new AnnotationConfigApplicationContext();
    ctx.register(AppConfig.class, OtherConfig.class);
    ctx.register(AdditionalConfig.class);
    ctx.refresh();
    MyService myService = ctx.getBean(MyService.class);
    myService.doStuff();
}
```

#### Enabling Component Scanning with `scan(String…)`

[원문]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-java-instantiating-container-scan )

>
To enable component scanning, you can annotate your `@Configuration` class as follows:

컴포넌트 스캔을 활성화하려면, `@Configuration` 클래스에 다음과 같이 애노테이션을 달아줄 수 있습니다.

```java
@Configuration
@ComponentScan(basePackages = "com.acme")  // (1)
public class AppConfig  {
    ...
}
```

>
(1) This annotation enables component scanning.

(1) 이 애노테이션이 컴포넌트 스캔을 가능하게 합니다.

>
Experienced Spring users may be familiar with the XML declaration equivalent from Spring’s context: namespace, shown in the following example:
{:style="background-color: #e9f1f6;"}

- 경험이 풍부한 Spring 사용자는 다음과 같은 XML 선언에 익숙할 수 있습니다.

```xml
<beans>
    <context:component-scan base-package="com.acme"/>
</beans>
```

>
In the preceding example, the `com.acme` package is scanned to look for any `@Component`-annotated classes, and those classes are registered as Spring bean definitions within the container. `AnnotationConfigApplicationContext` exposes the `scan(String…)` method to allow for the same component-scanning functionality, as the following example shows:

위의 예제에서 `com.acme` 패키지는 `@Component` 애노테이션이 달린 클래스를 찾기 위해 스캔되며, 해당 클래스는 컨테이너에 Spring bean definition으로 등록됩니다.
`AnnotationConfigApplicationContext`에는 이와 똑같은 컴포넌트 스캔 기능을 사용할 수 있도록 `scan(String...)` 메소드가 제공됩니다.

```java
public static void main(String[] args) {
    AnnotationConfigApplicationContext ctx = new AnnotationConfigApplicationContext();
    ctx.scan("com.acme");
    ctx.refresh();
    MyService myService = ctx.getBean(MyService.class);
}
```

> (i)
Remember that `@Configuration` classes are [meta-annotated]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-meta-annotations ) with `@Component`, so they are candidates for component-scanning. In the preceding example, assuming that `AppConfig` is declared within the `com.acme` package (or any package underneath), it is picked up during the call to `scan()`. Upon `refresh()`, all its `@Bean` methods are processed and registered as bean definitions within the container.

- (i)
    - `@Configuration` 클래스에는 메타 애노테이션으로 `@Component`가 붙어 있습니다. 즉, `@Configuration`도 컴포넌트 스캔의 대상이라는 것을 기억해 두세요.
        - 위의 예제에서 `AppConfig`가 `com.acme` 패키지(또는 그 하위 패키지) 내부에서 선언되었다고 가정하면, `scan()` 호출 중에 `AppConfig`도 선택이 됩니다.
    - `refresh()`가 호출될 때에는 모든 `@Bean` 메소드가 처리되고, 컨테이너 내에 bean definition으로 등록됩니다.

#### Support for Web Applications with `AnnotationConfigWebApplicationContext`

[원문]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-java-instantiating-container-web )

>
A `WebApplicationContext` variant of `AnnotationConfigApplicationContext` is available with `AnnotationConfigWebApplicationContext`. You can use this implementation when configuring the Spring `ContextLoaderListener` servlet listener, Spring MVC `DispatcherServlet`, and so forth. The following `web.xml` snippet configures a typical Spring MVC web application (note the use of the `contextClass` context-param and init-param):

`AnnotationConfigApplicationContext`의 `WebApplicationContext` 변형은 `AnnotationConfigWebApplicationContext`와 함께 사용할 수 있습니다.
Spring `ContextLoaderListener` servlet listener, Spring MVC `DispatcherServlet` 등을 configuring할 때 이 구현을 사용할 수 있습니다.

다음 `web.xml` 스니펫은 일반적인 Spring MVC 웹 애플리케이션을 configure 합니다.(`contextClass` context-param과 init-param을 참고하세요)

```xml
<web-app>
    <!-- Configure ContextLoaderListener to use AnnotationConfigWebApplicationContext
        instead of the default XmlWebApplicationContext -->
    <context-param>
        <param-name>contextClass</param-name>
        <param-value>
            org.springframework.web.context.support.AnnotationConfigWebApplicationContext
        </param-value>
    </context-param>

    <!-- Configuration locations must consist of one or more comma- or space-delimited
        fully-qualified @Configuration classes. Fully-qualified packages may also be
        specified for component-scanning -->
    <context-param>
        <param-name>contextConfigLocation</param-name>
        <param-value>com.acme.AppConfig</param-value>
    </context-param>

    <!-- Bootstrap the root application context as usual using ContextLoaderListener -->
    <listener>
        <listener-class>org.springframework.web.context.ContextLoaderListener</listener-class>
    </listener>

    <!-- Declare a Spring MVC DispatcherServlet as usual -->
    <servlet>
        <servlet-name>dispatcher</servlet-name>
        <servlet-class>org.springframework.web.servlet.DispatcherServlet</servlet-class>
        <!-- Configure DispatcherServlet to use AnnotationConfigWebApplicationContext
            instead of the default XmlWebApplicationContext -->
        <init-param>
            <param-name>contextClass</param-name>
            <param-value>
                org.springframework.web.context.support.AnnotationConfigWebApplicationContext
            </param-value>
        </init-param>
        <!-- Again, config locations must consist of one or more comma- or space-delimited
            and fully-qualified @Configuration classes -->
        <init-param>
            <param-name>contextConfigLocation</param-name>
            <param-value>com.acme.web.MvcConfig</param-value>
        </init-param>
    </servlet>

    <!-- map all requests for /app/* to the dispatcher servlet -->
    <servlet-mapping>
        <servlet-name>dispatcher</servlet-name>
        <url-pattern>/app/*</url-pattern>
    </servlet-mapping>
</web-app>
```

### 1.12.3. Using the `@Bean` Annotation

[원문]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-java-bean-annotation )

>
`@Bean` is a method-level annotation and a direct analog of the XML `<bean/>` element. The annotation supports some of the attributes offered by `<bean/>`, such as: * [init-method]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-factory-lifecycle-initializingbean ) * [destroy-method]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-factory-lifecycle-disposablebean ) * [autowiring]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-factory-autowire ) * `name`.
>
You can use the `@Bean` annotation in a `@Configuration`-annotated or in a `@Component`-annotated class.

`@Bean`은 메소드 레벨 애노테이션이며, XML의 `<bean/>` 엘리먼트의 직접적으로 대응됩니다.
이 애노테이션은 `<bean/>`이 제공하는 다음과 같은 이름을 가진 속성을 지원합니다.

- init-method, destroy-method, autowiring

`@Bean` 애노테이션은 `@Configuration`이나 `@Component` 애노테이션이 붙은 클래스에서 사용할 수 있습니다.

#### Declaring a Bean

[원문]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-java-declaring-a-bean )

>
To declare a bean, you can annotate a method with the `@Bean` annotation. You use this method to register a bean definition within an `ApplicationContext` of the type specified as the method’s return value. By default, the bean name is the same as the method name. The following example shows a `@Bean` method declaration:

bean을 선언하기 위해 `@Bean` 애노테이션을 메소드에 붙일 수 있습니다.
이 메소드의 리턴값으로 지정된 타입이 `ApplicationContext`에 bean definition으로 등록됩니다.
기본적으로 bean 이름은 메소드 이름과 동일합니다.
다음 예제는 `@Bean` 메소드 선언을 보여줍니다.

```java
@Configuration
public class AppConfig {

    @Bean
    public TransferServiceImpl transferService() {
        return new TransferServiceImpl();
    }
}
```

>
The preceding configuration is exactly equivalent to the following Spring XML:

위의 configuration은 다음의 Spring XML과 완전히 똑같습니다.

```xml
<beans>
    <bean id="transferService" class="com.acme.TransferServiceImpl"/>
</beans>
```

>
Both declarations make a bean named `transferService` available in the `ApplicationContext`, bound to an object instance of type `TransferServiceImpl`, as the following text image shows:

두 선언 모두 `ApplicationContext`에서 사용할 수 있는 `transferService`라는 이름의 bean을 만듭니다. 이 bean의 객체 인스턴스 타입은 다음과 같이 `TransferServiceImpl`입니다.

```
transferService -> com.acme.TransferServiceImpl
```

>
You can also declare your `@Bean` method with an interface (or base class) return type, as the following example shows:

다음 예제와 같이 인터페이스(또는 base class) 리턴 타입을 사용해 `@Bean` 메소드를 선언할 수도 있습니다.

```java
@Configuration
public class AppConfig {

    @Bean
    public TransferService transferService() {
        return new TransferServiceImpl();
    }
}
```

>
However, this limits the visibility for advance type prediction to the specified interface type (`TransferService`). Then, with the full type (`TransferServiceImpl`) known to the container only once, the affected singleton bean has been instantiated. Non-lazy singleton beans get instantiated according to their declaration order, so you may see different type matching results depending on when another component tries to match by a non-declared type (such as `@Autowired TransferServiceImpl`, which resolves only once the `transferService` bean has been instantiated).

그러나 이 방법은 고급 타입 추론의 범위를 지정된 인터페이스 타입(`TransferService`)으로 제한합니다.
그러고나서, 컨테이너에 한 번만 알려진 full 타입(`TransferServiceImpl`)의 영향을 받은 싱글톤 bean이 인스턴스화됩니다.
non-lazy 싱글톤 bean은 선언 순서에 따라 인스턴스화되므로, 다른 컴포넌트가 선언되지 않은 타입(`@Autowired TransferServiceImpl`처럼 `transferService` bean이 인스턴스화되면 resolve되는 것들)과 매칭되려고 하는 시기에 따라 다른 타입 매칭 결과를 볼 수도 있습니다.

>
If you consistently refer to your types by a declared service interface, your `@Bean` return types may safely join that design decision. However, for components that implement several interfaces or for components potentially referred to by their implementation type, it is safer to declare the most specific return type possible (at least as specific as required by the injection points that refer to your bean).
{:style="background-color: #e9f1f6;"}

- 선언된 서비스 인터페이스에서 일관성있게 타입을 참조하는 경우, `@Bean`의 리턴 타입이 설계 결정에 안전하게 사용될 수 있습니다.
- 그러나 여러 개의 인터페이스를 구현하는 컴포넌트나 구현 타입에 잠재적으로 참조되는 컴포넌트의 경우, 가능한 한 가장 구체적인 리턴 타입을 선언하는 것이 더 안전합니다.
    - (적어도 bean을 참조하는 주입 지점에서 요구하는 정도로 구체적일 필요가 있습니다.)

#### Bean Dependencies

[원문]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-java-dependencies )

## 함께 읽기

- 목록으로 - [[/spring/document/core]]{Spring Core Technologies}
- 이전 문서 - [[/spring/document/core/01-11-using-jsr-330-standard-annotations]]{1.11. Using JSR 330 Standard Annotations}
- 다음 문서 - {1.13. Environment Abstraction}

