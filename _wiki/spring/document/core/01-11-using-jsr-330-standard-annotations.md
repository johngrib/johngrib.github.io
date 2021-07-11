---
layout  : wiki
title   : Spring Core Technologies - 1.11. Using JSR 330 Standard Annotations
summary : 
date    : 2021-07-10 12:00:30 +0900
updated : 2021-07-11 11:44:48 +0900
tag     : java spring
toc     : true
public  : true
parent  : [[/spring/document/core]]
latex   : false
---
* TOC
{:toc}

- 목록으로 - [[/spring/document/core]]{Spring Core Technologies}
- 이전 문서 - [[/spring/document/core/01-10-classpath-scanning-and-managed-components]]{1.10. Classpath Scanning and Managed Components}
- 다음 문서 - {1.12. Java-based Container Configuration}

## 1.11. Using JSR 330 Standard Annotations

[원문]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-standard-annotations )

Starting with Spring 3.0, Spring offers support for JSR-330 standard annotations (Dependency Injection). Those annotations are scanned in the same way as the Spring annotations. To use them, you need to have the relevant jars in your classpath.

Spring 3.0부터 Spring은 JSR-330 스탠다드 애노테이션(Dependency Injection)을 지원합니다.
해당 애노테이션들은 Spring 애노테이션들과 같은 방법으로 스캔되며, 사용하려면 classpath에 그와 관계된 jar 파일들이 있어야 합니다.

> (i)
If you use Maven, the `javax.inject` artifact is available in the standard Maven repository (<https://repo1.maven.org/maven2/javax/inject/javax.inject/1/ >). You can add the following dependency to your file pom.xml:

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

## 함께 읽기

- 목록으로 - [[/spring/document/core]]{Spring Core Technologies}
- 이전 문서 - [[/spring/document/core/01-10-classpath-scanning-and-managed-components]]{1.10. Classpath Scanning and Managed Components}
- 다음 문서 - {1.12. Java-based Container Configuration}

