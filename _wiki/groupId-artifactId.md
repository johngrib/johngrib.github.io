---
layout  : wiki
title   : Maven의 groupId 와 artifactId, 그리고 version
summary : 
date    : 2018-07-21 08:09:07 +0900
updated : 2018-07-21 22:57:42 +0900
tag     : java
toc     : true
public  : true
parent  : what
latex   : false
---
* TOC
{:toc}

# groupId

<https://maven.apache.org/guides/mini/guide-naming-conventions.html >

>
groupId will identify your project uniquely across all projects, so we need to enforce a naming schema. It has to follow the package name rules, what means that has to be at least as a domain name you control, and you can create as many subgroups as you want.  
eg. org.apache.maven, org.apache.commons


* groupId는 당신의 프로젝트를 모든 프로젝트 사이에서 고유하게 식별하게 해 주는 것이다.
* 따라서, groupId에는 네이밍 스키마를 적용하도록 한다.
    * groupId는 package 명명 규칙을 따르도록 한다.
    * 즉, 최소한 당신이 컨트롤하는 도메인 네임이어야 한다.
    * 하위 그룹은 얼마든지 추가할 수 있다.
    * 예: `org.apache.maven`, `org.apache.commons`

>
A good way to determine the granularity of the groupId is to use the project structure. That is, if the current project is a multiple module project, it should append a new identifier to the parent's groupId.  
eg. org.apache.maven, org.apache.maven.plugins, org.apache.maven.reporting

* 프로젝트 구조를 사용하면 잘 구분되는 groupId를 만들 수 있다.
    * 현재 프로젝트가 다중 모듈 프로젝트라면, 부모 groupId에 현재 프로젝트의 식별자를 추가하는 방식.
    * 예: `org.apache.maven`, `org.apache.maven.plugins`, `org.apache.maven.reporting`

# artifactId

>
artifactId is the name of the jar without version. If you created it then you can choose whatever name you want with lowercase letters and no strange symbols. If it's a third party jar you have to take the name of the jar as it's distributed.  
eg. maven, commons-math

* artifactId는 버전 정보를 생략한 `jar` 파일의 이름이다.
    * 이름은 원하는 것으로 아무거나 정해도 괜찮다.
    * 단, 소문자로만 작성하도록 한다.
    * 단, 특수문자는 사용하지 않는다.
* 만약 써드 파티 `jar` 파일이라면, 할당된 이름을 사용해야 한다.
    * 예: `maven`, `commons-math`

# version

>
if you distribute it then you can choose any typical version with numbers and dots (1.0, 1.1, 1.0.1, ...). Don't use dates as they are usually associated with SNAPSHOT (nightly) builds. If it's a third party artifact, you have to use their version number whatever it is, and as strange as it can look.  
eg. 2.0, 2.0.1, 1.3.1

* 숫자와 점으로 이루어진 일반적인 버전 형태를 사용한다(`1.0`, `1.1`, `1.0.1`, ...).
* SNAPSHOT(nightly) 빌드 날짜를 버전으로 사용하지 않도록 한다.
* 써드 파티 아티팩트라면, (좀 이상하게 보일 수 있어도) 그들의 버전 넘버를 이어받아 사용하도록 한다.

# Links

* [Guide to naming conventions on groupId, artifactId and version(maven.apache.org)](https://maven.apache.org/guides/mini/guide-naming-conventions.html )
* [Naming a Package(docs.oracle.com)](https://docs.oracle.com/javase/tutorial/java/package/namingpkgs.html )

