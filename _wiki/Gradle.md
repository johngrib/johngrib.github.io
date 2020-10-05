---
layout  : wiki
title   : Gradle
summary : Gradle Build Tool
date    : 2017-12-03 10:40:55 +0900
updated : 2020-10-05 17:26:32 +0900
tag     : gradle tool
toc     : true
public  : true
parent  : [[tools]]
latex   : false
---
* TOC
{:toc}

## 개요

* 개발자: [Hans Dockter](https://github.com/hansd), Adam Murdoch, Szczepan Faber, Peter Niederwieser, Luke Daley, Rene Gröschke, Daz DeBoer, Steve Appling
* 라이선스: Apache License 2.0
* 개발 언어: Java, Groovy 등[^repo]

## 특징

> 앤트나 메이븐은 이러한 빌드 언어 대신 XML을 사용한다. 하지만 XML은 원래 범용 문서 형식이라 언어 처리 기능은 없다.
따라서 조건 분기나 반복 기능을 구현하려면 앤트와 메이븐에서 구조를 바꿔서 직접 해당 기능을 만들어야 한다.
반면 그레이들의 DSL은 그루비로 구축되어 있어서 그루비가 제공하는 언어 기능을 그대로 이용할 수 있다.
게다가 그루비는 자바 클래스를 직접 호출할 수 있으므로 빌드 스크립트에서 자바 유틸리티도 쉽게 사용할 수 있다.[^desc]

## 사용 방법/팁 모음

## 의존 라이브러리 단축 표기법

다음과 같이 `dependencies`가 정의되어 있다고 하자. 잘 보면 세미콜론(`:`)이 구분자로 사용되고 있는데, 이는 단축 표기법을 사용해 생략한 것이다.

```groovy
dependencies {
  compile 'org.slf4j:slf4j-api:1.7.5'
}
```

단축 표기법을 사용하기 싫다면 다음과 같이 하면 된다.

```groovy
dependencies {
  compile group:'org.slf4j', name:'slf4j-api', version: '1.7.5'
}
```

## 자주 보는 dependency 설정들
### java 플러그인에서 정의된 설정들

[Dependency configurations]( https://docs.gradle.org/current/userguide/java_plugin.html#tab:configurations )

- `implementation`: extends `compile`. `compile`은 deprecated 되었으므로, `compile` 대신 사용하면 된다.
- `annotationProcessor`: Annotation processors used during compilation.
- `compileOnly`: Compile time only dependencies, not used at runtime.

**Deprecated**

- `compile`: 컴파일 타임 의존관계. 3 버전부터 deprecated.
    - `implementation`으로 대체되었다.
- `testCompile`: extends `compile`.
    - `testImplementation`으로 대체되었다.
- `runtime`: extends `compile`.
    - `runtimeOnly`로 대체되었다.
- `testRuntime`: extends `runtime`, `testCompile`.
    - `testRuntimeOnly`로 대체되었다.


### task 이름 축약

태스크명이 카멜 케이스로 되어 있다면 첫 글자와 각 대문자만 입력하는 방식으로 축약 명령을 쓸 수 있다.

```sh
$ gradle bootRun
$ gradle bR         # gradle bootRun 과 같다
$ gradle br         # 실패! 이건 축약으로 인식이 안 된다

$ gradle generateGitProperties
$ gradle gGP        # gradle generateGitProperties 와 같다
```

### Hello, World!

다음과 같이 build.gradle 파일을 작성하여, hello task를 만들어 준다.

```groovy
task hello << {
    println('Hello, World!')
}
```

이후 `$ gradle hello`를 실행하면 다음과 같이 출력된다.

```
The Task.leftShift(Closure) method has been deprecated and is scheduled to be removed in Gradle 5.0. Please use Task.doLast(Action) instead.
        at build_2m7yvivnk61zadzdb3s3blnfb.run(/Users/johngrib/git/gradle-study/build.gradle:1)
:hello
Hello, World!

BUILD SUCCESSFUL

Total time: 0.979 secs
```

### JVM heap 사이즈 설정

```bash
 # Gradle 실행시 JVM 최대 힙 사이즈를 1GB로 설정한다.
export GRADLE_OPTS=-Xmx1024m
```

### 테스트 하나만 구동하기

```sh
gradle clean test --tests "package.class.method"
```

### spring.profile.active 설정하기

SpringBoot를 사용한다면 다음과 같이 액티브 프로파일을 설정해 한 줄로 실행할 수 있다.[^cli-profile]

```
$ SPRING_PROFILES_ACTIVE=local2 gradle bootrun
$ SPRING_PROFILES_ACTIVE=local2 ./gradlew bootrun     # gradlew 사용
```

## Links

* [gradle.org](https://gradle.org/): 공식 홈페이지
* [gradle.org/docs](https://gradle.org/docs/): 문서
* [github.com/gradle/gradle](https://github.com/gradle/gradle): 소스코드
* [Apache License 2.0](https://www.apache.org/licenses/#2.0)

## 참고문헌

* Gradle 철저 입문
    * Takuma Watabiki, Nobuhiro Sue, Masatoshi Hayashi, Masanobu Imai 지음 (2014, Japan, SHOEISHA)
    * 김완섭 옮김 (2015 초판, Repulic of Korea, Gilbut(도서출판 길벗))
    * [교보문고](http://www.kyobobook.co.kr/product/detailViewKor.laf?ejkGb=KOR&barcode=9791186978122)
    * [알라딘](http://www.aladin.co.kr/shop/wproduct.aspx?ItemId=71792832)

## Endnote

[^repo]: [github.com/gradle/gradle](https://github.com/gradle/gradle)
[^desc]: Gradle 철저 입문 35쪽
[^cli-profile]: [spring boot 이슈 #832](https://github.com/spring-projects/spring-boot/issues/832#issuecomment-133830293)
