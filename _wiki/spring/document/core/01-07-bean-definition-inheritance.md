---
layout  : wiki
title   : Spring Core Technologies - 1.7. Bean Definition Inheritance
summary : 
date    : 2021-06-27 13:58:51 +0900
updated : 2021-07-10 20:50:47 +0900
tag     : java spring
resource: F8/83166F-7E74-4665-8136-042A15C1EF38
toc     : true
public  : true
parent  : [[/spring/document/core]]
latex   : false
---
* TOC
{:toc}

- 목록으로 - [[/spring/document/core]]{Spring Core Technologies}
- 이전 문서 - [[/spring/document/core/01-06-customizing-the-nature-of-a-bean]]{1.6. Customizing the Nature of a Bean}
- 다음 문서 - [[/spring/document/core/01-08-container-extension-points]]{1.8. Container Extension Points}

## 1.7. Bean Definition Inheritance

[원문]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-child-bean-definitions )

>
A bean definition can contain a lot of configuration information, including constructor arguments, property values, and container-specific information, such as the initialization method, a static factory method name, and so on. A child bean definition inherits configuration data from a parent definition. The child definition can override some values or add others as needed. Using parent and child bean definitions can save a lot of typing. Effectively, this is a form of templating.

bean 정의에는 수많은 설정 정보가 들어 있습니다.
- 생성자 인자
- 프로퍼티 값들
- 컨테이너 관련 정보
    - 초기화 메소드
    - 정적 팩토리 메소드 이름
    - 등
- 등

자식 bean 정의는 부모 정의에서 설정 데이터를 상속받습니다.
- 자식 bean 정의는 일부 값을 재정의하거나 필요에 따라 다른 값을 추가할 수 있습니다.
- 부모나 자식 bean 정의를 사용하면 타이핑하는 수고를 많이 줄일 수 있습니다.
    - 사실, 이 방법은 템플릿 방식의 한 가지 형태입니다.

>
If you work with an `ApplicationContext` interface programmatically, child bean definitions are represented by the `ChildBeanDefinition` class. Most users do not work with them on this level. Instead, they configure bean definitions declaratively in a class such as the `ClassPathXmlApplicationContext`. When you use XML-based configuration metadata, you can indicate a child bean definition by using the `parent` attribute, specifying the parent bean as the value of this attribute. The following example shows how to do so:

`ApplicationContext` 인터페이스를 프로그래밍 방식으로 사용하는 경우라면, 자식 bean 정의는 `ChildBeanDefinition` 클래스로 표현됩니다.
- 대부분의 사용자는 이 정도 레벨까지 작업하지는 않습니다.
- 그 대신, `ClassPathXmlApplicationContext`와 같은 클래스를 사용해 선언적으로 bean 정의를 설정합니다.
- XML 기반의 configuration 메타데이터를 사용하는 경우에는 자식 bean 정의에 `parent` attribute를 사용해 부모 bean을 지정할 수 있습니다.

```xml
<bean id="inheritedTestBean" abstract="true"
        class="org.springframework.beans.TestBean">
    <property name="name" value="parent"/>
    <property name="age" value="1"/>
</bean>

<bean id="inheritsWithDifferentClass"
        class="org.springframework.beans.DerivedTestBean"
        parent="inheritedTestBean" init-method="initialize">  <!-- (1) -->
    <property name="name" value="override"/>
    <!-- the age property value of 1 will be inherited from parent -->
</bean>
```

>
(1) Note the parent attribute.

(1) 부분이 `parent` attribute를 사용한 곳입니다.

>
A child bean definition uses the bean class from the parent definition if none is specified but can also override it. In the latter case, the child bean class must be compatible with the parent (that is, it must accept the parent’s property values).

자식 bean 정의는 설정된 게 없을 경우에는 parent 정의의 bean 클래스를 사용하지만, 오버라이드하는 것도 가능합니다.
- 후자의 경우 자식 bean 클래스는 부모 bean과 호환되어야 합니다.
    - (부모의 프로퍼티 값을 허용해야 합니다.)

>
A child bean definition inherits scope, constructor argument values, property values, and method overrides from the parent, with the option to add new values. Any scope, initialization method, destroy method, or `static` factory method settings that you specify override the corresponding parent settings.

자식 bean 정의는 새로운 값을 추가하는 옵션과 함께 부모 bean으로부터 다음을 상속받습니다.

- 스코프
- 생성자 인자 값
- 프로퍼티 값
- 부모의 메소드 오버라이드

스코프, 초기화 메소드, 소멸 메소드, 또는 `static` 팩토리 메소드 셋팅은 해당 부모의 셋팅을 오버라이드합니다.

>
The remaining settings are always taken from the child definition: depends on, autowire mode, dependency check, singleton, and lazy init.

나머지 설정은 항상 자식의 정의에서 가져옵니다: depends on, autowire mode, dependency check, singleton, 그리고 lazy init.

>
The preceding example explicitly marks the parent bean definition as abstract by using the `abstract` attribute. If the parent definition does not specify a class, explicitly marking the parent bean definition as `abstract` is required, as the following example shows:

위의 예제는 `abstract` attribute를 사용하여 명시적으로 부모 bean 정의를 추상적으로 표현합니다.

부모 정의가 클래스를 지정하지 않으면 다음 예제와 같이 부모 bean 정의를 `abstract`로 명시해야 합니다.

```xml
<bean id="inheritedTestBeanWithoutClass" abstract="true">
    <property name="name" value="parent"/>
    <property name="age" value="1"/>
</bean>

<bean id="inheritsWithClass" class="org.springframework.beans.DerivedTestBean"
        parent="inheritedTestBeanWithoutClass" init-method="initialize">
    <property name="name" value="override"/>
    <!-- age will inherit the value of 1 from the parent bean definition-->
</bean>
```

>
The parent bean cannot be instantiated on its own because it is incomplete, and it is also explicitly marked as `abstract`. When a definition is `abstract`, it is usable only as a pure template bean definition that serves as a parent definition for child definitions. Trying to use such an `abstract` parent bean on its own, by referring to it as a ref property of another bean or doing an explicit `getBean()` call with the parent bean ID returns an error. Similarly, the container’s internal `preInstantiateSingletons()` method ignores bean definitions that are defined as abstract.

부모 bean은 인스턴스화할 수 없으며 `abstract`로 명시됩니다.
- bean 정의가 `abstract`일 경우라면, 자식 정의에 대한 부모 정의 역할을 하는 순수한 템플릿 bean 정의로만 사용할 수 있습니다.
- 만약 `abstract` 부모 bean을 다른 bean의 ref 속성으로 참조하거나, 부모 bean의 ID로 `getBean()`을 호출하는 방식으로 `abstract` 부모 bean을 사용하려 하면 예외를 리턴하게 됩니다.

이와 마찬가지로 컨테이너의 내부에 있는 `preInstantiateSingletons()` 메소드는 abstract로 정의된 bean 정의를 무시합니다.

> (i)
`ApplicationContext` pre-instantiates all singletons by default. Therefore, it is important (at least for singleton beans) that if you have a (parent) bean definition which you intend to use only as a template, and this definition specifies a class, you must make sure to set the abstract attribute to true, otherwise the application context will actually (attempt to) pre-instantiate the `abstract` bean.

- (i) 참고
    - `ApplicationContext`는 기본적으로 모든 싱글톤을 사전에 인스턴스화합니다.
    - 그러므로 템플릿으로만 사용하려는 (부모) bean 정의가 있고, 이 정의가 클래스를 지정하는 경우(적어도 싱글톤 bean인 경우)는 중요합니다.
    - 이 정의가 클래스를 지정하는 경우 `abstract` 속성을 `true`로 설정해야 합니다.
        - 이렇게 하지 않으면 애플리케이션 컨텍스트는 `abstract` bean을 abstract bean을 인스턴스화하려고 (시도)할 것입니다.

## 함께 읽기

- 목록으로 - [[/spring/document/core]]{Spring Core Technologies}
- 이전 문서 - [[/spring/document/core/01-06-customizing-the-nature-of-a-bean]]{1.6. Customizing the Nature of a Bean}
- 다음 문서 - [[/spring/document/core/01-08-container-extension-points]]{1.8. Container Extension Points}

