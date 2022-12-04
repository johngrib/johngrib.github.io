---
layout  : wiki
title   : Spring Core Technologies - 1.6. Customizing the Nature of a Bean
summary : 
date    : 2021-06-19 23:13:51 +0900
updated : 2021-07-10 20:50:24 +0900
tag     : java spring
resource: 90/8EEFA9-E46D-442F-8DC2-3E753F08EEF8
toc     : true
public  : true
parent  : [[/spring/document/core]]
latex   : false
---
* TOC
{:toc}

- 목록으로 - [[/spring/document/core]]{Spring Core Technologies}
- 이전 문서 - [[/spring/document/core/01-05-bean-scopes]]{1.5. Bean Scopes}
- 다음 문서 - [[/spring/document/core/01-07-bean-definition-inheritance]]{1.7. Bean Definition Inheritance}

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

>
When you write initialization and destroy method callbacks that do not use the Spring-specific `InitializingBean` and `DisposableBean` callback interfaces, you typically write methods with names such as `init()`, `initialize()`, `dispose()`, and so on. Ideally, the names of such lifecycle callback methods are standardized across a project so that all developers use the same method names and ensure consistency.
>
You can configure the Spring container to “look” for named initialization and destroy callback method names on every bean. This means that you, as an application developer, can write your application classes and use an initialization callback called `init()`, without having to configure an `init-method="init"` attribute with each bean definition. The Spring IoC container calls that method when the bean is created (and in accordance with the standard lifecycle callback contract [described previously]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-factory-lifecycle )). This feature also enforces a consistent naming convention for initialization and destroy method callbacks.
>
Suppose that your initialization callback methods are named `init()` and your destroy callback methods are named `destroy()`. Your class then resembles the class in the following example:

Spring 스펙의 `InitializingBean`과 `DisposableBean` 콜백 인터페이스를 사용하지 않는 종류의 초기화 메소드 콜백과 소멸 메소드 콜백을 만들 때에는, 일반적으로 메소드 이름을 `init()`, `initialize()`, `dispose()` 등으로 짓습니다.
- 아무 bean이나 초기화/소멸 콜백 메소드를 이름으로 지정하고 Spring 컨테이너가 이를 찾아 실행하도록 설정할 수도 있습니다.
    - 즉, 애플리케이션 개발자는 각 bean을 정의할 때 `init-method="init"`을 설정하지 않아도, 애플리케이션 클래스를 작성하고 `init()` 초기화 콜백을 사용할 수 있습니다.
    - Spring IoC 컨테이너는 bean을 생성할 때 해당 메소드를 호출합니다(앞에서 설명한 것과 같이 표준 생명주기 콜백 계약에 따른 동작입니다).
    - 이 기능은 또한 초기화 및 소멸 메소드 콜백에 대해 일관성 있는 명명 규칙을 적용합니다.

다음 예제는 초기화 콜백 메소드의 이름이 `init()`이고, 소멸 콜백의 이름이 `destroy()`인 클래스를 보여줍니다.

```java
public class DefaultBlogService implements BlogService {

    private BlogDao blogDao;

    public void setBlogDao(BlogDao blogDao) {
        this.blogDao = blogDao;
    }

    // this is (unsurprisingly) the initialization callback method
    public void init() {
        if (this.blogDao == null) {
            throw new IllegalStateException("The [blogDao] property must be set.");
        }
    }
}
```

>
You could then use that class in a bean resembling the following:

그리고 다음과 같은 bean에서 해당 클래스를 사용할 수 있습니다.

```xml
<beans default-init-method="init">

    <bean id="blogService" class="com.something.DefaultBlogService">
        <property name="blogDao" ref="blogDao" />
    </bean>

</beans>
```

>
The presence of the `default-init-method` attribute on the top-level `<beans/>` element attribute causes the Spring IoC container to recognize a method called `init` on the bean class as the initialization method callback. When a bean is created and assembled, if the bean class has such a method, it is invoked at the appropriate time.
>
You can configure destroy method callbacks similarly (in XML, that is) by using the `default-destroy-method` attribute on the top-level `<beans/>` element.

최상위 `<beans/>` 엘리먼트에 `default-init-method` 속성이 있으면, bean 클래스에 있는 `init` 메소드를 Spring IoC 컨테이너가 초기화 메소드 콜백으로 인식하게 됩니다.
- bean이 생성되고 조립될 때, bean 클래스에 이런 메소드가 있다면 자동으로 호출되게 됩니다.

이와 비슷하게, 최상위 `<beans/>` 엘리먼트의 `default-destroy-method` 속성을 사용하면 소멸 메소드 콜백도 지정할 수 있습니다.

>
Where existing bean classes already have callback methods that are named at variance with the convention, you can override the default by specifying (in XML, that is) the method name by using the `init-method` and `destroy-method` attributes of the `<bean/>` itself.

이미 존재하고 있는 bean 클래스에 이미 컨벤션에 맞는 이름을 가진 콜백 메소드가 있다면, `<bean/>`의 `init-method`와 `destroy-method` 속성에 메소드 이름을 지정해서 기본값을 대체할 수 있습니다.

>
The Spring container guarantees that a configured initialization callback is called immediately after a bean is supplied with all dependencies. Thus, the initialization callback is called on the raw bean reference, which means that AOP interceptors and so forth are not yet applied to the bean. A target bean is fully created first and then an AOP proxy (for example) with its interceptor chain is applied. If the target bean and the proxy are defined separately, your code can even interact with the raw target bean, bypassing the proxy. Hence, it would be inconsistent to apply the interceptors to the `init` method, because doing so would couple the lifecycle of the target bean to its proxy or interceptors and leave strange semantics when your code interacts directly with the raw target bean.

Spring 컨테이너는 bean에 모든 의존관계를 제공한 이후, 사전에 설정한 초기화 콜백이 바로 실행되도록 보장합니다.
- 그러므로 초기화 콜백은 원시(raw) bean 참조에서 호출되는데, 이는 AOP 인터셉터 등이 아직 bean에 적용되지 않았을 때입니다.
    - 대상이 되는 bean이 먼저 완전히 생성된 다음 인터셉터 체인이 있는 AOP 프록시(예)가 적용됩니다.
- 만약 대상 bean과 프록시가 별도로 정의되어 있는 경우라면, 코드는 프록시를 우회하여 원시(raw) 대상 bean과 상호작용할 수도 있습니다.
- 따라서, `init` 메소드에 인터셉터를 적용하는 것은 일관성이 없습니다.
    - 왜냐하면 대상 bean의 생명주기가 프록시나 인터셉터와 커플링이 생기게 되고, 코드가 원시(raw) 대상 bean과 직접적으로 상호작용할 때 의미가 미묘하게 되기 때문입니다.

#### Combining Lifecycle Mechanisms

[원문]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-factory-lifecycle-combined-effects )

>
As of Spring 2.5, you have three options for controlling bean lifecycle behavior:
>
- The [InitializingBean]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-factory-lifecycle-initializingbean ) and [DisposableBean]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-factory-lifecycle-disposablebean ) callback interfaces
- Custom `init()` and `destroy()` methods
- The [@PostConstruct and @PreDestroy annotations]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-postconstruct-and-predestroy-annotations ). You can combine these mechanisms to control a given bean.

Spring 2.5 버전부터는 bean 생명주기 동작을 제어하기 위한 세 가지 옵션이 있습니다.

- `InitializingBean` 과 `DisposableBean` 콜백 인터페이스
- 커스텀 메소드 `init()`, `destroy()`
- `@PostConstruct`, `@PreDestroy` 애노테이션.

이러한 메커니즘을 조합해서 bean을 제어할 수 있습니다.

>
(i)
If multiple lifecycle mechanisms are configured for a bean and each mechanism is configured with a different method name, then each configured method is run in the order listed after this note. However, if the same method name is configured — for example, `init()` for an initialization method — for more than one of these lifecycle mechanisms, that method is run once, as explained in the [preceding section]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-factory-lifecycle-default-init-destroy-methods ).

- (i) 참고
    - 만약 하나의 bean에 여러 개의 생명주기 메커니즘이 설정되었고, 각기 다른 메소드 이름으로 구성되었다면, 각 메소드는 이 노트 다음에 나열된 순서대로 실행됩니다.
    - 그러나 동일한 메소드 이름(예: 초기화 메소드의 경우 `init()`)이 생명주기 메커니즘 중 하나 이상에 중복으로 구성된 경우라면, 해당 메소드는 앞의 섹션에서 설명한대로 한 번만 실행됩니다.

>
Multiple lifecycle mechanisms configured for the same bean, with different initialization methods, are called as follows:
>
1. Methods annotated with `@PostConstruct`
2. `afterPropertiesSet()` as defined by the `InitializingBean` callback interface
3. A custom configured `init()` method
>
Destroy methods are called in the same order:
>
1. Methods annotated with `@PreDestroy`
2. `destroy()` as defined by the `DisposableBean` callback interface
3. A custom configured `destroy()` method

각각 다른 초기화 메소드를 사용하는 여러 생명주기 메커니즘이 하나의 bean에 적용되면, 다음 순서대로 호출됩니다.

1. `@PostConstruct` 애노테이션을 붙인 메소드.
2. `InitializingBean` 콜백 인터페이스에서 정의된 `afterPropertiesSet()` 메소드.
3. 커스텀 `init()` 메소드

소멸 메소드는 다음 순서대로 호출됩니다.

1. `@PreDestroy` 애노테이션을 붙인 메소드.
2. `DisposableBean` 콜백 인터페이스에서 정의된 `destroy()` 메소드.
3. 커스텀 `destroy()` 메소드.

#### Startup and Shutdown Callbacks

[원문]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-factory-lifecycle-processor )

>
The `Lifecycle` interface defines the essential methods for any object that has its own lifecycle requirements (such as starting and stopping some background process):

`Lifecycle` 인터페이스는 자체 생명주기 요구사항(백그라운드 프로세스를 시작하거나 중지한다거나)이 있는 모든 객체에 대한 필수 메소드를 정의합니다.

```java
public interface Lifecycle {

    void start();

    void stop();

    boolean isRunning();
}
```

>
Any Spring-managed object may implement the `Lifecycle` interface. Then, when the `ApplicationContext` itself receives start and stop signals (for example, for a stop/restart scenario at runtime), it cascades those calls to all `Lifecycle` implementations defined within that context. It does this by delegating to a `LifecycleProcessor`, shown in the following listing:

Spring이 관리하는 모든 객체는 `Lifecycle` 인터페이스를 구현할 수 있습니다.
- `ApplicationContext`가 시작이나 중지 신호를 받게 되면(예: 런타임의 stop/restart 시나리오), 해당 컨텍스트에 정의된 모든 `Lifecycle` 인터페이스 구현체에 해당 호출을 cascade하게 전달합니다.
- 그러한 작업은 다음과 같이 `LifecycleProcessor`에 위임시켜 수행합니다.

```java
public interface LifecycleProcessor extends Lifecycle {

    void onRefresh();

    void onClose();
}
```

>
Notice that the `LifecycleProcessor` is itself an extension of the `Lifecycle` interface. It also adds two other methods for reacting to the context being refreshed and closed.

`LifecycleProcessor`는
- `Lifecycle` 인터페이스를 상속받아 확장한 것입니다.
- 그리고 refresh 나 close 상태가 된 컨텍스트에 반응하는 두 가지 방법을 추가합니다.

> (i)
Note that the regular `org.springframework.context.Lifecycle` interface is a plain contract for explicit start and stop notifications and does not imply auto-startup at context refresh time. For fine-grained control over auto-startup of a specific bean (including startup phases), consider implementing `org.springframework.context.SmartLifecycle` instead.
>
Also, please note that stop notifications are not guaranteed to come before destruction. On regular shutdown, all `Lifecycle` beans first receive a stop notification before the general destruction callbacks are being propagated. However, on hot refresh during a context’s lifetime or on stopped refresh attempts, only destroy methods are called.

- (i) 참고
    - `org.springframework.context.Lifecycle` 인터페이스는 start/stop 알림을 위해 만들어진 단순한 계약을 표현할 뿐이며, 컨텍스트 refresh time에 auto-startup하는 것을 의미하지는 않습니다(startup phase 포함).
    - 특정한 bean의 자동 시작에 대한 세밀한 제어가 필요하다면 `Lifecycle` 대신 `org.springframework.context.SmartLifecycle` 인터페이스 구현을 고려해 보세요.
    - 또한, 소멸 전에 stop 알림이 오도록 보장되지 않습니다.
    - 일반적인 셧다운에서는, 모든 `Lifecycle` bean들은 일반 소멸 콜백이 전달되기 전에 먼저 stop 알림을 수신합니다.
        - 그러나 컨텍스트의 수명 동안, hot refresh나 stopped refresh가 시도된다면 destroy 메소드만 호출됩니다.

>
The order of startup and shutdown invocations can be important. If a “depends-on” relationship exists between any two objects, the dependent side starts after its dependency, and it stops before its dependency. However, at times, the direct dependencies are unknown. You may only know that objects of a certain type should start prior to objects of another type. In those cases, the `SmartLifecycle` interface defines another option, namely the `getPhase()` method as defined on its super-interface, `Phased`. The following listing shows the definition of the `Phased` interface:

startup 과 shutdown의 호출 순서가 중요한 경우가 있을 수 있습니다.
- 두 객체 사이에 "depends-on" 관계가 존재한다면 의존하는 쪽에서는 해당 의존관계가 연결된 이후에 시작되고, 의존관계가 연결되기 이전에 중지됩니다.
- 그러나 어떨 때에는 직접적인 의존관계를 알 수 없고, 특정 타입의 객체가 다른 타입의 객체보다 먼저 시작해야 한다는 사실만 알 수 있는 경우가 있습니다.
    - 이런 경우 `SmartLifecycle` 인터페이스는 슈퍼 인터페이스 `Phased`에 정의된 `getPhase()` 메소드와 같은 옵션들을 정의합니다.
    - 다음 목록은 `Phased` 인터페이스를 보여줍니다.

```java
public interface Phased {

    int getPhase();
}
```

>
The following listing shows the definition of the `SmartLifecycle` interface:

다음은 `SmartLifecycle` 인터페이스를 보여줍니다.

```java
public interface SmartLifecycle extends Lifecycle, Phased {

    boolean isAutoStartup();

    void stop(Runnable callback);
}
```

>
When starting, the objects with the lowest phase start first. When stopping, the reverse order is followed. Therefore, an object that implements `SmartLifecycle` and whose `getPhase()` method returns `Integer.MIN_VALUE` would be among the first to start and the last to stop. At the other end of the spectrum, a phase value of `Integer.MAX_VALUE` would indicate that the object should be started last and stopped first (likely because it depends on other processes to be running). When considering the phase value, it is also important to know that the default phase for any “normal” `Lifecycle` object that does not implement `SmartLifecycle` is `0`. Therefore, any negative phase value indicates that an object should start before those standard components (and stop after them). The reverse is true for any positive phase value.

시작할 때, 가장 낮은 phase의 객체가 먼저 시작됩니다. 그리고 정지할 때에는 시작과 역순으로 작동합니다.
- 그러므로 `SmartLifecycle` 인터페이스를 구현하고, `getPhase()` 메소드가 `Integer.MIN_VALUE`를 리턴하는 객체가 있다면...
    - 이 객체는 처음 시작하는 객체입니다.
    - 그리고 마지막으로 중지할 객체입니다.
- 반대 방향도 생각해 봅시다.
    - `Integer.MAX_VALUE` 값은 객체가 마지막에 시작되고 먼저 중지되어야 함을 나타냅니다(실행 중인 다른 프로세스에 따라 달라질 수 있음).
- phase 값을 생각할 때에는 `SmartLifecycle` 인터페이스를 구현하지 않는 "일반적인" `Lifecycle` 객체의 기본값이 `0`이라는 것도 염두에 두도록 합니다.
- 따라서,
    - 음수 값은 객체가 해당 표준 컴포넌트보다 먼저 시작되고 중지된다는 것을 나타냅니다.
    - 양수 값은 이와 반대로 적용됩니다.

>
The stop method defined by `SmartLifecycle` accepts a callback. Any implementation must invoke that callback’s `run()` method after that implementation’s shutdown process is complete. That enables asynchronous shutdown where necessary, since the default implementation of the `LifecycleProcessor` interface, `DefaultLifecycleProcessor`, waits up to its timeout value for the group of objects within each phase to invoke that callback. The default per-phase timeout is 30 seconds. You can override the default lifecycle processor instance by defining a bean named `lifecycleProcessor` within the context. If you want only to modify the timeout, defining the following would suffice:

`SmartLifecycle`에 정의된 `stop` 메소드는 콜백을 받습니다.
- `SmartLifecycle`의 모든 구현체는 해당 구현체의 종료 프로세스가 완료된 후에 해당 콜백의 `run()` 메소드를 호출해야 합니다.
    - 이렇게 하면 필요한 경우 비동기 셧다운이 가능해집니다.
        - `LifecycleProcessor` 인터페이스의 기본 구현체인 `DefaultLifecycleProcessor`가 해당 콜백을 호출하기 위해 각 단계 내의 객체 그룹이 타임아웃 값까지 대기하기 때문입니다.
        - phase 별 타임아웃의 기본값은 30초입니다.
    - 컨텍스트 내에서 이름이 `lifecycleProcessor`인 bean을 정의하여 기본 라이프 사이클 프로세서 인스턴스를 대체할 수 있습니다.
        - 타임아웃 값만 수정하려 한다면 다음과 같이 하면 됩니다.

```xml
<bean id="lifecycleProcessor" class="org.springframework.context.support.DefaultLifecycleProcessor">
    <!-- timeout value in milliseconds -->
    <property name="timeoutPerShutdownPhase" value="10000"/>
</bean>
```

>
As mentioned earlier, the `LifecycleProcessor` interface defines callback methods for the refreshing and closing of the context as well. The latter drives the shutdown process as if `stop()` had been called explicitly, but it happens when the context is closing. The 'refresh' callback, on the other hand, enables another feature of `SmartLifecycle` beans. When the context is refreshed (after all objects have been instantiated and initialized), that callback is invoked. At that point, the default lifecycle processor checks the boolean value returned by each `SmartLifecycle` object’s `isAutoStartup()` method. If `true`, that object is started at that point rather than waiting for an explicit invocation of the context’s or its own `start()` method (unlike the context refresh, the context start does not happen automatically for a standard context implementation). The `phase` value and any “depends-on” relationships determine the startup order as described earlier.

위에서 언급한 바와 같이 `LifecycleProcessor` 인터페이스는 컨텍스트 refresh와 closing을 위한 콜백 메소드도 정의하고 있습니다.
- closing 콜백은 `stop()`이 명시적으로 호출된 것처럼 종료 프로세스를 구동하지만, 이는 컨텍스트가 closing 될때 발생합니다.
- refresh 콜백은 `SmartLifecycle` bean의 또 다른 기능을 활성화합니다.
    - 컨텍스트가 refresh 되면(모든 객체가 인스턴스화되고 초기화가 된 이후) 해당 골백이 호출됩니다.
        - 이 시점에서 기본 생명주기 프로세서는 각 `SmartLifecycle` 객체의 `isAutoStartup()` 메소드가 리턴하는 boolean 값을 확인합니다.
        - 값이 `true`이면, 해당 객체는 컨텍스트 또는 자체 `start()` 메소드의 명시적 호출을 기다리지 않고 시작됩니다(컨텍스트 refresh와 달리 표준 컨텍스트 구현에 대해 컨텍스트 시작이 자동으로 발생하지 않음).
- `phase` 값과 "depends-on" 관계가 있는 경우엔 위에서 설명한 바와 같이 시작 순서를 결정합니다.

#### Shutting Down the Spring IoC Container Gracefully in Non-Web Applications

[원문]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-factory-shutdown )

> (i)
This section applies only to non-web applications. Spring’s web-based `ApplicationContext` implementations already have code in place to gracefully shut down the Spring IoC container when the relevant web application is shut down.

- (i) 참고
    - 이 섹션은 웹이 아닌 애플리케이션에서만 적용됩니다.
    - Spring의 웹 기반 `ApplicationContext` 구현에는 관련 웹 애플리케이션이 종료될 때 Spring IoC 컨테이너를 정상적으로 종료하는 코드가 이미 있습니다.

>
If you use Spring’s IoC container in a non-web application environment (for example, in a rich client desktop environment), register a shutdown hook with the JVM. Doing so ensures a graceful shutdown and calls the relevant destroy methods on your singleton beans so that all resources are released. You must still configure and implement these destroy callbacks correctly.
>
To register a shutdown hook, call the `registerShutdownHook()` method that is declared on the `ConfigurableApplicationContext` interface, as the following example shows:

웹 아닌 애플리케이션 환경(예: 데스크톱 환경에서 돌아가는 리치 클라이언트)에서 Spring의 IoC 컨테이너를 사용하는 경우, JVM에 종료 hook을 등록합니다.
- 이렇게 하면 정상적인 종료를 보장하고 모든 리소스가 해제되도록 하기 위해 싱글톤 bean에서 소멸 메소드를 호출합니다.
- 이런 소멸 콜백을 바람직하게 구성하고 구현해야 합니다.

셧다운 hook을 등록하려면 `ConfigurableApplicationContext` 인터페이스의 `registerShutdownHook()` 메소드를 호출합니다.

```java
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

public final class Boot {

    public static void main(final String[] args) throws Exception {
        ConfigurableApplicationContext ctx = new ClassPathXmlApplicationContext("beans.xml");

        // add a shutdown hook for the above context...
        ctx.registerShutdownHook();

        // app runs here...

        // main method exits, hook is called prior to the app shutting down...
    }
}
```

### 1.6.2. ApplicationContextAware and BeanNameAware

[원문]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-factory-aware )

>
When an `ApplicationContext` creates an object instance that implements the `org.springframework.context.ApplicationContextAware` interface, the instance is provided with a reference to that `ApplicationContext`. The following listing shows the definition of the `ApplicationContextAware` interface:

`ApplicationContext`가 `org.springframework.context.ApplicationContextAware`를 구현하는 객체의 인스턴스를 생성할 때, 해당 인스턴스는 `ApplicationContext`에 대한 참조와 함께 제공됩니다.

다음은 `ApplicationContextAware` 인터페이스를 보여줍니다.

```java
public interface ApplicationContextAware {

    void setApplicationContext(ApplicationContext applicationContext) throws BeansException;
}
```

>
Thus, beans can programmatically manipulate the `ApplicationContext` that created them, through the `ApplicationContext` interface or by casting the reference to a known subclass of this interface (such as `ConfigurableApplicationContext`, which exposes additional functionality). One use would be the programmatic retrieval of other beans. Sometimes this capability is useful. However, in general, you should avoid it, because it couples the code to Spring and does not follow the Inversion of Control style, where collaborators are provided to beans as properties. Other methods of the `ApplicationContext` provide access to file resources, publishing application events, and accessing a `MessageSource`. These additional features are described in [Additional Capabilities of the ApplicationContext]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#context-introduction ).

따라서, bean은 자신을 생성한 `ApplicationContext` 인터페이스를 프로그래밍 방법으로 조작할 수 있습니다.
- (`ApplicationContext` 인터페이스나 `ApplicationContext`의 하위 클래스(예: `ConfigurableApplicationContext`)를 캐스팅하는 방법으로 얻을 수 있음)
- 이 기능은 프로그래밍 방법으로 다른 bean들을 가져올 일이 있을 때 쓸 수 있는데, 유용하게 사용할 수 있습니다.

그러나 일반적으로 이 방법을 쓰는 것은 좋지 않습니다.
- 코드와 Spring 사이에 커플링이 생기며, IoC 스타일(협력 객체를 bean의 프로퍼티로 제공하는 방식)을 따르지 않게 되기 때문입니다.

`ApplicationContext`의 다른 메소드들은 다음과 같은 기능들을 제공합니다.
- 파일 리소스에 대한 엑세스
- 애플리케이션 이벤트 발행
- `MessageSource`에 대한 엑세스

이러한 추가적인 기능들에 대해서는 [Additional Capabilities of the ApplicationContext]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#context-introduction ) 문서를 참고하세요.

>
Autowiring is another alternative to obtain a reference to the `ApplicationContext`. The _traditional_ `constructor` and `byType` autowiring modes (as described in [Autowiring Collaborators]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-factory-autowire )) can provide a dependency of type `ApplicationContext` for a constructor argument or a setter method parameter, respectively.
For more flexibility, including the ability to autowire fields and multiple parameter methods, use the annotation-based autowiring features. If you do, the `ApplicationContext` is autowired into a field, constructor argument, or method parameter that expects the ApplicationContext type if the field, constructor, or method in question carries the `@Autowired` annotation. For more information, see [Using @Autowired]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-autowired-annotation ).

Autowiring은 `ApplicationContext`의 참조를 얻는 또 다른 방법입니다.
- 전통적인 `constructor`와 `byTytpe`을 사용한 autowiring 모드들은([Autowiring Collaborators]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-factory-autowire ) 문서에 설명된 바와 같이) 각각 생성자 인자나 setter 메소드 파라미터를 써서 `ApplicationContext` 타입의 의존관계를 제공할 수 있습니다.

더 유연한 방식을 사용하고 싶다면, 애노테이션 기반의 자동 연결 기능을 사용하세요.
해당 필드, 생성자, 메소드가 `@Autowired` 애노테이션을 달고 있게 된다면, `ApplicationContext`가 `ApplicationContext` 타입을 예상하는 필드, 생성자 인자, 메소드 파라미터 등으로 자동 연결됩니다.

자세한 내용은 [Using @Autowired]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-autowired-annotation ) 문서를 참고하세요.

>
When an `ApplicationContext` creates a class that implements the `org.springframework.beans.factory.BeanNameAware` interface, the class is provided with a reference to the name defined in its associated object definition. The following listing shows the definition of the BeanNameAware interface:

`ApplicationContext`가 `org.springframework.beans.factory.BeanNameAware` 인터페이스를 구현하는 클래스를 생성할 때, 클래스는 연관된 객체 정의에 명시된 이름에 대한 참조와 함께 제공됩니다.

다음은 `BeanNameAware` 인터페이스를 보여줍니다.

```java
public interface BeanNameAware {

    void setBeanName(String name) throws BeansException;
}
```

>
The callback is invoked after population of normal bean properties but before an initialization callback such as `InitializingBean`, `afterPropertiesSet`, or a custom init-method.

이 콜백은 일반적인 bean 속성을 입력한 이후 호출되지만, `InitializingBean`, `afterPropertiesSet` 또는 커스텀 init-method 와 같은 초기화 콜백보다는 먼저 호출됩니다.

### 1.6.3. Other Aware Interfaces

[원문]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#aware-list )

>
Besides `ApplicationContextAware` and `BeanNameAware` (discussed [earlier]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-factory-aware )), Spring offers a wide range of `Aware` callback interfaces that let beans indicate to the container that they require a certain infrastructure dependency. As a general rule, the name indicates the dependency type. The following table summarizes the most important `Aware` interfaces:

`ApplicationContextAware`와 `BeanNameAware` 외에도 Spring은 bean이 특정 인프라와의 의존관계가 필요하다는 것을 컨테이너에 알려줄 수 있는 용도의 광범위한 `Aware` 콜백 인터페이스를 제공합니다.

일반적으로 name 은 의존관계 타입을 의미합니다. 다음 표에는 가장 중요한 `Aware` 인터페이스들을 보여줍니다.

>
**Table 4. Aware Interfaces**
>
| Name                             | Injected Dependency                                                                                     | Explained in...                                                |
|----------------------------------|---------------------------------------------------------------------------------------------------------|----------------------------------------------------------------|
| `ApplicationContextAware`        | Declaring `ApplicationContext`.                                                                         | [ApplicationContextAware and BeanNameAware][aw-1]              |
| `ApplicationEventPublisherAware` | Event publisher of the enclosing `ApplicationContext`.                                                  | [Additional Capabilities of the ApplicationContext][aw-2]      |
| `BeanClassLoaderAware`           | Class loader used to load the bean classes.                                                             | [Instantiating Beans][aw-3]                                    |
| `BeanFactoryAware`               | Declaring `BeanFactory`.                                                                                | [ApplicationContextAware and BeanNameAware][aw-4]              |
| `BeanNameAware`                  | Name of the declaring bean.                                                                             | [ApplicationContextAware and BeanNameAware][aw-5]              |
| `LoadTimeWeaverAware`            | Defined weaver for processing class definition at load time.                                            | [Load-time Weaving with AspectJ in the Spring Framework][aw-6] |
| `MessageSourceAware`             | Configured strategy for resolving messages (with support for parametrization and internationalization). | [Additional Capabilities of the ApplicationContext][aw-7]      |
| `NotificationPublisherAware`     | Spring JMX notification publisher.                                                                      | [Notifications][aw-8]                                          |
| `ResourceLoaderAware`            | Configured loader for low-level access to resources.                                                    | [Resources][aw-9]                                              |
| `ServletConfigAware`             | Current `ServletConfig` the container runs in. Valid only in a web-aware Spring `ApplicationContext`.   | [Spring MVC][aw-10]                                            |
| `ServletContextAware`            | Current `ServletContext` the container runs in. Valid only in a web-aware Spring `ApplicationContext`.  | [Spring MVC][aw-11]                                            |

[aw-1]: https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-factory-aware
[aw-2]: https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#context-introduction
[aw-3]: https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-factory-class
[aw-4]: https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-factory-aware
[aw-5]: https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-factory-aware
[aw-6]: https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#aop-aj-ltw
[aw-7]: https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#context-introduction
[aw-8]: https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/integration.html#jmx-notifications
[aw-9]: https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#resources
[aw-10]: https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/web.html#mvc
[aw-11]: https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/web.html#mvc

>
Note again that using these interfaces ties your code to the Spring API and does not follow the Inversion of Control style. As a result, we recommend them for infrastructure beans that require programmatic access to the container.

이러한 인터페이스들을 사용하면 코드가 Spring API에 단단히 묶이게 되고, IoC 스타일을 따르지 않게 됩니다.

결론적으로 컨테이너에 프로그래밍 방식으로 엑세스해야 하는 인프라 bean 방법을 권장합니다.

## 함께 읽기

- 목록으로 - [[/spring/document/core]]{Spring Core Technologies}
- 이전 문서 - [[/spring/document/core/01-05-bean-scopes]]{1.5. Bean Scopes}
- 다음 문서 - [[/spring/document/core/01-07-bean-definition-inheritance]]{1.7. Bean Definition Inheritance}

