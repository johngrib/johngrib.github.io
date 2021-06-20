---
layout  : wiki
title   : Spring Core Technologies - 1.6. Customizing the Nature of a Bean
summary : 
date    : 2021-06-19 23:13:51 +0900
updated : 2021-06-21 00:02:30 +0900
tag     : java spring
toc     : true
public  : true
parent  : [[spring-documents]]
latex   : false
---
* TOC
{:toc}

- 목록으로 - [[spring-documents-core]]{Spring Core Technologies}
- 이전 문서 - [[spring-documents-core-1-5-bean-scopes]]{1.5. Bean Scopes}
- 다음 문서 - 

## 1.6. Customizing the Nature of a Bean

[원문]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-factory-nature )

>
The Spring Framework provides a number of interfaces you can use to customize the nature of a bean. This section groups them as follows:
>
- [Lifecycle Callbacks]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-factory-lifecycle )
- [`ApplicationContextAware` and `BeanNameAware`]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-factory-aware )
- [Other `Aware` Interfaces]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#aware-list )

Spring 프레임워크는 bean의 특성을 커스터마이즈할 수 있게끔 하는 여러 인터페이스를 제공합니다.

이 섹션에서는 그런 인터페이스들을 다음과 같이 분류합니다.

- [Lifecycle Callbacks]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-factory-lifecycle )
- [`ApplicationContextAware`과 `BeanNameAware`]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-factory-aware )
- [그 외의 `Aware` 인터페이스들]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#aware-list )

### 1.6.1. Lifecycle Callbacks

[원문]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-factory-lifecycle )

>
To interact with the container’s management of the bean lifecycle, you can implement the Spring `InitializingBean` and `DisposableBean` interfaces. The container calls `afterPropertiesSet()` for the former and `destroy()` for the latter to let the bean perform certain actions upon initialization and destruction of your beans.

컨테이너의 bean 생명주기 관리와 상호작용하기 위해, Spring의 `InitializingBean`과 `DisposableBean` 인터페이스를 구현할 수 있습니다.
- 컨테이너는 `InitializingBean`에 대해 `afterPropertiesSet()`를 호출하고, `DisposableBean`에 대해 `destroy()`를 호출하여 bean이 초기화되거나 소멸할 때 특정 작업을 수행하도록 합니다.

>
(i) The JSR-250 `@PostConstruct` and `@PreDestroy` annotations are generally considered best practice for receiving lifecycle callbacks in a modern Spring application. Using these annotations means that your beans are not coupled to Spring-specific interfaces. For details, see [Using @PostConstruct and @PreDestroy]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-postconstruct-and-predestroy-annotations ).
>
If you do not want to use the JSR-250 annotations but you still want to remove coupling, consider `init-method` and `destroy-method` bean definition metadata.

- (i) 참고
    - JSR-250 `@PostConstruct`와 `PreDestroy` 애노테이션은 모던 Spring 애플리케이션에서 일반적으로 생명주기 콜백을 수신하기 위한 모범적인 사례입니다.
    - 이 애노테이션들을 사용한다는 것은 여러분의 bean이 Spring에 특화된 인터페이스에 연결되지 않는다는 것을 의미합니다.
    - 자세한 내용은 [Using @PostConstruct and @PreDestroy]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-postconstruct-and-predestroy-annotations ) 문서를 참고하세요.
    - JSR-250 애노테이션을 사용하지는 않지만, 커플링을 제거하는 것에 관심이 있다면 bean 정의 메타데이터에서 `init-method`와 `destroy-method`를 사용하는 것을 고려해 보세요.

>
Internally, the Spring Framework uses `BeanPostProcessor` implementations to process any callback interfaces it can find and call the appropriate methods. If you need custom features or other lifecycle behavior Spring does not by default offer, you can implement a `BeanPostProcessor` yourself. For more information, see [Container Extension Points]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-factory-extension ).

Spring 프레임워크는 내부적으로 `BeanPostProcessor` 구현을 사용하여 적절한 메소드를 찾아 호출할 수 있는 모든 콜백 인터페이스를 처리합니다.
- 만약 커스텀 기능이 필요하거나 Spring이 기본적으로 제공하지 않는 다른 생명주기 동작이 필요한 경우 `BeanPostProcessor`를 직접 구현할 수 있습니다.
- 자세한 내용은 [Container Extension Points]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-factory-extension )문서를 참고하세요.

>
In addition to the initialization and destruction callbacks, Spring-managed objects may also implement the `Lifecycle` interface so that those objects can participate in the startup and shutdown process, as driven by the container’s own lifecycle.
>
The lifecycle callback interfaces are described in this section.

초기화와 소멸 콜백 외에도, Spring이 관리하는 객체들은 `Lifecycle` 인터페이스를 구현하여 해당 객체가 컨테이너의 자체 생명주기에 따라 작동하는 시작/종료 프로세스에 참여하도록 할 수 있습니다.

이 섹션에서는 생명주기 콜백 인터페이스에 대해 설명합니다.

#### Initialization Callbacks

[원문]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-factory-lifecycle-initializingbean )

## 함께 읽기

- 목록으로 - [[spring-documents-core]]{Spring Core Technologies}
- 이전 문서 - [[spring-documents-core-1-5-bean-scopes]]{1.5. Bean Scopes}
- 다음 문서 - 


