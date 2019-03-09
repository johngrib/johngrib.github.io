---
layout  : wiki
title   : AWS Auto Scaling
summary : 
date    : 2018-09-16 21:41:33 +0900
updated : 2018-09-16 22:06:33 +0900
tag     : aws devops
toc     : true
public  : true
parent  : aws
latex   : false
---
* TOC
{:toc}

# 개요

* <https://aws.amazon.com/autoscaling/ >

조건에 따라 EC2 인스턴스가 늘어나고 줄어든다.

# 실습

* [Amazon EC2 Auto Scaling 시작하기](https://docs.aws.amazon.com/ko_kr/autoscaling/ec2/userguide/GettingStartedTutorial.html ) 자습서가 매우 잘 정리되어 있다. 이것만 보면 될듯.

다음의 사항만 기억해 두고, 자습서를 따라 설정하면 된다.

* Auto Scaling은 AMI(Amazon Machine Image)를 사용해 새로운 EC2 인스턴스를 만든다.
* 따라서 Auto Scaling 을 사용하려면 서비스에 사용할 표준적인 EC2 인스턴스를 하나 만들어 둔 다음 이미지로 만들어 두어야 한다.
    * EC2 인스턴스 목록에서 - 이미지 - 이미지 생성을 선택하면 이미지를 만들 수 있다.
* Auto Scaling 그룹을 생성할 때 주의해야 할 것들.
    * 그룹 크기 증가의 조건은 민감하게 한다. (예: 70 <= CPU Utilization)
    * 그룹 크기 감소의 조건은 보수적으로 한다. (예: 10 >= CPU Utilization)
    * Scale out 작업시 새로운 인스턴스가 돌기까지 시간이 걸리므로, 다량의 트래픽이 예상되는 시점의 몇 시간 전부터 미리 준비를 해 두도록 한다. (고객 쿠폰 이벤트 등)



# Links

* [AWS Auto Scaling](https://aws.amazon.com/autoscaling/ )
* [Amazon EC2 Auto Scaling 시작하기](https://docs.aws.amazon.com/ko_kr/autoscaling/ec2/userguide/GettingStartedTutorial.html )
