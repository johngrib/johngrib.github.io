---
layout  : wiki
title   : Spring Core Technologies - 1.12. Java-based Container Configuration
summary : 
date    : 2021-07-11 13:42:50 +0900
updated : 2021-07-12 15:44:21 +0900
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


## 함께 읽기

- 목록으로 - [[/spring/document/core]]{Spring Core Technologies}
- 이전 문서 - [[/spring/document/core/01-11-using-jsr-330-standard-annotations]]{1.11. Using JSR 330 Standard Annotations}
- 다음 문서 - {1.13. Environment Abstraction}

