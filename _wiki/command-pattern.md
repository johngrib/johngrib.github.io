---
layout  : wiki
title   : 커맨드 패턴 (Command Pattern)
summary : 요구 사항을 객체로 캡슐화한다
date    : 2019-10-24 16:32:27 +0900
updated : 2020-07-19 13:38:55 +0900
tag     : 
toc     : true
public  : true
parent  : [[design-pattern]]
latex   : false
---
* TOC
{:toc}

* 다음과 같이 불린다.
    * 커맨드 패턴
    * 명령 패턴
    * 작동(Action) 패턴
    * 트랜잭션(Transaction) 패턴

## 의도

GoF 책에서는 다음과 같이 패턴의 의도를 밝힌다.[^gof]

>
Encapsulate a request as an object,
thereby letting you parameterize clients with different requests,
queue or log requests, and support undoable operations.
>
> 요청 자체를 캡슐화하는 것입니다.
이를 통해 요청이 서로 다른 사용자를 매개변수로 만들고,
요청을 대기시키거나 로깅하며, 되돌릴 수 있는 연산을 지원합니다.

번역이 좀 어려운데, "헤드 퍼스트 디자인 패턴"에서는 똑같은 말을 좀 더 이해하기 쉽게 번역해 두었다.[^head-define]

>
커맨드 패턴 - 요구 사항을 객체로 캡슐화할 수 있으며,
매개변수를 써서 여러 가지 다른 요구 사항을 집어넣을 수도 있습니다.
또한 요청 내역을 큐에 저장하거나 로그로 기록할 수도 있으며,
작업취소 기능도 지원 가능합니다.

뒤이은 설명도 이해하기 쉽다.

>
커맨드 객체는 일련의 행동을 특정 리시버하고 연결시킴으로써 요구 사항을 캡슐화한 것이라는 점을 이미 배웠습니다.
이렇게 하기 위해서 행동과 리시버를 한 객체에 집어넣고, execute()라는 메소드 하나만 외부에 공개하는 방법을 씁니다.
이 메소드 호출에 의해서 리시버에서 일련의 작업이 처리됩니다. 외부에서 볼 때는 어떤 객체가 리시버 역할을 하는지,
그 리시버에서 실제로 어떤 일을 하는지 알 수 없습니다.
그냥 execute() 메소드를 호출하면 요구 사항이 처리된다는 것만 알 수 있을 뿐이죠.

구조는 다음과 같다.[^structure]

![structure]( /post-img/command-pattern/structure.gif )

## 요약

이 패턴의 핵심은 Command 인터페이스다.

```java
interface Command {
  void execute();
}
```

이 인터페이스를 구현한 여러 커맨드를 심플하게 사용하는 것도 방법이지만,
Queue에 넣거나 Log나 Undo를 구현할 때 더욱 유용하다.


## 헤드 퍼스트 디자인 패턴의 예제

```java
interface Command {
  void execute();
}
```

* 전등을 켜는 명령

```java
class LightOnCommand implements Command {
  Light light;

  public LightOnCommand(Light light) {
    this.light = light;
  }

  @Override
  public void execute() {
    light.on();
  }
}
```

* 리모콘

```java
class SimpleRemoteControl {
  Command slot;

  public SimpleRemoteControl() { }

  public void setCommand(Command command) {
    this.slot = command;
  }

  public void buttonWasPressed() {
    slot.execute();
  }
}
```

* 리모콘에 전등 켜기 명령을 등록하고 사용.

```java
public class Main {
  public static void main(String[] args) {
    LightOnCommand lightOn = new LightOnCommand(new Light());

    SimpleRemoteControl remote = new SimpleRemoteControl();
    remote.setCommand(lightOn);
    remote.buttonWasPressed();
  }
}
```

### Undo 기능의 추가

* Undo 기능을 추가하기 위해 `Command` 인터페이스에 `undo` 메소드를 추가한다.

```java
interface Command {
  void execute();
  void undo();
}
```

* 불 켜는 명령에도 `undo` 메소드를 구현해준다.

```java
class LightOnCommand implements Command {
  Light light;

  public LightOnCommand(Light light) {
    this.light = light;
  }

  @Override
  public void execute() {
    light.on();
  }

  @Override
  public void undo() {
    light.off();    /* 불을 끈다 */
  }
}
```

* 리모콘에서는 명령을 스택에 쌓고, `undo`를 실행할 때마다 `pop`하여 순서대로 실행 취소를 할 수 있다.
* 그 외에도 매크로 기록, 작업 단위 취소, 히스토리 기록 등을 응용해 구현할 수 있다.

## 어디에서 사용하고 있나?

Java의 Thread가 전형적인 Command 패턴의 형태라 할 수 있다.

```java
public class Main {
  public static void main(String[] args) {
    Thread t = new Thread(new Command());
    t.start();  /* run을 실행하지만 Command가 무엇을 하는지는 모른다 */
  }
}

class Command implements Runnable {
  @Override
  public void run() {
    System.out.println("RUN!");
  }
}
```

## 참고문헌

* 도서
    * GoF의 디자인 패턴(개정판) / 에릭 감마, 리처드 헬름, 랄프 존슨, 존 블라시디스 공저 / 김정아 역 / 프로텍미디어 / 발행 2015년 03월 26일
    * Head First Design Patterns / 에릭 프리먼 등저 / 서환수 역 / 한빛미디어 / 초판 16쇄 2017년 5월 10일

## 주석

[^gof]: GoF의 디자인 패턴(개정판). 311쪽.
[^structure]: GoF의 디자인 패턴(개정판). 315쪽.
[^head-define]: Head First Design Patterns. 244쪽.

