---
layout  : wiki
title   : 커맨드 패턴 (Command Pattern)
summary : 요구 사항을 객체로 캡슐화한다
date    : 2019-10-24 16:32:27 +0900
updated : 2021-10-10 01:14:51 +0900
tag     : GoF-design-pattern refactoring
resource: 2B/0D86B3-7EAB-4E51-853E-4E4B57EB03BF
toc     : true
public  : true
parent  : [[pattern]]
latex   : false
giscus  : auto
---
* TOC
{:toc}

* 다음과 같이 불린다.
    * 커맨드 패턴
    * 명령 패턴
    * 작동(Action) 패턴
    * 트랜잭션(Transaction) 패턴

## 의도

### From: GoF의 디자인 패턴

GoF 책에서는 다음과 같이 패턴의 의도를 밝힌다.[^gof]

>
Encapsulate a request as an object,
thereby letting you parameterize clients with different requests,
queue or log requests, and support undoable operations.
>
> 요청 자체를 캡슐화하는 것입니다.
이를 통해 요청이 서로 다른 사용자를 매개변수로 만들고,
요청을 대기시키거나 로깅하며, 되돌릴 수 있는 연산을 지원합니다.

### From: 헤드 퍼스트 디자인 패턴

GoF 책의 번역이 좀 어려운데, "헤드 퍼스트 디자인 패턴"에서는 똑같은 말을 좀 더 이해하기 쉽게 번역해 두었다.[^head-define]

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

### From: 패턴을 활용한 리팩터링

>
많은 시스템에서 외부 요청을 받아 분배하고 실행하는 동작이 일어난다.
이때 요청을 분배하고 실행하는 조건문(switch와 같은)을 조건적 디스패처<sup>conditional dispatcher</sup>라 부른다.
어떤 경우에는 조건적 디스패처로 충분히 작업을 수행할 수 있지만, 그렇지 못한 경우도 있다.
>
처리해야 할 요청의 종류가 적고 이것을 처리하는 로직도 얼마 되지 않는다면 디스패처를 조건 로직으로 구현해도 무방하다.
조건 로직 전체의 코드를 모니터의 한 화면에서 스크롤 없이 볼 수 있을 정도로 작다면 말이다.
그런 경우에는 Command 패턴을 써서 얻을 것이 없다.
[^joshua-266]

- 조건 로직 코드 전체가 짧고 복잡하지 않다면 Command 패턴을 굳이 적용할 필요는 없다.

>
그러나 조건적 디스패처의 코드 크기가 작다고 할지라도 시스템에 적합한 구현은 아닐 수 있다.
조건적 디스패처를 Command 패턴으로 리팩터링하는 대표적인 이유는 다음과 같다.
>
1. **런타임에 충분히 유동적이지 못하다.**
요청이나 처리 로직이 동적으로 구성될 필요가 있는 경우, 조건적 디스패처는 적절하지 않다.
조건적 디스패처는 처리 로직이 조건문으로 하드 코딩되기 때문에, 로직의 동적 구성을 지원할 수 없다.
2. **코드가 비대해진다.** 새로운 종류의 요청을 처리하기 위한 로직이 추가되거나 새로운 요건에 의해 처리 로직이 복잡해지면, 조건적 디스패처의 코드는 무지막지하게 커질 수밖에 없다.
처리 로직을 별도의 메서드로 분리한다고 해도 그다지 도움이 되지 않는다.
분리된 메서드와 디스패처가 포함된 클래스가 여전히 다루기 힘들 정도로 크기 때문이다.
>
Command 패턴은 이런 종류의 문제에 대한 훌륭한 해결책이다.
Command 패턴을 구현하려면, 일단 각 요청을 처리하는 로직을 `execute()` 또는 `run()`과 같은 공통 메서드를 가지는 별도의 커맨드 클래스로 옮겨 캡슐화한다.
이렇게 커맨드의 집합을 만들고 나면, 컬렉션을 이용해 그 인스턴스를 저장하고 조작할 수 있다(추가, 삭제, 인스턴스 변경 등).
요청이 들어왔을 때 그에 해당하는 커맨드 인스턴스를 찾아 실행 메서드를 호출하면 된다.
[^joshua-266]

## 구조

구조는 다음과 같다.[^structure]

![커맨드 패턴의 구조를 표현한 그림]( /resource/2B/0D86B3-7EAB-4E51-853E-4E4B57EB03BF/command.svg )

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

- GoF의 디자인 패턴(개정판) / 에릭 감마, 리처드 헬름, 랄프 존슨, 존 블라시디스 공저 / 김정아 역 / 프로텍미디어 / 발행 2015년 03월 26일
- Head First Design Patterns / 에릭 프리먼 등저 / 서환수 역 / 한빛미디어 / 초판 16쇄 2017년 5월 10일
- 패턴을 활용한 리팩터링 / 조슈아 케리에브스키 저 / 윤성준, 조상민 공역 / 인사이트(insight) / 신판 1쇄 발행 2011년 02월 09일 / 원제 : REFACTORING TO PATTERNS

## 주석

[^gof]: GoF의 디자인 패턴(개정판). 311쪽.
[^structure]: GoF의 디자인 패턴(개정판). 315쪽.
[^head-define]: Head First Design Patterns. 244쪽.
[^joshua-266]: 패턴을 활용한 리팩터링. 7장. 266쪽.
