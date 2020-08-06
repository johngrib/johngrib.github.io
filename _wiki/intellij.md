---
layout  : wiki
title   : IntelliJ IDEA
summary : 문제 해결한 경험을 모아본다
date    : 2019-11-09 22:56:16 +0900
updated : 2020-08-07 08:36:50 +0900
tag     : java
toc     : true
public  : true
parent  : [[tools]]
latex   : false
---
* TOC
{:toc}

## 파일 마지막에 자동으로 1개의 개행 문자 추가하기

`Preferences` - `Editor` - `General` - `Save Files`에서 `Ensure an empty line at the end of a file on save`를 체크한다.

파일 마지막에 1개의 개행 문자를 추가하는 것은 POSIX의 Line 정의를 따르기 위한 것이다.

POSIX에서는 **Line**을 "개행 문자로 끝나는 0개 이상의 개행 문자가 아닌 문자들의 시퀀스"으로 정의하고 있다.

- [The Open Group Base Specifications Issue 7, 2018 edition]( https://pubs.opengroup.org/onlinepubs/9699919799/basedefs/V1_chap03.html#tag_03_206 )

이를 따르지 않으면 github에서도 경고를 보여준다(PR을 올려보면 바로 알 수 있다).


## 파일 탭 닫기 버튼(x) 왼쪽으로 옮기기

`Preferences` - `Editor` - `General` - `Editor Tabs`에서 `Close button position`을 `Right`에서 `Left`로 바꿔준다.


## unused symbol 색깔 변경하기

intelliJ 에서는 기본적으로 선언하고 사용하지 않은 변수 등을 약간 어두운 색으로 보여준다.

그러나 나는 사용하지 않은 변수를 더 알아보기 쉽게 설정하는 것을 선호한다.

`Preferences` - `Editor` - `Color Scheme` - `General` - `Errors and Warnings` - `Unused symbol`에 배경색을 빨간색으로 지정해 준다.

![]( /post-img/intellij/unused.jpg )

## 공백 문자를 에디터에 표시하기

vim의 `:set list`에 해당하는 설정.

`Preferences` - `Editor` - `General` - `Appearance` - `Show whitespaces`에 체크한다.

## 비주얼 가이드라인 설정하기

vim 의 `textwidth`, `colorcolumn`에 해당하는 기능이다.

visual guideline을 설정하면 에디터 오른쪽에 가이드 라인이 표시된다.

![]( /post-img/intellij/visual-guideline.jpg )

`Preferences` - `Editor` - `Code Style` - `General` 에서 `Hard wrap`과 `Visual guides` 값을 바꿔주면 된다.

설정 화면 위쪽에 있는 `Scheme`에서 이 설정을 특정 프로젝트에서만 사용할 것인지, IDE 전체에 적용할지를 지정해 줄 수 있다.

## Java 코드에서 import 문이 자동으로 정렬되는 것이 싫다면

다음의 체크박스를 해제한다.

`Preferences` - `Editor` - `General` - `Auto Import` - `Java` - `Optimize imports on the fly`

만약 자동으로 정렬시키는 것이 필요하다면 체크박스를 선택해주면 된다.

## 같은 패키지 안에 있는 멀쩡한 클래스를 못 찾는 경우

같은 패키지 안에 있는 클래스를 사용했는데 인텔리제이가 빨간 줄을 보여주면서 `cannot access class...`와 같은 경고를 보여주는 경우가 있다.

빌드를 돌려보면 아무런 문제가 없다. 이런 경우엔 인텔리제이 캐시에 잘못된 파일이 저장되어 있을 수 있다.

`File` - `Invalidate Caches / Restart`를 실행해주면 해결된다.

## IdeaVim 설치

.ideavimrc 파일을 작성해 활용한다.


## configuration directory는 어디인가?

macOS의 경우 `~/Library/Preferences`에 있다.

예를 들어 IntelliJ IDEA 2019.2의 경우 `~/Library/Preferences/IntelliJIdea2019.2`.

참고: [Configuration directory](https://www.jetbrains.com/help/idea/tuning-the-ide.html#config-directory )

## VM 옵션 설정하기

**Help - Edit Custom VM Options**

나는 주로 다음 값을 설정해준다.

* `Xmx`
* `-XX:+UseG1GC`

## 메모리 상태 막대 보기

`shift`를 두 번 누르고 `show memory indicator`를 검색한 다음 `on`으로 바꿔준다.

## 로그 보기

**Help - Show Log in Finder**를 선택하면 로그 파일이 있는 디렉토리가 파인더에서 열린다(윈도우라면 **Show Log in Explorer**).

`-Xlog:gc*`를 설명하면 로그를 보는 재미가 좀 있겠지만 해보지는 않았다.

자세한 내용은 [Locating IDE log files](https://intellij-support.jetbrains.com/hc/en-us/articles/207241085-Locating-IDE-log-files )를 읽어보자.

## 단축키를 빠르게 학습하고 싶다

[Presentation Assistant]( https://plugins.jetbrains.com/plugin/7345-presentation-assistant/ ) 플러그인을 설치한다.

무언가 작업을 할 때마다 해당 작업을 수행하는 단축키를 툴팁으로 보여준다.

일단 자꾸 보면 알게 된다.

## IDE 런타임 선택하기

[Choose Runtime](https://plugins.jetbrains.com/plugin/12836-choose-runtime ) 플러그인을 설치한다.

`shift`, `shift`로 `choose runtime` 명령을 검색해 사용할 수 있다.

이 플러그인을 사용하면 인텔리제이가 어느 런타임 위에서 돌아가게 할 지를 설정할 수 있다.

즉, 어느 버전의 자바로 인텔리제이를 구동할 지 선택할 수 있다.

자세한 내용은 [Selecting the JDK version the IDE will run under](https://intellij-support.jetbrains.com/hc/en-us/articles/206544879-Selecting-the-JDK-version-the-IDE-will-run-under )를 읽어보자.


## 짜증나는 parameter hint 옵션 해제하기

`Preferences` - `Editor` - `General` - `Appearance`로 들어간 다음, `Show parameter name hints`를 해제하면 된다.

## Lombok을 사용할 경우 Annotation Processing을 켜놓자

`Preferences` - `Build, Execution, Deployment` - `Compiler` - `Annotation Processors` - `Enable annotation processing`을 켜둬야 한다.

이 옵션을 켜두지 않으면 롬복을 제대로 사용할 수 없다.

## Gradle 환경에서 JUnit5를 사용할 때 @DisplayName 이 안 나온다면

`Preferences` - `Build, Execution, Deployment` - `Build Tools` - `Gradle` - `Build and run`에서 `Run tests using`을 `IntelliJ IDEA`로 설정해 준다. 그리고 (반드시) IntelliJ를 재실행한다.

* [Why isn't @DisplayName working for me in JUnit 5?](https://stackoverflow.com/a/59012529 )

## 함께 읽기

* [[config-ideavim]]{IdeaVim 설정하기}

