---
layout  : wiki
title   : Spring Core Technologies - 1.12. Java-based Container Configuration
summary : 
date    : 2021-07-11 13:42:50 +0900
updated : 2022-03-05 14:43:05 +0900
tag     : java spring
resource: D8/623EF2-C450-44D0-A060-4C7CBAAADC0A
toc     : true
public  : true
parent  : [[/spring/document/core]]
latex   : false
---
* TOC
{:toc}

- 목록으로 - [[/spring/document/core]]{Spring Core Technologies}
- 이전 문서 - [[/spring/document/core/01-11-using-jsr-330-standard-annotations]]{1.11. Using JSR 330 Standard Annotations}
- 다음 문서 - [[/spring/document/core/01-13-env-abstraction]]{1.13. Environment Abstraction}

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

**Full @Configuration vs “lite” @Bean mode?**

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

>
A `@Bean`-annotated method can have an arbitrary number of parameters that describe the dependencies required to build that bean. For instance, if our `TransferService` requires an `AccountRepository`, we can materialize that dependency with a method parameter, as the following example shows:

`@Bean` 애노테이션이 붙은 메소드는 해당 bean을 빌드하는 데에 필요한 dependencies를 명시하기 위한 파라미터를 여러 개 가질 수 있습니다.
예를 들어 `TransferService`가 `AccountRepository`를 필요로 한다면, 다음 예제와 같이 메소드 파라미터를 사용해 dependency를 구체화할 수 있습니다.

```java
@Configuration
public class AppConfig {

    @Bean
    public TransferService transferService(AccountRepository accountRepository) {
        return new TransferServiceImpl(accountRepository);
    }
}
```

>
The resolution mechanism is pretty much identical to constructor-based dependency injection. See [the relevant section]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-constructor-injection ) for more details.

결정 메커니즘은 생성자 기반 dependency injection과 거의 같습니다.
자세한 내용은 관련 섹션을 참고하세요.

#### Receiving Lifecycle Callbacks

[원문]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-java-lifecycle-callbacks )

>
Any classes defined with the `@Bean` annotation support the regular lifecycle callbacks and can use the `@PostConstruct` and `@PreDestroy` annotations from JSR-250. See [JSR-250 annotations]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-postconstruct-and-predestroy-annotations ) for further details.

`@Bean` 애노테이션을 통해 정의된 모든 클래스는 일반적인 생명주기 콜백을 지원하고, JSR-250의 `@PostConstruct`와 `@PreDestroy` 애노테이션을 사용할 수 있습니다.
자세한 내용은 [JSR-250 annotations]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-postconstruct-and-predestroy-annotations ) 문서를 참고하세요.

>
The regular Spring [lifecycle]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-factory-nature ) callbacks are fully supported as well. If a bean implements `InitializingBean`, `DisposableBean`, or `Lifecycle`, their respective methods are called by the container.

일반적인 Spring의 [생명주기]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-factory-nature ) 콜백도 완벽하게 지원됩니다.
만약 bean 이 `InitializingBean`, `DisposableBean`, `Lifecycle`의 구현체라면 생명주기와 관련된 메소드는 컨테이너에서 호출합니다.

>
The standard set of `*Aware` interfaces (such as [BeanFactoryAware]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-beanfactory ), [BeanNameAware]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-factory-aware ), [MessageSourceAware]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#context-functionality-messagesource ), [ApplicationContextAware]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-factory-aware ), and so on) are also fully supported.

`*Aware` 인터페이스의 표준 세트([BeanFactoryAware]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-beanfactory ), [BeanNameAware]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-factory-aware ), [MessageSourceAware]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#context-functionality-messagesource ), [ApplicationContextAware]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-factory-aware ) 등등)도 완전히 지원됩니다.

>
The `@Bean` annotation supports specifying arbitrary initialization and destruction callback methods, much like Spring XML’s `init-method` and `destroy-method` attributes on the `bean` element, as the following example shows:

`@Bean` 애노테이션은 Spring XML의 `bean` 엘리먼트 속성인 `init-method`, 그리고 `destroy-method`와 마찬가지로 초기화 및 파괴 용도의 콜백 메소드를 지정할 수 있습니다.

```java
public class BeanOne {

    public void init() {
        // initialization logic
    }
}

public class BeanTwo {

    public void cleanup() {
        // destruction logic
    }
}

@Configuration
public class AppConfig {

    @Bean(initMethod = "init")
    public BeanOne beanOne() {
        return new BeanOne();
    }

    @Bean(destroyMethod = "cleanup")
    public BeanTwo beanTwo() {
        return new BeanTwo();
    }
}
```

> (i)
By default, beans defined with Java configuration that have a public `close` or `shutdown` method are automatically enlisted with a destruction callback. If you have a public `close` or `shutdown` method and you do not wish for it to be called when the container shuts down, you can add `@Bean(destroyMethod="")` to your bean definition to disable the default `(inferred)` mode.
>
You may want to do that by default for a resource that you acquire with JNDI, as its lifecycle is managed outside the application. In particular, make sure to always do it for a `DataSource`, as it is known to be problematic on Java EE application servers.
>
The following example shows how to prevent an automatic destruction callback for a `DataSource`:
{:style="background-color: #ecf1e8;"}

- (i)
    - 기본적으로 `close`이나 `shutdown`이라는 이름을 가진 public 메소드를 갖고 있는 Java configuration으로 정의된 bean은 자동으로 destruction 콜백에 참여하게 됩니다.
        - 만약 public `close`이나 `shutdown` 메소드가 있지만, 컨테이너가 종료(shuts down)될 때 호출하기를 원하지 않는다면 `@Bean(destroyMethod="")`와 같이 추가해서 기본 `(inferred)` 모드를 disable할 수 있습니다.
    - JNDI를 통해 얻은 리소스의 생명주기가 애플리케이션 외부에서 관리되기 때문에, 이런 설정을 기본값으로 설정하고 싶다면 그렇게 할 수 있습니다.
        - 특히 Java EE 애플리케이션 서버에서 `DataSource`에 대해 문제가 있는 것으로 알려져 있으므로 항상 설정해 주도록 합니다.
    - 다음 예제는 `DataSource`에 대해 자동으로 destruction 콜백을 호출하는 것을 막는 방법을 보여줍니다.

```java
@Bean(destroyMethod="")
public DataSource dataSource() throws NamingException {
    return (DataSource) jndiTemplate.lookup("MyDS");
}
```

>
Also, with `@Bean` methods, you typically use programmatic JNDI lookups, either by using Spring’s `JndiTemplate` or `JndiLocatorDelegate` helpers or straight JNDI `InitialContext` usage but not the `JndiObjectFactoryBean` variant (which would force you to declare the return type as the `FactoryBean` type instead of the actual target type, making it harder to use for cross-reference calls in other `@Bean` methods that intend to refer to the provided resource here).
{:style="background-color: #ecf1e8;"}

- (i) (이어서)
    - 또한 `@Bean` 메소드를 사용할 때에는 일반적으로 프로그래밍 방식의 JNDI 룩업을 사용하게 됩니다.
        - Spring의 `JndiTemplate` 또는 `JndiLocatorDelegate` helpers를 사용하거나 `JndiObjectFactoryBean`의 변형체를 사용하지 않고 JNDI `InitialContext`를 사용하여 프로그래밍 방식의 JNDI 조회를 사용합니다.
    - 이는 리턴 타입을 실제 대상의 타입 대신 `FactoryBean` 타입으로 선언하도록 하여, 여기에 제공된 리소스를 참조하려는 다른 `@Bean` 메소드에서 상호 참조 호출(cross-reference calls)에 사용하기 어렵게 만듭니다.

>
In the case of `BeanOne` from the example above the preceding note, it would be equally valid to call the `init()` method directly during construction, as the following example shows:

위의 예제에서 `BeanOne`의 경우 다음 예제와 같이 생성 중에 `init()` 메소드를 호출하는 것도 똑같이 유효한 방법입니다.

```java
@Configuration
public class AppConfig {

    @Bean
    public BeanOne beanOne() {
        BeanOne beanOne = new BeanOne();
        beanOne.init();
        return beanOne;
    }

    // ...
}
```

>
When you work directly in Java, you can do anything you like with your objects and do not always need to rely on the container lifecycle.
{:style="background-color: #e9f1f6;"}

- Java로 직접 작업할 때, 여러분의 객체만으로 여러분이 원하는 모든 작업을 수행할 수 있습니다. 항상 컨테이너의 생명주기에 의존하지 않아도 됩니다.

#### Specifying Bean Scope

[원문]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-java-specifying-bean-scope )

>
Spring includes the `@Scope` annotation so that you can specify the scope of a bean.

Spring은 `@Scope` 애노테이션을 포함하고 있어, bean의 스코프를 지정할 수 있습니다.

##### Using the `@Scope` Annotation

[원문]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-java-available-scopes )

>
You can specify that your beans defined with the `@Bean` annotation should have a specific scope. You can use any of the standard scopes specified in the [Bean Scopes]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-factory-scopes ) section.

`@Bean` 애노테이션으로 정의된 bean이 특정 스코프를 갖도록 지정할 수 있습니다.
[Bean Scopes]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-factory-scopes ) 섹션에서 명시한 표준 스코프를 사용하면 됩니다.

>
The default scope is `singleton`, but you can override this with the `@Scope` annotation, as the following example shows:

기본 스코프는 `singleton` 입니다. 그러나 다음 예제와 같이 `@Scope` 애노테이션을 사용해 이를 오버라이드할 수 있습니다.

```java
@Configuration
public class MyConfiguration {

    @Bean
    @Scope("prototype")
    public Encryptor encryptor() {
        // ...
    }
}
```

##### `@Scope` and `scoped-proxy`

[원문]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-java-scoped-proxy )

>
Spring offers a convenient way of working with scoped dependencies through [scoped proxies]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-factory-scopes-other-injection ). The easiest way to create such a proxy when using the XML configuration is the `<aop:scoped-proxy/>` element. Configuring your beans in Java with a `@Scope` annotation offers equivalent support with the `proxyMode` attribute. The default is `ScopedProxyMode.DEFAULT`, which typically indicates that no scoped proxy should be created unless a different default has been configured at the component-scan instruction level. You can specify `ScopedProxyMode.TARGET_CLASS`, `ScopedProxyMode.INTERFACES` or `ScopedProxyMode.NO`.

Spring은 스코프가 지정된 프록시를 통해 scoped dependency로 작업하는 편리한 방법을 제공합니다.
XML configuration을 사용한다면 이런 프록시를 만드는 가장 쉬운 방법은 `<aop:scoped-proxy/>` 엘리먼트를 쓰는 것입니다.
`@Scope` 애노테이션을 써서 Java bean을 구성하면, XML 에서 `proxyMode` 속성을 사용한 것과 똑같이 지원됩니다.

기본값은 `ScopedProxyMode.DEFAULT`이며, 이 기본값은 일반적으로 컴포넌트 스캔 레벨에서 다른 기본값이 configured되지 않은 경우에는 스코프 프록시를 생성하지 않아야 한다는 것을 보여줍니다.
지정할 수 있는 값은 `ScopedProxyMode.TARGET_CLASS`, `ScopedProxyMode.INTERFACES` or `ScopedProxyMode.NO` 입니다.

>
If you port the scoped proxy example from the XML reference documentation (see [scoped proxies]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-factory-scopes-other-injection )) to our `@Bean` using Java, it resembles the following:

XML 레퍼런스 문서([scoped proxies]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-factory-scopes-other-injection )를 읽어보세요)에 나오는 스코프 프록시 에제를 `@Bean`을 사용한 Java 코드로 보여준다면 다음과 같을 것입니다.

```java
// an HTTP Session-scoped bean exposed as a proxy
@Bean
@SessionScope
public UserPreferences userPreferences() {
    return new UserPreferences();
}

@Bean
public Service userService() {
    UserService service = new SimpleUserService();
    // a reference to the proxied userPreferences bean
    service.setUserPreferences(userPreferences());
    return service;
}
```

#### Customizing Bean Naming

[원문]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-java-customizing-bean-naming )

>
By default, configuration classes use a `@Bean` method’s name as the name of the resulting bean. This functionality can be overridden, however, with the `name` attribute, as the following example shows:

기본적으로 configuration 클래스는 `@Bean` 메소드의 이름을 bean의 이름으로 사용합니다.
그러나 다음 예제와 같이 `name` 속성을 사용하면 이 기능을 오버라이드할 수 있습니다.

```java
@Configuration
public class AppConfig {

    @Bean(name = "myThing")
    public Thing thing() {
        return new Thing();
    }
}
```

#### Bean Aliasing

[원문]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-java-bean-aliasing )

>
As discussed in [Naming Beans]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-beanname ), it is sometimes desirable to give a single bean multiple names, otherwise known as bean aliasing. The `name` attribute of the `@Bean` annotation accepts a String array for this purpose. The following example shows how to set a number of aliases for a bean:

[Naming Beans]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-beanname )에서 살펴본 바와 같이, 때때로 하나의 bean에 여러 개의 이름을 붙여주는 것이 바람직하기도 합니다.
이 기능은 bean aliasing이라 부릅니다.
`@Bean` 애노테이션의 `name` 속성은 이런 경우를 위해 String 배열을 받기도 합니다.
다음 예제는 하나의 bean에 여러 알리아스를 지정하는 방법을 보여줍니다.

```java
@Configuration
public class AppConfig {

    @Bean({"dataSource", "subsystemA-dataSource", "subsystemB-dataSource"})
    public DataSource dataSource() {
        // instantiate, configure and return DataSource bean...
    }
}
```

#### Bean Description

[원문]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-java-bean-description )

>
Sometimes, it is helpful to provide a more detailed textual description of a bean. This can be particularly useful when beans are exposed (perhaps through JMX) for monitoring purposes.

때로는 bean에 자세한 텍스트 설명을 남겨두는 것이 도움이 되기도 합니다.
이렇게 하면 모니터링 목적으로 bean이 노출되었을 때(아마도 JMX를 통해서) 유용할 수 있습니다.

>
To add a description to a `@Bean`, you can use the [@Description]( https://docs.spring.io/spring-framework/docs/5.3.7/javadoc-api/org/springframework/context/annotation/Description.html ) annotation, as the following example shows:

`@Bean`에 설명을 남기려면 `@Description` 애노테이션을 사용하면 됩니다.

```java
@Configuration
public class AppConfig {

    @Bean
    @Description("Provides a basic example of a bean")
    public Thing thing() {
        return new Thing();
    }
}
```

### 1.12.4. Using the `@Configuration` annotation

[원문]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-java-configuration-annotation )

>
`@Configuration` is a class-level annotation indicating that an object is a source of bean definitions. `@Configuration` classes declare beans through `@Bean` annotated methods. Calls to `@Bean` methods on `@Configuration` classes can also be used to define inter-bean dependencies. See [Basic Concepts: @Bean and @Configuration]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-java-basic-concepts ) for a general introduction.

`@Configuration`은 해당 객체가 bean definition 소스라는 것을 보여주기 위해 붙여주는 클래스 레벨 애노테이션입니다.
`@Configuration` 클래스는 `@Bean` 애노테이션을 붙인 메소드를 통해 bean을 선언합니다.
`@Configuration` 클래스에서 `@Bean` 메소드를 호출하여 bean과 bean 사이의 dependencies를 정의할 수 있습니다.
이에 대해서는 [Basic Concepts: @Bean and @Configuration]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-java-basic-concepts ) 문서를 참고하세요.

#### Injecting Inter-bean Dependencies

[원문]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-java-injecting-dependencies )

>
When beans have dependencies on one another, expressing that dependency is as simple as having one bean method call another, as the following example shows:

bean들이 서로 서로 dependency를 갖고 있다는 것은 다음과 같이 bean 메소드가 다른 bean 메소드를 호출하는 코드로 간단하게 표현할 수 있습니다.

```java
@Configuration
public class AppConfig {

    @Bean
    public BeanOne beanOne() {
        return new BeanOne(beanTwo());
    }

    @Bean
    public BeanTwo beanTwo() {
        return new BeanTwo();
    }
}
```

>
In the preceding example, `beanOne` receives a reference to `beanTwo` through constructor injection.

위의 예제에서 `beanOne`은 생성자 주입을 통해 `beanTwo`에 대한 참조를 넘겨받습니다.

> (i)
This method of declaring inter-bean dependencies works only when the `@Bean` method is declared within a `@Configuration` class. You cannot declare inter-bean dependencies by using plain `@Component` classes.
{:style="background-color: #ecf1e8;"}

- (i)
    - bean과 bean 사이의 dependencies를 선언하는 이런 메소드는 `@Configuration` 클래스 내에 `@Bean` 메소드가 선언된 경우에만 동작합니다.
    - 평범한 `@Component` 클래스로는 bean 과 bean 사이의 dependencies를 선언할 수 없습니다.

#### Lookup Method Injection

[원문]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-java-method-injection )

>
As noted earlier, [lookup method injection]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-factory-method-injection ) is an advanced feature that you should use rarely. It is useful in cases where a singleton-scoped bean has a dependency on a prototype-scoped bean. Using Java for this type of configuration provides a natural means for implementing this pattern. The following example shows how to use lookup method injection:

앞에서 언급한 바와 같이 [lookup method injection]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-factory-method-injection )은 거의 사용되지 않는 고급 기능입니다.
이 기능은 싱글톤 스코프의 bean이 프로토타입 스코프의 bean에 의존하는 경우에 유용합니다.
Java로 작업을 하면 이런 종류의 configuration이 필요할 때 자연스럽게 작업할 수 있습니다.
다음 예제는 lookup method injection을 사용하는 방법을 보여줍니다.

```java
public abstract class CommandManager {
    public Object process(Object commandState) {
        // grab a new instance of the appropriate Command interface
        Command command = createCommand();
        // set the state on the (hopefully brand new) Command instance
        command.setState(commandState);
        return command.execute();
    }

    // okay... but where is the implementation of this method?
    protected abstract Command createCommand();
}
```

>
By using Java configuration, you can create a subclass of `CommandManager` where the abstract `createCommand()` method is overridden in such a way that it looks up a new (prototype) command object. The following example shows how to do so:

Java configuration을 사용하면 추상 메소드인 `createCommand()`를 오버라이드한 메소드를 갖는 `CommandManager`의 서브클래스를 만들 수 있습니다.
다음 예제를 봅시다.

```java
@Bean
@Scope("prototype")
public AsyncCommand asyncCommand() {
    AsyncCommand command = new AsyncCommand();
    // inject dependencies here as required
    return command;
}

@Bean
public CommandManager commandManager() {
    // return new anonymous implementation of CommandManager with createCommand()
    // overridden to return a new prototype Command object
    return new CommandManager() {
        protected Command createCommand() {
            return asyncCommand();
        }
    }
}
```

#### Further Information About How Java-based Configuration Works Internally

**Java 기반의 configuration이 내부적으로 어떻게 동작하는지에 대한 추가 정보** [원문]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-java-further-information-java-config )

>
Consider the following example, which shows a `@Bean` annotated method being called twice:

다음 예제는 `@Bean` 애노테이션을 붙인 메소드가 두 번 호출되는 상황을 보여줍니다.

```java
@Configuration
public class AppConfig {

    @Bean
    public ClientService clientService1() {
        ClientServiceImpl clientService = new ClientServiceImpl();
        clientService.setClientDao(clientDao());
        return clientService;
    }

    @Bean
    public ClientService clientService2() {
        ClientServiceImpl clientService = new ClientServiceImpl();
        clientService.setClientDao(clientDao());
        return clientService;
    }

    @Bean
    public ClientDao clientDao() {
        return new ClientDaoImpl();
    }
}
```

>
`clientDao()` has been called once in `clientService1()` and once in `clientService2()`. Since this method creates a new instance of `ClientDaoImpl` and returns it, you would normally expect to have two instances (one for each service). That definitely would be problematic: In Spring, instantiated beans have a `singleton` scope by default. This is where the magic comes in: All `@Configuration` classes are subclassed at startup-time with `CGLIB`. In the subclass, the child method checks the container first for any cached (scoped) beans before it calls the parent method and creates a new instance.

`clientDao()`는 `clientService1()`에서 한 번 호출되고 `clientService2()` 에서도 한 번 호출됩니다.
이 메소드는 `ClientDaoImpl`의 new instance를 생성해 리턴하므로, 일반적으로는 위의 코드에서 이 메소드는 `clientService1`과 `clientService2` 각각을 위해 두 개의 인스턴스를 만들었을 것으로 생각할 수 있습니다.

이건 확실히 좀 이상해 보입니다. 왜냐하면 Spring에서 인스턴스화된 bean은 기본적으로 `singleton` 스코프를 갖게 되기 때문입니다.

그러나 여기에서 마법이 일어납니다. 모든 `@Configuration` 클래스는 startup-time 에 CGLIB를 이용해 서브 클래스화 되는 것입니다.
그리고 그 서브 클래스에서 자식 메소드는 부모 메소드를 호출하고, 새로운 인스턴스를 만들기 전에 먼저 캐시된(스코프가 지정된) bean이 컨테이너에 등록되었는지를 확인합니다.

> (i)
The behavior could be different according to the scope of your bean. We are talking about singletons here.
{:style="background-color: #ecf1e8;"}

- (i)
    - 이런 동작은 bean의 스코프에 따라 달라질 수 있습니다. 여기에서는 싱글톤에 대해서만 이야기하고 있습니다.

> (i)
As of Spring 3.2, it is no longer necessary to add CGLIB to your classpath because CGLIB classes have been repackaged under `org.springframework.cglib` and included directly within the spring-core JAR.
{:style="background-color: #ecf1e8;"}

- (i)
    - Spring 3.2 부터는 CGLIB 클래스가 `org.springframework.cglib`의 하위에 다시 패키징되고 spring-core JAR에 직접 포함됩니다. 따라서 classpath에 CGLIB를 추가하지 않아도 됩니다.

>
There are a few restrictions due to the fact that CGLIB dynamically adds features at startup-time. In particular, configuration classes must not be final. However, as of 4.3, any constructors are allowed on configuration classes, including the use of `@Autowired` or a single non-default constructor declaration for default injection.
>
If you prefer to avoid any CGLIB-imposed limitations, consider declaring your `@Bean` methods on non-`@Configuration` classes (for example, on plain `@Component` classes instead). Cross-method calls between `@Bean` methods are not then intercepted, so you have to exclusively rely on dependency injection at the constructor or method level there.
{:style="background-color: #e9f1f6;"}

- CGLIB가 startup-time에 몇몇 기능들을 동적으로 추가한다는 사실 때문에 몇 가지 제약 사항이 있을 수 있습니다.
    - configuration 클래스가 `final`이면 안 됩니다.
- 하지만 다음은 허용됩니다.
    - Spring 4.3 부터는 configuration 클래스에 모든 종류의 생성자가 허용되기 때문에, default injection을 위해 `@Autowired` 방식과 기본 생성자가 아닌 단일 생성자(single non-default constructor)를 사용할 수도 있습니다.
- 만약 CGLIB 때문에 발생하는 제약을 피하고 싶다면 `@Configuration`이 아닌 클래스에서 `@Bean` 메소드를 선언하는 것도 고려해 보세요.
    - 예를 들어 `@Component` 클래스라던가...
    - 이렇게 하면 `@Bean` 메소드들 사이의 교차적인 호출을 인터셉트하지 않으므로, 생성자나 메소드 레벨에서의 dependency injection만 사용해야 합니다.

### 1.12.5. Composing Java-based Configurations

[원문]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-java-composing-configuration-classes )

>
Spring’s Java-based configuration feature lets you compose annotations, which can reduce the complexity of your configuration.

Spring의 Java 기반 configuration 기능을 사용하면, 여러분만의 애노테이션을 만들 수 있으므로 configuration의 복잡도를 줄일 수 있습니다.

#### Using the `@Import` Annotation

[원문]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-java-using-import )

>
Much as the `<import/>` element is used within Spring XML files to aid in modularizing configurations, the `@Import` annotation allows for loading `@Bean` definitions from another configuration class, as the following example shows:

Spring XML 파일에서 configuration을 모듈화하는데 `<import/>` 엘리먼트를 사용하는 것처럼, `@Import` 애노테이션을 사용하면 다른 configuration 클래스에서 `@Bean` definition을 로딩할 수 있습니다.

```java
@Configuration
public class ConfigA {

    @Bean
    public A a() {
        return new A();
    }
}

@Configuration
@Import(ConfigA.class)
public class ConfigB {

    @Bean
    public B b() {
        return new B();
    }
}
```

>
Now, rather than needing to specify both `ConfigA.class` and `ConfigB.class` when instantiating the context, only `ConfigB` needs to be supplied explicitly, as the following example shows:

이제 컨텍스트를 인스턴스화할 때 `ConfigA.class`와 `ConfigB.class`를 모두 지정할 필요 없이, 다음 예제와 같이 `ConfigB`만 명시적으로 제공하면 됩니다.

```java
public static void main(String[] args) {
    ApplicationContext ctx = new AnnotationConfigApplicationContext(ConfigB.class);

    // now both beans A and B will be available...
    A a = ctx.getBean(A.class);
    B b = ctx.getBean(B.class);
}
```

>
This approach simplifies container instantiation, as only one class needs to be dealt with, rather than requiring you to remember a potentially large number of `@Configuration` classes during construction.

이 방법은 애플리케이션을 생성하는 동안 많은 수의 `@Configuration` 클래스를 기억할 필요 없이 한 개의 클래스만 처리하면 되므로 컨테이너 인스턴스를 단순화합니다.

>
As of Spring Framework 4.2, `@Import` also supports references to regular component classes, analogous to the `AnnotationConfigApplicationContext.register` method. This is particularly useful if you want to avoid component scanning, by using a few configuration classes as entry points to explicitly define all your components.
{:style="background-color: #e9f1f6;"}

- Spring 프레임워크 4.2 부터 `@Import`는 `AnnotationConfigApplicationContext.register` 메소드처럼, 일반적인 컴포넌트 클래스에 대한 참조도 지원합니다.
- 이 방법은 컴포넌트 스캐닝을 고의로 피할 일이 있을 떄 유용합니다.

##### Injecting Dependencies on Imported @Bean Definitions

[원문]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-java-injecting-imported-beans )

>
The preceding example works but is simplistic. In most practical scenarios, beans have dependencies on one another across configuration classes. When using XML, this is not an issue, because no compiler is involved, and you can declare `ref="someBean"` and trust Spring to work it out during container initialization. When using `@Configuration` classes, the Java compiler places constraints on the configuration model, in that references to other beans must be valid Java syntax.

앞의 예는 작동하긴 하지만 단순하다는 문제가 있습니다.
실제로는 대부분의 경우에 bean은 여러 configuration 클래스와 의존 관계를 갖게 됩니다.
XML을 사용할 때에는 컴파일러가 XML에 관여하지 않기도 하고, `ref="someBean"`을 선언하면 컨테이너가 초기화할 때 Spring이 알아서 잘 처리하기 때문에 그런 의존 관계는 문제가 되지 않습니다.
하지만 `@Configuration` 클래스를 사용할 때에는 Java 컴파일러 때문에 다른 bean에 대한 참조가 valid한 Java 신택스여야 한다는 점에서 configuration 모델에 제약이 생길 수 밖에 없습니다.

>
Fortunately, solving this problem is simple. As [we already discussed]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-java-dependencies ), a `@Bean` method can have an arbitrary number of parameters that describe the bean dependencies. Consider the following more real-world scenario with several `@Configuration` classes, each depending on beans declared in the others:

다행히, 이런 문제를 해결하는 방법은 간단합니다.
앞에서 이야기한 바에 따르면 `@Bean` 메소드는 bean 의존관계를 표현하는 여러 개의 파라미터를 가질 수 있었죠.
다음 예제를 봅시다. 각각 다른 클래스에서 선언된 bean에 의존하는 여러 개의 `@Configuration` 클래스가 있는 실제 가능한 시나리오입니다.

```java
@Configuration
public class ServiceConfig {

    @Bean
    public TransferService transferService(AccountRepository accountRepository) {
        return new TransferServiceImpl(accountRepository);
    }
}

@Configuration
public class RepositoryConfig {

    @Bean
    public AccountRepository accountRepository(DataSource dataSource) {
        return new JdbcAccountRepository(dataSource);
    }
}

@Configuration
@Import({ServiceConfig.class, RepositoryConfig.class})
public class SystemTestConfig {

    @Bean
    public DataSource dataSource() {
        // return new DataSource
    }
}

public static void main(String[] args) {
    ApplicationContext ctx = new AnnotationConfigApplicationContext(SystemTestConfig.class);
    // everything wires up across configuration classes...
    TransferService transferService = ctx.getBean(TransferService.class);
    transferService.transfer(100.00, "A123", "C456");
}
```

>
There is another way to achieve the same result. Remember that `@Configuration` classes are ultimately only another bean in the container: This means that they can take advantage of `@Autowired` and `@Value` injection and other features the same as any other bean.

이와 동일한 결과를 얻는 다른 방법도 있습니다.
`@Configuration` 클래스도 결국엔 컨테이너에 들어가는 또다른 bean일 뿐이라는 것을 떠올려 봅시다.
즉, `@Autowired`와 `@Value` 주입 및 다른 bean과 동일한 다양한 기능들을 사용할 수 있다는 것입니다.

> (!)
Make sure that the dependencies you inject that way are of the simplest kind only. `@Configuration` classes are processed quite early during the initialization of the context, and forcing a dependency to be injected this way may lead to unexpected early initialization. Whenever possible, resort to parameter-based injection, as in the preceding example.
>
Also, be particularly careful with `BeanPostProcessor` and `BeanFactoryPostProcessor` definitions through `@Bean`. Those should usually be declared as `static @Bean` methods, not triggering the instantiation of their containing configuration class. Otherwise, `@Autowired` and `@Value` may not work on the configuration class itself, since it is possible to create it as a bean instance earlier than [AutowiredAnnotationBeanPostProcessor]( https://docs.spring.io/spring-framework/docs/5.3.7/javadoc-api/org/springframework/beans/factory/annotation/AutowiredAnnotationBeanPostProcessor.html ).
{:style="background-color: #fff9e4;"}

- (!)
    - 위와 같은 방법으로 주입하는 dependencies가 가장 단순한 종류의 dependencies인지 확인하도록 하세요.
        - `Configuration` 클래스는 컨텍스트 초기화 중에 상당히 일ㄹ찍 처리되기 때문에, 이런 방식으로 dependency를 강제로 주입하면 예상하지 못한 조기 초기화가 발생할 수 있습니다.
        - 가능하면 앞의 예제처럼 파라미터 기반의 주입에 의존하도록 합시다.
    - 또한 `@Bean`을 통한 `BeanPostProcessor`와 `BeanFactoryPostProcessor`의 definition에 특별히 주의하도록 합시다.
        - 이것들은 일반적으로 포함하는 configuration 클래스의 인스턴스화를 트리거하지 않고 `static @Bean` 메소드로 선언되어야 합니다.
        - 이렇게 하지 않으면 `AutowiredAnnotationBeanPostProcessor`보다 먼저 bean 인스턴스로 생성될 수 있기 때문에 `@Autowired`와 `@Value`가 configuration 클래스 자체에서 작동하지 않을 수도 있습니다.

>
The following example shows how one bean can be autowired to another bean:

다음 예제는 하나의 bean이 다른 bean에 어떻게 autowired 될 수 있는지 보여줍니다.

```java
@Configuration
public class ServiceConfig {

    @Autowired
    private AccountRepository accountRepository;

    @Bean
    public TransferService transferService() {
        return new TransferServiceImpl(accountRepository);
    }
}

@Configuration
public class RepositoryConfig {

    private final DataSource dataSource;

    public RepositoryConfig(DataSource dataSource) {
        this.dataSource = dataSource;
    }

    @Bean
    public AccountRepository accountRepository() {
        return new JdbcAccountRepository(dataSource);
    }
}

@Configuration
@Import({ServiceConfig.class, RepositoryConfig.class})
public class SystemTestConfig {

    @Bean
    public DataSource dataSource() {
        // return new DataSource
    }
}

public static void main(String[] args) {
    ApplicationContext ctx = new AnnotationConfigApplicationContext(SystemTestConfig.class);
    // everything wires up across configuration classes...
    TransferService transferService = ctx.getBean(TransferService.class);
    transferService.transfer(100.00, "A123", "C456");
}
```

>
Constructor injection in `@Configuration` classes is only supported as of Spring Framework 4.3. Note also that there is no need to specify `@Autowired` if the target bean defines only one constructor.
{:style="background-color: #e9f1f6;"}

`@Configuration` 클래스의 생성자 주입은 Spring 프레임워크 4.3 부터 지원됩니다.
타깃 bean에 딱 한 개의 생성자만 정의된 경우라면 `@Autowired` 애노테이션을 붙일 필요가 없다는 점도 참고해 둡시다.

###### Fully-qualifying imported beans for ease of navigation

>
In the preceding scenario, using `@Autowired` works well and provides the desired modularity, but determining exactly where the autowired bean definitions are declared is still somewhat ambiguous. For example, as a developer looking at `ServiceConfig`, how do you know exactly where the `@Autowired AccountRepository` bean is declared? It is not explicit in the code, and this may be just fine. Remember that the [Spring Tools for Eclipse]( https://spring.io/tools ) provides tooling that can render graphs showing how everything is wired, which may be all you need. Also, your Java IDE can easily find all declarations and uses of the `AccountRepository` type and quickly show you the location of `@Bean` methods that return that type.

위의 시나리오를 통해 `@Autowired`가 잘 작동하고 필요한 모듈화를 잘 제공한다는 것은 알 수 있었지만,
autowired bean definition이 선언된 정확한 위치를 결정하는 것은 아직 모호하게 느껴집니다.
예를 들어, `ServiceConfig`를 읽고 있는 개발자가 있을 때, 이 개발자가 어떻게 `@Autowired AccountRepository` bean이 선언된 위치를 정확히 알 수 있을까요?
이것은 코드에 명시된 정보는 아니지만, 큰 문제는 아닙니다.
STS는 모든 것들이 서로 어떻게 연결되어 있는지 보여주는 그래프 도구를 제공하며, 여러분에게는 이것만으로도 충분할 수 있습니다.
또한, Java IDE는 `AccountRepository` 타입의 모든 선언과 사용처를 쉽게 찾아주고, 해당 타입을 리턴하는 `@Bean` 메소드의 위치도 빠르게 찾아 보여줄 수 있을 겁니다.

>
In cases where this ambiguity is not acceptable and you wish to have direct navigation from within your IDE from one `@Configuration` class to another, consider autowiring the configuration classes themselves. The following example shows how to do so:

이러한 애매모호함이 싫고, IDE 내에서 `@Configuration` 클래스들 사이를 직접 탐색하려 한다면, configuration 클래스들 자체를 autowiring하는 것을 고려해볼 수 있습니다.
다음 예제는 그 방법을 보여줍니다.

```java
@Configuration
public class ServiceConfig {

    @Autowired
    private RepositoryConfig repositoryConfig;

    @Bean
    public TransferService transferService() {
        // navigate 'through' the config class to the @Bean method!
        return new TransferServiceImpl(repositoryConfig.accountRepository());
    }
}
```

>
In the preceding situation, where `AccountRepository` is defined is completely explicit. However, `ServiceConfig` is now tightly coupled to `RepositoryConfig`. That is the tradeoff. This tight coupling can be somewhat mitigated by using interface-based or abstract class-based `@Configuration` classes. Consider the following example:

위와 같은 상황에서 `AccountRepository`가 정의된 위치는 완전히 명시적입니다.
하지만 이제 `ServiceConfig`는 `RepositoryConfig`와 강하게 커플링이 생겨버렸습니다. 이것이 바로 이 방법의 트레이드 오프입니다.
이런 강한 결합은 인터페이스 기반 또는 추상 클래스 기반의 `@Configuration` 클래스를 사용해서 어느 정도 완화할 수 있기는 합니다.
다음 예를 봅시다.

```java
@Configuration
public class ServiceConfig {

    @Autowired
    private RepositoryConfig repositoryConfig;

    @Bean
    public TransferService transferService() {
        return new TransferServiceImpl(repositoryConfig.accountRepository());
    }
}

@Configuration
public interface RepositoryConfig {

    @Bean
    AccountRepository accountRepository();
}

@Configuration
public class DefaultRepositoryConfig implements RepositoryConfig {

    @Bean
    public AccountRepository accountRepository() {
        return new JdbcAccountRepository(...);
    }
}

@Configuration
@Import({ServiceConfig.class, DefaultRepositoryConfig.class})  // import the concrete config!
public class SystemTestConfig {

    @Bean
    public DataSource dataSource() {
        // return DataSource
    }

}

public static void main(String[] args) {
    ApplicationContext ctx = new AnnotationConfigApplicationContext(SystemTestConfig.class);
    TransferService transferService = ctx.getBean(TransferService.class);
    transferService.transfer(100.00, "A123", "C456");
}
```

>
Now `ServiceConfig` is loosely coupled with respect to the concrete `DefaultRepositoryConfig`, and built-in IDE tooling is still useful: You can easily get a type hierarchy of `RepositoryConfig` implementations. In this way, navigating `@Configuration` classes and their dependencies becomes no different than the usual process of navigating interface-based code.

이제 `ServiceConfig`는 구체적인 `DefaultRepositoryConfig`와는 느슨하게 결합되게 되었습니다. 게다가 편리한 IDE 빌트인 도구도 사용할 수 있으니까 `RepositoryConfig` 구현 계층 구조를 쉽게 확인할 수 있습니다.
이런 방식으로 `@Configuration` 클래스와 그와 관련된 dependencies를 탐색하는 것은 인터페이스 기반의 코드를 탐색하는 일반적인 과정과 그리 다르지 않습니다.

>
If you want to influence the startup creation order of certain beans, consider declaring some of them as `@Lazy` (for creation on first access instead of on startup) or as `@DependsOn` certain other beans (making sure that specific other beans are created before the current bean, beyond what the latter’s direct dependencies imply).
{:style="background-color: #e9f1f6;"}

- 특정한 bean의 시작 생성 순서를 제어하고 싶다면, 그런 bean을 `@Lazy`로 선언하거나(이렇게 하면 시작할 때 생성되지 않고, 처음으로 객체에 엑세스할 때 생성이 됩니다), 다른 특정 bean을 `@DependsOn`로 지정하는 방법이 있습니다(이렇게 하면 `@DependsOn`으로 설정한 다른 bean이 먼저 생성됩니다)

#### Conditionally Include `@Configuration` Classes or `@Bean` Methods

[원문]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-java-conditional )

>
It is often useful to conditionally enable or disable a complete `@Configuration` class or even individual `@Bean` methods, based on some arbitrary system state. One common example of this is to use the `@Profile` annotation to activate beans only when a specific profile has been enabled in the Spring `Environment` (see [Bean Definition Profiles]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-definition-profiles ) for details).

시스템 상태에 따라 전체적인 `@Configuration` 클래스나 개별 `@Bean` 메소드를 조건부로 enable 하거나 disable하는 유용한 방법도 있습니다.

예를 들어 `@Profile` 애노테이션을 써서 특정 프로파일이 Spring 환경에서 활성화된 경우에만 bean을 enable할 수 있습니다. (자세한 내용은 [Bean Definition Profiles]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-definition-profiles )를 참고하세요)

>
The `@Profile` annotation is actually implemented by using a much more flexible annotation called [@Conditional]( https://docs.spring.io/spring-framework/docs/5.3.7/javadoc-api/org/springframework/context/annotation/Conditional.html ). The `@Conditional` annotation indicates specific `org.springframework.context.annotation.Condition` implementations that should be consulted before a `@Bean` is registered.

`@Profile` 애노테이션은 실제로는 `@Conditional`이라는 훨씬 더 유연한 애노테이션을 사용하여 구현됩니다.
`@Conditional` 애노테이션은 `@Bean`이 등록되기 전에 참조해야 하는 `org.springframework.context.annotation.Condition`의 구현을 나타냅니다.

>
Implementations of the `Condition` interface provide a `matches(…)` method that returns `true` or `false`. For example, the following listing shows the actual `Condition` implementation used for `@Profile`:

`Condition` 인터페이스의 구현은 `match(...)` 메소드를 제공하며, 이 메소드는 `true`, 나 `false`를 리턴합니다.
예를 들어 다음 목록은 `@Profile`에 사용된 실제 `Condition`의 구현을 보여줍니다.

```java
@Override
public boolean matches(ConditionContext context, AnnotatedTypeMetadata metadata) {
    // Read the @Profile annotation attributes
    MultiValueMap<String, Object> attrs = metadata.getAllAnnotationAttributes(Profile.class.getName());
    if (attrs != null) {
        for (Object value : attrs.get("value")) {
            if (context.getEnvironment().acceptsProfiles(((String[]) value))) {
                return true;
            }
        }
        return false;
    }
    return true;
}
```

>
See the [@Conditional]( https://docs.spring.io/spring-framework/docs/5.3.7/javadoc-api/org/springframework/context/annotation/Conditional.html ) javadoc for more detail.

더 자세한 내용은 `@Conditional`의 javadoc을 참고하세요.

#### Combining Java and XML Configuration

[원문]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-java-combining )

Spring’s @Configuration class support does not aim to be a 100% complete replacement for Spring XML. Some facilities, such as Spring XML namespaces, remain an ideal way to configure the container. In cases where XML is convenient or necessary, you have a choice: either instantiate the container in an “XML-centric” way by using, for example, ClassPathXmlApplicationContext, or instantiate it in a “Java-centric” way by using AnnotationConfigApplicationContext and the @ImportResource annotation to import XML as needed.

##### XML-centric Use of `@Configuration` Classes

[원문]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-java-combining-xml-centric )

>
It may be preferable to bootstrap the Spring container from XML and include `@Configuration` classes in an ad-hoc fashion. For example, in a large existing codebase that uses Spring XML, it is easier to create `@Configuration` classes on an as-needed basis and include them from the existing XML files. Later in this section, we cover the options for using `@Configuration` classes in this kind of “XML-centric” situation.

XML에서 Spring 컨테이너를 부트스트랩하고, `@Configuration` 클래스를 포함시키는 일이 바람직할 수도 있습니다.
예를 들어 Spring XML을 사용하는 대규모의 코드베이스에서는 `@Configuration` 클래스를 먼저 만들고, 필요에 따라 이미 존재하는 XML 파일을 include하는 것이 더 쉽습니다.
이 섹션의 뒷부분에서는 이런 종류의 "XML-위주"의 상황에서 `@Configuration` 클래스를 사용하는 옵션을 다룹니다.

###### Declaring `@Configuration` classes as plain Spring `<bean/>` elements

>
Remember that `@Configuration` classes are ultimately bean definitions in the container. In this series examples, we create a `@Configuration` class named `AppConfig` and include it within `system-test-config.xml` as a `<bean/>` definition. Because `<context:annotation-config/>` is switched on, the container recognizes the `@Configuration` annotation and processes the `@Bean` methods declared in `AppConfig` properly.
>
The following example shows an ordinary configuration class in Java:

`@Configuration` 클래스는 결국엔 컨테이너에 들어갈 bean definition들이라는 것을 잊지 마세요.
다음의 예제들은 `AppConfig`라는 `@Configuration` 클래스를 만들고, `system-test-config.xml` 파일에 `<bean/>` definition으로 include 합니다.
왜냐하면 `<context:annotation-config/>`가 on 으로 켜져 있기 때문에, 컨테이너는 `@Configuration` 애노테이션을 인식하고, `AppConfig`에 선언된 `@Bean` 메소드를 제대로 처리합니다.

```java
@Configuration
public class AppConfig {

    @Autowired
    private DataSource dataSource;

    @Bean
    public AccountRepository accountRepository() {
        return new JdbcAccountRepository(dataSource);
    }

    @Bean
    public TransferService transferService() {
        return new TransferService(accountRepository());
    }
}
```

>
The following example shows part of a sample `system-test-config.xml` file:

```xml
<beans>
    <!-- enable processing of annotations such as @Autowired and @Configuration -->
    <context:annotation-config/>
    <context:property-placeholder location="classpath:/com/acme/jdbc.properties"/>

    <bean class="com.acme.AppConfig"/>

    <bean class="org.springframework.jdbc.datasource.DriverManagerDataSource">
        <property name="url" value="${jdbc.url}"/>
        <property name="username" value="${jdbc.username}"/>
        <property name="password" value="${jdbc.password}"/>
    </bean>
</beans>
```

>
The following example shows a possible `jdbc.properties` file:

```
jdbc.url=jdbc:hsqldb:hsql://localhost/xdb
jdbc.username=sa
jdbc.password=
```

```java
public static void main(String[] args) {
    ApplicationContext ctx = new ClassPathXmlApplicationContext("classpath:/com/acme/system-test-config.xml");
    TransferService transferService = ctx.getBean(TransferService.class);
    // ...
}
```

> (i)
In `system-test-config.xml` file, the `AppConfig` `<bean/>` does not declare an `id` element. While it would be acceptable to do so, it is unnecessary, given that no other bean ever refers to it, and it is unlikely to be explicitly fetched from the container by name. Similarly, the `DataSource` bean is only ever autowired by type, so an explicit bean `id` is not strictly required.
{:style="background-color: #ecf1e8;"}

- (i)
    - `system-test-config.xml` 파일에서, `AppConfig` `<bean/>`은 `id` 엘리먼트를 선언하지 않았습니다.
    - `id`를 선언할 수도 있었지만, 다른 bean이 그 `id`를 참조하지도 않고, 컨테이너에서 이름으로 가져갈 가능성도 없기 때문에 선언이 필요하지 않습니다.
    - 그와 마찬가지로 `DataSource` bean도 명시적인 bean `id`가 필요하지 않은데, 타입에 의해 autowired 되기 때문입니다.


###### Using `<context:component-scan/>` to pick up `@Configuration` classes

>
Because `@Configuration` is meta-annotated with `@Component`, `@Configuration`-annotated classes are automatically candidates for component scanning. Using the same scenario as describe in the previous example, we can redefine `system-test-config.xml` to take advantage of component-scanning. Note that, in this case, we need not explicitly declare `<context:annotation-config/>`, because `<context:component-scan/>` enables the same functionality.
>
The following example shows the modified `system-test-config.xml` file:

`@Configuration`에는 메타 애노테이션으로 `@Component`가 붙어있기 때문에, `@configuration` 애노테이션이 붙은 클래스들은 자동으로 컴포넌트 스캔의 후보가 됩니다.
앞의 예제에서 설명한 것과 똑같은 시나리오로 컴포넌트 스캔이 작동하도록 `system-test-config.xml`을 재정의할 수 있습니다.

이런 경우에는 `<context:component-scan/>`이 같은 기능을 enable하므로 `<context:annotation-config/>`를 명시적으로 선언하지 않아도 됩니다.
다음 예제는 수정된 `system-test-config.xml` 파일을 보여줍니다.

```xml
<beans>
    <!-- picks up and registers AppConfig as a bean definition -->
    <context:component-scan base-package="com.acme"/>
    <context:property-placeholder location="classpath:/com/acme/jdbc.properties"/>

    <bean class="org.springframework.jdbc.datasource.DriverManagerDataSource">
        <property name="url" value="${jdbc.url}"/>
        <property name="username" value="${jdbc.username}"/>
        <property name="password" value="${jdbc.password}"/>
    </bean>
</beans>
```

##### `@Configuration` Class-centric Use of XML with `@ImportResource`

[원문]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-java-combining-java-centric )

>
In applications where `@Configuration` classes are the primary mechanism for configuring the container, it is still likely necessary to use at least some XML. In these scenarios, you can use `@ImportResource` and define only as much XML as you need. Doing so achieves a “Java-centric” approach to configuring the container and keeps XML to a bare minimum. The following example (which includes a configuration class, an XML file that defines a bean, a properties file, and the `main` class) shows how to use the `@ImportResource` annotation to achieve “Java-centric” configuration that uses XML as needed:

`@Configuration` 클래스가 컨테이너 confire를 위한 primary 메커니즘인 애플리케이션에서는, 어느 정도의 최소한의 XML을 사용할 수 밖에 없습니다.
이런 시나리오에서는 `@ImportResource`를 사용해서 필요한 만큼의 XML만을 정의하는 방법을 쓸 수 있습니다.

이렇게 하면 "Java-중심"의 방법으로 컨테이너를 configure할 수 있으며, XML은 최소한으로 관리할 수 있습니다.

다음 예제(configuration 클래스와 bean을 정의하는 XML, properties 파일, `main` 클래스가 포함된 예제)는 `@ImportResource` 애노테이션을 사용해 "Java-중심" configuration을 달성하는 방법을 보여줍니다.

```java
@Configuration
@ImportResource("classpath:/com/acme/properties-config.xml")
public class AppConfig {

    @Value("${jdbc.url}")
    private String url;

    @Value("${jdbc.username}")
    private String username;

    @Value("${jdbc.password}")
    private String password;

    @Bean
    public DataSource dataSource() {
        return new DriverManagerDataSource(url, username, password);
    }
}
```

```xml
properties-config.xml
<beans>
    <context:property-placeholder location="classpath:/com/acme/jdbc.properties"/>
</beans>
```

```
jdbc.properties
jdbc.url=jdbc:hsqldb:hsql://localhost/xdb
jdbc.username=sa
jdbc.password=
```

```java
public static void main(String[] args) {
    ApplicationContext ctx = new AnnotationConfigApplicationContext(AppConfig.class);
    TransferService transferService = ctx.getBean(TransferService.class);
    // ...
}
```


## 함께 읽기

- 목록으로 - [[/spring/document/core]]{Spring Core Technologies}
- 이전 문서 - [[/spring/document/core/01-11-using-jsr-330-standard-annotations]]{1.11. Using JSR 330 Standard Annotations}
- 다음 문서 - [[/spring/document/core/01-13-env-abstraction]]{1.13. Environment Abstraction}

