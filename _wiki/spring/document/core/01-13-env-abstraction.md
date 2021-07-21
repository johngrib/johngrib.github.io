---
layout  : wiki
title   : Spring Core Technologies - 1.13. Environment Abstraction
summary : 
date    : 2021-07-15 22:11:59 +0900
updated : 2021-07-21 23:04:29 +0900
tag     : java spring
toc     : true
public  : true
parent  : [[/spring/document/core]]
latex   : false
---
* TOC
{:toc}

- 목록으로 - [[/spring/document/core]]{Spring Core Technologies}
- 이전 문서 - [[/spring/document/core/01-12-java-based-container-config]]{1.12. Java-based Container Configuration}
- 다음 문서 - {1.14. Registering a LoadTimeWeaver}

## 1.13. Environment Abstraction

[원문]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-environment )

>
The [Environment]( https://docs.spring.io/spring-framework/docs/5.3.7/javadoc-api/org/springframework/core/env/Environment.html ) interface is an abstraction integrated in the container that models two key aspects of the application environment: [profiles]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-definition-profiles ) and [properties]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-property-source-abstraction ).

`Environment` 인터페이스는 애플리케이션 환경의 두 가지 주요 측면인 [profiles]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-definition-profiles )과 [properties]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-property-source-abstraction )를 모델링하며 컨테이너에 추상적으로 통합되어 있습니다.

>
A profile is a named, logical group of bean definitions to be registered with the container only if the given profile is active. Beans may be assigned to a profile whether defined in XML or with annotations. The role of the `Environment` object with relation to profiles is in determining which profiles (if any) are currently active, and which profiles (if any) should be active by default.

프로파일이란 이름이 지정된 논리적인 bean definition 그룹이며, 활성화된 경우에만 컨테이너에 등록됩니다.
bean은 XML로 정의하건 애노테이션으로 정의하건 관계 없이 프로파일에 할당될 수 있습니다.

프로파일과 관련된 `Environment` 객체의 역할은 현재 활성화된 프로파일과 기본적으로 활성화되어야 하는 프로파일을 결정하는 것입니다.

>
Properties play an important role in almost all applications and may originate from a variety of sources: properties files, JVM system properties, system environment variables, JNDI, servlet context parameters, ad-hoc `Properties` objects, `Map` objects, and so on. The role of the `Environment` object with relation to properties is to provide the user with a convenient service interface for configuring property sources and resolving properties from them.

프로퍼티는 거의 모든 애플리케이션에서 중요한 역할을 하며, properties 파일, JVM 시스템 properties, 시스템 환경 변수, JNDI, 서블릿 컨텍스트 파라미터, ad-hoc `Properties` 객체, `Map` 객체 등 다양한 소스를 사용할 수 있습니다.
properties와 관련된 `Environment` 객체의 역할은 properties 소스를 configuring하고, 속성값을 사용하기 좋은 편리한 서비스 인터페이스를 사용자에게 제공하는 것입니다.

### 1.13.1. Bean Definition Profiles

[원문]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-definition-profiles )

>
Bean definition profiles provide a mechanism in the core container that allows for registration of different beans in different environments. The word, “environment,” can mean different things to different users, and this feature can help with many use cases, including:
>
- Working against an in-memory datasource in development versus looking up that same datasource from JNDI when in QA or production.
- Registering monitoring infrastructure only when deploying an application into a performance environment.
- Registering customized implementations of beans for customer A versus customer B deployments.

bean definition 프로파일은 core 컨테이너 내에서 다른 환경의 각기 다른 bean들을 등록할 수 있게 해주는 메커니즘을 제공합니다.
"환경(environment)"이라는 단어는 사용자에 따라 다양한 의미를 가질 수 있지만, 이 기능은 다음 몇 가지 경우를 포함한 다양한 상황에 도움이 될 수 있습니다.

- 개발중일 때 in-memory datasource로 작업하는 것과, QA 또는 production일 때 JNDI 에서 같은 datasource를 찾는 것.
- performance environment로 애플리케이션을 배포할 때에만 모니터링 인프라를 등록하기.
- 고객 A, 고객 B에 대해 각기 다른 커스텀 구현 bean을 등록하기

>
Consider the first use case in a practical application that requires a `DataSource`. In a test environment, the configuration might resemble the following:

`DataSource`가 필요한 실제 애플리케이션 예제를 봅시다. 테스트 환경에서는 다음과 같이 configuration할 수 있습니다.

```java
@Bean
public DataSource dataSource() {
    return new EmbeddedDatabaseBuilder()
        .setType(EmbeddedDatabaseType.HSQL)
        .addScript("my-schema.sql")
        .addScript("my-test-data.sql")
        .build();
}
```

>
Now consider how this application can be deployed into a QA or production environment, assuming that the datasource for the application is registered with the production application server’s JNDI directory. Our `dataSource` bean now looks like the following listing:

이제 datasource가 프로덕션 애플리케이션 서버의 JNDI 디렉토리에 등록되어 있다고 치고, 이 애플리케이션을 QA나 프로덕션 환경에 배포한다고 해봅시다.

여기에 필요한 `datasource` bean은 다음과 같습니다.

```java
@Bean(destroyMethod="")
public DataSource dataSource() throws Exception {
    Context ctx = new InitialContext();
    return (DataSource) ctx.lookup("java:comp/env/jdbc/datasource");
}
```

>
The problem is how to switch between using these two variations based on the current environment. Over time, Spring users have devised a number of ways to get this done, usually relying on a combination of system environment variables and XML `<import/>` statements containing `${placeholder}` tokens that resolve to the correct configuration file path depending on the value of an environment variable. Bean definition profiles is a core container feature that provides a solution to this problem.
>
If we generalize the use case shown in the preceding example of environment-specific bean definitions, we end up with the need to register certain bean definitions in certain contexts but not in others. You could say that you want to register a certain profile of bean definitions in situation A and a different profile in situation B. We start by updating our configuration to reflect this need.

문제는 현재 환경에 따라 이 두 가지를 어떻게 전환해가며 쓸 수 있는가입니다.
시간이 흐르면서 Spring 사용자들은 시스템 환경 변수 값과 XML `<import/>`에서 `${placeholder}`를 쓰는 등의 방법을 조합해서 이 문제를 해결하는 여러 가지 방법을 만들어냈습니다.
bean definition profile은 이 문제에 대한 해결책을 제공하는 컨테이너의 핵심 기능입니다.

위 예제들은 결국 특정 컨텍스트에 따라 특정 bean definition을 등록하고 말고를 정할 수 있다는 것입니다.
상황 A에서 bean definition의 특정 프로필을 등록하고, 상황 B에서 다른 프로필을 동록하고 싶은 것이 여러분의 요구였을 텐데요, 우리는 이러한 요구사항을 반영하도록 configuration을 업데이트하는 것으로 시작합니다.


#### Using @Profile

[원문]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-definition-profiles-java )

>
The [`@Profile`]( https://docs.spring.io/spring-framework/docs/5.3.7/javadoc-api/org/springframework/context/annotation/Profile.html ) annotation lets you indicate that a component is eligible for registration when one or more specified profiles are active.
Using our preceding example, we can rewrite the `dataSource` configuration as follows:

`@Profile` 애노테이션을 사용하면 지정된 프로파일이 활성화될 때 어떤 컴포넌트를 등록해야 할지를 표시할 수 있습니다.

```java
@Configuration
@Profile("development")
public class StandaloneDataConfig {

    @Bean
    public DataSource dataSource() {
        return new EmbeddedDatabaseBuilder()
            .setType(EmbeddedDatabaseType.HSQL)
            .addScript("classpath:com/bank/config/sql/schema.sql")
            .addScript("classpath:com/bank/config/sql/test-data.sql")
            .build();
    }
}
```

```java
@Configuration
@Profile("production")
public class JndiDataConfig {

    @Bean(destroyMethod="")
    public DataSource dataSource() throws Exception {
        Context ctx = new InitialContext();
        return (DataSource) ctx.lookup("java:comp/env/jdbc/datasource");
    }
}
```

> (i)
As mentioned earlier, with `@Bean` methods, you typically choose to use programmatic JNDI lookups, by using either Spring’s `JndiTemplate`/`JndiLocatorDelegate` helpers or the straight JNDI `InitialContext` usage shown earlier but not the `JndiObjectFactoryBean` variant, which would force you to declare the return type as the `FactoryBean` type.
{:style="background-color: #ecf1e8;"}

- (i)
    - 앞에서 언급한 바와 같이 `@Bean` 메소드를 사용하면 일반적으로 프로그래밍 방식의 JNDI 탐색을 사용하게 됩니다.
        - 이렇게 하면 `JndiTemplate`/`JndiLocatorDelegate` 헬퍼나 `JndiObjectFactoryBean` 변형이 아닌 직접적인 JNDI `InitialContext`를 사용하게 됩니다.
    - 이를 위해 리턴 타입을 `FactoryBean` 타입으로 선언해야 합니다.

>
The profile string may contain a simple profile name (for example, `production`) or a profile expression. A profile expression allows for more complicated profile logic to be expressed (for example, `production & us-east`). The following operators are supported in profile expressions:

프로파일 문자열로는 간단한 프로파일 이름(예: `production`)이나 프로파일 표현식을 사용할 수 있습니다.
복잡한 프로파일 로직이 있다면 프로파일 표현식을 사용해 표현할 수도 있습니다(예: `production & us-east`).
프로파일 표현식에서 지원되는 연산자는 다음과 같습니다.

>
- `!`: A logical “not” of the profile
- `&`: A logical “and” of the profiles
- `|`: A logical “or” of the profiles


- `!`: not 조건
- `&`: and 조건
- `|`: or 조건

> (i)
You cannot mix the `&` and `|` operators without using parentheses. For example, `production & us-east | eu-central` is not a valid expression. It must be expressed as `production & (us-east | eu-central)`.
{:style="background-color: #ecf1e8;"}

- (i)
    - 괄호 없이 `&`와 `|` 연산자를 같이 쓸 수 없습니다.
    - 예를 들어 `production & us-east | eu-central`는 올바른 표현식이 아닙니다.
    - `production & (us-east | eu-central)` 이렇게 표현해야 합니다.

>
You can use `@Profile` as a [meta-annotation]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-meta-annotations ) for the purpose of creating a custom composed annotation. The following example defines a custom `@Production` annotation that you can use as a drop-in replacement for `@Profile("production")`:

`@Profile`을 메타 애노테이션으로 사용하여 커스텀 애노테이션을 만들 수도 있습니다.
다음은 `@Profile("production")`을 대체할 수 있는 `@Production` 애노테이션을 만드는 예제입니다.

```java
@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
@Profile("production")
public @interface Production {
}
```

>
If a `@Configuration` class is marked with `@Profile`, all of the `@Bean` methods and `@Import` annotations associated with that class are bypassed unless one or more of the specified profiles are active. If a `@Component` or `@Configuration` class is marked with `@Profile({"p1", "p2"})`, that class is not registered or processed unless profiles 'p1' or 'p2' have been activated. If a given profile is prefixed with the NOT operator (`!`), the annotated element is registered only if the profile is not active. For example, given `@Profile({"p1", "!p2"})`, registration will occur if profile 'p1' is active or if profile 'p2' is not active.
{:style="background-color: #e9f1f6;"}

- 만약 `@Configuration` 클래스에 `@Profile` 애노테이션을 붙이게 되었을 때 해당 프로파일이 활성화되지 않는다면, 해당 클래스와 관련된 모든 `@Bean` 메소드와 `@Import`가 무시됩니다.
- 만약 `@Component`나 `@Configuration` 클래스에 `@Profile({"p1", "p2"})`와 같이 표시되었다면, 해당 클래스는 'p1' 또는 'p2' 프로파일이 활성화되지 않는다면 등록되지 않습니다.
- 만약 주어진 프로파일에 NOT 연산자(`!`)가 prefix로 붙어 있다면 해당 프로파일이 활성화되지 않은 경우에만 애노테이션이 붙은 항목이 등록되게 됩니다.
    - 예를 들어 `@Profile({"p1", "!p2"})`와 같이 되어 있다면, 프로파일 'p1'이 활성화되거나 'p2'가 활성화되지 않아야 해당 클래스에 대한 등록이 일어나게 됩니다.

>
`@Profile` can also be declared at the method level to include only one particular bean of a configuration class (for example, for alternative variants of a particular bean), as the following example shows:

`@Profile`은 다음 예제와 같이 configuration 클래스의 특정 bean을 단 하나만 포함하도록 메소드 수준에서 선언할 수도 있습니다(예: 특정 bean의 대체제).

```java
@Configuration
public class AppConfig {

    @Bean("dataSource")
    @Profile("development") // (1)
    public DataSource standaloneDataSource() {
        return new EmbeddedDatabaseBuilder()
            .setType(EmbeddedDatabaseType.HSQL)
            .addScript("classpath:com/bank/config/sql/schema.sql")
            .addScript("classpath:com/bank/config/sql/test-data.sql")
            .build();
    }

    @Bean("dataSource")
    @Profile("production") // (2)
    public DataSource jndiDataSource() throws Exception {
        Context ctx = new InitialContext();
        return (DataSource) ctx.lookup("java:comp/env/jdbc/datasource");
    }
}
```

>
- (1) The `standaloneDataSource` method is available only in the `development` profile.
- (2) The `jndiDataSource` method is available only in the `production` profile.

- (1) `standaloneDataSource` 메소드는 `development` 프로파일에서만 적용됩니다.
- (2) `jndiDataSource` 메소드는 `production` 프로파일에서만 적용됩니다.

> (i)
With `@Profile` on `@Bean` methods, a special scenario may apply: In the case of overloaded `@Bean` methods of the same Java method name (analogous to constructor overloading), a `@Profile` condition needs to be consistently declared on all overloaded methods. If the conditions are inconsistent, only the condition on the first declaration among the overloaded methods matters. Therefore, `@Profile` can not be used to select an overloaded method with a particular argument signature over another. Resolution between all factory methods for the same bean follows Spring’s constructor resolution algorithm at creation time.
>
If you want to define alternative beans with different profile conditions, use distinct Java method names that point to the same bean name by using the `@Bean` name attribute, as shown in the preceding example.
If the argument signatures are all the same (for example, all of the variants have no-arg factory methods), this is the only way to represent such an arrangement in a valid Java class in the first place (since there can only be one method of a particular name and argument signature).
{:style="background-color: #ecf1e8;"}

- (i)
    - `@Bean` 메소드에 `@Profile`을 사용하면 다음과 같은 특수한 시나리오가 적용될 수 있습니다.
        - (생성자 오버로딩처럼)똑같은 Java 메소드 이름을 가진 오버로드된 `@Bean` 메소드의 경우, `@Profile` 조건은 오버로드된 모든 메소드에 대해 일관성있게 선언되어야 합니다.
        - 만약 조건이 일치하지 않으면 오버로드된 메소드들 중에서 첫 번째 선언된 조건이 우선시됩니다.
        - 즉, `@Profile`은 특정한 시그니처를 가진 오버로드된 메소드를 선택하는 데에는 사용할 수 없습니다.
        - 같은 bean에 대한 여러 팩토리 메소드 중 하나를 선택하는 방법은 creation time의 Spring 생성자 결정 알고리즘을 따릅니다.
    - 프로파일 조건이 다른 대체제 bean을 정의하려면 위의 예와 같이 `@Bean`의 이름 속성을 사용해서 같은 bean 이름을 지시하는 고유한 java 메소드 이름을 사용하세요.
        - 만약 인자 서명이 모두 동일하다면(예: 모든 변형에 인자 없는 팩토리 메소드가 있는 경우), Java 클래스에서 첫 번째로 선언된 것을 사용하는 수 밖에 없습니다.

#### XML Bean Definition Profiles

[원문]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-definition-profiles-xml )

## 함께 읽기

- 목록으로 - [[/spring/document/core]]{Spring Core Technologies}
- 이전 문서 - [[/spring/document/core/01-12-java-based-container-config]]{1.12. Java-based Container Configuration}
- 다음 문서 - {1.14. Registering a LoadTimeWeaver}
