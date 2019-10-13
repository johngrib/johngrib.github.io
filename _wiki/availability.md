---
layout  : wiki
title   : 가용성(Availability)
summary : 시스템이 다운되지 않고 정상 운영되는 시간의 비율
date    : 2019-09-20 09:10:51 +0900
updated : 2019-10-13 11:52:54 +0900
tag     : 
toc     : true
public  : true
parent  : what
latex   : true
---
* TOC
{:toc}

## 정의

한국어 위키백과에서는 가용성을 다음과 같이 정의한다.

>
**가용성**(可用性, Availability)이란 서버와 네트워크, 프로그램 등의 정보 시스템이 정상적으로 사용 가능한 정도를 말한다. **가동률**과 비슷한 의미이다. 가용성을 수식으로 표현할 경우, 가용성(Availability)이란 정상적인 사용 시간(Uptime)을 전체 사용 시간(Uptime+Downtime)으로 나눈 값을 말한다. 이 값이 높을수록 "가용성이 높다"고 표현한다. 가용성이 높은 것을 고가용성(HA, High Availability)이라고 한다.  
$$\text{Availability} = { E[\text{Uptime}] \over E[\text{Uptime}] + E[\text{Downtime}] }$$

$$\text{가용성} = { \text{Uptime} \over \text{Uptime} + \text{Downtime} }$$

다음은 "트랜잭션 처리의 원리"에서 인용한 것이다.

>
TP 시스템에 필요한 중요한 요구사항은 시스템이 항상 가동상태를 유지해야 한다는 것이다.
이것은 가용성이 매우 높은 시스템이어야 한다는 뜻이다.
그런 시스템을 흔히 '$$24 \times 365$$'라고도 하는데, 매일 24시간 연간 365일, 즉 연중 무휴로 가동하는 시스템이라는 의미이다.
가용성(availability)이 높은 시스템이란 정확하게 가동되면서 기대하는 결과가 나오는 시스템이다.
> 가용성은 두 가지 요인에 의해서 감소한다. 한 요인은 **시스템에 장애가 발생하는 비율**이다.
장애라는 말은 시스템이 잘못 응답하거나 응답을 하지 않음을 의미한다.
시스템의 다른 조건이 같을 때 장애가 자주 발생한다면 그 시스템은 가용성이 낮은 시스템이다.
또 하나의 요인은 **복구시간**이다.
시스템의 다른 조건이 같을 때 장애가 발생한 후에 시스템을 복구하는 데 걸리는 시간이 길수록 시스템의 가용성은 낮아진다.
이런 개념은 평균가동시간(mean time between failure, MTBF)와 평균복구시간(mean time to repair, MTTR)으로 표현된다.
평균가동시간은 장애가 발생하기 전에 시스템이 가동되는 평균시간이다.
평균가동시간은 시스템 신뢰성의 척도다.
평균복구시간은 장애가 발생한 후에 시스템을 수리하거나 복구하는 데 걸리는 시간이다.
이들 두 척도를 이용하여 가용성을 $$ { MTBF \over MTBF + MTTR } $$로 정의할 수 있다.
그러므로 가용성은 신뢰성이 증가할수록, 복구시간이 감소할수록 향상된다.
[^bernstein-define]

$$\text{가용성} = { \text{평균가동시간} \over \text{평균가동시간} + \text{평균복구시간} }$$

## 가용성 테이블

* 다음 표는 99% ~ 99.999%의 가용성을 기준으로 서비스 불가 시간을 계산해 본 것이다.
* 계산은 울프람알파로 했다.

| 가용성  | year            | month           | week            | day             | hour            |
|---------|-----------------|-----------------|-----------------|-----------------|-----------------|
| 99%     | [3.65 day][2y]  | [7.3 hour][2m]  | [1.68 hour][2w] | [14.4 min][2d]  | [36 sec][2h]    |
| 99.9%   | [8.76 hour][3y] | [43.8 min][3m]  | [10.08 min][3w] | [1.44 min][3d]  | [3.6 sec][3h]   |
| 99.99%  | [52.56 min][4y] | [4.38 min][4m]  | [60.48 sec][4w] | [8.64 sec][4d]  | [0.36 sec][4h]  |
| 99.999% | [5.256 min][5y] | [26.28 sec][5m] | [6.048 sec][5w] | [0.864 sec][5d] | [0.036 sec][5h] |

## 높은 가용성을 얻으려면

일반적으로 높은 가용성을 얻으려면 다음 사항들에 대해 고려해 두어야 한다.

>
* 환경 - 물리적 환경인 전원, 통신회선, 항온항습기 등의 장애를 방지한다.
* 시스템 관리 - 시스템 관리자 및 벤더의 유지보수 오류에 기인하는 장애를 방지한다.
* 하드웨어 - 어떤 컴포넌트가 장애일 경우에 다른 컴포넌트로 즉시 자동적으로 대체할 수 있도록 이중화하여 설치한다.
* 소프트웨어 - 소프트웨어의 신뢰성을 향상시키고, 장애 발생시 소프트웨어가 자동적으로 신속하게 복구될 수 있도록 한다.[^high-availability]

## 참고문헌

* 웹
    * [가용성(wikipedia)](https://ko.wikipedia.org/wiki/가용성 )
* 도서
    * 마이크로서비스 구축과 운영 / 수잔 파울러 저/서영일 역 / 에이콘출판사 / 발행 2019년 05월 31일 / 원서 : Production-Ready Microservices: Building Standardized Systems Across an Engineering Organization
    * 트랜잭션 처리의 원리 / 필립 A. 번스타인, 에릭 뉴코머 공저 / 한창래 역 / KICC(한국정보통신) / 1판 1쇄 2011년 12월 19일

## 주석

[^high-availability]: 트랜잭션 처리의 원리. 1.6 가용성. 44쪽.
[^bernstein-define]: 트랜잭션 처리의 원리. 7 시스템 복구. 239쪽. 국내 번역판에는 'mean time to repair(MTTR)'로 나와 있기에 원서를 확인해 보니 'mean time between repair'로 나와 있기에 원서의 표현을 따랐다.

[2y]: https://www.wolframalpha.com/input/?i=%7Bconvert+1+year+to+seconds%7D+*+0.01
[3y]: https://www.wolframalpha.com/input/?i=%7Bconvert+1+year+to+seconds%7D+*+0.001
[4y]: https://www.wolframalpha.com/input/?i=%7Bconvert+1+year+to+seconds%7D+*+0.0001
[5y]: https://www.wolframalpha.com/input/?i=%7Bconvert+1+year+to+seconds%7D+*+0.00001
[2m]: https://www.wolframalpha.com/input/?i=%7Bconvert+1+month+to+seconds%7D+*+0.01
[3m]: https://www.wolframalpha.com/input/?i=%7Bconvert+1+month+to+seconds%7D+*+0.001
[4m]: https://www.wolframalpha.com/input/?i=%7Bconvert+1+month+to+seconds%7D+*+0.0001
[5m]: https://www.wolframalpha.com/input/?i=%7Bconvert+1+month+to+seconds%7D+*+0.00001
[2w]: https://www.wolframalpha.com/input/?i=%7Bconvert+1+week+to+seconds%7D+*+0.01
[3w]: https://www.wolframalpha.com/input/?i=%7Bconvert+1+week+to+seconds%7D+*+0.001
[4w]: https://www.wolframalpha.com/input/?i=%7Bconvert+1+week+to+seconds%7D+*+0.0001
[5w]: https://www.wolframalpha.com/input/?i=%7Bconvert+1+week+to+seconds%7D+*+0.00001
[2d]: https://www.wolframalpha.com/input/?i=%7Bconvert+1+day+to+seconds%7D+*+0.01
[3d]: https://www.wolframalpha.com/input/?i=%7Bconvert+1+day+to+seconds%7D+*+0.001
[4d]: https://www.wolframalpha.com/input/?i=%7Bconvert+1+day+to+seconds%7D+*+0.0001
[5d]: https://www.wolframalpha.com/input/?i=%7Bconvert+1+day+to+seconds%7D+*+0.00001
[2h]: https://www.wolframalpha.com/input/?i=%7Bconvert+1+hour+to+seconds%7D+*+0.01
[3h]: https://www.wolframalpha.com/input/?i=%7Bconvert+1+hour+to+seconds%7D+*+0.001
[4h]: https://www.wolframalpha.com/input/?i=%7Bconvert+1+hour+to+seconds%7D+*+0.0001
[5h]: https://www.wolframalpha.com/input/?i=%7Bconvert+1+hour+to+seconds%7D+*+0.00001

