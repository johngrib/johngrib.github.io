---
layout  : wiki
title   : Spring Core Technologies - 1.5. Bean Scopes
summary : 
date    : 2021-06-17 23:39:09 +0900
updated : 2021-06-19 18:56:56 +0900
tag     : java spring
toc     : true
public  : true
parent  : [[spring-documents]]
latex   : false
---
* TOC
{:toc}

- 목록으로 - [[spring-documents-core]]{Spring Core Technologies}
- 이전 문서 - [[spring-documents-core-1-4-dependencies]]{1.4. Dependencies}
- 다음 문서 - 

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

![image]( /post-img/spring-documents-core-1-5-bean-scopes/122636538-bb84c300-d124-11eb-89e4-ae1541b57b35.png )

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

![image]( /post-img/spring-documents-core-1-5-bean-scopes/122637802-8f207500-d12b-11eb-8516-4bd925282041.png )

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

## 함께 읽기

- 목록으로 - [[spring-documents-core]]{Spring Core Technologies}
- 이전 문서 - [[spring-documents-core-1-4-dependencies]]{1.4. Dependencies}
- 다음 문서 - 

[l-singleton]: https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-factory-scopes-singleton
[l-prototype]: https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-factory-scopes-prototype
[l-request]: https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-factory-scopes-request
[l-session]: https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-factory-scopes-session
[l-application]: https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-factory-scopes-application
[l-websocket]: https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/web.html#websocket-stomp-websocket-scope
