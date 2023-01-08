---
layout  : wiki
title   : spring boot starter
summary : 
date    : 2022-12-30 23:44:00 +0900
updated : 2023-01-08 15:40:23 +0900
tag     : spring
resource: 49/827296-5B64-4EA8-8E84-C639F512FEA1
toc     : true
public  : true
parent  : [[/spring/boot]]
latex   : false
---
* TOC
{:toc}

## spring-boot-starter?

### From: 마스터링 스프링 클라우드

>
**스타터**는 프로젝트 의존성에 포함될 수 있는 아티팩트(artifact)다.
스타터의 유일한 역할은 기대하는 기능을 구현하기 위해 애플리케이션에 포함해야 하는 다른 의존성을 제공하는 것뿐이다.
이 방식으로 제공된 패키지는 즉시 사용할 수 있어 동작을 위해 별도의 설정을 할 필요가 없다.
여기서 스프링 부트의 두 번째 중요한 용어인 자동 컨피규레이션(auto-configuration)이 등장한다.
스타터에 포함된 아티팩트는 기본 설정이 있고 속성이나 다른 유형의 스타터로 쉽게 재정의할 수 있다.
예를 들어 애플리케이션에 `spring-boot-starter-web`을 포함하면 애플리케이션이 기본 웹 컨테이너를 내장해 기본 포트로 시작한다.
나아가 스프링 부트의 기본 웹 컨테이너는 톰캣(Tomcat)으로, 시작할 때 8080 포트를 사용한다.
포트는 애플리케이션 속성 파일에 지정된 필드를 선언해 쉽게 변경할 수 있고
`spring-boot-starter-jetty` 또는 `spring-boot-starter-undertow`를 프로젝트 의존성에 포함해 웹 컨테이너를 변경할 수 있다.
>
스타터에 대해 좀 더 이야기해 보자. 공식적인 명명 패턴은 `spring-boot-starter-*`다.
여기서 `*`는 스타터의 특정 타입이다. 스프링 부트에는 풍부한 스타터가 있다.
그중에서 이 책에서 제공되는 예제에서도 사용하고 있는 가장 인기 있는 몇 가지에 대해 간단히 설명한다.
>
(표 생략)
>
전체 스타터 목록에 관심이 있다면 스프링 부트 명세서를 참조한다.
이제 스프링 프레임워크의 표준 컨피규레이션과 스프링 부트의 주요 차이점으로 돌아가보자.
전에 이야기했듯이 `spring-boot-starter-web`을 통해 웹 컨테이너를 애플리케이션에 포함할 수 있다.
표준 스프링 컨피규레이션에서는 애플리케이션에 웹 컨테이너를 포함하는 대신 애플리케이션을 WAR 형태로 웹 컨테이너에 배포한다.
이것은 중요한 차이점이자 스프링 부트가 마이크로서비스 아키텍처에 배포된 애플리케이션을 생성하는 데 사용되는 가장 중요한 이유 중 하나다.
마이크로서비스의 가장 대표적 기능 중 하나는 다른 마이크로서비스와의 독립성이다.
이 경우 데이터베이스나 웹 컨테이너와 같은 공통의 자원을 공유하지 않아야 한다.
하나의 웹 컨테이너에 여러 WAR 파일을 배포하는 것은 마이크로서비스에서 피해야 할 패턴이다.
그러므로 마이크로서비스의 경우에는 스프링 부트가 명백히 옳은 선택이다.
>
-- 마스터링 스프링 클라우드. 2장. 13쪽.

## Links

- [6.1.5 starters (spring-boot 3.0.1)]( https://docs.spring.io/spring-boot/docs/3.0.1/reference/htmlsingle/#using.build-systems.starters )
- [7.9.5. Creating Your Own Starter (spring-boot 3.0.1)]( https://docs.spring.io/spring-boot/docs/3.0.1/reference/htmlsingle/#features.developing-auto-configuration.custom-starter )
- [spring-boot-starters (github.com)]( https://github.com/spring-projects/spring-boot/tree/main/spring-boot-project/spring-boot-starters )

## 참고문헌

- 마스터링 스프링 클라우드 / 피요트르 민코프스키 저/김민석 역 / 위키북스 / 초판발행 2018년 11월 07일 / 원제: Mastering Spring Cloud

