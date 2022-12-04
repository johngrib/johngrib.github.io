---
layout  : wiki
title   : 템플릿 메소드 패턴 (Template Method Pattern)
summary : 알고리즘의 일부 단계를 서브클래스에서 정의한다
date    : 2019-08-31 15:27:07 +0900
updated : 2021-10-10 09:13:38 +0900
tag     : GoF-design-pattern refactoring
resource: 5C/ABE1C7-49C5-4CF3-9DDE-E6B3FB7E323A
toc     : true
public  : true
parent  : [[/pattern]]
latex   : false
---
* TOC
{:toc}

## 개요

### 의도

GoF는 다음과 같이 이 패턴의 의도를 설명한다.[^gof]

> 객체의 연산에는 알고리즘의 뼈대만을 정의하고 각 단계에서 수행할 구체적 처리는 서브클래스 쪽으로 미룹니다.
알고리즘의 구조 자체는 그대로 놔둔 채 알고리즘 각 단계 처리를 서브클래스에서 재정의할 수 있게 합니다.

실용주의 디자인 패턴에서는 이 패턴이 상속 기반의 프레임워크에서 사용된다고 설명한다.

>
Template Method는 보통 상속 기반의 프레임워크에서 사용된다.
프레임워크는 작업의 90% 정도를 기반 클래스를 통해 제공하며,
애플리케이션에 용도에 맞게 맞춤화할 필요가 있는 부분은 추상 메소드로 남겨놓는다.
이 말은 곧 기반 클래스가 추상 템플릿 메소드를 호출한다는 의미이다.
사용자는 클래스를 상속하고 추상 메소드를 필요에 맞게 구현함으로써 프레임워크를 사용하게 된다.
[^holub-490]

패턴을 활용한 리팩터링에서는 다음과 같이 설명한다.

>
템플릿 메서드는 '알고리즘에서 불변적인 부분은 한 번만 구현하고 가변적인 동작은 서브클래스에서 구현할 수 있도록 남겨둔 것'을 말한다.
서브클래스에 불변적인 부분과 가변적인 부분이 뒤섞여 있다면, 불변적인 부분이 여러 서브클래스에서 중복될 것이다.
이런 코드를 Template Method 패턴으로 리팩터링하면,
불변적인 부분에 대한 구현은 한 곳에만, 즉 수퍼클래스 메서드 내의 일반화된 알고리즘에만 존재하게 되므로 코드 중복이 사라진다.
>
템플릿 메서드의 불변적 동작은 다음을 포함한다.
>
- 알고리즘을 구성하는 메서드 목록과 그 호출 순서
- 서브클래스가 꼭 오버라이드해야 할 추상 메서드
- 서브클래스가 오버라이드해도 되는 훅 메서드hook method, 즉 구체 메서드
[^joshua-282]


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

## 고려할 점들

### From: 실용주의 디자인 패턴

> Template Method 패턴은 가능한 절제해 사용해야 한다. 클래스 자체가 전적으로 파생 클래스의 커스터마이징에 의존하는 일종의 '프레임워크'가 되면 이 역시 매우 부서지기 쉽기 때문이다. 기반 클래스는 매우 깨지기 쉽다. 나는 MFC에서 프로그래밍을 할 때, 마이크로소프트가 새로운 버전을 릴리즈할 때마다 전체 애플리케이션을 재작성해야만 했던 악몽을 떨쳐버릴 수가 없다. 종종 코드는 잘 컴파일되지만, 몇몇 기반 클래스의 메소드가 변경되어 프로그램이 제대로 실행되지 않았던 것이다.[^holub-93]

<span/>

> Template Method 패턴은 또한 '이디엄'과 '패턴' 사이가 얼마나 가까울 수 있는지를 보여주는 예이기도 하다.
Template Method 패턴은 다형성을 조금 응용했을 뿐 **패턴**이란 영광의 타이틀을 쓰기엔 부족하다고 주장할 수도 있는 것이다.
[^holub-94]

### From: 패턴을 활용한 리팩터링

>
Template Method 패턴을 구현할 때에 실무적인 주의사항이 하나 있는데,
서브클래스에서 오버라이드해야 하는 메서드가 너무 많으면 곤란하다는 것이다.
서브클래스를 구현하기가 어려워지기 때문이다.
그래서 [Design Patterns]에서는 서브클래스에서 오버라이드해야 하는 추상 메서드의 개수를 최소화해야 한다고 지적한다.
그러지 않으면 템플릿 메서드의 내용을 자세히 살펴보지 않고는 프로그래머가 어떤 메서드를 오버라이드해야 할지 쉽게 알 수 없을 것이다.
[^joshua-283]

<span/>

>
Java 같은 프로그래밍 언어에서는 템플릿 메서드를 final로 선언해 서브클래스가 실수로 오버라이드하는 것을 예방할 수도 있다.
단, 이런 방법은 클라이언트 코드에서 템플릿 메서드의 불변적인 부분을 전혀 변경할 필요가 없는 것이 확실할 때에만 사용해야 한다.
[^joshua-283]


## 참고문헌

- GoF의 디자인 패턴(개정판) / 에릭 감마, 리처드 헬름, 랄프 존슨, 존 블라시디스 공저 / 김정아 역 / 프로텍미디어 / 발행 2015년 03월 26일
- Head First Design Patterns / 에릭 프리먼 등저 / 서환수 역 / 한빛미디어 / 초판 16쇄 2017년 5월 10일
- [Java Magazine 2016 Nov/Dec: Implementing Design Patterns with Lambdas][magazine]
- 실전 코드로 배우는 실용주의 디자인 패턴 / Allen Holub 저 / 송치형 편역 / 지앤선(志&嬋) / 2006년 07월 19일 발행 / 원제 : Holub on Patterns : Learning Design Patterns by Looking at Code
- 패턴을 활용한 리팩터링 / 조슈아 케리에브스키 저 / 윤성준, 조상민 공역 / 인사이트(insight) / 신판 1쇄 발행 2011년 02월 09일 / 원제 : REFACTORING TO PATTERNS

## 주석

[^gof]: GoF의 디자인 패턴(개정판). 419쪽.
[^head-example]: Head First Design Patterns. 315쪽.
[^holub-93]: 실용주의 디자인 패턴. Chapter 2. 93쪽.
[^holub-94]: 실용주의 디자인 패턴. Chapter 2. 94쪽.
[^holub-490]: 실용주의 디자인 패턴. Appendix. 490쪽.
[^joshua-282]: 패턴을 활용한 리팩터링. 8장. 282쪽.
[^joshua-283]: 패턴을 활용한 리팩터링. 8장. 283쪽.

[magazine]: http://www.javamagazine.mozaicreader.com/NovDec2016/LinkedIn#&pageSet=57&page=0

