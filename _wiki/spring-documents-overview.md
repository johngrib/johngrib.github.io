---
layout  : wiki
title   : (요약) Spring Framework Overview
summary : 스프링 철학이 이 문서에 설명되어 있다
date    : 2021-02-13 16:09:37 +0900
updated : 2021-02-13 22:34:57 +0900
tag     : spring
toc     : true
public  : true
parent  : [[spring-documents]]
latex   : false
---
* TOC
{:toc}

## 읽기 전에

이 문서는 [doc.spring.io]( https://docs.spring.io/ )에 있는 Spring Framework Overview를 읽으며 작성한 것이다.

Spring에 대한 기본적인 소개가 담겨 있으며, 문서가 길어서(?) 읽기가 귀찮다면 [3. Design Philosophy]( #3-design-philosophy )만 읽어보는 것으로도 충분하다고 생각한다.

## Spring Framework Overview

- 원문: [Spring Framework Overview]( https://docs.spring.io/spring-framework/docs/current/reference/html/overview.html )
- 버전: Spring 5.3.3

>
Spring makes it easy to create Java enterprise applications. It provides everything you need to embrace the Java language in an enterprise environment, with support for Groovy and Kotlin as alternative languages on the JVM, and with the flexibility to create many kinds of architectures depending on an application’s needs. As of Spring Framework 5.1, Spring requires JDK 8+ (Java SE 8+) and provides out-of-the-box support for JDK 11 LTS. Java SE 8 update 60 is suggested as the minimum patch release for Java 8, but it is generally recommended to use a recent patch release.

- Spring을 사용하면 Java 엔터프라이즈 애플리케이션을 쉽게 만들 수 있습니다.
- Spring은 엔터프라이즈 환경에서 Java 언어를 사용하는 데 필요한 모든 것을 제공합니다.
    - JVM의 대체 언어로 Groovy 및 Kotlin을 지원.
    - 애플리케이션의 요구 사항에 따라 다양한 종류의 아키텍처를 만들 수 있는 유연성을 제공.
- Spring Framework 5.1부터 Spring에는 JDK 8+ (Java SE 8+)가 필요하며 JDK 11 LTS에 대한 기본 지원을 제공.

>
Spring supports a wide range of application scenarios. In a large enterprise, applications often exist for a long time and have to run on a JDK and application server whose upgrade cycle is beyond developer control. Others may run as a single jar with the server embedded, possibly in a cloud environment. Yet others may be standalone applications (such as batch or integration workloads) that do not need a server.
>
Spring is open source. It has a large and active community that provides continuous feedback based on a diverse range of real-world use cases. This has helped Spring to successfully evolve over a very long time.

- Spring은 광범위한 애플리케이션 시나리오를 지원합니다.
    1. 대기업: 장시간 동안 가동, JDK 기반, 개발자의 제어를 넘어선 업그레이드 사이클이 필요한 애플리케이션 서버.
    2. 클라우드 환경 등에서 서버가 내장된 jar 하나로 실행하는 것.
    3. 배치나 통합 워크로드처럼 서버가 필요없는 독립형 애플리케이션.
- Spring은 오픈 소스입니다.
    - 매우 크고 활동적인 커뮤니티가 있고, 커뮤니티 기반으로 성공적으로 발전해왔음.

## 1. What We Mean by "Spring"

**Spring 단어의 의미**

>
The term "Spring" means different things in different contexts. It can be used to refer to the Spring Framework project itself, which is where it all started. Over time, other Spring projects have been built on top of the Spring Framework. Most often, when people say "Spring", they mean the entire family of projects. This reference documentation focuses on the foundation: the Spring Framework itself.

- Spring 용어의 의미.
    - 모든 것이 시작된 Spring Framework 자체.
    - 시간이 흐르면서 다른 스프링 프로젝트들이 Spring Framework 위에 빌드되었음.
    - 사람들이 일반적으로 "스프링"이라 말하는 것은 이 프로젝트 전체를 의미하는 것.
    - 이 문서는 기초가 되는 Spring Framework 자체에 초점을 맞추고 있음.

>
The Spring Framework is divided into modules. Applications can choose which modules they need. At the heart are the modules of the core container, including a configuration model and a dependency injection mechanism. Beyond that, the Spring Framework provides foundational support for different application architectures, including messaging, transactional data and persistence, and web. It also includes the Servlet-based Spring MVC web framework and, in parallel, the Spring WebFlux reactive web framework.

- Spring Framework는 여러 개의 모듈로 나뉩니다.
    - 애플리케이션은 필요한 모듈을 선택할 수 있음.
    - 핵심 모듈은 구성 모델(configuration model)과 의존관계 주입 메커니즘(dependency injection mechanism)을 포함하고 있는 core container 모듈.
    - 그 외에도 Spring Framework는 다양한 애플리케이션 아키텍처에 대한 기본 지원을 제공.

>
A note about modules: Spring’s framework jars allow for deployment to JDK 9’s module path ("Jigsaw"). For use in Jigsaw-enabled applications, the Spring Framework 5 jars come with "Automatic-Module-Name" manifest entries which define stable language-level module names ("spring.core", "spring.context" etc) independent from jar artifact names (the jars follow the same naming pattern with "-" instead of ".", e.g. "spring-core" and "spring-context"). Of course, Spring’s framework jars keep working fine on the classpath on both JDK 8 and 9+.

- 모듈에 대한 참고 사항
    - 스프링의 프레임워크 jar 파일들은 JDK 8의 module path(Jigsaw)에 배포할 수 있다.
    - Jigsaw를 사용 가능한 애플리케이션에서 사용하기 위해 Spring Framework 5 jar에는 Automatic-Module-Name 매니페스트 엔트리가 함께 제공된다.
    - 물론 Spring Framework jar 파일들을 JDK 8, 9+ 의 classpath 에서도 문제 없이 작동한다.

## 2. History of Spring and the Spring Framework

**Spring과 Spring Framework의 역사**

>
Spring came into being in 2003 as a response to the complexity of the early J2EE specifications. While some consider Java EE and Spring to be in competition, Spring is, in fact, complementary to Java EE. The Spring programming model does not embrace the Java EE platform specification; rather, it integrates with carefully selected individual specifications from the EE umbrella:
>
- Servlet API ([JSR 340]( https://jcp.org/en/jsr/detail?id=340 ))
- WebSocket API ([JSR 356]( https://www.jcp.org/en/jsr/detail?id=356 ))
- Concurrency Utilities ([JSR 236]( https://www.jcp.org/en/jsr/detail?id=236 ))
- JSON Binding API ([JSR 367]( https://jcp.org/en/jsr/detail?id=367 ))
- Bean Validation ([JSR 303]( https://jcp.org/en/jsr/detail?id=303 ))
- JPA ([JSR 338]( https://jcp.org/en/jsr/detail?id=338 ))
- JMS ([JSR 914]( https://jcp.org/en/jsr/detail?id=914 ))
- as well as JTA/JCA setups for transaction coordination, if necessary.

- Spring은 초기 J2EE 사양의 복잡성에 대한 대응으로 2003 년에 시작되었습니다.
- Java EE와 Spring이 경쟁관계라고 생각하는 사람도 있지만, 실제로는 Spring은 Java EE를 보완하는 관계.
- Spring 프로그래밍 모델은 Java EE 플랫폼 스펙을 수용하지 않으며, EE umbrella에서 엄선된 개별 스펙을 통합.

>
The Spring Framework also supports the Dependency Injection ([JSR 330]( https://www.jcp.org/en/jsr/detail?id=330 )) and Common Annotations ([JSR 250]( https://jcp.org/en/jsr/detail?id=250 )) specifications, which application developers may choose to use instead of the Spring-specific mechanisms provided by the Spring Framework.

- 또한 Spring Framework는 의존성 주입(Dependency Injection ([JSR 330]( https://www.jcp.org/en/jsr/detail?id=330 ))과 공통 Annotations([JSR 250]( https://jcp.org/en/jsr/detail?id=250 )) 스펙을 지원.

> As of Spring Framework 5.0, Spring requires the Java EE 7 level (e.g. Servlet 3.1+, JPA 2.1+) as a minimum - while at the same time providing out-of-the-box integration with newer APIs at the Java EE 8 level (e.g. Servlet 4.0, JSON Binding API) when encountered at runtime. This keeps Spring fully compatible with e.g. Tomcat 8 and 9, WebSphere 9, and JBoss EAP 7.

- Spring Framework 5.0 조건들.

>
Over time, the role of Java EE in application development has evolved. In the early days of Java EE and Spring, applications were created to be deployed to an application server. Today, with the help of Spring Boot, applications are created in a devops- and cloud-friendly way, with the Servlet container embedded and trivial to change. As of Spring Framework 5, a WebFlux application does not even use the Servlet API directly and can run on servers (such as Netty) that are not Servlet containers.

- 시간이 흐르며, 애플리케이션 개발에서 Java EE의 역할이 발전.
- Java EE 및 Spring 초기에는 애플리케이션 하나를 만들면 하나의 애플리케이션 서버에 배포했는데,
    - 요즘은 Spring Boot를 써서 DevOps와 클라우드 친화적인 방식으로 애플리케이션을 만듭니다.
    - 그리고 애플리케이션에 Servlet 컨테이너가 내장되어 있음.
    - Spring Framework 5부터 WebFlux 애플리케이션은 Servlet API를 직접 사용하지 않으며 Servlet 컨테이너가 아닌 서버(예: Netty)에서도 실행할 수 있음.

>
Spring continues to innovate and to evolve. Beyond the Spring Framework, there are other projects, such as Spring Boot, Spring Security, Spring Data, Spring Cloud, Spring Batch, among others. It’s important to remember that each project has its own source code repository, issue tracker, and release cadence. See spring.io/projects for the complete list of Spring projects.

- Spring은 계속해서 혁신하고 진화합니다.
- Spring Framework 외에도 Spring Boot, Spring Security, SpringData, Spring Cloud, Spring Batch 등과 같은 다른 프로젝트가 있다.
- 각 프로젝트에는 자체 소스 코드 repository, 이슈 트래커, 및 릴리즈 주기가 있다는 점을 기억해두자.
- Spring 프로젝트의 전체 목록은 [spring.io/projects]( https://spring.io/projects )를 참고할 것.

## 3. Design Philosophy

**설계 철학**

>
When you learn about a framework, it's important to know not only what it does but what principles it follows. Here are the guiding principles of the Spring Framework:
>
- Provide choice at every level. Spring lets you defer design decisions as late as possible. For example, you can switch persistence providers through configuration without changing your code. The same is true for many other infrastructure concerns and integration with third-party APIs.
- Accommodate diverse perspectives. Spring embraces flexibility and is not opinionated about how things should be done. It supports a wide range of application needs with different perspectives.
- Maintain strong backward compatibility. Spring’s evolution has been carefully managed to force few breaking changes between versions. Spring supports a carefully chosen range of JDK versions and third-party libraries to facilitate maintenance of applications and libraries that depend on Spring.
- Care about API design. The Spring team puts a lot of thought and time into making APIs that are intuitive and that hold up across many versions and many years.
- Set high standards for code quality. The Spring Framework puts a strong emphasis on meaningful, current, and accurate javadoc. It is one of very few projects that can claim clean code structure with no circular dependencies between packages.

스프링 프레임워크의 기본 원칙들.

- **모든 레벨에서 선택권을 제공한다.** Spring을 쓰면 설계에 대한 결정을 최대한 나중으로 미룰 수 있다. 예를 들어 개발자가 작성한 코드를 수정하지 않아도, 설정(configuration)을 바꾸는 것만으로 persistence providers를 교체할 수 있다. 다른 많은 인프라 문제, 서드 파티 API와의 통합에서도 이 원칙은 통한다.
- **다양한 관점을 수용한다.** Spring은 유연성(flexibility)을 포용하며, 업무를 완수하는 방법에 대해 특별히 강제하지 않는다. 그렇기 때문에 Spring은 다양한 관점을 가진 애플리케이션의 요구 사항을 서포트할 수 있다.
- **강력한 과거 버전 호환성.**
- **API 디자인에 심혈을 기울인다.** Spring 팀은 열심히 고민하고 많은 시간을 들여 직관적인 API를 만들려 노력하며, 오랫동안 유지될 수 있게 하려 한다.
- **코드 품질에 대한 높은 기준.** Spring Framework는 Javadoc에 대해 의미있고, 정확하며, 최신의 정보를 담으려 한다. Spring Framework는 각 패키지 사이에 순환 의존관계가 없는 깨끗한 코드 구조를 가진 몇 안 되는 프로젝트 중 하나이다.

## 4. Feedback and Contributions

>
For how-to questions or diagnosing or debugging issues, we suggest using Stack Overflow. Click here for a list of the suggested tags to use on Stack Overflow. If you’re fairly certain that there is a problem in the Spring Framework or would like to suggest a feature, please use the GitHub Issues.
>
If you have a solution in mind or a suggested fix, you can submit a pull request on Github. However, please keep in mind that, for all but the most trivial issues, we expect a ticket to be filed in the issue tracker, where discussions take place and leave a record for future reference.
>
For more details see the guidelines at the CONTRIBUTING, top-level project page.

- 질문할 것이 있다면 stack overflow를 사용할 것.
    - [stack overflow 추천 태그]( https://stackoverflow.com/questions/tagged/spring+or+spring-mvc+or+spring-aop+or+spring-jdbc+or+spring-r2dbc+or+spring-transactions+or+spring-annotations+or+spring-jms+or+spring-el+or+spring-test+or+spring+or+spring-remoting+or+spring-orm+or+spring-jmx+or+spring-cache+or+spring-webflux+or+spring-rsocket?tab=Newest )
- Spring Framework에 문제가 있다고 확신하거나 기능을 제안하려면 [GitHub Issues]( https://github.com/spring-projects/spring-framework/issues )에 남길 것.
- 뭔가 솔루션이 있거나 수정 제안할 것이 있다면 Github에서 pull request를 날리세요.
    - 그러나 문제에 대해 논의하고, 나중에 참조할 수 있도록 이슈 트래커에 티켓을 제출해주시면 좋겠습니다.
- 자세한 가이드라인은 프로젝트 페이지 최상단에 있는 [CONTRIBUTING]( https://github.com/spring-projects/spring-framework/blob/master/CONTRIBUTING.md ) 가이드 문서를 읽어보세요.

## 5. Getting Started

>
If you are just getting started with Spring, you may want to begin using the Spring Framework by creating a Spring Boot-based application. Spring Boot provides a quick (and opinionated) way to create a production-ready Spring-based application. It is based on the Spring Framework, favors convention over configuration, and is designed to get you up and running as quickly as possible.

- Spring을 이제 막 시작했다면, [Spring Boot]( https://projects.spring.io/spring-boot/ ) 기반 애플리케이션을 생성해서 Spring Framework를 사용할 수 있습니다.
- Spring Boot을 쓰면 production-ready 스프링 애플리케이션을 빠르게 만들 수 있습니다.
- Spring Boot는 Spring Framework를 기반으로 하고 관례적인 설정(configuration)이 되어 있어, 최대한 빨리 돌려볼 수 있도록 되어 있습니다.

>
You can use [start.spring.io]( https://start.spring.io/ ) to generate a basic project or follow one of the ["Getting Started" guides]( https://spring.io/guides ), such as [Getting Started Building a RESTful Web Service]( https://spring.io/guides/gs/rest-service/ ). As well as being easier to digest, these guides are very task focused, and most of them are based on Spring Boot. They also cover other projects from the Spring portfolio that you might want to consider when solving a particular problem.

- [start.spring.io]( https://start.spring.io/ )를 사용해서 기본 프로젝트를 생성할 수 있습니다.
- 또는 ["Getting Started" guides]( https://spring.io/guides )나, [Getting Started Building a RESTful Web Service]( https://spring.io/guides/gs/rest-service/ ) 가이드를 따라하는 방법도 있습니다.
- 위의 두 가이드는 이해하기 쉽고, 작업에 중점을 두고 있으며, Spring Boot를 기반으로 합니다.
    - 또한 특정 문제를 해결할 때 생각해 볼 수 있는 Spring 포트폴리오의 다른 프로젝트도 다룹니다.

