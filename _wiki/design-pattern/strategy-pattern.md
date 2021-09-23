---
layout  : wiki
title   : 전략 패턴(strategy pattern)
summary : 동일 계열의 알고리즘을 정의하고 상호교환이 가능하게 한다
date    : 2019-09-21 16:49:12 +0900
updated : 2019-09-22 21:23:31 +0900
tag     : pattern
toc     : true
public  : true
parent  : [[design-pattern]]
latex   : false
---
* TOC
{:toc}

* 다음과 같이 불린다.
    * 스트레티지 패턴
    * 전략 패턴
    * 정책(Policy) 패턴

## 의도

GoF 책에서는 다음과 같이 전략 패턴의 의도를 밝힌다.[^gof]

>
동일 계열의 알고리즘군을 정의하고, 각 알고리즘을 캡슐화하며, 이들을 상호교환이 가능하도록 만듭니다.
알고리즘을 사용하는 클라이언트와 상관없이 독립적으로 알고리즘을 다양하게 변경할 수 있게 합니다.

## 코드

다음 코드는 "헤드 퍼스트 디자인 패턴"을 참고해 작성한 코드이다.[^head]

```java
public class Duck {
    QuackBehavior quackBehavior;    // interface
    FlyBehavior flyBehavior;        // interface

    public void performQuack() {
        quackBehavior.quack();
    }

    public void performFly() {
        flyBehavior.fly();
    }

    public void setQuackBehavior(QuackBehavior quackBehavior) {
        this.quackBehavior = quackBehavior;
    }

    public void setFlyBehavior(FlyBehavior flyBehavior) {
        this.flyBehavior = flyBehavior;
    }
}
```

오리가 "소리를 내는 행동"과 "나는 행동"의 구현이 분리되어 있고, setter를 통해 바꿀 수도 있다는 것을 알 수 있다.
즉 소리를 내는 알고리즘과 나는 알고리즘이 위임되어 있는 것이다.

* 참고로 IntelliJ IDEA에도 전략 패턴의 메소드 명명법이 등록되어 있는지 `~Behavior`로 끝나는 인터페이스를 멤버로 선언한다면 `New Deligate Method`메뉴로 새로운 메소드를 만들 때 자동으로 `perform~`으로 시작하는 이름을 붙여 준다.

이번엔 `FlyBehavior` 인터페이스와 구현체를 살펴보자. 구현체는 두 개를 만들어 보았다.

```java
public interface FlyBehavior {
    void fly();
}
```

```java
public class FlyWithWings implements FlyBehavior {
    @Override
    public void fly() {
        System.out.println("날개로 날아간다!");
    }
}
```

```java
public class FlyRocketPowered implements FlyBehavior {
    @Override
    public void fly() {
        System.out.println("로켓 추진으로 날아간다!");
    }
}
```

`QuackBehavior`는 다음과 같이 하나만 만들었다.

```java
public class KoreanQuack implements QuackBehavior {
    @Override
    public void quack() {
        System.out.println("꽥꽥");
    }
}
```

다음과 같이 활용할 수 있다. `MallardDuck`이라는 새로운 종류의 오리인데, 이 오리가 날개로 날아가는 종류라면 다음과 같이 만들 수 있다. 이 오리의 `performFly()`를 호출하면 `Fly with wings!`가 출력될 것이다.

```java
public class MallardDuck extends Duck {
    public MallardDuck() {
        quackBehavior = new KoreanQuack();
        flyBehavior = new FlyWithWings();
    }
}
```

하지만 로켓 추진을 통해 날아가는 오리라면 다음과 같이 날아가는 전략을 로켓 추진으로 조합할 수 있다.
이 오리의 `performFly()`를 호출하면 `Fly with ROCKET POWER`가 출력될 것이다.

```java
public class MachineDuck extends Duck {
    public MallardDuck() {
        quackBehavior = new Quack();
        flyBehavior = new FlyRocketPowered();
    }
}
```

한편 setter가 있으므로 중간에 전략을 바꿀 수도 있다.

```java
Duck myDuck = new MallardDuck();
myDuck.performFly();    // 날개로 날아간다!
myDuck.performQuack();  // 꽥꽥

myDuck.setFlyBehavior(new FlyRocketPowered());
myDuck.performFly();    // 로켓 추진으로 날아간다!
```

## 람다 표현식을 쓰는 경우

다음과 같이 람다 표현식을 사용하는 것도 가능하다.

```java
Duck myDuck = new MallardDuck();
myDuck.performFly();    // 날개로 날아간다!
myDuck.performQuack();  // 꽥꽥

myDuck.setFlyBehavior(new FlyRocketPowered());
myDuck.performFly();    // 로켓 추진으로 날아간다!

// lambda
myDuck.setFlyBehavior(
    () -> System.out.println("바람을 타고 날아간다!")
);
myDuck.performFly();    // 바람을 타고 날아간다!
```

`FlyBehavior`가 하나의 메소드만 선언하고 있으므로 `void fly()`만 구현해주면 사용할 수 있다.

## 참고문헌

* GoF의 디자인 패턴(개정판) / 에릭 감마, 리처드 헬름, 랄프 존슨, 존 블라시디스 공저 / 김정아 역 / 프로텍미디어 / 발행 2015년 03월 26일
* Head First Design Patterns / 에릭 프리먼 등저 / 서환수 역 / 한빛미디어 / 초판 16쇄 2017년 5월 10일

## 주석

[^gof]: GoF의 디자인 패턴(개정판). 407쪽.
[^head]: Head First Design Patterns. 54쪽.
