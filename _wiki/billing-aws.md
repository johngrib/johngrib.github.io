---
layout  : wiki
title   : AWS 요금
summary : 가랑비에 옷이 젖지 않도록 하자
date    : 2018-09-17 10:05:48 +0900
updated : 2018-09-17 10:13:03 +0900
tag     : aws money
toc     : true
public  : true
parent  : aws
latex   : false
---
* TOC
{:toc}

# 월 사용료 조회

* <https://console.aws.amazon.com/billing/home#/bills >

# 프리 티어 사용량 알림 수신 설정하기

AWS 프리 티어 사용량 제한에 도달하거나 초과하면 이메일이 온다.

* <https://console.aws.amazon.com/billing/home#/preferences >
    * 프리 티어 사용량 알림 수신에 체크.
    * 알림을 받을 이메일 주소도 입력한다.

# 경보 생성하기

* <https://console.aws.amazon.com/cloudwatch/home?#alarm:alarmFilter=ANY >
    * 규칙을 설정해 경보가 이메일로 오도록 할 수 있다.
    * 예를 들어 사용 요금이 $10 을 초과하게 되면 이메일로 알림이 오게 할 수 있다.

# Links

* docs.aws.amazon.com
    * [청구서 보기](https://docs.aws.amazon.com/ko_kr/awsaccountbilling/latest/aboutv2/getting-viewing-bill.html )
    * [월별 요금 보기](https://docs.aws.amazon.com/ko_kr/awsaccountbilling/latest/aboutv2/invoice.html )
    * [Amazon CloudWatch 경보 만들기](https://docs.aws.amazon.com/ko_kr/AmazonCloudWatch/latest/monitoring/AlarmThatSendsEmail.html )

