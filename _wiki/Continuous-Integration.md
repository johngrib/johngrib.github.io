---
layout  : wiki
title   : Continuous Integration(지속적 통합)
summary : 
date    : 2018-07-06 10:46:27 +0900
updated : 2019-07-06 23:26:37 +0900
tag     : 
toc     : true
public  : true
parent  : what
latex   : false
---
* TOC
{:toc}

# 마틴 파울러의 Continuous Integration 요약

* [Martin Fowler의 Continuous Integration](https://martinfowler.com/articles/continuousIntegration.html )

## CI

>
Continuous Integration is a software development practice where members of a team integrate their work frequently,
usually each person integrates at least daily - leading to multiple integrations per day.

* 지속적 통합이란 일종의 소프트웨어 개발 지침(practice)이다.
* 팀의 구성원들이 각자 작업한 내용을 빈번하게 통합하는 활동이다.
    * 통합 빈도는 최소한 1일로 잡는다. 즉, 매일매일 통합하도록 하자.
    * 하루에도 여러 차례 통합이 이루어지도록 하자.

오래 개발하고 드물게 통합하는 프로젝트와 빈번하게 통합하는 프로젝트의 비교.

**2년 넘게 개발 중인 드물게 통합하는 프로젝트**

* 통합 작업이 몇 달간 진행되고 있었음.
* 통합 작업이 언제 끝날지도 예상할 수 없는 상태.
* 통합은 굉장히 어려운 일이라는 것을 알게 되었다.

**작업한 내용을 매일매일 소스 코드 저장소에 통합하는 프로젝트**

* 개발자 각각이 작업한 코드는 프로젝트에서 몇 시간 정도만 분리된다.
* 분리되었던 시간이 길지 않아 통합이 쉽고 빠르다.
* 통합 과정에서 에러를 찾아내어 수정하기도 한다.

별것 아닌 것 같아도, 큰 차이가 생긴다.

## 어원

* Continuous Integration이라는 단어는 eXtreme Programming에서 온 것이다.
    * XP의 12가지 원칙 중에 CI가 있다.

## Building a Feature with Continuous Integration

몇 시간 안에 작업을 마칠 수 있는 작은 기능을 개발한다 치자.

1. 최신 통합 소스를 로컬에 다운받는다.
2. 코드를 수정하고, 테스트 코드를 추가한다.
3. 작업을 마치면 로컬 머신에서 빌드하고, 테스트 코드도 돌려본다.
4. 빌드와 테스트 모두 에러가 없다면 성공이다.
5. 성공했다면 저장소로 변경 내역을 커밋한다.
6. 만약 내가 커밋하기 전에 다른 사람이 변경한 코드가 머지된 상태라면?
    1. 다른 사람이 변경한 내역도 받아서 내가 수정한 코드와 함께 빌드하고 테스트한다.
    2. 에러가 발생할 경우, 수정한 다음 다시 빌드/테스트한다.
7. 통합 저장소에서 빌드 후 테스트한다.
8. 성공했다면 일이 끝나게 된다.


# AWS의 "지속적 통합이란 무엇입니까?" 요약

* [지속적 통합이란 무엇입니까?](https://aws.amazon.com/ko/devops/continuous-integration/ )

>
**지속적 통합**은 자동화된 빌드 및 테스트가 수행된 후,
개발자가 코드 변경 사항을 중앙 리포지토리에 정기적으로 병합하는 데브옵스 소프트웨어 개발 방식입니다.

* 지속적 통합의 목표
    * 소프트웨어 품질 개선.
    * 개발자 생산성 향상
    * 버그를 빨리 찾아내는 것.
    * 새로운 소프트웨어 업데이트 검증 시간 최소화.
    * 배포 소요 시간 최소화.

# (책)마이크로서비스 아키텍처 구축

챕터 6, 153쪽.

> CI를 통한 핵심 목표는 모든 사람이 서로 동기를 맞추는 것이며,
그것은 새롭게 체크인된 코드가 기존 코드와 적절히 통합됨을 보장함으로써 달성할 수 있다.
이를 위해 CI 서버는 코드의 커밋을 감지하고, 체크아웃하고, 코드의 컴파일과 테스트 통과를 확인하는 것과 같은 몇 가지 검증을 한다.  
CI 과정의 일부로 우리는 테스트를 위해 실행할 서비스를 배포하는 것처럼 추가 확인을 위한 산출물(artifact)을 자주 생성한다.
이상적으로 각각 한 번씩만 이 산출물을 빌드하고 그 버전의 코드에 대한 배포로 사용하기 원한다.
이것은 같은 작업을 반복하지 않기 위한 것이며, 이를 통해 배포된 산출물이 테스트에 사용된 것과 동일한 것임을 확신할 수 있다.
이들 산출물의 재사용을 위해 우리는 CI 도구나 별도 시스템에서 제공되는 저장소와 같은 곳에 산출물을 저장한다.

Jez Humble의 3가지 질문.

>
* 하루에 한 번 메인 브랜치에 체크인하는가?
* 변경을 확인할 테스트 집합이 있는가?
* 빌드가 깨졌을 때 팀이 그것을 최우선으로 해결하는가?




# Links

* [Continuous Integration(Martin Fowler)](https://martinfowler.com/articles/continuousIntegration.html )
* [지속적 통합이란 무엇입니까? (aws)](https://aws.amazon.com/ko/devops/continuous-integration/ )

# 참고문헌

* 마이크로서비스 아키텍처 구축 / 샘 뉴먼 저 / 정성권 역 / 한빛미디어 / 초판 2쇄 2017년 05월 01일 / 원서 : Building Microservices: Designing Fine-Grained Systems
