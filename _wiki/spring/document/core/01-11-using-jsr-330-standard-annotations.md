---
layout  : wiki
title   : Spring Core Technologies - 1.11. Using JSR 330 Standard Annotations
summary : 
date    : 2021-07-10 12:00:30 +0900
updated : 2021-07-11 11:23:00 +0900
tag     : java spring
toc     : true
public  : true
parent  : [[/spring/document/core]]
latex   : false
---
* TOC
{:toc}

- 목록으로 - [[/spring/document/core]]{Spring Core Technologies}
- 이전 문서 - [[/spring/document/core/01-10-classpath-scanning-and-managed-components]]{1.10. Classpath Scanning and Managed Components}
- 다음 문서 - {1.12. Java-based Container Configuration}

## 1.11. Using JSR 330 Standard Annotations

[원문]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-standard-annotations )

Starting with Spring 3.0, Spring offers support for JSR-330 standard annotations (Dependency Injection). Those annotations are scanned in the same way as the Spring annotations. To use them, you need to have the relevant jars in your classpath.

Spring 3.0부터 Spring은 JSR-330 스탠다드 애노테이션(Dependency Injection)을 지원합니다.
해당 애노테이션들은 Spring 애노테이션들과 같은 방법으로 스캔되며, 사용하려면 classpath에 그와 관계된 jar 파일들이 있어야 합니다.

> (i)
If you use Maven, the `javax.inject` artifact is available in the standard Maven repository (<https://repo1.maven.org/maven2/javax/inject/javax.inject/1/ >). You can add the following dependency to your file pom.xml:

Maven을 사용한다면 `javax.inject` 아티팩트를 스탠다드 Maven 저장소(<https://repo1.maven.org/maven2/javax/inject/javax.inject/1/ >)에서 찾아볼 수 있습니다.
pom.xml 파일에는 다음과 같이 추가하면 됩니다.

```xml
<dependency>
    <groupId>javax.inject</groupId>
    <artifactId>javax.inject</artifactId>
    <version>1</version>
</dependency>
```

### 1.11.1. Dependency Injection with @Inject and @Named

[원문]( https://docs.spring.io/spring-framework/docs/5.3.7/reference/html/core.html#beans-inject-named )


## 함께 읽기

- 목록으로 - [[/spring/document/core]]{Spring Core Technologies}
- 이전 문서 - [[/spring/document/core/01-10-classpath-scanning-and-managed-components]]{1.10. Classpath Scanning and Managed Components}
- 다음 문서 - {1.12. Java-based Container Configuration}

