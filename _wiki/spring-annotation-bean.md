---
layout  : wiki
title   : Spring @Bean 애노테이션
summary : 
date    : 2021-01-09 22:36:00 +0900
updated : 2021-01-10 00:09:35 +0900
tag     : spring
toc     : true
public  : true
parent  : [[spring]]
latex   : false
---
* TOC
{:toc}

- 이 문서는 다음 두 문서를 참고해 나름대로 정리한 것입니다.
    - [docs.spring.io][javadoc]
    - [93e5214d01c14d9fced2fae670b126ef39a01055][source-code] 버전의 소스코드

## JavaDoc

Bean.java 파일의 클래스 주석은 양이 상당하다. [JavaDoc][javadoc] 문서를 읽는 쪽이 더 읽기 편하다.

### Overview

> The names and semantics of the attributes to this annotation are intentionally similar to those of the `<bean/>` element in the Spring XML schema.

`@Bean`은 기본적으로 다음과 같이 사용한다.

```java
@Bean
public MyBean myBean() {
  // MyBean 객체를 초기화하고 설정한다
  return obj;
}
```

### Bean Names

> While a `name()` attribute is available, the default strategy for determining the name of a bean is to use the name of the `@Bean` method. This is convenient and intuitive, but if explicit naming is desired, the `name` attribute (or its alias `value`) may be used. Also note that `name` accepts an array of Strings, allowing for multiple names (i.e. a primary bean name plus one or more aliases) for a single bean.

- 빈 이름을 결정하는 기본 전략은 메소드 이름을 사용하는 것이다.
    - 기본 전략을 쓰면 `myName`을 Bean의 이름으로 쓰게 된다.
- 만약 이름을 명시하고 싶다면 `name` 속성에 `String`을 지정해 사용할 수 있다.
- `name` 속성을 `String` 배열로 설정하면 여러 이름을 지정할 수 있다.

```java
// b1, b2 를 Bean 이름으로 사용한다. myBean 은 사용하지 않는다.
@Bean({"b1", "b2"})
public MyBean myBean() {
  // instantiate and configure MyBean obj
return obj;
}
```

### Profile, Scope, Lazy, DependsOn, Primary, Order

>
Note that the `@Bean` annotation does not provide attributes for profile, scope, lazy, depends-on or primary. Rather, it should be used in conjunction with `@Scope`, `@Lazy`, `@DependsOn` and `@Primary` annotations to declare those semantics.
>
The semantics of the above-mentioned annotations match their use at the component class level: `@Profile` allows for selective inclusion of certain beans. `@Scope` changes the bean's scope from singleton to the specified scope. `@Lazy` only has an actual effect in case of the default singleton scope. `@DependsOn` enforces the creation of specific other beans before this bean will be created, in addition to any dependencies that the bean expressed through direct references, which is typically helpful for singleton startup. `@Primary` is a mechanism to resolve ambiguity at the injection point level if a single target component needs to be injected but several beans match by type.
>
Additionally, `@Bean` methods may also declare qualifier annotations and `@Order` values, to be taken into account during injection point resolution just like corresponding annotations on the corresponding component classes but potentially being very individual per bean definition (in case of multiple definitions with the same bean class). Qualifiers narrow the set of candidates after the initial type match; order values determine the order of resolved elements in case of collection injection points (with several target beans matching by type and qualifier).
>
NOTE: `@Order` values may influence priorities at injection points, but please be aware that they do not influence singleton startup order which is an orthogonal concern determined by dependency relationships and `@DependsOn` declarations as mentioned above. Also, Priority is not available at this level since it cannot be declared on methods; its semantics can be modeled through `@Order` values in combination with `@Primary` on a single bean per type.

- `@Bean` 어노테이션은 profile, scope, lazy, depends-on 또는 primary 속성을 제공하지 않는다.
- 이런 속성을 설정하려면 `@Scope`, `@Lazy`, `@DependsOn`, `@Primary` 어노테이션을 써야 한다.

```java
@Bean
@Profile("production")
@Scope("prototype")
public MyBean myBean() {
  // instantiate and configure MyBean obj
  return obj;
}
```

- `@Profile`을 통해 빈을 프로파일에 따라 선택적으로 사용할 수 있다.
- `@Scope`를 통해 빈의 스코프를 기본값인 singleton 에서 다른 값으로 바꿀 수 있다.
    - `@Lazy`는 스코프가 singleton인 경우만 효과가 있다.
- `@DependsOn`은 빈이 생성되기 전에 `@DependsOn`으로 설정한 다른 빈이 먼저 생성되게 강제한다.
- `@Primary`는 여러 빈이 주입 되상이 될 경우 우선순위를 부여한다.

`@Order` 애노테이션에 대한 설명은 생략.

### @Bean Methods in @Configuration Classes

> Typically, `@Bean` methods are declared within `@Configuration` classes. In this case, bean methods may reference other `@Bean` methods in the same class by calling them directly. This ensures that references between beans are strongly typed and navigable. Such so-called 'inter-bean references' are guaranteed to respect scoping and AOP semantics, just like getBean() lookups would. These are the semantics known from the original 'Spring JavaConfig' project which require CGLIB subclassing of each such configuration class at runtime. As a consequence, `@Configuration` classes and their factory methods must not be marked as final or private in this mode.

- 일반적으로 `@Bean` 메소드는 `@Configuration` 클래스 안에 선언한다.
- `@Configuration` 클래스와 `@Bean`을 붙인 팩토리 메소드는 `final`, `private`으로 선언되면 안된다.

```java
@Configuration
public class AppConfig {

  @Bean
  public FooService fooService() {
    return new FooService(fooRepository());
  }

  @Bean
  public FooRepository fooRepository() {
    return new JdbcFooRepository(dataSource());
  }

  // ...
}
```

### @Bean Lite Mode

>
`@Bean` methods may also be declared within classes that are not annotated with `@Configuration.` For example, bean methods may be declared in a `@Component` class or even in a plain old class. In such cases, a `@Bean` method will get processed in a so-called 'lite' mode.
>
Bean methods in lite mode will be treated as plain factory methods by the container (similar to factory-method declarations in XML), with scoping and lifecycle callbacks properly applied. The containing class remains unmodified in this case, and there are no unusual constraints for the containing class or the factory methods.
>
In contrast to the semantics for bean methods in @Configuration classes, 'inter-bean references' are not supported in lite mode. Instead, when one `@Bean`-method invokes another `@Bean`-method in lite mode, the invocation is a standard Java method invocation; Spring does not intercept the invocation via a CGLIB proxy. This is analogous to inter-`@Transactional` method calls where in proxy mode, Spring does not intercept the invocation — Spring does so only in AspectJ mode.

- `@Bean` 메소드는 `@Configuration`이 아닌 곳에서도 선언할 수 있다.
    - `@Component`나 그냥 클래스(plain old class)에서도 선언 가능.
- 이런 경우 `@Bean` 메소드는 lite mode로 처리된다.
- lite mode에서 `@Bean` 메소드는 순수한 팩토리 메소드로 취급된다.
- `@Configuration` 클래스의 `@Bean` 메소드와 달리 lite mode에서는 빈과 빈 사이의 참조가 지원되지 않는다.

```java
@Component
public class Calculator {
  public int sum(int a, int b) {
    return a+b;
  }

  @Bean
  public MyBean myBean() {
    return new MyBean();
  }
}
```

### Bootstrapping

> See the `@Configuration` javadoc for further details including how to bootstrap the container using AnnotationConfigApplicationContext and friends.

이에 대한 내용은 `@Configuration` JavaDoc을 참고할 것.

### BeanFactoryPostProcessor-returning @Bean methods

>
Special consideration must be taken for `@Bean` methods that return Spring BeanFactoryPostProcessor (BFPP) types. Because BFPP objects must be instantiated very early in the container lifecycle, they can interfere with processing of annotations such as `@Autowired`, `@Value`, and `@PostConstruct` within `@Configuration` classes. To avoid these lifecycle issues, mark BFPP-returning `@Bean` methods as static. For example:

- `@Bean` 메소드가 Spring BeanFactoryPostProcessor (BFPP) 타입을 리턴하는 경우.
- BFPP 개체는 컨테이너 생명주기의 초기에 인스턴스화되어야하기 때문에 `@Configuration`에 선언된 `@Autowired`, `@Value`, `@PostConstruct` 같은 애노테이션의 처리를 방해할 수 있다.
- 이런 생명주기 문제를 예방하려면 BFPP를 리턴하는 `@Bean` 메서드를 `static`으로 선언하면 된다.

```java
// static
@Bean
public static PropertySourcesPlaceholderConfigurer pspc() {
  // instantiate, configure and return pspc ...
}
```

## 참고문헌

- [docs.spring.io][javadoc]
- [93e5214d01c14d9fced2fae670b126ef39a01055][source-code] 버전의 소스코드


## 주석

[javadoc]: https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/context/annotation/Bean.html
[source-code]: https://github.com/spring-projects/spring-framework/blob/93e5214d01c14d9fced2fae670b126ef39a01055/spring-context/src/main/java/org/springframework/context/annotation/Bean.java

