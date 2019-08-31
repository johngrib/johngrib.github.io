---
layout  : wiki
title   : 템플릿 메소드 패턴(Template Method Pattern)
summary : 알고리즘의 일부 단계를 서브클래스에서 정의한다
date    : 2019-08-31 15:27:07 +0900
updated : 2019-08-31 16:29:29 +0900
tag     : design-pattern
toc     : true
public  : true
parent  : design-pattern
latex   : false
---
* TOC
{:toc}

# 개요 

## 의도

"GoF의 디자인 패턴"에서는 다음과 같이 이 패턴의 의도를 설명한다.

> 객체의 연산에는 알고리즘의 뼈대만을 정의하고 각 단계에서 수행할 구체적 처리는 서브클래스 쪽으로 미룹니다.
알고리즘의 구조 자체는 그대로 놔둔 채 알고리즘 각 단계 처리를 서브클래스에서 재정의할 수 있게 합니다.

## 용어

* 템플릿 메소드
    * 필수 처리 절차를 정의한 메소드.
    * 서브클래스가 오버라이드하는 추상 메소드들을 사용하여 알고리즘을 정의하는 메소드.
* 훅 연산(hook operation)
    * 필요하다면 서브클래스에서 확장할 수 있는 기본적인 행동을 제공하는 연산(메소드).
    * 기본적으로는 아무 내용도 정의하지 않는다.

## 구현 팁

* 템플릿 메소드가 호출하는 메소드들을 템플릿 메소드만 호출할 수 있게 하는 것을 고려한다.
    * `protected` 접근 제한을 사용하면 된다.
* 템플릿 메소드는 오버라이드할 수 없도록 구현하는 것을 고려한다.
    * Java라면 템플릿 메소드에 `final`을 달아주면 된다.
* 구현해야 하는 abstract 메소드의 수가 너무 많아지지 않도록 주의한다.
* 재정의할 abstract 메소드는 식별하기 쉽도록 접두사를 붙여주자.
    * 예를 들어 메소드 이름이 `Do`로 시작하도록 한다.

# 코드 예제

Head First Design Pattern에 나온 예제가 이해하기 쉽다.

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

## hook 메소드


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

# 참고문헌

* GoF의 디자인 패턴(개정판) / 에릭 감마, 리처드 헬름, 랄프 존슨, 존 블라시디스 공저 / 김정아 역 / 프로텍미디어 / 발행 2015년 03월 26일
* Head First Design Patterns / 에릭 프리먼 등저 / 서환수 역 / 한빛미디어 / 초판 16쇄 2017년 5월 10일
