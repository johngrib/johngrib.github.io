---
layout  : wiki
title   : Spring Core Technologies - 1.11. Using JSR 330 Standard Annotations
summary : 
date    : 2021-07-10 12:00:30 +0900
updated : 2021-07-19 21:51:31 +0900
tag     : java spring
resource: BE/581B78-1213-4A79-99B5-567167915411
toc     : true
public  : true
parent  : [[/spring/document/core]]
latex   : false
---
* TOC
{:toc}

- 목록으로 - [[/spring/document/core]]{Spring Core Technologies}
- 이전 문서 - [[/spring/document/core/01-10-classpath-scanning-and-managed-components]]{1.10. Classpath Scanning and Managed Components}
- 다음 문서 - [[/spring/document/core/01-12-java-based-container-config]]{1.12. Java-based Container Configuration}

## 1.11. Using JSR 330 Standard Annotations

[원문]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-standard-annotations )

>
Starting with Spring 3.0, Spring offers support for JSR-330 standard annotations (Dependency Injection). Those annotations are scanned in the same way as the Spring annotations. To use them, you need to have the relevant jars in your classpath.

Spring 3.0부터 Spring은 JSR-330 스탠다드 애노테이션(Dependency Injection)을 지원합니다.
해당 애노테이션들은 Spring 애노테이션들과 같은 방법으로 스캔되며, 사용하려면 classpath에 그와 관계된 jar 파일들이 있어야 합니다.

> (i)
If you use Maven, the `javax.inject` artifact is available in the standard Maven repository (<https://repo1.maven.org/maven2/javax/inject/javax.inject/1/ >). You can add the following dependency to your file pom.xml:
{:style="background-color: #ecf1e8;"}

Maven을 사용한다면 `javax.inject` 아티팩트를 스탠다드 Maven 저장소(<https://repo1.maven.org/maven2/javax/inject/javax.inject/1/ >)에서 찾아볼 수 있습니다.
pom.xml 파일에는 다음과 같이 추가하면 됩니다.

```xml
<dependency>
    <groupId>javax.inject</groupId>
    <artifactId>javax.inject</artifactId>
    <version>1</version>
</dependency>
```

### 1.11.1. Dependency Injection with @Inject and @Named

[원문]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-inject-named )

>
Instead of `@Autowired`, you can use `@javax.inject.Inject` as follows:

`@Autowired` 대신 다음과 같이 `@javax.inject.Inject`를 사용할 수 있습니다.

```java
import javax.inject.Inject;

public class SimpleMovieLister {

    private MovieFinder movieFinder;

    @Inject
    public void setMovieFinder(MovieFinder movieFinder) {
        this.movieFinder = movieFinder;
    }

    public void listMovies() {
        this.movieFinder.findMovies(...);
        // ...
    }
}
```

>
As with `@Autowired`, you can use `@Inject` at the field level, method level and constructor-argument level. Furthermore, you may declare your injection point as a `Provider`, allowing for on-demand access to beans of shorter scopes or lazy access to other beans through a `Provider.get()` call. The following example offers a variant of the preceding example:

`@Inject`는 `@Autowired` 처럼 필드, 메소드, 생성자 인자 레벨에서 사용할 수 있습니다.
또한, 주입 지점을 `Provider`로 선언할 수도 있는데 이 방법은 `Provider.get()`을 호출해 bean을 엑세스하므로, bean을 lazy하게 엑세스할 필요가 있거나 더 좁은 스코프의 bean인 경우를 다룰 수 있습니다.
다음 예는 위의 예제를 조금 변형한 것입니다.

```java
import javax.inject.Inject;
import javax.inject.Provider;

public class SimpleMovieLister {

    private Provider<MovieFinder> movieFinder;

    @Inject
    public void setMovieFinder(Provider<MovieFinder> movieFinder) {
        this.movieFinder = movieFinder;
    }

    public void listMovies() {
        this.movieFinder.get().findMovies(...);
        // ...
    }
}
```

>
If you would like to use a qualified name for the dependency that should be injected, you should use the `@Named` annotation, as the following example shows:

주입하려는 dependency에 대해 qualified name을 사용하려면 다음 예제와 같이 `@Named` 애노테이션을 사용해야 합니다.

```java
import javax.inject.Inject;
import javax.inject.Named;

public class SimpleMovieLister {

    private MovieFinder movieFinder;

    @Inject
    public void setMovieFinder(@Named("main") MovieFinder movieFinder) {
        this.movieFinder = movieFinder;
    }

    // ...
}
```

>
As with `@Autowired`, `@Inject` can also be used with `java.util.Optional` or `@Nullable`. This is even more applicable here, since `@Inject` does not have a `required` attribute. The following pair of examples show how to use `@Inject` and `@Nullable`:

`@Autowired`와 마찬가지로 `@Inject`는 `java.util.Optional`이나 `@Nullable`과 함께 사용할 수 있습니다.
`@Inject`에는 `required` 속성이 없으므로 좀 더 적용하기 좋습니다.
다음 두 예제는 `@Inject`와 `@Nullable`을 함께 사용하는 방법을 보여줍니다.

```java
public class SimpleMovieLister {

    @Inject
    public void setMovieFinder(Optional<MovieFinder> movieFinder) {
        // ...
    }
}
```

```java
public class SimpleMovieLister {

    @Inject
    public void setMovieFinder(@Nullable MovieFinder movieFinder) {
        // ...
    }
}
```

### 1.11.2. @Named and @ManagedBean: Standard Equivalents to the @Component Annotation

[원문]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-named )

>
Instead of `@Component`, you can use `@javax.inject.Named` or `javax.annotation.ManagedBean`, as the following example shows:

`@Component` 대신으로는 `@javax.inject.Named`나 `javax.annotation.ManagedBean`를 사용할 수 있습니다.

```java
import javax.inject.Inject;
import javax.inject.Named;

@Named("movieListener")  // @ManagedBean("movieListener") could be used as well
public class SimpleMovieLister {

    private MovieFinder movieFinder;

    @Inject
    public void setMovieFinder(MovieFinder movieFinder) {
        this.movieFinder = movieFinder;
    }

    // ...
}
```

>
It is very common to use `@Component` without specifying a name for the component. `@Named` can be used in a similar fashion, as the following example shows:

`@Component`를 쓸 때 컴포넌트의 이름을 지정하지 않는 것은 흔한 일이죠.
`@Named`도 그와 비슷한 방법으로 사용할 수 있습니다.

```java
import javax.inject.Inject;
import javax.inject.Named;

@Named
public class SimpleMovieLister {

    private MovieFinder movieFinder;

    @Inject
    public void setMovieFinder(MovieFinder movieFinder) {
        this.movieFinder = movieFinder;
    }

    // ...
}
```

>
When you use `@Named` or `@ManagedBean`, you can use component scanning in the exact same way as when you use Spring annotations, as the following example shows:

`@Named` 또는 `@ManagedBean`을 사용한다면, 다음 예제와 같이 Spring의 애노테이션을 쓸 때와 똑같은 방식으로 컴포넌트 스캔을 할 수 있습니다.

```java
@Configuration
@ComponentScan(basePackages = "org.example")
public class AppConfig  {
    // ...
}
```

> (i)
In contrast to `@Component`, the JSR-330 `@Named` and the JSR-250 `ManagedBean` annotations are not composable. You should use Spring’s stereotype model for building custom component annotations.
{:style="background-color: #ecf1e8;"}

`@Component`와 다르게, JSR-300의 `@Named`와 JSR-250의 `ManagedBean` 애노테이션들은 구성할 수 없습니다(not composable).
커스텀 컴포넌트 애노테이션을 빌드하려면 Spring의 스테레오 타입 모델을 사용해야 합니다.

### 1.11.3. Limitations of JSR-330 Standard Annotations

[원문]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-standard-annotations-limitations )

>
When you work with standard annotations, you should know that some significant features are not available, as the following table shows:

스탠다드 애노테이션을 사용해 작업을 할 때에는 다음 표와 같이 몇몇 중요한 기능은 사용할 수 없다는 점을 기억해 두어야 합니다.

>
Table 6. Spring component model elements versus JSR-330 variants

<div id="table1"></div>
- th
    - Spring
    - javax.inject.*
    - javax.inject restrictions / comments
- tr
    - @Autowired
    - @Inject
    - @Inject has no 'required' attribute. Can be used with Java 8’s Optional instead.
- tr
    - @Component
    - `@Named` / `@ManagedBean`
    - JSR-330 does not provide a composable model, only a way to identify named components.
- tr
    - @Scope("singleton")
    - @Singleton
    - The JSR-330 default scope is like Spring’s prototype. However, in order to keep it consistent with Spring’s general defaults, a JSR-330 bean declared in the Spring container is a singleton by default. In order to use a scope other than singleton, you should use Spring’s @Scope annotation. javax.inject also provides a @Scope annotation. Nevertheless, this one is only intended to be used for creating your own annotations.
- tr
    - @Qualifier
    - @Qualifier / @Named
    - javax.inject.Qualifier is just a meta-annotation for building custom qualifiers. Concrete String qualifiers (like Spring’s @Qualifier with a value) can be associated through javax.inject.Named.
- tr
    - @Value
    - -
    - no equivalent
- tr
    - @Required
    - -
    - no equivalent
- tr
    - @Lazy
    - -
    - no equivalent
- tr
    - ObjectFactory
    - Provider
    - javax.inject.Provider is a direct alternative to Spring’s ObjectFactory, only with a shorter get() method name. It can also be used in combination with Spring’s @Autowired or with non-annotated constructors and setter methods.
{:class="table-generate" data-target-id="table1"}

 - `@Autowired`와 `@Inject`
     - `@Inject`에는 required(필수) 속성이 없는 대신, Java 8의 `Optional`과 함께 사용 가능합니다.
 - `@Component`와 `@Named` / `@ManagedBean`
     - JSR-330은 composable model을 제공하지 않으며, 명명된 컴포넌트를 식별하는 방법만 제공합니다.
 - `@Scope("singleton")`과 `@Singleton`
     - JSR-330의 디폴트 스코프는 Spring의 `prototype`과 같습니다.
     - 그러나 Spring 기본값과 일관성을 유지하기 위해 Spring 컨테이너에 선언된 JSR-330 bean의 기본값은 싱글톤입니다.
     - 싱글톤이 아닌 다른 스코프를 사용하려면 Spring의 `@Scope` 애노테이션을 사용해야 합니다.
     - `javax.inject`는 `@Scope` 애노테이션도 제공하지만, 커스텀 애노테이션을 만들 때에만 사용 가능합니다.
 - `@Qualifier`와 `@Qualifier` / `@Named`
     - `javax.inject.Qualifier`는 커스텀 qualifier를 빌드하기 위한 메타 애노테이션일 뿐입니다.
     - (`value`를 지정할 수 있는 Spring의 `@Qualifier` 같은) 구체적인 `String` qualifier는 `javax.inject.Named`를 사용해야 연결할 수 있습니다.
 - `@Value`
     - Spring에는 있지만 `javax.inject`에는 없음.
 - `@Required`
     - Spring에는 있지만 `javax.inject`에는 없음.
 - `ObjectFactory`와 `Provider`
     - `javax.inject.Provider`는 `get()` 메소드를 갖고 있다는 점만 다를 뿐 Spring의 `ObjectFactory`를 대신해서 쓸 수 있습니다.
     - Spring의 `@Autowired`, 애노테이션이 없는 생성자, setter 메소드와 함께 사용할 수도 있습니다.


## 함께 읽기

- 목록으로 - [[/spring/document/core]]{Spring Core Technologies}
- 이전 문서 - [[/spring/document/core/01-10-classpath-scanning-and-managed-components]]{1.10. Classpath Scanning and Managed Components}
- 다음 문서 - [[/spring/document/core/01-12-java-based-container-config]]{1.12. Java-based Container Configuration}

