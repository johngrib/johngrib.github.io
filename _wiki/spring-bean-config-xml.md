---
layout  : wiki
title   : xml을 통한 Spring Bean 설정
summary : 잊어먹고 후회말고 기록해두자
date    : 2019-08-15 16:30:03 +0900
updated : 2019-08-15 22:11:42 +0900
tag     : spring xml
toc     : true
public  : true
parent  : spring
latex   : false
---
* TOC
{:toc}

# Examples

## 방법1: xml로 모든 Bean을 설정

```text
src
├── main
│   ├── java
│   │   └── com
│   │       └── example
│   │           └── demo
│   │               ├── DemoApplication.java
│   │               ├── DemoRepository.java
│   │               └── DemoService.java
│   └── resources
│       └── application.xml
└── test
    └── java
        └── com
            └── example
                └── demo
                    └── DemoApplicationTests.java
```

* application.xml
    * demoService에 repository와 count를 주입하도록 설정하였다.

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">

    <bean id="demoService" class="com.example.demo.DemoService">
        <property name="repository" ref="demoRepository"/>
        <property name="count" value="42"/>
    </bean>
    <bean id="demoRepository" class="com.example.demo.DemoRepository"/>
</beans>
```

* DemoRepository.java
    * 확인 용도로 `name`이라는 멤버 변수를 넣어 주었다.

```java
package com.example.demo;

public class DemoRepository {
    public String name = "DemoRepository!";
}
```

* DemoService.java
    * 두 개의 setter에 주목.

```java
package com.example.demo;

public class DemoService {
    DemoRepository repository;
    int count;

    public void setRepository(DemoRepository demoRepository) {
        this.repository = demoRepository;
    }
    public void setCount(int count) {
        this.count = count;
    }
}
```

* DemoApplication.java
    * `ApplicationContext.getBean`의 기본적인 사용법 두 가지.

```java
package com.example.demo;

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

public class DemoApplication {

    public static void main(String[] args) {
        ApplicationContext ctx = new ClassPathXmlApplicationContext("application.xml");

        // class로 Bean 가져오기
        DemoService service = ctx.getBean(DemoService.class);
        System.out.println("1 " + service.repository.name);

        // 이름으로 Bean 가져오기
        DemoService service2 = (DemoService) ctx.getBean("demoService");
        System.out.println("2 " + service.repository.name);

        // Bean 이름 출력하기
        String[] beanNames = ctx.getBeanDefinitionNames();
        for (String name: beanNames) {
            System.out.println(name);
        }
    }
}
```

main 메소드를 실행해 보면 다음과 같은 결과가 출력된다.

```text
1 DemoRepository!
1 42
2 DemoRepository!
2 42
demoService
demoRepository
```

## 방법2: xml에서 component scan 사용

```text
src
├── main
│   ├── java
│   │   └── com
│   │       └── example
│   │           └── demo
│   │               ├── DemoApplication.java
│   │               ├── DemoRepository.java
│   │               └── DemoService.java
│   └── resources
│       └── application.xml
└── test
    └── java
        └── com
            └── example
                └── demo
                    └── DemoApplicationTests.java
```

* application.xml
    * `context:component-scan`에서 지정한 패키지 기준으로 `@Component` 애노테이션이 붙은 클래스를 검색해 추가한다.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
           http://www.springframework.org/schema/beans/spring-beans-3.0.xsd
           http://www.springframework.org/schema/context
           http://www.springframework.org/schema/context/spring-context-3.0.xsd">
    <context:component-scan base-package="com.example.demo"/>
</beans>
```

* DemoRepository
    * `@Component` 애노테이션에 주목.

```java
package com.example.demo;
import org.springframework.stereotype.Component;

@Component
public class DemoRepository {
    public String name = "DemoRepository!";
}
```

* DemoService
    * `@Component` 애노테이션에 주목.

```java
package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class DemoService {

    @Autowired
    DemoRepository repository;
    int count;

    public void setCount(int count) {
        this.count = count;
    }
}
```

* DemoApplication

```java
package com.example.demo;

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

public class DemoApplication {

    public static void main(String[] args) {
        ApplicationContext ctx = new ClassPathXmlApplicationContext("application.xml");

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
1 DemoRepository!
1 0
2 DemoRepository!
2 0
demoRepository
demoService
org.springframework.context.annotation.internalConfigurationAnnotationProcessor
org.springframework.context.annotation.internalAutowiredAnnotationProcessor
org.springframework.context.annotation.internalCommonAnnotationProcessor
org.springframework.context.event.internalEventListenerProcessor
org.springframework.context.event.internalEventListenerFactory
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

