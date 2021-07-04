---
layout  : wiki
title   : Spring Core Technologies - 1.10. Classpath Scanning and Managed Components
summary : 
date    : 2021-07-04 15:30:15 +0900
updated : 2021-07-04 16:36:22 +0900
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

## 함께 읽기

- 목록으로 - [[spring-documents-core]]{Spring Core Technologies}
- 이전 문서 - [[spring-documents-core-1-9-annotation-based-container-config]]{1.9. Annotation-based Container Configuration}
- 다음 문서 - {1.11. Using JSR 330 Standard Annotations}

