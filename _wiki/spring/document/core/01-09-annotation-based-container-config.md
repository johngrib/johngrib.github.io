---
layout  : wiki
title   : Spring Core Technologies - 1.9. Annotation-based Container Configuration
summary : 
date    : 2021-06-30 00:11:03 +0900
updated : 2021-07-10 20:51:14 +0900
tag     : java spring
resource: C0/24DC12-CC9A-4B97-B1E2-7F2320D5103E
toc     : true
public  : true
parent  : [[/spring/document/core]]
latex   : false
---
* TOC
{:toc}

- 목록으로 - [[/spring/document/core]]{Spring Core Technologies}
- 이전 문서 - [[/spring/document/core/01-08-container-extension-points]]{1.8. Container Extension Points}
- 다음 문서 - [[/spring/document/core/01-10-classpath-scanning-and-managed-components]]{1.10. Classpath Scanning and Managed Components}

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
public class MovieRecommender {

    @Autowired
    private ApplicationContext context;

    public MovieRecommender() {
    }

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

>
Because autowiring by type may lead to multiple candidates, it is often necessary to have more control over the selection process. One way to accomplish this is with Spring’s `@Primary` annotation. `@Primary` indicates that a particular bean should be given preference when multiple beans are candidates to be autowired to a single-valued dependency. If exactly one primary bean exists among the candidates, it becomes the autowired value.
>
Consider the following configuration that defines `firstMovieCatalog` as the primary `MovieCatalog`:

타입 기준의 autowiring은 여러 개의 후보가 발생할 수 있기 때문에, 선택 프로세스에 좀 더 관여해야 하는 경우가 있습니다.
한 가지 방법은 Spring의 `@Primary` 애노테이션을 쓰는 것입니다.
`@Primary`는 하나의 단일 값 dependency에 여러 개의 bean이 autowiring 후보가 되는 상황에서 지정한 bean에 우선권을 부여한다는 것을 뜻합니다.
여러 후보들 사이에서 한 개의 primary bean이 존재한다면 해당 bean을 autowiring 값으로 삼습니다.

다음은 여러 개의 `MovieCatalog`의 후보 중 `firstMovieCatalog`를 primary로 지정하는 configuration을 예제입니다.

```java
@Configuration
public class MovieConfiguration {

    @Bean
    @Primary
    public MovieCatalog firstMovieCatalog() { ... }

    @Bean
    public MovieCatalog secondMovieCatalog() { ... }

    // ...
}
```

>
With the preceding configuration, the following `MovieRecommender` is autowired with the `firstMovieCatalog`:

위의 configuration을 사용하면, 아래 예제의 `MovieRecommender`는 `firstMovieCatalog`로 autowiring 됩니다.

```java
public class MovieRecommender {

    @Autowired
    private MovieCatalog movieCatalog;

    // ...
}
```

>
The corresponding bean definitions follow:

해당 bean definition은 다음과 같습니다.

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

    <bean class="example.SimpleMovieCatalog" primary="true">
        <!-- inject any dependencies required by this bean -->
    </bean>

    <bean class="example.SimpleMovieCatalog">
        <!-- inject any dependencies required by this bean -->
    </bean>

    <bean id="movieRecommender" class="example.MovieRecommender"/>

</beans>
```

### 1.9.4. Fine-tuning Annotation-based Autowiring with Qualifiers

[원문]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-autowired-annotation-qualifiers )

>
`@Primary` is an effective way to use autowiring by type with several instances when one primary candidate can be determined. When you need more control over the selection process, you can use Spring’s `@Qualifier` annotation. You can associate qualifier values with specific arguments, narrowing the set of type matches so that a specific bean is chosen for each argument. In the simplest case, this can be a plain descriptive value, as shown in the following example:

`@Primary`는 여러 인스턴스에 타입별 autowiring을 하려 할 때 하나의 우선순위 후보를 결정하게 하는 효과적인 방법입니다.
선택 프로세스를 좀 더 세밀하게 제어하고 싶다면, Spring의 `@Qualifier` 애노테이션도 사용할 수 있습니다.
qualifier 값을 특정 인자와 연관시키면 타입 매치 후보 집합을 좁혀서 각 인자에 대해 특정 bean이 선택되도록 할 수 있습니다.
다음 예제는 가장 간단한 경우를 보여줍니다.

```java
public class MovieRecommender {

    @Autowired
    @Qualifier("main")
    private MovieCatalog movieCatalog;

    // ...
}
```

>
You can also specify the `@Qualifier` annotation on individual constructor arguments or method parameters, as shown in the following example:

다음 예제와 같이 생성자 인자나 메소드 파라미터에 `@Qualifier` 애노테이션을 붙이는 것도 가능합니다.

```java
public class MovieRecommender {

    private MovieCatalog movieCatalog;

    private CustomerPreferenceDao customerPreferenceDao;

    @Autowired
    public void prepare(@Qualifier("main") MovieCatalog movieCatalog,
            CustomerPreferenceDao customerPreferenceDao) {
        this.movieCatalog = movieCatalog;
        this.customerPreferenceDao = customerPreferenceDao;
    }

    // ...
}
```

>
The following example shows corresponding bean definitions.

다음 예제는 위 예제에 등장한 bean의 definition을 보여줍니다.

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

    <bean class="example.SimpleMovieCatalog">
        <qualifier value="main"/> <!-- (1) -->

        <!-- inject any dependencies required by this bean -->
    </bean>

    <bean class="example.SimpleMovieCatalog">
        <qualifier value="action"/> <!-- (1) -->

        <!-- inject any dependencies required by this bean -->
    </bean>

    <bean id="movieRecommender" class="example.MovieRecommender"/>

</beans>
```

>
- (1) The bean with the `main` qualifier value is wired with the constructor argument that is qualified with the same value.
- (2) The bean with the `action` qualifier value is wired with the constructor argument that is qualified with the same value.

- (1) `main` qualifier로 지정된 bean은 같은 qualifier 값이 있는 생성자 인자와 wire 됩니다.
- (2) `action` qualifier로 지정된 bean은 같은 qualifier 값이 있는 생성자 인자와 wire 됩니다.

>
For a fallback match, the bean name is considered a default qualifier value. Thus, you can define the bean with an `id` of `main` instead of the nested qualifier element, leading to the same matching result. However, although you can use this convention to refer to specific beans by name, `@Autowired` is fundamentally about type-driven injection with optional semantic qualifiers. This means that qualifier values, even with the bean name fallback, always have narrowing semantics within the set of type matches. They do not semantically express a reference to a unique bean `id`. Good qualifier values are `main` or `EMEA` or `persistent`, expressing characteristics of a specific component that are independent from the bean `id`, which may be auto-generated in case of an anonymous bean definition such as the one in the preceding example.

fallback 매치가 필요한 상황이 되면, bean 이름이 디폴트 qualifier 값으로 간주됩니다.
따라서 중첩된 qualifier 엘리먼트 대신에 `main`의 `id`로 bean을 정의하는 방법으로 동일한 매칭 결과를 얻을 수도 있습니다.
그런데 이름으로 특정 bean을 참조하는 이 규칙을 이용할 수는 있지만, `@Autowired`는 기본적으로 타입 기반의 주입으로 작동하는 것이며 semantic qualifier는 선택적인 것입니다.
즉, fallback을 위해 bean 이름을 써야 하는 상황이라 하더라도 qualifier 값들은 언제나 타입 매치 집합의 후보를 좁히는 의미를 갖습니다.
`@Autowired`와 `@Qualifier`는 유니크한 bean `id`에 대한 참조를 의미하는 표현이 아닙니다.
좋은 qualifier 값은 `main`, `EMEA`, `persistent` 처럼 특정 컴포넌트 요소의 특성을 표현하며, bean `id`와 독립적입니다. (앞의 예제와 같은 익명 bean 정의의 경우 `id`는 자동으로 생성될 수 있습니다.)

>
Qualifiers also apply to typed collections, as discussed earlier — for example, to `Set<MovieCatalog>`. In this case, all matching beans, according to the declared qualifiers, are injected as a collection. This implies that qualifiers do not have to be unique. Rather, they constitute filtering criteria. For example, you can define multiple `MovieCatalog` beans with the same qualifier value “action”, all of which are injected into a `Set<MovieCatalog>` annotated with `@Qualifier("action")`.

qualifier들은 또한 typed collection에도 적용됩니다. (위의 예제에서 보았던 `Set<MovieCatalog>`가 해당됩니다)
이 케이스에서는 선언된 qualifier에 일치하는 모든 bean들이 collection으로 전부 주입되게 됩니다.
이는 qualifier가 유니크하지 않아도 된다는 것을 보여줍니다.
오히려 qualifier는 필터링 기준을 구성하는 것이라 할 수 있습니다.
예를 들어, 여러 개의 `MovieCatalog` bean을 정의할 때 "action"이라는 똑같은 qualifier를 주는 것도 가능합니다.
이렇게 정의한 bean들은 모두 `@Qualifier("action")` 애노테이션이 붙은 `Set<MovieCatalog>`에 주입됩니다.

>
Letting qualifier values select against target bean names, within the type-matching candidates, does not require a `@Qualifier` annotation at the injection point. If there is no other resolution indicator (such as a qualifier or a primary marker), for a non-unique dependency situation, Spring matches the injection point name (that is, the field name or parameter name) against the target bean names and choose the same-named candidate, if any.
{:style="background-color: #e9f1f6;"}

- 타입 매칭 후보들 중에서 하나가 선택되게 할 때 bean의 이름을 기준으로 삼지 않는다면, 주입 지점에 `@Qualifier` 애노테이션을 굳이 쓰지 않아도 됩니다.
- 만약 non-unique dependency가 있는 상황에서 (primary 표시나 qualifier 같은) 선택 기준이 없다면, Spring은 주입 지점의 이름(필드 이름이나 파라미터 이름)을 target bean 이름과 비교해서 같은 이름을 가진 후보를 선택합니다. (물론 그런 이름이 있는 경우에)

>
That said, if you intend to express annotation-driven injection by name, do not primarily use `@Autowired`, even if it is capable of selecting by bean name among type-matching candidates. Instead, use the JSR-250 `@Resource` annotation, which is semantically defined to identify a specific target component by its unique name, with the declared type being irrelevant for the matching process. `@Autowired` has rather different semantics: After selecting candidate beans by type, the specified `String` qualifier value is considered within those type-selected candidates only (for example, matching an `account` qualifier against beans marked with the same qualifier label).

만약 이름을 기준으로 애노테이션을 통한 주입을 표현하려 한다면 `@Autowired` 위주로 작업을 하지 않는 것이 좋습니다.
타입 매칭 후보들 중에서 이름으로 선택하는 것이 가능할 때에도 마찬가지입니다.
그 대안으로 JSR-250의 `@Resource` 애노테이션을 사용하세요. 이 애노테이션은 대상 컴포넌트의 유니크한 이름을 식별하는 의미를 위해 정의된 것이며, 선언된 타입은 매칭 프로세스와 관계가 없습니다.
`@Autowired`의 의미는 이와는 꽤 다릅니다.
`@Autowired`는 타입을 기준으로 후보 bean들을 선택한 다음에, 지정된 `String` qualifier 값을 고려하기 때문입니다.

>
For beans that are themselves defined as a collection, `Map`, or array type, `@Resource` is a fine solution, referring to the specific collection or array bean by unique name. That said, as of 4.3, collection, you can match `Map`, and array types through Spring’s `@Autowired` type matching algorithm as well, as long as the element type information is preserved in `@Bean` return type signatures or collection inheritance hierarchies. In this case, you can use qualifier values to select among same-typed collections, as outlined in the previous paragraph.

collection, `Map`, 배열 타입으로 정의된 bean의 경우 `@Resource`는 좋은 솔루션입니다. `@Resource`는 유니크한 이름을 기준으로 특정 콜렉션이나 배열 bean을 참조하기 때문입니다.

Spring 4.3 부터는 Spring의 `@Autowired` 타입 매칭 알고리즘을 통해서도 `Map`과 배열 타입을 매칭하는 것이 가능합니다.
(`@Bean` 리턴 타입 시그니처나 collection 상속 계층에 엘리먼트 타입 정보가 보존되어 있는 경우) 
이러한 경우에는 위 문단에서 설명한 바와 같이 qualifier를 사용하여 같은 타입의 collection 중에서 선택할 수 있습니다.

>
As of 4.3, `@Autowired` also considers self references for injection (that is, references back to the bean that is currently injected). Note that self injection is a fallback. Regular dependencies on other components always have precedence. In that sense, self references do not participate in regular candidate selection and are therefore in particular never primary. On the contrary, they always end up as lowest precedence. In practice, you should use self references as a last resort only (for example, for calling other methods on the same instance through the bean’s transactional proxy). Consider factoring out the affected methods to a separate delegate bean in such a scenario. Alternatively, you can use `@Resource`, which may obtain a proxy back to the current bean by its unique name.

4.3 부터 `@Autowired`는 주입에 대한 self reference(즉 현재 주입된 bean에 대한 참조)도 고려합니다.
self injection은 fallback이라는 점을 기억해두세요.
다른 컴포넌트에 대한 일반적인 의존관계는 항상 우선합니다.
그런 의미에서 self reference는 일반적인 선택 후보에 참여하지 않으므로 절대 primary가 아닙니다.
반대로, self reference는 항상 낮은 우선순위로 끝나게 됩니다.
실제로 여러분이 self reference를 사용할 때에는 최후의 수단(예: bean 트랜잭션 프록시를 통해 같은 인스턴스의 다른 메소드를 호출하는 경우)으로만 사용해야 합니다.
이러한 시나리오의 영향을 받을 수 있는 메소드를 별도의 위임 bean으로 분리하는 것을 고려해 보세요.
또는 `@Resource`를 사용해 유니크한 이름 기준으로 현재 bean으로 다시 프록시를 얻을 수도 있습니다.

> (i)
Trying to inject the results from `@Bean` methods on the same configuration class is effectively a self-reference scenario as well. Either lazily resolve such references in the method signature where it is actually needed (as opposed to an autowired field in the configuration class) or declare the affected `@Bean` methods as `static`, decoupling them from the containing configuration class instance and its lifecycle. Otherwise, such beans are only considered in the fallback phase, with matching beans on other configuration classes selected as primary candidates instead (if available).
{:style="background-color: #ecf1e8;"}

- (i)
    - 같은 configuration 클래스에 `@Bean` 메소드의 결과를 주입하려는 시도가 있다면, 그것은 self-reference 시나리오에 해당됩니다.
    - 실제로는 필요한 메소드 시그니처에서 이러한 참조를 lazy하게 해결하거나(configuration 클래스의 autowired 필드와 반대로) 영향을 받는 `@Bean` 메소드를 `static`으로 선언하는 방법으로, 포함된 configuration 클래스 인스턴스와 해당 생명주기에서 디커플링합니다.
    - 이렇게 하지 않으면 이런 bean은 fallback 단계에서만 고려되며, 그 대신 다른 configuration 클래스의 매칭된 bean이 primary 후보로 선택됩니다(그 bean이 사용 가능한 경우).

>
`@Autowired` applies to fields, constructors, and multi-argument methods, allowing for narrowing through qualifier annotations at the parameter level. In contrast, `@Resource` is supported only for fields and bean property setter methods with a single argument. As a consequence, you should stick with qualifiers if your injection target is a constructor or a multi-argument method.
>
You can create your own custom qualifier annotations. To do so, define an annotation and provide the `@Qualifier` annotation within your definition, as the following example shows:

`@Autowired`는 필드, 생성자, 여러 인자를 갖는 메소드에 적용되므로 파라미터 레벨에서 qualifier 애노테이션을 사용해 범위를 좁힐 수 있습니다.
그와 반대로, `@Resource`는 필드와 인자 1개만을 갖는 setter 메소드만 지원합니다.
결과적으로, 여러분은 주입 대상이 생성자이거나 여러 인자를 갖는 메소드라면 qualifier를 사용해야 합니다.

여러분은 여러분만의 커스텀 qualifier 애노테이션을 만들 수도 있습니다.
다음 예제와 같이 애노테이션을 정의하고, `@Qualifier` 애노테이션을 달아주면 됩니다.

```java
@Target({ElementType.FIELD, ElementType.PARAMETER})
@Retention(RetentionPolicy.RUNTIME)
@Qualifier
public @interface Genre {

    String value();
}
```

>
Then you can provide the custom qualifier on autowired fields and parameters, as the following example shows:

그런 다음, 다음 예제와 같이 autowired된 필드와 파라미터에 커스텀 qualifier를 붙일 수 있습니다.

```java
public class MovieRecommender {

    @Autowired
    @Genre("Action")
    private MovieCatalog actionCatalog;

    private MovieCatalog comedyCatalog;

    @Autowired
    public void setComedyCatalog(@Genre("Comedy") MovieCatalog comedyCatalog) {
        this.comedyCatalog = comedyCatalog;
    }

    // ...
}
```

>
Next, you can provide the information for the candidate bean definitions. You can add `<qualifier/>` tags as sub-elements of the `<bean/>` tag and then specify the `type` and `value` to match your custom qualifier annotations. The type is matched against the fully-qualified class name of the annotation. Alternately, as a convenience if no risk of conflicting names exists, you can use the short class name. The following example demonstrates both approaches:

그 다음, 후보 bean 정의에 대한 정보를 제공할 수 있습니다.

`<bean/>` 태그의 하위에 `<qualifier/>` 태그를 추가한 다음, 커스텀 qualifier 애노테이션과 일치하도록 `type`과 `value`를 지정할 수 있습니다.
`type`은 애노테이션의 클래스 이름입니다.
만약 이름이 충돌할 위험이 없다면 편의를 위해 짧은 클래스 이름을 사용하는 것도 가능합니다.
다음 예제는 이 두 가지 방법을 모두 보여줍니다.

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

    <bean class="example.SimpleMovieCatalog">
        <qualifier type="Genre" value="Action"/>
        <!-- inject any dependencies required by this bean -->
    </bean>

    <bean class="example.SimpleMovieCatalog">
        <qualifier type="example.Genre" value="Comedy"/>
        <!-- inject any dependencies required by this bean -->
    </bean>

    <bean id="movieRecommender" class="example.MovieRecommender"/>

</beans>
```

>
In [Classpath Scanning and Managed Components]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-classpath-scanning ), you can see an annotation-based alternative to providing the qualifier metadata in XML. Specifically, see [Providing Qualifier Metadata with Annotations]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-scanning-qualifiers ).
>
In some cases, using an annotation without a value may suffice. This can be useful when the annotation serves a more generic purpose and can be applied across several different types of dependencies. For example, you may provide an offline catalog that can be searched when no Internet connection is available. First, define the simple annotation, as the following example shows:

[Classpath Scanning and Managed Components]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-classpath-scanning ) 문서를 읽어 보시면 XML로 qualifier 메타데이터를 정의하지 않고 애노테이션 기반으로 작업할 수 있는 방법을 볼 수 있습니다. 특히, [Providing Qualifier Metadata with Annotations]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-scanning-qualifiers ) 문서도 함께 읽어 보세요.

어떤 경우에는 값이 없이 애노테이션을 쓰는 것만으로도 충분할 수 있습니다.
이는 애노테이션이 좀 더 일반적인 목적으로 사용되고, 여러가지 다른 타입의 의존관계에 적용되어야 하는 상황일 때 유용할 수 있습니다.
예를 들어 인터넷에 연결할 수 없을 때 검색 가능한 오프라인 카탈로그를 제공한다거나 할 때 쓸 수 있겠죠.
먼저 다음 예제와 같이 간단한 애노테이션을 정의해 봅시다.

```java
@Target({ElementType.FIELD, ElementType.PARAMETER})
@Retention(RetentionPolicy.RUNTIME)
@Qualifier
public @interface Offline {

}
```

>
Then add the annotation to the field or property to be autowired, as shown in the following example:

그리고 다음 예제와 같이 autowire할 필드에 애노테이션을 붙여 봅시다.

```java
public class MovieRecommender {

    @Autowired
    @Offline /* (1) */
    private MovieCatalog offlineCatalog;

    // ...
}
```

>
(1) This line adds the `@Offline` annotation.

(1) 에서 `@Offline` 애노테이션을 붙였습니다.

>
Now the bean definition only needs a qualifier `type`, as shown in the following example:

이제 bean definition은 qualifier `type`만 있으면 됩니다. 다음 예제를 봅시다.

```xml
<bean class="example.SimpleMovieCatalog">
    <qualifier type="Offline"/> <!-- (1) -->
    <!-- inject any dependencies required by this bean -->
</bean>
```

>
(1) This element specifies the qualifier.

(1) 에서 qualifier를 지정했습니다.

>
You can also define custom qualifier annotations that accept named attributes in addition to or instead of the simple `value` attribute. If multiple attribute values are then specified on a field or parameter to be autowired, a bean definition must match all such attribute values to be considered an autowire candidate. As an example, consider the following annotation definition:

단순한 `value` attribute 대신, named attribute를 허용하는 커스텀 qualifier 애노테이션을 정의할 수 있습니다.
만약 여러 개의 속성 값이 autowire 되어야 하는 필드나 파라미터에 명시되었다면, bean definition은 autowire 후보로 뽑히기 위해 이러한 모든 속성값과 일치해야 합니다.
다음 애노테이션 정의 예제를 봅시다.

```java
@Target({ElementType.FIELD, ElementType.PARAMETER})
@Retention(RetentionPolicy.RUNTIME)
@Qualifier
public @interface MovieQualifier {

    String genre();

    Format format();
}
```

>
In this case `Format` is an enum, defined as follows:

위의 `Format`은 아래와 같이 정의된 `enum`입니다.

```java
public enum Format {
    VHS, DVD, BLURAY
}
```

>
The fields to be autowired are annotated with the custom qualifier and include values for both attributes: `genre` and `format`, as the following example shows:

autowire될 필드에는 커스텀 qualifier로 애노테이션이 추가되어, 다음 예제와 같이 `genre`와 `format` 속성값이 모두 포함되게 되었습니다.

```java
public class MovieRecommender {

    @Autowired
    @MovieQualifier(format=Format.VHS, genre="Action")
    private MovieCatalog actionVhsCatalog;

    @Autowired
    @MovieQualifier(format=Format.VHS, genre="Comedy")
    private MovieCatalog comedyVhsCatalog;

    @Autowired
    @MovieQualifier(format=Format.DVD, genre="Action")
    private MovieCatalog actionDvdCatalog;

    @Autowired
    @MovieQualifier(format=Format.BLURAY, genre="Comedy")
    private MovieCatalog comedyBluRayCatalog;

    // ...
}
```

>
Finally, the bean definitions should contain matching qualifier values. This example also demonstrates that you can use bean meta attributes instead of the `<qualifier/>` elements. If available, the `<qualifier/>` element and its attributes take precedence, but the autowiring mechanism falls back on the values provided within the `<meta/>` tags if no such qualifier is present, as in the last two bean definitions in the following example:

마지막으로, bean definition은 일치하는 qualifier 값을 포함하고 있어야 합니다.
이 예제는 `<qualifier/>` 엘리먼트 대신 bean meta attribute를 사용할 수 있다는 것을 보여줍니다.
만약 사용이 가능하다면 `<qualifier/>` element와 그 attribute들은 우선권을 갖지만, 아래 예제의 마지막 두 개의 bean definition과 같이 해당하는 qualifier가 없는 경우에는 autowiring 메커니즘은 `<meta/>` 태그 내에 제공된 값으로 대체합니다.

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

    <bean class="example.SimpleMovieCatalog">
        <qualifier type="MovieQualifier">
            <attribute key="format" value="VHS"/>
            <attribute key="genre" value="Action"/>
        </qualifier>
        <!-- inject any dependencies required by this bean -->
    </bean>

    <bean class="example.SimpleMovieCatalog">
        <qualifier type="MovieQualifier">
            <attribute key="format" value="VHS"/>
            <attribute key="genre" value="Comedy"/>
        </qualifier>
        <!-- inject any dependencies required by this bean -->
    </bean>

    <bean class="example.SimpleMovieCatalog">
        <meta key="format" value="DVD"/>
        <meta key="genre" value="Action"/>
        <!-- inject any dependencies required by this bean -->
    </bean>

    <bean class="example.SimpleMovieCatalog">
        <meta key="format" value="BLURAY"/>
        <meta key="genre" value="Comedy"/>
        <!-- inject any dependencies required by this bean -->
    </bean>

</beans>
```

### 1.9.5. Using Generics as Autowiring Qualifiers

[원문]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-generics-as-qualifiers )

>
In addition to the `@Qualifier` annotation, you can use Java generic types as an implicit form of qualification. For example, suppose you have the following configuration:

`@Qualifier` 애노테이션 외에도 Java의 제네릭 타입을 암시적 qualification 형식으로 사용할 수 있습니다.
예를 들어 다음과 같은 configuration이 있다고 합시다.

```java
@Configuration
public class MyConfiguration {

    @Bean
    public StringStore stringStore() {
        return new StringStore();
    }

    @Bean
    public IntegerStore integerStore() {
        return new IntegerStore();
    }
}
```

>
Assuming that the preceding beans implement a generic interface, (that is, `Store<String>` and `Store<Integer>`), you can `@Autowire` the `Store` interface and the generic is used as a qualifier, as the following example shows:

위의 bean이 제네릭 인터페이스(`Store<String>`과 `Store<Integer>`)를 구현한다고 가정합시다. 그러면 `Store` 인터페이스에 `@Autowire`를 붙여서 제네릭을 qualifier로 사용할 수 있습니다.

```java
@Autowired
private Store<String> s1; // <String> qualifier, injects the stringStore bean

@Autowired
private Store<Integer> s2; // <Integer> qualifier, injects the integerStore bean
```

>
Generic qualifiers also apply when autowiring lists, `Map` instances and arrays. The following example autowires a generic `List`:

제네릭 qualifier는 리스트나 `Map` 인스턴스, 배열을 autowiring할 때에도 적용됩니다. 다음 예제는 제네릭 `List`를 autowiring합니다.

```java
// Inject all Store beans as long as they have an <Integer> generic
// Store<String> beans will not appear in this list
@Autowired
private List<Store<Integer>> s;
```

### 1.9.6. Using CustomAutowireConfigurer

[원문]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-custom-autowire-configurer )

[CustomAutowireConfigurer]( https://docs.spring.io/spring-framework/docs/5.3.7/javadoc-api/org/springframework/beans/factory/annotation/CustomAutowireConfigurer.html ) is a `BeanFactoryPostProcessor` that lets you register your own custom qualifier annotation types, even if they are not annotated with Spring’s `@Qualifier` annotation. The following example shows how to use `CustomAutowireConfigurer`:

`CustomAutowireConfigurer`는 `BeanFactoryPostProcessor`이며, 여러분의 커스텀 qualifier 애노테이션 타입을 등록할 수 있게 해줍니다.
이 방법으로 만든 애노테이션은 Spring의 `@Qualifier` 애노테이션을 갖고 있지 않아도 됩니다.
다음 예제는 `CustomAutowireConfigurer`를 어떻게 사용하는지를 보여줍니다.

```xml
<bean id="customAutowireConfigurer"
        class="org.springframework.beans.factory.annotation.CustomAutowireConfigurer">
    <property name="customQualifierTypes">
        <set>
            <value>example.CustomQualifier</value>
        </set>
    </property>
</bean>
```

>
The `AutowireCandidateResolver` determines autowire candidates by:
>
- The `autowire-candidate` value of each bean definition
- Any `default-autowire-candidates` patterns available on the `<beans/>` element
- The presence of `@Qualifier` annotations and any custom annotations registered with the `CustomAutowireConfigurer`

`AutowireCandidateResolver`는 다음과 같이 autowire 후보를 결정합니다.

- 각 bean definition의 `autowire-candidate` 값.
- `<beans/>` element에 있는 모든 사용 가능한 `default-autowire-candidates` 패턴.
- `@Qualifier` 애노테이션이나 `CustomAutowireConfigurer`에 등록된 커스텀 애노테이션의 존재.

>
When multiple beans qualify as autowire candidates, the determination of a “primary” is as follows: If exactly one bean definition among the candidates has a `primary` attribute set to `true`, it is selected.

여러 bean이 autowire 후보 자격을 갖고 있을 경우, "primary"는 다음과 같이 결정됩니다: 후보 중 정확히 하나의 bean definition에 `primary` attribute가 `true`인 경우.

### 1.9.7. Injection with @Resource

[원문]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-resource-annotation )

>
Spring also supports injection by using the JSR-250 `@Resource` annotation (`javax.annotation.Resource`) on fields or bean property setter methods. This is a common pattern in Java EE: for example, in JSF-managed beans and JAX-WS endpoints. Spring supports this pattern for Spring-managed objects as well.
>
`@Resource` takes a name attribute. By default, Spring interprets that value as the bean name to be injected. In other words, it follows by-name semantics, as demonstrated in the following example:

Spring은 JSR-250의 `@Resource` 애노테이션(`javax.annotation.Resource`)을 사용한 주입을 지원합니다. 이 애노테이션은  필드나 bean의 setter 메소드에 사용할 수 있습니다.
이 방법은 Java EE의 공통 패턴이기도 합니다. 예를 들자면 JSF 관리 bean 및 JAX-WS 엔드 포인트가 그에 해당됩니다.
Spring은 Spring 관리 객체에 대해서도 이 패턴을 사용할 수 있도록 지원해 줍니다.

`@Resource`는 name 속성을 사용합니다. 기본적으로 Spring은 name을 해당 값을 주입할 bean 이름으로 해석합니다.
즉, 다음 예제와 같이 name을 사용합니다.

```java
public class SimpleMovieLister {

    private MovieFinder movieFinder;

    @Resource(name="myMovieFinder") // (1)
    public void setMovieFinder(MovieFinder movieFinder) {
        this.movieFinder = movieFinder;
    }
}
```

>
(1) This line injects a `@Resource.`

(1)에서 `@Resource` 주입이 일어납니다.

>
If no name is explicitly specified, the default name is derived from the field name or setter method. In case of a field, it takes the field name. In case of a setter method, it takes the bean property name. The following example is going to have the bean named `movieFinder` injected into its setter method:

만약 이름이 명시되지 않았다면, 기본 이름으로 필드 이름이나 setter 메소드 이름을 사용하게 됩니다.
필드라면 필드 이름을 사용합니다.
setter 메소드라면, bean 프로퍼티 name을 사용합니다.
다음 예제에서는 `movieFinder`라는 이름의 bean을 setter 메소드에 주입합니다.

```java
public class SimpleMovieLister {

    private MovieFinder movieFinder;

    @Resource
    public void setMovieFinder(MovieFinder movieFinder) {
        this.movieFinder = movieFinder;
    }
}
```

> (i)
The name provided with the annotation is resolved as a bean name by the `ApplicationContext` of which the `CommonAnnotationBeanPostProcessor` is aware. The names can be resolved through JNDI if you configure Spring’s [SimpleJndiBeanFactory]( https://docs.spring.io/spring-framework/docs/5.3.7/javadoc-api/org/springframework/jndi/support/SimpleJndiBeanFactory.html ) explicitly. However, we recommend that you rely on the default behavior and use Spring’s JNDI lookup capabilities to preserve the level of indirection.
{:style="background-color: #ecf1e8;"}

- (i)
    - 애노테이션과 함께 제공된 name은 `CommonAnnotationBeanPostProcessor`가 알고 있는 `ApplicationContext`에 의해 bean name으로 인식됩니다.
    - Spring의 `SimpleJndiBeanFactory`를 명시적으로 configure하면, JNDI를 통해 name을 확인할 수 있습니다.
    - 그러나 우리는 여러분에게 기본 동작을 사용할 것과, Spring의 JNDI 탐색 기능을 사용해서 간접 레벨을 유지하는 것을 권장합니다.

>
In the exclusive case of `@Resource` usage with no explicit name specified, and similar to `@Autowired`, `@Resource` finds a primary type match instead of a specific named bean and resolves well known resolvable dependencies: the `BeanFactory`, `ApplicationContext`, `ResourceLoader`, `ApplicationEventPublisher`, and `MessageSource` interfaces.

명시적으로 name을 지정하지 않고 `@Resource`를 쓰는 경우는 `@Resource`를 `@Autowired`처름 쓰는 경우라 할 수 있습니다.
이런 경우 `@Resource`는 명시된 bean name이나 잘 알려진 dependencies(`BeanFactory`, `ApplicationContext`, `ResourceLoader`, `ApplicationEventPublisher`, `MessageSource` 인터페이스)가 아니라 primary 타입 매치를 찾으려 합니다.

>
Thus, in the following example, the `customerPreferenceDao` field first looks for a bean named "customerPreferenceDao" and then falls back to a primary type match for the type `CustomerPreferenceDao`:

그래서 다음 예제에서 `customerPreferenceDao` 필드는 먼저 "customerPreferenceDao"라는 이름의 bean을 찾으려 합니다. 그리고 fallback이 필요한 경우엔 `CustomerPreferenceDao` 타입에 대해 primary 매치를 합니다.

```java
public class MovieRecommender {

    @Resource
    private CustomerPreferenceDao customerPreferenceDao;

    @Resource
    private ApplicationContext context; // (1)

    public MovieRecommender() {
    }

    // ...
}
```

>
(1) The `context` field is injected based on the known resolvable dependency type: `ApplicationContext`.

(1) `context` 필드는 이미 알려져 있는 dependency인 `ApplicationContext`가 삽입됩니다.

### 1.9.8. Using @Value

[원문]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-value-annotations )

>
`@Value` is typically used to inject externalized properties:

`@Value`는 보통 외부에서 지정한 속성값을 주입할 때 씁니다.

```java
@Component
public class MovieRecommender {

    private final String catalog;

    public MovieRecommender(@Value("${catalog.name}") String catalog) {
        this.catalog = catalog;
    }
}
```

>
With the following configuration:

configuration은 다음과 같고,

```java
@Configuration
@PropertySource("classpath:application.properties")
public class AppConfig { }
```

>
And the following `application.properties` file:

`application.properties` 파일은 다음과 같습니다.

```
catalog.name=MovieCatalog
```

>
In that case, the `catalog` parameter and field will be equal to the `MovieCatalog` value.

이렇게 설명한 경우, `String catalog` 파라미터와 필드 값은 `"MovieCatalog"`가 됩니다.

>
A default lenient embedded value resolver is provided by Spring. It will try to resolve the property value and if it cannot be resolved, the property name (for example `${catalog.name}`) will be injected as the value. If you want to maintain strict control over nonexistent values, you should declare a `PropertySourcesPlaceholderConfigurer` bean, as the following example shows:

default lenient embedded value resolver는 Spring이 제공합니다.
value resolver는 프로퍼티 값을 확인해서 가져오려고 시도하는데, 실패하게 되면 프로퍼티 이름(`${catalog.name}`)이 값으로 입력되게 됩니다.
만약 값이 없는 상황을 strict하게 관리하고 싶다면, `PropertySourcesPlaceholderConfigurer` bean을 선언해서 써야 합니다. 다음 예제를 봅시다.


```java
@Configuration
public class AppConfig {

     @Bean
     public static PropertySourcesPlaceholderConfigurer propertyPlaceholderConfigurer() {
           return new PropertySourcesPlaceholderConfigurer();
     }
}
```

> (i)
When configuring a `PropertySourcesPlaceholderConfigurer` using JavaConfig, the `@Bean` method must be static.
{:style="background-color: #ecf1e8;"}

- (i)
    - JavaConfig를 사용해서 `PropertySourcesPlaceholderConfigurer`를 설정하려면 `@Bean` 메소드는 `static`으로 선언해야 합니다.

>
Using the above configuration ensures Spring initialization failure if any `${}` placeholder could not be resolved. It is also possible to use methods like `setPlaceholderPrefix`, `setPlaceholderSuffix`, or `setValueSeparator` to customize placeholders.

위의 예제처럼 configuration했는데 `${}`과 같은 placeholder를 사용할 수 없다면 Spring은 초기화될 때 실패하게 됩니다.
그리고 `setPlaceholderPrefix`, `setPlaceholderSuffix`, `setValueSeparator`와 같은 메소드를 사용해서 placeholder를 커스터마이즈하는 것도 가능합니다.

> (i)
Spring Boot configures by default a `PropertySourcesPlaceholderConfigurer` bean that will get properties from `application.properties` and `application.yml` files.

- (i)
    - Spring Boot는 따로 설정을 하지 않아도 기본적으로 `PropertySourcesPlaceholderConfigurer` bean 설정이 되어 있어서, `application.properties`와 `application.yml` 파일의 프로퍼티를 알아서 가져옵니다.

>
Built-in converter support provided by Spring allows simple type conversion (to `Integer` or `int` for example) to be automatically handled. Multiple comma-separated values can be automatically converted to String array without extra effort.
>
It is possible to provide a default value as following:

Spring에서 제공하는 built-in 컨버터를 사용해 간단한 타입 컨버젼(`Integer`나 `int` 같은 것들)을 자동으로 처리할 수 있습니다.
콤마로 구분된 값들도 알아서 String 배열로 변환됩니다.

다음과 같이 `:` 뒤에 기본값을 제공할 수도 있습니다.

```java
@Component
public class MovieRecommender {

    private final String catalog;

    public MovieRecommender(@Value("${catalog.name:defaultCatalog}") String catalog) {
        this.catalog = catalog;
    }
}
```

>
A Spring `BeanPostProcessor` uses a `ConversionService` behind the scene to handle the process for converting the String value in `@Value` to the target type. If you want to provide conversion support for your own custom type, you can provide your own `ConversionService` bean instance as the following example shows:

Spring의 `BeanPostProcessor`는 `@Value`의 String 값을 대상 타입으로 변환하는 프로세스를 처리하기 위해 `ConversionService`를 백그라운드에서 가동합니다.
만약 여러분이 커스텀 타입 컨버젼을 제공하려 한다면, 다음 예제와 같이 여러분의 `ConversionService` bean 인스턴스를 쓸 수도 있습니다.

```java
@Configuration
public class AppConfig {

    @Bean
    public ConversionService conversionService() {
        DefaultFormattingConversionService conversionService = new DefaultFormattingConversionService();
        conversionService.addConverter(new MyCustomConverter());
        return conversionService;
    }
}
```

>
When `@Value` contains a [SpEL expression]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#expressions ) the value will be dynamically computed at runtime as the following example shows:

만약 다음 예제와 같이 `@Value`에 SpEL 표현식을 쓴다면 런타임에 동적으로 처리됩니다.

```java
@Component
public class MovieRecommender {

    private final String catalog;

    public MovieRecommender(@Value("#{systemProperties['user.catalog'] + 'Catalog' }") String catalog) {
        this.catalog = catalog;
    }
}
```

>
SpEL also enables the use of more complex data structures:

SpEl을 쓰면 더 복잡한 데이터 구조를 사용하는 것도 가능합니다.

{% raw %}
```java
@Component
public class MovieRecommender {

    private final Map<String, Integer> countOfMoviesPerCatalog;

    public MovieRecommender(
            @Value("#{{'Thriller': 100, 'Comedy': 300}}") Map<String, Integer> countOfMoviesPerCatalog) {
        this.countOfMoviesPerCatalog = countOfMoviesPerCatalog;
    }
}
```
{% endraw %}

### 1.9.9. Using @PostConstruct and @PreDestroy

[원문]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-postconstruct-and-predestroy-annotations )

The `CommonAnnotationBeanPostProcessor` not only recognizes the `@Resource` annotation but also the JSR-250 lifecycle annotations: `javax.annotation.PostConstruct` and `javax.annotation.PreDestroy`. Introduced in Spring 2.5, the support for these annotations offers an alternative to the lifecycle callback mechanism described in [initialization callbacks]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-factory-lifecycle-initializingbean ) and [destruction callbacks]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-factory-lifecycle-disposablebean ). Provided that the `CommonAnnotationBeanPostProcessor` is registered within the Spring `ApplicationContext`, a method carrying one of these annotations is invoked at the same point in the lifecycle as the corresponding Spring lifecycle interface method or explicitly declared callback method. In the following example, the cache is pre-populated upon initialization and cleared upon destruction:

`CommonAnnotationBeanPostProcessor`는 `@Resource` 애노테이션만 인식하지 않습니다.
`javax.annotation.PostConstruct` 나 `javax.annotation.PreDestroy`와 같은 JSR-250 생명주기 애노테이션들도 인식합니다.

Spring 2.5부터 도입된 이런 애노테이션들은 [initialization callbacks]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-factory-lifecycle-initializingbean )과 [destruction callbacks]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-factory-lifecycle-disposablebean )과 같은 생명주기 콜백 메커니즘의 대안으로 제공된 것입니다.

`CommonAnnotationBeanPostProcessor`가 Spring의 `ApplicationContext`에 등록되면, 이런 애노테이션(`@PostConstruct`, `@PreDestroy`)이 붙은 메소드는 그에 해당하는 Spring 생명주기 인터페이스 메소드나 명시적으로 선언된 콜백 메소드와 생명주기의 똑같은 지점에서 호출됩니다.


```java
public class CachingMovieLister {

    @PostConstruct
    public void populateMovieCache() {
        // populates the movie cache upon initialization...
    }

    @PreDestroy
    public void clearMovieCache() {
        // clears the movie cache upon destruction...
    }
}
```

>
For details about the effects of combining various lifecycle mechanisms, see [Combining Lifecycle Mechanisms]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-factory-lifecycle-combined-effects ).

생명주기 메커니즘을 다양하게 조합하는 것에 대해서는 [Combining Lifecycle Mechanisms]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-factory-lifecycle-combined-effects )문서를 참고하세요.

> (i)
Like `@Resource`, the `@PostConstruct` and `@PreDestroy` annotation types were a part of the standard Java libraries from JDK 6 to 8. However, the entire `javax.annotation` package got separated from the core Java modules in JDK 9 and eventually removed in JDK 11. If needed, the `javax.annotation-api` artifact needs to be obtained via Maven Central now, simply to be added to the application’s classpath like any other library.

- (i)
    - `@Resource`와 마찬가지로 `@PostConstruct`, `@PreDestroy` 애노테이션 타입은 JDK 6부터 JDK 8까지 스탠다드 Java 라이브러리의 일부였습니다.
    - 하지만 `java.annotation` 패키지는 JDK 9의 핵심 Java 모듈에서 분리되었고, 결국 JDK 11에서는 제거되었습니다.
    - 필요한 경우 `javax.annotation-api` 아티팩트는 다른 라이브러리와 마찬가지로 애플리케이션의 classpath에 추가하기 위해 Maven Central에서 가져와야 합니다.


## 함께 읽기

- 목록으로 - [[/spring/document/core]]{Spring Core Technologies}
- 이전 문서 - [[/spring/document/core/01-08-container-extension-points]]{1.8. Container Extension Points}
- 다음 문서 - [[/spring/document/core/01-10-classpath-scanning-and-managed-components]]{1.10. Classpath Scanning and Managed Components}

