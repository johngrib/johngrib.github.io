---
layout  : wiki
title   : 프로토타입 패턴 (Prototype Pattern)
summary : 
date    : 2023-09-16 21:07:06 +0900
updated : 2023-09-17 11:03:29 +0900
tag     : 
resource: A5/05D983-3E2E-4D0C-8ABE-C309FEB96F75
toc     : true
public  : true
parent  : [[/pattern]]
latex   : false
---
* TOC
{:toc}

- 다음과 같이 불린다.
    - 프로토타입
    - 원형

## 의도

GoF 책에서는 다음과 같이 패턴의 의도를 밝힌다.

>
원형이 되는(prototypical) 인스턴스를 사용하여 생성할 객체의 종류를 명시하고,
이렇게 만든 견본을 복사해서 새로운 객체를 생성합니다.[^gof]

구조는 다음과 같다.[^gof-171]

![]( /resource/A5/05D983-3E2E-4D0C-8ABE-C309FEB96F75/prototype.svg )

- Prototype: 자신을 복제하는 데 필요한 인터페이스를 정의한다.
- ConcretePrototype: 자신을 복제하는 연산을 구현한다.
- Client: 원형(Prototype)에 자기 자신의 복제를 요청하여 새로운 객체를 생성한다.

## 주의할 점

- 프로토타입의 각 서브타입들이 모두 `clone()`을 정확하게 구현해야 한다.
    - 즉, `clone()` 구현 작업이 어렵거나 불가능한 경우에는 프로토타입 패턴을 사용하지 않는 것이 좋다.
    - 객체가 순환참조 값을 포함하고 있는 경우에 특히 주의할 것.
    - deep copy가 필요한 경우가 있을 수 있다.
        - deep copy 코딩 실수로 복제한 여러 인스턴스의 일부 상태가 공유될 수 있다는 점에 주의.
- 객체 복사가 쉽거나 기본적으로 지원되는 프로그래밍 언어에서는 이 패턴이 필요없을 수 있다.
    - GoF에 의하면 C++ 에서는 유용하지만, Smalltalk나 Objective-C에서는 중요하지 않은 패턴이라고 한다.[^gof-174]
    - Kotlin의 경우 모든 데이터 클래스는 `copy()`를 기본적으로 갖고 있다.
        - `copy()`를 그대로 사용해 인스턴스 복제본을 생성할 수도 있고, named parameter를 사용해서 일부 프로퍼티만 변경한 복제본을 생성할 수도 있다.

## 사례

설명이 복잡해 보이지만 다음 사례들을 생각해보는 것이 도움이 될 수 있다.

### 그림 그리기 애플리케이션

프로토타입 패턴을 사용하는 가장 대표적인 사례는 그림 그리기 애플리케이션이다.

- 그림 그리기 애플리케이션을 만든다고 생각해 보자.
    - 삼각형, 타원, 별모양, 사람 모양 등의 다양한 도형을 미리 제공해서 사용자가 아이콘만 클릭해도 도형을 그릴 수 있게 하는 그림 프로그램.
    - 이 모든 도형들은 모두 `Prototype` 인터페이스를 구현하게 된다.
        - 사용자가 별 모양을 그리기 위해 별 모양 아이콘을 클릭하면, 별 모양의 `Prototype`을 복제하여 새로운 별 모양 객체를 생성한다.

다음은 그림 그리기 도구 [draw.io](https://app.diagrams.net/ )를 사용하는 장면의 스크린샷이다.

![]( /resource/A5/05D983-3E2E-4D0C-8ABE-C309FEB96F75/example-draw-tool.jpg )
{:style="max-width:350px"}

사람 모양 도형을 클릭하면 까만색 막대, 흰색 배경의 사람 모양이 그려지며 바로 아래에는 `Actor`라는 이름이 붙어 있다.

[draw.io](https://app.diagrams.net/ )에서 실제로 이 패턴을 사용하는지는 모르겠지만, 내가 그림 그리기 도구를 만들어야 한다면 나는 이 패턴을 사용할 것 같다.

다양한 기본 도형 하나하나를 xml이나 json 파일로 정의해 뒀다고 하자.

- 그렇다면 사용자가 도형을 그릴 때마다 파일을 읽어서 객체를 생성하는 것은 비효율적이다.
- 애플리케이션을 실행할 때 한 번에 모두 읽어서 프로토타입으로 만들어두는 것이 낫다.
    - 사용자가 도형을 그릴 때마다 프로토타입을 복제하여 새로운 객체를 생성해 리턴해주면 된다.
    - 물론 도형 정의 파일이 너무 많다면 모두 읽는 게 아니라 lazy하게 필요할 때 읽어서 프로토타입으로 만들 수도 있다.

![]( /resource/A5/05D983-3E2E-4D0C-8ABE-C309FEB96F75/example-drawing.svg )

```java
class GraphicFactory {
    // 설정 파일에서 읽은 다양한 도형의 프로토타입을 미리 갖고 있다.
    private final Map<String, Graphic> prototypeMap;

    public GraphicFactory(String configFileName) {
        this.prototypeMap = readConfigFilesAndCreateMap(configFileName);
    }

    // 새로운 모양을 생성해주는 팩토리 같지만 실제로는 프로토타입을 복사해서 나눠주는 일을 하는 메소드.
    public Graphic newGraphic(String graphicName) {
        Graphic prototypeGraphic = prototypeMap.get(graphicName);
        if (prototypeGraphic == null) {
            throw new IllegalArgumentException(
                "찾을 수 없는 graphicName 이므로 복제할 수 없습니다.");
        }
        return prototypeGraphic.clone();
    }

    Map<String, Graphic> readConfigFilesAndCreateMap(String fileName) {
        Map<String, Graphic> map = new HashMap<>();

        // 파일을 읽어 for loop 을 돌면서 각 도형 인스턴스를 생성해 map 에 등록한다.
        // 설정 파일에 지정한 도형의 기본 타입을 읽고 concrete class 인스턴스를 생성한다.

        return map;
    }
}
```

## 인용
### From: 실용주의 디자인 패턴

나는 Allen Holub의 다음 설명이 이 패턴을 쉽게 설명한다고 생각한다.

>
1\. 객체가 어떤 타입인지를 알지 못해도 동일 타입의 객체를 여러 개 생성할 수 있다.
[[/pattern/abstract-factory]]{AbstractFactory}에서는 Concrete Product를 초기화하는 데 필요한 정보(예를 들어 생성자의 인자) 등이 컴파일 타임에 알려져 있어야 한다.
대부분의 [[/pattern/abstract-factory]]{Abstract Factory} 구체화는 인자가 없는 디폴트 생성자를 사용한다.
하지만 [[/pattern/abstract-factory]]{Abstract Factory}를 사용하여 디폴트 상태에 있지 않은 객체를 생성하려면 우선 객체를 생성한 후, 이를 외부에서 수정해 주어야 하는데 수정을 코드의 이곳 저곳에서 해주어야 할 때도 있다.
이런 경우 원하는 상태를 가진 객체를 생성하고, 이를 단순히 복사해서 사용하는 것이 더 좋다.
이때 [[/pattern/abstract-factory]]{Abstract Factory}를 사용하여 프로토타입 객체를 생성할 수도 있다.
>
2\. 객체는 때론 몇 가지 상태만을 갖지만 각 상태에 있는 여러 개의 객체를 가져야 할 때가 있다(GoF는 음악 작곡 시스템의 Note 클래스를 설명한다. 온음표, 2분음표, 4분 음표 객체들의 수많은 인스턴스가 존재하지만 이들 각각은 동일한 상태에 있다).
>
3\. 어떤 경우엔 클래스가 런타임에 지정되고, 이를 비용이 큰 동적 로딩(예를 들면 `Class.forName("class.name")`)이나 이와 비슷하게 비용이 큰 프로세스(예를 들면 초기 상태가 XML 파일에 지정되어 있는 경우)를 통해 생성하는 경우가 있다. 반복적으로 비싼 객체 생성 작업을 하는 대신 하나의 프로토타입을 만들고 이를 여러 번 복사해 사용하라.
[^allen-450]

장단점에 대해서는 다음과 같이 언급한다.

장점

>
- 런타임에 Factory에 새로운 Concrete Product를 추가하기 쉽다. Factory에 Prototype을 넘기기만 하면 되기 때문이다. 삭제 역시 쉽다.
- Prototype은 객체 생성 시간을 줄일 수 있다.
- [[/pattern/abstract-factory]]{Abstract Factory}는 구현 상속을 통해 약간씩 다른 행위를 가진 클래스를 정의하도록 한다. Prototype 패턴은 상태를 이용하여 [[/pattern/abstract-factory]]{Abstract Factory}의 상속 문제를 해결한다. 객체의 행위가 상태에 따라 급격히 변화한다면 객체를 동적으로 설정 가능한 클래스라 생각하고 Prototype을 이용해 객체 생성 메커니즘을 구현할 수 있다.

단점

>
- 명시적으로 `clone()` 메소드를 구현해야 하는데, 이 작업이 매우 어려울 수도 있다. 또한 깊은 복사(deep copy)와 얕은 복사(shallow copy) 문제를 생각해 보라. 레퍼런스만 복사하면 되는가, 아니면 참조된 객체까지 복사해야 하는가?

### From: 코틀린 디자인 패턴

'코틀린 디자인 패턴'에서는 이 패턴에 대해 짧게 설명하면서 Kotlin, Java, JavaScript를 언급한다.

>
프로토타입의 핵심 아이디어는 객체를 쉽게 복사할 수 있도록 하는 것이다.
적어도 다음의 두 가지 경우에 프로토타입 패턴이 필요하다.
>
> - 객체 생성에 많은 비용이 드는 경우(예를 들어 객체 생성 시 데이터베이스에서 자료를 조회해야 하는 경우)
> - 비슷하지만 조금씩 다른 객체를 생성하느라 비슷한 코드를 매번 반복하고 싶지 않은 경우

> **중요**  
> <div id="table1"></div>

- td
    - 더 깊이 들어가면 프로토타입 패턴이 필요한 다른 이유도 있다. 가령 자바스크립트에서는 클래스 없이 객체와 비슷한 동작을 구현하기 위해 프로토타입을 사용한다.
{:class="table-generate" data-target-id="table1"}

>
자바의 엉터리 같은 `clone()` 메서드가 다행히도 코틀린에서는 고쳐졌다.
코틸린에서 모든 데이터 클래스는 `copy()` 메서드를 가진다.
이 메서드는 다른 데이터 클래스의 인스턴스를 받아 복제본을 생성하며, 원한다면 그 과정에서 속성을 변경할 수도 있다.
[^kotlin-pattern]


## 용도


## 참고문헌

- GoF의 디자인 패턴(개정판) / 에릭 감마, 리처드 헬름, 랄프 존슨, 존 블라시디스 공저 / 김정아 역 / 프로텍미디어 / 발행 2015년 03월 26일
- 실전 코드로 배우는 실용주의 디자인 패턴 / Allen Holub 저 / 송치형 편역 / 사이텍미디어 / 발행 2006년 07월 19일 / 원제 : Holub on Patterns : Learning Design Patterns by Looking at Code
- 코틀린 디자인 패턴 2/e / 알렉세이 소신 저/이대근 역 / 에이콘출판사 / 2판 발행: 2023년 08월 31일 / 원제: Kotlin Design Patterns and Best Practices: Build scalable applications using traditional, reactive, and concurrent design patterns in Kotlin, 2nd Edition by Alexey Soshin and Anton Arhipov

## 주석

[^gof]: GoF의 디자인 패턴(개정판). 169쪽.
[^gof-171]: GoF의 디자인 패턴(개정판). 171쪽.
[^drawio]: draw.io를 예제로 들긴 했지만 실제로 이 패턴을 사용하는지는 모른다.
[^allen-450]: 실용주의 디자인 패턴. 450쪽.
[^gof-174]: GoF의 디자인 패턴(개정판). 174쪽.
[^kotlin-pattern]: 코틀린 디자인 패턴. 102쪽.

