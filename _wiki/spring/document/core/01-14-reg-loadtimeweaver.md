---
layout  : wiki
title   : Spring Core Technologies - 1.14. Registering a LoadTimeWeaver
summary : 
date    : 2021-07-24 19:42:31 +0900
updated : 2021-07-24 22:02:28 +0900
tag     : java spring
resource: FD/50E496-6523-4E4A-9D6E-C5F940E2DD1D
toc     : true
public  : true
parent  : [[/spring/document/core]]
latex   : false
---
* TOC
{:toc}

- 목록으로 - [[/spring/document/core]]
- 이전 문서 - [[/spring/document/core/01-13-env-abstraction]]
- 다음 문서 - [[/spring/document/core/01-15-additional-capabilities-ac]]

## 1.14. Registering a LoadTimeWeaver

[원문]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#context-load-time-weaver )

>
The `LoadTimeWeaver` is used by Spring to dynamically transform classes as they are loaded into the Java virtual machine (JVM).
>
To enable load-time weaving, you can add the `@EnableLoadTimeWeaving` to one of your `@Configuration` classes, as the following example shows:

`LoadTimeWeaver`는 클래스가 JVM에 로드될 때 Spring이 해당 클래스를 동적으로 변환하기 위해 사용됩니다.

로드 타입 weaving을 활성화하려면 다음 예제와 같이 `@Configuration` 클래스 중 하나에 `@EnableLoadTimeWeaving`을 추가하면 됩니다.

```java
@Configuration
@EnableLoadTimeWeaving
public class AppConfig {
}
```

>
Alternatively, for XML configuration, you can use the `context:load-time-weaver` element:

XML configuration으로는, `context:load-time-weaver` element를 사용하면 됩니다.

```xml
<beans>
    <context:load-time-weaver/>
</beans>
```

>
Once configured for the `ApplicationContext`, any bean within that `ApplicationContext` may implement `LoadTimeWeaverAware`, thereby receiving a reference to the load-time weaver instance. This is particularly useful in combination with [Spring’s JPA support]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/data-access.html#orm-jpa ) where load-time weaving may be necessary for JPA class transformation. Consult the [`LocalContainerEntityManagerFactoryBean`]( https://docs.spring.io/spring-framework/docs/5.3.7/javadoc-api/org/springframework/orm/jpa/LocalContainerEntityManagerFactoryBean.html ) javadoc for more detail. For more on AspectJ load-time weaving, see [Load-time Weaving with AspectJ in the Spring Framework]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#aop-aj-ltw ).

위와 같이 config하고 나면 해당 `ApplicationContext` 내의 모든 bean은 `LoadTimeWeaverAware`를 구현하여 load-time weaver 인스턴스에 대한 참조를 전달받을 수 있습니다.

JPA 클래스 변환에는 로드 타임 위빙이 필요하기 때문에, 특히 Spring의 JPA 지원과 함께 사용할 때 이 기능은 특히 유용하다고 할 수 있습니다.

자세한 내용은 `LocalContainerEntityManagerFactoryBean`의 javadoc을 참고하세요.
그리고 AspectJ 로드 타입 위빙에 대한 자세한 내용은 [Load-time Weaving with AspectJ in the Spring Framework]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#aop-aj-ltw ) 문서를 참고하세요.



## 함께 읽기

- 목록으로 - [[/spring/document/core]]
- 이전 문서 - [[/spring/document/core/01-13-env-abstraction]]
- 다음 문서 - [[/spring/document/core/01-15-additional-capabilities-ac]]

