---
layout  : wiki
title   : Netflix의 설계와 문화
summary : 
date    : 2020-01-20 21:17:07 +0900
updated : 2020-01-20 21:50:07 +0900
tag     : availability
resource: 48/2FEBA5-1D25-40AD-AD80-2C24EC8A15C4
toc     : true
public  : true
parent  : [[legend]]
latex   : false
---
* TOC
{:toc}

## 2011년 4월 21일

[2011년 4월 21일, 아마존 AWS US-EAST 가용 영역 전체가 다운되었다.][aws-2011]

> 당시 Reddit과 Quora를 비롯한 거의 대부분의 고객이 해당 가용 영역에 의존하고 있었다. 그러나 놀랍게도 넷플릭스는 예외였다. 그 덕분에 넷플릭스는 대규모 AWS 중단 사태에 거의 영향을 받지 않았다.  
<br/>
사고 후, 넷플릭스가 서비스를 계속 운영한 방법에 대한 추측이 난무했다. 신빙성 있는 이론은 넷플릭스가 아마존 웹 서비스의 가장 큰 고객이었기 때문에 특별 대우를 받았다는 것이다. 그러나 넷플릭스는 자사 엔지니어링 블로그 게시물에서 2009년의 아키텍처 의사결정 덕분에 탁월한 탄력성이 가능했다고 설명했다.  
<br/>
2008년, 넷플릭스 온라인 비디오 전달 서비스는 한 데이터센터에서 호스팅되는 모놀리식 J2EE 애플리케이션으로 실행되고 있었다. 그러나 2009년 넷플릭스는 이 시스템 아키텍처를 클라우드 네이티브(cloud native)로 재구성하기 시작했다. 이 아키텍처는 아마존 공용 클라우드에서 완전하게 실행되며, 중대한 실패 상황에도 견딜 수 있을 정도로 탄력성을 갖도록 설계됐다.  
<br/>
넷플릭스의 구체적인 설계 목표는 US-EAST 사건처럼 전체 AWS 가용 영역이 다운되더라도 넷플릭스 서비스가 계속 실행되도록 하는 것이었다. 이를 위해 실패한 컴포넌트 때문에 전체 시스템이 다운되지 않도록 각 컴포넌트에 공격적인 타임아웃을 설정하고, 시스템을 느슨하게 결합해야 했다. 그 대신, 각 기능과 컴포넌트는 성능이 우아하게 저하되도록 설계됐다. 예를 들어, CPU 사용을 급증하게 하는 트래픽이 갑자기 늘어나는 경우, 사용자에게 개인화된 영화 목록을 표시하는 대신, 캐싱되거나 개인화되지 않은 정적 콘텐츠를 보여주는 식이었다. 결과적으로 이 방법은 더 적은 계산량이 필요했다.  
<br/>
또한 넷플릭스는 블로그에서 이런 아키텍처 패턴의 구현 외에도 프로덕션 서버를 계속 무작위로 종료시켜 AWS 오류를 시뮬레이션하는 놀랍고도 대담한 카오스 몽키(Chaos Monkey) 서비스를 만들어 수행해왔다고 설명했다. 넷플릭스는 모든 엔지니어링 팀이 클라우드 내의 특정 실패 수준을 능숙하게 대처하기 원했기 때문에 카오스 몽키 서비스를 실행했으며, 넷플릭스 서비스는 어떤 개입 없이도 자동으로 복구될 수 있었다.  
<br/>
다시 말해, 넷플릭스 팀은 운영 탄력성의 목표 달성을 위해 카오스 몽키를 실행했으며, 사전 프로덕션 환경과 프로덕션 환경에 실패 상황을 주입했다.  
<br/>
예상할 수 있듯이, 프로덕션 환경에서 카오스 몽키를 처음 실행했을 때 서비스는 전혀 예상 밖이거나 상상할 수 없는 방식 때문에 실패했다. 넷플릭스 엔지니어는 정상적인 근무 시간 동안, 이런 문제들을 계속 발견하고 수정함으로써 더 탄력적인 서비스를 반복해서 만들 수 있었다. 이와 동시에 경쟁 업체보다 훨씬 뛰어난 시스템을 개발할 수 있도록 조직적인 학습도 수행했다. 모두 일상적인 업무 시간 동안에 말이다.[^devops-handbook-333]

## Great Amazon Reboot of 2014

> 넷플릭스의 탄력성에 대한 더 흥미로운 예로는 Xen 보안 패치를 긴급하게 적용하기 위해 전체 Amazon EC2 서버군의 10% 정도가 재부팅해야 했던 "Great Amazon Reboot of 2014"를 들 수 있다. 넷플릭스 클라우드 데이터베이스 엔지니어링 팀의 크리스토스 칼렌티스(Christos Kalantzis)는 다음과 같이 말했다.  
<br/>
"긴급한 EC2 리부트 소식을 들었을 때, 우리는 놀라서 입이 다물어지지 않았다. 얼마나 많은 카산드라 노드가 영향을 받는지에 대한 목록을 받았을 때도 불편함을 느꼈다. 나는 우리 팀이 카오스 몽키를 이용해 연습한 내용을 기억했다. 그래서 '가져와!'라고 나도 모르게 말했다."  
<br/>
다시 말하면, 결과는 놀라웠다. 2,700개 이상의 카산드라 노드 중 218개가 재부팅됐고, 실패한 노드는 22개에 불과했다. 칼렌티스와 브루스 윙은 넷플릭스 카오스 엔지니어링에서 다음과 같이 말했다.  
<br/>
"넷플릭스는 주말에 가동 중지가 없었다. 반복적이고 정기적인 실패에 대한 연습, 심지어 영속성을 갖는 데이터베이스 계층도 모든 회사의 탄력성 계획에 포함돼야 한다. 카오스 몽키가 카산드라에 관여하지 않았다면 이 이야기의 결말은 매우 달랐을 것이다."  
<br/>
더 놀라운 사실은 넷플릭스에서는 카산드라 노드의 실패로 인해 발생한 사고를 처리하지 않았을 뿐 아니라 사무실에는 사고 처리를 위해 일하는 사람은 아무도 없었다. 넷플릭스 엔지니어들은 마일스톤의 완료를 기념하는 헐리우드의 파티에 있었다.[^devops-handbook-344]



## 실패를 재검토하는 문화

> 학습 문화와 위험 감수 계획을 강화하기 위해 모든 사람이 실패를 극복하고 편안히 학습할 수 있도록 지속적으로 장려하는 지도자가 필요하다.  
<br/>
로이 라파포트는 넷플릭스에서 실패에 대해 다음과 같이 말했다.  
<br/>
"2014 State of DevOps Report에서 높은 성과를 내는 데브옵스 조직은 더 자주 실패하고 잘못을 저지른다는 사실을 확인했다. 이것은 좋을 뿐 아니라 조직이 필요로 하는 것이다. 이는 데이터에서도 확인할 수 있다. 높은 성과를 내는 사람들은 더 자주 30배의 변경 시도를 한다. 이들이 갖고 있는 변경 실패의 비율은 절반이지만, 분명 더 많은 실패를 하고 있다.  
<br/>
나는 동료와 넷플릭스에서 발생한 엄청난 사고에 관해 말했다. 솔직히 말해, 이 사고의 원인은 어이없는 실수다. 실제로 지난 18개월 동안 넷플릭스에서 엔지니어에 의해 사고가 두 번 발생했다. 그렇지만, 해당 엔지니어를 해고하지 않았다. 그 대신 해당 엔지니어는 18개월간 운영과 자동화 상태를 엄청난 속도로 발전시켰다. 그 덕분에 일일 기반으로 안전하게 배포할 수 있었고, 엔지니어 개인적으로도 프로덕션 배포 횟수를 증가시킬 수 있었다."[^devops-handbook-343]

## 참고문헌

* 데브옵스 핸드북 / 진 킴, 제즈 험블, 패트릭 드부아, 존 윌리스 저/김영기 역 외 1명 정보 더 보기/감추기 / 에이콘출판사 / 2018년 07월 06일 / 원제: The DevOps Handbook: How to Create World-Class Agility, Reliability, and Security in Technology Organizations

## Links

* [Summary of the Amazon EC2 and Amazon RDS Service Disruption in the US East Region][aws-2011]
* [Lessons Netflix Learned from the AWS Outage][netflix-2011] - Netflix Engineering Blog의 2011년 4월 29일 게시글.

[aws-2011]: https://aws.amazon.com/ko/message/65648/
[netflix-2011]: https://netflixtechblog.com/lessons-netflix-learned-from-the-aws-outage-deefe5fd0c04

[^devops-handbook-333]: 데브옵스 핸드북. 19장. 333쪽.
[^devops-handbook-343]: 데브옵스 핸드북. 19장. 343쪽.
[^devops-handbook-344]: 데브옵스 핸드북. 19장. 344쪽.

