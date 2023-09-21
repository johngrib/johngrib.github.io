---
layout  : wiki
title   : 책임연쇄 패턴 (Chain of Responsibility Pattern)
summary : 요청을 처리할 객체가 나타날 때까지 객체 연결을 따라간다
date    : 2023-09-20 17:04:29 +0900
updated : 2023-09-21 20:54:39 +0900
tag     : 
resource: E7/72F156-8273-4CA8-A3A7-13EB09B5699A
toc     : true
public  : true
parent  : [[/pattern]]
latex   : false
---
* TOC
{:toc}

## 의도

GoF 책에서는 다음과 같이 의도를 설명한다.

>
메시지를 보내는 객체와 이를 받아 처리하는 객체들 간의 결합도를 없애기 위한 패턴입니다.
하나의 요청에 대한 처리가 반드시 한 객체에서만 되지 않고, 여러 객체에게 그 처리 기회를 주려는 것입니다.
[^gof-298]

유키 히로시의 'Java 언어로 배우는 디자인 패턴 입문'에서는 이 패턴을 이해하기 쉽게 비유로 설명해 준다.

>
어떤 사람에게 요구를 합니다.
그 사람이 그것을 처리할 수 있으면 처리하고,
처리할 수 없으면 그 요구를 '다음 사람'에게 넘깁니다.
다음 사람이 그 요구를 처리할 수 있으면 처리하고, 처리할 수 없으면 '또 다음 사람'에게 책임을 넘깁니다.
이것이 Chain of Responsibility 패턴입니다.
[^yuki-254]

## 구조

![]( /resource/E7/72F156-8273-4CA8-A3A7-13EB09B5699A/structure.svg ) [^gof-301]

>
- Handler(HelpHandler):의 요청을 처리하는 인터페이스를 정의하고, 후속 처리자(successor)와 연결을 구현합니다. 즉, 연결 고리에 연결된 다음 객체에게 다시 메시지를 보냅니다.
- ConcreteHandler(PrintButton, PrintDialog): 책임져야 할 행동이 있다면 스스로 요청을 처리하여 후속 처리자에 접근할 수 있습니다. 즉, 자신이 처리할 행동이 있으면 처리하고, 그렇지 않으면 후속 처리자에 다시 처리를 요청합니다.
- Client: ConcreteHandler 객체에게 필요한 요청을 보냅니다.
[^gof-302]

## 예제
### From: Java 언어로 배우는 디자인 패턴 입문

다음은 'Java 언어로 배우는 디자인 패턴 입문'에서 소개하는 코드 예제의 일부이다.

```java
Support alice = new NoSupport("Alice");
Support bob = new LimitSupport("Bob", 100);
Support charlie = new SpecialSupport("Charlie", 429);
Support diana = new LimitSupport("Diana", 200);
Support elmo = new OddSupport("Elmo");
Support fred = new LimitSupport("Fred", 300);

// 사슬의 형성
alice.setNext(bob).setNext(charlie).setNext(diana).setNext(elmo).setNext(fred);

// 다양한 트러블 발생
for (int i = 0; i < 500; i += 33) {
    alice.support(new Trouble(i));
}
```
[^yuki-260]

위의 코드만 읽어도 충분히 이 패턴에 대한 설명이 되므로 다른 구현체는 모두 생략한다.

단, 이 예제가 이 패턴의 전형이라고 받아들이지 말 것.
책임연쇄 패턴을 구현하는 방법은 매우 다양하다.

내가 이 예제를 구현한다면 `setNext`처럼 메소드 체인을 사용하지 않고, 간단한 함수 리스트로 작업할 것이다.

## 사례

### 마우스 포인터 포커스 처리

'실용주의 디자인 패턴'에서는 마우스가 움직일 때 포커스를 받은 각 객체들이 다르게 작동하는 것을 사례로 소개한다.

책임연쇄 패턴의 '단점'을 소개하는 사례이지만, 책임연쇄 패턴의 핵심을 이해하기 쉽게 잘 설명해 준다.

>
마이크로소프트 윈도에서는 마우스가 1픽셀 움직일 때 `WM_MOUSEMOVE` 메시지가 우선 포커스를 받은 Window에 전달된다.
만약 이 컨트롤이 메시지를 어떻게 처리해야 하는지를 모른다면 이 메시지를 자신을 포함하고 있는 패널로 전달하고,
이러한 과정이 MDI 윈도, 메인 프레임, 메뉴 바, 메뉴 바의 각 메뉴 아이템으로 반복된다.
이때 어떤 객체도 메시지를 처리할 수 없으면 메시지를 버리게 된다.
많은 일을 했지만 아무런 일도 벌어지지 않는다.
[^holub-472]

### GoF: GUI 애플리케이션의 문맥 도움말 기능

다음은 GoF 책에서 소개하는 사례이다.

>
그래픽 사용자 인터페이스(GUI)에 있는 문맥 감지 도움말(context-sensitive help) 기능을 생각해 봅시다.
사용자가 정보를 선택하면 그 부분에 대한 도움말 정보를 얻을 수 있습니다.
그러나 도움말의 내용은 선택한 주체가 무엇이며, 현재 그 주체의 상황이 어떠한가에 따라 다를 수 있습니다.
즉, 대화상자 내에 있는 버튼 위젯은 기본 위도우에 있는 버튼과 내용이 다른 도움말을 제공해야 합니다.
만약, 선택한 주체에 대한 구체적인 도움말이 없다면,
도움말 시스템은 적어도 응용프로그램이 정의한 일반적인 도움말이라도 제공할 수 있어야 합니다.
>
따라서 도움말 정보는 구체적인 내용부터 일반적인 내용까지 내용의 일반성에 따라서 구성하는 것이 자연스럽습니다.
게다가, 도움말에 대한 요청은 여러 사용자 인터페이스 객체 중 어느 하나로 처리된다고 보는 게 명확합니다.
즉, 도움말 요청이 어떤 상황에서 발생했는지에 따라서, 요청을 받은 객체가 직접 그 요청을 처리하지 않을 수도 있습니다.
어느 정도의 구체적인 도움말이 가능한가에 따라 여러 인터페 이스 중 하나가 이 요청을 처리할 수 있습니다.
허나, 문제는 궁극적으로 도움말을 제공해야 할 객체가 도움말 요청을 보내는 객체(예를 들어, 버튼 같은 인터페이스 객체)에게 알려져 있지 않다는 것입니다.
즉, 요청을 일으키는 객체는 실제로 자신에게 해당 도움말을 제공하는 객체가 누구인지 알 수 없다는 것입니다.
이를 위해서 우리는 도움말 요청을 발생시키는 버튼과 도움말 정보를 제공하는 객체를 분리해야 할 필요가 있습니다.
이 부분의 기작을 정의하는 패턴이 바로 책임 연쇄 패턴입니다.
>
![]( /resource/E7/72F156-8273-4CA8-A3A7-13EB09B5699A/context-help.svg ) [^gof-298]

다이어그램을 보면 이해하기 좋다.

도움말 기능을 켠 다음, `OK` 버튼을 선택한 상황이라 하자.
이 때, `OK` 버튼의 기능은 누가 봐도 명백해서 딱히 도움말이 마련되어 있지 않다고 상상해 보자.

1. 도움말 기능은 `OK` 버튼의 `handler`에 도움말을 요청한다.
2. `OK` 버튼이 도움말을 제공하지 않으므로, `handler`는 요청을 다음 객체로 전달한다.
3. 요청이 `PrintDialog`로 전달된다.
4. 도움말 기능은 `PrintDialog`의 `hander`에 도움말을 요청한다.
5. `PrintDialog`가 제공하는 도움말이 출력된다.


### XML 태그 생성기

'패턴을 활용한 리팩터링'에서는 XML 태그 생성기를 사례로 소개한다.

>
```java
public class TagBuilderTest...
  public void testRepeatingChildrenAndGrandchildren()...
    ...
    TagBuilder builder = new TagBuilder("flavors");
    for (int i = 0; i < 2; i++) {
      builder.addToParent("flavors", "flavor");
      builder.addChild("requirements");
      builder.addChild("requirement");
    }
    assertXmlEquals(expectedXml, builder.toXml());
```

>
`addToParent()`를 구현하는 방식은 다음과 같다.
원하는 부모 노드의 이름을 파라미터로 받고, `TagBuilder`의 `currentNode` 노드의 이름과 비교한다.
이름이 일치하면 `currentNode` 노드에 새 자식 노드를 추가한 후 끝내면 되고,
그렇지 않으면 `currentNode` 노드의 부모를,
그리고 또 그 부모를 계속 따라 올라가며 이름이 일치하는 노드를 만나거나 혹은 널을 만날 때까지 계속 비교하는 것이다.
참고로 이런 방식을 Chain of Responsibility[DP] 패턴이라 한다.
[^joshua-156]


## 참고문헌

- GoF의 디자인 패턴(개정판) / 에릭 감마, 리처드 헬름, 랄프 존슨, 존 블라시디스 공저 / 김정아 역 / 프로텍미디어 / 발행 2015년 03월 26일
- Java 언어로 배우는 디자인 패턴 입문 [개정판] / Yuki Hiroshi 저 / 이규흥 역 / 영진닷컴 / 1판 9쇄 2017년 3월 5일
- 실전 코드로 배우는 실용주의 디자인 패턴 / Allen Holub 저 / 송치형 편역 / 사이텍미디어 / 발행 2006년 07월 19일 / 원제 : Holub on Patterns : Learning Design Patterns by Looking at Code
- 패턴을 활용한 리팩터링 / 조슈아 케리에브스키 저 / 윤성준, 조상민 공역 / 인사이트(insight) / 신판 1쇄 발행 2011년 02월 09일 / 원제 : REFACTORING TO PATTERNS

## 주석

[^gof-298]: GoF의 디자인 패턴(개정판). 5장. 298쪽.
[^gof-301]: GoF의 디자인 패턴(개정판). 5장. 301쪽.
[^gof-302]: GoF의 디자인 패턴(개정판). 5장. 302쪽.
[^joshua-156]: 패턴을 활용한 리팩터링. 6장. 156쪽.
[^holub-472]: 실용주의 디자인 패턴. 472쪽.
[^yuki-254]: Java 언어로 배우는 디자인 패턴 입문. 14장. 254쪽.
[^yuki-260]: Java 언어로 배우는 디자인 패턴 입문. 14장. 260쪽.

