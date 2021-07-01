---
layout  : wiki
title   : Spring Core Technologies - 1.9. Annotation-based Container Configuration
summary : 
date    : 2021-06-30 00:11:03 +0900
updated : 2021-07-02 00:46:41 +0900
tag     : java spring
toc     : true
public  : true
parent  : [[spring-documents]]
latex   : false
---
* TOC
{:toc}

- 목록으로 - [[spring-documents-core]]{Spring Core Technologies}
- 이전 문서 - [[spring-documents-core-1-8-container-extension-points]]{1.8. Container Extension Points}
- 다음 문서 - {1.10. Classpath Scanning and Managed Components}

## 1.9. Annotation-based Container Configuration

[원문]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-annotation-config )

>
**Are annotations better than XML for configuring Spring?**
>
The introduction of annotation-based configuration raised the question of whether this approach is “better” than XML. The short answer is “it depends.” The long answer is that each approach has its pros and cons, and, usually, it is up to the developer to decide which strategy suits them better. Due to the way they are defined, annotations provide a lot of context in their declaration, leading to shorter and more concise configuration. However, XML excels at wiring up components without touching their source code or recompiling them. Some developers prefer having the wiring close to the source while others argue that annotated classes are no longer POJOs and, furthermore, that the configuration becomes decentralized and harder to control.
>
No matter the choice, Spring can accommodate both styles and even mix them together. It is worth pointing out that through its [JavaConfig]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-java ) option, Spring lets annotations be used in a non-invasive way, without touching the target components source code and that, in terms of tooling, all configuration styles are supported by the [Spring Tools for Eclipse]( https://spring.io/tools ).
{:style="background-color: #ebf2f2;"}

**Spring configuring을 할 때 XML보다 annotation을 쓰는 것이 더 좋을까요?**

애노테이션 기반의 configuration 글의 도입으로 이 방식이 XML보다 "더 나은지"에 대해 생각해 봅시다.

짧은 답변은 "상황에 따라 다릅니다" 입니다.

그리고 긴 답변은, 각각의 방법이 나름의 장단점을 갖고 있으며 일반적으로 어떤 전략이 더 적절한지 결정하는 것은 개발자의 몫이라는 것입니다.
선언방법 때문에 애노테이션은 선언 자체에 많은 컨텍스트를 제공하여 설정이 더 짧고 간결합니다.
하지만 XML은 소스코드를 건드리거나 다시 컴파일하지 않아도 컴포넌트를 연결할 수 있다는 점이 탁월합니다.
어떤 개발자들은 소스코드에 밀접한 연결(wiring)을 선호하지만, 다른 개발자들은 애노테이션이 붙은 클래스는 더 이상 POJO가 아니며 configuration이 분산되어 컨트롤하기가 더 어려워진다고 주장합니다.

어떤 선택을 하건 간에, Spring은 두 스타일을 모두 수용할 수 있으며, 섞어서 쓰는 것도 가능합니다.
`JavaConfig` 옵션을 통해 Spring은 대상 컴포넌트의 소스코드를 건드리지 않으면서 비침투적인 방법으로 애노테이션을 사용하는 것이 가능합니다.
그리고 도구 사용의 관점에서 두 스타일이 모두 STS에서 지원된다는 점도 생각해둬야 합니다.


>
An alternative to XML setup is provided by annotation-based configuration, which relies on the bytecode metadata for wiring up components instead of angle-bracket declarations. Instead of using XML to describe a bean wiring, the developer moves the configuration into the component class itself by using annotations on the relevant class, method, or field declaration. As mentioned in [Example: The AutowiredAnnotationBeanPostProcessor]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-factory-extension-bpp-examples-aabpp ), using a `BeanPostProcessor` in conjunction with annotations is a common means of extending the Spring IoC container. For example, Spring 2.0 introduced the possibility of enforcing required properties with the [@Required]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-required-annotation ) annotation. Spring 2.5 made it possible to follow that same general approach to drive Spring’s dependency injection. Essentially, the `@Autowired` annotation provides the same capabilities as described in [Autowiring Collaborators]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-factory-autowire ) but with more fine-grained control and wider applicability. Spring 2.5 also added support for JSR-250 annotations, such as `@PostConstruct` and `@PreDestroy`. Spring 3.0 added support for JSR-330 (Dependency Injection for Java) annotations contained in the `javax.inject` package such as `@Inject` and `@Named`. Details about those annotations can be found in the [relevant section]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-standard-annotations ).

XML 설정의 대안은 애노테이션 기반의 configuration입니다. 이 방법은 바이트코드 메타데이터에 의존해 컴포넌트를 연결합니다.
개발자는 XML을 작성해 bean들의 관계를 연결하는 대신, 관계된 클래스에 애노테이션을 붙이는 방법을 써서 설정을 컴포넌트 클래스로 옮기면 됩니다.

[Example: The AutowiredAnnotationBeanPostProcessor]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-factory-extension-bpp-examples-aabpp )
문서에서 언급한 바와 같이, 애노테이션과 `BeanPostProcessor`를 사용하는 방법은 Spring IoC 컨테이너를 확장하는 일반적인 방법입니다.

예를 들어 Spring 2.0 부터는 `@Required` 애노테이션으로 required properties를 적용하는 방법을 도입했습니다.
그리고 Spring 2.5는 애노테이션 방식도 Spring의 DI를 구동하기 위한 일반적인 접근 방법으로 돌아가게끔 했습니다.

기본적으로 `@Autowired` 애노테이션은 [Autowiring Collaborators]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-factory-autowire ) 문서에 설명된 것과 동일한 기능을 제공합니다. 하지만 `@Autowired`를 쓰면 더 다양한 경우에 적용이 가능하고 조금 더 세밀하게 제어하는 것도 가능합니다.

Spring 2.5부터는 `@PostConstruct`, `@PreDestroy`와 같은 JSR-250 애노테이션에 대한 지원도 추가되었습니다.

Spring 3.0부터는 `@Inject`, `@Named`와 같은 `javax.inject` 패키지에 포함된 JSR-330(Dependency Injection for Java) 애노테이션에 대한 지원이 추가되었습니다.

이러한 애노테이션들에 대한 자세한 내용은 [관련 섹션]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-standard-annotations )을 참고하세요.

> (i)
Annotation injection is performed before XML injection. Thus, the XML configuration overrides the annotations for properties wired through both approaches.
{:style="background-color: #ecf1e8;"}

- (i) 참고
    - 애노테이션 주입은 XML 주입보다 먼저 실행됩니다.
    - 따라서 두 방식을 같이 사용하게 되면 XML 설정은 애노테이션을 통한 설정을 오버라이드하게 됩니다.

>
As always, you can register the post-processors as individual bean definitions, but they can also be implicitly registered by including the following tag in an XML-based Spring configuration (notice the inclusion of the `context` namespace):

항상 그러하듯, post-processors를 개별 bean 정의로 등록하는 것도 가능하지만, XML 기반의 Spring configuration에 다음과 같은 태그를 포함하여 암묵적으로 등록하는 것도 가능합니다.(`context` namespace 포함)

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xmlns:context="http://www.springframework.org/schema/context"
    xsi:schemaLocation="http://www.springframework.org/schema/beans
        https://www.springframework.org/schema/beans/spring-beans.xsd
        http://www.springframework.org/schema/context
        https://www.springframework.org/schema/context/spring-context.xsd">

    <context:annotation-config/>

</beans>
```

>
The `<context:annotation-config/>` element implicitly registers the following post-processors:
>
- [ConfigurationClassPostProcessor]( https://docs.spring.io/spring-framework/docs/5.3.7/javadoc-api/org/springframework/context/annotation/ConfigurationClassPostProcessor.html )
- [AutowiredAnnotationBeanPostProcessor]( https://docs.spring.io/spring-framework/docs/5.3.7/javadoc-api/org/springframework/beans/factory/annotation/AutowiredAnnotationBeanPostProcessor.html )
- [CommonAnnotationBeanPostProcessor]( https://docs.spring.io/spring-framework/docs/5.3.7/javadoc-api/org/springframework/context/annotation/CommonAnnotationBeanPostProcessor.html )
- [PersistenceAnnotationBeanPostProcessor]( https://docs.spring.io/spring-framework/docs/5.3.7/javadoc-api/org/springframework/orm/jpa/support/PersistenceAnnotationBeanPostProcessor.html )
- [EventListenerMethodProcessor]( https://docs.spring.io/spring-framework/docs/5.3.7/javadoc-api/org/springframework/context/event/EventListenerMethodProcessor.html )

`<context:annotation-config/>` element 는 다음의 post-processors를 암묵적으로 등록합니다.

- [ConfigurationClassPostProcessor]( https://docs.spring.io/spring-framework/docs/5.3.7/javadoc-api/org/springframework/context/annotation/ConfigurationClassPostProcessor.html )
- [AutowiredAnnotationBeanPostProcessor]( https://docs.spring.io/spring-framework/docs/5.3.7/javadoc-api/org/springframework/beans/factory/annotation/AutowiredAnnotationBeanPostProcessor.html )
- [CommonAnnotationBeanPostProcessor]( https://docs.spring.io/spring-framework/docs/5.3.7/javadoc-api/org/springframework/context/annotation/CommonAnnotationBeanPostProcessor.html )
- [PersistenceAnnotationBeanPostProcessor]( https://docs.spring.io/spring-framework/docs/5.3.7/javadoc-api/org/springframework/orm/jpa/support/PersistenceAnnotationBeanPostProcessor.html )
- [EventListenerMethodProcessor]( https://docs.spring.io/spring-framework/docs/5.3.7/javadoc-api/org/springframework/context/event/EventListenerMethodProcessor.html )

> (i)
`<context:annotation-config/>` only looks for annotations on beans in the same application context in which it is defined. This means that, if you put `<context:annotation-config/>` in a `WebApplicationContext` for a `DispatcherServlet`, it only checks for `@Autowired` beans in your controllers, and not your services. See [The DispatcherServlet]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/web.html#mvc-servlet ) for more information.
{:style="background-color: #ecf1e8;"}

- (i) 참고
    - `<context:annotation-config/>`는 같은 애플리케이션 컨텍스트 안에서 정의된 bean에 대한 애노테이션만 찾습니다.
    - 즉 `DispatcherServlet`의 `WebApplicationContext`에 `<context:annotation-config/>`를 넣으면 서비스가 아닌 컨트롤러의 `@Autowired` bean만 체크합니다.
    - 자세한 내용은 [The DispatcherServlet]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/web.html#mvc-servlet )을 참고하세요.

### 1.9.1. @Required

[원문]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-required-annotation )

>
The `@Required` annotation applies to bean property setter methods, as in the following example:

`@Required` 애노테이션은 다음 예제와 같이 bean의 setter 메소드에 적용할 수 있습니다.

```java
public class SimpleMovieLister {

    private MovieFinder movieFinder;

    @Required
    public void setMovieFinder(MovieFinder movieFinder) {
        this.movieFinder = movieFinder;
    }

    // ...
}
```

>
This annotation indicates that the affected bean property must be populated at configuration time, through an explicit property value in a bean definition or through autowiring. The container throws an exception if the affected bean property has not been populated. This allows for eager and explicit failure, avoiding `NullPointerException` instances or the like later on. We still recommend that you put assertions into the bean class itself (for example, into an init method). Doing so enforces those required references and values even when you use the class outside of a container.

이 애노테이션은 영향을 받는 bean 프로퍼티가 configuration time에 bean definition에 명시된 값이나 autowiring을 통해서 입력되어야 한다는 것을 보여줍니다.
이런 bean 프로퍼티가 값이 입력되지 않으면 컨테이너는 예외를 던집니다.
이러한 동작을 통해 명시적이고 빠른 실패를 허용하게 되어 나중에 발생 가능한 `NullPointerException`을 예방할 수 있습니다.
가급적이면 bean 클래스 자체에 assertion을 넣는 것(예: init 메소드에라던가)을 추천합니다.
이렇게 하면 컨테이너 외부에서 클래스를 사용할 때에도 required 참조와 값이 적용됩니다.

>
The [RequiredAnnotationBeanPostProcessor]( https://docs.spring.io/spring-framework/docs/5.3.7/javadoc-api/org/springframework/beans/factory/annotation/RequiredAnnotationBeanPostProcessor.html ) must be registered as a bean to enable support for the `@Required` annotation.
{:style="background-color: #e9f1f6;"}

`@Required` 애노테이션을 사용하려면 `RequiredAnnotationBeanPostProcessor`를 bean으로 등록해야 합니다.

>
The `@Required` annotation and `RequiredAnnotationBeanPostProcessor` are formally deprecated as of Spring Framework 5.1, in favor of using constructor injection for required settings (or a custom implementation of `InitializingBean.afterPropertiesSet()` or a custom `@PostConstruct` method along with bean property setter methods).
{:style="background-color: #ecf1e8;"}

`@Required` 애노테이션과 `RequiredAnnotationBeanPostProcessor`는 Spring 프레임워크 5.1 부터는 공식적으로  deprecated 되었습니다.
required settings에 대해서는 생성자 주입(또는 `InitializingBean.afterPropertiesSet()`의 커스텀 구현이나, bean의 setter 메소드와 함께 사용하는 커스텀 `@PostConstruct` 메소드 )을 사용합니다.

### 1.9.2. Using @Autowired

[원문]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-autowired-annotation )



## 함께 읽기

- 목록으로 - [[spring-documents-core]]{Spring Core Technologies}
- 이전 문서 - [[spring-documents-core-1-8-container-extension-points]]{1.8. Container Extension Points}
- 다음 문서 - {1.10. Classpath Scanning and Managed Components}

