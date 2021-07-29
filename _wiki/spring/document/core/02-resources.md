---
layout  : wiki
title   : Spring Core Technologies - 2. Resources
summary : 
date    : 2021-07-29 09:43:27 +0900
updated : 2021-07-29 14:37:01 +0900
tag     : java spring
toc     : true
public  : true
parent  : [[/spring/document/core]]
latex   : false
---
* TOC
{:toc}

## 2. Resources

[원문]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#resources )

>
This chapter covers how Spring handles resources and how you can work with resources in Spring. It includes the following topics:

이 챕터는 Spring이 리소스를 처리하는 방법과, Spring을 통해 리소스를 사용하는 방법을 설명합니다.

- [Introduction]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#resources-introduction )
- [The `Resource` Interface]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#resources-resource )
- [Built-in `Resource` Implementations]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#resources-implementations )
- [The `ResourceLoader` Interface]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#resources-resourceloader )
- [The `ResourcePatternResolver` Interface]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#resources-resourcepatternresolver )
- [The `ResourceLoaderAware` Interface]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#resources-resourceloaderaware )
- [Resources as Dependencies]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#resources-as-dependencies )
- [Application Contexts and Resource Paths]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#resources-app-ctx )


### 2.1. Introduction

[원문]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#resources-introduction )

>
Java’s standard `java.net.URL` class and standard handlers for various URL prefixes, unfortunately, are not quite adequate enough for all access to low-level resources.
For example, there is no standardized `URL` implementation that may be used to access a resource that needs to be obtained from the classpath or relative to a `ServletContext`.
While it is possible to register new handlers for specialized `URL` prefixes (similar to existing handlers for prefixes such as `http:`),
this is generally quite complicated, and the `URL` interface still lacks some desirable functionality, such as a method to check for the existence of the resource being pointed to.

불행히도 Java의 표준 `java.net.URL` 클래스와 다양한 URL prefix에 대한 표준 핸들러는 저수준 리소스에 대한 모든 엑세스에 충분하지 않습니다.
예를 들어, classpath 또는 `ServletContext` 상대 경로에 있는 리소스에 엑세스하는 일에 사용할 수 있는 표준화된 `URL` 구현체가 없습니다.
특수한 `URL` prefix를 다루기 위해 새로운 처리기를 등록하는 것도 가능하지만(`http:` 같은 prefix 처리기와 비슷) 이런 작업은 일반적으로 꽤나 복잡한데다가,
`URL` 인터페이스에는 리소스의 존재여부를 확인하는 메소드 같은 몇몇 중요 기능들이 부족하다는 문제가 있습니다.

### 2.2. The Resource Interface

[원문]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#resources-introduction )

