---
layout  : wiki
title   : Spring Core Technologies - 1.3. Bean Overview
summary : 
date    : 2021-06-15 21:47:48 +0900
updated : 2021-07-10 21:01:38 +0900
tag     : java spring
resource: 89/813A74-7437-4116-89E5-3C70531E4307
toc     : true
public  : true
parent  : [[/spring/document/core]]
latex   : false
---
* TOC
{:toc}

- 목록으로 - [[/spring/document/core]]{Spring Core Technologies}
- 이전 문서 - [[/spring/document/core/01-02-container-overview]]{1.2. Container Overview}
- 다음 문서 - [[/spring/document/core/01-04-dependencies]]{1.4. Dependencies}

## 1.3. Bean Overview

[원문]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-definition )

>
A Spring IoC container manages one or more beans. These beans are created with the configuration metadata that you supply to the container (for example, in the form of XML `<bean/>` definitions).
>
Within the container itself, these bean definitions are represented as `BeanDefinition` objects, which contain (among other information) the following metadata:
>
- A package-qualified class name: typically, the actual implementation class of the bean being defined.
- Bean behavioral configuration elements, which state how the bean should behave in the container (scope, lifecycle callbacks, and so forth).
- References to other beans that are needed for the bean to do its work. These references are also called collaborators or dependencies.
- Other configuration settings to set in the newly created object — for example, the size limit of the pool or the number of connections to use in a bean that manages a connection pool.
>
This metadata translates to a set of properties that make up each bean definition. The following table describes these properties:

- Spring IoC 컨테이너는 bean을 관리한다.
    - 컨테이너는 제공받은 configuration 메타데이터를 참고해서 bean들을 생성한다.
        - configuration 메타데이터의 예: `<bean/>` 정의가 있는 XML 파일

bean 정의는 컨테이너 내에서 [BeanDefinition]( https://docs.spring.io/spring-framework/docs/5.3.7/javadoc-api/org/springframework/beans/factory/config/BeanDefinition.html ) 객체로 표현되며, 다음과 같은 메타데이터를 갖는다.

- package-qualified class name: 일반적으로 정의된 Bean을 실제로 구현한 클래스.
- 컨테이너에서의 Bean 동작 configuration(scope, 라이프 사이클 콜백 등).
- Bean이 필요로 하는 다른 Bean에 대한 레퍼런스.
    - 이러한 참조를 공동 작업자(collaborators) 또는 의존관계(dependencies)라고도 부른다.
- 새로 생성된 객체에 설정할 그 외의 설정.
    — 예: pool 사이즈 리미트, 또는 커넥션 풀을 관리하는 Bean에서 사용할 커넥션 수.

메타 데이터는 bean 각각의 정의를 구성하는 속성 집합으로 변환된다. 다음 표는 이러한 속성을 설명한다.

>
**Table 1. The bean definition**
>
| Property                 | Explained in...                                                                                                                                    |
|--------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------|
| Class                    | [Instantiating Beans]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-factory-class )                           |
| Name                     | [Naming Beans]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-beanname )                                       |
| Scope                    | [Bean Scopes]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-factory-scopes )                                  |
| Constructor arguments    | [Dependency Injection]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-factory-collaborators )                  |
| Properties               | [Dependency Injection]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-factory-collaborators )                  |
| Autowiring mode          | [Autowiring Collaborators]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-factory-autowire )                   |
| Lazy initialization mode | [Lazy-initialized Beans]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-factory-lazy-init )                    |
| Initialization method    | [Initialization Callbacks]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-factory-lifecycle-initializingbean ) |
| Destruction method       | [Destruction Callbacks]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-factory-lifecycle-disposablebean )      |

>
In addition to bean definitions that contain information on how to create a specific bean, the `ApplicationContext` implementations also permit the registration of existing objects that are created outside the container (by users). This is done by accessing the ApplicationContext’s BeanFactory through the `getBeanFactory()` method, which returns the BeanFactory `DefaultListableBeanFactory` implementation. `DefaultListableBeanFactory` supports this registration through the `registerSingleton(..)` and `registerBeanDefinition(..)` methods. However, typical applications work solely with beans defined through regular bean definition metadata.

bean을 생성하는 방법에 대한 정보를 포함하고 있는 bean 정의 외에도, `ApplicationContext` 구현체들은 사용자들이 컨테이너 바깥에서 생성한 객체의 등록도 허용한다.

- 이런 등록 작업은 `ApplicationContext`의 `BeanFactory`에 접근하여 수행할 수 있다.
    - 구체적으로: `getBeanFactory()`를 호출하면 `DefaultListableBeanFactory`를 리턴받는다.
        - `DefaultListableBeanFactory`의 `registerSingleton(..)`과 `registerBeanDefinition(..)` 메소드를 사용하면 (컨테이너 외부에서 생성한 bean을) 등록할 수 있다.
- 그러나 평범한 애플리케이션은 이런 방법을 사용하지 않고 표준적인 방법으로 정의된 메타데이터로 만들어진 bean들만 써서 작동한다.


>
(i) Bean metadata and manually supplied singleton instances need to be registered as early as possible, in order for the container to properly reason about them during autowiring and other introspection steps. While overriding existing metadata and existing singleton instances is supported to some degree, the registration of new beans at runtime (concurrently with live access to the factory) is not officially supported and may lead to concurrent access exceptions, inconsistent state in the bean container, or both.

- (i) 참고
    - bean 메타데이터와, 수동으로 등록하는 싱글톤 인스턴스는 가능한 한 빨리 등록할 것.
        - 그렇지 않으면 컨테이너가 그런 bean들을 자동으로 autowiring하지 못할 수 있고, 그 외의 내부 단계에서도 올바르게 작동하지 못할 수 있다.
    - 기존 메타데이터나 기존 싱글톤 인스턴스를 재정의하는 것은 어느 정도 지원되지만...
        - 런타임에 새 bean을 등록(팩토리에 대한 라이브 액세스와 동시에)하는 것은 공식적으로 지원되지 않는다.
            - 동시성 액세스 예외가 발생할 수 있음.
            - bean 컨테이너의 일관성에 문제가 생길 수도 있다.

### 1.3.1. Naming Beans

[원문]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-beanname )

>
Every bean has one or more identifiers. These identifiers must be unique within the container that hosts the bean. A bean usually has only one identifier. However, if it requires more than one, the extra ones can be considered aliases.
>
In XML-based configuration metadata, you use the `id` attribute, the `name` attribute, or both to specify the bean identifiers. The `id` attribute lets you specify exactly one id. Conventionally, these names are alphanumeric ('myBean', 'someService', etc.), but they can contain special characters as well. If you want to introduce other aliases for the bean, you can also specify them in the `name` attribute, separated by a comma (`,`), semicolon (`;`), or white space. As a historical note, in versions prior to Spring 3.1, the `id` attribute was defined as an `xsd:ID` type, which constrained possible characters. As of 3.1, it is defined as an `xsd:string` type. Note that bean `id` uniqueness is still enforced by the container, though no longer by XML parsers.

모든 bean은 하나 이상의 식별자를 갖는다.
- 식별자는 bean을 호스팅하는 컨테이너 내에서 유니크해야 한다.
- 일반적으로 bean 하나는 식별자도 하나만 갖는다.
    - 만약 식별자가 두 개 이상 필요하면, 추가 식별자는 알리아스로 간주될 수 있다.

XML 기반의 configuration 메타데이터에서는 `id`나 `name`으로 bean 식별자를 지정한다.

- `id`를 쓰면 정확히 하나의 ID를 지정할 수 있다.
    - 보통 알파벳과 숫자를 쓰지만('myBean', 'someService' 등), 특수 문자를 사용할 수도 있다.
- bean에 다른 알리아스를 붙여주려면 쉼표(`,`), 세미콜론(`;`), 공백을 구분자로 써서 `name` 속성에 지정해도 된다.
- Spring 3.1 이전 버전에서는,
    - `id` 속성은 사용 가능한 문자를 제한하는 `xsd:ID` 타입으로 정의.
    - bean `id` 유니크 제약은 XML 파서에서 검증한다.
- Spring 3.1 이후부터는,
    - `id` 속성은 `xsd:string` 타입으로 정의.
    - bean `id` 유니크 제약은 XML 파서가 아니라, 컨테이너에에서 검증한다.

>
You are not required to supply a `name` or an `id` for a bean. If you do not supply a `name` or `id` explicitly, the container generates a unique name for that bean. However, if you want to refer to that bean by name, through the use of the `ref` element or a Service Locator style lookup, you must provide a name. Motivations for not supplying a name are related to using [inner beans]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-inner-beans ) and [autowiring collaborators]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-factory-autowire ).

bean의 `name`이나 `id`를 꼭 지정하지 않아도 된다.

- `name`이나 `id`를 생략한다면 컨테이너가 bean의 유니크한 name을 자동으로 생성한다.
    - 그러나 `ref` element나 Service Locator 스타일 검색을 통해 이름으로 해당 bean을 참조하려 한다면 `name` 값을 명시해야 한다.
- 이름을 제공하지 않는 이유는 [inner beans]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-inner-beans ), [autowiring collaborators]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-factory-autowire ) 문서를 참고할 것.

>
**Bean Naming Conventions**
>
The convention is to use the standard Java convention for instance field names when naming beans. That is, bean names start with a lowercase letter and are camel-cased from there. Examples of such names include accountManager, accountService, userDao, loginController, and so forth.
>
Naming beans consistently makes your configuration easier to read and understand. Also, if you use Spring AOP, it helps a lot when applying advice to a set of beans related by name.

Bean 네이밍 컨벤션
- 인스턴스 필드 이름에 대한 스탠다드 Java 컨벤션을 bean 이름을 지정할 때에도 똑같이 적용한다.
    - 즉, bean의 이름은 소문자로 시작하고, camelCase 를 사용.
    - 예: `accountManager`, `accountService`, `userDao`, `loginController` 등.

- Bean 네이밍 컨벤션은 configuration의 가독성과 이해를 돕기 위한 것.
- 또한, Spring AOP를 사용하면 특정 이름과 관련된 bean 집합에 advice를 적용할 때 도움이 된다.

>
(i) With component scanning in the classpath, Spring generates bean names for unnamed components, following the rules described earlier: essentially, taking the simple class name and turning its initial character to lower-case. However, in the (unusual) special case when there is more than one character and both the first and second characters are upper case, the original casing gets preserved. These are the same rules as defined by `java.beans.Introspector.decapitalize` (which Spring uses here).

- (i) 참고
    - Spring은 classpath 에서의 컴포넌트 스캔을 통해, 이름이 지정되지 않은 컴포넌트에도 위에서 설명한 규칙에 따라 bean 이름을 만들어 준다.
        - 기본적으로는 클래스 이름을 가져와서, 첫 글자를 소문자로 바꾼 이름을 만든다.
    - 그런데 클래스 이름이 두 개의 대문자로 시작하는 것 같은 특별한 경우에는, 원래의 클래스 이름을 그대로 사용한다.
        - 이 규칙은 [java.beans.Introspector.decapitalize]( https://docs.oracle.com/en/java/javase/11/docs/api/java.desktop/java/beans/Introspector.html#decapitalize(java.lang.String) )의 작동 방식과 같다(스프링이 이 메소드를 사용).

#### Aliasing a Bean outside the Bean Definition

**Bean Definition 외부에서 Bean 알리아싱하기** [(원문)]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-beanname-alias )

>
In a bean definition itself, you can supply more than one name for the bean, by using a combination of up to one name specified by the `id` attribute and any number of other names in the `name` attribute. These names can be equivalent aliases to the same bean and are useful for some situations, such as letting each component in an application refer to a common dependency by using a bean name that is specific to that component itself.

Bean 정의에서, Bean 하나에 이름을 하나 이상 지정할 수 있다.
- `id` 속성에 지정된 이름 하나와, `name` 속성에 있는 다른 이름의 조합을 사용하면 된다.
    - 이러한 이름은 하나의 동일한 bean에 대해 동등하게 취급되는 알리아스가 될 수 있으며
    - 애플리케이션의 각 컴포넌트가 자신에게 고유한 bean 이름을 사용해서 공통 의존관계를 참조하도록 하는 것 같은 상황에서 유용할 수 있다.

>
Specifying all aliases where the bean is actually defined is not always adequate, however. It is sometimes desirable to introduce an alias for a bean that is defined elsewhere. This is commonly the case in large systems where configuration is split amongst each subsystem, with each subsystem having its own set of object definitions. In XML-based configuration metadata, you can use the `<alias/>` element to accomplish this. The following example shows how to do so:

그러나 bean에 모든 알리아스를 명시해 사용하는 것이 언제나 적절한 선택은 아니다.
- 자신이 아닌 다른 곳에서 정의된 bean 알리아스를 사용하는 것이 바람직할 때도 있다.
    - 일반적으로는 configuration이 각각의 하위 시스템에 나뉘에 적용되고, 각 하위 시스템에서는 자신만의 객체 정의 집합이 있는 대규모 시스템의 경우가 이에 해당된다.
- XML 기반의 configuration 메타데이터에서는 `<alias/>` 엘리먼트를 사용하여 이렇게 할 수 있다.

```xml
<alias name="myApp-dataSource" alias="subsystemA-dataSource"/>
<alias name="myApp-dataSource" alias="subsystemB-dataSource"/>
```

>
Now each component and the main application can refer to the dataSource through a name that is unique and guaranteed not to clash with any other definition (effectively creating a namespace), yet they refer to the same bean.

- 이제 각 컴포넌트와 메인 애플리케이션은 유니크한 이름을 통해 데이터 소스를 참조할 수 있다.
    - 그리고 그 이름은 다른 정의와 충돌하지도 않으며(실제로는 네임스페이스를 생성한다), 같은 bean을 참조할 수도 있다.

>
**Java-configuration**
>
If you use Javaconfiguration, the `@Bean` annotation can be used to provide aliases. See [Using the @Bean Annotation]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-java-bean-annotation ) for details.

만약 여러분이 Javaconfiguration을 사용한다면, `@Bean` 애노테이션을 써서 알리아스를 지정할 수 있다.
자세한 내용은 `@Bean` 애노테이션 사용을 참고할 것.

### 1.3.2. Instantiating Beans

[원문]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-factory-class )

>
A bean definition is essentially a recipe for creating one or more objects. The container looks at the recipe for a named bean when asked and uses the configuration metadata encapsulated by that bean definition to create (or acquire) an actual object.
>
If you use XML-based configuration metadata, you specify the type (or class) of object that is to be instantiated in the `class` attribute of the `<bean/>` element. This `class` attribute (which, internally, is a `Class` property on a `BeanDefinition` instance) is usually mandatory. (For exceptions, see [Instantiation by Using an Instance Factory Method]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-factory-class-instance-factory-method ) and [Bean Definition Inheritance]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-child-bean-definitions ).) You can use the `Class` property in one of two ways:
>
- Typically, to specify the bean class to be constructed in the case where the container itself directly creates the bean by calling its constructor reflectively, somewhat equivalent to Java code with the `new` operator.
- To specify the actual class containing the `static` factory method that is invoked to create the object, in the less common case where the container invokes a `static` factory method on a class to create the bean. The object type returned from the invocation of the `static` factory method may be the same class or another class entirely.

bean 정의는 하나 이상의 객체를 생성하기 위한 레시피라 할 수 있다.
- 컨테이너는 요청을 받으면 이름이 있는 bean의 레시피를 보고, 캡슐화된 configuration 메타데이터를 사용하여 실제 객체를 생성(또는 획득)한다.

XML 기반 configuration 메타데이터를 사용한다면, `<bean/>` 엘리먼트의 `class` 속성에서 인스턴스화 할 객체의 타입(또는 class)을 지정한다.
- 이 `class` 속성(내부적으로 `BeanDefinition` 인스턴스의 `Class` 속성)은 필수값이다.
    - (어떤 예외가 있는지에 대해서는 [Instantiation by Using an Instance Factory Method]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-factory-class-instance-factory-method ) 와[Bean Definition Inheritance]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-child-bean-definitions )를 참고.)

다음 두 가지 방법 중 하나로 `Class` 속성을 사용할 수 있다.

- 생성할 Bean 클래스를 지정한다.
    - 컨테이너가 생성자를 호출해 Bean을 직접 생성하는 경우이며, 이 방법은 `new` 연산자를 사용하는 Java 코드와 거의 똑같다.
- 객체를 생성할 `static` 팩토리 메소드가 들어있는 클래스를 지정한다.
    - 컨테이너가 정적 팩토리 메소드를 호출해 bean을 생성하는 경우이다.
    - 정적 팩토리 메서드가 리턴한 객체 타입은 지정한 클래스와 같은 클래스일 수도 있지만 완전히 다른 클래스일 수도 있다.

>
**Nested class names**
>
If you want to configure a bean definition for a nested class, you may use either the binary name or the source name of the nested class.
>
For example, if you have a class called `SomeThing` in the `com.example` package, and this `SomeThing` class has a `static` nested class called `OtherThing`, they can be separated by a dollar sign (`$`) or a dot (`.`). So the value of the `class` attribute in a bean definition would be `com.example.SomeThing$OtherThing` or `com.example.SomeThing.OtherThing`.

**중첩된 클래스의 이름은 어떻게 표현하나?**

- 중첩된 클래스에 대한 bean 정의를 구성하려면, 중첩된 클래스의 이진 이름(binary name)이나 소스 이름(source name)을 사용할 수 있다.
- 예를 들어
    - `com.example` 패키지에 `SomeThing`이라는 class가 있고, 이 `SomeThing` class 내부에 `OtherThing`이라는 `static` class가 있다면, 달러 기호(`$`) 또는 점(`.`)을 구분자로 사용할 수 있다.
    - 따라서 bean 정의의 `class` 속성 값은 `com.example.SomeThing$OtherThing` 또는 `com.example.SomeThing.OtherThing`.

#### Instantiation with a Constructor

**생성자를 사용한 초기화** [(원문)]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-factory-class-ctor )

>
When you create a bean by the constructor approach, all normal classes are usable by and compatible with Spring. That is, the class being developed does not need to implement any specific interfaces or to be coded in a specific fashion. Simply specifying the bean class should suffice. However, depending on what type of IoC you use for that specific bean, you may need a default (empty) constructor.
>
The Spring IoC container can manage virtually any class you want it to manage. It is not limited to managing true JavaBeans. Most Spring users prefer actual JavaBeans with only a default (no-argument) constructor and appropriate setters and getters modeled after the properties in the container. You can also have more exotic non-bean-style classes in your container. If, for example, you need to use a legacy connection pool that absolutely does not adhere to the JavaBean specification, Spring can manage it as well.
>
With XML-based configuration metadata you can specify your bean class as follows:

생성자로 bean을 생성하는 방식을 쓰면 모든 일반 클래스가 Spring과 호환 가능하다.
- 즉, 특정 인터페이스를 구현하거나 특정한 방식으로 코딩하지 않아도 된다.
- 그냥 bean 클래스를 지정하기만 해도 된다.
- 그러나 특정 bean에 사용하는 IoC 유형에 따라서, 기본 생성자가 필요한 경우도 있다.

Spring IoC 컨테이너는 거의 모든 클래스를 관리할 수 있다.
- 완전한 JavaBeans만 관리하지 않는다.
- 대부분의 Spring 사용자는 (컨테이너의 속성을 고려해서) 기본 생성자와 적당한 setter와 getter만 있는 JavaBeans를 선호한다.
- 평범한 bean 스타일과는 다른 형태의 클래스를 컨테이너가 관리하게 할 수도 있다.
    - 예를 들어 JavaBean 사양을 준수하지 않는 레거시 커넥션 풀을 사용해야하는 경우에도 Spring으로 관리가 가능.

XML 기반의 configuration 메타데이터를 사용하면 다음과 같이 Bean 클래스를 지정할 수 있다.

```xml
<bean id="exampleBean" class="examples.ExampleBean"/>

<bean name="anotherExample" class="examples.ExampleBeanTwo"/>
```

>
For details about the mechanism for supplying arguments to the constructor (if required) and setting object instance properties after the object is constructed, see [Injecting Dependencies]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-factory-collaborators ).

생성자에 인자를 제공하는 메커니즘과 객체가 생성된 이후 인스턴스 속성에 값을 셋팅하는 메커니즘에 대해 자세히 알고 싶다면 [Injecting Dependencies]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-factory-collaborators ) 문서를 참고할 것.

#### Instantiation with a Static Factory Method

**정적 팩토리 메소드를 사용한 초기화** [(원문)]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-factory-class-static-factory-method )

>
When defining a bean that you create with a static factory method, use the `class` attribute to specify the class that contains the `static` factory method and an attribute named `factory-method` to specify the name of the factory method itself. You should be able to call this method (with optional arguments, as described later) and return a live object, which subsequently is treated as if it had been created through a constructor. One use for such a bean definition is to call `static` factories in legacy code.
>
The following bean definition specifies that the bean be created by calling a factory method. The definition does not specify the type (class) of the returned object, only the class containing the factory method. In this example, the `createInstance()` method must be a static method. The following example shows how to specify a factory method:

- 정적 팩토리 메소드를 사용해 bean을 생성하려면,
    - `static` 팩토리 메소드가 들어 있는 클래스를 `class` attribute에 지정한다.
        - 그리고 `factory-method`에 팩토리 메소드 이름을 지정한다.
            - 물론 이 팩토리 메소드는 호출 가능해야 하고, 라이브 객체를 리턴할 수 있어야 한다.
            - 이렇게 리턴된 객체는 생성자를 통해 생성된 것과 똑같이 처리된다.
    - 이 방식은 레거시 코드에서 `static` 팩토리를 호출할 수 있다는 점에서도 의미가 있다.

아래의 예제는 팩토리 메서드를 호출하여 bean이 생성되도록 설정한다.
- 리턴된 객체의 타입(클래스)을 지정하지 않고 팩토리 메서드와 클래스만 지정한다는 점에 주목할 것.
- 이 예제에서 `createInstance()` 메서드는 정적 메서드여야 한다.

```xml
<bean id="clientService"
    class="examples.ClientService"
    factory-method="createInstance"/>
```

>
The following example shows a class that would work with the preceding bean definition:

다음 예제는 위의 Bean 정의와 함께 작동하는 클래스를 보여준다.

```java
public class ClientService {
    private static ClientService clientService = new ClientService();
    private ClientService() {}

    public static ClientService createInstance() {
        return clientService;
    }
}
```

>
For details about the mechanism for supplying (optional) arguments to the factory method and setting object instance properties after the object is returned from the factory, see [Dependencies and Configuration in Detail]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-factory-properties-detailed ).

팩토리 메소드에 인자를 제공하는 메커니즘과 팩토리가 객체를 리턴한 이후 객체 인스턴스 속성에 값을 셋팅하는 메커니즘에 대해 자세히 알고 싶다면 [Dependencies and Configuration in Detail]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-factory-properties-detailed ) 문서를 참고할 것.

#### Instantiation by Using an Instance Factory Method

**인스턴스 팩토리 메소드를 사용한 초기화** [(원문)]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-factory-class-instance-factory-method )

>
Similar to instantiation through a [static factory method]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-factory-class-static-factory-method ), instantiation with an instance factory method invokes a non-static method of an existing bean from the container to create a new bean. To use this mechanism, leave the `class` attribute empty and, in the `factory-bean` attribute, specify the name of a bean in the current (or parent or ancestor) container that contains the instance method that is to be invoked to create the object. Set the name of the factory method itself with the `factory-method` attribute. The following example shows how to configure such a bean:

- 인스턴스 팩토리 메소드를 사용하는 인스턴스화는,
    - 컨테이너에서 이미 만들어둔 bean의 특정 메소드를 호출하여 새로운 bean을 만든다.
- 이 메커니즘을 사용하려면
    - `class` 속성은 비워둔다.
    - 그리고 `factory-bean` 속성에,
        - 호출할 인스턴스 메소드를 갖고 있는 현재 컨테이너(또는 부모나 조상 컨테이너)의 bean 이름을 지정한다.
        - `factory-method` 속성에 팩토리 메소드의 이름도 지정해 준다.
- 다음 예제는 이 방법을 보여준다.

```xml
<!-- the factory bean, which contains a method called createInstance() -->
<bean id="serviceLocator" class="examples.DefaultServiceLocator">
    <!-- inject any dependencies required by this locator bean -->
</bean>

<!-- the bean to be created via the factory bean -->
<bean id="clientService"
    factory-bean="serviceLocator"
    factory-method="createClientServiceInstance"/>
```

>
The following example shows the corresponding class:

다음 예제는 해당 클래스를 보여준다.

```java
public class DefaultServiceLocator {

    private static ClientService clientService = new ClientServiceImpl();

    public ClientService createClientServiceInstance() {
        return clientService;
    }
}
```

>
One factory class can also hold more than one factory method, as the following example shows:

다음 예제와 같이, 하나의 팩토리 클래스는 팩토리 메소드를 여러 개 갖고 있을 수도 있다.

```xml
<bean id="serviceLocator" class="examples.DefaultServiceLocator">
    <!-- inject any dependencies required by this locator bean -->
</bean>

<bean id="clientService"
    factory-bean="serviceLocator"
    factory-method="createClientServiceInstance"/>

<bean id="accountService"
    factory-bean="serviceLocator"
    factory-method="createAccountServiceInstance"/>
```

>
The following example shows the corresponding class:

다음 예제는 해당 클래스를 보여준다.

```java
public class DefaultServiceLocator {

    private static ClientService clientService = new ClientServiceImpl();

    private static AccountService accountService = new AccountServiceImpl();

    public ClientService createClientServiceInstance() {
        return clientService;
    }

    public AccountService createAccountServiceInstance() {
        return accountService;
    }
}
```

>
This approach shows that the factory bean itself can be managed and configured through dependency injection (DI). See [Dependencies and Configuration in Detail]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-factory-properties-detailed ).

이 방법은 팩토리 bean 자신조차도 의존관계 주입(DI)를 통해 구성되고 관리된다는 것을 보여준다.
자세한 내용은 [Dependencies and Configuration in Detail]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-factory-properties-detailed ) 문서를 참고할 것.

>
(i) In Spring documentation, "factory bean" refers to a bean that is configured in the Spring container and that creates objects through an [instance]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-factory-class-instance-factory-method ) or [static]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-factory-class-static-factory-method ) factory method. By contrast, `FactoryBean` (notice the capitalization) refers to a Spring-specific [FactoryBean]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-factory-extension-factorybean ) implementation class.

- (i) 참고
    - Spring 문서에서 "factory Bean"은
        - Spring 컨테이너에 구성되는 bean 이며,
        - 인스턴스 또는 정적 팩토리 메소드를 통해 객체를 생성하는 Bean을 의미한다.
    - 대조적으로, `FactoryBean`(대문자 사용에 주의)은 Spring 스펙의 `FactoryBean`을 구현한 클래스이다.

#### Determining a Bean’s Runtime Type

**Bean의 런타임 타입 결정하기** [(원문)]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-factory-type-determination )

>
The runtime type of a specific bean is non-trivial to determine. A specified class in the bean metadata definition is just an initial class reference, potentially combined with a declared factory method or being a `FactoryBean` class which may lead to a different runtime type of the bean, or not being set at all in case of an instance-level factory method (which is resolved via the specified `factory-bean` name instead). Additionally, AOP proxying may wrap a bean instance with an interface-based proxy with limited exposure of the target bean’s actual type (just its implemented interfaces).
>
The recommended way to find out about the actual runtime type of a particular bean is a `BeanFactory.getType` call for the specified bean name. This takes all of the above cases into account and returns the type of object that a `BeanFactory.getBean` call is going to return for the same bean name.

런타임에 bean이 실제로 어떤 타입을 갖는지는 쉽지 않은 문제이다.
- bean 메타데이터 정의에 지정된 클래스는 그냥 초기화 클래스의 참조일 뿐이다.
- 명시된 팩토리 메소드나 `FactoryBean`이 된 클래스와의 조합으로 인해 bean이 런타임에서 타입이 달라질 수 있다.
    - 인스턴스 레벨 팩토리 메소드(`factory-bean` name 설정을 쓰지 않고 설정된 경우)를 사용했다면 (리턴 타입을 지정하지 않았으므로) 런타임 타입을 지정하지 않는다.
- 또한, AOP 프록시는 bean 인스턴스를 (bean의 실제 타입에 비해 노출이 제한된) 인터페이스 기반의 프록시로 래핑할 수 있다.

특정 bean이 런타임일 때 실제로 어떤 타입인지 알아내기 위해 추천하는 방법은

- bean 이름으로 `BeanFactory.getType` 메소드를 호출하는 것이다.
- 이 방법은 위에서 말한 모든 경우를 고려하여 객체의 타입을 리턴해 준다.
    - 리턴된 값은 `BeanFactory.getBean` 메소드가 리턴해주는 것과 같은 bean이다.


## 함께 읽기

- 목록으로 - [[/spring/document/core]]{Spring Core Technologies}
- 이전 문서 - [[/spring/document/core/01-02-container-overview]]{1.2. Container Overview}
- 다음 문서 - [[/spring/document/core/01-04-dependencies]]{1.4. Dependencies}
- [Interface BeanDefinition (Spring 5.3.7)]( https://docs.spring.io/spring-framework/docs/5.3.7/javadoc-api/org/springframework/beans/factory/config/BeanDefinition.html )

## 참고문헌

- [Core Technologies (docs.spring.io)][5-3-7-core] - 5.3.7 버전

[5-3-7-core]: https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html

