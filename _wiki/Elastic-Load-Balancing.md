---
layout  : wiki
title   : AWS ELB - Elastic Load Balancing
summary : AWS 로드 밸런서
date    : 2018-09-16 18:23:02 +0900
updated : 2018-09-16 22:06:25 +0900
tag     : aws devops
toc     : true
public  : true
parent  : aws
latex   : false
---
* TOC
{:toc}

# 개요

* <https://aws.amazon.com/elasticloadbalancing/ >

세 가지의 로드 밸런서를 제공한다.

* Application Load Balancer
* Network Load Balancer
* Classic Load Balancer

# Classic Load Balancer

연습삼아 클래식 로드 밸런서를 심플하게 만들어 보자.

* Amazon EC2 콘솔로 들어간다. <https://console.aws.amazon.com/ec2/ >
* `LOAD BALACING` - `Load Balancers` 선택.
* `Create Load Balancer` 클릭.
* `Classic Load Balancer` - `Create` 클릭.

이제 단계별 설정을 해 주면 된다.

## Step 1: Define Load Balancer

로드 밸런서 정의

* Load Balancer name : 로드 밸런서 이름을 지정해 준다.
* Create LB Inside : 로드 밸런서가 설치될 VPC. 기본값을 사용한다.
* Create an internal load balancer : 일단 선택하지 않는다(기본값).
* Load Balancer Protocol : 80을 열어둔다.
* 나머지도 모두 기본값을 선택한다.

## Step 2: Step 2: Assign Security Groups

보안 그룹 할당

* 새 보안 그룹을 만들거나, 기존의 보안 그룹을 선택한다.
* 프로토콜은 Step 1 에 맞춰 80을 열어둔다.

## Step 4: Step 4: Configure Health Check

상태 검사(Health Check) 구성

* 로드 밸런서는 주기적으로 각 인스턴스의 상태를 검사한다.
* 검사 결과를 보고 조건을 통과하는 인스턴스로만 트래픽을 라우팅하는 원리.

다음과 같이 설정한다.

* Ping Protocol : HTTP
* Ping Port : 80
    * 이 포트를 사용해 각 인스턴스의 상태를 검사한다.
    * Ping Protocol로 HTTPS를 선택했다면 포트 번호는 443으로 설정하자.

Advanced Details

* Response Timeout : 5 seconds (default)
    * 상태 검사 ping을 보내고 응답을 기다리는 타임아웃 시간.
* Interval : 30 seconds (default)
    * 상태를 검사 ping을 보내는 주기
* Unhealthy threshold : 2 (default)
    * 상태 검사가 2번 실패하면 해당 인스턴스를 비정상 상태로 판별한다.
* Healthy threshold : 10 (default)
    * 상태 검사가 10번 성공하면 해당 인스턴스를 정상 상태로 판별한다.

## Step 5: Add EC2 Instances

EC2 인스턴스 추가

* 로드 밸런서에 추가할 EC2 인스턴스를 선택해주면 된다.


## 생성

* 여기까지 설정하고 다른 옵션은 무시하고 일단 Create 해본다.
* 이후 `LOAD BALANCING` - `Load Balancers`로 가보면 방금 만든 로드 밸런서가 추가된 것을 볼 수 있다.
* 로드 밸런서를 선택하면 아래쪽에서 로드 밸런서의 DNS를 볼 수 있다.
* 두 인스턴스에 들어가 웹 서버 로그 등을 `tail -f`로 보면
    * 상태 검사 핑이 주기적으로 오는 것을 확인할 수 있다.
    * 웹 브라우저로 로드 밸런서의 DNS로 여러 차례 접속해보면 두 인스턴스에 번갈아가며 접속 로그가 올라가는 것을 볼 수 있을 것이다.

## Sticky Session 설정

한국어로는 **고정 세션 설정**이라고 한다.

* 로드 밸런서는 리퀘스트를 분배해주기 때문에, 사용자의 세션을 특정 인스턴스에 바인딩해서 해당 사용자의 모든 요청을 같은 인스턴스로 보내지 않으면 골치아픈 일이 일어날 수 있다.
    * 예를 들어 A 인스턴스에 접속해서 로그인을 했는데 새로 고침을 하면 B 인스턴스로 접속되어 로그아웃된 상태로 나오고, 다시 새로고침을 하면 A 인스턴스로 접속되어 다시 로그인 상태이고...
    * 이를 해결하려면 A에 붙은 사용자는 계속 A에만 붙게 해주고, B에 붙은 사용자는 계속 B에 붙게 해주면 된다.

AWS ELB의 고정 세션 설정을 하는 방법은 두 가지가 있다.

* Duration-Based Session Stickiness
    * 기간 기반 세션 고정
    * 쿠키에 유효 기간을 설정한 다음, 클라이언트와 서버가 쿠키를 주고받을 때 로드 밸런서가 쿠키를 보고 특정 인스턴스로 계속 연결해주는 방식.
* Application-Controlled Session Stickiness
    * 어플리케이션 제어 세션 고정
    * 인스턴스에서 실행되는 애플리케이션이 애플리케이션 쿠키를 삽입하는 방식.
    * 물론 애플리케이션에서 삽입하는 쿠키의 이름을 로드 밸런서에 알려줘야 한다.

### Duration-Based Session Stickiness

기간 기반 세션 고정

* Amazon EC2 콘솔로 들어간다. <https://console.aws.amazon.com/ec2/ >
* `LOAD BALANCING` - `Load Balancers`를 클릭한다.
* 세션 고정을 설정할 로드 밸런서를 선택.
* `Description`에서 `Port Configruation` - `Edit stickiness`를 선택.
* `Edit stickiness` 에서 `Enable load balancer generated cookie stickiness`를 선택.
* `Expiration Period`에 쿠키 만료 기간(초)을 설정한다.
    * 기간을 지정하지 않으면 브라우저 세션 기간 동안 고정 세션이 지속된다.

### Application-Controlled Session Stickiness

어플리케이션 제어 세션 고정

* Amazon EC2 콘솔로 들어간다. <https://console.aws.amazon.com/ec2/ >
* `LOAD BALANCING` - `Load Balancers`를 클릭한다.
* 세션 고정을 설정할 로드 밸런서를 선택.
* `Description`에서 `Port Configruation` - `Edit stickiness`를 선택.
* `Edit stickiness` 에서 `Enable application generated cookie stickiness`를 선택.
* `Cookie Name`에 애플리케이션 쿠키의 이름을 입력.


# Links

* [Elastic Load Balancing](https://aws.amazon.com/elasticloadbalancing/ )
* [ELB FAQs](https://aws.amazon.com/ko/elasticloadbalancing/faqs/ )
* [클래식 로드 밸런서를 위한 고정 세션 구성](https://docs.aws.amazon.com/ko_kr/elasticloadbalancing/latest/classic/elb-sticky-sessions.html )


