---
layout  : wiki
title   : google-java-format 사용법
summary : google에서 만든 Java 소스코드 포매터
date    : 2020-06-17 20:29:36 +0900
updated : 2020-07-21 22:10:51 +0900
tag     : java command
toc     : true
public  : true
parent  : [[command-line]]
latex   : false
---
* TOC
{:toc}

## 다운로드

<https://github.com/google/google-java-format/releases >에서 다운로드 받으면 된다.

## Examples

- 아래의 예제는 google java format 1.8 버전을 기준으로 한다.

```sh
 # 도움말과 모든 옵션을 본다.
java -jar ~/google-java-format-1.8-all-deps.jar

 # 현재 디렉토리와 그 하위 디렉토리의 Java 파일을 모두 찾아 포매터를 적용한다.
java -jar ~/google-java-format-1.8-all-deps.jar \
  -r \
  `find . -name '*.java'`

 # Dry-Run. 포매터를 적용한 결과를 출력하고 파일을 저장하지는 않는다.
java -jar ~/google-java-format-1.8-all-deps.jar \
  `find . -name '*.java'`

 # import 문을 정리한다. 사용하지 않는 import는 삭제하고, 순서도 정렬한다.
java -jar ~/google-java-format-1.8-all-deps.jar \
  --fix-imports-only \
  -r \
  `find . -name '*.java'`
```

## IntelliJ 플러그인으로 사용

google-java-format은 IntelliJ 플러그인으로도 사용할 수 있다.

IntelliJ Marketplace에서 `google-java-format`으로 검색하면 바로 나온다.

이후 `Other Settings` - `google-java-format Settings`에서 `Enable google-java-format`에 체크해준다.
(단, 프로젝트마다 별도로 설정해줘야 한다.)

이렇게 설정해준 프로젝트는 `option command L`로 `Reformat Code` 명령을 실행하면, `google-java-format`이 IntelliJ의 기본 포매터 대신 실행된다.

## Links

- <https://github.com/google/google-java-format >

