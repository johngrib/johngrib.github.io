---
layout  : wiki
title   : 옵저버 패턴(Observer Pattern)
summary : 상태 변화를 감시자에게 통지한다
date    : 2019-09-29 18:29:07 +0900
updated : 2019-10-05 10:40:00 +0900
tag     : pattern
toc     : true
public  : true
parent  : [[design-pattern]]
latex   : false
---
* TOC
{:toc}

* 다음과 같이 불린다.
    * 옵저버 패턴(observer pattern)
    * 종속자 패턴(dependent pattern)
    * 게시-구독 패턴(publish-subscribe pattern)

## 의도

GoF 책에서는 다음과 같이 옵저버 패턴의 의도를 밝힌다.[^gof]

>
객체 사이에 일 대 다의 의존 관계를 정의해 두어,
어떤 객체의 상태가 변할 때 그 객체에 의존성을 가진 다른 객체들이
그 변화를 통지받고 자동으로 갱신될 수 있게 만듭니다.

구조는 다음과 같다.[^structure]

![structure]( /post-img/observer-pattern/structure.jpg )

## 요약

### 구조

구조 다이어그램에서 Subject를 잘 살펴보면 어렵지 않게 이해할 수 있다.

```ascii-art
+------------------+
| Subject          |
+------------------+
| Attach(Observer) |
| Detach(Observer) |  +----------------------+
| Notify() -----------| for o in observers { |
+------------------+  |    o -> Update()     |
                      | }                    |
                      +----------------------+
```

Subject에 여러 Observer를 등록(Attach)해 두고, Notify를 하게 되면 루프를 돌면서 각 Observer를 Update하는 패턴이다.

* Subject와 Observer가 느슨한 결합을 갖는 것이 중요하다.
    * Observer 등록 순서 등에 특정 로직이 의존하지 않도록 한다.

생각해보면 옵저버 패턴이라는 이름이 좀 미묘하다는 것을 알 수 있다. 스스로 감시하다가 변화를 알아차리는 것이 아니라, 변화를 통지받고 변화를 알게 되기 때문이다. 그래서 게시-구독 패턴이라는 별명도 있다.

### 참여자

* Observer는 Subject에 생긴 변화에 관심을 갖는다.

Java 코드로 표현한 Observer 인터페이스는 다음과 같다.

```java
public interface Observer {
    public void update(Subject theChangedSubject);
}
```

* Subject는 Observer들을 알고 있는 객체이다.
    * 여러 Observer가 Subject에 붙을 수 있다.
* ConcreteSubject는 다음과 같은 일을 한다.
    * ConcreteObserver에게 알려줘야 하는 상태를 저장한다.
    * 자신의 상태가 달라지면 ConcreteObserver에게 알려준다.

Subject 인터페이스는 다음과 같다.

```java
public interface Subject {
    public void attach(Observer o);
    public void detach(Observer o);
    public void notify();
}
```

* attach: Subject에 Observer를 구독자로 등록한다.
* detach: Subject에 등록한 Observer의 구독을 해지한다.
* notify: Subject에서 모든 Observer에 정보를 전달한다.

### 예제

다음은 내가 작성한 코드이다. 옵저버 패턴의 기본 구조를 Java 코드로 표현해 보았다.
GoF의 코드와는 차이점이 좀 있지만 핵심 아이디어를 이해하기에는 충분하다고 생각한다.

```java
interface Observer {
    public void update(Subject s);
}

class ObserverImpl implements Observer {
    private Data data1;
    private Data data2;

    // update 함수에 주목
    public void update(Subject s) {
        this.data1 = s.getData1();
        this.data2 = s.getData2();
    }
}
```

* GoF 예제와의 차이점
    * GoF 예제에서는 Observer의 소멸자가 호출될 때 `detach`가 호출되어, 소멸되는 옵저버가 알아서 `detach` 된다.
    * Java에서도 소멸자를 사용할 수는 있지만 사용이 권장되지 않으므로[^finalize] 생략했다.
    * `update`에 주어지는 `Subject`의 레퍼런스 검사를 생략하였다.

```java
interface Subject {
    public void attach(Observer o);
    public void detach(Observer o);
    public void notify();
}

class SubjectImpl implements Subject {
    private List<Observer> observers = new ArrayList<>();
    private Data data1;
    private Data data2;

    public void attach(Observer o) {
        observers.add(o);
    }
    public void detach(Observer o) {
        observers.remove(o);
    }
    public void notify() {
        // 모든 옵저버를 순회하며 업데이트를 해준다.
        for (Observer o : observers) {
            o.update(this);
        }
    }
    public void setData1(Data d) {
        this.data1 = d;
    }
    ...
}
```

## 구현할 때 고려할 점들

### 옵저버는 상태를 갖지 않아도 된다

* 상태는 Subject의 담당이므로 Subject와 Observer의 일대다 관계가 성립한다.
    * 예제에서는 Observer가 update를 통해 값을 전달받고 저장하지만, 상태를 굳이 저장할 필요가 없는 경우에는 상태를 저장하지 않아도 된다.

### Notify를 누가 호출해야 할까?

`Notify()` 호출을 누가 시켜야 할지 헷갈릴 수 있다.

GoF는 다음 두 가지 방법 중에서 선택하라고 한다.[^notify]

* Subject 에서 변경이 발생할 때, 변경을 저장하는 메소드가 `Notify()`를 호출하는 방법.
* 사용자(`main` 등)가 적절한 시기에 `Notify()`를 호출하는 방법.

참고로 Observer를 attach 할 때 관심사를 함께 등록하는 방법도 있다.
이 방법을 사용해 구현하면 Observer 마다 다른 정보를 전달해 주도록 할 수 있다.

```cpp
void Subject::Attach(Observer*, Aspect& interest);
```


### Update 메소드의 인자

GoF의 예제에 등장하는 Update 메소드는 다음과 같은 시그니처를 갖고 있다.

```java
void update(Subject theChangedSubject)
```

즉 Subject를 넘겨주고, 옵저버가 넘겨받은 Subject에서 필요한 값을 얻는 방법이다.

하지만 이것은 반드시 지켜야 하는 약속은 아니며, 상황에 따라 다른 인자를 함께 넘기는 것도 생각해 볼 수 있다.

```java
void update(Subject theChangedSubject, int changedCount)
```

단순히 값을 전달하는 정도라면 심플하게 구현하는 것도 방법이다.

```java
void update(int value1, int value2)
```

### Observer의 행위가 Subject에 영향을 주는 경우

만약 Observer의 행위가 Subject에 영향을 주는 로직이 있다면, 무한 루프가 발생할 수 있으므로 주의할 필요가 있다.

1. Subject가 notify를 호출한다.
2. Observer의 update가 호출된다.
3. Observer::update 실행도중 Subject에 영향을 준다.
4. Goto 1

"Java 언어로 배우는 디자인 패턴 입문"에서는 이러한 상황을 회피하기 위해 Observer에 플래그 변수를 하나 추가하여 Observer가 현재 update 중인지 아닌지 상태를 기록하는 꼼수를 제안한다.[^update-flag] 아름다운 방법은 아닌 것 같지만 급할 경우에는 고려할 수 있을 것 같다.

다음은 내가 작성한 코드이다.

```java
boolean isUpdate;

@Override
public void update(Subject s) {
    if (!isUpdate) {
        return;
    }
    this.subject = s;
}
```

한편, `java.util.Observable`를 읽어 봤더니 비슷한 코드가 존재하고 있었다.

```java
private boolean changed = false;

public void notifyObservers(Object arg) {
    /*
     * a temporary array buffer, used as a snapshot of the state of
     * current Observers.
     */
    Object[] arrLocal;

    synchronized (this) {
        /* We don't want the Observer doing callbacks into
         * arbitrary code while holding its own Monitor.
         * The code where we extract each Observable from
         * the Vector and store the state of the Observer
         * needs synchronization, but notifying observers
         * does not (should not).  The worst result of any
         * potential race-condition here is that:
         * 1) a newly-added Observer will miss a
         *   notification in progress
         * 2) a recently unregistered Observer will be
         *   wrongly notified when it doesn't care
         */
        if (!changed)   // 이 부분
            return;
        arrLocal = obs.toArray();
        clearChanged();
    }

    for (int i = arrLocal.length-1; i>=0; i--)
        ((Observer)arrLocal[i]).update(this, arg);
}

protected synchronized void setChanged() { changed = true; }
protected synchronized void clearChanged() { changed = false; }
public synchronized boolean hasChanged() { return changed; }
```



## 헤드 퍼스트 디자인 패턴의 옵저버 패턴 예제

다음 코드는 헤드 퍼스트 디자인 패턴에서 소개한 옵저버 패턴의 코드를 약간 수정한 것이다.[^head]

날씨 정보를 각각의 디스플레이(Observer)가 구독하는 구조로 이루어져 있다.

먼저 Observer와 Subject 인터페이스를 보자.

* `update` 메소드의 인자로 `Subject`가 아니라 각 값을 전달한다는 점이 GoF 예제와 다르다.
    * 더욱 느슨한 결합을 선호하고, 전달해야 할 값이 몇 개 없다면 이 방법이 좋다고 생각한다.

```java
public interface Observer {
    public void update(float temp, float humidity, float pressure);
}
```

```java
public interface Subject {
    public void registerObserver(Observer o);
    public void removeObserver(Observer o);
    public void notifyObservers();
}
```

다음은 Subject의 구현체이다.

* 변경이 발생할 때, Subject에서 알림을 호출한다.

```java
import java.util.ArrayList;

public class WeatherData implements Subject {
    private ArrayList<Observer> observers;
    private float temperature;
    private float humidity;
    private float pressure;

    public WeatherData() {
        this.observers = new ArrayList<>();
    }

    @Override
    public void registerObserver(Observer o) {
        observers.add(o);
    }

    @Override
    public void removeObserver(Observer o) {
        int i = observers.indexOf(o);
        if (i >= 0) {
            observers.remove(i);
        }
    }

    @Override
    public void notifyObservers() {
        for (Observer o : observers) {
            o.update(temperature, humidity, pressure);
        }
    }

    public void measurementsChanged() {
        notifyObservers();
    }

    public void setMeasurements(float temperature, float humidity, float pressure) {
        this.temperature = temperature;
        this.humidity = humidity;
        this.pressure = pressure;
        measurementsChanged();  // 변경이 발생할 때, 알림을 돌리는 방법 선택
    }
}
```

Display를 위한 인터페이스.

```java
public interface DisplayElement {
    public void display();
}
```

그리고 Observer 구현체.

* update 호출시마다 display가 호출되어 화면이 바뀌도록 되어 있다.
* 생성자 파라미터로 받은 Subject에 자기 자신을 등록하기 때문에 main 메소드에서 Subject에 옵저버를 일일이 등록하지 않는다.

```java
public class CurrentConditionsDisplay implements Observer, DisplayElement {
    private int id;
    private float temperature;
    private float humidity;
    private Subject weatherData;

    public CurrentConditionsDisplay(Subject weatherData, int id) {
        this.id = id;
        this.weatherData = weatherData;
        weatherData.registerObserver(this);
    }

    @Override
    public void update(float temp, float humidity, float pressure) {
        this.temperature = temp;
        this.humidity = humidity;
        display();  // 편의상 여기에 배치
    }

    @Override
    public void display() {
        System.out.println("장비 ID: " + id + ", 현재 기온: " + temperature + "도, 습도: " + humidity + "%");
    }
}
```

테스트를 위해 작성한 `main` 메소드.

```java
public static void main(String[] args) {

    WeatherData weather = new WeatherData();
    CurrentConditionsDisplay current1 = new CurrentConditionsDisplay(weather, 1);
    CurrentConditionsDisplay current2 = new CurrentConditionsDisplay(weather, 2);
    CurrentConditionsDisplay current3 = new CurrentConditionsDisplay(weather, 3);

    weather.setMeasurements(30,65, 30.4f);
    weather.setMeasurements(29,64, 30.5f);
    weather.setMeasurements(30,64, 30.6f);
}
```

실행하면 다음과 같은 결과가 나온다.

```
장비 ID: 1, 현재 기온: 30.0도, 습도: 65.0%
장비 ID: 2, 현재 기온: 30.0도, 습도: 65.0%
장비 ID: 3, 현재 기온: 30.0도, 습도: 65.0%
장비 ID: 1, 현재 기온: 29.0도, 습도: 64.0%
장비 ID: 2, 현재 기온: 29.0도, 습도: 64.0%
장비 ID: 3, 현재 기온: 29.0도, 습도: 64.0%
장비 ID: 1, 현재 기온: 30.0도, 습도: 64.0%
장비 ID: 2, 현재 기온: 30.0도, 습도: 64.0%
장비 ID: 3, 현재 기온: 30.0도, 습도: 64.0%
```

## Java Magazine 2016 November/December에 실린 예제

다음은 [Java Magazine 2016 Nov/Dec의 Implementing Design Patterns with Lambdas][magazine]에 실린 코드를 약간 수정한 것이다. 이 예제에서는 옵저버 구현 클래스를 람다로 대체하는 방법을 엿볼 수 있다.

유명인이 트위터에 글을 쓰면 뉴욕타임즈, 가디언, 르몽드가 관심 키워드에 따라 반응하는 방식으로 만들어져 있다.

```java
interface Observer {
    void notify(String tweet);
}
```

옵저버는 다음과 같이 심플하지만 뻔한 보일러 플레이트다. 이 예제의 후반에서는 이런 보일러 플레이트 코드를 람다로 대체하는 것을 보여준다. 즉, 람다를 사용해 NYTimes, Guardian, LeMonde 클래스를 모두 삭제하고도 똑같이 작동하게 할 수 있다.

```java
/* 삭제 예정 */
class NYTimes implements Observer {
    public void notify(String tweet) {
        if (tweet != null && tweet.contains("money")) {
            System.out.println("Breaking news in NY! " + tweet);
        }
    }
}

/* 삭제 예정 */
class Guardian implements Observer {
    public void notify(String tweet) {
        if (tweet != null && tweet.contains("queen")) {
            System.out.println("Yet more news in London... " + tweet);
        }
    }
}

/* 삭제 예정 */
class LeMonde implements Observer {
    public void notify(String tweet) {
        if (tweet != null && tweet.contains("wine")) {
            System.out.println("Today cheese, wine, and news! " + tweet);
        }
    }
}
```

```java
interface Subject {
    void registerObserver(Observer o);
    void notifyObservers(String tweet);
}
```

```java
class Feed implements Subject {
    private final List<Observer> observers = new ArrayList<>();
    
    public void registerObserver(Observer o) {
        this.observers.add(o);
    }
    
    public void notifyObservers(String tweet) {
        observers.forEach(o -> o.notify(tweet));
    }
}
```

사용은 다음과 같이 할 수 있다.

```java
Feed f = new Feed();
f.registerObserver(new NYTimes());
f.registerObserver(new Guardian());
f.registerObserver(new LeMonde());
f.notifyObservers( "The queen said her favourite book is Java 8 in Action!");
```

그런데 Observer가 한 개의 메소드만 갖고 있는 인터페이스이므로, 람다를 사용하면 클래스를 만들지 않고도 옵저버를 등록할 수 있다.

```java
f.registerObserver((String tweet) -> {
    if (tweet != null && tweet.contains("money")) {
        System.out.println("Breaking news in NY! " + tweet);
    }
});
```

즉, NYTimes 클래스를 삭제하고 실행 코드를 다음과 같이 수정할 수 있다.

```java
Feed f = new Feed();
// NYTimes를 대체하는 코드. 이제 NYTimes 클래스는 삭제해도 된다.
f.registerObserver((String tweet) -> {
    if (tweet != null && tweet.contains("money")) {
        System.out.println(
                "Breaking news in NY! " + tweet
        );
    }
});
f.registerObserver(new Guardian());
f.registerObserver(new LeMonde());
f.notifyObservers( "The queen said her favourite book is Java 8 in Action!");
f.notifyObservers( "money!");
```

나머지 Guardian과 LeMonde도 똑같은 방법으로 대체하고 클래스를 삭제할 수 있다.


## Java에 내장된 Observer, Observable 인터페이스

java.util 에는 Observer 인터페이스와 Observable 클래스가 들어있다.

다음은 Observer 인터페이스인데, `update` 메소드를 찾아볼 수 있다. 주석은 생략했다.

`@Deprecated(since="9")`도 확인하자.

```java
package java.util;

@Deprecated(since="9")
public interface Observer {
    void update(Observable o, Object arg);
}
```

Observable의 코드는 대략 다음과 같다.

```java
package java.util;

@Deprecated(since="9")
public class Observable {
    private boolean changed = false;
    private Vector<Observer> obs;

    public Observable() {
        obs = new Vector<>();
    }

    public synchronized void addObserver(Observer o) {
        if (o == null)
            throw new NullPointerException();
        if (!obs.contains(o)) {
            obs.addElement(o);
        }
    }

    public synchronized void deleteObserver(Observer o) {
        obs.removeElement(o);
    }

    public void notifyObservers() {
        notifyObservers(null);
    }

    public void notifyObservers(Object arg) {
        Object[] arrLocal;

        synchronized (this) {
            if (!changed)
                return;
            arrLocal = obs.toArray();
            clearChanged();
        }

        for (int i = arrLocal.length-1; i>=0; i--)
            ((Observer)arrLocal[i]).update(this, arg);
    }
    ...
}
```

### Java 내장 Observable, Observer는 왜 deprecated 되었을까?

Observer와 Observable은 Java SE 9 버전부터 Deprecated 되었다. 그 이유는 무엇일까?

[Java SE 9 문서의 Observable][observable]을 읽어보자.

>
**Deprecated.**  
This class and the [Observer][observer] interface have been deprecated. The event model supported by Observer and Observable is quite limited, the order of notifications delivered by Observable is unspecified, and state changes are not in one-for-one correspondence with notifications. For a richer event model, consider using the [java.beans][java.beans] package. For reliable and ordered messaging among threads, consider using one of the concurrent data structures in the [java.util.concurrent][concurrent] package. For reactive streams style programming, see the [Flow][flow] API.

* Observer와 Observable이 제공하는 이벤트 모델이 제한적이다.
* Observable의 notify는 순서를 보장할 수 없으며, 상태 변경은 1:1로 일치하지 않는다.
* 더 풍부한 이벤트 모델은 `java.beans` 패키지가 제공하고 있다.
* 멀티 스레드에서의 신뢰할 수 있고 순서가 보장된 메시징은 `java.util.concurrent` 패키지의 concurrent 자료 구조들 중 하나를 골라 쓰는 편이 낫다.
* reactive stream 스타일 프로그래밍은 `Flow` API를 쓰기를 권한다.

한편, Observable의 문제는 헤드 퍼스트 디자인 패턴에서도 지적하고 있다.[^minus-observable]

요약하자면 다음과 같다.

* Observable이 interface가 아니라 class이다.
    * 인터페이스에 맞춰 프로그래밍한다는 객체지향 디자인 원칙을 위배한다.
    * 이미 다른 클래스를 상속하는 클래스가 Observable을 상속할 수 없다.
    * 따라서 재사용성에 제약이 생긴다.
* 상속 위주로 작업을 하게 된다.
    * Observable을 사용하려면 서브 클래스를 만들어야 한다.
    * Observable 내부에 protected 메소드가 있어, Observable의 서브클래스를 인스턴스 변수로 사용하는 방법도 써먹을 수가 없다.
    * 상속보다 구성을 사용한다는 디자인 원칙을 위배한다.
* Observable이 java.util에 들어있기 때문에 재구현을 할 수 없다.

## 어디에서 사용하고 있나?

* Smalltalk 언어의 Model/View/Controller(MVC) 사용자 인터페이스 프레임워크
    * MVC의 Model이 Subject 역할
    * MVC의 View가 Observer 역할
* Java Swing 등의 GUI 프레임워크
    * 다양한 버튼과 리스너들(Observer)
* 등등


## 참고문헌

* 웹
    * [Class Observable][observable]
    * [Java Magazine 2016 Nov/Dec: Implementing Design Patterns with Lambdas][magazine]
* 도서
    * GoF의 디자인 패턴(개정판) / 에릭 감마, 리처드 헬름, 랄프 존슨, 존 블라시디스 공저 / 김정아 역 / 프로텍미디어 / 발행 2015년 03월 26일
    * Head First Design Patterns / 에릭 프리먼 등저 / 서환수 역 / 한빛미디어 / 초판 16쇄 2017년 5월 10일
    * 이펙티브 자바 Effective Java 3/E / 조슈아 블로크 저/개앞맵시 역 / 인사이트(insight) / 초판 2쇄 2018년 11월 21일
    * Java 언어로 배우는 디자인 패턴 입문 [개정판] / Yuki Hiroshi 저 / 이규흥 역 / 영진닷컴 / 1판 9쇄 2017년 3월 5일

## 주석

[^gof]: GoF의 디자인 패턴(개정판). 382쪽.
[^structure]: GoF의 디자인 패턴(개정판). 384쪽.
[^head]: Head First Design Patterns. 75쪽.
[^notify]: GoF의 디자인 패턴(개정판). 387쪽.
[^finalize]: 조슈아 블로흐는 "이펙티브 자바"의 8 챕터에서 다음과 같이 말한다. "finalizer는 예측할 수 없고, 상황에 따라 위험할 수 있어 일반적으로 불필요하다.", "cleaner는 finalizer보다는 덜 위험하지만, 여전히 예측할 수 없고, 느리고 일반적으로 불필요하다."
[^minus-observable]: Head First Design Patterns. 109쪽.
[^update-flag]: Java 언어로 배우는 디자인 패턴 입문. Chapter 17. 309쪽.

[observable]: https://docs.oracle.com/javase/9/docs/api/java/util/Observable.html
[observer]: https://docs.oracle.com/javase/9/docs/api/java/util/Observer.html
[java.beans]: https://docs.oracle.com/javase/9/docs/api/java/beans/package-summary.html
[concurrent]: https://docs.oracle.com/javase/9/docs/api/java/util/concurrent/package-summary.html
[flow]: https://docs.oracle.com/javase/9/docs/api/java/util/concurrent/Flow.html
[magazine]: http://www.javamagazine.mozaicreader.com/NovDec2016/LinkedIn#&pageSet=58&page=0

