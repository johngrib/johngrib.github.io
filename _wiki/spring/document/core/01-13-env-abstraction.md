---
layout  : wiki
title   : Spring Core Technologies - 1.13. Environment Abstraction
summary : 
date    : 2021-07-15 22:11:59 +0900
updated : 2021-07-15 23:24:47 +0900
tag     : java spring
toc     : true
public  : true
parent  : [[/spring/document/core]]
latex   : false
---
* TOC
{:toc}

- 목록으로 - [[/spring/document/core]]{Spring Core Technologies}
- 이전 문서 - [[/spring/document/core/01-12-java-based-container-config]]{1.12. Java-based Container Configuration}
- 다음 문서 - {1.14. Registering a LoadTimeWeaver}

## 1.13. Environment Abstraction

[원문]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-environment )

>
The [Environment]( https://docs.spring.io/spring-framework/docs/5.3.7/javadoc-api/org/springframework/core/env/Environment.html ) interface is an abstraction integrated in the container that models two key aspects of the application environment: [profiles]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-definition-profiles ) and [properties]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-property-source-abstraction ).

`Environment` 인텊페페이스는 애플리케이션 환경의 두 가지 주요 측면인 [profiles]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-definition-profiles )과 [properties]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-property-source-abstraction )를 모델링하며 컨테이너에 추상적으로 통합되어 있습니다.

>
A profile is a named, logical group of bean definitions to be registered with the container only if the given profile is active. Beans may be assigned to a profile whether defined in XML or with annotations. The role of the `Environment` object with relation to profiles is in determining which profiles (if any) are currently active, and which profiles (if any) should be active by default.

프로파일이란 이름이 지정된 논리적인 bean definition 그룹이며, 활성화된 경우에만 컨테이너에 등록됩니다.
bean은 XML로 정의하건 애노테이션으로 정의하건 관계 없이 프로파일에 할당될 수 있습니다.

프로파일과 관련된 `Environment` 객체의 역할은 현재 활성화된 프로파일과 기본적으로 활성화되어야 하는 프로파일을 결정하는 것입니다.

>
Properties play an important role in almost all applications and may originate from a variety of sources: properties files, JVM system properties, system environment variables, JNDI, servlet context parameters, ad-hoc `Properties` objects, `Map` objects, and so on. The role of the `Environment` object with relation to properties is to provide the user with a convenient service interface for configuring property sources and resolving properties from them.

프로퍼티는 거의 모든 애플리케이션에서 중요한 역할을 하며, properties 파일, JVM 시스템 properties, 시스템 환경 변수, JNDI, 서블릿 컨텍스트 파라미터, ad-hoc `Properties` 객체, `Map` 객체 등 다양한 소스를 사용할 수 있습니다.
properties와 관련된 `Environment` 객체의 역할은 properties 소스를 configuring하고, 속성값을 사용하기 좋은 편리한 서비스 인터페이스를 사용자에게 제공하는 것입니다.

### 1.13.1. Bean Definition Profiles

[원문]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-definition-profiles )


## 함께 읽기

- 목록으로 - [[/spring/document/core]]{Spring Core Technologies}
- 이전 문서 - [[/spring/document/core/01-12-java-based-container-config]]{1.12. Java-based Container Configuration}
- 다음 문서 - {1.14. Registering a LoadTimeWeaver}

