---
layout  : wiki
title   : Spring Core Technologies - 1.6. Customizing the Nature of a Bean
summary : 
date    : 2021-06-19 23:13:51 +0900
updated : 2021-06-22 22:37:15 +0900
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

>
The `org.springframework.beans.factory.InitializingBean` interface lets a bean perform initialization work after the container has set all necessary properties on the bean. The `InitializingBean` interface specifies a single method:

`org.springframework.beans.factory.InitializingBean` 인터페이스를 사용하면 컨테이너가 bean에 필요한 모든 속성을 설정한 이후에, bean의 초기화 작업을 할 수 있습니다.
`InitializingBean` 인터페이스는 딱 하나의 메소드를 갖고 있습니다.

```java
void afterPropertiesSet() throws Exception;
```

>
We recommend that you do not use the `InitializingBean` interface, because it unnecessarily couples the code to Spring. Alternatively, we suggest using the [@PostConstruct]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-postconstruct-and-predestroy-annotations ) annotation or specifying a POJO initialization method. In the case of XML-based configuration metadata, you can use the `init-method` attribute to specify the name of the method that has a void no-argument signature. With Java configuration, you can use the `initMethod` attribute of `@Bean`. See [Receiving Lifecycle Callbacks]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-java-lifecycle-callbacks ). Consider the following example:

`InitializingBean` 인터페이스 사용은 추천하지 않습니다.
- 코드와 Spring 사이에 불필요한 커플링이 발생하기 때문입니다.
- 대안으로 `@PostConstruct` 애노테이션이나 POJO 방식의 초기화 메소드를 사용하는 것을 추천합니다.
- XML로 설정하는 경우 `init-method` 속성을 사용해 메소드의 이름을 지정할 수 있습니다.
    - 해당 메소드읫 시그니처는 리턴타입이 void 이고, 입력 인자가 없어야 합니다.
    - 아래의 예제를 참고하세요.
- Java 코드 기반의 설정에서는 `@Bean`의 `initMethod`를 사용할 수 있습니다.
    - [Receiving Lifecycle Callbacks]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-java-lifecycle-callbacks ) 문서를 참고하세요.

```xml
<bean id="exampleInitBean" class="examples.ExampleBean" init-method="init"/>
```

```java
public class ExampleBean {

    public void init() {
        // do some initialization work
    }
}
```

>
The preceding example has almost exactly the same effect as the following example (which consists of two listings):

위의 예는 아래의 예와 거의 똑같은 효과를 갖습니다.

```xml
<bean id="exampleInitBean" class="examples.AnotherExampleBean"/>
```

```java
public class AnotherExampleBean implements InitializingBean {

    @Override
    public void afterPropertiesSet() {
        // do some initialization work
    }
}
```

>
However, the first of the two preceding examples does not couple the code to Spring.

그러나 처음의 예제는 두 번째 예제와는 달리 Spring과 커플링이 발생하지 않습니다.
- 두번째 예제는 `InitializingBean` 인터페이스를 구현했기 때문.

#### Destruction Callbacks

[원문]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-factory-lifecycle-disposablebean )

>
Implementing the `org.springframework.beans.factory.DisposableBean` interface lets a bean get a callback when the container that contains it is destroyed. The `DisposableBean` interface specifies a single method:

`org.springframework.beans.factory.DisposableBean` 인터페이스를 구현하면 컨테이너가 파괴될 때 bean이 콜백을 받아 실행하게 됩니다.

`DisposableBean` 인터페이스에는 메소드가 하나 정의되어 있습니다.

```java
void destroy() throws Exception;
```

>
We recommend that you do not use the `DisposableBean` callback interface, because it unnecessarily couples the code to Spring. Alternatively, we suggest using the [@PreDestroy]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-postconstruct-and-predestroy-annotations ) annotation or specifying a generic method that is supported by bean definitions. With XML-based configuration metadata, you can use the `destroy-method` attribute on the `<bean/>`. With Java configuration, you can use the `destroyMethod` attribute of `@Bean`. See [Receiving Lifecycle Callbacks]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-java-lifecycle-callbacks ). Consider the following definition:

그러나 `DisposableBean` 콜백 인터페이스의 사용을 추천하지는 않습니다.
- 이 인터페이스를 사용하면 Spring과 코드 사이에 불필요한 커플링이 생깁니다.
- 대안으로, `@PreDestroy` 애노테이션을 사용하거나, bean 정의에 소멸에 사용할 메소드를 지정하는 것이 좋습니다.
- XML 설정 기반에서는 `<bean/>`에서 `destroy-method` 속성을 사용하는 것도 고려할 수 있습니다.
- Java 설정 기반에서는 `@Bean`의 `destroyMethod` 속성을 이용할 수 있습니다.
- 자세한 내용은 [Receiving Lifecycle Callbacks]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-java-lifecycle-callbacks ) 문서를 참고하세요.


```xml
<bean id="exampleInitBean" class="examples.ExampleBean" destroy-method="cleanup"/>
```

```java
public class ExampleBean {

    public void cleanup() {
        // do some destruction work (like releasing pooled connections)
    }
}
```

>
The preceding definition has almost exactly the same effect as the following definition:

위의 예제는 다음 설정과 거의 똑같은 효과를 갖습니다.

```xml
<bean id="exampleInitBean" class="examples.AnotherExampleBean"/>
```

```java
public class AnotherExampleBean implements DisposableBean {

    @Override
    public void destroy() {
        // do some destruction work (like releasing pooled connections)
    }
}
```

>
However, the first of the two preceding definitions does not couple the code to Spring.

그러나, 두 예제 중 앞의 예제는 Spring과의 커플링이 없는 코드입니다.

>
(i) You can assign the `destroy-method` attribute of a `<bean>` element a special `(inferred)` value, which instructs Spring to automatically detect a public `close` or `shutdown` method on the specific bean class. (Any class that implements `java.lang.AutoCloseable` or `java.io.Closeable` would therefore match.) You can also set this special `(inferred)` value on the `default-destroy-method` attribute of a `<beans>` element to apply this behavior to an entire set of beans (see [Default Initialization and Destroy Methods]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-factory-lifecycle-default-init-destroy-methods )). Note that this is the default behavior with Java configuration.

- (i) 참고
    - `<bean>`엘리먼트의 `destroy-method` 속성에 특수한 `(inferred)` 값을 지정할 수 있습니다.
        - 이 설정은 Spring이 특정 bean 클래스에서 public `close` 또는 public `shutdown` 메소드를 자동으로 감지하도록 명령합니다.
            - (그러므로 `java.lang.AutoCloseable`, `java.io.Closeable`을 구현하는 모든 클래스가 이에 해당됩니다.)
    - 또한, 이 특수한 `(inferred)` 값을 `<beans>` 엘리먼트의 `default-destroy-method`에 설정하여, 이 동작을 전체 bean의 동작으로 적용하는 것도 가능합니다.
        - (자세한 내용은 [Default Initialization and Destroy Methods]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-factory-lifecycle-default-init-destroy-methods ) 문서를 참고하세요.)
    - 참고로 `(inferred)`는 Java 기반 설정에서는 디폴트입니다.

#### Default Initialization and Destroy Methods

[원문]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-factory-lifecycle-default-init-destroy-methods )

## 함께 읽기

- 목록으로 - [[spring-documents-core]]{Spring Core Technologies}
- 이전 문서 - [[spring-documents-core-1-5-bean-scopes]]{1.5. Bean Scopes}
- 다음 문서 - 


