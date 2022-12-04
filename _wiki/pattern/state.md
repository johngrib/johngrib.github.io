---
layout  : wiki
title   : 스테이트 패턴 (State Pattern)
summary : 객체의 내부 상태에 따라 행동을 변경할 수 있다.
date    : 2021-10-09 09:59:41 +0900
updated : 2021-10-09 18:10:08 +0900
tag     : GoF-design-pattern refactoring
resource: 49/9A87A2-E5AD-4FCA-B028-200F9DC2BDA2
toc     : true
public  : true
parent  : [[/pattern]]
latex   : false
---
* TOC
{:toc}

* 다음과 같이 불린다.
    * 스테이트 패턴(state pattern)
    * 상태 표현 객체(Object for state)

## 의도

> 객체의 내부 상태에 따라 스스로 행동을 변경할 수 있게 허가하는 패턴으로,
이렇게 하면 객체는 마치 자신의 클래스를 바꾸는 것처럼 보입니다.
[^gof-395]

<span/>

>
State 패턴으로 리팩터링하는 주된 목적은 상태 전이를 위한 조건 로직이 지나치게 복잡한 경우 이를 해소하는 것이다.
상태 전이 로직이란 객체의 상태와 이들 간의 전이 방법을 제어하는 것으로,
클래스 내부 여기저기에 흩어져 존재하는 경향이 있다.
State 패턴을 구현한다는 것은 각 상태에 대응하는 별도의 클래스를 만들고 상태 전이 로직을 그 클래스들로 옮기는 작업을 뜻한다.
이 때 원래의 호스트 객체를 [Design Patterns]에서는 컨텍스트<sup>context</sup>라 부르는데,
컨텍스트 객체는 상태와 관련된 기능을 스테이트 객체에 위임한다.
그리고 상태 전이는 컨텍스트 객체의 대리 객체를 한 스테이트 객체에서 다른 스테이트 객체로 바꾸는 일이 된다.
>
클래스 하나에 모여 있던 상태 전이 로직을 꺼내어 각 상태를 나타내는 클래스로 분산시키면,
설계가 단순해져서 상태가 전이되는 방식을 좀더 쉽게 알아볼 수 있다.
그러나 원래의 설계에서도 상태 전이 로직을 쉽게 이해할 수 있었다면, 굳이 State 패턴으로 리팩터링할 필요가 없다.
앞으로 상태를 더 늘리거나 상태 전이 를 더 복잡하게 만들 계획이 없다면 말이다.
[^joshua-235]

<span/>


## 구조

![스테이트 패턴의 구조를 표현한 다이어그램]( ./state.svg )

- `Context`
    - 사용자가 관심 있는 인터페이스를 정의한다.
    - 객체의 각 상태를 정의한 `State`의 구현체 인스턴스를 관리한다.
- `State`
    - `Context`의 각 상태별 행동을 정의한다.


## 예제
### 간단한 티켓 자판기

간단하게 동전 하나를 받아 티켓을 뽑을 수 있는 티켓 자판기를 만들어 보자.

이 자판기는 두 개의 상태를 갖는다.

- 동전이 없는 상태
    - 티켓 구매자의 동전이 투입되기를 기다리고 있는 상태.
    - 티켓을 출력하려 해도 상태는 바뀌지 않는다.
    - 동전을 넣으면 동전이 투입된 상태로 바뀐다.
- 동전이 투입된 상태
    - 티켓을 뽑을 수 있다.
    - 동전을 더 넣어도 상태는 바뀌지 않는다.
    - 티켓을 뽑으면 동전이 투입된 상태로 바뀐다.

다음은 이를 DFA로 표현한 것이다.

![티켓 자판기의 상태 변화를 DFA로 표현한 다이어그램]( ./ticket-machine.svg )


이제 코드로 작성해 보자.

- State

```java
public interface State {
  void insertCoin();

  void printTicket();
}
```

- 동전 있는 상태

```java
class NoCoinState implements State {
  TicketMachine ticketMachine;

  NoCoinState(TicketMachine ticketMachine) {
    this.ticketMachine = ticketMachine;
  }

  @Override
  public void insertCoin() {
    // 동전을 넣었다면 동전이 있는 상태로 이동한다.
    ticketMachine.setState(ticketMachine.getCoinState());
  }

  @Override
  public void printTicket() {
    System.out.println("동전이 없습니다. 동전을 넣어주세요.");
  }
}
```

- 동전 없는 상태

```java
// 동전 있는 상태
class CoinState implements State {
  private final TicketMachine ticketMachine;

  CoinState(TicketMachine ticketMachine) {
    this.ticketMachine = ticketMachine;
  }

  @Override
  public void insertCoin() {
    System.out.println("이미 동전이 들어있습니다.");
  }

  @Override
  public void printTicket() {
    // 티켓을 출력하고, 동전을 동전 저장소에 추가한 다음, 동전이 없는 상태로 이동한다.
    TicketPrinter.print();
    CoinRepository.add(1);
    ticketMachine.setState(ticketMachine.getNoCoinState());
  }
}
```

- Context: 티켓 자판기

```java
public class TicketMachine {
  final State noCoinState;
  final State coinState;
  private State currentState;

  public TicketMachine() {
    this.noCoinState = new NoCoinState(this);
    this.coinState = new CoinState(this);

    this.currentState = noCoinState;
  }

  public void insertCoin() {
    currentState.insertCoin();
  }

  public void setState(State newState) {
    this.currentState = newState;
  }

  public State getCoinState() {
    return coinState;
  }

  public State getNoCoinState() {
    return noCoinState;
  }
}
```

### 어린이 보호 기능이 있는 냉온수기

이번에는 어린이 보호 기능이 있는 냉온수기를 만든다고 생각해 보자.

이 냉온수기를 조작하는 버튼은 모두 4개이다.

- 정수 모드 버튼
- 온수 모드 버튼
- 냉수 모드 버튼
- 물 받기 버튼

그리고 이 냉온수기는 상태별로 다음과 같은 특징이 있다.

- 냉수 상태
    - 물을 받으면 찬 물이 나온다.
    - 온수 버튼을 누르면 온수 상태로 바뀐다.
    - 정수 버튼을 누르면 정수 상태로 바뀐다.
- 온수 상태
    - 물을 받으면 뜨거운 물이 나오고 나서, 곧바로 정수 상태로 바뀐다.
    - 냉수 버튼을 누르면 냉수 상태로 바뀐다.
    - 정수 버튼을 누르면 정수 상태로 바뀐다.
- 정수 상태
    - 물을 받으면 상온의 정수가 나온다.
    - 온수 버튼을 누르면 온수 상태로 바뀐다.
    - 냉수 버튼을 누르면 냉수 상태로 바뀐다.
    - 정수 버튼을 누르면 어린이 보호 모드로 바뀐다.
- 어린이 보호 모드 상태
    - 물을 받으면 상온의 정수가 나온다.
    - 온수/냉수 버튼을 눌러도 상태가 바뀌지 않는다.
    - 정수 버튼을 누르면 어린이 보호 모드가 해제되며 정수 상태로 바뀐다.

어린이 보호 모드는 추가할까 말까 고민했는데, 냉수/온수/정수보다 조금 더 복잡도가 있는 에제를 만들기 위해 일부러 추가해 보았다.

다음은 위의 특징에서 알아낼 수 있는 상태 변화만을 DFA로 표현한 것이다.
조작 버튼이 4개이므로 각각의 상태는 4개의 화살표 출발점을 갖는다.
각 상태와 화살표는 구별하기 쉽도록 상태별로 색깔을 다르게 칠해뒀다.

![어린이 보호 그림이 있는 냉온수기의 상태 편화를 표현한 DFA 다이어그램]( ./water-machine.svg )

상태가 4가지 밖에 안 되는데 꽤 복잡하다.

이런 상태변화를 갖는 제품을 단일 메소드나 중첩된 `if`로 구현하기는 까다로운 일이다.
상태 관리를 하기에는 경우의 수가 너무 많고, 코딩 실수를 통해 빠뜨린 케이스가 나올 가능성도 있다. 만약 상태가 20~30가지라면 복잡도가 상당할 것이다.

```java
// if/else로 구현하려면 대단히 복잡하다.
void requestWater() {
    if (currentState == HOT) {
        if (!childrenSafe) {
            WaterSupplier.supplyHotWater();
            currentState = NORMAL;
        }
    } else if (currentState == COLD) {
        if (!childrenSafe) {
            WaterSupplier.supplyColdWater();
        }
        ...
    } else if (currentState == NORMAL) {
        ...
    }

```

스테이트 패턴은 이런 상태 관리의 복잡도를 관리하는 데에 도움을 준다. 각각의 상태가 제공하는 동작을 하나의 클래스로 격리하는 것이다.

다음은 이 냉온수기를 스테이트 패턴을 사용해 구현한 예제이다.
아래로 내려가며 코드를 읽어보면 `if`가 하나도 없다는 사실을 알 수 있다.
각 상태는 `State` 인터페이스를 구현하고 있으며(4개의 냉온수기 조작 버튼을 제공), 조건을 만족할 때마다 다음 상태로 이동하게 된다.

```java
// 냉온수기의 버튼은 4개이다.
interface State {
  void coldWater();
  void hotWater();
  void normalWater();
  void waterSupply();
}
```

- 냉수 상태

```java
class ColdWaterState implements State {
  private final WaterMachine waterMachine;

  ColdWaterState(WaterMachine waterMachine) {
    this.waterMachine = waterMachine;
  }

  @Override
  public void coldWater() {
    System.out.println("이미 냉수가 선택되어 있습니다.");
  }

  @Override
  public void hotWater() {
    System.out.println("냉수 -> 온수로 상태를 변경합니다.");
    waterMachine.changeState(waterMachine.hotWaterState);
  }

  @Override
  public void normalWater() {
    System.out.println("냉수 -> 정수로 상태를 변경합니다.");
    waterMachine.changeState(waterMachine.normalWaterState);
  }

  @Override
  public void waterSupply() {
    System.out.println("냉수가 나옵니다.");
    WaterSupplier.supplyColdWater();
  }
}
```

- 온수 상태

```java
class HotWaterState implements State {
  private final WaterMachine waterMachine;

  HotWaterState(WaterMachine waterMachine) {
    this.waterMachine = waterMachine;
  }

  @Override
  public void coldWater() {
    System.out.println("온수 -> 냉수로 상태를 변경합니다.");
    waterMachine.changeState(waterMachine.coldWaterState);
  }

  @Override
  public void hotWater() {
    System.out.println("이미 온수가 선택되어 있습니다.");
  }

  @Override
  public void normalWater() {
    System.out.println("온수 -> 정수로 상태를 변경합니다.");
    waterMachine.changeState(waterMachine.normalWaterState);
  }

  @Override
  public void waterSupply() {
    System.out.println("뜨거운 물이 나옵니다.");
    WaterSupplier.supplyHotWater();
    System.out.println("뜨거운 물이 나온 이후에는 안전을 위해 정수로 상태가 바뀝니다.");
    waterMachine.changeState(waterMachine.normalWaterState);
  }
}
```

- 정수 상태

```java
class NormalWaterState implements State {
  private final WaterMachine waterMachine;

  NormalWaterState(WaterMachine waterMachine) {
    this.waterMachine = waterMachine;
  }

  @Override
  public void coldWater() {
    System.out.println("정수 -> 냉수로 상태를 변경합니다.");
    waterMachine.changeState(waterMachine.coldWaterState);
  }

  @Override
  public void hotWater() {
    System.out.println("정수 -> 온수로 상태를 변경합니다.");
    waterMachine.changeState(waterMachine.hotWaterState);
  }

  @Override
  public void normalWater() {
    System.out.println("정수 -> 안전 모드로 상태를 변경합니다.");
    waterMachine.changeState(waterMachine.childrenSafeState);
  }

  @Override
  public void waterSupply() {
    System.out.println("정수가 나옵니다.");
    WaterSupplier.supplyNormalWater();
  }
}
```

- 어린이 보호 모드 상태

```java
class ChildrenSafeState implements State {
  private final WaterMachine waterMachine;

  ChildrenSafeState(WaterMachine waterMachine) {
    this.waterMachine = waterMachine;
  }

  @Override
  public void coldWater() {
    System.out.println("안전 모드에서는 냉수를 선택할 수 없습니다.");
  }

  @Override
  public void hotWater() {
    System.out.println("안전 모드에서는 온수를 선택할 수 없습니다.");
  }

  @Override
  public void normalWater() {
    System.out.println("안전 모드 -> 정수로 상태를 변경합니다.");
    waterMachine.changeState(waterMachine.normalWaterState);
  }

  @Override
  public void waterSupply() {
    System.out.println("정수가 나옵니다.");
    WaterSupplier.supplyNormalWater();
  }
}
```

- 냉온수기 기계

```java
public class WaterMachine {
  // 4가지 상태를 제공한다.
  final State coldWaterState;
  final State hotWaterState;
  final State normalWaterState;
  final State childrenSafeState;

  // 현재 상태.
  private State currentState;

  public WaterMachine() {
    this.coldWaterState = new ColdWaterState(this);
    this.hotWaterState = new HotWaterState(this);
    this.normalWaterState = new NormalWaterState(this);
    this.childrenSafeState = new ChildrenSafeState(this);

    // 최초 상태는 정수 상태.
    this.currentState = this.normalWaterState;
  }

  void changeState(State nextState) {
    this.currentState = nextState;
  }

  // 냉온수가 사용자는 아래의 4개 메소드로 냉온수기를 이용한다.
  public void coldWater() {
    this.currentState.coldWater();
  }

  public void hotWater() {
    this.currentState.hotWater();
  }

  public void normalWater() {
    this.currentState.normalWater();
  }

  public void waterSupply() {
    this.currentState.waterSupply();
  }
}
```

냉온수기 기계(`WaterMachine`)의 코드를 읽어보면, 4가지 상태를 멤버로 갖고 있다.
이는 `Context`역할을 수행하기 위해서이며 각 상태 클래스에서 상태변화를 할 때 공통적으로 다음 상태의 인스턴스로 접근할 방법을 마련해 준다.

여기에서 `Context`와 `WaterMachine`이 반드시 하나의 클래스일 필요는 없으며 필요하다면 둘이 분리해 구현하는 것도 고려할 수 있다.
Java라면 각 상태를 `enum`으로 정의해서 쓰는 것도 방법 중 하나일 수 있다고 생각한다.

이 냉온수기는 다음과 같이 사용하면 된다.


```java
WaterMachine waterMachine = new WaterMachine();

waterMachine.waterSupply(); // 정수가 나옵니다.

waterMachine.hotWater();  // 정수 -> 온수로 상태를 변경합니다.
waterMachine.waterSupply(); // 뜨거운 물이 나옵니다. // 뜨거운 물이 나온 이후에는 안전을 위해 정수로 상태가 바뀝니다.

waterMachine.coldWater(); // 정수 -> 냉수로 상태를 변경합니다.
waterMachine.waterSupply(); // 냉수가 나옵니다.

waterMachine.normalWater(); // 냉수 -> 정수로 상태를 변경합니다.

waterMachine.normalWater(); // 정수 -> 안전 모드로 상태를 변경합니다.
waterMachine.waterSupply(); // 정수가 나옵니다.
waterMachine.hotWater();    // 안전 모드에서는 온수를 선택할 수 없습니다.
waterMachine.waterSupply(); // 정수가 나옵니다.

waterMachine.normalWater(); // 안전 모드 -> 정수로 상태를 변경합니다.
```

## 고려해야 할 점

- 하나의 상태를 클래스 하나로 명확히 표현하는 것과, 상태 변수의 값으로 표현하는 것 사이에서 저울질해봐야 한다.
    - 클래스로 명확히 표현하는 것이 낫다면 스테이트 패턴으로의 리팩토링을 고려할 수 있다.
    - 상태 패턴으로 리팩토링을 한 결과가 더 복잡하다면 굳이 스테이트 패턴을 도입하지 않아도 된다.
- 스테이트 패턴은 `if`/`else`/`switch`를 효과적으로 제거한다.
- 클래스의 수가 취급해야 하는 상태의 수만큼 추가로 늘어난다는 점에 주의해야 한다. 이것은 상황에 따라 장점일 수도 있다.
- 각 상태가 자신의 다음 상태를 알아야 한다는 특징이 있다.
    - 각 상태가 다음 상태를 모르는 것이 바람직한지 아닌지를 고민해 볼 것.
- 각각의 상태별로 똑같이 행동하는 메소드가 많다면 스테이트 패턴이 필요하지 않을 수 있다.
- 각 상태를 싱글톤으로 관리하는 것도 고려할 수 있다.

## 유명한 사용 예

- GoF에 따르면 TCP connection 구현에 이 패턴이 사용되었다고 한다.

> 존슨(Johnson)과 츠바이크(Zweig)는 실제로 상태 패턴을 정의하면서 TCP 연결 프로토콜에 적용하였습니다.
[^gof-405]

Java로 표현하자면, 다음과 같은 상태 인터페이스를 생각할 수 있다.

```java
public interface TCPState {

  void activeOpen(TCPConnection tcpConnection);

  void passiveOpen(TCPConnection tcpConnection);

  void close(TCPConnection tcpConnection);

  void acknowledge(TCPConnection tcpConnection);

  void send(TCPConnection tcpConnection);
}
```

그리고 다음과 같은 상태 구현체를 갖게 된다.

- `TCPClosed implements TCPState`
- `TCPEstablished implements TCPState`
- `TCPListen implements TCPState`
- `TCPClosed implements TCPState`

## 참고문헌

- GoF의 디자인 패턴(개정판) / 에릭 감마, 리처드 헬름, 랄프 존슨, 존 블라시디스 공저 / 김정아 역 / 프로텍미디어 / 발행 2015년 03월 26일
- 패턴을 활용한 리팩터링 / 조슈아 케리에브스키 저 / 윤성준, 조상민 공역 / 인사이트(insight) / 신판 1쇄 발행 2011년 02월 09일 / 원제 : REFACTORING TO PATTERNS

## 주석

[^gof-395]: GoF의 디자인 패턴. 챕터 5. 395쪽.
[^gof-405]: GoF의 디자인 패턴. 챕터 5. 405쪽.
[^joshua-235]: 패턴을 활용한 리팩터링. 7장. 235쪽.

