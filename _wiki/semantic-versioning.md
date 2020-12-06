---
layout  : wiki
title   : 유의적 버전 넘버 관리 (Semantic Versioning)
summary : 주버전.부버전.수버전
date    : 2020-01-12 18:33:50 +0900
updated : 2020-12-06 23:53:38 +0900
tag     : 
toc     : true
public  : true
parent  : [[index]]
latex   : true
---
* TOC
{:toc}

## 형식
### 기본 형식

$$
\text{ Major.Minor.Patch }
$$

Major, Minor, Patch를 각각 주버전, 부버전, 수버전이라고도 부른다.

* 기존 버전과 호환되지 않는다면 Major(주主) 버전을 올린다.
* 새로운 기능을 추가하면 Minor(부部) 버전을 올린다.
* 버그를 고쳤다면 Patch(수修) 버전을 올린다.

예
* `0.1.0`
* `2.9.15`
* `1.15.0`

> 시맨틱 버전은 '메이저.마이너.패치'의 형식을 띤다.
메이저 번호 변경은 구 버전을 지원하지 않는 수준의 API 변경이 있음을 의미한다.
마이너 번호 변경은 API가 진화했지만 기존 클라이언트를 여전히 지원하는 수준의 API 변경만 있음을 의미한다.
패치 번호 변경은 기존 기능의 버그를 고쳤음을 의미한다.
>
> 시맨틱 버저닝은 클라이언트가 어떤 API를 사용할 수 있을지를 알게 해준다.
[^JOS-236]

### - 식별자가 있는 형식

이 방식은 pre release 버전을 표기할 때 쓰곤 한다.

$$
\text{Major.Minor.Patch} \color{red}{-} \text{identifier}
$$

identifier는 `-`로 시작하고, `.`을 구분자로 쓴다.

예
* `1.0.0-alpha`
* `1.0.0-alpha.1`
* `1.0.0-0.3.7`
* `1.0.0-x.7.z.92`

### + 식별자가 있는 형식

이 방식은 빌드 메타데이터를 표기할 때 쓴다.

$$
\text{Major.Minor.Patch}-\text{identifier} \color{red}{+}\text{metadata}
$$

예
* `1.0.0-alpha+001`
* `1.0.0+20130313144700`
* `1.0.0-beta+exp.sha.5114f85`


## 기억해 둘 사항들

* 최초 개발 배포 버전을 `0.1.0`으로 한다.
* 자릿수를 맞추기 위해 `0`으로 시작하는 숫자를 쓰지 않도록 한다.
    * 예를 들어 `2.07.1`은 좋지 않다. `2.7.1`을 쓰도록 하자.
* 부모 버전이 오르면 자식 버전은 `0`으로 초기화한다.
    * Major 버전이 오르면 Minor와 Patch 버전은 `0`으로 초기화한다.
    * Minor 버전이 오르면 Patch 버전은 `0`으로 초기화한다.

## 함께 읽기

* [[groupId-artifactId]]{Maven의 groupId 와 artifactId, 그리고 version}

## 참고문헌

* [Semantic Versioning 2.0.0][semver-eng]
* [유의적 버전 2.0.0-ko2][semver-kor]
* [JOS] 클라우드 네이티브 자바 / 조쉬 롱, 케니 바스타니 저/정윤진, 오명운, 장현희 역 / 책만 / 초판 1쇄 2018년 06월 29일

## 주석

[^JOS-236]: [JOS] 2.6장. 236쪽.
[semver-eng]: https://semver.org/
[semver-kor]: https://semver.org/lang/ko/
