---
layout  : wiki
title   : 유의적 버전 넘버 관리 (Semantic Versioning)
summary : 주버전.부버전.수버전
date    : 2020-01-12 18:33:50 +0900
updated : 2020-01-12 21:46:28 +0900
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

[semver-eng]: https://semver.org/
[semver-kor]: https://semver.org/lang/ko/
