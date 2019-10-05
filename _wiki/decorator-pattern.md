---
layout  : wiki
title   : 데코레이터 패턴(Decorator Pattern)
summary : 객체에 동적으로 새로운 책임을 추가한다
date    : 2019-10-05 10:42:26 +0900
updated : 2019-10-05 20:18:25 +0900
tag     : design-pattern
toc     : true
public  : true
parent  : design-pattern
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

구조는 다음과 같다.[^structure]

![structure]( /post-img/decorator-pattern/structure.jpg )


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

## 참고문헌

* 도서
    * GoF의 디자인 패턴(개정판) / 에릭 감마, 리처드 헬름, 랄프 존슨, 존 블라시디스 공저 / 김정아 역 / 프로텍미디어 / 발행 2015년 03월 26일
    * Head First Design Patterns / 에릭 프리먼 등저 / 서환수 역 / 한빛미디어 / 초판 16쇄 2017년 5월 10일
    * Java 언어로 배우는 디자인 패턴 입문 [개정판] / Yuki Hiroshi 저 / 이규흥 역 / 영진닷컴 / 1판 9쇄 2017년 3월 5일

## 주석

[^gof]: GoF의 디자인 패턴(개정판). 241쪽.
[^head]: Head First Design Patterns. 133쪽.
[^structure]: GoF의 디자인 패턴(개정판). 244쪽.
[^io-example]: Java 언어로 배우는 디자인 패턴 입문. 224쪽.

