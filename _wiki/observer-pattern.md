---
layout  : wiki
title   : 옵저버 패턴(Observer Pattern)
summary : 상태 변화를 감시자에게 통지한다
date    : 2019-09-29 18:29:07 +0900
updated : 2019-10-01 17:14:22 +0900
tag     : design-pattern
toc     : true
public  : true
parent  : design-pattern
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

## 요약

Subject를 보면 어렵지 않게 이해할 수 있다.

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

코드는 다음과 같은 모양새를 갖는다.

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

한편 `Notify()`의 호출은 누가 시켜야 할지 헷갈릴 수 있는데, GoF는 다음 두 가지 방법 중에서 선택하라고 한다.[^notify]

* Subject 에서 변경이 발생할 때, 변경을 저장하는 메소드가 `Notify()`를 호출하는 방법.
* 사용자(`main` 등)가 적절한 시기에 `Notify()`를 호출하는 방법.

참고로 Observer를 attach 할 때 관심사를 함께 등록하는 방법도 있다.
이 방법을 사용해 구현하면 Observer 마다 다른 정보를 전달해 주도록 할 수 있다.

```cpp
void Subject::Attach(Observer*, Aspect& interest);
```

## 참여자

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

## GoF의 디자인 패턴의 옵저버 패턴

## 헤드 퍼스트 디자인 패턴의 옵저버 패턴

다음 코드는 헤드 퍼스트 디자인 패턴에서 소개한 옵저버 패턴의 코드를 약간 수정한 것이다.[^head]

날씨 정보를 각각의 디스플레이(Observer)가 구독하는 구조로 이루어져 있다.

먼저 Observer와 Subject 인터페이스를 보자.

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


## 참고문헌

* GoF의 디자인 패턴(개정판) / 에릭 감마, 리처드 헬름, 랄프 존슨, 존 블라시디스 공저 / 김정아 역 / 프로텍미디어 / 발행 2015년 03월 26일
* Head First Design Patterns / 에릭 프리먼 등저 / 서환수 역 / 한빛미디어 / 초판 16쇄 2017년 5월 10일

## 주석

[^gof]: GoF의 디자인 패턴(개정판). 382쪽.
[^head]: Head First Design Patterns. 75쪽.
[^notify]: GoF의 디자인 패턴(개정판). 387쪽.
