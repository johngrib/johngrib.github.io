---
layout  : wiki
title   : Spring Core Technologies - 1.10. Classpath Scanning and Managed Components
summary : 
date    : 2021-07-04 15:30:15 +0900
updated : 2021-07-04 15:45:21 +0900
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

## 함께 읽기

- 목록으로 - [[spring-documents-core]]{Spring Core Technologies}
- 이전 문서 - [[spring-documents-core-1-9-annotation-based-container-config]]{1.9. Annotation-based Container Configuration}
- 다음 문서 - {1.11. Using JSR 330 Standard Annotations}

