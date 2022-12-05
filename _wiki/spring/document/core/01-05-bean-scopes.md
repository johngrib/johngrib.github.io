---
layout  : wiki
title   : Spring Core Technologies - 1.5. Bean Scopes
summary : 
date    : 2021-06-17 23:39:09 +0900
updated : 2021-07-10 20:46:28 +0900
tag     : java spring
resource: E4/FBA18E-AF6F-4D4C-B6AF-97CF17331A04
toc     : true
public  : true
parent  : [[/spring/document/core]]
latex   : false
---
* TOC
{:toc}

- 목록으로 - [[/spring/document/core]]{Spring Core Technologies}
- 이전 문서 - [[/spring/document/core/01-04-dependencies]]{1.4. Dependencies}
- 다음 문서 - [[/spring/document/core/01-06-customizing-the-nature-of-a-bean]]{1.6. Customizing the Nature of a Bean}

## 1.5. Bean Scopes

[원문]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-factory-scopes )

>
When you create a bean definition, you create a recipe for creating actual instances of the class defined by that bean definition. The idea that a bean definition is a recipe is important, because it means that, as with a class, you can create many object instances from a single recipe.
>
You can control not only the various dependencies and configuration values that are to be plugged into an object that is created from a particular bean definition but also control the scope of the objects created from a particular bean definition. This approach is powerful and flexible, because you can choose the scope of the objects you create through configuration instead of having to bake in the scope of an object at the Java class level. Beans can be defined to be deployed in one of a number of scopes. The Spring Framework supports six scopes, four of which are available only if you use a web-aware `ApplicationContext`. You can also create [a custom scope]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-factory-scopes-custom ).
>
The following table describes the supported scopes:

bean 정의를 작성한다는 것은, 해당 실제 클래스의 인스턴스를 생성하기 위한 레시피를 만든다는 것과 같습니다.
- bean 정의가 레시피라는 아이디어는 중요합니다.
- 왜냐하면, 단일 레시피를 통해 많은 객체 인스턴스를 생성할 수 있다는 뜻이기 때문입니다.

bean 정의를 통해 생성된 객체의 스코프도 제어할 수 있습니다.
- 이 방법은 매우 강력하고 유연한데 Java 클래스 코드 수준에서 스코프를 제어하는 것이 아니라, 설정을 통해 스코프를 선택할 수 있기 때문입니다.
- Spring 프레임워크는 6개의 스코프를 지원하며, 그중 4개는 web-aware `ApplicationContext`를 사용하는 경우에만 사용할 수 있는 스코프입니다.
- 6개의 스코프 외에 커스텀 스코프를 만드는 것도 가능합니다.

>
**Table 3. Bean Scopes**
>
| Scope                        | Description                                                                                                                                                                                                                                                |
|------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| [singleton][l-singleton]     | (Default) Scopes a single bean definition to a single object instance for each Spring IoC container.                                                                                                                                                       |
| [prototype][l-prototype]     | Scopes a single bean definition to any number of object instances.                                                                                                                                                                                         |
| [request][l-request]         | Scopes a single bean definition to the lifecycle of a single HTTP request. That is, each HTTP request has its own instance of a bean created off the back of a single bean definition. Only valid in the context of a web-aware Spring `ApplicationContext`. |
| [session][l-session]         | Scopes a single bean definition to the lifecycle of an HTTP `Session`. Only valid in the context of a web-aware Spring `ApplicationContext`.                                                                                                                   |
| [application][l-application] | Scopes a single bean definition to the lifecycle of a `ServletContext`. Only valid in the context of a web-aware Spring `ApplicationContext`.                                                                                                                  |
| [websocket][l-websocket]     | Scopes a single bean definition to the lifecycle of a `WebSocket`. Only valid in the context of a web-aware Spring `ApplicationContext`.                                                                                                                           |

- singleton
    - 기본값.
    - bean 정의를 하나의 객체 인스턴스로 생성하고, 모든 Spring IoC 컨테이너에 공유합니다.
- prototype
    - 하나의 bean 정의를 여러 개의 객체 인스턴스로 생성합니다.
    - (bean을 요청할 때마다 새로운 bean 인스턴스를 생성함)
- request
    - bean의 스코프를 HTTP request의 생명주기에 맞춥니다.
    - 즉, request scope bean은 각각의 HTTP request가 있을 때마다 생성됩니다.
    - 이 스코프는 web-aware Spring `ApplicationContext`에서만 쓸 수 있습니다.
- session
    - bean의 스코프를 HTTP `Session`의 생명주기에 맞춥니다.
    - 이 스코프는 web-aware Spring `ApplicationContext`에서만 쓸 수 있습니다.
- application
    - bean의 스코프를 `ServletContext`의 생명주기에 맞춥니다.
    - 이 스코프는 web-aware Spring `ApplicationContext`에서만 쓸 수 있습니다.
- websocket
    - bean의 스코프를 `WebSocket`의 생명주기에 맞춥니다.
    - 이 스코프는 web-aware Spring `ApplicationContext`에서만 쓸 수 있습니다.

>
(i) As of Spring 3.0, a thread scope is available but is not registered by default. For more information, see the documentation for [SimpleThreadScope]( https://docs.spring.io/spring-framework/docs/5.3.7/javadoc-api/org/springframework/context/support/SimpleThreadScope.html ). For instructions on how to register this or any other custom scope, see [Using a Custom Scope]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-factory-scopes-custom-using ).

- (i) 참고
    - Spring 3.0 부터 thread 스코프를 사용할 수는 있지만 기본으로 등록되어 있지는 않습니다.
    - 자세한 내용은 [SimpleThreadScope]( https://docs.spring.io/spring-framework/docs/5.3.7/javadoc-api/org/springframework/context/support/SimpleThreadScope.html ) 문서를 참고하세요.
    - thread 스코프를 등록하는 방법과 그 밖의 다른 커스텀 스코프를 적용하는 방법에 대해서는 [Using a Custom Scope]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-factory-scopes-custom-using ) 문서를 참고하세요.

### 1.5.1. The Singleton Scope

[원문]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-factory-scopes-singleton )

>
Only one shared instance of a singleton bean is managed, and all requests for beans with an ID or IDs that match that bean definition result in that one specific bean instance being returned by the Spring container.
>
To put it another way, when you define a bean definition and it is scoped as a singleton, the Spring IoC container creates exactly one instance of the object defined by that bean definition. This single instance is stored in a cache of such singleton beans, and all subsequent requests and references for that named bean return the cached object. The following image shows how the singleton scope works:

싱글톤 bean은 딱 하나의 인스턴스를 공유하는 방식입니다. Spring 컨테이너는 싱글톤 bean의 ID에 대한 요청을 받으면 그 하나의 인스턴스를 리턴합니다.

- Spring IoC 컨테이너는 싱글톤 스코프로 정의한 bean에 대해 딱 하나의 인스턴스만 만듭니다.
    - 싱글톤 인스턴스는 싱글톤 bean을 모아두는 캐시에 저장됩니다.
        - 요청이 들어오면 캐싱된 bean을 리턴하는 방식입니다.
- 다음 이미지는 싱글톤 스코프의 작동 방식을 보여줍니다.

![image]( /resource/E4/FBA18E-AF6F-4D4C-B6AF-97CF17331A04/122636538-bb84c300-d124-11eb-89e4-ae1541b57b35.png )

- 이미지
    - 딱 하나의 인스턴스만 만들어지고...
    - ...이 하나의 공유된 인스턴스가 각각의 협업 객체에 주입됩니다.

>
Spring’s concept of a singleton bean differs from the singleton pattern as defined in the Gang of Four (GoF) patterns book. The GoF singleton hard-codes the scope of an object such that one and only one instance of a particular class is created per ClassLoader. The scope of the Spring singleton is best described as being per-container and per-bean. This means that, if you define one bean for a particular class in a single Spring container, the Spring container creates one and only one instance of the class defined by that bean definition. The singleton scope is the default scope in Spring. To define a bean as a singleton in XML, you can define a bean as shown in the following example:

Spring의 싱글톤 bean의 개념은 GoF의 디자인 패턴 책에 나오는 싱글톤 패턴과는 다릅니다.
- GoF의 싱글톤은 ClassLoader당 하나의 특정 클래스 인스턴스만 생성되도록 객체의 스코프를 하드 코딩합니다.
- 그러나 Spring의 싱글톤 스코프는 컨테이너 하나당 bean 하나라고 말할 수 있습니다.
    - 즉, Spring 컨테이너에 대해 싱글톤 Bean 하나를 정의하면, Spring 컨테이너는 해당 클래스를 사용해 딱 하나의 인스턴스를 생성합니다.
- 싱글톤 스코프는 Spring의 디폴트 스코프입니다.
- XML에서 싱글톤 bean을 정의하려면 다음 예제와 같이 하면 됩니다.

```xml
<bean id="accountService" class="com.something.DefaultAccountService"/>

<!-- the following is equivalent, though redundant (singleton scope is the default) -->
<bean id="accountService" class="com.something.DefaultAccountService" scope="singleton"/>
```

### 1.5.2. The Prototype Scope

[원문]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-factory-scopes-prototype )

>
The non-singleton prototype scope of bean deployment results in the creation of a new bean instance every time a request for that specific bean is made. That is, the bean is injected into another bean or you request it through a `getBean()` method call on the container. As a rule, you should use the prototype scope for all stateful beans and the singleton scope for stateless beans.
>
The following diagram illustrates the Spring prototype scope:

프로토타입 스코프는 싱글톤이 아니며, 모든 요청마다 새로운 bean을 생성해 리턴합니다.
- 즉, 해당 bean이 다른 bean에 주입되거나, 컨테이너에서 `getBean()` 메소드를 호출할 때 bean이 생성됩니다.
- stateful bean을 사용할 때에는 프로토타입 스코프를, stateless bean을 사용할 때에는 싱글톤 스코프를 사용하도록 합니다.
- 다음 다이어그램은 Spring 프로토타입 스코프를 설명합니다.

![image]( /resource/E4/FBA18E-AF6F-4D4C-B6AF-97CF17331A04/122637802-8f207500-d12b-11eb-8516-4bd925282041.png )

- 이미지
    - 새로운 bean은... 협업 객체가 프로토타입을 참조할 때마다 생성됩니다.

>
(A data access object (DAO) is not typically configured as a prototype, because a typical DAO does not hold any conversational state. It was easier for us to reuse the core of the singleton diagram.)
>
The following example defines a bean as a prototype in XML:

일반적으로 DAO는 프로토타입으로 구성되지 않습니다.
- 보통 DAO는 상태를 저장하지 않기 때문입니다.
- 다음 예제는 XML에서 프로토타입 bean을 정의하는 것을 보여줍니다.

```xml
<bean id="accountService" class="com.something.DefaultAccountService" scope="prototype"/>
```

>
In contrast to the other scopes, Spring does not manage the complete lifecycle of a prototype bean. The container instantiates, configures, and otherwise assembles a prototype object and hands it to the client, with no further record of that prototype instance. Thus, although initialization lifecycle callback methods are called on all objects regardless of scope, in the case of prototypes, configured destruction lifecycle callbacks are not called. The client code must clean up prototype-scoped objects and release expensive resources that the prototype beans hold. To get the Spring container to release resources held by prototype-scoped beans, try using a custom [bean post-processor]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-factory-extension-bpp ), which holds a reference to beans that need to be cleaned up.
>
In some respects, the Spring container’s role in regard to a prototype-scoped bean is a replacement for the Java new operator. All lifecycle management past that point must be handled by the client. (For details on the lifecycle of a bean in the Spring container, see [Lifecycle Callbacks]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-factory-lifecycle ).)

다른 스코프와는 달리, Spring은 프로토타입 bean의 라이프사이클 전체를 관리하지 않습니다.
- 컨테이너는 프로토타입 객체를 초기화하고, 구성하고, 조립하고 클라이언트에 전달하기만 합니다.
    - 컨테이너는 프로토타입 인스턴스를 저장해두지 않습니다.
- 초기화 생명주기 콜백 메소드는 스코프와는 관계 없이 모든 객체에서 호출되는데, 프로토타입의 경우에는 소멸 생명주기 콜백(destruction lifecycle callback)이 호출되지 않습니다.
- 클라이언트 코드는 프로토타입 스코프 객체를 반드시 청소하고, 프로토타입 bean이 갖고 있는 비싼 리소스를 해제하도록 해야 합니다.
- Sping 컨테이너가 프로토타입 스코프 bean이 갖고 있는 자원을 해제하게 하고 싶다면, 커스텀 [bean post-processor]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-factory-extension-bpp )를 사용해 보세요.

어떤 면에서는, 프로토타입 스코프 bean에 대해서 Spring 컨테이너는 Java의 new 연산자를 대신하고 있을 뿐이기도 합니다.
- 따라서 프로토타입 bean의 생성 이후 생명주기 관리는 클라이언트가 알아서 해야 합니다.
- Spring 컨테이너의 bean 생명주기에 대한 자세한 내용은 [Lifecycle Callbacks]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-factory-lifecycle ) 문서를 참고하세요.

### 1.5.3. Singleton Beans with Prototype-bean Dependencies

[원문]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-factory-scopes-sing-prot-interaction )

>
When you use singleton-scoped beans with dependencies on prototype beans, be aware that dependencies are resolved at instantiation time. Thus, if you dependency-inject a prototype-scoped bean into a singleton-scoped bean, a new prototype bean is instantiated and then dependency-injected into the singleton bean. The prototype instance is the sole instance that is ever supplied to the singleton-scoped bean.
>
However, suppose you want the singleton-scoped bean to acquire a new instance of the prototype-scoped bean repeatedly at runtime. You cannot dependency-inject a prototype-scoped bean into your singleton bean, because that injection occurs only once, when the Spring container instantiates the singleton bean and resolves and injects its dependencies. If you need a new instance of a prototype bean at runtime more than once, see [Method Injection]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-factory-method-injection )

싱글톤 스코프 bean이 프로토타입 스코프 bean에 대해 의존하는 관계가 있을 때, 의존관계가 초기화 시간에 연결된다는 점에 주의하세요.
- 프로토타입 스코프 bean을 싱글톤 스코프 bean에 주입하게 되면, 먼저 프로토타입 bean이 새로 생성되어 인스턴스화된 다음 싱글톤 bean에 주입되게 됩니다.
- 그리고 주입된 프로토타입 인스턴스는 해당 싱글톤 bean에 주입되기만 하고 다른 곳에 또 제공되지 않습니다.

그런데, 싱글톤 스코프 bean이 런타임에 반복적으로 프로토타입 bean의 새 인스턴스를 필요로 하는 상황을 가정해 봅시다.
- Spring 컨테이너가 싱글톤 bean을 인스턴스화하고 의존관계를 연결할 때 주입이 딱 한번만 발생하기 때문에, 프로토타입 스코프 bean을 싱글톤 bean에 또 주입할 수가 없습니다.
- 런타임에 프로토타입 bean의 새 인스턴스가 여러번 필요하다면 [Method Injection]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-factory-method-injection ) 문서를 참고하세요.

### 1.5.4. Request, Session, Application, and WebSocket Scopes

[원문]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-factory-scopes-other )

>
The `request`, `session`, `application`, and `websocket` scopes are available only if you use a web-aware Spring `ApplicationContext` implementation (such as `XmlWebApplicationContext`). If you use these scopes with regular Spring IoC containers, such as the `ClassPathXmlApplicationContext`, an `IllegalStateException` that complains about an unknown bean scope is thrown.

`request`, `session`, `application`, `websocket` 스코프는 web-aware Spring `ApplicationContext` 구현(예: `XmlWebApplicationContext`)을 쓸 때에만 사용할 수 있습니다.

`ClassPathXmlApplicationContext`과 같은 일반적인 Spring IoC 컨테이너에서 이런 스코프를 사용하려 하면 알 수 없는 bean 스코프를 의미하는 `IllegalStateException` 예외가 던져집니다.

#### Initial Web Configuration

[원문]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-factory-scopes-other-web-configuration )

#### Request scope

[원문]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-factory-scopes-request )

>
Consider the following XML configuration for a bean definition:

다음과 같은 XML bean 정의를 살펴봅시다.

```xml
<bean id="loginAction" class="com.something.LoginAction" scope="request"/>
```

>
The Spring container creates a new instance of the `LoginAction` bean by using the `loginAction` bean definition for each and every HTTP request. That is, the `loginAction` bean is scoped at the HTTP request level. You can change the internal state of the instance that is created as much as you want, because other instances created from the same `loginAction` bean definition do not see these changes in state. They are particular to an individual request. When the request completes processing, the bean that is scoped to the request is discarded.
>
When using annotation-driven components or Java configuration, the `@RequestScope` annotation can be used to assign a component to the `request` scope. The following example shows how to do so:

Spring 컨테이너는 모든 HTTP 요청이 들어올 때마다 `LoginAction`의 새로운 인스턴스를 만듭니다.
- 즉, `loginAction` bean은 HTTP request 레벨에서 스코프가 정해진 것입니다.
- 똑같은 `loginAction` bean 정의를 통해 생성된 다른 인스턴스들은 서로의 변경사항을 알지 못하기 때문에, 이렇게 생성된 인스턴스는 내부 상태를 원하는 만큼 변경할 수 있습니다.
    - 각각의 인스턴스들이 리퀘스트마다 다르기 때문입니다.
    - 리퀘스트의 처리가 완료되면 리퀘스트 스코프의 bean도 파괴됩니다.

애노테이션 기반의 컴포넌트나 Java configuration을 사용한다면, `@RequestScope` 애노테이션을 써서 `request` 스코프를 적용할 수 있습니다.

```java
@RequestScope
@Component
public class LoginAction {
    // ...
}
```

#### Session scope

>
Consider the following XML configuration for a bean definition:

다음과 같은 XML bean 정의를 살펴봅시다.

```xml
<bean id="userPreferences" class="com.something.UserPreferences" scope="session"/>
```

>
The Spring container creates a new instance of the `UserPreferences` bean by using the `userPreferences` bean definition for the lifetime of a single HTTP `Session`. In other words, the `userPreferences` bean is effectively scoped at the HTTP `Session` level. As with request-scoped beans, you can change the internal state of the instance that is created as much as you want, knowing that other HTTP `Session` instances that are also using instances created from the same `userPreferences` bean definition do not see these changes in state, because they are particular to an individual HTTP `Session`. When the HTTP `Session` is eventually discarded, the bean that is scoped to that particular HTTP `Session` is also discarded.
>
When using annotation-driven components or Java configuration, you can use the `@SessionScope` annotation to assign a component to the `session` scope.

Spring 컨테이너는 HTTP `Session`의 생명주기에 맞춰 `UserPreferences` bean의 새로운 인스턴스를 만듭니다.
- 즉, `userPreferences` bean은 HTTP `Session` 레벨에 맞춰 최적화된 스코프를 사용합니다.
- request 스코프 bean과 똑같이, 생성된 인스턴스의 상태를 원하는 만큼 변경할 수 있습니다.
- HTTP `Session`다르다면 `userPreferences` 인스턴스끼리는 서로 알지 못하기 때문입니다.
- HTTP `Session`이 종료되면, 해당 스코프 범위의 bean도 함께 파괴됩니다.

애노테이션 기반의 컴포넌트나 Java configuration을 사용한다면, `@SessionScope` 애노테이션을 사용해 `session` 스코프를 작용할 수 있습니다.

```java
@SessionScope
@Component
public class UserPreferences {
    // ...
}
```

#### Application Scope

[원문]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-factory-scopes-application )

>
Consider the following XML configuration for a bean definition:

다음과 같은 XML bean 정의를 살펴봅시다.

```xml
<bean id="appPreferences" class="com.something.AppPreferences" scope="application"/>
```

>
The Spring container creates a new instance of the `AppPreferences` bean by using the `appPreferences` bean definition once for the entire web application. That is, the `appPreferences` bean is scoped at the `ServletContext` level and stored as a regular `ServletContext` attribute. This is somewhat similar to a Spring singleton bean but differs in two important ways: It is a singleton per `ServletContext`, not per Spring 'ApplicationContext' (for which there may be several in any given web application), and it is actually exposed and therefore visible as a `ServletContext` attribute.
>
When using annotation-driven components or Java configuration, you can use the `@ApplicationScope` annotation to assign a component to the `application` scope. The following example shows how to do so:

Spring 컨테이너는 전체 web 애플리케이션에 대해 `appPreferences` bean의 인스턴스를 한 번만 생성합니다.
- 즉, `appPreferences` bean은 `ServletContext` 레벨에 스코프되며, `ServletContext` 속성으로 저장됩니다.
- 이는 Spring의 싱글톤 bean과 비슷하지만, 두 가지 중요한 차이점이 있습니다.
    - `ServletContext`에 대해서만 싱글톤입니다. 그러므로 `ServletContext` 속성으로 표시됩니다.
    - `ApplicationContext`(주어진 웹 애플리케이션에 여러 개가 있을 수 있음)에 대한 싱글톤이 아닙니다.

애노테이션 기반의 컴포넌트나 Java configuration을 사용한다면, `@ApplicationScope` 애노테이션을 사용해 `application` 스코프를 적용할 수 있습니다.

```java
@ApplicationScope
@Component
public class AppPreferences {
    // ...
}
```

#### Scoped Beans as Dependencies

[원문]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-factory-scopes-other-injection )


##### Chosing the Type of Proxy to Create

[원문]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-factory-scopes-other-injection-proxies )

### 1.5.5. Custom Scopes

[원문]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-factory-scopes-custom )

>
The bean scoping mechanism is extensible. You can define your own scopes or even redefine existing scopes, although the latter is considered bad practice and you cannot override the built-in singleton and prototype scopes.

bean 스코프 메커니즘은 확장이 가능합니다.
- 여러분만의 스코프를 정의하거나, 기존의 스코프를 재정의하는 것도 가능합니다.
    - 물론 기존의 스코프를 재정의하는 것은 bad practice 입니다.
    - 싱글톤, 프로토타입 스코프의 재정의는 불가능합니다.

#### Creating a Custom Scope

[원문]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-factory-scopes-custom-creating )

>
To integrate your custom scopes into the Spring container, you need to implement the `org.springframework.beans.factory.config.Scope` interface, which is described in this section. For an idea of how to implement your own scopes, see the `Scope` implementations that are supplied with the Spring Framework itself and the [Scope]( https://docs.spring.io/spring-framework/docs/5.3.7/javadoc-api/org/springframework/beans/factory/config/Scope.html ) javadoc, which explains the methods you need to implement in more detail.
>
The `Scope` interface has four methods to get objects from the scope, remove them from the scope, and let them be destroyed.
>
The session scope implementation, for example, returns the session-scoped bean (if it does not exist, the method returns a new instance of the bean, after having bound it to the session for future reference). The following method returns the object from the underlying scope:

커스텀 스코프를 Spring 컨테이너에 통합하려면 `org.springframework.beans.factory.config.Scope` 인터페이스를 구현해야 합니다.
- 커스텀 스코프를 구현하는 방법에 대한 아이디어는 Spring 프레임워크 자체와 함께 제공되는 `Scope` 구현체와, 구현해야 할 메서드를 설명해 놓은 [Scope]( https://docs.spring.io/spring-framework/docs/5.3.7/javadoc-api/org/springframework/beans/factory/config/Scope.html ) javadoc을 참고하세요.

`Scope` 인터페이스에는 4개의 메소드가 정의되어 있다.
- 이 메소드들은 스코프에서 객체를 가져오고, 객체를 스코프에서 제거하고, 객체를 소멸시키는 역할을 한다.

예를 들어 session 스코프의 구현은 session 스코프 bean을 리턴합니다.
- (만약 해당 bean이 존재하지 않는다면, 메소드는 나중에 참조할 수 있도록 세션에 바인딩한 후, bean의 새로운 인스턴스를 리턴합니다.)

다음 메소드는 기본 스코프에서 객체를 리턴합니다.

```java
Object get(String name, ObjectFactory<?> objectFactory)
```

>
The session scope implementation, for example, removes the session-scoped bean from the underlying session. The object should be returned, but you can return `null` if the object with the specified name is not found. The following method removes the object from the underlying scope:

예를 들어 session 스코프 구현은, 기본 세션에서 session 스코프 bean을 제거합니다.
- 객체를 리턴해야 하는 상황에서 bean의 이름을 찾을 수 없다면 `null`을 리턴합니다.
- 다음 메소드는 기본 스코프에서 객체를 제거합니다.

```java
Object remove(String name)
```

>
The following method registers a callback that the scope should invoke when it is destroyed or when the specified object in the scope is destroyed:

다음 메소드는 스코프 자체가 소멸되거나, 스코프 내의 객체가 소멸될 때 호출되어야 하는 콜백을 등록합니다.

```java
void registerDestructionCallback(String name, Runnable destructionCallback)
```

>
See the javadoc or a Spring scope implementation for more information on destruction callbacks.

소멸 콜백에 대한 더 자세한 정보는 [javadoc]( https://docs.spring.io/spring-framework/docs/5.3.7/javadoc-api/org/springframework/beans/factory/config/Scope.html#registerDestructionCallback ) 이나 Spring의 스코프 구현을 참고하세요.

>
The following method obtains the conversation identifier for the underlying scope:

다음 메소드는 기본 스코프에 대한 대화 식별자를 가져옵니다.

```java
String getConversationId()
```

>
This identifier is different for each scope. For a session scoped implementation, this identifier can be the session identifier.

이 식별자는 스코프마다 다릅니다. session 스코프 구현의 경우, 이 식별자는 session 식별자가 될 수 있습니다.



#### Using a Custom Scope

[원문]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-factory-scopes-custom-using )

>
After you write and test one or more custom `Scope` implementations, you need to make the Spring container aware of your new scopes. The following method is the central method to register a new `Scope` with the Spring container:

하나 이상의 커스텀 `Scope` 구현을 작성하고 테스트한 이후에는, Spring 컨테이너가 새로운 커스텀 스코프를 인식하도록 해줘야 합니다.

```java
void registerScope(String scopeName, Scope scope);
```

>
This method is declared on the `ConfigurableBeanFactory` interface, which is available through the `BeanFactory` property on most of the concrete `ApplicationContext` implementations that ship with Spring.

이 메소드는 `ConfigurableBeanFactory` 인터페이스에 선언되어 있으며, Spring과 함께 제공되는 대부분의 구체적인 `ApplicationContext` 구현에서 `BeanFactory` 속성을 통해 사용할 수 있습니다.

>
The first argument to the `registerScope(..)` method is the unique name associated with a scope. Examples of such names in the Spring container itself are `singleton` and `prototype`. The second argument to the `registerScope(..)` method is an actual instance of the custom `Scope` implementation that you wish to register and use.

- `registerScope(..)` 메서드의 첫 번째 인수는 스코프와 관련된 유니크한 이름입니다.
    - Spring 컨테이너 자체에서 이러한 이름의 예는 `singleton`과 `prototype`입니다.
- `registerScope(..)` 메서드의 두 번째 인수는 등록해서 사용하려는 커스텀 Scope 구현의 실제 인스턴스입니다.

>
Suppose that you write your custom `Scope` implementation, and then register it as shown in the next example.

커스텀 스코프 구현을 작성한 다음, 다음의 예제와 같이 등록한다고 합시다.

```java
Scope threadScope = new SimpleThreadScope();
beanFactory.registerScope("thread", threadScope);
```

>
You can then create bean definitions that adhere to the scoping rules of your custom `Scope`, as follows:

그러고 나서, 다음과 같이 커스텀 `Scope`의 범위 지정 규칙을 준수하는 bean 정의를 작성할 수 있습니다.

```xml
<bean id="..." class="..." scope="thread">
```

>
With a custom `Scope` implementation, you are not limited to programmatic registration of the scope. You can also do the `Scope` registration declaratively, by using the `CustomScopeConfigurer` class, as the following example shows:

커스텀 스코프 구현은 프로그래밍 방식으로 얼마든지 등록할 수 있습니다.
그런 한편으로는 다음 예제와 같이 `CustomScopeConfigurer` 클래스를 사용해 선언적으로 `Scope`를 등록하는 방법도 있습니다.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xmlns:aop="http://www.springframework.org/schema/aop"
    xsi:schemaLocation="http://www.springframework.org/schema/beans
        https://www.springframework.org/schema/beans/spring-beans.xsd
        http://www.springframework.org/schema/aop
        https://www.springframework.org/schema/aop/spring-aop.xsd">

    <bean class="org.springframework.beans.factory.config.CustomScopeConfigurer">
        <property name="scopes">
            <map>
                <entry key="thread">
                    <bean class="org.springframework.context.support.SimpleThreadScope"/>
                </entry>
            </map>
        </property>
    </bean>

    <bean id="thing2" class="x.y.Thing2" scope="thread">
        <property name="name" value="Rick"/>
        <aop:scoped-proxy/>
    </bean>

    <bean id="thing1" class="x.y.Thing1">
        <property name="thing2" ref="thing2"/>
    </bean>

</beans>
```



## 함께 읽기

- 목록으로 - [[/spring/document/core]]{Spring Core Technologies}
- 이전 문서 - [[/spring/document/core/01-04-dependencies]]{1.4. Dependencies}
- 다음 문서 - [[/spring/document/core/01-06-customizing-the-nature-of-a-bean]]{1.6. Customizing the Nature of a Bean}

[l-singleton]: https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-factory-scopes-singleton
[l-prototype]: https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-factory-scopes-prototype
[l-request]: https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-factory-scopes-request
[l-session]: https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-factory-scopes-session
[l-application]: https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-factory-scopes-application
[l-websocket]: https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/web.html#websocket-stomp-websocket-scope

