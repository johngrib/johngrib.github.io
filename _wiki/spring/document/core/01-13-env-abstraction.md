---
layout  : wiki
title   : Spring Core Technologies - 1.13. Environment Abstraction
summary : 
date    : 2021-07-15 22:11:59 +0900
updated : 2021-07-24 15:45:46 +0900
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

>
The XML counterpart is the `profile` attribute of the `<beans>` element. Our preceding sample configuration can be rewritten in two XML files, as follows:

XML 설정에서는 `<beans>`의 `profile` attribute가 이에 해당합니다.
위의 샘플 configuration은 다음과 같이 두 개의 XML 파일로 똑같이 설정할 수 있습니다.

```xml
<beans profile="development"
    xmlns="http://www.springframework.org/schema/beans"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xmlns:jdbc="http://www.springframework.org/schema/jdbc"
    xsi:schemaLocation="...">

    <jdbc:embedded-database id="dataSource">
        <jdbc:script location="classpath:com/bank/config/sql/schema.sql"/>
        <jdbc:script location="classpath:com/bank/config/sql/test-data.sql"/>
    </jdbc:embedded-database>
</beans>
```

```xml
<beans profile="production"
    xmlns="http://www.springframework.org/schema/beans"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xmlns:jee="http://www.springframework.org/schema/jee"
    xsi:schemaLocation="...">

    <jee:jndi-lookup id="dataSource" jndi-name="java:comp/env/jdbc/datasource"/>
</beans>
```

>
It is also possible to avoid that split and nest `<beans/>` elements within the same file, as the following example shows:

다음 예제와 같이 똑같은 파일 내에서 여러 개의 `<beans/>` 엘리먼트를 중첩(nested)시켜 만들 수도 있습니다.

```xml
<beans xmlns="http://www.springframework.org/schema/beans"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xmlns:jdbc="http://www.springframework.org/schema/jdbc"
    xmlns:jee="http://www.springframework.org/schema/jee"
    xsi:schemaLocation="...">

    <!-- other bean definitions -->

    <beans profile="development">
        <jdbc:embedded-database id="dataSource">
            <jdbc:script location="classpath:com/bank/config/sql/schema.sql"/>
            <jdbc:script location="classpath:com/bank/config/sql/test-data.sql"/>
        </jdbc:embedded-database>
    </beans>

    <beans profile="production">
        <jee:jndi-lookup id="dataSource" jndi-name="java:comp/env/jdbc/datasource"/>
    </beans>
</beans>
```

>
The `spring-bean.xsd` has been constrained to allow such elements only as the last ones in the file. This should help provide flexibility without incurring clutter in the XML files.

`spring-bean.xsd`는 파일의 마지막 element만 허용하는 제한이 있습니다.
이렇게 하면 XML 파일을 복잡하게 만들지 않고 유연하게 설정하는 데에 도움이 됩니다.

> (i)
The XML counterpart does not support the profile expressions described earlier. It is possible, however, to negate a profile by using the `!` operator. It is also possible to apply a logical “and” by nesting the profiles, as the following example shows:
>
>
> ```xml
> <beans xmlns="http://www.springframework.org/schema/beans"
>     xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
>     xmlns:jdbc="http://www.springframework.org/schema/jdbc"
>     xmlns:jee="http://www.springframework.org/schema/jee"
>     xsi:schemaLocation="...">
> 
>     <!-- other bean definitions -->
> 
>     <beans profile="production">
>         <beans profile="us-east">
>             <jee:jndi-lookup id="dataSource" jndi-name="java:comp/env/jdbc/datasource"/>
>         </beans>
>     </beans>
> </beans>
> ```
> In the preceding example, the `dataSource` bean is exposed if both the `production` and `us-east` profiles are active.
{:style="background-color: #ecf1e8;"}

- (i)
    - XML의 프로파일 기능은 위에서 설명한 프로파일 표현식을 지원하지 않습니다.
        - 하지만 `!` 연산자를 사용해 프로파일을 비활성화할 수는 있습니다.
        - 그리고 다음 예제와 같이 프로파일을 중첩시켜서 "and" 조건을 적용하는 방법도 있습니다.
    - (예제)
    - 이 예제에서 `production`과 `us-east` 프로파일이 모두 활성화된 경우 `dataSource` bean이 노출되게 됩니다.

#### Activating a Profile

[원문]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-definition-profiles-enable )

>
Now that we have updated our configuration, we still need to instruct Spring which profile is active. If we started our sample application right now, we would see a `NoSuchBeanDefinitionException` thrown, because the container could not find the Spring bean named `dataSource`.

이제 configuration을 업데이트했으므로, 어떤 프로파일을 활성화하는지 Spring에 알려줘야 합니다.
만약 지금 샘플 애플리케이션을 시작한다면 Spring이 `dataSource`라는 이름의 bean을 찾을 수 없으므로 `NoSuchBeanDefinitionException` 예외가 던져질 것입니다.

>
Activating a profile can be done in several ways, but the most straightforward is to do it programmatically against the `Environment` API which is available through an `ApplicationContext`. The following example shows how to do so:

프로파일을 활성화하는 방법은 여러 가지가 있는데, 가장 간단한 방법은 `ApplicationContext`를 통해 `Environment` API를 사용하는 프로그래밍을 하는 것입니다.
다음이 그 예제입니다.

```java
AnnotationConfigApplicationContext ctx = new AnnotationConfigApplicationContext();
ctx.getEnvironment().setActiveProfiles("development");
ctx.register(SomeConfig.class, StandaloneDataConfig.class, JndiDataConfig.class);
ctx.refresh();
```

>
In addition, you can also declaratively activate profiles through the `spring.profiles.active` property, which may be specified through system environment variables, JVM system properties, servlet context parameters in `web.xml`, or even as an entry in JNDI (see [`PropertySource` Abstraction]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-property-source-abstraction )). In integration tests, active profiles can be declared by using the `@ActiveProfiles` annotation in the `spring-test` module (see [context configuration with environment profiles]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/testing.html#testcontext-ctx-management-env-profiles )).

덧붙이자면, `spring.profiles.active` 속성을 통해 프로파일을 활성화할 수도 있습니다. 이 속성은 시스템 환경 변수, JVM system properties, `web.xml`의 servlet context parameters, JNDI(Property Source Abstraction 참고) 엔트리로 지정할 수 있습니다.

통합 테스트에서 active profiles는 `spring-test` 모듈의 `@ActiveProfiles` 애노테이션을 사용해 선언할 수 있습니다(context configuration with environment profiles 참고).

>
Note that profiles are not an “either-or” proposition. You can activate multiple profiles at once. Programmatically, you can provide multiple profile names to the `setActiveProfiles()` method, which accepts `String…` varargs. The following example activates multiple profiles:

profile은 반드시 한 번에 하나만 설정하는 것이 아닙니다. 한 번에 여러 개의 profile을 activate 할 수 있습니다.
여러 개의 profile을 `setActiveProfiles()` 메소드(`String...`을 입력으로 받음)를 통해 설정하는 것도 가능합니다.
다음 예제는 여러 개의 profile을 activate하는 것을 보여줍니다.

```java
ctx.getEnvironment().setActiveProfiles("profile1", "profile2");
```

>
Declaratively, `spring.profiles.active` may accept a comma-separated list of profile names, as the following example shows:

다음 예제와 같이 `spring.profiles.active`를 선언하는 방법도 있습니다. 콤마로 구분한 profile 이름을 적어주면 됩니다.

```
    -Dspring.profiles.active="profile1,profile2"
```

#### Default Profile

[원문]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-definition-profiles-default )

>
The default profile represents the profile that is enabled by default. Consider the following example:

`default` profile은 기본으로 활성화된 profile을 의미합니다. 다음 예제를 봅시다.

```java
@Configuration
@Profile("default")
public class DefaultDataConfig {

    @Bean
    public DataSource dataSource() {
        return new EmbeddedDatabaseBuilder()
            .setType(EmbeddedDatabaseType.HSQL)
            .addScript("classpath:com/bank/config/sql/schema.sql")
            .build();
    }
}
```

>
If no profile is active, the `dataSource` is created. You can see this as a way to provide a default definition for one or more beans. If any profile is enabled, the default profile does not apply.
>
You can change the name of the default profile by using `setDefaultProfiles()` on the `Environment` or, declaratively, by using the `spring.profiles.default` property.

만약 활성화된 profile이 아무것도 없다면, `dataSource`가 생성됩니다.
이 방법은 하나 이상의 bean에 대해 default definition을 제공하는 방법으로 생각할 수 있습니다.
만약 어떤 것이건 profile이 하나라도 활성화되어 있다면 default profile은 적용되지 않습니다.

`Environment`에서 `setDefaultProfiles()` 메소드를 사용하면 default profile을 변경할 수 있습니다.
또는 `spring.profiles.default` 속성에 값을 선언해도 default profile을 변경할 수 있습니다.

### 1.13.2. `PropertySource` Abstraction

[원문]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-property-source-abstraction )

## 함께 읽기

- 목록으로 - [[/spring/document/core]]{Spring Core Technologies}
- 이전 문서 - [[/spring/document/core/01-12-java-based-container-config]]{1.12. Java-based Container Configuration}
- 다음 문서 - {1.14. Registering a LoadTimeWeaver}

