---
layout  : wiki
title   : Spring Core Technologies - 1.16. The BeanFactory
summary : 
date    : 2021-07-28 20:30:12 +0900
updated : 2021-07-28 21:00:47 +0900
tag     : java spring
toc     : true
public  : true
parent  : [[/spring/document/core]]
latex   : false
---
* TOC
{:toc}

- 목록으로 - [[/spring/document/core]]
- 이전 문서 - [[/spring/document/core/01-15-additional-capabilities-ac]]
- 다음 문서 - 2. Resources

## 1.16. The `BeanFactory`

[원문]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-beanfactory )

>
The `BeanFactory` API provides the underlying basis for Spring’s IoC functionality.
Its specific contracts are mostly used in integration with other parts of Spring and related third-party frameworks, and its `DefaultListableBeanFactory` implementation is a key delegate within the higher-level `GenericApplicationContext` container.

`BeanFactory` API는 Spring의 IoC 기능을 위한 토대롤 제공합니다.
contract 대부분은 Spring의 다른 부분이나 서드 파티 프레임워크와의 통합을 위한 것이며, 그 중 `DefaultListableBeanFactory` 구현체는 고수준 `GenericApplicationContext` 컨테이너의 핵심적인 대리자가 됩니다.

>
`BeanFactory` and related interfaces (such as `BeanFactoryAware`, `InitializingBean`, `DisposableBean`) are important integration points for other framework components.
By not requiring any annotations or even reflection, they allow for very efficient interaction between the container and its components.
Application-level beans may use the same callback interfaces but typically prefer declarative dependency injection instead, either through annotations or through programmatic configuration.

`BeanFactory`와 그와 관련된 인터페이스들(`BeanFactoryAware`, `InitializingBean`, `DisposableBean` 같은 것들)은 다른 프레임워크 컴포넌트에 대한 중요한 통합 지점입니다.
이들은 애노테이션이나 리플렉션에 의존하지 않고 있으므로 컨테이너와 컴포넌트 간의 상호작용이 매우 효율적입니다.
애플리케이션 레벨의 bean들은 동일한 callback 인터페이스를 사용하는 것이 가능하지만, 일반적으로는 애노테이션이나 프로그래밍 방식의 configuration을 통해 선언적 의존관계 주입하는 경우가 많습니다.

>
Note that the core `BeanFactory` API level and its `DefaultListableBeanFactory` implementation do not make assumptions about the configuration format or any component annotations to be used.
All of these flavors come in through extensions (such as `XmlBeanDefinitionReader` and `AutowiredAnnotationBeanPostProcessor`) and operate on shared `BeanDefinition` objects as a core metadata representation.
This is the essence of what makes Spring’s container so flexible and extensible.

코어 `BeanFactory` API 레벨과, 그것의 `DefaultListableBeanFactory` 구현은 어떤 종류의 configuration 포맷을 사용하고, 어떤 컴포넌트 애노테이션을 사용할지에 대해 아무것도 전제하지 않고 있습니다.
이러한 구체적인 특징들은 확장(`XmlBeanDefinitionReader`, `AutowiredAnnotationBeanPostProcessor` 같은 것들)을 통해 제공되며, 코어 메타데이터의 표현은 공유된 `BeanDefinition` 객체를 사용합니다.
이것이 바로 Spring 컨테이너를 유연하고 확장 가능하게 만드는 핵심 기술이라 할 수 있습니다.

### 1.16.1. `BeanFactory` or `ApplicationContext`?

[원문]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#context-introduction-ctx-vs-beanfactory )


## 함께 읽기

- 목록으로 - [[/spring/document/core]]
- 이전 문서 - [[/spring/document/core/01-15-additional-capabilities-ac]]
- 다음 문서 - 2. Resources
