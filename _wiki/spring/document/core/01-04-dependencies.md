---
layout  : wiki
title   : Spring Core Technologies - 1.4. Dependencies
summary : 
date    : 2021-06-15 22:47:35 +0900
updated : 2021-07-10 20:46:49 +0900
tag     : java spring
resource: 5A/0AAA32-9864-4198-99F7-32FC06D699AE
toc     : true
public  : true
parent  : [[/spring/document/core]]
latex   : false
---
* TOC
{:toc}

- 목록으로 - [[/spring/document/core]]{Spring Core Technologies}
- 이전 문서 - [[/spring/document/core/01-03-bean-overview]]{1.3. Bean Overview}
- 다음 문서 - [[/spring/document/core/01-05-bean-scopes]]{1.5. Bean Scopes}

## 1.4. Dependencies

[원문]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-dependencies )

>
A typical enterprise application does not consist of a single object (or bean in the Spring parlance). Even the simplest application has a few objects that work together to present what the end-user sees as a coherent application. This next section explains how you go from defining a number of bean definitions that stand alone to a fully realized application where objects collaborate to achieve a goal.

일반적인 엔터프라이즈 애플리케이션은 단일 객체(또는 Spring 용어로 bean)로 이루어지지 않습니다.
- 심지어 최종 사용자의 눈에 한 덩어리로 만들어져 잘 돌아가는 것처럼 보이는 단순한 종류의 애플리케이션도, 실제로는 함께 작동하는 몇 개의 객체로 구성되어 돌아가고 있습니다.
- 이번 섹션에서는 독립적인 여러 bean을 정의하는 것부터, 여러 객체가 협력해 개발 목표를 달성하는 애플리케이션으로 전환하는 방법까지를 설명합니다.

### 1.4.1. Dependency Injection

[원문]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-factory-collaborators )

>
Dependency injection (DI) is a process whereby objects define their dependencies (that is, the other objects with which they work) only through constructor arguments, arguments to a factory method, or properties that are set on the object instance after it is constructed or returned from a factory method. The container then injects those dependencies when it creates the bean. This process is fundamentally the inverse (hence the name, Inversion of Control) of the bean itself controlling the instantiation or location of its dependencies on its own by using direct construction of classes or the Service Locator pattern.

의존관계 주입(DI)은 다음의 방법들만을 사용해 객체가 자신의 의존관계(함께 일하는 다른 객체들)를 정의하는 프로세스입니다.
- 생성자 인자
- 팩토리 메소드 인자
- 객체 인스턴스가 생성되고 나서, 또는 팩토리 메소드에서 리턴되고 나서 설정된 프로퍼티

그러고 나서, 컨테이너는 bean을 생성할 때 이러한 의존관계를 주입합니다.
- 이러한 프로세스는 Bean의 입장에서는 근본적으로 뒤집힌 것입니다(그래서 Inversion of Control이라는 이름이 되었습니다).
- bean 스스로 인스턴스화를 컨트롤하기도 하고, 클래스의 생성자를 직접 사용하거나 Service Locator 패턴 같은 방법을 사용하여 의존관계의 위치를 제어하기 때문입니다.

>
Code is cleaner with the DI principle, and decoupling is more effective when objects are provided with their dependencies. The object does not look up its dependencies and does not know the location or class of the dependencies. As a result, your classes become easier to test, particularly when the dependencies are on interfaces or abstract base classes, which allow for stub or mock implementations to be used in unit tests.

DI 원칙으로 인해 코드는 더 깨끗해지며, 객체가 자신의 의존관계를 제공하기 때문에 효과적으로 디커플링이 달성됩니다.
- 객체는 자신의 의존관계를 탐색하지도 않고, 의존관계에 있는 대상들의 위치나 클래스가 무엇인지도 알지 못합니다.
- 결과적으로 여러분의 클래스들은 더 테스트하기 쉬워집니다.
    - 특히 의존관계가 인터페이스나 추상화된 클래스에 기반을 둔 경우에는, stub이나 mock 구현을 단위 테스트에서 사용할 수 있습니다.

>
DI exists in two major variants: [Constructor-based dependency injection]() and [Setter-based dependency injection]().

DI는 주로 두 가지 방법이 있습니다. Constructor 기반의 DI와 Setter 기반의 DI.

#### Constructor-based Dependency Injection

[원문]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-constructor-injection )

>
Constructor-based DI is accomplished by the container invoking a constructor with a number of arguments, each representing a dependency. Calling a `static` factory method with specific arguments to construct the bean is nearly equivalent, and this discussion treats arguments to a constructor and to a `static` factory method similarly. The following example shows a class that can only be dependency-injected with constructor injection:

생성자 기반 DI는 컨테이너가 각각의 의존관계를 나타내는 여러 인자를 사용해 생성자를 호출하는 방식으로 수행됩니다.

- bean을 생성하기 위해 특정 인자를 사용해 `static` 팩토리 메소드를 호출하는 것과 거의 같은 방법입니다.
- 이 경우에는 생성자에 집어넣는 인자나 정적 팩토리 메소드에 집어넣는 인자나 비슷하게 처리합니다.
- 다음 예제는 생성자 주입을 통해서만 의존관계 주입이 가능한 클래스를 보여줍니다.

```java
public class SimpleMovieLister {

    // the SimpleMovieLister has a dependency on a MovieFinder
    private final MovieFinder movieFinder;

    // a constructor so that the Spring container can inject a MovieFinder
    public SimpleMovieLister(MovieFinder movieFinder) {
        this.movieFinder = movieFinder;
    }

    // business logic that actually uses the injected MovieFinder is omitted...
}
```

>
Notice that there is nothing special about this class. It is a POJO that has no dependencies on container specific interfaces, base classes, or annotations.

이 클래스는 특별한 점이 없습니다.
- 단순한 POJO 입니다.
- 컨테이너 인터페이스 스펙, 베이스 클래스, 애노테이션 등에 대한 의존이 없습니다.

##### Constructor Argument Resolution

>
Constructor argument resolution matching occurs by using the argument’s type. If no potential ambiguity exists in the constructor arguments of a bean definition, the order in which the constructor arguments are defined in a bean definition is the order in which those arguments are supplied to the appropriate constructor when the bean is being instantiated. Consider the following class:

생성자 인자 결정은 인자의 타입을 사용합니다.
- 만약 bean 정의에 있어 생성자 인자에 잠재적 모호성이 없다면, bean 정의에서의 생성자 인자들의 순서는 bean이 인스턴스화 될 때 해당 인자가 생성자에 제공되는 순서와 같습니다.
- 다음 클래스 예제를 읽어봅시다.

```java
package x.y;

public class ThingOne {

    public ThingOne(ThingTwo thingTwo, ThingThree thingThree) {
        // ...
    }
}
```

>
Assuming that the `ThingTwo` and `ThingThree` classes are not related by inheritance, no potential ambiguity exists. Thus, the following configuration works fine, and you do not need to specify the constructor argument indexes or types explicitly in the `<constructor-arg/>` element.

`ThingTwo`와 `ThingThree` 클래스가 상속이 없다고 가정하면, 잠재적 모호성도 없습니다.
- 따라서, 다음 XML 설정은 잘 작동합니다.
    - 여러분은 `<constructor-arg/>` 엘리먼트에 생성자 인자의 인덱스나 타입 등을 명시할 필요가 없습니다.

```xml
<beans>
    <bean id="beanOne" class="x.y.ThingOne">
        <constructor-arg ref="beanTwo"/>
        <constructor-arg ref="beanThree"/>
    </bean>

    <bean id="beanTwo" class="x.y.ThingTwo"/>

    <bean id="beanThree" class="x.y.ThingThree"/>
</beans>
```

>
When another bean is referenced, the type is known, and matching can occur (as was the case with the preceding example). When a simple type is used, such as `<value>true</value>`, Spring cannot determine the type of the value, and so cannot match by type without help. Consider the following class:

위의 예제의 경우를 보면 생성자 인자로 다른 bean이 참조될 때에는 타입이 알려져 있으므로, 인자 매칭이 가능합니다.

- 그러나 만약 `<value>true</value>`와 같이 단순한 타입이 사용된다면,
    - Spring은 값의 타입을 판별하지 못하여, 도움 없이는 매칭을 하지 못합니다.
- 다음 예제 클래스를 읽어 봅시다.

```java
package examples;

public class ExampleBean {

    // Number of years to calculate the Ultimate Answer
    private final int years;

    // The Answer to Life, the Universe, and Everything
    private final String ultimateAnswer;

    public ExampleBean(int years, String ultimateAnswer) {
        this.years = years;
        this.ultimateAnswer = ultimateAnswer;
    }
}
```

**Constructor argument type maching**

>
In the preceding scenario, the container can use type matching with simple types if you explicitly specify the type of the constructor argument by using the `type` attribute, as the following example shows:

위의 시나리오에서는 다음 예제와 같이 여러분이 `type` 속성을 사용해 생성자 인자의 타입을 명시해주면 컨테이너가 간단한 타입들의 타입 매칭을 할 수 있습니다.

```xml
<bean id="exampleBean" class="examples.ExampleBean">
    <constructor-arg type="int" value="7500000"/>
    <constructor-arg type="java.lang.String" value="42"/>
</bean>
```

**Constructor argument index**

>
You can use the `index` attribute to specify explicitly the index of constructor arguments, as the following example shows:

`index` 속성을 사용해서 생성자 인자의 인덱스를 명시해줄 수도 있습니다.

```xml
<bean id="exampleBean" class="examples.ExampleBean">
    <constructor-arg index="0" value="7500000"/>
    <constructor-arg index="1" value="42"/>
</bean>
```

>
In addition to resolving the ambiguity of multiple simple values, specifying an index resolves ambiguity where a constructor has two arguments of the same type.

여러 개의 단순한 타입 값이 있는 경우의 모호성을 해결하기 위한 목적 외에도,
인덱스를 명시하면 같은 타입의 인자가 두 개 있는 경우의 모호성을 해결하는 데에 사용할 수 있습니다.

> (i) The index is 0-based.


- (i) 참고: 인덱스는 0 부터 시작합니다.

**Constructor argument name**

>
You can also use the constructor parameter name for value disambiguation, as the following example shows:

값을 명확히 지정하기 위해 생성자 파라미터의 이름을 사용하는 방법도 있습니다.

```xml
<bean id="exampleBean" class="examples.ExampleBean">
    <constructor-arg name="years" value="7500000"/>
    <constructor-arg name="ultimateAnswer" value="42"/>
</bean>
```

>
Keep in mind that, to make this work out of the box, your code must be compiled with the debug flag enabled so that Spring can look up the parameter name from the constructor. If you cannot or do not want to compile your code with the debug flag, you can use the [@ConstructorProperties]( https://download.oracle.com/javase/8/docs/api/java/beans/ConstructorProperties.html ) JDK annotation to explicitly name your constructor arguments. The sample class would then have to look as follows:

이런 작업이 가능하려면, debug flag 활성화 옵션을 켜고 코드를 컴파일해야 합니다.
- 그래야 Spring이 생성자 파라미터의 이름을 찾을 수 있습니다.
- 만약 debug flag 옵션을 켤 수 없는 상황이라면, JDK 애노테이션인 `@ConstructorProperties`을 써서 생성자 인자의 이름을 명시적으로 지정할 수 있습니다.
    - 예제는 다음과 같습니다.

```java
package examples;

public class ExampleBean {

    // Fields omitted

    @ConstructorProperties({"years", "ultimateAnswer"})
    public ExampleBean(int years, String ultimateAnswer) {
        this.years = years;
        this.ultimateAnswer = ultimateAnswer;
    }
}
```

#### Setter-based Dependency Injection

[원문]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-setter-injection )

>
Setter-based DI is accomplished by the container calling setter methods on your beans after invoking a no-argument constructor or a no-argument `static` factory method to instantiate your bean.
>
The following example shows a class that can only be dependency-injected by using pure setter injection. This class is conventional Java. It is a POJO that has no dependencies on container specific interfaces, base classes, or annotations.

setter 기반의 DI는 다음과 같이 수행됩니다.
- 컨테이너가 기본 생성자를 호출하거나 `static` 팩토리 메소드를 호출해 bean을 초기화합니다.
- 컨테이너가 생성된 bean의 setter 메소드를 호출합니다.

다음 예제는 순수한 setter 주입만을 통해서만 의존관계 주입이 가능한 클래스를 보여줍니다.
- 예제의 클래스는 평범한 Java 코드입니다.
- 예제의 클래스는 컨테이너 스펙 인터페이스나, 베이스 클래스, 애노테이션 등에 의존하지 않는 POJO 입니다.

```java
public class SimpleMovieLister {

    // the SimpleMovieLister has a dependency on the MovieFinder
    private MovieFinder movieFinder;

    // a setter method so that the Spring container can inject a MovieFinder
    public void setMovieFinder(MovieFinder movieFinder) {
        this.movieFinder = movieFinder;
    }

    // business logic that actually uses the injected MovieFinder is omitted...
}
```

>
The `ApplicationContext` supports constructor-based and setter-based DI for the beans it manages. It also supports setter-based DI after some dependencies have already been injected through the constructor approach. You configure the dependencies in the form of a `BeanDefinition`, which you use in conjunction with `PropertyEditor` instances to convert properties from one format to another. However, most Spring users do not work with these classes directly (that is, programmatically) but rather with XML `bean` definitions, annotated components (that is, classes annotated with `@Component`, `@Controller`, and so forth), or `@Bean` methods in Java-based `@Configuration` classes. These sources are then converted internally into instances of `BeanDefinition` and used to load an entire Spring IoC container instance.

`ApplicationContext`는 관리 대상 Bean에 대해 생성자 기반 및 setter 기반 DI를 지원합니다.
- 또한 생성자 방식을 통해 일부 의존관계가 이미 주입된 후의 setter 기반 DI도 지원합니다.
- 속성을 한 포맷에서 다른 포맷으로 변환하기 위해 `PropertyEditor` 인스턴스와 `BeanDefinition` 형식의 조합으로 의존관계를 구성할 수도 있습니다.
- 그러나 대부분의 Spring 사용자는 이러한 클래스를 직접(프로그래밍) 사용하지는 않고 다음과 같은 방법들을 사용합니다.
    - XML `bean` 정의.
    - 애노테이션 컴포넌트(즉, `@Component`, `@Controller`등과 같이 애노테이션이 붙은 클래스).
    - Java 기반의 `@Configuration` 클래스 내에 작성한 `@Bean` 메소드.
    - 이러한 소스들은 내부적으로 `BeanDefinition` 인스턴스로 변환되며, 전체 Spring IoC 컨테이너 인스턴스를 로드하는데 사용됩니다.

**Constructor-based or setter-based ID?**

>
Since you can mix constructor-based and setter-based DI, it is a good rule of thumb to use constructors for mandatory dependencies and setter methods or configuration methods for optional dependencies. Note that use of the [@Required]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-required-annotation ) annotation on a setter method can be used to make the property be a required dependency; however, constructor injection with programmatic validation of arguments is preferable.
>
The Spring team generally advocates constructor injection, as it lets you implement application components as immutable objects and ensures that required dependencies are not `null`. Furthermore, constructor-injected components are always returned to the client (calling) code in a fully initialized state. As a side note, a large number of constructor arguments is a bad code smell, implying that the class likely has too many responsibilities and should be refactored to better address proper separation of concerns.
>
Setter injection should primarily only be used for optional dependencies that can be assigned reasonable default values within the class. Otherwise, not-null checks must be performed everywhere the code uses the dependency. One benefit of setter injection is that setter methods make objects of that class amenable to reconfiguration or re-injection later. Management through [JMX MBeans]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/integration.html#jmx ) is therefore a compelling use case for setter injection.
>
Use the DI style that makes the most sense for a particular class. Sometimes, when dealing with third-party classes for which you do not have the source, the choice is made for you. For example, if a third-party class does not expose any setter methods, then constructor injection may be the only available form of DI.

생성자 기반 DI와 setter 기반의 DI를 조합해서 사용할 수 있습니다.
따라서, 필수적인 의존관계에는 생성자 방식을 사용하고, 옵셔널한 의존관계에는 setter 메소드 방식을 사용하는 것은 좋은 규칙이라 할 수 있습니다.
- setter 메소드에 `@Required` 애노테이션을 사용하면 해당 속성을 필수값으로 지정할 수 있습니다.
- 그러나 프로그래밍 방식의 validation을 통한 생성자 주입 방식이 더 바람직합니다.

스프링 팀은 생성자 주입 방식을 옹호합니다.
- 생성자 주입 방식은 애플리케이션을 구성하는 객체들을 불변 객체로 만들 수 있고, 필수 의존관계들이 `null`이 되지 않도록 해줍니다.
- 또한, 생성자 주입 방식으로 생성된 컴포넌트는 초기화가 완전히 끝난 상태로 클라이언트 코드로 리턴됩니다.
- 첨부하자면 생성자 인자가 너무 많으면 코드에서 나쁜 냄새가 납니다.
    - 이런 경우에는 클래스에 너무 많은 책임이 부여되었을 가능성이 높으므로, 관심사를 적절히 분리하기 위해 리팩토링을 해야 할 수 있습니다.

setter 주입은 주로 클래스 내에서 적절한 기본값을 할당할 수 있는 옵셔널한 의존관계에만 사용해야 합니다.
- 기본값을 주지 않으면 주입된 의존관계를 사용하는 모든 곳에서 `null` 체크를 해줘야 합니다.
- setter 주입의 한 가지 장점은 필요한 경우에 setter 메서드를 통해 나중에 해당 클래스를 재구성하거나, 주입을 다시 할 수도 있다는 것입니다.
    - JMX MBeans는 setter 주입 방식의 바람직한 사용 사레라 할 수 있습니다.

클래스 특성에 적합한 DI 스타일을 사용하세요.
- 어떨 때에는 소스코드를 볼 수 없는 서드 파티 클래스를 다뤄야 할 수도 있습니다.
    - 예를 들어 서드 파티 클래스가 setter 메소드를 전혀 노출하지 않는다면, 생성자 주입이 유일한 DI 방법일 수 있습니다.

#### Dependency Resolution Process

[원문]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-dependency-resolution )

>
The container performs bean dependency resolution as follows:
>
- The `ApplicationContext` is created and initialized with configuration metadata that describes all the beans. Configuration metadata can be specified by XML, Java code, or annotations.
- For each bean, its dependencies are expressed in the form of properties, constructor arguments, or arguments to the static-factory method (if you use that instead of a normal constructor). These dependencies are provided to the bean, when the bean is actually created.
- Each property or constructor argument is an actual definition of the value to set, or a reference to another bean in the container.
- Each property or constructor argument that is a value is converted from its specified format to the actual type of that property or constructor argument. By default, Spring can convert a value supplied in string format to all built-in types, such as `int`, `long`, `String`, `boolean`, and so forth.

컨테이너는 다음과 같이 bean 의존관계 작업을 수행합니다.

- `ApplicationContext`는 configuration 메타데이터를 통해 생성되고 구성됩니다.
    - configuration 메타데이터는 모든 bean을 설명하며 XML, Java 코드, 애노테이션으로 작성할 수 있습니다.
- 각각의 bean에 대한 의존관계는 다음과 같은 형태로 표현됩니다.
    - 클래스 속성, 생성자 인자, 정적 팩토리 메소드 인자
    - 이런 의존관계들은 bean이 생성될 때 bean에 제공됩니다.
- 각각의 속성이나 생성자 인자는 설정에서 정의된 값이거나, 컨테이너에서 관리하고 있는 다른 bean의 참조값입니다.
- 레퍼런스가 아니라 값 타입인 클래스 속성이나 생성자 인자의 경우, 값은 사전에 정의된 포맷으로 변환됩니다.
    - Spring은 `String` 형식으로 제공된 값을 `int`, `long`, `String,` `boolean` 등등과 같은 빌트인 타입으로 변환할 수 있습니다.

>
The Spring container validates the configuration of each bean as the container is created. However, the bean properties themselves are not set until the bean is actually created. Beans that are singleton-scoped and set to be pre-instantiated (the default) are created when the container is created. Scopes are defined in [Bean Scopes]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-factory-scopes ). Otherwise, the bean is created only when it is requested. Creation of a bean potentially causes a graph of beans to be created, as the bean’s dependencies and its dependencies' dependencies (and so on) are created and assigned. Note that resolution mismatches among those dependencies may show up late — that is, on first creation of the affected bean.

Spring 컨테이너가 생성될 때, 각 bean의 구성을 검증하게 됩니다.
- 그러나 bean 속성 자체는 bean이 실제로 생성되기 전까지는 설정되지 않습니다.
- singleton-scope 로 설정되고, pre-instantiated 로 설정된(이 두 설정이 bean의 기본 설정입니다) bean들은 컨테이너가 생성될 때 생성됩니다.
    - scope에 대한 설명은 [Bean Scopes]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-factory-scopes ) 문서를 참고하세요.
- 그 외의 경우, bean은 bean이 요청된 경우에만 생성됩니다.
- bean의 생성은 다양한 다른 bean의 생성을 필요로 할 수 있으며, 생성해야 할 bean 들은 그래프 구조를 이루게 됩니다.
    - 의존관계의 의존관계, 의존관계의 의존관계의 의존관계 등이 생성되고 할당될 수 있기 때문입니다.
- 이러한 의존관계들 사이의 미스 매치는 뒤늦게 드러날 수도 있습니다(영향을 받는 bean의 최초 생성시).

>
**Circular dependencies**
>
If you use predominantly constructor injection, it is possible to create an unresolvable circular dependency scenario.
>
For example: Class A requires an instance of class B through constructor injection, and class B requires an instance of class A through constructor injection. If you configure beans for classes A and B to be injected into each other, the Spring IoC container detects this circular reference at runtime, and throws a `BeanCurrentlyInCreationException`.
>
One possible solution is to edit the source code of some classes to be configured by setters rather than constructors. Alternatively, avoid constructor injection and use setter injection only. In other words, although it is not recommended, you can configure circular dependencies with setter injection.
>
Unlike the typical case (with no circular dependencies), a circular dependency between bean A and bean B forces one of the beans to be injected into the other prior to being fully initialized itself (a classic chicken-and-egg scenario).

**순환 의존관계**

- 만약 여러분이 주로 생성자 주입을 사용한다면, 해결 불가능한 순환 의존관계 시나리오를 만날 수도 있습니다.
    - 예
        - 클래스 A는 생성자를 통해 클래스 B의 인스턴스를 주입받습니다.
        - 클래스 B는 생성자를 통해 클래스 A의 인스턴스를 주입받습니다.
    - 이와 같이 클래스 A, B가 서로를 주입하도록 bean을 구성한다면?
        - Spring IoC 컨테이너는 런타임에 이런 순환참조를 감지하고, `BeanCurrentlyInCreationException` 예외를 던집니다.
- 이런 경우에 대한 한 가지 해결책은 생성자 주입이 아니라 setter 주입을 사용하도록 문제가 발생한 클래스의 코드를 수정하는 것입니다.
    - 또는 생성자 주입을 아예 안 쓰고 setter 주입만 사용할 수도 있습니다.
    - 즉, setter 주입이 권장되는 방식은 아니지만, setter 주입을 쓰면 예외 없이 순환 의존관계를 설정하는 것이 가능합니다.
- 순환 의존관계가 없는 일반적인 경우와 달리, bean A와 bean B 사이의 순환 의존관계는 완전한 초기화가 끝나기 전에 bean 중 하나가 다른 bean에 주입되도록 강제해야 해결 가능합니다.
    - 계란이 먼저인지 닭이 먼저인지의 문제와 같습니다.


>
You can generally trust Spring to do the right thing. It detects configuration problems, such as references to non-existent beans and circular dependencies, at container load-time. Spring sets properties and resolves dependencies as late as possible, when the bean is actually created. This means that a Spring container that has loaded correctly can later generate an exception when you request an object if there is a problem creating that object or one of its dependencies — for example, the bean throws an exception as a result of a missing or invalid property. This potentially delayed visibility of some configuration issues is why `ApplicationContext` implementations by default pre-instantiate singleton beans. At the cost of some upfront time and memory to create these beans before they are actually needed, you discover configuration issues when the `ApplicationContext` is created, not later. You can still override this default behavior so that singleton beans initialize lazily, rather than being eagerly pre-instantiated.

여러분은 대부분의 경우에 Spring이 알아서 잘 할 거라고 신뢰할 수 있습니다.
- Spring은 컨테이너를 로드할 때 다음과 같은 구성 문제들을 찾아냅니다.
    - 존재하지 않는 Bean 참조 문제
    - 순환 의존관계
- Spring은 Bean을 실제로 생성할 때 가능한 한 늦게 속성을 설정하고 의존관계를 연결합니다.
- 이는 Spring 컨테이너가 올바르게 로드되었다면 문제 있는 객체를 요청했을 때 컨테이너가 예외를 발생시킬 것이라는 의미입니다.
    - 생성할 수 없는 객체나 의존관계를 생성하는 데에 문제가 있는 객체
    - 예를 들어, 속성이 누락되었거나 검증에 실패했다면 bean은 예외를 던집니다.
- `ApplicationContext`의 구현체가 bean의 기본값으로 pre-instantiate singleton을 사용하는 이유가 바로 이것 때문입니다.
    - 이렇게 구성 문제를 뒤늦게 보여주는 방식 때문.
- bean이 실제로 필요하기 전에 이렇게 bean을 미리 만들어 두는 데에 업프론트 타임과 메모리를 사용하는 방식으로, 여러분은 configuration 문제를 뒤늦게 알게 되는 것이 아니라 `ApplicationContext`가 생성될 때 발견할 수 있게 됩니다.
- 물론 이런 기본 동작을 오버라이드해서 singleton bean이 pre-instantiate 되지 않고 나중에 초기화되도록 바꿀 수도 있습니다.

>
If no circular dependencies exist, when one or more collaborating beans are being injected into a dependent bean, each collaborating bean is totally configured prior to being injected into the dependent bean. This means that, if bean A has a dependency on bean B, the Spring IoC container completely configures bean B prior to invoking the setter method on bean A. In other words, the bean is instantiated (if it is not a pre-instantiated singleton), its dependencies are set, and the relevant lifecycle methods (such as a [configured init method]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-factory-lifecycle-initializingbean ) or the [InitializingBean callback method]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-factory-lifecycle-initializingbean )) are invoked.

만약 순환 의존관계가 없다면 서로 협업하는 bean 들은 다른 bean에 주입되기 전에 이미 완전히 구성을 마친 상태가 됩니다.
- 가령, bean B에 의존하고 있는 bean A가 있다면, Spring IoC 컨테이너는 먼저 bean B를 완전히 만들어 놓고, bean A의 setter 메소드를 호출한다는 뜻입니다.
- 즉, (pre-instantiated singleton이 아닌)bean이 인스턴스화될 때, 해당 bean의 의존관계가 세팅되며, 라이프사이클 메소드(`configured init method` 또는 `InitializingBean callback method` 같은 것들)가 호출됩니다.

#### Examples of Dependency Injection

[원문]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-some-examples )

>
The following example uses XML-based configuration metadata for setter-based DI. A small part of a Spring XML configuration file specifies some bean definitions as follows:

다음 예제들은 XML 기반의 configuration 메타데이터를 사용하며, setter 기반의 DI를 씁니다.

```xml
<bean id="exampleBean" class="examples.ExampleBean">
    <!-- setter injection using the nested ref element -->
    <property name="beanOne">
        <ref bean="anotherExampleBean"/>
    </property>

    <!-- setter injection using the neater ref attribute -->
    <property name="beanTwo" ref="yetAnotherBean"/>
    <property name="integerProperty" value="1"/>
</bean>

<bean id="anotherExampleBean" class="examples.AnotherBean"/>
<bean id="yetAnotherBean" class="examples.YetAnotherBean"/>
```

>
The following example shows the corresponding `ExampleBean` class:

다음 예제는 위의 XML에 대응하는 `ExampleBean` 클래스를 보여줍니다.

```java
public class ExampleBean {

    private AnotherBean beanOne;

    private YetAnotherBean beanTwo;

    private int i;

    public void setBeanOne(AnotherBean beanOne) {
        this.beanOne = beanOne;
    }

    public void setBeanTwo(YetAnotherBean beanTwo) {
        this.beanTwo = beanTwo;
    }

    public void setIntegerProperty(int i) {
        this.i = i;
    }
}
```

>
In the preceding example, setters are declared to match against the properties specified in the XML file. The following example uses constructor-based DI:

위의 예제를 보면 XML에 설정된 값들에 대응하는 setter 메소드들이 선언되었음을 알 수 있습니다.

다음 예제는 생성자 기반의 DI를 보여줍니다.

```xml
<bean id="exampleBean" class="examples.ExampleBean">
    <!-- constructor injection using the nested ref element -->
    <constructor-arg>
        <ref bean="anotherExampleBean"/>
    </constructor-arg>

    <!-- constructor injection using the neater ref attribute -->
    <constructor-arg ref="yetAnotherBean"/>

    <constructor-arg type="int" value="1"/>
</bean>

<bean id="anotherExampleBean" class="examples.AnotherBean"/>
<bean id="yetAnotherBean" class="examples.YetAnotherBean"/>
```

>
The following example shows the corresponding `ExampleBean` class:

다음 예제는 위의 XML에 대응하는 `ExampleBean` 클래스를 보여줍니다.

```java
public class ExampleBean {

    private AnotherBean beanOne;

    private YetAnotherBean beanTwo;

    private int i;

    public ExampleBean(
        AnotherBean anotherBean, YetAnotherBean yetAnotherBean, int i) {
        this.beanOne = anotherBean;
        this.beanTwo = yetAnotherBean;
        this.i = i;
    }
}
```

>
The constructor arguments specified in the bean definition are used as arguments to the constructor of the `ExampleBean`.
>
Now consider a variant of this example, where, instead of using a constructor, Spring is told to call a static factory method to return an instance of the object:

XML에 정의된 bean의 생성자 인자는 `ExampleBean`의 생성자 인자로 사용됩니다.

이제 이 예제를 생성자 방식이 아니라 정적 팩토리 메소드 방식으로 변형한 예제를 봅시다.

```xml
<bean id="exampleBean" class="examples.ExampleBean" factory-method="createInstance">
    <constructor-arg ref="anotherExampleBean"/>
    <constructor-arg ref="yetAnotherBean"/>
    <constructor-arg value="1"/>
</bean>

<bean id="anotherExampleBean" class="examples.AnotherBean"/>
<bean id="yetAnotherBean" class="examples.YetAnotherBean"/>
```

>
The following example shows the corresponding `ExampleBean` class:

다음 예제는 위의 XML에 대응하는 `ExampleBean` 클래스를 보여줍니다.

```java
public class ExampleBean {

    // a private constructor
    private ExampleBean(...) {
        ...
    }

    // a static factory method; the arguments to this method can be
    // considered the dependencies of the bean that is returned,
    // regardless of how those arguments are actually used.
    public static ExampleBean createInstance (
        AnotherBean anotherBean, YetAnotherBean yetAnotherBean, int i) {

        ExampleBean eb = new ExampleBean (...);
        // some other operations...
        return eb;
    }
}
```

>
Arguments to the `static` factory method are supplied by `<constructor-arg/>` elements, exactly the same as if a constructor had actually been used. The type of the class being returned by the factory method does not have to be of the same type as the class that contains the `static` factory method (although, in this example, it is). An instance (non-static) factory method can be used in an essentially identical fashion (aside from the use of the `factory-bean` attribute instead of the `class` attribute), so we do not discuss those details here.

정적 팩토리 메소드의 인자는 생성자 방식과 똑같이 `<constructor-arg/>` 엘리먼트에 정의된 것을 사용합니다.
- 팩토리 메소드가 리턴하는 클래스의 타입은 정적 팩토리 메소드가 들어있는 클래스의 타입과 똑같지 않아도 됩니다.
    - (이 예제에서는 정적 팩토리 메소드가 리턴하는 타입과, 정적 팩토리 메소드가 정의된 클래스의 타입이 같습니다.)
- 인스턴스 (static이 아닌)팩토리 메소드도 기본적으로는 같은 방법으로 사용할 수 있습니다.
    - `class` 속성 대신 `factory-bean`을 쓴다는 점만 다릅니다.
    - 따라서 인스턴스 팩토리 메소드에 대한 예제는 생략합니다.

### 1.4.2. Dependencies and Configuration in Detail

[원문]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-factory-properties-detailed )

>
As mentioned in the [previous section]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-factory-collaborators ), you can define bean properties and constructor arguments as references to other managed beans (collaborators) or as values defined inline. Spring’s XML-based configuration metadata supports sub-element types within its `<property/>` and `<constructor-arg/>` elements for this purpose.

앞 섹션에서 언급한 바와 같이, bean 속성과 생성자 인자를 설정할 때, 컨테이너가 관리하는 다른 bean(협업 객체)의 레퍼런스나 설정에 정의된 값을 사용할 수 있습니다.

이런 설정을 할 수 있도록 Spring의 XML 기반 configuration 메타데이터는 `<property/>`와 `<constructor-arg/>` 엘리먼트에서 하위 엘리먼트를 사용할 수 있도록 지원합니다.

#### Straight Values (Primitives, Strings, and so on)

[원문]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-value-element )

>
The `value` attribute of the `<property/>` element specifies a property or constructor argument as a human-readable string representation. Spring’s [conversion service]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#core-convert-ConversionService-API ) is used to convert these values from a `String` to the actual type of the property or argument. The following example shows various values being set:

`<property/>` 엘리먼트의 `value` 속성은 단순한 값이나 생성자 인자 같은 것들을 사람이 읽기 좋은 형태의 문자열을 사용합니다.
Spring의 conversion service는 이런 `String` 타입의 값들을 속성값이나 인자 값에 필요한 실제 타입으로 변환해 줍니다.
다음 예제를 참고해 봅시다.

```xml
<bean id="myDataSource" class="org.apache.commons.dbcp.BasicDataSource" destroy-method="close">
    <!-- results in a setDriverClassName(String) call -->
    <property name="driverClassName" value="com.mysql.jdbc.Driver"/>
    <property name="url" value="jdbc:mysql://localhost:3306/mydb"/>
    <property name="username" value="root"/>
    <property name="password" value="misterkaoli"/>
</bean>
```

>
The following example uses the [p-namespace]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-p-namespace ) for even more succinct XML configuration:

다음 예제는 XML 파일을 간결하게 구성하기 위해 p-namespace를 사용합니다.

```xml
<beans xmlns="http://www.springframework.org/schema/beans"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xmlns:p="http://www.springframework.org/schema/p"
    xsi:schemaLocation="http://www.springframework.org/schema/beans
    https://www.springframework.org/schema/beans/spring-beans.xsd">

    <bean id="myDataSource" class="org.apache.commons.dbcp.BasicDataSource"
        destroy-method="close"
        p:driverClassName="com.mysql.jdbc.Driver"
        p:url="jdbc:mysql://localhost:3306/mydb"
        p:username="root"
        p:password="misterkaoli"/>

</beans>
```

>
The preceding XML is more succinct. However, typos are discovered at runtime rather than design time, unless you use an IDE (such as [IntelliJ IDEA]( https://www.jetbrains.com/idea/ ) or the [Spring Tools for Eclipse]( https://spring.io/tools )) that supports automatic property completion when you create bean definitions. Such IDE assistance is highly recommended.
>
You can also configure a `java.util.Properties` instance, as follows:

앞의 XML은 좀 더 간결합니다.
bean 정의를 만들 때 자동 완성을 지원하는 IDE (IntelliJ IDEA 또는 Spring Tools for Eclipse)를 쓴다면 값을 타이핑할 떄 오타를 발견할 수 있으므로, IDE 사용을 적극 권장합니다.

다음과 같이 `java.util.Properties` 인스턴스를 구성하는 방법도 있습니다.

```xml
<bean id="mappings"
    class="org.springframework.context.support.PropertySourcesPlaceholderConfigurer">

    <!-- typed as a java.util.Properties -->
    <property name="properties">
        <value>
            jdbc.driver.className=com.mysql.jdbc.Driver
            jdbc.url=jdbc:mysql://localhost:3306/mydb
        </value>
    </property>
</bean>
```

>
The Spring container converts the text inside the `<value/>` element into a `java.util.Properties` instance by using the JavaBeans `PropertyEditor` mechanism. This is a nice shortcut, and is one of a few places where the Spring team do favor the use of the nested `<value/>` element over the `value` attribute style.

Spring 컨테이너는 JavaBeans `PropertyEditor` 메커니즘을 사용하여 `<value/>` 내부의 텍스트를 `java.util.Properties` 인스턴스로 변환합니다.
이 방법은 멋진 지름길이며 Spring 팀이 `value` 속성 스타일보다 중첩된 `<value/>` 요소를 사용하는 것을 선호하는 몇 안되는 곳 중 하나입니다.


##### The idref element

[원문]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-idref-element )

>
The `idref` element is simply an error-proof way to pass the `id` (a string value - not a reference) of another bean in the container to a `<constructor-arg/>` or `<property/>` element. The following example shows how to use it:

`idref` 엘리먼트는 컨테이너에 있는 다른 빈의 `id`(문자열 값이며, 참조가 아님)를 `<constructor-arg/>` 또는 `<property/>` 엘리먼트에 전달하는 오류 방지 방법입니다.
다음 예제는 사용 방법을 보여줍니다.

```xml
<bean id="theTargetBean" class="..."/>

<bean id="theClientBean" class="...">
    <property name="targetName">
        <idref bean="theTargetBean"/>
    </property>
</bean>
```

>
The preceding bean definition snippet is exactly equivalent (at runtime) to the following snippet:

앞의 bean 정의 스니펫은 다음 스니펫과 정확히 똑같이 평가됩니다.(런타임 기준)

```xml
<bean id="theTargetBean" class="..." />

<bean id="client" class="...">
    <property name="targetName" value="theTargetBean"/>
</bean>
```

>
The first form is preferable to the second, because using the `idref` tag lets the container validate at deployment time that the referenced, named bean actually exists. In the second variation, no validation is performed on the value that is passed to the `targetName` property of the `client` bean. Typos are only discovered (with most likely fatal results) when the `client` bean is actually instantiated. If the `client` bean is a [prototype]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-factory-scopes ) bean, this typo and the resulting exception may only be discovered long after the container is deployed.

첫 번째 방법이 두 번째 방법보다 선호됩니다.
- `idref` 태그를 사용하면 배포시에 컨테이너가 각 bean들(이름을 붙이고, 참조한 bean들)이 실제로 존재하는지 확인할 수 있기 때문입니다.
- 두 번째 방법에서는 id가 `client`인 Bean의 `targetName` 값에 대한 유효성 검증이 수행되지 않습니다.
- 값을 잘못 작성했거나 오타가 있다면
    - `client` bean이 실제로 인스턴스화 될 때만 발견됩니다(꽤나 치명적일 것입니다).
    - 만약 `client` bean이 prototype bean이라면 오타나 예외는 컨테이너가 배포되고 나서 한참 지난 후에 발견될 수도 있습니다.

>
(i) The `local` attribute on the `idref` element is no longer supported in the 4.0 beans XSD, since it does not provide value over a regular `bean` reference any more. Change your existing `idref local` references to `idref bean` when upgrading to the 4.0 schema.

- (i) 참고
    - `idref` 엘리먼트의 `local` 속성은 더 이상 4.0 beans XSD 에서 지원되지 않습니다.
    - 일반적인 Bean 참조값을 제공하지 않기 때문입니다.
    - 만약 4.0 스키마로 업그레이드하려 한다면 기존의 `idref local` 참조를 `idref Bean`으로 변경하세요.

>
A common place (at least in versions earlier than Spring 2.0) where the `<idref/>` element brings value is in the configuration of [AOP interceptors]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#aop-pfb-1 ) in a `ProxyFactoryBean` bean definition. Using `<idref/>` elements when you specify the interceptor names prevents you from misspelling an interceptor ID.

(적어도 Spring 2.0 이전 버전에서) `<idref/>` 엘리먼트가 값을 가져 오는 일반적인 장소는 `ProxyFactoryBean` bean 정의 내에 있는 AOP 인터셉터의 configuration에 있습니다.
- 인터셉터 이름을 지정할 때 `<idref/>` 엘리먼트를 사용하면 인터셉터 ID를 잘못 입력하는 실수를 방지할 수 있습니다.

#### References to Other Beans (Collaborators)

[원문]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-ref-element )

#### Inner Beans

[원문]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-inner-beans )

#### Collections

[원문]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-collection-elements )

#### Null and Empty String Values

[원문]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-null-element )

#### XML Shortcut with the p-namespace

[원문]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-p-namespace )

#### XML Shortcut with the c-namespace

[원문]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-c-namespace )

#### Compound Property Names

[원문]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-compound-property-names )


### 1.4.3. Using depends-on

[원문]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-factory-dependson )

>
If a bean is a dependency of another bean, that usually means that one bean is set as a property of another. Typically you accomplish this with the [`<ref/>` element]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-ref-element ) in XML-based configuration metadata. However, sometimes dependencies between beans are less direct. An example is when a static initializer in a class needs to be triggered, such as for database driver registration. The `depends-on` attribute can explicitly force one or more beans to be initialized before the bean using this element is initialized. The following example uses the `depends-on` attribute to express a dependency on a single bean:

Bean이 다른 Bean의 의존관계이면 한 Bean이 다른 Bean의 프로퍼티로 설정됨을 의미합니다.
- 일반적으로 XML 기반 configuration 메타데이터의 `<ref/>` 엘리먼트를 사용하여 이 작업을 수행합니다.

그러나 때로는 bean 간의 의존이 덜 직접적입니다.
- 예를 들어 데이터베이스 드라이버 등록과 같이 클래스의 정적 이니셜라이저를 트리거해야하는 경우입니다.
- `depend-on` 속성은 Bean이 초기화되기 전에 하나 이상의 Bean을 명시적으로 강제로 초기화하도록 설정할 수 있습니다.
    - 다음 예제는 `depend-on` 속성을 사용하여 다른 Bean에 대한 종속성을 표현합니다.

```xml
<bean id="beanOne" class="ExampleBean" depends-on="manager"/>
<bean id="manager" class="ManagerBean" />
```

>
To express a dependency on multiple beans, supply a list of bean names as the value of the `depends-on` attribute (commas, whitespace, and semicolons are valid delimiters):

`depend-on`에 bean 이름을 여러 개 줄 수도 있습니다. (`,`, `;`, 공백을 구분자로 쓸 수 있다.)

```xml
<bean id="beanOne" class="ExampleBean" depends-on="manager,accountDao">
    <property name="manager" ref="manager" />
</bean>

<bean id="manager" class="ManagerBean" />
<bean id="accountDao" class="x.y.jdbc.JdbcAccountDao" />
```

>
(i) The `depends-on` attribute can specify both an initialization-time dependency and, in the case of [singleton]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-factory-scopes-singleton ) beans only, a corresponding destruction-time dependency. Dependent beans that define a `depends-on` relationship with a given bean are destroyed first, prior to the given bean itself being destroyed. Thus, `depends-on` can also control shutdown order.

`depend-on`은 초기화 시간 의존관계를 지정할 수 있는데...
- 싱글톤 Bean인 경우에는 파괴자 시간 종속성도 지정할 수 있습니다.
    - 주어진 bean에 의존하는 bean은 주어진 bean이 파괴되기 전에 먼저 파괴됩니다.
    - 따라서 `depend-on`은 종료 순서도 제어할 수 있습니다.

### 1.4.4. Lazy-initialized Beans

[원문]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-factory-lazy-init )

>
By default, `ApplicationContext` implementations eagerly create and configure all [singleton]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-factory-scopes-singleton ) beans as part of the initialization process. Generally, this pre-instantiation is desirable, because errors in the configuration or surrounding environment are discovered immediately, as opposed to hours or even days later. When this behavior is not desirable, you can prevent pre-instantiation of a singleton bean by marking the bean definition as being lazy-initialized. A lazy-initialized bean tells the IoC container to create a bean instance when it is first requested, rather than at startup.

기본적으로 `ApplicationContext` 구현체는 초기화 프로세스의 일부로 모든 싱글톤 Bean을 조급하게(eagerly) 생성하고 구성합니다.

일반적으로는 이렇게 미리 인스턴스를 만들어 두는 것이 바람직합니다.
- 이렇게 미리 인스턴스를 만들면 configuration 오류나 환경 설정 오류가 즉시 발견되기 때문.
- 만약 이런 식의 동작이 필요하지 않다면 bean 정의에 지연 초기화(lazy-initialized)를 설정할 수 있습니다.
    - lazy-initialized bean은 애플리케이션이 가동될 때가 아니라 bean이 처음으로 요청될 때 IoC 컨테이너에서 만들어집니다.

>
In XML, this behavior is controlled by the `lazy-init` attribute on the `<bean/>` element, as the following example shows:

XML에서는 다음과 같이 `<bean/>` 엘리먼트의 `lazy-init` 속성으로 설정할 수 있습니다.

```xml
<bean id="lazy" class="com.something.ExpensiveToCreateBean" lazy-init="true"/>
<bean name="not.lazy" class="com.something.AnotherBean"/>
```

>
When the preceding configuration is consumed by an `ApplicationContext`, the `lazy` bean is not eagerly pre-instantiated when the `ApplicationContext` starts, whereas the `not.lazy` bean is eagerly pre-instantiated.

- `lazy` bean은 `ApplicationContext`가 시작되는 시점에 인스턴스화되지 않습니다.
- 그러나 `not.lazy` bean은 조급하게 인스턴스화됩니다.

>
However, when a lazy-initialized bean is a dependency of a singleton bean that is not lazy-initialized, the `ApplicationContext` creates the lazy-initialized bean at startup, because it must satisfy the singleton’s dependencies. The lazy-initialized bean is injected into a singleton bean elsewhere that is not lazy-initialized.

- 그러나 아무리 lazy-initialized bean이라 하더라도 lazy-initialized가 아닌 singleton bean의 의존관계라면
    - `ApplicationContext`는 시작되는 시점에 lazy-initialized bean을 생성합니다.
    - 이는 해당 bean의 의존관계를 충족시켜서 생성해야 하기 때문입니다.
    - 따라서 lazy-initialized bean은 lazy-initialized가 아닌 singleton bean에 주입되는 것입니다.

>
You can also control lazy-initialization at the container level by using the `default-lazy-init` attribute on the `<beans/>` element, as the following example shows:

다음 예제와 같이 `<beans/>` 엘리먼트의 `default-lazy-init` 속성을 사용하여 컨테이너 수준에서 지연 초기화를 제어할 수도 있습니다.

```xml
<beans default-lazy-init="true">
    <!-- no beans will be pre-instantiated... -->
</beans>
```

### 1.4.5. Autowiring Collaborators

[원문]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-factory-autowire )

## 함께 읽기

- 목록으로 - [[/spring/document/core]]{Spring Core Technologies}
- 이전 문서 - [[/spring/document/core/01-03-bean-overview]]{1.3. Bean Overview}
- 다음 문서 - [[/spring/document/core/01-05-bean-scopes]]{1.5. Bean Scopes}
- [Interface BeanDefinition (Spring 5.3.7)]( https://docs.spring.io/spring-framework/docs/5.3.7/javadoc-api/org/springframework/beans/factory/config/BeanDefinition.html )

## 참고문헌

- [Core Technologies (docs.spring.io)][5-3-7-core] - 5.3.7 버전

[5-3-7-core]: https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html

