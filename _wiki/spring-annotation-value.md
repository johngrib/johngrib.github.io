---
layout  : wiki
title   : Spring @Value 애노테이션
summary : 환경 변수값을 주입할 수 있다
date    : 2020-11-29 22:06:37 +0900
updated : 2020-11-29 22:24:00 +0900
tag     : spring java annotation
toc     : true
public  : true
parent  : [[spring]]
latex   : false
---
* TOC
{:toc}

## JavaDoc

[JavaDoc]( https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/beans/factory/annotation/Value.html )을 읽어보자.

```java
/**
 * Annotation at the field or method/constructor parameter level
 * that indicates a default value expression for the affected argument.
 *
 * <p>Typically used for expression-driven dependency injection. Also supported
 * for dynamic resolution of handler method parameters, e.g. in Spring MVC.
 *
 * <p>A common use case is to assign default field values using
 * <code>#{systemProperties.myProp}</code> style expressions.
 *
 * <p>Note that actual processing of the {@code @Value} annotation is performed
 * by a {@link org.springframework.beans.factory.config.BeanPostProcessor
 * BeanPostProcessor} which in turn means that you <em>cannot</em> use
 * {@code @Value} within
 * {@link org.springframework.beans.factory.config.BeanPostProcessor
 * BeanPostProcessor} or
 * {@link org.springframework.beans.factory.config.BeanFactoryPostProcessor BeanFactoryPostProcessor}
 * types. Please consult the javadoc for the {@link AutowiredAnnotationBeanPostProcessor}
 * class (which, by default, checks for the presence of this annotation).
 *
 * @author Juergen Hoeller
 * @since 3.0
 * @see AutowiredAnnotationBeanPostProcessor
 * @see Autowired
 * @see org.springframework.beans.factory.config.BeanExpressionResolver
 * @see org.springframework.beans.factory.support.AutowireCandidateResolver#getSuggestedValue
 */
@Target({ElementType.FIELD, ElementType.METHOD, ElementType.PARAMETER, ElementType.ANNOTATION_TYPE})
@Retention(RetentionPolicy.RUNTIME)
@Documented
public @interface Value {
```

- 다음 대상에 사용할 수 있다.
    - 필드
    - 메소드 파라미터
    - 생성자 파라미터

- `BeanPostProcessor`에 의해서 처리되기 때문에 `BeanPostProcessor`나 `BeanFactoryPostProcessor` 내에서는 사용할 수 없다.

## Examples

- `application.yml`

```yml
my-setting:
  custom:
    enable: false
```

- 설정한 값을 주입한다.

```
@Value("${my-setting.custom.enable}")
private boolean enable; // 설정한 값이 주입된다
```

- 기본값을 설정하여 설정이 없는 경우의 대안을 마련할 수 있다.

```
@Value("${my-setting.custom.enable:true}")
private boolean enable; // 설정이 없다면 기본값으로 true가 주입된다
```

## Links

- [Annotation Type Value]( https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/beans/factory/annotation/Value.html )

## 참고문헌

- 클라우드 네이티브 자바 / 조쉬 롱, 케니 바스타니 저/정윤진, 오명운, 장현희 역 / 책만 / 초판 1쇄 2018년 06월 29일

