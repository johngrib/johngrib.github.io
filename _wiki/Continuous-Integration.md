---
layout  : wiki
title   : Continuous Integration(지속적 통합)
summary : 
date    : 2018-07-06 10:46:27 +0900
updated : 2018-07-10 18:40:25 +0900
tags    : 
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

오래 개발하고 드물게 통합하는 프로젝트와 빈번하게 통합하는 프로젝트.

* **2년 넘게 개발중인 프로젝트**
    * 통합 작업이 몇 달간 진행되고 있었음
    * 통합 작업이 언제 끝날지도 예상할 수 없는 상태
    * 통합은 굉장히 어려운 일이라는 것을 알게 되었다.

* **작업한 내용을 매일매일 소스코드 저장소에 통합하는 프로젝트**
    * 개발자 각각이 작업한 코드는 프로젝트에서 몇 시간 정도만 분리된다.
    * 분리되었던 시간이 길지 않으므로, 통합도 쉽고 빠르다.
    * 통합 과정에서 에러를 찾아내어 수정하기도 한다.

별 것 아닌 것 같아도, 큰 차이가 생긴다.

## 어원

* Continuous Integration라는 단어는 eXtreme Programming에서 온 것이다.
    * XP의 12가지 원칙 중에 CI가 있다.

## Building a Feature with Continuous Integration

몇 시간 안애 작업을 마칠 수 있는 작은 기능을 개발한다 치자.

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

잘 읽어보면 최근 흔하게 사용하고 있는 Git flow 라는 것을 알 수 있다.


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



# Links

* [Continuous Integration(Martin Fowler)](https://martinfowler.com/articles/continuousIntegration.html )
* [지속적 통합이란 무엇입니까? (aws)](https://aws.amazon.com/ko/devops/continuous-integration/ )
