---
layout  : wiki
title   : 교살자 패턴, 스트랭글러 패턴 (strangler pattern)
summary : 레거시 시스템을 점진적으로 교체하여 레거시 시스템을 단계적으로 페이드아웃한다
date    : 2020-01-18 07:50:57 +0900
updated : 2021-10-03 10:35:55 +0900
tag     : pattern
resource: F7/90F218-996C-431C-84E6-31E163F6D11F
toc     : true
public  : true
parent  : [[/pattern]]
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

## 어원: 마틴 파울러의 블로그
Martin Fowler가 아내인 Cindy Folwer와 함께 호주에 갔을 때 본 Strangler figs라는 이름의 식물에서 기원한다.

다음은 마틴 파울러의 블로그 포스트 "[StranglerFigApplication][fowler-strangler]"에서 발췌한 내용이다.

> When Cindy and I went to Australia, we spent some time in the rain forests on the Queensland coast. One of the natural wonders of this area are the huge strangler figs. They seed in the upper branches of a tree and gradually work their way down the tree until they root in the soil. Over many years they grow into fantastic and beautiful shapes, meanwhile strangling and killing the tree that was their host.  
This metaphor struck me as a way of describing a way of doing a rewrite of an important system. Much of my career has involved rewrites of critical systems. You would think such a thing as easy - just make the new one do what the old one did. Yet they are always much more complex than they seem, and overflowing with risk. The big cut-over date looms, the pressure is on. While new features (there are always new features) are liked, old stuff has to remain. Even old bugs often need to be added to the rewritten system.
>
-- [Martin Fowler의 StranglerFigApplication][fowler-strangler]

>
> 제가 신디와 함께 호주에 갔을 때, 우리는 퀸즐랜드 해안의 열대 우림에서 시간을 보냈습니다. 이 지역 자연의 경이 중 하나는 거대한 교살자 무화과입니다. 그들은 나무의 윗 가지에 씨를 뿌리고 토양에 뿌리를 내릴 때까지 점차 나무 아래로 내려갑니다. 수년에 걸쳐 그들은 환상적이고 아름다운 모양으로 자라났고, 기생하는 나무를 교살해 죽였습니다.  
이 나무의 생존방식은 중요한 시스템을 다시 짜는 방법을 은유적으로 보여줘 저를 놀라게했습니다. 제 커리어의 주요 업무는 중요한 시스템을 다시 짜는 것이었습니다. 다른 사람이 보기에 이런 일은 쉽게 보일 수도 있습니다. 그냥 원래 있던 것과 같은 일을 하는 새로운 것을 만들면 되는 거 아니냐고 생각할 수 있죠. 그러나 이 일은 보기보다 복잡하고 위험합니다. 일정에 대한 압박이 상당하며 짧습니다. 게다가 새로운 기능(항상 새로운 기능이 있기 마련이죠)이 있으면 좋지만, 오래된 기능들은 그대로 돌아가야 합니다. 심지어 낡은 버그조차 다시 만든 시스템에 추가해야 할 수도 있습니다.

참고로 마틴 파울러는 "Strangler Application"이라는 이름이 폭력적인 의미가 있는 것 같다고 후회하며, 2019년 4월 29일에 자신의 블로그 글의 제목과 링크를 "StranglerFig Application"이라 수정하였다.

## From: 제인 구달의 희망의 씨앗

[교살자 무화과 나무의 사진]( https://www.google.com/search?q=strangler+fig&tbm=isch )

제인 구달은 "희망의 씨앗"에서 교살자 무화과에 대해 언급한 바 있다.

> 교살자 무화과는 훨씬 더 사악하다. 이 나무의 씨앗은 다른 나무의 가지 속에서 발아해 뿌리를 서서히 땅 쪽으로 내려 보낸다. 일단 끝이 땅에 닿으면, 뿌리를 박는다. 숙주 나무를 빙 돌아서 늘어뜨려진 뿌리는 결국 숙주를 교살할 나무로 성장한다. 거대하고 오래된 교살자 무화과의 울퉁불퉁하고 비틀린 뿌리에 완전히 안긴, 캄보디아 앙코르와트 사원에 있는 유명한 건물을 보고 경이로움을 느꼈다. 나무와 건축물은 서로 단단히 뒤엉켜 각각 서로를 지지하지 않는다면 모두 붕괴될 것이다. 나는 교살자 무화과들이 멕시코에 있는 마야(Maya) 인들의 폐허 중 상당수에 존재하는 데 주목했다.
>
-- 제인 구달의 희망의 씨앗 / 2장. 식물계. 뿌리.

## From: 데브옵스 핸드북

> 이베이(eBay)에서 아키텍처를 다시 설계하는 경우, 팀은 아키텍처를 다시 작성하는 활동을 수행할 수 있을 정도로 문제점을 충분히 이해하고 있는지 확인하기 위해 작은 규모의 파일럿 프로젝트를 수행했다. 예를 들어, 샤우프의 팀은 2006년 풀 스택 자바로 사이트의 특정 부분을 이전하려고 했을 당시, 사이트의 페이지를 수익별로 정렬해 수익을 극대화할 수 있는 영역을 찾았다. 가장 높은 수익 영역을 선택해도 팀의 활동을 정당화할 정도로 비즈니스 수익이 충분하지 않다면 작업을 중단한다.
>
> 샤우프의 팀이 이베이에서 사용한 기법은 교살자 애플리케이션 패턴이라 불리는 것으로, 진화적 설계의 교과서적인 내용을 담고 있다. 아키텍처에서 더는 조직의 목표를 지원치 않는 기존 서비스를 "추출하고 교체"하는 대신, API에서 기존 기능에 대한 내용을 제거해 더 이상의 변경을 방지한다. 모든 신규 기능이 바람직한 신규 아키텍처를 사용하는 새로운 서비스로 구현되면, 필요한 경우에만 기존 시스템을 호출한다.  
교살자 애플리케이션 패턴은 모놀리식 애플리케이션의 일부를 마이그레이션하거나 강력하게 결합한(tightly coupled) 서비스를 느슨하게 결합한(loosely coupled) 서비스로 마이그레이션하는 경우에 유용하다. 우리는 자주, 강하게 결합하고, 너무 많이 상호적으로 연결된, 수년(또는 수십 년) 전에 만들어진 아키텍처에서 강하게 작업하고 있다는 사실을 깨닫는다.
>
-- 데브옵스 핸드북 / 13장 230쪽

## From: 마이크로서비스 도입 이렇게 한다

>
시스템을 재작성할 때 자주 사용하는 기법을 [교살자 무화과(Strangler Fig) 애플리케이션](https:// martinfowler.com/bliki/StranglerFigApplication.html )이라고 한다.
숙주 나무의 위쪽 가지에 씨앗을 뿌리는 무화과 나무를 보고 영감을 얻은 마틴 파울러가 처음으로 이 패턴을 떠올렸다.
숙주 나무에 씨를 뿌린 무화과는 뿌리를 내리기 위해 땅으로 뻗으며 점차 숙주 나무를 감싸게 된다.
기존 나무는 처음에는 새로운 무화과 나무의 지지대가 되다가 마지막 단계에 이르면 썩어서 죽어버리고, 그 자리에는 이제 스스로 생존이 가능해진 무화과 나무만 남게 된다.
>
소프트웨어 맥락에서 보면, 초기에 기존 시스템이 새로운 시스템을 지원하고, 새로운 시스템이 기존 시스템을 감싸는 형태로 병행된다.
기존 시스템과 새로운 시스템이 공존할 수 있으므로, 새로운 시스템은 성장할 시간을 얻고, 잠재적으로 기존 시스템을 완전히 대체할 수 있게 된다.
잠시 후 설명하겠지만, 이 패턴의 주요 장점은 새로운 시스템으로의 점진적인 마이그레이션을 허용한다는 우리의 목표를 뒷받침한다는 것이다.
또한 지금까지 배포된 새로운 시스템을 계속 활용하면서 마이그레이션을 일시 중지하거나 심지어 중단할 능력도 우리에게 제공한다.
>
-- 마이크로서비스 도입 이렇게 한다 / 3장


## 참고문헌

- 데브옵스 핸드북 / 진 킴, 제즈 험블, 패트릭 드부아, 존 윌리스 저/김영기 역 외 1명 정보 더 보기/감추기 / 에이콘출판사 / 2018년 07월 06일 / 원제: The DevOps Handbook: How to Create World-Class Agility, Reliability, and Security in Technology Organizations
- 마이크로서비스 도입 이렇게 한다 / 샘 뉴먼 저/박재호 역 / 책만 / 2021년 01월 20일 / 원서 : Monolith to Microservices: Evolutionary Patterns to Transform Your Monolith
- 희망의 씨앗 / 제인 구달,게일 허드슨 저 / 사이언스북스 / 2014년 12월

## Links

- [StranglerFigApplication (Martin Fowler)][fowler-strangler]
- [스트랭글러 패턴 (docs.microsoft.com)][ms-strangler]


[fowler-strangler]: https://martinfowler.com/bliki/StranglerFigApplication.html
[ms-strangler]: https://docs.microsoft.com/ko-kr/azure/architecture/patterns/strangler
