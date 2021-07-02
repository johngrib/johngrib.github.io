---
layout  : wiki
title   : Spring Core Technologies - 1.9. Annotation-based Container Configuration
summary : 
date    : 2021-06-30 00:11:03 +0900
updated : 2021-07-02 22:55:04 +0900
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

> (i)
JSR 330’s `@Inject` annotation can be used in place of Spring’s `@Autowired` annotation in the examples included in this section. See [here]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-standard-annotations ) for more details.
{:style="background-color: #ecf1e8;"}

- (i) 참고
    - 이 섹션의 예제에 등장하는 `@Autowired` 애노테이션은 JSR 300의 `@Inject` 애노테이션으로 바꿔서 사용하는 것이 가능합니다.
    - 자세한 내용은 [이 문서]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-standard-annotations )를 참고하세요.

>
You can apply the `@Autowired` annotation to constructors, as the following example shows:

다음 예제와 같이 `@Autowired` 애노테이션을 생성자에 적용할 수 있습니다.

```java
public class MovieRecommender {

    private final CustomerPreferenceDao customerPreferenceDao;

    @Autowired
    public MovieRecommender(CustomerPreferenceDao customerPreferenceDao) {
        this.customerPreferenceDao = customerPreferenceDao;
    }

    // ...
}
```

> (i)
As of Spring Framework 4.3, an `@Autowired` annotation on such a constructor is no longer necessary if the target bean defines only one constructor to begin with. However, if several constructors are available and there is no primary/default constructor, at least one of the constructors must be annotated with `@Autowired` in order to instruct the container which one to use. See the discussion on [constructor resolution]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-autowired-annotation-constructor-resolution ) for details.
{:style="background-color: #ecf1e8;"}

- (i) 참고
    - Spring 프레임워크 4.3 부터는 대상 bean이 딱 하나의 생성자만 정의된 경우에 한해서 `@Autowired` 애노테이션을 붙일 필요가 없습니다.
    - 하지만 여러 생성자가 정의되어 있고, primary/default 생성자가 없다면 컨테이너가 어떤 생성자를 사용할지를 지정해주기 위해 생성자 중 하나 이상에 `@Autowired` 애노테이션을 붙여줘야 합니다.
    - 자세한 내용은 [constructor resolution]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-autowired-annotation-constructor-resolution ) 문서를 참고하세요.

>
You can also apply the `@Autowired` annotation to _traditional_ setter methods, as the following example shows:

다음 예제와 같이 `@Autowired` 애노테이션을 전통적인 setter 메소드에 붙여줄 수도 있습니다.

```java
public class SimpleMovieLister {

    private MovieFinder movieFinder;

    @Autowired
    public void setMovieFinder(MovieFinder movieFinder) {
        this.movieFinder = movieFinder;
    }

    // ...
}
```

>
You can also apply the annotation to methods with arbitrary names and multiple arguments, as the following example shows:

다음 예제와 같이 여러 개의 인수를 가진 임의의 이름의 메소드에 적용할 수도 있습니다.

```java
public class MovieRecommender {

    private MovieCatalog movieCatalog;

    private CustomerPreferenceDao customerPreferenceDao;

    @Autowired
    public void prepare(MovieCatalog movieCatalog,
            CustomerPreferenceDao customerPreferenceDao) {
        this.movieCatalog = movieCatalog;
        this.customerPreferenceDao = customerPreferenceDao;
    }

    // ...
}
```

>
You can apply `@Autowired` to fields as well and even mix it with constructors, as the following example shows:

다음 예제와 같이 `@Autowired`를 필드에 적용하는 방법과 생성자에 적용하는 방법을 같이 쓸 수도 있습니다.

```java
public class MovieRecommender {

    private final CustomerPreferenceDao customerPreferenceDao;

    @Autowired
    private MovieCatalog movieCatalog;

    @Autowired
    public MovieRecommender(CustomerPreferenceDao customerPreferenceDao) {
        this.customerPreferenceDao = customerPreferenceDao;
    }

    // ...
}
```

>
Make sure that your target components (for example, `MovieCatalog` or `CustomerPreferenceDao`) are consistently declared by the type that you use for your `@Autowired`-annotated injection points. Otherwise, injection may fail due to a "no type match found" error at runtime.
>
For XML-defined beans or component classes found via classpath scanning, the container usually knows the concrete type up front. However, for `@Bean` factory methods, you need to make sure that the declared return type is sufficiently expressive. For components that implement several interfaces or for components potentially referred to by their implementation type, consider declaring the most specific return type on your factory method (at least as specific as required by the injection points referring to your bean).
{:style="background-color: #e9f1f6;"}

- 여러분의 타깃 컴포넌트(예를 들어 `MovieCatalog`나 `CustomerPreferenceDao`)가 `@Autowired` 애노테이션을 통한 주입 지점에서 사용하는 타입으로 일관성있게 여러 곳에서 선언되었는지 확인해보세요.
    - 그렇지 않다면 런타임에 "no type match found" 에러가 발생해 주입이 실패할 수 있습니다.
- classpath 스캔을 통해 찾은 XML로 정의된 bean이나 컴포넌트 클래스의 경우, 일반적으로 컨테이너는 해당 클래스들의 구체 타입들을 이미 알고 있습니다.
    - 하지만 `@Bean` 팩토리 메소드의 경우 명시된 리턴 타입이 충분히 명확한지를 확인해봐야 합니다.
    - 여러 인터페이스를 구현하는 컴포넌트나, 그러한 구현 타입들에 의해 암묵적으로 참조되고 있는 컴포넌트의 경우 팩토리 메소드에서 가장 구체적인 리턴 타입을 선언해주는 것이 좋습니다.
        - (최소한 bean을 참조하는 주입 지점에서 필수(required)적이라는 표시를 명시해줍시다.)

>
You can also instruct Spring to provide all beans of a particular type from the `ApplicationContext` by adding the `@Autowired` annotation to a field or method that expects an array of that type, as the following example shows:

다음 예제와 같이 특정 타입의 배열을 예상하는 필드나 메소드에 `@Autowired` 애노테이션을 추가하여 `ApplicationContext`에서 특정 타입의 모든 bean을 제공하도록 Spring에 지시할 수도 있습니다.

```java
public class MovieRecommender {

    @Autowired
    private MovieCatalog[] movieCatalogs;

    // ...
}
```

>
The same applies for typed collections, as the following example shows:

다음 예제와 같이 타입이 지정된 컬렉션에도 똑같이 적용할 수 있습니다.

```java
public class MovieRecommender {

    private Set<MovieCatalog> movieCatalogs;

    @Autowired
    public void setMovieCatalogs(Set<MovieCatalog> movieCatalogs) {
        this.movieCatalogs = movieCatalogs;
    }

    // ...
}
```

>
Your target beans can implement the `org.springframework.core.Ordered` interface or use the `@Order` or standard `@Priority` annotation if you want items in the array or list to be sorted in a specific order. Otherwise, their order follows the registration order of the corresponding target bean definitions in the container.
>
You can declare the `@Order` annotation at the target class level and on `@Bean` methods, potentially for individual bean definitions (in case of multiple definitions that use the same bean class). `@Order` values may influence priorities at injection points, but be aware that they do not influence singleton startup order, which is an orthogonal concern determined by dependency relationships and `@DependsOn` declarations.
>
Note that the standard `javax.annotation.Priority` annotation is not available at the `@Bean` level, since it cannot be declared on methods. Its semantics can be modeled through `@Order` values in combination with `@Primary` on a single bean for each type.
{:style="background-color: #e9f1f6;"}

- 여러분의 타깃 bean에 대해 배열 또는 리스트의 아이템을 특정 순서로 정렬하려 한다면 `org.springframework.core.Ordered` 인터페이스를 구현하거나, `@Order` 애노테이션을 쓰거나, 표준의 `@Priority` 애노테이션을 쓸 수 있습니다.
- 잠재적인 개별 bean 정의들에 대해 타깃 클래스 레벨과 `@Bean` 메소드에 `@Order` 애노테이션을 붙일 수 있습니다. (같은 bean 클래스를 사용하는 여러 definition의 경우)
    - `@Order` 값은 주입 지점의 우선순위에 영향을 줄 수 있지만, 의존관계 정의와 `@DependsOn` 선언에 의해 결정되는 싱글톤 시작 순서에는 영향을 주지 않습니다.
- 표준 `javax.annotation.Priority` 애노테이션은 `@Bean`레벨에서는 선언할 수 없습니다. 메소드에 선언할 수 없기 때문입니다.
    - `@Priority` 애노테이션은 각 타입에 대한 단일 bean에서 `@Primary`와 `@Order` 값을 조합한 모델이라는 의미를 갖습니다.

>
Even typed `Map` instances can be autowired as long as the expected key type is `String`. The map values contain all beans of the expected type, and the keys contain the corresponding bean names, as the following example shows:

키 타입이 `String`인 `Map` 인스턴스도 autowired가 가능합니다.
다음 예제와 같이 하면 map 의 key로는 bean의 이름들이 들어가고, value로는 해당 타입의 bean들이 들어갑니다.

```java
public class MovieRecommender {

    private Map<String, MovieCatalog> movieCatalogs;

    @Autowired
    public void setMovieCatalogs(Map<String, MovieCatalog> movieCatalogs) {
        this.movieCatalogs = movieCatalogs;
    }

    // ...
}
```

>
By default, autowiring fails when no matching candidate beans are available for a given injection point. In the case of a declared array, collection, or map, at least one matching element is expected.
>
The default behavior is to treat annotated methods and fields as indicating required dependencies. You can change this behavior as demonstrated in the following example, enabling the framework to skip a non-satisfiable injection point through marking it as non-required (i.e., by setting the required attribute in @Autowired to false):

기본적으로, 지정된 주입 지점에 일치하는 bean 후보가 전혀 없다면 autowiring은 실패하게 됩니다.
선언된 array, collection, map의 경우에도 적어도 1개 이상의 매칭 엘리먼트가 필요합니다.

기본 동작은 애노테이션이 달린 메소드와 필드를 required dependencies를 나타내는 것으로 처리하는 것입니다.
여러분은 다음 예제와 같이 `required = false` 를 써서 이런 기본 동작을 변경할 수 있습니다. 필수가 아닌 것으로 표시하여 프레임워크가 조건을 만족시키지 못하는 주입 지점을 건너 뛰도록 하는 것입니다.

```java
public class SimpleMovieLister {

    private MovieFinder movieFinder;

    @Autowired(required = false)
    public void setMovieFinder(MovieFinder movieFinder) {
        this.movieFinder = movieFinder;
    }

    // ...
}
```

>
A non-required method will not be called at all if its dependency (or one of its dependencies, in case of multiple arguments) is not available. A non-required field will not get populated at all in such cases, leaving its default value in place.
>
Injected constructor and factory method arguments are a special case since the `required` attribute in `@Autowired` has a somewhat different meaning due to Spring’s constructor resolution algorithm that may potentially deal with multiple constructors.
Constructor and factory method arguments are effectively required by default but with a few special rules in a single-constructor scenario, such as multi-element injection points (arrays, collections, maps) resolving to empty instances if no matching beans are available.
This allows for a common implementation pattern where all dependencies can be declared in a unique multi-argument constructor — for example, declared as a single public constructor without an `@Autowired` annotation.

의존관계(들 중의 하나)를 사용할 수 없는 경우라면 non-required 메소드는 호출할 수 없습니다.
non-required 필드는 값이 채워지지 않으며, 기본값이 입력된 상태 그대로 놔둡니다.

주입된 생성자와 팩토리 메소드의 인자는 특별한 케이스라 할 수 있습니다. `@Autowired`의 `required` 속성이 여러 생성자들 중 하나를 선택하는 생성자 확인 알고리즘에서 다른 의미를 갖기 때문입니다.

생성자와 팩토리 메소드 인자는 사실상 기본적으로 required라 할 수 있지만, 단일 생성자를 쓰는 경우에는 일치하는 bean이 없을 때 비어 있는 인스턴스를 사용하는 특수한 규칙이 있습니다.
여러 엘리먼트를 주입하는 지점이 있는 경우(array, collection, map)가 그 예라 할 수 있습니다.

이 규칙을 통해 모든 의존관계가 여러 인자를 가진 생성자 딱 한 개에 선언되는 경우라는 공통 구현 패턴이 성립되며, 이 예가 바로 `@Autowired` 애노테이션이 없는 단일 public 생성자라 할 수 있습니다.

> (i)
Only one constructor of any given bean class may declare `@Autowired` with the `required` attribute set to `true`, indicating the constructor to autowire when used as a Spring bean. As a consequence, if the `required` attribute is left at its default value `true`, only a single constructor may be annotated with `@Autowired`. If multiple constructors declare the annotation, they will all have to declare `required=false` in order to be considered as candidates for autowiring (analogous to `autowire=constructor` in XML).

The constructor with the greatest number of dependencies that can be satisfied by matching beans in the Spring container will be chosen. If none of the candidates can be satisfied, then a primary/default constructor (if present) will be used. Similarly, if a class declares multiple constructors but none of them is annotated with `@Autowired`, then a primary/default constructor (if present) will be used. If a class only declares a single constructor to begin with, it will always be used, even if not annotated. Note that an annotated constructor does not have to be public.
>
The `required` attribute of `@Autowired` is recommended over the deprecated `@Required` annotation on setter methods. Setting the `required` attribute to `false` indicates that the property is not required for autowiring purposes, and the property is ignored if it cannot be autowired. `@Required`, on the other hand, is stronger in that it enforces the property to be set by any means supported by the container, and if no value is defined, a corresponding exception is raised.
{:style="background-color: #ecf1e8;"}

- (i) 참고
    - 주어진 bean 클래스의 단 하나의 생성자만 `required` 속성을 `true`로 설정한 `@Autowired`를 선언할 수 있습니다.
        - 이는 생성자가 Spring bean을 만들기 위해 사용될 때 autowire된다는 것을 의미하는 것입니다.
            - 결과적으로 `required` 속성을 기본값인 `true`로 쓰고 있다면 단일 생성자만 `@Autowired`를 붙일 수 있습니다.
        - 만약 여러 개의 생성자가 `@Autowired`를 달고 있다면, 전부 `required=false`로 선언해야 합니다.
            - 그래야 autowiring 후보가 될 수 있기 때문입니다.
            - (XML의 `autowire=constructor`와 유사합니다)
        - Spring 컨테이너가 가장 많은 의존관계를 만족시켜줄 수 있는 생성자가 선택되게 됩니다.
            - 만약 아무런 의존관계를 만족시킬 수 없다면 primary/default 생성자가 사용될 것입니다.(기본 생성자가 있는 경우)
            - 이와 비슷하게, 여러 개의 생성자가 클래스에 선언되어 있는데 `@Autowired`가 붙어있는 생성자가 없는 경우에도 primary/default 생성자가 사용될 것입니다.(기본 생성자가 있는 경우)
            - 만약 클래스에 단 하나의 생성자만 존재한다면, 그 생성자는 애노테이션이 붙어있지 않아도 항상 사용될 것입니다.
            - 참고로 `@Autowired` 어노테이션이 붙은 생성자는 public이 아니어도 됩니다.
    - `@Autowired`의 `required` 속성은, setter 메소드에 붙이는 `@Required`(deprecated 되었음) 애노테이션보다 권장됩니다.
        - `required` 속성을 `false`로 설정하면 해당 속성이 autowiring에 필요하지 않다는 것을 표시하는 것입니다.
            - 그리고 해당 속성은 autowiring이 가능하지 않은 경우에 무시됩니다.
        - 한편, `@Required`는 컨테이너에서 지원하는 모든 방법을 통원해 속성을 입력하도록 강제한다는 점에서 `@Autowired`보다 더 강력하다고 할 수 있습니다.
            - `@Required`는 값이 정의되지 않은 경우에는 예외가 발생합니다.

>
Alternatively, you can express the non-required nature of a particular dependency through Java 8’s `java.util.Optional`, as the following example shows:

대안적으로, 다음 예와 같이 Java 8의 `java.util.Optional`을 통해 해당 의존관계가 필요하지 않다는 것을 표현할 수도 있습니다.

```java
public class SimpleMovieLister {

    @Autowired
    public void setMovieFinder(Optional<MovieFinder> movieFinder) {
        ...
    }
}
```

>
As of Spring Framework 5.0, you can also use a `@Nullable` annotation (of any kind in any package — for example, `javax.annotation.Nullable` from JSR-305) or just leverage Kotlin builtin null-safety support:

Spring 프레임워크 5.0 부터는 `@Nullable` 애노테이션을 사용하거나 Kotlin 빌트인인 null-safety 기능을 사용할 수도 있습니다.

```java
public class SimpleMovieLister {

    @Autowired
    public void setMovieFinder(@Nullable MovieFinder movieFinder) {
        ...
    }
}
```

```kotlin
class SimpleMovieLister {

    @Autowired
    var movieFinder: MovieFinder? = null

    // ...
}
```

>
You can also use `@Autowired` for interfaces that are well-known resolvable dependencies: `BeanFactory`, `ApplicationContext`, `Environment`, `ResourceLoader`, `ApplicationEventPublisher`, and `MessageSource`. These interfaces and their extended interfaces, such as `ConfigurableApplicationContext` or `ResourcePatternResolver`, are automatically resolved, with no special setup necessary. The following example autowires an `ApplicationContext` object:

`BeanFactory`, `ApplicationContext`, `Environment`, `ResourceLoader`, `ApplicationEventPublisher`, `MessageSource`와 같이 잘 알려진 resolvable dependencies에 대해 `@Autowired`를 사용하는 것도 가능합니다.

이런 인터페이스들과 이들을 상속받은 인터페이스들(`ConfigurableApplicationContext`나 `ResourcePatternResolver`와 같은)은 특별한 설정을 하지 않아도 자동으로 선택됩니다.
다음 에제는 `ApplicationContext`를 autowire합니다.

```java
class MovieRecommender {

    @Autowired
    lateinit var context: ApplicationContext

    // ...
}
```

> (i)
The `@Autowired`, `@Inject`, `@Value`, and `@Resource` annotations are handled by Spring `BeanPostProcessor` implementations. This means that you cannot apply these annotations within your own `BeanPostProcessor` or `BeanFactoryPostProcessor` types (if any). These types must be 'wired up' explicitly by using XML or a Spring `@Bean` method.
{:style="background-color: #ecf1e8;"}

- (i)
    - `@Autowired`, `@Inject`, `@Value`, `@Resource` 애노테이션은 Spring `BeanPostProcessor` 구현체에 의해 처리됩니다.
        - 이는 여러분이 만든 `BeanPostProcessor`나 `BeanFactoryPostProcessor` 타입에서는 이런 애노테이션들을 사용할 수 없다는 것을 의미합니다.
        - 이러한 타입에서 쓰려면 XML이나 Spring `@Bean` 메소드를 통해 명시적으로 wired up 해야만 합니다.

### 1.9.3. Fine-tuning Annotation-based Autowiring with @Primary

[원문]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-autowired-annotation-primary )

## 함께 읽기

- 목록으로 - [[spring-documents-core]]{Spring Core Technologies}
- 이전 문서 - [[spring-documents-core-1-8-container-extension-points]]{1.8. Container Extension Points}
- 다음 문서 - {1.10. Classpath Scanning and Managed Components}

