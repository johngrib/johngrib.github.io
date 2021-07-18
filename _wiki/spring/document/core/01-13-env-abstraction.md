---
layout  : wiki
title   : Spring Core Technologies - 1.13. Environment Abstraction
summary : 
date    : 2021-07-15 22:11:59 +0900
updated : 2021-07-18 22:35:15 +0900
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

## 함께 읽기

- 목록으로 - [[/spring/document/core]]{Spring Core Technologies}
- 이전 문서 - [[/spring/document/core/01-12-java-based-container-config]]{1.12. Java-based Container Configuration}
- 다음 문서 - {1.14. Registering a LoadTimeWeaver}

