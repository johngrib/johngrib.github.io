---
layout  : wiki
title   : Spring Core Technologies - 1.15. Additional Capabilities of the ApplicationContext
summary : 
date    : 2021-07-24 21:59:18 +0900
updated : 2021-10-03 21:47:25 +0900
tag     : java spring
resource: DF/9950FE-8735-4FDF-AFBA-8982FA7A3900
toc     : true
public  : true
parent  : [[/spring/document/core]]
latex   : false
---
* TOC
{:toc}

- 목록으로 - [[/spring/document/core]]
- 이전 문서 - [[/spring/document/core/01-14-reg-loadtimeweaver]]
- 다음 문서 - [[/spring/document/core/01-16-bean-factory]]

## 1.15. Additional Capabilities of the ApplicationContext

[원문]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#context-introduction )

>
As discussed in the [chapter introduction]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans ), the `org.springframework.beans.factory` package provides basic functionality for managing and manipulating beans, including in a programmatic way. The `org.springframework.context` package adds the [`ApplicationContext`]( https://docs.spring.io/spring-framework/docs/5.3.7/javadoc-api/org/springframework/context/ApplicationContext.html ) interface, which extends the `BeanFactory` interface, in addition to extending other interfaces to provide additional functionality in a more application framework-oriented style.
Many people use the `ApplicationContext` in a completely declarative fashion, not even creating it programmatically, but instead relying on support classes such as `ContextLoader` to automatically instantiate an `ApplicationContext` as part of the normal startup process of a Java EE web application.

앞의 1장에서 알아본 바와 같이, `org.springframework.beans.factory` 패키지는, bean을 관리하고 조작하기 위한 기본 기능을 제공합니다(프로그래밍 방식 포함).
`org.springframework.context` 패키지는 `BeanFactory` 인터페이스를 확장하는 `ApplicationContext` 인터페이스를 추가합니다.
그리고 애플리케이션 프레임워크 지향 스타일을 지원하는 추가 기능을 제공하기 위해 다른 여러 인터페이스도 확장한 것도 들어 있습니다.

`ApplicationContext`는 많은 사람들이 프로그래밍 방식을 사용해 생성하지 않고, 완전히 선언적인 방법을 사용해 생성합니다.
이 방법은 `ContextLoader`와 같은 지원 클래스에 의존해 Java EE 웹 애플리케이션의 정상적인 시작 프로세스 과정에서 `ApplicationContext`를 자동으로 인스턴스화합니다.

>
To enhance `BeanFactory` functionality in a more framework-oriented style, the context package also provides the following functionality:
>
- Access to messages in i18n-style, through the `MessageSource` interface.
- Access to resources, such as URLs and files, through the `ResourceLoader` interface.
- Event publication, namely to beans that implement the `ApplicationListener` interface, through the use of the `ApplicationEventPublisher` interface.
- Loading of multiple (hierarchical) contexts, letting each be focused on one particular layer, such as the web layer of an application, through the `HierarchicalBeanFactory` interface.

context 패키지는 `BeanFactory`를 좀 더 프레임워크 지향적인 스타일로 향상시키기 위해 다음을 제공합니다.

- `MessageSource` 인터페이스를 통해 i18n 스타일의 메시지에 대한 엑세스를 제공합니다.
- `ResourceLoader` 인터페이스를 통해 URL 이나 파일과 같은 resource에 대한 엑세스를 제공합니다.
- `ApplicationEventPublisher` 인터페이스를 사용해 `ApplicationListener` 인터페이스를 구현한 bean에 대한 이벤트 발행.
- `HierarchicalBeanFactory` 인터페이스를 통해 애플리케이션의 특정 레이어(web 레이어와 같은)에 집중할 수 있도록 여러 (계층구조) 컨텍스트 로드.


### 1.15.1. Internationalization using MessageSource

[원문]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#context-functionality-messagesource )

>
The `ApplicationContext` interface extends an interface called `MessageSource` and, therefore, provides internationalization (“i18n”) functionality. Spring also provides the `HierarchicalMessageSource` interface, which can resolve messages hierarchically. Together, these interfaces provide the foundation upon which Spring effects message resolution. The methods defined on these interfaces include:

`ApplicationContext` 인터페이스는 `MessageSource` 인터페이스를 확장하고 있으므로 국제화("i18n") 기능을 제공합니다.
또한 Spring은 계층 구조로 메시지를 찾을 수 있는 `HierarchicalMessageSource` 인터페이스도 제공합니다.
이러한 인터페이스들은 Spring의 메시지 resolution과 관련된 기반을 제공합니다.
이런 인터페이스들에 정의된 메소드는 다음과 같습니다.

>
- `String getMessage(String code, Object[] args, String default, Locale loc)`: The basic method used to retrieve a message from the `MessageSource`. When no message is found for the specified locale, the default message is used. Any arguments passed in become replacement values, using the `MessageFormat` functionality provided by the standard library.
- `String getMessage(String code, Object[] args, Locale loc)`: Essentially the same as the previous method but with one difference: No default message can be specified. If the message cannot be found, a `NoSuchMessageException` is thrown.
- `String getMessage(MessageSourceResolvable resolvable, Locale locale)`: All properties used in the preceding methods are also wrapped in a class named `MessageSourceResolvable`, which you can use with this method.


- `String getMessage(String code, Object[] args, String default, Locale loc)`
    - `MessageSource`에서 메시지를 가져오는 기본(basic) 방법입니다. 만약 지정한 locale에 해당하는 메시지를 찾지 못한다면 default 메시지가 사용됩니다. 이 메소드에 입력된 모든 인자는 표준 라이브러리에서 제공하는 `MessageFormat` 기능을 사용해 값이 replace 됩니다.
- `String getMessage(String code, Object[] args, Locale loc)`
    - 본질적으로 앞의 방법과 동일하지만 이 방법은 default 메시지를 지정할 수 없다는 차이점이 있습니다. 만약 메시지를 찾을 수 없다면 `NoSuchMessageException` 예외를 던집니다.
- `String getMessage(MessageSourceResolvable resolvable, Locale locale)`
    - 위의 메소드들에서 사용하는 모든 입력값들은 이 메소드에 입력할 수 있는 `MessageSourceResolvable` 클래스에 래핑되어 있습니다.

>
When an `ApplicationContext` is loaded, it automatically searches for a `MessageSource` bean defined in the context. The bean must have the name `messageSource`. If such a bean is found, all calls to the preceding methods are delegated to the message source. If no message source is found, the `ApplicationContext` attempts to find a parent containing a bean with the same name. If it does, it uses that bean as the `MessageSource`. If the `ApplicationContext` cannot find any source for messages, an empty `DelegatingMessageSource` is instantiated in order to be able to accept calls to the methods defined above.

`ApplicationContext`는 로드되면, 컨텍스트에 정의된 `MessageSource` bean을 자동으로 검색합니다.
`MessageSource` bean은 `messageSource`라는 이름을 반드시 갖고 있어야 하며, 이런 bean이 발견되면 위에서 언급한 메소드에 대한 모든 호출이 메시지 소스에 위임됩니다.

만약 메시지 소스를 찾지 못한다면, `ApplicationContext`는 같은 이름의 bean을 갖고 있는 부모를 찾은 다음, 해당 bean을 `MessageSource`로 사용하게 됩니다.

`ApplicationContext`가 메시지 소스를 찾을 수 없는 상황이라면 위에서 언급한 메소드들을 호출은 할 수 있도록 빈(empty) `DelegatingMessageSource`가 인스턴스화됩니다.

>
Spring provides three `MessageSource` implementations, `ResourceBundleMessageSource`, `ReloadableResourceBundleMessageSource` and `StaticMessageSource`. All of them implement `HierarchicalMessageSource` in order to do nested messaging. The `StaticMessageSource` is rarely used but provides programmatic ways to add messages to the source. The following example shows `ResourceBundleMessageSource`:

Spring은 `MessageSource`의 세 가지 구현체를 제공합니다. `ResourceBundleMessageSource`, `ReloadableResourceBundleMessageSource`, `StaticMessageSource`.
이 셋 모두 계층 구조의 메시지를 처리할 수 있도록 `HierarchicalMessageSource`를 구현하고 있습니다.
`StaticMessageSource`는 거의 사용되지는 않지만, 프로그래밍 방식으로 소스에 메시지를 추가하는 방법을 제공해 줍니다.
다음 예제는 `ResourceBundleMessageSource`를 보여줍니다.

```xml
<beans>
    <bean id="messageSource"
            class="org.springframework.context.support.ResourceBundleMessageSource">
        <property name="basenames">
            <list>
                <value>format</value>
                <value>exceptions</value>
                <value>windows</value>
            </list>
        </property>
    </bean>
</beans>
```

>
The example assumes that you have three resource bundles called `format`, `exceptions` and `windows` defined in your classpath. Any request to resolve a message is handled in the JDK-standard way of resolving messages through `ResourceBundle` objects. For the purposes of the example, assume the contents of two of the above resource bundle files are as follows:

이 예제는 여러분의 classpath에 `format`, `exceptions`, `windows`라는 3개의 리소스 꾸러미가 있다고 가정하고 있습니다.
메시지에 대한 모든 resolve 요청은 `ResourceBundle` 객체를 통해 JDK 표준 방법으로 처리됩니다.
예제를 더 잘 이해하기 위해 위의 두 리소스 번들 파일의 내용이 다음과 같다고 합시다.

```
    # in format.properties
    message=Alligators rock!
```

```
    # in exceptions.properties
    argument.required=The {0} argument is required.
```

>
The next example shows a program to run the `MessageSource` functionality. Remember that all `ApplicationContext` implementations are also `MessageSource` implementations and so can be cast to the `MessageSource` interface.

다음 예제는 `MessageSource` 기능을 실행하는 프로그램을 보여줍니다.
`ApplicationContext`의 구현체는 `MessageSource`의 구현이기도 하므로 `MessageSource` 인터페이스로 캐스팅될 수 있다는 점에 주목하세요.

```java
public static void main(String[] args) {
    MessageSource resources = new ClassPathXmlApplicationContext("beans.xml");
    String message = resources.getMessage("message", null, "Default", Locale.ENGLISH);
    System.out.println(message);
}
```

>
The resulting output from the above program is as follows:

위의 프로그램을 실행한 결과 출력은 다음과 같습니다.

```
Alligators rock!
```

>
To summarize, the `MessageSource` is defined in a file called `beans.xml`, which exists at the root of your classpath.
The `messageSource` bean definition refers to a number of resource bundles through its `basenames` property.
The three files that are passed in the list to the `basenames` property exist as files at the root of your classpath and are called `format.properties`, `exceptions.properties`, and `windows.properties`, respectively.

요약해 봅시다. `MessageSource`는 classpath의 루트 경로에 있는 `beans.xml` 파일에 정의되어 있습니다.
`messageSource` bean definition은 `basenames` 속성에 지정된 여러 리소스 번들을 참조합니다.
목록에서 `basenames` 속성으로 전달된 세 개의 파일은 classpath 루트에 파일로 존재하며, 각각 `format.properties`, `exceptions.properties`, and `windows.properties`라고 부릅니다.

>
The next example shows arguments passed to the message lookup. These arguments are converted into `String` objects and inserted into placeholders in the lookup message.

다음 예는 메시지 조회에 전달된 인자를 보여줍니다.
이런 인자들은 `String` 타입으로 변환되고 조회 메시지의 placeholder에 입력됩니다.

```xml
<beans>

    <!-- this MessageSource is being used in a web application -->
    <bean id="messageSource" class="org.springframework.context.support.ResourceBundleMessageSource">
        <property name="basename" value="exceptions"/>
    </bean>

    <!-- lets inject the above MessageSource into this POJO -->
    <bean id="example" class="com.something.Example">
        <property name="messages" ref="messageSource"/>
    </bean>

</beans>
```

```java
public class Example {

    private MessageSource messages;

    public void setMessages(MessageSource messages) {
        this.messages = messages;
    }

    public void execute() {
        String message = this.messages.getMessage("argument.required",
            new Object [] {"userDao"}, "Required", Locale.ENGLISH);
        System.out.println(message);
    }
}
```

>
The resulting output from the invocation of the `execute()` method is as follows:

`execute()` 메소드를 호출하면 다음과 같은 결과가 출력됩니다.

```
The userDao argument is required.
```

>
With regard to internationalization (“i18n”), Spring’s various `MessageSource` implementations follow the same locale resolution and fallback rules as the standard JDK `ResourceBundle`.
In short, and continuing with the example `messageSource` defined previously, if you want to resolve messages against the British (`en-GB`) locale, you would create files called `format_en_GB.properties`, `exceptions_en_GB.properties`, and `windows_en_GB.properties`, respectively.

국제화("i18n")와 관련된 Spring의 다양한 `MessageSource` 구현은 표준 JDK `ResourceBundle`과 같은 방식의 locale resolution과 fallback 규칙을 따르고 있습니다.
즉, 이전에 정의된 예제의 `messageSource`를 그대로 사용해서 영국(`en-GB`) locale에 해당하는 메시지를 사용하려면 각각 `format_en_GB.properties`, `exceptions_en_GB.properties`, `windows_en_GB.properties` 라는 파일을 생성하면 됩니다.

>
Typically, locale resolution is managed by the surrounding environment of the application.
In the following example, the locale against which (British) messages are resolved is specified manually:

locale 결정은 애플리케이션을 둘러싸고 있는 환경에서 관리하는 것이 일반적입니다.
다음 예제에서는 메시지 로케일이 수동으로 지정되고 있습니다.

```
# in exceptions_en_GB.properties
argument.required=Ebagum lad, the ''{0}'' argument is required, I say, required.
```

```java
public static void main(final String[] args) {
    MessageSource resources = new ClassPathXmlApplicationContext("beans.xml");
    String message = resources.getMessage("argument.required",
        new Object [] {"userDao"}, "Required", Locale.UK);
    System.out.println(message);
}
```

>
The resulting output from the running of the above program is as follows:

위의 프로그램을 실행하면 다음과 같이 출력됩니다.

```
Ebagum lad, the 'userDao' argument is required, I say, required.
```

>
You can also use the `MessageSourceAware` interface to acquire a reference to any `MessageSource` that has been defined.
Any bean that is defined in an `ApplicationContext` that implements the `MessageSourceAware` interface is injected with the application context’s `MessageSource` when the bean is created and configured.

`MessageSourceAware` 인터페이스를 사용하면 정의된 모든 `MessageSource`의 참조를 얻을 수 있습니다.
`MessageSourceAware` 인터페이스의 구현체인 `ApplicationContext` 내에 정의된 모든 bean은, bean이 생성되고 configure 될 때 애플리케이션 컨텍스트의 `MessageSource`와 함께 주입됩니다.

> (i)
As an alternative to `ResourceBundleMessageSource`, Spring provides a `ReloadableResourceBundleMessageSource` class.
This variant supports the same bundle file format but is more flexible than the standard JDK based `ResourceBundleMessageSource` implementation.
In particular, it allows for reading files from any Spring resource location (not only from the classpath) and supports hot reloading of bundle property files (while efficiently caching them in between).
See the [`ReloadableResourceBundleMessageSource`]( https://docs.spring.io/spring-framework/docs/5.3.7/javadoc-api/org/springframework/context/support/ReloadableResourceBundleMessageSource.html ) javadoc for details.
{:style="background-color: #ecf1e8;"}

- (i)
    - Spring은 `ResourceBundleMessageSource`의 대안으로 `ReloadableResourceBundleMessageSource` 클래스를 제공합니다.
        - 이 변형은 똑같은 번들 파일 포맷을 지원하면서도, 스탠다드 JDK 베이스의 `ResourceBundleMessageSource` 구현보다 더 높은 유연성을 갖고 있습니다.
        - 특히, 이 클래스는 모든 Spring 리소스 경로(classpath 경로 외의 다른 경로도)에서 파일을 읽을 수 있으며, 번들 속성 파일의 hot reloading도 지원합니다.
    - 자세한 내용은 [`ReloadableResourceBundleMessageSource`]( https://docs.spring.io/spring-framework/docs/5.3.7/javadoc-api/org/springframework/context/support/ReloadableResourceBundleMessageSource.html )의 javadoc 문서를 참고하세요.

### 1.15.2. Standard and Custom Events

[원문]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#context-functionality-events )

>
Event handling in the `ApplicationContext` is provided through the `ApplicationEvent` class and the `ApplicationListener` interface.
If a bean that implements the `ApplicationListener` interface is deployed into the context, every time an `ApplicationEvent` gets published to the `ApplicationContext`, that bean is notified.
Essentially, this is the standard Observer design pattern.

`ApplicationContext`의 이벤트 핸들링은 `ApplicationEvent` 클래스와 `ApplicationListener` 인터페이스를 통해 제공됩니다.
`ApplicationListener` 인터페이스를 구현하는 bean이 컨텍스트에 배포되면 `ApplicationEvent`가 `ApplicationContext`에 발행될 때마다 해당 bean에 알림이 보내집니다.
기본적으로 이 방식은 일반적인 [[/pattern/observer]] 입니다.

>
As of Spring 4.2, the event infrastructure has been significantly improved and offers an [annotation-based model]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#context-functionality-events-annotation ) as well as the ability to publish any arbitrary event (that is, an object that does not necessarily extend from `ApplicationEvent`).
When such an object is published, we wrap it in an event for you.
{:style="background-color: #e9f1f6;"}

- Spring 4.2 버전부터 이벤트 인프라가 대폭 개선되었으며, 애노테이션 기반의 모델과 임의의 이벤트(`ApplicationEvent`에서 확장할 필요가 없는 객체)를 발행하는 기능을 제공합니다.
- 이런 종류의 객체가 발행되면, 우리는(Spring은) 이를 이벤트로 래핑합니다.

>
The following table describes the standard events that Spring provides:

> Table 7. Built-in Events
> <div id="table1"></div>

- th
    - Event
    - Explanation
- td
    - `ContextRefreshedEvent`
    - Published when the `ApplicationContext` is initialized or refreshed (for example, by using the `refresh()` method on the `ConfigurableApplicationContext` interface). Here, “initialized” means that all beans are loaded, post-processor beans are detected and activated, singletons are pre-instantiated, and the `ApplicationContext` object is ready for use. As long as the context has not been closed, a refresh can be triggered multiple times, provided that the chosen `ApplicationContext` actually supports such “hot” refreshes. For example, `XmlWebApplicationContext` supports hot refreshes, but `GenericApplicationContext` does not.
- td
    - `ContextStartedEvent`
    - Published when the `ApplicationContext` is started by using the `start()` method on the `ConfigurableApplicationContext` interface. Here, “started” means that all `Lifecycle` beans receive an explicit start signal. Typically, this signal is used to restart beans after an explicit stop, but it may also be used to start components that have not been configured for autostart (for example, components that have not already started on initialization).
- td
    - `ContextStoppedEvent`
    - Published when the `ApplicationContext` is stopped by using the `stop()` method on the `ConfigurableApplicationContext` interface. Here, “stopped” means that all `Lifecycle` beans receive an explicit stop signal. A stopped context may be restarted through a `start()` call.
- td
    - `ContextClosedEvent`
    - Published when the `ApplicationContext` is being closed by using the `close()` method on the `ConfigurableApplicationContext` interface or via a JVM shutdown hook. Here, "closed" means that all singleton beans will be destroyed. Once the context is closed, it reaches its end of life and cannot be refreshed or restarted.
- td
    - `RequestHandledEvent`
    - A web-specific event telling all beans that an HTTP request has been serviced. This event is published after the request is complete. This event is only applicable to web applications that use Spring’s `DispatcherServlet`.
- td
    - `ServletRequestHandledEvent`
    - A subclass of `RequestHandledEvent` that adds Servlet-specific context information.
{:class="table-generate" data-target-id="table1"}

다음의 표는 Spring에서 제공하는 표준 이벤트들을 설명합니다.

<div id="table2"></div>

- th
    - 이벤트
    - 설명
- td
    - `ContextRefreshedEvent`
    - `ApplicationContext`가 "초기화"되거나 refresh되면 발행되는 이벤트 입니다. (예: `ConfigurableApplicationContext`인터페이스의 `refresh()`메소드를 사용하는 경우)
        - 여기에서 "초기화"는 모든 bean의 로딩이 완료되고, post-processor bean들이 모두 감지되고 활성화도 되었고, 싱글톤들이 pre-instantiated 되어서, `ApplicationContext` 객체를 사용할 준비가 되었을 때를 의미합니다.
        - 컨텍스트가 닫히지 않은 한, 선택된 `ApplicationContext`가 실제로 "hot" refresh를 지원한다면, 새로 고침이 여러번 트리거 될 수 있습니다.
            - 예를 들어 `XmlWebApplicationContext`는 hot refresh를 지원하지만, `GenericApplicationContext`는 지원하지 않습니다.
- td
    - `ContextStartedEvent`
    - `ConfigurableApplicationContext` 인터페이스의 `start()` 메소드를 사용해서 `ApplicationContext`가 "시작"될 때 발행되는 이벤트입니다.
        - 여기에서 "시작"은 모든 `Lifecycle` bean이 명시적인 시작 신호를 받는 것을 의미합니다.
        - 일반적으로 이 신호는 명시적인 stop 후 bean을 restart하는데 사용되지만, autostart로 configure되지 않은 컴포넌트(예: 초기화 시 아직 시작되지 않은 컴포넌트)를 시작할 때에도 사용될 수 있습니다.
- td
    - `ContextStoppedEvent`
    - `ConfigurableApplicationContext` 인터페이스의 `stop()` 메소드를 써서 `ApplicationContext`가 "정지"될 때 발행되는 이벤트입니다.
        - 여기에서 "정지"는 모든 `Lifecycle` bean이 명시적인 정지 신호를 받는 것을 의미합니다.
        - 정지된 컨텍스트는 `start()`를 호출해서 restart할 수 있습니다.
- td
    - `ContextClosedEvent`
    - `ConfigurableApplicationContext` 인터페이스의 `close()` 메소드를 사용하거나, JVM shutdown hook을 통해 `ApplicationContext`가 "close"될 때 발행되는 이벤트입니다.
        - 여기에서 "close"는 모든 싱글톤 bean이 destroy 되는 것을 의미합니다.
        - context가 일단 close 되면 생명주기의 끝에 도달하게 되어 refresh나 restart가 불가능해집니다.
- td
    - `RequestHandledEvent`
    - HTTP request가 서비스되었음을 모든 been에 알려주는 web 특화 이벤트입니다.
        - 이 이벤트는 request가 완료되었을 때 발행됩니다.
        - 이 이벤트는 Spring의 `DispatcherServlet`을 사용하는 웹 애플리케이션에서만 사용 가능합니다.
- td
    - `ServletRequestHandledEvent`
    - Servlet 관련 컨텍스트 정보를 추가하는 `RequestHandledEvent`의 서브 클래스입니다.
{:class="table-generate" data-target-id="table2"}

>
You can also create and publish your own custom events. The following example shows a simple class that extends Spring’s `ApplicationEvent` base class:

커스텀 이벤트를 생성하고 발행하는 것도 가능합니다.
다음 예제는 Spring의 `ApplicationEvent` 클래스를 extends 하는 간단한 예제 클래스를 보여줍니다.

```java
public class BlockedListEvent extends ApplicationEvent {

    private final String address;
    private final String content;

    public BlockedListEvent(Object source, String address, String content) {
        super(source);
        this.address = address;
        this.content = content;
    }

    // accessor and other methods...
}
```

>
To publish a custom `ApplicationEvent`, call the `publishEvent()` method on an `ApplicationEventPublisher`.
Typically, this is done by creating a class that implements `ApplicationEventPublisherAware` and registering it as a Spring bean. The following example shows such a class:

커스텀 `ApplicationEvent`를 발행하려면 `ApplicationEventPublisher`의 `publishEvent()` 메소드를 호출하세요.
이 작업은 일반적으로 `ApplicationEventPublisherAware`의 구현 클래스를 생성하고 bean으로 등록하는 식으로 이루어집니다.
다음 예제는 이런 클래스를 보여줍니다.

```java
public class EmailService implements ApplicationEventPublisherAware {

    private List<String> blockedList;
    private ApplicationEventPublisher publisher;

    public void setBlockedList(List<String> blockedList) {
        this.blockedList = blockedList;
    }

    public void setApplicationEventPublisher(ApplicationEventPublisher publisher) {
        this.publisher = publisher;
    }

    public void sendEmail(String address, String content) {
        if (blockedList.contains(address)) {
            publisher.publishEvent(new BlockedListEvent(this, address, content));
            return;
        }
        // send email...
    }
}
```

>
At configuration time, the Spring container detects that `EmailService` implements `ApplicationEventPublisherAware` and automatically calls `setApplicationEventPublisher()`.
In reality, the parameter passed in is the Spring container itself. You are interacting with the application context through its `ApplicationEventPublisher` interface.

configuration time에, `EmailService`가 `ApplicationEventPublisherAware`를 구현하고 자동으로 `setApplicationEventPublisher()`를 호출하는 것을 Spring 컨테이너는 자동으로 감지합니다.
이 때, 이 메소드를 통해 전달된 파라미터는 Spring 컨테이너 자체입니다.
여러분은 `ApplicationEventPublisher` 인터페이스를 통해 애플리케이션 컨텍스트와 상호작용하고 있는 것입니다.

>
To receive the custom `ApplicationEvent`, you can create a class that implements `ApplicationListener` and register it as a Spring bean. The following example shows such a class:

커스텀 `ApplicationEvent`를 수신하려면, `ApplicationListener`를 구현하는 클래스를 생성하고 Spring bean으로 등록하면 됩니다.
다음 예제에서는 이러한 클래스를 보여줍니다.

```java
public class BlockedListNotifier implements ApplicationListener<BlockedListEvent> {

    private String notificationAddress;

    public void setNotificationAddress(String notificationAddress) {
        this.notificationAddress = notificationAddress;
    }

    public void onApplicationEvent(BlockedListEvent event) {
        // notify appropriate parties via notificationAddress...
    }
}
```

>
Notice that `ApplicationListener` is generically parameterized with the type of your custom event (`BlockedListEvent` in the preceding example).
This means that the `onApplicationEvent()` method can remain type-safe, avoiding any need for downcasting.
You can register as many event listeners as you wish, but note that, by default, event listeners receive events synchronously.
This means that the `publishEvent()` method blocks until all listeners have finished processing the event.
One advantage of this synchronous and single-threaded approach is that, when a listener receives an event, it operates inside the transaction context of the publisher if a transaction context is available.
If another strategy for event publication becomes necessary, see the javadoc for Spring’s [`ApplicationEventMulticaster`]( https://docs.spring.io/spring-framework/docs/5.3.7/javadoc-api/org/springframework/context/event/ApplicationEventMulticaster.html ) interface and [`SimpleApplicationEventMulticaster`]( https://docs.spring.io/spring-framework/docs/5.3.7/javadoc-api/org/springframework/context/event/SimpleApplicationEventMulticaster.html ) implementation for configuration options.

`ApplicationListener`는 일반적으로 커스텀 이벤트의 타입으로 parameterized 되곤 합니다(위의 예제의 `BlockedListEvent`).
즉, `onApplicationEvent()` 메소드는 type-safe 하므로 downcasting이 필요하지 않습니다.

이벤트 리스너의 수는 원하는 만큼 얼마든지 등록할 수 있습니다. 다만, 이벤트 리스너는 기본적으로 이벤트를 동기식(synchronously)으로 수신합니다.
이는 모든 리스너가 이벤트 처리를 완료할 때까지는 `publishEvent()` 메소드가 block된다는 의미입니다.

이런 동기식의 단일 스레드 접근 방식의 한 가지 장점은, 리스너가 이벤트를 수신할 때 트랜잭션 컨텍스트를 사용할 수 있는 경우라면 이벤트 발행자의 트랜잭션 컨텍스트 내에서 작동하게 된다는 것입니다.

만약 이벤트 발행을 위한 다른 전략이 필요하다면, Spring `ApplicationEventMulticaster` 인터페이스의 javadoc과 configuration option에 대한 `SimpleApplicationEventMulticaster`의 구현을 참고하세요.

>
The following example shows the bean definitions used to register and configure each of the classes above:

다음 예제는 위의 각 클래스를 등록하고 configure하는데 사용되는 bean definition을 보여줍니다.

```xml
<bean id="emailService" class="example.EmailService">
    <property name="blockedList">
        <list>
            <value>known.spammer@example.org</value>
            <value>known.hacker@example.org</value>
            <value>john.doe@example.org</value>
        </list>
    </property>
</bean>

<bean id="blockedListNotifier" class="example.BlockedListNotifier">
    <property name="notificationAddress" value="blockedlist@example.org"/>
</bean>
```

>
Putting it all together, when the `sendEmail()` method of the `emailService` bean is called, if there are any email messages that should be blocked, a custom event of type `BlockedListEvent` is published. The `blockedListNotifier` bean is registered as an `ApplicationListener` and receives the `BlockedListEvent`, at which point it can notify appropriate parties.

지금까지의 내용을 종합해보면, `emailService` bean의 `sendEmail()` 메소드가 호출될 때, 만약 차단해야 하는 이메일 메시지가 있다면 `BlockedListEvent`가 발행됩니다.
`ApplicationListener`로 등록된 `blockedListNotifier` been은 `BlockedListEvent`를 수신해서 이를 적절한 처리자에게 알려줄 수 있습니다.

> (i)
Spring’s eventing mechanism is designed for simple communication between Spring beans within the same application context. However, for more sophisticated enterprise integration needs, the separately maintained [Spring Integration]( https://projects.spring.io/spring-integration/ ) project provides complete support for building lightweight, [pattern-oriented]( https://www.enterpriseintegrationpatterns.com/ ), event-driven architectures that build upon the well-known Spring programming model.
{:style="background-color: #ecf1e8;"}

- (i)
    - Spring의 이벤트 처리 메커니즘은 동일한 애플리케이션 컨텍스트 내에서 Spring bean과 bean 사이의 간단한 커뮤니케이션을 위해 디자인되었습니다.
    - 한편, 그보다 더 정교한 엔터프라이즈 통합 요구 사항을 만족시키기 위해 별도로 관리되고 있는 Spring Integration 프로젝트는 잘 알려져 있는 Spring 프로그래밍 모델을 기반으로 하는 가볍고 패턴 지향적인 이벤트 중심 아키텍처를 구축하기 위한 완벽한 지원을 제공합니다.

#### Annotation-based Event Listeners

[원문]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#context-functionality-events-annotation )

>
You can register an event listener on any method of a managed bean by using the `@EventListener` annotation. The `BlockedListNotifier` can be rewritten as follows:

관리되고 있는 bean이라면 어느 메소드이건 `@EventListener` 애노테이션을 붙여서 이벤트 리스너를 등록할 수 있습니다.
`BlockedListNotifier`는 다음과 같이 작성할 수 있습니다.

```java
public class BlockedListNotifier {

    private String notificationAddress;

    public void setNotificationAddress(String notificationAddress) {
        this.notificationAddress = notificationAddress;
    }

    @EventListener
    public void processBlockedListEvent(BlockedListEvent event) {
        // notify appropriate parties via notificationAddress...
    }
}
```

>
The method signature once again declares the event type to which it listens, but, this time, with a flexible name and without implementing a specific listener interface.
The event type can also be narrowed through generics as long as the actual event type resolves your generic parameter in its implementation hierarchy.

메소드 시그니처는 수신하는 이벤트 타입으로 다시 한번 선언하기 마련이지만, 이번에는 특정한 리스너 인터페이스를 구현하지 않고 유연한 이름을 사용합니다.
실제 이벤트 타입이 구현 계층에서 제네릭 파라미터를 resolve한다면 이벤트 타입은 제네릭을 통해 범위를 좁힐 수도 있습니다.

>
If your method should listen to several events or if you want to define it with no parameter at all, the event types can also be specified on the annotation itself. The following example shows how to do so:

만약 여러 이벤트를 수신하게 하고 싶거나 파라미터 없이 정의하려 한다면, 이벤트 타입을 애노테이션에 지정하는 방법도 있습니다.
다음 예는 그 방법을 보여줍니다.

```java
@EventListener({ContextStartedEvent.class, ContextRefreshedEvent.class})
public void handleContextStart() {
    // ...
}
```

>
It is also possible to add additional runtime filtering by using the `condition` attribute of the annotation that defines a [`SpEL` expression]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#expressions ), which should match to actually invoke the method for a particular event.

특정 이벤트에 대한 메소드를 실제로 호출하기 위해 `SpEL` 표현식을 정의하는 애노테이션의 `condition` 속성을 사용해 runtime filtering을 추가하는 것도 가능합니다.

>
The following example shows how our notifier can be rewritten to be invoked only if the content attribute of the event is equal to `my-event`:

다음 예제는 이벤트의 content 속성이 `my-event`와 동일한 경우에만 호출되도록 notifier를 다시 작성하는 방법을 보여줍니다.

```java
@EventListener(condition = "#blEvent.content == 'my-event'")
public void processBlockedListEvent(BlockedListEvent blEvent) {
    // notify appropriate parties via notificationAddress...
}
```

>
Each `SpEL` expression evaluates against a dedicated context.
The following table lists the items made available to the context so that you can use them for conditional event processing:

각 `SpEL` 표현식의 평가는 전용 컨텍스트에 대해 이루어집니다.
다음 표는 조건부 이벤트 처리에 사용할 수 있도록 컨텍스트에서 사용할 수 있는 항목을 나열합니다.

> Table 8. Event SpEL available metadata
> <div id="table8"></div>

- th
    - Name
    - Location
    - Description
    - Example
- td
    - Event
    - root object
    - The actual `ApplicationEvent`.
    - `#root.event` or `event`
- td
    - Arguments array
    - root object
    - The arguments (as an object array) used to invoke the method.
    - `#root.args` or `args`; `args[0]` to access the first argument, etc.
- td
    - Argument name
    - evaluation context
    - The name of any of the method arguments. If, for some reason, the names are not available (for example, because there is no debug information in the compiled byte code), individual arguments are also available using the `#a<#arg>` syntax where `<#arg>` stands for the argument index (starting from 0).
    - `#blEvent` or `#a0` (you can also use `#p0` or `#p<#arg>` parameter notation as an alias)
{:class="table-generate" data-target-id="table8"}


<div id="table8-ko"></div>

- th
    - 이름
    - 위치
    - 설명
    - 예제
- td
    - Event
    - root object
    - 실제 `ApplicationEvent`.
    - `#root.event` 또는 `event`.
- td
    - Arguments array
    - root object
    - 메소드를 호출하는 데 사용되는 인자들(객체 배열).
    - `#root.args` 또는 `args`. 첫번째 인자는 `args[0]`와 같이 접근.
- td
    - Argument name
    - evaluation context
    - 메소드 인자의 이름. 만약 이름을 사용할 수 없는 경우라면(예: 컴파일된 바이트 코드만 갖고 있는 경우) 개발 인자는 `#a<#arg>` 신택스를 써서 사용할 수도 있습니다. 이때 `<#arg>`는 인자 인덱스이며 인덱스는 0부터 시작합니다.
    - `#blEvent` 또는 `#a0` (`#p0` 또는 `#p<#arg>` 파라미터 표기법을 알리아스로 사용할 수도 있습니다.)
{:class="table-generate" data-target-id="table8-ko"}

>
Note that `#root.event` gives you access to the underlying event, even if your method signature actually refers to an arbitrary object that was published.

메소드 시그니처가 실제로 발행된 어떤 객체를 참조하더라도 `#root.event`를 사용하면 베이스가 되는 기본 이벤트에 엑세스할 수 있습니다.

>
If you need to publish an event as the result of processing another event, you can change the method signature to return the event that should be published, as the following example shows:

만약 다른 이벤트를 처리한 결과를 다시 이벤트로 발행해야 한다면, 다음 에제와 같이 발행해야 하는 이벤트를 리턴하도록 메소드 시그니처를 수정할 수 있습니다.

```java
@EventListener
public ListUpdateEvent handleBlockedListEvent(BlockedListEvent event) {
    // notify appropriate parties via notificationAddress and
    // then publish a ListUpdateEvent...
}
```

> (i)
This feature is not supported for [asynchronous listeners]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#context-functionality-events-async ).
{:style="background-color: #ecf1e8;"}

- (i)
    - 이 기능은 비동기 리스너를 지원하지 않습니다.

>
The `handleBlockedListEvent()` method publishes a new `ListUpdateEvent` for every `BlockedListEvent` that it handles. If you need to publish several events, you can return a `Collection` or an array of events instead.

`handleBlockedListEvent()` 메소드는 핸들링하는 모든 `BlockedListEvent`에 대해 새로운 `ListUpdateEvent`를 발행합니다.
여러 이벤트를 발행해야 하는 경우라면 `Collection`이나 이벤트 배열을 리턴하는 방법도 사용할 수 있습니다.

#### Asynchronous Listeners

[원문]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#context-functionality-events-async )

>
If you want a particular listener to process events asynchronously, you can reuse the [regular `@Async` support]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/integration.html#scheduling-annotation-support-async ).
The following example shows how to do so:

만약 리스너가 이벤트를 비동기로 처리하게 하고 싶다면, `@Async` 지원을 사용할 수 있습니다.
다음 예제에서 그 방법을 보여줍니다.

```java
@EventListener
@Async
public void processBlockedListEvent(BlockedListEvent event) {
    // BlockedListEvent is processed in a separate thread
}
```

>
Be aware of the following limitations when using asynchronous events:
>
- If an asynchronous event listener throws an `Exception`, it is not propagated to the caller. See `AsyncUncaughtExceptionHandler` for more details.
- Asynchronous event listener methods cannot publish a subsequent event by returning a value. If you need to publish another event as the result of the processing, inject an [`ApplicationEventPublisher`]( https://docs.spring.io/spring-framework/docs/5.3.7/javadoc-api/org/springframework/aop/interceptor/AsyncUncaughtExceptionHandler.html ) to publish the event manually.

비동기 이벤트를 사용할 때에는 다음을 주의해야 합니다.

- 만약 비동기 이벤트 리스너가 `Exception`을 던지게 되면, 호출자에게 예외가 전달되지 않습니다.
    - 자세한 내용은 `AsyncUncaughtExceptionHandler`를 참고하세요.
- 비동기 이벤트 리스너 메소드는 값을 리턴하는 방식을 통해 서브 이벤트를 발행할 수 없습니다.
    - 만약 처리 결과로 다른 이벤트를 발행하고 싶다면, `ApplicationEventPublisher`를 주입해서 이벤트를 수동으로 발행하세요.

#### Ordering Listeners

[원문]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#context-functionality-events-order )

>
If you need one listener to be invoked before another one, you can add the `@Order` annotation to the method declaration, as the following example shows:

만약 어떤 리스너를 다른 리스너보다 먼저 호출할 필요가 있다면, 다음 예제와 같이 `@Order` 애노테이션을 메소드에 붙여주면 됩니다.

```java
@EventListener
@Order(42)
public void processBlockedListEvent(BlockedListEvent event) {
    // notify appropriate parties via notificationAddress...
}
```

#### Generic Events

[원문]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#context-functionality-events-generics )

>
You can also use generics to further define the structure of your event.
Consider using an `EntityCreatedEvent<T>` where `T` is the type of the actual entity that got created.
For example, you can create the following listener definition to receive only `EntityCreatedEvent` for a `Person`:

제네릭을 사용해 추가적인 이벤트 구조를 정의하는 것도 가능합니다.
`EntityCreatedEvent<T>`를 사용한다고 생각해 봅시다. 이때 `T`는 생성된 실제 엔티티의 타입입니다.
예를 들어, 다음과 같이 리스너를 정의하면 `Person`에 대한 `EntityCreatedEvent` 이벤트만 받을 수도 있습니다.

```java
@EventListener
public void onPersonCreated(EntityCreatedEvent<Person> event) {
    // ...
}
```

>
Due to type erasure, this works only if the event that is fired resolves the generic parameters on which the event listener filters (that is, something like `class PersonCreatedEvent extends EntityCreatedEvent<Person> { … }`).

이 작업은 이벤트가 발생했을 때 이벤트 리스너 필터의 제네릭 파라미터가 일치하는 경우(예: `class PersonCreatedEvent extends EntityCreatedEvent<Person> { … }`)에만 작동합니다.

>
In certain circumstances, this may become quite tedious if all events follow the same structure (as should be the case for the event in the preceding example). In such a case, you can implement `ResolvableTypeProvider` to guide the framework beyond what the runtime environment provides. The following event shows how to do so:

만약 모든 이벤트가 똑같은 구조로(위의 예제와 같이) 이벤트를 처리한다면 상당히 장황한 코드가 될 수도 있습니다.
이런 경우에는 `ResolvableTypeProvider`를 구현하는 방법을 생각할 수 있습니다.

```java
public class EntityCreatedEvent<T> extends ApplicationEvent implements ResolvableTypeProvider {

    public EntityCreatedEvent(T entity) {
        super(entity);
    }

    @Override
    public ResolvableType getResolvableType() {
        return ResolvableType.forClassWithGenerics(getClass(), ResolvableType.forInstance(getSource()));
    }
}
```

>
This works not only for `ApplicationEvent` but any arbitrary object that you send as an event.
{:style="background-color: #e9f1f6;"}

- 이 방법은 `ApplicationEvent` 뿐만 아니라 이벤트로 전송하는 객체에 대해서도 작동합니다.

### 1.15.3. Convenient Access to Low-level Resources

[원문]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#context-functionality-resources )

>
For optimal usage and understanding of application contexts, you should familiarize yourself with Spring’s `Resource` abstraction, as described in [Resources]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#resources ).

애플리케이션 컨텍스트를 잘 이해하고 잘 사용하려면, [Resources]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#resources ) 문서에 나와있는 것과 같이 Spring의 리소스 추상화를 익숙하게 다룰 수 있어야 합니다.

>
An application context is a `ResourceLoader`, which can be used to load `Resource` objects.
A `Resource` is essentially a more feature rich version of the JDK `java.net.URL` class.
In fact, the implementations of the `Resource` wrap an instance of `java.net.URL`, where appropriate.
A `Resource` can obtain low-level resources from almost any location in a transparent fashion, including from the classpath, a filesystem location, anywhere describable with a standard URL, and some other variations.
If the resource location string is a simple path without any special prefixes, where those resources come from is specific and appropriate to the actual application context type.

애플리케이션 컨텍스트는 `Resource` 객체를 로드하는 용도로 사용할 수 있는 `ResourceLoader` 이기도 합니다.
`Resource`는 본질적으로는 JDK의 `java.net.URL` 클래스에 기능을 풍부하게 추가한 버전이라 할 수 있습니다.
사실, `Resource`의 구현체들은 `java.net.URL`를 적절하게 래핑한 것들입니다.
`Resource`는 거의 모든 위치(classpath, 파일 시스템, URL로 표현 가능한 모든 곳, 그 외 기타 등등)에 있는 저수준 리소스를 투명한 방식으로 가져올 수 있습니다.
만약 리소스 경로 string이 특별한 prefix가 없는 단순한 경로라면, 해당 리소스의 위치는 실제 애플리케이션의 컨텍스트 타입에 적합한 경로가 됩니다.

>
You can configure a bean deployed into the application context to implement the special callback interface, `ResourceLoaderAware`, to be automatically called back at initialization time with the application context itself passed in as the `ResourceLoader`.
You can also expose properties of type `Resource`, to be used to access static resources.
They are injected into it like any other properties.
You can specify those `Resource` properties as simple `String` paths and rely on automatic conversion from those text strings to actual `Resource` objects when the bean is deployed.

특별한 콜백 인터페이스인 `ResourceLoaderAware`를 구현하도록 애플리케이션 컨텍스트에 등록된 bean을 configure할 수 있습니다.
이 인터페이스는 `ResourceLoader`로서 전달된 애플리케이션 컨텍스트 자체와 함께 초기화 시간에 자동으로 콜백됩니다.
정적 리소스에 엑세스하는 데 사용할 `Resource` 타입의 속성을 노출하는 것도 가능한데, 이런 속성들도 다른 속성과 마찬가지로 주입이 됩니다.
이런 `Resource` 속성들을 단순한 `String` 경로로 지정할 수 있습니다. 그러면 bean이 배포될 때 해당 텍스트 string이 실제 `Resource` 객체로 자동 변환됩니다.

>
The location path or paths supplied to an `ApplicationContext` constructor are actually resource strings and, in simple form, are treated appropriately according to the specific context implementation.
For example `ClassPathXmlApplicationContext` treats a simple location path as a classpath location.
You can also use location paths (resource strings) with special prefixes to force loading of definitions from the classpath or a URL, regardless of the actual context type.

`ApplicationContext`는 간단한 포맷을 가진 실제 리소스 string을 생성자로 넘겨 받으며, 이러한 값들은 컨텍스트 구현에 따라 적절하게 처리됩니다.
예를 들어 `ClassPathXmlApplicationContext`는 단순한 위치 경로를 classpath 경로로 취급합니다.
컨텍스트 타입을 무시하고 classpath나 URL에서 어떤 definition을 강제로 로드할 목적으로 특수한 prefix가 있는 위치 경로(리소스 문자열)를 사용하는 것도 가능합니다.


### 1.15.4. Application Startup Tracking

[원문]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#context-functionality-startup )

>
The `ApplicationContext` manages the lifecycle of Spring applications and provides a rich programming model around components.
As a result, complex applications can have equally complex component graphs and startup phases.

`ApplicationContext`는 Spring 애플리케이션의 라이프사이클을 관리하고 컴포넌트와 관련된 풍부한 프로그래밍 모델을 제공합니다.
따라서 애플리케이션의 구조가 복잡하다면 컴포넌트 그래프도 복잡하고 시작 단계도 복잡해지게 됩니다.

>
Tracking the application startup steps with specific metrics can help understand where time is being spent during the startup phase, but it can also be used as a way to better understand the context lifecycle as a whole.

애플리케이션의 시작 단계를 측정해 보면 시작 단계의 어느 지점에서 오래 걸리는지를 이해하는 데에 도움이 될 텐데,
이런 방법을 사용하면 컨텍스트의 라이프사이클 전체를 더 잘 이해하는데에 도움이 될 것입니다.

>
The `AbstractApplicationContext` (and its subclasses) is instrumented with an `ApplicationStartup`, which collects `StartupStep` data about various startup phases:
>
- application context lifecycle (base packages scanning, config classes management)
- beans lifecycle (instantiation, smart initialization, post processing)
- application events processing

`AbstractApplicationContext`(그리고 그 서브클래스들)의 측정은 다양한 시작 단계에 대한 `StartupStep` 데이터를 수집하는 `ApplicationStartup`을 사용하게 됩니다.
다양한 시작 단계는 다음과 같습니다.

- 애플리케이션 컨텍스트 라이프사이클(base 패키지 스캐닝, config 클래스 관리)
- bean 라이프사이클(인스턴스화, 스마트 초기화, post processing)
- 애플리케이션 이벤트 프로세싱

>
Here is an example of instrumentation in the `AnnotationConfigApplicationContext`:

다음은 `AnnotationConfigApplicationContext`에 대한 측정 예제입니다.

```java
// create a startup step and start recording
StartupStep scanPackages = this.getApplicationStartup().start("spring.context.base-packages.scan");
// add tagging information to the current step
scanPackages.tag("packages", () -> Arrays.toString(basePackages));
// perform the actual phase we're instrumenting
this.scanner.scan(basePackages);
// end the current step
scanPackages.end();
```

>
The application context is already instrumented with multiple steps.
Once recorded, these startup steps can be collected, displayed and analyzed with specific tools.
For a complete list of existing startup steps, you can check out the [dedicated appendix section]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#application-startup-steps ).

애플리케이션 컨텍스트는 이미 여러 단계에 걸쳐 측정됩니다.
일단 기록이 되면, 특정한 도구를 사용해 이런 시작 단계들에 대해 정보를 수집하고, 표시하고, 분석할 수 있습니다.
시작 단계의 전체 목록은 [dedicated appendix section]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#application-startup-steps )에서 확인할 수 있습니다.

>
The default `ApplicationStartup` implementation is a no-op variant, for minimal overhead.
This means no metrics will be collected during application startup by default.
Spring Framework ships with an implementation for tracking startup steps with Java Flight Recorder: `FlightRecorderApplicationStartup`.
To use this variant, you must configure an instance of it to the `ApplicationContext` as soon as it’s been created.

`ApplicationStartup`의 기본 구현은 오버헤드를 최소화하기 위한 최소 구현이라 할 수 있습니다.
즉, 기본 구현으로는 애플리케이션 시작 단계에서 메트릭이 수집되지 않는다는 의미입니다.
Spring 프레임워크는 시작 단계를 추적하기 위한 구현으로 Java Flight Recorder `FlightRecorderApplicationStartup`를 제공합니다.
이 구현체를 사용하려면 생성되는 즉시 해당 인스턴스를 `ApplicationContext`에 configure해야 합니다.

>
Developers can also use the `ApplicationStartup` infrastructure if they’re providing their own `AbstractApplicationContext` subclass, or if they wish to collect more precise data.

만약 직접 구현한 `AbstractApplicationContext`의 서브클래스를 사용하거나, 더 정확한 데이터를 수집하려 한다면 `ApplicationStartup` 인프라를 사용할 수도 있습니다.

> (!)
`ApplicationStartup` is meant to be only used during application startup and for the core container;
this is by no means a replacement for Java profilers or metrics libraries like [Micrometer]( https://micrometer.io/ ).
{:style="background-color: #fff9e4;"}

- (!)
    - `ApplicationStartup`은 애플리케이션이 시작할 때, 그리고 core 컨테이너에만 사용됩니다.
    - `ApplicationStartup`만으로는 Java 프로파일러나 Micrometer 같은 메트릭 라이브러리를 대체할 수 없습니다.

>
To start collecting custom `StartupStep`, components can either get the `ApplicationStartup` instance from the application context directly, make their component implement `ApplicationStartupAware`, or ask for the `ApplicationStartup` type on any injection point.

커스텀 `StartupStep`을 수집하려면 컴포넌트가 애플리케이션 컨텍스트에서 직접 `ApplicationStartup` 인스턴스를 가져오거나, 컴포넌트가 `ApplicationStartupAware`를 구현하게 하거나, 주입 지점에서 `ApplicationStartup` 타입을 요청하는 방법이 있습니다.

> (i)
Developers should not use the `"spring.*"` namespace when creating custom startup steps. This namespace is reserved for internal Spring usage and is subject to change.
{:style="background-color: #ecf1e8;"}

- (i)
    - 개발자는 커스텀 시작 단계를 생성할 때 `"spring.*"` 네임스페이스를 사용하면 안됩니다.
    - 이 네임스페이스는 Spring 전용으로 예약되어 있습니다.


### 1.15.5. Convenient ApplicationContext Instantiation for Web Applications

[원문]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#context-create )

>
You can create `ApplicationContext` instances declaratively by using, for example, a `ContextLoader`.
Of course, you can also create `ApplicationContext` instances programmatically by using one of the `ApplicationContext` implementations.

`ApplicationContext` 인스턴스를 선언적으로 만들 수도 있습니다(예를 들어 `ContextLoader`를 사용한다던가).
물론 프로그래밍 방식으로 `ApplicationContext` 구현체 중 하나를 사용해 `ApplicationContext` 인스턴스를 만드는 것도 가능합니다.

>
You can register an `ApplicationContext` by using the `ContextLoaderListener`, as the following example shows:

다음 예제와 같이 `ContextLoaderListener`를 사용해서 `ApplicationContext`를 등록할 수도 있습니다.

```xml
<context-param>
    <param-name>contextConfigLocation</param-name>
    <param-value>/WEB-INF/daoContext.xml /WEB-INF/applicationContext.xml</param-value>
</context-param>

<listener>
    <listener-class>org.springframework.web.context.ContextLoaderListener</listener-class>
</listener>
```

>
The listener inspects the `contextConfigLocation` parameter.
If the parameter does not exist, the listener uses `/WEB-INF/applicationContext.xml` as a default.
When the parameter does exist, the listener separates the `String` by using predefined delimiters (comma, semicolon, and whitespace) and uses the values as locations where application contexts are searched.
Ant-style path patterns are supported as well.
Examples are `/WEB-INF/*Context.xml` (for all files with names that end with Context.xml and that reside in the `WEB-INF` directory) and `/WEB-INF/**/*Context.xml` (for all such files in any subdirectory of `WEB-INF`).

리스너는 `contextConfigLocation` 파라미터를 검사해서, 만약 파라미터가 존재하지 않는다면 리스너는 `/WEB-INF/applicationContext.xml`를 기본값으로 사용합니다.
만약 파라미터가 존재한다면 리스너는 사전에 정의된 구분자(콤마, 세미콜론, 공백)를 사용해 문자열을 구분하고, 그 값들을 애플리케이션 컨텍스트를 검색하는 위치로 사용합니다.
Ant 스타일의 경로 패턴도 지원합니다.
예를 들어 `/WEB-INF/*Context.xml`는 `/WEB/INF` 디렉토리에 있는 `Context.xml`로 끝나는 모든 파일입니다. 그리고 `/WEB-INF/**/*Context.xml`는 `WEB-INF`의 모든 서브 디렉토리에서 `Context.xml`로 끝나는 모든 파일입니다.

### 1.15.6. Deploying a Spring `ApplicationContext` as a Java EE RAR File

[원문]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#context-deploy-rar )

**요즘 RAR 압축 포맷을 누가 사용한단 말인가...?!**

## 함께 읽기

- 목록으로 - [[/spring/document/core]]
- 이전 문서 - [[/spring/document/core/01-14-reg-loadtimeweaver]]
- 다음 문서 - [[/spring/document/core/01-16-bean-factory]]

