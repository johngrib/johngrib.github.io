---
layout  : wiki
title   : 데코레이터 패턴 (Decorator Pattern)
summary : 객체에 동적으로 새로운 책임을 추가한다
date    : 2019-10-05 10:42:26 +0900
updated : 2023-09-24 22:43:20 +0900
tag     : GoF-design-pattern
resource: 2A/CF0F9F-65A0-4F88-BA10-330E4AB1DBDF
toc     : true
public  : true
parent  : [[/pattern]]
latex   : false
---
* TOC
{:toc}

* 다음과 같이 불린다.
    * 데코레이터 패턴(decorator pattern), 장식자 패턴
    * 랩퍼 패턴(wrapper pattern)

## 의도

GoF 책에서는 다음과 같이 패턴의 의도를 밝힌다.[^gof]

>
객체에 동적으로 새로운 책임을 추가할 수 있게 합니다.
기능을 추가하려면, 서브클래스를 생성하는 것보다 융통성 있는 방법을 제공합니다.

이어서 다음과 같은 동기를 소개한다.

>
가끔 전체 클래스에 새로운 기능을 추가할 필요는 없지만,
개별적인 객체에 새로운 책임을 추가할 필요가 있습니다.
예를 들어, GUI 툴킷에서 모든 사용자 인터페이스 요소에는 필요 없지만,
어떤 사용자 인터페이스 요소에만 스크롤링(scrolling)과 같은 행동이나
테두리(border)와 같은 속성을 추가할 수 있도록 해 줄 필요는 있습니다.
이런 것은 하나의 객체에 속성이 추가됨으로써 또 다른 책임이 추가되어야 합니다.
>
이렇게 새로운 서비스의 추가가 필요할 때 이를 해결하는 일반적인 방법은 상속을 이용하는 것입니다.
즉, 이미 존재하는 클래스를 상속받고,
또 다른 클래스에서 테두리 속성을 상속받아 이 서브클래스의 인스턴스에 테두리가 있도록 하는 방법이지만,
별로 유용하지는 않습니다. 테두리의 선택이 정적이기 때문입니다.
사용자는 구성요소를 언제, 그리고 어떻게 테두리로 장식해야 할지 제어할 수 없습니다.
>
더 나은 방법은 지금 필요한 테두리를 추가하는 다른 객체에다가 해당 구성요소를 둘러싸는 것입니다.
이렇게 무엇인가를 감싸는 객체를 장식자(decorator)라고 합니다.
장식자는 자신이 둘러싼 요소, 구성요소가 갖는 인터페이스를 자신도 동일하게 제공하므로,
장식자의 존재는 이를 사용하는 사용자에게 감춰집니다.
즉, 장식자는 자신이 둘러싼 구성요소로 전달되는 요청을 중간에 가로채서 해당 구성요소에 전달해 줍니다.
그렇기 때문에 이 전달 과정의 앞뒤에 다른 작업(이를 테면, 테두리 그리기 등)을 추가로 할 수 있습니다.
여기에는 투명성이 존재하기 때문에 장식자의 중첩이 가능하며, 이를 통해 책임 추가를 무한정으로 할 수 있습니다.

구조는 다음과 같다.[^structure]

![데코레이터 패턴의 구조 다이어그램]( ./decorator.svg )

## 언제 사용하는가?

* 객체의 타입과 호출 가능한 메소드를 그대로 유지하면서 객체에 새로운 책임을 추가할 때 사용한다.
* 탈부착 가능한 책임을 정의할 때 사용한다.
* 상속을 통해 서브클래스를 계속 만드는 방법이 비효율적일 때 사용한다.
    * 특히 조합되는 경우의 수가 많으면 서브클래스 수가 폭발적으로 늘어날 수 있다.

## 구현할 때 고려할 점들

* Component는 장식을 추가할 베이스가 되는 역할이므로 작고 가볍게 정의하도록 한다.
    * 가급적 인터페이스만을 정의한다.
    * 무언가 저장하는 변수는 정의하지 않는다(상속받는 여러 Decorator도 같이 복잡하고 무거워진다).
    * 저장할 것이 있다면 서브클래스에서 하자.
* 상속 구조를 통해 Decorator와 Component가 같은 인터페이스를 갖게 해야 한다.
    * 투과적 인터페이스: Decorator로 계속해서 감싸도 Component의 메소드는 계속 사용할 수 있다.
* 코드를 수정하지 않고도 준비된 Decorator을 조합해 기능을 추가할 수 있도록 생각해서 구현한다.
* 비슷한 성질의 작은 클래스가 많이 만들어질 수 있다는 단점을 고려한다.
* 구현하려는 내용이 객체의 겉을 변경하려는 것인지, 속을 변경하려는 것인지 생각해 보자.
    * 속을 변경하려는 것이라면 [[/pattern/strategy]]을 선택하는 것이 더 적절할 수 있다.
* 데코레이터 패턴으로 구현한 다음, 사용이 까다롭게 느껴지거나 자주 쓰는 조합이 있다면 다음 패턴을 사용해 제공하는 것을 고려해 보자.
    * [[/pattern/builder]]
    * factory-pattern
    * [[/pattern/static-factory-method]]
* Decorator가 다른 Decorator에 대해 알아야 할 필요가 있다면, 데코레이터 패턴의 사용 의도와 어긋나는 작업일 수 있다.
* 재귀적으로 기능을 갖게 하는 방법 외에도, Decorator를 추가할 때마다 얻은 아이템을 List로 관리하는 방법도 있다.

## 헤드 퍼스트 디자인 패턴의 예제

다음 코드는 헤드 퍼스트 디자인 패턴에서 소개한 데코레이터 패턴의 코드를 약간 수정한 것이다.[^head]

이 예제는 음료(component)와 첨가물(decorator) 조합의 구현을 데코레이터 패턴으로 해결하고 있다.

```java
// 음료
abstract class Beverage {
    String description = "제목 없음";

    public String getDescription() { return description; }
    public abstract double cost();

    @Override
    public String toString() {
        return getDescription() + ": $" + cost();
    }
}

// 첨가물
abstract class CondimentDecorator extends Beverage {
    public abstract String getDescription();
}
```

다음은 베이스가 되는 두 가지 음료이다.

```java
class Espresso extends Beverage {
    public Espresso() { description = "에스프레소"; }

    @Override
    public double cost() { return 1.99; }
}

class HouseBlend extends Beverage {
    public HouseBlend() { description = "하우스 블렌드 커피"; }

    @Override
    public double cost() { return 0.89; }
}
```

다음은 모카 첨가물이다. 이 외에도 두유, 휘핑 크림 등 다양한 첨가물을 만들 수 있다.

```java
class Mocha extends CondimentDecorator {
    Beverage beverage;

    public Mocha(Beverage beverage) {
        description = "모카";
        this.beverage = beverage;
    }

    @Override
    public double cost() {
        // 중요한 부분
        return 0.20 + beverage.cost();
    }

    @Override
    public String getDescription() {
        // 중요한 부분
        return beverage.getDescription() + ", " + description;
    }
}
```

다음과 같이 사용할 수 있다.

```java
Beverage beverage = new Espresso();
System.out.println(beverage);

beverage = new Mocha(beverage);
System.out.println(beverage);

Beverage beverage2 = new HouseBlend();
System.out.println(beverage2);

beverage2 = new Mocha(beverage2);
System.out.println(beverage2);
```

출력 결과는 다음과 같다.

```
에스프레소: $1.99
에스프레소, 모카: $2.19
하우스 블렌드 커피: $0.89
하우스 블렌드 커피, 모카: $1.09
```

* 이 모든 경우에 대해 일일이 클래스를 만들지 않아도 된다는 점이 장점.
* 만약 컵 사이즈, 빨대의 종류, 증정품 등의 개념이 추가되어도 상대적으로 추가해야 하는 코드의 양이 많지 않다는 게 장점.

## 어디에서 사용하고 있나?

java.io 패키지에서 데코레이터 패턴을 사용한다.

`InputStream`의 경우를 살펴보자.

* `InputStream` (추상 component 역할)
    * `FileInputStream`
    * `StringBufferInputStream`
    * `ByteArrayInputStream`
    * `FilterInputStream`  (추상 decorator 역할)
        * `PushbackInputStream`
        * `BufferedInputStream`
        * `DataInputStream`
        * `LineNumberInputStream`

헤드 퍼스트 디자인 패턴에서는 이를 응용하여 `LowerCaseInputStream` 데코레이터를 추가하는 예제를 보여준다.

```java
class LowerCaseInputStream extends FilterInputStream {
    public LowerCaseInputStream(InputStream in) {
        super(in);
    }

    public int read() throws IOException {
        int c = super.read();
        if (c == -1) {
            return c;
        }
        return Character.toLowerCase(c);
    }
}
```

한편 "Java 언어로 배우는 디자인 패턴 입문"에서는 Reader를 사용하는 예제를 보여준다.[^io-example]

```java
// 버퍼링 + 파일에서 읽기
Reader reader = new BufferedReader(
    new FileReader("test.txt")
);
```

```java
// 행 번호 관리 + 버퍼링 + 파일에서 읽기
Reader reader = new LineNumberReader(
    new BufferedReader(
        new FileReader("test.txt")
    )
);
```

```java
// 행 번호 관리 + 파일에서 읽기
Reader reader = new LineNumberReader(
    new FileReader("test.txt")
);
```

```java
java.net.Socket socket = new Socket(hostname, portNumber);

// 행 번호 관리 + 버퍼링 + 네트워크에서 읽기
Reader reader = new LineNumberReader(
    new BufferedReader(
        new InputStreamReader(socket.getInputStream())
    )
);
```

## 주의사항

- public 메소드가 많다면 Decorator를 적용하는 것이 바람직하지 않을 수 있다.

> 호스트 클래스에 public 메서드가 많은 경우에는 Decorator 패턴으로 리팩터링하는 것이 바람직하지 않다.
왜 그럴까?
데코레이터는 [Design Patterns]에서 말하는 '투명한 외투'로서 존재해야 하기 때문이다.
즉, 호스트 클래스가 제공하는 모든 public 메서드를 데코레이터도 구현해야 한다.
따라서 호스트 클래스에 public 메서드가 많다면, 꾸밈 기능과는 무관한 쓸데없는 코드가 데코레이터에 생길 가능성이 크다.
>
데코레이터 클래스와 그 대상이 되는 호스트 클래스는 동일한 인터페이스를 공유하므로, 데코레이터는 이것을 사용하는 클라이언트에 투명한 존재가 된다.
클라이언트에 객체의 타입을 명시적으로 검사하는 코드만 없다면 말이다.
그런 코드가 있다면, 데코레이터로 인해 문제가 생길 것이다.
데코레이터 객체와 그 대상이 되는 객체는 서로 타입이 다르기 때문이다.
[^josh-207]

- 데코레이터가 여러 개 있다면 순서에 주의하도록 한다.

>
이 패턴을 적용할 때에는 데코레이터 클래스가 여럿 존재하는 경우도 고려해야 한다.
어떤 클래스를 꾸미기 위한 데코레이터 클래스를 여러 개 만든다면, 그 객체를 하나 이상의 데코레이터 객체가 동시에 감쌀 수 있다는 말이 된다.
그럴 경우에는 적용된 데코레이터의 순서가 원하지 않는 결과를 초래할 수 있다.
예를 들어, 데이터를 암호화하는 데코레이터와 특정 단어를 걸러내는 필터링 데코레이터가 있는데,
암호화가 필터링보다 먼저 실행된다면 원하는 결과를 얻지 못할 것이다.
이상적으로는 데코레이터가 여러 개 있어도 서로 독립적이어서 배열 순서에 상관없이 동작하는 것이 좋다.
그러나 실제로는 그럴 수 없는 경우가 꽤 있다.
이런 경우라면, 클라이언트가 데코레이터 객체를 직접 만들 수 없도록 하고,
대신에 데코레이터 간의 안전한 조합을 제공하는 특별한 생성 메서드를 따로 만들어 클라이언트에 제공하는 것이 좋다.
[^josh-207]

- 코드가 여러 클래스로 흩어져 디버깅이 까다로워지고, 이해하기 어려워질 수 있다.

>
객체 조합 기법을 좋아하는 사람들이 보기에는, Move Embellishment to Decorator 리팩터링으로 인해 설계가 단순해졌다고 느낄 것이다.
반면에, 객체 조합 기법을 잘 사용하지 않던 사람들은 한 클래스에 있던 코드들이 여기저기로 흩어져 버렸다고 느낄 것이다.
그렇게 코드가 분리되면 더 이상 한 눈에 들어오지 않기 때문에, 이해하기 어렵게 느껴질 수도 있다.
게다가 꾸밈의 대상이 되는 원래 객체까지 접근하려면 여러 단계의 데코레이터 객체를 지나야 하기 때문에, 디버깅도 더 어려울 수 있다.
즉, 객체에 꾸밈을 가하기 위해 객체 조합 기법을 이용하는 것이 썩 내키지 않는다면, 아직 Decorator 패턴을 사용할 준비가 안 된 것이다.
[^josh-210]

- 성능상 좋지 않을 수 있다.

>
데코레이터 패턴은 디자인의 관점에서 보았을 때는 좋으나 별도의 간접 참조에 많은 비용이 들 수 있다.
데코레이터는 그것을 추가할 수 있는 것과 마찬가지로 제거도 할 수 있음을 기억하자.
[^bea-276]

## 참고문헌

- GoF의 디자인 패턴(개정판) / 에릭 감마, 리처드 헬름, 랄프 존슨, 존 블라시디스 공저 / 김정아 역 / 프로텍미디어 / 발행 2015년 03월 26일
- Head First Design Patterns / 에릭 프리먼 등저 / 서환수 역 / 한빛미디어 / 초판 16쇄 2017년 5월 10일
- Java 언어로 배우는 디자인 패턴 입문 [개정판] / Yuki Hiroshi 저 / 이규흥 역 / 영진닷컴 / 1판 9쇄 2017년 3월 5일
- 뷰티풀 아키텍처 / 디오미디스 스피넬리스 저 / 지오지아스 고시아스 편 / 지앤선(志&嬋) / 발행 2010년 03월 08일 / 원제: Beautiful Architecture: Leading Thinkers Reveal the Hidden Beauty in Software Design
- 패턴을 활용한 리팩터링 / 조슈아 케리에브스키 저 / 윤성준, 조상민 공역 / 인사이트(insight) / 신판 1쇄 발행 2011년 02월 09일 / 원제 : REFACTORING TO PATTERNS

## 주석

[^gof]: GoF의 디자인 패턴(개정판). 241쪽.
[^head]: Head First Design Patterns. 133쪽.
[^structure]: GoF의 디자인 패턴(개정판). 244쪽.
[^io-example]: Java 언어로 배우는 디자인 패턴 입문. 224쪽.
[^josh-207]: 패턴을 활용한 리팩터링. 7장. 207쪽.
[^josh-208]: 패턴을 활용한 리팩터링. 7장. 208쪽.
[^josh-210]: 패턴을 활용한 리팩터링. 7장. 210쪽.
[^bea-276]: 뷰티풀 아키텍처. 276쪽.

