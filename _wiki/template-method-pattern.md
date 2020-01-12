---
layout  : wiki
title   : 템플릿 메소드 패턴 (Template Method Pattern)
summary : 알고리즘의 일부 단계를 서브클래스에서 정의한다
date    : 2019-08-31 15:27:07 +0900
updated : 2019-11-21 09:28:58 +0900
tag     : pattern
toc     : true
public  : true
parent  : [[design-pattern]]
latex   : false
---
* TOC
{:toc}

## 개요

### 의도

GoF는 다음과 같이 이 패턴의 의도를 설명한다.[^gof]

> 객체의 연산에는 알고리즘의 뼈대만을 정의하고 각 단계에서 수행할 구체적 처리는 서브클래스 쪽으로 미룹니다.
알고리즘의 구조 자체는 그대로 놔둔 채 알고리즘 각 단계 처리를 서브클래스에서 재정의할 수 있게 합니다.

### 용어

* 템플릿 메소드
    * 필수 처리 절차를 정의한 메소드.
    * 서브클래스가 오버라이드하는 추상 메소드들을 사용하여 알고리즘을 정의하는 메소드.
* 훅 연산(hook operation)
    * 필요하다면 서브클래스에서 확장할 수 있는 기본적인 행동을 제공하는 연산(메소드).
    * 기본적으로는 아무 내용도 정의하지 않는다.

### 구현 팁

* 템플릿 메소드가 호출하는 메소드들을 템플릿 메소드만 호출할 수 있게 하는 것을 고려한다.
    * `protected` 접근 제한을 사용하면 된다.
* 템플릿 메소드는 오버라이드할 수 없도록 구현하는 것을 고려한다.
    * Java라면 템플릿 메소드에 `final`을 달아주면 된다.
* 구현해야 하는 abstract 메소드의 수가 너무 많아지지 않도록 주의한다.
* 재정의할 abstract 메소드는 식별하기 쉽도록 접두사를 붙여주자.
    * 예를 들어 메소드 이름이 `Do`로 시작하도록 한다.

## 헤드 퍼스트 디자인 패턴의 예제

Head First Design Pattern에 나온 예제가 이해하기 쉽다.[^head-example]

다음의 두 클래스가 있다고 하자.

```java
public class Coffee {
    // 커피 만드는 방법
    void prepareRecipe() {
        boilWater();
        brewCoffeeGrinds();
        pourInCup();
        addSugarAndMilk();
    }
    public void boilWater() {
        System.out.println("물 끓이는 중");
    }
    public void brewCoffeeGrinds() {
        System.out.println("필터를 통해서 커피를 우려내는 중");
    }
    public void pourInCup() {
        System.out.println("컵에 따르는 중");
    }
    public void addSugarAndMilk() {
        System.out.println("설탕과 우유를 추가하는 중");
    }
}
```

```java
public class Tea {
    // 홍차 만드는 방법
    void prepareRecipe() {
        boilWater();
        steepTeaBag();
        pourInCup();
        addLemon();
    }
    public void boilWater() {
        System.out.println("물 끓이는 중");
    }
    public void steepTeaBag() {
        System.out.println("차를 우려내는 중");
    }
    public void pourInCup() {
        System.out.println("컵에 따르는 중");
    }
    public void addLemon() {
        System.out.println("레몬을 추가하는 중");
    }
}
```

템플릿 메소드 패턴은 위의 두 클래스를 다음과 같이 리팩토링한다.

* 공통적인 부분을 뽑아 추상 클래스를 만든다.
    * 알고리즘의 세부 항목에서 차이가 있는 곳은 추상 메소드로 정의한다.

```java
public abstract class CaffeineBeverage {
    // 알고리즘을 갖고 있는 이 메소드를 '템플릿 메소드'라 부른다
    final void prepareRecipe() {
        boilWater();
        brew();
        pourInCup();
        addCondiments();
    }

    abstract void brew();           // 서브클래스에서 구현
    abstract void addCondiments();  // 서브클래스에서 구현

    void boilWater() {
        System.out.println("물 끓이는 중");
    }
    void pourInCup() {
        System.out.println("컵에 따르는 중");
    }
}
```

```java
public class Coffee extends CaffeineBeverage {
    public void brew() {
        System.out.println("필터로 커피를 우려내는 중");
    }
    public void addCondiments() {
        System.out.println("설탕과 커피를 추가하는 중");
    }
}
```

```java
public class Tea extends CaffeineBeverage {
    public void brew() {
        System.out.println("차를 우려내는 중");
    }
    public void addCondiments() {
        System.out.println("레몬을 추가하는 중");
    }
}
```

### hook 메소드


* 서브클래스 구현시 융통성을 발휘하기 위한 메소드.
* 추상 클래스에서 선언하지만 기본적인 내용만 구현되어 있거나 내용이 비어 있는 메소드.

```java
public abstract class CaffeineBeverage {
    // 알고리즘을 갖고 있는 이 메소드를 '템플릿 메소드'라 부른다
    final void prepareRecipe() {
        boilWater();
        brew();
        pourInCup();
        // 고객이 원하는 경우에만 첨가물을 넣는다
        if (customerWantsCondiments()) {
            addCondiments();
        }
    }

    abstract void brew();           // 서브클래스에서 구현
    abstract void addCondiments();  // 서브클래스에서 구현

    void boilWater() {
        System.out.println("물 끓이는 중");
    }
    void pourInCup() {
        System.out.println("컵에 따르는 중");
    }

    // 이 메소드가 hook 메소드
    boolean customerWantsCondiments() {
        return true;
    }
}
```

## 람다를 사용해 서브 클래스 제거하기

다음은 [Java Magazine 2016 Nov/Dec의 Implementing Design Patterns with Lambdas][magazine]에 실린 코드를 약간 수정한 것이다.

1개의 추상 메소드를 사용하는 템플릿 메소드가 있다.

```java
abstract class OnlineBanking {
    // template method
    public void processCustomer(int id) {
        Customer c = Database.getCustomerWithId(id);
        makeCustomerHappy(c);
    }
    abstract void makeCustomerHappy(Customer c);
}
```

이 코드를 사용하려면 서브 클래스를 작성해야 한다.

```java
class OnlineBankingKorea extends OnlineBanking {
    @Override
    void makeCustomerHappy(Customer c) {
        System.out.println("안녕하세요 " + c.getName());
    }
}
```

다음과 같이 사용할 수 있다.

```java
new OnlineBankingKorea().processCustomer(1337);
```

구현해야 할 추상 메소드가 하나 뿐이므로 람다의 사용을 고려해볼 수 있다.

OnlineBanking에서 `abstract` 키워드를 삭제하고, `processCustomer` 메소드가 `Consumer`를 받도록 수정한다.

```java
class OnlineBanking {
    public void processCustomer(int id, Consumer<Customer> makeCustomerHappy) {
        Customer c = Database.getCustomerWithId(id);
        makeCustomerHappy.accept(c);
    }
}
```

이제 상속 없이 `OnlineBanking` 클래스를 사용할 수 있다.

```java
new OnlineBanking()
    .processCustomer(1337,
        (Customer c) -> System.out.println("안녕하세요" + c.getName())
);

```

## 인용

Allen Holub은 "실용주의 디자인 패턴"에서 이 패턴에 대해 다음과 같이 불평했다.

> Template Method 패턴은 가능한 절제해 사용해야 한다. 클래스 자체가 전적으로 파생 클래스의 커스터마이징에 의존하는 일종의 '프레임워크'가 되면 이 역시 매우 부서지기 쉽기 때문이다. 기반 클래스는 매우 깨지기 쉽다. 나는 MFC에서 프로그래밍을 할 때, 마이크로소프트가 새로운 버전을 릴리즈할 때마다 전체 애플리케이션을 재작성해야만 했던 악몽을 떨쳐버릴 수가 없다. 종종 코드는 잘 컴파일되지만, 몇몇 기반 클래스의 메소드가 변경되어 프로그램이 제대로 실행되지 않았던 것이다.[^holub]

## 참고문헌

* 도서
    * GoF의 디자인 패턴(개정판) / 에릭 감마, 리처드 헬름, 랄프 존슨, 존 블라시디스 공저 / 김정아 역 / 프로텍미디어 / 발행 2015년 03월 26일
    * Head First Design Patterns / 에릭 프리먼 등저 / 서환수 역 / 한빛미디어 / 초판 16쇄 2017년 5월 10일
    * 실전 코드로 배우는 실용주의 디자인 패턴 / Allen Holub 저 / 송치형 편역 / 지앤선(志&嬋) / 2006년 07월 19일 발행 / 원제 : Holub on Patterns : Learning Design Patterns by Looking at Code
* 웹 문서
    * [Java Magazine 2016 Nov/Dec: Implementing Design Patterns with Lambdas][magazine]

## 주석

[^gof]: GoF의 디자인 패턴(개정판). 419쪽.
[^head-example]: Head First Design Patterns. 315쪽.
[^holub]: 실용주의 디자인 패턴. Chapter 2. 93쪽.

[magazine]: http://www.javamagazine.mozaicreader.com/NovDec2016/LinkedIn#&pageSet=57&page=0

