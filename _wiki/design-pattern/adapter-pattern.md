---
layout  : wiki
title   : 어댑터 패턴 (Adapter Pattern)
summary : 서로 일치하지 않는 인터페이스를 가진 클래스를 함께 동작시킨다
date    : 2019-10-29 14:53:41 +0900
updated : 2021-09-22 11:45:10 +0900
tag     : pattern
toc     : true
public  : true
parent  : [[design-pattern]]
latex   : false
---
* TOC
{:toc}

* 다음과 같이 불린다.
  * 어댑터(Adapter, Adaptor)
  * 적응자
  * 래퍼(Wrapper)

## 의도

GoF 책에서는 다음과 같이 패턴의 의도를 밝힌다.[^gof]

> 클래스의 인터페이스를 사용자가 기대하는 인터페이스 형태로 적응(변환) 시킵니다.
서로 일치하지 않는 인터페이스를 갖는 클래스들을 함께 동작시킵니다.

헤드 퍼스트 디자인 패턴에서는 다음과 같이 정의한다.[^head-281]

> 한 클래스의 인터페이스를 클라이언트에서 사용하고자 하는 다른 인터페이스로 변환합니다.
어댑터를 이용하면 인터페이스 호환성 문제 때문에 같이 쓸 수 없는 클래스들을 연결해서 쓸 수 있습니다.

앨런 홀럽은 이 패턴이 다음과 같은 문제를 해결한다고 설명한다.[^holub-456]

>
- 현재 사용하고 있는 라이브러리가 더 이상 요구에 부합하지 않아 재작성하거나, 다른 라이브러리를 사용해야 할 때가 있다. 다른 라이브러리를 사용하는 경우 Adapter 패턴을 이용해 기존 코드를 가능한 적게 변경하면서 새로운 라이브러리로 교체할 수 있다.
- 기존 버전의 클래스가 다른 인터페이스를 가지도록, 예를 들어 메소드의 파라미터를 변경하거나 반환 값의 타입을 변경해야 한다면? 기존 버전과 새로운 버전의 메소드를 모두 갖는 비대한 클래스를 만들 수도 있을 것이다. 하지만 대부분의 경우 심플한 클래스(새로운 버전)를 만들고 Adapter를 이용하여 새로운 객체가 기존 코드에 존재하는 것처럼 보이게 하는 것이 더 낫다.


## 요약

특정 인터페이스를 지원하지 않는 대상 객체를 인터페이스를 지원하는 Adapter에 집어넣어서 사용하는 방법이라 할 수 있다.

다음은 헤드 퍼스트 디자인 패턴의 다이어그램을 참고해 그린 것이다.[^head-281]

![]( ./adapter-head-first-281.svg )

다이어그램에 나타나 있는 상황을 설명하자면 다음과 같다.

- Client는 <span style="color: blue">Target</span> 인터페이스를 구현한 <span style="color: purple">Adaptee</span>가 필요하다.
- <span style="color: purple">Adaptee</span>는 <span style="color: blue">Target</span>인터페이스를 구현하지 않고 있다.
    - <span style="color: purple">Adaptee</span>는 이미 개발이 완료되어 사용중이다.
    - <span style="color: purple">Adaptee</span>를 변경하는 것이 적절하지 않은 상황이다.

따라서 다음과 같이 어댑터 패턴을 고려할 수 있다. 코드는 내가 작성했다.

```java
// Adaptee 는 이미 개발이 완료됐고, 수정하기 곤란한 상황이다.
class Adaptee {
  Response specificRequest() {
    return new Response();
  }
}

// 클라이언트가 사용하려는 인터페이스.
interface Target {
  Response request();
}

// Adapter는 Adaptee를 감싸고 있으며, Target 인터페이스를 구현한다.
class Adapter implements Target {
  private final Adaptee adaptee;

  public Adapter(Adaptee adaptee) {
    this.adaptee = adaptee;
  }

  @Override
  public Response request() {
    return this.adaptee.specificRequest();
  }
}
```

- <span style="color: red">Adapter</span> 클래스를 만들고, <span style="color: purple">Adaptee</span>를 내부에 갖고 있게 한다.
    - <span style="color: red">Adapter</span>는 <span style="color: blue">Target</span>을 구현한다.
    - <span style="color: red">Adapter</span>의 `request()`는 <span style="color: purple">Adaptee</span>의 `specificRequest()`를 감싸고 있다.

이제 `Adaptee`를 다음과 같이 `Adapter`에 집어넣어서 `Target` 인터페이스로 사용할 수 있다.

```java
Target target = new Adapter(adaptee)
```

## 예제: 헤드 퍼스트 디자인 패턴

다음은 헤드 퍼스트 디자인 패턴의 예제이다.[^head-example]

* 다음은 오리를 표현한 것이다.

```java
interface Duck {
  public void quack();  // 오리는 꽉꽉 소리를 낸다
  public void fly();
}

class MallardDuck implements Duck {
  @Override
  public void quack() {
    System.out.println("Quack");
  }
  @Override
  public void fly() {
    System.out.println("I'm flying");
  }
}
```

* 다음은 칠면조를 표현한 것이다. 두 새의 인터페이스가 다르다는 점에 주목.

```java
interface Turkey {
  public void gobble();   // 칠면조는 골골거리는 소리를 낸다
  public void fly();
}

class WildTurkey implements Turkey {
  @Override
  public void gobble() {
    System.out.println("Gobble gobble");
  }
  @Override
  public void fly() {
    System.out.println("I'm flying a short distance");
  }
}
```

* 그리고 이것이 바로 어댑터이다.

```java
class TurkeyAdapter implements Duck {
  Turkey turkey;

  public TurkeyAdapter(Turkey turkey) {
    this.turkey = turkey;
  }
  @Override
  public void quack() {
    turkey.gobble();
  }
  @Override
  public void fly() {
    // 칠면조는 멀리 날지 못하므로 다섯 번 날아서 오리처럼 긴 거리를 날게 한다
    for (int i = 0; i < 5; i++) {
      turkey.fly();
    }
  }
}
```

이 어댑터를 다이어그램으로 표현하자면 다음과 같다. 어댑터 `TurkeyAdapter`를 통해 `Turkey`를 `Duck`처럼 사용할 수 있게 된 것이다.

![]( ./adapter-duck.svg )

## 참고문헌

- GoF의 디자인 패턴(개정판) / 에릭 감마, 리처드 헬름, 랄프 존슨, 존 블라시디스 공저 / 김정아 역 / 프로텍미디어 / 발행 2015년 03월 26일
- Head First Design Patterns / 에릭 프리먼 등저 / 서환수 역 / 한빛미디어 / 초판 16쇄 2017년 5월 10일
- 실전 코드로 배우는 실용주의 디자인 패턴 / Allen Holub 저 / 송치형 편역 / 사이텍미디어 / 발행 2006년 07월 19일 / 원제 : Holub on Patterns : Learning Design Patterns by Looking at Code

## 주석

[^gof]: GoF의 디자인 패턴(개정판). 196쪽.
[^head-example]: Head First Design Patterns. 276쪽.
[^head-281]: Head First Design Patterns. 281쪽.
[^holub-456]: 실전 코드로 배우는 실용주의 디자인 패턴. 456쪽.

