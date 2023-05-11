---
layout  : wiki
title   : 우아한 성능 저하 (graceful degradation)
summary : 시스템이 실패 상황이 됐을 때, 전체 시스템이 중단되는 대신 일부 기능이라도 작동하도록 설계하는 방식
date    : 2023-05-11 23:07:07 +0900
updated : 2023-05-11 23:14:18 +0900
tag     : 
resource: 39/3BF582-2270-40A6-93FC-C5A62B556710
toc     : true
public  : true
parent  : [[/jargon]]
latex   : false
---
* TOC
{:toc}


## From: 정보통신용어사전

[정보통신용어사전]( http://word.tta.or.kr/dictionary/dictionaryView.do?subject=graceful%20degradation ) 에서는 다음과 같이 설명한다.

>
우아한 성능 저하, 優雅-性能低下, graceful degradation
>
- ① 컴퓨터 시스템의 고장이나 정지에 관하여 사용하는 용어. 일부 장치나 서브시스템에 고장이나 오동작이 나타났을 때 시스템을 축소 구성하여 운전을 계속하면서 시스템이 파국적으로 고장나지 않도록 하는 방식을 말한다. 페일 소프트(fail soft)와 거의 같은 의미이다.
- ② 통신이나 방송에서 수신 신호의 급격한 열화를 완만하게 하거나 단계화하는 방식. 디지털 전송에서는 수신 전파가 어떤 값 이하로 되면 수신할 수 없게 된다. 디지털 방송은 일반적으로 아날로그 방송보다 낮은 반송파 대 잡음비(CNR)로 수신이 가능하다. 그러나 CNR가 어떤 값 이하로 저하하면 수신 화질이 급격하게 열화하는 특성(이것을 클리프 효과라고 한다)이 있다. 그래서 전송 비트를 몇 개의 계층으로 나누어 각 계층마다 열화가 시작되는 CNR를 다른 값으로 설정하는 계층화 변조 방식을 사용해서 화질의 열화를 완만하게 한다.

## From: seobility wiki

[Graceful Degradation]( https://www.seobility.net/en/wiki/Graceful_Degradation )

>
Graceful degradation is a design principle that ensures that the functionality of a computer, machine, electronic system, or network can be maintained (albeit to a limited extent) if a large part of the system is destroyed or rendered inoperable. The purpose, therefore, is to prevent complete system failure. Ideally, there won’t be downtime in a system with this design even if multiple components fail simultaneously. Instead, the operating efficiency or speed gradually decreases as an increasing number of components fail. Graceful degradation is implemented in many corporate and security systems, as well as on the web.

점진적 성능 저하는 컴퓨터, 기계, 전자 시스템 또는 네트워크의 상당 부분이 파괴되거나 작동할 수 없게 된 경우에도 그 기능을 제한적이나마 유지할 수 있도록 하는 설계 원칙입니다. 따라서 완전한 시스템 장애를 방지하는 것이 목적입니다. 이상적으로는 여러 구성 요소가 동시에 장애가 발생하더라도 이러한 설계가 적용된 시스템에서는 다운타임이 발생하지 않습니다. 대신, 장애가 발생하는 구성 요소의 수가 증가함에 따라 작동 효율이나 속도가 점차 감소합니다. 점진적 성능 저하는 웹뿐만 아니라 많은 기업 및 보안 시스템에서 구현됩니다.

## From: developer.mozilla.org

[Graceful degradation]( https://developer.mozilla.org/en-US/docs/Glossary/Graceful_degradation )

이 문서에서는 다소 좁은 의미의 graceful degradation 을 설명한다.

>
Graceful degradation is a design philosophy that centers around trying to build a modern website/application that will work in the newest browsers, but falls back to an experience that while not as good still delivers essential content and functionality in older browsers.
>
Polyfills can be used to build in missing features with JavaScript, but acceptable alternatives to features like styling and layout should be provided where possible, for example by using the CSS cascade, or HTML fallback behavior. Some good examples can be found in Handling common HTML and CSS problems.
>
It is a useful technique that allows Web developers to focus on developing the best possible websites, given that those websites are accessed by multiple unknown user-agents. Progressive enhancement is related but different — often seen as going in the opposite direction to graceful degradation. In reality both approaches are valid and can often complement one another.

점진적 성능 저하란 최신 브라우저에서 작동하는 최신 웹사이트/애플리케이션을 구축하는 데 중점을 두되, 구형 브라우저에서 성능은 떨어지지만 필수 콘텐츠와 기능을 제공하는 경험으로 되돌아가는 디자인 철학입니다.

폴리필을 사용하여 자바스크립트로 누락된 기능을 빌드할 수 있지만, 스타일 및 레이아웃과 같은 기능에 대해서는 가능한 경우 CSS 캐스케이드 또는 HTML 폴백 동작을 사용하는 등 적절한 대안을 제공해야 합니다. 몇 가지 좋은 예는 일반적인 HTML 및 CSS 문제 처리하기에서 찾을 수 있습니다.

이는 웹 개발자가 알 수 없는 여러 사용자 에이전트가 웹 사이트에 액세스하는 경우 최상의 웹 사이트를 개발하는 데 집중할 수 있는 유용한 기술입니다. 점진적 개선과 점진적 성능 저하는 서로 연관되어 있지만 서로 다르며, 종종 점진적 성능 저하의 반대 방향으로 나아가는 것으로 간주됩니다. 실제로는 두 가지 접근 방식 모두 유효하며 종종 서로를 보완할 수 있습니다.

## 참고문헌

- [정보통신용어사전]( http://word.tta.or.kr/dictionary/dictionaryView.do?subject=graceful%20degradation )
- [Graceful Degradation (seobility.net)]( https://www.seobility.net/en/wiki/Graceful_Degradation )
- [Graceful degradation (developer.mozilla.org)]( https://developer.mozilla.org/en-US/docs/Glossary/Graceful_degradation )

