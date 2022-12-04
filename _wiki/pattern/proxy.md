---
layout  : wiki
title   : 프록시 패턴 (Proxy Pattern)
summary : 컴포넌트 자체가 아니라 컴포넌트의 대리자와 통신하도록 해준다
date    : 2021-11-06 21:55:46 +0900
updated : 2022-10-28 21:09:02 +0900
tag     : GoF-design-pattern posa
resource: FA/8151E5-5F5E-4C54-A7B5-9AC710573010
toc     : true
public  : true
parent  : [[/pattern]]
latex   : false
---
* TOC
{:toc}

## 의도

GoF 책에서는 다음과 같이 프록시 패턴의 의도를 밝힌다.

>
다른 객체에 대한 접근을 제어하기 위한 대리자 또는 자리채움자 역할을 하는 객체를 둡니다.[^gof]

구조는 다음과 같다.

![]( ./proxy.svg )

`Subject` 구현체(`Proxy`)로 `Request()` 함수를 호출할 때 `RealSubject`를 참조하고 있는 `Proxy`가 `RealSubject`를 대리하는 구조.


## 프록시 패턴의 다양한 변형들

### Remote Proxy

>
Remote Proxy 변형 - 원격 컴포넌트의 클라이언트를 네트워크 주소와 IPC(interprocess communication) 프로토콜로부터 숨겨야 한다.
[^posa-281]

<span/>

>
리모트 프록시(remote proxy)는 서버 측 객체에 대한 클라이언트 측 표현이다.
프록시는 요청을 네트워크를 통해 전송하며 이 요청은 서버 측 객체에 의해 처리된다.
CORBA와 RMI 스텝은 서버측 스켈레톤 객체를 위한 프록시이다.
[^holub-468]

<span/>

>
'리모트 프록시(remote proxy)'는 네트워크 연결의 한 종단에 존재하며 네트워크의 다른 쪽에 있는 객체와 동일한 인터페이스를 구현한다.
사용자는 프록시에 메시지를 보내며, 프록시가 이 메시지를 네트워크 너머에 있는 실제 객체로 전달하게 된다.
이때 사용자는 프록시를 네트워크 너머에 있는 리모트 객체라 생각한다.
프록시를 통해 일어나는 모든 통신은 투명하게 리모트 객체에 전달되기 때문이다.
자바 RMI, CORBA 그리고 XML/SOAP 모두 리모트 프록시 아키텍처를 사용하고 있다.
[^holub-376]

- 리모트 프록시는 원본 소스를 캡슐화하며, 원본과 통신하는 방식으로 작동한다.
- 리모트 프록시는 다음 질문과 같이 클라이언트와 원본의 위치에 따라 세부적으로 나뉘어질 수 있다.
    - 클라이언트와 원본이 같은 머신에서 실행되는가?
    - 클라이언트와 원본이 다른 프로세스에서 실행되는가?

### Protection Proxy

>
Protection Proxy 변형 - 권한을 부여받지 않은 액세스로부터 컴포넌트를 보호해야 한다.
[^posa-281]

<span/>

>
보호 프록시(protection proxy)는 자신과 같은 인터페이스를 구현하는 실객체의 특정 메소드로의 접근을 제어한다.
이 경우 프록시 메소드는 인증 토큰을 전달받고, 이 토큰이 요청한 연산을 인증하지 못하면 예외를 던질 수 있다.
>
`Collections.unmodifiableCollection(...)`을 통해 받 은 `Collection` 구현체는 보호 프록시의 예이다.
[^holub-468]


### Cache Proxy

>
Cache Proxy 변형 - 다수의 로컬 클라이언트들이 원격 컴포넌트로부터 얻어낸 결과를 공유할 수 있다.
[^posa-281]

- 캐시 프록시는 캐시를 보관하는 프록시이므로, 캐시 프록시를 구현할 때에는 다음 사항에 대해서도 고민해 보아야 한다.
    - 캐시를 어떻게 저장할 것인가?
    - 캐시를 어떻게 갱신할 것인가?
    - 캐시 유효성을 어떻게 검사할 것인가?
- 구글 크롬이나 파이어폭스 같은 웹 브라우저가 캐시 프록시의 구현을 사용한다고 볼 수 있다.

### Synchronization Proxy

>
Synchronization Proxy 변형 - 하나의 컴포넌트에 대해 다수의 유사한 액세스들을 동기화해야 한다.
[^posa-282]

### Counting Proxy

>
Counting Proxy 변형 - 우발적으로 컴포넌트가 삭제되지 않도록 해야하거나 사용량 통계(usage statistics)를 계산해야 한다.
[^posa-282]

### Virtual Proxy

>
Virtual Proxy 변형 - 컴포넌트를 처리하고 로드하는 데 비용이 많이 들 때 컴포넌트에 대한 정보를 분할하는 것이 효과적인 경우가 있다.
[^posa-282]

<span/>

>
가상 프록시 (virtual proxy)는 값비싼 객체를 필요할 때 생성하도록 해준다.
예를 들어 데이터베이스 접근은 데이터가 실제로 사용되기 전까지 프록시가 대신한다.
용량이 큰 이미지를 백그라운드 프로세스에서 네트워크를 통해 가져오는 동안 사용자는 이미지가 이미 그곳에 있다고 생각한다.
이러한 과정을 후기 초기화(lazy instantiation)라 부른다.
가상 프록시는 복사 수정 전략을 구현하는 데에도 유용하다. 객체의 복사 본을 요청받으면 프록시는 단순히 원본 객체에 대한 레퍼런스만을 갖는다그리고 복사본에 대한 수정 요 청이 들어오면 이때 비로소 프록시가 원본 객체를 실 제로 복사하게 된다
[^holub-468]

#### Virtual Proxy의 예제

다음은 Java 언어로 배우는 디자인 패턴 입문의 예제를 토대로 작성한 것이다.[^yuki-378]

- `Printable` 인터페이스는 `Subject` 역할이다.

```java
public interface Printable {
  void setPrinterName(String name);
  String getPrinterName();
  void print(String string);
}
```

- `Printer` 클래스는 `RealSubject` 역할이다.
    - `Printer` 클래스는 초기화할 때 5초나 소요되는 뭔가 무거운 작업을 하는데(생성자를 확인할 것), 이 작업은 `heavyJob` 메소드로 표현되어 있다.
    - `Printer`는 초기화가 무거우므로 처음부터 초기화하기 부담스러운 클래스이다.

```java
public class Printer implements Printable {
  private String name;

  public Printer() {
    heavyJob("Printer의 인스턴스를 생성 중");
  }

  public Printer(String name) {
    this.name = name;
    heavyJob("Printer의 인스턴스 (" + name + ")을 생성 중");
  }

  @Override
  public void setPrinterName(String name) {
    this.name = name;
  }

  @Override
  public String getPrinterName() {
    return name;
  }

  @Override
  public void print(String string) {
    System.out.println("=== " + name + " ===");
    System.out.println(string);
  }

  private void heavyJob(String msg) {
    System.out.println(msg);
    for (int i = 0; i < 5; i++) {
      try {
        Thread.sleep(1000);
      } catch (InterruptedException e) {
      }
      System.out.println(".");
    }
    System.out.println("완료.");
  }
}
```

- `PrinterProxy`는 `Proxy` 역할이다.
    - `Printer` 멤버를 갖고는 있지만 `Printer`를 처음부터 초기화하지 않는다는 점에 주목.
    - `print` 메소드를 호출할 때 `Printer`를 초기화한다.

```java
public class PrinterProxy implements Printable {
  private String name;
  private Printer real; // 본인

  public PrinterProxy() {
  }

  public PrinterProxy(String name) {
    this.name = name;
  }

  @Override
  public synchronized void setPrinterName(String name) {
    if (real != null) {
      real.setPrinterName(name);  // 본인에게도 설정한다
    }
    this.name = name;
  }

  @Override
  public String getPrinterName() {
    return name;
  }

  @Override
  public void print(String string) {
    realize();  // 본인을 lazy하게 초기화한다
    real.print(string);
  }

  private synchronized void realize() {
    if (real == null) {
      real = new Printer(name);
    }
  }
}
```

- 예제 테스트 코드와 실행 결과

```java
class PrinterProxyTest {
  @Test
  void test() {
    Printable p = new PrinterProxy("Alice");
    System.out.println("이름은 현재 " + p.getPrinterName() + " 입니다.");
    p.setPrinterName("Bob");
    System.out.println("이름은 현재 " + p.getPrinterName() + " 입니다.");
    p.print("Hello, world.");
  }
}

/*
이름은 현재 Alice 입니다.
이름은 현재 Bob 입니다.
Printer의 인스턴스 (Bob)을 생성 중
.
.
.
.
.
완료.
=== Bob ===
Hello, world.
*/
```

### Firewall Proxy

>
Firewall Proxy 변형 - 로컬 클라이언트를 외부로부터 보호해야 한다.
[^posa-282]

### 스마트 레퍼런스

>
스마트 레퍼런스(smart reference)는 삭제와 같은 귀찮은 백그라운드 작업을 자동으로 처리해 준다.
자바의 `WeakReference`가 스마트 레퍼런스의 예이다.
[^holub-468]

## Decorator와의 비교

Proxy 패턴은 [[/pattern/decorator]]와 매우 닮았다.

>
Decorator: 보호 프록시는 특히 Decorator로 보기 쉽다.
구조상 차이는 없으며 의도가 다를 뿐이다.
Decorator는 데코레이팅되지 않은 객체를 직접 접근하는 것을 허용한다.
[^holub-468]

<span/>

>
Decorator 디자인 패턴은 Proxy 패턴의 구조와 매우 유사하다.
(Proxy 패턴에서 원본에 해당하는) ConcreteComponent는
(Proxy 패턴에서 프록시에 해당하는) 데코레이터를 통해 호출되는 몇 가지 동작을 구현한다.
두 클래스는 공통 기본 클래스(common base class)로부터 상속받는다.
Decorator 패턴과 Proxy 패턴 간의 주요한 차이점은 그 의도에 있다.
데코레이터는 기능을 추가하거나, (좀 더 일반적으로는) ConcreteComponent의 핵심 기능에 추가 기능을 동적으로 선택할 수 있는 옵션을 제공한다.
프록시는 세부적으로 정의된 하우스키핑 코드(housekeeping code)를 원본으로부터 분리하는 역할을 한다.
[^posa-288]


## 참고문헌

- GoF의 디자인 패턴(개정판) / 에릭 감마, 리처드 헬름, 랄프 존슨, 존 블라시디스 공저 / 김정아 역 / 프로텍미디어 / 발행 2015년 03월 26일
- Java 언어로 배우는 디자인 패턴 입문 [개정판] / Yuki Hiroshi 저 / 이규흥 역 / 영진닷컴 / 1판 9쇄 2017년 3월 5일
- 실전 코드로 배우는 실용주의 디자인 패턴 / Allen Holub 저 / 송치형 편역 / 사이텍미디어 / 발행 2006년 07월 19일 / 원제 : Holub on Patterns : Learning Design Patterns by Looking at Code
- 패턴 지향 소프트웨어 아키텍처 Volume 1 / Frank Buschmann 외 / 김지선 역 / 지앤선(志&嬋) / 발행 2008년 01월 18일

## 주석

[^gof]: GoF의 디자인 패턴(개정판). 279쪽.
[^holub-376]: 실전 코드로 배우는 실용주의 디자인 패턴. 4장. 376쪽.
[^holub-468]: 실전 코드로 배우는 실용주의 디자인 패턴. 468쪽.
[^posa-281]: 패턴 지향 소프트웨어 아키텍처 Volume 1. 281쪽.
[^posa-282]: 패턴 지향 소프트웨어 아키텍처 Volume 1. 282쪽.
[^posa-288]: 패턴 지향 소프트웨어 아키텍처 Volume 1. 288쪽.
[^yuki-378]: Java 언어로 배우는 디자인 패턴 입문. 21장. 378쪽.
