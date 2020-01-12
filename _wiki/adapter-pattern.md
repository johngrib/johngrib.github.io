---
layout  : wiki
title   : 어댑터 패턴 (Adapter Pattern)
summary : 서로 일치하지 않는 인터페이스를 가진 클래스를 함께 동작시킨다
date    : 2019-10-29 14:53:41 +0900
updated : 2019-10-29 15:20:41 +0900
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

헤드 퍼스트 디자인 패턴에서는 다음과 같이 정의한다.[^head-define]

> 한 클래스의 인터페이스를 클라이언트에서 사용하고자 하는 다른 인터페이스로 변환합니다.
어댑터를 이용하면 인터페이스 호환성 문제 때문에 같이 쓸 수 없는 클래스들을 연결해서 쓸 수 있습니다.

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

## 참고문헌

* 도서
  * GoF의 디자인 패턴(개정판) / 에릭 감마, 리처드 헬름, 랄프 존슨, 존 블라시디스 공저 / 김정아 역 / 프로텍미디어 / 발행 2015년 03월 26일
  * Head First Design Patterns / 에릭 프리먼 등저 / 서환수 역 / 한빛미디어 / 초판 16쇄 2017년 5월 10일

## 주석

[^gof]: GoF의 디자인 패턴(개정판). 196쪽.
[^head-example]: Head First Design Patterns. 276쪽.
[^head-define]: Head First Design Patterns. 281쪽.
