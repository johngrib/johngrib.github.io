---
layout  : wiki
title   : Spring Core Technologies - 1.10. Classpath Scanning and Managed Components
summary : 
date    : 2021-07-04 15:30:15 +0900
updated : 2021-07-10 21:04:26 +0900
tag     : java spring
resource: 00/0A8DA8-F176-41C4-949B-39A2079E868A
toc     : true
public  : true
parent  : [[/spring/document/core]]
latex   : false
---
* TOC
{:toc}

- 목록으로 - [[/spring/document/core]]{Spring Core Technologies}
- 이전 문서 - [[/spring/document/core/01-09-annotation-based-container-config]]{1.9. Annotation-based Container Configuration}
- 다음 문서 - [[/spring/document/core/01-11-using-jsr-330-standard-annotations]]{1.11. Using JSR 330 Standard Annotations}

## 1.10. Classpath Scanning and Managed Components

[원문]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-classpath-scanning )

>
Most examples in this chapter use XML to specify the configuration metadata that produces each `BeanDefinition` within the Spring container. The previous section ([Annotation-based Container Configuration]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-annotation-config )) demonstrates how to provide a lot of the configuration metadata through source-level annotations. Even in those examples, however, the “base” bean definitions are explicitly defined in the XML file, while the annotations drive only the dependency injection. This section describes an option for implicitly detecting the candidate components by scanning the classpath. Candidate components are classes that match against a filter criteria and have a corresponding bean definition registered with the container. This removes the need to use XML to perform bean registration. Instead, you can use annotations (for example, `@Component`), AspectJ type expressions, or your own custom filter criteria to select which classes have bean definitions registered with the container.

이 챕터의 예제 대부분은 XML에서 Spring 컨테이너에서 사용할 `BeanDefinition`을 생성하는 configuration 메타데이터를 작성합니다.
앞의 섹션([Annotation-based Container Configuration]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-annotation-config ))에서는 소스 코드 레벨에서 애노테이션을 사용해 configuration 메타데이터를 제공하는 방법을 살펴보았습니다.
하지만 앞 섹션의 예제에서도 "base"가 되는 bean definition은 XML 파일에 정의하고, 애노테이션으로는 dependency injection에만 관여했습니다.

이 섹션에서는 classpath를 스캔해서 후보 컴포넌트를 암시적으로 감지하는 옵션을 설명합니다.
후보 컴포넌트는 필터 기준과 일치하고, 컨테이너에 등록된 관련 bean 정의가 있는 클래스를 말합니다.

이 방법을 쓰면 bean을 등록하기 위해 XML을 쓰지 않아도 됩니다.
그 대신 애노테이션(`@Component` 같은)이나, AspectJ 타입 표현식, 또는 커스텀 필터 기준을 사용해서 컨테이너에 등록된 bean 정의가 있는 클래스를 선택할 수 있습니다.

> (i)
Starting with Spring 3.0, many features provided by the Spring JavaConfig project are part of the core Spring Framework. This allows you to define beans using Java rather than using the traditional XML files. Take a look at the `@Configuration`, `@Bean`, `@Import`, and `@DependsOn` annotations for examples of how to use these new features.
{:style="background-color: #ecf1e8;"}

- (i)
- Spring 3.0 부터는 Spring, JavaConfig 프로젝트에서 제공하는 많은 기능들이 Spring 프레임워크의 일부로 제공됩니다.
    - 이를 통해 전통적인 XML 파일을 사용하는 대신 Java를 사용해 bean을 정의할 수 있습니다.
- 이런 새로운 기능을 사용하는 방법에 대한 예제는 `@Configuration`, `@Bean`, `@Import`, `@DependsOn` 애노테이션을 참고하세요.

### 1.10.1. @Component and Further Stereotype Annotations

[원문]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-stereotype-annotations )

>
The `@Repository` annotation is a marker for any class that fulfills the role or stereotype of a repository (also known as Data Access Object or DAO). Among the uses of this marker is the automatic translation of exceptions, as described in [Exception Translation]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/data-access.html#orm-exception-translation ).

`@Repository` 애노테이션은 저장소(repository, Data Access Object, DAO 로도 알려져 있음)의 역할을 수행하는 모든 클래스의 marker 입니다.
이 marker의 용도 중에는 [Exception Translation]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/data-access.html#orm-exception-translation ) 문서에 설명 된 것과 같은 자동 예외 번역이 있습니다.

>
Spring provides further stereotype annotations: `@Component`, `@Service`, and `@Controller`. `@Component` is a generic stereotype for any Spring-managed component. `@Repository`, `@Service`, and `@Controller` are specializations of `@Component` for more specific use cases (in the persistence, service, and presentation layers, respectively). Therefore, you can annotate your component classes with `@Component`, but, by annotating them with `@Repository`, `@Service`, or `@Controller` instead, your classes are more properly suited for processing by tools or associating with aspects. For example, these stereotype annotations make ideal targets for pointcuts. `@Repository`, `@Service`, and `@Controller` can also carry additional semantics in future releases of the Spring Framework. Thus, if you are choosing between using `@Component` or `@Service` for your service layer, `@Service` is clearly the better choice. Similarly, as stated earlier, `@Repository` is already supported as a marker for automatic exception translation in your persistence layer.

Spring은 `@Component`, `@Service`, `@Controller`와 같은 추가적인 스테레오 타입을 제공합니다.
`@Component` 는 Spring이 관리하는 모든 컴포넌트에 대한 일반적인 스테레오 타입입니다.

`@Repository`, `@Service`, `@Controller`는 좀 더 구체적인 유즈 케이스(각각 persistence, service, presentation 레이어)를 위한 전문화된 `@Component`입니다.

따라서 컴포넌트 클래스에 `@Component` 애노테이션을 다는 것도 가능하긴 하지만, 그 대신 `@Repository`, `@Service`, `@Controller` 애노테이션을 달아주면 여러분의 클래스들이 주제별 도구들과 더 적합하게 어울리게 됩니다.
예를 들어 이런 스테레오 타입 애노테이션은 이상적인 포인트컷 대상을 만듭니다.
`@Repository`, `@Service`, `@Controller`는 미래의 Spring 프레임워크의 릴리즈에서 추가적인 의미를 갖게 될 수도 있습니다.

그러므로 서비스 계층에 `@Component`나 `@Service` 둘 중에 하나를 골라야 한다면 `@Service`가 확실히 더 좋은 선택이라 할 수 있습니다.
이와 비슷하게 앞에서 이야기한 바와 같이 `@Repository`는 persistence 레이어에서 자동 예외 번역을 위한 marker로도 지원을 받고 있습니다.

### 1.10.2. Using Meta-annotations and Composed Annotations

[원문]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-meta-annotations )

>
Many of the annotations provided by Spring can be used as meta-annotations in your own code. A meta-annotation is an annotation that can be applied to another annotation. For example, the `@Service` annotation mentioned earlier is meta-annotated with `@Component`, as the following example shows:

Spring이 제공하는 애노테이션들 중 많은 수가 여러분의 코드에서 meta-annotation으로 사용될 수 있습니다.
meta-annotation은 다른 애노테이션에 적용할 수 있는 애노테이션을 말합니다.
예를 들어 앞에서 이야기했던 `@Service` 애노테이션의 경우 `@Component`가 meta-annotation으로 붙어 있습니다. 다음 코드를 봅시다.

```java
@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Component // (1)
public @interface Service {

    // ...
}
```

>
(1) The `Component` causes `@Service` to be treated in the same way as `@Component`.

`@Component`는 `@Service`가 `@Component`와 같은 방식으로 처리되도록 해줍니다.

>
You can also combine meta-annotations to create “composed annotations”. For example, the `@RestController` annotation from Spring MVC is composed of `@Controller` and `@ResponseBody`.

meta-annotation을 조합해서 "composed annotation"을 만들 수도 있습니다.
예를 들어, Spring MVC의 `@RestController`는 `@Controller`와 `@ResponseBody`가 조합된 애노테이션입니다.

>
In addition, composed annotations can optionally redeclare attributes from meta-annotations to allow customization. This can be particularly useful when you want to only expose a subset of the meta-annotation’s attributes. For example, Spring’s `@SessionScope` annotation hardcodes the scope name to `session` but still allows customization of the `proxyMode`. The following listing shows the definition of the `SessionScope` annotation:

또한, composed annotation은 커스터마이즈를 허용하기 위해 meta-annotation의 attribute를 재선언하는 옵션을 고려할 수 있습니다.
이 방법은 meta-annotation의 attribute 중 일부만 노출하려는 경우에 유용하게 쓰일 수 있습니다.
예를 들어 Spring의 `@SessionScope` 애노테이션은 스코프의 이름을 `session`이라고 하드코딩하면서도, `proxyMode`의 커스터마이즈를 허용합니다.
다음 목록은 `SessionScope` 애노테이션의 정의를 보여줍니다.

```java
@Target({ElementType.TYPE, ElementType.METHOD})
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Scope(WebApplicationContext.SCOPE_SESSION)
public @interface SessionScope {

    /**
     * Alias for {@link Scope#proxyMode}.
     * <p>Defaults to {@link ScopedProxyMode#TARGET_CLASS}.
     */
    @AliasFor(annotation = Scope.class)
    ScopedProxyMode proxyMode() default ScopedProxyMode.TARGET_CLASS;

}
```

>
You can then use `@SessionScope` without declaring the `proxyMode` as follows:

그러므로 다음과 같이 `proxyMode`를 선언하지 않고도 `@SessionScope`를 사용할 수 있습니다.

```java
@Service
@SessionScope
public class SessionScopedService {
    // ...
}
```

>
You can also override the value for the `proxyMode`, as the following example shows:

다음 예제와 같이 `proxyMode` 값을 오버라이드하는 것도 가능합니다.

```java
@Service
@SessionScope(proxyMode = ScopedProxyMode.INTERFACES)
public class SessionScopedUserService implements UserService {
    // ...
}
```

>
For further details, see the [Spring Annotation Programming Model]( https://github.com/spring-projects/spring-framework/wiki/Spring-Annotation-Programming-Model ) wiki page.

더 자세한 내용은 [Spring Annotation Programming Model]( https://github.com/spring-projects/spring-framework/wiki/Spring-Annotation-Programming-Model ) 문서를 참고하세요.

### 1.10.3. Automatically Detecting Classes and Registering Bean Definitions

[원문]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-scanning-autodetection )

>
Spring can automatically detect stereotyped classes and register corresponding `BeanDefinition` instances with the `ApplicationContext`. For example, the following two classes are eligible for such autodetection:

Spring은 스테레오 타입 클래스를 자동으로 감지하고, 그에 해당하는 `BeanDefinition` 인스턴스를 `ApplicationContext`에 등록할 수 있습니다.

예를 들어 다음 두 클래스는 이런 자동 감지의 대상이 됩니다.

```java
@Service
public class SimpleMovieLister {

    private MovieFinder movieFinder;

    public SimpleMovieLister(MovieFinder movieFinder) {
        this.movieFinder = movieFinder;
    }
}
```

```java
@Repository
public class JpaMovieFinder implements MovieFinder {
    // implementation elided for clarity
}
```

>
To autodetect these classes and register the corresponding beans, you need to add `@ComponentScan` to your `@Configuration` class, where the `basePackages` attribute is a common parent package for the two classes. (Alternatively, you can specify a comma- or semicolon- or space-separated list that includes the parent package of each class.)

이런 클래스들을 자동감지하고, 해당하는 bean들을 등록하려면, `@ComponentScan` 애노테이션을 `@Configuration` 클래스에 붙여야 합니다.
이 때, `basePackages` 속성은 (위 예제에 나오는)두 클래스의 공통 상위 패키지입니다. (또는 각 클래스의 상위 패키지를 포함하는 목록을 지정할 수도 있습니다. 목록 구분자는 콤마, 세미콜론, 공백 중에 선택할 수 있습니다.)

```java
@Configuration
@ComponentScan(basePackages = "org.example")
public class AppConfig  {
    // ...
}
```

> (i)
For brevity, the preceding example could have used the `value` attribute of the annotation (that is, `@ComponentScan("org.example")`).

- (i)
    - 위의 예제는 `value` 속성을 사용해서 더 간결하게 표현하는 방법도 있습니다.
    - `@ComponentScan("org.example")` 이렇게요.

>
The following alternative uses XML:

애노테이션 대신 XML을 쓰려면 다음과 같이 합니다.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xmlns:context="http://www.springframework.org/schema/context"
    xsi:schemaLocation="http://www.springframework.org/schema/beans
        https://www.springframework.org/schema/beans/spring-beans.xsd
        http://www.springframework.org/schema/context
        https://www.springframework.org/schema/context/spring-context.xsd">

    <context:component-scan base-package="org.example"/>

</beans>
```

>
The use of `<context:component-scan>` implicitly enables the functionality of `<context:annotation-config>`. There is usually no need to include the `<context:annotation-config>` element when using `<context:component-scan>`.
{:style="background-color: #e9f1f6;"}

`<context:component-scan>`를 쓰면 `<context:annotation-config>`가 암시적으로 활성화됩니다.
일반적으로 `<context:component-scan>`을 쓸 때에는 `<context:annotation-config>`을 포함시킬 필요가 없습니다.

> (i)
The scanning of classpath packages requires the presence of corresponding directory entries in the classpath. When you build JARs with Ant, make sure that you do not activate the files-only switch of the JAR task. Also, classpath directories may not be exposed based on security policies in some environments — for example, standalone apps on JDK 1.7.0_45 and higher (which requires 'Trusted-Library' setup in your manifests — see <https://stackoverflow.com/questions/19394570/java-jre-7u45-breaks-classloader-getresources >).
>
On JDK 9’s module path (Jigsaw), Spring’s classpath scanning generally works as expected. However, make sure that your component classes are exported in your `module-info` descriptors. If you expect Spring to invoke non-public members of your classes, make sure that they are 'opened' (that is, that they use an `opens` declaration instead of an `exports` declaration in your `module-info` descriptor).

- (i)
    - classpath package를 스캔하려면 classpath에 해당하는 디렉토리가 있어야 합니다. Ant로 JAR를 빌드할 때, JAR 태스크의 files-only 스위치를 활성화하지 않도록 주의하세요.
    - 또한, classpath 디렉토리는 일부 환경에서 보안 정책에 따라 노출되지 않을 수도 있습니다.
        - 예: JDK 1.7.0_45 이상 버전으로 돌아가는 독립 실행 앱(manifests에 'Trusted-Library' 설정이 필요)
    - JDK 9의 module path(Jigsaw)에서 Spring의 classpath 스캔은 잘 작동합니다.
        - 그러나 컴포넌트 클래스가 `module-info` 디스크립터에 잘 export 되었는지 확인해야 합니다.
        - Spring이 여러분의 클래스의 public하지 않은 멤버를 호출할 것 같으면 해당 멤버가 'opened'인지도 확인해야 합니다. (즉, `module-info` 디스크립터에서 `exports` 선언 대신 `opens`를 쓰고 있는지 확인하세요)

>
Furthermore, the `AutowiredAnnotationBeanPostProcessor` and `CommonAnnotationBeanPostProcessor` are both implicitly included when you use the component-scan element. That means that the two components are autodetected and wired together — all without any bean configuration metadata provided in XML.

또한, `AutowiredAnnotationBeanPostProcessor`와 `CommonAnnotationBeanPostProcessor`는 component-scan element를 사용할 때 모두 암묵적으로 포함됩니다.

즉, XML로 제공되는 bean configuration metadata가 없이도 두 컴포넌트가 자동으로 감지되고 함께 wired 됩니다.

> (i)
You can disable the registration of `AutowiredAnnotationBeanPostProcessor` and `CommonAnnotationBeanPostProcessor` by including the `annotation-config` attribute with a value of `false`.
{:style="background-color: #ecf1e8;"}

`annotation-config` 속성 값을 `false`로 설정하면 `AutowiredAnnotationBeanPostProcessor`와 `CommonAnnotationBeanPostProcessor`의 등록을 disable할 수 있습니다.

### 1.10.4. Using Filters to Customize Scanning

[원문]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-scanning-filters )

>
By default, classes annotated with `@Component`, `@Repository`, `@Service`, `@Controller`, `@Configuration`, or a custom annotation that itself is annotated with `@Component` are the only detected candidate components. However, you can modify and extend this behavior by applying custom filters. Add them as `includeFilters` or `excludeFilters` attributes of the `@ComponentScan` annotation (or as `<context:include-filter />` or `<context:exclude-filter />` child elements of the `<context:component-scan>` element in XML configuration). Each filter element requires the `type` and `expression` attributes. The following table describes the filtering options:

기본적으로는 `@Component`, `@Repository`, `@Service`, `@Controller`, `@Configuration` 애노테이션이 달린 클래스나 `@Component` 애노테이션이 달린 커스텀 애노테이션들만이 탐색 후보 컴포넌트라 할 수 있습니다.
그러나 커스텀 필터를 적용하면 이런 동작을 바꾸거나 확장할 수 있습니다.
`@ComponentScan` 애노테이션의 `includeFilters`나 `excludeFilters` 속성에 커스텀 필터를 추가하면 됩니다.
(또는 XML에서 `<context:component-scan>` 엘리먼트의 자식 엘리먼트로 `<context:include-filter />`나 `<context:exclude-filter />`를 지정하세요)
각각의 필터 엘리먼트는 `type`과 `expression` 값을 입력해줘야 합니다.
다음 표는 필터링 옵션을 설명합니다.

>
**Table 5. Filter Types
>
| Filter Type          | Example Expression           | Description                                                                                |
|----------------------|------------------------------|--------------------------------------------------------------------------------------------|
| annotation (default) | `org.example.SomeAnnotation` | An annotation to be present or meta-present at the type level in target components.        |
| assignable           | `org.example.SomeClass`      | A class (or interface) that the target components are assignable to (extend or implement). |
| aspectj              | `org.example..*Service+`     | An AspectJ type expression to be matched by the target components.                         |
| regex                | `org\.example\.Default.*`    | A regex expression to be matched by the target components' class names.                    |
| custom               | `org.example.MyTypeFilter`   | A custom implementation of the `org.springframework.core.type.TypeFilter` interface.       |

| 필터 타입           | 표현식 예제                  | 설명                                                                                                            |
|---------------------|------------------------------|-----------------------------------------------------------------------------------------------------------------|
| annotation (기본값) | `org.example.SomeAnnotation` | 대상 컴포넌트의 타입 레벨에 존재하는 애노테이션 또는 메타 애노테이션(다른 애노테이션 정의에 들어간 애노테이션). |
| assignable          | `org.example.SomeClass`      | 대상 컴포넌트를 할당(확장 또는 구현)할 수 있는 클래스(또는 인터페이스).                                         |
| aspectj             | `org.example..*Service+`     | 대상 컴포넌트와 매치될 AspectJ 타입 표현식.                                                                     |
| regex               | `org\.example\.Default.*`    | 대상 컴포넌트의 클래스 이름과 매치될 정규 표현식.                                                               |
| custom              | `org.example.MyTypeFilter`   | `org.springframework.core.type.TypeFilter` 인터페이스의 커스텀 구현체.                                          |


>
The following example shows the configuration ignoring all `@Repository` annotations and using “stub” repositories instead:

다음 예제는 모든 `@Repository` 애노테이션을 무시하고 "stub" repository를 사용하는 설정을 보여줍니다.

```java
@Configuration
@ComponentScan(basePackages = "org.example",
        includeFilters = @Filter(type = FilterType.REGEX, pattern = ".*Stub.*Repository"),
        excludeFilters = @Filter(Repository.class))
public class AppConfig {
    ...
}
```

>
The following listing shows the equivalent XML:

다음 예제는 위의 코드와 같은 내용의 XML 설정을 보여줍니다.

```xml
<beans>
    <context:component-scan base-package="org.example">
        <context:include-filter type="regex"
                expression=".*Stub.*Repository"/>
        <context:exclude-filter type="annotation"
                expression="org.springframework.stereotype.Repository"/>
    </context:component-scan>
</beans>
```

> (i)
You can also disable the default filters by setting `useDefaultFilters=false` on the annotation or by providing `use-default-filters="false"` as an attribute of the `<component-scan/>` element. This effectively disables automatic detection of classes annotated or meta-annotated with `@Component`, `@Repository`, `@Service`, `@Controller`, `@RestController`, or `@Configuration`.
{:style="background-color: #ecf1e8;"}

- (i)
    - 기본 설정된 필터를 disable 하려면, 애노테이션에 `use-default-filters="false"`를 설정하거나, `<component-scan/>` 엘리먼트의 속성값으로 `use-default-filters="false"`를 주면 됩니다.
    - 이렇게 설정하게 되면 `@Component`, `@Repository`, `@Service`, `@Controller`, `@RestController`, or `@Configuration` 애노테이션이나 이 애노테이션들이 붙은 애노테이션이 있는 클래스의 탐색을 끌 수 있습니다.


### 1.10.5. Defining Bean Metadata within Components

[원문]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-factorybeans-annotations )

>
Spring components can also contribute bean definition metadata to the container. You can do this with the same `@Bean` annotation used to define bean metadata within `@Configuration` annotated classes. The following example shows how to do so:

Spring 컴포넌트는 bean definition 메타 데이터를 컨테이너에 제공할 수도 있습니다.
`@Configuration` 애노테이션을 붙인 클래스에서 bean 메타 데이터를 정의하는데 사용되는 `@Bean` 애노테이션을 쓰면 됩니다.
다음 예는 이 방법을 보여줍니다.

```java
@Component
public class FactoryMethodComponent {

    @Bean
    @Qualifier("public")
    public TestBean publicInstance() {
        return new TestBean("publicInstance");
    }

    public void doWork() {
        // Component method implementation omitted
    }
}
```

>
The preceding class is a Spring component that has application-specific code in its `doWork()` method. However, it also contributes a bean definition that has a factory method referring to the method `publicInstance()`. The `@Bean` annotation identifies the factory method and other bean definition properties, such as a qualifier value through the `@Qualifier` annotation. Other method-level annotations that can be specified are `@Scope`, `@Lazy`, and custom qualifier annotations.

위의 클래스는 Spring 컴포넌트이며, `doWork()` 메소드에는 애플리케이션 코드가 있습니다.
그런데 잘 살펴보면 `publicInstance()` 메소드를 참조하는 팩토리 메소드가 있는 bean 정의도 제공하고 있습니다.
`@Bean` 어노테이션은 팩토리 메소드와, `@Qualifier`로 지정해준 qualifier 값과 같은 bean definition 프로퍼티들을 식별합니다.
그 외에 명시할 수 있는 메소드 레벨 애노테이션은 `@Scope`, `@Lzay`, 그리고 커스텀 qualifier 애노테이션들입니다.

>
In addition to its role for component initialization, you can also place the `@Lazy` annotation on injection points marked with `@Autowired` or `@Inject`. In this context, it leads to the injection of a lazy-resolution proxy.
{:style="background-color: #e9f1f6;"}

`@Lazy`를 컴포넌트 초기화에 대한 역할 외에도 다른 용도로 쓸 수 있습니다.
`@Autowired` 또는 `@Inject`로 표시된 주입 지점에 `@Lazy` 애노테이션을 붙이면, `@Lazy`가 lazy-resolution proxy 주입을 리드합니다.

>
Autowired fields and methods are supported, as previously discussed, with additional support for autowiring of `@Bean` methods. The following example shows how to do so:

위에서 설명한 바와 같이, Autowired 필드와 메서드는 `@Bean` 메서드의 autowiring 지원을 받을 수 있습니다.
다음 예를 봅시다.

```java
@Component
public class FactoryMethodComponent {

    private static int i;

    @Bean
    @Qualifier("public")
    public TestBean publicInstance() {
        return new TestBean("publicInstance");
    }

    // use of a custom qualifier and autowiring of method parameters
    @Bean
    protected TestBean protectedInstance(
            @Qualifier("public") TestBean spouse,
            @Value("#{privateInstance.age}") String country) {
        TestBean tb = new TestBean("protectedInstance", 1);
        tb.setSpouse(spouse);
        tb.setCountry(country);
        return tb;
    }

    @Bean
    private TestBean privateInstance() {
        return new TestBean("privateInstance", i++);
    }

    @Bean
    @RequestScope
    public TestBean requestScopedInstance() {
        return new TestBean("requestScopedInstance", 3);
    }
}
```

>
The example autowires the `String` method parameter `country` to the value of the `age` property on another bean named `privateInstance`. A Spring Expression Language element defines the value of the property through the notation `#{ <expression> }`. For `@Value` annotations, an expression resolver is preconfigured to look for bean names when resolving expression text.

위의 예제는 `String country` 메소드 파라미터의 값으로 `privateInstance` bean의 `age` 값을 autowire 하고 있습니다.
Spring Expression Language 엘리먼트는 `#{ <expression> }` 표기법으로 값을 지정해 줄 수 있습니다.
`@Value` 애노테이션의 경우는 미리 expression 해석기(resolver)를 미리 구성해 놓았기 때문에 expression 텍스트를 해석할 때 알아서 bean 이름을 찾습니다.

>
As of Spring Framework 4.3, you may also declare a factory method parameter of type `InjectionPoint` (or its more specific subclass: `DependencyDescriptor`) to access the requesting injection point that triggers the creation of the current bean. Note that this applies only to the actual creation of bean instances, not to the injection of existing instances. As a consequence, this feature makes most sense for beans of prototype scope.
For other scopes, the factory method only ever sees the injection point that triggered the creation of a new bean instance in the given scope (for example, the dependency that triggered the creation of a lazy singleton bean).
You can use the provided injection point metadata with semantic care in such scenarios. The following example shows how to use `InjectionPoint`:

Spring Framework 4.3부터는 현재 생성하려는 bean의 생성을 트리거하는 요청 주입 지점에 액세스하기 위해 `InjectionPoint`(또는 서브 클래스인 `DependencyDescriptor`) 타입을 파라미터로 받는 팩토리 메서드를 선언 할 수도 있습니다.
이것은 이미 만들어져 존재하고 있는 인스턴스의 주입에는 적용되지 않으며, 실제 bean 인스턴스 생성에만 적용됩니다.
결과적으로, 이 기능은 prototype scope를 가진 bean에 가장 적합하다고 할 수 있습니다.

다른 스코프의 경우 팩토리 메소드는 주어진 scope 내에서 새로운 bean의 인스턴스 생성을 트리거한 주입 지점만 볼 수 있습니다(예 : lazy singleton bean의 생성을 트리거한 dependency).

이런 종류의 시나리오에서 여러분은 주입 지점 metadata를 사용할 수도 있습니다.
다음 예제는 `InjectionPoint`를 사용하는 방법을 보여줍니다.

```java
@Component
public class FactoryMethodComponent {

    @Bean @Scope("prototype")
    public TestBean prototypeInstance(InjectionPoint injectionPoint) {
        return new TestBean("prototypeInstance for " + injectionPoint.getMember());
    }
}
```

>
The `@Bean` methods in a regular Spring component are processed differently than their counterparts inside a Spring `@Configuration` class. The difference is that `@Component` classes are not enhanced with CGLIB to intercept the invocation of methods and fields. CGLIB proxying is the means by which invoking methods or fields within `@Bean` methods in `@Configuration` classes creates bean metadata references to collaborating objects. Such methods are not invoked with normal Java semantics but rather go through the container in order to provide the usual lifecycle management and proxying of Spring beans, even when referring to other beans through programmatic calls to `@Bean` methods.
In contrast, invoking a method or field in a `@Bean` method within a plain `@Component` class has standard Java semantics, with no special CGLIB processing or other constraints applying.

일반적인 Spring 컴포넌트의 `@Bean` 메소드는 Spring의 `@Configuration` 클래스에 있는 `@Bean` 메소드와는 다르게 처리됩니다.
차이점은 메소드나 필드 호출을 가로채기 위해 `@Component` 클래스에 CGLIB가 사용되지 않는다는 점입니다.
`@Configuration` 클래스에서는 `@Bean` 메소드에서 다른 메소드나 필드를 호출해서 협업 객체에 대한 bean 메타 데이터 참조를 생성할 때 CGLIB 프록싱을 씁니다.
이런 메소드는 일반적인 Java 구문으로 호출되지 않고 컨테이너를 통해서만 호출되는데, 그 이유는 일반적인 생명주기 관리 기능을 제공하면서 Spring bean의 프록싱도 제공하기 위해서입니다.
이런 동작은 `@Bean` 메소드에서 프로그래밍 방식으로 다른 bean을 참조할 때에도 사용됩니다.

이와 대조적으로, 순수한 `@Component` 클래스 내에 있는 `@Bean` 메소드에서 메소드나 필드를 호출하는 것은 특별한 CGLIB 처리나 그 외의 제약 조건이 적용되지 않는 표준 Java 의미 체계를 갖습니다.

> (i)
You may declare `@Bean` methods as `static`, allowing for them to be called without creating their containing configuration class as an instance. This makes particular sense when defining post-processor beans (for example, of type `BeanFactoryPostProcessor` or `BeanPostProcessor`), since such beans get initialized early in the container lifecycle and should avoid triggering other parts of the configuration at that point.
>
Calls to static `@Bean` methods never get intercepted by the container, not even within `@Configuration` classes (as described earlier in this section), due to technical limitations: CGLIB subclassing can override only non-static methods. As a consequence, a direct call to another `@Bean` method has standard Java semantics, resulting in an independent instance being returned straight from the factory method itself.
>
The Java language visibility of `@Bean` methods does not have an immediate impact on the resulting bean definition in Spring’s container. You can freely declare your factory methods as you see fit in non-`@Configuration` classes and also for static methods anywhere. However, regular `@Bean` methods in `@Configuration` classes need to be overridable — that is, they must not be declared as `private` or `final`.
>
`@Bean` methods are also discovered on base classes of a given component or configuration class, as well as on Java 8 default methods declared in interfaces implemented by the component or configuration class. This allows for a lot of flexibility in composing complex configuration arrangements, with even multiple inheritance being possible through Java 8 default methods as of Spring 4.2.
>
Finally, a single class may hold multiple `@Bean` methods for the same bean, as an arrangement of multiple factory methods to use depending on available dependencies at runtime. This is the same algorithm as for choosing the “greediest” constructor or factory method in other configuration scenarios: The variant with the largest number of satisfiable dependencies is picked at construction time, analogous to how the container selects between multiple `@Autowired` constructors.

- (i)
    - `@Bean` 메소드를 `static`으로 선언하는 방법을 쓰면 configuration 클래스를 인스턴스화하지 않아도, `@Bean` 메소드를 호출할 수 있게 됩니다.
        - 이렇게 하면 post-processor bean(예: `BeanFactoryPostProcessor` 또는 `BeanPostProcessor`)을 정의할 때 특히 의미가 있습니다.
        - 이런 bean들은 컨테이너 생명주기의 이른 시점에 초기화되고, 해당 시점에서 configuration의 다른 부분을 트리거하지 않아야 하기 때문입니다.
    - static `@Bean` 메소드의 호출은 컨테이너가 절대로 가로챌 수 없습니다. 심지어 `@Configuration` 클래스도 예외는 아닌데, 이는 기술적인 한계가 존재하기 때문입니다.
        - 왜냐하면 CGLIB 서브클래싱은 non-static 메소드만을 오버라이드할 수 있기 때문입니다.
        - 결과적으로, 다른 `@Bean` 메소드에 대한 direct call은 표준적인 Java 의미를 갖게 되므로 팩토리 메소드 자체가 직접 독립 인스턴스를 리턴합니다.
    - `@Bean` 메소드에서 볼 수 있는 Java 코드는 Spring 컨테이너의 최종적인 bean definition에 즉각적인 영향을 미치지는 않습니다.
        - 여러분이 static 메소드가 적합하다고 판단하는 곳이 있다면, `@Configuration`가 아닌 클래스라면 아무 곳에서나 팩토리 메소드를 자유롭게 선언할 수 있습니다.
        - 그러나 `@Configuration` 클래스의 일반적인 `@Bean` 메소드는 오버라이드가 가능해야 합니다. 즉, `private`이거나 `final`이면 안됩니다.
    - `@Bean` 메소드는 주어진 컴포넌트나 configuration 클래스의 base 클래스 뿐만 아니라 컴포넌트 또는 configuration 클래스에 의해 구현된 인터페이스에 선언된 default 메소드에 붙여도 감지가 가능합니다.
        - 이로 인해 복잡한 configuration을 만들 때에도 상당한 유연성을 발휘할 수 있게 됩니다. 특히 Spring 4.2부터 Java 8의 default 메소드를 통해 가능해진 다중 상속으로 복잡한 configuration 배열을 구성할 때 그러합니다.
    - 마지막으로, 어떤 하나의 클래스는 같은 bean에 대한 여러 개의 `@Bean` 메소드를 갖고 있을 수 있습니다. 이는 여러 개의 팩토리 메소드들로 이루어집니다.
        - 이것은 가장 "탐욕스러운" 생성자 또는 팩토리 방법을 선택하는 것과 근본적으로 같은 알고리즘입니다.
        - 컨테이너가 여러 개의 `@Autowired` 생성자들 중에서 선택하는 방법론과 유사하게, 만족할 수 있는 dependency가 가장 많은 것이 생성시에 선택됩니다.

### 1.10.6. Naming Autodetected Components

[원문]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-scanning-name-generator )

>
When a component is autodetected as part of the scanning process, its bean name is generated by the `BeanNameGenerator` strategy known to that scanner. By default, any Spring stereotype annotation (`@Component`, `@Repository`, `@Service`, and `@Controller`) that contains a name `value` thereby provides that name to the corresponding bean definition.

스캐닝 프로세스 진행중에 컴포넌트가 자동으로 감지되면, 그 bean의 이름도 자동으로 생성이 되게 됩니다.
그리고 그 이름은 스캐너가 알고 있는 `BeanNameGenerator` 전략에 의해 결정됩니다.
기본적으로 `value`라는 이름을 가진 값을 갖는 Spring의 스테레오 타입 애노테이션들(`@Component`, `@Repository`, `@Service`, `@Controller`)도 같은 규칙에 따라 bean 정의에 이름을 제공합니다.

>
If such an annotation contains no name `value` or for any other detected component (such as those discovered by custom filters), the default bean name generator returns the uncapitalized non-qualified class name. For example, if the following component classes were detected, the names would be `myMovieLister` and `movieFinderImpl`:

만약 이런 애노테이션들이 `value` 값이 없거나, 그 외에 감지될만한 컴포넌트(커스텀 필터에 의해 발견된 것들도)가 포함되지 않은 경우라면, default bean name 제너레이터가 클래스 이름을 uncapitalized 하게 바꾼 이름을 리턴합니다.
예를 들어 다음 예제의 클래스가 감지되면, 이름은 `myMovieLister`와 `movieFinderImpl`이 될 것입니다.

```java
@Service("myMovieLister")
public class SimpleMovieLister {
    // ...
}
```

```java
@Repository
public class MovieFinderImpl implements MovieFinder {
    // ...
}
```

>
If you do not want to rely on the default bean-naming strategy, you can provide a custom bean-naming strategy. First, implement the [BeanNameGenerator]( https://docs.spring.io/spring-framework/docs/5.3.7/javadoc-api/org/springframework/beans/factory/support/BeanNameGenerator.html ) interface, and be sure to include a default no-arg constructor. Then, provide the fully qualified class name when configuring the scanner, as the following example annotation and bean definition show.

만약 여러분이 이런 default bean-naming 전략을 사용하고 싶지 않다면, 커스텀 bean-naming 전략을 만들어 제공하면 됩니다.
먼저, `BeanNameGenerator` 인터페이스를 구현하고, 인자가 하나도 없는 기본 생성자를 정의해 줍니다.
그런 다음, configuring할 때 다음 예제의 애노테이션과 bean definition과 같이 클래스 이름을 명시해 주면 됩니다.

>
If you run into naming conflicts due to multiple autodetected components having the same non-qualified class name (i.e., classes with identical names but residing in different packages), you may need to configure a `BeanNameGenerator` that defaults to the fully qualified class name for the generated bean name. As of Spring Framework 5.2.3, the `FullyQualifiedAnnotationBeanNameGenerator` located in package `org.springframework.context.annotation` can be used for such purposes.
{:style="background-color: #e9f1f6;"}

- 만약 자동 감지된 컴포넌트들 중 non-qualified 클래스 이름이 똑같아서(다른 패키지에 있어도 이름이 같은 클래스 포함) 충돌이 발생하는 경우, 기본적으로 fully qualified 클래스 이름을 생성하도록 `BeanNameGenerator`를 configure해야 할 수 있습니다.
- Spring 프레임워크 5.2.3 부터는 `org.springframework.context.annotation` 패키지에 있는 `FullyQualifiedAnnotationBeanNameGenerator`를 이러한 목적으로 사용할 수 있습니다.

```java
@Configuration
@ComponentScan(basePackages = "org.example", nameGenerator = MyNameGenerator.class)
public class AppConfig {
    // ...
}
```

```xml
<beans>
    <context:component-scan base-package="org.example"
        name-generator="org.example.MyNameGenerator" />
</beans>
```

>
As a general rule, consider specifying the name with the annotation whenever other components may be making explicit references to it. On the other hand, the auto-generated names are adequate whenever the container is responsible for wiring.

일반적으로 컴포넌트가 애노테이션을 명시적으로 참조할 때마다 애노테이션에 이름도 함께 지정하는 것도 고려해 볼 필요가 있습니다.
반면, 자동으로 생성된 이름들은 컨테이너가 wiring 할 때 알아서 사용합니다.

### 1.10.7. Providing a Scope for Autodetected Components

[원문]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-scanning-scope-resolver )

>
As with Spring-managed components in general, the default and most common scope for autodetected components is `singleton`. However, sometimes you need a different scope that can be specified by the `@Scope` annotation. You can provide the name of the scope within the annotation, as the following example shows:

Spring이 관리하는 일반적인 컴포넌트와 같이, 자동 감지 컴포넌트는 대부분 `singleton`입니다.
그러나 때로는 `@Scope` 애노테이션으로 스코프를 지정할 필요가 있습니다.
다음 예제와 같이 스코프를 지정할 수 있습니다.

```java
@Scope("prototype")
@Repository
public class MovieFinderImpl implements MovieFinder {
    // ...
}
```

> (i)
`@Scope` annotations are only introspected on the concrete bean class (for annotated components) or the factory method (for `@Bean` methods). In contrast to XML bean definitions, there is no notion of bean definition inheritance, and inheritance hierarchies at the class level are irrelevant for metadata purposes.
{:style="background-color: #ecf1e8;"}

- (i)
    - `@Scope` 애노테이션은 콘크리트 bean 클래스(이면서 애노테이션이 붙은 컴포넌트) 또는 팩토리 메소드(`@Bean`이 붙은 메소드)에서만 적용됩니다.
    - XML bean 정의와 달리 bean definition을 상속받는다는 개념이 없으며, 클래스 레벨의 상속 계층은 메타데이터들 사이에서는 관련이 없습니다.

>
For details on web-specific scopes such as “request” or “session” in a Spring context, see [Request, Session, Application, and WebSocket Scopes]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-factory-scopes-other ). As with the pre-built annotations for those scopes, you may also compose your own scoping annotations by using Spring’s meta-annotation approach: for example, a custom annotation meta-annotated with `@Scope("prototype")`, possibly also declaring a custom scoped-proxy mode.

Spring 컨텍스트에서 "request", "session" 과 같은 web-specific 스코프에 대한 자세한 내용은 [Request, Session, Application, and WebSocket Scopes]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-factory-scopes-other ) 문서를 참고하세요.

이러한 스코프에 대해 pre-built annotatione들과 마찬가지로, Spring의 meta-annotation 방법을 사용해 여러분의 스코프 애노테이션을 만들 수도 있습니다.
예를 들어, `@Scope("prototype")` meta-annotation이 붙은 커스텀 애노테이션으로 custom scoped-proxy mode를 선언할 수도 있습니다.

> (i)
To provide a custom strategy for scope resolution rather than relying on the annotation-based approach, you can implement the [ScopeMetadataResolver]( https://docs.spring.io/spring-framework/docs/5.3.7/javadoc-api/org/springframework/context/annotation/ScopeMetadataResolver.html ) interface. Be sure to include a default no-arg constructor. Then you can provide the fully qualified class name when configuring the scanner, as the following example of both an annotation and a bean definition shows:
{:style="background-color: #ecf1e8;"}

- (i)
    - 애노테이션 방법을 쓰지 않고 커스텀 스코프를 제공하려면, `ScopeMetadataResolver` 인터페이스를 구현하는 방법도 있습니다.
        - 인자가 없는 기본 생성자가 있어야 합니다.
        - 그런 다음, 다음 예제와 같이 스캐너를 configuring할 때 qualified class name을 제공해주면 됩니다.

```java
@Configuration
@ComponentScan(basePackages = "org.example", scopeResolver = MyScopeResolver.class)
public class AppConfig {
    // ...
}
```

```xml
<beans>
    <context:component-scan base-package="org.example" scope-resolver="org.example.MyScopeResolver"/>
</beans>
```

>
When using certain non-singleton scopes, it may be necessary to generate proxies for the scoped objects. The reasoning is described in [Scoped Beans as Dependencies]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-factory-scopes-other-injection ). For this purpose, a scoped-proxy attribute is available on the component-scan element. The three possible values are: `no`, `interfaces`, and `targetClass`. For example, the following configuration results in standard JDK dynamic proxies:

싱글톤이 아닌 스코프를 사용할 때 scoped objects에 대한 프록시를 생성해야 할 수도 있습니다.
그 이유는 [Scoped Beans as Dependencies]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-factory-scopes-other-injection ) 문서에 나와 있습니다.
그러한 이유로 component-scan 엘리먼트에서 scoped-proxy 속성을 사용할 수 있습니다.
이 값으로 설정 가능한 것은 세 가지로 `no`, `interfaces`, `targetClass` 입니다.
예를 들어 다음 configuration은 스탠다드 JDK dynamic proxy를 생성합니다.


```java
@Configuration
@ComponentScan(basePackages = "org.example", scopedProxy = ScopedProxyMode.INTERFACES)
public class AppConfig {
    // ...
}
```

```xml
<beans>
    <context:component-scan base-package="org.example" scoped-proxy="interfaces"/>
</beans>
```

### 1.10.8. Providing Qualifier Metadata with Annotations

[원문]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-scanning-qualifiers )

>
The `@Qualifier` annotation is discussed in [Fine-tuning Annotation-based Autowiring with Qualifiers]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-autowired-annotation-qualifiers ). The examples in that section demonstrate the use of the `@Qualifier` annotation and custom qualifier annotations to provide fine-grained control when you resolve autowire candidates. Because those examples were based on XML bean definitions, the qualifier metadata was provided on the candidate bean definitions by using the `qualifier` or `meta` child elements of the `bean` element in the XML. When relying upon classpath scanning for auto-detection of components, you can provide the qualifier metadata with type-level annotations on the candidate class. The following three examples demonstrate this technique:

`@Qualifier` 애노테이션은 [Fine-tuning Annotation-based Autowiring with Qualifiers]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-autowired-annotation-qualifiers ) 문서에서 설명한 바 있습니다.
그 문서에서 등장한 예제는 `@Qualifier` 애노테이션과 커스텀 qualifier 애노테이션을 사용해서 autowire 후보를 결정할 때 세밀하게 컨트롤하는 방법을 보여주는 것이었습니다.

그러한 예제들은 XML bean definition 기반이었기 때문에 XML에 있는 bean 엘리먼트의 `qualifier`나 `meta` 엘리먼트를 사용해서 후보가 되는 bean 정의에 qualifier 메타데이터를 제공하고 있습니다.
컴포넌트에 대한 자동 감지를 위한 classpath 스캐닝에 의존할 때, 후보 클래스에 타입 레벨 애노테이션을 붙여 qualifier 메타데이터를 제공하는 방법이 있습니다.
다음 주석은 그 방법을 보여줍니다.

```java
@Component
@Qualifier("Action")
public class ActionMovieCatalog implements MovieCatalog {
    // ...
}
```

```java
@Component
@Genre("Action")
public class ActionMovieCatalog implements MovieCatalog {
    // ...
}
```

```java
@Component
@Offline
public class CachingMovieCatalog implements MovieCatalog {
    // ...
}
```

> (i)
As with most annotation-based alternatives, keep in mind that the annotation metadata is bound to the class definition itself, while the use of XML allows for multiple beans of the same type to provide variations in their qualifier metadata, because that metadata is provided per-instance rather than per-class.

- (i)
    - XML의 대안으로 쓸 수 있는 대부분의 애노테이션 설정과 마찬가지로, 애노테이션 메타데이터는 클래스 정의 자체에 바인딩됩니다. 그런데 XML을 사용하면 같은 타입의 여러 bean을 qualifier 메타데이터에 제공할 수도 있습니다.
    - 메타데이터가 클래스가 아닌 인스턴스별로 제공되기 때문입니다.

### 1.10.9. Generating an Index of Candidate Components

[원문]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-scanning-index )

>
While classpath scanning is very fast, it is possible to improve the startup performance of large applications by creating a static list of candidates at compilation time. In this mode, all modules that are targets of component scanning must use this mechanism.

classpath 스캔은 매우 빠르지만, 대규모 애플리케이션이라면 컴파일 타임에 스캔 후보에 대한 static 리스트(인덱스)를 만들어서 스타트업 퍼포먼스를 더 향상시킬 수 있습니다.
이 모드를 쓰면 컴포넌트 스캔의 대상이 되는 모든 모듈은 이 메커니즘을 사용해야 합니다.

> (i)
Your existing `@ComponentScan` or `<context:component-scan/>` directives must remain unchanged to request the context to scan candidates in certain packages. When the `ApplicationContext` detects such an index, it automatically uses it rather than scanning the classpath.
{:style="background-color: #ecf1e8;"}

- (i)
    - 특정 패키지의 후보를 스캔하기 위해 컨텍스트를 요청하려면 `@ComponentScan` 또는 `<context:component-scan/>` 구문을 수정하지 말고 써야 합니다.
    - `ApplicationContext`는 이런 인덱스를 감지하면 알아서 인덱스를 사용하고, classpath를 스캔하지 않습니다.

>
To generate the index, add an additional dependency to each module that contains components that are targets for component scan directives. The following example shows how to do so with Maven:

인덱스를 생성하려면, 컴포넌트 스캔 구문의 대상인 컴포넌트를 포함하는 각 모듈에 dependency를 추가해 주세요.

다음은 Maven 설정 예제입니다.

```xml
<dependencies>
    <dependency>
        <groupId>org.springframework</groupId>
        <artifactId>spring-context-indexer</artifactId>
        <version>5.3.7</version>
        <optional>true</optional>
    </dependency>
</dependencies>
```

>
With Gradle 4.5 and earlier, the dependency should be declared in the `compileOnly` configuration, as shown in the following example:

Gradle 4.5 이전 버전에서는 다음 예제와 같이 `compileOnly`로 dependency를 선언해줘야 합니다.

```groovy
dependencies {
    compileOnly "org.springframework:spring-context-indexer:5.3.7"
}
```

>
With Gradle 4.6 and later, the dependency should be declared in the `annotationProcessor` configuration, as shown in the following example:

Gradle 4.6 이후부터는 다음 예제와 같이 `annotationProcessor`에 dependency를 선언해 줍니다.

```groovy
dependencies {
    annotationProcessor "org.springframework:spring-context-indexer:{spring-version}"
}
```

>
The `spring-context-indexer` artifact generates a `META-INF/spring.components` file that is included in the jar file.

`spring-context-indexer` artifact는 jar 파일에 포함되는 `META-INF/spring.components` 파일을 생성합니다.


> (i)
When working with this mode in your IDE, the `spring-context-indexer` must be registered as an annotation processor to make sure the index is up-to-date when candidate components are updated.
{:style="background-color: #ecf1e8;"}

- (i)
    - IDE에서 이 모드로 작업할 때 인덱스에 반영된 후보 컴포넌트가 업데이트가 최신 상태인지 확인하려면 `spring-context-indexer`를 annotation processor로 등록해야 합니다.

>
The index is enabled automatically when a `META-INF/spring.components` file is found on the classpath. If an index is partially available for some libraries (or use cases) but could not be built for the whole application, you can fall back to a regular classpath arrangement (as though no index were present at all) by setting `spring.index.ignore` to `true`, either as a JVM system property or via the [SpringProperties]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/appendix.html#appendix-spring-properties ) mechanism.
{:style="background-color: #e9f1f6;"}

- `META-INF/spring.components`파일이 classpath에 있으면 인덱스가 자동으로 활성화됩니다.
- 만약 인덱스가 일부 러이브러리(또는 유즈 케이스)에서 부분적으로 사용하는 것은 가능한데 전체 애플리케이션에 대해 빌드할 수 없다면, `spring.index.ignore`를 설정해서 (인덱스가 아예 없는 것처럼) regular classpath arrangement로 fall back할 수 있습니다.
    - JVM system property 나 `SpringProperties` 메커니즘을 사용해 `true`로 설정하면 됩니다.


## 함께 읽기

- 목록으로 - [[/spring/document/core]]{Spring Core Technologies}
- 이전 문서 - [[/spring/document/core/01-09-annotation-based-container-config]]{1.9. Annotation-based Container Configuration}
- 다음 문서 - [[/spring/document/core/01-11-using-jsr-330-standard-annotations]]{1.11. Using JSR 330 Standard Annotations}


