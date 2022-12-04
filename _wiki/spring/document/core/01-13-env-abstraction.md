---
layout  : wiki
title   : Spring Core Technologies - 1.13. Environment Abstraction
summary : 
date    : 2021-07-15 22:11:59 +0900
updated : 2021-07-24 19:45:36 +0900
tag     : java spring
resource: 65/DB1D1B-7866-4C3A-97DB-3F3164F03F4F
toc     : true
public  : true
parent  : [[/spring/document/core]]
latex   : false
---
* TOC
{:toc}

- 목록으로 - [[/spring/document/core]]
- 이전 문서 - [[/spring/document/core/01-12-java-based-container-config]]
- 다음 문서 - [[/spring/document/core/01-14-reg-loadtimeweaver]]

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

>
Spring’s `Environment` abstraction provides search operations over a configurable hierarchy of property sources. Consider the following listing:

Spring의 `Environment` 추상화는 설정할 수 있는 계층 구조의 속성값 소스에 대한 검색 기능을 제공합니다.

```java
ApplicationContext ctx = new GenericApplicationContext();
Environment env = ctx.getEnvironment();
boolean containsMyProperty = env.containsProperty("my-property");
System.out.println("Does my environment contain the 'my-property' property? " + containsMyProperty);
```

>
In the preceding snippet, we see a high-level way of asking Spring whether the `my-property` property is defined for the current environment. To answer this question, the `Environment` object performs a search over a set of [`PropertySource`]( https://docs.spring.io/spring-framework/docs/5.3.7/javadoc-api/org/springframework/core/env/PropertySource.html ) objects. A `PropertySource` is a simple abstraction over any source of key-value pairs, and Spring’s [`StandardEnvironment`]( https://docs.spring.io/spring-framework/docs/5.3.7/javadoc-api/org/springframework/core/env/StandardEnvironment.html ) is configured with two PropertySource objects — one representing the set of JVM system properties (`System.getProperties()`) and one representing the set of system environment variables (`System.getenv()`).

위의 코드는 현재 환경에 `my-property` 속성값이 정의되어 있는지를 Spring에 물어보는 고수준 방법이라 할 수 있습니다.
이 질문에 대답하기 위해 `Environment` 객체는 `PropertySource` 객체 집합에 대해 검색 작업을 하게 됩니다.
`PropertySource`는 키와 값이 쌍을 이루는 모든 종류의 소스를 간단히 추상화한 것이며, Spring의 `StandardEnvironment`는 두 개의 `PropertySource` 객체로 이루어져 있습니다.
둘 중 하나는 JVM system properties(`System.getProperties()`)를 나타내고, 다른 하나는 system environment variables(`System.getenv()`) 입니다.

> (i)
These default property sources are present for `StandardEnvironment`, for use in standalone applications. [`StandardServletEnvironment`]( https://docs.spring.io/spring-framework/docs/5.3.7/javadoc-api/org/springframework/web/context/support/StandardServletEnvironment.html ) is populated with additional default property sources including servlet config and servlet context parameters. It can optionally enable a [`JndiPropertySource`]( https://docs.spring.io/spring-framework/docs/5.3.7/javadoc-api/org/springframework/jndi/JndiPropertySource.html ). See the javadoc for details.
{:style="background-color: #ecf1e8;"}

- (i)
    - 이런 default property 소스들은 standalone 애플리케이션에서 사용할 수 있도록 `StandardEnvironment`로 제공됩니다.
    - `StandardServletEnvironment`는 여기에 servlet config와 servlet context parameters를 포함하고 있는 default property 소스를 추가한 것입니다. 그리고 선택적으로 `JndiPropertySource`를 활성화하는 것도 가능합니다. 자세한 내용은 `StandardServletEnvironment`의 javadoc을 참고하세요.

>
Concretely, when you use the `StandardEnvironment`, the call to `env.containsProperty("my-property")` returns true if a `my-property` system property or `my-property` environment variable is present at runtime.

구체적으로 설명하자면, `StandardEnvironment`를 사용하고 있을 때 `env.containsProperty("my-property")`를 호출하면 다음 경우에 대해 true를 리턴합니다.

- `my-property`가 시스템 property인 경우
- `my-property`가 현재 런타임의 환경 변수인 경우


>
The search performed is hierarchical. By default, system properties have precedence over environment variables. So, if the `my-property` property happens to be set in both places during a call to `env.getProperty("my-property")`, the system property value “wins” and is returned. Note that property values are not merged but rather completely overridden by a preceding entry.
>
For a common `StandardServletEnvironment`, the full hierarchy is as follows, with the highest-precedence entries at the top:
>
1. ServletConfig parameters (if applicable — for example, in case of a `DispatcherServlet` context)
2. ServletContext parameters (web.xml context-param entries)
3. JNDI environment variables (`java:comp/env/` entries)
4. JVM system properties (`-D` command-line arguments)
5. JVM system environment (operating system environment variables)
{:style="background-color: #e9f1f6;"}

- 검색 작업은 계층구조에 맞춰 진행됩니다.
- 기본적으로, 시스템 프로퍼티는 환경 변수보다 더 높은 우선순위를 갖습니다.
- 따라서 `env.getProperty("my-property")`를 호출했을 때 `my-property`가 두 군데에 모두 설정되어 있다면, 더 높은 우선순위를 가진 system property가 리턴됩니다.
- property 값이 합쳐지는 일은 발생하지 않으며, 더 우선하는 항목에 의해 오버라이드 된다는 점이 중요합니다.
- 일반적인 `StandardServletEnvironment`의 계층 구조 전체를 우선순위 순으로 나열하자면 다음과 같습니다.
    1. ServletConfig parameters (해당되는 예: `DispatcherServlet` context)
    2. ServletContext parameters (web.xml context-param entries)
    3. JNDI environment variables (`java:comp/env/` entries)
    4. JVM system properties (`-D` 커맨드 라인 arguments)
    5. JVM system environment (운영체제 environment variables)

>
Most importantly, the entire mechanism is configurable. Perhaps you have a custom source of properties that you want to integrate into this search. To do so, implement and instantiate your own `PropertySource` and add it to the set of `PropertySources` for the current `Environment`. The following example shows how to do so:

이러한 전체 메커니즘을 config할 수 있다는 점이 가장 중요합니다.
이런 검색 작업에 특정한 커스텀 소스를 추가하려는 사용자 요구가 있을 수 있기 때문입니다.
그렇게 하려면 커스텀 소스로서 `PropertySource`를 구현하고 인스턴스화한 다음, 현재 환경의 `PropertySource` set에 추가하면 됩니다.
다음 예제를 봅시다.


```java
ConfigurableApplicationContext ctx = new GenericApplicationContext();
MutablePropertySources sources = ctx.getEnvironment().getPropertySources();
sources.addFirst(new MyPropertySource());
```

>
In the preceding code, `MyPropertySource` has been added with highest precedence in the search. If it contains a `my-property` property, the property is detected and returned, in favor of any `my-property` property in any other `PropertySource`. The [`MutablePropertySources`]( https://docs.spring.io/spring-framework/docs/5.3.7/javadoc-api/org/springframework/core/env/MutablePropertySources.html ) API exposes a number of methods that allow for precise manipulation of the set of property sources.

위의 코드에서 `MyPropertySource`는 검색 작업에 가장 높은 우선순위로 추가되었습니다.
만약 `MyPropertySource`에 `my-property` 프로퍼티가 포함되어 있다면 `my-property` 속성을 찾으려 할 때 해당 값이 다른 `PropertySource`에 있는 값보다 우선적으로 감지되어 리턴되게 됩니다.
`MutablePropertySources` API는 property sources를 상세하게 조작할 수 있는 다양한 메소드를 제공합니다.

### 1.13.3. Using `@PropertySource`

[원문]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-using-propertysource )

>
The [`@PropertySource`]( https://docs.spring.io/spring-framework/docs/5.3.7/javadoc-api/org/springframework/context/annotation/PropertySource.html ) annotation provides a convenient and declarative mechanism for adding a `PropertySource` to Spring’s `Environment`.
>
Given a file called `app.properties` that contains the key-value pair `testbean.name=myTestBean`, the following `@Configuration` class uses `@PropertySource` in such a way that a call to `testBean.getName()` returns `myTestBean`:

`@PropertySource` 애노테이션은 Spring의 `Environment`에 `PropertySource`를 선언적으로 편리하게 추가하는 메커니즘을 제공합니다.

`app.properties`라는 파일이 주어졌다고 했을 때, 이 파일에 `testbean.name=myTestBean`라는 key-value가 포함되어 있다고 합시다.
다음의 `@Configuration` 클래스에서는 이 파일의 값을 가져오기 위해 `@PropertySource`를 사용하고 있습니다.
따라서 `testBean.getName()`를 호출하면 `myTestBean`이 리턴됩니다.

```java
@Configuration
@PropertySource("classpath:/com/myco/app.properties")
public class AppConfig {

    @Autowired
    Environment env;

    @Bean
    public TestBean testBean() {
        TestBean testBean = new TestBean();
        testBean.setName(env.getProperty("testbean.name"));
        return testBean;
    }
}
```

>
Any `${…}` placeholders present in a `@PropertySource` resource location are resolved against the set of property sources already registered against the environment, as the following example shows:

`@PropertySource` 리소스의 위치에 있는 모든 `${...}` placeholder는 이미 환경에 등록되어 있는 property sources 집합에서 값을 찾습니다.

```java
@Configuration
@PropertySource("classpath:/com/${my.placeholder:default/path}/app.properties")
public class AppConfig {

    @Autowired
    Environment env;

    @Bean
    public TestBean testBean() {
        TestBean testBean = new TestBean();
        testBean.setName(env.getProperty("testbean.name"));
        return testBean;
    }
}
```

>
Assuming that `my.placeholder` is present in one of the property sources already registered (for example, system properties or environment variables), the placeholder is resolved to the corresponding value. If not, then `default/path` is used as a default. If no default is specified and a property cannot be resolved, an `IllegalArgumentException` is thrown.

`my.placeholder`가 이미 등록 완료된 property source 중에 있다고 전제하면(예를 들어 시스템 프로퍼티나, 환경 변수), placeholder는 해당 값을 찾아 확인을 마칩니다.
하지만 등록이 되어 있지 않다면 `default/path`가 기본값으로 사용됩니다.
만약 기본값이 지정되어 있지 않고 property를 찾을 수 없다면 `IllegalArgumentException` 예외가 던져집니다.

> (i)
The `@PropertySource` annotation is repeatable, according to Java 8 conventions. However, all such `@PropertySource` annotations need to be declared at the same level, either directly on the configuration class or as meta-annotations within the same custom annotation. Mixing direct annotations and meta-annotations is not recommended, since direct annotations effectively override meta-annotations.
1.13.4. Placeholder Resolution in Statements
{:style="background-color: #ecf1e8;"}

- (i)
    - Java 8 컨벤션에 따라 `@PropertySource` 애노테이션은 반복적으로 사용할 수 있습니다.
    - 그러나 이러한 모든 `@PropertySource` 애노테이션들은 configuration 클래스에서 직접 사용하거나, 또는 같은 커스텀 애노테이션 내에 붙인 메타 애노테이션으로 같은 레벨로 선언되어야 합니다.
    - 이 애노테이션을 직접 붙이는 방법과 메타 애노테이션을 쓰는 방법이 뒤섞이는 것은 권장하지 않습니다.
        - 직접 쓰는 방법이 메타 애노테이션을 오버라이드하기 때문입니다.

### 1.13.4. Placeholder Resolution in Statements

[원문]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-placeholder-resolution-in-statements )

>
Historically, the value of placeholders in elements could be resolved only against JVM system properties or environment variables. This is no longer the case. Because the `Environment` abstraction is integrated throughout the container, it is easy to route resolution of placeholders through it. This means that you may configure the resolution process in any way you like. You can change the precedence of searching through system properties and environment variables or remove them entirely. You can also add your own property sources to the mix, as appropriate.

역사적으로 element에 지정된 placeholder 값은 JVM system properties 또는 환경 변수만 사용이 가능했지만, 이제는 바뀌었습니다.
왜냐하면 `Environment` 추상화가 컨테이너 전체에 통합되어서, placeholder를 찾는 것도 쉽게 라우팅할 수 있기 때문입니다.
즉, 여러분이 원하는 방법으로 resolution 프로세스를 구성할 수 있는 것입니다.
system properties와 environment variables를 통한 검색 우선순위를 변경하거나 제거하는 것도 가능합니다.
필요하다면 여러분이 직접 정의한 property source를 이런 조합에 추가할 수도 있습니다.

>
Concretely, the following statement works regardless of where the `customer` property is defined, as long as it is available in the `Environment`:

구체적으로 살펴보자면, 아래의 예제는  `Environment`를 사용할 수만 있다면 `customer` property가 어디에 정의되었는지에 관계 없이 작동합니다.

```xml
<beans>
    <import resource="com/bank/service/${customer}-config.xml"/>
</beans>
```


## 함께 읽기

- 목록으로 - [[/spring/document/core]]
- 이전 문서 - [[/spring/document/core/01-12-java-based-container-config]]
- 다음 문서 - [[/spring/document/core/01-14-reg-loadtimeweaver]]

