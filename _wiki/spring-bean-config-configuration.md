---
layout  : wiki
title   : Configuration annotation을 통한 Spring Bean 설정
summary : Springboot만 쓰다보니 잊어먹을 것 같다
date    : 2019-08-15 16:30:03 +0900
updated : 2019-08-15 22:23:28 +0900
tag     : spring xml
toc     : true
public  : true
parent  : spring
latex   : false
---
* TOC
{:toc}

# Examples

## 방법1: @Configuration 클래스

```text
src
├── main
│   ├── java
│   │   └── com
│   │       └── example
│   │           └── demo
│   │               ├── ApplicationConfig.java
│   │               ├── DemoApplication.java
│   │               ├── DemoRepository.java
│   │               └── DemoService.java
│   └── resources
└── test
    └── java
        └── com
            └── example
                └── demo
                    └── DemoApplicationTests.java
```

* ApplicationConfig
    * `@Configuration` 애노테이션에 주목.

```java
package com.example.demo;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ApplicationConfig {

    @Bean
    public DemoRepository demoRepository() {
        DemoRepository repo = new DemoRepository();
        repo.name = "from java config";
        return repo;
    }

    @Bean
    public DemoService demoService() {
        DemoService service = new DemoService();
        service.count = 42;
        service.setRepository(demoRepository());
        return service;
    }
}
```

* DemoRepository

```java
package com.example.demo;

public class DemoRepository {
    public String name = "DemoRepository!";
}
```

* DemoService

```java
package com.example.demo;

public class DemoService {

    DemoRepository repository;
    int count;

    public void setRepository(DemoRepository repository) {
        this.repository = repository;
    }

    public void setCount(int count) {
        this.count = count;
    }
}
```

* DemoApplication

```java
package com.example.demo;

import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;

public class DemoApplication {

    public static void main(String[] args) {
        ApplicationContext ctx = new AnnotationConfigApplicationContext(
            ApplicationConfig.class
        );

        DemoService service = ctx.getBean(DemoService.class);
        System.out.println("1 " + service.repository.name);
        System.out.println("1 " + service.count);

        DemoService service2 = (DemoService) ctx.getBean("demoService");
        System.out.println("2 " + service.repository.name);
        System.out.println("2 " + service.count);

        String[] beanNames = ctx.getBeanDefinitionNames();
        for (String name : beanNames) {
            System.out.println(name);
        }
    }
}
```

실행 결과는 다음과 같다.

```text
1 from java config
1 42
2 from java config
2 42
org.springframework.context.annotation.internalConfigurationAnnotationProcessor
org.springframework.context.annotation.internalAutowiredAnnotationProcessor
org.springframework.context.annotation.internalCommonAnnotationProcessor
org.springframework.context.event.internalEventListenerProcessor
org.springframework.context.event.internalEventListenerFactory
applicationConfig
demoRepository
demoService
```

## 방법2: @ComponentScan 사용

```text
src
├── main
│   ├── java
│   │   └── com
│   │       └── example
│   │           └── demo
│   │               ├── ApplicationConfig.java
│   │               ├── DemoApplication.java
│   │               ├── DemoRepository.java
│   │               └── DemoService.java
│   └── resources
└── test
    └── java
        └── com
            └── example
                └── demo
                    └── DemoApplicationTests.java
```

* ApplicationConfig

```java
package com.example.demo;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

@Configuration
@ComponentScan(basePackageClasses = DemoApplication.class)
public class ApplicationConfig {
}
```

* DemoRepository

```java
package com.example.demo;

import org.springframework.stereotype.Component;

@Component
public class DemoRepository {
    public String name = "DemoRepository!";
}
```

* DemoService

```java
package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class DemoService {

    DemoRepository repository;
    int count;

    @Autowired
    public void setRepository(DemoRepository repository) {
        this.repository = repository;
    }

    public void setCount(int count) {
        this.count = count;
    }
}
```

* DemoApplication

```java
package com.example.demo;

import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;

public class DemoApplication {

    public static void main(String[] args) {
        ApplicationContext ctx = new AnnotationConfigApplicationContext(ApplicationConfig.class);

        DemoService service = ctx.getBean(DemoService.class);
        System.out.println("1 " + service.repository.name);
        System.out.println("1 " + service.count);

        DemoService service2 = (DemoService) ctx.getBean("demoService");
        System.out.println("2 " + service.repository.name);
        System.out.println("2 " + service.count);

        String[] beanNames = ctx.getBeanDefinitionNames();
        for (String name : beanNames) {
            System.out.println(name);
        }
    }
}
```

실행하면 다음과 같은 결과가 나온다.

```text
1 DemoRepository!
1 0
2 DemoRepository!
2 0
org.springframework.context.annotation.internalConfigurationAnnotationProcessor
org.springframework.context.annotation.internalAutowiredAnnotationProcessor
org.springframework.context.annotation.internalCommonAnnotationProcessor
org.springframework.context.event.internalEventListenerProcessor
org.springframework.context.event.internalEventListenerFactory
applicationConfig
demoRepository
demoService
```




# 참고: pom.xml

IntelliJ의 spring boot 플러그인이 자동으로 만들어 준 pom.xml을 사용했다.

```
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>2.2.0.M5</version>
        <relativePath/> <!-- lookup parent from repository -->
    </parent>
    <groupId>com.example</groupId>
    <artifactId>demo</artifactId>
    <version>0.0.1-SNAPSHOT</version>
    <name>demo</name>
    <description>Demo project for Spring Boot</description>

    <properties>
        <java.version>1.8</java.version>
    </properties>

    <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>

        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
            <exclusions>
                <exclusion>
                    <groupId>org.junit.vintage</groupId>
                    <artifactId>junit-vintage-engine</artifactId>
                </exclusion>
            </exclusions>
        </dependency>
    </dependencies>

    <build>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
            </plugin>
        </plugins>
    </build>

    <repositories>
        <repository>
            <id>spring-milestones</id>
            <name>Spring Milestones</name>
            <url>https://repo.spring.io/milestone</url>
        </repository>
    </repositories>
    <pluginRepositories>
        <pluginRepository>
            <id>spring-milestones</id>
            <name>Spring Milestones</name>
            <url>https://repo.spring.io/milestone</url>
        </pluginRepository>
    </pluginRepositories>
</project>
```

# Links

* [40. XML Schema-based configuration](https://docs.spring.io/spring/docs/4.2.x/spring-framework-reference/html/xsd-configuration.html )

