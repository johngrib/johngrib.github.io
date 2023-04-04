---
layout  : wiki
title   : IntelliJ 이것저것
summary : 문제 해결한 경험을 모아본다
date    : 2019-11-09 22:56:16 +0900
updated : 2023-03-19 17:07:07 +0900
tag     : java
resource: F6/C37D5D-0E30-44D2-B873-E374D0E2CA90
toc     : true
public  : true
parent  : [[/intellij]]
latex   : false
---
* TOC
{:toc}

## 로그 보기

**Help - Show Log in Finder**를 선택하면 로그 파일이 있는 디렉토리가 파인더에서 열린다(윈도우라면 **Show Log in Explorer**).

`-Xlog:gc*`를 설명하면 로그를 보는 재미가 좀 있겠지만 해보지는 않았다.

자세한 내용은 [Locating IDE log files](https://intellij-support.jetbrains.com/hc/en-us/articles/207241085-Locating-IDE-log-files )를 읽어보자.

- 최근 사용 이력
    - 2023-03-19

## 키 반복입력이 안 되는 문제 해결하기

방향키 등을 꾹 누르고 있어도 키가 한 번만 인식되는 문제가 있다면 다음 문서를 읽어보자.

[lsd/IdeaVim OS X Key Repeat.markdown]( https://gist.github.com/lsd/1e1826907ab7e49c536a )

- Ultimate Edition IntelliJ: `defaults write com.jetbrains.intellij ApplePressAndHoldEnabled -bool false`
- Community Edition IntelliJ: `defaults write com.jetbrains.intellij.ce ApplePressAndHoldEnabled -bool false`

위의 명령을 터미널에서 입력하고, IntelliJ를 재실행하면 된다.

- 최근 사용 이력
    - 2023-03-18

## 커서가 지시하는 단어를 하이라이트

Vim에서 하는 것만큼은 아니지만 비슷하게 할 수 있다.

<video controls muted autoplay loop><source src=" /resource/F6/C37D5D-0E30-44D2-B873-E374D0E2CA90/213633807-7f998587-3696-4051-83c0-f5c5aff38ff2.mp4 " type="video/mp4"></video>

`Preferences` - `Editor` - `Color Scheme` - `General` - `Code` - `Identifier under caret`에서 색을 설정해주면 된다.

내 경우엔 `Foreground`를 `#00FFFF`로, `Background`를 `#005F5F`로 설정해 사용한다.

- 함께 읽기: [[/vim/match]]

## 코드 에디터 배경색 바꾸기

`Preferences` - `Editor` - `Color Scheme` - `General` - `Text` - `Default text`에서 `Background`의 색을 바꾸면 된다.

참고로 `Default text`의 `Background` 기본값은 `#2B2B2B` 이다.

- 최근 사용 이력
    - 2023-01-20

## 짜증나는 one line method fold 옵션 끄기

`Preferences` - `Editor` - `General` - `Code Folding` - `Java` - `One-line methods` 체크박스를 해제한다.

## 파일 탭 닫기 버튼(x) 왼쪽으로 옮기기

`Preferences` - `Editor` - `General` - `Editor Tabs`에서 `Close button position`을 `Right`에서 `Left`로 바꿔준다.

탭 닫기 버튼이 오른쪽에 있으면 여러 탭을 마우스로 클릭해서 연속으로 닫을 때 굉장히 짜증난다.

탭 닫기 버튼이 왼쪽에 있으면 모든 탭의 탭 닫기 버튼의 위치가 똑같다. 그래서 여러 탭을 클릭클릭해서 닫을 때 편하다.

![image]( /resource/F6/C37D5D-0E30-44D2-B873-E374D0E2CA90/107315651-7b5c6680-6ada-11eb-9820-fec90bdeb3fa.png )

- 최근 사용 이력
    - 2021-08-15

## import * 방지하기

`import`한 클래스들이 `import *`로 자동으로 변경되는 것이 싫다면 다음과 같이 설정하면 된다.

`Preferences` - `Editor` - `Code Style` - `Java` - `Imports` - `General` 에서

- `Use single class import`를 체크해준다.
- `Class count to use import with '*'`를 `99`로 변경헤준다.

## 짜증나는 Reader mode 해제하기

intelliJ 2020.3 버전부터 다음과 같이 JavaDoc을 읽기 좋게 렌더링해서 보여주는 기능이 디폴트로 추가됐다.

![image]( /resource/F6/C37D5D-0E30-44D2-B873-E374D0E2CA90/104927651-08813380-59e5-11eb-9b20-f48200d45c7c.png )

나에게는 짜증나는 기능일 뿐이다.

`Preferences` - `Editor` - `Reader Mode` 에서 `Enable Reader mode` 체크박스를 해제하자.

`control - option - q` 단축키로 리더 모드를 해제할 수도 있다.

참고: [IntelliJ IDEA Reader mode]( https://www.jetbrains.com/help/idea/reader-mode.html )

- 최근 사용 이력
    - 2021-02-19

## typo 경고가 뜨지 않게 하기

한글 주석을 쓰면 다음과 같은 오타 경고가 나오곤 한다.

![image]( /resource/F6/C37D5D-0E30-44D2-B873-E374D0E2CA90/106970569-86d52800-6790-11eb-83dd-2c619e0b8a11.png )

맞춤법 검사기에 돌려보면 아무런 이상이 없다고 하는 문장에서도 나타나니 굳이 참고할 필요가 없을 수 있다.

- `Preferences` - `Editor` - `Inspections` - `Proofreading` - `Typo`를 체크 해제해주면 된다.

주의: 이렇게 하면 영문 오타에서도 경고가 뜨지 않게 된다는 점도 고려하자.

- 최근 사용 이력
    - 2021-02-05

## 같은 패키지 안에 있는 멀쩡한 클래스를 못 찾는 경우

같은 패키지 안에 있는 클래스를 사용했는데 인텔리제이가 빨간 줄을 보여주면서 `cannot access class...`와 같은 경고를 보여주는 경우가 있다.

빌드를 돌려보면 아무런 문제가 없다. 이런 경우엔 인텔리제이 캐시에 잘못된 파일이 저장되어 있을 수 있다.

`File` - `Invalidate Caches / Restart`를 실행해주면 해결된다.

- 최근 사용 이력
    - 2021-01-30

## 핀치 줌으로 사이즈를 키운 화면을 본래대로 되돌리고 싶다면 reset font size

맥에서 트랙패드를 사용하고 있다면 핀치 줌(아이패드나 아이폰처럼 두 손가락을 벌려서 줌)으로 화면을 확대할 수 있다.

이렇게 확대된 화면을 본래 상태로 되돌리려면 똑같이 핀치 줌으로 손가락을 모아서 줌 아웃을 하면 되는데,
이걸 인텔리제이 기능을 사용해 하고 싶다면 `reset font size` 기능을 사용하면 된다.

`command + shift + a` 에서 `reset font size` 액션을 검색한 다음 엔터를 치면 된다.

단축키를 지정하고 싶다면 `Preferences` - `Keymap`에서 검색해 자신이 원하는 단축키로 지정하면 된다.

## 컴파일할 때 Could not target platform 에러가 발생하면

Gradle을 사용하고 있다면 Gradle JVM이 잘못 설정되어서 그럴 수 있다.

`Preferences` - `Build, Execution, Deployment` - `Build Tools` - `Gradle` 로 들어가서 가장 아래에 있는 `Gradle JVM` 에서 Java 버전을 지정해 준다.

한참 삽질했는데 알고보니 프로젝트는 Java 15 버전인데 Gradle JVM이 Java 13 이어서 발생한 문제였다.

## 파일 마지막에 자동으로 1개의 개행 문자 추가하기

`Preferences` - `Editor` - `General` - `On Save`에서 `Ensure every saved file ends with a line break`를 체크한다.

2020.3 이전 버전이라면 `Preferences` - `Editor` - `General` - `Save Files`에서 `Ensure an empty line at the end of a file on save`를 체크한다.

파일 마지막에 1개의 개행 문자를 추가하는 것은 POSIX의 Line 정의를 따르기 위한 것이다.

POSIX에서는 **Line**을 "개행 문자로 끝나는 0개 이상의 개행 문자가 아닌 문자들의 시퀀스"으로 정의하고 있다.

- [The Open Group Base Specifications Issue 7, 2018 edition]( https://pubs.opengroup.org/onlinepubs/9699919799/basedefs/V1_chap03.html#tag_03_206 )

이를 따르지 않으면 github에서도 경고를 보여준다(PR을 올려보면 바로 알 수 있다).


## unused symbol 색깔 변경하기

intelliJ 에서는 기본적으로 선언하고 사용하지 않은 변수 등을 약간 어두운 색으로 보여준다.

그러나 나는 사용하지 않은 변수를 더 알아보기 쉽게 설정하는 것을 선호한다.

`Preferences` - `Editor` - `Color Scheme` - `General` - `Errors and Warnings` - `Unused symbol`에 배경색을 빨간색으로 지정해 준다.

![]( /resource/F6/C37D5D-0E30-44D2-B873-E374D0E2CA90/unused.jpg )

## 공백 문자를 에디터에 표시하기

vim의 `:set list`에 해당하는 설정.

`Preferences` - `Editor` - `General` - `Appearance` - `Show whitespaces`에 체크한다.

## 비주얼 가이드라인 설정하기

vim 의 `textwidth`, `colorcolumn`에 해당하는 기능이다.

visual guideline을 설정하면 에디터 오른쪽에 가이드 라인이 표시된다.

![]( /resource/F6/C37D5D-0E30-44D2-B873-E374D0E2CA90/visual-guideline.jpg )

`Preferences` - `Editor` - `Code Style` - `General` 에서 `Hard wrap`과 `Visual guides` 값을 바꿔주면 된다.

설정 화면 위쪽에 있는 `Scheme`에서 이 설정을 특정 프로젝트에서만 사용할 것인지, IDE 전체에 적용할지를 지정해 줄 수 있다.

## Java 코드에서 import 문이 자동으로 정렬되는 것이 싫다면

다음의 체크박스를 해제한다.

`Preferences` - `Editor` - `General` - `Auto Import` - `Java` - `Optimize imports on the fly`

만약 자동으로 정렬시키는 것이 필요하다면 체크박스를 선택해주면 된다.

## IdeaVim 사용

.ideavimrc 파일을 작성해 활용한다.

[[/vim/ideavim]] 문서 참고.

## configuration directory는 어디인가?

macOS의 경우 `~/Library/Preferences`에 있다.

예를 들어 IntelliJ IDEA 2019.2의 경우 `~/Library/Preferences/IntelliJIdea2019.2`.

참고: [Configuration directory](https://www.jetbrains.com/help/idea/tuning-the-ide.html#config-directory )

## VM 옵션 설정하기

`Help` - `Edit Custom VM Options`

나는 주로 다음 값을 설정해준다.

* `Xmx`
* `-XX:+UseG1GC`

<span/>

- 최근 사용 이력
    - 2021-10-22

### Maximum Heap Size 설정하기

`상단 메뉴` - `Help` - `Change memory settings`에서 설정할 수 있다.

디폴트 값은 `2048 MiB`. 이 방법으로 수정한 다음 `Help` - `Edit Custom VM Options`에서 확인해 보면 `Xmx` 값이 바뀌어 있음을 확인할 수 있다.
즉 이 옵션은 몰라도 그만이다.

## 메모리 상태 막대 보기

`shift`를 두 번 누르고 `show memory indicator`를 검색한 다음 `on`으로 바꿔준다.

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

* [[/vim/ideavim]]

