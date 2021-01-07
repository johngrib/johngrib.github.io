---
layout  : wiki
title   : h2database
summary : H2, the Java SQL database
date    : 2021-01-07 23:42:08 +0900
updated : 2021-01-07 23:46:16 +0900
tag     : db
toc     : true
public  : true
parent  : tools
latex   : false
---
* TOC
{:toc}

## 기본 정보

- [github]( https://github.com/h2database/h2database )

## 스프링과 함께

### 설정 예제

```yml
spring:
  datasource:
    url: jdbc:h2:mem:testdb;MODE=mysql;
    driverClassName: org.h2.Driver
    platform: h2
    username: sa
    password:
```

