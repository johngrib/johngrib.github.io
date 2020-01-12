---
layout  : wiki
title   : 팩토리 메소드 패턴 (Factory Method Pattern)
summary : 객체를 생성하기 위한 인터페이스를 정의하고, 인스턴스 생성은 서브클래스가 결정하게 한다
date    : 2019-10-07 00:16:49 +0900
updated : 2019-11-21 09:37:23 +0900
tag     : pattern
toc     : true
public  : true
parent  : [[design-pattern]]
latex   : false
---
* TOC
{:toc}

* 다음과 같이 불린다.
    * 팩토리 메소드 패턴(factory method)
    * 가상 생성자 패턴(virtual constructor)

## 의도

GoF는 다음과 같이 팩토리 메소드 패턴의 의도를 밝힌다.[^gof]

> 객체를 생성하기 위해 인터페이스를 정의하지만,
어떤 클래스의 인스턴스를 생성할지에 대한 결정은 서브클래스가 내리도록 합니다.

구조는 다음과 같다.

![structure]( /post-img/factory-method-pattern/structure.gif )

## 요약

* 객체 생성을 캡슐화하는 패턴이다.
* Creator의 서브클래스에 팩토리 메소드를 정의하여, 팩토리 메소드 호출로 적절한 ConcreteProduct 인스턴스를 반환하게 한다.

## 구현시 고려할 점들

* 팩토리 메소드 페턴의 구현 방법은 크게 두 가지가 있다.
    * Creator를 추상 클래스로 정의하고, 팩토리 메소드는 abstract로 선언하는 방법.
    * Creator가 구체 클래스이고, 팩토리 메소드의 기본 구현을 제공하는 방법.
* 팩토리 메소드의 인자를 통해 다양한 Product를 생성하게 한다.
    * 팩토리 메소드에 잘못된 인자가 들어올 경우의 런타임 에러 처리에 대해 고민할 것.
    * Enum 등을 사용하는 것도 고려할 필요가 있다.
* 프로그래밍 언어별로 구현 방법에 차이가 있을 수 있다.


## Java 언어로 배우는 디자인 패턴 입문의 예제

다음은 Java 언어로 배우는 디자인 패턴 입문에 수록된 예제이다.[^java-example]

* Product 인터페이스

```java
abstract class Product {
    public abstract void use();
}
```

```java
class IDCard extends Product {
    private String owner;

    public IDCard(String owner) {
        System.out.println(owner + "의 카드를 만듭니다.");
        this.owner = owner;
    }

    @Override
    public void use() {
        System.out.println(owner + "의 카드를 사용합니다.");
    }

    public String getOwner() {
        return owner;
    }
}
```

* `createProduct` 메소드가 팩토리 메소드이다.

```java
abstract class Factory {
    public final Product create(String owner) {
        Product p = createProduct(owner);
        registerProduct(p);
        return p;
    }
    protected abstract Product createProduct(String owner);
    protected abstract void registerProduct(Product p);
}
```

```java
class IDCardFactory extends Factory {
    private List<String> owners = new ArrayList<>();

    @Override
    protected Product createProduct(String owner) {
        return new IDCard(owner);
    }

    @Override
    protected void registerProduct(Product p) {
        owners.add(((IDCard) p).getOwner());
    }

    public List<String> getOwners() {
        return owners;
    }
}
```

사용은 다음과 같이 한다.

```java
Factory factory = new IDCardFactory();
Product card1 = factory.create("홍길동");
Product card2 = factory.create("이순신");
Product card3 = factory.create("강감찬");
card1.use();
card2.use();
card3.use();
```

실행 결과는 다음과 같다.

```text
홍길동의 카드를 만듭니다.
이순신의 카드를 만듭니다.
강감찬의 카드를 만듭니다.
홍길동의 카드를 사용합니다.
이순신의 카드를 사용합니다.
강감찬의 카드를 사용합니다.
```

## 헤드 퍼스트 디자인 패턴의 예제

다음은 헤드 퍼스트 디자인 패턴의 예제를 약간 변형한 것이다.[^head-example]

* 이 예제에서는 `Pizza`가 `Product` 역할이다.

```java
interface Pizza {
    public void prepare();
    public void bake();
    public void box();
}
```

* 다음은 `Creator` 이다.

```java
abstract class PizzaStore {
    public Pizza orderPizza(String type) {
        Pizza pizza = createPizza(type);    // factory method 사용
        pizza.prepare();
        pizza.bake();
        pizza.box();
        return pizza;
    }

    // factory method
    abstract Pizza createPizza(String type);
}
```

```java
class NYPizzaStore extends PizzaStore {
    @Override
    Pizza createPizza(String type) {
        if ("cheese".equals(type)) {
            return new NYStyleCheesePizza();
        } else if ("pepperoni".equals(type)) {
            return new NYStylePepperoniPizza();
        }
        return null;
    }
}

class ChicagoPizzaStore extends PizzaStore {
    @Override
    Pizza createPizza(String type) {
        if ("cheese".equals(type)) {
            return new ChicagoStyleCheesePizza();
        } else if ("pepperoni".equals(type)) {
            return new ChicagoStylePepperoniPizza();
        }
        return null;
    }
}
```

다음과 같이 사용한다.

```java
PizzaStore nyStore = new NYPizzaStore();
PizzaStore chicagoStore = new ChicagoPizzaStore();

Pizza pizza = nyStore.orderPizza("cheese");
Pizza pizza1 = chicagoStore.orderPizza("pepperoni");
```

## 인용

Allen Holub은 "실용주의 디자인 패턴"에서 이 패턴에 대해 다음과 같이 언급했다.

> Factory Method 패턴은 기반 클래스에 알려지지 않은 구체 클래스를 생성하는 [[template-method-pattern]]{Template Method}라 할 수 있다. Factory Method의 반환 타입은 생성되어 반환되는 객체가 구현하고 있는 인터페이스이다. Factory Method는 또한 기반 클래스 코드에 구체 클래스의 이름을 감추는 방법이기도 하다(Factory Method는 부적절한 이름이다. 사람들은 객체를 생성하는 모든 메소드를 자연스레 팩토리 메소드라 부르는 경향이 있는데, 이러한 생성 메소드가 모두 Factory Method 패턴을 사용하는 것은 아니다).[^holub]

## 참고문헌

* GoF의 디자인 패턴(개정판) / 에릭 감마, 리처드 헬름, 랄프 존슨, 존 블라시디스 공저 / 김정아 역 / 프로텍미디어 / 발행 2015년 03월 26일
* Head First Design Patterns / 에릭 프리먼 등저 / 서환수 역 / 한빛미디어 / 초판 16쇄 2017년 5월 10일
* Java 언어로 배우는 디자인 패턴 입문 [개정판] / Yuki Hiroshi 저 / 이규흥 역 / 영진닷컴 / 1판 9쇄 2017년 3월 5일
* 실전 코드로 배우는 실용주의 디자인 패턴 / Allen Holub 저 / 송치형 편역 / 지앤선(志&嬋) / 2006년 07월 19일 발행 / 원제 : Holub on Patterns : Learning Design Patterns by Looking at Code

## 주석

[^gof]: GoF의 디자인 패턴(개정판). 156쪽.
[^java-example]: Java 언어로 배우는 디자인 패턴 입문. Chapter 4. 84쪽.
[^head-example]: Head First Design Patterns. 168쪽.
[^holub]: 실용주의 디자인 패턴. Chapter 2. 94쪽.

