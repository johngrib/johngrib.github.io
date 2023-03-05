---
layout  : wiki
title   : intellij-sdk-code-samples
summary : IntelliJ SDK 문서의 샘플 코드 모음 리포지토리
date    : 2023-03-05 00:00:51 +0900
updated : 2023-03-05 17:38:36 +0900
tag     : 
resource: A9/2354FB-CB0E-479E-9742-FC7CD75C1414
toc     : true
public  : true
parent  : [[/intellij]]
latex   : false
---
* TOC
{:toc}

[JetBrains/intellij-sdk-code-samples (github.com)](https://github.com/JetBrains/intellij-sdk-code-samples )

## 빌드 및 설치 방법

각 디렉토리로 이동해서 다음을 입력하면 된다.

```bash
$ ./gradlew assemble
```

이후 빌드된 결과로 생성된 zip 파일이 `{PROJECT}/build/distributions`에 추가된다.

`Preferences` - `Plugins` - 오른쪽 위의 `톱니바퀴` - `Install Plugin from Disk`에서 이 zip 파일을 선택하면 IntelliJ에 설치할 수 있다.

![image]( /resource/A9/2354FB-CB0E-479E-9742-FC7CD75C1414/222950448-f4ef0bca-a9e0-4bb6-a402-06c81d6742d3.png )

## 프로젝트

### Action Basics Sample Project

[action_basics]( https://github.com/JetBrains/intellij-sdk-code-samples/tree/main/action_basics ), [action_basics (2023-03-02)]( https://github.com/JetBrains/intellij-sdk-code-samples/tree/8b7c6c174a5cdeaae8e45fdeaedcbbad2308578f/action_basics )

- 몇 가지 Action을 등록하는 예제 프로젝트.
- 각 액션은 `AnAction` 추상 클래스를 확장한 것.
- 마우스 우클릭 메뉴, 키보드 단축키 등을 통해 팝업 메시지를 띄우는 방법을 배울 수 있다.

| ![image]( /resource/A9/2354FB-CB0E-479E-9742-FC7CD75C1414/222949641-55610a59-2522-47a6-b362-cd0672d50f4a.png ) | ![image]( /resource/A9/2354FB-CB0E-479E-9742-FC7CD75C1414/222949708-22e4195a-0814-4756-818d-8ef22c592e77.png ) |
| ![image]( /resource/A9/2354FB-CB0E-479E-9742-FC7CD75C1414/222949653-2ce6aa2c-5078-4c94-aca1-a919bbfe7a5b.png ) | ![image]( /resource/A9/2354FB-CB0E-479E-9742-FC7CD75C1414/222949736-d84af76b-a1e8-405d-ac5b-c211f642fa76.png ) |

