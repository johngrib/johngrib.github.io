---
layout  : wiki
title   : Spring Core Technologies - 1.15. Additional Capabilities of the ApplicationContext
summary : 
date    : 2021-07-24 21:59:18 +0900
updated : 2021-07-25 11:57:52 +0900
tag     : java spring
toc     : true
public  : true
parent  : [[/spring/document/core]]
latex   : false
---
* TOC
{:toc}

- 목록으로 - [[/spring/document/core]]
- 이전 문서 - [[/spring/document/core/01-14-reg-loadtimeweaver]]
- 다음 문서 - 1.16. The BeanFactory

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

## 함께 읽기

- 목록으로 - [[/spring/document/core]]
- 이전 문서 - [[/spring/document/core/01-14-reg-loadtimeweaver]]
- 다음 문서 - 1.16. The BeanFactory

