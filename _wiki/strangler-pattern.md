---
layout  : wiki
title   : 교살자 패턴, 스트랭글러 패턴 (strangler pattern)
summary : 레거시 시스템을 점진적으로 교체하여 레거시 시스템을 단계적으로 페이드아웃한다
date    : 2020-01-18 07:50:57 +0900
updated : 2020-07-16 23:07:57 +0900
tag     : pattern
toc     : true
public  : true
parent  : [[index]]
latex   : false
---
* TOC
{:toc}

## 요약

* 레거시 시스템의 일부를 새로운 애플리케이션이나 서비스로 교체한다.
* 일정 기간이 지난 후, 대체된 레거시 기능을 제거한다.
* 위의 두 작업을 반복한다.

주로 백엔드 애플리케이션을 전체적으로 새로운 아키텍처로 구성해야 할 필요가 있을 때 사용하는 패턴이다.

단기간에는 이룰 수 없으며 여러 해에 걸쳐 많은 개발자가 필요하다.

## 어원

### 마틴 파울러의 블로그
Martin Fowler가 아내인 Cindy Folwer와 함께 호주에 갔을 때 본 Strangler figs라는 이름의 식물에서 기원한다.

다음은 마틴 파울러의 블로그 포스트 "[StranglerFigApplication][fowler-strangler]"에서 발췌한 내용이다.

> When Cindy and I went to Australia, we spent some time in the rain forests on the Queensland coast. One of the natural wonders of this area are the huge strangler figs. They seed in the upper branches of a tree and gradually work their way down the tree until they root in the soil. Over many years they grow into fantastic and beautiful shapes, meanwhile strangling and killing the tree that was their host.  
This metaphor struck me as a way of describing a way of doing a rewrite of an important system. Much of my career has involved rewrites of critical systems. You would think such a thing as easy - just make the new one do what the old one did. Yet they are always much more complex than they seem, and overflowing with risk. The big cut-over date looms, the pressure is on. While new features (there are always new features) are liked, old stuff has to remain. Even old bugs often need to be added to the rewritten system.
[^fowler-strangler]
>
> 제가 신디와 함께 호주에 갔을 때, 우리는 퀸즐랜드 해안의 열대 우림에서 시간을 보냈습니다. 이 지역 자연의 경이 중 하나는 거대한 교살자 무화과입니다. 그들은 나무의 윗 가지에 씨를 뿌리고 토양에 뿌리를 내릴 때까지 점차 나무 아래로 내려갑니다. 수년에 걸쳐 그들은 환상적이고 아름다운 모양으로 자라났고, 기생하는 나무를 교살해 죽였습니다.  
이 나무의 생존방식은 중요한 시스템을 다시 짜는 방법을 은유적으로 보여줘 저를 놀라게했습니다. 제 커리어의 주요 업무는 중요한 시스템을 다시 짜는 것이었습니다. 다른 사람이 보기에 이런 일은 쉽게 보일 수도 있습니다. 그냥 원래 있던 것과 같은 일을 하는 새로운 것을 만들면 되는 거 아니냐고 생각할 수 있죠. 그러나 이 일은 보기보다 복잡하고 위험합니다. 일정에 대한 압박이 상당하며 짧습니다. 게다가 새로운 기능(항상 새로운 기능이 있기 마련이죠)이 있으면 좋지만, 오래된 기능들은 그대로 돌아가야 합니다. 심지어 낡은 버그조차 다시 만든 시스템에 추가해야 할 수도 있습니다.

참고로 마틴 파울러는 "Strangler Application"이라는 이름이 폭력적인 의미가 있는 것 같다고 후회하며, 2019년 4월 29일에 자신의 블로그 글의 제목과 링크를 "StranglerFig Application"이라 수정하였다.

### 교살자 무화과에 대하여

[교살자 무화과 나무의 사진]( https://www.google.com/search?q=strangler+fig&tbm=isch )

제인 구달은 "희망의 씨앗"에서 교살자 무화과에 대해 언급한 바 있다.

> 교살자 무화과는 훨씬 더 사악하다. 이 나무의 씨앗은 다른 나무의 가지 속에서 발아해 뿌리를 서서히 땅 쪽으로 내려 보낸다. 일단 끝이 땅에 닿으면, 뿌리를 박는다. 숙주 나무를 빙 돌아서 늘어뜨려진 뿌리는 결국 숙주를 교살할 나무로 성장한다. 거대하고 오래된 교살자 무화과의 울퉁불퉁하고 비틀린 뿌리에 완전히 안긴, 캄보디아 앙코르와트 사원에 있는 유명한 건물을 보고 경이로움을 느꼈다. 나무와 건축물은 서로 단단히 뒤엉켜 각각 서로를 지지하지 않는다면 모두 붕괴될 것이다. 나는 교살자 무화과들이 멕시코에 있는 마야(Maya) 인들의 폐허 중 상당수에 존재하는 데 주목했다.[^goodall]

## From: 데브옵스 핸드북

> 이베이(eBay)에서 아키텍처를 다시 설계하는 경우, 팀은 아키텍처를 다시 작성하는 활동을 수행할 수 있을 정도로 문제점을 충분히 이해하고 있는지 확인하기 위해 작은 규모의 파일럿 프로젝트를 수행했다. 예를 들어, 샤우프의 팀은 2006년 풀 스택 자바로 사이트의 특정 부분을 이전하려고 했을 당시, 사이트의 페이지를 수익별로 정렬해 수익을 극대화할 수 있는 영역을 찾았다. 가장 높은 수익 영역을 선택해도 팀의 활동을 정당화할 정도로 비즈니스 수익이 충분하지 않다면 작업을 중단한다.
>
> 샤우프의 팀이 이베이에서 사용한 기법은 교살자 애플리케이션 패턴이라 불리는 것으로, 진화적 설계의 교과서적인 내용을 담고 있다. 아키텍처에서 더는 조직의 목표를 지원치 않는 기존 서비스를 "추출하고 교체"하는 대신, API에서 기존 기능에 대한 내용을 제거해 더 이상의 변경을 방지한다. 모든 신규 기능이 바람직한 신규 아키텍처를 사용하는 새로운 서비스로 구현되면, 필요한 경우에만 기존 시스템을 호출한다.  
교살자 애플리케이션 패턴은 모놀리식 애플리케이션의 일부를 마이그레이션하거나 강력하게 결합한(tightly coupled) 서비스를 느슨하게 결합한(loosely coupled) 서비스로 마이그레이션하는 경우에 유용하다. 우리는 자주, 강하게 결합하고, 너무 많이 상호적으로 연결된, 수년(또는 수십 년) 전에 만들어진 아키텍처에서 강하게 작업하고 있다는 사실을 깨닫는다.[^devops-handbook-230]

## 참고문헌

* 희망의 씨앗 / 제인 구달,게일 허드슨 저 / 사이언스북스 / 2014년 12월
* 데브옵스 핸드북 / 진 킴, 제즈 험블, 패트릭 드부아, 존 윌리스 저/김영기 역 외 1명 정보 더 보기/감추기 / 에이콘출판사 / 2018년 07월 06일 / 원제: The DevOps Handbook: How to Create World-Class Agility, Reliability, and Security in Technology Organizations

## Links

* [StranglerFigApplication (Martin Fowler)][fowler-strangler]
* [스트랭글러 패턴 (docs.microsoft.com)][ms-strangler]

## 주석

[^fowler-strangler]: 출처는 [fowler-strangler][fowler-strangler].
[^goodall]: 제인 구달의 희망의 씨앗. 2장. 식물계. 뿌리.
[^devops-handbook-230]: 데브옵스 핸드북. 13장. 230쪽.

[fowler-strangler]: https://martinfowler.com/bliki/StranglerFigApplication.html
[ms-strangler]: https://docs.microsoft.com/ko-kr/azure/architecture/patterns/strangler
