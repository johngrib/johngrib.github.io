---
layout  : wiki
title   : 가용성(Availability)
summary : 사용 가능한 정도
date    : 2019-09-20 09:10:51 +0900
updated : 2019-09-20 10:06:50 +0900
tag     : 
toc     : true
public  : true
parent  : what
latex   : true
---
* TOC
{:toc}

## 위키백과의 정의

한국어 위키백과에서는 가용성을 다음과 같이 정의한다.

>
**가용성**(可用性, Availability)이란 서버와 네트워크, 프로그램 등의 정보 시스템이 정상적으로 사용 가능한 정도를 말한다. **가동률**과 비슷한 의미이다. 가용성을 수식으로 표현할 경우, 가용성(Availability)이란 정상적인 사용 시간(Uptime)을 전체 사용 시간(Uptime+Downtime)으로 나눈 값을 말한다. 이 값이 높을수록 "가용성이 높다"고 표현한다. 가용성이 높은 것을 고가용성(HA, High Availability)이라고 한다.  
$$\text{Availability} = { E[\text{Uptime}] \over E[\text{Uptime}] + E[\text{Downtime}] }$$

## 가용성 테이블

* 다음 표는 99% ~ 99.999%의 가용성을 기준으로 서비스 불가 시간을 계산해 본 것이다.
* 계산은 울프람알파로 했다.

| 가용성  | year            | month           | week            | day             | hour            |
|---------|-----------------|-----------------|-----------------|-----------------|-----------------|
| 99%     | [3.65 day][2y]  | [7.3 hour][2m]  | [1.68 hour][2w] | [14.4 min][2d]  | [36 sec][2h]    |
| 99.9%   | [8.76 hour][3y] | [43.8 min][3m]  | [10.08 min][3w] | [1.44 min][3d]  | [3.6 sec][3h]   |
| 99.99%  | [52.56 min][4y] | [4.38 min][4m]  | [60.48 sec][4w] | [8.64 sec][4d]  | [0.36 sec][4h]  |
| 99.999% | [5.256 min][5y] | [26.28 sec][5m] | [6.048 sec][5w] | [0.864 sec][5d] | [0.036 sec][5h] |

## 참고문헌

* 웹
    * [가용성(wikipedia)](https://ko.wikipedia.org/wiki/가용성 )
* 도서
    * 마이크로서비스 구축과 운영 / 수잔 파울러 저/서영일 역 / 에이콘출판사 / 발행 2019년 05월 31일 / 원서 : Production-Ready Microservices: Building Standardized Systems Across an Engineering Organization


[^nines]: 마이크로서비스 구축과 운영. 2장 생산 준비 기준 갖추기. 59쪽.
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
