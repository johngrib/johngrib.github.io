---
layout  : wiki
title   : Spring Core Technologies - 1.8. Container Extension Points
summary : 
date    : 2021-06-27 14:47:34 +0900
updated : 2021-06-28 22:16:28 +0900
tag     : java spring
toc     : true
public  : true
parent  : [[spring-documents]]
latex   : false
---
* TOC
{:toc}

- 목록으로 - [[spring-documents-core]]{Spring Core Technologies}
- 이전 문서 - [[spring-documents-core-1-5-bean-scopes]]{1.5. Bean Scopes}
- 다음 문서 - {1.9. Annotation-based Container Configuration}

## 1.8. Container Extension Points

[원문]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-factory-extension )

>
Typically, an application developer does not need to subclass `ApplicationContext` implementation classes. Instead, the Spring IoC container can be extended by plugging in implementations of special integration interfaces. The next few sections describe these integration interfaces.

일반적으로 애플리케이션을 개발할 때에는 `ApplicationContext` 구현체를 상속해서 사용할 일이 없습니다.

대신 특수한 통합 인터페이스 구현체를 연결해서(plugging) Spring IoC 컨테이너를 확장할 수 있습니다.

다음 섹션에서는 이러한 통합 인터페이스에 대해 설명합니다.

### 1.8.1. Customizing Beans by Using a BeanPostProcessor

[원문]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-factory-extension-bpp )


## 함께 읽기

- 목록으로 - [[spring-documents-core]]{Spring Core Technologies}
- 이전 문서 - [[spring-documents-core-1-5-bean-scopes]]{1.5. Bean Scopes}
- 다음 문서 - {1.9. Annotation-based Container Configuration}

