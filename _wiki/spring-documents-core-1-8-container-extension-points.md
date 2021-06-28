---
layout  : wiki
title   : Spring Core Technologies - 1.8. Container Extension Points
summary : 
date    : 2021-06-27 14:47:34 +0900
updated : 2021-06-28 23:55:16 +0900
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
- 다음 문서 - {1.9. Annotation-based Container Configuration}

## 1.8. Container Extension Points

[원문]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-factory-extension )

>
Typically, an application developer does not need to subclass `ApplicationContext` implementation classes. Instead, the Spring IoC container can be extended by plugging in implementations of special integration interfaces. The next few sections describe these integration interfaces.

일반적으로 애플리케이션을 개발할 때에는 `ApplicationContext` 구현체를 상속해서 사용할 일이 없습니다.

대신 특수한 통합 인터페이스 구현체를 연결해서(plugging) Spring IoC 컨테이너를 확장할 수 있습니다.

다음 섹션에서는 이러한 통합 인터페이스에 대해 설명합니다.

### 1.8.1. Customizing Beans by Using a BeanPostProcessor

[원문]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-factory-extension-bpp )

>
The `BeanPostProcessor` interface defines callback methods that you can implement to provide your own (or override the container’s default) instantiation logic, dependency resolution logic, and so forth. If you want to implement some custom logic after the Spring container finishes instantiating, configuring, and initializing a bean, you can plug in one or more custom `BeanPostProcessor` implementations.

`BeanPostProcessor` 인터페이스는 여러분만의 인스턴스화 로직, 의존관계 해결 로직 등등을 제공하기 위한 콜백 메소드를 정의합니다.

만약 여러분이 Spring 컨테이너가 bean의 인스턴스화/설정/초기화를 마친 다음의 커스텀 로직을 구현하고 싶다면, `BeanPostProcessor` 구현체를 연결(plug)할 수 있습니다.

>
You can configure multiple `BeanPostProcessor` instances, and you can control the order in which these `BeanPostProcessor` instances run by setting the `order` property. You can set this property only if the `BeanPostProcessor` implements the `Ordered` interface. If you write your own `BeanPostProcessor`, you should consider implementing the Ordered interface, too. For further details, see the javadoc of the [BeanPostProcessor]( https://docs.spring.io/spring-framework/docs/5.3.7/javadoc-api/org/springframework/beans/factory/config/BeanPostProcessor.html ) and [Ordered]( https://docs.spring.io/spring-framework/docs/5.3.7/javadoc-api/org/springframework/core/Ordered.html ) interfaces. See also the note on [programmatic registration of BeanPostProcessor instances]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-factory-programmatically-registering-beanpostprocessors ).

여러분은 여러 개의 `BeanPostProcessor` 인스턴스를 설정할 수 있습니다.
- 그리고 `order` property의 값을 설정해서 `BeanPostProcessor` 인스턴스가 실행되는 순서를 컨트롤하는 것도 가능합니다.
    - 이 설정은 `BeanPostProcessor`가 `Ordered` 인터페이스를 구현하는 경우에만 할 수 있습니다.
    - 여러분만의 `BeanPostProcessor`를 만들려 한다면 `Ordered` 인터페이스를 구현하는 것도 고려해 보세요.
    - 자세한 내용은 [BeanPostProcessor]( https://docs.spring.io/spring-framework/docs/5.3.7/javadoc-api/org/springframework/beans/factory/config/BeanPostProcessor.html )와 [Ordered]( https://docs.spring.io/spring-framework/docs/5.3.7/javadoc-api/org/springframework/core/Ordered.html ) 인터페이스의 javadoc을 참고하세요.

> (i)
`BeanPostProcessor` instances operate on bean (or object) instances. That is, the Spring IoC container instantiates a bean instance and then `BeanPostProcessor` instances do their work.
>
`BeanPostProcessor` instances are scoped per-container. This is relevant only if you use container hierarchies. If you define a `BeanPostProcessor` in one container, it post-processes only the beans in that container. In other words, beans that are defined in one container are not post-processed by a `BeanPostProcessor` defined in another container, even if both containers are part of the same hierarchy.
>
To change the actual bean definition (that is, the blueprint that defines the bean), you instead need to use a `BeanFactoryPostProcessor`, as described in [Customizing Configuration Metadata with a BeanFactoryPostProcessor]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-factory-extension-factory-postprocessors ).
{:style="background-color: #ecf1e8;"}

- (i) 참고
    - `BeanPostProcessor` 인스턴스는 bean 인스턴스에서 작동합니다.
        - 즉, Spring IoC 컨테이너가 bean 인스턴스를 인스턴스화한 다음에 `BeanPostProcessor` 인스턴스가 작동하게 됩니다.
    - `BeanPostProcessor` 인스턴스는 컨테이너 하나에 스코프가 지정됩니다.
        - 이는 컨테이너 계층구조를 사용하는 경우에만 해당됩니다.
        - 만약 `BeanPostProcessor`를 하나의 컨테이너 내에 정의했다면, 해당 컨테이너의 bean들만 `BeanPostProcessor`로 사후 처리를 하게 됩니다.
        - 즉, 하나의 컨테이너에 정의된 bean은 두 컨테이너가 같은 계층구조에 있다 하더라도 다른 컨테이너에 정의된 `BeanPostProcessor`로 후처리되지 않습니다.
    - 실제 bean 정의(bean을 정의하는 설계도)를 변경하려면, `BeanPostProcessor` 대신 `BeanFactoryPostProcessor`를 사용해야 합니다.
        - 자세한 내용은 [Customizing Configuration Metadata with a BeanFactoryPostProcessor]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-factory-extension-factory-postprocessors ) 문서를 참고하세요.

>
The `org.springframework.beans.factory.config.BeanPostProcessor` interface consists of exactly two callback methods. When such a class is registered as a post-processor with the container, for each bean instance that is created by the container, the post-processor gets a callback from the container both before container initialization methods (such as `InitializingBean.afterPropertiesSet()` or any declared `init` method) are called, and after any bean initialization callbacks. The post-processor can take any action with the bean instance, including ignoring the callback completely. A bean post-processor typically checks for callback interfaces, or it may wrap a bean with a proxy. Some Spring AOP infrastructure classes are implemented as bean post-processors in order to provide proxy-wrapping logic.
>
An `ApplicationContext` automatically detects any beans that are defined in the configuration metadata that implements the `BeanPostProcessor` interface. The `ApplicationContext` registers these beans as post-processors so that they can be called later, upon bean creation. Bean post-processors can be deployed in the container in the same fashion as any other beans.
>
Note that, when declaring a `BeanPostProcessor` by using an `@Bean` factory method on a configuration class, the return type of the factory method should be the implementation class itself or at least the `org.springframework.beans.factory.config.BeanPostProcessor` interface, clearly indicating the post-processor nature of that bean. Otherwise, the `ApplicationContext` cannot autodetect it by type before fully creating it. Since a `BeanPostProcessor` needs to be instantiated early in order to apply to the initialization of other beans in the context, this early type detection is critical.

`org.springframework.beans.factory.config.BeanPostProcessor` 인터페이스는 딱 두 개의 콜백 메소드를 갖고 있습니다.
이를 구현한 클래스가 컨테이너에 post-processor로 등록되면, 컨테이너가 생성한 각 bean 인스턴스에 대해 컨테이너 초기화 메소드(예: `InitializingBean.afterPropertiesSet()` 이나 `init` 메소드)가 호출되고 bean 초기화 콜백이 호출된 이후에 post-processor가 호출됩니다.
post-processor는 콜백을 bean 인스턴스로 모든 작업을 수행할 수 있습니다. 심지어 콜백을 완전히 무시하는 것도 포함해서요.
일반적으로 bean post-processor는 콜백 인터페이스를 체크하거나 bean을 프록시로 래핑할 수 있습니다.
몇몇 Spring AOP 인프라 클래스들은 프록시 래핑 로직을 제공하기 위해서 bean post-processor로 구현되기도 합니다.

`ApplicationContext`는 `BeanPostProcessor` 인터페이스 구현체로 configuration 메타데이터에 정의된 모든 bean을 자동으로 감지합니다.
`ApplicationContext`는 이런 bean을 나중에 bean을 생성할 때 호출할 수 있도록 post-processor로 등록해둡니다.
bean post-processor는 다른 bean과 똑같은 방식으로 컨테이너에 배포할 수 있습니다.

configuration 클래스에서 `@Bean` 팩토리 메소드를 사용해 `BeanPostProcessor`를 선언할 때, 팩토리 메소드의 리턴 타입은 `org.springframework.beans.factory.config.BeanPostProcessor` 인터페이스 또는 그 구현체여야 합니다.
이는 해당 bean에 대해 post-processor로서의 특성을 명확히 선언하는 것입니다.
이렇게 설정하지 않으면 `ApplicationContext`가 객체를 완전히 생성하기 전에는 자동으로 감지할 수가 없습니다.
`BeanPostProcessor`는 컨텍스트에서 다른 bean의 초기화에 적용하기 위해 초기에 빨리 인스턴스화되어야 하므로 이런 타입 감지는 중요합니다.

>
(i) **Programmatically registering `BeanPostProcessor` instances**
>
While the recommended approach for `BeanPostProcessor` registration is through `ApplicationContext` auto-detection (as described earlier), you can register them programmatically against a `ConfigurableBeanFactory` by using the `addBeanPostProcessor` method. This can be useful when you need to evaluate conditional logic before registration or even for copying bean post processors across contexts in a hierarchy. Note, however, that `BeanPostProcessor` instances added programmatically do not respect the `Ordered` interface. Here, it is the order of registration that dictates the order of execution. Note also that `BeanPostProcessor` instances registered programmatically are always processed before those registered through auto-detection, regardless of any explicit ordering.
{:style="background-color: #ecf1e8;"}

- (i) 참고: 프로그래밍 방식으로 `BeanPostProcessor` 인스턴스를 등록하기
    - 권장하는 `BeanPostProcessor` 등록 방법은 `ApplicationContext`의 자동 감지(위에서 설명한 내용)를 통하는 것이지만...
        - `ConfigurableBeanFactory`의 `addBeanPostProcessor` 메소드를 사용하면 프로그래밍 방식을 써서 등록할 수 있습니다.
        - 이 방법은 등록하는 작업에 로직이 필요하거나 계층 구조를 이루는 컨텍스트 간에 bean post-processor를 복사할 때 유용하게 쓸 수 있습니다.
    - 그러나, 프로그래밍 방식으로 추가된 `BeanPostProcessor`는 `Ordered` 인터페이스 방식을 따르지 않습니다.
        - 프로그래밍 방식으로 등록된 `BeanPostProcessor` 인스턴스는 자동 감지를 통해 등록된 인스턴스보다 무조건 먼저 처리됩니다.

>
(i) **`BeanPostProcessor` instances and AOP auto-proxying**
>
Classes that implement the `BeanPostProcessor` interface are special and are treated differently by the container. All `BeanPostProcessor` instances and beans that they directly reference are instantiated on startup, as part of the special startup phase of the `ApplicationContext`. Next, all `BeanPostProcessor` instances are registered in a sorted fashion and applied to all further beans in the container. Because AOP auto-proxying is implemented as a `BeanPostProcessor` itself, neither `BeanPostProcessor` instances nor the beans they directly reference are eligible for auto-proxying and, thus, do not have aspects woven into them.
>
For any such bean, you should see an informational log message: `Bean someBean is not eligible for getting processed by all BeanPostProcessor interfaces (for example: not eligible for auto-proxying)`.
>
If you have beans wired into your `BeanPostProcessor` by using autowiring or `@Resource` (which may fall back to autowiring), Spring might access unexpected beans when searching for type-matching dependency candidates and, therefore, make them ineligible for auto-proxying or other kinds of bean post-processing. For example, if you have a dependency annotated with `@Resource` where the field or setter name does not directly correspond to the declared name of a bean and no name attribute is used, Spring accesses other beans for matching them by type.
{:style="background-color: #ecf1e8;"}

- (i) 참고: `BeanPostProcessor` 인스턴스와 AOP auto-proxying
    - `BeanPostProcessor` 인터페이스를 구현하는 클래스는 특별하게 취급되어, 컨테이너가 좀 다르게 처리합니다.
        - `ApplicationContext`의 특수한 시작 단계의 부분 작업으로, 직접적으로 참조하는 모든 `BeanPostProcessor` 인스턴스와 bean들은 시작시에 인스턴스화됩니다.
        - 그리고 그 다음에는 모든 `BeanPostProcessor` 인스턴스가 정렬 순서대로 등록되고, 컨테이너의 모든 bean에 적용됩니다.
        - AOP auto-proxying은 `BeanPostProcessor` 자체로 구현되기 때문에,
            - `BeanPostProcessor` 인스턴스나 해당 인스턴스에서 직접 참조하는 bean은 모두 auto-proxying에 적합하지 않습니다.
            - 따라서 aspect를 적용할 수 없습니다.
    - 그러한 bean의 경우 정보성 로그 메시지를 보게 됩니다.
        - `Bean someBean is not eligible for getting processed by all BeanPostProcessor interfaces (for example: not eligible for auto-proxying).`
        - "주어진 bean은 어떠한 `BeanPostProcessor` 인터페이스로도 처리할 수 없습니다(예: auto-proxying을 적용할 수 없음)."
    - 만약 autowiring 이나 `@Resource`를 사용해 `BeanPostProcessor`에 bean을 연결했다면, Spring은 type-matching dependency 후보를 검색할 때 예상하지 못한 bean에 엑세스할 수 있습니다.
        - 그러므로 해당 bean 들은 auto-proxying이나 그 외의 다른 post-processing에 적합하지 않게 됩니다.
        - 예를 들어, `@Resource` 애노테이션이 붙은 의존관계인데 필드나 setter의 이름이 선언된 bean과 이름이 맞지 않는 경우에는 Spring은 타입을 맞추기 위해 다른 bean에 엑세스합니다.

>
The following examples show how to write, register, and use `BeanPostProcessor` instances in an `ApplicationContext`.

다음 예제는 `ApplicationContext`에서 `BeanPostProcessor` 인스턴스를 작성하고, 등록하고, 사용하는 방법을 보여줍니다.

#### Example: Hello World, BeanPostProcessor-style

[원문]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-factory-extension-bpp-examples-hw )

>
This first example illustrates basic usage. The example shows a custom `BeanPostProcessor` implementation that invokes the `toString()` method of each bean as it is created by the container and prints the resulting string to the system console.
>
The following listing shows the custom `BeanPostProcessor` implementation class definition:

이 첫번째 예제는 기본적인 사용법을 보여줍니다.
이 예제는 커스텀 `BeanPostProcessor` 구현을 보여주는데, 이 구현체는 컨테이너가 생성한 각 bean의 `toString()` 메소드를 호출하고 결과 문제열을 시스템 콘솔에 출력합니다.

```java
package scripting;

import org.springframework.beans.factory.config.BeanPostProcessor;

public class InstantiationTracingBeanPostProcessor implements BeanPostProcessor {

    // simply return the instantiated bean as-is
    public Object postProcessBeforeInitialization(Object bean, String beanName) {
        return bean; // we could potentially return any object reference here...
    }

    public Object postProcessAfterInitialization(Object bean, String beanName) {
        System.out.println("Bean '" + beanName + "' created : " + bean.toString());
        return bean;
    }
}
```

>
The following `beans` element uses the `InstantiationTracingBeanPostProcessor`:

다음의 `beans` 엘리먼트는 `InstantiationTracingBeanPostProcessor`를 사용합니다.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xmlns:lang="http://www.springframework.org/schema/lang"
    xsi:schemaLocation="http://www.springframework.org/schema/beans
        https://www.springframework.org/schema/beans/spring-beans.xsd
        http://www.springframework.org/schema/lang
        https://www.springframework.org/schema/lang/spring-lang.xsd">

    <lang:groovy id="messenger"
            script-source="classpath:org/springframework/scripting/groovy/Messenger.groovy">
        <lang:property name="message" value="Fiona Apple Is Just So Dreamy."/>
    </lang:groovy>

    <!--
    when the above bean (messenger) is instantiated, this custom
    BeanPostProcessor implementation will output the fact to the system console
    -->
    <bean class="scripting.InstantiationTracingBeanPostProcessor"/>

</beans>
```

>
Notice how the `InstantiationTracingBeanPostProcessor` is merely defined. It does not even have a name, and, because it is a bean, it can be dependency-injected as you would any other bean. (The preceding configuration also defines a bean that is backed by a Groovy script. The Spring dynamic language support is detailed in the chapter entitled [Dynamic Language Support]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/languages.html#dynamic-language ).)
>
The following Java application runs the preceding code and configuration:

`InstantiationTracingBeanPostProcessor`가 어떻게 정의되었는지 주목하세요.
이름은 없는데, bean이기 때문에 다른 bean과 마찬가지로 의존관계 주입은 됩니다.

다음 Java 애플리케이션은 위의 코드와 설정을 실행합니다.

```java
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.scripting.Messenger;

public final class Boot {

    public static void main(final String[] args) throws Exception {
        ApplicationContext ctx = new ClassPathXmlApplicationContext("scripting/beans.xml");
        Messenger messenger = ctx.getBean("messenger", Messenger.class);
        System.out.println(messenger);
    }

}
```

>
The output of the preceding application resembles the following:

위 애플리케이션의 출력은 다음과 같습니다.

```
Bean 'messenger' created : org.springframework.scripting.groovy.GroovyMessenger@272961
org.springframework.scripting.groovy.GroovyMessenger@272961
```

#### Example: The AutowiredAnnotationBeanPostProcessor

[원문]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-factory-extension-bpp-examples-aabpp )

>
Using callback interfaces or annotations in conjunction with a custom `BeanPostProcessor` implementation is a common means of extending the Spring IoC container. An example is Spring’s `AutowiredAnnotationBeanPostProcessor` — a `BeanPostProcessor` implementation that ships with the Spring distribution and autowires annotated fields, setter methods, and arbitrary config methods.

커스텀 `BeanPostProcessor` 구현과 함께 콜백 인터페이스나 애노테이션을 사용하는 것은 Spring IoC 컨테이너를 확장하는 일반적인 방법입니다.

예를 들어 Spring의 `AutowiredAnnotationBeanPostProcessor`가 있습니다. 이것은 애노테이션이 달린 필드, setter 메소드, 임의의 config 메소드를 자동으로 연결하는 `BeanPostProcessor` 구현체입니다.

### 1.8.2. Customizing Configuration Metadata with a BeanFactoryPostProcessor

[원문]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-factory-extension-factory-postprocessors )

## 함께 읽기

- 목록으로 - [[spring-documents-core]]{Spring Core Technologies}
- 이전 문서 - [[spring-documents-core-1-5-bean-scopes]]{1.5. Bean Scopes}
- 다음 문서 - {1.9. Annotation-based Container Configuration}

