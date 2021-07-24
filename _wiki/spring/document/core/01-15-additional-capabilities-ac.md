---
layout  : wiki
title   : Spring Core Technologies - 1.15. Additional Capabilities of the ApplicationContext
summary : 
date    : 2021-07-24 21:59:18 +0900
updated : 2021-07-24 23:05:09 +0900
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

## 함께 읽기

- 목록으로 - [[/spring/document/core]]
- 이전 문서 - [[/spring/document/core/01-14-reg-loadtimeweaver]]
- 다음 문서 - 1.16. The BeanFactory

