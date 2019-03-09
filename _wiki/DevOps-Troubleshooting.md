---
layout  : wiki
title   : (책) 데브옵스 - 개발자, QA, 관리자가 함께 보는 리눅스 서버 트러블슈팅 기법
summary : DevOps Troubleshooting - Linux Server Best Practices
date    : 2017-12-05 19:22:28 +0900
updated : 2018-02-08 22:32:03 +0900
tag     : book linux
toc     : true
public  : true
parent  : book
latex   : false
---
* TOC
{:toc}

## 개요

* 이 책의 대상 독자 : 리눅스 시스템 경험이 많지 않은 개발자와 QA.

굉장히 실용적인 책이다. 데브옵스가 마주할 수 있는 다양한 문제 상황과 해결책을 제시한다.

# 요약 정리

## 01 문제 해결 우수사례

* 한 번에 많은 원인을 배제할 수 있는 테스트부터 수행할 것.
* 느리고 복잡한 테스트보다 빠르고 간단한 테스트부터 수행할 것.
* 문제점과 해결책을 문서화할 것.
* 문제 발생 전, 시스템의 어떤 부분이 변경되었는지 파악할 것.
* 평소에 시스템의 동작 방식을 공부할 것.
* 인터넷을 참고하되, 생각 없이 복붙하지 말 것.
* 무작정 재부팅하지 말 것.
    * 재부팅해도 문제가 해결되지 않는다면 소용이 없다.
    * 재부팅해서 문제가 해결된다면 원인을 알 수 없게 된다.

## 02 왜 서버가 이렇게 느리지? CPU, RAM 그리고 디스크 I/O의 자원 고갈

* 시스템 부하 조사 방법 및 분석 방법
    * [[uptime]] 사용법
    * [[top]] 사용법
    * sysstat 사용법
    * sar 사용법

## 03 왜 시스템이 부팅되지 않을까? 부팅 문제 해결하기

## 04 왜 디스크에 쓸 수 없는가? 용량이 가득 찼거나 오류가 생긴 디스크 문제 해결하기


## Links

* [DevOps Troubleshooting: Linux Server Best Practices 1st Edition(amazon.com)](https://www.amazon.com/DevOps-Troubleshooting-Linux-Server-Practices/dp/0321832043)
* [데브옵스(위키북스)](http://wikibook.co.kr/devops/ )
* [Kyle Rankin(twitter)](https://twitter.com/kylerankin) - 저자 트위터
