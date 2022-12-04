---
layout  : wiki
title   : Spring Core Technologies - 1.8. Container Extension Points
summary : 
date    : 2021-06-27 14:47:34 +0900
updated : 2021-07-10 20:39:07 +0900
tag     : java spring
resource: 78/D31A2C-ACD2-4749-B2CE-9EAC06EBADF5
toc     : true
public  : true
parent  : [[/spring/document/core]]
latex   : false
---
* TOC
{:toc}

- 목록으로 - [[/spring/document/core]]{Spring Core Technologies}
- 이전 문서 - [[/spring/document/core/01-07-bean-definition-inheritance]]{1.7. Bean Definition Inheritance}
- 다음 문서 - [[/spring/document/core/01-09-annotation-based-container-config]]{1.9. Annotation-based Container Configuration}

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

>
The next extension point that we look at is the `org.springframework.beans.factory.config.BeanFactoryPostProcessor`. The semantics of this interface are similar to those of the `BeanPostProcessor`, with one major difference: `BeanFactoryPostProcessor` operates on the bean configuration metadata. That is, the Spring IoC container lets a `BeanFactoryPostProcessor` read the configuration metadata and potentially change it before the container instantiates any beans other than `BeanFactoryPostProcessor` instances.
>
You can configure multiple `BeanFactoryPostProcessor` instances, and you can control the order in which these `BeanFactoryPostProcessor` instances run by setting the `order` property. However, you can only set this property if the `BeanFactoryPostProcessor` implements the `Ordered` interface. If you write your own `BeanFactoryPostProcessor`, you should consider implementing the `Ordered` interface, too. See the javadoc of the [BeanFactoryPostProcessor]( https://docs.spring.io/spring-framework/docs/5.3.7/javadoc-api/org/springframework/beans/factory/config/BeanFactoryPostProcessor.html ) and [Ordered]( https://docs.spring.io/spring-framework/docs/5.3.7/javadoc-api/org/springframework/core/Ordered.html ) interfaces for more details.

우리가 살펴볼 다음의 확장 포인트는 `org.springframework.beans.factory.config.BeanFactoryPostProcessor`입니다.

이 인터페이스의 의미는 `BeanPostProcessor`와 비슷하지만 중요한 차이점이 하나 있습니다.
- `BeanFactoryPostProcessor`는 bean configuration 메타데이터에서 작동합니다.
- 즉, Spring IoC 컨테이너는 `BeanFactoryPostProcessor`가 configuration 메타데이터를 읽게 하고, 컨테이너가 `BeanFactoryPostProcessor` 인스턴스가 아닌 다른 bean을 인스턴스화하기 전에 잠재적으로 변경할 수 있도록 해줍니다.

여러분은 여러 개의 `BeanFactoryPostProcessor` 인스턴스를 configure할 수 있으며, `order` property를 setting해서 `BeanFactoryPostProcessor` 인스턴스가 실행되는 순서도 컨트롤할 수 있습니다.

그러나 `order` property는 `BeanFactoryPostProcessor`가 `Ordered` 인터페이스를 구현하는 경우에만 설정할 수 있습니다.
만약 여러분이 자신만의 `BeanFactoryPostProcessor`를 작성하는 경우라면, `Ordered` 인터페이스 구현을 꼭 고려해야 합니다.

이에 대한 자세한 내용은 [BeanFactoryPostProcessor]( https://docs.spring.io/spring-framework/docs/5.3.7/javadoc-api/org/springframework/beans/factory/config/BeanFactoryPostProcessor.html ) 과 [Ordered]( https://docs.spring.io/spring-framework/docs/5.3.7/javadoc-api/org/springframework/core/Ordered.html )의 javadoc을 참고하세요.

> (i)
If you want to change the actual bean instances (that is, the objects that are created from the configuration metadata), then you instead need to use a `BeanPostProcessor` (described earlier in [Customizing Beans by Using a BeanPostProcessor]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-factory-extension-bpp )). While it is technically possible to work with bean instances within a `BeanFactoryPostProcessor` (for example, by using `BeanFactory.getBean()`), doing so causes premature bean instantiation, violating the standard container lifecycle. This may cause negative side effects, such as bypassing bean post processing.
>
Also, `BeanFactoryPostProcessor` instances are scoped per-container. This is only relevant if you use container hierarchies. If you define a `BeanFactoryPostProcessor` in one container, it is applied only to the bean definitions in that container. Bean definitions in one container are not post-processed by `BeanFactoryPostProcessor` instances in another container, even if both containers are part of the same hierarchy.
{:style="background-color: #ecf1e8;"}

- (i) 참고
    - 실제 bean 인스턴스(configuration metadata를 통해 생성된 객체)를 변경하려면, 대신 `BeanPostProcessor`를 사용해야 합니다. (`BeanPostProcessor`에 대해서는 위에서 설명한 바 있음)
        - 기술적으로는 `BeanFactoryPostProcessor` 내에서 bean 인스턴스로 작업하는 것이 가능하긴 하지만(예: `BeanFactory.getBean()`을 사용한다던가),
            - 이렇게 하면 조기 bean 인스턴스화가 발생하여 표준 컨테이너 생명주기 사이클을 위반하게 됩니다.
            - 이로 인해 bean post processing을 우회하게 되는 나쁜 부작용이 발생할 수 있습니다.
    - 또한, `BeanFactoryPostProcessor` 인스턴스는 컨테이너별로 스코프가 지정됩니다.
        - 따라서 컨테이너 계층을 사용하는 경우에만 해당이 됩니다.
        - 만약 하나의 컨테이너에 `BeanFactoryPostProcessor`를 정의하면 하나의 컨테이너에서 취급하는 bean 정의에만 적용됩니다.
            - 하나의 컨테이너의 bean definition들은 두 컨테이너가 같은 계층에 있는 경우에도 다른 컨테이너의 `BeanFactoryPostProcessor` 인스턴스에 의해 post processing되지 않습니다.

>
A bean factory post-processor is automatically run when it is declared inside an `ApplicationContext`, in order to apply changes to the configuration metadata that define the container. Spring includes a number of predefined bean factory post-processors, such as `PropertyOverrideConfigurer` and `PropertySourcesPlaceholderConfigurer`. You can also use a custom `BeanFactoryPostProcessor` — for example, to register custom property editors.
>
An `ApplicationContext` automatically detects any beans that are deployed into it that implement the `BeanFactoryPostProcessor` interface. It uses these beans as bean factory post-processors, at the appropriate time. You can deploy these post-processor beans as you would any other bean.

bean factory post-processor는 `ApplicationContext` 내에 선언될 때 자동으로 실행됩니다. 이는 컨테이너를 정의하는 configuration metadata에 변경 사항을 적용하기 위해서입니다.
Spring은 `PropertyOverrideConfigurer`와 `PropertySourcesPlaceholderConfigurer`와 같은 미리 정의된 여러 개의 bean factory post-processor들을 포함하고 있습니다.
예를 들어, 커스텀 속성 편집기를 등록하기 위해 커스텀 `BeanFactoryPostProcessor`를 사용할 수도 있습니다.

`ApplicationContext`는 `BeanFactoryPostProcessor` 인터페이스 구현체를 자동으로 감지합니다.
`ApplicationContext`는 적당한 시기에 이런 bean을 bean factory post-processor로 사용합니다.
여러분은 이러한 post-processor를 다른 bean과 똑같은 방법으로 배포할 수 있습니다.

> (i)
As with `BeanPostProcessor`s, you typically do not want to configure `BeanFactoryPostProcessors` for lazy initialization. If no other bean references a `Bean(Factory)PostProcessor`, that post-processor will not get instantiated at all. Thus, marking it for lazy initialization will be ignored, and the `Bean(Factory)PostProcessor` will be instantiated eagerly even if you set the `default-lazy-init` attribute to `true` on the declaration of your `<beans />` element.
{:style="background-color: #ecf1e8;"}

- (i) 참고
    - `BeanPostProcessor`와 마찬가지로, 여러분은 `BeanFactoryPostProcessor`를 lazy하게 초기화되도록 설정하고 싶지 않을 것입니다.
    - 다른 bean이 `Bean(Factory)PostProcessor`를 참조하지 않으면 해당 post-processor는 인스턴스화되지 않습니다.
    - 그러므로 lazy 초기화하겠다고 표시하는 것은 무시되며, `Bean(Factory)PostProcessor`는 `<beans />` element 선언에서 `default-lazy-init` attribute를 `true`로 설정하더라도 즉각(eagerly) 인스턴스화됩니다.

#### Example: The Class Name Substitution PropertySourcesPlaceholderConfigurer

[원문]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-factory-placeholderconfigurer )

>
You can use the `PropertySourcesPlaceholderConfigurer` to externalize property values from a bean definition in a separate file by using the standard Java `Properties` format. Doing so enables the person deploying an application to customize environment-specific properties, such as database URLs and passwords, without the complexity or risk of modifying the main XML definition file or files for the container.
>
Consider the following XML-based configuration metadata fragment, where a `DataSource` with placeholder values is defined:

`PropertySourcesPlaceholderConfigurer`를 사용해서 스탠다드 Java `Properties` 포맷을 사용해 별도의 파일에 있는 bean definition 특성 값을 구체화할 수 있습니다.
이렇게하면 애플리케이션을 배포하는 사람이 XML 정의 파일이나 컨테이너에 소속된 파일을 굳이 고쳐야 하는 위험 없이 환경별 속성(데이터베이스 URL/패스워드 등)을 커스터마이즈할 수 있습니다.

placeholder가 있는 다음의 XML 기반 configuration metadata 파일의 일부를 봅시다.

```xml
<bean class="org.springframework.context.support.PropertySourcesPlaceholderConfigurer">
    <property name="locations" value="classpath:com/something/jdbc.properties"/>
</bean>

<bean id="dataSource" destroy-method="close"
        class="org.apache.commons.dbcp.BasicDataSource">
    <property name="driverClassName" value="${jdbc.driverClassName}"/>
    <property name="url" value="${jdbc.url}"/>
    <property name="username" value="${jdbc.username}"/>
    <property name="password" value="${jdbc.password}"/>
</bean>
```

>
The example shows properties configured from an external `Properties` file. At runtime, a `PropertySourcesPlaceholderConfigurer` is applied to the metadata that replaces some properties of the DataSource. The values to replace are specified as placeholders of the form `${property-name}`, which follows the Ant and log4j and JSP EL style.
>
The actual values come from another file in the standard Java `Properties` format:

위의 예제는 외부의 `Properties` 파일 프로퍼티를 설정하는 방법을 보여줍니다.
`PropertySourcesPlaceholderConfigurer`는 런타임에 데이터소스의 속성들을 가져와서 메타데이터에 적용합니다.
가져와서 집어넣을 값들은 `${property-name}`과 같은 포맷의 placeholder로 명시됩니다. 이 포맷은 Ant, log4j, JSP EL 스타일을 따르는 것입니다.

실제 값들은 스탠다드 Java `Properties` 포맷의 다른 파일에서 가져오게 됩니다.

```
jdbc.driverClassName=org.hsqldb.jdbcDriver
jdbc.url=jdbc:hsqldb:hsql://production:9002
jdbc.username=sa
jdbc.password=root
```

>
Therefore, the `${jdbc.username}` string is replaced at runtime with the value, 'sa', and the same applies for other placeholder values that match keys in the properties file. The `PropertySourcesPlaceholderConfigurer` checks for placeholders in most properties and attributes of a bean definition. Furthermore, you can customize the placeholder prefix and suffix.
>
With the `context` namespace introduced in Spring 2.5, you can configure property placeholders with a dedicated configuration element. You can provide one or more locations as a comma-separated list in the `location` attribute, as the following example shows:

그러므로, `${jdbc.username}` 문자열은 런타임에 `sa`로 대체되며, properties 파일에 들어있는 키와 일치하는 다른 placeholder 값들에도 똑같은 방식이 적용됩니다.

`PropertySourcesPlaceholderConfigurer`는 bean definition의 attribute나 properties에서 placeholder를 체크합니다.
게다가, placeholder의 prefix와 suffix를 커스터마이즈하는 것도 가능합니다.

Spring 2.5부터 도입된 `context` namespace를 사용하면, 전용 configuration element로 property placeholder를 설정할 수 있습니다.
다음 예제와 같이 `location` attribute에서 콤마로 구분된 리스트 형식으로 하나 이상의 위치를 제공할 수 있습니다.


```xml
<context:property-placeholder location="classpath:com/something/jdbc.properties"/>
```

>
The `PropertySourcesPlaceholderConfigurer` not only looks for properties in the `Properties` file you specify. By default, if it cannot find a property in the specified properties files, it checks against Spring `Environment` properties and regular Java `System` properties.

`PropertySourcesPlaceholderConfigurer`는 명시한 `Properties` 파일에서 속성을 탐색하기만 하지 않습니다.
만약 지정한 파일에서 속성값을 찾지 못하면 Spring 환경이나 일반 Java `System` 속성을 확인해서 값을 가져옵니다.

> (i)
You can use the `PropertySourcesPlaceholderConfigurer` to substitute class names, which is sometimes useful when you have to pick a particular implementation class at runtime. The following example shows how to do so:
{:style="background-color: #e9f1f6;"}

```xml
<bean class="org.springframework.beans.factory.config.PropertySourcesPlaceholderConfigurer">
    <property name="locations">
        <value>classpath:com/something/strategy.properties</value>
    </property>
    <property name="properties">
        <value>custom.strategy.class=com.something.DefaultStrategy</value>
    </property>
</bean>

<bean id="serviceStrategy" class="${custom.strategy.class}"/>
```

>
If the class cannot be resolved at runtime to a valid class, resolution of the bean fails when it is about to be created, which is during the `preInstantiateSingletons()` phase of an `ApplicationContext` for a non-lazy-init bean.
{:style="background-color: #e9f1f6;"}

- (i) 참고
    - `PropertySourcesPlaceholderConfigurer`를 사용해서 클래스 이름을 대체하는 것도 가능합니다.
    - 이 방법은 런타임에 특정 구현 클래스를 선택해야 하는 상황에서 유용할 수 있습니다.
    - 만약 런타임에 유효한 클래스를 확인할 수 없다면, bean이 생성되는 시점에 bean 확인이 실패하게 됩니다.
        - 이것은 non-lazy-init bean에 대해서 `ApplicationContext`가 `preInstantiateSingletons()` 단계를 진행할 때 발생합니다.

#### Example: The PropertyOverrideConfigurer

[원문]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-factory-overrideconfigurer )

>
The `PropertyOverrideConfigurer`, another bean factory post-processor, resembles the `PropertySourcesPlaceholderConfigurer`, but unlike the latter, the original definitions can have default values or no values at all for bean properties. If an overriding `Properties` file does not have an entry for a certain bean property, the default context definition is used.
>
Note that the bean definition is not aware of being overridden, so it is not immediately obvious from the XML definition file that the override configurer is being used. In case of multiple `PropertyOverrideConfigurer` instances that define different values for the same bean property, the last one wins, due to the overriding mechanism.
>
Properties file configuration lines take the following format:

또 다른 bean 팩토리 post-processor로 `PropertyOverrideConfigurer`가 있습니다. `PropertySourcesPlaceholderConfigurer`와 비슷해 보이지만, `PropertyOverrideConfigurer`는 그와 달리 original definition은 기본값을 가질 수 있으며, 모든 bean property에 대해 아무 값도 갖지 않을 수도 있습니다.

만약 `Properties` 파일에 특정 bean 프로퍼티에 대한 항목이 없다면 기본 컨텍스트 정의가 대신 사용됩니다.

bean definition은 오버라이딩을 스스로 인식하지 못합니다.
따라서 XML 정의 파일에서 override configurer가 사용중인지는 바로 알 수 없습니다.
같은 bean 프로퍼티에 대해 여러 개의 다른 값들을 정의하는 `PropertyOverrideConfigurer`를 여러 인스턴스로 사용하는 경우에는 overriding 메커니즘 때문에 마지막 설정값이 사용되게 됩니다.

프로퍼티 파일 설정은 다음과 같은 포맷을 사용합니다.

```
beanName.property=value
```

>
The following listing shows an example of the format:

다음 목록은 같은 포맷을 사용하는 예제입니다.

```
dataSource.driverClassName=com.mysql.jdbc.Driver
dataSource.url=jdbc:mysql:mydb
```

>
This example file can be used with a container definition that contains a bean called `dataSource` that has `driver` and `url` properties.
>
Compound property names are also supported, as long as every component of the path except the final property being overridden is already non-null (presumably initialized by the constructors). In the following example, the `sammy` property of the `bob` property of the `fred` property of the `tom` bean is set to the scalar value 123:

이 예제 파일은 `dataSource`라고 불리우게 될 bean을 포함하는 컨테이너 definition과 함께 사용할 수 있습니다.
`dataSource`는 `driver`와 `url` 프로퍼티를 갖게 되겠죠.

복합 프로퍼티 이름도 사용 가능합니다.
오버라이딩되는 final 프로퍼티를 제외한 경로에 있는 모든 컴포넌트가 non null이 아닌 경우(생성자에 의해 초기화된 경우라던가..)에 사용할 수 있습니다.

다음 예제에서 `tom` bean의 `fred` 프로퍼티에 있는 `bob` 프로퍼티의 `sammy` 프로퍼티는 스칼라 값 `123`으로 설정됩니다.

```
tom.fred.bob.sammy=123
```

> (i)
Specified override values are always literal values. They are not translated into bean references. This convention also applies when the original value in the XML bean definition specifies a bean reference.
{:style="background-color: #ecf1e8;"}

- (i) 참고
    - 명시된 오버라이드 값은 항상 리터럴 값입니다.
    - 이런 값들은 bean 참조로 번역되어 적용되지 않습니다.
    - 이 규칙은 XML bean definition의 원래 값이 bean 참조를 명시하는 경우에도 적용됩니다.

>
With the `context` namespace introduced in Spring 2.5, it is possible to configure property overriding with a dedicated configuration element, as the following example shows:

Spring 2.5부터 도입된 `context` namespace를 사용하면, 다음 예제와 같이 전용 configuration element를 사용해 프로퍼티 오버라이딩을 할 수 있습니다.

```xml
<context:property-override location="classpath:override.properties"/>
```

### 1.8.3. Customizing Instantiation Logic with a FactoryBean

[원문]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-factory-extension-factorybean )

>
You can implement the `org.springframework.beans.factory.FactoryBean` interface for objects that are themselves factories.

여러분이 직접 `org.springframework.beans.factory.FactoryBean` 인터페이스를 구현해 팩토리 자체인 객체를 만들 수도 있습니다.

>
The `FactoryBean` interface is a point of pluggability into the Spring IoC container’s instantiation logic. If you have complex initialization code that is better expressed in Java as opposed to a (potentially) verbose amount of XML, you can create your own FactoryBean, write the complex initialization inside that class, and then plug your custom `FactoryBean` into the container.

`FactoryBean` 인터페이스는 Spring IoC 컨테이너의 인스턴스화 로직에 플러그를 꽂을 수 있는 지점입니다.
만약 여러분이 복잡한 초기화 코드를 갖고 있는데 XML로 표현하면 내용이 장황하게 되고 Java로 표현하는 것이 더 나은 경우라면, 고유한 `FactoryBean`을 만들고 그 클래스 안에 복잡한 초기화 코드를 작성한 다음, 이렇게 만든 커스텀 `FactoryBean`을 컨테이너에 연결할(plug) 수 있습니다.

>
The `FactoryBean<T>` interface provides three methods:
>
- `T getObject()`: Returns an instance of the object this factory creates. The instance can possibly be shared, depending on whether this factory returns singletons or prototypes.
- `boolean isSingleton()`: Returns `true` if this `FactoryBean` returns singletons or `false` otherwise. The default implementation of this method returns `true`.
- `Class<?> getObjectType()`: Returns the object type returned by the `getObject()` method or `null` if the type is not known in advance.

`FactoryBean<T>` 인터페이스는 3 개의 메소드를 제공합니다.

- `T getObject()`: 이 팩토리가 생성하는 객체의 인스턴스를 리턴합니다. 리턴된 인스턴스는 이 팩토리가 singleton 또는 prototype을 리턴하는지에 따라 공유 가능여부가 달라집니다.
- `boolean isSingleton()`: 이 `FactoryBean`이 singleton들을 리턴한다면 이 메소드는 `true`를 리턴합니다. 이 메소드의 `default` 구현은 `true`를 리턴합니다.
- `Class<?> getObjectType()`: `getObject()`메소드가 리턴하는 객체의 타입을 리턴합니다. 만약 알려지지 않은 타입이라면 이 메소드는 `null`을 리턴합니다.

>
The `FactoryBean` concept and interface are used in a number of places within the Spring Framework. More than 50 implementations of the `FactoryBean` interface ship with Spring itself.
>
When you need to ask a container for an actual `FactoryBean` instance itself instead of the bean it produces, prefix the bean’s `id` with the ampersand symbol (`&`) when calling the `getBean()` method of the `ApplicationContext`. So, for a given `FactoryBean` with an `id` of `myBean`, invoking `getBean("myBean")` on the container returns the product of the `FactoryBean`, whereas invoking `getBean("&myBean")` returns the `FactoryBean` instance itself.

`FactoryBean` 컨셉과 인터페이스는 Spring 프레임워크의 다양한 곳에서 사용되고 있습니다.
Spring은 50개 이상의 `FactoryBean` 인터페이스 구현을 함께 제공하고 있습니다.

만약 `FactoryBean`이 생성하는 bean 이 아니라 `FactoryBean` 인스턴스 자체를 요청할 일이 있다면 bean의 id 앞에 `&` 기호를 붙여서 `ApplicationContext`의 `getBean()` 메소드로 호출하세요.

예를 들어, `id`가 `myBean`인 `FactoryBean`이 있을 때 `getBean("myBean")`을 호출하면 컨테이너는 `FactoryBean`이 생산한 객체를 리턴할 것입니다.
하지만 `getBean("&myBean")`과 같이 호출하면 `FactoryBean` 자신의 인스턴스를 리턴합니다.


## 함께 읽기

- 목록으로 - [[/spring/document/core]]{Spring Core Technologies}
- 이전 문서 - [[/spring/document/core/01-07-bean-definition-inheritance]]{1.7. Bean Definition Inheritance}
- 다음 문서 - [[/spring/document/core/01-09-annotation-based-container-config]]{1.9. Annotation-based Container Configuration}

