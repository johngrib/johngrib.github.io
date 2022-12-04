---
layout  : wiki
title   : Spring Core Technologies - 1.16. The BeanFactory
summary : 
date    : 2021-07-28 20:30:12 +0900
updated : 2021-08-01 16:13:13 +0900
tag     : java spring
resource: 24/9668B0-0546-41A7-B9F0-6A9F241A456D
toc     : true
public  : true
parent  : [[/spring/document/core]]
latex   : false
---
* TOC
{:toc}

- 목록으로 - [[/spring/document/core]]
- 이전 문서 - [[/spring/document/core/01-15-additional-capabilities-ac]]
- 다음 문서 - [[/spring/document/core/02-resources]]

## 1.16. The `BeanFactory`

[원문]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-beanfactory )

>
The `BeanFactory` API provides the underlying basis for Spring’s IoC functionality.
Its specific contracts are mostly used in integration with other parts of Spring and related third-party frameworks, and its `DefaultListableBeanFactory` implementation is a key delegate within the higher-level `GenericApplicationContext` container.

`BeanFactory` API는 Spring의 IoC 기능을 위한 토대롤 제공합니다.
contract 대부분은 Spring의 다른 부분이나 서드 파티 프레임워크와의 통합을 위한 것이며, 그 중 `DefaultListableBeanFactory` 구현체는 고수준 `GenericApplicationContext` 컨테이너의 핵심적인 대리자가 됩니다.

>
`BeanFactory` and related interfaces (such as `BeanFactoryAware`, `InitializingBean`, `DisposableBean`) are important integration points for other framework components.
By not requiring any annotations or even reflection, they allow for very efficient interaction between the container and its components.
Application-level beans may use the same callback interfaces but typically prefer declarative dependency injection instead, either through annotations or through programmatic configuration.

`BeanFactory`와 그와 관련된 인터페이스들(`BeanFactoryAware`, `InitializingBean`, `DisposableBean` 같은 것들)은 다른 프레임워크 컴포넌트에 대한 중요한 통합 지점입니다.
이들은 애노테이션이나 리플렉션에 의존하지 않고 있으므로 컨테이너와 컴포넌트 간의 상호작용이 매우 효율적입니다.
애플리케이션 레벨의 bean들은 동일한 callback 인터페이스를 사용하는 것이 가능하지만, 일반적으로는 애노테이션이나 프로그래밍 방식의 configuration을 통해 선언적 의존관계 주입하는 경우가 많습니다.

>
Note that the core `BeanFactory` API level and its `DefaultListableBeanFactory` implementation do not make assumptions about the configuration format or any component annotations to be used.
All of these flavors come in through extensions (such as `XmlBeanDefinitionReader` and `AutowiredAnnotationBeanPostProcessor`) and operate on shared `BeanDefinition` objects as a core metadata representation.
This is the essence of what makes Spring’s container so flexible and extensible.

코어 `BeanFactory` API 레벨과, 그것의 `DefaultListableBeanFactory` 구현은 어떤 종류의 configuration 포맷을 사용하고, 어떤 컴포넌트 애노테이션을 사용할지에 대해 아무것도 전제하지 않고 있습니다.
이러한 구체적인 특징들은 확장(`XmlBeanDefinitionReader`, `AutowiredAnnotationBeanPostProcessor` 같은 것들)을 통해 제공되며, 코어 메타데이터의 표현은 공유된 `BeanDefinition` 객체를 사용합니다.
이것이 바로 Spring 컨테이너를 유연하고 확장 가능하게 만드는 핵심 기술이라 할 수 있습니다.

### 1.16.1. `BeanFactory` or `ApplicationContext`?

[원문]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#context-introduction-ctx-vs-beanfactory )

>
This section explains the differences between the `BeanFactory` and `ApplicationContext` container levels and the implications on bootstrapping.

이 섹션에서는 `BeanFactory`와 `ApplicationContext` 컨테이너 레벨의 차이점과 부트스트래핑에 대해 설명합니다.

>
You should use an `ApplicationContext` unless you have a good reason for not doing so, with `GenericApplicationContext` and its subclass `AnnotationConfigApplicationContext` as the common implementations for custom bootstrapping.
These are the primary entry points to Spring’s core container for all common purposes:
loading of configuration files, triggering a classpath scan, programmatically registering bean definitions and annotated classes, and (as of 5.0) registering functional bean definitions.

특별한 이유가 있는 경우가 아니라면 `ApplicationContext`를 사용해야 합니다. 그리고 커스텀 부트스트래핑에 대한 공통 구현으로는 `GenericApplicationContext`와 그 서브 클래스인 `AnnotationConfigApplicationContext`를 사용하도록 합니다.
이것들은 모두 Spring의 핵심 컨테이너에 대한 기본 진입점이며, 공통적으로 다음과 같은 목적을 지니고 있습니다.

- configuration 파일 로딩
- classpath 스캔 트리거
- 프로그래밍 방식으로 bean definition과 애노테이션이 붙은 클래스 등록, 그리고 (5.0 버전 기준) functional bean definition 등록

>
Because an `ApplicationContext` includes all the functionality of a `BeanFactory`, it is generally recommended over a plain `BeanFactory`, except for scenarios where full control over bean processing is needed.
Within an `ApplicationContext` (such as the `GenericApplicationContext` implementation), several kinds of beans are detected by convention (that is, by bean name or by bean type — in particular, post-processors), while a plain `DefaultListableBeanFactory` is agnostic about any special beans.

`ApplicationContext`는 `BeanFactory`의 모든 기능을 포함하고 있어서, 일반적으로 bean 처리에 대한 완벽한 제어가 필요한 경우가 아니라면 순수한 `BeanFactory`보다 `ApplicationContext`를 쓰는 것이 권장됩니다.
`ApplicationContext`(`GenericApplicationContext` 구현체 같은) 내에서 순수한 `DefaultListableBeanFactory`는 모든 특수한 bean에 대해 알지 못하는 반면, 몇몇 종류의 bean은 컨벤션(bean 이름이나 bean 타입, 특히 post-processors)에 의해 감지가 됩니다.

>
For many extended container features, such as annotation processing and AOP proxying, the [`BeanPostProcessor` extension point]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-factory-extension-bpp ) is essential.
If you use only a plain `DefaultListableBeanFactory`, such post-processors do not get detected and activated by default.
This situation could be confusing, because nothing is actually wrong with your bean configuration. Rather, in such a scenario, the container needs to be fully bootstrapped through additional setup.

애노테이션 프로세싱과 AOP 프록싱과 같은 확장된 컨테이너 기능의 경우 `BeanPostProcessor` 확장 지점이 필수적입니다.
만약 순수한 `DefaultListableBeanFactory`만 사용하고 있다면, 기본적으로 post-processors는 감지되지 않으며 활성화되지도 않습니다.
이런 상황은 꽤 헷갈릴 수도 있는데, bean configuration에 실제로 잘못된 것이 없기 때문입니다.
오히려 이런 경우에는 추가 설정을 사용해 컨테이너를 완전히 부트스트랩해야 합니다.

>
The following table lists features provided by the `BeanFactory` and `ApplicationContext` interfaces and implementations.

다음 표는 `BeanFactory`, `ApplicationContext` 인터페이스와 그 구현체에서 제공하는 기능들의 목록입니다.

> Table 9. Feature Matrix
>
> | Feature                                                 | BeanFactory | ApplicationContext |
> |---------------------------------------------------------|-------------|--------------------|
> | Bean instantiation/wiring                               | Yes         | Yes                |
> | Integrated lifecycle management                         | No          | Yes                |
> | Automatic `BeanPostProcessor` registration              | No          | Yes                |
> | Automatic `BeanFactoryPostProcessor` registration       | No          | Yes                |
> | Convenient `MessageSource` access (for internalization) | No          | Yes                |
> | Built-in `ApplicationEvent` publication mechanism       | No          | Yes                |


>
To explicitly register a bean post-processor with a `DefaultListableBeanFactory`, you need to programmatically call `addBeanPostProcessor`, as the following example shows:

`DefaultListableBeanFactory`에 bean post-processor를 명시적으로 등록하려면 다음 예제와 같이 프로그래밍 방식으로 `addBeanPostProcessor`를 호출해야 합니다.

```java
DefaultListableBeanFactory factory = new DefaultListableBeanFactory();
// populate the factory with bean definitions

// now register any needed BeanPostProcessor instances
factory.addBeanPostProcessor(new AutowiredAnnotationBeanPostProcessor());
factory.addBeanPostProcessor(new MyBeanPostProcessor());

// now start using the factory
```

>
To apply a `BeanFactoryPostProcessor` to a plain `DefaultListableBeanFactory`, you need to call its `postProcessBeanFactory` method, as the following example shows:

`BeanFactoryPostProcessor`를 순수한 `DefaultListableBeanFactory`에 적용하려면, `postProcessBeanFactory` 메소드를 다음 예제와 같이 호출해야 합니다.

```java
DefaultListableBeanFactory factory = new DefaultListableBeanFactory();
XmlBeanDefinitionReader reader = new XmlBeanDefinitionReader(factory);
reader.loadBeanDefinitions(new FileSystemResource("beans.xml"));

// bring in some property values from a Properties file
PropertySourcesPlaceholderConfigurer cfg = new PropertySourcesPlaceholderConfigurer();
cfg.setLocation(new FileSystemResource("jdbc.properties"));

// now actually do the replacement
cfg.postProcessBeanFactory(factory);
```

>
In both cases, the explicit registration steps are inconvenient, which is why the various `ApplicationContext` variants are preferred over a plain `DefaultListableBeanFactory` in Spring-backed applications, especially when relying on `BeanFactoryPostProcessor` and `BeanPostProcessor` instances for extended container functionality in a typical enterprise setup.

위의 두 가지 경우 모두 명시적인 등록 단계가 좀 불편하게 되어 있습니다.
이것이 바로 일반적인 엔터프라이즈 설정에서 확장된 컨테이너 기능을 위해 `BeanFactoryPostProcessor`와 `BeanPostProcessor` 인스턴스에 의존할 때,
Spring 기반의 애플리케이션이 순수한 `DefaultListableBeanFactory`보다 다양한 `ApplicationContext` 변형의 사용을 선호하는지에 대한 이유라 할 수 있습니다.

> (i)
An `AnnotationConfigApplicationContext` has all common annotation post-processors registered and may bring in additional processors underneath the covers through configuration annotations, such as `@EnableTransactionManagement`. At the abstraction level of Spring’s annotation-based configuration model, the notion of bean post-processors becomes a mere internal container detail.
{:style="background-color: #ecf1e8;"}

- (i)
    - `AnnotationConfigApplicationContext`에는 모든 common annotation post-processors가 등록되어 있으며 `@EnableTransactionManagement`와 같은 configuration annotation을 통해 추가 프로세서를 가져올 수 있습니다.
    - Spring의 애노테이션 기반의 configuration 모델의 추상화 레벨에서 bean post-processors의 개념은 단순한 컨테이너 내부의 세부 사항인 것입니다.


## 함께 읽기

- 목록으로 - [[/spring/document/core]]
- 이전 문서 - [[/spring/document/core/01-15-additional-capabilities-ac]]
- 다음 문서 - [[/spring/document/core/02-resources]]

