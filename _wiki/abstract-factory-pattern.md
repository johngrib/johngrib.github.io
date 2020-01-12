---
layout  : wiki
title   : 추상 팩토리 패턴 (Abstract Factory Pattern)
summary : 서로 관련성이 있는 다양한 객체를 생성하기 위한 인터페이스를 제공한다
date    : 2019-10-16 23:44:57 +0900
updated : 2019-10-24 12:19:51 +0900
tag     : pattern
toc     : true
public  : true
parent  : [[design-pattern]]
latex   : false
---
* TOC
{:toc}

* 다음과 같이 불린다.
    * 추상 팩토리(Abstract Factory)
    * 키트(Kit) 패턴

## 의도

GoF 책에서는 다음과 같이 패턴의 의도를 밝힌다.[^gof]

> 상세화된 서브클래스를 정의하지 않고도 서로 관련성이 있거나 독립적인 여러 객체의 군을 생성하기 위한 인터페이스를 제공합니다.

구조는 다음과 같다.[^structure]

![structure]( /post-img/abstract-factory-pattern/structure.gif )

* AbstractFactory: 개념적 제품에 대한 객체를 생성하는 연산으로 인터페이스를 정의한다.
* ConcreteFactory: 구체적인 제품에 대한 객체를 생성하는 연산을 구현한다.
* AbstractProduct: 개념적 제품 객체에 대한 인터페이스를 정의한다.
* ConcreteProduct: 구체적으로 팩토리가 생성할 객체를 정의하고, AbstractProduct가 정의하는 인터페이스를 구현한다.
* Client: AbstractFactory와 AbstractProduct 클래스에 선언된 인터페이스를 사용한다.

## 활용

GoF 책에서는 다음과 같은 활용을 권한다.[^gof-use]

> 추상 팩토리는 다음의 경우에 사용합니다.
* 객체가 생성되거나 구성, 표현되는 방식과 무관하게 시스템을 독립적으로 만들고자 할 때
* 여러 제품군 중 하나를 선택해서 시스템을 설정해야 하고 한번 구성한 제품을 다른 것으로 대체할 수 있을 때
* 관련된 제품 객체들이 함께 사용되도록 설계되었고, 이 부분에 대한 제약이 외부에도 지켜지도록 하고 싶을 때
* 제품에 대한 클래스 라이브러리를 제공하고, 그들의 구현이 아닌 인터페이스를 노출시키고 싶을 때

헤드 퍼스트 디자인 패턴에서는 다음과 같이 설명한다.[^head-define]

> 추상 팩토리 패턴을 사용하면 클라이언트에서 추상 인터페이스를 통해서 일련의 제품들을 공급받을 수 있습니다.
이때, 실제로 어떤 제품이 생산되는지는 전혀 알 필요도 없습니다.
따라서 클라이언트와 팩토리에서 생산되는 제품을 분리시킬 수 있습니다.

"실전 코드로 배우는 실용주의 디자인 패턴"에서는 다음과 같이 설명한다.[^holub0]

> Abstract Factory 는 실제 객체가 정확히 무엇인지 알지 못해도
객체를 생성하고 조작할 수 있도록 해준다(예제는 Iterator를 이용하는데,
Iterator 인터페이스만 알면, 구현체는 몰라도 된다).
이런 방식으로 Concrete Product를 사용하는 코드를 변경하지 않으면서도
손쉽게 새로운 Concrete Product를 추가할 수 있다.
Abstract Factory는 또한 다양한 환경에서 작동하는 코드를 쉽게 만들 수 있도록 해준다.
예를 들어 시스템은 각 환경에 맞는 고유한 Concrete Factory를 생성하고,
이는 다시 환경에 맞는 Concrete Product를 생성한다.
하지만 이들을 구현 클래스가 아닌 인터페이스를 통해 이용하기 때문에
여러분은 사용하고 있는 환경(혹은 Concrete Product)이 무엇인지 알지 못한다.

## 코드 요약

기본이 되는 **팩토리가 재료를 공급**하며, 생산된 프로덕트가 정확히 무엇인지 알지 못해도 **프로덕트의 인터페이스만 알면 조작할 수 있다**.

다음은 GoF 예제를 참고해 내가 만든 예제이다.

```java
// AbstractFactory
interface Factory {
  Wall makeWall();
  Room makeRoom();
  Door makeDoor();
}

// AbstractProduct
interface Game {
  void createMap(Factory factory);
  void show();
}

public class Main {
  public static void main(String[] args) {
    // 두 개의 ConcreteFactory
    Factory bombFactory = new BombedMazeFactory();
    Factory monsterFactory = new MonsterFactory();

    // 폭탄 테마의 미로 게임 맵을 만든다
    Game bomberMan = new MazeGame();
    bomberMan.createMap(bombFactory);

    // 괴물 테마의 미로 게임 맵을 만든다
    Game diablo = new MazeGame();
    diablo.createMap(monsterFactory);

    // 괴물 테마의 슈팅 게임 맵을 만든다
    Game doom = new ShootingGame();
    doom.createMap(monsterFactory);
  }
}
```

* `BombedMazeFactory`는 폭탄을 붙일 수 있는 벽, 방, 문 등을 제공한다.
* `MonsterFactory`는 괴물이 나올 수 있는 벽, 방, 문 등을 제공한다.
* `createMap`는 게임 맵을 만든다.
    * `Game bomberMan`의 생성: 폭탄 팩토리를 받아, 폭탄 방과 폭탄 벽 등이 있는 게임 맵을 만든다.
    * `Game diablo`의 생성: 괴물 팩토리를 받아, 괴물 방과 괴물 문 등이 있는 게임 맵을 만든다.
    * `Game doom`의 생성: 괴물 팩토리를 받아, 괴물 방과 괴물 문 등이 있는 FPS 게임 맵을 만든다.

이 패턴은 다음과 같이 팩토리 메소드 패턴과 혼합해 사용하는 경우도 있다.

```java
private static Game createGame(String type) {
  Game game;
  switch(type) {
    case "bomberMan":
      game = new MazeGame();
      game.createMap(new BombedMazeFactory());
      return game;
    case "doom":
      game = new ShootingGame();
      game.createMap(new MonsterFactory());
      return game;
    case "diablo":
      game = new MazeGame();
      game.createMap(new MonsterFactory());
      return game;
    default:
      throw new IllegalArgumentException("unknown " + type);
    }
  }
}

public static void main(String[] args) {
  createGame("bomberMan").show();
  createGame("diablo").show();
  createGame("doom").show();
}
```

## 구현시 고려할 점

* 딱딱하게 생각하지 말 것. GoF의 패턴을 조금씩 변형해 사용하는 경우가 많다.
    * `ConcreteFactory`가 `AbstractFactory`의 역할도 맡도록 구현하는 경우도 있다.
    * `Factory` 이면서 동시에 `Product`인 경우도 있다.
    * `Factory`를 `Product`에 주입하지 않고 `Factory`가 `Product`를 생산하는 경우도 있다.
* 제품 생산의 책임은 `ConcreteFactory`에 있다.
* 프로덕트 생성자에 팩토리를 주입하는 방식도 고려할 것.
* `ConcreteFactory`를 싱글톤으로 만들어 사용하는 것을 고려할 것.

이 패턴의 단점: 새로운 종류의 `Product`를 제공하기가 어려울 수 있다.

* 새로운 재료가 추가되면 `Factory` 인터페이스에 새로운 추상 메소드를 추가할 필요가 생길 수 있다.
    * `Factory` 인터페이스에 추상 메소드 변경이 필요할 때 Java의 `default` 메소드 사용을 고려할 수 있다.
    * `Factory` 인터페이스에 `make()`나 `create()` 메소드만 남겨두고, 모든 재료를 매개변수로 받는 방법.
        * 이렇게 하면 [[builder-pattern]]과 비슷한 모양이 된다. 다만, 빌더 패턴의 경우 Director가 있다는 점이 다르다.

## 헤드 퍼스트 디자인 패턴의 예제

헤드 퍼스트 디자인 패턴에서는 피자 가게를 모델링한 예제를 제공한다.[^head]

코드가 많은 편이라 핵심이 되는 부분만 인용하고, 주석을 달아 보았다.

```java
// 피자 원재료를 생산하는 팩토리 인터페이스
interface PizzaIngredientFactory {
  public Dough createDough();
  public Sauce createSauce();
  public Cheese createCheese();
  public Veggies[] createVeggies();
  public Pepperoni createPepperoni();
  public Clams createClams();
}

// 뉴욕 피자 가게
public class NYPizzaStore extends PizzaStore {
  protected Pizza createPizza(String item) {
    Pizza pizza = null;
    PizzaIngredientFactory ingredientFactory = new NYPizzaIngredientFactory();

    if (item.equals("cheese")) {
      // 치즈 피자
      pizza = new CheesePizza(ingredientFactory);   // 팩토리를 주입한다
      pizza.setName("New York Style Cheese Pizza");

    } else if (item.equals("veggie")) {
      // 야채 피자
      pizza = new VeggiePizza(ingredientFactory);
      pizza.setName("New York Style Veggie Pizza");

    } else if (item.equals("clam")) {
      // 조개 피자
      pizza = new ClamPizza(ingredientFactory);
      pizza.setName("New York Style Clam Pizza");

    } else if (item.equals("pepperoni")) {
      // 페퍼로니 피자
      pizza = new PepperoniPizza(ingredientFactory);
      pizza.setName("New York Style Pepperoni Pizza");
    }
    return pizza;
  }
}
```

## 어디에서 사용하고 있나?

가장 흔하게 볼 수 있는 예는 `Collection`의 `iterator`이다.[^holub0]

```ascii-art
┌──────────────────────────┐         ┌────────────────────────┐
│ Collection <<interface>> │         │ Iterator <<interface>> │
╞══════════════════════════╡         ╞════════════════════════╡
│ +iterator(): Iterator    │         │ +hasNext(): boolean    │
└──────────────────────────┘         │ +next():    Object     │
 ∧     ∧                             │ +remove():  void       │
 │     │                             └────────────────────────┘
 │  ┌──┴────────────────────┐          ∧                     ∧
 │  │ LinkedList            │          │                     │
 │  ╞═══════════════════════╡creates ┌─┴──────────────────┐  │
 │  │ +iterator(): Iterator -------->│ LinkedListIterator │  │
 │  └───────────────────────┘        ╞════════════════════╡  │
 │                                   │ +hasNext(): boolean│  │
 │                                   │ +next():    Object │  │
 │                                   │ +remove():  void   │  │
 │                                   └────────────────────┘  │
 │  ┌───────────────────────┐                                │
 └──│ Tree                  │                                │
    ╞═══════════════════════╡creates ┌───────────────────────┴───┐
    │ +iterator(): Iterator -------->│ TreeIterator <<anonymous>>│
    └───────────────────────┘        ╞═══════════════════════════╡
                                     │ +hasNext(): boolean       │
                                     │ +next():    Object        │
                                     │ +remove():  void          │
                                     └───────────────────────────┘
```

* Collection: AbstractFactory
* Iterator: AbstractProduct
    * LinkedListIterator: ConcreteProduct
    * TreeIterator: ConcreteProduct

다음과 같은 형태도 자주 볼 수 있다.[^holub1]

```java
URL home = new URL(address);
URLConnection c = home.getConnection();
InputStream in = c.getInput();
```

* URL: ConcreteFactory
* URLConnection: AbstractProduct 이기도 하고, AbstractFactory 이기도 하다.
    * URL을 통해 생산된 AbstractProduct.
    * InputStream을 만들어내는 AbstractFactory.


## 참고문헌

* 도서
    * GoF의 디자인 패턴(개정판) / 에릭 감마, 리처드 헬름, 랄프 존슨, 존 블라시디스 공저 / 김정아 역 / 프로텍미디어 / 발행 2015년 03월 26일
    * Head First Design Patterns / 에릭 프리먼 등저 / 서환수 역 / 한빛미디어 / 초판 16쇄 2017년 5월 10일
    * 실전 코드로 배우는 실용주의 디자인 패턴 / Allen Holub 저 / 송치형 편역 / 사이텍미디어 / 발행 2006년 07월 19일 / 원제 : Holub on Patterns : Learning Design Patterns by Looking at Code

## 주석

[^gof]: GoF의 디자인 패턴(개정판). 132쪽.
[^structure]: GoF의 디자인 패턴(개정판). 134쪽.
[^head]: Head First Design Patterns. 190쪽.
[^holub0]: 실전 코드로 배우는 실용주의 디자인 패턴. 444쪽.
[^holub1]: 실전 코드로 배우는 실용주의 디자인 패턴. 445쪽.
[^head-define]: Head First Design Patterns. 194쪽.
[^gof-use]: GoF의 디자인 패턴(개정판). 134쪽.
