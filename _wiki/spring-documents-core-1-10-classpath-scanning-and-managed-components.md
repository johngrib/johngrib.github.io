---
layout  : wiki
title   : Spring Core Technologies - 1.10. Classpath Scanning and Managed Components
summary : 
date    : 2021-07-04 15:30:15 +0900
updated : 2021-07-07 02:12:28 +0900
tag     : java spring
toc     : true
public  : true
parent  : [[spring-documents]]
latex   : false
---
* TOC
{:toc}

- 목록으로 - [[spring-documents-core]]{Spring Core Technologies}
- 이전 문서 - [[spring-documents-core-1-9-annotation-based-container-config]]{1.9. Annotation-based Container Configuration}
- 다음 문서 - {1.11. Using JSR 330 Standard Annotations}

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


## 함께 읽기

- 목록으로 - [[spring-documents-core]]{Spring Core Technologies}
- 이전 문서 - [[spring-documents-core-1-9-annotation-based-container-config]]{1.9. Annotation-based Container Configuration}
- 다음 문서 - {1.11. Using JSR 330 Standard Annotations}

