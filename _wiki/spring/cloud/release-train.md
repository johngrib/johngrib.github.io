---
layout  : wiki
title   : 릴리즈 트레인 (Release Train)
summary : 
date    : 2023-01-01 23:17:53 +0900
updated : 2024-03-25 23:38:48 +0900
tag     : spring
resource: 73/7C3D6C-A47A-43A8-80E5-24A680B9E208
toc     : true
public  : true
parent  : [[/spring/cloud]]
latex   : false
---
* TOC
{:toc}

## release train?

>
앞의 다이어그램에서 보듯이 스프링 클라우드 내에는 수많은 프로젝트가 있고 프로젝트 간의 관계도 많다.
프로젝트는 모두 다른 릴리즈 주기와 버전 번호를 갖는 독립적인 프로젝트다.
이런 상황에서 애플리케이션의 의존성 관리는 문제가 될 수 있고 모든 프로젝트 버전 간의 관계를 알아야 하는 문제가 있다.
이런 문제점을 쉽게 처리하기 위해 스프링 클라우드는 앞서 이야기한 스타터 메커니즘과 릴리즈 트레인을 도입했다.
즉, 릴리즈 트레인은 하위 프로젝트의 혼란을 피하기 위해 릴리즈를 버전이 아닌 이름으로 구분한다.
흥미로운 것은 런던 지하철 역의 이름에 따라 알파벳 순서로 사용한다는 점이다.
첫 릴리즈는 엔젤(Angel)이었고 둘째는 브릭스턴(Brixton)이었다.
의존성 관리의 전체 메커니즘은 **BOM(Bill of materials)**에 기반한다.
이것은 아티팩트 버전을 독립적으로 관리하는 표준 메이븐 개념이다.
>
-- 마스터링 스프링 클라우드. 3장. 53쪽.

- 2020년부터는 런던 지하철역 이름이 아니라 2020, 2021 같은 연도를 사용한다.
    - 나는 런던 지하철역 이름을 사용하는 것을 싫어했으므로 이 변화가 반갑다.

## 릴리즈 트레인 목록

<div id="table-release-train"></div>

- th
    - Release Train
    - Last Version
    - Boot Version
- tr
    - [2023.0.x (Leyton)](https://github.com/spring-cloud/spring-cloud-release/wiki/Spring-Cloud-2023.0-Release-Notes )
    - ...
    - 3.2.x
- tr
    - [2022.0.x (Kilburn)]( https://github.com/spring-cloud/spring-cloud-release/wiki/Spring-Cloud-2022.0-Release-Notes )
    - [2022.0.6-SNAPSHOT (2024-02-23)](https://github.com/spring-cloud/spring-cloud-release/wiki/Spring-Cloud-2022.0-Release-Notes#202206-snapshot )
    - 3.0.x
- tr
    - [2021.0.x (Jubilee)]( https://github.com/spring-cloud/spring-cloud-release/wiki/Spring-Cloud-2021.0-Release-Notes )
    - [2021.0.8 (2023-06-29)](https://github.com/spring-cloud/spring-cloud-release/wiki/Spring-Cloud-2021.0-Release-Notes#202108 )
    - 2.6.x, 2.7.x
- tr
    - [2020.0.x (Ilford)]( https://github.com/spring-cloud/spring-cloud-release/wiki/Spring-Cloud-2020.0-Release-Notes )
    - 2020.0.6 (2022-06-30)
    - 2.4.x, 2.5.x
- tr
    - [Hoxton]( https://github.com/spring-cloud/spring-cloud-release/wiki/Spring-Cloud-Hoxton-Release-Notes )
    - Hoxton.SR12 (2021-07-06)
    - 2.2.x, 2.3.x
- tr
    - [Greenwich]( https://github.com/spring-projects/spring-cloud/wiki/Spring-Cloud-Greenwich-Release-Notes )
    - Greenwich.SR6 (2020-05-15)
    - 2.1.x
- tr
    - [Finchley]( https://github.com/spring-projects/spring-cloud/wiki/Spring-Cloud-Finchley-Release-Notes )
    - Finchley.SR4 (2019-06-08)
    - 2.0.x
- tr
    - [Edgware]( https://github.com/spring-projects/spring-cloud/wiki/Spring-Cloud-Edgware-Release-Notes )
    - Edgware.SR6 (2019-05-23)
    - 1.5.x
- tr
    - [Dalston]( https://github.com/spring-projects/spring-cloud/wiki/Spring-Cloud-Dalston-Release-Notes )
    - Dalston.SR5 (2017-12-26)
    - 1.5.x
- tr
    - [Camden]( https://github.com/spring-projects/spring-cloud/wiki/Spring-Cloud-Camden-Release-Notes )
    - Camden.SR7
    - 1.4.x
- tr
    - [Brixton]( https://github.com/spring-projects/spring-cloud/wiki/Spring-Cloud-Brixton-Release-Notes )
    - Brixton.SR7 (2016-11-24)
    - 1.3.x
- tr
    - [Angel]( https://github.com/spring-projects/spring-cloud/wiki/Spring-Cloud-Angel-Release-Notes )
    - 
    - 
{:class="table-generate" data-target-id="table-release-train"}

## Links

- [Adding Spring Cloud To An Existing Spring Boot Application (spring.io)]( https://spring.io/projects/spring-cloud#adding-spring-cloud-to-an-existing-spring-boot-application )
- [Spring Cloud Release Wiki]( https://github.com/spring-cloud/spring-cloud-release/wiki )

## 참고문헌

- 마스터링 스프링 클라우드 / 피요트르 민코프스키 저/김민석 역 / 위키북스 / 초판발행 2018년 11월 07일 / 원제: Mastering Spring Cloud

