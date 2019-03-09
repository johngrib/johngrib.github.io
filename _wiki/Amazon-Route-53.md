---
layout  : wiki
title   : Amazon Route 53
summary : 
date    : 2018-09-16 09:37:08 +0900
updated : 2018-09-16 22:06:15 +0900
tag     : aws devops
toc     : true
public  : true
parent  : aws
latex   : false
---
* TOC
{:toc}

# 개요

* <https://console.aws.amazon.com/route53/ >

크게 세 가지 기능을 갖추고 있다.

* 도메인 이름 등록
* 인터넷 트래픽을 도메인의 리소스로 라우팅
* 리소스의 상태 확인

# 다양한 라우팅 정책

[Route 53 라우팅 정책](https://docs.aws.amazon.com/ko_kr/Route53/latest/DeveloperGuide/routing-policy.html )
문서를 읽어 보면 다양한 라우팅 정책을 선택해 활용할 수 있다는 것을 알 수 있다.

* Simple Routing
* Failover Routing
    * 장애 조치 라우팅.
    * **첫 번째 리소스가 비정상일 경우 다른 리소스로 트래픽을 라우팅.**
    * [Active-Active and Active-Passive Failover](https://docs.aws.amazon.com/ko_kr/Route53/latest/DeveloperGuide/dns-failover-types.html#dns-failover-types-active-passive )
* Geolocation Routing
    * 지리적 라우팅.
    * 사용자의 지리 위치, 즉 DNS 쿼리가 발생하는 위치를 기반으로 트래픽을 제공하는 리소스를 선택할 수 있다.
    * 콘텐츠를 지역화하고 웹 사이트의 일부 또는 전체를 사용자의 언어로 제공할 수 있다.
* Geoproximity Routing (Traffic Flow Only)
    * 지리 근접 라우팅(트래픽 흐름 전용).
* Latency-based Routing
    * 지연 시간 기반 라우팅.
    * 사용자들의 요청을 지연 시간이 가장 낮은 AWS 리전에서 처리.
* Multivalue Answer Routing
    * 다중 응답 라우팅.
    * DNS 쿼리에 대해 다수의 값(예: 웹 서버의 IP 주소)을 반환한다.
    * "다수의 상태 확인 가능한 IP 주소를 반환하는 기능은 DNS를 사용하여 가용성 및 로드 밸런싱을 개선하는 한 방법입니다."
* Weighted Routing
    * 가중치 기반 라우팅.
    * 각 리소스로 라우팅되는 트래픽 비율을 선택할 수 있다.

잘 활용하면 돈이 매우 부족한 상황에서도 다양한 용도로 사용할 수 있을 것 같다.

# 사용

## Register Domain

### 도메인 만들고 등록하기

* <https://console.aws.amazon.com/route53/home#DomainRegistration: >에서 도메인을 만들어 등록할 수 있다.
* 도메인 주소가 필요하다면 등록해 보자.

가격은 2018년 9월 16일 기준으로 대충 다음과 같다.

| 도메인   | 가격($)/1년 |
| -------- | --------:   |
| .com     | 12          |
| .net     | 11          |
| .io      | 39          |
| .info    | 12          |
| .co      | 25          |
| .me      | 17          |
| .ac      | 48          |
| .be      | 9           |
| ...      | ...         |

* 이 외에도 수많은 도메인 종류가 있다.
* 가격을 보고 목적에 따라 적절한 것을 고르도록 하자.
* `.com`이 인기가 매우 높은데도 1년에 12달러로 싼 편이다.
* `.be`가 1년에 9달러로 꽤 싸다.

이후 자신이 선택한 도메인 이름을 추가해(예: `mydomain.com`) 카트에 넣고 등록하면 비용을 지불하게 된다.

* 등록 과정에서 등록자의 이메일 주소, 전화번호, 집 주소 등을 필수로 입력해야 한다.
    * 영어 주소는 [juso.go.kr](http://www.juso.go.kr/openEngPage.do )의 영문 주소 기능을 이용하면 쉽게 알 수 있다.
    * 한국 전화번호라면 `010...`이 아니라 `+8210...`으로 입력하면 된다.
* 입력을 완료하면
    * 진행 과정이 나타나며, 몇 시간에서 하루 정도 후 등록이 완료된다.
    * AWS에 등록한 신용 카드로 지불이 되었다는 문자가 온다. (`해외승인 미국 Amazon w...`)
* 등록이 완료된 도메인은 <https://console.aws.amazon.com/route53/home#hosted-zones: >에서 확인할 수 있다.

### 도메인을 자신의 서버와 연결하기

* <https://console.aws.amazon.com/route53/home#hosted-zones: >에서 등록한 도메인(`mydomain.com`)을 클릭해 들어간다.
* `Create Record Set`을 클릭해 레코드 추가 화면으로 들어간다.
    * 오른쪽의 입력칸에 도메인 네임(`www.mydomain.com`, `game.mydomain.com` 등등)과 서버 주소(IPv4 address 등)를 입력하고 `Create`를 클릭한다.
    * EC2 주소나 로드 밸런서 주소를 입력하면 된다.
* 레코드가 추가된다.
* 추가된 레코드를 클릭해 선택한다.
* `Test Record Set`으로 선택한 레코드를 테스트하는 화면으로 이동한다.
* `Get response`를 클릭했을 때 `NOERROR`가 출력되면 잘 연결된 것이다.
* 웹 브라우저로 접속해보고 직접 확인해보자.


# Links

* [Amazon Route 53 Documentation](https://aws.amazon.com/documentation/route53/?nc1=h_ls )
    * [한국어](https://aws.amazon.com/ko/documentation/route53/ )
* [Amazon Route 53이 무엇입니까?](https://docs.aws.amazon.com/ko_kr/Route53/latest/DeveloperGuide/Welcome.html )
* [Route 53 라우팅 정책](https://docs.aws.amazon.com/ko_kr/Route53/latest/DeveloperGuide/routing-policy.html )
