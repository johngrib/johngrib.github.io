---
layout  : wiki
title   : 퍼사드 패턴 (Facade Pattern)
summary : 복잡한 서브 시스템에 대해 간단한 인터페이스를 제공한다
date    : 2023-09-18 22:52:38 +0900
updated : 2023-09-20 17:02:16 +0900
tag     : 
resource: BB/AB59E3-453F-4563-9AFC-235AABCF978C
toc     : true
public  : true
parent  : [[/pattern]]
latex   : false
---
* TOC
{:toc}

## 단어: façade

"façade"는 프랑스어로, "건물의 정면"을 뜻하는 명사이다.

- fəˈsɑːd 라고 읽는다.
    - ç 가 없는 영어 알파벳에서는 그냥 facade라고 쓴다.
    - 'ç'에 대해서는 [wikipedia]( https://en.wikipedia.org/wiki/%C3%87 )를 참고할 것.

[Cambridge Dictionary]( https://dictionary.cambridge.org/dictionary/english/facade )에서는 façade를 다음과 같이 설명한다.

>
the front of a building, especially a large or attractive building:


## 개요

>
**의도**  
한 서브시스템 내의 인터페이스 집합에 대한 획일화된 하나의 인터페이스를 제공하는 패턴으로,
서브시스템을 사용하기 쉽도록 상위 수준의 인터페이스를 정의합니다.
>
**동기**  
시스템을 서브시스템으로 구조화하면 복잡성을 줄이는 데에 큰 도움이 됩니다.
공통적인 설계 목표는 서브시스템들 사이의 의사소통 및 종속성을 최소화하려는 것입니다.
이런 목표를 달성하도록 도와주는 패턴이 **퍼사드**입니다.
주어진 서브시스템의 일반적인 기능에 대한 단순화된 하나의 인터페이스를 제공하려는 것입니다.
>
![]( /resource/BB/AB59E3-453F-4563-9AFC-235AABCF978C/facade.jpg )
[^gof-254]

<span/>

>
Facade는 복잡한 코드를 단순화해 주고, 조잡하게 설계되고, 지나치게 복잡한 서브시스템을 쉽게 사용할 수 있도록 도와준다.
서브시스템들, 특히 오래된 서브 시스템들이 스파게티 코드 덩어리라 가정해 보자.
두 서브시스템이 상호 작용할 때 이들은 종종 서로를 직접 호출하게 되고 거미줄과 같이 엮여 버린 연결은 끔찍한 유지 보수 문제를 낳는다.
이 경우 서브시스템들은 매우 깨지기 쉬운데 하나의 서브시스템에서 일어난 별 것 아닌 것 같은 수정이 전체 프로그램에 영향을 미칠 수 있기 때문이다.
Facade는 이러한 문제를 프로그래머로 하여금 잘 정의된 단일 접근점을 통해 서브시스템을 사용하도록 함으로써 해결한다.
이를 통해 프로그래머는 Facade 너머에 코드의 복잡성으로부터 보호받을 수 있다.
Facade는 시스템 간의 독립성을 향상시켜주므로 변화를 용이하게 해주며, 때에 따라선 Facade 너머에 영향을 미치지 않으면서 이쪽 서브시스템을 교체할 수 있도록 해준다.
Facade는 또한 레거시 코드를 객체 지향적인 구조로 바꿀 수 있는 관리 가능한 방법을 제공한다.
[^holub-464]

## 사례

### GoF: 컴파일러

GoF 책에서는 컴파일러를 예로 들어 보인다.

>
(전략)
>
그러나 응용프로그램들 대부분은 이런 구체적인 내용에 상관없이 파싱이나 코드 생성 단계를 단순히 이용하기만 합니다.
즉, 코드 컴파일만 되면 끝인 거죠.
이들에게는 강력하지만 하위 수준에 있는 인터페이스가 오히려 일을 복잡하게 만들 뿐입니다.
>
이런 클래스들로부터 사용자를 보호할 수 있는 더 상위 수준의 인터페이스를 제공하기 위해,
컴파일러 시스템은 컴파일러 클래스를 정의하고 컴파일러가 제공하는 기능성에 대한 인터페이스를 정의합니다.
즉, 우리는 컴파일러 사용의 각 명령어만을 이용할 뿐, 실제 컴파일러가 어떤 클래스를 이용하여 컴파일 과정을 구현하는지는 알 필요가 없습니다.
>
이런 Compiler 클래스를 우리는 퍼사드 객체로 정의합니다.
즉, Compiler 클래스 사용자에게는 컴파일러 시스템을 사용하는 데 필요한 가장 필수적인 인터페이스만을 제공하고, 내부적으로는 컴파일러 기능성을 구현하는 클래스들을 함께 동작하도록 묶어주는 역할도 수행합니다.
[^gof-254]

### 메뉴판

>
MenuSite는 Facade 디자인 패턴의 예가 된다.
Facade 패턴의 핵심은 단순한 인터페이스를 통해 복잡한 시스템을 쉽게 접근할 수 있도록 하는 것이다.
자바가 제공하는 기본적인 기본적인 메뉴 API를 직접 사용하면 메뉴 시스템을 만드는 것인 너무 복잡하다는 문제가 있다.
많은 클래스를 생성해야 하고, 이들은 적절히 내장시켜야 하며, 리스터를 부착해야 한다.
결국 불필요한 코드들을 너저분히 작성해야 하고, 결과적으로 코드를 유지 보수하기 어려워지게 된다.
MenuSite Facade의 주안점은 이러한 복잡성을 감추고, 몇 개의 간단한 메소드 호출만으로도 메뉴를 생성할 수 있도록 하는 것이다.
[^holub-182]


### 관공서/은행의 창구

관공서나 은행의 창구도 퍼사드 패턴의 한 사례라 할 수 있을 것이다.

다음은 내가 그린 그림이다.

![]( /resource/BB/AB59E3-453F-4563-9AFC-235AABCF978C/office.svg )

- 민원인이 해당 서브 시스템들을 알지 못해도 원하는 일을 처리할 수 있도록 획일화된 인터페이스를 제공한다.
- 창구에 방문한 민원인은 창구 직원에게 민원을 말한다.
    - 민원인은 창구 뒤에서 어떻게 민원을 처리하는지 자세히 알지 않아도 된다.
    - 그러나 실제로 창구 뒤에서는 다양한 서브 시스템이 동작하고 있다.

## adapter 패턴과의 비교 {#compare-with-adapter-pattern}

'패턴을 활용한 리팩터링'에서는 다음과 같이 facade 패턴과 [[/pattern/adapter]]을 비교한다.

>
Adapter 패턴은 Facade[DP] 패턴과 자주 혼동된다.
두 패턴이 모두 어떤 코드를 더 쉽게 사용할 수 있도록 만든다는 공통점이 있지만 적용하는 수준이 다르다.
Adapter 패턴은 객체 수준에서의 어댑팅을 수행하는 것이고, Facade 패턴은 어떤 서브시스템 전체를 어댑팅하는 것이다.
>
Facade 패턴은 레거시 시스템과 통신하기 위해 사용하는 경우가 많다.
예를 들어, 어떤 기업에 COBOL로 작성된 시스템이 있는데, 이 시스템의 코드가 매우 복잡 미묘하고 2백만 줄이나 된다고 하자.
이 시스템은 한번도 리팩터링 작업을 거친 적이 없기 때문에, 확장과 유지보수가 매우 어렵다.
그럼에도 불구하고, 이 시스템에는 중요한 기능이 포함되어 있기 때문에 새로 만드는 시스템도 이 레거시 시스템에 의존할 수밖에 없다.
>
이런 상황에서는 Facade 패턴이 유용하다.
퍼사드<sup>facade</sup>는 새 시스템에 설계가 좋지 않고 복잡한 레거시 코드에 대한 좀더 단순한 뷰<sup>view</sup>를 제공한다.
새 시스템은 퍼사드 객체와 통신하고, 이 퍼사드 객체가 레거시 코드와 관련된 복잡한 작업을 대신하는 것이다.
>
레거시 시스템의 서브시스템 하나씩을 퍼사드로 대체해 나가면서, 결국에는 레거시 시스템 전체를 안전하게 새로 구현할 수도 있다.
[^joshua-349]

## 함께 읽기

- [[/pattern/adapter]]

## 참고문헌

- GoF의 디자인 패턴(개정판) / 에릭 감마, 리처드 헬름, 랄프 존슨, 존 블라시디스 공저 / 김정아 역 / 프로텍미디어 / 발행 2015년 03월 26일
- 실전 코드로 배우는 실용주의 디자인 패턴 / Allen Holub 저 / 송치형 편역 / 사이텍미디어 / 발행 2006년 07월 19일 / 원제 : Holub on Patterns : Learning Design Patterns by Looking at Code
- 패턴을 활용한 리팩터링 / 조슈아 케리에브스키 저 / 윤성준, 조상민 공역 / 인사이트(insight) / 신판 1쇄 발행 2011년 02월 09일 / 원제 : REFACTORING TO PATTERNS

## 주석

[^gof-254]: GoF의 디자인 패턴(개정판). 254쪽.
[^holub-182]: 실용주의 다자인 패턴. 182쪽.
[^holub-464]: 실용주의 다자인 패턴. 464쪽.
[^joshua-349]: 패턴을 활용한 리팩터링. 349쪽.

