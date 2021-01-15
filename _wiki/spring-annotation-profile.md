---
layout  : wiki
title   : Spring @Profile 애노테이션
summary : 
date    : 2021-01-10 17:19:33 +0900
updated : 2021-01-15 22:53:52 +0900
tag     : spring
toc     : true
public  : true
parent  : [[spring]]
latex   : false
---
* TOC
{:toc}

- 이 문서는 다음 두 문서를 참고합니다.
    - [docs.spring.io][javadoc]
    - [dc6f63f610ab0278c8c9d2c5c7cbbebb9928ec91][source-code] 버전의 소스코드

## JavaDoc

>
Indicates that a component is eligible for registration when one or more specified profiles are active.
>
A profile is a named logical grouping that may be activated programmatically via `ConfigurableEnvironment.setActiveProfiles(java.lang.String...)` or declaratively by setting the `spring.profiles.active` property as a JVM system property, as an environment variable, or as a Servlet context parameter in web.xml for web applications. Profiles may also be activated declaratively in integration tests via the `@ActiveProfiles` annotation.
>
The `@Profile` annotation may be used in any of the following ways:
>
- as a type-level annotation on any class directly or indirectly annotated with `@Component`, including `@Configuration` classes
- as a meta-annotation, for the purpose of composing custom stereotype annotations
- as a method-level annotation on any [[spring-annotation-bean]]{@Bean} method

하나 이상의 지정된 profile이 활성화되어 있다면 해당 profile의 설정을 등록할 수 있다.

- profile은 다음 방법들로 활성화할 수 있는 논리적 그룹이다. 논리적 그룹은 이름을 갖는다.
    - `ConfigurableEnvironment.setActiveProfiles(java.lang.String...)`을 통해 프로그래밍 방식으로 활성화.
    - `spring.profiles.active` 속성을 JVM 시스템 속성이나 환경 변수로 지정.
    - `web.xml`에서 Servlet context 파라미터로 설정.

`@Profile`은 다음과 같이 사용할 수 있다.

- `@Configuration`을 포함한 모든 `@Component` 클래스 애노테이션.
- 커스텀 스테레오 타입 애노테이션을 위한 메타 애노테이션.
- 모든 [[spring-annotation-bean]]{@Bean 메소드 애노테이션}.

>
If a `@Configuration` class is marked with `@Profile`, all of the [[spring-annotation-bean]]{@Bean} methods and `@Import` annotations associated with that class will be bypassed unless one or more of the specified profiles are active. A profile string may contain a simple profile name (for example "p1") or a profile expression. A profile expression allows for more complicated profile logic to be expressed, for example "p1 & p2". See `Profiles.of(String...)` for more details about supported formats.

- `@Configuration` 클래스에 `@Profile` 애노테이션이 붙어있고, 지정된 프로파일이 활성화된 상태라면, [[spring-annotation-bean]]{@Bean}이 붙은 모든 메소드와 `@Import` 애노테이션은 해당 클래스와 함께 작동한다.

profile 문자열은 다음 방법으로 지정할 수 있다.
- 프로파일 이름을 의미하는 문자열
- 프로파일 표현식 - [Profiles.of(String...)]( https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/core/env/Profiles.html#of-java.lang.String...- ) 메소드 주석을 참고할 것.
    - `"p1 & p2"` 처럼 입력하는 것도 가능하다.

>
This is analogous to the behavior in Spring XML: if the profile attribute of the beans element is supplied e.g., `<beans profile="p1,p2">`, the beans element will not be parsed unless at least profile 'p1' or 'p2' has been activated. Likewise, if a `@Component` or `@Configuration` class is marked with `@Profile({"p1", "p2"})`, that class will not be registered or processed unless at least profile 'p1' or 'p2' has been activated.
>
If a given profile is prefixed with the NOT operator (!), the annotated component will be registered if the profile is not active — for example, given `@Profile({"p1", "!p2"})`, registration will occur if profile 'p1' is active or if profile 'p2' is not active.
>
If the @Profile annotation is omitted, registration will occur regardless of which (if any) profiles are active.

- `@Component`나 `@Configuration` 클래스에 `@Profile({"p1", "p2"})`로 지정했다면,
    - `p1` 이나 `p2` 중 적어도 하나는 활성화되어 있어야 해당 클래스가 등록이 된다.
    - 스프링 XML에서 `<beans profile="p1,p2">`로 설정하는 것과 같다.
- `!` 연산자가 붙어있으면?
    - 해당 프로파일이 활성화되지 않아야 `@Profile` 애노테이션이 붙은 컴포넌트가 등록이 된다.
    - 예: `@Profile({"p1", "!p2"})` 라면 `p1`이 활성화되어 있거나, `p2`가 활성화되어 있지 않아야 등록된다.
- 만약 `@Profile`을 생략한다면?
    - 모든 프로파일에서 컴포넌트가 등록된다.

>
NOTE: With `@Profile` on [[spring-annotation-bean]]{@Bean} methods, a special scenario may apply: In the case of overloaded [[spring-annotation-bean]]{@Bean} methods of the same Java method name (analogous to constructor overloading), an `@Profile` condition needs to be consistently declared on all overloaded methods. If the conditions are inconsistent, only the condition on the first declaration among the overloaded methods will matter. `@Profile` can therefore not be used to select an overloaded method with a particular argument signature over another; resolution between all factory methods for the same bean follows Spring's constructor resolution algorithm at creation time. Use distinct Java method names pointing to the same bean name if you'd like to define alternative beans with different profile conditions; see ProfileDatabaseConfig in `@Configuration`'s javadoc.

`@Profile`을 [[spring-annotation-bean]]{@Bean} 메소드에 사용할 때, [[spring-annotation-bean]]{@Bean}이 달린 메소드가 오버로딩된 경우.
- 모든 오버로딩 메소드에 `@Profile`을 붙이도록 하자.
- 만약 오버로딩 메소드들에 붙은 `@Profile` 조건이 모순된다면, 오버로딩된 메소드들 중 첫번째 메소드에 선언된 조건이 사용된다.

### 프로파일 표현식

프로파일 표현식은 [Profiles.of(String...)]( https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/core/env/Profiles.html#of-java.lang.String...- ) 메소드 주석을 읽어보면 자세히 설명되어 있다.

- `!` - logical NOT
- `&` - logical AND
- `|` - logical OR

프로파일을 복잡하게 설정할 일은 드물지만, 만약 `&`과 `|`을 함께 사용하게 되면 반드시 괄호를 사용하도록 하자.

```java
// 잘못된 표현식
@Profile("a & b | c")

// 문제 없는 표현식
@Profile("(a & b) | c")
@Profile("a & (b | c)")
```


## 소스 코드

```java
@Target({ElementType.TYPE, ElementType.METHOD})
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Conditional(ProfileCondition.class)
public @interface Profile {

  /**
   * The set of profiles for which the annotated component should be registered.
   */
  String[] value();
}
```

## 참고문헌

- [docs.spring.io][javadoc]
- [dc6f63f610ab0278c8c9d2c5c7cbbebb9928ec91][source-code] 버전의 소스코드
- [Profiles.of(String...)]( https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/core/env/Profiles.html#of-java.lang.String...- )

## 주석

[javadoc]: https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/context/annotation/Profile.html
[source-code]: https://github.com/spring-projects/spring-framework/blob/dc6f63f610ab0278c8c9d2c5c7cbbebb9928ec91/spring-context/src/main/java/org/springframework/context/annotation/Profile.java

